-- Extend guides table for private video storage and task linking
ALTER TABLE public.guides
  ADD COLUMN IF NOT EXISTS video_path text,
  ADD COLUMN IF NOT EXISTS related_task_key text;

-- Create private storage bucket for course videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-videos', 'course-videos', false)
ON CONFLICT (id) DO NOTHING;

-- RLS: any authenticated user can read course videos (signed URLs only since bucket is private)
CREATE POLICY "Authenticated users can read course videos"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'course-videos');

-- RLS: only admins can upload/update/delete course videos
CREATE POLICY "Admins can upload course videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-videos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update course videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'course-videos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete course videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'course-videos' AND public.has_role(auth.uid(), 'admin'::app_role));