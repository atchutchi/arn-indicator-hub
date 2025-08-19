-- Insert indicators for Tráfego Terminado
INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '1',
  'N.º de chamadas de voz TERMINADAS com resposta / ENTRADA (Incoming)',
  'N.º Chamadas',
  true,
  false,
  false,
  1
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '1.1',
  'Do próprio operador (On-net)',
  'N.º Chamadas',
  true,
  false,
  false,
  2
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '1.2',
  'De outros operadores móveis nacionais (Off-net)',
  'N.º Chamadas',
  true,
  false,
  false,
  3
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '1.3',
  'De operadores das redes Internacionais',
  'N.º Chamadas',
  true,
  false,
  false,
  4
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '2',
  'Minutos de comunicação de voz TERMINADAS com resposta / ENTRADA (Incoming)',
  'Minutos',
  true,
  false,
  false,
  5
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '2.1',
  'Do próprio operador (On-net)',
  'Minutos',
  true,
  false,
  false,
  6
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '2.2',
  'De outros operadores móveis nacionais (Off-net)',
  'Minutos',
  true,
  false,
  false,
  7
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';

INSERT INTO indicators (section_id, code, name, unit, has_quarterly_data, has_monthly_data, has_annual_data, order_index) 
SELECT 
  s.id,
  '2.3',
  'De operadores das redes Internacionais',
  'Minutos',
  true,
  false,
  false,
  8
FROM indicator_sections s WHERE s.section_code = 'trafego_terminado';