-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'operator');
CREATE TYPE field_type AS ENUM ('text', 'number', 'select');
CREATE TYPE session_status AS ENUM ('active', 'completed', 'paused');

-- Create companies table
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table for user management
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'operator',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create inventory sessions table
CREATE TABLE public.inventory_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    store_name TEXT,
    status session_status DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create custom fields table
CREATE TABLE public.custom_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    field_type field_type NOT NULL,
    options JSONB, -- For select type fields
    is_required BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create scanned products table
CREATE TABLE public.scanned_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.inventory_sessions(id) ON DELETE CASCADE NOT NULL,
    scanned_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    barcode TEXT NOT NULL,
    product_name TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    custom_field_values JSONB DEFAULT '{}',
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create session participants table for real-time collaboration
CREATE TABLE public.session_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.inventory_sessions(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(session_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scanned_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view their own company" ON public.companies
    FOR SELECT USING (
        id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
    );

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles from their company" ON public.profiles
    FOR SELECT USING (
        company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (id = auth.uid());

-- RLS Policies for inventory sessions
CREATE POLICY "Users can view sessions from their company" ON public.inventory_sessions
    FOR SELECT USING (
        company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Users can create sessions for their company" ON public.inventory_sessions
    FOR INSERT WITH CHECK (
        company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Users can update sessions from their company" ON public.inventory_sessions
    FOR UPDATE USING (
        company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
    );

-- RLS Policies for custom fields
CREATE POLICY "Users can view custom fields from their company" ON public.custom_fields
    FOR SELECT USING (
        company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Admins can manage custom fields" ON public.custom_fields
    FOR ALL USING (
        company_id IN (
            SELECT company_id FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for scanned products
CREATE POLICY "Users can view scanned products from their company sessions" ON public.scanned_products
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM public.inventory_sessions 
            WHERE company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
        )
    );

CREATE POLICY "Users can create scanned products in their company sessions" ON public.scanned_products
    FOR INSERT WITH CHECK (
        session_id IN (
            SELECT id FROM public.inventory_sessions 
            WHERE company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
        )
    );

CREATE POLICY "Users can update their own scanned products" ON public.scanned_products
    FOR UPDATE USING (scanned_by = auth.uid());

-- RLS Policies for session participants
CREATE POLICY "Users can view participants from their company sessions" ON public.session_participants
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM public.inventory_sessions 
            WHERE company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
        )
    );

CREATE POLICY "Users can join sessions from their company" ON public.session_participants
    FOR INSERT WITH CHECK (
        session_id IN (
            SELECT id FROM public.inventory_sessions 
            WHERE company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
        )
    );

-- Create indexes for better performance
CREATE INDEX idx_profiles_company_id ON public.profiles(company_id);
CREATE INDEX idx_inventory_sessions_company_id ON public.inventory_sessions(company_id);
CREATE INDEX idx_inventory_sessions_status ON public.inventory_sessions(status);
CREATE INDEX idx_scanned_products_session_id ON public.scanned_products(session_id);
CREATE INDEX idx_scanned_products_barcode ON public.scanned_products(barcode);
CREATE INDEX idx_session_participants_session_id ON public.session_participants(session_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON public.companies 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_inventory_sessions_updated_at 
    BEFORE UPDATE ON public.inventory_sessions 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_custom_fields_updated_at 
    BEFORE UPDATE ON public.custom_fields 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_scanned_products_updated_at 
    BEFORE UPDATE ON public.scanned_products 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        'operator'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable realtime for tables that need real-time updates
ALTER TABLE public.scanned_products REPLICA IDENTITY FULL;
ALTER TABLE public.session_participants REPLICA IDENTITY FULL;
ALTER TABLE public.inventory_sessions REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.scanned_products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory_sessions;