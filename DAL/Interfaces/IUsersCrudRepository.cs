namespace BooksApi.DAL.Interfaces;

public interface IUsersCrudRepository : ICrudRepository<BooksApi.DAL.Models.User> {
   Task<BooksApi.DAL.Models.User> getUserByEmail(string email);
 }
