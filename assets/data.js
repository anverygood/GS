/* ============================================================
   QURILISH NAZORAT — Demo ma'lumotlar (boyitilgan versiya)
   ============================================================ */

const TODAY = '2026-08-13';
const PATENT_SUBMISSION_DAYS = 30;

const BRIGADES = [
  { id:'br1', name:'Aziz Karimov',     obj:"Yunusobod-14 turar-joy ko'chmasi",  workers:12, m3:340, region:'Yunusobod' },
  { id:'br2', name:'Sherzod Yusupov',  obj:'Chilonzor Savdo Markazi',            workers:9,  m3:265, region:'Chilonzor' },
  { id:'br3', name:'Bahodir Rustamov', obj:"Sergeli-3 ko'p qavatli blok",        workers:15, m3:410, region:'Sergeli'   },
  { id:'br4', name:'Otabek Nazarov',   obj:"Mirzo Ulug'bek ko'prigi",            workers:7,  m3:150, region:"Mirzo Ulug'bek" },
];

const COUNTRIES = ["O'zbekiston", 'Tojikiston', "Qirg'iziston", 'Qozog\'iston'];

const MANZILLAR = [
  "Okrujnoy shosse 56-uy",
  "Yunusobod 19-mavze, 12-uy",
  "Chilonzor 9-kvartal, 4-uy",
  "Sergeli 3-mavze, 7-uy",
  "Mirzo Ulug'bek tumani, 22-uy",
  "Yakkasaroy, Oybek ko'chasi 18",
  "Shayxontohur, Navruz 5-uy",
  "Uchtepa, Yangi Hayot 11",
];

