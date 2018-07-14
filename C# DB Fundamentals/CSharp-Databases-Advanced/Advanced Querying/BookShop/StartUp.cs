using System;
using BookShop.Initializer;
using BookShop.Data;
using BookShop.Models;
using System.Text;
using System.Linq;
using System.Globalization;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace BookShop
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            var db = new BookShopContext();
            //DbInitializer.ResetDatabase(db);
            //Console.WriteLine(GetBooksByAgeRestriction(db, "teEN"));
            //Console.WriteLine(GetGoldenBooks(db));
            //Console.WriteLine(GetBooksByPrice(db));
            //Console.WriteLine(GetBooksNotRealeasedIn(db, 2000));
            //Console.WriteLine(GetBooksByCategory(db, "horror mystery drama"));
            //Console.WriteLine(GetBooksReleasedBefore(db, "12-04-1992"));
            //Console.WriteLine(GetAuthorNamesEndingIn(db, "e"));
            //Console.WriteLine(GetBookTitlesContaining(db, "sK"));
            //Console.WriteLine(GetBooksByAuthor(db, "R"));
            //Console.WriteLine(CountBooks(db, 12));
            //Console.WriteLine(CountCopiesByAuthor(db));
            //Console.WriteLine(GetTotalProfitByCategory(db));
            //Console.WriteLine(GetMostRecentBooks(db));
            //IncreasePrices(db);
            //Console.WriteLine(RemoveBooks(db));

        }

        public static string GetBooksByAgeRestriction(BookShopContext context, string command)
        {
               var titles = context.Books
         .OrderBy(b => b.Title)
         .Where(b => b.AgeRestriction
                      .ToString()
                      .Equals(command, StringComparison.InvariantCultureIgnoreCase))
         .Select(b => b.Title)
         .ToList();
               var result = String.Join(Environment.NewLine, titles);
               return result;
        }

        public static string GetGoldenBooks(BookShopContext context)
        {
            var titles = context.Books
                .OrderBy(b => b.BookId)
                .Where(b => b.EditionType == EditionType.Gold && b.Copies < 5000)
                .Select(b => b.Title)
                .ToList();
            var result = String.Join(Environment.NewLine, titles);
            return result;
        }

        public static string GetBooksByPrice(BookShopContext db)
        {
            StringBuilder sb = new StringBuilder();

            var books = db.Books.Where(b => b.Price > 40).OrderByDescending(b => b.Price);
            foreach (var b in books)
            {
                sb.AppendLine($"{b.Title} - ${b.Price:f2}");
            }

            return sb.ToString().Trim();
        }

        public static string GetBooksNotRealeasedIn(BookShopContext context, int year)
        {
            var books = context.Books
                .Where(b => b.ReleaseDate.Value.Year != year)
                .OrderBy(b => b.BookId)
                .Select(b => b.Title)
                .ToList();

            return string.Join(Environment.NewLine, books);
        }

        public static string GetBooksByCategory(BookShopContext context, string input)
        {
            List<String> categories = input
                .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(c => c.ToLower())
                .ToList();

            var books = context.Books
                .Where(b => b.BookCategories.Any(c => categories.Contains(c.Category.Name.ToLower())))
                .OrderBy(b => b.Title)
                .Select(b => b.Title)
                .ToList();


            return string.Join(Environment.NewLine, books);
        }

        public static string GetBooksReleasedBefore(BookShopContext context, string date)
        {
            DateTime dateParsed = DateTime.ParseExact(date, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            var books = context.Books
                .Where(b => b.ReleaseDate < dateParsed)
                .OrderByDescending(b => b.ReleaseDate)
                .Select(b => $"{b.Title} - {b.EditionType} - ${b.Price:f2}")
                .ToList();

            return string.Join(Environment.NewLine, books);
        }

        public static string GetAuthorNamesEndingIn(BookShopContext context, string input)
        {
            var pattern = $@"^.*{input.ToLower()}$";

            var authors = context.Authors
                .Where(a => Regex.Match(a.FirstName.ToLower(), pattern).Success)
                .Select(a => $"{a.FirstName} {a.LastName}")
                .OrderBy(n => n)
                .ToList();

            var result = String.Join(Environment.NewLine, authors);
            return result;
        }

        public static string GetBookTitlesContaining(BookShopContext context, string input)
        {
            string regexPatern = $@"^.*{input}.*$";
            Regex reg = new Regex(regexPatern, RegexOptions.IgnoreCase);

            var books = context.Books
                .Where(b => reg.Match(b.Title).Success)
                .OrderBy(b => b.Title)
                .Select(b => b.Title)
                .ToList();

            return string.Join(Environment.NewLine, books);
        }

        public static string GetBooksByAuthor(BookShopContext context, string input)
        {
            var books = context.Books
                .Where(b => b.Author.LastName.ToLower().StartsWith(input.ToLower()))
                .OrderBy(b => b.AuthorId)
                .Select(b => $"{b.Title} ({b.Author.FirstName} {b.Author.LastName})")
                .ToList();


            return string.Join(Environment.NewLine, books);
        }

        public static int CountBooks(BookShopContext context, int lengthCheck)
        {
            var books = context.Books
                .Where(b => b.Title.Length > lengthCheck)
                .ToList();

            return books.Count();
        }

        public static string CountCopiesByAuthor(BookShopContext context)
        {
            var autors = context.Authors
                .Select(a => new { Name = $"{a.FirstName} {a.LastName}", SumOfCopies = a.Books.Select(b => b.Copies).Sum() })
                .OrderByDescending(a => a.SumOfCopies)
                .Select(a => $"{a.Name} - {a.SumOfCopies}");

            return string.Join(Environment.NewLine, autors);
        }

        public static string GetTotalProfitByCategory(BookShopContext context)
        {
            var categories = context.Categories
                .OrderBy(c => c.Name)
                .Select(c => new { c.Name, Revenue = c.CategoryBooks.Select(b => b.Book.Copies * b.Book.Price).Sum() })
                .OrderByDescending(c => c.Revenue)
                .ThenBy(c => c.Name)
                .Select(c => $"{c.Name} ${c.Revenue:f2}");


            return string.Join(Environment.NewLine, categories);
        }

        public static string GetMostRecentBooks(BookShopContext context)
        {
            var categoties = context.Categories
                .OrderBy(c => c.Name)     //.OrderBy(c => c.CategoryBooks.Select(b => b.Book).Count())
                .Select(c => new
                {
                    c.Name,
                    Books = c.CategoryBooks.Select(cb => cb.Book)
                        .OrderByDescending(b => b.ReleaseDate).Take(3)
                }).ToList();

            StringBuilder sb = new StringBuilder();

            foreach (var cat in categoties)
            {
                sb.AppendLine($"--{cat.Name}");

                foreach (var b in cat.Books)
                {
                    sb.AppendLine($"{b.Title} ({b.ReleaseDate.Value.Year})");
                }
            }

            return sb.ToString().Trim();
        }

        public static void IncreasePrices(BookShopContext context)
        {
            var books = context.Books
                .Where(b => b.ReleaseDate.Value.Year < 2010);

            foreach (var b in books)
            {
                b.Price += 5;
            }

            context.SaveChanges();
        }

        public static string RemoveBooks(BookShopContext context)
        {
            var books = context.Books
                .Where(b => b.Copies < 4200);

            int removedBooksCount = books.Count();

            context.Books.RemoveRange(books);

            return $"{removedBooksCount} books were deleted";
        }



    }
}
