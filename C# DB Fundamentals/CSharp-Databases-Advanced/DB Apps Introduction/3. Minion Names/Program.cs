using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace _3._Minion_Names
{
    class Program
    {
        static void Main(string[] args)
        {
            int villianIndex = int.Parse(Console.ReadLine());

            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
            {
                ["Data Source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };

            SqlConnection connection = new SqlConnection(builder.ToString());
            connection.Open();

            string sqlVillianName = "SELECT [Name] FROM Villains " +
                                    "WHERE Id = @VillianIndex";
            SqlCommand getVillianName = new SqlCommand(sqlVillianName, connection);
            getVillianName.Parameters.AddWithValue("@VillianIndex", villianIndex);

            string sqlMinionsNameAge = "SELECT m.[Name], m.Age FROM MinionsVillains AS mv " +
                                       "INNER JOIN Minions AS m ON mv.MinionId = m.Id " +
                                       "WHERE mv.VillainId = @VillianIndex " +
                                       "ORDER BY m.[Name]";
            SqlCommand getMinionsNameAge = new SqlCommand(sqlMinionsNameAge, connection);
            getMinionsNameAge.Parameters.AddWithValue("@VillianIndex", villianIndex);

            Dictionary<string, List<string>> villianMinions = new Dictionary<string, List<string>>();

            using (connection)
            {
                string villianName = (string)getVillianName.ExecuteScalar();
                if (villianName != null)
                {
                    villianMinions.Add(villianName, new List<string>());

                    SqlDataReader reader = getMinionsNameAge.ExecuteReader();

                    while (reader.Read())
                    {
                        string minionName = (string)reader[0];
                        int minionAge = (int)reader[1];
                        string minionDetails = $"{minionName} {minionAge.ToString()}";
                        villianMinions[villianName].Add(minionDetails);
                    }

                    Console.WriteLine($"Villain: {villianName}");
                    if (villianMinions[villianName].Count == 0)
                    {
                        Console.WriteLine("(no minions)");
                    }
                    else
                    {
                        for (int i = 0; i < villianMinions[villianName].Count; i++)
                        {
                            Console.WriteLine($"{i + 1}. {villianMinions[villianName][i]}");
                        }
                    }
                }
                else
                {
                    Console.WriteLine($"No villain with ID {villianIndex} exists in the database.");
                }


            }
        }
    }
}
