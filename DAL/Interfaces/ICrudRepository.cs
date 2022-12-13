namespace BooksApi.DAL.Interfaces;

public interface ICrudRepository<T>
{
  Task<List<T>>? GetAll();
  Task<T>? GetById(int id);
  Task<T> Add(T entity);
  Task<T> Create(T entity);
  Task<T>? DeleteById(int id);
}
