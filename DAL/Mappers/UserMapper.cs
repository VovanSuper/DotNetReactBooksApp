using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL.Mappers;

public class UserMapper
{
  public static void Map(ModelBuilder modelBuilder)
  {
    var e = modelBuilder.Entity<User>();
    e.ToTable("users");
    e.HasKey(o => o.Id);
    e.Property(o => o.Id)
        .HasColumnName("User_id")
        .UseIdentityAlwaysColumn();
  }
}
