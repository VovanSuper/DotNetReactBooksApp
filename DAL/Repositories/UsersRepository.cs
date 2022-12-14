using BooksApi.DAL;
using BooksApi.DAL.Interfaces;
using BooksApi.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.DAL.Repositories;

public class UsersRepository : IUsersCrudRepository
{

  private readonly BooksContext _Ctx;

  public UsersRepository(BooksContext ctx)
  {
    this._Ctx = ctx;
  }

  public async Task<User> getUserByEmail(string email) => _Ctx.Users.FirstOrDefault(u => u.Email == email);

  public Task<User> Create(User entity)
  {
    throw new NotImplementedException();
  }

  public Task<User>? DeleteById(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<User>>? GetAll()
  {
    throw new NotImplementedException();
  }

  public  Task<User> GetById(int id) =>  _Ctx.Users.FirstOrDefaultAsync(u => u.Id == id);

  public Task<User> Modify(User entity)
  {
    throw new NotImplementedException();
  }
}