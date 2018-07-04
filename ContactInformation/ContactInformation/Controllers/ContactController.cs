using Entity;
using Entity.ExceptionManagement;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactInformation.Controllers
{	
	[RoutePrefix("api/Contact")]
    public class ContactController : ApiBaseController
    {
        #region Private Variables

        private IContactRepository _contactRepository;

        #endregion Private Variables

        #region Constructors

        public ContactController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

		#endregion Constructors

		#region Public Function
		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("GetContactList")]
        public IHttpActionResult GetContactList()
        {
            try
            {
				List<Contact> contactList = _contactRepository.GetContactList();
				
				return Json(new { ContactList = contactList, Status = STATUS_SUCCESS });
            }
            catch (Exception ex)
            {
                string errorMEssage = ex.Message;
                return Json(new { ContactList = new List<Contact> { }, Status = STATUS_FAIL });
            }
        }

		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("GetContactNameList")]
		public IHttpActionResult GetContactNameList()
		{
			try
			{
				List<Contact> contactList = _contactRepository.GetContactList();
				
				return Json(new { ContactList = contactList, Status = STATUS_SUCCESS });
			}
			catch (Exception ex)
			{
				string errorMEssage = ex.Message;
				return Json(new { ContactList = new List<Contact> { }, Status = STATUS_FAIL });
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="contact"></param>
		/// <returns></returns>
		[Route("AddContact")]
		[HttpPost]		
		public IHttpActionResult AddContact([FromBody]Contact contact)//Contact contact
		{
			try
			{
				ResultStatus resultStatus = _contactRepository.InsertContactDetails(contact);

				return Json(new {Status = STATUS_SUCCESS });
			}
			catch (Exception ex)
			{
				string errorMEssage = ex.Message;
				return Json(new {Status = STATUS_FAIL });
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="contact"></param>
		/// <returns></returns>
		[HttpPost()]
		[Route("UpdateContact")]
		public IHttpActionResult UpdateContact([FromBody]Contact contact)
		{
			try
			{
				ResultStatus resultStatus = _contactRepository.UpdateContactDetails(contact);

				return Json(new { Status = STATUS_SUCCESS });
			}
			catch (Exception ex)
			{
				string errorMEssage = ex.Message;
				return Json(new { Status = STATUS_FAIL });
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="contactId"></param>
		/// <returns></returns>
		[HttpPost()]
		[Route("DeleteContact")]
		public IHttpActionResult DeleteContact([FromBody]int contactId)
		{
			try
			{
				ResultStatus resultStatus = _contactRepository.DeleteContactDetails(contactId);

				return Json(new { Status = STATUS_SUCCESS });
			}
			catch (Exception ex)
			{
				string errorMEssage = ex.Message;
				return Json(new { Status = STATUS_FAIL });
			}
		}
		
		#endregion Public Function
	}
}
