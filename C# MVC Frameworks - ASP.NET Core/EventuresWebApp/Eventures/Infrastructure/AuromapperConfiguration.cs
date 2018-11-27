using AutoMapper;
using Eventures.Models;
using Eventures.ViewModels;

namespace Eventures.Infrastructure
{
    public class AuromapperConfiguration : Profile
    {
        public AuromapperConfiguration()
        {
            this.CreateMap<DoRegisterViewModel, EventuresUser>();
            this.CreateMap<CreateEventViewModel, Event>();
        }  
    }
}
