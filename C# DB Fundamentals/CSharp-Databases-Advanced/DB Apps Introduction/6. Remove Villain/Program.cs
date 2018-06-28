using System;
using System.Data.SqlClient;

namespace _6._Remove_Villain
{
    class Program
    {
        static void Main(string[] args)
        {
            int villianToDelete = int.Parse(Console.ReadLine());

            SqlConnectionStringBuilder connectionBuilder = new SqlConnectionStringBuilder
            {
                ["Data Source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };

            SqlConnection connection = new SqlConnection(connectionBuilder.ToString());
            connection.Open();

            int releasedMinions;
            string villiansName;
            using (connection)
            {
                string sqlGetVilliansName = "SELECT [Name] FROM Villains WHERE Id = @Id";
                SqlCommand getVilliansName = new SqlCommand(sqlGetVilliansName, connection);
                getVilliansName.Parameters.AddWithValue("@Id", villianToDelete);
                villiansName = (string)getVilliansName.ExecuteScalar();

                string sqlReleaseMinions = "DELETE MinionsVillains WHERE VillainId = @Id";
                SqlCommand releaseMinions = new SqlCommand(sqlReleaseMinions, connection);
                releaseMinions.Parameters.AddWithValue("@Id", villianToDelete);
                releasedMinions = releaseMinions.ExecuteNonQuery();

                string sqlDeleteVillian = "DELETE Villains WHERE Id = @Id";
                SqlCommand deleteVillian = new SqlCommand(sqlDeleteVillian, connection);
                deleteVillian.Parameters.AddWithValue("@Id", villianToDelete);
                deleteVillian.ExecuteNonQuery();
            }

            if (villiansName == null)
            {
                Console.WriteLine("No such villain was found.");
            }
            else
            {
                Console.WriteLine($"{villiansName} was deleted.");
                Console.WriteLine($"{releasedMinions} minions were released.");
            }
        }
    }
}