const WORKERS = [
  // --- BR1: Aziz Karimov (12 kishi) ---
  { id:'w01', ism:'Sardor',    fam:'Tursunov',    ota:"Baxtiyor o'g'li",   passport:'AB1234567', brigade:'br1', country:"O'zbekiston", joined:'2025-02-10', avans:50000,
    sertifikat:{sana:'2026-06-01', muddat:'2026-09-14'},
    patent:{sana:'2026-01-05', muddat:'2026-08-20', tolovSana:'2026-08-15', tolovlar:[{sana:'2026-05-10',summa:10000},{sana:'2026-06-06',summa:10000},{sana:'2026-07-08',summa:10000}]},
    royxat:{sana:'2025-02-10', muddat:'2026-08-18', joy:'Okrujnoy shosse 56-uy'},
    manzil:'Okrujnoy shosse 56-uy', qarz:90000, oxirgiOylik:172250, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[
      {sana:'2026-08-12', jami:172250, qarzUshlandi:25000, qolgan:147250, izoh:"To'liq oylik 172 250, qarzdan 25 000 ushlandi"},
      {sana:'2026-07-10', jami:150000, qarzUshlandi:10000, qolgan:140000, izoh:"Iyul oyligi, 10 000 qarzga"},
      {sana:'2026-06-09', jami:155000, qarzUshlandi:10000, qolgan:145000, izoh:"Iyun oyligi"},
    ],
    brigadaTarixi:[
      {sana:'2025-02-10', brigada:'Aziz Karimov brigadasi', amal:'qabul qilindi'},
      {sana:'2024-11-03', brigada:'Sherzod Yusupov brigadasi', amal:"o'tkazildi"},
    ]},
  { id:'w02', ism:'Jasur',     fam:'Rahimov',     ota:"Anvar o'g'li",      passport:'AC7788112', brigade:'br1', country:"O'zbekiston", joined:'2024-11-03', avans:30000,
    sertifikat:{sana:'2026-03-01', muddat:'2026-08-16'},
    patent:{sana:'2026-02-01', muddat:'2026-08-25', tolovSana:'2026-07-20', tolovlar:[{sana:'2026-05-20',summa:10000},{sana:'2026-06-20',summa:10000}]},
    royxat:{sana:'2024-11-03', muddat:'2026-11-03', joy:'Yunusobod 19-mavze, 12-uy'},
    manzil:'Yunusobod 19-mavze', qarz:0, oxirgiOylik:150000, oxirgiSana:'2026-07-10', holat:'ishlamoqda',
    oylikTarixi:[
      {sana:'2026-07-10', jami:150000, qarzUshlandi:0, qolgan:150000, izoh:"To'liq berildi"},
      {sana:'2026-06-09', jami:148000, qarzUshlandi:0, qolgan:148000, izoh:"Iyun oyligi"},
    ],
    brigadaTarixi:[{sana:'2024-11-03', brigada:'Aziz Karimov brigadasi', amal:'qabul qilindi'}]},
  { id:'w03', ism:'Mirzo',     fam:'Xolmatov',    ota:"Ravshan o'g'li",    passport:'AB9911234', brigade:'br1', country:"O'zbekiston", joined:'2025-06-01', avans:0,
    sertifikat:{sana:'2026-05-01', muddat:'2026-10-15'},
    patent:{sana:'2026-04-01', muddat:'2026-09-10', tolovSana:'2026-08-20', tolovlar:[]},
    royxat:{sana:'2025-06-01', muddat:'2026-09-01', joy:"Yakkasaroy, Oybek ko'chasi 18"},
    manzil:"Yakkasaroy, Oybek ko'chasi 18", qarz:15000, oxirgiOylik:145000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:145000, qarzUshlandi:15000, qolgan:130000, izoh:"Avgust oyligi"}],
    brigadaTarixi:[{sana:'2025-06-01', brigada:'Aziz Karimov brigadasi', amal:'qabul qilindi'}]},
  { id:'w04', ism:'Nodir',     fam:'Sobirov',     ota:"Hamid o'g'li",      passport:'AD1122334', brigade:'br1', country:'Tojikiston',  joined:'2025-03-15', avans:20000,
    sertifikat:{sana:'2026-03-15', muddat:'2026-09-20'},
    patent:{sana:'2026-03-15', muddat:'2026-08-19', tolovSana:'2026-08-10', tolovlar:[{sana:'2026-06-10',summa:8000}]},
    royxat:{sana:'2025-03-15', muddat:'2026-08-15', joy:'Chilonzor 9-kvartal, 4-uy'},
    manzil:'Chilonzor 9-kvartal', qarz:35000, oxirgiOylik:148000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:148000, qarzUshlandi:10000, qolgan:138000, izoh:"Avgust"}],
    brigadaTarixi:[{sana:'2025-03-15', brigada:'Aziz Karimov brigadasi', amal:'qabul qilindi'}]},

  // --- BR2: Sherzod Yusupov (9 kishi) ---
  { id:'w05', ism:'Davron',    fam:'Ergashev',    ota:"Shuhrat o'g'li",    passport:'AD5541223', brigade:'br2', country:'Tojikiston',  joined:'2025-05-19', avans:0,
    sertifikat:{sana:'2026-02-01', muddat:'2026-08-15'},
    patent:{sana:'2026-01-01', muddat:'2026-08-14', tolovSana:'2026-08-07', tolovlar:[]},
    royxat:{sana:'2025-05-19', muddat:'2026-08-19', joy:'Chilonzor 9-kvartal, 4-uy'},
    manzil:'Chilonzor 9-kvartal', qarz:150650, oxirgiOylik:0, oxirgiSana:'—', holat:'ishlamoqda',
    oylikTarixi:[], brigadaTarixi:[{sana:'2025-05-19', brigada:'Sherzod Yusupov brigadasi', amal:'qabul qilindi'}]},
  { id:'w06', ism:'Alisher',   fam:'Nazarov',     ota:"Behruz o'g'li",     passport:'AE2244556', brigade:'br2', country:"Qirg'iziston", joined:'2024-09-10', avans:15000,
    sertifikat:{sana:'2026-04-01', muddat:'2026-10-01'},
    patent:{sana:'2026-04-01', muddat:'2026-09-15', tolovSana:'2026-08-25', tolovlar:[{sana:'2026-06-25',summa:10000}]},
    royxat:{sana:'2024-09-10', muddat:'2026-09-10', joy:'Sergeli 3-mavze, 7-uy'},
    manzil:'Sergeli 3-mavze', qarz:0, oxirgiOylik:155000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:155000, qarzUshlandi:0, qolgan:155000, izoh:"To'liq berildi"}],
    brigadaTarixi:[{sana:'2024-09-10', brigada:'Sherzod Yusupov brigadasi', amal:'qabul qilindi'}]},
  { id:'w07', ism:'Sanjar',    fam:'Mirzayev',    ota:"Komil o'g'li",      passport:'AF3355667', brigade:'br2', country:"O'zbekiston", joined:'2025-07-01', avans:0,
    sertifikat:{sana:'2026-07-01', muddat:'2026-11-01'},
    patent:{sana:'2026-07-01', muddat:'2026-10-01', tolovSana:'2026-09-01', tolovlar:[]},
    royxat:{sana:'2025-07-01', muddat:'2026-10-01', joy:"Mirzo Ulug'bek tumani, 22-uy"},
    manzil:"Mirzo Ulug'bek t.", qarz:0, oxirgiOylik:142000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:142000, qarzUshlandi:0, qolgan:142000, izoh:"To'liq berildi"}],
    brigadaTarixi:[{sana:'2025-07-01', brigada:'Sherzod Yusupov brigadasi', amal:'qabul qilindi'}]},

  // --- BR3: Bahodir Rustamov (15 kishi) ---
  { id:'w08', ism:'Farrux',    fam:'Islomov',     ota:"G'ayrat o'g'li",    passport:'AE9012334', brigade:'br3', country:"O'zbekiston", joined:'2023-09-01', avans:40000,
    sertifikat:{sana:'2026-05-01', muddat:'2026-12-01'},
    patent:{sana:'2026-03-01', muddat:'2026-09-01', tolovSana:'2026-08-20', tolovlar:[{sana:'2026-04-20',summa:10000},{sana:'2026-05-20',summa:10000},{sana:'2026-06-20',summa:10000}]},
    royxat:{sana:'2023-09-01', muddat:'2026-09-01', joy:'Sergeli 3-mavze, 7-uy'},
    manzil:'Sergeli 3-mavze', qarz:25000, oxirgiOylik:172250, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[
      {sana:'2026-08-12', jami:172250, qarzUshlandi:10000, qolgan:162250, izoh:"Avgust oyligi"},
      {sana:'2026-07-11', jami:168000, qarzUshlandi:8000,  qolgan:160000, izoh:"Iyul oyligi"},
    ],
    brigadaTarixi:[
      {sana:'2023-09-01', brigada:'Bahodir Rustamov brigadasi', amal:'qabul qilindi'},
      {sana:'2023-04-01', brigada:'Sherzod Yusupov brigadasi', amal:"o'tkazildi"},
    ]},
  { id:'w09', ism:"Ulug'bek",  fam:'Qodirov',     ota:"Nodir o'g'li",      passport:'AF4432119', brigade:'br3', country:"Qirg'iziston", joined:'2025-01-14', avans:0,
    sertifikat:{sana:'2026-01-01', muddat:'2026-08-13'},
    patent:{sana:'2026-01-10', muddat:'2026-08-13', tolovSana:'2026-08-06', tolovlar:[]},
    royxat:{sana:'2025-01-14', muddat:'2026-08-13', joy:'Sergeli 3-mavze, 7-uy'},
    manzil:'Sergeli 3-mavze', qarz:0, oxirgiOylik:150000, oxirgiSana:'2026-07-11', holat:'nofaol',
    oylikTarixi:[{sana:'2026-07-11', jami:150000, qarzUshlandi:0, qolgan:150000, izoh:"Iyul oyligi (oxirgi)"}],
    brigadaTarixi:[{sana:'2025-01-14', brigada:'Bahodir Rustamov brigadasi', amal:'qabul qilindi'}]},
  { id:'w10', ism:'Bobur',     fam:'Xasanov',     ota:"Akbar o'g'li",      passport:'AG5543221', brigade:'br3', country:'Tojikiston',  joined:'2025-04-20', avans:10000,
    sertifikat:{sana:'2026-04-20', muddat:'2026-10-20'},
    patent:{sana:'2026-04-20', muddat:'2026-09-20', tolovSana:'2026-08-30', tolovlar:[{sana:'2026-06-30',summa:9000}]},
    royxat:{sana:'2025-04-20', muddat:'2026-08-20', joy:"Shayxontohur, Navruz 5-uy"},
    manzil:"Shayxontohur, Navruz 5-uy", qarz:45000, oxirgiOylik:148000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:148000, qarzUshlandi:12000, qolgan:136000, izoh:"Avgust"}],
    brigadaTarixi:[{sana:'2025-04-20', brigada:'Bahodir Rustamov brigadasi', amal:'qabul qilindi'}]},
  { id:'w11', ism:'Dilshod',   fam:'Yusupov',     ota:"Salim o'g'li",      passport:'AH6654332', brigade:'br3', country:"O'zbekiston", joined:'2024-08-05', avans:25000,
    sertifikat:{sana:'2026-08-05', muddat:'2027-02-05'},
    patent:{sana:'2026-08-05', muddat:'2027-02-05', tolovSana:'2026-09-05', tolovlar:[]},
    royxat:{sana:'2024-08-05', muddat:'2026-11-05', joy:"Uchtepa, Yangi Hayot 11"},
    manzil:"Uchtepa, Yangi Hayot 11", qarz:0, oxirgiOylik:160000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:160000, qarzUshlandi:0, qolgan:160000, izoh:"To'liq berildi"}],
    brigadaTarixi:[{sana:'2024-08-05', brigada:'Bahodir Rustamov brigadasi', amal:'qabul qilindi'}]},
  { id:'w12', ism:'Mansur',    fam:'Toshmatov',   ota:"Yunus o'g'li",      passport:'AI7765443', brigade:'br3', country:"Qirg'iziston", joined:'2025-02-28', avans:0,
    sertifikat:{sana:'2026-02-28', muddat:'2026-08-28'},
    patent:{sana:'2026-02-28', muddat:'2026-08-28', tolovSana:'2026-08-21', tolovlar:[{sana:'2026-05-21',summa:8500}]},
    royxat:{sana:'2025-02-28', muddat:'2026-08-28', joy:'Sergeli 3-mavze, 7-uy'},
    manzil:'Sergeli 3-mavze', qarz:20000, oxirgiOylik:145000, oxirgiSana:'2026-07-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-07-12', jami:145000, qarzUshlandi:5000, qolgan:140000, izoh:"Iyul oyligi"}],
    brigadaTarixi:[{sana:'2025-02-28', brigada:'Bahodir Rustamov brigadasi', amal:'qabul qilindi'}]},

  // --- BR4: Otabek Nazarov (7 kishi) ---
  { id:'w13', ism:'Bekzod',    fam:'Sodiqov',     ota:"Xurshid o'g'li",    passport:'AG6671298', brigade:'br4', country:"O'zbekiston", joined:'2025-06-22', avans:0,
    sertifikat:{sana:'2026-04-01', muddat:'2026-10-01'},
    patent:{sana:'2026-02-15', muddat:'2026-08-30', tolovSana:'2026-08-22', tolovlar:[{sana:'2026-05-22',summa:10000}]},
    royxat:{sana:'2025-06-22', muddat:'2026-08-22', joy:"Mirzo Ulug'bek tumani, 22-uy"},
    manzil:"Mirzo Ulug'bek t.", qarz:0, oxirgiOylik:150000, oxirgiSana:'2026-07-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-07-12', jami:150000, qarzUshlandi:0, qolgan:150000, izoh:"Iyul oyligi"}],
    brigadaTarixi:[
      {sana:'2025-06-22', brigada:'Otabek Nazarov brigadasi', amal:'qabul qilindi'},
      {sana:'2025-01-10', brigada:'Aziz Karimov brigadasi', amal:"o'tkazildi"},
    ]},
  { id:'w14', ism:'Shamsiddin', fam:'Qoraboyev',  ota:"Muzaffar o'g'li",   passport:'AJ8876554', brigade:'br4', country:'Tojikiston',  joined:'2025-08-01', avans:5000,
    sertifikat:{sana:'2026-08-01', muddat:'2027-01-15'},
    patent:{sana:'2026-08-01', muddat:'2027-01-15', tolovSana:'2026-09-15', tolovlar:[]},
    royxat:{sana:'2025-08-01', muddat:'2026-11-01', joy:"Mirzo Ulug'bek tumani, 22-uy"},
    manzil:"Mirzo Ulug'bek t.", qarz:8000, oxirgiOylik:138000, oxirgiSana:'2026-08-12', holat:'ishlamoqda',
    oylikTarixi:[{sana:'2026-08-12', jami:138000, qarzUshlandi:8000, qolgan:130000, izoh:"Avans ayirildi"}],
    brigadaTarixi:[{sana:'2025-08-01', brigada:'Otabek Nazarov brigadasi', amal:'qabul qilindi'}]},
  { id:'w15', ism:'Zafar',     fam:'Tillayev',    ota:"Iskandar o'g'li",   passport:'AK9987665', brigade:'br4', country:"O'zbekiston", joined:'2024-12-10', avans:0,
    sertifikat:{sana:'2026-12-10', muddat:'2027-06-10'},
    patent:{sana:'2026-06-10', muddat:'2026-08-17', tolovSana:'2026-08-10', tolovlar:[{sana:'2026-07-10',summa:10000}]},
    royxat:{sana:'2024-12-10', muddat:'2026-12-10', joy:"Okrujnoy shosse 56-uy"},
    manzil:"Okrujnoy shosse 56-uy", qarz:60000, oxirgiOylik:0, oxirgiSana:'—', holat:'nofaol',
    oylikTarixi:[], brigadaTarixi:[{sana:'2024-12-10', brigada:'Otabek Nazarov brigadasi', amal:'qabul qilindi'}]},
];

