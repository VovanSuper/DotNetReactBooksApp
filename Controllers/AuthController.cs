using BooksApi.DAL.Interfaces;
using BooksApi.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BooksApi.Controllers;

[Route("[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private IAuthService _authSvc;

    public UsersController(IAuthService authService)
    {
        _authSvc = authService;
    }

    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthEmailPassDTO authData)
    {
        var response = _authSvc.AuthenticateAsync(authData);

        if (response == null)
            return BadRequest(new { message = "Username or password is incorrect" });

        return Ok(response);
    }

}