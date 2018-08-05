namespace ProductShop.App
{
    using AutoMapper;

    using Data;
    using Models;
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.IO;

    public class StartUp
    {
        public static void Main(string[] args)
        {
            //ImportData.ImportUsers();
            //ImportData.ImportProducts();
            //ImportData.ImportCategories();
            //ImportData.ImportCategoryProducts();

            //QueryAndExportData.Q1ProductsInRange();
            //QueryAndExportData.Q2SuccessfullySoldProducts();
            //QueryAndExportData.Q3CategoriesByProductsCount();
            QueryAndExportData.Q4UsersAndProducts();

        }
    }
}
