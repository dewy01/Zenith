using backend.Models;

namespace backend.Dto
{
    public class GroupByIdDto
    {
        public int GroupID { get; set; }
        public string GroupName { get; set; }
        public virtual List<GroupUsersDto> Users { get; set; }
    }
}
