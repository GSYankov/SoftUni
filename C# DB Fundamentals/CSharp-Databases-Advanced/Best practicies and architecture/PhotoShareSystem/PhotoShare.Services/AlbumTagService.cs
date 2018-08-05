using PhotoShare.Data;
using PhotoShare.Models;
using PhotoShare.Services.Contracts;

namespace PhotoShare.Services
{
    public class AlbumTagService : IAlbumTagService
    {
        private PhotoShareContext _context;

        public AlbumTagService(PhotoShareContext context)
        {
            this._context = context;
        }
        public AlbumTag AddTagTo(int albumId, int tagId)
        {
            var albumTag = new AlbumTag()
            {
                AlbumId = albumId,
                TagId = tagId
            };

            this._context.AlbumTags.Add(albumTag);

            this._context.SaveChanges();

            return albumTag;
        }
    }
}
