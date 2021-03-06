﻿namespace PhotoShare.Services
{
    using AutoMapper.QueryableExtensions;
    using Data;
    using Models;
    using Services.Contracts;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class TagService : ITagService
    {
        private PhotoShareContext _context;

        public TagService(PhotoShareContext context)
        {
            this._context = context;
        }
        public TModel ById<TModel>(int id) => By<TModel>(i => i.Id == id).SingleOrDefault();

        public TModel ByName<TModel>(string name) => By<TModel>(i => i.Name == name).SingleOrDefault();

        public bool Exists(int id) => ById<Tag>(id) != null;

        public bool Exists(string name) => ByName<Tag>(name) != null;

        public Tag AddTag(string name)
        {
            var tag = new Tag
            {
                Name = name
            };

            this._context.Tags.Add(tag);
            this._context.SaveChanges();

            return tag;
        }

        private IEnumerable<TModel> By<TModel>(Func<Tag, bool> predicate) 
            => this._context.Tags.Where(predicate).AsQueryable().ProjectTo<TModel>();
    }
}
