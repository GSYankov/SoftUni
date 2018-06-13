using System;
using P01_StudentSystem.Data;

namespace P01_StudentSystem
{
    class StartUp
    {
        static void Main(string[] args)
        {
            var db = new StudentSystemContext();

            using (db)
            {
                db.Database.EnsureCreated();
            }
        }
    }
}
