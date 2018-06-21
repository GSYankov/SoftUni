--01.DDL
--CREATE DATABASE Rent_a_Car
--GO

--USE Rent_a_CAR
--GO

CREATE TABLE Clients(
Id INT IDENTITY,
FirstName NVARCHAR(30) NOT NULL,
LastName NVARCHAR(30) NOT NULL,
Gender CHAR(1) CHECK(Gender = 'M' OR Gender = 'F'),
BirthDate DATETIME ,
CreditCard NVARCHAR(30) NOT NULL,
CardValidity DATETIME,
Email NVARCHAR(50) NOT NULL
CONSTRAINT PK_Clients_Id PRIMARY KEY (Id),
)

CREATE TABLE Towns(
Id INT IDENTITY,
[Name] NVARCHAR(50) NOT NULL
CONSTRAINT PK_Towns_Id PRIMARY KEY (Id)
)

CREATE TABLE Offices(
Id INT IDENTITY,
[Name] NVARCHAR(40),
ParkingPlaces INT,
TownId INT,
CONSTRAINT PK_Offices PRIMARY KEY (Id),
CONSTRAINT FK_Offices_Towns FOREIGN KEY (TownId) REFERENCES Towns(Id)
)

CREATE TABLE Models(
Id INT IDENTITY,
Manufacturer NVARCHAR(50) NOT NULL,
Model NVARCHAR(50) NOT NULL,
ProductionYear DATETIME,
Seats INT,
Class NVARCHAR(10),
Consumption DECIMAL(14, 2)
CONSTRAINT PK_Models_Id PRIMARY KEY (Id)
)

CREATE TABLE Vehicles(
Id INT IDENTITY,
ModelId INT,
OfficeId INT,
Mileage INT,
CONSTRAINT PK_Vehicles PRIMARY KEY (Id),
CONSTRAINT FK_Vehicles_Models FOREIGN KEY (ModelId) REFERENCES Models(Id),
CONSTRAINT FK_Vehicles_Offices FOREIGN KEY (OfficeId) REFERENCES Offices(Id)
)

CREATE TABLE Orders(
Id INT IDENTITY,
ClientId INT,
TownId INT,
VehicleId INT,
CollectionDate DATETIME NOT NULL,
CollectionOfficeId INT,
ReturnDate DATETIME,
ReturnOfficeId INT,
Bill DECIMAL(14, 2),
TotalMileage INT,
CONSTRAINT PK_Orders PRIMARY KEY (Id),
CONSTRAINT FK_Orders_Clients FOREIGN KEY (ClientId) REFERENCES Clients(Id),
CONSTRAINT FK_Orders_Towns FOREIGN KEY (TownId) REFERENCES Towns(Id),
CONSTRAINT FK_Orders_Vehicles FOREIGN KEY (VehicleId) REFERENCES Vehicles(Id),
CONSTRAINT FK_Orders_CollectOffice FOREIGN KEY (CollectionOfficeId) REFERENCES Offices(Id),
CONSTRAINT FK_Orders_ReturnOffice FOREIGN KEY (ReturnOfficeId) REFERENCES Offices(Id)
)

--02.Insert
INSERT INTO Models VALUES
('Chevrolet',	'Astro',	'2005-07-27 00:00:00.000',	4,	'Economy',	12.60),
('Toyota',	'Solara',	'2009-10-15 00:00:00.000',	7,	'Family',	13.80),
('Volvo',	'S40',	'2010-10-12 00:00:00.000',	3,	'Average',	11.30),
('Suzuki',	'Swift',	'2000-02-03 00:00:00.000',	7,	'Economy',	16.20)


INSERT INTO Orders VALUES
(17,	2,	52,	'2017-08-08', 	30,	'2017-09-04', 	42,	2360.00, 7434),
(78,	17,	50,	'2017-04-22', 	10,	'2017-05-09', 	12,	2326.00, 7326),
(27,	13,	28,	'2017-04-25', 	21,	'2017-05-09', 	34,	597.00, 1880)


--03.Update 
UPDATE Models
SET Class = 'Luxury'
WHERE Consumption > 20

--04.Delete 
DELETE ORDERS
WHERE ReturnDate IS NULL

--05. Showroom 
SELECT Manufacturer, Model FROM Models
ORDER BY Manufacturer, Model DESC

--06. Y Generation 
SELECT FirstName, LastName FROM Clients
WHERE YEAR(BirthDate) >= 1977 AND YEAR(BirthDate) <= 1994
ORDER BY FirstName, LastName, Id

GO

--17.Find My Ride
CREATE FUNCTION udf_CheckForVehicle(@townName NVARCHAR(50), @seatsNumber INT)
RETURNS NVARCHAR(103)
AS
BEGIN
DECLARE @ModelName NVARCHAR(50), @OfficeName NVARCHAR(50), @Result NVARCHAR(103)
SET @OfficeName = (SELECT TOP(1) o.[Name] AS OfficeName FROM Vehicles AS v
				   INNER JOIN Offices AS o ON v.OfficeId = o.Id
				   INNER JOIN Towns AS t ON o.TownId = t.Id
				   INNER JOIN Models AS m ON v.ModelId = m.Id
				   WHERE t.[Name] = @townName AND m.Seats = @seatsNumber
				   ORDER BY o.[Name])
SET @ModelName = (SELECT TOP(1) m.Model AS ModelName FROM Vehicles AS v
				   INNER JOIN Offices AS o ON v.OfficeId = o.Id
				   INNER JOIN Towns AS t ON o.TownId = t.Id
				   INNER JOIN Models AS m ON v.ModelId = m.Id
				   WHERE t.[Name] = @townName AND m.Seats = @seatsNumber
				   ORDER BY o.[Name])

SET @Result = 
CASE
	WHEN @OfficeName IS NULL THEN 'NO SUCH VEHICLE FOUND'
	ELSE @OfficeName + ' - ' + @ModelName
END
RETURN @Result
END

GO

--18. Move a Vehicle 
CREATE PROC usp_MoveVehicle(@vehicleId INT, @officeId INT) AS
BEGIN TRANSACTION
	UPDATE Vehicles
	SET OfficeId = @officeId
	WHERE Id = @vehicleId

	DECLARE @usedSlots INT, @officeSlots INT

	SET @officeSlots = (
	SELECT ParkingPlaces FROM Offices
	WHERE Id = @officeId
	)

	SET @usedSlots = (
	SELECT COUNT(Id) FROM Vehicles
	GROUP BY OfficeId
	HAVING OfficeId = @officeId
	)

	IF (@usedSlots > @officeSlots)
	BEGIN
	RAISERROR('Not enough room in this office!', 16, 1)
	ROLLBACK
	RETURN
	END

COMMIT

GO

--19. Move the Tally 
CREATE TRIGGER udt_MillageAdd ON Orders AFTER UPDATE AS
BEGIN
	DECLARE @oldOrderMillage INT, @newOrderMillage INT, @vehicleId INT
	SET @oldOrderMillage = (SELECT TotalMileage FROM deleted)
	SET @newOrderMillage = (SELECT TotalMileage FROM inserted)
	SET @vehicleId = (SELECT VehicleId FROM inserted)

	IF(@oldOrderMillage) IS NULL
	BEGIN
	UPDATE Vehicles
	SET Mileage = Mileage + @newOrderMillage
	WHERE Id = @vehicleId
	END
END
