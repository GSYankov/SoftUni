using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace _5._Change_Town_Names_Casing
{
    class Program
    {
        static void Main(string[] args)
        {
            string country = Console.ReadLine();

            SqlConnectionStringBuilder connectionBuilder = new SqlConnectionStringBuilder
            {
                ["Data Source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };

            SqlConnection connection = new SqlConnection(connectionBuilder.ToString());
            connection.Open();

            string sqlGetCountryId = @"SELECT Id FROM Countries WHERE [Name] = @Country";
            SqlCommand getCountryId = new SqlCommand(sqlGetCountryId, connection);
            getCountryId.Parameters.AddWithValue("@Country", country);
            int countryId = (int)getCountryId.ExecuteScalar();

            string sqlGetTowns = @"SELECT [Name] FROM Towns WHERE CountryId = @CountryId";
            SqlCommand getTowns = new SqlCommand(sqlGetTowns, connection);
            getTowns.Parameters.AddWithValue("@CountryId", countryId);

            List<string> towns = new List<string>();
            SqlDataReader reader = getTowns.ExecuteReader();


            while (reader.Read())
            {
                towns.Add((string)reader[0]);
            }
            reader.Close();

            foreach (string town in towns)
            {
                string sqlChangeCase = "UPDATE Towns SET [Name] = @TownUc WHERE [Name] = @Town";
                SqlCommand changeCase = new SqlCommand(sqlChangeCase, connection);
                changeCase.Parameters.AddWithValue("@Town", town);
                changeCase.Parameters.AddWithValue("@TownUc", town.ToUpper());
                changeCase.ExecuteNonQuery();
            }

            if (towns.Count > 0)
            {
                Console.WriteLine($"{towns.Count} town names were affected.");
                StringBuilder sb = new StringBuilder();
                sb.Append("[");
                foreach (string town in towns)
                {
                    sb.Append(town.ToUpper() + " ,");
                }
                sb.Remove(sb.Length - 2, 2);
                sb.Append("]");
                Console.WriteLine(sb.ToString());
            }
            else
            {
                Console.WriteLine("No town names were affected.");
            }
        }
    }
}
