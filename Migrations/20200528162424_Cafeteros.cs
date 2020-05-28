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
                name: "MesaDirectiva",
                columns: table => new
                {
                    Correo = table.Column<string>(nullable: false),
                    Identificacion = table.Column<string>(nullable: true),
                    Contraseña = table.Column<string>(nullable: true),
                    Nombre = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MesaDirectiva", x => x.Correo);
                });

            migrationBuilder.CreateTable(
                name: "Tecnico",
                columns: table => new
                {
                    Correo = table.Column<string>(nullable: false),
                    Identificacion = table.Column<string>(nullable: true),
                    Contraseña = table.Column<string>(nullable: true),
                    Nombre = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tecnico", x => x.Correo);
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
                    FechaRegistro = table.Column<string>(nullable: true),
                    FechaAsociacion = table.Column<string>(nullable: true),
                    FechaNoAsociacion = table.Column<string>(nullable: true),
                    AfiliacionSalud = table.Column<string>(nullable: true),
                    ActvidadesDedican = table.Column<string>(nullable: true),
                    Estado = table.Column<int>(nullable: false),
                    TecnicoId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productor", x => x.id);
                    table.ForeignKey(
                        name: "FK_Productor_Tecnico_TecnicoId",
                        column: x => x.TecnicoId,
                        principalTable: "Tecnico",
                        principalColumn: "Correo",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AlmacenamientoAgua",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoAlmacenamiento = table.Column<string>(nullable: true),
                    Volumen = table.Column<string>(nullable: true),
                    NumeroUsuario = table.Column<int>(nullable: false),
                    EstudioAgua = table.Column<string>(nullable: true),
                    ExisteDesperdicio = table.Column<string>(nullable: true),
                    Mantenimiento = table.Column<string>(nullable: true),
                    ProductorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlmacenamientoAgua", x => x.id);
                    table.ForeignKey(
                        name: "FK_AlmacenamientoAgua_Productor_ProductorId",
                        column: x => x.ProductorId,
                        principalTable: "Productor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "DisponibilidadAgua",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fuente = table.Column<string>(nullable: true),
                    UsoDomestico = table.Column<bool>(nullable: false),
                    UsoAgricola = table.Column<bool>(nullable: false),
                    Disponibilidad = table.Column<string>(nullable: true),
                    ProductorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisponibilidadAgua", x => x.id);
                    table.ForeignKey(
                        name: "FK_DisponibilidadAgua_Productor_ProductorId",
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
                name: "VisitaAuditoria",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecibeVisita = table.Column<string>(nullable: true),
                    OportunidadMejora = table.Column<string>(nullable: true),
                    DecicionFinal = table.Column<string>(nullable: true),
                    FechaFinal = table.Column<string>(nullable: true),
                    ProductorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitaAuditoria", x => x.id);
                    table.ForeignKey(
                        name: "FK_VisitaAuditoria_Productor_ProductorId",
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
                    ProductorId = table.Column<string>(nullable: true),
                    TecnicoId = table.Column<string>(nullable: true)
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
                    table.ForeignKey(
                        name: "FK_VisitaPromotoria_Tecnico_TecnicoId",
                        column: x => x.TecnicoId,
                        principalTable: "Tecnico",
                        principalColumn: "Correo",
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
                name: "CB",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaCB1 = table.Column<string>(nullable: true),
                    JustificacionCB1 = table.Column<string>(nullable: true),
                    RespuestaCB2 = table.Column<string>(nullable: true),
                    JustificacionCB2 = table.Column<string>(nullable: true),
                    ComentarioCB = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CB", x => x.id);
                    table.ForeignKey(
                        name: "FK_CB_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CultivosPresentandos",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cultivo = table.Column<string>(nullable: true),
                    Area = table.Column<int>(nullable: false),
                    ProduccionObtenida = table.Column<string>(nullable: true),
                    ProduccionEstimada = table.Column<string>(nullable: true),
                    SustanciaNoPermitida = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CultivosPresentandos", x => x.id);
                    table.ForeignKey(
                        name: "FK_CultivosPresentandos_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EvaluacionCompromiso",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Codigo = table.Column<string>(nullable: true),
                    AccionCorrectiva = table.Column<string>(nullable: true),
                    Completado = table.Column<string>(nullable: true),
                    Razones = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvaluacionCompromiso", x => x.id);
                    table.ForeignKey(
                        name: "FK_EvaluacionCompromiso_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MA",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaCB1 = table.Column<string>(nullable: true),
                    JustificacionCB1 = table.Column<string>(nullable: true),
                    RespuestaMA2 = table.Column<string>(nullable: true),
                    JustificacionMA2 = table.Column<string>(nullable: true),
                    RespuestaMA3 = table.Column<string>(nullable: true),
                    JustificacionMA3 = table.Column<string>(nullable: true),
                    RespuestaMA4 = table.Column<string>(nullable: true),
                    JustificacionMA4 = table.Column<string>(nullable: true),
                    ComentarioMA = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MA", x => x.id);
                    table.ForeignKey(
                        name: "FK_MA_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MIES",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaMIES1 = table.Column<string>(nullable: true),
                    JustificacionMIES1 = table.Column<string>(nullable: true),
                    RespuestaMIES2 = table.Column<string>(nullable: true),
                    JustificacionMIES2 = table.Column<string>(nullable: true),
                    RespuestaMIES3 = table.Column<string>(nullable: true),
                    JustificacionMIES3 = table.Column<string>(nullable: true),
                    RespuestaMIES4 = table.Column<string>(nullable: true),
                    JustificacionMIES4 = table.Column<string>(nullable: true),
                    RespuestaMIES5 = table.Column<string>(nullable: true),
                    JustificacionMIES5 = table.Column<string>(nullable: true),
                    ComentarioMIES = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MIES", x => x.id);
                    table.ForeignKey(
                        name: "FK_MIES_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MS",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaMS1 = table.Column<string>(nullable: true),
                    JustificacionMS1 = table.Column<string>(nullable: true),
                    RespuestaMS2 = table.Column<string>(nullable: true),
                    JustificacionMS2 = table.Column<string>(nullable: true),
                    RespuestaMS3 = table.Column<string>(nullable: true),
                    JustificacionMS3 = table.Column<string>(nullable: true),
                    RespuestaMS4 = table.Column<string>(nullable: true),
                    JustificacionMS4 = table.Column<string>(nullable: true),
                    RespuestaMS5 = table.Column<string>(nullable: true),
                    JustificacionMS5 = table.Column<string>(nullable: true),
                    ComentarioMS = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MS", x => x.id);
                    table.ForeignKey(
                        name: "FK_MS_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MSE",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaMSE1 = table.Column<string>(nullable: true),
                    JustificacionMSE1 = table.Column<string>(nullable: true),
                    RespuestaMSE2 = table.Column<string>(nullable: true),
                    JustificacionMSE3 = table.Column<string>(nullable: true),
                    RespuestaMSE3 = table.Column<string>(nullable: true),
                    JustificacionMA3 = table.Column<string>(nullable: true),
                    ComentarioMSE = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MSE", x => x.id);
                    table.ForeignKey(
                        name: "FK_MSE_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtrosCultivos",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cultivo = table.Column<string>(nullable: true),
                    Area = table.Column<int>(nullable: false),
                    TipoOrganico = table.Column<string>(nullable: true),
                    Uso = table.Column<string>(nullable: true),
                    Riesgo = table.Column<string>(nullable: true),
                    VisitaAuditoriaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtrosCultivos", x => x.id);
                    table.ForeignKey(
                        name: "FK_OtrosCultivos_VisitaAuditoria_VisitaAuditoriaId",
                        column: x => x.VisitaAuditoriaId,
                        principalTable: "VisitaAuditoria",
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
                name: "IX_AlmacenamientoAgua_ProductorId",
                table: "AlmacenamientoAgua",
                column: "ProductorId",
                unique: true,
                filter: "[ProductorId] IS NOT NULL");

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
                name: "IX_CB_VisitaAuditoriaId",
                table: "CB",
                column: "VisitaAuditoriaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CultivosPresentandos_VisitaAuditoriaId",
                table: "CultivosPresentandos",
                column: "VisitaAuditoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_DisponibilidadAgua_ProductorId",
                table: "DisponibilidadAgua",
                column: "ProductorId");

            migrationBuilder.CreateIndex(
                name: "IX_EvaluacionCompromiso_VisitaAuditoriaId",
                table: "EvaluacionCompromiso",
                column: "VisitaAuditoriaId");

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
                name: "IX_MA_VisitaAuditoriaId",
                table: "MA",
                column: "VisitaAuditoriaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MIES_VisitaAuditoriaId",
                table: "MIES",
                column: "VisitaAuditoriaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MS_VisitaAuditoriaId",
                table: "MS",
                column: "VisitaAuditoriaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MSE_VisitaAuditoriaId",
                table: "MSE",
                column: "VisitaAuditoriaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OtrosCultivos_VisitaAuditoriaId",
                table: "OtrosCultivos",
                column: "VisitaAuditoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_PaticipacionComunitaria_AspectoEconomicoId",
                table: "PaticipacionComunitaria",
                column: "AspectoEconomicoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Productor_TecnicoId",
                table: "Productor",
                column: "TecnicoId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitaAuditoria_ProductorId",
                table: "VisitaAuditoria",
                column: "ProductorId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitaPromotoria_ProductorId",
                table: "VisitaPromotoria",
                column: "ProductorId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitaPromotoria_TecnicoId",
                table: "VisitaPromotoria",
                column: "TecnicoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlmacenamientoAgua");

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
                name: "CB");

            migrationBuilder.DropTable(
                name: "CultivosPresentandos");

            migrationBuilder.DropTable(
                name: "DisponibilidadAgua");

            migrationBuilder.DropTable(
                name: "Empleado");

            migrationBuilder.DropTable(
                name: "EvaluacionCompromiso");

            migrationBuilder.DropTable(
                name: "Familiar");

            migrationBuilder.DropTable(
                name: "Habitabilidad");

            migrationBuilder.DropTable(
                name: "LaboresProgramada");

            migrationBuilder.DropTable(
                name: "LaboresRealizada");

            migrationBuilder.DropTable(
                name: "MA");

            migrationBuilder.DropTable(
                name: "MesaDirectiva");

            migrationBuilder.DropTable(
                name: "MIES");

            migrationBuilder.DropTable(
                name: "MS");

            migrationBuilder.DropTable(
                name: "MSE");

            migrationBuilder.DropTable(
                name: "OtrosCultivos");

            migrationBuilder.DropTable(
                name: "PaticipacionComunitaria");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "VisitaPromotoria");

            migrationBuilder.DropTable(
                name: "VisitaAuditoria");

            migrationBuilder.DropTable(
                name: "AspectoEconomico");

            migrationBuilder.DropTable(
                name: "Productor");

            migrationBuilder.DropTable(
                name: "Tecnico");
        }
    }
}