/* ---- Davomat tarixi (br1 - w01 uchun) ---- */
const ATTENDANCE_HISTORY = [
  { sana:'2026-08-12', soat:10,  holat:'keldi'   },
  { sana:'2026-08-11', soat:9,   holat:'keldi'   },
  { sana:'2026-08-10', soat:8.5, holat:'keldi'   },
  { sana:'2026-08-09', soat:0,   holat:'kelmadi' },
  { sana:'2026-08-08', soat:9,   holat:'keldi'   },
  { sana:'2026-08-07', soat:10,  holat:'keldi'   },
  { sana:'2026-08-06', soat:8,   holat:'keldi'   },
  { sana:'2026-08-05', soat:0,   holat:'kelmadi' },
  { sana:'2026-08-04', soat:9.5, holat:'keldi'   },
  { sana:'2026-08-03', soat:8,   holat:'keldi'   },
  { sana:'2026-08-02', soat:0,   holat:'kelmadi' },
  { sana:'2026-08-01', soat:9,   holat:'keldi'   },
];

/* ---- Oylik hisobot (brigadir) ---- */
const DAILY_REPORTS = [
  { sana:'2026-08-12', m3:42, obekt:"Yunusobod-14", yolXat:true  },
  { sana:'2026-08-11', m3:38, obekt:"Yunusobod-14", yolXat:true  },
  { sana:'2026-08-10', m3:45, obekt:"Yunusobod-14", yolXat:false },
  { sana:'2026-08-09', m3:0,  obekt:"Yunusobod-14", yolXat:false },
  { sana:'2026-08-08', m3:50, obekt:"Yunusobod-14", yolXat:true  },
];

