using Microsoft.AspNetCore.Mvc;
using BooksApi.DAL.Models;
using BooksApi.DAL.Interfaces;
using BooksApi.DTO;

namespace BooksApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
  private readonly IBooksService _booksSvc;
  private readonly ILogger<BooksController> _logger;

  public BooksController(IBooksService booksSvc, ILogger<BooksController> logger)
  {
    _booksSvc = booksSvc;
    _logger = logger;
  }

  [HttpGet]
  public  async Task<ActionResult<IEnumerable<Book>>> GetBooks() => Ok(await _booksSvc.GetAll());

  [HttpGet("{id}")]
  public async Task<ActionResult<Book>> GetBook(int id)
  {
    try
    {
      var book = await _booksSvc.GetById(id);
      _logger.LogInformation($"GetBook: {id}, book found {book}");

      if (book == null)
      {
        return NotFound();
      }

      return Ok(book);
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Error on GetBook Action");
      return BadRequest(e.Message);
    }
  }


  [HttpPost]
  public async Task<ActionResult<Book>> CreateBook(CreateBookDTO book)
  {
    try
    {
      // var bookAuthor = await _booksSvc.
      var newBook = await _booksSvc.Create(book);
      return CreatedAtAction(nameof(CreateBook), new { id = newBook.Id }, newBook);
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Error on CreateBook");
      return BadRequest(e.Message);
    }
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteBook(int id)
  {
    try
    {
      var book = await _booksSvc.DeleteById(id);

      return NoContent();
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Error on DeleteBookById");
      return BadRequest(e.Message);
    }

  }
}
