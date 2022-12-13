namespace BooksApi.DAL.Models;

public class Book
{
  public int Id { get; set; }
  public DateTime Date { get; set; }
  public required string Name { get; set; }
  public required string Genre { get; set; }
  public required int Author { get; set; }

}
