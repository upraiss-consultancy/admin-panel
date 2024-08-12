import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const InvoiceTemplate = ({ packageDetails }) => {
  return (
    <Box id="invoice" sx={{ padding: 4, maxWidth: 600, margin: 'auto', border: '1px solid #ddd' }}>
      <Typography variant="h4" gutterBottom>
        Invoice
      </Typography>
      <List>
        {packageDetails.map((detail, index) => (
          <ListItem key={index} sx={{ padding: 0 }}>
            <ListItemText primary={`${detail.name}: ${detail.value}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default InvoiceTemplate;
