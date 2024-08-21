const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("#menu");
  const selectedArtistElement = document.querySelector("#selected-artist");
  const artistLinksElement = document.querySelector("#artists-link");
  const songsContainer = document.querySelector("#songs-container");

  function createSongCard(song) {
    const card = document.createElement("div");
    card.className = "song-card";

    const img = document.createElement("img");
    img.className = "song-img";
    img.src = song.image_url;
    img.alt = song.title;
    img.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });

    const songName = document.createElement("h3");
    songName.className = "song-name";
    songName.textContent = song.title;

    const songDetails = document.createElement("div");
    songDetails.className = "song-details";
    
    const yearRecorded = document.createElement("p");
    yearRecorded.textContent = song.year;

    const duration = document.createElement("p");
    duration.textContent = formatDuration(song.duration);

    songDetails.appendChild(yearRecorded);
    songDetails.appendChild(duration);

    card.appendChild(img);
    card.appendChild(songName);
    card.appendChild(songDetails);

    return card;
  }

  function formatDuration(duration) {
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function showSongs(artistId) {
    const selectedArtist = artists.find(artist => artist.artistId === artistId);

    if (selectedArtist) {
      selectedArtistElement.textContent = selectedArtist.name;
      artistLinksElement.innerHTML = selectedArtist.urls
        .map(link => `<a href="${link.url}" target="_blank">${link.title}</a>`)
        .join(", ");

      songsContainer.innerHTML = "";
      const artistSongs = songs.filter(song => song.artistId === artistId && !song.explicit);

      artistSongs.forEach(song => {
        const card = createSongCard(song);
        songsContainer.appendChild(card);
      });
    }
  }

  function initializeMenu() {
    artists.forEach(artist => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", () => showSongs(artist.artistId));
      menu.appendChild(button);
    });
  }

  initializeMenu();
  showSongs(artists[0].artistId);
});

