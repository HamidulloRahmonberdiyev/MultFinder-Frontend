import { useState } from "react";
import SearchInput from "./search/SearchInput";
import SearchResults from "./search/SearchResults";
import { useClickOutside } from "../hooks/useClickOutside";
import { filterSearchResults } from "../utils/filterMovies";
import { SEARCH_RESULTS } from "../data/movies";
import StoriesBar from "./ui/StoriesBar";

const SearchBar = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const filteredResults = filterSearchResults(SEARCH_RESULTS, value);
  const resultsRef = useClickOutside(() => setShowResults(false), showResults);

  const handleChange = (e) => {
    onChange(e);
    setShowResults(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (value) setShowResults(true);
  };

  const handleSelect = (title) => {
    onChange({ target: { value: title } });
    setShowResults(false);
  };

  return (
    <div className="relative w-full">
      <SearchInput
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        isFocused={isFocused}
      />
      
      {showResults && value && (
        <div ref={resultsRef}>
          <SearchResults results={filteredResults} onSelect={handleSelect} />
        </div>
      )}

      {!value && <StoriesBar value={value} />}
    </div>
  );
};

export default SearchBar;
