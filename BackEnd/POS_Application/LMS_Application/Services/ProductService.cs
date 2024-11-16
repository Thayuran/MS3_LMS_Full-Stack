using CsvHelper;
using CsvHelper.Configuration;
using LMS_Application.Models;
using LMS_Application.Repositories.IRepositories;
using LMS_Application.Services.IServices;
using System.Formats.Asn1;
using System.Globalization;

namespace LMS_Application.Services
{
    public class ProductService:IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _productRepository.GetAllProducts();
        }

        public Product GetProductById(int id)
        {
            return _productRepository.GetProductById(id);
        }

        public void AddProduct(Product product)
        {
            _productRepository.AddProduct(product);
        }

        public bool AddBulkProducts(IFormFile file)
        {
            try
            {
                using var stream = new StreamReader(file.OpenReadStream());
                using var csv = new CsvReader(stream, new CsvConfiguration(CultureInfo.InvariantCulture));

                var products = csv.GetRecords<Product>().ToList();
                foreach (var product in products)
                {
                    _productRepository.AddProduct(product);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateProduct(int id, Product product)
        {
            return _productRepository.UpdateProduct(id, product);
        }

        public bool DeleteProduct(int id)
        {
            return _productRepository.DeleteProduct(id);
        }
    }
}


