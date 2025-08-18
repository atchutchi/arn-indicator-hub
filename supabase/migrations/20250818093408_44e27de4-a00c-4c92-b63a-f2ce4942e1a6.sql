-- First, let's update the quarters table to support multiple years
-- Add more quarters for different years
INSERT INTO public.quarters (year, quarter, start_month, end_month, is_active) VALUES
(2023, 1, 1, 3, true),
(2023, 2, 4, 6, true),
(2023, 3, 7, 9, true),
(2023, 4, 10, 12, true),
(2025, 1, 1, 3, true),
(2025, 2, 4, 6, true),
(2025, 3, 7, 9, true),
(2025, 4, 10, 12, true),
(2026, 1, 1, 3, true),
(2026, 2, 4, 6, true),
(2026, 3, 7, 9, true),
(2026, 4, 10, 12, true)
ON CONFLICT (year, quarter) DO NOTHING;

-- Clear existing mobile stations indicators
DELETE FROM public.indicators WHERE section_id = (
  SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'
);

-- Now add the correct mobile stations indicators according to the YAML structure
INSERT INTO public.indicators (section_id, code, name, unit, has_monthly_data, has_quarterly_data, has_annual_data, order_index) VALUES

-- Get section_id for mobile stations
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '1.1', 'Afectos a planos Pós-pagos', 'Estações móveis', true, false, false, 1),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '1.1.a', 'Com utilização efectiva', 'Estações móveis', true, false, false, 2),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '1.2', 'Afectos a planos pré-pagos', 'Estações móveis', true, false, false, 3),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '1.2.a', 'Com utilização efectiva', 'Estações móveis', true, false, false, 4),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '1.3', 'Associados a situações específicas', 'Estações móveis', true, false, false, 5),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '1.4', 'Outros (residuais)', 'Estações móveis', true, false, false, 6),

-- Service users section
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.1', 'SMS', 'Nº de utilizadores', true, false, false, 7),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.2', 'MMS', 'Nº de utilizadores', true, false, false, 8),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.3', 'Mobile TV (indicar outro se houver)', 'Nº de utilizadores', true, false, false, 9),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.4', 'Roaming Internacional - OUT', 'Nº de utilizadores', true, false, false, 10),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5', 'Banda larga', 'Nº de utilizadores', false, true, false, 11),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.1', 'Utilizadores de serviço de 3G e upgrades', 'Nº de utilizadores', true, false, false, 12),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.1.1', 'Utilizadores de serviço de acesso à Internet em banda larga', 'Nº de utilizadores', true, false, false, 13),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.1.1.p', 'dos quais com ligação através de Placas (Box)', 'Nº de utilizadores', true, false, false, 14),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.1.1.q', 'dos quais com ligação através de Placas (USB)', 'Nº de utilizadores', true, false, false, 15),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.2', 'Utilizadores de serviço de 4G', 'Nº de utilizadores', true, false, false, 16),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.2.1', 'Utilizadores do serviço de acesso à Internet em banda larga', 'Nº de utilizadores', true, false, false, 17),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.2.1.p', 'dos quais com ligação através de Placas (Box)', 'Nº de utilizadores', true, false, false, 18),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.2.1.q', 'dos quais com ligação através de Placas (USB)', 'Nº de utilizadores', true, false, false, 19),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), '2.1.5.3', 'Utilizadores de serviço de 5G', 'Nº de utilizadores', true, false, false, 20),

-- Mobile Money indicators
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.1', 'Mobile Money - Número de utilizadores', 'Nº de utilizadores', false, true, false, 21),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.1.1', 'Mobile Money - Utilizadores Mulher', 'Nº de utilizadores', false, true, false, 22),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.1.2', 'Mobile Money - Utilizadores Homem', 'Nº de utilizadores', false, true, false, 23),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.2', 'Mobile Money - Total de carregamentos efectuados', 'Nº de transações', false, true, false, 24),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.2.1', 'Mobile Money - Carregamentos Mulher', 'Nº de transações', false, true, false, 25),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.2.2', 'Mobile Money - Carregamentos Homem', 'Nº de transações', false, true, false, 26),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.3', 'Mobile Money - Total de levantamentos efectuados', 'Nº de transações', false, true, false, 27),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.3.1', 'Mobile Money - Levantamentos Mulher', 'Nº de transações', false, true, false, 28),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.3.2', 'Mobile Money - Levantamentos Homem', 'Nº de transações', false, true, false, 29),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.4', 'Mobile Money - Total de Transferências', 'Nº de transações', false, true, false, 30),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.4.1', 'Mobile Money - Transferências Mulher', 'Nº de transações', false, true, false, 31),
((SELECT id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis'), 'MM.4.2', 'Mobile Money - Transferências Homem', 'Nº de transações', false, true, false, 32);

-- Add new columns to indicator_data for special mobile stations fields
ALTER TABLE public.indicator_data 
ADD COLUMN IF NOT EXISTS desativacoes numeric,
ADD COLUMN IF NOT EXISTS total numeric;