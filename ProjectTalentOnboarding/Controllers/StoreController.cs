using System.Web.Mvc;
using ProjectTalentOnboarding.DataAccessLayer;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.Controllers
{
    public class StoreController : Controller
    {
        StoreData objstore = new StoreData();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }
        
        // GET: All Stores
        public JsonResult GetStoreList()
        {
            var stores = objstore.GetAllStores();
            return Json(stores, JsonRequestBehavior.AllowGet);
        }

        // POST: Save New Store
        public JsonResult CreateStore(Store store)
        {
            var addStore = objstore.AddStore(store);
            return Json(addStore, JsonRequestBehavior.AllowGet);
        }

        // POST: Update Store
        public JsonResult EditStore(Store store)
        {
            var updateStore = objstore.UpdateStore(store);
            return Json(updateStore, JsonRequestBehavior.AllowGet);
        }

        // REMOVE: Delete Store
        public JsonResult Delete(int Id)
        {
            var delStore = objstore.DeleteStore(Id);
            return Json(delStore, JsonRequestBehavior.AllowGet);
        }
    }
}