--01. Employee Address
SELECT TOP(5) e.EmployeeID, e.JobTitle, e.AddressID, a.AddressText  FROM Employees AS e
INNER JOIN Addresses AS a ON e.AddressID = a.AddressID
ORDER BY e.AddressID

--02. Addresses with Towns
SELECT TOP(50) e.FirstName, e.LastName,t.[Name] , a.AddressText FROM Employees as e
INNER JOIN Addresses AS a ON e.AddressID = a.AddressID
INNER JOIN Towns AS t ON a.TownID = t.TownID
ORDER BY e.FirstName, e.LastName

--03. Sales Employees
SELECT e.EmployeeID, e.FirstName, e.LastName, d.[Name] FROM Employees AS e
INNER JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
WHERE d.[Name] = 'Sales'
ORDER BY e.EmployeeID

--04. Employee Departments
SELECT TOP(5) e.EmployeeID, e.FirstName, e.Salary, d.[Name] AS [DepartmentName] 
         FROM Employees AS e INNER JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
        WHERE e.Salary > 15000
     ORDER BY e.DepartmentID

--05. Employees Without Projects
SELECT TOP(3) e.EmployeeID, e.FirstName FROM Employees As e
LEFT OUTER JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
WHERE ep.ProjectID IS NULL
ORDER BY e.EmployeeID

--06. Employees Hired After
SELECT e.FirstName, e.LastName, e.HireDate, d.[Name] FROM Employees AS e
INNER JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
WHERE e.HireDate > '1999/01/01' AND d.[Name] IN ('Sales', 'Finance')
ORDER BY e.HireDate

--07. Employees With Project
SELECT TOP(5) e.EmployeeID, e.FirstName, prj.[Name] AS [ProjectName] FROM Employees AS e
LEFT OUTER JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
INNER JOIN Projects AS prj ON ep.ProjectID = prj.ProjectID
WHERE prj.StartDate > '2002/08/13' AND prj.EndDate IS NULL
ORDER BY e.EmployeeID

--08. Employee 24
SELECT e.EmployeeID, e.FirstName,
CASE
	WHEN prj.StartDate >= '2005/01/01' THEN NULL
	ELSE prj.[Name]
END AS [ProjectName] FROM Employees AS e
INNER JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
INNER JOIN Projects AS prj ON ep.ProjectID = prj.ProjectID
WHERE e.EmployeeID = 24

--09. Employee Manager
SELECT e.EmployeeID, e.FirstName, e.ManagerID, m.FirstName AS [ManagerName]
 FROM Employees AS e
INNER JOIN Employees AS m ON e.ManagerID = m.EmployeeID
WHERE e.ManagerID IN (3, 7)
ORDER BY e.EmployeeID

--10. Employees Summary
SELECT TOP(50) e.EmployeeID, e.FirstName + ' ' + e.LastName AS [EmployeeName],
               m.FirstName + ' ' + m.LastName AS [ManagerName],
               d.[Name] AS [DepartmentName]
 FROM Employees AS e
LEFT OUTER JOIN Employees AS m ON e.ManagerID = m.EmployeeID
INNER JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
ORDER BY e.EmployeeID

--11. Min Average Salary'
SELECT MIN(AvgSalary) AS [MinAverageSalary] FROM (
SELECT AVG(Salary) AS AvgSalary FROM Employees
GROUP BY DepartmentID) AS AvaSalaries

--12. Highest Peaks in Bulgaria
SELECT mc.CountryCode, m.MountainRange, p.PeakName, p.Elevation
  FROM MountainsCountries AS mc
INNER JOIN Mountains AS m ON mc.MountainId = m.Id
INNER JOIN Peaks AS p ON p.MountainId = mc.MountainId
WHERE mc.CountryCode = 'BG' AND p.Elevation > 2835
ORDER BY p.Elevation DESC

--13. Count Mountain Ranges
SELECT mc.CountryCode, COUNT(m.MountainRange) FROM Mountains AS m
INNER JOIN MountainsCountries AS mc ON m.Id = mc.MountainId
WHERE mc.CountryCode IN ('BG', 'RU', 'US')
GROUP BY mc.CountryCode

