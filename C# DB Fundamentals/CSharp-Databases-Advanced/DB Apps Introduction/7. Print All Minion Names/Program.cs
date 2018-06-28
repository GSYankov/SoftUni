using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace _7._Print_All_Minion_Names
{
    class Program
    {
        static void Main(string[] args)
        {
            SqlConnectionStringBuilder sqlConnectionBuilder = new SqlConnectionStringBuilder
            {
                ["Data source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };
            SqlConnection connection = new SqlConnection(sqlConnectionBuilder.ToString());
            connection.Open();

            string sqlGetMinions = "SELECT [Name] FROM Minions";
            SqlCommand getMinions = new SqlCommand(sqlGetMinions, connection);
            List<string> minionNames = new List<string>();
            using (connection)
            {
                SqlDataReader reader = getMinions.ExecuteReader();
                while (reader.Read())
                {
                    minionNames.Add((string)reader[0]);
                }
            }

            try
            {
                for (int i = 0; i < minionNames.Count / 2 + 1; i++)
                {
                    Console.WriteLine(minionNames[i]);
                    Console.WriteLine(minionNames[minionNames.Count - i - 1]);
                }
            }
            catch (ArgumentOutOfRangeException)
            {
            }
        }
    }
}
