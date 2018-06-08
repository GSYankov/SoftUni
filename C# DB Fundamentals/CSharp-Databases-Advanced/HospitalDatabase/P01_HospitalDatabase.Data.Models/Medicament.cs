using System;
using System.Collections.Generic;
using System.Text;

namespace P01_HospitalDatabase.Data.Models
{
    public class Medicament
    {
        //MedicamentId
        //Name(up to 50 characters, unicode)

        public int MedicamentId { get; set; }
        public string Name { get; set; }

    }
}
