/* DJFC shared code: storage, navigation, footer. Data lives ONLY in this browser (localStorage). */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SEED={
prayers:[{id:1,name:'Maria S.',title:'Healing for my mother',details:'Please pray for my mother as she recovers from surgery.',category:'Healing',public:true,praying:12,date:'2026-10-01'},
{id:2,name:'Anonymous',title:'Guidance in my job search',details:'Praying for open doors and wisdom in choosing the right work.',category:'Guidance',public:true,praying:7,date:'2026-10-05'},
{id:3,name:'Jonas R.',title:'Thankful for answered prayer',details:'God provided for our family this month. Praise Him!',category:'Thanksgiving',public:true,praying:4,date:'2026-10-09'},
{id:4,name:'Anonymous',title:'Peace for our family',details:'Pray for unity and peace in our home.',category:'Family',public:false,praying:0,date:'2026-10-10'}],
verses:[{id:1,ref:'Philippians 4:6',text:'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.'},
{id:2,ref:'Jeremiah 29:11',text:'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.'},
{id:3,ref:'Psalm 23:1',text:'The LORD is my shepherd; I shall not want.'},
{id:4,ref:'Matthew 11:28',text:'Come unto me, all ye that labour and are heavy laden, and I will give you rest.'},
{id:5,ref:'Isaiah 41:10',text:'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.'},
{id:6,ref:'Genesis 22:14',text:'And Abraham called the name of that place Jehovahjireh: as it is said to this day, In the mount of the LORD it shall be seen.'}],
devotionals:[{id:1,title:'The Lord Provides',ref:'Genesis 22:14',reflection:'Jehovah Jireh means "the Lord will provide." God sees our needs before we speak them. Trust Him with today.',prayer:'Father, thank You for being our Provider. Help me trust You in every need. Amen.'},
{id:2,title:'Peace Over Anxiety',ref:'Philippians 4:6-7',reflection:'Anxiety shrinks when we turn worries into prayers. Bring everything to God with a thankful heart.',prayer:'Lord, I give You my worries. Fill my heart with Your peace. Amen.'}],
};
const DB={all(k){let v=null;try{v=JSON.parse(localStorage.getItem('djfc_'+k))}catch(e){}if(!v){v=SEED[k];DB.save(k,v)}return v},
save(k,v){try{localStorage.setItem('djfc_'+k,JSON.stringify(v))}catch(e){}},
add(k,o){o.id=Date.now()+Math.floor(Math.random()*999);const a=DB.all(k);a.unshift(o);DB.save(k,a);return o}};
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.append(t)}t.textContent=m;t.className='show';setTimeout(()=>t.className='',2200)}
const NAV=[['index','Home'],['about','About'],['submit','Submit Prayer'],['wall','Prayer Wall'],['verses','Verses'],['devotionals','Devotionals']];
(function(){const cur=document.body.dataset.page;
$('#nav').innerHTML=`<div class="nav"><a class="brand" href="index.html"><img src="assets/logo.svg" alt="">DJFC</a><button class="burger" aria-label="Menu">&#9776;</button><ul class="menu">${NAV.map(n=>`<li><a href="${n[0]}.html" class="${n[0]==cur?'on':''}">${n[1]}</a></li>`).join('')}</ul></div>`;
$('.burger').onclick=()=>$('.menu').classList.toggle('open');})();
