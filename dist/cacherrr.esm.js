/*!
 * cacherrr - version 0.4.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2020 Steve Ottoz
 */
export default class{constructor(e=0,r=[]){this.expire=e,this.exclude=r,this.entries={}}get(e){return new Promise(((r,t)=>{const i=this.entries[e];let s;void 0===e?s=new Error("no path provided"):this.exclude.indexOf(e)>-1?s=new Error(e+" is excluded from caching"):i?i.expires<Date.now()&&(s=new Error(`cache for ${e} is expired`)):s=new Error(e+" is not cached yet"),s?(delete this.entries[e],t(s)):r(i.data)}))}set(e,r,t=this.expire){return new Promise(((i,s)=>{const n=Date.now();let o;void 0===e?o=new Error("no path provided"):r?this.exclude.indexOf(e)>-1&&(o=new Error(e+" is excluded from caching")):o=new Error("no data provided"),o?s(o):(this.entries[e]={timestamp:n,expires:n+t,data:r},i(r))}))}clear(e){return delete this.entries[e],Promise.resolve()}clearAll(){return this.entries=[],Promise.resolve()}}
