using NLog;
using NLog.Web;
using BooksApi.DAL;
using BooksApi.DAL.Helpers;
using BooksApi.DAL.Services;
using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Repositories;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Text.Json;
using System.Text.Json.Serialization;
using BooksApi.Configs;
using BooksApi.Utils;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var APP_URL = "http://localhost:8085";
var CLIENT_URL = "http://localhost:8080"
;
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("Init App...");

try
{
    var appBuilder = WebApplication.CreateBuilder(args);

    appBuilder.Services
      .AddDbContext<BooksContext>(ServiceLifetime.Singleton)
      .AddSingleton<IAppSettings, AppSettings>()
      .AddSingleton<AuthUtils>()
      .AddSingleton<ISeeder, Seeder>()
      .AddScoped<IBooksCrudRepository, BooksRepository>()
      .AddScoped<IUsersCrudRepository, UsersRepository>()
      .AddScoped<IBooksService, BooksService>()
      .AddScoped<IAuthService, SimpleAuthService>()
      .AddControllers(opts =>
      {
          opts.OutputFormatters.RemoveType<SystemTextJsonOutputFormatter>();
          opts.OutputFormatters.Add(new SystemTextJsonOutputFormatter(new JsonSerializerOptions(JsonSerializerDefaults.Web)
          {
              ReferenceHandler = ReferenceHandler.IgnoreCycles,
              DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
          }));
      });

    appBuilder.Services
      .AddEndpointsApiExplorer()
      .AddSwaggerGen(opt =>
      {
          opt.SwaggerDoc("v1", new OpenApiInfo { Title = "Simple Books Api", Version = "v1" });
          opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
          {
              In = ParameterLocation.Header,
              Description = "Please enter token",
              Name = "Authorization",
              Type = SecuritySchemeType.Http,
              BearerFormat = "JWT",
              Scheme = "bearer"
          });
          opt.AddSecurityRequirement(new OpenApiSecurityRequirement
          {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    }
                },
                new string[]{}
            }
          });
      })
      .AddAuthentication(x =>
      {
          x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appBuilder.Configuration["AppSettings:Secret"])),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

    appBuilder.Logging.ClearProviders();
    appBuilder.Host.UseNLog(new NLogAspNetCoreOptions { AutoShutdown = true, });


    var app = appBuilder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.Services.GetRequiredService<ISeeder>()?.Seed();
        app
        .UseSwagger()
        .UseSwaggerUI();
    }

    app
      .UseCors(b => b
        .WithOrigins(APP_URL, CLIENT_URL)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
      )
      .UseAuthorization();

    app.MapControllers();

    app.MapGet("/", async ctx => await ctx.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "dist/index.html")));

    app.Run(APP_URL);

}
catch (Exception e)
{
    logger.Error(e, "Stopped program because of exception");
    throw;
}