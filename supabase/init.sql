-- Best Time DJ Services - Supabase Schema
-- Run this in the Supabase SQL Editor

-- Claim requests table
CREATE TABLE IF NOT EXISTS claim_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor profiles table
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  slug TEXT UNIQUE,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  service_type TEXT NOT NULL DEFAULT 'dj' CHECK (service_type IN ('dj', 'venue', 'photographer', 'planner', 'other')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor services/pricing
CREATE TABLE IF NOT EXISTS vendor_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_min INTEGER,
  price_max INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE claim_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_services ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can insert claim requests
CREATE POLICY "Anyone can submit claim requests" ON claim_requests
  FOR INSERT WITH CHECK (true);

-- Users can read their own vendor profile
CREATE POLICY "Users can read own vendor profile" ON vendor_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own vendor profile
CREATE POLICY "Users can update own vendor profile" ON vendor_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own vendor profile
CREATE POLICY "Users can insert own vendor profile" ON vendor_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Published vendor profiles are publicly readable
CREATE POLICY "Published profiles are public" ON vendor_profiles
  FOR SELECT USING (is_published = true);

-- Users can manage their own services
CREATE POLICY "Users can manage own services" ON vendor_services
  FOR ALL USING (
    vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id = auth.uid())
  );

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_slug ON vendor_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_user_id ON vendor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_claim_requests_email ON claim_requests(email);
