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
      placeholder="Search fragrances..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        maxWidth: 500,
        bgcolor: "#FFFFFF",
        "& .MuiOutlinedInput-root": {
          borderRadius: 0,
        },
      }}
    />
  );
};

export default ProductSearch;
