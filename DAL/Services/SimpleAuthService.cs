using BooksApi.DAL.Interfaces;
using BooksApi.DTO;
using BooksApi.Utils;

namespace BooksApi.DAL.Services;

public class SimpleAuthService : IAuthService
{
  private readonly IUsersCrudRepository _usersRepo;
  private readonly AuthUtils _authUtils;

  public SimpleAuthService(IUsersCrudRepository usersRepo, AuthUtils utils)
  {
    _usersRepo = usersRepo ?? throw new ArgumentNullException(nameof(usersRepo));
    _authUtils = utils;
  }

  public async Task<AuthResponseDTO?> AuthenticateAsync(AuthEmailPassDTO model)
  {
    if (model.Email == null || model.Password == null)
    {
      throw new ArgumentException("No model.Email provided in AuthEmailPassDTO in AuthService->Authenticate");
    }
    var user = await _usersRepo.getUserByEmail(model.Email);
    if (user == null)
    {
      return null;
    }

    if (!_authUtils.VerifyHash(model.Password, user.Password)) {
      return null;
    }

      var token = _authUtils.GenerateToken(user);

    return new AuthResponseDTO(user, token);
  }
}