import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { supabase, GalleryImageRecord } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, UploadCloud, Search, X, Eye, EyeOff } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent } from '@/components/ui/card';
import { staticImages } from '@/components/GallerySection';

const DEFAULT_CATEGORIES = ["Sangeet", "Reception", "Wedding", "Lighting", "Corporate"];
const LIGHTING_SUBCATEGORIES = ["Entrance", "Roof"];

export default function AdminGalleryPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [images, setImages] = useState<GalleryImageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadCategory, setUploadCategory] = useState<string>('Wedding');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [uploadSubCategory, setUploadSubCategory] = useState<string>('');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Delete State
  const [imageToDelete, setImageToDelete] = useState<GalleryImageRecord | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'; // Default fallback for dev
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
    } else {
      toast.error('Incorrect password');
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch images');
      console.error(error);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setUploadFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadAltText(file.name.split('.')[0].replace(/[-_]/g, ' '));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // 1. Compress & Convert to WebP
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp' as const,
      };
      
      const compressedFile = await imageCompression(uploadFile, options);
      setUploadProgress(40);

      // 2. Upload to Supabase Storage
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('gallery')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (storageError) throw storageError;
      setUploadProgress(70);

      // 3. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // 4. Save metadata to Database
      const finalCategory = uploadCategory === 'custom' ? customCategory : uploadCategory;
      
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{
          url: publicUrlData.publicUrl,
          category: finalCategory,
          subCategory: finalCategory === 'Lighting' ? uploadSubCategory : null,
          altText: uploadAltText
        }]);

      if (dbError) throw dbError;

      setUploadProgress(100);
      toast.success('Image uploaded successfully!');
      
      // Reset form
      setUploadFile(null);
      setPreviewUrl(null);
      setUploadAltText('');
      setCustomCategory('');
      setUploadProgress(0);
      fetchImages();

    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      // Delete from storage
      const fileName = imageToDelete.url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('gallery').remove([fileName]);
      }

      // Delete from DB
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageToDelete.id);

      if (error) throw error;

      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error: any) {
      toast.error(`Delete failed: ${error.message}`);
    } finally {
      setImageToDelete(null);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 pt-20">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Gallery Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Card>
      </div>
    );
  }

  // Map static images to the same format as GalleryImageRecord
  const formattedStaticImages: GalleryImageRecord[] = staticImages.map((img, index) => ({
    id: `static-${index}`, // use a fake ID starting with 'static-'
    url: img.src,
    category: img.category,
    subCategory: img.subCategory || null,
    altText: img.alt,
    created_at: new Date(0).toISOString(), // old date so they appear at the end
  }));

  const allImages = [...images, ...formattedStaticImages];
  
  const dynamicCategories = Array.from(new Set(allImages.map(img => img.category)));
  const availableCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...dynamicCategories]));

  // Filter & Pagination Logic
  const filteredImages = allImages.filter(img => {
    const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
    const matchesSearch = img.altText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const currentImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto">
      <h1 className="text-4xl font-bold font-heading mb-8">Gallery Admin</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
              
              {!previewUrl ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-secondary/20'
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an image here, or click to select
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Images will be automatically compressed and converted to WebP.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setPreviewUrl(null);
                        setUploadFile(null);
                      }}
                      className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={uploadCategory} onValueChange={setUploadCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <SelectItem value="custom">+ Add New Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {uploadCategory === 'custom' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <Label>Custom Category Name</Label>
                      <Input 
                        value={customCategory} 
                        onChange={e => setCustomCategory(e.target.value)}
                        placeholder="e.g. Birthday"
                        autoFocus
                      />
                    </div>
                  )}

                  {(uploadCategory === 'Lighting' || (uploadCategory === 'custom' && customCategory.toLowerCase() === 'lighting')) && (
                    <div className="space-y-2">
                      <Label>Lighting Sub-Category</Label>
                      <Select value={uploadSubCategory} onValueChange={setUploadSubCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sub-Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {LIGHTING_SUBCATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Alt Text / Description</Label>
                    <Input 
                      value={uploadAltText} 
                      onChange={e => setUploadAltText(e.target.value)}
                      placeholder="e.g. Grand wedding stage in Goa"
                    />
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-center text-muted-foreground">
                        Processing and Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleUpload} 
                    disabled={isUploading || !uploadCategory || (uploadCategory === 'custom' && !customCategory) || (uploadCategory === 'Lighting' && !uploadSubCategory) || !uploadAltText}
                  >
                    Upload to Gallery
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Management Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {availableCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {currentImages.map((img) => (
                  <div key={img.id} className="relative rounded-lg overflow-hidden border bg-card flex flex-col shadow-sm transition-shadow hover:shadow-md">
                    <div className="aspect-[4/3] relative bg-muted">
                      <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <span className="px-2 py-1 bg-black/70 text-white text-[10px] sm:text-xs rounded-full backdrop-blur-sm">
                          {img.category} {img.subCategory ? `> ${img.subCategory}` : ''}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium line-clamp-2 flex-1" title={img.altText}>
                        {img.altText || "Untitled Image"}
                      </p>
                      {!img.id.startsWith('static-') ? (
                        <Button 
                          variant="destructive" 
                          size="icon"
                          className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                          onClick={() => setImageToDelete(img)}
                          title="Delete Image"
                        >
                          <Trash2 size={16} />
                        </Button>
                      ) : (
                        <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded shrink-0">
                          Static Code
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {filteredImages.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground">
                    No images found.
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination className="pt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete this image from the gallery and remove the file from cloud storage. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setImageToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
