using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCandidateTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "tbl_Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DateOfBirth",
                table: "tbl_Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "tbl_Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "tbl_Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StreetAddress",
                table: "tbl_Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "gender",
                table: "tbl_Candidates",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "tbl_Candidates");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "tbl_Candidates");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "tbl_Candidates");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "tbl_Candidates");

            migrationBuilder.DropColumn(
                name: "StreetAddress",
                table: "tbl_Candidates");

            migrationBuilder.DropColumn(
                name: "gender",
                table: "tbl_Candidates");
        }
    }
}
