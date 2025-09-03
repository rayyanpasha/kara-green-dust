-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE complaint_category AS ENUM ('dust', 'noise', 'waste', 'air', 'water');
CREATE TYPE complaint_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE complaint_status AS ENUM ('received', 'in-review', 'action-taken', 'resolved');
CREATE TYPE hotspot_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE hotspot_status AS ENUM ('reported', 'verified', 'cleaning', 'completed');
CREATE TYPE product_category AS ENUM ('frame', 'applicant', 'kit', 'paint');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  phone TEXT,
  role user_role DEFAULT 'user',
  total_reports INTEGER DEFAULT 0,
  total_cleanups INTEGER DEFAULT 0,
  dust_collected_kg DECIMAL(10,2) DEFAULT 0,
  eco_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Hotspots table for community reporting
CREATE TABLE public.hotspots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  category complaint_category NOT NULL,
  priority hotspot_priority NOT NULL,
  status hotspot_status DEFAULT 'reported',
  reports_count INTEGER DEFAULT 1,
  upvotes INTEGER DEFAULT 0,
  dust_collected_kg DECIMAL(10,2),
  estimated_resolution TEXT,
  action_taken TEXT,
  reported_by UUID REFERENCES public.profiles(user_id) NOT NULL,
  verified_by UUID REFERENCES public.profiles(user_id),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Civic complaints table
CREATE TABLE public.civic_complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  category complaint_category NOT NULL,
  priority complaint_priority NOT NULL,
  status complaint_status DEFAULT 'received',
  upvotes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  estimated_resolution TEXT,
  action_taken TEXT,
  reported_by UUID REFERENCES public.profiles(user_id) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Products table for marketplace
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category product_category NOT NULL,
  specifications TEXT,
  application TEXT,
  coverage TEXT,
  impact_story TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  badges TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User favorites
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Complaint comments table
CREATE TABLE public.complaint_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.civic_complaints(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(user_id) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Hotspot support/upvotes table
CREATE TABLE public.hotspot_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotspot_id UUID REFERENCES public.hotspots(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(hotspot_id, user_id)
);

-- Complaint upvotes table
CREATE TABLE public.complaint_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.civic_complaints(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(complaint_id, user_id)
);

-- Newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  active BOOLEAN DEFAULT true
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civic_complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotspot_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid recursive RLS issues
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS user_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = _user_id;
$$;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Hotspots policies (public read, authenticated write)
CREATE POLICY "Anyone can view hotspots" ON public.hotspots FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create hotspots" ON public.hotspots FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own hotspots" ON public.hotspots FOR UPDATE USING (auth.uid() = reported_by);
CREATE POLICY "Admins can update any hotspot" ON public.hotspots FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

-- Civic complaints policies
CREATE POLICY "Anyone can view complaints" ON public.civic_complaints FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create complaints" ON public.civic_complaints FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own complaints" ON public.civic_complaints FOR UPDATE USING (auth.uid() = reported_by);
CREATE POLICY "Admins can update any complaint" ON public.civic_complaints FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- User favorites policies
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Order items policies
CREATE POLICY "Users can view order items for their orders" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create order items for their orders" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
);

-- Comments policies
CREATE POLICY "Anyone can view comments" ON public.complaint_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.complaint_comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own comments" ON public.complaint_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.complaint_comments FOR DELETE USING (auth.uid() = user_id);

-- Upvotes policies
CREATE POLICY "Anyone can view upvotes" ON public.hotspot_upvotes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own upvotes" ON public.hotspot_upvotes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view complaint upvotes" ON public.complaint_upvotes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own complaint upvotes" ON public.complaint_upvotes FOR ALL USING (auth.uid() = user_id);

-- Newsletter policies (public insert for subscriptions)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage newsletter" ON public.newsletter_subscriptions FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create indexes for performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_hotspots_location ON public.hotspots(location);
CREATE INDEX idx_hotspots_coordinates ON public.hotspots(latitude, longitude);
CREATE INDEX idx_hotspots_status ON public.hotspots(status);
CREATE INDEX idx_complaints_category ON public.civic_complaints(category);
CREATE INDEX idx_complaints_status ON public.civic_complaints(status);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_in_stock ON public.products(in_stock);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);

-- Create trigger functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hotspots_updated_at BEFORE UPDATE ON public.hotspots FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.civic_complaints FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for products
INSERT INTO public.products (name, description, price, category, specifications, application, coverage, impact_story, rating, in_stock, stock_quantity, badges, image_url) VALUES
('Urban Dust Moss Frame - Cubbon Park Collection', 'Living artwork created from dust collected around Cubbon Park, transformed into thriving moss ecosystem.', 3500.00, 'frame', '30cm x 40cm, Natural wood frame', 'Wall mounting, Indoor air purification', 'Purifies 15 sqm area', 'This frame represents 2.5kg of urban dust that would have polluted our air, now purifying your space while creating natural beauty.', 4.9, true, 25, '{"Bestseller", "Eco-Friendly", "Handcrafted"}', '/assets/moss-frames-collection.jpg'),
('Moss-Infused POP - Wall Application', 'Revolutionary moss-embedded Plaster of Paris for creating living walls that naturally purify air.', 1200.00, 'applicant', '5kg bag, covers 25 sqm', 'Mix with water, apply on walls, moss activates in 7-10 days', '25 sqm wall coverage', 'Each bag transforms ordinary walls into air-purifying surfaces, removing 200mg pollutants daily per sqm.', 4.8, true, 50, '{"Revolutionary", "DIY Friendly", "High Coverage"}', '/assets/moss-frames-collection.jpg'),
('Moss-Active Paint - Bengaluru Blend', 'Specialized paint infused with moss spores that develop into living air purification systems on your walls.', 2800.00, 'paint', '4L can, water-based, non-toxic', 'Apply like regular paint, mist weekly for moss activation', '40 sqm wall coverage', 'Creates living walls that remove formaldehyde, benzene, and other indoor pollutants while adding natural beauty.', 4.9, true, 30, '{"Innovative", "Easy Application", "Living Paint"}', '/assets/moss-frames-collection.jpg'),
('Moss Garden Starter Kit - Balcony Edition', 'Complete kit to create your own moss garden using collected dust, perfect for Bengaluru balconies.', 1800.00, 'kit', 'Includes containers, growth medium, moss cultures, tools', 'Follow guide to create 5 moss containers from local dust', 'Creates 5 small moss gardens', 'Enables families to transform their daily dust collection into thriving mini-ecosystems that purify 50L air/hour.', 4.7, true, 40, '{"Complete Kit", "Educational", "Family Project"}', '/assets/moss-frames-collection.jpg');