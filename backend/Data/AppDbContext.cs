using Microsoft.EntityFrameworkCore;
using cNet.Models;

namespace cNet.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Member> Members { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; } // Adaugă asta
        public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }

        public DbSet<User> Users { get; set; }
    }
}