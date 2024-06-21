import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { DialogCreate } from './DialogCreate';
import { SearchField } from '~/component/SearchField';
import { Trans, t } from '@lingui/macro';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { ProjectList } from './ProjectList';

export const ProjectView = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState<string>('');
  const pageSize = 5;

  const onPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const handleFilter = useRef(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value);
      setPageNumber(1);
    }, 500),
  ).current;

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Trans>Projects</Trans>
          </Typography>
          <SearchField
            onChange={handleFilter}
            placeholder={t({ message: 'Search projects' })}
          />
          <DialogCreate />
        </Toolbar>
      </AppBar>
      <ProjectList
        query={{ pageNumber: pageNumber, pageSize: pageSize, filter: filter }}
        handlePageChange={onPageChange}
        pageNumber={pageNumber}
      />
    </Box>
  );
};
