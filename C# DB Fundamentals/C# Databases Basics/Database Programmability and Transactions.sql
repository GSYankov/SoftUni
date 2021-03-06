--01. Employees with Salary Above 35000
CREATE PROC usp_GetEmployeesSalaryAbove35000 AS
BEGIN
SELECT FirstName, LastName FROM Employees
WHERE Salary > 35000
END

GO


--02. Employees with Salary Above Number
CREATE PROC usp_GetEmployeesSalaryAboveNumber (@SalaryParam DECIMAL(18, 4)) AS
BEGIN
SELECT FirstName, LastName FROM Employees
WHERE Salary >= @SalaryParam
END

GO

--03. Town Names Starting With
CREATE PROC usp_GetTownsStartingWith (@FirstStringOfTown VARCHAR(50)) AS
BEGIN
SELECT [Name] AS Town FROM Towns
WHERE [Name] LIKE @FirstStringOfTown + '%'
END

GO

--04. Employees from Town
CREATE PROC usp_GetEmployeesFromTown (@Town VARCHAR(50)) AS
BEGIN
SELECT e.FirstName, e.LastName FROM Employees AS e
INNER JOIN Addresses AS a ON e.AddressID = a.AddressID
INNER JOIN Towns AS t ON a.TownID = t.TownID
WHERE t.[Name] = @Town
END

GO

--05. Salary Level Function
CREATE FUNCTION ufn_GetSalaryLevel(@salary DECIMAL(18, 4)) 
RETURNS VARCHAR(10) 
AS
BEGIN
DECLARE @SalaryLevel VARCHAR(10)
SET @SalaryLevel =
	CASE
		WHEN @salary < 30000 THEN 'Low'
		WHEN @salary BETWEEN 30000 AND 50000 THEN 'Average'
		ELSE 'High'
	END
RETURN @SalaryLevel
END

GO

--06. Employees by Salary Level
CREATE PROC usp_EmployeesBySalaryLevel (@SalaryLevel VARCHAR(10)) AS
SELECT FirstName, LastName
  FROM Employees
 WHERE dbo.ufn_GetSalaryLevel(Salary) = @SalaryLevel

 GO

 --07. Define Function
 CREATE FUNCTION ufn_IsWordComprised(@setOfLetters VARCHAR(30), @word VARCHAR(30))
 RETURNS BIT
 AS
 BEGIN
  DECLARE @i INT = 1
  DECLARE @CurrChar VARCHAR
  WHILE (@i <= LEN(@word))
  BEGIN
	SET @CurrChar = SUBSTRING(@word, @i, 1)
	IF CHARINDEX(@CurrChar, @setOfLetters) = 0
		BEGIN
		RETURN 0
		END
	SET @i += 1
  END
  RETURN 1
 END

 GO

 --08. Delete Employees and Departments * Dani Berova's solution with minimal corrections
 CREATE PROC usp_DeleteEmployeesFromDepartment (@departmentId INT)
          AS
 ALTER TABLE Departments
ALTER COLUMN ManagerID INT NULL

DELETE FROM EmployeesProjects
 WHERE EmployeeID IN 
	   (
	   	SELECT EmployeeID FROM Employees
	   	 WHERE DepartmentID = @departmentId
	   )

UPDATE Employees
   SET ManagerID = NULL
 WHERE ManagerID IN 
	   (
		SELECT EmployeeID FROM Employees
		 WHERE DepartmentID = @departmentId
	   )


UPDATE Departments
   SET ManagerID = NULL
 WHERE ManagerID IN 
	   (
		SELECT EmployeeID FROM Employees
		 WHERE DepartmentID = @departmentId
	   )

DELETE FROM Employees
 WHERE EmployeeID IN 
	   (
	   	SELECT EmployeeID FROM Employees
	   	WHERE DepartmentID = @departmentId
	   )

DELETE FROM Departments
 WHERE DepartmentID = @departmentId
SELECT COUNT(*)   AS [Employees Count] 
 FROM Employees   AS e
 JOIN Departments AS d
   ON d.DepartmentID = e.DepartmentID
