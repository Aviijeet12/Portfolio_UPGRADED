-- Create contacts table in Supabase
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow you to read all contacts (replace with your email)
CREATE POLICY "Allow admin to read all" ON contacts
  FOR SELECT TO authenticated
  USING (true);
