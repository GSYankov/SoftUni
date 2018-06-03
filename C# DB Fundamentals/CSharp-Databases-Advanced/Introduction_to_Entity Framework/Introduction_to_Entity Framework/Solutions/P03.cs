using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P03
    {
        //3.	Employees Full Information
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var emploeesInfo = db.Employees.
                    OrderBy(e => e.EmployeeId).
                    Select(e => new { Info = $"{e.FirstName} {e.LastName} {e.MiddleName} {e.JobTitle} {e.Salary:f2}" });

                foreach (var e in emploeesInfo)
                {
                    Console.WriteLine(e.Info);
                }
            }
        }
    }
}
