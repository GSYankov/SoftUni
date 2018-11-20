using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Models
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Place { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public int TotalTickets { get; set; }

        public decimal PricePerTicket { get; set; }
    }
}
