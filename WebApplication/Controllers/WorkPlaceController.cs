using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;
using WebApplication.Data;
using Microsoft.Extensions.Logging;
using WebApplication.Core;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]

    public class WorkPlaceController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _context;

        public WorkPlaceController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET api/workPlace
        [HttpGet]
        public IEnumerable<WorkPlace> Index()
        {
            _logger.LogDebug(LoggingEvents.LIST_ITEMS, "WorkPlace Index");
            return _context.WorkPlaces.ToList();
        }

        // GET api/workPlace
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "WorkPlace Get ({0})", id);

            WorkPlace workPlace = _context.WorkPlaces.SingleOrDefault(I => I.Id == id);

            if(workPlace == null){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "WorkPlace not found ({0})", id);
                return new NotFoundResult();
            }

            return Json(workPlace);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]WorkPlace workPlace)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "WorkPlace Insert");

            if(workPlace == null){
                _logger.LogWarning(LoggingEvents.INSERT_ITEM_INVALID, "Invalid WorkPlace object");
                return new BadRequestResult();
            }

            _context.WorkPlaces.Add(workPlace);
            _context.SaveChanges();

            return Json(workPlace);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]WorkPlace workPlace)
        {
            _logger.LogDebug(LoggingEvents.UPDATE_ITEM, "WorkPlace Update ({0})", id);

            if(_context.WorkPlaces.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.UPDATE_ITEM_NOTFOUND, "WorkPlace not found ({0})", id);
                return new NotFoundResult();
            }

            _context.WorkPlaces.Update(workPlace);
            _context.SaveChanges();

            return new OkResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "WorkPlace Delete ({0})", id);

            WorkPlace workPlace = _context.WorkPlaces.SingleOrDefault(I => I.Id == id);

            if(workPlace == null){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "WorkPlace not found ({0})", id);
                return new NotFoundResult();
            }

            _context.WorkPlaces.Remove(workPlace);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
