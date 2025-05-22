import { Button, Container, styled, Typography } from "@mui/material";
import "./App.css";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const query = useRef(""); // Default query
  const pageNumber = useRef(1);
  const PAGE_SIZE = 5;

  async function loadData(currentCategory) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${
        query.current
      }&category=${currentCategory}&page=${
        pageNumber.current
      }&pageSize=${PAGE_SIZE}&country=us&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );
    const data = await response.json();
    if (data.status === "error") throw new Error("Error");
    return data.articles.map((article) => {
      const { title, author, publishedAt, description, urlToImage, url } = article;
      return {
        title,
        author,
        publishedAt,
        description,
        urlToImage,
        url,
      };
    });
  }

  const fetchAndUpdateArticles = (currentCategory) => {
    setError("");
    setLoading(true);
    loadData(currentCategory ?? category)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  // Debounce the loadData function to prevent excessive API calls
  const debouncedLoadData = debounce(fetchAndUpdateArticles, 500);

  const handlerChangeQuery = (newQuery) => {
    pageNumber.current = 1; // Reset to the first page when the query changes
    query.current = newQuery;
    debouncedLoadData();
  };

  const handlePreviousClick = () => {
    if (pageNumber.current > 1) {
      pageNumber.current -= 1;
      fetchAndUpdateArticles();
    }
  };

  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };

  return (
    <Container>
      <NewsHeader
        onChangeQuery={handlerChangeQuery}
        onCategoryChange={handleCategoryChange}
        category={category}
      />
      {error.length === 0 ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={loading || articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
