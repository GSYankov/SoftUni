using System;
using System.Collections.Generic;

namespace BookShop.Models
{
    public class Author
    {
        //        •	Author:
        //o AuthorId
        //o FirstName(up to 50 characters, unicode, not required)
        //o LastName(up to 50 characters, unicode)

        public int AuthorId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<Book> Books { get; set; }

    }
}
