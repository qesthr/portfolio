/* Adaptive grid scale-up above 1920 */
(function(){const B=16,W=1920,C=.6666;function f(){const w=innerWidth,r=((W-w)/W)*100*C,s=B-(B*r)/100;if(s>B)document.documentElement.style.fontSize=s+"px";else document.documentElement.style.removeProperty("font-size")}f();addEventListener("resize",f)})();

/* ---------- Content data (from RESUME - final) ---------- */
const WORDS=["Architecture first","Security from line one","Plan it","Secure it","See it through"];

/* Each project leads with the system, not the screenshot: what was led, designed, planned, tested */
const PROJECTS=[
 {n:"eTukod: Web-based Verification and Management System",c:"Architecture · Database · RBAC · Blockchain prototype",y:"Capstone",o:"Led · Designed",
  b:"Led the team on requirements and system planning, then designed the architecture, database, RBAC and secure forms, plus a Solidity/Hardhat prototype where saved records are hard to change.",
  map:"System map",
  rows:[["Led","Requirements gathering"],["Led","System planning"],["Designed","Architecture and database"],["Designed","RBAC and secure forms"],["Designed","Solidity / Hardhat prototype"]]},
 {n:"BukSU Event Management System",c:"Planning · Build · Testing · Documentation",y:"Semester project",o:"Team-built",
  b:"A team-built event management system, taken from planning through testing and documentation.",
  map:"Delivery path",
  rows:[["Team","Planning"],["Team","Build"],["Team","Testing"],["Team","Documentation"]]},
 {n:"Car Rental Monitoring System",c:"Database design · Monitoring",y:"Academic project",o:"Database-led",
  b:"A system for monitoring car rentals, built on a structured database design.",
  map:"Data first",
  rows:[["System","Car rental monitoring"],["Built on","Structured database design"]]},
 {n:"JobConnect",c:"Mobile UI/UX · Figma",y:"Academic project",o:"UI/UX",
  b:"Mobile app UI/UX designed in Figma.",
  map:"Interface",
  rows:[["Platform","Mobile app"],["Designed in","Figma"]]}
];
const STATS=[["4th","Year, BS Information Technology"],["5","Certifications & achievements"],["2023","Studying IT at BukSU since"],["1st","Runner Up, Startup Weekend Bukidnon 6"]];
const MILES=[
 {q:"Placed as 1st runner-up at a regional startup competition.",n:"Startup Weekend",r:"techstars_ · Bukidnon 6 · May 2025",y:"1st"},
 {q:"Part of the Web3 side of my work: Solidity, Hardhat and SUI.",n:"SUI Codecamp",r:"Campus DevCon @BukSU · May 2026",y:"SUI"},
 {q:"Certified in Switching, Routing, and Wireless Essentials.",n:"Networking certification",r:"Certification · Dec 2025",y:"Net"},
 {q:"Managed pages, designed graphics and edited video for real audiences. This is where my visual eye comes from.",n:"Freelance",r:"Social media · Graphics · Video",y:"Free"},
 {q:"Hands-on web development learning through two workshops.",n:"Workshops",r:"SheisDEVCON CodeCamp · Xuitt Basic Web Dev",y:"Dev"}
];

/* ---------- Build DOM from data ---------- */
const lqSvg=(id)=>`<svg class="f" aria-hidden="true"><filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="2" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/></filter></svg>`;
document.getElementById("track").innerHTML=[...WORDS,...WORDS].map(w=>`<span>${w}</span>`).join("");
document.getElementById("vgrid").innerHTML=PROJECTS.map((p,i)=>`
<li class="fade up60 late" style="--d:${(i%2)*120}ms"><article class="card">
 <figure class="liquid" role="group" aria-label="${p.n}" data-scale="14">${lqSvg("lf-p"+i)}
  <div class="lq" style="filter:url(#lf-p${i})"><div class="ph"><div class="grid"></div></div></div>
  <span class="bigno" aria-hidden="true">0${i+1}</span>
  <div class="sysmap"><div class="hd"><span>${p.map}</span><b>${p.y}</b></div>
   <ul>${p.rows.map(r=>`<li><i>${r[0]}</i><span>${r[1]}</span></li>`).join("")}</ul></div>
  <div class="glow"></div></figure>
 <div class="crow"><div><h3>${p.n}</h3><p>${p.b}</p></div><div class="rt"><div class="yr">${p.y}</div><div class="oc">${p.o}</div></div></div>
 <div class="cat">${p.c}</div></article></li>`).join("");
