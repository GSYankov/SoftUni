--01. One-To-One Relationship
CREATE TABLE Passports (
PassportID INT,
PassportNumber NVARCHAR(20) NOT NULL,
CONSTRAINT PK_PassportID PRIMARY KEY (PassportID)
)

CREATE TABLE Persons (
Id INT,
FirstName NVARCHAR(30) NOT NULL,
Salary DECIMAL(15, 2) NOT NULL,
PassportID INT NOT NULL,
CONSTRAINT PK_PearsonsID PRIMARY KEY (Id),
CONSTRAINT FK_PassportID FOREIGN KEY (PassportID) REFERENCES Passports(PassportID)
)

INSERT INTO Passports VALUES
(101,	'N34FG21B'),
(102,	'K65LO4R7'),
(103,	'ZE657QP2')

INSERT INTO Persons VALUES
(1, 'Roberto', 	43300.00, 102),
(2,	'Tom',  	56100.00, 103),
(3,	'Yana',	    60200.00, 101)

--02. One-To-Many Relationship
CREATE TABLE Manufacturers (
ManufacturerID INT,
[Name] NVARCHAR(20) NOT NULL, 
EstablishedOn DATE,
CONSTRAINT PK_ManufacturerID PRIMARY KEY (ManufacturerID)
)

CREATE TABLE Models (
ModelID	INT,
[Name] NVARCHAR(20) NOT NULL,
ManufacturerID INT,
CONSTRAINT PK_ModelID PRIMARY KEY (ModelID),
CONSTRAINT FK_ManufacturerID FOREIGN KEY (ManufacturerID) REFERENCES Manufacturers(ManufacturerID)
)

INSERT INTO Manufacturers VALUES
(1, 'BMW',	'07/03/1916'),
(2,	'Tesla','01/01/2003'),
(3,	'Lada',	'01/05/1966')

INSERT INTO Models VALUES
(101,	'X1'		,1),
(102,	'i6'		,1),
(103,	'Model S'	,2),
(104,	'Model X'	,2),
(105,	'Model 3'	,2),
(106,	'Nova'		,3)

--03. Many-To-Many Relationship
CREATE TABLE Students (
StudentID INT,
[Name] NVARCHAR(30) NOT NULL,
CONSTRAINT PK_StudentID PRIMARY KEY (StudentID)
)

CREATE TABLE Exams (
ExamID INT,	
[Name] NVARCHAR(50) NOT NULL,
CONSTRAINT PK_ExamID PRIMARY KEY (ExamID)
)

CREATE TABLE StudentsExams (
StudentID INT,	
ExamID INT,
CONSTRAINT PK_StudentIDExamID PRIMARY KEY (StudentID, ExamID),
CONSTRAINT FK_StudentID FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
CONSTRAINT FK_ExamID FOREIGN KEY (ExamID) REFERENCES Exams(ExamID)
)

INSERT INTO Students VALUES 
(1, 'Mila'),                                      
(2,	'Toni'),
(3,	'Ron')

INSERT INTO Exams VALUES
(101,	'SpringMVC'),
(102,	'Neo4j'),
(103,	'Oracle 11g')

INSERT INTO StudentsExams VALUES
(1,	'101'),
(1,	'102'),
(2,	'101'),
(3,	'103'),
(2,	'102'),
(2,	'103')

--04. Self-Referencing
CREATE TABLE Teachers (
TeacherID INT,
[Name] NVARCHAR(50),	
ManagerID INT,
CONSTRAINT PK_TeacherID PRIMARY KEY (TeacherID),
CONSTRAINT FK_ManagerID FOREIGN KEY (ManagerID) REFERENCES Teachers(TeacherID)
)

INSERT INTO Teachers VALUES 
(101,	'John'	,NULL),
(102,	'Maya'	,106 ),
(103,	'Silvia',106 ),
(104,	'Ted'	,105 ),
(105,	'Mark'	,101 ),
(106,	'Greta'	,101 )

 --05. Online Store Database
CREATE TABLE Cities (
CityID INT IDENTITY,
[Name] VARCHAR(50),
CONSTRAINT PK_CitiesCityID PRIMARY KEY (CityID)
)

CREATE TABLE Customers (
CustomerID INT,
[Name] VARCHAR(50),
Birthday DATE,
CityID INT,
CONSTRAINT PK_CustomersCustomerID PRIMARY KEY (CustomerID),
CONSTRAINT FK_CustomersCityID FOREIGN KEY (CityID) REFERENCES Cities(CityID)
)

CREATE TABLE Orders (
OrderID INT,
CustomerID INT,
CONSTRAINT PK_OrdersOrderID PRIMARY KEY (OrderID),
CONSTRAINT PK_OrdersCustomerID FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
)
 
 CREATE TABLE ItemTypes (
 ItemTypeID INT,
 [Name] VARCHAR(50) NOT NULL,
 CONSTRAINT PK_ItemTypesItemTypeID PRIMARY KEY (ItemTypeID)
 )

 CREATE TABLE Items (
 ItemID INT,
 [Name] VARCHAR(50) NOT NULL,
 ItemTypeID INT,
 CONSTRAINT PK_ItemsItemID PRIMARY KEY (ItemID),
 CONSTRAINT FK_ItemsItemTypeID FOREIGN KEY (ItemTypeID) REFERENCES ItemTypes(ItemTypeID)
 )

 CREATE TABLE OrderItems (
 OrderID INT,
 ItemID INT,
 CONSTRAINT PK_OrderItemsOrderIDItemID PRIMARY KEY (OrderID, ItemID),
 CONSTRAINT FK_OrderItemsOrderID FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
 CONSTRAINT FK_OrderItemsItemID FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
 )

 --06. University Database
 CREATE TABLE Subjects (
 SubjectID INT,
 SubjectName VARCHAR(50) NOT NULL,
 CONSTRAINT PK_Subjects_SubjectID PRIMARY KEY (SubjectID)
 )

 CREATE TABLE Majors (
 MajorID INT,
 [Name] VARCHAR(50) NOT NULL,
 CONSTRAINT PK_Majors_MajorID PRIMARY KEY (MajorID)
 )

 CREATE TABLE Students (
 StudentID INT,
 StudentNumber INT UNIQUE,
 StudentName NVARCHAR(50) NOT NULL,
 MajorID INT,
 CONSTRAINT PK_Students_StudentID PRIMARY KEY (StudentID),
 CONSTRAINT FK_Students_MajorID FOREIGN KEY (MajorID) REFERENCES Majors(MajorID)
 )

 CREATE TABLE Agenda (
 StudentID INT,
 SubjectID INT,
 CONSTRAINT PK_SudentID_SubjectID PRIMARY KEY (StudentID, SubjectID),
 CONSTRAINT FK_Agenda_StudentID FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
 CONSTRAINT FK_Agenda_SubjectID FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
 )

 CREATE TABLE Payments (
 PaymentID INT,
 PaymentDate DATE NOT NULL,
 PaymentAmount DECIMAL(15, 2) NOT NULL,
 StudentID INT,
 CONSTRAINT PK_Payments_PaymentID PRIMARY KEY (PaymentID),
 CONSTRAINT FK_Payments_StudentID FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
 )

--09. *Peaks in Rila

SELECT * FROM Mountains
SELECT * FROM Peaks

SELECT m.MountainRange, p.PeakName, p.Elevation FROM Mountains AS m
JOIN Peaks AS p ON p.MountainId = m.Id
WHERE m.MountainRange = 'Rila'
ORDER BY p.Elevation DESC
