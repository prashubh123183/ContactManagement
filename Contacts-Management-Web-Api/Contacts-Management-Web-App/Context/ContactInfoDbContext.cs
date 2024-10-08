using ContactsManagementWebApp.Models;

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ContactsManagementWebApp.Context
{
    public class ContactInfoDbContext : DbContext
    {
        public ContactInfoDbContext() : base("name=ContactInfoContext")
        {

        }
        public DbSet<ContactInfo> Contacts { get; set; }
    }
}