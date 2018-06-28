using System;
using System.Data.SqlClient;

namespace _2._Villain_Names
{
    class Program
    {
        static void Main(string[] args)
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
            {
                ["Data Source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };

            SqlConnection conntection = new SqlConnection(builder.ToString());
            conntection.Open();

            string sqlStatement = "SELECT v.[Name], COUNT(*) AS [Minions Count] FROM Villains AS v " +
                                  "INNER JOIN MinionsVillains AS mv ON v.Id = mv.VillainId " +
                                  "GROUP BY v.[Name] " +
                                  "HAVING COUNT(*) > 3";

            using (conntection)
            {
                SqlCommand command = new SqlCommand(sqlStatement, conntection);

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string villianName = (string)reader[0];
                    int minionsCount = (int)reader[1];
                    Console.WriteLine($"{villianName} - {minionsCount}");
                }
            }
        }
    }
}