WHERE e.DepartmentID = @departmentId
GO

 --09. Find Full Name
 CREATE PROC usp_GetHoldersFullName AS
 BEGIN
	SELECT FirstName + ' ' + LastName AS [Full Name] FROM AccountHolders
 END

 GO

 --10. People with Balance Higher Than
 CREATE PROC usp_GetHoldersWithBalanceHigherThan (@Balance MONEY) AS
 BEGIN
	SELECT h.FirstName AS [First Name],
    	h.LastName AS [Last Name]
   FROM AccountHolders AS h
		   INNER JOIN Accounts AS a ON h.Id = a.AccountHolderId
 GROUP BY FirstName, LastName
 HAVING SUM(a.Balance) > @Balance
 END

 GO

 --11. Future Value Function
 CREATE FUNCTION ufn_CalculateFutureValue (@I DECIMAL(15, 4), @R FLOAT, @T INT)
 RETURNS DECIMAL(15, 4) AS
 BEGIN
	DECLARE @FV DECIMAL (15, 4)
	SET @FV = @I * POWER(1 + @R, @T)
	RETURN @FV
 END

 GO

 --12. Calculating Interest
CREATE PROC usp_CalculateFutureValueForAccount (@AccID INT, @R FLOAT)  AS
BEGIN
SELECT a.AccountHolderId AS [Account Id],
       h.FirstName AS [First Name],
	   h.LastName AS [Last Name],
	   a.Balance AS [Current Balance],
	   dbo.ufn_CalculateFutureValue(a.Balance, @R, 5) AS [Balance in 5 years]
 FROM Accounts AS a
INNER JOIN AccountHolders AS h ON a.AccountHolderId = h.Id
WHERE a.Id = @AccID
END

GO

--13. *Cash in User Games Odd Rows
CREATE FUNCTION ufn_CashInUsersGames (@game VARCHAR(MAX))
RETURNS TABLE 
AS
RETURN
SELECT SUM(Cash) AS SumCash FROM 
 (
		       SELECT ug.Cash, 
			          ROW_NUMBER() OVER(ORDER BY Cash DESC) AS RowNumber 
		         FROM UsersGames AS ug
		   INNER JOIN Games AS g
		           ON g.Id = ug.GameId
		        WHERE g.Name = @game
  ) AS CashList
 WHERE RowNumber % 2 = 1

GO

--14. Create Table Logs
CREATE TRIGGER tr_AccountLog ON Accounts AFTER UPDATE AS
BEGIN
	INSERT INTO Logs (AccountId, OldSum, NewSum)
		SELECT i.Id, d.Balance, i.Balance FROM inserted AS i
		INNER JOIN deleted AS d ON i.Id = d.Id		
END

GO

--15. Create Table Emails
CREATE TRIGGER tr_Logs ON Logs AFTER INSERT AS
BEGIN
	INSERT INTO NotificationEmails (Recipient, [Subject], Body)
	SELECT i.AccountId,
		   'Balance change for account: ' + CAST(i.AccountId AS VARCHAR(10)),
		   'On ' + CAST(GETDATE() AS VARCHAR(50)) + ' your balance was changed from ' + CAST(i.OldSum AS VARCHAR(16)) + ' to ' + CAST(i.NewSum AS VARCHAR(16))
      FROM inserted AS i
END

GO

--16. Deposit Money
CREATE PROCEDURE usp_DepositMoney (@AccountId INT, @MoneyAmount DECIMAL(15, 4))
AS
	IF(@MoneyAmount > 0)
	BEGIN
	UPDATE Accounts
	SET Balance += @MoneyAmount
	WHERE Id = @AccountId
END

GO

--17. Withdraw Money
CREATE PROCEDURE usp_WithdrawMoney (@AccountId INT, @MoneyAmount DECIMAL(15, 4))
AS
	IF(@MoneyAmount > 0)
	BEGIN
	UPDATE Accounts
	SET Balance -= @MoneyAmount
	WHERE Id = @AccountId
END

GO

--18. Money Transfer
CREATE PROC usp_TransferMoney(@SenderId INT, @ReceiverId INT, @Amount DECIMAL(15, 4))
AS
BEGIN TRANSACTION
	EXEC usp_WithdrawMoney @SenderId, @Amount
	
	DECLARE @NewSenderBalance DECIMAL(15, 4) = (
		SELECT Balance FROM Accounts WHERE Id = @SenderId)

	IF (@NewSenderBalance < 0)
	BEGIN
	ROLLBACK
	RETURN
	END

	EXEC usp_DepositMoney @ReceiverId, @Amount
COMMIT

--20. *Massive Shopping *Dani Berova's solution with errors stage correction
DECLARE @gameName nvarchar(50) = 'Safflower'
DECLARE @username nvarchar(50) = 'Stamat'

DECLARE @userGameId int = (
                           SELECT ug.Id 
                           FROM UsersGames AS ug
                           JOIN Users AS u ON ug.UserId = u.Id
                           JOIN Games AS g ON ug.GameId = g.Id
                           WHERE u.Username = @username AND g.Name = @gameName)

