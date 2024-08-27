import React from 'react';
import { Container, Typography, Grid, Paper, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';

const ApplicantDetailView = () => {
    const applicant = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        profileImage: 'https://via.placeholder.com/150', // Replace with actual image URL
        licenseNumber: 'DL12345678',
        experience: 5,
        vehicleType: 'Sedan',
        applicationDate: '2024-08-20',
        additionalInfo: 'John has extensive experience in city driving and long-haul trips.'
      };
  return (
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          {/* Applicant Basic Info */}
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <Avatar 
              src={applicant.profileImage} 
              alt={applicant.name} 
              style={{ width: '120px', height: '120px', margin: 'auto' }} 
            />
            <Typography variant="h5" style={{ marginTop: '10px' }}>
              {applicant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {applicant.email}
            </Typography>
          </Grid>

          {/* Applicant Details */}
          <Grid item xs={12} md={8}>
            <List>
              <ListItem>
                <ListItemText primary="Phone" secondary={applicant.phone} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="License Number" secondary={applicant.licenseNumber} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Experience" secondary={`${applicant.experience} years`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Vehicle Type" secondary={applicant.vehicleType} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Application Date" secondary={applicant.applicationDate} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        
        {/* Additional Details */}
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="h6">Additional Information</Typography>
        <Typography variant="body2" color="textSecondary">
          {applicant.additionalInfo || 'No additional information provided.'}
        </Typography>
      </Paper>

  );
};

export default ApplicantDetailView;
