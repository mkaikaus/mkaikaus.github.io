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