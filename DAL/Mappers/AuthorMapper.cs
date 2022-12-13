using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL.Mappers;

public class AuthorMapper
{
  public static void Map(ModelBuilder modelBuilder)
  {
    var e = modelBuilder.Entity<Author>();
    e.ToTable("authors");
    e.HasKey(o => o.Id);
    e.Property(o => o.Id)
        .HasColumnName("author_id")
        .UseIdentityAlwaysColumn();
  }
}
