using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL.Mappers;

public static class BooksMapper
{
  public static void Map(ModelBuilder modelBuilder)
  {
    var e = modelBuilder.Entity<Book>();
    e.ToTable("books");
    e.HasKey(o => o.Id);
    e.Property(o => o.Id)
        .HasColumnName("Book_id")
        .UseIdentityAlwaysColumn();

    e.Property(o => o.Year).HasDefaultValueSql("date_part('year', now())").IsRequired();
    // e.Property(b => b.Author)
    //   .HasColumnName("Author_id")
    //   .IsRequired();

    e.HasOne(b => b.Author)
      .WithMany(a => a.Books)
      .HasForeignKey(b => b.AuthorId);

    e.HasOne(b => b.Genre)
      .WithMany(g => g.Books)
      .HasForeignKey(b => b.GenreId);

  }
}
