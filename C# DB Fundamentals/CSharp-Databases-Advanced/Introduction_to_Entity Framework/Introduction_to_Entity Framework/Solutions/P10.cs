using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using P02_DatabaseFirst.Data.Models;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P10
    {
        //10.	Departments with More Than 5 Employees
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var departments = db.Departments.
                     Where(d => d.Employees.Count() > 5).
                     OrderBy(d => d.Employees.Count()).
                     ThenBy(d => d.Name).
                     Select(d => new
                     {
                         d.Name,
                         Manager = $"{d.Manager.FirstName} {d.Manager.LastName}",
                         d.Employees
                     });

                foreach (var d in departments)
                {
                    Console.WriteLine($"{d.Name} - {d.Manager}");
                    foreach (var e in d.Employees.OrderBy(e => e.FirstName).ThenBy(e => e.LastName))
                    {
                        Console.WriteLine($"{e.FirstName} {e.LastName} - {e.JobTitle}");
                    }
                    Console.WriteLine("----------");
                }
            }
        }
    }
}
