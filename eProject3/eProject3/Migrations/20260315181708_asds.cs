using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class asds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_CandidateEducations_tbl_Candidates_CandidateId",
                table: "tbl_CandidateEducations");

            migrationBuilder.DropIndex(
                name: "IX_tbl_CandidateEducations_CandidateId",
                table: "tbl_CandidateEducations");
        }
    }
}
