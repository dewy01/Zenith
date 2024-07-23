import { ProjectStatus } from "~/api/Projects/api";

export const deriveProjectStatus = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.OnHold:
        return 'on Hold';
      case ProjectStatus.Done:
        return 'Done';
      default:
        return 'in Progress';
    }
  };