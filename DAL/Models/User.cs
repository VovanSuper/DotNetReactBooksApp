﻿using System.Text.Json.Serialization;

namespace BooksApi.DAL.Models;

public class User
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public string? Email { get; set; }

  [JsonIgnore()]
  public string? Password { get;  set; }
}
