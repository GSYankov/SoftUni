using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;

namespace P02_DatabaseFirst
{
    public class P13
    {
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var employees = db.Employees
                    .Where(e => e.FirstName.StartsWith("Sa"))
                    .OrderBy(e => e.FirstName)
                    .ThenBy(e => e.LastName)
                    .Select(e => new
                    {
                        e.FirstName,
                        e.LastName,
                        e.JobTitle,
                        e.Salary
                    });

                foreach (var e in employees)
                {
                    Console.WriteLine($"{e.FirstName} {e.LastName} - {e.JobTitle} - (${e.Salary:f2})");
                }
            }





        }
    }
}
