using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Data.Migrations
{
    public partial class IndividualFillOutDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<int>(
                name: "CrewId",
                table: "Individuals",
                nullable: true);


            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Individuals",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkPlaceId",
                table: "Individuals",
                nullable: true);

            migrationBuilder.CreateTable(
              name: "Crews",
              columns: table => new
              {
                  Id = table.Column<int>(nullable: false)
                      .Annotation("Autoincrement", true),
                  Name = table.Column<string>(nullable: true)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Crews", x => x.Id);
              });

            migrationBuilder.CreateTable(
                name: "WorkPlaces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlaces", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Individuals_CrewId",
                table: "Individuals",
                column: "CrewId");

            migrationBuilder.CreateIndex(
                name: "IX_Individuals_DepartmentId",
                table: "Individuals",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Individuals_WorkPlaceId",
                table: "Individuals",
                column: "WorkPlaceId");


        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

          migrationBuilder.DropColumn(
             name: "CrewId",
             table: "Individuals");


          migrationBuilder.DropColumn(
             name: "DepartmentId",
             table: "Individuals");


          migrationBuilder.DropColumn(
             name: "WorkPlaceId",
             table: "Individuals");

          migrationBuilder.DropTable(
              name: "Crews");

          migrationBuilder.DropTable(
              name: "Departments");

          migrationBuilder.DropTable(
              name: "WorkPlaces");

          migrationBuilder.DropIndex(
              name: "IX_Individuals_CrewId",
              table: "Individuals");

          migrationBuilder.DropIndex(
              name: "IX_Individuals_DepartmentId",
              table: "Individuals");

          migrationBuilder.DropIndex(
              name: "IX_Individuals_WorkPlaceId",
              table: "Individuals");
        }
    }
}
