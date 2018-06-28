using System;
using System.Data.SqlClient;
using System.Linq;

namespace _4._Add_Minion
{
    class Program
    {
        static void Main(string[] args)
        {
            var minionDetails = Console.ReadLine().Split().Skip(1).ToArray();
            var minionName = minionDetails[0];
            var minionAge = int.Parse(minionDetails[1]);
            var minionCity = minionDetails[2];
            var villianName = Console.ReadLine().Split().Skip(1).ToArray()[0].ToString();

            SqlConnectionStringBuilder connectionBuilder = new SqlConnectionStringBuilder
            {
                ["Data Source"] = @"DESKTOP-1KC3O05\SQLEXPRESS",
                ["Integrated Security"] = true,
                ["Database"] = "MinionsDB"
            };

            var connection = new SqlConnection(connectionBuilder.ToString());
            connection.Open();

            using (connection)
            {
                string townCheck = @"SELECT Id FROM Towns WHERE [Name] = @Town";
                SqlCommand getTownId = new SqlCommand(townCheck, connection);
                getTownId.Parameters.AddWithValue("@Town", minionCity);
                int? townId = (int?)getTownId.ExecuteScalar();

                if (townId == null)
                {
                    string townAdd = @"INSERT INTO Towns VALUES(@TownName, 1)";
                    SqlCommand addTown = new SqlCommand(townAdd, connection);
                    addTown.Parameters.AddWithValue("@TownName", minionCity);
                    addTown.ExecuteNonQuery();
                    Console.WriteLine($"Town {minionCity} was added to the database.");
                    townId = (int)getTownId.ExecuteScalar();
                }

                string sqlVilianName = @"SELECT Id FROM Villains WHERE [Name] = @VillianName";
                SqlCommand getVilianName = new SqlCommand(sqlVilianName, connection);
                getVilianName.Parameters.AddWithValue("@VillianName", villianName);
                int? villianId = (int?)getVilianName.ExecuteScalar();

                if (villianId == null)
                {
                    string sqlVilianAdd = @"INSERT INTO Villains VALUES (@VillianName, 2)";
                    SqlCommand addVilian = new SqlCommand(sqlVilianAdd, connection);
                    addVilian.Parameters.AddWithValue("@VillianName", villianName);
                    addVilian.ExecuteNonQuery();
                    Console.WriteLine($"Villain {villianName} was added to the database.");
                    villianId = (int)getVilianName.ExecuteScalar();
                }

                string sqlMinionAdd = @"INSERT INTO Minions VALUES (@MinionName, @MinionAge, 1)";
                SqlCommand addMinion = new SqlCommand(sqlMinionAdd, connection);
                addMinion.Parameters.AddWithValue("@MinionName", minionName);
                addMinion.Parameters.AddWithValue("@MinionAge", minionAge);
                addMinion.ExecuteNonQuery();

                string sqlMinionId = @"SELECT Id FROM Minions WHERE [Name] = @MinionName AND Age = @MinionAge";
                SqlCommand getMinionId = new SqlCommand(sqlMinionId, connection);
                getMinionId.Parameters.AddWithValue("@MinionName", minionName);
                getMinionId.Parameters.AddWithValue("@MinionAge", minionAge);

                int newMinionId = (int)getMinionId.ExecuteScalar();
                string sqlAssignMinnion = @"INSERT INTO MinionsVillains VALUES(@MinionId, @VillianId)";
                SqlCommand assignMinion = new SqlCommand(sqlAssignMinnion, connection);
                assignMinion.Parameters.AddWithValue("@MinionId", newMinionId);
                assignMinion.Parameters.AddWithValue("@VillianId", villianId);
                assignMinion.ExecuteNonQuery();
                Console.WriteLine($"Successfully added {minionName} to be minion of {villianName}.");
            }




        }
    }
}
