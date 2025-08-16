const API_KEY = "048120c6666f3ea0f1b2bf28583f98d1";
const USERNAME = "fardeen09mir";
const URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

let visualizerInterval;

async function fetchNowPlaying() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const track = data.recenttracks.track[0];

    const trackArt = track.image.find(img => img.size === "medium")["#text"];
    const trackName = track.name;
    const artistName = track.artist["#text"];
    const isNowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";

    // Update UI
    document.getElementById("track-art").src = trackArt || "https://via.placeholder.com/60";
    document.getElementById("track-name").textContent = trackName;
    document.getElementById("artist-name").textContent = artistName;

    const visualizer = document.querySelector(".visualizer");

    if (isNowPlaying) {
      visualizer.classList.add("playing");
      visualizer.classList.remove("paused");

      // Start random bar movement
      if (!visualizerInterval) {
        visualizerInterval = setInterval(() => {
          document.querySelectorAll(".bar").forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 25) + 5; // 5px–30px
            bar.style.height = randomHeight + "px";
          });
        }, 200);
      }
    } else {
      visualizer.classList.add("paused");
      visualizer.classList.remove("playing");

      // Reset bars
      clearInterval(visualizerInterval);
      visualizerInterval = null;
      document.querySelectorAll(".bar").forEach(bar => {
        bar.style.height = "6px";
      });
    }
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
  }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);
