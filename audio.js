document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("audioToggle");
  const music = document.getElementById("bgMusic");

  if (!toggle || !music) return;

  // Saved for the whole browser tab, so every page of the site can read them
  const KEY_PLAYING = "serave_music_playing";
  const KEY_TIME = "serave_music_time";

  let pendingResume = null;

  /* ---------- Icon states ---------- */
  function showPlaying() {
    toggle.classList.add("is-playing");
    toggle.setAttribute("aria-pressed", "true");
    toggle.setAttribute("aria-label", "Mute music");
  }

  function showMuted() {
    toggle.classList.remove("is-playing");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Play music");
  }

  /* ---------- Play and pause ---------- */
  function playMusic() {
    // play() can be blocked by the browser, so only switch the icon if it works
    return music.play().then(() => {
      showPlaying();
      cancelResume();
      sessionStorage.setItem(KEY_PLAYING, "true");
    }).catch(() => {});
  }

  function pauseMusic() {
    music.pause();
    showMuted();
    cancelResume();
    sessionStorage.setItem(KEY_PLAYING, "false");
  }

  // Filled <-> outline
  toggle.addEventListener("click", () => {
    music.paused ? playMusic() : pauseMusic();
  });

  /* ---------- Remember where the song is ---------- */
  function saveTime() {
    sessionStorage.setItem(KEY_TIME, music.currentTime);
  }

  music.addEventListener("timeupdate", saveTime);
  window.addEventListener("pagehide", saveTime);

  /* ---------- Continue on the next page ---------- */
  function restoreTime() {
    const savedTime = parseFloat(sessionStorage.getItem(KEY_TIME));
    if (!isNaN(savedTime)) music.currentTime = savedTime;
  }

  // If the browser blocks autoplay, start on the visitor's first click or key press
  function waitForInteraction() {
    pendingResume = (event) => {
      if (toggle.contains(event.target)) return;   // the button click handles itself
      playMusic();
    };
    ["pointerdown", "keydown"].forEach((name) => {
      document.addEventListener(name, pendingResume);
    });
  }

  function cancelResume() {
    if (!pendingResume) return;
    ["pointerdown", "keydown"].forEach((name) => {
      document.removeEventListener(name, pendingResume);
    });
    pendingResume = null;
  }

  if (sessionStorage.getItem(KEY_PLAYING) === "true") {
    if (music.readyState >= 1) {
      restoreTime();
    } else {
      music.addEventListener("loadedmetadata", restoreTime, { once: true });
    }

    music.play().then(showPlaying).catch(waitForInteraction);
  }
});
