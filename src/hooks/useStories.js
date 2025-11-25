import { useEffect, useMemo, useState } from "react";

const API_URL = "https://apimultifinder.unicrm.org/api/stories";
const INCREMENT_URL = "https://apimultifinder.unicrm.org/api/stories/increment-views";
const GRADIENTS = [
  "from-[#FF0080] to-[#FF8C00]",
  "from-[#8A2387] to-[#E94057]",
  "from-[#4776E6] to-[#8E54E9]",
  "from-[#F7971E] to-[#FFD200]",
  "from-[#12c2e9] to-[#c471ed]",
  "from-[#F5515F] to-[#A1051D]",
];

const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("Stories yuklab bo'lmadi");
        const payload = await response.json();
        const items = Array.isArray(payload?.data) ? payload.data : [];
        setStories(
          items.map((story, index) => ({
            id: story.id ?? index,
            title: story.title ?? "Story",
            content: story.content ?? "",
            image: story.imageUrl,
            gradient: GRADIENTS[index % GRADIENTS.length],
            viewsCount: story.viewsCount ?? 0,
            createdAt: story.createdAt,
            updatedAt: story.updatedAt,
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Noma'lum xatolik");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchStories();
    return () => controller.abort();
  }, []);

  const hasStories = useMemo(() => stories.length > 0, [stories]);

  const incrementViews = async (storyId) => {
    if (!storyId) return;
    const formData = new FormData();
    formData.append("story_id", storyId);
    try {
      await fetch(INCREMENT_URL, { method: "POST", body: formData });
      setStories((prev) =>
        prev.map((story) =>
          story.id === storyId ? { ...story, viewsCount: (story.viewsCount ?? 0) + 1 } : story
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return { stories, loading, error, hasStories, incrementViews };
};

export default useStories;

