import { Trans } from '@lingui/macro';
import { Box, Checkbox, Typography } from '@mui/material';
import { Settings } from '~/api/Settings/api';
import { newSettingsProps } from '../SettingsView';

type CheckboxProps = {
  name: string;
  checked: boolean;
  onClick: () => void;
};

const CheckboxOption = ({ name, checked, onClick }: CheckboxProps) => (
  <Box display="flex" alignItems="center">
    <Checkbox checked={checked} onClick={onClick} />
    <Typography>{name}</Typography>
  </Box>
);

type Props = {
  handleClick: (newSettings: newSettingsProps) => void;
  settings: Settings | undefined;
};

export const RouteSection = ({ settings, handleClick }: Props) => {
  return (
    <>
      <Typography fontWeight={'medium'}>
        <Trans>Routes</Trans>:
      </Typography>
      {Object.entries(settings!.routes).map(([routeName, isChecked]) => (
        <CheckboxOption
          key={routeName}
          name={routeName}
          checked={isChecked}
          onClick={() =>
            handleClick({
              routes: { ...settings!.routes, [routeName]: !isChecked },
            })
          }
        />
      ))}
    </>
  );
};
