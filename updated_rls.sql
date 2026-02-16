-- Enable RLS (already enabled, but good to ensure)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
DROP POLICY IF EXISTS "Enable insert for all users" ON companies;
DROP POLICY IF EXISTS "Enable update for all users" ON companies;
DROP POLICY IF EXISTS "Enable delete for all users" ON companies;

DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for all users" ON products;
DROP POLICY IF EXISTS "Enable update for all users" ON products;
DROP POLICY IF EXISTS "Enable delete for all users" ON products;

-- Create new policies for companies
CREATE POLICY "Public read access"
ON companies FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert"
ON companies FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
ON companies FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete"
ON companies FOR DELETE
TO authenticated
USING (true);

-- Create new policies for products
CREATE POLICY "Public read access"
ON products FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
ON products FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete"
ON products FOR DELETE
TO authenticated
USING (true);
