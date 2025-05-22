import {CardActionArea, CardContent, Box, Skeleton } from "@mui/material";
import { StyledCard } from "./StyledCard";
function LoadingArticle() {
  return (
    <StyledCard>
      <CardActionArea>
        <Skeleton variant="image" height={200}></Skeleton>
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }}></Skeleton>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }}></Skeleton>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton
          variant="text"
          width={200}
          sx={{ fontSize: "1.5rem" }}
        ></Skeleton>
        <Skeleton
          variant="text"
          width={200}
          sx={{ fontSize: "1.5rem" }}
        ></Skeleton>
      </Box>
    </StyledCard>
  );
}

export default LoadingArticle;
