const apiKey = "048120c6666f3ea0f1b2bf28583f98d1";
const username = "fardeen09mir";

async function fetchNowPlaying() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.recenttracks && data.recenttracks.track.length > 0) {
      const track = data.recenttracks.track[0];

      const trackName = track.name || "Unknown Track";
      const artistName = track.artist["#text"] || "Unknown Artist";
      const albumArt = track.image?.[2]["#text"] || "";

      document.getElementById("track-name").textContent = trackName;
      document.getElementById("artist-name").textContent = artistName;
      document.getElementById("track-art").src = albumArt;

      // Apply marquee if overflowing
      applyMarquee(document.getElementById("track-name"));
      applyMarquee(document.getElementById("artist-name"));

      // Animate visualizer if playing
      const isPlaying = track["@attr"] && track["@attr"].nowplaying === "true";
      toggleVisualizer(isPlaying);
    }
  } catch (err) {
    console.error("Error fetching track:", err);
  }
}

function applyMarquee(element) {
  // Reset
  const wrapper = element.parentElement;
  if (wrapper && wrapper.classList.contains("marquee-wrapper")) {
    element.classList.remove("marquee");
    const clone = wrapper.querySelector(".clone");
    if (clone) clone.remove();
  }

  if (element.scrollWidth > element.clientWidth) {
    // Wrap inside a marquee wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("marquee-wrapper");
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);

    // Apply marquee class
    element.classList.add("marquee");

    // Clone text for seamless loop
    const clone = element.cloneNode(true);
    clone.classList.add("clone");
    wrapper.appendChild(clone);
  }
}

function toggleVisualizer(isPlaying) {
  const visualizer = document.querySelector(".visualizer");
  if (!visualizer) return;

  if (isPlaying) {
    visualizer.classList.remove("paused");
    animateVisualizer();
  } else {
    visualizer.classList.add("paused");
  }
}

function animateVisualizer() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach(bar => {
    const height = Math.random() * 40 + 6;
    bar.style.height = `${height}px`;
  });
  if (!document.querySelector(".visualizer").classList.contains("paused")) {
    setTimeout(animateVisualizer, 200);
  }
}

// Fetch on load + refresh every 15s
fetchNowPlaying();
setInterval(fetchNowPlaying, 15000);
