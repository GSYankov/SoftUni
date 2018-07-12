using System.Collections.Generic;

namespace BookShop.Models
{
    public class Category
    {
        //        •	Category:
        //o CategoryId
        //o Name(up to 50 characters, unicode)
        //o CategoryBooks

        public Category()
        {
            this.CategoryBooks = new HashSet<BookCategory>();
        }

        public int CategoryId { get; set; }

        public string Name { get; set; }

        public ICollection<BookCategory> CategoryBooks { get; set; }

    }
}