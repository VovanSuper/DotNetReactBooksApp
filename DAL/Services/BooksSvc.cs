using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Models;

namespace BooksApi.DAL.Services;

public class BooksService: IBooksService
{
  private readonly IBooksCrudRepository _booksRepo;

  public BooksService(IBooksCrudRepository booksRepo) => _booksRepo = booksRepo ?? throw new ArgumentNullException(nameof(booksRepo));

  public Task<List<Book>>? GetAll() => _booksRepo.GetAll();
  public Task<Book>? GetById(int Id) => _booksRepo.GetById(Id);
  public Task<Book> Create(Book book) => _booksRepo.Create(book);
  public Task<Book>? DeleteById(int Id) => _booksRepo.DeleteById(Id);

}