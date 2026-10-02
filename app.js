const assignments=[
 {id:1,icon:"⚗",name:"Chemistry: Ionic bonding worksheet",meta:"Chemistry · Practice",due:"Tomorrow",done:false},
 {id:2,icon:"▤",name:"English A: Summary writing",meta:"English A · Written task",due:"Oct 6",done:false},
 {id:3,icon:"⌬",name:"Biology: Cell diagram",meta:"Biology · Project",due:"Oct 9",done:false}
];
const classes=[
 ["Biology","Cell structure & function","Monday · 9:00 AM"],
 ["Chemistry","Ionic bonding","Wednesday · 4:30 PM"],
 ["Mathematics","Algebra practice","Monday · 5:30 PM"],
 ["English A","Comprehension workshop","Thursday · 1:30 PM"],
 ["Physics","Motion & forces","Saturday · 9:00 AM"],
 ["Spanish","Comprensión y escritura","Tuesday · 4:30 PM"]
];
const resources=[
 ["Biology","CSEC Biology revision notes","Notes"],
 ["Chemistry","CSEC Chemistry practice questions","Practice"],
 ["Physics","Formula sheet & worked examples","Reference"],
 ["Mathematics","Algebra and number resources","Practice"],
 ["English A","Comprehension and summary guide","Guide"],
 ["Spanish","Vocabulary and grammar resources","Language"]
];
const events=[
 ["Oct 3","Physics class","9:00 AM"],
 ["Oct 6","English A assignment due","All day"],
 ["Oct 8","Chemistry revision session","4:30 PM"],
 ["Oct 9","Biology project due","All day"]
];
const $=s=>document.querySelector(s);
const appView=$("#appView"), overview=$("#overviewView");
const titles={overview:"Overview",classes:"My Classes",assignments:"Assignments",resources:"Study Resources",calendar:"Calendar"};
function notify(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function renderAssignments(){
 const list=assignments.map(a=>`<div class="assignment"><button class="check ${a.done?"checked":""}" data-task="${a.id}" aria-label="Mark task complete">${a.done?"✓":""}</button><div class="task-icon">${a.icon}</div><div class="task-copy"><strong class="${a.done?"completed":""}">${a.name}</strong><small>${a.meta}</small></div><span class="due">${a.done?"Completed":"Due "+a.due}</span></div>`).join("");
 return `<div class="page-intro"><p class="eyebrow">TASK TRACKER</p><h1>Assignments</h1><p class="muted">Check off work as you complete it. Your progress is saved in this browser.</p></div><section class="panel"><div class="panel-head"><h3>Your assignments</h3><span class="live-dot">${assignments.filter(a=>!a.done).length} remaining</span></div><div class="assignment-list">${list}</div></section>`;
}
function renderClasses(){return `<div class="page-intro"><p class="eyebrow">YOUR WEEK</p><h1>My Classes</h1><p class="muted">Your subjects and upcoming learning sessions.</p></div><div class="cards-grid">${classes.map(c=>`<article class="info-card"><span class="quick-icon blue">▤</span><h3>${c[0]}</h3><p>${c[1]}</p><small>${c[2]}</small><button class="small-action" data-message="Opening ${c[0]} class">Open class →</button></article>`).join("")}</div>`;}
function renderResources(){return `<div class="page-intro"><p class="eyebrow">LEARNING LIBRARY</p><h1>Study Resources</h1><p class="muted">Organize your revision materials by subject.</p></div><div class="cards-grid">${resources.map(r=>`<article class="info-card"><span class="quick-icon purple">▣</span><h3>${r[0]}</h3><p>${r[1]}</p><small>${r[2]}</small><button class="small-action" data-message="${r[0]} resource selected">View resource →</button></article>`).join("")}</div>`;}
function renderCalendar(){return `<div class="page-intro"><p class="eyebrow">SCHOOL CALENDAR</p><h1>Calendar</h1><p class="muted">Keep deadlines and learning sessions in one place.</p></div><section class="panel"><div class="event-list">${events.map(e=>`<div class="event"><div class="event-date">${e[0]}</div><div><strong>${e[1]}</strong><small>${e[2]}</small></div></div>`).join("")}</div></section>`;}
function render(view){
 $("#pageTitle").textContent=titles[view];
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 if(view==="overview"){appView.innerHTML="";overview.style.display="block";}else{overview.style.display="none";appView.innerHTML=view==="assignments"?renderAssignments():view==="classes"?renderClasses():view==="resources"?renderResources():renderCalendar();}
 document.querySelector(".sidebar").classList.remove("open");
}
function refreshTaskPreview(){
 const p=$("#assignmentPreview"); if(!p)return;
 p.innerHTML=assignments.filter(a=>!a.done).map(a=>`<div class="assignment"><div class="task-icon">${a.icon}</div><div class="task-copy"><strong>${a.name}</strong><small>${a.meta}</small></div><span class="due">Due ${a.due}</span></div>`).join("")||'<p class="muted">All assignments completed. Great work!</p>';
 $("#taskCount").textContent=assignments.filter(a=>!a.done).length;
}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-view]"); if(nav){render(nav.dataset.view);return;}
 const go=e.target.closest("[data-goto]"); if(go){render(go.dataset.goto);return;}
 const task=e.target.closest("[data-task]"); if(task){const a=assignments.find(x=>x.id===Number(task.dataset.task));a.done=!a.done;render("assignments");notify(a.done?"Assignment marked complete!":"Assignment reopened.");return;}
 const action=e.target.closest("[data-message]"); if(action)notify(action.dataset.message);
});
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("caribtech-theme",document.body.classList.contains("dark")?"dark":"light");});
if(localStorage.getItem("caribtech-theme")==="dark")document.body.classList.add("dark");
$("#mobileMenu").addEventListener("click",()=>$(".sidebar").classList.toggle("open"));
document.addEventListener("keydown",e=>{if(e.key==="Escape")$(".sidebar").classList.remove("open")});
$("#today").textContent=new Intl.DateTimeFormat("en",{weekday:"short",month:"short",day:"numeric"}).format(new Date());
refreshTaskPreview();