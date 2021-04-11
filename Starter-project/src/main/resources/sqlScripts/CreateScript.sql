DROP TABLE IF EXISTS obrazovanje CASCADE;
DROP TABLE IF EXISTS radnik CASCADE;
DROP TABLE IF EXISTS sektor CASCADE;
DROP TABLE IF EXISTS preduzece CASCADE;

DROP SEQUENCE IF EXISTS obrazovanje_seq;
DROP SEQUENCE IF EXISTS preduzece_seq;
DROP SEQUENCE IF EXISTS radnik_seq;
DROP SEQUENCE IF EXISTS sektor_seq;

CREATE TABLE obrazovanje(
	id integer not null,
	naziv varchar(100),
	stepen_strucne_spreme varchar(10),
	opis varchar(500)
);

CREATE TABLE radnik(
	id integer not null,
	ime varchar(50),
	prezime varchar(50),
	broj_lk integer,
	obrazovanje integer not null,
	sektor integer not null
);

CREATE TABLE preduzece(
	id integer not null,
	naziv varchar(100),
	pib integer,
	sediste varchar(100),
	opis varchar(500)
);

CREATE TABLE sektor(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(10),
	preduzece integer not null
);


ALTER TABLE obrazovanje 
	ADD CONSTRAINT pk_obrazovanje PRIMARY KEY (id);	
ALTER TABLE radnik 
	ADD CONSTRAINT pk_radnik PRIMARY KEY (id);	
ALTER TABLE preduzece 
	ADD CONSTRAINT pk_preduzece PRIMARY KEY (id);	
ALTER TABLE sektor 
	ADD CONSTRAINT pk_sektor PRIMARY KEY (id);
	
ALTER TABLE radnik
	ADD CONSTRAINT FK_radnik_obrazovanje FOREIGN KEY (obrazovanje) REFERENCES obrazovanje(id);	
ALTER TABLE radnik
	ADD CONSTRAINT FK_radnik_sektor FOREIGN KEY (sektor) REFERENCES sektor(id);	
ALTER TABLE sektor
	ADD CONSTRAINT FK_sektor_preduzece FOREIGN KEY (preduzece) REFERENCES preduzece(id);
	
CREATE INDEX idxpk_obrazovanje ON obrazovanje(id);
CREATE INDEX idxpk_radnik ON radnik(id);
CREATE INDEX idxpk_preduzece ON preduzece(id);
CREATE INDEX idxpk_sektor ON sektor(id);

CREATE INDEX idxfkradnik_obrazovanje ON radnik(obrazovanje);
CREATE INDEX idxfkradnik_sektor ON radnik(sektor);
CREATE INDEX idxfsektor_preduzece ON sektor(preduzece);

CREATE SEQUENCE obrazovanje_seq INCREMENT 1;
CREATE SEQUENCE preduzece_seq INCREMENT 1;
CREATE SEQUENCE radnik_seq INCREMENT 1;
CREATE SEQUENCE sektor_seq INCREMENT 1;