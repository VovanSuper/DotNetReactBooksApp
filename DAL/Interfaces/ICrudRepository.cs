namespace BooksApi.DAL.Interfaces;

public interface ICrudRepository<T>
{
  Task<IEnumerable<T>>? GetAll();
  Task<T>? GetById(int id);
  Task<T> Create(T entity);
  Task<T> Modify(T entity);
  Task<T>? DeleteById(int id);
}
