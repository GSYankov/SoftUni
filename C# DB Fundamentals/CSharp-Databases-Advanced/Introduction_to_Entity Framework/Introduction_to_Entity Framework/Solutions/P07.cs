using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using P02_DatabaseFirst.Data.Models;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P07
    {
        public void Run()
        {
            //7.Employees and Projects
            var db = new SoftUniContext();

            using (db)
            {
                var employeesProjects = db.Employees.
                    Where(e => e.EmployeeProjects.Any(ep => ep.Project.StartDate.Year >= 2001 &&
                                                            ep.Project.StartDate.Year <= 2003)).
                    Take(30).
                    Select(e => new
                    {
                        Info = $"{e.FirstName} {e.LastName} - Manager: {e.Manager.FirstName} {e.Manager.LastName}",
                        Projects = e.EmployeeProjects.Select(ep => ep.Project)
                    });

                foreach (var e in employeesProjects)
                {
                    Console.WriteLine(e.Info);

                    foreach (var p in e.Projects)
                    {
                        if (p.EndDate != null)
                        {
                            Console.WriteLine($"--{p.Name} - {p.StartDate.ToString("M/d/yyyy h:mm:ss tt")} - {p.EndDate.Value.ToString("M/d/yyyy h:mm:ss tt")}");
                        }
                        else
                        {
                            Console.WriteLine($"--{p.Name} - {p.StartDate.ToString("M/d/yyyy h:mm:ss tt")} - not finished");
                        }
                    }
                }
            }
        }
    }
}
