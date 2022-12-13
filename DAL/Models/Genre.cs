namespace BooksApi.DAL.Models;

public class Genre
{
  public int Id { get; set; }
  public required string GenreName { get; set; }

  public virtual ICollection<Book>? Books { get; set; }
}
