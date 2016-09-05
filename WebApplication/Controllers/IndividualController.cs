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

    public class IndividualController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _context;

        public IndividualController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET api/individual
        [HttpGet]
        public IEnumerable<Individual> Index()
        {
            _logger.LogDebug(LoggingEvents.LIST_ITEMS, "Individual Index");
            return _context.Individuals.ToList();
        }

        // GET api/individual
        [HttpGet("{id}")]
        public Individual Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "Individual Get ({0})", id);

            if(_context.Individuals.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "Individual not found ({0})", id);
            }

            return _context.Individuals.First(I => I.Id == id);
        }


        // POST api/values
        [HttpPost]
        public void Post([FromBody]Individual individual)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "Individual Insert");
            _context.Individuals.Add(individual);
            _context.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Individual individual)
        {
            _logger.LogDebug(LoggingEvents.UPDATE_ITEM, "Individual Update ({0})", id);

            if(_context.Individuals.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.UPDATE_ITEM_NOTFOUND, "Individual not found ({0})", id);
            }

            _context.Individuals.Update(individual);
            _context.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "Individual Delete ({0})", id);

            if(_context.Individuals.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "Individual not found ({0})", id);
            }

            Individual individual = _context.Individuals.First(i => i.Id == id);
            _context.Individuals.Remove(individual);
            _context.SaveChanges();
        }
    }
}
