using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P04
    {
        //4.	Employees with Salary Over 50 000
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var emploeeNames = db.Employees.
                    Where(e => e.Salary > 50000).
                    OrderBy(e => e.FirstName).
                    Select(e => e.FirstName);

                foreach (var e in emploeeNames)
                {
                    Console.WriteLine(e);
                }
            }
        }
    }
}
