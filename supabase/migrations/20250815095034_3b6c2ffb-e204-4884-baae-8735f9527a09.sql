-- Create operators table
CREATE TABLE public.operators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create quarters configuration table
CREATE TABLE public.quarters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL CHECK (quarter >= 1 AND quarter <= 4),
  start_month INTEGER NOT NULL CHECK (start_month >= 1 AND start_month <= 12),
  end_month INTEGER NOT NULL CHECK (end_month >= 1 AND end_month <= 12),
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indicators sections table
CREATE TABLE public.indicator_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_code TEXT NOT NULL UNIQUE,
  section_name TEXT NOT NULL,
  route_path TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indicators table
CREATE TABLE public.indicators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES indicator_sections(id),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  has_quarterly_data BOOLEAN DEFAULT true,
  has_monthly_data BOOLEAN DEFAULT false,
  has_annual_data BOOLEAN DEFAULT false,
  parent_indicator_id UUID REFERENCES indicators(id),
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indicator data table
CREATE TABLE public.indicator_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  operator_id UUID REFERENCES operators(id),
  indicator_id UUID REFERENCES indicators(id),
  quarter_id UUID REFERENCES quarters(id),
  quarter_1 DECIMAL(15,2),
  quarter_2 DECIMAL(15,2),
  quarter_3 DECIMAL(15,2),
  quarter_4 DECIMAL(15,2),
  january DECIMAL(15,2),
  february DECIMAL(15,2),
  march DECIMAL(15,2),
  april DECIMAL(15,2),
  may DECIMAL(15,2),
  june DECIMAL(15,2),
  july DECIMAL(15,2),
  august DECIMAL(15,2),
  september DECIMAL(15,2),
  october DECIMAL(15,2),
  november DECIMAL(15,2),
  december DECIMAL(15,2),
  annual_value DECIMAL(15,2),
  observations TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'validated', 'approved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(operator_id, indicator_id, quarter_id)
);

-- Enable Row Level Security
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quarters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicator_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicator_data ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a telecom regulatory system)
CREATE POLICY "Allow all operations on operators" ON public.operators FOR ALL USING (true);
CREATE POLICY "Allow all operations on quarters" ON public.quarters FOR ALL USING (true);
CREATE POLICY "Allow all operations on indicator_sections" ON public.indicator_sections FOR ALL USING (true);
CREATE POLICY "Allow all operations on indicators" ON public.indicators FOR ALL USING (true);
CREATE POLICY "Allow all operations on indicator_data" ON public.indicator_data FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_operators_updated_at
  BEFORE UPDATE ON public.operators
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_indicator_data_updated_at
  BEFORE UPDATE ON public.indicator_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();