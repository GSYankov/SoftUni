using MiniOrmApp.Data;
using MiniOrmApp.Data.Entities;
using System;
using System.Linq;

namespace MiniOrmApp
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            var connectionString = @"Server=DESKTOP-1KC3O05\SQLEXPRESS;Database=MiniORM;Integrated Security=True";

            var context = new SoftUniDbContext(connectionString);

            context.Employees.Add(new Employee
            {
                FirstName = "Gosho",
                LastName = "Inerted",
                DepartmentId = context.Departments.First().Id,
                IsEmployed = true
            });

            var employee = context.Employees.Last();
            employee.FirstName = "Modified";

            context.SaveChanges();
        }

    }
}
