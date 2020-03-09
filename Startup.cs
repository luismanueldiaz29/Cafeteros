using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Cafeteros.Models;

namespace Cafeteros
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   
           
           services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("defaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
              .AddEntityFrameworkStores<ApplicationDbContext>()
              .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuer = true,
                     ValidateAudience = true,
                     ValidateLifetime = true,
                     ValidateIssuerSigningKey = true,
                     ValidIssuer = "yourdomain.com",
                     ValidAudience = "yourdomain.com",
                     IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Configuration["ApplicationSettings : SecretKey"])),
                     ClockSkew = TimeSpan.Zero
                 });

            services.AddMvc();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // private void ConfigureAutentication(IServiceCollection services){
        //     services.AddIdentity<ApplicationUser, IdentityRole>()
        //          .AddEntityFrameworkStores<ApplicationDbContext>()
        //          .AddDefaultTokenProviders();

        //     services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //         .AddJwtBearer(options =>
        //          options.TokenValidationParameters = new TokenValidationParameters
        //          {
        //              ValidateIssuer = true,
        //              ValidateAudience = true,
        //              ValidateLifetime = true,
        //              ValidateIssuerSigningKey = true,
        //              ValidIssuer = "yourdomain.com",
        //              ValidAudience = "yourdomain.com",
        //              IssuerSigningKey = new SymmetricSecurityKey(
        //             Encoding.UTF8.GetBytes(Configuration["ApplicationSettings : SecretKey"])),
        //              ClockSkew = TimeSpan.Zero
        //          });
        // }
        // private void ConfigureSwagger( IServiceCollection services){
        //     services.AddSwaggerDocument(config =>
        //     {
        //         config.PostProcess = document =>
        //         {
        //             document.Info.Version = "v1";
        //             document.Info.Title = "ToDo API";
        //             document.Info.Description = "A simple ASP.NET Core web API";
        //             document.Info.TermsOfService = "None";
        //             document.Info.Contact = new NSwag.OpenApiContact
        //             {
        //                 Name = "Unicesar",
        //                 Email = "luismanueldiazsequea@gmail.com",
        //                 Url = "https://github.com/luismanueldiaz29/Ponencias"
        //             };
        //             document.Info.License = new NSwag.OpenApiLicense
        //             {
        //                 Name = "Use under LICX",
        //                 Url = "https://example.com/license"
        //             };
        //         };
        //     });
        // }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }else{
                app.UseExceptionHandler("/Home/Error");
            }

            
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
