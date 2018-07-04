using Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationManagement
{
    public class ConnectionFactory : IConnectionFactory
    {
        #region Public Properties

        /// <summary>
        /// Database connection string.
        /// </summary>
        public virtual string DatabaseConnectionString
        {
            get
            {
                return ConfigManager.DatabaseConnectionString;
            }
        }

        #endregion Public Properties
    }
}
