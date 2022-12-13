using BooksApi.DAL;
using Api.DAL.Repositories;
using BooksApi.DAL.Helpers;
using BooksApi.DAL.Services;

var APP_URL = "http://localhost:8085";

var appBuilder = WebApplication.CreateBuilder(args);

appBuilder.Services.AddDbContext<BooksContext>(ServiceLifetime.Singleton);

appBuilder.Services.AddSingleton<Seeder>();
appBuilder.Services.AddScoped<BooksRepository>();
appBuilder.Services.AddScoped<BooksSvc>();

appBuilder.Services.AddControllers();
appBuilder.Services.AddEndpointsApiExplorer();
appBuilder.Services.AddSwaggerGen();

var app = appBuilder.Build();

if (app.Environment.IsDevelopment())
{
  app.Services.GetRequiredService<Seeder>()?.Seed();
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", async ctx => await ctx.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "dist/index.html")));

app.Run(APP_URL);
