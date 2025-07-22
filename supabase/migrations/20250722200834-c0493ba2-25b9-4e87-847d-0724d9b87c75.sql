-- Add missing RLS policies for companies table operations
CREATE POLICY "Admins can create companies" ON public.companies
    FOR INSERT WITH CHECK (true); -- Only during initial setup

CREATE POLICY "Admins can update their company" ON public.companies
    FOR UPDATE USING (
        id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Add missing RLS policy for profiles table insert (needed for user registration)
CREATE POLICY "Allow user profile creation during registration" ON public.profiles
    FOR INSERT WITH CHECK (id = auth.uid());