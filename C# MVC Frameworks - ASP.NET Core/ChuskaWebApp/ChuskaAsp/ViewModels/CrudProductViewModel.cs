using ChuskaAsp.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.ViewModels
{
    public class CrudProductViewModel
    {
        public string Name { get; set; }

        public string Price { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }
    }
}
