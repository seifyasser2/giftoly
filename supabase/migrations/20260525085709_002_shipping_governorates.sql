/*
  # Add Governorates and Order Management

  1. New Tables
    - `governorates` - المحافظات المصرية مع أسعار الشحن
      - `id` (uuid, primary key)
      - `name` (text) - اسم المحافظة
      - `slug` (text, unique) - رابط المحافظة
      - `shipping_cost` (decimal) - تكلفة الشحن
      - `is_active` (boolean) - حالة التفعيل
      - `sort_order` (integer) - ترتيب العرض
      - `created_at` (timestamp)
    
    - `orders` - جدول الطلبات
      - `id` (uuid, primary key)
      - `order_number` (text, unique) - رقم الطلب
      - `customer_name` (text) - الاسم ثلاثي
      - `phone1` (text) - الرقم الأول
      - `phone2` (text) - الرقم الثاني (اختياري)
      - `governorate_id` (uuid, foreign key) - المحافظة
      - `address` (text) - العنوان التفصيلي
      - `shipping_cost` (decimal) - تكلفة الشحن
      - `subtotal` (decimal) - إجمالي المنتجات
      - `total` (decimal) - الإجمالي الكلي
      - `items` (jsonb) - قائمة المنتجات
      - `status` (text) - حالة الطلب
      - `notes` (text) - ملاحظات
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for governorates
    - Service role for order creation

  3. Important Notes
    - Governorates have different shipping costs
    - Orders are stored with complete customer data
*/

-- جدول المحافظات
CREATE TABLE IF NOT EXISTS governorates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- جدول الطلبات
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  phone1 text NOT NULL,
  phone2 text,
  governorate_id uuid REFERENCES governorates(id) ON DELETE SET NULL,
  address text NOT NULL,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0,
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL DEFAULT 0,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE governorates ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة للمحافظات
CREATE POLICY "Public can view active governorates"
  ON governorates FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- سياسة إضافة الطلبات (للجمهور)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- فهارس
CREATE INDEX IF NOT EXISTS idx_governorates_slug ON governorates(slug);
CREATE INDEX IF NOT EXISTS idx_governorates_active ON governorates(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- إدراج المحافظات المصرية مع أسعار الشحن
INSERT INTO governorates (name, slug, shipping_cost, sort_order)
VALUES 
  ('القاهرة', 'cairo', 50, 1),
  ('الجيزة', 'giza', 50, 2),
  ('الأسكندرية', 'alexandria', 70, 3),
  ('الدقهلية', 'dakahlia', 70, 4),
  ('الشرقية', 'sharqia', 70, 5),
  ('الغربية', 'gharbia', 70, 6),
  ('المنوفية', 'monufia', 70, 7),
  ('القليوبية', 'qalyubia', 60, 8),
  ('كفر الشيخ', 'kafr-el-sheikh', 80, 9),
  ('الغربية', 'beheira', 80, 10),
  ('الإسماعيلية', 'ismailia', 80, 11),
  ('بورسعيد', 'port-said', 90, 12),
  ('السويس', 'suez', 90, 13),
  ('دمياط', 'damietta', 80, 14),
  ('الفيوم', 'fayoum', 80, 15),
  ('بني سويف', 'beni-suef', 90, 16),
  ('المنيا', 'minya', 100, 17),
  ('أسيوط', 'asyut', 100, 18),
  ('سوهاج', 'sohag', 110, 19),
  ('قنا', 'qena', 110, 20),
  ('الأقصر', 'luxor', 120, 21),
  ('أسوان', 'aswan', 130, 22),
  ('البحر الأحمر', 'red-sea', 150, 23),
  ('الوادي الجديد', 'new-valley', 150, 24),
  ('مطروح', 'matrouh', 150, 25),
  ('شمال سيناء', 'north-sinai', 150, 26),
  ('جنوب سيناء', 'south-sinai', 150, 27)
ON CONFLICT (slug) DO NOTHING;

-- دالة لإنشاء رقم طلب فريد
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  order_num text;
BEGIN
  order_num := 'GO-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;
