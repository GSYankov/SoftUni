--04. Insert Records in Both Tables
INSERT INTO Towns (Id, [Name]) VALUES
(1, 'Sofia'),
(3, 'Varna'),
(2, 'Plovdiv')

INSERT INTO Minions (Id, [Name], Age, TownId) VALUES
(1, 'Kevin', 22, 1),
(2, 'Bob', 15, 3),
(3, 'Steward', NULL, 2)

--07. Create Table People
CREATE TABLE People (
Id INT PRIMARY KEY IDENTITY,
[Name] NVARCHAR(200) NOT NULL,
Picture VARBINARY(2048),
Height NUMERIC(3, 2),
[Weight] NUMERIC(5, 2),
Gender NVARCHAR(1), CHECK (Gender = 'm' OR Gender = 'f'),
Birthdate DATETIME NOT NULL,
Biography NVARCHAR(MAX)
)

INSERT INTO People ([Name], Height, [Weight], Gender, Birthdate) VALUES
('Lino', 1.82, 22.88, 'f', '2005-04-12'),
('Sino', 1.39, 91.68, 'f', '2005-04-12'),
('Fino', 1.52, 31.68, 'm', '2005-04-12'),
('Gino', 1.92, 56.68, 'f', '2005-04-12'),
('Rino', 2.32, 15.68, 'm', '2005-04-12')

--08. Create Table Users
CREATE TABLE Users (
Id BIGINT PRIMARY KEY IDENTITY,
Username CHAR(30) NOT NULL,
[Password] CHAR(26) NOT NULL,
ProfilePicture BINARY (900),
LastLoginTime DATETIME,
IsDeleted BIT
)

INSERT INTO Users (Username, [Password], LastLoginTime, IsDeleted) VALUES
('Sis', 'Pis', '2018-04-04 23:28:57', 0),
('Kis', 'lis', '2018-09-15 23:28:57', 0),
('Tis', 'Fis', '2018-05-23 23:28:57', 0),
('Ris', 'Gis', '2018-06-14 23:28:57', 0),
('Wis', 'Mis', '2018-03-08 23:28:57', 0)

--13. Movies Database
CREATE TABLE Directors (
	Id INT PRIMARY KEY,
	DirectorName NVARCHAR(30) NOT NULL,
	Notes NVARCHAR(500)
)

CREATE TABLE Genres (
	Id INT PRIMARY KEY,
	GenreName NVARCHAR(30) NOT NULL,
	Notes NVARCHAR(500)
)

CREATE TABLE Categories (
	Id INT PRIMARY KEY,
	CategoryName NVARCHAR(30) NOT NULL,
	Notes NVARCHAR(500)
)

CREATE TABLE Movies (
	Id INT PRIMARY KEY,
	Title NVARCHAR(30) NOT NULL,
	DirectorId INT FOREIGN KEY REFERENCES Directors(Id),
	CopyrightYear DATE,
	[Length] TIME,
	GenreId INT FOREIGN KEY REFERENCES Genres(Id),
	CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
	Rating NUMERIC(3, 2),
	Notes NVARCHAR(500)
)

INSERT INTO Directors VALUES
(1, 'Director1', NULL),
(2, 'Direc1', NULL),
(3, 'Directo', NULL),
(4, 'Dire', 'Notes...'),
(5, 'Dire1', NULL)

INSERT INTO Genres VALUES
(1, 'Gen', NULL),
(2, 'Gen2', NULL),
(3, 'Gre', NULL),
(4, 'Ge1', 'Genre Notes...'),
(5, 'Gre5', NULL)

INSERT INTO Categories VALUES
(1, 'Cat', NULL),
(2, 'Catego', NULL),
(3, 'Car', NULL),
(4, 'Cator', 'Genre Notes...'),
(5, 'Catgor', NULL)

