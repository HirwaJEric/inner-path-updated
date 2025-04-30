
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", alt: "Futuristic digital grid" },
    { id: 2, src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", alt: "White robot" },
    { id: 3, src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", alt: "Colorful code display" },
    { id: 4, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", alt: "Person using laptop" },
    { id: 5, src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", alt: "Laptop on glass table" },
    { id: 6, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", alt: "MacBook with code" },
  ];

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      const currentIndex = images.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex].id);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = images.findIndex(img => img.id === selectedImage);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[prevIndex].id);
    }
  };

  const selectedImageData = selectedImage !== null 
    ? images.find(img => img.id === selectedImage) 
    : null;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Helmet>
          <title>Gallery | InnerPath Journey</title>
          <meta name="description" content="Explore moments from our events, workshops, and community gatherings." />
        </Helmet>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Image className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Gallery</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                onClick={() => openLightbox(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && selectedImageData && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 text-white z-10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center justify-between w-full h-full">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-12 w-12" />
              </Button>
              
              <div className="flex-1 flex items-center justify-center h-full">
                <img 
                  src={selectedImageData.src} 
                  alt={selectedImageData.alt} 
                  className="max-h-[80vh] max-w-full object-contain"
                />
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white"
                onClick={goToNext}
              >
                <ChevronRight className="h-12 w-12" />
              </Button>
            </div>
            
            <div className="text-white text-center mt-4">
              {selectedImageData.alt}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
