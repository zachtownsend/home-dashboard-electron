import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CommuteScreen() {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Typography variant="body1">Commute screen will go here</Typography>
      <Button onClick={() => navigate('/')}>Go back</Button>
    </Grid>
  );
}

export default CommuteScreen;
