using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebApplication.Models
{
  public class Individual
  {
      public int Id { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public decimal WeightKgs {get;set; }

      public string Tribe { get; set; }
      public string Clan { get; set; }
      public string Village { get; set; }

      public Organisation Organisation { get; set; }
  }

  public class Appointment
  {
    public int Id { get;set; }
    public Individual Individual { get; set; }
    public Department Department { get; set; }
    public Position Position { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
  }

  public class Organisation
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }

  public class Department
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }

  public class Position
  {
    public int Id { get;set; }
    public string Title { get; set; }
    public string Decsription { get; set; }
  }
}
