import{mkdirSync as A,readdirSync as J,readFileSync as C,writeFileSync as D}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',Q=[0,-1,0,1,-1,0,1,0],H2='udlrUDLR';
function P(t){const R=t.split('\n').filter(r=>r.length),h=R.length,w=Math.max(...R.map(r=>r.length)),a=new Uint8Array(w*h).fill(1),g=[],b=[];let p=-1;
R.forEach((r,y)=>{for(let x=0;x<r.length;x++){const c=r[x],i=y*w+x;if(c==='#')continue;a[i]=0;
if(c==='.'||c==='*'||c==='+')g.push(i);if(c==='$'||c==='*')b.push(i);if(c==='@'||c==='+')p=i;}});
for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(!x||!y||x===w-1||y===h-1)a[y*w+x]=1;
return{w,a,g,b,p};}
function V(w,a,g){const v=new Uint8Array(a.length),q=[...g];for(const x of g)v[x]=1;
for(let i=0;i<q.length;i++){const x=q[i];for(let k=0;k<4;k++){const d=Q[2*k+1]*w+Q[2*k],y=x-d;
if(!a[y]&&!a[y-d]&&!v[y]){v[y]=1;q.push(y);}}}return v;}
function H(l,o,f,s,t,k){let m=f,n=0;k[n++]=f;s[f]=t;
while(n>0){const p=k[--n];if(p<m)m=p;for(const q of[p-l.w,p+l.w,p-1,p+1])if(!l.a[q]&&!o[q]&&s[q]!==t){s[q]=t;k[n++]=q;}}return m;}
function Z(l,o,G,t){for(const a of[t,t-1,t-l.w,t-l.w-1]){const b=a+1,c=a+l.w,d=c+1;
if(!(l.a[a]||o[a])||!(l.a[b]||o[b])||!(l.a[c]||o[c])||!(l.a[d]||o[d]))continue;
if(o[a]&&!G[a]||o[b]&&!G[b]||o[c]&&!G[c]||o[d]&&!G[d])return 1;}return 0;}
function K(l,o,f,t){if(f===t)return'';const v=new Int32Array(l.a.length).fill(-1),h=new Array(l.a.length),q=[f];v[f]=f;
for(let i=0;i<q.length;i++){const p=q[i];if(p===t)break;for(let k=0;k<4;k++){const r=p+Q[2*k+1]*l.w+Q[2*k];
if(l.a[r]||o[r]||v[r]!==-1)continue;v[r]=p;h[r]=H2[k];q.push(r);}}
if(v[t]===-1)throw 0;let s='';for(let p=t;p!==f;p=v[p])s=h[p]+s;return s;}
function T(l,X){const{w,a,g}=l,n=a.length,G=new Uint8Array(n);for(const x of g)G[x]=1;
const v=V(w,a,g),o=new Uint8Array(n),e=new Int32Array(n),W=new Int32Array(n),S=new Int32Array(n);let u=0;
const Y=A=>A.every(x=>G[x]);if(l.b.some(b=>!v[b]))return null;
const A2=[l.b],C=[l.p],pa=[-1],ix=new Map();
for(const b of l.b)o[b]=1;{let k=H(l,o,l.p,e,++u,S);for(const b of l.b)k=k*n+b;ix.set(k,0);}for(const b of l.b)o[b]=0;
let F2=Y(l.b)?0:-1;
for(let q=0;F2<0&&q<A2.length;q++){const Bs=A2[q];for(const b of Bs)o[b]=1;H(l,o,C[q],e,++u,S);
const J=u;B:for(let j=0;j<Bs.length&&F2<0;j++){const y=Bs[j];
for(let k=0;k<4;k++){const d=Q[2*k+1]*w+Q[2*k],t=y+d;
if(e[y-d]!==J||a[t]||o[t]||!v[t])continue;o[y]=0;o[t]=1;const z=Z(l,o,G,t);
let K2=-1,x=null;
if(!z){x=Bs.slice();x[j]=t;x.sort((m,n2)=>m-n2);K2=H(l,o,y,W,++u,S);for(const c of x)K2=K2*n+c;}o[t]=0;o[y]=1;
if(z||ix.has(K2))continue;if(A2.length>=X){for(const c of Bs)o[c]=0;return null;}
ix.set(K2,A2.length);A2.push(x);C.push(y);pa.push(q);if(Y(x)){F2=A2.length-1;break B;}}}for(const c of Bs)o[c]=0;}
if(F2<0)return null;const ph=[];for(let s=F2;s;s=pa[s])ph.unshift(s);
let m='',p=l.p,Bs=l.b;for(const s of ph){const nx=A2[s],f=Bs.find(b=>!nx.includes(b)),t=nx.find(b=>!Bs.includes(b)),d=t-f;
const k=d===-w?0:d===w?1:d===-1?2:3;for(const b of Bs)o[b]=1;m+=K(l,o,p,f-d);for(const b of Bs)o[b]=0;m+=H2[k+4];p=f;Bs=nx;}
return{moves:m,e:p};}
function U(l){const{w,a,g,b,p}=l,v=V(w,a,g),r=Math.floor(p/w),c=new Uint8Array(a.length);
for(let i=r*w;i<(r+1)*w;i++)if(!a[i]&&!v[i])c[i]=1;if(b.some(x=>c[x]))return null;
const y=new Int32Array(a.length).fill(-1),s=[];
for(let k=0;k<a.length;k++){if(a[k]||c[k]||y[k]>=0)continue;const q=[k];y[k]=s.length;
for(let i=0;i<q.length;i++)for(let j=0;j<4;j++){const n2=q[i]+Q[2*j+1]*w+Q[2*j];if(!a[n2]&&!c[n2]&&y[n2]<0){y[n2]=s.length;q.push(n2);}}
s.push({b:[],g:[]});}
for(const x of b)s[y[x]].b.push(x);for(const x of g)if(y[x]>=0)s[y[x]].g.push(x);
if(g.some(x=>y[x]<0)||s.some(t=>t.b.length!==t.g.length))return null;
return s.filter(t=>t.b.length);}
function S(l){const s=U(l);if(!s)return null;let p=l.p,m='';
for(let i=0;i<s.length;i++){const r=s[i],a=l.a.slice();
for(let j=0;j<s.length;j++)if(j!==i)for(const z of j<i?s[j].g:s[j].b)a[z]=1;
const R2=T({w:l.w,a,g:r.g,b:r.b,p},250000);
if(!R2)return null;m+=R2.moves;p=R2.e;}
return{moves:m};}
for(const id of J(I).sort()){let m='';try{const s=S(P(C(I+'/'+id+'/level.txt','utf8')));m=s?s.moves:'';}catch{m='';}
A(O+'/'+id,{recursive:true});D(O+'/'+id+'/solution.txt',m+'\n');}
