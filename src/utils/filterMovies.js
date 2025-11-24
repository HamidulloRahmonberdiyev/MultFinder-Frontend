export const filterMovies = (movies, searchQuery) => {
  if (!searchQuery) return movies;
  
  const query = searchQuery.toLowerCase();
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.studio.toLowerCase().includes(query)
  );
};

export const filterSearchResults = (results, query) => {
  if (!query) return [];
  
  const searchQuery = query.toLowerCase();
  return results.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery) ||
      movie.studio.toLowerCase().includes(searchQuery)
  );
};

