using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class SubscriptionPlansController : ControllerBase
{
    private readonly cNet.Data.AppDbContext _context;
    public SubscriptionPlansController(cNet.Data.AppDbContext context) { _context = context; }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<cNet.Models.SubscriptionPlan>>> GetPlans()
    {
        return await _context.SubscriptionPlans.ToListAsync();
    }
}