document.getElementById("stats").innerHTML=STATS.map((s,i)=>`<div class="stat fade late" style="--d:${i*110}ms"><dd>${s[0]}</dd><dt>${s[1]}</dt></div>`).join("");

/* Heading line splits */
document.querySelectorAll("[data-lines]").forEach(h=>{
  h.innerHTML=h.dataset.lines.split("|").map((t,i)=>`<span class="ln"><span class="li" style="transition-delay:${i*90}ms">${t}</span></span>`).join("");
});
/* Hero letters */
document.querySelectorAll("#giant .row").forEach(r=>{
  const t=r.dataset.t;r.dataset.d=r.dataset.start;
  r.innerHTML=[...t].map((c,i)=>`<span class="lt" style="transition-delay:${i*52}ms">${c}</span>`).join("");
});
/* Tagline stagger */
document.querySelectorAll("#roles .li").forEach((l,i)=>{l.style.transitionDelay=i*80+"ms";l.style.transitionDuration=".76s"});

/* ---------- Credentials interactivity ---------- */
const sel=document.getElementById("sel"),quote=document.getElementById("quote");
sel.innerHTML=MILES.map((m,i)=>`<li><button type="button" data-i="${i}"><span class="ix">0${i+1}</span><span><span class="nm">${m.n}</span><span class="rl">${m.r}</span></span><span class="rule"></span></button></li>`).join("");
function setActive(i){
  const m=MILES[i];
  sel.querySelectorAll("button").forEach((b,k)=>b.classList.toggle("act",k===i));
  quote.classList.remove("play");
  quote.innerHTML=m.q.split(" ").map((w,k)=>`<span class="w" style="--k:${k}">${w}</span>`).join(" ");
  void quote.offsetWidth;quote.classList.add("play");
  document.getElementById("qcap").textContent=m.n+" — "+m.r;
  document.getElementById("bigY").textContent=m.y;document.getElementById("bigL").textContent=m.n;
}
sel.querySelectorAll("button").forEach(b=>{const i=+b.dataset.i;["mouseenter","focus","click"].forEach(ev=>b.addEventListener(ev,()=>setActive(i)))});
setActive(0);

/* ---------- In-view observer ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}));
document.querySelectorAll(".fade,.ln").forEach(el=>{
  if(el.closest(".hero-top")||el.id==="cue")return;
  io.observe(el);
});

/* ---------- Liquid hover (spring) ---------- */
const touch=matchMedia("(pointer:coarse)").matches||innerWidth<=768;
function spring(onTick){
  let x=0,v=0,target=0,raf=0;const k=140,c=13;
  function step(){const dt=1/60,a=-k*(x-target)-c*v;v+=a*dt;x+=v*dt;onTick(x);
    if(Math.abs(v)<.001&&Math.abs(x-target)<.001){x=target;onTick(x);raf=0;return}raf=requestAnimationFrame(step)}
  return t=>{target=t;if(!raf)raf=requestAnimationFrame(step)};
}
if(!touch)document.querySelectorAll(".liquid[data-scale]").forEach(f=>{
  const turb=f.querySelector("feTurbulence"),disp=f.querySelector("feDisplacementMap"),max=+f.dataset.scale;
  const go=spring(x=>{disp.setAttribute("scale",1+(max-1)*x);turb.setAttribute("baseFrequency",(.009+.013*x).toFixed(5))});
  f.addEventListener("mouseenter",()=>go(1));
  f.addEventListener("mouseleave",()=>go(0));
});