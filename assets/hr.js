let sel=new URLSearchParams(location.search).get('id');
const $=id=>document.getElementById(id)||{};
const g=id=>$(id).value;
const cur=()=>S.ws.find(worker=>worker.id===sel);
const F=(id,label,type,value)=>`<div class="field"><label>${label}</label><input type="${type}" id="${id}" value="${value||''}"></div>`;

function newW(){
 const ism=g('n_i'),fam=g('n_f'),ota=g('n_o'),pas=g('n_p'),kirgan=g('n_k');
 const tugilgan=g('n_dob'),pasportMuddat=g('n_pass_exp'),kartaSana=kirgan,kartaMuddat=g('n_karta_m');
 const biletBor=$('n_ticket').checked,sertBor=$('n_cert').checked,sugurtaBor=$('n_insurance').checked;
 if(!ism||!fam||!ota||!pas||!kirgan||!g('n_country')||!tugilgan||!pasportMuddat||!kartaSana||!kartaMuddat)return toast("Asosiy ma'lumotlar, pasport va migratsion karta maydonlarini to'ldiring!",'warn');
 if(S.ws.some(worker=>worker.pas===pas))return toast('Bu pasport allaqachon mavjud!','warn');
 if(biletBor&&!g('n_b'))return toast('Bilet bor deb belgilandi — narxini kiriting','warn');
 if(sertBor&&(!g('n_cert_s')||!g('n_cert_m')))return toast('Sertifikat sanasi va amal qilish muddatini kiriting','warn');
 if(sugurtaBor&&!g('n_insurance_m'))return toast("Sug'urta amal qilish muddatini kiriting",'warn');
 const steps={
  karta:{done:1,sana:kartaSana,muddat:kartaMuddat,cost:0},
  pasport:{done:1,sana:kirgan,muddat:pasportMuddat,cost:0}
 };
 if(sertBor)steps.sert={done:1,sana:g('n_cert_s'),muddat:g('n_cert_m'),cost:0};
 if(sugurtaBor)steps.sugurta={done:1,sana:kirgan,muddat:g('n_insurance_m'),cost:0};
 const worker={
  id:'w'+Date.now(),ism,fam,ota,pas,kirgan,tugilgan,country:g('n_country'),
  pasport:{raqam:pas,muddat:pasportMuddat},
  bilet:{bor:biletBor,narx:biletBor?(+g('n_b')||0):0},
  sugurtaMavjud:sugurtaBor,st:'jarayon',steps,qarz:[],tolov:[],kiyim:null,brig:null,ish:null
 };
 const receipt=biletBor&&$('n_c').files[0];
 if(biletBor)debt(worker,'bilet','Aviabilet'+(receipt?' (chek: '+receipt.name+')':''),g('n_b'));
 if(g('n_y'))debt(worker,'yol',g('n_z')||"Yo'ldagi xarajat",g('n_y'));
 S.ws.push(worker);
 audit(worker,'Ishchi profili yaratildi',`Ism: ${ism} ${fam} ${ota}; tug‘ilgan sana: ${tugilgan}; davlat: ${worker.country}; pasport: ${pas}, amal qilish muddati: ${pasportMuddat}; Rossiyaga kirgan sana: ${kirgan}; migratsion karta: ${kartaSana}, amal qilish muddati: ${kartaMuddat}; bilet: ${biletBor?'ha, '+fmt(worker.bilet.narx):'yo‘q'}; sertifikat: ${sertBor?'bor, amal qilish muddati '+g('n_cert_m'):'olish jarayonida'}; sug‘urta: ${sugurtaBor?'bor, amal qilish muddati '+g('n_insurance_m'):'olish jarayonida'}.`);
 save();
 location.href='profil.html?id='+encodeURIComponent(worker.id);
}

