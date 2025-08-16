const username = "fardeen09mir"; // Your Last.fm username
const apiKey = "048120c6666f3ea0f1b2bf28583f98d1"; // Your Last.fm API key

const trackText = document.getElementById("track-text");
const albumArt = document.getElementById("album-art");

// Fetch recent track
async function fetchTrack() {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
  const data = await response.json();
  const track = data.recenttracks.track[0];
  if(track) {
    trackText.textContent = `${track.artist["#text"]} – ${track.name}`;
    albumArt.src = track.image[3]["#text"] || track.image[2]["#text"];
    
    // Check if text overflows
    if(trackText.scrollWidth > trackText.clientWidth) {
      trackText.classList.add("scrolling");
    } else {
      trackText.classList.remove("scrolling");
    }
  }
}

// Update every 10 seconds
fetchTrack();
setInterval(fetchTrack, 10000);
