using System;
using P01_HospitalDatabase.Data;
using P01_HospitalDatabase.Initializer;
using Microsoft.EntityFrameworkCore;

namespace P01_HospitalDatabase
{
    class StartUp
    {
        static void Main(string[] args)
        {
            var db = new HospitalContext();

            //db.Database.EnsureDeleted();
            //db.Database.EnsureCreated();
            //DatabaseInitializer.Migrate();

            using (db)
            {
                DatabaseInitializer.ResetDatabase();
                DatabaseInitializer.InitialSeed(db);
                DatabaseInitializer.SeedPatients(db, 5);
            }

            //using (db)
            //{
            //    db.Database.Migrate();
            //}
        }
    }
}
