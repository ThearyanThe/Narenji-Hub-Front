import { getUrlParam, getToken } from "./utils.js";
import { convertEnNumberToPersian } from "../numberToPersian.js";
const getSessionDetails = async () => {
  const courseShortName = getUrlParam("name");
  const sessionID = getUrlParam("id");
  const sessionsWrapper = document.querySelector("#session-wrapper")
  // const Video=document.querySelector("#episode-video")
  const time = document.querySelector("#episode-time")
  const date = document.querySelector("#episode-date")

  const introTitleEpisode = document.querySelector("#intro-title-episode")
  const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  const session = await res.json()
  console.log(session);
  //title-episode
  introTitleEpisode.innerHTML = session.session.title
  //time
  time.innerHTML = session.session.time
  //date
  date.innerHTML = session.session.createdAt.slice(0, 10)
  let index = 1

  session.sessions.forEach(element => {





    //sessions
    sessionsWrapper.insertAdjacentHTML("beforeend", `
            <li class="flex items-center justify-between px-4 font-ybakhbold border-b-2 border-gray-2 h-11 pr-2 hover:bg-gray-1 text-slate-400">
                <div class="flex gap-1 items-center">
                    <span class="border-b-2 border-gray-2 h-6 w-6 flex justify-center items-center">${convertEnNumberToPersian(index)}</span>
                    <a class="text-xs lg:text-base" href="episode.html?name=${courseShortName}&id=${element._id}"> ${element.title}</a>
                </div>
                <!--time-->
                <span class="text-slate-400"> ${element.time}</span>
            </li>
        `);

    index++;
  });



  //video

  const container = document.querySelector(".container"),
    mainVideo = container.querySelector("video"),
    videoTimeline = container.querySelector(".video-timeline"),
    progressBar = container.querySelector(".progress-bar"),
    volumeBtn = container.querySelector(".volume i"),
    volumeSlider = container.querySelector(".left input"),
    currentVidTime = container.querySelector(".current-time"),
    videoDuration = container.querySelector(".video-duration"),
    skipBackward = container.querySelector(".skip-backward i"),
    skipForward = container.querySelector(".skip-forward i"),
    playPauseBtn = container.querySelector(".play-pause i"),
    speedBtn = container.querySelector(".playback-speed span"),
    speedOptions = container.querySelector(".speed-options"),
    pipBtn = container.querySelector(".pic-in-pic span"),
    fullScreenBtn = container.querySelector(".fullscreen i");
  let timer;

  const hideControls = () => {
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
      container.classList.remove("show-controls");
    }, 3000);
  }
  hideControls();

  container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
  });

  const formatTime = time => {
    let seconds = Math.floor(time % 60),
      minutes = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
      return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
  }

  videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
  });

  videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  });

  mainVideo.addEventListener("timeupdate", e => {
    let { currentTime, duration } = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
  });

  mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
  });

  const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
  }

  volumeBtn.addEventListener("click", () => {
    if (!volumeBtn.classList.contains("fa-volume-high")) {
      mainVideo.volume = 0.5;
      volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
      mainVideo.volume = 0.0;
      volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
  });

  volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if (e.target.value == 0) {
      return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  });

  speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      mainVideo.playbackRate = option.dataset.speed;
      speedOptions.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    });
  });

  document.addEventListener("click", e => {
    if (e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
      speedOptions.classList.remove("show");
    }
  });

  fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
      fullScreenBtn.classList.replace("fa-compress", "fa-expand");
      return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
  });

  speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
  pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
  skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
  skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
  mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
  mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
  playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
  videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
  document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar))

  return session
};
//intro-title-episode-get-by-course.html
function nameCourse(b) {
  const Intro = document.querySelector("#intro-title-episode");
  Intro.innerHTML = b.name;
}
export { getSessionDetails, nameCourse }  