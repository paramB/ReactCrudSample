using System;
namespace ProjectTalentOnboarding.Models
{
    public class SaleDTO
    {
        public int SaleId { get; set; }
        public int PId { get; set; }
        public int CId { get; set; }
        public int SId { get; set; }
        public DateTime? DateSold { get; set; }
        public string CName { get; set; }
        public string PName { get; set; }
        public string SName { get; set; }
    }
}