using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ReactCrudSample.Models;

namespace ReactCrudSample.DataAccessLayer
{
    public class CustomerData
    {
        SalesEntities dbContext = new SalesEntities();

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
        // CREATE Customer
        public Customer AddCustomer(Customer cust)
        {
            try
            {
                var addedCustomer = dbContext.Customers.Add(cust);
                dbContext.SaveChanges();
                return addedCustomer;
            }
            catch
            {
                throw;
            }
        }
        // UPDATE Customer
        public bool UpdateCustomer(Customer cust)
        {
            try
            {
                dbContext.Entry(cust).State = EntityState.Modified;
                dbContext.SaveChanges();
                return true;
            }
            catch
            {
                throw;
            }
        }
        // DELETE Customer
        public bool DeleteCustomer(int Id)
        {
            try
            {
                var cust = dbContext.Customers.Find(Id);
                dbContext.Customers.Remove(cust);
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