import React from "react";
import { Card, CardContent, CardActions, Typography, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CardProps {
  heading: string;
  company: string;
  email: string;
  expiryDate: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const InfoCard: React.FC<CardProps> = ({ heading, company, email, expiryDate, onEdit, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: "black", color: "white", p: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {heading}
        </Typography>
        <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton color="inherit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="inherit" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
        <Typography variant="h6" fontWeight="bold">
          {company}
        </Typography>
        <Typography variant="body2">Email</Typography>
        <Typography variant="body1" fontWeight="bold">
          {email}
        </Typography>
        <Typography variant="body2">Lease Expire in</Typography>
        <Typography variant="body1" fontWeight="bold">
          {expiryDate}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary">
          Renew
        </Button>
        <Button variant="outlined" color="secondary">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default InfoCard;
