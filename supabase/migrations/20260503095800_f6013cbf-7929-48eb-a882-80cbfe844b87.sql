UPDATE storage.buckets 
SET file_size_limit = 20971520,
    allowed_mime_types = ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/svg+xml','image/heic','image/heif','image/avif']
WHERE id = 'site-assets';