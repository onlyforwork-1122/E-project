using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class tbl_LiquidFillingMachine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_LiquidFillingMachine",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AirPressure = table.Column<double>(type: "float", nullable: false),
                    AirVolume = table.Column<double>(type: "float", nullable: false),
                    FillingSpeedPerMinute = table.Column<int>(type: "int", nullable: false),
                    FillingRangeML = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_LiquidFillingMachine", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_LiquidFillingMachine");
        }
    }
}
