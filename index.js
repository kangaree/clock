let clockStopped = false;
let setX = null;
let setY = null;

const clock = (x, y, radius, freeze = false) => {
  var now = new Date();

  // When the canvas is gone
  if (!canvas) {
    return;
  }
  var ctx = canvas.getContext("2d");

  ctx.save();

  // Draw circle
  ctx.strokeStyle = "#243141";
  ctx.fillStyle = "#243141";
  ctx.beginPath();
  ctx.arc(x + radius / 2, y + radius / 2, radius / 2, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();

  // (x, y)
  ctx.translate(x + radius / 2, y + radius / 2);
  ctx.scale(0.333, 0.333);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // Hour marks
  ctx.save();
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    // ctx.moveTo(100, 0);
    // ctx.lineTo(120, 0);
    ctx.moveTo(1.5 * radius - 30, 0);
    ctx.lineTo(1.5 * radius, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.beginPath();
      // ctx.moveTo(117, 0);
      // ctx.lineTo(120, 0);
      ctx.moveTo(1.5 * radius - 6, 0);
      ctx.lineTo(1.5 * radius, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  var sec = now.getSeconds() + now.getMilliseconds() / 1000;
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;

  ctx.fillStyle = "black";

  // write Hours
  ctx.save();
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  // ctx.lineTo(80, 0);
  ctx.lineTo((80 * radius) / 110, 0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  // ctx.lineTo(112, 0);
  ctx.lineTo((112 * radius) / 110, 0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo((83 * radius) / 110, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc((95 * radius) / 110, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325FA2";
  // ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.arc(0, 0, 1.5 * radius + 10, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  if (clockStopped || freeze) {
    clockStopped = false;
  } else {
    return window.requestAnimationFrame(function () {
      if (setX !== x && setY !== y) {
        clock(x, y, radius);
      } else {
        clock(setX, setY, radius);
      }
    });
  }
};

const stopClock = (id) => {
  window.cancelAnimationFrame(id);
  clockStopped = true;
};

setTimeout(() => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;

  // Scale down using CSS
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  // Adjust context scale
  context.scale(2, 2);

  const radius = 100;

  clock(
    window.innerWidth / 2 - radius / 2,
    window.innerHeight / 2 - radius / 2,
    radius,
    false
  );
  // Why 30?
}, 30);
