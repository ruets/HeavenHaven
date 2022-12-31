CREATE TABLE encherissement(
   idEncherissement INT,
   date_ DATE,
   PRIMARY KEY(idEncherissement)
);

CREATE TABLE enchere(
   idEnchere VARCHAR(50),
   montantDeBase DOUBLE,
   DateDebut DATE,
   DateFin DATE,
   etat VARCHAR(50),
   caution VARCHAR(50),
   idEncherissement INT NOT NULL,
   PRIMARY KEY(idEnchere),
   FOREIGN KEY(idEncherissement) REFERENCES encherissement(idEncherissement)
);

CREATE TABLE ile(
   idIle INT,
   nom VARCHAR(50),
   superficie INT,
   latitude DOUBLE,
   longitude DOUBLE,
   nomPays VARCHAR(50),
   faune VARCHAR(50),
   flore VARCHAR(50),
   climat VARCHAR(50),
   construction VARCHAR(50),
   idEnchere VARCHAR(50) NOT NULL,
   PRIMARY KEY(idIle),
   FOREIGN KEY(idEnchere) REFERENCES enchere(idEnchere)
);

CREATE TABLE utilisateur(
   idUtilisateur INT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   numTel INT,
   Mail VARCHAR(50),
   password VARCHAR(50),
   idEnchere VARCHAR(50) NOT NULL,
   idEncherissement INT NOT NULL,
   PRIMARY KEY(idUtilisateur),
   FOREIGN KEY(idEnchere) REFERENCES enchere(idEnchere),
   FOREIGN KEY(idEncherissement) REFERENCES encherissement(idEncherissement)
);

CREATE TABLE client(
   idClient INT,
   codeParrain VARCHAR(50),
   idUtilisateur INT,
   PRIMARY KEY(idClient),
   FOREIGN KEY(idUtilisateur) REFERENCES utilisateur(idUtilisateur)
);

CREATE TABLE agent(
   idAgent INT,
   idClient INT NOT NULL,
   PRIMARY KEY(idAgent),
   FOREIGN KEY(idClient) REFERENCES client(idClient)
);

CREATE TABLE Asso_2(
   idUtilisateur INT,
   idAgent INT,
   PRIMARY KEY(idUtilisateur, idAgent),
   FOREIGN KEY(idUtilisateur) REFERENCES utilisateur(idUtilisateur),
   FOREIGN KEY(idAgent) REFERENCES agent(idAgent)
);

CREATE TABLE Vente(
   idUtilisateur_1 INT,
   etat VARCHAR(50),
   montant DOUBLE,
   idUtilisateur INT NOT NULL,
   PRIMARY KEY(idUtilisateur_1),
   UNIQUE(idUtilisateur),
   FOREIGN KEY(idUtilisateur_1) REFERENCES utilisateur(idUtilisateur),
   FOREIGN KEY(idUtilisateur) REFERENCES utilisateur(idUtilisateur)
);