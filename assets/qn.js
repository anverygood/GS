/* QN umumiy holat (localStorage) — HR va Omborchi sahifalari bo'lishadi */
const RUB='₽',KEY='qn_v1',pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()),D=s=>new Date(s+'T00:00:00');
function add(s,n,u){const d=D(s);u=='m'?d.setMonth(d.getMonth()+n):d.setDate(d.getDate()+n);return iso(d)}
let S=JSON.parse(localStorage.getItem(KEY)||'null')||{today:'2026-11-22',ws:[]};
if(!Array.isArray(S.audit))S.audit=[];
S.ws.forEach(worker=>{
 worker.steps=worker.steps||{};
 worker.qarz=worker.qarz||[];
 worker.tolov=worker.tolov||[];
 worker.qarz=worker.qarz.filter(item=>item.id!=='st_karta'&&item.nom!=='Migratsion karta');
 if(worker.steps.karta)worker.steps.karta.cost=0;
});
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
const left=s=>Math.round((D(s)-D(S.today))/864e5),fmt=n=>(n||0).toLocaleString('ru-RU')+' '+RUB;
const sum=w=>w.qarz.filter(x=>!x.yopildi).reduce((a,x)=>a+x.summa,0);
function audit(w,action,details,actorRole){
 const role=actorRole||sessionStorage.getItem('qnRole')||'hr',meta=ROLE_META[role]||{label:'Foydalanuvchi',name:'Foydalanuvchi'};
 const actor=role==='system'?{label:'Tizim',name:'Avtomatik tizim'}:meta;
 S.audit.push({id:'a'+Date.now()+Math.random().toString(36).slice(2,7),workerId:w.id,sana:S.today,vaqt:new Date().toISOString(),actor:actor.name,role:actor.label,action,details});
}
const NM={karta:'Migratsion karta',pasport:'Pasport',sert:'Sertifikat',royxat:"Ro'yxatga qo'yish",med:'Med komissiya',sugurta:"Sug'urta",patent:'Patent'},STG=Object.keys(NM);
function debt(w,id,nom,v,kech){if(id==='st_karta'||nom==='Migratsion karta')return;v=+v||0;w.qarz=w.qarz.filter(x=>x.id!=id||x.yopildi);if(v>0)w.qarz.push({id,sana:S.today,nom,summa:v,kech:!!kech})}
function tick(){S.ws.forEach(w=>{if(w.st=='ishlamoqda'&&w.ish&&left(add(w.ish,6,'m'))<=0)w.qarz.forEach(x=>{if(x.kech&&!x.yopildi){x.yopildi=S.today;x.izoh='6 oy ishladi: kechirildi';audit(w,'Kiyim xarajati avtomatik kechirildi',`Qarz turi: ${x.nom}; summa: ${fmt(x.summa)}; 6 oylik ish muddati to‘ldi.`,'system')}})});save()}
const chip=(d,t)=>`<span class="chip ${d!==null&&d<=7?'danger':d!==null&&d<=15?'warn':''}"><span class="dot"></span>${t}</span>`;
const dtxt=d=>d===null?'kiritilmagan':d<0?`${-d} kun o'tgan!`:d==0?'BUGUN':`${d} kun qoldi`;
const freq=d=>d===null||d<0?"har 3 soatda":d<=3?'kuniga 3 marta (09:00, 13:00, 18:00)':d<=7?'kuniga 2 marta':d<=10?'kun ora':d<=15?'15 kun oldin 1 marta':'erta';
function patentDeadline(worker){return worker.kirgan?add(worker.kirgan,PATENT_SUBMISSION_DAYS):null}
function rems(){const r=[];S.ws.filter(w=>w.st!='tarix'&&!w.deleted).forEach(w=>{
 const n=w.fam+' '+w.ism,s=w.steps||{},ok=k=>s[k]&&s[k].done,p=(t,d)=>r.push({w,n,t,d});
 if(!ok('karta'))p('Migratsion karta — kirgan kuni rasmiylashtirish kerak',w.kirgan?left(w.kirgan):0);
 if(w.pasport&&w.pasport.muddat)p('Pasport muddati',left(w.pasport.muddat));
 else if(w.pasportMuddat)p('Pasport muddati',left(w.pasportMuddat));
 ['karta','pasport','sert','royxat','med','sugurta','patent'].forEach(k=>{if(ok(k)&&s[k].muddat)p(NM[k]+' muddati',left(s[k].muddat))});
 const deadline=patentDeadline(w),daysToDeadline=deadline?left(deadline):null;
 if(!ok('sert'))p('Sertifikat olish jarayoni',daysToDeadline);
 if(!ok('sugurta'))p("Sug'urta olish jarayoni",daysToDeadline);
 if(!ok('royxat'))p("Ro'yxatga qo'yish — patent uchun hujjat",daysToDeadline);
 if(!ok('med'))p("Tibbiy ko'rik — patent uchun hujjat",daysToDeadline);
 if(!ok('patent'))p('Patentga hujjat topshirish (30 kunlik muddat)',daysToDeadline);
 else if(deadline&&s.patent.sana&&D(s.patent.sana)>D(deadline))p('Patentga hujjat kech topshirilgan',left(s.patent.sana));
 if(w.nextPay)p("Patent to'lovi",left(w.nextPay));
 });
 return r.sort((a,b)=>(a.d===null?-999:a.d)-(b.d===null?-999:b.d))}
