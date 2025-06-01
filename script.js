const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalTime = document.getElementById('digitalTime');
const dateText = document.getElementById('dateText');
const tickSound = document.getElementById('tickSound');
const colorPicker = document.getElementById('colorPicker');

let ticking = true;

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hrDeg = (hours % 12) * 30 + minutes * 0.5;

  secondHand.style.transform = `rotate(${secDeg}deg)`;
  minuteHand.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform = `rotate(${hrDeg}deg)`;

  const timeStr = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
  digitalTime.textContent = timeStr;

  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  dateText.textContent = now.toLocaleDateString(undefined, options);

  if (ticking) {
    tickSound.currentTime = 0;
    tickSound.play().catch(() => {}); // prevent autoplay errors
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function toggleTick() {
  ticking = !ticking;
  alert(`Ticking sound ${ticking ? 'enabled' : 'muted'}.`);
}

colorPicker.addEventListener('input', () => {
  document.documentElement.style.setProperty('--hand-color', colorPicker.value);
});

setInterval(updateClock, 1000);
updateClock();
