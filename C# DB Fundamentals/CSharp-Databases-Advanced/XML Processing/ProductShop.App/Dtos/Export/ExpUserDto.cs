using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace ProductShop.App.Dtos
{
    [XmlType("user")]
    public class ExpUserDto
    {
        [XmlAttribute("first-name")]
        public string Firstname { get; set; }

        [XmlAttribute("last-name")]
        public string LastName { get; set; }

        [XmlArray("sold - products")]
        public ExpSoldProduct[] SoldProducts { get; set; }
    }
}
