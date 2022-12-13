using Microsoft.AspNetCore.Mvc;
using BooksApi.DAL.Models;
using BooksApi.DAL.Services;

namespace BooksApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
  private readonly BooksSvc _booksSvc;

  public BooksController(BooksSvc booksSvc)
  {
    _booksSvc = booksSvc;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Book>>> GetBooks() => await _booksSvc.GetAllBooks();

  [HttpGet("{id}")]
  public async Task<ActionResult<Book>> GetBook(int id)
  {
    var book = await _booksSvc.GetBookById(id);

    if (book == null)
    {
      return NotFound();
    }

    return Ok(book);
  }


  [HttpPost]
  public async Task<ActionResult<Book>> CreateBook(Book book)
  {
    var newBook = await _booksSvc.CreateBook(book);
    return CreatedAtAction(nameof(CreateBook), new { id = newBook.Id }, newBook);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteBook(int id)
  {
    try
    {
      var book = await _booksSvc.DeleteBookById(id);
      return NoContent();
    }
    catch (Exception)
    {
      return NotFound();
    }

  }
}
