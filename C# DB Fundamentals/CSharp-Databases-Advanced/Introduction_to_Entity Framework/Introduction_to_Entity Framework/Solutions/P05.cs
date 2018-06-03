using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P05
    {
        //5. Employees from Research and Development
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var selectedEmployees = db.Employees.
                    Where(e => e.Department.Name == "Research and Development ").
                    OrderBy(e => e.Salary).
                    ThenByDescending(e => e.FirstName).
                    Select(e => new { Print = $"{e.FirstName} {e.LastName} from {e.Department.Name} - ${e.Salary:f2}" });

                foreach (var e in selectedEmployees)
                {
                    Console.WriteLine(e.Print);
                }
            }
        }
    }
}
