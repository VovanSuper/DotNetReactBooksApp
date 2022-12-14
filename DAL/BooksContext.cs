using BooksApi.Configs;
using BooksApi.DAL.Mappers;
using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL;

public class BooksContext : DbContext
{
  private static readonly Action<string> CLog = Console.WriteLine;
  private readonly IConfiguration Configuration;

  public DbSet<Book>? Books => Set<Book>();
  public DbSet<Author>? Authors => Set<Author>();
  public DbSet<User>? Users => Set<User>();

  // public BooksContext() => Database.EnsureCreated();

  public BooksContext(IConfiguration configuration)
  {
    Configuration = configuration;
    Database.EnsureCreated();
  }

  // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder
  //     .UseNpgsql("Host=127.0.0.1;Database=books;Username=books;Password=books")
  //     .LogTo(CLog);

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    //var configuration = new ConfigurationBuilder().AddConfiguration()
    // var connStr = Configuration.GetValue<ConnectionStrings>("ConnectionStrings");
    var connStrings = Configuration.GetConnectionString("BooksDbConnection");


    if (connStrings == null)
    {
      Console.WriteLine($"No Connection String could be read from config {connStrings}");
      return;
    }

    optionsBuilder.UseNpgsql(connStrings)
      .LogTo(CLog);
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    BooksMapper.Map(modelBuilder);
    AuthorMapper.Map(modelBuilder);
    UserMapper.Map(modelBuilder);
  }

}
