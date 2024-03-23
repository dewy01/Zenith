using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class groups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupProjectTaskAssignees");

            migrationBuilder.AddColumn<string>(
                name: "InviteToken",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TokenResetTime",
                table: "Groups",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "GroupProjectTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjectTasks_UserID",
                table: "GroupProjectTasks",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupProjectTasks_Users_UserID",
                table: "GroupProjectTasks",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupProjectTasks_Users_UserID",
                table: "GroupProjectTasks");

            migrationBuilder.DropIndex(
                name: "IX_GroupProjectTasks_UserID",
                table: "GroupProjectTasks");

            migrationBuilder.DropColumn(
                name: "InviteToken",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "TokenResetTime",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "GroupProjectTasks");

            migrationBuilder.CreateTable(
                name: "GroupProjectTaskAssignees",
                columns: table => new
                {
                    AssignmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupProjectTaskID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupProjectTaskAssignees", x => x.AssignmentID);
                    table.ForeignKey(
                        name: "FK_GroupProjectTaskAssignees_GroupProjectTasks_GroupProjectTaskID",
                        column: x => x.GroupProjectTaskID,
                        principalTable: "GroupProjectTasks",
                        principalColumn: "GroupProjectTaskID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupProjectTaskAssignees_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjectTaskAssignees_GroupProjectTaskID",
                table: "GroupProjectTaskAssignees",
                column: "GroupProjectTaskID");

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjectTaskAssignees_UserID",
                table: "GroupProjectTaskAssignees",
                column: "UserID");
        }
    }
}
