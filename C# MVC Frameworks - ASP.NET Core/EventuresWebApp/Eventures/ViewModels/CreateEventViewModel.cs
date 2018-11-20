using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class CreateEventViewModel
    {
        [Required]
        [MinLength(10)]
        public string Name { get; set; }

        [Required]
        public string Place { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }

        [Required]
        [Range(0, 1000000)]
        [RegularExpression("([1-9][0-9]*)",
            ErrorMessage = "Total tickets should ba a valid intiger!")]
        public int TotalTickets { get; set; }

        [Required]
        [Range(0, 1000000)]
        public decimal PricePerTicket { get; set; }
    }
}
