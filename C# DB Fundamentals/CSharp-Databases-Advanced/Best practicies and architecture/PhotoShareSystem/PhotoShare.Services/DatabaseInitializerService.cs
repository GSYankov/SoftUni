namespace PhotoShare.Services
{
    using Microsoft.EntityFrameworkCore;

    using Data;
    using Contracts;

    public class DatabaseInitializerService : IDatabaseInitializerService
    {
        private readonly PhotoShareContext _context;

        public DatabaseInitializerService(PhotoShareContext context)
        {
            this._context = context;
        }

        public void InitializeDatabase()
        {
            this._context.Database.Migrate();
        }
    }
}
