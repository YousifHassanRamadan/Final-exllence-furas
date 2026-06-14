import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ChevronRight } from "lucide-react";

const MapUl = ({ isMid, arr, header }) => {
  return (
    <Grid item xs={12} md={3} sx={{ textAlign: isMid ? "center" : "left" }}>
      {/**Header Ul */}
      <div className="header">
        <Typography
          variant="h6"
          ml={0.5}
          fontWeight="bold"
          gutterBottom
          className="text-[#51586f]"
        >
          {header}
        </Typography>
      </div>

      <div className="w-[30px] h-[1px] bg-[#87888e] mb-5 ml-1"></div>

      {/**ul items */}
      {arr.map((item) => (
        <Link
          key={item}
          href={null}
          color="textSecondary"
          display="block"
          sx={{
            cursor: "pointer",
            mb: 1,
            textDecoration: "none",
            "&:hover": { color: "primary.main" },
          }}
        >
          <div className=" hover:outline-none hover:outline-white hover:text-[#2b7fff] text-[#5E77A0]  transition-all duration-300 hover:ml-2">
            <span className=" cursor-pointer text-md font-semibold  items-center gap-2 flex">
              <ChevronRight className="w-4 h-4" /> {item}
            </span>
          </div>
        </Link>
      ))}
    </Grid>
  );
};

export default MapUl;
