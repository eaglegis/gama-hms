using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication.Core;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public HomeController(ILogger<HomeController> logger){
            _logger = logger;
        }
        public IActionResult Index()
        {
            _logger.LogInformation(LoggingEvents.DEBUG_GENERAL, "Debug General comment ({0})", 99);
            _logger.LogWarning(LoggingEvents.DEBUG_GENERAL, "Debug General comment ({0})", 99);
            _logger.LogError(LoggingEvents.DEBUG_GENERAL, "Debug General comment ({0})", 99);
            _logger.LogCritical(LoggingEvents.DEBUG_GENERAL, "Debug General comment ({0})", 99);

            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
