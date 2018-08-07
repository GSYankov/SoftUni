using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace ProductShop.App.Dtos
{
    [XmlType("sold-products")]
    public class ExpSoldProductQ4
    {
        [XmlAttribute("count")]
        public int Count { get; set; }

        [XmlElement("product")]
        public ExpProductDtoQ4[] ProductDto { get; set; }
    }
}
