using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]

    public class IndividualController : Controller
    {
      // GET api/individual
      [HttpGet]
      public IEnumerable<string> Index()
      {
          return new string[] { "individual 1", "individual 2" };
      }

      // GET api/individual
      [HttpGet]
      public IEnumerable<string> Get(int ID)
      {
          return new string[] { "individual 1", "individual 2" };
      }

    }
}
