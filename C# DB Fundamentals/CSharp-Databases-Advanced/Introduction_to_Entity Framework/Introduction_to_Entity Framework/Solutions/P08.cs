using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using P02_DatabaseFirst.Data.Models;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P08
    {
        public void Run()
        {
            //8. Addresses by Town
            var db = new SoftUniContext();

            using (db)
            {
                var addressSelection = db.Addresses.
                    OrderByDescending(a => a.Employees.Count).
                    ThenBy(a => a.Town.Name).
                    ThenBy(a => a.AddressText).
                    Take(10).
                    Select(a => new { AddressInfo = $"{a.AddressText}, {a.Town.Name} - {a.Employees.Count} employees" });

                foreach (var a in addressSelection)
                {
                    Console.WriteLine(a.AddressInfo);
                }
            }
        }
    }
}
