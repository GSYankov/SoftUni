using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Event Event { get; set; }

        public EventuresUser Customer { get; set; }

        public int TicketCount { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}
