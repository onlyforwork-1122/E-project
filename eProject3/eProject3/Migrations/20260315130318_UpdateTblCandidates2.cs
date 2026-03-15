using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTblCandidates2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "gender",
                table: "tbl_Candidates",
                newName: "Gender");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "tbl_Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "tbl_Candidates");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "tbl_Candidates",
                newName: "gender");
        }
    }
}
