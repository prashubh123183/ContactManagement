using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ContactsManagementWebApp.Models
{
    public class ContactInfo
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }       
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class ContactAddResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
    public class ContactResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<ContactInfo> ContactList { get; set; }
    }
}