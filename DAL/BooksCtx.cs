using BooksApi.DAL.Mappers;
using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace BooksApi.DAL
{
    public class ConnectionStrings
    {
        public string? BooksDB { get; private set; }
    }

    public class BooksContext : DbContext
    {
        private static readonly Action<string> CLog = Console.WriteLine;

        public DbSet<Book>? Books => Set<Book>();
        public DbSet<Author>? Authors => Set<Author>();

        public BooksContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder
            .UseNpgsql("Host=127.0.0.1;Database=books;Username=books;Password=books")
            .LogTo(CLog);
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //var configuration = new ConfigurationBuilder().AddConfiguration()
        //    var connStr = new AppSettingsReader().GetValue("ConnectionString", typeof(ConnectionStrings));
        //    Console.WriteLine(connStr);

        //    optionsBuilder.UseNpgsql(connStr.ToString());
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            BooksMapper.Map(modelBuilder);
            AuthorMapper.Map(modelBuilder);
        }

    }
}
