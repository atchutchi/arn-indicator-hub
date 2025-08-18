-- Add unique constraints for ON CONFLICT to work
ALTER TABLE public.indicator_sections ADD CONSTRAINT unique_section_code UNIQUE (section_code);
ALTER TABLE public.quarters ADD CONSTRAINT unique_year_quarter UNIQUE (year, quarter);

-- Populate indicator_sections table
INSERT INTO public.indicator_sections (section_code, section_name, route_path, order_index, is_active) VALUES 
('estacoes_moveis', 'Estações Móveis', '/estacoes-moveis', 1, true),
('trafego_originado', 'Tráfego Originado', '/trafego-originado', 2, true),
('trafego_terminado', 'Tráfego Terminado de Voz', '/trafego-terminado', 3, true),
('roaming_internacional', 'Tráfego de Roaming Internacional', '/roaming-internacional', 4, true),
('internet_fixo', 'Internet Fixo', '/internet-fixo', 5, true),
('trafego_internet', 'Tráfego de Internet', '/trafego-internet', 6, true),
('receitas', 'Receitas de Serviço de Telecomunicações', '/receitas', 7, true),
('tarifario_voz', 'Plano Tarifário (Produtos e Serviços)', '/tarifario-voz', 8, true),
('largura_banda', 'Largura de Banda da Internet Internacional', '/largura-banda', 9, true),
('empregos', 'Empregos', '/empregos', 10, true),
('investimentos', 'Investimentos', '/investimentos', 11, true)
ON CONFLICT (section_code) DO UPDATE SET
  section_name = EXCLUDED.section_name,
  route_path = EXCLUDED.route_path,
  order_index = EXCLUDED.order_index,
  is_active = EXCLUDED.is_active;

-- Populate quarters table for 2024
INSERT INTO public.quarters (year, quarter, start_month, end_month, is_active) VALUES 
(2024, 1, 1, 3, true),
(2024, 2, 4, 6, true),
(2024, 3, 7, 9, true),
(2024, 4, 10, 12, true)
ON CONFLICT (year, quarter) DO UPDATE SET
  start_month = EXCLUDED.start_month,
  end_month = EXCLUDED.end_month,
  is_active = EXCLUDED.is_active;