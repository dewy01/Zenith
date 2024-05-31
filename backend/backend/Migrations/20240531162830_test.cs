using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
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

            migrationBuilder.DropIndex(
                name: "IX_Notifications_CalendarEventID",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_GroupProjectID",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ProjectID",
                table: "Notifications");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_NotificationID",
                table: "Projects",
                column: "NotificationID",
                unique: true,
                filter: "[NotificationID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjects_NotificationID",
                table: "GroupProjects",
                column: "NotificationID",
                unique: true,
                filter: "[NotificationID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_NotificationID",
                table: "CalendarEvents",
                column: "NotificationID",
                unique: true,
                filter: "[NotificationID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarEvents_Notifications_NotificationID",
                table: "CalendarEvents",
                column: "NotificationID",
                principalTable: "Notifications",
                principalColumn: "NotificationID");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupProjects_Notifications_NotificationID",
                table: "GroupProjects",
                column: "NotificationID",
                principalTable: "Notifications",
                principalColumn: "NotificationID");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Notifications_NotificationID",
                table: "Projects",
                column: "NotificationID",
                principalTable: "Notifications",
                principalColumn: "NotificationID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarEvents_Notifications_NotificationID",
                table: "CalendarEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupProjects_Notifications_NotificationID",
                table: "GroupProjects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Notifications_NotificationID",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_NotificationID",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_GroupProjects_NotificationID",
                table: "GroupProjects");

            migrationBuilder.DropIndex(
                name: "IX_CalendarEvents_NotificationID",
                table: "CalendarEvents");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CalendarEventID",
                table: "Notifications",
                column: "CalendarEventID",
                unique: true,
                filter: "[CalendarEventID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_GroupProjectID",
                table: "Notifications",
                column: "GroupProjectID",
                unique: true,
                filter: "[GroupProjectID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ProjectID",
                table: "Notifications",
                column: "ProjectID",
                unique: true,
                filter: "[ProjectID] IS NOT NULL");

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
    }
}
