using System;
using P03_SalesDatabase.Data;

namespace P03_SalesDatabase
{
   public class Program
    {
       public static void Main(string[] args)
        {
            var db = new SalesContext();
            using (db)
            {
                db.Database.EnsureCreated();
            }
        }
    }
}
