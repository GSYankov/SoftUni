using AutoMapper.QueryableExtensions;
using PhotoShare.Data;
using PhotoShare.Models;
using PhotoShare.Models.Enums;
using PhotoShare.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PhotoShare.Services
{
    public class AlbumService : IAlbumService
    {
        private PhotoShareContext _context;

        public AlbumService(PhotoShareContext context)
        {
            this._context = context;
        }
        public TModel ById<TModel>(int id) => By<TModel>(a => a.Id == id).SingleOrDefault();

        public TModel ByName<TModel>(string name) => By<TModel>(a => a.Name == name).SingleOrDefault();

        public Album Create(int userId, string albumTitle, string bgColor, string[] tags)
        {
            Color backgroundColor = Enum.Parse<Color>(bgColor, true);

            Album album = new Album()
            {
                Name = albumTitle,
                BackgroundColor = backgroundColor
            };

            this._context.Albums.Add(album);
            this._context.SaveChanges();

            AlbumRole albumRole = new AlbumRole()
            {
                Album = album,
                UserId = userId
            };

            this._context.AlbumRoles.Add(albumRole);
            this._context.SaveChanges();

            foreach (var tag in tags)
            {
                var currentIdTag = this._context.Tags.FirstOrDefault(t => t.Name == tag).Id;

                var albumTag = new AlbumTag()
                {
                    Album = album,
                    TagId = currentIdTag
                };

                this._context.AlbumTags.Add(albumTag);
            }

            this._context.SaveChanges();

            return album;
        }

        public bool Exists(int id) => ById<Album>(id) != null;

        public bool Exists(string name) => ByName<Album>(name) != null;

        private IEnumerable<TModel> By<TModel>(Func<Album, bool> predicate) =>
            this._context.Albums
                .Where(predicate)
                .AsQueryable()
                .ProjectTo<TModel>();
    }
}