/* ---- Bildirishnomalar ---- */
const NOTIFICATIONS = [
  { type:'warn', title:"Patentga 1 kun qoldi",       text:'Davron Ergashev — 2026-08-14' },
  { type:'warn', title:"Sertifikatga 0 kun qoldi",   text:"Ulug'bek Qodirov — muddati bugun!" },
  { type:'warn', title:"Ro'yxatga 5 kun qoldi",      text:'Sardor Tursunov — 2026-08-18' },
  { type:'warn', title:"Patent to'loviga 2 kun qoldi", text:'Sardor Tursunov — 2026-08-15' },
  { type:'info', title:'Yangi hodim yuborildi',       text:'CEO sizga Bekzod Sodiqovni yubordi' },
  { type:'ok',   title:'Kunlik hisobot qabul qilindi',text:"Sergeli-3 blok — 42 m³ beton, yo'l xati ✓" },
  { type:'warn', title:"Royxatga olish 7 kun qoldi",  text:'Bobur Xasanov — 2026-08-20' },
];

/* ---- Oylik cheklar (HR kiritadi) ---- */
const CHEKY = [
  { oy:'May 2026',  sana:'10.05.2026', summa:10000 },
  { oy:'Iyun 2026', sana:'06.06.2026', summa:10000 },
  { oy:'Iyul 2026', sana:'08.07.2026', summa:10000 },
  { oy:'Avgust 2026', sana:'—', summa:null },
];

