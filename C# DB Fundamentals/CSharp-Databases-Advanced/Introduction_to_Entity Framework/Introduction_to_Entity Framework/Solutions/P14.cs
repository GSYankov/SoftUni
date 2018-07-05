using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;

namespace P02_DatabaseFirst
{
    public class P14
    {
        public void Run()
        {
            var db = new SoftUniContext();

            var project = db.Projects.Find(2);
            if (project != null)
            {
                var empsPrjs = db.EmployeesProjects
                .Where(ep => ep.Project == project)
                .ToList();
                empsPrjs.Clear();

                db.Projects.Remove(project);

                db.SaveChanges();
            }



            foreach (var prj in db.Projects.Take(10))
            {
                Console.WriteLine(prj.Name);
            }

        }
    }
}
