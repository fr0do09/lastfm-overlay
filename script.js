const username = "fardeen09mir"; // Your Last.fm username
const apiKey = "048120c6666f3ea0f1b2bf28583f98d1"; // Your Last.fm API key

const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const albumArt = document.getElementById("album-art");

async function fetchTrack() {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
  const data = await response.json();
  const track = data.recenttracks.track[0];
  if(track) {
    trackTitle.textContent = track.name;
    trackArtist.textContent = track.artist["#text"];
    albumArt.src = track.image[3]["#text"] || track.image[2]["#text"];
    
    // Check if title or artist overflows
    if(trackTitle.scrollWidth > trackTitle.clientWidth) {
      trackTitle.classList.add("scrolling");
    } else {
      trackTitle.classList.remove("scrolling");
    }

    if(trackArtist.scrollWidth > trackArtist.clientWidth) {
      trackArtist.classList.add("scrolling");
    } else {
      trackArtist.classList.remove("scrolling");
    }
  }
}

fetchTrack();
setInterval(fetchTrack, 10000);
