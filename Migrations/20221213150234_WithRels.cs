using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetReactBooksApp.Migrations
{
    /// <inheritdoc />
    public partial class WithRels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "books");

            migrationBuilder.RenameColumn(
                name: "book_id",
                table: "books",
                newName: "Book_id");

            migrationBuilder.RenameColumn(
                name: "author_id",
                table: "books",
                newName: "AuthorId");

            migrationBuilder.RenameColumn(
                name: "author_id",
                table: "authors",
                newName: "Author_id");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "books",
                type: "integer",
                nullable: false,
                defaultValueSql: "date_part('year', now())");

            migrationBuilder.CreateIndex(
                name: "IX_books_AuthorId",
                table: "books",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_books_authors_AuthorId",
                table: "books",
                column: "AuthorId",
                principalTable: "authors",
                principalColumn: "Author_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_books_authors_AuthorId",
                table: "books");

            migrationBuilder.DropIndex(
                name: "IX_books_AuthorId",
                table: "books");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "books");

            migrationBuilder.RenameColumn(
                name: "Book_id",
                table: "books",
                newName: "book_id");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "books",
                newName: "author_id");

            migrationBuilder.RenameColumn(
                name: "Author_id",
                table: "authors",
                newName: "author_id");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "books",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()");
        }
    }
}
