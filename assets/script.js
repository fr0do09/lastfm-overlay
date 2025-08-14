const apiKey = "048120c6666f3ea0f1b2bf28583f98d1"; // your Last.fm API key
const username = "fardeen09mir"; // your Last.fm username
const trackContainer = document.getElementById("track-container");

async function fetchRecentTrack() {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    );
    const data = await response.json();
    const track = data.recenttracks.track[0];
    const artist = track.artist["#text"];
    const song = track.name;

    trackContainer.textContent = `${artist} — ${song}`;
  } catch (error) {
    console.error("Error fetching track:", error);
    trackContainer.textContent = "Unable to load track.";
  }
}

// Initial fetch
fetchRecentTrack();

// Update every 30 seconds
setInterval(fetchRecentTrack, 30000);
