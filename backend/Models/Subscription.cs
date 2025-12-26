using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace cNet.Models
{
    public class Subscription
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; } // Ex: "Lunar", "Anual"

        public decimal Price { get; set; } // Ex: 100.00

        public int DurationMonths { get; set; } // Ex: 1, 12

        // Foreign Key to Member (un abonament aparține unui membru)
        public int MemberId { get; set; }
        [JsonIgnore] // Previne bucla infinită în JSON
        public Member Member { get; set; }
    }
}