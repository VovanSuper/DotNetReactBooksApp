using Api.DAL.Repositories;
using BooksApi.DAL.Models;

namespace BooksApi.DAL.Services;

public class BooksSvc
{
  private readonly BooksRepository _booksRepo;

  public BooksSvc(BooksRepository booksRepo) => _booksRepo = booksRepo ?? throw new ArgumentNullException(nameof(booksRepo));

  public Task<List<Book>>? GetAllBooks() => _booksRepo.GetAll();
  public Task<Book>? GetBookById(int Id) => _booksRepo.GetById(Id);
  public Task<Book> CreateBook(Book book) => _booksRepo.Create(book);
  public Task<Book>? DeleteBookById(int Id) => _booksRepo.DeleteById(Id);
}