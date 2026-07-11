-- ============================================================
-- Milwaukee Vendor Platform — Multi-Tenancy Schema
-- Compatible with Supabase (Postgres + RLS + Auth)
-- bestofmke.com
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUMS
CREATE TYPE vendor_category AS ENUM (
  'bar_club','wedding_venue','bachelorette_activity','wedding_dj',
  'wedding_band','photo_booth','transportation','videography',
  'wedding_planner','photography','catering','wedding_cake',
  'florist','hair_makeup','officiant','dress_attire',
  'favors_gifts','jeweler','invitations_print',
  'hotel_accommodations','honeymoon_travel','decor_rentals'
);
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE vendor_role AS ENUM ('owner', 'editor', 'viewer');
CREATE TYPE price_range AS ENUM ('$', '$$', '$$$', '$$$$');
CREATE TYPE social_platform AS ENUM ('instagram','facebook','tiktok','pinterest','twitter','youtube','linkedin','yelp');
CREATE TYPE analytics_event AS ENUM ('profile_view','website_click','backlink_click','phone_click','gallery_view','contact_form');

-- VENDORS
CREATE TABLE vendors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  category        vendor_category NOT NULL,
  address         TEXT, phone TEXT, website TEXT, email TEXT, bio TEXT,
  logo_url        TEXT, cover_url TEXT,
  price_range     price_range,
  service_areas   TEXT[],
  capacity        TEXT,
  tags            TEXT[],
  backlink_url    TEXT GENERATED ALWAYS AS ('https://bestofmke.com/vendors/' || slug) STORED,
  is_claimed      BOOLEAN NOT NULL DEFAULT false,
  is_published    BOOLEAN NOT NULL DEFAULT true,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  is_verified     BOOLEAN NOT NULL DEFAULT false,
  source          TEXT DEFAULT 'seed',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX vendors_category_idx ON vendors (category);
CREATE INDEX vendors_slug_idx ON vendors (slug);
CREATE INDEX vendors_claimed_idx ON vendors (is_claimed);
CREATE INDEX vendors_published_idx ON vendors (is_published);

CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;
CREATE TRIGGER vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- VENDOR USERS
CREATE TABLE vendor_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role vendor_role NOT NULL DEFAULT 'owner',
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  UNIQUE (vendor_id, user_id)
);
CREATE INDEX vendor_users_vendor_idx ON vendor_users (vendor_id);
CREATE INDEX vendor_users_user_idx ON vendor_users (user_id);

-- CLAIM REQUESTS
CREATE TABLE claim_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL, contact_email TEXT NOT NULL, contact_phone TEXT,
  verification_note TEXT, status claim_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id), reviewed_at TIMESTAMPTZ,
  admin_note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (vendor_id, user_id)
);
CREATE INDEX claim_requests_status_idx ON claim_requests (status);

CREATE OR REPLACE FUNCTION approve_claim(claim_id UUID, admin_user_id UUID)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_claim claim_requests%ROWTYPE;
BEGIN
  SELECT * INTO v_claim FROM claim_requests WHERE id = claim_id;
  UPDATE claim_requests SET status = 'approved', reviewed_by = admin_user_id, reviewed_at = NOW() WHERE id = claim_id;
  UPDATE vendors SET is_claimed = true, is_verified = true WHERE id = v_claim.vendor_id;
  INSERT INTO vendor_users (vendor_id, user_id, role, accepted_at) VALUES (v_claim.vendor_id, v_claim.user_id, 'owner', NOW()) ON CONFLICT DO NOTHING;
END; $$;

-- VENDOR SIGNUPS
CREATE TABLE vendor_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL, category vendor_category NOT NULL,
  contact_name TEXT NOT NULL, contact_email TEXT NOT NULL,
  phone TEXT, website TEXT, address TEXT, bio TEXT,
  service_areas TEXT[], price_range price_range,
  status claim_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id), reviewed_at TIMESTAMPTZ,
  admin_note TEXT, vendor_id UUID REFERENCES vendors(id),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION approve_signup(signup_id UUID, admin_user_id UUID, vendor_slug TEXT)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_signup vendor_signups%ROWTYPE; v_new_id UUID;
