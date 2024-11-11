
USE mydb;


INSERT INTO Customers VALUES 
(NULL, NULL, 0, 'c@g.com', 12345, NULL,0),
(NULL, NULL, 0 ,'admin@admin', 'adminPasswrod', NULL,1),
(NULL, NULL, 100, 'eric@loyd', 'ericsPassword', NULL,0),
(NULL, NULL, 0, 'test@test', 'testPassword', NULL,0),
(NULL, NULL, -20, 'jenney@loveEggs', 'eggYummYummYumm', NULl,0),
(NULL, NULL, 100, 'pepper@screamBIRD', 'shutUp',NULL,0),
(NULL, NULL, 0, 'new@guy', "1211Saaa", NULL,0),
(NULL, NULL, 0, 'AnotherNewGuy@newGuy', 'Passcode1', NULL,0),
(NULL, NULL, -12, "oldGuy@old", "passcode2", NULL,0),
(NULL, NULL, 5, "Steve@wounder", "Password1", NULL,0);



INSERT INTO eggs VALUES
-- auto, qty, farmIv, date
(NULL, 100, 1, NULL),
(NULL, 100, 2, NULL),
(NULL, 100, 3, NULL,
(NULL, 29, 1, NULL),
(NULL, 20, 4, NULL), --For egg test 
(NULL, 11, 1, NULL),
(NULL, 31, 1, NULL),
(NULL, 31, 3, NULL),
(NULL, 41, 2, NULL),
(NULL, 41, 2, NULL),
(NULL, 41, 1, NULL),

-- *************** Bird Types **********************

INSERT INTO birdtypes VALUES
(NULL, 'Rouen', 'Brown', 180),
(NULL, 'sebastopol', 'White', 50),
(NULL, 'Road Island Red', 'Red', 300),
(NULL, 'Chinese', 'Grey', 40), -- 4
(NULL, 'Embden', 'white', 30),
(NULL, 'White Chinese', 'white', 100),
(NULL, 'Canadian','grey', 9), -- 7
(NULL, 'Pekin', 'white', 200),
(NULL, 'Runner', 'various', 180),
(NULL, 'Khaki Campbell', 'brown', 340), -- 10
(NULL, 'Swedish Blue', 'various', 180),
(NULL, 'Muscovy', 'grey', 190), -- 12
(NULL, 'African Grey', 'grey', 40)

INSERT INTO animal VALUES
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
(NULL, 'Little One','20180506', 10, 'f'),
(NULL, 'Pansy', '20210605', 2, 'm'),
(NULL, 'Loosie', '20200601', 4, 'm'),
(NULL, 'chunkie', '20210605', 5, 'f'),
(NULL, 'Ming', '20220702', 6, 'f'),
(NULL, 'Ying', '20220702', 6, 'f'),
(NULL, 'aaaa', '20220702', 6, 'f'),
(NULL, 'Candooers', '20220204', 7, 'm'),
(NULL, 'Watson', '20230514', 13, 'f'),
(NULL, 'Jello', '20220606', 3, 'f'),
(NULL, 'Cracker', '20220606', 3, 'f'),
(NULL, 'Red', '20220606', 3, 'f');
