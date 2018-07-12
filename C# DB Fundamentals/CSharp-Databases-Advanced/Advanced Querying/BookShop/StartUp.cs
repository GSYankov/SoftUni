using System;
using BookShop.Initializer;
using BookShop.Data;
using BookShop.Models;
using System.Text;
using System.Linq;
using System.Globalization;

namespace BookShop
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            var db = new BookShopContext();
            //DbInitializer.ResetDatabase(db);
            Console.WriteLine(GetBooksByAgeRestriction(db, "miNor"));

        }

        public static string GetBooksByAgeRestriction(BookShopContext context, string command)
        {
            StringBuilder sb = new StringBuilder();
            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
            var titleCommand = textInfo.ToTitleCase(command);

            using (context)
            {
                var books = context.Books.Where(b => b.AgeRestriction == Enum.Parse<AgeRestriction>(titleCommand))
                    .OrderBy(b => b.Title);

                foreach (var b in books)
                {
                    sb.AppendLine(b.Title);
                }
            }

            return sb.ToString().Trim();
        }
    }
}
