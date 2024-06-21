namespace backend.Dto.Pagination
{
    public class PaginationRequestDto
    {
        public int PageNumber { get; set; } = 1; 
        public int PageSize { get; set; } = 5;
        public string? Filter { get; set; }
    }
}
