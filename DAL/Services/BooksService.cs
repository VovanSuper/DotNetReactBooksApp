﻿using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Models;
using BooksApi.DTO;

namespace BooksApi.DAL.Services;

public class BooksService : IBooksService
{
  private readonly IBooksCrudRepository _booksRepo;

  public BooksService(IBooksCrudRepository booksRepo) => _booksRepo = booksRepo ?? throw new ArgumentNullException(nameof(booksRepo));

  public async Task<IEnumerable<Book>>? GetAll() => await _booksRepo.GetAll();

  public Task<Book>? GetById(int Id) => _booksRepo.GetById(Id);
  
  public Task<Book> Create(CreateBookDTO book) => _booksRepo.Create(new Book
  {
    Name = book.Name,
    Year = book.Year ?? DateTime.Now.Year,
    GenreId = book.GenreId,
    AuthorId = book.AuthorId,
  });

  public Task<Book>? DeleteById(int Id) => _booksRepo.DeleteById(Id);

  public async Task<Book> Modify(PatchBookDTO entity)
  {
    var book = await GetById(entity.Id);
    if (book == null)
    {
      throw new Exception($"Book {entity} doesnot exist in DB");
    }
    if (entity.AuthorId != null)
      book.AuthorId = (int)entity.AuthorId;

    if (entity.GenreId != null)
      book.GenreId = (int)entity.GenreId;

    if (entity.Name != null)
      book.Name = (string)entity.Name;

    if (entity.Year != null)
      book.Year = (int)entity.Year;

    return await _booksRepo.Modify(book);
  }
}