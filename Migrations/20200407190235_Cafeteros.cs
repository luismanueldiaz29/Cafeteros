using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cafeteros.Migrations
{
    public partial class Cafeteros : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Empleado",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombres = table.Column<string>(nullable: true),
                    Apellidos = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empleado", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Productor",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    Nombre = table.Column<string>(nullable: true),
                    CodigoCafetero = table.Column<string>(nullable: true),
                    NombrePredio = table.Column<string>(nullable: true),
                    CodigoSica = table.Column<string>(nullable: true),
                    Municipio = table.Column<string>(nullable: true),
                    Vereda = table.Column<string>(nullable: true),
                    NumeroTelefono = table.Column<string>(nullable: true),
                    AfiliacionSalud = table.Column<string>(nullable: true),
                    ActvidadesDedican = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productor", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspectoEconomico",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenenciaTierra = table.Column<string>(nullable: true),
                    Legalidad = table.Column<string>(nullable: true),
                    ProductorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspectoEconomico", x => x.id);
                    table.ForeignKey(
                        name: "FK_AspectoEconomico_Productor_ProductorId",
                        column: x => x.ProductorId,
                        principalTable: "Productor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Familiar",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    NumeroDocumento = table.Column<string>(nullable: true),
                    FechaNacimiento = table.Column<string>(nullable: true),
                    Parentesco = table.Column<string>(nullable: true),
                    TipoPoblacion = table.Column<string>(nullable: true),
                    AfiliacionSalud = table.Column<string>(nullable: true),
                    NivelEducativo = table.Column<string>(nullable: true),
                    ProductorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Familiar", x => x.id);
                    table.ForeignKey(
                        name: "FK_Familiar_Productor_ProductorId",
                        column: x => x.ProductorId,
                        principalTable: "Productor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VisitaPromotoria",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaVisita = table.Column<string>(nullable: true),
                    HoraVisita = table.Column<string>(nullable: true),
                    FechaProxVista = table.Column<string>(nullable: true),
                    ObjetivoVisita = table.Column<string>(nullable: true),
                    SituacionEncontrada = table.Column<string>(nullable: true),
                    IntercambioSaberes = table.Column<string>(nullable: true),
                    ProductorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitaPromotoria", x => x.id);
                    table.ForeignKey(
                        name: "FK_VisitaPromotoria_Productor_ProductorId",
                        column: x => x.ProductorId,
                        principalTable: "Productor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Habitabilidad",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoVivienda = table.Column<string>(nullable: true),
                    NumeroHabitaciones = table.Column<int>(nullable: false),
                    MaterialPredominante = table.Column<string>(nullable: true),
                    MaterialTecho = table.Column<string>(nullable: true),
                    MaterialCosinar = table.Column<string>(nullable: true),
                    EnergiaCosinar = table.Column<string>(nullable: true),
                    ServicioSanitario = table.Column<string>(nullable: true),
                    TipoAlumbrado = table.Column<string>(nullable: true),
                    AspectoEconomicoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Habitabilidad", x => x.id);
                    table.ForeignKey(
                        name: "FK_Habitabilidad_AspectoEconomico_AspectoEconomicoId",
                        column: x => x.AspectoEconomicoId,
                        principalTable: "AspectoEconomico",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaticipacionComunitaria",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AsistenteAsamblea = table.Column<string>(nullable: true),
                    CargoAsamblea = table.Column<string>(nullable: true),
                    AistenteTrabajos = table.Column<string>(nullable: true),
                    CargoTrabajo = table.Column<string>(nullable: true),
                    OrganizacionAparte = table.Column<string>(nullable: true),
                    CualOrganizacion = table.Column<string>(nullable: true),
                    AspectoEconomicoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaticipacionComunitaria", x => x.id);
                    table.ForeignKey(
                        name: "FK_PaticipacionComunitaria_AspectoEconomico_AspectoEconomicoId",
                        column: x => x.AspectoEconomicoId,
                        principalTable: "AspectoEconomico",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboresProgramada",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Actividad = table.Column<string>(nullable: true),
                    Fecha = table.Column<string>(nullable: true),
                    VisitaPromotoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboresProgramada", x => x.id);
                    table.ForeignKey(
                        name: "FK_LaboresProgramada_VisitaPromotoria_VisitaPromotoriaId",
                        column: x => x.VisitaPromotoriaId,
                        principalTable: "VisitaPromotoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboresRealizada",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Actividad = table.Column<string>(nullable: true),
                    Fecha = table.Column<string>(nullable: true),
                    VisitaPromotoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboresRealizada", x => x.id);
                    table.ForeignKey(
                        name: "FK_LaboresRealizada_VisitaPromotoria_VisitaPromotoriaId",
                        column: x => x.VisitaPromotoriaId,
                        principalTable: "VisitaPromotoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspectoEconomico_ProductorId",
                table: "AspectoEconomico",
                column: "ProductorId",
                unique: true,
                filter: "[ProductorId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Familiar_ProductorId",
                table: "Familiar",
                column: "ProductorId");

            migrationBuilder.CreateIndex(
                name: "IX_Habitabilidad_AspectoEconomicoId",
                table: "Habitabilidad",
                column: "AspectoEconomicoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LaboresProgramada_VisitaPromotoriaId",
                table: "LaboresProgramada",
                column: "VisitaPromotoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboresRealizada_VisitaPromotoriaId",
                table: "LaboresRealizada",
                column: "VisitaPromotoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_PaticipacionComunitaria_AspectoEconomicoId",
                table: "PaticipacionComunitaria",
                column: "AspectoEconomicoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VisitaPromotoria_ProductorId",
                table: "VisitaPromotoria",
                column: "ProductorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Empleado");

            migrationBuilder.DropTable(
                name: "Familiar");

            migrationBuilder.DropTable(
                name: "Habitabilidad");

            migrationBuilder.DropTable(
                name: "LaboresProgramada");

            migrationBuilder.DropTable(
                name: "LaboresRealizada");

            migrationBuilder.DropTable(
                name: "PaticipacionComunitaria");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "VisitaPromotoria");

            migrationBuilder.DropTable(
                name: "AspectoEconomico");

            migrationBuilder.DropTable(
                name: "Productor");
        }
    }
}
