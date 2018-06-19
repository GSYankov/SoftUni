--1. Number of Users for Email Provider
SELECT SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(EMAIL) - CHARINDEX('@', Email))
    AS [Email Provider], COUNT(*) AS [Number Of Users]
  FROM Users
GROUP BY SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(EMAIL) - CHARINDEX('@', Email))
ORDER BY [Number Of Users] DESC, [Email Provider]

--02. All Users in Games
SELECT g.[Name] AS Game,
	   gt.[Name] AS [Game Type],
       u.Username,
	   ug.[Level],
	   ug.Cash,
	   ch.[Name] AS [Character] FROM UsersGames AS ug
INNER JOIN Games AS g ON ug.GameId = g.Id
RIGHT OUTER JOIN Users AS u ON ug.UserId = u.Id
INNER JOIN GameTypes AS gt ON g.GameTypeId = gt.Id
INNER JOIN Characters AS ch ON ug.CharacterId = ch.Id
ORDER BY ug.[Level] DESC, u.Username, g.[Name]

--03. Users in Games with Their Items
SELECT u.Username,
       g.[Name]  AS [Game],
	   COUNT(i.[Name]) AS [Items Count],
	   SUM(i.Price) AS [Items Price]
 FROM Users AS u
 INNER JOIN UsersGames AS ug ON u.Id = ug.UserId
 INNER JOIN Games AS g ON ug.GameId = g.Id
 INNER JOIN UserGameItems AS ugi ON ug.Id = ugi.UserGameId
 INNER JOIN Items AS i ON ugi.ItemId = i.Id
 GROUP BY u.Username, g.[Name]
 HAVING COUNT(i.[Name]) >= 10
 ORDER BY [Items Count] DESC, [Items Price] DESC, u.Username

 --04. * User in Games with Their Statistics *Dani Berova's solution
 SELECT u.Username,  
       g.Name AS Game, 
	   MAX(c.Name) AS Character, 
       MAX(cs.Strength) + MAX(gts.Strength) + SUM(gis.Strength) AS Strength, 
       MAX(cs.Defence) + MAX(gts.Defence) + SUM(gis.Defence) AS Defence, 
       MAX(cs.Speed) + MAX(gts.Speed) + SUM(gis.Speed) AS Speed, 
       MAX(cs.Mind) + MAX(gts.Mind) + SUM(gis.Mind) AS Mind, 
       MAX(cs.Luck) + MAX(gts.Luck) + SUM(gis.Luck) AS Luck
  FROM UsersGames AS ug
  JOIN Users AS u ON ug.UserId = u.Id
  JOIN Games AS g ON ug.GameId = g.Id
  JOIN Characters AS c ON ug.CharacterId = c.Id
  JOIN [Statistics] AS cs ON c.StatisticId = cs.Id
  JOIN GameTypes AS gt ON gt.Id = g.GameTypeId
  JOIN [Statistics] AS gts ON gts.Id = gt.BonusStatsId
  JOIN UserGameItems AS ugi ON ugi.UserGameId = ug.Id
  JOIN Items AS i ON i.Id = ugi.ItemId
  JOIN [Statistics] AS gis ON gis.Id = i.StatisticId
 GROUP BY u.Username, g.Name
 ORDER BY Strength DESC, 
          Defence DESC, 
		  Speed DESC, 
		  Mind DESC, 
		  Luck DESC

 --05. All Items with Greater than Average Statistics
    SELECT i.[Name], i.Price, i.MinLevel, st.Strength, st.Defence, st.Speed, st.Luck, st.Mind 
      FROM Items AS i
INNER JOIN [Statistics] AS st ON i.StatisticId = st.Id
     WHERE st.Mind  > (SELECT AVG(Mind * 1.0)  AS AvgMind FROM [Statistics])
       AND st.Luck  > (SELECT AVG(Luck * 1.0)  AS AvgLuck FROM [Statistics])
       AND st.Speed > (SELECT AVG(Speed * 1.0) FROM [Statistics])
    ORDER BY i.[Name]

