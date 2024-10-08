using ContactsManagementWebApp.Context;
using ContactsManagementWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace Contacts_Management_Web_App.Controllers
{
    [ApiController]
    [Route("[api/contact]")]
    public class ContactInfoController : ControllerBase
    {
        private ContactInfoDbContext dbContext = new ContactInfoDbContext();
        public ContactInfoController()
        {
        }


        [HttpGet(Name = "getAllContacts")]
        public async Task<IActionResult> GetAllContactInfo()
        {
            var response = new ContactResponse();
            try
            {
                List<ContactInfo> contactList = (from con in dbContext.Contacts
                                                   where con.IsDeleted == false
                                                select con).ToList();
                if (contactList.Count > 0)
                {
                    return Ok(contactList);
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "No Contacts found";
                    response.ContactList = null;

                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;

                return BadRequest(response);
            }
        }

        [HttpGet]
        [Route("getContactInfoById")]
        public async Task<IActionResult> getContactInfoById(int contactId)
        {
            var response = new HttpResponseMessage();
            try
            {
                var contactDetail = (from con in dbContext.Contacts
                                           where con.Id == contactId && con.IsDeleted == false
                                      select con).FirstOrDefault();
                return Ok(contactDetail);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("saveContactInfo")]
        public async Task<IActionResult> SaveContactInfo(ContactInfo contact)
        {
            var contactAddResponse = new ContactAddResponse();

            var response = new HttpResponseMessage();
            try
            {
                var contactDetail = (from con in dbContext.Contacts
                                          where con.Id == contact.Id && con.IsDeleted == false
                                      select con).FirstOrDefault();
                if (contactDetail != null)
                {
                    contactDetail.FirstName = contact.FirstName;
                    contactDetail.LastName = contact.LastName;
                    contactDetail.Email = contact.Email;
                    contactDetail.UpdatedDate = DateTime.Now;
                    contactDetail.IsDeleted = false;
                    dbContext.SaveChanges();

                    contactAddResponse.IsSuccess = true;
                    contactAddResponse.Message = "Contact Info was updated successfully";

                    return Ok(contactAddResponse);
                }
                else
                {
                    var Contact = new ContactInfo
                    {
                        FirstName = contact.FirstName,
                        LastName = contact.LastName,
                        Email = contact.Email,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        IsDeleted = false
                    };

                    dbContext.Contacts.Add(Contact);
                    dbContext.SaveChanges();

                    contactAddResponse.IsSuccess = true;
                    contactAddResponse.Message = "Contact Info was added successfully";

                    return  Ok(contactAddResponse);
                }
            }
            catch (Exception ex)
            {
                return  BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("deleteContactById")]
        public async Task<IActionResult> DeleteContactById(int contactId)
        {
            var contactAddResponse = new ContactAddResponse();
            try
            {
                var contactDetail = (from con in dbContext.Contacts
                                           where con.Id == contactId && con.IsDeleted == false
                                      select con).FirstOrDefault();
                if (contactDetail != null)
                {
                    contactDetail.UpdatedDate = DateTime.Now;
                    contactDetail.IsDeleted = true;

                    dbContext.SaveChanges();

                    contactAddResponse.IsSuccess = true;
                    contactAddResponse.Message = "Contact Info was deleted successfully";

                    return  Ok(contactAddResponse);
                }
                else
                {
                    return BadRequest("NotFound");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }    
    }
}
