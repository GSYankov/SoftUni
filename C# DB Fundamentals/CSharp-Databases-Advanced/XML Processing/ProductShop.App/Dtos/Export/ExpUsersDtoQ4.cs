using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace ProductShop.App.Dtos
{
    [XmlRoot("users")]
    public   class ExpUsersDtoQ4
    {
        [XmlAttribute("count")]
        public int Count { get; set; }

        [XmlElement("user")]
        public ExpUserDtoQ4[] User { get; set; }
    }
}
