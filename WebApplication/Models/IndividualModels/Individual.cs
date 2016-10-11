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
      public int EmployeeId { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public decimal WeightKgs {get;set; }
      public int ProfileImageId {get;set; }

      public string PlaceOfHire { get; set; }
      public string PositionTitle { get; set; }

      public bool FitToWork { get; set; }
      public bool PreEmploy { get; set; }
      public bool Certified { get; set; }

      public string Tribe { get; set; }
      public string Clan { get; set; }
      public string Village { get; set; }

      public int OrganisationId { get; set; }
      public Organisation Organisation { get; set; }

      public int WorkPlaceId { get; set; }
      public WorkPlace WorkPlace { get; set; }

      public int DepartmentId { get; set; }
      public Department Department { get; set; }

      public int CrewId { get; set; }
      public Crew Crew { get; set; }

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

  public class WorkPlace
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }

  public class Crew
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
