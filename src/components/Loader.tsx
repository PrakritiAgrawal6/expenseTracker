import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
