using AutoMapper;
using CSCoreLogging.LogProvider;
using Eventures.Data;
using Eventures.Models;
using Eventures.Services.Contracts;
using Eventures.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;
using X.PagedList;

namespace Eventures.Controllers
{
    [Authorize]
    public class EventsController : Controller
    {
        private readonly ILogger<EventsController> _logger;

        private readonly UserManager<EventuresUser> userManager;
        private readonly IEventuresEventService eventService;
        private readonly IEventuresOrdersService ordersService;
        private readonly IMapper mapper;

        public EventsController(
            ILogger<EventsController> logger,
            UserManager<EventuresUser> userManager,
            IEventuresEventService eventService,
            IEventuresOrdersService ordersService,
            IMapper mapper)
        {
            this._logger = logger;
            this.userManager = userManager;
            this.eventService = eventService;
            this.ordersService = ordersService;
            this.mapper = mapper;
        }

        public async Task<IActionResult> AllEvents(MyErrorViewModel myError, int? page)
        {
            if (this.User.IsInRole("Admin"))
            {
                var allEvents = this.eventService.GetAllEvents().ToList();

                var adminModel = new AllEventsViewModel
                {
                    AllEvents = allEvents
                };

                _logger.LogDebug((int)LoggingEvents.CONTROLLER_ACCESSED, "Show all events.");

                return View("AllEventsAdmin", adminModel);
            }

            var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);
            var events = this.eventService.GetAllEvents().Select(o => new OrderViewModel
            {
                Customer = user,
                EventId = o.Id.ToString(),
                Name = o.Name,
                Start = o.Start,
                End = o.End,
                Tickets = 0,
                TicketsLeft = o.TicketsLeft
            }).ToList();

            var nextPage = page ?? 1;
            var recordsPerPage = 3;
            var pagedViewModels = events.ToPagedList(nextPage, recordsPerPage);

            var model = new OrdersViewModel
            {
                Orders = pagedViewModels,
                OrderError = myError.ErrorMessage
            };

            _logger.LogDebug((int)LoggingEvents.CONTROLLER_ACCESSED, "Show all events.");

            ViewData["CurrentPage"] = page ?? 1;
            ViewData["RecordsPerPage"] = recordsPerPage;
            ViewData["MyErrorOcurred"] = myError.ErrorMessage;

            return View(model);
        }


        public async Task<IActionResult> MyEvents()
        {
            var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);
            var events = this.ordersService.GetOrdersByUser(user).Select(o => new EventViewModel(o.TicketCount)
            {
                Name = o.Event.Name,
                Start = o.Event.Start,
                End = o.Event.End,
                Place = o.Event.Place,
                Tickets = o.TicketCount,
                Price = o.Event.PricePerTicket * o.TicketCount
            }).ToList();
            var model = new EventsViewModel
            {
                AllEvents = events
            };

            return View(model);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        [AutoValidateAntiforgeryToken]
        [HttpPost]
        public IActionResult Create(CreateEventViewModel model)
        {
            if (ModelState.IsValid)
            {
                var newEvent = mapper.Map<Eventures.Models.Event>(model);
                this.eventService.AddEvent(newEvent);
            }

            return RedirectToAction("AllEvents", "Events");
        }
    }
}
