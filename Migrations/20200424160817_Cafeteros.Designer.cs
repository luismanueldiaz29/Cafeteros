﻿// <auto-generated />
using System;
using Cafeteros.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Cafeteros.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200424160817_Cafeteros")]
    partial class Cafeteros
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Cafeteros.Models.AlmacenamientoAgua", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EstudioAgua")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExisteDesperdicio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mantenimiento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumeroUsuario")
                        .HasColumnType("int");

                    b.Property<string>("ProductorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("TipoAlmacenamiento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Volumen")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("ProductorId")
                        .IsUnique()
                        .HasFilter("[ProductorId] IS NOT NULL");

                    b.ToTable("AlmacenamientoAgua");
                });

            modelBuilder.Entity("Cafeteros.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Cafeteros.Models.AspectoEconomico", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Legalidad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("TenenciaTierra")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("ProductorId")
                        .IsUnique()
                        .HasFilter("[ProductorId] IS NOT NULL");

                    b.ToTable("AspectoEconomico");
                });

            modelBuilder.Entity("Cafeteros.Models.DisponibilidadAgua", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Disponibilidad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fuente")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("UsoAgricola")
                        .HasColumnType("bit");

                    b.Property<bool>("UsoDomestico")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("ProductorId");

                    b.ToTable("DisponibilidadAgua");
                });

            modelBuilder.Entity("Cafeteros.Models.Empleado", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Apellidos")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombres")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Empleado");
                });

            modelBuilder.Entity("Cafeteros.Models.Familiar", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AfiliacionSalud")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FechaNacimiento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NivelEducativo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NumeroDocumento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Parentesco")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("TipoPoblacion")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("ProductorId");

                    b.ToTable("Familiar");
                });

            modelBuilder.Entity("Cafeteros.Models.Habitabilidad", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AspectoEconomicoId")
                        .HasColumnType("int");

                    b.Property<string>("EnergiaCosinar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialCosinar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialPredominante")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialTecho")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumeroHabitaciones")
                        .HasColumnType("int");

                    b.Property<string>("ServicioSanitario")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipoAlumbrado")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipoVivienda")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("AspectoEconomicoId")
                        .IsUnique();

                    b.ToTable("Habitabilidad");
                });

            modelBuilder.Entity("Cafeteros.Models.LaboresProgramada", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Actividad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fecha")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VisitaPromotoriaId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("VisitaPromotoriaId");

                    b.ToTable("LaboresProgramada");
                });

            modelBuilder.Entity("Cafeteros.Models.LaboresRealizada", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Actividad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fecha")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VisitaPromotoriaId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("VisitaPromotoriaId");

                    b.ToTable("LaboresRealizada");
                });

            modelBuilder.Entity("Cafeteros.Models.MesaDirectiva", b =>
                {
                    b.Property<string>("Correo")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Contraseña")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Identificacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Correo");

                    b.ToTable("MesaDirectiva");
                });

            modelBuilder.Entity("Cafeteros.Models.PaticipacionComunitaria", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AistenteTrabajos")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AsistenteAsamblea")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("AspectoEconomicoId")
                        .HasColumnType("int");

                    b.Property<string>("CargoAsamblea")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CargoTrabajo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CualOrganizacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganizacionAparte")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("AspectoEconomicoId")
                        .IsUnique();

                    b.ToTable("PaticipacionComunitaria");
                });

            modelBuilder.Entity("Cafeteros.Models.Productor", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ActvidadesDedican")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AfiliacionSalud")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CodigoCafetero")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CodigoSica")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Estado")
                        .HasColumnType("int");

                    b.Property<string>("FechaAsociacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FechaNoAsociacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FechaRegistro")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Municipio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NombrePredio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NumeroTelefono")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Vereda")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Productor");
                });

            modelBuilder.Entity("Cafeteros.Models.Tecnico", b =>
                {
                    b.Property<string>("Correo")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Contraseña")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Identificacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Correo");

                    b.ToTable("Tecnico");
                });

            modelBuilder.Entity("Cafeteros.Models.VisitaPromotoria", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FechaProxVista")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FechaVisita")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoraVisita")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IntercambioSaberes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ObjetivoVisita")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SituacionEncontrada")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TecnicoId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("id");

                    b.HasIndex("ProductorId");

                    b.HasIndex("TecnicoId");

                    b.ToTable("VisitaPromotoria");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Cafeteros.Models.AlmacenamientoAgua", b =>
                {
                    b.HasOne("Cafeteros.Models.Productor", "Productor")
                        .WithOne("AlmacenamientoAgua")
                        .HasForeignKey("Cafeteros.Models.AlmacenamientoAgua", "ProductorId");
                });

            modelBuilder.Entity("Cafeteros.Models.AspectoEconomico", b =>
                {
                    b.HasOne("Cafeteros.Models.Productor", "Productor")
                        .WithOne("AspectoEconomico")
                        .HasForeignKey("Cafeteros.Models.AspectoEconomico", "ProductorId");
                });

            modelBuilder.Entity("Cafeteros.Models.DisponibilidadAgua", b =>
                {
                    b.HasOne("Cafeteros.Models.Productor", "Productor")
                        .WithMany()
                        .HasForeignKey("ProductorId");
                });

            modelBuilder.Entity("Cafeteros.Models.Familiar", b =>
                {
                    b.HasOne("Cafeteros.Models.Productor", "Productor")
                        .WithMany()
                        .HasForeignKey("ProductorId");
                });

            modelBuilder.Entity("Cafeteros.Models.Habitabilidad", b =>
                {
                    b.HasOne("Cafeteros.Models.AspectoEconomico", "AspectoEconomico")
                        .WithOne("Habitabilidad")
                        .HasForeignKey("Cafeteros.Models.Habitabilidad", "AspectoEconomicoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Cafeteros.Models.LaboresProgramada", b =>
                {
                    b.HasOne("Cafeteros.Models.VisitaPromotoria", "VisitaPromotoria")
                        .WithMany()
                        .HasForeignKey("VisitaPromotoriaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Cafeteros.Models.LaboresRealizada", b =>
                {
                    b.HasOne("Cafeteros.Models.VisitaPromotoria", "VisitaPromotoria")
                        .WithMany()
                        .HasForeignKey("VisitaPromotoriaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Cafeteros.Models.PaticipacionComunitaria", b =>
                {
                    b.HasOne("Cafeteros.Models.AspectoEconomico", "AspectoEconomico")
                        .WithOne("PaticipacionComunitaria")
                        .HasForeignKey("Cafeteros.Models.PaticipacionComunitaria", "AspectoEconomicoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Cafeteros.Models.VisitaPromotoria", b =>
                {
                    b.HasOne("Cafeteros.Models.Productor", "Productor")
                        .WithMany()
                        .HasForeignKey("ProductorId");

                    b.HasOne("Cafeteros.Models.Tecnico", "Tecnico")
                        .WithMany()
                        .HasForeignKey("TecnicoId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Cafeteros.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Cafeteros.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Cafeteros.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Cafeteros.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}