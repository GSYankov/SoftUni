using System;
using System.Collections.Generic;
using System.IO;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.DbInitializer
{
    class Users
    {
        public static List<User> GetUsers()
        {
            List<string> maleNames = ReadNames("MaleNames.txt");
            List<string> femaleNames = ReadNames("FemaleNames.txt");
            List<User> users = new List<User>();
            Random r = new Random();

            for (int i = 0; i < 30; i++)
            {
                string pass = GetPass();
                User user = new User
                {
                    FirstName = maleNames[r.Next(0, maleNames.Count)],
                    LastName = maleNames[r.Next(0, maleNames.Count)] + "ов",
                    Email = "test.mail@nodomain.com",
                    Password = pass
                };
                users.Add(user);
            }

            for (int i = 0; i < 70; i++)
            {
                string pass = GetPass();
                User user = new User
                {
                    FirstName = femaleNames[r.Next(0, maleNames.Count)],
                    LastName = femaleNames[r.Next(0, maleNames.Count)] + "ева",
                    Email = "test.mail@nodomain.com",
                    Password = pass
                };
                users.Add(user);
            }

            return users;
        }

        public static string GetPass()
        {
            Random r = new Random();
            char[] passChars = new char[16];

            for (int i = 0; i < 16; i++)
            {
                char ch = (char)r.Next(0, 255);
                passChars[i] = ch;
            }

            return string.Join("", passChars);
        }

        public static List<string> ReadNames(string file)
        {
            string maleNamesFile = $"..//..//..//..//P01_BillsPaymentSystem.DbInitializer//Repos//{file}";
            var filestream = new FileStream(maleNamesFile, FileMode.Open, FileAccess.Read);
            var reader = new StreamReader(filestream, System.Text.Encoding.Unicode);
            string readline;
            List<string> names = new List<string>();

            while ((readline = reader.ReadLine()) != null)
            {
                names.Add(readline);
            }
            reader.Close();
            return names;
        }

    }
}
