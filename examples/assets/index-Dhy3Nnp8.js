var yee=Object.defineProperty,wee=(e,s,n)=>s in e?yee(e,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[s]=n,x8=(e,s,n)=>(wee(e,typeof s!="symbol"?s+"":s,n),n);const V9=Math.min,Y7=Math.max,kV=Math.round,aN=e=>({x:e,y:e}),Eee={left:"right",right:"left",bottom:"top",top:"bottom"},pee={start:"end",end:"start"};function Hq(e,s,n){return Y7(e,V9(s,n))}function hG(e,s){return typeof e=="function"?e(s):e}function rA(e){return e.split("-")[0]}function fW(e){return e.split("-")[1]}function pZ(e){return e==="x"?"y":"x"}function TZ(e){return e==="y"?"height":"width"}function fG(e){return["top","bottom"].includes(rA(e))?"y":"x"}function mZ(e){return pZ(fG(e))}function Tee(e,s,n){n===void 0&&(n=!1);const t=fW(e),u=mZ(e),o=TZ(u);let f=u==="x"?t===(n?"end":"start")?"right":"left":t==="start"?"bottom":"top";return s.reference[o]>s.floating[o]&&(f=qV(f)),[f,qV(f)]}function mee(e){const s=qV(e);return[kz(e),s,kz(s)]}function kz(e){return e.replace(/start|end/g,s=>pee[s])}function Ree(e,s,n){const t=["left","right"],u=["right","left"],o=["top","bottom"],f=["bottom","top"];switch(e){case"top":case"bottom":return n?s?u:t:s?t:u;case"left":case"right":return s?o:f;default:return[]}}function Aee(e,s,n,t){const u=fW(e);let o=Ree(rA(e),n==="start",t);return u&&(o=o.map(f=>f+"-"+u),s&&(o=o.concat(o.map(kz)))),o}function qV(e){return e.replace(/left|right|bottom|top/g,s=>Eee[s])}function Dee(e){return{top:0,right:0,bottom:0,left:0,...e}}function RZ(e){return typeof e!="number"?Dee(e):{top:e,right:e,bottom:e,left:e}}function W9(e){const{x:s,y:n,width:t,height:u}=e;return{width:t,height:u,top:n,left:s,right:s+t,bottom:n+u,x:s,y:n}}function Fq(e,s,n){let{reference:t,floating:u}=e;const o=fG(s),f=mZ(s),d=TZ(f),m=rA(s),D=o==="y",P=t.x+t.width/2-u.width/2,x=t.y+t.height/2-u.height/2,H=t[d]/2-u[d]/2;let _;switch(m){case"top":_={x:P,y:t.y-u.height};break;case"bottom":_={x:P,y:t.y+t.height};break;case"right":_={x:t.x+t.width,y:x};break;case"left":_={x:t.x-u.width,y:x};break;default:_={x:t.x,y:t.y}}switch(fW(s)){case"start":_[f]-=H*(n&&D?-1:1);break;case"end":_[f]+=H*(n&&D?-1:1);break}return _}const See=async(e,s,n)=>{const{placement:t="bottom",strategy:u="absolute",middleware:o=[],platform:f}=n,d=o.filter(Boolean),m=await(f.isRTL==null?void 0:f.isRTL(s));let D=await f.getElementRects({reference:e,floating:s,strategy:u}),{x:P,y:x}=Fq(D,t,m),H=t,_={},ne=0;for(let re=0;re<d.length;re++){const{name:J,fn:K}=d[re],{x:Ie,y:ce,data:ae,reset:me}=await K({x:P,y:x,initialPlacement:t,placement:H,strategy:u,middlewareData:_,rects:D,platform:f,elements:{reference:e,floating:s}});P=Ie??P,x=ce??x,_={..._,[J]:{..._[J],...ae}},me&&ne<=50&&(ne++,typeof me=="object"&&(me.placement&&(H=me.placement),me.rects&&(D=me.rects===!0?await f.getElementRects({reference:e,floating:s,strategy:u}):me.rects),{x:P,y:x}=Fq(D,H,m)),re=-1)}return{x:P,y:x,placement:H,strategy:u,middlewareData:_}};async function hk(e,s){var n;s===void 0&&(s={});const{x:t,y:u,platform:o,rects:f,elements:d,strategy:m}=e,{boundary:D="clippingAncestors",rootBoundary:P="viewport",elementContext:x="floating",altBoundary:H=!1,padding:_=0}=hG(s,e),ne=RZ(_),re=d[H?x==="floating"?"reference":"floating":x],J=W9(await o.getClippingRect({element:(n=await(o.isElement==null?void 0:o.isElement(re)))==null||n?re:re.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(d.floating)),boundary:D,rootBoundary:P,strategy:m})),K=x==="floating"?{x:t,y:u,width:f.floating.width,height:f.floating.height}:f.reference,Ie=await(o.getOffsetParent==null?void 0:o.getOffsetParent(d.floating)),ce=await(o.isElement==null?void 0:o.isElement(Ie))?await(o.getScale==null?void 0:o.getScale(Ie))||{x:1,y:1}:{x:1,y:1},ae=W9(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:d,rect:K,offsetParent:Ie,strategy:m}):K);return{top:(J.top-ae.top+ne.top)/ce.y,bottom:(ae.bottom-J.bottom+ne.bottom)/ce.y,left:(J.left-ae.left+ne.left)/ce.x,right:(ae.right-J.right+ne.right)/ce.x}}const Nee=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(s){var n,t;const{placement:u,middlewareData:o,rects:f,initialPlacement:d,platform:m,elements:D}=s,{mainAxis:P=!0,crossAxis:x=!0,fallbackPlacements:H,fallbackStrategy:_="bestFit",fallbackAxisSideDirection:ne="none",flipAlignment:re=!0,...J}=hG(e,s);if((n=o.arrow)!=null&&n.alignmentOffset)return{};const K=rA(u),Ie=rA(d)===d,ce=await(m.isRTL==null?void 0:m.isRTL(D.floating)),ae=H||(Ie||!re?[qV(d)]:mee(d));!H&&ne!=="none"&&ae.push(...Aee(d,re,ne,ce));const me=[d,...ae],Ee=await hk(s,J),Ae=[];let Me=((t=o.flip)==null?void 0:t.overflows)||[];if(P&&Ae.push(Ee[K]),x){const Ke=Tee(u,f,ce);Ae.push(Ee[Ke[0]],Ee[Ke[1]])}if(Me=[...Me,{placement:u,overflows:Ae}],!Ae.every(Ke=>Ke<=0)){var we,Te;const Ke=(((we=o.flip)==null?void 0:we.index)||0)+1,lt=me[Ke];if(lt)return{data:{index:Ke,overflows:Me},reset:{placement:lt}};let Ze=(Te=Me.filter(it=>it.overflows[0]<=0).sort((it,ot)=>it.overflows[1]-ot.overflows[1])[0])==null?void 0:Te.placement;if(!Ze)switch(_){case"bestFit":{var je;const it=(je=Me.map(ot=>[ot.placement,ot.overflows.filter(yt=>yt>0).reduce((yt,Rt)=>yt+Rt,0)]).sort((ot,yt)=>ot[1]-yt[1])[0])==null?void 0:je[0];it&&(Ze=it);break}case"initialPlacement":Ze=d;break}if(u!==Ze)return{reset:{placement:Ze}}}return{}}}};function AZ(e){const s=V9(...e.map(o=>o.left)),n=V9(...e.map(o=>o.top)),t=Y7(...e.map(o=>o.right)),u=Y7(...e.map(o=>o.bottom));return{x:s,y:n,width:t-s,height:u-n}}function gee(e){const s=e.slice().sort((u,o)=>u.y-o.y),n=[];let t=null;for(let u=0;u<s.length;u++){const o=s[u];!t||o.y-t.y>t.height/2?n.push([o]):n[n.length-1].push(o),t=o}return n.map(u=>W9(AZ(u)))}const Oee=function(e){return e===void 0&&(e={}),{name:"inline",options:e,async fn(s){const{placement:n,elements:t,rects:u,platform:o,strategy:f}=s,{padding:d=2,x:m,y:D}=hG(e,s),P=Array.from(await(o.getClientRects==null?void 0:o.getClientRects(t.reference))||[]),x=gee(P),H=W9(AZ(P)),_=RZ(d);function ne(){if(x.length===2&&x[0].left>x[1].right&&m!=null&&D!=null)return x.find(J=>m>J.left-_.left&&m<J.right+_.right&&D>J.top-_.top&&D<J.bottom+_.bottom)||H;if(x.length>=2){if(fG(n)==="y"){const Te=x[0],je=x[x.length-1],Ke=rA(n)==="top",lt=Te.top,Ze=je.bottom,it=Ke?Te.left:je.left,ot=Ke?Te.right:je.right,yt=ot-it,Rt=Ze-lt;return{top:lt,bottom:Ze,left:it,right:ot,width:yt,height:Rt,x:it,y:lt}}const J=rA(n)==="left",K=Y7(...x.map(Te=>Te.right)),Ie=V9(...x.map(Te=>Te.left)),ce=x.filter(Te=>J?Te.left===Ie:Te.right===K),ae=ce[0].top,me=ce[ce.length-1].bottom,Ee=Ie,Ae=K,Me=Ae-Ee,we=me-ae;return{top:ae,bottom:me,left:Ee,right:Ae,width:Me,height:we,x:Ee,y:ae}}return H}const re=await o.getElementRects({reference:{getBoundingClientRect:ne},floating:t.floating,strategy:f});return u.reference.x!==re.reference.x||u.reference.y!==re.reference.y||u.reference.width!==re.reference.width||u.reference.height!==re.reference.height?{reset:{rects:re}}:{}}}};async function Lee(e,s){const{placement:n,platform:t,elements:u}=e,o=await(t.isRTL==null?void 0:t.isRTL(u.floating)),f=rA(n),d=fW(n),m=fG(n)==="y",D=["left","top"].includes(f)?-1:1,P=o&&m?-1:1,x=hG(s,e);let{mainAxis:H,crossAxis:_,alignmentAxis:ne}=typeof x=="number"?{mainAxis:x,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...x};return d&&typeof ne=="number"&&(_=d==="end"?ne*-1:ne),m?{x:_*P,y:H*D}:{x:H*D,y:_*P}}const DZ=function(e){return{name:"offset",options:e,async fn(s){var n,t;const{x:u,y:o,placement:f,middlewareData:d}=s,m=await Lee(s,e);return f===((n=d.offset)==null?void 0:n.placement)&&(t=d.arrow)!=null&&t.alignmentOffset?{}:{x:u+m.x,y:o+m.y,data:{...m,placement:f}}}}},bee=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(s){const{x:n,y:t,placement:u}=s,{mainAxis:o=!0,crossAxis:f=!1,limiter:d={fn:J=>{let{x:K,y:Ie}=J;return{x:K,y:Ie}}},...m}=hG(e,s),D={x:n,y:t},P=await hk(s,m),x=fG(rA(u)),H=pZ(x);let _=D[H],ne=D[x];if(o){const J=H==="y"?"top":"left",K=H==="y"?"bottom":"right",Ie=_+P[J],ce=_-P[K];_=Hq(Ie,_,ce)}if(f){const J=x==="y"?"top":"left",K=x==="y"?"bottom":"right",Ie=ne+P[J],ce=ne-P[K];ne=Hq(Ie,ne,ce)}const re=d.fn({...s,[H]:_,[x]:ne});return{...re,data:{x:re.x-n,y:re.y-t}}}}};function oN(e){return SZ(e)?(e.nodeName||"").toLowerCase():"#document"}function b2(e){var s;return(e==null||(s=e.ownerDocument)==null?void 0:s.defaultView)||window}function EN(e){var s;return(s=(SZ(e)?e.ownerDocument:e.document)||window.document)==null?void 0:s.documentElement}function SZ(e){return e instanceof Node||e instanceof b2(e).Node}function iA(e){return e instanceof Element||e instanceof b2(e).Element}function hR(e){return e instanceof HTMLElement||e instanceof b2(e).HTMLElement}function Gq(e){return typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof b2(e).ShadowRoot}function dG(e){const{overflow:s,overflowX:n,overflowY:t,display:u}=Rw(e);return/auto|scroll|overlay|hidden|clip/.test(s+t+n)&&!["inline","contents"].includes(u)}function Cee(e){return["table","td","th"].includes(oN(e))}function fk(e){const s=dk(),n=Rw(e);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!s&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!s&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(t=>(n.willChange||"").includes(t))||["paint","layout","strict","content"].some(t=>(n.contain||"").includes(t))}function Pee(e){let s=Y9(e);for(;hR(s)&&!dW(s);){if(fk(s))return s;s=Y9(s)}return null}function dk(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function dW(e){return["html","body","#document"].includes(oN(e))}function Rw(e){return b2(e).getComputedStyle(e)}function IW(e){return iA(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Y9(e){if(oN(e)==="html")return e;const s=e.assignedSlot||e.parentNode||Gq(e)&&e.host||EN(e);return Gq(s)?s.host:s}function NZ(e){const s=Y9(e);return dW(s)?e.ownerDocument?e.ownerDocument.body:e.body:hR(s)&&dG(s)?s:NZ(s)}function qz(e,s,n){var t;s===void 0&&(s=[]),n===void 0&&(n=!0);const u=NZ(e),o=u===((t=e.ownerDocument)==null?void 0:t.body),f=b2(u);return o?s.concat(f,f.visualViewport||[],dG(u)?u:[],f.frameElement&&n?qz(f.frameElement):[]):s.concat(u,qz(u,[],n))}function gZ(e){const s=Rw(e);let n=parseFloat(s.width)||0,t=parseFloat(s.height)||0;const u=hR(e),o=u?e.offsetWidth:n,f=u?e.offsetHeight:t,d=kV(n)!==o||kV(t)!==f;return d&&(n=o,t=f),{width:n,height:t,$:d}}function OZ(e){return iA(e)?e:e.contextElement}function x9(e){const s=OZ(e);if(!hR(s))return aN(1);const n=s.getBoundingClientRect(),{width:t,height:u,$:o}=gZ(s);let f=(o?kV(n.width):n.width)/t,d=(o?kV(n.height):n.height)/u;return(!f||!Number.isFinite(f))&&(f=1),(!d||!Number.isFinite(d))&&(d=1),{x:f,y:d}}const Mee=aN(0);function LZ(e){const s=b2(e);return!dk()||!s.visualViewport?Mee:{x:s.visualViewport.offsetLeft,y:s.visualViewport.offsetTop}}function xee(e,s,n){return s===void 0&&(s=!1),!n||s&&n!==b2(e)?!1:s}function HF(e,s,n,t){s===void 0&&(s=!1),n===void 0&&(n=!1);const u=e.getBoundingClientRect(),o=OZ(e);let f=aN(1);s&&(t?iA(t)&&(f=x9(t)):f=x9(e));const d=xee(o,n,t)?LZ(o):aN(0);let m=(u.left+d.x)/f.x,D=(u.top+d.y)/f.y,P=u.width/f.x,x=u.height/f.y;if(o){const H=b2(o),_=t&&iA(t)?b2(t):t;let ne=H,re=ne.frameElement;for(;re&&t&&_!==ne;){const J=x9(re),K=re.getBoundingClientRect(),Ie=Rw(re),ce=K.left+(re.clientLeft+parseFloat(Ie.paddingLeft))*J.x,ae=K.top+(re.clientTop+parseFloat(Ie.paddingTop))*J.y;m*=J.x,D*=J.y,P*=J.x,x*=J.y,m+=ce,D+=ae,ne=b2(re),re=ne.frameElement}}return W9({width:P,height:x,x:m,y:D})}const Uee=[":popover-open",":modal"];function bZ(e){return Uee.some(s=>{try{return e.matches(s)}catch{return!1}})}function Bee(e){let{elements:s,rect:n,offsetParent:t,strategy:u}=e;const o=u==="fixed",f=EN(t),d=s?bZ(s.floating):!1;if(t===f||d&&o)return n;let m={scrollLeft:0,scrollTop:0},D=aN(1);const P=aN(0),x=hR(t);if((x||!x&&!o)&&((oN(t)!=="body"||dG(f))&&(m=IW(t)),hR(t))){const H=HF(t);D=x9(t),P.x=H.x+t.clientLeft,P.y=H.y+t.clientTop}return{width:n.width*D.x,height:n.height*D.y,x:n.x*D.x-m.scrollLeft*D.x+P.x,y:n.y*D.y-m.scrollTop*D.y+P.y}}function Hee(e){return Array.from(e.getClientRects())}function CZ(e){return HF(EN(e)).left+IW(e).scrollLeft}function Fee(e){const s=EN(e),n=IW(e),t=e.ownerDocument.body,u=Y7(s.scrollWidth,s.clientWidth,t.scrollWidth,t.clientWidth),o=Y7(s.scrollHeight,s.clientHeight,t.scrollHeight,t.clientHeight);let f=-n.scrollLeft+CZ(e);const d=-n.scrollTop;return Rw(t).direction==="rtl"&&(f+=Y7(s.clientWidth,t.clientWidth)-u),{width:u,height:o,x:f,y:d}}function Gee(e,s){const n=b2(e),t=EN(e),u=n.visualViewport;let o=t.clientWidth,f=t.clientHeight,d=0,m=0;if(u){o=u.width,f=u.height;const D=dk();(!D||D&&s==="fixed")&&(d=u.offsetLeft,m=u.offsetTop)}return{width:o,height:f,x:d,y:m}}function _ee(e,s){const n=HF(e,!0,s==="fixed"),t=n.top+e.clientTop,u=n.left+e.clientLeft,o=hR(e)?x9(e):aN(1),f=e.clientWidth*o.x,d=e.clientHeight*o.y,m=u*o.x,D=t*o.y;return{width:f,height:d,x:m,y:D}}function _q(e,s,n){let t;if(s==="viewport")t=Gee(e,n);else if(s==="document")t=Fee(EN(e));else if(iA(s))t=_ee(s,n);else{const u=LZ(e);t={...s,x:s.x-u.x,y:s.y-u.y}}return W9(t)}function PZ(e,s){const n=Y9(e);return n===s||!iA(n)||dW(n)?!1:Rw(n).position==="fixed"||PZ(n,s)}function Vee(e,s){const n=s.get(e);if(n)return n;let t=qz(e,[],!1).filter(d=>iA(d)&&oN(d)!=="body"),u=null;const o=Rw(e).position==="fixed";let f=o?Y9(e):e;for(;iA(f)&&!dW(f);){const d=Rw(f),m=fk(f);!m&&d.position==="fixed"&&(u=null),(o?!m&&!u:!m&&d.position==="static"&&u&&["absolute","fixed"].includes(u.position)||dG(f)&&!m&&PZ(e,f))?t=t.filter(D=>D!==f):u=d,f=Y9(f)}return s.set(e,t),t}function Wee(e){let{element:s,boundary:n,rootBoundary:t,strategy:u}=e;const o=[...n==="clippingAncestors"?Vee(s,this._c):[].concat(n),t],f=o[0],d=o.reduce((m,D)=>{const P=_q(s,D,u);return m.top=Y7(P.top,m.top),m.right=V9(P.right,m.right),m.bottom=V9(P.bottom,m.bottom),m.left=Y7(P.left,m.left),m},_q(s,f,u));return{width:d.right-d.left,height:d.bottom-d.top,x:d.left,y:d.top}}function Yee(e){const{width:s,height:n}=gZ(e);return{width:s,height:n}}function zee(e,s,n){const t=hR(s),u=EN(s),o=n==="fixed",f=HF(e,!0,o,s);let d={scrollLeft:0,scrollTop:0};const m=aN(0);if(t||!t&&!o)if((oN(s)!=="body"||dG(u))&&(d=IW(s)),t){const x=HF(s,!0,o,s);m.x=x.x+s.clientLeft,m.y=x.y+s.clientTop}else u&&(m.x=CZ(u));const D=f.left+d.scrollLeft-m.x,P=f.top+d.scrollTop-m.y;return{x:D,y:P,width:f.width,height:f.height}}function Vq(e,s){return!hR(e)||Rw(e).position==="fixed"?null:s?s(e):e.offsetParent}function MZ(e,s){const n=b2(e);if(!hR(e)||bZ(e))return n;let t=Vq(e,s);for(;t&&Cee(t)&&Rw(t).position==="static";)t=Vq(t,s);return t&&(oN(t)==="html"||oN(t)==="body"&&Rw(t).position==="static"&&!fk(t))?n:t||Pee(e)||n}const jee=async function(e){const s=this.getOffsetParent||MZ,n=this.getDimensions;return{reference:zee(e.reference,await s(e.floating),e.strategy),floating:{x:0,y:0,...await n(e.floating)}}};function kee(e){return Rw(e).direction==="rtl"}const qee={convertOffsetParentRelativeRectToViewportRelativeRect:Bee,getDocumentElement:EN,getClippingRect:Wee,getOffsetParent:MZ,getElementRects:jee,getClientRects:Hee,getDimensions:Yee,getScale:x9,isElement:iA,isRTL:kee},xZ=bee,UZ=Nee,BZ=Oee,HZ=(e,s,n)=>{const t=new Map,u={platform:qee,...n},o={...u.platform,_c:t};return See(e,s,{...u,platform:o})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const iV=globalThis,Ik=iV.ShadowRoot&&(iV.ShadyCSS===void 0||iV.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yk=Symbol(),Wq=new WeakMap;let FZ=class{constructor(s,n,t){if(this._$cssResult$=!0,t!==yk)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=n}get styleSheet(){let s=this.o;const n=this.t;if(Ik&&s===void 0){const t=n!==void 0&&n.length===1;t&&(s=Wq.get(n)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&Wq.set(n,s))}return s}toString(){return this.cssText}};const $ee=e=>new FZ(typeof e=="string"?e:e+"",void 0,yk),ur=(e,...s)=>{const n=e.length===1?e[0]:s.reduce((t,u,o)=>t+(f=>{if(f._$cssResult$===!0)return f.cssText;if(typeof f=="number")return f;throw Error("Value passed to 'css' function must be a 'css' function result: "+f+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(u)+e[o+1],e[0]);return new FZ(n,e,yk)},Kee=(e,s)=>{if(Ik)e.adoptedStyleSheets=s.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of s){const t=document.createElement("style"),u=iV.litNonce;u!==void 0&&t.setAttribute("nonce",u),t.textContent=n.cssText,e.appendChild(t)}},Yq=Ik?e=>e:e=>e instanceof CSSStyleSheet?(s=>{let n="";for(const t of s.cssRules)n+=t.cssText;return $ee(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qee,defineProperty:Zee,getOwnPropertyDescriptor:Jee,getOwnPropertyNames:Xee,getOwnPropertySymbols:vee,getPrototypeOf:ete}=Object,z9=globalThis,zq=z9.trustedTypes,tte=zq?zq.emptyScript:"",jq=z9.reactiveElementPolyfillSupport,OF=(e,s)=>e,$V={toAttribute(e,s){switch(s){case Boolean:e=e?tte:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,s){let n=e;switch(s){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},wk=(e,s)=>!Qee(e,s),kq={attribute:!0,type:String,converter:$V,reflect:!1,hasChanged:wk};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),z9.litPropertyMetadata??(z9.litPropertyMetadata=new WeakMap);let vP=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??(this.l=[])).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,n=kq){if(n.state&&(n.attribute=!1),this._$Ei(),this.elementProperties.set(s,n),!n.noAccessor){const t=Symbol(),u=this.getPropertyDescriptor(s,t,n);u!==void 0&&Zee(this.prototype,s,u)}}static getPropertyDescriptor(s,n,t){const{get:u,set:o}=Jee(this.prototype,s)??{get(){return this[n]},set(f){this[n]=f}};return{get(){return u==null?void 0:u.call(this)},set(f){const d=u==null?void 0:u.call(this);o.call(this,f),this.requestUpdate(s,d,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??kq}static _$Ei(){if(this.hasOwnProperty(OF("elementProperties")))return;const s=ete(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(OF("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(OF("properties"))){const n=this.properties,t=[...Xee(n),...vee(n)];for(const u of t)this.createProperty(u,n[u])}const s=this[Symbol.metadata];if(s!==null){const n=litPropertyMetadata.get(s);if(n!==void 0)for(const[t,u]of n)this.elementProperties.set(t,u)}this._$Eh=new Map;for(const[n,t]of this.elementProperties){const u=this._$Eu(n,t);u!==void 0&&this._$Eh.set(u,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const n=[];if(Array.isArray(s)){const t=new Set(s.flat(1/0).reverse());for(const u of t)n.unshift(Yq(u))}else s!==void 0&&n.push(Yq(s));return n}static _$Eu(s,n){const t=n.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var s;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(s=this.constructor.l)==null||s.forEach(n=>n(this))}addController(s){var n;(this._$EO??(this._$EO=new Set)).add(s),this.renderRoot!==void 0&&this.isConnected&&((n=s.hostConnected)==null||n.call(s))}removeController(s){var n;(n=this._$EO)==null||n.delete(s)}_$E_(){const s=new Map,n=this.constructor.elementProperties;for(const t of n.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Kee(s,this.constructor.elementStyles),s}connectedCallback(){var s;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(s=this._$EO)==null||s.forEach(n=>{var t;return(t=n.hostConnected)==null?void 0:t.call(n)})}enableUpdating(s){}disconnectedCallback(){var s;(s=this._$EO)==null||s.forEach(n=>{var t;return(t=n.hostDisconnected)==null?void 0:t.call(n)})}attributeChangedCallback(s,n,t){this._$AK(s,t)}_$EC(s,n){var t;const u=this.constructor.elementProperties.get(s),o=this.constructor._$Eu(s,u);if(o!==void 0&&u.reflect===!0){const f=(((t=u.converter)==null?void 0:t.toAttribute)!==void 0?u.converter:$V).toAttribute(n,u.type);this._$Em=s,f==null?this.removeAttribute(o):this.setAttribute(o,f),this._$Em=null}}_$AK(s,n){var t;const u=this.constructor,o=u._$Eh.get(s);if(o!==void 0&&this._$Em!==o){const f=u.getPropertyOptions(o),d=typeof f.converter=="function"?{fromAttribute:f.converter}:((t=f.converter)==null?void 0:t.fromAttribute)!==void 0?f.converter:$V;this._$Em=o,this[o]=d.fromAttribute(n,f.type),this._$Em=null}}requestUpdate(s,n,t){if(s!==void 0){if(t??(t=this.constructor.getPropertyOptions(s)),!(t.hasChanged??wk)(this[s],n))return;this.P(s,n,t)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(s,n,t){this._$AL.has(s)||this._$AL.set(s,n),t.reflect===!0&&this._$Em!==s&&(this._$Ej??(this._$Ej=new Set)).add(s)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,f]of this._$Ep)this[o]=f;this._$Ep=void 0}const u=this.constructor.elementProperties;if(u.size>0)for(const[o,f]of u)f.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],f)}let n=!1;const t=this._$AL;try{n=this.shouldUpdate(t),n?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(u=>{var o;return(o=u.hostUpdate)==null?void 0:o.call(u)}),this.update(t)):this._$EU()}catch(u){throw n=!1,this._$EU(),u}n&&this._$AE(t)}willUpdate(s){}_$AE(s){var n;(n=this._$EO)==null||n.forEach(t=>{var u;return(u=t.hostUpdated)==null?void 0:u.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Ej&&(this._$Ej=this._$Ej.forEach(n=>this._$EC(n,this[n]))),this._$EU()}updated(s){}firstUpdated(s){}};vP.elementStyles=[],vP.shadowRootOptions={mode:"open"},vP[OF("elementProperties")]=new Map,vP[OF("finalized")]=new Map,jq==null||jq({ReactiveElement:vP}),(z9.reactiveElementVersions??(z9.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const KV=globalThis,QV=KV.trustedTypes,qq=QV?QV.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ek="$lit$",f7=`lit$${Math.random().toFixed(9).slice(2)}$`,pk="?"+f7,nte=`<${pk}>`,vO=document,FF=()=>vO.createComment(""),GF=e=>e===null||typeof e!="object"&&typeof e!="function",GZ=Array.isArray,_Z=e=>GZ(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",OY=`[ 	
\f\r]`,mH=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$q=/-->/g,Kq=/>/g,U8=RegExp(`>|${OY}(?:([^\\s"'>=/]+)(${OY}*=${OY}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qq=/'/g,Zq=/"/g,VZ=/^(?:script|style|textarea|title)$/i,ste=e=>(s,...n)=>({_$litType$:e,strings:s,values:n}),Xn=ste(1),eL=Symbol.for("lit-noChange"),Ia=Symbol.for("lit-nothing"),Jq=new WeakMap,xO=vO.createTreeWalker(vO,129);function WZ(e,s){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return qq!==void 0?qq.createHTML(s):s}const YZ=(e,s)=>{const n=e.length-1,t=[];let u,o=s===2?"<svg>":"",f=mH;for(let d=0;d<n;d++){const m=e[d];let D,P,x=-1,H=0;for(;H<m.length&&(f.lastIndex=H,P=f.exec(m),P!==null);)H=f.lastIndex,f===mH?P[1]==="!--"?f=$q:P[1]!==void 0?f=Kq:P[2]!==void 0?(VZ.test(P[2])&&(u=RegExp("</"+P[2],"g")),f=U8):P[3]!==void 0&&(f=U8):f===U8?P[0]===">"?(f=u??mH,x=-1):P[1]===void 0?x=-2:(x=f.lastIndex-P[2].length,D=P[1],f=P[3]===void 0?U8:P[3]==='"'?Zq:Qq):f===Zq||f===Qq?f=U8:f===$q||f===Kq?f=mH:(f=U8,u=void 0);const _=f===U8&&e[d+1].startsWith("/>")?" ":"";o+=f===mH?m+nte:x>=0?(t.push(D),m.slice(0,x)+Ek+m.slice(x)+f7+_):m+f7+(x===-2?d:_)}return[WZ(e,o+(e[n]||"<?>")+(s===2?"</svg>":"")),t]};let $z=class zZ{constructor({strings:s,_$litType$:n},t){let u;this.parts=[];let o=0,f=0;const d=s.length-1,m=this.parts,[D,P]=YZ(s,n);if(this.el=zZ.createElement(D,t),xO.currentNode=this.el.content,n===2){const x=this.el.content.firstChild;x.replaceWith(...x.childNodes)}for(;(u=xO.nextNode())!==null&&m.length<d;){if(u.nodeType===1){if(u.hasAttributes())for(const x of u.getAttributeNames())if(x.endsWith(Ek)){const H=P[f++],_=u.getAttribute(x).split(f7),ne=/([.?@])?(.*)/.exec(H);m.push({type:1,index:o,name:ne[2],strings:_,ctor:ne[1]==="."?qZ:ne[1]==="?"?$Z:ne[1]==="@"?KZ:IG}),u.removeAttribute(x)}else x.startsWith(f7)&&(m.push({type:6,index:o}),u.removeAttribute(x));if(VZ.test(u.tagName)){const x=u.textContent.split(f7),H=x.length-1;if(H>0){u.textContent=QV?QV.emptyScript:"";for(let _=0;_<H;_++)u.append(x[_],FF()),xO.nextNode(),m.push({type:2,index:++o});u.append(x[H],FF())}}}else if(u.nodeType===8)if(u.data===pk)m.push({type:2,index:o});else{let x=-1;for(;(x=u.data.indexOf(f7,x+1))!==-1;)m.push({type:7,index:o}),x+=f7.length-1}o++}}static createElement(s,n){const t=vO.createElement("template");return t.innerHTML=s,t}};function tL(e,s,n=e,t){var u,o;if(s===eL)return s;let f=t!==void 0?(u=n._$Co)==null?void 0:u[t]:n._$Cl;const d=GF(s)?void 0:s._$litDirective$;return(f==null?void 0:f.constructor)!==d&&((o=f==null?void 0:f._$AO)==null||o.call(f,!1),d===void 0?f=void 0:(f=new d(e),f._$AT(e,n,t)),t!==void 0?(n._$Co??(n._$Co=[]))[t]=f:n._$Cl=f),f!==void 0&&(s=tL(e,f._$AS(e,s.values),f,t)),s}let jZ=class{constructor(s,n){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){const{el:{content:n},parts:t}=this._$AD,u=((s==null?void 0:s.creationScope)??vO).importNode(n,!0);xO.currentNode=u;let o=xO.nextNode(),f=0,d=0,m=t[0];for(;m!==void 0;){if(f===m.index){let D;m.type===2?D=new yW(o,o.nextSibling,this,s):m.type===1?D=new m.ctor(o,m.name,m.strings,this,s):m.type===6&&(D=new QZ(o,this,s)),this._$AV.push(D),m=t[++d]}f!==(m==null?void 0:m.index)&&(o=xO.nextNode(),f++)}return xO.currentNode=vO,u}p(s){let n=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,n),n+=t.strings.length-2):t._$AI(s[n])),n++}},yW=class kZ{get _$AU(){var s;return((s=this._$AM)==null?void 0:s._$AU)??this._$Cv}constructor(s,n,t,u){this.type=2,this._$AH=Ia,this._$AN=void 0,this._$AA=s,this._$AB=n,this._$AM=t,this.options=u,this._$Cv=(u==null?void 0:u.isConnected)??!0}get parentNode(){let s=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(s==null?void 0:s.nodeType)===11&&(s=n.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,n=this){s=tL(this,s,n),GF(s)?s===Ia||s==null||s===""?(this._$AH!==Ia&&this._$AR(),this._$AH=Ia):s!==this._$AH&&s!==eL&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):_Z(s)?this.k(s):this._(s)}S(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.S(s))}_(s){this._$AH!==Ia&&GF(this._$AH)?this._$AA.nextSibling.data=s:this.T(vO.createTextNode(s)),this._$AH=s}$(s){var n;const{values:t,_$litType$:u}=s,o=typeof u=="number"?this._$AC(s):(u.el===void 0&&(u.el=$z.createElement(WZ(u.h,u.h[0]),this.options)),u);if(((n=this._$AH)==null?void 0:n._$AD)===o)this._$AH.p(t);else{const f=new jZ(o,this),d=f.u(this.options);f.p(t),this.T(d),this._$AH=f}}_$AC(s){let n=Jq.get(s.strings);return n===void 0&&Jq.set(s.strings,n=new $z(s)),n}k(s){GZ(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let t,u=0;for(const o of s)u===n.length?n.push(t=new kZ(this.S(FF()),this.S(FF()),this,this.options)):t=n[u],t._$AI(o),u++;u<n.length&&(this._$AR(t&&t._$AB.nextSibling,u),n.length=u)}_$AR(s=this._$AA.nextSibling,n){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,n);s&&s!==this._$AB;){const u=s.nextSibling;s.remove(),s=u}}setConnected(s){var n;this._$AM===void 0&&(this._$Cv=s,(n=this._$AP)==null||n.call(this,s))}},IG=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,n,t,u,o){this.type=1,this._$AH=Ia,this._$AN=void 0,this.element=s,this.name=n,this._$AM=u,this.options=o,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=Ia}_$AI(s,n=this,t,u){const o=this.strings;let f=!1;if(o===void 0)s=tL(this,s,n,0),f=!GF(s)||s!==this._$AH&&s!==eL,f&&(this._$AH=s);else{const d=s;let m,D;for(s=o[0],m=0;m<o.length-1;m++)D=tL(this,d[t+m],n,m),D===eL&&(D=this._$AH[m]),f||(f=!GF(D)||D!==this._$AH[m]),D===Ia?s=Ia:s!==Ia&&(s+=(D??"")+o[m+1]),this._$AH[m]=D}f&&!u&&this.j(s)}j(s){s===Ia?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},qZ=class extends IG{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===Ia?void 0:s}},$Z=class extends IG{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==Ia)}},KZ=class extends IG{constructor(s,n,t,u,o){super(s,n,t,u,o),this.type=5}_$AI(s,n=this){if((s=tL(this,s,n,0)??Ia)===eL)return;const t=this._$AH,u=s===Ia&&t!==Ia||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,o=s!==Ia&&(t===Ia||u);u&&this.element.removeEventListener(this.name,this,t),o&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,s):this._$AH.handleEvent(s)}},QZ=class{constructor(s,n,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=n,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){tL(this,s)}};const lte={P:Ek,A:f7,C:pk,M:1,L:YZ,R:jZ,D:_Z,V:tL,I:yW,H:IG,N:$Z,U:KZ,B:qZ,F:QZ},Xq=KV.litHtmlPolyfillSupport;Xq==null||Xq($z,yW),(KV.litHtmlVersions??(KV.litHtmlVersions=[])).push("3.1.3");const ZV=(e,s,n)=>{const t=(n==null?void 0:n.renderBefore)??s;let u=t._$litPart$;if(u===void 0){const o=(n==null?void 0:n.renderBefore)??null;t._$litPart$=u=new yW(s.insertBefore(FF(),o),o,void 0,n??{})}return u._$AI(e),u};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ql=class extends vP{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const s=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=s.firstChild),s}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ZV(s,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return eL}};var vq;ql._$litElement$=!0,ql.finalized=!0,(vq=globalThis.litElementHydrateSupport)==null||vq.call(globalThis,{LitElement:ql});const e$=globalThis.litElementPolyfillSupport;e$==null||e$({LitElement:ql});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rte={attribute:!0,type:String,converter:$V,reflect:!1,hasChanged:wk},ite=(e=rte,s,n)=>{const{kind:t,metadata:u}=n;let o=globalThis.litPropertyMetadata.get(u);if(o===void 0&&globalThis.litPropertyMetadata.set(u,o=new Map),o.set(n.name,e),t==="accessor"){const{name:f}=n;return{set(d){const m=s.get.call(this);s.set.call(this,d),this.requestUpdate(f,m,e)},init(d){return d!==void 0&&this.P(f,void 0,e),d}}}if(t==="setter"){const{name:f}=n;return function(d){const m=this[f];s.call(this,d),this.requestUpdate(f,m,e)}}throw Error("Unsupported decorator location: "+t)};function Vt(e){return(s,n)=>typeof n=="object"?ite(e,s,n):((t,u,o)=>{const f=u.hasOwnProperty(o);return u.constructor.createProperty(o,f?{...t,wrapped:!0}:t),f?Object.getOwnPropertyDescriptor(u,o):void 0})(e,s,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function yG(e){return Vt({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:ute}=lte,t$=(e,s)=>(e==null?void 0:e._$litType$)!==void 0,ate=e=>{var s;return((s=e==null?void 0:e._$litType$)==null?void 0:s.h)!=null},ote=e=>e.strings===void 0,n$=()=>document.createComment(""),s$=(e,s,n)=>{var t;const u=e._$AA.parentNode,o=e._$AB;if(n===void 0){const f=u.insertBefore(n$(),o),d=u.insertBefore(n$(),o);n=new ute(f,d,e,e.options)}else{const f=n._$AB.nextSibling,d=n._$AM,m=d!==e;if(m){let D;(t=n._$AQ)==null||t.call(n,e),n._$AM=e,n._$AP!==void 0&&(D=e._$AU)!==d._$AU&&n._$AP(D)}if(f!==o||m){let D=n._$AA;for(;D!==f;){const P=D.nextSibling;u.insertBefore(D,o),D=P}}}return n},cte={},l$=(e,s=cte)=>e._$AH=s,r$=e=>e._$AH,hte=e=>{e._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ZZ={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Tk=e=>(...s)=>({_$litDirective$:e,values:s});let mk=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,n,t){this._$Ct=s,this._$AM=n,this._$Ci=t}_$AS(s,n){return this.update(s,n)}update(s,n){return this.render(...n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const LF=(e,s)=>{var n;const t=e._$AN;if(t===void 0)return!1;for(const u of t)(n=u._$AO)==null||n.call(u,s,!1),LF(u,s);return!0},JV=e=>{let s,n;do{if((s=e._$AM)===void 0)break;n=s._$AN,n.delete(e),e=s}while((n==null?void 0:n.size)===0)},JZ=e=>{for(let s;s=e._$AM;e=s){let n=s._$AN;if(n===void 0)s._$AN=n=new Set;else if(n.has(e))break;n.add(e),Ite(s)}};function fte(e){this._$AN!==void 0?(JV(this),this._$AM=e,JZ(this)):this._$AM=e}function dte(e,s=!1,n=0){const t=this._$AH,u=this._$AN;if(u!==void 0&&u.size!==0)if(s)if(Array.isArray(t))for(let o=n;o<t.length;o++)LF(t[o],!1),JV(t[o]);else t!=null&&(LF(t,!1),JV(t));else LF(this,e)}const Ite=e=>{e.type==ZZ.CHILD&&(e._$AP??(e._$AP=dte),e._$AQ??(e._$AQ=fte))};let yte=class extends mk{constructor(){super(...arguments),this._$AN=void 0}_$AT(s,n,t){super._$AT(s,n,t),JZ(this),this.isConnected=s._$AU}_$AO(s,n=!0){var t,u;s!==this.isConnected&&(this.isConnected=s,s?(t=this.reconnected)==null||t.call(this):(u=this.disconnected)==null||u.call(this)),n&&(LF(this,s),JV(this))}setValue(s){if(ote(this._$Ct))this._$Ct._$AI(s,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=s,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tN=()=>new wte;let wte=class{};const LY=new WeakMap,z7=Tk(class extends yte{render(e){return Ia}update(e,[s]){var n;const t=s!==this.Y;return t&&this.Y!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.Y=s,this.ht=(n=e.options)==null?void 0:n.host,this.rt(this.ct=e.element)),Ia}rt(e){if(typeof this.Y=="function"){const s=this.ht??globalThis;let n=LY.get(s);n===void 0&&(n=new WeakMap,LY.set(s,n)),n.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),n.set(this.Y,e),e!==void 0&&this.Y.call(this.ht,e)}else this.Y.value=e}get lt(){var e,s;return typeof this.Y=="function"?(e=LY.get(this.ht??globalThis))==null?void 0:e.get(this.Y):(s=this.Y)==null?void 0:s.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.0.0
*/const XZ=Object.freeze({left:0,top:0,width:16,height:16}),XV=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),wG=Object.freeze({...XZ,...XV}),Kz=Object.freeze({...wG,body:"",hidden:!1}),Ete=Object.freeze({width:null,height:null}),vZ=Object.freeze({...Ete,...XV});function pte(e,s=0){const n=e.replace(/^-?[0-9.]*/,"");function t(u){for(;u<0;)u+=4;return u%4}if(n===""){const u=parseInt(e);return isNaN(u)?0:t(u)}else if(n!==e){let u=0;switch(n){case"%":u=25;break;case"deg":u=90}if(u){let o=parseFloat(e.slice(0,e.length-n.length));return isNaN(o)?0:(o=o/u,o%1===0?t(o):0)}}return s}const Tte=/[\s,]+/;function mte(e,s){s.split(Tte).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}const eJ={...vZ,preserveAspectRatio:""};function i$(e){const s={...eJ},n=(t,u)=>e.getAttribute(t)||u;return s.width=n("width",null),s.height=n("height",null),s.rotate=pte(n("rotate","")),mte(s,n("flip","")),s.preserveAspectRatio=n("preserveAspectRatio",n("preserveaspectratio","")),s}function Rte(e,s){for(const n in eJ)if(e[n]!==s[n])return!0;return!1}const bF=/^[a-z0-9]+(-[a-z0-9]+)*$/,EG=(e,s,n,t="")=>{const u=e.split(":");if(e.slice(0,1)==="@"){if(u.length<2||u.length>3)return null;t=u.shift().slice(1)}if(u.length>3||!u.length)return null;if(u.length>1){const d=u.pop(),m=u.pop(),D={provider:u.length>0?u[0]:t,prefix:m,name:d};return s&&!uV(D)?null:D}const o=u[0],f=o.split("-");if(f.length>1){const d={provider:t,prefix:f.shift(),name:f.join("-")};return s&&!uV(d)?null:d}if(n&&t===""){const d={provider:t,prefix:"",name:o};return s&&!uV(d,n)?null:d}return null},uV=(e,s)=>e?!!((e.provider===""||e.provider.match(bF))&&(s&&e.prefix===""||e.prefix.match(bF))&&e.name.match(bF)):!1;function Ate(e,s){const n={};!e.hFlip!=!s.hFlip&&(n.hFlip=!0),!e.vFlip!=!s.vFlip&&(n.vFlip=!0);const t=((e.rotate||0)+(s.rotate||0))%4;return t&&(n.rotate=t),n}function u$(e,s){const n=Ate(e,s);for(const t in Kz)t in XV?t in e&&!(t in n)&&(n[t]=XV[t]):t in s?n[t]=s[t]:t in e&&(n[t]=e[t]);return n}function Dte(e,s){const n=e.icons,t=e.aliases||Object.create(null),u=Object.create(null);function o(f){if(n[f])return u[f]=[];if(!(f in u)){u[f]=null;const d=t[f]&&t[f].parent,m=d&&o(d);m&&(u[f]=[d].concat(m))}return u[f]}return Object.keys(n).concat(Object.keys(t)).forEach(o),u}function Ste(e,s,n){const t=e.icons,u=e.aliases||Object.create(null);let o={};function f(d){o=u$(t[d]||u[d],o)}return f(s),n.forEach(f),u$(e,o)}function tJ(e,s){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(u=>{s(u,null),n.push(u)});const t=Dte(e);for(const u in t){const o=t[u];o&&(s(u,Ste(e,u,o)),n.push(u))}return n}const Nte={provider:"",aliases:{},not_found:{},...XZ};function bY(e,s){for(const n in s)if(n in e&&typeof e[n]!=typeof s[n])return!1;return!0}function nJ(e){if(typeof e!="object"||e===null)return null;const s=e;if(typeof s.prefix!="string"||!e.icons||typeof e.icons!="object"||!bY(e,Nte))return null;const n=s.icons;for(const u in n){const o=n[u];if(!u.match(bF)||typeof o.body!="string"||!bY(o,Kz))return null}const t=s.aliases||Object.create(null);for(const u in t){const o=t[u],f=o.parent;if(!u.match(bF)||typeof f!="string"||!n[f]&&!t[f]||!bY(o,Kz))return null}return s}const vV=Object.create(null);function gte(e,s){return{provider:e,prefix:s,icons:Object.create(null),missing:new Set}}function cN(e,s){const n=vV[e]||(vV[e]=Object.create(null));return n[s]||(n[s]=gte(e,s))}function Rk(e,s){return nJ(s)?tJ(s,(n,t)=>{t?e.icons[n]=t:e.missing.add(n)}):[]}function Ote(e,s,n){try{if(typeof n.body=="string")return e.icons[s]={...n},!0}catch{}return!1}function Lte(e,s){let n=[];return(typeof e=="string"?[e]:Object.keys(vV)).forEach(t=>{(typeof t=="string"&&typeof s=="string"?[s]:Object.keys(vV[t]||{})).forEach(u=>{const o=cN(t,u);n=n.concat(Object.keys(o.icons).map(f=>(t!==""?"@"+t+":":"")+u+":"+f))})}),n}let _F=!1;function sJ(e){return typeof e=="boolean"&&(_F=e),_F}function VF(e){const s=typeof e=="string"?EG(e,!0,_F):e;if(s){const n=cN(s.provider,s.prefix),t=s.name;return n.icons[t]||(n.missing.has(t)?null:void 0)}}function lJ(e,s){const n=EG(e,!0,_F);if(!n)return!1;const t=cN(n.provider,n.prefix);return Ote(t,n.name,s)}function a$(e,s){if(typeof e!="object")return!1;if(typeof s!="string"&&(s=e.provider||""),_F&&!s&&!e.prefix){let u=!1;return nJ(e)&&(e.prefix="",tJ(e,(o,f)=>{f&&lJ(o,f)&&(u=!0)})),u}const n=e.prefix;if(!uV({provider:s,prefix:n,name:"a"}))return!1;const t=cN(s,n);return!!Rk(t,e)}function o$(e){return!!VF(e)}function bte(e){const s=VF(e);return s?{...wG,...s}:null}function Cte(e){const s={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((u,o)=>u.provider!==o.provider?u.provider.localeCompare(o.provider):u.prefix!==o.prefix?u.prefix.localeCompare(o.prefix):u.name.localeCompare(o.name));let t={provider:"",prefix:"",name:""};return e.forEach(u=>{if(t.name===u.name&&t.prefix===u.prefix&&t.provider===u.provider)return;t=u;const o=u.provider,f=u.prefix,d=u.name,m=n[o]||(n[o]=Object.create(null)),D=m[f]||(m[f]=cN(o,f));let P;d in D.icons?P=s.loaded:f===""||D.missing.has(d)?P=s.missing:P=s.pending;const x={provider:o,prefix:f,name:d};P.push(x)}),s}function rJ(e,s){e.forEach(n=>{const t=n.loaderCallbacks;t&&(n.loaderCallbacks=t.filter(u=>u.id!==s))})}function Pte(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const s=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!s.length)return;let n=!1;const t=e.provider,u=e.prefix;s.forEach(o=>{const f=o.icons,d=f.pending.length;f.pending=f.pending.filter(m=>{if(m.prefix!==u)return!0;const D=m.name;if(e.icons[D])f.loaded.push({provider:t,prefix:u,name:D});else if(e.missing.has(D))f.missing.push({provider:t,prefix:u,name:D});else return n=!0,!0;return!1}),f.pending.length!==d&&(n||rJ([e],o.id),o.callback(f.loaded.slice(0),f.missing.slice(0),f.pending.slice(0),o.abort))})}))}let Mte=0;function xte(e,s,n){const t=Mte++,u=rJ.bind(null,n,t);if(!s.pending.length)return u;const o={id:t,icons:s,callback:e,abort:u};return n.forEach(f=>{(f.loaderCallbacks||(f.loaderCallbacks=[])).push(o)}),u}const Qz=Object.create(null);function c$(e,s){Qz[e]=s}function Zz(e){return Qz[e]||Qz[""]}function Ute(e,s=!0,n=!1){const t=[];return e.forEach(u=>{const o=typeof u=="string"?EG(u,s,n):u;o&&t.push(o)}),t}var Bte={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Hte(e,s,n,t){const u=e.resources.length,o=e.random?Math.floor(Math.random()*u):e.index;let f;if(e.random){let Ee=e.resources.slice(0);for(f=[];Ee.length>1;){const Ae=Math.floor(Math.random()*Ee.length);f.push(Ee[Ae]),Ee=Ee.slice(0,Ae).concat(Ee.slice(Ae+1))}f=f.concat(Ee)}else f=e.resources.slice(o).concat(e.resources.slice(0,o));const d=Date.now();let m="pending",D=0,P,x=null,H=[],_=[];typeof t=="function"&&_.push(t);function ne(){x&&(clearTimeout(x),x=null)}function re(){m==="pending"&&(m="aborted"),ne(),H.forEach(Ee=>{Ee.status==="pending"&&(Ee.status="aborted")}),H=[]}function J(Ee,Ae){Ae&&(_=[]),typeof Ee=="function"&&_.push(Ee)}function K(){return{startTime:d,payload:s,status:m,queriesSent:D,queriesPending:H.length,subscribe:J,abort:re}}function Ie(){m="failed",_.forEach(Ee=>{Ee(void 0,P)})}function ce(){H.forEach(Ee=>{Ee.status==="pending"&&(Ee.status="aborted")}),H=[]}function ae(Ee,Ae,Me){const we=Ae!=="success";switch(H=H.filter(Te=>Te!==Ee),m){case"pending":break;case"failed":if(we||!e.dataAfterTimeout)return;break;default:return}if(Ae==="abort"){P=Me,Ie();return}if(we){P=Me,H.length||(f.length?me():Ie());return}if(ne(),ce(),!e.random){const Te=e.resources.indexOf(Ee.resource);Te!==-1&&Te!==e.index&&(e.index=Te)}m="completed",_.forEach(Te=>{Te(Me)})}function me(){if(m!=="pending")return;ne();const Ee=f.shift();if(Ee===void 0){if(H.length){x=setTimeout(()=>{ne(),m==="pending"&&(ce(),Ie())},e.timeout);return}Ie();return}const Ae={status:"pending",resource:Ee,callback:(Me,we)=>{ae(Ae,Me,we)}};H.push(Ae),D++,x=setTimeout(me,e.rotate),n(Ee,s,Ae.callback)}return setTimeout(me),K}function iJ(e){const s={...Bte,...e};let n=[];function t(){n=n.filter(f=>f().status==="pending")}function u(f,d,m){const D=Hte(s,f,d,(P,x)=>{t(),m&&m(P,x)});return n.push(D),D}function o(f){return n.find(d=>f(d))||null}return{query:u,find:o,setIndex:f=>{s.index=f},getIndex:()=>s.index,cleanup:t}}function Ak(e){let s;if(typeof e.resources=="string")s=[e.resources];else if(s=e.resources,!(s instanceof Array)||!s.length)return null;return{resources:s,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const wW=Object.create(null),VG=["https://api.simplesvg.com","https://api.unisvg.com"],Jz=[];for(;VG.length>0;)VG.length===1||Math.random()>.5?Jz.push(VG.shift()):Jz.push(VG.pop());wW[""]=Ak({resources:["https://api.iconify.design"].concat(Jz)});function h$(e,s){const n=Ak(s);return n===null?!1:(wW[e]=n,!0)}function EW(e){return wW[e]}function Fte(){return Object.keys(wW)}function f$(){}const CY=Object.create(null);function Gte(e){if(!CY[e]){const s=EW(e);if(!s)return;const n=iJ(s),t={config:s,redundancy:n};CY[e]=t}return CY[e]}function uJ(e,s,n){let t,u;if(typeof e=="string"){const o=Zz(e);if(!o)return n(void 0,424),f$;u=o.send;const f=Gte(e);f&&(t=f.redundancy)}else{const o=Ak(e);if(o){t=iJ(o);const f=e.resources?e.resources[0]:"",d=Zz(f);d&&(u=d.send)}}return!t||!u?(n(void 0,424),f$):t.query(s,u,n)().abort}const d$="iconify2",WF="iconify",aJ=WF+"-count",I$=WF+"-version",oJ=36e5,_te=168,Vte=50;function Xz(e,s){try{return e.getItem(s)}catch{}}function Dk(e,s,n){try{return e.setItem(s,n),!0}catch{}}function y$(e,s){try{e.removeItem(s)}catch{}}function vz(e,s){return Dk(e,aJ,s.toString())}function ej(e){return parseInt(Xz(e,aJ))||0}const UO={local:!0,session:!0},cJ={local:new Set,session:new Set};let Sk=!1;function Wte(e){Sk=e}let WG=typeof window>"u"?{}:window;function hJ(e){const s=e+"Storage";try{if(WG&&WG[s]&&typeof WG[s].length=="number")return WG[s]}catch{}UO[e]=!1}function fJ(e,s){const n=hJ(e);if(!n)return;const t=Xz(n,I$);if(t!==d$){if(t){const d=ej(n);for(let m=0;m<d;m++)y$(n,WF+m.toString())}Dk(n,I$,d$),vz(n,0);return}const u=Math.floor(Date.now()/oJ)-_te,o=d=>{const m=WF+d.toString(),D=Xz(n,m);if(typeof D=="string"){try{const P=JSON.parse(D);if(typeof P=="object"&&typeof P.cached=="number"&&P.cached>u&&typeof P.provider=="string"&&typeof P.data=="object"&&typeof P.data.prefix=="string"&&s(P,d))return!0}catch{}y$(n,m)}};let f=ej(n);for(let d=f-1;d>=0;d--)o(d)||(d===f-1?(f--,vz(n,f)):cJ[e].add(d))}function dJ(){if(!Sk){Wte(!0);for(const e in UO)fJ(e,s=>{const n=s.data,t=s.provider,u=n.prefix,o=cN(t,u);if(!Rk(o,n).length)return!1;const f=n.lastModified||-1;return o.lastModifiedCached=o.lastModifiedCached?Math.min(o.lastModifiedCached,f):f,!0})}}function Yte(e,s){const n=e.lastModifiedCached;if(n&&n>=s)return n===s;if(e.lastModifiedCached=s,n)for(const t in UO)fJ(t,u=>{const o=u.data;return u.provider!==e.provider||o.prefix!==e.prefix||o.lastModified===s});return!0}function zte(e,s){Sk||dJ();function n(t){let u;if(!UO[t]||!(u=hJ(t)))return;const o=cJ[t];let f;if(o.size)o.delete(f=Array.from(o).shift());else if(f=ej(u),f>=Vte||!vz(u,f+1))return;const d={cached:Math.floor(Date.now()/oJ),provider:e.provider,data:s};return Dk(u,WF+f.toString(),JSON.stringify(d))}s.lastModified&&!Yte(e,s.lastModified)||Object.keys(s.icons).length&&(s.not_found&&(s=Object.assign({},s),delete s.not_found),n("local")||n("session"))}function w$(){}function jte(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,Pte(e)}))}function kte(e,s){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(s).sort():e.iconsToLoad=s,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:t}=e,u=e.iconsToLoad;delete e.iconsToLoad;let o;!u||!(o=Zz(n))||o.prepare(n,t,u).forEach(f=>{uJ(n,f,d=>{if(typeof d!="object")f.icons.forEach(m=>{e.missing.add(m)});else try{const m=Rk(e,d);if(!m.length)return;const D=e.pendingIcons;D&&m.forEach(P=>{D.delete(P)}),zte(e,d)}catch(m){console.error(m)}jte(e)})})}))}const Nk=(e,s)=>{const n=Ute(e,!0,sJ()),t=Cte(n);if(!t.pending.length){let m=!0;return s&&setTimeout(()=>{m&&s(t.loaded,t.missing,t.pending,w$)}),()=>{m=!1}}const u=Object.create(null),o=[];let f,d;return t.pending.forEach(m=>{const{provider:D,prefix:P}=m;if(P===d&&D===f)return;f=D,d=P,o.push(cN(D,P));const x=u[D]||(u[D]=Object.create(null));x[P]||(x[P]=[])}),t.pending.forEach(m=>{const{provider:D,prefix:P,name:x}=m,H=cN(D,P),_=H.pendingIcons||(H.pendingIcons=new Set);_.has(x)||(_.add(x),u[D][P].push(x))}),o.forEach(m=>{const{provider:D,prefix:P}=m;u[D][P].length&&kte(m,u[D][P])}),s?xte(s,t,o):w$},qte=e=>new Promise((s,n)=>{const t=typeof e=="string"?EG(e,!0):e;if(!t){n(e);return}Nk([t||e],u=>{if(u.length&&t){const o=VF(t);if(o){s({...wG,...o});return}}n(e)})});function $te(e){try{const s=typeof e=="string"?JSON.parse(e):e;if(typeof s.body=="string")return{...s}}catch{}}function Kte(e,s){const n=typeof e=="string"?EG(e,!0,!0):null;if(!n){const o=$te(e);return{value:e,data:o}}const t=VF(n);if(t!==void 0||!n.prefix)return{value:e,name:n,data:t};const u=Nk([n],()=>s(e,n,VF(n)));return{value:e,name:n,loading:u}}function PY(e){return e.hasAttribute("inline")}let IJ=!1;try{IJ=navigator.vendor.indexOf("Apple")===0}catch{}function Qte(e,s){switch(s){case"svg":case"bg":case"mask":return s}return s!=="style"&&(IJ||e.indexOf("<a")===-1)?"svg":e.indexOf("currentColor")===-1?"bg":"mask"}const Zte=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Jte=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function tj(e,s,n){if(s===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*s*n)/n;if(typeof e!="string")return e;const t=e.split(Zte);if(t===null||!t.length)return e;const u=[];let o=t.shift(),f=Jte.test(o);for(;;){if(f){const d=parseFloat(o);isNaN(d)?u.push(o):u.push(Math.ceil(d*s*n)/n)}else u.push(o);if(o=t.shift(),o===void 0)return u.join("");f=!f}}function Xte(e,s="defs"){let n="";const t=e.indexOf("<"+s);for(;t>=0;){const u=e.indexOf(">",t),o=e.indexOf("</"+s);if(u===-1||o===-1)break;const f=e.indexOf(">",o);if(f===-1)break;n+=e.slice(u+1,o).trim(),e=e.slice(0,t).trim()+e.slice(f+1)}return{defs:n,content:e}}function vte(e,s){return e?"<defs>"+e+"</defs>"+s:s}function ene(e,s,n){const t=Xte(e);return vte(t.defs,s+t.content+n)}const tne=e=>e==="unset"||e==="undefined"||e==="none";function yJ(e,s){const n={...wG,...e},t={...vZ,...s},u={left:n.left,top:n.top,width:n.width,height:n.height};let o=n.body;[n,t].forEach(re=>{const J=[],K=re.hFlip,Ie=re.vFlip;let ce=re.rotate;K?Ie?ce+=2:(J.push("translate("+(u.width+u.left).toString()+" "+(0-u.top).toString()+")"),J.push("scale(-1 1)"),u.top=u.left=0):Ie&&(J.push("translate("+(0-u.left).toString()+" "+(u.height+u.top).toString()+")"),J.push("scale(1 -1)"),u.top=u.left=0);let ae;switch(ce<0&&(ce-=Math.floor(ce/4)*4),ce=ce%4,ce){case 1:ae=u.height/2+u.top,J.unshift("rotate(90 "+ae.toString()+" "+ae.toString()+")");break;case 2:J.unshift("rotate(180 "+(u.width/2+u.left).toString()+" "+(u.height/2+u.top).toString()+")");break;case 3:ae=u.width/2+u.left,J.unshift("rotate(-90 "+ae.toString()+" "+ae.toString()+")");break}ce%2===1&&(u.left!==u.top&&(ae=u.left,u.left=u.top,u.top=ae),u.width!==u.height&&(ae=u.width,u.width=u.height,u.height=ae)),J.length&&(o=ene(o,'<g transform="'+J.join(" ")+'">',"</g>"))});const f=t.width,d=t.height,m=u.width,D=u.height;let P,x;f===null?(x=d===null?"1em":d==="auto"?D:d,P=tj(x,m/D)):(P=f==="auto"?m:f,x=d===null?tj(P,D/m):d==="auto"?D:d);const H={},_=(re,J)=>{tne(J)||(H[re]=J.toString())};_("width",P),_("height",x);const ne=[u.left,u.top,m,D];return H.viewBox=ne.join(" "),{attributes:H,viewBox:ne,body:o}}function gk(e,s){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const t in s)n+=" "+t+'="'+s[t]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function nne(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function sne(e){return"data:image/svg+xml,"+nne(e)}function wJ(e){return'url("'+sne(e)+'")'}const lne=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let eW=lne();function rne(e){eW=e}function ine(){return eW}function une(e,s){const n=EW(e);if(!n)return 0;let t;if(!n.maxURL)t=0;else{let u=0;n.resources.forEach(f=>{u=Math.max(u,f.length)});const o=s+".json?icons=";t=n.maxURL-u-n.path.length-o.length}return t}function ane(e){return e===404}const one=(e,s,n)=>{const t=[],u=une(e,s),o="icons";let f={type:o,provider:e,prefix:s,icons:[]},d=0;return n.forEach((m,D)=>{d+=m.length+1,d>=u&&D>0&&(t.push(f),f={type:o,provider:e,prefix:s,icons:[]},d=m.length),f.icons.push(m)}),t.push(f),t};function cne(e){if(typeof e=="string"){const s=EW(e);if(s)return s.path}return"/"}const hne=(e,s,n)=>{if(!eW){n("abort",424);return}let t=cne(s.provider);switch(s.type){case"icons":{const o=s.prefix,f=s.icons.join(","),d=new URLSearchParams({icons:f});t+=o+".json?"+d.toString();break}case"custom":{const o=s.uri;t+=o.slice(0,1)==="/"?o.slice(1):o;break}default:n("abort",400);return}let u=503;eW(e+t).then(o=>{const f=o.status;if(f!==200){setTimeout(()=>{n(ane(f)?"abort":"next",f)});return}return u=501,o.json()}).then(o=>{if(typeof o!="object"||o===null){setTimeout(()=>{o===404?n("abort",o):n("next",u)});return}setTimeout(()=>{n("success",o)})}).catch(()=>{n("next",u)})},fne={prepare:one,send:hne};function E$(e,s){switch(e){case"local":case"session":UO[e]=s;break;case"all":for(const n in UO)UO[n]=s;break}}const MY="data-style";let EJ="";function dne(e){EJ=e}function p$(e,s){let n=Array.from(e.childNodes).find(t=>t.hasAttribute&&t.hasAttribute(MY));n||(n=document.createElement("style"),n.setAttribute(MY,MY),e.appendChild(n)),n.textContent=":host{display:inline-block;vertical-align:"+(s?"-0.125em":"0")+"}span,svg{display:block}"+EJ}function pJ(){c$("",fne),sJ(!0);let e;try{e=window}catch{}if(e){if(dJ(),e.IconifyPreload!==void 0){const s=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof s=="object"&&s!==null&&(s instanceof Array?s:[s]).forEach(t=>{try{(typeof t!="object"||t===null||t instanceof Array||typeof t.icons!="object"||typeof t.prefix!="string"||!a$(t))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const s=e.IconifyProviders;if(typeof s=="object"&&s!==null)for(const n in s){const t="IconifyProviders["+n+"] is invalid.";try{const u=s[n];if(typeof u!="object"||!u||u.resources===void 0)continue;h$(n,u)||console.error(t)}catch{console.error(t)}}}}return{enableCache:s=>E$(s,!0),disableCache:s=>E$(s,!1),iconLoaded:o$,iconExists:o$,getIcon:bte,listIcons:Lte,addIcon:lJ,addCollection:a$,calculateSize:tj,buildIcon:yJ,iconToHTML:gk,svgToURL:wJ,loadIcons:Nk,loadIcon:qte,addAPIProvider:h$,appendCustomStyle:dne,_api:{getAPIConfig:EW,setAPIModule:c$,sendAPIQuery:uJ,setFetch:rne,getFetch:ine,listAPIProviders:Fte}}}const nj={"background-color":"currentColor"},TJ={"background-color":"transparent"},T$={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},m$={"-webkit-mask":nj,mask:nj,background:TJ};for(const e in m$){const s=m$[e];for(const n in T$)s[e+"-"+n]=T$[n]}function R$(e){return e?e+(e.match(/^[-0-9.]+$/)?"px":""):"inherit"}function Ine(e,s,n){const t=document.createElement("span");let u=e.body;u.indexOf("<a")!==-1&&(u+="<!-- "+Date.now()+" -->");const o=e.attributes,f=gk(u,{...o,width:s.width+"",height:s.height+""}),d=wJ(f),m=t.style,D={"--svg":d,width:R$(o.width),height:R$(o.height),...n?nj:TJ};for(const P in D)m.setProperty(P,D[P]);return t}let CF;function yne(){try{CF=window.trustedTypes.createPolicy("iconify",{createHTML:e=>e})}catch{CF=null}}function wne(e){return CF===void 0&&yne(),CF?CF.createHTML(e):e}function Ene(e){const s=document.createElement("span"),n=e.attributes;let t="";n.width||(t="width: inherit;"),n.height||(t+="height: inherit;"),t&&(n.style=t);const u=gk(e.body,n);return s.innerHTML=wne(u),s.firstChild}function sj(e){return Array.from(e.childNodes).find(s=>{const n=s.tagName&&s.tagName.toUpperCase();return n==="SPAN"||n==="SVG"})}function A$(e,s){const n=s.icon.data,t=s.customisations,u=yJ(n,t);t.preserveAspectRatio&&(u.attributes.preserveAspectRatio=t.preserveAspectRatio);const o=s.renderedMode;let f;switch(o){case"svg":f=Ene(u);break;default:f=Ine(u,{...wG,...n},o==="mask")}const d=sj(e);d?f.tagName==="SPAN"&&d.tagName===f.tagName?d.setAttribute("style",f.getAttribute("style")):e.replaceChild(f,d):e.appendChild(f)}function D$(e,s,n){const t=n&&(n.rendered?n:n.lastRender);return{rendered:!1,inline:s,icon:e,lastRender:t}}function pne(e="iconify-icon"){let s,n;try{s=window.customElements,n=window.HTMLElement}catch{return}if(!s||!n)return;const t=s.get(e);if(t)return t;const u=["icon","mode","inline","observe","width","height","rotate","flip"],o=class extends n{constructor(){super(),x8(this,"_shadowRoot"),x8(this,"_initialised",!1),x8(this,"_state"),x8(this,"_checkQueued",!1),x8(this,"_connected",!1),x8(this,"_observer",null),x8(this,"_visible",!0);const d=this._shadowRoot=this.attachShadow({mode:"open"}),m=PY(this);p$(d,m),this._state=D$({value:""},m),this._queueCheck()}connectedCallback(){this._connected=!0,this.startObserver()}disconnectedCallback(){this._connected=!1,this.stopObserver()}static get observedAttributes(){return u.slice(0)}attributeChangedCallback(d){switch(d){case"inline":{const m=PY(this),D=this._state;m!==D.inline&&(D.inline=m,p$(this._shadowRoot,m));break}case"observer":{this.observer?this.startObserver():this.stopObserver();break}default:this._queueCheck()}}get icon(){const d=this.getAttribute("icon");if(d&&d.slice(0,1)==="{")try{return JSON.parse(d)}catch{}return d}set icon(d){typeof d=="object"&&(d=JSON.stringify(d)),this.setAttribute("icon",d)}get inline(){return PY(this)}set inline(d){d?this.setAttribute("inline","true"):this.removeAttribute("inline")}get observer(){return this.hasAttribute("observer")}set observer(d){d?this.setAttribute("observer","true"):this.removeAttribute("observer")}restartAnimation(){const d=this._state;if(d.rendered){const m=this._shadowRoot;if(d.renderedMode==="svg")try{m.lastChild.setCurrentTime(0);return}catch{}A$(m,d)}}get status(){const d=this._state;return d.rendered?"rendered":d.icon.data===null?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const d=this._state,m=this.getAttribute("icon");if(m!==d.icon.value){this._iconChanged(m);return}if(!d.rendered||!this._visible)return;const D=this.getAttribute("mode"),P=i$(this);(d.attrMode!==D||Rte(d.customisations,P)||!sj(this._shadowRoot))&&this._renderIcon(d.icon,P,D)}_iconChanged(d){const m=Kte(d,(D,P,x)=>{const H=this._state;if(H.rendered||this.getAttribute("icon")!==D)return;const _={value:D,name:P,data:x};_.data?this._gotIconData(_):H.icon=_});m.data?this._gotIconData(m):this._state=D$(m,this._state.inline,this._state)}_forceRender(){if(!this._visible){const d=sj(this._shadowRoot);d&&this._shadowRoot.removeChild(d);return}this._queueCheck()}_gotIconData(d){this._checkQueued=!1,this._renderIcon(d,i$(this),this.getAttribute("mode"))}_renderIcon(d,m,D){const P=Qte(d.data.body,D),x=this._state.inline;A$(this._shadowRoot,this._state={rendered:!0,icon:d,inline:x,customisations:m,attrMode:D,renderedMode:P})}startObserver(){if(!this._observer)try{this._observer=new IntersectionObserver(d=>{const m=d.some(D=>D.isIntersecting);m!==this._visible&&(this._visible=m,this._forceRender())}),this._observer.observe(this)}catch{if(this._observer){try{this._observer.disconnect()}catch{}this._observer=null}}}stopObserver(){this._observer&&(this._observer.disconnect(),this._observer=null,this._visible=!0,this._connected&&this._forceRender())}};u.forEach(d=>{d in o.prototype||Object.defineProperty(o.prototype,d,{get:function(){return this.getAttribute(d)},set:function(m){m!==null?this.setAttribute(d,m):this.removeAttribute(d)}})});const f=pJ();for(const d in f)o[d]=o.prototype[d]=f[d];return s.define(e,o),o}pne()||pJ();var Tne=Object.defineProperty,fR=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Tne(s,n,u),u},YG;const xp=(YG=class extends ql{constructor(){super(),this.labelHidden=!1,this.active=!1,this.disabled=!1,this.vertical=!1,this.tooltipVisible=!1,this._parent=tN(),this._tooltip=tN(),this._contextMenu=tN(),this._mouseLeave=!1,this.onWindowMouseUp=e=>{const{value:s}=this._contextMenu;!this.contains(e.target)&&s&&(s.visible=!1)},this.mouseLeave=!0,this.addEventListener("click",e=>e.stopPropagation())}set mouseLeave(e){this._mouseLeave=e,e&&(this.tooltipVisible=!1,clearTimeout(this.timeoutID))}get mouseLeave(){return this._mouseLeave}computeTooltipPosition(){const{value:e}=this._parent,{value:s}=this._tooltip;e&&s&&HZ(e,s,{placement:"bottom",middleware:[DZ(10),BZ(),UZ(),xZ({padding:5})]}).then(n=>{const{x:t,y:u}=n;Object.assign(s.style,{left:`${t}px`,top:`${u}px`})})}onMouseEnter(){if(!(this.tooltipTitle||this.tooltipText))return;this.mouseLeave=!1;const e=this.tooltipTime??700;this.timeoutID=setTimeout(()=>{this.mouseLeave||(this.computeTooltipPosition(),this.tooltipVisible=!0)},e)}onChildrenClick(e){e.stopPropagation();const{value:s}=this._contextMenu;s&&(s.visible=!s.visible)}onSlotChange(e){const{value:s}=this._contextMenu,n=e.target.assignedElements();for(const t of n){if(!(t instanceof YG)){t.remove(),console.warn("Only bim-button is allowed inside bim-button. Child has been removed.");continue}t.addEventListener("click",()=>s==null?void 0:s.updatePosition())}this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener("mouseup",this.onWindowMouseUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mouseup",this.onWindowMouseUp)}render(){const e=Xn`
      <div ${z7(this._tooltip)} class="tooltip">
        ${this.tooltipTitle?Xn`<p style="text-wrap: nowrap;">
              <strong>${this.tooltipTitle}</strong>
            </p>`:null}
        ${this.tooltipText?Xn`<p style="width: 9rem;">${this.tooltipText}</p>`:null}
      </div>
    `,s=this.children.length>0;return Xn`
      <style>
        .button {
          border-radius: var(
            --bim-button--bdrs,
            ${s?"var(--bim-ui_size-4xs) 0 0 var(--bim-ui_size-4xs)":"var(--bim-ui_size-4xs)"}
          );
        }
        .children {
          border-radius: var(
            --bim-button--bdrs,
            ${s?"0 var(--bim-ui_size-4xs) var(--bim-ui_size-4xs) 0":"var(--bim-ui_size-4xs)"}
          );
        }
      </style>
      <div ${z7(this._parent)} class="parent">
        ${this.label||this.icon?Xn`
              <div
                class="button"
                @mouseenter=${this.onMouseEnter}
                @mouseleave=${()=>this.mouseLeave=!0}
              >
                <bim-label
                  .label=${this.label}
                  .icon=${this.icon}
                  .vertical=${this.vertical}
                  .labelHidden=${this.labelHidden}
                ></bim-label>
              </div>
            `:null}
        ${this.tooltipTitle||this.tooltipText?e:null}
        ${s?Xn`
              <div class="children" @click=${this.onChildrenClick}>
                <bim-icon .icon=${"ic:round-plus"}></bim-icon>
              </div>
            `:null}
        <bim-context-menu
          ${z7(this._contextMenu)}
          style="row-gap: var(--bim-ui_size-4xs)"
        >
          <slot @slotchange=${this.onSlotChange}></slot>
        </bim-context-menu>
      </div>
    `}},YG.styles=ur`
    :host {
      display: block;
      flex: 1;
      pointer-events: none;
    }

    :host(:not([disabled]):hover) {
      cursor: pointer;
    }

    bim-label {
      pointer-events: none;
    }

    .parent {
      --bim-label--c: var(--bim-ui_bg-contrast-80);
      --bim-label--fz: var(--bim-ui_size-xs);
      --bim-icon--c: var(--bim-label--c);
      display: flex;
      height: 100%;
      user-select: none;
      row-gap: 0.125rem;
      column-gap: 0.125rem;
    }

    .button,
    .children {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      min-height: var(--bim-ui_size-5xl);
      min-width: var(--bim-ui_size-5xl);
      background-color: var(--bim-button--bgc, var(--bim-ui_bg-contrast-20));
      outline: var(--bim-button--olw) solid var(--bim-button--olc);
    }

    .button {
      flex-grow: 1;
    }

    :host(:not([label-hidden])[label]) .button {
      justify-content: var(--bim-button--jc, center);
    }

    :host(:hover) .button,
    :host(:hover) .children {
      --bim-label--c: var(--bim-ui_main-contrast);
      --bim-icon--c: var(--bim-ui_main-contrast);
      fill: white;
      background-color: var(--bim-ui_color-main);
    }

    :host(:not([label]):not([icon])) .children {
      flex: 1;
    }

    :host([active]) .button {
      --bim-label--c: var(--bim-ui_main-contrast);
      --bim-icon--c: var(--bim-ui_main-contrast);
      background-color: var(--bim-ui_color-main);
    }

    :host([vertical]) .parent {
      justify-content: center;
    }

    :host(:not([label-hidden])[label]) .button {
      padding: 0 0.75rem;
    }

    :host([disabled]) .parent {
      background-color: gray;
    }

    .children {
      --bim-icon--fz: var(--bim-ui_size-base);
      padding: 0 0.125rem;
    }

    ::slotted(bim-button) {
      --bim-icon--fz: var(--bim-ui_size-base);
      --bim-button--bgc: var(
        --bim-context-menu--bgc,
        var(--bim-ui_bg-contrast-20)
      );
      --bim-button--bdrs: var(--bim-ui_size-4xs);
      --bim-button--olw: 0;
      --bim-button--olc: transparent;
    }

    .tooltip {
      position: absolute;
      padding: 0.75rem;
      z-index: 99;
      display: flex;
      flex-flow: column;
      row-gap: 0.375rem;
      box-shadow: 0 0 10px 3px rgba(0 0 0 / 20%);
      outline: 1px solid var(--bim-ui_bg-contrast-40);
      font-size: var(--bim-ui_size-xs);
      border-radius: var(--bim-ui_size-4xs);
      background-color: var(--bim-ui_bg-contrast-20);
      color: var(--bim-ui_bg-contrast-100);
    }

    .tooltip p {
      margin: 0;
      padding: 0;
    }

    :host(:not([tooltip-visible])) .tooltip {
      display: none;
    }
  `,YG);fR([Vt({type:String,reflect:!0})],xp.prototype,"label");fR([Vt({type:Boolean,attribute:"label-hidden",reflect:!0})],xp.prototype,"labelHidden");fR([Vt({type:Boolean,reflect:!0})],xp.prototype,"active");fR([Vt({type:Boolean,reflect:!0,attribute:"disabled"})],xp.prototype,"disabled");fR([Vt({type:String,reflect:!0})],xp.prototype,"icon");fR([Vt({type:Boolean,reflect:!0})],xp.prototype,"vertical");fR([Vt({type:Number,attribute:"tooltip-time",reflect:!0})],xp.prototype,"tooltipTime");fR([Vt({type:Boolean,attribute:"tooltip-visible",reflect:!0})],xp.prototype,"tooltipVisible");fR([Vt({type:String,attribute:"tooltip-title",reflect:!0})],xp.prototype,"tooltipTitle");fR([Vt({type:String,attribute:"tooltip-text",reflect:!0})],xp.prototype,"tooltipText");let mne=xp;var Rne=Object.defineProperty,pG=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Rne(s,n,u),u};const mJ=class extends ql{constructor(){super(...arguments),this.checked=!1,this.inverted=!1,this.onValueChange=new Event("change")}get value(){return this.checked}onChange(s){s.stopPropagation(),this.checked=s.target.checked,this.dispatchEvent(this.onValueChange)}render(){return Xn`
      <div class="parent">
        ${this.label?Xn`<bim-label
              label="${this.label}"
              .icon="${this.icon}"
            ></bim-label> `:null}
        <input
          type="checkbox"
          aria-label=${this.label||this.name||"Checkbox Input"}
          @change="${this.onChange}"
          .checked="${this.checked}"
        />
      </div>
    `}};mJ.styles=ur`
    :host {
      display: block;
    }

    .parent {
      display: flex;
      justify-content: space-between;
      height: 1.75rem;
      column-gap: 0.5rem;
      width: 100%;
      align-items: center;
    }

    :host([inverted]) .parent {
      flex-direction: row-reverse;
      justify-content: start;
    }

    input {
      height: 1rem;
      width: 1rem;
      cursor: pointer;
      border: none;
      outline: none;
      accent-color: var(--bim-checkbox--c, var(--bim-ui_color-main));
    }

    input:focus {
      outline: var(--bim-checkbox--olw, 2px) solid
        var(--bim-checkbox--olc, var(--bim-ui_color-accent));
    }
  `;let uM=mJ;pG([Vt({type:String,reflect:!0})],uM.prototype,"icon");pG([Vt({type:String,reflect:!0})],uM.prototype,"name");pG([Vt({type:String,reflect:!0})],uM.prototype,"label");pG([Vt({type:Boolean,reflect:!0})],uM.prototype,"checked");pG([Vt({type:Boolean,reflect:!0})],uM.prototype,"inverted");var Ane=Object.defineProperty,aM=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Ane(s,n,u),u};const RJ=class extends ql{constructor(){super(...arguments),this.vertical=!1,this.color="#bcf124",this._colorInput=tN(),this._textInput=tN(),this.onValueChange=new Event("input"),this.onOpacityInput=s=>{const n=s.target;this.opacity=n.value,this.dispatchEvent(this.onValueChange)}}set value(s){const{color:n,opacity:t}=s;this.color=n,t&&(this.opacity=t)}get value(){const s={color:this.color};return this.opacity&&(s.opacity=this.opacity),s}onColorInput(s){s.stopPropagation();const{value:n}=this._colorInput;n&&(this.color=n.value,this.dispatchEvent(this.onValueChange))}onTextInput(s){s.stopPropagation();const{value:n}=this._textInput;if(!n)return;const{value:t}=n;let u=t.replace(/[^a-fA-F0-9]/g,"");u.startsWith("#")||(u=`#${u}`),n.value=u.slice(0,7),n.value.length===7&&(this.color=n.value,this.dispatchEvent(this.onValueChange))}focus(){const{value:s}=this._colorInput;s&&s.click()}render(){return Xn`
      <div class="parent">
        <bim-input
          .label=${this.label}
          .icon=${this.icon}
          .vertical="${this.vertical}"
        >
          <div class="color-container">
            <div
              style="display: flex; align-items: center; gap: .375rem; height: 100%; flex: 1; padding: 0 0.5rem;"
            >
              <input
                ${z7(this._colorInput)}
                @input="${this.onColorInput}"
                type="color"
                aria-label=${this.label||this.name||"Color Input"}
                value="${this.color}"
              />
              <div
                @click=${this.focus}
                class="sample"
                style="background-color: ${this.color}"
              ></div>
              <input
                ${z7(this._textInput)}
                @input="${this.onTextInput}"
                value="${this.color}"
                type="text"
                aria-label=${this.label||this.name||"Text Color Input"}
              />
            </div>
            ${this.opacity!==void 0?Xn`<bim-number-input
                  @input=${this.onOpacityInput}
                  slider
                  suffix="%"
                  min="0"
                  value=${this.opacity}
                  max="100"
                ></bim-number-input>`:null}
          </div>
        </bim-input>
      </div>
    `}};RJ.styles=ur`
    :host {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
      flex: 1;
      display: block;
    }

    :host(:focus) {
      --bim-input--olw: var(--bim-number-input--olw, 2px);
      --bim-input--olc: var(--bim-ui_color-accent);
    }

    .parent {
      display: flex;
      gap: 0.375rem;
    }

    .color-container {
      position: relative;
      outline: none;
      display: flex;
      height: 100%;
      gap: 0.5rem;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
      border-radius: var(--bim-color-input--bdrs, var(--bim-ui_size-4xs));
    }

    .color-container input[type="color"] {
      position: absolute;
      bottom: -0.25rem;
      visibility: hidden;
      width: 0;
      height: 0;
    }

    .color-container .sample {
      width: 1rem;
      height: 1rem;
      border-radius: 0.125rem;
      background-color: #fff;
    }

    .color-container input[type="text"] {
      height: 100%;
      flex: 1;
      width: 3.25rem;
      text-transform: uppercase;
      font-size: 0.75rem;
      background-color: transparent;
      padding: 0%;
      outline: none;
      border: none;
      color: var(--bim-color-input--c, var(--bim-ui_bg-contrast-100));
    }

    bim-number-input {
      flex-grow: 0;
    }
  `;let ub=RJ;aM([Vt({type:String,reflect:!0})],ub.prototype,"name");aM([Vt({type:String,reflect:!0})],ub.prototype,"label");aM([Vt({type:String,reflect:!0})],ub.prototype,"icon");aM([Vt({type:Boolean,reflect:!0})],ub.prototype,"vertical");aM([Vt({type:Number,reflect:!0})],ub.prototype,"opacity");aM([Vt({type:String,reflect:!0})],ub.prototype,"color");const Dne=ur`
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
    overflow: hidden;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background-color: var(
      --bim-scrollbar--c,
      color-mix(in lab, var(--bim-ui_color-main), white 15%)
    );
  }

  ::-webkit-scrollbar-track {
    background-color: var(--bim-scrollbar--bgc, var(--bim-ui_bg-base));
  }
`,Sne=ur`
  :root {
    /* Backgrounds */
    --bim-ui_bg-base: hsl(210 10% 5%);
    --bim-ui_bg-contrast-10: hsl(210 10% 10%);
    --bim-ui_bg-contrast-20: hsl(210 10% 20%);
    --bim-ui_bg-contrast-40: hsl(210 10% 40%);
    --bim-ui_bg-contrast-60: hsl(210 10% 60%);
    --bim-ui_bg-contrast-80: hsl(210 10% 80%);
    --bim-ui_bg-contrast-100: hsl(210 10% 95%);

    /* Main/accent app color that contrasts with bg-base */
    --bim-ui_bg-main-contrast: #6528d7;
    --bim-ui_bg-accent-contrast: #6528d7;

    /* Colors */
    --bim-ui_color-main: #6528d7;
    --bim-ui_color-accent: #bcf124;

    --bim-ui_main-base: #6528d7;
    --bim-ui_main-contrast: hsl(210 10% 95%);
    --bim-ui_accent-base: #bcf124;
    --bim-ui_accent-contrast: hsl(210 10% 5%);

    /* Sizes */
    --bim-ui_size-4xs: 0.375rem;
    --bim-ui_size-3xs: 0.5rem;
    --bim-ui_size-2xs: 0.625rem;
    --bim-ui_size-xs: 0.75rem;
    --bim-ui_size-sm: 0.875rem;
    --bim-ui_size-base: 1rem;
    --bim-ui_size-lg: 1.125rem;
    --bim-ui_size-xl: 1.25rem;
    --bim-ui_size-2xl: 1.375rem;
    --bim-ui_size-3xl: 1.5rem;
    --bim-ui_size-4xl: 1.625rem;
    --bim-ui_size-5xl: 1.75rem;
    --bim-ui_size-6xl: 1.875rem;
    --bim-ui_size-7xl: 2rem;
    --bim-ui_size-8xl: 2.125rem;
    --bim-ui_size-9xl: 2.25rem;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bim-ui_bg-base: hsl(210 10% 5%);
      --bim-ui_bg-contrast-10: hsl(210 10% 10%);
      --bim-ui_bg-contrast-20: hsl(210 10% 20%);
      --bim-ui_bg-contrast-40: hsl(210 10% 40%);
      --bim-ui_bg-contrast-60: hsl(210 10% 60%);
      --bim-ui_bg-contrast-80: hsl(210 10% 80%);
      --bim-ui_bg-contrast-100: hsl(210 10% 95%);
    }
  }

  @media (prefers-color-scheme: light) {
    :root {
      --bim-ui_bg-base: hsl(210 10% 95%);
      --bim-ui_bg-contrast-10: hsl(210 10% 90%);
      --bim-ui_bg-contrast-20: hsl(210 10% 85%);
      --bim-ui_bg-contrast-40: hsl(210 10% 60%);
      --bim-ui_bg-contrast-60: hsl(210 10% 40%);
      --bim-ui_bg-contrast-80: hsl(210 10% 20%);
      --bim-ui_bg-contrast-100: hsl(210 10% 5%);

      --bim-ui_color-main: #6528d7;
      --bim-ui_color-accent: #6528d7;
    }
  }

  html.bim-ui-dark {
    --bim-ui_bg-base: hsl(210 10% 5%);
    --bim-ui_bg-contrast-10: hsl(210 10% 10%);
    --bim-ui_bg-contrast-20: hsl(210 10% 20%);
    --bim-ui_bg-contrast-40: hsl(210 10% 40%);
    --bim-ui_bg-contrast-60: hsl(210 10% 60%);
    --bim-ui_bg-contrast-80: hsl(210 10% 80%);
    --bim-ui_bg-contrast-100: hsl(210 10% 95%);
  }

  html.bim-ui-light {
    --bim-ui_bg-base: hsl(210 10% 95%);
    --bim-ui_bg-contrast-10: hsl(210 10% 90%);
    --bim-ui_bg-contrast-20: hsl(210 10% 85%);
    --bim-ui_bg-contrast-40: hsl(210 10% 60%);
    --bim-ui_bg-contrast-60: hsl(210 10% 40%);
    --bim-ui_bg-contrast-80: hsl(210 10% 20%);
    --bim-ui_bg-contrast-100: hsl(210 10% 5%);

    --bim-ui_color-main: #6528d7;
    --bim-ui_color-accent: #6528d7;
  }

  bim-grid:not([floating]) bim-toolbars-container {
    background-color: var(--bim-ui_bg-base);
  }

  bim-grid[floating] bim-toolbars-container {
    background-color: transparent;
  }
`,ab={scrollbar:Dne,globalStyles:Sne};var Nne=Object.defineProperty,gne=Object.getOwnPropertyDescriptor,One=(e,s,n,t)=>{for(var u=gne(s,n),o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Nne(s,n,u),u};const AJ=class extends ql{constructor(){super(...arguments),this._visible=!1,this._middleware={name:"middleware",async fn(s){const{right:n,top:t}=await hk(s);return s.x-=Math.sign(n)===1?n+5:0,s.y-=Math.sign(t)===1?t+5:0,s}}}get visible(){return this._visible}set visible(s){this._visible=s,s&&this.updatePosition()}async updatePosition(s){const n=s||this.parentNode;if(!n){this.visible=!1,console.warn("No target element found for context-menu.");return}const t=await HZ(n,this,{placement:"right",middleware:[DZ(10),BZ(),UZ(),xZ({padding:5}),this._middleware]}),{x:u,y:o}=t;this.style.left=`${u}px`,this.style.top=`${o}px`}render(){return Xn` <slot></slot> `}};AJ.styles=[ab.scrollbar,ur`
      :host {
        --bim-label--fz: var(--bim-ui_size-xs);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        overflow: auto;
        max-height: 20rem;
        min-width: 3rem;
        flex-direction: column;
        box-shadow: 1px 2px 8px 2px rgba(0, 0, 0, 0.15);
        padding: 0.5rem;
        border-radius: var(--bim-ui_size-4xs);
        background-color: var(
          --bim-context-menu--bgc,
          var(--bim-ui_bg-contrast-20)
        );
      }

      :host([visible]) {
        display: flex;
      }

      :host(:not([visible])) {
        display: none;
      }
    `];let DJ=AJ;One([Vt({type:Boolean,reflect:!0})],DJ.prototype,"visible");class Lne extends ql{constructor(){super(...arguments),this._lazyLoadObserver=null,this._visibleElements=[],this.ELEMENTS_BEFORE_OBSERVER=20,this.useObserver=!1,this.elements=new Set,this.observe=s=>{if(!this.useObserver)return;for(const t of s)this.elements.add(t);const n=s.slice(this.ELEMENTS_BEFORE_OBSERVER);for(const t of n)t.remove();this.observeLastElement()}}set visibleElements(s){this._visibleElements=this.useObserver?s:[],this.requestUpdate()}get visibleElements(){return this._visibleElements}getLazyObserver(){if(!this.useObserver)return null;if(this._lazyLoadObserver)return this._lazyLoadObserver;const s=new IntersectionObserver(n=>{const t=n[0];if(!t.isIntersecting)return;const u=t.target;s.unobserve(u);const o=this.ELEMENTS_BEFORE_OBSERVER+this.visibleElements.length,f=[...this.elements][o];f&&(this.visibleElements=[...this.visibleElements,f],s.observe(f))},{threshold:.5});return s}observeLastElement(){const s=this.getLazyObserver();if(!s)return;const n=this.ELEMENTS_BEFORE_OBSERVER+this.visibleElements.length-1,t=[...this.elements][n];t&&s.observe(t)}resetVisibleElements(){const s=this.getLazyObserver();if(s){for(const n of this.elements)s.unobserve(n);this.visibleElements=[],this.observeLastElement()}}static create(s,n){const t=document.createDocumentFragment();if(s.length===0)return ZV(s(),t),t.firstElementChild;if(!n)throw new Error("UIComponent: Initial state is required for statefull components.");let u=n;const o=s,f=d=>(u={...u,...d},ZV(o(u),t),u);return f(n),[t.firstElementChild,f]}}const tW=(e,s=!0)=>{let n={};for(const t of e.children){const u=t,o=u.getAttribute("name")||u.getAttribute("label");if(o){if("value"in u){const f=u.value;if(typeof f=="object"&&!Array.isArray(f)&&Object.keys(f).length===0)continue;n[o]=u.value}else if(s){const f=tW(u);if(Object.keys(f).length===0)continue;n[o]=f}}else s&&(n={...n,...tW(u)})}return n},pW=e=>e==="true"||e==="false"?e==="true":e&&!isNaN(Number(e))&&e.trim()!==""?Number(e):e,bne=["=",">",">=","<","<=","?","/","#"];function S$(e){const s=bne.filter(f=>e.split(f).length===2)[0],n=e.split(s).map(f=>f.trim()),[t,u]=n,o=u.startsWith("'")&&u.endsWith("'")?u.replace(/'/g,""):pW(u);return{key:t,condition:s,value:o}}const lj=e=>{try{const s=[],n=e.split(/&(?![^()]*\))/).map(t=>t.trim());for(const t of n){const u=!t.startsWith("(")&&!t.endsWith(")"),o=t.startsWith("(")&&t.endsWith(")");if(u){const f=S$(t);s.push(f)}if(o){const f={operator:"&",queries:t.replace(/^(\()|(\))$/g,"").split("&").map(d=>d.trim()).map((d,m)=>{const D=S$(d);return m>0&&(D.operator="&"),D})};s.push(f)}}return s}catch{return null}},N$=(e,s,n)=>{let t=!1;switch(s){case"=":t=e===n;break;case"?":t=String(e).includes(String(n));break;case"<":(typeof e=="number"||typeof n=="number")&&(t=e<n);break;case"<=":(typeof e=="number"||typeof n=="number")&&(t=e<=n);break;case">":(typeof e=="number"||typeof n=="number")&&(t=e>n);break;case">=":(typeof e=="number"||typeof n=="number")&&(t=e>=n);break;case"/":t=String(e).startsWith(String(n));break}return t};var Cne=Object.defineProperty,Pne=Object.getOwnPropertyDescriptor,pN=(e,s,n,t)=>{for(var u=t>1?void 0:t?Pne(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&Cne(s,n,u),u};const SJ=class extends ql{constructor(){super(...arguments),this.checked=!1,this.checkbox=!1,this.noMark=!1,this.vertical=!1}get value(){return this._value!==void 0?this._value:this.label?pW(this.label):this.label}set value(s){this._value=s}render(){return Xn`
      <div class="parent" .title=${this.label??""}>
        ${this.img||this.icon||this.label?Xn` <div style="display: flex; column-gap: 0.375rem">
              ${this.checkbox&&!this.noMark?Xn`<bim-checkbox
                    style="pointer-events: none"
                    .checked=${this.checked}
                  ></bim-checkbox>`:null}
              <bim-label
                .vertical=${this.vertical}
                .label=${this.label}
                .icon=${this.icon}
                .img=${this.img}
              ></bim-label>
            </div>`:null}
        ${!this.checkbox&&!this.noMark&&this.checked?Xn`<svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.125rem"
              viewBox="0 0 24 24"
              width="1.125rem"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>`:null}
        <slot></slot>
      </div>
    `}};SJ.styles=ur`
    :host {
      --bim-label--c: var(--bim-ui_bg-contrast-100);
      display: block;
      box-sizing: border-box;
      flex: 1;
      padding: 0rem 0.5rem;
      border-radius: var(--bim-ui_size-4xs);
    }

    :host(:hover) {
      cursor: pointer;
      background-color: color-mix(
        in lab,
        var(--bim-selector--bgc, var(--bim-ui_bg-contrast-20)),
        var(--bim-ui_color-main) 10%
      );
    }

    :host([checked]) {
      --bim-label--c: color-mix(in lab, var(--bim-ui_color-main), white 30%);
    }

    :host([checked]) svg {
      fill: color-mix(in lab, var(--bim-ui_color-main), white 30%);
    }

    .parent {
      box-sizing: border-box;
      display: flex;
      justify-content: var(--bim-option--jc, space-between);
      column-gap: 0.5rem;
      align-items: center;
      min-height: 1.75rem;
      height: 100%;
    }

    input {
      height: 1rem;
      width: 1rem;
      cursor: pointer;
      border: none;
      outline: none;
      accent-color: var(--bim-checkbox--c, var(--bim-ui_color-main));
    }

    input:focus {
      outline: var(--bim-checkbox--olw, 2px) solid
        var(--bim-checkbox--olc, var(--bim-ui_color-accent));
    }

    bim-label {
      pointer-events: none;
    }
  `;let Bo=SJ;pN([Vt({type:String,reflect:!0})],Bo.prototype,"img",2);pN([Vt({type:String,reflect:!0})],Bo.prototype,"label",2);pN([Vt({type:String,reflect:!0})],Bo.prototype,"icon",2);pN([Vt({type:Boolean,reflect:!0})],Bo.prototype,"checked",2);pN([Vt({type:Boolean,reflect:!0})],Bo.prototype,"checkbox",2);pN([Vt({type:Boolean,attribute:"no-mark",reflect:!0})],Bo.prototype,"noMark",2);pN([Vt({converter:{fromAttribute(e){return e&&pW(e)}}})],Bo.prototype,"value",1);pN([Vt({type:Boolean,reflect:!0})],Bo.prototype,"vertical",2);var Mne=Object.defineProperty,xne=Object.getOwnPropertyDescriptor,TN=(e,s,n,t)=>{for(var u=t>1?void 0:t?xne(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&Mne(s,n,u),u};const NJ=class extends Lne{constructor(){super(),this.multiple=!1,this.required=!1,this.vertical=!1,this._inputContainer=tN(),this._listElement=tN(),this._visible=!1,this._value=[],this.onValueChange=new Event("change"),this.onWindowMouseUp=s=>{this.visible&&(this.contains(s.target)||(this.visible=!1))},this.onOptionClick=s=>{const n=s.target,t=this._value.includes(n);if(!this.multiple&&!this.required&&!t)this._value=[n];else if(!this.multiple&&!this.required&&t)this._value=[];else if(!this.multiple&&this.required&&!t)this._value=[n];else if(this.multiple&&!this.required&&!t)this._value=[...this._value,n];else if(this.multiple&&!this.required&&t)this._value=this._value.filter(u=>u!==n);else if(this.multiple&&this.required&&!t)this._value=[...this._value,n];else if(this.multiple&&this.required&&t){const u=this._value.filter(o=>o!==n);u.length!==0&&(this._value=u)}this.updateOptionsState(),this.dispatchEvent(this.onValueChange)},this.useObserver=!0}set visible(s){this._visible=s,s||this.resetVisibleElements()}get visible(){return this._visible}set value(s){if(this.required&&Object.keys(s).length===0)return;const n=[];for(const t of s){const u=this.findOption(t);if(u&&(n.push(u),!this.multiple&&Object.keys(s).length>1))break}this._value=n,this.updateOptionsState(),this.dispatchEvent(this.onValueChange)}get value(){return this._value.filter(s=>s instanceof Bo&&s.checked).map(s=>s.value)}get _options(){const s=[...this.elements];for(const n of this.children)n instanceof Bo&&s.push(n);return s}onSlotChange(s){const n=s.target.assignedElements();this.observe(n);for(const t of n){if(!(t instanceof Bo)){t.remove();continue}t.removeEventListener("click",this.onOptionClick),t.addEventListener("click",this.onOptionClick)}}updateOptionsState(){for(const s of this._options)s instanceof Bo&&(this._value.includes(s)?s.checked=!0:s.checked=!1)}findOption(s){return this._options.find(n=>n instanceof Bo?n.label===s||n.value===s:!1)}connectedCallback(){super.connectedCallback(),window.addEventListener("mouseup",this.onWindowMouseUp)}firstUpdated(){for(const s of this.children)s instanceof Bo&&s.checked&&this._value.push(s)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mouseup",this.onWindowMouseUp)}render(){let s,n,t;if(this._value.length===0)s="Select an option...";else if(this._value.length===1){const u=this._value[0];s=(u==null?void 0:u.label)||(u==null?void 0:u.value),n=u==null?void 0:u.img,t=u==null?void 0:u.icon}else s=`Multiple (${this._value.length})`;return Xn`
      <bim-input
        title=${this.label??""}
        .label=${this.label}
        .icon=${this.icon}
        .vertical=${this.vertical}
      >
        <div
          ${z7(this._inputContainer)}
          class="input"
          @click=${()=>this.visible=!this.visible}
        >
          <bim-label
            label=${s}
            .img=${n}
            .icon=${t}
            style="overflow: hidden;"
          ></bim-label>
          <svg
            style="flex-shrink: 0"
            xmlns="http://www.w3.org/2000/svg"
            height="1.125rem"
            viewBox="0 0 24 24"
            width="1.125rem"
            fill="#9ca3af"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
        <bim-context-menu ${z7(this._listElement)} .visible=${this.visible}>
          <slot @slotchange=${this.onSlotChange}></slot>
          ${this.visibleElements.map(u=>u)}
        </bim-context-menu>
      </bim-input>
    `}};NJ.styles=[ab.scrollbar,ur`
      :host {
        --bim-input--bgc: var(
          --bim-dropdown--bgc,
          var(--bim-ui_bg-contrast-20)
        );
        --bim-input--olw: var(--bim-dropdown--olw, 2px);
        --bim-input--olc: var(--bim-dropdown--olc, transparent);
        --bim-input--bdrs: var(--bim-dropdown--bdrs, var(--bim-ui_size-4xs));
        flex: 1;
        display: block;
      }

      :host([visible]) {
        --bim-input--olc: var(
          --bim-dropdown¡focus--c,
          var(--bim-ui_color-accent)
        );
      }

      .input {
        --bim-label--fz: var(--bim-drodown--fz, var(--bim-ui_size-xs));
        --bim-label--c: var(--bim-dropdown--c, var(--bim-ui_bg-contrast-100));
        height: 100%;
        display: flex;
        flex: 1;
        overflow: hidden;
        column-gap: 0.25rem;
        outline: none;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem;
      }

      bim-label {
        pointer-events: none;
      }
    `];let yA=NJ;TN([Vt({type:String,reflect:!0})],yA.prototype,"name",2);TN([Vt({type:String,reflect:!0})],yA.prototype,"icon",2);TN([Vt({type:String,reflect:!0})],yA.prototype,"label",2);TN([Vt({type:Boolean,reflect:!0})],yA.prototype,"multiple",2);TN([Vt({type:Boolean,reflect:!0})],yA.prototype,"required",2);TN([Vt({type:Boolean,reflect:!0})],yA.prototype,"vertical",2);TN([Vt({type:Boolean,reflect:!0})],yA.prototype,"visible",1);TN([yG()],yA.prototype,"_value",2);var Une=Object.defineProperty,gJ=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Une(s,n,u),u};const OJ=class extends ql{constructor(){super(...arguments),this.floating=!1,this.layouts={}}getUniqueAreasFromTemplate(s){const n=s.split(`
`).map(t=>t.trim()).map(t=>t.split('"')[1]).filter(t=>t!==void 0).flatMap(t=>t.split(/\s+/));return[...new Set(n)].filter(t=>t!=="")}firstUpdated(){this._onLayoutChange=new Event("layoutchange")}render(){if(this.layout){if(this.layouts[this.layout]){this.innerHTML="";const s=this.layouts[this.layout],n=this.getUniqueAreasFromTemplate(s.template).map(t=>{const u=s.elements[t];return u&&(u.style.gridArea=t),u}).filter(t=>!!t);this.style.gridTemplate=s.template,this._onLayoutChange&&this.dispatchEvent(this._onLayoutChange),this.append(...n)}}else this.innerHTML="",this.style.gridTemplate="",this._onLayoutChange&&this.dispatchEvent(this._onLayoutChange);return Xn`<slot></slot>`}};OJ.styles=ur`
    :host {
      display: grid;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* :host(:not([layout])) {
      display: none;
    } */

    :host([floating]) {
      --bim-panel--bdrs: var(--bim-ui_size-4xs);
      background-color: transparent;
      padding: 1rem;
      gap: 1rem;
      position: absolute;
      pointer-events: none;
      top: 0px;
      left: 0px;
    }

    :host(:not([floating])) {
      --bim-panel--bdrs: 0;
      background-color: var(--bim-ui_bg-contrast-20);
      gap: 1px;
    }
  `;let Ok=OJ;gJ([Vt({type:Boolean,reflect:!0})],Ok.prototype,"floating");gJ([Vt({type:String,reflect:!0})],Ok.prototype,"layout");const rj=class extends ql{render(){return Xn`
      <iconify-icon .icon=${this.icon} height="none"></iconify-icon>
    `}};rj.styles=ur`
    :host {
      height: var(--bim-icon--fz, var(--bim-ui_size-sm));
      width: var(--bim-icon--fz, var(--bim-ui_size-sm));
    }

    iconify-icon {
      height: var(--bim-icon--fz, var(--bim-ui_size-sm));
      width: var(--bim-icon--fz, var(--bim-ui_size-sm));
      color: var(--bim-icon--c);
    }
  `,rj.properties={icon:{type:String}};let Bne=rj;var Hne=Object.defineProperty,TW=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Hne(s,n,u),u};const LJ=class extends ql{constructor(){super(),this.onValueChange=new Event("change"),this.vertical=!1}get value(){const s={};for(const n of this.children){const t=n;"value"in t?s[t.name||t.label]=t.value:"checked"in t&&(s[t.name||t.label]=t.checked)}return s}set value(s){const n=[...this.children];for(const t in s){const u=n.find(d=>{const m=d;return m.name===t||m.label===t});if(!u)continue;const o=u,f=s[t];typeof f=="boolean"?o.checked=f:o.value=f}}render(){return Xn`
      <div class="parent">
        ${this.label||this.icon?Xn`<bim-label
              .label=${this.label}
              .icon=${this.icon}
            ></bim-label>`:null}
        <div class="input">
          <slot></slot>
        </div>
      </div>
    `}};LJ.styles=ur`
    :host {
      flex: 1;
      display: block;
    }

    .parent {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
      row-gap: 0.375rem;
      user-select: none;
      flex: 1;
    }

    :host(:not([vertical])) .parent {
      justify-content: space-between;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    .input {
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      min-height: 1.75rem;
      min-width: 4rem;
      gap: var(--bim-input--g, var(--bim-ui_size-4xs));
      padding: var(--bim-input--p, 0);
      background-color: var(--bim-input--bgc, transparent);
      outline: var(--bim-input--olw, 2px) solid
        var(--bim-input--olc, transparent);
      border-radius: var(--bim-input--bdrs, var(--bim-ui_size-4xs));
    }

    :host(:not([vertical])) .input {
      flex: 1;
      justify-content: flex-end;
    }

    :host(:not([vertical])[label]) .input {
      max-width: 13rem;
    }
  `;let TG=LJ;TW([Vt({type:String,reflect:!0})],TG.prototype,"name");TW([Vt({type:String,reflect:!0})],TG.prototype,"label");TW([Vt({type:String,reflect:!0})],TG.prototype,"icon");TW([Vt({type:Boolean,reflect:!0})],TG.prototype,"vertical");var Fne=Object.defineProperty,oM=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Fne(s,n,u),u};const bJ=class extends ql{constructor(){super(...arguments),this.labelHidden=!1,this.iconHidden=!1,this.vertical=!1}get value(){return this.label?pW(this.label):this.label}render(){return Xn`
      <div class="parent" .title=${this.label??""}>
        ${this.img?Xn`<img .src=${this.img} .alt=${this.label||""} />`:null}
        ${!this.iconHidden&&this.icon?Xn`<bim-icon .icon=${this.icon}></bim-icon>`:null}
        ${!this.labelHidden&&this.label?Xn`<label>${this.label}</label>`:null}
      </div>
    `}};bJ.styles=ur`
    :host {
      --bim-icon--c: var(--bim-label--c);
      color: var(--bim-label--c, var(--bim-ui_bg-contrast-60));
      font-size: var(--bim-label--fz, var(--bim-ui_size-xs));
      overflow: hidden;
    }

    .parent {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      row-gap: 0.125rem;
      user-select: none;
      height: 100%;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    label {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    img {
      height: 100%;
      aspect-ratio: 1;
      border-radius: 100%;
      margin-right: 0.125rem;
    }

    :host(:not([vertical])) img {
      max-height: var(
        --bim-label_icon--sz,
        calc(var(--bim-label--fz, var(--bim-ui_size-xs)) * 1.5)
      );
    }

    :host([vertical]) img {
      max-height: var(
        --bim-label_icon--sz,
        calc(var(--bim-label--fz, var(--bim-ui_size-xs)) * 4)
      );
    }
  `;let ob=bJ;oM([Vt({type:String,reflect:!0})],ob.prototype,"label");oM([Vt({type:String,reflect:!0})],ob.prototype,"img");oM([Vt({type:Boolean,attribute:"label-hidden",reflect:!0})],ob.prototype,"labelHidden");oM([Vt({type:String,reflect:!0})],ob.prototype,"icon");oM([Vt({type:Boolean,attribute:"icon-hidden",reflect:!0})],ob.prototype,"iconHidden");oM([Vt({type:Boolean,reflect:!0})],ob.prototype,"vertical");var Gne=Object.defineProperty,_ne=Object.getOwnPropertyDescriptor,Dw=(e,s,n,t)=>{for(var u=t>1?void 0:t?_ne(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&Gne(s,n,u),u};const CJ=class extends ql{constructor(){super(...arguments),this._value=0,this.vertical=!1,this.slider=!1,this._input=tN(),this.onValueChange=new Event("change")}set value(s){this.setValue(s.toString())}get value(){return this._value}onChange(s){s.stopPropagation();const{value:n}=this._input;n&&this.setValue(n.value)}setValue(s){const{value:n}=this._input;let t=s;if(t=t.replace(/[^0-9.-]/g,""),t=t.replace(/(\..*)\./g,"$1"),t.endsWith(".")||(t.lastIndexOf("-")>0&&(t=t[0]+t.substring(1).replace(/-/g,"")),t==="-"||t==="-0"))return;let u=Number(t);Number.isNaN(u)||(u=this.min!==void 0?Math.max(u,this.min):u,u=this.max!==void 0?Math.min(u,this.max):u,this.value!==u&&(this._value=u,n&&(n.value=this.value.toString()),this.requestUpdate(),this.dispatchEvent(this.onValueChange)))}onBlur(){const{value:s}=this._input;s&&Number.isNaN(Number(s.value))&&(s.value=this.value.toString())}onSliderMouseDown(s){document.body.style.cursor="w-resize";const{clientX:n}=s,t=this.value;let u=!1;const o=m=>{var D;u=!0;const{clientX:P}=m,x=this.step??1,H=((D=x.toString().split(".")[1])==null?void 0:D.length)||0,_=1/(this.sensitivity??1),ne=(P-n)/_;if(Math.floor(Math.abs(ne))!==Math.abs(ne))return;const re=t+ne*x;this.setValue(re.toFixed(H))},f=()=>{this.slider=!0,this.removeEventListener("blur",f)},d=()=>{document.removeEventListener("mousemove",o),document.body.style.cursor="default",u?u=!1:(this.addEventListener("blur",f),this.slider=!1,requestAnimationFrame(()=>this.focus())),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",d)}onFocus(s){s.stopPropagation();const n=t=>{t.key==="Escape"&&(this.blur(),window.removeEventListener("keydown",n))};window.addEventListener("keydown",n)}connectedCallback(){super.connectedCallback(),this.min&&this.min>this.value&&(this._value=this.min),this.max&&this.max<this.value&&(this._value=this.max)}focus(){const{value:s}=this._input;s&&s.focus()}render(){const s=Xn`
      ${this.pref||this.icon?Xn`<bim-label
            style="pointer-events: auto"
            @mousedown=${this.onSliderMouseDown}
            .label=${this.pref}
            .icon=${this.icon}
          ></bim-label>`:null}
      <input
        ${z7(this._input)}
        type="text"
        aria-label=${this.label||this.name||"Number Input"}
        size="1"
        @input=${d=>d.stopPropagation()}
        @change=${this.onChange}
        @blur=${this.onBlur}
        @focus=${this.onFocus}
        .value=${this.value.toString()}
      />
      ${this.suffix?Xn`<bim-label
            style="pointer-events: auto"
            @mousedown=${this.onSliderMouseDown}
            .label=${this.suffix}
          ></bim-label>`:null}
    `,n=this.min??-1/0,t=this.max??1/0,u=100*(this.value-n)/(t-n),o=Xn`
      <style>
        .slider-indicator {
          width: ${`${u}%`};
        }
      </style>
      <div class="slider" @mousedown=${this.onSliderMouseDown}>
        <div class="slider-indicator"></div>
        ${this.pref||this.icon?Xn`<bim-label
              style="z-index: 1; margin-right: 0.125rem"
              .label=${`${this.pref}: `}
              .icon=${this.icon}
            ></bim-label>`:null}
        <bim-label
          style="z-index: 1;"
          .label=${this.value.toString()}
        ></bim-label>
        ${this.suffix?Xn`<bim-label
              style="z-index: 1;"
              .label=${this.suffix}
            ></bim-label>`:null}
      </div>
    `,f=`${this.label||this.name||this.pref?`${this.label||this.name||this.pref}: `:""}${this.value}${this.suffix??""}`;return Xn`
      <bim-input
        title=${f}
        .label=${this.label}
        .icon=${this.icon}
        .vertical=${this.vertical}
      >
        ${this.slider?o:s}
      </bim-input>
    `}};CJ.styles=ur`
    :host {
      --bim-input--bgc: var(
        --bim-number-input--bgc,
        var(--bim-ui_bg-contrast-20)
      );
      --bim-input--olw: var(--bim-number-input--olw, 2px);
      --bim-input--olc: var(--bim-number-input--olc, transparent);
      --bim-input--bdrs: var(--bim-number-input--bdrs, var(--bim-ui_size-4xs));
      --bim-input--p: 0 0.375rem;
      flex: 1;
      display: block;
    }

    :host(:focus) {
      --bim-input--olw: var(--bim-number-input--olw, 2px);
      --bim-input--olc: var(
        --bim-number-input¡focus--c,
        var(--bim-ui_color-accent)
      );
    }

    :host(:not([slider])) bim-label {
      --bim-label--c: var(
        --bim-number-input_affixes--c,
        var(--bim-ui_bg-contrast-60)
      );
      --bim-label--fz: var(
        --bim-number-input_affixes--fz,
        var(--bim-ui_size-xs)
      );
    }

    p {
      margin: 0;
      padding: 0;
    }

    input {
      background-color: transparent;
      outline: none;
      border: none;
      padding: 0;
      flex-grow: 1;
      text-align: right;
      font-family: inherit;
      font-feature-settings: inherit;
      font-variation-settings: inherit;
      font-size: var(--bim-number-input--fz, var(--bim-ui_size-xs));
      color: var(--bim-number-input--c, var(--bim-ui_bg-contrast-100));
    }

    :host([suffix]:not([pref])) input {
      text-align: left;
    }

    :host([slider]) {
      --bim-input--p: 0;
    }

    :host([slider]) .slider {
      --bim-label--c: var(--bim-ui_bg-contrast-100);
    }

    .slider {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .slider-indicator {
      height: 100%;
      background-color: var(--bim-ui_color-main);
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--bim-input--bdrs, var(--bim-ui_size-4xs));
    }

    bim-input {
      display: flex;
    }

    bim-label {
      pointer-events: none;
    }
  `;let M2=CJ;Dw([Vt({type:String,reflect:!0})],M2.prototype,"name",2);Dw([Vt({type:String,reflect:!0})],M2.prototype,"icon",2);Dw([Vt({type:String,reflect:!0})],M2.prototype,"label",2);Dw([Vt({type:String,reflect:!0})],M2.prototype,"pref",2);Dw([Vt({type:Number,reflect:!0})],M2.prototype,"min",2);Dw([Vt({type:Number,reflect:!0})],M2.prototype,"value",1);Dw([Vt({type:Number,reflect:!0})],M2.prototype,"step",2);Dw([Vt({type:Number,reflect:!0})],M2.prototype,"sensitivity",2);Dw([Vt({type:Number,reflect:!0})],M2.prototype,"max",2);Dw([Vt({type:String,reflect:!0})],M2.prototype,"suffix",2);Dw([Vt({type:Boolean,reflect:!0})],M2.prototype,"vertical",2);Dw([Vt({type:Boolean,reflect:!0})],M2.prototype,"slider",2);var Vne=Object.defineProperty,Wne=Object.getOwnPropertyDescriptor,mW=(e,s,n,t)=>{for(var u=t>1?void 0:t?Wne(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&Vne(s,n,u),u};const PJ=class extends ql{constructor(){super(...arguments),this.onValueChange=new Event("change"),this._hidden=!1,this.activationButton=document.createElement("bim-button")}set hidden(s){this._hidden=s,this.activationButton.active=!s,this.dispatchEvent(new Event("hiddenchange"))}get hidden(){return this._hidden}get value(){return tW(this)}set value(s){const n=[...this.children];for(const t in s){const u=n.find(f=>{const d=f;return d.name===t||d.label===t});if(!u)continue;const o=u;o.value=s[t]}}connectedCallback(){super.connectedCallback(),this.activationButton.active=!this.hidden,this.activationButton.onclick=()=>this.hidden=!this.hidden}disconnectedCallback(){super.disconnectedCallback(),this.activationButton.remove()}collapseSections(){const s=this.querySelectorAll("bim-panel-section");for(const n of s)n.collapsed=!0}expandSections(){const s=this.querySelectorAll("bim-panel-section");for(const n of s)n.collapsed=!1}render(){return this.activationButton.icon=this.icon,this.activationButton.label=this.label||this.name,this.activationButton.tooltipTitle=this.label||this.name,Xn`
      <div class="parent">
        ${this.label||this.name||this.icon?Xn`<bim-label
              .label=${this.label||this.name}
              .icon=${this.icon}
            ></bim-label>`:null}
        <div class="sections">
          <slot></slot>
        </div>
      </div>
    `}};PJ.styles=[ab.scrollbar,ur`
      :host {
        display: flex;
        border-radius: var(--bim-ui_size-base);
        background-color: var(--bim-ui_bg-base);
        min-width: 20rem;
        overflow: auto;
      }

      :host([hidden]) {
        display: none;
      }

      .parent {
        display: flex;
        flex: 1;
        flex-direction: column;
        pointer-events: auto;
      }

      .parent bim-label {
        --bim-label--c: var(--bim-panel--c, var(--bim-ui_bg-contrast-80));
        --bim-label--fz: var(--bim-panel--fz, var(--bim-ui_size-sm));
        font-weight: 600;
        padding: 1rem;
        flex-shrink: 0;
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }

      .sections {
        display: flex;
        flex-direction: column;
        overflow: auto;
      }

      ::slotted(bim-panel-section:not(:last-child)) {
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }
    `];let mG=PJ;mW([Vt({type:String,reflect:!0})],mG.prototype,"icon",2);mW([Vt({type:String,reflect:!0})],mG.prototype,"name",2);mW([Vt({type:String,reflect:!0})],mG.prototype,"label",2);mW([Vt({type:Boolean,reflect:!0})],mG.prototype,"hidden",1);var Yne=Object.defineProperty,RG=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Yne(s,n,u),u};const MJ=class extends ql{constructor(){super(...arguments),this.onValueChange=new Event("change")}get value(){return tW(this)}set value(s){const n=[...this.children];for(const t in s){const u=n.find(f=>{const d=f;return d.name===t||d.label===t});if(!u)continue;const o=u;o.value=s[t]}}onHeaderClick(){this.fixed||(this.collapsed=!this.collapsed)}render(){const s=this.label||this.icon||this.name||this.fixed,n=Xn`<svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.125rem"
      viewBox="0 0 24 24"
      width="1.125rem"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>`,t=Xn`<svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.125rem"
      viewBox="0 0 24 24"
      width="1.125rem"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
    </svg>`,u=this.collapsed?n:t,o=Xn`
      <div
        class="header"
        title=${this.label??""}
        @click=${this.onHeaderClick}
      >
        ${this.label||this.icon||this.name?Xn`<bim-label
              .label=${this.label||this.name}
              .icon=${this.icon}
            ></bim-label>`:null}
        ${this.fixed?null:u}
      </div>
    `;return Xn`
      <div class="parent">
        ${s?o:null}
        <div class="components">
          <slot></slot>
        </div>
      </div>
    `}};MJ.styles=[ab.scrollbar,ur`
      :host {
        display: block;
        /* height: 100%; */
        pointer-events: auto;
      }

      :host(:not([fixed])) .header:hover {
        --bim-label--c: var(
          --bim-panel-section¡hover,
          var(--bim-ui_color-accent)
        );
        cursor: pointer;
        color: var(--bim-panel-section¡hover, var(--bim-ui_color-accent));
      }

      :host(:not([fixed])) .header:hover svg {
        fill: var(--bim-panel-section¡hover, var(--bim-ui_color-accent));
      }

      .header {
        --bim-label--fz: var(--bim-panel--fz, var(--bim-ui_size-sm));
        z-index: 3;
        flex-shrink: 0;
        /* position: sticky;
        top: 0; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        user-select: none;
        height: 1.5rem;
        padding: 0.75rem 1rem;
        /* background-color: var(--bim-panel-section--bgc, var(--bim-ui_bg-base)); */
        color: var(--bim-panel-section--c, var(--bim-ui_bg-contrast-80));
      }

      .header svg {
        fill: var(--bim-panel-section--c, var(--bim-ui_bg-contrast-80));
      }

      .title {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
      }

      .title p {
        font-size: var(--bim-panel-section--fz, var(--bim-ui_size-sm));
      }

      .components {
        display: flex;
        flex-direction: column;
        row-gap: 0.75rem;
        padding: 0.125rem 1rem 1rem;
      }

      :host(:not([fixed])[collapsed]) .components {
        display: none;
      }

      bim-label {
        pointer-events: none;
      }
    `];let cM=MJ;RG([Vt({type:String,reflect:!0})],cM.prototype,"icon");RG([Vt({type:String,reflect:!0})],cM.prototype,"label");RG([Vt({type:String,reflect:!0})],cM.prototype,"name");RG([Vt({type:Boolean,reflect:!0})],cM.prototype,"fixed");RG([Vt({type:Boolean,reflect:!0})],cM.prototype,"collapsed");var zne=Object.defineProperty,AG=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&zne(s,n,u),u};const xJ=class extends ql{constructor(){super(...arguments),this.vertical=!1,this.onValueChange=new Event("change"),this._canEmitEvents=!1,this._value=document.createElement("bim-option"),this.onOptionClick=s=>{this._value=s.target,this.dispatchEvent(this.onValueChange);for(const n of this.children)n instanceof Bo&&(n.checked=n===s.target)}}get _options(){return[...this.querySelectorAll("bim-option")]}set value(s){const n=this.findOption(s);if(n){for(const t of this._options)t.checked=t===n;this._value=n,this._canEmitEvents&&this.dispatchEvent(this.onValueChange)}}get value(){return this._value.value}onSlotChange(s){const n=s.target.assignedElements();for(const t of n)t instanceof Bo&&(t.noMark=!0,t.removeEventListener("click",this.onOptionClick),t.addEventListener("click",this.onOptionClick))}findOption(s){return this._options.find(n=>n instanceof Bo?n.label===s||n.value===s:!1)}firstUpdated(){const s=[...this.children].find(n=>n instanceof Bo&&n.checked);s&&(this._value=s)}render(){return Xn`
      <bim-input
        .vertical=${this.vertical}
        .label=${this.label}
        .icon=${this.icon}
      >
        <slot @slotchange=${this.onSlotChange}></slot>
      </bim-input>
    `}};xJ.styles=ur`
    :host {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
      --bim-input--g: 0;
      --bim-option--jc: center;
      flex: 1;
      display: block;
    }

    ::slotted(bim-option) {
      border-radius: 0;
    }

    ::slotted(bim-option[checked]) {
      --bim-label--c: white;
      background-color: var(--bim-ui_color-main);
    }
  `;let hM=xJ;AG([Vt({type:String,reflect:!0})],hM.prototype,"name");AG([Vt({type:String,reflect:!0})],hM.prototype,"icon");AG([Vt({type:String,reflect:!0})],hM.prototype,"label");AG([Vt({type:Boolean,reflect:!0})],hM.prototype,"vertical");AG([yG()],hM.prototype,"_value");var jne=Object.defineProperty,kne=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&jne(s,n,u),u};const UJ=class extends ql{constructor(){super(...arguments),this.rowData={}}get data(){return this.column?this.rowData[this.column]:null}render(){return Xn`
      <style>
        :host {
          grid-area: ${this.column??"unset"};
        }
      </style>
      <slot></slot>
    `}};UJ.styles=ur`
    :host {
      padding: 0.25rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted(*) {
      --bim-input--bgc: transparent;
      --bim-input--olc: var(--bim-ui_bg-contrast-20);
      --bim-input--olw: 1px;
    }

    ::slotted(bim-input) {
      --bim-input--olw: 0;
    }
  `;let BJ=UJ;kne([Vt({type:String,reflect:!0})],BJ.prototype,"column");var qne=Object.defineProperty,$ne=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&qne(s,n,u),u};const HJ=class extends ql{constructor(){super(...arguments),this._groups=[],this.data=[],this.table=this.closest("bim-table")}toggleGroups(s,n=!1){for(const t of this._groups)t.childrenHidden=typeof s>"u"?!t.childrenHidden:!s,n&&t.toggleChildren(s,n)}render(){return this._groups=[],Xn`
      ${this.data.map(s=>{const n=document.createElement("bim-table-group");return this._groups.push(n),n.table=this.table,n.data=s,n})}
    `}};HJ.styles=ur`
    :host {
      position: relative;
      grid-area: Children;
    }

    :host([hidden]) {
      display: none;
    }
  `;let FJ=HJ;$ne([Vt({type:Array,attribute:!1})],FJ.prototype,"data");var Kne=Object.defineProperty,Qne=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Kne(s,n,u),u};const GJ=class extends ql{constructor(){super(...arguments),this.data={data:{}},this.childrenHidden=!0,this.table=this.closest("bim-table")}connectedCallback(){super.connectedCallback(),this.table&&this.table.expanded?this.childrenHidden=!1:this.childrenHidden=!0}toggleChildren(s,n=!1){this._children&&(this.childrenHidden=typeof s>"u"?!this.childrenHidden:!s,n&&this._children.toggleGroups(s,n))}render(){var s,n;const t=((s=this.table)==null?void 0:s.getGroupIndentation(this.data))??0,u=Xn`
      <style>
        .branch-vertical {
          left: ${t+.5625}rem;
        }
      </style>
      <div class="branch branch-vertical"></div>
    `,o=document.createElement("div");o.classList.add("branch","branch-horizontal"),o.style.left=`${t-1+.5625}rem`;const f=document.createElementNS("http://www.w3.org/2000/svg","svg");f.setAttribute("height","9.5"),f.setAttribute("width","7.5"),f.setAttribute("viewBox","0 0 4.6666672 7.3333333");const d=document.createElementNS("http://www.w3.org/2000/svg","path");d.setAttribute("d","m 1.7470835,6.9583848 2.5899999,-2.59 c 0.39,-0.39 0.39,-1.02 0,-1.41 L 1.7470835,0.36838483 c -0.63,-0.62000003 -1.71000005,-0.18 -1.71000005,0.70999997 v 5.17 c 0,0.9 1.08000005,1.34 1.71000005,0.71 z"),f.append(d);const m=document.createElementNS("http://www.w3.org/2000/svg","svg");m.setAttribute("height","6.5"),m.setAttribute("width","9.5"),m.setAttribute("viewBox","0 0 5.9111118 5.0175439");const D=document.createElementNS("http://www.w3.org/2000/svg","path");D.setAttribute("d","M -0.33616196,1.922522 2.253838,4.5125219 c 0.39,0.39 1.02,0.39 1.41,0 L 6.2538379,1.922522 c 0.6200001,-0.63 0.18,-1.71000007 -0.7099999,-1.71000007 H 0.37383804 c -0.89999997,0 -1.33999997,1.08000007 -0.71,1.71000007 z"),m.append(D);const P=document.createElement("div");P.addEventListener("click",()=>this.toggleChildren()),P.classList.add("caret"),P.style.left=`${.125+t}rem`,this.childrenHidden?P.append(f):P.append(m);const x=document.createElement("bim-table-row");x.table=this.table,x.data=this.data.data,(n=this.table)==null||n.dispatchEvent(new CustomEvent("rowcreated",{detail:{row:x}})),this.data.children&&x.append(P),t!==0&&(!this.data.children||this.childrenHidden)&&x.append(o);let H;return this.data.children&&(H=document.createElement("bim-table-children"),this._children=H,H.table=this.table,H.data=this.data.children),Xn`
      <div class="parent">
        ${this.data.children&&!this.childrenHidden?u:null}
        ${x} ${this.childrenHidden?null:H}
      </div>
    `}};GJ.styles=ur`
    :host {
      position: relative;
    }

    .parent {
      display: grid;
      grid-template-areas: "Data" "Children";
    }

    .branch {
      position: absolute;
      z-index: 1;
    }

    .branch-vertical {
      top: 1rem;
      bottom: 1rem;
      border-left: 1px dotted var(--bim-ui_bg-contrast-40);
    }

    .branch-horizontal {
      top: 50%;
      width: 1rem;
      border-bottom: 1px dotted var(--bim-ui_bg-contrast-40);
    }

    .caret {
      position: absolute;
      z-index: 2;
      transform: translateY(-50%) rotate(0deg);
      top: 50%;
      display: flex;
      width: 0.95rem;
      height: 0.95rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .caret svg {
      fill: var(--bim-ui_bg-contrast-60);
    }
  `;let _J=GJ;Qne([Vt({type:Boolean,attribute:"children-hidden",reflect:!0})],_J.prototype,"childrenHidden");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const g$=e=>ate(e)?e._$litType$.h:e.strings,Zne=Tk(class extends mk{constructor(e){super(e),this.et=new WeakMap}render(e){return[e]}update(e,[s]){const n=t$(this.it)?g$(this.it):null,t=t$(s)?g$(s):null;if(n!==null&&(t===null||n!==t)){const u=r$(e).pop();let o=this.et.get(n);if(o===void 0){const f=document.createDocumentFragment();o=ZV(Ia,f),o.setConnected(!1),this.et.set(n,o)}l$(o,[u]),s$(o,void 0,u)}if(t!==null){if(n===null||n!==t){const u=this.et.get(t);if(u!==void 0){const o=r$(u).pop();hte(e),s$(e,void 0,o),l$(e,[o])}}this.it=s}else this.it=void 0;return this.render(s)}});var Jne=Object.defineProperty,RW=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Jne(s,n,u),u};const VJ=class extends ql{constructor(){super(),this.data={},this._table=this.closest("bim-table"),this.onTableIndentationColorChange=s=>{var n;if(!this.table)return;const t=s.detail,{indentationLevel:u,color:o}=t;((n=this.table)==null?void 0:n.getRowIndentation(this.data))===u&&(this.style.backgroundColor=o)},this.onTableColumnsChange=()=>{this.table&&(this.columns=this.table.columns)},this._observer=new IntersectionObserver(s=>{this._intersecting=s[0].isIntersecting},{rootMargin:"10px"}),this.columns=[],this.isHeader=!1}get _columnNames(){return this.columns.map(s=>s.name)}get _columnWidths(){return this.columns.map(s=>s.width)}set table(s){this._table&&(this.columns=[],this._table.removeEventListener("columnschange",this.onTableColumnsChange)),this._table=s,this._table&&(this.columns=this._table.columns,this._table.addEventListener("columnschange",this.onTableColumnsChange),this._table.addEventListener("indentation",this.onTableIndentationColorChange))}get table(){return this._table}connectedCallback(){super.connectedCallback(),this._observer.observe(this)}compute(){var s,n;const t=((s=this.table)==null?void 0:s.getRowIndentation(this.data))??0,u=this.isHeader?this.data:((n=this.table)==null?void 0:n.computeRowDeclaration(this.data))??this.data,o=[];for(const f in u){const d=u[f];let m;typeof d=="string"||typeof d=="boolean"||typeof d=="number"?m=Xn`<bim-label label="${d}"></bim-label>`:m=d;const D=this._columnNames.indexOf(f)===0,P=`
        ${D&&!this.isHeader?"justify-content: normal":""};
        ${D&&!this.isHeader?`margin-left: ${t+.125}rem`:""}
      `,x=Xn`
        <bim-table-cell ${z7(H=>{if(!H)return;const _=H;_.rowData=this.data,setTimeout(()=>{var ne;(ne=this.table)==null||ne.dispatchEvent(new CustomEvent("cellcreated",{detail:{cell:_}}))})})} style="${P}" .column=${f}
          >${m}</bim-table-cell
        >
      `;o.push(x)}return Xn`
      <style>
        :host {
          grid-template-areas: "${this._columnNames.join(" ")}";
          grid-template-columns: ${this._columnWidths.join(" ")};
        }
      </style>
      ${o}
      <slot></slot>
    `}render(){return Xn`${Zne(this._intersecting?this.compute():Xn``)}`}};VJ.styles=ur`
    :host {
      position: relative;
      grid-area: Data;
      display: grid;
      min-height: 2.25rem;
      /* border-bottom: 1px solid var(--bim-ui_bg-contrast-20); */
    }
  `;let DG=VJ;RW([Vt({type:Array,attribute:!1})],DG.prototype,"columns");RW([Vt({type:Object,attribute:!1})],DG.prototype,"data");RW([Vt({type:Boolean,attribute:"is-header",reflect:!0})],DG.prototype,"isHeader");RW([yG()],DG.prototype,"_intersecting");var Xne=Object.defineProperty,vne=Object.getOwnPropertyDescriptor,cb=(e,s,n,t)=>{for(var u=t>1?void 0:t?vne(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&Xne(s,n,u),u};const WJ=class extends ql{constructor(){super(...arguments),this._columnsChange=new Event("columnschange"),this._filteredData=[],this.headersHidden=!1,this.minColWidth="4rem",this._columns=[],this._textDelimiters={comma:",",tab:"	"},this._queryString=null,this._data=[],this.expanded=!1,this.preserveStructureOnFilter=!1,this.indentationInText=!1,this.definition={},this._stringFilterFunction=(s,n)=>Object.values(n.data).some(t=>String(t).toLowerCase().includes(s.toLowerCase())),this._queryFilterFunction=(s,n)=>{let t=!1;const u=lj(s)??[];for(const o of u){if("queries"in o){t=!1;break}const{condition:f,value:d}=o;let{key:m}=o;if(m.startsWith("[")&&m.endsWith("]")){const D=m.replace("[","").replace("]","");m=D,t=Object.keys(n.data).filter(P=>P.includes(D)).map(P=>N$(n.data[P],f,d)).some(P=>P)}else t=N$(n.data[m],f,d);if(!t)break}return t}}set columns(s){const n=[];for(const t of s){const u=typeof t=="string"?{name:t,width:`minmax(${this.minColWidth}, 1fr)`}:t;n.push(u)}this._columns=n,this.computeMissingColumns(this.data),this.dispatchEvent(this._columnsChange)}get columns(){return this._columns}get _headerRowData(){const s={};for(const n of this.columns)if(typeof n=="string")s[n]=n;else{const{name:t}=n;s[t]=t}return s}get value(){return this.queryString?this._filteredData:this.data}set queryString(s){const n=s&&s.trim()!==""?s.trim():null;this._queryString=n,n?(lj(n)?(this.filterFunction=this._queryFilterFunction,this._filteredData=this.filter(n)):(this.filterFunction=this._stringFilterFunction,this._filteredData=this.filter(n)),this.preserveStructureOnFilter&&(this._expandedBeforeSearch===void 0&&(this._expandedBeforeSearch=this.expanded),this.expanded=!0)):(this.preserveStructureOnFilter&&this._expandedBeforeSearch!==void 0&&(this.expanded=this._expandedBeforeSearch,this._expandedBeforeSearch=void 0),this._filteredData=this.data)}get queryString(){return this._queryString}set data(s){this._data=s,this.computeMissingColumns(s)&&(this.columns=this._columns)}get data(){return this._data}computeMissingColumns(s){let n=!1;for(const t of s){const{children:u,data:o}=t;for(const f in o)this._columns.map(d=>typeof d=="string"?d:d.name).includes(f)||(this._columns.push({name:f,width:`minmax(${this.minColWidth}, 1fr)`}),n=!0);if(u){const f=this.computeMissingColumns(u);f&&!n&&(n=f)}}return n}generateText(s="comma",n=this.value,t="",u=!0){const o=this._textDelimiters[s];let f="";const d=this.columns.map(m=>m.name);if(u){this.indentationInText&&(f+=`Indentation${o}`);const m=`${d.join(o)}
`;f+=m}for(const[m,D]of n.entries()){const{data:P,children:x}=D,H=this.indentationInText?`${t}${m+1}${o}`:"",_=d.map(re=>P[re]??""),ne=`${H}${_.join(o)}
`;f+=ne,x&&(f+=this.generateText(s,D.children,`${t}${m+1}.`,!1))}return f}get csv(){return this.generateText("comma")}get tsv(){return this.generateText("tab")}computeRowDeclaration(s){const n={};for(const t in s){const u=this.definition[t];u?n[t]=u(s[t],s):n[t]=s[t]}return n}downloadData(s="BIM Table Data",n="json"){let t=null;if(n==="json"&&(t=new File([JSON.stringify(this.value,void 0,2)],`${s}.json`)),n==="csv"&&(t=new File([this.csv],`${s}.csv`)),n==="tsv"&&(t=new File([this.tsv],`${s}.tsv`)),!t)return;const u=document.createElement("a");u.href=URL.createObjectURL(t),u.download=t.name,u.click(),URL.revokeObjectURL(u.href)}getRowIndentation(s,n=this.value,t=0){for(const u of n){if(u.data===s)return t;if(u.children){const o=this.getRowIndentation(s,u.children,t+1);if(o!==null)return o}}return null}getGroupIndentation(s,n=this.value,t=0){for(const u of n){if(u===s)return t;if(u.children){const o=this.getGroupIndentation(s,u.children,t+1);if(o!==null)return o}}return null}setIndentationColor(s,n){const t=new CustomEvent("indentation",{detail:{indentationLevel:s,color:n}});this.dispatchEvent(t)}filter(s,n=this.filterFunction??this._stringFilterFunction,t=this.data){const u=[];for(const o of t)if(n(s,o)){if(this.preserveStructureOnFilter){const f={data:o.data};if(o.children){const d=this.filter(s,n,o.children);d.length&&(f.children=d)}u.push(f)}else if(u.push({data:o.data}),o.children){const f=this.filter(s,n,o.children);u.push(...f)}}else if(o.children){const f=this.filter(s,n,o.children);this.preserveStructureOnFilter&&f.length?u.push({data:o.data,children:f}):u.push(...f)}return u}render(){const s=document.createElement("bim-table-row");s.table=this,s.isHeader=!0,s.data=this._headerRowData,s.style.gridArea="Header",s.style.position="sticky",s.style.top="0",s.style.zIndex="5";const n=document.createElement("bim-table-children");return n.table=this,n.data=this.value,n.style.gridArea="Body",n.style.backgroundColor="transparent",Xn`
      <div class="parent">
        ${this.headersHidden?null:s}
        <div style="overflow-x: hidden; grid-area: Body">${n}</div>
      </div>
    `}};WJ.styles=[ab.scrollbar,ur`
      :host {
        --bim-button--bgc: transparent;
        position: relative;
        overflow: auto;
        display: block;
        pointer-events: auto;
      }

      .parent {
        display: grid;
        grid-template:
          "Header" auto
          "Body" 1fr
          "Footer" auto;
        overflow: auto;
        height: 100%;
      }

      .parent > bim-table-row[is-header] {
        color: var(--bim-table_header--c, var(--bim-ui_bg-contrast-100));
        background-color: var(
          --bim-table_header--bgc,
          var(--bim-ui_bg-contrast-20)
        );
      }

      .controls {
        display: flex;
        gap: 0.375rem;
        flex-wrap: wrap;
        margin-bottom: 0.5rem;
      }
    `];let mN=WJ;cb([yG()],mN.prototype,"_filteredData",2);cb([Vt({type:Boolean,attribute:"headers-hidden",reflect:!0})],mN.prototype,"headersHidden",2);cb([Vt({type:String,attribute:"min-col-width",reflect:!0})],mN.prototype,"minColWidth",2);cb([Vt({type:Array,attribute:!1})],mN.prototype,"columns",1);cb([Vt({type:String,attribute:"search-string",reflect:!0})],mN.prototype,"queryString",1);cb([Vt({type:Array,attribute:!1})],mN.prototype,"data",1);cb([Vt({type:Boolean,reflect:!0})],mN.prototype,"expanded",2);var ese=Object.defineProperty,tse=Object.getOwnPropertyDescriptor,AW=(e,s,n,t)=>{for(var u=t>1?void 0:t?tse(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&ese(s,n,u),u};const YJ=class extends ql{constructor(){super(...arguments),this._defaultName="__unnamed__",this.name=this._defaultName,this._hidden=!1}set hidden(s){this._hidden=s,this.dispatchEvent(new Event("hiddenchange"))}get hidden(){return this._hidden}connectedCallback(){super.connectedCallback();const{parentElement:s}=this;if(s&&this.name===this._defaultName){const n=[...s.children].indexOf(this);this.name=`${this._defaultName}${n}`}}render(){return Xn` <slot></slot> `}};YJ.styles=ur`
    :host {
      display: block;
      height: 100%;
    }

    :host([hidden]) {
      display: none;
    }
  `;let X5=YJ;AW([Vt({type:String,reflect:!0})],X5.prototype,"name",2);AW([Vt({type:String,reflect:!0})],X5.prototype,"label",2);AW([Vt({type:String,reflect:!0})],X5.prototype,"icon",2);AW([Vt({type:Boolean,reflect:!0})],X5.prototype,"hidden",1);var nse=Object.defineProperty,sse=Object.getOwnPropertyDescriptor,SG=(e,s,n,t)=>{for(var u=t>1?void 0:t?sse(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&nse(s,n,u),u};const zJ=class extends ql{constructor(){super(...arguments),this._switchers=[],this.bottom=!1,this.switchersHidden=!1,this.floating=!1,this.onTabHiddenChange=s=>{const n=s.target;n instanceof X5&&!n.hidden&&(n.removeEventListener("hiddenchange",this.onTabHiddenChange),this.tab=n.name,n.addEventListener("hiddenchange",this.onTabHiddenChange))}}set tab(s){this._tab=s;const n=[...this.children],t=n.find(u=>u instanceof X5&&u.name===s);for(const u of n){if(!(u instanceof X5))continue;u.hidden=t!==u;const o=this.getTabSwitcher(u.name);o&&o.toggleAttribute("data-active",!u.hidden)}}get tab(){return this._tab}getTabSwitcher(s){return this._switchers.find(n=>n.getAttribute("data-name")===s)}createSwitchers(){this._switchers=[];for(const s of this.children){if(!(s instanceof X5))continue;const n=document.createElement("div");n.addEventListener("click",()=>{this.tab===s.name?this.toggleAttribute("tab",!1):this.tab=s.name}),n.setAttribute("data-name",s.name),n.className="switcher";const t=document.createElement("bim-label");t.label=s.label,t.icon=s.icon,n.append(t),this._switchers.push(n)}}onSlotChange(s){this.createSwitchers();const n=s.target.assignedElements(),t=n.find(u=>u instanceof X5?this.tab?u.name===this.tab:!u.hidden:!1);t&&t instanceof X5&&(this.tab=t.name);for(const u of n){if(!(u instanceof X5)){u.remove();continue}u.removeEventListener("hiddenchange",this.onTabHiddenChange),t!==u&&(u.hidden=!0),u.addEventListener("hiddenchange",this.onTabHiddenChange)}}render(){return Xn`
      <div class="parent">
        <div class="switchers">${this._switchers}</div>
        <div class="content">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
      </div>
    `}};zJ.styles=[ab.scrollbar,ur`
      * {
        box-sizing: border-box;
      }

      :host {
        background-color: var(--bim-ui_bg-base);
        display: block;
        overflow: auto;
      }

      .parent {
        display: grid;
        grid-template: "switchers" auto "content" 1fr;
        height: 100%;
      }

      :host([bottom]) .parent {
        grid-template: "content" 1fr "switchers" auto;
      }

      .switchers {
        display: flex;
        height: 2.25rem;
        font-weight: 600;
        grid-area: switchers;
      }

      .switcher {
        cursor: pointer;
        pointer-events: auto;
        background-color: var(--bim-ui_bg-base);
        padding: 0rem 0.75rem;
        color: var(--bim-ui_bg-contrast-60);
      }

      .switcher:hover,
      .switcher[data-active] {
        --bim-label--c: var(--bim-ui_main-contrast);
        background-color: var(--bim-ui_color-main);
      }

      .switchers bim-label {
        pointer-events: none;
      }

      :host([switchers-hidden]) .switchers {
        display: none;
      }

      .content {
        grid-area: content;
        overflow: auto;
      }

      :host(:not([bottom])) .content {
        border-top: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([bottom]) .content {
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host(:not([tab])) .content {
        display: none;
      }

      :host([floating]) {
        background-color: transparent;
      }

      :host([floating]) .switchers {
        justify-self: center;
        overflow: auto;
      }

      :host([floating]:not([bottom])) .switchers {
        border-radius: var(--bim-ui_size-2xs) var(--bim-ui_size-2xs) 0 0;
        border-top: 1px solid var(--bim-ui_bg-contrast-20);
        border-left: 1px solid var(--bim-ui_bg-contrast-20);
        border-right: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating][bottom]) .switchers {
        border-radius: 0 0 var(--bim-ui_size-2xs) var(--bim-ui_size-2xs);
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
        border-left: 1px solid var(--bim-ui_bg-contrast-20);
        border-right: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating]:not([tab])) .switchers {
        border-radius: var(--bim-ui_size-2xs);
        border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating][bottom]:not([tab])) .switchers {
        border-top: 1px solid var(--bim-ui_bg-contrast-20);
      }

      :host([floating]) .content {
        border: 1px solid var(--bim-ui_bg-contrast-20);
        border-radius: var(--bim-ui_size-2xs);
        background-color: var(--bim-ui_bg-base);
      }
    `];let fM=zJ;SG([yG()],fM.prototype,"_switchers",2);SG([Vt({type:Boolean,reflect:!0})],fM.prototype,"bottom",2);SG([Vt({type:Boolean,attribute:"switchers-hidden",reflect:!0})],fM.prototype,"switchersHidden",2);SG([Vt({type:Boolean,reflect:!0})],fM.prototype,"floating",2);SG([Vt({type:String,reflect:!0})],fM.prototype,"tab",1);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lse=e=>e??Ia;var rse=Object.defineProperty,ise=Object.getOwnPropertyDescriptor,RN=(e,s,n,t)=>{for(var u=t>1?void 0:t?ise(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&rse(s,n,u),u};const jJ=class extends ql{constructor(){super(...arguments),this._inputTypes=["date","datetime-local","email","month","password","search","tel","text","time","url","week"],this.value="",this.vertical=!1,this._type="text",this.onValueChange=new Event("input")}set type(s){this._inputTypes.includes(s)&&(this._type=s)}get type(){return this._type}get query(){return lj(this.value)}onInputChange(s){s.stopPropagation();const n=s.target;clearTimeout(this._debounceTimeoutID),this._debounceTimeoutID=setTimeout(()=>{this.value=n.value,this.dispatchEvent(this.onValueChange)},this.debounce)}render(){return Xn`
      <bim-input
        .name=${this.name}
        .icon=${this.icon}
        .label=${this.label}
        .vertical=${this.vertical}
      >
        <input
          aria-label=${this.label||this.name||"Checkbox Input"}
          .type=${this.type}
          .value=${this.value}
          placeholder=${lse(this.placeholder)}
          @input=${this.onInputChange}
        />
      </bim-input>
    `}};jJ.styles=ur`
    :host {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
      flex: 1;
      display: block;
    }

    input {
      background-color: transparent;
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
      padding: 0 var(--bim-ui_size-3xs);
      border-radius: var(--bim-text-input--bdrs, var(--bim-ui_size-4xs));
      color: var(--bim-text-input--c, var(--bim-ui_bg-contrast-100));
    }

    :host(:focus) {
      --bim-input--olc: var(--bim-ui_color-accent);
    }

    /* :host([disabled]) {
      --bim-input--bgc: var(--bim-ui_bg-contrast-20);
    } */
  `;let wA=jJ;RN([Vt({type:String,reflect:!0})],wA.prototype,"icon",2);RN([Vt({type:String,reflect:!0})],wA.prototype,"label",2);RN([Vt({type:String,reflect:!0})],wA.prototype,"name",2);RN([Vt({type:String,reflect:!0})],wA.prototype,"placeholder",2);RN([Vt({type:String,reflect:!0})],wA.prototype,"value",2);RN([Vt({type:Boolean,reflect:!0})],wA.prototype,"vertical",2);RN([Vt({type:Number,reflect:!0})],wA.prototype,"debounce",2);RN([Vt({type:String,reflect:!0})],wA.prototype,"type",1);var use=Object.defineProperty,ase=Object.getOwnPropertyDescriptor,kJ=(e,s,n,t)=>{for(var u=t>1?void 0:t?ase(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&use(s,n,u),u};const qJ=class extends ql{constructor(){super(...arguments),this.rows=2,this._vertical=!1}set vertical(s){this._vertical=s,this.updateChildren()}get vertical(){return this._vertical}updateChildren(){const s=this.children;for(const n of s)this.vertical?n.setAttribute("label-hidden",""):n.removeAttribute("label-hidden")}render(){return Xn`
      <style>
        .parent {
          grid-auto-flow: ${this.vertical?"row":"column"};
          grid-template-rows: repeat(${this.rows}, 1fr);
        }
      </style>
      <div class="parent">
        <slot @slotchange=${this.updateChildren}></slot>
      </div>
    `}};qJ.styles=ur`
    .parent {
      display: grid;
      gap: 0.25rem;
    }

    ::slotted(bim-button[label]:not([vertical])) {
      --bim-button--jc: flex-start;
    }
  `;let DW=qJ;kJ([Vt({type:Number,reflect:!0})],DW.prototype,"rows",2);kJ([Vt({type:Boolean,reflect:!0})],DW.prototype,"vertical",1);var ose=Object.defineProperty,cse=Object.getOwnPropertyDescriptor,SW=(e,s,n,t)=>{for(var u=t>1?void 0:t?cse(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&ose(s,n,u),u};const $J=class extends ql{constructor(){super(...arguments),this._vertical=!1,this._labelHidden=!1}set vertical(s){this._vertical=s,this.updateChildren()}get vertical(){return this._vertical}set labelHidden(s){this._labelHidden=s,this.updateChildren()}get labelHidden(){return this._labelHidden}updateChildren(){const s=this.children;for(const n of s)n instanceof DW&&(n.vertical=this.vertical),n.toggleAttribute("label-hidden",this.vertical)}render(){return Xn`
      <div class="parent">
        <div class="children">
          <slot @slotchange=${this.updateChildren}></slot>
        </div>
        ${!this.labelHidden&&(this.label||this.icon)?Xn`<bim-label
              .label=${this.label}
              .icon=${this.icon}
            ></bim-label>`:null}
      </div>
    `}};$J.styles=ur`
    :host {
      --bim-label--fz: var(--bim-ui_size-xs);
      --bim-label--c: var(--bim-ui_bg-contrast-60);
      display: block;
      flex: 1;
    }

    :host(:not([vertical])) ::slotted(bim-button[vertical]) {
      --bim-icon--fz: var(--bim-ui_size-5xl);
      min-height: 3.75rem;
    }

    .parent {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      padding: 0.5rem;
    }

    :host([vertical]) .parent {
      flex-direction: row-reverse;
    }

    :host([vertical]) .parent > bim-label {
      writing-mode: tb;
    }

    .children {
      display: flex;
      gap: 0.25rem;
    }

    :host([vertical]) .children {
      flex-direction: column;
    }
  `;let dM=$J;SW([Vt({type:String,reflect:!0})],dM.prototype,"label",2);SW([Vt({type:String,reflect:!0})],dM.prototype,"icon",2);SW([Vt({type:Boolean,reflect:!0})],dM.prototype,"vertical",1);SW([Vt({type:Boolean,attribute:"label-hidden",reflect:!0})],dM.prototype,"labelHidden",1);const KJ=class Vl{static set config(s){this._config={...Vl._config,...s}}static get config(){return Vl._config}static addGlobalStyles(){let s=document.querySelector("style[id='bim-ui']");if(s)return;s=document.createElement("style"),s.id="bim-ui",s.textContent=ab.globalStyles.cssText;const n=document.head.firstChild;n?document.head.insertBefore(s,n):document.head.append(s)}static defineCustomElement(s,n){customElements.get(s)||customElements.define(s,n)}static registerComponents(){Vl.init()}static init(){Vl.addGlobalStyles(),Vl.defineCustomElement("bim-button",mne),Vl.defineCustomElement("bim-checkbox",uM),Vl.defineCustomElement("bim-color-input",ub),Vl.defineCustomElement("bim-context-menu",DJ),Vl.defineCustomElement("bim-dropdown",yA),Vl.defineCustomElement("bim-grid",Ok),Vl.defineCustomElement("bim-icon",Bne),Vl.defineCustomElement("bim-input",TG),Vl.defineCustomElement("bim-label",ob),Vl.defineCustomElement("bim-number-input",M2),Vl.defineCustomElement("bim-option",Bo),Vl.defineCustomElement("bim-panel",mG),Vl.defineCustomElement("bim-panel-section",cM),Vl.defineCustomElement("bim-selector",hM),Vl.defineCustomElement("bim-table",mN),Vl.defineCustomElement("bim-tabs",fM),Vl.defineCustomElement("bim-tab",X5),Vl.defineCustomElement("bim-table-cell",BJ),Vl.defineCustomElement("bim-table-children",FJ),Vl.defineCustomElement("bim-table-group",_J),Vl.defineCustomElement("bim-table-row",DG),Vl.defineCustomElement("bim-text-input",wA),Vl.defineCustomElement("bim-toolbar",NW),Vl.defineCustomElement("bim-toolbar-group",DW),Vl.defineCustomElement("bim-toolbar-section",dM),Vl.defineCustomElement("bim-viewport",JJ)}static newRandomId(){const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";for(let t=0;t<10;t++){const u=Math.floor(Math.random()*s.length);n+=s.charAt(u)}return n}};KJ._config={sectionLabelOnVerticalToolbar:!1};let hse=KJ;var fse=Object.defineProperty,dse=Object.getOwnPropertyDescriptor,Lk=(e,s,n,t)=>{for(var u=t>1?void 0:t?dse(s,n):s,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=(t?f(s,n,u):f(u))||u);return t&&u&&fse(s,n,u),u};const QJ=class extends ql{constructor(){super(...arguments),this.labelsHidden=!1,this._vertical=!1,this._hidden=!1}set vertical(s){this._vertical=s,this.updateSections()}get vertical(){return this._vertical}set hidden(s){this._hidden=s,this.dispatchEvent(new Event("hiddenchange"))}get hidden(){return this._hidden}updateSections(){const s=this.children;for(const n of s)n instanceof dM&&(n.labelHidden=this.vertical&&!hse.config.sectionLabelOnVerticalToolbar,n.vertical=this.vertical)}render(){return Xn`
      <div class="parent">
        <slot @slotchange=${this.updateSections}></slot>
      </div>
    `}};QJ.styles=ur`
    :host {
      --bim-button--bgc: transparent;
      background-color: var(--bim-ui_bg-base);
      border-radius: var(--bim-ui_size-2xs);
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .parent {
      display: flex;
      width: min-content;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    :host([vertical]) {
      width: min-content;
      border-radius: var(--bim-ui_size-2xs);
      border: 1px solid var(--bim-ui_bg-contrast-20);
    }

    ::slotted(bim-toolbar-section:not(:last-child)) {
      border-right: 1px solid var(--bim-ui_bg-contrast-20);
      border-bottom: none;
    }

    :host([vertical]) ::slotted(bim-toolbar-section:not(:last-child)) {
      border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      border-right: none;
    }
  `;let NW=QJ;Lk([Vt({type:String,reflect:!0})],NW.prototype,"icon",2);Lk([Vt({type:Boolean,attribute:"labels-hidden",reflect:!0})],NW.prototype,"labelsHidden",2);Lk([Vt({type:Boolean,reflect:!0})],NW.prototype,"vertical",1);var Ise=Object.defineProperty,yse=(e,s,n,t)=>{for(var u=void 0,o=e.length-1,f;o>=0;o--)(f=e[o])&&(u=f(s,n,u)||u);return u&&Ise(s,n,u),u};const ZJ=class extends ql{constructor(){super(),this._onResize=new Event("resize"),new ResizeObserver(()=>{setTimeout(()=>{this.dispatchEvent(this._onResize)})}).observe(this)}render(){return Xn`
      <div class="parent">
        <slot></slot>
      </div>
    `}};ZJ.styles=ur`
    :host {
      display: grid;
      min-width: 0;
      min-height: 0;
      height: 100%;
    }

    .parent {
      overflow: hidden;
      position: relative;
    }
  `;let JJ=ZJ;yse([Vt({type:String,reflect:!0})],JJ.prototype,"name");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const XJ="important",wse=" !"+XJ,t4e=Tk(class extends mk{constructor(e){var s;if(super(e),e.type!==ZZ.ATTRIBUTE||e.name!=="style"||((s=e.strings)==null?void 0:s.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((s,n)=>{const t=e[n];return t==null?s:s+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(e,[s]){const{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(s)),this.render(s);for(const t of this.ft)s[t]==null&&(this.ft.delete(t),t.includes("-")?n.removeProperty(t):n[t]=null);for(const t in s){const u=s[t];if(u!=null){this.ft.add(t);const o=typeof u=="string"&&u.endsWith(wse);t.includes("-")||o?n.setProperty(t,o?u.slice(0,-11):u,o?XJ:""):n[t]=u}}return eL}});/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bk="160",Ese={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},pse=0,O$=1,Tse=2,vJ=1,mse=2,W6=3,Aw=0,YI=1,Z0=2,nN=0,U9=1,L$=2,b$=3,C$=4,Rse=5,CO=100,Ase=101,Dse=102,P$=103,M$=104,Sse=200,Nse=201,gse=202,Ose=203,ij=204,uj=205,Lse=206,bse=207,Cse=208,Pse=209,Mse=210,xse=211,Use=212,Bse=213,Hse=214,Fse=0,Gse=1,_se=2,nW=3,Vse=4,Wse=5,Yse=6,zse=7,Ck=0,jse=1,kse=2,sN=0,qse=1,$se=2,Kse=3,Qse=4,Zse=5,Jse=6,eX=300,j9=301,k9=302,aj=303,oj=304,gW=306,cj=1e3,ep=1001,hj=1002,Rd=1003,x$=1004,xY=1005,v5=1006,Xse=1007,YF=1008,lN=1009,vse=1010,ele=1011,Pk=1012,tX=1013,KS=1014,QS=1015,zF=1016,nX=1017,sX=1018,BO=1020,tle=1021,tp=1023,nle=1024,sle=1025,HO=1026,q9=1027,lle=1028,lX=1029,rle=1030,rX=1031,iX=1033,UY=33776,BY=33777,HY=33778,FY=33779,U$=35840,B$=35841,H$=35842,F$=35843,uX=36196,G$=37492,_$=37496,V$=37808,W$=37809,Y$=37810,z$=37811,j$=37812,k$=37813,q$=37814,$$=37815,K$=37816,Q$=37817,Z$=37818,J$=37819,X$=37820,v$=37821,GY=36492,eK=36494,tK=36495,ile=36283,nK=36284,sK=36285,lK=36286,aX=3e3,FO=3001,ule=3200,ale=3201,oX=0,ole=1,tw="",Ad="srgb",uA="srgb-linear",Mk="display-p3",OW="display-p3-linear",sW="linear",Pr="srgb",lW="rec709",rW="p3",fP=7680,rK=519,cle=512,hle=513,fle=514,cX=515,dle=516,Ile=517,yle=518,wle=519,fj=35044,n4e=35048,iK="300 es",dj=1035,I7=2e3,iW=2001;class IM{addEventListener(s,n){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[s]===void 0&&(t[s]=[]),t[s].indexOf(n)===-1&&t[s].push(n)}hasEventListener(s,n){if(this._listeners===void 0)return!1;const t=this._listeners;return t[s]!==void 0&&t[s].indexOf(n)!==-1}removeEventListener(s,n){if(this._listeners===void 0)return;const u=this._listeners[s];if(u!==void 0){const o=u.indexOf(n);o!==-1&&u.splice(o,1)}}dispatchEvent(s){if(this._listeners===void 0)return;const t=this._listeners[s.type];if(t!==void 0){s.target=this;const u=t.slice(0);for(let o=0,f=u.length;o<f;o++)u[o].call(this,s);s.target=null}}}const yI=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let uK=1234567;const B9=Math.PI/180,jF=180/Math.PI;function j7(){const e=Math.random()*4294967295|0,s=Math.random()*4294967295|0,n=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(yI[e&255]+yI[e>>8&255]+yI[e>>16&255]+yI[e>>24&255]+"-"+yI[s&255]+yI[s>>8&255]+"-"+yI[s>>16&15|64]+yI[s>>24&255]+"-"+yI[n&63|128]+yI[n>>8&255]+"-"+yI[n>>16&255]+yI[n>>24&255]+yI[t&255]+yI[t>>8&255]+yI[t>>16&255]+yI[t>>24&255]).toLowerCase()}function Dd(e,s,n){return Math.max(s,Math.min(n,e))}function xk(e,s){return(e%s+s)%s}function Ele(e,s,n,t,u){return t+(e-s)*(u-t)/(n-s)}function ple(e,s,n){return e!==s?(n-e)/(s-e):0}function PF(e,s,n){return(1-n)*e+n*s}function Tle(e,s,n,t){return PF(e,s,1-Math.exp(-n*t))}function mle(e,s=1){return s-Math.abs(xk(e,s*2)-s)}function Rle(e,s,n){return e<=s?0:e>=n?1:(e=(e-s)/(n-s),e*e*(3-2*e))}function Ale(e,s,n){return e<=s?0:e>=n?1:(e=(e-s)/(n-s),e*e*e*(e*(e*6-15)+10))}function Dle(e,s){return e+Math.floor(Math.random()*(s-e+1))}function Sle(e,s){return e+Math.random()*(s-e)}function Nle(e){return e*(.5-Math.random())}function gle(e){e!==void 0&&(uK=e);let s=uK+=1831565813;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}function Ole(e){return e*B9}function Lle(e){return e*jF}function Ij(e){return(e&e-1)===0&&e!==0}function ble(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function uW(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function Cle(e,s,n,t,u){const o=Math.cos,f=Math.sin,d=o(n/2),m=f(n/2),D=o((s+t)/2),P=f((s+t)/2),x=o((s-t)/2),H=f((s-t)/2),_=o((t-s)/2),ne=f((t-s)/2);switch(u){case"XYX":e.set(d*P,m*x,m*H,d*D);break;case"YZY":e.set(m*H,d*P,m*x,d*D);break;case"ZXZ":e.set(m*x,m*H,d*P,d*D);break;case"XZX":e.set(d*P,m*ne,m*_,d*D);break;case"YXY":e.set(m*_,d*P,m*ne,d*D);break;case"ZYZ":e.set(m*ne,m*_,d*P,d*D);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+u)}}function nm(e,s){switch(s.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function ir(e,s){switch(s.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const hX={DEG2RAD:B9,RAD2DEG:jF,generateUUID:j7,clamp:Dd,euclideanModulo:xk,mapLinear:Ele,inverseLerp:ple,lerp:PF,damp:Tle,pingpong:mle,smoothstep:Rle,smootherstep:Ale,randInt:Dle,randFloat:Sle,randFloatSpread:Nle,seededRandom:gle,degToRad:Ole,radToDeg:Lle,isPowerOfTwo:Ij,ceilPowerOfTwo:ble,floorPowerOfTwo:uW,setQuaternionFromProperEuler:Cle,normalize:ir,denormalize:nm};class us{constructor(s=0,n=0){us.prototype.isVector2=!0,this.x=s,this.y=n}get width(){return this.x}set width(s){this.x=s}get height(){return this.y}set height(s){this.y=s}set(s,n){return this.x=s,this.y=n,this}setScalar(s){return this.x=s,this.y=s,this}setX(s){return this.x=s,this}setY(s){return this.y=s,this}setComponent(s,n){switch(s){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+s)}return this}getComponent(s){switch(s){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+s)}}clone(){return new this.constructor(this.x,this.y)}copy(s){return this.x=s.x,this.y=s.y,this}add(s){return this.x+=s.x,this.y+=s.y,this}addScalar(s){return this.x+=s,this.y+=s,this}addVectors(s,n){return this.x=s.x+n.x,this.y=s.y+n.y,this}addScaledVector(s,n){return this.x+=s.x*n,this.y+=s.y*n,this}sub(s){return this.x-=s.x,this.y-=s.y,this}subScalar(s){return this.x-=s,this.y-=s,this}subVectors(s,n){return this.x=s.x-n.x,this.y=s.y-n.y,this}multiply(s){return this.x*=s.x,this.y*=s.y,this}multiplyScalar(s){return this.x*=s,this.y*=s,this}divide(s){return this.x/=s.x,this.y/=s.y,this}divideScalar(s){return this.multiplyScalar(1/s)}applyMatrix3(s){const n=this.x,t=this.y,u=s.elements;return this.x=u[0]*n+u[3]*t+u[6],this.y=u[1]*n+u[4]*t+u[7],this}min(s){return this.x=Math.min(this.x,s.x),this.y=Math.min(this.y,s.y),this}max(s){return this.x=Math.max(this.x,s.x),this.y=Math.max(this.y,s.y),this}clamp(s,n){return this.x=Math.max(s.x,Math.min(n.x,this.x)),this.y=Math.max(s.y,Math.min(n.y,this.y)),this}clampScalar(s,n){return this.x=Math.max(s,Math.min(n,this.x)),this.y=Math.max(s,Math.min(n,this.y)),this}clampLength(s,n){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(s,Math.min(n,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(s){return this.x*s.x+this.y*s.y}cross(s){return this.x*s.y-this.y*s.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(s){const n=Math.sqrt(this.lengthSq()*s.lengthSq());if(n===0)return Math.PI/2;const t=this.dot(s)/n;return Math.acos(Dd(t,-1,1))}distanceTo(s){return Math.sqrt(this.distanceToSquared(s))}distanceToSquared(s){const n=this.x-s.x,t=this.y-s.y;return n*n+t*t}manhattanDistanceTo(s){return Math.abs(this.x-s.x)+Math.abs(this.y-s.y)}setLength(s){return this.normalize().multiplyScalar(s)}lerp(s,n){return this.x+=(s.x-this.x)*n,this.y+=(s.y-this.y)*n,this}lerpVectors(s,n,t){return this.x=s.x+(n.x-s.x)*t,this.y=s.y+(n.y-s.y)*t,this}equals(s){return s.x===this.x&&s.y===this.y}fromArray(s,n=0){return this.x=s[n],this.y=s[n+1],this}toArray(s=[],n=0){return s[n]=this.x,s[n+1]=this.y,s}fromBufferAttribute(s,n){return this.x=s.getX(n),this.y=s.getY(n),this}rotateAround(s,n){const t=Math.cos(n),u=Math.sin(n),o=this.x-s.x,f=this.y-s.y;return this.x=o*t-f*u+s.x,this.y=o*u+f*t+s.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class gs{constructor(s,n,t,u,o,f,d,m,D){gs.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],s!==void 0&&this.set(s,n,t,u,o,f,d,m,D)}set(s,n,t,u,o,f,d,m,D){const P=this.elements;return P[0]=s,P[1]=u,P[2]=d,P[3]=n,P[4]=o,P[5]=m,P[6]=t,P[7]=f,P[8]=D,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(s){const n=this.elements,t=s.elements;return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],this}extractBasis(s,n,t){return s.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(s){const n=s.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(s){return this.multiplyMatrices(this,s)}premultiply(s){return this.multiplyMatrices(s,this)}multiplyMatrices(s,n){const t=s.elements,u=n.elements,o=this.elements,f=t[0],d=t[3],m=t[6],D=t[1],P=t[4],x=t[7],H=t[2],_=t[5],ne=t[8],re=u[0],J=u[3],K=u[6],Ie=u[1],ce=u[4],ae=u[7],me=u[2],Ee=u[5],Ae=u[8];return o[0]=f*re+d*Ie+m*me,o[3]=f*J+d*ce+m*Ee,o[6]=f*K+d*ae+m*Ae,o[1]=D*re+P*Ie+x*me,o[4]=D*J+P*ce+x*Ee,o[7]=D*K+P*ae+x*Ae,o[2]=H*re+_*Ie+ne*me,o[5]=H*J+_*ce+ne*Ee,o[8]=H*K+_*ae+ne*Ae,this}multiplyScalar(s){const n=this.elements;return n[0]*=s,n[3]*=s,n[6]*=s,n[1]*=s,n[4]*=s,n[7]*=s,n[2]*=s,n[5]*=s,n[8]*=s,this}determinant(){const s=this.elements,n=s[0],t=s[1],u=s[2],o=s[3],f=s[4],d=s[5],m=s[6],D=s[7],P=s[8];return n*f*P-n*d*D-t*o*P+t*d*m+u*o*D-u*f*m}invert(){const s=this.elements,n=s[0],t=s[1],u=s[2],o=s[3],f=s[4],d=s[5],m=s[6],D=s[7],P=s[8],x=P*f-d*D,H=d*m-P*o,_=D*o-f*m,ne=n*x+t*H+u*_;if(ne===0)return this.set(0,0,0,0,0,0,0,0,0);const re=1/ne;return s[0]=x*re,s[1]=(u*D-P*t)*re,s[2]=(d*t-u*f)*re,s[3]=H*re,s[4]=(P*n-u*m)*re,s[5]=(u*o-d*n)*re,s[6]=_*re,s[7]=(t*m-D*n)*re,s[8]=(f*n-t*o)*re,this}transpose(){let s;const n=this.elements;return s=n[1],n[1]=n[3],n[3]=s,s=n[2],n[2]=n[6],n[6]=s,s=n[5],n[5]=n[7],n[7]=s,this}getNormalMatrix(s){return this.setFromMatrix4(s).invert().transpose()}transposeIntoArray(s){const n=this.elements;return s[0]=n[0],s[1]=n[3],s[2]=n[6],s[3]=n[1],s[4]=n[4],s[5]=n[7],s[6]=n[2],s[7]=n[5],s[8]=n[8],this}setUvTransform(s,n,t,u,o,f,d){const m=Math.cos(o),D=Math.sin(o);return this.set(t*m,t*D,-t*(m*f+D*d)+f+s,-u*D,u*m,-u*(-D*f+m*d)+d+n,0,0,1),this}scale(s,n){return this.premultiply(_Y.makeScale(s,n)),this}rotate(s){return this.premultiply(_Y.makeRotation(-s)),this}translate(s,n){return this.premultiply(_Y.makeTranslation(s,n)),this}makeTranslation(s,n){return s.isVector2?this.set(1,0,s.x,0,1,s.y,0,0,1):this.set(1,0,s,0,1,n,0,0,1),this}makeRotation(s){const n=Math.cos(s),t=Math.sin(s);return this.set(n,-t,0,t,n,0,0,0,1),this}makeScale(s,n){return this.set(s,0,0,0,n,0,0,0,1),this}equals(s){const n=this.elements,t=s.elements;for(let u=0;u<9;u++)if(n[u]!==t[u])return!1;return!0}fromArray(s,n=0){for(let t=0;t<9;t++)this.elements[t]=s[t+n];return this}toArray(s=[],n=0){const t=this.elements;return s[n]=t[0],s[n+1]=t[1],s[n+2]=t[2],s[n+3]=t[3],s[n+4]=t[4],s[n+5]=t[5],s[n+6]=t[6],s[n+7]=t[7],s[n+8]=t[8],s}clone(){return new this.constructor().fromArray(this.elements)}}const _Y=new gs;function fX(e){for(let s=e.length-1;s>=0;--s)if(e[s]>=65535)return!0;return!1}function aW(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Ple(){const e=aW("canvas");return e.style.display="block",e}const aK={};function MF(e){e in aK||(aK[e]=!0,console.warn(e))}const oK=new gs().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),cK=new gs().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),zG={[uA]:{transfer:sW,primaries:lW,toReference:e=>e,fromReference:e=>e},[Ad]:{transfer:Pr,primaries:lW,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[OW]:{transfer:sW,primaries:rW,toReference:e=>e.applyMatrix3(cK),fromReference:e=>e.applyMatrix3(oK)},[Mk]:{transfer:Pr,primaries:rW,toReference:e=>e.convertSRGBToLinear().applyMatrix3(cK),fromReference:e=>e.applyMatrix3(oK).convertLinearToSRGB()}},Mle=new Set([uA,OW]),Wl={enabled:!0,_workingColorSpace:uA,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!Mle.has(e))throw new Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,s,n){if(this.enabled===!1||s===n||!s||!n)return e;const t=zG[s].toReference,u=zG[n].fromReference;return u(t(e))},fromWorkingColorSpace:function(e,s){return this.convert(e,this._workingColorSpace,s)},toWorkingColorSpace:function(e,s){return this.convert(e,s,this._workingColorSpace)},getPrimaries:function(e){return zG[e].primaries},getTransfer:function(e){return e===tw?sW:zG[e].transfer}};function H9(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function VY(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let dP;class dX{static getDataURL(s){if(/^data:/i.test(s.src)||typeof HTMLCanvasElement>"u")return s.src;let n;if(s instanceof HTMLCanvasElement)n=s;else{dP===void 0&&(dP=aW("canvas")),dP.width=s.width,dP.height=s.height;const t=dP.getContext("2d");s instanceof ImageData?t.putImageData(s,0,0):t.drawImage(s,0,0,s.width,s.height),n=dP}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",s),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(s){if(typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap){const n=aW("canvas");n.width=s.width,n.height=s.height;const t=n.getContext("2d");t.drawImage(s,0,0,s.width,s.height);const u=t.getImageData(0,0,s.width,s.height),o=u.data;for(let f=0;f<o.length;f++)o[f]=H9(o[f]/255)*255;return t.putImageData(u,0,0),n}else if(s.data){const n=s.data.slice(0);for(let t=0;t<n.length;t++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[t]=Math.floor(H9(n[t]/255)*255):n[t]=H9(n[t]);return{data:n,width:s.width,height:s.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),s}}let xle=0;class IX{constructor(s=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xle++}),this.uuid=j7(),this.data=s,this.version=0}set needsUpdate(s){s===!0&&this.version++}toJSON(s){const n=s===void 0||typeof s=="string";if(!n&&s.images[this.uuid]!==void 0)return s.images[this.uuid];const t={uuid:this.uuid,url:""},u=this.data;if(u!==null){let o;if(Array.isArray(u)){o=[];for(let f=0,d=u.length;f<d;f++)u[f].isDataTexture?o.push(WY(u[f].image)):o.push(WY(u[f]))}else o=WY(u);t.url=o}return n||(s.images[this.uuid]=t),t}}function WY(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?dX.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ule=0;class e4 extends IM{constructor(s=e4.DEFAULT_IMAGE,n=e4.DEFAULT_MAPPING,t=ep,u=ep,o=v5,f=YF,d=tp,m=lN,D=e4.DEFAULT_ANISOTROPY,P=tw){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ule++}),this.uuid=j7(),this.name="",this.source=new IX(s),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=t,this.wrapT=u,this.magFilter=o,this.minFilter=f,this.anisotropy=D,this.format=d,this.internalFormat=null,this.type=m,this.offset=new us(0,0),this.repeat=new us(1,1),this.center=new us(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gs,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof P=="string"?this.colorSpace=P:(MF("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=P===FO?Ad:tw),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(s=null){this.source.data=s}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(s){return this.name=s.name,this.source=s.source,this.mipmaps=s.mipmaps.slice(0),this.mapping=s.mapping,this.channel=s.channel,this.wrapS=s.wrapS,this.wrapT=s.wrapT,this.magFilter=s.magFilter,this.minFilter=s.minFilter,this.anisotropy=s.anisotropy,this.format=s.format,this.internalFormat=s.internalFormat,this.type=s.type,this.offset.copy(s.offset),this.repeat.copy(s.repeat),this.center.copy(s.center),this.rotation=s.rotation,this.matrixAutoUpdate=s.matrixAutoUpdate,this.matrix.copy(s.matrix),this.generateMipmaps=s.generateMipmaps,this.premultiplyAlpha=s.premultiplyAlpha,this.flipY=s.flipY,this.unpackAlignment=s.unpackAlignment,this.colorSpace=s.colorSpace,this.userData=JSON.parse(JSON.stringify(s.userData)),this.needsUpdate=!0,this}toJSON(s){const n=s===void 0||typeof s=="string";if(!n&&s.textures[this.uuid]!==void 0)return s.textures[this.uuid];const t={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(s).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),n||(s.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(s){if(this.mapping!==eX)return s;if(s.applyMatrix3(this.matrix),s.x<0||s.x>1)switch(this.wrapS){case cj:s.x=s.x-Math.floor(s.x);break;case ep:s.x=s.x<0?0:1;break;case hj:Math.abs(Math.floor(s.x)%2)===1?s.x=Math.ceil(s.x)-s.x:s.x=s.x-Math.floor(s.x);break}if(s.y<0||s.y>1)switch(this.wrapT){case cj:s.y=s.y-Math.floor(s.y);break;case ep:s.y=s.y<0?0:1;break;case hj:Math.abs(Math.floor(s.y)%2)===1?s.y=Math.ceil(s.y)-s.y:s.y=s.y-Math.floor(s.y);break}return this.flipY&&(s.y=1-s.y),s}set needsUpdate(s){s===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return MF("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ad?FO:aX}set encoding(s){MF("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=s===FO?Ad:tw}}e4.DEFAULT_IMAGE=null;e4.DEFAULT_MAPPING=eX;e4.DEFAULT_ANISOTROPY=1;class Uc{constructor(s=0,n=0,t=0,u=1){Uc.prototype.isVector4=!0,this.x=s,this.y=n,this.z=t,this.w=u}get width(){return this.z}set width(s){this.z=s}get height(){return this.w}set height(s){this.w=s}set(s,n,t,u){return this.x=s,this.y=n,this.z=t,this.w=u,this}setScalar(s){return this.x=s,this.y=s,this.z=s,this.w=s,this}setX(s){return this.x=s,this}setY(s){return this.y=s,this}setZ(s){return this.z=s,this}setW(s){return this.w=s,this}setComponent(s,n){switch(s){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+s)}return this}getComponent(s){switch(s){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+s)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(s){return this.x=s.x,this.y=s.y,this.z=s.z,this.w=s.w!==void 0?s.w:1,this}add(s){return this.x+=s.x,this.y+=s.y,this.z+=s.z,this.w+=s.w,this}addScalar(s){return this.x+=s,this.y+=s,this.z+=s,this.w+=s,this}addVectors(s,n){return this.x=s.x+n.x,this.y=s.y+n.y,this.z=s.z+n.z,this.w=s.w+n.w,this}addScaledVector(s,n){return this.x+=s.x*n,this.y+=s.y*n,this.z+=s.z*n,this.w+=s.w*n,this}sub(s){return this.x-=s.x,this.y-=s.y,this.z-=s.z,this.w-=s.w,this}subScalar(s){return this.x-=s,this.y-=s,this.z-=s,this.w-=s,this}subVectors(s,n){return this.x=s.x-n.x,this.y=s.y-n.y,this.z=s.z-n.z,this.w=s.w-n.w,this}multiply(s){return this.x*=s.x,this.y*=s.y,this.z*=s.z,this.w*=s.w,this}multiplyScalar(s){return this.x*=s,this.y*=s,this.z*=s,this.w*=s,this}applyMatrix4(s){const n=this.x,t=this.y,u=this.z,o=this.w,f=s.elements;return this.x=f[0]*n+f[4]*t+f[8]*u+f[12]*o,this.y=f[1]*n+f[5]*t+f[9]*u+f[13]*o,this.z=f[2]*n+f[6]*t+f[10]*u+f[14]*o,this.w=f[3]*n+f[7]*t+f[11]*u+f[15]*o,this}divideScalar(s){return this.multiplyScalar(1/s)}setAxisAngleFromQuaternion(s){this.w=2*Math.acos(s.w);const n=Math.sqrt(1-s.w*s.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=s.x/n,this.y=s.y/n,this.z=s.z/n),this}setAxisAngleFromRotationMatrix(s){let n,t,u,o;const m=s.elements,D=m[0],P=m[4],x=m[8],H=m[1],_=m[5],ne=m[9],re=m[2],J=m[6],K=m[10];if(Math.abs(P-H)<.01&&Math.abs(x-re)<.01&&Math.abs(ne-J)<.01){if(Math.abs(P+H)<.1&&Math.abs(x+re)<.1&&Math.abs(ne+J)<.1&&Math.abs(D+_+K-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const ce=(D+1)/2,ae=(_+1)/2,me=(K+1)/2,Ee=(P+H)/4,Ae=(x+re)/4,Me=(ne+J)/4;return ce>ae&&ce>me?ce<.01?(t=0,u=.707106781,o=.707106781):(t=Math.sqrt(ce),u=Ee/t,o=Ae/t):ae>me?ae<.01?(t=.707106781,u=0,o=.707106781):(u=Math.sqrt(ae),t=Ee/u,o=Me/u):me<.01?(t=.707106781,u=.707106781,o=0):(o=Math.sqrt(me),t=Ae/o,u=Me/o),this.set(t,u,o,n),this}let Ie=Math.sqrt((J-ne)*(J-ne)+(x-re)*(x-re)+(H-P)*(H-P));return Math.abs(Ie)<.001&&(Ie=1),this.x=(J-ne)/Ie,this.y=(x-re)/Ie,this.z=(H-P)/Ie,this.w=Math.acos((D+_+K-1)/2),this}min(s){return this.x=Math.min(this.x,s.x),this.y=Math.min(this.y,s.y),this.z=Math.min(this.z,s.z),this.w=Math.min(this.w,s.w),this}max(s){return this.x=Math.max(this.x,s.x),this.y=Math.max(this.y,s.y),this.z=Math.max(this.z,s.z),this.w=Math.max(this.w,s.w),this}clamp(s,n){return this.x=Math.max(s.x,Math.min(n.x,this.x)),this.y=Math.max(s.y,Math.min(n.y,this.y)),this.z=Math.max(s.z,Math.min(n.z,this.z)),this.w=Math.max(s.w,Math.min(n.w,this.w)),this}clampScalar(s,n){return this.x=Math.max(s,Math.min(n,this.x)),this.y=Math.max(s,Math.min(n,this.y)),this.z=Math.max(s,Math.min(n,this.z)),this.w=Math.max(s,Math.min(n,this.w)),this}clampLength(s,n){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(s,Math.min(n,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(s){return this.x*s.x+this.y*s.y+this.z*s.z+this.w*s.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(s){return this.normalize().multiplyScalar(s)}lerp(s,n){return this.x+=(s.x-this.x)*n,this.y+=(s.y-this.y)*n,this.z+=(s.z-this.z)*n,this.w+=(s.w-this.w)*n,this}lerpVectors(s,n,t){return this.x=s.x+(n.x-s.x)*t,this.y=s.y+(n.y-s.y)*t,this.z=s.z+(n.z-s.z)*t,this.w=s.w+(n.w-s.w)*t,this}equals(s){return s.x===this.x&&s.y===this.y&&s.z===this.z&&s.w===this.w}fromArray(s,n=0){return this.x=s[n],this.y=s[n+1],this.z=s[n+2],this.w=s[n+3],this}toArray(s=[],n=0){return s[n]=this.x,s[n+1]=this.y,s[n+2]=this.z,s[n+3]=this.w,s}fromBufferAttribute(s,n){return this.x=s.getX(n),this.y=s.getY(n),this.z=s.getZ(n),this.w=s.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ble extends IM{constructor(s=1,n=1,t={}){super(),this.isRenderTarget=!0,this.width=s,this.height=n,this.depth=1,this.scissor=new Uc(0,0,s,n),this.scissorTest=!1,this.viewport=new Uc(0,0,s,n);const u={width:s,height:n,depth:1};t.encoding!==void 0&&(MF("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===FO?Ad:tw),t=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:v5,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},t),this.texture=new e4(u,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps,this.texture.internalFormat=t.internalFormat,this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this.samples=t.samples}setSize(s,n,t=1){(this.width!==s||this.height!==n||this.depth!==t)&&(this.width=s,this.height=n,this.depth=t,this.texture.image.width=s,this.texture.image.height=n,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,s,n),this.scissor.set(0,0,s,n)}clone(){return new this.constructor().copy(this)}copy(s){this.width=s.width,this.height=s.height,this.depth=s.depth,this.scissor.copy(s.scissor),this.scissorTest=s.scissorTest,this.viewport.copy(s.viewport),this.texture=s.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},s.texture.image);return this.texture.source=new IX(n),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,s.depthTexture!==null&&(this.depthTexture=s.depthTexture.clone()),this.samples=s.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class aA extends Ble{constructor(s=1,n=1,t={}){super(s,n,t),this.isWebGLRenderTarget=!0}}class yX extends e4{constructor(s=null,n=1,t=1,u=1){super(null),this.isDataArrayTexture=!0,this.image={data:s,width:n,height:t,depth:u},this.magFilter=Rd,this.minFilter=Rd,this.wrapR=ep,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hle extends e4{constructor(s=null,n=1,t=1,u=1){super(null),this.isData3DTexture=!0,this.image={data:s,width:n,height:t,depth:u},this.magFilter=Rd,this.minFilter=Rd,this.wrapR=ep,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class s4e extends aA{constructor(s=1,n=1,t=1,u={}){super(s,n,u),this.isWebGLMultipleRenderTargets=!0;const o=this.texture;this.texture=[];for(let f=0;f<t;f++)this.texture[f]=o.clone(),this.texture[f].isRenderTargetTexture=!0}setSize(s,n,t=1){if(this.width!==s||this.height!==n||this.depth!==t){this.width=s,this.height=n,this.depth=t;for(let u=0,o=this.texture.length;u<o;u++)this.texture[u].image.width=s,this.texture[u].image.height=n,this.texture[u].image.depth=t;this.dispose()}this.viewport.set(0,0,s,n),this.scissor.set(0,0,s,n)}copy(s){this.dispose(),this.width=s.width,this.height=s.height,this.depth=s.depth,this.scissor.copy(s.scissor),this.scissorTest=s.scissorTest,this.viewport.copy(s.viewport),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,s.depthTexture!==null&&(this.depthTexture=s.depthTexture.clone()),this.texture.length=0;for(let n=0,t=s.texture.length;n<t;n++)this.texture[n]=s.texture[n].clone(),this.texture[n].isRenderTargetTexture=!0;return this}}class pI{constructor(s=0,n=0,t=0,u=1){this.isQuaternion=!0,this._x=s,this._y=n,this._z=t,this._w=u}static slerpFlat(s,n,t,u,o,f,d){let m=t[u+0],D=t[u+1],P=t[u+2],x=t[u+3];const H=o[f+0],_=o[f+1],ne=o[f+2],re=o[f+3];if(d===0){s[n+0]=m,s[n+1]=D,s[n+2]=P,s[n+3]=x;return}if(d===1){s[n+0]=H,s[n+1]=_,s[n+2]=ne,s[n+3]=re;return}if(x!==re||m!==H||D!==_||P!==ne){let J=1-d;const K=m*H+D*_+P*ne+x*re,Ie=K>=0?1:-1,ce=1-K*K;if(ce>Number.EPSILON){const me=Math.sqrt(ce),Ee=Math.atan2(me,K*Ie);J=Math.sin(J*Ee)/me,d=Math.sin(d*Ee)/me}const ae=d*Ie;if(m=m*J+H*ae,D=D*J+_*ae,P=P*J+ne*ae,x=x*J+re*ae,J===1-d){const me=1/Math.sqrt(m*m+D*D+P*P+x*x);m*=me,D*=me,P*=me,x*=me}}s[n]=m,s[n+1]=D,s[n+2]=P,s[n+3]=x}static multiplyQuaternionsFlat(s,n,t,u,o,f){const d=t[u],m=t[u+1],D=t[u+2],P=t[u+3],x=o[f],H=o[f+1],_=o[f+2],ne=o[f+3];return s[n]=d*ne+P*x+m*_-D*H,s[n+1]=m*ne+P*H+D*x-d*_,s[n+2]=D*ne+P*_+d*H-m*x,s[n+3]=P*ne-d*x-m*H-D*_,s}get x(){return this._x}set x(s){this._x=s,this._onChangeCallback()}get y(){return this._y}set y(s){this._y=s,this._onChangeCallback()}get z(){return this._z}set z(s){this._z=s,this._onChangeCallback()}get w(){return this._w}set w(s){this._w=s,this._onChangeCallback()}set(s,n,t,u){return this._x=s,this._y=n,this._z=t,this._w=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(s){return this._x=s.x,this._y=s.y,this._z=s.z,this._w=s.w,this._onChangeCallback(),this}setFromEuler(s,n=!0){const t=s._x,u=s._y,o=s._z,f=s._order,d=Math.cos,m=Math.sin,D=d(t/2),P=d(u/2),x=d(o/2),H=m(t/2),_=m(u/2),ne=m(o/2);switch(f){case"XYZ":this._x=H*P*x+D*_*ne,this._y=D*_*x-H*P*ne,this._z=D*P*ne+H*_*x,this._w=D*P*x-H*_*ne;break;case"YXZ":this._x=H*P*x+D*_*ne,this._y=D*_*x-H*P*ne,this._z=D*P*ne-H*_*x,this._w=D*P*x+H*_*ne;break;case"ZXY":this._x=H*P*x-D*_*ne,this._y=D*_*x+H*P*ne,this._z=D*P*ne+H*_*x,this._w=D*P*x-H*_*ne;break;case"ZYX":this._x=H*P*x-D*_*ne,this._y=D*_*x+H*P*ne,this._z=D*P*ne-H*_*x,this._w=D*P*x+H*_*ne;break;case"YZX":this._x=H*P*x+D*_*ne,this._y=D*_*x+H*P*ne,this._z=D*P*ne-H*_*x,this._w=D*P*x-H*_*ne;break;case"XZY":this._x=H*P*x-D*_*ne,this._y=D*_*x-H*P*ne,this._z=D*P*ne+H*_*x,this._w=D*P*x+H*_*ne;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(s,n){const t=n/2,u=Math.sin(t);return this._x=s.x*u,this._y=s.y*u,this._z=s.z*u,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(s){const n=s.elements,t=n[0],u=n[4],o=n[8],f=n[1],d=n[5],m=n[9],D=n[2],P=n[6],x=n[10],H=t+d+x;if(H>0){const _=.5/Math.sqrt(H+1);this._w=.25/_,this._x=(P-m)*_,this._y=(o-D)*_,this._z=(f-u)*_}else if(t>d&&t>x){const _=2*Math.sqrt(1+t-d-x);this._w=(P-m)/_,this._x=.25*_,this._y=(u+f)/_,this._z=(o+D)/_}else if(d>x){const _=2*Math.sqrt(1+d-t-x);this._w=(o-D)/_,this._x=(u+f)/_,this._y=.25*_,this._z=(m+P)/_}else{const _=2*Math.sqrt(1+x-t-d);this._w=(f-u)/_,this._x=(o+D)/_,this._y=(m+P)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(s,n){let t=s.dot(n)+1;return t<Number.EPSILON?(t=0,Math.abs(s.x)>Math.abs(s.z)?(this._x=-s.y,this._y=s.x,this._z=0,this._w=t):(this._x=0,this._y=-s.z,this._z=s.y,this._w=t)):(this._x=s.y*n.z-s.z*n.y,this._y=s.z*n.x-s.x*n.z,this._z=s.x*n.y-s.y*n.x,this._w=t),this.normalize()}angleTo(s){return 2*Math.acos(Math.abs(Dd(this.dot(s),-1,1)))}rotateTowards(s,n){const t=this.angleTo(s);if(t===0)return this;const u=Math.min(1,n/t);return this.slerp(s,u),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(s){return this._x*s._x+this._y*s._y+this._z*s._z+this._w*s._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let s=this.length();return s===0?(this._x=0,this._y=0,this._z=0,this._w=1):(s=1/s,this._x=this._x*s,this._y=this._y*s,this._z=this._z*s,this._w=this._w*s),this._onChangeCallback(),this}multiply(s){return this.multiplyQuaternions(this,s)}premultiply(s){return this.multiplyQuaternions(s,this)}multiplyQuaternions(s,n){const t=s._x,u=s._y,o=s._z,f=s._w,d=n._x,m=n._y,D=n._z,P=n._w;return this._x=t*P+f*d+u*D-o*m,this._y=u*P+f*m+o*d-t*D,this._z=o*P+f*D+t*m-u*d,this._w=f*P-t*d-u*m-o*D,this._onChangeCallback(),this}slerp(s,n){if(n===0)return this;if(n===1)return this.copy(s);const t=this._x,u=this._y,o=this._z,f=this._w;let d=f*s._w+t*s._x+u*s._y+o*s._z;if(d<0?(this._w=-s._w,this._x=-s._x,this._y=-s._y,this._z=-s._z,d=-d):this.copy(s),d>=1)return this._w=f,this._x=t,this._y=u,this._z=o,this;const m=1-d*d;if(m<=Number.EPSILON){const _=1-n;return this._w=_*f+n*this._w,this._x=_*t+n*this._x,this._y=_*u+n*this._y,this._z=_*o+n*this._z,this.normalize(),this}const D=Math.sqrt(m),P=Math.atan2(D,d),x=Math.sin((1-n)*P)/D,H=Math.sin(n*P)/D;return this._w=f*x+this._w*H,this._x=t*x+this._x*H,this._y=u*x+this._y*H,this._z=o*x+this._z*H,this._onChangeCallback(),this}slerpQuaternions(s,n,t){return this.copy(s).slerp(n,t)}random(){const s=Math.random(),n=Math.sqrt(1-s),t=Math.sqrt(s),u=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(n*Math.cos(u),t*Math.sin(o),t*Math.cos(o),n*Math.sin(u))}equals(s){return s._x===this._x&&s._y===this._y&&s._z===this._z&&s._w===this._w}fromArray(s,n=0){return this._x=s[n],this._y=s[n+1],this._z=s[n+2],this._w=s[n+3],this._onChangeCallback(),this}toArray(s=[],n=0){return s[n]=this._x,s[n+1]=this._y,s[n+2]=this._z,s[n+3]=this._w,s}fromBufferAttribute(s,n){return this._x=s.getX(n),this._y=s.getY(n),this._z=s.getZ(n),this._w=s.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(s){return this._onChangeCallback=s,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ze{constructor(s=0,n=0,t=0){ze.prototype.isVector3=!0,this.x=s,this.y=n,this.z=t}set(s,n,t){return t===void 0&&(t=this.z),this.x=s,this.y=n,this.z=t,this}setScalar(s){return this.x=s,this.y=s,this.z=s,this}setX(s){return this.x=s,this}setY(s){return this.y=s,this}setZ(s){return this.z=s,this}setComponent(s,n){switch(s){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+s)}return this}getComponent(s){switch(s){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+s)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(s){return this.x=s.x,this.y=s.y,this.z=s.z,this}add(s){return this.x+=s.x,this.y+=s.y,this.z+=s.z,this}addScalar(s){return this.x+=s,this.y+=s,this.z+=s,this}addVectors(s,n){return this.x=s.x+n.x,this.y=s.y+n.y,this.z=s.z+n.z,this}addScaledVector(s,n){return this.x+=s.x*n,this.y+=s.y*n,this.z+=s.z*n,this}sub(s){return this.x-=s.x,this.y-=s.y,this.z-=s.z,this}subScalar(s){return this.x-=s,this.y-=s,this.z-=s,this}subVectors(s,n){return this.x=s.x-n.x,this.y=s.y-n.y,this.z=s.z-n.z,this}multiply(s){return this.x*=s.x,this.y*=s.y,this.z*=s.z,this}multiplyScalar(s){return this.x*=s,this.y*=s,this.z*=s,this}multiplyVectors(s,n){return this.x=s.x*n.x,this.y=s.y*n.y,this.z=s.z*n.z,this}applyEuler(s){return this.applyQuaternion(hK.setFromEuler(s))}applyAxisAngle(s,n){return this.applyQuaternion(hK.setFromAxisAngle(s,n))}applyMatrix3(s){const n=this.x,t=this.y,u=this.z,o=s.elements;return this.x=o[0]*n+o[3]*t+o[6]*u,this.y=o[1]*n+o[4]*t+o[7]*u,this.z=o[2]*n+o[5]*t+o[8]*u,this}applyNormalMatrix(s){return this.applyMatrix3(s).normalize()}applyMatrix4(s){const n=this.x,t=this.y,u=this.z,o=s.elements,f=1/(o[3]*n+o[7]*t+o[11]*u+o[15]);return this.x=(o[0]*n+o[4]*t+o[8]*u+o[12])*f,this.y=(o[1]*n+o[5]*t+o[9]*u+o[13])*f,this.z=(o[2]*n+o[6]*t+o[10]*u+o[14])*f,this}applyQuaternion(s){const n=this.x,t=this.y,u=this.z,o=s.x,f=s.y,d=s.z,m=s.w,D=2*(f*u-d*t),P=2*(d*n-o*u),x=2*(o*t-f*n);return this.x=n+m*D+f*x-d*P,this.y=t+m*P+d*D-o*x,this.z=u+m*x+o*P-f*D,this}project(s){return this.applyMatrix4(s.matrixWorldInverse).applyMatrix4(s.projectionMatrix)}unproject(s){return this.applyMatrix4(s.projectionMatrixInverse).applyMatrix4(s.matrixWorld)}transformDirection(s){const n=this.x,t=this.y,u=this.z,o=s.elements;return this.x=o[0]*n+o[4]*t+o[8]*u,this.y=o[1]*n+o[5]*t+o[9]*u,this.z=o[2]*n+o[6]*t+o[10]*u,this.normalize()}divide(s){return this.x/=s.x,this.y/=s.y,this.z/=s.z,this}divideScalar(s){return this.multiplyScalar(1/s)}min(s){return this.x=Math.min(this.x,s.x),this.y=Math.min(this.y,s.y),this.z=Math.min(this.z,s.z),this}max(s){return this.x=Math.max(this.x,s.x),this.y=Math.max(this.y,s.y),this.z=Math.max(this.z,s.z),this}clamp(s,n){return this.x=Math.max(s.x,Math.min(n.x,this.x)),this.y=Math.max(s.y,Math.min(n.y,this.y)),this.z=Math.max(s.z,Math.min(n.z,this.z)),this}clampScalar(s,n){return this.x=Math.max(s,Math.min(n,this.x)),this.y=Math.max(s,Math.min(n,this.y)),this.z=Math.max(s,Math.min(n,this.z)),this}clampLength(s,n){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(s,Math.min(n,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(s){return this.x*s.x+this.y*s.y+this.z*s.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(s){return this.normalize().multiplyScalar(s)}lerp(s,n){return this.x+=(s.x-this.x)*n,this.y+=(s.y-this.y)*n,this.z+=(s.z-this.z)*n,this}lerpVectors(s,n,t){return this.x=s.x+(n.x-s.x)*t,this.y=s.y+(n.y-s.y)*t,this.z=s.z+(n.z-s.z)*t,this}cross(s){return this.crossVectors(this,s)}crossVectors(s,n){const t=s.x,u=s.y,o=s.z,f=n.x,d=n.y,m=n.z;return this.x=u*m-o*d,this.y=o*f-t*m,this.z=t*d-u*f,this}projectOnVector(s){const n=s.lengthSq();if(n===0)return this.set(0,0,0);const t=s.dot(this)/n;return this.copy(s).multiplyScalar(t)}projectOnPlane(s){return YY.copy(this).projectOnVector(s),this.sub(YY)}reflect(s){return this.sub(YY.copy(s).multiplyScalar(2*this.dot(s)))}angleTo(s){const n=Math.sqrt(this.lengthSq()*s.lengthSq());if(n===0)return Math.PI/2;const t=this.dot(s)/n;return Math.acos(Dd(t,-1,1))}distanceTo(s){return Math.sqrt(this.distanceToSquared(s))}distanceToSquared(s){const n=this.x-s.x,t=this.y-s.y,u=this.z-s.z;return n*n+t*t+u*u}manhattanDistanceTo(s){return Math.abs(this.x-s.x)+Math.abs(this.y-s.y)+Math.abs(this.z-s.z)}setFromSpherical(s){return this.setFromSphericalCoords(s.radius,s.phi,s.theta)}setFromSphericalCoords(s,n,t){const u=Math.sin(n)*s;return this.x=u*Math.sin(t),this.y=Math.cos(n)*s,this.z=u*Math.cos(t),this}setFromCylindrical(s){return this.setFromCylindricalCoords(s.radius,s.theta,s.y)}setFromCylindricalCoords(s,n,t){return this.x=s*Math.sin(n),this.y=t,this.z=s*Math.cos(n),this}setFromMatrixPosition(s){const n=s.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(s){const n=this.setFromMatrixColumn(s,0).length(),t=this.setFromMatrixColumn(s,1).length(),u=this.setFromMatrixColumn(s,2).length();return this.x=n,this.y=t,this.z=u,this}setFromMatrixColumn(s,n){return this.fromArray(s.elements,n*4)}setFromMatrix3Column(s,n){return this.fromArray(s.elements,n*3)}setFromEuler(s){return this.x=s._x,this.y=s._y,this.z=s._z,this}setFromColor(s){return this.x=s.r,this.y=s.g,this.z=s.b,this}equals(s){return s.x===this.x&&s.y===this.y&&s.z===this.z}fromArray(s,n=0){return this.x=s[n],this.y=s[n+1],this.z=s[n+2],this}toArray(s=[],n=0){return s[n]=this.x,s[n+1]=this.y,s[n+2]=this.z,s}fromBufferAttribute(s,n){return this.x=s.getX(n),this.y=s.getY(n),this.z=s.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const s=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,t=Math.sqrt(1-s**2);return this.x=t*Math.cos(n),this.y=t*Math.sin(n),this.z=s,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const YY=new ze,hK=new pI;class tl{constructor(s=new ze(1/0,1/0,1/0),n=new ze(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=s,this.max=n}set(s,n){return this.min.copy(s),this.max.copy(n),this}setFromArray(s){this.makeEmpty();for(let n=0,t=s.length;n<t;n+=3)this.expandByPoint(kE.fromArray(s,n));return this}setFromBufferAttribute(s){this.makeEmpty();for(let n=0,t=s.count;n<t;n++)this.expandByPoint(kE.fromBufferAttribute(s,n));return this}setFromPoints(s){this.makeEmpty();for(let n=0,t=s.length;n<t;n++)this.expandByPoint(s[n]);return this}setFromCenterAndSize(s,n){const t=kE.copy(n).multiplyScalar(.5);return this.min.copy(s).sub(t),this.max.copy(s).add(t),this}setFromObject(s,n=!1){return this.makeEmpty(),this.expandByObject(s,n)}clone(){return new this.constructor().copy(this)}copy(s){return this.min.copy(s.min),this.max.copy(s.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(s){return this.isEmpty()?s.set(0,0,0):s.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(s){return this.isEmpty()?s.set(0,0,0):s.subVectors(this.max,this.min)}expandByPoint(s){return this.min.min(s),this.max.max(s),this}expandByVector(s){return this.min.sub(s),this.max.add(s),this}expandByScalar(s){return this.min.addScalar(-s),this.max.addScalar(s),this}expandByObject(s,n=!1){s.updateWorldMatrix(!1,!1);const t=s.geometry;if(t!==void 0){const o=t.getAttribute("position");if(n===!0&&o!==void 0&&s.isInstancedMesh!==!0)for(let f=0,d=o.count;f<d;f++)s.isMesh===!0?s.getVertexPosition(f,kE):kE.fromBufferAttribute(o,f),kE.applyMatrix4(s.matrixWorld),this.expandByPoint(kE);else s.boundingBox!==void 0?(s.boundingBox===null&&s.computeBoundingBox(),jG.copy(s.boundingBox)):(t.boundingBox===null&&t.computeBoundingBox(),jG.copy(t.boundingBox)),jG.applyMatrix4(s.matrixWorld),this.union(jG)}const u=s.children;for(let o=0,f=u.length;o<f;o++)this.expandByObject(u[o],n);return this}containsPoint(s){return!(s.x<this.min.x||s.x>this.max.x||s.y<this.min.y||s.y>this.max.y||s.z<this.min.z||s.z>this.max.z)}containsBox(s){return this.min.x<=s.min.x&&s.max.x<=this.max.x&&this.min.y<=s.min.y&&s.max.y<=this.max.y&&this.min.z<=s.min.z&&s.max.z<=this.max.z}getParameter(s,n){return n.set((s.x-this.min.x)/(this.max.x-this.min.x),(s.y-this.min.y)/(this.max.y-this.min.y),(s.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(s){return!(s.max.x<this.min.x||s.min.x>this.max.x||s.max.y<this.min.y||s.min.y>this.max.y||s.max.z<this.min.z||s.min.z>this.max.z)}intersectsSphere(s){return this.clampPoint(s.center,kE),kE.distanceToSquared(s.center)<=s.radius*s.radius}intersectsPlane(s){let n,t;return s.normal.x>0?(n=s.normal.x*this.min.x,t=s.normal.x*this.max.x):(n=s.normal.x*this.max.x,t=s.normal.x*this.min.x),s.normal.y>0?(n+=s.normal.y*this.min.y,t+=s.normal.y*this.max.y):(n+=s.normal.y*this.max.y,t+=s.normal.y*this.min.y),s.normal.z>0?(n+=s.normal.z*this.min.z,t+=s.normal.z*this.max.z):(n+=s.normal.z*this.max.z,t+=s.normal.z*this.min.z),n<=-s.constant&&t>=-s.constant}intersectsTriangle(s){if(this.isEmpty())return!1;this.getCenter(RH),kG.subVectors(this.max,RH),IP.subVectors(s.a,RH),yP.subVectors(s.b,RH),wP.subVectors(s.c,RH),rS.subVectors(yP,IP),iS.subVectors(wP,yP),B8.subVectors(IP,wP);let n=[0,-rS.z,rS.y,0,-iS.z,iS.y,0,-B8.z,B8.y,rS.z,0,-rS.x,iS.z,0,-iS.x,B8.z,0,-B8.x,-rS.y,rS.x,0,-iS.y,iS.x,0,-B8.y,B8.x,0];return!zY(n,IP,yP,wP,kG)||(n=[1,0,0,0,1,0,0,0,1],!zY(n,IP,yP,wP,kG))?!1:(qG.crossVectors(rS,iS),n=[qG.x,qG.y,qG.z],zY(n,IP,yP,wP,kG))}clampPoint(s,n){return n.copy(s).clamp(this.min,this.max)}distanceToPoint(s){return this.clampPoint(s,kE).distanceTo(s)}getBoundingSphere(s){return this.isEmpty()?s.makeEmpty():(this.getCenter(s.center),s.radius=this.getSize(kE).length()*.5),s}intersect(s){return this.min.max(s.min),this.max.min(s.max),this.isEmpty()&&this.makeEmpty(),this}union(s){return this.min.min(s.min),this.max.max(s.max),this}applyMatrix4(s){return this.isEmpty()?this:(H6[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(s),H6[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(s),H6[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(s),H6[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(s),H6[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(s),H6[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(s),H6[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(s),H6[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(s),this.setFromPoints(H6),this)}translate(s){return this.min.add(s),this.max.add(s),this}equals(s){return s.min.equals(this.min)&&s.max.equals(this.max)}}const H6=[new ze,new ze,new ze,new ze,new ze,new ze,new ze,new ze],kE=new ze,jG=new tl,IP=new ze,yP=new ze,wP=new ze,rS=new ze,iS=new ze,B8=new ze,RH=new ze,kG=new ze,qG=new ze,H8=new ze;function zY(e,s,n,t,u){for(let o=0,f=e.length-3;o<=f;o+=3){H8.fromArray(e,o);const d=u.x*Math.abs(H8.x)+u.y*Math.abs(H8.y)+u.z*Math.abs(H8.z),m=s.dot(H8),D=n.dot(H8),P=t.dot(H8);if(Math.max(-Math.max(m,D,P),Math.min(m,D,P))>d)return!1}return!0}const Fle=new tl,AH=new ze,jY=new ze;class Sw{constructor(s=new ze,n=-1){this.isSphere=!0,this.center=s,this.radius=n}set(s,n){return this.center.copy(s),this.radius=n,this}setFromPoints(s,n){const t=this.center;n!==void 0?t.copy(n):Fle.setFromPoints(s).getCenter(t);let u=0;for(let o=0,f=s.length;o<f;o++)u=Math.max(u,t.distanceToSquared(s[o]));return this.radius=Math.sqrt(u),this}copy(s){return this.center.copy(s.center),this.radius=s.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(s){return s.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(s){return s.distanceTo(this.center)-this.radius}intersectsSphere(s){const n=this.radius+s.radius;return s.center.distanceToSquared(this.center)<=n*n}intersectsBox(s){return s.intersectsSphere(this)}intersectsPlane(s){return Math.abs(s.distanceToPoint(this.center))<=this.radius}clampPoint(s,n){const t=this.center.distanceToSquared(s);return n.copy(s),t>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(s){return this.isEmpty()?(s.makeEmpty(),s):(s.set(this.center,this.center),s.expandByScalar(this.radius),s)}applyMatrix4(s){return this.center.applyMatrix4(s),this.radius=this.radius*s.getMaxScaleOnAxis(),this}translate(s){return this.center.add(s),this}expandByPoint(s){if(this.isEmpty())return this.center.copy(s),this.radius=0,this;AH.subVectors(s,this.center);const n=AH.lengthSq();if(n>this.radius*this.radius){const t=Math.sqrt(n),u=(t-this.radius)*.5;this.center.addScaledVector(AH,u/t),this.radius+=u}return this}union(s){return s.isEmpty()?this:this.isEmpty()?(this.copy(s),this):(this.center.equals(s.center)===!0?this.radius=Math.max(this.radius,s.radius):(jY.subVectors(s.center,this.center).setLength(s.radius),this.expandByPoint(AH.copy(s.center).add(jY)),this.expandByPoint(AH.copy(s.center).sub(jY))),this)}equals(s){return s.center.equals(this.center)&&s.radius===this.radius}clone(){return new this.constructor().copy(this)}}const F6=new ze,kY=new ze,$G=new ze,uS=new ze,qY=new ze,KG=new ze,$Y=new ze;class yM{constructor(s=new ze,n=new ze(0,0,-1)){this.origin=s,this.direction=n}set(s,n){return this.origin.copy(s),this.direction.copy(n),this}copy(s){return this.origin.copy(s.origin),this.direction.copy(s.direction),this}at(s,n){return n.copy(this.origin).addScaledVector(this.direction,s)}lookAt(s){return this.direction.copy(s).sub(this.origin).normalize(),this}recast(s){return this.origin.copy(this.at(s,F6)),this}closestPointToPoint(s,n){n.subVectors(s,this.origin);const t=n.dot(this.direction);return t<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(s){return Math.sqrt(this.distanceSqToPoint(s))}distanceSqToPoint(s){const n=F6.subVectors(s,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(s):(F6.copy(this.origin).addScaledVector(this.direction,n),F6.distanceToSquared(s))}distanceSqToSegment(s,n,t,u){kY.copy(s).add(n).multiplyScalar(.5),$G.copy(n).sub(s).normalize(),uS.copy(this.origin).sub(kY);const o=s.distanceTo(n)*.5,f=-this.direction.dot($G),d=uS.dot(this.direction),m=-uS.dot($G),D=uS.lengthSq(),P=Math.abs(1-f*f);let x,H,_,ne;if(P>0)if(x=f*m-d,H=f*d-m,ne=o*P,x>=0)if(H>=-ne)if(H<=ne){const re=1/P;x*=re,H*=re,_=x*(x+f*H+2*d)+H*(f*x+H+2*m)+D}else H=o,x=Math.max(0,-(f*H+d)),_=-x*x+H*(H+2*m)+D;else H=-o,x=Math.max(0,-(f*H+d)),_=-x*x+H*(H+2*m)+D;else H<=-ne?(x=Math.max(0,-(-f*o+d)),H=x>0?-o:Math.min(Math.max(-o,-m),o),_=-x*x+H*(H+2*m)+D):H<=ne?(x=0,H=Math.min(Math.max(-o,-m),o),_=H*(H+2*m)+D):(x=Math.max(0,-(f*o+d)),H=x>0?o:Math.min(Math.max(-o,-m),o),_=-x*x+H*(H+2*m)+D);else H=f>0?-o:o,x=Math.max(0,-(f*H+d)),_=-x*x+H*(H+2*m)+D;return t&&t.copy(this.origin).addScaledVector(this.direction,x),u&&u.copy(kY).addScaledVector($G,H),_}intersectSphere(s,n){F6.subVectors(s.center,this.origin);const t=F6.dot(this.direction),u=F6.dot(F6)-t*t,o=s.radius*s.radius;if(u>o)return null;const f=Math.sqrt(o-u),d=t-f,m=t+f;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(s){return this.distanceSqToPoint(s.center)<=s.radius*s.radius}distanceToPlane(s){const n=s.normal.dot(this.direction);if(n===0)return s.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(s.normal)+s.constant)/n;return t>=0?t:null}intersectPlane(s,n){const t=this.distanceToPlane(s);return t===null?null:this.at(t,n)}intersectsPlane(s){const n=s.distanceToPoint(this.origin);return n===0||s.normal.dot(this.direction)*n<0}intersectBox(s,n){let t,u,o,f,d,m;const D=1/this.direction.x,P=1/this.direction.y,x=1/this.direction.z,H=this.origin;return D>=0?(t=(s.min.x-H.x)*D,u=(s.max.x-H.x)*D):(t=(s.max.x-H.x)*D,u=(s.min.x-H.x)*D),P>=0?(o=(s.min.y-H.y)*P,f=(s.max.y-H.y)*P):(o=(s.max.y-H.y)*P,f=(s.min.y-H.y)*P),t>f||o>u||((o>t||isNaN(t))&&(t=o),(f<u||isNaN(u))&&(u=f),x>=0?(d=(s.min.z-H.z)*x,m=(s.max.z-H.z)*x):(d=(s.max.z-H.z)*x,m=(s.min.z-H.z)*x),t>m||d>u)||((d>t||t!==t)&&(t=d),(m<u||u!==u)&&(u=m),u<0)?null:this.at(t>=0?t:u,n)}intersectsBox(s){return this.intersectBox(s,F6)!==null}intersectTriangle(s,n,t,u,o){qY.subVectors(n,s),KG.subVectors(t,s),$Y.crossVectors(qY,KG);let f=this.direction.dot($Y),d;if(f>0){if(u)return null;d=1}else if(f<0)d=-1,f=-f;else return null;uS.subVectors(this.origin,s);const m=d*this.direction.dot(KG.crossVectors(uS,KG));if(m<0)return null;const D=d*this.direction.dot(qY.cross(uS));if(D<0||m+D>f)return null;const P=-d*uS.dot($Y);return P<0?null:this.at(P/f,o)}applyMatrix4(s){return this.origin.applyMatrix4(s),this.direction.transformDirection(s),this}equals(s){return s.origin.equals(this.origin)&&s.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fn{constructor(s,n,t,u,o,f,d,m,D,P,x,H,_,ne,re,J){Fn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],s!==void 0&&this.set(s,n,t,u,o,f,d,m,D,P,x,H,_,ne,re,J)}set(s,n,t,u,o,f,d,m,D,P,x,H,_,ne,re,J){const K=this.elements;return K[0]=s,K[4]=n,K[8]=t,K[12]=u,K[1]=o,K[5]=f,K[9]=d,K[13]=m,K[2]=D,K[6]=P,K[10]=x,K[14]=H,K[3]=_,K[7]=ne,K[11]=re,K[15]=J,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fn().fromArray(this.elements)}copy(s){const n=this.elements,t=s.elements;return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],this}copyPosition(s){const n=this.elements,t=s.elements;return n[12]=t[12],n[13]=t[13],n[14]=t[14],this}setFromMatrix3(s){const n=s.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(s,n,t){return s.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(s,n,t){return this.set(s.x,n.x,t.x,0,s.y,n.y,t.y,0,s.z,n.z,t.z,0,0,0,0,1),this}extractRotation(s){const n=this.elements,t=s.elements,u=1/EP.setFromMatrixColumn(s,0).length(),o=1/EP.setFromMatrixColumn(s,1).length(),f=1/EP.setFromMatrixColumn(s,2).length();return n[0]=t[0]*u,n[1]=t[1]*u,n[2]=t[2]*u,n[3]=0,n[4]=t[4]*o,n[5]=t[5]*o,n[6]=t[6]*o,n[7]=0,n[8]=t[8]*f,n[9]=t[9]*f,n[10]=t[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(s){const n=this.elements,t=s.x,u=s.y,o=s.z,f=Math.cos(t),d=Math.sin(t),m=Math.cos(u),D=Math.sin(u),P=Math.cos(o),x=Math.sin(o);if(s.order==="XYZ"){const H=f*P,_=f*x,ne=d*P,re=d*x;n[0]=m*P,n[4]=-m*x,n[8]=D,n[1]=_+ne*D,n[5]=H-re*D,n[9]=-d*m,n[2]=re-H*D,n[6]=ne+_*D,n[10]=f*m}else if(s.order==="YXZ"){const H=m*P,_=m*x,ne=D*P,re=D*x;n[0]=H+re*d,n[4]=ne*d-_,n[8]=f*D,n[1]=f*x,n[5]=f*P,n[9]=-d,n[2]=_*d-ne,n[6]=re+H*d,n[10]=f*m}else if(s.order==="ZXY"){const H=m*P,_=m*x,ne=D*P,re=D*x;n[0]=H-re*d,n[4]=-f*x,n[8]=ne+_*d,n[1]=_+ne*d,n[5]=f*P,n[9]=re-H*d,n[2]=-f*D,n[6]=d,n[10]=f*m}else if(s.order==="ZYX"){const H=f*P,_=f*x,ne=d*P,re=d*x;n[0]=m*P,n[4]=ne*D-_,n[8]=H*D+re,n[1]=m*x,n[5]=re*D+H,n[9]=_*D-ne,n[2]=-D,n[6]=d*m,n[10]=f*m}else if(s.order==="YZX"){const H=f*m,_=f*D,ne=d*m,re=d*D;n[0]=m*P,n[4]=re-H*x,n[8]=ne*x+_,n[1]=x,n[5]=f*P,n[9]=-d*P,n[2]=-D*P,n[6]=_*x+ne,n[10]=H-re*x}else if(s.order==="XZY"){const H=f*m,_=f*D,ne=d*m,re=d*D;n[0]=m*P,n[4]=-x,n[8]=D*P,n[1]=H*x+re,n[5]=f*P,n[9]=_*x-ne,n[2]=ne*x-_,n[6]=d*P,n[10]=re*x+H}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(s){return this.compose(Gle,s,_le)}lookAt(s,n,t){const u=this.elements;return oy.subVectors(s,n),oy.lengthSq()===0&&(oy.z=1),oy.normalize(),aS.crossVectors(t,oy),aS.lengthSq()===0&&(Math.abs(t.z)===1?oy.x+=1e-4:oy.z+=1e-4,oy.normalize(),aS.crossVectors(t,oy)),aS.normalize(),QG.crossVectors(oy,aS),u[0]=aS.x,u[4]=QG.x,u[8]=oy.x,u[1]=aS.y,u[5]=QG.y,u[9]=oy.y,u[2]=aS.z,u[6]=QG.z,u[10]=oy.z,this}multiply(s){return this.multiplyMatrices(this,s)}premultiply(s){return this.multiplyMatrices(s,this)}multiplyMatrices(s,n){const t=s.elements,u=n.elements,o=this.elements,f=t[0],d=t[4],m=t[8],D=t[12],P=t[1],x=t[5],H=t[9],_=t[13],ne=t[2],re=t[6],J=t[10],K=t[14],Ie=t[3],ce=t[7],ae=t[11],me=t[15],Ee=u[0],Ae=u[4],Me=u[8],we=u[12],Te=u[1],je=u[5],Ke=u[9],lt=u[13],Ze=u[2],it=u[6],ot=u[10],yt=u[14],Rt=u[3],Ct=u[7],Bt=u[11],Ut=u[15];return o[0]=f*Ee+d*Te+m*Ze+D*Rt,o[4]=f*Ae+d*je+m*it+D*Ct,o[8]=f*Me+d*Ke+m*ot+D*Bt,o[12]=f*we+d*lt+m*yt+D*Ut,o[1]=P*Ee+x*Te+H*Ze+_*Rt,o[5]=P*Ae+x*je+H*it+_*Ct,o[9]=P*Me+x*Ke+H*ot+_*Bt,o[13]=P*we+x*lt+H*yt+_*Ut,o[2]=ne*Ee+re*Te+J*Ze+K*Rt,o[6]=ne*Ae+re*je+J*it+K*Ct,o[10]=ne*Me+re*Ke+J*ot+K*Bt,o[14]=ne*we+re*lt+J*yt+K*Ut,o[3]=Ie*Ee+ce*Te+ae*Ze+me*Rt,o[7]=Ie*Ae+ce*je+ae*it+me*Ct,o[11]=Ie*Me+ce*Ke+ae*ot+me*Bt,o[15]=Ie*we+ce*lt+ae*yt+me*Ut,this}multiplyScalar(s){const n=this.elements;return n[0]*=s,n[4]*=s,n[8]*=s,n[12]*=s,n[1]*=s,n[5]*=s,n[9]*=s,n[13]*=s,n[2]*=s,n[6]*=s,n[10]*=s,n[14]*=s,n[3]*=s,n[7]*=s,n[11]*=s,n[15]*=s,this}determinant(){const s=this.elements,n=s[0],t=s[4],u=s[8],o=s[12],f=s[1],d=s[5],m=s[9],D=s[13],P=s[2],x=s[6],H=s[10],_=s[14],ne=s[3],re=s[7],J=s[11],K=s[15];return ne*(+o*m*x-u*D*x-o*d*H+t*D*H+u*d*_-t*m*_)+re*(+n*m*_-n*D*H+o*f*H-u*f*_+u*D*P-o*m*P)+J*(+n*D*x-n*d*_-o*f*x+t*f*_+o*d*P-t*D*P)+K*(-u*d*P-n*m*x+n*d*H+u*f*x-t*f*H+t*m*P)}transpose(){const s=this.elements;let n;return n=s[1],s[1]=s[4],s[4]=n,n=s[2],s[2]=s[8],s[8]=n,n=s[6],s[6]=s[9],s[9]=n,n=s[3],s[3]=s[12],s[12]=n,n=s[7],s[7]=s[13],s[13]=n,n=s[11],s[11]=s[14],s[14]=n,this}setPosition(s,n,t){const u=this.elements;return s.isVector3?(u[12]=s.x,u[13]=s.y,u[14]=s.z):(u[12]=s,u[13]=n,u[14]=t),this}invert(){const s=this.elements,n=s[0],t=s[1],u=s[2],o=s[3],f=s[4],d=s[5],m=s[6],D=s[7],P=s[8],x=s[9],H=s[10],_=s[11],ne=s[12],re=s[13],J=s[14],K=s[15],Ie=x*J*D-re*H*D+re*m*_-d*J*_-x*m*K+d*H*K,ce=ne*H*D-P*J*D-ne*m*_+f*J*_+P*m*K-f*H*K,ae=P*re*D-ne*x*D+ne*d*_-f*re*_-P*d*K+f*x*K,me=ne*x*m-P*re*m-ne*d*H+f*re*H+P*d*J-f*x*J,Ee=n*Ie+t*ce+u*ae+o*me;if(Ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Ae=1/Ee;return s[0]=Ie*Ae,s[1]=(re*H*o-x*J*o-re*u*_+t*J*_+x*u*K-t*H*K)*Ae,s[2]=(d*J*o-re*m*o+re*u*D-t*J*D-d*u*K+t*m*K)*Ae,s[3]=(x*m*o-d*H*o-x*u*D+t*H*D+d*u*_-t*m*_)*Ae,s[4]=ce*Ae,s[5]=(P*J*o-ne*H*o+ne*u*_-n*J*_-P*u*K+n*H*K)*Ae,s[6]=(ne*m*o-f*J*o-ne*u*D+n*J*D+f*u*K-n*m*K)*Ae,s[7]=(f*H*o-P*m*o+P*u*D-n*H*D-f*u*_+n*m*_)*Ae,s[8]=ae*Ae,s[9]=(ne*x*o-P*re*o-ne*t*_+n*re*_+P*t*K-n*x*K)*Ae,s[10]=(f*re*o-ne*d*o+ne*t*D-n*re*D-f*t*K+n*d*K)*Ae,s[11]=(P*d*o-f*x*o-P*t*D+n*x*D+f*t*_-n*d*_)*Ae,s[12]=me*Ae,s[13]=(P*re*u-ne*x*u+ne*t*H-n*re*H-P*t*J+n*x*J)*Ae,s[14]=(ne*d*u-f*re*u-ne*t*m+n*re*m+f*t*J-n*d*J)*Ae,s[15]=(f*x*u-P*d*u+P*t*m-n*x*m-f*t*H+n*d*H)*Ae,this}scale(s){const n=this.elements,t=s.x,u=s.y,o=s.z;return n[0]*=t,n[4]*=u,n[8]*=o,n[1]*=t,n[5]*=u,n[9]*=o,n[2]*=t,n[6]*=u,n[10]*=o,n[3]*=t,n[7]*=u,n[11]*=o,this}getMaxScaleOnAxis(){const s=this.elements,n=s[0]*s[0]+s[1]*s[1]+s[2]*s[2],t=s[4]*s[4]+s[5]*s[5]+s[6]*s[6],u=s[8]*s[8]+s[9]*s[9]+s[10]*s[10];return Math.sqrt(Math.max(n,t,u))}makeTranslation(s,n,t){return s.isVector3?this.set(1,0,0,s.x,0,1,0,s.y,0,0,1,s.z,0,0,0,1):this.set(1,0,0,s,0,1,0,n,0,0,1,t,0,0,0,1),this}makeRotationX(s){const n=Math.cos(s),t=Math.sin(s);return this.set(1,0,0,0,0,n,-t,0,0,t,n,0,0,0,0,1),this}makeRotationY(s){const n=Math.cos(s),t=Math.sin(s);return this.set(n,0,t,0,0,1,0,0,-t,0,n,0,0,0,0,1),this}makeRotationZ(s){const n=Math.cos(s),t=Math.sin(s);return this.set(n,-t,0,0,t,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(s,n){const t=Math.cos(n),u=Math.sin(n),o=1-t,f=s.x,d=s.y,m=s.z,D=o*f,P=o*d;return this.set(D*f+t,D*d-u*m,D*m+u*d,0,D*d+u*m,P*d+t,P*m-u*f,0,D*m-u*d,P*m+u*f,o*m*m+t,0,0,0,0,1),this}makeScale(s,n,t){return this.set(s,0,0,0,0,n,0,0,0,0,t,0,0,0,0,1),this}makeShear(s,n,t,u,o,f){return this.set(1,t,o,0,s,1,f,0,n,u,1,0,0,0,0,1),this}compose(s,n,t){const u=this.elements,o=n._x,f=n._y,d=n._z,m=n._w,D=o+o,P=f+f,x=d+d,H=o*D,_=o*P,ne=o*x,re=f*P,J=f*x,K=d*x,Ie=m*D,ce=m*P,ae=m*x,me=t.x,Ee=t.y,Ae=t.z;return u[0]=(1-(re+K))*me,u[1]=(_+ae)*me,u[2]=(ne-ce)*me,u[3]=0,u[4]=(_-ae)*Ee,u[5]=(1-(H+K))*Ee,u[6]=(J+Ie)*Ee,u[7]=0,u[8]=(ne+ce)*Ae,u[9]=(J-Ie)*Ae,u[10]=(1-(H+re))*Ae,u[11]=0,u[12]=s.x,u[13]=s.y,u[14]=s.z,u[15]=1,this}decompose(s,n,t){const u=this.elements;let o=EP.set(u[0],u[1],u[2]).length();const f=EP.set(u[4],u[5],u[6]).length(),d=EP.set(u[8],u[9],u[10]).length();this.determinant()<0&&(o=-o),s.x=u[12],s.y=u[13],s.z=u[14],qE.copy(this);const D=1/o,P=1/f,x=1/d;return qE.elements[0]*=D,qE.elements[1]*=D,qE.elements[2]*=D,qE.elements[4]*=P,qE.elements[5]*=P,qE.elements[6]*=P,qE.elements[8]*=x,qE.elements[9]*=x,qE.elements[10]*=x,n.setFromRotationMatrix(qE),t.x=o,t.y=f,t.z=d,this}makePerspective(s,n,t,u,o,f,d=I7){const m=this.elements,D=2*o/(n-s),P=2*o/(t-u),x=(n+s)/(n-s),H=(t+u)/(t-u);let _,ne;if(d===I7)_=-(f+o)/(f-o),ne=-2*f*o/(f-o);else if(d===iW)_=-f/(f-o),ne=-f*o/(f-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=D,m[4]=0,m[8]=x,m[12]=0,m[1]=0,m[5]=P,m[9]=H,m[13]=0,m[2]=0,m[6]=0,m[10]=_,m[14]=ne,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(s,n,t,u,o,f,d=I7){const m=this.elements,D=1/(n-s),P=1/(t-u),x=1/(f-o),H=(n+s)*D,_=(t+u)*P;let ne,re;if(d===I7)ne=(f+o)*x,re=-2*x;else if(d===iW)ne=o*x,re=-1*x;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*D,m[4]=0,m[8]=0,m[12]=-H,m[1]=0,m[5]=2*P,m[9]=0,m[13]=-_,m[2]=0,m[6]=0,m[10]=re,m[14]=-ne,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(s){const n=this.elements,t=s.elements;for(let u=0;u<16;u++)if(n[u]!==t[u])return!1;return!0}fromArray(s,n=0){for(let t=0;t<16;t++)this.elements[t]=s[t+n];return this}toArray(s=[],n=0){const t=this.elements;return s[n]=t[0],s[n+1]=t[1],s[n+2]=t[2],s[n+3]=t[3],s[n+4]=t[4],s[n+5]=t[5],s[n+6]=t[6],s[n+7]=t[7],s[n+8]=t[8],s[n+9]=t[9],s[n+10]=t[10],s[n+11]=t[11],s[n+12]=t[12],s[n+13]=t[13],s[n+14]=t[14],s[n+15]=t[15],s}}const EP=new ze,qE=new Fn,Gle=new ze(0,0,0),_le=new ze(1,1,1),aS=new ze,QG=new ze,oy=new ze,fK=new Fn,dK=new pI;class NG{constructor(s=0,n=0,t=0,u=NG.DEFAULT_ORDER){this.isEuler=!0,this._x=s,this._y=n,this._z=t,this._order=u}get x(){return this._x}set x(s){this._x=s,this._onChangeCallback()}get y(){return this._y}set y(s){this._y=s,this._onChangeCallback()}get z(){return this._z}set z(s){this._z=s,this._onChangeCallback()}get order(){return this._order}set order(s){this._order=s,this._onChangeCallback()}set(s,n,t,u=this._order){return this._x=s,this._y=n,this._z=t,this._order=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(s){return this._x=s._x,this._y=s._y,this._z=s._z,this._order=s._order,this._onChangeCallback(),this}setFromRotationMatrix(s,n=this._order,t=!0){const u=s.elements,o=u[0],f=u[4],d=u[8],m=u[1],D=u[5],P=u[9],x=u[2],H=u[6],_=u[10];switch(n){case"XYZ":this._y=Math.asin(Dd(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-P,_),this._z=Math.atan2(-f,o)):(this._x=Math.atan2(H,D),this._z=0);break;case"YXZ":this._x=Math.asin(-Dd(P,-1,1)),Math.abs(P)<.9999999?(this._y=Math.atan2(d,_),this._z=Math.atan2(m,D)):(this._y=Math.atan2(-x,o),this._z=0);break;case"ZXY":this._x=Math.asin(Dd(H,-1,1)),Math.abs(H)<.9999999?(this._y=Math.atan2(-x,_),this._z=Math.atan2(-f,D)):(this._y=0,this._z=Math.atan2(m,o));break;case"ZYX":this._y=Math.asin(-Dd(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(H,_),this._z=Math.atan2(m,o)):(this._x=0,this._z=Math.atan2(-f,D));break;case"YZX":this._z=Math.asin(Dd(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-P,D),this._y=Math.atan2(-x,o)):(this._x=0,this._y=Math.atan2(d,_));break;case"XZY":this._z=Math.asin(-Dd(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(H,D),this._y=Math.atan2(d,o)):(this._x=Math.atan2(-P,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,t===!0&&this._onChangeCallback(),this}setFromQuaternion(s,n,t){return fK.makeRotationFromQuaternion(s),this.setFromRotationMatrix(fK,n,t)}setFromVector3(s,n=this._order){return this.set(s.x,s.y,s.z,n)}reorder(s){return dK.setFromEuler(this),this.setFromQuaternion(dK,s)}equals(s){return s._x===this._x&&s._y===this._y&&s._z===this._z&&s._order===this._order}fromArray(s){return this._x=s[0],this._y=s[1],this._z=s[2],s[3]!==void 0&&(this._order=s[3]),this._onChangeCallback(),this}toArray(s=[],n=0){return s[n]=this._x,s[n+1]=this._y,s[n+2]=this._z,s[n+3]=this._order,s}_onChange(s){return this._onChangeCallback=s,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}NG.DEFAULT_ORDER="XYZ";class Uk{constructor(){this.mask=1}set(s){this.mask=(1<<s|0)>>>0}enable(s){this.mask|=1<<s|0}enableAll(){this.mask=-1}toggle(s){this.mask^=1<<s|0}disable(s){this.mask&=~(1<<s|0)}disableAll(){this.mask=0}test(s){return(this.mask&s.mask)!==0}isEnabled(s){return(this.mask&(1<<s|0))!==0}}let Vle=0;const IK=new ze,pP=new pI,G6=new Fn,ZG=new ze,DH=new ze,Wle=new ze,Yle=new pI,yK=new ze(1,0,0),wK=new ze(0,1,0),EK=new ze(0,0,1),zle={type:"added"},jle={type:"removed"};class wa extends IM{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vle++}),this.uuid=j7(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wa.DEFAULT_UP.clone();const s=new ze,n=new NG,t=new pI,u=new ze(1,1,1);function o(){t.setFromEuler(n,!1)}function f(){n.setFromQuaternion(t,void 0,!1)}n._onChange(o),t._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:s},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:u},modelViewMatrix:{value:new Fn},normalMatrix:{value:new gs}}),this.matrix=new Fn,this.matrixWorld=new Fn,this.matrixAutoUpdate=wa.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uk,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(s){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(s),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(s){return this.quaternion.premultiply(s),this}setRotationFromAxisAngle(s,n){this.quaternion.setFromAxisAngle(s,n)}setRotationFromEuler(s){this.quaternion.setFromEuler(s,!0)}setRotationFromMatrix(s){this.quaternion.setFromRotationMatrix(s)}setRotationFromQuaternion(s){this.quaternion.copy(s)}rotateOnAxis(s,n){return pP.setFromAxisAngle(s,n),this.quaternion.multiply(pP),this}rotateOnWorldAxis(s,n){return pP.setFromAxisAngle(s,n),this.quaternion.premultiply(pP),this}rotateX(s){return this.rotateOnAxis(yK,s)}rotateY(s){return this.rotateOnAxis(wK,s)}rotateZ(s){return this.rotateOnAxis(EK,s)}translateOnAxis(s,n){return IK.copy(s).applyQuaternion(this.quaternion),this.position.add(IK.multiplyScalar(n)),this}translateX(s){return this.translateOnAxis(yK,s)}translateY(s){return this.translateOnAxis(wK,s)}translateZ(s){return this.translateOnAxis(EK,s)}localToWorld(s){return this.updateWorldMatrix(!0,!1),s.applyMatrix4(this.matrixWorld)}worldToLocal(s){return this.updateWorldMatrix(!0,!1),s.applyMatrix4(G6.copy(this.matrixWorld).invert())}lookAt(s,n,t){s.isVector3?ZG.copy(s):ZG.set(s,n,t);const u=this.parent;this.updateWorldMatrix(!0,!1),DH.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?G6.lookAt(DH,ZG,this.up):G6.lookAt(ZG,DH,this.up),this.quaternion.setFromRotationMatrix(G6),u&&(G6.extractRotation(u.matrixWorld),pP.setFromRotationMatrix(G6),this.quaternion.premultiply(pP.invert()))}add(s){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return s===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",s),this):(s&&s.isObject3D?(s.parent!==null&&s.parent.remove(s),s.parent=this,this.children.push(s),s.dispatchEvent(zle)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",s),this)}remove(s){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const n=this.children.indexOf(s);return n!==-1&&(s.parent=null,this.children.splice(n,1),s.dispatchEvent(jle)),this}removeFromParent(){const s=this.parent;return s!==null&&s.remove(this),this}clear(){return this.remove(...this.children)}attach(s){return this.updateWorldMatrix(!0,!1),G6.copy(this.matrixWorld).invert(),s.parent!==null&&(s.parent.updateWorldMatrix(!0,!1),G6.multiply(s.parent.matrixWorld)),s.applyMatrix4(G6),this.add(s),s.updateWorldMatrix(!1,!0),this}getObjectById(s){return this.getObjectByProperty("id",s)}getObjectByName(s){return this.getObjectByProperty("name",s)}getObjectByProperty(s,n){if(this[s]===n)return this;for(let t=0,u=this.children.length;t<u;t++){const f=this.children[t].getObjectByProperty(s,n);if(f!==void 0)return f}}getObjectsByProperty(s,n,t=[]){this[s]===n&&t.push(this);const u=this.children;for(let o=0,f=u.length;o<f;o++)u[o].getObjectsByProperty(s,n,t);return t}getWorldPosition(s){return this.updateWorldMatrix(!0,!1),s.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(s){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(DH,s,Wle),s}getWorldScale(s){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(DH,Yle,s),s}getWorldDirection(s){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return s.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(s){s(this);const n=this.children;for(let t=0,u=n.length;t<u;t++)n[t].traverse(s)}traverseVisible(s){if(this.visible===!1)return;s(this);const n=this.children;for(let t=0,u=n.length;t<u;t++)n[t].traverseVisible(s)}traverseAncestors(s){const n=this.parent;n!==null&&(s(n),n.traverseAncestors(s))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(s){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,s=!0);const n=this.children;for(let t=0,u=n.length;t<u;t++){const o=n[t];(o.matrixWorldAutoUpdate===!0||s===!0)&&o.updateMatrixWorld(s)}}updateWorldMatrix(s,n){const t=this.parent;if(s===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const u=this.children;for(let o=0,f=u.length;o<f;o++){const d=u[o];d.matrixWorldAutoUpdate===!0&&d.updateWorldMatrix(!1,!0)}}}toJSON(s){const n=s===void 0||typeof s=="string",t={};n&&(s={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const u={};u.uuid=this.uuid,u.type=this.type,this.name!==""&&(u.name=this.name),this.castShadow===!0&&(u.castShadow=!0),this.receiveShadow===!0&&(u.receiveShadow=!0),this.visible===!1&&(u.visible=!1),this.frustumCulled===!1&&(u.frustumCulled=!1),this.renderOrder!==0&&(u.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(u.userData=this.userData),u.layers=this.layers.mask,u.matrix=this.matrix.toArray(),u.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(u.matrixAutoUpdate=!1),this.isInstancedMesh&&(u.type="InstancedMesh",u.count=this.count,u.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(u.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(u.type="BatchedMesh",u.perObjectFrustumCulled=this.perObjectFrustumCulled,u.sortObjects=this.sortObjects,u.drawRanges=this._drawRanges,u.reservedRanges=this._reservedRanges,u.visibility=this._visibility,u.active=this._active,u.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),u.maxGeometryCount=this._maxGeometryCount,u.maxVertexCount=this._maxVertexCount,u.maxIndexCount=this._maxIndexCount,u.geometryInitialized=this._geometryInitialized,u.geometryCount=this._geometryCount,u.matricesTexture=this._matricesTexture.toJSON(s),this.boundingSphere!==null&&(u.boundingSphere={center:u.boundingSphere.center.toArray(),radius:u.boundingSphere.radius}),this.boundingBox!==null&&(u.boundingBox={min:u.boundingBox.min.toArray(),max:u.boundingBox.max.toArray()}));function o(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(s)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?u.background=this.background.toJSON():this.background.isTexture&&(u.background=this.background.toJSON(s).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(u.environment=this.environment.toJSON(s).uuid);else if(this.isMesh||this.isLine||this.isPoints){u.geometry=o(s.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let D=0,P=m.length;D<P;D++){const x=m[D];o(s.shapes,x)}else o(s.shapes,m)}}if(this.isSkinnedMesh&&(u.bindMode=this.bindMode,u.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(s.skeletons,this.skeleton),u.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,D=this.material.length;m<D;m++)d.push(o(s.materials,this.material[m]));u.material=d}else u.material=o(s.materials,this.material);if(this.children.length>0){u.children=[];for(let d=0;d<this.children.length;d++)u.children.push(this.children[d].toJSON(s).object)}if(this.animations.length>0){u.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];u.animations.push(o(s.animations,m))}}if(n){const d=f(s.geometries),m=f(s.materials),D=f(s.textures),P=f(s.images),x=f(s.shapes),H=f(s.skeletons),_=f(s.animations),ne=f(s.nodes);d.length>0&&(t.geometries=d),m.length>0&&(t.materials=m),D.length>0&&(t.textures=D),P.length>0&&(t.images=P),x.length>0&&(t.shapes=x),H.length>0&&(t.skeletons=H),_.length>0&&(t.animations=_),ne.length>0&&(t.nodes=ne)}return t.object=u,t;function f(d){const m=[];for(const D in d){const P=d[D];delete P.metadata,m.push(P)}return m}}clone(s){return new this.constructor().copy(this,s)}copy(s,n=!0){if(this.name=s.name,this.up.copy(s.up),this.position.copy(s.position),this.rotation.order=s.rotation.order,this.quaternion.copy(s.quaternion),this.scale.copy(s.scale),this.matrix.copy(s.matrix),this.matrixWorld.copy(s.matrixWorld),this.matrixAutoUpdate=s.matrixAutoUpdate,this.matrixWorldAutoUpdate=s.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=s.matrixWorldNeedsUpdate,this.layers.mask=s.layers.mask,this.visible=s.visible,this.castShadow=s.castShadow,this.receiveShadow=s.receiveShadow,this.frustumCulled=s.frustumCulled,this.renderOrder=s.renderOrder,this.animations=s.animations.slice(),this.userData=JSON.parse(JSON.stringify(s.userData)),n===!0)for(let t=0;t<s.children.length;t++){const u=s.children[t];this.add(u.clone())}return this}}wa.DEFAULT_UP=new ze(0,1,0);wa.DEFAULT_MATRIX_AUTO_UPDATE=!0;wa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $E=new ze,_6=new ze,KY=new ze,V6=new ze,TP=new ze,mP=new ze,pK=new ze,QY=new ze,ZY=new ze,JY=new ze;let JG=!1;class yu{constructor(s=new ze,n=new ze,t=new ze){this.a=s,this.b=n,this.c=t}static getNormal(s,n,t,u){u.subVectors(t,n),$E.subVectors(s,n),u.cross($E);const o=u.lengthSq();return o>0?u.multiplyScalar(1/Math.sqrt(o)):u.set(0,0,0)}static getBarycoord(s,n,t,u,o){$E.subVectors(u,n),_6.subVectors(t,n),KY.subVectors(s,n);const f=$E.dot($E),d=$E.dot(_6),m=$E.dot(KY),D=_6.dot(_6),P=_6.dot(KY),x=f*D-d*d;if(x===0)return o.set(0,0,0),null;const H=1/x,_=(D*m-d*P)*H,ne=(f*P-d*m)*H;return o.set(1-_-ne,ne,_)}static containsPoint(s,n,t,u){return this.getBarycoord(s,n,t,u,V6)===null?!1:V6.x>=0&&V6.y>=0&&V6.x+V6.y<=1}static getUV(s,n,t,u,o,f,d,m){return JG===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),JG=!0),this.getInterpolation(s,n,t,u,o,f,d,m)}static getInterpolation(s,n,t,u,o,f,d,m){return this.getBarycoord(s,n,t,u,V6)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(o,V6.x),m.addScaledVector(f,V6.y),m.addScaledVector(d,V6.z),m)}static isFrontFacing(s,n,t,u){return $E.subVectors(t,n),_6.subVectors(s,n),$E.cross(_6).dot(u)<0}set(s,n,t){return this.a.copy(s),this.b.copy(n),this.c.copy(t),this}setFromPointsAndIndices(s,n,t,u){return this.a.copy(s[n]),this.b.copy(s[t]),this.c.copy(s[u]),this}setFromAttributeAndIndices(s,n,t,u){return this.a.fromBufferAttribute(s,n),this.b.fromBufferAttribute(s,t),this.c.fromBufferAttribute(s,u),this}clone(){return new this.constructor().copy(this)}copy(s){return this.a.copy(s.a),this.b.copy(s.b),this.c.copy(s.c),this}getArea(){return $E.subVectors(this.c,this.b),_6.subVectors(this.a,this.b),$E.cross(_6).length()*.5}getMidpoint(s){return s.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(s){return yu.getNormal(this.a,this.b,this.c,s)}getPlane(s){return s.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(s,n){return yu.getBarycoord(s,this.a,this.b,this.c,n)}getUV(s,n,t,u,o){return JG===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),JG=!0),yu.getInterpolation(s,this.a,this.b,this.c,n,t,u,o)}getInterpolation(s,n,t,u,o){return yu.getInterpolation(s,this.a,this.b,this.c,n,t,u,o)}containsPoint(s){return yu.containsPoint(s,this.a,this.b,this.c)}isFrontFacing(s){return yu.isFrontFacing(this.a,this.b,this.c,s)}intersectsBox(s){return s.intersectsTriangle(this)}closestPointToPoint(s,n){const t=this.a,u=this.b,o=this.c;let f,d;TP.subVectors(u,t),mP.subVectors(o,t),QY.subVectors(s,t);const m=TP.dot(QY),D=mP.dot(QY);if(m<=0&&D<=0)return n.copy(t);ZY.subVectors(s,u);const P=TP.dot(ZY),x=mP.dot(ZY);if(P>=0&&x<=P)return n.copy(u);const H=m*x-P*D;if(H<=0&&m>=0&&P<=0)return f=m/(m-P),n.copy(t).addScaledVector(TP,f);JY.subVectors(s,o);const _=TP.dot(JY),ne=mP.dot(JY);if(ne>=0&&_<=ne)return n.copy(o);const re=_*D-m*ne;if(re<=0&&D>=0&&ne<=0)return d=D/(D-ne),n.copy(t).addScaledVector(mP,d);const J=P*ne-_*x;if(J<=0&&x-P>=0&&_-ne>=0)return pK.subVectors(o,u),d=(x-P)/(x-P+(_-ne)),n.copy(u).addScaledVector(pK,d);const K=1/(J+re+H);return f=re*K,d=H*K,n.copy(t).addScaledVector(TP,f).addScaledVector(mP,d)}equals(s){return s.a.equals(this.a)&&s.b.equals(this.b)&&s.c.equals(this.c)}}const wX={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oS={h:0,s:0,l:0},XG={h:0,s:0,l:0};function XY(e,s,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(s-e)*6*n:n<1/2?s:n<2/3?e+(s-e)*6*(2/3-n):e}class ps{constructor(s,n,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(s,n,t)}set(s,n,t){if(n===void 0&&t===void 0){const u=s;u&&u.isColor?this.copy(u):typeof u=="number"?this.setHex(u):typeof u=="string"&&this.setStyle(u)}else this.setRGB(s,n,t);return this}setScalar(s){return this.r=s,this.g=s,this.b=s,this}setHex(s,n=Ad){return s=Math.floor(s),this.r=(s>>16&255)/255,this.g=(s>>8&255)/255,this.b=(s&255)/255,Wl.toWorkingColorSpace(this,n),this}setRGB(s,n,t,u=Wl.workingColorSpace){return this.r=s,this.g=n,this.b=t,Wl.toWorkingColorSpace(this,u),this}setHSL(s,n,t,u=Wl.workingColorSpace){if(s=xk(s,1),n=Dd(n,0,1),t=Dd(t,0,1),n===0)this.r=this.g=this.b=t;else{const o=t<=.5?t*(1+n):t+n-t*n,f=2*t-o;this.r=XY(f,o,s+1/3),this.g=XY(f,o,s),this.b=XY(f,o,s-1/3)}return Wl.toWorkingColorSpace(this,u),this}setStyle(s,n=Ad){function t(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+s+" will be ignored.")}let u;if(u=/^(\w+)\(([^\)]*)\)/.exec(s)){let o;const f=u[1],d=u[2];switch(f){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return t(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,n);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return t(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,n);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return t(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+s)}}else if(u=/^\#([A-Fa-f\d]+)$/.exec(s)){const o=u[1],f=o.length;if(f===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(o,16),n);console.warn("THREE.Color: Invalid hex color "+s)}else if(s&&s.length>0)return this.setColorName(s,n);return this}setColorName(s,n=Ad){const t=wX[s.toLowerCase()];return t!==void 0?this.setHex(t,n):console.warn("THREE.Color: Unknown color "+s),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(s){return this.r=s.r,this.g=s.g,this.b=s.b,this}copySRGBToLinear(s){return this.r=H9(s.r),this.g=H9(s.g),this.b=H9(s.b),this}copyLinearToSRGB(s){return this.r=VY(s.r),this.g=VY(s.g),this.b=VY(s.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(s=Ad){return Wl.fromWorkingColorSpace(wI.copy(this),s),Math.round(Dd(wI.r*255,0,255))*65536+Math.round(Dd(wI.g*255,0,255))*256+Math.round(Dd(wI.b*255,0,255))}getHexString(s=Ad){return("000000"+this.getHex(s).toString(16)).slice(-6)}getHSL(s,n=Wl.workingColorSpace){Wl.fromWorkingColorSpace(wI.copy(this),n);const t=wI.r,u=wI.g,o=wI.b,f=Math.max(t,u,o),d=Math.min(t,u,o);let m,D;const P=(d+f)/2;if(d===f)m=0,D=0;else{const x=f-d;switch(D=P<=.5?x/(f+d):x/(2-f-d),f){case t:m=(u-o)/x+(u<o?6:0);break;case u:m=(o-t)/x+2;break;case o:m=(t-u)/x+4;break}m/=6}return s.h=m,s.s=D,s.l=P,s}getRGB(s,n=Wl.workingColorSpace){return Wl.fromWorkingColorSpace(wI.copy(this),n),s.r=wI.r,s.g=wI.g,s.b=wI.b,s}getStyle(s=Ad){Wl.fromWorkingColorSpace(wI.copy(this),s);const n=wI.r,t=wI.g,u=wI.b;return s!==Ad?`color(${s} ${n.toFixed(3)} ${t.toFixed(3)} ${u.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(t*255)},${Math.round(u*255)})`}offsetHSL(s,n,t){return this.getHSL(oS),this.setHSL(oS.h+s,oS.s+n,oS.l+t)}add(s){return this.r+=s.r,this.g+=s.g,this.b+=s.b,this}addColors(s,n){return this.r=s.r+n.r,this.g=s.g+n.g,this.b=s.b+n.b,this}addScalar(s){return this.r+=s,this.g+=s,this.b+=s,this}sub(s){return this.r=Math.max(0,this.r-s.r),this.g=Math.max(0,this.g-s.g),this.b=Math.max(0,this.b-s.b),this}multiply(s){return this.r*=s.r,this.g*=s.g,this.b*=s.b,this}multiplyScalar(s){return this.r*=s,this.g*=s,this.b*=s,this}lerp(s,n){return this.r+=(s.r-this.r)*n,this.g+=(s.g-this.g)*n,this.b+=(s.b-this.b)*n,this}lerpColors(s,n,t){return this.r=s.r+(n.r-s.r)*t,this.g=s.g+(n.g-s.g)*t,this.b=s.b+(n.b-s.b)*t,this}lerpHSL(s,n){this.getHSL(oS),s.getHSL(XG);const t=PF(oS.h,XG.h,n),u=PF(oS.s,XG.s,n),o=PF(oS.l,XG.l,n);return this.setHSL(t,u,o),this}setFromVector3(s){return this.r=s.x,this.g=s.y,this.b=s.z,this}applyMatrix3(s){const n=this.r,t=this.g,u=this.b,o=s.elements;return this.r=o[0]*n+o[3]*t+o[6]*u,this.g=o[1]*n+o[4]*t+o[7]*u,this.b=o[2]*n+o[5]*t+o[8]*u,this}equals(s){return s.r===this.r&&s.g===this.g&&s.b===this.b}fromArray(s,n=0){return this.r=s[n],this.g=s[n+1],this.b=s[n+2],this}toArray(s=[],n=0){return s[n]=this.r,s[n+1]=this.g,s[n+2]=this.b,s}fromBufferAttribute(s,n){return this.r=s.getX(n),this.g=s.getY(n),this.b=s.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wI=new ps;ps.NAMES=wX;let kle=0;class hb extends IM{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kle++}),this.uuid=j7(),this.name="",this.type="Material",this.blending=U9,this.side=Aw,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ij,this.blendDst=uj,this.blendEquation=CO,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ps(0,0,0),this.blendAlpha=0,this.depthFunc=nW,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rK,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fP,this.stencilZFail=fP,this.stencilZPass=fP,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(s){this._alphaTest>0!=s>0&&this.version++,this._alphaTest=s}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(s){if(s!==void 0)for(const n in s){const t=s[n];if(t===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const u=this[n];if(u===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}u&&u.isColor?u.set(t):u&&u.isVector3&&t&&t.isVector3?u.copy(t):this[n]=t}}toJSON(s){const n=s===void 0||typeof s=="string";n&&(s={textures:{},images:{}});const t={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(s).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(s).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(s).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(s).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(s).uuid),this.anisotropy!==void 0&&(t.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(t.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(t.anisotropyMap=this.anisotropyMap.toJSON(s).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(s).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(s).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(s).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(s).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(s).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(s).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(s).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(s).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(s).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(s).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(s).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(s).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(s).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(s).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(s).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(s).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(s).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(s).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==U9&&(t.blending=this.blending),this.side!==Aw&&(t.side=this.side),this.vertexColors===!0&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=!0),this.blendSrc!==ij&&(t.blendSrc=this.blendSrc),this.blendDst!==uj&&(t.blendDst=this.blendDst),this.blendEquation!==CO&&(t.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(t.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(t.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(t.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(t.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(t.blendAlpha=this.blendAlpha),this.depthFunc!==nW&&(t.depthFunc=this.depthFunc),this.depthTest===!1&&(t.depthTest=this.depthTest),this.depthWrite===!1&&(t.depthWrite=this.depthWrite),this.colorWrite===!1&&(t.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(t.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rK&&(t.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(t.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(t.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fP&&(t.stencilFail=this.stencilFail),this.stencilZFail!==fP&&(t.stencilZFail=this.stencilZFail),this.stencilZPass!==fP&&(t.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(t.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaHash===!0&&(t.alphaHash=!0),this.alphaToCoverage===!0&&(t.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=!0),this.forceSinglePass===!0&&(t.forceSinglePass=!0),this.wireframe===!0&&(t.wireframe=!0),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=!0),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function u(o){const f=[];for(const d in o){const m=o[d];delete m.metadata,f.push(m)}return f}if(n){const o=u(s.textures),f=u(s.images);o.length>0&&(t.textures=o),f.length>0&&(t.images=f)}return t}clone(){return new this.constructor().copy(this)}copy(s){this.name=s.name,this.blending=s.blending,this.side=s.side,this.vertexColors=s.vertexColors,this.opacity=s.opacity,this.transparent=s.transparent,this.blendSrc=s.blendSrc,this.blendDst=s.blendDst,this.blendEquation=s.blendEquation,this.blendSrcAlpha=s.blendSrcAlpha,this.blendDstAlpha=s.blendDstAlpha,this.blendEquationAlpha=s.blendEquationAlpha,this.blendColor.copy(s.blendColor),this.blendAlpha=s.blendAlpha,this.depthFunc=s.depthFunc,this.depthTest=s.depthTest,this.depthWrite=s.depthWrite,this.stencilWriteMask=s.stencilWriteMask,this.stencilFunc=s.stencilFunc,this.stencilRef=s.stencilRef,this.stencilFuncMask=s.stencilFuncMask,this.stencilFail=s.stencilFail,this.stencilZFail=s.stencilZFail,this.stencilZPass=s.stencilZPass,this.stencilWrite=s.stencilWrite;const n=s.clippingPlanes;let t=null;if(n!==null){const u=n.length;t=new Array(u);for(let o=0;o!==u;++o)t[o]=n[o].clone()}return this.clippingPlanes=t,this.clipIntersection=s.clipIntersection,this.clipShadows=s.clipShadows,this.shadowSide=s.shadowSide,this.colorWrite=s.colorWrite,this.precision=s.precision,this.polygonOffset=s.polygonOffset,this.polygonOffsetFactor=s.polygonOffsetFactor,this.polygonOffsetUnits=s.polygonOffsetUnits,this.dithering=s.dithering,this.alphaTest=s.alphaTest,this.alphaHash=s.alphaHash,this.alphaToCoverage=s.alphaToCoverage,this.premultipliedAlpha=s.premultipliedAlpha,this.forceSinglePass=s.forceSinglePass,this.visible=s.visible,this.toneMapped=s.toneMapped,this.userData=JSON.parse(JSON.stringify(s.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(s){s===!0&&this.version++}}class hN extends hb{constructor(s){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ps(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ck,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(s)}copy(s){return super.copy(s),this.color.copy(s.color),this.map=s.map,this.lightMap=s.lightMap,this.lightMapIntensity=s.lightMapIntensity,this.aoMap=s.aoMap,this.aoMapIntensity=s.aoMapIntensity,this.specularMap=s.specularMap,this.alphaMap=s.alphaMap,this.envMap=s.envMap,this.combine=s.combine,this.reflectivity=s.reflectivity,this.refractionRatio=s.refractionRatio,this.wireframe=s.wireframe,this.wireframeLinewidth=s.wireframeLinewidth,this.wireframeLinecap=s.wireframeLinecap,this.wireframeLinejoin=s.wireframeLinejoin,this.fog=s.fog,this}}const Za=new ze,vG=new us;class Ea{constructor(s,n,t=!1){if(Array.isArray(s))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=s,this.itemSize=n,this.count=s!==void 0?s.length/n:0,this.normalized=t,this.usage=fj,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=QS,this.version=0}onUploadCallback(){}set needsUpdate(s){s===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(s){return this.usage=s,this}addUpdateRange(s,n){this.updateRanges.push({start:s,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(s){return this.name=s.name,this.array=new s.array.constructor(s.array),this.itemSize=s.itemSize,this.count=s.count,this.normalized=s.normalized,this.usage=s.usage,this.gpuType=s.gpuType,this}copyAt(s,n,t){s*=this.itemSize,t*=n.itemSize;for(let u=0,o=this.itemSize;u<o;u++)this.array[s+u]=n.array[t+u];return this}copyArray(s){return this.array.set(s),this}applyMatrix3(s){if(this.itemSize===2)for(let n=0,t=this.count;n<t;n++)vG.fromBufferAttribute(this,n),vG.applyMatrix3(s),this.setXY(n,vG.x,vG.y);else if(this.itemSize===3)for(let n=0,t=this.count;n<t;n++)Za.fromBufferAttribute(this,n),Za.applyMatrix3(s),this.setXYZ(n,Za.x,Za.y,Za.z);return this}applyMatrix4(s){for(let n=0,t=this.count;n<t;n++)Za.fromBufferAttribute(this,n),Za.applyMatrix4(s),this.setXYZ(n,Za.x,Za.y,Za.z);return this}applyNormalMatrix(s){for(let n=0,t=this.count;n<t;n++)Za.fromBufferAttribute(this,n),Za.applyNormalMatrix(s),this.setXYZ(n,Za.x,Za.y,Za.z);return this}transformDirection(s){for(let n=0,t=this.count;n<t;n++)Za.fromBufferAttribute(this,n),Za.transformDirection(s),this.setXYZ(n,Za.x,Za.y,Za.z);return this}set(s,n=0){return this.array.set(s,n),this}getComponent(s,n){let t=this.array[s*this.itemSize+n];return this.normalized&&(t=nm(t,this.array)),t}setComponent(s,n,t){return this.normalized&&(t=ir(t,this.array)),this.array[s*this.itemSize+n]=t,this}getX(s){let n=this.array[s*this.itemSize];return this.normalized&&(n=nm(n,this.array)),n}setX(s,n){return this.normalized&&(n=ir(n,this.array)),this.array[s*this.itemSize]=n,this}getY(s){let n=this.array[s*this.itemSize+1];return this.normalized&&(n=nm(n,this.array)),n}setY(s,n){return this.normalized&&(n=ir(n,this.array)),this.array[s*this.itemSize+1]=n,this}getZ(s){let n=this.array[s*this.itemSize+2];return this.normalized&&(n=nm(n,this.array)),n}setZ(s,n){return this.normalized&&(n=ir(n,this.array)),this.array[s*this.itemSize+2]=n,this}getW(s){let n=this.array[s*this.itemSize+3];return this.normalized&&(n=nm(n,this.array)),n}setW(s,n){return this.normalized&&(n=ir(n,this.array)),this.array[s*this.itemSize+3]=n,this}setXY(s,n,t){return s*=this.itemSize,this.normalized&&(n=ir(n,this.array),t=ir(t,this.array)),this.array[s+0]=n,this.array[s+1]=t,this}setXYZ(s,n,t,u){return s*=this.itemSize,this.normalized&&(n=ir(n,this.array),t=ir(t,this.array),u=ir(u,this.array)),this.array[s+0]=n,this.array[s+1]=t,this.array[s+2]=u,this}setXYZW(s,n,t,u,o){return s*=this.itemSize,this.normalized&&(n=ir(n,this.array),t=ir(t,this.array),u=ir(u,this.array),o=ir(o,this.array)),this.array[s+0]=n,this.array[s+1]=t,this.array[s+2]=u,this.array[s+3]=o,this}onUpload(s){return this.onUploadCallback=s,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const s={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(s.name=this.name),this.usage!==fj&&(s.usage=this.usage),s}}class EX extends Ea{constructor(s,n,t){super(new Uint16Array(s),n,t)}}class pX extends Ea{constructor(s,n,t){super(new Uint32Array(s),n,t)}}class bi extends Ea{constructor(s,n,t){super(new Float32Array(s),n,t)}}let qle=0;const Q5=new Fn,vY=new wa,RP=new ze,cy=new tl,SH=new tl,ch=new ze;class Mi extends IM{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qle++}),this.uuid=j7(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(s){return Array.isArray(s)?this.index=new(fX(s)?pX:EX)(s,1):this.index=s,this}getAttribute(s){return this.attributes[s]}setAttribute(s,n){return this.attributes[s]=n,this}deleteAttribute(s){return delete this.attributes[s],this}hasAttribute(s){return this.attributes[s]!==void 0}addGroup(s,n,t=0){this.groups.push({start:s,count:n,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(s,n){this.drawRange.start=s,this.drawRange.count=n}applyMatrix4(s){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(s),n.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const o=new gs().getNormalMatrix(s);t.applyNormalMatrix(o),t.needsUpdate=!0}const u=this.attributes.tangent;return u!==void 0&&(u.transformDirection(s),u.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(s){return Q5.makeRotationFromQuaternion(s),this.applyMatrix4(Q5),this}rotateX(s){return Q5.makeRotationX(s),this.applyMatrix4(Q5),this}rotateY(s){return Q5.makeRotationY(s),this.applyMatrix4(Q5),this}rotateZ(s){return Q5.makeRotationZ(s),this.applyMatrix4(Q5),this}translate(s,n,t){return Q5.makeTranslation(s,n,t),this.applyMatrix4(Q5),this}scale(s,n,t){return Q5.makeScale(s,n,t),this.applyMatrix4(Q5),this}lookAt(s){return vY.lookAt(s),vY.updateMatrix(),this.applyMatrix4(vY.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(RP).negate(),this.translate(RP.x,RP.y,RP.z),this}setFromPoints(s){const n=[];for(let t=0,u=s.length;t<u;t++){const o=s[t];n.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new bi(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tl);const s=this.attributes.position,n=this.morphAttributes.position;if(s&&s.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ze(-1/0,-1/0,-1/0),new ze(1/0,1/0,1/0));return}if(s!==void 0){if(this.boundingBox.setFromBufferAttribute(s),n)for(let t=0,u=n.length;t<u;t++){const o=n[t];cy.setFromBufferAttribute(o),this.morphTargetsRelative?(ch.addVectors(this.boundingBox.min,cy.min),this.boundingBox.expandByPoint(ch),ch.addVectors(this.boundingBox.max,cy.max),this.boundingBox.expandByPoint(ch)):(this.boundingBox.expandByPoint(cy.min),this.boundingBox.expandByPoint(cy.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sw);const s=this.attributes.position,n=this.morphAttributes.position;if(s&&s.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ze,1/0);return}if(s){const t=this.boundingSphere.center;if(cy.setFromBufferAttribute(s),n)for(let o=0,f=n.length;o<f;o++){const d=n[o];SH.setFromBufferAttribute(d),this.morphTargetsRelative?(ch.addVectors(cy.min,SH.min),cy.expandByPoint(ch),ch.addVectors(cy.max,SH.max),cy.expandByPoint(ch)):(cy.expandByPoint(SH.min),cy.expandByPoint(SH.max))}cy.getCenter(t);let u=0;for(let o=0,f=s.count;o<f;o++)ch.fromBufferAttribute(s,o),u=Math.max(u,t.distanceToSquared(ch));if(n)for(let o=0,f=n.length;o<f;o++){const d=n[o],m=this.morphTargetsRelative;for(let D=0,P=d.count;D<P;D++)ch.fromBufferAttribute(d,D),m&&(RP.fromBufferAttribute(s,D),ch.add(RP)),u=Math.max(u,t.distanceToSquared(ch))}this.boundingSphere.radius=Math.sqrt(u),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const s=this.index,n=this.attributes;if(s===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=s.array,u=n.position.array,o=n.normal.array,f=n.uv.array,d=u.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ea(new Float32Array(4*d),4));const m=this.getAttribute("tangent").array,D=[],P=[];for(let Te=0;Te<d;Te++)D[Te]=new ze,P[Te]=new ze;const x=new ze,H=new ze,_=new ze,ne=new us,re=new us,J=new us,K=new ze,Ie=new ze;function ce(Te,je,Ke){x.fromArray(u,Te*3),H.fromArray(u,je*3),_.fromArray(u,Ke*3),ne.fromArray(f,Te*2),re.fromArray(f,je*2),J.fromArray(f,Ke*2),H.sub(x),_.sub(x),re.sub(ne),J.sub(ne);const lt=1/(re.x*J.y-J.x*re.y);isFinite(lt)&&(K.copy(H).multiplyScalar(J.y).addScaledVector(_,-re.y).multiplyScalar(lt),Ie.copy(_).multiplyScalar(re.x).addScaledVector(H,-J.x).multiplyScalar(lt),D[Te].add(K),D[je].add(K),D[Ke].add(K),P[Te].add(Ie),P[je].add(Ie),P[Ke].add(Ie))}let ae=this.groups;ae.length===0&&(ae=[{start:0,count:t.length}]);for(let Te=0,je=ae.length;Te<je;++Te){const Ke=ae[Te],lt=Ke.start,Ze=Ke.count;for(let it=lt,ot=lt+Ze;it<ot;it+=3)ce(t[it+0],t[it+1],t[it+2])}const me=new ze,Ee=new ze,Ae=new ze,Me=new ze;function we(Te){Ae.fromArray(o,Te*3),Me.copy(Ae);const je=D[Te];me.copy(je),me.sub(Ae.multiplyScalar(Ae.dot(je))).normalize(),Ee.crossVectors(Me,je);const lt=Ee.dot(P[Te])<0?-1:1;m[Te*4]=me.x,m[Te*4+1]=me.y,m[Te*4+2]=me.z,m[Te*4+3]=lt}for(let Te=0,je=ae.length;Te<je;++Te){const Ke=ae[Te],lt=Ke.start,Ze=Ke.count;for(let it=lt,ot=lt+Ze;it<ot;it+=3)we(t[it+0]),we(t[it+1]),we(t[it+2])}}computeVertexNormals(){const s=this.index,n=this.getAttribute("position");if(n!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new Ea(new Float32Array(n.count*3),3),this.setAttribute("normal",t);else for(let H=0,_=t.count;H<_;H++)t.setXYZ(H,0,0,0);const u=new ze,o=new ze,f=new ze,d=new ze,m=new ze,D=new ze,P=new ze,x=new ze;if(s)for(let H=0,_=s.count;H<_;H+=3){const ne=s.getX(H+0),re=s.getX(H+1),J=s.getX(H+2);u.fromBufferAttribute(n,ne),o.fromBufferAttribute(n,re),f.fromBufferAttribute(n,J),P.subVectors(f,o),x.subVectors(u,o),P.cross(x),d.fromBufferAttribute(t,ne),m.fromBufferAttribute(t,re),D.fromBufferAttribute(t,J),d.add(P),m.add(P),D.add(P),t.setXYZ(ne,d.x,d.y,d.z),t.setXYZ(re,m.x,m.y,m.z),t.setXYZ(J,D.x,D.y,D.z)}else for(let H=0,_=n.count;H<_;H+=3)u.fromBufferAttribute(n,H+0),o.fromBufferAttribute(n,H+1),f.fromBufferAttribute(n,H+2),P.subVectors(f,o),x.subVectors(u,o),P.cross(x),t.setXYZ(H+0,P.x,P.y,P.z),t.setXYZ(H+1,P.x,P.y,P.z),t.setXYZ(H+2,P.x,P.y,P.z);this.normalizeNormals(),t.needsUpdate=!0}}normalizeNormals(){const s=this.attributes.normal;for(let n=0,t=s.count;n<t;n++)ch.fromBufferAttribute(s,n),ch.normalize(),s.setXYZ(n,ch.x,ch.y,ch.z)}toNonIndexed(){function s(d,m){const D=d.array,P=d.itemSize,x=d.normalized,H=new D.constructor(m.length*P);let _=0,ne=0;for(let re=0,J=m.length;re<J;re++){d.isInterleavedBufferAttribute?_=m[re]*d.data.stride+d.offset:_=m[re]*P;for(let K=0;K<P;K++)H[ne++]=D[_++]}return new Ea(H,P,x)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Mi,t=this.index.array,u=this.attributes;for(const d in u){const m=u[d],D=s(m,t);n.setAttribute(d,D)}const o=this.morphAttributes;for(const d in o){const m=[],D=o[d];for(let P=0,x=D.length;P<x;P++){const H=D[P],_=s(H,t);m.push(_)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const D=f[d];n.addGroup(D.start,D.count,D.materialIndex)}return n}toJSON(){const s={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),Object.keys(this.userData).length>0&&(s.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const D in m)m[D]!==void 0&&(s[D]=m[D]);return s}s.data={attributes:{}};const n=this.index;n!==null&&(s.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const t=this.attributes;for(const m in t){const D=t[m];s.data.attributes[m]=D.toJSON(s.data)}const u={};let o=!1;for(const m in this.morphAttributes){const D=this.morphAttributes[m],P=[];for(let x=0,H=D.length;x<H;x++){const _=D[x];P.push(_.toJSON(s.data))}P.length>0&&(u[m]=P,o=!0)}o&&(s.data.morphAttributes=u,s.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(s.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(s.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),s}clone(){return new this.constructor().copy(this)}copy(s){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=s.name;const t=s.index;t!==null&&this.setIndex(t.clone(n));const u=s.attributes;for(const D in u){const P=u[D];this.setAttribute(D,P.clone(n))}const o=s.morphAttributes;for(const D in o){const P=[],x=o[D];for(let H=0,_=x.length;H<_;H++)P.push(x[H].clone(n));this.morphAttributes[D]=P}this.morphTargetsRelative=s.morphTargetsRelative;const f=s.groups;for(let D=0,P=f.length;D<P;D++){const x=f[D];this.addGroup(x.start,x.count,x.materialIndex)}const d=s.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=s.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=s.drawRange.start,this.drawRange.count=s.drawRange.count,this.userData=s.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const TK=new Fn,F8=new yM,e_=new Sw,mK=new ze,AP=new ze,DP=new ze,SP=new ze,ez=new ze,t_=new ze,n_=new us,s_=new us,l_=new us,RK=new ze,AK=new ze,DK=new ze,r_=new ze,i_=new ze;class mn extends wa{constructor(s=new Mi,n=new hN){super(),this.isMesh=!0,this.type="Mesh",this.geometry=s,this.material=n,this.updateMorphTargets()}copy(s,n){return super.copy(s,n),s.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=s.morphTargetInfluences.slice()),s.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},s.morphTargetDictionary)),this.material=Array.isArray(s.material)?s.material.slice():s.material,this.geometry=s.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,t=Object.keys(n);if(t.length>0){const u=n[t[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,f=u.length;o<f;o++){const d=u[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=o}}}}getVertexPosition(s,n){const t=this.geometry,u=t.attributes.position,o=t.morphAttributes.position,f=t.morphTargetsRelative;n.fromBufferAttribute(u,s);const d=this.morphTargetInfluences;if(o&&d){t_.set(0,0,0);for(let m=0,D=o.length;m<D;m++){const P=d[m],x=o[m];P!==0&&(ez.fromBufferAttribute(x,s),f?t_.addScaledVector(ez,P):t_.addScaledVector(ez.sub(n),P))}n.add(t_)}return n}raycast(s,n){const t=this.geometry,u=this.material,o=this.matrixWorld;u!==void 0&&(t.boundingSphere===null&&t.computeBoundingSphere(),e_.copy(t.boundingSphere),e_.applyMatrix4(o),F8.copy(s.ray).recast(s.near),!(e_.containsPoint(F8.origin)===!1&&(F8.intersectSphere(e_,mK)===null||F8.origin.distanceToSquared(mK)>(s.far-s.near)**2))&&(TK.copy(o).invert(),F8.copy(s.ray).applyMatrix4(TK),!(t.boundingBox!==null&&F8.intersectsBox(t.boundingBox)===!1)&&this._computeIntersections(s,n,F8)))}_computeIntersections(s,n,t){let u;const o=this.geometry,f=this.material,d=o.index,m=o.attributes.position,D=o.attributes.uv,P=o.attributes.uv1,x=o.attributes.normal,H=o.groups,_=o.drawRange;if(d!==null)if(Array.isArray(f))for(let ne=0,re=H.length;ne<re;ne++){const J=H[ne],K=f[J.materialIndex],Ie=Math.max(J.start,_.start),ce=Math.min(d.count,Math.min(J.start+J.count,_.start+_.count));for(let ae=Ie,me=ce;ae<me;ae+=3){const Ee=d.getX(ae),Ae=d.getX(ae+1),Me=d.getX(ae+2);u=u_(this,K,s,t,D,P,x,Ee,Ae,Me),u&&(u.faceIndex=Math.floor(ae/3),u.face.materialIndex=J.materialIndex,n.push(u))}}else{const ne=Math.max(0,_.start),re=Math.min(d.count,_.start+_.count);for(let J=ne,K=re;J<K;J+=3){const Ie=d.getX(J),ce=d.getX(J+1),ae=d.getX(J+2);u=u_(this,f,s,t,D,P,x,Ie,ce,ae),u&&(u.faceIndex=Math.floor(J/3),n.push(u))}}else if(m!==void 0)if(Array.isArray(f))for(let ne=0,re=H.length;ne<re;ne++){const J=H[ne],K=f[J.materialIndex],Ie=Math.max(J.start,_.start),ce=Math.min(m.count,Math.min(J.start+J.count,_.start+_.count));for(let ae=Ie,me=ce;ae<me;ae+=3){const Ee=ae,Ae=ae+1,Me=ae+2;u=u_(this,K,s,t,D,P,x,Ee,Ae,Me),u&&(u.faceIndex=Math.floor(ae/3),u.face.materialIndex=J.materialIndex,n.push(u))}}else{const ne=Math.max(0,_.start),re=Math.min(m.count,_.start+_.count);for(let J=ne,K=re;J<K;J+=3){const Ie=J,ce=J+1,ae=J+2;u=u_(this,f,s,t,D,P,x,Ie,ce,ae),u&&(u.faceIndex=Math.floor(J/3),n.push(u))}}}}function $le(e,s,n,t,u,o,f,d){let m;if(s.side===YI?m=t.intersectTriangle(f,o,u,!0,d):m=t.intersectTriangle(u,o,f,s.side===Aw,d),m===null)return null;i_.copy(d),i_.applyMatrix4(e.matrixWorld);const D=n.ray.origin.distanceTo(i_);return D<n.near||D>n.far?null:{distance:D,point:i_.clone(),object:e}}function u_(e,s,n,t,u,o,f,d,m,D){e.getVertexPosition(d,AP),e.getVertexPosition(m,DP),e.getVertexPosition(D,SP);const P=$le(e,s,n,t,AP,DP,SP,r_);if(P){u&&(n_.fromBufferAttribute(u,d),s_.fromBufferAttribute(u,m),l_.fromBufferAttribute(u,D),P.uv=yu.getInterpolation(r_,AP,DP,SP,n_,s_,l_,new us)),o&&(n_.fromBufferAttribute(o,d),s_.fromBufferAttribute(o,m),l_.fromBufferAttribute(o,D),P.uv1=yu.getInterpolation(r_,AP,DP,SP,n_,s_,l_,new us),P.uv2=P.uv1),f&&(RK.fromBufferAttribute(f,d),AK.fromBufferAttribute(f,m),DK.fromBufferAttribute(f,D),P.normal=yu.getInterpolation(r_,AP,DP,SP,RK,AK,DK,new ze),P.normal.dot(t.direction)>0&&P.normal.multiplyScalar(-1));const x={a:d,b:m,c:D,normal:new ze,materialIndex:0};yu.getNormal(AP,DP,SP,x.normal),P.face=x}return P}class Pa extends Mi{constructor(s=1,n=1,t=1,u=1,o=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:s,height:n,depth:t,widthSegments:u,heightSegments:o,depthSegments:f};const d=this;u=Math.floor(u),o=Math.floor(o),f=Math.floor(f);const m=[],D=[],P=[],x=[];let H=0,_=0;ne("z","y","x",-1,-1,t,n,s,f,o,0),ne("z","y","x",1,-1,t,n,-s,f,o,1),ne("x","z","y",1,1,s,t,n,u,f,2),ne("x","z","y",1,-1,s,t,-n,u,f,3),ne("x","y","z",1,-1,s,n,t,u,o,4),ne("x","y","z",-1,-1,s,n,-t,u,o,5),this.setIndex(m),this.setAttribute("position",new bi(D,3)),this.setAttribute("normal",new bi(P,3)),this.setAttribute("uv",new bi(x,2));function ne(re,J,K,Ie,ce,ae,me,Ee,Ae,Me,we){const Te=ae/Ae,je=me/Me,Ke=ae/2,lt=me/2,Ze=Ee/2,it=Ae+1,ot=Me+1;let yt=0,Rt=0;const Ct=new ze;for(let Bt=0;Bt<ot;Bt++){const Ut=Bt*je-lt;for(let Ft=0;Ft<it;Ft++){const Nt=Ft*Te-Ke;Ct[re]=Nt*Ie,Ct[J]=Ut*ce,Ct[K]=Ze,D.push(Ct.x,Ct.y,Ct.z),Ct[re]=0,Ct[J]=0,Ct[K]=Ee>0?1:-1,P.push(Ct.x,Ct.y,Ct.z),x.push(Ft/Ae),x.push(1-Bt/Me),yt+=1}}for(let Bt=0;Bt<Me;Bt++)for(let Ut=0;Ut<Ae;Ut++){const Ft=H+Ut+it*Bt,Nt=H+Ut+it*(Bt+1),Gt=H+(Ut+1)+it*(Bt+1),en=H+(Ut+1)+it*Bt;m.push(Ft,Nt,en),m.push(Nt,Gt,en),Rt+=6}d.addGroup(_,Rt,we),_+=Rt,H+=yt}}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}static fromJSON(s){return new Pa(s.width,s.height,s.depth,s.widthSegments,s.heightSegments,s.depthSegments)}}function $9(e){const s={};for(const n in e){s[n]={};for(const t in e[n]){const u=e[n][t];u&&(u.isColor||u.isMatrix3||u.isMatrix4||u.isVector2||u.isVector3||u.isVector4||u.isTexture||u.isQuaternion)?u.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),s[n][t]=null):s[n][t]=u.clone():Array.isArray(u)?s[n][t]=u.slice():s[n][t]=u}}return s}function x0(e){const s={};for(let n=0;n<e.length;n++){const t=$9(e[n]);for(const u in t)s[u]=t[u]}return s}function Kle(e){const s=[];for(let n=0;n<e.length;n++)s.push(e[n].clone());return s}function TX(e){return e.getRenderTarget()===null?e.outputColorSpace:Wl.workingColorSpace}const Qle={clone:$9,merge:x0};var Zle=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jle=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fN extends hb{constructor(s){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zle,this.fragmentShader=Jle,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,s!==void 0&&this.setValues(s)}copy(s){return super.copy(s),this.fragmentShader=s.fragmentShader,this.vertexShader=s.vertexShader,this.uniforms=$9(s.uniforms),this.uniformsGroups=Kle(s.uniformsGroups),this.defines=Object.assign({},s.defines),this.wireframe=s.wireframe,this.wireframeLinewidth=s.wireframeLinewidth,this.fog=s.fog,this.lights=s.lights,this.clipping=s.clipping,this.extensions=Object.assign({},s.extensions),this.glslVersion=s.glslVersion,this}toJSON(s){const n=super.toJSON(s);n.glslVersion=this.glslVersion,n.uniforms={};for(const u in this.uniforms){const f=this.uniforms[u].value;f&&f.isTexture?n.uniforms[u]={type:"t",value:f.toJSON(s).uuid}:f&&f.isColor?n.uniforms[u]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[u]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[u]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[u]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[u]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[u]={type:"m4",value:f.toArray()}:n.uniforms[u]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const t={};for(const u in this.extensions)this.extensions[u]===!0&&(t[u]=!0);return Object.keys(t).length>0&&(n.extensions=t),n}}class mX extends wa{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fn,this.projectionMatrix=new Fn,this.projectionMatrixInverse=new Fn,this.coordinateSystem=I7}copy(s,n){return super.copy(s,n),this.matrixWorldInverse.copy(s.matrixWorldInverse),this.projectionMatrix.copy(s.projectionMatrix),this.projectionMatrixInverse.copy(s.projectionMatrixInverse),this.coordinateSystem=s.coordinateSystem,this}getWorldDirection(s){return super.getWorldDirection(s).negate()}updateMatrixWorld(s){super.updateMatrixWorld(s),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(s,n){super.updateWorldMatrix(s,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ew extends mX{constructor(s=50,n=1,t=.1,u=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=s,this.zoom=1,this.near=t,this.far=u,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(s,n){return super.copy(s,n),this.fov=s.fov,this.zoom=s.zoom,this.near=s.near,this.far=s.far,this.focus=s.focus,this.aspect=s.aspect,this.view=s.view===null?null:Object.assign({},s.view),this.filmGauge=s.filmGauge,this.filmOffset=s.filmOffset,this}setFocalLength(s){const n=.5*this.getFilmHeight()/s;this.fov=jF*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const s=Math.tan(B9*.5*this.fov);return .5*this.getFilmHeight()/s}getEffectiveFOV(){return jF*2*Math.atan(Math.tan(B9*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(s,n,t,u,o,f){this.aspect=s/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=s,this.view.fullHeight=n,this.view.offsetX=t,this.view.offsetY=u,this.view.width=o,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const s=this.near;let n=s*Math.tan(B9*.5*this.fov)/this.zoom,t=2*n,u=this.aspect*t,o=-.5*u;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,D=f.fullHeight;o+=f.offsetX*u/m,n-=f.offsetY*t/D,u*=f.width/m,t*=f.height/D}const d=this.filmOffset;d!==0&&(o+=s*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+u,n,n-t,s,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(s){const n=super.toJSON(s);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const NP=-90,gP=1;class Xle extends wa{constructor(s,n,t){super(),this.type="CubeCamera",this.renderTarget=t,this.coordinateSystem=null,this.activeMipmapLevel=0;const u=new ew(NP,gP,s,n);u.layers=this.layers,this.add(u);const o=new ew(NP,gP,s,n);o.layers=this.layers,this.add(o);const f=new ew(NP,gP,s,n);f.layers=this.layers,this.add(f);const d=new ew(NP,gP,s,n);d.layers=this.layers,this.add(d);const m=new ew(NP,gP,s,n);m.layers=this.layers,this.add(m);const D=new ew(NP,gP,s,n);D.layers=this.layers,this.add(D)}updateCoordinateSystem(){const s=this.coordinateSystem,n=this.children.concat(),[t,u,o,f,d,m]=n;for(const D of n)this.remove(D);if(s===I7)t.up.set(0,1,0),t.lookAt(1,0,0),u.up.set(0,1,0),u.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(s===iW)t.up.set(0,-1,0),t.lookAt(-1,0,0),u.up.set(0,-1,0),u.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+s);for(const D of n)this.add(D),D.updateMatrixWorld()}update(s,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:t,activeMipmapLevel:u}=this;this.coordinateSystem!==s.coordinateSystem&&(this.coordinateSystem=s.coordinateSystem,this.updateCoordinateSystem());const[o,f,d,m,D,P]=this.children,x=s.getRenderTarget(),H=s.getActiveCubeFace(),_=s.getActiveMipmapLevel(),ne=s.xr.enabled;s.xr.enabled=!1;const re=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,s.setRenderTarget(t,0,u),s.render(n,o),s.setRenderTarget(t,1,u),s.render(n,f),s.setRenderTarget(t,2,u),s.render(n,d),s.setRenderTarget(t,3,u),s.render(n,m),s.setRenderTarget(t,4,u),s.render(n,D),t.texture.generateMipmaps=re,s.setRenderTarget(t,5,u),s.render(n,P),s.setRenderTarget(x,H,_),s.xr.enabled=ne,t.texture.needsPMREMUpdate=!0}}class RX extends e4{constructor(s,n,t,u,o,f,d,m,D,P){s=s!==void 0?s:[],n=n!==void 0?n:j9,super(s,n,t,u,o,f,d,m,D,P),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(s){this.image=s}}class vle extends aA{constructor(s=1,n={}){super(s,s,n),this.isWebGLCubeRenderTarget=!0;const t={width:s,height:s,depth:1},u=[t,t,t,t,t,t];n.encoding!==void 0&&(MF("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===FO?Ad:tw),this.texture=new RX(u,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:v5}fromEquirectangularTexture(s,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},u=new Pa(5,5,5),o=new fN({name:"CubemapFromEquirect",uniforms:$9(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:YI,blending:nN});o.uniforms.tEquirect.value=n;const f=new mn(u,o),d=n.minFilter;return n.minFilter===YF&&(n.minFilter=v5),new Xle(1,10,this).update(s,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(s,n,t,u){const o=s.getRenderTarget();for(let f=0;f<6;f++)s.setRenderTarget(this,f),s.clear(n,t,u);s.setRenderTarget(o)}}const tz=new ze,ere=new ze,tre=new gs;class Q0{constructor(s=new ze(1,0,0),n=0){this.isPlane=!0,this.normal=s,this.constant=n}set(s,n){return this.normal.copy(s),this.constant=n,this}setComponents(s,n,t,u){return this.normal.set(s,n,t),this.constant=u,this}setFromNormalAndCoplanarPoint(s,n){return this.normal.copy(s),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(s,n,t){const u=tz.subVectors(t,n).cross(ere.subVectors(s,n)).normalize();return this.setFromNormalAndCoplanarPoint(u,s),this}copy(s){return this.normal.copy(s.normal),this.constant=s.constant,this}normalize(){const s=1/this.normal.length();return this.normal.multiplyScalar(s),this.constant*=s,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(s){return this.normal.dot(s)+this.constant}distanceToSphere(s){return this.distanceToPoint(s.center)-s.radius}projectPoint(s,n){return n.copy(s).addScaledVector(this.normal,-this.distanceToPoint(s))}intersectLine(s,n){const t=s.delta(tz),u=this.normal.dot(t);if(u===0)return this.distanceToPoint(s.start)===0?n.copy(s.start):null;const o=-(s.start.dot(this.normal)+this.constant)/u;return o<0||o>1?null:n.copy(s.start).addScaledVector(t,o)}intersectsLine(s){const n=this.distanceToPoint(s.start),t=this.distanceToPoint(s.end);return n<0&&t>0||t<0&&n>0}intersectsBox(s){return s.intersectsPlane(this)}intersectsSphere(s){return s.intersectsPlane(this)}coplanarPoint(s){return s.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(s,n){const t=n||tre.getNormalMatrix(s),u=this.coplanarPoint(tz).applyMatrix4(s),o=this.normal.applyMatrix3(t).normalize();return this.constant=-u.dot(o),this}translate(s){return this.constant-=s.dot(this.normal),this}equals(s){return s.normal.equals(this.normal)&&s.constant===this.constant}clone(){return new this.constructor().copy(this)}}const G8=new Sw,a_=new ze;class Bk{constructor(s=new Q0,n=new Q0,t=new Q0,u=new Q0,o=new Q0,f=new Q0){this.planes=[s,n,t,u,o,f]}set(s,n,t,u,o,f){const d=this.planes;return d[0].copy(s),d[1].copy(n),d[2].copy(t),d[3].copy(u),d[4].copy(o),d[5].copy(f),this}copy(s){const n=this.planes;for(let t=0;t<6;t++)n[t].copy(s.planes[t]);return this}setFromProjectionMatrix(s,n=I7){const t=this.planes,u=s.elements,o=u[0],f=u[1],d=u[2],m=u[3],D=u[4],P=u[5],x=u[6],H=u[7],_=u[8],ne=u[9],re=u[10],J=u[11],K=u[12],Ie=u[13],ce=u[14],ae=u[15];if(t[0].setComponents(m-o,H-D,J-_,ae-K).normalize(),t[1].setComponents(m+o,H+D,J+_,ae+K).normalize(),t[2].setComponents(m+f,H+P,J+ne,ae+Ie).normalize(),t[3].setComponents(m-f,H-P,J-ne,ae-Ie).normalize(),t[4].setComponents(m-d,H-x,J-re,ae-ce).normalize(),n===I7)t[5].setComponents(m+d,H+x,J+re,ae+ce).normalize();else if(n===iW)t[5].setComponents(d,x,re,ce).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(s){if(s.boundingSphere!==void 0)s.boundingSphere===null&&s.computeBoundingSphere(),G8.copy(s.boundingSphere).applyMatrix4(s.matrixWorld);else{const n=s.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),G8.copy(n.boundingSphere).applyMatrix4(s.matrixWorld)}return this.intersectsSphere(G8)}intersectsSprite(s){return G8.center.set(0,0,0),G8.radius=.7071067811865476,G8.applyMatrix4(s.matrixWorld),this.intersectsSphere(G8)}intersectsSphere(s){const n=this.planes,t=s.center,u=-s.radius;for(let o=0;o<6;o++)if(n[o].distanceToPoint(t)<u)return!1;return!0}intersectsBox(s){const n=this.planes;for(let t=0;t<6;t++){const u=n[t];if(a_.x=u.normal.x>0?s.max.x:s.min.x,a_.y=u.normal.y>0?s.max.y:s.min.y,a_.z=u.normal.z>0?s.max.z:s.min.z,u.distanceToPoint(a_)<0)return!1}return!0}containsPoint(s){const n=this.planes;for(let t=0;t<6;t++)if(n[t].distanceToPoint(s)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function AX(){let e=null,s=!1,n=null,t=null;function u(o,f){n(o,f),t=e.requestAnimationFrame(u)}return{start:function(){s!==!0&&n!==null&&(t=e.requestAnimationFrame(u),s=!0)},stop:function(){e.cancelAnimationFrame(t),s=!1},setAnimationLoop:function(o){n=o},setContext:function(o){e=o}}}function nre(e,s){const n=s.isWebGL2,t=new WeakMap;function u(D,P){const x=D.array,H=D.usage,_=x.byteLength,ne=e.createBuffer();e.bindBuffer(P,ne),e.bufferData(P,x,H),D.onUploadCallback();let re;if(x instanceof Float32Array)re=e.FLOAT;else if(x instanceof Uint16Array)if(D.isFloat16BufferAttribute)if(n)re=e.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else re=e.UNSIGNED_SHORT;else if(x instanceof Int16Array)re=e.SHORT;else if(x instanceof Uint32Array)re=e.UNSIGNED_INT;else if(x instanceof Int32Array)re=e.INT;else if(x instanceof Int8Array)re=e.BYTE;else if(x instanceof Uint8Array)re=e.UNSIGNED_BYTE;else if(x instanceof Uint8ClampedArray)re=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+x);return{buffer:ne,type:re,bytesPerElement:x.BYTES_PER_ELEMENT,version:D.version,size:_}}function o(D,P,x){const H=P.array,_=P._updateRange,ne=P.updateRanges;if(e.bindBuffer(x,D),_.count===-1&&ne.length===0&&e.bufferSubData(x,0,H),ne.length!==0){for(let re=0,J=ne.length;re<J;re++){const K=ne[re];n?e.bufferSubData(x,K.start*H.BYTES_PER_ELEMENT,H,K.start,K.count):e.bufferSubData(x,K.start*H.BYTES_PER_ELEMENT,H.subarray(K.start,K.start+K.count))}P.clearUpdateRanges()}_.count!==-1&&(n?e.bufferSubData(x,_.offset*H.BYTES_PER_ELEMENT,H,_.offset,_.count):e.bufferSubData(x,_.offset*H.BYTES_PER_ELEMENT,H.subarray(_.offset,_.offset+_.count)),_.count=-1),P.onUploadCallback()}function f(D){return D.isInterleavedBufferAttribute&&(D=D.data),t.get(D)}function d(D){D.isInterleavedBufferAttribute&&(D=D.data);const P=t.get(D);P&&(e.deleteBuffer(P.buffer),t.delete(D))}function m(D,P){if(D.isGLBufferAttribute){const H=t.get(D);(!H||H.version<D.version)&&t.set(D,{buffer:D.buffer,type:D.type,bytesPerElement:D.elementSize,version:D.version});return}D.isInterleavedBufferAttribute&&(D=D.data);const x=t.get(D);if(x===void 0)t.set(D,u(D,P));else if(x.version<D.version){if(x.size!==D.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(x.buffer,D,P),x.version=D.version}}return{get:f,remove:d,update:m}}class wM extends Mi{constructor(s=1,n=1,t=1,u=1){super(),this.type="PlaneGeometry",this.parameters={width:s,height:n,widthSegments:t,heightSegments:u};const o=s/2,f=n/2,d=Math.floor(t),m=Math.floor(u),D=d+1,P=m+1,x=s/d,H=n/m,_=[],ne=[],re=[],J=[];for(let K=0;K<P;K++){const Ie=K*H-f;for(let ce=0;ce<D;ce++){const ae=ce*x-o;ne.push(ae,-Ie,0),re.push(0,0,1),J.push(ce/d),J.push(1-K/m)}}for(let K=0;K<m;K++)for(let Ie=0;Ie<d;Ie++){const ce=Ie+D*K,ae=Ie+D*(K+1),me=Ie+1+D*(K+1),Ee=Ie+1+D*K;_.push(ce,ae,Ee),_.push(ae,me,Ee)}this.setIndex(_),this.setAttribute("position",new bi(ne,3)),this.setAttribute("normal",new bi(re,3)),this.setAttribute("uv",new bi(J,2))}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}static fromJSON(s){return new wM(s.width,s.height,s.widthSegments,s.heightSegments)}}var sre=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lre=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rre=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ire=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ure=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,are=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ore=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cre=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hre=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fre=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,dre=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ire=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yre=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wre=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ere=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pre=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Tre=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mre=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rre=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Are=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dre=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sre=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Nre=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,gre=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ore=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lre=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bre=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cre=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pre=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mre=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xre="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ure=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Bre=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Hre=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fre=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gre=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_re=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vre=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wre=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yre=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zre=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jre=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kre=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qre=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$re=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kre=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qre=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zre=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jre=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xre=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vre=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eie=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tie=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,nie=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sie=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lie=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rie=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iie=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uie=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aie=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,oie=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,cie=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hie=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fie=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,die=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iie=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yie=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wie=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Eie=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,pie=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Tie=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,mie=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Rie=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Aie=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Die=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sie=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nie=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gie=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Oie=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lie=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bie=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cie=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pie=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Mie=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xie=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Uie=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bie=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hie=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fie=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gie=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,_ie=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vie=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wie=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yie=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zie=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jie=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kie=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qie=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$ie=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kie=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qie=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zie=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jie=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xie=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vie=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eue=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tue=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nue=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sue=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lue=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rue=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iue=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uue=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aue=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,oue=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cue=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hue=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fue=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,due=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iue=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yue=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wue=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Eue=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pue=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tue=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mue=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Rue=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aue=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Due=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sue=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nue=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gue=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Oue=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lue=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bue=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cue=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pue=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mue=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xue=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Uue=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bue=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vs={alphahash_fragment:sre,alphahash_pars_fragment:lre,alphamap_fragment:rre,alphamap_pars_fragment:ire,alphatest_fragment:ure,alphatest_pars_fragment:are,aomap_fragment:ore,aomap_pars_fragment:cre,batching_pars_vertex:hre,batching_vertex:fre,begin_vertex:dre,beginnormal_vertex:Ire,bsdfs:yre,iridescence_fragment:wre,bumpmap_pars_fragment:Ere,clipping_planes_fragment:pre,clipping_planes_pars_fragment:Tre,clipping_planes_pars_vertex:mre,clipping_planes_vertex:Rre,color_fragment:Are,color_pars_fragment:Dre,color_pars_vertex:Sre,color_vertex:Nre,common:gre,cube_uv_reflection_fragment:Ore,defaultnormal_vertex:Lre,displacementmap_pars_vertex:bre,displacementmap_vertex:Cre,emissivemap_fragment:Pre,emissivemap_pars_fragment:Mre,colorspace_fragment:xre,colorspace_pars_fragment:Ure,envmap_fragment:Bre,envmap_common_pars_fragment:Hre,envmap_pars_fragment:Fre,envmap_pars_vertex:Gre,envmap_physical_pars_fragment:Zre,envmap_vertex:_re,fog_vertex:Vre,fog_pars_vertex:Wre,fog_fragment:Yre,fog_pars_fragment:zre,gradientmap_pars_fragment:jre,lightmap_fragment:kre,lightmap_pars_fragment:qre,lights_lambert_fragment:$re,lights_lambert_pars_fragment:Kre,lights_pars_begin:Qre,lights_toon_fragment:Jre,lights_toon_pars_fragment:Xre,lights_phong_fragment:vre,lights_phong_pars_fragment:eie,lights_physical_fragment:tie,lights_physical_pars_fragment:nie,lights_fragment_begin:sie,lights_fragment_maps:lie,lights_fragment_end:rie,logdepthbuf_fragment:iie,logdepthbuf_pars_fragment:uie,logdepthbuf_pars_vertex:aie,logdepthbuf_vertex:oie,map_fragment:cie,map_pars_fragment:hie,map_particle_fragment:fie,map_particle_pars_fragment:die,metalnessmap_fragment:Iie,metalnessmap_pars_fragment:yie,morphcolor_vertex:wie,morphnormal_vertex:Eie,morphtarget_pars_vertex:pie,morphtarget_vertex:Tie,normal_fragment_begin:mie,normal_fragment_maps:Rie,normal_pars_fragment:Aie,normal_pars_vertex:Die,normal_vertex:Sie,normalmap_pars_fragment:Nie,clearcoat_normal_fragment_begin:gie,clearcoat_normal_fragment_maps:Oie,clearcoat_pars_fragment:Lie,iridescence_pars_fragment:bie,opaque_fragment:Cie,packing:Pie,premultiplied_alpha_fragment:Mie,project_vertex:xie,dithering_fragment:Uie,dithering_pars_fragment:Bie,roughnessmap_fragment:Hie,roughnessmap_pars_fragment:Fie,shadowmap_pars_fragment:Gie,shadowmap_pars_vertex:_ie,shadowmap_vertex:Vie,shadowmask_pars_fragment:Wie,skinbase_vertex:Yie,skinning_pars_vertex:zie,skinning_vertex:jie,skinnormal_vertex:kie,specularmap_fragment:qie,specularmap_pars_fragment:$ie,tonemapping_fragment:Kie,tonemapping_pars_fragment:Qie,transmission_fragment:Zie,transmission_pars_fragment:Jie,uv_pars_fragment:Xie,uv_pars_vertex:vie,uv_vertex:eue,worldpos_vertex:tue,background_vert:nue,background_frag:sue,backgroundCube_vert:lue,backgroundCube_frag:rue,cube_vert:iue,cube_frag:uue,depth_vert:aue,depth_frag:oue,distanceRGBA_vert:cue,distanceRGBA_frag:hue,equirect_vert:fue,equirect_frag:due,linedashed_vert:Iue,linedashed_frag:yue,meshbasic_vert:wue,meshbasic_frag:Eue,meshlambert_vert:pue,meshlambert_frag:Tue,meshmatcap_vert:mue,meshmatcap_frag:Rue,meshnormal_vert:Aue,meshnormal_frag:Due,meshphong_vert:Sue,meshphong_frag:Nue,meshphysical_vert:gue,meshphysical_frag:Oue,meshtoon_vert:Lue,meshtoon_frag:bue,points_vert:Cue,points_frag:Pue,shadow_vert:Mue,shadow_frag:xue,sprite_vert:Uue,sprite_frag:Bue},wn={common:{diffuse:{value:new ps(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gs},alphaMap:{value:null},alphaMapTransform:{value:new gs},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gs}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gs}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gs}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gs},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gs},normalScale:{value:new us(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gs},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gs}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gs}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gs}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ps(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ps(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gs},alphaTest:{value:0},uvTransform:{value:new gs}},sprite:{diffuse:{value:new ps(16777215)},opacity:{value:1},center:{value:new us(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gs},alphaMap:{value:null},alphaMapTransform:{value:new gs},alphaTest:{value:0}}},tm={basic:{uniforms:x0([wn.common,wn.specularmap,wn.envmap,wn.aomap,wn.lightmap,wn.fog]),vertexShader:Vs.meshbasic_vert,fragmentShader:Vs.meshbasic_frag},lambert:{uniforms:x0([wn.common,wn.specularmap,wn.envmap,wn.aomap,wn.lightmap,wn.emissivemap,wn.bumpmap,wn.normalmap,wn.displacementmap,wn.fog,wn.lights,{emissive:{value:new ps(0)}}]),vertexShader:Vs.meshlambert_vert,fragmentShader:Vs.meshlambert_frag},phong:{uniforms:x0([wn.common,wn.specularmap,wn.envmap,wn.aomap,wn.lightmap,wn.emissivemap,wn.bumpmap,wn.normalmap,wn.displacementmap,wn.fog,wn.lights,{emissive:{value:new ps(0)},specular:{value:new ps(1118481)},shininess:{value:30}}]),vertexShader:Vs.meshphong_vert,fragmentShader:Vs.meshphong_frag},standard:{uniforms:x0([wn.common,wn.envmap,wn.aomap,wn.lightmap,wn.emissivemap,wn.bumpmap,wn.normalmap,wn.displacementmap,wn.roughnessmap,wn.metalnessmap,wn.fog,wn.lights,{emissive:{value:new ps(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vs.meshphysical_vert,fragmentShader:Vs.meshphysical_frag},toon:{uniforms:x0([wn.common,wn.aomap,wn.lightmap,wn.emissivemap,wn.bumpmap,wn.normalmap,wn.displacementmap,wn.gradientmap,wn.fog,wn.lights,{emissive:{value:new ps(0)}}]),vertexShader:Vs.meshtoon_vert,fragmentShader:Vs.meshtoon_frag},matcap:{uniforms:x0([wn.common,wn.bumpmap,wn.normalmap,wn.displacementmap,wn.fog,{matcap:{value:null}}]),vertexShader:Vs.meshmatcap_vert,fragmentShader:Vs.meshmatcap_frag},points:{uniforms:x0([wn.points,wn.fog]),vertexShader:Vs.points_vert,fragmentShader:Vs.points_frag},dashed:{uniforms:x0([wn.common,wn.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vs.linedashed_vert,fragmentShader:Vs.linedashed_frag},depth:{uniforms:x0([wn.common,wn.displacementmap]),vertexShader:Vs.depth_vert,fragmentShader:Vs.depth_frag},normal:{uniforms:x0([wn.common,wn.bumpmap,wn.normalmap,wn.displacementmap,{opacity:{value:1}}]),vertexShader:Vs.meshnormal_vert,fragmentShader:Vs.meshnormal_frag},sprite:{uniforms:x0([wn.sprite,wn.fog]),vertexShader:Vs.sprite_vert,fragmentShader:Vs.sprite_frag},background:{uniforms:{uvTransform:{value:new gs},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vs.background_vert,fragmentShader:Vs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Vs.backgroundCube_vert,fragmentShader:Vs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vs.cube_vert,fragmentShader:Vs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vs.equirect_vert,fragmentShader:Vs.equirect_frag},distanceRGBA:{uniforms:x0([wn.common,wn.displacementmap,{referencePosition:{value:new ze},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vs.distanceRGBA_vert,fragmentShader:Vs.distanceRGBA_frag},shadow:{uniforms:x0([wn.lights,wn.fog,{color:{value:new ps(0)},opacity:{value:1}}]),vertexShader:Vs.shadow_vert,fragmentShader:Vs.shadow_frag}};tm.physical={uniforms:x0([tm.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gs},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gs},clearcoatNormalScale:{value:new us(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gs},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gs},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gs},sheen:{value:0},sheenColor:{value:new ps(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gs},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gs},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gs},transmissionSamplerSize:{value:new us},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gs},attenuationDistance:{value:0},attenuationColor:{value:new ps(0)},specularColor:{value:new ps(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gs},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gs},anisotropyVector:{value:new us},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gs}}]),vertexShader:Vs.meshphysical_vert,fragmentShader:Vs.meshphysical_frag};const o_={r:0,b:0,g:0};function Hue(e,s,n,t,u,o,f){const d=new ps(0);let m=o===!0?0:1,D,P,x=null,H=0,_=null;function ne(J,K){let Ie=!1,ce=K.isScene===!0?K.background:null;ce&&ce.isTexture&&(ce=(K.backgroundBlurriness>0?n:s).get(ce)),ce===null?re(d,m):ce&&ce.isColor&&(re(ce,1),Ie=!0);const ae=e.xr.getEnvironmentBlendMode();ae==="additive"?t.buffers.color.setClear(0,0,0,1,f):ae==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,f),(e.autoClear||Ie)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),ce&&(ce.isCubeTexture||ce.mapping===gW)?(P===void 0&&(P=new mn(new Pa(1,1,1),new fN({name:"BackgroundCubeMaterial",uniforms:$9(tm.backgroundCube.uniforms),vertexShader:tm.backgroundCube.vertexShader,fragmentShader:tm.backgroundCube.fragmentShader,side:YI,depthTest:!1,depthWrite:!1,fog:!1})),P.geometry.deleteAttribute("normal"),P.geometry.deleteAttribute("uv"),P.onBeforeRender=function(me,Ee,Ae){this.matrixWorld.copyPosition(Ae.matrixWorld)},Object.defineProperty(P.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),u.update(P)),P.material.uniforms.envMap.value=ce,P.material.uniforms.flipEnvMap.value=ce.isCubeTexture&&ce.isRenderTargetTexture===!1?-1:1,P.material.uniforms.backgroundBlurriness.value=K.backgroundBlurriness,P.material.uniforms.backgroundIntensity.value=K.backgroundIntensity,P.material.toneMapped=Wl.getTransfer(ce.colorSpace)!==Pr,(x!==ce||H!==ce.version||_!==e.toneMapping)&&(P.material.needsUpdate=!0,x=ce,H=ce.version,_=e.toneMapping),P.layers.enableAll(),J.unshift(P,P.geometry,P.material,0,0,null)):ce&&ce.isTexture&&(D===void 0&&(D=new mn(new wM(2,2),new fN({name:"BackgroundMaterial",uniforms:$9(tm.background.uniforms),vertexShader:tm.background.vertexShader,fragmentShader:tm.background.fragmentShader,side:Aw,depthTest:!1,depthWrite:!1,fog:!1})),D.geometry.deleteAttribute("normal"),Object.defineProperty(D.material,"map",{get:function(){return this.uniforms.t2D.value}}),u.update(D)),D.material.uniforms.t2D.value=ce,D.material.uniforms.backgroundIntensity.value=K.backgroundIntensity,D.material.toneMapped=Wl.getTransfer(ce.colorSpace)!==Pr,ce.matrixAutoUpdate===!0&&ce.updateMatrix(),D.material.uniforms.uvTransform.value.copy(ce.matrix),(x!==ce||H!==ce.version||_!==e.toneMapping)&&(D.material.needsUpdate=!0,x=ce,H=ce.version,_=e.toneMapping),D.layers.enableAll(),J.unshift(D,D.geometry,D.material,0,0,null))}function re(J,K){J.getRGB(o_,TX(e)),t.buffers.color.setClear(o_.r,o_.g,o_.b,K,f)}return{getClearColor:function(){return d},setClearColor:function(J,K=1){d.set(J),m=K,re(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(J){m=J,re(d,m)},render:ne}}function Fue(e,s,n,t){const u=e.getParameter(e.MAX_VERTEX_ATTRIBS),o=t.isWebGL2?null:s.get("OES_vertex_array_object"),f=t.isWebGL2||o!==null,d={},m=J(null);let D=m,P=!1;function x(Ze,it,ot,yt,Rt){let Ct=!1;if(f){const Bt=re(yt,ot,it);D!==Bt&&(D=Bt,_(D.object)),Ct=K(Ze,yt,ot,Rt),Ct&&Ie(Ze,yt,ot,Rt)}else{const Bt=it.wireframe===!0;(D.geometry!==yt.id||D.program!==ot.id||D.wireframe!==Bt)&&(D.geometry=yt.id,D.program=ot.id,D.wireframe=Bt,Ct=!0)}Rt!==null&&n.update(Rt,e.ELEMENT_ARRAY_BUFFER),(Ct||P)&&(P=!1,Me(Ze,it,ot,yt),Rt!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Rt).buffer))}function H(){return t.isWebGL2?e.createVertexArray():o.createVertexArrayOES()}function _(Ze){return t.isWebGL2?e.bindVertexArray(Ze):o.bindVertexArrayOES(Ze)}function ne(Ze){return t.isWebGL2?e.deleteVertexArray(Ze):o.deleteVertexArrayOES(Ze)}function re(Ze,it,ot){const yt=ot.wireframe===!0;let Rt=d[Ze.id];Rt===void 0&&(Rt={},d[Ze.id]=Rt);let Ct=Rt[it.id];Ct===void 0&&(Ct={},Rt[it.id]=Ct);let Bt=Ct[yt];return Bt===void 0&&(Bt=J(H()),Ct[yt]=Bt),Bt}function J(Ze){const it=[],ot=[],yt=[];for(let Rt=0;Rt<u;Rt++)it[Rt]=0,ot[Rt]=0,yt[Rt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:it,enabledAttributes:ot,attributeDivisors:yt,object:Ze,attributes:{},index:null}}function K(Ze,it,ot,yt){const Rt=D.attributes,Ct=it.attributes;let Bt=0;const Ut=ot.getAttributes();for(const Ft in Ut)if(Ut[Ft].location>=0){const Gt=Rt[Ft];let en=Ct[Ft];if(en===void 0&&(Ft==="instanceMatrix"&&Ze.instanceMatrix&&(en=Ze.instanceMatrix),Ft==="instanceColor"&&Ze.instanceColor&&(en=Ze.instanceColor)),Gt===void 0||Gt.attribute!==en||en&&Gt.data!==en.data)return!0;Bt++}return D.attributesNum!==Bt||D.index!==yt}function Ie(Ze,it,ot,yt){const Rt={},Ct=it.attributes;let Bt=0;const Ut=ot.getAttributes();for(const Ft in Ut)if(Ut[Ft].location>=0){let Gt=Ct[Ft];Gt===void 0&&(Ft==="instanceMatrix"&&Ze.instanceMatrix&&(Gt=Ze.instanceMatrix),Ft==="instanceColor"&&Ze.instanceColor&&(Gt=Ze.instanceColor));const en={};en.attribute=Gt,Gt&&Gt.data&&(en.data=Gt.data),Rt[Ft]=en,Bt++}D.attributes=Rt,D.attributesNum=Bt,D.index=yt}function ce(){const Ze=D.newAttributes;for(let it=0,ot=Ze.length;it<ot;it++)Ze[it]=0}function ae(Ze){me(Ze,0)}function me(Ze,it){const ot=D.newAttributes,yt=D.enabledAttributes,Rt=D.attributeDivisors;ot[Ze]=1,yt[Ze]===0&&(e.enableVertexAttribArray(Ze),yt[Ze]=1),Rt[Ze]!==it&&((t.isWebGL2?e:s.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](Ze,it),Rt[Ze]=it)}function Ee(){const Ze=D.newAttributes,it=D.enabledAttributes;for(let ot=0,yt=it.length;ot<yt;ot++)it[ot]!==Ze[ot]&&(e.disableVertexAttribArray(ot),it[ot]=0)}function Ae(Ze,it,ot,yt,Rt,Ct,Bt){Bt===!0?e.vertexAttribIPointer(Ze,it,ot,Rt,Ct):e.vertexAttribPointer(Ze,it,ot,yt,Rt,Ct)}function Me(Ze,it,ot,yt){if(t.isWebGL2===!1&&(Ze.isInstancedMesh||yt.isInstancedBufferGeometry)&&s.get("ANGLE_instanced_arrays")===null)return;ce();const Rt=yt.attributes,Ct=ot.getAttributes(),Bt=it.defaultAttributeValues;for(const Ut in Ct){const Ft=Ct[Ut];if(Ft.location>=0){let Nt=Rt[Ut];if(Nt===void 0&&(Ut==="instanceMatrix"&&Ze.instanceMatrix&&(Nt=Ze.instanceMatrix),Ut==="instanceColor"&&Ze.instanceColor&&(Nt=Ze.instanceColor)),Nt!==void 0){const Gt=Nt.normalized,en=Nt.itemSize,Dn=n.get(Nt);if(Dn===void 0)continue;const An=Dn.buffer,En=Dn.type,Gn=Dn.bytesPerElement,Xt=t.isWebGL2===!0&&(En===e.INT||En===e.UNSIGNED_INT||Nt.gpuType===tX);if(Nt.isInterleavedBufferAttribute){const qn=Nt.data,Tt=qn.stride,Gs=Nt.offset;if(qn.isInstancedInterleavedBuffer){for(let Hn=0;Hn<Ft.locationSize;Hn++)me(Ft.location+Hn,qn.meshPerAttribute);Ze.isInstancedMesh!==!0&&yt._maxInstanceCount===void 0&&(yt._maxInstanceCount=qn.meshPerAttribute*qn.count)}else for(let Hn=0;Hn<Ft.locationSize;Hn++)ae(Ft.location+Hn);e.bindBuffer(e.ARRAY_BUFFER,An);for(let Hn=0;Hn<Ft.locationSize;Hn++)Ae(Ft.location+Hn,en/Ft.locationSize,En,Gt,Tt*Gn,(Gs+en/Ft.locationSize*Hn)*Gn,Xt)}else{if(Nt.isInstancedBufferAttribute){for(let qn=0;qn<Ft.locationSize;qn++)me(Ft.location+qn,Nt.meshPerAttribute);Ze.isInstancedMesh!==!0&&yt._maxInstanceCount===void 0&&(yt._maxInstanceCount=Nt.meshPerAttribute*Nt.count)}else for(let qn=0;qn<Ft.locationSize;qn++)ae(Ft.location+qn);e.bindBuffer(e.ARRAY_BUFFER,An);for(let qn=0;qn<Ft.locationSize;qn++)Ae(Ft.location+qn,en/Ft.locationSize,En,Gt,en*Gn,en/Ft.locationSize*qn*Gn,Xt)}}else if(Bt!==void 0){const Gt=Bt[Ut];if(Gt!==void 0)switch(Gt.length){case 2:e.vertexAttrib2fv(Ft.location,Gt);break;case 3:e.vertexAttrib3fv(Ft.location,Gt);break;case 4:e.vertexAttrib4fv(Ft.location,Gt);break;default:e.vertexAttrib1fv(Ft.location,Gt)}}}}Ee()}function we(){Ke();for(const Ze in d){const it=d[Ze];for(const ot in it){const yt=it[ot];for(const Rt in yt)ne(yt[Rt].object),delete yt[Rt];delete it[ot]}delete d[Ze]}}function Te(Ze){if(d[Ze.id]===void 0)return;const it=d[Ze.id];for(const ot in it){const yt=it[ot];for(const Rt in yt)ne(yt[Rt].object),delete yt[Rt];delete it[ot]}delete d[Ze.id]}function je(Ze){for(const it in d){const ot=d[it];if(ot[Ze.id]===void 0)continue;const yt=ot[Ze.id];for(const Rt in yt)ne(yt[Rt].object),delete yt[Rt];delete ot[Ze.id]}}function Ke(){lt(),P=!0,D!==m&&(D=m,_(D.object))}function lt(){m.geometry=null,m.program=null,m.wireframe=!1}return{setup:x,reset:Ke,resetDefaultState:lt,dispose:we,releaseStatesOfGeometry:Te,releaseStatesOfProgram:je,initAttributes:ce,enableAttribute:ae,disableUnusedAttributes:Ee}}function Gue(e,s,n,t){const u=t.isWebGL2;let o;function f(P){o=P}function d(P,x){e.drawArrays(o,P,x),n.update(x,o,1)}function m(P,x,H){if(H===0)return;let _,ne;if(u)_=e,ne="drawArraysInstanced";else if(_=s.get("ANGLE_instanced_arrays"),ne="drawArraysInstancedANGLE",_===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[ne](o,P,x,H),n.update(x,o,H)}function D(P,x,H){if(H===0)return;const _=s.get("WEBGL_multi_draw");if(_===null)for(let ne=0;ne<H;ne++)this.render(P[ne],x[ne]);else{_.multiDrawArraysWEBGL(o,P,0,x,0,H);let ne=0;for(let re=0;re<H;re++)ne+=x[re];n.update(ne,o,1)}}this.setMode=f,this.render=d,this.renderInstances=m,this.renderMultiDraw=D}function _ue(e,s,n){let t;function u(){if(t!==void 0)return t;if(s.has("EXT_texture_filter_anisotropic")===!0){const Ae=s.get("EXT_texture_filter_anisotropic");t=e.getParameter(Ae.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function o(Ae){if(Ae==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";Ae="mediump"}return Ae==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const f=typeof WebGL2RenderingContext<"u"&&e.constructor.name==="WebGL2RenderingContext";let d=n.precision!==void 0?n.precision:"highp";const m=o(d);m!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",m,"instead."),d=m);const D=f||s.has("WEBGL_draw_buffers"),P=n.logarithmicDepthBuffer===!0,x=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),H=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_TEXTURE_SIZE),ne=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),re=e.getParameter(e.MAX_VERTEX_ATTRIBS),J=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),K=e.getParameter(e.MAX_VARYING_VECTORS),Ie=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),ce=H>0,ae=f||s.has("OES_texture_float"),me=ce&&ae,Ee=f?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:f,drawBuffers:D,getMaxAnisotropy:u,getMaxPrecision:o,precision:d,logarithmicDepthBuffer:P,maxTextures:x,maxVertexTextures:H,maxTextureSize:_,maxCubemapSize:ne,maxAttributes:re,maxVertexUniforms:J,maxVaryings:K,maxFragmentUniforms:Ie,vertexTextures:ce,floatFragmentTextures:ae,floatVertexTextures:me,maxSamples:Ee}}function Vue(e){const s=this;let n=null,t=0,u=!1,o=!1;const f=new Q0,d=new gs,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,H){const _=x.length!==0||H||t!==0||u;return u=H,t=x.length,_},this.beginShadows=function(){o=!0,P(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(x,H){n=P(x,H,0)},this.setState=function(x,H,_){const ne=x.clippingPlanes,re=x.clipIntersection,J=x.clipShadows,K=e.get(x);if(!u||ne===null||ne.length===0||o&&!J)o?P(null):D();else{const Ie=o?0:t,ce=Ie*4;let ae=K.clippingState||null;m.value=ae,ae=P(ne,H,ce,_);for(let me=0;me!==ce;++me)ae[me]=n[me];K.clippingState=ae,this.numIntersection=re?this.numPlanes:0,this.numPlanes+=Ie}};function D(){m.value!==n&&(m.value=n,m.needsUpdate=t>0),s.numPlanes=t,s.numIntersection=0}function P(x,H,_,ne){const re=x!==null?x.length:0;let J=null;if(re!==0){if(J=m.value,ne!==!0||J===null){const K=_+re*4,Ie=H.matrixWorldInverse;d.getNormalMatrix(Ie),(J===null||J.length<K)&&(J=new Float32Array(K));for(let ce=0,ae=_;ce!==re;++ce,ae+=4)f.copy(x[ce]).applyMatrix4(Ie,d),f.normal.toArray(J,ae),J[ae+3]=f.constant}m.value=J,m.needsUpdate=!0}return s.numPlanes=re,s.numIntersection=0,J}}function Wue(e){let s=new WeakMap;function n(f,d){return d===aj?f.mapping=j9:d===oj&&(f.mapping=k9),f}function t(f){if(f&&f.isTexture){const d=f.mapping;if(d===aj||d===oj)if(s.has(f)){const m=s.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const D=new vle(m.height/2);return D.fromEquirectangularTexture(e,f),s.set(f,D),f.addEventListener("dispose",u),n(D.texture,f.mapping)}else return null}}return f}function u(f){const d=f.target;d.removeEventListener("dispose",u);const m=s.get(d);m!==void 0&&(s.delete(d),m.dispose())}function o(){s=new WeakMap}return{get:t,dispose:o}}class gG extends mX{constructor(s=-1,n=1,t=1,u=-1,o=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=s,this.right=n,this.top=t,this.bottom=u,this.near=o,this.far=f,this.updateProjectionMatrix()}copy(s,n){return super.copy(s,n),this.left=s.left,this.right=s.right,this.top=s.top,this.bottom=s.bottom,this.near=s.near,this.far=s.far,this.zoom=s.zoom,this.view=s.view===null?null:Object.assign({},s.view),this}setViewOffset(s,n,t,u,o,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=s,this.view.fullHeight=n,this.view.offsetX=t,this.view.offsetY=u,this.view.width=o,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const s=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,u=(this.top+this.bottom)/2;let o=t-s,f=t+s,d=u+n,m=u-n;if(this.view!==null&&this.view.enabled){const D=(this.right-this.left)/this.view.fullWidth/this.zoom,P=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=D*this.view.offsetX,f=o+D*this.view.width,d-=P*this.view.offsetY,m=d-P*this.view.height}this.projectionMatrix.makeOrthographic(o,f,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(s){const n=super.toJSON(s);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const N9=4,SK=[.125,.215,.35,.446,.526,.582],PO=20,nz=new gG,NK=new ps;let sz=null,lz=0,rz=0;const Y8=(1+Math.sqrt(5))/2,OP=1/Y8,gK=[new ze(1,1,1),new ze(-1,1,1),new ze(1,1,-1),new ze(-1,1,-1),new ze(0,Y8,OP),new ze(0,Y8,-OP),new ze(OP,0,Y8),new ze(-OP,0,Y8),new ze(Y8,OP,0),new ze(-Y8,OP,0)];class OK{constructor(s){this._renderer=s,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(s,n=0,t=.1,u=100){sz=this._renderer.getRenderTarget(),lz=this._renderer.getActiveCubeFace(),rz=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(s,t,u,o),n>0&&this._blur(o,0,0,n),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(s,n=null){return this._fromTexture(s,n)}fromCubemap(s,n=null){return this._fromTexture(s,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=CK(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bK(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(s){this._lodMax=Math.floor(Math.log2(s)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let s=0;s<this._lodPlanes.length;s++)this._lodPlanes[s].dispose()}_cleanup(s){this._renderer.setRenderTarget(sz,lz,rz),s.scissorTest=!1,c_(s,0,0,s.width,s.height)}_fromTexture(s,n){s.mapping===j9||s.mapping===k9?this._setSize(s.image.length===0?16:s.image[0].width||s.image[0].image.width):this._setSize(s.image.width/4),sz=this._renderer.getRenderTarget(),lz=this._renderer.getActiveCubeFace(),rz=this._renderer.getActiveMipmapLevel();const t=n||this._allocateTargets();return this._textureToCubeUV(s,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const s=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,t={magFilter:v5,minFilter:v5,generateMipmaps:!1,type:zF,format:tp,colorSpace:uA,depthBuffer:!1},u=LK(s,n,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==s||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=LK(s,n,t);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yue(o)),this._blurMaterial=zue(o,s,n)}return u}_compileMaterial(s){const n=new mn(this._lodPlanes[0],s);this._renderer.compile(n,nz)}_sceneToCubeUV(s,n,t,u){const d=new ew(90,1,n,t),m=[1,-1,1,1,1,1],D=[1,1,1,-1,-1,-1],P=this._renderer,x=P.autoClear,H=P.toneMapping;P.getClearColor(NK),P.toneMapping=sN,P.autoClear=!1;const _=new hN({name:"PMREM.Background",side:YI,depthWrite:!1,depthTest:!1}),ne=new mn(new Pa,_);let re=!1;const J=s.background;J?J.isColor&&(_.color.copy(J),s.background=null,re=!0):(_.color.copy(NK),re=!0);for(let K=0;K<6;K++){const Ie=K%3;Ie===0?(d.up.set(0,m[K],0),d.lookAt(D[K],0,0)):Ie===1?(d.up.set(0,0,m[K]),d.lookAt(0,D[K],0)):(d.up.set(0,m[K],0),d.lookAt(0,0,D[K]));const ce=this._cubeSize;c_(u,Ie*ce,K>2?ce:0,ce,ce),P.setRenderTarget(u),re&&P.render(ne,d),P.render(s,d)}ne.geometry.dispose(),ne.material.dispose(),P.toneMapping=H,P.autoClear=x,s.background=J}_textureToCubeUV(s,n){const t=this._renderer,u=s.mapping===j9||s.mapping===k9;u?(this._cubemapMaterial===null&&(this._cubemapMaterial=CK()),this._cubemapMaterial.uniforms.flipEnvMap.value=s.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bK());const o=u?this._cubemapMaterial:this._equirectMaterial,f=new mn(this._lodPlanes[0],o),d=o.uniforms;d.envMap.value=s;const m=this._cubeSize;c_(n,0,0,3*m,2*m),t.setRenderTarget(n),t.render(f,nz)}_applyPMREM(s){const n=this._renderer,t=n.autoClear;n.autoClear=!1;for(let u=1;u<this._lodPlanes.length;u++){const o=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),f=gK[(u-1)%gK.length];this._blur(s,u-1,u,o,f)}n.autoClear=t}_blur(s,n,t,u,o){const f=this._pingPongRenderTarget;this._halfBlur(s,f,n,t,u,"latitudinal",o),this._halfBlur(f,s,t,t,u,"longitudinal",o)}_halfBlur(s,n,t,u,o,f,d){const m=this._renderer,D=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const P=3,x=new mn(this._lodPlanes[u],D),H=D.uniforms,_=this._sizeLods[t]-1,ne=isFinite(o)?Math.PI/(2*_):2*Math.PI/(2*PO-1),re=o/ne,J=isFinite(o)?1+Math.floor(P*re):PO;J>PO&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${J} samples when the maximum is set to ${PO}`);const K=[];let Ie=0;for(let Ae=0;Ae<PO;++Ae){const Me=Ae/re,we=Math.exp(-Me*Me/2);K.push(we),Ae===0?Ie+=we:Ae<J&&(Ie+=2*we)}for(let Ae=0;Ae<K.length;Ae++)K[Ae]=K[Ae]/Ie;H.envMap.value=s.texture,H.samples.value=J,H.weights.value=K,H.latitudinal.value=f==="latitudinal",d&&(H.poleAxis.value=d);const{_lodMax:ce}=this;H.dTheta.value=ne,H.mipInt.value=ce-t;const ae=this._sizeLods[u],me=3*ae*(u>ce-N9?u-ce+N9:0),Ee=4*(this._cubeSize-ae);c_(n,me,Ee,3*ae,2*ae),m.setRenderTarget(n),m.render(x,nz)}}function Yue(e){const s=[],n=[],t=[];let u=e;const o=e-N9+1+SK.length;for(let f=0;f<o;f++){const d=Math.pow(2,u);n.push(d);let m=1/d;f>e-N9?m=SK[f-e+N9-1]:f===0&&(m=0),t.push(m);const D=1/(d-2),P=-D,x=1+D,H=[P,P,x,P,x,x,P,P,x,x,P,x],_=6,ne=6,re=3,J=2,K=1,Ie=new Float32Array(re*ne*_),ce=new Float32Array(J*ne*_),ae=new Float32Array(K*ne*_);for(let Ee=0;Ee<_;Ee++){const Ae=Ee%3*2/3-1,Me=Ee>2?0:-1,we=[Ae,Me,0,Ae+2/3,Me,0,Ae+2/3,Me+1,0,Ae,Me,0,Ae+2/3,Me+1,0,Ae,Me+1,0];Ie.set(we,re*ne*Ee),ce.set(H,J*ne*Ee);const Te=[Ee,Ee,Ee,Ee,Ee,Ee];ae.set(Te,K*ne*Ee)}const me=new Mi;me.setAttribute("position",new Ea(Ie,re)),me.setAttribute("uv",new Ea(ce,J)),me.setAttribute("faceIndex",new Ea(ae,K)),s.push(me),u>N9&&u--}return{lodPlanes:s,sizeLods:n,sigmas:t}}function LK(e,s,n){const t=new aA(e,s,n);return t.texture.mapping=gW,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function c_(e,s,n,t,u){e.viewport.set(s,n,t,u),e.scissor.set(s,n,t,u)}function zue(e,s,n){const t=new Float32Array(PO),u=new ze(0,1,0);return new fN({name:"SphericalGaussianBlur",defines:{n:PO,CUBEUV_TEXEL_WIDTH:1/s,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Hk(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:nN,depthTest:!1,depthWrite:!1})}function bK(){return new fN({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hk(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:nN,depthTest:!1,depthWrite:!1})}function CK(){return new fN({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hk(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nN,depthTest:!1,depthWrite:!1})}function Hk(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jue(e){let s=new WeakMap,n=null;function t(d){if(d&&d.isTexture){const m=d.mapping,D=m===aj||m===oj,P=m===j9||m===k9;if(D||P)if(d.isRenderTargetTexture&&d.needsPMREMUpdate===!0){d.needsPMREMUpdate=!1;let x=s.get(d);return n===null&&(n=new OK(e)),x=D?n.fromEquirectangular(d,x):n.fromCubemap(d,x),s.set(d,x),x.texture}else{if(s.has(d))return s.get(d).texture;{const x=d.image;if(D&&x&&x.height>0||P&&x&&u(x)){n===null&&(n=new OK(e));const H=D?n.fromEquirectangular(d):n.fromCubemap(d);return s.set(d,H),d.addEventListener("dispose",o),H.texture}else return null}}}return d}function u(d){let m=0;const D=6;for(let P=0;P<D;P++)d[P]!==void 0&&m++;return m===D}function o(d){const m=d.target;m.removeEventListener("dispose",o);const D=s.get(m);D!==void 0&&(s.delete(m),D.dispose())}function f(){s=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:t,dispose:f}}function kue(e){const s={};function n(t){if(s[t]!==void 0)return s[t];let u;switch(t){case"WEBGL_depth_texture":u=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":u=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":u=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":u=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:u=e.getExtension(t)}return s[t]=u,u}return{has:function(t){return n(t)!==null},init:function(t){t.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(t){const u=n(t);return u===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),u}}}function que(e,s,n,t){const u={},o=new WeakMap;function f(x){const H=x.target;H.index!==null&&s.remove(H.index);for(const ne in H.attributes)s.remove(H.attributes[ne]);for(const ne in H.morphAttributes){const re=H.morphAttributes[ne];for(let J=0,K=re.length;J<K;J++)s.remove(re[J])}H.removeEventListener("dispose",f),delete u[H.id];const _=o.get(H);_&&(s.remove(_),o.delete(H)),t.releaseStatesOfGeometry(H),H.isInstancedBufferGeometry===!0&&delete H._maxInstanceCount,n.memory.geometries--}function d(x,H){return u[H.id]===!0||(H.addEventListener("dispose",f),u[H.id]=!0,n.memory.geometries++),H}function m(x){const H=x.attributes;for(const ne in H)s.update(H[ne],e.ARRAY_BUFFER);const _=x.morphAttributes;for(const ne in _){const re=_[ne];for(let J=0,K=re.length;J<K;J++)s.update(re[J],e.ARRAY_BUFFER)}}function D(x){const H=[],_=x.index,ne=x.attributes.position;let re=0;if(_!==null){const Ie=_.array;re=_.version;for(let ce=0,ae=Ie.length;ce<ae;ce+=3){const me=Ie[ce+0],Ee=Ie[ce+1],Ae=Ie[ce+2];H.push(me,Ee,Ee,Ae,Ae,me)}}else if(ne!==void 0){const Ie=ne.array;re=ne.version;for(let ce=0,ae=Ie.length/3-1;ce<ae;ce+=3){const me=ce+0,Ee=ce+1,Ae=ce+2;H.push(me,Ee,Ee,Ae,Ae,me)}}else return;const J=new(fX(H)?pX:EX)(H,1);J.version=re;const K=o.get(x);K&&s.remove(K),o.set(x,J)}function P(x){const H=o.get(x);if(H){const _=x.index;_!==null&&H.version<_.version&&D(x)}else D(x);return o.get(x)}return{get:d,update:m,getWireframeAttribute:P}}function $ue(e,s,n,t){const u=t.isWebGL2;let o;function f(_){o=_}let d,m;function D(_){d=_.type,m=_.bytesPerElement}function P(_,ne){e.drawElements(o,ne,d,_*m),n.update(ne,o,1)}function x(_,ne,re){if(re===0)return;let J,K;if(u)J=e,K="drawElementsInstanced";else if(J=s.get("ANGLE_instanced_arrays"),K="drawElementsInstancedANGLE",J===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}J[K](o,ne,d,_*m,re),n.update(ne,o,re)}function H(_,ne,re){if(re===0)return;const J=s.get("WEBGL_multi_draw");if(J===null)for(let K=0;K<re;K++)this.render(_[K]/m,ne[K]);else{J.multiDrawElementsWEBGL(o,ne,0,d,_,0,re);let K=0;for(let Ie=0;Ie<re;Ie++)K+=ne[Ie];n.update(K,o,1)}}this.setMode=f,this.setIndex=D,this.render=P,this.renderInstances=x,this.renderMultiDraw=H}function Kue(e){const s={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function t(o,f,d){switch(n.calls++,f){case e.TRIANGLES:n.triangles+=d*(o/3);break;case e.LINES:n.lines+=d*(o/2);break;case e.LINE_STRIP:n.lines+=d*(o-1);break;case e.LINE_LOOP:n.lines+=d*o;break;case e.POINTS:n.points+=d*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function u(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:s,render:n,programs:null,autoReset:!0,reset:u,update:t}}function Que(e,s){return e[0]-s[0]}function Zue(e,s){return Math.abs(s[1])-Math.abs(e[1])}function Jue(e,s,n){const t={},u=new Float32Array(8),o=new WeakMap,f=new Uc,d=[];for(let D=0;D<8;D++)d[D]=[D,0];function m(D,P,x){const H=D.morphTargetInfluences;if(s.isWebGL2===!0){const _=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,ne=_!==void 0?_.length:0;let re=o.get(P);if(re===void 0||re.count!==ne){let Ze=function(){Ke.dispose(),o.delete(P),P.removeEventListener("dispose",Ze)};re!==void 0&&re.texture.dispose();const Ie=P.morphAttributes.position!==void 0,ce=P.morphAttributes.normal!==void 0,ae=P.morphAttributes.color!==void 0,me=P.morphAttributes.position||[],Ee=P.morphAttributes.normal||[],Ae=P.morphAttributes.color||[];let Me=0;Ie===!0&&(Me=1),ce===!0&&(Me=2),ae===!0&&(Me=3);let we=P.attributes.position.count*Me,Te=1;we>s.maxTextureSize&&(Te=Math.ceil(we/s.maxTextureSize),we=s.maxTextureSize);const je=new Float32Array(we*Te*4*ne),Ke=new yX(je,we,Te,ne);Ke.type=QS,Ke.needsUpdate=!0;const lt=Me*4;for(let it=0;it<ne;it++){const ot=me[it],yt=Ee[it],Rt=Ae[it],Ct=we*Te*4*it;for(let Bt=0;Bt<ot.count;Bt++){const Ut=Bt*lt;Ie===!0&&(f.fromBufferAttribute(ot,Bt),je[Ct+Ut+0]=f.x,je[Ct+Ut+1]=f.y,je[Ct+Ut+2]=f.z,je[Ct+Ut+3]=0),ce===!0&&(f.fromBufferAttribute(yt,Bt),je[Ct+Ut+4]=f.x,je[Ct+Ut+5]=f.y,je[Ct+Ut+6]=f.z,je[Ct+Ut+7]=0),ae===!0&&(f.fromBufferAttribute(Rt,Bt),je[Ct+Ut+8]=f.x,je[Ct+Ut+9]=f.y,je[Ct+Ut+10]=f.z,je[Ct+Ut+11]=Rt.itemSize===4?f.w:1)}}re={count:ne,texture:Ke,size:new us(we,Te)},o.set(P,re),P.addEventListener("dispose",Ze)}let J=0;for(let Ie=0;Ie<H.length;Ie++)J+=H[Ie];const K=P.morphTargetsRelative?1:1-J;x.getUniforms().setValue(e,"morphTargetBaseInfluence",K),x.getUniforms().setValue(e,"morphTargetInfluences",H),x.getUniforms().setValue(e,"morphTargetsTexture",re.texture,n),x.getUniforms().setValue(e,"morphTargetsTextureSize",re.size)}else{const _=H===void 0?0:H.length;let ne=t[P.id];if(ne===void 0||ne.length!==_){ne=[];for(let ce=0;ce<_;ce++)ne[ce]=[ce,0];t[P.id]=ne}for(let ce=0;ce<_;ce++){const ae=ne[ce];ae[0]=ce,ae[1]=H[ce]}ne.sort(Zue);for(let ce=0;ce<8;ce++)ce<_&&ne[ce][1]?(d[ce][0]=ne[ce][0],d[ce][1]=ne[ce][1]):(d[ce][0]=Number.MAX_SAFE_INTEGER,d[ce][1]=0);d.sort(Que);const re=P.morphAttributes.position,J=P.morphAttributes.normal;let K=0;for(let ce=0;ce<8;ce++){const ae=d[ce],me=ae[0],Ee=ae[1];me!==Number.MAX_SAFE_INTEGER&&Ee?(re&&P.getAttribute("morphTarget"+ce)!==re[me]&&P.setAttribute("morphTarget"+ce,re[me]),J&&P.getAttribute("morphNormal"+ce)!==J[me]&&P.setAttribute("morphNormal"+ce,J[me]),u[ce]=Ee,K+=Ee):(re&&P.hasAttribute("morphTarget"+ce)===!0&&P.deleteAttribute("morphTarget"+ce),J&&P.hasAttribute("morphNormal"+ce)===!0&&P.deleteAttribute("morphNormal"+ce),u[ce]=0)}const Ie=P.morphTargetsRelative?1:1-K;x.getUniforms().setValue(e,"morphTargetBaseInfluence",Ie),x.getUniforms().setValue(e,"morphTargetInfluences",u)}}return{update:m}}function Xue(e,s,n,t){let u=new WeakMap;function o(m){const D=t.render.frame,P=m.geometry,x=s.get(m,P);if(u.get(x)!==D&&(s.update(x),u.set(x,D)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),u.get(m)!==D&&(n.update(m.instanceMatrix,e.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,e.ARRAY_BUFFER),u.set(m,D))),m.isSkinnedMesh){const H=m.skeleton;u.get(H)!==D&&(H.update(),u.set(H,D))}return x}function f(){u=new WeakMap}function d(m){const D=m.target;D.removeEventListener("dispose",d),n.remove(D.instanceMatrix),D.instanceColor!==null&&n.remove(D.instanceColor)}return{update:o,dispose:f}}class DX extends e4{constructor(s,n,t,u,o,f,d,m,D,P){if(P=P!==void 0?P:HO,P!==HO&&P!==q9)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&P===HO&&(t=KS),t===void 0&&P===q9&&(t=BO),super(null,u,o,f,d,m,P,t,D),this.isDepthTexture=!0,this.image={width:s,height:n},this.magFilter=d!==void 0?d:Rd,this.minFilter=m!==void 0?m:Rd,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(s){return super.copy(s),this.compareFunction=s.compareFunction,this}toJSON(s){const n=super.toJSON(s);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const SX=new e4,NX=new DX(1,1);NX.compareFunction=cX;const gX=new yX,OX=new Hle,LX=new RX,PK=[],MK=[],xK=new Float32Array(16),UK=new Float32Array(9),BK=new Float32Array(4);function EM(e,s,n){const t=e[0];if(t<=0||t>0)return e;const u=s*n;let o=PK[u];if(o===void 0&&(o=new Float32Array(u),PK[u]=o),s!==0){t.toArray(o,0);for(let f=1,d=0;f!==s;++f)d+=n,e[f].toArray(o,d)}return o}function Bc(e,s){if(e.length!==s.length)return!1;for(let n=0,t=e.length;n<t;n++)if(e[n]!==s[n])return!1;return!0}function Hc(e,s){for(let n=0,t=s.length;n<t;n++)e[n]=s[n]}function LW(e,s){let n=MK[s];n===void 0&&(n=new Int32Array(s),MK[s]=n);for(let t=0;t!==s;++t)n[t]=e.allocateTextureUnit();return n}function vue(e,s){const n=this.cache;n[0]!==s&&(e.uniform1f(this.addr,s),n[0]=s)}function eae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y)&&(e.uniform2f(this.addr,s.x,s.y),n[0]=s.x,n[1]=s.y);else{if(Bc(n,s))return;e.uniform2fv(this.addr,s),Hc(n,s)}}function tae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y||n[2]!==s.z)&&(e.uniform3f(this.addr,s.x,s.y,s.z),n[0]=s.x,n[1]=s.y,n[2]=s.z);else if(s.r!==void 0)(n[0]!==s.r||n[1]!==s.g||n[2]!==s.b)&&(e.uniform3f(this.addr,s.r,s.g,s.b),n[0]=s.r,n[1]=s.g,n[2]=s.b);else{if(Bc(n,s))return;e.uniform3fv(this.addr,s),Hc(n,s)}}function nae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y||n[2]!==s.z||n[3]!==s.w)&&(e.uniform4f(this.addr,s.x,s.y,s.z,s.w),n[0]=s.x,n[1]=s.y,n[2]=s.z,n[3]=s.w);else{if(Bc(n,s))return;e.uniform4fv(this.addr,s),Hc(n,s)}}function sae(e,s){const n=this.cache,t=s.elements;if(t===void 0){if(Bc(n,s))return;e.uniformMatrix2fv(this.addr,!1,s),Hc(n,s)}else{if(Bc(n,t))return;BK.set(t),e.uniformMatrix2fv(this.addr,!1,BK),Hc(n,t)}}function lae(e,s){const n=this.cache,t=s.elements;if(t===void 0){if(Bc(n,s))return;e.uniformMatrix3fv(this.addr,!1,s),Hc(n,s)}else{if(Bc(n,t))return;UK.set(t),e.uniformMatrix3fv(this.addr,!1,UK),Hc(n,t)}}function rae(e,s){const n=this.cache,t=s.elements;if(t===void 0){if(Bc(n,s))return;e.uniformMatrix4fv(this.addr,!1,s),Hc(n,s)}else{if(Bc(n,t))return;xK.set(t),e.uniformMatrix4fv(this.addr,!1,xK),Hc(n,t)}}function iae(e,s){const n=this.cache;n[0]!==s&&(e.uniform1i(this.addr,s),n[0]=s)}function uae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y)&&(e.uniform2i(this.addr,s.x,s.y),n[0]=s.x,n[1]=s.y);else{if(Bc(n,s))return;e.uniform2iv(this.addr,s),Hc(n,s)}}function aae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y||n[2]!==s.z)&&(e.uniform3i(this.addr,s.x,s.y,s.z),n[0]=s.x,n[1]=s.y,n[2]=s.z);else{if(Bc(n,s))return;e.uniform3iv(this.addr,s),Hc(n,s)}}function oae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y||n[2]!==s.z||n[3]!==s.w)&&(e.uniform4i(this.addr,s.x,s.y,s.z,s.w),n[0]=s.x,n[1]=s.y,n[2]=s.z,n[3]=s.w);else{if(Bc(n,s))return;e.uniform4iv(this.addr,s),Hc(n,s)}}function cae(e,s){const n=this.cache;n[0]!==s&&(e.uniform1ui(this.addr,s),n[0]=s)}function hae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y)&&(e.uniform2ui(this.addr,s.x,s.y),n[0]=s.x,n[1]=s.y);else{if(Bc(n,s))return;e.uniform2uiv(this.addr,s),Hc(n,s)}}function fae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y||n[2]!==s.z)&&(e.uniform3ui(this.addr,s.x,s.y,s.z),n[0]=s.x,n[1]=s.y,n[2]=s.z);else{if(Bc(n,s))return;e.uniform3uiv(this.addr,s),Hc(n,s)}}function dae(e,s){const n=this.cache;if(s.x!==void 0)(n[0]!==s.x||n[1]!==s.y||n[2]!==s.z||n[3]!==s.w)&&(e.uniform4ui(this.addr,s.x,s.y,s.z,s.w),n[0]=s.x,n[1]=s.y,n[2]=s.z,n[3]=s.w);else{if(Bc(n,s))return;e.uniform4uiv(this.addr,s),Hc(n,s)}}function Iae(e,s,n){const t=this.cache,u=n.allocateTextureUnit();t[0]!==u&&(e.uniform1i(this.addr,u),t[0]=u);const o=this.type===e.SAMPLER_2D_SHADOW?NX:SX;n.setTexture2D(s||o,u)}function yae(e,s,n){const t=this.cache,u=n.allocateTextureUnit();t[0]!==u&&(e.uniform1i(this.addr,u),t[0]=u),n.setTexture3D(s||OX,u)}function wae(e,s,n){const t=this.cache,u=n.allocateTextureUnit();t[0]!==u&&(e.uniform1i(this.addr,u),t[0]=u),n.setTextureCube(s||LX,u)}function Eae(e,s,n){const t=this.cache,u=n.allocateTextureUnit();t[0]!==u&&(e.uniform1i(this.addr,u),t[0]=u),n.setTexture2DArray(s||gX,u)}function pae(e){switch(e){case 5126:return vue;case 35664:return eae;case 35665:return tae;case 35666:return nae;case 35674:return sae;case 35675:return lae;case 35676:return rae;case 5124:case 35670:return iae;case 35667:case 35671:return uae;case 35668:case 35672:return aae;case 35669:case 35673:return oae;case 5125:return cae;case 36294:return hae;case 36295:return fae;case 36296:return dae;case 35678:case 36198:case 36298:case 36306:case 35682:return Iae;case 35679:case 36299:case 36307:return yae;case 35680:case 36300:case 36308:case 36293:return wae;case 36289:case 36303:case 36311:case 36292:return Eae}}function Tae(e,s){e.uniform1fv(this.addr,s)}function mae(e,s){const n=EM(s,this.size,2);e.uniform2fv(this.addr,n)}function Rae(e,s){const n=EM(s,this.size,3);e.uniform3fv(this.addr,n)}function Aae(e,s){const n=EM(s,this.size,4);e.uniform4fv(this.addr,n)}function Dae(e,s){const n=EM(s,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Sae(e,s){const n=EM(s,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Nae(e,s){const n=EM(s,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function gae(e,s){e.uniform1iv(this.addr,s)}function Oae(e,s){e.uniform2iv(this.addr,s)}function Lae(e,s){e.uniform3iv(this.addr,s)}function bae(e,s){e.uniform4iv(this.addr,s)}function Cae(e,s){e.uniform1uiv(this.addr,s)}function Pae(e,s){e.uniform2uiv(this.addr,s)}function Mae(e,s){e.uniform3uiv(this.addr,s)}function xae(e,s){e.uniform4uiv(this.addr,s)}function Uae(e,s,n){const t=this.cache,u=s.length,o=LW(n,u);Bc(t,o)||(e.uniform1iv(this.addr,o),Hc(t,o));for(let f=0;f!==u;++f)n.setTexture2D(s[f]||SX,o[f])}function Bae(e,s,n){const t=this.cache,u=s.length,o=LW(n,u);Bc(t,o)||(e.uniform1iv(this.addr,o),Hc(t,o));for(let f=0;f!==u;++f)n.setTexture3D(s[f]||OX,o[f])}function Hae(e,s,n){const t=this.cache,u=s.length,o=LW(n,u);Bc(t,o)||(e.uniform1iv(this.addr,o),Hc(t,o));for(let f=0;f!==u;++f)n.setTextureCube(s[f]||LX,o[f])}function Fae(e,s,n){const t=this.cache,u=s.length,o=LW(n,u);Bc(t,o)||(e.uniform1iv(this.addr,o),Hc(t,o));for(let f=0;f!==u;++f)n.setTexture2DArray(s[f]||gX,o[f])}function Gae(e){switch(e){case 5126:return Tae;case 35664:return mae;case 35665:return Rae;case 35666:return Aae;case 35674:return Dae;case 35675:return Sae;case 35676:return Nae;case 5124:case 35670:return gae;case 35667:case 35671:return Oae;case 35668:case 35672:return Lae;case 35669:case 35673:return bae;case 5125:return Cae;case 36294:return Pae;case 36295:return Mae;case 36296:return xae;case 35678:case 36198:case 36298:case 36306:case 35682:return Uae;case 35679:case 36299:case 36307:return Bae;case 35680:case 36300:case 36308:case 36293:return Hae;case 36289:case 36303:case 36311:case 36292:return Fae}}class _ae{constructor(s,n,t){this.id=s,this.addr=t,this.cache=[],this.type=n.type,this.setValue=pae(n.type)}}class Vae{constructor(s,n,t){this.id=s,this.addr=t,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Gae(n.type)}}class Wae{constructor(s){this.id=s,this.seq=[],this.map={}}setValue(s,n,t){const u=this.seq;for(let o=0,f=u.length;o!==f;++o){const d=u[o];d.setValue(s,n[d.id],t)}}}const iz=/(\w+)(\])?(\[|\.)?/g;function HK(e,s){e.seq.push(s),e.map[s.id]=s}function Yae(e,s,n){const t=e.name,u=t.length;for(iz.lastIndex=0;;){const o=iz.exec(t),f=iz.lastIndex;let d=o[1];const m=o[2]==="]",D=o[3];if(m&&(d=d|0),D===void 0||D==="["&&f+2===u){HK(n,D===void 0?new _ae(d,e,s):new Vae(d,e,s));break}else{let x=n.map[d];x===void 0&&(x=new Wae(d),HK(n,x)),n=x}}}class aV{constructor(s,n){this.seq=[],this.map={};const t=s.getProgramParameter(n,s.ACTIVE_UNIFORMS);for(let u=0;u<t;++u){const o=s.getActiveUniform(n,u),f=s.getUniformLocation(n,o.name);Yae(o,f,this)}}setValue(s,n,t,u){const o=this.map[n];o!==void 0&&o.setValue(s,t,u)}setOptional(s,n,t){const u=n[t];u!==void 0&&this.setValue(s,t,u)}static upload(s,n,t,u){for(let o=0,f=n.length;o!==f;++o){const d=n[o],m=t[d.id];m.needsUpdate!==!1&&d.setValue(s,m.value,u)}}static seqWithValue(s,n){const t=[];for(let u=0,o=s.length;u!==o;++u){const f=s[u];f.id in n&&t.push(f)}return t}}function FK(e,s,n){const t=e.createShader(s);return e.shaderSource(t,n),e.compileShader(t),t}const zae=37297;let jae=0;function kae(e,s){const n=e.split(`
`),t=[],u=Math.max(s-6,0),o=Math.min(s+6,n.length);for(let f=u;f<o;f++){const d=f+1;t.push(`${d===s?">":" "} ${d}: ${n[f]}`)}return t.join(`
`)}function qae(e){const s=Wl.getPrimaries(Wl.workingColorSpace),n=Wl.getPrimaries(e);let t;switch(s===n?t="":s===rW&&n===lW?t="LinearDisplayP3ToLinearSRGB":s===lW&&n===rW&&(t="LinearSRGBToLinearDisplayP3"),e){case uA:case OW:return[t,"LinearTransferOETF"];case Ad:case Mk:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),[t,"LinearTransferOETF"]}}function GK(e,s,n){const t=e.getShaderParameter(s,e.COMPILE_STATUS),u=e.getShaderInfoLog(s).trim();if(t&&u==="")return"";const o=/ERROR: 0:(\d+)/.exec(u);if(o){const f=parseInt(o[1]);return n.toUpperCase()+`

`+u+`

`+kae(e.getShaderSource(s),f)}else return u}function $ae(e,s){const n=qae(s);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Kae(e,s){let n;switch(s){case qse:n="Linear";break;case $se:n="Reinhard";break;case Kse:n="OptimizedCineon";break;case Qse:n="ACESFilmic";break;case Jse:n="AgX";break;case Zse:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",s),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Qae(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(g9).join(`
`)}function Zae(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(g9).join(`
`)}function Jae(e){const s=[];for(const n in e){const t=e[n];t!==!1&&s.push("#define "+n+" "+t)}return s.join(`
`)}function Xae(e,s){const n={},t=e.getProgramParameter(s,e.ACTIVE_ATTRIBUTES);for(let u=0;u<t;u++){const o=e.getActiveAttrib(s,u),f=o.name;let d=1;o.type===e.FLOAT_MAT2&&(d=2),o.type===e.FLOAT_MAT3&&(d=3),o.type===e.FLOAT_MAT4&&(d=4),n[f]={type:o.type,location:e.getAttribLocation(s,f),locationSize:d}}return n}function g9(e){return e!==""}function _K(e,s){const n=s.numSpotLightShadows+s.numSpotLightMaps-s.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,s.numDirLights).replace(/NUM_SPOT_LIGHTS/g,s.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,s.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,s.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,s.numPointLights).replace(/NUM_HEMI_LIGHTS/g,s.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,s.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,s.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,s.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,s.numPointLightShadows)}function VK(e,s){return e.replace(/NUM_CLIPPING_PLANES/g,s.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,s.numClippingPlanes-s.numClipIntersection)}const vae=/^[ \t]*#include +<([\w\d./]+)>/gm;function yj(e){return e.replace(vae,toe)}const eoe=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function toe(e,s){let n=Vs[s];if(n===void 0){const t=eoe.get(s);if(t!==void 0)n=Vs[t],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',s,t);else throw new Error("Can not resolve #include <"+s+">")}return yj(n)}const noe=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function WK(e){return e.replace(noe,soe)}function soe(e,s,n,t){let u="";for(let o=parseInt(s);o<parseInt(n);o++)u+=t.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return u}function YK(e){let s="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?s+=`
#define HIGH_PRECISION`:e.precision==="mediump"?s+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(s+=`
#define LOW_PRECISION`),s}function loe(e){let s="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===vJ?s="SHADOWMAP_TYPE_PCF":e.shadowMapType===mse?s="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===W6&&(s="SHADOWMAP_TYPE_VSM"),s}function roe(e){let s="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case j9:case k9:s="ENVMAP_TYPE_CUBE";break;case gW:s="ENVMAP_TYPE_CUBE_UV";break}return s}function ioe(e){let s="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case k9:s="ENVMAP_MODE_REFRACTION";break}return s}function uoe(e){let s="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Ck:s="ENVMAP_BLENDING_MULTIPLY";break;case jse:s="ENVMAP_BLENDING_MIX";break;case kse:s="ENVMAP_BLENDING_ADD";break}return s}function aoe(e){const s=e.envMapCubeUVHeight;if(s===null)return null;const n=Math.log2(s)-2,t=1/s;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:t,maxMip:n}}function ooe(e,s,n,t){const u=e.getContext(),o=n.defines;let f=n.vertexShader,d=n.fragmentShader;const m=loe(n),D=roe(n),P=ioe(n),x=uoe(n),H=aoe(n),_=n.isWebGL2?"":Qae(n),ne=Zae(n),re=Jae(o),J=u.createProgram();let K,Ie,ce=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(K=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,re].filter(g9).join(`
`),K.length>0&&(K+=`
`),Ie=[_,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,re].filter(g9).join(`
`),Ie.length>0&&(Ie+=`
`)):(K=[YK(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,re,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+P:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(g9).join(`
`),Ie=[_,YK(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,re,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+D:"",n.envMap?"#define "+P:"",n.envMap?"#define "+x:"",H?"#define CUBEUV_TEXEL_WIDTH "+H.texelWidth:"",H?"#define CUBEUV_TEXEL_HEIGHT "+H.texelHeight:"",H?"#define CUBEUV_MAX_MIP "+H.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==sN?"#define TONE_MAPPING":"",n.toneMapping!==sN?Vs.tonemapping_pars_fragment:"",n.toneMapping!==sN?Kae("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Vs.colorspace_pars_fragment,$ae("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(g9).join(`
`)),f=yj(f),f=_K(f,n),f=VK(f,n),d=yj(d),d=_K(d,n),d=VK(d,n),f=WK(f),d=WK(d),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(ce=`#version 300 es
`,K=[ne,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+K,Ie=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===iK?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===iK?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+Ie);const ae=ce+K+f,me=ce+Ie+d,Ee=FK(u,u.VERTEX_SHADER,ae),Ae=FK(u,u.FRAGMENT_SHADER,me);u.attachShader(J,Ee),u.attachShader(J,Ae),n.index0AttributeName!==void 0?u.bindAttribLocation(J,0,n.index0AttributeName):n.morphTargets===!0&&u.bindAttribLocation(J,0,"position"),u.linkProgram(J);function Me(Ke){if(e.debug.checkShaderErrors){const lt=u.getProgramInfoLog(J).trim(),Ze=u.getShaderInfoLog(Ee).trim(),it=u.getShaderInfoLog(Ae).trim();let ot=!0,yt=!0;if(u.getProgramParameter(J,u.LINK_STATUS)===!1)if(ot=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(u,J,Ee,Ae);else{const Rt=GK(u,Ee,"vertex"),Ct=GK(u,Ae,"fragment");console.error("THREE.WebGLProgram: Shader Error "+u.getError()+" - VALIDATE_STATUS "+u.getProgramParameter(J,u.VALIDATE_STATUS)+`

Program Info Log: `+lt+`
`+Rt+`
`+Ct)}else lt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",lt):(Ze===""||it==="")&&(yt=!1);yt&&(Ke.diagnostics={runnable:ot,programLog:lt,vertexShader:{log:Ze,prefix:K},fragmentShader:{log:it,prefix:Ie}})}u.deleteShader(Ee),u.deleteShader(Ae),we=new aV(u,J),Te=Xae(u,J)}let we;this.getUniforms=function(){return we===void 0&&Me(this),we};let Te;this.getAttributes=function(){return Te===void 0&&Me(this),Te};let je=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return je===!1&&(je=u.getProgramParameter(J,zae)),je},this.destroy=function(){t.releaseStatesOfProgram(this),u.deleteProgram(J),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jae++,this.cacheKey=s,this.usedTimes=1,this.program=J,this.vertexShader=Ee,this.fragmentShader=Ae,this}let coe=0;class hoe{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(s){const n=s.vertexShader,t=s.fragmentShader,u=this._getShaderStage(n),o=this._getShaderStage(t),f=this._getShaderCacheForMaterial(s);return f.has(u)===!1&&(f.add(u),u.usedTimes++),f.has(o)===!1&&(f.add(o),o.usedTimes++),this}remove(s){const n=this.materialCache.get(s);for(const t of n)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(s),this}getVertexShaderID(s){return this._getShaderStage(s.vertexShader).id}getFragmentShaderID(s){return this._getShaderStage(s.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(s){const n=this.materialCache;let t=n.get(s);return t===void 0&&(t=new Set,n.set(s,t)),t}_getShaderStage(s){const n=this.shaderCache;let t=n.get(s);return t===void 0&&(t=new foe(s),n.set(s,t)),t}}class foe{constructor(s){this.id=coe++,this.code=s,this.usedTimes=0}}function doe(e,s,n,t,u,o,f){const d=new Uk,m=new hoe,D=[],P=u.isWebGL2,x=u.logarithmicDepthBuffer,H=u.vertexTextures;let _=u.precision;const ne={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function re(we){return we===0?"uv":`uv${we}`}function J(we,Te,je,Ke,lt){const Ze=Ke.fog,it=lt.geometry,ot=we.isMeshStandardMaterial?Ke.environment:null,yt=(we.isMeshStandardMaterial?n:s).get(we.envMap||ot),Rt=yt&&yt.mapping===gW?yt.image.height:null,Ct=ne[we.type];we.precision!==null&&(_=u.getMaxPrecision(we.precision),_!==we.precision&&console.warn("THREE.WebGLProgram.getParameters:",we.precision,"not supported, using",_,"instead."));const Bt=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,Ut=Bt!==void 0?Bt.length:0;let Ft=0;it.morphAttributes.position!==void 0&&(Ft=1),it.morphAttributes.normal!==void 0&&(Ft=2),it.morphAttributes.color!==void 0&&(Ft=3);let Nt,Gt,en,Dn;if(Ct){const yl=tm[Ct];Nt=yl.vertexShader,Gt=yl.fragmentShader}else Nt=we.vertexShader,Gt=we.fragmentShader,m.update(we),en=m.getVertexShaderID(we),Dn=m.getFragmentShaderID(we);const An=e.getRenderTarget(),En=lt.isInstancedMesh===!0,Gn=lt.isBatchedMesh===!0,Xt=!!we.map,qn=!!we.matcap,Tt=!!yt,Gs=!!we.aoMap,Hn=!!we.lightMap,Wn=!!we.bumpMap,pn=!!we.normalMap,Ps=!!we.displacementMap,fs=!!we.emissiveMap,$e=!!we.metalnessMap,ke=!!we.roughnessMap,gt=we.anisotropy>0,Qt=we.clearcoat>0,$t=we.iridescence>0,jt=we.sheen>0,Pn=we.transmission>0,dn=gt&&!!we.anisotropyMap,Tn=Qt&&!!we.clearcoatMap,_n=Qt&&!!we.clearcoatNormalMap,zn=Qt&&!!we.clearcoatRoughnessMap,Wt=$t&&!!we.iridescenceMap,Ms=$t&&!!we.iridescenceThicknessMap,ss=jt&&!!we.sheenColorMap,$n=jt&&!!we.sheenRoughnessMap,Un=!!we.specularMap,gn=!!we.specularColorMap,ls=!!we.specularIntensityMap,Ws=Pn&&!!we.transmissionMap,yn=Pn&&!!we.thicknessMap,Sn=!!we.gradientMap,nn=!!we.alphaMap,ct=we.alphaTest>0,Zt=!!we.alphaHash,rn=!!we.extensions,un=!!it.attributes.uv1,jn=!!it.attributes.uv2,On=!!it.attributes.uv3;let nl=sN;return we.toneMapped&&(An===null||An.isXRRenderTarget===!0)&&(nl=e.toneMapping),{isWebGL2:P,shaderID:Ct,shaderType:we.type,shaderName:we.name,vertexShader:Nt,fragmentShader:Gt,defines:we.defines,customVertexShaderID:en,customFragmentShaderID:Dn,isRawShaderMaterial:we.isRawShaderMaterial===!0,glslVersion:we.glslVersion,precision:_,batching:Gn,instancing:En,instancingColor:En&&lt.instanceColor!==null,supportsVertexTextures:H,outputColorSpace:An===null?e.outputColorSpace:An.isXRRenderTarget===!0?An.texture.colorSpace:uA,map:Xt,matcap:qn,envMap:Tt,envMapMode:Tt&&yt.mapping,envMapCubeUVHeight:Rt,aoMap:Gs,lightMap:Hn,bumpMap:Wn,normalMap:pn,displacementMap:H&&Ps,emissiveMap:fs,normalMapObjectSpace:pn&&we.normalMapType===ole,normalMapTangentSpace:pn&&we.normalMapType===oX,metalnessMap:$e,roughnessMap:ke,anisotropy:gt,anisotropyMap:dn,clearcoat:Qt,clearcoatMap:Tn,clearcoatNormalMap:_n,clearcoatRoughnessMap:zn,iridescence:$t,iridescenceMap:Wt,iridescenceThicknessMap:Ms,sheen:jt,sheenColorMap:ss,sheenRoughnessMap:$n,specularMap:Un,specularColorMap:gn,specularIntensityMap:ls,transmission:Pn,transmissionMap:Ws,thicknessMap:yn,gradientMap:Sn,opaque:we.transparent===!1&&we.blending===U9,alphaMap:nn,alphaTest:ct,alphaHash:Zt,combine:we.combine,mapUv:Xt&&re(we.map.channel),aoMapUv:Gs&&re(we.aoMap.channel),lightMapUv:Hn&&re(we.lightMap.channel),bumpMapUv:Wn&&re(we.bumpMap.channel),normalMapUv:pn&&re(we.normalMap.channel),displacementMapUv:Ps&&re(we.displacementMap.channel),emissiveMapUv:fs&&re(we.emissiveMap.channel),metalnessMapUv:$e&&re(we.metalnessMap.channel),roughnessMapUv:ke&&re(we.roughnessMap.channel),anisotropyMapUv:dn&&re(we.anisotropyMap.channel),clearcoatMapUv:Tn&&re(we.clearcoatMap.channel),clearcoatNormalMapUv:_n&&re(we.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:zn&&re(we.clearcoatRoughnessMap.channel),iridescenceMapUv:Wt&&re(we.iridescenceMap.channel),iridescenceThicknessMapUv:Ms&&re(we.iridescenceThicknessMap.channel),sheenColorMapUv:ss&&re(we.sheenColorMap.channel),sheenRoughnessMapUv:$n&&re(we.sheenRoughnessMap.channel),specularMapUv:Un&&re(we.specularMap.channel),specularColorMapUv:gn&&re(we.specularColorMap.channel),specularIntensityMapUv:ls&&re(we.specularIntensityMap.channel),transmissionMapUv:Ws&&re(we.transmissionMap.channel),thicknessMapUv:yn&&re(we.thicknessMap.channel),alphaMapUv:nn&&re(we.alphaMap.channel),vertexTangents:!!it.attributes.tangent&&(pn||gt),vertexColors:we.vertexColors,vertexAlphas:we.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,vertexUv1s:un,vertexUv2s:jn,vertexUv3s:On,pointsUvs:lt.isPoints===!0&&!!it.attributes.uv&&(Xt||nn),fog:!!Ze,useFog:we.fog===!0,fogExp2:Ze&&Ze.isFogExp2,flatShading:we.flatShading===!0,sizeAttenuation:we.sizeAttenuation===!0,logarithmicDepthBuffer:x,skinning:lt.isSkinnedMesh===!0,morphTargets:it.morphAttributes.position!==void 0,morphNormals:it.morphAttributes.normal!==void 0,morphColors:it.morphAttributes.color!==void 0,morphTargetsCount:Ut,morphTextureStride:Ft,numDirLights:Te.directional.length,numPointLights:Te.point.length,numSpotLights:Te.spot.length,numSpotLightMaps:Te.spotLightMap.length,numRectAreaLights:Te.rectArea.length,numHemiLights:Te.hemi.length,numDirLightShadows:Te.directionalShadowMap.length,numPointLightShadows:Te.pointShadowMap.length,numSpotLightShadows:Te.spotShadowMap.length,numSpotLightShadowsWithMaps:Te.numSpotLightShadowsWithMaps,numLightProbes:Te.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:we.dithering,shadowMapEnabled:e.shadowMap.enabled&&je.length>0,shadowMapType:e.shadowMap.type,toneMapping:nl,useLegacyLights:e._useLegacyLights,decodeVideoTexture:Xt&&we.map.isVideoTexture===!0&&Wl.getTransfer(we.map.colorSpace)===Pr,premultipliedAlpha:we.premultipliedAlpha,doubleSided:we.side===Z0,flipSided:we.side===YI,useDepthPacking:we.depthPacking>=0,depthPacking:we.depthPacking||0,index0AttributeName:we.index0AttributeName,extensionDerivatives:rn&&we.extensions.derivatives===!0,extensionFragDepth:rn&&we.extensions.fragDepth===!0,extensionDrawBuffers:rn&&we.extensions.drawBuffers===!0,extensionShaderTextureLOD:rn&&we.extensions.shaderTextureLOD===!0,extensionClipCullDistance:rn&&we.extensions.clipCullDistance&&t.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:P||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:P||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:P||t.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:we.customProgramCacheKey()}}function K(we){const Te=[];if(we.shaderID?Te.push(we.shaderID):(Te.push(we.customVertexShaderID),Te.push(we.customFragmentShaderID)),we.defines!==void 0)for(const je in we.defines)Te.push(je),Te.push(we.defines[je]);return we.isRawShaderMaterial===!1&&(Ie(Te,we),ce(Te,we),Te.push(e.outputColorSpace)),Te.push(we.customProgramCacheKey),Te.join()}function Ie(we,Te){we.push(Te.precision),we.push(Te.outputColorSpace),we.push(Te.envMapMode),we.push(Te.envMapCubeUVHeight),we.push(Te.mapUv),we.push(Te.alphaMapUv),we.push(Te.lightMapUv),we.push(Te.aoMapUv),we.push(Te.bumpMapUv),we.push(Te.normalMapUv),we.push(Te.displacementMapUv),we.push(Te.emissiveMapUv),we.push(Te.metalnessMapUv),we.push(Te.roughnessMapUv),we.push(Te.anisotropyMapUv),we.push(Te.clearcoatMapUv),we.push(Te.clearcoatNormalMapUv),we.push(Te.clearcoatRoughnessMapUv),we.push(Te.iridescenceMapUv),we.push(Te.iridescenceThicknessMapUv),we.push(Te.sheenColorMapUv),we.push(Te.sheenRoughnessMapUv),we.push(Te.specularMapUv),we.push(Te.specularColorMapUv),we.push(Te.specularIntensityMapUv),we.push(Te.transmissionMapUv),we.push(Te.thicknessMapUv),we.push(Te.combine),we.push(Te.fogExp2),we.push(Te.sizeAttenuation),we.push(Te.morphTargetsCount),we.push(Te.morphAttributeCount),we.push(Te.numDirLights),we.push(Te.numPointLights),we.push(Te.numSpotLights),we.push(Te.numSpotLightMaps),we.push(Te.numHemiLights),we.push(Te.numRectAreaLights),we.push(Te.numDirLightShadows),we.push(Te.numPointLightShadows),we.push(Te.numSpotLightShadows),we.push(Te.numSpotLightShadowsWithMaps),we.push(Te.numLightProbes),we.push(Te.shadowMapType),we.push(Te.toneMapping),we.push(Te.numClippingPlanes),we.push(Te.numClipIntersection),we.push(Te.depthPacking)}function ce(we,Te){d.disableAll(),Te.isWebGL2&&d.enable(0),Te.supportsVertexTextures&&d.enable(1),Te.instancing&&d.enable(2),Te.instancingColor&&d.enable(3),Te.matcap&&d.enable(4),Te.envMap&&d.enable(5),Te.normalMapObjectSpace&&d.enable(6),Te.normalMapTangentSpace&&d.enable(7),Te.clearcoat&&d.enable(8),Te.iridescence&&d.enable(9),Te.alphaTest&&d.enable(10),Te.vertexColors&&d.enable(11),Te.vertexAlphas&&d.enable(12),Te.vertexUv1s&&d.enable(13),Te.vertexUv2s&&d.enable(14),Te.vertexUv3s&&d.enable(15),Te.vertexTangents&&d.enable(16),Te.anisotropy&&d.enable(17),Te.alphaHash&&d.enable(18),Te.batching&&d.enable(19),we.push(d.mask),d.disableAll(),Te.fog&&d.enable(0),Te.useFog&&d.enable(1),Te.flatShading&&d.enable(2),Te.logarithmicDepthBuffer&&d.enable(3),Te.skinning&&d.enable(4),Te.morphTargets&&d.enable(5),Te.morphNormals&&d.enable(6),Te.morphColors&&d.enable(7),Te.premultipliedAlpha&&d.enable(8),Te.shadowMapEnabled&&d.enable(9),Te.useLegacyLights&&d.enable(10),Te.doubleSided&&d.enable(11),Te.flipSided&&d.enable(12),Te.useDepthPacking&&d.enable(13),Te.dithering&&d.enable(14),Te.transmission&&d.enable(15),Te.sheen&&d.enable(16),Te.opaque&&d.enable(17),Te.pointsUvs&&d.enable(18),Te.decodeVideoTexture&&d.enable(19),we.push(d.mask)}function ae(we){const Te=ne[we.type];let je;if(Te){const Ke=tm[Te];je=Qle.clone(Ke.uniforms)}else je=we.uniforms;return je}function me(we,Te){let je;for(let Ke=0,lt=D.length;Ke<lt;Ke++){const Ze=D[Ke];if(Ze.cacheKey===Te){je=Ze,++je.usedTimes;break}}return je===void 0&&(je=new ooe(e,Te,we,o),D.push(je)),je}function Ee(we){if(--we.usedTimes===0){const Te=D.indexOf(we);D[Te]=D[D.length-1],D.pop(),we.destroy()}}function Ae(we){m.remove(we)}function Me(){m.dispose()}return{getParameters:J,getProgramCacheKey:K,getUniforms:ae,acquireProgram:me,releaseProgram:Ee,releaseShaderCache:Ae,programs:D,dispose:Me}}function Ioe(){let e=new WeakMap;function s(o){let f=e.get(o);return f===void 0&&(f={},e.set(o,f)),f}function n(o){e.delete(o)}function t(o,f,d){e.get(o)[f]=d}function u(){e=new WeakMap}return{get:s,remove:n,update:t,dispose:u}}function yoe(e,s){return e.groupOrder!==s.groupOrder?e.groupOrder-s.groupOrder:e.renderOrder!==s.renderOrder?e.renderOrder-s.renderOrder:e.material.id!==s.material.id?e.material.id-s.material.id:e.z!==s.z?e.z-s.z:e.id-s.id}function zK(e,s){return e.groupOrder!==s.groupOrder?e.groupOrder-s.groupOrder:e.renderOrder!==s.renderOrder?e.renderOrder-s.renderOrder:e.z!==s.z?s.z-e.z:e.id-s.id}function jK(){const e=[];let s=0;const n=[],t=[],u=[];function o(){s=0,n.length=0,t.length=0,u.length=0}function f(x,H,_,ne,re,J){let K=e[s];return K===void 0?(K={id:x.id,object:x,geometry:H,material:_,groupOrder:ne,renderOrder:x.renderOrder,z:re,group:J},e[s]=K):(K.id=x.id,K.object=x,K.geometry=H,K.material=_,K.groupOrder=ne,K.renderOrder=x.renderOrder,K.z=re,K.group=J),s++,K}function d(x,H,_,ne,re,J){const K=f(x,H,_,ne,re,J);_.transmission>0?t.push(K):_.transparent===!0?u.push(K):n.push(K)}function m(x,H,_,ne,re,J){const K=f(x,H,_,ne,re,J);_.transmission>0?t.unshift(K):_.transparent===!0?u.unshift(K):n.unshift(K)}function D(x,H){n.length>1&&n.sort(x||yoe),t.length>1&&t.sort(H||zK),u.length>1&&u.sort(H||zK)}function P(){for(let x=s,H=e.length;x<H;x++){const _=e[x];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:t,transparent:u,init:o,push:d,unshift:m,finish:P,sort:D}}function woe(){let e=new WeakMap;function s(t,u){const o=e.get(t);let f;return o===void 0?(f=new jK,e.set(t,[f])):u>=o.length?(f=new jK,o.push(f)):f=o[u],f}function n(){e=new WeakMap}return{get:s,dispose:n}}function Eoe(){const e={};return{get:function(s){if(e[s.id]!==void 0)return e[s.id];let n;switch(s.type){case"DirectionalLight":n={direction:new ze,color:new ps};break;case"SpotLight":n={position:new ze,direction:new ze,color:new ps,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ze,color:new ps,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ze,skyColor:new ps,groundColor:new ps};break;case"RectAreaLight":n={color:new ps,position:new ze,halfWidth:new ze,halfHeight:new ze};break}return e[s.id]=n,n}}}function poe(){const e={};return{get:function(s){if(e[s.id]!==void 0)return e[s.id];let n;switch(s.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new us};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new us};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new us,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[s.id]=n,n}}}let Toe=0;function moe(e,s){return(s.castShadow?2:0)-(e.castShadow?2:0)+(s.map?1:0)-(e.map?1:0)}function Roe(e,s){const n=new Eoe,t=poe(),u={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let P=0;P<9;P++)u.probe.push(new ze);const o=new ze,f=new Fn,d=new Fn;function m(P,x){let H=0,_=0,ne=0;for(let Ke=0;Ke<9;Ke++)u.probe[Ke].set(0,0,0);let re=0,J=0,K=0,Ie=0,ce=0,ae=0,me=0,Ee=0,Ae=0,Me=0,we=0;P.sort(moe);const Te=x===!0?Math.PI:1;for(let Ke=0,lt=P.length;Ke<lt;Ke++){const Ze=P[Ke],it=Ze.color,ot=Ze.intensity,yt=Ze.distance,Rt=Ze.shadow&&Ze.shadow.map?Ze.shadow.map.texture:null;if(Ze.isAmbientLight)H+=it.r*ot*Te,_+=it.g*ot*Te,ne+=it.b*ot*Te;else if(Ze.isLightProbe){for(let Ct=0;Ct<9;Ct++)u.probe[Ct].addScaledVector(Ze.sh.coefficients[Ct],ot);we++}else if(Ze.isDirectionalLight){const Ct=n.get(Ze);if(Ct.color.copy(Ze.color).multiplyScalar(Ze.intensity*Te),Ze.castShadow){const Bt=Ze.shadow,Ut=t.get(Ze);Ut.shadowBias=Bt.bias,Ut.shadowNormalBias=Bt.normalBias,Ut.shadowRadius=Bt.radius,Ut.shadowMapSize=Bt.mapSize,u.directionalShadow[re]=Ut,u.directionalShadowMap[re]=Rt,u.directionalShadowMatrix[re]=Ze.shadow.matrix,ae++}u.directional[re]=Ct,re++}else if(Ze.isSpotLight){const Ct=n.get(Ze);Ct.position.setFromMatrixPosition(Ze.matrixWorld),Ct.color.copy(it).multiplyScalar(ot*Te),Ct.distance=yt,Ct.coneCos=Math.cos(Ze.angle),Ct.penumbraCos=Math.cos(Ze.angle*(1-Ze.penumbra)),Ct.decay=Ze.decay,u.spot[K]=Ct;const Bt=Ze.shadow;if(Ze.map&&(u.spotLightMap[Ae]=Ze.map,Ae++,Bt.updateMatrices(Ze),Ze.castShadow&&Me++),u.spotLightMatrix[K]=Bt.matrix,Ze.castShadow){const Ut=t.get(Ze);Ut.shadowBias=Bt.bias,Ut.shadowNormalBias=Bt.normalBias,Ut.shadowRadius=Bt.radius,Ut.shadowMapSize=Bt.mapSize,u.spotShadow[K]=Ut,u.spotShadowMap[K]=Rt,Ee++}K++}else if(Ze.isRectAreaLight){const Ct=n.get(Ze);Ct.color.copy(it).multiplyScalar(ot),Ct.halfWidth.set(Ze.width*.5,0,0),Ct.halfHeight.set(0,Ze.height*.5,0),u.rectArea[Ie]=Ct,Ie++}else if(Ze.isPointLight){const Ct=n.get(Ze);if(Ct.color.copy(Ze.color).multiplyScalar(Ze.intensity*Te),Ct.distance=Ze.distance,Ct.decay=Ze.decay,Ze.castShadow){const Bt=Ze.shadow,Ut=t.get(Ze);Ut.shadowBias=Bt.bias,Ut.shadowNormalBias=Bt.normalBias,Ut.shadowRadius=Bt.radius,Ut.shadowMapSize=Bt.mapSize,Ut.shadowCameraNear=Bt.camera.near,Ut.shadowCameraFar=Bt.camera.far,u.pointShadow[J]=Ut,u.pointShadowMap[J]=Rt,u.pointShadowMatrix[J]=Ze.shadow.matrix,me++}u.point[J]=Ct,J++}else if(Ze.isHemisphereLight){const Ct=n.get(Ze);Ct.skyColor.copy(Ze.color).multiplyScalar(ot*Te),Ct.groundColor.copy(Ze.groundColor).multiplyScalar(ot*Te),u.hemi[ce]=Ct,ce++}}Ie>0&&(s.isWebGL2?e.has("OES_texture_float_linear")===!0?(u.rectAreaLTC1=wn.LTC_FLOAT_1,u.rectAreaLTC2=wn.LTC_FLOAT_2):(u.rectAreaLTC1=wn.LTC_HALF_1,u.rectAreaLTC2=wn.LTC_HALF_2):e.has("OES_texture_float_linear")===!0?(u.rectAreaLTC1=wn.LTC_FLOAT_1,u.rectAreaLTC2=wn.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(u.rectAreaLTC1=wn.LTC_HALF_1,u.rectAreaLTC2=wn.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),u.ambient[0]=H,u.ambient[1]=_,u.ambient[2]=ne;const je=u.hash;(je.directionalLength!==re||je.pointLength!==J||je.spotLength!==K||je.rectAreaLength!==Ie||je.hemiLength!==ce||je.numDirectionalShadows!==ae||je.numPointShadows!==me||je.numSpotShadows!==Ee||je.numSpotMaps!==Ae||je.numLightProbes!==we)&&(u.directional.length=re,u.spot.length=K,u.rectArea.length=Ie,u.point.length=J,u.hemi.length=ce,u.directionalShadow.length=ae,u.directionalShadowMap.length=ae,u.pointShadow.length=me,u.pointShadowMap.length=me,u.spotShadow.length=Ee,u.spotShadowMap.length=Ee,u.directionalShadowMatrix.length=ae,u.pointShadowMatrix.length=me,u.spotLightMatrix.length=Ee+Ae-Me,u.spotLightMap.length=Ae,u.numSpotLightShadowsWithMaps=Me,u.numLightProbes=we,je.directionalLength=re,je.pointLength=J,je.spotLength=K,je.rectAreaLength=Ie,je.hemiLength=ce,je.numDirectionalShadows=ae,je.numPointShadows=me,je.numSpotShadows=Ee,je.numSpotMaps=Ae,je.numLightProbes=we,u.version=Toe++)}function D(P,x){let H=0,_=0,ne=0,re=0,J=0;const K=x.matrixWorldInverse;for(let Ie=0,ce=P.length;Ie<ce;Ie++){const ae=P[Ie];if(ae.isDirectionalLight){const me=u.directional[H];me.direction.setFromMatrixPosition(ae.matrixWorld),o.setFromMatrixPosition(ae.target.matrixWorld),me.direction.sub(o),me.direction.transformDirection(K),H++}else if(ae.isSpotLight){const me=u.spot[ne];me.position.setFromMatrixPosition(ae.matrixWorld),me.position.applyMatrix4(K),me.direction.setFromMatrixPosition(ae.matrixWorld),o.setFromMatrixPosition(ae.target.matrixWorld),me.direction.sub(o),me.direction.transformDirection(K),ne++}else if(ae.isRectAreaLight){const me=u.rectArea[re];me.position.setFromMatrixPosition(ae.matrixWorld),me.position.applyMatrix4(K),d.identity(),f.copy(ae.matrixWorld),f.premultiply(K),d.extractRotation(f),me.halfWidth.set(ae.width*.5,0,0),me.halfHeight.set(0,ae.height*.5,0),me.halfWidth.applyMatrix4(d),me.halfHeight.applyMatrix4(d),re++}else if(ae.isPointLight){const me=u.point[_];me.position.setFromMatrixPosition(ae.matrixWorld),me.position.applyMatrix4(K),_++}else if(ae.isHemisphereLight){const me=u.hemi[J];me.direction.setFromMatrixPosition(ae.matrixWorld),me.direction.transformDirection(K),J++}}}return{setup:m,setupView:D,state:u}}function kK(e,s){const n=new Roe(e,s),t=[],u=[];function o(){t.length=0,u.length=0}function f(x){t.push(x)}function d(x){u.push(x)}function m(x){n.setup(t,x)}function D(x){n.setupView(t,x)}return{init:o,state:{lightsArray:t,shadowsArray:u,lights:n},setupLights:m,setupLightsView:D,pushLight:f,pushShadow:d}}function Aoe(e,s){let n=new WeakMap;function t(o,f=0){const d=n.get(o);let m;return d===void 0?(m=new kK(e,s),n.set(o,[m])):f>=d.length?(m=new kK(e,s),d.push(m)):m=d[f],m}function u(){n=new WeakMap}return{get:t,dispose:u}}class bX extends hb{constructor(s){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ule,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(s)}copy(s){return super.copy(s),this.depthPacking=s.depthPacking,this.map=s.map,this.alphaMap=s.alphaMap,this.displacementMap=s.displacementMap,this.displacementScale=s.displacementScale,this.displacementBias=s.displacementBias,this.wireframe=s.wireframe,this.wireframeLinewidth=s.wireframeLinewidth,this}}class Doe extends hb{constructor(s){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(s)}copy(s){return super.copy(s),this.map=s.map,this.alphaMap=s.alphaMap,this.displacementMap=s.displacementMap,this.displacementScale=s.displacementScale,this.displacementBias=s.displacementBias,this}}const Soe=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Noe=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function goe(e,s,n){let t=new Bk;const u=new us,o=new us,f=new Uc,d=new bX({depthPacking:ale}),m=new Doe,D={},P=n.maxTextureSize,x={[Aw]:YI,[YI]:Aw,[Z0]:Z0},H=new fN({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new us},radius:{value:4}},vertexShader:Soe,fragmentShader:Noe}),_=H.clone();_.defines.HORIZONTAL_PASS=1;const ne=new Mi;ne.setAttribute("position",new Ea(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const re=new mn(ne,H),J=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vJ;let K=this.type;this.render=function(Ee,Ae,Me){if(J.enabled===!1||J.autoUpdate===!1&&J.needsUpdate===!1||Ee.length===0)return;const we=e.getRenderTarget(),Te=e.getActiveCubeFace(),je=e.getActiveMipmapLevel(),Ke=e.state;Ke.setBlending(nN),Ke.buffers.color.setClear(1,1,1,1),Ke.buffers.depth.setTest(!0),Ke.setScissorTest(!1);const lt=K!==W6&&this.type===W6,Ze=K===W6&&this.type!==W6;for(let it=0,ot=Ee.length;it<ot;it++){const yt=Ee[it],Rt=yt.shadow;if(Rt===void 0){console.warn("THREE.WebGLShadowMap:",yt,"has no shadow.");continue}if(Rt.autoUpdate===!1&&Rt.needsUpdate===!1)continue;u.copy(Rt.mapSize);const Ct=Rt.getFrameExtents();if(u.multiply(Ct),o.copy(Rt.mapSize),(u.x>P||u.y>P)&&(u.x>P&&(o.x=Math.floor(P/Ct.x),u.x=o.x*Ct.x,Rt.mapSize.x=o.x),u.y>P&&(o.y=Math.floor(P/Ct.y),u.y=o.y*Ct.y,Rt.mapSize.y=o.y)),Rt.map===null||lt===!0||Ze===!0){const Ut=this.type!==W6?{minFilter:Rd,magFilter:Rd}:{};Rt.map!==null&&Rt.map.dispose(),Rt.map=new aA(u.x,u.y,Ut),Rt.map.texture.name=yt.name+".shadowMap",Rt.camera.updateProjectionMatrix()}e.setRenderTarget(Rt.map),e.clear();const Bt=Rt.getViewportCount();for(let Ut=0;Ut<Bt;Ut++){const Ft=Rt.getViewport(Ut);f.set(o.x*Ft.x,o.y*Ft.y,o.x*Ft.z,o.y*Ft.w),Ke.viewport(f),Rt.updateMatrices(yt,Ut),t=Rt.getFrustum(),ae(Ae,Me,Rt.camera,yt,this.type)}Rt.isPointLightShadow!==!0&&this.type===W6&&Ie(Rt,Me),Rt.needsUpdate=!1}K=this.type,J.needsUpdate=!1,e.setRenderTarget(we,Te,je)};function Ie(Ee,Ae){const Me=s.update(re);H.defines.VSM_SAMPLES!==Ee.blurSamples&&(H.defines.VSM_SAMPLES=Ee.blurSamples,_.defines.VSM_SAMPLES=Ee.blurSamples,H.needsUpdate=!0,_.needsUpdate=!0),Ee.mapPass===null&&(Ee.mapPass=new aA(u.x,u.y)),H.uniforms.shadow_pass.value=Ee.map.texture,H.uniforms.resolution.value=Ee.mapSize,H.uniforms.radius.value=Ee.radius,e.setRenderTarget(Ee.mapPass),e.clear(),e.renderBufferDirect(Ae,null,Me,H,re,null),_.uniforms.shadow_pass.value=Ee.mapPass.texture,_.uniforms.resolution.value=Ee.mapSize,_.uniforms.radius.value=Ee.radius,e.setRenderTarget(Ee.map),e.clear(),e.renderBufferDirect(Ae,null,Me,_,re,null)}function ce(Ee,Ae,Me,we){let Te=null;const je=Me.isPointLight===!0?Ee.customDistanceMaterial:Ee.customDepthMaterial;if(je!==void 0)Te=je;else if(Te=Me.isPointLight===!0?m:d,e.localClippingEnabled&&Ae.clipShadows===!0&&Array.isArray(Ae.clippingPlanes)&&Ae.clippingPlanes.length!==0||Ae.displacementMap&&Ae.displacementScale!==0||Ae.alphaMap&&Ae.alphaTest>0||Ae.map&&Ae.alphaTest>0){const Ke=Te.uuid,lt=Ae.uuid;let Ze=D[Ke];Ze===void 0&&(Ze={},D[Ke]=Ze);let it=Ze[lt];it===void 0&&(it=Te.clone(),Ze[lt]=it,Ae.addEventListener("dispose",me)),Te=it}if(Te.visible=Ae.visible,Te.wireframe=Ae.wireframe,we===W6?Te.side=Ae.shadowSide!==null?Ae.shadowSide:Ae.side:Te.side=Ae.shadowSide!==null?Ae.shadowSide:x[Ae.side],Te.alphaMap=Ae.alphaMap,Te.alphaTest=Ae.alphaTest,Te.map=Ae.map,Te.clipShadows=Ae.clipShadows,Te.clippingPlanes=Ae.clippingPlanes,Te.clipIntersection=Ae.clipIntersection,Te.displacementMap=Ae.displacementMap,Te.displacementScale=Ae.displacementScale,Te.displacementBias=Ae.displacementBias,Te.wireframeLinewidth=Ae.wireframeLinewidth,Te.linewidth=Ae.linewidth,Me.isPointLight===!0&&Te.isMeshDistanceMaterial===!0){const Ke=e.properties.get(Te);Ke.light=Me}return Te}function ae(Ee,Ae,Me,we,Te){if(Ee.visible===!1)return;if(Ee.layers.test(Ae.layers)&&(Ee.isMesh||Ee.isLine||Ee.isPoints)&&(Ee.castShadow||Ee.receiveShadow&&Te===W6)&&(!Ee.frustumCulled||t.intersectsObject(Ee))){Ee.modelViewMatrix.multiplyMatrices(Me.matrixWorldInverse,Ee.matrixWorld);const lt=s.update(Ee),Ze=Ee.material;if(Array.isArray(Ze)){const it=lt.groups;for(let ot=0,yt=it.length;ot<yt;ot++){const Rt=it[ot],Ct=Ze[Rt.materialIndex];if(Ct&&Ct.visible){const Bt=ce(Ee,Ct,we,Te);Ee.onBeforeShadow(e,Ee,Ae,Me,lt,Bt,Rt),e.renderBufferDirect(Me,null,lt,Bt,Ee,Rt),Ee.onAfterShadow(e,Ee,Ae,Me,lt,Bt,Rt)}}}else if(Ze.visible){const it=ce(Ee,Ze,we,Te);Ee.onBeforeShadow(e,Ee,Ae,Me,lt,it,null),e.renderBufferDirect(Me,null,lt,it,Ee,null),Ee.onAfterShadow(e,Ee,Ae,Me,lt,it,null)}}const Ke=Ee.children;for(let lt=0,Ze=Ke.length;lt<Ze;lt++)ae(Ke[lt],Ae,Me,we,Te)}function me(Ee){Ee.target.removeEventListener("dispose",me);for(const Me in D){const we=D[Me],Te=Ee.target.uuid;Te in we&&(we[Te].dispose(),delete we[Te])}}}function Ooe(e,s,n){const t=n.isWebGL2;function u(){let ct=!1;const Zt=new Uc;let rn=null;const un=new Uc(0,0,0,0);return{setMask:function(jn){rn!==jn&&!ct&&(e.colorMask(jn,jn,jn,jn),rn=jn)},setLocked:function(jn){ct=jn},setClear:function(jn,On,nl,$l,yl){yl===!0&&(jn*=$l,On*=$l,nl*=$l),Zt.set(jn,On,nl,$l),un.equals(Zt)===!1&&(e.clearColor(jn,On,nl,$l),un.copy(Zt))},reset:function(){ct=!1,rn=null,un.set(-1,0,0,0)}}}function o(){let ct=!1,Zt=null,rn=null,un=null;return{setTest:function(jn){jn?Gn(e.DEPTH_TEST):Xt(e.DEPTH_TEST)},setMask:function(jn){Zt!==jn&&!ct&&(e.depthMask(jn),Zt=jn)},setFunc:function(jn){if(rn!==jn){switch(jn){case Fse:e.depthFunc(e.NEVER);break;case Gse:e.depthFunc(e.ALWAYS);break;case _se:e.depthFunc(e.LESS);break;case nW:e.depthFunc(e.LEQUAL);break;case Vse:e.depthFunc(e.EQUAL);break;case Wse:e.depthFunc(e.GEQUAL);break;case Yse:e.depthFunc(e.GREATER);break;case zse:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}rn=jn}},setLocked:function(jn){ct=jn},setClear:function(jn){un!==jn&&(e.clearDepth(jn),un=jn)},reset:function(){ct=!1,Zt=null,rn=null,un=null}}}function f(){let ct=!1,Zt=null,rn=null,un=null,jn=null,On=null,nl=null,$l=null,yl=null;return{setTest:function(Ys){ct||(Ys?Gn(e.STENCIL_TEST):Xt(e.STENCIL_TEST))},setMask:function(Ys){Zt!==Ys&&!ct&&(e.stencilMask(Ys),Zt=Ys)},setFunc:function(Ys,Ol,$i){(rn!==Ys||un!==Ol||jn!==$i)&&(e.stencilFunc(Ys,Ol,$i),rn=Ys,un=Ol,jn=$i)},setOp:function(Ys,Ol,$i){(On!==Ys||nl!==Ol||$l!==$i)&&(e.stencilOp(Ys,Ol,$i),On=Ys,nl=Ol,$l=$i)},setLocked:function(Ys){ct=Ys},setClear:function(Ys){yl!==Ys&&(e.clearStencil(Ys),yl=Ys)},reset:function(){ct=!1,Zt=null,rn=null,un=null,jn=null,On=null,nl=null,$l=null,yl=null}}}const d=new u,m=new o,D=new f,P=new WeakMap,x=new WeakMap;let H={},_={},ne=new WeakMap,re=[],J=null,K=!1,Ie=null,ce=null,ae=null,me=null,Ee=null,Ae=null,Me=null,we=new ps(0,0,0),Te=0,je=!1,Ke=null,lt=null,Ze=null,it=null,ot=null;const yt=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Rt=!1,Ct=0;const Bt=e.getParameter(e.VERSION);Bt.indexOf("WebGL")!==-1?(Ct=parseFloat(/^WebGL (\d)/.exec(Bt)[1]),Rt=Ct>=1):Bt.indexOf("OpenGL ES")!==-1&&(Ct=parseFloat(/^OpenGL ES (\d)/.exec(Bt)[1]),Rt=Ct>=2);let Ut=null,Ft={};const Nt=e.getParameter(e.SCISSOR_BOX),Gt=e.getParameter(e.VIEWPORT),en=new Uc().fromArray(Nt),Dn=new Uc().fromArray(Gt);function An(ct,Zt,rn,un){const jn=new Uint8Array(4),On=e.createTexture();e.bindTexture(ct,On),e.texParameteri(ct,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(ct,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let nl=0;nl<rn;nl++)t&&(ct===e.TEXTURE_3D||ct===e.TEXTURE_2D_ARRAY)?e.texImage3D(Zt,0,e.RGBA,1,1,un,0,e.RGBA,e.UNSIGNED_BYTE,jn):e.texImage2D(Zt+nl,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,jn);return On}const En={};En[e.TEXTURE_2D]=An(e.TEXTURE_2D,e.TEXTURE_2D,1),En[e.TEXTURE_CUBE_MAP]=An(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),t&&(En[e.TEXTURE_2D_ARRAY]=An(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),En[e.TEXTURE_3D]=An(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),d.setClear(0,0,0,1),m.setClear(1),D.setClear(0),Gn(e.DEPTH_TEST),m.setFunc(nW),fs(!1),$e(O$),Gn(e.CULL_FACE),pn(nN);function Gn(ct){H[ct]!==!0&&(e.enable(ct),H[ct]=!0)}function Xt(ct){H[ct]!==!1&&(e.disable(ct),H[ct]=!1)}function qn(ct,Zt){return _[ct]!==Zt?(e.bindFramebuffer(ct,Zt),_[ct]=Zt,t&&(ct===e.DRAW_FRAMEBUFFER&&(_[e.FRAMEBUFFER]=Zt),ct===e.FRAMEBUFFER&&(_[e.DRAW_FRAMEBUFFER]=Zt)),!0):!1}function Tt(ct,Zt){let rn=re,un=!1;if(ct)if(rn=ne.get(Zt),rn===void 0&&(rn=[],ne.set(Zt,rn)),ct.isWebGLMultipleRenderTargets){const jn=ct.texture;if(rn.length!==jn.length||rn[0]!==e.COLOR_ATTACHMENT0){for(let On=0,nl=jn.length;On<nl;On++)rn[On]=e.COLOR_ATTACHMENT0+On;rn.length=jn.length,un=!0}}else rn[0]!==e.COLOR_ATTACHMENT0&&(rn[0]=e.COLOR_ATTACHMENT0,un=!0);else rn[0]!==e.BACK&&(rn[0]=e.BACK,un=!0);un&&(n.isWebGL2?e.drawBuffers(rn):s.get("WEBGL_draw_buffers").drawBuffersWEBGL(rn))}function Gs(ct){return J!==ct?(e.useProgram(ct),J=ct,!0):!1}const Hn={[CO]:e.FUNC_ADD,[Ase]:e.FUNC_SUBTRACT,[Dse]:e.FUNC_REVERSE_SUBTRACT};if(t)Hn[P$]=e.MIN,Hn[M$]=e.MAX;else{const ct=s.get("EXT_blend_minmax");ct!==null&&(Hn[P$]=ct.MIN_EXT,Hn[M$]=ct.MAX_EXT)}const Wn={[Sse]:e.ZERO,[Nse]:e.ONE,[gse]:e.SRC_COLOR,[ij]:e.SRC_ALPHA,[Mse]:e.SRC_ALPHA_SATURATE,[Cse]:e.DST_COLOR,[Lse]:e.DST_ALPHA,[Ose]:e.ONE_MINUS_SRC_COLOR,[uj]:e.ONE_MINUS_SRC_ALPHA,[Pse]:e.ONE_MINUS_DST_COLOR,[bse]:e.ONE_MINUS_DST_ALPHA,[xse]:e.CONSTANT_COLOR,[Use]:e.ONE_MINUS_CONSTANT_COLOR,[Bse]:e.CONSTANT_ALPHA,[Hse]:e.ONE_MINUS_CONSTANT_ALPHA};function pn(ct,Zt,rn,un,jn,On,nl,$l,yl,Ys){if(ct===nN){K===!0&&(Xt(e.BLEND),K=!1);return}if(K===!1&&(Gn(e.BLEND),K=!0),ct!==Rse){if(ct!==Ie||Ys!==je){if((ce!==CO||Ee!==CO)&&(e.blendEquation(e.FUNC_ADD),ce=CO,Ee=CO),Ys)switch(ct){case U9:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case L$:e.blendFunc(e.ONE,e.ONE);break;case b$:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case C$:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",ct);break}else switch(ct){case U9:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case L$:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case b$:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case C$:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",ct);break}ae=null,me=null,Ae=null,Me=null,we.set(0,0,0),Te=0,Ie=ct,je=Ys}return}jn=jn||Zt,On=On||rn,nl=nl||un,(Zt!==ce||jn!==Ee)&&(e.blendEquationSeparate(Hn[Zt],Hn[jn]),ce=Zt,Ee=jn),(rn!==ae||un!==me||On!==Ae||nl!==Me)&&(e.blendFuncSeparate(Wn[rn],Wn[un],Wn[On],Wn[nl]),ae=rn,me=un,Ae=On,Me=nl),($l.equals(we)===!1||yl!==Te)&&(e.blendColor($l.r,$l.g,$l.b,yl),we.copy($l),Te=yl),Ie=ct,je=!1}function Ps(ct,Zt){ct.side===Z0?Xt(e.CULL_FACE):Gn(e.CULL_FACE);let rn=ct.side===YI;Zt&&(rn=!rn),fs(rn),ct.blending===U9&&ct.transparent===!1?pn(nN):pn(ct.blending,ct.blendEquation,ct.blendSrc,ct.blendDst,ct.blendEquationAlpha,ct.blendSrcAlpha,ct.blendDstAlpha,ct.blendColor,ct.blendAlpha,ct.premultipliedAlpha),m.setFunc(ct.depthFunc),m.setTest(ct.depthTest),m.setMask(ct.depthWrite),d.setMask(ct.colorWrite);const un=ct.stencilWrite;D.setTest(un),un&&(D.setMask(ct.stencilWriteMask),D.setFunc(ct.stencilFunc,ct.stencilRef,ct.stencilFuncMask),D.setOp(ct.stencilFail,ct.stencilZFail,ct.stencilZPass)),gt(ct.polygonOffset,ct.polygonOffsetFactor,ct.polygonOffsetUnits),ct.alphaToCoverage===!0?Gn(e.SAMPLE_ALPHA_TO_COVERAGE):Xt(e.SAMPLE_ALPHA_TO_COVERAGE)}function fs(ct){Ke!==ct&&(ct?e.frontFace(e.CW):e.frontFace(e.CCW),Ke=ct)}function $e(ct){ct!==pse?(Gn(e.CULL_FACE),ct!==lt&&(ct===O$?e.cullFace(e.BACK):ct===Tse?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Xt(e.CULL_FACE),lt=ct}function ke(ct){ct!==Ze&&(Rt&&e.lineWidth(ct),Ze=ct)}function gt(ct,Zt,rn){ct?(Gn(e.POLYGON_OFFSET_FILL),(it!==Zt||ot!==rn)&&(e.polygonOffset(Zt,rn),it=Zt,ot=rn)):Xt(e.POLYGON_OFFSET_FILL)}function Qt(ct){ct?Gn(e.SCISSOR_TEST):Xt(e.SCISSOR_TEST)}function $t(ct){ct===void 0&&(ct=e.TEXTURE0+yt-1),Ut!==ct&&(e.activeTexture(ct),Ut=ct)}function jt(ct,Zt,rn){rn===void 0&&(Ut===null?rn=e.TEXTURE0+yt-1:rn=Ut);let un=Ft[rn];un===void 0&&(un={type:void 0,texture:void 0},Ft[rn]=un),(un.type!==ct||un.texture!==Zt)&&(Ut!==rn&&(e.activeTexture(rn),Ut=rn),e.bindTexture(ct,Zt||En[ct]),un.type=ct,un.texture=Zt)}function Pn(){const ct=Ft[Ut];ct!==void 0&&ct.type!==void 0&&(e.bindTexture(ct.type,null),ct.type=void 0,ct.texture=void 0)}function dn(){try{e.compressedTexImage2D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function Tn(){try{e.compressedTexImage3D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function _n(){try{e.texSubImage2D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function zn(){try{e.texSubImage3D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function Wt(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function Ms(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function ss(){try{e.texStorage2D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function $n(){try{e.texStorage3D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function Un(){try{e.texImage2D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function gn(){try{e.texImage3D.apply(e,arguments)}catch(ct){console.error("THREE.WebGLState:",ct)}}function ls(ct){en.equals(ct)===!1&&(e.scissor(ct.x,ct.y,ct.z,ct.w),en.copy(ct))}function Ws(ct){Dn.equals(ct)===!1&&(e.viewport(ct.x,ct.y,ct.z,ct.w),Dn.copy(ct))}function yn(ct,Zt){let rn=x.get(Zt);rn===void 0&&(rn=new WeakMap,x.set(Zt,rn));let un=rn.get(ct);un===void 0&&(un=e.getUniformBlockIndex(Zt,ct.name),rn.set(ct,un))}function Sn(ct,Zt){const un=x.get(Zt).get(ct);P.get(Zt)!==un&&(e.uniformBlockBinding(Zt,un,ct.__bindingPointIndex),P.set(Zt,un))}function nn(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),t===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),H={},Ut=null,Ft={},_={},ne=new WeakMap,re=[],J=null,K=!1,Ie=null,ce=null,ae=null,me=null,Ee=null,Ae=null,Me=null,we=new ps(0,0,0),Te=0,je=!1,Ke=null,lt=null,Ze=null,it=null,ot=null,en.set(0,0,e.canvas.width,e.canvas.height),Dn.set(0,0,e.canvas.width,e.canvas.height),d.reset(),m.reset(),D.reset()}return{buffers:{color:d,depth:m,stencil:D},enable:Gn,disable:Xt,bindFramebuffer:qn,drawBuffers:Tt,useProgram:Gs,setBlending:pn,setMaterial:Ps,setFlipSided:fs,setCullFace:$e,setLineWidth:ke,setPolygonOffset:gt,setScissorTest:Qt,activeTexture:$t,bindTexture:jt,unbindTexture:Pn,compressedTexImage2D:dn,compressedTexImage3D:Tn,texImage2D:Un,texImage3D:gn,updateUBOMapping:yn,uniformBlockBinding:Sn,texStorage2D:ss,texStorage3D:$n,texSubImage2D:_n,texSubImage3D:zn,compressedTexSubImage2D:Wt,compressedTexSubImage3D:Ms,scissor:ls,viewport:Ws,reset:nn}}function Loe(e,s,n,t,u,o,f){const d=u.isWebGL2,m=s.has("WEBGL_multisampled_render_to_texture")?s.get("WEBGL_multisampled_render_to_texture"):null,D=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),P=new WeakMap;let x;const H=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function ne($e,ke){return _?new OffscreenCanvas($e,ke):aW("canvas")}function re($e,ke,gt,Qt){let $t=1;if(($e.width>Qt||$e.height>Qt)&&($t=Qt/Math.max($e.width,$e.height)),$t<1||ke===!0)if(typeof HTMLImageElement<"u"&&$e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&$e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&$e instanceof ImageBitmap){const jt=ke?uW:Math.floor,Pn=jt($t*$e.width),dn=jt($t*$e.height);x===void 0&&(x=ne(Pn,dn));const Tn=gt?ne(Pn,dn):x;return Tn.width=Pn,Tn.height=dn,Tn.getContext("2d").drawImage($e,0,0,Pn,dn),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$e.width+"x"+$e.height+") to ("+Pn+"x"+dn+")."),Tn}else return"data"in $e&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$e.width+"x"+$e.height+")."),$e;return $e}function J($e){return Ij($e.width)&&Ij($e.height)}function K($e){return d?!1:$e.wrapS!==ep||$e.wrapT!==ep||$e.minFilter!==Rd&&$e.minFilter!==v5}function Ie($e,ke){return $e.generateMipmaps&&ke&&$e.minFilter!==Rd&&$e.minFilter!==v5}function ce($e){e.generateMipmap($e)}function ae($e,ke,gt,Qt,$t=!1){if(d===!1)return ke;if($e!==null){if(e[$e]!==void 0)return e[$e];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+$e+"'")}let jt=ke;if(ke===e.RED&&(gt===e.FLOAT&&(jt=e.R32F),gt===e.HALF_FLOAT&&(jt=e.R16F),gt===e.UNSIGNED_BYTE&&(jt=e.R8)),ke===e.RED_INTEGER&&(gt===e.UNSIGNED_BYTE&&(jt=e.R8UI),gt===e.UNSIGNED_SHORT&&(jt=e.R16UI),gt===e.UNSIGNED_INT&&(jt=e.R32UI),gt===e.BYTE&&(jt=e.R8I),gt===e.SHORT&&(jt=e.R16I),gt===e.INT&&(jt=e.R32I)),ke===e.RG&&(gt===e.FLOAT&&(jt=e.RG32F),gt===e.HALF_FLOAT&&(jt=e.RG16F),gt===e.UNSIGNED_BYTE&&(jt=e.RG8)),ke===e.RGBA){const Pn=$t?sW:Wl.getTransfer(Qt);gt===e.FLOAT&&(jt=e.RGBA32F),gt===e.HALF_FLOAT&&(jt=e.RGBA16F),gt===e.UNSIGNED_BYTE&&(jt=Pn===Pr?e.SRGB8_ALPHA8:e.RGBA8),gt===e.UNSIGNED_SHORT_4_4_4_4&&(jt=e.RGBA4),gt===e.UNSIGNED_SHORT_5_5_5_1&&(jt=e.RGB5_A1)}return(jt===e.R16F||jt===e.R32F||jt===e.RG16F||jt===e.RG32F||jt===e.RGBA16F||jt===e.RGBA32F)&&s.get("EXT_color_buffer_float"),jt}function me($e,ke,gt){return Ie($e,gt)===!0||$e.isFramebufferTexture&&$e.minFilter!==Rd&&$e.minFilter!==v5?Math.log2(Math.max(ke.width,ke.height))+1:$e.mipmaps!==void 0&&$e.mipmaps.length>0?$e.mipmaps.length:$e.isCompressedTexture&&Array.isArray($e.image)?ke.mipmaps.length:1}function Ee($e){return $e===Rd||$e===x$||$e===xY?e.NEAREST:e.LINEAR}function Ae($e){const ke=$e.target;ke.removeEventListener("dispose",Ae),we(ke),ke.isVideoTexture&&P.delete(ke)}function Me($e){const ke=$e.target;ke.removeEventListener("dispose",Me),je(ke)}function we($e){const ke=t.get($e);if(ke.__webglInit===void 0)return;const gt=$e.source,Qt=H.get(gt);if(Qt){const $t=Qt[ke.__cacheKey];$t.usedTimes--,$t.usedTimes===0&&Te($e),Object.keys(Qt).length===0&&H.delete(gt)}t.remove($e)}function Te($e){const ke=t.get($e);e.deleteTexture(ke.__webglTexture);const gt=$e.source,Qt=H.get(gt);delete Qt[ke.__cacheKey],f.memory.textures--}function je($e){const ke=$e.texture,gt=t.get($e),Qt=t.get(ke);if(Qt.__webglTexture!==void 0&&(e.deleteTexture(Qt.__webglTexture),f.memory.textures--),$e.depthTexture&&$e.depthTexture.dispose(),$e.isWebGLCubeRenderTarget)for(let $t=0;$t<6;$t++){if(Array.isArray(gt.__webglFramebuffer[$t]))for(let jt=0;jt<gt.__webglFramebuffer[$t].length;jt++)e.deleteFramebuffer(gt.__webglFramebuffer[$t][jt]);else e.deleteFramebuffer(gt.__webglFramebuffer[$t]);gt.__webglDepthbuffer&&e.deleteRenderbuffer(gt.__webglDepthbuffer[$t])}else{if(Array.isArray(gt.__webglFramebuffer))for(let $t=0;$t<gt.__webglFramebuffer.length;$t++)e.deleteFramebuffer(gt.__webglFramebuffer[$t]);else e.deleteFramebuffer(gt.__webglFramebuffer);if(gt.__webglDepthbuffer&&e.deleteRenderbuffer(gt.__webglDepthbuffer),gt.__webglMultisampledFramebuffer&&e.deleteFramebuffer(gt.__webglMultisampledFramebuffer),gt.__webglColorRenderbuffer)for(let $t=0;$t<gt.__webglColorRenderbuffer.length;$t++)gt.__webglColorRenderbuffer[$t]&&e.deleteRenderbuffer(gt.__webglColorRenderbuffer[$t]);gt.__webglDepthRenderbuffer&&e.deleteRenderbuffer(gt.__webglDepthRenderbuffer)}if($e.isWebGLMultipleRenderTargets)for(let $t=0,jt=ke.length;$t<jt;$t++){const Pn=t.get(ke[$t]);Pn.__webglTexture&&(e.deleteTexture(Pn.__webglTexture),f.memory.textures--),t.remove(ke[$t])}t.remove(ke),t.remove($e)}let Ke=0;function lt(){Ke=0}function Ze(){const $e=Ke;return $e>=u.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+$e+" texture units while this GPU supports only "+u.maxTextures),Ke+=1,$e}function it($e){const ke=[];return ke.push($e.wrapS),ke.push($e.wrapT),ke.push($e.wrapR||0),ke.push($e.magFilter),ke.push($e.minFilter),ke.push($e.anisotropy),ke.push($e.internalFormat),ke.push($e.format),ke.push($e.type),ke.push($e.generateMipmaps),ke.push($e.premultiplyAlpha),ke.push($e.flipY),ke.push($e.unpackAlignment),ke.push($e.colorSpace),ke.join()}function ot($e,ke){const gt=t.get($e);if($e.isVideoTexture&&Ps($e),$e.isRenderTargetTexture===!1&&$e.version>0&&gt.__version!==$e.version){const Qt=$e.image;if(Qt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Qt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{en(gt,$e,ke);return}}n.bindTexture(e.TEXTURE_2D,gt.__webglTexture,e.TEXTURE0+ke)}function yt($e,ke){const gt=t.get($e);if($e.version>0&&gt.__version!==$e.version){en(gt,$e,ke);return}n.bindTexture(e.TEXTURE_2D_ARRAY,gt.__webglTexture,e.TEXTURE0+ke)}function Rt($e,ke){const gt=t.get($e);if($e.version>0&&gt.__version!==$e.version){en(gt,$e,ke);return}n.bindTexture(e.TEXTURE_3D,gt.__webglTexture,e.TEXTURE0+ke)}function Ct($e,ke){const gt=t.get($e);if($e.version>0&&gt.__version!==$e.version){Dn(gt,$e,ke);return}n.bindTexture(e.TEXTURE_CUBE_MAP,gt.__webglTexture,e.TEXTURE0+ke)}const Bt={[cj]:e.REPEAT,[ep]:e.CLAMP_TO_EDGE,[hj]:e.MIRRORED_REPEAT},Ut={[Rd]:e.NEAREST,[x$]:e.NEAREST_MIPMAP_NEAREST,[xY]:e.NEAREST_MIPMAP_LINEAR,[v5]:e.LINEAR,[Xse]:e.LINEAR_MIPMAP_NEAREST,[YF]:e.LINEAR_MIPMAP_LINEAR},Ft={[cle]:e.NEVER,[wle]:e.ALWAYS,[hle]:e.LESS,[cX]:e.LEQUAL,[fle]:e.EQUAL,[yle]:e.GEQUAL,[dle]:e.GREATER,[Ile]:e.NOTEQUAL};function Nt($e,ke,gt){if(gt?(e.texParameteri($e,e.TEXTURE_WRAP_S,Bt[ke.wrapS]),e.texParameteri($e,e.TEXTURE_WRAP_T,Bt[ke.wrapT]),($e===e.TEXTURE_3D||$e===e.TEXTURE_2D_ARRAY)&&e.texParameteri($e,e.TEXTURE_WRAP_R,Bt[ke.wrapR]),e.texParameteri($e,e.TEXTURE_MAG_FILTER,Ut[ke.magFilter]),e.texParameteri($e,e.TEXTURE_MIN_FILTER,Ut[ke.minFilter])):(e.texParameteri($e,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri($e,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),($e===e.TEXTURE_3D||$e===e.TEXTURE_2D_ARRAY)&&e.texParameteri($e,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(ke.wrapS!==ep||ke.wrapT!==ep)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri($e,e.TEXTURE_MAG_FILTER,Ee(ke.magFilter)),e.texParameteri($e,e.TEXTURE_MIN_FILTER,Ee(ke.minFilter)),ke.minFilter!==Rd&&ke.minFilter!==v5&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),ke.compareFunction&&(e.texParameteri($e,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri($e,e.TEXTURE_COMPARE_FUNC,Ft[ke.compareFunction])),s.has("EXT_texture_filter_anisotropic")===!0){const Qt=s.get("EXT_texture_filter_anisotropic");if(ke.magFilter===Rd||ke.minFilter!==xY&&ke.minFilter!==YF||ke.type===QS&&s.has("OES_texture_float_linear")===!1||d===!1&&ke.type===zF&&s.has("OES_texture_half_float_linear")===!1)return;(ke.anisotropy>1||t.get(ke).__currentAnisotropy)&&(e.texParameterf($e,Qt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(ke.anisotropy,u.getMaxAnisotropy())),t.get(ke).__currentAnisotropy=ke.anisotropy)}}function Gt($e,ke){let gt=!1;$e.__webglInit===void 0&&($e.__webglInit=!0,ke.addEventListener("dispose",Ae));const Qt=ke.source;let $t=H.get(Qt);$t===void 0&&($t={},H.set(Qt,$t));const jt=it(ke);if(jt!==$e.__cacheKey){$t[jt]===void 0&&($t[jt]={texture:e.createTexture(),usedTimes:0},f.memory.textures++,gt=!0),$t[jt].usedTimes++;const Pn=$t[$e.__cacheKey];Pn!==void 0&&($t[$e.__cacheKey].usedTimes--,Pn.usedTimes===0&&Te(ke)),$e.__cacheKey=jt,$e.__webglTexture=$t[jt].texture}return gt}function en($e,ke,gt){let Qt=e.TEXTURE_2D;(ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Qt=e.TEXTURE_2D_ARRAY),ke.isData3DTexture&&(Qt=e.TEXTURE_3D);const $t=Gt($e,ke),jt=ke.source;n.bindTexture(Qt,$e.__webglTexture,e.TEXTURE0+gt);const Pn=t.get(jt);if(jt.version!==Pn.__version||$t===!0){n.activeTexture(e.TEXTURE0+gt);const dn=Wl.getPrimaries(Wl.workingColorSpace),Tn=ke.colorSpace===tw?null:Wl.getPrimaries(ke.colorSpace),_n=ke.colorSpace===tw||dn===Tn?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,ke.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ke.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,ke.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_n);const zn=K(ke)&&J(ke.image)===!1;let Wt=re(ke.image,zn,!1,u.maxTextureSize);Wt=fs(ke,Wt);const Ms=J(Wt)||d,ss=o.convert(ke.format,ke.colorSpace);let $n=o.convert(ke.type),Un=ae(ke.internalFormat,ss,$n,ke.colorSpace,ke.isVideoTexture);Nt(Qt,ke,Ms);let gn;const ls=ke.mipmaps,Ws=d&&ke.isVideoTexture!==!0&&Un!==uX,yn=Pn.__version===void 0||$t===!0,Sn=me(ke,Wt,Ms);if(ke.isDepthTexture)Un=e.DEPTH_COMPONENT,d?ke.type===QS?Un=e.DEPTH_COMPONENT32F:ke.type===KS?Un=e.DEPTH_COMPONENT24:ke.type===BO?Un=e.DEPTH24_STENCIL8:Un=e.DEPTH_COMPONENT16:ke.type===QS&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),ke.format===HO&&Un===e.DEPTH_COMPONENT&&ke.type!==Pk&&ke.type!==KS&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),ke.type=KS,$n=o.convert(ke.type)),ke.format===q9&&Un===e.DEPTH_COMPONENT&&(Un=e.DEPTH_STENCIL,ke.type!==BO&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),ke.type=BO,$n=o.convert(ke.type))),yn&&(Ws?n.texStorage2D(e.TEXTURE_2D,1,Un,Wt.width,Wt.height):n.texImage2D(e.TEXTURE_2D,0,Un,Wt.width,Wt.height,0,ss,$n,null));else if(ke.isDataTexture)if(ls.length>0&&Ms){Ws&&yn&&n.texStorage2D(e.TEXTURE_2D,Sn,Un,ls[0].width,ls[0].height);for(let nn=0,ct=ls.length;nn<ct;nn++)gn=ls[nn],Ws?n.texSubImage2D(e.TEXTURE_2D,nn,0,0,gn.width,gn.height,ss,$n,gn.data):n.texImage2D(e.TEXTURE_2D,nn,Un,gn.width,gn.height,0,ss,$n,gn.data);ke.generateMipmaps=!1}else Ws?(yn&&n.texStorage2D(e.TEXTURE_2D,Sn,Un,Wt.width,Wt.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,Wt.width,Wt.height,ss,$n,Wt.data)):n.texImage2D(e.TEXTURE_2D,0,Un,Wt.width,Wt.height,0,ss,$n,Wt.data);else if(ke.isCompressedTexture)if(ke.isCompressedArrayTexture){Ws&&yn&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Sn,Un,ls[0].width,ls[0].height,Wt.depth);for(let nn=0,ct=ls.length;nn<ct;nn++)gn=ls[nn],ke.format!==tp?ss!==null?Ws?n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,nn,0,0,0,gn.width,gn.height,Wt.depth,ss,gn.data,0,0):n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,nn,Un,gn.width,gn.height,Wt.depth,0,gn.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ws?n.texSubImage3D(e.TEXTURE_2D_ARRAY,nn,0,0,0,gn.width,gn.height,Wt.depth,ss,$n,gn.data):n.texImage3D(e.TEXTURE_2D_ARRAY,nn,Un,gn.width,gn.height,Wt.depth,0,ss,$n,gn.data)}else{Ws&&yn&&n.texStorage2D(e.TEXTURE_2D,Sn,Un,ls[0].width,ls[0].height);for(let nn=0,ct=ls.length;nn<ct;nn++)gn=ls[nn],ke.format!==tp?ss!==null?Ws?n.compressedTexSubImage2D(e.TEXTURE_2D,nn,0,0,gn.width,gn.height,ss,gn.data):n.compressedTexImage2D(e.TEXTURE_2D,nn,Un,gn.width,gn.height,0,gn.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ws?n.texSubImage2D(e.TEXTURE_2D,nn,0,0,gn.width,gn.height,ss,$n,gn.data):n.texImage2D(e.TEXTURE_2D,nn,Un,gn.width,gn.height,0,ss,$n,gn.data)}else if(ke.isDataArrayTexture)Ws?(yn&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Sn,Un,Wt.width,Wt.height,Wt.depth),n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Wt.width,Wt.height,Wt.depth,ss,$n,Wt.data)):n.texImage3D(e.TEXTURE_2D_ARRAY,0,Un,Wt.width,Wt.height,Wt.depth,0,ss,$n,Wt.data);else if(ke.isData3DTexture)Ws?(yn&&n.texStorage3D(e.TEXTURE_3D,Sn,Un,Wt.width,Wt.height,Wt.depth),n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Wt.width,Wt.height,Wt.depth,ss,$n,Wt.data)):n.texImage3D(e.TEXTURE_3D,0,Un,Wt.width,Wt.height,Wt.depth,0,ss,$n,Wt.data);else if(ke.isFramebufferTexture){if(yn)if(Ws)n.texStorage2D(e.TEXTURE_2D,Sn,Un,Wt.width,Wt.height);else{let nn=Wt.width,ct=Wt.height;for(let Zt=0;Zt<Sn;Zt++)n.texImage2D(e.TEXTURE_2D,Zt,Un,nn,ct,0,ss,$n,null),nn>>=1,ct>>=1}}else if(ls.length>0&&Ms){Ws&&yn&&n.texStorage2D(e.TEXTURE_2D,Sn,Un,ls[0].width,ls[0].height);for(let nn=0,ct=ls.length;nn<ct;nn++)gn=ls[nn],Ws?n.texSubImage2D(e.TEXTURE_2D,nn,0,0,ss,$n,gn):n.texImage2D(e.TEXTURE_2D,nn,Un,ss,$n,gn);ke.generateMipmaps=!1}else Ws?(yn&&n.texStorage2D(e.TEXTURE_2D,Sn,Un,Wt.width,Wt.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,ss,$n,Wt)):n.texImage2D(e.TEXTURE_2D,0,Un,ss,$n,Wt);Ie(ke,Ms)&&ce(Qt),Pn.__version=jt.version,ke.onUpdate&&ke.onUpdate(ke)}$e.__version=ke.version}function Dn($e,ke,gt){if(ke.image.length!==6)return;const Qt=Gt($e,ke),$t=ke.source;n.bindTexture(e.TEXTURE_CUBE_MAP,$e.__webglTexture,e.TEXTURE0+gt);const jt=t.get($t);if($t.version!==jt.__version||Qt===!0){n.activeTexture(e.TEXTURE0+gt);const Pn=Wl.getPrimaries(Wl.workingColorSpace),dn=ke.colorSpace===tw?null:Wl.getPrimaries(ke.colorSpace),Tn=ke.colorSpace===tw||Pn===dn?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,ke.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ke.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,ke.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tn);const _n=ke.isCompressedTexture||ke.image[0].isCompressedTexture,zn=ke.image[0]&&ke.image[0].isDataTexture,Wt=[];for(let nn=0;nn<6;nn++)!_n&&!zn?Wt[nn]=re(ke.image[nn],!1,!0,u.maxCubemapSize):Wt[nn]=zn?ke.image[nn].image:ke.image[nn],Wt[nn]=fs(ke,Wt[nn]);const Ms=Wt[0],ss=J(Ms)||d,$n=o.convert(ke.format,ke.colorSpace),Un=o.convert(ke.type),gn=ae(ke.internalFormat,$n,Un,ke.colorSpace),ls=d&&ke.isVideoTexture!==!0,Ws=jt.__version===void 0||Qt===!0;let yn=me(ke,Ms,ss);Nt(e.TEXTURE_CUBE_MAP,ke,ss);let Sn;if(_n){ls&&Ws&&n.texStorage2D(e.TEXTURE_CUBE_MAP,yn,gn,Ms.width,Ms.height);for(let nn=0;nn<6;nn++){Sn=Wt[nn].mipmaps;for(let ct=0;ct<Sn.length;ct++){const Zt=Sn[ct];ke.format!==tp?$n!==null?ls?n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct,0,0,Zt.width,Zt.height,$n,Zt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct,gn,Zt.width,Zt.height,0,Zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ls?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct,0,0,Zt.width,Zt.height,$n,Un,Zt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct,gn,Zt.width,Zt.height,0,$n,Un,Zt.data)}}}else{Sn=ke.mipmaps,ls&&Ws&&(Sn.length>0&&yn++,n.texStorage2D(e.TEXTURE_CUBE_MAP,yn,gn,Wt[0].width,Wt[0].height));for(let nn=0;nn<6;nn++)if(zn){ls?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,0,0,0,Wt[nn].width,Wt[nn].height,$n,Un,Wt[nn].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,0,gn,Wt[nn].width,Wt[nn].height,0,$n,Un,Wt[nn].data);for(let ct=0;ct<Sn.length;ct++){const rn=Sn[ct].image[nn].image;ls?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct+1,0,0,rn.width,rn.height,$n,Un,rn.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct+1,gn,rn.width,rn.height,0,$n,Un,rn.data)}}else{ls?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,0,0,0,$n,Un,Wt[nn]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,0,gn,$n,Un,Wt[nn]);for(let ct=0;ct<Sn.length;ct++){const Zt=Sn[ct];ls?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct+1,0,0,$n,Un,Zt.image[nn]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nn,ct+1,gn,$n,Un,Zt.image[nn])}}}Ie(ke,ss)&&ce(e.TEXTURE_CUBE_MAP),jt.__version=$t.version,ke.onUpdate&&ke.onUpdate(ke)}$e.__version=ke.version}function An($e,ke,gt,Qt,$t,jt){const Pn=o.convert(gt.format,gt.colorSpace),dn=o.convert(gt.type),Tn=ae(gt.internalFormat,Pn,dn,gt.colorSpace);if(!t.get(ke).__hasExternalTextures){const zn=Math.max(1,ke.width>>jt),Wt=Math.max(1,ke.height>>jt);$t===e.TEXTURE_3D||$t===e.TEXTURE_2D_ARRAY?n.texImage3D($t,jt,Tn,zn,Wt,ke.depth,0,Pn,dn,null):n.texImage2D($t,jt,Tn,zn,Wt,0,Pn,dn,null)}n.bindFramebuffer(e.FRAMEBUFFER,$e),pn(ke)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Qt,$t,t.get(gt).__webglTexture,0,Wn(ke)):($t===e.TEXTURE_2D||$t>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$t<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Qt,$t,t.get(gt).__webglTexture,jt),n.bindFramebuffer(e.FRAMEBUFFER,null)}function En($e,ke,gt){if(e.bindRenderbuffer(e.RENDERBUFFER,$e),ke.depthBuffer&&!ke.stencilBuffer){let Qt=d===!0?e.DEPTH_COMPONENT24:e.DEPTH_COMPONENT16;if(gt||pn(ke)){const $t=ke.depthTexture;$t&&$t.isDepthTexture&&($t.type===QS?Qt=e.DEPTH_COMPONENT32F:$t.type===KS&&(Qt=e.DEPTH_COMPONENT24));const jt=Wn(ke);pn(ke)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,jt,Qt,ke.width,ke.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,jt,Qt,ke.width,ke.height)}else e.renderbufferStorage(e.RENDERBUFFER,Qt,ke.width,ke.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,$e)}else if(ke.depthBuffer&&ke.stencilBuffer){const Qt=Wn(ke);gt&&pn(ke)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Qt,e.DEPTH24_STENCIL8,ke.width,ke.height):pn(ke)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Qt,e.DEPTH24_STENCIL8,ke.width,ke.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,ke.width,ke.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,$e)}else{const Qt=ke.isWebGLMultipleRenderTargets===!0?ke.texture:[ke.texture];for(let $t=0;$t<Qt.length;$t++){const jt=Qt[$t],Pn=o.convert(jt.format,jt.colorSpace),dn=o.convert(jt.type),Tn=ae(jt.internalFormat,Pn,dn,jt.colorSpace),_n=Wn(ke);gt&&pn(ke)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_n,Tn,ke.width,ke.height):pn(ke)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_n,Tn,ke.width,ke.height):e.renderbufferStorage(e.RENDERBUFFER,Tn,ke.width,ke.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Gn($e,ke){if(ke&&ke.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,$e),!(ke.depthTexture&&ke.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(ke.depthTexture).__webglTexture||ke.depthTexture.image.width!==ke.width||ke.depthTexture.image.height!==ke.height)&&(ke.depthTexture.image.width=ke.width,ke.depthTexture.image.height=ke.height,ke.depthTexture.needsUpdate=!0),ot(ke.depthTexture,0);const Qt=t.get(ke.depthTexture).__webglTexture,$t=Wn(ke);if(ke.depthTexture.format===HO)pn(ke)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Qt,0,$t):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Qt,0);else if(ke.depthTexture.format===q9)pn(ke)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Qt,0,$t):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Qt,0);else throw new Error("Unknown depthTexture format")}function Xt($e){const ke=t.get($e),gt=$e.isWebGLCubeRenderTarget===!0;if($e.depthTexture&&!ke.__autoAllocateDepthBuffer){if(gt)throw new Error("target.depthTexture not supported in Cube render targets");Gn(ke.__webglFramebuffer,$e)}else if(gt){ke.__webglDepthbuffer=[];for(let Qt=0;Qt<6;Qt++)n.bindFramebuffer(e.FRAMEBUFFER,ke.__webglFramebuffer[Qt]),ke.__webglDepthbuffer[Qt]=e.createRenderbuffer(),En(ke.__webglDepthbuffer[Qt],$e,!1)}else n.bindFramebuffer(e.FRAMEBUFFER,ke.__webglFramebuffer),ke.__webglDepthbuffer=e.createRenderbuffer(),En(ke.__webglDepthbuffer,$e,!1);n.bindFramebuffer(e.FRAMEBUFFER,null)}function qn($e,ke,gt){const Qt=t.get($e);ke!==void 0&&An(Qt.__webglFramebuffer,$e,$e.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),gt!==void 0&&Xt($e)}function Tt($e){const ke=$e.texture,gt=t.get($e),Qt=t.get(ke);$e.addEventListener("dispose",Me),$e.isWebGLMultipleRenderTargets!==!0&&(Qt.__webglTexture===void 0&&(Qt.__webglTexture=e.createTexture()),Qt.__version=ke.version,f.memory.textures++);const $t=$e.isWebGLCubeRenderTarget===!0,jt=$e.isWebGLMultipleRenderTargets===!0,Pn=J($e)||d;if($t){gt.__webglFramebuffer=[];for(let dn=0;dn<6;dn++)if(d&&ke.mipmaps&&ke.mipmaps.length>0){gt.__webglFramebuffer[dn]=[];for(let Tn=0;Tn<ke.mipmaps.length;Tn++)gt.__webglFramebuffer[dn][Tn]=e.createFramebuffer()}else gt.__webglFramebuffer[dn]=e.createFramebuffer()}else{if(d&&ke.mipmaps&&ke.mipmaps.length>0){gt.__webglFramebuffer=[];for(let dn=0;dn<ke.mipmaps.length;dn++)gt.__webglFramebuffer[dn]=e.createFramebuffer()}else gt.__webglFramebuffer=e.createFramebuffer();if(jt)if(u.drawBuffers){const dn=$e.texture;for(let Tn=0,_n=dn.length;Tn<_n;Tn++){const zn=t.get(dn[Tn]);zn.__webglTexture===void 0&&(zn.__webglTexture=e.createTexture(),f.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(d&&$e.samples>0&&pn($e)===!1){const dn=jt?ke:[ke];gt.__webglMultisampledFramebuffer=e.createFramebuffer(),gt.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,gt.__webglMultisampledFramebuffer);for(let Tn=0;Tn<dn.length;Tn++){const _n=dn[Tn];gt.__webglColorRenderbuffer[Tn]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,gt.__webglColorRenderbuffer[Tn]);const zn=o.convert(_n.format,_n.colorSpace),Wt=o.convert(_n.type),Ms=ae(_n.internalFormat,zn,Wt,_n.colorSpace,$e.isXRRenderTarget===!0),ss=Wn($e);e.renderbufferStorageMultisample(e.RENDERBUFFER,ss,Ms,$e.width,$e.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Tn,e.RENDERBUFFER,gt.__webglColorRenderbuffer[Tn])}e.bindRenderbuffer(e.RENDERBUFFER,null),$e.depthBuffer&&(gt.__webglDepthRenderbuffer=e.createRenderbuffer(),En(gt.__webglDepthRenderbuffer,$e,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if($t){n.bindTexture(e.TEXTURE_CUBE_MAP,Qt.__webglTexture),Nt(e.TEXTURE_CUBE_MAP,ke,Pn);for(let dn=0;dn<6;dn++)if(d&&ke.mipmaps&&ke.mipmaps.length>0)for(let Tn=0;Tn<ke.mipmaps.length;Tn++)An(gt.__webglFramebuffer[dn][Tn],$e,ke,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+dn,Tn);else An(gt.__webglFramebuffer[dn],$e,ke,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+dn,0);Ie(ke,Pn)&&ce(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(jt){const dn=$e.texture;for(let Tn=0,_n=dn.length;Tn<_n;Tn++){const zn=dn[Tn],Wt=t.get(zn);n.bindTexture(e.TEXTURE_2D,Wt.__webglTexture),Nt(e.TEXTURE_2D,zn,Pn),An(gt.__webglFramebuffer,$e,zn,e.COLOR_ATTACHMENT0+Tn,e.TEXTURE_2D,0),Ie(zn,Pn)&&ce(e.TEXTURE_2D)}n.unbindTexture()}else{let dn=e.TEXTURE_2D;if(($e.isWebGL3DRenderTarget||$e.isWebGLArrayRenderTarget)&&(d?dn=$e.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(dn,Qt.__webglTexture),Nt(dn,ke,Pn),d&&ke.mipmaps&&ke.mipmaps.length>0)for(let Tn=0;Tn<ke.mipmaps.length;Tn++)An(gt.__webglFramebuffer[Tn],$e,ke,e.COLOR_ATTACHMENT0,dn,Tn);else An(gt.__webglFramebuffer,$e,ke,e.COLOR_ATTACHMENT0,dn,0);Ie(ke,Pn)&&ce(dn),n.unbindTexture()}$e.depthBuffer&&Xt($e)}function Gs($e){const ke=J($e)||d,gt=$e.isWebGLMultipleRenderTargets===!0?$e.texture:[$e.texture];for(let Qt=0,$t=gt.length;Qt<$t;Qt++){const jt=gt[Qt];if(Ie(jt,ke)){const Pn=$e.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,dn=t.get(jt).__webglTexture;n.bindTexture(Pn,dn),ce(Pn),n.unbindTexture()}}}function Hn($e){if(d&&$e.samples>0&&pn($e)===!1){const ke=$e.isWebGLMultipleRenderTargets?$e.texture:[$e.texture],gt=$e.width,Qt=$e.height;let $t=e.COLOR_BUFFER_BIT;const jt=[],Pn=$e.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,dn=t.get($e),Tn=$e.isWebGLMultipleRenderTargets===!0;if(Tn)for(let _n=0;_n<ke.length;_n++)n.bindFramebuffer(e.FRAMEBUFFER,dn.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_n,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,dn.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_n,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,dn.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,dn.__webglFramebuffer);for(let _n=0;_n<ke.length;_n++){jt.push(e.COLOR_ATTACHMENT0+_n),$e.depthBuffer&&jt.push(Pn);const zn=dn.__ignoreDepthValues!==void 0?dn.__ignoreDepthValues:!1;if(zn===!1&&($e.depthBuffer&&($t|=e.DEPTH_BUFFER_BIT),$e.stencilBuffer&&($t|=e.STENCIL_BUFFER_BIT)),Tn&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,dn.__webglColorRenderbuffer[_n]),zn===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[Pn]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[Pn])),Tn){const Wt=t.get(ke[_n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Wt,0)}e.blitFramebuffer(0,0,gt,Qt,0,0,gt,Qt,$t,e.NEAREST),D&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,jt)}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Tn)for(let _n=0;_n<ke.length;_n++){n.bindFramebuffer(e.FRAMEBUFFER,dn.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_n,e.RENDERBUFFER,dn.__webglColorRenderbuffer[_n]);const zn=t.get(ke[_n]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,dn.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_n,e.TEXTURE_2D,zn,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,dn.__webglMultisampledFramebuffer)}}function Wn($e){return Math.min(u.maxSamples,$e.samples)}function pn($e){const ke=t.get($e);return d&&$e.samples>0&&s.has("WEBGL_multisampled_render_to_texture")===!0&&ke.__useRenderToTexture!==!1}function Ps($e){const ke=f.render.frame;P.get($e)!==ke&&(P.set($e,ke),$e.update())}function fs($e,ke){const gt=$e.colorSpace,Qt=$e.format,$t=$e.type;return $e.isCompressedTexture===!0||$e.isVideoTexture===!0||$e.format===dj||gt!==uA&&gt!==tw&&(Wl.getTransfer(gt)===Pr?d===!1?s.has("EXT_sRGB")===!0&&Qt===tp?($e.format=dj,$e.minFilter=v5,$e.generateMipmaps=!1):ke=dX.sRGBToLinear(ke):(Qt!==tp||$t!==lN)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",gt)),ke}this.allocateTextureUnit=Ze,this.resetTextureUnits=lt,this.setTexture2D=ot,this.setTexture2DArray=yt,this.setTexture3D=Rt,this.setTextureCube=Ct,this.rebindTextures=qn,this.setupRenderTarget=Tt,this.updateRenderTargetMipmap=Gs,this.updateMultisampleRenderTarget=Hn,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=An,this.useMultisampledRTT=pn}function boe(e,s,n){const t=n.isWebGL2;function u(o,f=tw){let d;const m=Wl.getTransfer(f);if(o===lN)return e.UNSIGNED_BYTE;if(o===nX)return e.UNSIGNED_SHORT_4_4_4_4;if(o===sX)return e.UNSIGNED_SHORT_5_5_5_1;if(o===vse)return e.BYTE;if(o===ele)return e.SHORT;if(o===Pk)return e.UNSIGNED_SHORT;if(o===tX)return e.INT;if(o===KS)return e.UNSIGNED_INT;if(o===QS)return e.FLOAT;if(o===zF)return t?e.HALF_FLOAT:(d=s.get("OES_texture_half_float"),d!==null?d.HALF_FLOAT_OES:null);if(o===tle)return e.ALPHA;if(o===tp)return e.RGBA;if(o===nle)return e.LUMINANCE;if(o===sle)return e.LUMINANCE_ALPHA;if(o===HO)return e.DEPTH_COMPONENT;if(o===q9)return e.DEPTH_STENCIL;if(o===dj)return d=s.get("EXT_sRGB"),d!==null?d.SRGB_ALPHA_EXT:null;if(o===lle)return e.RED;if(o===lX)return e.RED_INTEGER;if(o===rle)return e.RG;if(o===rX)return e.RG_INTEGER;if(o===iX)return e.RGBA_INTEGER;if(o===UY||o===BY||o===HY||o===FY)if(m===Pr)if(d=s.get("WEBGL_compressed_texture_s3tc_srgb"),d!==null){if(o===UY)return d.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===BY)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===HY)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===FY)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(d=s.get("WEBGL_compressed_texture_s3tc"),d!==null){if(o===UY)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===BY)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===HY)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===FY)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===U$||o===B$||o===H$||o===F$)if(d=s.get("WEBGL_compressed_texture_pvrtc"),d!==null){if(o===U$)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===B$)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===H$)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===F$)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===uX)return d=s.get("WEBGL_compressed_texture_etc1"),d!==null?d.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===G$||o===_$)if(d=s.get("WEBGL_compressed_texture_etc"),d!==null){if(o===G$)return m===Pr?d.COMPRESSED_SRGB8_ETC2:d.COMPRESSED_RGB8_ETC2;if(o===_$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:d.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===V$||o===W$||o===Y$||o===z$||o===j$||o===k$||o===q$||o===$$||o===K$||o===Q$||o===Z$||o===J$||o===X$||o===v$)if(d=s.get("WEBGL_compressed_texture_astc"),d!==null){if(o===V$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:d.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===W$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:d.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Y$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:d.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===z$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:d.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===j$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:d.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===k$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:d.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===q$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:d.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===$$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:d.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===K$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:d.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Q$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:d.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Z$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:d.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===J$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:d.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===X$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:d.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===v$)return m===Pr?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:d.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===GY||o===eK||o===tK)if(d=s.get("EXT_texture_compression_bptc"),d!==null){if(o===GY)return m===Pr?d.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:d.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===eK)return d.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===tK)return d.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===ile||o===nK||o===sK||o===lK)if(d=s.get("EXT_texture_compression_rgtc"),d!==null){if(o===GY)return d.COMPRESSED_RED_RGTC1_EXT;if(o===nK)return d.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===sK)return d.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===lK)return d.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===BO?t?e.UNSIGNED_INT_24_8:(d=s.get("WEBGL_depth_texture"),d!==null?d.UNSIGNED_INT_24_8_WEBGL:null):e[o]!==void 0?e[o]:null}return{convert:u}}class Coe extends ew{constructor(s=[]){super(),this.isArrayCamera=!0,this.cameras=s}}class qH extends wa{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Poe={type:"move"};class uz{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qH,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qH,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ze,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ze),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qH,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ze,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ze),this._grip}dispatchEvent(s){return this._targetRay!==null&&this._targetRay.dispatchEvent(s),this._grip!==null&&this._grip.dispatchEvent(s),this._hand!==null&&this._hand.dispatchEvent(s),this}connect(s){if(s&&s.hand){const n=this._hand;if(n)for(const t of s.hand.values())this._getHandJoint(n,t)}return this.dispatchEvent({type:"connected",data:s}),this}disconnect(s){return this.dispatchEvent({type:"disconnected",data:s}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(s,n,t){let u=null,o=null,f=null;const d=this._targetRay,m=this._grip,D=this._hand;if(s&&n.session.visibilityState!=="visible-blurred"){if(D&&s.hand){f=!0;for(const re of s.hand.values()){const J=n.getJointPose(re,t),K=this._getHandJoint(D,re);J!==null&&(K.matrix.fromArray(J.transform.matrix),K.matrix.decompose(K.position,K.rotation,K.scale),K.matrixWorldNeedsUpdate=!0,K.jointRadius=J.radius),K.visible=J!==null}const P=D.joints["index-finger-tip"],x=D.joints["thumb-tip"],H=P.position.distanceTo(x.position),_=.02,ne=.005;D.inputState.pinching&&H>_+ne?(D.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:s.handedness,target:this})):!D.inputState.pinching&&H<=_-ne&&(D.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:s.handedness,target:this}))}else m!==null&&s.gripSpace&&(o=n.getPose(s.gripSpace,t),o!==null&&(m.matrix.fromArray(o.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,o.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(o.linearVelocity)):m.hasLinearVelocity=!1,o.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(o.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(u=n.getPose(s.targetRaySpace,t),u===null&&o!==null&&(u=o),u!==null&&(d.matrix.fromArray(u.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,u.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(u.linearVelocity)):d.hasLinearVelocity=!1,u.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(u.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(Poe)))}return d!==null&&(d.visible=u!==null),m!==null&&(m.visible=o!==null),D!==null&&(D.visible=f!==null),this}_getHandJoint(s,n){if(s.joints[n.jointName]===void 0){const t=new qH;t.matrixAutoUpdate=!1,t.visible=!1,s.joints[n.jointName]=t,s.add(t)}return s.joints[n.jointName]}}class Moe extends IM{constructor(s,n){super();const t=this;let u=null,o=1,f=null,d="local-floor",m=1,D=null,P=null,x=null,H=null,_=null,ne=null;const re=n.getContextAttributes();let J=null,K=null;const Ie=[],ce=[],ae=new us;let me=null;const Ee=new ew;Ee.layers.enable(1),Ee.viewport=new Uc;const Ae=new ew;Ae.layers.enable(2),Ae.viewport=new Uc;const Me=[Ee,Ae],we=new Coe;we.layers.enable(1),we.layers.enable(2);let Te=null,je=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Nt){let Gt=Ie[Nt];return Gt===void 0&&(Gt=new uz,Ie[Nt]=Gt),Gt.getTargetRaySpace()},this.getControllerGrip=function(Nt){let Gt=Ie[Nt];return Gt===void 0&&(Gt=new uz,Ie[Nt]=Gt),Gt.getGripSpace()},this.getHand=function(Nt){let Gt=Ie[Nt];return Gt===void 0&&(Gt=new uz,Ie[Nt]=Gt),Gt.getHandSpace()};function Ke(Nt){const Gt=ce.indexOf(Nt.inputSource);if(Gt===-1)return;const en=Ie[Gt];en!==void 0&&(en.update(Nt.inputSource,Nt.frame,D||f),en.dispatchEvent({type:Nt.type,data:Nt.inputSource}))}function lt(){u.removeEventListener("select",Ke),u.removeEventListener("selectstart",Ke),u.removeEventListener("selectend",Ke),u.removeEventListener("squeeze",Ke),u.removeEventListener("squeezestart",Ke),u.removeEventListener("squeezeend",Ke),u.removeEventListener("end",lt),u.removeEventListener("inputsourceschange",Ze);for(let Nt=0;Nt<Ie.length;Nt++){const Gt=ce[Nt];Gt!==null&&(ce[Nt]=null,Ie[Nt].disconnect(Gt))}Te=null,je=null,s.setRenderTarget(J),_=null,H=null,x=null,u=null,K=null,Ft.stop(),t.isPresenting=!1,s.setPixelRatio(me),s.setSize(ae.width,ae.height,!1),t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Nt){o=Nt,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Nt){d=Nt,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return D||f},this.setReferenceSpace=function(Nt){D=Nt},this.getBaseLayer=function(){return H!==null?H:_},this.getBinding=function(){return x},this.getFrame=function(){return ne},this.getSession=function(){return u},this.setSession=async function(Nt){if(u=Nt,u!==null){if(J=s.getRenderTarget(),u.addEventListener("select",Ke),u.addEventListener("selectstart",Ke),u.addEventListener("selectend",Ke),u.addEventListener("squeeze",Ke),u.addEventListener("squeezestart",Ke),u.addEventListener("squeezeend",Ke),u.addEventListener("end",lt),u.addEventListener("inputsourceschange",Ze),re.xrCompatible!==!0&&await n.makeXRCompatible(),me=s.getPixelRatio(),s.getSize(ae),u.renderState.layers===void 0||s.capabilities.isWebGL2===!1){const Gt={antialias:u.renderState.layers===void 0?re.antialias:!0,alpha:!0,depth:re.depth,stencil:re.stencil,framebufferScaleFactor:o};_=new XRWebGLLayer(u,n,Gt),u.updateRenderState({baseLayer:_}),s.setPixelRatio(1),s.setSize(_.framebufferWidth,_.framebufferHeight,!1),K=new aA(_.framebufferWidth,_.framebufferHeight,{format:tp,type:lN,colorSpace:s.outputColorSpace,stencilBuffer:re.stencil})}else{let Gt=null,en=null,Dn=null;re.depth&&(Dn=re.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Gt=re.stencil?q9:HO,en=re.stencil?BO:KS);const An={colorFormat:n.RGBA8,depthFormat:Dn,scaleFactor:o};x=new XRWebGLBinding(u,n),H=x.createProjectionLayer(An),u.updateRenderState({layers:[H]}),s.setPixelRatio(1),s.setSize(H.textureWidth,H.textureHeight,!1),K=new aA(H.textureWidth,H.textureHeight,{format:tp,type:lN,depthTexture:new DX(H.textureWidth,H.textureHeight,en,void 0,void 0,void 0,void 0,void 0,void 0,Gt),stencilBuffer:re.stencil,colorSpace:s.outputColorSpace,samples:re.antialias?4:0});const En=s.properties.get(K);En.__ignoreDepthValues=H.ignoreDepthValues}K.isXRRenderTarget=!0,this.setFoveation(m),D=null,f=await u.requestReferenceSpace(d),Ft.setContext(u),Ft.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(u!==null)return u.environmentBlendMode};function Ze(Nt){for(let Gt=0;Gt<Nt.removed.length;Gt++){const en=Nt.removed[Gt],Dn=ce.indexOf(en);Dn>=0&&(ce[Dn]=null,Ie[Dn].disconnect(en))}for(let Gt=0;Gt<Nt.added.length;Gt++){const en=Nt.added[Gt];let Dn=ce.indexOf(en);if(Dn===-1){for(let En=0;En<Ie.length;En++)if(En>=ce.length){ce.push(en),Dn=En;break}else if(ce[En]===null){ce[En]=en,Dn=En;break}if(Dn===-1)break}const An=Ie[Dn];An&&An.connect(en)}}const it=new ze,ot=new ze;function yt(Nt,Gt,en){it.setFromMatrixPosition(Gt.matrixWorld),ot.setFromMatrixPosition(en.matrixWorld);const Dn=it.distanceTo(ot),An=Gt.projectionMatrix.elements,En=en.projectionMatrix.elements,Gn=An[14]/(An[10]-1),Xt=An[14]/(An[10]+1),qn=(An[9]+1)/An[5],Tt=(An[9]-1)/An[5],Gs=(An[8]-1)/An[0],Hn=(En[8]+1)/En[0],Wn=Gn*Gs,pn=Gn*Hn,Ps=Dn/(-Gs+Hn),fs=Ps*-Gs;Gt.matrixWorld.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.translateX(fs),Nt.translateZ(Ps),Nt.matrixWorld.compose(Nt.position,Nt.quaternion,Nt.scale),Nt.matrixWorldInverse.copy(Nt.matrixWorld).invert();const $e=Gn+Ps,ke=Xt+Ps,gt=Wn-fs,Qt=pn+(Dn-fs),$t=qn*Xt/ke*$e,jt=Tt*Xt/ke*$e;Nt.projectionMatrix.makePerspective(gt,Qt,$t,jt,$e,ke),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert()}function Rt(Nt,Gt){Gt===null?Nt.matrixWorld.copy(Nt.matrix):Nt.matrixWorld.multiplyMatrices(Gt.matrixWorld,Nt.matrix),Nt.matrixWorldInverse.copy(Nt.matrixWorld).invert()}this.updateCamera=function(Nt){if(u===null)return;we.near=Ae.near=Ee.near=Nt.near,we.far=Ae.far=Ee.far=Nt.far,(Te!==we.near||je!==we.far)&&(u.updateRenderState({depthNear:we.near,depthFar:we.far}),Te=we.near,je=we.far);const Gt=Nt.parent,en=we.cameras;Rt(we,Gt);for(let Dn=0;Dn<en.length;Dn++)Rt(en[Dn],Gt);en.length===2?yt(we,Ee,Ae):we.projectionMatrix.copy(Ee.projectionMatrix),Ct(Nt,we,Gt)};function Ct(Nt,Gt,en){en===null?Nt.matrix.copy(Gt.matrixWorld):(Nt.matrix.copy(en.matrixWorld),Nt.matrix.invert(),Nt.matrix.multiply(Gt.matrixWorld)),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.updateMatrixWorld(!0),Nt.projectionMatrix.copy(Gt.projectionMatrix),Nt.projectionMatrixInverse.copy(Gt.projectionMatrixInverse),Nt.isPerspectiveCamera&&(Nt.fov=jF*2*Math.atan(1/Nt.projectionMatrix.elements[5]),Nt.zoom=1)}this.getCamera=function(){return we},this.getFoveation=function(){if(!(H===null&&_===null))return m},this.setFoveation=function(Nt){m=Nt,H!==null&&(H.fixedFoveation=Nt),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Nt)};let Bt=null;function Ut(Nt,Gt){if(P=Gt.getViewerPose(D||f),ne=Gt,P!==null){const en=P.views;_!==null&&(s.setRenderTargetFramebuffer(K,_.framebuffer),s.setRenderTarget(K));let Dn=!1;en.length!==we.cameras.length&&(we.cameras.length=0,Dn=!0);for(let An=0;An<en.length;An++){const En=en[An];let Gn=null;if(_!==null)Gn=_.getViewport(En);else{const qn=x.getViewSubImage(H,En);Gn=qn.viewport,An===0&&(s.setRenderTargetTextures(K,qn.colorTexture,H.ignoreDepthValues?void 0:qn.depthStencilTexture),s.setRenderTarget(K))}let Xt=Me[An];Xt===void 0&&(Xt=new ew,Xt.layers.enable(An),Xt.viewport=new Uc,Me[An]=Xt),Xt.matrix.fromArray(En.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(En.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(Gn.x,Gn.y,Gn.width,Gn.height),An===0&&(we.matrix.copy(Xt.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale)),Dn===!0&&we.cameras.push(Xt)}}for(let en=0;en<Ie.length;en++){const Dn=ce[en],An=Ie[en];Dn!==null&&An!==void 0&&An.update(Dn,Gt,D||f)}Bt&&Bt(Nt,Gt),Gt.detectedPlanes&&t.dispatchEvent({type:"planesdetected",data:Gt}),ne=null}const Ft=new AX;Ft.setAnimationLoop(Ut),this.setAnimationLoop=function(Nt){Bt=Nt},this.dispose=function(){}}}function xoe(e,s){function n(J,K){J.matrixAutoUpdate===!0&&J.updateMatrix(),K.value.copy(J.matrix)}function t(J,K){K.color.getRGB(J.fogColor.value,TX(e)),K.isFog?(J.fogNear.value=K.near,J.fogFar.value=K.far):K.isFogExp2&&(J.fogDensity.value=K.density)}function u(J,K,Ie,ce,ae){K.isMeshBasicMaterial||K.isMeshLambertMaterial?o(J,K):K.isMeshToonMaterial?(o(J,K),x(J,K)):K.isMeshPhongMaterial?(o(J,K),P(J,K)):K.isMeshStandardMaterial?(o(J,K),H(J,K),K.isMeshPhysicalMaterial&&_(J,K,ae)):K.isMeshMatcapMaterial?(o(J,K),ne(J,K)):K.isMeshDepthMaterial?o(J,K):K.isMeshDistanceMaterial?(o(J,K),re(J,K)):K.isMeshNormalMaterial?o(J,K):K.isLineBasicMaterial?(f(J,K),K.isLineDashedMaterial&&d(J,K)):K.isPointsMaterial?m(J,K,Ie,ce):K.isSpriteMaterial?D(J,K):K.isShadowMaterial?(J.color.value.copy(K.color),J.opacity.value=K.opacity):K.isShaderMaterial&&(K.uniformsNeedUpdate=!1)}function o(J,K){J.opacity.value=K.opacity,K.color&&J.diffuse.value.copy(K.color),K.emissive&&J.emissive.value.copy(K.emissive).multiplyScalar(K.emissiveIntensity),K.map&&(J.map.value=K.map,n(K.map,J.mapTransform)),K.alphaMap&&(J.alphaMap.value=K.alphaMap,n(K.alphaMap,J.alphaMapTransform)),K.bumpMap&&(J.bumpMap.value=K.bumpMap,n(K.bumpMap,J.bumpMapTransform),J.bumpScale.value=K.bumpScale,K.side===YI&&(J.bumpScale.value*=-1)),K.normalMap&&(J.normalMap.value=K.normalMap,n(K.normalMap,J.normalMapTransform),J.normalScale.value.copy(K.normalScale),K.side===YI&&J.normalScale.value.negate()),K.displacementMap&&(J.displacementMap.value=K.displacementMap,n(K.displacementMap,J.displacementMapTransform),J.displacementScale.value=K.displacementScale,J.displacementBias.value=K.displacementBias),K.emissiveMap&&(J.emissiveMap.value=K.emissiveMap,n(K.emissiveMap,J.emissiveMapTransform)),K.specularMap&&(J.specularMap.value=K.specularMap,n(K.specularMap,J.specularMapTransform)),K.alphaTest>0&&(J.alphaTest.value=K.alphaTest);const Ie=s.get(K).envMap;if(Ie&&(J.envMap.value=Ie,J.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1,J.reflectivity.value=K.reflectivity,J.ior.value=K.ior,J.refractionRatio.value=K.refractionRatio),K.lightMap){J.lightMap.value=K.lightMap;const ce=e._useLegacyLights===!0?Math.PI:1;J.lightMapIntensity.value=K.lightMapIntensity*ce,n(K.lightMap,J.lightMapTransform)}K.aoMap&&(J.aoMap.value=K.aoMap,J.aoMapIntensity.value=K.aoMapIntensity,n(K.aoMap,J.aoMapTransform))}function f(J,K){J.diffuse.value.copy(K.color),J.opacity.value=K.opacity,K.map&&(J.map.value=K.map,n(K.map,J.mapTransform))}function d(J,K){J.dashSize.value=K.dashSize,J.totalSize.value=K.dashSize+K.gapSize,J.scale.value=K.scale}function m(J,K,Ie,ce){J.diffuse.value.copy(K.color),J.opacity.value=K.opacity,J.size.value=K.size*Ie,J.scale.value=ce*.5,K.map&&(J.map.value=K.map,n(K.map,J.uvTransform)),K.alphaMap&&(J.alphaMap.value=K.alphaMap,n(K.alphaMap,J.alphaMapTransform)),K.alphaTest>0&&(J.alphaTest.value=K.alphaTest)}function D(J,K){J.diffuse.value.copy(K.color),J.opacity.value=K.opacity,J.rotation.value=K.rotation,K.map&&(J.map.value=K.map,n(K.map,J.mapTransform)),K.alphaMap&&(J.alphaMap.value=K.alphaMap,n(K.alphaMap,J.alphaMapTransform)),K.alphaTest>0&&(J.alphaTest.value=K.alphaTest)}function P(J,K){J.specular.value.copy(K.specular),J.shininess.value=Math.max(K.shininess,1e-4)}function x(J,K){K.gradientMap&&(J.gradientMap.value=K.gradientMap)}function H(J,K){J.metalness.value=K.metalness,K.metalnessMap&&(J.metalnessMap.value=K.metalnessMap,n(K.metalnessMap,J.metalnessMapTransform)),J.roughness.value=K.roughness,K.roughnessMap&&(J.roughnessMap.value=K.roughnessMap,n(K.roughnessMap,J.roughnessMapTransform)),s.get(K).envMap&&(J.envMapIntensity.value=K.envMapIntensity)}function _(J,K,Ie){J.ior.value=K.ior,K.sheen>0&&(J.sheenColor.value.copy(K.sheenColor).multiplyScalar(K.sheen),J.sheenRoughness.value=K.sheenRoughness,K.sheenColorMap&&(J.sheenColorMap.value=K.sheenColorMap,n(K.sheenColorMap,J.sheenColorMapTransform)),K.sheenRoughnessMap&&(J.sheenRoughnessMap.value=K.sheenRoughnessMap,n(K.sheenRoughnessMap,J.sheenRoughnessMapTransform))),K.clearcoat>0&&(J.clearcoat.value=K.clearcoat,J.clearcoatRoughness.value=K.clearcoatRoughness,K.clearcoatMap&&(J.clearcoatMap.value=K.clearcoatMap,n(K.clearcoatMap,J.clearcoatMapTransform)),K.clearcoatRoughnessMap&&(J.clearcoatRoughnessMap.value=K.clearcoatRoughnessMap,n(K.clearcoatRoughnessMap,J.clearcoatRoughnessMapTransform)),K.clearcoatNormalMap&&(J.clearcoatNormalMap.value=K.clearcoatNormalMap,n(K.clearcoatNormalMap,J.clearcoatNormalMapTransform),J.clearcoatNormalScale.value.copy(K.clearcoatNormalScale),K.side===YI&&J.clearcoatNormalScale.value.negate())),K.iridescence>0&&(J.iridescence.value=K.iridescence,J.iridescenceIOR.value=K.iridescenceIOR,J.iridescenceThicknessMinimum.value=K.iridescenceThicknessRange[0],J.iridescenceThicknessMaximum.value=K.iridescenceThicknessRange[1],K.iridescenceMap&&(J.iridescenceMap.value=K.iridescenceMap,n(K.iridescenceMap,J.iridescenceMapTransform)),K.iridescenceThicknessMap&&(J.iridescenceThicknessMap.value=K.iridescenceThicknessMap,n(K.iridescenceThicknessMap,J.iridescenceThicknessMapTransform))),K.transmission>0&&(J.transmission.value=K.transmission,J.transmissionSamplerMap.value=Ie.texture,J.transmissionSamplerSize.value.set(Ie.width,Ie.height),K.transmissionMap&&(J.transmissionMap.value=K.transmissionMap,n(K.transmissionMap,J.transmissionMapTransform)),J.thickness.value=K.thickness,K.thicknessMap&&(J.thicknessMap.value=K.thicknessMap,n(K.thicknessMap,J.thicknessMapTransform)),J.attenuationDistance.value=K.attenuationDistance,J.attenuationColor.value.copy(K.attenuationColor)),K.anisotropy>0&&(J.anisotropyVector.value.set(K.anisotropy*Math.cos(K.anisotropyRotation),K.anisotropy*Math.sin(K.anisotropyRotation)),K.anisotropyMap&&(J.anisotropyMap.value=K.anisotropyMap,n(K.anisotropyMap,J.anisotropyMapTransform))),J.specularIntensity.value=K.specularIntensity,J.specularColor.value.copy(K.specularColor),K.specularColorMap&&(J.specularColorMap.value=K.specularColorMap,n(K.specularColorMap,J.specularColorMapTransform)),K.specularIntensityMap&&(J.specularIntensityMap.value=K.specularIntensityMap,n(K.specularIntensityMap,J.specularIntensityMapTransform))}function ne(J,K){K.matcap&&(J.matcap.value=K.matcap)}function re(J,K){const Ie=s.get(K).light;J.referencePosition.value.setFromMatrixPosition(Ie.matrixWorld),J.nearDistance.value=Ie.shadow.camera.near,J.farDistance.value=Ie.shadow.camera.far}return{refreshFogUniforms:t,refreshMaterialUniforms:u}}function Uoe(e,s,n,t){let u={},o={},f=[];const d=n.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function m(Ie,ce){const ae=ce.program;t.uniformBlockBinding(Ie,ae)}function D(Ie,ce){let ae=u[Ie.id];ae===void 0&&(ne(Ie),ae=P(Ie),u[Ie.id]=ae,Ie.addEventListener("dispose",J));const me=ce.program;t.updateUBOMapping(Ie,me);const Ee=s.render.frame;o[Ie.id]!==Ee&&(H(Ie),o[Ie.id]=Ee)}function P(Ie){const ce=x();Ie.__bindingPointIndex=ce;const ae=e.createBuffer(),me=Ie.__size,Ee=Ie.usage;return e.bindBuffer(e.UNIFORM_BUFFER,ae),e.bufferData(e.UNIFORM_BUFFER,me,Ee),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,ce,ae),ae}function x(){for(let Ie=0;Ie<d;Ie++)if(f.indexOf(Ie)===-1)return f.push(Ie),Ie;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function H(Ie){const ce=u[Ie.id],ae=Ie.uniforms,me=Ie.__cache;e.bindBuffer(e.UNIFORM_BUFFER,ce);for(let Ee=0,Ae=ae.length;Ee<Ae;Ee++){const Me=Array.isArray(ae[Ee])?ae[Ee]:[ae[Ee]];for(let we=0,Te=Me.length;we<Te;we++){const je=Me[we];if(_(je,Ee,we,me)===!0){const Ke=je.__offset,lt=Array.isArray(je.value)?je.value:[je.value];let Ze=0;for(let it=0;it<lt.length;it++){const ot=lt[it],yt=re(ot);typeof ot=="number"||typeof ot=="boolean"?(je.__data[0]=ot,e.bufferSubData(e.UNIFORM_BUFFER,Ke+Ze,je.__data)):ot.isMatrix3?(je.__data[0]=ot.elements[0],je.__data[1]=ot.elements[1],je.__data[2]=ot.elements[2],je.__data[3]=0,je.__data[4]=ot.elements[3],je.__data[5]=ot.elements[4],je.__data[6]=ot.elements[5],je.__data[7]=0,je.__data[8]=ot.elements[6],je.__data[9]=ot.elements[7],je.__data[10]=ot.elements[8],je.__data[11]=0):(ot.toArray(je.__data,Ze),Ze+=yt.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,Ke,je.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function _(Ie,ce,ae,me){const Ee=Ie.value,Ae=ce+"_"+ae;if(me[Ae]===void 0)return typeof Ee=="number"||typeof Ee=="boolean"?me[Ae]=Ee:me[Ae]=Ee.clone(),!0;{const Me=me[Ae];if(typeof Ee=="number"||typeof Ee=="boolean"){if(Me!==Ee)return me[Ae]=Ee,!0}else if(Me.equals(Ee)===!1)return Me.copy(Ee),!0}return!1}function ne(Ie){const ce=Ie.uniforms;let ae=0;const me=16;for(let Ae=0,Me=ce.length;Ae<Me;Ae++){const we=Array.isArray(ce[Ae])?ce[Ae]:[ce[Ae]];for(let Te=0,je=we.length;Te<je;Te++){const Ke=we[Te],lt=Array.isArray(Ke.value)?Ke.value:[Ke.value];for(let Ze=0,it=lt.length;Ze<it;Ze++){const ot=lt[Ze],yt=re(ot),Rt=ae%me;Rt!==0&&me-Rt<yt.boundary&&(ae+=me-Rt),Ke.__data=new Float32Array(yt.storage/Float32Array.BYTES_PER_ELEMENT),Ke.__offset=ae,ae+=yt.storage}}}const Ee=ae%me;return Ee>0&&(ae+=me-Ee),Ie.__size=ae,Ie.__cache={},this}function re(Ie){const ce={boundary:0,storage:0};return typeof Ie=="number"||typeof Ie=="boolean"?(ce.boundary=4,ce.storage=4):Ie.isVector2?(ce.boundary=8,ce.storage=8):Ie.isVector3||Ie.isColor?(ce.boundary=16,ce.storage=12):Ie.isVector4?(ce.boundary=16,ce.storage=16):Ie.isMatrix3?(ce.boundary=48,ce.storage=48):Ie.isMatrix4?(ce.boundary=64,ce.storage=64):Ie.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",Ie),ce}function J(Ie){const ce=Ie.target;ce.removeEventListener("dispose",J);const ae=f.indexOf(ce.__bindingPointIndex);f.splice(ae,1),e.deleteBuffer(u[ce.id]),delete u[ce.id],delete o[ce.id]}function K(){for(const Ie in u)e.deleteBuffer(u[Ie]);f=[],u={},o={}}return{bind:m,update:D,dispose:K}}class kF{constructor(s={}){const{canvas:n=Ple(),context:t=null,depth:u=!0,stencil:o=!0,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:D=!1,powerPreference:P="default",failIfMajorPerformanceCaveat:x=!1}=s;this.isWebGLRenderer=!0;let H;t!==null?H=t.getContextAttributes().alpha:H=f;const _=new Uint32Array(4),ne=new Int32Array(4);let re=null,J=null;const K=[],Ie=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ad,this._useLegacyLights=!1,this.toneMapping=sN,this.toneMappingExposure=1;const ce=this;let ae=!1,me=0,Ee=0,Ae=null,Me=-1,we=null;const Te=new Uc,je=new Uc;let Ke=null;const lt=new ps(0);let Ze=0,it=n.width,ot=n.height,yt=1,Rt=null,Ct=null;const Bt=new Uc(0,0,it,ot),Ut=new Uc(0,0,it,ot);let Ft=!1;const Nt=new Bk;let Gt=!1,en=!1,Dn=null;const An=new Fn,En=new us,Gn=new ze,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qn(){return Ae===null?yt:1}let Tt=t;function Gs(Je,It){for(let Ot=0;Ot<Je.length;Ot++){const Re=Je[Ot],At=n.getContext(Re,It);if(At!==null)return At}return null}try{const Je={alpha:!0,depth:u,stencil:o,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:D,powerPreference:P,failIfMajorPerformanceCaveat:x};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${bk}`),n.addEventListener("webglcontextlost",nn,!1),n.addEventListener("webglcontextrestored",ct,!1),n.addEventListener("webglcontextcreationerror",Zt,!1),Tt===null){const It=["webgl2","webgl","experimental-webgl"];if(ce.isWebGL1Renderer===!0&&It.shift(),Tt=Gs(It,Je),Tt===null)throw Gs(It)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Tt instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Tt.getShaderPrecisionFormat===void 0&&(Tt.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(Je){throw console.error("THREE.WebGLRenderer: "+Je.message),Je}let Hn,Wn,pn,Ps,fs,$e,ke,gt,Qt,$t,jt,Pn,dn,Tn,_n,zn,Wt,Ms,ss,$n,Un,gn,ls,Ws;function yn(){Hn=new kue(Tt),Wn=new _ue(Tt,Hn,s),Hn.init(Wn),gn=new boe(Tt,Hn,Wn),pn=new Ooe(Tt,Hn,Wn),Ps=new Kue(Tt),fs=new Ioe,$e=new Loe(Tt,Hn,pn,fs,Wn,gn,Ps),ke=new Wue(ce),gt=new jue(ce),Qt=new nre(Tt,Wn),ls=new Fue(Tt,Hn,Qt,Wn),$t=new que(Tt,Qt,Ps,ls),jt=new Xue(Tt,$t,Qt,Ps),ss=new Jue(Tt,Wn,$e),zn=new Vue(fs),Pn=new doe(ce,ke,gt,Hn,Wn,ls,zn),dn=new xoe(ce,fs),Tn=new woe,_n=new Aoe(Hn,Wn),Ms=new Hue(ce,ke,gt,pn,jt,H,m),Wt=new goe(ce,jt,Wn),Ws=new Uoe(Tt,Ps,Wn,pn),$n=new Gue(Tt,Hn,Ps,Wn),Un=new $ue(Tt,Hn,Ps,Wn),Ps.programs=Pn.programs,ce.capabilities=Wn,ce.extensions=Hn,ce.properties=fs,ce.renderLists=Tn,ce.shadowMap=Wt,ce.state=pn,ce.info=Ps}yn();const Sn=new Moe(ce,Tt);this.xr=Sn,this.getContext=function(){return Tt},this.getContextAttributes=function(){return Tt.getContextAttributes()},this.forceContextLoss=function(){const Je=Hn.get("WEBGL_lose_context");Je&&Je.loseContext()},this.forceContextRestore=function(){const Je=Hn.get("WEBGL_lose_context");Je&&Je.restoreContext()},this.getPixelRatio=function(){return yt},this.setPixelRatio=function(Je){Je!==void 0&&(yt=Je,this.setSize(it,ot,!1))},this.getSize=function(Je){return Je.set(it,ot)},this.setSize=function(Je,It,Ot=!0){if(Sn.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}it=Je,ot=It,n.width=Math.floor(Je*yt),n.height=Math.floor(It*yt),Ot===!0&&(n.style.width=Je+"px",n.style.height=It+"px"),this.setViewport(0,0,Je,It)},this.getDrawingBufferSize=function(Je){return Je.set(it*yt,ot*yt).floor()},this.setDrawingBufferSize=function(Je,It,Ot){it=Je,ot=It,yt=Ot,n.width=Math.floor(Je*Ot),n.height=Math.floor(It*Ot),this.setViewport(0,0,Je,It)},this.getCurrentViewport=function(Je){return Je.copy(Te)},this.getViewport=function(Je){return Je.copy(Bt)},this.setViewport=function(Je,It,Ot,Re){Je.isVector4?Bt.set(Je.x,Je.y,Je.z,Je.w):Bt.set(Je,It,Ot,Re),pn.viewport(Te.copy(Bt).multiplyScalar(yt).floor())},this.getScissor=function(Je){return Je.copy(Ut)},this.setScissor=function(Je,It,Ot,Re){Je.isVector4?Ut.set(Je.x,Je.y,Je.z,Je.w):Ut.set(Je,It,Ot,Re),pn.scissor(je.copy(Ut).multiplyScalar(yt).floor())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(Je){pn.setScissorTest(Ft=Je)},this.setOpaqueSort=function(Je){Rt=Je},this.setTransparentSort=function(Je){Ct=Je},this.getClearColor=function(Je){return Je.copy(Ms.getClearColor())},this.setClearColor=function(){Ms.setClearColor.apply(Ms,arguments)},this.getClearAlpha=function(){return Ms.getClearAlpha()},this.setClearAlpha=function(){Ms.setClearAlpha.apply(Ms,arguments)},this.clear=function(Je=!0,It=!0,Ot=!0){let Re=0;if(Je){let At=!1;if(Ae!==null){const fn=Ae.texture.format;At=fn===iX||fn===rX||fn===lX}if(At){const fn=Ae.texture.type,Cn=fn===lN||fn===KS||fn===Pk||fn===BO||fn===nX||fn===sX,kn=Ms.getClearColor(),Qn=Ms.getClearAlpha(),as=kn.r,vt=kn.g,rs=kn.b;Cn?(_[0]=as,_[1]=vt,_[2]=rs,_[3]=Qn,Tt.clearBufferuiv(Tt.COLOR,0,_)):(ne[0]=as,ne[1]=vt,ne[2]=rs,ne[3]=Qn,Tt.clearBufferiv(Tt.COLOR,0,ne))}else Re|=Tt.COLOR_BUFFER_BIT}It&&(Re|=Tt.DEPTH_BUFFER_BIT),Ot&&(Re|=Tt.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Tt.clear(Re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",nn,!1),n.removeEventListener("webglcontextrestored",ct,!1),n.removeEventListener("webglcontextcreationerror",Zt,!1),Tn.dispose(),_n.dispose(),fs.dispose(),ke.dispose(),gt.dispose(),jt.dispose(),ls.dispose(),Ws.dispose(),Pn.dispose(),Sn.dispose(),Sn.removeEventListener("sessionstart",yl),Sn.removeEventListener("sessionend",Ys),Dn&&(Dn.dispose(),Dn=null),Ol.stop()};function nn(Je){Je.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),ae=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),ae=!1;const Je=Ps.autoReset,It=Wt.enabled,Ot=Wt.autoUpdate,Re=Wt.needsUpdate,At=Wt.type;yn(),Ps.autoReset=Je,Wt.enabled=It,Wt.autoUpdate=Ot,Wt.needsUpdate=Re,Wt.type=At}function Zt(Je){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",Je.statusMessage)}function rn(Je){const It=Je.target;It.removeEventListener("dispose",rn),un(It)}function un(Je){jn(Je),fs.remove(Je)}function jn(Je){const It=fs.get(Je).programs;It!==void 0&&(It.forEach(function(Ot){Pn.releaseProgram(Ot)}),Je.isShaderMaterial&&Pn.releaseShaderCache(Je))}this.renderBufferDirect=function(Je,It,Ot,Re,At,fn){It===null&&(It=Xt);const Cn=At.isMesh&&At.matrixWorld.determinant()<0,kn=i4(Je,It,Ot,Re,At);pn.setMaterial(Re,Cn);let Qn=Ot.index,as=1;if(Re.wireframe===!0){if(Qn=$t.getWireframeAttribute(Ot),Qn===void 0)return;as=2}const vt=Ot.drawRange,rs=Ot.attributes.position;let qs=vt.start*as,xi=(vt.start+vt.count)*as;fn!==null&&(qs=Math.max(qs,fn.start*as),xi=Math.min(xi,(fn.start+fn.count)*as)),Qn!==null?(qs=Math.max(qs,0),xi=Math.min(xi,Qn.count)):rs!=null&&(qs=Math.max(qs,0),xi=Math.min(xi,rs.count));const Fl=xi-qs;if(Fl<0||Fl===1/0)return;ls.setup(At,Re,kn,Ot,Qn);let Ki,al=$n;if(Qn!==null&&(Ki=Qt.get(Qn),al=Un,al.setIndex(Ki)),At.isMesh)Re.wireframe===!0?(pn.setLineWidth(Re.wireframeLinewidth*qn()),al.setMode(Tt.LINES)):al.setMode(Tt.TRIANGLES);else if(At.isLine){let ds=Re.linewidth;ds===void 0&&(ds=1),pn.setLineWidth(ds*qn()),At.isLineSegments?al.setMode(Tt.LINES):At.isLineLoop?al.setMode(Tt.LINE_LOOP):al.setMode(Tt.LINE_STRIP)}else At.isPoints?al.setMode(Tt.POINTS):At.isSprite&&al.setMode(Tt.TRIANGLES);if(At.isBatchedMesh)al.renderMultiDraw(At._multiDrawStarts,At._multiDrawCounts,At._multiDrawCount);else if(At.isInstancedMesh)al.renderInstances(qs,Fl,At.count);else if(Ot.isInstancedBufferGeometry){const ds=Ot._maxInstanceCount!==void 0?Ot._maxInstanceCount:1/0,r3=Math.min(Ot.instanceCount,ds);al.renderInstances(qs,Fl,r3)}else al.render(qs,Fl)};function On(Je,It,Ot){Je.transparent===!0&&Je.side===Z0&&Je.forceSinglePass===!1?(Je.side=YI,Je.needsUpdate=!0,Ha(Je,It,Ot),Je.side=Aw,Je.needsUpdate=!0,Ha(Je,It,Ot),Je.side=Z0):Ha(Je,It,Ot)}this.compile=function(Je,It,Ot=null){Ot===null&&(Ot=Je),J=_n.get(Ot),J.init(),Ie.push(J),Ot.traverseVisible(function(At){At.isLight&&At.layers.test(It.layers)&&(J.pushLight(At),At.castShadow&&J.pushShadow(At))}),Je!==Ot&&Je.traverseVisible(function(At){At.isLight&&At.layers.test(It.layers)&&(J.pushLight(At),At.castShadow&&J.pushShadow(At))}),J.setupLights(ce._useLegacyLights);const Re=new Set;return Je.traverse(function(At){const fn=At.material;if(fn)if(Array.isArray(fn))for(let Cn=0;Cn<fn.length;Cn++){const kn=fn[Cn];On(kn,Ot,At),Re.add(kn)}else On(fn,Ot,At),Re.add(fn)}),Ie.pop(),J=null,Re},this.compileAsync=function(Je,It,Ot=null){const Re=this.compile(Je,It,Ot);return new Promise(At=>{function fn(){if(Re.forEach(function(Cn){fs.get(Cn).currentProgram.isReady()&&Re.delete(Cn)}),Re.size===0){At(Je);return}setTimeout(fn,10)}Hn.get("KHR_parallel_shader_compile")!==null?fn():setTimeout(fn,10)})};let nl=null;function $l(Je){nl&&nl(Je)}function yl(){Ol.stop()}function Ys(){Ol.start()}const Ol=new AX;Ol.setAnimationLoop($l),typeof self<"u"&&Ol.setContext(self),this.setAnimationLoop=function(Je){nl=Je,Sn.setAnimationLoop(Je),Je===null?Ol.stop():Ol.start()},Sn.addEventListener("sessionstart",yl),Sn.addEventListener("sessionend",Ys),this.render=function(Je,It){if(It!==void 0&&It.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(ae===!0)return;Je.matrixWorldAutoUpdate===!0&&Je.updateMatrixWorld(),It.parent===null&&It.matrixWorldAutoUpdate===!0&&It.updateMatrixWorld(),Sn.enabled===!0&&Sn.isPresenting===!0&&(Sn.cameraAutoUpdate===!0&&Sn.updateCamera(It),It=Sn.getCamera()),Je.isScene===!0&&Je.onBeforeRender(ce,Je,It,Ae),J=_n.get(Je,Ie.length),J.init(),Ie.push(J),An.multiplyMatrices(It.projectionMatrix,It.matrixWorldInverse),Nt.setFromProjectionMatrix(An),en=this.localClippingEnabled,Gt=zn.init(this.clippingPlanes,en),re=Tn.get(Je,K.length),re.init(),K.push(re),$i(Je,It,0,ce.sortObjects),re.finish(),ce.sortObjects===!0&&re.sort(Rt,Ct),this.info.render.frame++,Gt===!0&&zn.beginShadows();const Ot=J.state.shadowsArray;if(Wt.render(Ot,Je,It),Gt===!0&&zn.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ms.render(re,Je),J.setupLights(ce._useLegacyLights),It.isArrayCamera){const Re=It.cameras;for(let At=0,fn=Re.length;At<fn;At++){const Cn=Re[At];kI(re,Je,Cn,Cn.viewport)}}else kI(re,Je,It);Ae!==null&&($e.updateMultisampleRenderTarget(Ae),$e.updateRenderTargetMipmap(Ae)),Je.isScene===!0&&Je.onAfterRender(ce,Je,It),ls.resetDefaultState(),Me=-1,we=null,Ie.pop(),Ie.length>0?J=Ie[Ie.length-1]:J=null,K.pop(),K.length>0?re=K[K.length-1]:re=null};function $i(Je,It,Ot,Re){if(Je.visible===!1)return;if(Je.layers.test(It.layers)){if(Je.isGroup)Ot=Je.renderOrder;else if(Je.isLOD)Je.autoUpdate===!0&&Je.update(It);else if(Je.isLight)J.pushLight(Je),Je.castShadow&&J.pushShadow(Je);else if(Je.isSprite){if(!Je.frustumCulled||Nt.intersectsSprite(Je)){Re&&Gn.setFromMatrixPosition(Je.matrixWorld).applyMatrix4(An);const Cn=jt.update(Je),kn=Je.material;kn.visible&&re.push(Je,Cn,kn,Ot,Gn.z,null)}}else if((Je.isMesh||Je.isLine||Je.isPoints)&&(!Je.frustumCulled||Nt.intersectsObject(Je))){const Cn=jt.update(Je),kn=Je.material;if(Re&&(Je.boundingSphere!==void 0?(Je.boundingSphere===null&&Je.computeBoundingSphere(),Gn.copy(Je.boundingSphere.center)):(Cn.boundingSphere===null&&Cn.computeBoundingSphere(),Gn.copy(Cn.boundingSphere.center)),Gn.applyMatrix4(Je.matrixWorld).applyMatrix4(An)),Array.isArray(kn)){const Qn=Cn.groups;for(let as=0,vt=Qn.length;as<vt;as++){const rs=Qn[as],qs=kn[rs.materialIndex];qs&&qs.visible&&re.push(Je,Cn,qs,Ot,Gn.z,rs)}}else kn.visible&&re.push(Je,Cn,kn,Ot,Gn.z,null)}}const fn=Je.children;for(let Cn=0,kn=fn.length;Cn<kn;Cn++)$i(fn[Cn],It,Ot,Re)}function kI(Je,It,Ot,Re){const At=Je.opaque,fn=Je.transmissive,Cn=Je.transparent;J.setupLightsView(Ot),Gt===!0&&zn.setGlobalState(ce.clippingPlanes,Ot),fn.length>0&&l3(At,fn,It,Ot),Re&&pn.viewport(Te.copy(Re)),At.length>0&&Fc(At,It,Ot),fn.length>0&&Fc(fn,It,Ot),Cn.length>0&&Fc(Cn,It,Ot),pn.buffers.depth.setTest(!0),pn.buffers.depth.setMask(!0),pn.buffers.color.setMask(!0),pn.setPolygonOffset(!1)}function l3(Je,It,Ot,Re){if((Ot.isScene===!0?Ot.overrideMaterial:null)!==null)return;const fn=Wn.isWebGL2;Dn===null&&(Dn=new aA(1,1,{generateMipmaps:!0,type:Hn.has("EXT_color_buffer_half_float")?zF:lN,minFilter:YF,samples:fn?4:0})),ce.getDrawingBufferSize(En),fn?Dn.setSize(En.x,En.y):Dn.setSize(uW(En.x),uW(En.y));const Cn=ce.getRenderTarget();ce.setRenderTarget(Dn),ce.getClearColor(lt),Ze=ce.getClearAlpha(),Ze<1&&ce.setClearColor(16777215,.5),ce.clear();const kn=ce.toneMapping;ce.toneMapping=sN,Fc(Je,Ot,Re),$e.updateMultisampleRenderTarget(Dn),$e.updateRenderTargetMipmap(Dn);let Qn=!1;for(let as=0,vt=It.length;as<vt;as++){const rs=It[as],qs=rs.object,xi=rs.geometry,Fl=rs.material,Ki=rs.group;if(Fl.side===Z0&&qs.layers.test(Re.layers)){const al=Fl.side;Fl.side=YI,Fl.needsUpdate=!0,l4(qs,Ot,Re,xi,Fl,Ki),Fl.side=al,Fl.needsUpdate=!0,Qn=!0}}Qn===!0&&($e.updateMultisampleRenderTarget(Dn),$e.updateRenderTargetMipmap(Dn)),ce.setRenderTarget(Cn),ce.setClearColor(lt,Ze),ce.toneMapping=kn}function Fc(Je,It,Ot){const Re=It.isScene===!0?It.overrideMaterial:null;for(let At=0,fn=Je.length;At<fn;At++){const Cn=Je[At],kn=Cn.object,Qn=Cn.geometry,as=Re===null?Cn.material:Re,vt=Cn.group;kn.layers.test(Ot.layers)&&l4(kn,It,Ot,Qn,as,vt)}}function l4(Je,It,Ot,Re,At,fn){Je.onBeforeRender(ce,It,Ot,Re,At,fn),Je.modelViewMatrix.multiplyMatrices(Ot.matrixWorldInverse,Je.matrixWorld),Je.normalMatrix.getNormalMatrix(Je.modelViewMatrix),At.onBeforeRender(ce,It,Ot,Re,Je,fn),At.transparent===!0&&At.side===Z0&&At.forceSinglePass===!1?(At.side=YI,At.needsUpdate=!0,ce.renderBufferDirect(Ot,It,Re,At,Je,fn),At.side=Aw,At.needsUpdate=!0,ce.renderBufferDirect(Ot,It,Re,At,Je,fn),At.side=Z0):ce.renderBufferDirect(Ot,It,Re,At,Je,fn),Je.onAfterRender(ce,It,Ot,Re,At,fn)}function Ha(Je,It,Ot){It.isScene!==!0&&(It=Xt);const Re=fs.get(Je),At=J.state.lights,fn=J.state.shadowsArray,Cn=At.state.version,kn=Pn.getParameters(Je,At.state,fn,It,Ot),Qn=Pn.getProgramCacheKey(kn);let as=Re.programs;Re.environment=Je.isMeshStandardMaterial?It.environment:null,Re.fog=It.fog,Re.envMap=(Je.isMeshStandardMaterial?gt:ke).get(Je.envMap||Re.environment),as===void 0&&(Je.addEventListener("dispose",rn),as=new Map,Re.programs=as);let vt=as.get(Qn);if(vt!==void 0){if(Re.currentProgram===vt&&Re.lightsStateVersion===Cn)return Kn(Je,kn),vt}else kn.uniforms=Pn.getUniforms(Je),Je.onBuild(Ot,kn,ce),Je.onBeforeCompile(kn,ce),vt=Pn.acquireProgram(kn,Qn),as.set(Qn,vt),Re.uniforms=kn.uniforms;const rs=Re.uniforms;return(!Je.isShaderMaterial&&!Je.isRawShaderMaterial||Je.clipping===!0)&&(rs.clippingPlanes=zn.uniform),Kn(Je,kn),Re.needsLights=Nw(Je),Re.lightsStateVersion=Cn,Re.needsLights&&(rs.ambientLightColor.value=At.state.ambient,rs.lightProbe.value=At.state.probe,rs.directionalLights.value=At.state.directional,rs.directionalLightShadows.value=At.state.directionalShadow,rs.spotLights.value=At.state.spot,rs.spotLightShadows.value=At.state.spotShadow,rs.rectAreaLights.value=At.state.rectArea,rs.ltc_1.value=At.state.rectAreaLTC1,rs.ltc_2.value=At.state.rectAreaLTC2,rs.pointLights.value=At.state.point,rs.pointLightShadows.value=At.state.pointShadow,rs.hemisphereLights.value=At.state.hemi,rs.directionalShadowMap.value=At.state.directionalShadowMap,rs.directionalShadowMatrix.value=At.state.directionalShadowMatrix,rs.spotShadowMap.value=At.state.spotShadowMap,rs.spotLightMatrix.value=At.state.spotLightMatrix,rs.spotLightMap.value=At.state.spotLightMap,rs.pointShadowMap.value=At.state.pointShadowMap,rs.pointShadowMatrix.value=At.state.pointShadowMatrix),Re.currentProgram=vt,Re.uniformsList=null,vt}function r4(Je){if(Je.uniformsList===null){const It=Je.currentProgram.getUniforms();Je.uniformsList=aV.seqWithValue(It.seq,Je.uniforms)}return Je.uniformsList}function Kn(Je,It){const Ot=fs.get(Je);Ot.outputColorSpace=It.outputColorSpace,Ot.batching=It.batching,Ot.instancing=It.instancing,Ot.instancingColor=It.instancingColor,Ot.skinning=It.skinning,Ot.morphTargets=It.morphTargets,Ot.morphNormals=It.morphNormals,Ot.morphColors=It.morphColors,Ot.morphTargetsCount=It.morphTargetsCount,Ot.numClippingPlanes=It.numClippingPlanes,Ot.numIntersection=It.numClipIntersection,Ot.vertexAlphas=It.vertexAlphas,Ot.vertexTangents=It.vertexTangents,Ot.toneMapping=It.toneMapping}function i4(Je,It,Ot,Re,At){It.isScene!==!0&&(It=Xt),$e.resetTextureUnits();const fn=It.fog,Cn=Re.isMeshStandardMaterial?It.environment:null,kn=Ae===null?ce.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:uA,Qn=(Re.isMeshStandardMaterial?gt:ke).get(Re.envMap||Cn),as=Re.vertexColors===!0&&!!Ot.attributes.color&&Ot.attributes.color.itemSize===4,vt=!!Ot.attributes.tangent&&(!!Re.normalMap||Re.anisotropy>0),rs=!!Ot.morphAttributes.position,qs=!!Ot.morphAttributes.normal,xi=!!Ot.morphAttributes.color;let Fl=sN;Re.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(Fl=ce.toneMapping);const Ki=Ot.morphAttributes.position||Ot.morphAttributes.normal||Ot.morphAttributes.color,al=Ki!==void 0?Ki.length:0,ds=fs.get(Re),r3=J.state.lights;if(Gt===!0&&(en===!0||Je!==we)){const Kl=Je===we&&Re.id===Me;zn.setState(Re,Je,Kl)}let ol=!1;Re.version===ds.__version?(ds.needsLights&&ds.lightsStateVersion!==r3.state.version||ds.outputColorSpace!==kn||At.isBatchedMesh&&ds.batching===!1||!At.isBatchedMesh&&ds.batching===!0||At.isInstancedMesh&&ds.instancing===!1||!At.isInstancedMesh&&ds.instancing===!0||At.isSkinnedMesh&&ds.skinning===!1||!At.isSkinnedMesh&&ds.skinning===!0||At.isInstancedMesh&&ds.instancingColor===!0&&At.instanceColor===null||At.isInstancedMesh&&ds.instancingColor===!1&&At.instanceColor!==null||ds.envMap!==Qn||Re.fog===!0&&ds.fog!==fn||ds.numClippingPlanes!==void 0&&(ds.numClippingPlanes!==zn.numPlanes||ds.numIntersection!==zn.numIntersection)||ds.vertexAlphas!==as||ds.vertexTangents!==vt||ds.morphTargets!==rs||ds.morphNormals!==qs||ds.morphColors!==xi||ds.toneMapping!==Fl||Wn.isWebGL2===!0&&ds.morphTargetsCount!==al)&&(ol=!0):(ol=!0,ds.__version=Re.version);let Qi=ds.currentProgram;ol===!0&&(Qi=Ha(Re,It,At));let i3=!1,Ih=!1,$I=!1;const Gl=Qi.getUniforms(),Tu=ds.uniforms;if(pn.useProgram(Qi.program)&&(i3=!0,Ih=!0,$I=!0),Re.id!==Me&&(Me=Re.id,Ih=!0),i3||we!==Je){Gl.setValue(Tt,"projectionMatrix",Je.projectionMatrix),Gl.setValue(Tt,"viewMatrix",Je.matrixWorldInverse);const Kl=Gl.map.cameraPosition;Kl!==void 0&&Kl.setValue(Tt,Gn.setFromMatrixPosition(Je.matrixWorld)),Wn.logarithmicDepthBuffer&&Gl.setValue(Tt,"logDepthBufFC",2/(Math.log(Je.far+1)/Math.LN2)),(Re.isMeshPhongMaterial||Re.isMeshToonMaterial||Re.isMeshLambertMaterial||Re.isMeshBasicMaterial||Re.isMeshStandardMaterial||Re.isShaderMaterial)&&Gl.setValue(Tt,"isOrthographic",Je.isOrthographicCamera===!0),we!==Je&&(we=Je,Ih=!0,$I=!0)}if(At.isSkinnedMesh){Gl.setOptional(Tt,At,"bindMatrix"),Gl.setOptional(Tt,At,"bindMatrixInverse");const Kl=At.skeleton;Kl&&(Wn.floatVertexTextures?(Kl.boneTexture===null&&Kl.computeBoneTexture(),Gl.setValue(Tt,"boneTexture",Kl.boneTexture,$e)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}At.isBatchedMesh&&(Gl.setOptional(Tt,At,"batchingTexture"),Gl.setValue(Tt,"batchingTexture",At._matricesTexture,$e));const Fa=Ot.morphAttributes;if((Fa.position!==void 0||Fa.normal!==void 0||Fa.color!==void 0&&Wn.isWebGL2===!0)&&ss.update(At,Ot,Qi),(Ih||ds.receiveShadow!==At.receiveShadow)&&(ds.receiveShadow=At.receiveShadow,Gl.setValue(Tt,"receiveShadow",At.receiveShadow)),Re.isMeshGouraudMaterial&&Re.envMap!==null&&(Tu.envMap.value=Qn,Tu.flipEnvMap.value=Qn.isCubeTexture&&Qn.isRenderTargetTexture===!1?-1:1),Ih&&(Gl.setValue(Tt,"toneMappingExposure",ce.toneMappingExposure),ds.needsLights&&qI(Tu,$I),fn&&Re.fog===!0&&dn.refreshFogUniforms(Tu,fn),dn.refreshMaterialUniforms(Tu,Re,yt,ot,Dn),aV.upload(Tt,r4(ds),Tu,$e)),Re.isShaderMaterial&&Re.uniformsNeedUpdate===!0&&(aV.upload(Tt,r4(ds),Tu,$e),Re.uniformsNeedUpdate=!1),Re.isSpriteMaterial&&Gl.setValue(Tt,"center",At.center),Gl.setValue(Tt,"modelViewMatrix",At.modelViewMatrix),Gl.setValue(Tt,"normalMatrix",At.normalMatrix),Gl.setValue(Tt,"modelMatrix",At.matrixWorld),Re.isShaderMaterial||Re.isRawShaderMaterial){const Kl=Re.uniformsGroups;for(let Ql=0,yh=Kl.length;Ql<yh;Ql++)if(Wn.isWebGL2){const KI=Kl[Ql];Ws.update(KI,Qi),Ws.bind(KI,Qi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Qi}function qI(Je,It){Je.ambientLightColor.needsUpdate=It,Je.lightProbe.needsUpdate=It,Je.directionalLights.needsUpdate=It,Je.directionalLightShadows.needsUpdate=It,Je.pointLights.needsUpdate=It,Je.pointLightShadows.needsUpdate=It,Je.spotLights.needsUpdate=It,Je.spotLightShadows.needsUpdate=It,Je.rectAreaLights.needsUpdate=It,Je.hemisphereLights.needsUpdate=It}function Nw(Je){return Je.isMeshLambertMaterial||Je.isMeshToonMaterial||Je.isMeshPhongMaterial||Je.isMeshStandardMaterial||Je.isShadowMaterial||Je.isShaderMaterial&&Je.lights===!0}this.getActiveCubeFace=function(){return me},this.getActiveMipmapLevel=function(){return Ee},this.getRenderTarget=function(){return Ae},this.setRenderTargetTextures=function(Je,It,Ot){fs.get(Je.texture).__webglTexture=It,fs.get(Je.depthTexture).__webglTexture=Ot;const Re=fs.get(Je);Re.__hasExternalTextures=!0,Re.__hasExternalTextures&&(Re.__autoAllocateDepthBuffer=Ot===void 0,Re.__autoAllocateDepthBuffer||Hn.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Re.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(Je,It){const Ot=fs.get(Je);Ot.__webglFramebuffer=It,Ot.__useDefaultFramebuffer=It===void 0},this.setRenderTarget=function(Je,It=0,Ot=0){Ae=Je,me=It,Ee=Ot;let Re=!0,At=null,fn=!1,Cn=!1;if(Je){const Qn=fs.get(Je);Qn.__useDefaultFramebuffer!==void 0?(pn.bindFramebuffer(Tt.FRAMEBUFFER,null),Re=!1):Qn.__webglFramebuffer===void 0?$e.setupRenderTarget(Je):Qn.__hasExternalTextures&&$e.rebindTextures(Je,fs.get(Je.texture).__webglTexture,fs.get(Je.depthTexture).__webglTexture);const as=Je.texture;(as.isData3DTexture||as.isDataArrayTexture||as.isCompressedArrayTexture)&&(Cn=!0);const vt=fs.get(Je).__webglFramebuffer;Je.isWebGLCubeRenderTarget?(Array.isArray(vt[It])?At=vt[It][Ot]:At=vt[It],fn=!0):Wn.isWebGL2&&Je.samples>0&&$e.useMultisampledRTT(Je)===!1?At=fs.get(Je).__webglMultisampledFramebuffer:Array.isArray(vt)?At=vt[Ot]:At=vt,Te.copy(Je.viewport),je.copy(Je.scissor),Ke=Je.scissorTest}else Te.copy(Bt).multiplyScalar(yt).floor(),je.copy(Ut).multiplyScalar(yt).floor(),Ke=Ft;if(pn.bindFramebuffer(Tt.FRAMEBUFFER,At)&&Wn.drawBuffers&&Re&&pn.drawBuffers(Je,At),pn.viewport(Te),pn.scissor(je),pn.setScissorTest(Ke),fn){const Qn=fs.get(Je.texture);Tt.framebufferTexture2D(Tt.FRAMEBUFFER,Tt.COLOR_ATTACHMENT0,Tt.TEXTURE_CUBE_MAP_POSITIVE_X+It,Qn.__webglTexture,Ot)}else if(Cn){const Qn=fs.get(Je.texture),as=It||0;Tt.framebufferTextureLayer(Tt.FRAMEBUFFER,Tt.COLOR_ATTACHMENT0,Qn.__webglTexture,Ot||0,as)}Me=-1},this.readRenderTargetPixels=function(Je,It,Ot,Re,At,fn,Cn){if(!(Je&&Je.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kn=fs.get(Je).__webglFramebuffer;if(Je.isWebGLCubeRenderTarget&&Cn!==void 0&&(kn=kn[Cn]),kn){pn.bindFramebuffer(Tt.FRAMEBUFFER,kn);try{const Qn=Je.texture,as=Qn.format,vt=Qn.type;if(as!==tp&&gn.convert(as)!==Tt.getParameter(Tt.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const rs=vt===zF&&(Hn.has("EXT_color_buffer_half_float")||Wn.isWebGL2&&Hn.has("EXT_color_buffer_float"));if(vt!==lN&&gn.convert(vt)!==Tt.getParameter(Tt.IMPLEMENTATION_COLOR_READ_TYPE)&&!(vt===QS&&(Wn.isWebGL2||Hn.has("OES_texture_float")||Hn.has("WEBGL_color_buffer_float")))&&!rs){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}It>=0&&It<=Je.width-Re&&Ot>=0&&Ot<=Je.height-At&&Tt.readPixels(It,Ot,Re,At,gn.convert(as),gn.convert(vt),fn)}finally{const Qn=Ae!==null?fs.get(Ae).__webglFramebuffer:null;pn.bindFramebuffer(Tt.FRAMEBUFFER,Qn)}}},this.copyFramebufferToTexture=function(Je,It,Ot=0){const Re=Math.pow(2,-Ot),At=Math.floor(It.image.width*Re),fn=Math.floor(It.image.height*Re);$e.setTexture2D(It,0),Tt.copyTexSubImage2D(Tt.TEXTURE_2D,Ot,0,0,Je.x,Je.y,At,fn),pn.unbindTexture()},this.copyTextureToTexture=function(Je,It,Ot,Re=0){const At=It.image.width,fn=It.image.height,Cn=gn.convert(Ot.format),kn=gn.convert(Ot.type);$e.setTexture2D(Ot,0),Tt.pixelStorei(Tt.UNPACK_FLIP_Y_WEBGL,Ot.flipY),Tt.pixelStorei(Tt.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Ot.premultiplyAlpha),Tt.pixelStorei(Tt.UNPACK_ALIGNMENT,Ot.unpackAlignment),It.isDataTexture?Tt.texSubImage2D(Tt.TEXTURE_2D,Re,Je.x,Je.y,At,fn,Cn,kn,It.image.data):It.isCompressedTexture?Tt.compressedTexSubImage2D(Tt.TEXTURE_2D,Re,Je.x,Je.y,It.mipmaps[0].width,It.mipmaps[0].height,Cn,It.mipmaps[0].data):Tt.texSubImage2D(Tt.TEXTURE_2D,Re,Je.x,Je.y,Cn,kn,It.image),Re===0&&Ot.generateMipmaps&&Tt.generateMipmap(Tt.TEXTURE_2D),pn.unbindTexture()},this.copyTextureToTexture3D=function(Je,It,Ot,Re,At=0){if(ce.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fn=Je.max.x-Je.min.x+1,Cn=Je.max.y-Je.min.y+1,kn=Je.max.z-Je.min.z+1,Qn=gn.convert(Re.format),as=gn.convert(Re.type);let vt;if(Re.isData3DTexture)$e.setTexture3D(Re,0),vt=Tt.TEXTURE_3D;else if(Re.isDataArrayTexture||Re.isCompressedArrayTexture)$e.setTexture2DArray(Re,0),vt=Tt.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Tt.pixelStorei(Tt.UNPACK_FLIP_Y_WEBGL,Re.flipY),Tt.pixelStorei(Tt.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Re.premultiplyAlpha),Tt.pixelStorei(Tt.UNPACK_ALIGNMENT,Re.unpackAlignment);const rs=Tt.getParameter(Tt.UNPACK_ROW_LENGTH),qs=Tt.getParameter(Tt.UNPACK_IMAGE_HEIGHT),xi=Tt.getParameter(Tt.UNPACK_SKIP_PIXELS),Fl=Tt.getParameter(Tt.UNPACK_SKIP_ROWS),Ki=Tt.getParameter(Tt.UNPACK_SKIP_IMAGES),al=Ot.isCompressedTexture?Ot.mipmaps[At]:Ot.image;Tt.pixelStorei(Tt.UNPACK_ROW_LENGTH,al.width),Tt.pixelStorei(Tt.UNPACK_IMAGE_HEIGHT,al.height),Tt.pixelStorei(Tt.UNPACK_SKIP_PIXELS,Je.min.x),Tt.pixelStorei(Tt.UNPACK_SKIP_ROWS,Je.min.y),Tt.pixelStorei(Tt.UNPACK_SKIP_IMAGES,Je.min.z),Ot.isDataTexture||Ot.isData3DTexture?Tt.texSubImage3D(vt,At,It.x,It.y,It.z,fn,Cn,kn,Qn,as,al.data):Ot.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Tt.compressedTexSubImage3D(vt,At,It.x,It.y,It.z,fn,Cn,kn,Qn,al.data)):Tt.texSubImage3D(vt,At,It.x,It.y,It.z,fn,Cn,kn,Qn,as,al),Tt.pixelStorei(Tt.UNPACK_ROW_LENGTH,rs),Tt.pixelStorei(Tt.UNPACK_IMAGE_HEIGHT,qs),Tt.pixelStorei(Tt.UNPACK_SKIP_PIXELS,xi),Tt.pixelStorei(Tt.UNPACK_SKIP_ROWS,Fl),Tt.pixelStorei(Tt.UNPACK_SKIP_IMAGES,Ki),At===0&&Re.generateMipmaps&&Tt.generateMipmap(vt),pn.unbindTexture()},this.initTexture=function(Je){Je.isCubeTexture?$e.setTextureCube(Je,0):Je.isData3DTexture?$e.setTexture3D(Je,0):Je.isDataArrayTexture||Je.isCompressedArrayTexture?$e.setTexture2DArray(Je,0):$e.setTexture2D(Je,0),pn.unbindTexture()},this.resetState=function(){me=0,Ee=0,Ae=null,pn.reset(),ls.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return I7}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(s){this._outputColorSpace=s;const n=this.getContext();n.drawingBufferColorSpace=s===Mk?"display-p3":"srgb",n.unpackColorSpace=Wl.workingColorSpace===OW?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ad?FO:aX}set outputEncoding(s){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=s===FO?Ad:uA}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(s){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=s}}class Boe extends kF{}Boe.prototype.isWebGL1Renderer=!0;class Fk extends wa{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(s,n){return super.copy(s,n),s.background!==null&&(this.background=s.background.clone()),s.environment!==null&&(this.environment=s.environment.clone()),s.fog!==null&&(this.fog=s.fog.clone()),this.backgroundBlurriness=s.backgroundBlurriness,this.backgroundIntensity=s.backgroundIntensity,s.overrideMaterial!==null&&(this.overrideMaterial=s.overrideMaterial.clone()),this.matrixAutoUpdate=s.matrixAutoUpdate,this}toJSON(s){const n=super.toJSON(s);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class Hoe{constructor(s,n){this.isInterleavedBuffer=!0,this.array=s,this.stride=n,this.count=s!==void 0?s.length/n:0,this.usage=fj,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=j7()}onUploadCallback(){}set needsUpdate(s){s===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(s){return this.usage=s,this}addUpdateRange(s,n){this.updateRanges.push({start:s,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(s){return this.array=new s.array.constructor(s.array),this.count=s.count,this.stride=s.stride,this.usage=s.usage,this}copyAt(s,n,t){s*=this.stride,t*=n.stride;for(let u=0,o=this.stride;u<o;u++)this.array[s+u]=n.array[t+u];return this}set(s,n=0){return this.array.set(s,n),this}clone(s){s.arrayBuffers===void 0&&(s.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=j7()),s.arrayBuffers[this.array.buffer._uuid]===void 0&&(s.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(s.arrayBuffers[this.array.buffer._uuid]),t=new this.constructor(n,this.stride);return t.setUsage(this.usage),t}onUpload(s){return this.onUploadCallback=s,this}toJSON(s){return s.arrayBuffers===void 0&&(s.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=j7()),s.arrayBuffers[this.array.buffer._uuid]===void 0&&(s.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const P0=new ze;class CX{constructor(s,n,t,u=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=s,this.itemSize=n,this.offset=t,this.normalized=u}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(s){this.data.needsUpdate=s}applyMatrix4(s){for(let n=0,t=this.data.count;n<t;n++)P0.fromBufferAttribute(this,n),P0.applyMatrix4(s),this.setXYZ(n,P0.x,P0.y,P0.z);return this}applyNormalMatrix(s){for(let n=0,t=this.count;n<t;n++)P0.fromBufferAttribute(this,n),P0.applyNormalMatrix(s),this.setXYZ(n,P0.x,P0.y,P0.z);return this}transformDirection(s){for(let n=0,t=this.count;n<t;n++)P0.fromBufferAttribute(this,n),P0.transformDirection(s),this.setXYZ(n,P0.x,P0.y,P0.z);return this}setX(s,n){return this.normalized&&(n=ir(n,this.array)),this.data.array[s*this.data.stride+this.offset]=n,this}setY(s,n){return this.normalized&&(n=ir(n,this.array)),this.data.array[s*this.data.stride+this.offset+1]=n,this}setZ(s,n){return this.normalized&&(n=ir(n,this.array)),this.data.array[s*this.data.stride+this.offset+2]=n,this}setW(s,n){return this.normalized&&(n=ir(n,this.array)),this.data.array[s*this.data.stride+this.offset+3]=n,this}getX(s){let n=this.data.array[s*this.data.stride+this.offset];return this.normalized&&(n=nm(n,this.array)),n}getY(s){let n=this.data.array[s*this.data.stride+this.offset+1];return this.normalized&&(n=nm(n,this.array)),n}getZ(s){let n=this.data.array[s*this.data.stride+this.offset+2];return this.normalized&&(n=nm(n,this.array)),n}getW(s){let n=this.data.array[s*this.data.stride+this.offset+3];return this.normalized&&(n=nm(n,this.array)),n}setXY(s,n,t){return s=s*this.data.stride+this.offset,this.normalized&&(n=ir(n,this.array),t=ir(t,this.array)),this.data.array[s+0]=n,this.data.array[s+1]=t,this}setXYZ(s,n,t,u){return s=s*this.data.stride+this.offset,this.normalized&&(n=ir(n,this.array),t=ir(t,this.array),u=ir(u,this.array)),this.data.array[s+0]=n,this.data.array[s+1]=t,this.data.array[s+2]=u,this}setXYZW(s,n,t,u,o){return s=s*this.data.stride+this.offset,this.normalized&&(n=ir(n,this.array),t=ir(t,this.array),u=ir(u,this.array),o=ir(o,this.array)),this.data.array[s+0]=n,this.data.array[s+1]=t,this.data.array[s+2]=u,this.data.array[s+3]=o,this}clone(s){if(s===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let t=0;t<this.count;t++){const u=t*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)n.push(this.data.array[u+o])}return new Ea(new this.array.constructor(n),this.itemSize,this.normalized)}else return s.interleavedBuffers===void 0&&(s.interleavedBuffers={}),s.interleavedBuffers[this.data.uuid]===void 0&&(s.interleavedBuffers[this.data.uuid]=this.data.clone(s)),new CX(s.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(s){if(s===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let t=0;t<this.count;t++){const u=t*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)n.push(this.data.array[u+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return s.interleavedBuffers===void 0&&(s.interleavedBuffers={}),s.interleavedBuffers[this.data.uuid]===void 0&&(s.interleavedBuffers[this.data.uuid]=this.data.toJSON(s)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class l4e extends e4{constructor(s=null,n=1,t=1,u,o,f,d,m,D=Rd,P=Rd,x,H){super(null,f,d,m,D,P,u,o,x,H),this.isDataTexture=!0,this.image={data:s,width:n,height:t},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qK extends Ea{constructor(s,n,t,u=1){super(s,n,t),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=u}copy(s){return super.copy(s),this.meshPerAttribute=s.meshPerAttribute,this}toJSON(){const s=super.toJSON();return s.meshPerAttribute=this.meshPerAttribute,s.isInstancedBufferAttribute=!0,s}}const LP=new Fn,$K=new Fn,h_=[],KK=new tl,Foe=new Fn,NH=new mn,gH=new Sw;class K9 extends mn{constructor(s,n,t){super(s,n),this.isInstancedMesh=!0,this.instanceMatrix=new qK(new Float32Array(t*16),16),this.instanceColor=null,this.count=t,this.boundingBox=null,this.boundingSphere=null;for(let u=0;u<t;u++)this.setMatrixAt(u,Foe)}computeBoundingBox(){const s=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new tl),s.boundingBox===null&&s.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<n;t++)this.getMatrixAt(t,LP),KK.copy(s.boundingBox).applyMatrix4(LP),this.boundingBox.union(KK)}computeBoundingSphere(){const s=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sw),s.boundingSphere===null&&s.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<n;t++)this.getMatrixAt(t,LP),gH.copy(s.boundingSphere).applyMatrix4(LP),this.boundingSphere.union(gH)}copy(s,n){return super.copy(s,n),this.instanceMatrix.copy(s.instanceMatrix),s.instanceColor!==null&&(this.instanceColor=s.instanceColor.clone()),this.count=s.count,s.boundingBox!==null&&(this.boundingBox=s.boundingBox.clone()),s.boundingSphere!==null&&(this.boundingSphere=s.boundingSphere.clone()),this}getColorAt(s,n){n.fromArray(this.instanceColor.array,s*3)}getMatrixAt(s,n){n.fromArray(this.instanceMatrix.array,s*16)}raycast(s,n){const t=this.matrixWorld,u=this.count;if(NH.geometry=this.geometry,NH.material=this.material,NH.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gH.copy(this.boundingSphere),gH.applyMatrix4(t),s.ray.intersectsSphere(gH)!==!1))for(let o=0;o<u;o++){this.getMatrixAt(o,LP),$K.multiplyMatrices(t,LP),NH.matrixWorld=$K,NH.raycast(s,h_);for(let f=0,d=h_.length;f<d;f++){const m=h_[f];m.instanceId=o,m.object=this,n.push(m)}h_.length=0}}setColorAt(s,n){this.instanceColor===null&&(this.instanceColor=new qK(new Float32Array(this.instanceMatrix.count*3),3)),n.toArray(this.instanceColor.array,s*3)}setMatrixAt(s,n){n.toArray(this.instanceMatrix.array,s*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class bW extends hb{constructor(s){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ps(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(s)}copy(s){return super.copy(s),this.color.copy(s.color),this.map=s.map,this.linewidth=s.linewidth,this.linecap=s.linecap,this.linejoin=s.linejoin,this.fog=s.fog,this}}const QK=new ze,ZK=new ze,JK=new Fn,az=new yM,f_=new Sw;class Y6 extends wa{constructor(s=new Mi,n=new bW){super(),this.isLine=!0,this.type="Line",this.geometry=s,this.material=n,this.updateMorphTargets()}copy(s,n){return super.copy(s,n),this.material=Array.isArray(s.material)?s.material.slice():s.material,this.geometry=s.geometry,this}computeLineDistances(){const s=this.geometry;if(s.index===null){const n=s.attributes.position,t=[0];for(let u=1,o=n.count;u<o;u++)QK.fromBufferAttribute(n,u-1),ZK.fromBufferAttribute(n,u),t[u]=t[u-1],t[u]+=QK.distanceTo(ZK);s.setAttribute("lineDistance",new bi(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(s,n){const t=this.geometry,u=this.matrixWorld,o=s.params.Line.threshold,f=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),f_.copy(t.boundingSphere),f_.applyMatrix4(u),f_.radius+=o,s.ray.intersectsSphere(f_)===!1)return;JK.copy(u).invert(),az.copy(s.ray).applyMatrix4(JK);const d=o/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,D=new ze,P=new ze,x=new ze,H=new ze,_=this.isLineSegments?2:1,ne=t.index,J=t.attributes.position;if(ne!==null){const K=Math.max(0,f.start),Ie=Math.min(ne.count,f.start+f.count);for(let ce=K,ae=Ie-1;ce<ae;ce+=_){const me=ne.getX(ce),Ee=ne.getX(ce+1);if(D.fromBufferAttribute(J,me),P.fromBufferAttribute(J,Ee),az.distanceSqToSegment(D,P,H,x)>m)continue;H.applyMatrix4(this.matrixWorld);const Me=s.ray.origin.distanceTo(H);Me<s.near||Me>s.far||n.push({distance:Me,point:x.clone().applyMatrix4(this.matrixWorld),index:ce,face:null,faceIndex:null,object:this})}}else{const K=Math.max(0,f.start),Ie=Math.min(J.count,f.start+f.count);for(let ce=K,ae=Ie-1;ce<ae;ce+=_){if(D.fromBufferAttribute(J,ce),P.fromBufferAttribute(J,ce+1),az.distanceSqToSegment(D,P,H,x)>m)continue;H.applyMatrix4(this.matrixWorld);const Ee=s.ray.origin.distanceTo(H);Ee<s.near||Ee>s.far||n.push({distance:Ee,point:x.clone().applyMatrix4(this.matrixWorld),index:ce,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,t=Object.keys(n);if(t.length>0){const u=n[t[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,f=u.length;o<f;o++){const d=u[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=o}}}}}const XK=new ze,vK=new ze;class Goe extends Y6{constructor(s,n){super(s,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const s=this.geometry;if(s.index===null){const n=s.attributes.position,t=[];for(let u=0,o=n.count;u<o;u+=2)XK.fromBufferAttribute(n,u),vK.fromBufferAttribute(n,u+1),t[u]=u===0?0:t[u-1],t[u+1]=t[u]+XK.distanceTo(vK);s.setAttribute("lineDistance",new bi(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _oe extends hb{constructor(s){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ps(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(s)}copy(s){return super.copy(s),this.color.copy(s.color),this.map=s.map,this.alphaMap=s.alphaMap,this.size=s.size,this.sizeAttenuation=s.sizeAttenuation,this.fog=s.fog,this}}const eQ=new Fn,wj=new yM,d_=new Sw,I_=new ze;class r4e extends wa{constructor(s=new Mi,n=new _oe){super(),this.isPoints=!0,this.type="Points",this.geometry=s,this.material=n,this.updateMorphTargets()}copy(s,n){return super.copy(s,n),this.material=Array.isArray(s.material)?s.material.slice():s.material,this.geometry=s.geometry,this}raycast(s,n){const t=this.geometry,u=this.matrixWorld,o=s.params.Points.threshold,f=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),d_.copy(t.boundingSphere),d_.applyMatrix4(u),d_.radius+=o,s.ray.intersectsSphere(d_)===!1)return;eQ.copy(u).invert(),wj.copy(s.ray).applyMatrix4(eQ);const d=o/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,D=t.index,x=t.attributes.position;if(D!==null){const H=Math.max(0,f.start),_=Math.min(D.count,f.start+f.count);for(let ne=H,re=_;ne<re;ne++){const J=D.getX(ne);I_.fromBufferAttribute(x,J),tQ(I_,J,m,u,s,n,this)}}else{const H=Math.max(0,f.start),_=Math.min(x.count,f.start+f.count);for(let ne=H,re=_;ne<re;ne++)I_.fromBufferAttribute(x,ne),tQ(I_,ne,m,u,s,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,t=Object.keys(n);if(t.length>0){const u=n[t[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,f=u.length;o<f;o++){const d=u[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=o}}}}}function tQ(e,s,n,t,u,o,f){const d=wj.distanceSqToPoint(e);if(d<n){const m=new ze;wj.closestPointToPoint(e,m),m.applyMatrix4(t);const D=u.ray.origin.distanceTo(m);if(D<u.near||D>u.far)return;o.push({distance:D,distanceToRay:Math.sqrt(d),point:m,index:s,face:null,object:f})}}class uf extends Mi{constructor(s=1,n=1,t=1,u=32,o=1,f=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:s,radiusBottom:n,height:t,radialSegments:u,heightSegments:o,openEnded:f,thetaStart:d,thetaLength:m};const D=this;u=Math.floor(u),o=Math.floor(o);const P=[],x=[],H=[],_=[];let ne=0;const re=[],J=t/2;let K=0;Ie(),f===!1&&(s>0&&ce(!0),n>0&&ce(!1)),this.setIndex(P),this.setAttribute("position",new bi(x,3)),this.setAttribute("normal",new bi(H,3)),this.setAttribute("uv",new bi(_,2));function Ie(){const ae=new ze,me=new ze;let Ee=0;const Ae=(n-s)/t;for(let Me=0;Me<=o;Me++){const we=[],Te=Me/o,je=Te*(n-s)+s;for(let Ke=0;Ke<=u;Ke++){const lt=Ke/u,Ze=lt*m+d,it=Math.sin(Ze),ot=Math.cos(Ze);me.x=je*it,me.y=-Te*t+J,me.z=je*ot,x.push(me.x,me.y,me.z),ae.set(it,Ae,ot).normalize(),H.push(ae.x,ae.y,ae.z),_.push(lt,1-Te),we.push(ne++)}re.push(we)}for(let Me=0;Me<u;Me++)for(let we=0;we<o;we++){const Te=re[we][Me],je=re[we+1][Me],Ke=re[we+1][Me+1],lt=re[we][Me+1];P.push(Te,je,lt),P.push(je,Ke,lt),Ee+=6}D.addGroup(K,Ee,0),K+=Ee}function ce(ae){const me=ne,Ee=new us,Ae=new ze;let Me=0;const we=ae===!0?s:n,Te=ae===!0?1:-1;for(let Ke=1;Ke<=u;Ke++)x.push(0,J*Te,0),H.push(0,Te,0),_.push(.5,.5),ne++;const je=ne;for(let Ke=0;Ke<=u;Ke++){const Ze=Ke/u*m+d,it=Math.cos(Ze),ot=Math.sin(Ze);Ae.x=we*ot,Ae.y=J*Te,Ae.z=we*it,x.push(Ae.x,Ae.y,Ae.z),H.push(0,Te,0),Ee.x=it*.5+.5,Ee.y=ot*.5*Te+.5,_.push(Ee.x,Ee.y),ne++}for(let Ke=0;Ke<u;Ke++){const lt=me+Ke,Ze=je+Ke;ae===!0?P.push(Ze,Ze+1,lt):P.push(Ze+1,Ze,lt),Me+=3}D.addGroup(K,Me,ae===!0?1:2),K+=Me}}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}static fromJSON(s){return new uf(s.radiusTop,s.radiusBottom,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength)}}class Gk extends Mi{constructor(s=[],n=[],t=1,u=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:s,indices:n,radius:t,detail:u};const o=[],f=[];d(u),D(t),P(),this.setAttribute("position",new bi(o,3)),this.setAttribute("normal",new bi(o.slice(),3)),this.setAttribute("uv",new bi(f,2)),u===0?this.computeVertexNormals():this.normalizeNormals();function d(Ie){const ce=new ze,ae=new ze,me=new ze;for(let Ee=0;Ee<n.length;Ee+=3)_(n[Ee+0],ce),_(n[Ee+1],ae),_(n[Ee+2],me),m(ce,ae,me,Ie)}function m(Ie,ce,ae,me){const Ee=me+1,Ae=[];for(let Me=0;Me<=Ee;Me++){Ae[Me]=[];const we=Ie.clone().lerp(ae,Me/Ee),Te=ce.clone().lerp(ae,Me/Ee),je=Ee-Me;for(let Ke=0;Ke<=je;Ke++)Ke===0&&Me===Ee?Ae[Me][Ke]=we:Ae[Me][Ke]=we.clone().lerp(Te,Ke/je)}for(let Me=0;Me<Ee;Me++)for(let we=0;we<2*(Ee-Me)-1;we++){const Te=Math.floor(we/2);we%2===0?(H(Ae[Me][Te+1]),H(Ae[Me+1][Te]),H(Ae[Me][Te])):(H(Ae[Me][Te+1]),H(Ae[Me+1][Te+1]),H(Ae[Me+1][Te]))}}function D(Ie){const ce=new ze;for(let ae=0;ae<o.length;ae+=3)ce.x=o[ae+0],ce.y=o[ae+1],ce.z=o[ae+2],ce.normalize().multiplyScalar(Ie),o[ae+0]=ce.x,o[ae+1]=ce.y,o[ae+2]=ce.z}function P(){const Ie=new ze;for(let ce=0;ce<o.length;ce+=3){Ie.x=o[ce+0],Ie.y=o[ce+1],Ie.z=o[ce+2];const ae=J(Ie)/2/Math.PI+.5,me=K(Ie)/Math.PI+.5;f.push(ae,1-me)}ne(),x()}function x(){for(let Ie=0;Ie<f.length;Ie+=6){const ce=f[Ie+0],ae=f[Ie+2],me=f[Ie+4],Ee=Math.max(ce,ae,me),Ae=Math.min(ce,ae,me);Ee>.9&&Ae<.1&&(ce<.2&&(f[Ie+0]+=1),ae<.2&&(f[Ie+2]+=1),me<.2&&(f[Ie+4]+=1))}}function H(Ie){o.push(Ie.x,Ie.y,Ie.z)}function _(Ie,ce){const ae=Ie*3;ce.x=s[ae+0],ce.y=s[ae+1],ce.z=s[ae+2]}function ne(){const Ie=new ze,ce=new ze,ae=new ze,me=new ze,Ee=new us,Ae=new us,Me=new us;for(let we=0,Te=0;we<o.length;we+=9,Te+=6){Ie.set(o[we+0],o[we+1],o[we+2]),ce.set(o[we+3],o[we+4],o[we+5]),ae.set(o[we+6],o[we+7],o[we+8]),Ee.set(f[Te+0],f[Te+1]),Ae.set(f[Te+2],f[Te+3]),Me.set(f[Te+4],f[Te+5]),me.copy(Ie).add(ce).add(ae).divideScalar(3);const je=J(me);re(Ee,Te+0,Ie,je),re(Ae,Te+2,ce,je),re(Me,Te+4,ae,je)}}function re(Ie,ce,ae,me){me<0&&Ie.x===1&&(f[ce]=Ie.x-1),ae.x===0&&ae.z===0&&(f[ce]=me/2/Math.PI+.5)}function J(Ie){return Math.atan2(Ie.z,-Ie.x)}function K(Ie){return Math.atan2(-Ie.y,Math.sqrt(Ie.x*Ie.x+Ie.z*Ie.z))}}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}static fromJSON(s){return new Gk(s.vertices,s.indices,s.radius,s.details)}}const y_=new ze,w_=new ze,oz=new ze,E_=new yu;class PX extends Mi{constructor(s=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:s,thresholdAngle:n},s!==null){const u=Math.pow(10,4),o=Math.cos(B9*n),f=s.getIndex(),d=s.getAttribute("position"),m=f?f.count:d.count,D=[0,0,0],P=["a","b","c"],x=new Array(3),H={},_=[];for(let ne=0;ne<m;ne+=3){f?(D[0]=f.getX(ne),D[1]=f.getX(ne+1),D[2]=f.getX(ne+2)):(D[0]=ne,D[1]=ne+1,D[2]=ne+2);const{a:re,b:J,c:K}=E_;if(re.fromBufferAttribute(d,D[0]),J.fromBufferAttribute(d,D[1]),K.fromBufferAttribute(d,D[2]),E_.getNormal(oz),x[0]=`${Math.round(re.x*u)},${Math.round(re.y*u)},${Math.round(re.z*u)}`,x[1]=`${Math.round(J.x*u)},${Math.round(J.y*u)},${Math.round(J.z*u)}`,x[2]=`${Math.round(K.x*u)},${Math.round(K.y*u)},${Math.round(K.z*u)}`,!(x[0]===x[1]||x[1]===x[2]||x[2]===x[0]))for(let Ie=0;Ie<3;Ie++){const ce=(Ie+1)%3,ae=x[Ie],me=x[ce],Ee=E_[P[Ie]],Ae=E_[P[ce]],Me=`${ae}_${me}`,we=`${me}_${ae}`;we in H&&H[we]?(oz.dot(H[we].normal)<=o&&(_.push(Ee.x,Ee.y,Ee.z),_.push(Ae.x,Ae.y,Ae.z)),H[we]=null):Me in H||(H[Me]={index0:D[Ie],index1:D[ce],normal:oz.clone()})}}for(const ne in H)if(H[ne]){const{index0:re,index1:J}=H[ne];y_.fromBufferAttribute(d,re),w_.fromBufferAttribute(d,J),_.push(y_.x,y_.y,y_.z),_.push(w_.x,w_.y,w_.z)}this.setAttribute("position",new bi(_,3))}}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}}const Voe={triangulate:function(e,s,n=2){const t=s&&s.length,u=t?s[0]*n:e.length;let o=MX(e,0,u,n,!0);const f=[];if(!o||o.next===o.prev)return f;let d,m,D,P,x,H,_;if(t&&(o=koe(e,s,o,n)),e.length>80*n){d=D=e[0],m=P=e[1];for(let ne=n;ne<u;ne+=n)x=e[ne],H=e[ne+1],x<d&&(d=x),H<m&&(m=H),x>D&&(D=x),H>P&&(P=H);_=Math.max(D-d,P-m),_=_!==0?32767/_:0}return qF(o,f,n,d,m,_,0),f}};function MX(e,s,n,t,u){let o,f;if(u===nce(e,s,n,t)>0)for(o=s;o<n;o+=t)f=nQ(o,e[o],e[o+1],f);else for(o=n-t;o>=s;o-=t)f=nQ(o,e[o],e[o+1],f);return f&&CW(f,f.next)&&(KF(f),f=f.next),f}function nL(e,s){if(!e)return e;s||(s=e);let n=e,t;do if(t=!1,!n.steiner&&(CW(n,n.next)||wu(n.prev,n,n.next)===0)){if(KF(n),n=s=n.prev,n===n.next)break;t=!0}else n=n.next;while(t||n!==s);return s}function qF(e,s,n,t,u,o,f){if(!e)return;!f&&o&&Zoe(e,t,u,o);let d=e,m,D;for(;e.prev!==e.next;){if(m=e.prev,D=e.next,o?Yoe(e,t,u,o):Woe(e)){s.push(m.i/n|0),s.push(e.i/n|0),s.push(D.i/n|0),KF(e),e=D.next,d=D.next;continue}if(e=D,e===d){f?f===1?(e=zoe(nL(e),s,n),qF(e,s,n,t,u,o,2)):f===2&&joe(e,s,n,t,u,o):qF(nL(e),s,n,t,u,o,1);break}}}function Woe(e){const s=e.prev,n=e,t=e.next;if(wu(s,n,t)>=0)return!1;const u=s.x,o=n.x,f=t.x,d=s.y,m=n.y,D=t.y,P=u<o?u<f?u:f:o<f?o:f,x=d<m?d<D?d:D:m<D?m:D,H=u>o?u>f?u:f:o>f?o:f,_=d>m?d>D?d:D:m>D?m:D;let ne=t.next;for(;ne!==s;){if(ne.x>=P&&ne.x<=H&&ne.y>=x&&ne.y<=_&&O9(u,d,o,m,f,D,ne.x,ne.y)&&wu(ne.prev,ne,ne.next)>=0)return!1;ne=ne.next}return!0}function Yoe(e,s,n,t){const u=e.prev,o=e,f=e.next;if(wu(u,o,f)>=0)return!1;const d=u.x,m=o.x,D=f.x,P=u.y,x=o.y,H=f.y,_=d<m?d<D?d:D:m<D?m:D,ne=P<x?P<H?P:H:x<H?x:H,re=d>m?d>D?d:D:m>D?m:D,J=P>x?P>H?P:H:x>H?x:H,K=Ej(_,ne,s,n,t),Ie=Ej(re,J,s,n,t);let ce=e.prevZ,ae=e.nextZ;for(;ce&&ce.z>=K&&ae&&ae.z<=Ie;){if(ce.x>=_&&ce.x<=re&&ce.y>=ne&&ce.y<=J&&ce!==u&&ce!==f&&O9(d,P,m,x,D,H,ce.x,ce.y)&&wu(ce.prev,ce,ce.next)>=0||(ce=ce.prevZ,ae.x>=_&&ae.x<=re&&ae.y>=ne&&ae.y<=J&&ae!==u&&ae!==f&&O9(d,P,m,x,D,H,ae.x,ae.y)&&wu(ae.prev,ae,ae.next)>=0))return!1;ae=ae.nextZ}for(;ce&&ce.z>=K;){if(ce.x>=_&&ce.x<=re&&ce.y>=ne&&ce.y<=J&&ce!==u&&ce!==f&&O9(d,P,m,x,D,H,ce.x,ce.y)&&wu(ce.prev,ce,ce.next)>=0)return!1;ce=ce.prevZ}for(;ae&&ae.z<=Ie;){if(ae.x>=_&&ae.x<=re&&ae.y>=ne&&ae.y<=J&&ae!==u&&ae!==f&&O9(d,P,m,x,D,H,ae.x,ae.y)&&wu(ae.prev,ae,ae.next)>=0)return!1;ae=ae.nextZ}return!0}function zoe(e,s,n){let t=e;do{const u=t.prev,o=t.next.next;!CW(u,o)&&xX(u,t,t.next,o)&&$F(u,o)&&$F(o,u)&&(s.push(u.i/n|0),s.push(t.i/n|0),s.push(o.i/n|0),KF(t),KF(t.next),t=e=o),t=t.next}while(t!==e);return nL(t)}function joe(e,s,n,t,u,o){let f=e;do{let d=f.next.next;for(;d!==f.prev;){if(f.i!==d.i&&voe(f,d)){let m=UX(f,d);f=nL(f,f.next),m=nL(m,m.next),qF(f,s,n,t,u,o,0),qF(m,s,n,t,u,o,0);return}d=d.next}f=f.next}while(f!==e)}function koe(e,s,n,t){const u=[];let o,f,d,m,D;for(o=0,f=s.length;o<f;o++)d=s[o]*t,m=o<f-1?s[o+1]*t:e.length,D=MX(e,d,m,t,!1),D===D.next&&(D.steiner=!0),u.push(Xoe(D));for(u.sort(qoe),o=0;o<u.length;o++)n=$oe(u[o],n);return n}function qoe(e,s){return e.x-s.x}function $oe(e,s){const n=Koe(e,s);if(!n)return s;const t=UX(n,e);return nL(t,t.next),nL(n,n.next)}function Koe(e,s){let n=s,t=-1/0,u;const o=e.x,f=e.y;do{if(f<=n.y&&f>=n.next.y&&n.next.y!==n.y){const H=n.x+(f-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(H<=o&&H>t&&(t=H,u=n.x<n.next.x?n:n.next,H===o))return u}n=n.next}while(n!==s);if(!u)return null;const d=u,m=u.x,D=u.y;let P=1/0,x;n=u;do o>=n.x&&n.x>=m&&o!==n.x&&O9(f<D?o:t,f,m,D,f<D?t:o,f,n.x,n.y)&&(x=Math.abs(f-n.y)/(o-n.x),$F(n,e)&&(x<P||x===P&&(n.x>u.x||n.x===u.x&&Qoe(u,n)))&&(u=n,P=x)),n=n.next;while(n!==d);return u}function Qoe(e,s){return wu(e.prev,e,s.prev)<0&&wu(s.next,e,e.next)<0}function Zoe(e,s,n,t){let u=e;do u.z===0&&(u.z=Ej(u.x,u.y,s,n,t)),u.prevZ=u.prev,u.nextZ=u.next,u=u.next;while(u!==e);u.prevZ.nextZ=null,u.prevZ=null,Joe(u)}function Joe(e){let s,n,t,u,o,f,d,m,D=1;do{for(n=e,e=null,o=null,f=0;n;){for(f++,t=n,d=0,s=0;s<D&&(d++,t=t.nextZ,!!t);s++);for(m=D;d>0||m>0&&t;)d!==0&&(m===0||!t||n.z<=t.z)?(u=n,n=n.nextZ,d--):(u=t,t=t.nextZ,m--),o?o.nextZ=u:e=u,u.prevZ=o,o=u;n=t}o.nextZ=null,D*=2}while(f>1);return e}function Ej(e,s,n,t,u){return e=(e-n)*u|0,s=(s-t)*u|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e|s<<1}function Xoe(e){let s=e,n=e;do(s.x<n.x||s.x===n.x&&s.y<n.y)&&(n=s),s=s.next;while(s!==e);return n}function O9(e,s,n,t,u,o,f,d){return(u-f)*(s-d)>=(e-f)*(o-d)&&(e-f)*(t-d)>=(n-f)*(s-d)&&(n-f)*(o-d)>=(u-f)*(t-d)}function voe(e,s){return e.next.i!==s.i&&e.prev.i!==s.i&&!ece(e,s)&&($F(e,s)&&$F(s,e)&&tce(e,s)&&(wu(e.prev,e,s.prev)||wu(e,s.prev,s))||CW(e,s)&&wu(e.prev,e,e.next)>0&&wu(s.prev,s,s.next)>0)}function wu(e,s,n){return(s.y-e.y)*(n.x-s.x)-(s.x-e.x)*(n.y-s.y)}function CW(e,s){return e.x===s.x&&e.y===s.y}function xX(e,s,n,t){const u=T_(wu(e,s,n)),o=T_(wu(e,s,t)),f=T_(wu(n,t,e)),d=T_(wu(n,t,s));return!!(u!==o&&f!==d||u===0&&p_(e,n,s)||o===0&&p_(e,t,s)||f===0&&p_(n,e,t)||d===0&&p_(n,s,t))}function p_(e,s,n){return s.x<=Math.max(e.x,n.x)&&s.x>=Math.min(e.x,n.x)&&s.y<=Math.max(e.y,n.y)&&s.y>=Math.min(e.y,n.y)}function T_(e){return e>0?1:e<0?-1:0}function ece(e,s){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==s.i&&n.next.i!==s.i&&xX(n,n.next,e,s))return!0;n=n.next}while(n!==e);return!1}function $F(e,s){return wu(e.prev,e,e.next)<0?wu(e,s,e.next)>=0&&wu(e,e.prev,s)>=0:wu(e,s,e.prev)<0||wu(e,e.next,s)<0}function tce(e,s){let n=e,t=!1;const u=(e.x+s.x)/2,o=(e.y+s.y)/2;do n.y>o!=n.next.y>o&&n.next.y!==n.y&&u<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(t=!t),n=n.next;while(n!==e);return t}function UX(e,s){const n=new pj(e.i,e.x,e.y),t=new pj(s.i,s.x,s.y),u=e.next,o=s.prev;return e.next=s,s.prev=e,n.next=u,u.prev=n,t.next=n,n.prev=t,o.next=t,t.prev=o,t}function nQ(e,s,n,t){const u=new pj(e,s,n);return t?(u.next=t.next,u.prev=t,t.next.prev=u,t.next=u):(u.prev=u,u.next=u),u}function KF(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function pj(e,s,n){this.i=e,this.x=s,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function nce(e,s,n,t){let u=0;for(let o=s,f=n-t;o<n;o+=t)u+=(e[f]-e[o])*(e[o+1]+e[f+1]),f=o;return u}class BX{static area(s){const n=s.length;let t=0;for(let u=n-1,o=0;o<n;u=o++)t+=s[u].x*s[o].y-s[o].x*s[u].y;return t*.5}static isClockWise(s){return BX.area(s)<0}static triangulateShape(s,n){const t=[],u=[],o=[];sQ(s),lQ(t,s);let f=s.length;n.forEach(sQ);for(let m=0;m<n.length;m++)u.push(f),f+=n[m].length,lQ(t,n[m]);const d=Voe.triangulate(t,u);for(let m=0;m<d.length;m+=3)o.push(d.slice(m,m+3));return o}}function sQ(e){const s=e.length;s>2&&e[s-1].equals(e[0])&&e.pop()}function lQ(e,s){for(let n=0;n<s.length;n++)e.push(s[n].x),e.push(s[n].y)}class L9 extends Gk{constructor(s=1,n=0){const t=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],u=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(t,u,s,n),this.type="OctahedronGeometry",this.parameters={radius:s,detail:n}}static fromJSON(s){return new L9(s.radius,s.detail)}}class _k extends Mi{constructor(s=1,n=32,t=16,u=0,o=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:s,widthSegments:n,heightSegments:t,phiStart:u,phiLength:o,thetaStart:f,thetaLength:d},n=Math.max(3,Math.floor(n)),t=Math.max(2,Math.floor(t));const m=Math.min(f+d,Math.PI);let D=0;const P=[],x=new ze,H=new ze,_=[],ne=[],re=[],J=[];for(let K=0;K<=t;K++){const Ie=[],ce=K/t;let ae=0;K===0&&f===0?ae=.5/n:K===t&&m===Math.PI&&(ae=-.5/n);for(let me=0;me<=n;me++){const Ee=me/n;x.x=-s*Math.cos(u+Ee*o)*Math.sin(f+ce*d),x.y=s*Math.cos(f+ce*d),x.z=s*Math.sin(u+Ee*o)*Math.sin(f+ce*d),ne.push(x.x,x.y,x.z),H.copy(x).normalize(),re.push(H.x,H.y,H.z),J.push(Ee+ae,1-ce),Ie.push(D++)}P.push(Ie)}for(let K=0;K<t;K++)for(let Ie=0;Ie<n;Ie++){const ce=P[K][Ie+1],ae=P[K][Ie],me=P[K+1][Ie],Ee=P[K+1][Ie+1];(K!==0||f>0)&&_.push(ce,ae,Ee),(K!==t-1||m<Math.PI)&&_.push(ae,me,Ee)}this.setIndex(_),this.setAttribute("position",new bi(ne,3)),this.setAttribute("normal",new bi(re,3)),this.setAttribute("uv",new bi(J,2))}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}static fromJSON(s){return new _k(s.radius,s.widthSegments,s.heightSegments,s.phiStart,s.phiLength,s.thetaStart,s.thetaLength)}}class MO extends Mi{constructor(s=1,n=.4,t=12,u=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:s,tube:n,radialSegments:t,tubularSegments:u,arc:o},t=Math.floor(t),u=Math.floor(u);const f=[],d=[],m=[],D=[],P=new ze,x=new ze,H=new ze;for(let _=0;_<=t;_++)for(let ne=0;ne<=u;ne++){const re=ne/u*o,J=_/t*Math.PI*2;x.x=(s+n*Math.cos(J))*Math.cos(re),x.y=(s+n*Math.cos(J))*Math.sin(re),x.z=n*Math.sin(J),d.push(x.x,x.y,x.z),P.x=s*Math.cos(re),P.y=s*Math.sin(re),H.subVectors(x,P).normalize(),m.push(H.x,H.y,H.z),D.push(ne/u),D.push(_/t)}for(let _=1;_<=t;_++)for(let ne=1;ne<=u;ne++){const re=(u+1)*_+ne-1,J=(u+1)*(_-1)+ne-1,K=(u+1)*(_-1)+ne,Ie=(u+1)*_+ne;f.push(re,J,Ie),f.push(J,K,Ie)}this.setIndex(f),this.setAttribute("position",new bi(d,3)),this.setAttribute("normal",new bi(m,3)),this.setAttribute("uv",new bi(D,2))}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}static fromJSON(s){return new MO(s.radius,s.tube,s.radialSegments,s.tubularSegments,s.arc)}}class i4e extends Mi{constructor(s=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:s},s!==null){const n=[],t=new Set,u=new ze,o=new ze;if(s.index!==null){const f=s.attributes.position,d=s.index;let m=s.groups;m.length===0&&(m=[{start:0,count:d.count,materialIndex:0}]);for(let D=0,P=m.length;D<P;++D){const x=m[D],H=x.start,_=x.count;for(let ne=H,re=H+_;ne<re;ne+=3)for(let J=0;J<3;J++){const K=d.getX(ne+J),Ie=d.getX(ne+(J+1)%3);u.fromBufferAttribute(f,K),o.fromBufferAttribute(f,Ie),rQ(u,o,t)===!0&&(n.push(u.x,u.y,u.z),n.push(o.x,o.y,o.z))}}}else{const f=s.attributes.position;for(let d=0,m=f.count/3;d<m;d++)for(let D=0;D<3;D++){const P=3*d+D,x=3*d+(D+1)%3;u.fromBufferAttribute(f,P),o.fromBufferAttribute(f,x),rQ(u,o,t)===!0&&(n.push(u.x,u.y,u.z),n.push(o.x,o.y,o.z))}}this.setAttribute("position",new bi(n,3))}}copy(s){return super.copy(s),this.parameters=Object.assign({},s.parameters),this}}function rQ(e,s,n){const t=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`,u=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`;return n.has(t)===!0||n.has(u)===!0?!1:(n.add(t),n.add(u),!0)}class Tj extends hb{constructor(s){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ps(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ps(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oX,this.normalScale=new us(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ck,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(s)}copy(s){return super.copy(s),this.color.copy(s.color),this.map=s.map,this.lightMap=s.lightMap,this.lightMapIntensity=s.lightMapIntensity,this.aoMap=s.aoMap,this.aoMapIntensity=s.aoMapIntensity,this.emissive.copy(s.emissive),this.emissiveMap=s.emissiveMap,this.emissiveIntensity=s.emissiveIntensity,this.bumpMap=s.bumpMap,this.bumpScale=s.bumpScale,this.normalMap=s.normalMap,this.normalMapType=s.normalMapType,this.normalScale.copy(s.normalScale),this.displacementMap=s.displacementMap,this.displacementScale=s.displacementScale,this.displacementBias=s.displacementBias,this.specularMap=s.specularMap,this.alphaMap=s.alphaMap,this.envMap=s.envMap,this.combine=s.combine,this.reflectivity=s.reflectivity,this.refractionRatio=s.refractionRatio,this.wireframe=s.wireframe,this.wireframeLinewidth=s.wireframeLinewidth,this.wireframeLinecap=s.wireframeLinecap,this.wireframeLinejoin=s.wireframeLinejoin,this.flatShading=s.flatShading,this.fog=s.fog,this}}class HX extends wa{constructor(s,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ps(s),this.intensity=n}dispose(){}copy(s,n){return super.copy(s,n),this.color.copy(s.color),this.intensity=s.intensity,this}toJSON(s){const n=super.toJSON(s);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const cz=new Fn,iQ=new ze,uQ=new ze;class sce{constructor(s){this.camera=s,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new us(512,512),this.map=null,this.mapPass=null,this.matrix=new Fn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bk,this._frameExtents=new us(1,1),this._viewportCount=1,this._viewports=[new Uc(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(s){const n=this.camera,t=this.matrix;iQ.setFromMatrixPosition(s.matrixWorld),n.position.copy(iQ),uQ.setFromMatrixPosition(s.target.matrixWorld),n.lookAt(uQ),n.updateMatrixWorld(),cz.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cz),t.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),t.multiply(cz)}getViewport(s){return this._viewports[s]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(s){return this.camera=s.camera.clone(),this.bias=s.bias,this.radius=s.radius,this.mapSize.copy(s.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const s={};return this.bias!==0&&(s.bias=this.bias),this.normalBias!==0&&(s.normalBias=this.normalBias),this.radius!==1&&(s.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(s.mapSize=this.mapSize.toArray()),s.camera=this.camera.toJSON(!1).object,delete s.camera.matrix,s}}class lce extends sce{constructor(){super(new gG(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rce extends HX{constructor(s,n){super(s,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wa.DEFAULT_UP),this.updateMatrix(),this.target=new wa,this.shadow=new lce}dispose(){this.shadow.dispose()}copy(s){return super.copy(s),this.target=s.target.clone(),this.shadow=s.shadow.clone(),this}}class ice extends HX{constructor(s,n){super(s,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class u4e extends Mi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(s){return super.copy(s),this.instanceCount=s.instanceCount,this}toJSON(){const s=super.toJSON();return s.instanceCount=this.instanceCount,s.isInstancedBufferGeometry=!0,s}}class uce{constructor(s=!0){this.autoStart=s,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=aQ(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let s=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=aQ();s=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=s}return s}}function aQ(){return(typeof performance>"u"?Date:performance).now()}class a4e extends Hoe{constructor(s,n,t=1){super(s,n),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=t}copy(s){return super.copy(s),this.meshPerAttribute=s.meshPerAttribute,this}clone(s){const n=super.clone(s);return n.meshPerAttribute=this.meshPerAttribute,n}toJSON(s){const n=super.toJSON(s);return n.isInstancedInterleavedBuffer=!0,n.meshPerAttribute=this.meshPerAttribute,n}}class Vk{constructor(s,n,t=0,u=1/0){this.ray=new yM(s,n),this.near=t,this.far=u,this.camera=null,this.layers=new Uk,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(s,n){this.ray.set(s,n)}setFromCamera(s,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(s.x,s.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(s.x,s.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(s,n=!0,t=[]){return mj(s,this,t,n),t.sort(oQ),t}intersectObjects(s,n=!0,t=[]){for(let u=0,o=s.length;u<o;u++)mj(s[u],this,t,n);return t.sort(oQ),t}}function oQ(e,s){return e.distance-s.distance}function mj(e,s,n,t){if(e.layers.test(s.layers)&&e.raycast(s,n),t===!0){const u=e.children;for(let o=0,f=u.length;o<f;o++)mj(u[o],s,n,!0)}}class ace{constructor(s=1,n=0,t=0){return this.radius=s,this.phi=n,this.theta=t,this}set(s,n,t){return this.radius=s,this.phi=n,this.theta=t,this}copy(s){return this.radius=s.radius,this.phi=s.phi,this.theta=s.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(s){return this.setFromCartesianCoords(s.x,s.y,s.z)}setFromCartesianCoords(s,n,t){return this.radius=Math.sqrt(s*s+n*n+t*t),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(s,t),this.phi=Math.acos(Dd(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const cQ=new ze,m_=new ze;class uo{constructor(s=new ze,n=new ze){this.start=s,this.end=n}set(s,n){return this.start.copy(s),this.end.copy(n),this}copy(s){return this.start.copy(s.start),this.end.copy(s.end),this}getCenter(s){return s.addVectors(this.start,this.end).multiplyScalar(.5)}delta(s){return s.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(s,n){return this.delta(n).multiplyScalar(s).add(this.start)}closestPointToPointParameter(s,n){cQ.subVectors(s,this.start),m_.subVectors(this.end,this.start);const t=m_.dot(m_);let o=m_.dot(cQ)/t;return n&&(o=Dd(o,0,1)),o}closestPointToPoint(s,n,t){const u=this.closestPointToPointParameter(s,n);return this.delta(t).multiplyScalar(u).add(this.start)}applyMatrix4(s){return this.start.applyMatrix4(s),this.end.applyMatrix4(s),this}equals(s){return s.start.equals(this.start)&&s.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bk}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bk);var oce=Object.defineProperty,cce=(e,s,n)=>s in e?oce(e,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[s]=n,hs=(e,s,n)=>(cce(e,typeof s!="symbol"?s+"":s,n),n);let Rj=class extends K9{constructor(s,n,t,u){if(super(s,n,t),hs(this,"fragment"),hs(this,"material"),hs(this,"geometry"),Array.isArray(n)||(n=[n]),this.material=n,!s.index)throw new Error("The geometry for fragments must be indexed!");this.geometry=s,this.fragment=u;const o=s.index.count;s.groups.length||s.groups.push({start:0,count:o,materialIndex:0})}exportData(){const s=this.geometry.attributes.position.array,n=this.geometry.attributes.normal.array,t=Array.from(this.geometry.index.array),u=[];for(const m of this.geometry.groups){const D=m.materialIndex||0,{start:P,count:x}=m;u.push(P,x,D)}const o=[];if(Array.isArray(this.material))for(const m of this.material){const D=m.opacity,P=m.transparent?1:0,x=new ps(m.color).toArray();o.push(D,P,...x)}const f=Array.from(this.instanceMatrix.array);let d;return this.instanceColor!==null?d=Array.from(this.instanceColor.array):d=[],{position:s,normal:n,index:t,groups:u,materials:o,matrices:f,colors:d}}};const FX=0,hce=1,fce=2,hQ=2,hz=1.25,fQ=1,oV=6*4+4+4,PW=65535,dce=Math.pow(2,-24),fz=Symbol("SKIP_GENERATION");function Ice(e){return e.index?e.index.count:e.attributes.position.count}function pM(e){return Ice(e)/3}function yce(e,s=ArrayBuffer){return e>65535?new Uint32Array(new s(4*e)):new Uint16Array(new s(2*e))}function wce(e,s){if(!e.index){const n=e.attributes.position.count,t=s.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,u=yce(n,t);e.setIndex(new Ea(u,1));for(let o=0;o<n;o++)u[o]=o}}function GX(e){const s=pM(e),n=e.drawRange,t=n.start/3,u=(n.start+n.count)/3,o=Math.max(0,t),f=Math.min(s,u)-o;return[{offset:Math.floor(o),count:Math.floor(f)}]}function _X(e){if(!e.groups||!e.groups.length)return GX(e);const s=[],n=new Set,t=e.drawRange,u=t.start/3,o=(t.start+t.count)/3;for(const d of e.groups){const m=d.start/3,D=(d.start+d.count)/3;n.add(Math.max(u,m)),n.add(Math.min(o,D))}const f=Array.from(n.values()).sort((d,m)=>d-m);for(let d=0;d<f.length-1;d++){const m=f[d],D=f[d+1];s.push({offset:Math.floor(m),count:Math.floor(D-m)})}return s}function Ece(e){if(e.groups.length===0)return!1;const s=pM(e),n=_X(e).sort((o,f)=>o.offset-f.offset),t=n[n.length-1];t.count=Math.min(s-t.offset,t.count);let u=0;return n.forEach(({count:o})=>u+=o),s!==u}function ou(e,s,n){return n.min.x=s[e],n.min.y=s[e+1],n.min.z=s[e+2],n.max.x=s[e+3],n.max.y=s[e+4],n.max.z=s[e+5],n}function pce(e){e[0]=e[1]=e[2]=1/0,e[3]=e[4]=e[5]=-1/0}function dQ(e){let s=-1,n=-1/0;for(let t=0;t<3;t++){const u=e[t+3]-e[t];u>n&&(n=u,s=t)}return s}function IQ(e,s){s.set(e)}function yQ(e,s,n){let t,u;for(let o=0;o<3;o++){const f=o+3;t=e[o],u=s[o],n[o]=t<u?t:u,t=e[f],u=s[f],n[f]=t>u?t:u}}function R_(e,s,n){for(let t=0;t<3;t++){const u=s[e+2*t],o=s[e+2*t+1],f=u-o,d=u+o;f<n[t]&&(n[t]=f),d>n[t+3]&&(n[t+3]=d)}}function OH(e){const s=e[3]-e[0],n=e[4]-e[1],t=e[5]-e[2];return 2*(s*n+n*t+t*s)}function dz(e,s,n,t,u=null){let o=1/0,f=1/0,d=1/0,m=-1/0,D=-1/0,P=-1/0,x=1/0,H=1/0,_=1/0,ne=-1/0,re=-1/0,J=-1/0;const K=u!==null;for(let Ie=s*6,ce=(s+n)*6;Ie<ce;Ie+=6){const ae=e[Ie+0],me=e[Ie+1],Ee=ae-me,Ae=ae+me;Ee<o&&(o=Ee),Ae>m&&(m=Ae),K&&ae<x&&(x=ae),K&&ae>ne&&(ne=ae);const Me=e[Ie+2],we=e[Ie+3],Te=Me-we,je=Me+we;Te<f&&(f=Te),je>D&&(D=je),K&&Me<H&&(H=Me),K&&Me>re&&(re=Me);const Ke=e[Ie+4],lt=e[Ie+5],Ze=Ke-lt,it=Ke+lt;Ze<d&&(d=Ze),it>P&&(P=it),K&&Ke<_&&(_=Ke),K&&Ke>J&&(J=Ke)}t[0]=o,t[1]=f,t[2]=d,t[3]=m,t[4]=D,t[5]=P,K&&(u[0]=x,u[1]=H,u[2]=_,u[3]=ne,u[4]=re,u[5]=J)}function Tce(e,s,n,t){let u=1/0,o=1/0,f=1/0,d=-1/0,m=-1/0,D=-1/0;for(let P=s*6,x=(s+n)*6;P<x;P+=6){const H=e[P+0];H<u&&(u=H),H>d&&(d=H);const _=e[P+2];_<o&&(o=_),_>m&&(m=_);const ne=e[P+4];ne<f&&(f=ne),ne>D&&(D=ne)}t[0]=u,t[1]=o,t[2]=f,t[3]=d,t[4]=m,t[5]=D}function mce(e,s){pce(s);const n=e.attributes.position,t=e.index?e.index.array:null,u=pM(e),o=new Float32Array(u*6),f=n.normalized,d=n.array,m=n.offset||0;let D=3;n.isInterleavedBufferAttribute&&(D=n.data.stride);const P=["getX","getY","getZ"];for(let x=0;x<u;x++){const H=x*3,_=x*6;let ne=H+0,re=H+1,J=H+2;t&&(ne=t[ne],re=t[re],J=t[J]),f||(ne=ne*D+m,re=re*D+m,J=J*D+m);for(let K=0;K<3;K++){let Ie,ce,ae;f?(Ie=n[P[K]](ne),ce=n[P[K]](re),ae=n[P[K]](J)):(Ie=d[ne+K],ce=d[re+K],ae=d[J+K]);let me=Ie;ce<me&&(me=ce),ae<me&&(me=ae);let Ee=Ie;ce>Ee&&(Ee=ce),ae>Ee&&(Ee=ae);const Ae=(Ee-me)/2,Me=K*2;o[_+Me+0]=me+Ae,o[_+Me+1]=Ae+(Math.abs(me)+Ae)*dce,me<s[K]&&(s[K]=me),Ee>s[K+3]&&(s[K+3]=Ee)}}return o}const z6=32,Rce=(e,s)=>e.candidate-s.candidate,cS=new Array(z6).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),A_=new Float32Array(6);function Ace(e,s,n,t,u,o){let f=-1,d=0;if(o===FX)f=dQ(s),f!==-1&&(d=(s[f]+s[f+3])/2);else if(o===hce)f=dQ(e),f!==-1&&(d=Dce(n,t,u,f));else if(o===fce){const m=OH(e);let D=hz*u;const P=t*6,x=(t+u)*6;for(let H=0;H<3;H++){const _=s[H],ne=(s[H+3]-_)/z6;if(u<z6/4){const re=[...cS];re.length=u;let J=0;for(let Ie=P;Ie<x;Ie+=6,J++){const ce=re[J];ce.candidate=n[Ie+2*H],ce.count=0;const{bounds:ae,leftCacheBounds:me,rightCacheBounds:Ee}=ce;for(let Ae=0;Ae<3;Ae++)Ee[Ae]=1/0,Ee[Ae+3]=-1/0,me[Ae]=1/0,me[Ae+3]=-1/0,ae[Ae]=1/0,ae[Ae+3]=-1/0;R_(Ie,n,ae)}re.sort(Rce);let K=u;for(let Ie=0;Ie<K;Ie++){const ce=re[Ie];for(;Ie+1<K&&re[Ie+1].candidate===ce.candidate;)re.splice(Ie+1,1),K--}for(let Ie=P;Ie<x;Ie+=6){const ce=n[Ie+2*H];for(let ae=0;ae<K;ae++){const me=re[ae];ce>=me.candidate?R_(Ie,n,me.rightCacheBounds):(R_(Ie,n,me.leftCacheBounds),me.count++)}}for(let Ie=0;Ie<K;Ie++){const ce=re[Ie],ae=ce.count,me=u-ce.count,Ee=ce.leftCacheBounds,Ae=ce.rightCacheBounds;let Me=0;ae!==0&&(Me=OH(Ee)/m);let we=0;me!==0&&(we=OH(Ae)/m);const Te=fQ+hz*(Me*ae+we*me);Te<D&&(f=H,D=Te,d=ce.candidate)}}else{for(let K=0;K<z6;K++){const Ie=cS[K];Ie.count=0,Ie.candidate=_+ne+K*ne;const ce=Ie.bounds;for(let ae=0;ae<3;ae++)ce[ae]=1/0,ce[ae+3]=-1/0}for(let K=P;K<x;K+=6){let Ie=~~((n[K+2*H]-_)/ne);Ie>=z6&&(Ie=z6-1);const ce=cS[Ie];ce.count++,R_(K,n,ce.bounds)}const re=cS[z6-1];IQ(re.bounds,re.rightCacheBounds);for(let K=z6-2;K>=0;K--){const Ie=cS[K],ce=cS[K+1];yQ(Ie.bounds,ce.rightCacheBounds,Ie.rightCacheBounds)}let J=0;for(let K=0;K<z6-1;K++){const Ie=cS[K],ce=Ie.count,ae=Ie.bounds,me=cS[K+1].rightCacheBounds;ce!==0&&(J===0?IQ(ae,A_):yQ(ae,A_,A_)),J+=ce;let Ee=0,Ae=0;J!==0&&(Ee=OH(A_)/m);const Me=u-J;Me!==0&&(Ae=OH(me)/m);const we=fQ+hz*(Ee*J+Ae*Me);we<D&&(f=H,D=we,d=Ie.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:f,pos:d}}function Dce(e,s,n,t){let u=0;for(let o=s,f=s+n;o<f;o++)u+=e[o*6+t*2];return u/n}let D_=class{constructor(){}};function Sce(e,s,n,t,u,o){let f=t,d=t+u-1;const m=o.pos,D=o.axis*2;for(;;){for(;f<=d&&n[f*6+D]<m;)f++;for(;f<=d&&n[d*6+D]>=m;)d--;if(f<d){for(let P=0;P<3;P++){let x=s[f*3+P];s[f*3+P]=s[d*3+P],s[d*3+P]=x}for(let P=0;P<6;P++){let x=n[f*6+P];n[f*6+P]=n[d*6+P],n[d*6+P]=x}f++,d--}else return f}}function Nce(e,s,n,t,u,o){let f=t,d=t+u-1;const m=o.pos,D=o.axis*2;for(;;){for(;f<=d&&n[f*6+D]<m;)f++;for(;f<=d&&n[d*6+D]>=m;)d--;if(f<d){let P=e[f];e[f]=e[d],e[d]=P;for(let x=0;x<6;x++){let H=n[f*6+x];n[f*6+x]=n[d*6+x],n[d*6+x]=H}f++,d--}else return f}}function gce(e,s){const n=(e.index?e.index.count:e.attributes.position.count)/3,t=n>2**16,u=t?4:2,o=s?new SharedArrayBuffer(n*u):new ArrayBuffer(n*u),f=t?new Uint32Array(o):new Uint16Array(o);for(let d=0,m=f.length;d<m;d++)f[d]=d;return f}function Oce(e,s){const n=e.geometry,t=n.index?n.index.array:null,u=s.maxDepth,o=s.verbose,f=s.maxLeafTris,d=s.strategy,m=s.onProgress,D=pM(n),P=e._indirectBuffer;let x=!1;const H=new Float32Array(6),_=new Float32Array(6),ne=mce(n,H),re=s.indirect?Nce:Sce,J=[],K=s.indirect?GX(n):_X(n);if(K.length===1){const ae=K[0],me=new D_;me.boundingData=H,Tce(ne,ae.offset,ae.count,_),ce(me,ae.offset,ae.count,_),J.push(me)}else for(let ae of K){const me=new D_;me.boundingData=new Float32Array(6),dz(ne,ae.offset,ae.count,me.boundingData,_),ce(me,ae.offset,ae.count,_),J.push(me)}return J;function Ie(ae){m&&m(ae/D)}function ce(ae,me,Ee,Ae=null,Me=0){if(!x&&Me>=u&&(x=!0,o&&(console.warn(`MeshBVH: Max depth of ${u} reached when generating BVH. Consider increasing maxDepth.`),console.warn(n))),Ee<=f||Me>=u)return Ie(me+Ee),ae.offset=me,ae.count=Ee,ae;const we=Ace(ae.boundingData,Ae,ne,me,Ee,d);if(we.axis===-1)return Ie(me+Ee),ae.offset=me,ae.count=Ee,ae;const Te=re(P,t,ne,me,Ee,we);if(Te===me||Te===me+Ee)Ie(me+Ee),ae.offset=me,ae.count=Ee;else{ae.splitAxis=we.axis;const je=new D_,Ke=me,lt=Te-me;ae.left=je,je.boundingData=new Float32Array(6),dz(ne,Ke,lt,je.boundingData,_),ce(je,Ke,lt,_,Me+1);const Ze=new D_,it=Te,ot=Ee-lt;ae.right=Ze,Ze.boundingData=new Float32Array(6),dz(ne,it,ot,Ze.boundingData,_),ce(Ze,it,ot,_,Me+1)}return ae}}function Lce(e,s){const n=e.geometry;s.indirect&&(e._indirectBuffer=gce(n,s.useSharedArrayBuffer),Ece(n)&&!s.verbose&&console.warn('MeshBVH: Provided geometry contains groups that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),e._indirectBuffer||wce(n,s);const t=Oce(e,s);let u,o,f;const d=[],m=s.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer;for(let x=0;x<t.length;x++){const H=t[x];let _=D(H);const ne=new m(oV*_);u=new Float32Array(ne),o=new Uint32Array(ne),f=new Uint16Array(ne),P(0,H),d.push(ne)}e._roots=d;return;function D(x){return x.count?1:1+D(x.left)+D(x.right)}function P(x,H){const _=x/4,ne=x/2,re=!!H.count,J=H.boundingData;for(let K=0;K<6;K++)u[_+K]=J[K];if(re){const K=H.offset,Ie=H.count;return o[_+6]=K,f[ne+14]=Ie,f[ne+15]=PW,x+oV}else{const K=H.left,Ie=H.right,ce=H.splitAxis;let ae;if(ae=P(x+oV,K),ae/4>Math.pow(2,32))throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return o[_+6]=ae/4,ae=P(ae,Ie),o[_+7]=ce,ae}}}class oA{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(s,n){let t=1/0,u=-1/0;for(let o=0,f=s.length;o<f;o++){const d=s[o][n];t=d<t?d:t,u=d>u?d:u}this.min=t,this.max=u}setFromPoints(s,n){let t=1/0,u=-1/0;for(let o=0,f=n.length;o<f;o++){const d=n[o],m=s.dot(d);t=m<t?m:t,u=m>u?m:u}this.min=t,this.max=u}isSeparated(s){return this.min>s.max||s.min>this.max}}oA.prototype.setFromBox=function(){const e=new ze;return function(s,n){const t=n.min,u=n.max;let o=1/0,f=-1/0;for(let d=0;d<=1;d++)for(let m=0;m<=1;m++)for(let D=0;D<=1;D++){e.x=t.x*d+u.x*(1-d),e.y=t.y*m+u.y*(1-m),e.z=t.z*D+u.z*(1-D);const P=s.dot(e);o=Math.min(P,o),f=Math.max(P,f)}this.min=o,this.max=f}}();const bce=function(){const e=new ze,s=new ze,n=new ze;return function(t,u,o){const f=t.start,d=e,m=u.start,D=s;n.subVectors(f,m),e.subVectors(t.end,t.start),s.subVectors(u.end,u.start);const P=n.dot(D),x=D.dot(d),H=D.dot(D),_=n.dot(d),ne=d.dot(d)*H-x*x;let re,J;ne!==0?re=(P*x-_*H)/ne:re=0,J=(P+re*x)/H,o.x=re,o.y=J}}(),Wk=function(){const e=new us,s=new ze,n=new ze;return function(t,u,o,f){bce(t,u,e);let d=e.x,m=e.y;if(d>=0&&d<=1&&m>=0&&m<=1){t.at(d,o),u.at(m,f);return}else if(d>=0&&d<=1){m<0?u.at(0,f):u.at(1,f),t.closestPointToPoint(f,!0,o);return}else if(m>=0&&m<=1){d<0?t.at(0,o):t.at(1,o),u.closestPointToPoint(o,!0,f);return}else{let D;d<0?D=t.start:D=t.end;let P;m<0?P=u.start:P=u.end;const x=s,H=n;if(t.closestPointToPoint(P,!0,s),u.closestPointToPoint(D,!0,n),x.distanceToSquared(P)<=H.distanceToSquared(D)){o.copy(x),f.copy(P);return}else{o.copy(D),f.copy(H);return}}}}(),Cce=function(){const e=new ze,s=new ze,n=new Q0,t=new uo;return function(u,o){const{radius:f,center:d}=u,{a:m,b:D,c:P}=o;if(t.start=m,t.end=D,t.closestPointToPoint(d,!0,e).distanceTo(d)<=f||(t.start=m,t.end=P,t.closestPointToPoint(d,!0,e).distanceTo(d)<=f)||(t.start=D,t.end=P,t.closestPointToPoint(d,!0,e).distanceTo(d)<=f))return!0;const x=o.getPlane(n);if(Math.abs(x.distanceToPoint(d))<=f){const H=x.projectPoint(d,s);if(o.containsPoint(H))return!0}return!1}}(),Pce=1e-15;function Iz(e){return Math.abs(e)<Pce}class Pp extends yu{constructor(...s){super(...s),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new ze),this.satBounds=new Array(4).fill().map(()=>new oA),this.points=[this.a,this.b,this.c],this.sphere=new Sw,this.plane=new Q0,this.needsUpdate=!0}intersectsSphere(s){return Cce(s,this)}update(){const s=this.a,n=this.b,t=this.c,u=this.points,o=this.satAxes,f=this.satBounds,d=o[0],m=f[0];this.getNormal(d),m.setFromPoints(d,u);const D=o[1],P=f[1];D.subVectors(s,n),P.setFromPoints(D,u);const x=o[2],H=f[2];x.subVectors(n,t),H.setFromPoints(x,u);const _=o[3],ne=f[3];_.subVectors(t,s),ne.setFromPoints(_,u),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(d,s),this.needsUpdate=!1}}Pp.prototype.closestPointToSegment=function(){const e=new ze,s=new ze,n=new uo;return function(t,u=null,o=null){const{start:f,end:d}=t,m=this.points;let D,P=1/0;for(let x=0;x<3;x++){const H=(x+1)%3;n.start.copy(m[x]),n.end.copy(m[H]),Wk(n,t,e,s),D=e.distanceToSquared(s),D<P&&(P=D,u&&u.copy(e),o&&o.copy(s))}return this.closestPointToPoint(f,e),D=f.distanceToSquared(e),D<P&&(P=D,u&&u.copy(e),o&&o.copy(f)),this.closestPointToPoint(d,e),D=d.distanceToSquared(e),D<P&&(P=D,u&&u.copy(e),o&&o.copy(d)),Math.sqrt(P)}}();Pp.prototype.intersectsTriangle=function(){const e=new Pp,s=new Array(3),n=new Array(3),t=new oA,u=new oA,o=new ze,f=new ze,d=new ze,m=new ze,D=new ze,P=new uo,x=new uo,H=new uo,_=new ze;function ne(re,J,K){const Ie=re.points;let ce=0,ae=-1;for(let me=0;me<3;me++){const{start:Ee,end:Ae}=P;Ee.copy(Ie[me]),Ae.copy(Ie[(me+1)%3]),P.delta(f);const Me=Iz(J.distanceToPoint(Ee));if(Iz(J.normal.dot(f))&&Me){K.copy(P),ce=2;break}const we=J.intersectLine(P,_);if(!we&&Me&&_.copy(Ee),(we||Me)&&!Iz(_.distanceTo(Ae))){if(ce<=1)(ce===1?K.start:K.end).copy(_),Me&&(ae=ce);else if(ce>=2){(ae===1?K.start:K.end).copy(_),ce=2;break}if(ce++,ce===2&&ae===-1)break}}return ce}return function(re,J=null,K=!1){this.needsUpdate&&this.update(),re.isExtendedTriangle?re.needsUpdate&&re.update():(e.copy(re),e.update(),re=e);const Ie=this.plane,ce=re.plane;if(Math.abs(Ie.normal.dot(ce.normal))>1-1e-10){const ae=this.satBounds,me=this.satAxes;n[0]=re.a,n[1]=re.b,n[2]=re.c;for(let Me=0;Me<4;Me++){const we=ae[Me],Te=me[Me];if(t.setFromPoints(Te,n),we.isSeparated(t))return!1}const Ee=re.satBounds,Ae=re.satAxes;s[0]=this.a,s[1]=this.b,s[2]=this.c;for(let Me=0;Me<4;Me++){const we=Ee[Me],Te=Ae[Me];if(t.setFromPoints(Te,s),we.isSeparated(t))return!1}for(let Me=0;Me<4;Me++){const we=me[Me];for(let Te=0;Te<4;Te++){const je=Ae[Te];if(o.crossVectors(we,je),t.setFromPoints(o,s),u.setFromPoints(o,n),t.isSeparated(u))return!1}}return J&&(K||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),J.start.set(0,0,0),J.end.set(0,0,0)),!0}else{const ae=ne(this,ce,x);if(ae===1&&re.containsPoint(x.end))return J&&(J.start.copy(x.end),J.end.copy(x.end)),!0;if(ae!==2)return!1;const me=ne(re,Ie,H);if(me===1&&this.containsPoint(H.end))return J&&(J.start.copy(H.end),J.end.copy(H.end)),!0;if(me!==2)return!1;if(x.delta(d),H.delta(m),d.dot(m)<0){let Ke=H.start;H.start=H.end,H.end=Ke}const Ee=x.start.dot(d),Ae=x.end.dot(d),Me=H.start.dot(d),we=H.end.dot(d),Te=Ae<Me,je=Ee<we;return Ee!==we&&Me!==Ae&&Te===je?!1:(J&&(D.subVectors(x.start,H.start),D.dot(d)>0?J.start.copy(x.start):J.start.copy(H.start),D.subVectors(x.end,H.end),D.dot(d)<0?J.end.copy(x.end):J.end.copy(H.end)),!0)}}}();Pp.prototype.distanceToPoint=function(){const e=new ze;return function(s){return this.closestPointToPoint(s,e),s.distanceTo(e)}}();Pp.prototype.distanceToTriangle=function(){const e=new ze,s=new ze,n=["a","b","c"],t=new uo,u=new uo;return function(o,f=null,d=null){const m=f||d?t:null;if(this.intersectsTriangle(o,m))return(f||d)&&(f&&m.getCenter(f),d&&m.getCenter(d)),0;let D=1/0;for(let P=0;P<3;P++){let x;const H=n[P],_=o[H];this.closestPointToPoint(_,e),x=_.distanceToSquared(e),x<D&&(D=x,f&&f.copy(e),d&&d.copy(_));const ne=this[H];o.closestPointToPoint(ne,e),x=ne.distanceToSquared(e),x<D&&(D=x,f&&f.copy(ne),d&&d.copy(e))}for(let P=0;P<3;P++){const x=n[P],H=n[(P+1)%3];t.set(this[x],this[H]);for(let _=0;_<3;_++){const ne=n[_],re=n[(_+1)%3];u.set(o[ne],o[re]),Wk(t,u,e,s);const J=e.distanceToSquared(s);J<D&&(D=J,f&&f.copy(e),d&&d.copy(s))}}return Math.sqrt(D)}}();let n3=class{constructor(s,n,t){this.isOrientedBox=!0,this.min=new ze,this.max=new ze,this.matrix=new Fn,this.invMatrix=new Fn,this.points=new Array(8).fill().map(()=>new ze),this.satAxes=new Array(3).fill().map(()=>new ze),this.satBounds=new Array(3).fill().map(()=>new oA),this.alignedSatBounds=new Array(3).fill().map(()=>new oA),this.needsUpdate=!1,s&&this.min.copy(s),n&&this.max.copy(n),t&&this.matrix.copy(t)}set(s,n,t){this.min.copy(s),this.max.copy(n),this.matrix.copy(t),this.needsUpdate=!0}copy(s){this.min.copy(s.min),this.max.copy(s.max),this.matrix.copy(s.matrix),this.needsUpdate=!0}};n3.prototype.update=function(){return function(){const e=this.matrix,s=this.min,n=this.max,t=this.points;for(let m=0;m<=1;m++)for(let D=0;D<=1;D++)for(let P=0;P<=1;P++){const x=1*m|2*D|4*P,H=t[x];H.x=m?n.x:s.x,H.y=D?n.y:s.y,H.z=P?n.z:s.z,H.applyMatrix4(e)}const u=this.satBounds,o=this.satAxes,f=t[0];for(let m=0;m<3;m++){const D=o[m],P=u[m],x=1<<m,H=t[x];D.subVectors(f,H),P.setFromPoints(D,t)}const d=this.alignedSatBounds;d[0].setFromPointsField(t,"x"),d[1].setFromPointsField(t,"y"),d[2].setFromPointsField(t,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();n3.prototype.intersectsBox=function(){const e=new oA;return function(s){this.needsUpdate&&this.update();const n=s.min,t=s.max,u=this.satBounds,o=this.satAxes,f=this.alignedSatBounds;if(e.min=n.x,e.max=t.x,f[0].isSeparated(e)||(e.min=n.y,e.max=t.y,f[1].isSeparated(e))||(e.min=n.z,e.max=t.z,f[2].isSeparated(e)))return!1;for(let d=0;d<3;d++){const m=o[d],D=u[d];if(e.setFromBox(m,s),D.isSeparated(e))return!1}return!0}}();n3.prototype.intersectsTriangle=function(){const e=new Pp,s=new Array(3),n=new oA,t=new oA,u=new ze;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(e.copy(o),e.update(),o=e);const f=this.satBounds,d=this.satAxes;s[0]=o.a,s[1]=o.b,s[2]=o.c;for(let x=0;x<3;x++){const H=f[x],_=d[x];if(n.setFromPoints(_,s),H.isSeparated(n))return!1}const m=o.satBounds,D=o.satAxes,P=this.points;for(let x=0;x<3;x++){const H=m[x],_=D[x];if(n.setFromPoints(_,P),H.isSeparated(n))return!1}for(let x=0;x<3;x++){const H=d[x];for(let _=0;_<4;_++){const ne=D[_];if(u.crossVectors(H,ne),n.setFromPoints(u,s),t.setFromPoints(u,P),n.isSeparated(t))return!1}}return!0}}();n3.prototype.closestPointToPoint=function(){return function(e,s){return this.needsUpdate&&this.update(),s.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),s}}();n3.prototype.distanceToPoint=function(){const e=new ze;return function(s){return this.closestPointToPoint(s,e),s.distanceTo(e)}}();n3.prototype.distanceToBox=function(){const e=["x","y","z"],s=new Array(12).fill().map(()=>new uo),n=new Array(12).fill().map(()=>new uo),t=new ze,u=new ze;return function(o,f=0,d=null,m=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(d||m)&&(o.getCenter(u),this.closestPointToPoint(u,t),o.closestPointToPoint(t,u),d&&d.copy(t),m&&m.copy(u)),0;const D=f*f,P=o.min,x=o.max,H=this.points;let _=1/0;for(let re=0;re<8;re++){const J=H[re];u.copy(J).clamp(P,x);const K=J.distanceToSquared(u);if(K<_&&(_=K,d&&d.copy(J),m&&m.copy(u),K<D))return Math.sqrt(K)}let ne=0;for(let re=0;re<3;re++)for(let J=0;J<=1;J++)for(let K=0;K<=1;K++){const Ie=(re+1)%3,ce=(re+2)%3,ae=J<<Ie|K<<ce,me=1<<re|J<<Ie|K<<ce,Ee=H[ae],Ae=H[me];s[ne].set(Ee,Ae);const Me=e[re],we=e[Ie],Te=e[ce],je=n[ne],Ke=je.start,lt=je.end;Ke[Me]=P[Me],Ke[we]=J?P[we]:x[we],Ke[Te]=K?P[Te]:x[we],lt[Me]=x[Me],lt[we]=J?P[we]:x[we],lt[Te]=K?P[Te]:x[we],ne++}for(let re=0;re<=1;re++)for(let J=0;J<=1;J++)for(let K=0;K<=1;K++){u.x=re?x.x:P.x,u.y=J?x.y:P.y,u.z=K?x.z:P.z,this.closestPointToPoint(u,t);const Ie=u.distanceToSquared(t);if(Ie<_&&(_=Ie,d&&d.copy(t),m&&m.copy(u),Ie<D))return Math.sqrt(Ie)}for(let re=0;re<12;re++){const J=s[re];for(let K=0;K<12;K++){const Ie=n[K];Wk(J,Ie,t,u);const ce=t.distanceToSquared(u);if(ce<_&&(_=ce,d&&d.copy(t),m&&m.copy(u),ce<D))return Math.sqrt(ce)}}return Math.sqrt(_)}}();let Yk=class{constructor(s){this._getNewPrimitive=s,this._primitives=[]}getPrimitive(){const s=this._primitives;return s.length===0?this._getNewPrimitive():s.pop()}releasePrimitive(s){this._primitives.push(s)}},Mce=class extends Yk{constructor(){super(()=>new Pp)}};const nw=new Mce;function Hy(e,s){return s[e+15]===65535}function _y(e,s){return s[e+6]}function sw(e,s){return s[e+14]}function lw(e){return e+8}function rw(e,s){return s[e+6]}function VX(e,s){return s[e+7]}let xce=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const s=[];let n=null;this.setBuffer=t=>{n&&s.push(n),n=t,this.float32Array=new Float32Array(t),this.uint16Array=new Uint16Array(t),this.uint32Array=new Uint32Array(t)},this.clearBuffer=()=>{n=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,s.length!==0&&this.setBuffer(s.pop())}}};const Ci=new xce;let ZS,b9;const bP=[],S_=new Yk(()=>new tl);function Uce(e,s,n,t,u,o){ZS=S_.getPrimitive(),b9=S_.getPrimitive(),bP.push(ZS,b9),Ci.setBuffer(e._roots[s]);const f=Aj(0,e.geometry,n,t,u,o);Ci.clearBuffer(),S_.releasePrimitive(ZS),S_.releasePrimitive(b9),bP.pop(),bP.pop();const d=bP.length;return d>0&&(b9=bP[d-1],ZS=bP[d-2]),f}function Aj(e,s,n,t,u=null,o=0,f=0){const{float32Array:d,uint16Array:m,uint32Array:D}=Ci;let P=e*2;if(Hy(P,m)){const x=_y(e,D),H=sw(P,m);return ou(e,d,ZS),t(x,H,!1,f,o+e,ZS)}else{let x=function(je){const{uint16Array:Ke,uint32Array:lt}=Ci;let Ze=je*2;for(;!Hy(Ze,Ke);)je=lw(je),Ze=je*2;return _y(je,lt)},H=function(je){const{uint16Array:Ke,uint32Array:lt}=Ci;let Ze=je*2;for(;!Hy(Ze,Ke);)je=rw(je,lt),Ze=je*2;return _y(je,lt)+sw(Ze,Ke)};const _=lw(e),ne=rw(e,D);let re=_,J=ne,K,Ie,ce,ae;if(u&&(ce=ZS,ae=b9,ou(re,d,ce),ou(J,d,ae),K=u(ce),Ie=u(ae),Ie<K)){re=ne,J=_;const je=K;K=Ie,Ie=je,ce=ae}ce||(ce=ZS,ou(re,d,ce));const me=Hy(re*2,m),Ee=n(ce,me,K,f+1,o+re);let Ae;if(Ee===hQ){const je=x(re),Ke=H(re)-je;Ae=t(je,Ke,!0,f+1,o+re,ce)}else Ae=Ee&&Aj(re,s,n,t,u,o,f+1);if(Ae)return!0;ae=b9,ou(J,d,ae);const Me=Hy(J*2,m),we=n(ae,Me,Ie,f+1,o+J);let Te;if(we===hQ){const je=x(J),Ke=H(J)-je;Te=t(je,Ke,!0,f+1,o+J,ae)}else Te=we&&Aj(J,s,n,t,u,o,f+1);return!!Te}}const LH=new ze,yz=new ze;function Bce(e,s,n={},t=0,u=1/0){const o=t*t,f=u*u;let d=1/0,m=null;if(e.shapecast({boundsTraverseOrder:P=>(LH.copy(s).clamp(P.min,P.max),LH.distanceToSquared(s)),intersectsBounds:(P,x,H)=>H<d&&H<f,intersectsTriangle:(P,x)=>{P.closestPointToPoint(s,LH);const H=s.distanceToSquared(LH);return H<d&&(yz.copy(LH),d=H,m=x),H<o}}),d===1/0)return null;const D=Math.sqrt(d);return n.point?n.point.copy(yz):n.point=yz.clone(),n.distance=D,n.faceIndex=m,n}const CP=new ze,PP=new ze,MP=new ze,N_=new us,g_=new us,O_=new us,wQ=new ze,EQ=new ze,pQ=new ze,L_=new ze;function Hce(e,s,n,t,u,o){let f;return o===YI?f=e.intersectTriangle(t,n,s,!0,u):f=e.intersectTriangle(s,n,t,o!==Z0,u),f===null?null:{distance:e.origin.distanceTo(u),point:u.clone()}}function Fce(e,s,n,t,u,o,f,d,m){CP.fromBufferAttribute(s,o),PP.fromBufferAttribute(s,f),MP.fromBufferAttribute(s,d);const D=Hce(e,CP,PP,MP,L_,m);if(D){t&&(N_.fromBufferAttribute(t,o),g_.fromBufferAttribute(t,f),O_.fromBufferAttribute(t,d),D.uv=yu.getInterpolation(L_,CP,PP,MP,N_,g_,O_,new us)),u&&(N_.fromBufferAttribute(u,o),g_.fromBufferAttribute(u,f),O_.fromBufferAttribute(u,d),D.uv1=yu.getInterpolation(L_,CP,PP,MP,N_,g_,O_,new us)),n&&(wQ.fromBufferAttribute(n,o),EQ.fromBufferAttribute(n,f),pQ.fromBufferAttribute(n,d),D.normal=yu.getInterpolation(L_,CP,PP,MP,wQ,EQ,pQ,new ze),D.normal.dot(e.direction)>0&&D.normal.multiplyScalar(-1));const P={a:o,b:f,c:d,normal:new ze,materialIndex:0};yu.getNormal(CP,PP,MP,P.normal),D.face=P,D.faceIndex=o}return D}function MW(e,s,n,t,u){const o=t*3;let f=o+0,d=o+1,m=o+2;const D=e.index;e.index&&(f=D.getX(f),d=D.getX(d),m=D.getX(m));const{position:P,normal:x,uv:H,uv1:_}=e.attributes,ne=Fce(n,P,x,H,_,f,d,m,s);return ne?(ne.faceIndex=t,u&&u.push(ne),ne):null}function lo(e,s,n,t){const u=e.a,o=e.b,f=e.c;let d=s,m=s+1,D=s+2;n&&(d=n.getX(d),m=n.getX(m),D=n.getX(D)),u.x=t.getX(d),u.y=t.getY(d),u.z=t.getZ(d),o.x=t.getX(m),o.y=t.getY(m),o.z=t.getZ(m),f.x=t.getX(D),f.y=t.getY(D),f.z=t.getZ(D)}function Gce(e,s,n,t,u,o){const{geometry:f,_indirectBuffer:d}=e;for(let m=t,D=t+u;m<D;m++)MW(f,s,n,m,o)}function _ce(e,s,n,t,u){const{geometry:o,_indirectBuffer:f}=e;let d=1/0,m=null;for(let D=t,P=t+u;D<P;D++){let x;x=MW(o,s,n,D),x&&x.distance<d&&(m=x,d=x.distance)}return m}function Vce(e,s,n,t,u,o,f){const{geometry:d}=n,{index:m}=d,D=d.attributes.position;for(let P=e,x=s+e;P<x;P++){let H;if(H=P,lo(f,H*3,m,D),f.needsUpdate=!0,t(f,H,u,o))return!0}return!1}function Wce(e,s=null){s&&Array.isArray(s)&&(s=new Set(s));const n=e.geometry,t=n.index?n.index.array:null,u=n.attributes.position;let o,f,d,m,D=0;const P=e._roots;for(let H=0,_=P.length;H<_;H++)o=P[H],f=new Uint32Array(o),d=new Uint16Array(o),m=new Float32Array(o),x(0,D),D+=o.byteLength;function x(H,_,ne=!1){const re=H*2;if(d[re+15]===PW){const J=f[H+6],K=d[re+14];let Ie=1/0,ce=1/0,ae=1/0,me=-1/0,Ee=-1/0,Ae=-1/0;for(let Me=3*J,we=3*(J+K);Me<we;Me++){let Te=t[Me];const je=u.getX(Te),Ke=u.getY(Te),lt=u.getZ(Te);je<Ie&&(Ie=je),je>me&&(me=je),Ke<ce&&(ce=Ke),Ke>Ee&&(Ee=Ke),lt<ae&&(ae=lt),lt>Ae&&(Ae=lt)}return m[H+0]!==Ie||m[H+1]!==ce||m[H+2]!==ae||m[H+3]!==me||m[H+4]!==Ee||m[H+5]!==Ae?(m[H+0]=Ie,m[H+1]=ce,m[H+2]=ae,m[H+3]=me,m[H+4]=Ee,m[H+5]=Ae,!0):!1}else{const J=H+8,K=f[H+6],Ie=J+_,ce=K+_;let ae=ne,me=!1,Ee=!1;s?ae||(me=s.has(Ie),Ee=s.has(ce),ae=!me&&!Ee):(me=!0,Ee=!0);const Ae=ae||me,Me=ae||Ee;let we=!1;Ae&&(we=x(J,_,ae));let Te=!1;Me&&(Te=x(K,_,ae));const je=we||Te;if(je)for(let Ke=0;Ke<3;Ke++){const lt=J+Ke,Ze=K+Ke,it=m[lt],ot=m[lt+3],yt=m[Ze],Rt=m[Ze+3];m[H+Ke]=it<yt?it:yt,m[H+Ke+3]=ot>Rt?ot:Rt}return je}}}const TQ=new tl;function dN(e,s,n,t){return ou(e,s,TQ),n.intersectBox(TQ,t)}function Yce(e,s,n,t,u,o){const{geometry:f,_indirectBuffer:d}=e;for(let m=t,D=t+u;m<D;m++){let P=d?d[m]:m;MW(f,s,n,P,o)}}function zce(e,s,n,t,u){const{geometry:o,_indirectBuffer:f}=e;let d=1/0,m=null;for(let D=t,P=t+u;D<P;D++){let x;x=MW(o,s,n,f?f[D]:D),x&&x.distance<d&&(m=x,d=x.distance)}return m}function jce(e,s,n,t,u,o,f){const{geometry:d}=n,{index:m}=d,D=d.attributes.position;for(let P=e,x=s+e;P<x;P++){let H;if(H=n.resolveTriangleIndex(P),lo(f,H*3,m,D),f.needsUpdate=!0,t(f,H,u,o))return!0}return!1}const mQ=new ze;function kce(e,s,n,t,u){Ci.setBuffer(e._roots[s]),Dj(0,e,n,t,u),Ci.clearBuffer()}function Dj(e,s,n,t,u){const{float32Array:o,uint16Array:f,uint32Array:d}=Ci,m=e*2;if(Hy(m,f)){const D=_y(e,d),P=sw(m,f);Gce(s,n,t,D,P,u)}else{const D=lw(e);dN(D,o,t,mQ)&&Dj(D,s,n,t,u);const P=rw(e,d);dN(P,o,t,mQ)&&Dj(P,s,n,t,u)}}const RQ=new ze,qce=["x","y","z"];function $ce(e,s,n,t){Ci.setBuffer(e._roots[s]);const u=Sj(0,e,n,t);return Ci.clearBuffer(),u}function Sj(e,s,n,t){const{float32Array:u,uint16Array:o,uint32Array:f}=Ci;let d=e*2;if(Hy(d,o)){const m=_y(e,f),D=sw(d,o);return _ce(s,n,t,m,D)}else{const m=VX(e,f),D=qce[m],P=t.direction[D]>=0;let x,H;P?(x=lw(e),H=rw(e,f)):(x=rw(e,f),H=lw(e));const _=dN(x,u,t,RQ)?Sj(x,s,n,t):null;if(_){const re=_.point[D];if(P?re<=u[H+m]:re>=u[H+m+3])return _}const ne=dN(H,u,t,RQ)?Sj(H,s,n,t):null;return _&&ne?_.distance<=ne.distance?_:ne:_||ne||null}}const b_=new tl,xP=new Pp,UP=new Pp,bH=new Fn,AQ=new n3,C_=new n3;function Kce(e,s,n,t){Ci.setBuffer(e._roots[s]);const u=Nj(0,e,n,t);return Ci.clearBuffer(),u}function Nj(e,s,n,t,u=null){const{float32Array:o,uint16Array:f,uint32Array:d}=Ci;let m=e*2;if(u===null&&(n.boundingBox||n.computeBoundingBox(),AQ.set(n.boundingBox.min,n.boundingBox.max,t),u=AQ),Hy(m,f)){const D=s.geometry,P=D.index,x=D.attributes.position,H=n.index,_=n.attributes.position,ne=_y(e,d),re=sw(m,f);if(bH.copy(t).invert(),n.boundsTree)return ou(e,o,C_),C_.matrix.copy(bH),C_.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:J=>C_.intersectsBox(J),intersectsTriangle:J=>{J.a.applyMatrix4(t),J.b.applyMatrix4(t),J.c.applyMatrix4(t),J.needsUpdate=!0;for(let K=ne*3,Ie=(re+ne)*3;K<Ie;K+=3)if(lo(UP,K,P,x),UP.needsUpdate=!0,J.intersectsTriangle(UP))return!0;return!1}});for(let J=ne*3,K=(re+ne)*3;J<K;J+=3){lo(xP,J,P,x),xP.a.applyMatrix4(bH),xP.b.applyMatrix4(bH),xP.c.applyMatrix4(bH),xP.needsUpdate=!0;for(let Ie=0,ce=H.count;Ie<ce;Ie+=3)if(lo(UP,Ie,H,_),UP.needsUpdate=!0,xP.intersectsTriangle(UP))return!0}}else{const D=e+8,P=d[e+6];return ou(D,o,b_),!!(u.intersectsBox(b_)&&Nj(D,s,n,t,u)||(ou(P,o,b_),u.intersectsBox(b_)&&Nj(P,s,n,t,u)))}}const P_=new Fn,wz=new n3,CH=new n3,Qce=new ze,Zce=new ze,Jce=new ze,Xce=new ze;function vce(e,s,n,t={},u={},o=0,f=1/0){s.boundingBox||s.computeBoundingBox(),wz.set(s.boundingBox.min,s.boundingBox.max,n),wz.needsUpdate=!0;const d=e.geometry,m=d.attributes.position,D=d.index,P=s.attributes.position,x=s.index,H=nw.getPrimitive(),_=nw.getPrimitive();let ne=Qce,re=Zce,J=null,K=null;u&&(J=Jce,K=Xce);let Ie=1/0,ce=null,ae=null;return P_.copy(n).invert(),CH.matrix.copy(P_),e.shapecast({boundsTraverseOrder:me=>wz.distanceToBox(me),intersectsBounds:(me,Ee,Ae)=>Ae<Ie&&Ae<f?(Ee&&(CH.min.copy(me.min),CH.max.copy(me.max),CH.needsUpdate=!0),!0):!1,intersectsRange:(me,Ee)=>{if(s.boundsTree)return s.boundsTree.shapecast({boundsTraverseOrder:Ae=>CH.distanceToBox(Ae),intersectsBounds:(Ae,Me,we)=>we<Ie&&we<f,intersectsRange:(Ae,Me)=>{for(let we=Ae,Te=Ae+Me;we<Te;we++){lo(_,3*we,x,P),_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let je=me,Ke=me+Ee;je<Ke;je++){lo(H,3*je,D,m),H.needsUpdate=!0;const lt=H.distanceToTriangle(_,ne,J);if(lt<Ie&&(re.copy(ne),K&&K.copy(J),Ie=lt,ce=je,ae=we),lt<o)return!0}}}});{const Ae=pM(s);for(let Me=0,we=Ae;Me<we;Me++){lo(_,3*Me,x,P),_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let Te=me,je=me+Ee;Te<je;Te++){lo(H,3*Te,D,m),H.needsUpdate=!0;const Ke=H.distanceToTriangle(_,ne,J);if(Ke<Ie&&(re.copy(ne),K&&K.copy(J),Ie=Ke,ce=Te,ae=Me),Ke<o)return!0}}}}}),nw.releasePrimitive(H),nw.releasePrimitive(_),Ie===1/0?null:(t.point?t.point.copy(re):t.point=re.clone(),t.distance=Ie,t.faceIndex=ce,u&&(u.point?u.point.copy(K):u.point=K.clone(),u.point.applyMatrix4(P_),re.applyMatrix4(P_),u.distance=re.sub(u.point).length(),u.faceIndex=ae),t)}function ehe(e,s=null){s&&Array.isArray(s)&&(s=new Set(s));const n=e.geometry,t=n.index?n.index.array:null,u=n.attributes.position;let o,f,d,m,D=0;const P=e._roots;for(let H=0,_=P.length;H<_;H++)o=P[H],f=new Uint32Array(o),d=new Uint16Array(o),m=new Float32Array(o),x(0,D),D+=o.byteLength;function x(H,_,ne=!1){const re=H*2;if(d[re+15]===PW){const J=f[H+6],K=d[re+14];let Ie=1/0,ce=1/0,ae=1/0,me=-1/0,Ee=-1/0,Ae=-1/0;for(let Me=J,we=J+K;Me<we;Me++){const Te=3*e.resolveTriangleIndex(Me);for(let je=0;je<3;je++){let Ke=Te+je;Ke=t?t[Ke]:Ke;const lt=u.getX(Ke),Ze=u.getY(Ke),it=u.getZ(Ke);lt<Ie&&(Ie=lt),lt>me&&(me=lt),Ze<ce&&(ce=Ze),Ze>Ee&&(Ee=Ze),it<ae&&(ae=it),it>Ae&&(Ae=it)}}return m[H+0]!==Ie||m[H+1]!==ce||m[H+2]!==ae||m[H+3]!==me||m[H+4]!==Ee||m[H+5]!==Ae?(m[H+0]=Ie,m[H+1]=ce,m[H+2]=ae,m[H+3]=me,m[H+4]=Ee,m[H+5]=Ae,!0):!1}else{const J=H+8,K=f[H+6],Ie=J+_,ce=K+_;let ae=ne,me=!1,Ee=!1;s?ae||(me=s.has(Ie),Ee=s.has(ce),ae=!me&&!Ee):(me=!0,Ee=!0);const Ae=ae||me,Me=ae||Ee;let we=!1;Ae&&(we=x(J,_,ae));let Te=!1;Me&&(Te=x(K,_,ae));const je=we||Te;if(je)for(let Ke=0;Ke<3;Ke++){const lt=J+Ke,Ze=K+Ke,it=m[lt],ot=m[lt+3],yt=m[Ze],Rt=m[Ze+3];m[H+Ke]=it<yt?it:yt,m[H+Ke+3]=ot>Rt?ot:Rt}return je}}}const DQ=new ze;function the(e,s,n,t,u){Ci.setBuffer(e._roots[s]),gj(0,e,n,t,u),Ci.clearBuffer()}function gj(e,s,n,t,u){const{float32Array:o,uint16Array:f,uint32Array:d}=Ci,m=e*2;if(Hy(m,f)){const D=_y(e,d),P=sw(m,f);Yce(s,n,t,D,P,u)}else{const D=lw(e);dN(D,o,t,DQ)&&gj(D,s,n,t,u);const P=rw(e,d);dN(P,o,t,DQ)&&gj(P,s,n,t,u)}}const SQ=new ze,nhe=["x","y","z"];function she(e,s,n,t){Ci.setBuffer(e._roots[s]);const u=Oj(0,e,n,t);return Ci.clearBuffer(),u}function Oj(e,s,n,t){const{float32Array:u,uint16Array:o,uint32Array:f}=Ci;let d=e*2;if(Hy(d,o)){const m=_y(e,f),D=sw(d,o);return zce(s,n,t,m,D)}else{const m=VX(e,f),D=nhe[m],P=t.direction[D]>=0;let x,H;P?(x=lw(e),H=rw(e,f)):(x=rw(e,f),H=lw(e));const _=dN(x,u,t,SQ)?Oj(x,s,n,t):null;if(_){const re=_.point[D];if(P?re<=u[H+m]:re>=u[H+m+3])return _}const ne=dN(H,u,t,SQ)?Oj(H,s,n,t):null;return _&&ne?_.distance<=ne.distance?_:ne:_||ne||null}}const M_=new tl,BP=new Pp,HP=new Pp,PH=new Fn,NQ=new n3,x_=new n3;function lhe(e,s,n,t){Ci.setBuffer(e._roots[s]);const u=Lj(0,e,n,t);return Ci.clearBuffer(),u}function Lj(e,s,n,t,u=null){const{float32Array:o,uint16Array:f,uint32Array:d}=Ci;let m=e*2;if(u===null&&(n.boundingBox||n.computeBoundingBox(),NQ.set(n.boundingBox.min,n.boundingBox.max,t),u=NQ),Hy(m,f)){const D=s.geometry,P=D.index,x=D.attributes.position,H=n.index,_=n.attributes.position,ne=_y(e,d),re=sw(m,f);if(PH.copy(t).invert(),n.boundsTree)return ou(e,o,x_),x_.matrix.copy(PH),x_.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:J=>x_.intersectsBox(J),intersectsTriangle:J=>{J.a.applyMatrix4(t),J.b.applyMatrix4(t),J.c.applyMatrix4(t),J.needsUpdate=!0;for(let K=ne,Ie=re+ne;K<Ie;K++)if(lo(HP,3*s.resolveTriangleIndex(K),P,x),HP.needsUpdate=!0,J.intersectsTriangle(HP))return!0;return!1}});for(let J=ne,K=re+ne;J<K;J++){const Ie=s.resolveTriangleIndex(J);lo(BP,3*Ie,P,x),BP.a.applyMatrix4(PH),BP.b.applyMatrix4(PH),BP.c.applyMatrix4(PH),BP.needsUpdate=!0;for(let ce=0,ae=H.count;ce<ae;ce+=3)if(lo(HP,ce,H,_),HP.needsUpdate=!0,BP.intersectsTriangle(HP))return!0}}else{const D=e+8,P=d[e+6];return ou(D,o,M_),!!(u.intersectsBox(M_)&&Lj(D,s,n,t,u)||(ou(P,o,M_),u.intersectsBox(M_)&&Lj(P,s,n,t,u)))}}const U_=new Fn,Ez=new n3,MH=new n3,rhe=new ze,ihe=new ze,uhe=new ze,ahe=new ze;function ohe(e,s,n,t={},u={},o=0,f=1/0){s.boundingBox||s.computeBoundingBox(),Ez.set(s.boundingBox.min,s.boundingBox.max,n),Ez.needsUpdate=!0;const d=e.geometry,m=d.attributes.position,D=d.index,P=s.attributes.position,x=s.index,H=nw.getPrimitive(),_=nw.getPrimitive();let ne=rhe,re=ihe,J=null,K=null;u&&(J=uhe,K=ahe);let Ie=1/0,ce=null,ae=null;return U_.copy(n).invert(),MH.matrix.copy(U_),e.shapecast({boundsTraverseOrder:me=>Ez.distanceToBox(me),intersectsBounds:(me,Ee,Ae)=>Ae<Ie&&Ae<f?(Ee&&(MH.min.copy(me.min),MH.max.copy(me.max),MH.needsUpdate=!0),!0):!1,intersectsRange:(me,Ee)=>{if(s.boundsTree){const Ae=s.boundsTree;return Ae.shapecast({boundsTraverseOrder:Me=>MH.distanceToBox(Me),intersectsBounds:(Me,we,Te)=>Te<Ie&&Te<f,intersectsRange:(Me,we)=>{for(let Te=Me,je=Me+we;Te<je;Te++){const Ke=Ae.resolveTriangleIndex(Te);lo(_,3*Ke,x,P),_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let lt=me,Ze=me+Ee;lt<Ze;lt++){const it=e.resolveTriangleIndex(lt);lo(H,3*it,D,m),H.needsUpdate=!0;const ot=H.distanceToTriangle(_,ne,J);if(ot<Ie&&(re.copy(ne),K&&K.copy(J),Ie=ot,ce=lt,ae=Te),ot<o)return!0}}}})}else{const Ae=pM(s);for(let Me=0,we=Ae;Me<we;Me++){lo(_,3*Me,x,P),_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let Te=me,je=me+Ee;Te<je;Te++){const Ke=e.resolveTriangleIndex(Te);lo(H,3*Ke,D,m),H.needsUpdate=!0;const lt=H.distanceToTriangle(_,ne,J);if(lt<Ie&&(re.copy(ne),K&&K.copy(J),Ie=lt,ce=Te,ae=Me),lt<o)return!0}}}}}),nw.releasePrimitive(H),nw.releasePrimitive(_),Ie===1/0?null:(t.point?t.point.copy(re):t.point=re.clone(),t.distance=Ie,t.faceIndex=ce,u&&(u.point?u.point.copy(K):u.point=K.clone(),u.point.applyMatrix4(U_),re.applyMatrix4(U_),u.distance=re.sub(u.point).length(),u.faceIndex=ae),t)}function che(){return typeof SharedArrayBuffer<"u"}const xF=new Ci.constructor,oW=new Ci.constructor,kS=new Yk(()=>new tl),FP=new tl,GP=new tl,pz=new tl,Tz=new tl;let mz=!1;function hhe(e,s,n,t){if(mz)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");mz=!0;const u=e._roots,o=s._roots;let f,d=0,m=0;const D=new Fn().copy(n).invert();for(let P=0,x=u.length;P<x;P++){xF.setBuffer(u[P]),m=0;const H=kS.getPrimitive();ou(0,xF.float32Array,H),H.applyMatrix4(D);for(let _=0,ne=o.length;_<ne&&(oW.setBuffer(o[P]),f=QE(0,0,n,D,t,d,m,0,0,H),oW.clearBuffer(),m+=o[_].length,!f);_++);if(kS.releasePrimitive(H),xF.clearBuffer(),d+=u[P].length,f)break}return mz=!1,f}function QE(e,s,n,t,u,o=0,f=0,d=0,m=0,D=null,P=!1){let x,H;P?(x=oW,H=xF):(x=xF,H=oW);const _=x.float32Array,ne=x.uint32Array,re=x.uint16Array,J=H.float32Array,K=H.uint32Array,Ie=H.uint16Array,ce=e*2,ae=s*2,me=Hy(ce,re),Ee=Hy(ae,Ie);let Ae=!1;if(Ee&&me)P?Ae=u(_y(s,K),sw(s*2,Ie),_y(e,ne),sw(e*2,re),m,f+s,d,o+e):Ae=u(_y(e,ne),sw(e*2,re),_y(s,K),sw(s*2,Ie),d,o+e,m,f+s);else if(Ee){const Me=kS.getPrimitive();ou(s,J,Me),Me.applyMatrix4(n);const we=lw(e),Te=rw(e,ne);ou(we,_,FP),ou(Te,_,GP);const je=Me.intersectsBox(FP),Ke=Me.intersectsBox(GP);Ae=je&&QE(s,we,t,n,u,f,o,m,d+1,Me,!P)||Ke&&QE(s,Te,t,n,u,f,o,m,d+1,Me,!P),kS.releasePrimitive(Me)}else{const Me=lw(s),we=rw(s,K);ou(Me,J,pz),ou(we,J,Tz);const Te=D.intersectsBox(pz),je=D.intersectsBox(Tz);if(Te&&je)Ae=QE(e,Me,n,t,u,o,f,d,m+1,D,P)||QE(e,we,n,t,u,o,f,d,m+1,D,P);else if(Te)if(me)Ae=QE(e,Me,n,t,u,o,f,d,m+1,D,P);else{const Ke=kS.getPrimitive();Ke.copy(pz).applyMatrix4(n);const lt=lw(e),Ze=rw(e,ne);ou(lt,_,FP),ou(Ze,_,GP);const it=Ke.intersectsBox(FP),ot=Ke.intersectsBox(GP);Ae=it&&QE(Me,lt,t,n,u,f,o,m,d+1,Ke,!P)||ot&&QE(Me,Ze,t,n,u,f,o,m,d+1,Ke,!P),kS.releasePrimitive(Ke)}else if(je)if(me)Ae=QE(e,we,n,t,u,o,f,d,m+1,D,P);else{const Ke=kS.getPrimitive();Ke.copy(Tz).applyMatrix4(n);const lt=lw(e),Ze=rw(e,ne);ou(lt,_,FP),ou(Ze,_,GP);const it=Ke.intersectsBox(FP),ot=Ke.intersectsBox(GP);Ae=it&&QE(we,lt,t,n,u,f,o,m,d+1,Ke,!P)||ot&&QE(we,Ze,t,n,u,f,o,m,d+1,Ke,!P),kS.releasePrimitive(Ke)}}return Ae}const B_=new n3,gQ=new tl;let fhe=class WX{static serialize(s,n={}){n={cloneBuffers:!0,...n};const t=s.geometry,u=s._roots,o=s._indirectBuffer,f=t.getIndex();let d;return n.cloneBuffers?d={roots:u.map(m=>m.slice()),index:f.array.slice(),indirectBuffer:o?o.slice():null}:d={roots:u,index:f.array,indirectBuffer:o},d}static deserialize(s,n,t={}){t={setIndex:!0,indirect:!!s.indirectBuffer,...t};const{index:u,roots:o,indirectBuffer:f}=s,d=new WX(n,{...t,[fz]:!0});if(d._roots=o,d._indirectBuffer=f||null,t.setIndex){const m=n.getIndex();if(m===null){const D=new Ea(s.index,1,!1);n.setIndex(D)}else m.array!==u&&(m.array.set(u),m.needsUpdate=!0)}return d}get indirect(){return!!this._indirectBuffer}constructor(s,n={}){if(s.isBufferGeometry){if(s.index&&s.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(n=Object.assign({strategy:FX,maxDepth:40,maxLeafTris:10,verbose:!0,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,[fz]:!1},n),n.useSharedArrayBuffer&&!che())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=s,this._roots=null,this._indirectBuffer=null,n[fz]||(Lce(this,n),!s.boundingBox&&n.setBoundingBox&&(s.boundingBox=this.getBoundingBox(new tl)));const{_indirectBuffer:t}=this;this.resolveTriangleIndex=n.indirect?u=>t[u]:u=>u}refit(s=null){return(this.indirect?ehe:Wce)(this,s)}traverse(s,n=0){const t=this._roots[n],u=new Uint32Array(t),o=new Uint16Array(t);f(0);function f(d,m=0){const D=d*2,P=o[D+15]===PW;if(P){const x=u[d+6],H=o[D+14];s(m,P,new Float32Array(t,d*4,6),x,H)}else{const x=d+oV/4,H=u[d+6],_=u[d+7];s(m,P,new Float32Array(t,d*4,6),_)||(f(x,m+1),f(H,m+1))}}}raycast(s,n=Aw){const t=this._roots,u=this.geometry,o=[],f=n.isMaterial,d=Array.isArray(n),m=u.groups,D=f?n.side:n,P=this.indirect?the:kce;for(let x=0,H=t.length;x<H;x++){const _=d?n[m[x].materialIndex].side:D,ne=o.length;if(P(this,x,_,s,o),d){const re=m[x].materialIndex;for(let J=ne,K=o.length;J<K;J++)o[J].face.materialIndex=re}}return o}raycastFirst(s,n=Aw){const t=this._roots,u=this.geometry,o=n.isMaterial,f=Array.isArray(n);let d=null;const m=u.groups,D=o?n.side:n,P=this.indirect?she:$ce;for(let x=0,H=t.length;x<H;x++){const _=f?n[m[x].materialIndex].side:D,ne=P(this,x,_,s);ne!=null&&(d==null||ne.distance<d.distance)&&(d=ne,f&&(ne.face.materialIndex=m[x].materialIndex))}return d}intersectsGeometry(s,n){let t=!1;const u=this._roots,o=this.indirect?lhe:Kce;for(let f=0,d=u.length;f<d&&(t=o(this,f,s,n),!t);f++);return t}shapecast(s){const n=nw.getPrimitive(),t=this.indirect?jce:Vce;let{boundsTraverseOrder:u,intersectsBounds:o,intersectsRange:f,intersectsTriangle:d}=s;if(f&&d){const x=f;f=(H,_,ne,re,J)=>x(H,_,ne,re,J)?!0:t(H,_,this,d,ne,re,n)}else f||(d?f=(x,H,_,ne)=>t(x,H,this,d,_,ne,n):f=(x,H,_)=>_);let m=!1,D=0;const P=this._roots;for(let x=0,H=P.length;x<H;x++){const _=P[x];if(m=Uce(this,x,o,f,u,D),m)break;D+=_.byteLength}return nw.releasePrimitive(n),m}bvhcast(s,n,t){let{intersectsRanges:u,intersectsTriangles:o}=t;const f=nw.getPrimitive(),d=this.geometry.index,m=this.geometry.attributes.position,D=this.indirect?ne=>{const re=this.resolveTriangleIndex(ne);lo(f,re*3,d,m)}:ne=>{lo(f,ne*3,d,m)},P=nw.getPrimitive(),x=s.geometry.index,H=s.geometry.attributes.position,_=s.indirect?ne=>{const re=s.resolveTriangleIndex(ne);lo(P,re*3,x,H)}:ne=>{lo(P,ne*3,x,H)};if(o){const ne=(re,J,K,Ie,ce,ae,me,Ee)=>{for(let Ae=K,Me=K+Ie;Ae<Me;Ae++){_(Ae),P.a.applyMatrix4(n),P.b.applyMatrix4(n),P.c.applyMatrix4(n),P.needsUpdate=!0;for(let we=re,Te=re+J;we<Te;we++)if(D(we),f.needsUpdate=!0,o(f,P,we,Ae,ce,ae,me,Ee))return!0}return!1};if(u){const re=u;u=function(J,K,Ie,ce,ae,me,Ee,Ae){return re(J,K,Ie,ce,ae,me,Ee,Ae)?!0:ne(J,K,Ie,ce,ae,me,Ee,Ae)}}else u=ne}return hhe(this,s,n,u)}intersectsBox(s,n){return B_.set(s.min,s.max,n),B_.needsUpdate=!0,this.shapecast({intersectsBounds:t=>B_.intersectsBox(t),intersectsTriangle:t=>B_.intersectsTriangle(t)})}intersectsSphere(s){return this.shapecast({intersectsBounds:n=>s.intersectsBox(n),intersectsTriangle:n=>n.intersectsSphere(s)})}closestPointToGeometry(s,n,t={},u={},o=0,f=1/0){return(this.indirect?ohe:vce)(this,s,n,t,u,o,f)}closestPointToPoint(s,n={},t=0,u=1/0){return Bce(this,s,n,t,u)}getBoundingBox(s){return s.makeEmpty(),this._roots.forEach(n=>{ou(0,new Float32Array(n),gQ),s.union(gQ)}),s}};function OQ(e,s,n){return e===null||(e.point.applyMatrix4(s.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=s,e.distance<n.near||e.distance>n.far)?null:e}const Rz=new yM,LQ=new Fn,dhe=mn.prototype.raycast;function Ihe(e,s){if(this.geometry.boundsTree){if(this.material===void 0)return;LQ.copy(this.matrixWorld).invert(),Rz.copy(e.ray).applyMatrix4(LQ);const n=this.geometry.boundsTree;if(e.firstHitOnly===!0){const t=OQ(n.raycastFirst(Rz,this.material),this,e);t&&s.push(t)}else{const t=n.raycast(Rz,this.material);for(let u=0,o=t.length;u<o;u++){const f=OQ(t[u],this,e);f&&s.push(f)}}}else dhe.call(this,e,s)}function yhe(e){return this.boundsTree=new fhe(this,e),this.boundsTree}function whe(){this.boundsTree=null}const YX=class bj{static apply(s){bj.initialized||(Mi.prototype.computeBoundsTree=yhe,Mi.prototype.disposeBoundsTree=whe,mn.prototype.raycast=Ihe,bj.initialized=!0),s.boundsTree||s.computeBoundsTree()}static dispose(s){s.disposeBoundsTree()}};hs(YX,"initialized",!1);let bQ=YX,zX=class jX{constructor(s,n,t){hs(this,"ids",new Set),hs(this,"itemToInstances",new Map),hs(this,"instanceToItem",new Map),hs(this,"hiddenItems",new Set),hs(this,"id"),hs(this,"mesh"),hs(this,"capacity",0),hs(this,"capacityOffset",10),hs(this,"fragments",{}),hs(this,"group"),hs(this,"_originalColors",new Map),hs(this,"_settingVisibility",!1),this.mesh=new Rj(s,n,t,this),this.id=this.mesh.uuid,this.capacity=t,this.mesh.count=0,this.mesh.geometry.index.count&&bQ.apply(this.mesh.geometry)}dispose(s=!0){if(this.clear(),this.group=void 0,this._originalColors.clear(),this.mesh){if(s){for(const n of this.mesh.material)n.dispose();this.mesh.material=[],bQ.dispose(this.mesh.geometry),this.mesh.geometry.dispose(),this.mesh.geometry=null}this.mesh.removeFromParent(),this.mesh.dispose(),this.mesh.fragment=null,this.mesh=null}for(const n in this.fragments)this.fragments[n].dispose(s);this.fragments={}}get(s){const n=this.getInstancesIDs(s);if(!n)throw new Error("Item not found!");const t=[],u=[];for(const f of n){const d=new Fn;if(this.mesh.getMatrixAt(f,d),t.push(d),this.mesh.instanceColor){const m=new ps;this.mesh.getColorAt(f,m),u.push(m)}}const o=u.length?u:void 0;return{id:s,transforms:t,colors:o}}getItemID(s){return this.instanceToItem.get(s)||null}getInstancesIDs(s){return this.itemToInstances.get(s)||null}update(){this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.mesh.instanceMatrix.needsUpdate=!0}add(s){var n;let t=0;for(const o of s)t+=o.transforms.length;const u=this.mesh.count+t;if(u>this.capacity){const o=u+this.capacityOffset,f=new Rj(this.mesh.geometry,this.mesh.material,o,this);f.count=this.mesh.count,this.capacity=o;const d=this.mesh;(n=d.parent)==null||n.add(f),d.removeFromParent(),this.mesh=f;const m=new Fn;for(let D=0;D<d.instanceMatrix.count;D++)d.getMatrixAt(D,m),f.setMatrixAt(D,m);if(d.instanceColor){const D=new ps;for(let P=0;P<d.instanceColor.count;P++)d.getColorAt(P,D),f.setColorAt(P,D)}d.dispose()}for(let o=0;o<s.length;o++){const{transforms:f,colors:d,id:m}=s[o];this.itemToInstances.has(m)||this.itemToInstances.set(m,new Set);const D=this.itemToInstances.get(m);this.ids.add(m);for(let P=0;P<f.length;P++){const x=f[P],H=this.mesh.count;if(this.mesh.setMatrixAt(H,x),d){const _=d[P];this.mesh.setColorAt(H,_)}D.add(H),this.instanceToItem.set(H,m),this.mesh.count++}}this.update()}remove(s){if(this.mesh.count!==0){for(const n of s){const t=this.itemToInstances.get(n);if(t===void 0)throw new Error("Instances not found!");for(const u of t){if(this.mesh.count===0)throw new Error("Errow with mesh count!");this.putLast(u),this.instanceToItem.delete(u),this.mesh.count--}this.itemToInstances.delete(n),this.ids.delete(n)}this.update()}}clear(){this.hiddenItems.clear(),this.ids.clear(),this.instanceToItem.clear(),this.itemToInstances.clear(),this.mesh.count=0}addFragment(s,n=this.mesh.material){const t=new Mi,u=this.mesh.geometry.attributes;t.setAttribute("position",u.position),t.setAttribute("normal",u.normal),t.setIndex(Array.from(this.mesh.geometry.index.array));const o=new jX(t,n,this.capacity),f=[];for(const d of this.ids){const m=this.get(d);f.push(m)}return o.add(f),o.mesh.applyMatrix4(this.mesh.matrix),o.mesh.updateMatrix(),this.fragments[s]=o,this.fragments[s]}removeFragment(s){const n=this.fragments[s];n&&(n.dispose(!1),delete this.fragments[s])}setVisibility(s,n=this.ids){if(!this._settingVisibility){if(this._settingVisibility=!0,s)for(const t of n){if(!this.ids.has(t))throw new Error(`This item doesn't exist here: ${t}`);if(!this.hiddenItems.has(t))continue;const u=this.itemToInstances.get(t);if(!u)throw new Error("Instances not found!");for(const o of new Set(u))this.mesh.count++,this.putLast(o);this.hiddenItems.delete(t)}else for(const t of n){if(!this.ids.has(t))throw new Error(`This item doesn't exist here: ${t}`);if(this.hiddenItems.has(t))continue;const u=this.itemToInstances.get(t);if(!u)throw new Error("Instances not found!");for(const o of new Set(u))this.putLast(o),this.mesh.count--;this.hiddenItems.add(t)}this.update(),this._settingVisibility=!1}}setColor(s,n=this.ids,t=!1){if(!this.mesh.instanceColor)throw new Error("This fragment doesn't have color per instance!");for(const u of n){if(!this.ids.has(u))throw new Error(`This item doesn't exist here: ${u}`);const o=this.itemToInstances.get(u);if(!o)throw new Error("Instances not found!");const f=this._originalColors.has(u);f||this._originalColors.set(u,new Map);const d=this._originalColors.get(u);for(const m of new Set(o)){if(!f){const D=new ps;this.mesh.getColorAt(m,D),d.set(m,D)}this.mesh.setColorAt(m,s),t&&d.set(m,s)}}this.mesh.instanceColor.needsUpdate=!0}resetColor(s=this.ids){if(!this.mesh.instanceColor)throw new Error("This fragment doesn't have color per instance!");for(const n of s){if(!this.ids.has(n))throw new Error(`This item doesn't exist here: ${n}`);const t=this.itemToInstances.get(n);if(!t)throw new Error("Instances not found!");const u=this._originalColors.get(n);if(u)for(const o of new Set(t)){const f=u.get(o);if(!f)throw new Error("Original color not found!");this.mesh.setColorAt(o,f)}}this.mesh.instanceColor.needsUpdate=!0}applyTransform(s,n){const t=new Fn;for(const u of s){const o=this.getInstancesIDs(u);if(o!==null)for(const f of o)this.mesh.getMatrixAt(f,t),t.premultiply(n),this.mesh.setMatrixAt(f,t)}this.update()}exportData(){const s=this.mesh.exportData(),n=Array.from(this.ids),t=this.id;return{...s,ids:n,id:t}}putLast(s){if(this.mesh.count===0)return;const n=this.instanceToItem.get(s),t=this.mesh.count-1;if(t===s)return;const u=this.instanceToItem.get(t);if(n===void 0||u===void 0)throw new Error("Keys not found");if(n!==u){const d=this.itemToInstances.get(n),m=this.itemToInstances.get(u);if(!d||!m)throw new Error("Instances not found");if(!d.has(s)||!m.has(t))throw new Error("Malformed fragment structure");d.delete(s),m.delete(t),d.add(t),m.add(s),this.instanceToItem.set(s,u),this.instanceToItem.set(t,n)}const o=new Fn,f=new Fn;if(this.mesh.getMatrixAt(s,o),this.mesh.getMatrixAt(t,f),this.mesh.setMatrixAt(s,f),this.mesh.setMatrixAt(t,o),this.mesh.instanceColor!==null){const d=new ps,m=new ps;this.mesh.getColorAt(s,d),this.mesh.getColorAt(t,m),this.mesh.setColorAt(s,m),this.mesh.setColorAt(t,d)}}};const Az=2,sm=4,d7=4,AN=4,qS=new Int32Array(2),CQ=new Float32Array(qS.buffer),PQ=new Float64Array(qS.buffer),H_=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;var Cj;(function(e){e[e.UTF8_BYTES=1]="UTF8_BYTES",e[e.UTF16_STRING=2]="UTF16_STRING"})(Cj||(Cj={}));let cW=class kX{constructor(s){this.bytes_=s,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(s){return new kX(new Uint8Array(s))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(s){this.position_=s}capacity(){return this.bytes_.length}readInt8(s){return this.readUint8(s)<<24>>24}readUint8(s){return this.bytes_[s]}readInt16(s){return this.readUint16(s)<<16>>16}readUint16(s){return this.bytes_[s]|this.bytes_[s+1]<<8}readInt32(s){return this.bytes_[s]|this.bytes_[s+1]<<8|this.bytes_[s+2]<<16|this.bytes_[s+3]<<24}readUint32(s){return this.readInt32(s)>>>0}readInt64(s){return BigInt.asIntN(64,BigInt(this.readUint32(s))+(BigInt(this.readUint32(s+4))<<BigInt(32)))}readUint64(s){return BigInt.asUintN(64,BigInt(this.readUint32(s))+(BigInt(this.readUint32(s+4))<<BigInt(32)))}readFloat32(s){return qS[0]=this.readInt32(s),CQ[0]}readFloat64(s){return qS[H_?0:1]=this.readInt32(s),qS[H_?1:0]=this.readInt32(s+4),PQ[0]}writeInt8(s,n){this.bytes_[s]=n}writeUint8(s,n){this.bytes_[s]=n}writeInt16(s,n){this.bytes_[s]=n,this.bytes_[s+1]=n>>8}writeUint16(s,n){this.bytes_[s]=n,this.bytes_[s+1]=n>>8}writeInt32(s,n){this.bytes_[s]=n,this.bytes_[s+1]=n>>8,this.bytes_[s+2]=n>>16,this.bytes_[s+3]=n>>24}writeUint32(s,n){this.bytes_[s]=n,this.bytes_[s+1]=n>>8,this.bytes_[s+2]=n>>16,this.bytes_[s+3]=n>>24}writeInt64(s,n){this.writeInt32(s,Number(BigInt.asIntN(32,n))),this.writeInt32(s+4,Number(BigInt.asIntN(32,n>>BigInt(32))))}writeUint64(s,n){this.writeUint32(s,Number(BigInt.asUintN(32,n))),this.writeUint32(s+4,Number(BigInt.asUintN(32,n>>BigInt(32))))}writeFloat32(s,n){CQ[0]=n,this.writeInt32(s,qS[0])}writeFloat64(s,n){PQ[0]=n,this.writeInt32(s,qS[H_?0:1]),this.writeInt32(s+4,qS[H_?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+sm+d7)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let s="";for(let n=0;n<d7;n++)s+=String.fromCharCode(this.readInt8(this.position_+sm+n));return s}__offset(s,n){const t=s-this.readInt32(s);return n<this.readInt16(t)?this.readInt16(t+n):0}__union(s,n){return s.bb_pos=n+this.readInt32(n),s.bb=this,s}__string(s,n){s+=this.readInt32(s);const t=this.readInt32(s);s+=sm;const u=this.bytes_.subarray(s,s+t);return n===Cj.UTF8_BYTES?u:this.text_decoder_.decode(u)}__union_with_string(s,n){return typeof s=="string"?this.__string(n):this.__union(s,n)}__indirect(s){return s+this.readInt32(s)}__vector(s){return s+this.readInt32(s)+sm}__vector_len(s){return this.readInt32(s+this.readInt32(s))}__has_identifier(s){if(s.length!=d7)throw new Error("FlatBuffers: file identifier must be length "+d7);for(let n=0;n<d7;n++)if(s.charCodeAt(n)!=this.readInt8(this.position()+sm+n))return!1;return!0}createScalarList(s,n){const t=[];for(let u=0;u<n;++u){const o=s(u);o!==null&&t.push(o)}return t}createObjList(s,n){const t=[];for(let u=0;u<n;++u){const o=s(u);o!==null&&t.push(o.unpack())}return t}};class xW{constructor(s){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let n;s?n=s:n=1024,this.bb=cW.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(s){this.force_defaults=s}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(s,n){s>this.minalign&&(this.minalign=s);const t=~(this.bb.capacity()-this.space+n)+1&s-1;for(;this.space<t+s+n;){const u=this.bb.capacity();this.bb=xW.growByteBuffer(this.bb),this.space+=this.bb.capacity()-u}this.pad(t)}pad(s){for(let n=0;n<s;n++)this.bb.writeInt8(--this.space,0)}writeInt8(s){this.bb.writeInt8(this.space-=1,s)}writeInt16(s){this.bb.writeInt16(this.space-=2,s)}writeInt32(s){this.bb.writeInt32(this.space-=4,s)}writeInt64(s){this.bb.writeInt64(this.space-=8,s)}writeFloat32(s){this.bb.writeFloat32(this.space-=4,s)}writeFloat64(s){this.bb.writeFloat64(this.space-=8,s)}addInt8(s){this.prep(1,0),this.writeInt8(s)}addInt16(s){this.prep(2,0),this.writeInt16(s)}addInt32(s){this.prep(4,0),this.writeInt32(s)}addInt64(s){this.prep(8,0),this.writeInt64(s)}addFloat32(s){this.prep(4,0),this.writeFloat32(s)}addFloat64(s){this.prep(8,0),this.writeFloat64(s)}addFieldInt8(s,n,t){(this.force_defaults||n!=t)&&(this.addInt8(n),this.slot(s))}addFieldInt16(s,n,t){(this.force_defaults||n!=t)&&(this.addInt16(n),this.slot(s))}addFieldInt32(s,n,t){(this.force_defaults||n!=t)&&(this.addInt32(n),this.slot(s))}addFieldInt64(s,n,t){(this.force_defaults||n!==t)&&(this.addInt64(n),this.slot(s))}addFieldFloat32(s,n,t){(this.force_defaults||n!=t)&&(this.addFloat32(n),this.slot(s))}addFieldFloat64(s,n,t){(this.force_defaults||n!=t)&&(this.addFloat64(n),this.slot(s))}addFieldOffset(s,n,t){(this.force_defaults||n!=t)&&(this.addOffset(n),this.slot(s))}addFieldStruct(s,n,t){n!=t&&(this.nested(n),this.slot(s))}nested(s){if(s!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")}slot(s){this.vtable!==null&&(this.vtable[s]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(s){const n=s.capacity();if(n&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");const t=n<<1,u=cW.allocate(t);return u.setPosition(t-n),u.bytes().set(s.bytes(),t-n),u}addOffset(s){this.prep(sm,0),this.writeInt32(this.offset()-s+sm)}startObject(s){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=s;for(let n=0;n<s;n++)this.vtable[n]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);const s=this.offset();let n=this.vtable_in_use-1;for(;n>=0&&this.vtable[n]==0;n--);const t=n+1;for(;n>=0;n--)this.addInt16(this.vtable[n]!=0?s-this.vtable[n]:0);const u=2;this.addInt16(s-this.object_start);const o=(t+u)*Az;this.addInt16(o);let f=0;const d=this.space;e:for(n=0;n<this.vtables.length;n++){const m=this.bb.capacity()-this.vtables[n];if(o==this.bb.readInt16(m)){for(let D=Az;D<o;D+=Az)if(this.bb.readInt16(d+D)!=this.bb.readInt16(m+D))continue e;f=this.vtables[n];break}}return f?(this.space=this.bb.capacity()-s,this.bb.writeInt32(this.space,f-s)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-s,this.offset()-s)),this.isNested=!1,s}finish(s,n,t){const u=t?AN:0;if(n){const o=n;if(this.prep(this.minalign,sm+d7+u),o.length!=d7)throw new Error("FlatBuffers: file identifier must be length "+d7);for(let f=d7-1;f>=0;f--)this.writeInt8(o.charCodeAt(f))}this.prep(this.minalign,sm+u),this.addOffset(s),u&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(s,n){this.finish(s,n,!0)}requiredField(s,n){const t=this.bb.capacity()-s,u=t-this.bb.readInt32(t);if(!(n<this.bb.readInt16(u)&&this.bb.readInt16(u+n)!=0))throw new Error("FlatBuffers: field "+n+" must be set")}startVector(s,n,t){this.notNested(),this.vector_num_elems=n,this.prep(sm,s*n),this.prep(t,s*n)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(s){if(!s)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(s))return this.string_maps.get(s);const n=this.createString(s);return this.string_maps.set(s,n),n}createString(s){if(s==null)return 0;let n;s instanceof Uint8Array?n=s:n=this.text_encoder.encode(s),this.addInt8(0),this.startVector(1,n.length,1),this.bb.setPosition(this.space-=n.length);for(let t=0,u=this.space,o=this.bb.bytes();t<n.length;t++)o[u++]=n[t];return this.endVector()}createObjectOffset(s){return s===null?0:typeof s=="string"?this.createString(s):s.pack(this)}createObjectOffsetList(s){const n=[];for(let t=0;t<s.length;++t){const u=s[t];if(u!==null)n.push(this.createObjectOffset(u));else throw new Error("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return n}createStructOffsetList(s,n){return n(this,s.length),this.createObjectOffsetList(s.slice().reverse()),this.endVector()}}let cV=class z8{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsCivilCurve(s,n){return(n||new z8).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsCivilCurve(s,n){return s.setPosition(s.position()+AN),(n||new z8).__init(s.readInt32(s.position())+s.position(),s)}points(s){const n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}pointsLength(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__vector_len(this.bb_pos+s):0}pointsArray(){const s=this.bb.__offset(this.bb_pos,4);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}data(s){const n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,s):null}static startCivilCurve(s){s.startObject(2)}static addPoints(s,n){s.addFieldOffset(0,n,0)}static createPointsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startPointsVector(s,n){s.startVector(4,n,4)}static addData(s,n){s.addFieldOffset(1,n,0)}static endCivilCurve(s){return s.endObject()}static createCivilCurve(s,n,t){return z8.startCivilCurve(s),z8.addPoints(s,n),z8.addData(s,t),z8.endCivilCurve(s)}},qX=class j6{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsAlignment(s,n){return(n||new j6).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsAlignment(s,n){return s.setPosition(s.position()+AN),(n||new j6).__init(s.readInt32(s.position())+s.position(),s)}vertical(s,n){const t=this.bb.__offset(this.bb_pos,4);return t?(n||new cV).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+s*4),this.bb):null}verticalLength(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__vector_len(this.bb_pos+s):0}horizontal(s,n){const t=this.bb.__offset(this.bb_pos,6);return t?(n||new cV).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+s*4),this.bb):null}horizontalLength(){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__vector_len(this.bb_pos+s):0}absolute(s,n){const t=this.bb.__offset(this.bb_pos,8);return t?(n||new cV).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+s*4),this.bb):null}absoluteLength(){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__vector_len(this.bb_pos+s):0}initialPk(){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.readFloat32(this.bb_pos+s):0}static startAlignment(s){s.startObject(4)}static addVertical(s,n){s.addFieldOffset(0,n,0)}static createVerticalVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addOffset(n[t]);return s.endVector()}static startVerticalVector(s,n){s.startVector(4,n,4)}static addHorizontal(s,n){s.addFieldOffset(1,n,0)}static createHorizontalVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addOffset(n[t]);return s.endVector()}static startHorizontalVector(s,n){s.startVector(4,n,4)}static addAbsolute(s,n){s.addFieldOffset(2,n,0)}static createAbsoluteVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addOffset(n[t]);return s.endVector()}static startAbsoluteVector(s,n){s.startVector(4,n,4)}static addInitialPk(s,n){s.addFieldFloat32(3,n,0)}static endAlignment(s){return s.endObject()}static createAlignment(s,n,t,u,o){return j6.startAlignment(s),j6.addVertical(s,n),j6.addHorizontal(s,t),j6.addAbsolute(s,u),j6.addInitialPk(s,o),j6.endAlignment(s)}},$X=class j8{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsCivilData(s,n){return(n||new j8).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsCivilData(s,n){return s.setPosition(s.position()+AN),(n||new j8).__init(s.readInt32(s.position())+s.position(),s)}alignments(s,n){const t=this.bb.__offset(this.bb_pos,4);return t?(n||new qX).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+s*4),this.bb):null}alignmentsLength(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__vector_len(this.bb_pos+s):0}coordinationMatrix(s){const n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}coordinationMatrixLength(){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__vector_len(this.bb_pos+s):0}coordinationMatrixArray(){const s=this.bb.__offset(this.bb_pos,6);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}static startCivilData(s){s.startObject(2)}static addAlignments(s,n){s.addFieldOffset(0,n,0)}static createAlignmentsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addOffset(n[t]);return s.endVector()}static startAlignmentsVector(s,n){s.startVector(4,n,4)}static addCoordinationMatrix(s,n){s.addFieldOffset(1,n,0)}static createCoordinationMatrixVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startCoordinationMatrixVector(s,n){s.startVector(4,n,4)}static endCivilData(s){return s.endObject()}static createCivilData(s,n,t){return j8.startCivilData(s),j8.addAlignments(s,n),j8.addCoordinationMatrix(s,t),j8.endCivilData(s)}};class Ja{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsFragment(s,n){return(n||new Ja).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsFragment(s,n){return s.setPosition(s.position()+AN),(n||new Ja).__init(s.readInt32(s.position())+s.position(),s)}position(s){const n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}positionLength(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__vector_len(this.bb_pos+s):0}positionArray(){const s=this.bb.__offset(this.bb_pos,4);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}normal(s){const n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}normalLength(){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__vector_len(this.bb_pos+s):0}normalArray(){const s=this.bb.__offset(this.bb_pos,6);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}index(s){const n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}indexLength(){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__vector_len(this.bb_pos+s):0}indexArray(){const s=this.bb.__offset(this.bb_pos,8);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}groups(s){const n=this.bb.__offset(this.bb_pos,10);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}groupsLength(){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__vector_len(this.bb_pos+s):0}groupsArray(){const s=this.bb.__offset(this.bb_pos,10);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}materials(s){const n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}materialsLength(){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__vector_len(this.bb_pos+s):0}materialsArray(){const s=this.bb.__offset(this.bb_pos,12);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}matrices(s){const n=this.bb.__offset(this.bb_pos,14);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}matricesLength(){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__vector_len(this.bb_pos+s):0}matricesArray(){const s=this.bb.__offset(this.bb_pos,14);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}colors(s){const n=this.bb.__offset(this.bb_pos,16);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}colorsLength(){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__vector_len(this.bb_pos+s):0}colorsArray(){const s=this.bb.__offset(this.bb_pos,16);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}itemsSize(s){const n=this.bb.__offset(this.bb_pos,18);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}itemsSizeLength(){const s=this.bb.__offset(this.bb_pos,18);return s?this.bb.__vector_len(this.bb_pos+s):0}itemsSizeArray(){const s=this.bb.__offset(this.bb_pos,18);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}ids(s){const n=this.bb.__offset(this.bb_pos,20);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}idsLength(){const s=this.bb.__offset(this.bb_pos,20);return s?this.bb.__vector_len(this.bb_pos+s):0}idsArray(){const s=this.bb.__offset(this.bb_pos,20);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}id(s){const n=this.bb.__offset(this.bb_pos,22);return n?this.bb.__string(this.bb_pos+n,s):null}capacity(){const s=this.bb.__offset(this.bb_pos,24);return s?this.bb.readUint32(this.bb_pos+s):0}capacityOffset(){const s=this.bb.__offset(this.bb_pos,26);return s?this.bb.readUint32(this.bb_pos+s):0}static startFragment(s){s.startObject(12)}static addPosition(s,n){s.addFieldOffset(0,n,0)}static createPositionVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startPositionVector(s,n){s.startVector(4,n,4)}static addNormal(s,n){s.addFieldOffset(1,n,0)}static createNormalVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startNormalVector(s,n){s.startVector(4,n,4)}static addIndex(s,n){s.addFieldOffset(2,n,0)}static createIndexVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startIndexVector(s,n){s.startVector(4,n,4)}static addGroups(s,n){s.addFieldOffset(3,n,0)}static createGroupsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startGroupsVector(s,n){s.startVector(4,n,4)}static addMaterials(s,n){s.addFieldOffset(4,n,0)}static createMaterialsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startMaterialsVector(s,n){s.startVector(4,n,4)}static addMatrices(s,n){s.addFieldOffset(5,n,0)}static createMatricesVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startMatricesVector(s,n){s.startVector(4,n,4)}static addColors(s,n){s.addFieldOffset(6,n,0)}static createColorsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startColorsVector(s,n){s.startVector(4,n,4)}static addItemsSize(s,n){s.addFieldOffset(7,n,0)}static createItemsSizeVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startItemsSizeVector(s,n){s.startVector(4,n,4)}static addIds(s,n){s.addFieldOffset(8,n,0)}static createIdsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startIdsVector(s,n){s.startVector(4,n,4)}static addId(s,n){s.addFieldOffset(9,n,0)}static addCapacity(s,n){s.addFieldInt32(10,n,0)}static addCapacityOffset(s,n){s.addFieldInt32(11,n,0)}static endFragment(s){return s.endObject()}static createFragment(s,n,t,u,o,f,d,m,D,P,x,H,_){return Ja.startFragment(s),Ja.addPosition(s,n),Ja.addNormal(s,t),Ja.addIndex(s,u),Ja.addGroups(s,o),Ja.addMaterials(s,f),Ja.addMatrices(s,d),Ja.addColors(s,m),Ja.addItemsSize(s,D),Ja.addIds(s,P),Ja.addId(s,x),Ja.addCapacity(s,H),Ja.addCapacityOffset(s,_),Ja.endFragment(s)}}let Dz=class Pj{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsFragmentsGroup(s,n){return(n||new Pj).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsFragmentsGroup(s,n){return s.setPosition(s.position()+AN),(n||new Pj).__init(s.readInt32(s.position())+s.position(),s)}items(s,n){const t=this.bb.__offset(this.bb_pos,4);return t?(n||new Ja).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+s*4),this.bb):null}itemsLength(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__vector_len(this.bb_pos+s):0}civil(s){const n=this.bb.__offset(this.bb_pos,6);return n?(s||new $X).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}coordinationMatrix(s){const n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}coordinationMatrixLength(){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__vector_len(this.bb_pos+s):0}coordinationMatrixArray(){const s=this.bb.__offset(this.bb_pos,8);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}ids(s){const n=this.bb.__offset(this.bb_pos,10);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}idsLength(){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__vector_len(this.bb_pos+s):0}idsArray(){const s=this.bb.__offset(this.bb_pos,10);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}itemsKeys(s){const n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}itemsKeysLength(){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__vector_len(this.bb_pos+s):0}itemsKeysArray(){const s=this.bb.__offset(this.bb_pos,12);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}itemsKeysIndices(s){const n=this.bb.__offset(this.bb_pos,14);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}itemsKeysIndicesLength(){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__vector_len(this.bb_pos+s):0}itemsKeysIndicesArray(){const s=this.bb.__offset(this.bb_pos,14);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}itemsRels(s){const n=this.bb.__offset(this.bb_pos,16);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}itemsRelsLength(){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__vector_len(this.bb_pos+s):0}itemsRelsArray(){const s=this.bb.__offset(this.bb_pos,16);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}itemsRelsIndices(s){const n=this.bb.__offset(this.bb_pos,18);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}itemsRelsIndicesLength(){const s=this.bb.__offset(this.bb_pos,18);return s?this.bb.__vector_len(this.bb_pos+s):0}itemsRelsIndicesArray(){const s=this.bb.__offset(this.bb_pos,18);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}fragmentKeys(s){const n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb_pos+n,s):null}id(s){const n=this.bb.__offset(this.bb_pos,22);return n?this.bb.__string(this.bb_pos+n,s):null}name(s){const n=this.bb.__offset(this.bb_pos,24);return n?this.bb.__string(this.bb_pos+n,s):null}ifcName(s){const n=this.bb.__offset(this.bb_pos,26);return n?this.bb.__string(this.bb_pos+n,s):null}ifcDescription(s){const n=this.bb.__offset(this.bb_pos,28);return n?this.bb.__string(this.bb_pos+n,s):null}ifcSchema(s){const n=this.bb.__offset(this.bb_pos,30);return n?this.bb.__string(this.bb_pos+n,s):null}maxExpressId(){const s=this.bb.__offset(this.bb_pos,32);return s?this.bb.readUint32(this.bb_pos+s):0}boundingBox(s){const n=this.bb.__offset(this.bb_pos,34);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}boundingBoxLength(){const s=this.bb.__offset(this.bb_pos,34);return s?this.bb.__vector_len(this.bb_pos+s):0}boundingBoxArray(){const s=this.bb.__offset(this.bb_pos,34);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}opaqueGeometriesIds(s){const n=this.bb.__offset(this.bb_pos,36);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+s*4):0}opaqueGeometriesIdsLength(){const s=this.bb.__offset(this.bb_pos,36);return s?this.bb.__vector_len(this.bb_pos+s):0}opaqueGeometriesIdsArray(){const s=this.bb.__offset(this.bb_pos,36);return s?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}transparentGeometriesIds(s){const n=this.bb.__offset(this.bb_pos,38);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+s*4):0}transparentGeometriesIdsLength(){const s=this.bb.__offset(this.bb_pos,38);return s?this.bb.__vector_len(this.bb_pos+s):0}transparentGeometriesIdsArray(){const s=this.bb.__offset(this.bb_pos,38);return s?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}static startFragmentsGroup(s){s.startObject(18)}static addItems(s,n){s.addFieldOffset(0,n,0)}static createItemsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addOffset(n[t]);return s.endVector()}static startItemsVector(s,n){s.startVector(4,n,4)}static addCivil(s,n){s.addFieldOffset(1,n,0)}static addCoordinationMatrix(s,n){s.addFieldOffset(2,n,0)}static createCoordinationMatrixVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startCoordinationMatrixVector(s,n){s.startVector(4,n,4)}static addIds(s,n){s.addFieldOffset(3,n,0)}static createIdsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startIdsVector(s,n){s.startVector(4,n,4)}static addItemsKeys(s,n){s.addFieldOffset(4,n,0)}static createItemsKeysVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startItemsKeysVector(s,n){s.startVector(4,n,4)}static addItemsKeysIndices(s,n){s.addFieldOffset(5,n,0)}static createItemsKeysIndicesVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startItemsKeysIndicesVector(s,n){s.startVector(4,n,4)}static addItemsRels(s,n){s.addFieldOffset(6,n,0)}static createItemsRelsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startItemsRelsVector(s,n){s.startVector(4,n,4)}static addItemsRelsIndices(s,n){s.addFieldOffset(7,n,0)}static createItemsRelsIndicesVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startItemsRelsIndicesVector(s,n){s.startVector(4,n,4)}static addFragmentKeys(s,n){s.addFieldOffset(8,n,0)}static addId(s,n){s.addFieldOffset(9,n,0)}static addName(s,n){s.addFieldOffset(10,n,0)}static addIfcName(s,n){s.addFieldOffset(11,n,0)}static addIfcDescription(s,n){s.addFieldOffset(12,n,0)}static addIfcSchema(s,n){s.addFieldOffset(13,n,0)}static addMaxExpressId(s,n){s.addFieldInt32(14,n,0)}static addBoundingBox(s,n){s.addFieldOffset(15,n,0)}static createBoundingBoxVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startBoundingBoxVector(s,n){s.startVector(4,n,4)}static addOpaqueGeometriesIds(s,n){s.addFieldOffset(16,n,0)}static createOpaqueGeometriesIdsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startOpaqueGeometriesIdsVector(s,n){s.startVector(4,n,4)}static addTransparentGeometriesIds(s,n){s.addFieldOffset(17,n,0)}static createTransparentGeometriesIdsVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startTransparentGeometriesIdsVector(s,n){s.startVector(4,n,4)}static endFragmentsGroup(s){return s.endObject()}static finishFragmentsGroupBuffer(s,n){s.finish(n)}static finishSizePrefixedFragmentsGroupBuffer(s,n){s.finish(n,void 0,!0)}},zk=class extends qH{constructor(){super(...arguments),hs(this,"items",[]),hs(this,"boundingBox",new tl),hs(this,"coordinationMatrix",new Fn),hs(this,"keyFragments",new Map),hs(this,"data",new Map),hs(this,"geometryIDs",{opaque:new Map,transparent:new Map}),hs(this,"ifcMetadata",{name:"",description:"",schema:"IFC2X3",maxExpressID:0}),hs(this,"civilData"),hs(this,"streamSettings",{baseUrl:"",baseFileName:"",ids:new Map,types:new Map}),hs(this,"_properties")}get hasProperties(){const s=this._properties!==void 0,n=this.streamSettings.ids.size!==0;return s||n}getFragmentMap(s){const n={};for(const t of s){const u=this.data.get(t);if(u)for(const o of u[0]){const f=this.keyFragments.get(o);f!==void 0&&(n[f]||(n[f]=new Set),n[f].add(t))}}return n}dispose(s=!0){for(const n of this.items)n.dispose(s);if(this.coordinationMatrix=new Fn,this.keyFragments.clear(),this.data.clear(),this._properties={},this.removeFromParent(),this.items=[],this.civilData){const{alignments:n}=this.civilData;for(const[t,u]of n)this.disposeAlignment(u.vertical),this.disposeAlignment(u.horizontal),this.disposeAlignment(u.absolute)}this.civilData=void 0}setLocalProperties(s){this._properties=s}getLocalProperties(){return this._properties}getAllPropertiesIDs(){return this._properties?Object.keys(this._properties).map(s=>parseInt(s,10)):Array.from(this.streamSettings.ids.keys())}getAllPropertiesTypes(){if(this._properties){const s=new Set;for(const n in this._properties){const t=this._properties[n];t.type!==void 0&&s.add(t.type)}return Array.from(s)}return Array.from(this.streamSettings.types.keys())}async getProperties(s){if(this._properties)return this._properties[s]||null;const n=this.getPropsURL(s),t=await this.getPropertiesData(n);return t?t[s]:null}async setProperties(s,n){if(this._properties){n!==null?this._properties[s]=n:delete this._properties[s];return}const t=this.getPropsURL(s),u=await this.getPropertiesData(t);n!==null?u[s]=n:delete u[s];const o=new FormData;o.append("file",JSON.stringify(u)),await fetch("api/KJAKDSJFAKÑSDFJAÑSFJDAÑJFÑA",{body:o,method:"post"})}async getAllPropertiesOfType(s){if(this._properties){const o={};let f=!1;for(const d in this._properties){const m=this._properties[d];m.type===s&&(o[m.expressID]=m,f=!0)}return f?o:null}const{types:n}=this.streamSettings,t=n.get(s);if(t===void 0)return null;const u={};for(const o of t){const f=this.constructFileName(o),d=this.constructURL(f),m=await this.getPropertiesData(d);for(const D in m)u[parseInt(D,10)]=m[D]}return u}getPropsURL(s){const{ids:n}=this.streamSettings,t=n.get(s);if(t===void 0)throw new Error("ID not found");const u=this.constructFileName(t);return this.constructURL(u)}async getPropertiesData(s){return(await fetch(s)).json()}constructFileName(s){const{baseFileName:n}=this.streamSettings;return`${n}-${s}`}constructURL(s){const{baseUrl:n}=this.streamSettings;return`${n}${s}`}disposeAlignment(s){for(const n of s)if(n.mesh.geometry.dispose(),Array.isArray(n.mesh.material))for(const t of n.mesh.material)t.dispose();else n.mesh.material.dispose();s.length=0}},KX=class{constructor(){hs(this,"vertical",[]),hs(this,"horizontal",[]),hs(this,"absolute",[]),hs(this,"initialKP",0)}getLength(s){let n=0;for(const t of this[s])n+=t.getLength();return n}getPointAt(s,n){const t=this.getCurveAt(s,n);return t.curve.getPointAt(t.percentage)}getPercentageAt(s,n,t=.01){const u=this[n];let o=0;for(const f of u){const d=f.getPercentageAt(s,t),m=f.getLength();if(d!==null){const D=o+d*m,P=this.getLength(n);return D/P}o+=m}return null}getCurveAt(s,n){s<0?s=0:s>1&&(s=1);const t=this[n],u=this.getLength(n)*s;let o=0;for(const f of t){const d=f.getLength();if(o+d>=u){const m=(u-o)/d;return{curve:f,percentage:m}}o+=d}throw new Error("Could not compute point!")}},Ehe=class{constructor(s,n,t,u){hs(this,"index"),hs(this,"mesh"),hs(this,"data"),hs(this,"alignment"),this.index=s,this.mesh=n,this.data=t,this.alignment=u}get _index(){return this.mesh.geometry.index}get _pos(){return this.mesh.geometry.attributes.position.array}getLength(){let s=0;for(let n=0;n<this._index.array.length-1;n+=2){const{startPoint:t,endPoint:u}=this.getSegment(n);s+=t.distanceTo(u)}return s}getPointAt(s){const{startPoint:n,endPoint:t,distanceToStart:u}=this.getSegmentAt(s),o=t.clone();return o.sub(n),o.normalize(),o.multiplyScalar(u),o.add(n),o}getSegmentAt(s){s<0?s=0:s>1&&(s=1);const n=this.getLength()*s;let t=0;for(let u=0;u<this._index.array.length-1;u+=2){const{startPoint:o,endPoint:f}=this.getSegment(u),d=o.distanceTo(f);if(t+d>=n)return{distanceToStart:n-t,index:u,startPoint:o,endPoint:f};t+=d}throw new Error("Could not compute point")}getPercentageAt(s,n=.01){let t=0;for(let u=0;u<this._index.array.length-1;u+=2){const{startPoint:o,endPoint:f}=this.getSegment(u),d=o.distanceTo(f),m=s.distanceTo(o),D=s.distanceTo(f);if(m+D-d<=n){const P=t+m,x=this.getLength();return P/x}t+=d}return null}getSegment(s){const n=this._index.array[s]*3,t=this._index.array[s+1]*3,u=new ze(this._pos[n],this._pos[n+1],this._pos[n+2]),o=new ze(this._pos[t],this._pos[t+1],this._pos[t+2]);return{startPoint:u,endPoint:o}}},QX=class extends Goe{constructor(s,n,t,u,o){super(u,o),hs(this,"curve"),this.curve=new Ehe(s,this,n,t)}},ZX=class{constructor(){hs(this,"fragmentIDSeparator","|")}import(s){const n=new cW(s),t=Dz.getRootAsFragmentsGroup(n),u=this.constructFragmentGroup(t),o=t.itemsLength();for(let f=0;f<o;f++){const d=t.items(f);if(!d)continue;const m=this.constructGeometry(d),D=this.constructMaterials(d),P=d.capacity(),x=new zX(m,D,P);x.capacityOffset=d.capacityOffset(),this.setInstances(d,x),this.setID(d,x),u.items.push(x),u.add(x.mesh)}return u}export(s){const n=new xW(1024),t=[],u=Dz,o=Ja;let f=null;if(s.civilData){const Ut=[],Ft=qX,Nt=$X;for(const[Dn,An]of s.civilData.alignments){const{absolute:En,horizontal:Gn,vertical:Xt}=An,qn=this.saveCivilCurves(Gn,n),Tt=this.saveCivilCurves(Xt,n),Gs=this.saveCivilCurves(En,n),Hn=Ft.createHorizontalVector(n,qn),Wn=Ft.createVerticalVector(n,Tt),pn=Ft.createAbsoluteVector(n,Gs);Ft.startAlignment(n),Ft.addHorizontal(n,Hn),Ft.addVertical(n,Wn),Ft.addAbsolute(n,pn),Ft.addInitialPk(n,An.initialKP);const Ps=Ft.endAlignment(n);Ut.push(Ps)}const Gt=Nt.createAlignmentsVector(n,Ut),en=Nt.createCoordinationMatrixVector(n,s.coordinationMatrix.elements);Nt.startCivilData(n),Nt.addAlignments(n,Gt),Nt.addCoordinationMatrix(n,en),f=Nt.endCivilData(n)}for(const Ut of s.items){const Ft=Ut.exportData(),Nt=[];for(const Wn of Ut.ids){const pn=Ut.getInstancesIDs(Wn);if(!pn)throw new Error("Instances not found!");Nt.push(pn.size)}const Gt=o.createPositionVector(n,Ft.position),en=o.createNormalVector(n,Ft.normal),Dn=o.createIndexVector(n,Ft.index),An=o.createGroupsVector(n,Ft.groups),En=o.createMaterialsVector(n,Ft.materials),Gn=o.createMatricesVector(n,Ft.matrices),Xt=o.createColorsVector(n,Ft.colors),qn=o.createIdsVector(n,Ft.ids),Tt=o.createItemsSizeVector(n,Nt),Gs=n.createString(Ft.id);o.startFragment(n),o.addPosition(n,Gt),o.addNormal(n,en),o.addIndex(n,Dn),o.addGroups(n,An),o.addMaterials(n,En),o.addMatrices(n,Gn),o.addColors(n,Xt),o.addIds(n,qn),o.addItemsSize(n,Tt),o.addId(n,Gs),o.addCapacity(n,Ut.capacity),o.addCapacityOffset(n,Ut.capacityOffset);const Hn=Ja.endFragment(n);t.push(Hn)}const d=u.createItemsVector(n,t),m=u.createCoordinationMatrixVector(n,s.coordinationMatrix.elements);let D="";for(const Ut of s.keyFragments.values())D.length&&(D+=this.fragmentIDSeparator),D+=Ut;const P=n.createString(D),x=[],H=[],_=[],ne=[],re=[];let J=0,K=0;for(const[Ut,[Ft,Nt]]of s.data){x.push(J),_.push(K),re.push(Ut);for(const Gt of Ft)H.push(Gt);for(const Gt of Nt)ne.push(Gt);J+=Ft.length,K+=Nt.length}const Ie=[],ce=[];for(const[Ut,Ft]of s.geometryIDs.opaque)Ie.push(Ut,Ft);for(const[Ut,Ft]of s.geometryIDs.transparent)ce.push(Ut,Ft);const ae=n.createString(s.uuid),me=n.createString(s.name),Ee=n.createString(s.ifcMetadata.name),Ae=n.createString(s.ifcMetadata.description),Me=n.createString(s.ifcMetadata.schema),we=u.createItemsKeysIndicesVector(n,x),Te=u.createItemsKeysVector(n,H),je=u.createItemsRelsIndicesVector(n,_),Ke=u.createItemsRelsVector(n,ne),lt=u.createIdsVector(n,re),Ze=u.createOpaqueGeometriesIdsVector(n,Ie),it=u.createTransparentGeometriesIdsVector(n,ce),{min:ot,max:yt}=s.boundingBox,Rt=[ot.x,ot.y,ot.z,yt.x,yt.y,yt.z],Ct=u.createBoundingBoxVector(n,Rt);u.startFragmentsGroup(n),u.addId(n,ae),u.addName(n,me),u.addIfcName(n,Ee),u.addIfcDescription(n,Ae),u.addIfcSchema(n,Me),u.addMaxExpressId(n,s.ifcMetadata.maxExpressID),u.addItems(n,d),u.addFragmentKeys(n,P),u.addIds(n,lt),u.addItemsKeysIndices(n,we),u.addItemsKeys(n,Te),u.addItemsRelsIndices(n,je),u.addItemsRels(n,Ke),u.addCoordinationMatrix(n,m),u.addBoundingBox(n,Ct),u.addOpaqueGeometriesIds(n,Ze),u.addTransparentGeometriesIds(n,it),f!==null&&u.addCivil(n,f);const Bt=Dz.endFragmentsGroup(n);return n.finish(Bt),n.asUint8Array()}setID(s,n){const t=s.id();t&&(n.id=t,n.mesh.uuid=t)}setInstances(s,n){const t=s.matricesArray(),u=s.colorsArray(),o=s.idsArray(),f=s.itemsSizeArray();if(!t||!o||!f)throw new Error("Error: Can't load empty fragment!");const d=[];let m=0;for(let D=0;D<f.length;D++){const P=o[D],x=f[D],H=[],_=[];for(let re=0;re<x;re++){const J=m*16,K=t.subarray(J,J+17),Ie=new Fn().fromArray(K);if(H.push(Ie),u){const ce=m*3,[ae,me,Ee]=u.subarray(ce,ce+4),Ae=new ps(ae,me,Ee);_.push(Ae)}m++}const ne=_.length?_:void 0;d.push({id:P,transforms:H,colors:ne})}n.add(d)}constructMaterials(s){const n=s.materialsArray(),t=[];if(!n)return t;for(let u=0;u<n.length;u+=5){const o=n[u],f=!!n[u+1],d=n[u+2],m=n[u+3],D=n[u+4],P=new ps(d,m,D),x=new Tj({color:P,opacity:o,transparent:f});t.push(x)}return t}constructFragmentGroup(s){const n=new zk,t=s.civil();if(t){const Ae=t.coordinationMatrixArray(),Me=new Fn;Ae&&Me.fromArray(Ae),n.civilData={alignments:new Map,coordinationMatrix:Me};const we=t.alignmentsLength();for(let Te=0;Te<we;Te++){const je=new bW({color:16777215}),Ke=new KX,lt=t.alignments(Te);if(!lt)throw new Error("Alignment not found!");const Ze=lt.horizontalLength();Ke.horizontal=this.constructCivilCurves(lt,Ke,"horizontal",Ze,je);const it=lt.verticalLength();Ke.vertical=this.constructCivilCurves(lt,Ke,"vertical",it,je);const ot=lt.horizontalLength();Ke.absolute=this.constructCivilCurves(lt,Ke,"absolute",ot,je),Ke.initialKP=lt.initialPk(),n.civilData.alignments.set(Te,Ke)}}n.uuid=s.id()||n.uuid,n.name=s.name()||"",n.ifcMetadata={name:s.ifcName()||"",description:s.ifcDescription()||"",schema:s.ifcSchema()||"IFC2X3",maxExpressID:s.maxExpressId()||0};const u=new Fn().elements,o=s.coordinationMatrixArray()||u,f=s.idsArray()||new Uint32Array,d=s.itemsKeysIndicesArray()||new Uint32Array,m=s.itemsKeysArray()||new Uint32Array,D=s.itemsRelsArray()||new Uint32Array,P=s.itemsRelsIndicesArray()||new Uint32Array,x=(s.fragmentKeys()||"").split(this.fragmentIDSeparator);this.setGroupData(n,f,d,m,0),this.setGroupData(n,f,P,D,1);const H=s.opaqueGeometriesIdsArray()||new Uint32Array,_=s.transparentGeometriesIdsArray()||new Uint32Array,ne=new Map;for(let Ae=0;Ae<H.length-1;Ae+=2){const Me=H[Ae],we=H[Ae+1];ne.set(Me,we)}const re=new Map;for(let Ae=0;Ae<_.length-1;Ae+=2){const Me=_[Ae],we=_[Ae+1];re.set(Me,we)}n.geometryIDs={opaque:ne,transparent:re};const J=s.boundingBoxArray()||[0,0,0,0,0,0],[K,Ie,ce,ae,me,Ee]=J;n.boundingBox.min.set(K,Ie,ce),n.boundingBox.max.set(ae,me,Ee);for(let Ae=0;Ae<x.length;Ae++)n.keyFragments.set(Ae,x[Ae]);return o.length===16&&n.coordinationMatrix.fromArray(o),n}setGroupData(s,n,t,u,o){for(let f=0;f<t.length;f++){const d=n[f],m=t[f],D=t[f+1]||u.length,P=[];for(let H=m;H<D;H++)P.push(u[H]);s.data.has(d)||s.data.set(d,[[],[]]);const x=s.data.get(d);x&&(x[o]=P)}}constructGeometry(s){const n=s.positionArray()||new Float32Array,t=s.normalArray()||new Float32Array,u=s.indexArray(),o=s.groupsArray();if(!u)throw new Error("Index not found!");const f=new Mi;if(f.setIndex(Array.from(u)),f.setAttribute("position",new Ea(n,3)),f.setAttribute("normal",new Ea(t,3)),o)for(let d=0;d<o.length;d+=3){const m=o[d],D=o[d+1],P=o[d+2];f.addGroup(m,D,P)}return f}constructCivilCurves(s,n,t,u,o){const f=[];for(let d=0;d<u;d++){const m=s[t](d);if(!m)throw new Error("Curve not found!");const D=m.pointsArray();if(D===null)throw new Error("Curve points not found!");let P={};const x=m.data();x&&(P=JSON.parse(x));const H=new PX,_=new Ea(D,3);H.setAttribute("position",_);const ne=[];for(let J=0;J<D.length/3-1;J++)ne.push(J,J+1);H.setIndex(ne);const re=new QX(d,P,n,H,o);f.push(re.curve)}return f}saveCivilCurves(s,n){const t=cV,u=[];for(const o of s){const f=o.mesh.geometry.attributes.position.array,d=t.createPointsVector(n,f),m=n.createString(JSON.stringify(o.data));t.startCivilCurve(n),t.addPoints(n,d),t.addData(n,m);const D=t.endCivilCurve(n);u.push(D)}return u}},JX=class k6{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsStreamedGeometry(s,n){return(n||new k6).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsStreamedGeometry(s,n){return s.setPosition(s.position()+AN),(n||new k6).__init(s.readInt32(s.position())+s.position(),s)}geometryId(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.readUint32(this.bb_pos+s):0}position(s){const n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}positionLength(){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__vector_len(this.bb_pos+s):0}positionArray(){const s=this.bb.__offset(this.bb_pos,6);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}normal(s){const n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+s*4):0}normalLength(){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__vector_len(this.bb_pos+s):0}normalArray(){const s=this.bb.__offset(this.bb_pos,8);return s?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}index(s){const n=this.bb.__offset(this.bb_pos,10);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+s*4):0}indexLength(){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__vector_len(this.bb_pos+s):0}indexArray(){const s=this.bb.__offset(this.bb_pos,10);return s?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+s),this.bb.__vector_len(this.bb_pos+s)):null}static startStreamedGeometry(s){s.startObject(4)}static addGeometryId(s,n){s.addFieldInt32(0,n,0)}static addPosition(s,n){s.addFieldOffset(1,n,0)}static createPositionVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startPositionVector(s,n){s.startVector(4,n,4)}static addNormal(s,n){s.addFieldOffset(2,n,0)}static createNormalVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addFloat32(n[t]);return s.endVector()}static startNormalVector(s,n){s.startVector(4,n,4)}static addIndex(s,n){s.addFieldOffset(3,n,0)}static createIndexVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addInt32(n[t]);return s.endVector()}static startIndexVector(s,n){s.startVector(4,n,4)}static endStreamedGeometry(s){return s.endObject()}static createStreamedGeometry(s,n,t,u,o){return k6.startStreamedGeometry(s),k6.addGeometryId(s,n),k6.addPosition(s,t),k6.addNormal(s,u),k6.addIndex(s,o),k6.endStreamedGeometry(s)}},MQ=class e9{constructor(){hs(this,"bb",null),hs(this,"bb_pos",0)}__init(s,n){return this.bb_pos=s,this.bb=n,this}static getRootAsStreamedGeometries(s,n){return(n||new e9).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsStreamedGeometries(s,n){return s.setPosition(s.position()+AN),(n||new e9).__init(s.readInt32(s.position())+s.position(),s)}geometries(s,n){const t=this.bb.__offset(this.bb_pos,4);return t?(n||new JX).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+s*4),this.bb):null}geometriesLength(){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__vector_len(this.bb_pos+s):0}static startStreamedGeometries(s){s.startObject(1)}static addGeometries(s,n){s.addFieldOffset(0,n,0)}static createGeometriesVector(s,n){s.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)s.addOffset(n[t]);return s.endVector()}static startGeometriesVector(s,n){s.startVector(4,n,4)}static endStreamedGeometries(s){return s.endObject()}static finishStreamedGeometriesBuffer(s,n){s.finish(n)}static finishSizePrefixedStreamedGeometriesBuffer(s,n){s.finish(n,void 0,!0)}static createStreamedGeometries(s,n){return e9.startStreamedGeometries(s),e9.addGeometries(s,n),e9.endStreamedGeometries(s)}},phe=class{import(s){const n=new cW(s),t=MQ.getRootAsStreamedGeometries(n),u=new Map,o=t.geometriesLength();for(let f=0;f<o;f++){const d=t.geometries(f);if(!d)continue;const m=d.geometryId();if(m===null)throw new Error("Error finding ID!");const D=d.positionArray(),P=d.normalArray(),x=d.indexArray();!D||!P||!x||u.set(m,{position:D,normal:P,index:x})}return u}export(s){const n=new xW(1024),t=[],u=MQ,o=JX;for(const[m,{index:D,position:P,normal:x}]of s){const H=o.createIndexVector(n,D),_=o.createPositionVector(n,P),ne=o.createNormalVector(n,x);o.startStreamedGeometry(n),o.addGeometryId(n,m),o.addIndex(n,H),o.addPosition(n,_),o.addNormal(n,ne);const re=o.endStreamedGeometry(n);t.push(re)}const f=u.createGeometriesVector(n,t);u.startStreamedGeometries(n),u.addGeometries(n,f);const d=u.endStreamedGeometries(n);return n.finish(d),n.asUint8Array()}};var The=Object.getOwnPropertyNames,XX=(e,s)=>function(){return s||(0,e[The(e)[0]])((s={exports:{}}).exports,s),s.exports},mhe=XX({"dist/web-ifc-mt.js"(e,s){var n=(()=>{var t=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return function(u={}){function o(){return ot.buffer!=Ft.buffer&&Xt(),Ft}function f(){return ot.buffer!=Ft.buffer&&Xt(),Nt}function d(){return ot.buffer!=Ft.buffer&&Xt(),Gt}function m(){return ot.buffer!=Ft.buffer&&Xt(),en}function D(){return ot.buffer!=Ft.buffer&&Xt(),Dn}function P(){return ot.buffer!=Ft.buffer&&Xt(),An}function x(){return ot.buffer!=Ft.buffer&&Xt(),En}function H(){return ot.buffer!=Ft.buffer&&Xt(),Gn}var _=u,ne,re;_.ready=new Promise((U,$)=>{ne=U,re=$});var J=Object.assign({},_),K="./this.program",Ie=(U,$)=>{throw $},ce=typeof window=="object",ae=typeof importScripts=="function",me=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",Ee=_.ENVIRONMENT_IS_PTHREAD||!1,Ae="";function Me(U){return _.locateFile?_.locateFile(U,Ae):Ae+U}var we,Te,je;(ce||ae)&&(ae?Ae=self.location.href:typeof document<"u"&&document.currentScript&&(Ae=document.currentScript.src),t&&(Ae=t),Ae.indexOf("blob:")!==0?Ae=Ae.substr(0,Ae.replace(/[?#].*/,"").lastIndexOf("/")+1):Ae="",we=U=>{var $=new XMLHttpRequest;return $.open("GET",U,!1),$.send(null),$.responseText},ae&&(je=U=>{var $=new XMLHttpRequest;return $.open("GET",U,!1),$.responseType="arraybuffer",$.send(null),new Uint8Array($.response)}),Te=(U,$,oe)=>{var pe=new XMLHttpRequest;pe.open("GET",U,!0),pe.responseType="arraybuffer",pe.onload=()=>{if(pe.status==200||pe.status==0&&pe.response){$(pe.response);return}oe()},pe.onerror=oe,pe.send(null)});var Ke=_.print||console.log.bind(console),lt=_.printErr||console.error.bind(console);Object.assign(_,J),J=null,_.arguments&&_.arguments,_.thisProgram&&(K=_.thisProgram),_.quit&&(Ie=_.quit);var Ze;_.wasmBinary&&(Ze=_.wasmBinary);var it=_.noExitRuntime||!0;typeof WebAssembly!="object"&&zn("no native wasm support detected");var ot,yt,Rt,Ct=!1,Bt;function Ut(U,$){U||zn($)}var Ft,Nt,Gt,en,Dn,An,En,Gn;function Xt(){var U=ot.buffer;_.HEAP8=Ft=new Int8Array(U),_.HEAP16=Gt=new Int16Array(U),_.HEAP32=Dn=new Int32Array(U),_.HEAPU8=Nt=new Uint8Array(U),_.HEAPU16=en=new Uint16Array(U),_.HEAPU32=An=new Uint32Array(U),_.HEAPF32=En=new Float32Array(U),_.HEAPF64=Gn=new Float64Array(U)}var qn=_.INITIAL_MEMORY||16777216;if(Ut(qn>=5242880,"INITIAL_MEMORY should be larger than STACK_SIZE, was "+qn+"! (STACK_SIZE=5242880)"),Ee)ot=_.wasmMemory;else if(_.wasmMemory)ot=_.wasmMemory;else if(ot=new WebAssembly.Memory({initial:qn/65536,maximum:65536,shared:!0}),!(ot.buffer instanceof SharedArrayBuffer))throw lt("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),me&&lt("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");Xt(),qn=ot.buffer.byteLength;var Tt,Gs=[],Hn=[],Wn=[],pn=0;function Ps(){return it||pn>0}function fs(){if(_.preRun)for(typeof _.preRun=="function"&&(_.preRun=[_.preRun]);_.preRun.length;)gt(_.preRun.shift());rs(Gs)}function $e(){Ee||(!_.noFSInit&&!Re.init.initialized&&Re.init(),Re.ignorePermissions=!1,rs(Hn))}function ke(){if(!Ee){if(_.postRun)for(typeof _.postRun=="function"&&(_.postRun=[_.postRun]);_.postRun.length;)$t(_.postRun.shift());rs(Wn)}}function gt(U){Gs.unshift(U)}function Qt(U){Hn.unshift(U)}function $t(U){Wn.unshift(U)}var jt=0,Pn=null;function dn(U){return U}function Tn(U){jt++,_.monitorRunDependencies&&_.monitorRunDependencies(jt)}function _n(U){if(jt--,_.monitorRunDependencies&&_.monitorRunDependencies(jt),jt==0&&Pn){var $=Pn;Pn=null,$()}}function zn(U){_.onAbort&&_.onAbort(U),U="Aborted("+U+")",lt(U),Ct=!0,Bt=1,U+=". Build with -sASSERTIONS for more info.";var $=new WebAssembly.RuntimeError(U);throw re($),$}var Wt="data:application/octet-stream;base64,";function Ms(U){return U.startsWith(Wt)}var ss;ss="web-ifc-mt.wasm",Ms(ss)||(ss=Me(ss));function $n(U){if(U==ss&&Ze)return new Uint8Array(Ze);if(je)return je(U);throw"both async and sync fetching of the wasm failed"}function Un(U){return!Ze&&(ce||ae)&&typeof fetch=="function"?fetch(U,{credentials:"same-origin"}).then($=>{if(!$.ok)throw"failed to load wasm binary file at '"+U+"'";return $.arrayBuffer()}).catch(()=>$n(U)):Promise.resolve().then(()=>$n(U))}function gn(U,$,oe){return Un(U).then(pe=>WebAssembly.instantiate(pe,$)).then(pe=>pe).then(oe,pe=>{lt("failed to asynchronously prepare wasm: "+pe),zn(pe)})}function ls(U,$,oe,pe){return!U&&typeof WebAssembly.instantiateStreaming=="function"&&!Ms($)&&typeof fetch=="function"?fetch($,{credentials:"same-origin"}).then(Ue=>{var Qe=WebAssembly.instantiateStreaming(Ue,oe);return Qe.then(pe,function(ve){return lt("wasm streaming compile failed: "+ve),lt("falling back to ArrayBuffer instantiation"),gn($,oe,pe)})}):gn($,oe,pe)}function Ws(){var U={a:u4};function $(pe,Ue){var Qe=pe.exports;return Qe=Pw(Qe),yt=Qe,ds(yt.ma),Tt=yt.ka,Qt(yt.ia),Rt=Ue,_n(),Qe}Tn();function oe(pe){$(pe.instance,pe.module)}if(_.instantiateWasm)try{return _.instantiateWasm(U,$)}catch(pe){lt("Module.instantiateWasm callback failed with error: "+pe),re(pe)}return ls(Ze,ss,U,oe).catch(re),{}}var yn,Sn;function nn(U){this.name="ExitStatus",this.message=`Program terminated with exit(${U})`,this.status=U}var ct=function(U){U.terminate(),U.onmessage=$=>{}};function Zt(U){var $=vt.pthreads[U];delete vt.pthreads[U],ct($),a4(U),vt.runningWorkers.splice(vt.runningWorkers.indexOf($),1),$.pthread_ptr=0}function rn(U){var $=vt.pthreads[U];$.postMessage({cmd:"cancel"})}function un(U){var $=vt.pthreads[U];Ut($),vt.returnWorkerToPool($)}function jn(U){var $=vt.getNewWorker();if(!$)return 6;vt.runningWorkers.push($),vt.pthreads[U.pthread_ptr]=$,$.pthread_ptr=U.pthread_ptr;var oe={cmd:"run",start_routine:U.startRoutine,arg:U.arg,pthread_ptr:U.pthread_ptr};return $.postMessage(oe,U.transferList),0}var On={isAbs:U=>U.charAt(0)==="/",splitPath:U=>{var $=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return $.exec(U).slice(1)},normalizeArray:(U,$)=>{for(var oe=0,pe=U.length-1;pe>=0;pe--){var Ue=U[pe];Ue==="."?U.splice(pe,1):Ue===".."?(U.splice(pe,1),oe++):oe&&(U.splice(pe,1),oe--)}if($)for(;oe;oe--)U.unshift("..");return U},normalize:U=>{var $=On.isAbs(U),oe=U.substr(-1)==="/";return U=On.normalizeArray(U.split("/").filter(pe=>!!pe),!$).join("/"),!U&&!$&&(U="."),U&&oe&&(U+="/"),($?"/":"")+U},dirname:U=>{var $=On.splitPath(U),oe=$[0],pe=$[1];return!oe&&!pe?".":(pe&&(pe=pe.substr(0,pe.length-1)),oe+pe)},basename:U=>{if(U==="/")return"/";U=On.normalize(U),U=U.replace(/\/$/,"");var $=U.lastIndexOf("/");return $===-1?U:U.substr($+1)},join:function(){var U=Array.prototype.slice.call(arguments);return On.normalize(U.join("/"))},join2:(U,$)=>On.normalize(U+"/"+$)},nl=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return U=>(U.set(crypto.getRandomValues(new Uint8Array(U.byteLength))),U);zn("initRandomDevice")},$l=U=>($l=nl())(U),yl={resolve:function(){for(var U="",$=!1,oe=arguments.length-1;oe>=-1&&!$;oe--){var pe=oe>=0?arguments[oe]:Re.cwd();if(typeof pe!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!pe)return"";U=pe+"/"+U,$=On.isAbs(pe)}return U=On.normalizeArray(U.split("/").filter(Ue=>!!Ue),!$).join("/"),($?"/":"")+U||"."},relative:(U,$)=>{U=yl.resolve(U).substr(1),$=yl.resolve($).substr(1);function oe(St){for(var qt=0;qt<St.length&&St[qt]==="";qt++);for(var In=St.length-1;In>=0&&St[In]==="";In--);return qt>In?[]:St.slice(qt,In-qt+1)}for(var pe=oe(U.split("/")),Ue=oe($.split("/")),Qe=Math.min(pe.length,Ue.length),ve=Qe,tt=0;tt<Qe;tt++)if(pe[tt]!==Ue[tt]){ve=tt;break}for(var ht=[],tt=ve;tt<pe.length;tt++)ht.push("..");return ht=ht.concat(Ue.slice(ve)),ht.join("/")}},Ys=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Ol=(U,$,oe)=>{$>>>=0;for(var pe=$+oe,Ue=$;U[Ue]&&!(Ue>=pe);)++Ue;if(Ue-$>16&&U.buffer&&Ys)return Ys.decode(U.buffer instanceof SharedArrayBuffer?U.slice($,Ue):U.subarray($,Ue));for(var Qe="";$<Ue;){var ve=U[$++];if(!(ve&128)){Qe+=String.fromCharCode(ve);continue}var tt=U[$++]&63;if((ve&224)==192){Qe+=String.fromCharCode((ve&31)<<6|tt);continue}var ht=U[$++]&63;if((ve&240)==224?ve=(ve&15)<<12|tt<<6|ht:ve=(ve&7)<<18|tt<<12|ht<<6|U[$++]&63,ve<65536)Qe+=String.fromCharCode(ve);else{var St=ve-65536;Qe+=String.fromCharCode(55296|St>>10,56320|St&1023)}}return Qe},$i=[],kI=U=>{for(var $=0,oe=0;oe<U.length;++oe){var pe=U.charCodeAt(oe);pe<=127?$++:pe<=2047?$+=2:pe>=55296&&pe<=57343?($+=4,++oe):$+=3}return $},l3=(U,$,oe,pe)=>{if(oe>>>=0,!(pe>0))return 0;for(var Ue=oe,Qe=oe+pe-1,ve=0;ve<U.length;++ve){var tt=U.charCodeAt(ve);if(tt>=55296&&tt<=57343){var ht=U.charCodeAt(++ve);tt=65536+((tt&1023)<<10)|ht&1023}if(tt<=127){if(oe>=Qe)break;$[oe++>>>0]=tt}else if(tt<=2047){if(oe+1>=Qe)break;$[oe++>>>0]=192|tt>>6,$[oe++>>>0]=128|tt&63}else if(tt<=65535){if(oe+2>=Qe)break;$[oe++>>>0]=224|tt>>12,$[oe++>>>0]=128|tt>>6&63,$[oe++>>>0]=128|tt&63}else{if(oe+3>=Qe)break;$[oe++>>>0]=240|tt>>18,$[oe++>>>0]=128|tt>>12&63,$[oe++>>>0]=128|tt>>6&63,$[oe++>>>0]=128|tt&63}}return $[oe>>>0]=0,oe-Ue};function Fc(U,$,oe){var pe=kI(U)+1,Ue=new Array(pe),Qe=l3(U,Ue,0,Ue.length);return $&&(Ue.length=Qe),Ue}var l4=()=>{if(!$i.length){var U=null;if(typeof window<"u"&&typeof window.prompt=="function"?(U=window.prompt("Input: "),U!==null&&(U+=`
`)):typeof readline=="function"&&(U=readline(),U!==null&&(U+=`
`)),!U)return null;$i=Fc(U,!0)}return $i.shift()},Ha={ttys:[],init:function(){},shutdown:function(){},register:function(U,$){Ha.ttys[U]={input:[],output:[],ops:$},Re.registerDevice(U,Ha.stream_ops)},stream_ops:{open:function(U){var $=Ha.ttys[U.node.rdev];if(!$)throw new Re.ErrnoError(43);U.tty=$,U.seekable=!1},close:function(U){U.tty.ops.fsync(U.tty)},fsync:function(U){U.tty.ops.fsync(U.tty)},read:function(U,$,oe,pe,Ue){if(!U.tty||!U.tty.ops.get_char)throw new Re.ErrnoError(60);for(var Qe=0,ve=0;ve<pe;ve++){var tt;try{tt=U.tty.ops.get_char(U.tty)}catch{throw new Re.ErrnoError(29)}if(tt===void 0&&Qe===0)throw new Re.ErrnoError(6);if(tt==null)break;Qe++,$[oe+ve]=tt}return Qe&&(U.node.timestamp=Date.now()),Qe},write:function(U,$,oe,pe,Ue){if(!U.tty||!U.tty.ops.put_char)throw new Re.ErrnoError(60);try{for(var Qe=0;Qe<pe;Qe++)U.tty.ops.put_char(U.tty,$[oe+Qe])}catch{throw new Re.ErrnoError(29)}return pe&&(U.node.timestamp=Date.now()),Qe}},default_tty_ops:{get_char:function(U){return l4()},put_char:function(U,$){$===null||$===10?(Ke(Ol(U.output,0)),U.output=[]):$!=0&&U.output.push($)},fsync:function(U){U.output&&U.output.length>0&&(Ke(Ol(U.output,0)),U.output=[])},ioctl_tcgets:function(U){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets:function(U,$,oe){return 0},ioctl_tiocgwinsz:function(U){return[24,80]}},default_tty1_ops:{put_char:function(U,$){$===null||$===10?(lt(Ol(U.output,0)),U.output=[]):$!=0&&U.output.push($)},fsync:function(U){U.output&&U.output.length>0&&(lt(Ol(U.output,0)),U.output=[])}}},r4=U=>{zn()},Kn={ops_table:null,mount(U){return Kn.createNode(null,"/",16895,0)},createNode(U,$,oe,pe){if(Re.isBlkdev(oe)||Re.isFIFO(oe))throw new Re.ErrnoError(63);Kn.ops_table||(Kn.ops_table={dir:{node:{getattr:Kn.node_ops.getattr,setattr:Kn.node_ops.setattr,lookup:Kn.node_ops.lookup,mknod:Kn.node_ops.mknod,rename:Kn.node_ops.rename,unlink:Kn.node_ops.unlink,rmdir:Kn.node_ops.rmdir,readdir:Kn.node_ops.readdir,symlink:Kn.node_ops.symlink},stream:{llseek:Kn.stream_ops.llseek}},file:{node:{getattr:Kn.node_ops.getattr,setattr:Kn.node_ops.setattr},stream:{llseek:Kn.stream_ops.llseek,read:Kn.stream_ops.read,write:Kn.stream_ops.write,allocate:Kn.stream_ops.allocate,mmap:Kn.stream_ops.mmap,msync:Kn.stream_ops.msync}},link:{node:{getattr:Kn.node_ops.getattr,setattr:Kn.node_ops.setattr,readlink:Kn.node_ops.readlink},stream:{}},chrdev:{node:{getattr:Kn.node_ops.getattr,setattr:Kn.node_ops.setattr},stream:Re.chrdev_stream_ops}});var Ue=Re.createNode(U,$,oe,pe);return Re.isDir(Ue.mode)?(Ue.node_ops=Kn.ops_table.dir.node,Ue.stream_ops=Kn.ops_table.dir.stream,Ue.contents={}):Re.isFile(Ue.mode)?(Ue.node_ops=Kn.ops_table.file.node,Ue.stream_ops=Kn.ops_table.file.stream,Ue.usedBytes=0,Ue.contents=null):Re.isLink(Ue.mode)?(Ue.node_ops=Kn.ops_table.link.node,Ue.stream_ops=Kn.ops_table.link.stream):Re.isChrdev(Ue.mode)&&(Ue.node_ops=Kn.ops_table.chrdev.node,Ue.stream_ops=Kn.ops_table.chrdev.stream),Ue.timestamp=Date.now(),U&&(U.contents[$]=Ue,U.timestamp=Ue.timestamp),Ue},getFileDataAsTypedArray(U){return U.contents?U.contents.subarray?U.contents.subarray(0,U.usedBytes):new Uint8Array(U.contents):new Uint8Array(0)},expandFileStorage(U,$){var oe=U.contents?U.contents.length:0;if(!(oe>=$)){var pe=1024*1024;$=Math.max($,oe*(oe<pe?2:1.125)>>>0),oe!=0&&($=Math.max($,256));var Ue=U.contents;U.contents=new Uint8Array($),U.usedBytes>0&&U.contents.set(Ue.subarray(0,U.usedBytes),0)}},resizeFileStorage(U,$){if(U.usedBytes!=$)if($==0)U.contents=null,U.usedBytes=0;else{var oe=U.contents;U.contents=new Uint8Array($),oe&&U.contents.set(oe.subarray(0,Math.min($,U.usedBytes))),U.usedBytes=$}},node_ops:{getattr(U){var $={};return $.dev=Re.isChrdev(U.mode)?U.id:1,$.ino=U.id,$.mode=U.mode,$.nlink=1,$.uid=0,$.gid=0,$.rdev=U.rdev,Re.isDir(U.mode)?$.size=4096:Re.isFile(U.mode)?$.size=U.usedBytes:Re.isLink(U.mode)?$.size=U.link.length:$.size=0,$.atime=new Date(U.timestamp),$.mtime=new Date(U.timestamp),$.ctime=new Date(U.timestamp),$.blksize=4096,$.blocks=Math.ceil($.size/$.blksize),$},setattr(U,$){$.mode!==void 0&&(U.mode=$.mode),$.timestamp!==void 0&&(U.timestamp=$.timestamp),$.size!==void 0&&Kn.resizeFileStorage(U,$.size)},lookup(U,$){throw Re.genericErrors[44]},mknod(U,$,oe,pe){return Kn.createNode(U,$,oe,pe)},rename(U,$,oe){if(Re.isDir(U.mode)){var pe;try{pe=Re.lookupNode($,oe)}catch{}if(pe)for(var Ue in pe.contents)throw new Re.ErrnoError(55)}delete U.parent.contents[U.name],U.parent.timestamp=Date.now(),U.name=oe,$.contents[oe]=U,$.timestamp=U.parent.timestamp,U.parent=$},unlink(U,$){delete U.contents[$],U.timestamp=Date.now()},rmdir(U,$){var oe=Re.lookupNode(U,$);for(var pe in oe.contents)throw new Re.ErrnoError(55);delete U.contents[$],U.timestamp=Date.now()},readdir(U){var $=[".",".."];for(var oe in U.contents)U.contents.hasOwnProperty(oe)&&$.push(oe);return $},symlink(U,$,oe){var pe=Kn.createNode(U,$,41471,0);return pe.link=oe,pe},readlink(U){if(!Re.isLink(U.mode))throw new Re.ErrnoError(28);return U.link}},stream_ops:{read(U,$,oe,pe,Ue){var Qe=U.node.contents;if(Ue>=U.node.usedBytes)return 0;var ve=Math.min(U.node.usedBytes-Ue,pe);if(ve>8&&Qe.subarray)$.set(Qe.subarray(Ue,Ue+ve),oe);else for(var tt=0;tt<ve;tt++)$[oe+tt]=Qe[Ue+tt];return ve},write(U,$,oe,pe,Ue,Qe){if($.buffer===o().buffer&&(Qe=!1),!pe)return 0;var ve=U.node;if(ve.timestamp=Date.now(),$.subarray&&(!ve.contents||ve.contents.subarray)){if(Qe)return ve.contents=$.subarray(oe,oe+pe),ve.usedBytes=pe,pe;if(ve.usedBytes===0&&Ue===0)return ve.contents=$.slice(oe,oe+pe),ve.usedBytes=pe,pe;if(Ue+pe<=ve.usedBytes)return ve.contents.set($.subarray(oe,oe+pe),Ue),pe}if(Kn.expandFileStorage(ve,Ue+pe),ve.contents.subarray&&$.subarray)ve.contents.set($.subarray(oe,oe+pe),Ue);else for(var tt=0;tt<pe;tt++)ve.contents[Ue+tt]=$[oe+tt];return ve.usedBytes=Math.max(ve.usedBytes,Ue+pe),pe},llseek(U,$,oe){var pe=$;if(oe===1?pe+=U.position:oe===2&&Re.isFile(U.node.mode)&&(pe+=U.node.usedBytes),pe<0)throw new Re.ErrnoError(28);return pe},allocate(U,$,oe){Kn.expandFileStorage(U.node,$+oe),U.node.usedBytes=Math.max(U.node.usedBytes,$+oe)},mmap(U,$,oe,pe,Ue){if(!Re.isFile(U.node.mode))throw new Re.ErrnoError(43);var Qe,ve,tt=U.node.contents;if(!(Ue&2)&&tt.buffer===o().buffer)ve=!1,Qe=tt.byteOffset;else{if((oe>0||oe+$<tt.length)&&(tt.subarray?tt=tt.subarray(oe,oe+$):tt=Array.prototype.slice.call(tt,oe,oe+$)),ve=!0,Qe=r4(),!Qe)throw new Re.ErrnoError(48);o().set(tt,Qe>>>0)}return{ptr:Qe,allocated:ve}},msync(U,$,oe,pe,Ue){return Kn.stream_ops.write(U,$,0,pe,oe,!1),0}}},i4=(U,$,oe,pe)=>{var Ue=`al ${U}`;Te(U,Qe=>{Ut(Qe,`Loading data file "${U}" failed (no arrayBuffer).`),$(new Uint8Array(Qe)),Ue&&_n()},Qe=>{if(oe)oe();else throw`Loading data file "${U}" failed.`}),Ue&&Tn()},qI=_.preloadPlugins||[];function Nw(U,$,oe,pe){typeof Browser<"u"&&Browser.init();var Ue=!1;return qI.forEach(function(Qe){Ue||Qe.canHandle($)&&(Qe.handle(U,$,oe,pe),Ue=!0)}),Ue}function Je(U,$,oe,pe,Ue,Qe,ve,tt,ht,St){var qt=$?yl.resolve(On.join2(U,$)):U;function In(tn){function on(Vn){St&&St(),tt||Re.createDataFile(U,$,Vn,pe,Ue,ht),Qe&&Qe(),_n()}Nw(tn,qt,on,()=>{ve&&ve(),_n()})||on(tn)}Tn(),typeof oe=="string"?i4(oe,tn=>In(tn),ve):In(oe)}function It(U){var $={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090},oe=$[U];if(typeof oe>"u")throw new Error(`Unknown file open mode: ${U}`);return oe}function Ot(U,$){var oe=0;return U&&(oe|=365),$&&(oe|=146),oe}var Re={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(U,$={})=>{if(U=yl.resolve(U),!U)return{path:"",node:null};var oe={follow_mount:!0,recurse_count:0};if($=Object.assign(oe,$),$.recurse_count>8)throw new Re.ErrnoError(32);for(var pe=U.split("/").filter(In=>!!In),Ue=Re.root,Qe="/",ve=0;ve<pe.length;ve++){var tt=ve===pe.length-1;if(tt&&$.parent)break;if(Ue=Re.lookupNode(Ue,pe[ve]),Qe=On.join2(Qe,pe[ve]),Re.isMountpoint(Ue)&&(!tt||tt&&$.follow_mount)&&(Ue=Ue.mounted.root),!tt||$.follow)for(var ht=0;Re.isLink(Ue.mode);){var St=Re.readlink(Qe);Qe=yl.resolve(On.dirname(Qe),St);var qt=Re.lookupPath(Qe,{recurse_count:$.recurse_count+1});if(Ue=qt.node,ht++>40)throw new Re.ErrnoError(32)}}return{path:Qe,node:Ue}},getPath:U=>{for(var $;;){if(Re.isRoot(U)){var oe=U.mount.mountpoint;return $?oe[oe.length-1]!=="/"?`${oe}/${$}`:oe+$:oe}$=$?`${U.name}/${$}`:U.name,U=U.parent}},hashName:(U,$)=>{for(var oe=0,pe=0;pe<$.length;pe++)oe=(oe<<5)-oe+$.charCodeAt(pe)|0;return(U+oe>>>0)%Re.nameTable.length},hashAddNode:U=>{var $=Re.hashName(U.parent.id,U.name);U.name_next=Re.nameTable[$],Re.nameTable[$]=U},hashRemoveNode:U=>{var $=Re.hashName(U.parent.id,U.name);if(Re.nameTable[$]===U)Re.nameTable[$]=U.name_next;else for(var oe=Re.nameTable[$];oe;){if(oe.name_next===U){oe.name_next=U.name_next;break}oe=oe.name_next}},lookupNode:(U,$)=>{var oe=Re.mayLookup(U);if(oe)throw new Re.ErrnoError(oe,U);for(var pe=Re.hashName(U.id,$),Ue=Re.nameTable[pe];Ue;Ue=Ue.name_next){var Qe=Ue.name;if(Ue.parent.id===U.id&&Qe===$)return Ue}return Re.lookup(U,$)},createNode:(U,$,oe,pe)=>{var Ue=new Re.FSNode(U,$,oe,pe);return Re.hashAddNode(Ue),Ue},destroyNode:U=>{Re.hashRemoveNode(U)},isRoot:U=>U===U.parent,isMountpoint:U=>!!U.mounted,isFile:U=>(U&61440)===32768,isDir:U=>(U&61440)===16384,isLink:U=>(U&61440)===40960,isChrdev:U=>(U&61440)===8192,isBlkdev:U=>(U&61440)===24576,isFIFO:U=>(U&61440)===4096,isSocket:U=>(U&49152)===49152,flagsToPermissionString:U=>{var $=["r","w","rw"][U&3];return U&512&&($+="w"),$},nodePermissions:(U,$)=>Re.ignorePermissions?0:$.includes("r")&&!(U.mode&292)||$.includes("w")&&!(U.mode&146)||$.includes("x")&&!(U.mode&73)?2:0,mayLookup:U=>{var $=Re.nodePermissions(U,"x");return $||(U.node_ops.lookup?0:2)},mayCreate:(U,$)=>{try{var oe=Re.lookupNode(U,$);return 20}catch{}return Re.nodePermissions(U,"wx")},mayDelete:(U,$,oe)=>{var pe;try{pe=Re.lookupNode(U,$)}catch(Qe){return Qe.errno}var Ue=Re.nodePermissions(U,"wx");if(Ue)return Ue;if(oe){if(!Re.isDir(pe.mode))return 54;if(Re.isRoot(pe)||Re.getPath(pe)===Re.cwd())return 10}else if(Re.isDir(pe.mode))return 31;return 0},mayOpen:(U,$)=>U?Re.isLink(U.mode)?32:Re.isDir(U.mode)&&(Re.flagsToPermissionString($)!=="r"||$&512)?31:Re.nodePermissions(U,Re.flagsToPermissionString($)):44,MAX_OPEN_FDS:4096,nextfd:()=>{for(var U=0;U<=Re.MAX_OPEN_FDS;U++)if(!Re.streams[U])return U;throw new Re.ErrnoError(33)},getStreamChecked:U=>{var $=Re.getStream(U);if(!$)throw new Re.ErrnoError(8);return $},getStream:U=>Re.streams[U],createStream:(U,$=-1)=>(Re.FSStream||(Re.FSStream=function(){this.shared={}},Re.FSStream.prototype={},Object.defineProperties(Re.FSStream.prototype,{object:{get(){return this.node},set(oe){this.node=oe}},isRead:{get(){return(this.flags&2097155)!==1}},isWrite:{get(){return(this.flags&2097155)!==0}},isAppend:{get(){return this.flags&1024}},flags:{get(){return this.shared.flags},set(oe){this.shared.flags=oe}},position:{get(){return this.shared.position},set(oe){this.shared.position=oe}}})),U=Object.assign(new Re.FSStream,U),$==-1&&($=Re.nextfd()),U.fd=$,Re.streams[$]=U,U),closeStream:U=>{Re.streams[U]=null},chrdev_stream_ops:{open:U=>{var $=Re.getDevice(U.node.rdev);U.stream_ops=$.stream_ops,U.stream_ops.open&&U.stream_ops.open(U)},llseek:()=>{throw new Re.ErrnoError(70)}},major:U=>U>>8,minor:U=>U&255,makedev:(U,$)=>U<<8|$,registerDevice:(U,$)=>{Re.devices[U]={stream_ops:$}},getDevice:U=>Re.devices[U],getMounts:U=>{for(var $=[],oe=[U];oe.length;){var pe=oe.pop();$.push(pe),oe.push.apply(oe,pe.mounts)}return $},syncfs:(U,$)=>{typeof U=="function"&&($=U,U=!1),Re.syncFSRequests++,Re.syncFSRequests>1&&lt(`warning: ${Re.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);var oe=Re.getMounts(Re.root.mount),pe=0;function Ue(ve){return Re.syncFSRequests--,$(ve)}function Qe(ve){if(ve)return Qe.errored?void 0:(Qe.errored=!0,Ue(ve));++pe>=oe.length&&Ue(null)}oe.forEach(ve=>{if(!ve.type.syncfs)return Qe(null);ve.type.syncfs(ve,U,Qe)})},mount:(U,$,oe)=>{var pe=oe==="/",Ue=!oe,Qe;if(pe&&Re.root)throw new Re.ErrnoError(10);if(!pe&&!Ue){var ve=Re.lookupPath(oe,{follow_mount:!1});if(oe=ve.path,Qe=ve.node,Re.isMountpoint(Qe))throw new Re.ErrnoError(10);if(!Re.isDir(Qe.mode))throw new Re.ErrnoError(54)}var tt={type:U,opts:$,mountpoint:oe,mounts:[]},ht=U.mount(tt);return ht.mount=tt,tt.root=ht,pe?Re.root=ht:Qe&&(Qe.mounted=tt,Qe.mount&&Qe.mount.mounts.push(tt)),ht},unmount:U=>{var $=Re.lookupPath(U,{follow_mount:!1});if(!Re.isMountpoint($.node))throw new Re.ErrnoError(28);var oe=$.node,pe=oe.mounted,Ue=Re.getMounts(pe);Object.keys(Re.nameTable).forEach(ve=>{for(var tt=Re.nameTable[ve];tt;){var ht=tt.name_next;Ue.includes(tt.mount)&&Re.destroyNode(tt),tt=ht}}),oe.mounted=null;var Qe=oe.mount.mounts.indexOf(pe);oe.mount.mounts.splice(Qe,1)},lookup:(U,$)=>U.node_ops.lookup(U,$),mknod:(U,$,oe)=>{var pe=Re.lookupPath(U,{parent:!0}),Ue=pe.node,Qe=On.basename(U);if(!Qe||Qe==="."||Qe==="..")throw new Re.ErrnoError(28);var ve=Re.mayCreate(Ue,Qe);if(ve)throw new Re.ErrnoError(ve);if(!Ue.node_ops.mknod)throw new Re.ErrnoError(63);return Ue.node_ops.mknod(Ue,Qe,$,oe)},create:(U,$)=>($=$!==void 0?$:438,$&=4095,$|=32768,Re.mknod(U,$,0)),mkdir:(U,$)=>($=$!==void 0?$:511,$&=1023,$|=16384,Re.mknod(U,$,0)),mkdirTree:(U,$)=>{for(var oe=U.split("/"),pe="",Ue=0;Ue<oe.length;++Ue)if(oe[Ue]){pe+="/"+oe[Ue];try{Re.mkdir(pe,$)}catch(Qe){if(Qe.errno!=20)throw Qe}}},mkdev:(U,$,oe)=>(typeof oe>"u"&&(oe=$,$=438),$|=8192,Re.mknod(U,$,oe)),symlink:(U,$)=>{if(!yl.resolve(U))throw new Re.ErrnoError(44);var oe=Re.lookupPath($,{parent:!0}),pe=oe.node;if(!pe)throw new Re.ErrnoError(44);var Ue=On.basename($),Qe=Re.mayCreate(pe,Ue);if(Qe)throw new Re.ErrnoError(Qe);if(!pe.node_ops.symlink)throw new Re.ErrnoError(63);return pe.node_ops.symlink(pe,Ue,U)},rename:(U,$)=>{var oe=On.dirname(U),pe=On.dirname($),Ue=On.basename(U),Qe=On.basename($),ve,tt,ht;if(ve=Re.lookupPath(U,{parent:!0}),tt=ve.node,ve=Re.lookupPath($,{parent:!0}),ht=ve.node,!tt||!ht)throw new Re.ErrnoError(44);if(tt.mount!==ht.mount)throw new Re.ErrnoError(75);var St=Re.lookupNode(tt,Ue),qt=yl.relative(U,pe);if(qt.charAt(0)!==".")throw new Re.ErrnoError(28);if(qt=yl.relative($,oe),qt.charAt(0)!==".")throw new Re.ErrnoError(55);var In;try{In=Re.lookupNode(ht,Qe)}catch{}if(St!==In){var tn=Re.isDir(St.mode),on=Re.mayDelete(tt,Ue,tn);if(on)throw new Re.ErrnoError(on);if(on=In?Re.mayDelete(ht,Qe,tn):Re.mayCreate(ht,Qe),on)throw new Re.ErrnoError(on);if(!tt.node_ops.rename)throw new Re.ErrnoError(63);if(Re.isMountpoint(St)||In&&Re.isMountpoint(In))throw new Re.ErrnoError(10);if(ht!==tt&&(on=Re.nodePermissions(tt,"w"),on))throw new Re.ErrnoError(on);Re.hashRemoveNode(St);try{tt.node_ops.rename(St,ht,Qe)}catch(Vn){throw Vn}finally{Re.hashAddNode(St)}}},rmdir:U=>{var $=Re.lookupPath(U,{parent:!0}),oe=$.node,pe=On.basename(U),Ue=Re.lookupNode(oe,pe),Qe=Re.mayDelete(oe,pe,!0);if(Qe)throw new Re.ErrnoError(Qe);if(!oe.node_ops.rmdir)throw new Re.ErrnoError(63);if(Re.isMountpoint(Ue))throw new Re.ErrnoError(10);oe.node_ops.rmdir(oe,pe),Re.destroyNode(Ue)},readdir:U=>{var $=Re.lookupPath(U,{follow:!0}),oe=$.node;if(!oe.node_ops.readdir)throw new Re.ErrnoError(54);return oe.node_ops.readdir(oe)},unlink:U=>{var $=Re.lookupPath(U,{parent:!0}),oe=$.node;if(!oe)throw new Re.ErrnoError(44);var pe=On.basename(U),Ue=Re.lookupNode(oe,pe),Qe=Re.mayDelete(oe,pe,!1);if(Qe)throw new Re.ErrnoError(Qe);if(!oe.node_ops.unlink)throw new Re.ErrnoError(63);if(Re.isMountpoint(Ue))throw new Re.ErrnoError(10);oe.node_ops.unlink(oe,pe),Re.destroyNode(Ue)},readlink:U=>{var $=Re.lookupPath(U),oe=$.node;if(!oe)throw new Re.ErrnoError(44);if(!oe.node_ops.readlink)throw new Re.ErrnoError(28);return yl.resolve(Re.getPath(oe.parent),oe.node_ops.readlink(oe))},stat:(U,$)=>{var oe=Re.lookupPath(U,{follow:!$}),pe=oe.node;if(!pe)throw new Re.ErrnoError(44);if(!pe.node_ops.getattr)throw new Re.ErrnoError(63);return pe.node_ops.getattr(pe)},lstat:U=>Re.stat(U,!0),chmod:(U,$,oe)=>{var pe;if(typeof U=="string"){var Ue=Re.lookupPath(U,{follow:!oe});pe=Ue.node}else pe=U;if(!pe.node_ops.setattr)throw new Re.ErrnoError(63);pe.node_ops.setattr(pe,{mode:$&4095|pe.mode&-4096,timestamp:Date.now()})},lchmod:(U,$)=>{Re.chmod(U,$,!0)},fchmod:(U,$)=>{var oe=Re.getStreamChecked(U);Re.chmod(oe.node,$)},chown:(U,$,oe,pe)=>{var Ue;if(typeof U=="string"){var Qe=Re.lookupPath(U,{follow:!pe});Ue=Qe.node}else Ue=U;if(!Ue.node_ops.setattr)throw new Re.ErrnoError(63);Ue.node_ops.setattr(Ue,{timestamp:Date.now()})},lchown:(U,$,oe)=>{Re.chown(U,$,oe,!0)},fchown:(U,$,oe)=>{var pe=Re.getStreamChecked(U);Re.chown(pe.node,$,oe)},truncate:(U,$)=>{if($<0)throw new Re.ErrnoError(28);var oe;if(typeof U=="string"){var pe=Re.lookupPath(U,{follow:!0});oe=pe.node}else oe=U;if(!oe.node_ops.setattr)throw new Re.ErrnoError(63);if(Re.isDir(oe.mode))throw new Re.ErrnoError(31);if(!Re.isFile(oe.mode))throw new Re.ErrnoError(28);var Ue=Re.nodePermissions(oe,"w");if(Ue)throw new Re.ErrnoError(Ue);oe.node_ops.setattr(oe,{size:$,timestamp:Date.now()})},ftruncate:(U,$)=>{var oe=Re.getStreamChecked(U);if(!(oe.flags&2097155))throw new Re.ErrnoError(28);Re.truncate(oe.node,$)},utime:(U,$,oe)=>{var pe=Re.lookupPath(U,{follow:!0}),Ue=pe.node;Ue.node_ops.setattr(Ue,{timestamp:Math.max($,oe)})},open:(U,$,oe)=>{if(U==="")throw new Re.ErrnoError(44);$=typeof $=="string"?It($):$,oe=typeof oe>"u"?438:oe,$&64?oe=oe&4095|32768:oe=0;var pe;if(typeof U=="object")pe=U;else{U=On.normalize(U);try{var Ue=Re.lookupPath(U,{follow:!($&131072)});pe=Ue.node}catch{}}var Qe=!1;if($&64)if(pe){if($&128)throw new Re.ErrnoError(20)}else pe=Re.mknod(U,oe,0),Qe=!0;if(!pe)throw new Re.ErrnoError(44);if(Re.isChrdev(pe.mode)&&($&=-513),$&65536&&!Re.isDir(pe.mode))throw new Re.ErrnoError(54);if(!Qe){var ve=Re.mayOpen(pe,$);if(ve)throw new Re.ErrnoError(ve)}$&512&&!Qe&&Re.truncate(pe,0),$&=-131713;var tt=Re.createStream({node:pe,path:Re.getPath(pe),flags:$,seekable:!0,position:0,stream_ops:pe.stream_ops,ungotten:[],error:!1});return tt.stream_ops.open&&tt.stream_ops.open(tt),_.logReadFiles&&!($&1)&&(Re.readFiles||(Re.readFiles={}),U in Re.readFiles||(Re.readFiles[U]=1)),tt},close:U=>{if(Re.isClosed(U))throw new Re.ErrnoError(8);U.getdents&&(U.getdents=null);try{U.stream_ops.close&&U.stream_ops.close(U)}catch($){throw $}finally{Re.closeStream(U.fd)}U.fd=null},isClosed:U=>U.fd===null,llseek:(U,$,oe)=>{if(Re.isClosed(U))throw new Re.ErrnoError(8);if(!U.seekable||!U.stream_ops.llseek)throw new Re.ErrnoError(70);if(oe!=0&&oe!=1&&oe!=2)throw new Re.ErrnoError(28);return U.position=U.stream_ops.llseek(U,$,oe),U.ungotten=[],U.position},read:(U,$,oe,pe,Ue)=>{if(pe<0||Ue<0)throw new Re.ErrnoError(28);if(Re.isClosed(U))throw new Re.ErrnoError(8);if((U.flags&2097155)===1)throw new Re.ErrnoError(8);if(Re.isDir(U.node.mode))throw new Re.ErrnoError(31);if(!U.stream_ops.read)throw new Re.ErrnoError(28);var Qe=typeof Ue<"u";if(!Qe)Ue=U.position;else if(!U.seekable)throw new Re.ErrnoError(70);var ve=U.stream_ops.read(U,$,oe,pe,Ue);return Qe||(U.position+=ve),ve},write:(U,$,oe,pe,Ue,Qe)=>{if(pe<0||Ue<0)throw new Re.ErrnoError(28);if(Re.isClosed(U))throw new Re.ErrnoError(8);if(!(U.flags&2097155))throw new Re.ErrnoError(8);if(Re.isDir(U.node.mode))throw new Re.ErrnoError(31);if(!U.stream_ops.write)throw new Re.ErrnoError(28);U.seekable&&U.flags&1024&&Re.llseek(U,0,2);var ve=typeof Ue<"u";if(!ve)Ue=U.position;else if(!U.seekable)throw new Re.ErrnoError(70);var tt=U.stream_ops.write(U,$,oe,pe,Ue,Qe);return ve||(U.position+=tt),tt},allocate:(U,$,oe)=>{if(Re.isClosed(U))throw new Re.ErrnoError(8);if($<0||oe<=0)throw new Re.ErrnoError(28);if(!(U.flags&2097155))throw new Re.ErrnoError(8);if(!Re.isFile(U.node.mode)&&!Re.isDir(U.node.mode))throw new Re.ErrnoError(43);if(!U.stream_ops.allocate)throw new Re.ErrnoError(138);U.stream_ops.allocate(U,$,oe)},mmap:(U,$,oe,pe,Ue)=>{if(pe&2&&!(Ue&2)&&(U.flags&2097155)!==2)throw new Re.ErrnoError(2);if((U.flags&2097155)===1)throw new Re.ErrnoError(2);if(!U.stream_ops.mmap)throw new Re.ErrnoError(43);return U.stream_ops.mmap(U,$,oe,pe,Ue)},msync:(U,$,oe,pe,Ue)=>U.stream_ops.msync?U.stream_ops.msync(U,$,oe,pe,Ue):0,munmap:U=>0,ioctl:(U,$,oe)=>{if(!U.stream_ops.ioctl)throw new Re.ErrnoError(59);return U.stream_ops.ioctl(U,$,oe)},readFile:(U,$={})=>{if($.flags=$.flags||0,$.encoding=$.encoding||"binary",$.encoding!=="utf8"&&$.encoding!=="binary")throw new Error(`Invalid encoding type "${$.encoding}"`);var oe,pe=Re.open(U,$.flags),Ue=Re.stat(U),Qe=Ue.size,ve=new Uint8Array(Qe);return Re.read(pe,ve,0,Qe,0),$.encoding==="utf8"?oe=Ol(ve,0):$.encoding==="binary"&&(oe=ve),Re.close(pe),oe},writeFile:(U,$,oe={})=>{oe.flags=oe.flags||577;var pe=Re.open(U,oe.flags,oe.mode);if(typeof $=="string"){var Ue=new Uint8Array(kI($)+1),Qe=l3($,Ue,0,Ue.length);Re.write(pe,Ue,0,Qe,void 0,oe.canOwn)}else if(ArrayBuffer.isView($))Re.write(pe,$,0,$.byteLength,void 0,oe.canOwn);else throw new Error("Unsupported data type");Re.close(pe)},cwd:()=>Re.currentPath,chdir:U=>{var $=Re.lookupPath(U,{follow:!0});if($.node===null)throw new Re.ErrnoError(44);if(!Re.isDir($.node.mode))throw new Re.ErrnoError(54);var oe=Re.nodePermissions($.node,"x");if(oe)throw new Re.ErrnoError(oe);Re.currentPath=$.path},createDefaultDirectories:()=>{Re.mkdir("/tmp"),Re.mkdir("/home"),Re.mkdir("/home/web_user")},createDefaultDevices:()=>{Re.mkdir("/dev"),Re.registerDevice(Re.makedev(1,3),{read:()=>0,write:(pe,Ue,Qe,ve,tt)=>ve}),Re.mkdev("/dev/null",Re.makedev(1,3)),Ha.register(Re.makedev(5,0),Ha.default_tty_ops),Ha.register(Re.makedev(6,0),Ha.default_tty1_ops),Re.mkdev("/dev/tty",Re.makedev(5,0)),Re.mkdev("/dev/tty1",Re.makedev(6,0));var U=new Uint8Array(1024),$=0,oe=()=>($===0&&($=$l(U).byteLength),U[--$]);Re.createDevice("/dev","random",oe),Re.createDevice("/dev","urandom",oe),Re.mkdir("/dev/shm"),Re.mkdir("/dev/shm/tmp")},createSpecialDirectories:()=>{Re.mkdir("/proc");var U=Re.mkdir("/proc/self");Re.mkdir("/proc/self/fd"),Re.mount({mount:()=>{var $=Re.createNode(U,"fd",16895,73);return $.node_ops={lookup:(oe,pe)=>{var Ue=+pe,Qe=Re.getStreamChecked(Ue),ve={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>Qe.path}};return ve.parent=ve,ve}},$}},{},"/proc/self/fd")},createStandardStreams:()=>{_.stdin?Re.createDevice("/dev","stdin",_.stdin):Re.symlink("/dev/tty","/dev/stdin"),_.stdout?Re.createDevice("/dev","stdout",null,_.stdout):Re.symlink("/dev/tty","/dev/stdout"),_.stderr?Re.createDevice("/dev","stderr",null,_.stderr):Re.symlink("/dev/tty1","/dev/stderr"),Re.open("/dev/stdin",0),Re.open("/dev/stdout",1),Re.open("/dev/stderr",1)},ensureErrnoError:()=>{Re.ErrnoError||(Re.ErrnoError=function($,oe){this.name="ErrnoError",this.node=oe,this.setErrno=function(pe){this.errno=pe},this.setErrno($),this.message="FS error"},Re.ErrnoError.prototype=new Error,Re.ErrnoError.prototype.constructor=Re.ErrnoError,[44].forEach(U=>{Re.genericErrors[U]=new Re.ErrnoError(U),Re.genericErrors[U].stack="<generic error, no stack>"}))},staticInit:()=>{Re.ensureErrnoError(),Re.nameTable=new Array(4096),Re.mount(Kn,{},"/"),Re.createDefaultDirectories(),Re.createDefaultDevices(),Re.createSpecialDirectories(),Re.filesystems={MEMFS:Kn}},init:(U,$,oe)=>{Re.init.initialized=!0,Re.ensureErrnoError(),_.stdin=U||_.stdin,_.stdout=$||_.stdout,_.stderr=oe||_.stderr,Re.createStandardStreams()},quit:()=>{Re.init.initialized=!1;for(var U=0;U<Re.streams.length;U++){var $=Re.streams[U];$&&Re.close($)}},findObject:(U,$)=>{var oe=Re.analyzePath(U,$);return oe.exists?oe.object:null},analyzePath:(U,$)=>{try{var oe=Re.lookupPath(U,{follow:!$});U=oe.path}catch{}var pe={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var oe=Re.lookupPath(U,{parent:!0});pe.parentExists=!0,pe.parentPath=oe.path,pe.parentObject=oe.node,pe.name=On.basename(U),oe=Re.lookupPath(U,{follow:!$}),pe.exists=!0,pe.path=oe.path,pe.object=oe.node,pe.name=oe.node.name,pe.isRoot=oe.path==="/"}catch(Ue){pe.error=Ue.errno}return pe},createPath:(U,$,oe,pe)=>{U=typeof U=="string"?U:Re.getPath(U);for(var Ue=$.split("/").reverse();Ue.length;){var Qe=Ue.pop();if(Qe){var ve=On.join2(U,Qe);try{Re.mkdir(ve)}catch{}U=ve}}return ve},createFile:(U,$,oe,pe,Ue)=>{var Qe=On.join2(typeof U=="string"?U:Re.getPath(U),$),ve=Ot(pe,Ue);return Re.create(Qe,ve)},createDataFile:(U,$,oe,pe,Ue,Qe)=>{var ve=$;U&&(U=typeof U=="string"?U:Re.getPath(U),ve=$?On.join2(U,$):U);var tt=Ot(pe,Ue),ht=Re.create(ve,tt);if(oe){if(typeof oe=="string"){for(var St=new Array(oe.length),qt=0,In=oe.length;qt<In;++qt)St[qt]=oe.charCodeAt(qt);oe=St}Re.chmod(ht,tt|146);var tn=Re.open(ht,577);Re.write(tn,oe,0,oe.length,0,Qe),Re.close(tn),Re.chmod(ht,tt)}return ht},createDevice:(U,$,oe,pe)=>{var Ue=On.join2(typeof U=="string"?U:Re.getPath(U),$),Qe=Ot(!!oe,!!pe);Re.createDevice.major||(Re.createDevice.major=64);var ve=Re.makedev(Re.createDevice.major++,0);return Re.registerDevice(ve,{open:tt=>{tt.seekable=!1},close:tt=>{pe&&pe.buffer&&pe.buffer.length&&pe(10)},read:(tt,ht,St,qt,In)=>{for(var tn=0,on=0;on<qt;on++){var Vn;try{Vn=oe()}catch{throw new Re.ErrnoError(29)}if(Vn===void 0&&tn===0)throw new Re.ErrnoError(6);if(Vn==null)break;tn++,ht[St+on]=Vn}return tn&&(tt.node.timestamp=Date.now()),tn},write:(tt,ht,St,qt,In)=>{for(var tn=0;tn<qt;tn++)try{pe(ht[St+tn])}catch{throw new Re.ErrnoError(29)}return qt&&(tt.node.timestamp=Date.now()),tn}}),Re.mkdev(Ue,Qe,ve)},forceLoadFile:U=>{if(U.isDevice||U.isFolder||U.link||U.contents)return!0;if(typeof XMLHttpRequest<"u")throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");if(we)try{U.contents=Fc(we(U.url),!0),U.usedBytes=U.contents.length}catch{throw new Re.ErrnoError(29)}else throw new Error("Cannot load without read() or XMLHttpRequest.")},createLazyFile:(U,$,oe,pe,Ue)=>{function Qe(){this.lengthKnown=!1,this.chunks=[]}if(Qe.prototype.get=function(on){if(!(on>this.length-1||on<0)){var Vn=on%this.chunkSize,Cs=on/this.chunkSize|0;return this.getter(Cs)[Vn]}},Qe.prototype.setDataGetter=function(on){this.getter=on},Qe.prototype.cacheLength=function(){var on=new XMLHttpRequest;if(on.open("HEAD",oe,!1),on.send(null),!(on.status>=200&&on.status<300||on.status===304))throw new Error("Couldn't load "+oe+". Status: "+on.status);var Vn=Number(on.getResponseHeader("Content-length")),Cs,xs=(Cs=on.getResponseHeader("Accept-Ranges"))&&Cs==="bytes",Ks=(Cs=on.getResponseHeader("Content-Encoding"))&&Cs==="gzip",_t=1024*1024;xs||(_t=Vn);var cn=(js,Du)=>{if(js>Du)throw new Error("invalid range ("+js+", "+Du+") or no bytes requested!");if(Du>Vn-1)throw new Error("only "+Vn+" bytes available! programmer error!");var fl=new XMLHttpRequest;if(fl.open("GET",oe,!1),Vn!==_t&&fl.setRequestHeader("Range","bytes="+js+"-"+Du),fl.responseType="arraybuffer",fl.overrideMimeType&&fl.overrideMimeType("text/plain; charset=x-user-defined"),fl.send(null),!(fl.status>=200&&fl.status<300||fl.status===304))throw new Error("Couldn't load "+oe+". Status: "+fl.status);return fl.response!==void 0?new Uint8Array(fl.response||[]):Fc(fl.responseText||"",!0)},nr=this;nr.setDataGetter(js=>{var Du=js*_t,fl=(js+1)*_t-1;if(fl=Math.min(fl,Vn-1),typeof nr.chunks[js]>"u"&&(nr.chunks[js]=cn(Du,fl)),typeof nr.chunks[js]>"u")throw new Error("doXHR failed!");return nr.chunks[js]}),(Ks||!Vn)&&(_t=Vn=1,Vn=this.getter(0).length,_t=Vn,Ke("LazyFiles on gzip forces download of the whole file when length is accessed")),this._length=Vn,this._chunkSize=_t,this.lengthKnown=!0},typeof XMLHttpRequest<"u"){if(!ae)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var ve=new Qe;Object.defineProperties(ve,{length:{get:function(){return this.lengthKnown||this.cacheLength(),this._length}},chunkSize:{get:function(){return this.lengthKnown||this.cacheLength(),this._chunkSize}}});var tt={isDevice:!1,contents:ve}}else var tt={isDevice:!1,url:oe};var ht=Re.createFile(U,$,tt,pe,Ue);tt.contents?ht.contents=tt.contents:tt.url&&(ht.contents=null,ht.url=tt.url),Object.defineProperties(ht,{usedBytes:{get:function(){return this.contents.length}}});var St={},qt=Object.keys(ht.stream_ops);qt.forEach(tn=>{var on=ht.stream_ops[tn];St[tn]=function(){return Re.forceLoadFile(ht),on.apply(null,arguments)}});function In(tn,on,Vn,Cs,xs){var Ks=tn.node.contents;if(xs>=Ks.length)return 0;var _t=Math.min(Ks.length-xs,Cs);if(Ks.slice)for(var cn=0;cn<_t;cn++)on[Vn+cn]=Ks[xs+cn];else for(var cn=0;cn<_t;cn++)on[Vn+cn]=Ks.get(xs+cn);return _t}return St.read=(tn,on,Vn,Cs,xs)=>(Re.forceLoadFile(ht),In(tn,on,Vn,Cs,xs)),St.mmap=(tn,on,Vn,Cs,xs)=>{Re.forceLoadFile(ht);var Ks=r4();if(!Ks)throw new Re.ErrnoError(48);return In(tn,o(),Ks,on,Vn),{ptr:Ks,allocated:!0}},ht.stream_ops=St,ht}},At=(U,$)=>(U>>>=0,U?Ol(f(),U,$):""),fn={DEFAULT_POLLMASK:5,calculateAt:function(U,$,oe){if(On.isAbs($))return $;var pe;if(U===-100)pe=Re.cwd();else{var Ue=fn.getStreamFromFD(U);pe=Ue.path}if($.length==0){if(!oe)throw new Re.ErrnoError(44);return pe}return On.join2(pe,$)},doStat:function(U,$,oe){try{var pe=U($)}catch(tt){if(tt&&tt.node&&On.normalize($)!==On.normalize(Re.getPath(tt.node)))return-54;throw tt}D()[oe>>>2]=pe.dev,D()[oe+4>>>2]=pe.mode,P()[oe+8>>>2]=pe.nlink,D()[oe+12>>>2]=pe.uid,D()[oe+16>>>2]=pe.gid,D()[oe+20>>>2]=pe.rdev,Sn=[pe.size>>>0,(yn=pe.size,+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[oe+24>>>2]=Sn[0],D()[oe+28>>>2]=Sn[1],D()[oe+32>>>2]=4096,D()[oe+36>>>2]=pe.blocks;var Ue=pe.atime.getTime(),Qe=pe.mtime.getTime(),ve=pe.ctime.getTime();return Sn=[Math.floor(Ue/1e3)>>>0,(yn=Math.floor(Ue/1e3),+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[oe+40>>>2]=Sn[0],D()[oe+44>>>2]=Sn[1],P()[oe+48>>>2]=Ue%1e3*1e3,Sn=[Math.floor(Qe/1e3)>>>0,(yn=Math.floor(Qe/1e3),+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[oe+56>>>2]=Sn[0],D()[oe+60>>>2]=Sn[1],P()[oe+64>>>2]=Qe%1e3*1e3,Sn=[Math.floor(ve/1e3)>>>0,(yn=Math.floor(ve/1e3),+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[oe+72>>>2]=Sn[0],D()[oe+76>>>2]=Sn[1],P()[oe+80>>>2]=ve%1e3*1e3,Sn=[pe.ino>>>0,(yn=pe.ino,+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[oe+88>>>2]=Sn[0],D()[oe+92>>>2]=Sn[1],0},doMsync:function(U,$,oe,pe,Ue){if(!Re.isFile($.node.mode))throw new Re.ErrnoError(43);if(pe&2)return 0;var Qe=f().slice(U,U+oe);Re.msync($,Qe,Ue,oe,pe)},varargs:void 0,get(){fn.varargs+=4;var U=D()[fn.varargs-4>>>2];return U},getStr(U){var $=At(U);return $},getStreamFromFD:function(U){var $=Re.getStreamChecked(U);return $}};function Cn(U){if(Ee)return Kt(1,1,U);Bt=U,Ps()||(vt.terminateAllThreads(),_.onExit&&_.onExit(U),Ct=!0),Ie(U,new nn(U))}var kn=(U,$)=>{if(Bt=U,Ee)throw xi(U),"unwind";Cn(U)},Qn=kn,as=U=>{if(U instanceof nn||U=="unwind")return Bt;Ie(1,U)},vt={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){Ee?vt.initWorker():vt.initMainThread()},initMainThread:function(){for(var U=navigator.hardwareConcurrency;U--;)vt.allocateUnusedWorker();gt(()=>{Tn(),vt.loadWasmModuleToAllWorkers(()=>_n())})},initWorker:function(){it=!1},setExitStatus:function(U){Bt=U},terminateAllThreads__deps:["$terminateWorker"],terminateAllThreads:function(){for(var U of vt.runningWorkers)ct(U);for(var U of vt.unusedWorkers)ct(U);vt.unusedWorkers=[],vt.runningWorkers=[],vt.pthreads=[]},returnWorkerToPool:function(U){var $=U.pthread_ptr;delete vt.pthreads[$],vt.unusedWorkers.push(U),vt.runningWorkers.splice(vt.runningWorkers.indexOf(U),1),U.pthread_ptr=0,a4($)},receiveObjectTransfer:function(U){},threadInitTLS:function(){vt.tlsInitFunctions.forEach(U=>U())},loadWasmModuleToWorker:U=>new Promise($=>{U.onmessage=Qe=>{var ve=Qe.data,tt=ve.cmd;if(ve.targetThread&&ve.targetThread!=o3()){var ht=vt.pthreads[ve.targetThread];ht?ht.postMessage(ve,ve.transferList):lt('Internal error! Worker sent a message "'+tt+'" to target pthread '+ve.targetThread+", but that thread no longer exists!");return}tt==="checkMailbox"?qc():tt==="spawnThread"?jn(ve):tt==="cleanupThread"?un(ve.thread):tt==="killThread"?Zt(ve.thread):tt==="cancelThread"?rn(ve.thread):tt==="loaded"?(U.loaded=!0,$(U)):tt==="alert"?alert("Thread "+ve.threadId+": "+ve.text):ve.target==="setimmediate"?U.postMessage(ve):tt==="callHandler"?_[ve.handler](...ve.args):tt&&lt("worker sent an unknown command "+tt)},U.onerror=Qe=>{var ve="worker sent an error!";throw lt(ve+" "+Qe.filename+":"+Qe.lineno+": "+Qe.message),Qe};var oe=[],pe=["onExit","onAbort","print","printErr"];for(var Ue of pe)_.hasOwnProperty(Ue)&&oe.push(Ue);U.postMessage({cmd:"load",handlers:oe,urlOrBlob:_.mainScriptUrlOrBlob||t,wasmMemory:ot,wasmModule:Rt})}),loadWasmModuleToAllWorkers:function(U){if(Ee)return U();Promise.all(vt.unusedWorkers.map(vt.loadWasmModuleToWorker)).then(U)},allocateUnusedWorker:function(){var U,$=Me("web-ifc-mt.worker.js");U=new Worker($),vt.unusedWorkers.push(U)},getNewWorker:function(){return vt.unusedWorkers.length==0&&(vt.allocateUnusedWorker(),vt.loadWasmModuleToWorker(vt.unusedWorkers[0])),vt.unusedWorkers.pop()}};_.PThread=vt;var rs=U=>{for(;U.length>0;)U.shift()(_)};function qs(){var U=o3(),$=D()[U+52>>>2],oe=D()[U+56>>>2],pe=$-oe;$2($,pe),c4($)}_.establishStackSpace=qs;function xi(U){if(Ee)return Kt(2,0,U);Qn(U)}var Fl=[],Ki=U=>{var $=Fl[U];return $||(U>=Fl.length&&(Fl.length=U+1),Fl[U]=$=Tt.get(U)),$};function al(U,$){var oe=Ki(U)($);function pe(Ue){Ps()?vt.setExitStatus(Ue):o4(Ue)}pe(oe)}_.invokeEntryPoint=al;function ds(U){vt.tlsInitFunctions.push(U)}function r3(U){this.excPtr=U,this.ptr=U-24,this.set_type=function($){P()[this.ptr+4>>>2]=$},this.get_type=function(){return P()[this.ptr+4>>>2]},this.set_destructor=function($){P()[this.ptr+8>>>2]=$},this.get_destructor=function(){return P()[this.ptr+8>>>2]},this.set_caught=function($){$=$?1:0,o()[this.ptr+12>>>0]=$},this.get_caught=function(){return o()[this.ptr+12>>>0]!=0},this.set_rethrown=function($){$=$?1:0,o()[this.ptr+13>>>0]=$},this.get_rethrown=function(){return o()[this.ptr+13>>>0]!=0},this.init=function($,oe){this.set_adjusted_ptr(0),this.set_type($),this.set_destructor(oe)},this.set_adjusted_ptr=function($){P()[this.ptr+16>>>2]=$},this.get_adjusted_ptr=function(){return P()[this.ptr+16>>>2]},this.get_exception_ptr=function(){var $=Z2(this.get_type());if($)return P()[this.excPtr>>>2];var oe=this.get_adjusted_ptr();return oe!==0?oe:this.excPtr}}var ol=0;function Qi(U,$){return $+2097152>>>0<4194305-!!U?(U>>>0)+$*4294967296:NaN}function i3(U,$,oe){U>>>=0,$>>>=0,oe>>>=0;var pe=new r3(U);throw pe.init($,oe),ol=U,ol}function Ih(U){U>>>=0,j2(U,!ae,1,!ce,5242880,!1),vt.threadInitTLS()}function $I(U){U>>>=0,Ee?postMessage({cmd:"cleanupThread",thread:U}):un(U)}var Gl={};function Tu(U){for(;U.length;){var $=U.pop(),oe=U.pop();oe($)}}function Fa(U){return this.fromWireType(D()[U>>>2])}var Kl={},Ql={},yh={},KI=void 0;function wh(U){throw new KI(U)}function Zi(U,$,oe){U.forEach(function(tt){yh[tt]=$});function pe(tt){var ht=oe(tt);ht.length!==U.length&&wh("Mismatched type converter count");for(var St=0;St<U.length;++St)Ji(U[St],ht[St])}var Ue=new Array($.length),Qe=[],ve=0;$.forEach((tt,ht)=>{Ql.hasOwnProperty(tt)?Ue[ht]=Ql[tt]:(Qe.push(tt),Kl.hasOwnProperty(tt)||(Kl[tt]=[]),Kl[tt].push(()=>{Ue[ht]=Ql[tt],++ve,ve===Qe.length&&pe(Ue)}))}),Qe.length===0&&pe(Ue)}function QI(U){U>>>=0;var $=Gl[U];delete Gl[U];var oe=$.elements,pe=oe.length,Ue=oe.map(function(tt){return tt.getterReturnType}).concat(oe.map(function(tt){return tt.setterArgumentType})),Qe=$.rawConstructor,ve=$.rawDestructor;Zi([U],Ue,function(tt){return oe.forEach((ht,St)=>{var qt=tt[St],In=ht.getter,tn=ht.getterContext,on=tt[St+pe],Vn=ht.setter,Cs=ht.setterContext;ht.read=xs=>qt.fromWireType(In(tn,xs)),ht.write=(xs,Ks)=>{var _t=[];Vn(Cs,xs,on.toWireType(_t,Ks)),Tu(_t)}}),[{name:$.name,fromWireType:function(ht){for(var St=new Array(pe),qt=0;qt<pe;++qt)St[qt]=oe[qt].read(ht);return ve(ht),St},toWireType:function(ht,St){if(pe!==St.length)throw new TypeError(`Incorrect number of tuple elements for ${$.name}: expected=${pe}, actual=${St.length}`);for(var qt=Qe(),In=0;In<pe;++In)oe[In].write(qt,St[In]);return ht!==null&&ht.push(ve,qt),qt},argPackAdvance:8,readValueFromPointer:Fa,destructorFunction:ve}]})}var Gc={},Zl=function(U){U>>>=0;var $=Gc[U];delete Gc[U];var oe=$.rawConstructor,pe=$.rawDestructor,Ue=$.fields,Qe=Ue.map(ve=>ve.getterReturnType).concat(Ue.map(ve=>ve.setterArgumentType));Zi([U],Qe,ve=>{var tt={};return Ue.forEach((ht,St)=>{var qt=ht.fieldName,In=ve[St],tn=ht.getter,on=ht.getterContext,Vn=ve[St+Ue.length],Cs=ht.setter,xs=ht.setterContext;tt[qt]={read:Ks=>In.fromWireType(tn(on,Ks)),write:(Ks,_t)=>{var cn=[];Cs(xs,Ks,Vn.toWireType(cn,_t)),Tu(cn)}}}),[{name:$.name,fromWireType:function(ht){var St={};for(var qt in tt)St[qt]=tt[qt].read(ht);return pe(ht),St},toWireType:function(ht,St){for(var qt in tt)if(!(qt in St))throw new TypeError(`Missing field: "${qt}"`);var In=oe();for(qt in tt)tt[qt].write(In,St[qt]);return ht!==null&&ht.push(pe,In),In},argPackAdvance:8,readValueFromPointer:Fa,destructorFunction:pe}]})};function ZI(U,$,oe,pe,Ue){}function _c(U){switch(U){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError(`Unknown type size: ${U}`)}}function Od(){for(var U=new Array(256),$=0;$<256;++$)U[$]=String.fromCharCode($);oo=U}var oo=void 0;function _l(U){for(var $="",oe=U;f()[oe>>>0];)$+=oo[f()[oe++>>>0]];return $}var mu=void 0;function Rs(U){throw new mu(U)}function Eh(U,$,oe={}){var pe=$.name;if(U||Rs(`type "${pe}" must have a positive integer typeid pointer`),Ql.hasOwnProperty(U)){if(oe.ignoreDuplicateRegistrations)return;Rs(`Cannot register type '${pe}' twice`)}if(Ql[U]=$,delete yh[U],Kl.hasOwnProperty(U)){var Ue=Kl[U];delete Kl[U],Ue.forEach(Qe=>Qe())}}function Ji(U,$,oe={}){if(!("argPackAdvance"in $))throw new TypeError("registerType registeredInstance requires argPackAdvance");return Eh(U,$,oe)}function JI(U,$,oe,pe,Ue){U>>>=0,$>>>=0,oe>>>=0;var Qe=_c(oe);$=_l($),Ji(U,{name:$,fromWireType:function(ve){return!!ve},toWireType:function(ve,tt){return tt?pe:Ue},argPackAdvance:8,readValueFromPointer:function(ve){var tt;if(oe===1)tt=o();else if(oe===2)tt=d();else if(oe===4)tt=D();else throw new TypeError("Unknown boolean type size: "+$);return this.fromWireType(tt[ve>>>Qe])},destructorFunction:null})}function XI(U){if(!(this instanceof Ru)||!(U instanceof Ru))return!1;for(var $=this.$$.ptrType.registeredClass,oe=this.$$.ptr,pe=U.$$.ptrType.registeredClass,Ue=U.$$.ptr;$.baseClass;)oe=$.upcast(oe),$=$.baseClass;for(;pe.baseClass;)Ue=pe.upcast(Ue),pe=pe.baseClass;return $===pe&&oe===Ue}function Ld(U){return{count:U.count,deleteScheduled:U.deleteScheduled,preservePointerOnDelete:U.preservePointerOnDelete,ptr:U.ptr,ptrType:U.ptrType,smartPtr:U.smartPtr,smartPtrType:U.smartPtrType}}function tr(U){function $(oe){return oe.$$.ptrType.registeredClass.name}Rs($(U)+" instance already deleted")}var co=!1;function bd(U){}function vI(U){U.smartPtr?U.smartPtrType.rawDestructor(U.smartPtr):U.ptrType.registeredClass.rawDestructor(U.ptr)}function zs(U){U.count.value-=1;var $=U.count.value===0;$&&vI(U)}function Cd(U,$,oe){if($===oe)return U;if(oe.baseClass===void 0)return null;var pe=Cd(U,$,oe.baseClass);return pe===null?null:oe.downcast(pe)}var Vc={};function e1(){return Object.keys(Ga).length}function t1(){var U=[];for(var $ in Ga)Ga.hasOwnProperty($)&&U.push(Ga[$]);return U}var ho=[];function ph(){for(;ho.length;){var U=ho.pop();U.$$.deleteScheduled=!1,U.delete()}}var fo=void 0;function n1(U){fo=U,ho.length&&fo&&fo(ph)}function Th(){_.getInheritedInstanceCount=e1,_.getLiveInheritedInstances=t1,_.flushPendingDeletes=ph,_.setDelayFunction=n1}var Ga={};function Wc(U,$){for($===void 0&&Rs("ptr should not be undefined");U.baseClass;)$=U.upcast($),U=U.baseClass;return $}function Pd(U,$){return $=Wc(U,$),Ga[$]}function Xi(U,$){(!$.ptrType||!$.ptr)&&wh("makeClassHandle requires ptr and ptrType");var oe=!!$.smartPtrType,pe=!!$.smartPtr;return oe!==pe&&wh("Both smartPtrType and smartPtr must be specified"),$.count={value:1},Io(Object.create(U,{$$:{value:$}}))}function Yc(U){var $=this.getPointee(U);if(!$)return this.destructor(U),null;var oe=Pd(this.registeredClass,$);if(oe!==void 0){if(oe.$$.count.value===0)return oe.$$.ptr=$,oe.$$.smartPtr=U,oe.clone();var pe=oe.clone();return this.destructor(U),pe}function Ue(){return this.isSmartPointer?Xi(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:$,smartPtrType:this,smartPtr:U}):Xi(this.registeredClass.instancePrototype,{ptrType:this,ptr:U})}var Qe=this.registeredClass.getActualType($),ve=Vc[Qe];if(!ve)return Ue.call(this);var tt;this.isConst?tt=ve.constPointerType:tt=ve.pointerType;var ht=Cd($,this.registeredClass,tt.registeredClass);return ht===null?Ue.call(this):this.isSmartPointer?Xi(tt.registeredClass.instancePrototype,{ptrType:tt,ptr:ht,smartPtrType:this,smartPtr:U}):Xi(tt.registeredClass.instancePrototype,{ptrType:tt,ptr:ht})}var Io=function(U){return typeof FinalizationRegistry>"u"?(Io=$=>$,U):(co=new FinalizationRegistry($=>{zs($.$$)}),Io=$=>{var oe=$.$$,pe=!!oe.smartPtr;if(pe){var Ue={$$:oe};co.register($,Ue,$)}return $},bd=$=>co.unregister($),Io(U))};function Md(){if(this.$$.ptr||tr(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var U=Io(Object.create(Object.getPrototypeOf(this),{$$:{value:Ld(this.$$)}}));return U.$$.count.value+=1,U.$$.deleteScheduled=!1,U}function s1(){this.$$.ptr||tr(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Rs("Object already scheduled for deletion"),bd(this),zs(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)}function l1(){return!this.$$.ptr}function r1(){return this.$$.ptr||tr(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Rs("Object already scheduled for deletion"),ho.push(this),ho.length===1&&fo&&fo(ph),this.$$.deleteScheduled=!0,this}function i1(){Ru.prototype.isAliasOf=XI,Ru.prototype.clone=Md,Ru.prototype.delete=s1,Ru.prototype.isDeleted=l1,Ru.prototype.deleteLater=r1}function Ru(){}var u1=48,a1=57;function mh(U){if(U===void 0)return"_unknown";U=U.replace(/[^a-zA-Z0-9_]/g,"$");var $=U.charCodeAt(0);return $>=u1&&$<=a1?`_${U}`:U}function Rh(U,$){return U=mh(U),{[U]:function(){return $.apply(this,arguments)}}[U]}function xd(U,$,oe){if(U[$].overloadTable===void 0){var pe=U[$];U[$]=function(){return U[$].overloadTable.hasOwnProperty(arguments.length)||Rs(`Function '${oe}' called with an invalid number of arguments (${arguments.length}) - expects one of (${U[$].overloadTable})!`),U[$].overloadTable[arguments.length].apply(this,arguments)},U[$].overloadTable=[],U[$].overloadTable[pe.argCount]=pe}}function Ud(U,$,oe){_.hasOwnProperty(U)?((oe===void 0||_[U].overloadTable!==void 0&&_[U].overloadTable[oe]!==void 0)&&Rs(`Cannot register public name '${U}' twice`),xd(_,U,U),_.hasOwnProperty(oe)&&Rs(`Cannot register multiple overloads of a function with the same number of arguments (${oe})!`),_[U].overloadTable[oe]=$):(_[U]=$,oe!==void 0&&(_[U].numArguments=oe))}function o1(U,$,oe,pe,Ue,Qe,ve,tt){this.name=U,this.constructor=$,this.instancePrototype=oe,this.rawDestructor=pe,this.baseClass=Ue,this.getActualType=Qe,this.upcast=ve,this.downcast=tt,this.pureVirtualFunctions=[]}function Ah(U,$,oe){for(;$!==oe;)$.upcast||Rs(`Expected null or instance of ${oe.name}, got an instance of ${$.name}`),U=$.upcast(U),$=$.baseClass;return U}function c1(U,$){if($===null)return this.isReference&&Rs(`null is not a valid ${this.name}`),0;$.$$||Rs(`Cannot pass "${gh($)}" as a ${this.name}`),$.$$.ptr||Rs(`Cannot pass deleted object as a pointer of type ${this.name}`);var oe=$.$$.ptrType.registeredClass,pe=Ah($.$$.ptr,oe,this.registeredClass);return pe}function Dh(U,$){var oe;if($===null)return this.isReference&&Rs(`null is not a valid ${this.name}`),this.isSmartPointer?(oe=this.rawConstructor(),U!==null&&U.push(this.rawDestructor,oe),oe):0;$.$$||Rs(`Cannot pass "${gh($)}" as a ${this.name}`),$.$$.ptr||Rs(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&$.$$.ptrType.isConst&&Rs(`Cannot convert argument of type ${$.$$.smartPtrType?$.$$.smartPtrType.name:$.$$.ptrType.name} to parameter type ${this.name}`);var pe=$.$$.ptrType.registeredClass;if(oe=Ah($.$$.ptr,pe,this.registeredClass),this.isSmartPointer)switch($.$$.smartPtr===void 0&&Rs("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:$.$$.smartPtrType===this?oe=$.$$.smartPtr:Rs(`Cannot convert argument of type ${$.$$.smartPtrType?$.$$.smartPtrType.name:$.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:oe=$.$$.smartPtr;break;case 2:if($.$$.smartPtrType===this)oe=$.$$.smartPtr;else{var Ue=$.clone();oe=this.rawShare(oe,$s.toHandle(function(){Ue.delete()})),U!==null&&U.push(this.rawDestructor,oe)}break;default:Rs("Unsupporting sharing policy")}return oe}function h1(U,$){if($===null)return this.isReference&&Rs(`null is not a valid ${this.name}`),0;$.$$||Rs(`Cannot pass "${gh($)}" as a ${this.name}`),$.$$.ptr||Rs(`Cannot pass deleted object as a pointer of type ${this.name}`),$.$$.ptrType.isConst&&Rs(`Cannot convert argument of type ${$.$$.ptrType.name} to parameter type ${this.name}`);var oe=$.$$.ptrType.registeredClass,pe=Ah($.$$.ptr,oe,this.registeredClass);return pe}function f1(U){return this.rawGetPointee&&(U=this.rawGetPointee(U)),U}function d1(U){this.rawDestructor&&this.rawDestructor(U)}function I1(U){U!==null&&U.delete()}function Bd(){Ui.prototype.getPointee=f1,Ui.prototype.destructor=d1,Ui.prototype.argPackAdvance=8,Ui.prototype.readValueFromPointer=Fa,Ui.prototype.deleteObject=I1,Ui.prototype.fromWireType=Yc}function Ui(U,$,oe,pe,Ue,Qe,ve,tt,ht,St,qt){this.name=U,this.registeredClass=$,this.isReference=oe,this.isConst=pe,this.isSmartPointer=Ue,this.pointeeType=Qe,this.sharingPolicy=ve,this.rawGetPointee=tt,this.rawConstructor=ht,this.rawShare=St,this.rawDestructor=qt,!Ue&&$.baseClass===void 0?pe?(this.toWireType=c1,this.destructorFunction=null):(this.toWireType=h1,this.destructorFunction=null):this.toWireType=Dh}function Hd(U,$,oe){_.hasOwnProperty(U)||wh("Replacing nonexistant public symbol"),_[U].overloadTable!==void 0&&oe!==void 0?_[U].overloadTable[oe]=$:(_[U]=$,_[U].argCount=oe)}var y1=(U,$,oe)=>{var pe=_["dynCall_"+U];return oe&&oe.length?pe.apply(null,[$].concat(oe)):pe.call(null,$)},w1=(U,$,oe)=>{if(U.includes("j"))return y1(U,$,oe);var pe=Ki($).apply(null,oe);return pe},E1=(U,$)=>{var oe=[];return function(){return oe.length=0,Object.assign(oe,arguments),w1(U,$,oe)}};function Jl(U,$){U=_l(U);function oe(){return U.includes("j")?E1(U,$):Ki($)}var pe=oe();return typeof pe!="function"&&Rs(`unknown function pointer with signature ${U}: ${$}`),pe}function p1(U,$){var oe=Rh($,function(pe){this.name=$,this.message=pe;var Ue=new Error(pe).stack;Ue!==void 0&&(this.stack=this.toString()+`
`+Ue.replace(/^Error(:[^\n]*)?\n/,""))});return oe.prototype=Object.create(U.prototype),oe.prototype.constructor=oe,oe.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},oe}var Fd=void 0;function Gd(U){var $=z2(U),oe=_l($);return Eo($),oe}function zc(U,$){var oe=[],pe={};function Ue(Qe){if(!pe[Qe]&&!Ql[Qe]){if(yh[Qe]){yh[Qe].forEach(Ue);return}oe.push(Qe),pe[Qe]=!0}}throw $.forEach(Ue),new Fd(`${U}: `+oe.map(Gd).join([", "]))}function T1(U,$,oe,pe,Ue,Qe,ve,tt,ht,St,qt,In,tn){U>>>=0,$>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0,ve>>>=0,tt>>>=0,ht>>>=0,St>>>=0,qt>>>=0,In>>>=0,tn>>>=0,qt=_l(qt),Qe=Jl(Ue,Qe),tt&&(tt=Jl(ve,tt)),St&&(St=Jl(ht,St)),tn=Jl(In,tn);var on=mh(qt);Ud(on,function(){zc(`Cannot construct ${qt} due to unbound types`,[pe])}),Zi([U,$,oe],pe?[pe]:[],function(Vn){Vn=Vn[0];var Cs,xs;pe?(Cs=Vn.registeredClass,xs=Cs.instancePrototype):xs=Ru.prototype;var Ks=Rh(on,function(){if(Object.getPrototypeOf(this)!==_t)throw new mu("Use 'new' to construct "+qt);if(cn.constructor_body===void 0)throw new mu(qt+" has no accessible constructor");var fl=cn.constructor_body[arguments.length];if(fl===void 0)throw new mu(`Tried to invoke ctor of ${qt} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(cn.constructor_body).toString()}) parameters instead!`);return fl.apply(this,arguments)}),_t=Object.create(xs,{constructor:{value:Ks}});Ks.prototype=_t;var cn=new o1(qt,Ks,_t,tn,Cs,Qe,tt,St);cn.baseClass&&(cn.baseClass.__derivedClasses===void 0&&(cn.baseClass.__derivedClasses=[]),cn.baseClass.__derivedClasses.push(cn));var nr=new Ui(qt,cn,!0,!1,!1),js=new Ui(qt+"*",cn,!1,!1,!1),Du=new Ui(qt+" const*",cn,!1,!0,!1);return Vc[U]={pointerType:js,constPointerType:Du},Hd(on,Ks),[nr,js,Du]})}function Sh(U,$){for(var oe=[],pe=0;pe<U;pe++)oe.push(P()[$+pe*4>>>2]);return oe}function m1(U,$){if(!(U instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof U} which is not a function`);var oe=Rh(U.name||"unknownFunctionName",function(){});oe.prototype=U.prototype;var pe=new oe,Ue=U.apply(pe,$);return Ue instanceof Object?Ue:pe}function Nh(U,$,oe,pe,Ue,Qe){var ve=$.length;ve<2&&Rs("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var tt=$[1]!==null&&oe!==null,ht=!1,St=1;St<$.length;++St)if($[St]!==null&&$[St].destructorFunction===void 0){ht=!0;break}for(var qt=$[0].name!=="void",In="",tn="",St=0;St<ve-2;++St)In+=(St!==0?", ":"")+"arg"+St,tn+=(St!==0?", ":"")+"arg"+St+"Wired";var on=`
        return function ${mh(U)}(${In}) {
        if (arguments.length !== ${ve-2}) {
          throwBindingError('function ${U} called with ${arguments.length} arguments, expected ${ve-2} args!');
        }`;ht&&(on+=`var destructors = [];
`);var Vn=ht?"destructors":"null",Cs=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],xs=[Rs,pe,Ue,Tu,$[0],$[1]];tt&&(on+="var thisWired = classParam.toWireType("+Vn+`, this);
`);for(var St=0;St<ve-2;++St)on+="var arg"+St+"Wired = argType"+St+".toWireType("+Vn+", arg"+St+"); // "+$[St+2].name+`
`,Cs.push("argType"+St),xs.push($[St+2]);if(tt&&(tn="thisWired"+(tn.length>0?", ":"")+tn),on+=(qt||Qe?"var rv = ":"")+"invoker(fn"+(tn.length>0?", ":"")+tn+`);
`,ht)on+=`runDestructors(destructors);
`;else for(var St=tt?1:2;St<$.length;++St){var Ks=St===1?"thisWired":"arg"+(St-2)+"Wired";$[St].destructorFunction!==null&&(on+=Ks+"_dtor("+Ks+"); // "+$[St].name+`
`,Cs.push(Ks+"_dtor"),xs.push($[St].destructorFunction))}return qt&&(on+=`var ret = retType.fromWireType(rv);
return ret;
`),on+=`}
`,Cs.push(on),m1(Function,Cs).apply(null,xs)}function yo(U,$,oe,pe,Ue,Qe){U>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0;var ve=Sh($,oe);Ue=Jl(pe,Ue),Zi([],[U],function(tt){tt=tt[0];var ht=`constructor ${tt.name}`;if(tt.registeredClass.constructor_body===void 0&&(tt.registeredClass.constructor_body=[]),tt.registeredClass.constructor_body[$-1]!==void 0)throw new mu(`Cannot register multiple constructors with identical number of parameters (${$-1}) for class '${tt.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return tt.registeredClass.constructor_body[$-1]=()=>{zc(`Cannot construct ${tt.name} due to unbound types`,ve)},Zi([],ve,function(St){return St.splice(1,0,null),tt.registeredClass.constructor_body[$-1]=Nh(ht,St,null,Ue,Qe),[]}),[]})}function R1(U,$,oe,pe,Ue,Qe,ve,tt,ht){U>>>=0,$>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0,ve>>>=0;var St=Sh(oe,pe);$=_l($),Qe=Jl(Ue,Qe),Zi([],[U],function(qt){qt=qt[0];var In=`${qt.name}.${$}`;$.startsWith("@@")&&($=Symbol[$.substring(2)]),tt&&qt.registeredClass.pureVirtualFunctions.push($);function tn(){zc(`Cannot call ${In} due to unbound types`,St)}var on=qt.registeredClass.instancePrototype,Vn=on[$];return Vn===void 0||Vn.overloadTable===void 0&&Vn.className!==qt.name&&Vn.argCount===oe-2?(tn.argCount=oe-2,tn.className=qt.name,on[$]=tn):(xd(on,$,In),on[$].overloadTable[oe-2]=tn),Zi([],St,function(Cs){var xs=Nh(In,Cs,qt,Qe,ve,ht);return on[$].overloadTable===void 0?(xs.argCount=oe-2,on[$]=xs):on[$].overloadTable[oe-2]=xs,[]}),[]})}function A1(){Object.assign(_d.prototype,{get(U){return this.allocated[U]},has(U){return this.allocated[U]!==void 0},allocate(U){var $=this.freelist.pop()||this.allocated.length;return this.allocated[$]=U,$},free(U){this.allocated[U]=void 0,this.freelist.push(U)}})}function _d(){this.allocated=[void 0],this.freelist=[]}var fr=new _d;function jc(U){U>>>=0,U>=fr.reserved&&--fr.get(U).refcount===0&&fr.free(U)}function D1(){for(var U=0,$=fr.reserved;$<fr.allocated.length;++$)fr.allocated[$]!==void 0&&++U;return U}function S1(){fr.allocated.push({value:void 0},{value:null},{value:!0},{value:!1}),fr.reserved=fr.allocated.length,_.count_emval_handles=D1}var $s={toValue:U=>(U||Rs("Cannot use deleted val. handle = "+U),fr.get(U).value),toHandle:U=>{switch(U){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return fr.allocate({refcount:1,value:U})}}};function N1(U,$){U>>>=0,$>>>=0,$=_l($),Ji(U,{name:$,fromWireType:function(oe){var pe=$s.toValue(oe);return jc(oe),pe},toWireType:function(oe,pe){return $s.toHandle(pe)},argPackAdvance:8,readValueFromPointer:Fa,destructorFunction:null})}function gh(U){if(U===null)return"null";var $=typeof U;return $==="object"||$==="array"||$==="function"?U.toString():""+U}function g1(U,$){switch($){case 2:return function(oe){return this.fromWireType(x()[oe>>>2])};case 3:return function(oe){return this.fromWireType(H()[oe>>>3])};default:throw new TypeError("Unknown float type: "+U)}}function O1(U,$,oe){U>>>=0,$>>>=0,oe>>>=0;var pe=_c(oe);$=_l($),Ji(U,{name:$,fromWireType:function(Ue){return Ue},toWireType:function(Ue,Qe){return Qe},argPackAdvance:8,readValueFromPointer:g1($,pe),destructorFunction:null})}function Oh(U,$,oe,pe,Ue,Qe,ve){U>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0;var tt=Sh($,oe);U=_l(U),Ue=Jl(pe,Ue),Ud(U,function(){zc(`Cannot call ${U} due to unbound types`,tt)},$-1),Zi([],tt,function(ht){var St=[ht[0],null].concat(ht.slice(1));return Hd(U,Nh(U,St,null,Ue,Qe,ve),$-1),[]})}function L1(U,$,oe){switch($){case 0:return oe?function(Ue){return o()[Ue>>>0]}:function(Ue){return f()[Ue>>>0]};case 1:return oe?function(Ue){return d()[Ue>>>1]}:function(Ue){return m()[Ue>>>1]};case 2:return oe?function(Ue){return D()[Ue>>>2]}:function(Ue){return P()[Ue>>>2]};default:throw new TypeError("Unknown integer type: "+U)}}function wo(U,$,oe,pe,Ue){U>>>=0,$>>>=0,oe>>>=0,$=_l($);var Qe=_c(oe),ve=In=>In;if(pe===0){var tt=32-8*oe;ve=In=>In<<tt>>>tt}var ht=$.includes("unsigned"),St=(In,tn)=>{},qt;ht?qt=function(In,tn){return St(tn,this.name),tn>>>0}:qt=function(In,tn){return St(tn,this.name),tn},Ji(U,{name:$,fromWireType:ve,toWireType:qt,argPackAdvance:8,readValueFromPointer:L1($,Qe,pe!==0),destructorFunction:null})}function b1(U,$,oe){U>>>=0,oe>>>=0;var pe=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],Ue=pe[$];function Qe(ve){ve=ve>>2;var tt=P(),ht=tt[ve>>>0],St=tt[ve+1>>>0];return new Ue(tt.buffer,St,ht)}oe=_l(oe),Ji(U,{name:oe,fromWireType:Qe,argPackAdvance:8,readValueFromPointer:Qe},{ignoreDuplicateRegistrations:!0})}var Os=(U,$,oe)=>l3(U,f(),$,oe);function C1(U,$){U>>>=0,$>>>=0,$=_l($);var oe=$==="std::string";Ji(U,{name:$,fromWireType:function(pe){var Ue=P()[pe>>>2],Qe=pe+4,ve;if(oe)for(var tt=Qe,ht=0;ht<=Ue;++ht){var St=Qe+ht;if(ht==Ue||f()[St>>>0]==0){var qt=St-tt,In=At(tt,qt);ve===void 0?ve=In:(ve+="\0",ve+=In),tt=St+1}}else{for(var tn=new Array(Ue),ht=0;ht<Ue;++ht)tn[ht]=String.fromCharCode(f()[Qe+ht>>>0]);ve=tn.join("")}return Eo(pe),ve},toWireType:function(pe,Ue){Ue instanceof ArrayBuffer&&(Ue=new Uint8Array(Ue));var Qe,ve=typeof Ue=="string";ve||Ue instanceof Uint8Array||Ue instanceof Uint8ClampedArray||Ue instanceof Int8Array||Rs("Cannot pass non-string to std::string"),oe&&ve?Qe=kI(Ue):Qe=Ue.length;var tt=c3(4+Qe+1),ht=tt+4;if(P()[tt>>>2]=Qe,oe&&ve)Os(Ue,ht,Qe+1);else if(ve)for(var St=0;St<Qe;++St){var qt=Ue.charCodeAt(St);qt>255&&(Eo(ht),Rs("String has UTF-16 code units that do not fit in 8 bits")),f()[ht+St>>>0]=qt}else for(var St=0;St<Qe;++St)f()[ht+St>>>0]=Ue[St];return pe!==null&&pe.push(Eo,tt),tt},argPackAdvance:8,readValueFromPointer:Fa,destructorFunction:function(pe){Eo(pe)}})}var Lh=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,vi=(U,$)=>{for(var oe=U,pe=oe>>1,Ue=pe+$/2;!(pe>=Ue)&&m()[pe>>>0];)++pe;if(oe=pe<<1,oe-U>32&&Lh)return Lh.decode(f().slice(U,oe));for(var Qe="",ve=0;!(ve>=$/2);++ve){var tt=d()[U+ve*2>>>1];if(tt==0)break;Qe+=String.fromCharCode(tt)}return Qe},bh=(U,$,oe)=>{if(oe===void 0&&(oe=2147483647),oe<2)return 0;oe-=2;for(var pe=$,Ue=oe<U.length*2?oe/2:U.length,Qe=0;Qe<Ue;++Qe){var ve=U.charCodeAt(Qe);d()[$>>>1]=ve,$+=2}return d()[$>>>1]=0,$-pe},kc=U=>U.length*2,P1=(U,$)=>{for(var oe=0,pe="";!(oe>=$/4);){var Ue=D()[U+oe*4>>>2];if(Ue==0)break;if(++oe,Ue>=65536){var Qe=Ue-65536;pe+=String.fromCharCode(55296|Qe>>10,56320|Qe&1023)}else pe+=String.fromCharCode(Ue)}return pe},pa=(U,$,oe)=>{if($>>>=0,oe===void 0&&(oe=2147483647),oe<4)return 0;for(var pe=$,Ue=pe+oe-4,Qe=0;Qe<U.length;++Qe){var ve=U.charCodeAt(Qe);if(ve>=55296&&ve<=57343){var tt=U.charCodeAt(++Qe);ve=65536+((ve&1023)<<10)|tt&1023}if(D()[$>>>2]=ve,$+=4,$+4>Ue)break}return D()[$>>>2]=0,$-pe},Vd=U=>{for(var $=0,oe=0;oe<U.length;++oe){var pe=U.charCodeAt(oe);pe>=55296&&pe<=57343&&++oe,$+=4}return $},vn=function(U,$,oe){U>>>=0,$>>>=0,oe>>>=0,oe=_l(oe);var pe,Ue,Qe,ve,tt;$===2?(pe=vi,Ue=bh,ve=kc,Qe=()=>m(),tt=1):$===4&&(pe=P1,Ue=pa,ve=Vd,Qe=()=>P(),tt=2),Ji(U,{name:oe,fromWireType:function(ht){for(var St=P()[ht>>>2],qt=Qe(),In,tn=ht+4,on=0;on<=St;++on){var Vn=ht+4+on*$;if(on==St||qt[Vn>>>tt]==0){var Cs=Vn-tn,xs=pe(tn,Cs);In===void 0?In=xs:(In+="\0",In+=xs),tn=Vn+$}}return Eo(ht),In},toWireType:function(ht,St){typeof St!="string"&&Rs(`Cannot pass non-string to C++ string type ${oe}`);var qt=ve(St),In=c3(4+qt+$);return P()[In>>>2]=qt>>tt,Ue(St,In+4,qt+$),ht!==null&&ht.push(Eo,In),In},argPackAdvance:8,readValueFromPointer:Fa,destructorFunction:function(ht){Eo(ht)}})};function M1(U,$,oe,pe,Ue,Qe){U>>>=0,$>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0,Gl[U]={name:_l($),rawConstructor:Jl(oe,pe),rawDestructor:Jl(Ue,Qe),elements:[]}}function x1(U,$,oe,pe,Ue,Qe,ve,tt,ht){U>>>=0,$>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0,ve>>>=0,tt>>>=0,ht>>>=0,Gl[U].elements.push({getterReturnType:$,getter:Jl(oe,pe),getterContext:Ue,setterArgumentType:Qe,setter:Jl(ve,tt),setterContext:ht})}function U1(U,$,oe,pe,Ue,Qe){U>>>=0,$>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0,Gc[U]={name:_l($),rawConstructor:Jl(oe,pe),rawDestructor:Jl(Ue,Qe),fields:[]}}function B1(U,$,oe,pe,Ue,Qe,ve,tt,ht,St){U>>>=0,$>>>=0,oe>>>=0,pe>>>=0,Ue>>>=0,Qe>>>=0,ve>>>=0,tt>>>=0,ht>>>=0,St>>>=0,Gc[U].fields.push({fieldName:_l($),getterReturnType:oe,getter:Jl(pe,Ue),getterContext:Qe,setterArgumentType:ve,setter:Jl(tt,ht),setterContext:St})}function H1(U,$){U>>>=0,$>>>=0,$=_l($),Ji(U,{isVoid:!0,name:$,argPackAdvance:0,fromWireType:function(){},toWireType:function(oe,pe){}})}var Ch=!0,He=()=>Ch,Au=()=>{if(!Ps())try{Ee?o4(Bt):Qn(Bt)}catch(U){as(U)}},F1=U=>{if(!Ct)try{U(),Au()}catch($){as($)}};function Ph(U){if(U>>>=0,typeof Atomics.waitAsync=="function"){var $=Atomics.waitAsync(D(),U>>2,U);$.value.then(qc);var oe=U+128;Atomics.store(D(),oe>>2,1)}}_.__emscripten_thread_mailbox_await=Ph;var qc=function(){var U=o3();U&&(Ph(U),F1(()=>q2()))};_.checkMailbox=qc;var G1=function(U,$,oe){if(U>>>=0,$>>>=0,U==$)setTimeout(()=>qc());else if(Ee)postMessage({targetThread:U,cmd:"checkMailbox"});else{var pe=vt.pthreads[U];if(!pe)return;pe.postMessage({cmd:"checkMailbox"})}};function _1(U,$,oe){return-1}function V1(U){}function Mh(U,$){var oe=Ql[U];return oe===void 0&&Rs($+" has unknown type "+Gd(U)),oe}function W1(U,$,oe){U>>>=0,$>>>=0,oe>>>=0,U=$s.toValue(U),$=Mh($,"emval::as");var pe=[],Ue=$s.toHandle(pe);return P()[oe>>>2]=Ue,$.toWireType(pe,U)}function Y1(U,$){for(var oe=new Array(U),pe=0;pe<U;++pe)oe[pe]=Mh(P()[$+pe*4>>>2],"parameter "+pe);return oe}function z1(U,$,oe,pe){U>>>=0,oe>>>=0,pe>>>=0,U=$s.toValue(U);for(var Ue=Y1($,oe),Qe=new Array($),ve=0;ve<$;++ve){var tt=Ue[ve];Qe[ve]=tt.readValueFromPointer(pe),pe+=tt.argPackAdvance}var ht=U.apply(void 0,Qe);return $s.toHandle(ht)}var Wd={};function xh(U){var $=Wd[U];return $===void 0?_l(U):$}function Yd(){return typeof globalThis=="object"?globalThis:function(){return Function}()("return this")()}function j1(U){return U>>>=0,U===0?$s.toHandle(Yd()):(U=xh(U),$s.toHandle(Yd()[U]))}function k1(U,$){return U>>>=0,$>>>=0,U=$s.toValue(U),$=$s.toValue($),$s.toHandle(U[$])}function q1(U){U>>>=0,U>4&&(fr.get(U).refcount+=1)}function zd(U,$){return U>>>=0,$>>>=0,U=$s.toValue(U),$=$s.toValue($),U instanceof $}function $c(U){return U>>>=0,U=$s.toValue(U),typeof U=="number"}function Kc(U){return U>>>=0,U=$s.toValue(U),typeof U=="string"}function $1(){return $s.toHandle([])}function Qc(U){return U>>>=0,$s.toHandle(xh(U))}function jd(){return $s.toHandle({})}function eu(U){U>>>=0;var $=$s.toValue(U);Tu($),jc(U)}function kd(U,$,oe){U>>>=0,$>>>=0,oe>>>=0,U=$s.toValue(U),$=$s.toValue($),oe=$s.toValue(oe),U[$]=oe}function K1(U,$){U>>>=0,$>>>=0,U=Mh(U,"_emval_take_value");var oe=U.readValueFromPointer($);return $s.toHandle(oe)}function Zc(U,$,oe){var pe=Qi(U,$);oe>>>=0;var Ue=new Date(pe*1e3);D()[oe>>>2]=Ue.getUTCSeconds(),D()[oe+4>>>2]=Ue.getUTCMinutes(),D()[oe+8>>>2]=Ue.getUTCHours(),D()[oe+12>>>2]=Ue.getUTCDate(),D()[oe+16>>>2]=Ue.getUTCMonth(),D()[oe+20>>>2]=Ue.getUTCFullYear()-1900,D()[oe+24>>>2]=Ue.getUTCDay();var Qe=Date.UTC(Ue.getUTCFullYear(),0,1,0,0,0,0),ve=(Ue.getTime()-Qe)/(1e3*60*60*24)|0;D()[oe+28>>>2]=ve}var _a=U=>U%4===0&&(U%100!==0||U%400===0),V=[0,31,60,91,121,152,182,213,244,274,305,335],Z=[0,31,59,90,120,151,181,212,243,273,304,334],fe=U=>{var $=_a(U.getFullYear()),oe=$?V:Z,pe=oe[U.getMonth()]+U.getDate()-1;return pe};function De(U,$,oe){var pe=Qi(U,$);oe>>>=0;var Ue=new Date(pe*1e3);D()[oe>>>2]=Ue.getSeconds(),D()[oe+4>>>2]=Ue.getMinutes(),D()[oe+8>>>2]=Ue.getHours(),D()[oe+12>>>2]=Ue.getDate(),D()[oe+16>>>2]=Ue.getMonth(),D()[oe+20>>>2]=Ue.getFullYear()-1900,D()[oe+24>>>2]=Ue.getDay();var Qe=fe(Ue)|0;D()[oe+28>>>2]=Qe,D()[oe+36>>>2]=-(Ue.getTimezoneOffset()*60);var ve=new Date(Ue.getFullYear(),0,1),tt=new Date(Ue.getFullYear(),6,1).getTimezoneOffset(),ht=ve.getTimezoneOffset(),St=(tt!=ht&&Ue.getTimezoneOffset()==Math.min(ht,tt))|0;D()[oe+32>>>2]=St}var Be=U=>{var $=kI(U)+1,oe=c3($);return oe&&Os(U,oe,$),oe};function Xe(U,$,oe){U>>>=0,$>>>=0,oe>>>=0;var pe=new Date().getFullYear(),Ue=new Date(pe,0,1),Qe=new Date(pe,6,1),ve=Ue.getTimezoneOffset(),tt=Qe.getTimezoneOffset(),ht=Math.max(ve,tt);P()[U>>>2]=ht*60,D()[$>>>2]=+(ve!=tt);function St(Vn){var Cs=Vn.toTimeString().match(/\(([A-Za-z ]+)\)$/);return Cs?Cs[1]:"GMT"}var qt=St(Ue),In=St(Qe),tn=Be(qt),on=Be(In);tt<ve?(P()[oe>>>2]=tn,P()[oe+4>>>2]=on):(P()[oe>>>2]=on,P()[oe+4>>>2]=tn)}var nt=()=>{zn("")};function st(){}function ft(){return Date.now()}var mt=()=>{pn+=1},Yt=()=>{throw mt(),"unwind"},an;an=()=>performance.timeOrigin+performance.now();var Jt=U=>{var $=K2(),oe=U();return c4($),oe},Kt=function(U,$){var oe=arguments.length-2,pe=arguments;return Jt(()=>{for(var Ue=oe,Qe=Q2(Ue*8),ve=Qe>>3,tt=0;tt<oe;tt++){var ht=pe[2+tt];H()[ve+tt>>>0]=ht}return k2(U,Ue,Qe,$)})},Ln=[];function Is(U,$,oe,pe){$>>>=0,pe>>>=0,vt.currentProxiedOperationCallerThread=$,Ln.length=oe;for(var Ue=pe>>3,Qe=0;Qe<oe;Qe++)Ln[Qe]=H()[Ue+Qe>>>0];var ve=Cw[U];return ve.apply(null,Ln)}var Ts=()=>4294901760,Ls=U=>{var $=ot.buffer,oe=U-$.byteLength+65535>>>16;try{return ot.grow(oe),Xt(),1}catch{}};function Ht(U){U>>>=0;var $=f().length;if(U<=$)return!1;var oe=Ts();if(U>oe)return!1;for(var pe=(ht,St)=>ht+(St-ht%St)%St,Ue=1;Ue<=4;Ue*=2){var Qe=$*(1+.2/Ue);Qe=Math.min(Qe,U+100663296);var ve=Math.min(oe,pe(Math.max(U,Qe),65536)),tt=Ls(ve);if(tt)return!0}return!1}var hn={},Ll=()=>K||"./this.program",As=()=>{if(!As.strings){var U=(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",$={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:U,_:Ll()};for(var oe in hn)hn[oe]===void 0?delete $[oe]:$[oe]=hn[oe];var pe=[];for(var oe in $)pe.push(`${oe}=${$[oe]}`);As.strings=pe}return As.strings},dr=(U,$)=>{for(var oe=0;oe<U.length;++oe)o()[$++>>>0]=U.charCodeAt(oe);o()[$>>>0]=0};function cl(U,$){if(Ee)return Kt(3,1,U,$);U>>>=0,$>>>=0;var oe=0;return As().forEach(function(pe,Ue){var Qe=$+oe;P()[U+Ue*4>>>2]=Qe,dr(pe,Qe),oe+=pe.length+1}),0}function x2(U,$){if(Ee)return Kt(4,1,U,$);U>>>=0,$>>>=0;var oe=As();P()[U>>>2]=oe.length;var pe=0;return oe.forEach(function(Ue){pe+=Ue.length+1}),P()[$>>>2]=pe,0}function U2(U){if(Ee)return Kt(5,1,U);try{var $=fn.getStreamFromFD(U);return Re.close($),0}catch(oe){if(typeof Re>"u"||oe.name!=="ErrnoError")throw oe;return oe.errno}}function B2(U,$){if(Ee)return Kt(6,1,U,$);$>>>=0;try{var oe=0,pe=0,Ue=0,Qe=fn.getStreamFromFD(U),ve=Qe.tty?2:Re.isDir(Qe.mode)?3:Re.isLink(Qe.mode)?7:4;return o()[$>>>0]=ve,d()[$+2>>>1]=Ue,Sn=[oe>>>0,(yn=oe,+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[$+8>>>2]=Sn[0],D()[$+12>>>2]=Sn[1],Sn=[pe>>>0,(yn=pe,+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[$+16>>>2]=Sn[0],D()[$+20>>>2]=Sn[1],0}catch(tt){if(typeof Re>"u"||tt.name!=="ErrnoError")throw tt;return tt.errno}}var u3=(U,$,oe,pe)=>{for(var Ue=0,Qe=0;Qe<oe;Qe++){var ve=P()[$>>>2],tt=P()[$+4>>>2];$+=8;var ht=Re.read(U,o(),ve,tt,pe);if(ht<0)return-1;if(Ue+=ht,ht<tt)break}return Ue};function H2(U,$,oe,pe){if(Ee)return Kt(7,1,U,$,oe,pe);$>>>=0,oe>>>=0,pe>>>=0;try{var Ue=fn.getStreamFromFD(U),Qe=u3(Ue,$,oe);return P()[pe>>>2]=Qe,0}catch(ve){if(typeof Re>"u"||ve.name!=="ErrnoError")throw ve;return ve.errno}}function F2(U,$,oe,pe,Ue){if(Ee)return Kt(8,1,U,$,oe,pe,Ue);var Qe=Qi($,oe);Ue>>>=0;try{if(isNaN(Qe))return 61;var ve=fn.getStreamFromFD(U);return Re.llseek(ve,Qe,pe),Sn=[ve.position>>>0,(yn=ve.position,+Math.abs(yn)>=1?yn>0?+Math.floor(yn/4294967296)>>>0:~~+Math.ceil((yn-+(~~yn>>>0))/4294967296)>>>0:0)],D()[Ue>>>2]=Sn[0],D()[Ue+4>>>2]=Sn[1],ve.getdents&&Qe===0&&pe===0&&(ve.getdents=null),0}catch(tt){if(typeof Re>"u"||tt.name!=="ErrnoError")throw tt;return tt.errno}}var G2=(U,$,oe,pe)=>{for(var Ue=0,Qe=0;Qe<oe;Qe++){var ve=P()[$>>>2],tt=P()[$+4>>>2];$+=8;var ht=Re.write(U,o(),ve,tt,pe);if(ht<0)return-1;Ue+=ht}return Ue};function _2(U,$,oe,pe){if(Ee)return Kt(9,1,U,$,oe,pe);$>>>=0,oe>>>=0,pe>>>=0;try{var Ue=fn.getStreamFromFD(U),Qe=G2(Ue,$,oe);return P()[pe>>>2]=Qe,0}catch(ve){if(typeof Re>"u"||ve.name!=="ErrnoError")throw ve;return ve.errno}}var gw=(U,$)=>{for(var oe=0,pe=0;pe<=$;oe+=U[pe++]);return oe},V2=[31,29,31,30,31,30,31,31,30,31,30,31],W2=[31,28,31,30,31,30,31,31,30,31,30,31],Ow=(U,$)=>{for(var oe=new Date(U.getTime());$>0;){var pe=_a(oe.getFullYear()),Ue=oe.getMonth(),Qe=(pe?V2:W2)[Ue];if($>Qe-oe.getDate())$-=Qe-oe.getDate()+1,oe.setDate(1),Ue<11?oe.setMonth(Ue+1):(oe.setMonth(0),oe.setFullYear(oe.getFullYear()+1));else return oe.setDate(oe.getDate()+$),oe}return oe},Lw=(U,$)=>{o().set(U,$>>>0)};function bw(U,$,oe,pe){U>>>=0,$>>>=0,oe>>>=0,pe>>>=0;var Ue=D()[pe+40>>>2],Qe={tm_sec:D()[pe>>>2],tm_min:D()[pe+4>>>2],tm_hour:D()[pe+8>>>2],tm_mday:D()[pe+12>>>2],tm_mon:D()[pe+16>>>2],tm_year:D()[pe+20>>>2],tm_wday:D()[pe+24>>>2],tm_yday:D()[pe+28>>>2],tm_isdst:D()[pe+32>>>2],tm_gmtoff:D()[pe+36>>>2],tm_zone:Ue?At(Ue):""},ve=At(oe),tt={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var ht in tt)ve=ve.replace(new RegExp(ht,"g"),tt[ht]);var St=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],qt=["January","February","March","April","May","June","July","August","September","October","November","December"];function In(_t,cn,nr){for(var js=typeof _t=="number"?_t.toString():_t||"";js.length<cn;)js=nr[0]+js;return js}function tn(_t,cn){return In(_t,cn,"0")}function on(_t,cn){function nr(Du){return Du<0?-1:Du>0?1:0}var js;return(js=nr(_t.getFullYear()-cn.getFullYear()))===0&&(js=nr(_t.getMonth()-cn.getMonth()))===0&&(js=nr(_t.getDate()-cn.getDate())),js}function Vn(_t){switch(_t.getDay()){case 0:return new Date(_t.getFullYear()-1,11,29);case 1:return _t;case 2:return new Date(_t.getFullYear(),0,3);case 3:return new Date(_t.getFullYear(),0,2);case 4:return new Date(_t.getFullYear(),0,1);case 5:return new Date(_t.getFullYear()-1,11,31);case 6:return new Date(_t.getFullYear()-1,11,30)}}function Cs(_t){var cn=Ow(new Date(_t.tm_year+1900,0,1),_t.tm_yday),nr=new Date(cn.getFullYear(),0,4),js=new Date(cn.getFullYear()+1,0,4),Du=Vn(nr),fl=Vn(js);return on(Du,cn)<=0?on(fl,cn)<=0?cn.getFullYear()+1:cn.getFullYear():cn.getFullYear()-1}var xs={"%a":_t=>St[_t.tm_wday].substring(0,3),"%A":_t=>St[_t.tm_wday],"%b":_t=>qt[_t.tm_mon].substring(0,3),"%B":_t=>qt[_t.tm_mon],"%C":_t=>{var cn=_t.tm_year+1900;return tn(cn/100|0,2)},"%d":_t=>tn(_t.tm_mday,2),"%e":_t=>In(_t.tm_mday,2," "),"%g":_t=>Cs(_t).toString().substring(2),"%G":_t=>Cs(_t),"%H":_t=>tn(_t.tm_hour,2),"%I":_t=>{var cn=_t.tm_hour;return cn==0?cn=12:cn>12&&(cn-=12),tn(cn,2)},"%j":_t=>tn(_t.tm_mday+gw(_a(_t.tm_year+1900)?V2:W2,_t.tm_mon-1),3),"%m":_t=>tn(_t.tm_mon+1,2),"%M":_t=>tn(_t.tm_min,2),"%n":()=>`
`,"%p":_t=>_t.tm_hour>=0&&_t.tm_hour<12?"AM":"PM","%S":_t=>tn(_t.tm_sec,2),"%t":()=>"	","%u":_t=>_t.tm_wday||7,"%U":_t=>{var cn=_t.tm_yday+7-_t.tm_wday;return tn(Math.floor(cn/7),2)},"%V":_t=>{var cn=Math.floor((_t.tm_yday+7-(_t.tm_wday+6)%7)/7);if((_t.tm_wday+371-_t.tm_yday-2)%7<=2&&cn++,cn){if(cn==53){var js=(_t.tm_wday+371-_t.tm_yday)%7;js!=4&&(js!=3||!_a(_t.tm_year))&&(cn=1)}}else{cn=52;var nr=(_t.tm_wday+7-_t.tm_yday-1)%7;(nr==4||nr==5&&_a(_t.tm_year%400-1))&&cn++}return tn(cn,2)},"%w":_t=>_t.tm_wday,"%W":_t=>{var cn=_t.tm_yday+7-(_t.tm_wday+6)%7;return tn(Math.floor(cn/7),2)},"%y":_t=>(_t.tm_year+1900).toString().substring(2),"%Y":_t=>_t.tm_year+1900,"%z":_t=>{var cn=_t.tm_gmtoff,nr=cn>=0;return cn=Math.abs(cn)/60,cn=cn/60*100+cn%60,(nr?"+":"-")+("0000"+cn).slice(-4)},"%Z":_t=>_t.tm_zone,"%%":()=>"%"};ve=ve.replace(/%%/g,"\0\0");for(var ht in xs)ve.includes(ht)&&(ve=ve.replace(new RegExp(ht,"g"),xs[ht](Qe)));ve=ve.replace(/\0\0/g,"%");var Ks=Fc(ve,!1);return Ks.length>$?0:(Lw(Ks,U),Ks.length-1)}function Y2(U,$,oe,pe,Ue){return U>>>=0,$>>>=0,oe>>>=0,pe>>>=0,bw(U,$,oe,pe)}vt.init();var qd=function(U,$,oe,pe){U||(U=this),this.parent=U,this.mount=U.mount,this.mounted=null,this.id=Re.nextInode++,this.name=$,this.mode=oe,this.node_ops={},this.stream_ops={},this.rdev=pe},Q1=365,a3=146;Object.defineProperties(qd.prototype,{read:{get:function(){return(this.mode&Q1)===Q1},set:function(U){U?this.mode|=Q1:this.mode&=~Q1}},write:{get:function(){return(this.mode&a3)===a3},set:function(U){U?this.mode|=a3:this.mode&=~a3}},isFolder:{get:function(){return Re.isDir(this.mode)}},isDevice:{get:function(){return Re.isChrdev(this.mode)}}}),Re.FSNode=qd,Re.createPreloadedFile=Je,Re.staticInit(),KI=_.InternalError=class extends Error{constructor($){super($),this.name="InternalError"}},Od(),mu=_.BindingError=class extends Error{constructor($){super($),this.name="BindingError"}},i1(),Th(),Bd(),Fd=_.UnboundTypeError=p1(Error,"UnboundTypeError"),A1(),S1();var Cw=[null,Cn,xi,cl,x2,U2,B2,H2,F2,_2],u4={g:i3,Y:Ih,B:$I,fa:QI,r:Zl,K:ZI,da:JI,q:T1,p:yo,c:R1,ca:N1,D:O1,d:Oh,t:wo,l:b1,E:C1,y:vn,ga:M1,m:x1,s:U1,f:B1,ea:H1,T:He,R:G1,W:_1,X:Ph,ba:V1,k:W1,x:z1,b:jc,A:j1,i:k1,o:q1,G:zd,z:$c,F:Kc,ha:$1,h:Qc,v:jd,j:eu,n:kd,e:K1,I:Zc,J:De,Q:Xe,w:nt,C:st,U:ft,aa:Yt,u:an,V:Is,P:Ht,_:cl,$:x2,L:Qn,N:U2,Z:B2,O:H2,H:F2,S:_2,a:ot||_.wasmMemory,M:Y2};Ws();var o3=_._pthread_self=()=>(o3=_._pthread_self=yt.ja)(),c3=U=>(c3=yt.la)(U);_.__emscripten_tls_init=()=>(_.__emscripten_tls_init=yt.ma)();var z2=U=>(z2=yt.na)(U);_.__embind_initialize_bindings=()=>(_.__embind_initialize_bindings=yt.oa)();var j2=_.__emscripten_thread_init=(U,$,oe,pe,Ue,Qe)=>(j2=_.__emscripten_thread_init=yt.pa)(U,$,oe,pe,Ue,Qe);_.__emscripten_thread_crashed=()=>(_.__emscripten_thread_crashed=yt.qa)();var k2=(U,$,oe,pe)=>(k2=yt.ra)(U,$,oe,pe),Eo=U=>(Eo=yt.sa)(U),a4=U=>(a4=yt.ta)(U),o4=_.__emscripten_thread_exit=U=>(o4=_.__emscripten_thread_exit=yt.ua)(U),q2=_.__emscripten_check_mailbox=()=>(q2=_.__emscripten_check_mailbox=yt.va)(),$2=(U,$)=>($2=yt.wa)(U,$),K2=()=>(K2=yt.xa)(),c4=U=>(c4=yt.ya)(U),Q2=U=>(Q2=yt.za)(U),Z2=U=>(Z2=yt.Aa)(U);_.dynCall_jiji=(U,$,oe,pe,Ue)=>(_.dynCall_jiji=yt.Ba)(U,$,oe,pe,Ue),_.dynCall_viijii=(U,$,oe,pe,Ue,Qe,ve)=>(_.dynCall_viijii=yt.Ca)(U,$,oe,pe,Ue,Qe,ve),_.dynCall_iiiiij=(U,$,oe,pe,Ue,Qe,ve)=>(_.dynCall_iiiiij=yt.Da)(U,$,oe,pe,Ue,Qe,ve),_.dynCall_iiiiijj=(U,$,oe,pe,Ue,Qe,ve,tt,ht)=>(_.dynCall_iiiiijj=yt.Ea)(U,$,oe,pe,Ue,Qe,ve,tt,ht),_.dynCall_iiiiiijj=(U,$,oe,pe,Ue,Qe,ve,tt,ht,St)=>(_.dynCall_iiiiiijj=yt.Fa)(U,$,oe,pe,Ue,Qe,ve,tt,ht,St);function Pw(U){U=Object.assign({},U);var $=pe=>()=>pe()>>>0,oe=pe=>Ue=>pe(Ue)>>>0;return U.pthread_self=$(U.pthread_self),U.malloc=oe(U.malloc),U.__getTypeName=oe(U.__getTypeName),U.__errno_location=$(U.__errno_location),U.stackSave=$(U.stackSave),U.stackAlloc=oe(U.stackAlloc),U}_.keepRuntimeAlive=Ps,_.wasmMemory=ot,_.ExitStatus=nn,_.PThread=vt;var h3;Pn=function U(){h3||f3(),h3||(Pn=U)};function f3(){if(jt>0)return;if(Ee){ne(_),$e(),startWorker(_);return}if(fs(),jt>0)return;function U(){h3||(h3=!0,_.calledRun=!0,!Ct&&($e(),ne(_),_.onRuntimeInitialized&&_.onRuntimeInitialized(),ke()))}_.setStatus?(_.setStatus("Running..."),setTimeout(function(){setTimeout(function(){_.setStatus("")},1),U()},1)):U()}if(_.preInit)for(typeof _.preInit=="function"&&(_.preInit=[_.preInit]);_.preInit.length>0;)_.preInit.pop()();return f3(),u.ready}})();typeof e=="object"&&typeof s=="object"?s.exports=n:typeof define=="function"&&define.amd&&define([],()=>n)}}),xQ=XX({"dist/web-ifc.js"(e,s){var n=(()=>{var t=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return function(u={}){var o=u,f,d;o.ready=new Promise((V,Z)=>{f=V,d=Z});var m=Object.assign({},o),D="./this.program",P=!0,x="";function H(V){return o.locateFile?o.locateFile(V,x):x+V}var _,ne;typeof document<"u"&&document.currentScript&&(x=document.currentScript.src),t&&(x=t),x.indexOf("blob:")!==0?x=x.substr(0,x.replace(/[?#].*/,"").lastIndexOf("/")+1):x="",_=V=>{var Z=new XMLHttpRequest;return Z.open("GET",V,!1),Z.send(null),Z.responseText},ne=(V,Z,fe)=>{var De=new XMLHttpRequest;De.open("GET",V,!0),De.responseType="arraybuffer",De.onload=()=>{if(De.status==200||De.status==0&&De.response){Z(De.response);return}fe()},De.onerror=fe,De.send(null)};var re=o.print||console.log.bind(console),J=o.printErr||console.error.bind(console);Object.assign(o,m),m=null,o.arguments&&o.arguments,o.thisProgram&&(D=o.thisProgram),o.quit&&o.quit;var K;o.wasmBinary&&(K=o.wasmBinary),o.noExitRuntime,typeof WebAssembly!="object"&&Xt("no native wasm support detected");var Ie,ce,ae=!1;function me(V,Z){V||Xt(Z)}var Ee,Ae,Me,we,Te,je,Ke,lt;function Ze(){var V=Ie.buffer;o.HEAP8=Ee=new Int8Array(V),o.HEAP16=Me=new Int16Array(V),o.HEAP32=Te=new Int32Array(V),o.HEAPU8=Ae=new Uint8Array(V),o.HEAPU16=we=new Uint16Array(V),o.HEAPU32=je=new Uint32Array(V),o.HEAPF32=Ke=new Float32Array(V),o.HEAPF64=lt=new Float64Array(V)}var it,ot=[],yt=[],Rt=[];function Ct(){if(o.preRun)for(typeof o.preRun=="function"&&(o.preRun=[o.preRun]);o.preRun.length;)Ft(o.preRun.shift());gt(ot)}function Bt(){!o.noFSInit&&!He.init.initialized&&He.init(),He.ignorePermissions=!1,gt(yt)}function Ut(){if(o.postRun)for(typeof o.postRun=="function"&&(o.postRun=[o.postRun]);o.postRun.length;)Gt(o.postRun.shift());gt(Rt)}function Ft(V){ot.unshift(V)}function Nt(V){yt.unshift(V)}function Gt(V){Rt.unshift(V)}var en=0,Dn=null;function An(V){return V}function En(V){en++,o.monitorRunDependencies&&o.monitorRunDependencies(en)}function Gn(V){if(en--,o.monitorRunDependencies&&o.monitorRunDependencies(en),en==0&&Dn){var Z=Dn;Dn=null,Z()}}function Xt(V){o.onAbort&&o.onAbort(V),V="Aborted("+V+")",J(V),ae=!0,V+=". Build with -sASSERTIONS for more info.";var Z=new WebAssembly.RuntimeError(V);throw d(Z),Z}var qn="data:application/octet-stream;base64,";function Tt(V){return V.startsWith(qn)}var Gs;Gs="web-ifc.wasm",Tt(Gs)||(Gs=H(Gs));function Hn(V){if(V==Gs&&K)return new Uint8Array(K);throw"both async and sync fetching of the wasm failed"}function Wn(V){return!K&&P&&typeof fetch=="function"?fetch(V,{credentials:"same-origin"}).then(Z=>{if(!Z.ok)throw"failed to load wasm binary file at '"+V+"'";return Z.arrayBuffer()}).catch(()=>Hn(V)):Promise.resolve().then(()=>Hn(V))}function pn(V,Z,fe){return Wn(V).then(De=>WebAssembly.instantiate(De,Z)).then(De=>De).then(fe,De=>{J("failed to asynchronously prepare wasm: "+De),Xt(De)})}function Ps(V,Z,fe,De){return!V&&typeof WebAssembly.instantiateStreaming=="function"&&!Tt(Z)&&typeof fetch=="function"?fetch(Z,{credentials:"same-origin"}).then(Be=>{var Xe=WebAssembly.instantiateStreaming(Be,fe);return Xe.then(De,function(nt){return J("wasm streaming compile failed: "+nt),J("falling back to ArrayBuffer instantiation"),pn(Z,fe,De)})}):pn(Z,fe,De)}function fs(){var V={a:$1};function Z(De,Be){var Xe=De.exports;return Xe=K1(Xe),ce=Xe,Ie=ce.Z,Ze(),it=ce.$,Nt(ce._),Gn(),Xe}En();function fe(De){Z(De.instance)}if(o.instantiateWasm)try{return o.instantiateWasm(V,Z)}catch(De){J("Module.instantiateWasm callback failed with error: "+De),d(De)}return Ps(K,Gs,V,fe).catch(d),{}}var $e,ke,gt=V=>{for(;V.length>0;)V.shift()(o)};function Qt(V){this.excPtr=V,this.ptr=V-24,this.set_type=function(Z){je[this.ptr+4>>>2]=Z},this.get_type=function(){return je[this.ptr+4>>>2]},this.set_destructor=function(Z){je[this.ptr+8>>>2]=Z},this.get_destructor=function(){return je[this.ptr+8>>>2]},this.set_caught=function(Z){Z=Z?1:0,Ee[this.ptr+12>>>0]=Z},this.get_caught=function(){return Ee[this.ptr+12>>>0]!=0},this.set_rethrown=function(Z){Z=Z?1:0,Ee[this.ptr+13>>>0]=Z},this.get_rethrown=function(){return Ee[this.ptr+13>>>0]!=0},this.init=function(Z,fe){this.set_adjusted_ptr(0),this.set_type(Z),this.set_destructor(fe)},this.set_adjusted_ptr=function(Z){je[this.ptr+16>>>2]=Z},this.get_adjusted_ptr=function(){return je[this.ptr+16>>>2]},this.get_exception_ptr=function(){var Z=kd(this.get_type());if(Z)return je[this.excPtr>>>2];var fe=this.get_adjusted_ptr();return fe!==0?fe:this.excPtr}}var $t=0;function jt(V,Z){return Z+2097152>>>0<4194305-!!V?(V>>>0)+Z*4294967296:NaN}function Pn(V,Z,fe){V>>>=0,Z>>>=0,fe>>>=0;var De=new Qt(V);throw De.init(Z,fe),$t=V,$t}var dn={};function Tn(V){for(;V.length;){var Z=V.pop(),fe=V.pop();fe(Z)}}function _n(V){return this.fromWireType(Te[V>>>2])}var zn={},Wt={},Ms={},ss=void 0;function $n(V){throw new ss(V)}function Un(V,Z,fe){V.forEach(function(st){Ms[st]=Z});function De(st){var ft=fe(st);ft.length!==V.length&&$n("Mismatched type converter count");for(var mt=0;mt<V.length;++mt)On(V[mt],ft[mt])}var Be=new Array(Z.length),Xe=[],nt=0;Z.forEach((st,ft)=>{Wt.hasOwnProperty(st)?Be[ft]=Wt[st]:(Xe.push(st),zn.hasOwnProperty(st)||(zn[st]=[]),zn[st].push(()=>{Be[ft]=Wt[st],++nt,nt===Xe.length&&De(Be)}))}),Xe.length===0&&De(Be)}function gn(V){V>>>=0;var Z=dn[V];delete dn[V];var fe=Z.elements,De=fe.length,Be=fe.map(function(st){return st.getterReturnType}).concat(fe.map(function(st){return st.setterArgumentType})),Xe=Z.rawConstructor,nt=Z.rawDestructor;Un([V],Be,function(st){return fe.forEach((ft,mt)=>{var Yt=st[mt],an=ft.getter,Jt=ft.getterContext,Kt=st[mt+De],Ln=ft.setter,Is=ft.setterContext;ft.read=Ts=>Yt.fromWireType(an(Jt,Ts)),ft.write=(Ts,Ls)=>{var Ht=[];Ln(Is,Ts,Kt.toWireType(Ht,Ls)),Tn(Ht)}}),[{name:Z.name,fromWireType:function(ft){for(var mt=new Array(De),Yt=0;Yt<De;++Yt)mt[Yt]=fe[Yt].read(ft);return nt(ft),mt},toWireType:function(ft,mt){if(De!==mt.length)throw new TypeError(`Incorrect number of tuple elements for ${Z.name}: expected=${De}, actual=${mt.length}`);for(var Yt=Xe(),an=0;an<De;++an)fe[an].write(Yt,mt[an]);return ft!==null&&ft.push(nt,Yt),Yt},argPackAdvance:8,readValueFromPointer:_n,destructorFunction:nt}]})}var ls={},Ws=function(V){V>>>=0;var Z=ls[V];delete ls[V];var fe=Z.rawConstructor,De=Z.rawDestructor,Be=Z.fields,Xe=Be.map(nt=>nt.getterReturnType).concat(Be.map(nt=>nt.setterArgumentType));Un([V],Xe,nt=>{var st={};return Be.forEach((ft,mt)=>{var Yt=ft.fieldName,an=nt[mt],Jt=ft.getter,Kt=ft.getterContext,Ln=nt[mt+Be.length],Is=ft.setter,Ts=ft.setterContext;st[Yt]={read:Ls=>an.fromWireType(Jt(Kt,Ls)),write:(Ls,Ht)=>{var hn=[];Is(Ts,Ls,Ln.toWireType(hn,Ht)),Tn(hn)}}}),[{name:Z.name,fromWireType:function(ft){var mt={};for(var Yt in st)mt[Yt]=st[Yt].read(ft);return De(ft),mt},toWireType:function(ft,mt){for(var Yt in st)if(!(Yt in mt))throw new TypeError(`Missing field: "${Yt}"`);var an=fe();for(Yt in st)st[Yt].write(an,mt[Yt]);return ft!==null&&ft.push(De,an),an},argPackAdvance:8,readValueFromPointer:_n,destructorFunction:De}]})};function yn(V,Z,fe,De,Be){}function Sn(V){switch(V){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError(`Unknown type size: ${V}`)}}function nn(){for(var V=new Array(256),Z=0;Z<256;++Z)V[Z]=String.fromCharCode(Z);ct=V}var ct=void 0;function Zt(V){for(var Z="",fe=V;Ae[fe>>>0];)Z+=ct[Ae[fe++>>>0]];return Z}var rn=void 0;function un(V){throw new rn(V)}function jn(V,Z,fe={}){var De=Z.name;if(V||un(`type "${De}" must have a positive integer typeid pointer`),Wt.hasOwnProperty(V)){if(fe.ignoreDuplicateRegistrations)return;un(`Cannot register type '${De}' twice`)}if(Wt[V]=Z,delete Ms[V],zn.hasOwnProperty(V)){var Be=zn[V];delete zn[V],Be.forEach(Xe=>Xe())}}function On(V,Z,fe={}){if(!("argPackAdvance"in Z))throw new TypeError("registerType registeredInstance requires argPackAdvance");return jn(V,Z,fe)}function nl(V,Z,fe,De,Be){V>>>=0,Z>>>=0,fe>>>=0;var Xe=Sn(fe);Z=Zt(Z),On(V,{name:Z,fromWireType:function(nt){return!!nt},toWireType:function(nt,st){return st?De:Be},argPackAdvance:8,readValueFromPointer:function(nt){var st;if(fe===1)st=Ee;else if(fe===2)st=Me;else if(fe===4)st=Te;else throw new TypeError("Unknown boolean type size: "+Z);return this.fromWireType(st[nt>>>Xe])},destructorFunction:null})}function $l(V){if(!(this instanceof qs)||!(V instanceof qs))return!1;for(var Z=this.$$.ptrType.registeredClass,fe=this.$$.ptr,De=V.$$.ptrType.registeredClass,Be=V.$$.ptr;Z.baseClass;)fe=Z.upcast(fe),Z=Z.baseClass;for(;De.baseClass;)Be=De.upcast(Be),De=De.baseClass;return Z===De&&fe===Be}function yl(V){return{count:V.count,deleteScheduled:V.deleteScheduled,preservePointerOnDelete:V.preservePointerOnDelete,ptr:V.ptr,ptrType:V.ptrType,smartPtr:V.smartPtr,smartPtrType:V.smartPtrType}}function Ys(V){function Z(fe){return fe.$$.ptrType.registeredClass.name}un(Z(V)+" instance already deleted")}var Ol=!1;function $i(V){}function kI(V){V.smartPtr?V.smartPtrType.rawDestructor(V.smartPtr):V.ptrType.registeredClass.rawDestructor(V.ptr)}function l3(V){V.count.value-=1;var Z=V.count.value===0;Z&&kI(V)}function Fc(V,Z,fe){if(Z===fe)return V;if(fe.baseClass===void 0)return null;var De=Fc(V,Z,fe.baseClass);return De===null?null:fe.downcast(De)}var l4={};function Ha(){return Object.keys(It).length}function r4(){var V=[];for(var Z in It)It.hasOwnProperty(Z)&&V.push(It[Z]);return V}var Kn=[];function i4(){for(;Kn.length;){var V=Kn.pop();V.$$.deleteScheduled=!1,V.delete()}}var qI=void 0;function Nw(V){qI=V,Kn.length&&qI&&qI(i4)}function Je(){o.getInheritedInstanceCount=Ha,o.getLiveInheritedInstances=r4,o.flushPendingDeletes=i4,o.setDelayFunction=Nw}var It={};function Ot(V,Z){for(Z===void 0&&un("ptr should not be undefined");V.baseClass;)Z=V.upcast(Z),V=V.baseClass;return Z}function Re(V,Z){return Z=Ot(V,Z),It[Z]}function At(V,Z){(!Z.ptrType||!Z.ptr)&&$n("makeClassHandle requires ptr and ptrType");var fe=!!Z.smartPtrType,De=!!Z.smartPtr;return fe!==De&&$n("Both smartPtrType and smartPtr must be specified"),Z.count={value:1},Cn(Object.create(V,{$$:{value:Z}}))}function fn(V){var Z=this.getPointee(V);if(!Z)return this.destructor(V),null;var fe=Re(this.registeredClass,Z);if(fe!==void 0){if(fe.$$.count.value===0)return fe.$$.ptr=Z,fe.$$.smartPtr=V,fe.clone();var De=fe.clone();return this.destructor(V),De}function Be(){return this.isSmartPointer?At(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:Z,smartPtrType:this,smartPtr:V}):At(this.registeredClass.instancePrototype,{ptrType:this,ptr:V})}var Xe=this.registeredClass.getActualType(Z),nt=l4[Xe];if(!nt)return Be.call(this);var st;this.isConst?st=nt.constPointerType:st=nt.pointerType;var ft=Fc(Z,this.registeredClass,st.registeredClass);return ft===null?Be.call(this):this.isSmartPointer?At(st.registeredClass.instancePrototype,{ptrType:st,ptr:ft,smartPtrType:this,smartPtr:V}):At(st.registeredClass.instancePrototype,{ptrType:st,ptr:ft})}var Cn=function(V){return typeof FinalizationRegistry>"u"?(Cn=Z=>Z,V):(Ol=new FinalizationRegistry(Z=>{l3(Z.$$)}),Cn=Z=>{var fe=Z.$$,De=!!fe.smartPtr;if(De){var Be={$$:fe};Ol.register(Z,Be,Z)}return Z},$i=Z=>Ol.unregister(Z),Cn(V))};function kn(){if(this.$$.ptr||Ys(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var V=Cn(Object.create(Object.getPrototypeOf(this),{$$:{value:yl(this.$$)}}));return V.$$.count.value+=1,V.$$.deleteScheduled=!1,V}function Qn(){this.$$.ptr||Ys(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&un("Object already scheduled for deletion"),$i(this),l3(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)}function as(){return!this.$$.ptr}function vt(){return this.$$.ptr||Ys(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&un("Object already scheduled for deletion"),Kn.push(this),Kn.length===1&&qI&&qI(i4),this.$$.deleteScheduled=!0,this}function rs(){qs.prototype.isAliasOf=$l,qs.prototype.clone=kn,qs.prototype.delete=Qn,qs.prototype.isDeleted=as,qs.prototype.deleteLater=vt}function qs(){}var xi=48,Fl=57;function Ki(V){if(V===void 0)return"_unknown";V=V.replace(/[^a-zA-Z0-9_]/g,"$");var Z=V.charCodeAt(0);return Z>=xi&&Z<=Fl?`_${V}`:V}function al(V,Z){return V=Ki(V),{[V]:function(){return Z.apply(this,arguments)}}[V]}function ds(V,Z,fe){if(V[Z].overloadTable===void 0){var De=V[Z];V[Z]=function(){return V[Z].overloadTable.hasOwnProperty(arguments.length)||un(`Function '${fe}' called with an invalid number of arguments (${arguments.length}) - expects one of (${V[Z].overloadTable})!`),V[Z].overloadTable[arguments.length].apply(this,arguments)},V[Z].overloadTable=[],V[Z].overloadTable[De.argCount]=De}}function r3(V,Z,fe){o.hasOwnProperty(V)?((fe===void 0||o[V].overloadTable!==void 0&&o[V].overloadTable[fe]!==void 0)&&un(`Cannot register public name '${V}' twice`),ds(o,V,V),o.hasOwnProperty(fe)&&un(`Cannot register multiple overloads of a function with the same number of arguments (${fe})!`),o[V].overloadTable[fe]=Z):(o[V]=Z,fe!==void 0&&(o[V].numArguments=fe))}function ol(V,Z,fe,De,Be,Xe,nt,st){this.name=V,this.constructor=Z,this.instancePrototype=fe,this.rawDestructor=De,this.baseClass=Be,this.getActualType=Xe,this.upcast=nt,this.downcast=st,this.pureVirtualFunctions=[]}function Qi(V,Z,fe){for(;Z!==fe;)Z.upcast||un(`Expected null or instance of ${fe.name}, got an instance of ${Z.name}`),V=Z.upcast(V),Z=Z.baseClass;return V}function i3(V,Z){if(Z===null)return this.isReference&&un(`null is not a valid ${this.name}`),0;Z.$$||un(`Cannot pass "${Vc(Z)}" as a ${this.name}`),Z.$$.ptr||un(`Cannot pass deleted object as a pointer of type ${this.name}`);var fe=Z.$$.ptrType.registeredClass,De=Qi(Z.$$.ptr,fe,this.registeredClass);return De}function Ih(V,Z){var fe;if(Z===null)return this.isReference&&un(`null is not a valid ${this.name}`),this.isSmartPointer?(fe=this.rawConstructor(),V!==null&&V.push(this.rawDestructor,fe),fe):0;Z.$$||un(`Cannot pass "${Vc(Z)}" as a ${this.name}`),Z.$$.ptr||un(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&Z.$$.ptrType.isConst&&un(`Cannot convert argument of type ${Z.$$.smartPtrType?Z.$$.smartPtrType.name:Z.$$.ptrType.name} to parameter type ${this.name}`);var De=Z.$$.ptrType.registeredClass;if(fe=Qi(Z.$$.ptr,De,this.registeredClass),this.isSmartPointer)switch(Z.$$.smartPtr===void 0&&un("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:Z.$$.smartPtrType===this?fe=Z.$$.smartPtr:un(`Cannot convert argument of type ${Z.$$.smartPtrType?Z.$$.smartPtrType.name:Z.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:fe=Z.$$.smartPtr;break;case 2:if(Z.$$.smartPtrType===this)fe=Z.$$.smartPtr;else{var Be=Z.clone();fe=this.rawShare(fe,zs.toHandle(function(){Be.delete()})),V!==null&&V.push(this.rawDestructor,fe)}break;default:un("Unsupporting sharing policy")}return fe}function $I(V,Z){if(Z===null)return this.isReference&&un(`null is not a valid ${this.name}`),0;Z.$$||un(`Cannot pass "${Vc(Z)}" as a ${this.name}`),Z.$$.ptr||un(`Cannot pass deleted object as a pointer of type ${this.name}`),Z.$$.ptrType.isConst&&un(`Cannot convert argument of type ${Z.$$.ptrType.name} to parameter type ${this.name}`);var fe=Z.$$.ptrType.registeredClass,De=Qi(Z.$$.ptr,fe,this.registeredClass);return De}function Gl(V){return this.rawGetPointee&&(V=this.rawGetPointee(V)),V}function Tu(V){this.rawDestructor&&this.rawDestructor(V)}function Fa(V){V!==null&&V.delete()}function Kl(){Ql.prototype.getPointee=Gl,Ql.prototype.destructor=Tu,Ql.prototype.argPackAdvance=8,Ql.prototype.readValueFromPointer=_n,Ql.prototype.deleteObject=Fa,Ql.prototype.fromWireType=fn}function Ql(V,Z,fe,De,Be,Xe,nt,st,ft,mt,Yt){this.name=V,this.registeredClass=Z,this.isReference=fe,this.isConst=De,this.isSmartPointer=Be,this.pointeeType=Xe,this.sharingPolicy=nt,this.rawGetPointee=st,this.rawConstructor=ft,this.rawShare=mt,this.rawDestructor=Yt,!Be&&Z.baseClass===void 0?De?(this.toWireType=i3,this.destructorFunction=null):(this.toWireType=$I,this.destructorFunction=null):this.toWireType=Ih}function yh(V,Z,fe){o.hasOwnProperty(V)||$n("Replacing nonexistant public symbol"),o[V].overloadTable!==void 0&&fe!==void 0?o[V].overloadTable[fe]=Z:(o[V]=Z,o[V].argCount=fe)}var KI=(V,Z,fe)=>{var De=o["dynCall_"+V];return fe&&fe.length?De.apply(null,[Z].concat(fe)):De.call(null,Z)},wh=[],Zi=V=>{var Z=wh[V];return Z||(V>=wh.length&&(wh.length=V+1),wh[V]=Z=it.get(V)),Z},QI=(V,Z,fe)=>{if(V.includes("j"))return KI(V,Z,fe);var De=Zi(Z).apply(null,fe);return De},Gc=(V,Z)=>{var fe=[];return function(){return fe.length=0,Object.assign(fe,arguments),QI(V,Z,fe)}};function Zl(V,Z){V=Zt(V);function fe(){return V.includes("j")?Gc(V,Z):Zi(Z)}var De=fe();return typeof De!="function"&&un(`unknown function pointer with signature ${V}: ${Z}`),De}function ZI(V,Z){var fe=al(Z,function(De){this.name=Z,this.message=De;var Be=new Error(De).stack;Be!==void 0&&(this.stack=this.toString()+`
`+Be.replace(/^Error(:[^\n]*)?\n/,""))});return fe.prototype=Object.create(V.prototype),fe.prototype.constructor=fe,fe.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},fe}var _c=void 0;function Od(V){var Z=jd(V),fe=Zt(Z);return eu(Z),fe}function oo(V,Z){var fe=[],De={};function Be(Xe){if(!De[Xe]&&!Wt[Xe]){if(Ms[Xe]){Ms[Xe].forEach(Be);return}fe.push(Xe),De[Xe]=!0}}throw Z.forEach(Be),new _c(`${V}: `+fe.map(Od).join([", "]))}function _l(V,Z,fe,De,Be,Xe,nt,st,ft,mt,Yt,an,Jt){V>>>=0,Z>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0,nt>>>=0,st>>>=0,ft>>>=0,mt>>>=0,Yt>>>=0,an>>>=0,Jt>>>=0,Yt=Zt(Yt),Xe=Zl(Be,Xe),st&&(st=Zl(nt,st)),mt&&(mt=Zl(ft,mt)),Jt=Zl(an,Jt);var Kt=Ki(Yt);r3(Kt,function(){oo(`Cannot construct ${Yt} due to unbound types`,[De])}),Un([V,Z,fe],De?[De]:[],function(Ln){Ln=Ln[0];var Is,Ts;De?(Is=Ln.registeredClass,Ts=Is.instancePrototype):Ts=qs.prototype;var Ls=al(Kt,function(){if(Object.getPrototypeOf(this)!==Ht)throw new rn("Use 'new' to construct "+Yt);if(hn.constructor_body===void 0)throw new rn(Yt+" has no accessible constructor");var cl=hn.constructor_body[arguments.length];if(cl===void 0)throw new rn(`Tried to invoke ctor of ${Yt} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(hn.constructor_body).toString()}) parameters instead!`);return cl.apply(this,arguments)}),Ht=Object.create(Ts,{constructor:{value:Ls}});Ls.prototype=Ht;var hn=new ol(Yt,Ls,Ht,Jt,Is,Xe,st,mt);hn.baseClass&&(hn.baseClass.__derivedClasses===void 0&&(hn.baseClass.__derivedClasses=[]),hn.baseClass.__derivedClasses.push(hn));var Ll=new Ql(Yt,hn,!0,!1,!1),As=new Ql(Yt+"*",hn,!1,!1,!1),dr=new Ql(Yt+" const*",hn,!1,!0,!1);return l4[V]={pointerType:As,constPointerType:dr},yh(Kt,Ls),[Ll,As,dr]})}function mu(V,Z){for(var fe=[],De=0;De<V;De++)fe.push(je[Z+De*4>>>2]);return fe}function Rs(V,Z){if(!(V instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof V} which is not a function`);var fe=al(V.name||"unknownFunctionName",function(){});fe.prototype=V.prototype;var De=new fe,Be=V.apply(De,Z);return Be instanceof Object?Be:De}function Eh(V,Z,fe,De,Be,Xe){var nt=Z.length;nt<2&&un("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var st=Z[1]!==null&&fe!==null,ft=!1,mt=1;mt<Z.length;++mt)if(Z[mt]!==null&&Z[mt].destructorFunction===void 0){ft=!0;break}for(var Yt=Z[0].name!=="void",an="",Jt="",mt=0;mt<nt-2;++mt)an+=(mt!==0?", ":"")+"arg"+mt,Jt+=(mt!==0?", ":"")+"arg"+mt+"Wired";var Kt=`
        return function ${Ki(V)}(${an}) {
        if (arguments.length !== ${nt-2}) {
          throwBindingError('function ${V} called with ${arguments.length} arguments, expected ${nt-2} args!');
        }`;ft&&(Kt+=`var destructors = [];
`);var Ln=ft?"destructors":"null",Is=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],Ts=[un,De,Be,Tn,Z[0],Z[1]];st&&(Kt+="var thisWired = classParam.toWireType("+Ln+`, this);
`);for(var mt=0;mt<nt-2;++mt)Kt+="var arg"+mt+"Wired = argType"+mt+".toWireType("+Ln+", arg"+mt+"); // "+Z[mt+2].name+`
`,Is.push("argType"+mt),Ts.push(Z[mt+2]);if(st&&(Jt="thisWired"+(Jt.length>0?", ":"")+Jt),Kt+=(Yt||Xe?"var rv = ":"")+"invoker(fn"+(Jt.length>0?", ":"")+Jt+`);
`,ft)Kt+=`runDestructors(destructors);
`;else for(var mt=st?1:2;mt<Z.length;++mt){var Ls=mt===1?"thisWired":"arg"+(mt-2)+"Wired";Z[mt].destructorFunction!==null&&(Kt+=Ls+"_dtor("+Ls+"); // "+Z[mt].name+`
`,Is.push(Ls+"_dtor"),Ts.push(Z[mt].destructorFunction))}return Yt&&(Kt+=`var ret = retType.fromWireType(rv);
return ret;
`),Kt+=`}
`,Is.push(Kt),Rs(Function,Is).apply(null,Ts)}function Ji(V,Z,fe,De,Be,Xe){V>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0;var nt=mu(Z,fe);Be=Zl(De,Be),Un([],[V],function(st){st=st[0];var ft=`constructor ${st.name}`;if(st.registeredClass.constructor_body===void 0&&(st.registeredClass.constructor_body=[]),st.registeredClass.constructor_body[Z-1]!==void 0)throw new rn(`Cannot register multiple constructors with identical number of parameters (${Z-1}) for class '${st.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return st.registeredClass.constructor_body[Z-1]=()=>{oo(`Cannot construct ${st.name} due to unbound types`,nt)},Un([],nt,function(mt){return mt.splice(1,0,null),st.registeredClass.constructor_body[Z-1]=Eh(ft,mt,null,Be,Xe),[]}),[]})}function JI(V,Z,fe,De,Be,Xe,nt,st,ft){V>>>=0,Z>>>=0,De>>>=0,Be>>>=0,Xe>>>=0,nt>>>=0;var mt=mu(fe,De);Z=Zt(Z),Xe=Zl(Be,Xe),Un([],[V],function(Yt){Yt=Yt[0];var an=`${Yt.name}.${Z}`;Z.startsWith("@@")&&(Z=Symbol[Z.substring(2)]),st&&Yt.registeredClass.pureVirtualFunctions.push(Z);function Jt(){oo(`Cannot call ${an} due to unbound types`,mt)}var Kt=Yt.registeredClass.instancePrototype,Ln=Kt[Z];return Ln===void 0||Ln.overloadTable===void 0&&Ln.className!==Yt.name&&Ln.argCount===fe-2?(Jt.argCount=fe-2,Jt.className=Yt.name,Kt[Z]=Jt):(ds(Kt,Z,an),Kt[Z].overloadTable[fe-2]=Jt),Un([],mt,function(Is){var Ts=Eh(an,Is,Yt,Xe,nt,ft);return Kt[Z].overloadTable===void 0?(Ts.argCount=fe-2,Kt[Z]=Ts):Kt[Z].overloadTable[fe-2]=Ts,[]}),[]})}function XI(){Object.assign(Ld.prototype,{get(V){return this.allocated[V]},has(V){return this.allocated[V]!==void 0},allocate(V){var Z=this.freelist.pop()||this.allocated.length;return this.allocated[Z]=V,Z},free(V){this.allocated[V]=void 0,this.freelist.push(V)}})}function Ld(){this.allocated=[void 0],this.freelist=[]}var tr=new Ld;function co(V){V>>>=0,V>=tr.reserved&&--tr.get(V).refcount===0&&tr.free(V)}function bd(){for(var V=0,Z=tr.reserved;Z<tr.allocated.length;++Z)tr.allocated[Z]!==void 0&&++V;return V}function vI(){tr.allocated.push({value:void 0},{value:null},{value:!0},{value:!1}),tr.reserved=tr.allocated.length,o.count_emval_handles=bd}var zs={toValue:V=>(V||un("Cannot use deleted val. handle = "+V),tr.get(V).value),toHandle:V=>{switch(V){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return tr.allocate({refcount:1,value:V})}}};function Cd(V,Z){V>>>=0,Z>>>=0,Z=Zt(Z),On(V,{name:Z,fromWireType:function(fe){var De=zs.toValue(fe);return co(fe),De},toWireType:function(fe,De){return zs.toHandle(De)},argPackAdvance:8,readValueFromPointer:_n,destructorFunction:null})}function Vc(V){if(V===null)return"null";var Z=typeof V;return Z==="object"||Z==="array"||Z==="function"?V.toString():""+V}function e1(V,Z){switch(Z){case 2:return function(fe){return this.fromWireType(Ke[fe>>>2])};case 3:return function(fe){return this.fromWireType(lt[fe>>>3])};default:throw new TypeError("Unknown float type: "+V)}}function t1(V,Z,fe){V>>>=0,Z>>>=0,fe>>>=0;var De=Sn(fe);Z=Zt(Z),On(V,{name:Z,fromWireType:function(Be){return Be},toWireType:function(Be,Xe){return Xe},argPackAdvance:8,readValueFromPointer:e1(Z,De),destructorFunction:null})}function ho(V,Z,fe,De,Be,Xe,nt){V>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0;var st=mu(Z,fe);V=Zt(V),Be=Zl(De,Be),r3(V,function(){oo(`Cannot call ${V} due to unbound types`,st)},Z-1),Un([],st,function(ft){var mt=[ft[0],null].concat(ft.slice(1));return yh(V,Eh(V,mt,null,Be,Xe,nt),Z-1),[]})}function ph(V,Z,fe){switch(Z){case 0:return fe?function(Be){return Ee[Be>>>0]}:function(Be){return Ae[Be>>>0]};case 1:return fe?function(Be){return Me[Be>>>1]}:function(Be){return we[Be>>>1]};case 2:return fe?function(Be){return Te[Be>>>2]}:function(Be){return je[Be>>>2]};default:throw new TypeError("Unknown integer type: "+V)}}function fo(V,Z,fe,De,Be){V>>>=0,Z>>>=0,fe>>>=0,Z=Zt(Z);var Xe=Sn(fe),nt=an=>an;if(De===0){var st=32-8*fe;nt=an=>an<<st>>>st}var ft=Z.includes("unsigned"),mt=(an,Jt)=>{},Yt;ft?Yt=function(an,Jt){return mt(Jt,this.name),Jt>>>0}:Yt=function(an,Jt){return mt(Jt,this.name),Jt},On(V,{name:Z,fromWireType:nt,toWireType:Yt,argPackAdvance:8,readValueFromPointer:ph(Z,Xe,De!==0),destructorFunction:null})}function n1(V,Z,fe){V>>>=0,fe>>>=0;var De=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],Be=De[Z];function Xe(nt){nt=nt>>2;var st=je,ft=st[nt>>>0],mt=st[nt+1>>>0];return new Be(st.buffer,mt,ft)}fe=Zt(fe),On(V,{name:fe,fromWireType:Xe,argPackAdvance:8,readValueFromPointer:Xe},{ignoreDuplicateRegistrations:!0})}var Th=(V,Z,fe,De)=>{if(fe>>>=0,!(De>0))return 0;for(var Be=fe,Xe=fe+De-1,nt=0;nt<V.length;++nt){var st=V.charCodeAt(nt);if(st>=55296&&st<=57343){var ft=V.charCodeAt(++nt);st=65536+((st&1023)<<10)|ft&1023}if(st<=127){if(fe>=Xe)break;Z[fe++>>>0]=st}else if(st<=2047){if(fe+1>=Xe)break;Z[fe++>>>0]=192|st>>6,Z[fe++>>>0]=128|st&63}else if(st<=65535){if(fe+2>=Xe)break;Z[fe++>>>0]=224|st>>12,Z[fe++>>>0]=128|st>>6&63,Z[fe++>>>0]=128|st&63}else{if(fe+3>=Xe)break;Z[fe++>>>0]=240|st>>18,Z[fe++>>>0]=128|st>>12&63,Z[fe++>>>0]=128|st>>6&63,Z[fe++>>>0]=128|st&63}}return Z[fe>>>0]=0,fe-Be},Ga=(V,Z,fe)=>Th(V,Ae,Z,fe),Wc=V=>{for(var Z=0,fe=0;fe<V.length;++fe){var De=V.charCodeAt(fe);De<=127?Z++:De<=2047?Z+=2:De>=55296&&De<=57343?(Z+=4,++fe):Z+=3}return Z},Pd=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Xi=(V,Z,fe)=>{Z>>>=0;for(var De=Z+fe,Be=Z;V[Be]&&!(Be>=De);)++Be;if(Be-Z>16&&V.buffer&&Pd)return Pd.decode(V.subarray(Z,Be));for(var Xe="";Z<Be;){var nt=V[Z++];if(!(nt&128)){Xe+=String.fromCharCode(nt);continue}var st=V[Z++]&63;if((nt&224)==192){Xe+=String.fromCharCode((nt&31)<<6|st);continue}var ft=V[Z++]&63;if((nt&240)==224?nt=(nt&15)<<12|st<<6|ft:nt=(nt&7)<<18|st<<12|ft<<6|V[Z++]&63,nt<65536)Xe+=String.fromCharCode(nt);else{var mt=nt-65536;Xe+=String.fromCharCode(55296|mt>>10,56320|mt&1023)}}return Xe},Yc=(V,Z)=>(V>>>=0,V?Xi(Ae,V,Z):"");function Io(V,Z){V>>>=0,Z>>>=0,Z=Zt(Z);var fe=Z==="std::string";On(V,{name:Z,fromWireType:function(De){var Be=je[De>>>2],Xe=De+4,nt;if(fe)for(var st=Xe,ft=0;ft<=Be;++ft){var mt=Xe+ft;if(ft==Be||Ae[mt>>>0]==0){var Yt=mt-st,an=Yc(st,Yt);nt===void 0?nt=an:(nt+="\0",nt+=an),st=mt+1}}else{for(var Jt=new Array(Be),ft=0;ft<Be;++ft)Jt[ft]=String.fromCharCode(Ae[Xe+ft>>>0]);nt=Jt.join("")}return eu(De),nt},toWireType:function(De,Be){Be instanceof ArrayBuffer&&(Be=new Uint8Array(Be));var Xe,nt=typeof Be=="string";nt||Be instanceof Uint8Array||Be instanceof Uint8ClampedArray||Be instanceof Int8Array||un("Cannot pass non-string to std::string"),fe&&nt?Xe=Wc(Be):Xe=Be.length;var st=Qc(4+Xe+1),ft=st+4;if(je[st>>>2]=Xe,fe&&nt)Ga(Be,ft,Xe+1);else if(nt)for(var mt=0;mt<Xe;++mt){var Yt=Be.charCodeAt(mt);Yt>255&&(eu(ft),un("String has UTF-16 code units that do not fit in 8 bits")),Ae[ft+mt>>>0]=Yt}else for(var mt=0;mt<Xe;++mt)Ae[ft+mt>>>0]=Be[mt];return De!==null&&De.push(eu,st),st},argPackAdvance:8,readValueFromPointer:_n,destructorFunction:function(De){eu(De)}})}var Md=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,s1=(V,Z)=>{for(var fe=V,De=fe>>1,Be=De+Z/2;!(De>=Be)&&we[De>>>0];)++De;if(fe=De<<1,fe-V>32&&Md)return Md.decode(Ae.subarray(V>>>0,fe>>>0));for(var Xe="",nt=0;!(nt>=Z/2);++nt){var st=Me[V+nt*2>>>1];if(st==0)break;Xe+=String.fromCharCode(st)}return Xe},l1=(V,Z,fe)=>{if(fe===void 0&&(fe=2147483647),fe<2)return 0;fe-=2;for(var De=Z,Be=fe<V.length*2?fe/2:V.length,Xe=0;Xe<Be;++Xe){var nt=V.charCodeAt(Xe);Me[Z>>>1]=nt,Z+=2}return Me[Z>>>1]=0,Z-De},r1=V=>V.length*2,i1=(V,Z)=>{for(var fe=0,De="";!(fe>=Z/4);){var Be=Te[V+fe*4>>>2];if(Be==0)break;if(++fe,Be>=65536){var Xe=Be-65536;De+=String.fromCharCode(55296|Xe>>10,56320|Xe&1023)}else De+=String.fromCharCode(Be)}return De},Ru=(V,Z,fe)=>{if(Z>>>=0,fe===void 0&&(fe=2147483647),fe<4)return 0;for(var De=Z,Be=De+fe-4,Xe=0;Xe<V.length;++Xe){var nt=V.charCodeAt(Xe);if(nt>=55296&&nt<=57343){var st=V.charCodeAt(++Xe);nt=65536+((nt&1023)<<10)|st&1023}if(Te[Z>>>2]=nt,Z+=4,Z+4>Be)break}return Te[Z>>>2]=0,Z-De},u1=V=>{for(var Z=0,fe=0;fe<V.length;++fe){var De=V.charCodeAt(fe);De>=55296&&De<=57343&&++fe,Z+=4}return Z},a1=function(V,Z,fe){V>>>=0,Z>>>=0,fe>>>=0,fe=Zt(fe);var De,Be,Xe,nt,st;Z===2?(De=s1,Be=l1,nt=r1,Xe=()=>we,st=1):Z===4&&(De=i1,Be=Ru,nt=u1,Xe=()=>je,st=2),On(V,{name:fe,fromWireType:function(ft){for(var mt=je[ft>>>2],Yt=Xe(),an,Jt=ft+4,Kt=0;Kt<=mt;++Kt){var Ln=ft+4+Kt*Z;if(Kt==mt||Yt[Ln>>>st]==0){var Is=Ln-Jt,Ts=De(Jt,Is);an===void 0?an=Ts:(an+="\0",an+=Ts),Jt=Ln+Z}}return eu(ft),an},toWireType:function(ft,mt){typeof mt!="string"&&un(`Cannot pass non-string to C++ string type ${fe}`);var Yt=nt(mt),an=Qc(4+Yt+Z);return je[an>>>2]=Yt>>st,Be(mt,an+4,Yt+Z),ft!==null&&ft.push(eu,an),an},argPackAdvance:8,readValueFromPointer:_n,destructorFunction:function(ft){eu(ft)}})};function mh(V,Z,fe,De,Be,Xe){V>>>=0,Z>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0,dn[V]={name:Zt(Z),rawConstructor:Zl(fe,De),rawDestructor:Zl(Be,Xe),elements:[]}}function Rh(V,Z,fe,De,Be,Xe,nt,st,ft){V>>>=0,Z>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0,nt>>>=0,st>>>=0,ft>>>=0,dn[V].elements.push({getterReturnType:Z,getter:Zl(fe,De),getterContext:Be,setterArgumentType:Xe,setter:Zl(nt,st),setterContext:ft})}function xd(V,Z,fe,De,Be,Xe){V>>>=0,Z>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0,ls[V]={name:Zt(Z),rawConstructor:Zl(fe,De),rawDestructor:Zl(Be,Xe),fields:[]}}function Ud(V,Z,fe,De,Be,Xe,nt,st,ft,mt){V>>>=0,Z>>>=0,fe>>>=0,De>>>=0,Be>>>=0,Xe>>>=0,nt>>>=0,st>>>=0,ft>>>=0,mt>>>=0,ls[V].fields.push({fieldName:Zt(Z),getterReturnType:fe,getter:Zl(De,Be),getterContext:Xe,setterArgumentType:nt,setter:Zl(st,ft),setterContext:mt})}function o1(V,Z){V>>>=0,Z>>>=0,Z=Zt(Z),On(V,{isVoid:!0,name:Z,argPackAdvance:0,fromWireType:function(){},toWireType:function(fe,De){}})}var Ah=!0,c1=()=>Ah;function Dh(V,Z){var fe=Wt[V];return fe===void 0&&un(Z+" has unknown type "+Od(V)),fe}function h1(V,Z,fe){V>>>=0,Z>>>=0,fe>>>=0,V=zs.toValue(V),Z=Dh(Z,"emval::as");var De=[],Be=zs.toHandle(De);return je[fe>>>2]=Be,Z.toWireType(De,V)}function f1(V,Z){for(var fe=new Array(V),De=0;De<V;++De)fe[De]=Dh(je[Z+De*4>>>2],"parameter "+De);return fe}function d1(V,Z,fe,De){V>>>=0,fe>>>=0,De>>>=0,V=zs.toValue(V);for(var Be=f1(Z,fe),Xe=new Array(Z),nt=0;nt<Z;++nt){var st=Be[nt];Xe[nt]=st.readValueFromPointer(De),De+=st.argPackAdvance}var ft=V.apply(void 0,Xe);return zs.toHandle(ft)}var I1={};function Bd(V){var Z=I1[V];return Z===void 0?Zt(V):Z}function Ui(){return typeof globalThis=="object"?globalThis:function(){return Function}()("return this")()}function Hd(V){return V>>>=0,V===0?zs.toHandle(Ui()):(V=Bd(V),zs.toHandle(Ui()[V]))}function y1(V,Z){return V>>>=0,Z>>>=0,V=zs.toValue(V),Z=zs.toValue(Z),zs.toHandle(V[Z])}function w1(V){V>>>=0,V>4&&(tr.get(V).refcount+=1)}function E1(V,Z){return V>>>=0,Z>>>=0,V=zs.toValue(V),Z=zs.toValue(Z),V instanceof Z}function Jl(V){return V>>>=0,V=zs.toValue(V),typeof V=="number"}function p1(V){return V>>>=0,V=zs.toValue(V),typeof V=="string"}function Fd(){return zs.toHandle([])}function Gd(V){return V>>>=0,zs.toHandle(Bd(V))}function zc(){return zs.toHandle({})}function T1(V){V>>>=0;var Z=zs.toValue(V);Tn(Z),co(V)}function Sh(V,Z,fe){V>>>=0,Z>>>=0,fe>>>=0,V=zs.toValue(V),Z=zs.toValue(Z),fe=zs.toValue(fe),V[Z]=fe}function m1(V,Z){V>>>=0,Z>>>=0,V=Dh(V,"_emval_take_value");var fe=V.readValueFromPointer(Z);return zs.toHandle(fe)}function Nh(V,Z,fe){var De=jt(V,Z);fe>>>=0;var Be=new Date(De*1e3);Te[fe>>>2]=Be.getUTCSeconds(),Te[fe+4>>>2]=Be.getUTCMinutes(),Te[fe+8>>>2]=Be.getUTCHours(),Te[fe+12>>>2]=Be.getUTCDate(),Te[fe+16>>>2]=Be.getUTCMonth(),Te[fe+20>>>2]=Be.getUTCFullYear()-1900,Te[fe+24>>>2]=Be.getUTCDay();var Xe=Date.UTC(Be.getUTCFullYear(),0,1,0,0,0,0),nt=(Be.getTime()-Xe)/(1e3*60*60*24)|0;Te[fe+28>>>2]=nt}var yo=V=>V%4===0&&(V%100!==0||V%400===0),R1=[0,31,60,91,121,152,182,213,244,274,305,335],A1=[0,31,59,90,120,151,181,212,243,273,304,334],_d=V=>{var Z=yo(V.getFullYear()),fe=Z?R1:A1,De=fe[V.getMonth()]+V.getDate()-1;return De};function fr(V,Z,fe){var De=jt(V,Z);fe>>>=0;var Be=new Date(De*1e3);Te[fe>>>2]=Be.getSeconds(),Te[fe+4>>>2]=Be.getMinutes(),Te[fe+8>>>2]=Be.getHours(),Te[fe+12>>>2]=Be.getDate(),Te[fe+16>>>2]=Be.getMonth(),Te[fe+20>>>2]=Be.getFullYear()-1900,Te[fe+24>>>2]=Be.getDay();var Xe=_d(Be)|0;Te[fe+28>>>2]=Xe,Te[fe+36>>>2]=-(Be.getTimezoneOffset()*60);var nt=new Date(Be.getFullYear(),0,1),st=new Date(Be.getFullYear(),6,1).getTimezoneOffset(),ft=nt.getTimezoneOffset(),mt=(st!=ft&&Be.getTimezoneOffset()==Math.min(ft,st))|0;Te[fe+32>>>2]=mt}var jc=V=>{var Z=Wc(V)+1,fe=Qc(Z);return fe&&Ga(V,fe,Z),fe};function D1(V,Z,fe){V>>>=0,Z>>>=0,fe>>>=0;var De=new Date().getFullYear(),Be=new Date(De,0,1),Xe=new Date(De,6,1),nt=Be.getTimezoneOffset(),st=Xe.getTimezoneOffset(),ft=Math.max(nt,st);je[V>>>2]=ft*60,Te[Z>>>2]=+(nt!=st);function mt(Ln){var Is=Ln.toTimeString().match(/\(([A-Za-z ]+)\)$/);return Is?Is[1]:"GMT"}var Yt=mt(Be),an=mt(Xe),Jt=jc(Yt),Kt=jc(an);st<nt?(je[fe>>>2]=Jt,je[fe+4>>>2]=Kt):(je[fe>>>2]=Kt,je[fe+4>>>2]=Jt)}var S1=()=>{Xt("")};function $s(){return Date.now()}function N1(V,Z,fe){return V>>>=0,Z>>>=0,fe>>>=0,Ae.copyWithin(V>>>0,Z>>>0,Z+fe>>>0)}var gh=()=>4294901760,g1=V=>{var Z=Ie.buffer,fe=V-Z.byteLength+65535>>>16;try{return Ie.grow(fe),Ze(),1}catch{}};function O1(V){V>>>=0;var Z=Ae.length,fe=gh();if(V>fe)return!1;for(var De=(ft,mt)=>ft+(mt-ft%mt)%mt,Be=1;Be<=4;Be*=2){var Xe=Z*(1+.2/Be);Xe=Math.min(Xe,V+100663296);var nt=Math.min(fe,De(Math.max(V,Xe),65536)),st=g1(nt);if(st)return!0}return!1}var Oh={},L1=()=>D||"./this.program",wo=()=>{if(!wo.strings){var V=(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",Z={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:V,_:L1()};for(var fe in Oh)Oh[fe]===void 0?delete Z[fe]:Z[fe]=Oh[fe];var De=[];for(var fe in Z)De.push(`${fe}=${Z[fe]}`);wo.strings=De}return wo.strings},b1=(V,Z)=>{for(var fe=0;fe<V.length;++fe)Ee[Z++>>>0]=V.charCodeAt(fe);Ee[Z>>>0]=0},Os={isAbs:V=>V.charAt(0)==="/",splitPath:V=>{var Z=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return Z.exec(V).slice(1)},normalizeArray:(V,Z)=>{for(var fe=0,De=V.length-1;De>=0;De--){var Be=V[De];Be==="."?V.splice(De,1):Be===".."?(V.splice(De,1),fe++):fe&&(V.splice(De,1),fe--)}if(Z)for(;fe;fe--)V.unshift("..");return V},normalize:V=>{var Z=Os.isAbs(V),fe=V.substr(-1)==="/";return V=Os.normalizeArray(V.split("/").filter(De=>!!De),!Z).join("/"),!V&&!Z&&(V="."),V&&fe&&(V+="/"),(Z?"/":"")+V},dirname:V=>{var Z=Os.splitPath(V),fe=Z[0],De=Z[1];return!fe&&!De?".":(De&&(De=De.substr(0,De.length-1)),fe+De)},basename:V=>{if(V==="/")return"/";V=Os.normalize(V),V=V.replace(/\/$/,"");var Z=V.lastIndexOf("/");return Z===-1?V:V.substr(Z+1)},join:function(){var V=Array.prototype.slice.call(arguments);return Os.normalize(V.join("/"))},join2:(V,Z)=>Os.normalize(V+"/"+Z)},C1=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return V=>crypto.getRandomValues(V);Xt("initRandomDevice")},Lh=V=>(Lh=C1())(V),vi={resolve:function(){for(var V="",Z=!1,fe=arguments.length-1;fe>=-1&&!Z;fe--){var De=fe>=0?arguments[fe]:He.cwd();if(typeof De!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!De)return"";V=De+"/"+V,Z=Os.isAbs(De)}return V=Os.normalizeArray(V.split("/").filter(Be=>!!Be),!Z).join("/"),(Z?"/":"")+V||"."},relative:(V,Z)=>{V=vi.resolve(V).substr(1),Z=vi.resolve(Z).substr(1);function fe(mt){for(var Yt=0;Yt<mt.length&&mt[Yt]==="";Yt++);for(var an=mt.length-1;an>=0&&mt[an]==="";an--);return Yt>an?[]:mt.slice(Yt,an-Yt+1)}for(var De=fe(V.split("/")),Be=fe(Z.split("/")),Xe=Math.min(De.length,Be.length),nt=Xe,st=0;st<Xe;st++)if(De[st]!==Be[st]){nt=st;break}for(var ft=[],st=nt;st<De.length;st++)ft.push("..");return ft=ft.concat(Be.slice(nt)),ft.join("/")}},bh=[];function kc(V,Z,fe){var De=Wc(V)+1,Be=new Array(De),Xe=Th(V,Be,0,Be.length);return Z&&(Be.length=Xe),Be}var P1=()=>{if(!bh.length){var V=null;if(typeof window<"u"&&typeof window.prompt=="function"?(V=window.prompt("Input: "),V!==null&&(V+=`
`)):typeof readline=="function"&&(V=readline(),V!==null&&(V+=`
`)),!V)return null;bh=kc(V,!0)}return bh.shift()},pa={ttys:[],init:function(){},shutdown:function(){},register:function(V,Z){pa.ttys[V]={input:[],output:[],ops:Z},He.registerDevice(V,pa.stream_ops)},stream_ops:{open:function(V){var Z=pa.ttys[V.node.rdev];if(!Z)throw new He.ErrnoError(43);V.tty=Z,V.seekable=!1},close:function(V){V.tty.ops.fsync(V.tty)},fsync:function(V){V.tty.ops.fsync(V.tty)},read:function(V,Z,fe,De,Be){if(!V.tty||!V.tty.ops.get_char)throw new He.ErrnoError(60);for(var Xe=0,nt=0;nt<De;nt++){var st;try{st=V.tty.ops.get_char(V.tty)}catch{throw new He.ErrnoError(29)}if(st===void 0&&Xe===0)throw new He.ErrnoError(6);if(st==null)break;Xe++,Z[fe+nt]=st}return Xe&&(V.node.timestamp=Date.now()),Xe},write:function(V,Z,fe,De,Be){if(!V.tty||!V.tty.ops.put_char)throw new He.ErrnoError(60);try{for(var Xe=0;Xe<De;Xe++)V.tty.ops.put_char(V.tty,Z[fe+Xe])}catch{throw new He.ErrnoError(29)}return De&&(V.node.timestamp=Date.now()),Xe}},default_tty_ops:{get_char:function(V){return P1()},put_char:function(V,Z){Z===null||Z===10?(re(Xi(V.output,0)),V.output=[]):Z!=0&&V.output.push(Z)},fsync:function(V){V.output&&V.output.length>0&&(re(Xi(V.output,0)),V.output=[])},ioctl_tcgets:function(V){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets:function(V,Z,fe){return 0},ioctl_tiocgwinsz:function(V){return[24,80]}},default_tty1_ops:{put_char:function(V,Z){Z===null||Z===10?(J(Xi(V.output,0)),V.output=[]):Z!=0&&V.output.push(Z)},fsync:function(V){V.output&&V.output.length>0&&(J(Xi(V.output,0)),V.output=[])}}},Vd=V=>{Xt()},vn={ops_table:null,mount(V){return vn.createNode(null,"/",16895,0)},createNode(V,Z,fe,De){if(He.isBlkdev(fe)||He.isFIFO(fe))throw new He.ErrnoError(63);vn.ops_table||(vn.ops_table={dir:{node:{getattr:vn.node_ops.getattr,setattr:vn.node_ops.setattr,lookup:vn.node_ops.lookup,mknod:vn.node_ops.mknod,rename:vn.node_ops.rename,unlink:vn.node_ops.unlink,rmdir:vn.node_ops.rmdir,readdir:vn.node_ops.readdir,symlink:vn.node_ops.symlink},stream:{llseek:vn.stream_ops.llseek}},file:{node:{getattr:vn.node_ops.getattr,setattr:vn.node_ops.setattr},stream:{llseek:vn.stream_ops.llseek,read:vn.stream_ops.read,write:vn.stream_ops.write,allocate:vn.stream_ops.allocate,mmap:vn.stream_ops.mmap,msync:vn.stream_ops.msync}},link:{node:{getattr:vn.node_ops.getattr,setattr:vn.node_ops.setattr,readlink:vn.node_ops.readlink},stream:{}},chrdev:{node:{getattr:vn.node_ops.getattr,setattr:vn.node_ops.setattr},stream:He.chrdev_stream_ops}});var Be=He.createNode(V,Z,fe,De);return He.isDir(Be.mode)?(Be.node_ops=vn.ops_table.dir.node,Be.stream_ops=vn.ops_table.dir.stream,Be.contents={}):He.isFile(Be.mode)?(Be.node_ops=vn.ops_table.file.node,Be.stream_ops=vn.ops_table.file.stream,Be.usedBytes=0,Be.contents=null):He.isLink(Be.mode)?(Be.node_ops=vn.ops_table.link.node,Be.stream_ops=vn.ops_table.link.stream):He.isChrdev(Be.mode)&&(Be.node_ops=vn.ops_table.chrdev.node,Be.stream_ops=vn.ops_table.chrdev.stream),Be.timestamp=Date.now(),V&&(V.contents[Z]=Be,V.timestamp=Be.timestamp),Be},getFileDataAsTypedArray(V){return V.contents?V.contents.subarray?V.contents.subarray(0,V.usedBytes):new Uint8Array(V.contents):new Uint8Array(0)},expandFileStorage(V,Z){var fe=V.contents?V.contents.length:0;if(!(fe>=Z)){var De=1024*1024;Z=Math.max(Z,fe*(fe<De?2:1.125)>>>0),fe!=0&&(Z=Math.max(Z,256));var Be=V.contents;V.contents=new Uint8Array(Z),V.usedBytes>0&&V.contents.set(Be.subarray(0,V.usedBytes),0)}},resizeFileStorage(V,Z){if(V.usedBytes!=Z)if(Z==0)V.contents=null,V.usedBytes=0;else{var fe=V.contents;V.contents=new Uint8Array(Z),fe&&V.contents.set(fe.subarray(0,Math.min(Z,V.usedBytes))),V.usedBytes=Z}},node_ops:{getattr(V){var Z={};return Z.dev=He.isChrdev(V.mode)?V.id:1,Z.ino=V.id,Z.mode=V.mode,Z.nlink=1,Z.uid=0,Z.gid=0,Z.rdev=V.rdev,He.isDir(V.mode)?Z.size=4096:He.isFile(V.mode)?Z.size=V.usedBytes:He.isLink(V.mode)?Z.size=V.link.length:Z.size=0,Z.atime=new Date(V.timestamp),Z.mtime=new Date(V.timestamp),Z.ctime=new Date(V.timestamp),Z.blksize=4096,Z.blocks=Math.ceil(Z.size/Z.blksize),Z},setattr(V,Z){Z.mode!==void 0&&(V.mode=Z.mode),Z.timestamp!==void 0&&(V.timestamp=Z.timestamp),Z.size!==void 0&&vn.resizeFileStorage(V,Z.size)},lookup(V,Z){throw He.genericErrors[44]},mknod(V,Z,fe,De){return vn.createNode(V,Z,fe,De)},rename(V,Z,fe){if(He.isDir(V.mode)){var De;try{De=He.lookupNode(Z,fe)}catch{}if(De)for(var Be in De.contents)throw new He.ErrnoError(55)}delete V.parent.contents[V.name],V.parent.timestamp=Date.now(),V.name=fe,Z.contents[fe]=V,Z.timestamp=V.parent.timestamp,V.parent=Z},unlink(V,Z){delete V.contents[Z],V.timestamp=Date.now()},rmdir(V,Z){var fe=He.lookupNode(V,Z);for(var De in fe.contents)throw new He.ErrnoError(55);delete V.contents[Z],V.timestamp=Date.now()},readdir(V){var Z=[".",".."];for(var fe in V.contents)V.contents.hasOwnProperty(fe)&&Z.push(fe);return Z},symlink(V,Z,fe){var De=vn.createNode(V,Z,41471,0);return De.link=fe,De},readlink(V){if(!He.isLink(V.mode))throw new He.ErrnoError(28);return V.link}},stream_ops:{read(V,Z,fe,De,Be){var Xe=V.node.contents;if(Be>=V.node.usedBytes)return 0;var nt=Math.min(V.node.usedBytes-Be,De);if(nt>8&&Xe.subarray)Z.set(Xe.subarray(Be,Be+nt),fe);else for(var st=0;st<nt;st++)Z[fe+st]=Xe[Be+st];return nt},write(V,Z,fe,De,Be,Xe){if(Z.buffer===Ee.buffer&&(Xe=!1),!De)return 0;var nt=V.node;if(nt.timestamp=Date.now(),Z.subarray&&(!nt.contents||nt.contents.subarray)){if(Xe)return nt.contents=Z.subarray(fe,fe+De),nt.usedBytes=De,De;if(nt.usedBytes===0&&Be===0)return nt.contents=Z.slice(fe,fe+De),nt.usedBytes=De,De;if(Be+De<=nt.usedBytes)return nt.contents.set(Z.subarray(fe,fe+De),Be),De}if(vn.expandFileStorage(nt,Be+De),nt.contents.subarray&&Z.subarray)nt.contents.set(Z.subarray(fe,fe+De),Be);else for(var st=0;st<De;st++)nt.contents[Be+st]=Z[fe+st];return nt.usedBytes=Math.max(nt.usedBytes,Be+De),De},llseek(V,Z,fe){var De=Z;if(fe===1?De+=V.position:fe===2&&He.isFile(V.node.mode)&&(De+=V.node.usedBytes),De<0)throw new He.ErrnoError(28);return De},allocate(V,Z,fe){vn.expandFileStorage(V.node,Z+fe),V.node.usedBytes=Math.max(V.node.usedBytes,Z+fe)},mmap(V,Z,fe,De,Be){if(!He.isFile(V.node.mode))throw new He.ErrnoError(43);var Xe,nt,st=V.node.contents;if(!(Be&2)&&st.buffer===Ee.buffer)nt=!1,Xe=st.byteOffset;else{if((fe>0||fe+Z<st.length)&&(st.subarray?st=st.subarray(fe,fe+Z):st=Array.prototype.slice.call(st,fe,fe+Z)),nt=!0,Xe=Vd(),!Xe)throw new He.ErrnoError(48);Ee.set(st,Xe>>>0)}return{ptr:Xe,allocated:nt}},msync(V,Z,fe,De,Be){return vn.stream_ops.write(V,Z,0,De,fe,!1),0}}},M1=(V,Z,fe,De)=>{var Be=`al ${V}`;ne(V,Xe=>{me(Xe,`Loading data file "${V}" failed (no arrayBuffer).`),Z(new Uint8Array(Xe)),Be&&Gn()},Xe=>{if(fe)fe();else throw`Loading data file "${V}" failed.`}),Be&&En()},x1=o.preloadPlugins||[];function U1(V,Z,fe,De){typeof Browser<"u"&&Browser.init();var Be=!1;return x1.forEach(function(Xe){Be||Xe.canHandle(Z)&&(Xe.handle(V,Z,fe,De),Be=!0)}),Be}function B1(V,Z,fe,De,Be,Xe,nt,st,ft,mt){var Yt=Z?vi.resolve(Os.join2(V,Z)):V;function an(Jt){function Kt(Ln){mt&&mt(),st||He.createDataFile(V,Z,Ln,De,Be,ft),Xe&&Xe(),Gn()}U1(Jt,Yt,Kt,()=>{nt&&nt(),Gn()})||Kt(Jt)}En(),typeof fe=="string"?M1(fe,Jt=>an(Jt),nt):an(fe)}function H1(V){var Z={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090},fe=Z[V];if(typeof fe>"u")throw new Error(`Unknown file open mode: ${V}`);return fe}function Ch(V,Z){var fe=0;return V&&(fe|=365),Z&&(fe|=146),fe}var He={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(V,Z={})=>{if(V=vi.resolve(V),!V)return{path:"",node:null};var fe={follow_mount:!0,recurse_count:0};if(Z=Object.assign(fe,Z),Z.recurse_count>8)throw new He.ErrnoError(32);for(var De=V.split("/").filter(an=>!!an),Be=He.root,Xe="/",nt=0;nt<De.length;nt++){var st=nt===De.length-1;if(st&&Z.parent)break;if(Be=He.lookupNode(Be,De[nt]),Xe=Os.join2(Xe,De[nt]),He.isMountpoint(Be)&&(!st||st&&Z.follow_mount)&&(Be=Be.mounted.root),!st||Z.follow)for(var ft=0;He.isLink(Be.mode);){var mt=He.readlink(Xe);Xe=vi.resolve(Os.dirname(Xe),mt);var Yt=He.lookupPath(Xe,{recurse_count:Z.recurse_count+1});if(Be=Yt.node,ft++>40)throw new He.ErrnoError(32)}}return{path:Xe,node:Be}},getPath:V=>{for(var Z;;){if(He.isRoot(V)){var fe=V.mount.mountpoint;return Z?fe[fe.length-1]!=="/"?`${fe}/${Z}`:fe+Z:fe}Z=Z?`${V.name}/${Z}`:V.name,V=V.parent}},hashName:(V,Z)=>{for(var fe=0,De=0;De<Z.length;De++)fe=(fe<<5)-fe+Z.charCodeAt(De)|0;return(V+fe>>>0)%He.nameTable.length},hashAddNode:V=>{var Z=He.hashName(V.parent.id,V.name);V.name_next=He.nameTable[Z],He.nameTable[Z]=V},hashRemoveNode:V=>{var Z=He.hashName(V.parent.id,V.name);if(He.nameTable[Z]===V)He.nameTable[Z]=V.name_next;else for(var fe=He.nameTable[Z];fe;){if(fe.name_next===V){fe.name_next=V.name_next;break}fe=fe.name_next}},lookupNode:(V,Z)=>{var fe=He.mayLookup(V);if(fe)throw new He.ErrnoError(fe,V);for(var De=He.hashName(V.id,Z),Be=He.nameTable[De];Be;Be=Be.name_next){var Xe=Be.name;if(Be.parent.id===V.id&&Xe===Z)return Be}return He.lookup(V,Z)},createNode:(V,Z,fe,De)=>{var Be=new He.FSNode(V,Z,fe,De);return He.hashAddNode(Be),Be},destroyNode:V=>{He.hashRemoveNode(V)},isRoot:V=>V===V.parent,isMountpoint:V=>!!V.mounted,isFile:V=>(V&61440)===32768,isDir:V=>(V&61440)===16384,isLink:V=>(V&61440)===40960,isChrdev:V=>(V&61440)===8192,isBlkdev:V=>(V&61440)===24576,isFIFO:V=>(V&61440)===4096,isSocket:V=>(V&49152)===49152,flagsToPermissionString:V=>{var Z=["r","w","rw"][V&3];return V&512&&(Z+="w"),Z},nodePermissions:(V,Z)=>He.ignorePermissions?0:Z.includes("r")&&!(V.mode&292)||Z.includes("w")&&!(V.mode&146)||Z.includes("x")&&!(V.mode&73)?2:0,mayLookup:V=>{var Z=He.nodePermissions(V,"x");return Z||(V.node_ops.lookup?0:2)},mayCreate:(V,Z)=>{try{var fe=He.lookupNode(V,Z);return 20}catch{}return He.nodePermissions(V,"wx")},mayDelete:(V,Z,fe)=>{var De;try{De=He.lookupNode(V,Z)}catch(Xe){return Xe.errno}var Be=He.nodePermissions(V,"wx");if(Be)return Be;if(fe){if(!He.isDir(De.mode))return 54;if(He.isRoot(De)||He.getPath(De)===He.cwd())return 10}else if(He.isDir(De.mode))return 31;return 0},mayOpen:(V,Z)=>V?He.isLink(V.mode)?32:He.isDir(V.mode)&&(He.flagsToPermissionString(Z)!=="r"||Z&512)?31:He.nodePermissions(V,He.flagsToPermissionString(Z)):44,MAX_OPEN_FDS:4096,nextfd:()=>{for(var V=0;V<=He.MAX_OPEN_FDS;V++)if(!He.streams[V])return V;throw new He.ErrnoError(33)},getStreamChecked:V=>{var Z=He.getStream(V);if(!Z)throw new He.ErrnoError(8);return Z},getStream:V=>He.streams[V],createStream:(V,Z=-1)=>(He.FSStream||(He.FSStream=function(){this.shared={}},He.FSStream.prototype={},Object.defineProperties(He.FSStream.prototype,{object:{get(){return this.node},set(fe){this.node=fe}},isRead:{get(){return(this.flags&2097155)!==1}},isWrite:{get(){return(this.flags&2097155)!==0}},isAppend:{get(){return this.flags&1024}},flags:{get(){return this.shared.flags},set(fe){this.shared.flags=fe}},position:{get(){return this.shared.position},set(fe){this.shared.position=fe}}})),V=Object.assign(new He.FSStream,V),Z==-1&&(Z=He.nextfd()),V.fd=Z,He.streams[Z]=V,V),closeStream:V=>{He.streams[V]=null},chrdev_stream_ops:{open:V=>{var Z=He.getDevice(V.node.rdev);V.stream_ops=Z.stream_ops,V.stream_ops.open&&V.stream_ops.open(V)},llseek:()=>{throw new He.ErrnoError(70)}},major:V=>V>>8,minor:V=>V&255,makedev:(V,Z)=>V<<8|Z,registerDevice:(V,Z)=>{He.devices[V]={stream_ops:Z}},getDevice:V=>He.devices[V],getMounts:V=>{for(var Z=[],fe=[V];fe.length;){var De=fe.pop();Z.push(De),fe.push.apply(fe,De.mounts)}return Z},syncfs:(V,Z)=>{typeof V=="function"&&(Z=V,V=!1),He.syncFSRequests++,He.syncFSRequests>1&&J(`warning: ${He.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);var fe=He.getMounts(He.root.mount),De=0;function Be(nt){return He.syncFSRequests--,Z(nt)}function Xe(nt){if(nt)return Xe.errored?void 0:(Xe.errored=!0,Be(nt));++De>=fe.length&&Be(null)}fe.forEach(nt=>{if(!nt.type.syncfs)return Xe(null);nt.type.syncfs(nt,V,Xe)})},mount:(V,Z,fe)=>{var De=fe==="/",Be=!fe,Xe;if(De&&He.root)throw new He.ErrnoError(10);if(!De&&!Be){var nt=He.lookupPath(fe,{follow_mount:!1});if(fe=nt.path,Xe=nt.node,He.isMountpoint(Xe))throw new He.ErrnoError(10);if(!He.isDir(Xe.mode))throw new He.ErrnoError(54)}var st={type:V,opts:Z,mountpoint:fe,mounts:[]},ft=V.mount(st);return ft.mount=st,st.root=ft,De?He.root=ft:Xe&&(Xe.mounted=st,Xe.mount&&Xe.mount.mounts.push(st)),ft},unmount:V=>{var Z=He.lookupPath(V,{follow_mount:!1});if(!He.isMountpoint(Z.node))throw new He.ErrnoError(28);var fe=Z.node,De=fe.mounted,Be=He.getMounts(De);Object.keys(He.nameTable).forEach(nt=>{for(var st=He.nameTable[nt];st;){var ft=st.name_next;Be.includes(st.mount)&&He.destroyNode(st),st=ft}}),fe.mounted=null;var Xe=fe.mount.mounts.indexOf(De);fe.mount.mounts.splice(Xe,1)},lookup:(V,Z)=>V.node_ops.lookup(V,Z),mknod:(V,Z,fe)=>{var De=He.lookupPath(V,{parent:!0}),Be=De.node,Xe=Os.basename(V);if(!Xe||Xe==="."||Xe==="..")throw new He.ErrnoError(28);var nt=He.mayCreate(Be,Xe);if(nt)throw new He.ErrnoError(nt);if(!Be.node_ops.mknod)throw new He.ErrnoError(63);return Be.node_ops.mknod(Be,Xe,Z,fe)},create:(V,Z)=>(Z=Z!==void 0?Z:438,Z&=4095,Z|=32768,He.mknod(V,Z,0)),mkdir:(V,Z)=>(Z=Z!==void 0?Z:511,Z&=1023,Z|=16384,He.mknod(V,Z,0)),mkdirTree:(V,Z)=>{for(var fe=V.split("/"),De="",Be=0;Be<fe.length;++Be)if(fe[Be]){De+="/"+fe[Be];try{He.mkdir(De,Z)}catch(Xe){if(Xe.errno!=20)throw Xe}}},mkdev:(V,Z,fe)=>(typeof fe>"u"&&(fe=Z,Z=438),Z|=8192,He.mknod(V,Z,fe)),symlink:(V,Z)=>{if(!vi.resolve(V))throw new He.ErrnoError(44);var fe=He.lookupPath(Z,{parent:!0}),De=fe.node;if(!De)throw new He.ErrnoError(44);var Be=Os.basename(Z),Xe=He.mayCreate(De,Be);if(Xe)throw new He.ErrnoError(Xe);if(!De.node_ops.symlink)throw new He.ErrnoError(63);return De.node_ops.symlink(De,Be,V)},rename:(V,Z)=>{var fe=Os.dirname(V),De=Os.dirname(Z),Be=Os.basename(V),Xe=Os.basename(Z),nt,st,ft;if(nt=He.lookupPath(V,{parent:!0}),st=nt.node,nt=He.lookupPath(Z,{parent:!0}),ft=nt.node,!st||!ft)throw new He.ErrnoError(44);if(st.mount!==ft.mount)throw new He.ErrnoError(75);var mt=He.lookupNode(st,Be),Yt=vi.relative(V,De);if(Yt.charAt(0)!==".")throw new He.ErrnoError(28);if(Yt=vi.relative(Z,fe),Yt.charAt(0)!==".")throw new He.ErrnoError(55);var an;try{an=He.lookupNode(ft,Xe)}catch{}if(mt!==an){var Jt=He.isDir(mt.mode),Kt=He.mayDelete(st,Be,Jt);if(Kt)throw new He.ErrnoError(Kt);if(Kt=an?He.mayDelete(ft,Xe,Jt):He.mayCreate(ft,Xe),Kt)throw new He.ErrnoError(Kt);if(!st.node_ops.rename)throw new He.ErrnoError(63);if(He.isMountpoint(mt)||an&&He.isMountpoint(an))throw new He.ErrnoError(10);if(ft!==st&&(Kt=He.nodePermissions(st,"w"),Kt))throw new He.ErrnoError(Kt);He.hashRemoveNode(mt);try{st.node_ops.rename(mt,ft,Xe)}catch(Ln){throw Ln}finally{He.hashAddNode(mt)}}},rmdir:V=>{var Z=He.lookupPath(V,{parent:!0}),fe=Z.node,De=Os.basename(V),Be=He.lookupNode(fe,De),Xe=He.mayDelete(fe,De,!0);if(Xe)throw new He.ErrnoError(Xe);if(!fe.node_ops.rmdir)throw new He.ErrnoError(63);if(He.isMountpoint(Be))throw new He.ErrnoError(10);fe.node_ops.rmdir(fe,De),He.destroyNode(Be)},readdir:V=>{var Z=He.lookupPath(V,{follow:!0}),fe=Z.node;if(!fe.node_ops.readdir)throw new He.ErrnoError(54);return fe.node_ops.readdir(fe)},unlink:V=>{var Z=He.lookupPath(V,{parent:!0}),fe=Z.node;if(!fe)throw new He.ErrnoError(44);var De=Os.basename(V),Be=He.lookupNode(fe,De),Xe=He.mayDelete(fe,De,!1);if(Xe)throw new He.ErrnoError(Xe);if(!fe.node_ops.unlink)throw new He.ErrnoError(63);if(He.isMountpoint(Be))throw new He.ErrnoError(10);fe.node_ops.unlink(fe,De),He.destroyNode(Be)},readlink:V=>{var Z=He.lookupPath(V),fe=Z.node;if(!fe)throw new He.ErrnoError(44);if(!fe.node_ops.readlink)throw new He.ErrnoError(28);return vi.resolve(He.getPath(fe.parent),fe.node_ops.readlink(fe))},stat:(V,Z)=>{var fe=He.lookupPath(V,{follow:!Z}),De=fe.node;if(!De)throw new He.ErrnoError(44);if(!De.node_ops.getattr)throw new He.ErrnoError(63);return De.node_ops.getattr(De)},lstat:V=>He.stat(V,!0),chmod:(V,Z,fe)=>{var De;if(typeof V=="string"){var Be=He.lookupPath(V,{follow:!fe});De=Be.node}else De=V;if(!De.node_ops.setattr)throw new He.ErrnoError(63);De.node_ops.setattr(De,{mode:Z&4095|De.mode&-4096,timestamp:Date.now()})},lchmod:(V,Z)=>{He.chmod(V,Z,!0)},fchmod:(V,Z)=>{var fe=He.getStreamChecked(V);He.chmod(fe.node,Z)},chown:(V,Z,fe,De)=>{var Be;if(typeof V=="string"){var Xe=He.lookupPath(V,{follow:!De});Be=Xe.node}else Be=V;if(!Be.node_ops.setattr)throw new He.ErrnoError(63);Be.node_ops.setattr(Be,{timestamp:Date.now()})},lchown:(V,Z,fe)=>{He.chown(V,Z,fe,!0)},fchown:(V,Z,fe)=>{var De=He.getStreamChecked(V);He.chown(De.node,Z,fe)},truncate:(V,Z)=>{if(Z<0)throw new He.ErrnoError(28);var fe;if(typeof V=="string"){var De=He.lookupPath(V,{follow:!0});fe=De.node}else fe=V;if(!fe.node_ops.setattr)throw new He.ErrnoError(63);if(He.isDir(fe.mode))throw new He.ErrnoError(31);if(!He.isFile(fe.mode))throw new He.ErrnoError(28);var Be=He.nodePermissions(fe,"w");if(Be)throw new He.ErrnoError(Be);fe.node_ops.setattr(fe,{size:Z,timestamp:Date.now()})},ftruncate:(V,Z)=>{var fe=He.getStreamChecked(V);if(!(fe.flags&2097155))throw new He.ErrnoError(28);He.truncate(fe.node,Z)},utime:(V,Z,fe)=>{var De=He.lookupPath(V,{follow:!0}),Be=De.node;Be.node_ops.setattr(Be,{timestamp:Math.max(Z,fe)})},open:(V,Z,fe)=>{if(V==="")throw new He.ErrnoError(44);Z=typeof Z=="string"?H1(Z):Z,fe=typeof fe>"u"?438:fe,Z&64?fe=fe&4095|32768:fe=0;var De;if(typeof V=="object")De=V;else{V=Os.normalize(V);try{var Be=He.lookupPath(V,{follow:!(Z&131072)});De=Be.node}catch{}}var Xe=!1;if(Z&64)if(De){if(Z&128)throw new He.ErrnoError(20)}else De=He.mknod(V,fe,0),Xe=!0;if(!De)throw new He.ErrnoError(44);if(He.isChrdev(De.mode)&&(Z&=-513),Z&65536&&!He.isDir(De.mode))throw new He.ErrnoError(54);if(!Xe){var nt=He.mayOpen(De,Z);if(nt)throw new He.ErrnoError(nt)}Z&512&&!Xe&&He.truncate(De,0),Z&=-131713;var st=He.createStream({node:De,path:He.getPath(De),flags:Z,seekable:!0,position:0,stream_ops:De.stream_ops,ungotten:[],error:!1});return st.stream_ops.open&&st.stream_ops.open(st),o.logReadFiles&&!(Z&1)&&(He.readFiles||(He.readFiles={}),V in He.readFiles||(He.readFiles[V]=1)),st},close:V=>{if(He.isClosed(V))throw new He.ErrnoError(8);V.getdents&&(V.getdents=null);try{V.stream_ops.close&&V.stream_ops.close(V)}catch(Z){throw Z}finally{He.closeStream(V.fd)}V.fd=null},isClosed:V=>V.fd===null,llseek:(V,Z,fe)=>{if(He.isClosed(V))throw new He.ErrnoError(8);if(!V.seekable||!V.stream_ops.llseek)throw new He.ErrnoError(70);if(fe!=0&&fe!=1&&fe!=2)throw new He.ErrnoError(28);return V.position=V.stream_ops.llseek(V,Z,fe),V.ungotten=[],V.position},read:(V,Z,fe,De,Be)=>{if(De<0||Be<0)throw new He.ErrnoError(28);if(He.isClosed(V))throw new He.ErrnoError(8);if((V.flags&2097155)===1)throw new He.ErrnoError(8);if(He.isDir(V.node.mode))throw new He.ErrnoError(31);if(!V.stream_ops.read)throw new He.ErrnoError(28);var Xe=typeof Be<"u";if(!Xe)Be=V.position;else if(!V.seekable)throw new He.ErrnoError(70);var nt=V.stream_ops.read(V,Z,fe,De,Be);return Xe||(V.position+=nt),nt},write:(V,Z,fe,De,Be,Xe)=>{if(De<0||Be<0)throw new He.ErrnoError(28);if(He.isClosed(V))throw new He.ErrnoError(8);if(!(V.flags&2097155))throw new He.ErrnoError(8);if(He.isDir(V.node.mode))throw new He.ErrnoError(31);if(!V.stream_ops.write)throw new He.ErrnoError(28);V.seekable&&V.flags&1024&&He.llseek(V,0,2);var nt=typeof Be<"u";if(!nt)Be=V.position;else if(!V.seekable)throw new He.ErrnoError(70);var st=V.stream_ops.write(V,Z,fe,De,Be,Xe);return nt||(V.position+=st),st},allocate:(V,Z,fe)=>{if(He.isClosed(V))throw new He.ErrnoError(8);if(Z<0||fe<=0)throw new He.ErrnoError(28);if(!(V.flags&2097155))throw new He.ErrnoError(8);if(!He.isFile(V.node.mode)&&!He.isDir(V.node.mode))throw new He.ErrnoError(43);if(!V.stream_ops.allocate)throw new He.ErrnoError(138);V.stream_ops.allocate(V,Z,fe)},mmap:(V,Z,fe,De,Be)=>{if(De&2&&!(Be&2)&&(V.flags&2097155)!==2)throw new He.ErrnoError(2);if((V.flags&2097155)===1)throw new He.ErrnoError(2);if(!V.stream_ops.mmap)throw new He.ErrnoError(43);return V.stream_ops.mmap(V,Z,fe,De,Be)},msync:(V,Z,fe,De,Be)=>V.stream_ops.msync?V.stream_ops.msync(V,Z,fe,De,Be):0,munmap:V=>0,ioctl:(V,Z,fe)=>{if(!V.stream_ops.ioctl)throw new He.ErrnoError(59);return V.stream_ops.ioctl(V,Z,fe)},readFile:(V,Z={})=>{if(Z.flags=Z.flags||0,Z.encoding=Z.encoding||"binary",Z.encoding!=="utf8"&&Z.encoding!=="binary")throw new Error(`Invalid encoding type "${Z.encoding}"`);var fe,De=He.open(V,Z.flags),Be=He.stat(V),Xe=Be.size,nt=new Uint8Array(Xe);return He.read(De,nt,0,Xe,0),Z.encoding==="utf8"?fe=Xi(nt,0):Z.encoding==="binary"&&(fe=nt),He.close(De),fe},writeFile:(V,Z,fe={})=>{fe.flags=fe.flags||577;var De=He.open(V,fe.flags,fe.mode);if(typeof Z=="string"){var Be=new Uint8Array(Wc(Z)+1),Xe=Th(Z,Be,0,Be.length);He.write(De,Be,0,Xe,void 0,fe.canOwn)}else if(ArrayBuffer.isView(Z))He.write(De,Z,0,Z.byteLength,void 0,fe.canOwn);else throw new Error("Unsupported data type");He.close(De)},cwd:()=>He.currentPath,chdir:V=>{var Z=He.lookupPath(V,{follow:!0});if(Z.node===null)throw new He.ErrnoError(44);if(!He.isDir(Z.node.mode))throw new He.ErrnoError(54);var fe=He.nodePermissions(Z.node,"x");if(fe)throw new He.ErrnoError(fe);He.currentPath=Z.path},createDefaultDirectories:()=>{He.mkdir("/tmp"),He.mkdir("/home"),He.mkdir("/home/web_user")},createDefaultDevices:()=>{He.mkdir("/dev"),He.registerDevice(He.makedev(1,3),{read:()=>0,write:(De,Be,Xe,nt,st)=>nt}),He.mkdev("/dev/null",He.makedev(1,3)),pa.register(He.makedev(5,0),pa.default_tty_ops),pa.register(He.makedev(6,0),pa.default_tty1_ops),He.mkdev("/dev/tty",He.makedev(5,0)),He.mkdev("/dev/tty1",He.makedev(6,0));var V=new Uint8Array(1024),Z=0,fe=()=>(Z===0&&(Z=Lh(V).byteLength),V[--Z]);He.createDevice("/dev","random",fe),He.createDevice("/dev","urandom",fe),He.mkdir("/dev/shm"),He.mkdir("/dev/shm/tmp")},createSpecialDirectories:()=>{He.mkdir("/proc");var V=He.mkdir("/proc/self");He.mkdir("/proc/self/fd"),He.mount({mount:()=>{var Z=He.createNode(V,"fd",16895,73);return Z.node_ops={lookup:(fe,De)=>{var Be=+De,Xe=He.getStreamChecked(Be),nt={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>Xe.path}};return nt.parent=nt,nt}},Z}},{},"/proc/self/fd")},createStandardStreams:()=>{o.stdin?He.createDevice("/dev","stdin",o.stdin):He.symlink("/dev/tty","/dev/stdin"),o.stdout?He.createDevice("/dev","stdout",null,o.stdout):He.symlink("/dev/tty","/dev/stdout"),o.stderr?He.createDevice("/dev","stderr",null,o.stderr):He.symlink("/dev/tty1","/dev/stderr"),He.open("/dev/stdin",0),He.open("/dev/stdout",1),He.open("/dev/stderr",1)},ensureErrnoError:()=>{He.ErrnoError||(He.ErrnoError=function(Z,fe){this.name="ErrnoError",this.node=fe,this.setErrno=function(De){this.errno=De},this.setErrno(Z),this.message="FS error"},He.ErrnoError.prototype=new Error,He.ErrnoError.prototype.constructor=He.ErrnoError,[44].forEach(V=>{He.genericErrors[V]=new He.ErrnoError(V),He.genericErrors[V].stack="<generic error, no stack>"}))},staticInit:()=>{He.ensureErrnoError(),He.nameTable=new Array(4096),He.mount(vn,{},"/"),He.createDefaultDirectories(),He.createDefaultDevices(),He.createSpecialDirectories(),He.filesystems={MEMFS:vn}},init:(V,Z,fe)=>{He.init.initialized=!0,He.ensureErrnoError(),o.stdin=V||o.stdin,o.stdout=Z||o.stdout,o.stderr=fe||o.stderr,He.createStandardStreams()},quit:()=>{He.init.initialized=!1;for(var V=0;V<He.streams.length;V++){var Z=He.streams[V];Z&&He.close(Z)}},findObject:(V,Z)=>{var fe=He.analyzePath(V,Z);return fe.exists?fe.object:null},analyzePath:(V,Z)=>{try{var fe=He.lookupPath(V,{follow:!Z});V=fe.path}catch{}var De={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var fe=He.lookupPath(V,{parent:!0});De.parentExists=!0,De.parentPath=fe.path,De.parentObject=fe.node,De.name=Os.basename(V),fe=He.lookupPath(V,{follow:!Z}),De.exists=!0,De.path=fe.path,De.object=fe.node,De.name=fe.node.name,De.isRoot=fe.path==="/"}catch(Be){De.error=Be.errno}return De},createPath:(V,Z,fe,De)=>{V=typeof V=="string"?V:He.getPath(V);for(var Be=Z.split("/").reverse();Be.length;){var Xe=Be.pop();if(Xe){var nt=Os.join2(V,Xe);try{He.mkdir(nt)}catch{}V=nt}}return nt},createFile:(V,Z,fe,De,Be)=>{var Xe=Os.join2(typeof V=="string"?V:He.getPath(V),Z),nt=Ch(De,Be);return He.create(Xe,nt)},createDataFile:(V,Z,fe,De,Be,Xe)=>{var nt=Z;V&&(V=typeof V=="string"?V:He.getPath(V),nt=Z?Os.join2(V,Z):V);var st=Ch(De,Be),ft=He.create(nt,st);if(fe){if(typeof fe=="string"){for(var mt=new Array(fe.length),Yt=0,an=fe.length;Yt<an;++Yt)mt[Yt]=fe.charCodeAt(Yt);fe=mt}He.chmod(ft,st|146);var Jt=He.open(ft,577);He.write(Jt,fe,0,fe.length,0,Xe),He.close(Jt),He.chmod(ft,st)}return ft},createDevice:(V,Z,fe,De)=>{var Be=Os.join2(typeof V=="string"?V:He.getPath(V),Z),Xe=Ch(!!fe,!!De);He.createDevice.major||(He.createDevice.major=64);var nt=He.makedev(He.createDevice.major++,0);return He.registerDevice(nt,{open:st=>{st.seekable=!1},close:st=>{De&&De.buffer&&De.buffer.length&&De(10)},read:(st,ft,mt,Yt,an)=>{for(var Jt=0,Kt=0;Kt<Yt;Kt++){var Ln;try{Ln=fe()}catch{throw new He.ErrnoError(29)}if(Ln===void 0&&Jt===0)throw new He.ErrnoError(6);if(Ln==null)break;Jt++,ft[mt+Kt]=Ln}return Jt&&(st.node.timestamp=Date.now()),Jt},write:(st,ft,mt,Yt,an)=>{for(var Jt=0;Jt<Yt;Jt++)try{De(ft[mt+Jt])}catch{throw new He.ErrnoError(29)}return Yt&&(st.node.timestamp=Date.now()),Jt}}),He.mkdev(Be,Xe,nt)},forceLoadFile:V=>{if(V.isDevice||V.isFolder||V.link||V.contents)return!0;if(typeof XMLHttpRequest<"u")throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");if(_)try{V.contents=kc(_(V.url),!0),V.usedBytes=V.contents.length}catch{throw new He.ErrnoError(29)}else throw new Error("Cannot load without read() or XMLHttpRequest.")},createLazyFile:(V,Z,fe,De,Be)=>{function Xe(){this.lengthKnown=!1,this.chunks=[]}if(Xe.prototype.get=function(Kt){if(!(Kt>this.length-1||Kt<0)){var Ln=Kt%this.chunkSize,Is=Kt/this.chunkSize|0;return this.getter(Is)[Ln]}},Xe.prototype.setDataGetter=function(Kt){this.getter=Kt},Xe.prototype.cacheLength=function(){var Kt=new XMLHttpRequest;if(Kt.open("HEAD",fe,!1),Kt.send(null),!(Kt.status>=200&&Kt.status<300||Kt.status===304))throw new Error("Couldn't load "+fe+". Status: "+Kt.status);var Ln=Number(Kt.getResponseHeader("Content-length")),Is,Ts=(Is=Kt.getResponseHeader("Accept-Ranges"))&&Is==="bytes",Ls=(Is=Kt.getResponseHeader("Content-Encoding"))&&Is==="gzip",Ht=1024*1024;Ts||(Ht=Ln);var hn=(As,dr)=>{if(As>dr)throw new Error("invalid range ("+As+", "+dr+") or no bytes requested!");if(dr>Ln-1)throw new Error("only "+Ln+" bytes available! programmer error!");var cl=new XMLHttpRequest;if(cl.open("GET",fe,!1),Ln!==Ht&&cl.setRequestHeader("Range","bytes="+As+"-"+dr),cl.responseType="arraybuffer",cl.overrideMimeType&&cl.overrideMimeType("text/plain; charset=x-user-defined"),cl.send(null),!(cl.status>=200&&cl.status<300||cl.status===304))throw new Error("Couldn't load "+fe+". Status: "+cl.status);return cl.response!==void 0?new Uint8Array(cl.response||[]):kc(cl.responseText||"",!0)},Ll=this;Ll.setDataGetter(As=>{var dr=As*Ht,cl=(As+1)*Ht-1;if(cl=Math.min(cl,Ln-1),typeof Ll.chunks[As]>"u"&&(Ll.chunks[As]=hn(dr,cl)),typeof Ll.chunks[As]>"u")throw new Error("doXHR failed!");return Ll.chunks[As]}),(Ls||!Ln)&&(Ht=Ln=1,Ln=this.getter(0).length,Ht=Ln,re("LazyFiles on gzip forces download of the whole file when length is accessed")),this._length=Ln,this._chunkSize=Ht,this.lengthKnown=!0},typeof XMLHttpRequest<"u"){throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var nt,st}else var st={isDevice:!1,url:fe};var ft=He.createFile(V,Z,st,De,Be);st.contents?ft.contents=st.contents:st.url&&(ft.contents=null,ft.url=st.url),Object.defineProperties(ft,{usedBytes:{get:function(){return this.contents.length}}});var mt={},Yt=Object.keys(ft.stream_ops);Yt.forEach(Jt=>{var Kt=ft.stream_ops[Jt];mt[Jt]=function(){return He.forceLoadFile(ft),Kt.apply(null,arguments)}});function an(Jt,Kt,Ln,Is,Ts){var Ls=Jt.node.contents;if(Ts>=Ls.length)return 0;var Ht=Math.min(Ls.length-Ts,Is);if(Ls.slice)for(var hn=0;hn<Ht;hn++)Kt[Ln+hn]=Ls[Ts+hn];else for(var hn=0;hn<Ht;hn++)Kt[Ln+hn]=Ls.get(Ts+hn);return Ht}return mt.read=(Jt,Kt,Ln,Is,Ts)=>(He.forceLoadFile(ft),an(Jt,Kt,Ln,Is,Ts)),mt.mmap=(Jt,Kt,Ln,Is,Ts)=>{He.forceLoadFile(ft);var Ls=Vd();if(!Ls)throw new He.ErrnoError(48);return an(Jt,Ee,Ls,Kt,Ln),{ptr:Ls,allocated:!0}},ft.stream_ops=mt,ft}},Au={DEFAULT_POLLMASK:5,calculateAt:function(V,Z,fe){if(Os.isAbs(Z))return Z;var De;if(V===-100)De=He.cwd();else{var Be=Au.getStreamFromFD(V);De=Be.path}if(Z.length==0){if(!fe)throw new He.ErrnoError(44);return De}return Os.join2(De,Z)},doStat:function(V,Z,fe){try{var De=V(Z)}catch(st){if(st&&st.node&&Os.normalize(Z)!==Os.normalize(He.getPath(st.node)))return-54;throw st}Te[fe>>>2]=De.dev,Te[fe+4>>>2]=De.mode,je[fe+8>>>2]=De.nlink,Te[fe+12>>>2]=De.uid,Te[fe+16>>>2]=De.gid,Te[fe+20>>>2]=De.rdev,ke=[De.size>>>0,($e=De.size,+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[fe+24>>>2]=ke[0],Te[fe+28>>>2]=ke[1],Te[fe+32>>>2]=4096,Te[fe+36>>>2]=De.blocks;var Be=De.atime.getTime(),Xe=De.mtime.getTime(),nt=De.ctime.getTime();return ke=[Math.floor(Be/1e3)>>>0,($e=Math.floor(Be/1e3),+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[fe+40>>>2]=ke[0],Te[fe+44>>>2]=ke[1],je[fe+48>>>2]=Be%1e3*1e3,ke=[Math.floor(Xe/1e3)>>>0,($e=Math.floor(Xe/1e3),+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[fe+56>>>2]=ke[0],Te[fe+60>>>2]=ke[1],je[fe+64>>>2]=Xe%1e3*1e3,ke=[Math.floor(nt/1e3)>>>0,($e=Math.floor(nt/1e3),+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[fe+72>>>2]=ke[0],Te[fe+76>>>2]=ke[1],je[fe+80>>>2]=nt%1e3*1e3,ke=[De.ino>>>0,($e=De.ino,+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[fe+88>>>2]=ke[0],Te[fe+92>>>2]=ke[1],0},doMsync:function(V,Z,fe,De,Be){if(!He.isFile(Z.node.mode))throw new He.ErrnoError(43);if(De&2)return 0;var Xe=Ae.slice(V,V+fe);He.msync(Z,Xe,Be,fe,De)},varargs:void 0,get(){Au.varargs+=4;var V=Te[Au.varargs-4>>>2];return V},getStr(V){var Z=Yc(V);return Z},getStreamFromFD:function(V){var Z=He.getStreamChecked(V);return Z}};function F1(V,Z){V>>>=0,Z>>>=0;var fe=0;return wo().forEach(function(De,Be){var Xe=Z+fe;je[V+Be*4>>>2]=Xe,b1(De,Xe),fe+=De.length+1}),0}function Ph(V,Z){V>>>=0,Z>>>=0;var fe=wo();je[V>>>2]=fe.length;var De=0;return fe.forEach(function(Be){De+=Be.length+1}),je[Z>>>2]=De,0}function qc(V){try{var Z=Au.getStreamFromFD(V);return He.close(Z),0}catch(fe){if(typeof He>"u"||fe.name!=="ErrnoError")throw fe;return fe.errno}}function G1(V,Z){Z>>>=0;try{var fe=0,De=0,Be=0,Xe=Au.getStreamFromFD(V),nt=Xe.tty?2:He.isDir(Xe.mode)?3:He.isLink(Xe.mode)?7:4;return Ee[Z>>>0]=nt,Me[Z+2>>>1]=Be,ke=[fe>>>0,($e=fe,+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[Z+8>>>2]=ke[0],Te[Z+12>>>2]=ke[1],ke=[De>>>0,($e=De,+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[Z+16>>>2]=ke[0],Te[Z+20>>>2]=ke[1],0}catch(st){if(typeof He>"u"||st.name!=="ErrnoError")throw st;return st.errno}}var _1=(V,Z,fe,De)=>{for(var Be=0,Xe=0;Xe<fe;Xe++){var nt=je[Z>>>2],st=je[Z+4>>>2];Z+=8;var ft=He.read(V,Ee,nt,st,De);if(ft<0)return-1;if(Be+=ft,ft<st)break}return Be};function V1(V,Z,fe,De){Z>>>=0,fe>>>=0,De>>>=0;try{var Be=Au.getStreamFromFD(V),Xe=_1(Be,Z,fe);return je[De>>>2]=Xe,0}catch(nt){if(typeof He>"u"||nt.name!=="ErrnoError")throw nt;return nt.errno}}function Mh(V,Z,fe,De,Be){var Xe=jt(Z,fe);Be>>>=0;try{if(isNaN(Xe))return 61;var nt=Au.getStreamFromFD(V);return He.llseek(nt,Xe,De),ke=[nt.position>>>0,($e=nt.position,+Math.abs($e)>=1?$e>0?+Math.floor($e/4294967296)>>>0:~~+Math.ceil(($e-+(~~$e>>>0))/4294967296)>>>0:0)],Te[Be>>>2]=ke[0],Te[Be+4>>>2]=ke[1],nt.getdents&&Xe===0&&De===0&&(nt.getdents=null),0}catch(st){if(typeof He>"u"||st.name!=="ErrnoError")throw st;return st.errno}}var W1=(V,Z,fe,De)=>{for(var Be=0,Xe=0;Xe<fe;Xe++){var nt=je[Z>>>2],st=je[Z+4>>>2];Z+=8;var ft=He.write(V,Ee,nt,st,De);if(ft<0)return-1;Be+=ft}return Be};function Y1(V,Z,fe,De){Z>>>=0,fe>>>=0,De>>>=0;try{var Be=Au.getStreamFromFD(V),Xe=W1(Be,Z,fe);return je[De>>>2]=Xe,0}catch(nt){if(typeof He>"u"||nt.name!=="ErrnoError")throw nt;return nt.errno}}var z1=(V,Z)=>{for(var fe=0,De=0;De<=Z;fe+=V[De++]);return fe},Wd=[31,29,31,30,31,30,31,31,30,31,30,31],xh=[31,28,31,30,31,30,31,31,30,31,30,31],Yd=(V,Z)=>{for(var fe=new Date(V.getTime());Z>0;){var De=yo(fe.getFullYear()),Be=fe.getMonth(),Xe=(De?Wd:xh)[Be];if(Z>Xe-fe.getDate())Z-=Xe-fe.getDate()+1,fe.setDate(1),Be<11?fe.setMonth(Be+1):(fe.setMonth(0),fe.setFullYear(fe.getFullYear()+1));else return fe.setDate(fe.getDate()+Z),fe}return fe},j1=(V,Z)=>{Ee.set(V,Z>>>0)};function k1(V,Z,fe,De){V>>>=0,Z>>>=0,fe>>>=0,De>>>=0;var Be=Te[De+40>>>2],Xe={tm_sec:Te[De>>>2],tm_min:Te[De+4>>>2],tm_hour:Te[De+8>>>2],tm_mday:Te[De+12>>>2],tm_mon:Te[De+16>>>2],tm_year:Te[De+20>>>2],tm_wday:Te[De+24>>>2],tm_yday:Te[De+28>>>2],tm_isdst:Te[De+32>>>2],tm_gmtoff:Te[De+36>>>2],tm_zone:Be?Yc(Be):""},nt=Yc(fe),st={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var ft in st)nt=nt.replace(new RegExp(ft,"g"),st[ft]);var mt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Yt=["January","February","March","April","May","June","July","August","September","October","November","December"];function an(Ht,hn,Ll){for(var As=typeof Ht=="number"?Ht.toString():Ht||"";As.length<hn;)As=Ll[0]+As;return As}function Jt(Ht,hn){return an(Ht,hn,"0")}function Kt(Ht,hn){function Ll(dr){return dr<0?-1:dr>0?1:0}var As;return(As=Ll(Ht.getFullYear()-hn.getFullYear()))===0&&(As=Ll(Ht.getMonth()-hn.getMonth()))===0&&(As=Ll(Ht.getDate()-hn.getDate())),As}function Ln(Ht){switch(Ht.getDay()){case 0:return new Date(Ht.getFullYear()-1,11,29);case 1:return Ht;case 2:return new Date(Ht.getFullYear(),0,3);case 3:return new Date(Ht.getFullYear(),0,2);case 4:return new Date(Ht.getFullYear(),0,1);case 5:return new Date(Ht.getFullYear()-1,11,31);case 6:return new Date(Ht.getFullYear()-1,11,30)}}function Is(Ht){var hn=Yd(new Date(Ht.tm_year+1900,0,1),Ht.tm_yday),Ll=new Date(hn.getFullYear(),0,4),As=new Date(hn.getFullYear()+1,0,4),dr=Ln(Ll),cl=Ln(As);return Kt(dr,hn)<=0?Kt(cl,hn)<=0?hn.getFullYear()+1:hn.getFullYear():hn.getFullYear()-1}var Ts={"%a":Ht=>mt[Ht.tm_wday].substring(0,3),"%A":Ht=>mt[Ht.tm_wday],"%b":Ht=>Yt[Ht.tm_mon].substring(0,3),"%B":Ht=>Yt[Ht.tm_mon],"%C":Ht=>{var hn=Ht.tm_year+1900;return Jt(hn/100|0,2)},"%d":Ht=>Jt(Ht.tm_mday,2),"%e":Ht=>an(Ht.tm_mday,2," "),"%g":Ht=>Is(Ht).toString().substring(2),"%G":Ht=>Is(Ht),"%H":Ht=>Jt(Ht.tm_hour,2),"%I":Ht=>{var hn=Ht.tm_hour;return hn==0?hn=12:hn>12&&(hn-=12),Jt(hn,2)},"%j":Ht=>Jt(Ht.tm_mday+z1(yo(Ht.tm_year+1900)?Wd:xh,Ht.tm_mon-1),3),"%m":Ht=>Jt(Ht.tm_mon+1,2),"%M":Ht=>Jt(Ht.tm_min,2),"%n":()=>`

- If you're the tool creator, you can take one from https://www.uuidgenerator.net/.

- If you're using a platform tool, verify the uuid isn't misspelled or contact the tool creator.`)}};qe(ik,"_pattern",/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/),qe(ik,"_lut",["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"]);let Mq=ik;const Vv=class Wv{constructor(){qe(this,"onDisposed",new Nn),qe(this,"list",new Map),qe(this,"enabled",!1),qe(this,"_clock"),qe(this,"update",()=>{if(!this.enabled)return;const s=this._clock.getDelta();for(const[n,t]of this.list)t.enabled&&t.isUpdateable()&&t.update(s);requestAnimationFrame(this.update)}),this._clock=new uce,Wv.setupBVH()}add(s,n){if(this.list.has(s))throw new Error("You're trying to add a component that already exists in the components intance. Use Components.get() instead.");Mq.validate(s),this.list.set(s,n)}get(s){const n=s.uuid;if(!this.list.has(n)){const t=new s(this);return this.list.has(n)||this.add(n,t),t}return this.list.get(n)}init(){this.enabled=!0,this._clock.start(),this.update()}dispose(){this.enabled=!1;for(const[s,n]of this.list)n.enabled=!1,n.isDisposeable()&&n.dispose();this._clock.stop(),this.onDisposed.trigger(),this.onDisposed.reset()}static setupBVH(){Mi.prototype.computeBoundsTree=f0e,Mi.prototype.disposeBoundsTree=d0e,mn.prototype.raycast=h0e}};qe(Vv,"release","1.4.21");let O0e=Vv;class L0e{constructor(s){qe(this,"_event"),qe(this,"_position",new us),qe(this,"onDisposed",new Nn),qe(this,"updateMouseInfo",n=>{this._event=n}),this.dom=s,this.setupEvents(!0)}get position(){if(this._event){const s=this.dom.getBoundingClientRect();this._position.x=this.getPositionX(s,this._event),this._position.y=this.getPositionY(s,this._event)}return this._position}dispose(){this.setupEvents(!1),this.onDisposed.trigger(),this.onDisposed.reset()}getPositionY(s,n){return-((n.clientY-s.top)/(s.bottom-s.top))*2+1}getPositionX(s,n){return(n.clientX-s.left)/(s.right-s.left)*2-1}setupEvents(s){s?this.dom.addEventListener("mousemove",this.updateMouseInfo):this.dom.removeEventListener("mousemove",this.updateMouseInfo)}}class b0e{constructor(s,n){qe(this,"enabled",!0),qe(this,"components"),qe(this,"onDisposed",new Nn),qe(this,"mouse"),qe(this,"three",new Vk),qe(this,"world");const t=n.renderer;if(!t)throw new Error("A renderer is needed for the raycaster to work!");this.world=n,this.mouse=new L0e(t.three.domElement),this.components=s}dispose(){this.mouse.dispose(),this.onDisposed.trigger(),this.onDisposed.reset()}castRay(s=Array.from(this.world.meshes)){if(!this.world)throw new Error("A world is needed to cast rays!");const n=this.world.camera.three;return this.three.setFromCamera(this.mouse.position,n),this.intersect(s)}castRayFromVector(s,n,t=Array.from(this.world.meshes)){return this.three.set(s,n),this.intersect(t)}intersect(s=Array.from(this.world.meshes)){const n=this.three.intersectObjects(s),t=this.filterClippingPlanes(n);return t.length>0?t[0]:null}filterClippingPlanes(s){if(!this.world.renderer)throw new Error("Renderer not found!");const n=this.world.renderer.three;if(!n.clippingPlanes)return s;const t=n.clippingPlanes;return s.length<=0||!t||(t==null?void 0:t.length)<=0?s:s.filter(u=>t.every(o=>o.distanceToPoint(u.point)>0))}}const Yv=class zv extends ao{constructor(s){super(s),qe(this,"enabled",!0),qe(this,"list",new Map),qe(this,"onDisposed",new Nn),s.add(zv.uuid,this)}get(s){if(this.list.has(s.uuid))return this.list.get(s.uuid);const n=new b0e(this.components,s);return this.list.set(s.uuid,n),s.onDisposed.add(()=>{this.delete(s)}),n}delete(s){const n=this.list.get(s.uuid);n&&n.dispose(),this.list.delete(s.uuid)}dispose(){for(const[s,n]of this.list)n.dispose();this.list.clear(),this.onDisposed.trigger()}};qe(Yv,"uuid","d5d8bdf0-db25-4952-b951-b643af207ace");let nZ=Yv;class C0e extends Cq{constructor(s){super(s),qe(this,"meshes",new Set),qe(this,"onAfterUpdate",new Nn),qe(this,"onBeforeUpdate",new Nn),qe(this,"enabled",!0),qe(this,"uuid",Mq.create()),qe(this,"onDisposed",new Nn),qe(this,"_scene"),qe(this,"_camera"),qe(this,"_renderer",null)}get scene(){if(!this._scene)throw new Error("No scene initialized!");return this._scene}set scene(s){this._scene=s,s.worlds.set(this.uuid,this),s.currentWorld=this,s.onWorldChanged.trigger({world:this,action:"added"})}get camera(){if(!this._camera)throw new Error("No camera initialized!");return this._camera}set camera(s){this._camera=s,s.worlds.set(this.uuid,this),s.currentWorld=this,s.onWorldChanged.trigger({world:this,action:"added"})}get renderer(){return this._renderer}set renderer(s){this._renderer=s,s&&(s.worlds.set(this.uuid,this),s.currentWorld=this,s.onWorldChanged.trigger({world:this,action:"added"}))}update(s){this.enabled&&(!this._scene||!this._camera||(this.scene.currentWorld=this,this.camera.currentWorld=this,this.renderer&&(this.renderer.currentWorld=this),this.onBeforeUpdate.trigger(),this.scene.isUpdateable()&&this.scene.update(s),this.camera.isUpdateable()&&this.camera.update(s),this.renderer&&this.renderer.update(s),this.onAfterUpdate.trigger()))}dispose(s=!0){if(this.enabled=!1,this.scene.onWorldChanged.trigger({world:this,action:"removed"}),this.camera.onWorldChanged.trigger({world:this,action:"removed"}),this.renderer&&this.renderer.onWorldChanged.trigger({world:this,action:"removed"}),s){const n=this.components.get(iM);this.scene.dispose(),this.camera.isDisposeable()&&this.camera.dispose(),this.renderer&&this.renderer.dispose();for(const t of this.meshes)n.destroy(t);this.meshes.clear()}this._scene=null,this._camera=null,this._renderer=null,this.onDisposed.trigger()}}class N4e extends w0e{constructor(s){super(s),qe(this,"isSetup",!1),qe(this,"three"),qe(this,"onSetup",new Nn),qe(this,"config",{directionalLight:{color:new ps("white"),intensity:1.5,position:new ze(5,10,3)},ambientLight:{color:new ps("white"),intensity:1}}),this.three=new Fk,this.three.background=new ps(2107698)}setup(s){this.config={...this.config,...s};const n=new rce(this.config.directionalLight.color,this.config.directionalLight.intensity);n.position.copy(this.config.directionalLight.position);const t=new ice(this.config.ambientLight.color,this.config.ambientLight.intensity);this.three.add(n,t),this.isSetup=!0,this.onSetup.trigger(this)}}class g4e extends y0e{constructor(s,n,t){super(s),qe(this,"enabled",!0),qe(this,"container"),qe(this,"three"),qe(this,"_canvas"),qe(this,"_parameters"),qe(this,"_resizeObserver",null),qe(this,"onContainerUpdated",new Nn),qe(this,"resize",f=>{this.onContainerUpdated.trigger();const d=f?f.x:this.container.clientWidth,m=f?f.y:this.container.clientHeight;this.three.setSize(d,m),this.onResize.trigger(new us(d,m))}),qe(this,"resizeEvent",()=>{this.resize()}),qe(this,"onContextLost",f=>{f.preventDefault(),this.enabled=!1}),qe(this,"onContextBack",()=>{this.three.setRenderTarget(null),this.three.dispose(),this.three=new kF({canvas:this._canvas,antialias:!0,alpha:!0,...this._parameters}),this.enabled=!0}),this.container=n,this._parameters=t,this.three=new kF({antialias:!0,alpha:!0,...t}),this.three.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.setupRenderer(),this.setupEvents(!0),this.resize(),this._canvas=this.three.domElement;const u=this.three.getContext(),{canvas:o}=u;o.addEventListener("webglcontextlost",this.onContextLost,!1),o.addEventListener("webglcontextrestored",this.onContextBack,!1)}update(){if(!this.enabled||!this.currentWorld)return;this.onBeforeUpdate.trigger(this);const s=this.currentWorld.scene.three,n=this.currentWorld.camera.three;this.three.render(s,n),this.onAfterUpdate.trigger(this)}dispose(){this.enabled=!1,this.setupEvents(!1),this.three.domElement.remove(),this.three.dispose(),this.onResize.reset(),this.onAfterUpdate.reset(),this.onBeforeUpdate.reset(),this.onDisposed.trigger(),this.onDisposed.reset()}getSize(){return new us(this.three.domElement.clientWidth,this.three.domElement.clientHeight)}setupEvents(s){const n=this.three.domElement.parentElement;if(!n)throw new Error("This renderer needs to have an HTML container!");this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),window.removeEventListener("resize",this.resizeEvent),s&&(this._resizeObserver=new ResizeObserver(this.resizeEvent),this._resizeObserver.observe(n),this._resizeObserver.observe(document.body),window.addEventListener("resize",this.resizeEvent))}setupRenderer(){this.three.localClippingEnabled=!0,this.container&&this.container.appendChild(this.three.domElement),this.onContainerUpdated.trigger()}}/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */const ms={LEFT:1,RIGHT:2,MIDDLE:4},xt=Object.freeze({NONE:0,ROTATE:1,TRUCK:2,OFFSET:4,DOLLY:8,ZOOM:16,TOUCH_ROTATE:32,TOUCH_TRUCK:64,TOUCH_OFFSET:128,TOUCH_DOLLY:256,TOUCH_ZOOM:512,TOUCH_DOLLY_TRUCK:1024,TOUCH_DOLLY_OFFSET:2048,TOUCH_DOLLY_ROTATE:4096,TOUCH_ZOOM_TRUCK:8192,TOUCH_ZOOM_OFFSET:16384,TOUCH_ZOOM_ROTATE:32768}),QP={NONE:0,IN:1,OUT:-1};function _8(e){return e.isPerspectiveCamera}function jS(e){return e.isOrthographicCamera}const ZP=Math.PI*2,sZ=Math.PI/2,jv=1e-5,_H=Math.PI/180;function JE(e,s,n){return Math.max(s,Math.min(n,e))}function mr(e,s=jv){return Math.abs(e)<s}function kl(e,s,n=jv){return mr(e-s,n)}function lZ(e,s){return Math.round(e/s)*s}function VH(e){return isFinite(e)?e:e<0?-Number.MAX_VALUE:Number.MAX_VALUE}function WH(e){return Math.abs(e)<Number.MAX_VALUE?e:e*(1/0)}function v_(e,s,n,t,u=1/0,o){t=Math.max(1e-4,t);const f=2/t,d=f*o,m=1/(1+d+.48*d*d+.235*d*d*d);let D=e-s;const P=s,x=u*t;D=JE(D,-x,x),s=e-D;const H=(n.value+f*D)*o;n.value=(n.value-f*H)*m;let _=s+(D+H)*m;return P-e>0==_>P&&(_=P,n.value=(_-P)/o),_}function rZ(e,s,n,t,u=1/0,o,f){t=Math.max(1e-4,t);const d=2/t,m=d*o,D=1/(1+m+.48*m*m+.235*m*m*m);let P=s.x,x=s.y,H=s.z,_=e.x-P,ne=e.y-x,re=e.z-H;const J=P,K=x,Ie=H,ce=u*t,ae=ce*ce,me=_*_+ne*ne+re*re;if(me>ae){const it=Math.sqrt(me);_=_/it*ce,ne=ne/it*ce,re=re/it*ce}P=e.x-_,x=e.y-ne,H=e.z-re;const Ee=(n.x+d*_)*o,Ae=(n.y+d*ne)*o,Me=(n.z+d*re)*o;n.x=(n.x-d*Ee)*D,n.y=(n.y-d*Ae)*D,n.z=(n.z-d*Me)*D,f.x=P+(_+Ee)*D,f.y=x+(ne+Ae)*D,f.z=H+(re+Me)*D;const we=J-e.x,Te=K-e.y,je=Ie-e.z,Ke=f.x-J,lt=f.y-K,Ze=f.z-Ie;return we*Ke+Te*lt+je*Ze>0&&(f.x=J,f.y=K,f.z=Ie,n.x=(f.x-J)/o,n.y=(f.y-K)/o,n.z=(f.z-Ie)/o),f}function Fz(e,s){s.set(0,0),e.forEach(n=>{s.x+=n.clientX,s.y+=n.clientY}),s.x/=e.length,s.y/=e.length}function Gz(e,s){return jS(e)?(console.warn(`${s} is not supported in OrthographicCamera`),!0):!1}class P0e{constructor(){this._listeners={}}addEventListener(s,n){const t=this._listeners;t[s]===void 0&&(t[s]=[]),t[s].indexOf(n)===-1&&t[s].push(n)}hasEventListener(s,n){const t=this._listeners;return t[s]!==void 0&&t[s].indexOf(n)!==-1}removeEventListener(s,n){const t=this._listeners[s];if(t!==void 0){const u=t.indexOf(n);u!==-1&&t.splice(u,1)}}removeAllEventListeners(s){if(!s){this._listeners={};return}Array.isArray(this._listeners[s])&&(this._listeners[s].length=0)}dispatchEvent(s){const n=this._listeners[s.type];if(n!==void 0){s.target=this;const t=n.slice(0);for(let u=0,o=t.length;u<o;u++)t[u].call(this,s)}}}const M0e="2.7.3",eV=1/8,kv=typeof window<"u",x0e=kv&&/Mac/.test(navigator.platform),U0e=!(kv&&"PointerEvent"in window);let ys,iZ,tV,_z,J3,Fs,Bl,JP,YH,JT,XT,V8,uZ,aZ,Z5,zH,XP,oZ,Vz,cZ,Wz,Yz,nV;class WI extends P0e{static install(s){ys=s.THREE,iZ=Object.freeze(new ys.Vector3(0,0,0)),tV=Object.freeze(new ys.Vector3(0,1,0)),_z=Object.freeze(new ys.Vector3(0,0,1)),J3=new ys.Vector2,Fs=new ys.Vector3,Bl=new ys.Vector3,JP=new ys.Vector3,YH=new ys.Vector3,JT=new ys.Vector3,XT=new ys.Vector3,V8=new ys.Vector3,uZ=new ys.Vector3,aZ=new ys.Vector3,Z5=new ys.Spherical,zH=new ys.Spherical,XP=new ys.Box3,oZ=new ys.Box3,Vz=new ys.Sphere,cZ=new ys.Quaternion,Wz=new ys.Quaternion,Yz=new ys.Matrix4,nV=new ys.Raycaster}static get ACTION(){return xt}constructor(s,n){super(),this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.minDistance=Number.EPSILON,this.maxDistance=1/0,this.infinityDolly=!1,this.minZoom=.01,this.maxZoom=1/0,this.smoothTime=.25,this.draggingSmoothTime=.125,this.maxSpeed=1/0,this.azimuthRotateSpeed=1,this.polarRotateSpeed=1,this.dollySpeed=1,this.dollyDragInverted=!1,this.truckSpeed=2,this.dollyToCursor=!1,this.dragToOffset=!1,this.verticalDragToForward=!1,this.boundaryFriction=0,this.restThreshold=.01,this.colliderMeshes=[],this.cancel=()=>{},this._enabled=!0,this._state=xt.NONE,this._viewport=null,this._changedDolly=0,this._changedZoom=0,this._hasRested=!0,this._boundaryEnclosesCamera=!1,this._needsUpdate=!0,this._updatedLastTime=!1,this._elementRect=new DOMRect,this._isDragging=!1,this._dragNeedsUpdate=!0,this._activePointers=[],this._lockedPointer=null,this._interactiveArea=new DOMRect(0,0,1,1),this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._isUserControllingOffset=!1,this._isUserControllingZoom=!1,this._lastDollyDirection=QP.NONE,this._thetaVelocity={value:0},this._phiVelocity={value:0},this._radiusVelocity={value:0},this._targetVelocity=new ys.Vector3,this._focalOffsetVelocity=new ys.Vector3,this._zoomVelocity={value:0},this._truckInternal=(ae,me,Ee)=>{let Ae,Me;if(_8(this._camera)){const we=Fs.copy(this._camera.position).sub(this._target),Te=this._camera.getEffectiveFOV()*_H,je=we.length()*Math.tan(Te*.5);Ae=this.truckSpeed*ae*je/this._elementRect.height,Me=this.truckSpeed*me*je/this._elementRect.height}else if(jS(this._camera)){const we=this._camera;Ae=ae*(we.right-we.left)/we.zoom/this._elementRect.width,Me=me*(we.top-we.bottom)/we.zoom/this._elementRect.height}else return;this.verticalDragToForward?(Ee?this.setFocalOffset(this._focalOffsetEnd.x+Ae,this._focalOffsetEnd.y,this._focalOffsetEnd.z,!0):this.truck(Ae,0,!0),this.forward(-Me,!0)):Ee?this.setFocalOffset(this._focalOffsetEnd.x+Ae,this._focalOffsetEnd.y+Me,this._focalOffsetEnd.z,!0):this.truck(Ae,Me,!0)},this._rotateInternal=(ae,me)=>{const Ee=ZP*this.azimuthRotateSpeed*ae/this._elementRect.height,Ae=ZP*this.polarRotateSpeed*me/this._elementRect.height;this.rotate(Ee,Ae,!0)},this._dollyInternal=(ae,me,Ee)=>{const Ae=Math.pow(.95,-ae*this.dollySpeed),Me=this._sphericalEnd.radius,we=this._sphericalEnd.radius*Ae,Te=JE(we,this.minDistance,this.maxDistance),je=Te-we;this.infinityDolly&&this.dollyToCursor?this._dollyToNoClamp(we,!0):this.infinityDolly&&!this.dollyToCursor?(this.dollyInFixed(je,!0),this._dollyToNoClamp(Te,!0)):this._dollyToNoClamp(Te,!0),this.dollyToCursor&&(this._changedDolly+=(this.infinityDolly?we:Te)-Me,this._dollyControlCoord.set(me,Ee)),this._lastDollyDirection=Math.sign(-ae)},this._zoomInternal=(ae,me,Ee)=>{const Ae=Math.pow(.95,ae*this.dollySpeed),Me=this._zoom,we=this._zoom*Ae;this.zoomTo(we,!0),this.dollyToCursor&&(this._changedZoom+=we-Me,this._dollyControlCoord.set(me,Ee))},typeof ys>"u"&&console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."),this._camera=s,this._yAxisUpSpace=new ys.Quaternion().setFromUnitVectors(this._camera.up,tV),this._yAxisUpSpaceInverse=this._yAxisUpSpace.clone().invert(),this._state=xt.NONE,this._target=new ys.Vector3,this._targetEnd=this._target.clone(),this._focalOffset=new ys.Vector3,this._focalOffsetEnd=this._focalOffset.clone(),this._spherical=new ys.Spherical().setFromVector3(Fs.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)),this._sphericalEnd=this._spherical.clone(),this._lastDistance=this._spherical.radius,this._zoom=this._camera.zoom,this._zoomEnd=this._zoom,this._lastZoom=this._zoom,this._nearPlaneCorners=[new ys.Vector3,new ys.Vector3,new ys.Vector3,new ys.Vector3],this._updateNearPlaneCorners(),this._boundary=new ys.Box3(new ys.Vector3(-1/0,-1/0,-1/0),new ys.Vector3(1/0,1/0,1/0)),this._cameraUp0=this._camera.up.clone(),this._target0=this._target.clone(),this._position0=this._camera.position.clone(),this._zoom0=this._zoom,this._focalOffset0=this._focalOffset.clone(),this._dollyControlCoord=new ys.Vector2,this.mouseButtons={left:xt.ROTATE,middle:xt.DOLLY,right:xt.TRUCK,wheel:_8(this._camera)?xt.DOLLY:jS(this._camera)?xt.ZOOM:xt.NONE},this.touches={one:xt.TOUCH_ROTATE,two:_8(this._camera)?xt.TOUCH_DOLLY_TRUCK:jS(this._camera)?xt.TOUCH_ZOOM_TRUCK:xt.NONE,three:xt.TOUCH_TRUCK};const t=new ys.Vector2,u=new ys.Vector2,o=new ys.Vector2,f=ae=>{if(!this._enabled||!this._domElement)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const Ae=this._domElement.getBoundingClientRect(),Me=ae.clientX/Ae.width,we=ae.clientY/Ae.height;if(Me<this._interactiveArea.left||Me>this._interactiveArea.right||we<this._interactiveArea.top||we>this._interactiveArea.bottom)return}const me=ae.pointerType!=="mouse"?null:(ae.buttons&ms.LEFT)===ms.LEFT?ms.LEFT:(ae.buttons&ms.MIDDLE)===ms.MIDDLE?ms.MIDDLE:(ae.buttons&ms.RIGHT)===ms.RIGHT?ms.RIGHT:null;if(me!==null){const Ae=this._findPointerByMouseButton(me);Ae&&this._disposePointer(Ae)}if((ae.buttons&ms.LEFT)===ms.LEFT&&this._lockedPointer)return;const Ee={pointerId:ae.pointerId,clientX:ae.clientX,clientY:ae.clientY,deltaX:0,deltaY:0,mouseButton:me};this._activePointers.push(Ee),this._domElement.ownerDocument.removeEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",P),this._domElement.ownerDocument.addEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",P),this._isDragging=!0,re(ae)},d=ae=>{if(!this._enabled||!this._domElement||this._lockedPointer)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const Ae=this._domElement.getBoundingClientRect(),Me=ae.clientX/Ae.width,we=ae.clientY/Ae.height;if(Me<this._interactiveArea.left||Me>this._interactiveArea.right||we<this._interactiveArea.top||we>this._interactiveArea.bottom)return}const me=(ae.buttons&ms.LEFT)===ms.LEFT?ms.LEFT:(ae.buttons&ms.MIDDLE)===ms.MIDDLE?ms.MIDDLE:(ae.buttons&ms.RIGHT)===ms.RIGHT?ms.RIGHT:null;if(me!==null){const Ae=this._findPointerByMouseButton(me);Ae&&this._disposePointer(Ae)}const Ee={pointerId:1,clientX:ae.clientX,clientY:ae.clientY,deltaX:0,deltaY:0,mouseButton:(ae.buttons&ms.LEFT)===ms.LEFT?ms.LEFT:(ae.buttons&ms.MIDDLE)===ms.LEFT?ms.MIDDLE:(ae.buttons&ms.RIGHT)===ms.LEFT?ms.RIGHT:null};this._activePointers.push(Ee),this._domElement.ownerDocument.removeEventListener("mousemove",D),this._domElement.ownerDocument.removeEventListener("mouseup",x),this._domElement.ownerDocument.addEventListener("mousemove",D),this._domElement.ownerDocument.addEventListener("mouseup",x),this._isDragging=!0,re(ae)},m=ae=>{ae.cancelable&&ae.preventDefault();const me=ae.pointerId,Ee=this._lockedPointer||this._findPointerById(me);if(Ee){if(Ee.clientX=ae.clientX,Ee.clientY=ae.clientY,Ee.deltaX=ae.movementX,Ee.deltaY=ae.movementY,this._state=0,ae.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else(!this._isDragging&&this._lockedPointer||this._isDragging&&(ae.buttons&ms.LEFT)===ms.LEFT)&&(this._state=this._state|this.mouseButtons.left),this._isDragging&&(ae.buttons&ms.MIDDLE)===ms.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),this._isDragging&&(ae.buttons&ms.RIGHT)===ms.RIGHT&&(this._state=this._state|this.mouseButtons.right);J()}},D=ae=>{const me=this._lockedPointer||this._findPointerById(1);me&&(me.clientX=ae.clientX,me.clientY=ae.clientY,me.deltaX=ae.movementX,me.deltaY=ae.movementY,this._state=0,(this._lockedPointer||(ae.buttons&ms.LEFT)===ms.LEFT)&&(this._state=this._state|this.mouseButtons.left),(ae.buttons&ms.MIDDLE)===ms.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(ae.buttons&ms.RIGHT)===ms.RIGHT&&(this._state=this._state|this.mouseButtons.right),J())},P=ae=>{const me=this._findPointerById(ae.pointerId);if(!(me&&me===this._lockedPointer)){if(me&&this._disposePointer(me),ae.pointerType==="touch")switch(this._activePointers.length){case 0:this._state=xt.NONE;break;case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else this._state=xt.NONE;K()}},x=()=>{const ae=this._findPointerById(1);ae&&ae===this._lockedPointer||(ae&&this._disposePointer(ae),this._state=xt.NONE,K())};let H=-1;const _=ae=>{if(!this._domElement||!this._enabled||this.mouseButtons.wheel===xt.NONE)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const we=this._domElement.getBoundingClientRect(),Te=ae.clientX/we.width,je=ae.clientY/we.height;if(Te<this._interactiveArea.left||Te>this._interactiveArea.right||je<this._interactiveArea.top||je>this._interactiveArea.bottom)return}if(ae.preventDefault(),this.dollyToCursor||this.mouseButtons.wheel===xt.ROTATE||this.mouseButtons.wheel===xt.TRUCK){const we=performance.now();H-we<1e3&&this._getClientRect(this._elementRect),H=we}const me=x0e?-1:-3,Ee=ae.deltaMode===1?ae.deltaY/me:ae.deltaY/(me*10),Ae=this.dollyToCursor?(ae.clientX-this._elementRect.x)/this._elementRect.width*2-1:0,Me=this.dollyToCursor?(ae.clientY-this._elementRect.y)/this._elementRect.height*-2+1:0;switch(this.mouseButtons.wheel){case xt.ROTATE:{this._rotateInternal(ae.deltaX,ae.deltaY),this._isUserControllingRotate=!0;break}case xt.TRUCK:{this._truckInternal(ae.deltaX,ae.deltaY,!1),this._isUserControllingTruck=!0;break}case xt.OFFSET:{this._truckInternal(ae.deltaX,ae.deltaY,!0),this._isUserControllingOffset=!0;break}case xt.DOLLY:{this._dollyInternal(-Ee,Ae,Me),this._isUserControllingDolly=!0;break}case xt.ZOOM:{this._zoomInternal(-Ee,Ae,Me),this._isUserControllingZoom=!0;break}}this.dispatchEvent({type:"control"})},ne=ae=>{if(!(!this._domElement||!this._enabled)){if(this.mouseButtons.right===WI.ACTION.NONE){const me=ae instanceof PointerEvent?ae.pointerId:0,Ee=this._findPointerById(me);Ee&&this._disposePointer(Ee),this._domElement.ownerDocument.removeEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",P),this._domElement.ownerDocument.removeEventListener("mousemove",D),this._domElement.ownerDocument.removeEventListener("mouseup",x);return}ae.preventDefault()}},re=ae=>{if(this._enabled){if(Fz(this._activePointers,J3),this._getClientRect(this._elementRect),t.copy(J3),u.copy(J3),this._activePointers.length>=2){const me=J3.x-this._activePointers[1].clientX,Ee=J3.y-this._activePointers[1].clientY,Ae=Math.sqrt(me*me+Ee*Ee);o.set(0,Ae);const Me=(this._activePointers[0].clientX+this._activePointers[1].clientX)*.5,we=(this._activePointers[0].clientY+this._activePointers[1].clientY)*.5;u.set(Me,we)}if(this._state=0,!ae)this._lockedPointer&&(this._state=this._state|this.mouseButtons.left);else if("pointerType"in ae&&ae.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else!this._lockedPointer&&(ae.buttons&ms.LEFT)===ms.LEFT&&(this._state=this._state|this.mouseButtons.left),(ae.buttons&ms.MIDDLE)===ms.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(ae.buttons&ms.RIGHT)===ms.RIGHT&&(this._state=this._state|this.mouseButtons.right);((this._state&xt.ROTATE)===xt.ROTATE||(this._state&xt.TOUCH_ROTATE)===xt.TOUCH_ROTATE||(this._state&xt.TOUCH_DOLLY_ROTATE)===xt.TOUCH_DOLLY_ROTATE||(this._state&xt.TOUCH_ZOOM_ROTATE)===xt.TOUCH_ZOOM_ROTATE)&&(this._sphericalEnd.theta=this._spherical.theta,this._sphericalEnd.phi=this._spherical.phi,this._thetaVelocity.value=0,this._phiVelocity.value=0),((this._state&xt.TRUCK)===xt.TRUCK||(this._state&xt.TOUCH_TRUCK)===xt.TOUCH_TRUCK||(this._state&xt.TOUCH_DOLLY_TRUCK)===xt.TOUCH_DOLLY_TRUCK||(this._state&xt.TOUCH_ZOOM_TRUCK)===xt.TOUCH_ZOOM_TRUCK)&&(this._targetEnd.copy(this._target),this._targetVelocity.set(0,0,0)),((this._state&xt.DOLLY)===xt.DOLLY||(this._state&xt.TOUCH_DOLLY)===xt.TOUCH_DOLLY||(this._state&xt.TOUCH_DOLLY_TRUCK)===xt.TOUCH_DOLLY_TRUCK||(this._state&xt.TOUCH_DOLLY_OFFSET)===xt.TOUCH_DOLLY_OFFSET||(this._state&xt.TOUCH_DOLLY_ROTATE)===xt.TOUCH_DOLLY_ROTATE)&&(this._sphericalEnd.radius=this._spherical.radius,this._radiusVelocity.value=0),((this._state&xt.ZOOM)===xt.ZOOM||(this._state&xt.TOUCH_ZOOM)===xt.TOUCH_ZOOM||(this._state&xt.TOUCH_ZOOM_TRUCK)===xt.TOUCH_ZOOM_TRUCK||(this._state&xt.TOUCH_ZOOM_OFFSET)===xt.TOUCH_ZOOM_OFFSET||(this._state&xt.TOUCH_ZOOM_ROTATE)===xt.TOUCH_ZOOM_ROTATE)&&(this._zoomEnd=this._zoom,this._zoomVelocity.value=0),((this._state&xt.OFFSET)===xt.OFFSET||(this._state&xt.TOUCH_OFFSET)===xt.TOUCH_OFFSET||(this._state&xt.TOUCH_DOLLY_OFFSET)===xt.TOUCH_DOLLY_OFFSET||(this._state&xt.TOUCH_ZOOM_OFFSET)===xt.TOUCH_ZOOM_OFFSET)&&(this._focalOffsetEnd.copy(this._focalOffset),this._focalOffsetVelocity.set(0,0,0)),this.dispatchEvent({type:"controlstart"})}},J=()=>{if(!this._enabled||!this._dragNeedsUpdate)return;this._dragNeedsUpdate=!1,Fz(this._activePointers,J3);const ae=this._domElement&&document.pointerLockElement===this._domElement?this._lockedPointer||this._activePointers[0]:null,me=ae?-ae.deltaX:u.x-J3.x,Ee=ae?-ae.deltaY:u.y-J3.y;if(u.copy(J3),((this._state&xt.ROTATE)===xt.ROTATE||(this._state&xt.TOUCH_ROTATE)===xt.TOUCH_ROTATE||(this._state&xt.TOUCH_DOLLY_ROTATE)===xt.TOUCH_DOLLY_ROTATE||(this._state&xt.TOUCH_ZOOM_ROTATE)===xt.TOUCH_ZOOM_ROTATE)&&(this._rotateInternal(me,Ee),this._isUserControllingRotate=!0),(this._state&xt.DOLLY)===xt.DOLLY||(this._state&xt.ZOOM)===xt.ZOOM){const Ae=this.dollyToCursor?(t.x-this._elementRect.x)/this._elementRect.width*2-1:0,Me=this.dollyToCursor?(t.y-this._elementRect.y)/this._elementRect.height*-2+1:0,we=this.dollyDragInverted?-1:1;(this._state&xt.DOLLY)===xt.DOLLY?(this._dollyInternal(we*Ee*eV,Ae,Me),this._isUserControllingDolly=!0):(this._zoomInternal(we*Ee*eV,Ae,Me),this._isUserControllingZoom=!0)}if((this._state&xt.TOUCH_DOLLY)===xt.TOUCH_DOLLY||(this._state&xt.TOUCH_ZOOM)===xt.TOUCH_ZOOM||(this._state&xt.TOUCH_DOLLY_TRUCK)===xt.TOUCH_DOLLY_TRUCK||(this._state&xt.TOUCH_ZOOM_TRUCK)===xt.TOUCH_ZOOM_TRUCK||(this._state&xt.TOUCH_DOLLY_OFFSET)===xt.TOUCH_DOLLY_OFFSET||(this._state&xt.TOUCH_ZOOM_OFFSET)===xt.TOUCH_ZOOM_OFFSET||(this._state&xt.TOUCH_DOLLY_ROTATE)===xt.TOUCH_DOLLY_ROTATE||(this._state&xt.TOUCH_ZOOM_ROTATE)===xt.TOUCH_ZOOM_ROTATE){const Ae=J3.x-this._activePointers[1].clientX,Me=J3.y-this._activePointers[1].clientY,we=Math.sqrt(Ae*Ae+Me*Me),Te=o.y-we;o.set(0,we);const je=this.dollyToCursor?(u.x-this._elementRect.x)/this._elementRect.width*2-1:0,Ke=this.dollyToCursor?(u.y-this._elementRect.y)/this._elementRect.height*-2+1:0;(this._state&xt.TOUCH_DOLLY)===xt.TOUCH_DOLLY||(this._state&xt.TOUCH_DOLLY_ROTATE)===xt.TOUCH_DOLLY_ROTATE||(this._state&xt.TOUCH_DOLLY_TRUCK)===xt.TOUCH_DOLLY_TRUCK||(this._state&xt.TOUCH_DOLLY_OFFSET)===xt.TOUCH_DOLLY_OFFSET?(this._dollyInternal(Te*eV,je,Ke),this._isUserControllingDolly=!0):(this._zoomInternal(Te*eV,je,Ke),this._isUserControllingZoom=!0)}((this._state&xt.TRUCK)===xt.TRUCK||(this._state&xt.TOUCH_TRUCK)===xt.TOUCH_TRUCK||(this._state&xt.TOUCH_DOLLY_TRUCK)===xt.TOUCH_DOLLY_TRUCK||(this._state&xt.TOUCH_ZOOM_TRUCK)===xt.TOUCH_ZOOM_TRUCK)&&(this._truckInternal(me,Ee,!1),this._isUserControllingTruck=!0),((this._state&xt.OFFSET)===xt.OFFSET||(this._state&xt.TOUCH_OFFSET)===xt.TOUCH_OFFSET||(this._state&xt.TOUCH_DOLLY_OFFSET)===xt.TOUCH_DOLLY_OFFSET||(this._state&xt.TOUCH_ZOOM_OFFSET)===xt.TOUCH_ZOOM_OFFSET)&&(this._truckInternal(me,Ee,!0),this._isUserControllingOffset=!0),this.dispatchEvent({type:"control"})},K=()=>{Fz(this._activePointers,J3),u.copy(J3),this._dragNeedsUpdate=!1,(this._activePointers.length===0||this._activePointers.length===1&&this._activePointers[0]===this._lockedPointer)&&(this._isDragging=!1),this._activePointers.length===0&&this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.removeEventListener("mousemove",D),this._domElement.ownerDocument.removeEventListener("pointerup",P),this._domElement.ownerDocument.removeEventListener("mouseup",x),this.dispatchEvent({type:"controlend"}))};this.lockPointer=()=>{!this._enabled||!this._domElement||(this.cancel(),this._lockedPointer={pointerId:-1,clientX:0,clientY:0,deltaX:0,deltaY:0,mouseButton:null},this._activePointers.push(this._lockedPointer),this._domElement.ownerDocument.removeEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",P),this._domElement.requestPointerLock(),this._domElement.ownerDocument.addEventListener("pointerlockchange",Ie),this._domElement.ownerDocument.addEventListener("pointerlockerror",ce),this._domElement.ownerDocument.addEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",P),re())},this.unlockPointer=()=>{this._lockedPointer!==null&&(this._disposePointer(this._lockedPointer),this._lockedPointer=null),document.exitPointerLock(),this.cancel(),this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointerlockchange",Ie),this._domElement.ownerDocument.removeEventListener("pointerlockerror",ce))};const Ie=()=>{this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement||this.unlockPointer()},ce=()=>{this.unlockPointer()};this._addAllEventListeners=ae=>{this._domElement=ae,this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none",this._domElement.addEventListener("pointerdown",f),U0e&&this._domElement.addEventListener("mousedown",d),this._domElement.addEventListener("pointercancel",P),this._domElement.addEventListener("wheel",_,{passive:!1}),this._domElement.addEventListener("contextmenu",ne)},this._removeAllEventListeners=()=>{this._domElement&&(this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect="",this._domElement.removeEventListener("pointerdown",f),this._domElement.removeEventListener("mousedown",d),this._domElement.removeEventListener("pointercancel",P),this._domElement.removeEventListener("wheel",_,{passive:!1}),this._domElement.removeEventListener("contextmenu",ne),this._domElement.ownerDocument.removeEventListener("pointermove",m,{passive:!1}),this._domElement.ownerDocument.removeEventListener("mousemove",D),this._domElement.ownerDocument.removeEventListener("pointerup",P),this._domElement.ownerDocument.removeEventListener("mouseup",x),this._domElement.ownerDocument.removeEventListener("pointerlockchange",Ie),this._domElement.ownerDocument.removeEventListener("pointerlockerror",ce))},this.cancel=()=>{this._state!==xt.NONE&&(this._state=xt.NONE,this._activePointers.length=0,K())},n&&this.connect(n),this.update(0)}get camera(){return this._camera}set camera(s){this._camera=s,this.updateCameraUp(),this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0}get enabled(){return this._enabled}set enabled(s){this._enabled=s,this._domElement&&(s?(this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none"):(this.cancel(),this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect=""))}get active(){return!this._hasRested}get currentAction(){return this._state}get distance(){return this._spherical.radius}set distance(s){this._spherical.radius===s&&this._sphericalEnd.radius===s||(this._spherical.radius=s,this._sphericalEnd.radius=s,this._needsUpdate=!0)}get azimuthAngle(){return this._spherical.theta}set azimuthAngle(s){this._spherical.theta===s&&this._sphericalEnd.theta===s||(this._spherical.theta=s,this._sphericalEnd.theta=s,this._needsUpdate=!0)}get polarAngle(){return this._spherical.phi}set polarAngle(s){this._spherical.phi===s&&this._sphericalEnd.phi===s||(this._spherical.phi=s,this._sphericalEnd.phi=s,this._needsUpdate=!0)}get boundaryEnclosesCamera(){return this._boundaryEnclosesCamera}set boundaryEnclosesCamera(s){this._boundaryEnclosesCamera=s,this._needsUpdate=!0}set interactiveArea(s){this._interactiveArea.width=JE(s.width,0,1),this._interactiveArea.height=JE(s.height,0,1),this._interactiveArea.x=JE(s.x,0,1-this._interactiveArea.width),this._interactiveArea.y=JE(s.y,0,1-this._interactiveArea.height)}addEventListener(s,n){super.addEventListener(s,n)}removeEventListener(s,n){super.removeEventListener(s,n)}rotate(s,n,t=!1){return this.rotateTo(this._sphericalEnd.theta+s,this._sphericalEnd.phi+n,t)}rotateAzimuthTo(s,n=!1){return this.rotateTo(s,this._sphericalEnd.phi,n)}rotatePolarTo(s,n=!1){return this.rotateTo(this._sphericalEnd.theta,s,n)}rotateTo(s,n,t=!1){this._isUserControllingRotate=!1;const u=JE(s,this.minAzimuthAngle,this.maxAzimuthAngle),o=JE(n,this.minPolarAngle,this.maxPolarAngle);this._sphericalEnd.theta=u,this._sphericalEnd.phi=o,this._sphericalEnd.makeSafe(),this._needsUpdate=!0,t||(this._spherical.theta=this._sphericalEnd.theta,this._spherical.phi=this._sphericalEnd.phi);const f=!t||kl(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&kl(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold);return this._createOnRestPromise(f)}dolly(s,n=!1){return this.dollyTo(this._sphericalEnd.radius-s,n)}dollyTo(s,n=!1){return this._isUserControllingDolly=!1,this._lastDollyDirection=QP.NONE,this._changedDolly=0,this._dollyToNoClamp(JE(s,this.minDistance,this.maxDistance),n)}_dollyToNoClamp(s,n=!1){const t=this._sphericalEnd.radius;if(this.colliderMeshes.length>=1){const o=this._collisionTest(),f=kl(o,this._spherical.radius);if(!(t>s)&&f)return Promise.resolve();this._sphericalEnd.radius=Math.min(s,o)}else this._sphericalEnd.radius=s;this._needsUpdate=!0,n||(this._spherical.radius=this._sphericalEnd.radius);const u=!n||kl(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(u)}dollyInFixed(s,n=!1){this._targetEnd.add(this._getCameraDirection(YH).multiplyScalar(s)),n||this._target.copy(this._targetEnd);const t=!n||kl(this._target.x,this._targetEnd.x,this.restThreshold)&&kl(this._target.y,this._targetEnd.y,this.restThreshold)&&kl(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(t)}zoom(s,n=!1){return this.zoomTo(this._zoomEnd+s,n)}zoomTo(s,n=!1){this._isUserControllingZoom=!1,this._zoomEnd=JE(s,this.minZoom,this.maxZoom),this._needsUpdate=!0,n||(this._zoom=this._zoomEnd);const t=!n||kl(this._zoom,this._zoomEnd,this.restThreshold);return this._changedZoom=0,this._createOnRestPromise(t)}pan(s,n,t=!1){return console.warn("`pan` has been renamed to `truck`"),this.truck(s,n,t)}truck(s,n,t=!1){this._camera.updateMatrix(),JT.setFromMatrixColumn(this._camera.matrix,0),XT.setFromMatrixColumn(this._camera.matrix,1),JT.multiplyScalar(s),XT.multiplyScalar(-n);const u=Fs.copy(JT).add(XT),o=Bl.copy(this._targetEnd).add(u);return this.moveTo(o.x,o.y,o.z,t)}forward(s,n=!1){Fs.setFromMatrixColumn(this._camera.matrix,0),Fs.crossVectors(this._camera.up,Fs),Fs.multiplyScalar(s);const t=Bl.copy(this._targetEnd).add(Fs);return this.moveTo(t.x,t.y,t.z,n)}elevate(s,n=!1){return Fs.copy(this._camera.up).multiplyScalar(s),this.moveTo(this._targetEnd.x+Fs.x,this._targetEnd.y+Fs.y,this._targetEnd.z+Fs.z,n)}moveTo(s,n,t,u=!1){this._isUserControllingTruck=!1;const o=Fs.set(s,n,t).sub(this._targetEnd);this._encloseToBoundary(this._targetEnd,o,this.boundaryFriction),this._needsUpdate=!0,u||this._target.copy(this._targetEnd);const f=!u||kl(this._target.x,this._targetEnd.x,this.restThreshold)&&kl(this._target.y,this._targetEnd.y,this.restThreshold)&&kl(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(f)}lookInDirectionOf(s,n,t,u=!1){const o=Fs.set(s,n,t).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius);return this.setPosition(o.x,o.y,o.z,u)}fitToBox(s,n,{cover:t=!1,paddingLeft:u=0,paddingRight:o=0,paddingBottom:f=0,paddingTop:d=0}={}){const m=[],D=s.isBox3?XP.copy(s):XP.setFromObject(s);D.isEmpty()&&(console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"),Promise.resolve());const P=lZ(this._sphericalEnd.theta,sZ),x=lZ(this._sphericalEnd.phi,sZ);m.push(this.rotateTo(P,x,n));const H=Fs.setFromSpherical(this._sphericalEnd).normalize(),_=cZ.setFromUnitVectors(H,_z),ne=kl(Math.abs(H.y),1);ne&&_.multiply(Wz.setFromAxisAngle(tV,P)),_.multiply(this._yAxisUpSpaceInverse);const re=oZ.makeEmpty();Bl.copy(D.min).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.min).setX(D.max.x).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.min).setY(D.max.y).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.max).setZ(D.min.z).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.min).setZ(D.max.z).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.max).setY(D.min.y).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.max).setX(D.min.x).applyQuaternion(_),re.expandByPoint(Bl),Bl.copy(D.max).applyQuaternion(_),re.expandByPoint(Bl),re.min.x-=u,re.min.y-=f,re.max.x+=o,re.max.y+=d,_.setFromUnitVectors(_z,H),ne&&_.premultiply(Wz.invert()),_.premultiply(this._yAxisUpSpace);const J=re.getSize(Fs),K=re.getCenter(Bl).applyQuaternion(_);if(_8(this._camera)){const Ie=this.getDistanceToFitBox(J.x,J.y,J.z,t);m.push(this.moveTo(K.x,K.y,K.z,n)),m.push(this.dollyTo(Ie,n)),m.push(this.setFocalOffset(0,0,0,n))}else if(jS(this._camera)){const Ie=this._camera,ce=Ie.right-Ie.left,ae=Ie.top-Ie.bottom,me=t?Math.max(ce/J.x,ae/J.y):Math.min(ce/J.x,ae/J.y);m.push(this.moveTo(K.x,K.y,K.z,n)),m.push(this.zoomTo(me,n)),m.push(this.setFocalOffset(0,0,0,n))}return Promise.all(m)}fitToSphere(s,n){const t=[],u=s instanceof ys.Sphere?Vz.copy(s):WI.createBoundingSphere(s,Vz);if(t.push(this.moveTo(u.center.x,u.center.y,u.center.z,n)),_8(this._camera)){const o=this.getDistanceToFitSphere(u.radius);t.push(this.dollyTo(o,n))}else if(jS(this._camera)){const o=this._camera.right-this._camera.left,f=this._camera.top-this._camera.bottom,d=2*u.radius,m=Math.min(o/d,f/d);t.push(this.zoomTo(m,n))}return t.push(this.setFocalOffset(0,0,0,n)),Promise.all(t)}setLookAt(s,n,t,u,o,f,d=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=QP.NONE,this._changedDolly=0;const m=Bl.set(u,o,f),D=Fs.set(s,n,t);this._targetEnd.copy(m),this._sphericalEnd.setFromVector3(D.sub(m).applyQuaternion(this._yAxisUpSpace)),this.normalizeRotations(),this._needsUpdate=!0,d||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const P=!d||kl(this._target.x,this._targetEnd.x,this.restThreshold)&&kl(this._target.y,this._targetEnd.y,this.restThreshold)&&kl(this._target.z,this._targetEnd.z,this.restThreshold)&&kl(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&kl(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&kl(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(P)}lerpLookAt(s,n,t,u,o,f,d,m,D,P,x,H,_,ne=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=QP.NONE,this._changedDolly=0;const re=Fs.set(u,o,f),J=Bl.set(s,n,t);Z5.setFromVector3(J.sub(re).applyQuaternion(this._yAxisUpSpace));const K=JP.set(P,x,H),Ie=Bl.set(d,m,D);zH.setFromVector3(Ie.sub(K).applyQuaternion(this._yAxisUpSpace)),this._targetEnd.copy(re.lerp(K,_));const ce=zH.theta-Z5.theta,ae=zH.phi-Z5.phi,me=zH.radius-Z5.radius;this._sphericalEnd.set(Z5.radius+me*_,Z5.phi+ae*_,Z5.theta+ce*_),this.normalizeRotations(),this._needsUpdate=!0,ne||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const Ee=!ne||kl(this._target.x,this._targetEnd.x,this.restThreshold)&&kl(this._target.y,this._targetEnd.y,this.restThreshold)&&kl(this._target.z,this._targetEnd.z,this.restThreshold)&&kl(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&kl(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&kl(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(Ee)}setPosition(s,n,t,u=!1){return this.setLookAt(s,n,t,this._targetEnd.x,this._targetEnd.y,this._targetEnd.z,u)}setTarget(s,n,t,u=!1){const o=this.getPosition(Fs),f=this.setLookAt(o.x,o.y,o.z,s,n,t,u);return this._sphericalEnd.phi=JE(this._sphericalEnd.phi,this.minPolarAngle,this.maxPolarAngle),f}setFocalOffset(s,n,t,u=!1){this._isUserControllingOffset=!1,this._focalOffsetEnd.set(s,n,t),this._needsUpdate=!0,u||this._focalOffset.copy(this._focalOffsetEnd);const o=!u||kl(this._focalOffset.x,this._focalOffsetEnd.x,this.restThreshold)&&kl(this._focalOffset.y,this._focalOffsetEnd.y,this.restThreshold)&&kl(this._focalOffset.z,this._focalOffsetEnd.z,this.restThreshold);return this._createOnRestPromise(o)}setOrbitPoint(s,n,t){this._camera.updateMatrixWorld(),JT.setFromMatrixColumn(this._camera.matrixWorldInverse,0),XT.setFromMatrixColumn(this._camera.matrixWorldInverse,1),V8.setFromMatrixColumn(this._camera.matrixWorldInverse,2);const u=Fs.set(s,n,t),o=u.distanceTo(this._camera.position),f=u.sub(this._camera.position);JT.multiplyScalar(f.x),XT.multiplyScalar(f.y),V8.multiplyScalar(f.z),Fs.copy(JT).add(XT).add(V8),Fs.z=Fs.z+o,this.dollyTo(o,!1),this.setFocalOffset(-Fs.x,Fs.y,-Fs.z,!1),this.moveTo(s,n,t,!1)}setBoundary(s){if(!s){this._boundary.min.set(-1/0,-1/0,-1/0),this._boundary.max.set(1/0,1/0,1/0),this._needsUpdate=!0;return}this._boundary.copy(s),this._boundary.clampPoint(this._targetEnd,this._targetEnd),this._needsUpdate=!0}setViewport(s,n,t,u){if(s===null){this._viewport=null;return}this._viewport=this._viewport||new ys.Vector4,typeof s=="number"?this._viewport.set(s,n,t,u):this._viewport.copy(s)}getDistanceToFitBox(s,n,t,u=!1){if(Gz(this._camera,"getDistanceToFitBox"))return this._spherical.radius;const o=s/n,f=this._camera.getEffectiveFOV()*_H,d=this._camera.aspect;return((u?o>d:o<d)?n:s/d)*.5/Math.tan(f*.5)+t*.5}getDistanceToFitSphere(s){if(Gz(this._camera,"getDistanceToFitSphere"))return this._spherical.radius;const n=this._camera.getEffectiveFOV()*_H,t=Math.atan(Math.tan(n*.5)*this._camera.aspect)*2,u=1<this._camera.aspect?n:t;return s/Math.sin(u*.5)}getTarget(s,n=!0){return(s&&s.isVector3?s:new ys.Vector3).copy(n?this._targetEnd:this._target)}getPosition(s,n=!0){return(s&&s.isVector3?s:new ys.Vector3).setFromSpherical(n?this._sphericalEnd:this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(n?this._targetEnd:this._target)}getSpherical(s,n=!0){return(s&&s instanceof ys.Spherical?s:new ys.Spherical).copy(n?this._sphericalEnd:this._spherical)}getFocalOffset(s,n=!0){return(s&&s.isVector3?s:new ys.Vector3).copy(n?this._focalOffsetEnd:this._focalOffset)}normalizeRotations(){this._sphericalEnd.theta=this._sphericalEnd.theta%ZP,this._sphericalEnd.theta<0&&(this._sphericalEnd.theta+=ZP),this._spherical.theta+=ZP*Math.round((this._sphericalEnd.theta-this._spherical.theta)/ZP)}reset(s=!1){if(!kl(this._camera.up.x,this._cameraUp0.x)||!kl(this._camera.up.y,this._cameraUp0.y)||!kl(this._camera.up.z,this._cameraUp0.z)){this._camera.up.copy(this._cameraUp0);const t=this.getPosition(Fs);this.updateCameraUp(),this.setPosition(t.x,t.y,t.z)}const n=[this.setLookAt(this._position0.x,this._position0.y,this._position0.z,this._target0.x,this._target0.y,this._target0.z,s),this.setFocalOffset(this._focalOffset0.x,this._focalOffset0.y,this._focalOffset0.z,s),this.zoomTo(this._zoom0,s)];return Promise.all(n)}saveState(){this._cameraUp0.copy(this._camera.up),this.getTarget(this._target0),this.getPosition(this._position0),this._zoom0=this._zoom,this._focalOffset0.copy(this._focalOffset)}updateCameraUp(){this._yAxisUpSpace.setFromUnitVectors(this._camera.up,tV),this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert()}applyCameraUp(){const s=Fs.subVectors(this._target,this._camera.position).normalize(),n=Bl.crossVectors(s,this._camera.up);this._camera.up.crossVectors(n,s).normalize(),this._camera.updateMatrixWorld();const t=this.getPosition(Fs);this.updateCameraUp(),this.setPosition(t.x,t.y,t.z)}update(s){const n=this._sphericalEnd.theta-this._spherical.theta,t=this._sphericalEnd.phi-this._spherical.phi,u=this._sphericalEnd.radius-this._spherical.radius,o=uZ.subVectors(this._targetEnd,this._target),f=aZ.subVectors(this._focalOffsetEnd,this._focalOffset),d=this._zoomEnd-this._zoom;if(mr(n))this._thetaVelocity.value=0,this._spherical.theta=this._sphericalEnd.theta;else{const P=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.theta=v_(this._spherical.theta,this._sphericalEnd.theta,this._thetaVelocity,P,1/0,s),this._needsUpdate=!0}if(mr(t))this._phiVelocity.value=0,this._spherical.phi=this._sphericalEnd.phi;else{const P=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.phi=v_(this._spherical.phi,this._sphericalEnd.phi,this._phiVelocity,P,1/0,s),this._needsUpdate=!0}if(mr(u))this._radiusVelocity.value=0,this._spherical.radius=this._sphericalEnd.radius;else{const P=this._isUserControllingDolly?this.draggingSmoothTime:this.smoothTime;this._spherical.radius=v_(this._spherical.radius,this._sphericalEnd.radius,this._radiusVelocity,P,this.maxSpeed,s),this._needsUpdate=!0}if(mr(o.x)&&mr(o.y)&&mr(o.z))this._targetVelocity.set(0,0,0),this._target.copy(this._targetEnd);else{const P=this._isUserControllingTruck?this.draggingSmoothTime:this.smoothTime;rZ(this._target,this._targetEnd,this._targetVelocity,P,this.maxSpeed,s,this._target),this._needsUpdate=!0}if(mr(f.x)&&mr(f.y)&&mr(f.z))this._focalOffsetVelocity.set(0,0,0),this._focalOffset.copy(this._focalOffsetEnd);else{const P=this._isUserControllingOffset?this.draggingSmoothTime:this.smoothTime;rZ(this._focalOffset,this._focalOffsetEnd,this._focalOffsetVelocity,P,this.maxSpeed,s,this._focalOffset),this._needsUpdate=!0}if(mr(d))this._zoomVelocity.value=0,this._zoom=this._zoomEnd;else{const P=this._isUserControllingZoom?this.draggingSmoothTime:this.smoothTime;this._zoom=v_(this._zoom,this._zoomEnd,this._zoomVelocity,P,1/0,s)}if(this.dollyToCursor){if(_8(this._camera)&&this._changedDolly!==0){const P=this._spherical.radius-this._lastDistance,x=this._camera,H=this._getCameraDirection(YH),_=Fs.copy(H).cross(x.up).normalize();_.lengthSq()===0&&(_.x=1);const ne=Bl.crossVectors(_,H),re=this._sphericalEnd.radius*Math.tan(x.getEffectiveFOV()*_H*.5),J=(this._sphericalEnd.radius-P-this._sphericalEnd.radius)/this._sphericalEnd.radius,K=JP.copy(this._targetEnd).add(_.multiplyScalar(this._dollyControlCoord.x*re*x.aspect)).add(ne.multiplyScalar(this._dollyControlCoord.y*re)),Ie=Fs.copy(this._targetEnd).lerp(K,J),ce=this._lastDollyDirection===QP.IN&&this._spherical.radius<=this.minDistance,ae=this._lastDollyDirection===QP.OUT&&this.maxDistance<=this._spherical.radius;if(this.infinityDolly&&(ce||ae)){this._sphericalEnd.radius-=P,this._spherical.radius-=P;const Ee=Bl.copy(H).multiplyScalar(-P);Ie.add(Ee)}this._boundary.clampPoint(Ie,Ie);const me=Bl.subVectors(Ie,this._targetEnd);this._targetEnd.copy(Ie),this._target.add(me),this._changedDolly-=P,mr(this._changedDolly)&&(this._changedDolly=0)}else if(jS(this._camera)&&this._changedZoom!==0){const P=this._zoom-this._lastZoom,x=this._camera,H=Fs.set(this._dollyControlCoord.x,this._dollyControlCoord.y,(x.near+x.far)/(x.near-x.far)).unproject(x),_=Bl.set(0,0,-1).applyQuaternion(x.quaternion),ne=JP.copy(H).add(_.multiplyScalar(-H.dot(x.up))),re=-(this._zoom-P-this._zoom)/this._zoom,J=this._getCameraDirection(YH),K=this._targetEnd.dot(J),Ie=Fs.copy(this._targetEnd).lerp(ne,re),ce=Ie.dot(J),ae=J.multiplyScalar(ce-K);Ie.sub(ae),this._boundary.clampPoint(Ie,Ie);const me=Bl.subVectors(Ie,this._targetEnd);this._targetEnd.copy(Ie),this._target.add(me),this._changedZoom-=P,mr(this._changedZoom)&&(this._changedZoom=0)}}this._camera.zoom!==this._zoom&&(this._camera.zoom=this._zoom,this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0),this._dragNeedsUpdate=!0;const m=this._collisionTest();this._spherical.radius=Math.min(this._spherical.radius,m),this._spherical.makeSafe(),this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target),this._camera.lookAt(this._target),(!mr(this._focalOffset.x)||!mr(this._focalOffset.y)||!mr(this._focalOffset.z))&&(this._camera.updateMatrixWorld(),JT.setFromMatrixColumn(this._camera.matrix,0),XT.setFromMatrixColumn(this._camera.matrix,1),V8.setFromMatrixColumn(this._camera.matrix,2),JT.multiplyScalar(this._focalOffset.x),XT.multiplyScalar(-this._focalOffset.y),V8.multiplyScalar(this._focalOffset.z),Fs.copy(JT).add(XT).add(V8),this._camera.position.add(Fs)),this._boundaryEnclosesCamera&&this._encloseToBoundary(this._camera.position.copy(this._target),Fs.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),1);const D=this._needsUpdate;return D&&!this._updatedLastTime?(this._hasRested=!1,this.dispatchEvent({type:"wake"}),this.dispatchEvent({type:"update"})):D?(this.dispatchEvent({type:"update"}),mr(n,this.restThreshold)&&mr(t,this.restThreshold)&&mr(u,this.restThreshold)&&mr(o.x,this.restThreshold)&&mr(o.y,this.restThreshold)&&mr(o.z,this.restThreshold)&&mr(f.x,this.restThreshold)&&mr(f.y,this.restThreshold)&&mr(f.z,this.restThreshold)&&mr(d,this.restThreshold)&&!this._hasRested&&(this._hasRested=!0,this.dispatchEvent({type:"rest"}))):!D&&this._updatedLastTime&&this.dispatchEvent({type:"sleep"}),this._lastDistance=this._spherical.radius,this._lastZoom=this._zoom,this._updatedLastTime=D,this._needsUpdate=!1,D}toJSON(){return JSON.stringify({enabled:this._enabled,minDistance:this.minDistance,maxDistance:VH(this.maxDistance),minZoom:this.minZoom,maxZoom:VH(this.maxZoom),minPolarAngle:this.minPolarAngle,maxPolarAngle:VH(this.maxPolarAngle),minAzimuthAngle:VH(this.minAzimuthAngle),maxAzimuthAngle:VH(this.maxAzimuthAngle),smoothTime:this.smoothTime,draggingSmoothTime:this.draggingSmoothTime,dollySpeed:this.dollySpeed,truckSpeed:this.truckSpeed,dollyToCursor:this.dollyToCursor,verticalDragToForward:this.verticalDragToForward,target:this._targetEnd.toArray(),position:Fs.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),zoom:this._zoomEnd,focalOffset:this._focalOffsetEnd.toArray(),target0:this._target0.toArray(),position0:this._position0.toArray(),zoom0:this._zoom0,focalOffset0:this._focalOffset0.toArray()})}fromJSON(s,n=!1){const t=JSON.parse(s);this.enabled=t.enabled,this.minDistance=t.minDistance,this.maxDistance=WH(t.maxDistance),this.minZoom=t.minZoom,this.maxZoom=WH(t.maxZoom),this.minPolarAngle=t.minPolarAngle,this.maxPolarAngle=WH(t.maxPolarAngle),this.minAzimuthAngle=WH(t.minAzimuthAngle),this.maxAzimuthAngle=WH(t.maxAzimuthAngle),this.smoothTime=t.smoothTime,this.draggingSmoothTime=t.draggingSmoothTime,this.dollySpeed=t.dollySpeed,this.truckSpeed=t.truckSpeed,this.dollyToCursor=t.dollyToCursor,this.verticalDragToForward=t.verticalDragToForward,this._target0.fromArray(t.target0),this._position0.fromArray(t.position0),this._zoom0=t.zoom0,this._focalOffset0.fromArray(t.focalOffset0),this.moveTo(t.target[0],t.target[1],t.target[2],n),Z5.setFromVector3(Fs.fromArray(t.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)),this.rotateTo(Z5.theta,Z5.phi,n),this.dollyTo(Z5.radius,n),this.zoomTo(t.zoom,n),this.setFocalOffset(t.focalOffset[0],t.focalOffset[1],t.focalOffset[2],n),this._needsUpdate=!0}connect(s){if(this._domElement){console.warn("camera-controls is already connected.");return}s.setAttribute("data-camera-controls-version",M0e),this._addAllEventListeners(s),this._getClientRect(this._elementRect)}disconnect(){this.cancel(),this._removeAllEventListeners(),this._domElement&&(this._domElement.removeAttribute("data-camera-controls-version"),this._domElement=void 0)}dispose(){this.removeAllEventListeners(),this.disconnect()}_getTargetDirection(s){return s.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse)}_getCameraDirection(s){return this._getTargetDirection(s).negate()}_findPointerById(s){return this._activePointers.find(n=>n.pointerId===s)}_findPointerByMouseButton(s){return this._activePointers.find(n=>n.mouseButton===s)}_disposePointer(s){this._activePointers.splice(this._activePointers.indexOf(s),1)}_encloseToBoundary(s,n,t){const u=n.lengthSq();if(u===0)return s;const o=Bl.copy(n).add(s),f=this._boundary.clampPoint(o,JP).sub(o),d=f.lengthSq();if(d===0)return s.add(n);if(d===u)return s;if(t===0)return s.add(n).add(f);{const m=1+t*d/n.dot(f);return s.add(Bl.copy(n).multiplyScalar(m)).add(f.multiplyScalar(1-t))}}_updateNearPlaneCorners(){if(_8(this._camera)){const s=this._camera,n=s.near,t=s.getEffectiveFOV()*_H,u=Math.tan(t*.5)*n,o=u*s.aspect;this._nearPlaneCorners[0].set(-o,-u,0),this._nearPlaneCorners[1].set(o,-u,0),this._nearPlaneCorners[2].set(o,u,0),this._nearPlaneCorners[3].set(-o,u,0)}else if(jS(this._camera)){const s=this._camera,n=1/s.zoom,t=s.left*n,u=s.right*n,o=s.top*n,f=s.bottom*n;this._nearPlaneCorners[0].set(t,o,0),this._nearPlaneCorners[1].set(u,o,0),this._nearPlaneCorners[2].set(u,f,0),this._nearPlaneCorners[3].set(t,f,0)}}_collisionTest(){let s=1/0;if(!(this.colliderMeshes.length>=1)||Gz(this._camera,"_collisionTest"))return s;const n=this._getTargetDirection(YH);Yz.lookAt(iZ,n,this._camera.up);for(let t=0;t<4;t++){const u=Bl.copy(this._nearPlaneCorners[t]);u.applyMatrix4(Yz);const o=JP.addVectors(this._target,u);nV.set(o,n),nV.far=this._spherical.radius+1;const f=nV.intersectObjects(this.colliderMeshes);f.length!==0&&f[0].distance<s&&(s=f[0].distance)}return s}_getClientRect(s){if(!this._domElement)return;const n=this._domElement.getBoundingClientRect();return s.x=n.left,s.y=n.top,this._viewport?(s.x+=this._viewport.x,s.y+=n.height-this._viewport.w-this._viewport.y,s.width=this._viewport.z,s.height=this._viewport.w):(s.width=n.width,s.height=n.height),s}_createOnRestPromise(s){return s?Promise.resolve():(this._hasRested=!1,this.dispatchEvent({type:"transitionstart"}),new Promise(n=>{const t=()=>{this.removeEventListener("rest",t),n()};this.addEventListener("rest",t)}))}_addAllEventListeners(s){}_removeAllEventListeners(){}get dampingFactor(){return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."),0}set dampingFactor(s){console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.")}get draggingDampingFactor(){return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."),0}set draggingDampingFactor(s){console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.")}static createBoundingSphere(s,n=new ys.Sphere){const t=n,u=t.center;XP.makeEmpty(),s.traverseVisible(f=>{f.isMesh&&XP.expandByObject(f)}),XP.getCenter(u);let o=0;return s.traverseVisible(f=>{if(!f.isMesh)return;const d=f,m=d.geometry.clone();m.applyMatrix4(d.matrixWorld);const D=m.attributes.position;for(let P=0,x=D.count;P<x;P++)Fs.fromBufferAttribute(D,P),o=Math.max(o,u.distanceToSquared(Fs))}),t.radius=Math.sqrt(o),t}}class oG extends I0e{constructor(s){super(s),qe(this,"onBeforeUpdate",new Nn),qe(this,"onAfterUpdate",new Nn),qe(this,"onAspectUpdated",new Nn),qe(this,"onDisposed",new Nn),qe(this,"three"),qe(this,"_allControls",new Map),qe(this,"updateAspect",()=>{var n;if(!(!this.currentWorld||!this.currentWorld.renderer)){if(this.three instanceof gG){this.onAspectUpdated.trigger();return}if((n=this.currentWorld.renderer)!=null&&n.isResizeable()){const t=this.currentWorld.renderer.getSize();this.three.aspect=t.width/t.height,this.three.updateProjectionMatrix(),this.onAspectUpdated.trigger()}}}),this.three=this.setupCamera(),this.setupEvents(!0),this.onWorldChanged.add(({action:n,world:t})=>{if(n==="added"){const u=this.newCameraControls();this._allControls.set(t.uuid,u)}if(n==="removed"){const u=this._allControls.get(t.uuid);u&&(u.dispose(),this._allControls.delete(t.uuid))}})}get controls(){if(!this.currentWorld)throw new Error("This camera needs a world to work!");const s=this._allControls.get(this.currentWorld.uuid);if(!s)throw new Error("Controls not found!");return s}get enabled(){return this.currentWorld===null?!1:this.controls.enabled}set enabled(s){this.controls.enabled=s}dispose(){this.setupEvents(!1),this.enabled=!1,this.onAspectUpdated.reset(),this.onBeforeUpdate.reset(),this.onAfterUpdate.reset(),this.three.removeFromParent(),this.onDisposed.trigger(),this.onDisposed.reset();for(const[s,n]of this._allControls)n.dispose()}update(s){this.enabled&&(this.onBeforeUpdate.trigger(this),this.controls.update(s),this.onAfterUpdate.trigger(this))}setupCamera(){const s=window.innerWidth/window.innerHeight,n=new ew(60,s,1,1e3);return n.position.set(50,50,50),n.lookAt(new ze(0,0,0)),n}newCameraControls(){if(!this.currentWorld)throw new Error("This camera needs a world to work!");if(!this.currentWorld.renderer)throw new Error("This camera needs a renderer to work!");WI.install({THREE:oG.getSubsetOfThree()});const{domElement:s}=this.currentWorld.renderer.three,n=new WI(this.three,s);return n.smoothTime=.2,n.dollyToCursor=!0,n.infinityDolly=!0,n}setupEvents(s){s?window.addEventListener("resize",this.updateAspect):window.removeEventListener("resize",this.updateAspect)}static getSubsetOfThree(){return{MOUSE:Ese,Vector2:us,Vector3:ze,Vector4:Uc,Quaternion:pI,Matrix4:Fn,Spherical:ace,Box3:tl,Sphere:Sw,Raycaster:Vk,MathUtils:hX}}}const qv=class $v extends ao{constructor(s){super(s),qe(this,"onAfterUpdate",new Nn),qe(this,"onBeforeUpdate",new Nn),qe(this,"onDisposed",new Nn),qe(this,"list",new Map),qe(this,"enabled",!0),s.add($v.uuid,this)}create(){const s=new C0e(this.components),n=s.uuid;if(this.list.has(n))throw new Error("There is already a world with this name!");return this.list.set(n,s),s}delete(s){this.list.delete(s.uuid),s.dispose()}dispose(){this.enabled=!1;for(const[s,n]of this.list)n.dispose();this.list.clear(),this.onDisposed.trigger()}update(s){if(this.enabled)for(const[n,t]of this.list)t.update(s)}};qe(qv,"uuid","fdb61dc4-2ec1-4966-b83d-54ea795fad4a");let B0e=qv;class H0e{constructor(s,n,t){qe(this,"onDisposed",new Nn),qe(this,"world"),qe(this,"components"),qe(this,"three"),qe(this,"_fade",3),qe(this,"updateZoom",()=>{this.world.camera instanceof oG&&(this.material.uniforms.uZoom.value=this.world.camera.three.zoom)}),this.world=n;const{color:u,size1:o,size2:f,distance:d}=t;this.components=s;const m=new wM(2,2,1,1),D=new fN({side:Z0,uniforms:{uSize1:{value:o},uSize2:{value:f},uColor:{value:u},uDistance:{value:d},uFade:{value:this._fade},uZoom:{value:1}},transparent:!0,vertexShader:`
            
            varying vec3 worldPosition;
            
            uniform float uDistance;
            
            void main() {
            
                    vec3 pos = position.xzy * uDistance;
                    pos.xz += cameraPosition.xz;
                    
                    worldPosition = pos;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            
            }
            `,fragmentShader:`
            
            varying vec3 worldPosition;
            
            uniform float uZoom;
            uniform float uFade;
            uniform float uSize1;
            uniform float uSize2;
            uniform vec3 uColor;
            uniform float uDistance;
                
                
                
                float getGrid(float size) {
                
                    vec2 r = worldPosition.xz / size;
                    
                    
                    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
                    float line = min(grid.x, grid.y);
                    
                
                    return 1.0 - min(line, 1.0);
                }
                
            void main() {
            
                    
                    float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / uDistance, 1.0);
                    
                    float g1 = getGrid(uSize1);
                    float g2 = getGrid(uSize2);
                    
                    // Ortho camera fades the grid away when zooming out
                    float minZoom = step(0.2, uZoom);
                    float zoomFactor = pow(min(uZoom, 1.), 2.) * minZoom;
                    
                    gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, uFade));
                    gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2) * zoomFactor;
                    
                    if ( gl_FragColor.a <= 0.0 ) discard;
                    
            
            }
            
            `,extensions:{derivatives:!0}});this.three=new mn(m,D),this.three.frustumCulled=!1,n.scene.three.add(this.three),this.setupEvents(!0)}get visible(){return this.three.visible}set visible(s){s?this.world.scene.three.add(this.three):this.three.removeFromParent()}get material(){return this.three.material}get fade(){return this._fade===3}set fade(s){this._fade=s?3:0,this.material.uniforms.uFade.value=this._fade}[Symbol.dispose](){throw new Error("Method not implemented.")}dispose(){this.setupEvents(!1),this.components.get(iM).destroy(this.three),this.onDisposed.trigger(),this.onDisposed.reset(),this.world=null,this.components=null}setupEvents(s){if(!(this.world.camera instanceof oG))return;const n=this.world.camera.controls;s?n.addEventListener("update",this.updateZoom):n.removeEventListener("update",this.updateZoom)}}class F0e extends ao{constructor(){super(...arguments),qe(this,"list",new Map),qe(this,"onDisposed",new Nn),qe(this,"config",{color:new ps(12303291),size1:1,size2:10,distance:500}),qe(this,"enabled",!0)}create(s){if(this.list.has(s.uuid))throw new Error("This world already has a grid!");const n=new H0e(this.components,s,this.config);return this.list.set(s.uuid,n),s.onDisposed.add(()=>{this.delete(s)}),n}delete(s){const n=this.list.get(s.uuid);n&&n.dispose(),this.list.delete(s.uuid)}dispose(){for(const[s,n]of this.list)n.dispose();this.list.clear(),this.onDisposed.trigger()}}qe(F0e,"uuid","d1e814d5-b81c-4452-87a2-f039375e0489");const W8=new Vk,EI=new ze,fS=new ze,ji=new pI,hZ={X:new ze(1,0,0),Y:new ze(0,1,0),Z:new ze(0,0,1)},zz={type:"change"},fZ={type:"mouseDown"},dZ={type:"mouseUp",mode:null},IZ={type:"objectChange"};class G0e extends wa{constructor(s,n){super(),n===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),n=document),this.isTransformControls=!0,this.visible=!1,this.domElement=n,this.domElement.style.touchAction="none";const t=new j0e;this._gizmo=t,this.add(t);const u=new k0e;this._plane=u,this.add(u);const o=this;function f(Ie,ce){let ae=ce;Object.defineProperty(o,Ie,{get:function(){return ae!==void 0?ae:ce},set:function(me){ae!==me&&(ae=me,u[Ie]=me,t[Ie]=me,o.dispatchEvent({type:Ie+"-changed",value:me}),o.dispatchEvent(zz))}}),o[Ie]=ce,u[Ie]=ce,t[Ie]=ce}f("camera",s),f("object",void 0),f("enabled",!0),f("axis",null),f("mode","translate"),f("translationSnap",null),f("rotationSnap",null),f("scaleSnap",null),f("space","world"),f("size",1),f("dragging",!1),f("showX",!0),f("showY",!0),f("showZ",!0);const d=new ze,m=new ze,D=new pI,P=new pI,x=new ze,H=new pI,_=new ze,ne=new ze,re=new ze,J=0,K=new ze;f("worldPosition",d),f("worldPositionStart",m),f("worldQuaternion",D),f("worldQuaternionStart",P),f("cameraPosition",x),f("cameraQuaternion",H),f("pointStart",_),f("pointEnd",ne),f("rotationAxis",re),f("rotationAngle",J),f("eye",K),this._offset=new ze,this._startNorm=new ze,this._endNorm=new ze,this._cameraScale=new ze,this._parentPosition=new ze,this._parentQuaternion=new pI,this._parentQuaternionInv=new pI,this._parentScale=new ze,this._worldScaleStart=new ze,this._worldQuaternionInv=new pI,this._worldScale=new ze,this._positionStart=new ze,this._quaternionStart=new pI,this._scaleStart=new ze,this._getPointer=_0e.bind(this),this._onPointerDown=W0e.bind(this),this._onPointerHover=V0e.bind(this),this._onPointerMove=Y0e.bind(this),this._onPointerUp=z0e.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(s){if(this.object===void 0||this.dragging===!0)return;W8.setFromCamera(s,this.camera);const n=jz(this._gizmo.picker[this.mode],W8);n?this.axis=n.object.name:this.axis=null}pointerDown(s){if(!(this.object===void 0||this.dragging===!0||s.button!==0)&&this.axis!==null){W8.setFromCamera(s,this.camera);const n=jz(this._plane,W8,!0);n&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(n.point).sub(this.worldPositionStart)),this.dragging=!0,fZ.mode=this.mode,this.dispatchEvent(fZ)}}pointerMove(s){const n=this.axis,t=this.mode,u=this.object;let o=this.space;if(t==="scale"?o="local":(n==="E"||n==="XYZE"||n==="XYZ")&&(o="world"),u===void 0||n===null||this.dragging===!1||s.button!==-1)return;W8.setFromCamera(s,this.camera);const f=jz(this._plane,W8,!0);if(f){if(this.pointEnd.copy(f.point).sub(this.worldPositionStart),t==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),o==="local"&&n!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),n.indexOf("X")===-1&&(this._offset.x=0),n.indexOf("Y")===-1&&(this._offset.y=0),n.indexOf("Z")===-1&&(this._offset.z=0),o==="local"&&n!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),u.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(o==="local"&&(u.position.applyQuaternion(ji.copy(this._quaternionStart).invert()),n.search("X")!==-1&&(u.position.x=Math.round(u.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(u.position.y=Math.round(u.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(u.position.z=Math.round(u.position.z/this.translationSnap)*this.translationSnap),u.position.applyQuaternion(this._quaternionStart)),o==="world"&&(u.parent&&u.position.add(EI.setFromMatrixPosition(u.parent.matrixWorld)),n.search("X")!==-1&&(u.position.x=Math.round(u.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(u.position.y=Math.round(u.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(u.position.z=Math.round(u.position.z/this.translationSnap)*this.translationSnap),u.parent&&u.position.sub(EI.setFromMatrixPosition(u.parent.matrixWorld))));else if(t==="scale"){if(n.search("XYZ")!==-1){let d=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(d*=-1),fS.set(d,d,d)}else EI.copy(this.pointStart),fS.copy(this.pointEnd),EI.applyQuaternion(this._worldQuaternionInv),fS.applyQuaternion(this._worldQuaternionInv),fS.divide(EI),n.search("X")===-1&&(fS.x=1),n.search("Y")===-1&&(fS.y=1),n.search("Z")===-1&&(fS.z=1);u.scale.copy(this._scaleStart).multiply(fS),this.scaleSnap&&(n.search("X")!==-1&&(u.scale.x=Math.round(u.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Y")!==-1&&(u.scale.y=Math.round(u.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Z")!==-1&&(u.scale.z=Math.round(u.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(t==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const d=20/this.worldPosition.distanceTo(EI.setFromMatrixPosition(this.camera.matrixWorld));let m=!1;n==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(EI.copy(this.rotationAxis).cross(this.eye))*d):(n==="X"||n==="Y"||n==="Z")&&(this.rotationAxis.copy(hZ[n]),EI.copy(hZ[n]),o==="local"&&EI.applyQuaternion(this.worldQuaternion),EI.cross(this.eye),EI.length()===0?m=!0:this.rotationAngle=this._offset.dot(EI.normalize())*d),(n==="E"||m)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),o==="local"&&n!=="E"&&n!=="XYZE"?(u.quaternion.copy(this._quaternionStart),u.quaternion.multiply(ji.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),u.quaternion.copy(ji.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),u.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(zz),this.dispatchEvent(IZ)}}pointerUp(s){s.button===0&&(this.dragging&&this.axis!==null&&(dZ.mode=this.mode,this.dispatchEvent(dZ)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(s){s.geometry&&s.geometry.dispose(),s.material&&s.material.dispose()})}attach(s){return this.object=s,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(zz),this.dispatchEvent(IZ),this.pointStart.copy(this.pointEnd))}getRaycaster(){return W8}getMode(){return this.mode}setMode(s){this.mode=s}setTranslationSnap(s){this.translationSnap=s}setRotationSnap(s){this.rotationSnap=s}setScaleSnap(s){this.scaleSnap=s}setSize(s){this.size=s}setSpace(s){this.space=s}}function _0e(e){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:e.button};{const s=this.domElement.getBoundingClientRect();return{x:(e.clientX-s.left)/s.width*2-1,y:-(e.clientY-s.top)/s.height*2+1,button:e.button}}}function V0e(e){if(this.enabled)switch(e.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(e));break}}function W0e(e){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(e)),this.pointerDown(this._getPointer(e)))}function Y0e(e){this.enabled&&this.pointerMove(this._getPointer(e))}function z0e(e){this.enabled&&(this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(e)))}function jz(e,s,n){const t=s.intersectObject(e,!0);for(let u=0;u<t.length;u++)if(t[u].object.visible||n)return t[u];return!1}const sV=new NG,cr=new ze(0,1,0),yZ=new ze(0,0,0),wZ=new Fn,lV=new pI,jV=new pI,vT=new ze,EZ=new Fn,NF=new ze(1,0,0),bO=new ze(0,1,0),gF=new ze(0,0,1),rV=new ze,jH=new ze,kH=new ze;class j0e extends wa{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const s=new hN({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=new bW({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=s.clone();t.opacity=.15;const u=n.clone();u.opacity=.5;const o=s.clone();o.color.setHex(16711680);const f=s.clone();f.color.setHex(65280);const d=s.clone();d.color.setHex(255);const m=s.clone();m.color.setHex(16711680),m.opacity=.5;const D=s.clone();D.color.setHex(65280),D.opacity=.5;const P=s.clone();P.color.setHex(255),P.opacity=.5;const x=s.clone();x.opacity=.25;const H=s.clone();H.color.setHex(16776960),H.opacity=.25,s.clone().color.setHex(16776960);const _=s.clone();_.color.setHex(7895160);const ne=new uf(0,.04,.1,12);ne.translate(0,.05,0);const re=new Pa(.08,.08,.08);re.translate(0,.04,0);const J=new Mi;J.setAttribute("position",new bi([0,0,0,1,0,0],3));const K=new uf(.0075,.0075,.5,3);K.translate(0,.25,0);function Ie(Ze,it){const ot=new MO(Ze,.0075,3,64,it*Math.PI*2);return ot.rotateY(Math.PI/2),ot.rotateX(Math.PI/2),ot}function ce(){const Ze=new Mi;return Ze.setAttribute("position",new bi([0,0,0,1,1,1],3)),Ze}const ae={X:[[new mn(ne,o),[.5,0,0],[0,0,-Math.PI/2]],[new mn(ne,o),[-.5,0,0],[0,0,Math.PI/2]],[new mn(K,o),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new mn(ne,f),[0,.5,0]],[new mn(ne,f),[0,-.5,0],[Math.PI,0,0]],[new mn(K,f)]],Z:[[new mn(ne,d),[0,0,.5],[Math.PI/2,0,0]],[new mn(ne,d),[0,0,-.5],[-Math.PI/2,0,0]],[new mn(K,d),null,[Math.PI/2,0,0]]],XYZ:[[new mn(new L9(.1,0),x.clone()),[0,0,0]]],XY:[[new mn(new Pa(.15,.15,.01),P.clone()),[.15,.15,0]]],YZ:[[new mn(new Pa(.15,.15,.01),m.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new mn(new Pa(.15,.15,.01),D.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},me={X:[[new mn(new uf(.2,0,.6,4),t),[.3,0,0],[0,0,-Math.PI/2]],[new mn(new uf(.2,0,.6,4),t),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new mn(new uf(.2,0,.6,4),t),[0,.3,0]],[new mn(new uf(.2,0,.6,4),t),[0,-.3,0],[0,0,Math.PI]]],Z:[[new mn(new uf(.2,0,.6,4),t),[0,0,.3],[Math.PI/2,0,0]],[new mn(new uf(.2,0,.6,4),t),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new mn(new L9(.2,0),t)]],XY:[[new mn(new Pa(.2,.2,.01),t),[.15,.15,0]]],YZ:[[new mn(new Pa(.2,.2,.01),t),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new mn(new Pa(.2,.2,.01),t),[.15,0,.15],[-Math.PI/2,0,0]]]},Ee={START:[[new mn(new L9(.01,2),u),null,null,null,"helper"]],END:[[new mn(new L9(.01,2),u),null,null,null,"helper"]],DELTA:[[new Y6(ce(),u),null,null,null,"helper"]],X:[[new Y6(J,u.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Y6(J,u.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Y6(J,u.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},Ae={XYZE:[[new mn(Ie(.5,1),_),null,[0,Math.PI/2,0]]],X:[[new mn(Ie(.5,.5),o)]],Y:[[new mn(Ie(.5,.5),f),null,[0,0,-Math.PI/2]]],Z:[[new mn(Ie(.5,.5),d),null,[0,Math.PI/2,0]]],E:[[new mn(Ie(.75,1),H),null,[0,Math.PI/2,0]]]},Me={AXIS:[[new Y6(J,u.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},we={XYZE:[[new mn(new _k(.25,10,8),t)]],X:[[new mn(new MO(.5,.1,4,24),t),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new mn(new MO(.5,.1,4,24),t),[0,0,0],[Math.PI/2,0,0]]],Z:[[new mn(new MO(.5,.1,4,24),t),[0,0,0],[0,0,-Math.PI/2]]],E:[[new mn(new MO(.75,.1,2,24),t)]]},Te={X:[[new mn(re,o),[.5,0,0],[0,0,-Math.PI/2]],[new mn(K,o),[0,0,0],[0,0,-Math.PI/2]],[new mn(re,o),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new mn(re,f),[0,.5,0]],[new mn(K,f)],[new mn(re,f),[0,-.5,0],[0,0,Math.PI]]],Z:[[new mn(re,d),[0,0,.5],[Math.PI/2,0,0]],[new mn(K,d),[0,0,0],[Math.PI/2,0,0]],[new mn(re,d),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new mn(new Pa(.15,.15,.01),P),[.15,.15,0]]],YZ:[[new mn(new Pa(.15,.15,.01),m),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new mn(new Pa(.15,.15,.01),D),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new mn(new Pa(.1,.1,.1),x.clone())]]},je={X:[[new mn(new uf(.2,0,.6,4),t),[.3,0,0],[0,0,-Math.PI/2]],[new mn(new uf(.2,0,.6,4),t),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new mn(new uf(.2,0,.6,4),t),[0,.3,0]],[new mn(new uf(.2,0,.6,4),t),[0,-.3,0],[0,0,Math.PI]]],Z:[[new mn(new uf(.2,0,.6,4),t),[0,0,.3],[Math.PI/2,0,0]],[new mn(new uf(.2,0,.6,4),t),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new mn(new Pa(.2,.2,.01),t),[.15,.15,0]]],YZ:[[new mn(new Pa(.2,.2,.01),t),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new mn(new Pa(.2,.2,.01),t),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new mn(new Pa(.2,.2,.2),t),[0,0,0]]]},Ke={X:[[new Y6(J,u.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Y6(J,u.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Y6(J,u.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function lt(Ze){const it=new wa;for(const ot in Ze)for(let yt=Ze[ot].length;yt--;){const Rt=Ze[ot][yt][0].clone(),Ct=Ze[ot][yt][1],Bt=Ze[ot][yt][2],Ut=Ze[ot][yt][3],Ft=Ze[ot][yt][4];Rt.name=ot,Rt.tag=Ft,Ct&&Rt.position.set(Ct[0],Ct[1],Ct[2]),Bt&&Rt.rotation.set(Bt[0],Bt[1],Bt[2]),Ut&&Rt.scale.set(Ut[0],Ut[1],Ut[2]),Rt.updateMatrix();const Nt=Rt.geometry.clone();Nt.applyMatrix4(Rt.matrix),Rt.geometry=Nt,Rt.renderOrder=1/0,Rt.position.set(0,0,0),Rt.rotation.set(0,0,0),Rt.scale.set(1,1,1),it.add(Rt)}return it}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=lt(ae)),this.add(this.gizmo.rotate=lt(Ae)),this.add(this.gizmo.scale=lt(Te)),this.add(this.picker.translate=lt(me)),this.add(this.picker.rotate=lt(we)),this.add(this.picker.scale=lt(je)),this.add(this.helper.translate=lt(Ee)),this.add(this.helper.rotate=lt(Me)),this.add(this.helper.scale=lt(Ke)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(s){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:jV;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let t=[];t=t.concat(this.picker[this.mode].children),t=t.concat(this.gizmo[this.mode].children),t=t.concat(this.helper[this.mode].children);for(let u=0;u<t.length;u++){const o=t[u];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let f;if(this.camera.isOrthographicCamera?f=(this.camera.top-this.camera.bottom)/this.camera.zoom:f=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(f*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(ji.setFromEuler(sV.set(0,0,0)),o.quaternion.copy(n).multiply(ji),Math.abs(cr.copy(NF).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(ji.setFromEuler(sV.set(0,0,Math.PI/2)),o.quaternion.copy(n).multiply(ji),Math.abs(cr.copy(bO).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(ji.setFromEuler(sV.set(0,Math.PI/2,0)),o.quaternion.copy(n).multiply(ji),Math.abs(cr.copy(gF).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(ji.setFromEuler(sV.set(0,Math.PI/2,0)),cr.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(wZ.lookAt(yZ,cr,bO)),o.quaternion.multiply(ji),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),EI.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),EI.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(EI),o.visible=this.dragging):(o.quaternion.copy(n),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(cr.copy(NF).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(cr.copy(bO).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(cr.copy(gF).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(cr.copy(gF).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(cr.copy(NF).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(cr.copy(bO).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(lV.copy(n),cr.copy(this.eye).applyQuaternion(ji.copy(n).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(wZ.lookAt(this.eye,yZ,bO)),o.name==="X"&&(ji.setFromAxisAngle(NF,Math.atan2(-cr.y,cr.z)),ji.multiplyQuaternions(lV,ji),o.quaternion.copy(ji)),o.name==="Y"&&(ji.setFromAxisAngle(bO,Math.atan2(cr.x,cr.z)),ji.multiplyQuaternions(lV,ji),o.quaternion.copy(ji)),o.name==="Z"&&(ji.setFromAxisAngle(gF,Math.atan2(cr.y,cr.x)),ji.multiplyQuaternions(lV,ji),o.quaternion.copy(ji))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis||this.axis.split("").some(function(d){return o.name===d}))&&(o.material.color.setHex(16776960),o.material.opacity=1)}super.updateMatrixWorld(s)}}class k0e extends mn{constructor(){super(new wM(1e5,1e5,2,2),new hN({visible:!1,wireframe:!0,side:Z0,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(s){let n=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(n="local"),rV.copy(NF).applyQuaternion(n==="local"?this.worldQuaternion:jV),jH.copy(bO).applyQuaternion(n==="local"?this.worldQuaternion:jV),kH.copy(gF).applyQuaternion(n==="local"?this.worldQuaternion:jV),cr.copy(jH),this.mode){case"translate":case"scale":switch(this.axis){case"X":cr.copy(this.eye).cross(rV),vT.copy(rV).cross(cr);break;case"Y":cr.copy(this.eye).cross(jH),vT.copy(jH).cross(cr);break;case"Z":cr.copy(this.eye).cross(kH),vT.copy(kH).cross(cr);break;case"XY":vT.copy(kH);break;case"YZ":vT.copy(rV);break;case"XZ":cr.copy(kH),vT.copy(jH);break;case"XYZ":case"E":vT.set(0,0,0);break}break;case"rotate":default:vT.set(0,0,0)}vT.length()===0?this.quaternion.copy(this.cameraQuaternion):(EZ.lookAt(EI.set(0,0,0),vT,cr),this.quaternion.setFromRotationMatrix(EZ)),super.updateMatrixWorld(s)}}class xq{constructor(s,n,t,u,o,f=5,d=!0){if(qe(this,"onDraggingStarted",new Nn),qe(this,"onDraggingEnded",new Nn),qe(this,"onDisposed",new Nn),qe(this,"normal"),qe(this,"origin"),qe(this,"three",new Q0),qe(this,"_helper"),qe(this,"_visible",!0),qe(this,"_enabled",!0),qe(this,"components"),qe(this,"world"),qe(this,"_controlsActive",!1),qe(this,"_arrowBoundBox",new mn),qe(this,"_planeMesh"),qe(this,"_controls"),qe(this,"_hiddenMaterial",new hN({visible:!1})),qe(this,"update",()=>{this._enabled&&this.three.setFromNormalAndCoplanarPoint(this.normal,this._helper.position)}),qe(this,"changeDrag",m=>{this._visible=!m.value,this.preventCameraMovement(),this.notifyDraggingChanged(m)}),this.components=s,this.world=n,!n.renderer)throw new Error("The given world must have a renderer!");this.normal=u,this.origin=t,n.renderer.setPlane(!0,this.three),this._planeMesh=xq.newPlaneMesh(f,o),this._helper=this.newHelper(),this._controls=this.newTransformControls(),this.three.setFromNormalAndCoplanarPoint(u,t),d&&this.toggleControls(!0)}get enabled(){return this._enabled}set enabled(s){if(!this.world.renderer)throw new Error("No renderer found for clipping plane!");this._enabled=s,this.world.renderer.setPlane(s,this.three)}get visible(){return this._visible}set visible(s){this._visible=s,this._controls.visible=s,this._helper.visible=s,this.toggleControls(s)}get meshes(){return[this._planeMesh,this._arrowBoundBox]}get planeMaterial(){return this._planeMesh.material}set planeMaterial(s){this._planeMesh.material=s}get size(){return this._planeMesh.scale.x}set size(s){this._planeMesh.scale.set(s,s,s)}get helper(){return this._helper}setFromNormalAndCoplanarPoint(s,n){this.reset(),this.normal.equals(s)||(this.normal.copy(s),this._helper.lookAt(s)),this.origin.copy(n),this._helper.position.copy(n),this._helper.updateMatrix(),this.update()}dispose(){this._enabled=!1,this.onDraggingStarted.reset(),this.onDraggingEnded.reset(),this._helper.removeFromParent(),this.world.renderer&&this.world.renderer.setPlane(!1,this.three),this._arrowBoundBox.removeFromParent(),this._arrowBoundBox.geometry.dispose(),this._planeMesh.geometry.dispose(),this._controls.removeFromParent(),this._controls.dispose(),this.onDisposed.trigger(),this.onDisposed.reset()}reset(){const s=new ze(1,0,0),n=new ze;this.normal.equals(s)||(this.normal.copy(s),this._helper.lookAt(s)),this.origin.copy(n),this._helper.position.copy(n),this._helper.updateMatrix()}toggleControls(s){if(s){if(this._controlsActive)return;this._controls.addEventListener("change",this.update),this._controls.addEventListener("dragging-changed",this.changeDrag)}else this._controls.removeEventListener("change",this.update),this._controls.removeEventListener("dragging-changed",this.changeDrag);this._controlsActive=s}newTransformControls(){if(!this.world.renderer)throw new Error("No renderer found for clipping plane!");const s=this.world.camera.three,n=this.world.renderer.three.domElement,t=new G0e(s,n);return this.initializeControls(t),this.world.scene.three.add(t),t}initializeControls(s){s.attach(this._helper),s.showX=!1,s.showY=!1,s.setSpace("local"),this.createArrowBoundingBox(),s.children[0].children[0].add(this._arrowBoundBox)}createArrowBoundingBox(){this._arrowBoundBox.geometry=new uf(.18,.18,1.2),this._arrowBoundBox.material=this._hiddenMaterial,this._arrowBoundBox.rotateX(Math.PI/2),this._arrowBoundBox.updateMatrix(),this._arrowBoundBox.geometry.applyMatrix4(this._arrowBoundBox.matrix)}notifyDraggingChanged(s){s.value?this.onDraggingStarted.trigger():this.onDraggingEnded.trigger()}preventCameraMovement(){this.world.camera.enabled=this._visible}newHelper(){const s=new wa;return s.lookAt(this.normal),s.position.copy(this.origin),this._planeMesh.position.z+=.01,s.add(this._planeMesh),this.world.scene.three.add(s),s}static newPlaneMesh(s,n){const t=new wM(1),u=new mn(t,n);return u.scale.set(s,s,s),u}}const q0e=class uk extends ao{constructor(s){super(s),qe(this,"onAfterCreate",new Nn),qe(this,"onAfterDelete",new Nn),qe(this,"onBeforeDrag",new Nn),qe(this,"onAfterDrag",new Nn),qe(this,"onBeforeCreate",new Nn),qe(this,"onBeforeCancel",new Nn),qe(this,"onAfterCancel",new Nn),qe(this,"onBeforeDelete",new Nn),qe(this,"onDisposed",new Nn),qe(this,"orthogonalY",!1),qe(this,"toleranceOrthogonalY",.7),qe(this,"Type",xq),qe(this,"list",[]),qe(this,"_material",new hN({color:12255487,side:Z0,transparent:!0,opacity:.2})),qe(this,"_size",5),qe(this,"_enabled",!1),qe(this,"_visible",!0),qe(this,"_onStartDragging",()=>{this.onBeforeDrag.trigger()}),qe(this,"_onEndDragging",()=>{this.onAfterDrag.trigger()}),this.components.add(uk.uuid,this)}get enabled(){return this._enabled}set enabled(s){this._enabled=s;for(const n of this.list)n.enabled=s;this.updateMaterialsAndPlanes()}get visible(){return this._visible}set visible(s){this._visible=s;for(const n of this.list)n.visible=s}get material(){return this._material}set material(s){this._material=s;for(const n of this.list)n.planeMaterial=s}get size(){return this._size}set size(s){this._size=s;for(const n of this.list)n.size=s}dispose(){this._enabled=!1;for(const s of this.list)s.dispose();this.list.length=0,this._material.dispose(),this.onBeforeCreate.reset(),this.onBeforeCancel.reset(),this.onBeforeDelete.reset(),this.onBeforeDrag.reset(),this.onAfterCreate.reset(),this.onAfterCancel.reset(),this.onAfterDelete.reset(),this.onAfterDrag.reset(),this.onDisposed.trigger(uk.uuid),this.onDisposed.reset()}create(s){if(!this.enabled)return;const n=this.components.get(nZ).get(s).castRay();n&&this.createPlaneFromIntersection(s,n)}createFromNormalAndCoplanarPoint(s,n,t){const u=this.newPlane(s,t,n);return this.updateMaterialsAndPlanes(),u}delete(s,n){this.enabled&&(n||(n=this.pickPlane(s)),n&&this.deletePlane(n))}deleteAll(){for(;this.list.length>0;){const s=this.list[0];this.delete(s.world,s)}}deletePlane(s){const n=this.list.indexOf(s);if(n!==-1){if(this.list.splice(n,1),!s.world.renderer)throw new Error("Renderer not found for this plane's world!");s.world.renderer.setPlane(!1,s.three),s.dispose(),this.updateMaterialsAndPlanes(),this.onAfterDelete.trigger(s)}}pickPlane(s){const n=this.components.get(nZ).get(s),t=this.getAllPlaneMeshes(),u=n.castRay(t);if(u){const o=u.object;return this.list.find(f=>f.meshes.includes(o))}}getAllPlaneMeshes(){const s=[];for(const n of this.list)s.push(...n.meshes);return s}createPlaneFromIntersection(s,n){var t;if(!s.renderer)throw new Error("The given world must have a renderer!");const u=n.point.distanceTo(new ze(0,0,0)),o=(t=n.face)==null?void 0:t.normal;if(!u||!o)return;const f=this.getWorldNormal(n,o),d=this.newPlane(s,n.point,f.negate());d.visible=this._visible,d.size=this._size,s.renderer.setPlane(!0,d.three),this.updateMaterialsAndPlanes()}getWorldNormal(s,n){const t=s.object;let u=s.object.matrixWorld.clone();if(t instanceof K9&&s.instanceId!==void 0){const d=new Fn;t.getMatrixAt(s.instanceId,d),u=d.multiply(u)}const o=new gs().getNormalMatrix(u),f=n.clone().applyMatrix3(o).normalize();return this.normalizePlaneDirectionY(f),f}normalizePlaneDirectionY(s){this.orthogonalY&&(s.y>this.toleranceOrthogonalY&&(s.x=0,s.y=1,s.z=0),s.y<-this.toleranceOrthogonalY&&(s.x=0,s.y=-1,s.z=0))}newPlane(s,n,t){const u=new this.Type(this.components,s,n,t,this._material);return u.onDraggingStarted.add(this._onStartDragging),u.onDraggingEnded.add(this._onEndDragging),this.list.push(u),this.onAfterCreate.trigger(u),u}updateMaterialsAndPlanes(){const s=this.components.get(B0e);for(const[n,t]of s.list){if(!t.renderer)continue;t.renderer.updateClippingPlanes();const{clippingPlanes:u}=t.renderer;for(const o of t.meshes)if(Array.isArray(o.material))for(const f of o.material)f.clippingPlanes=u;else o.material.clippingPlanes=u}}};qe(q0e,"uuid","66290bc5-18c4-4cd1-9379-2e17a0617611");function $0e(e,s,n,t){return new Promise((u,o)=>{function f(){const d=e.clientWaitSync(s,n,0);if(d===e.WAIT_FAILED){o();return}if(d===e.TIMEOUT_EXPIRED){setTimeout(f,t);return}u()}f()})}async function K0e(e,s,n,t,u,o,f){const d=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),await $0e(e,d,0,10),e.deleteSync(d),e.bindBuffer(s,n),e.getBufferSubData(s,t,u,o,f),e.bindBuffer(s,null)}async function Q0e(e,s,n,t,u,o,f,d){const m=e.createBuffer();return e.bindBuffer(e.PIXEL_PACK_BUFFER,m),e.bufferData(e.PIXEL_PACK_BUFFER,d.byteLength,e.STREAM_READ),e.readPixels(s,n,t,u,o,f,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),await K0e(e,e.PIXEL_PACK_BUFFER,m,0,d),e.deleteBuffer(m),d}class Z0e{constructor(s,n,t){if(qe(this,"onDisposed",new Nn),qe(this,"onViewUpdated",new XO),qe(this,"enabled",!0),qe(this,"needsUpdate",!1),qe(this,"renderDebugFrame",!1),qe(this,"components"),qe(this,"world"),qe(this,"renderer"),qe(this,"autoUpdate",!0),qe(this,"updateInterval",1e3),qe(this,"worker"),qe(this,"scene",new Fk),qe(this,"_width",512),qe(this,"_height",512),qe(this,"_availableColor",1),qe(this,"renderTarget"),qe(this,"bufferSize"),qe(this,"_buffer"),qe(this,"_isWorkerBusy",!1),qe(this,"updateVisibility",async f=>{if(!this.enabled||!this.needsUpdate&&!f||this._isWorkerBusy)return;this._isWorkerBusy=!0;const d=this.world.camera.three;d.updateMatrix(),this.renderer.setSize(this._width,this._height),this.renderer.setRenderTarget(this.renderTarget),this.renderer.render(this.scene,d);const m=this.renderer.getContext();await Q0e(m,0,0,this._width,this._height,m.RGBA,m.UNSIGNED_BYTE,this._buffer),this.renderer.setRenderTarget(null),this.renderDebugFrame&&this.renderer.render(this.scene,d),this.worker.postMessage({buffer:this._buffer}),this.needsUpdate=!1}),!n.renderer)throw new Error("The given world must have a renderer!");this.components=s,this.applySettings(t),this.world=n,this.renderer=new kF,this.renderTarget=new aA(this._width,this._height),this.bufferSize=this._width*this._height*4,this._buffer=new Uint8Array(this.bufferSize),this.renderer.clippingPlanes=n.renderer.clippingPlanes;const u=`
      addEventListener("message", (event) => {
        const { buffer } = event.data;
        const colors = new Map();
        for (let i = 0; i < buffer.length; i += 4) {
          const r = buffer[i];
          const g = buffer[i + 1];
          const b = buffer[i + 2];
          const code = "" + r + "-" + g + "-" + b;
          if(colors.has(code)) {
            colors.set(code, colors.get(code) + 1);
          } else {
            colors.set(code, 1);
          }
        }
        postMessage({ colors });
      });