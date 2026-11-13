/* The particle scene behind the page (Three.js r128, loaded from vendor/ by js/main.js).
   One cloud of points morphs between five shapes: sphere, knot, disc, lattice and ring.
   Which shape shows in which section is the SCN list in js/main.js.

   MKScene.supported() says whether the browser has WebGL.
   MKScene.create(THREE, canvas, env) returns null when WebGL is not available, otherwise
     frame(time)   draw one frame
     colors(pal)   'light' or 'dark'
     resize()      match the canvas to the window
   env gives live values from main.js: vw, vh (window size), mx, my (mouse, -0.5 to 0.5)
   and anchors (where each section starts and ends). */
(function(){
  'use strict';
  function smooth(t){return t*t*(3-2*t);}
  /* checked before three.js is downloaded, so devices without WebGL skip the download */
  function supported(){
    try{var c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')||c.getContext('experimental-webgl')));}catch(e){return false;}
  }
  window.MKScene={supported:supported,create:function(THREE,canvas,env){
    if(!THREE||!canvas)return null;
  var renderer;
  try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});}catch(e){return null;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,100);camera.position.set(0,0,9);
  var N=env.vw>860?4600:2400,S={sphere:new Float32Array(N*3),knot:new Float32Array(N*3),disc:new Float32Array(N*3),lattice:new Float32Array(N*3),ring:new Float32Array(N*3)},rad=new Float32Array(N);
  var G=10,GA=2.399963;
  for(var i=0;i<N;i++){
    var j=i*3,a,b,rr;
    /* sphere */
    var y=1-2*(i+.5)/N,q=Math.sqrt(1-y*y),R=2.35*(1+(Math.random()-.5)*.07);
    S.sphere[j]=Math.cos(i*GA)*q*R;S.sphere[j+1]=y*R;S.sphere[j+2]=Math.sin(i*GA)*q*R;
    /* trefoil knot */
    a=Math.random()*Math.PI*2;rr=Math.cos(3*a)+2;
    var ox=(Math.random()-.5)*.55,oy=(Math.random()-.5)*.55,oz=(Math.random()-.5)*.55;
    S.knot[j]=rr*Math.cos(2*a)*.95+ox;S.knot[j+1]=rr*Math.sin(2*a)*.95+oy;S.knot[j+2]=-Math.sin(3*a)*.95+oz;
    /* rippling disc */
    a=Math.random()*Math.PI*2;rr=Math.sqrt(Math.random())*10;rad[i]=rr;
    S.disc[j]=Math.cos(a)*rr;S.disc[j+1]=-2.1;S.disc[j+2]=Math.sin(a)*rr;
    /* lattice */
    var site=i%(G*G*G),ix=site%G,iy=Math.floor(site/G)%G,iz=Math.floor(site/(G*G));
    S.lattice[j]=(ix/(G-1)-.5)*4.4+(Math.random()-.5)*.05;S.lattice[j+1]=(iy/(G-1)-.5)*4.4+(Math.random()-.5)*.05;S.lattice[j+2]=(iz/(G-1)-.5)*4.4+(Math.random()-.5)*.05;
    /* ring */
    a=Math.random()*Math.PI*2;b=Math.random()*Math.PI*2;rr=3.3+Math.cos(b)*.32;
    S.ring[j]=Math.cos(a)*rr;S.ring[j+1]=Math.sin(b)*.32;S.ring[j+2]=Math.sin(a)*rr;
  }
  var cur=new Float32Array(S.sphere),geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(cur,3));
  var sp=document.createElement('canvas');sp.width=sp.height=64;var g=sp.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.45,'rgba(255,255,255,.75)');gr.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=gr;g.fillRect(0,0,64,64);
  var mat=new THREE.PointsMaterial({size:.07,map:new THREE.CanvasTexture(sp),transparent:true,opacity:0,depthWrite:false,sizeAttenuation:true});
  var pts=new THREE.Points(geo,mat),group=new THREE.Group();group.add(pts);scene.add(group);
  var palMul=1;
  function colors(pal){
    if(pal==='dark'){mat.color.set(0xff8a8a);mat.blending=THREE.AdditiveBlending;palMul=1;}
    else{mat.color.set(0xe2484d);mat.blending=THREE.NormalBlending;palMul=.9;}
    mat.needsUpdate=true;
  }
  function resize(){renderer.setSize(env.vw,env.vh,false);camera.aspect=env.vw/env.vh;camera.updateProjectionMatrix();}
  var st={x:3,y:0,s:1,o:0,tilt:0},spin=0,last=0;
  function target(sy){
    var anchors=env.anchors,A=anchors[0],B=A,t=0;
    if(!A)return null;
    for(var k=0;k<anchors.length;k++){
      var c=anchors[k],nx=anchors[k+1];
      if(sy<=c.b||!nx){A=B=c;t=0;break;}
      if(sy<nx.a){A=c;B=nx;t=smooth((sy-c.b)/Math.max(1,nx.a-c.b));break;}
    }
    return {A:A.k,B:B.k,t:t};
  }
  function frame(time){
    var T=time/1000,dt=Math.min(.05,T-last);last=T;
    var tg=target(window.scrollY);if(!tg)return;
    var A=tg.A,B=tg.B,t=tg.t,narrow=env.vw<=860,mx=env.mx,my=env.my;
    function mix(key){return A[key]+(B[key]-A[key])*t;}
    var wx=narrow?0:mix('x'),wy=mix('y')+(narrow&&t<.5&&A.id==='home'?1.2:0),wo=mix('o')*(narrow?.6:1)*palMul;
    st.x+=(wx-st.x)*.06;st.y+=(wy-st.y)*.06;st.s+=(mix('s')*(narrow?.72:1)-st.s)*.06;st.o+=(wo-st.o)*.06;st.tilt+=(mix('tilt')-st.tilt)*.06;
    var PA=S[A.shape],PB=S[B.shape],wDisc=(A.shape==='disc'?1-t:0)+(B.shape==='disc'?t:0);
    for(var i=0,j=0;i<N;i++,j+=3){
      var tx=PA[j]+(PB[j]-PA[j])*t,ty=PA[j+1]+(PB[j+1]-PA[j+1])*t,tz=PA[j+2]+(PB[j+2]-PA[j+2])*t;
      ty+=Math.sin(T*.9+i*.37)*.035+wDisc*Math.sin(rad[i]*1.25-T*1.5)*.26;
      cur[j]+=(tx-cur[j])*.085;cur[j+1]+=(ty-cur[j+1])*.085;cur[j+2]+=(tz-cur[j+2])*.085;
    }
    geo.attributes.position.needsUpdate=true;
    spin+=dt*.16;
    group.position.set(st.x,st.y,0);group.scale.setScalar(st.s);
    group.rotation.y+=((spin+mx*.7+window.scrollY*.0007)-group.rotation.y)*.08;
    group.rotation.x+=((st.tilt+my*.45)-group.rotation.x)*.08;
    mat.opacity=st.o;
    renderer.render(scene,camera);
  }
  return {frame:frame,colors:colors,resize:resize};
  }};
})();