function saveSt(key){
 const worker=cur(),sana=g(key+'_s'),muddat=g(key+'_m')||(key==='royxat'&&sana?add(sana,3,'m'):'');
 const cost=['karta','pasport','sugurta'].includes(key)?0:+g(key+'_c')||0;
 if(!sana||(key!=='patent'&&!muddat))return toast('Sana va muddatni kiriting','warn');
 if(key==='karta'&&worker.kirgan&&sana!==worker.kirgan)return toast('Migratsion karta Rossiyaga kirgan kuni rasmiylashtirilishi kerak','warn');
 const previous=worker.steps[key]||{};
 worker.steps[key]={done:1,sana,muddat,cost,exam:previous.exam};
 debt(worker,'st_'+key,key==='patent'?'Patent: 1-chek':NM[key],cost,key==='med'||key==='patent');
 if(key==='pasport')worker.pasport={raqam:worker.pasport&&worker.pasport.raqam||worker.pas,muddat};
 if(key==='sugurta')worker.sugurtaMavjud=true;
 if(key==='patent'){
  worker.steps[key].topshirilgan=sana;
  worker.nextPay=add(sana,1,'m');
  if(!worker.kiyim)worker.kiyim='kutmoqda';
 }
 audit(worker,`${NM[key]} bosqichi ${previous.done?'yangilandi':'bajarildi'}`,
  `${key==='patent'?'Patentga hujjat topshirilgan sana':'Rasmiylashtirilgan sana'}: ${sana}; ${muddat?`amal qilish muddati: ${muddat}; `:''}xarajat: ${fmt(cost)}.${key==='patent'&&worker.kirgan&&D(sana)>D(patentDeadline(worker))?' Patent hujjati 30 kunlik muddatdan kech topshirildi.':''}`);
 save();render();toast(NM[key]+' saqlandi ✓');
}

function exam(){
 const worker=cur(),sana=g('ex_d');
 if(!sana)return toast('Imtihon sanasini kiriting','warn');
 const sert=worker.steps.sert=worker.steps.sert||{};
 sert.exam=sert.exam||[];
 const cost=+g('ex_c')||0;
 sert.exam.push({sana,cost});
 debt(worker,'ex_'+sert.exam.length,'Imtihon, '+sert.exam.length+'-urinish',cost);
 audit(worker,'Sertifikat imtihoni belgilandi',`${sert.exam.length}-urinish; sana: ${sana}; xarajat: ${fmt(cost)}.`);
 save();render();toast('Imtihon belgilandi ✓');
}

function pay(){
 const worker=cur(),amount=+g('pay_c');
 if(!amount)return toast('Summani kiriting','warn');
 worker.tolov.push({sana:S.today,summa:amount,muddat:worker.nextPay});
 worker.nextPay=add(worker.nextPay,1,'m');
 audit(worker,"Patent to'lovi qayd etildi",`To'lov sanasi: ${S.today}; summa: ${fmt(amount)}; keyingi to'lov: ${worker.nextPay}.`);
 save();render();toast("Chek to'landi ✓");
}

function assign(){
 const worker=cur(),oldBrigade=worker.brig;
 worker.brig=g('br');worker.ish=S.today;worker.st='ishlamoqda';
 audit(worker,'Ishchi brigadaga biriktirildi',`${oldBrigade?brigName(oldBrigade)+' brigadasidan ':''}${brigName(worker.brig)} brigadasiga; ish boshlagan sana: ${worker.ish}.`);
 save();render();toast('Brigadaga biriktirildi ✓');
}

function saveCountry(){
 const worker=cur(),country=g('profileCountry');
 if(!country)return toast('Davlatni tanlang','warn');
 if(worker.country===country)return toast('Davlat o‘zgarmadi','warn');
 const previous=worker.country||'Kiritilmagan';
 worker.country=country;
 audit(worker,'Ishchi davlati yangilandi',`Oldingi qiymat: ${previous}; yangi qiymat: ${country}.`);
 save();render();toast('Davlat ma’lumoti saqlandi ✓');
}

