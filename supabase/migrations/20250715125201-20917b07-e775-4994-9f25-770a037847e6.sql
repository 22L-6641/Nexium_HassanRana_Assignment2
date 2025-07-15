
-- Create a table to store blog summaries
CREATE TABLE public.blog_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  english_summary TEXT NOT NULL,
  urdu_summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on URL for faster lookups
CREATE INDEX idx_blog_summaries_url ON public.blog_summaries(url);

-- Create an index on created_at for sorting
CREATE INDEX idx_blog_summaries_created_at ON public.blog_summaries(created_at DESC);

-- Enable Row Level Security (RLS) - allowing public read access since this is a public blog summarizer
ALTER TABLE public.blog_summaries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read summaries (public access)
CREATE POLICY "Allow public read access to blog summaries" 
  ON public.blog_summaries 
  FOR SELECT 
  USING (true);

-- Create policy to allow anyone to insert summaries (public access)
CREATE POLICY "Allow public insert access to blog summaries" 
  ON public.blog_summaries 
  FOR INSERT 
  WITH CHECK (true);