--06. Display All Items about Forbidden Game Type 
SELECT i.[Name], i.Price, i.MinLevel, gt.[Name] AS [Forbidden Game Type] FROM Items AS i
LEFT OUTER JOIN GameTypeForbiddenItems AS gtb ON i.Id = gtb.ItemId
LEFT OUTER JOIN GameTypes AS gt ON gtb.GameTypeId = gt.Id
ORDER BY [Forbidden Game Type] DESC, i.[Name]

--07. Buy Items for User in Game 
-- Blackguard, Bottomless Potion of Amplification, Eye of Etlich (Diablo III), Gem of Efficacious Toxin, Golden Gorget of Leoric and Hellfire Amulet
INSERT INTO UserGameItems
     SELECT Id, (SELECT ug.Id FROM Users AS u
				 INNER JOIN UsersGames AS ug ON u.Id = ug.UserId
				 INNER JOIN Games AS g ON ug.GameId = g.Id
				 WHERE Username = 'Alex' AND g.[Name] = 'Edinburgh') AS GameId 
       FROM Items
      WHERE [Name] IN ('Blackguard', 
      				 'Bottomless Potion of Amplification', 
      				 'Eye of Etlich (Diablo III)',
      				 'Gem of Efficacious Toxin', 
      				 'Golden Gorget of Leoric',
      				 'Hellfire Amulet')

UPDATE UsersGames
SET Cash = Cash - (SELECT SUM(Price) AS BuyingSum FROM Items
				   WHERE [Name] IN ('Blackguard', 
				         			 'Bottomless Potion of Amplification', 
				         			 'Eye of Etlich (Diablo III)',
				         			 'Gem of Efficacious Toxin', 
				         			 'Golden Gorget of Leoric',
				         			 'Hellfire Amulet'))
WHERE Id = (SELECT Id FROM UsersGames
            WHERE UserId = (SELECT Id FROM Users 
            				WHERE Username = 'Alex')
              AND GameId = (SELECT Id FROM Games WHERE [Name] = 'Edinburgh'))

SELECT u.Username, g.[Name], ug.Cash, i.[Name] FROM Users AS u
INNER JOIN UsersGames AS ug ON u.Id = ug.UserId
INNER JOIN Games AS g ON ug.GameId = g.Id
INNER JOIN UserGameItems AS ugi ON ug.Id = ugi.UserGameId
INNER JOIN Items AS i ON ugi.ItemId = i.Id
WHERE g.[Name] = 'Edinburgh'
ORDER BY i.[Name]

--08. Peaks and Mountains 
USE [Geography]

SELECT p.PeakName, m.MountainRange AS Mountain, p.Elevation FROM Peaks AS p
INNER JOIN Mountains AS m ON p.MountainId = m.Id
ORDER BY p.Elevation DESC

--09. Peaks with Mountain, Country and Continent 
SELECT p.PeakName, m.MountainRange AS Mountain, c.CountryName, cont.ContinentName FROM Peaks AS p
INNER JOIN Mountains AS m ON p.MountainId = m.Id
INNER JOIN MountainsCountries AS mc ON m.Id = mc.MountainId
INNER JOIN Countries AS c ON mc.CountryCode = c.CountryCode
INNER JOIN Continents AS cont ON c.ContinentCode = cont.ContinentCode
ORDER BY p.PeakName, c.CountryName

--10. Rivers by Country 
SELECT CountryName, ContinentName, RiversCount, 
	   CASE WHEN(TotalLength IS NULL) THEN 0 ELSE TotalLength END AS TotalLength FROM (
SELECT c.CountryName, cont.ContinentName, COUNT(r.Id) AS RiversCount, SUM(r.[Length]) AS TotalLength
  FROM Countries AS c
INNER JOIN Continents AS cont ON c.ContinentCode = cont.ContinentCode
LEFT OUTER JOIN CountriesRivers AS cr ON c.CountryCode = cr.CountryCode
LEFT OUTER JOIN Rivers AS r ON cr.RiverId = r.Id
GROUP BY c.CountryName, cont.ContinentName) AS tab
ORDER BY RiversCount DESC, TotalLength DESC, CountryName