function leave(){
 const worker=cur(),underSixMonths=left(add(worker.ish||worker.kirgan,6,'m'))>0&&worker.ish;
 const days=Math.max(0,-left(worker.kirgan)),dailyCost=+g('kl')||0,open=sum(worker);
 const total=underSixMonths?open+days*dailyCost:open;
 if(!confirm((underSixMonths?"6 oy to'lmadi. Hamma xarajat va "+days+" kun yashash qarzga yoziladi: ":"Qarz: ")+fmt(total)+". Davom etamizmi?"))return;
 worker.hisob={sana:S.today,open,kun:days,kl:dailyCost,jami:total,m6:!!underSixMonths};
 worker.st='tarix';
 audit(worker,'Ishdan ketish qayd etildi',`Sana: ${S.today}; yakuniy hisob: ${fmt(total)}; yashagan kunlar: ${days}.`);
 sel=null;save();render();
}

function back(id){
 const worker=S.ws.find(item=>item.id===id);
 const wasDeleted=!!worker.deleted;
 worker.st='jarayon';worker.brig=null;worker.ish=null;delete worker.hisob;delete worker.deleted;
 audit(worker,wasDeleted?'O‘chirilgan profil tiklandi':'Ishchi jarayonga qaytarildi','Profil qayta tiklandi; avvalgi brigada biriktiruvi bekor qilindi.');
 sel=id;save();render();toast('Profil qayta tiklandi ✓');
}

function del(){
 const worker=cur();
 if(!confirm("Ishchini arxivga o‘tkazamizmi? Ma’lumotlar va amallar tarixi saqlanadi."))return;
 worker.st='tarix';worker.deleted=true;
 worker.hisob={sana:S.today,open:sum(worker),kun:0,kl:0,jami:sum(worker),m6:false,deleted:true};
 audit(worker,'Ishchi profili arxivlandi','Profil ma’lumotlari va amallar tarixi saqlab qolindi; ro‘yxatdan yashirildi.');
 sel=null;save();render();
}

function detail(){}

let openStage=null;
const STAGE_INFO={
 karta:'Migratsion karta ma’lumoti kiritiladi. Olingan sana va amal qilish muddati kuzatiladi.',
 pasport:'Pasportning amal qilish muddati kuzatiladi va muddati tugashidan oldin eslatma beriladi.',
 sert:'Sertifikat va unga tegishli imtihon sanalari qayd etiladi.',
 royxat:"Ro'yxatga qo'yilgan sana va hujjat muddati kuzatiladi.",
 med:"Tibbiy ko'rikdan o'tgan sana va hujjat muddati qayd etiladi.",
 sugurta:"Sug'urta bor bo'lsa uning amal qilish muddati kuzatiladi; yo'q bo'lsa olish jarayoni eslatiladi.",
 patent:'Patentga hujjat topshirilgan sana qayd etiladi. Muddat Rossiyaga kirgan sanadan boshlab 30 kun.'
};

function stageInfoHtml(worker,key){
 const stage=worker.steps[key]||{},done=!!stage.done,exams=key==='sert'&&(stage.exam||[]);
 return `<tr class="stage-detail"><td colspan="4"><div class="stage-explainer">
  <div class="stage-explainer-head"><b>${NM[key]}</b><span class="chip ${done?'':'warn'}"><span class="dot"></span>${done?'Bajarilgan':'Hali boshlanmagan'}</span></div>
  <p>${STAGE_INFO[key]}</p>
  <div class="stage-values">
   <span><b>Jarayon:</b> ${done?'Hujjat kiritilgan':'Ma’lumot kutilmoqda'}</span>
   <span><b>Olingan sana:</b> ${stage.sana||'—'}</span>
   <span><b>Amal qilish muddati:</b> ${stage.muddat||'—'}</span>
   ${key==='patent'?`<span><b>Topshirish oxirgi kuni:</b> ${worker.kirgan?patentDeadline(worker):'—'}</span>`:''}
   <span><b>Xarajat:</b> ${stage.cost?fmt(stage.cost):'—'}</span>
   ${key==='sert'?`<span><b>Imtihon urinishlari:</b> ${exams.length?exams.map((exam,index)=>`${index+1}) ${exam.sana} (${fmt(exam.cost)})`).join(' · '):'hali belgilanmagan'}</span>`:''}
  </div>
  <a class="btn ghost sm" href="profil.html?id=${encodeURIComponent(worker.id)}">Profilni ochish</a>
 </div></td></tr>`;
}

