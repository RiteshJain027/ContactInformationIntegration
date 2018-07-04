using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactInformation.Controllers
{	
    public class ApiBaseController : ApiController
    {

        protected string STATUS_SUCCESS = "Success";
        protected string STATUS_FAIL = "Fail";

        #region Constructor

        public ApiBaseController()
        {            
        }

		#endregion Constructor

		public HttpResponseMessage Options()
		{
			return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
		}
	}
}
