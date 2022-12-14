namespace BooksApi.DAL.Interfaces;

public interface IServeBase<T, C, M> where T : class
{
  Task<IEnumerable<T>>? GetAll();
  Task<T>? GetById(int id);
  Task<T> Create(C entity);
  Task<T> Modify(M entity);
  Task<T>? DeleteById(int id);
}