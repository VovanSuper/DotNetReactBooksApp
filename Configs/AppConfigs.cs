namespace BooksApi.Configs;


public class AppConfigs {
  public ConnectionStrings? ConnectionsString { get; set; }
}

public class ConnectionStrings
{
  public string? BooksDbConnection { get; private set; }
}