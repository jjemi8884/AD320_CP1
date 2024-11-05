


-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SJFarmDB` DEFAULT CHARACTER SET utf8 ;
USE `SJFarmDB` ;

-- -----------------------------------------------------
-- Table `mydb`.`eggs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`eggs` (
  `eggID` INT NOT NULL AUTO_INCREMENT,
  `eggType` ENUM('duck', 'goose', 'chicken') NOT NULL,
  `quanity` INT NOT NULL,
  PRIMARY KEY (`eggID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`birdTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`birdTypes` (
  `birdTypeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `color` VARCHAR(20) NULL,
  `estimatedYearlyEggs` INT NULL,
  `speciesType` SET('duck', 'Chicken', 'Goose') NOT NULL,
  `eggs_eggID` INT NOT NULL,
  PRIMARY KEY (`birdTypeID`),
  INDEX `fk_birdTypes_eggs1_idx` (`eggs_eggID` ASC) VISIBLE,
  CONSTRAINT `fk_birdTypes_eggs1`
    FOREIGN KEY (`eggs_eggID`)
    REFERENCES `mydb`.`eggs` (`eggID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ducks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ducks` (
  `duckID` INT NOT NULL AUTO_INCREMENT,
  `duckName` VARCHAR(20) NOT NULL,
  `duckBirthday` DATE NULL,
  `birdTypeID` INT NOT NULL,
  `gender` CHAR(1) NOT NULL,
  PRIMARY KEY (`duckID`),
  INDEX `fk_ducks_birdTypes1_idx` (`birdTypeID` ASC) VISIBLE,
  CONSTRAINT `fk_ducks_birdTypes1`
    FOREIGN KEY (`birdTypeID`)
    REFERENCES `mydb`.`birdTypes` (`birdTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`gooses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`gooses` (
  `gooseID` INT NOT NULL AUTO_INCREMENT,
  `gooseName` VARCHAR(20) NOT NULL,
  `gooseBirthday` DATE NULL,
  `birdTypeID` INT NOT NULL,
  `Gender` CHAR(1) NOT NULL,
  PRIMARY KEY (`gooseID`),
  INDEX `fk_gooses_birdTypes1_idx` (`birdTypeID` ASC) VISIBLE,
  CONSTRAINT `fk_gooses_birdTypes1`
    FOREIGN KEY (`birdTypeID`)
    REFERENCES `mydb`.`birdTypes` (`birdTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`chickens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`chickens` (
  `chickenID` INT NOT NULL AUTO_INCREMENT,
  `chickenName` VARCHAR(20) NOT NULL,
  `chickenBirhtday` VARCHAR(45) NULL,
  `birdTypeID` INT NOT NULL,
  `gender` CHAR(1) NOT NULL,
  PRIMARY KEY (`chickenID`),
  INDEX `fk_chickens_birdTypes1_idx` (`birdTypeID` ASC) VISIBLE,
  CONSTRAINT `fk_chickens_birdTypes1`
    FOREIGN KEY (`birdTypeID`)
    REFERENCES `mydb`.`birdTypes` (`birdTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`employees` (
  `employeeID` INT NOT NULL AUTO_INCREMENT,
  `employeeFirstName` VARCHAR(15) NOT NULL,
  `employeeLastName` VARCHAR(15) NOT NULL,
  `employeeMiddleInit` VARCHAR(4) NOT NULL,
  `employeeTitle` VARCHAR(15) NULL,
  PRIMARY KEY (`employeeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customers` (
  `customerID` INT NOT NULL AUTO_INCREMENT,
  `customerFirstName` VARCHAR(20) NOT NULL,
  `CustomerLastName` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`customerID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`saleTransaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`saleTransaction` (
  `salesTransactionID` INT NOT NULL AUTO_INCREMENT,
  `salesDate` DATE NULL,
  `saleAmount` DECIMAL(5,2) NULL,
  `employeeID` INT NOT NULL,
  `customers_customerID` INT NOT NULL,
  PRIMARY KEY (`salesTransactionID`),
  INDEX `fk_saleTransaction_employee1_idx` (`employeeID` ASC) VISIBLE,
  INDEX `fk_saleTransaction_customers1_idx` (`customers_customerID` ASC) VISIBLE,
  CONSTRAINT `fk_saleTransaction_employee1`
    FOREIGN KEY (`employeeID`)
    REFERENCES `mydb`.`employees` (`employeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_saleTransaction_customers1`
    FOREIGN KEY (`customers_customerID`)
    REFERENCES `mydb`.`customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`addresses` (
  `addressID` INT NOT NULL AUTO_INCREMENT,
  `addressNumber` VARCHAR(25) NOT NULL,
  `street` VARCHAR(30) NOT NULL,
  `city` VARCHAR(30) NOT NULL,
  `state` VARCHAR(30) NOT NULL,
  `country` VARCHAR(30) NOT NULL,
  `county` VARCHAR(30) NULL,
  `zipcode` VARCHAR(10) NOT NULL,
  `contactID` INT NOT NULL,
  PRIMARY KEY (`addressID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`phone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`phone` (
  `phoneID` INT NOT NULL AUTO_INCREMENT,
  `areaCode` VARCHAR(45) NOT NULL,
  `phoneNumber` VARCHAR(45) NOT NULL,
  `countryCode` VARCHAR(45) NOT NULL DEFAULT '1',
  `contactID` INT NOT NULL,
  PRIMARY KEY (`phoneID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`vendors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`vendors` (
  `vendorID` INT NOT NULL AUTO_INCREMENT,
  `vendorName` VARCHAR(30) NULL,
  PRIMARY KEY (`vendorID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`transactionItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`transactionItem` (
  `itemID` INT NOT NULL AUTO_INCREMENT,
  `quanity` INT NOT NULL,
  `unitPrice` DECIMAL(5,2) NOT NULL,
  `discount` FLOAT NULL,
  `saleTransactionID` INT NOT NULL,
  `egg_eggID` INT NOT NULL,
  PRIMARY KEY (`itemID`),
  INDEX `fk_transactionItem_saleTransaction1_idx` (`saleTransactionID` ASC) VISIBLE,
  INDEX `fk_transactionItem_egg1_idx` (`egg_eggID` ASC) VISIBLE,
  CONSTRAINT `fk_transactionItem_saleTransaction1`
    FOREIGN KEY (`saleTransactionID`)
    REFERENCES `mydb`.`saleTransaction` (`salesTransactionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transactionItem_egg1`
    FOREIGN KEY (`egg_eggID`)
    REFERENCES `mydb`.`eggs` (`eggID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contact` (
  `contactID` INT NOT NULL AUTO_INCREMENT,
  `customers_customerID` INT NULL,
  `employees_employeeID` INT NULL,
  `vendors_vendorID` INT NULL,
  `phone_phoneID` INT NULL,
  `addresses_addressID` INT NULL,
  PRIMARY KEY (`contactID`),
  INDEX `fk_contact_customers1_idx` (`customers_customerID` ASC) VISIBLE,
  INDEX `fk_contact_employees1_idx` (`employees_employeeID` ASC) VISIBLE,
  INDEX `fk_contact_vendors1_idx` (`vendors_vendorID` ASC) VISIBLE,
  INDEX `fk_contact_phone1_idx` (`phone_phoneID` ASC) VISIBLE,
  INDEX `fk_contact_addresses1_idx` (`addresses_addressID` ASC) VISIBLE,
  CONSTRAINT `fk_contact_customers1`
    FOREIGN KEY (`customers_customerID`)
    REFERENCES `mydb`.`customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_employees1`
    FOREIGN KEY (`employees_employeeID`)
    REFERENCES `mydb`.`employees` (`employeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_vendors1`
    FOREIGN KEY (`vendors_vendorID`)
    REFERENCES `mydb`.`vendors` (`vendorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_phone1`
    FOREIGN KEY (`phone_phoneID`)
    REFERENCES `mydb`.`phone` (`phoneID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_addresses1`
    FOREIGN KEY (`addresses_addressID`)
    REFERENCES `mydb`.`addresses` (`addressID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`purchaseTransaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`purchaseTransaction` (
  `purchaseTransactionID` INT NOT NULL AUTO_INCREMENT,
  `purchaseDate` DATE NULL,
  `vendorID` INT NOT NULL,
  PRIMARY KEY (`purchaseTransactionID`),
  INDEX `fk_purchaseTransaction_vendors_idx` (`vendorID` ASC) VISIBLE,
  CONSTRAINT `fk_purchaseTransaction_vendors`
    FOREIGN KEY (`vendorID`)
    REFERENCES `mydb`.`vendors` (`vendorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`feedInvintory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`feedInvintory` (
  `feedID` INT NOT NULL AUTO_INCREMENT,
  `feedType` ENUM('boys', 'girls', 'wormies', 'parts') NOT NULL,
  `manufacture` VARCHAR(20) NULL,
  `quanity` INT NOT NULL,
  PRIMARY KEY (`feedID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`purchaseTranactionItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`purchaseTranactionItem` (
  `purchaseTranactionItemID` INT NOT NULL AUTO_INCREMENT,
  `quanity` INT NOT NULL,
  `purchaseTransactionID` INT NOT NULL,
  `productCost` DECIMAL(5,2) NOT NULL,
  `feedID` INT NOT NULL,
  PRIMARY KEY (`purchaseTranactionItemID`),
  INDEX `fk_purchaseTranactionItem_purchaseTransaction1_idx` (`purchaseTransactionID` ASC) VISIBLE,
  INDEX `fk_purchaseTranactionItem_feedInvintory1_idx` (`feedID` ASC) VISIBLE,
  CONSTRAINT `fk_purchaseTranactionItem_purchaseTransaction1`
    FOREIGN KEY (`purchaseTransactionID`)
    REFERENCES `mydb`.`purchaseTransaction` (`purchaseTransactionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_purchaseTranactionItem_feedInvintory1`
    FOREIGN KEY (`feedID`)
    REFERENCES `mydb`.`feedInvintory` (`feedID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
