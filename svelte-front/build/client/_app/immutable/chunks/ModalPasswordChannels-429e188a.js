import{S as j,i as D,s as U,k as m,q as y,a as k,l as p,m as E,r as M,h as f,c as v,n as I,b as W,E as l,F as H,G as R,X,C as L,H as z,I as B}from"./index-5fac9acd.js";import{g as J}from"./navigation-ac3df971.js";import{c as K}from"./chat-socket-2e09708d.js";function N(a){let t,e;return{c(){t=m("span"),e=y("Error ! Wrong password.")},l(s){t=p(s,"SPAN",{});var i=E(t);e=M(i,"Error ! Wrong password."),i.forEach(f)},m(s,i){W(s,t,i),l(t,e)},d(s){s&&f(t)}}}function Q(a){let t,e,s,i,u,n,g,w,c,o,A,S,d,P,O,T,r=a[2]&&N();return{c(){t=m("dialog"),e=m("article"),s=m("h3"),i=y("Enter password :"),u=k(),n=m("input"),g=k(),r&&r.c(),w=k(),c=m("footer"),o=m("a"),A=y("Cancel"),S=k(),d=m("a"),P=y("Confirm"),this.h()},l(_){t=p(_,"DIALOG",{});var C=E(t);e=p(C,"ARTICLE",{});var h=E(e);s=p(h,"H3",{});var q=E(s);i=M(q,"Enter password :"),q.forEach(f),u=v(h),n=p(h,"INPUT",{type:!0}),g=v(h),r&&r.l(h),w=v(h),c=p(h,"FOOTER",{});var b=E(c);o=p(b,"A",{href:!0,role:!0,class:!0});var F=E(o);A=M(F,"Cancel"),F.forEach(f),S=v(b),d=p(b,"A",{href:!0,role:!0});var G=E(d);P=M(G,"Confirm"),G.forEach(f),b.forEach(f),h.forEach(f),C.forEach(f),this.h()},h(){I(n,"type","text"),I(o,"href","/channels"),I(o,"role","button"),I(o,"class","secondary"),I(d,"href"," "),I(d,"role","button"),t.open=!0},m(_,C){W(_,t,C),l(t,e),l(e,s),l(s,i),l(e,u),l(e,n),H(n,a[1]),l(e,g),r&&r.m(e,null),l(e,w),l(e,c),l(c,o),l(o,A),l(c,S),l(c,d),l(d,P),O||(T=[R(n,"input",a[5]),R(o,"click",function(){X(a[0])&&a[0].apply(this,arguments)}),R(d,"click",a[3])],O=!0)},p(_,[C]){a=_,C&2&&n.value!==a[1]&&H(n,a[1]),a[2]?r||(r=N(),r.c(),r.m(e,w)):r&&(r.d(1),r=null)},i:L,o:L,d(_){_&&f(t),r&&r.d(),O=!1,z(T)}}}function V(a,t,e){let s;B(a,K,o=>e(6,s=o));let{closeModal:i}=t,{roomId:u}=t,n,g=!1;function w(){s.emit("joinRoom",u,n,o=>{o?(i(),J("/channels/"+u)):e(2,g=!0)})}function c(){n=this.value,e(1,n)}return a.$$set=o=>{"closeModal"in o&&e(0,i=o.closeModal),"roomId"in o&&e(4,u=o.roomId)},[i,n,g,w,u,c]}class $ extends j{constructor(t){super(),D(this,t,V,Q,U,{closeModal:0,roomId:4})}}export{$ as M};