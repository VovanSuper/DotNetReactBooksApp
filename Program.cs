using NLog;
using NLog.Web;
using BooksApi.DAL;
using BooksApi.DAL.Helpers;
using BooksApi.DAL.Services;
using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Repositories;

var APP_URL = "http://localhost:8085";
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

try
{
  var appBuilder = WebApplication.CreateBuilder(args);

  appBuilder.Services.AddDbContext<BooksContext>(ServiceLifetime.Singleton);
  appBuilder.Services.AddSingleton<ISeeder, Seeder>();
  appBuilder.Services.AddScoped<IBooksCrudRepository, BooksRepository>();
  appBuilder.Services.AddScoped<IBooksService, BooksService>();

  appBuilder.Services.AddControllers();
  appBuilder.Services.AddEndpointsApiExplorer();
  appBuilder.Services.AddSwaggerGen();

  appBuilder.Logging.ClearProviders();
  appBuilder.Host.UseNLog();


  var app = appBuilder.Build();

  if (app.Environment.IsDevelopment())
  {
    app.Services.GetRequiredService<ISeeder>()?.Seed();
    app.UseSwagger();
    app.UseSwaggerUI();
  }

  app.UseAuthorization();

  app.MapControllers();

  app.MapGet("/", async ctx => await ctx.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "dist/index.html")));

  app.Run(APP_URL);

}
catch (Exception exception)
{
  logger.Error(exception, "Stopped program because of exception");
  throw;
}
finally
{
  NLog.LogManager.Shutdown();
}
