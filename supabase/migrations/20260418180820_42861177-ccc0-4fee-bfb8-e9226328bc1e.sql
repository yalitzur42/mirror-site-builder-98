-- Enable RLS on user_devices
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own devices" ON public.user_devices;
DROP POLICY IF EXISTS "Users can delete own devices" ON public.user_devices;
DROP POLICY IF EXISTS "Admins can view all devices" ON public.user_devices;
DROP POLICY IF EXISTS "Admins can manage all devices" ON public.user_devices;

CREATE POLICY "Users can view own devices"
ON public.user_devices
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own devices"
ON public.user_devices
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all devices"
ON public.user_devices
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all devices"
ON public.user_devices
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Function to register/validate a device for current user (max 2)
CREATE OR REPLACE FUNCTION public.register_device(
  _device_id TEXT,
  _device_name TEXT DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID := auth.uid();
  _existing_count INT;
  _device_exists BOOLEAN;
BEGIN
  IF _user_id IS NULL THEN
    RETURN 'unauthenticated';
  END IF;

  -- Check if this device is already registered for this user
  SELECT EXISTS (
    SELECT 1 FROM public.user_devices
    WHERE user_id = _user_id AND device_id = _device_id
  ) INTO _device_exists;

  IF _device_exists THEN
    UPDATE public.user_devices
    SET last_seen = now(),
        device_name = COALESCE(_device_name, device_name)
    WHERE user_id = _user_id AND device_id = _device_id;
    RETURN 'ok';
  END IF;

  -- Count existing devices
  SELECT COUNT(*) INTO _existing_count
  FROM public.user_devices
  WHERE user_id = _user_id;

  IF _existing_count >= 2 THEN
    RETURN 'limit_reached';
  END IF;

  INSERT INTO public.user_devices (user_id, device_id, device_name, last_seen)
  VALUES (_user_id, _device_id, _device_name, now());

  RETURN 'ok';
END;
$$;