import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/database/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private getRoleNames(user: {
    roles: Array<{ role: { name: string } }>;
  }): string[] {
    return Array.from(
      new Set(user.roles.map(({ role }) => role.name).filter(Boolean)),
    );
  }

  private getPrimaryRole(roleNames: string[]): string {
    if (roleNames.includes('SUPERADMIN')) {
      return 'SUPERADMIN';
    }

    return roleNames[0];
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const roleNames = this.getRoleNames(user);
    if (roleNames.length === 0) {
      throw new UnauthorizedException(
        'Admin access is not enabled for this account.',
      );
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const role = this.getPrimaryRole(roleNames);
    const payload = {
      sub: user.id,
      email: user.email,
      role,
      roles: roleNames,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role,
        roles: roleNames,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }

    const roleNames = this.getRoleNames(user);
    if (roleNames.length === 0) {
      throw new UnauthorizedException(
        'Admin access is not enabled for this account.',
      );
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: this.getPrimaryRole(roleNames),
      roles: roleNames,
    };
  }
}
