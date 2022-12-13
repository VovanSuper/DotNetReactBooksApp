using System.ComponentModel.DataAnnotations.Schema;

namespace BooksApi.DAL.Models;

public class Book
{
  public int Id { get; set; }
  public int Year { get; set; }
  public required string Name { get; set; }
  public int GenreId { get; set; }
  public Genre? Genre { get; set; }

  // [ForeignKey("Author")]
  public int AuthorId { get; set; }
  public Author? Author { get; set; }
}
