const { Container, Box, Paper, Grid, Avatar } = require("@mui/material");

function Profile() {
  return (
    <Paper>
      <Grid container spacing={2}  direction="column">
        <Grid item >
          <Avatar src="https://mui.com/static/images/avatar/1.jpg"/>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;
