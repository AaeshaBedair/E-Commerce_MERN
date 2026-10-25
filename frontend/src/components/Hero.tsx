import { Box } from "@mui/material";

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="/images/Hero.png"
        alt="ELVÉORA Perfume Collection"
        sx={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />
    </Box>
  );
};

export default Hero;
