namespace BooksApi.DAL.Interfaces;

public interface IServeBase<T, D> where T : class
{
  Task<IEnumerable<T>>? GetAll();
  Task<T>? GetById(int id);
  Task<T> Create(D entity);
  Task<T>? DeleteById(int id);
}