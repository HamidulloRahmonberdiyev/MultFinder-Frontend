import { useState, useEffect, useRef } from "react";
import SearchInput from "./search/SearchInput";
import SearchResults from "./search/SearchResults";
import { useClickOutside } from "../hooks/useClickOutside";
import StoriesBar from "./ui/StoriesBar";

const SearchBar = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef(null);
  
  const resultsRef = useClickOutside(() => setShowResults(false), showResults);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!value.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://apimultifinder.unicrm.org/api/search/films?name=${encodeURIComponent(value)}`
        );
        const data = await response.json();
        
        if (data.success && data.data) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search API error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); 

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [value]);

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
          <SearchResults 
            results={searchResults} 
            onSelect={handleSelect}
            isLoading={isLoading}
          />
        </div>
      )}

      {!value && <StoriesBar value={value} />}
    </div>
  );
};

export default SearchBar;
