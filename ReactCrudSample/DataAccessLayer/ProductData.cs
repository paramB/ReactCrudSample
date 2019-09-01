using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ReactCrudSample.Models;

namespace ReactCrudSample.DataAccessLayer
{
    public class ProductData
    {
        SalesEntities dbContext = new SalesEntities();

        // GET Products
        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                var list = dbContext.Products.AsEnumerable().Select(x => new Product
                {
                    PId = x.PId,
                    PName = x.PName,
                    Price = x.Price,
                });
                return list;
            }
            catch
            {
                throw;
            }
        }
        // CREATE Product
        public Product AddProduct(Product pro)
        {
            try
            {
                var addedProduct = dbContext.Products.Add(pro);
                dbContext.SaveChanges();
                return addedProduct;
            }
            catch
            {
                throw;
            }
        }
        // UPDATE Product
        public bool UpdateProduct(Product pro)
        {
            try
            {
                dbContext.Entry(pro).State = EntityState.Modified;
                dbContext.SaveChanges();
                return true;
            }
            catch
            {
                throw;
            }
        }
        // DELETE Product
        public bool DeleteProduct(int Id)
        {
            try
            {
                Product pro = dbContext.Products.Find(Id);
                dbContext.Products.Remove(pro);
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