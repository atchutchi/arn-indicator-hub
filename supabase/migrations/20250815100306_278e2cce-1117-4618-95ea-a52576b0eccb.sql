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

-- Get section IDs for reference
DO $$
DECLARE
    estacoes_moveis_id uuid;
    trafego_originado_id uuid;
    trafego_terminado_id uuid;
    roaming_id uuid;
    internet_fixo_id uuid;
    trafego_internet_id uuid;
    receitas_id uuid;
    tarifario_id uuid;
    largura_banda_id uuid;
    empregos_id uuid;
    investimentos_id uuid;
BEGIN
    -- Get section IDs
    SELECT id INTO estacoes_moveis_id FROM public.indicator_sections WHERE section_code = 'estacoes_moveis';
    SELECT id INTO trafego_originado_id FROM public.indicator_sections WHERE section_code = 'trafego_originado';
    SELECT id INTO trafego_terminado_id FROM public.indicator_sections WHERE section_code = 'trafego_terminado';
    SELECT id INTO roaming_id FROM public.indicator_sections WHERE section_code = 'roaming_internacional';
    SELECT id INTO internet_fixo_id FROM public.indicator_sections WHERE section_code = 'internet_fixo';
    SELECT id INTO trafego_internet_id FROM public.indicator_sections WHERE section_code = 'trafego_internet';
    SELECT id INTO receitas_id FROM public.indicator_sections WHERE section_code = 'receitas';
    SELECT id INTO tarifario_id FROM public.indicator_sections WHERE section_code = 'tarifario_voz';
    SELECT id INTO largura_banda_id FROM public.indicator_sections WHERE section_code = 'largura_banda';
    SELECT id INTO empregos_id FROM public.indicator_sections WHERE section_code = 'empregos';
    SELECT id INTO investimentos_id FROM public.indicator_sections WHERE section_code = 'investimentos';

    -- Insert Estações Móveis indicators
    INSERT INTO public.indicators (code, name, unit, section_id, order_index, has_quarterly_data, has_monthly_data, has_annual_data) VALUES 
    ('1.1', 'Afectos a planos Pós-pagos', 'Estações móveis', estacoes_moveis_id, 1, true, false, false),
    ('1.1.a', 'Com utilização efectiva', 'Estações móveis', estacoes_moveis_id, 2, true, false, false),
    ('1.2', 'Afectos a planos pré-pagos', 'Estações móveis', estacoes_moveis_id, 3, true, false, false),
    ('1.2.a', 'Com utilização efectiva', 'Estações móveis', estacoes_moveis_id, 4, true, false, false),
    ('1.3', 'Associados a situações específicas', 'Estações móveis', estacoes_moveis_id, 5, true, false, false),
    ('1.4', 'Outros (residuais)', 'Estações móveis', estacoes_moveis_id, 6, true, false, false),
    ('2.1', 'Número de utilizadores do serviço de voz', 'Nº de utilizadores', estacoes_moveis_id, 7, false, true, false),
    ('2.1.1', 'Masculino', 'Nº de utilizadores', estacoes_moveis_id, 8, true, false, false),
    ('2.1.2', 'Feminino', 'Nº de utilizadores', estacoes_moveis_id, 9, true, false, false),
    ('2.1.3', 'Empresas', 'Nº de utilizadores', estacoes_moveis_id, 10, true, false, false),
    ('2.1.4', 'Governo', 'Nº de utilizadores', estacoes_moveis_id, 11, true, false, false),
    ('2.1.5', 'Banda larga (3G, 4G e 5G)', 'Nº de utilizadores', estacoes_moveis_id, 12, true, false, false);

    -- Insert Tráfego Originado indicators
    INSERT INTO public.indicators (code, name, unit, section_id, order_index, has_quarterly_data, has_monthly_data, has_annual_data) VALUES 
    ('1.1', 'N.º de chamadas de voz ORIGINADAS com resposta / SAÍDA (Outgoing)', 'N.º Chamadas', trafego_originado_id, 1, true, false, false),
    ('1.1.1', 'Para o próprio operador (On-net)', 'N.º Chamadas', trafego_originado_id, 2, true, false, false),
    ('1.1.2', 'Para outros operadores móveis nacionais (Off-net)', 'N.º Chamadas', trafego_originado_id, 3, true, false, false),
    ('1.1.3', 'Operador da rede Fixa', 'N.º Chamadas', trafego_originado_id, 4, true, false, false),
    ('1.1.4', 'Números curtos e números não geográficos', 'N.º Chamadas', trafego_originado_id, 5, true, false, false),
    ('2.1', 'Minutos de comunicação de voz ORIGINADAS com resposta / SAÍDA (Outgoing)', 'Minutos', trafego_originado_id, 6, true, false, false),
    ('2.1.1', 'Para o próprio operador móvel (On-net)', 'Minutos', trafego_originado_id, 7, true, false, false),
    ('2.1.2', 'Para outros operadores nacionais (Off-net)', 'Minutos', trafego_originado_id, 8, true, false, false),
    ('3.1', 'Número total de SMS enviados', 'N.º SMS', trafego_originado_id, 9, true, false, false),
    ('4.1', 'Número total de MMS enviados', 'N.º MMS', trafego_originado_id, 10, true, false, false);

    -- Insert Roaming Internacional indicators
    INSERT INTO public.indicators (code, name, unit, section_id, order_index, has_quarterly_data, has_monthly_data, has_annual_data) VALUES 
    ('ROUT.1', 'N.º clientes em roaming-out', 'N.º clientes', roaming_id, 1, true, false, false),
    ('ROUT.2', 'N.º de chamadas de voz efectuadas', 'N.º Chamadas', roaming_id, 2, true, false, false),
    ('ROUT.3', 'Minutos de voz', 'Minutos', roaming_id, 3, true, false, false),
    ('RIN.1', 'N.º clientes em roaming-in', 'N.º clientes', roaming_id, 4, true, false, false);

    -- Insert Receitas indicators
    INSERT INTO public.indicators (code, name, unit, section_id, order_index, has_quarterly_data, has_monthly_data, has_annual_data) VALUES 
    ('R.1', 'Receitas totais do serviço', 'Milhões de F CFA', receitas_id, 1, false, false, true),
    ('R.1.1', 'Receitas de serviços a clientes retalhistas (Pre Pago)', 'Milhões de F CFA', receitas_id, 2, false, false, true),
    ('R.1.1.1', 'Receitas de mensalidades (Pos Pago)', 'Milhões de F CFA', receitas_id, 3, false, false, true),
    ('R.1.1.2', 'Receitas de serviços de voz', 'Milhões de F CFA', receitas_id, 4, false, false, true),
    ('R.1.1.3', 'Receitas de serviços de voz em Roaming-out', 'Milhões de F CFA', receitas_id, 5, false, false, true),
    ('R.1.1.4', 'Receitas de serviços de mensagens', 'Milhões de F CFA', receitas_id, 6, false, false, true),
    ('R.1.1.5', 'Receitas de serviços de dados móveis', 'Milhões de F CFA', receitas_id, 7, false, false, true);

    -- Insert Empregos indicators
    INSERT INTO public.indicators (code, name, unit, section_id, order_index, has_quarterly_data, has_monthly_data, has_annual_data) VALUES 
    ('E.1', 'Número total de empregados', 'Nº pessoas', empregos_id, 1, false, true, false),
    ('E.1.1', 'Empregados permanentes', 'Nº pessoas', empregos_id, 2, true, false, false),
    ('E.1.2', 'Empregados temporários', 'Nº pessoas', empregos_id, 3, true, false, false),
    ('E.2.1', 'Masculino', 'Nº pessoas', empregos_id, 4, true, false, false),
    ('E.2.2', 'Feminino', 'Nº pessoas', empregos_id, 5, true, false, false);

END $$;