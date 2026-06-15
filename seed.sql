-- ================================================================
-- SEED DATA — Development & Demo
-- Run AFTER 001_initial.sql
-- ================================================================

-- Sample testimonials
INSERT INTO testimonials (client_name, company_name, rating, review, review_ar, featured, approved) VALUES
  ('Sarah Al-Mansouri', 'NovaTech AI', 5,
   'Ahmed delivered an exceptional brand identity for our AI startup. The logo construction and visual system perfectly communicate our technical precision and forward-thinking nature.',
   'قدّم أحمد هوية علامة تجارية استثنائية لشركتنا الناشئة في مجال الذكاء الاصطناعي.',
   TRUE, TRUE),
  ('Khalid Ibrahim', 'Genter Athlete', 5,
   'Outstanding work on our gym brand! The dark, bold aesthetic Ahmed created is exactly what we envisioned. Our members love the new identity.',
   'عمل رائع على علامتنا التجارية للصالة! الجمالية الداكنة والجريئة التي أنشأها أحمد هي بالضبط ما تصورناه.',
   TRUE, TRUE),
  ('Rana Hassan', 'El Khal Restaurant', 5,
   'The complete visual identity and packaging system Ahmed created exceeded all expectations. Every touchpoint feels authentic. Sales increased after launch.',
   'تجاوزت الهوية البصرية الكاملة ونظام التغليف الذي أنشأه أحمد جميع التوقعات. كل نقطة تواصل تبدو أصيلة.',
   TRUE, TRUE),
  ('Dr. Mohamed Saleh', 'Tafowq Academy', 5,
   'Ahmed designed a comprehensive brand identity for our educational academy. The complete stationery system and signage were delivered on time and with exceptional quality.',
   'صمّم أحمد هوية علامة تجارية شاملة لأكاديميتنا التعليمية. تم تسليم نظام القرطاسية الكامل واللافتات في الوقت المحدد وبجودة استثنائية.',
   FALSE, TRUE),
  ('Laila Nour', 'Taqnia Platform', 5,
   'The brand identity for Taqnia is brilliant. Ahmed understood our Arabic-first tech education vision perfectly.',
   'هوية العلامة التجارية لتقنية رائعة. فهم أحمد رؤيتنا التعليمية التقنية العربية أولاً بشكل مثالي.',
   FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- Sample blog articles
INSERT INTO blog_articles (title, title_ar, slug, excerpt, excerpt_ar, reading_time, status, featured, views, published_at) VALUES
  ('Logo vs Complete Visual Identity: What Every Business Needs to Know',
   'الشعار مقابل الهوية البصرية الكاملة: ما تحتاجه كل شركة',
   'logo-vs-brand-identity',
   'Most businesses think they need a logo. What they actually need is a complete visual identity system.',
   'معظم الشركات تعتقد أنها تحتاج إلى شعار. ما تحتاجه فعلاً هو نظام هوية بصرية متكامل.',
   6, 'published', TRUE, 1247, NOW() - INTERVAL '14 days'),
  ('How Brand Colors Influence Purchasing Decisions',
   'كيف تؤثر ألوان العلامة التجارية على قرارات الشراء',
   'how-brand-colors-influence-buying',
   'Color psychology is one of the most powerful and underused tools in brand identity design.',
   'علم نفس الألوان هو أحد أقوى الأدوات وأقلها استخداماً في تصميم هوية العلامة التجارية.',
   8, 'published', FALSE, 892, NOW() - INTERVAL '21 days'),
  ('Case Study: Building NovaTech — AI Brand Identity from Concept to Launch',
   'دراسة حالة: بناء هوية نوفاتك للذكاء الاصطناعي',
   'novatech-case-study',
   'A behind-the-scenes look at how we developed the complete brand identity system for NovaTech AI.',
   'نظرة خلف الكواليس على كيفية تطوير نظام الهوية البصرية الكامل لنوفاتك للذكاء الاصطناعي.',
   12, 'published', FALSE, 634, NOW() - INTERVAL '28 days'),
  ('How to Write a Professional Design Brief That Gets Better Results',
   'كيف تكتب موجزاً تصميمياً احترافياً يحقق نتائج أفضل',
   'how-to-write-design-brief',
   'A clear design brief is the single most important document in any branding project.',
   'الموجز التصميمي الواضح هو الوثيقة الأهم في أي مشروع علامة تجارية.',
   5, 'published', FALSE, 421, NOW() - INTERVAL '35 days')
ON CONFLICT (slug) DO NOTHING;

-- Sample leads (for demo/testing)
INSERT INTO leads (full_name, email, phone, company, service_requested, budget, project_description, status, lead_source) VALUES
  ('Mohammed Al-Rashid', 'mohammed@example.com', '+966501234567', 'Al-Rashid Group', 'Brand Identity Design', '5,000–15,000 EGP',
   'We need a complete brand identity for our new restaurant chain. Looking for something premium and modern.',
   'qualified', 'portfolio'),
  ('Fatima Khaled', 'fatima@startup.io', '+971504567890', 'Tech Startup', 'Logo Design', '1,000–5,000 EGP',
   'Early-stage tech startup needs a professional logo.',
   'new', 'website'),
  ('Ahmed Mostafa', 'ahmed.m@business.com', '+20101234567', 'Real Estate Co.', 'Website Design & Development', '15,000–30,000 EGP',
   'Corporate website for a real estate company with property listings.',
   'proposal_sent', 'blog'),
  ('Sara Ibrahim', 'sara@brand.co', '+201098765432', NULL, 'Social Media Design', 'Under 1,000 EGP',
   'Monthly social media design package for Instagram and Facebook.',
   'won', 'referral')
ON CONFLICT DO NOTHING;

-- Sample newsletter subscribers
INSERT INTO newsletter_subscribers (name, email, language) VALUES
  ('Ahmed Hassan', 'ahmed.h@example.com', 'ar'),
  ('John Smith', 'john.s@example.com', 'en'),
  ('Mariam Al-Ali', 'mariam@example.com', 'ar'),
  ('David Lee', 'david@example.com', 'en')
ON CONFLICT (email) DO NOTHING;
