import { Button } from "@mui/material";

interface RenewButtonProps {
    label: string;
    onClick?: () => void; // Accept an optional onClick function
}
  

const RenewButton: React.FC<RenewButtonProps>  = ({ label, onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "#EDFF90", 
        color: "#212429",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "none",
        borderRadius: "8px",
        padding: "8px 16px 8px 16px",
        minWidth: "80px",
        maxWidth: "100px",
        height: "32px",
        "&:hover": {
          backgroundColor: "#E0F080",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default RenewButton;
