--01. Find Names of All Employees by First Name
SELECT FirstName, LastName FROM Employees
WHERE SUBSTRING(FirstName, 1, 2) = 'SA'

--02. Find Names of All Employees by Last Name
SELECT FirstName, LastName FROM Employees
WHERE LastName LIKE '%ei%'

--03. Find First Names of All Employess
SELECT FirstName FROM Employees
WHERE DepartmentID IN (3, 10) AND YEAR(HireDate) BETWEEN 1995 AND 2005

--04. Find All Employees Except Engineers
SELECT FirstName, LastName FROM Employees
WHERE JobTitle NOT LIKE '%engineer%'

--05. Find Towns with Name Length
SELECT [NAME] FROM Towns
WHERE LEN([Name]) IN (5, 6)
ORDER BY [Name]

--06. Find Towns Starting With
SELECT * FROM Towns
WHERE [Name] LIKE '[M, K, B ,E]%'
ORDER BY [Name]

--07. Find Towns Not Starting With
SELECT * FROM Towns
WHERE [Name] LIKE '[^ R, B, D]%'
ORDER BY [Name]

--08. Create View Employees Hired After
CREATE VIEW V_EmployeesHiredAfter2000 AS
SELECT FirstName, LastName FROM Employees
WHERE YEAR(HireDate) > 2000

--09. Length of Last Name
SELECT FirstName, LastName FROM Employees
WHERE LEN(LastName) = 5

--10. Countries Holding 'A'
SELECT CountryName, IsoCode FROM Countries
WHERE CountryName LIKE '%A%A%A%'
ORDER BY IsoCode

--11. Mix of Peak and River Names
SELECT p.PeakName, r.RiverName, 
LOWER(p.PeakName) + LOWER(SUBSTRING(r.RiverName, 2, LEN(r.RiverName)-1)) AS Mix
FROM Peaks AS p
JOIN Rivers AS r ON RIGHT(p.PeakName, 1) = LEFT(r.RiverName ,1)
ORDER BY Mix

--12. Games From 2011 and 2012 Year
SELECT TOP(50) [Name], FORMAT([Start],'yyyy-MM-dd') AS [Start] FROM Games
WHERE YEAR([Start]) IN (2011, 2012)
ORDER BY [Start]

--13. User Email Providers
SELECT Username,
       SUBSTRING(Email, CHARINDEX('@', Email, 1) + 1, LEN(Email)-CHARINDEX('@', Email, 1) + 1)
       AS [Email Provider] FROM Users
	   ORDER BY [Email Provider], Username

--14. Get Users with IPAddress Like Pattern
SELECT Username, IpAddress FROM Users
WHERE IpAddress LIKE '___.1%.%.___'
ORDER BY Username

--15. Show All Games with Duration
SELECT [Name] AS Game, 
CASE
	WHEN DATEPART(HOUR,[Start]) >= 0 AND DATEPART(HOUR,[Start]) < 12 THEN 'Morning'
	WHEN DATEPART(HOUR,[Start]) >= 12 AND DATEPART(HOUR,[Start]) < 18 THEN 'Afternoon'
	WHEN DATEPART(HOUR,[Start]) >= 18 AND DATEPART(HOUR,[Start]) < 24 THEN 'Evening'
	ELSE 'Nothing'
END AS [Part of the Day],
CASE
	WHEN Duration <= 3 THEN 'Extra Short'
	WHEN Duration >= 4 AND Duration <= 6 THEN 'Short'
	WHEN Duration > 6 THEN 'Long'
	ELSE 'Extra Long'
END AS [Duration]
FROM Games
ORDER BY Game, Duration, [Part of the Day]

--16. Orders Table
SELECT ProductName, OrderDate,
DATEADD(DAY, 3, OrderDate) AS [Pay Due],
DATEADD(MONTH, 1, OrderDate) AS [Deliver Due]
FROM Orders
