const glow=document.getElementById('cursor-glow');
let gx=0,gy=0,mx=0,my=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
function moveGlow(){gx+=(mx-gx)*.1;gy+=(my-gy)*.1;glow.style.left=`${gx}px`;glow.style.top=`${gy}px`;requestAnimationFrame(moveGlow)}

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){moveGlow();const canvas=document.getElementById('particles');const ctx=canvas.getContext('2d');let dots=[];
  function resize(){canvas.width=innerWidth;canvas.height=Math.max(document.documentElement.scrollHeight,innerHeight);dots=Array.from({length:70},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.5}))}
  function frame(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let i=0;i<dots.length;i++){const a=dots[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>canvas.width)a.vx*=-1;if(a.y<0||a.y>canvas.height)a.vy*=-1;ctx.fillStyle='rgba(69,163,255,.65)';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fill();for(let j=i+1;j<dots.length;j++){const b=dots[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<140){ctx.strokeStyle=`rgba(69,163,255,${(1-d/140)*.14})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}requestAnimationFrame(frame)}
  resize();frame();addEventListener('resize',resize);
}
