const invite = "https://discord.gg/bxTzzrnU2z";

function joinServer(){
  window.location.href = invite;
}

// PARTICLES
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({length:120}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  size: Math.random()*2,
  speed: Math.random()*0.7
}));

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.fillStyle = '#5865F2';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#5865F2';

    ctx.fillRect(p.x,p.y,p.size,p.size);

    p.y += p.speed;
    if(p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(animate);
}
animate();

// DISCORD MEMBERS
fetch('https://discord.com/api/v9/invites/bxTzzrnU2z?with_counts=true')
.then(res=>res.json())
.then(data=>{
  const countEl = document.getElementById('memberCount');
  const statEl = document.getElementById('members');

  countEl.innerText = `👥 ${data.approximate_member_count} members`;

  let count = 0;
  let target = data.approximate_member_count;

  let interval = setInterval(()=>{
    count += Math.ceil(target/60);
    if(count >= target){
      count = target;
      clearInterval(interval);
    }
    statEl.innerText = count;
  },20);
});
