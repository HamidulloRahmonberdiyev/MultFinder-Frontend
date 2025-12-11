import { useRef, useEffect, useState } from "react";

const SearchInput = ({ value, onChange, onFocus, onBlur, isFocused }) => {
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [hasSpoken, setHasSpoken] = useState(false);
  const [levels, setLevels] = useState(() => new Array(12).fill(8));
  const visualizerRef = useRef(null);
  const [voices, setVoices] = useState([]);

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

    recognition.onstart = () => {
      setIsListening(true);
      setHasSpoken(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onChange({ target: { value: transcript } });
      setLastTranscript(transcript);
      setHasSpoken(false);
      speakText(transcript);
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

  useEffect(() => {
    if (!isListening) {
      if (visualizerRef.current) {
        clearInterval(visualizerRef.current);
        visualizerRef.current = null;
      }
      setLevels((prev) => prev.map(() => 6));
      return;
    }

    visualizerRef.current = setInterval(() => {
      setLevels((prev) =>
        prev.map(() => Math.max(4, Math.floor(Math.random() * 24)))
      );
    }, 120);

    return () => {
      if (visualizerRef.current) {
        clearInterval(visualizerRef.current);
        visualizerRef.current = null;
      }
    };
  }, [isListening]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("SpeechSynthesis API is not supported in this browser.");
      return;
    }

    const loadVoices = () => {
      const loaded = synth.getVoices();
      if (loaded.length) {
        setVoices(loaded);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
      synth.cancel();
    };
  }, []);

  const selectVoice = () => {
    if (!voices.length) return null;
    const byLang = voices.filter((v) =>
      v.lang?.toLowerCase().startsWith("uz")
    );
    const femaleNames = /female|woman|girl|lad/i;
    const uzFemale = byLang.find((v) => femaleNames.test(v.name));
    const anyFemale = voices.find((v) => femaleNames.test(v.name));
    const fallbackUz = byLang[0];
    return uzFemale || fallbackUz || anyFemale || voices[0];
  };

  const speakText = (text) => {
    if (!text || hasSpoken) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.pitch = 1.05;
    utterance.rate = 0.98;
    setHasSpoken(true);
    synth.speak(utterance);
  };

  return (
    <div
      className={`flex items-center w-full px-5 py-3 rounded-full border transition-all duration-300 ${
        isFocused
          ? "shadow-xl border-blue-500 bg-white/80 dark:bg-gray-800/80 dark:border-blue-400"
          : "shadow-md border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 hover:shadow-lg"
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
      {isListening && (
        <div
          className="hidden sm:flex items-end gap-1 ml-3 px-3 py-2 rounded-2xl bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/15 border border-blue-200/60 dark:border-blue-700/50 shadow-inner"
          aria-live="polite"
        >
          {levels.map((height, idx) => (
            <span
              key={idx}
              className="w-1 rounded-full bg-gradient-to-t from-blue-600 via-purple-500 to-pink-500 transition-all duration-150"
              style={{
                height: `${height}px`,
                minHeight: "8px",
                boxShadow: "0 0 8px rgba(147, 197, 253, 0.35)",
              }}
            />
          ))}
          <span className="ml-2 text-xs font-semibold text-blue-700 dark:text-blue-200">
            Tinglanmoqda...
          </span>
        </div>
      )}
      {lastTranscript && !isListening && (
        <button
          type="button"
          onClick={() => speakText(lastTranscript)}
          disabled={hasSpoken}
          className={`hidden sm:inline-flex items-center gap-2 ml-3 px-3 py-2 rounded-full text-white text-sm font-semibold shadow-md transition-all duration-200 ${
            hasSpoken
              ? "bg-gray-400/70 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-amber-400/80 via-pink-400/80 to-purple-500/80 hover:shadow-lg"
          }`}
          aria-label="Oxirgi natijani qayta o‘qish"
        >
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white/90 shadow-sm"></span>
          Tinglatish
        </button>
      )}
      <button
        type="button"
        onClick={handleMicClick}
        className={`ml-3 relative p-2 rounded-full transition-all duration-200 ${
          isListening
            ? "bg-gradient-to-br from-red-500/20 via-pink-500/20 to-purple-500/20 text-red-500 ring-2 ring-red-300/60 dark:ring-red-700/60 shadow-lg"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        aria-label="Ovozli qidiruv"
      >
        {isListening && (
          <span className="absolute inset-0 rounded-full animate-ping bg-red-400/30" />
        )}
        <svg
          className={`relative w-5 h-5 transition-colors ${
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

