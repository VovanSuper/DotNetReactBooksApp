namespace BooksApi.DAL.Interfaces;

public interface IAuthService
{
  Task<DTO.AuthResponseDTO?> AuthenticateAsync(DTO.AuthEmailPassDTO model);
}