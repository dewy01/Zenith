using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class nullablenotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Projects_NotificationID",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_GroupProjects_NotificationID",
                table: "GroupProjects");

            migrationBuilder.DropIndex(
                name: "IX_CalendarEvents_NotificationID",
                table: "CalendarEvents");

            migrationBuilder.AlterColumn<int>(
                name: "NotificationID",
                table: "Projects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "NotificationID",
                table: "GroupProjects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "NotificationID",
                table: "CalendarEvents",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Projects_NotificationID",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_GroupProjects_NotificationID",
                table: "GroupProjects");

            migrationBuilder.DropIndex(
                name: "IX_CalendarEvents_NotificationID",
                table: "CalendarEvents");

            migrationBuilder.AlterColumn<int>(
                name: "NotificationID",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NotificationID",
                table: "GroupProjects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NotificationID",
                table: "CalendarEvents",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_NotificationID",
                table: "Projects",
                column: "NotificationID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjects_NotificationID",
                table: "GroupProjects",
                column: "NotificationID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_NotificationID",
                table: "CalendarEvents",
                column: "NotificationID",
                unique: true);
        }
    }
}
