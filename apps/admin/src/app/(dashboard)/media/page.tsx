"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  Copy, 
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setMedia([
      { id: '1', filename: 'tutor-raj.jpg', url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400', size: '245 KB', type: 'image/jpeg' },
      { id: '2', filename: 'heritage-school.jpg', url: 'https://images.unsplash.com/photo-1523050335392-9bef867a0578?w=400', size: '1.2 MB', type: 'image/jpeg' },
      { id: '3', filename: 'certification.pdf', url: '#', size: '4.5 MB', type: 'application/pdf' },
      { id: '4', filename: 'physics-lab.jpg', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', size: '890 KB', type: 'image/jpeg' },
    ]);
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Media Library</h1>
          <p className="text-sm text-slate-500">Centralized storage for tutor photos, certificates, and school banners.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-xl shadow-primary/20">
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media by filename..." className="pl-8 bg-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-white"><Filter className="mr-2 h-4 w-4" /> All Types</Button>
          <Button variant="outline" size="sm" className="bg-white">Recent First</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {media.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden border-slate-200 hover:border-primary transition-all shadow-sm hover:shadow-lg">
            <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
              {item.type.startsWith('image/') ? (
                <img src={item.url} alt={item.filename} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              ) : (
                <FileText className="w-12 h-12 text-slate-300" />
              )}
            </div>
            <CardContent className="p-3">
              <p className="text-[10px] font-black text-slate-700 truncate uppercase tracking-tight mb-1">{item.filename}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.size}</p>
            </CardContent>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="icon" className="h-7 w-7 bg-white/90 backdrop-blur shadow-sm"><Copy className="h-3 w-3" /></Button>
              <Button variant="secondary" size="icon" className="h-7 w-7 bg-white/90 backdrop-blur shadow-sm text-rose-500"><Trash2 className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
