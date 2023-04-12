import{S as X,i as x,s as ee,e as C,b as D,n as z,h as f,k as y,r as A,l as b,m as M,u as O,p as g,E as a,v as ne,a as $,c as S,D as ye,R as be,q as $e,G as F,w as he,d as W,f as ue,g as U,H as Se,I as le,o as ze,Z as De,z as K,A as Z,B as J,C as Q,x as Ge}from"../chunks/index.85b3f724.js";import{g as Ue}from"../chunks/navigation.ea62138f.js";import{p as We}from"../chunks/stores.0b96371b.js";import{l as Be}from"../chunks/index.ba285384.js";import{e as Ie}from"../chunks/events-socket.42800548.js";import{u as He}from"../chunks/user.718f5da3.js";import{a as Re}from"../chunks/apiUrl.d59c2ca3.js";class qe{constructor(e,t,s){this.gameMode=s,this.canvasWidth=1100,this.canvasHeight=500,this.width=1100,this.height=500,this.border=5,this.score={p1:0,p2:0}}drawMap(e){e.strokeStyle="hsl(201, 100%, 96%)",e.lineWidth=this.border*2,e.fillStyle="#b6b6f2",e.fillRect(0,0,this.width,this.height),e.strokeRect(0,0,this.width,this.height)}drawNet(e){e.lineWidth=this.border,e.beginPath(),e.moveTo(this.width/2,0),e.lineTo(this.width/2,this.height),e.closePath(),e.stroke()}}class ke{constructor(e,t){this.player_height=e.height/7,this.player_width=10,this.x=t?30:e.width-30-this.player_width,this.y=e.height/2-this.player_height/2,this.speed=5,this.dir=0}reset(e,t){this.player_height=e.height/7,this.player_width=10,this.x=t?30:e.width-30-this.player_width,this.y=e.height/2-this.player_height/2,this.speed=5,this.dir=0}draw(e){e.fillStyle="hsl(201, 100%, 96%)",e.fillRect(this.x,this.y,this.player_width,this.player_height)}}class Ce{constructor(e,t){this.x=e.width/2,this.y=e.height/2,this.radius=e.gameMode==1?3:7,this.x_vel=0,this.y_vel=0}new(e){this.x=e.x,this.y=e.y,this.radius=e.radius,this.x_vel=e.x_vel,this.y_vel=e.y_vel}reset(e,t){this.x=e.width/2,this.y=e.height/2,this.x_vel=e.gameMode==1?-6:-4*t.x,this.y_vel=e.gameMode==1?-6:-4*t.y}update(e){this.x+=this.x_vel*(e/1.2),this.y+=this.y_vel*(e/1.2)}newCollision(e,t){this.x_vel=e,this.y_vel=t}draw(e){e.beginPath(),e.arc(this.x,this.y,this.radius,0,Math.PI*2,!0),e.fill()}}function Ne(){return new Promise(l=>{window.innerHeight>window.innerWidth?setTimeout(function(){l(Ne())},500):l(!1)})}function we(l){let e,t=(l[1]>1?l[1]-1:"GO!")+"",s;return{c(){e=y("div"),s=A(t),this.h()},l(r){e=b(r,"DIV",{class:!0});var i=M(e);s=O(i,t),i.forEach(f),this.h()},h(){g(e,"class","svelte-1k01j3x")},m(r,i){D(r,e,i),a(e,s)},p(r,i){i&2&&t!==(t=(r[1]>1?r[1]-1:"GO!")+"")&&ne(s,t)},d(r){r&&f(e)}}}function Ve(l){let e,t=l[1]>0&&l[0]&&we(l);return{c(){t&&t.c(),e=C()},l(s){t&&t.l(s),e=C()},m(s,r){t&&t.m(s,r),D(s,e,r)},p(s,[r]){s[1]>0&&s[0]?t?t.p(s,r):(t=we(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:z,o:z,d(s){t&&t.d(s),s&&f(e)}}}function Ye(l,e,t){let{socket:s}=e,r=!1,i=6;return s.on("startTimer",()=>{t(0,r=!0)}),s.on("decrTimer",n=>{t(1,i=n)}),l.$$set=n=>{"socket"in n&&t(2,s=n.socket)},[r,i,s]}class je extends X{constructor(e){super(),x(this,e,Ye,Ve,ee,{socket:2})}}function Le(l){let e,t,s,r,i;return{c(){e=y("body"),t=y("h1"),s=A("Turn the phone"),r=$(),i=y("iconify-icon"),this.h()},l(n){e=b(n,"BODY",{class:!0});var _=M(e);t=b(_,"H1",{class:!0});var h=M(t);s=O(h,"Turn the phone"),h.forEach(f),r=S(_),i=b(_,"ICONIFY-ICON",{icon:!0,class:!0}),M(i).forEach(f),_.forEach(f),this.h()},h(){g(t,"class","svelte-1e98n6j"),ye(i,"icon","mdi:phone-rotate-landscape"),ye(i,"class","svelte-1e98n6j"),g(e,"class","svelte-1e98n6j")},m(n,_){D(n,e,_),a(e,t),a(t,s),a(e,r),a(e,i)},p:z,i:z,o:z,d(n){n&&f(e)}}}class Ae extends X{constructor(e){super(),x(this,e,null,Le,ee,{})}}function Fe(l){let e;return{c(){e=A("You're such a loser...")},l(t){e=O(t,"You're such a loser...")},m(t,s){D(t,e,s)},d(t){t&&f(e)}}}function Ke(l){let e,t;return{c(){e=y("button"),t=A("Accept revanche"),this.h()},l(s){e=b(s,"BUTTON",{class:!0});var r=M(e);t=O(r,"Accept revanche"),r.forEach(f),this.h()},h(){g(e,"class","contrast")},m(s,r){D(s,e,r),a(e,t)},d(s){s&&f(e)}}}function Ze(l){let e,t,s,r,i,n,_,h,m,w,u,c,o,p,v,N,P,I,E,k,T,G,H,te,V,d,oe,Y,ae,ce;function Oe(j,se){return Fe}let ie=Oe()(l),R=Ke();return{c(){e=y("div"),t=y("div"),s=y("h2"),ie.c(),r=$(),i=y("div"),n=y("img"),h=$(),m=y("span"),w=A(Pe),u=$(),c=y("span"),o=A("-"),p=$(),v=y("span"),N=A(Ee),P=$(),I=y("img"),k=$(),T=y("div"),G=y("button"),H=A("Search new game"),te=$(),V=y("button"),d=A("Ask revanche"),oe=$(),Y=y("button"),ae=A("Go back home"),ce=$(),R&&R.c(),this.h()},l(j){e=b(j,"DIV",{class:!0});var se=M(e);t=b(se,"DIV",{class:!0});var L=M(t);s=b(L,"H2",{class:!0});var fe=M(s);ie.l(fe),fe.forEach(f),r=S(L),i=b(L,"DIV",{class:!0});var B=M(i);n=b(B,"IMG",{src:!0,alt:!0,class:!0}),h=S(B),m=b(B,"SPAN",{class:!0});var de=M(m);w=O(de,Pe),de.forEach(f),u=S(B),c=b(B,"SPAN",{});var _e=M(c);o=O(_e,"-"),_e.forEach(f),p=S(B),v=b(B,"SPAN",{class:!0});var me=M(v);N=O(me,Ee),me.forEach(f),P=S(B),I=b(B,"IMG",{src:!0,alt:!0,class:!0}),B.forEach(f),k=S(L),T=b(L,"DIV",{class:!0});var q=M(T);G=b(q,"BUTTON",{});var pe=M(G);H=O(pe,"Search new game"),pe.forEach(f),te=S(q),V=b(q,"BUTTON",{});var ge=M(V);d=O(ge,"Ask revanche"),ge.forEach(f),oe=S(q),Y=b(q,"BUTTON",{class:!0,style:!0});var ve=M(Y);ae=O(ve,"Go back home"),ve.forEach(f),ce=S(q),R&&R.l(q),q.forEach(f),L.forEach(f),se.forEach(f),this.h()},h(){g(s,"class","svelte-1k7zz8v"),be(n.src,_=l[0].avatar.url)||g(n,"src",_),g(n,"alt","avatar"),g(n,"class","svelte-1k7zz8v"),g(m,"class","color-win svelte-1k7zz8v"),g(v,"class","color-lose svelte-1k7zz8v"),be(I.src,E=l[1].avatar.url)||g(I,"src",E),g(I,"alt","avatar"),g(I,"class","svelte-1k7zz8v"),g(i,"class","players-wrapper svelte-1k7zz8v"),g(Y,"class","contrast outline"),$e(Y,"margin-bottom","2rem"),g(T,"class","buttons-wrapper svelte-1k7zz8v"),g(t,"class","container svelte-1k7zz8v"),g(e,"class","post-game-lobby-page svelte-1k7zz8v")},m(j,se){D(j,e,se),a(e,t),a(t,s),ie.m(s,null),a(t,r),a(t,i),a(i,n),a(i,h),a(i,m),a(m,w),a(i,u),a(i,c),a(c,o),a(i,p),a(i,v),a(v,N),a(i,P),a(i,I),a(t,k),a(t,T),a(T,G),a(G,H),a(T,te),a(T,V),a(V,d),a(T,oe),a(T,Y),a(Y,ae),a(T,ce),R&&R.m(T,null)},p:z,i:z,o:z,d(j){j&&f(e),ie.d(),R&&R.d()}}}let Pe=10,Ee=3;function Je(l){return[{username:"gnogno",avatar:{url:"https://picsum.photos/600"},wins:1,losses:1},{username:"gnagna",avatar:{url:"https://picsum.photos/600"},wins:1,losses:1}]}class Qe extends X{constructor(e){super(),x(this,e,Je,Ze,ee,{})}}function Me(l){let e,t,s;return{c(){e=y("div"),t=A("A player disconnected, game end in : "),s=A(l[1]),this.h()},l(r){e=b(r,"DIV",{class:!0});var i=M(e);t=O(i,"A player disconnected, game end in : "),s=O(i,l[1]),i.forEach(f),this.h()},h(){g(e,"class","svelte-laehf8")},m(r,i){D(r,e,i),a(e,t),a(e,s)},p(r,i){i&2&&ne(s,r[1])},d(r){r&&f(e)}}}function Xe(l){let e,t=l[1]>0&&l[0]&&Me(l);return{c(){t&&t.c(),e=C()},l(s){t&&t.l(s),e=C()},m(s,r){t&&t.m(s,r),D(s,e,r)},p(s,[r]){s[1]>0&&s[0]?t?t.p(s,r):(t=Me(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:z,o:z,d(s){t&&t.d(s),s&&f(e)}}}function xe(l,e,t){let{socket:s}=e,r=!1,i=5;return s.on("decoTimer",()=>{t(0,r=!0);let n=setInterval(()=>{t(1,i-=1),i==0&&clearInterval(n)},1e3)}),l.$$set=n=>{"socket"in n&&t(2,s=n.socket)},[r,i,s]}class et extends X{constructor(e){super(),x(this,e,xe,Xe,ee,{socket:2})}}const{window:re}=De;function tt(l){let e,t;return e=new Qe({}),{c(){K(e.$$.fragment)},l(s){Z(e.$$.fragment,s)},m(s,r){J(e,s,r),t=!0},p:z,i(s){t||(U(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){Q(e,s)}}}function st(l){let e,t,s,r,i,n,_,h=l[5].score.p1+"",m,w,u,c=l[5].score.p2+"",o,p,v,N,P,I;return t=new je({props:{socket:l[0]}}),r=new et({props:{socket:l[0]}}),{c(){e=y("main"),K(t.$$.fragment),s=$(),K(r.$$.fragment),i=$(),n=y("div"),_=y("strong"),m=A(h),w=$(),u=y("strong"),o=A(c),p=$(),v=y("canvas"),this.h()},l(E){e=b(E,"MAIN",{});var k=M(e);Z(t.$$.fragment,k),s=S(k),Z(r.$$.fragment,k),i=S(k),n=b(k,"DIV",{class:!0});var T=M(n);_=b(T,"STRONG",{class:!0});var G=M(_);m=O(G,h),G.forEach(f),w=S(T),u=b(T,"STRONG",{class:!0});var H=M(u);o=O(H,c),H.forEach(f),T.forEach(f),p=S(k),v=b(k,"CANVAS",{width:!0,height:!0,id:!0,class:!0}),M(v).forEach(f),k.forEach(f),this.h()},h(){g(_,"class","svelte-11ocpqo"),g(u,"class","svelte-11ocpqo"),g(n,"class","score svelte-11ocpqo"),g(v,"width",N=l[5].canvasWidth),g(v,"height",P=l[5].canvasHeight),g(v,"id","pong"),g(v,"class","svelte-11ocpqo")},m(E,k){D(E,e,k),J(t,e,null),a(e,s),J(r,e,null),a(e,i),a(e,n),a(n,_),a(_,m),a(n,w),a(n,u),a(u,o),a(e,p),a(e,v),l[12](v),I=!0},p(E,k){const T={};k&1&&(T.socket=E[0]),t.$set(T);const G={};k&1&&(G.socket=E[0]),r.$set(G),(!I||k&32)&&h!==(h=E[5].score.p1+"")&&ne(m,h),(!I||k&32)&&c!==(c=E[5].score.p2+"")&&ne(o,c),(!I||k&32&&N!==(N=E[5].canvasWidth))&&g(v,"width",N),(!I||k&32&&P!==(P=E[5].canvasHeight))&&g(v,"height",P)},i(E){I||(U(t.$$.fragment,E),U(r.$$.fragment,E),I=!0)},o(E){W(t.$$.fragment,E),W(r.$$.fragment,E),I=!1},d(E){E&&f(e),Q(t),Q(r),l[12](null)}}}function Te(l){let e,t;return e=new Ae({}),{c(){K(e.$$.fragment)},l(s){Z(e.$$.fragment,s)},m(s,r){J(e,s,r),t=!0},i(s){t||(U(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){Q(e,s)}}}function rt(l){let e,t,s,r,i,n,_;const h=[st,tt],m=[];function w(c,o){return c[1]?0:1}e=w(l),t=m[e]=h[e](l);let u=l[2]&&l[3]&&Te();return{c(){t.c(),s=$(),u&&u.c(),r=C()},l(c){t.l(c),s=S(c),u&&u.l(c),r=C()},m(c,o){m[e].m(c,o),D(c,s,o),u&&u.m(c,o),D(c,r,o),i=!0,n||(_=[F(re,"keydown",l[7]),F(re,"keyup",l[8]),F(re,"popstate",l[6]),F(re,"mousedown",l[9]),F(re,"mouseup",l[10])],n=!0)},p(c,[o]){let p=e;e=w(c),e===p?m[e].p(c,o):(he(),W(m[p],1,1,()=>{m[p]=null}),ue(),t=m[e],t?t.p(c,o):(t=m[e]=h[e](c),t.c()),U(t,1),t.m(s.parentNode,s)),c[2]&&c[3]?u?o&12&&U(u,1):(u=Te(),u.c(),U(u,1),u.m(r.parentNode,r)):u&&(he(),W(u,1,1,()=>{u=null}),ue())},i(c){i||(U(t),U(u),i=!0)},o(c){W(t),W(u),i=!1},d(c){m[e].d(c),c&&f(s),u&&u.d(c),c&&f(r),n=!1,Se(_)}}}function it(l,e,t){let s;le(l,Ie,d=>t(19,s=d));let{gameMode:r}=e,{socket:i}=e,n=!0,_=!1,h=0,m;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(m=!0);let w={IDLE:0,UP:1,DOWN:2},u=0,c,o,p,v,N,P=new qe(window.innerWidth,window.innerHeight,r);function I(d){n&&(alert("You are quitting the game, if you dont comeback in the next 5 seconds, you will automatically lose the game"),i.disconnect())}let E={x:1,y:1};ze(()=>{o=new ke(P,!0),p=new ke(P,!1),c=new Ce(P,E),v=N.getContext("2d"),P.width>window.innerWidth||P.height>window.innerHeight?t(4,N.style.cssText="position: absolute;top: 50%;left: 50%;transform: scale(1) translate(-50%, -50%);width: 100%;height: 100%;transform-origin: top left;color: #b6b6f2;",N):t(4,N.style.cssText="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);color: #b6b6f2;",N),i.emit("ready"),requestAnimationFrame(k)}),i.on("startGame",()=>{u=0}),i.on("resetOpacity",()=>{u=0}),i.on("deco",()=>{s.emit("leave-game"),t(1,n=!1)}),i.on("playerMove",d=>{o.dir=d[0],p.dir=d[1]}),i.on("endGame",()=>{s.emit("leave-game"),i.emit("destroyGame"),t(1,n=!1)}),i.on("updateBall",d=>{c.x=d[0],c.y=d[1]}),i.on("updateScore",d=>{t(5,P.score.p1=d[0],P),t(5,P.score.p2=d[1],P)}),i.on("Down",d=>{o.x=d[0].x,o.y=d[0].y,o.dir=d[0].dir,p.x=d[1].x,p.y=d[1].y,p.dir=d[1].dir});const k=()=>{window.innerHeight>window.innerWidth?t(2,_=!0):t(2,_=!1),u++,P.drawMap(v),P.drawNet(v),o.dir==w.UP&&o.y>0?o.y-=o.speed:o.dir==w.DOWN&&o.y+o.player_height<P.height&&(o.y+=o.speed),p.dir==w.UP&&p.y>0?p.y-=p.speed:p.dir==w.DOWN&&p.y+p.player_height<P.height&&(p.y+=p.speed),o.draw(v),p.draw(v),r===2&&(v.globalAlpha=1-Math.min(1,u/150)),c.draw(v),h!=c.x_vel&&(u=0,h=c.x_vel),v.globalAlpha=1,requestAnimationFrame(k)};function T(d){d.key=="w"?i.emit("playerUp",o.dir,p.dir):d.key=="s"&&i.emit("playerDown",o.dir,p.dir)}function G(){i.emit("keyReleased")}function H(d){d.clientY<window.innerHeight/2?i.emit("playerUp",o.dir,p.dir):i.emit("playerDown",o.dir,p.dir)}function te(){i.emit("keyReleased")}function V(d){Ge[d?"unshift":"push"](()=>{N=d,t(4,N)})}return l.$$set=d=>{"gameMode"in d&&t(11,r=d.gameMode),"socket"in d&&t(0,i=d.socket)},[i,n,_,m,N,P,I,T,G,H,te,r,V]}class lt extends X{constructor(e){super(),x(this,e,it,rt,ee,{gameMode:11,socket:0})}}function nt(l){let e,t,s,r,i;return{c(){e=A(`RoomId not found

	`),t=y("button"),s=A("Go back home")},l(n){e=O(n,`RoomId not found

	`),t=b(n,"BUTTON",{});var _=M(t);s=O(_,"Go back home"),_.forEach(f)},m(n,_){D(n,e,_),D(n,t,_),a(t,s),r||(i=F(t,"click",l[5]),r=!0)},p:z,i:z,o:z,d(n){n&&f(e),n&&f(t),r=!1,i()}}}function ot(l){let e,t;return e=new Ae({}),{c(){K(e.$$.fragment)},l(s){Z(e.$$.fragment,s)},m(s,r){J(e,s,r),t=!0},p:z,i(s){t||(U(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){Q(e,s)}}}function at(l){let e,t;return e=new lt({props:{gameMode:l[2],socket:l[4]}}),{c(){K(e.$$.fragment)},l(s){Z(e.$$.fragment,s)},m(s,r){J(e,s,r),t=!0},p(s,r){const i={};r&4&&(i.gameMode=s[2]),e.$set(i)},i(s){t||(U(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){Q(e,s)}}}function ct(l){let e,t,s,r;const i=[at,ot,nt],n=[];function _(h,m){return h[1]&&(!h[0]||!h[3])?0:h[0]&&h[3]?1:2}return e=_(l),t=n[e]=i[e](l),{c(){t.c(),s=C()},l(h){t.l(h),s=C()},m(h,m){n[e].m(h,m),D(h,s,m),r=!0},p(h,[m]){let w=e;e=_(h),e===w?n[e].p(h,m):(he(),W(n[w],1,1,()=>{n[w]=null}),ue(),t=n[e],t?t.p(h,m):(t=n[e]=i[e](h),t.c()),U(t,1),t.m(s.parentNode,s))},i(h){r||(U(t),r=!0)},o(h){W(t),r=!1},d(h){n[e].d(h),h&&f(s)}}}function ht(l,e,t){let s,r,i;le(l,Ie,o=>t(6,s=o)),le(l,He,o=>t(7,r=o)),le(l,We,o=>t(8,i=o));let n=!0,_=i.params.id,h=!1,m=0,w=Be(`${Re}/game`),u=!1;return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(u=!0),w.emit("checkId",_,r==null?void 0:r.id),w.on("found",o=>{t(1,h=!0),t(2,m=o),s.emit("join-game")}),Ne().then(o=>{t(0,n=o)}),[n,h,m,u,w,()=>{Ue("/")}]}class yt extends X{constructor(e){super(),x(this,e,ht,ct,ee,{})}}export{yt as default};