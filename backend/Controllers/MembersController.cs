using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cNet.Data;
using cNet.Models;

namespace cNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MembersController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/Members (Toți membrii)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Members.ToListAsync();
        }

        // 2. GET: api/Members/5 (UN SINGUR MEMBRU) 
        // ACEASTA METODA LIPSEȘTE ȘI REZOLVĂ EROAREA 405 LA ÎNCĂRCARE
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // Adaugă acest mic model (DTO) deasupra clasei sau la finalul fișierului
        public class MemberCreationDto
        {
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public int PlanId { get; set; }
        }

        // În interiorul clasei MembersController:
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(MemberCreationDto dto)
        {
            var plan = await _context.SubscriptionPlans.FindAsync(dto.PlanId);
            if (plan == null) return BadRequest("Plan invalid.");

            var member = new Member
            {
                Name = dto.Name,
                Email = dto.Email,
                JoinDate = DateTime.Now,
                ExpirationDate = DateTime.Now.AddMonths(plan.DurationMonths),
                IsActive = true
            };

            _context.Members.Add(member);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMember), new { id = member.Id }, member);
        }

        // 4. PUT: api/Members/5 (Actualizare)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(int id, Member member)
        {
            if (id != member.Id)
            {
                return BadRequest("ID-ul nu corespunde.");
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Members.Any(e => e.Id == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // 5. DELETE: api/Members/5 (Ștergere)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null) return NotFound();

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}