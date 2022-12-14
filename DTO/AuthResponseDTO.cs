using BooksApi.DAL.Models;

namespace BooksApi.DTO;

public class AuthResponseDTO
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Email { get; set; }
  public string Token { get; set; }


  public AuthResponseDTO(User user, string token)
  {
    Id = user.Id;
    Email = user.Email ?? String.Empty;
    Name = user.Name;
    Token = token;
  }
}