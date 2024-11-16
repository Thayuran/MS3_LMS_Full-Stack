using LMS_Application.Models;

namespace LMS_Application.Services.IServices
{
    public interface IProductService
    {
        IEnumerable<Product> GetAllProducts();
        Product GetProductById(int id);
        void AddProduct(Product product);
        bool UpdateProduct(int id, Product product);
        bool DeleteProduct(int id);
        bool AddBulkProducts(IFormFile file);
    }
}
