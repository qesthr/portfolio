import Lenis from "lenis";
const lenis=new Lenis({smoothWheel:true});window.lenis=lenis;
function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);

const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const pre=document.getElementById("pre");
const delay=(fn,ms)=>setTimeout(fn,ms);

function runHero(base){
  document.querySelectorAll("#giant .row").forEach(r=>delay(()=>r.classList.add("go"),base+(+r.dataset.d)));
  delay(()=>document.getElementById("roles").classList.add("in"),base+200);
  delay(()=>document.getElementById("hdesc").classList.add("in"),base+400);
  delay(()=>document.getElementById("cue").classList.add("in"),base+900);
}
/* .go on row triggers .lt */
const s=document.createElement("style");s.textContent=".row.go .lt{transform:none;opacity:1}";document.head.appendChild(s);

if(reduce){
  pre.classList.add("done");
  document.querySelectorAll(".row").forEach(r=>r.classList.add("go"));
  ["roles","hdesc","cue"].forEach(id=>document.getElementById(id).classList.add("in"));
}else{
  lenis.stop();scrollTo(0,0);
  const cnt=document.getElementById("cnt");const T=2000,t0=performance.now();
  runHero(2500-0); // hero reveal baseline 2500ms after load
  (function tick(now){
    const p=Math.min((now-t0)/T,1);cnt.textContent=Math.round(p*100);
    if(p<1)return requestAnimationFrame(tick);
    pre.classList.add("fadeout");
    delay(()=>{pre.classList.add("wipe");
      delay(()=>{pre.classList.add("done");pre.setAttribute("aria-hidden","true");lenis.start()},650)},200+300);
  })(t0);
}

/* Menu */
const burger=document.getElementById("burger"),menu=document.getElementById("menu");
function toggle(o){const open=o??!menu.classList.contains("open");menu.classList.toggle("open",open);burger.classList.toggle("open",open);burger.setAttribute("aria-expanded",open);menu.setAttribute("aria-hidden",!open);open?lenis.stop():lenis.start()}
burger.addEventListener("click",()=>toggle());
/* Smooth anchors */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const id=a.getAttribute("href");const el=id==="#top"?document.documentElement:document.querySelector(id);if(!el)return;
  e.preventDefault();if(menu.classList.contains("open"))toggle(false);
  lenis.scrollTo(id==="#top"?0:el);
}));
