export const formatTime = (questCountDown) => {
  let delta = questCountDown / 1000;
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  let seconds = Math.floor(delta % 60);

  return `${days}:${hours}:${minutes}:${seconds}`;
}