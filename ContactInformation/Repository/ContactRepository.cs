using Dapper;
using Entity;
using Entity.ExceptionManagement;
using Infrastructure;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Repository
{
    public class ContactRepository : BaseRepository, IContactRepository
    {
        #region Constructor
        public ContactRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
        #endregion Constructor

        #region Public Function
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Contact> GetContactList()
        {
            List<Contact> contactList = new List<Contact>();
            using (var transaction = new TransactionScope(TransactionScopeOption.Suppress,
                                     new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted }))
            {
                using (IDbConnection connection = new SqlConnection(DatabaseConnectionString))
                {
                    contactList = connection.Query<Contact>("[dbo].[sp_ContactGet]",
                                                commandType: CommandType.StoredProcedure).ToList();
                }
            }
            return contactList;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contact"></param>
        /// <returns></returns>
        public ResultStatus InsertContactDetails(Contact contact)
        {
            var resultStatus = new ResultStatus();
            using (var transaction = new TransactionScope(TransactionScopeOption.Suppress,
                                     new TransactionOptions
                                     {
                                         IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted
                                     }))
            {
                using (IDbConnection connection = new SqlConnection(DatabaseConnectionString))
                {
                    resultStatus = connection.Query<ResultStatus>("[dbo].[sp_ContactInsert]",
                                                new
                                                {
                                                    FirstName = contact.FirstName,
                                                    LastName = contact.LastName,
                                                    Email = contact.Email,
                                                    PhoneNumber = contact.PhoneNumber,
                                                    ContactStatus = contact.Status
                                                },
                                                commandType: CommandType.StoredProcedure).Single();
                }
            }
            return resultStatus;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contact"></param>
        /// <returns></returns>
        public ResultStatus UpdateContactDetails(Contact contact)
        {
            var resultStatus = new ResultStatus();
            using (var transaction = new TransactionScope(TransactionScopeOption.Suppress,
                                     new TransactionOptions
                                     {
                                         IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted
                                     }))
            {
                using (IDbConnection connection = new SqlConnection(DatabaseConnectionString))
                {
                    resultStatus = connection.Query<ResultStatus>("[dbo].[sp_ContactUpdate]",
                                                new
                                                {
                                                    ContactId = contact.ContactId,
                                                    FirstName = contact.FirstName,
                                                    LastName = contact.LastName,
                                                    Email = contact.Email,
                                                    PhoneNumber = contact.PhoneNumber,
                                                    ContactStatus = contact.Status
                                                },
                                                commandType: CommandType.StoredProcedure).Single();
                }
            }
            return resultStatus;
        }

        public ResultStatus DeleteContactDetails(int contactId)
        {
            var resultStatus = new ResultStatus();
            using (var transaction = new TransactionScope(TransactionScopeOption.Suppress,
                                     new TransactionOptions
                                     {
                                         IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted
                                     }))
            {
                using (IDbConnection connection = new SqlConnection(DatabaseConnectionString))
                {
                    resultStatus = connection.Query<ResultStatus>("[dbo].[sp_ContactDelete]",
                                                new
                                                {
                                                    ContactId = contactId

                                                },
                                                commandType: CommandType.StoredProcedure).Single();
                }
            }
            return resultStatus;
        }
        #endregion Public Function
    }
}
