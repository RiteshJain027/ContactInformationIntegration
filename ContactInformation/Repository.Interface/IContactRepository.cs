using Entity;
using Entity.ExceptionManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IContactRepository
    {
        List<Contact> GetContactList();
        ResultStatus InsertContactDetails(Contact contact);
        ResultStatus UpdateContactDetails(Contact contact);
        ResultStatus DeleteContactDetails(int contactId);
    }
}
