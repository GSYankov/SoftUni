using Eventures.Data;
using Eventures.Models;
using Eventures.Services;
using Eventures.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Eventures.Tests
{
    public class EventuresEventsServiceTests
    {
        private readonly EventuresDbContext context;
        private readonly IEventuresEventsService service;
        private readonly IServiceProvider provider;


        public EventuresEventsServiceTests()
        {
            var services = new ServiceCollection();
            services.AddDbContext<EventuresDbContext>(opt =>
                opt.UseInMemoryDatabase(Guid.NewGuid().ToString()));
            services.AddScoped<IEventuresEventsService, EventuresEventService>();

            this.provider = services.BuildServiceProvider();
            this.context = provider.GetService<EventuresDbContext>();
            this.service = provider.GetService<IEventuresEventsService>();
        }

        [Fact]
        public void All_WithExistingsData_ShouldReturnAllOfExistingData()
        {
            var eventModel = new Event(5);
            context.Events.Add(eventModel);
            context.SaveChanges();

            var result = service.GetAllEvents().ToList();

            // expect data
            result.ShouldNotBeEmpty();

            var entity = result[0];

            entity.ShouldBeSameAs(eventModel);
        }

        [Fact]
        public void FindById_ShouldReturnTheCorrect()
        {
            var eventModel1 = new Event(1);
            var eventModel2 = new Event(2);

            context.Events.Add(eventModel1);
            context.Events.Add(eventModel2);
            context.SaveChanges();

            var giudEventModel1 = context.Events.FirstOrDefault().Id.ToString();

            var result = service.FindById(giudEventModel1);

            result.ShouldBeSameAs(eventModel1);
        }

        [Fact]
        public void UponAddingOfEvent_TheDatabaseShouldBeUpdated()
        {
            var eventToAdd = new Event(5);

            context.Events.Add(eventToAdd);
            context.SaveChanges();

            var result = context.Events.FirstOrDefault();

            result.ShouldBeSameAs(eventToAdd);
        }

    }
}
