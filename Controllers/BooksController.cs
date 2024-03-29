﻿using Microsoft.AspNetCore.Mvc;
using BooksApi.DAL.Models;
using BooksApi.DAL.Interfaces;
using BooksApi.DTO;
using Microsoft.AspNetCore.Authorization;

namespace BooksApi.Controllers;

[Authorize]
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

  // [AllowAnonymous]
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
  {
    var books = await _booksSvc.GetAll();
    if (books == null || books.Count() == 0)
    {
      return NotFound();
    }

    return Ok(books);
  }

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
      return BadRequest(new { message = e.Message });
    }
  }


  [HttpPost]
  public async Task<ActionResult<Book>> CreateBook(CreateBookDTO book)
  {
    try
    {
      var newBook = await _booksSvc.Create(book);
      return CreatedAtAction(nameof(CreateBook), new { id = newBook.Id }, newBook);
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Error on CreateBook");
      return BadRequest(new { message = e.Message });
    }
  }

  [HttpPatch]
  public async Task<ActionResult<Book>> ChangeBook(PatchBookDTO book)
  {
    try
    {
      var newBook = await _booksSvc.Modify(book);
      return CreatedAtAction(nameof(ChangeBook), new { id = newBook.Id }, newBook);
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Error on ChangeBook");
      return BadRequest(new { message = e.Message });
    }

  }

  [HttpDelete]
  public async Task<IActionResult> DeleteBook([FromBody] DeleteBookDTO deleteBookId)
  {
    try
    {
      var book = await _booksSvc.DeleteById(deleteBookId.Id);
      return Ok(book);
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Error on DeleteBookById");
      return BadRequest(new { message = e.Message });
    }

  }
}
