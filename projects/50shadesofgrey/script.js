var canvas = document.getElementById("demoCanvas");  
if (canvas.getContext)   
{  
var ctx = canvas.getContext("2d");         
var gradient = ctx.createLinearGradient(0, 0, 1700, 0);
gradient.addColorStop(0, 'black');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1800, 1800);             
}

const butt1 = document.getElementById("opt1");
const butt2 = document.getElementById("opt2");
const butt3 = document.getElementById("opt3");
const butt4 = document.getElementById("opt4");
const butt5 = document.getElementById("opt5");

var shades = []
const diff = 255/50
for (let i = 1; i < 51; i++) {
  let temp = i*diff;
  let tempstr = temp.toString();
  shades.push(tempstr);
}

var count = 0
var yesclicks = 0
var noclicks = 0
var memory = []

function buttonColor(shades, selectedid) {
  count += 1;

  let x = Math.floor((Math.random() * 50) + 1);
  butt1.style.backgroundColor= "rgb(" + shades[x] + "," + shades[x] + "," + shades[x] + ")";
  butt2.style.backgroundColor= "rgb(" + shades[x] + "," + shades[x] + "," + shades[x] + ")";
  butt3.style.backgroundColor= "rgb(" + shades[x] + "," + shades[x] + "," + shades[x] + ")";
  butt4.style.backgroundColor= "rgb(" + shades[x] + "," + shades[x] + "," + shades[x] + ")";
  butt5.style.backgroundColor= "rgb(" + shades[x] + "," + shades[x] + "," + shades[x] + ")";

  let buttarr = [butt1, butt2, butt3, butt4, butt5];
  let sign = [0,1] // 0 is minus, 1 is plus
  var itemsign = sign[Math.floor(Math.random()*sign.length)];
  var item = buttarr[Math.floor(Math.random()*buttarr.length)];

  if ((itemsign == 0 && x!=0) || (itemsign == 1 && x == 0)) {
    item.style.backgroundColor= "rgb(" + shades[x-1] + "," + shades[x-1] + "," + shades[x-1] + ")";
  } else if ((itemsign == 1 && x!=50) || (itemsign == 0 && x == 50)) {
    item.style.backgroundColor= "rgb(" + shades[x+1] + "," + shades[x+1] + "," + shades[x+1] + ")";
  }
  memory.push(item);
  
  var selected = document.getElementById(selectedid);

  if (selected == memory[count-2] && count!=1) {
    yesclicks += 1;
    document.getElementById("yesclicks").innerHTML = yesclicks;
  } else if (count!=1) {
    noclicks += 1;
    document.getElementById("noclicks").innerHTML = noclicks;
  }
  if (count > 1) {
  document.getElementById("percentage").innerHTML = yesclicks*100/(count-1);
  }
}