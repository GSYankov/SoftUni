using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TeamBuilder.Models
{
public    class TeamEvent
    {
        [MinLength(0)]
        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public virtual Team Team { get; set; }

        [MinLength(0)]
        [ForeignKey("Event")]
        public int EventId { get; set; }
        public virtual Event Event { get; set; }

    }
}
