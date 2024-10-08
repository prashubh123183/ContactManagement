using ContactsManagementWebApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ContactsManagementWebApp.Context
{
    public class DatabaseInitializer : DropCreateDatabaseIfModelChanges<ContactInfoDbContext>
    {
        protected override void Seed(ContactInfoDbContext context)
        {
            base.Seed(context);
        }
    }
}