function showStage(workerId,key){
 openStage=openStage&&openStage.workerId===workerId&&openStage.key===key?null:{workerId,key};
 render();
}

function workerMatches(worker){
 const query=($('workerSearch').value||'').trim().toLocaleLowerCase();
 const text=[worker.ism,worker.fam,worker.ota,worker.pas].join(' ').toLocaleLowerCase();
 const country=$('countryFilter').value,brigade=$('brigadeFilter').value,status=$('statusFilter').value;
 if(query&&!text.includes(query))return false;
 if(country==='__unknown__'&&worker.country)return false;
 if(country&&country!=='__unknown__'&&worker.country!==country)return false;
 if(brigade&&(worker.brig||'')!==brigade)return false;
 if(status==='active'&&(worker.st==='tarix'||worker.deleted))return false;
 if(status==='working'&&worker.st!=='ishlamoqda')return false;
 if(status==='process'&&worker.st!=='jarayon')return false;
 if(status==='history'&&(worker.st!=='tarix'||worker.deleted))return false;
 if(status==='deleted'&&!worker.deleted)return false;
 return true;
}

function renderFilters(){
 const countryFilter=$('countryFilter'),brigadeFilter=$('brigadeFilter');
 if(!countryFilter||!countryFilter.insertAdjacentHTML||countryFilter.dataset.ready)return;
 const countries=[...new Set(S.ws.map(worker=>worker.country).filter(Boolean))].sort();
 if(S.ws.some(worker=>!worker.country))countries.push('__unknown__');
 countryFilter.insertAdjacentHTML('beforeend',countries.map(country=>`<option value="${country}">${country==='__unknown__'?'Davlat kiritilmagan':country}</option>`).join(''));
 brigadeFilter.insertAdjacentHTML('beforeend',BRIGADES.map(brigade=>`<option value="${brigade.id}">${brigade.name}</option>`).join(''));
 countryFilter.dataset.ready='true';
}

function renderWorkers(){
 renderFilters();
 const workers=S.ws.filter(workerMatches),labels={karta:'Karta',sert:'Sertifikat',royxat:"Ro'yxat",med:'Tibbiy ko‘rik',patent:'Patent'};
 $('resultCount').textContent=`${workers.length} ta ishchi`;
 $('tb').innerHTML=workers.map(worker=>{
  const completed=STG.filter(key=>worker.steps[key]&&worker.steps[key].done).length;
  const status=worker.deleted
   ?'<span class="chip danger"><span class="dot"></span>Arxivlangan</span>'
   :worker.st==='tarix'
    ?'<span class="chip danger"><span class="dot"></span>Ishdan ketgan</span>'
   :worker.st==='ishlamoqda'
    ?'<span class="chip"><span class="dot"></span>Ishlayapti</span>'
    :'<span class="chip warn"><span class="dot"></span>Hujjat jarayonida</span>';
  const stages=STG.map((key,index)=>{
   const selected=openStage&&openStage.workerId===worker.id&&openStage.key===key;
   return `<button type="button" class="stage-pill ${worker.steps[key]&&worker.steps[key].done?'complete':''} ${selected?'selected':''}" aria-label="${labels[key]} bosqichi tafsilotlari" aria-expanded="${!!selected}" onclick="showStage('${worker.id}','${key}')"><span>${index+1}</span>${labels[key]}</button>`;
  }).join('');
  const brigade=worker.brig?brigName(worker.brig):'Hali biriktirilmagan';
  return `<tr class="worker-row" onclick="if(!event.target.closest('button,a'))location.href='profil.html?id=${encodeURIComponent(worker.id)}'">
   <td><a class="worker-link" href="profil.html?id=${encodeURIComponent(worker.id)}"><b>${worker.fam} ${worker.ism}</b></a><div class="sm2">${worker.pas||'Pasport kiritilmagan'} · ${worker.country||'Davlat kiritilmagan'}</div></td>
   <td><div class="stage-steps">${stages}</div><div class="stage-progress">${completed}/5 bosqich bajarilgan</div></td>
   <td>${brigade}</td><td>${status}</td>
  </tr>${openStage&&openStage.workerId===worker.id?stageInfoHtml(worker,openStage.key):''}`;
 }).join('')||'<tr><td class="empty-cell" colspan="4">Mos ishchi topilmadi. Qidiruv yoki filtrlarni o‘zgartirib ko‘ring.</td></tr>';
}

