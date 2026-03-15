using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_CandidateEducations_tbl_Candidates_CandidateId",
                table: "tbl_CandidateEducations");

            migrationBuilder.DropIndex(
                name: "IX_tbl_CandidateEducations_CandidateId",
                table: "tbl_CandidateEducations");

            migrationBuilder.DropColumn(
                name: "Institute",
                table: "tbl_CandidateEducations");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "tbl_CandidateEducations",
                newName: "Institution");

            migrationBuilder.AlterColumn<string>(
                name: "Degree",
                table: "tbl_CandidateEducations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<int>(
                name: "EndYear",
                table: "tbl_CandidateEducations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Grade",
                table: "tbl_CandidateEducations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "StartYear",
                table: "tbl_CandidateEducations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndYear",
                table: "tbl_CandidateEducations");

            migrationBuilder.DropColumn(
                name: "Grade",
                table: "tbl_CandidateEducations");

            migrationBuilder.DropColumn(
                name: "StartYear",
                table: "tbl_CandidateEducations");

            migrationBuilder.RenameColumn(
                name: "Institution",
                table: "tbl_CandidateEducations",
                newName: "Year");

            migrationBuilder.AlterColumn<string>(
                name: "Degree",
                table: "tbl_CandidateEducations",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Institute",
                table: "tbl_CandidateEducations",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_CandidateEducations_CandidateId",
                table: "tbl_CandidateEducations",
                column: "CandidateId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_CandidateEducations_tbl_Candidates_CandidateId",
                table: "tbl_CandidateEducations",
                column: "CandidateId",
                principalTable: "tbl_Candidates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
