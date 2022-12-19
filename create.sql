insert into regiao values ('sul');
insert into regiao values ('sudeste');
insert into regiao values ('nordeste');
insert into regiao values ('centro-oeste');
insert into regiao values ('norte');

\copy cultura(nome, dias_cultivo) from 'tmp/cultura.csv' delimiter ',' csv header encoding 'UTF8';
\copy calendario_agricola(id, cultura_id, regiao_id, epoca_plantio) from 'tmp/calendario_agricola.csv' delimiter ',' csv header encoding 'UTF8';