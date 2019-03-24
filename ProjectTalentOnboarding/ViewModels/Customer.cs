using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.ViewModels
{
    [MetadataType(typeof(CustomerMetadata))]
    public partial class Customer
    {
        public class CustomerMetadata
        {
            [DisplayName("Name")]
            [Required(ErrorMessage = "Name is required")]
            [StringLength(15, MinimumLength = 3)]
            public string CName { get; set; }

            [DisplayName("Address")]
            [Required(ErrorMessage = "Address is required")]
            [StringLength(300)]
            public string CAddress { get; set; }
        }
    }
    
}