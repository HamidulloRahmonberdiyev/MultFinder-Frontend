import { useRef, useEffect, useState } from "react";

const SearchInput = ({ value, onChange, onFocus, onBlur, isFocused }) => {
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "uz-UZ"; 
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onChange({ target: { value: transcript } });
      inputRef.current?.focus();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onChange]);

  const handleMicClick = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      alert(
        "Sizning brauzeringiz ovozli qidiruvni qo‘llab-quvvatlamaydi. Iltimos, Chrome yoki Edge brauzeridan foydalaning."
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        setIsListening(true);
        recognition.start();
      } catch (e) {
        console.error(e);
        setIsListening(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className={`flex items-center w-full px-5 py-3 rounded-full border transition-all duration-200 ${
        isFocused
          ? "shadow-lg border-blue-500 bg-white dark:bg-gray-800 dark:border-blue-400"
          : "shadow-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-lg"
      }`}
    >
      <svg
        className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Multfilm qidiring..."
        className="flex-1 outline-none text-base text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
        aria-label="Multfilm qidiruvi"
      />
      {value && (
        <button
          onClick={() => {
            onChange({ target: { value: "" } });
            inputRef.current?.focus();
          }}
          className="ml-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Tozalash"
        >
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <button
        type="button"
        onClick={handleMicClick}
        className={`ml-3 p-1 rounded-full transition-colors ${
          isListening
            ? "bg-red-100 dark:bg-red-900 text-red-500"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        aria-label="Ovozli qidiruv"
      >
        <svg
          className={`w-5 h-5 transition-colors ${
            isListening
              ? "text-red-500 dark:text-red-400"
              : "text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;

