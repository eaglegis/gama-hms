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

    public class CrewController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _context;

        public CrewController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET api/crew
        [HttpGet]
        public IEnumerable<Crew> Index()
        {
            _logger.LogDebug(LoggingEvents.LIST_ITEMS, "Crew Index");
            return _context.Crews.ToList();
        }

        // GET api/crew
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "Crew Get ({0})", id);

            Crew crew = _context.Crews.SingleOrDefault(I => I.Id == id);

            if(crew == null){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "Crew not found ({0})", id);
                return new NotFoundResult();
            }

            return Json(crew);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Crew crew)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "Crew Insert");

            if(crew == null){
                _logger.LogWarning(LoggingEvents.INSERT_ITEM_INVALID, "Invalid Crew object");
                return new BadRequestResult();
            }

            _context.Crews.Add(crew);
            _context.SaveChanges();

            return Json(crew);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Crew crew)
        {
            _logger.LogDebug(LoggingEvents.UPDATE_ITEM, "Crew Update ({0})", id);

            if(_context.Crews.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.UPDATE_ITEM_NOTFOUND, "Crew not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Crews.Update(crew);
            _context.SaveChanges();

            return new OkResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "Crew Delete ({0})", id);

            Crew crew = _context.Crews.SingleOrDefault(I => I.Id == id);

            if(crew == null){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "Crew not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Crews.Remove(crew);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
