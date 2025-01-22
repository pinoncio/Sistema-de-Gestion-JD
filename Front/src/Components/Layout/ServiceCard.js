import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const ServiceCard = ({ title, description }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        Ver más
      </Button>
    </CardActions>
  </Card>
);

export default ServiceCard;
