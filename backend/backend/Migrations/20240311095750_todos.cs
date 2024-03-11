using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class todos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTodo_Users_UserID",
                table: "ProjectTodo");

            migrationBuilder.DropForeignKey(
                name: "FK_Todo_ProjectTodo_ProjectTodoID",
                table: "Todo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Todo",
                table: "Todo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTodo",
                table: "ProjectTodo");

            migrationBuilder.RenameTable(
                name: "Todo",
                newName: "Todos");

            migrationBuilder.RenameTable(
                name: "ProjectTodo",
                newName: "ProjectTodos");

            migrationBuilder.RenameIndex(
                name: "IX_Todo_ProjectTodoID",
                table: "Todos",
                newName: "IX_Todos_ProjectTodoID");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTodo_UserID",
                table: "ProjectTodos",
                newName: "IX_ProjectTodos_UserID");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "ProjectTodos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Todos",
                table: "Todos",
                column: "TodoID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTodos",
                table: "ProjectTodos",
                column: "ProjectTodoID");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTodos_Users_UserID",
                table: "ProjectTodos",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_ProjectTodos_ProjectTodoID",
                table: "Todos",
                column: "ProjectTodoID",
                principalTable: "ProjectTodos",
                principalColumn: "ProjectTodoID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTodos_Users_UserID",
                table: "ProjectTodos");

            migrationBuilder.DropForeignKey(
                name: "FK_Todos_ProjectTodos_ProjectTodoID",
                table: "Todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Todos",
                table: "Todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTodos",
                table: "ProjectTodos");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "ProjectTodos");

            migrationBuilder.RenameTable(
                name: "Todos",
                newName: "Todo");

            migrationBuilder.RenameTable(
                name: "ProjectTodos",
                newName: "ProjectTodo");

            migrationBuilder.RenameIndex(
                name: "IX_Todos_ProjectTodoID",
                table: "Todo",
                newName: "IX_Todo_ProjectTodoID");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTodos_UserID",
                table: "ProjectTodo",
                newName: "IX_ProjectTodo_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Todo",
                table: "Todo",
                column: "TodoID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTodo",
                table: "ProjectTodo",
                column: "ProjectTodoID");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTodo_Users_UserID",
                table: "ProjectTodo",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Todo_ProjectTodo_ProjectTodoID",
                table: "Todo",
                column: "ProjectTodoID",
                principalTable: "ProjectTodo",
                principalColumn: "ProjectTodoID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
