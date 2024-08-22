using backend.Models;

namespace backend.Dto.Groups
{
    public class GroupByIdDto
    {
        public int GroupID { get; set; }
        public required string GroupName { get; set; }
        public virtual List<GroupUsersDto>? Users { get; set; }
    }
}
