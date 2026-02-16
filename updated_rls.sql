-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 1. Drop old permissive policies
DROP POLICY IF EXISTS "Allow public read access on companies" ON companies;
DROP POLICY IF EXISTS "Allow public insert on companies" ON companies;
DROP POLICY IF EXISTS "Allow public update on companies" ON companies;
DROP POLICY IF EXISTS "Allow public delete on companies" ON companies;

DROP POLICY IF EXISTS "Allow public read access on products" ON products;
DROP POLICY IF EXISTS "Allow public insert on products" ON products;
DROP POLICY IF EXISTS "Allow public update on products" ON products;
DROP POLICY IF EXISTS "Allow public delete on products" ON products;

-- 2. Drop potential alternative old names
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
DROP POLICY IF EXISTS "Enable insert for all users" ON companies;
DROP POLICY IF EXISTS "Enable update for all users" ON companies;
DROP POLICY IF EXISTS "Enable delete for all users" ON companies;

DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for all users" ON products;
DROP POLICY IF EXISTS "Enable update for all users" ON products;
DROP POLICY IF EXISTS "Enable delete for all users" ON products;

-- 3. Drop NEW policy names (to avoid "policy already exists" errors)
DROP POLICY IF EXISTS "Public read access" ON companies;
DROP POLICY IF EXISTS "Authenticated users can insert" ON companies;
DROP POLICY IF EXISTS "Authenticated users can update" ON companies;
DROP POLICY IF EXISTS "Authenticated users can delete" ON companies;

DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert" ON products;
DROP POLICY IF EXISTS "Authenticated users can update" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete" ON products;

-- 4. Create new secure policies for companies
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

-- 5. Create new secure policies for products
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
