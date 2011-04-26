/*
 * Raphael 1.4.3 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael=(function(){function aB(){if(aB.is(arguments[0],aW)){var e=arguments[0],E=C[bl](aB,e.splice(0,3+aB.is(e[0],ay))),bq=E.set();
for(var S=0,br=e[o];S<br;S++){var R=e[S]||{};ba.test(R.type)&&bq[f](E[R.type]().attr(R))
}return bq}return C[bl](aB,arguments)}aB.version="1.4.3";var a=/[, ]+/,ba=/^(circle|rect|path|ellipse|text|image)$/,bn="prototype",ac="hasOwnProperty",W=document,aI=window,n={was:Object[bn][ac].call(aI,"Raphael"),is:aI.Raphael},bi=function(){},a6="appendChild",bl="apply",bg="concat",Q="createTouch" in W,aH="",aA=" ",G="split",N="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[G](aA),bb={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},aO="join",o="length",bp=String[bn].toLowerCase,ak=Math,h=ak.max,a4=ak.min,ay="number",ab="string",aW="array",aQ="toString",aT="fill",aL=Object[bn][aQ],bd={},a7=ak.pow,f="push",bj=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+?)['"]?\)$/i,D=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%))\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,Z=ak.round,B="setAttribute",af=parseFloat,O=parseInt,aU=" progid:DXImageTransform.Microsoft",a9=String[bn].toUpperCase,l={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},ai={along:"along",blur:ay,"clip-rect":"csv",cx:ay,cy:ay,fill:"colour","fill-opacity":ay,"font-size":ay,height:ay,opacity:ay,path:"path",r:ay,rotation:"csv",rx:ay,ry:ay,scale:"csv",stroke:"colour","stroke-opacity":ay,"stroke-width":ay,translation:"csv",width:ay,x:ay,y:ay},bc="replace";
aB.type=(aI.SVGAngle||W.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(aB.type=="VML"){var aq=W.createElement("div");aq.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(aq.childNodes[o]!=2){return aB.type=null}aq=null}aB.svg=!(aB.vml=aB.type=="VML");
bi[bn]=aB[bn];aB._id=0;aB._oid=0;aB.fn={};aB.is=function(i,e){e=bp.call(e);return(e=="object"&&i===Object(i))||(e=="undefined"&&typeof i==e)||(e=="null"&&i==null)||bp.call(aL.call(i).slice(8,-1))==e
};aB.setWindow=function(e){aI=e;W=aI.document};var aX=function(E){if(aB.vml){var e=/^\s+|\s+$/g;
aX=au(function(S){var bq;S=(S+aH)[bc](e,aH);try{var br=new aI.ActiveXObject("htmlfile");
br.write("<body>");br.close();bq=br.body}catch(bt){bq=aI.createPopup().document.body
}var i=bq.createTextRange();try{bq.style.color=S;var bs=i.queryCommandValue("ForeColor");
bs=((bs&255)<<16)|(bs&65280)|((bs&16711680)>>>16);return"#"+("000000"+bs[aQ](16)).slice(-6)
}catch(bt){return"none"}})}else{var R=W.createElement("i");R.title="Rapha\xebl Colour Picker";
R.style.display="none";W.body[a6](R);aX=au(function(i){R.style.color=i;return W.defaultView.getComputedStyle(R,aH).getPropertyValue("color")
})}return aX(E)};var av=function(){return"hsb("+[this.h,this.s,this.b]+")"},z=function(){return this.hex
};aB.hsb2rgb=au(function(bu,bs,by){if(aB.is(bu,"object")&&"h" in bu&&"s" in bu&&"b" in bu){by=bu.b;
bs=bu.s;bu=bu.h}var S,bq,bz;if(by==0){return{r:0,g:0,b:0,hex:"#000"}}if(bu>1||bs>1||by>1){bu/=255;
bs/=255;by/=255}var br=~~(bu*6),bv=(bu*6)-br,R=by*(1-bs),E=by*(1-(bs*bv)),bA=by*(1-(bs*(1-bv)));
S=[by,E,R,R,bA,by,by][br];bq=[bA,by,by,E,R,R,bA][br];bz=[R,R,bA,by,by,E,R][br];S*=255;
bq*=255;bz*=255;var bw={r:S,g:bq,b:bz,toString:z},e=(~~S)[aQ](16),bt=(~~bq)[aQ](16),bx=(~~bz)[aQ](16);
e=e[bc](bj,"0");bt=bt[bc](bj,"0");bx=bx[bc](bj,"0");bw.hex="#"+e+bt+bx;return bw},aB);
aB.rgb2hsb=au(function(e,i,bs){if(aB.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bs=e.b;
i=e.g;e=e.r}if(aB.is(e,ab)){var bu=aB.getRGB(e);e=bu.r;i=bu.g;bs=bu.b}if(e>1||i>1||bs>1){e/=255;
i/=255;bs/=255}var br=h(e,i,bs),E=a4(e,i,bs),S,R,bq=br;if(E==br){return{h:0,s:0,b:br}
}else{var bt=(br-E);R=bt/br;if(e==br){S=(i-bs)/bt}else{if(i==br){S=2+((bs-e)/bt)}else{S=4+((e-i)/bt)
}}S/=6;S<0&&S++;S>1&&S--}return{h:S,s:R,b:bq,toString:av}},aB);var aY=/,?([achlmqrstvxz]),?/gi,a0=/\s*,\s*/,j={hs:1,rg:1};
aB._path2string=function(){return this.join(",")[bc](aY,"$1")};function au(R,i,e){function E(){var S=Array[bn].slice.call(arguments,0),br=S[aO]("\u25ba"),bq=E.cache=E.cache||{},bs=E.count=E.count||[];
if(bq[ac](br)){return e?e(bq[br]):bq[br]}bs[o]>=1000&&delete bq[bs.shift()];bs[f](br);
bq[br]=R[bl](i,S);return e?e(bq[br]):bq[br]}return E}aB.getRGB=au(function(i){if(!i||!!((i=i+aH).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(i=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(j[ac](i.substring(0,2))||i.charAt()=="#")&&(i=aX(i));
var br,E,R,bu,bq,bv,bs=i.match(D);if(bs){if(bs[2]){bu=O(bs[2].substring(5),16);R=O(bs[2].substring(3,5),16);
E=O(bs[2].substring(1,3),16)}if(bs[3]){bu=O((bv=bs[3].charAt(3))+bv,16);R=O((bv=bs[3].charAt(2))+bv,16);
E=O((bv=bs[3].charAt(1))+bv,16)}if(bs[4]){bs=bs[4][G](a0);E=af(bs[0]);R=af(bs[1]);
bu=af(bs[2]);bq=af(bs[3])}if(bs[5]){bs=bs[5][G](a0);E=af(bs[0])*2.55;R=af(bs[1])*2.55;
bu=af(bs[2])*2.55;bq=af(bs[3])}if(bs[6]){bs=bs[6][G](a0);E=af(bs[0]);R=af(bs[1]);
bu=af(bs[2]);return aB.hsb2rgb(E,R,bu)}if(bs[7]){bs=bs[7][G](a0);E=af(bs[0])*2.55;
R=af(bs[1])*2.55;bu=af(bs[2])*2.55;return aB.hsb2rgb(E,R,bu)}bs={r:E,g:R,b:bu};var e=(~~E)[aQ](16),S=(~~R)[aQ](16),bt=(~~bu)[aQ](16);
e=e[bc](bj,"0");S=S[bc](bj,"0");bt=bt[bc](bj,"0");bs.hex="#"+e+S+bt;isFinite(af(bq))&&(bs.o=bq);
return bs}return{r:-1,g:-1,b:-1,hex:"none",error:1}},aB);aB.getColor=function(i){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:i||0.75},e=this.hsb2rgb(E.h,E.s,E.b);
E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b})
}return e.hex};aB.getColor.reset=function(){delete this.start};var aJ=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,az=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
aB.parsePathString=au(function(e){if(!e){return null}var E={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},i=[];
if(aB.is(e,aW)&&aB.is(e[0],aW)){i=aK(e)}if(!i[o]){(e+aH)[bc](aJ,function(S,R,bs){var br=[],bq=bp.call(R);
bs[bc](az,function(bu,bt){bt&&br[f](+bt)});if(bq=="m"&&br[o]>2){i[f]([R][bg](br.splice(0,2)));
bq="l";R=R=="m"?"l":"L"}while(br[o]>=E[bq]){i[f]([R][bg](br.splice(0,E[bq])));if(!E[bq]){break
}}})}i[aQ]=aB._path2string;return i});aB.findDotsAtSegment=function(i,e,bF,bD,br,S,bt,bs,bz){var bx=1-bz,bw=a7(bx,3)*i+a7(bx,2)*3*bz*bF+bx*3*bz*bz*br+a7(bz,3)*bt,bu=a7(bx,3)*e+a7(bx,2)*3*bz*bD+bx*3*bz*bz*S+a7(bz,3)*bs,bB=i+2*bz*(bF-i)+bz*bz*(br-2*bF+i),bA=e+2*bz*(bD-e)+bz*bz*(S-2*bD+e),bE=bF+2*bz*(br-bF)+bz*bz*(bt-2*br+bF),bC=bD+2*bz*(S-bD)+bz*bz*(bs-2*S+bD),by=(1-bz)*i+bz*bF,bv=(1-bz)*e+bz*bD,R=(1-bz)*br+bz*bt,E=(1-bz)*S+bz*bs,bq=(90-ak.atan((bB-bE)/(bA-bC))*180/ak.PI);
(bB>bE||bA<bC)&&(bq+=180);return{x:bw,y:bu,m:{x:bB,y:bA},n:{x:bE,y:bC},start:{x:by,y:bv},end:{x:R,y:E},alpha:bq}
};var ae=au(function(bw){if(!bw){return{x:0,y:0,width:0,height:0}}bw=P(bw);var bt=0,bs=0,S=[],E=[],R;
for(var bq=0,bv=bw[o];bq<bv;bq++){R=bw[bq];if(R[0]=="M"){bt=R[1];bs=R[2];S[f](bt);
E[f](bs)}else{var br=aV(bt,bs,R[1],R[2],R[3],R[4],R[5],R[6]);S=S[bg](br.min.x,br.max.x);
E=E[bg](br.min.y,br.max.y);bt=R[5];bs=R[6]}}var e=a4[bl](0,S),bu=a4[bl](0,E);return{x:e,y:bu,width:h[bl](0,S)-e,height:h[bl](0,E)-bu}
}),aK=function(br){var R=[];if(!aB.is(br,aW)||!aB.is(br&&br[0],aW)){br=aB.parsePathString(br)
}for(var E=0,S=br[o];E<S;E++){R[E]=[];for(var e=0,bq=br[E][o];e<bq;e++){R[E][e]=br[E][e]
}}R[aQ]=aB._path2string;return R},an=au(function(S){if(!aB.is(S,aW)||!aB.is(S&&S[0],aW)){S=aB.parsePathString(S)
}var bv=[],bx=0,bw=0,bA=0,bz=0,R=0;if(S[0][0]=="M"){bx=S[0][1];bw=S[0][2];bA=bx;bz=bw;
R++;bv[f](["M",bx,bw])}for(var bs=R,bB=S[o];bs<bB;bs++){var e=bv[bs]=[],by=S[bs];
if(by[0]!=bp.call(by[0])){e[0]=bp.call(by[0]);switch(e[0]){case"a":e[1]=by[1];e[2]=by[2];
e[3]=by[3];e[4]=by[4];e[5]=by[5];e[6]=+(by[6]-bx).toFixed(3);e[7]=+(by[7]-bw).toFixed(3);
break;case"v":e[1]=+(by[1]-bw).toFixed(3);break;case"m":bA=by[1];bz=by[2];default:for(var br=1,bt=by[o];
br<bt;br++){e[br]=+(by[br]-((br%2)?bx:bw)).toFixed(3)}}}else{e=bv[bs]=[];if(by[0]=="m"){bA=by[1]+bx;
bz=by[2]+bw}for(var bq=0,E=by[o];bq<E;bq++){bv[bs][bq]=by[bq]}}var bu=bv[bs][o];switch(bv[bs][0]){case"z":bx=bA;
bw=bz;break;case"h":bx+=+bv[bs][bu-1];break;case"v":bw+=+bv[bs][bu-1];break;default:bx+=+bv[bs][bu-2];
bw+=+bv[bs][bu-1]}}bv[aQ]=aB._path2string;return bv},0,aK),w=au(function(S){if(!aB.is(S,aW)||!aB.is(S&&S[0],aW)){S=aB.parsePathString(S)
}var bu=[],bw=0,bv=0,bz=0,by=0,R=0;if(S[0][0]=="M"){bw=+S[0][1];bv=+S[0][2];bz=bw;
by=bv;R++;bu[0]=["M",bw,bv]}for(var bs=R,bA=S[o];bs<bA;bs++){var e=bu[bs]=[],bx=S[bs];
if(bx[0]!=a9.call(bx[0])){e[0]=a9.call(bx[0]);switch(e[0]){case"A":e[1]=bx[1];e[2]=bx[2];
e[3]=bx[3];e[4]=bx[4];e[5]=bx[5];e[6]=+(bx[6]+bw);e[7]=+(bx[7]+bv);break;case"V":e[1]=+bx[1]+bv;
break;case"H":e[1]=+bx[1]+bw;break;case"M":bz=+bx[1]+bw;by=+bx[2]+bv;default:for(var br=1,bt=bx[o];
br<bt;br++){e[br]=+bx[br]+((br%2)?bw:bv)}}}else{for(var bq=0,E=bx[o];bq<E;bq++){bu[bs][bq]=bx[bq]
}}switch(e[0]){case"Z":bw=bz;bv=by;break;case"H":bw=e[1];break;case"V":bv=e[1];break;
default:bw=bu[bs][bu[bs][o]-2];bv=bu[bs][bu[bs][o]-1]}}bu[aQ]=aB._path2string;return bu
},null,aK),bm=function(i,R,e,E){return[i,R,e,E,e,E]},a5=function(i,R,br,S,e,E){var bq=1/3,bs=2/3;
return[bq*i+bs*br,bq*R+bs*S,bq*e+bs*br,bq*E+bs*S,e,E]},V=function(bA,b5,bJ,bH,bB,bv,bq,bz,b4,bC){var S=ak.PI,bG=S*120/180,e=S/180*(+bB||0),bN=[],bK,b1=au(function(b6,b9,i){var b8=b6*ak.cos(i)-b9*ak.sin(i),b7=b6*ak.sin(i)+b9*ak.cos(i);
return{x:b8,y:b7}});if(!bC){bK=b1(bA,b5,-e);bA=bK.x;b5=bK.y;bK=b1(bz,b4,-e);bz=bK.x;
b4=bK.y;var E=ak.cos(S/180*bB),bx=ak.sin(S/180*bB),bP=(bA-bz)/2,bO=(b5-b4)/2;var bZ=(bP*bP)/(bJ*bJ)+(bO*bO)/(bH*bH);
if(bZ>1){bZ=ak.sqrt(bZ);bJ=bZ*bJ;bH=bZ*bH}var R=bJ*bJ,bS=bH*bH,bU=(bv==bq?-1:1)*ak.sqrt(ak.abs((R*bS-R*bO*bO-bS*bP*bP)/(R*bO*bO+bS*bP*bP))),bE=bU*bJ*bO/bH+(bA+bz)/2,bD=bU*-bH*bP/bJ+(b5+b4)/2,bu=ak.asin(((b5-bD)/bH).toFixed(7)),bt=ak.asin(((b4-bD)/bH).toFixed(7));
bu=bA<bE?S-bu:bu;bt=bz<bE?S-bt:bt;bu<0&&(bu=S*2+bu);bt<0&&(bt=S*2+bt);if(bq&&bu>bt){bu=bu-S*2
}if(!bq&&bt>bu){bt=bt-S*2}}else{bu=bC[0];bt=bC[1];bE=bC[2];bD=bC[3]}var by=bt-bu;
if(ak.abs(by)>bG){var bF=bt,bI=bz,bw=b4;bt=bu+bG*(bq&&bt>bu?1:-1);bz=bE+bJ*ak.cos(bt);
b4=bD+bH*ak.sin(bt);bN=V(bz,b4,bJ,bH,bB,0,bq,bI,bw,[bt,bF,bE,bD])}by=bt-bu;var bs=ak.cos(bu),b3=ak.sin(bu),br=ak.cos(bt),b2=ak.sin(bt),bQ=ak.tan(by/4),bT=4/3*bJ*bQ,bR=4/3*bH*bQ,b0=[bA,b5],bY=[bA+bT*b3,b5-bR*bs],bX=[bz+bT*b2,b4-bR*br],bV=[bz,b4];
bY[0]=2*b0[0]-bY[0];bY[1]=2*b0[1]-bY[1];if(bC){return[bY,bX,bV][bg](bN)}else{bN=[bY,bX,bV][bg](bN)[aO]()[G](",");
var bL=[];for(var bW=0,bM=bN[o];bW<bM;bW++){bL[bW]=bW%2?b1(bN[bW-1],bN[bW],e).y:b1(bN[bW],bN[bW+1],e).x
}return bL}},Y=function(i,e,R,E,bt,bs,br,bq,bu){var S=1-bu;return{x:a7(S,3)*i+a7(S,2)*3*bu*R+S*3*bu*bu*bt+a7(bu,3)*br,y:a7(S,3)*e+a7(S,2)*3*bu*E+S*3*bu*bu*bs+a7(bu,3)*bq}
},aV=au(function(E,e,S,R,bA,bz,bw,bt){var by=(bA-2*S+E)-(bw-2*bA+S),bv=2*(S-E)-2*(bA-S),bs=E-S,br=(-bv+ak.sqrt(bv*bv-4*by*bs))/2/by,bq=(-bv-ak.sqrt(bv*bv-4*by*bs))/2/by,bu=[e,bt],bx=[E,bw],i;
ak.abs(br)>1000000000000&&(br=0.5);ak.abs(bq)>1000000000000&&(bq=0.5);if(br>0&&br<1){i=Y(E,e,S,R,bA,bz,bw,bt,br);
bx[f](i.x);bu[f](i.y)}if(bq>0&&bq<1){i=Y(E,e,S,R,bA,bz,bw,bt,bq);bx[f](i.x);bu[f](i.y)
}by=(bz-2*R+e)-(bt-2*bz+R);bv=2*(R-e)-2*(bz-R);bs=e-R;br=(-bv+ak.sqrt(bv*bv-4*by*bs))/2/by;
bq=(-bv-ak.sqrt(bv*bv-4*by*bs))/2/by;ak.abs(br)>1000000000000&&(br=0.5);ak.abs(bq)>1000000000000&&(bq=0.5);
if(br>0&&br<1){i=Y(E,e,S,R,bA,bz,bw,bt,br);bx[f](i.x);bu[f](i.y)}if(bq>0&&bq<1){i=Y(E,e,S,R,bA,bz,bw,bt,bq);
bx[f](i.x);bu[f](i.y)}return{min:{x:a4[bl](0,bx),y:a4[bl](0,bu)},max:{x:h[bl](0,bx),y:h[bl](0,bu)}}
}),P=au(function(bA,bv){var S=w(bA),bw=bv&&w(bv),bx={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},br=function(bB,bC){var i,bD;
if(!bB){return["C",bC.x,bC.y,bC.x,bC.y,bC.x,bC.y]}!(bB[0] in {T:1,Q:1})&&(bC.qx=bC.qy=null);
switch(bB[0]){case"M":bC.X=bB[1];bC.Y=bB[2];break;case"A":bB=["C"][bg](V[bl](0,[bC.x,bC.y][bg](bB.slice(1))));
break;case"S":i=bC.x+(bC.x-(bC.bx||bC.x));bD=bC.y+(bC.y-(bC.by||bC.y));bB=["C",i,bD][bg](bB.slice(1));
break;case"T":bC.qx=bC.x+(bC.x-(bC.qx||bC.x));bC.qy=bC.y+(bC.y-(bC.qy||bC.y));bB=["C"][bg](a5(bC.x,bC.y,bC.qx,bC.qy,bB[1],bB[2]));
break;case"Q":bC.qx=bB[1];bC.qy=bB[2];bB=["C"][bg](a5(bC.x,bC.y,bB[1],bB[2],bB[3],bB[4]));
break;case"L":bB=["C"][bg](bm(bC.x,bC.y,bB[1],bB[2]));break;case"H":bB=["C"][bg](bm(bC.x,bC.y,bB[1],bC.y));
break;case"V":bB=["C"][bg](bm(bC.x,bC.y,bC.x,bB[1]));break;case"Z":bB=["C"][bg](bm(bC.x,bC.y,bC.X,bC.Y));
break}return bB},E=function(bB,bC){if(bB[bC][o]>7){bB[bC].shift();var bD=bB[bC];while(bD[o]){bB.splice(bC++,0,["C"][bg](bD.splice(0,6)))
}bB.splice(bC,1);by=h(S[o],bw&&bw[o]||0)}},R=function(bF,bE,bC,bB,bD){if(bF&&bE&&bF[bD][0]=="M"&&bE[bD][0]!="M"){bE.splice(bD,0,["M",bB.x,bB.y]);
bC.bx=0;bC.by=0;bC.x=bF[bD][1];bC.y=bF[bD][2];by=h(S[o],bw&&bw[o]||0)}};for(var bt=0,by=h(S[o],bw&&bw[o]||0);
bt<by;bt++){S[bt]=br(S[bt],bx);E(S,bt);bw&&(bw[bt]=br(bw[bt],e));bw&&E(bw,bt);R(S,bw,bx,e,bt);
R(bw,S,e,bx,bt);var bs=S[bt],bz=bw&&bw[bt],bq=bs[o],bu=bw&&bz[o];bx.x=bs[bq-2];bx.y=bs[bq-1];
bx.bx=af(bs[bq-4])||bx.x;bx.by=af(bs[bq-3])||bx.y;e.bx=bw&&(af(bz[bu-4])||e.x);e.by=bw&&(af(bz[bu-3])||e.y);
e.x=bw&&bz[bu-2];e.y=bw&&bz[bu-1]}return bw?[S,bw]:S},null,aK),u=au(function(bu){var bt=[];
for(var bq=0,bv=bu[o];bq<bv;bq++){var e={},bs=bu[bq].match(/^([^:]*):?([\d\.]*)/);
e.color=aB.getRGB(bs[1]);if(e.color.error){return null}e.color=e.color.hex;bs[2]&&(e.offset=bs[2]+"%");
bt[f](e)}for(bq=1,bv=bt[o]-1;bq<bv;bq++){if(!bt[bq].offset){var E=af(bt[bq-1].offset||0),R=0;
for(var S=bq+1;S<bv;S++){if(bt[S].offset){R=bt[S].offset;break}}if(!R){R=100;S=bv
}R=af(R);var br=(R-E)/(S-bq+1);for(;bq<S;bq++){E+=br;bt[bq].offset=E+"%"}}}return bt
}),aC=function(e,S,E,R){var i;if(aB.is(e,ab)||aB.is(e,"object")){i=aB.is(e,ab)?W.getElementById(e):e;
if(i.tagName){if(S==null){return{container:i,width:i.style.pixelWidth||i.offsetWidth,height:i.style.pixelHeight||i.offsetHeight}
}else{return{container:i,width:S,height:E}}}}else{return{container:1,x:e,y:S,width:E,height:R}
}},a1=function(e,E){var i=this;for(var R in E){if(E[ac](R)&&!(R in e)){switch(typeof E[R]){case"function":(function(S){e[R]=e===i?S:function(){return S[bl](i,arguments)
}})(E[R]);break;case"object":e[R]=e[R]||{};a1.call(this,e[R],E[R]);break;default:e[R]=E[R];
break}}}},ax=function(e,i){e==i.top&&(i.top=e.prev);e==i.bottom&&(i.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},ah=function(e,i){if(i.top===e){return
}ax(e,i);e.next=null;e.prev=i.top;i.top.next=e;i.top=e},m=function(e,i){if(i.bottom===e){return
}ax(e,i);e.next=i.bottom;e.prev=null;i.bottom.prev=e;i.bottom=e},H=function(i,e,E){ax(i,E);
e==E.top&&(E.top=i);e.next&&(e.next.prev=i);i.next=e.next;i.prev=e;e.next=i},aE=function(i,e,E){ax(i,E);
e==E.bottom&&(E.bottom=i);e.prev&&(e.prev.next=i);i.prev=e.prev;e.prev=i;i.next=e
},x=function(e){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+e+"\u201d of removed object")
}},aG=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(aB.svg){bi[bn].svgns="http://www.w3.org/2000/svg";
bi[bn].xlink="http://www.w3.org/1999/xlink";Z=function(e){return +e+(~~e===e)*0.5
};var a3=function(E,e){if(e){for(var i in e){if(e[ac](i)){E[B](i,e[i]+aH)}}}else{E=W.createElementNS(bi[bn].svgns,E);
E.style.webkitTapHighlightColor="rgba(0,0,0,0)";return E}};aB[aQ]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var v=function(e,R){var i=a3("path");R.canvas&&R.canvas[a6](i);var E=new aM(i,R);
E.type="path";aj(E,{fill:"none",stroke:"#000",path:e});return E};var b=function(S,bz,e){var bw="linear",bt=0.5,br=0.5,bB=S.style;
bz=(bz+aH)[bc](aG,function(bD,i,bE){bw="radial";if(i&&bE){bt=af(i);br=af(bE);var bC=((br>0.5)*2-1);
a7(bt-0.5,2)+a7(br-0.5,2)>0.25&&(br=ak.sqrt(0.25-a7(bt-0.5,2))*bC+0.5)&&br!=0.5&&(br=br.toFixed(5)-0.00001*bC)
}return aH});bz=bz[G](/\s*\-\s*/);if(bw=="linear"){var bs=bz.shift();bs=-af(bs);if(isNaN(bs)){return null
}var bq=[0,0,ak.cos(bs*ak.PI/180),ak.sin(bs*ak.PI/180)],by=1/(h(ak.abs(bq[2]),ak.abs(bq[3]))||1);
bq[2]*=by;bq[3]*=by;if(bq[2]<0){bq[0]=-bq[2];bq[2]=0}if(bq[3]<0){bq[1]=-bq[3];bq[3]=0
}}var bv=u(bz);if(!bv){return null}var E=S.getAttribute(aT);E=E.match(/^url\(#(.*)\)$/);
E&&e.defs.removeChild(W.getElementById(E[1]));var R=a3(bw+"Gradient");R.id="r"+(aB._id++)[aQ](36);
a3(R,bw=="radial"?{fx:bt,fy:br}:{x1:bq[0],y1:bq[1],x2:bq[2],y2:bq[3]});e.defs[a6](R);
for(var bu=0,bA=bv[o];bu<bA;bu++){var bx=a3("stop");a3(bx,{offset:bv[bu].offset?bv[bu].offset:!bu?"0%":"100%","stop-color":bv[bu].color||"#fff"});
R[a6](bx)}a3(S,{fill:"url(#"+R.id+")",opacity:1,"fill-opacity":1});bB.fill=aH;bB.opacity=1;
bB.fillOpacity=1;return 1};var X=function(i){var e=i.getBBox();a3(i.pattern,{patternTransform:aB.format("translate({0},{1})",e.x,e.y)})
};var aj=function(by,bH){var bB={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bD=by.node,bz=by.attrs,bv=by.rotate(),br=function(bO,bN){bN=bB[bp.call(bN)];
if(bN){var bL=bO.attrs["stroke-width"]||"1",bJ={round:bL,square:bL,butt:0}[bO.attrs["stroke-linecap"]||bH["stroke-linecap"]]||0,bM=[];
var bK=bN[o];while(bK--){bM[bK]=bN[bK]*bL+((bK%2)?1:-1)*bJ}a3(bD,{"stroke-dasharray":bM[aO](",")})
}};bH[ac]("rotation")&&(bv=bH.rotation);var bu=(bv+aH)[G](a);if(!(bu.length-1)){bu=null
}else{bu[1]=+bu[1];bu[2]=+bu[2]}af(bv)&&by.rotate(0,true);for(var bC in bH){if(bH[ac](bC)){if(!l[ac](bC)){continue
}var bA=bH[bC];bz[bC]=bA;switch(bC){case"blur":by.blur(bA);break;case"rotation":by.rotate(bA,true);
break;case"href":case"title":case"target":var bF=bD.parentNode;if(bp.call(bF.tagName)!="a"){var S=a3("a");
bF.insertBefore(S,bD);S[a6](bD);bF=S}bF.setAttributeNS(by.paper.xlink,bC,bA);break;
case"cursor":bD.style.cursor=bA;break;case"clip-rect":var i=(bA+aH)[G](a);if(i[o]==4){by.clip&&by.clip.parentNode.parentNode.removeChild(by.clip.parentNode);
var E=a3("clipPath"),bE=a3("rect");E.id="r"+(aB._id++)[aQ](36);a3(bE,{x:i[0],y:i[1],width:i[2],height:i[3]});
E[a6](bE);by.paper.defs[a6](E);a3(bD,{"clip-path":"url(#"+E.id+")"});by.clip=bE}if(!bA){var bG=W.getElementById(bD.getAttribute("clip-path")[bc](/(^url\(#|\)$)/g,aH));
bG&&bG.parentNode.removeChild(bG);a3(bD,{"clip-path":aH});delete by.clip}break;case"path":if(by.type=="path"){a3(bD,{d:bA?bz.path=w(bA):"M0,0"})
}break;case"width":bD[B](bC,bA);if(bz.fx){bC="x";bA=bz.x}else{break}case"x":if(bz.fx){bA=-bz.x-(bz.width||0)
}case"rx":if(bC=="rx"&&by.type=="rect"){break}case"cx":bu&&(bC=="x"||bC=="cx")&&(bu[1]+=bA-bz[bC]);
bD[B](bC,Z(bA));by.pattern&&X(by);break;case"height":bD[B](bC,bA);if(bz.fy){bC="y";
bA=bz.y}else{break}case"y":if(bz.fy){bA=-bz.y-(bz.height||0)}case"ry":if(bC=="ry"&&by.type=="rect"){break
}case"cy":bu&&(bC=="y"||bC=="cy")&&(bu[2]+=bA-bz[bC]);bD[B](bC,Z(bA));by.pattern&&X(by);
break;case"r":if(by.type=="rect"){a3(bD,{rx:bA,ry:bA})}else{bD[B](bC,bA)}break;case"src":if(by.type=="image"){bD.setAttributeNS(by.paper.xlink,"href",bA)
}break;case"stroke-width":bD.style.strokeWidth=bA;bD[B](bC,bA);if(bz["stroke-dasharray"]){br(by,bz["stroke-dasharray"])
}break;case"stroke-dasharray":br(by,bA);break;case"translation":var bs=(bA+aH)[G](a);
bs[0]=+bs[0]||0;bs[1]=+bs[1]||0;if(bu){bu[1]+=bs[0];bu[2]+=bs[1]}y.call(by,bs[0],bs[1]);
break;case"scale":bs=(bA+aH)[G](a);by.scale(+bs[0]||1,+bs[1]||+bs[0]||1,isNaN(af(bs[2]))?null:+bs[2],isNaN(af(bs[3]))?null:+bs[3]);
break;case aT:var bq=(bA+aH).match(c);if(bq){E=a3("pattern");var bx=a3("image");E.id="r"+(aB._id++)[aQ](36);
a3(E,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});a3(bx,{x:0,y:0});bx.setAttributeNS(by.paper.xlink,"href",bq[1]);
E[a6](bx);var bI=W.createElement("img");bI.style.cssText="position:absolute;left:-9999em;top-9999em";
bI.onload=function(){a3(E,{width:this.offsetWidth,height:this.offsetHeight});a3(bx,{width:this.offsetWidth,height:this.offsetHeight});
W.body.removeChild(this);by.paper.safari()};W.body[a6](bI);bI.src=bq[1];by.paper.defs[a6](E);
bD.style.fill="url(#"+E.id+")";a3(bD,{fill:"url(#"+E.id+")"});by.pattern=E;by.pattern&&X(by);
break}var R=aB.getRGB(bA);if(!R.error){delete bH.gradient;delete bz.gradient;!aB.is(bz.opacity,"undefined")&&aB.is(bH.opacity,"undefined")&&a3(bD,{opacity:bz.opacity});
!aB.is(bz["fill-opacity"],"undefined")&&aB.is(bH["fill-opacity"],"undefined")&&a3(bD,{"fill-opacity":bz["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[ac](by.type)||(bA+aH).charAt()!="r")&&b(bD,bA,by.paper)){bz.gradient=bA;
bz.fill="none";break}}R[ac]("o")&&a3(bD,{"fill-opacity":R.o/100});case"stroke":R=aB.getRGB(bA);
bD[B](bC,R.hex);bC=="stroke"&&R[ac]("o")&&a3(bD,{"stroke-opacity":R.o/100});break;
case"gradient":(({circle:1,ellipse:1})[ac](by.type)||(bA+aH).charAt()!="r")&&b(bD,bA,by.paper);
break;case"opacity":case"fill-opacity":if(bz.gradient){var e=W.getElementById(bD.getAttribute(aT)[bc](/^url\(#|\)$/g,aH));
if(e){var bt=e.getElementsByTagName("stop");bt[bt[o]-1][B]("stop-opacity",bA)}break
}default:bC=="font-size"&&(bA=O(bA,10)+"px");var bw=bC[bc](/(\-.)/g,function(bJ){return a9.call(bJ.substring(1))
});bD.style[bw]=bA;bD[B](bC,bA);break}}}M(by,bH);if(bu){by.rotate(bu.join(aA))}else{af(bv)&&by.rotate(bv,true)
}};var k=1.2,M=function(e,S){if(e.type!="text"||!(S[ac]("text")||S[ac]("font")||S[ac]("font-size")||S[ac]("x")||S[ac]("y"))){return
}var bu=e.attrs,E=e.node,bw=E.firstChild?O(W.defaultView.getComputedStyle(E.firstChild,aH).getPropertyValue("font-size"),10):10;
if(S[ac]("text")){bu.text=S.text;while(E.firstChild){E.removeChild(E.firstChild)}var R=(S.text+aH)[G]("\n");
for(var bq=0,bv=R[o];bq<bv;bq++){if(R[bq]){var bs=a3("tspan");bq&&a3(bs,{dy:bw*k,x:bu.x});
bs[a6](W.createTextNode(R[bq]));E[a6](bs)}}}else{R=E.getElementsByTagName("tspan");
for(bq=0,bv=R[o];bq<bv;bq++){bq&&a3(R[bq],{dy:bw*k,x:bu.x})}}a3(E,{y:bu.y});var br=e.getBBox(),bt=bu.y-(br.y+br.height/2);
bt&&isFinite(bt)&&a3(E,{y:bu.y+bt})},aM=function(i,e){var R=0,E=0;this[0]=i;this.id=aB._oid++;
this.node=i;i.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aM[bn].rotate=function(i,e,R){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aO](aA)
}return this._.rt.deg}var E=this.getBBox();i=(i+aH)[G](a);if(i[o]-1){e=af(i[1]);R=af(i[2])
}i=af(i[0]);if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}(R==null)&&(e=null);
this._.rt.cx=e;this._.rt.cy=R;e=e==null?E.x+E.width/2:e;R=R==null?E.y+E.height/2:R;
if(this._.rt.deg){this.transformations[0]=aB.format("rotate({0} {1} {2})",this._.rt.deg,e,R);
this.clip&&a3(this.clip,{transform:aB.format("rotate({0} {1} {2})",-this._.rt.deg,e,R)})
}else{this.transformations[0]=aH;this.clip&&a3(this.clip,{transform:aH})}a3(this.node,{transform:this.transformations[aO](aA)});
return this};aM[bn].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aM[bn].show=function(){!this.removed&&(this.node.style.display="");return this
};aM[bn].remove=function(){if(this.removed){return}ax(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var e in this){delete this[e]}this.removed=true};aM[bn].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return ae(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var R=true}var bs={};try{bs=this.node.getBBox()}catch(bq){}finally{bs=bs||{}}if(this.type=="text"){bs={x:bs.x,y:Infinity,width:0,height:0};
for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var br=this.node.getExtentOfChar(E);
(br.y<bs.y)&&(bs.y=br.y);(br.y+br.height-bs.y>bs.height)&&(bs.height=br.y+br.height-bs.y);
(br.x+br.width-bs.x>bs.width)&&(bs.width=br.x+br.width-bs.x)}}R&&this.hide();return bs
};aM[bn].attr=function(R,bs){if(this.removed){return this}if(R==null){var bq={};for(var S in this.attrs){if(this.attrs[ac](S)){bq[S]=this.attrs[S]
}}this._.rt.deg&&(bq.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(bq.scale=this.scale());
bq.gradient&&bq.fill=="none"&&(bq.fill=bq.gradient)&&delete bq.gradient;return bq
}if(bs==null&&aB.is(R,ab)){if(R=="translation"){return y.call(this)}if(R=="rotation"){return this.rotate()
}if(R=="scale"){return this.scale()}if(R==aT&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[R]}if(bs==null&&aB.is(R,aW)){var e={};for(var E=0,br=R.length;
E<br;E++){e[R[E]]=this.attr(R[E])}return e}if(bs!=null){var bt={};bt[R]=bs;aj(this,bt)
}else{if(R!=null&&aB.is(R,"object")){aj(this,R)}}return this};aM[bn].toFront=function(){if(this.removed){return this
}this.node.parentNode[a6](this.node);var e=this.paper;e.top!=this&&ah(this,e);return this
};aM[bn].toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
m(this,this.paper);var e=this.paper}return this};aM[bn].insertAfter=function(e){if(this.removed){return this
}var i=e.node;if(i.nextSibling){i.parentNode.insertBefore(this.node,i.nextSibling)
}else{i.parentNode[a6](this.node)}H(this,e,this.paper);return this};aM[bn].insertBefore=function(e){if(this.removed){return this
}var i=e.node;i.parentNode.insertBefore(this.node,i);aE(this,e,this.paper);return this
};aM[bn].blur=function(i){var e=this;if(+i!==0){var E=a3("filter"),R=a3("feGaussianBlur");
e.attrs.blur=i;E.id="r"+(aB._id++)[aQ](36);a3(R,{stdDeviation:+i||1.5});E.appendChild(R);
e.paper.defs.appendChild(E);e._blur=E;a3(e.node,{filter:"url(#"+E.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var aa=function(i,e,bq,S){e=Z(e);
bq=Z(bq);var R=a3("circle");i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={cx:e,cy:bq,r:S,fill:"none",stroke:"#000"};
E.type="circle";a3(R,E.attrs);return E};var aZ=function(E,e,bs,i,bq,br){e=Z(e);bs=Z(bs);
var S=a3("rect");E.canvas&&E.canvas[a6](S);var R=new aM(S,E);R.attrs={x:e,y:bs,width:i,height:bq,r:br||0,rx:br||0,ry:br||0,fill:"none",stroke:"#000"};
R.type="rect";a3(S,R.attrs);return R};var at=function(i,e,br,bq,S){e=Z(e);br=Z(br);
var R=a3("ellipse");i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={cx:e,cy:br,rx:bq,ry:S,fill:"none",stroke:"#000"};
E.type="ellipse";a3(R,E.attrs);return E};var t=function(E,br,e,bs,i,bq){var S=a3("image");
a3(S,{x:e,y:bs,width:i,height:bq,preserveAspectRatio:"none"});S.setAttributeNS(E.xlink,"href",br);
E.canvas&&E.canvas[a6](S);var R=new aM(S,E);R.attrs={x:e,y:bs,width:i,height:bq,src:br};
R.type="image";return R};var ag=function(i,e,bq,S){var R=a3("text");a3(R,{x:e,y:bq,"text-anchor":"middle"});
i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={x:e,y:bq,"text-anchor":"middle",text:S,font:l.font,stroke:"none",fill:"#000"};
E.type="text";aj(E,E.attrs);return E};var bk=function(i,e){this.width=i||this.width;
this.height=e||this.height;this.canvas[B]("width",this.width);this.canvas[B]("height",this.height);
return this};var C=function(){var R=aC[bl](0,arguments),E=R&&R.container,i=R.x,br=R.y,S=R.width,e=R.height;
if(!E){throw new Error("SVG container not found.")}var bq=a3("svg");i=i||0;br=br||0;
S=S||512;e=e||342;a3(bq,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:S,height:e});
if(E==1){bq.style.cssText="position:absolute;left:"+i+"px;top:"+br+"px";W.body[a6](bq)
}else{if(E.firstChild){E.insertBefore(bq,E.firstChild)}else{E[a6](bq)}}E=new bi;E.width=S;
E.height=e;E.canvas=bq;a1.call(E,E,aB.fn);E.clear();return E};bi[bn].clear=function(){var e=this.canvas;
while(e.firstChild){e.removeChild(e.firstChild)}this.bottom=this.top=null;(this.desc=a3("desc"))[a6](W.createTextNode("Created with Rapha\xebl"));
e[a6](this.desc);e[a6](this.defs=a3("defs"))};bi[bn].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=x(e)}}}if(aB.vml){var K={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},aF=/([clmz]),?([^clmz]*)/gi,bo=/-?[^,\s-]+/g,aP=1000+aA+1000,s=10,p={path:1,rect:1},a2=function(bw){var bt=/[ahqstv]/ig,R=w;
(bw+aH).match(bt)&&(R=P);bt=/[clmz]/g;if(R==w&&!(bw+aH).match(bt)){var bs=(bw+aH)[bc](aF,function(bz,bB,bx){var bA=[],i=bp.call(bB)=="m",by=K[bB];
bx[bc](bo,function(bC){if(i&&bA[o]==2){by+=bA+K[bB=="m"?"l":"L"];bA=[]}bA[f](Z(bC*s))
});return by+bA});return bs}var bu=R(bw),E,e;bs=[];for(var bq=0,bv=bu[o];bq<bv;bq++){E=bu[bq];
e=bp.call(bu[bq][0]);e=="z"&&(e="x");for(var S=1,br=E[o];S<br;S++){e+=Z(E[S]*s)+(S!=br-1?",":aH)
}bs[f](e)}return bs[aO](aA)};aB[aQ]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};v=function(E,i){var bq=ar("group");bq.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
bq.coordsize=i.coordsize;bq.coordorigin=i.coordorigin;var S=ar("shape"),R=S.style;
R.width=i.width+"px";R.height=i.height+"px";S.coordsize=aP;S.coordorigin=i.coordorigin;
bq[a6](S);var br=new aM(S,bq,i),e={fill:"none",stroke:"#000"};E&&(e.path=E);br.isAbsolute=true;
br.type="path";br.path=[];br.Path=aH;aj(br,e);i.canvas[a6](bq);return br};aj=function(bu,bB){bu.attrs=bu.attrs||{};
var by=bu.node,bC=bu.attrs,br=by.style,R,bA=(bB.x!=bC.x||bB.y!=bC.y||bB.width!=bC.width||bB.height!=bC.height||bB.r!=bC.r)&&bu.type=="rect",bG=bu;
for(var bs in bB){if(bB[ac](bs)){bC[bs]=bB[bs]}}if(bA){bC.path=am(bC.x,bC.y,bC.width,bC.height,bC.r);
bu.X=bC.x;bu.Y=bC.y;bu.W=bC.width;bu.H=bC.height}bB.href&&(by.href=bB.href);bB.title&&(by.title=bB.title);
bB.target&&(by.target=bB.target);bB.cursor&&(br.cursor=bB.cursor);"blur" in bB&&bu.blur(bB.blur);
if(bB.path&&bu.type=="path"||bA){by.path=a2(bC.path)}if(bB.rotation!=null){bu.rotate(bB.rotation,true)
}if(bB.translation){R=(bB.translation+aH)[G](a);y.call(bu,R[0],R[1]);if(bu._.rt.cx!=null){bu._.rt.cx+=+R[0];
bu._.rt.cy+=+R[1];bu.setBox(bu.attrs,R[0],R[1])}}if(bB.scale){R=(bB.scale+aH)[G](a);
bu.scale(+R[0]||1,+R[1]||+R[0]||1,+R[2]||null,+R[3]||null)}if("clip-rect" in bB){var e=(bB["clip-rect"]+aH)[G](a);
if(e[o]==4){e[2]=+e[2]+(+e[0]);e[3]=+e[3]+(+e[1]);var bt=by.clipRect||W.createElement("div"),bF=bt.style,bq=by.parentNode;
bF.clip=aB.format("rect({1}px {2}px {3}px {0}px)",e);if(!by.clipRect){bF.position="absolute";
bF.top=0;bF.left=0;bF.width=bu.paper.width+"px";bF.height=bu.paper.height+"px";bq.parentNode.insertBefore(bt,bq);
bt[a6](bq);by.clipRect=bt}}if(!bB["clip-rect"]){by.clipRect&&(by.clipRect.style.clip=aH)
}}if(bu.type=="image"&&bB.src){by.src=bB.src}if(bu.type=="image"&&bB.opacity){by.filterOpacity=aU+".Alpha(opacity="+(bB.opacity*100)+")";
br.filter=(by.filterMatrix||aH)+(by.filterOpacity||aH)}bB.font&&(br.font=bB.font);
bB["font-family"]&&(br.fontFamily='"'+bB["font-family"][G](",")[0][bc](/^['"]+|['"]+$/g,aH)+'"');
bB["font-size"]&&(br.fontSize=bB["font-size"]);bB["font-weight"]&&(br.fontWeight=bB["font-weight"]);
bB["font-style"]&&(br.fontStyle=bB["font-style"]);if(bB.opacity!=null||bB["stroke-width"]!=null||bB.fill!=null||bB.stroke!=null||bB["stroke-width"]!=null||bB["stroke-opacity"]!=null||bB["fill-opacity"]!=null||bB["stroke-dasharray"]!=null||bB["stroke-miterlimit"]!=null||bB["stroke-linejoin"]!=null||bB["stroke-linecap"]!=null){by=bu.shape||by;
var bz=(by.getElementsByTagName(aT)&&by.getElementsByTagName(aT)[0]),bD=false;!bz&&(bD=bz=ar(aT));
if("fill-opacity" in bB||"opacity" in bB){var i=((+bC["fill-opacity"]+1||2)-1)*((+bC.opacity+1||2)-1)*((+aB.getRGB(bB.fill).o+1||2)-1);
i<0&&(i=0);i>1&&(i=1);bz.opacity=i}bB.fill&&(bz.on=true);if(bz.on==null||bB.fill=="none"){bz.on=false
}if(bz.on&&bB.fill){var E=bB.fill.match(c);if(E){bz.src=E[1];bz.type="tile"}else{bz.color=aB.getRGB(bB.fill).hex;
bz.src=aH;bz.type="solid";if(aB.getRGB(bB.fill).error&&(bG.type in {circle:1,ellipse:1}||(bB.fill+aH).charAt()!="r")&&b(bG,bB.fill)){bC.fill="none";
bC.gradient=bB.fill}}}bD&&by[a6](bz);var S=(by.getElementsByTagName("stroke")&&by.getElementsByTagName("stroke")[0]),bE=false;
!S&&(bE=S=ar("stroke"));if((bB.stroke&&bB.stroke!="none")||bB["stroke-width"]||bB["stroke-opacity"]!=null||bB["stroke-dasharray"]||bB["stroke-miterlimit"]||bB["stroke-linejoin"]||bB["stroke-linecap"]){S.on=true
}(bB.stroke=="none"||S.on==null||bB.stroke==0||bB["stroke-width"]==0)&&(S.on=false);
var bx=aB.getRGB(bB.stroke);S.on&&bB.stroke&&(S.color=bx.hex);i=((+bC["stroke-opacity"]+1||2)-1)*((+bC.opacity+1||2)-1)*((+bx.o+1||2)-1);
var bv=(af(bB["stroke-width"])||1)*0.75;i<0&&(i=0);i>1&&(i=1);bB["stroke-width"]==null&&(bv=bC["stroke-width"]);
bB["stroke-width"]&&(S.weight=bv);bv&&bv<1&&(i*=bv)&&(S.weight=1);S.opacity=i;bB["stroke-linejoin"]&&(S.joinstyle=bB["stroke-linejoin"]||"miter");
S.miterlimit=bB["stroke-miterlimit"]||8;bB["stroke-linecap"]&&(S.endcap=bB["stroke-linecap"]=="butt"?"flat":bB["stroke-linecap"]=="square"?"square":"round");
if(bB["stroke-dasharray"]){var bw={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
S.dashstyle=bw[ac](bB["stroke-dasharray"])?bw[bB["stroke-dasharray"]]:aH}bE&&by[a6](S)
}if(bG.type=="text"){br=bG.paper.span.style;bC.font&&(br.font=bC.font);bC["font-family"]&&(br.fontFamily=bC["font-family"]);
bC["font-size"]&&(br.fontSize=bC["font-size"]);bC["font-weight"]&&(br.fontWeight=bC["font-weight"]);
bC["font-style"]&&(br.fontStyle=bC["font-style"]);bG.node.string&&(bG.paper.span.innerHTML=(bG.node.string+aH)[bc](/</g,"&#60;")[bc](/&/g,"&#38;")[bc](/\n/g,"<br>"));
bG.W=bC.w=bG.paper.span.offsetWidth;bG.H=bC.h=bG.paper.span.offsetHeight;bG.X=bC.x;
bG.Y=bC.y+Z(bG.H/2);switch(bC["text-anchor"]){case"start":bG.node.style["v-text-align"]="left";
bG.bbx=Z(bG.W/2);break;case"end":bG.node.style["v-text-align"]="right";bG.bbx=-Z(bG.W/2);
break;default:bG.node.style["v-text-align"]="center";break}}};b=function(e,bs){e.attrs=e.attrs||{};
var bt=e.attrs,bv,bq="linear",br=".5 .5";e.attrs.gradient=bs;bs=(bs+aH)[bc](aG,function(bx,by,i){bq="radial";
if(by&&i){by=af(by);i=af(i);a7(by-0.5,2)+a7(i-0.5,2)>0.25&&(i=ak.sqrt(0.25-a7(by-0.5,2))*((i>0.5)*2-1)+0.5);
br=by+aA+i}return aH});bs=bs[G](/\s*\-\s*/);if(bq=="linear"){var E=bs.shift();E=-af(E);
if(isNaN(E)){return null}}var S=u(bs);if(!S){return null}e=e.shape||e.node;bv=e.getElementsByTagName(aT)[0]||ar(aT);
!bv.parentNode&&e.appendChild(bv);if(S[o]){bv.on=true;bv.method="none";bv.color=S[0].color;
bv.color2=S[S[o]-1].color;var bw=[];for(var R=0,bu=S[o];R<bu;R++){S[R].offset&&bw[f](S[R].offset+aA+S[R].color)
}bv.colors&&(bv.colors.value=bw[o]?bw[aO]():"0% "+bv.color);if(bq=="radial"){bv.type="gradientradial";
bv.focus="100%";bv.focussize=br;bv.focusposition=br}else{bv.type="gradient";bv.angle=(270-E)%360
}}return 1};aM=function(S,br,e){var bq=0,E=0,i=0,R=1;this[0]=S;this.id=aB._oid++;
this.node=S;S.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=br;this.paper=e;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aM[bn].rotate=function(i,e,E){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aO](aA)
}return this._.rt.deg}i=(i+aH)[G](a);if(i[o]-1){e=af(i[1]);E=af(i[2])}i=af(i[0]);
if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}E==null&&(e=null);this._.rt.cx=e;
this._.rt.cy=E;this.setBox(this.attrs,e,E);this.Group.style.rotation=this._.rt.deg;
return this};aM[bn].setBox=function(S,bq,R){if(this.removed){return this}var e=this.Group.style,br=(this.shape&&this.shape.style)||this.node.style;
S=S||{};for(var bs in S){if(S[ac](bs)){this.attrs[bs]=S[bs]}}bq=bq||this._.rt.cx;
R=R||this._.rt.cy;var bv=this.attrs,by,bx,bz,bu;switch(this.type){case"circle":by=bv.cx-bv.r;
bx=bv.cy-bv.r;bz=bu=bv.r*2;break;case"ellipse":by=bv.cx-bv.rx;bx=bv.cy-bv.ry;bz=bv.rx*2;
bu=bv.ry*2;break;case"image":by=+bv.x;bx=+bv.y;bz=bv.width||0;bu=bv.height||0;break;
case"text":this.textpath.v=["m",Z(bv.x),", ",Z(bv.y-2),"l",Z(bv.x)+1,", ",Z(bv.y-2)][aO](aH);
by=bv.x-Z(this.W/2);bx=bv.y-this.H/2;bz=this.W;bu=this.H;break;case"rect":case"path":if(!this.attrs.path){by=0;
bx=0;bz=this.paper.width;bu=this.paper.height}else{var bt=ae(this.attrs.path);by=bt.x;
bx=bt.y;bz=bt.width;bu=bt.height}break;default:by=0;bx=0;bz=this.paper.width;bu=this.paper.height;
break}bq=(bq==null)?by+bz/2:bq;R=(R==null)?bx+bu/2:R;var E=bq-this.paper.width/2,bw=R-this.paper.height/2,bA;
e.left!=(bA=E+"px")&&(e.left=bA);e.top!=(bA=bw+"px")&&(e.top=bA);this.X=p[ac](this.type)?-E:by;
this.Y=p[ac](this.type)?-bw:bx;this.W=bz;this.H=bu;if(p[ac](this.type)){br.left!=(bA=-E*s+"px")&&(br.left=bA);
br.top!=(bA=-bw*s+"px")&&(br.top=bA)}else{if(this.type=="text"){br.left!=(bA=-E+"px")&&(br.left=bA);
br.top!=(bA=-bw+"px")&&(br.top=bA)}else{e.width!=(bA=this.paper.width+"px")&&(e.width=bA);
e.height!=(bA=this.paper.height+"px")&&(e.height=bA);br.left!=(bA=by-E+"px")&&(br.left=bA);
br.top!=(bA=bx-bw+"px")&&(br.top=bA);br.width!=(bA=bz+"px")&&(br.width=bA);br.height!=(bA=bu+"px")&&(br.height=bA)
}}};aM[bn].hide=function(){!this.removed&&(this.Group.style.display="none");return this
};aM[bn].show=function(){!this.removed&&(this.Group.style.display="block");return this
};aM[bn].getBBox=function(){if(this.removed){return this}if(p[ac](this.type)){return ae(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};aM[bn].remove=function(){if(this.removed){return
}ax(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e]
}this.removed=true};aM[bn].attr=function(E,br){if(this.removed){return this}if(E==null){var S={};
for(var R in this.attrs){if(this.attrs[ac](R)){S[R]=this.attrs[R]}}this._.rt.deg&&(S.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(S.scale=this.scale());S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;
return S}if(br==null&&aB.is(E,ab)){if(E=="translation"){return y.call(this)}if(E=="rotation"){return this.rotate()
}if(E=="scale"){return this.scale()}if(E==aT&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[E]}if(this.attrs&&br==null&&aB.is(E,aW)){var bq,e={};for(R=0,bq=E[o];
R<bq;R++){e[E[R]]=this.attr(E[R])}return e}var bs;if(br!=null){bs={};bs[E]=br}br==null&&aB.is(E,"object")&&(bs=E);
if(bs){if(bs.text&&this.type=="text"){this.node.string=bs.text}aj(this,bs);if(bs.gradient&&(({circle:1,ellipse:1})[ac](this.type)||(bs.gradient+aH).charAt()!="r")){b(this,bs.gradient)
}(!p[ac](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};aM[bn].toFront=function(){!this.removed&&this.Group.parentNode[a6](this.Group);
this.paper.top!=this&&ah(this,this.paper);return this};aM[bn].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
m(this,this.paper)}return this};aM[bn].insertAfter=function(e){if(this.removed){return this
}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling)
}else{e.Group.parentNode[a6](this.Group)}H(this,e,this.paper);return this};aM[bn].insertBefore=function(e){if(this.removed){return this
}e.Group.parentNode.insertBefore(this.Group,e.Group);aE(this,e,this.paper);return this
};var bh=/ progid:\S+Blur\([^\)]+\)/g;aM[bn].blur=function(e){var i=this.node.style,E=i.filter;
E=E.replace(bh,"");if(+e!==0){this.attrs.blur=e;i.filter=E+aU+".Blur(pixelradius="+(+e||1.5)+")";
i.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+e||1.5))}else{i.filter=E;
i.margin=0;delete this.attrs.blur}};aa=function(i,e,bs,bq){var S=ar("group"),br=ar("oval"),E=br.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;S[a6](br);var R=new aM(br,S,i);R.type="circle";
aj(R,{stroke:"#000",fill:"none"});R.attrs.cx=e;R.attrs.cy=bs;R.attrs.r=bq;R.setBox({x:e-bq,y:bs-bq,width:bq*2,height:bq*2});
i.canvas[a6](S);return R};function am(e,S,i,E,R){if(R){return aB.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",e+R,S,i-R*2,R,-R,E-R*2,R*2-i,R*2-E)
}else{return aB.format("M{0},{1}l{2},0,0,{3},{4},0z",e,S,i,E,-i)}}aZ=function(i,br,S,bs,E,e){var bt=am(br,S,bs,E,e),R=i.path(bt),bq=R.attrs;
R.X=bq.x=br;R.Y=bq.y=S;R.W=bq.width=bs;R.H=bq.height=E;bq.r=e;bq.path=bt;R.type="rect";
return R};at=function(e,bt,bs,E,i){var S=ar("group"),R=ar("oval"),br=R.style;S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
S.coordsize=aP;S.coordorigin=e.coordorigin;S[a6](R);var bq=new aM(R,S,e);bq.type="ellipse";
aj(bq,{stroke:"#000"});bq.attrs.cx=bt;bq.attrs.cy=bs;bq.attrs.rx=E;bq.attrs.ry=i;
bq.setBox({x:bt-E,y:bs-i,width:E*2,height:i*2});e.canvas[a6](S);return bq};t=function(i,e,bt,bs,bu,R){var S=ar("group"),E=ar("image"),br=E.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;E.src=e;S[a6](E);var bq=new aM(E,S,i);
bq.type="image";bq.attrs.src=e;bq.attrs.x=bt;bq.attrs.y=bs;bq.attrs.w=bu;bq.attrs.h=R;
bq.setBox({x:bt,y:bs,width:bu,height:R});i.canvas[a6](S);return bq};ag=function(i,bt,bs,bu){var S=ar("group"),R=ar("shape"),br=R.style,bv=ar("path"),e=bv.style,E=ar("textpath");
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;bv.v=aB.format("m{0},{1}l{2},{1}",Z(bt*10),Z(bs*10),Z(bt*10)+1);
bv.textpathok=true;br.width=i.width;br.height=i.height;E.string=bu+aH;E.on=true;R[a6](E);
R[a6](bv);S[a6](R);var bq=new aM(E,S,i);bq.shape=R;bq.textpath=bv;bq.type="text";
bq.attrs.text=bu;bq.attrs.x=bt;bq.attrs.y=bs;bq.attrs.w=1;bq.attrs.h=1;aj(bq,{font:l.font,stroke:"none",fill:"#000"});
bq.setBox();i.canvas[a6](S);return bq};bk=function(E,e){var i=this.canvas.style;E==+E&&(E+="px");
e==+e&&(e+="px");i.width=E;i.height=e;i.clip="rect(0 "+E+" "+e+" 0)";return this};
var ar;W.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!W.namespaces.rvml&&W.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
ar=function(e){return W.createElement("<rvml:"+e+' class="rvml">')}}catch(ap){ar=function(e){return W.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}C=function(){var E=aC[bl](0,arguments),e=E.container,bt=E.height,bu,i=E.width,bs=E.x,br=E.y;
if(!e){throw new Error("VML container not found.")}var S=new bi,bq=S.canvas=W.createElement("div"),R=bq.style;
bs=bs||0;br=br||0;i=i||512;bt=bt||342;i==+i&&(i+="px");bt==+bt&&(bt+="px");S.width=1000;
S.height=1000;S.coordsize=s*1000+aA+s*1000;S.coordorigin="0 0";S.span=W.createElement("span");
S.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
bq[a6](S.span);R.cssText=aB.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",i,bt);
if(e==1){W.body[a6](bq);R.left=bs+"px";R.top=br+"px";R.position="absolute"}else{if(e.firstChild){e.insertBefore(bq,e.firstChild)
}else{e[a6](bq)}}a1.call(S,S,aB.fn);return S};bi[bn].clear=function(){this.canvas.innerHTML=aH;
this.span=W.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[a6](this.span);this.bottom=this.top=null};bi[bn].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=x(e)}return true}}if((/^Apple|^Google/).test(aI.navigator.vendor)&&(!(aI.navigator.userAgent.indexOf("Version/4.0")+1)||aI.navigator.platform.slice(0,2)=="iP")){bi[bn].safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);
aI.setTimeout(function(){e.remove()})}}else{bi[bn].safari=function(){}}var L=function(){this.returnValue=false
},bf=function(){return this.originalEvent.preventDefault()},aS=function(){this.cancelBubble=true
},aw=function(){return this.originalEvent.stopPropagation()},ao=(function(){if(W.addEventListener){return function(bq,R,E,i){var e=Q&&bb[R]?bb[R]:R;
var S=function(bu){if(Q&&bb[ac](R)){for(var bs=0,bt=bu.targetTouches&&bu.targetTouches.length;
bs<bt;bs++){if(bu.targetTouches[bs].target==bq){var br=bu;bu=bu.targetTouches[bs];
bu.originalEvent=br;bu.preventDefault=bf;bu.stopPropagation=aw;break}}}return E.call(i,bu)
};bq.addEventListener(e,S,false);return function(){bq.removeEventListener(e,S,false);
return true}}}else{if(W.attachEvent){return function(bq,R,E,i){var S=function(br){br=br||aI.event;
br.preventDefault=br.preventDefault||L;br.stopPropagation=br.stopPropagation||aS;
return E.call(i,br)};bq.attachEvent("on"+R,S);var e=function(){bq.detachEvent("on"+R,S);
return true};return e}}}})();for(var al=N[o];al--;){(function(e){aB[e]=aM[bn][e]=function(i){if(aB.is(i,"function")){this.events=this.events||[];
this.events.push({name:e,f:i,unbind:ao(this.shape||this.node||W,e,i,this)})}return this
};aB["un"+e]=aM[bn]["un"+e]=function(R){var E=this.events,i=E[o];while(i--){if(E[i].name==e&&E[i].f==R){E[i].unbind();
E.splice(i,1);!E.length&&delete this.events;return this}}return this}})(N[al])}aM[bn].hover=function(i,e){return this.mouseover(i).mouseout(e)
};aM[bn].unhover=function(i,e){return this.unmouseover(i).unmouseout(e)};aM[bn].drag=function(E,bq,S){this._drag={};
var R=this.mousedown(function(br){(br.originalEvent?br.originalEvent:br).preventDefault();
this._drag.x=br.clientX;this._drag.y=br.clientY;this._drag.id=br.identifier;bq&&bq.call(this,br.clientX,br.clientY);
Raphael.mousemove(i).mouseup(e)}),i=function(bt){var br=bt.clientX,bv=bt.clientY;
if(Q){var bs=bt.touches.length,bu;while(bs--){bu=bt.touches[bs];if(bu.identifier==R._drag.id){br=bu.clientX;
bv=bu.clientY;(bt.originalEvent?bt.originalEvent:bt).preventDefault();break}}}else{bt.preventDefault()
}E&&E.call(R,br-R._drag.x,bv-R._drag.y,br,bv)},e=function(){R._drag={};Raphael.unmousemove(i).unmouseup(e);
S&&S.call(R)};return this};bi[bn].circle=function(e,E,i){return aa(this,e||0,E||0,i||0)
};bi[bn].rect=function(e,S,i,E,R){return aZ(this,e||0,S||0,i||0,E||0,R||0)};bi[bn].ellipse=function(e,R,E,i){return at(this,e||0,R||0,E||0,i||0)
};bi[bn].path=function(e){e&&!aB.is(e,ab)&&!aB.is(e[0],aW)&&(e+=aH);return v(aB.format[bl](aB,arguments),this)
};bi[bn].image=function(R,e,S,i,E){return t(this,R||"about:blank",e||0,S||0,i||0,E||0)
};bi[bn].text=function(e,E,i){return ag(this,e||0,E||0,i||aH)};bi[bn].set=function(e){arguments[o]>1&&(e=Array[bn].splice.call(arguments,0,arguments[o]));
return new ad(e)};bi[bn].setSize=bk;bi[bn].top=bi[bn].bottom=null;bi[bn].raphael=aB;
function A(){return this.x+aA+this.y}aM[bn].resetScale=function(){if(this.removed){return this
}this._.sx=1;this._.sy=1;this.attrs.scale="1 1"};aM[bn].scale=function(bx,bw,R,E){if(this.removed){return this
}if(bx==null&&bw==null){return{x:this._.sx,y:this._.sy,toString:A}}bw=bw||bx;!+bw&&(bw=bx);
var bB,bz,bA,by,bN=this.attrs;if(bx!=0){var bv=this.getBBox(),bs=bv.x+bv.width/2,S=bv.y+bv.height/2,bM=bx/this._.sx,bL=bw/this._.sy;
R=(+R||R==0)?R:bs;E=(+E||E==0)?E:S;var bu=~~(bx/ak.abs(bx)),br=~~(bw/ak.abs(bw)),bE=this.node.style,bP=R+(bs-R)*bM,bO=E+(S-E)*bL;
switch(this.type){case"rect":case"image":var bt=bN.width*bu*bM,bD=bN.height*br*bL;
this.attr({height:bD,r:bN.r*a4(bu*bM,br*bL),width:bt,x:bP-bt/2,y:bO-bD/2});break;
case"circle":case"ellipse":this.attr({rx:bN.rx*bu*bM,ry:bN.ry*br*bL,r:bN.r*a4(bu*bM,br*bL),cx:bP,cy:bO});
break;case"text":this.attr({x:bP,y:bO});break;case"path":var bG=an(bN.path),bH=true;
for(var bJ=0,bC=bG[o];bJ<bC;bJ++){var bF=bG[bJ],bq=a9.call(bF[0]);if(bq=="M"&&bH){continue
}else{bH=false}if(bq=="A"){bF[bG[bJ][o]-2]*=bM;bF[bG[bJ][o]-1]*=bL;bF[1]*=bu*bM;bF[2]*=br*bL;
bF[5]=+!(bu+br?!+bF[5]:+bF[5])}else{if(bq=="H"){for(var bI=1,bK=bF[o];bI<bK;bI++){bF[bI]*=bM
}}else{if(bq=="V"){for(bI=1,bK=bF[o];bI<bK;bI++){bF[bI]*=bL}}else{for(bI=1,bK=bF[o];
bI<bK;bI++){bF[bI]*=(bI%2)?bM:bL}}}}}var e=ae(bG);bB=bP-e.x-e.width/2;bz=bO-e.y-e.height/2;
bG[0][1]+=bB;bG[0][2]+=bz;this.attr({path:bG});break}if(this.type in {text:1,image:1}&&(bu!=1||br!=1)){if(this.transformations){this.transformations[2]="scale("[bg](bu,",",br,")");
this.node[B]("transform",this.transformations[aO](aA));bB=(bu==-1)?-bN.x-(bt||0):bN.x;
bz=(br==-1)?-bN.y-(bD||0):bN.y;this.attr({x:bB,y:bz});bN.fx=bu-1;bN.fy=br-1}else{this.node.filterMatrix=aU+".Matrix(M11="[bg](bu,", M12=0, M21=0, M22=",br,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
bE.filter=(this.node.filterMatrix||aH)+(this.node.filterOpacity||aH)}}else{if(this.transformations){this.transformations[2]=aH;
this.node[B]("transform",this.transformations[aO](aA));bN.fx=0;bN.fy=0}else{this.node.filterMatrix=aH;
bE.filter=(this.node.filterMatrix||aH)+(this.node.filterOpacity||aH)}}bN.scale=[bx,bw,R,E][aO](aA);
this._.sx=bx;this._.sy=bw}return this};aM[bn].clone=function(){if(this.removed){return null
}var e=this.attr();delete e.scale;delete e.translation;return this.paper[this.type]().attr(e)
};var g=au(function(R,e,bs,br,by,bx,bw,bv,S){var bu=0,bq;for(var bt=0;bt<1.001;bt+=0.001){var E=aB.findDotsAtSegment(R,e,bs,br,by,bx,bw,bv,bt);
bt&&(bu+=a7(a7(bq.x-E.x,2)+a7(bq.y-E.y,2),0.5));if(bu>=S){return E}bq=E}}),aR=function(e,i){return function(bz,S,bq){bz=P(bz);
var bv,bu,E,br,R="",by={},bw,bt=0;for(var bs=0,bx=bz.length;bs<bx;bs++){E=bz[bs];
if(E[0]=="M"){bv=+E[1];bu=+E[2]}else{br=q(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6]);if(bt+br>S){if(i&&!by.start){bw=g(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],S-bt);
R+=["C",bw.start.x,bw.start.y,bw.m.x,bw.m.y,bw.x,bw.y];if(bq){return R}by.start=R;
R=["M",bw.x,bw.y+"C",bw.n.x,bw.n.y,bw.end.x,bw.end.y,E[5],E[6]][aO]();bt+=br;bv=+E[5];
bu=+E[6];continue}if(!e&&!i){bw=g(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],S-bt);return{x:bw.x,y:bw.y,alpha:bw.alpha}
}}bt+=br;bv=+E[5];bu=+E[6]}R+=E}by.end=R;bw=e?bt:i?by:aB.findDotsAtSegment(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],1);
bw.alpha&&(bw={x:bw.x,y:bw.y,alpha:bw.alpha});return bw}},q=au(function(R,e,br,bq,bx,bw,bv,bu){var S={x:0,y:0},bt=0;
for(var bs=0;bs<1.01;bs+=0.01){var E=Y(R,e,br,bq,bx,bw,bv,bu,bs);bs&&(bt+=a7(a7(S.x-E.x,2)+a7(S.y-E.y,2),0.5));
S=E}return bt});var aD=aR(1),J=aR(),U=aR(0,1);aM[bn].getTotalLength=function(){if(this.type!="path"){return
}if(this.node.getTotalLength){return this.node.getTotalLength()}return aD(this.attrs.path)
};aM[bn].getPointAtLength=function(e){if(this.type!="path"){return}return J(this.attrs.path,e)
};aM[bn].getSubpath=function(E,i){if(this.type!="path"){return}if(ak.abs(this.getTotalLength()-i)<0.000001){return U(this.attrs.path,E).end
}var e=U(this.attrs.path,i,1);return E?U(e,E).end:e};aB.easing_formulas={linear:function(e){return e
},"<":function(e){return a7(e,3)},">":function(e){return a7(e-1,3)+1},"<>":function(e){e=e*2;
if(e<1){return a7(e,3)/2}e-=2;return(a7(e,3)+2)/2},backIn:function(i){var e=1.70158;
return i*i*((e+1)*i-e)},backOut:function(i){i=i-1;var e=1.70158;return i*i*((e+1)*i+e)+1
},elastic:function(E){if(E==0||E==1){return E}var i=0.3,e=i/4;return a7(2,-10*E)*ak.sin((E-e)*(2*ak.PI)/i)+1
},bounce:function(R){var i=7.5625,E=2.75,e;if(R<(1/E)){e=i*R*R}else{if(R<(2/E)){R-=(1.5/E);
e=i*R*R+0.75}else{if(R<(2.5/E)){R-=(2.25/E);e=i*R*R+0.9375}else{R-=(2.625/E);e=i*R*R+0.984375
}}}return e}};var T={length:0},be=function(){var bt=+new Date;for(var bF in T){if(bF!="length"&&T[ac](bF)){var bK=T[bF];
if(bK.stop||bK.el.removed){delete T[bF];T[o]--;continue}var br=bt-bK.start,bC=bK.ms,bB=bK.easing,bG=bK.from,by=bK.diff,R=bK.to,bx=bK.t,bA=bK.prev||0,bs=bK.el,S=bK.callback,bz={},E;
if(br<bC){var bq=aB.easing_formulas[bB]?aB.easing_formulas[bB](br/bC):br/bC;for(var bD in bG){if(bG[ac](bD)){switch(ai[bD]){case"along":E=bq*bC*by[bD];
R.back&&(E=R.len-E);var bE=J(R[bD],E);bs.translate(by.sx-by.x||0,by.sy-by.y||0);by.x=bE.x;
by.y=bE.y;bs.translate(bE.x-by.sx,bE.y-by.sy);R.rot&&bs.rotate(by.r+bE.alpha,bE.x,bE.y);
break;case ay:E=+bG[bD]+bq*bC*by[bD];break;case"colour":E="rgb("+[I(Z(bG[bD].r+bq*bC*by[bD].r)),I(Z(bG[bD].g+bq*bC*by[bD].g)),I(Z(bG[bD].b+bq*bC*by[bD].b))][aO](",")+")";
break;case"path":E=[];for(var bI=0,bw=bG[bD][o];bI<bw;bI++){E[bI]=[bG[bD][bI][0]];
for(var bH=1,bJ=bG[bD][bI][o];bH<bJ;bH++){E[bI][bH]=+bG[bD][bI][bH]+bq*bC*by[bD][bI][bH]
}E[bI]=E[bI][aO](aA)}E=E[aO](aA);break;case"csv":switch(bD){case"translation":var bv=by[bD][0]*(br-bA),bu=by[bD][1]*(br-bA);
bx.x+=bv;bx.y+=bu;E=bv+aA+bu;break;case"rotation":E=+bG[bD][0]+bq*bC*by[bD][0];bG[bD][1]&&(E+=","+bG[bD][1]+","+bG[bD][2]);
break;case"scale":E=[+bG[bD][0]+bq*bC*by[bD][0],+bG[bD][1]+bq*bC*by[bD][1],(2 in R[bD]?R[bD][2]:aH),(3 in R[bD]?R[bD][3]:aH)][aO](aA);
break;case"clip-rect":E=[];bI=4;while(bI--){E[bI]=+bG[bD][bI]+bq*bC*by[bD][bI]}break
}break}bz[bD]=E}}bs.attr(bz);bs._run&&bs._run.call(bs)}else{if(R.along){bE=J(R.along,R.len*!R.back);
bs.translate(by.sx-(by.x||0)+bE.x-by.sx,by.sy-(by.y||0)+bE.y-by.sy);R.rot&&bs.rotate(by.r+bE.alpha,bE.x,bE.y)
}(bx.x||bx.y)&&bs.translate(-bx.x,-bx.y);R.scale&&(R.scale+=aH);bs.attr(R);delete T[bF];
T[o]--;bs.in_animation=null;aB.is(S,"function")&&S.call(bs)}bK.prev=br}}aB.svg&&bs&&bs.paper&&bs.paper.safari();
T[o]&&aI.setTimeout(be)},I=function(e){return h(a4(e,255),0)},y=function(e,E){if(e==null){return{x:this._.tx,y:this._.ty,toString:A}
}this._.tx+=+e;this._.ty+=+E;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+E+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+E+this.attrs.y});
break;case"path":var i=an(this.attrs.path);i[0][1]+=+e;i[0][2]+=+E;this.attr({path:i});
break}return this};aM[bn].animateWith=function(i,E,e,S,R){T[i.id]&&(E.start=T[i.id].start);
return this.animate(E,e,S,R)};aM[bn].animateAlong=aN();aM[bn].animateAlongBack=aN(1);
function aN(e){return function(R,E,i,bq){var S={back:e};aB.is(i,"function")?(bq=i):(S.rot=i);
R&&R.constructor==aM&&(R=R.attrs.path);R&&(S.along=R);return this.animate(S,E,bq)
}}aM[bn].onAnimation=function(e){this._run=e||0;return this};aM[bn].animate=function(bF,bw,bv,R){if(aB.is(bv,"function")||!bv){R=bv||null
}var bA={},E={},bt={};for(var bx in bF){if(bF[ac](bx)){if(ai[ac](bx)){bA[bx]=this.attr(bx);
(bA[bx]==null)&&(bA[bx]=l[bx]);E[bx]=bF[bx];switch(ai[bx]){case"along":var bD=aD(bF[bx]),by=J(bF[bx],bD*!!bF.back),S=this.getBBox();
bt[bx]=bD/bw;bt.tx=S.x;bt.ty=S.y;bt.sx=by.x;bt.sy=by.y;E.rot=bF.rot;E.back=bF.back;
E.len=bD;bF.rot&&(bt.r=af(this.rotate())||0);break;case ay:bt[bx]=(E[bx]-bA[bx])/bw;
break;case"colour":bA[bx]=aB.getRGB(bA[bx]);var bz=aB.getRGB(E[bx]);bt[bx]={r:(bz.r-bA[bx].r)/bw,g:(bz.g-bA[bx].g)/bw,b:(bz.b-bA[bx].b)/bw};
break;case"path":var bq=P(bA[bx],E[bx]);bA[bx]=bq[0];var bu=bq[1];bt[bx]=[];for(var bC=0,bs=bA[bx][o];
bC<bs;bC++){bt[bx][bC]=[0];for(var bB=1,bE=bA[bx][bC][o];bB<bE;bB++){bt[bx][bC][bB]=(bu[bC][bB]-bA[bx][bC][bB])/bw
}}break;case"csv":var e=(bF[bx]+aH)[G](a),br=(bA[bx]+aH)[G](a);switch(bx){case"translation":bA[bx]=[0,0];
bt[bx]=[e[0]/bw,e[1]/bw];break;case"rotation":bA[bx]=(br[1]==e[1]&&br[2]==e[2])?br:[0,e[1],e[2]];
bt[bx]=[(e[0]-bA[bx][0])/bw,0,0];break;case"scale":bF[bx]=e;bA[bx]=(bA[bx]+aH)[G](a);
bt[bx]=[(e[0]-bA[bx][0])/bw,(e[1]-bA[bx][1])/bw,0,0];break;case"clip-rect":bA[bx]=(bA[bx]+aH)[G](a);
bt[bx]=[];bC=4;while(bC--){bt[bx][bC]=(e[bC]-bA[bx][bC])/bw}break}E[bx]=e}}}}this.stop();
this.in_animation=1;T[this.id]={start:bF.start||+new Date,ms:bw,easing:bv,from:bA,diff:bt,to:E,el:this,callback:R,t:{x:0,y:0}};
++T[o]==1&&be();return this};aM[bn].stop=function(){T[this.id]&&T[o]--;delete T[this.id];
return this};aM[bn].translate=function(e,i){return this.attr({translation:e+" "+i})
};aM[bn][aQ]=function(){return"Rapha\xebl\u2019s object"};aB.ae=T;var ad=function(e){this.items=[];
this[o]=0;this.type="set";if(e){for(var E=0,R=e[o];E<R;E++){if(e[E]&&(e[E].constructor==aM||e[E].constructor==ad)){this[this.items[o]]=this.items[this.items[o]]=e[E];
this[o]++}}}};ad[bn][f]=function(){var S,e;for(var E=0,R=arguments[o];E<R;E++){S=arguments[E];
if(S&&(S.constructor==aM||S.constructor==ad)){e=this.items[o];this[e]=this.items[e]=S;
this[o]++}}return this};ad[bn].pop=function(){delete this[this[o]--];return this.items.pop()
};for(var F in aM[bn]){if(aM[bn][ac](F)){ad[bn][F]=(function(e){return function(){for(var E=0,R=this.items[o];
E<R;E++){this.items[E][e][bl](this.items[E],arguments)}return this}})(F)}}ad[bn].attr=function(E,br){if(E&&aB.is(E,aW)&&aB.is(E[0],"object")){for(var e=0,bq=E[o];
e<bq;e++){this.items[e].attr(E[e])}}else{for(var R=0,S=this.items[o];R<S;R++){this.items[R].attr(E,br)
}}return this};ad[bn].animate=function(E,e,br,bt){(aB.is(br,"function")||!br)&&(bt=br||null);
var bq=this.items[o],R=bq,bu,bs=this,S;bt&&(S=function(){!--bq&&bt.call(bs)});br=aB.is(br,ab)?br:S;
bu=this.items[--R].animate(E,e,br,S);while(R--){this.items[R].animateWith(bu,E,e,br,S)
}return this};ad[bn].insertAfter=function(E){var e=this.items[o];while(e--){this.items[e].insertAfter(E)
}return this};ad[bn].getBBox=function(){var e=[],br=[],E=[],S=[];for(var R=this.items[o];
R--;){var bq=this.items[R].getBBox();e[f](bq.x);br[f](bq.y);E[f](bq.x+bq.width);S[f](bq.y+bq.height)
}e=a4[bl](0,e);br=a4[bl](0,br);return{x:e,y:br,width:h[bl](0,E)-e,height:h[bl](0,S)-br}
};ad[bn].clone=function(R){R=new ad;for(var e=0,E=this.items[o];e<E;e++){R[f](this.items[e].clone())
}return R};aB.registerFont=function(i){if(!i.face){return i}this.fonts=this.fonts||{};
var R={w:i.w,face:{},glyphs:{}},E=i.face["font-family"];for(var br in i.face){if(i.face[ac](br)){R.face[br]=i.face[br]
}}if(this.fonts[E]){this.fonts[E][f](R)}else{this.fonts[E]=[R]}if(!i.svg){R.face["units-per-em"]=O(i.face["units-per-em"],10);
for(var S in i.glyphs){if(i.glyphs[ac](S)){var bq=i.glyphs[S];R.glyphs[S]={w:bq.w,k:{},d:bq.d&&"M"+bq.d[bc](/[mlcxtrv]/g,function(bs){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bs]||"M"
})+"z"};if(bq.k){for(var e in bq.k){if(bq[ac](e)){R.glyphs[S].k[e]=bq.k[e]}}}}}}return i
};bi[bn].getFont=function(bt,bu,E,S){S=S||"normal";E=E||"normal";bu=+bu||{normal:400,bold:700,lighter:300,bolder:800}[bu]||400;
if(!aB.fonts){return}var bq=aB.fonts[bt];if(!bq){var R=new RegExp("(^|\\s)"+bt[bc](/[^\w\d\s+!~.:_-]/g,aH)+"(\\s|$)","i");
for(var e in aB.fonts){if(aB.fonts[ac](e)){if(R.test(e)){bq=aB.fonts[e];break}}}}var br;
if(bq){for(var bs=0,bv=bq[o];bs<bv;bs++){br=bq[bs];if(br.face["font-weight"]==bu&&(br.face["font-style"]==E||!br.face["font-style"])&&br.face["font-stretch"]==S){break
}}}return br};bi[bn].print=function(S,R,e,bs,bt,bC){bC=bC||"middle";var by=this.set(),bB=(e+aH)[G](aH),bz=0,bv=aH,bD;
aB.is(bs,e)&&(bs=this.getFont(bs));if(bs){bD=(bt||16)/bs.face["units-per-em"];var E=bs.face.bbox.split(a),br=+E[0],bu=+E[1]+(bC=="baseline"?E[3]-E[1]+(+bs.face.descent):(E[3]-E[1])/2);
for(var bx=0,bq=bB[o];bx<bq;bx++){var bw=bx&&bs.glyphs[bB[bx-1]]||{},bA=bs.glyphs[bB[bx]];
bz+=bx?(bw.w||bs.w)+(bw.k&&bw.k[bB[bx]]||0):0;bA&&bA.d&&by[f](this.path(bA.d).attr({fill:"#000",stroke:"none",translation:[bz,0]}))
}by.scale(bD,bD,br,bu).translate(S-br,R-bu)}return by};var a8=/\{(\d+)\}/g;aB.format=function(i,E){var e=aB.is(E,aW)?[0][bg](E):arguments;
i&&aB.is(i,ab)&&e[o]-1&&(i=i[bc](a8,function(S,R){return e[++R]==null?aH:e[R]}));
return i||aH};aB.ninja=function(){n.was?(Raphael=n.is):delete Raphael;return aB};
aB.el=aM[bn];return aB})();
/*
 * Color Picker 0.1.0 - Raphael plugin
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Based on Color Wheel (http://jweir.github.com/colorwheel) by John Weir (http://famedriver.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
sc_require("raphael");
(function(a){a.colorpicker=function(i,m,k,l,j){return new b(i,m,k,l,j)};a.fn.colorPickerIcon=function(j,p,n){var l=g*n*2/Math.min(n/8,4);
var k=g/2-g*2/l*1.5,o=["M",j,p-n,"A",n,n,0,0,1,n*Math.cos(k)+j,p-n*Math.sin(k),"L",j,p,"z"].join();
for(var m=0;m<l;m++){this.path(o).attr({stroke:"none",fill:"hsb("+(l-m)*(255/l)+", 255, 255)",rotation:[90+(360/l)*m,j,p]})
}return this.circle(j,p,n).attr({fill:"r#fff-#fff","fill-opacity":0,"stroke-width":Math.round(n*0.03),stroke:"#fff"})
};var g=Math.PI;function h(i,j){return(i<0)*180+Math.atan(-j/-i)*180/g}var f=document,e=window,c=(function(){if(f.addEventListener){return function(m,k,j,i){var l=function(n){return j.call(i,n)
};m.addEventListener(k,l,false);return function(){m.removeEventListener(k,l,false);
return true}}}else{if(f.attachEvent){return function(n,l,k,j){var m=function(o){return k.call(j,o||e.event)
};n.attachEvent("on"+l,m);var i=function(){n.detachEvent("on"+l,m);return true};return i
}}}})(),b=function(q,o,E,j,i){E=E||200;var p=3*E/200,v=E/200,w=1.6180339887,K=E/20,n=E/2,C=2*E/200,F=E+K*2+C*3,z=this,u=1,k=1,G=1,A=E-(K*4),D=i?a(i,E,F):a(q,o,E,F),l=A/6+K*2+C,m=A*2/3-C*2;
v<1&&(v=1);p<1&&(p=1);D.colorPickerIcon(n,n,n-C);z.cursor=D.set();z.cursor.push(D.circle(n,n,K/2).attr({stroke:"#000",opacity:0.5,"stroke-width":p}));
z.cursor.push(z.cursor[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":v}));
z.disc=D.circle(n,n,n-C).attr({fill:"#000","fill-opacity":0,stroke:"none",cursor:"crosshair"});
var J=z.disc.node.style;J.unselectable="on";J.MozUserSelect="none";J.WebkitUserSelect="none";
var I=K*2+2;z.brect=D.rect(C+I/w/2,E+C*2,E-C*2-I/w,I-C*2).attr({stroke:"#fff",fill:"180-#fff-#000"});
z.cursorb=D.set();z.cursorb.push(D.rect(E-C-I/w,E+C,~~(I/w),I,p).attr({stroke:"#000",opacity:0.5,"stroke-width":p}));
z.cursorb.push(z.cursorb[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":v}));
z.btop=z.brect.clone().attr({stroke:"#000",fill:"#000",opacity:0});J=z.btop.node.style;
J.unselectable="on";J.MozUserSelect="none";J.WebkitUserSelect="none";z.bwidth=~~(I/w)/2;
z.minx=C+z.bwidth;z.maxx=E-I/w-C+z.bwidth;z.H=z.S=z.B=1;z.padding=C;z.raphael=D;z.size2=n;
z.size20=K;z.x=q;z.y=o;z.hson=c(z.disc.node,"mousedown",function(t){var s=f.documentElement.scrollTop||f.body.scrollTop,x=f.documentElement.scrollLeft||f.body.scrollLeft;
this.hsOnTheMove=true;this.setHS(t.clientX+x-this.x,t.clientY+s-this.y);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},z);z.bon=c(z.btop.node,"mousedown",function(s){var t=f.documentElement.scrollLeft||f.body.scrollLeft;
this.bOnTheMove=true;this.setB(s.clientX+t-this.x);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},z);z.winunload=c(e,"unload",function(){this.hson();
this.bon();this.docmove&&this.docmove();this.docup&&this.docup();this.winunload()
},z);z.color(j||"#fff");this.onchanged&&this.onchanged(this.color())};b.prototype.setB=function(i){i<this.minx&&(i=this.minx);
i>this.maxx&&(i=this.maxx);this.cursorb.attr({x:i-this.bwidth});this.B=(i-this.minx)/(this.maxx-this.minx);
this.onchange&&this.onchange(this.color())};b.prototype.setHS=function(i,o){var n=i-this.size2,m=o-this.size2,j=this.size2-this.size20/2-this.padding,l=h(n,m),k=l*g/180;
isNaN(l)&&(l=0);if(n*n+m*m>j*j){i=j*Math.cos(k)+this.size2;o=j*Math.sin(k)+this.size2
}this.cursor.attr({cx:i,cy:o});this.H=(1-l/360)%1;this.S=Math.min((n*n+m*m)/j/j,1);
this.brect.attr({fill:"180-hsb("+[this.H,this.S]+",1)-#000"});this.onchange&&this.onchange(this.color())
};b.prototype.docOnMove=function(j){var i=f.documentElement.scrollTop||f.body.scrollTop,k=f.documentElement.scrollLeft||f.body.scrollLeft;
if(this.hsOnTheMove){this.setHS(j.clientX+k-this.x,j.clientY+i-this.y)}if(this.bOnTheMove){this.setB(j.clientX+k-this.x)
}j.preventDefault&&j.preventDefault();j.returnValue=false;return false};b.prototype.docOnUp=function(i){this.hsOnTheMove=this.bOnTheMove=false;
if(this.docmove){this.docmove()}delete this.docmove;if(this.docup){this.docup()}delete this.docup;
this.onchanged&&this.onchanged(this.color());i.preventDefault&&i.preventDefault();
i.stopPropagation&&i.stopPropagation();i.returnValue=false;return false};b.prototype.remove=function(){this.raphael.remove();
this.color=function(){return false}};b.prototype.color=function(j){if(j){j=a.getRGB(j);
var m=j.hex;j=a.rgb2hsb(j.r,j.g,j.b);n=j.h*360;this.H=j.h;this.S=j.s;this.B=j.b;this.cursorb.attr({x:this.B*(this.maxx-this.minx)+this.minx-this.bwidth});
this.brect.attr({fill:"180-hsb("+[this.H,this.S]+",1)-#000"});var n=(1-this.H)*360,l=n*g/180,k=(this.size2-this.size20/2-this.padding)*this.S,i=Math.cos(l)*k+this.size2,o=Math.sin(l)*k+this.size2;
this.cursor.attr({cx:i,cy:o});return this}else{return a.hsb2rgb(this.H,this.S,this.B).hex
}}})(window.Raphael);sc_require("color_picker/colorwheel");(function(a){a.colorwheel=function(i,m,k,l,j){return new b(i,m,k,l,j)
};var g=Math.PI;function h(i,j){return(i<0)*180+Math.atan(-j/-i)*180/g}var f=document,e=window;
var c=(function(){if(f.addEventListener){return function(m,k,j,i){var l=function(n){return j.call(i,n)
};m.addEventListener(k,l,false);return function(){m.removeEventListener(k,l,false);
return true}}}else{if(f.attachEvent){return function(n,l,k,j){var m=function(o){return k.call(j,o||e.event)
};n.attachEvent("on"+l,m);var i=function(){n.detachEvent("on"+l,m);return true};return i
}}}})();var b=function(v,q,G,k,j){G=G||200;var u=3*G/200,z=G/200,A=1.6180339887,K=g*G/5,P=G/20,p=G/2,E=2*G/200,C=this;
var w=1,l=1,I=1,D=G-(P*4);var F=j?a(j,G,G):a(v,q,G,G),n=D/6+P*2+E,o=D*2/3-E*2;z<1&&(z=1);
u<1&&(u=1);var O=g/2-g*2/K*1.3,m=p-E,N=p-E-P*2,J=["M",p,E,"A",m,m,0,0,1,m*Math.cos(O)+m+E,m-m*Math.sin(O)+E,"L",N*Math.cos(O)+m+E,m-N*Math.sin(O)+E,"A",N,N,0,0,0,p,E+P*2,"z"].join();
for(var L=0;L<K;L++){F.path(J).attr({stroke:"none",fill:"hsb("+L*(255/K)+", 255, 200)",rotation:[(360/K)*L,p,p]})
}F.path(["M",p,E,"A",m,m,0,1,1,p-1,E,"l1,0","M",p,E+P*2,"A",N,N,0,1,1,p-1,E+P*2,"l1,0"]).attr({"stroke-width":u,stroke:"#fff"});
C.cursorhsb=F.set();var M=P*2+2;C.cursorhsb.push(F.rect(p-M/A/2,E-1,M/A,M,3*G/200).attr({stroke:"#000",opacity:0.5,"stroke-width":u}));
C.cursorhsb.push(C.cursorhsb[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":z}));
C.ring=F.path(["M",p,E,"A",m,m,0,1,1,p-1,E,"l1,0M",p,E+P*2,"A",N,N,0,1,1,p-1,E+P*2,"l1,0"]).attr({fill:"#000",opacity:0,stroke:"none"});
C.main=F.rect(n,n,o,o).attr({stroke:"none",fill:"#f00",opacity:1});C.main.clone().attr({stroke:"none",fill:"0-#fff-#fff",opacity:0});
C.square=F.rect(n-1,n-1,o+2,o+2).attr({r:2,stroke:"#fff","stroke-width":u,fill:"90-#000-#000",opacity:0,cursor:"crosshair"});
C.cursor=F.set();C.cursor.push(F.circle(p,p,P/2).attr({stroke:"#000",opacity:0.5,"stroke-width":u}));
C.cursor.push(C.cursor[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":z}));
C.H=C.S=C.B=1;C.raphael=F;C.size2=p;C.wh=o;C.x=v;C.xy=n;C.y=q;C.hsbon=c(C.ring.node,"mousedown",function(i){this.hsbOnTheMove=true;
this.setH(i.clientX-this.x-this.size2,i.clientY-this.y-this.size2);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},C);C.clron=c(C.square.node,"mousedown",function(i){this.clrOnTheMove=true;
this.setSB(i.clientX-this.x,i.clientY-this.y);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},C);C.winunload=c(e,"unload",function(){this.hsbon();
this.clron();this.docmove&&this.docmove();this.docup&&this.docup();this.winunload()
},C);C.color(k||"#f00");this.onchanged&&this.onchanged(this.color())};b.prototype.setH=function(i,l){var k=h(i,l),j=k*g/180;
this.cursorhsb.rotate(k+90,this.size2,this.size2);this.H=(k+90)/360;this.main.attr({fill:"hsb("+this.H+",1,1)"});
this.onchange&&this.onchange(this.color())};b.prototype.setSB=function(i,j){i<this.size2-this.wh/2&&(i=this.size2-this.wh/2);
i>this.size2+this.wh/2&&(i=this.size2+this.wh/2);j<this.size2-this.wh/2&&(j=this.size2-this.wh/2);
j>this.size2+this.wh/2&&(j=this.size2+this.wh/2);this.cursor.attr({cx:i,cy:j});this.B=1-(j-this.xy)/this.wh;
this.S=(i-this.xy)/this.wh;this.onchange&&this.onchange(this.color())};b.prototype.docOnMove=function(i){if(this.hsbOnTheMove){this.setH(i.clientX-this.x-this.size2,i.clientY-this.y-this.size2)
}if(this.clrOnTheMove){this.setSB(i.clientX-this.x,i.clientY-this.y)}i.preventDefault&&i.preventDefault();
i.returnValue=false;return false};b.prototype.docOnUp=function(i){this.hsbOnTheMove=this.clrOnTheMove=false;
if(this.docmove){this.docmove()}delete this.docmove;if(this.docup){this.docup()}delete this.docup;
this.onchanged&&this.onchanged(this.color())};b.prototype.remove=function(){this.raphael.remove();
this.color=function(){return false}};b.prototype.color=function(j){if(j){j=a.getRGB(j);
j=a.rgb2hsb(j.r,j.g,j.b);var k=j.h*360;this.H=j.h;this.S=j.s;this.B=j.b;this.cursorhsb.rotate(k,this.size2,this.size2);
this.main.attr({fill:"hsb("+this.H+",1,1)"});var i=this.S*this.wh+this.xy,l=(1-this.B)*this.wh+this.xy;
this.cursor.attr({cx:i,cy:l});return this}else{return a.hsb2rgb(this.H,this.S,this.B).hex
}}})(window.Raphael);sc_require("raphael");(function(){Raphael.fn.g=Raphael.fn.g||{};
Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var b=[0.6,0.2,0.05,0.1333,0.75,0];for(var a=0;a<10;a++){if(a<b.length){Raphael.fn.g.colors.push("hsb("+b[a]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+b[a-b.length]+", 1, .5)")}}Raphael.fn.g.text=function(c,f,e){return this.text(c,f,e).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(c,f,e){if(c){return(c+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(g,i,h){if(i){return(+f).toFixed(i.replace(/^#+\.?/g,"").length)
}if(h){return(f*100/e).toFixed(h.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+f).toFixed(0)
}};Raphael.fn.g.finger=function(j,i,e,k,f,g,h){if((f&&!k)||(!f&&!e)){return h?"":this.path()
}g={square:"square",sharp:"sharp",soft:"soft"}[g]||"round";var m;k=Math.round(k);
e=Math.round(e);j=Math.round(j);i=Math.round(i);switch(g){case"round":if(!f){var c=Math.floor(k/2);
if(e<c){c=e;m=["M",j+0.5,i+0.5-Math.floor(k/2),"l",0,0,"a",c,Math.floor(k/2),0,0,1,0,k,"l",0,0,"z"]
}else{m=["M",j+0.5,i+0.5-c,"l",e-c,0,"a",c,c,0,1,1,0,k,"l",c-e,0,"z"]}}else{var c=Math.floor(e/2);
if(k<c){c=k;m=["M",j-Math.floor(e/2),i,"l",0,0,"a",Math.floor(e/2),c,0,0,1,e,0,"l",0,0,"z"]
}else{m=["M",j-c,i,"l",0,c-k,"a",c,c,0,1,1,e,0,"l",0,k-c,"z"]}}break;case"sharp":if(!f){var l=Math.floor(k/2);
m=["M",j,i+l,"l",0,-k,Math.max(e-l,0),0,Math.min(l,e),l,-Math.min(l,e),l+(l*2<k),"z"]
}else{var l=Math.floor(e/2);m=["M",j+l,i,"l",-e,0,0,-Math.max(k-l,0),l,-Math.min(l,k),l,Math.min(l,k),l,"z"]
}break;case"square":if(!f){m=["M",j,i+Math.floor(k/2),"l",0,-k,e,0,0,k,"z"]}else{m=["M",j+Math.floor(e/2),i,"l",1-e,0,0,-k,e-1,0,"z"]
}break;case"soft":var c;if(!f){c=Math.min(e,Math.round(k/5));m=["M",j+0.5,i+0.5-Math.floor(k/2),"l",e-c,0,"a",c,c,0,0,1,c,c,"l",0,k-c*2,"a",c,c,0,0,1,-c,c,"l",c-e,0,"z"]
}else{c=Math.min(Math.round(e/5),k);m=["M",j-Math.floor(e/2),i,"l",0,c-k,"a",c,c,0,0,1,c,-c,"l",e-2*c,0,"a",c,c,0,0,1,c,c,"l",0,k-c,"z"]
}}if(h){return m.join(",")}else{return this.path(m)}};Raphael.fn.g.disc=function(c,f,e){return this.circle(c,f,e)
};Raphael.fn.g.line=function(c,f,e){return this.rect(c-e,f-e/5,2*e,2*e/5)};Raphael.fn.g.square=function(c,f,e){e=e*0.7;
return this.rect(c-e,f-e,2*e,2*e)};Raphael.fn.g.triangle=function(c,f,e){e*=1.75;
return this.path("M".concat(c,",",f,"m0-",e*0.58,"l",e*0.5,",",e*0.87,"-",e,",0z"))
};Raphael.fn.g.diamond=function(c,f,e){return this.path(["M",c,f-e,"l",e,e,-e,e,-e,-e,e,-e,"z"])
};Raphael.fn.g.flower=function(g,f,c,e){c=c*1.25;var l=c,k=l*0.5;e=+e<3||!e?5:e;var m=["M",g,f+k,"Q"],j;
for(var h=1;h<e*2+1;h++){j=h%2?l:k;m=m.concat([+(g+j*Math.sin(h*Math.PI/e)).toFixed(3),+(f+j*Math.cos(h*Math.PI/e)).toFixed(3)])
}m.push("z");return this.path(m.join(","))};Raphael.fn.g.star=function(c,k,j,e){e=e||j*0.5;
var h=["M",c,k+e,"L"],g;for(var f=1;f<10;f++){g=f%2?j:e;h=h.concat([(c+g*Math.sin(f*Math.PI*0.2)).toFixed(3),(k+g*Math.cos(f*Math.PI*0.2)).toFixed(3)])
}h.push("z");return this.path(h.join(","))};Raphael.fn.g.cross=function(c,f,e){e=e/2.5;
return this.path("M".concat(c-e,",",f,"l",[-e,-e,e,-e,e,e,e,-e,e,e,-e,e,e,e,-e,e,-e,-e,-e,e,-e,-e,"z"]))
};Raphael.fn.g.plus=function(c,f,e){e=e/2;return this.path("M".concat(c-e/2,",",f-e/2,"l",[0,-e,e,0,0,e,e,0,0,e,-e,0,0,e,-e,0,0,-e,-e,0,0,-e,"z"]))
};Raphael.fn.g.arrow=function(c,f,e){return this.path("M".concat(c-e*0.7,",",f-e*0.4,"l",[e*0.6,0,0,-e*0.4,e,e*0.8,-e,e*0.8,0,-e*0.4,-e*0.6,0],"z"))
};Raphael.fn.g.tag=function(c,k,j,i,g){i=i||0;g=g==null?5:g;j=j==null?"$9.99":j;var f=0.5522*g,e=this.set(),h=3;
e.push(this.path().attr({fill:"#000",stroke:"none"}));e.push(this.text(c,k,j).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){this.rotate(0,c,k);var m=this[1].getBBox();if(m.height>=g*2){this[0].attr({path:["M",c,k+g,"a",g,g,0,1,1,0,-g*2,g,g,0,1,1,0,g*2,"m",0,-g*2-h,"a",g+h,g+h,0,1,0,0,(g+h)*2,"L",c+g+h,k+m.height/2+h,"l",m.width+2*h,0,0,-m.height-2*h,-m.width-2*h,0,"L",c,k-g-h].join(",")})
}else{var l=Math.sqrt(Math.pow(g+h,2)-Math.pow(m.height/2+h,2));this[0].attr({path:["M",c,k+g,"c",-f,0,-g,f-g,-g,-g,0,-f,g-f,-g,g,-g,f,0,g,g-f,g,g,0,f,f-g,g,-g,g,"M",c+l,k-m.height/2-h,"a",g+h,g+h,0,1,0,0,m.height+2*h,"l",g+h-l+m.width+2*h,0,0,-m.height-2*h,"L",c+l,k-m.height/2-h].join(",")})
}this[1].attr({x:c+g+h+m.width/2,y:k});i=(360-i)%360;this.rotate(i,c,k);i>90&&i<270&&this[1].attr({x:c-g-h-m.width/2,y:k,rotation:[180+i,c,k]});
return this};e.update();return e};Raphael.fn.g.popupit=function(j,i,k,e,q){e=e==null?2:e;
q=q||5;j=Math.round(j)+0.5;i=Math.round(i)+0.5;var g=k.getBBox(),l=Math.round(g.width/2),f=Math.round(g.height/2),o=[0,l+q*2,0,-l-q*2],m=[-f*2-q*3,-f-q,0,-f-q],c=["M",j-o[e],i-m[e],"l",-q,(e==2)*-q,-Math.max(l-q,0),0,"a",q,q,0,0,1,-q,-q,"l",0,-Math.max(f-q,0),(e==3)*-q,-q,(e==3)*q,-q,0,-Math.max(f-q,0),"a",q,q,0,0,1,q,-q,"l",Math.max(l-q,0),0,q,!e*-q,q,!e*q,Math.max(l-q,0),0,"a",q,q,0,0,1,q,q,"l",0,Math.max(f-q,0),(e==1)*q,q,(e==1)*-q,q,0,Math.max(f-q,0),"a",q,q,0,0,1,-q,q,"l",-Math.max(l-q,0),0,"z"].join(","),n=[{x:j,y:i+q*2+f},{x:j-q*2-l,y:i},{x:j,y:i-q*2-f},{x:j+q*2+l,y:i}][e];
k.translate(n.x-l-g.x,n.y-f-g.y);return this.path(c).attr({fill:"#000",stroke:"none"}).insertBefore(k.node?k:k[0])
};Raphael.fn.g.popup=function(c,j,i,e,g){e=e==null?2:e;g=g||5;i=i||"$9.99";var f=this.set(),h=3;
f.push(this.path().attr({fill:"#000",stroke:"none"}));f.push(this.text(c,j,i).attr(this.g.txtattr).attr({fill:"#fff"}));
f.update=function(m,l,n){m=m||c;l=l||j;var q=this[1].getBBox(),s=q.width/2,o=q.height/2,v=[0,s+g*2,0,-s-g*2],t=[-o*2-g*3,-o-g,0,-o-g],k=["M",m-v[e],l-t[e],"l",-g,(e==2)*-g,-Math.max(s-g,0),0,"a",g,g,0,0,1,-g,-g,"l",0,-Math.max(o-g,0),(e==3)*-g,-g,(e==3)*g,-g,0,-Math.max(o-g,0),"a",g,g,0,0,1,g,-g,"l",Math.max(s-g,0),0,g,!e*-g,g,!e*g,Math.max(s-g,0),0,"a",g,g,0,0,1,g,g,"l",0,Math.max(o-g,0),(e==1)*g,g,(e==1)*-g,g,0,Math.max(o-g,0),"a",g,g,0,0,1,-g,g,"l",-Math.max(s-g,0),0,"z"].join(","),u=[{x:m,y:l+g*2+o},{x:m-g*2-s,y:l},{x:m,y:l-g*2-o},{x:m+g*2+s,y:l}][e];
if(n){this[0].animate({path:k},500,">");this[1].animate(u,500,">")}else{this[0].attr({path:k});
this[1].attr(u)}return this};return f.update(c,j)};Raphael.fn.g.flag=function(c,i,h,g){g=g||0;
h=h||"$9.99";var e=this.set(),f=3;e.push(this.path().attr({fill:"#000",stroke:"none"}));
e.push(this.text(c,i,h).attr(this.g.txtattr).attr({fill:"#fff"}));e.update=function(j,m){this.rotate(0,j,m);
var l=this[1].getBBox(),k=l.height/2;this[0].attr({path:["M",j,m,"l",k+f,-k-f,l.width+2*f,0,0,l.height+2*f,-l.width-2*f,0,"z"].join(",")});
this[1].attr({x:j+k+f+l.width/2,y:m});g=360-g;this.rotate(g,j,m);g>90&&g<270&&this[1].attr({x:j-r-f-l.width/2,y:m,rotation:[180+g,j,m]});
return this};return e.update(c,i)};Raphael.fn.g.label=function(c,g,f){var e=this.set();
e.push(this.rect(c,g,10,10).attr({stroke:"none",fill:"#000"}));e.push(this.text(c,g,f).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){var i=this[1].getBBox(),h=Math.min(i.width+10,i.height+10)/2;
this[0].attr({x:i.x-h/2,y:i.y-h/2,width:i.width+h,height:i.height+h,r:h})};e.update();
return e};Raphael.fn.g.labelit=function(f){var e=f.getBBox(),c=Math.min(20,e.width+10,e.height+10)/2;
return this.rect(e.x-c/2,e.y-c/2,e.width+c,e.height+c,c).attr({stroke:"none",fill:"#000"}).insertBefore(f[0])
};Raphael.fn.g.drop=function(c,i,h,f,g){f=f||30;g=g||0;var e=this.set();e.push(this.path(["M",c,i,"l",f,0,"A",f*0.4,f*0.4,0,1,0,c+f*0.7,i-f*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-g,c,i]}));
g=(g+90)*Math.PI/180;e.push(this.text(c+f*Math.sin(g),i+f*Math.cos(g),h).attr(this.g.txtattr).attr({"font-size":f*12/30,fill:"#fff"}));
e.drop=e[0];e.text=e[1];return e};Raphael.fn.g.blob=function(e,k,j,i,g){i=(+i+1?i:45)+90;
g=g||12;var c=Math.PI/180,h=g*12/12;var f=this.set();f.push(this.path().attr({fill:"#000",stroke:"none"}));
f.push(this.text(e+g*Math.sin((i)*c),k+g*Math.cos((i)*c)-h/2,j).attr(this.g.txtattr).attr({"font-size":h,fill:"#fff"}));
f.update=function(q,p,v){q=q||e;p=p||k;var y=this[1].getBBox(),B=Math.max(y.width+h,g*25/12),x=Math.max(y.height+h,g*25/12),m=q+g*Math.sin((i-22.5)*c),z=p+g*Math.cos((i-22.5)*c),o=q+g*Math.sin((i+22.5)*c),A=p+g*Math.cos((i+22.5)*c),D=(o-m)/2,C=(A-z)/2,n=B/2,l=x/2,u=-Math.sqrt(Math.abs(n*n*l*l-n*n*C*C-l*l*D*D)/(n*n*C*C+l*l*D*D)),t=u*n*C/l+(o+m)/2,s=u*-l*D/n+(A+z)/2;
if(v){this.animate({x:t,y:s,path:["M",e,k,"L",o,A,"A",n,l,0,1,1,m,z,"z"].join(",")},500,">")
}else{this.attr({x:t,y:s,path:["M",e,k,"L",o,A,"A",n,l,0,1,1,m,z,"z"].join(",")})
}return this};f.update(e,k);return f};Raphael.fn.g.colorValue=function(g,f,e,c){return"hsb("+[Math.min((1-g/f)*0.4,1),e||0.75,c||0.75]+")"
};Raphael.fn.g.snapEnds=function(l,m,k){var h=l,n=m;if(h==n){return{from:h,to:n,power:0}
}function o(f){return Math.abs(f-0.5)<0.25?Math.floor(f)+0.5:Math.round(f)}var j=(n-h)/k,c=Math.floor(j),g=c,e=0;
if(c){while(g){e--;g=Math.floor(j*Math.pow(10,e))/Math.pow(10,e)}e++}else{while(!c){e=e||1;
c=Math.floor(j*Math.pow(10,e))/Math.pow(10,e);e++}e&&e--}var n=o(m*Math.pow(10,e))/Math.pow(10,e);
if(n<m){n=o((m+0.5)*Math.pow(10,e))/Math.pow(10,e)}var h=o((l-(e>0?0:0.5))*Math.pow(10,e))/Math.pow(10,e);
return{from:h,to:n,power:e}};Raphael.fn.g.axis=function(s,q,m,E,h,H,k,J,l,c){c=c==null?2:c;
l=l||"t";H=H||10;var D=l=="|"||l==" "?["M",s+0.5,q,"l",0,0.001]:k==1||k==3?["M",s+0.5,q,"l",0,-m]:["M",s,q+0.5,"l",m,0],v=this.g.snapEnds(E,h,H),I=v.from,z=v.to,G=v.power,F=0,A=this.set();
d=(z-I)/H;var p=I,o=G>0?G:0;u=m/H;if(+k==1||+k==3){var e=q,w=(k-1?1:-1)*(c+3+!!(k-1));
while(e>=q-m){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),e+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,e,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}));
p+=d;e-=u}if(Math.round(e+u-(q-m))){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),q-m+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,q-m,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}))
}}else{var g=s,p=I,o=G>0?G:0,w=(k?-1:1)*(c+9+!k),u=m/H,B=0,C=0;while(g<=s+m){l!="-"&&l!=" "&&(D=D.concat(["M",g+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(B=this.text(g,q+w,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr));
var n=B.getBBox();if(C>=n.x-5){A.pop(A.length-1).remove()}else{C=n.x+n.width}p+=d;
g+=u}if(Math.round(g-u-s-m)){l!="-"&&l!=" "&&(D=D.concat(["M",s+m+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(this.text(s+m,q+w,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr))
}}var K=this.path(D);K.text=A;K.all=this.set([K,A]);K.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return K};Raphael.el.lighter=function(e){e=e||2;
var c=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);c[0].b=Math.min(c[0].b*e,1);c[0].s=c[0].s/e;
c[1].b=Math.min(c[1].b*e,1);c[1].s=c[1].s/e;this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.darker=function(e){e=e||2;var c=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
c[0].s=Math.min(c[0].s*e,1);c[0].b=c[0].b/e;c[1].s=Math.min(c[1].s*e,1);c[1].b=c[1].b/e;
this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();sc_require("graphing/graphael");Raphael.fn.g.barchart=function(E,C,a,e,Q,w){w=w||{};
var R={round:"round",sharp:"sharp",soft:"soft"}[w.type]||"square",o=parseFloat(w.gutter||"20%"),O=this.set(),z=this.set(),f=this.set(),u=this.set(),A=Math.max.apply(Math,Q),P=[],c=this,D=0,H=w.colors||this.g.colors,t=Q.length;
if(this.raphael.is(Q[0],"array")){A=[];D=t;t=0;for(var M=Q.length;M--;){z.push(this.set());
A.push(Math.max.apply(Math,Q[M]));t=Math.max(t,Q[M].length)}if(w.stacked){for(var M=t;
M--;){var m=0;for(var L=Q.length;L--;){m+=+Q[L][M]||0}P.push(m)}}for(var M=Q.length;
M--;){if(Q[M].length<t){for(var L=t;L--;){Q[M].push(0)}}}A=Math.max.apply(Math,w.stacked?P:A)
}A=(w.to)||A;var F=a/(t*(100+o)+o)*100,b=F*o/100,k=w.vgutter==null?20:w.vgutter,v=[],l=E+b,g=(e-2*k)/A;
if(!w.stretch){b=Math.round(b);F=Math.floor(F)}!w.stacked&&(F/=D||1);for(var M=0;
M<t;M++){v=[];for(var L=0;L<(D||1);L++){var N=Math.round((D?Q[L][M]:Q[M])*g),n=C+e-k-N,J=this.g.finger(Math.round(l+F/2),n+N,F,N,true,R).attr({stroke:H[D?L:M],fill:H[D?L:M]});
if(D){z[L].push(J)}else{z.push(J)}J.y=n;J.x=Math.round(l+F/2);J.w=F;J.h=N;J.value=D?Q[L][M]:Q[M];
if(!w.stacked){l+=F}else{v.push(J)}}if(w.stacked){var K;u.push(K=this.rect(v[0].x-v[0].w/2,C,F,e).attr(this.g.shim));
K.bars=this.set();var p=0;for(var G=v.length;G--;){v[G].toFront()}for(var G=0,q=v.length;
G<q;G++){var J=v[G],B,N=(p+J.value)*g,I=this.g.finger(J.x,C+e-k-!!p*0.5,F,N,true,R,1);
K.bars.push(J);p&&J.attr({path:I});J.h=N;J.y=C+e-k-!!p*0.5-N;f.push(B=this.rect(J.x-J.w/2,J.y,F,J.value*g).attr(this.g.shim));
B.bar=J;B.value=J.value;p+=J.value}l+=F}l+=b}u.toFront();l=E+b;if(!w.stacked){for(var M=0;
M<t;M++){for(var L=0;L<(D||1);L++){var B;f.push(B=this.rect(Math.round(l),C+k,F,e-k).attr(this.g.shim));
B.bar=D?z[L][M]:z[M];B.value=B.bar.value;l+=F}l+=b}}O.label=function(y,U){y=y||[];
this.labels=c.set();var V,h=-Infinity;if(w.stacked){for(var x=0;x<t;x++){var S=0;
for(var s=0;s<(D||1);s++){S+=D?Q[s][x]:Q[x];if(s==D-1){var W=c.g.labelise(y[x],S,A);
V=c.g.text(z[x*(D||1)+s].x,C+e-k/2,W).insertBefore(f[x*(D||1)+s]);var T=V.getBBox();
if(T.x-7<h){V.remove()}else{this.labels.push(V);h=T.x+T.width}}}}}else{for(var x=0;
x<t;x++){for(var s=0;s<(D||1);s++){var W=c.g.labelise(D?y[s]&&y[s][x]:y[x],D?Q[s][x]:Q[x],A);
V=c.g.text(z[x*(D||1)+s].x,U?C+e-k/2:z[x*(D||1)+s].y-10,W).insertBefore(f[x*(D||1)+s]);
var T=V.getBBox();if(T.x-7<h){V.remove()}else{this.labels.push(V);h=T.x+T.width}}}}return this
};O.hover=function(i,h){u.hide();f.show();f.mouseover(i).mouseout(h);return this};
O.hoverColumn=function(i,h){f.hide();u.show();h=h||function(){};u.mouseover(i).mouseout(h);
return this};O.click=function(h){u.hide();f.show();f.click(h);return this};O.each=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=f.length;h--;){j.call(f[h])}return this};O.eachColumn=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=u.length;h--;){j.call(u[h])}return this};O.clickColumn=function(h){f.hide();
u.show();u.click(h);return this};O.push(z,f,u);O.bars=z;O.covers=f;return O};Raphael.fn.g.hbarchart=function(o,m,D,A,c,u){u=u||{};
var f={round:"round",sharp:"sharp",soft:"soft"}[u.type]||"square",g=parseFloat(u.gutter||"20%"),w=this.set(),C=this.set(),k=this.set(),G=this.set(),O=Math.max.apply(Math,c),a=[],p=this,E=0,n=u.colors||this.g.colors,J=c.length;
if(this.raphael.is(c[0],"array")){O=[];E=J;J=0;for(var I=c.length;I--;){C.push(this.set());
O.push(Math.max.apply(Math,c[I]));J=Math.max(J,c[I].length)}if(u.stacked){for(var I=J;
I--;){var q=0;for(var H=c.length;H--;){q+=+c[H][I]||0}a.push(q)}}for(var I=c.length;
I--;){if(c[I].length<J){for(var H=J;H--;){c[I].push(0)}}}O=Math.max.apply(Math,u.stacked?a:O)
}O=(u.to)||O;var L=Math.floor(A/(J*(100+g)+g)*100),l=Math.floor(L*g/100),h=[],b=m+l,e=(D-1)/O;
!u.stacked&&(L/=E||1);for(var I=0;I<J;I++){h=[];for(var H=0;H<(E||1);H++){var N=E?c[H][I]:c[I],K=this.g.finger(o,b+L/2,Math.round(N*e),L-1,false,f).attr({stroke:n[E?H:I],fill:n[E?H:I]});
if(E){C[H].push(K)}else{C.push(K)}K.x=o+Math.round(N*e);K.y=b+L/2;K.w=Math.round(N*e);
K.h=L;K.value=+N;if(!u.stacked){b+=L}else{h.push(K)}}if(u.stacked){var t=this.rect(o,h[0].y-h[0].h/2,D,L).attr(this.g.shim);
G.push(t);t.bars=this.set();var z=0;for(var v=h.length;v--;){h[v].toFront()}for(var v=0,F=h.length;
v<F;v++){var K=h[v],M,N=Math.round((z+K.value)*e),B=this.g.finger(o,K.y,N,L-1,false,f,1);
t.bars.push(K);z&&K.attr({path:B});K.w=N;K.x=o+N;k.push(M=this.rect(o+z*e,K.y-K.h/2,K.value*e,L).attr(this.g.shim));
M.bar=K;z+=K.value}b+=L}b+=l}G.toFront();b=m+l;if(!u.stacked){for(var I=0;I<J;I++){for(var H=0;
H<E;H++){var M=this.rect(o,b,D,L).attr(this.g.shim);k.push(M);M.bar=C[H][I];b+=L}b+=l
}}w.label=function(T,R){T=T||[];this.labels=p.set();for(var Q=0;Q<J;Q++){for(var P=0;
P<E;P++){var y=p.g.labelise(E?T[P]&&T[P][Q]:T[Q],E?c[P][Q]:c[Q],O);var S=R?C[Q*(E||1)+P].x-L/2+3:o+5,x=R?"end":"start",s;
this.labels.push(s=p.g.text(S,C[Q*(E||1)+P].y,y).attr({"text-anchor":x}).insertBefore(k[0]));
if(s.getBBox().x<o+5){s.attr({x:o+5,"text-anchor":"start"})}else{C[Q*(E||1)+P].label=s
}}}return this};w.hover=function(j,i){G.hide();k.show();i=i||function(){};k.mouseover(j).mouseout(i);
return this};w.hoverColumn=function(j,i){k.hide();G.show();i=i||function(){};G.mouseover(j).mouseout(i);
return this};w.each=function(s){if(!Raphael.is(s,"function")){return this}for(var j=k.length;
j--;){s.call(k[j])}return this};w.eachColumn=function(s){if(!Raphael.is(s,"function")){return this
}for(var j=G.length;j--;){s.call(G[j])}return this};w.click=function(i){G.hide();
k.show();k.click(i);return this};w.clickColumn=function(i){k.hide();G.show();G.click(i);
return this};w.push(C,k,G);w.bars=C;w.covers=k;return w};sc_require("graphing/graphael");
Raphael.fn.g.dotchart=function(M,L,a,h,A,z,t,H){function T(b){+b[0]&&(b[0]=c.g.axis(M+s,L+s,a-2*s,D,o,H.axisxstep||Math.floor((a-2*s)/20),2,H.axisxlabels||null,H.axisxtype||"t"));
+b[1]&&(b[1]=c.g.axis(M+a-s,L+h-s,h-2*s,C,n,H.axisystep||Math.floor((h-2*s)/20),3,H.axisylabels||null,H.axisytype||"t"));
+b[2]&&(b[2]=c.g.axis(M+s,L+h-s+G,a-2*s,D,o,H.axisxstep||Math.floor((a-2*s)/20),0,H.axisxlabels||null,H.axisxtype||"t"));
+b[3]&&(b[3]=c.g.axis(M+s-G,L+h-s,h-2*s,C,n,H.axisystep||Math.floor((h-2*s)/20),1,H.axisylabels||null,H.axisytype||"t"))
}H=H||{};var w=this.g.snapEnds(Math.min.apply(Math,A),Math.max.apply(Math,A),A.length-1),D=w.from,o=w.to,s=H.gutter||10,K=this.g.snapEnds(Math.min.apply(Math,z),Math.max.apply(Math,z),z.length-1),C=K.from,n=K.to,B=Math.max(A.length,z.length,t.length),v=this.g.markers[H.symbol]||"disc",I=this.set(),u=this.set(),F=H.max||100,q=Math.max.apply(Math,t),p=[],c=this,P=Math.sqrt(q/Math.PI)*2/F;
for(var Q=0;Q<B;Q++){p[Q]=Math.min(Math.sqrt(t[Q]/Math.PI)*2/P,F)}s=Math.max.apply(Math,p.concat(s));
var E=this.set(),G=Math.max.apply(Math,p);if(H.axis){var m=(H.axis+"").split(/[,\s]+/);
T(m);var S=[],U=[];for(var Q=0,J=m.length;Q<J;Q++){var V=m[Q].all?m[Q].all.getBBox()[["height","width"][Q%2]]:0;
S[Q]=V+s;U[Q]=V}s=Math.max.apply(Math,S.concat(s));for(var Q=0,J=m.length;Q<J;Q++){if(m[Q].all){m[Q].remove();
m[Q]=1}}T(m);for(var Q=0,J=m.length;Q<J;Q++){if(m[Q].all){E.push(m[Q].all)}}I.axis=E
}var O=(a-s*2)/((o-D)||1),N=(h-s*2)/((n-C)||1);for(var Q=0,J=z.length;Q<J;Q++){var f=this.raphael.is(v,"array")?v[Q]:v,l=M+s+(A[Q]-D)*O,j=L+h-s-(z[Q]-C)*N;
f&&p[Q]&&u.push(this.g[f](l,j,p[Q]).attr({fill:H.heat?this.g.colorValue(p[Q],G):Raphael.fn.g.colors[0],"fill-opacity":H.opacity?p[Q]/F:1,stroke:"none"}))
}var e=this.set();for(var Q=0,J=z.length;Q<J;Q++){var l=M+s+(A[Q]-D)*O,j=L+h-s-(z[Q]-C)*N;
e.push(this.circle(l,j,G).attr(this.g.shim));H.href&&H.href[Q]&&e[Q].attr({href:H.href[Q]});
e[Q].r=+p[Q].toFixed(3);e[Q].x=+l.toFixed(3);e[Q].y=+j.toFixed(3);e[Q].X=A[Q];e[Q].Y=z[Q];
e[Q].value=t[Q]||0;e[Q].dot=u[Q]}I.covers=e;I.series=u;I.push(u,E,e);I.hover=function(g,b){e.mouseover(g).mouseout(b);
return this};I.click=function(b){e.click(b);return this};I.each=function(g){if(!Raphael.is(g,"function")){return this
}for(var b=e.length;b--;){g.call(e[b])}return this};I.href=function(k){var g;for(var b=e.length;
b--;){g=e[b];if(g.X==k.x&&g.Y==k.y&&g.value==k.value){g.attr({href:k.href})}}};return I
};sc_require("graphing/graphael");Raphael.fn.g.linechart=function(L,K,a,c,u,t,E){function D(y,aa){var x=y.length/aa,X=0,i=x,Z=0,Y=[];
while(X<y.length){i--;if(i<0){Z+=y[X]*(1+i);Y.push(Z/x);Z=y[X++]*-i;i+=x}else{Z+=y[X++]
}}return Y}E=E||{};if(!this.raphael.is(u[0],"array")){u=[u]}if(!this.raphael.is(t[0],"array")){t=[t]
}var Q=Array.prototype.concat.apply([],u),O=Array.prototype.concat.apply([],t),p=this.g.snapEnds(Math.min.apply(Math,Q),Math.max.apply(Math,Q),u[0].length-1),z=p.from,k=p.to,m=E.gutter||10,R=(a-m*2)/(k-z),I=this.g.snapEnds(Math.min.apply(Math,O),Math.max.apply(Math,O),t[0].length-1),w=I.from,h=I.to,P=(c-m*2)/(h-w),v=Math.max(u[0].length,t[0].length),o=E.symbol||"",M=E.colors||Raphael.fn.g.colors,J=this,q=null,l=null,V=this.set(),N=[];
for(var U=0,G=t.length;U<G;U++){v=Math.max(v,t[U].length)}var W=this.set();for(var U=0,G=t.length;
U<G;U++){if(E.shade){W.push(this.path().attr({stroke:"none",fill:M[U],opacity:E.nostroke?1:0.3}))
}if(t[U].length>a-2*m){t[U]=D(t[U],a-2*m);v=a-2*m}if(u[U]&&u[U].length>a-2*m){u[U]=D(u[U],a-2*m)
}}var A=this.set();if(E.axis){var g=(E.axis+"").split(/[,\s]+/);+g[0]&&A.push(this.g.axis(L+m,K+m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),2));
+g[1]&&A.push(this.g.axis(L+a-m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),3));
+g[2]&&A.push(this.g.axis(L+m,K+c-m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),0));
+g[3]&&A.push(this.g.axis(L+m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),1))
}var H=this.set(),S=this.set(),n;for(var U=0,G=t.length;U<G;U++){if(!E.nostroke){H.push(n=this.path().attr({stroke:M[U],"stroke-width":E.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":E.dash||""}))
}var b=this.raphael.is(o,"array")?o[U]:o,B=this.set();N=[];for(var T=0,s=t[U].length;
T<s;T++){var f=L+m+((u[U]||u[0])[T]-z)*R;var e=K+c-m-(t[U][T]-w)*P;(Raphael.is(b,"array")?b[T]:b)&&B.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[T]:b]](f,e,(E.width||2)*3).attr({fill:M[U],stroke:"none"}));
N=N.concat([T?"L":"M",f,e])}S.push(B);if(E.shade){W[U].attr({path:N.concat(["L",f,K+c-m,"L",L+m+((u[U]||u[0])[0]-z)*R,K+c-m,"z"]).join(",")})
}!E.nostroke&&n.attr({path:N.join(",")})}function F(ag){var ad=[];for(var ae=0,ai=u.length;
ae<ai;ae++){ad=ad.concat(u[ae])}ad.sort();var aj=[],aa=[];for(var ae=0,ai=ad.length;
ae<ai;ae++){ad[ae]!=ad[ae-1]&&aj.push(ad[ae])&&aa.push(L+m+(ad[ae]-z)*R)}ad=aj;ai=ad.length;
var Z=ag||J.set();for(var ae=0;ae<ai;ae++){var Y=aa[ae]-(aa[ae]-(aa[ae-1]||L))/2,ah=((aa[ae+1]||L+a)-aa[ae])/2+(aa[ae]-(aa[ae-1]||L))/2,x;
ag?(x={}):Z.push(x=J.rect(Y-1,K,Math.max(ah+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=J.set();x.y=[];x.x=aa[ae];x.axis=ad[ae];for(var ac=0,af=t.length;
ac<af;ac++){aj=u[ac]||u[0];for(var ab=0,y=aj.length;ab<y;ab++){if(aj[ab]==ad[ae]){x.values.push(t[ac][ab]);
x.y.push(K+c-m-(t[ac][ab]-w)*P);x.symbols.push(V.symbols[ac][ab])}}}ag&&ag.call(x)
}!ag&&(q=Z)}function C(ae){var aa=ae||J.set(),x;for(var ac=0,ag=t.length;ac<ag;ac++){for(var ab=0,ad=t[ac].length;
ab<ad;ab++){var Z=L+m+((u[ac]||u[0])[ab]-z)*R,af=L+m+((u[ac]||u[0])[ab?ab-1:1]-z)*R,y=K+c-m-(t[ac][ab]-w)*P;
ae?(x={}):aa.push(x=J.circle(Z,y,Math.abs(af-Z)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=Z;x.y=y;x.value=t[ac][ab];x.line=V.lines[ac];x.shade=V.shades[ac];x.symbol=V.symbols[ac][ab];
x.symbols=V.symbols[ac];x.axis=(u[ac]||u[0])[ab];ae&&ae.call(x)}}!ae&&(l=aa)}V.push(H,W,S,A,q,l);
V.lines=H;V.shades=W;V.symbols=S;V.axis=A;V.hoverColumn=function(j,i){!q&&F();q.mouseover(j).mouseout(i);
return this};V.clickColumn=function(i){!q&&F();q.click(i);return this};V.hrefColumn=function(Y){var Z=J.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof Y=="object"){for(var j in Y){for(var y=0,X=q.length;
y<X;y++){if(q[y].axis==j){q[y].attr("href",Y[j])}}}}!q&&F();for(var y=0,X=Z.length;
y<X;y++){q[y]&&q[y].attr("href",Z[y])}return this};V.hover=function(j,i){!l&&C();
l.mouseover(j).mouseout(i);return this};V.click=function(i){!l&&C();l.click(i);return this
};V.each=function(i){C(i);return this};V.eachColumn=function(i){F(i);return this};
return V};sc_require("graphing/graphael");Raphael.fn.g.piechart=function(f,e,q,b,m){m=m||{};
var l=this,n=[],h=this.set(),o=this.set(),k=this.set(),v=[],x=b.length,y=0,B=0,A=0,c=9,z=true;
o.covers=h;if(x==1){k.push(this.circle(f,e,q).attr({fill:this.g.colors[0],stroke:opt.stroke||"#fff","stroke-width":m.strokewidth==null?1:m.strokewidth}));
h.push(this.circle(f,e,q).attr(this.g.shim));B=b[0];b[0]={value:b[0],order:0,valueOf:function(){return this.value
}};k[0].middle={x:f,y:e};k[0].mangle=180}else{function u(G,F,i,I,E,N){var K=Math.PI/180,C=G+i*Math.cos(-I*K),p=G+i*Math.cos(-E*K),H=G+i/2*Math.cos(-(I+(E-I)/2)*K),M=F+i*Math.sin(-I*K),L=F+i*Math.sin(-E*K),D=F+i/2*Math.sin(-(I+(E-I)/2)*K),J=["M",G,F,"L",C,M,"A",i,i,0,+(Math.abs(E-I)>180),1,p,L,"z"];
J.middle={x:H,y:D};return J}for(var w=0;w<x;w++){B+=b[w];b[w]={value:b[w],order:w,valueOf:function(){return this.value
}}}b.sort(function(p,i){return i.value-p.value});for(var w=0;w<x;w++){if(z&&b[w]*360/B<=1.5){c=w;
z=false}if(w>c){z=false;b[c].value+=b[w];b[c].others=true;A=b[c].value}}x=Math.min(c+1,b.length);
A&&b.splice(x)&&(b[c].others=true);for(var w=0;w<x;w++){var g=y-360*b[w]/B/2;if(!w){y=90-g;
g=y-360*b[w]/B/2}if(m.init){var j=u(f,e,1,y,y-360*b[w]/B).join(",")}var t=u(f,e,q,y,y-=360*b[w]/B);
var s=this.path(m.init?j:t).attr({fill:m.colors&&m.colors[w]||this.g.colors[w]||"#666",stroke:m.stroke||"#fff","stroke-width":(m.strokewidth==null?1:m.strokewidth),"stroke-linejoin":"round"});
s.value=b[w];s.middle=t.middle;s.mangle=g;n.push(s);k.push(s);m.init&&s.animate({path:t.join(",")},(+m.init-1)||1000,">")
}for(var w=0;w<x;w++){var s=l.path(n[w].attr("path")).attr(this.g.shim);m.href&&m.href[w]&&s.attr({href:m.href[w]});
s.attr=function(){};h.push(s);k.push(s)}}o.hover=function(E,C){C=C||function(){};
var D=this;for(var p=0;p<x;p++){(function(F,G,i){var H={sector:F,cover:G,cx:f,cy:e,mx:F.middle.x,my:F.middle.y,mangle:F.mangle,r:q,value:b[i],total:B,label:D.labels&&D.labels[i]};
G.mouseover(function(){E.call(H)}).mouseout(function(){C.call(H)})})(k[p],h[p],p)
}return this};o.each=function(D){var C=this;for(var p=0;p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:f,cy:e,x:E.middle.x,y:E.middle.y,mangle:E.mangle,r:q,value:b[i],total:B,label:C.labels&&C.labels[i]};
D.call(G)})(k[p],h[p],p)}return this};o.click=function(D){var C=this;for(var p=0;
p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:f,cy:e,mx:E.middle.x,my:E.middle.y,mangle:E.mangle,r:q,value:b[i],total:B,label:C.labels&&C.labels[i]};
F.click(function(){D.call(G)})})(k[p],h[p],p)}return this};o.inject=function(i){i.insertBefore(h[0])
};var a=function(I,D,C,p){var M=f+q+q/5,L=e,H=L+10;I=I||[];p=(p&&p.toLowerCase&&p.toLowerCase())||"east";
C=l.g.markers[C&&C.toLowerCase()]||"disc";o.labels=l.set();for(var G=0;G<x;G++){var N=k[G].attr("fill"),E=b[G].order,F;
b[G].others&&(I[E]=D||"Others");I[E]=l.g.labelise(I[E],b[G],B);o.labels.push(l.set());
o.labels[G].push(l.g[C](M+5,H,5).attr({fill:N,stroke:"none"}));o.labels[G].push(F=l.text(M+20,H,I[E]||b[E]).attr(l.g.txtattr).attr({fill:m.legendcolor||"#000","text-anchor":"start"}));
h[G].label=o.labels[G];H+=F.getBBox().height*1.2}var J=o.labels.getBBox(),K={east:[0,-J.height/2],west:[-J.width-2*q-20,-J.height/2],north:[-q-J.width/2,-q-J.height-10],south:[-q-J.width/2,q+10]}[p];
o.labels.translate.apply(o.labels,K);o.push(o.labels)};if(m.legend){a(m.legend,m.legendothers,m.legendmark,m.legendpos)
}o.push(k,h);o.series=k;o.covers=h;return o};require("graphing/graphael");require("graphing/gbar");
SCUI.BarGraph=SC.View.extend({content:null,color:"red",_content_changed:function(){if(this.get("content")&&this.get("isVisible")){console.log(this.get("content"));
if(this._raphael){this._raphael.remove()}this._render_view()}},didAppendToDocument:function(){var a=this;
this.invokeLater(function(){a._render_view()})},willDestroyLayer:function(){if(this._raphael){this._raphael.remove()
}},_render_view:function(){if(!this._raphael&&this.$().get(0)){var c=this.$().get(0);
var f=Raphael(c),g=function(){this.flag=f.g.popup(this.bar.x,this.bar.y,this.bar.value||"0").insertBefore(this)
},e=function(){this.flag.animate({opacity:0},200,function(){this.remove()})},b=function(){var k=[],j=[];
for(var h=this.bars.length;h--;){k.push(this.bars[h].y);j.push(this.bars[h].value||"0")
}this.flag=f.g.popup(this.bars[0].x,Math.min.apply(Math,k),j.join(", ")).insertBefore(this)
},a=function(){this.flag.animate({opacity:0},300,function(){this.remove()})};f.g.hbarchart(0,0,300,220,this.get("content"),{stacked:true}).hover(g,e);
this._raphael=f}}});require("color_picker/colorpicker");require("color_picker/colorwheel");
SCUI.ColorPicker=SC.View.extend({value:"#eee",size:160,displayProperties:"value".w(),render:function(a,c){var b=this.get("value");
if(this._cp){if(this._cp.color()!==b){this._cp.color(b)}}},didAppendToDocument:function(){var c=this.get("parentView"),f=this.get("frame");
var g=c?c.convertFrameToView(f,null):f;if(!this._cp){var a=this.$().get(0),b=this,e;
this._cp=e=Raphael.colorpicker(g.x,g.y,this.get("size"),this.get("value"),a);this._cp.onchange=function(h){b.setIfChanged("value",h)
}}else{this._cp.x=g.x;this._cp.y=g.y}},willDestroyLayer:function(){if(this._cp){this._cp.remove()
}}});SCUI.ColorWell=SC.View.extend({classNames:["color-well"],value:"#eee",activeClass:"active",displayProperties:"value".w(),render:function(a,b){a.addStyle({backgroundColor:this.get("value")}).setClass(this.get("activeClass"),this._isMouseDown)
},mouseDown:function(a){if(!this.get("isEnabledInPane")){return NO}this.set("isActive",YES);
this.displayDidChange();return YES},mouseUp:function(a){if(!this.get("isEnabledInPane")){return NO
}this._isMouseDown=false;this.displayDidChange();this._popupColorPicker();return YES
},_popupColorPicker:function(){var a=this;if(!this._pickerPane){this._pickerPane=SC.PickerPane.create({layout:{width:180,height:240},classNames:["color-picker","picker"],contentView:SC.View.design({childViews:"picker textBox".w(),picker:SCUI.ColorPicker.design({layout:{centerX:0,top:10,width:160,height:185},valueBinding:SC.binding("value",a)}),textBox:SC.TextFieldView.design({layout:{width:160,height:24,bottom:10,left:10},valueBinding:SC.binding("value",a)})})})
}this._pickerPane.popup(this,SC.PICKER_POINTER)}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("scui/sai")
};