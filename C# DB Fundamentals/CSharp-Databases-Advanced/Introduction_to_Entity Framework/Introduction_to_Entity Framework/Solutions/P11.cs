using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using System.Linq;
using System.Globalization;

namespace P02_DatabaseFirst
{
    public class P11
    {
        //11.	Find Latest 10 Projects
        public void Run()
        {
            SoftUniContext db = new SoftUniContext();

            using (db)
            {
                var projects = db.Projects
                    .OrderByDescending(p => p.StartDate)
                    .Take(10)
                    .Select(p => new
                    {
                        p.Name,
                        p.Description,
                        p.StartDate
                    });

                foreach (var prj in projects.OrderBy(p => p.Name))
                {
                    Console.WriteLine(prj.Name);
                    Console.WriteLine(prj.Description);
                    Console.WriteLine(prj.StartDate.ToString("M/d/yyyy h:mm:ss tt"));
                }
            }
        }


    }
}
