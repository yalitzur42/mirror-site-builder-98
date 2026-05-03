import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { siteContentConfig, type PageConfig, type ContentField } from "@/lib/siteContentConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut, Save, ChevronDown, ChevronLeft, Upload, Image, FileText, Loader2, LayoutDashboard, Home, Info, Scissors, Droplets, GraduationCap, Images, Settings, Video
} from "lucide-react";
import GalleryFieldEditor from "@/components/admin/GalleryFieldEditor";

const pageIcons: Record<string, typeof Home> = {
  home: Home,
  about: Info,
  barbershop: Scissors,
  perm: Droplets,
  academy: GraduationCap,
  global: Settings,
};

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activePage, setActivePage] = useState<string>("home");
  const [contentValues, setContentValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Load content from DB
  useEffect(() => {
    const loadContent = async () => {
      setLoadingContent(true);
      const { data } = await supabase
        .from("site_content")
        .select("page_slug, section_key, field_key, content_value");

      const values: Record<string, string> = {};
      data?.forEach((row: any) => {
        values[`${row.page_slug}__${row.section_key}__${row.field_key}`] = row.content_value;
      });
      setContentValues(values);
      setLoadingContent(false);
    };
    loadContent();
  }, []);

  const getFieldValue = (pageSlug: string, sectionKey: string, field: ContentField) => {
    const key = `${pageSlug}__${sectionKey}__${field.key}`;
    return contentValues[key] ?? field.defaultValue;
  };

  const setFieldValue = (pageSlug: string, sectionKey: string, fieldKey: string, value: string) => {
    setContentValues(prev => ({
      ...prev,
      [`${pageSlug}__${sectionKey}__${fieldKey}`]: value,
    }));
  };

  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/heic", "image/heif", "image/avif"];
  const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
  const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

  const validateFile = (file: File, isVideo = false): string | null => {
    const allowedTypes = isVideo ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.type && !allowedTypes.includes(file.type)) return `סוג קובץ לא נתמך: ${file.type || file.name}. נסה JPG/PNG/WEBP.`;
    if (file.size > maxSize) return `הקובץ גדול מדי (מקסימום ${isVideo ? '100MB' : '20MB'})`;
    return null;
  };

  const handleImageUpload = async (pageSlug: string, sectionKey: string, fieldKey: string, file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast({ title: "שגיאה", description: validationError, variant: "destructive" });
      return;
    }
    const filePath = `${pageSlug}/${sectionKey}/${fieldKey}-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("site-assets").upload(filePath, file);
    if (error) {
      toast({ title: "שגיאה בהעלאת תמונה", description: error.message, variant: "destructive" });
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("site-assets").getPublicUrl(filePath);
    setFieldValue(pageSlug, sectionKey, fieldKey, publicUrl);
  };

  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleVideoUpload = async (pageSlug: string, sectionKey: string, fieldKey: string, file: File) => {
    const validationError = validateFile(file, true);
    if (validationError) {
      toast({ title: "שגיאה", description: validationError, variant: "destructive" });
      return;
    }
    setUploadingVideo(true);
    const filePath = `${pageSlug}/${sectionKey}/${fieldKey}-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("site-videos").upload(filePath, file);
    if (error) {
      toast({ title: "שגיאה בהעלאת סרטון", description: error.message, variant: "destructive" });
      setUploadingVideo(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("site-videos").getPublicUrl(filePath);
    setFieldValue(pageSlug, sectionKey, fieldKey, publicUrl);
    toast({ title: "הסרטון הועלה בהצלחה!" });
    setUploadingVideo(false);
  };

  const handleSaveSection = async (pageSlug: string, section: typeof siteContentConfig[0]["sections"][0]) => {
    setSaving(true);
    const upserts = section.fields.map(field => ({
      page_slug: pageSlug,
      section_key: section.key,
      field_key: field.key,
      field_type: field.type,
      field_label: field.label,
      content_value: getFieldValue(pageSlug, section.key, field),
      updated_by: user?.id,
    }));

    const { error } = await supabase.from("site_content").upsert(upserts, {
      onConflict: "page_slug,section_key,field_key",
    });

    if (error) {
      toast({ title: "שגיאה בשמירה", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "נשמר בהצלחה!" });
    }
    setSaving(false);
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentPage = siteContentConfig.find(p => p.slug === activePage);

  if (authLoading || loadingContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground text-base" dir="rtl">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-3 md:px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
          <h1 className="text-base md:text-xl font-bold truncate">ניהול תוכן – Macho</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground hidden md:inline">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={signOut} className="text-sm">
            <LogOut className="w-4 h-4" /> יציאה
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Desktop */}
        <aside className="w-56 min-h-[calc(100vh-57px)] bg-card border-l border-border p-4 space-y-1 hidden md:block sticky top-[57px] self-start">
          <p className="text-xs text-muted-foreground font-bold mb-3">דפים</p>
          {siteContentConfig.map(page => {
            const Icon = pageIcons[page.slug] || FileText;
            return (
              <button
                key={page.slug}
                onClick={() => setActivePage(page.slug)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activePage === page.slug
                    ? "bg-primary text-primary-foreground font-bold"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {page.title}
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-8 max-w-4xl">
          {/* Mobile page selector */}
          <div className="md:hidden mb-4">
            <select
              value={activePage}
              onChange={(e) => setActivePage(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-card border border-border text-foreground text-sm"
            >
              {siteContentConfig.map(page => (
                <option key={page.slug} value={page.slug}>{page.title}</option>
              ))}
            </select>
          </div>

          {currentPage && (
            <>
              <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">{currentPage.title}</h2>

              <div className="space-y-3 md:space-y-4">
                {currentPage.sections.map(section => {
                  const isExpanded = expandedSections[`${currentPage.slug}__${section.key}`] !== false;
                  return (
                    <div key={section.key} className="bg-card rounded-xl border border-border overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(`${currentPage.slug}__${section.key}`)}
                        className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="text-base md:text-xl font-bold">{section.title}</h3>
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                      </button>

                      {/* Section Fields */}
                      {isExpanded && (
                        <div className="p-3 md:p-4 pt-0 space-y-4 border-t border-border">
                          {section.fields.map(field => (
                            <div key={field.key} className="space-y-1.5">
                              <Label className="text-sm md:text-base text-foreground flex items-center gap-2">
                                {field.type === "image" ? <Image className="w-4 h-4" /> : field.type === "gallery" ? <Images className="w-4 h-4" /> : field.type === "video" ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                {field.label}
                              </Label>

                              {field.type === "text" && (
                                <Input
                                  value={getFieldValue(currentPage.slug, section.key, field)}
                                  onChange={(e) => setFieldValue(currentPage.slug, section.key, field.key, e.target.value)}
                                  className="text-sm md:text-base"
                                />
                              )}

                              {field.type === "textarea" && (
                                <Textarea
                                  value={getFieldValue(currentPage.slug, section.key, field)}
                                  onChange={(e) => setFieldValue(currentPage.slug, section.key, field.key, e.target.value)}
                                  className="text-sm md:text-base min-h-[80px] md:min-h-[100px]"
                                />
                              )}

                              {field.type === "image" && (
                                <div className="space-y-2">
                                  {getFieldValue(currentPage.slug, section.key, field) && (
                                    <img
                                      src={getFieldValue(currentPage.slug, section.key, field)}
                                      alt={field.label}
                                      className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-lg border border-border"
                                    />
                                  )}
                                  <div>
                                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors text-xs md:text-sm">
                                      <Upload className="w-4 h-4" />
                                      העלה תמונה
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleImageUpload(currentPage.slug, section.key, field.key, file);
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              )}

                              {field.type === "gallery" && (
                                <GalleryFieldEditor
                                  value={getFieldValue(currentPage.slug, section.key, field)}
                                  onChange={(val) => setFieldValue(currentPage.slug, section.key, field.key, val)}
                                  pageSlug={currentPage.slug}
                                  sectionKey={section.key}
                                  fieldKey={field.key}
                                />
                              )}

                              {field.type === "video" && (
                                <div className="space-y-2">
                                  {getFieldValue(currentPage.slug, section.key, field) && (
                                    <video
                                      src={getFieldValue(currentPage.slug, section.key, field)}
                                      controls
                                      className="w-full max-w-md rounded-lg border border-border"
                                    />
                                  )}
                                  <div>
                                    <label className={`inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors text-xs md:text-sm ${uploadingVideo ? 'opacity-50 pointer-events-none' : ''}`}>
                                      {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                      {uploadingVideo ? "מעלה סרטון..." : "העלה סרטון"}
                                      <input
                                        type="file"
                                        accept="video/mp4,video/webm,video/quicktime"
                                        className="hidden"
                                        disabled={uploadingVideo}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleVideoUpload(currentPage.slug, section.key, field.key, file);
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}


                          <div className="pt-2">
                            <Button
                              onClick={() => handleSaveSection(currentPage.slug, section)}
                              disabled={saving}
                              size="sm"
                              className="text-sm"
                            >
                              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                              שמור סקשן
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
