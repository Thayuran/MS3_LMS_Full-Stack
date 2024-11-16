namespace LMS_Application.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
