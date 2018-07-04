using ConfigurationManagement;
using Infrastructure;
using Repository;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace ContactInformation.App_Start
{
    public class WebApiUnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            //Infrastructure
            container.RegisterType<IConnectionFactory, ConnectionFactory>();

            container.RegisterType<IContactRepository, ContactRepository>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}