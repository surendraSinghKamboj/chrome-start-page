document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("Search");
  const searchButton = document.getElementById("search-btn");
  const radioButtons = document.querySelectorAll('input[name="searchEngine"]');
  const engineLogo = document.getElementById("engine-logo");

  const engines = {
    Google: { url: "https://www.google.com/search?q=", logo: "https://www.google.com/favicon.ico" },
    Bing: { url: "https://www.bing.com/search?q=", logo: "https://www.bing.com/favicon.ico" },
    DuckDuckGo: { url: "https://duckduckgo.com/?q=", logo: "https://duckduckgo.com/favicon.ico" },
    Yahoo: { url: "https://search.yahoo.com/search?p=", logo: "https://www.yahoo.com/favicon.ico" },
    Youtube: { url: "https://www.youtube.com/results?search_query=", logo: "https://www.youtube.com/favicon.ico" },
    Amazon: { url: "https://www.amazon.com/s?k=", logo: "https://www.amazon.com/favicon.ico" },
  };

  // --- Load saved engine ---
  const savedEngine = localStorage.getItem("selectedSearchEngine") || "Google";
  const currentRadio = [...radioButtons].find(r => r.value === savedEngine);
  if (currentRadio) currentRadio.checked = true;

  updateLogo(savedEngine);

  // --- Save engine + update logo on change ---
  radioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        localStorage.setItem("selectedSearchEngine", radio.value);
        updateLogo(radio.value);
      }
    });
  });

  function updateLogo(engine) {
    engineLogo.src = engines[engine]?.logo || "";
    engineLogo.alt = engine;
  }

  // --- Search Function ---
  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    const selectedEngine = [...radioButtons].find(r => r.checked)?.value;
    const baseUrl = engines[selectedEngine]?.url || engines.Google.url;
    const searchUrl = baseUrl + encodeURIComponent(query);

    window.open(searchUrl, "_blank");
  }

  // --- Trigger on Enter ---
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // --- Trigger on Button Click ---
  searchButton.addEventListener("click", performSearch);

  // --- Debounced Suggestions (Optional placeholder) ---
  let debounceTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log("User typed:", searchInput.value); // Replace with fetch logic if needed
    }, 400);
  });
});
