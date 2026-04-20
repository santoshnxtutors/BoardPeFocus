# BoardPeFocus Backend

Production-grade NestJS backend for BoardPeFocus, built with Fastify, Prisma, and PostgreSQL.

## Features
- **Domain-Driven Design**: Clean module separation.
- **Fastify**: High-performance HTTP adapter.
- **Auth**: JWT-based admin authentication with role-based access control.
- **Lead Flow**: Automated storage and notification triggering.
- **Search**: Global search across tutors, boards, schools, and sectors.
- **SEO & Content**: Dynamic page management and metadata handling.
- **Audit Logs**: Comprehensive tracking of admin actions.

## Local Development

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup Database**:
   - Ensure PostgreSQL is running.
   - Copy `.env.example` to `.env` and update `DATABASE_URL`.
   - Run migrations:
     ```bash
     npx prisma migrate dev
     ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **API Documentation**:
   - Once running, visit `http://localhost:3001/v1/docs` (Swagger enabled).

## API Namespaces
- `/api/v1/public/*`: Accessible without authentication.
- `/api/v1/admin/*`: Requires valid JWT in Authorization header.

## Deployment Notes
- Ensure all environment variables are set in your CI/CD pipeline.
- Use `npm run build` followed by `npm run start:prod` for production.
- Database schema should be updated using `prisma migrate deploy`.