BEGIN
  SELECT * INTO v_signup FROM vendor_signups WHERE id = signup_id;
  INSERT INTO vendors (slug,name,category,phone,website,email,bio,address,service_areas,price_range,is_claimed,is_published,is_verified,source)
  VALUES (vendor_slug,v_signup.business_name,v_signup.category,v_signup.phone,v_signup.website,v_signup.contact_email,v_signup.bio,v_signup.address,v_signup.service_areas,v_signup.price_range,true,false,false,'signup')
  RETURNING id INTO v_new_id;
  INSERT INTO vendor_users (vendor_id,user_id,role,accepted_at) VALUES (v_new_id,v_signup.user_id,'owner',NOW());
  UPDATE vendor_signups SET status='approved',reviewed_by=admin_user_id,reviewed_at=NOW(),vendor_id=v_new_id WHERE id=signup_id;
  RETURN v_new_id;
END; $$;

-- VENDOR GALLERY
CREATE TABLE vendor_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL, caption TEXT, sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VENDOR SOCIALS
CREATE TABLE vendor_socials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  platform social_platform NOT NULL, url TEXT NOT NULL,
  UNIQUE (vendor_id, platform)
);

-- VENDOR REVIEWS
CREATE TABLE vendor_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body TEXT, is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (vendor_id, reviewer_id)
);

-- VENDOR AVAILABILITY
CREATE TABLE vendor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  date DATE NOT NULL, is_available BOOLEAN NOT NULL DEFAULT true, note TEXT,
  UNIQUE (vendor_id, date)
);

-- VENDOR TAGS
CREATE TABLE vendor_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  tag TEXT NOT NULL, UNIQUE (vendor_id, tag)
);

-- VENDOR ANALYTICS
CREATE TABLE vendor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  event analytics_event NOT NULL, referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX vendor_analytics_vendor_idx ON vendor_analytics (vendor_id);

-- RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_analytics ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_vendor_member(v_vendor_id UUID) RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM vendor_users WHERE vendor_id = v_vendor_id AND user_id = auth.uid()); $$;
CREATE OR REPLACE FUNCTION is_vendor_owner(v_vendor_id UUID) RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM vendor_users WHERE vendor_id = v_vendor_id AND user_id = auth.uid() AND role = 'owner'); $$;

CREATE POLICY "public read published vendors" ON vendors FOR SELECT USING (is_published = true);
CREATE POLICY "members can update their vendor" ON vendors FOR UPDATE USING (is_vendor_member(id));
CREATE POLICY "members see team" ON vendor_users FOR SELECT USING (is_vendor_member(vendor_id));
CREATE POLICY "owners manage team" ON vendor_users FOR ALL USING (is_vendor_owner(vendor_id));
CREATE POLICY "users manage own claims" ON claim_requests FOR ALL USING (user_id = auth.uid());
CREATE POLICY "users manage own signups" ON vendor_signups FOR ALL USING (user_id = auth.uid());
CREATE POLICY "public read gallery" ON vendor_gallery FOR SELECT USING (EXISTS (SELECT 1 FROM vendors WHERE id = vendor_id AND is_published = true));
CREATE POLICY "members manage gallery" ON vendor_gallery FOR ALL USING (is_vendor_member(vendor_id));
CREATE POLICY "public read socials" ON vendor_socials FOR SELECT USING (EXISTS (SELECT 1 FROM vendors WHERE id = vendor_id AND is_published = true));
CREATE POLICY "members manage socials" ON vendor_socials FOR ALL USING (is_vendor_member(vendor_id));
CREATE POLICY "public read approved reviews" ON vendor_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "authenticated users insert reviews" ON vendor_reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "members read analytics" ON vendor_analytics FOR SELECT USING (is_vendor_member(vendor_id));
CREATE POLICY "anyone can log analytics" ON vendor_analytics FOR INSERT WITH CHECK (true);

-- VIEWS
CREATE VIEW admin_pending_claims AS SELECT cr.*, v.name AS vendor_name, v.category, v.is_claimed FROM claim_requests cr JOIN vendors v ON v.id = cr.vendor_id WHERE cr.status = 'pending' ORDER BY cr.created_at;
CREATE VIEW admin_pending_signups AS SELECT * FROM vendor_signups WHERE status = 'pending' ORDER BY submitted_at;
CREATE VIEW vendor_profiles AS SELECT v.*, ROUND(AVG(r.rating),1)::NUMERIC AS avg_rating, COUNT(r.id) AS review_count, COUNT(g.id) AS gallery_count FROM vendors v LEFT JOIN vendor_reviews r ON r.vendor_id=v.id AND r.is_approved=true LEFT JOIN vendor_gallery g ON g.vendor_id=v.id WHERE v.is_published=true GROUP BY v.id;

CREATE OR REPLACE FUNCTION generate_slug(input TEXT) RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN RETURN LOWER(REGEXP_REPLACE(REGEXP_REPLACE(TRIM(input),'[^a-zA-Z0-9\s-]','','g'),'\s+','-','g')); END; $$;