--11. Count of Countries by Currency 
SELECT cr.CurrencyCode, cr.[Description] AS Currency, COUNT(c.CountryCode) AS NumberOfCountries 
  FROM Currencies AS cr
LEFT OUTER JOIN Countries AS c ON cr.CurrencyCode = c.CurrencyCode
GROUP BY cr.CurrencyCode, cr.[Description]
ORDER BY NumberOfCountries DESC, cr.[Description]

--12. Population and Area by Continent 
SELECT cont.ContinentName, 
	   SUM(c.AreaInSqKm) AS CountriesArea, 
	   SUM(CAST(c.[Population] AS float)) AS CountriesPopulation 
FROM Continents AS cont
INNER JOIN Countries AS c ON cont.ContinentCode = c.ContinentCode
GROUP BY cont.ContinentName
ORDER BY CountriesPopulation DESC

--13. Monasteries by Country 
CREATE TABLE Monasteries(
Id INT IDENTITY, 
[Name] VARCHAR(100), 
CountryCode CHAR(2)
CONSTRAINT PK_Identity PRIMARY KEY  (Id) 
CONSTRAINT FK_CountryCode_Countries REFERENCES Countries(CountryCode)
)

INSERT INTO Monasteries([Name], CountryCode) VALUES
('Rila Monastery “St. Ivan of Rila”', 'BG'), 
('Bachkovo Monastery “Virgin Mary”', 'BG'),
('Troyan Monastery “Holy Mother''s Assumption”', 'BG'),
('Kopan Monastery', 'NP'),
('Thrangu Tashi Yangtse Monastery', 'NP'),
('Shechen Tennyi Dargyeling Monastery', 'NP'),
('Benchen Monastery', 'NP'),
('Southern Shaolin Monastery', 'CN'),
('Dabei Monastery', 'CN'),
('Wa Sau Toi', 'CN'),
('Lhunshigyia Monastery', 'CN'),
('Rakya Monastery', 'CN'),
('Monasteries of Meteora', 'GR'),
('The Holy Monastery of Stavronikita', 'GR'),
('Taung Kalat Monastery', 'MM'),
('Pa-Auk Forest Monastery', 'MM'),
('Taktsang Palphug Monastery', 'BT'),
('Sümela Monastery', 'TR')

------------Do not submit--------------
ALTER TABLE Countries
ADD IsDeleted BIT  NOT NULL DEFAULT (0)
---------------------------------------

UPDATE Countries
SET IsDeleted = 1
WHERE CountryCode IN (
					  SELECT c.CountryCode FROM Countries AS c
					  INNER JOIN CountriesRivers AS cr ON c.CountryCode = cr.CountryCode 
					  GROUP BY c.CountryCode
                      HAVING COUNT(cr.RiverId) > 3
					  )

SELECT m.[Name] AS Monastery, c.CountryName AS Country FROM Monasteries AS m
INNER JOIN Countries AS c ON m.CountryCode = c.CountryCode
WHERE IsDeleted <> 1
ORDER BY m.[Name]

--14. Monasteries by Continents and Countries 
UPDATE Countries
SET CountryName = 'Burma'
WHERE CountryName = 'Myanmar'

INSERT INTO Monasteries (Name, CountryCode)
    (SELECT 'Hanga Abbey', 
	        CountryCode
       FROM Countries AS c 
      WHERE CountryName = 'Tanzania')

 INSERT INTO Monasteries (Name, CountryCode)
   (SELECT 'Myin-Tin-Daik', 
           CountryCode
      FROM Countries AS c 
     WHERE CountryName = 'Myanmar')

SELECT cont.ContinentName, c.CountryName, COUNT(m.Id) AS MonasteriesCount 
FROM Continents AS cont
INNER JOIN Countries AS c ON cont.ContinentCode = c.ContinentCode
LEFT OUTER JOIN Monasteries AS m ON c.CountryCode = m.CountryCode
WHERE c.IsDeleted = 0
GROUP BY cont.ContinentName, c.CountryName
ORDER BY MonasteriesCount DESC, c.CountryName