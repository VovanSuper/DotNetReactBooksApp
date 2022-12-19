namespace BooksApi.DTO;

public class PatchBookDTO
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public int? GenreId { get; set; }
  public int? Year { get; set; }
  public int? AuthorId { get; set; }
}