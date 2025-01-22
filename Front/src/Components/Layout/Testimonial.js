import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Testimonial = ({ name, profession, message }) => (
  <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h6">{name}</Typography>
    <Typography variant="body2" color="text.secondary">{profession}</Typography>
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body1" fontStyle="italic">"{message}"</Typography>
    </Box>
  </Paper>
);

export default Testimonial;
