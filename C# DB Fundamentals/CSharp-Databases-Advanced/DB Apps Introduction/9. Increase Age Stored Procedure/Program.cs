using System;
using System.Data;
using System.Data.SqlClient;

namespace _9._Increase_Age_Stored_Procedure
{
    class Program
    {
        static void Main(string[] args)
        {
            int minionBirthdayId = int.Parse(Console.ReadLine());
            SqlConnectionStringBuilder sqlConnectionBuilder = new SqlConnectionStringBuilder
            {
                ["Data source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };
            SqlConnection connection = new SqlConnection(sqlConnectionBuilder.ToString());
            connection.Open();

            using (connection)
            {
                string sqlUseProcGetOlder = "usp_GetOlder";
                SqlCommand useProcGetOlder = new SqlCommand(sqlUseProcGetOlder, connection);
                useProcGetOlder.CommandType = System.Data.CommandType.StoredProcedure;
                useProcGetOlder.Parameters.AddWithValue("@MinionId", minionBirthdayId);
                useProcGetOlder.ExecuteNonQuery();

                string sqlGetMinion = "SELECT [Name], Age FROM Minions WHERE Id = @Id";
                SqlCommand getMinion = new SqlCommand(sqlGetMinion, connection);
                getMinion.Parameters.AddWithValue("@Id", minionBirthdayId);

                SqlDataReader reader = getMinion.ExecuteReader();
                reader.Read();
                Console.WriteLine(reader[0] + " - " + reader[1]);
            }
        }
    }
}
