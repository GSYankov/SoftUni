namespace P01_HospitalDatabase.Data
{
    using Microsoft.EntityFrameworkCore;
    using P01_HospitalDatabase.Data.Models;

    public class HospitalContext : DbContext
    {
        public HospitalContext()
        {
        }

        public HospitalContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Diagnose> Diagnoses { get; set; }
        public DbSet<Medicament> Medicaments { get; set; }
        public DbSet<PatientMedicament> PatientMedicament { get; set; }
        public DbSet<Visitation> Visitations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.PatientId);

                entity.Property(e => e.FirstName).
                IsRequired().
                HasMaxLength(50);

                entity.Property(e => e.LastName).
                IsRequired().
                HasMaxLength(50);

                entity.Property(e => e.Address).
                IsRequired().
                HasMaxLength(250);

                entity.Property(e => e.Email).
                HasColumnType("VARCHAR(80)");


                entity.Property(e => e.HasInsurance).
                IsRequired().
                HasDefaultValue(true);
            });

            modelBuilder.Entity<Visitation>(entity =>
            {
                entity.HasKey(e => e.VisitationId);

                entity.Property(e => e.Comments).
                HasMaxLength(250);

                entity.HasOne(e => e.Patient).
                WithMany(p => p.Visitations).
                HasForeignKey(e => e.PatientId);
            });

            modelBuilder.Entity<Diagnose>(entity =>
            {
                entity.HasKey(e => e.DiagnoseId);

                entity.Property(e => e.Name).
                HasMaxLength(50);

                entity.Property(e => e.Comments).
                HasMaxLength(250);

                entity.HasOne(e => e.Patient).
                WithMany(p => p.Diagnoses).
                HasForeignKey(e => e.PatientId);
            });

            modelBuilder.Entity<Medicament>(entity =>
            {
                entity.HasKey(e => e.MedicamentId);

                entity.Property(e => e.Name).
                HasMaxLength(50);
            });

            modelBuilder.Entity<PatientMedicament>(entity =>
            {
                entity.HasKey(e => e.PerscriptionId);
            });
        }
    }
}
