using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using P02_DatabaseFirst.Data.Models;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P09
    {
        //9. Employee 147
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var emp147 = db.Employees.
                    Select(e => new { Info = $"{e.FirstName} {e.LastName} - {e.JobTitle}", Projects = e.EmployeeProjects.Select(p => p.Project).OrderBy(p => p.Name), e.EmployeeId }).
                    FirstOrDefault(e => e.EmployeeId == 147);

                Console.WriteLine(emp147.Info);
                foreach (var prj in emp147.Projects)
                {
                    Console.WriteLine(prj.Name);
                }
            }
        }
    }
}
