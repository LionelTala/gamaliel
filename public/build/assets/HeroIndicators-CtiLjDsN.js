import{t as e}from"./jsx-runtime-BkSabwWG.js";var t=e(),n=({total:e,current:n,onSelect:r})=>(0,t.jsx)(`div`,{className:`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2`,children:Array.from({length:e}).map((e,i)=>(0,t.jsx)(`button`,{onClick:()=>r(i),className:`
            transition-all duration-300 rounded-full
            ${n===i?`w-10 h-2.5 bg-white`:`w-2.5 h-2.5 bg-white/40 hover:bg-white/60`}
          `,"aria-label":`Aller à la slide ${i+1}`,"aria-current":n===i?`true`:`false`},i))});export{n as default};