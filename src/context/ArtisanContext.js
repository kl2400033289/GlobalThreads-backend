import { createContext, useState, useEffect } from "react";

export const ArtisanContext = createContext();

export function ArtisanProvider({ children }) {
  const [artisans, setArtisans] = useState(() => {
    const saved = localStorage.getItem("artisans");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("artisans", JSON.stringify(artisans));
  }, [artisans]);

  // ✅ add artisan
  const addArtisan = (artisan) => {
    setArtisans((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: artisan.name,
        location: artisan.location,
        rating: 0,
        blocked: false,
      },
    ]);
  };

  // ✅ remove artisan
  const removeArtisan = (id) => {
    setArtisans((prev) => prev.filter((a) => a.id !== id));
  };

  // ✅ toggle block
  const toggleBlock = (id) => {
    setArtisans((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, blocked: !a.blocked } : a
      )
    );
  };

  // ✅ update rating
  const updateRating = (id, rating) => {
    setArtisans((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, rating } : a
      )
    );
  };

  return (
    <ArtisanContext.Provider
      value={{
        artisans,
        addArtisan,
        removeArtisan,
        toggleBlock,
        updateRating,
      }}
    >
      {children}
    </ArtisanContext.Provider>
  );
}