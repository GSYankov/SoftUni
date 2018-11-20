using CSCoreLogging.LogProvider;
using Eventures.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Filters
{
    public class LoggerResourceFilter : IResourceFilter
    {
        private readonly ILogger<HomeController> logger;

        public LoggerResourceFilter(ILogger<HomeController> logger)
        {
            this.logger = logger;
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {

            logger.LogDebug((int)LoggingEvents.CONTROLLER_ACCESSED, "Show all events.");
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            logger.LogInformation($"LOGGER!!!{context.Result.GetType().Name}");
        }
    }
}
