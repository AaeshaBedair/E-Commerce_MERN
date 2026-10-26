import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ProductSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const ProductSearch = ({ search, onSearchChange }: ProductSearchProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Discover your signature scent..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#A47C58", fontSize: 21 }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        maxWidth: 750,
        bgcolor: "#FFFFFF",
        "& .MuiOutlinedInput-root": {
          height: 52,
          borderRadius: 0,
          fontSize: "14px",
          color: "#33251C",
          letterSpacing: "0.3px",
          transition: "all 0.25s ease",

          "& fieldset": {
            borderColor: "#D9C9B8",
            borderWidth: "1px",
          },

          "&:hover fieldset": {
            borderColor: "#A47C58",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#A47C58",
            borderWidth: "1px",
          },
        },

        "& .MuiInputBase-input::placeholder": {
          color: "#998C82",
          opacity: 1,
        },
      }}
    />
  );
};

export default ProductSearch;