INSERT INTO Movies VALUES
(1, 'Title1', 1, '1994-01-01', '01:30:53', 2, 1, 5.34, 'Some notes....'),
(2, 'Title1', 3, '1994-01-01', '01:30:53', 3, 1, 2.34, 'Some notes....'),
(3, 'Title1', 2, '1994-01-01', '01:30:53', 4, 1, 5.84, 'Some notes....'),
(4, 'Title1', 5, '1994-01-01', '01:30:53', 4, 3, 5.69, 'Some notes....'),
(5, 'Title1', 5, '1994-01-01', '01:30:53', 1, 4, 3.10, 'Some notes....')

--4. Car Rental Database
CREATE TABLE Categories (
Id INT PRIMARY KEY,
CategoryName NVARCHAR(30) NOT NULL,
DailyRate DECIMAL(15, 2) NOT NULL,
WeeklyRate DECIMAL(15, 2) NOT NULL,
MonthlyRate DECIMAL(15, 2) NOT NULL,
WeekendRate DECIMAL(15, 2) NOT NULL
)

INSERT INTO Categories VALUES
(1, 'summer', 30, 200, 700, 90),
(2, 'autumn', 35, 250, 800, 100),
(3, 'spring', 40, 300, 900, 110)


CREATE TABLE Cars (
Id INT PRIMARY KEY,
PlateNumber INT NOT NULL,
Manufacturer NVARCHAR(30) NOT NULL,
Model NVARCHAR(30) NOT NULL,
CarYear DATE NOT NULL,
CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
Doors INT NOT NULL,
Picture VARBINARY(MAX),
Condition NVARCHAR(MAX),
Available BIT NOT NULL
)

INSERT INTO Cars(
Id, PlateNumber, Manufacturer, Model, CarYear, CategoryId, Doors, Condition, Available)
VALUES
(1, 45,          'Volvo',      'D90', '2012-01-01',    1,          4,     'Good',    1),
(2, 15,          'Molvo',      'E90', '2012-01-01',    2,          5,     'Great',    0),
(3, 33,          'Solvo',      'C90', '2012-01-01',    1,          2,     'Bad',    1)

CREATE TABLE Employees (
Id INT PRIMARY KEY,
FirstName NVARCHAR(30) NOT NULL,
LastName  NVARCHAR(30) NOT NULL,
Title	  NVARCHAR(3) NOT NULL,
Notes	  NVARCHAR(MAX)
)

INSERT INTO Employees VALUES
(1, 'Milko', 'Ivanov', 'Mr.', 'Notsss'),
(2, 'Silko', 'Livanov', 'Mrs', 'Nootsss'),
(3, 'Filko', 'Gavanov', 'Mss', 'Noooosss')

CREATE TABLE Customers (
Id INT PRIMARY KEY, 
DriverLicenceNumber NVARCHAR(20) NOT NULL, 
FullName NVARCHAR(50) NOT NULL, 
[Address]NVARCHAR(50) NOT NULL, 
City NVARCHAR(50) NOT NULL, 
ZIPCode INT NOT NULL, 
Notes NVARCHAR(MAX)
)

INSERT INTO Customers VALUES
(1, 'MMGH-9987-A567', 'Drago', 'Madres', 'Cino', 9875, 'Mooots'),
(2, 'MMG-9987-A567', 'Hrago', 'Madres', 'Cino', 9875, 'Mooots'),
(3, 'MMGH-9987-A567', 'Wrago', 'Madres', 'Cino', 9875, 'Mooots')

CREATE TABLE RentalOrders (
Id INT PRIMARY KEY,
EmployeeId INT FOREIGN KEY REFERENCES Employees(Id),
CustomerId INT FOREIGN KEY REFERENCES Customers(Id), 
CarId INT FOREIGN KEY REFERENCES Cars(Id), 
TankLevel NUMERIC(5, 2) NOT NULL, 
KilometrageStart NUMERIC(9, 2) NOT NULL, 
KilometrageEnd NUMERIC(9, 2) NOT NULL, 
TotalKilometrage AS KilometrageStart + KilometrageEnd, 
StartDate DATE NOT NULL DEFAULT GETDATE(), 
EndDate DATE NOT NULL DEFAULT GETDATE() + 1,
TotalDays AS DATEDIFF(day, StartDate, EndDate),
RateApplied INT FOREIGN KEY REFERENCES Categories(Id), 
TaxRate DECIMAL(15, 2) NOT NULL, 
OrderStatus BIT NOT NULL, 
Notes NVARCHAR(MAX)
)

