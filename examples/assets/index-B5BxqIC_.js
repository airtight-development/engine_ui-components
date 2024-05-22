import{O as ht,V as dt,b as z,M as w,G as L,F as ut,L as mt,B as Y,c as pt,d as ft,a as gt,s as bt,n as _t,p as G}from"./index-Dhy3Nnp8.js";import{G as xt}from"./index-L7zXnaxf.js";import{s as N,i as B,x as F,n as l,r as vt}from"./state-CdSmRkb4.js";class yt extends ht{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new dt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}new z;new w;new w;new z;new z;class wt{constructor(t,e){this._group=new L,this._frustum=new ut,this._frustumMat=new w,this._regenerateDelay=200,this._regenerateCounter=0,this.material=new mt({color:"#2e3338"}),this.numbers=new L,this.maxRegenerateRetrys=4,this.gridsFactor=5,this._scaleX=1,this._scaleY=1,this._camera=t,this._container=e;const i=this.newGrid(-1),s=this.newGrid(-2);this.grids={main:i,secondary:s},this._group.add(s,i,this.numbers)}set scaleX(t){this._scaleX=t,this.regenerate()}get scaleX(){return this._scaleX}set scaleY(t){this._scaleY=t,this.regenerate()}get scaleY(){return this._scaleY}get(){return this._group}dispose(){const{main:t,secondary:e}=this.grids;t.removeFromParent(),e.removeFromParent(),t.geometry.dispose(),t.material.dispose(),e.geometry.dispose(),e.material.dispose()}regenerate(){if(!this.isGridReady()){if(this._regenerateCounter++,this._regenerateCounter>this.maxRegenerateRetrys)throw new Error("Grid could not be regenerated");setTimeout(()=>this.regenerate,this._regenerateDelay);return}this._regenerateCounter=0;const e=this._frustumMat.multiplyMatrices(this._camera.projectionMatrix,this._camera.matrixWorldInverse);this._frustum.setFromProjectionMatrix(e);const{planes:i}=this._frustum,s=i[0].constant*-i[0].normal.x,r=i[1].constant*-i[1].normal.x,a=i[2].constant*-i[2].normal.y,k=i[3].constant*-i[3].normal.y,x=Math.abs(s-r),v=Math.abs(k-a),{clientWidth:R,clientHeight:A}=this._container,j=Math.max(R,A),M=Math.max(x,v)/j,H=Math.ceil(Math.log10(x/this.scaleX)),V=Math.ceil(Math.log10(v/this.scaleY)),f=10**(H-2)*this.scaleX,g=10**(V-2)*this.scaleY,d=f*this.gridsFactor,b=g*this.gridsFactor,Z=Math.ceil(v/b),E=Math.ceil(x/d),I=Math.ceil(v/g),U=Math.ceil(x/f),W=f*Math.ceil(r/f),q=g*Math.ceil(a/g),$=d*Math.ceil(r/d),J=b*Math.ceil(a/b),K=[...this.numbers.children];for(const o of K)o.removeFromParent();this.numbers.children=[];const C=[],Q=9*M,u=1e4,tt=Math.round(Math.abs($/this.scaleX)*u)/u,et=(E-1)*d,st=Math.round(Math.abs(($+et)/this.scaleX)*u)/u,it=Math.max(tt,st).toString().length*Q;let S=Math.ceil(it/d)*d;for(let o=0;o<E;o++){let n=$+o*d;C.push(n,k,0,n,a,0);const _=n/this.scaleX;n=Math.round(n*u)/u,S=Math.round(S*u)/u;const y=n%S;if(!(d<1||b<1)&&Math.abs(y)>.01)continue;const ct=this.newNumber(_),lt=12*M;ct.position.set(n,a+lt,0)}for(let o=0;o<Z;o++){const n=J+o*b;C.push(r,n,0,s,n,0);const _=this.newNumber(n/this.scaleY);let y=12;_.element.textContent&&(y+=4*_.element.textContent.length);const P=y*M;_.position.set(r+P,n,0)}const D=[];for(let o=0;o<U;o++){const n=W+o*f;D.push(n,k,0,n,a,0)}for(let o=0;o<I;o++){const n=q+o*g;D.push(r,n,0,s,n,0)}const rt=new Y(new Float32Array(C),3),nt=new Y(new Float32Array(D),3),{main:ot,secondary:at}=this.grids;ot.geometry.setAttribute("position",rt),at.geometry.setAttribute("position",nt)}newNumber(t){const e=document.createElement("bim-label");e.label=String(Math.round(t*100)/100);const i=new yt(e);return this.numbers.add(i),i}newGrid(t){const e=new pt,i=new ft(e,this.material);return i.frustumCulled=!1,i.renderOrder=t,i}isGridReady(){const t=this._camera.projectionMatrix.elements;for(let e=0;e<t.length;e++){const i=t[e];if(Number.isNaN(i))return!1}return!0}}var kt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,O=(h,t,e,i)=>{for(var s=Mt(t,e),r=h.length-1,a;r>=0;r--)(a=h[r])&&(s=a(t,e,s)||s);return s&&kt(t,e,s),s};const X=class X extends N{constructor(){super(...arguments),this._grid=null,this._world=null,this.resize=()=>{var t;this._world&&this._grid&&((t=this._world.renderer)==null||t.resize(),this._world.camera.updateAspect(),this._grid.regenerate())}}set gridColor(t){if(this._gridColor=t,!(t&&this._grid))return;const e=Number(t.replace("#","0x"));Number.isNaN(e)||this._grid.material.color.setHex(e)}get gridColor(){return this._gridColor}set gridScaleX(t){this._gridScaleX=t,t&&this._grid&&(this._grid.scaleX=t)}get gridScaleX(){return this._gridScaleX}set gridScaleY(t){this._gridScaleY=t,t&&this._grid&&(this._grid.scaleY=t)}get gridScaleY(){return this._gridScaleY}set components(t){this.dispose();const i=t.get(gt).create();this._world=i,i.scene=new bt(t),i.scene.setup(),i.renderer=new xt(t,this);const s=new _t(t);i.camera=s,s.controls.dollySpeed=3,s.controls.draggingSmoothTime=.085,s.controls.maxZoom=1e3,s.controls.zoom(4),s.set("Plan"),s.controls.setPosition(0,0,1),s.projection.set("Orthographic");const r=new wt(s.threeOrtho,this);this._grid=r,i.scene.three.add(r.get()),s.controls.addEventListener("update",()=>r.regenerate())}get world(){return this._world}dispose(){var t;(t=this.world)==null||t.dispose(),this._world=null,this._grid=null}connectedCallback(){super.connectedCallback(),new ResizeObserver(this.resize).observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.dispose()}render(){return F`<slot></slot>`}};X.styles=B`
    :host {
      position: relative;
      display: flex;
      min-width: 0px;
      height: 100%;
      background-color: var(--bim-ui_bg-base);
    }
  `;let p=X;O([l({type:String,attribute:"grid-color",reflect:!0})],p.prototype,"gridColor");O([l({type:Number,attribute:"grid-scale-x",reflect:!0})],p.prototype,"gridScaleX");O([l({type:Number,attribute:"grid-scale-y",reflect:!0})],p.prototype,"gridScaleY");var $t=Object.defineProperty,m=(h,t,e,i)=>{for(var s=void 0,r=h.length-1,a;r>=0;r--)(a=h[r])&&(s=a(t,e,s)||s);return s&&$t(t,e,s),s};const T=class T extends N{constructor(){super(...arguments),this._defaults={size:60},this._cssMatrix3D="",this._matrix=new w,this._onRightClick=new Event("rightclick"),this._onLeftClick=new Event("leftclick"),this._onTopClick=new Event("topclick"),this._onBottomClick=new Event("bottomclick"),this._onFrontClick=new Event("frontclick"),this._onBackClick=new Event("backclick"),this._camera=null,this._epsilon=t=>Math.abs(t)<1e-10?0:t}set camera(t){this._camera=t,this.updateOrientation()}get camera(){return this._camera}updateOrientation(){if(!this.camera)return;this._matrix.extractRotation(this.camera.matrixWorldInverse);const{elements:t}=this._matrix;this._cssMatrix3D=`matrix3d(
      ${this._epsilon(t[0])},
      ${this._epsilon(-t[1])},
      ${this._epsilon(t[2])},
      ${this._epsilon(t[3])},
      ${this._epsilon(t[4])},
      ${this._epsilon(-t[5])},
      ${this._epsilon(t[6])},
      ${this._epsilon(t[7])},
      ${this._epsilon(t[8])},
      ${this._epsilon(-t[9])},
      ${this._epsilon(t[10])},
      ${this._epsilon(t[11])},
      ${this._epsilon(t[12])},
      ${this._epsilon(-t[13])},
      ${this._epsilon(t[14])},
      ${this._epsilon(t[15])})
    `}render(){const t=this.size??this._defaults.size;return F`
      <style>
        .face,
        .cube {
          width: ${t}px;
          height: ${t}px;
          transform: translateZ(-300px) ${this._cssMatrix3D};
        }

        .face-right {
          translate: ${t/2}px 0 0;
        }

        .face-left {
          translate: ${-t/2}px 0 0;
        }

        .face-top {
          translate: 0 ${t/2}px 0;
        }

        .face-bottom {
          translate: 0 ${-t/2}px 0;
        }

        .face-front {
          translate: 0 0 ${t/2}px;
        }

        .face-back {
          translate: 0 0 ${-t/2}px;
        }
      </style>
      <div class="parent">
        <div class="cube">
          <div
            class="face x-direction face-right"
            @click=${()=>this.dispatchEvent(this._onRightClick)}
          >
            ${this.rightText}
          </div>
          <div
            class="face x-direction face-left"
            @click=${()=>this.dispatchEvent(this._onLeftClick)}
          >
            ${this.leftText}
          </div>
          <div
            class="face y-direction face-top"
            @click=${()=>this.dispatchEvent(this._onTopClick)}
          >
            ${this.topText}
          </div>
          <div
            class="face y-direction face-bottom"
            @click=${()=>this.dispatchEvent(this._onBottomClick)}
          >
            ${this.bottomText}
          </div>
          <div
            class="face z-direction face-front"
            @click=${()=>this.dispatchEvent(this._onFrontClick)}
          >
            ${this.frontText}
          </div>
          <div
            class="face z-direction face-back"
            @click=${()=>this.dispatchEvent(this._onBackClick)}
          >
            ${this.backText}
          </div>
        </div>
      </div>
    `}};T.styles=B`
    :host {
      position: absolute;
      z-index: 999;
      bottom: 1rem;
      right: 1rem;
    }

    .parent {
      perspective: 400px;
    }

    .cube {
      position: relative;
      transform-style: preserve-3d;
    }

    .face {
      position: absolute;
      display: flex;
      justify-content: center;
      user-select: none;
      align-items: center;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      color: var(--bim-view-cube--c, white);
      font-size: var(--bim-view-cube--fz, --bim-ui_size-2xl);
    }

    .x-direction {
      // background-color: var(--bim-view-cube_x--bgc, #c93830DD);
      background-color: var(--bim-view-cube_x--bgc, #01a6bcde);
    }

    .x-direction:hover {
      background-color: var(--bim-ui_color-accent, white);
    }

    .y-direction {
      // background-color: var(--bim-view-cube_y--bgc, #54ff19DD);
      background-color: var(--bim-view-cube_y--bgc, #8d0ec8de);
    }

    .y-direction:hover {
      background-color: var(--bim-ui_color-accent, white);
    }

    .z-direction {
      // background-color: var(--bim-view-cube_z--bgc, #3041c9DD);
      background-color: var(--bim-view-cube_z--bgc, #2718afde);
    }

    .z-direction:hover {
      background-color: var(--bim-ui_color-accent, white);
    }

    .face-front {
      transform: rotateX(180deg);
    }

    .face-back {
      transform: rotateZ(180deg);
    }

    .face-top {
      transform: rotateX(90deg);
    }

    .face-bottom {
      transform: rotateX(270deg);
    }

    .face-right {
      transform: rotateY(-270deg) rotateX(180deg);
    }

    .face-left {
      transform: rotateY(-90deg) rotateX(180deg);
    }
  `;let c=T;m([l({type:Number,reflect:!0})],c.prototype,"size");m([l({type:String,attribute:"right-text",reflect:!0})],c.prototype,"rightText");m([l({type:String,attribute:"left-text",reflect:!0})],c.prototype,"leftText");m([l({type:String,attribute:"top-text",reflect:!0})],c.prototype,"topText");m([l({type:String,attribute:"bottom-text",reflect:!0})],c.prototype,"bottomText");m([l({type:String,attribute:"front-text",reflect:!0})],c.prototype,"frontText");m([l({type:String,attribute:"back-text",reflect:!0})],c.prototype,"backText");m([vt()],c.prototype,"_cssMatrix3D");class Et{static init(){G.defineCustomElement("bim-view-cube",c),G.defineCustomElement("bim-world-2d",p)}}export{Et as M};