function bell(){NOTIFICATIONS.length=0;rems().slice(0,6).forEach(x=>NOTIFICATIONS.push({type:x.d===null||x.d<=7?'warn':'info',title:x.t+': '+dtxt(x.d),text:x.n}))}
NAV.hr=[{sec:'HR'},{href:'hr.html',key:'royxat',icon:'users',label:'Ishchilar'},{href:'hr.html#yangi',key:'yangi',icon:'plus',label:'Yangi ishchi'},{href:'hr.html#eslatma',key:'eslatma',icon:'clip',label:'Eslatmalar'},{href:'hr.html#tarix',key:'tarix',icon:'file',label:'Tarix (ketganlar)'}];
NAV.omborchi=[{sec:'Ombor'},{href:'omborchi.html',key:'kiyim',icon:'id',label:'Kiyim berish'}];
ROLE_META.omborchi={label:'Omborchi',name:'Omborchi'};
NAV.hr=[{sec:'HR'},{href:'hr.html',key:'royxat',icon:'users',label:'Ishchilar'},{href:'hr-yangi.html',key:'yangi',icon:'plus',label:'Yangi ishchi'},{href:'hr-eslatma.html',key:'eslatma',icon:'clip',label:'Eslatmalar'},{href:'hr-tarix.html',key:'tarix',icon:'file',label:'Tarix (ketganlar)'}];
function skip(n){S.today=add(S.today,n);save();render();const e=document.getElementById('dd');if(e)e.textContent=S.today}
function clr(){if(confirm("Hamma demo ma'lumot o'chadi")){S={today:S.today,ws:[],audit:[],seeded:1};save();render()}}
function again(){seed();render()}
function demo(){document.querySelector('.content').insertAdjacentHTML('afterbegin',`<div class="demo"><b>Demo vaqt: <span id="dd">${S.today}</span></b><button class="btn ghost sm" onclick="skip(7)">+7 kun</button><button class="btn ghost sm" onclick="skip(30)">+1 oy</button><button class="btn ghost sm" onclick="skip(185)">+6 oy</button><button class="btn ghost sm" onclick="again()">Namuna ma'lumot</button><button class="btn ghost sm" onclick="clr()">Tozalash</button></div>`)}
function seed(){const T=S.today,a=n=>add(T,n),st=(s,m,c)=>({done:1,sana:s,muddat:m,cost:c});
 const W=(i,f,o,p,k,steps,x)=>{const w=Object.assign({id:'w'+p,ism:i,fam:f,ota:o,pas:p,kirgan:k,st:'jarayon',steps,qarz:[],tolov:[],kiyim:null,brig:null,ish:null},x);
  Object.keys(steps).forEach(q=>{const s=steps[q];if(s.done)debt(w,'st_'+q,q=='patent'?'Patent: 1-chek':NM[q],s.cost,q=='med'||q=='patent')});return w};
 const w1=W('Anvar','Safarov','Shafoatovich','AB1234567',a(-8),{karta:st(a(-8),a(173),0),pasport:st(a(-8),a(400),0),sert:st(a(-5),a(360),4900),royxat:st(a(-6),a(84),1800),med:st(a(-4),a(361),3600),sugurta:st(a(-6),a(360),0),patent:st(a(-3),'',7500)},{country:"O'zbekiston",tugilgan:'1995-04-12',pasport:{raqam:'AB1234567',muddat:a(400)},bilet:{bor:true,narx:18500},nextPay:add(a(-3),1,'m'),kiyim:'kutmoqda'});
 debt(w1,'bilet','Aviabilet',18500);debt(w1,'yol',"Yo'ldagi xarajat",2300);
 const w2=W('Bobur','Karimov','Rustamovich','AC7788112',a(-4),{karta:st(a(-4),a(177),0),pasport:st(a(-4),a(300),0),sert:{exam:[{sana:a(5),cost:4900}]}},{country:'Tojikiston',tugilgan:'1998-06-08',pasport:{raqam:'AC7788112',muddat:a(300)},bilet:{bor:true,narx:16800}});
 debt(w2,'bilet','Aviabilet',16800);debt(w2,'ex_1','Imtihon, 1-urinish',4900);
 const full=d=>({karta:st(a(d-2),a(60),0),pasport:st(a(d),a(400),0),sert:st(a(d+2),a(160),4900),royxat:st(a(d+1),a(12),1800),med:st(a(d+3),a(120),3600),sugurta:st(a(d+1),a(120),0),patent:st(a(d+5),'',7500)});
 const w3=W('Jasur','Nazarov','Akbarovich','AD5541223',a(-230),full(-228),{country:"Qirg'iziston",tugilgan:'1990-02-14',pasport:{raqam:'AD5541223',muddat:a(400)},bilet:{bor:true,narx:19000},st:'ishlamoqda',brig:'br1',ish:a(-200),nextPay:a(4),kiyim:{sana:a(-205),narx:2500},tolov:[{sana:a(-56),summa:7500},{sana:a(-26),summa:7500}]});
 debt(w3,'kiyim','Kiyim (bir martalik)',2500,true);
 const w4Steps=full(-58);delete w4Steps.sugurta;
 const w4=W('Dilshod','Xasanov','Anvarovich','AE9012334',a(-60),w4Steps,{country:"O'zbekiston",tugilgan:'1994-09-10',pasport:{raqam:'AE9012334',muddat:a(400)},bilet:{bor:false,narx:0},sugurtaMavjud:false,st:'ishlamoqda',brig:'br3',ish:a(-40),nextPay:a(9),kiyim:{sana:a(-45),narx:2500}});
 debt(w4,'kiyim','Kiyim (bir martalik)',2500,true);debt(w4,'bilet','Aviabilet',17200);
 S.ws=[w1,w2,w3,w4];S.ws.forEach(w=>audit(w,'Demo profil yaratildi','Namuna ma’lumotlar tizimga yuklandi. Avvalgi amallar tarixi mavjud emas.','system'));S.seeded=1;save()}
if(!S.seeded&&!S.ws.length)seed();
