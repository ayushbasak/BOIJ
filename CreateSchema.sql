-- IN YOUR PSQL SHELL CREATE A DATABASE NAMED 'BOIJ'
-- THEN CONNECT TO THE DATABASE AND RUN THIS FILE (Read the Readme.MD for proper instructions)
-- Consumer Table
CREATE TABLE CONSUMER(
    ConsumerID INT,
    Name VARCHAR(20) NOT NULL,
    DOB DATE NOT NULL,
    Pincode INT NOT NULL,
    Phone BIGINT NOT NULL,
    AccountNo BIGINT NOT NULL,
    PIN INT NOT NULL,
    PRIMARY KEY (ConsumerID)
);

-- Balance Table
CREATE TABLE BALANCE(
    BalanceID INT,
    ConsumerID INT,
    AccountNo BIGINT,
    Balance INT,
    PRIMARY KEY(BalanceID),
    FOREIGN KEY (ConsumerID) REFERENCES CONSUMER(ConsumerID)
);

-- Transaction Table
CREATE TABLE "TRANSACTION"(
    TransactionID INT,
    SourceAccount BIGINT NOT NULL,
    TYPE VARCHAR(10) NOT NULL,
    Date DATE NOT NULL,
    Amount INT NOT NULL,
    Destination BIGINT NOT NULL,
    PRIMARY KEY (TransactionID),
);

