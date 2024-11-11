CREATE TABLE "eggs" (
	"eggID"	INTEGER NOT NULL,
	"quanity"	INT NOT NULL,
	"speciesType"	TEXT NOT NULL,
	"date"	TEXT,
	PRIMARY KEY("eggID" AUTOINCREMENT),
	FOREIGN KEY('speciesType') REFERENCES speciesType(speciesID) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

CREATE TABLE "BirdType" (
	"birdTypeID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL,
	"color"	TEXT,
	"eggsPerYear"	INTEGER,
	"speciesType"	INTEGER,
	PRIMARY KEY("birdTypeID")
);

CREATE TABLE "ShoppingCart" (
	"TransactionID"	INTEGER NOT NULL,
	"eggID"	INTEGER NOT NULL,
	"Quanity"	INTEGER NOT NULL,
	CONSTRAINT "SCartPK" PRIMARY KEY('TransactionID','eggID'),
	FOREIGN KEY('TransactionID') REFERENCES "Transactions"('TransactionID') 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
	CONSTRAINT "ItemIDFKSC" FOREIGN KEY('eggID') REFERENCES 'eggs'('eggID')
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


CREATE TABLE "Transactions" (
	"TransactionID"	INTEGER,
	"CustomerID"	INTEGER NOT NULL,
	"TransactionDate"	TEXT NOT NULL,
	PRIMARY KEY("TransactionID" AUTOINCREMENT),
	CONSTRAINT "CustIDFK" FOREIGN KEY('CustomerID') REFERENCES 'customers'('CustomerID') 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

CREATE TABLE "animal" (
	"animalID"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"birthDay"	TEXT NOT NULL,
	"birdType"	INTEGER NOT NULL,
	"gender"	TEXT NOT NULL,
	PRIMARY KEY("animalID" AUTOINCREMENT)
);

CREATE TABLE "customers" (
	"CustomerID"	INTEGER,
	"lastDateBought"	TEXT,
	"currentBalance"	INTEGER NOT NULL DEFAULT 0,
	"email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"sessionID"	TEXT,
	"Admin"	NUMERIC NOT NULL DEFAULT 0,
	PRIMARY KEY("CustomerID" AUTOINCREMENT)
);

CREATE TABLE "speciesType" (
	"speciesID"	INTEGER NOT NULL,
	"speciesName"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("speciesID" AUTOINCREMENT)
);