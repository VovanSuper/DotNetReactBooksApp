namespace BooksApi.DAL.Interfaces;

public interface IServeBase<T> where T : class
{
  Task<List<T>>? GetAll();
  Task<T>? GetById(int id);
  Task<T> Create(T entity);
  Task<T>? DeleteById(int id);
}