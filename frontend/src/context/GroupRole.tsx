import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GroupRole } from '~/api/Group/api';
import { isAdmin } from '~/utils/useGroupRoles';

interface IGroupContext {
  userRole: GroupRole;
  isGranted: boolean;
  isModerator: boolean;
  setUserRole: (role: GroupRole) => void;
}

const GroupContext = createContext<IGroupContext>({
  userRole: GroupRole.User,
  isGranted: false,
  isModerator: false,
  setUserRole: () => {},
});

export const useGroupContext = () => useContext(GroupContext);

type Props = { children: ReactNode };

export const GroupProvider = ({ children }: Props) => {
  const [userRole, setUserRole] = useState<GroupRole>(GroupRole.User);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(false);

  useEffect(() => {
    setIsGranted(isAdmin(userRole));
    setIsModerator(userRole >= 1 ? true : false);
  }, [userRole]);

  return (
    <GroupContext.Provider
      value={{ userRole, isGranted, isModerator, setUserRole }}
    >
      {children}
    </GroupContext.Provider>
  );
};
