using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL.Mappers;

public class BooksMapper
{
  public static void Map(ModelBuilder modelBuilder)
  {
    var e = modelBuilder.Entity<Book>();
    e.ToTable("books");
    e.HasKey(o => o.Id);
    e.Property(o => o.Id)
        .HasColumnName("book_id")
        .UseIdentityAlwaysColumn();

    e.Property(o => o.Date).HasDefaultValueSql("now()").IsRequired();

    e.Property(o => o.Author)
        .HasColumnName("author_id")
        .IsRequired(true);

  }
}
