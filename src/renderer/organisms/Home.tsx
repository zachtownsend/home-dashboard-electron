import { Button, Grid } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CommuteIcon from '@mui/icons-material/Commute';
import EventIcon from '@mui/icons-material/Event';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate, useNavigation } from 'react-router-dom';

function MainButton({ children, onClick }: any) {
  return (
    <Button
      variant="outlined"
      style={{ width: '100%', height: '100%' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} style={{ height: '100%' }}>
      <Grid item xs={6}>
        <MainButton
          onClick={() => {
            navigate('/commute');
          }}
        >
          <CommuteIcon />
        </MainButton>
      </Grid>
      <Grid item xs={6}>
        <MainButton>
          <WbSunnyIcon />
        </MainButton>
      </Grid>
      <Grid item xs={6}>
        <MainButton>
          <EventIcon />
        </MainButton>
      </Grid>
      <Grid item xs={6}>
        <MainButton>
          <TaskAltIcon />
        </MainButton>
      </Grid>
    </Grid>
  );
}

export default Home;
