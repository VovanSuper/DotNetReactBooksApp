using BooksApi.DAL.Interfaces;
using BooksApi.DTO;

namespace BooksApi.DAL.Services;

public class AuthService: IAuthService
{
  private readonly IUsersCrudRepository _usersRepo;

  public AuthService(IUsersCrudRepository usersRepo) => _usersRepo = usersRepo ?? throw new ArgumentNullException(nameof(usersRepo));

  public async Task<AuthResponseDTO?> AuthenticateAsync(AuthEmailPassDTO model)
  {
    if (model.Email == null)
    {
      throw new ArgumentException("No model.Email provided in AuthEmailPassDTO in AuthService->Authenticate");
    }
    var user = await _usersRepo.getUserByEmail(model.Email);

    if (user == null)
      return null;

    // var token = generateJwtToken(user);
    var token = "Hello";

    return new AuthResponseDTO(user, token);
  }
}