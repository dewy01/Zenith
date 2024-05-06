using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class gprojects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "GroupProjectTasks");

            migrationBuilder.RenameColumn(
                name: "Deadline",
                table: "GroupProjectTasks",
                newName: "EditTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EditTime",
                table: "GroupProjectTasks",
                newName: "Deadline");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "GroupProjectTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
