using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace cNet.Models
{
    public class Member
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public DateTime JoinDate { get; set; } = DateTime.Now;
        public DateTime ExpirationDate { get; set; } = DateTime.Now.AddMonths(1);
        public bool IsActive { get; set; } = true;

        // Adăugăm = new List<Subscription>(); pentru a inițializa lista goală
        public ICollection<Subscription>? Subscriptions { get; set; } = new List<Subscription>();
    }
}