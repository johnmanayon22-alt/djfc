/* Page-specific logic, selected by <body data-page="..."> */
const CATS=['Healing','Family','Guidance','Provision','Thanksgiving','Salvation','Other'];
const card=p=>`<div class="card"><span class="tag">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.details)}</p><small>${esc(p.name)} | ${esc(p.date)}</small><p><button class="btn dk sm pray" data-id="${p.id}">&#128591; I'm Praying (<span>${p.praying||0}</span>)</button></p></div>`;
function bindPray(){$$('.pray').forEach(b=>b.onclick=()=>{const key='djfc_p'+b.dataset.id;if(localStorage.getItem(key))return toast('You are already praying for this request.');
const a=DB.all('prayers'),p=a.find(x=>x.id==b.dataset.id);p.praying=(p.praying||0)+1;DB.save('prayers',a);try{localStorage.setItem(key,1)}catch(e){}$('span',b).textContent=p.praying;toast('Thank you for praying!')})}
const PG={
index(){const f=DB.all('prayers').filter(p=>p.public).slice(0,3);$('#featured').innerHTML=f.map(card).join('')||'<p>No public requests yet.</p>';bindPray();
const v=DB.all('verses');$('#votd').textContent=v[new Date().getDate()%v.length].text;$('#votdr').textContent=v[new Date().getDate()%v.length].ref},
submit(){const f=$('#f'),m=$('#msg');f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),er=[];
if(!d.anon&&d.name.trim().length<2)er.push('Enter your name or tick "Submit anonymously".');
if(d.email&&!/^\S+@\S+\.\S+$/.test(d.email))er.push('Enter a valid email address.');
if(d.title.trim().length<3)er.push('Enter a prayer title (at least 3 characters).');
if(d.details.trim().length<10)er.push('Prayer details need at least 10 characters.');
if(!d.category)er.push('Choose a category.');
if(er.length){m.className='alert err';m.innerHTML=er.map(esc).join('<br>');return}
DB.add('prayers',{name:d.anon?'Anonymous':d.name.trim(),email:d.email,title:d.title.trim(),details:d.details.trim(),category:d.category,public:d.privacy=='public',praying:0,date:new Date().toISOString().slice(0,10)});
f.hidden=true;m.className='';m.innerHTML='';$('#done').hidden=false;$('#doneTxt').textContent=d.privacy=='public'?'Your request may appear on the Prayer Wall in this browser.':'Your request is marked private and will not show on the Prayer Wall.'}},
wall(){let cat='All';const draw=()=>{const l=DB.all('prayers').filter(p=>p.public&&(cat=='All'||p.category==cat));$('#list').innerHTML=l.map(card).join('')||'<p>No requests in this category.</p>';bindPray()};
$('#fil').innerHTML=['All',...CATS].map(c=>`<button class="btn ${c=='All'?'on':''}">${c}</button>`).join('');
$$('#fil .btn').forEach(b=>b.onclick=()=>{cat=b.textContent;$$('#fil .btn').forEach(x=>x.classList.toggle('on',x==b));draw()});draw()},
verses(){$('#list').innerHTML=DB.all('verses').map(v=>`<div class="card"><p>&ldquo;${esc(v.text)}&rdquo;</p><strong>${esc(v.ref)}</strong><p><button class="btn dk sm cp" data-t="${esc(v.text+' - '+v.ref)}">Copy</button></p></div>`).join('');
$$('.cp').forEach(b=>b.onclick=()=>{const t=b.dataset.t;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Verse copied!')).catch(()=>{const x=document.createElement('textarea');x.value=t;document.body.append(x);x.select();document.execCommand('copy');x.remove();toast('Verse copied!')})})},
devotionals(){$('#list').innerHTML=DB.all('devotionals').map(d=>`<div class="card"><h3>${esc(d.title)}</h3><span class="tag">${esc(d.ref)}</span><p>${esc(d.reflection)}</p><p><em>Prayer:</em> ${esc(d.prayer)}</p></div>`).join('')},
};
(PG[document.body.dataset.page]||(()=>{}))();
