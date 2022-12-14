using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksApi.Configs;
using BooksApi.DAL.Models;
using Microsoft.IdentityModel.Tokens;

namespace BooksApi.Utils;

public class AuthUtils
{
  private readonly IAppSettings _appSettings;

  public AuthUtils(IAppSettings AppSettings)
  {
    _appSettings = AppSettings;
  }

  public string Hash(string data) => BCrypt.Net.BCrypt.HashPassword(data);

  public bool VerifyHash(string data, string hash) => BCrypt.Net.BCrypt.Verify(data, hash);

  public string GenerateToken(User user)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new List<Claim> { new Claim("id", user.Id.ToString()), new Claim("email", user.Email.ToString()) }),
      Expires = DateTime.UtcNow.AddDays(14),
      SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
  }

}