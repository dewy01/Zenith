using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class noaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_CalendarEvents_CalendarEventID",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_GroupProjects_GroupProjectID",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Projects_ProjectID",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_CalendarEvents_CalendarEventID",
                table: "Notifications",
                column: "CalendarEventID",
                principalTable: "CalendarEvents",
                principalColumn: "EventID");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_GroupProjects_GroupProjectID",
                table: "Notifications",
                column: "GroupProjectID",
                principalTable: "GroupProjects",
                principalColumn: "GroupProjectID");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Projects_ProjectID",
                table: "Notifications",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ProjectID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_CalendarEvents_CalendarEventID",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_GroupProjects_GroupProjectID",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Projects_ProjectID",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_CalendarEvents_CalendarEventID",
                table: "Notifications",
                column: "CalendarEventID",
                principalTable: "CalendarEvents",
                principalColumn: "EventID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_GroupProjects_GroupProjectID",
                table: "Notifications",
                column: "GroupProjectID",
                principalTable: "GroupProjects",
                principalColumn: "GroupProjectID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Projects_ProjectID",
                table: "Notifications",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ProjectID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
