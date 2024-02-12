namespace backend.Models
{
    public class TaskCategory
    {
        public int CategoryID { get; set; }
        public int UserID { get; set; }
        public string CategoryName { get; set; }


        public virtual User User { get; set; }

    }
}
