namespace BooksApi.Configs;

public class AppConfigs
{
  public ConnectionStrings? ConnectionsString { get; set; }
}

public class ConnectionStrings
{
  public string? BooksDbConnection { get; private set; }
}

public class AppSettings : IAppSettings
{
  public AppSettings(IConfiguration configuration)
  {
    if (configuration == null)
    {
      throw new Exception("NO configuration provided in AppSettings...");
    }

    Secret = configuration.GetSection("AppSettings")?.GetValue<string>("Secret") ?? "SuppaSecret";
    Salt = configuration.GetSection("AppSettings")?.GetValue<string>("Salt") ?? "SuppaSalt";

    Console.WriteLine($"READ SAlLT and SECRET : {Salt} / {Secret} .. ");
  }

  public string Secret { get; private set; }
  public string Salt { get; private set; }
}