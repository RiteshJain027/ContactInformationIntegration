using Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class BaseRepository
    {
        #region Private Variables

        private string _dbConnectionString;

        #endregion Private Variables

        #region Constructors

        public BaseRepository(IConnectionFactory connectionFactory)
        {
            _dbConnectionString = connectionFactory.DatabaseConnectionString;
        }

        #endregion Constructors

        #region Public Properties

        /// <summary>
        /// Database connection string
        /// </summary>
        public string DatabaseConnectionString
        {
            get { return _dbConnectionString; }
        }

        #endregion Public Properties
    }
}
