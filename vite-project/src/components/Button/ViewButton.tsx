import { Button } from "@mui/material";

interface ViewButtonProps {
    label: string;
    onClick?: () => void; 
}
  
const ViewButton: React.FC<ViewButtonProps>  = ({ label, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: "#212429",
        fontSize: "12px",
        textTransform: "none",
        borderRadius: "8px",
        fontWeight: 700,
        padding: "8px 16px 8px 16px",
        minWidth: "100px",
        maxWidth: "150px",
        height: "32px",
        border: "1px solid", 
        borderColor: "primary.main", 
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default ViewButton;
