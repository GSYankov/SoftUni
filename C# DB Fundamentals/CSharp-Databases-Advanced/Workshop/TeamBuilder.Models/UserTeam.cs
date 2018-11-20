using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TeamBuilder.Models
{
    public class UserTeam
    {
        [MinLength(0)]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [MinLength(0)]
        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public virtual Team Team { get; set; }
    }
}
