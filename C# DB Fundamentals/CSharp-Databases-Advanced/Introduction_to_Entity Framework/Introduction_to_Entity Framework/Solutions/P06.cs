using System;
using System.Collections.Generic;
using System.Text;
using P02_DatabaseFirst.Data;
using P02_DatabaseFirst.Data.Models;
using System.Linq;

namespace P02_DatabaseFirst.Solutions
{
    public class P06
    {
        //6.	Adding a New Address and Updating Employee
        public void Run()
        {
            var db = new SoftUniContext();

            using (db)
            {
                var address = new Address()
                {
                    AddressText = "Vitoshka 15",
                    TownId = 4
                };

                Employee nakov = db.Employees.FirstOrDefault(e => e.LastName == "Nakov");
                nakov.Address = address;
                db.SaveChanges();

                var employeesAddresses = db.Employees.
                    OrderByDescending(e => e.AddressId).
                    Take(10).
                    Select(e => e.Address);

                foreach (var e in employeesAddresses)
                {
                    Console.WriteLine(e.AddressText);
                }
            }
        }
    }
}
