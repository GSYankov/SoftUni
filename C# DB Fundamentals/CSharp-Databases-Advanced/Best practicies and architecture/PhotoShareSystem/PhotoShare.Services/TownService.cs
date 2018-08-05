using AutoMapper.QueryableExtensions;
using PhotoShare.Data;
using PhotoShare.Models;
using PhotoShare.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PhotoShare.Services
{
    public class TownService : ITownService
    {
        private PhotoShareContext _context;

        public TownService(PhotoShareContext context)
        {
            this._context = context;
        }

        public Town Add(string townName, string countryName)
        {
            Town town = new Town()
            {
                Country = countryName,
                Name = townName
            };

            this._context.SaveChanges();

            return town;
        }

        public TModel ById<TModel>(int id) => By<TModel>(t => t.Id == id).SingleOrDefault();

        public TModel ByName<TModel>(string name) => By<TModel>(t => t.Name == name).SingleOrDefault();

        public bool Exists(int id) => ById<Town>(id) != null;

        public bool Exists(string name) => ByName<Town>(name) != null;

        private IEnumerable<TModel> By<TModel>(Func<Town, bool> predicate)
            => this._context.Towns.Where(predicate).AsQueryable().ProjectTo<TModel>();
    }
}
