using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ProjectTalentOnboarding.Models;

namespace ProjectTalentOnboarding.DataAccessLayer
{
    public class SaleData
    {
        SalesEntities dbContext = new SalesEntities();

        // GET Sales
        public IEnumerable<SaleDTO> GetAllSales()
        {
            try
            {
                var list = dbContext.Sales.Select(x => new SaleDTO
                {
                    SaleId = x.SaleId,
                    CId = x.CId,
                    PId = x.PId,
                    SId = x.SId,
                    CName = x.Customer.CName,
                    PName = x.Product.PName,
                    SName = x.Store.SName,
                    DateSold = x.DateSold,
                }).ToList();                

                return list;
            }
            catch
            {
                throw;
            }
        }        
        // GET Customers
        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                var list = dbContext.Customers.AsEnumerable().Select(x => new Customer
                {
                    CId = x.CId,
                    CName = x.CName,
                    CAddress = x.CAddress,
                });
                return list;
            }
            catch
            {
                throw;
            }
        }
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
        // CREATE Sale
        public Sale AddSale(Sale sale)
        {
                var addedSale = dbContext.Sales.Add(sale);
                dbContext.SaveChanges();
                return addedSale;
            
        }
        // UPDATE Sale
        public bool UpdateSale(Sale sale)
        {
            try
            {
                dbContext.Entry(sale).State = EntityState.Modified;
                dbContext.SaveChanges();
                return true;
            }
            catch
            {
                throw;
            }
        }
        // DELETE Sale
        public Sale DeleteSale(int Id)
        {
            try
            {
                Sale sale = dbContext.Sales.Find(Id);
                dbContext.Sales.Remove(sale);
                dbContext.SaveChanges();
                return sale;
            }
            catch
            {
                throw;
                
            }
        }
    }
}