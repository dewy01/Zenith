export const deriveBarColor = (completion: string) => {
    switch (completion) {
      case 'on Hold':
        return 'inherit';
      case 'Done':
        return 'success';
      default:
        return 'info';
    }
  };