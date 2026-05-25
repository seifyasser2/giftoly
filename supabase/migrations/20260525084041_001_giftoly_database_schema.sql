/*
  # Giftoly Store Database Schema

  1. New Tables
    - `categories` - فئات الهدايا
      - `id` (uuid, primary key)
      - `name` (text) - اسم الفئة
      - `slug` (text, unique) - رابط الفئة
      - `description` (text) - وصف الفئة
      - `icon` (text) - أيقونة الفئة
      - `sort_order` (integer) - ترتيب العرض
      - `is_active` (boolean) - حالة التفعيل
      - `created_at` (timestamp)
    
    - `gifts` - جدول الهدايا
      - `id` (uuid, primary key)
      - `name` (text) - اسم الهدية
      - `slug` (text, unique) - رابط الهدية
      - `description` (text) - الوصف المختصر
      - `detailed_description` (text) - الوصف التفصيلي
      - `price` (decimal) - السعر
      - `sale_price` (decimal) - سعر الخصم (اختياري)
      - `category_id` (uuid, foreign key) - الفئة
      - `stock` (integer) - المخزون
      - `sku` (text) - رمز المنتج
      - `is_featured` (boolean) - ظهور في الرئيسية
      - `is_active` (boolean) - حالة التفعيل
      - `sort_order` (integer) - ترتيب العرض
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `gift_images` - صور الهدايا المتعددة
      - `id` (uuid, primary key)
      - `gift_id` (uuid, foreign key) - الهدية
      - `image_url` (text) - رابط الصورة
      - `alt_text` (text) - نص بديل
      - `sort_order` (integer) - ترتيب العرض
      - `is_primary` (boolean) - الصورة الرئيسية
      - `created_at` (timestamp)
    
    - `gift_components` - مكونات البوكس/الهدية
      - `id` (uuid, primary key)
      - `gift_id` (uuid, foreign key) - الهدية
      - `name` (text) - اسم المكون
      - `description` (text) - وصف المكون
      - `quantity` (integer) - الكمية
      - `icon` (text) - أيقونة المكون
      - `sort_order` (integer) - ترتيب العرض
      - `created_at` (timestamp)
    
    - `gift_tags` - وسوم الهدايا
      - `id` (uuid, primary key)
      - `gift_id` (uuid, foreign key) - الهدية
      - `tag` (text) - الوسم
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for active items
    - Service role for admin operations

  3. Important Notes
    - All timestamps use timestamptz for timezone support
    - Slugs are unique for SEO-friendly URLs
    - Soft delete via is_active flag
*/

-- إزالة الجداول القديمة إذا موجودة (للتطوير فقط)
-- DROP TABLE IF EXISTS gift_tags CASCADE;
-- DROP TABLE IF EXISTS gift_components CASCADE;
-- DROP TABLE IF EXISTS gift_images CASCADE;
-- DROP TABLE IF EXISTS gifts CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;

-- جدول الفئات
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'gift',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- جدول الهدايا
CREATE TABLE IF NOT EXISTS gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  detailed_description text,
  price decimal(10,2) NOT NULL,
  sale_price decimal(10,2),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  stock integer DEFAULT 999,
  sku text,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول صور الهدايا
CREATE TABLE IF NOT EXISTS gift_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id uuid REFERENCES gifts(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- جدول مكونات الهدايا
CREATE TABLE IF NOT EXISTS gift_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_id uuid REFERENCES gifts(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  quantity integer DEFAULT 1,
  icon text DEFAULT 'package',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- جدول وسوم الهدايا
CREATE TABLE IF NOT EXISTS gift_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_id uuid REFERENCES gifts(id) ON DELETE CASCADE,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS على جميع الجداول
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_tags ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة (للفئات النشطة فقط)
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Public can view active gifts"
  ON gifts FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Public can view gift images"
  ON gift_images FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM gifts
      WHERE gifts.id = gift_images.gallery_id
      AND gifts.is_active = true
    )
  );

CREATE POLICY "Public can view gift components"
  ON gift_components FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM gifts
      WHERE gifts.id = gift_components.gift_id
      AND gifts.is_active = true
    )
  );

