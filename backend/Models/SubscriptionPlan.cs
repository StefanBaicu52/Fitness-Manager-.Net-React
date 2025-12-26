// Models/SubscriptionPlan.cs
namespace cNet.Models
{
    public class SubscriptionPlan
    {
        public int Id { get; set; }
        public string Name { get; set; } // ex: Basic, Premium, VIP
        public decimal Price { get; set; }
        public int DurationMonths { get; set; }
    }
}