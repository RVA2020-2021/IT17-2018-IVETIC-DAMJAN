INSERT INTO obrazovanje
	VALUES(nextval('obrazovanje_seq'),'ftn iis','oas','diplomirani inzenjer informacionih sistema');
INSERT INTO obrazovanje
	VALUES(nextval('obrazovanje_seq'),'ftn sao','oas','diplomirani inzenjer saobracaja');
INSERT INTO obrazovanje
	VALUES(nextval('obrazovanje_seq'),'pmf mat','oas','diplomirani profesor matematike');
INSERT INTO obrazovanje
	VALUES(nextval('obrazovanje_seq'), 'gimanzija','srednja sk','prirodno-matematicki smer');
	
	
INSERT INTO preduzece
	VALUES(nextval('preduzece_seq'),'preduzece 1', 'fino preduzece',31412, 'novi sad');
INSERT INTO preduzece
	VALUES(nextval('preduzece_seq'),'preduzece 2','a onako sta ja znam moze to bolje' ,12313,'backi petrovac');
INSERT INTO preduzece
	VALUES(nextval('preduzece_seq'),'preduzece 3','bolje ista nego nista' ,53454,'zrenjanin');
INSERT INTO preduzece
	VALUES(nextval('preduzece_seq'),'preduzece 4','bolje nista nego ovo' ,13123,'beograd');
	
INSERT INTO sektor
	VALUES(nextval('sektor_seq'),'prvi sektor','prv',1);
INSERT INTO sektor
	VALUES(nextval('sektor_seq'),'drugi sektor','drg',2);
INSERT INTO sektor
	VALUES(nextval('sektor_seq'),'treci sektor','trc',3);
INSERT INTO sektor
	VALUES(nextval('sektor_seq'),'cetvrti sektor','cet',4);
	
INSERT INTO radnik
	VALUES(nextval('radnik_seq'),007112,'Jovan','Kornjaca',2,1);
INSERT INTO radnik
	VALUES(nextval('radnik_seq'),007683,'Pedja','Hrkljus',4,2);
INSERT INTO radnik
	VALUES(nextval('radnik_seq'),007114,'Milica','Njegovan',3,3);
INSERT INTO radnik
	VALUES(nextval('radnik_seq'),007541,'Milivoj','Bezdan',1,4);
	
	

	
INSERT INTO obrazovanje
	VALUES(-100, 'test naz','test oz','test opis');
INSERT INTO preduzece
	VALUES(-100, 'test naz','test opis','100','test lok');
INSERT INTO radnik
	VALUES(-100, 100,'test','testic',1,1);
INSERT INTO sektor
	VALUES(-100, 'test sektor','tes',1);
	

	
	
	