DECLARE @userGameLevel int = (SELECT Level FROM UsersGames WHERE Id = @userGameId)
DECLARE @itemsCost money, @availableCash money, @minLevel int, @maxLevel int

SET @minLevel = 11
SET @maxLevel = 12
SET @availableCash = (SELECT Cash FROM UsersGames WHERE Id = @userGameId)
SET @itemsCost = (SELECT SUM(Price) FROM Items WHERE MinLevel BETWEEN @minLevel AND @maxLevel)

IF (@availableCash >= @itemsCost AND @userGameLevel >= @maxLevel) 

BEGIN 
  BEGIN TRANSACTION  
  UPDATE UsersGames SET Cash -= @itemsCost WHERE Id = @userGameId 
  IF(@@ROWCOUNT <> 1) 
  BEGIN
    ROLLBACK
    RAISERROR('Could not make payment', 16, 1)
  END
  ELSE
  BEGIN
    INSERT INTO UserGameItems (ItemId, UserGameId) 
    (SELECT Id, @userGameId FROM Items WHERE MinLevel BETWEEN @minLevel AND @maxLevel) 

    IF((SELECT COUNT(*) FROM Items WHERE MinLevel BETWEEN @minLevel AND @maxLevel) <> @@ROWCOUNT)
    BEGIN
      ROLLBACK; 
      RAISERROR('Could not buy items', 16, 1)
    END	
    ELSE COMMIT;
  END
END

SET @minLevel = 19
SET @maxLevel = 21
SET @availableCash = (SELECT Cash FROM UsersGames WHERE Id = @userGameId)
SET @itemsCost = (SELECT SUM(Price) FROM Items WHERE MinLevel BETWEEN @minLevel AND @maxLevel)

IF (@availableCash >= @itemsCost AND @userGameLevel >= @maxLevel) 

BEGIN 
  BEGIN TRANSACTION  
  UPDATE UsersGames SET Cash -= @itemsCost WHERE Id = @userGameId 

  IF(@@ROWCOUNT <> 1) 
  BEGIN
    ROLLBACK
    RAISERROR('Could not make payment', 16, 2)
  END
  ELSE
  BEGIN
    INSERT INTO UserGameItems (ItemId, UserGameId) 
    (SELECT Id, @userGameId FROM Items WHERE MinLevel BETWEEN @minLevel AND @maxLevel) 

    IF((SELECT COUNT(*) FROM Items WHERE MinLevel BETWEEN @minLevel AND @maxLevel) <> @@ROWCOUNT)
    BEGIN
      ROLLBACK
      RAISERROR('Could not buy items', 16, 2)
    END	
    ELSE COMMIT;
  END
END

SELECT i.Name AS [Item Name]
  FROM UserGameItems AS ugi
  JOIN Items AS i ON i.Id = ugi.ItemId
  JOIN UsersGames AS ug ON ug.Id = ugi.UserGameId
  JOIN Games AS g ON g.Id = ug.GameId
 WHERE g.Name = @gameName
 ORDER BY [Item Name]

--21. Employees with Three Projects
CREATE PROC usp_AssignProject(@emloyeeId INT, @projectID INT) AS
BEGIN TRANSACTION
DECLARE @empPrjCount SMALLINT
 
	INSERT INTO EmployeesProjects VALUES
	(@emloyeeId, @projectID)

	SET @empPrjCount = (SELECT COUNT(ProjectID) AS PrjCount FROM EmployeesProjects
	GROUP BY (EmployeeID)
	HAVING EmployeeID = @emloyeeId)

	IF (@empPrjCount > 3)
	BEGIN
		RAISERROR(N'The employee has too many projects!', 16, 1)
		ROLLBACK
		RETURN
	END

COMMIT

GO

--22. Delete Employees
CREATE TABLE Deleted_Employees(
EmployeeId INT, 
FirstName VARCHAR(50), 
LastName VARCHAR(50), 
MiddleName VARCHAR(50), 
JobTitle VARCHAR(50), 
DepartmentId INT, 
Salary DECIMAL(15, 4)
CONSTRAINT PK_EmployeeId PRIMARY KEY (EmployeeId))
GO
-- Submit only the trigger creation statement

CREATE TRIGGER tr_OnDeleteEmployees ON Employees AFTER DELETE AS
BEGIN
	INSERT INTO Deleted_Employees
	SELECT FirstName, LastName, MiddleName, JobTitle, DepartmentID, Salary 
	FROM deleted
END










