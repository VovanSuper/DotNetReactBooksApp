namespace BooksApi.Configs;

public interface IAppSettings
{
  string Secret { get; }
  string Salt { get; }
}