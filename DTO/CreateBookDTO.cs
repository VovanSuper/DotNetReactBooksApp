namespace BooksApi.DTO;

public class CreateBookDTO {
  public string Name { get; set; }
  public int GenreId { get; set; }
  public int? Year { get; set; }
  public int AuthorId { get; set; }
}