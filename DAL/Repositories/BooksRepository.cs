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

  public async Task<IEnumerable<Book>>? GetAll() => _booksCtx.Books.Select(b => new Book
  {
    Id = b.Id,
    Name = b.Name,
    Genre = new Genre { Id = b.GenreId, GenreName = b.Genre.GenreName },
    Author = new Author { Id = b.AuthorId, Name = b.Author.Name }
  });

  public async Task<Book>? GetById(int id) => await _booksCtx.Books
    .Include(b => b.Author)
    .Include(b => b.Genre)
    .FirstOrDefaultAsync(b => b.Id == id);

  public async Task<Book> Create(Book book)
  {
    var updatedOrder = await _booksCtx.AddAsync(book);
    _booksCtx.SaveChanges();
    return updatedOrder.Entity;
  }

  public async Task<Book>? DeleteById(int id)
  {
    var book = await _booksCtx.Books.FirstOrDefaultAsync(b => b.Id == id);

    if (book == null)
    {
      throw new Exception($"Book with Id {id} not found!");
    }

    var deleteOrderResult = _booksCtx.Books?.Remove(book);
    _booksCtx.SaveChanges();
    return deleteOrderResult.Entity;

  }

  public Task<Book> Modify(Book entity)
  {
    var updateResult = _booksCtx.Update<Book>(entity);
    updateResult.State = EntityState.Modified;
    _booksCtx.SaveChanges();

    return Task.FromResult<Book>(updateResult.Entity);
  }
}