/* ---- Arxiv oylar (CEO/brigadir) ---- */
const ARCHIVE_MONTHS = [
  { oy:'Iyul 2026',  ishchilar:39, beton:1080, topBrigada:'Bahodir Rustamov', davomat:'89%' },
  { oy:'Iyun 2026',  ishchilar:37, beton:960,  topBrigada:'Aziz Karimov',     davomat:'91%' },
  { oy:'May 2026',   ishchilar:35, beton:915,  topBrigada:'Bahodir Rustamov', davomat:'93%' },
  { oy:'Aprel 2026', ishchilar:33, beton:870,  topBrigada:'Sherzod Yusupov',  davomat:'87%' },
  { oy:'Mart 2026',  ishchilar:30, beton:780,  topBrigada:'Bahodir Rustamov', davomat:'90%' },
];

/* ---- Yordamchi funksiyalar ---- */
function daysLeft(dateStr){
  const today = new Date(TODAY);
  const d = new Date(dateStr);
  return Math.round((d - today) / 86400000);
}
function chipForDays(dateStr, label){
  if(!dateStr || dateStr==='—') return '<span class="chip warn"><span class="dot"></span>Belgilanmagan</span>';
  const n = daysLeft(dateStr);
  let cls = 'chip';
  if(n < 0)   cls += ' danger';
  else if(n <= 7)  cls += ' danger';
  else if(n <= 20) cls += ' warn';
  const txt = n < 0
    ? `${label}: <b>${Math.abs(n)} kun o'tgan!</b>`
    : n === 0
      ? `${label}: <b>BUGUN!</b>`
      : `${label}: ${n} kun qoldi`;
  return `<span class="${cls}"><span class="dot"></span>${txt}</span>`;
}
function money(n){
  if(!n && n!==0) return '—';
  return n.toLocaleString('ru-RU').replace(/,/g,' ');
}
function initials(ism,fam){ return ((ism||'?')[0]+(fam||'?')[0]).toUpperCase(); }
function brigName(id){ const b=BRIGADES.find(x=>x.id===id); return b? b.name+' brigadasi' : '—'; }
function brigObj(id){ const b=BRIGADES.find(x=>x.id===id); return b? b.obj : '—'; }
function avatarColor(id){
  const cols=['#34434c','#4c7a56','#7a4c6a','#7a6a4c','#4c5a7a','#7a4c4c'];
  return cols[id.charCodeAt(1)%cols.length];
}
