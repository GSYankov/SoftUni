using System;
using P01_BillsPaymentSystem.Data;
using P01_BillsPaymentSystem.DbInitializer;

namespace P01_BillsPaymentSystem
{
    class StartUp
    {
        static void Main()
        {
            //Tasks 1 & 2 completed. Not enough time to complete the application using the DB.
            var db = new BillsPaymentSystemContext();
            var dbInit = new DbModifier();
            
            using (db)
            {
                dbInit.DbReset(db);
                dbInit.Seed(db);
            }
        }
    }
}
