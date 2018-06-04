using System;
using System.Collections.Generic;
using System.Text;

namespace P03_FootballBetting.Data
{
    internal class Configuration
    {
        internal static string ConnectionString => 
            @"Server=DESKTOP-1KC3O05\SQLEXPRESS;Database=FootballBetting;Integrated Security=True";
    }
}
