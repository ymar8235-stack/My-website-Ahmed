-- ================================================================
-- AHMED AMMAR PORTFOLIO PLATFORM — COMPLETE DATABASE SCHEMA
-- Run in Supabase SQL Editor
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For full-text search

-- ================================================================
-- 1. ROLES
-- ================================================================
CREATE TABLE IF NOT EXISTS roles (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL UNIQUE,
  slug       TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (name, slug, permissions) VALUES
  ('Super Admin', 'super-admin', '{"all": true}'),
  ('Editor', 'editor', '{"projects": true, "blog": true, "resources": true}'),
  ('Content Manager', 'content-manager', '{"blog": true, "resources": true, "faq": true}'),
  ('Viewer', 'viewer', '{"read": true}')
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 2. USERS (extends Supabase auth.users)
-- ================================================================
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  email      TEXT NOT NULL,
  avatar_url TEXT,
  role_id    UUID REFERENCES roles(id),
  is_active  BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 3. SEO METADATA
-- ================================================================
CREATE TABLE IF NOT EXISTS seo_metadata (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meta_title       TEXT,
  meta_description TEXT,
  keywords         TEXT,
  canonical_url    TEXT,
  og_title         TEXT,
  og_description   TEXT,
  og_image         TEXT,
  twitter_card     TEXT DEFAULT 'summary_large_image',
  schema_markup    JSONB,
  no_index         BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 4. PROJECT CATEGORIES
-- ================================================================
CREATE TABLE IF NOT EXISTS project_categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  name_ar     TEXT,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO project_categories (name, name_ar, slug, sort_order) VALUES
  ('Branding & Identity', 'الهوية البصرية', 'branding', 1),
  ('Packaging Design', 'تصميم التغليف', 'packaging', 2),
  ('Social Media & Ads', 'السوشيال ميديا والإعلانات', 'social', 3),
  ('UI/UX Design', 'تصميم المواقع والتطبيقات', 'web', 4)
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 5. PROJECTS
-- ================================================================
CREATE TABLE IF NOT EXISTS projects (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  title_ar            TEXT,
  slug                TEXT NOT NULL UNIQUE,
  category_id         UUID REFERENCES project_categories(id),
  industry            TEXT,
  client_name         TEXT,
  short_description   TEXT,
  short_description_ar TEXT,
  full_description    TEXT,
  full_description_ar TEXT,
  cover_image         TEXT,
  accent_color        TEXT DEFAULT '#0071E3',
  featured            BOOLEAN DEFAULT FALSE,
  status              TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  publish_date        TIMESTAMPTZ,
  seo_id              UUID REFERENCES seo_metadata(id),
  sort_order          INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Insert real projects from portfolio
INSERT INTO projects (title, title_ar, slug, industry, featured, status, sort_order) VALUES
  ('Taqnia', 'تقنية', 'taqnia-tech-education-platform', 'EdTech', TRUE, 'published', 1),
  ('NovaTech', 'نوفاتك', 'novatech-ai-brand-identity', 'AI & Automation', TRUE, 'published', 2),
  ('Genter Athlete', 'جينتر أثليت', 'genter-athlete-gym-brand', 'Fitness & Gym', TRUE, 'published', 3),
  ('El Khal', 'الخال', 'el-khal-restaurant-brand', 'Food & Restaurant', TRUE, 'published', 4),
  ('اكاديمية التفوق', 'اكاديمية التفوق', 'tafowq-academy-education-brand', 'Education', FALSE, 'published', 5),
  ('Sting Energy — اشحن طاقتك', 'ستينج — اشحن طاقتك', 'sting-energy-drink-campaign', 'FMCG', FALSE, 'published', 6),
  ('McDonald''s Campaign', 'حملة ماكدونالدز', 'mcdonalds-50-percent-campaign', 'Food & Restaurant', FALSE, 'published', 7),
  ('WE Telecom 5G', 'we للاتصالات 5G', 'we-telecom-5g-campaign', 'Telecommunications', FALSE, 'published', 8)
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 6. PROJECT GALLERY
-- ================================================================
CREATE TABLE IF NOT EXISTS project_gallery (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  media_id   UUID,
  image_url  TEXT NOT NULL,
  alt_text   TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 7. CASE STUDIES
-- ================================================================
CREATE TABLE IF NOT EXISTS case_studies (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id           UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  challenge            TEXT,
  challenge_ar         TEXT,
  strategy             TEXT,
  strategy_ar          TEXT,
  research             JSONB,
  concept_development  JSONB,
  design_process       JSONB,
  brand_system         JSONB,
  typography           JSONB,
  color_palette        JSONB,
  grid_system          JSONB,
  logo_construction    JSONB,
  mockups              JSONB,
  results              TEXT,
  results_ar           TEXT,
  final_cta            TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 8. PROJECT TAGS
-- ================================================================
CREATE TABLE IF NOT EXISTS project_tags (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL UNIQUE,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_tag_relations (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id     UUID REFERENCES project_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

-- ================================================================
-- 9. SERVICES
-- ================================================================
CREATE TABLE IF NOT EXISTS services (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name               TEXT NOT NULL,
  name_ar            TEXT,
  slug               TEXT NOT NULL UNIQUE,
  description        TEXT,
  description_ar     TEXT,
  long_description   TEXT,
  long_description_ar TEXT,
  starting_price     NUMERIC(10,2),
  maximum_price      NUMERIC(10,2),
  currency           TEXT DEFAULT 'EGP',
  delivery_time      TEXT,
  delivery_time_ar   TEXT,
  icon               TEXT,
  features           JSONB,
  deliverables       JSONB,
  featured           BOOLEAN DEFAULT FALSE,
  is_active          BOOLEAN DEFAULT TRUE,
  sort_order         INTEGER DEFAULT 0,
  seo_id             UUID REFERENCES seo_metadata(id),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO services (name, name_ar, slug, starting_price, maximum_price, delivery_time, sort_order, featured) VALUES
  ('Logo Design', 'تصميم الشعار', 'logo-design', 500, 3000, '3–7 Days', 1, FALSE),
  ('Brand Identity Design', 'تصميم الهوية البصرية', 'brand-identity', 5000, 25000, '2–4 Weeks', 2, TRUE),
  ('Social Media Design', 'تصميم السوشيال ميديا', 'social-media-design', 250, 800, '1–3 Days', 3, FALSE),
  ('Website Design & Development', 'تصميم وتطوير المواقع', 'website-design', 2500, 15000, '1–3 Weeks', 4, FALSE),
  ('Print Design', 'التصميم المطبوع', 'print-design', 1000, 10000, '2–5 Days', 5, FALSE),
  ('Packaging Design', 'تصميم التغليف', 'packaging-design', 1500, 8000, '3–7 Days', 6, FALSE),
  ('Sticker Design', 'تصميم الملصقات', 'sticker-design', 300, 1000, '1–2 Days', 7, FALSE),
  ('Content Writing', 'كتابة المحتوى', 'content-writing', 500, 5000, 'Varies', 8, FALSE),
  ('Marketing Consultation', 'الاستشارة التسويقية', 'marketing-consultation', NULL, NULL, '60-min Session', 9, FALSE)
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 10. SERVICE FAQS
-- ================================================================
CREATE TABLE IF NOT EXISTS service_faqs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  question_ar TEXT,
  answer     TEXT NOT NULL,
  answer_ar  TEXT,
  sort_order INTEGER DEFAULT 0
);

-- ================================================================
-- 11. BLOG CATEGORIES
-- ================================================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  name_ar     TEXT,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO blog_categories (name, name_ar, slug, color) VALUES
  ('Brand Strategy', 'استراتيجية العلامة التجارية', 'brand-strategy', '#0071E3'),
  ('Case Studies', 'دراسات الحالة', 'case-studies', '#A855F7'),
  ('Client Education', 'تثقيف العملاء', 'client-education', '#22C55E')
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 12. BLOG ARTICLES
-- ================================================================
CREATE TABLE IF NOT EXISTS blog_articles (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  title_ar     TEXT,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT,
  excerpt_ar   TEXT,
  content      TEXT,
  content_ar   TEXT,
  cover_image  TEXT,
  author_id    UUID REFERENCES users(id),
  category_id  UUID REFERENCES blog_categories(id),
  reading_time INTEGER DEFAULT 5,
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','scheduled')),
  featured     BOOLEAN DEFAULT FALSE,
  views        INTEGER DEFAULT 0,
  seo_id       UUID REFERENCES seo_metadata(id),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 13. BLOG TAGS
-- ================================================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL UNIQUE,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_tag_relations (
  article_id UUID REFERENCES blog_articles(id) ON DELETE CASCADE,
  tag_id     UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ================================================================
-- 14. RESOURCES
-- ================================================================
CREATE TABLE IF NOT EXISTS resources (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  title_ar       TEXT,
  slug           TEXT NOT NULL UNIQUE,
  description    TEXT,
  description_ar TEXT,
  file_url       TEXT NOT NULL,
  file_type      TEXT NOT NULL,
  file_size      INTEGER,
  download_count INTEGER DEFAULT 0,
  requires_email BOOLEAN DEFAULT FALSE,
  featured       BOOLEAN DEFAULT FALSE,
  seo_id         UUID REFERENCES seo_metadata(id),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO resources (title, title_ar, slug, file_url, file_type) VALUES
  ('Ahmed Ammar Portfolio PDF', 'ملف أحمد عمار', 'portfolio-pdf', '/downloads/ahmed-ammar-portfolio.pdf', 'application/pdf'),
  ('Ahmed Ammar CV', 'السيرة الذاتية', 'cv', '/downloads/ahmed-ammar-cv.pdf', 'application/pdf')
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 15. CLIENTS
-- ================================================================
CREATE TABLE IF NOT EXISTS clients (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  logo        TEXT,
  website_url TEXT,
  description TEXT,
  industry    TEXT,
  featured    BOOLEAN DEFAULT FALSE,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 16. TESTIMONIALS
-- ================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name  TEXT NOT NULL,
  company_name TEXT,
  rating       SMALLINT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review       TEXT NOT NULL,
  review_ar    TEXT,
  avatar       TEXT,
  service_id   UUID REFERENCES services(id),
  featured     BOOLEAN DEFAULT FALSE,
  approved     BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 17. AWARDS
-- ================================================================
CREATE TABLE IF NOT EXISTS awards (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  title_ar     TEXT,
  description  TEXT,
  description_ar TEXT,
  award_image  TEXT,
  award_date   DATE,
  organization TEXT,
  featured     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO awards (title, title_ar, organization, featured) VALUES
  ('Arab Creators Certificate', 'شهادة المبدعين العرب', 'Arab Creators', TRUE)
ON CONFLICT DO NOTHING;

-- ================================================================
-- 18. FAQS
-- ================================================================
CREATE TABLE IF NOT EXISTS faqs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question    TEXT NOT NULL,
  question_ar TEXT,
  answer      TEXT NOT NULL,
  answer_ar   TEXT,
  category    TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO faqs (question, question_ar, answer, answer_ar, sort_order) VALUES
  ('How long does a branding project take?', 'كم يستغرق مشروع العلامة التجارية؟', 'A complete brand identity system typically takes 2–4 weeks. A logo-only project takes 3–7 business days.', 'يستغرق نظام الهوية البصرية الكامل عادةً 2-4 أسابيع. مشروع الشعار فقط يستغرق 3-7 أيام عمل.', 1),
  ('Do you provide source files?', 'هل تقدم ملفات المصدر؟', 'Yes. All projects include complete source files (AI, EPS, PDF) plus ready-to-use PNG and JPG versions.', 'نعم. تتضمن جميع المشاريع ملفات المصدر الكاملة بالإضافة إلى إصدارات PNG و JPG جاهزة للاستخدام.', 2),
  ('What payment methods are accepted?', 'ما طرق الدفع المقبولة؟', 'Bank transfer, Vodafone Cash, InstaPay, and online payment. A 50% deposit is required before starting.', 'تحويل بنكي، فودافون كاش، إنستاباي، ودفع إلكتروني. مطلوب دفعة أولى 50% قبل البدء.', 3),
  ('Can you redesign an existing brand?', 'هل يمكنك إعادة تصميم علامة تجارية موجودة؟', 'Absolutely. Rebranding involves a full audit, competitor analysis, and strategic repositioning before design begins.', 'بالتأكيد. تشمل إعادة التسمية التجارية مراجعة كاملة وتحليل منافسين وإعادة تحديد المواقع الاستراتيجية.', 4),
  ('Do you work with clients outside Egypt?', 'هل تعمل مع عملاء خارج مصر؟', 'Yes. All work is fully remote, supporting clients across the Middle East, Gulf, North Africa, and internationally.', 'نعم. جميع الأعمال عن بعد بالكامل، مع دعم العملاء في الشرق الأوسط والخليج وشمال أفريقيا ودولياً.', 5)
ON CONFLICT DO NOTHING;

-- ================================================================
-- 19. LEADS
-- ================================================================
CREATE TABLE IF NOT EXISTS leads (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT,
  company             TEXT,
  country             TEXT,
  industry            TEXT,
  service_requested   TEXT,
  budget              TEXT,
  timeline            TEXT,
  project_description TEXT,
  attachment_url      TEXT,
  lead_source         TEXT DEFAULT 'website',
  status              TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','proposal_sent','negotiation','won','lost','archived')),
  utm_source          TEXT,
  utm_medium          TEXT,
  utm_campaign        TEXT,
  ip_address          INET,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_notes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id    UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  note       TEXT NOT NULL,
  admin_id   UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 20. BOOKINGS
-- ================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id           UUID REFERENCES leads(id),
  full_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  consultation_type TEXT NOT NULL,
  booking_date      DATE NOT NULL,
  booking_time      TIME NOT NULL,
  timezone          TEXT DEFAULT 'Africa/Cairo',
  google_meet_url   TEXT,
  calendly_event_id TEXT,
  notes             TEXT,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled','rescheduled')),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 21. NEWSLETTER SUBSCRIBERS
-- ================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT,
  email            TEXT NOT NULL UNIQUE,
  language         TEXT DEFAULT 'en',
  is_active        BOOLEAN DEFAULT TRUE,
  subscribed_at    TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at  TIMESTAMPTZ
);

-- ================================================================
-- 22. DOWNLOADS
-- ================================================================
CREATE TABLE IF NOT EXISTS downloads (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id   UUID REFERENCES resources(id) ON DELETE CASCADE,
  user_email    TEXT,
  user_name     TEXT,
  download_date TIMESTAMPTZ DEFAULT NOW(),
  ip_address    INET
);

-- ================================================================
-- 23. MEDIA LIBRARY
-- ================================================================
CREATE TABLE IF NOT EXISTS media (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name    TEXT NOT NULL,
  file_type    TEXT NOT NULL,
  file_size    INTEGER,
  storage_path TEXT NOT NULL,
  public_url   TEXT NOT NULL,
  alt_text     TEXT,
  folder       TEXT DEFAULT 'general',
  uploaded_by  UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 24. WEBSITE SETTINGS
-- ================================================================
CREATE TABLE IF NOT EXISTS website_settings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO website_settings (key, value, description) VALUES
  ('site_name', '"Ahmed Ammar"', 'Site display name'),
  ('contact_email', '"ymar8235@gmail.com"', 'Primary contact email'),
  ('whatsapp_number', '"201153943689"', 'WhatsApp number'),
  ('telegram_username', '"201153943689"', 'Telegram contact'),
  ('default_language', '"en"', 'Default site language'),
  ('maintenance_mode', 'false', 'Enable maintenance mode'),
  ('years_experience', '5', 'Years of experience stat'),
  ('client_rating', '4.8', 'Average client rating'),
  ('total_reviews', '861', 'Total reviews count'),
  ('website_visits', '4179', 'Website visits stat')
ON CONFLICT (key) DO NOTHING;

-- ================================================================
-- 25. ANALYTICS
-- ================================================================
CREATE TABLE IF NOT EXISTS page_views (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_url   TEXT NOT NULL,
  visitor_id TEXT,
  referrer   TEXT,
  country    TEXT,
  device     TEXT,
  ip_address INET,
  viewed_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_views (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  visitor_id TEXT,
  viewed_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS article_views (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES blog_articles(id) ON DELETE CASCADE,
  visitor_id TEXT,
  viewed_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 26. ACTIVITY LOGS
-- ================================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id),
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   UUID,
  metadata    JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- INDEXES
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_articles(status);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_articles(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_articles(featured);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_articles(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at DESC);

-- Full-text search
CREATE INDEX IF NOT EXISTS idx_projects_search ON projects USING GIN(
  to_tsvector('english', coalesce(title,'') || ' ' || coalesce(industry,'') || ' ' || coalesce(short_description,''))
);
CREATE INDEX IF NOT EXISTS idx_blog_search ON blog_articles USING GIN(
  to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,''))
);

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================

-- Enable RLS
ALTER TABLE projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE services          ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs              ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards            ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources         ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads             ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs     ENABLE ROW LEVEL SECURITY;

-- Public read policies (published content)
CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published articles" ON blog_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view clients" ON clients FOR SELECT USING (TRUE);
CREATE POLICY "Public can view approved testimonials" ON testimonials FOR SELECT USING (approved = TRUE);
CREATE POLICY "Public can view active faqs" ON faqs FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view awards" ON awards FOR SELECT USING (TRUE);
CREATE POLICY "Public can view resources" ON resources FOR SELECT USING (TRUE);

-- Authenticated admin policies (full access)
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access articles" ON blog_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access leads" ON leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access lead_notes" ON lead_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON website_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access logs" ON activity_logs FOR ALL USING (auth.role() = 'authenticated');

-- Public insert for leads (contact form)
CREATE POLICY "Anyone can create a lead" ON leads FOR INSERT WITH CHECK (TRUE);
-- Public insert for newsletter
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin manages subscribers" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');

-- ================================================================
-- UPDATED_AT TRIGGER
-- ================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_projects    BEFORE UPDATE ON projects       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_articles    BEFORE UPDATE ON blog_articles  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_services    BEFORE UPDATE ON services       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_case_studies BEFORE UPDATE ON case_studies  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_leads       BEFORE UPDATE ON leads          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_users       BEFORE UPDATE ON users          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
