using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Models;
using BooksApi.Utils;

namespace BooksApi.DAL.Helpers;

public class Seeder : ISeeder
{

  private readonly BooksContext _booksCtx;
  private readonly AuthUtils _authUtils;

  public Seeder(BooksContext booksCtx, AuthUtils utils)
  {
    this._booksCtx = booksCtx;
    this._authUtils = utils;
  }

  public void Seed()
  {
    if (_booksCtx == null || _booksCtx.Books == null)
    {
      Console.WriteLine("No Book entity exists in Database ..!");
      return;
    }

    if (_booksCtx.Books.Any())
    {
      return;
    }

    /// -- Seed authors ---- ///
    var (authorPart1, authorPart2, authorPart3) = (
      new Author { Name = "Vovan Suppa" },
      new Author { Name = "Leo Tolstoy" },
      new Author { Name = "William Shakespeare" }
    );

    var author1 = _booksCtx.Add<Author>(authorPart1).Entity;
    var author2 = _booksCtx.Add<Author>(authorPart2).Entity;
    var author3 = _booksCtx.Add<Author>(authorPart3).Entity;
    /// -- end Seed authors ---- ///

    /// -- Seed genres ---- ///
    var (genrePart1, genrePart2, genrePart3) = (
      new Genre { GenreName = "Science Fiction" },
      new Genre { GenreName = "Non Fiction" },
      new Genre { GenreName = "Drama" }
    );

    var genre1 = _booksCtx.Add<Genre>(genrePart1).Entity;
    var genre2 = _booksCtx.Add<Genre>(genrePart2).Entity;
    var genre3 = _booksCtx.Add<Genre>(genrePart3).Entity;
    /// -- end Seed genres ---- ///

    /// -- Seed books ---- ///
    var books = new List<Book>
        {
            new Book
            {
                Name = "Science for the Dummies",
                Genre = genre1,
                Author = author1,
            },
            new Book
            {
                Name = "Dummy Book 2",
                Author = author1,
                Genre = genre2,
            },
            new Book
            {
                Name = "Not a Drama at all",
                Author = author2,
                Genre = genre2,
            },
            new Book
            {
                Name = "Romeo and Juliet",
                Author = author3,
                Genre = genre3
            }
        };
    _booksCtx.Books.AddRange(books);
    /// -- end Seed books ---- ///

    /// Seed Users
    _booksCtx.Users?.AddRange(new List<User> {
      new User { Name = "Test", Email = "Test@mail.ru", Password = _authUtils.Hash("Test") },
      new User { Name = "test", Email = "test@mail.ru", Password = _authUtils.Hash("test") },
      new User { Name = "User", Email = "Tser@mail.ru", Password = _authUtils.Hash("User") },
      new User { Name = "Admin", Email = "Admin@mail.ru", Password = _authUtils.Hash("Admin") }
    });
    /// end Seed Users

    _booksCtx.SaveChanges();
  }
}
