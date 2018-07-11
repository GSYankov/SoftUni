﻿using System.Collections.Generic;

namespace P03_FootballBetting.Data.Models
{
    public class Player
    {
        //PlayerId, Name, SquadNumber, TeamId, PositionId, IsInjured

        public Player()
        {
            this.PlayerStatistics = new HashSet<PlayerStatistic>();
        }
        public int PlayerId { get; set; }
        public string Name { get; set; }
        public byte SquadNumber { get; set; }

        public int TeamId { get; set; }
        public Team Team { get; set; }

        public int PositionId { get; set; }
        public bool IsInjured { get; set; }

        public Position Position { get; set; }
        public ICollection<PlayerStatistic> PlayerStatistics { get; set; }
    }
}