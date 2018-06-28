using System;
using System.Data.SqlClient;

namespace LocalDB
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string connString = @"Server=DESKTOP-1KC3O05\SQLEXPRESS;Database=SoftUni;Integrated Security=True";
            var connection = new SqlConnection(connString);
            connection.Open();

            using (connection)
            {
                var command = new SqlCommand("SELECT FirstName, LastName, JobTitle FROM Employees", connection);


                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    var firstName = (string)reader["FirstName"];
                    var lastName = (string)reader["LastName"];
                    var jobTitle = (string)reader["JobTitle"];

                    var employeeData = $"{firstName} {lastName} is a {jobTitle}";
                    Console.WriteLine(employeeData);
                }
            }

        }
    }
}
