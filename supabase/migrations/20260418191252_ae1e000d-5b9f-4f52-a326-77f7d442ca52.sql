-- Create stage request status enum
CREATE TYPE public.stage_request_status AS ENUM ('pending', 'approved', 'rejected');

-- Stage requests table
CREATE TABLE public.stage_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL CHECK (stage BETWEEN 1 AND 4),
  status public.stage_request_status NOT NULL DEFAULT 'pending',
  photos_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  admin_note TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.stage_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own requests" ON public.stage_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create own requests" ON public.stage_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all requests" ON public.stage_requests
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_stage_requests_user ON public.stage_requests(user_id);
CREATE INDEX idx_stage_requests_status ON public.stage_requests(status);

-- Weekly income table
CREATE TABLE public.weekly_income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_date DATE NOT NULL,
  haircuts_count INTEGER NOT NULL DEFAULT 0,
  avg_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  products_income NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_date)
);

ALTER TABLE public.weekly_income ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own income" ON public.weekly_income
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins view all income" ON public.weekly_income
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Student stage table (current stage per student)
CREATE TABLE public.student_stage (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_stage INTEGER NOT NULL DEFAULT 1 CHECK (current_stage BETWEEN 1 AND 4),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.student_stage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own stage" ON public.student_stage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own stage" ON public.student_stage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all stages" ON public.student_stage
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for stage photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('stage-photos', 'stage-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload own stage photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'stage-photos' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view stage photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'stage-photos');

CREATE POLICY "Users delete own stage photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'stage-photos' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins manage stage photos" ON storage.objects
  FOR ALL USING (
    bucket_id = 'stage-photos' AND public.has_role(auth.uid(), 'admin')
  );