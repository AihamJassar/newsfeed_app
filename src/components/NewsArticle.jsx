import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledCard } from "./StyledCard";
import styled from "styled-components";
const Link = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));
function NewsArticle(props) {
  const { urlToImage, title, author, publishedAt, description, url } = props;
  return (
    <StyledCard>
      <a target="_blank" href={url}>
        <CardActionArea>
          {urlToImage && (
            <CardMedia
              component="img"
              height="200"
              image={urlToImage}
              alt="Sample article"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}

export default NewsArticle;
