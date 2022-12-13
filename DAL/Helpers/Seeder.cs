using BooksApi.DAL.Models;

namespace BooksApi.DAL.Helpers
{
  public class Seeder
  {

    private readonly BooksContext _booksCtx;

    public Seeder(BooksContext booksCtx)
    {
      this._booksCtx = booksCtx;
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

      var authors = new List<Author>
        {
            new Author
            {
                Id = 1,
                Name = "Author 1"
            },
            new Author
            {
                Id = 2,
                Name = "Author 2"
            }
        };

      var books = new List<Book>
        {
            new Book
            {
                Id = 1,
                Name = "Book 1 ",
                Genre = "Since Fiction",
                Author = 1,
            },
            new Book
            {
                Id = 2,
                Name = "Book 2",
                Author = 1,
                Genre = "Non Fiction",

            },
            new Book
            {
                Id = 3,
                Name = "Book 3",
                Author = 2,
                Genre = "Non Fiction"
            }
        };

      _booksCtx.Authors.AddRange(authors);
      _booksCtx.Books.AddRange(books);
      _booksCtx.SaveChanges();
    }
  }
}
