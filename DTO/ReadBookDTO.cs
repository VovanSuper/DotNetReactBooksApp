namespace BooksApi.DTO;

public class ReadBookDTO : CreateBookDTO
{
  public string Author { get; set; } = String.Empty;
}