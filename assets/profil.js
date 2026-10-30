function okk(worker,key){return worker.steps[key]&&worker.steps[key].done}

function row(worker,key,extra='',readOnly=false){
 const stage=worker.steps[key]||{},done=okk(worker,key);
 const dateLabel=key==='patent'?'Patentga topshirilgan sana':key==='karta'?'Rossiyaga kirgan sana':key==='pasport'?'Pasport berilgan sana':key==='sugurta'?"Sug'urta olingan sana":'Olingan sana';
 const noCost=['karta','pasport','sugurta'].includes(key);
 const dateLine=done
  ?`${stage.sana?`${dateLabel}: ${stage.sana}`:'Sana kiritilmagan'}${stage.muddat?` → ${stage.muddat} ${chip(left(stage.muddat),dtxt(left(stage.muddat)))}`:''}`
  :'<span class="mu">Hali kiritilmagan</span>';
 const edit=readOnly?'':`<details><summary>${done?'Tahrirlash':'Ma’lumot kiritish'}</summary><div class="row">
  ${F(key+'_s',dateLabel,'date',stage.sana||(key==='karta'||key==='pasport'?worker.kirgan:''))}
  ${key==='patent'?'':F(key+'_m','Amal qilish muddati','date',stage.muddat)}
  ${noCost?'':F(key+'_c',(key==='patent'?'Birinchi to‘lov':'Xarajat')+' ('+RUB+')','number',stage.cost)}
  <button class="btn amber sm" onclick="saveSt('${key}')">Saqlash</button>
 </div></details>`;
 return `<div class="tl ${done?'on':''}"><i></i><div><b>${NM[key]}</b>
  <div>${dateLine}${stage.cost?` <span class="mu">· xarajat ${fmt(stage.cost)}</span>`:''}</div>
  ${extra}${edit}
 </div></div>`;
}

