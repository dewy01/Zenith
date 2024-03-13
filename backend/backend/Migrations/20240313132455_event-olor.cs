using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class eventolor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reminder",
                table: "CalendarEvents");

            migrationBuilder.AddColumn<string>(
                name: "EventColor",
                table: "CalendarEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventColor",
                table: "CalendarEvents");

            migrationBuilder.AddColumn<bool>(
                name: "Reminder",
                table: "CalendarEvents",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
