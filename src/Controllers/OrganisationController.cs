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

    public class OrganisationController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _context;

        public OrganisationController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET api/organisation
        [HttpGet]
        public IEnumerable<Organisation> Index()
        {
            _logger.LogDebug(LoggingEvents.LIST_ITEMS, "Organisation Index");
            return _context.Organisations.ToList();
        }

        // GET api/organisation
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "Organisation Get ({0})", id);

            Organisation organisation = _context.Organisations.SingleOrDefault(I => I.Id == id);

            if(organisation == null){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "Organisation not found ({0})", id);
                return new NotFoundResult();
            }

            return Json(organisation);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Organisation organisation)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "Organisation Insert");

            if(organisation == null){
                _logger.LogWarning(LoggingEvents.INSERT_ITEM_INVALID, "Invalid Organisation object");
                return new BadRequestResult();
            }

            _context.Organisations.Add(organisation);
            _context.SaveChanges();

            return Json(organisation);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Organisation organisation)
        {
            _logger.LogDebug(LoggingEvents.UPDATE_ITEM, "Organisation Update ({0})", id);

            if(_context.Organisations.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.UPDATE_ITEM_NOTFOUND, "Organisation not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Organisations.Update(organisation);
            _context.SaveChanges();

            return new OkResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "Organisation Delete ({0})", id);

            Organisation organisation = _context.Organisations.SingleOrDefault(I => I.Id == id);

            if(organisation == null){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "Organisation not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Organisations.Remove(organisation);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