CREATE POLICY "Public can view gift tags"
  ON gift_tags FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM gifts
      WHERE gifts.id = gift_tags.gift_id
      AND gifts.is_active = true
    )
  );

-- فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_gifts_slug ON gifts(slug);
CREATE INDEX IF NOT EXISTS idx_gifts_category ON gifts(category_id);
CREATE INDEX IF NOT EXISTS idx_gifts_featured ON gifts(is_featured);
CREATE INDEX IF NOT EXISTS idx_gifts_active ON gifts(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_gift_images_gift ON gift_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gift_components_gift ON gift_components(gift_id);
CREATE INDEX IF NOT EXISTS idx_gift_tags_gift ON gift_tags(gift_id);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تطبيق الدالة على جدور الهدايا
DROP TRIGGER IF EXISTS update_gifts_updated_at ON gifts;
CREATE TRIGGER update_gifts_updated_at
  BEFORE UPDATE ON gifts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- إدراج الفئات الافتراضية
INSERT INTO categories (name, slug, description, icon, sort_order)
VALUES 
  ('صناديق فاخرة', 'luxury-boxes', 'تشكيلة من الصناديق الفاخرة والمتكاملة', 'box', 1),
  ('زهور طبيعية', 'fresh-flowers', 'باقات زهور طبيعية منسقة بعناية', 'flower', 2),
  ('عطور راقية', 'luxury-perfumes', 'مجموعة من أرقى العطور العالمية', 'sparkles', 3),
  ('هدايا مخصصة', 'custom-gifts', 'هداي مخصصة حسب طلبك', 'heart', 4)
ON CONFLICT (slug) DO NOTHING;

-- إدراج الهدايا الافتراضية مع الصور والمكونات
INSERT INTO gifts (name, slug, description, detailed_description, price, category_id, is_featured, stock)
VALUES 
  (
    'صندوق الفخامة المتكامل',
    'luxury-complete-box',
    'مجموعة فاخرة تحتوي على عطر فرنسي، شوكولاتة بلجيكية، ومفكرة جلدية أنيقة.',
    'صندوق هدايا فاخر يجمع بين أرقى المنتجات العالمية. يشمل عطر فرنسي من أشهر الماركات، شوكولاتة بلجيكية فاخرة، ومفكرة جلدية أنيقة مخصصة للإهداء. تغليف ملكي مع بطاقة إهداء مجانية.',
    1450.00,
    (SELECT id FROM categories WHERE slug = 'luxury-boxes'),
    true,
    50
  ),
  (
    'باقة الجوري الأحمر الملكية',
    'royal-red-roses',
    'تنسيق راقٍ من 50 وردة جوري طبيعية مع تغليف قطيفة أسود فاخر.',
    'باقة زهور ملكية مؤلفة من 50 وردة جوري طبيعية حمراء، منسقة بأيدي خبراء التزيين. تغليف فاخر من القطيفة السوداء مع شريط حريري ذهبي. مثالية لإبهار الشخص المحبوب.',
    680.00,
    (SELECT id FROM categories WHERE slug = 'fresh-flowers'),
    true,
    30
  ),
  (
    'مجموعة العطور الشرقية المميزة',
    'oriental-perfumes-collection',
    'زجاجة عطر بالعود الملكي مع دهن عود ومبخرة ذكية مطلية بالذهب.',
    'طقم عطور شرقية فاخر يشمل زجاجة عطر عود ملكي بتركيز عالي، زجاجة دهن عود أصلي، ومبخرة ذكية مطلية بالذهب عيار 24. مناسبة للمناسبات الرسمية والهدايا الراقية.',
    1890.00,
    (SELECT id FROM categories WHERE slug = 'luxury-perfumes'),
    true,
    25
  ),
  (
    'سوار الحفر المخصص بالاسم',
    'custom-engraved-bracelet',
    'سوار من الفضة الخالصة عيار 925 مطلي بالذهب، محفور بعناية حسب طلبك.',
    'سوار أنيق من الفضة الخالصة عيار 925 مطلي بالذهب الوردي. يتضمن حفر اسم مخصص أو رسالة قصيرة بتقنية الليزر الدقيقة. يأتي مع صندوق هدايا فاخر وشهادة ضمان.',
    520.00,
    (SELECT id FROM categories WHERE slug = 'custom-gifts'),
    true,
    100
  )
ON CONFLICT (slug) DO NOTHING;

-- إضافة صور للهدايا
INSERT INTO gift_images (gallery_id, image_url, alt_text, is_primary, sort_order)
VALUES
  -- صندوق الفخامة
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80', 'صندوق الفخامة المتكامل', true, 1),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'https://images.unsplash.com/photo-1513885535171-385926a1c0ac?w=800&q=80', 'محتويات صندوق الفخامة', false, 2),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b966?w=800&q=80', 'تغليف فاخر', false, 3),
  
  -- باقة الجوري
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80', 'باقة الجوري الأحمر الملكية', true, 1),
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'https://images.unsplash.com/photo-1518709594023-6eab9367d0e4?w=800&q=80', 'زهور الجوري الطبيعية', false, 2),
  
  -- مجموعة العطور
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80', 'مجموعة العطور الشرقية', true, 1),
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80', 'عطور العود الملكي', false, 2),
  
  -- السوار المخصص
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', 'سوار الحفر المخصص', true, 1),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'https://images.unsplash.com/photo-1611591437275-4ed533327399?w=800&q=80', 'تفاصيل السوار', false, 2),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80', 'صندوق الهدايا', false, 3)
ON CONFLICT DO NOTHING;

