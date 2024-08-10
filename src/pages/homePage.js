import React, { useState, useEffect } from "react";
import MovieList from "../components/movieList";
import SearchBar from "../components/Search/searchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { getRequest } from "../services/commonApi";
import { useHeaders } from "../hooks/useHeader";
import { useCustomToast } from "../hooks/useToast";
import Loader from "../components/Loader/loader";
import NoData from "../components/NoData/noData";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceDelay = 500;
  const headers = useHeaders();
  const { showToast } = useCustomToast();
  const [loading, setLoading] = useState(false);

  // Reset movies and page when query changes
  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setMovies([]);
      setPage(1);
      loadMovies();
    }, debounceDelay);

    return () => clearTimeout(handleDebounce);
  }, [query]);

  const errorHandler = (error) => {
    showToast(error, "error");
  };

  const fetchMovies = async (query, page) => {
    setLoading(true);
    const url = query
      ? `/search/movie?query=${query}&page=${page}`
      : `/discover/movie?page=${page}`;
    const response = await getRequest(url, headers, errorHandler);
    setLoading(false);
    if (!response) {
      // Return an empty array if the API call fails
      return [];
    }
    return response?.data ?? [];
  };

  const loadMovies = async () => {
    const data = await fetchMovies(query, page);
    setMovies((prev) =>
      page === 1 ? data?.results : [...prev, ...data?.results]
    );
    setHasMore(data?.page < data?.total_pages);
  };

  const fetchMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      loadMovies();
    }
  }, [page]);

  return (
    <div className="home-page">
      <SearchBar query={query} setQuery={setQuery} />
      <InfiniteScroll
        dataLength={movies?.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
      >
        {movies?.length > 0 ? (
          <MovieList movies={movies} />
        ) : loading ? (
          <Loader />
        ) : (
          <NoData />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
