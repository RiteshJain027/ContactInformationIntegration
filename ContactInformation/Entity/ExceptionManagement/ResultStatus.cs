using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.ExceptionManagement
{
    public class ResultStatus
    {
        /// <summary>
        /// Id- Can be used to get last inserted id.
        /// </summary>
        public int? Id { get; set; }

        /// <summary>
        /// Status Code.
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Status.
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Error Message.
        /// </summary>
        public string ErrorMessage { get; set; }        
    }
}
