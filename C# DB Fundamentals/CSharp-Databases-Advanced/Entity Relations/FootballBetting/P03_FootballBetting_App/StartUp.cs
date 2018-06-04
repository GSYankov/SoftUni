using System;
using P03_FootballBetting.Data;
using P03_FootballBetting.Data.Models;
namespace P03_FootballBetting_App
{
    public class StartUp
    {
       public  static void Main(string[] args)
        {
            using (var db = new FootballBettingContext())
            {
                db.Database.EnsureCreated();
            }

        }
    }
}
