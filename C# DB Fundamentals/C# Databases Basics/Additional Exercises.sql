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

 --04. * User in Games with Their Statistics

 --05. All Items with Greater than Average Statistics
    SELECT i.[Name], i.Price, i.MinLevel, st.Strength, st.Defence, st.Speed, st.Luck, st.Mind 
      FROM Items AS i
INNER JOIN [Statistics] AS st ON i.StatisticId = st.Id
     WHERE st.Mind  > (SELECT AVG(Mind * 1.0)  AS AvgMind FROM [Statistics])
       AND st.Luck  > (SELECT AVG(Luck * 1.0)  AS AvgLuck FROM [Statistics])
       AND st.Speed > (SELECT AVG(Speed * 1.0) FROM [Statistics])
    ORDER BY i.[Name]

--06. Display All Items about Forbidden Game Type 
