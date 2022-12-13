using BooksApi.DAL;
using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL.Repositories;

public class BooksRepository : IBooksCrudRepository
{
  private readonly BooksContext _booksCtx;
  
  public BooksRepository(BooksContext ctx)
  {
    this._booksCtx = ctx;
  }

  public async Task<Book> Add(Book book)
  {
    try
    {
      var newOrder = await _booksCtx.AddAsync(book);
      this._booksCtx.SaveChanges();
      return newOrder.Entity;
    }
    catch (Exception e)
    {
      Console.WriteLine(e.Message);
      throw;
    }
  }

  public Task<List<Book>>? GetAll() => _booksCtx.Books.ToListAsync<Book>();
  public Task<Book>? GetById(int id) => _booksCtx.Books.FirstOrDefaultAsync(b => b.Id == id);
  public async Task<Book> Create(Book book)
  {
    var updatedOrder = await _booksCtx.AddAsync(book);
    _booksCtx.SaveChanges();
    return updatedOrder.Entity;
  }

  public async Task<Book>? DeleteById(int id)
  {
    var book = await _booksCtx.Books!.FirstOrDefaultAsync(b => b.Id == id);
    if (book == null)
    {
      throw new Exception($"Book with Id {id} not found!");
    }
    
    var deleteOrderResult = _booksCtx.Books?.Remove(book);
    _booksCtx.SaveChanges();
    return deleteOrderResult!.Entity;

  }

}
