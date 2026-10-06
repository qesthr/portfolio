/* Adaptive grid scale-up above 1920 */
(function(){const B=16,W=1920,C=.6666;function f(){const w=innerWidth,r=((W-w)/W)*100*C,s=B-(B*r)/100;if(s>B)document.documentElement.style.fontSize=s+"px";else document.documentElement.style.removeProperty("font-size")}f();addEventListener("resize",f)})();

/* ---------- Content data ---------- */
const WORDS=["Build Secure","Refactor Legacy","Bridge Web2 & Web3","Test Everything","Document It All"];
const PROJECTS=[
 {n:"BukSU Research Repository",c:"Web System · Laravel",y:"2023",o:"Led — Planning & DB",b:"Led development and designed the database so searches and data loading run faster.",ph:"Research Repository"},
 {n:"Event Management System",c:"Web System · Full Stack",y:"2024",o:"Led — Build & Test",b:"A secure event registry built from database design through testing and documentation.",ph:"Event Management"},
 {n:"Property & Permit Ledger",c:"Blockchain · Solidity · SUI",y:"2025",o:"Prototype",b:"Prototype systems for recording property and permits with Solidity, Hardhat, and SUI — records are hard to change once saved.",ph:"Blockchain Ledger"},
 {n:"Legacy Module Uplift",c:"Refactoring · RBAC",y:"2025",o:"Security Upgrade",b:"Added user roles, access control, and secure forms to older project modules, making the code easier to work with.",ph:"Legacy Uplift"}
];
const STATS=[["2023","Building web systems since"],["4th","Year BSIT at Bukidnon State University"],["5","Certifications & achievements"],["1st","Runner Up, Startup Weekend Bukidnon 6"]];
const MILES=[
 {q:"1st Runner Up at techstars Startup Weekend Bukidnon 6 — pitching and building a product idea inside a single weekend.",n:"Startup Weekend",r:"techstars · May 2025",y:"1st"},
 {q:"Hands-on with SUI at Campus DevCon @BukSU, extending the blockchain prototypes into the Move-based SUI ecosystem.",n:"SUI Codecamp",r:"Campus DevCon @BukSU · May 2026",y:"SUI"},
 {q:"Networking fundamentals certified — Switching, Routing, and Wireless Essentials, the infrastructure beneath every web system.",n:"Switching, Routing & Wireless",r:"Certification · Dec 2025",y:"Net"}
];

/* ---------- Build DOM from data ---------- */
const lqSvg=(id)=>`<svg class="f" aria-hidden="true"><filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="2" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/></filter></svg>`;
document.getElementById("track").innerHTML=[...WORDS,...WORDS].map(w=>`<span>${w}</span>`).join("");
document.getElementById("vgrid").innerHTML=PROJECTS.map((p,i)=>`
<li class="fade up60 late" style="--d:${(i%2)*120}ms"><article class="card">
 <figure class="liquid" role="img" aria-label="${p.n}" data-scale="28">${lqSvg("lf-p"+i)}
  <div class="lq" style="filter:url(#lf-p${i})"><div class="ph"><div class="grid"></div><small>0${i+1}</small>${p.ph}</div></div>
  <div class="veil"></div><div class="glow"></div><div class="vig"></div></figure>
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
/* Roles stagger */
document.querySelectorAll("#roles .li").forEach((l,i)=>{l.style.transitionDelay=i*80+"ms";l.style.transitionDuration=".76s"});

/* ---------- Milestones interactivity ---------- */
const sel=document.getElementById("sel"),quote=document.getElementById("quote");
sel.innerHTML=MILES.map((m,i)=>`<li><button type="button" data-i="${i}"><span class="ix">0${i+1}</span><span><span class="nm">${m.n}</span><span class="rl">${m.r}</span></span><span class="rule"></span></button></li>`).join("");
function setActive(i){
  const m=MILES[i];
  sel.querySelectorAll("button").forEach((b,k)=>b.classList.toggle("act",k===i));
  quote.classList.remove("play");
  quote.innerHTML="“"+m.q.split(" ").map((w,k)=>`<span class="w" style="--k:${k}">${w}</span>`).join(" ")+"”";
  void quote.offsetWidth;quote.classList.add("play");
  document.getElementById("qcap").textContent=m.n+" — "+m.r;
  document.getElementById("bigY").textContent=m.y;document.getElementById("bigL").textContent=m.n;
}
sel.querySelectorAll("button").forEach(b=>{const i=+b.dataset.i;["mouseenter","focus","click"].forEach(ev=>b.addEventListener(ev,()=>setActive(i)))});
setActive(0);

/* ---------- In-view observer ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}));
document.querySelectorAll(".fade,.ln,.liquid.fade").forEach(el=>{
  if(el.closest(".hero-top")||el.id==="cue")return;
  io.observe(el.classList.contains("ln")?el:el);
});
/* line spans animate when their .ln gets .in -> apply to child via CSS parent selector */
document.querySelectorAll(".ln").forEach(l=>{if(l.closest(".hero-top"))return;});
/* make .in on .ln trigger .li */
const st=document.createElement("style");st.textContent=".ln.in .li{transform:none;opacity:1}";document.head.appendChild(st);

/* ---------- Liquid hover (spring) ---------- */
const touch=matchMedia("(pointer:coarse)").matches||innerWidth<=768;
function spring(el,onTick){
  let x=0,v=0,target=0,raf=0;const k=140,c=13;
  function step(){const dt=1/60,a=-k*(x-target)-c*v;v+=a*dt;x+=v*dt;onTick(x);
    if(Math.abs(v)<.001&&Math.abs(x-target)<.001){x=target;onTick(x);raf=0;return}raf=requestAnimationFrame(step)}
  return t=>{target=t;if(!raf)raf=requestAnimationFrame(step)};
}
if(!touch)document.querySelectorAll(".liquid[data-scale]").forEach(f=>{
  const turb=f.querySelector("feTurbulence"),disp=f.querySelector("feDisplacementMap"),max=+f.dataset.scale;
  const veil=f.querySelector(".veil");
  const go=spring(f,x=>{disp.setAttribute("scale",1+(max-1)*x);turb.setAttribute("baseFrequency",(.009+.013*x).toFixed(5))});
  let vx=0,vtarget=0,vr=0;
  function vs(){vx+=(vtarget-vx)*.18;if(veil)veil.style.opacity=.88*(1-vx);if(Math.abs(vtarget-vx)>.005)vr=requestAnimationFrame(vs);else vr=0}
  f.addEventListener("mouseenter",()=>{go(1);vtarget=1;if(!vr)vr=requestAnimationFrame(vs)});
  f.addEventListener("mouseleave",()=>{go(0);vtarget=0;if(!vr)vr=requestAnimationFrame(vs)});
});
