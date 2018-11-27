using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class OrdersViewModel
    {
        public ICollection<OrderViewModel> Orders { get; set; }

        [Required]
        [Range(1, 9, ErrorMessage = "Ordered tickets must be between 1-9")]
        public int Tickets { get; set; }

        [Required]
        public string EventId { get; set; }

        public string OrderError { get; set; }
    }
}
