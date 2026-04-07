const invite = "https://discord.gg/bxTzzrnU2z";

function joinServer(){
  window.location.href = invite;
}

// PARTICLES
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({length:100}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  size: Math.random()*3,
  speed: Math.random()*1
}));

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.fillRect(p.x,p.y,p.size,p.size);
    ctx.fillStyle = '#ffffff';
    p.y += p.speed;
    if(p.y>canvas.height) p.y=0;
  });
  requestAnimationFrame(animate);
}
animate();

// DISCORD API
fetch('https://discord.com/api/v9/invites/bxTzzrnU2z?with_counts=true')
.then(res=>res.json())
.then(data=>{
  document.getElementById('memberCount').innerText = `👥 ${data.approximate_member_count} members`;

  let count = 0;
  let target = data.approximate_member_count;
  let interval = setInterval(()=>{
    count += Math.ceil(target/50);
    if(count >= target){ count = target; clearInterval(interval);} 
    document.getElementById('members').innerText = count;
  },20);
});