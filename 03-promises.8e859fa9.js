var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequired7c6=o);var n=o("iQIUW");const i=document.querySelector(".form");let a={};function l(e,t){return new Promise(((r,o)=>{setTimeout((()=>{Math.random()>.3?r(`✅ Fulfilled promise ${e} in ${t}ms`):o(`❌ Rejected promise ${e} in ${t}ms`)}),t)}))}i.addEventListener("submit",(function(e){e.preventDefault(),function({delay:e,step:t,amount:r}={}){let o=Number(e);for(let e=1;e<=r;e+=1)l(e,o).then((e=>n.Notify.success(e))).catch((e=>n.Notify.failure(e))),o+=Number(t)}(a),localStorage.removeItem("form-storage"),e.target.reset(),a={}})),i.addEventListener("change",(function(e){a[e.target.name]=e.target.value.trim();const t=JSON.stringify(a);localStorage.setItem("form-storage",t)})),function(){const e=localStorage.getItem("form-storage");if(e)try{a=JSON.parse(e),Object.entries(a).forEach((([e,t])=>i.elements[e].value=t))}catch(e){console.log(e.message)}}();
//# sourceMappingURL=03-promises.8e859fa9.js.map