-- إضافة مكونات الهدايا
INSERT INTO gift_components (gift_id, name, description, quantity, icon, sort_order)
VALUES
  -- صندوق الفخامة
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'عطر فرنسي', 'عطر من أشهر الماركات العالمية بتركيز Eau de Parfum', 1, 'sparkles', 1),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'شوكولاتة بلجيكية', 'علبة شوكولاتة بلجيكية فاخرة 250 جرام', 1, 'gift', 2),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'مفكرة جلدية', 'مفكرة بجلد طبيعي بتصميم أنيق', 1, 'book-open', 3),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'صندوق تغليف', 'صندوق فاخر مع شريط حريري', 1, 'box', 4),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'بطاقة إهداء', 'بطاقة إهداء مجانية مخصصة', 1, 'heart', 5),
  
  -- باقة الجوري
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'ورد جوري طبيعي', '50 وردة جوري حمراء طازجة', 50, 'flower', 1),
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'تغليف قطيفة', 'تغليف أسود من القطيفة الفاخرة', 1, 'box', 2),
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'شريط حريري', 'شريط ذهبي عريض للزينة', 1, 'crown', 3),
  
  -- مجموعة العطور
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'عطر عود ملكي', 'زجاجة عطر عود بتركيز عالي 100 مل', 1, 'sparkles', 1),
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'دهن عود', 'زجاجة دهن عود أصلي 20 مل', 1, 'droplets', 2),
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'مبخرة ذكية', 'مبخرة مطلية بالذهب عيار 24', 1, 'award', 3),
  
  -- السوار المخصص
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'سوار فضة', 'سوار من الفضة عيار 925 مطلي بالذهب', 1, 'award', 1),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'حفر مخصص', 'حفر اسم أو رسالة بالليزر', 1, 'edit-3', 2),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'شهادة ضمان', 'شهادة ضمان بالجودة والمادة', 1, 'file-check', 3),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'صندوك هدايا', 'صندوك تغليف فاخر', 1, 'gift', 4)
ON CONFLICT DO NOTHING;

-- إضافة وسوم الهدايا
INSERT INTO gift_tags (gift_id, tag)
VALUES
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'فاخر'),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'مناسبات'),
  ((SELECT id FROM gifts WHERE slug = 'luxury-complete-box'), 'رجالي'),
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'رومانسي'),
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'زهور'),
  ((SELECT id FROM gifts WHERE slug = 'royal-red-roses'), 'عيد الحب'),
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'عطور'),
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'شرقية'),
  ((SELECT id FROM gifts WHERE slug = 'oriental-perfumes-collection'), 'راقي'),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'مخصص'),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'إكسسوارات'),
  ((SELECT id FROM gifts WHERE slug = 'custom-engraved-bracelet'), 'نسيمي')
ON CONFLICT DO NOTHING;
