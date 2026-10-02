const assignments=[{icon:"⚗",name:"Chemistry: Ionic bonding worksheet",meta:"Chemistry · Practice",due:"Due tomorrow"},{icon:"▤",name:"English A: Summary writing",meta:"English A · Written task",due:"Due Oct 6"},{icon:"⌬",name:"Biology: Cell diagram",meta:"Biology · Project",due:"Due Oct 9"}];
const preview=document.getElementById("assignmentPreview");
preview.innerHTML=assignments.map(a=>'<div class="assignment"><div class="task-icon">'+a.icon+'</div><div class="task-copy"><strong>'+a.name+'</strong><small>'+a.meta+'</small></div><span class="due">'+a.due+'</span></div>').join("");
document.getElementById("today").textContent=new Intl.DateTimeFormat("en",{weekday:"short",month:"short",day:"numeric"}).format(new Date());
const titles={overview:"Overview",classes:"My Classes",assignments:"Assignments",resources:"Study Resources",calendar:"Calendar"};
function notify(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
function navigate(view){if(!titles[view])return;document.getElementById("pageTitle").textContent=titles[view];document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));if(view!=="overview")notify(titles[view]+" section selected — connect your school's learning data to populate this area.");document.querySelector(".sidebar").classList.remove("open");}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.view)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.goto)));
document.getElementById("themeToggle").addEventListener("click",()=>document.body.classList.toggle("dark"));
document.getElementById("mobileMenu").addEventListener("click",()=>document.querySelector(".sidebar").classList.toggle("open"));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelector(".sidebar").classList.remove("open")});