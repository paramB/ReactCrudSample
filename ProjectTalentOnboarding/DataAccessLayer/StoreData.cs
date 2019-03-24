using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.DataAccessLayer
{
    public class StoreData
    {
        SalesEntities dbContext = new SalesEntities();

        // GET Stores
        public IEnumerable<Store> GetAllStores()
        {
            try
            {
                var list = dbContext.Stores.AsEnumerable().Select(x => new Store
                {
                    SId = x.SId,
                    SName = x.SName,
                    SAddress = x.SAddress,
                });
                return list;
            }
            catch
            {
                throw;
            }
        }
        // CREATE Store
        public Store AddStore(Store store)
        {
            try
            {
                var addedStore = dbContext.Stores.Add(store);
                dbContext.SaveChanges();
                return addedStore;
            }
            catch 
            {
                throw;
            }
        }
        // UPDATE Store
        public bool UpdateStore(Store store)
        {
            try
            {
                dbContext.Entry(store).State = EntityState.Modified;
                dbContext.SaveChanges();
                return true;
            }
            catch
            {
                throw;
            }
        }
        // DELETE Store
        public bool DeleteStore(int Id)
        {
            try
            {
                Store store = dbContext.Stores.Find(Id);
                dbContext.Stores.Remove(store);
                dbContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return false;
            }
        }
    }
}