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

    public class DepartmentController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _context;

        public DepartmentController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET api/department
        [HttpGet]
        public IEnumerable<Department> Index()
        {
            _logger.LogDebug(LoggingEvents.LIST_ITEMS, "Department Index");
            return _context.Departments.ToList();
        }

        // GET api/department
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "Department Get ({0})", id);

            Department department = _context.Departments.SingleOrDefault(I => I.Id == id);

            if(department == null){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "Department not found ({0})", id);
                return new NotFoundResult();
            }

            return Json(department);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Department department)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "Department Insert");

            if(department == null){
                _logger.LogWarning(LoggingEvents.INSERT_ITEM_INVALID, "Invalid Department object");
                return new BadRequestResult();
            }

            _context.Departments.Add(department);
            _context.SaveChanges();

            return Json(department);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Department department)
        {
            _logger.LogDebug(LoggingEvents.UPDATE_ITEM, "Department Update ({0})", id);

            if(_context.Departments.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.UPDATE_ITEM_NOTFOUND, "Department not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Departments.Update(department);
            _context.SaveChanges();

            return new OkResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "Department Delete ({0})", id);

            Department department = _context.Departments.SingleOrDefault(I => I.Id == id);

            if(department == null){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "Department not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Departments.Remove(department);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
