using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class hh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_Candidates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Candidates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_CandidateDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CandidateId = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CandidateDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_CandidateDetails_tbl_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "tbl_Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_CandidateEducations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CandidateId = table.Column<int>(type: "int", nullable: false),
                    Degree = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Institute = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CandidateEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_CandidateEducations_tbl_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "tbl_Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_CandidateResume",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CandidateId = table.Column<int>(type: "int", nullable: false),
                    ResumeFile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CandidateResume", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_CandidateResume_tbl_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "tbl_Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_CandidateDetails_CandidateId",
                table: "tbl_CandidateDetails",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_CandidateEducations_CandidateId",
                table: "tbl_CandidateEducations",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_CandidateResume_CandidateId",
                table: "tbl_CandidateResume",
                column: "CandidateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_CandidateDetails");

            migrationBuilder.DropTable(
                name: "tbl_CandidateEducations");

            migrationBuilder.DropTable(
                name: "tbl_CandidateResume");

            migrationBuilder.DropTable(
                name: "tbl_Candidates");
        }
    }
}
