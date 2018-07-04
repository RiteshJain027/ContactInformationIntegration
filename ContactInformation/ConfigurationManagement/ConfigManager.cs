using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationManagement
{
    public class ConfigManager
    {
        #region Database Configurations

        /// <summary>
        /// Database connection string.
        /// </summary>
        public static string DatabaseConnectionString
        {
            get
            {
                //return string.Empty;
                return ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                
            }
        }

        
        #endregion Database Configurations
    }
}
