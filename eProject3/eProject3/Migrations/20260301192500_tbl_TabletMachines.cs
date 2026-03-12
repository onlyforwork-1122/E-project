using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eProject3.Migrations
{
    /// <inheritdoc />
    public partial class tbl_TabletMachines : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_TabletMachine",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Dies = table.Column<int>(type: "int", nullable: false),
                    MaxPressure = table.Column<double>(type: "float", nullable: false),
                    MaxDiameterMM = table.Column<double>(type: "float", nullable: false),
                    MaxDepthFillMM = table.Column<double>(type: "float", nullable: false),
                    ProductionCapacity = table.Column<int>(type: "int", nullable: false),
                    MachineSize = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    NetWeightKG = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TabletMachine", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_TabletMachine");
        }
    }
}
