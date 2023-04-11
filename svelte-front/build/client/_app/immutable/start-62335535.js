import{S as dt,i as ht,s as mt,a as gt,e as I,c as wt,b as G,g as X,t as P,d as Z,f as O,h as B,j as yt,o as Ce,k as bt,l as vt,m as Et,n as Te,p as x,q as kt,r as Rt,u as Lt,v as ne,w as F,x as H,y as re,z as K,A as M,B as ke}from"./chunks/index-5fac9acd.js";import{S as lt,a as ct,I as Y,g as Qe,f as xe,b as Ne,c as Re,s as ee,i as et,d as _e,e as se,P as tt,h as St,j as $t,k as At}from"./chunks/singletons-846de1f6.js";function It(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function Pt(a){return a.split("%25").map(decodeURI).join("%25")}function Ot(a){for(const e in a)a[e]=decodeURIComponent(a[e]);return a}const Tt=["href","pathname","search","searchParams","toString","toJSON"];function Nt(a,e){const n=new URL(a);for(const i of Tt){let r=n[i];Object.defineProperty(n,i,{get(){return e(),r},enumerable:!0,configurable:!0})}return Dt(n),n}function Dt(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Ut="/__data.json";function jt(a){return a.replace(/\/$/,"")+Ut}function ft(a){try{return JSON.parse(sessionStorage[a])}catch{}}function nt(a,e){const n=JSON.stringify(e);try{sessionStorage[a]=n}catch{}}function Vt(...a){let e=5381;for(const n of a)if(typeof n=="string"){let i=n.length;for(;i;)e=e*33^n.charCodeAt(--i)}else if(ArrayBuffer.isView(n)){const i=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let r=i.length;for(;r;)e=e*33^i[--r]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const Le=window.fetch;window.fetch=(a,e)=>((a instanceof Request?a.method:(e==null?void 0:e.method)||"GET")!=="GET"&&de.delete(Be(a)),Le(a,e));const de=new Map;function Ct(a,e){const n=Be(a,e),i=document.querySelector(n);if(i!=null&&i.textContent){const{body:r,...p}=JSON.parse(i.textContent),t=i.getAttribute("data-ttl");return t&&de.set(n,{body:r,init:p,ttl:1e3*Number(t)}),Promise.resolve(new Response(r,p))}return Le(a,e)}function qt(a,e,n){if(de.size>0){const i=Be(a,n),r=de.get(i);if(r){if(performance.now()<r.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(r.body,r.init);de.delete(i)}}return Le(e,n)}function Be(a,e){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(a instanceof Request?a.url:a)}]`;if(e!=null&&e.headers||e!=null&&e.body){const r=[];e.headers&&r.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&r.push(e.body),i+=`[data-hash="${Vt(...r)}"]`}return i}const Bt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Ft(a){const e=[];return{pattern:a==="/"?/^\/$/:new RegExp(`^${Kt(a).map(i=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(i);if(r)return e.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const p=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(i);if(p)return e.push({name:p[1],matcher:p[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!i)return;const t=i.split(/\[(.+?)\](?!\])/);return"/"+t.map((c,_)=>{if(_%2){if(c.startsWith("x+"))return De(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return De(String.fromCharCode(...c.slice(2).split("-").map(A=>parseInt(A,16))));const m=Bt.exec(c);if(!m)throw new Error(`Invalid param: ${c}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,b,D,V,z]=m;return e.push({name:V,matcher:z,optional:!!b,rest:!!D,chained:D?_===1&&t[0]==="":!1}),D?"(.*?)":b?"([^/]*)?":"([^/]+?)"}return De(c)}).join("")}).join("")}/?$`),params:e}}function Ht(a){return!/^\([^)]+\)$/.test(a)}function Kt(a){return a.slice(1).split("/").filter(Ht)}function Mt(a,e,n){const i={},r=a.slice(1);let p=0;for(let t=0;t<e.length;t+=1){const l=e[t],c=r[t-p];if(l.chained&&l.rest&&p){i[l.name]=r.slice(t-p,t+1).filter(_=>_).join("/"),p=0;continue}if(c===void 0){l.rest&&(i[l.name]="");continue}if(!l.matcher||n[l.matcher](c)){i[l.name]=c;continue}if(l.optional&&l.chained){p++;continue}return}if(!p)return i}function De(a){return a.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function zt(a,e,n,i){const r=new Set(e);return Object.entries(n).map(([l,[c,_,m]])=>{const{pattern:b,params:D}=Ft(l),V={id:l,exec:z=>{const A=b.exec(z);if(A)return Mt(A,D,i)},errors:[1,...m||[]].map(z=>a[z]),layouts:[0,..._||[]].map(t),leaf:p(c)};return V.errors.length=V.layouts.length=Math.max(V.errors.length,V.layouts.length),V});function p(l){const c=l<0;return c&&(l=~l),[c,a[l]]}function t(l){return l===void 0?l:[r.has(l),a[l]]}}function Gt(a){let e,n,i;var r=a[1][0];function p(t){return{props:{data:t[3],form:t[2]}}}return r&&(e=F(r,p(a)),a[18](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&8&&(c.data=t[3]),l&4&&(c.form=t[2]),r!==(r=t[1][0])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[18](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[18](null),t&&B(n),e&&M(e,t)}}}function Jt(a){let e,n,i;var r=a[1][0];function p(t){return{props:{data:t[3],$$slots:{default:[en]},$$scope:{ctx:t}}}}return r&&(e=F(r,p(a)),a[17](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&8&&(c.data=t[3]),l&524407&&(c.$$scope={dirty:l,ctx:t}),r!==(r=t[1][0])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[17](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[17](null),t&&B(n),e&&M(e,t)}}}function Wt(a){let e,n,i;var r=a[1][1];function p(t){return{props:{data:t[4],form:t[2]}}}return r&&(e=F(r,p(a)),a[16](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&16&&(c.data=t[4]),l&4&&(c.form=t[2]),r!==(r=t[1][1])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[16](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[16](null),t&&B(n),e&&M(e,t)}}}function Yt(a){let e,n,i;var r=a[1][1];function p(t){return{props:{data:t[4],$$slots:{default:[xt]},$$scope:{ctx:t}}}}return r&&(e=F(r,p(a)),a[15](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&16&&(c.data=t[4]),l&524391&&(c.$$scope={dirty:l,ctx:t}),r!==(r=t[1][1])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[15](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[15](null),t&&B(n),e&&M(e,t)}}}function Xt(a){let e,n,i;var r=a[1][2];function p(t){return{props:{data:t[5],form:t[2]}}}return r&&(e=F(r,p(a)),a[14](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&32&&(c.data=t[5]),l&4&&(c.form=t[2]),r!==(r=t[1][2])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[14](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[14](null),t&&B(n),e&&M(e,t)}}}function Zt(a){let e,n,i;var r=a[1][2];function p(t){return{props:{data:t[5],$$slots:{default:[Qt]},$$scope:{ctx:t}}}}return r&&(e=F(r,p(a)),a[13](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&32&&(c.data=t[5]),l&524359&&(c.$$scope={dirty:l,ctx:t}),r!==(r=t[1][2])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[13](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[13](null),t&&B(n),e&&M(e,t)}}}function Qt(a){let e,n,i;var r=a[1][3];function p(t){return{props:{data:t[6],form:t[2]}}}return r&&(e=F(r,p(a)),a[12](e)),{c(){e&&H(e.$$.fragment),n=I()},l(t){e&&re(e.$$.fragment,t),n=I()},m(t,l){e&&K(e,t,l),G(t,n,l),i=!0},p(t,l){const c={};if(l&64&&(c.data=t[6]),l&4&&(c.form=t[2]),r!==(r=t[1][3])){if(e){X();const _=e;P(_.$$.fragment,1,0,()=>{M(_,1)}),Z()}r?(e=F(r,p(t)),t[12](e),H(e.$$.fragment),O(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else r&&e.$set(c)},i(t){i||(e&&O(e.$$.fragment,t),i=!0)},o(t){e&&P(e.$$.fragment,t),i=!1},d(t){a[12](null),t&&B(n),e&&M(e,t)}}}function xt(a){let e,n,i,r;const p=[Zt,Xt],t=[];function l(c,_){return c[1][3]?0:1}return e=l(a),n=t[e]=p[e](a),{c(){n.c(),i=I()},l(c){n.l(c),i=I()},m(c,_){t[e].m(c,_),G(c,i,_),r=!0},p(c,_){let m=e;e=l(c),e===m?t[e].p(c,_):(X(),P(t[m],1,1,()=>{t[m]=null}),Z(),n=t[e],n?n.p(c,_):(n=t[e]=p[e](c),n.c()),O(n,1),n.m(i.parentNode,i))},i(c){r||(O(n),r=!0)},o(c){P(n),r=!1},d(c){t[e].d(c),c&&B(i)}}}function en(a){let e,n,i,r;const p=[Yt,Wt],t=[];function l(c,_){return c[1][2]?0:1}return e=l(a),n=t[e]=p[e](a),{c(){n.c(),i=I()},l(c){n.l(c),i=I()},m(c,_){t[e].m(c,_),G(c,i,_),r=!0},p(c,_){let m=e;e=l(c),e===m?t[e].p(c,_):(X(),P(t[m],1,1,()=>{t[m]=null}),Z(),n=t[e],n?n.p(c,_):(n=t[e]=p[e](c),n.c()),O(n,1),n.m(i.parentNode,i))},i(c){r||(O(n),r=!0)},o(c){P(n),r=!1},d(c){t[e].d(c),c&&B(i)}}}function at(a){let e,n=a[8]&&rt(a);return{c(){e=bt("div"),n&&n.c(),this.h()},l(i){e=vt(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=Et(e);n&&n.l(r),r.forEach(B),this.h()},h(){Te(e,"id","svelte-announcer"),Te(e,"aria-live","assertive"),Te(e,"aria-atomic","true"),x(e,"position","absolute"),x(e,"left","0"),x(e,"top","0"),x(e,"clip","rect(0 0 0 0)"),x(e,"clip-path","inset(50%)"),x(e,"overflow","hidden"),x(e,"white-space","nowrap"),x(e,"width","1px"),x(e,"height","1px")},m(i,r){G(i,e,r),n&&n.m(e,null)},p(i,r){i[8]?n?n.p(i,r):(n=rt(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&B(e),n&&n.d()}}}function rt(a){let e;return{c(){e=kt(a[9])},l(n){e=Rt(n,a[9])},m(n,i){G(n,e,i)},p(n,i){i&512&&Lt(e,n[9])},d(n){n&&B(e)}}}function tn(a){let e,n,i,r,p;const t=[Jt,Gt],l=[];function c(m,b){return m[1][1]?0:1}e=c(a),n=l[e]=t[e](a);let _=a[7]&&at(a);return{c(){n.c(),i=gt(),_&&_.c(),r=I()},l(m){n.l(m),i=wt(m),_&&_.l(m),r=I()},m(m,b){l[e].m(m,b),G(m,i,b),_&&_.m(m,b),G(m,r,b),p=!0},p(m,[b]){let D=e;e=c(m),e===D?l[e].p(m,b):(X(),P(l[D],1,1,()=>{l[D]=null}),Z(),n=l[e],n?n.p(m,b):(n=l[e]=t[e](m),n.c()),O(n,1),n.m(i.parentNode,i)),m[7]?_?_.p(m,b):(_=at(m),_.c(),_.m(r.parentNode,r)):_&&(_.d(1),_=null)},i(m){p||(O(n),p=!0)},o(m){P(n),p=!1},d(m){l[e].d(m),m&&B(i),_&&_.d(m),m&&B(r)}}}function nn(a,e,n){let{stores:i}=e,{page:r}=e,{constructors:p}=e,{components:t=[]}=e,{form:l}=e,{data_0:c=null}=e,{data_1:_=null}=e,{data_2:m=null}=e,{data_3:b=null}=e;yt(i.page.notify);let D=!1,V=!1,z=null;Ce(()=>{const y=i.page.subscribe(()=>{D&&(n(8,V=!0),n(9,z=document.title||"untitled page"))});return n(7,D=!0),y});function A(y){ne[y?"unshift":"push"](()=>{t[3]=y,n(0,t)})}function oe(y){ne[y?"unshift":"push"](()=>{t[2]=y,n(0,t)})}function Q(y){ne[y?"unshift":"push"](()=>{t[2]=y,n(0,t)})}function me(y){ne[y?"unshift":"push"](()=>{t[1]=y,n(0,t)})}function ie(y){ne[y?"unshift":"push"](()=>{t[1]=y,n(0,t)})}function ge(y){ne[y?"unshift":"push"](()=>{t[0]=y,n(0,t)})}function we(y){ne[y?"unshift":"push"](()=>{t[0]=y,n(0,t)})}return a.$$set=y=>{"stores"in y&&n(10,i=y.stores),"page"in y&&n(11,r=y.page),"constructors"in y&&n(1,p=y.constructors),"components"in y&&n(0,t=y.components),"form"in y&&n(2,l=y.form),"data_0"in y&&n(3,c=y.data_0),"data_1"in y&&n(4,_=y.data_1),"data_2"in y&&n(5,m=y.data_2),"data_3"in y&&n(6,b=y.data_3)},a.$$.update=()=>{a.$$.dirty&3072&&i.page.set(r)},[t,p,l,c,_,m,b,D,V,z,i,r,A,oe,Q,me,ie,ge,we]}class an extends dt{constructor(e){super(),ht(this,e,nn,tn,mt,{stores:10,page:11,constructors:1,components:0,form:2,data_0:3,data_1:4,data_2:5,data_3:6})}}const rn="modulepreload",sn=function(a,e){return new URL(a,e).href},it={},j=function(e,n,i){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(p=>{if(p=sn(p,i),p in it)return;it[p]=!0;const t=p.endsWith(".css"),l=t?'[rel="stylesheet"]':"";if(!!i)for(let m=r.length-1;m>=0;m--){const b=r[m];if(b.href===p&&(!t||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${l}`))return;const _=document.createElement("link");if(_.rel=t?"stylesheet":rn,t||(_.as="script",_.crossOrigin=""),_.href=p,document.head.appendChild(_),t)return new Promise((m,b)=>{_.addEventListener("load",m),_.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${p}`)))})})).then(()=>e())},on=a=>/^[0-9]+$/.test(a),ln=a=>/^[-a-zA-Z0-9]{5,25}$/.test(a),cn={number:on,username:ln},Se=[()=>j(()=>import("./chunks/0-939506bc.js"),["./chunks/0-939506bc.js","./chunks/_layout-e4a84b88.js","./components/pages/_layout.svelte-b5962d27.js","./chunks/index-5fac9acd.js","./chunks/user-a16d19da.js","./chunks/index-07a2c1d0.js","./chunks/events-socket-a1602771.js","./chunks/index-f3f072ee.js","./chunks/friends-21c0d3c1.js","./chunks/index-ba285384.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/chat-socket-2e09708d.js","./chunks/chat-messages-d127bd67.js","./chunks/matchmaking-socket-eee275f1.js","./assets/_layout-0b20e450.css"],import.meta.url),()=>j(()=>import("./chunks/1-cc7b4a3c.js"),["./chunks/1-cc7b4a3c.js","./components/error.svelte-2259b480.js","./chunks/index-5fac9acd.js","./chunks/stores-66d2d431.js","./chunks/singletons-846de1f6.js","./chunks/index-07a2c1d0.js"],import.meta.url),()=>j(()=>import("./chunks/2-47da1eb1.js"),["./chunks/2-47da1eb1.js","./components/pages/(app)/_layout.svelte-2e850e62.js","./chunks/index-5fac9acd.js","./chunks/user-a16d19da.js","./chunks/index-07a2c1d0.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./chunks/matchmaking-socket-eee275f1.js","./chunks/stores-66d2d431.js","./assets/_layout-41afedf4.css"],import.meta.url),()=>j(()=>import("./chunks/3-0ea8449d.js"),["./chunks/3-0ea8449d.js","./components/pages/(app)/channels/_layout.svelte-a88e67a3.js","./chunks/index-5fac9acd.js","./chunks/Loading-e1f64612.js","./assets/Loading-ab04f6cd.css","./chunks/chat-socket-2e09708d.js","./chunks/index-07a2c1d0.js"],import.meta.url),()=>j(()=>import("./chunks/4-ec350e1c.js"),["./chunks/4-ec350e1c.js","./components/pages/2fa/_layout.svelte-e6fad796.js","./chunks/index-5fac9acd.js","./assets/_layout-60470223.css"],import.meta.url),()=>j(()=>import("./chunks/5-4bed6d05.js"),["./chunks/5-4bed6d05.js","./components/pages/(app)/_page.svelte-678621c0.js","./chunks/index-5fac9acd.js","./chunks/friends-21c0d3c1.js","./chunks/index-07a2c1d0.js","./chunks/sendGameRequest-1341a4e2.js","./chunks/events-socket-a1602771.js","./chunks/matchmaking-socket-eee275f1.js","./assets/_page-94d8922f.css"],import.meta.url),()=>j(()=>import("./chunks/6-06a6d47b.js"),["./chunks/6-06a6d47b.js","./components/pages/(app)/channels/_page.svelte-831de0c9.js","./chunks/index-5fac9acd.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-07a2c1d0.js","./chunks/user-a16d19da.js","./chunks/chat-socket-2e09708d.js","./chunks/ModalPasswordChannels-429e188a.js","./assets/_page-ae971faa.css"],import.meta.url),()=>j(()=>import("./chunks/7-f46a5588.js"),["./chunks/7-f46a5588.js","./components/pages/(app)/channels/_id_/_page.svelte-cdaacb4e.js","./chunks/index-5fac9acd.js","./chunks/user-a16d19da.js","./chunks/index-07a2c1d0.js","./chunks/stores-66d2d431.js","./chunks/singletons-846de1f6.js","./chunks/navigation-ac3df971.js","./chunks/chat-socket-2e09708d.js","./chunks/Loading-e1f64612.js","./assets/Loading-ab04f6cd.css","./chunks/ModalPasswordChannels-429e188a.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./chunks/sendGameRequest-1341a4e2.js","./chunks/matchmaking-socket-eee275f1.js","./chunks/chat-messages-d127bd67.js","./assets/_page-0f40c7c4.css"],import.meta.url),()=>j(()=>import("./chunks/8-c56b53c5.js"),["./chunks/8-c56b53c5.js","./components/pages/(app)/channels/create/_page.svelte-a4c75979.js","./chunks/index-5fac9acd.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-07a2c1d0.js","./chunks/chat-socket-2e09708d.js","./assets/_page-ff2d03bc.css"],import.meta.url),()=>j(()=>import("./chunks/9-7feea6aa.js"),["./chunks/9-7feea6aa.js","./components/pages/(app)/friends/_page.svelte-219ff63e.js","./chunks/index-5fac9acd.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/index-07a2c1d0.js","./chunks/friends-21c0d3c1.js","./chunks/user-a16d19da.js","./assets/_page-a2856d5c.css"],import.meta.url),()=>j(()=>import("./chunks/10-1d11df26.js"),["./chunks/10-1d11df26.js","./components/pages/(app)/parameters/_page.svelte-891ad3c6.js","./chunks/index-5fac9acd.js","./chunks/user-a16d19da.js","./chunks/index-07a2c1d0.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./assets/_page-ba8e33dc.css"],import.meta.url),()=>j(()=>import("./chunks/11-0a614225.js"),["./chunks/11-0a614225.js","./components/pages/(app)/profile/_page.svelte-c7c78d78.js","./chunks/index-5fac9acd.js","./chunks/user-a16d19da.js","./chunks/index-07a2c1d0.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./assets/_page-ea4593d3.css"],import.meta.url),()=>j(()=>import("./chunks/12-ab0db548.js"),["./chunks/12-ab0db548.js","./components/pages/(app)/profile/_username_/_page.svelte-33d2185d.js","./chunks/index-5fac9acd.js","./chunks/user-a16d19da.js","./chunks/index-07a2c1d0.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./chunks/stores-66d2d431.js","./chunks/singletons-846de1f6.js","./assets/_page-ea4593d3.css"],import.meta.url),()=>j(()=>import("./chunks/13-5c5ae9e4.js"),["./chunks/13-5c5ae9e4.js","./components/pages/(app)/users/_page.svelte-6912c385.js","./chunks/index-5fac9acd.js","./chunks/events-socket-a1602771.js","./chunks/index-07a2c1d0.js","./assets/_page-07fa2b82.css"],import.meta.url),()=>j(()=>import("./chunks/14-c228dace.js"),["./chunks/14-c228dace.js","./components/pages/2fa/activate/_page.svelte-b3fd8fca.js","./chunks/index-5fac9acd.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-07a2c1d0.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./chunks/user-a16d19da.js","./assets/_page-1f904d32.css"],import.meta.url),()=>j(()=>import("./chunks/15-473be467.js"),["./chunks/15-473be467.js","./components/pages/2fa/verify/_page.svelte-84715997.js","./chunks/index-5fac9acd.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-07a2c1d0.js","./chunks/index-f3f072ee.js","./chunks/events-socket-a1602771.js","./chunks/friends-21c0d3c1.js","./chunks/user-a16d19da.js","./assets/_page-0ed0ddff.css"],import.meta.url),()=>j(()=>import("./chunks/16-05c451a2.js"),["./chunks/16-05c451a2.js","./components/pages/game/_id_/_page.svelte-ed0922f8.js","./chunks/index-5fac9acd.js","./chunks/navigation-ac3df971.js","./chunks/singletons-846de1f6.js","./chunks/index-07a2c1d0.js","./chunks/stores-66d2d431.js","./chunks/index-ba285384.js","./chunks/events-socket-a1602771.js","./chunks/user-a16d19da.js","./assets/_page-f6b9e18d.css"],import.meta.url)],ut=[],fn={"/(app)":[5,[2]],"/2fa/activate":[14,[4]],"/2fa/verify":[15,[4]],"/(app)/channels":[6,[2,3]],"/(app)/channels/create":[8,[2,3]],"/(app)/channels/[id]":[7,[2,3]],"/(app)/friends":[9,[2]],"/game/[id]":[16],"/(app)/parameters":[10,[2]],"/(app)/profile":[11,[2]],"/(app)/profile/[username]":[12,[2]],"/(app)/users":[13,[2]]},un={handleError:({error:a})=>{console.error(a)}};let he=class{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},st=class{constructor(e,n){this.status=e,this.location=n}};async function pn(a){var e;for(const n in a)if(typeof((e=a[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(a).map(async([i,r])=>[i,await r])));return a}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const _n=-1,dn=-2,hn=-3,mn=-4,gn=-5,wn=-6;function yn(a){if(typeof a=="number")return i(a,!0);if(!Array.isArray(a)||a.length===0)throw new Error("Invalid input");const e=a,n=Array(e.length);function i(r,p=!1){if(r===_n)return;if(r===hn)return NaN;if(r===mn)return 1/0;if(r===gn)return-1/0;if(r===wn)return-0;if(p)throw new Error("Invalid input");if(r in n)return n[r];const t=e[r];if(!t||typeof t!="object")n[r]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[r]=new Date(t[1]);break;case"Set":const c=new Set;n[r]=c;for(let b=1;b<t.length;b+=1)c.add(i(t[b]));break;case"Map":const _=new Map;n[r]=_;for(let b=1;b<t.length;b+=2)_.set(i(t[b]),i(t[b+1]));break;case"RegExp":n[r]=new RegExp(t[1],t[2]);break;case"Object":n[r]=Object(t[1]);break;case"BigInt":n[r]=BigInt(t[1]);break;case"null":const m=Object.create(null);n[r]=m;for(let b=1;b<t.length;b+=2)m[t[b]]=i(t[b+1]);break}else{const l=new Array(t.length);n[r]=l;for(let c=0;c<t.length;c+=1){const _=t[c];_!==dn&&(l[c]=i(_))}}else{const l={};n[r]=l;for(const c in t){const _=t[c];l[c]=i(_)}}return n[r]}return i(0)}function bn(a){return a.filter(e=>e!=null)}const Ue=zt(Se,ut,fn,cn),pt=Se[0],qe=Se[1];pt();qe();const ae=ft(lt)??{},ue=ft(ct)??{};function je(a){ae[a]=_e()}function vn({target:a}){var Ye;const e=document.documentElement,n=[],i=[];let r=null;const p={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},l=!1,c=!1,_=!0,m=!1,b=!1,D=!1,V=!1,z,A=(Ye=history.state)==null?void 0:Ye[Y];A||(A=Date.now(),history.replaceState({...history.state,[Y]:A},"",location.href));const oe=ae[A];oe&&(history.scrollRestoration="manual",scrollTo(oe.x,oe.y));let Q,me,ie;async function ge(){ie=ie||Promise.resolve(),await ie,ie=null;const o=new URL(location.href),s=ce(o,!0);r=null,await He(s,o,[])}function we(o){i.some(s=>s==null?void 0:s.snapshot)&&(ue[o]=i.map(s=>{var u;return(u=s==null?void 0:s.snapshot)==null?void 0:u.capture()}))}function y(o){var s;(s=ue[o])==null||s.forEach((u,f)=>{var h,d;(d=(h=i[f])==null?void 0:h.snapshot)==null||d.restore(u)})}async function $e(o,{noScroll:s=!1,replaceState:u=!1,keepFocus:f=!1,state:h={},invalidateAll:d=!1},w,g){return typeof o=="string"&&(o=new URL(o,Qe(document))),Ee({url:o,scroll:s?_e():null,keepfocus:f,redirect_chain:w,details:{state:h,replaceState:u},nav_token:g,accepted:()=>{d&&(V=!0)},blocked:()=>{},type:"goto"})}async function Fe(o){return r={id:o.id,promise:ze(o).then(s=>(s.type==="loaded"&&s.state.error&&(r=null),s))},r.promise}async function ye(...o){const u=Ue.filter(f=>o.some(h=>f.exec(h))).map(f=>Promise.all([...f.layouts,f.leaf].map(h=>h==null?void 0:h[1]())));await Promise.all(u)}async function He(o,s,u,f,h,d={},w){var E,v,$;me=d;let g=o&&await ze(o);if(g||(g=await We(s,{id:null},await pe(new Error(`Not found: ${s.pathname}`),{url:s,params:{},route:{id:null}}),404)),s=(o==null?void 0:o.url)||s,me!==d)return!1;if(g.type==="redirect")if(u.length>10||u.includes(s.pathname))g=await be({status:500,error:await pe(new Error("Redirect loop"),{url:s,params:{},route:{id:null}}),url:s,route:{id:null}});else return $e(new URL(g.location,s).href,{},[...u,s.pathname],d),!1;else((E=g.props.page)==null?void 0:E.status)>=400&&await ee.updated.check()&&await fe(s);if(n.length=0,V=!1,m=!0,f&&(je(f),we(f)),(v=g.props.page)!=null&&v.url&&g.props.page.url.pathname!==s.pathname&&(s.pathname=($=g.props.page)==null?void 0:$.url.pathname),h&&h.details){const{details:L}=h,q=L.replaceState?0:1;if(L.state[Y]=A+=q,history[L.replaceState?"replaceState":"pushState"](L.state,"",s),!L.replaceState){let S=A+1;for(;ue[S]||ae[S];)delete ue[S],delete ae[S],S+=1}}if(r=null,c?(t=g.state,g.props.page&&(g.props.page.url=s),z.$set(g.props)):Ke(g),h){const{scroll:L,keepfocus:q}=h,{activeElement:S}=document;await ke();const k=document.activeElement!==S&&document.activeElement!==document.body;if(!q&&!k&&await Ve(),_){const T=s.hash&&document.getElementById(decodeURIComponent(s.hash.slice(1)));L?scrollTo(L.x,L.y):T?T.scrollIntoView():scrollTo(0,0)}}else await ke();_=!0,g.props.page&&(Q=g.props.page),w&&w(),m=!1}function Ke(o){var f;t=o.state;const s=document.querySelector("style[data-sveltekit]");s&&s.remove(),Q=o.props.page,z=new an({target:a,props:{...o.props,stores:ee,components:i},hydrate:!0}),y(A);const u={from:null,to:{params:t.params,route:{id:((f=t.route)==null?void 0:f.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};p.after_navigate.forEach(h=>h(u)),c=!0}async function le({url:o,params:s,branch:u,status:f,error:h,route:d,form:w}){let g="never";for(const S of u)(S==null?void 0:S.slash)!==void 0&&(g=S.slash);o.pathname=It(o.pathname,g),o.search=o.search;const E={type:"loaded",state:{url:o,params:s,branch:u,error:h,route:d},props:{constructors:bn(u).map(S=>S.node.component)}};w!==void 0&&(E.props.form=w);let v={},$=!Q,L=0;for(let S=0;S<Math.max(u.length,t.branch.length);S+=1){const k=u[S],T=t.branch[S];(k==null?void 0:k.data)!==(T==null?void 0:T.data)&&($=!0),k&&(v={...v,...k.data},$&&(E.props[`data_${L}`]=v),L+=1)}return(!t.url||o.href!==t.url.href||t.error!==h||w!==void 0&&w!==Q.form||$)&&(E.props.page={error:h,params:s,route:{id:(d==null?void 0:d.id)??null},status:f,url:new URL(o),form:w??null,data:$?v:Q.data}),E}async function Ae({loader:o,parent:s,url:u,params:f,route:h,server_data_node:d}){var v,$,L;let w=null;const g={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},E=await o();if((v=E.universal)!=null&&v.load){let q=function(...k){for(const T of k){const{href:J}=new URL(T,u);g.dependencies.add(J)}};const S={route:{get id(){return g.route=!0,h.id}},params:new Proxy(f,{get:(k,T)=>(g.params.add(T),k[T])}),data:(d==null?void 0:d.data)??null,url:Nt(u,()=>{g.url=!0}),async fetch(k,T){let J;k instanceof Request?(J=k.url,T={body:k.method==="GET"||k.method==="HEAD"?void 0:await k.blob(),cache:k.cache,credentials:k.credentials,headers:k.headers,integrity:k.integrity,keepalive:k.keepalive,method:k.method,mode:k.mode,redirect:k.redirect,referrer:k.referrer,referrerPolicy:k.referrerPolicy,signal:k.signal,...T}):J=k;const W=new URL(J,u);return q(W.href),W.origin===u.origin&&(J=W.href.slice(u.origin.length)),c?qt(J,W.href,T):Ct(J,T)},setHeaders:()=>{},depends:q,parent(){return g.parent=!0,s()}};w=await E.universal.load.call(null,S)??null,w=w?await pn(w):null}return{node:E,loader:o,server:d,universal:($=E.universal)!=null&&$.load?{type:"data",data:w,uses:g}:null,data:w??(d==null?void 0:d.data)??null,slash:((L=E.universal)==null?void 0:L.trailingSlash)??(d==null?void 0:d.slash)}}function Me(o,s,u,f,h){if(V)return!0;if(!f)return!1;if(f.parent&&o||f.route&&s||f.url&&u)return!0;for(const d of f.params)if(h[d]!==t.params[d])return!0;for(const d of f.dependencies)if(n.some(w=>w(new URL(d))))return!0;return!1}function Ie(o,s){return(o==null?void 0:o.type)==="data"?{type:"data",data:o.data,uses:{dependencies:new Set(o.uses.dependencies??[]),params:new Set(o.uses.params??[]),parent:!!o.uses.parent,route:!!o.uses.route,url:!!o.uses.url},slash:o.slash}:(o==null?void 0:o.type)==="skip"?s??null:null}async function ze({id:o,invalidating:s,url:u,params:f,route:h}){if((r==null?void 0:r.id)===o)return r.promise;const{errors:d,layouts:w,leaf:g}=h,E=[...w,g];d.forEach(R=>R==null?void 0:R().catch(()=>{})),E.forEach(R=>R==null?void 0:R[1]().catch(()=>{}));let v=null;const $=t.url?o!==t.url.pathname+t.url.search:!1,L=t.route?h.id!==t.route.id:!1;let q=!1;const S=E.map((R,C)=>{var te;const N=t.branch[C],U=!!(R!=null&&R[0])&&((N==null?void 0:N.loader)!==R[1]||Me(q,L,$,(te=N.server)==null?void 0:te.uses,f));return U&&(q=!0),U});if(S.some(Boolean)){try{v=await ot(u,S)}catch(R){return be({status:R instanceof he?R.status:500,error:await pe(R,{url:u,params:f,route:{id:h.id}}),url:u,route:h})}if(v.type==="redirect")return v}const k=v==null?void 0:v.nodes;let T=!1;const J=E.map(async(R,C)=>{var Pe;if(!R)return;const N=t.branch[C],U=k==null?void 0:k[C];if((!U||U.type==="skip")&&R[1]===(N==null?void 0:N.loader)&&!Me(T,L,$,(Pe=N.universal)==null?void 0:Pe.uses,f))return N;if(T=!0,(U==null?void 0:U.type)==="error")throw U;return Ae({loader:R[1],url:u,params:f,route:h,parent:async()=>{var Ze;const Xe={};for(let Oe=0;Oe<C;Oe+=1)Object.assign(Xe,(Ze=await J[Oe])==null?void 0:Ze.data);return Xe},server_data_node:Ie(U===void 0&&R[0]?{type:"skip"}:U??null,R[0]?N==null?void 0:N.server:void 0)})});for(const R of J)R.catch(()=>{});const W=[];for(let R=0;R<E.length;R+=1)if(E[R])try{W.push(await J[R])}catch(C){if(C instanceof st)return{type:"redirect",location:C.location};let N=500,U;if(k!=null&&k.includes(C))N=C.status??N,U=C.error;else if(C instanceof he)N=C.status,U=C.body;else{if(await ee.updated.check())return await fe(u);U=await pe(C,{params:f,url:u,route:{id:h.id}})}const te=await Ge(R,W,d);return te?await le({url:u,params:f,branch:W.slice(0,te.idx).concat(te.node),status:N,error:U,route:h}):await We(u,{id:h.id},U,N)}else W.push(void 0);return await le({url:u,params:f,branch:W,status:200,error:null,route:h,form:s?void 0:null})}async function Ge(o,s,u){for(;o--;)if(u[o]){let f=o;for(;!s[f];)f-=1;try{return{idx:f+1,node:{node:await u[o](),loader:u[o],data:{},server:null,universal:null}}}catch{continue}}}async function be({status:o,error:s,url:u,route:f}){const h={};let d=null;if(ut[0]===0)try{const v=await ot(u,[!0]);if(v.type!=="data"||v.nodes[0]&&v.nodes[0].type!=="data")throw 0;d=v.nodes[0]??null}catch{(u.origin!==location.origin||u.pathname!==location.pathname||l)&&await fe(u)}const g=await Ae({loader:pt,url:u,params:h,route:f,parent:()=>Promise.resolve({}),server_data_node:Ie(d)}),E={node:await qe(),loader:qe,universal:null,server:null,data:null};return await le({url:u,params:h,branch:[g,E],status:o,error:s,route:null})}function ce(o,s){if(et(o,se))return;const u=ve(o);for(const f of Ue){const h=f.exec(u);if(h)return{id:o.pathname+o.search,invalidating:s,route:f,params:Ot(h),url:o}}}function ve(o){return Pt(o.pathname.slice(se.length)||"/")}function Je({url:o,type:s,intent:u,delta:f}){var g,E;let h=!1;const d={from:{params:t.params,route:{id:((g=t.route)==null?void 0:g.id)??null},url:t.url},to:{params:(u==null?void 0:u.params)??null,route:{id:((E=u==null?void 0:u.route)==null?void 0:E.id)??null},url:o},willUnload:!u,type:s};f!==void 0&&(d.delta=f);const w={...d,cancel:()=>{h=!0}};return b||p.before_navigate.forEach(v=>v(w)),h?null:d}async function Ee({url:o,scroll:s,keepfocus:u,redirect_chain:f,details:h,type:d,delta:w,nav_token:g,accepted:E,blocked:v}){const $=ce(o,!1),L=Je({url:o,type:d,delta:w,intent:$});if(!L){v();return}const q=A;E(),b=!0,c&&ee.navigating.set(L),await He($,o,f,q,{scroll:s,keepfocus:u,details:h},g,()=>{b=!1,p.after_navigate.forEach(S=>S(L)),ee.navigating.set(null)})}async function We(o,s,u,f){return o.origin===location.origin&&o.pathname===location.pathname&&!l?await be({status:f,error:u,url:o,route:s}):await fe(o)}function fe(o){return location.href=o.href,new Promise(()=>{})}function _t(){let o;e.addEventListener("mousemove",d=>{const w=d.target;clearTimeout(o),o=setTimeout(()=>{f(w,2)},20)});function s(d){f(d.composedPath()[0],1)}e.addEventListener("mousedown",s),e.addEventListener("touchstart",s,{passive:!0});const u=new IntersectionObserver(d=>{for(const w of d)w.isIntersecting&&(ye(ve(new URL(w.target.href))),u.unobserve(w.target))},{threshold:0});function f(d,w){const g=xe(d,e);if(!g)return;const{url:E,external:v}=Ne(g,se);if(v)return;const $=Re(g);if(!$.reload)if(w<=$.preload_data){const L=ce(E,!1);L&&Fe(L)}else w<=$.preload_code&&ye(ve(E))}function h(){u.disconnect();for(const d of e.querySelectorAll("a")){const{url:w,external:g}=Ne(d,se);if(g)continue;const E=Re(d);E.reload||(E.preload_code===tt.viewport&&u.observe(d),E.preload_code===tt.eager&&ye(ve(w)))}}p.after_navigate.push(h),h()}return{after_navigate:o=>{Ce(()=>(p.after_navigate.push(o),()=>{const s=p.after_navigate.indexOf(o);p.after_navigate.splice(s,1)}))},before_navigate:o=>{Ce(()=>(p.before_navigate.push(o),()=>{const s=p.before_navigate.indexOf(o);p.before_navigate.splice(s,1)}))},disable_scroll_handling:()=>{(m||!c)&&(_=!1)},goto:(o,s={})=>$e(o,s,[]),invalidate:o=>{if(typeof o=="function")n.push(o);else{const{href:s}=new URL(o,location.href);n.push(u=>u.href===s)}return ge()},invalidateAll:()=>(V=!0,ge()),preload_data:async o=>{const s=new URL(o,Qe(document)),u=ce(s,!1);if(!u)throw new Error(`Attempted to preload a URL that does not belong to this app: ${s}`);await Fe(u)},preload_code:ye,apply_action:async o=>{if(o.type==="error"){const s=new URL(location.href),{branch:u,route:f}=t;if(!f)return;const h=await Ge(t.branch.length,u,f.errors);if(h){const d=await le({url:s,params:t.params,branch:u.slice(0,h.idx).concat(h.node),status:o.status??500,error:o.error,route:f});t=d.state,z.$set(d.props),ke().then(Ve)}}else if(o.type==="redirect")$e(o.location,{invalidateAll:!0},[]);else{const s={form:o.data,page:{...Q,form:o.data,status:o.status}};z.$set(s),o.type==="success"&&ke().then(Ve)}},_start_router:()=>{var o;history.scrollRestoration="manual",addEventListener("beforeunload",s=>{var f;let u=!1;if(!b){const h={from:{params:t.params,route:{id:((f=t.route)==null?void 0:f.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>u=!0};p.before_navigate.forEach(d=>d(h))}u?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&(je(A),nt(lt,ae),we(A),nt(ct,ue))}),(o=navigator.connection)!=null&&o.saveData||_t(),e.addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const u=xe(s.composedPath()[0],e);if(!u)return;const{url:f,external:h,target:d}=Ne(u,se);if(!f)return;if(d==="_parent"||d==="_top"){if(window.parent!==window)return}else if(d&&d!=="_self")return;const w=Re(u);if(!(u instanceof SVGAElement)&&f.protocol!==location.protocol&&!(f.protocol==="https:"||f.protocol==="http:"))return;if(h||w.reload){Je({url:f,type:"link"})||s.preventDefault(),b=!0;return}const[E,v]=f.href.split("#");if(v!==void 0&&E===location.href.split("#")[0]){D=!0,je(A),t.url=f,ee.page.set({...Q,url:f}),ee.page.notify();return}Ee({url:f,scroll:w.noscroll?_e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:f.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),e.addEventListener("submit",s=>{if(s.defaultPrevented)return;const u=HTMLFormElement.prototype.cloneNode.call(s.target),f=s.submitter;if(((f==null?void 0:f.formMethod)||u.method)!=="get")return;const d=new URL((f==null?void 0:f.hasAttribute("formaction"))&&(f==null?void 0:f.formAction)||u.action);if(et(d,se))return;const w=s.target,{noscroll:g,reload:E}=Re(w);if(E)return;s.preventDefault(),s.stopPropagation();const v=new FormData(w),$=f==null?void 0:f.getAttribute("name");$&&v.append($,(f==null?void 0:f.getAttribute("value"))??""),d.search=new URLSearchParams(v).toString(),Ee({url:d,scroll:g?_e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async s=>{var u;if((u=s.state)!=null&&u[Y]){if(s.state[Y]===A)return;const f=ae[s.state[Y]];if(t.url.href.split("#")[0]===location.href.split("#")[0]){ae[A]=_e(),A=s.state[Y],scrollTo(f.x,f.y);return}const h=s.state[Y]-A;let d=!1;await Ee({url:new URL(location.href),scroll:f,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{A=s.state[Y]},blocked:()=>{history.go(-h),d=!0},type:"popstate",delta:h}),d||y(A)}}),addEventListener("hashchange",()=>{D&&(D=!1,history.replaceState({...history.state,[Y]:++A},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&ee.navigating.set(null)})},_hydrate:async({status:o=200,error:s,node_ids:u,params:f,route:h,data:d,form:w})=>{l=!0;const g=new URL(location.href);({params:f={},route:h={id:null}}=ce(g,!1)||{});let E;try{const v=u.map(async($,L)=>{const q=d[L];return Ae({loader:Se[$],url:g,params:f,route:h,parent:async()=>{const S={};for(let k=0;k<L;k+=1)Object.assign(S,(await v[k]).data);return S},server_data_node:Ie(q)})});E=await le({url:g,params:f,branch:await Promise.all(v),status:o,error:s,form:w,route:Ue.find(({id:$})=>$===h.id)??null})}catch(v){if(v instanceof st){await fe(new URL(v.location,location.href));return}E=await be({status:v instanceof he?v.status:500,error:await pe(v,{url:g,params:f,route:h}),url:g,route:h})}Ke(E)}}}async function ot(a,e){var p;const n=new URL(a);n.pathname=jt(a.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const i=await Le(n.href),r=await i.json();if(!i.ok)throw new he(i.status,r);return(p=r.nodes)==null||p.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=yn(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),r}function pe(a,e){return a instanceof he?a.body:un.handleError({error:a,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Ve(){const a=document.querySelector("[autofocus]");if(a)a.focus();else{const e=document.body,n=e.getAttribute("tabindex");return e.tabIndex=-1,e.focus({preventScroll:!0}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex"),new Promise(i=>{setTimeout(()=>{var r;i((r=getSelection())==null?void 0:r.removeAllRanges())})})}}async function Sn({assets:a,env:e,hydrate:n,target:i,version:r}){$t(a),At(r);const p=vn({target:i});St({client:p}),n?await p._hydrate(n):p.goto(location.href,{replaceState:!0}),p._start_router()}export{Sn as start};