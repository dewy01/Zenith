import { Trans, t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { SearchField } from '~/component/SearchField';
import { ProjectList } from './ProjectList';

export const ProjectTab = () => {
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
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        gap={2}
        sx={{ padding: 4 }}
      >
        <Typography variant="h5">
          <Trans>Explore projects</Trans>
        </Typography>
        <Box display={'flex'} gap={2}>
          <SearchField
            onChange={handleFilter}
            placeholder={t({ message: 'Search projects' })}
          />
        </Box>
      </Box>
      <ProjectList
        query={{ pageNumber: pageNumber, pageSize: pageSize, filter: filter }}
        handlePageChange={onPageChange}
        pageNumber={pageNumber}
      />
    </>
  );
};
