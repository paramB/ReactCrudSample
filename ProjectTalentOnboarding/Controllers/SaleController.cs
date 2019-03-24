using System.Web.Mvc;
using ProjectTalentOnboarding.DataAccessLayer;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.Controllers
{
    public class SaleController : Controller
    {
        SaleData objsale = new SaleData();

        // GET: Sale
        public ActionResult Index()
        {
            return View();
        }
        // GET: All Sales
        public JsonResult GetSaleList()
        {
            var sales = objsale.GetAllSales();
            return Json(sales, JsonRequestBehavior.AllowGet);
        }
        // GET: All Customers
        public JsonResult GetCustomerList()
        {
            var customers = objsale.GetAllCustomers();
            return Json(customers, JsonRequestBehavior.AllowGet);
        }
        // GET: All Products
        public JsonResult GetProductList()
        {
            var products = objsale.GetAllProducts();
            return Json(products, JsonRequestBehavior.AllowGet);
        }
        // GET: All Stores
        public JsonResult GetStoreList()
        {
            var stores = objsale.GetAllStores();
            return Json(stores, JsonRequestBehavior.AllowGet);
        }
        // POST: Save New Sale
        public JsonResult CreateSale(Sale sale)
        {
            var sales = objsale.AddSale(sale);
            return Json(sales, JsonRequestBehavior.AllowGet);
        }
        // POST: Update Sale
        public JsonResult EditSale(Sale sale)
        {
            var sales = objsale.UpdateSale(sale);
            return Json(sales, JsonRequestBehavior.AllowGet);
        }
        // REMOVE: Delete Sale
        public JsonResult Delete(int Id)
        {
            var sale = objsale.DeleteSale(Id);
            return Json(sale, JsonRequestBehavior.AllowGet);
        }
    }
}