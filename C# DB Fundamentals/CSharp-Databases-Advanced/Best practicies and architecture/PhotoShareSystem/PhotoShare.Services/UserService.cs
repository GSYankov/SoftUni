using AutoMapper.QueryableExtensions;
using PhotoShare.Data;
using PhotoShare.Models;
using PhotoShare.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PhotoShare.Services
{
    public class UserService : IUserService
    {
        private PhotoShareContext _context;
        public UserService(PhotoShareContext context)
        {
            this._context = context;
        }
        public Friendship AcceptFriend(int userId, int friendId)
        {
            var friendship = new Friendship
            {
                UserId = userId,
                FriendId = friendId
            };

            this._context.Friendships.Add(friendship);

            this._context.SaveChanges();

            return friendship;
        }

        public Friendship AddFriend(int userId, int friendId)
        {
            var friendship = new Friendship
            {
                UserId = userId,
                FriendId = friendId
            };

            this._context.Friendships.Add(friendship);

            this._context.SaveChanges();

            return friendship;
        }

        public TModel ById<TModel>(int id) => By<TModel>(x => x.Id == id).SingleOrDefault();

        public TModel ByUsername<TModel>(string username) => By<TModel>(x => x.Username == username).SingleOrDefault();

        public void ChangePassword(int userId, string password)
        {
            User user = ById<User>(userId);

            user.Password = password;

            this._context.SaveChanges();
        }

        public void Delete(string username)
        {
            User user = ByUsername<User>(username);

            this._context.Users.Remove(user);
        }

        public bool Exists(int id) => ById<User>(id) != null;

        public bool Exists(string name) => ByUsername<User>(name) != null;

        public User Register(string username, string password, string email)
        {
            User user = new User
            {
                Username = username,
                Password = password,
                Email = email
            };

            this._context.Users.Add(user);

            this._context.SaveChanges();

            return user;
        }

        public void SetBornTown(int userId, int townId)
        {
            User user = ById<User>(userId);

            user.BornTownId = townId;

            this._context.SaveChanges();
        }

        public void SetCurrentTown(int userId, int townId)
        {
            User user = ById<User>(userId);

            user.CurrentTownId = townId;

            this._context.SaveChanges();
        }

        private IEnumerable<TModel> By<TModel>(Func<User, bool> predicate)
            => this._context.Users.Where(predicate).AsQueryable().ProjectTo<TModel>();
    }
}