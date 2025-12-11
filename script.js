const PASSWORD = "Taniyaditya09";

function check(){
  const p = document.getElementById("password").value;
  if(p === PASSWORD){
    document.getElementById("login").style.display="none";
    document.getElementById("content").classList.remove("hidden");
    loadData();
    specialDay();
  } else {
    document.getElementById("error").innerText="Wrong password ❤️";
  }
}

function specialDay(){
  const today = new Date().toDateString();
  const msg = document.getElementById("special");

  if(today.includes("Feb 14"))
    msg.innerHTML="💘 Happy Valentine’s Day Golu ❤️";
  if(today.includes("Mar 3"))
    msg.innerHTML="🎉 Happy Anniversary Puchu & Golu ❤️";
  if(today.includes("Apr 9"))
    msg.innerHTML="🎂 Happy Birthday Puchu ❤️";
  if(today.includes("Nov 9"))
    msg.innerHTML="🎂 Happy Birthday Golu ❤️";
}

function loadData(){function loadData(){
 fetch("data.json")
  .then(res=>res.json())
  .then(data=>{
    const t=document.getElementById("timeline");
    data.events.forEach(e=>{
      // Check if image exists in json, otherwise show nothing
      let imageHTML = e.image ? `<img src="${e.image}" alt="${e.title}" class="event-img">` : ""; 

      t.innerHTML+=`
       <div class="event">
         ${imageHTML}
         <h3>${e.title}</h3>
         <p class="date">${e.date}</p>
         <p>${e.desc}</p>
       </div>`;
    })
  })
}
}

