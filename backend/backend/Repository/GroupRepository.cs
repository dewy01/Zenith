using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using System.Collections.Generic;
using System.Linq;

namespace backend.Repository
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DataContext _context;

        public GroupRepository(DataContext context)
        {
            _context = context;
        }

        public Group GetGroupById(int groupId)
        {
            var result = _context.Groups.FirstOrDefault(g => g.GroupID == groupId);

            if (result == null)
            {
                throw new NotFoundException("Group not found");
            }

            return result;
        }

        public List<Group> GetAllGroups()
        {
            return _context.Groups.ToList();
        }

        public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
            _context.SaveChanges();
        }

        public void UpdateGroup(Group group)
        {
            _context.Groups.Update(group);
            _context.SaveChanges();
        }

        public void DeleteGroup(int groupId)
        {
            var group = _context.Groups.Find(groupId);
            if (group != null)
            {
                _context.Groups.Remove(group);
                _context.SaveChanges();
            }
        }
    }
}