function render(){
 tick();bell();
 $('td').textContent=S.today;
 document.querySelectorAll('.rub').forEach(element=>element.textContent=RUB);
 const activeWorkers=S.ws.filter(worker=>worker.st!=='tarix'&&!worker.deleted);
 $('stats').innerHTML=[
  [activeWorkers.length,'Faol ishchilar',''],
  [activeWorkers.filter(worker=>worker.st==='jarayon').length,'Hujjat jarayonida','rust'],
  [activeWorkers.filter(worker=>worker.st==='ishlamoqda').length,'Ishlayapti','moss']
 ].map(item=>`<div class="stat ${item[2]}"><div class="bar"></div><div class="num">${item[0]}</div><div class="lbl">${item[1]}</div></div>`).join('');
 $('rem').innerHTML=rems().map(reminder=>`<div class="row" style="align-items:center;border-bottom:1px solid #eee;padding:6px 0"><b style="min-width:150px">${reminder.n}</b><span style="flex:1;min-width:170px">${reminder.t}</span>${chip(reminder.d,dtxt(reminder.d))}<span class="sm2" style="margin:0">eslatma: ${freq(reminder.d)}</span></div>`).join('')||'<div class="empty">Eslatma yo‘q</div>';
 renderWorkers();
 detail();
 $('hist').innerHTML=S.ws.filter(worker=>worker.st==='tarix'&&!worker.deleted).map(worker=>`<div class="row" style="align-items:center;border-bottom:1px solid #eee;padding:6px 0"><b style="min-width:150px">${worker.fam} ${worker.ism}</b><span style="flex:1;min-width:200px">Ketgan: ${worker.hisob.sana} · qarz: <b>${fmt(worker.hisob.jami)}</b>${worker.hisob.m6?` (ochiq ${fmt(worker.hisob.open)} + ${worker.hisob.kun} kun yashash)`:''}</span><a class="btn ghost sm" href="profil.html?id=${encodeURIComponent(worker.id)}">Profil</a><button class="btn ghost sm" onclick="back('${worker.id}')">Qayta tiklash</button></div>`).join('')||'<div class="empty">Tarix bo‘sh</div>';
}

['workerSearch','countryFilter','brigadeFilter','statusFilter'].forEach(id=>{
 if($(id).addEventListener){
  $(id).addEventListener('input',renderWorkers);
  $(id).addEventListener('change',renderWorkers);
 }
});
function resetWorkerFilters(){
 if(!$('workerSearch').value&&$('countryFilter').value===''&&$('brigadeFilter').value===''&&$('statusFilter').value==='active')return;
 $('workerSearch').value='';$('countryFilter').value='';$('brigadeFilter').value='';$('statusFilter').value='active';
 renderWorkers();
}
