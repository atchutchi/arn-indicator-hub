-- Insert indicators for Tráfego Originado section
INSERT INTO public.indicator_sections (section_code, section_name, route_path, order_index) 
VALUES ('trafego_originado', 'B. TRÁFEGO ORIGINADO', '/trafego-originado', 2)
ON CONFLICT (section_code) DO NOTHING;

-- Get the section ID for trafego_originado
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM public.indicator_sections WHERE section_code = 'trafego_originado';

    -- Insert indicators for Número de comunicações de voz
    INSERT INTO public.indicators (code, name, unit, section_id, has_quarterly_data, has_monthly_data, has_annual_data, order_index) VALUES
    ('1.1', 'N.º de chamadas de voz ORIGINADAS com resposta / SAÍDA (Outgoing)', 'N.º Chamadas', section_uuid, true, false, false, 1),
    ('1.1.1', 'Para o próprio operador (On-net)', 'N.º Chamadas', section_uuid, true, false, false, 2),
    ('1.1.2', 'Para outros operadores móveis nacionais (Off-net)', 'N.º Chamadas', section_uuid, true, false, false, 3),
    ('1.1.2.1', 'Orange', 'N.º Chamadas', section_uuid, true, false, false, 4),
    ('1.1.3', 'Operador da rede Fixa', 'N.º Chamadas', section_uuid, true, false, false, 5),
    ('1.1.4', 'Números curtos e números não geográficos', 'N.º Chamadas', section_uuid, true, false, false, 6),
    ('1.1.5', 'Para operadores das redes Internacionais', 'N.º Chamadas', section_uuid, true, false, false, 7),
    ('1.1.5.1', 'CEDEAO', 'N.º Chamadas', section_uuid, true, false, false, 8),
    ('1.1.5.2', 'PALOP', 'N.º Chamadas', section_uuid, true, false, false, 9),
    ('1.1.5.3', 'CPLP', 'N.º Chamadas', section_uuid, true, false, false, 10),
    ('1.1.5.4', 'Resto de Africa', 'N.º Chamadas', section_uuid, true, false, false, 11),
    ('1.1.5.5', 'Resto do mundo', 'N.º Chamadas', section_uuid, true, false, false, 12),

    -- Volume de tráfego de voz em minutos
    ('2.1', 'Minutos de comunicação de voz ORIGINADAS com resposta / SAÍDA (Outgoing)', 'Minutos', section_uuid, true, false, false, 13),
    ('2.1.1', 'Para o próprio operador móvel (On-net)', 'Minutos', section_uuid, true, false, false, 14),
    ('2.1.2', 'Para outros operadores nacionais (Off-net)', 'Minutos', section_uuid, true, false, false, 15),
    ('2.1.2.1', 'Operador móvel A (Orange)', 'Minutos', section_uuid, true, false, false, 16),
    ('2.1.3', 'Operador da rede Fixa', 'Minutos', section_uuid, true, false, false, 17),
    ('2.1.4', 'Números curtos e números não geográficos', 'Minutos', section_uuid, true, false, false, 18),
    ('2.1.5', 'Para operadores das redes internacionais', 'Minutos', section_uuid, true, false, false, 19),

    -- Serviço de mensagens SMS
    ('3.1', 'Número total de SMS enviados', 'N.º SMS', section_uuid, true, false, false, 20),
    ('3.1.1', 'On-net', 'N.º SMS', section_uuid, true, false, false, 21),
    ('3.1.2', 'Off-net', 'N.º SMS', section_uuid, true, false, false, 22),
    ('3.1.3', 'Internacional', 'N.º SMS', section_uuid, true, false, false, 23),

    -- Serviço de mensagens MMS
    ('4.1', 'Número total de MMS enviados', 'N.º MMS', section_uuid, true, false, false, 24);
END $$;