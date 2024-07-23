import { ProjectStatus } from "~/api/Projects/api";

export const deriveBarColor = (completion: ProjectStatus) => {
    switch (completion) {
      case ProjectStatus.OnHold:
        return 'inherit';
      case ProjectStatus.Done:
        return 'success';
      default:
        return 'info';
    }
  };