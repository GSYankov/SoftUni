using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;

namespace P02_DatabaseFirst
{
    //12.	Increase Salaries
    public class P12
    {
        public void Run()
        {
            var db = new SoftUniContext();
            List<string> promoDepartments = new List<string>
            {
                "Engineering", "Tool Design", "Marketing", "Information Services"
            };


            using (db)
            {
                var empFrorPromote = db.Employees
                    .Where(e => promoDepartments.Contains(e.Department.Name));

                foreach (var e in empFrorPromote)
                {
                    e.Salary *= (decimal)1.12;
                }

                db.SaveChanges();

                foreach (var e in empFrorPromote.OrderBy(e => e.FirstName).ThenBy(e => e.LastName))
                {
                    Console.WriteLine($"{e.FirstName} {e.LastName} (${e.Salary:f2})");
                }
            }
        }




    }
}
