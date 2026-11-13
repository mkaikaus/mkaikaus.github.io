/* Everything except the text (js/i18n.js) and the particle scene (js/scene.js). */
(function(){
  'use strict';
  var root=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
  function clamp(v,a,b){return v<a?a:(v>b?b:v);}
  function smooth(t){return t*t*(3-2*t);}
  function $(s,c){return (c||document).querySelector(s);}
  function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));}
  if(!reduce)root.classList.add('anim');

  /* Always open at the top. After a reload, or when the browser reloads a tab that was in the background,
     it would otherwise put the page back at the old scroll position, part-way down the site.
     A link that names a section (for example .../#projects) still opens at that section. */
  var startAt=location.hash?document.getElementById(location.hash.slice(1)):null;
  try{if('scrollRestoration' in history)history.scrollRestoration='manual';}catch(e){}
  if(!startAt)window.scrollTo(0,0);
  var ANIM=!reduce;

  /* ---------- translations (the strings themselves are in js/i18n.js) ---------- */
  var I18N=window.MK_I18N||null;
  var EN=I18N?I18N.en.text:{},FR=I18N&&I18N.fr?I18N.fr.text:null;
  var ROLES=I18N?{en:I18N.en.roles,fr:I18N.fr.roles}:{en:[],fr:[]};
  var MQ=I18N?{en:I18N.en.marquee,fr:I18N.fr.marquee}:{en:{},fr:{}};
  /* the English already in index.html is the fallback for any key missing from i18n.js */
  $$('[data-i18n]').forEach(function(n){if(EN[n.dataset.i18n]===undefined)EN[n.dataset.i18n]=n.innerHTML;});
  $$('[data-i18n-ph]').forEach(function(n){if(EN[n.dataset.i18nPh]===undefined)EN[n.dataset.i18nPh]=n.getAttribute('placeholder');});
  function t(k){var D=(lang==='fr'&&FR)?FR:EN;return D[k]!==undefined?D[k]:(EN[k]!==undefined?EN[k]:'');}
  if(!FR)$('#langBtn').hidden=true;

  /* ---------- hero: letters, then the lens copy ---------- */
  var ci=0;
  $$('#name .last').forEach(function(el){
    var t=el.textContent;el.textContent='';
    t.split('').forEach(function(c){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',ci++);s.textContent=c;el.appendChild(s);});
  });
  var stage=$('#stage'),lens=null;
  if(ANIM&&fine){
    lens=document.createElement('div');lens.className='lens';lens.setAttribute('aria-hidden','true');lens.setAttribute('inert','');
    var copy=$('.hero-in',stage).cloneNode(true);
    $$('[id]',copy).forEach(function(n){n.removeAttribute('id');});
    lens.appendChild(copy);stage.appendChild(lens);
  }

  /* ---------- text splitting ---------- */
  function splitWords(el,inner){
    var idx=0;
    (function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var f=document.createDocumentFragment();
          n.textContent.split(/([ \n\t]+)/).forEach(function(tok){
            if(!tok)return;
            if(/^[ \n\t]+$/.test(tok)){f.appendChild(document.createTextNode(' '));return;}
            var w=document.createElement('span');w.className='w';
            if(inner){var s=document.createElement('span');s.textContent=tok;s.style.setProperty('--wi',idx);w.appendChild(s);}else{w.textContent=tok;}
            idx++;f.appendChild(w);
          });
          node.replaceChild(f,n);
        }else if(n.nodeType===1){walk(n);}
      });
    })(el);
  }
  var stateP=$('#stateP'),stateWords=[],kins=[],mqs=[];
  function buildText(){
    if(!ANIM)return buildMarquees();
    splitWords(stateP,false);stateWords=$$('.w',stateP);
    $$('.rise').forEach(function(el){splitWords(el,true);});
    kins=$$('.kin').map(function(h){
      var html=h.innerHTML,tr=document.createElement('span');tr.className='kin-track';
      /* six copies; the third one (index 2) is the copy that gets centred */
      for(var i=0;i<6;i++){var it=document.createElement('span');it.className='kin-item';it.innerHTML='<span class="kin-txt">'+html+'</span>';if(i!==2)it.setAttribute('aria-hidden','true');tr.appendChild(it);}
      h.innerHTML='';h.appendChild(tr);
      return {h:h,tr:tr,dir:+h.dataset.dir||1,hs:null,mid:0,w:0};
    });
    buildMarquees();
  }
  function buildMarquees(){
    mqs=$$('.mq-track').map(function(tr){
      var items=MQ[lang][tr.dataset.mq]||[],reps=ANIM?3:1,html='';
      function set(hidden){var s='<div class="mq-set"'+(hidden?' aria-hidden="true"':'')+'>';items.forEach(function(t){s+='<span>'+t+'</span><b></b>';});return s+'</div>';}
      for(var g=0;g<(ANIM?2:1);g++){for(var r=0;r<reps;r++){html+=set(g>0||r>0);}}
      tr.innerHTML=html;
      return {tr:tr,dir:+tr.dataset.dir||1,x:0,half:0};
    });
  }

  /* ---------- language ---------- */
  var lang='en',noteKey='';
  function setLang(l){
    lang=l;root.lang=l;
    $$('[data-i18n]').forEach(function(n){n.innerHTML=t(n.dataset.i18n);});
    $$('[data-i18n-ph]').forEach(function(n){n.setAttribute('placeholder',t(n.dataset.i18nPh));});
    var b=$('#langBtn');b.textContent=l==='fr'?'EN':'FR';
    if(t('ui_lang_label'))b.setAttribute('aria-label',t('ui_lang_label'));
    if(noteKey)$('#note').textContent=t(noteKey);
    store('mk-lang',l);
    buildText();labels();restartRole();
    $$('.rise.in').forEach(function(n){n.classList.remove('in');io.observe(n);});
    layout();dirty=true;
  }
  function labels(){
    var dark=theme()==='dark',open=root.classList.contains('menu-open'),s;
    s=t(dark?'ui_theme_light':'ui_theme_dark');if(s)$('#themeBtn').setAttribute('aria-label',s);
    $('#icoMoon').hidden=dark;$('#icoSun').hidden=!dark;
    s=t(open?'ui_close':'ui_menu');if(s)$('#menuLbl').textContent=s;
  }

  /* ---------- theme and section tone ---------- */
  var mqDark=window.matchMedia('(prefers-color-scheme: dark)'),tone='base',sceneColors=null;
  function theme(){var t=root.getAttribute('data-theme');return (t==='dark'||t==='light')?t:(mqDark.matches?'dark':'light');}
  function applyPal(){
    var t=theme(),pal=tone==='inv'?(t==='dark'?'light':'dark'):t;
    if(root.getAttribute('data-pal')!==pal){root.setAttribute('data-pal',pal);if(sceneColors)sceneColors(pal);}
  }
  var savedT=store('mk-theme');if(savedT==='dark'||savedT==='light')root.setAttribute('data-theme',savedT);
  $('#themeBtn').addEventListener('click',function(){var t=theme()==='dark'?'light':'dark';root.setAttribute('data-theme',t);store('mk-theme',t);applyPal();labels();});
  $('#langBtn').addEventListener('click',function(){setLang(lang==='en'?'fr':'en');});
  if(mqDark.addEventListener)mqDark.addEventListener('change',function(){applyPal();labels();});
  if(window.MutationObserver)new MutationObserver(function(){applyPal();labels();}).observe(root,{attributes:true,attributeFilter:['data-theme']});

  /* ---------- typed role ---------- */
  var rw=0,rc=0,rdel=false,rtimer=null;
  function setRole(t){$$('.role-txt').forEach(function(n){n.textContent=t;});}
  function restartRole(){
    clearTimeout(rtimer);rw=0;rc=0;rdel=false;
    if(!ROLES[lang]||!ROLES[lang].length)return;
    if(!ANIM){setRole(ROLES[lang][0]);return;}
    roleTick();
  }
  function roleTick(){
    var full=ROLES[lang][rw];setRole(full.slice(0,rc));
    if(!rdel&&rc===full.length){rdel=true;rtimer=setTimeout(roleTick,1700);return;}
    if(rdel&&rc===0){rdel=false;rw=(rw+1)%ROLES[lang].length;}
    rc+=rdel?-1:1;rtimer=setTimeout(roleTick,rdel?32:75);
  }

  /* ---------- reveal on enter ---------- */
  function countUp(el){
    var n=+el.dataset.n,t0=performance.now(),D=1400;
    (function step(now){var p=clamp((now-t0)/D,0,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(n*e);if(p<1)requestAnimationFrame(step);})(t0);
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      e.target.classList.add('in');io.unobserve(e.target);
      if(ANIM&&e.target.classList.contains('count'))countUp(e.target);
    });
  },{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  $$('.rv,.flip,.rise,.sig,.count').forEach(function(n){io.observe(n);});

  /* ---------- smooth scroll, anchors, menu ---------- */
  var lenis=null;
  if(ANIM&&window.Lenis){try{lenis=new window.Lenis({lerp:.1,smoothWheel:true});}catch(e){lenis=null;}}
  function goTo(el){if(lenis)lenis.scrollTo(el,{duration:1.5});else el.scrollIntoView({behavior:ANIM?'smooth':'auto'});}
  var menu=$('#menu'),menuBtn=$('#menuBtn');
  function setMenu(open){
    root.classList.toggle('menu-open',open);menuBtn.setAttribute('aria-expanded',open?'true':'false');
    if(open){menu.removeAttribute('inert');if(lenis)lenis.stop();}else{menu.setAttribute('inert','');if(lenis)lenis.start();}
    labels();
  }
  menuBtn.addEventListener('click',function(){setMenu(!root.classList.contains('menu-open'));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('menu-open')){setMenu(false);menuBtn.focus();}});
  document.addEventListener('click',function(e){
    var a=e.target.closest?e.target.closest('a[href^="#"]'):null;if(!a)return;
    var el=document.getElementById(a.getAttribute('href').slice(1));if(!el)return;
    e.preventDefault();if(root.classList.contains('menu-open'))setMenu(false);goTo(el);
  });

  /* ---------- pointer effects ---------- */
  var mx=0,my=0,px=-100,py=-100,ringEl=$('#ring'),rx=-100,ry=-100,lr=0,lx=0,ly=0,inHero=false;
  if(fine&&ANIM){
    window.addEventListener('mousemove',function(e){
      px=e.clientX;py=e.clientY;mx=px/window.innerWidth-.5;my=py/window.innerHeight-.5;
      ringEl.classList.add('on');
      var t=e.target;ringEl.classList.toggle('big',!!(t.closest&&t.closest('a,button,.tilt,input,textarea')));
      inHero=!!(t.closest&&t.closest('.hero'))&&!root.classList.contains('menu-open');
    },{passive:true});
    document.addEventListener('mouseleave',function(){ringEl.classList.remove('on');inHero=false;});
    $$('.tilt').forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        card.style.transform='rotateY('+((x-.5)*13)+'deg) rotateX('+((.5-y)*13)+'deg) translateZ(8px)';
        card.style.setProperty('--mx',(x*100)+'%');card.style.setProperty('--my',(y*100)+'%');
      });
      card.addEventListener('mouseleave',function(){card.style.transform='';});
    });
    $$('.mag').forEach(function(b){
      b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.28)+'px,'+((e.clientY-r.top-r.height/2)*.4)+'px)';});
      b.addEventListener('mouseleave',function(){b.style.transform='';});
    });
  }
  /* volunteering and other-work rows: hover or tap a row to open it; two tabs switch the list */
  var jobs=$$('.job');
  function openJob(j){
    jobs.forEach(function(x){var on=x===j;x.classList.toggle('open',on);$('button',x).setAttribute('aria-expanded',on?'true':'false');});
    setTimeout(layout,560);
  }
  jobs.forEach(function(j){
    if(fine){j.addEventListener('mouseenter',function(){j._h=true;openJob(j);});j.addEventListener('mouseleave',function(){j._h=false;});}
    $('button',j).addEventListener('click',function(){openJob(j._h||!j.classList.contains('open')?j:null);});
  });
  if(fine)$$('.jobs').forEach(function(l){l.addEventListener('mouseleave',function(){openJob(null);});});
  $$('.panel').forEach(function(pn){$$('.job',pn).forEach(function(j,k){j.style.setProperty('--k',k);});});
  var tabs=$$('.tab');
  function showTab(t,focus){
    tabs.forEach(function(x){
      var on=x===t,pn=document.getElementById(x.getAttribute('aria-controls'));
      x.classList.toggle('on',on);x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;
      pn.hidden=!on;pn.classList.toggle('swap',on);
    });
    openJob(null);if(focus)t.focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){showTab(t);});
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showTab(tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length],true);}
    });
  });

  /* ---------- contact form (Web3Forms; the access key is the hidden field in index.html) ---------- */
  var form=$('#form'),sending=false;
  function setNote(k){noteKey=k;$('#note').textContent=t(k);}
  form.addEventListener('submit',function(e){
    if(!window.fetch||!window.FormData)return; /* very old browsers: let the form post normally */
    e.preventDefault();
    if(sending)return;
    var f=form.elements,btn=$('button[type="submit"]',form);
    if(f.botcheck&&f.botcheck.checked){form.reset();setNote('form_ok');return;} /* honeypot: bots get a quiet "sent" */
    if(!f.access_key||!f.access_key.value){setNote('form_err');return;}
    var data=new FormData(form); /* read before the button is disabled; plain form data needs no CORS preflight */
    sending=true;btn.disabled=true;setNote('form_sending');
    fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:data})
      .then(function(r){return r.json().then(function(j){return r.ok&&!!(j&&j.success);},function(){return false;});})
      .then(function(ok){if(ok)form.reset();setNote(ok?'form_ok':'form_err');},function(){setNote('form_err');})
      .then(function(){sending=false;btn.disabled=false;});
  });

  /* ---------- scroll-driven layout ---------- */
  var vh=window.innerHeight,vw=window.innerWidth,dirty=true,lastSy=-1,prevSy=0;
  var prog=$('#prog'),stateSec=$('#intro');
  /* pinned side-scrolling sections (Projects, Research paper): each <section class="hs"> holds one track of cards */
  var HS=$$('.hs').map(function(sec){
    var track=$('.hs-track',sec),cards=Array.prototype.slice.call(track.children),tot=$('.hs-total,#hsTotal',sec);
    if(tot)tot.textContent=('0'+cards.length).slice(-2);
    return {sec:sec,pin:$('.hs-pin',sec),view:$('.hs-view',sec),track:track,cards:cards,bar:$('.hs-bar i',sec),num:$('.hs-num,#hsNum',sec),fit:sec.hasAttribute('data-fit'),dist:0,on:false,cur:-1};
  });
  var xp=$('#xp'),pars=$$('.par'),tl=$('#tl'),tlLine=$('#tlLine'),tones=$$('[data-tone]');
  var SCN=[
    {id:'home',shape:'sphere',x:3.0,y:.1,s:1,o:1,tilt:0},
    {id:'intro',shape:'knot',x:0,y:0,s:1.15,o:.42,tilt:.2},
    {id:'projects',shape:'disc',x:0,y:0,s:1,o:.6,tilt:.16},
    {id:'experience',shape:'lattice',x:0,y:0,s:1.25,o:.26,tilt:.3},
    {id:'skills',shape:'ring',x:0,y:0,s:1.3,o:.4,tilt:.5},
    {id:'research',shape:'knot',x:0,y:0,s:1.5,o:.2,tilt:.2},
    {id:'about',shape:'lattice',x:0,y:0,s:1.5,o:.16,tilt:.3},
    {id:'contact',shape:'sphere',x:0,y:-.4,s:1.45,o:.5,tilt:0}
  ],anchors=[],resizeScene=null;
  var KIN_HOLD=.45; /* 0 = titles never rest, 1 = titles never move; .45 = still across the middle of the screen */
  function layout(){
    vh=window.innerHeight;vw=window.innerWidth;
    /* kinetic titles: shrink any title wider than the screen so it fits when centred, then measure
       where the middle copy's text sits inside its track and how wide one copy is */
    kins.forEach(function(k){
      k.h.style.fontSize='';
      var c=k.tr.children,txt=c[2].firstChild,avail=k.h.clientWidth*.9,w=txt.getBoundingClientRect().width;
      if(w>avail)k.h.style.fontSize=(parseFloat(getComputedStyle(k.h).fontSize)*avail/w)+'px';
      var t0=k.tr.getBoundingClientRect().left,m=txt.getBoundingClientRect();
      k.mid=m.left+m.width/2-t0;k.w=c[1].getBoundingClientRect().left-c[0].getBoundingClientRect().left;
      var ks=k.h.closest('.hs');k.hs=null;HS.forEach(function(H){if(H.sec===ks)k.hs=H;});
    });
    HS.forEach(function(H){
      var on=ANIM&&vw>860&&vh>=600;
      H.sec.classList.toggle('is-on',on);H.track.style.transform='';H.sec.style.height='';
      if(on&&H.fit){ /* a section marked data-fit gives up the pin when its content is taller than the screen */
        var need=parseFloat(getComputedStyle(H.pin).paddingTop)||0;
        Array.prototype.forEach.call(H.pin.children,function(c){var cs=getComputedStyle(c);if(cs.display==='none')return;need+=c.offsetHeight+(parseFloat(cs.marginTop)||0)+(parseFloat(cs.marginBottom)||0);});
        if(need>vh+16){on=false;H.sec.classList.remove('is-on');}
      }
      H.on=on;H.cur=-1;
      if(on){H.dist=Math.max(0,H.track.scrollWidth-H.view.clientWidth);H.sec.style.height=(vh+H.dist)+'px';}
      else{H.dist=0;H.cards.forEach(function(c){c.classList.remove('cur');});}
    });
    var s=window.scrollY;
    anchors=SCN.map(function(k){var r=document.getElementById(k.id).getBoundingClientRect(),a=r.top+s;return {a:a,b:Math.max(a,a+r.height-vh),k:k};});
    mqs.forEach(function(m){m.half=m.tr.scrollWidth/2;});
    if(resizeScene)resizeScene();
    dirty=true;
  }
  function update(){
    var sy=window.scrollY;
    if(sy===lastSy&&!dirty)return;
    dirty=false;
    var max=Math.max(1,root.scrollHeight-vh);
    prog.style.transform='scaleX('+clamp(sy/max,0,1)+')';
    if(sy>lastSy+3&&sy>vh*.5)root.classList.add('nav-hide');else if(sy<lastSy-3||sy<vh*.5)root.classList.remove('nav-hide');
    lastSy=sy;
    /* palette follows the section crossing the middle of the screen */
    var mid=vh*.5,t=tone;
    for(var i=0;i<tones.length;i++){var tr=tones[i].getBoundingClientRect();if(tr.top<=mid&&tr.bottom>mid){t=tones[i].dataset.tone;break;}}
    if(t!==tone){tone=t;applyPal();}
    if(!ANIM)return;
    var hp=clamp(sy/vh,0,1);
    stage.style.transform='translate3d(0,'+(-hp*vh*.14)+'px,0) scale('+(1-hp*.07)+')';
    stage.style.opacity=clamp(1-hp*1.3,0,1);
    var r=stateSec.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,r.height-vh),0,1),n=stateWords.length,head=p*(n+8)-1;
    for(i=0;i<n;i++){stateWords[i].style.opacity=.13+.87*clamp((head-i)/5,0,1);}
    kins.forEach(function(k){
      var kr=k.h.getBoundingClientRect();if(kr.bottom<-200||kr.top>vh+200)return;
      /* off: 1 as the title enters at the bottom, 0 when it rests in the middle, -1 as it leaves at the top.
         The pinned Projects title stays at 0 (centred) for as long as the section is pinned. */
      var off;
      if(k.hs&&k.hs.on){var sr=k.hs.sec.getBoundingClientRect();off=sr.top>0?sr.top/vh:(sr.bottom<vh?(sr.bottom-vh)/vh:0);}
      else{off=((kr.top+kr.height/2)-vh/2)/((vh+kr.height)/2);}
      off=clamp(off,-1,1);
      /* hold: the title stays centred while it is in the middle band of the screen, then eases away */
      var a=Math.abs(off),e=a<=KIN_HOLD?0:smooth((a-KIN_HOLD)/(1-KIN_HOLD));
      k.tr.style.transform='translate3d('+(kr.width/2-k.mid+k.dir*(off<0?-e:e)*k.w*.45)+'px,0,0)';
    });
    HS.forEach(function(H){
      if(!H.on)return;
      var hr=H.sec.getBoundingClientRect(),hp=clamp(-hr.top/Math.max(1,hr.height-vh),0,1);
      H.track.style.transform='translate3d('+(-hp*H.dist)+'px,0,0)';
      if(H.bar)H.bar.style.transform='scaleX('+hp+')';
      var idx=Math.round(hp*(H.cards.length-1));
      if(idx!==H.cur){
        H.cur=idx;if(H.num)H.num.textContent=('0'+(idx+1)).slice(-2);
        H.cards.forEach(function(c,i){c.classList.toggle('cur',i===idx);});
      }
    });
    if(vw>860){
      r=xp.getBoundingClientRect();var off=(r.top+r.height/2)-vh/2;
      pars.forEach(function(el){el.style.transform='translate3d(0,'+(off*(+el.dataset.speed))+'px,0)';});
    }else{pars.forEach(function(el){el.style.transform='';});}
    r=tl.getBoundingClientRect();
    tlLine.style.transform='scaleY('+clamp((vh*.72-r.top)/Math.max(1,r.height),0,1)+')';
  }

  /* ---------- start state ---------- */
  var savedL=store('mk-lang');
  lang=(FR&&(savedL==='fr'||(!savedL&&(navigator.language||'').toLowerCase().indexOf('fr')===0)))?'fr':'en';
  applyPal();
  setLang(lang);

  /* ---------- preloader ---------- */
  (function(){
    var pre=$('#pre'),num=$('#preN'),bar=$('#preBar');
    if(!ANIM||!pre){root.classList.add('loaded');return;}
    var t0=performance.now(),D=1500;
    (function step(now){
      var p=clamp((now-t0)/D,0,1),e=1-Math.pow(1-p,3);
      num.textContent=('00'+Math.round(e*100)).slice(-3);bar.style.transform='scaleX('+e+')';
      if(p<1)requestAnimationFrame(step);else setTimeout(function(){root.classList.add('loaded');},180);
    })(t0);
  })();

  /* ---------- particle scene: js/scene.js draws it; three.js is fetched after first paint ---------- */
  var sceneFrame=null;
  var sceneEnv={};
  Object.defineProperties(sceneEnv,{
    vw:{get:function(){return vw;}},vh:{get:function(){return vh;}},
    mx:{get:function(){return mx;}},my:{get:function(){return my;}},
    anchors:{get:function(){return anchors;}}
  });
  function startScene(){
    if(!window.MKScene||!window.MKScene.supported())return; /* no WebGL: the page simply has no particles */
    var s=document.createElement('script');s.src='vendor/three.min.js';s.async=true;
    s.onload=function(){
      var sc=null;
      try{sc=window.MKScene.create(window.THREE,$('#scene'),sceneEnv);}catch(e){sc=null;}
      if(!sc)return;
      sceneColors=sc.colors;resizeScene=sc.resize;
      sceneColors(root.getAttribute('data-pal')||theme());resizeScene();
      sceneFrame=sc.frame;
      if(!ANIM){sceneFrame(0);sceneFrame(16);var k=0;(function settle(){sceneFrame(16*(k+2));if(++k<90)requestAnimationFrame(settle);})();}
    };
    document.head.appendChild(s);
  }
  requestAnimationFrame(function(){setTimeout(startScene,60);});

  /* ---------- main loop ---------- */
  var lastT=0,rafId=0;
  function tick(time){
    if(lenis)lenis.raf(time);
    update();
    var sy=window.scrollY,v=sy-prevSy;prevSy=sy;
    var dt=Math.min(50,time-lastT)/16.67;lastT=time;
    for(var i=0;i<mqs.length;i++){
      var m=mqs[i];if(!m.half)continue;
      m.x-=m.dir*(.7+Math.min(14,Math.abs(v))*.5)*dt;
      if(m.x<=-m.half)m.x+=m.half;if(m.x>0)m.x-=m.half;
      m.tr.style.transform='translate3d('+m.x+'px,0,0)';
    }
    if(fine){
      rx+=(px-rx)*.2;ry+=(py-ry)*.2;ringEl.style.transform='translate3d('+rx+'px,'+ry+'px,0)';
      if(lens){
        var hr=stage.getBoundingClientRect();
        lx+=(px-hr.left-lx)*.16;ly+=(py-hr.top-ly)*.16;lr+=((inHero?150:0)-lr)*.12;
        lens.style.setProperty('--lx',lx+'px');lens.style.setProperty('--ly',ly+'px');lens.style.setProperty('--lr',Math.max(0,lr)+'px');
      }
    }
    if(sceneFrame)sceneFrame(time);
    rafId=requestAnimationFrame(tick);
  }
  window.addEventListener('resize',layout);
  window.addEventListener('load',layout);
  window.addEventListener('load',function(){
    if(startAt){if(lenis)lenis.scrollTo(startAt,{immediate:true});else startAt.scrollIntoView();}
  });
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);
  layout();
  if(ANIM){
    rafId=requestAnimationFrame(tick);
    /* nothing animates while the tab is hidden */
    document.addEventListener('visibilitychange',function(){
      if(document.hidden){cancelAnimationFrame(rafId);rafId=0;clearTimeout(rtimer);}
      else if(!rafId){prevSy=window.scrollY;rafId=requestAnimationFrame(tick);if(ROLES[lang]&&ROLES[lang].length){clearTimeout(rtimer);rtimer=setTimeout(roleTick,75);}}
    });
  }
  else{
    window.addEventListener('scroll',function(){update();if(sceneFrame)requestAnimationFrame(sceneFrame);},{passive:true});update();
  }
})();