function detail(){
 const worker=cur(),element=$('detail');
 if(!worker){
  element.innerHTML='<div class="card"><div class="card-body">Ishchi topilmadi yoki o‘chirib yuborilgan. <a href="hr.html">← Ishchilar ro‘yxati</a></div></div>';
  return;
 }
 const readOnly=worker.st==='tarix'||worker.deleted;
 const exams=(worker.steps.sert&&worker.steps.sert.exam)||[];
 const completed=STG.filter(key=>okk(worker,key)).length;
 const card=(title,body)=>`<section class="card mb-20"><div class="card-body"><h3>${title}</h3>${body}</div></section>`;
 const list=items=>items.length?items.join(''):'<div class="empty">Ma’lumot hali kiritilmagan.</div>';
 const examDetails=(exams.length
  ?`<div class="mu">Imtihon urinishlari: ${exams.map((exam,index)=>`${index+1}) ${exam.sana} (${fmt(exam.cost)})`).join(' · ')}</div>`
  :'<div class="mu">Imtihon hali belgilanmagan.</div>')+
  (readOnly?'':`<details><summary>Imtihon belgilash</summary><div class="row">${F('ex_d','Imtihon sanasi','date')}${F('ex_c','Xarajat ('+RUB+')','number')}<button class="btn ghost sm" onclick="exam()">Belgilash</button></div></details>`);
 const debtRows=(worker.qarz||[]).map(item=>`<tr><td>${item.sana||'—'}</td><td>${item.nom||'—'}</td><td>${fmt(item.summa)}</td><td>${item.yopildi?chip(99,item.izoh||'Yopildi'):item.kech?chip(15,'6 oyda kechiriladi'):'Ochiq'}</td></tr>`);
 const debtTable=`<div class="tbl-wrap"><table><thead><tr><th>Sana</th><th>Sabab</th><th>Summa</th><th>Holati</th></tr></thead><tbody>${debtRows.join('')||'<tr><td colspan="4">Qarz qayd etilmagan.</td></tr>'}</tbody></table></div>`;
 const paymentRows=(worker.tolov||[]).map(payment=>`<div class="line"><b>${payment.sana||'—'}</b><span>${fmt(payment.summa)}${payment.muddat?` · muddati ${payment.muddat}`:''}</span></div>`);
 const salaryRows=(worker.oylikTarixi||[]).map(payment=>`<div class="line"><b>${payment.sana||'—'}</b><span>${payment.izoh||'Oylik hisob-kitobi'} · jami ${fmt(payment.jami)} · berildi ${fmt(payment.qolgan)}</span></div>`);
 const brigadeRows=(worker.brigadaTarixi||[]).map(item=>`<div class="line"><b>${item.sana||'—'}</b><span>${item.brigada||'Brigada ko‘rsatilmagan'} · ${item.amal||'o‘zgarish'}</span></div>`);
 const auditRows=(S.audit||[]).filter(entry=>entry.workerId===worker.id).sort((a,b)=>new Date(b.vaqt)-new Date(a.vaqt));
 const activity= auditRows.map(entry=>`<div class="activity-entry">
  <span class="activity-dot" aria-hidden="true"></span>
  <div class="activity-body">
   <div class="activity-heading"><b>${entry.action}</b><span class="mono">${entry.sana||'—'}${entry.vaqt?` · ${new Date(entry.vaqt).toLocaleTimeString('uz-UZ',{hour:'2-digit',minute:'2-digit'})}`:''}</span></div>
   <p>${entry.details||'Tafsilot kiritilmagan.'}</p>
   <div class="activity-actor">Amalni bajardi: <b>${entry.actor||'Noma’lum'}</b> · ${entry.role||'Rol ko‘rsatilmagan'}</div>
  </div>
 </div>`);
 const status=worker.deleted?'<span class="chip danger"><span class="dot"></span>Arxivlangan</span>'
  :readOnly?'<span class="chip danger"><span class="dot"></span>Ishdan ketgan</span>'
  :worker.st==='ishlamoqda'?'<span class="chip"><span class="dot"></span>Ishlayapti</span>'
  :'<span class="chip warn"><span class="dot"></span>Hujjat jarayonida</span>';
 const nextPay=worker.nextPay?`<div class="line"><b>Keyingi patent to‘lovi</b><span>${worker.nextPay} ${chip(left(worker.nextPay),dtxt(left(worker.nextPay)))}</span></div>`:'';
 const clothing=worker.kiyim==='kutmoqda'
  ?'<div class="line"><b>Kiyim</b><span>Omborda berilishini kutmoqda</span></div>'
  :worker.kiyim&&worker.kiyim.sana
   ?`<div class="line"><b>Kiyim berilgan sana</b><span>${worker.kiyim.sana} · ${fmt(worker.kiyim.narx)}${(worker.qarz||[]).some(item=>item.id==='kiyim'&&item.yopildi)?' · qarz kechirilgan':' · qarzga yozilgan'}</span></div>`
   :'<div class="line"><b>Kiyim</b><span>Hali berilmagan</span></div>';
 const brigade=worker.brig
  ?`${brigName(worker.brig)} · ish boshlagan sana: ${worker.ish||'—'} · 6 oylik sana: ${worker.ish?add(worker.ish,6,'m'):'—'}`
  :'Hali brigadaga biriktirilmagan';
 const brigadeAction=worker.st==='jarayon'&&!readOnly
  ?`<div class="mu">Hujjatlar ketma-ketligi belgilanmagan. Har bir hujjat holatini alohida kuzating va patentga hujjatlarni 30 kun ichida topshiring.</div><div class="row"><div class="field"><label>Brigada</label><select id="br">${BRIGADES.map(item=>`<option value="${item.id}">${item.name} — ${item.obj}</option>`).join('')}</select></div><button class="btn amber sm" onclick="assign()">Brigadaga biriktirish</button></div>`
  :'';
 const actions=readOnly
  ?`<button class="btn amber sm" onclick="back('${worker.id}')">${worker.deleted?'Profilni qayta tiklash':'Ish jarayoniga qaytarish'}</button>`
  :`<div class="mu">Ishdan ketish qayd etilganda yakuniy hisob amallar tarixiga qo‘shiladi.</div><div class="row">${F('kl','Kunlik yashash xarajati ('+RUB+')','number')}<button class="btn ghost sm" onclick="leave()">Ishdan ketganini qayd etish</button><button class="btn ghost sm" onclick="del()">Arxivga o‘tkazish</button></div>`;
 const patentDue=worker.kirgan?patentDeadline(worker):null;
 const patentStatus=okk(worker,'patent')
  ?`Patentga hujjat topshirilgan sana: <b>${worker.steps.patent.sana}</b>${patentDue&&D(worker.steps.patent.sana)>D(patentDue)?' · <span class="txt-rust">30 kunlik muddatdan kech</span>':''}`
  :`Patentga topshirish muddati: <b>${patentDue||'Kirish sanasini kiriting'}</b>${patentDue?` ${chip(left(patentDue),dtxt(left(patentDue)))}`:''}`;
 const ticketInfo=worker.bilet&&worker.bilet.bor
  ?`Bor${worker.bilet.narx?` · narxi ${fmt(worker.bilet.narx)}`:''}`
  :worker.bilet?'Yo‘q':'Eski profil: ma’lumot kiritilmagan';
 const insuranceInfo=okk(worker,'sugurta')?`Bor · amal qilish muddati ${worker.steps.sugurta.muddat||'—'}`:"Sug'urta yo'q yoki qayd etilmagan — olish kerak";

 element.innerHTML=`
  <section class="card mb-20">
   <div class="cover"></div>
   <div class="card-body ph">
    <div class="av" style="background:${avatarColor(worker.id)}">${initials(worker.ism,worker.fam)}</div>
    <div><h2>${worker.fam} ${worker.ism} ${worker.ota||''}</h2><div class="mu">Pasport: ${worker.pas||'—'} · ${worker.country||'Davlat kiritilmagan'}</div>${status}</div>
   </div>
   <div class="kp">
    <div><b>${fmt(sum(worker))}</b><span>Ochiq qarz</span></div>
    <div><b>${completed} / ${STG.length}</b><span>Tugagan bosqich</span></div>
    <div><b>${worker.brig?brigName(worker.brig):'—'}</b><span>Brigada</span></div>
    <div><b>${worker.kirgan||'—'}</b><span>Kirish sanasi</span></div>
   </div>
  </section>
  ${card('Shaxsiy va ish ma’lumotlari',`
   <div class="profile-facts">
    <div><span>Ism-familiya</span><b>${worker.ism} ${worker.fam} ${worker.ota||''}</b></div>
    <div><span>Pasport</span><b class="mono">${worker.pas||'—'}</b></div>
    <div><span>Pasport muddati</span><b>${worker.pasport&&worker.pasport.muddat||worker.pasportMuddat||worker.steps.pasport&&worker.steps.pasport.muddat||'—'}</b></div>
    <div><span>Davlati</span>${readOnly?`<b>${worker.country||'Kiritilmagan'}</b>`:`<select id="profileCountry" aria-label="Ishchi davlati"><option value="">Davlatni tanlang</option>${COUNTRIES.map(country=>`<option value="${country}" ${worker.country===country?'selected':''}>${country}</option>`).join('')}</select><button class="btn ghost sm" style="margin-top:7px" onclick="saveCountry()">Davlatni saqlash</button>`}</div>
    <div><span>Tug‘ilgan sana</span><b>${worker.tugilgan||'—'}</b></div>
    <div><span>Bilet</span><b>${ticketInfo}</b></div>
    <div><span>Holati</span><b>${worker.deleted?'Arxivlangan':readOnly?'Ishdan ketgan':worker.st==='ishlamoqda'?'Ishlayapti':'Hujjat jarayonida'}</b></div>
    <div><span>Brigadasi</span><b>${worker.brig?brigName(worker.brig):'Biriktirilmagan'}</b></div>
    <div><span>Rossiyaga kirgan sana</span><b>${worker.kirgan||'—'}</b></div>
    <div><span>Ish boshlagan sana</span><b>${worker.ish||'—'}</b></div>
    <div><span>Manzil</span><b>${worker.manzil||worker.royxat&&worker.royxat.joy||'—'}</b></div>
   </div>`) }
  ${card('Hujjat bosqichlari',`
   <div class="progress-label">${completed}/${STG.length} ta bosqich bajarilgan</div>
   ${row(worker,'karta','',readOnly)}
   ${row(worker,'pasport','',readOnly)}
   ${row(worker,'sert',examDetails,readOnly)}
   ${row(worker,'royxat',`<div class="mu">Patent hujjatlari uchun 30 kunlik umumiy muddat: ${patentDue||'—'}</div>`,readOnly)}
   ${row(worker,'med','',readOnly)}
   ${row(worker,'sugurta','',readOnly)}
   ${row(worker,'patent','',readOnly)}`)}
  ${card('Patent uchun 30 kunlik muddat',`${patentStatus}<p class="mu">Hujjatlar uchun qat’iy birinchi-ikkinchi ketma-ketlik yo‘q; muddat Rossiyaga kirgan kundan hisoblanadi.</p>`)}
  ${card("Sug'urta holati",`<div class="line"><b>Holati</b><span>${insuranceInfo}</span></div>`)}
  ${card('Brigada va ish tarixi',`<div class="line"><b>Joriy brigada</b><span>${brigade}</span></div>${list(brigadeRows)}${brigadeAction}`)}
  ${card("Patent to'lovlari",`${nextPay}${list(paymentRows)}`)}
  ${card('Kiyim holati',clothing)}
  ${card('Qarzlar va xarajatlar',debtTable)}
  ${worker.oylikTarixi&&worker.oylikTarixi.length?card('Oylik tarixi',list(salaryRows)):''}
  ${worker.hisob?card('Ishdan ketish hisobi',`<div class="line"><b>Ketgan sana</b><span>${worker.hisob.sana||'—'}</span></div><div class="line"><b>Yakuniy hisob</b><span>${fmt(worker.hisob.jami)}</span></div><div class="line"><b>Yashagan kunlar</b><span>${worker.hisob.kun||0}</span></div>`):''}
  ${card('Profil amallari',actions)}
  ${card('Amallar tarixi',`
   <p class="mu">Har bir yangi o‘zgarish va uni bajargan foydalanuvchi shu yerda qayd etiladi. Bu tarix yoqilishidan oldingi o‘zgarishlar saqlanmagan.</p>
   <div class="activity-list">${auditRows.length?activity.join(''):'<div class="empty">Hozircha qayd etilgan amallar yo‘q.</div>'}</div>`)}
 `;
}
