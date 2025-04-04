import{h as l,a8 as z,a as $,c as O,g as F,u as T,a4 as D,M as L,L as I,K,$ as N,S as Q}from"./index-BbWEHrXy.js";function U(e,t){return e!==void 0&&e()||t}function ie(e,t){if(e!==void 0){const n=e();if(n!=null)return n.slice()}return t}function y(e,t){return e!==void 0?t.concat(e()):t}function re(e,t){return e===void 0?t:t!==void 0?t.concat(e()):e()}function se(e,t,n,s,o,a){t.key=s+o;const r=l(e,t,n);return o===!0?z(r,a()):r}const P={xs:18,sm:24,md:32,lg:38,xl:46},V={size:String};function A(e,t=P){return $(()=>e.size!==void 0?{fontSize:e.size in t?`${t[e.size]}px`:e.size}:null)}const k="0 0 24 24",b=e=>e,x=e=>`ionicons ${e}`,R={"mdi-":e=>`mdi ${e}`,"icon-":b,"bt-":e=>`bt ${e}`,"eva-":e=>`eva ${e}`,"ion-md":x,"ion-ios":x,"ion-logo":x,"iconfont ":b,"ti-":e=>`themify-icon ${e}`,"bi-":e=>`bootstrap-icons ${e}`,"i-":b},M={o_:"-outlined",r_:"-round",s_:"-sharp"},B={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},H=new RegExp("^("+Object.keys(R).join("|")+")"),X=new RegExp("^("+Object.keys(M).join("|")+")"),E=new RegExp("^("+Object.keys(B).join("|")+")"),Y=/^[Mm]\s?[-+]?\.?\d/,G=/^img:/,J=/^svguse:/,W=/^ion-/,Z=/^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /,oe=O({name:"QIcon",props:{...V,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(e,{slots:t}){const{proxy:{$q:n}}=F(),s=A(e),o=$(()=>"q-icon"+(e.left===!0?" on-left":"")+(e.right===!0?" on-right":"")+(e.color!==void 0?` text-${e.color}`:"")),a=$(()=>{let r,i=e.name;if(i==="none"||!i)return{none:!0};if(n.iconMapFn!==null){const u=n.iconMapFn(i);if(u!==void 0)if(u.icon!==void 0){if(i=u.icon,i==="none"||!i)return{none:!0}}else return{cls:u.cls,content:u.content!==void 0?u.content:" "}}if(Y.test(i)===!0){const[u,c=k]=i.split("|");return{svg:!0,viewBox:c,nodes:u.split("&&").map(p=>{const[f,v,g]=p.split("@@");return l("path",{style:v,d:f,transform:g})})}}if(G.test(i)===!0)return{img:!0,src:i.substring(4)};if(J.test(i)===!0){const[u,c=k]=i.split("|");return{svguse:!0,src:u.substring(7),viewBox:c}}let d=" ";const m=i.match(H);if(m!==null)r=R[m[1]](i);else if(Z.test(i)===!0)r=i;else if(W.test(i)===!0)r=`ionicons ion-${n.platform.is.ios===!0?"ios":"md"}${i.substring(3)}`;else if(E.test(i)===!0){r="notranslate material-symbols";const u=i.match(E);u!==null&&(i=i.substring(6),r+=B[u[1]]),d=i}else{r="notranslate material-icons";const u=i.match(X);u!==null&&(i=i.substring(2),r+=M[u[1]]),d=i}return{cls:r,content:d}});return()=>{const r={class:o.value,style:s.value,"aria-hidden":"true"};return a.value.none===!0?l(e.tag,r,U(t.default)):a.value.img===!0?l(e.tag,r,y(t.default,[l("img",{src:a.value.src})])):a.value.svg===!0?l(e.tag,r,y(t.default,[l("svg",{viewBox:a.value.viewBox||"0 0 24 24"},a.value.nodes)])):a.value.svguse===!0?l(e.tag,r,y(t.default,[l("svg",{viewBox:a.value.viewBox},[l("use",{"xlink:href":a.value.src})])])):(a.value.cls!==void 0&&(r.class+=" "+a.value.cls),l(e.tag,r,y(t.default,[a.value.content])))}}});function ee(e,t){const n=e.style;for(const s in t)n[s]=t[s]}function ae(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const t=T(e);if(t)return t.$el||t}function ue(e,t){if(e==null||e.contains(t)===!0)return!0;for(let n=e.nextElementSibling;n!==null;n=n.nextElementSibling)if(n.contains(t))return!0;return!1}function te(e,t=250){let n=!1,s;return function(){return n===!1&&(n=!0,setTimeout(()=>{n=!1},t),s=e.apply(this,arguments)),s}}function q(e,t,n,s){n.modifiers.stop===!0&&N(e);const o=n.modifiers.color;let a=n.modifiers.center;a=a===!0||s===!0;const r=document.createElement("span"),i=document.createElement("span"),d=Q(e),{left:m,top:u,width:c,height:p}=t.getBoundingClientRect(),f=Math.sqrt(c*c+p*p),v=f/2,g=`${(c-f)/2}px`,C=a?g:`${d.left-m-v}px`,_=`${(p-f)/2}px`,j=a?_:`${d.top-u-v}px`;i.className="q-ripple__inner",ee(i,{height:`${f}px`,width:`${f}px`,transform:`translate3d(${C},${j},0) scale3d(.2,.2,1)`,opacity:0}),r.className=`q-ripple${o?" text-"+o:""}`,r.setAttribute("dir","ltr"),r.appendChild(i),t.appendChild(r);const S=()=>{r.remove(),clearTimeout(h)};n.abort.push(S);let h=setTimeout(()=>{i.classList.add("q-ripple__inner--enter"),i.style.transform=`translate3d(${g},${_},0) scale3d(1,1,1)`,i.style.opacity=.2,h=setTimeout(()=>{i.classList.remove("q-ripple__inner--enter"),i.classList.add("q-ripple__inner--leave"),i.style.opacity=0,h=setTimeout(()=>{r.remove(),n.abort.splice(n.abort.indexOf(S),1)},275)},250)},50)}function w(e,{modifiers:t,value:n,arg:s}){const o=Object.assign({},e.cfg.ripple,t,n);e.modifiers={early:o.early===!0,stop:o.stop===!0,center:o.center===!0,color:o.color||s,keyCodes:[].concat(o.keyCodes||13)}}const le=D({name:"ripple",beforeMount(e,t){const n=t.instance.$.appContext.config.globalProperties.$q.config||{};if(n.ripple===!1)return;const s={cfg:n,enabled:t.value!==!1,modifiers:{},abort:[],start(o){s.enabled===!0&&o.qSkipRipple!==!0&&o.type===(s.modifiers.early===!0?"pointerdown":"click")&&q(o,e,s,o.qKeyEvent===!0)},keystart:te(o=>{s.enabled===!0&&o.qSkipRipple!==!0&&K(o,s.modifiers.keyCodes)===!0&&o.type===`key${s.modifiers.early===!0?"down":"up"}`&&q(o,e,s,!0)},300)};w(s,t),e.__qripple=s,I(s,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,t){if(t.oldValue!==t.value){const n=e.__qripple;n!==void 0&&(n.enabled=t.value!==!1,n.enabled===!0&&Object(t.value)===t.value&&w(n,t))}},beforeUnmount(e){const t=e.__qripple;t!==void 0&&(t.abort.forEach(n=>{n()}),L(t,"main"),delete e._qripple)}});export{oe as Q,le as R,A as a,re as b,ie as c,ue as d,y as e,ee as f,ae as g,U as h,se as i,P as j,V as u};
