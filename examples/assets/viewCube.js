import"./modulepreload-polyfill-B5Qt9EMX.js";import{p as r,f as i,a as o,s,i as m,k as c,N as p}from"./index-BezPsGgn.js";import{M as d}from"./index-BqFmid1y.js";import"./index-80lWxJJL.js";import"./state-CdSmRkb4.js";r.init();d.init();const e=new i,w=e.get(o),t=w.create();t.scene=new s(e);const a=document.createElement("bim-viewport");t.renderer=new m(e,a);t.camera=new c(e);const n=document.createElement("bim-view-cube");n.camera=t.camera.three;a.append(n);t.camera.controls.addEventListener("update",()=>n.updateOrientation());const l=document.getElementById("app");l.layouts={main:{template:`
      "viewport"
    `,elements:{viewport:a}}};const u=e.get(p);u.create(t);e.init();
