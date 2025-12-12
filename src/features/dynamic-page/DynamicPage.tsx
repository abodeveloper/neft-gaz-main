import { useQuery } from "@tanstack/react-query";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Mail,
  Phone,
  User,
  Users,
  ZoomIn,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorMessage from "@/shared/components/atoms/error-message/ErrorMessage";
import LoadingSpinner from "@/shared/components/atoms/loading-spinner/LoadingSpinner";
import { getPageData } from "./api";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { localized } from "@/i18n";
import { useState } from "react";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL as string;

const getAbsoluteUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0); // to'g'ri nomlangan

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dynamic-page", slug],
    queryFn: () => getPageData(slug || ""),
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) {
    return (
      <ErrorMessage
        title={t("Failed to load page")}
        message={t("An error occurred. Please try again later.")}
      />
    );
  }

  const images = (data.images || []).map((img: any) => ({
    src: getAbsoluteUrl(typeof img === "string" ? img : img.image || img),
  }));

  const getEmployeeImage = (emp: any) => {
    if (!emp.image) return null;
    if (typeof emp.image === "string") return getAbsoluteUrl(emp.image);
    if (Array.isArray(emp.image) && emp.image[0]?.image)
      return getAbsoluteUrl(emp.image[0].image);
    return null;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto">
        {/* Sarlavha */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {localized(data, "title")}
          </h1>
          {localized(data, "description") && (
            <div
              className="prose prose-lg dark:prose-invert text-left"
              dangerouslySetInnerHTML={{
                __html: localized(data, "description"),
              }}
            />
          )}
        </header>

        {/* Tabs */}
        <Tabs defaultValue="employees" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-muted/60 backdrop-blur-md border px-2 py-7 shadow-lg gap-2">
              <TabsTrigger
                value="employees"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-muted-foreground hover:text-foreground"
                )}
              >
                <Users className="w-5 h-5 mr-2" />
                {t("Employees") || "Xodimlar"}
              </TabsTrigger>

              <TabsTrigger
                value="gallery"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-muted-foreground hover:text-foreground"
                )}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                {t("Gallery") || "Galereya"}
              </TabsTrigger>

              <TabsTrigger
                value="documents"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText className="w-5 h-5 mr-2" />
                {t("Documents") || "Hujjatlar"}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* XODIMLAR */}
          <TabsContent value="employees">
            {data.employees?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.employees.map((emp: any) => {
                  const imgUrl = getEmployeeImage(emp);
                  return (
                    <Card
                      key={emp.id}
                      className="overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-[3/4] bg-muted/30">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={localized(emp, "full_name")}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <User className="w-20 h-20 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5 text-center">
                        <h3 className="font-semibold text-lg text-foreground">
                          {localized(emp, "full_name")}
                        </h3>
                        <Badge variant="secondary" className="mt-2">
                          {localized(emp, "position")}
                        </Badge>

                        <div className="mt-4 space-y-2 text-sm">
                          {emp.phone && emp.phone !== "string" && (
                            <a
                              href={`tel:${emp.phone}`}
                              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                            >
                              <Phone className="w-4 h-4" />
                              {emp.phone}
                            </a>
                          )}
                          {emp.email && !emp.email.includes("example.com") && (
                            <a
                              href={`mailto:${emp.email}`}
                              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary break-all"
                            >
                              <Mail className="w-4 h-4" />
                              {emp.email}
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-center py-20 text-muted-foreground text-lg">
                {t("No employees available")}
              </p>
            )}
          </TabsContent>

          {/* GALEREYA */}
          <TabsContent value="gallery">
            {images.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setPhotoIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className="group relative aspect-square overflow-hidden rounded-xl border bg-muted/50 cursor-zoom-in shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={img.src}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Lupa to'liq o'rtada */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>

                <Lightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  index={photoIndex}
                  slides={images}
                  plugins={[Thumbnails]}
                />
              </>
            ) : (
              <p className="text-center py-20 text-muted-foreground text-lg">
                {t("No images available")}
              </p>
            )}
          </TabsContent>

          {/* HUJJATLAR */}
          <TabsContent value="documents">
            {data.files?.length ? (
              <div className="grid gap-4 max-w-4xl mx-auto">
                {data.files.map((file: any) => {
                  const fileName = file.file.split("/").pop() || "Fayl";
                  return (
                    <Card key={file.id} className="overflow-hidden">
                      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {localized(file, "title") || fileName}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {fileName}
                            </p>
                          </div>
                        </div>

                        <Button size="sm" className="w-full sm:w-auto">
                          <a
                            href={getAbsoluteUrl(file.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            {t("Download")}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-center py-20 text-muted-foreground text-lg">
                {t("No files available")}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DynamicPage;