--14. Countries With or Without Rivers
SELECT TOP (5) c.CountryName, r.RiverName FROM Countries AS c
LEFT OUTER JOIN CountriesRivers AS cr ON c.CountryCode = cr.CountryCode
LEFT OUTER JOIN Rivers AS r ON cr.RiverId = r.Id
INNER JOIN Continents AS conts ON c.ContinentCode = conts.ContinentCode
WHERE conts.ContinentName = 'Africa'
ORDER BY c.CountryName

--15. *Continents and Currencies
  SELECT CurencyRanked.ContinentCode, CurencyRanked.CurrencyCode, CurencyRanked.CurrencyUsage FROM(
  SELECT ContinentCode, CurrencyCode, 
		 COUNT(CurrencyCode) AS CurrencyUsage,
		 DENSE_RANK() OVER(PARTITION BY ContinentCode ORDER BY COUNT(CurrencyCode) DESC) AS [Rank]
    FROM Countries
GROUP BY ContinentCode, CurrencyCode
  HAVING COUNT(CurrencyCode) > 1) AS CurencyRanked
   WHERE CurencyRanked.[Rank] = 1
ORDER BY ContinentCode

--16. Countries Without any Mountains
SELECT COUNT(cnmcount.CountryCode) AS [CountryCode] FROM  
(SELECT COUNT(mc.CountryCode) AS [CountryCode] FROM Countries AS c
LEFT OUTER JOIN MountainsCountries AS mc ON c.CountryCode = mc.CountryCode
WHERE mc.CountryCode IS NULL
GROUP BY c.CountryCode) cnmcount

--17. Highest Peak and Longest River by Country
SELECT TOP(5) c.CountryName, 
       MAX(p.Elevation) AS HighestPeakElevation,
	   MAX(r.[Length])  AS LongestRiverLength 
  FROM Countries AS c
LEFT OUTER JOIN MountainsCountries AS mc ON c.CountryCode = mc.CountryCode
LEFT OUTER JOIN Peaks AS p ON mc.MountainId = p.MountainId
LEFT OUTER JOIN CountriesRivers AS cr ON c.CountryCode = cr.CountryCode
LEFT OUTER JOIN Rivers AS r ON cr.RiverId = r.Id
GROUP BY CountryName
ORDER BY HighestPeakElevation DESC, LongestRiverLength DESC, c.CountryName

--18. *Highest Peak Name and Elevation by Country
SELECT TOP(5) cpem.CountryName AS Country,
       cpem.PeakName AS [Highest Peak Name],
	   cpem.Elevation AS [Highest Peak Elevation],
	   cpem.MountainRange AS [Mountain]
	    FROM(
SELECT c.CountryName, 
       CASE
		WHEN p.PeakName IS NOT NULL THEN p.PeakName
		WHEN p.PeakName IS NULL THEN '(no highest peak)'
	   END 
	   AS PeakName,
	   CASE 
		WHEN p.Elevation IS NOT NULL THEN p.Elevation
		WHEN p.Elevation IS NULL THEN 0
	   END 
	   AS Elevation, 
	   CASE
		WHEN m.MountainRange IS NOT NULL THEN m.MountainRange
		WHEN m.MountainRange IS NULL THEN '(no mountain)'
	   END 
	   AS MountainRange,
       DENSE_RANK() OVER (PARTITION BY c.CountryName ORDER BY MAX(p.Elevation) DESC) AS [ElevationRank]
	   FROM Countries AS c
LEFT OUTER JOIN MountainsCountries AS mc ON c.CountryCode = mc.CountryCode
LEFT OUTER JOIN Peaks AS p ON mc.MountainId = p.MountainId
LEFT OUTER JOIN Mountains AS m ON mc.MountainId = m.Id
GROUP BY c.CountryName, p.PeakName, p.Elevation, m.MountainRange) AS cpem
WHERE cpem.ElevationRank = 1
ORDER BY Country, [Highest Peak Name]
