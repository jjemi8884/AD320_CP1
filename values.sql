
USE mydb;


-- insert contact ID
-- this is for the contact table that links to the employees and such
-- auto, first name, last name, companyName
INSERT INTO contact VALUES
(NULL,'Jenney', 'Ko', NULL),
(NULL, 'Lee', 'lovesGooseEggs', NULL),
(NULL, NULL, NULL, NULL); -- the null person 

INSERT INTO phone VALUES
(NULL, '206', '217-9999', '001'),
(NULL, '206', '214-7643', '001'),

-- *******************MAIN INVINTORY*********************
-- The main invintory for the Farm
INSERT INTO farmInvintory VALUES
-- autoID, item description, Quanity, Cost Per Item

(NULL, 'Duck Egg', 60, .42),
(NULL, 'Goose Egg', 20, .83),
(NULL, 'Chicken Egg', 40, .25),

-- ********* SALE TRANSACTIONS***************

INSERT INTO saletransaction VALUES
-- auto, date, employeeID, customerID
(NULL, 20230415, 2),
(NULL, 20230422, 2),
(NULL, 20230429, 2),
(NULL, 20230506, 3),
(NULL, 20230513, 2);
INSERT INTO saletransactionitem VALUES
-- auto, qty, disc, saleTransID, farmInvintoryID
(NULL, 48, 0, 1,1),
(NULL, 72, 0, 2, 2),
(NULL, 36, 0, 3, 3),
(NULL, 24, 0, 4, 2),
(NULL, 100, 0, 5, 2),
(NULL, 48,  0, 5, 1);

INSERT INTO eggCollectItem VALUES
-- auto, collID, qty, farmIv ID
(NULL, 1, 7, 2),
(NULL, 1, 2, 1),
(NULL, 1, 5, 1),
(NULL, 2, 5, 2),
(NULL, 2, 4, 2),
(NULL, 3, 7, 3),
(NULL, 3, 1, 1),
(NULL, 3, 3, 2),
(NULL, 4, 4, 1),
(NULL, 4, 0, 1),
(NULL, 4, 3, 1),
(NULL, 5, 6, 1),
(NULL, 5, 0, 1),
(NULL, 5, 2, 1),
(NULL, 6, 7, 2),
(NULL, 6, 2, 3),
(NULL, 6, 5, 2),
(NULL, 7, 7, 1),
(NULL, 7, 2, 1),
(NULL, 7, 5, 2),
(NULL, 8, 5, 1),
(NULL, 8, 4, 2),
(NULL, 8, 7, 1),
(NULL, 9, 1, 2),
(NULL, 9, 3, 1),
(NULL, 10, 4, 1),
(NULL, 10, 0, 2),
(NULL, 11, 3, 2),
(NULL, 12, 6, 2),
(NULL, 12, 0, 2),
(NULL, 13, 2, 2),
(NULL, 13, 7, 2),
(NULL, 14, 2, 1),
(NULL, 14, 5, 2),
(NULL, 15, 7, 1),
(NULL, 15, 2, 1),
(NULL, 15, 5, 1),
(NULL, 16, 5, 2),
(NULL, 16, 4, 2),
(NULL, 16, 7, 2),
(NULL, 17, 1, 2),
(NULL, 17, 3, 2),
(NULL, 18, 4, 2),
(NULL, 18, 0, 3),
(NULL, 19, 3, 3),
(NULL, 20, 6, 3),
(NULL, 20, 0, 3),
(NULL, 21, 2, 3),
(NULL, 21, 7, 3),
(NULL, 21, 2, 3),
(NULL, 22, 5, 3),
(NULL, 22, 7, 1),
(NULL, 23, 2, 1),
(NULL, 23, 5, 1),
(NULL, 23, 5, 1),
(NULL, 24, 4, 1),
(NULL, 24, 7, 1),
(NULL, 25, 1, 1),
(NULL, 25, 3, 1),
(NULL, 26, 4, 1),
(NULL, 26, 0, 1),
(NULL, 26, 3, 1),
(NULL, 27, 6, 1),
(NULL, 27, 0, 1),
(NULL, 28, 2, 1),
(NULL, 28, 7, 1),
(NULL, 28, 2, 1),
(NULL, 29, 5, 1),
(NULL, 29, 1, 1),
(NULL, 29, 7, 1),
(NULL, 30, 10, 2),
(NULL, 30, 1, 1),
(NULL, 30, 7, 3);

-- *************** Bird Types **********************

INSERT INTO birdtypes VALUES
(NULL, 'Rouen', 'Brown', 180, 1),
(NULL, 'sebastopol', 'White', 50, 2),
(NULL, 'Road Island Red', 'Red', 300, 3),
(NULL, 'Chinese', 'Grey', 40,2), -- 4
(NULL, 'Embden', 'white', 30,2),
(NULL, 'White Chinese', 'white', 100,2),
(NULL, 'Canadian','grey', 9, 2), -- 7
(NULL, 'Pekin', 'white', 200, 1),
(NULL, 'Runner', 'various', 180, 1),
(NULL, 'Khaki Campbell', 'brown', 340, 1), -- 10
(NULL, 'Swedish Blue', 'various', 180, 1),
(NULL, 'Muscovy', 'grey', 190, 1), -- 12
(NULL, 'African Grey', 'grey', 40, 3);
INSERT INTO ducks VALUES
(NULL, 'Batman', '20160705', 1, 'f'),
(NULL, 'fleet', '20160705', 1, 'f'),
(NULL, 'Charlie', '20190701', 1, 'f'),
(NULL, 'Bugger', '20190701', 1, 'f'),
(NULL, 'Wiggles', '20170401', 9, 'f'),
(NULL, 'Lilly', '20200108', 9, 'f'),
(NULL, 'Handycap', '20170401', 9, 'f'),
(NULL, 'Little Lills', '20220604', 9, 'f'),
(NULL, 'Mort', '20190405', 9, 'm'),
(NULL, 'Brother', '20220507', 9, 'm'),
(NULL, 'Sister', '20220508', 9, 'f'),
(NULL, 'Paul', '20180506', 9, 'f'),
(NULL, 'Little One','20180506', 10, 'f');
INSERT INTO gooses VALUES
(NULL, 'Pansy', '20210605', 2, 'm'),
(NULL, 'Loosie', '20200601', 4, 'm'),
(NULL, 'chunkie', '20210605', 5, 'f'),
(NULL, 'Ming', '20220702', 6, 'f'),
(NULL, 'Ying', '20220702', 6, 'f'),
(NULL, 'aaaa', '20220702', 6, 'f'),
(NULL, 'Candooers', '20220204', 7, 'm'),
(NULL, 'Watson', '20230514', 13, 'f');
INSERT INTO chickens VALUES
(NULL, 'Jello', 20220606, 3, 'f'),
(NULL, 'Cracker', 20220606, 3, 'f'),
(NULL, 'Red', 20220606, 3, 'f');
