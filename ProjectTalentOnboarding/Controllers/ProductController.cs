using System.Web.Mvc;
using ProjectTalentOnboarding.DataAccessLayer;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.Controllers
{
    public class ProductController : Controller
    {
        ProductData objproduct = new ProductData();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        // GET: All Products
        public JsonResult GetProductList()
        {
            var products = objproduct.GetAllProducts();
            return Json(products, JsonRequestBehavior.AllowGet);
        }
        // POST: Save New Product
        public JsonResult CreateProduct(Product pro)
        {
            var product = objproduct.AddProduct(pro);
            return Json(product, JsonRequestBehavior.AllowGet);
        }
        // POST: Update Product
        public JsonResult EditProduct(Product pro)
        {
            var product = objproduct.UpdateProduct(pro);
            return Json(product, JsonRequestBehavior.AllowGet);
        }
        // REMOVE: Delete Product
        public JsonResult Delete(int Id)
        {
            var product = objproduct.DeleteProduct(Id);
            return Json(product, JsonRequestBehavior.AllowGet);
        }
    }
}