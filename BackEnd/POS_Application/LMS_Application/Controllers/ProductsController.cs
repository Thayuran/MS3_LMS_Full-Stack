using LMS_Application.Models;
using LMS_Application.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_productService.GetAllProducts());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null) return NotFound();

            return Ok(product);
        }

       /* [HttpPost]
        public IActionResult Create([FromBody] Product product)
        {
            _productService.AddProduct(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }*/


        // Add single product - Cashier and Manager
        [HttpPost("add-single")]
        [Authorize(Roles = "Cashier,Manager")]
        public IActionResult AddSingleProduct([FromBody] Product product)
        {
            _productService.AddProduct(product);
            return CreatedAtAction(nameof(GetAll), new { id = product.Id }, product);
        }

        // Add bulk products - Manager only
        [HttpPost("add-bulk")]
        [Authorize(Roles = "Manager")]
        public IActionResult AddBulkProducts([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file.");

            var result = _productService.AddBulkProducts(file);
            return Ok(result);
        }
    



    [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product product)
        {
            if (!_productService.UpdateProduct(id, product)) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_productService.DeleteProduct(id)) return NotFound();

            return NoContent();
        }
    }
}
