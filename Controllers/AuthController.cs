using BooksApi.DAL.Interfaces;
using BooksApi.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BooksApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
  private IAuthService _authSvc;

  public AuthController(IAuthService authService) => _authSvc = authService;

  [HttpPost("login")]
  public async Task<IActionResult> AuthenticateAsync(AuthEmailPassDTO authData)
  {
    var response = await _authSvc.AuthenticateAsync(authData);

    if (response == null)
      return BadRequest(new { message = "Username or password is incorrect" });

    return Ok(response);
  }

}