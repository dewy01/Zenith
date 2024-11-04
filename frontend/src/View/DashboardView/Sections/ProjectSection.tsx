import { Trans } from '@lingui/macro';
import {
  Box,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { NavLink } from 'react-router-dom';
import { getProjectsDashboard } from '~/api/Dashboard/query';
import { ProjectAvatar } from '~/component/ProjectAvatar';
import { formatDate } from '~/utils/dateTime';
import { deriveBarColor } from '~/utils/deriveBarColor';
import { deriveProjectStatus } from '~/utils/deriveProjectStatus';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { ProjectDashboard } from './../../../api/Dashboard/api';

const pieParams = {
  height: 200,
  width: 200,
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};

export const ProjectSection = () => {
  const { data, isLoading } = getProjectsDashboard();

  if (!data || isLoading) return <LoadingView />;

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingY: 2,
        paddingX: 4,
        gap: 1,
        justifyContent: 'center',
      }}
    >
      <Box display="flex" gap={2}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          alignItems="center"
        >
          <Typography variant="h6">
            <Trans>Upcoming projects</Trans>
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: data.projectsCountByStatus['OnHold'],
                    label: 'on Hold',
                    color: 'lightgray',
                  },
                  {
                    id: 1,
                    value: data.projectsCountByStatus['InProgress'],
                    label: 'in Progress',
                    color: 'royalblue',
                  },
                  {
                    id: 2,
                    value: data.projectsCountByStatus['Done'],
                    label: 'Done',
                    color: 'lightgreen',
                  },
                ],
              },
            ]}
            {...pieParams}
          />
        </Box>
        <Box>
          {data.projects.map((item) => (
            <ProjectTask key={item.projectID} project={item} />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

const ProjectTask = ({ project }: { project: ProjectDashboard }) => {
  return (
    <Box key={project.projectID}>
      <ProjectCard project={project} />
      <Tooltip
        arrow
        title={<Typography>{project.completionPercentage}%</Typography>}
      >
        <LinearProgress
          sx={{
            width: '92%',
            marginTop: -1,
            marginBottom: 2,
            marginLeft: 2,
            padding: 0.5,
          }}
          color={deriveBarColor(project.status)}
          variant="determinate"
          value={project.completionPercentage}
        />
      </Tooltip>
      <Divider variant="middle" />
    </Box>
  );
};

const ProjectCard = ({ project }: { project: ProjectDashboard }) => {
  return (
    <ListItem sx={{ width: '400px' }}>
      <List sx={{ flex: 1 }}>
        <Box
          component={NavLink}
          to={`/projects/${project.projectID}`}
          sx={{ textDecoration: 'none' }}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <ProjectAvatar name={project.title} />
          <ListItemText
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              color: theme.palette.text.primary,
              '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: theme.palette.text.secondary,
              },
            })}
            primary={
              <Typography fontSize={18} fontWeight={500}>
                {project.title}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {project.description}
              </Typography>
            }
          />
        </Box>
      </List>

      <Box display="flex" gap={2}>
        <Stack alignItems={'end'}>
          <Typography color="text.secondary">
            {deriveProjectStatus(project.status)}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.error.light,
            })}
            variant="caption"
          >
            {formatDate(project.deadline)}
          </Typography>
        </Stack>
      </Box>
    </ListItem>
  );
};
