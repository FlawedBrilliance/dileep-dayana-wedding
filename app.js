(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const safeStorage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key,value) { try { localStorage.setItem(key,value); } catch {} } };
  const english = Object.fromEntries($$('[data-i18n]').map(el => {
    const clone=el.cloneNode(true);$$('br',clone).forEach(br=>br.replaceWith('\n'));
    return [el.dataset.i18n,clone.textContent];
  }));
  // Telugu follows invitation-card wording and its own reading order.
  const telugu = {
    "coverEyebrow": "శుభ వివాహ ఆహ్వానము",
    "dileep": "దిలీప్",
    "dayana": "డయాన",
    "coverHint": "ముద్రను స్పృశించి ఆహ్వాన పత్రికను తెరవండి",
    "quietly": "సంగీతం లేకుండా వీక్షించండి",
    "coverFooter": "26 నవంబర్ 2026 · రాజమండ్రి",
    "navPrewedding": "పెళ్లి వేడుకలు",
    "navEvents": "వివాహం · విందు",
    "navFamilies": "వధూవరులు",
    "heroEyebrow": "శుభ వివాహ ఆహ్వానము",
    "heroInvite": "మా పిల్లల వివాహ మహోత్సవమునకు\nమీరు సకుటుంబ సమేతంగా విచ్చేసి\nవధూవరులను ఆశీర్వదించవలసిందిగా\nసాదరంగా ఆహ్వానిస్తున్నాము.",
    "city": "రాజమండ్రి",
    "celebrateButton": "వివరాలు",
    "photoCaption": "ఛాయాచిత్రాన్ని వీక్షించండి ↗",
    "portraitNote": "వధూవరులు",
    "scrollHint": "ఆహ్వాన వివరాలు",
    "dateEyebrow": "2026 · నవంబర్",
    "dateTitle": "వివాహ శుభదినం",
    "ourWeddingDay": "వివాహ తేదీ",
    "weddingTime": "గురువారం · ఉదయం 10 గంటలకు",
    "scratchTitle": "వివాహ శుభదినం",
    "scratchHint": "బంగారు పొరపై మృదువుగా వేలిని జరపండి",
    "revealDate": "వివాహ తేదీని వీక్షించండి",
    "countdownCaption": "వివాహానికి ఇంకా",
    "days": "రోజులు",
    "hours": "గంటలు",
    "minutes": "నిమిషాలు",
    "seconds": "సెకన్లు",
    "november": "నవంబర్",
    "weddingKey": "26 · వివాహం",
    "receptionKey": "28 · విందు",
    "calendarHint": "వివరాల కోసం గుర్తించిన తేదీని ఎంచుకోండి",
    "preweddingEyebrow": "23, 25 నవంబర్ 2026",
    "preweddingTitle": "పెళ్లి వేడుకలు",
    "preweddingIntro": "ఈ వేడుకలకు బంధుమిత్రులందరికీ సాదర ఆహ్వానం.",
    "novShort": "నవం",
    "pellikodukuShortTime": "ఉ. 9:00",
    "haldiShortTime": "ఉ. 11:00",
    "pradhanamShortTime": "ఉ. 10:00",
    "pellikodukuNote": "పెళ్లికొడుకు, పెళ్లికూతురు వేడుక",
    "haldiNote": "పసుపు వేడుక",
    "pradhanamNote": "ప్రధానం",
    "preweddingKey": "23, 25 · పెళ్లి వేడుకలు",
    "pellikodukuLabel": "పెళ్లికొడుకు –\nపెళ్లికూతురు",
    "haldiLabel": "పసుపు వేడుక",
    "pradhanamLabel": "ప్రధానం",
    "pellikodukuTime": "సోమవారం · ఉదయం 9 గంటలకు",
    "haldiTime": "సోమవారం · ఉదయం 11 గంటలకు",
    "pradhanamTime": "బుధవారం · ఉదయం 10 గంటలకు",
    "ourHome": "స్వగృహమునందు",
    "razoleHome": "స్వగృహమునందు, రాజోలు",
    "eventsEyebrow": "26, 28 నవంబర్ 2026",
    "eventsTitle": "వివాహం · విందు",
    "eventsIntro": "వివాహ మహోత్సవమునకు, వివాహ విందునకు\nతమరు సకుటుంబ సమేతంగా విచ్చేయ ప్రార్థన.",
    "weddingLabel": "శుభ వివాహము",
    "weddingHeading": "శుభ వివాహము",
    "church": "ఎపిఫానియా లూథరన్ చర్చి",
    "directions": "వేదికకు మార్గం",
    "addCalendar": "క్యాలెండర్‌లో చేర్చండి",
    "googleCalendar": "గూగుల్ క్యాలెండర్",
    "downloadCalendar": "ఆపిల్ / ఔట్‌లుక్ (.ics)",
    "viewQr": "QR కోడ్",
    "receptionLabel": "వివాహ విందు",
    "receptionHeading": "వివాహ విందు",
    "receptionTime": "శనివారం · ఉదయం 10 గంటలకు",
    "receptionVenue": "మంగెన గంగయ్య\nకళ్యాణ మండపం",
    "timezone": "సమయాలు భారత కాలమానం ప్రకారం.",
    "familyEyebrow": "పెద్దల ఆశీస్సులతో",
    "familyTitle": "వధూవరులు",
    "sonOf": "దంపతుల కుమారుడు",
    "daughterOf": "దంపతుల కుమార్తె",
    "groomParents": "శ్రీ మోకన యేసు రత్నం – శ్రీమతి లత",
    "brideParents": "శ్రీ దాసరి రత్నకుమార్ – శ్రీమతి రాజమణి",
    "familyMessage": "మీరు సకుటుంబ సమేతంగా విచ్చేసి\nమా పిల్లల వివాహ వేడుకలో పాల్గొని\nవధూవరులను దీవించవలసినదిగా ప్రార్థన.",
    "footerEyebrow": "సాదర ఆహ్వానము",
    "shareInvitation": "ఆహ్వాన పత్రికను పంచుకోండి",
    "saveAllEvents": "అన్ని కార్యక్రమాలను క్యాలెండర్‌లో చేర్చండి",
    "backTop": "ప్రారంభానికి ↑",
    "findVenue": "వేదిక వివరాలు",
    "openDirections": "వేదికకు మార్గం",
    "solemnizationEyebrow": "26.11.26",
    "solemnizationTitle": "వివాహము జరిపించువారు",
    "officiantName": "రెవ. కె. రాజేష్ కుమార్",
    "officiantRole": "పారిష్ పాస్టర్",
    "ministersPresence": "ఆశీర్వచనములు",
    "pastorShyambabu": "రెవ. కె. శ్యాంబాబు",
    "pastorWellington": "రెవ. కె. ఆర్. పాల్ వెల్లింగ్టన్",
    "pastorKamal": "రెవ. ఎం. కమల్ కుమార్",
    "pastorRatnakar": "రెవ. వి. రత్నాకర్",
    "receptionClergyEyebrow": "28.11.26 · వివాహ విందు",
    "receptionClergyTitle": "ప్రార్థన, ఆశీర్వచనములు",
    "receptionPastor": "రెవ. వి. సుధాకర్",
    "receptionPastorChurch": "పరిశుద్ధ మత్తయి లూథరన్ చర్చి, రాజోలు",
    "invitingFamilies": "మోకన & దాసరి వారి కుటుంబాలు"
};
  const extra = {
    en:{revealed:'26 November 2026 · we’ll see you there',past:'Our forever has begun.',play:'Play music',pause:'Pause music',copied:'Invitation link copied',shareFailed:'You can share the link from your browser’s address bar.',saved:'Calendar invitation downloaded',audioError:'Tap the music note whenever you’re ready.',qrWedding:'The wedding',qrReception:'The reception',close:'Close',photo:'View our photograph',open:'Open invitation with music'},
    te:{"revealed": "వివాహం · 26 నవంబర్ 2026", "past": "వధూవరులకు శుభాకాంక్షలు!", "play": "సంగీతాన్ని వినండి", "pause": "సంగీతాన్ని నిలిపివేయండి", "copied": "ఆహ్వాన లింక్ కాపీ చేయబడింది", "shareFailed": "బ్రౌజర్‌లోని ఆహ్వాన లింక్‌ను కాపీ చేసి పంచుకోవచ్చు.", "saved": "క్యాలెండర్ ఫైలు డౌన్‌లోడ్ చేయబడింది", "audioError": "సంగీతాన్ని వినేందుకు పైన ఉన్న సంగీత చిహ్నాన్ని ఎంచుకోండి.", "qrWedding": "శుభ వివాహము", "qrReception": "వివాహ విందు", "close": "మూసివేయండి", "photo": "వధూవరుల ఛాయాచిత్రాన్ని వీక్షించండి", "open": "ఆహ్వాన పత్రికను సంగీతంతో వీక్షించండి"}
  };
  const events = {
    pellikoduku:{start:'20261123T033000Z',title:'Dileep & Dayana — Pellikoduku & Pellikuthuru',titleTe:'దిలీప్, డయాన — పెళ్లికొడుకు, పెళ్లికూతురు వేడుక',venue:'At our home',venueTe:'స్వగృహమునందు',map:'https://maps.app.goo.gl/ajBaHXviCSALvjp98'},
    haldi:{start:'20261123T053000Z',title:'Dileep & Dayana — Haldi',titleTe:'దిలీప్, డయాన — పసుపు వేడుక',venue:'At home, Razole',venueTe:'స్వగృహమునందు, రాజోలు',map:'https://maps.app.goo.gl/HdTt85K2s4XiNKxP8'},
    pradhanam:{start:'20261125T043000Z',title:'Dileep & Dayana — Pradhanam',titleTe:'దిలీప్, డయాన — ప్రధానం',venue:'At home, Razole',venueTe:'స్వగృహమునందు, రాజోలు',map:'https://maps.app.goo.gl/HdTt85K2s4XiNKxP8'},
    wedding:{start:'20261126T043000Z',title:"Dileep & Dayana’s Wedding",titleTe:'దిలీప్, డయాన — శుభ వివాహము',venue:'Epiphania Lutheran Church, Rajahmundry',venueTe:'ఎపిఫానియా లూథరన్ చర్చి, రాజమండ్రి',map:'https://maps.app.goo.gl/qwdpMbREzA9SZhTE7'},
    reception:{start:'20261128T043000Z',title:"Dileep & Dayana’s Wedding Reception",titleTe:'దిలీప్, డయాన — వివాహ విందు',venue:'Mangena Gangayya Kalyana Mandapam',venueTe:'మంగెన గంగయ్య కళ్యాణ మండపం',map:'https://maps.app.goo.gl/k586X54S34gXMedg8'}
  };
  let language='en', opened=false, dateRevealed=false, activeQr=null, toastTimer;
  const audio=$('#music');
  const say = text => { const toast=$('#toast'); toast.textContent=text;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),3800); };

  function setLanguage(lang,save=false){
    language=lang==='te'?'te':'en';document.documentElement.lang=language;
    $$('[data-i18n]').forEach(el=>el.textContent=(language==='te'?telugu[el.dataset.i18n]:english[el.dataset.i18n])??english[el.dataset.i18n]);
    // A Telugu card introduces the parents, relationship, then the bride/groom.
    $$('.family-member').forEach(member=>{
      const name=$('h3',member), parents=$('.family-parents',member), relation=$('.family-relation',member);
      member.append(...(language==='te'?[parents,relation,name]:[name,relation,parents]));
    });
    $$('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    $('#open-invitation').setAttribute('aria-label',extra[language].open);
    $('#view-photo').setAttribute('aria-label',extra[language].photo);
    $$('[data-close-dialog]').forEach(button=>button.setAttribute('aria-label',extra[language].close));
    document.title=language==='te'?'దిలీప్, డయాన · వివాహ ఆహ్వానము':'Dileep & Dayana · A lifetime together';
    if(save){safeStorage.set('dd-invitation-language',language);const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);}
    renderCalendar();updateMusic();updateCountdown();updateCalendarLinks();
    if(dateRevealed)$('#reveal-date').textContent=extra[language].revealed;
    if(activeQr)fillQr(activeQr);
  }
  $$('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language,true)));

  function updateMusic(){const playing=!audio.paused&&!audio.ended;$('#music-toggle').setAttribute('aria-pressed',String(playing));$('#music-toggle').setAttribute('aria-label',extra[language][playing?'pause':'play']);}
  async function playMusic(){try{await audio.play();}catch{say(extra[language].audioError);}updateMusic();}
  $('#music-toggle').addEventListener('click',()=>{if(audio.paused){if(audio.ended)audio.currentTime=0;playMusic();}else audio.pause();});
  ['play','pause','ended'].forEach(event=>audio.addEventListener(event,updateMusic));
  audio.addEventListener('error',()=>{updateMusic();say(extra[language].audioError);});
  function openInvitation(withMusic){
    if(opened)return;opened=true;if(withMusic)playMusic();
    $('#cover').classList.add('is-opening');$('#open-invitation').disabled=true;$('#open-quietly').disabled=true;
    setTimeout(()=>{
      $('#cover').hidden=true;document.body.classList.remove('is-closed');
      $('#invitation').inert=false;$('#site-header').inert=false;$('.site-footer').inert=false;
      $('#main-title').focus({preventScroll:true});
      startScrollReveals();
      startGardenReveals();
      startSectionNavigation();
    },reducedMotion?0:1650);
  }
  $('#open-invitation').addEventListener('click',()=>openInvitation(true));
  $('#open-quietly').addEventListener('click',()=>openInvitation(false));
  $('#cover').addEventListener('keydown',event=>{
    if(event.key==='Escape'){openInvitation(false);return;}
    if(event.key!=='Tab')return;
    const targets=$$('button:not(:disabled)',$('#cover'));const first=targets[0],last=targets.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  $('#invitation').inert=true;$('#site-header').inert=true;$('.site-footer').inert=true;

  function revealDate(){
    if(dateRevealed)return;dateRevealed=true;$('#scratch-wrap').classList.add('is-scratched');
    $('#revealed-date').setAttribute('aria-hidden','false');$('#reveal-date').textContent=extra[language].revealed;
    $('#reveal-date').disabled=true;$('#scratch-canvas').style.touchAction='auto';
    setTimeout(()=>{$('#scratch-canvas').hidden=true;$('#scratch-caption').hidden=true;},reducedMotion?0:800);
  }
  $('#reveal-date').addEventListener('click',revealDate);
  const canvas=$('#scratch-canvas'), ctx=canvas.getContext('2d',{willReadFrequently:true});
  let scratching=false,lastPoint=null,scratchPoints=[];
  function drawFoil(){
    if(dateRevealed)return;
    const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);if(!rect.width)return;
    canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.globalCompositeOperation='source-over';
    const gradient=ctx.createLinearGradient(0,0,rect.width,rect.height);gradient.addColorStop(0,'#d3bd94');gradient.addColorStop(.4,'#e8d9b9');gradient.addColorStop(.7,'#cdb58d');gradient.addColorStop(1,'#e6d5b1');ctx.fillStyle=gradient;ctx.fillRect(0,0,rect.width,rect.height);
    for(let i=0;i<1200;i++){const x=(i*73.139)%rect.width,y=(i*97.583)%rect.height;ctx.fillStyle=i%2?'#ffffff19':'#8465380c';ctx.fillRect(x,y,1,1);}
    ctx.globalCompositeOperation='destination-out';ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=40;
    for(const point of scratchPoints){ctx.beginPath();ctx.arc(point.x*rect.width,point.y*rect.height,21,0,Math.PI*2);ctx.fill();}
  }
  function pointFrom(event){const b=canvas.getBoundingClientRect();return{x:event.clientX-b.left,y:event.clientY-b.top,w:b.width,h:b.height};}
  function scratch(event){
    if(!scratching||dateRevealed)return;const p=pointFrom(event);ctx.beginPath();ctx.moveTo(lastPoint?.x??p.x,lastPoint?.y??p.y);ctx.lineTo(p.x+.01,p.y+.01);ctx.stroke();scratchPoints.push({x:p.x/p.w,y:p.y/p.h});lastPoint=p;
  }
  canvas.addEventListener('pointerdown',event=>{if(dateRevealed)return;scratching=true;lastPoint=null;canvas.setPointerCapture(event.pointerId);$('#scratch-wrap').classList.add('is-scratching');scratch(event);});
  canvas.addEventListener('pointermove',scratch);
  function endScratch(){if(!scratching)return;scratching=false;lastPoint=null;const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let clear=0,total=0;for(let i=3;i<pixels.length;i+=64){total++;if(pixels[i]<60)clear++;}if(clear/total>.28)revealDate();}
  canvas.addEventListener('pointerup',endScratch);canvas.addEventListener('pointercancel',endScratch);
  new ResizeObserver(drawFoil).observe(canvas);

  function highlightEvent(id){
    const card=$(`#${id}-card`);if(!card)return;
    card.classList.remove('is-highlighted');requestAnimationFrame(()=>card.classList.add('is-highlighted'));
  }
  $$('[data-event-jump]').forEach(link=>link.addEventListener('click',()=>highlightEvent(link.dataset.eventJump)));

  function renderCalendar(){
    const root=$('#month-calendar');root.replaceChildren();
    const weekdays=language==='te'?['ఆది','సోమ','మంగళ','బుధ','గురు','శుక్ర','శని']:['S','M','T','W','T','F','S'];
    weekdays.forEach(day=>{const el=document.createElement('span');el.className='calendar-weekday';el.textContent=day;root.append(el);});
    for(let day=1;day<=30;day++){
      const cell=document.createElement('div');cell.className='calendar-day';
      if([23,25,26,28].includes(day)){
        const event={23:'pellikoduku',25:'pradhanam',26:'wedding',28:'reception'}[day];const button=document.createElement('button');button.type='button';
        const names=language==='te'?{23:'పెళ్లికొడుకు, పెళ్లికూతురు మరియు పసుపు వేడుక',25:'ప్రధానం',26:'శుభ వివాహము',28:'వివాహ విందు'}:{23:'Pellikoduku & Pellikuthuru and Haldi',25:'Pradhanam',26:'wedding',28:'reception'};
        button.setAttribute('aria-label',language==='te'?`${day} నవంబర్ 2026 — ${names[day]} వివరాలు`:`${day} November 2026 — ${names[day]} details`);
        if(day===26)button.innerHTML='<svg class="calendar-heart" aria-hidden="true" viewBox="0 0 48 46"><path d="M24 40C15 33 2 24 3 13 4 1 18 0 24 10 31-1 45 2 45 13c0 12-15 24-21 30 8 1 10-4 10-4"/></svg>';
        else button.className=day===28?'reception-day':'prewedding-day';
        const number=document.createElement('span');number.textContent=day;button.append(number);
        button.addEventListener('click',()=>{const card=$(`#${event}-card`);card.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'center'});highlightEvent(event);});
        cell.append(button);
      }else cell.textContent=day;root.append(cell);
    }
  }
  function updateCountdown(){
    const distance=Math.max(0,new Date('2026-11-26T10:00:00+05:30').getTime()-Date.now());
    const total=Math.floor(distance/1000),values={days:Math.floor(total/86400),hours:Math.floor(total%86400/3600),minutes:Math.floor(total%3600/60),seconds:total%60};
    Object.entries(values).forEach(([key,value])=>$(`#${key}`).textContent=String(value).padStart(2,'0'));
    if(!distance)$('#countdown-caption').textContent=extra[language].past;
  }
  setInterval(updateCountdown,1000);

  function updateCalendarLinks(){Object.entries(events).forEach(([id,event])=>{const params=new URLSearchParams({action:'TEMPLATE',text:language==='te'?event.titleTe:event.title,dates:`${event.start}/${event.start}`,location:language==='te'?event.venueTe:event.venue,details:`${language==='te'?'సకుటుంబ సమేతంగా విచ్చేయవలసిందిగా సాదర ఆహ్వానం.':'Together with our families, we would love to celebrate with you.'}${event.map?'\n'+event.map:''}`,ctz:'Asia/Kolkata'});$(`#google-${id}`).href=`https://calendar.google.com/calendar/render?${params}`;});}
  const icsEscape=value=>value.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  function foldLine(text){const encoder=new TextEncoder();let line='',length=0,result=[];for(const ch of text){const n=encoder.encode(ch).length;if(length+n>73){result.push(line);line=' ';length=1;}line+=ch;length+=n;}result.push(line);return result.join('\r\n');}
  function saveCalendar(which){
    const ids=which==='all'?Object.keys(events):[which];const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Dileep and Dayana//Wedding Invitation//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH'];
    ids.forEach(id=>{const event=events[id];lines.push('BEGIN:VEVENT',`UID:dd-${id}-2026@dileep-dayana.invitation`,`DTSTAMP:${stamp}`,`DTSTART:${event.start}`,`SUMMARY:${icsEscape(language==='te'?event.titleTe:event.title)}`,`LOCATION:${icsEscape(language==='te'?event.venueTe:event.venue)}`,`DESCRIPTION:${icsEscape((language==='te'?'సకుటుంబ సమేతంగా విచ్చేయవలసిందిగా సాదర ఆహ్వానం.':'We look forward to celebrating with you.')+(event.map?'\n'+event.map:''))}`,...(event.map?[`URL:${event.map}`]:[]),'END:VEVENT');});
    lines.push('END:VCALENDAR');const blob=new Blob([lines.map(foldLine).join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`Dileep-Dayana-${which}.ics`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);$$('.calendar-menu').forEach(menu=>menu.open=false);say(extra[language].saved);
  }
  $$('[data-calendar]').forEach(button=>button.addEventListener('click',()=>saveCalendar(button.dataset.calendar)));
  $$('.calendar-menu').forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)$$('.calendar-menu').filter(other=>other!==menu).forEach(other=>other.open=false);}));
  document.addEventListener('click',event=>{if(!event.target.closest('.calendar-menu'))$$('.calendar-menu').forEach(menu=>menu.open=false);});

  function fillQr(event){activeQr=event;$('#qr-title').textContent=extra[language][event==='wedding'?'qrWedding':'qrReception'];$('#qr-image').src=`${event}-qr.png`;$('#qr-image').alt=language==='te'?'వేదిక చిరునామా QR కోడ్':`${event} venue QR code`;$('#qr-venue').textContent=language==='te'?(event==='wedding'?telugu.church+', '+telugu.city:telugu.receptionVenue.replace('\n',' ')):events[event].venue;$('#qr-directions').href=events[event].map;}
  $$('[data-qr]').forEach(button=>button.addEventListener('click',()=>{fillQr(button.dataset.qr);$('#qr-dialog').showModal();}));
  $('#view-photo').addEventListener('click',()=>$('#photo-dialog').showModal());
  $$('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  $$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{const box=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))dialog.close();}));
  $('#qr-dialog').addEventListener('close',()=>activeQr=null);
  $('#share-invitation').addEventListener('click',async()=>{
    const url=new URL(location.href);url.hash='';url.searchParams.set('lang',language);const data={title:document.title,text:language==='te'?'దిలీప్, డయాన · వివాహ ఆహ్వానము · 26.11.26':'Dileep & Dayana · You’re invited · 26.11.26',url:url.href};
    if(navigator.share){try{await navigator.share(data);return;}catch(error){if(error.name==='AbortError')return;}}
    try{await navigator.clipboard.writeText(url.href);say(extra[language].copied);}catch{say(extra[language].shareFailed);}
  });

  // Gentle, one-time reveals begin just before content reaches the viewport.
  function stagger(elements,step=60){elements.forEach((element,index)=>{element.classList.add('reveal');element.style.setProperty('--reveal-delay',`${Math.min(index*step,120)}ms`);});}
  $$('.section-heading, .solemnization-heading').forEach(group=>{group.classList.remove('reveal');stagger([...group.children]);});
  $('#families').classList.remove('reveal');
  stagger($$('#families > .eyebrow, #families > h2'));
  stagger($$('.family-member'),140);
  $$('#families > .botanical-divider, .family-amp').forEach(element=>element.classList.add('reveal'));
  $('.footer-content').classList.remove('reveal');stagger([...$('.footer-content').children],100);
  stagger($$('.hero-copy > :not(.hero-corner)'),90);$('.hero-picture').classList.add('reveal');
  stagger($$('.date-layout > .reveal'),140);stagger($$('.prewedding-card'),140);stagger($$('.event-card'),140);stagger($$('.minister-list > li'),90);
  const revealTargets=$$('.reveal');
  let scrollRevealObserver;
  function startScrollReveals(){
    if(scrollRevealObserver)return;
    if(reducedMotion||!('IntersectionObserver' in window)){revealTargets.forEach(element=>element.classList.add('is-visible'));return;}
    scrollRevealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.01,rootMargin:'0px 0px 160px 0px'});
    revealTargets.forEach(element=>scrollRevealObserver.observe(element));
  }
  document.addEventListener('focusin',event=>event.target.closest('.reveal')?.classList.add('is-visible'));
  if(reducedMotion)revealTargets.forEach(element=>element.classList.add('is-visible'));

  // A small location cue keeps the long invitation easy to navigate on a phone.
  function startSectionNavigation(){
    if(!('IntersectionObserver' in window))return;
    const navLinks=$$('.main-nav a');
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        navLinks.forEach(link=>{
          if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-22% 0px -60% 0px',threshold:0});
    $$('#home,#date,#prewedding,#celebrations,#families').forEach(section=>observer.observe(section));
  }

  // Draw only the background branches as the reader approaches each section.
  // A damped, on-demand frame loop avoids moving the content or hijacking scrolling.
  const gardens=$$('.scroll-garden').map(element=>({element,progress:reducedMotion?1:0}));
  const activeGardens=new Set();
  let gardenObserver,gardenFrame=0,gardenLastTime=0;
  const clamp=value=>Math.min(1,Math.max(0,value));
  function paintGardens(now){
    gardenFrame=0;
    const step=1-Math.exp(-Math.min(now-gardenLastTime||16,64)/220);
    gardenLastTime=now;
    let settling=false;
    const updates=[...activeGardens].map(garden=>{
      const rect=garden.element.getBoundingClientRect();
      const target=clamp((innerHeight*.98-rect.top)/(innerHeight*.75));
      const gap=target-garden.progress;
      garden.progress=Math.abs(gap)<.001?target:garden.progress+gap*step;
      if(Math.abs(gap)>=.001)settling=true;
      return garden;
    });
    updates.forEach(({element,progress})=>{
      element.style.setProperty('--garden-progress',progress.toFixed(4));
      element.style.setProperty('--garden-leaves',clamp((progress-.16)/.84).toFixed(4));
    });
    if(settling)gardenFrame=requestAnimationFrame(paintGardens);
  }
  function requestGardenFrame(){
    if(!gardenFrame){gardenLastTime=performance.now();gardenFrame=requestAnimationFrame(paintGardens);}
  }
  function startGardenReveals(){
    if(gardenObserver)return;
    if(reducedMotion||!('IntersectionObserver' in window)){
      gardens.forEach(({element})=>{element.style.setProperty('--garden-progress',1);element.style.setProperty('--garden-leaves',1);});
      return;
    }
    const byElement=new Map(gardens.map(garden=>[garden.element,garden]));
    gardenObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const garden=byElement.get(entry.target);
        if(entry.isIntersecting)activeGardens.add(garden);else activeGardens.delete(garden);
      });
      requestGardenFrame();
    },{rootMargin:'120px 0px'});
    gardens.forEach(({element})=>gardenObserver.observe(element));
    addEventListener('scroll',requestGardenFrame,{passive:true});
    addEventListener('resize',requestGardenFrame,{passive:true});
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){cancelAnimationFrame(gardenFrame);gardenFrame=0;}
      else requestGardenFrame();
    });
  }
  setLanguage(new URLSearchParams(location.search).get('lang')||safeStorage.get('dd-invitation-language')||'en');
  $('#cover').focus({preventScroll:true});
})();
