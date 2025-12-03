import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = "https://apimultifinder.unicrm.org/api/stories";
const INCREMENT_VIEWS_URL = "https://apimultifinder.unicrm.org/api/stories/increment-views";
const INCREMENT_LIKES_URL = "https://apimultifinder.unicrm.org/api/stories/increment-likes";
const LIKES_STORAGE_KEY = "multfinder_story_likes";
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
  const [likedStoryIds, setLikedStoryIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = JSON.parse(window.localStorage.getItem(LIKES_STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
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
            likesCount: story.likes ?? 0,
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

    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId ? { ...story, viewsCount: (story.viewsCount ?? 0) + 1 } : story
      )
    );

    const formData = new FormData();
    formData.append("story_id", storyId);
    try {
      await fetch(INCREMENT_VIEWS_URL, { method: "POST", body: formData });
    } catch (err) {
      console.error(err);
    }
  };

  const likeStory = async (storyId) => {
    if (!storyId) return;

    let alreadyLiked = false;
    setLikedStoryIds((prev) => {
      if (prev.includes(storyId)) {
        alreadyLiked = true;
        return prev;
      }
      const next = [...prev, storyId];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
    if (alreadyLiked) return;

    try {
      const formData = new FormData();
      formData.append("story_id", storyId);
      await fetch(INCREMENT_LIKES_URL, { method: "POST", body: formData });
      setStories((prev) =>
        prev.map((story) =>
          story.id === storyId ? { ...story, likesCount: (story.likesCount ?? 0) + 1 } : story
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const isStoryLiked = useCallback(
    (storyId) => likedStoryIds.includes(storyId),
    [likedStoryIds]
  );

  return {
    stories,
    loading,
    error,
    hasStories,
    incrementViews,
    likeStory,
    isStoryLiked,
  };
};

export default useStories;

