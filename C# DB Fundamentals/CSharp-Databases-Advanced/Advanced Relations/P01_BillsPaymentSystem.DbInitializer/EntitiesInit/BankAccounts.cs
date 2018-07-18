using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.DbInitializer
{
    class BankAccounts
    {
        public static HashSet<BankAccount> GetBankAccounts()
        {
            HashSet<BankAccount> bankAccounts = new HashSet<BankAccount>();
            List<string> banks = ReadBanks("BanksSwifts.txt");
            Random r = new Random();

            for (int i = 0; i < 30; i++)
            {
                var b = banks[r.Next(0, banks.Count)].Split(",");
                BankAccount ba = new BankAccount()
                {
                    BankName = b[0],
                    SwiftCode = b[1],
                    Balance = Math.Round((decimal)r.Next(1000, 1000000) / 100, 2)
                };
                bankAccounts.Add(ba);
            }

            return bankAccounts;
        }

        private static List<string> ReadBanks(string file)
        {
            string maleNamesFile = $"..//..//..//..//P01_BillsPaymentSystem.DbInitializer//Repos//{file}";
            var filestream = new FileStream(maleNamesFile, FileMode.Open, FileAccess.Read);
            var reader = new StreamReader(filestream, System.Text.Encoding.ASCII);
            string readline;
            List<string> banks = new List<string>();

            while ((readline = reader.ReadLine()) != null)
            {
                banks.Add(readline);
            }
            reader.Close();

            return banks;
        }
    }
}
