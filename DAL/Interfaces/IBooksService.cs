
namespace BooksApi.DAL.Interfaces;

public interface IBooksService : IServeBase<BooksApi.DAL.Models.Book, BooksApi.DTO.CreateBookDTO, BooksApi.DTO.PatchBookDTO>
{ }