INSERT INTO RentalOrders (
Id, EmployeeId, CustomerId, CarId, TankLevel, KilometrageStart, KilometrageEnd, RateApplied, TaxRate, OrderStatus, Notes)
VALUES
(1, 2,          1,          1,    44,        55,               100,            1,           84,       1,          'Ntooos'),
(2, 2,          1,          3,    44,        55,               100,            1,           84,       1,          'Ntooos'),
(3, 2,          1,          2,    44,        55,               100,            1,           84,       1,          'Ntooos')  

--15. Hotel Database
CREATE TABLE Employees (
Id INT IDENTITY, 
FirstName NVARCHAR(30) NOT NULL,
LastName NVARCHAR(30) NOT NULL,
Title NVARCHAR(3) NOT NULL, 
Notes NVARCHAR(MAX)
CONSTRAINT PK_EmployeesId PRIMARY KEY (Id)
) 

INSERT INTO Employees VALUES
('Donco', 'Ploncho', 'Mr.', 'Noootsssoososoos'),
('Sonco', 'Tloncho', 'Mrs', 'Noootsssososoos'),
('Gonco', 'Floncho', 'Mss', NULL)


CREATE TABLE Customers (
AccountNumber INT, 
FirstName NVARCHAR(30) NOT NULL, 
LastName NVARCHAR(30) NOT NULL, 
PhoneNumber NVARCHAR(30), 
EmergencyName NVARCHAR(30) NOT NULL, 
EmergencyNumber NVARCHAR(30) NOT NULL, 
Notes NVARCHAR(MAX),
CONSTRAINT PK_AccountNumber PRIMARY KEY (AccountNumber)
) 

INSERT INTO Customers VALUES
(456887, 'Didko', 'Donchev', '+43-221-489-376', 'Elena', '+358-998-176-443', 'Mooots'),
(456587, 'Didko', 'Donchev', '+43-221-489-376', 'Elena', '+358-998-176-443', 'Mooots'),
(456987, 'Didko', 'Donchev', '+43-221-489-376', 'Elena', '+358-998-176-443', 'Mooots')

CREATE TABLE RoomStatus (
RoomStatus INT, 
Notes NVARCHAR(MAX)
CONSTRAINT PK_RoomStatus PRIMARY KEY (RoomStatus)
)

INSERT INTO RoomStatus VALUES
(1, 'Loood'),
(2, 'Goood'),
(3, 'Mooooood')

CREATE TABLE RoomTypes (
RoomType NVARCHAR(10) CHECK (RoomType = 'Single' OR RoomType = 'Double' OR RoomType = 'Apartment') , 
Notes NVARCHAR(MAX)
CONSTRAINT PK_RoomType PRIMARY KEY (RoomType)
)

INSERT INTO RoomTypes VALUES
('Single', 'Goood'),
('Double', 'Shoood'),
('Apartment', 'Suuoood')

CREATE TABLE BedTypes (
BedType NVARCHAR(10) CHECK (BedType = 'Single' OR BedType = 'Double' OR BedType = 'Water') , 
Notes NVARCHAR(MAX)
CONSTRAINT PK_BedType PRIMARY KEY (BedType)
)

INSERT INTO BedTypes VALUES
('Single', 'Goood'),
('Double', 'Shoood'),
('Water', 'Suuoood')

