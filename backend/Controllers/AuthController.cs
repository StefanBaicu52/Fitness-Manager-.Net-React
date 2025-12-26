using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cNet.Data;
using cNet.Models;
using System.Security.Cryptography;
using System.Text;

namespace cNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context) { _context = context; }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // Căutăm user-ul. Într-o aplicație reală, am compara hash-urile parolei.
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == dto.Username && u.PasswordHash == dto.Password);

            if (user == null) return Unauthorized("Acces refuzat!");

            return Ok(new
            {
                token = Guid.NewGuid().ToString(), // Token unic generat la fiecare logare
                username = user.Username
            });
        }
    }

    public class LoginDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}