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

var APP_URL = "http://localhost:8085";
var CLIENT_URL = "http://localhost:8080"
;
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

try
{
  var appBuilder = WebApplication.CreateBuilder(args);

  appBuilder.Services
    .AddDbContext<BooksContext>(ServiceLifetime.Singleton)
    .AddSingleton<ISeeder, Seeder>()
    .AddScoped<IBooksCrudRepository, BooksRepository>()
    .AddScoped<IBooksService, BooksService>()
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
    .AddSwaggerGen()
    .AddAuthentication()
      .AddJwtBearer();

  appBuilder.Logging.ClearProviders();
  appBuilder.Host.UseNLog();


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
finally
{
  NLog.LogManager.Shutdown();
}
