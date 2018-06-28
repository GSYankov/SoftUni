using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace _8._Increase_Minion_Age
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] minionsIds = Console.ReadLine().Split().Select(int.Parse).ToArray();

            SqlConnectionStringBuilder sqlConnectionBuilder = new SqlConnectionStringBuilder
            {
                ["Data source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };
            SqlConnection connection = new SqlConnection(sqlConnectionBuilder.ToString());
            connection.Open();

            IcreaseAge(minionsIds, connection);

            TitleCase(minionsIds, connection);

            List<KeyValuePair<string, int>> minionsUpdated = GetNamesAndAge(connection);

            foreach (var minion in minionsUpdated)
            {
                Console.WriteLine(minion.Key + " " + minion.Value);
            }
        }

        private static List<KeyValuePair<string, int>> GetNamesAndAge(SqlConnection connection)
        {
            List<KeyValuePair<string, int>> result = new List<KeyValuePair<string, int>>();

            string sqlGetNamesAndAge = "SELECT [Name], Age FROM Minions";
            SqlCommand getNamesAndAge = new SqlCommand(sqlGetNamesAndAge, connection);
            SqlDataReader reader = getNamesAndAge.ExecuteReader();
            while (reader.Read())
            {
                KeyValuePair<string, int> minion = new KeyValuePair<string, int>((string)reader[0], (int)reader[1]);
                result.Add(minion);
            }

            return result;
        }

        private static void TitleCase(int[] minionsIds, SqlConnection connection)
        {
            foreach (int minionId in minionsIds)
            {
                string sqlTitleCaseName = "UPDATE Minions SET [Name] = UPPER(SUBSTRING([Name], 1, 1)) + SUBSTRING([Name], 2, LEN([Name])) WHERE Id = @Id";
                SqlCommand titleCaseName = new SqlCommand(sqlTitleCaseName, connection);
                titleCaseName.Parameters.AddWithValue("@Id", minionId);
                titleCaseName.ExecuteNonQuery();
            }
        }

        private static void IcreaseAge(int[] minionsIds, SqlConnection connection)
        {
            foreach (int minionId in minionsIds)
            {
                string sqlUpdateAge = "UPDATE Minions SET Age = Age + 1 WHERE Id = @MinionId";
                SqlCommand updateAge = new SqlCommand(sqlUpdateAge, connection);
                updateAge.Parameters.AddWithValue("@MinionId", minionId);
                updateAge.ExecuteNonQuery();
            }
        }
    }
}