CREATE TABLE Rooms (
RoomNumber INT, 
RoomType NVARCHAR(10), 
BedType NVARCHAR(10), 
Rate DECIMAL(15, 2), 
RoomStatus INT, 
Notes NVARCHAR(MAX),
CONSTRAINT PK_RoomNUmber PRIMARY KEY (RoomNumber),
CONSTRAINT FK_RoomType FOREIGN KEY (RoomType) REFERENCES RoomTypes(RoomType),
CONSTRAINT FK_BedType FOREIGN KEY (BedType) REFERENCES BedTypes(BedType),
CONSTRAINT FK_RoomStatus FOREIGN KEY (RoomStatus) REFERENCES RoomStatus(RoomStatus)
)

INSERT INTO Rooms VALUES
(1, 'Single' , 'Water', 75.80, 1, 'Mootes'),
(2, 'Apartment' , 'Double', 95.80, 1, 'Mootes'),
(11, 'Double' , 'Single', 135.80, 1, 'Mootes')


CREATE TABLE Payments (
Id INT IDENTITY, 
EmployeeId INT, 
PaymentDate DATETIME DEFAULT GETDATE(), 
AccountNumber CHAR(16), 
FirstDateOccupied DATE DEFAULT GETDATE(), 
LastDateOccupied DATE DEFAULT GETDATE() + 5, 
TotalDays AS DATEDIFF(day, LastDateOccupied, FirstDateOccupied),
AmountCharged DECIMAL(15, 2), 
TaxRate  NUMERIC(5, 2), 
TaxAmount DECIMAL(15, 2),
PaymentTotal AS DATEDIFF(day, LastDateOccupied, FirstDateOccupied) * TaxRate/100 * TaxAmount - AmountCharged, 
Notes NVARCHAR(MAX)
CONSTRAINT PK_Id PRIMARY KEY (Id) 
)

INSERT INTO Payments 
(EmployeeId, AccountNumber, AmountCharged, TaxRate, TaxAmount, Notes) VALUES
(4576, 'BGN12SF376', 155,           7,       45,      'Moots'),
(4576, 'BGN12SF376', 195,           20,      65,       'Moots'),
(4687, 'BGN12SF376', 755,           7,       55,      'Moots')

CREATE TABLE Occupancies (
Id INT IDENTITY, 
EmployeeId INT NOT NULL, 
DateOccupied DATE DEFAULT GETDATE() + RAND(1), 
AccountNumber CHAR(16), 
RoomNumber INT NOT NULL, 
RateApplied INT NOT NULL, 
PhoneCharge DECIMAL(15, 2) DEFAULT 0, 
Notes NVARCHAR(MAX),
CONSTRAINT PK_OccupanciesId PRIMARY KEY (Id),
CONSTRAINT FK_RoomNumber FOREIGN KEY (RoomNumber) REFERENCES Rooms(RoomNumber)
)

INSERT INTO Occupancies
(EmployeeId, RoomNumber, RateApplied, PhoneCharge, Notes) VALUES
(4564,       11,         43.67,       9.56,          'Moots'),
(4864,       2,          38.67,       72.76,          'Moots'),
(4594,       1,          93.67,       33,          'Moots')

--19. Basic Select All Fields
SELECT * FROM Towns
SELECT * FROM Departments
SELECT * FROM Employees

--20. Basic Select All Fields and Order Them
SELECT * FROM Towns
ORDER BY [Name]

SELECT * FROM Departments
ORDER BY [Name]

SELECT * FROM Employees
ORDER BY Salary DESC

--21. Basic Select Some Fields
SELECT [Name] FROM Towns
ORDER BY [Name]

SELECT [Name] FROM Departments
ORDER BY [Name]

SELECT FirstName, LastName, JobTitle, Salary FROM Employees
ORDER BY Salary DESC

--22. Increase Employees Salary
UPDATE Employees
SET Salary *= 1.1

SELECT Salary FROM Employees

--23. Decrease Tax Rate
UPDATE Payments
SET TaxRate *= 0.97

SELECT TaxRate FROM Payments 

--24. Delete All Records
TRUNCATE TABLE Occupancies