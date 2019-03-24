using System.Web.Mvc;
using ProjectTalentOnboarding.DataAccessLayer;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.Controllers
{
    public class CustomerController : Controller
    {
        CustomerData objcustomer = new CustomerData();

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }      
        
        public JsonResult GetCustomerList()
        {
            var customers = objcustomer.GetAllCustomers();
            return Json(customers, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult CreateCustomer(Customer cust)
        {
            var customer = objcustomer.AddCustomer(cust);
            return Json(customer, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult EditCustomer(Customer cust)
        {
            var customer = objcustomer.UpdateCustomer(cust);
            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Delete(int Id)
        {
            var customer = objcustomer.DeleteCustomer(Id);
            return Json(customer, JsonRequestBehavior.AllowGet);
        }
    }
}