/* @license
==========================================================================
SproutCore Costello -- Property Observing Library
Copyright ©2006-2011, Strobe Inc. and contributors.
Portions copyright ©2008-2010 Apple Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com

==========================================================================
@license */
var require=require||function require(){};
var sc_require=sc_require||require;var sc_resource=sc_resource||function sc_resource(){};
sc_require("license");var YES=true;var NO=false;if(typeof console==="undefined"){window.console={};
console.log=console.info=console.warn=console.error=function(){}}var SC=SC||{};var SproutCore=SproutCore||SC;
SC._baseMixin=function(c){var g=Array.prototype.slice.call(arguments,1),a,f=g[0]||{},h=1,e=g.length,j,b,i;
if(e===1){f=this||{};h=0}for(;h<e;h++){if(!(j=g[h])){continue}for(i in j){if(!j.hasOwnProperty(i)){continue
}b=j[i];if(f===b){continue}if(b!==undefined&&(c||(f[i]===undefined))){f[i]=b}}}return f
};SC.mixin=function(){var a=Array.prototype.slice.call(arguments);a.unshift(true);
return SC._baseMixin.apply(this,a)};SC.supplement=function(){var a=Array.prototype.slice.call(arguments);
a.unshift(false);return SC._baseMixin.apply(this,a)};SC.extend=SC.mixin;SC.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(b){if(b===undefined){return SC.T_UNDEFINED
}if(b===null){return SC.T_NULL}var a=typeof(b);if(a=="object"){if(b instanceof Array){a=SC.T_ARRAY
}else{if(b instanceof Function){a=b.isClass?SC.T_CLASS:SC.T_FUNCTION}else{if(SC.Error&&(b instanceof SC.Error)){a=SC.T_ERROR
}else{if(b instanceof SC.Object){a=SC.T_OBJECT}else{a=SC.T_HASH}}}}}else{if(a===SC.T_FUNCTION){a=(b.isClass)?SC.T_CLASS:SC.T_FUNCTION
}}return a},none:function(a){return a===null||a===undefined},empty:function(a){return a===null||a===undefined||a===""
},isArray:function(c){if(c&&c.objectAt){return YES}var a=(c?c.length:null),b=typeof c;
return !((a===undefined)||(a===null)||(c instanceof Function)||(b==="string")||c.setInterval)
},makeArray:function(a){return SC.isArray(a)?a:SC.A(a)},A:function(c){if(c===null||c===undefined){return[]
}if(c.slice instanceof Function){if(typeof(c)==="string"){return[c]}else{return c.slice()
}}if(c.toArray){return c.toArray()}if(!SC.isArray(c)){return[c]}var b=[],a=c.length;
while(--a>=0){b[a]=c[a]}return b},guidKey:"_sc_guid_"+new Date().getTime(),_nextGUID:0,_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(e){if(e===undefined){return"(undefined)"
}if(e===null){return"(null)"}var a=this.guidKey;if(e[a]){return e[a]}if(e===Object){return"(Object)"
}if(e===Array){return"(Array)"}var b,c;switch(typeof e){case SC.T_NUMBER:b=this._numberGuids;
c=b[e];if(!c){c="nu"+e;b[e]=c}return c;case SC.T_STRING:b=this._stringGuids;c=b[e];
if(!c){c="st"+e;b[e]=c}return c;case SC.T_BOOL:return(e)?"(true)":"(false)";default:return SC.generateGuid(e)
}},keyFor:function(e,c){var b,a=this._keyCache[e];if(!a){a=this._keyCache[e]={}}b=a[c];
if(!b){b=a[c]=e+"_"+c}return b},generateGuid:function(b){var a=("sc"+(this._nextGUID++));
if(b){b[this.guidKey]=a}return a},hashFor:function(){var a=arguments.length,c="",g,e,b;
for(b=0;b<a;++b){g=arguments[b];c+=(g&&(e=g.hash)&&(typeof e===SC.T_FUNCTION))?e.call(g):this.guidFor(g)
}return c===""?null:c},isEqual:function(e,c){if(e===null){return c===null}else{if(e===undefined){return c===undefined
}else{return this.hashFor(e)===this.hashFor(c)}}},compare:function(t,q){if(t===q){return 0
}var k=SC.typeOf(t);var h=SC.typeOf(q);var b=SC.ORDER_DEFINITION_MAPPING;if(!b){var e=SC.ORDER_DEFINITION;
b=SC.ORDER_DEFINITION_MAPPING={};var s,o;for(s=0,o=e.length;s<o;++s){b[e[s]]=s}delete SC.ORDER_DEFINITION
}var u=b[k];var c=b[h];if(u<c){return -1}if(u>c){return 1}switch(k){case SC.T_BOOL:case SC.T_NUMBER:if(t<q){return -1
}if(t>q){return 1}return 0;case SC.T_STRING:var m=t.localeCompare(q);if(m<0){return -1
}if(m>0){return 1}return 0;case SC.T_ARRAY:var p=t.length;var n=q.length;var f=Math.min(p,n);
var a=0;var j=0;var g=arguments.callee;while(a===0&&j<f){a=g(t[j],q[j]);j++}if(a!==0){return a
}if(p<n){return -1}if(p>n){return 1}return 0;case SC.T_OBJECT:if(t.constructor.isComparable===YES){return t.constructor.compare(t,q)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(c){if(c===null||c===undefined){return null
}var a=SC.K;a.prototype=c;var b=new a();a.prototype=null;if(typeof c.didBeget==="function"){b=c.didBeget(b)
}return b},copy:function(e,b){var c=e,a;if(e){if(e.isCopyable){return e.copy(b)}if(e.clone&&SC.typeOf(e.clone)===SC.T_FUNCTION){return e.clone()
}}switch(SC.typeOf(e)){case SC.T_ARRAY:c=e.slice();if(b){a=c.length;while(a--){c[a]=SC.copy(c[a],true)
}}break;case SC.T_HASH:case SC.T_OBJECT:c={};for(var f in e){c[f]=b?SC.copy(e[f],true):e[f]
}break}return c},merge:function(){var c={},b=arguments.length,a;for(a=0;a<b;a++){SC.mixin(c,arguments[a])
}return c},keys:function(c){var a=[];for(var b in c){a.push(b)}return a},inspect:function(e){var a,b=[];
for(var c in e){a=e[c];if(a==="toString"){continue}if(SC.typeOf(a)===SC.T_FUNCTION){a="function() { ... }"
}b.push(c+": "+a)}return"{"+b.join(" , ")+"}"},tupleForPropertyPath:function(f,a){if(typeof f==="object"&&(f instanceof Array)){return f
}var c;var b=f.indexOf("*");if(b<0){b=f.lastIndexOf(".")}c=(b>=0)?f.slice(b+1):f;
var e=this.objectForPropertyPath(f,a,b);return(e&&c)?[e,c]:null},objectForPropertyPath:function(g,c,e){var h,b,f,a;
if(!c){c=window}if(SC.typeOf(g)===SC.T_STRING){if(e===undefined){e=g.length}h=0;while((c)&&(h<e)){b=g.indexOf(".",h);
if((b<0)||(b>e)){b=e}f=g.slice(h,b);c=c.get?c.get(f):c[f];h=b+1}if(h<e){c=undefined
}}else{h=0;a=g.length;f=null;while((h<a)&&c){f=g[h++];if(f){c=(c.get)?c.get(f):c[f]
}}if(h<a){c=undefined}}return c},STRINGS:{},stringsFor:function(b,a){SC.mixin(SC.STRINGS,a);
return this}});SC.clone=SC.copy;SC.$A=SC.A;SC.didLoad=SC.K;SC.ORDER_DEFINITION=[SC.T_ERROR,SC.T_UNDEFINED,SC.T_NULL,SC.T_BOOL,SC.T_NUMBER,SC.T_STRING,SC.T_ARRAY,SC.T_HASH,SC.T_OBJECT,SC.T_FUNCTION,SC.T_CLASS];
SC.mixin(Function.prototype,{property:function(){this.dependentKeys=SC.$A(arguments);
var a=SC.guidFor(this);this.cacheKey="__cache__"+a;this.lastSetValueKey="__lastValue__"+a;
this.isProperty=YES;return this},cacheable:function(a){this.isProperty=YES;if(!this.dependentKeys){this.dependentKeys=[]
}this.isCacheable=(a===undefined)?YES:a;return this},idempotent:function(a){this.isProperty=YES;
if(!this.dependentKeys){this.dependentKeys=[]}this.isVolatile=(a===undefined)?YES:a;
return this},observes:function(a){var f=arguments.length,b=null,e=null;while(--f>=0){var c=arguments[f];
if((c.indexOf(".")<0)&&(c.indexOf("*")<0)){if(!b){b=this.localPropertyPaths=[]}b.push(c)
}else{if(!e){e=this.propertyPaths=[]}e.push(c)}}return this}});String.prototype.fmt=function(){var b=arguments,a=0;
return this.replace(/%@([0-9]+)?/g,function(c,e){e=(e)?parseInt(e,0)-1:a++;c=b[e];
return((c===null)?"(null)":(c===undefined)?"":c).toString()})};String.prototype.loc=function(){var a=SC.STRINGS[this]||this;
return a.fmt.apply(a,arguments)};String.prototype.w=function(){var c=[],e=this.split(" "),b=e.length,f,a=0;
for(a=0;a<b;++a){f=e[a];if(f.length!==0){c.push(f)}}return c};if(!Date.now){Date.now=function(){return new Date().getTime()
}}SC.ObserverSet={targets:0,_membersCacheIsValid:NO,add:function(e,f,b){var c=(e)?SC.guidFor(e):"__this__";
var a=this[c];if(!a){a=this[c]=SC.CoreSet.create();a.target=e;a.isTargetSet=YES;this.targets++
}a.add(f);if(b!==undefined){if(!a.contexts){a.contexts={}}a.contexts[SC.guidFor(f)]=b
}this._membersCacheIsValid=NO},remove:function(c,e){var b=(c)?SC.guidFor(c):"__this__";
var a=this[b];if(!a){return NO}a.remove(e);if(a.length<=0){a.target=null;a.isTargetSet=NO;
a.contexts=null;delete this[b];this.targets--}else{if(a.contexts){delete a.contexts[SC.guidFor(e)]
}}this._membersCacheIsValid=NO;return YES},invokeMethods:function(){var b,c,a,e,f;
for(b in this){if(!this.hasOwnProperty(b)){continue}c=this[b];if(c&&c.isTargetSet){a=c.length;
e=c.target;while(--a>=0){f=c[a];if(f){f.call(e)}}}}},getMembers:function(){if(this._membersCacheIsValid){return this._members
}if(!this._members){this._members=[]}else{this._members.length=0}var b=this._members;
for(var c in this){if(!this.hasOwnProperty(c)){continue}var e=this[c];if(e&&e.isTargetSet){var a=e.length;
var f=e.target;var h=e.contexts;if(h){while(--a>=0){var g=e[a];b.push([f,g,h[SC.guidFor(g)]])
}}else{while(--a>=0){b.push([f,e[a]])}}}}this._membersCacheIsValid=YES;return b},clone:function(){var b,e,c,a=SC.ObserverSet.create();
for(c in this){if(!this.hasOwnProperty(c)){continue}b=this[c];if(b&&b.isTargetSet){e=b.clone();
e.target=b.target;if(b.contexts){e.contexts=SC.clone(b.contexts)}a[c]=e}}a.targets=this.targets;
a._membersCacheIsValid=NO;return a},create:function(){return SC.beget(this)}};SC.ObserverSet.slice=SC.ObserverSet.clone;
require("private/observer_set");SC.LOG_OBSERVERS=NO;SC.Observable={isObservable:YES,automaticallyNotifiesObserversFor:function(a){return YES
},get:function(c){var b=this[c],a;if(b===undefined){return this.unknownProperty(c)
}else{if(b&&b.isProperty){if(b.isCacheable){a=this._kvo_cache;if(!a){a=this._kvo_cache={}
}return(a[b.cacheKey]!==undefined)?a[b.cacheKey]:(a[b.cacheKey]=b.call(this,c))}else{return b.call(this,c)
}}else{return b}}},set:function(i,g){var b=this[i],j=this.automaticallyNotifiesObserversFor(i),f=g,c,a,h,e;
if(!j&&this._kvo_cacheable&&(a=this._kvo_cache)){c=this._kvo_cachedep;if(!c||(c=c[i])===undefined){c=this._kvo_computeCachedDependentsFor(i)
}if(c){h=c.length;while(--h>=0){e=c[h];a[e.cacheKey]=a[e.lastSetValueKey]=undefined
}}}if(b&&b.isProperty){a=this._kvo_cache;if(b.isVolatile||!a||(a[b.lastSetValueKey]!==g)){if(!a){a=this._kvo_cache={}
}a[b.lastSetValueKey]=g;if(j){this.propertyWillChange(i)}f=b.call(this,i,g);if(b.isCacheable){a[b.cacheKey]=f
}if(j){this.propertyDidChange(i,f,YES)}}}else{if(b===undefined){if(j){this.propertyWillChange(i)
}this.unknownProperty(i,g);if(j){this.propertyDidChange(i,f)}}else{if(this[i]!==g){if(j){this.propertyWillChange(i)
}f=this[i]=g;if(j){this.propertyDidChange(i,f)}}}}return this},unknownProperty:function(a,b){if(!(b===undefined)){this[a]=b
}return b},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var b=this._kvo_changeLevel,a=this._kvo_changes;if((b<=0)&&a&&(a.length>0)&&!SC.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(a){return this},propertyDidChange:function(m,k,c){this._kvo_revision=(this._kvo_revision||0)+1;
var b=this._kvo_changeLevel||0,h,l,i,a,e,g=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO);
if(a=this._kvo_cache){if(!c){e=this[m];if(e&&e.isProperty){a[e.cacheKey]=a[e.lastSetValueKey]=undefined
}}if(this._kvo_cacheable){h=this._kvo_cachedep;if(!h||(h=h[m])===undefined){h=this._kvo_computeCachedDependentsFor(m)
}if(h){l=h.length;while(--l>=0){i=h[l];a[i.cacheKey]=a[i.lastSetValueKey]=undefined
}}}}var f=SC.Observers.isObservingSuspended;if((b>0)||f){var j=this._kvo_changes;
if(!j){j=this._kvo_changes=SC.CoreSet.create()}j.add(m);if(f){if(g){console.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this))
}SC.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(m)
}return this},registerDependentKey:function(i,c){var f=this._kvo_dependents,b=this[i],j,h,a,g,e;
if(typeof c==="object"&&(c instanceof Array)){j=c;a=0}else{j=arguments;a=1}h=j.length;
if(!f){this._kvo_dependents=f={}}while(--h>=a){g=j[h];e=f[g];if(!e){e=f[g]=[]}e.push(i)
}},_kvo_addCachedDependents:function(b,g,i,c){var a=g.length,f,e,h;while(--a>=0){e=g[a];
c.add(e);f=this[e];if(f&&(f instanceof Function)&&f.isProperty){if(f.isCacheable){b.push(f)
}if((h=i[e])&&h.length>0){this._kvo_addCachedDependents(b,h,i,c)}}}},_kvo_computeCachedDependentsFor:function(c){var e=this._kvo_cachedep,g=this._kvo_dependents,f=g?g[c]:null,a,b;
if(!e){e=this._kvo_cachedep={}}if(!f||f.length===0){return e[c]=null}a=e[c]=[];b=SC._TMP_SEEN_SET=(SC._TMP_SEEN_SET||SC.CoreSet.create());
b.add(c);this._kvo_addCachedDependents(a,f,g,b);b.clear();if(a.length===0){a=e[c]=null
}return a},_kvo_for:function(c,b){var a=this[c];if(!this._kvo_cloned){this._kvo_cloned={}
}if(!a){a=this[c]=(b===undefined)?[]:b.create();this._kvo_cloned[c]=YES}else{if(!this._kvo_cloned[c]){a=this[c]=a.copy();
this._kvo_cloned[c]=YES}}return a},addObserver:function(c,g,i,b){var e,a,f,h;if(i===undefined){i=g;
g=this}if(!g){g=this}if(typeof i==="string"){i=g[i]}if(!i){throw"You must pass a method to addObserver()"
}c=c.toString();if(c.indexOf(".")>=0){a=SC._ChainObserver.createChain(this,c,g,i,b);
a.masterTarget=g;a.masterMethod=i;this._kvo_for(SC.keyFor("_kvo_chains",c)).push(a)
}else{if((this[c]===undefined)&&(c.indexOf("@")===0)){this.get(c)}if(g===this){g=null
}e=SC.keyFor("_kvo_observers",c);this._kvo_for(e,SC.ObserverSet).add(g,i,b);this._kvo_for("_kvo_observed_keys",SC.CoreSet).add(c)
}if(this.didAddObserver){this.didAddObserver(c,g,i)}return this},removeObserver:function(c,g,i){var e,f,b,h,a;
if(i===undefined){i=g;g=this}if(!g){g=this}if(typeof i==="string"){i=g[i]}if(!i){throw"You must pass a method to removeObserver()"
}c=c.toString();if(c.indexOf(".")>=0){e=SC.keyFor("_kvo_chains",c);if(f=this[e]){f=this._kvo_for(e);
a=f.length;while(--a>=0){b=f[a];if(b&&(b.masterTarget===g)&&(b.masterMethod===i)){f[a]=b.destroyChain()
}}}}else{if(g===this){g=null}e=SC.keyFor("_kvo_observers",c);if(h=this[e]){h=this._kvo_for(e);
h.remove(g,i);if(h.targets<=0){this._kvo_for("_kvo_observed_keys",SC.CoreSet).remove(c)
}}}if(this.didRemoveObserver){this.didRemoveObserver(c,g,i)}return this},hasObserverFor:function(b){SC.Observers.flush(this);
var e=this[SC.keyFor("_kvo_observers",b)],c=this[SC.keyFor("_kvo_local",b)],a;if(c&&c.length>0){return YES
}if(e&&e.getMembers().length>0){return YES}return NO},initObservable:function(){if(this._observableInited){return
}this._observableInited=YES;var g,n,l,k,i,f,m,h,c,o,b,j,e,a;if(n=this._observers){h=n.length;
for(g=0;g<h;g++){l=n[g];i=this[l];f=i.propertyPaths;m=(f)?f.length:0;for(c=0;c<m;
c++){o=f[c];b=o.indexOf(".");if(b<0){this.addObserver(o,this,i)}else{if(o.indexOf("*")===0){this.addObserver(o.slice(1),this,i)
}else{j=null;if(b===0){j=this;o=o.slice(1)}else{if(b===4&&o.slice(0,5)==="this."){j=this;
o=o.slice(5)}else{if(b<0&&o.length===4&&o==="this"){j=this;o=""}}}SC.Observers.addObserver(o,this,i,j)
}}}}}this.bindings=[];if(n=this._bindings){for(g=0,a=n.length;g<a;g++){l=n[g];k=this[l];
e=l.slice(0,-7);this[l]=this.bind(e,k)}}if(n=this._properties){for(g=0,a=n.length;
g<a;g++){l=n[g];if(k=this[l]){if(k.isCacheable){this._kvo_cacheable=YES}if(k.dependentKeys&&(k.dependentKeys.length>0)){this.registerDependentKey(l,k.dependentKeys)
}}}}},observersForKey:function(a){var b=this._kvo_for("_kvo_observers",a);return b.getMembers()||[]
},_notifyPropertyObservers:function(v){if(!this._observableInited){this.initObservable()
}SC.Observers.flush(this);var h=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO),p,t,n,e,o,m,s,q,k,a,g,u,c,j,f,b,i,l;
if(h){i=SC.KVO_SPACES=(SC.KVO_SPACES||"")+"  ";console.log('%@%@: notifying observers after change to key "%@"'.fmt(i,this,v))
}e=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;while(((t=this._kvo_changes)&&(t.length>0))||v){s=++this.propertyRevision;
if(!t){t=SC.CoreSet.create()}this._kvo_changes=null;if(v==="*"){t.add("*");t.addEach(this._kvo_for("_kvo_observed_keys",SC.CoreSet))
}else{if(v){t.add(v)}}if(n=this._kvo_dependents){for(o=0;o<t.length;o++){v=t[o];m=n[v];
if(m&&(j=m.length)){if(h){console.log("%@...including dependent keys for %@: %@".fmt(i,v,m))
}l=this._kvo_cache;if(!l){l=this._kvo_cache={}}while(--j>=0){t.add(v=m[j]);if(f=this[v]){this[f.cacheKey]=undefined;
l[f.cacheKey]=l[f.lastSetValueKey]=undefined}}}}}while(t.length>0){v=t.pop();p=this[SC.keyFor("_kvo_observers",v)];
if(p){q=p.getMembers();k=q.length;for(g=0;g<k;g++){a=q[g];if(a[3]===s){continue}u=a[0]||this;
c=a[1];b=a[2];a[3]=s;if(h){console.log('%@...firing observer on %@ for key "%@"'.fmt(i,u,v))
}if(b!==undefined){c.call(u,this,v,null,b,s)}else{c.call(u,this,v,null,s)}}}q=this[SC.keyFor("_kvo_local",v)];
if(q){k=q.length;for(g=0;g<k;g++){a=q[g];c=this[a];if(c){if(h){console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(i,this,a,v))
}c.call(this,this,v,null,s)}}}if(e&&v!=="*"){q=e.getMembers();k=q.length;for(g=0;
g<k;g++){a=q[g];u=a[0]||this;c=a[1];b=a[2];if(h){console.log('%@...firing * observer on %@ for key "%@"'.fmt(i,u,v))
}if(b!==undefined){c.call(u,this,v,null,b,s)}else{c.call(u,this,v,null,s)}}}if(this.propertyObserver){if(h){console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(i,this,v))
}this.propertyObserver(this,v,null,s)}}if(t){t.destroy()}v=null}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
if(h){SC.KVO_SPACES=i.slice(0,-2)}return YES},bind:function(a,c,f){var e,b;if(f!==undefined){c=[c,f]
}b=typeof c;if(b==="string"||(b==="object"&&(c instanceof Array))){e=this[a+"BindingDefault"]||SC.Binding;
e=e.beget().from(c)}else{e=c}e=e.to(a,this).connect();this.bindings.push(e);return e
},didChangeFor:function(a){var b,g,f,k,e,c,i,j,h;a=SC.hashFor(a);b=this._kvo_didChange_valueCache;
if(!b){b=this._kvo_didChange_valueCache={}}g=this._kvo_didChange_revisionCache;if(!g){g=this._kvo_didChange_revisionCache={}
}f=b[a]||{};k=g[a]||{};e=false;c=this._kvo_revision||0;i=arguments.length;while(--i>=1){j=arguments[i];
if(k[j]!=c){h=this.get(j);if(f[j]!==h){e=true;f[j]=h}}k[j]=c}b[a]=f;g[a]=k;return e
},setIfChanged:function(a,b){return(this.get(a)!==b)?this.set(a,b):this},getPath:function(b){var a=SC.tupleForPropertyPath(b,this);
if(a===null||a[0]===null){return undefined}return a[0].get(a[1])},setPath:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}a[0].set(a[1],b)}else{this.set(c,b)}return this},setPathIfChanged:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}if(a[0].get(a[1])!==b){a[0].set(a[1],b)}}else{this.setIfChanged(c,b)
}return this},getEach:function(){var e=SC.A(arguments),c=[],a,b;for(a=0,b=e.length;
a<b;a++){c[c.length]=this.getPath(e[a])}return c},incrementProperty:function(b,a){if(!a){a=1
}this.set(b,(this.get(b)||0)+a);return this.get(b)},decrementProperty:function(b,a){if(!a){a=1
}this.set(b,(this.get(b)||0)-a);return this.get(b)},toggleProperty:function(a,b,c){if(b===undefined){b=true
}if(c===undefined){c=false}b=(this.get(a)==b)?c:b;this.set(a,b);return this.get(a)
},notifyPropertyChange:function(a,b){this.propertyWillChange(a);this.propertyDidChange(a,b);
return this},allPropertiesDidChange:function(){this._kvo_cache=null;this._notifyPropertyObservers("*");
return this},addProbe:function(a){this.addObserver(a,SC.logChange)},removeProbe:function(a){this.removeObserver(a,SC.logChange)
},logProperty:function(){var b=SC.$A(arguments),e,c,a;for(a=0,c=b.length;a<c;a++){e=b[a];
console.log("%@:%@: ".fmt(SC.guidFor(this),e),this.get(e))}},propertyRevision:1};
SC.logChange=function logChange(c,a,b){console.log("CHANGE: %@[%@] => %@".fmt(c,a,c.get(a)))
};SC.mixin(SC,{get:function(a,b){if(!a){return undefined}if(b===undefined){return this[a]
}if(a.get){return a.get(b)}return a[b]}});SC.mixin(Array.prototype,SC.Observable);
SC.Enumerator=function(a){this.enumerable=a;this.reset();return this};SC.Enumerator.prototype={nextObject:function(){var c=this._index;
var a=this._length;if(c>=a){return undefined}var b=this.enumerable.nextObject(c,this._previousObject,this._context);
this._previousObject=b;this._index=c+1;if(c>=a){this._context=SC.Enumerator._pushContext(this._context)
}return b},reset:function(){var b=this.enumerable;if(!b){throw SC.$error("Enumerator has been destroyed")
}this._length=b.get?b.get("length"):b.length;var a=this._length;this._index=0;this._previousObject=null;
this._context=(a>0)?SC.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};SC.Enumerator.create=function(a){return new SC.Enumerator(a)};SC.Enumerator._popContext=function(){var a=this._contextCache?this._contextCache.pop():null;
return a||{}};SC.Enumerator._pushContext=function(b){this._contextCache=this._contextCache||[];
var a=this._contextCache;a.push(b);return null};require("core");require("system/enumerator");
SC.Enumerable={isEnumerable:YES,nextObject:function(a,c,b){return this.objectAt?this.objectAt(a):this[a]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var b=SC.Enumerator._popContext(),a;a=this.nextObject(0,null,b);b=SC.Enumerator._pushContext(b);
return a}.property(),lastObject:function(){var a=this.get("length");if(a===0){return undefined
}if(this.objectAt){return this.objectAt(a-1)}}.property(),enumerator:function(){return SC.Enumerator.create(this)
},forEach:function(h,g){if(typeof h!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(g===undefined){g=null}var f=null;var c=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var e=this.nextObject(a,f,c);h.call(g,e,a,this);f=e}f=null;c=SC.Enumerator._pushContext(c);
return this},getEach:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
},this)},setEach:function(a,b){this.forEach(function(c){if(c){if(c.set){c.set(a,b)
}else{c[a]=b}}},this);return this},map:function(i,h){if(typeof i!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=[];
var g=null;var e=SC.Enumerator._popContext();for(var a=0;a<b;a++){var f=this.nextObject(a,g,e);
c[a]=i.call(h,f,a,this);g=f}g=null;e=SC.Enumerator._pushContext(e);return c},mapProperty:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
})},filter:function(i,h){if(typeof i!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(h===undefined){h=null}var c=[];var g=null;var e=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var f=this.nextObject(a,g,e);if(i.call(h,f,a,this)){c.push(f)}g=f}g=null;
e=SC.Enumerator._pushContext(e);return c},sortProperty:function(b){var c=(typeof b===SC.T_STRING)?arguments:b,a=c.length,e;
if(this instanceof Array){e=this}else{e=[];this.forEach(function(f){e.push(f)})}if(!e){return[]
}return e.sort(function(h,g){var f,j,l,k,i=0;for(f=0;i===0&&f<a;f++){j=c[f];l=h?(h.get?h.get(j):h[j]):null;
k=g?(g.get?g.get(j):g[j]):null;i=SC.compare(l,k)}return i})},filterProperty:function(k,g){var e=this.get?this.get("length"):this.length;
var f=[];var j=null;var b=SC.Enumerator._popContext();for(var h=0;h<e;h++){var c=this.nextObject(h,j,b);
var i=c?(c.get?c.get(k):c[k]):null;var a=(g===undefined)?!!i:SC.isEqual(i,g);if(a){f.push(c)
}j=c}j=null;b=SC.Enumerator._pushContext(b);return f},find:function(i,e){var c=this.get?this.get("length"):this.length;
if(e===undefined){e=null}var h=null,b,j=NO,f=null;var a=SC.Enumerator._popContext();
for(var g=0;g<c&&!j;g++){b=this.nextObject(g,h,a);if(j=i.call(e,b,g,this)){f=b}h=b
}b=h=null;a=SC.Enumerator._pushContext(a);return f},findProperty:function(j,g){var c=this.get?this.get("length"):this.length;
var k=NO,e=null,i=null,b,h;var a=SC.Enumerator._popContext();for(var f=0;f<c&&!k;
f++){b=this.nextObject(f,i,a);h=b?(b.get?b.get(j):b[j]):null;k=(g===undefined)?!!h:SC.isEqual(h,g);
if(k){e=b}i=b}i=b=null;a=SC.Enumerator._pushContext(a);return e},every:function(i,h){if(typeof i!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=YES;
var g=null;var e=SC.Enumerator._popContext();for(var a=0;c&&(a<b);a++){var f=this.nextObject(a,g,e);
if(!i.call(h,f,a,this)){c=NO}g=f}g=null;e=SC.Enumerator._pushContext(e);return c},everyProperty:function(j,f){var c=this.get?this.get("length"):this.length;
var e=YES;var i=null;var a=SC.Enumerator._popContext();for(var g=0;e&&(g<c);g++){var b=this.nextObject(g,i,a);
var h=b?(b.get?b.get(j):b[j]):null;e=(f===undefined)?!!h:SC.isEqual(h,f);i=b}i=null;
a=SC.Enumerator._pushContext(a);return e},some:function(i,h){if(typeof i!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=NO;
var g=null;var e=SC.Enumerator._popContext();for(var a=0;(!c)&&(a<b);a++){var f=this.nextObject(a,g,e);
if(i.call(h,f,a,this)){c=YES}g=f}g=null;e=SC.Enumerator._pushContext(e);return c},someProperty:function(j,f){var c=this.get?this.get("length"):this.length;
var e=NO;var i=null;var a=SC.Enumerator._popContext();for(var g=0;!e&&(g<c);g++){var b=this.nextObject(g,i,a);
var h=b?(b.get?b.get(j):b[j]):null;e=(f===undefined)?!!h:SC.isEqual(h,f);i=b}i=null;
a=SC.Enumerator._pushContext(a);return e},reduce:function(h,i,j){if(typeof h!=="function"){throw new TypeError()
}var c=this.get?this.get("length"):this.length;if(c===0&&i===undefined){throw new TypeError()
}var e=i;var g=null;var a=SC.Enumerator._popContext();for(var f=0;f<c;f++){var b=this.nextObject(f,g,a);
if(b!==null){if(e===undefined){e=b}else{e=h.call(null,e,b,f,this,j)}}g=b}g=null;a=SC.Enumerator._pushContext(a);
if(e===undefined){throw new TypeError()}return e},invoke:function(i){var f=this.get?this.get("length"):this.length;
if(f<=0){return[]}var j;var h=[];var c=arguments.length;if(c>1){for(j=1;j<c;j++){h.push(arguments[j])
}}var g=[];var k=null;var b=SC.Enumerator._popContext();for(j=0;j<f;j++){var e=this.nextObject(j,k,b);
var a=e?e[i]:null;if(a){g[j]=a.apply(e,h)}k=e}k=null;b=SC.Enumerator._pushContext(b);
return g},invokeWhile:function(e,j){var g=this.get?this.get("length"):this.length;
if(g<=0){return null}var k;var i=[];var c=arguments.length;if(c>2){for(k=2;k<c;k++){i.push(arguments[k])
}}var h=e;var l=null;var b=SC.Enumerator._popContext();for(k=0;(h===e)&&(k<g);k++){var f=this.nextObject(k,l,b);
var a=f?f[j]:null;if(a){h=a.apply(f,i)}l=f}l=null;b=SC.Enumerator._pushContext(b);
return h},toArray:function(){var a=[];this.forEach(function(b){a.push(b)},this);return a
},groupBy:function(k){var e=this.get?this.get("length"):this.length,f=[],j=null,a=SC.Enumerator._popContext(),g=[],l=[];
for(var h=0;h<e;h++){var c=this.nextObject(h,j,a);var i=c?(c.get?c.get(k):c[k]):null;
if(SC.none(g[i])){g[i]=[];l.push(i)}g[i].push(c);j=c}j=null;a=SC.Enumerator._pushContext(a);
for(var h=0,b=l.length;h<b;h++){f.push(g[l[h]])}return f}};SC._buildReducerFor=function(a,b){return function(e,f){var g=this[a];
if(SC.typeOf(g)!==SC.T_FUNCTION){return this.unknownProperty?this.unknownProperty(e,f):null
}else{var c=SC.Enumerable.reduce.call(this,g,null,b);return c}}.property("[]")};SC.Reducers={"[]":function(a,b){return this
}.property(),enumerableContentDidChange:function(b,a){this.notifyPropertyChange("[]");
return this},reducedProperty:function(j,h,g){if(!j||j.charAt(0)!=="@"){return undefined
}var e=j.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!e||e.length<2){return undefined}var i=e[1];
var k=e[3];i="reduce"+i.slice(0,1).toUpperCase()+i.slice(1);var a=this[i];if(SC.typeOf(a)!==SC.T_FUNCTION){return undefined
}if(g===NO){return SC.Enumerable.reduce.call(this,a,null,k)}var c=SC._buildReducerFor(i,k);
var b=this.constructor.prototype;if(b){b[j]=c;var f=b._properties||[];f.push(j);b._properties=f;
this.registerDependentKey(j,"[]")}return SC.Enumerable.reduce.call(this,a,null,k)
},reduceMax:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]}if(a===null){return f
}return(f>a)?f:a},reduceMaxObject:function(b,g,c,h,f){var a=b,i=g;if(f){if(g){i=g.get?g.get(f):g[f]
}if(b){a=b.get?b.get(f):b[f]}}if(a===null){return g}return(i>a)?g:b},reduceMin:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]
}if(a===null){return f}return(f<a)?f:a},reduceMinObject:function(b,g,c,h,f){var a=b,i=g;
if(f){if(g){i=g.get?g.get(f):g[f]}if(b){a=b.get?b.get(f):b[f]}}if(a===null){return g
}return(i<a)?g:b},reduceAverage:function(b,h,f,i,g){if(g&&h){h=h.get?h.get(g):h[g]
}var c=(b||0)+h;var a=i.get?i.get("length"):i.length;if(f>=a-1){c=c/a}return c},reduceSum:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]
}return(a===null)?f:a+f}};SC.mixin(SC.Enumerable,SC.Reducers);SC.mixin(Array.prototype,SC.Reducers);
Array.prototype.isEnumerable=YES;(function(){var a={nextObject:SC.Enumerable.nextObject,enumerator:SC.Enumerable.enumerator,firstObject:SC.Enumerable.firstObject,lastObject:SC.Enumerable.lastObject,sortProperty:SC.Enumerable.sortProperty,mapProperty:function(h){var f=this.length;
var g=[];for(var e=0;e<f;e++){var i=this[e];g[e]=i?(i.get?i.get(h):i[h]):null}return g
},filterProperty:function(i,k){var g=this.length;var h=[];for(var f=0;f<g;f++){var j=this[f];
var l=j?(j.get?j.get(i):j[i]):null;var e=(k===undefined)?!!l:SC.isEqual(l,k);if(e){h.push(j)
}}return h},groupBy:function(l){var g=this.length,h=[],i=[],m=[];for(var j=0;j<g;
j++){var f=this[j];var k=f?(f.get?f.get(l):f[l]):null;if(SC.none(i[k])){i[k]=[];m.push(k)
}i[k].push(f)}for(var j=0,e=m.length;j<e;j++){h.push(i[m[j]])}return h},find:function(k,j){if(typeof k!=="function"){throw new TypeError()
}var f=this.length;if(j===undefined){j=null}var h,g=null,i=NO;for(var e=0;e<f&&!i;
e++){h=this[e];if(i=k.call(j,h,e,this)){g=h}}h=null;return g},findProperty:function(h,k){var f=this.length;
var i,l,j=NO,g=null;for(var e=0;e<f&&!j;e++){l=(i=this[e])?(i.get?i.get(h):i[h]):null;
j=(k===undefined)?!!l:SC.isEqual(l,k);if(j){g=i}}i=null;return g},everyProperty:function(h,j){var f=this.length;
var g=YES;for(var e=0;g&&(e<f);e++){var i=this[e];var k=i?(i.get?i.get(h):i[h]):null;
g=(j===undefined)?!!k:SC.isEqual(k,j)}return g},someProperty:function(h,j){var f=this.length;
var g=NO;for(var e=0;!g&&(e<f);e++){var i=this[e];var k=i?(i.get?i.get(h):i[h]):null;
g=(j===undefined)?!!k:SC.isEqual(k,j)}return g},invoke:function(g){var f=this.length;
if(f<=0){return[]}var e;var i=[];var k=arguments.length;if(k>1){for(e=1;e<k;e++){i.push(arguments[e])
}}var h=[];for(e=0;e<f;e++){var j=this[e];var l=j?j[g]:null;if(l){h[e]=l.apply(j,i)
}}return h},invokeWhile:function(g,l){var i=this.length;if(i<=0){return null}var m;
var k=[];var f=arguments.length;if(f>2){for(m=2;m<f;m++){k.push(arguments[m])}}var j=g;
for(m=0;(j===g)&&(m<i);m++){var h=this[m];var e=h?h[l]:null;if(e){j=e.apply(h,k)}}return j
},toArray:function(){var f=this.length;if(f<=0){return[]}var g=[];for(var e=0;e<f;
e++){var h=this[e];g.push(h)}return g},getEach:function(h){var g=[];var f=this.length;
for(var e=0;e<f;e++){var i=this[e];g[e]=i?(i.get?i.get(h):i[h]):null}return g},setEach:function(g,h){var f=this.length;
for(var e=0;e<f;e++){var i=this[e];if(i){if(i.set){i.set(g,h)}else{i[g]=h}}}return this
}};var c={forEach:function(i,h){if(typeof i!=="function"){throw new TypeError()}var f=this.length;
if(h===undefined){h=null}for(var e=0;e<f;e++){var g=this[e];i.call(h,g,e,this)}return this
},map:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=[];for(var e=0;e<f;e++){var h=this[e];g[e]=j.call(i,h,e,this)
}return g},filter:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=[];for(var e=0;e<f;e++){var h=this[e];if(j.call(i,h,e,this)){g.push(h)
}}return g},every:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=YES;for(var e=0;g&&(e<f);e++){var h=this[e];if(!j.call(i,h,e,this)){g=NO
}}return g},some:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=NO;for(var e=0;(!g)&&(e<f);e++){var h=this[e];if(j.call(i,h,e,this)){g=YES
}}return g},reduce:function(k,g,j){if(typeof k!=="function"){throw new TypeError()
}var f=this.length;if(f===0&&g===undefined){throw new TypeError()}var h=g;for(var e=0;
e<f;e++){var i=this[e];if(i!==null){if(h===undefined){h=i}else{h=k.call(null,h,i,e,this,j)
}}}if(h===undefined){throw new TypeError()}return h}};for(var b in c){if(!c.hasOwnProperty(b)){continue
}if(!Array.prototype[b]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[b]=c[b]
}}SC.mixin(Array.prototype,a)})();SC.RangeObserver={isRangeObserver:YES,toString:function(){var a=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return a.replace("IndexSet","RangeObserver(%@)".fmt(SC.guidFor(this)))},create:function(e,g,f,h,c,a){var b=SC.beget(this);
b.source=e;b.indexes=g?g.frozenCopy():null;b.target=f;b.method=h;b.context=c;b.isDeep=a||NO;
b.beginObserving();return b},extend:function(f){var e=SC.beget(this),c=arguments,b=c.length,a;
for(a=0;a<b;a++){SC.mixin(e,c[a])}return e},destroy:function(a){this.endObserving();
return this},update:function(a,b){if(this.indexes&&this.indexes.isEqual(b)){return this
}this.indexes=b?b.frozenCopy():null;this.endObserving().beginObserving();return this
},beginObserving:function(){if(!this.isDeep){return this}var b=this.observing;if(!b){b=this.observing=SC.CoreSet.create()
}var a=this._beginObservingForEach;if(!a){a=this._beginObservingForEach=function(c){var e=this.source.objectAt(c);
if(e&&e.addObserver){b.push(e);e._kvo_needsRangeObserver=YES}}}this.indexes.forEach(a,this);
this.isObserving=NO;SC.Observers.addPendingRangeObserver(this);return this},setupPending:function(a){var e=this.observing;
if(this.isObserving||!e||(e.get("length")===0)){return YES}if(e.contains(a)){this.isObserving=YES;
var b=this._setupPendingForEach;if(!b){var c=this.source,f=this.objectPropertyDidChange;
b=this._setupPendingForEach=function(g){var j=this.source.objectAt(g),h=SC.guidFor(j),i;
if(j&&j.addObserver){e.push(j);j.addObserver("*",this,f);i=this[h];if(i===undefined||i===null){this[h]=g
}else{if(i.isIndexSet){i.add(g)}else{i=this[h]=SC.IndexSet.create(i).add(g)}}}}}this.indexes.forEach(b,this);
return YES}else{return NO}},endObserving:function(){if(!this.isDeep){return this}var f=this.observing;
if(this.isObserving){var b=this.objectPropertyDidChange,c=this.source,a,g,e;if(f){g=f.length;
for(a=0;a<g;a++){e=f[a];e.removeObserver("*",this,b);this[SC.guidFor(e)]=null}f.length=0
}this.isObserving=NO}if(f){f.clear()}return this},rangeDidChange:function(b){var a=this.indexes;
if(!b||!a||a.intersects(b)){this.endObserving();this.method.call(this.target,this.source,null,"[]",b,this.context);
this.beginObserving()}return this},objectPropertyDidChange:function(e,g,h,a){var f=this.context,i=this.method,c=SC.guidFor(e),b=this[c];
if(b&&!b.isIndexSet){b=this[c]=SC.IndexSet.create(b).freeze()}if(f){i.call(this.target,this.source,e,g,b,f,a)
}else{i.call(this.target,this.source,e,g,b,a)}}};sc_require("mixins/observable");
sc_require("mixins/enumerable");sc_require("system/range_observer");SC.OUT_OF_RANGE_EXCEPTION="Index out of range";
SC.Array={isSCArray:YES,replace:function(a,c,b){throw"replace() must be implemented to support SC.Array"
},objectAt:function(a){if(a<0){return undefined}if(a>=this.get("length")){return undefined
}return this.get(a)},"[]":function(a,b){if(b!==undefined){this.replace(0,this.get("length"),b)
}return this}.property(),insertAt:function(a,b){if(a>this.get("length")){throw SC.OUT_OF_RANGE_EXCEPTION
}this.replace(a,0,[b]);return this},removeAt:function(e,a){var c=0,b=[];if(typeof e===SC.T_NUMBER){if((e<0)||(e>=this.get("length"))){throw SC.OUT_OF_RANGE_EXCEPTION
}if(a===undefined){this.replace(e,1,b);return this}else{e=SC.IndexSet.create(e,a)
}}this.beginPropertyChanges();e.forEachRange(function(g,f){g-=c;c+=f;this.replace(g,f,b)
},this);this.endPropertyChanges();return this},removeObject:function(b){var c=this.get("length")||0;
while(--c>=0){var a=this.objectAt(c);if(a==b){this.removeAt(c)}}return this},removeObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.removeObject(b)},this);this.endPropertyChanges();return this
},pushObject:function(a){this.insertAt(this.get("length"),a);return a},pushObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.pushObject(b)},this);this.endPropertyChanges();return this
},popObject:function(){var a=this.get("length");if(a===0){return null}var b=this.objectAt(a-1);
this.removeAt(a-1);return b},shiftObject:function(){if(this.get("length")===0){return null
}var a=this.objectAt(0);this.removeAt(0);return a},unshiftObject:function(a){this.insertAt(0,a);
return a},unshiftObjects:function(a){this.beginPropertyChanges();a.forEach(function(b){this.unshiftObject(b)
},this);this.endPropertyChanges();return this},isEqual:function(a){if(!a){return false
}if(a==this){return true}var b=a.get("length");if(b!=this.get("length")){return false
}while(--b>=0){if(!SC.isEqual(a.objectAt(b),this.objectAt(b))){return false}}return true
},compact:function(){return this.without(null)},without:function(b){if(this.indexOf(b)<0){return this
}var a=[];this.forEach(function(c){if(c!==b){a[a.length]=c}});return a},uniq:function(){var a=[];
this.forEach(function(b){if(a.indexOf(b)<0){a[a.length]=b}});return a},max:function(){return Math.max.apply(Math,this)
},min:function(){return Math.min.apply(Math,this)},rangeObserverClass:SC.RangeObserver,addRangeObserver:function(e,g,i,f){var a=this._array_rangeObservers;
if(!a){a=this._array_rangeObservers=SC.CoreSet.create()}if(this._array_oldLength===undefined){this._array_oldLength=this.get("length")
}var h=this.rangeObserverClass;var b=NO;var c=h.create(this,e,g,i,f,b);a.add(c);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=YES;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return c},updateRangeObserver:function(b,a){return b.update(this,a)
},removeRangeObserver:function(c){var b=c.destroy(this);var a=this._array_rangeObservers;
if(a){a.remove(c)}return b},enumerableContentDidChange:function(i,h,g){var a=this._array_rangeObservers,e=this._array_oldLength,f,c,b;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(a&&a.length>0){if(e===undefined){e=0
}this._array_oldLength=f=this.get("length");if(i===undefined){i=0}if(g===undefined){g=f-e
}if(g!==0||h===undefined){c=f-i;if(g<0){c-=g}}else{c=h}b=this._array_rangeChanges;
if(!b){b=this._array_rangeChanges=SC.IndexSet.create()}b.add(i,c)}this.notifyPropertyChange("[]");
this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var c=this._array_rangeObservers,e=this._array_rangeChanges,b=c?c.length:0,a,f;
if(b>0&&e&&e.length>0){for(a=0;a<b;a++){c[a].rangeDidChange(e)}e.clear()}}};SC.mixin(Array.prototype,SC.Array);
SC.Array=SC.mixin({},SC.Enumerable,SC.Array);SC.Array.slice=function(b,e){var a=[];
var c=this.get("length");if(SC.none(b)){b=0}if(SC.none(e)||(e>c)){e=c}while(b<e){a[a.length]=this.objectAt(b++)
}return a};SC.Array.indexOf=function(e,c){var b,a=this.get("length");if(c===undefined){c=0
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b<a;b++){if(this.objectAt(b)===e){return b
}}return -1};if(!Array.prototype.indexOf){Array.prototype.indexOf=SC.Array.indexOf
}SC.Array.lastIndexOf=function(e,c){var b,a=this.get("length");if(c===undefined){c=a-1
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b>=0;b--){if(this.objectAt(b)===e){return b
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=SC.Array.lastIndexOf
}(function(){SC.mixin(Array.prototype,{replace:function(e,h,g){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!g||g.length===0){this.splice(e,h)}else{var f=[e,h].concat(g);this.splice.apply(this,f)
}var c=g?(g.get?g.get("length"):g.length):0;this.enumerableContentDidChange(e,h,c-h);
return this},unknownProperty:function(e,f){var c=this.reducedProperty(e,f);if((f!==undefined)&&c===undefined){c=this[e]=f
}return c}});var b=Array.prototype.indexOf;if(!b||(b===SC.Array.indexOf)){Array.prototype.indexOf=function(g,f){var e,c=this.length;
if(f===undefined){f=0}else{f=(f<0)?Math.ceil(f):Math.floor(f)}if(f<0){f+=c}for(e=f;
e<c;e++){if(this[e]===g){return e}}return -1}}var a=Array.prototype.lastIndexOf;if(!a||(a===SC.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(g,f){var e,c=this.length;
if(f===undefined){f=c-1}else{f=(f<0)?Math.ceil(f):Math.floor(f)}if(f<0){f+=c}for(e=f;
e>=0;e--){if(this[e]===g){return e}}return -1}}})();SC.Comparable={isComparable:YES,compare:function(e,c){throw"%@.compare() is not implemented".fmt(this.toString())
}};SC.Copyable={isCopyable:YES,copy:function(a){throw"%@.copy() is not implemented"
},frozenCopy:function(){var a=this.get?this.get("isFrozen"):this.isFrozen;if(a===YES){return this
}else{if(a===undefined){throw"%@ does not support freezing".fmt(this)}else{return this.copy().freeze()
}}}};SC.mixin(Array.prototype,SC.Copyable);Array.prototype.copy=function(b){var c=this.slice(),a;
if(b){a=c.length;while(a--){c[a]=SC.copy(c[a],true)}}return c};SC.DelegateSupport={delegateFor:function(c){var b=1,a=arguments.length,e;
while(b<a){e=arguments[b];if(e&&e[c]!==undefined){return e}b++}return(this[c]!==undefined)?this:null
},invokeDelegateMethod:function(c,a,b){b=SC.A(arguments);b=b.slice(2,b.length);if(!c||!c[a]){c=this
}var e=c[a];return e?e.apply(c,b):null},getDelegateProperty:function(e,f){var b=1,a=arguments.length,c;
while(b<a){c=arguments[b++];if(c&&c[e]!==undefined){return c.get?c.get(e):c[e]}}return(this[e]!==undefined)?this.get(e):undefined
}};SC.FROZEN_ERROR=new Error("Cannot modify a frozen object");SC.Freezable={isFreezable:YES,isFrozen:NO,freeze:function(){if(this.set){this.set("isFrozen",YES)
}else{this.isFrozen=YES}return this}};SC.mixin(Array.prototype,SC.Freezable);sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.Set=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,{create:function(b){var c,a,e=SC.Set._pool,f=this.isObservable;
if(!f&&b===undefined&&e.length>0){c=e.pop()}else{c=SC.beget(this);if(f){c.initObservable()
}if(b&&b.isEnumerable&&b.get("length")>0){c.isObservable=NO;if(b.isSCArray){a=b.get?b.get("length"):b.length;
while(--a>=0){c.add(b.objectAt(a))}}else{if(b.isSet){a=b.length;while(--a>=0){c.add(b[a])
}}else{b.forEach(function(g){c.add(g)},this)}}c.isObservable=f}}return c},isSet:YES,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}this.length=0;
return this},contains:function(b){if(b===null){return NO}var a=this[SC.hashFor(b)];
return(!SC.none(a)&&(a<this.length)&&(this[a]===b))},isEqual:function(a){if(!a||!a.isSet||(a.get("length")!==this.get("length"))){return NO
}var b=this.get("length");while(--b>=0){if(!a.contains(this[b])){return NO}}return YES
},addSetObserver:function(a){if(!this.setObservers){this.setObservers=SC.CoreSet.create()
}this.setObservers.add(a)},removeSetObserver:function(a){if(!this.setObservers){return
}this.setObservers.remove(a)},add:function(f){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(f===null||f===undefined){return this}var c,e=(f&&(c=f.hash)&&(typeof c===SC.T_FUNCTION))?c.call(f):SC.guidFor(f),b=this[e],a=this.length;
if((b===null||b===undefined)||(b>=a)||(this[b]!==f)){this[a]=f;this[e]=a;this.length=a+1;
if(this.setObservers){this.didAddItem(f)}}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var a,b=this.isObservable;if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");
while(--a>=0){this.add(c.objectAt(a))}}else{if(c.isSet){a=c.length;while(--a>=0){this.add(c[a])
}}else{c.forEach(function(e){this.add(e)},this)}}if(b){this.endPropertyChanges()}return this
},remove:function(f){if(this.isFrozen){throw SC.FROZEN_ERROR}if(f===null||f===undefined){return this
}var c,e=(f&&(c=f.hash)&&(typeof c===SC.T_FUNCTION))?c.call(f):SC.guidFor(f),b=this[e],a=this.length;
if((b===null||b===undefined)||(b>=a)||(this[b]!==f)){return this}delete this[e];if(b<(a-1)){tmp=this[b]=this[a-1];
e=(tmp&&(c=tmp.hash)&&(typeof c===SC.T_FUNCTION))?c.call(tmp):SC.guidFor(tmp);this[e]=b
}this.length=a-1;if(this.isObservable){this.enumerableContentDidChange()}if(this.setObservers){this.didRemoveItem(f)
}return this},pop:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}var a=(this.length>0)?this[this.length-1]:null;
if(a){this.remove(a)}return a},removeEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)}var a,b=this.isObservable;
if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");while(--a>=0){this.remove(c.objectAt(a))
}}else{if(c.isSet){a=c.length;while(--a>=0){this.remove(c[a])}}else{c.forEach(function(e){this.remove(e)
},this)}}if(b){this.endPropertyChanges()}return this},copy:function(){return this.constructor.create(this)
},destroy:function(){this.isFrozen=NO;if(!this.isObservable){SC.Set._pool.push(this.clear())
}return this},forEach:function(c,e){var b=this.length;if(!e){e=this}for(var a=0;a<b;
a++){c.call(e,this[a],a,this)}return this},toString:function(){var b=this.length,a,c=[];
for(a=0;a<b;a++){c[a]=this[a]}return"SC.Set<%@>".fmt(c.join(","))},didAddItem:function(c){var e=this.setObservers;
if(!e){return}var b=e.length,a;for(a=0;a<b;a++){e[a].didAddItem(this,c)}},didRemoveItem:function(c){var e=this.setObservers;
if(!e){return}var b=e.length,a;for(a=0;a<b;a++){e[a].didRemoveItem(this,c)}},_pool:[],isObservable:YES});
SC.Set.constructor=SC.Set;SC.Set.clone=SC.Set.copy;SC.Set.push=SC.Set.unshift=SC.Set.add;
SC.Set.shift=SC.Set.pop;SC.Set.addObject=SC.Set.add;SC.Set.removeObject=SC.Set.remove;
SC.Set._pool=[];SC.CoreSet=SC.beget(SC.Set);SC.CoreSet.isObservable=NO;SC.CoreSet.constructor=SC.CoreSet;
sc_require("mixins/observable");sc_require("system/set");SC.Observers={queue:[],addObserver:function(c,e,f,b){var a;
if(typeof c==="string"){a=SC.tupleForPropertyPath(c,b)}else{a=c}if(a){a[0].addObserver(a[1],e,f)
}else{this.queue.push([c,e,f,b])}},removeObserver:function(g,h,i,e){var c,b,a,f;a=SC.tupleForPropertyPath(g,e);
if(a){a[0].removeObserver(a[1],h,i)}c=this.queue.length;b=this.queue;while(--c>=0){f=b[c];
if((f[0]===g)&&(f[1]===h)&&(f[2]==i)&&(f[3]===e)){b[c]=null}}},addPendingRangeObserver:function(a){var b=this.rangeObservers;
if(!b){b=this.rangeObservers=SC.CoreSet.create()}b.add(a);return this},_TMP_OUT:[],flush:function(a){var f=this.queue;
if(f&&f.length>0){var i=(this.queue=[]);var j=f.length;while(--j>=0){var k=f[j];if(!k){continue
}var g=SC.tupleForPropertyPath(k[0],k[3]);if(g){g[0].addObserver(g[1],k[1],k[2])}else{i.push(k)
}}}if(a._kvo_needsRangeObserver){var h=this.rangeObservers,e=h?h.get("length"):0,b=this._TMP_OUT,c;
for(j=0;j<e;j++){c=h[j];if(c.setupPending(a)){b.push(c)}}if(b.length>0){h.removeEach(b)
}b.length=0;a._kvo_needsRangeObserver=NO}},isObservingSuspended:0,_pending:SC.CoreSet.create(),objectHasPendingChanges:function(a){this._pending.add(a)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var c;
if(--this.isObservingSuspended<=0){c=this._pending;this._pending=SC.CoreSet.create();
var b,a=c.length;for(b=0;b<a;b++){c[b]._notifyPropertyObservers()}c.clear();c=null
}}};sc_require("core");sc_require("mixins/observable");sc_require("private/observer_queue");
sc_require("mixins/array");sc_require("system/set");SC.BENCHMARK_OBJECTS=NO;SC._object_extend=function _object_extend(h,g){if(!g){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}h._kvo_cloned=null;var y,n,u,f,i=h.concatenatedProperties,l=SC.K;var c,b;n=(i)?i.length:0;
var a=(n>0)?{}:null;while(--n>=0){y=i[n];c=h[y];b=g[y];if(c){if(!(c instanceof Array)){c=SC.$A(c)
}a[y]=(b)?c.concat(b):b}else{if(!(b instanceof Array)){b=SC.$A(b)}a[y]=b}}var x=h._bindings,m=NO;
var v=h._observers,w=NO;var j=h._properties,e=NO;var q,k,o;var t=h.outlets,s=NO;if(g.outlets){t=(t||SC.EMPTY_ARRAY).concat(g.outlets);
s=YES}for(y in g){if(y==="_kvo_cloned"){continue}if(!g.hasOwnProperty(y)){continue
}var p=(a.hasOwnProperty(y)?a[y]:null)||g[y];if(y.length>7&&y.slice(-7)==="Binding"){if(!m){x=(x||SC.EMPTY_ARRAY).slice();
m=YES}if(x===null){x=(h._bindings||SC.EMPTY_ARRAY).slice()}x[x.length]=y}else{if(p&&(p instanceof Function)){if(!p.superclass&&(p!==(f=h[y]))){p.superclass=p.base=f||l
}if(p.propertyPaths){if(!w){v=(v||SC.EMPTY_ARRAY).slice();w=YES}v[v.length]=y}if(q=p.localPropertyPaths){k=q.length;
while(--k>=0){o=h._kvo_for(SC.keyFor("_kvo_local",q[k]),SC.CoreSet);o.add(y);h._kvo_for("_kvo_observed_keys",SC.CoreSet).add(q[k])
}}if(p.dependentKeys){if(!e){j=(j||SC.EMPTY_ARRAY).slice();e=YES}j[j.length]=y}if(p.autoconfiguredOutlet){if(!s){t=(t||SC.EMPTY_ARRAY).slice();
s=YES}t[t.length]=y}}}h[y]=p}if(g.hasOwnProperty("toString")){y="toString";p=(a.hasOwnProperty(y)?a[y]:null)||g[y];
if(!p.superclass&&(p!==(f=h[y]))){p.superclass=p.base=f||l}h[y]=p}h._bindings=x||[];
h._observers=v||[];h._properties=j||[];h.outlets=t||[];return h};SC.Object=function(a){return this._object_init(a)
};SC.mixin(SC.Object,{mixin:function(b){var a=arguments.length,c;for(c=0;c<a;c++){SC.mixin(this,arguments[c])
}return this},superclass:null,extend:function(f){var e=SC.BENCHMARK_OBJECTS;if(e){SC.Benchmark.start("SC.Object.extend")
}var h,c=function(i){return this._object_init(i)};for(h in this){if(!this.hasOwnProperty(h)){continue
}c[h]=this[h]}if(this.hasOwnProperty("toString")){c.toString=this.toString}c.superclass=this;
SC.generateGuid(c);c.subclasses=SC.Set.create();this.subclasses.add(c);var g=(c.prototype=SC.beget(this.prototype));
var b,a=arguments.length;for(b=0;b<a;b++){SC._object_extend(g,arguments[b])}g.constructor=c;
if(e){SC.Benchmark.end("SC.Object.extend")}return c},create:function(){var b=this,a=new b(arguments);
if(SC.ObjectDesigner){SC.ObjectDesigner.didCreateObject(a,SC.$A(arguments))}return a
},isClass:YES,subclasses:SC.Set.create(),toString:function(){return SC._object_className(this)
},subclassOf:function(b){if(this===b){return NO}var a=this;while(a=a.superclass){if(a===b){return YES
}}return NO},hasSubclass:function(a){return(a&&a.subclassOf)?a.subclassOf(this):NO
},kindOf:function(a){return(this===a)||this.subclassOf(a)},design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ObjectDesigner){SC.ObjectDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a}});SC.Object.prototype={_kvo_enabled:YES,_object_init:function(c){var b,a=(c)?c.length:0;
for(b=0;b<a;b++){SC._object_extend(this,c[b])}SC.generateGuid(this);this.init();var e=this.initMixin;
a=(e)?e.length:0;for(b=0;b<a;b++){e[b].call(this)}return this},mixin:function(){var b,a=arguments.length;
for(b=0;b<a;b++){SC.mixin(this,arguments[b])}for(b=0;b<a;b++){var c=arguments[b].initMixin;
if(c){c.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:NO,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",YES);
var b,c=this.destroyMixin,a=(c)?c.length:0;for(b=0;b<a;b++){c[b].call(this)}this.bindings.invoke("disconnect");
this.bindings=null;return this},isObject:true,respondsTo:function(a){return !!(this[a] instanceof Function)
},tryToPerform:function(b,c,a){return this.respondsTo(b)&&(this[b](c,a)!==NO)},superclass:function(b){var a=arguments.callee.caller;
if(!a){throw"superclass cannot determine the caller method"}return a.superclass?a.superclass.apply(this,arguments):null
},instanceOf:function(a){return this.constructor===a},kindOf:function(a){return this.constructor.kindOf(a)
},toString:function(){if(!this._object_toString){var a=SC._object_className(this.constructor);
var b="%@:%@".fmt(a,SC.guidFor(this));if(a){this._object_toString=b}else{return b
}}return this._object_toString},awake:function(c){var f=this.outlets,b,a,e;for(b=0,a=f.length;
b<a;++b){e=f[b];this.get(e)}this.bindings.invoke("sync")},invokeOnce:function(a){SC.RunLoop.currentRunLoop.invokeOnce(this,a);
return this},invokeLast:function(a){SC.RunLoop.currentRunLoop.invokeLast(this,a);
return this},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};
SC.Object.prototype.constructor=SC.Object;SC.mixin(SC.Object.prototype,SC.Observable);
function findClassNames(){if(SC._object_foundObjectClassNames){return}SC._object_foundObjectClassNames=true;
var b=[];var c=false;var a=function(e,f,i){i--;if(b.indexOf(f)>=0){return}b.push(f);
for(var g in f){if(g=="__scope__"){continue}if(g=="superclass"){continue}if(g=="__SC__"){g="SC"
}if(!g.match(/^[A-Z0-9]/)){continue}if(g=="SC"){if(c){continue}c=true}var j=(e)?[e,g].join("."):g;
var h=f[g];switch(SC.typeOf(h)){case SC.T_CLASS:if(!h._object_className){h._object_className=j
}if(i>=0){a(j,h,i)}break;case SC.T_OBJECT:if(i>=0){a(j,h,i)}break;case SC.T_HASH:if(((e)||(j==="SC"))&&(i>=0)){a(j,h,i)
}break;default:break}}};window.__SC__=SC;a(null,window,2)}SC.instanceOf=function(a,b){return !!(a&&a.constructor===b)
};SC.kindOf=function(a,b){if(a&&!a.isClass){a=a.constructor}return !!(a&&a.kindOf&&a.kindOf(b))
};SC._object_className=function(b){if(SC.isReady===NO){return""}if(!b._object_className){findClassNames()
}if(b._object_className){return b._object_className}var a=b;while(a&&!a._object_className){a=a.superclass
}return(a&&a._object_className)?a._object_className:"Anonymous"};require("system/object");
SC._ChainObserver=function(a){this.property=a};SC._ChainObserver.createChain=function(e,k,g,a,b){var c=k.split("."),i=new SC._ChainObserver(c[0]),h=i,f=c.length;
for(var j=1;j<f;j++){h=h.next=new SC._ChainObserver(c[j])}i.objectDidChange(e);h.target=g;
h.method=a;h.context=b;return i};SC._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,target:null,method:null,objectDidChange:function(a){if(a===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=a;if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()},propertyDidChange:function(){var b=this.object;var f=this.property;
var e=(b&&b.get)?b.get(f):null;if(this.next){this.next.objectDidChange(e)}var g=this.target,h=this.method,c=this.context;
if(g&&h){var a=b?b.propertyRevision:null;if(c){h.call(g,b,f,e,c,a)}else{h.call(g,b,f,e,a)
}}},destroyChain:function(){var a=this.object;if(a&&a.removeObserver){a.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}};sc_require("system/object");SC.LOG_BINDINGS=NO;SC.BENCHMARK_BINDING_NOTIFICATIONS=NO;
SC.BENCHMARK_BINDING_SETUP=NO;SC.MULTIPLE_PLACEHOLDER="@@MULT@@";SC.NULL_PLACEHOLDER="@@NULL@@";
SC.EMPTY_PLACEHOLDER="@@EMPTY@@";SC.Binding={beget:function(b){var a=SC.beget(this);
a.parentBinding=this;if(b!==undefined){a=a.from(b)}return a},builder:function(){var b=this,a=function(c){return b.beget().from(c)
};a.beget=function(){return b.beget()};return a},from:function(b,a){if(!b){return this
}var c=(this===SC.Binding)?this.beget():this;c._fromPropertyPath=b;c._fromRoot=a;
c._fromTuple=null;return c},to:function(b,a){var c=(this===SC.Binding)?this.beget():this;
c._toPropertyPath=b;c._toRoot=a;c._toTuple=null;return c},connect:function(){if(this.isConnected){return this
}this.isConnected=YES;this._connectionPending=YES;this._syncOnConnect=YES;SC.Binding._connectQueue.add(this);
return this},_connect:function(){if(!this._connectionPending){return}this._connectionPending=NO;
var c,a,b=SC.BENCHMARK_BINDING_SETUP;if(b){SC.Benchmark.start("SC.Binding.connect()")
}c=this._fromPropertyPath;a=this._fromRoot;if(typeof c==="string"){if(c.indexOf(".")===0){c=c.slice(1);
if(!a){a=this._toRoot}}else{if(c.indexOf("*")===0){c=[this._fromRoot||this._toRoot,c.slice(1)];
a=null}}}this._fromObserverData=[c,this,this.fromPropertyDidChange,a];SC.Observers.addObserver.apply(SC.Observers,this._fromObserverData);
if(!this._oneWay){c=this._toPropertyPath;a=this._toRoot;this._toObserverData=[c,this,this.toPropertyDidChange,a];
SC.Observers.addObserver.apply(SC.Observers,this._toObserverData)}if(b){SC.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=NO;if(b){SC.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(b){SC.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=NO}else{SC.Observers.removeObserver.apply(SC.Observers,this._fromObserverData);
if(!this._oneWay){SC.Observers.removeObserver.apply(SC.Observers,this._toObserverData)
}}this.isConnected=NO;return this},fromPropertyDidChange:function(c,b){var a=c?c.get(b):null;
if(a!==this._bindingValue||b==="[]"){this._setBindingValue(c,b);this._changePending=YES;
SC.Binding._changeQueue.add(this)}},toPropertyDidChange:function(c,b){if(this._oneWay){return
}var a=c.get(b);if(a!==this._transformedBindingValue){this._setBindingValue(c,b);
this._changePending=YES;SC.Binding._changeQueue.add(this)}},_setBindingValue:function(b,a){this._bindingSource=b;
this._bindingKey=a},_computeBindingValue:function(){var h=this._bindingSource,f=this._bindingKey,c,b;
this._bindingValue=c=(h?h.getPath(f):null);var g=this._transforms;if(g){var a=g.length,e;
for(b=0;b<a;b++){e=g[b];c=e(c,this)}}if(this._noError&&SC.typeOf(c)===SC.T_ERROR){c=null
}this._transformedBindingValue=c},_connectQueue:SC.CoreSet.create(),_alternateConnectQueue:SC.CoreSet.create(),_changeQueue:SC.CoreSet.create(),_alternateChangeQueue:SC.CoreSet.create(),_changePending:NO,flushPendingChanges:function(){if(this._isFlushing){return NO
}this._isFlushing=YES;SC.Observers.suspendPropertyObserving();var b=NO,c=SC.LOG_BINDINGS,a,e;
while((a=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=a;while(e=a.pop()){e._connect()}}while((a=this._changeQueue).length>0){if(c){console.log("Begin: Trigger changed bindings")
}b=YES;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=a;
while(e=a.pop()){e.applyBindingValue()}if(c){console.log("End: Trigger changed bindings")
}}this._isFlushing=NO;SC.Observers.resumePropertyObserving();return b},applyBindingValue:function(){this._changePending=NO;
this._computeBindingTargets();this._computeBindingValue();var a=this._bindingValue,b=this._transformedBindingValue,c=SC.BENCHMARK_BINDING_NOTIFICATIONS,e=SC.LOG_BINDINGS;
if(!this._oneWay&&this._fromTarget){if(e){console.log("%@: %@ -> %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,a);
if(c){SC.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(e){console.log("%@: %@ <- %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,b);
if(c){SC.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=YES}else{this._computeBindingTargets();
var c=this._fromTarget,b=this._fromPropertyKey;if(!c||!b){return this}var a=c.getPath(b);
if(a!==this._bindingValue||b==="[]"){this._setBindingValue(c,b);this._changePending=YES;
SC.Binding._changeQueue.add(this)}}return this},_syncOnConnect:NO,_computeBindingTargets:function(){if(!this._fromTarget){var c,b,a;
c=this._fromPropertyPath;b=this._fromRoot;if(typeof c==="string"){if(c.indexOf(".")===0){c=c.slice(1);
if(!b){b=this._toRoot}}else{if(c.indexOf("*")===0){c=[b||this._toRoot,c.slice(1)];
b=null}}}a=SC.tupleForPropertyPath(c,b);if(a){this._fromTarget=a[0];this._fromPropertyKey=a[1]
}}if(!this._toTarget){c=this._toPropertyPath;b=this._toRoot;a=SC.tupleForPropertyPath(c,b);
if(a){this._toTarget=a[0];this._toPropertyKey=a[1]}}},oneWay:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._oneWay=(a===undefined)?YES:a;
return b},transform:function(b){var c=(this===SC.Binding)?this.beget():this;var a=c._transforms;
if(a&&(a===c.parentBinding._transform)){a=c._transforms=a.slice()}if(!a){a=c._transforms=[]
}a.push(b);return c},resetTransforms:function(){var a=(this===SC.Binding)?this.beget():this;
a._transforms=null;return a},noError:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._noError=(a===undefined)?YES:a;
return b},single:function(b,a){if(a===undefined){a=SC.MULTIPLE_PLACEHOLDER}return this.from(b).transform(function(f,e){if(f&&f.isEnumerable){var c=f.get("length");
f=(c>1)?a:(c<=0)?null:f.firstObject()}return f})},notEmpty:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER
}return this.from(b).transform(function(e,c){if(SC.none(e)||(e==="")||(SC.isArray(e)&&e.length===0)){e=a
}return e})},notNull:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER}return this.from(b).transform(function(e,c){if(SC.none(e)){e=a
}return e})},multiple:function(a){return this.from(a).transform(function(b){if(!SC.isArray(b)){b=(b==null)?[]:[b]
}return b})},bool:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return(c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b})},and:function(b,a){var c=SC.Object.create({valueABinding:b,valueBBinding:a,and:function(){return(this.get("valueA")&&this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("and",c).oneWay()},or:function(b,a){var c=SC.Object.create({valueABinding:b,valueBBinding:a,or:function(){return(this.get("valueA")||this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("or",c).oneWay()},not:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return !((c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b)
})},isNull:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
return(c===SC.T_ERROR)?b:SC.none(b)})},toString:function(){var c=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var b=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var a=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this),c,b,a)
}};SC.binding=function(b,a){return SC.Binding.from(b,a)};SC.Cookie=SC.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:NO,isCookie:YES,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var b=this.get("name"),j=this.get("value"),c=this.get("expires"),l=this.get("path"),f=this.get("domain"),a=this.get("secure");
var i="";if(c&&(SC.typeOf(c)===SC.T_NUMBER||(SC.DateTime&&c.get&&c.get("milliseconds"))||SC.typeOf(c.toUTCString)===SC.T_FUNCTION)){var e;
if(SC.typeOf(c)===SC.T_NUMBER){e=new Date();e.setTime(e.getTime()+(c*24*60*60*1000))
}else{if(SC.DateTime&&c.get&&c.get("milliseconds")){e=new Date(c.get("milliseconds"))
}else{if(SC.typeOf(c.toUTCString)===SC.T_FUNCTION){e=c}}}if(e){i="; expires="+e.toUTCString()
}}var k=l?"; path="+l:"";var h=f?"; domain="+f:"";var g=a?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),i,k,h,g].join("");
return this}});SC.Cookie.mixin({find:function(a){if(document.cookie&&document.cookie!=""){var e=document.cookie.split(";");
for(var c=0;c<e.length;c++){var b=String(e[c]).trim();if(b.substring(0,a.length+1)===(a+"=")){return SC.Cookie.create({name:a,value:decodeURIComponent(b.substring(a.length+1))})
}}}return null}});SC.Error=SC.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this),this.get("message"),this.get("code"))
},isError:YES});SC.Error.desc=function(e,a,f,c){var b={message:e};if(a!==undefined){b.label=a
}if(c!==undefined){b.code=c}if(f!==undefined){b.errorValue=f}return this.create(b)
};SC.$error=function(b,a,e,f){return SC.Error.desc(b,a,e,f)};SC.ok=function(a){return(a!==false)&&!(a&&a.isError)
};SC.$ok=SC.ok;SC.val=function(a){if(a&&a.isError){return a.get?a.get("errorValue"):null
}else{return a}};SC.$val=SC.val;SC.Error.HAS_MULTIPLE_VALUES=-100;sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.IndexSet=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,SC.Copyable,{_sc_sliceContent:function(f){if(f.length<1000){return f.slice()
}var e=0,a=[],b=f[0];while(b!==0){a[e]=b;e=(b<0)?(0-b):b;b=f[e]}a[e]=0;this._hint(0,e,a);
return a},create:function(c,b){var a=SC.beget(this);a.initObservable();a.registerDependentKey("min","[]");
if(c&&c.isIndexSet){a._content=this._sc_sliceContent(c._content);a.max=c.max;a.length=c.length;
a.source=c.source}else{a._content=[0];if(c!==undefined){a.add(c,b)}}return a},isIndexSet:YES,HINT_SIZE:256,length:0,max:0,min:function(){var a=this._content,b=a[0];
return(b===0)?-1:(b>0)?0:Math.abs(b)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(c){var g=this._content,a=this.get("max"),b,f,e;
if(c>=a){return a}if(Math.abs(g[c])>c){return c}e=c-(c%SC.IndexSet.HINT_SIZE);b=g[e];
if(b<0||b>c){b=e}f=Math.abs(g[b]);while(f<c){b=f;f=Math.abs(g[b])}return b},isEqual:function(c){if(c===this){return YES
}if(!c||!c.isIndexSet||(c.max!==this.max)||(c.length!==this.length)){return NO}var f=this._content,b=c._content,e=0,a=f[e];
do{if(b[e]!==a){return NO}e=Math.abs(a);a=f[e]}while(e!==0);return YES},indexBefore:function(b){if(b===0){return -1
}b--;var c=this._content,a=this.get("max"),e=this.rangeStartForIndex(b);if(!c){return null
}while((e===a)||(c[e]<0)){if(e===0){return -1}b=e-1;e=this.rangeStartForIndex(b)}return b
},indexAfter:function(b){var e=this._content,a=this.get("max"),f,c;if(!e||(b>=a)){return -1
}b++;f=this.rangeStartForIndex(b);c=e[f];while(c<0){if(c===0){return -1}b=f=Math.abs(c);
c=e[f]}return b},contains:function(h,c){var b,g,a,f,e;if(c===undefined){if(h===null||h===undefined){return NO
}if(typeof h===SC.T_NUMBER){c=1}else{if(h&&h.isIndexSet){if(h===this){return YES}b=h._content;
g=0;a=b[g];while(a!==0){if((a>0)&&!this.contains(g,a-g)){return NO}g=Math.abs(a);
a=b[g]}return YES}else{c=h.length;h=h.start}}}f=this.rangeStartForIndex(h);e=this._content[f];
return(e>0)&&(f<=h)&&(e>=(h+c))},intersects:function(g,c){var b,f,a,e;if(c===undefined){if(typeof g===SC.T_NUMBER){c=1
}else{if(g&&g.isIndexSet){if(g===this){return YES}b=g._content;f=0;a=b[f];while(a!==0){if((a>0)&&this.intersects(f,a-f)){return YES
}f=Math.abs(a);a=b[f]}return NO}else{c=g.length;g=g.start}}}f=this.rangeStartForIndex(g);
b=this._content;a=b[f];e=g+c;while(f<e){if(a===0){return NO}if((a>0)&&(a>g)){return YES
}f=Math.abs(a);a=b[f]}return NO},without:function(b,a){if(b===this){return SC.IndexSet.create()
}return this.clone().remove(b,a)},replace:function(c,a){if(a===undefined){if(typeof c===SC.T_NUMBER){a=1
}else{if(c&&c.isIndexSet){this._content=this._sc_sliceContent(c._content);this.beginPropertyChanges().set("max",c.max).set("length",c.length).set("source",c.source).enumerableContentDidChange().endPropertyChanges();
return this}else{a=c.length;c=c.start}}}var b=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(c,a)},add:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}var f,j,e;if(a&&a.isIndexSet){f=a._content;if(!f){return this}j=0;e=f[0];while(e!==0){if(e>0){this.add(j,e-j)
}j=e<0?0-e:e;e=f[j]}return this}else{if(b===undefined){if(a===null||a===undefined){return this
}else{if(typeof a===SC.T_NUMBER){b=1}else{b=a.length;a=a.start}}}else{if(b===null){b=1
}}}if(b<=0){return this}var g=this.get("max"),c=g,i,h;f=this._content;if(a===g){if(a>0){j=this.rangeStartForIndex(a-1);
e=f[j];if(e>0){delete f[g];f[j]=g=a+b;a=j}else{f[g]=g=a+b}}else{f[a]=g=b}f[g]=0;this.set("max",g);
this.set("length",this.length+b);b=g-a}else{if(a>g){f[g]=0-a;f[a]=a+b;f[a+b]=0;this.set("max",a+b);
this.set("length",this.length+b);b=a+b-g;a=g}else{j=this.rangeStartForIndex(a);e=f[j];
g=a+b;i=0;if((a>0)&&(j===a)&&(e<=0)){j=this.rangeStartForIndex(a-1);e=f[j]}if(e<0){f[j]=0-a;
if(Math.abs(e)>g){f[a]=0-g;f[g]=e}else{f[a]=e}}else{a=j;if(e>g){g=e}}j=a;while(j<g){h=f[j];
if(h===0){f[g]=0;e=g;i+=g-j}else{e=Math.abs(h);if(e>g){f[g]=h;e=g}if(h<0){i+=e-j}}delete f[j];
j=e}if((j=f[g])>0){delete f[g];g=j}f[a]=g;if(g>c){this.set("max",g)}this.set("length",this.get("length")+i);
b=g-a}}this._hint(a,b);if(i!==0){this.enumerableContentDidChange()}return this},remove:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(b===undefined){if(a===null||a===undefined){return this}else{if(typeof a===SC.T_NUMBER){b=1
}else{if(a.isIndexSet){a.forEachRange(this.remove,this);return this}else{b=a.length;
a=a.start}}}}if(b<=0){return this}var g=this.get("max"),c=g,f=this._content,k,e,j,h,i;
if(a>=g){return this}k=this.rangeStartForIndex(a);e=f[k];i=a+b;j=0;if((a>0)&&(k===a)&&(e>0)){k=this.rangeStartForIndex(a-1);
e=f[k]}if(e>0){f[k]=a;if(e>i){f[a]=i;f[i]=e}else{f[a]=e}}else{a=k;e=Math.abs(e);if(e>i){i=e
}}k=a;while(k<i){h=f[k];if(h===0){f[i]=0;e=i}else{e=Math.abs(h);if(e>i){f[i]=h;e=i
}if(h>0){j+=e-k}}delete f[k];k=e}if((k=f[i])<0){delete f[i];i=Math.abs(k)}if(f[i]===0){delete f[i];
f[a]=0;this.set("max",a)}else{f[a]=0-i}this.set("length",this.get("length")-j);b=i-a;
this._hint(a,b);if(j!==0){this.enumerableContentDidChange()}return this},_hint:function(h,e,c){if(c===undefined){c=this._content
}var b=SC.IndexSet.HINT_SIZE,a=Math.abs(c[h]),g=h-(h%b)+b,f=h+e;while(g<f){while((a!==0)&&(a<=g)){h=a;
a=Math.abs(c[h])}if(a===0){delete c[g]}else{if(g!==h){c[g]=h}}g+=b}},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var a=this.length;this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);
if(a>0){this.enumerableContentDidChange()}},addEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR
}this.beginPropertyChanges();var a=b.get("length");if(b.isSCArray){while(--a>=0){this.add(b.objectAt(a))
}}else{if(b.isEnumerable){b.forEach(function(c){this.add(c)},this)}}this.endPropertyChanges();
return this},removeEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR}this.beginPropertyChanges();
var a=b.get("length");if(b.isSCArray){while(--a>=0){this.remove(b.objectAt(a))}}else{if(b.isEnumerable){b.forEach(function(c){this.remove(c)
},this)}}this.endPropertyChanges();return this},clone:function(){return SC.IndexSet.create(this)
},inspect:function(){var f=this._content,b=f.length,a=0,c=[],e;for(a=0;a<b;a++){e=f[a];
if(e!==undefined){c.push("%@:%@".fmt(a,e))}}return"SC.IndexSet<%@>".fmt(c.join(" , "))
},forEachRange:function(g,e){var b=this._content,f=0,a=b[f],c=this.source;if(e===undefined){e=null
}while(a!==0){if(a>0){g.call(e,f,a-f,this,c)}f=Math.abs(a);a=b[f]}return this},forEachIn:function(b,c,k,g){var h=this._content,j=0,i=0,e=b+c,a=this.source,f=h[j];
if(g===undefined){g=null}while(f!==0){if(j<b){j=b}while((j<f)&&(j<e)){k.call(g,j++,i++,this,a)
}if(j>=e){j=f=0}else{j=Math.abs(f);f=h[j]}}return this},lengthIn:function(h,e){var a=0;
if(e===undefined){if(h===null||h===undefined){return 0}else{if(typeof h===SC.T_NUMBER){e=1
}else{if(h.isIndexSet){h.forEachRange(function(j,i){a+=this.lengthIn(j,i)},this);
return a}else{e=h.length;h=h.start}}}}if(this.get("length")===0){return 0}var c=this._content,g=0,b=c[g],f=h+e;
while(g<f&&b!==0){if(b>0){a+=(b>f)?f-g:b-g}g=Math.abs(b);b=c[g]}return a},source:null,indexOf:function(e,c){var g=this.source;
if(!g){throw"%@.indexOf() requires source".fmt(this)}var b=g.get("length"),f=this._content,h=f[0]<0?Math.abs(f[0]):0,a;
while(h>=0&&h<b){a=g.indexOf(e,h);if(a<0){return -1}if(this.contains(a)){return a
}h=a+1}return -1},lastIndexOf:function(e,c){var f=this.source;if(!f){throw"%@.lastIndexOf() requires source".fmt(this)
}var b=f.get("length"),g=this.max-1,a;if(g>=b){g=b-1}while(g>=0){a=f.lastIndexOf(e,g);
if(a<0){return -1}if(this.contains(a)){return a}g=a+1}return -1},forEachObject:function(h,f){var e=this.source;
if(!e){throw"%@.forEachObject() requires source".fmt(this)}var c=this._content,g=0,a=0,b=c[g];
if(f===undefined){f=null}while(b!==0){while(g<b){h.call(f,e.objectAt(g),g,e,this);
g++}g=Math.abs(b);b=c[g]}return this},addObject:function(c,e){var f=this.source;if(!f){throw"%@.addObject() requires source".fmt(this)
}var b=f.get("length"),g=0,a;while(g>=0&&g<b){a=f.indexOf(c,g);if(a>=0){this.add(a);
if(e){return this}g=a++}else{return this}}return this},addObjects:function(b,a){b.forEach(function(c){this.addObject(c,a)
},this);return this},removeObject:function(c,e){var f=this.source;if(!f){throw"%@.removeObject() requires source".fmt(this)
}var b=f.get("length"),g=0,a;while(g>=0&&g<b){a=f.indexOf(c,g);if(a>=0){this.remove(a);
if(e){return this}g=a+1}else{return this}}return this},removeObjects:function(b,a){b.forEach(function(c){this.removeObject(c,a)
},this);return this},LOG_OBSERVING:NO,forEach:function(h,f){var c=this._content,g=0,a=0,e=this.source,b=c[g];
if(f===undefined){f=null}while(b!==0){while(g<b){h.call(f,g++,a++,this,e)}g=Math.abs(b);
b=c[g]}return this},nextObject:function(g,b,c){var f=this._content,e=c.next,a=this.get("max");
if(b===null){b=e=0}else{if(b>=a){delete c.next;return null}else{b++}}if(b===e){do{b=Math.abs(e);
e=f[b]}while(e<0);c.next=e}return b},toString:function(){var a=[];this.forEachRange(function(c,b){a.push(b===1?c:"%@..%@".fmt(c,c+b-1))
},this);return"SC.IndexSet<%@>".fmt(a.join(","))},max:0});SC.IndexSet.slice=SC.IndexSet.copy=SC.IndexSet.clone;
SC.IndexSet.EMPTY=SC.IndexSet.create().freeze();SC.LOGGER_LOG_DELIMITER=", ";SC.LOGGER_LOG_ERROR="ERROR: ";
SC.LOGGER_LOG_INFO="INFO: ";SC.LOGGER_LOG_WARN="WARNING: ";SC.LOGGER_LOG_DEBUG="DEBUG: ";
SC.Logger=SC.Object.create({debugEnabled:NO,exists:function(){return typeof(this.get("reporter"))!=="undefined"&&this.get("reporter")!=null
}.property("reporter").cacheable(),fallBackOnAlert:NO,fallBackOnLog:YES,format:YES,reporter:console,log:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.log)==="function"){if(this.get("format")){a.log(this._argumentsToString.apply(this,arguments))
}else{a.log.apply(a,arguments)}return true}else{if(this.fallBackOnAlert){var b=this.get("format")?this._argumentsToString.apply(this,arguments):arguments;
if(this.get("exists")&&typeof(a.alert)==="function"){a.alert(b)}else{alert(b)}return true
}}return false},debug:function(){var c=this.get("reporter");if(this.get("debugEnabled")!==YES){return false
}if(this.get("exists")&&(typeof c.debug==="function")){c.debug.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_DEBUG)
}return this.log.apply(this,b)}}return false},dir:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dir)==="function"){a.dir.apply(a,arguments);return true
}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},dirxml:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dirxml)==="function"){a.dirxml.apply(a,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},error:function(){var c=this.get("reporter");
if(this.get("exists")&&typeof(c.error)==="function"){c.error.apply(c,arguments);return true
}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_ERROR)
}return this.log.apply(this,b)}}return false},group:function(b){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.group)==="function"){a.group(b);return true}return false
},groupEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.groupEnd)==="function"){a.groupEnd();
return true}return false},info:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.info)==="function"){c.info.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_INFO)
}return this.log.apply(this,b)}}return false},profile:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.profile)==="function"){a.profile();return true}return false
},profileEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.profileEnd)==="function"){a.profileEnd();
return true}return false},time:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.time)==="function"){a.time(b);
return true}return false},timeEnd:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.timeEnd)==="function"){a.timeEnd(b);
return true}return false},trace:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.trace)==="function"){a.trace();
return true}return false},warn:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.warn)==="function"){c.warn.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_WARN)
}return this.log.apply(this,b)}}return false},_argumentsToArray:function(e){if(!e){return[]
}var b=[];for(var c=0;c<e.length;c++){b[c]=e[c]}return b},_argumentsToString:function(){var b="";
for(var a=0;a<arguments.length-1;a++){b+=arguments[a]+SC.LOGGER_LOG_DELIMITER}b+=arguments[arguments.length-1];
return b}});sc_require("private/observer_set");SC.RunLoop=SC.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}this._runLoopInProgress=YES;return this},isRunLoopInProgress:function(){return this._runLoopInProgress
}.property(),endRunLoop:function(){var a;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}do{a=this.flushApplicationQueues();if(!a){a=this._flushinvokeLastQueue()}}while(a);
this._start=null;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ End")
}SC.RunLoop.lastRunLoopEnd=Date.now();this._runLoopInProgress=NO;return this},invokeOnce:function(a,b){if(b===undefined){b=a;
a=this}if(typeof b==="string"){b=a[b]}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()
}this._invokeQueue.add(a,b);return this},invokeLast:function(a,b){if(b===undefined){b=a;
a=this}if(typeof b==="string"){b=a[b]}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()
}this._invokeLastQueue.add(a,b);return this},flushApplicationQueues:function(){var b=NO,a=this._invokeQueue;
if(a&&a.targets>0){this._invokeQueue=null;b=YES;a.invokeMethods()}return SC.Binding.flushPendingChanges()||b
},_flushinvokeLastQueue:function(){var a=this._invokeLastQueue,b=NO;if(a&&a.targets>0){this._invokeLastQueue=null;
b=YES;if(b){a.invokeMethods()}}return b}});SC.RunLoop.currentRunLoop=null;SC.RunLoop.runLoopClass=SC.RunLoop;
SC.RunLoop.begin=function(){var a=this.currentRunLoop;if(!a){a=this.currentRunLoop=this.runLoopClass.create()
}a.beginRunLoop();return this};SC.RunLoop.end=function(){var a=this.currentRunLoop;
if(!a){throw"SC.RunLoop.end() called outside of a runloop!"}a.endRunLoop();return this
};SC.RunLoop.isRunLoopInProgress=function(){if(this.currentRunLoop){return this.currentRunLoop.get("isRunLoopInProgress")
}return NO};SC.run=function(g,f,b){if(b){var a=SC.RunLoop.isRunLoopInProgress();if(!a){SC.RunLoop.begin()
}g.call(f);if(!a){SC.RunLoop.end()}}else{try{SC.RunLoop.begin();if(g){g.call(f)}SC.RunLoop.end()
}catch(c){if(SC.ExceptionHandler){SC.ExceptionHandler.handleException(c)}if(!SC.browser.msie){throw c
}}}};sc_require("system/object");sc_require("mixins/enumerable");sc_require("mixins/copyable");
sc_require("mixins/freezable");SC.SelectionSet=SC.Object.extend(SC.Enumerable,SC.Freezable,SC.Copyable,{isSelectionSet:YES,length:function(){var a=0,b=this._sets,c=this._objects;
if(c){a+=c.get("length")}if(b){b.forEach(function(e){a+=e.get("length")})}return a
}.property().cacheable(),sources:function(){var c=[],e=this._sets,b=e?e.length:0,a,g,f;
for(a=0;a<b;a++){g=e[a];if(g&&g.get("length")>0&&g.source){c.push(g.source)}}return c
}.property().cacheable(),indexSetForSource:function(f){if(!f||!f.isSCArray){return null
}var b=this._indexSetCache,e=this._objects,c,a;if(!b){b=this._indexSetCache={}}c=b[SC.guidFor(f)];
if(c&&c._sourceRevision&&(c._sourceRevision!==f.propertyRevision)){c=null}if(!c){c=this._indexSetForSource(f,NO);
if(c&&c.get("length")===0){c=null}if(e){if(c){c=c.copy()}e.forEach(function(g){if((a=f.indexOf(g))>=0){if(!c){c=SC.IndexSet.create()
}c.add(a)}},this)}if(c){c=b[SC.guidFor(f)]=c.frozenCopy();c._sourceRevision=f.propertyRevision
}}return c},_indexSetForSource:function(g,h){if(h===undefined){h=YES}var e=SC.guidFor(g),c=this[e],f=this._sets,a=f?f.length:0,b=null;
if(c>=a){c=null}if(SC.none(c)){if(h&&!this.isFrozen){this.propertyWillChange("sources");
if(!f){f=this._sets=[]}b=f[a]=SC.IndexSet.create();b.source=g;this[e]=a;this.propertyDidChange("sources")
}}else{b=f?f[c]:null}return b},add:function(a,b,e){if(this.isFrozen){throw SC.FROZEN_ERROR
}var h,g,k,j,c,f,i,l;if(b===undefined&&e===undefined){if(!a){throw"Must pass params to SC.SelectionSet.add()"
}if(a.isIndexSet){return this.add(a.source,a)}if(a.isSelectionSet){h=a._sets;l=a._objects;
g=h?h.length:0;this.beginPropertyChanges();for(k=0;k<g;k++){j=h[k];if(j&&j.get("length")>0){this.add(j.source,j)
}}if(l){this.addObjects(l)}this.endPropertyChanges();return this}}j=this._indexSetForSource(a,YES);
c=this.get("length");i=j.get("length");f=c-i;j.add(b,e);this._indexSetCache=null;
f+=j.get("length");if(f!==c){this.propertyDidChange("length");this.enumerableContentDidChange();
if(i===0){this.notifyPropertyChange("sources")}}return this},remove:function(a,b,e){if(this.isFrozen){throw SC.FROZEN_ERROR
}var h,g,k,j,c,f,i,l;if(b===undefined&&e===undefined){if(!a){throw"Must pass params to SC.SelectionSet.remove()"
}if(a.isIndexSet){return this.remove(a.source,a)}if(a.isSelectionSet){h=a._sets;l=a._objects;
g=h?h.length:0;this.beginPropertyChanges();for(k=0;k<g;k++){j=h[k];if(j&&j.get("length")>0){this.remove(j.source,j)
}}if(l){this.removeObjects(l)}this.endPropertyChanges();return this}}j=this._indexSetForSource(a,YES);
c=this.get("length");f=c-j.get("length");if(j&&(l=this._objects)){if(e!==undefined){b=SC.IndexSet.create(b,e);
e=undefined}l.forEach(function(m){k=a.indexOf(m);if(b.contains(k)){l.remove(m);f--
}},this)}j.remove(b,e);i=j.get("length");f+=i;this._indexSetCache=null;if(f!==c){this.propertyDidChange("length");
this.enumerableContentDidChange();if(i===0){this.notifyPropertyChange("sources")}}return this
},contains:function(b,e,a){if(e===undefined&&a===undefined){return this.containsObject(b)
}var c=this.indexSetForSource(b);if(!c){return NO}return c.contains(e,a)},intersects:function(b,e,a){var c=this.indexSetForSource(b,NO);
if(!c){return NO}return c.intersects(e,a)},_TMP_ARY:[],addObject:function(b){var c=this._TMP_ARY,a;
c[0]=b;a=this.addObjects(c);c.length=0;return a},addObjects:function(a){var e=this._objects,b,c;
if(!e){e=this._objects=SC.CoreSet.create()}b=e.get("length");e.addEach(a);c=e.get("length");
this._indexSetCache=null;if(c!==b){this.propertyDidChange("length");this.enumerableContentDidChange()
}return this},removeObject:function(b){var c=this._TMP_ARY,a;c[0]=b;a=this.removeObjects(c);
c.length=0;return a},removeObjects:function(b){var f=this._objects,c,e,a;if(!f){return this
}c=f.get("length");f.removeEach(b);e=f.get("length");if(a=this._sets){a.forEach(function(g){c+=g.get("length");
g.removeObjects(b);e+=g.get("length")},this)}this._indexSetCache=null;if(e!==c){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(c){var f=this._objects;
if(f&&f.contains(c)){return YES}var e=this._sets,b=e?e.length:0,a,g;for(a=0;a<b;a++){g=e[a];
if(g&&g.indexOf(c)>=0){return YES}}return NO},constrain:function(e){var f,b,a,c;this.beginPropertyChanges();
this.get("sources").forEach(function(g){if(g===e){return}var h=this._indexSetForSource(e,NO);
if(h){this.remove(e,h)}},this);f=this._indexSetForSource(e,NO);if(f&&((a=f.get("max"))>(b=e.get("length")))){this.remove(e,b,a-b)
}if(c=this._objects){c.forEach(function(g){if(e.indexOf(g)<0){this.removeObject(g)
}},this)}this.endPropertyChanges();return this},isEqual:function(h){var g,e,b,a,c,f;
if(!h||!h.isSelectionSet){return NO}if(h===this){return YES}if((this._sets===h._sets)&&(this._objects===h._objects)){return YES
}if(this.get("length")!==h.get("length")){return NO}g=this._objects;e=h._objects;
if(g||e){if((g?g.get("length"):0)!==(e?e.get("length"):0)){return NO}if(g&&!g.isEqual(e)){return NO
}}c=this.get("sources");a=c.get("length");for(b=0;b<a;b++){f=c.objectAt(b);g=this._indexSetForSource(f,NO);
e=this._indexSetForSource(f,NO);if(!!e!==!!g){return NO}if(g&&!g.isEqual(e)){return NO
}}return YES},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}if(this._sets){this._sets.length=0
}if(this._objects){this._objects=null}this._indexSetCache=null;this.propertyDidChange("length");
this.enumerableContentDidChange();this.notifyPropertyChange("sources");return this
},copy:function(){var c=this.constructor.create(),e=this._sets,b=e?e.length:0,a,f;
if(e&&b>0){e=c._sets=e.slice();for(a=0;a<b;a++){if(!(f=e[a])){continue}f=e[a]=f.copy();
c[SC.guidFor(f.source)]=a}}if(this._objects){c._objects=this._objects.copy()}return c
},freeze:function(){if(this.isFrozen){return this}var a=this._sets,b=a?a.length:0,c;
while(--b>=0){if(c=a[b]){c.freeze()}}if(this._objects){this._objects.freeze()}return arguments.callee.base.apply(this,arguments)
},toString:function(){var a=this._sets||[];a=a.map(function(b){return b.toString().replace("SC.IndexSet",SC.guidFor(b.source))
},this);if(this._objects){a.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(SC.guidFor(this),a.join(","))
},firstObject:function(){var b=this._sets,c=this._objects;if(b&&b.get("length")>0){var f=b?b[0]:null,e=f?f.source:null,a=f?f.firstObject():-1;
if(e&&a>=0){return e.objectAt(a)}}return c?c.firstObject():undefined}.property(),nextObject:function(c,f,b){var e,a;
if(c===0){e=b.objects=[];this.forEach(function(g){e.push(g)},this);b.max=e.length
}e=b.objects;a=e[c];if(c+1>=b.max){b.objects=b.max=null}return a},forEach:function(h,f){var c=this._sets,e=this._objects,b=c?c.length:0,g,a;
for(a=0;a<b;a++){g=c[a];if(g){g.forEachObject(h,f)}}if(e){e.forEach(h,f)}return this
}});SC.SelectionSet.prototype.clone=SC.SelectionSet.prototype.copy;SC.SelectionSet.EMPTY=SC.SelectionSet.create().freeze();
sc_require("mixins/enumerable");sc_require("mixins/array");sc_require("mixins/observable");
sc_require("mixins/delegate_support");SC.SparseArray=SC.Object.extend(SC.Observable,SC.Enumerable,SC.Array,SC.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var a=this.delegate;
if(a&&SC.none(this._length)&&a.sparseArrayDidRequestLength){this._requestingLength++;
a.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(a){if(SC.none(a)){this._sa_content=null
}if(a!==this._length){this._length=a;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:[],objectAt:function(a){var c=this._sa_content,b;
if(!c){c=this._sa_content=[]}if((b=c[a])===undefined){this.requestIndex(a);b=c[a]
}return b},definedIndexes:function(e){var c=SC.IndexSet.create(),f=this._sa_content,b,a;
if(!f){return c.freeze()}if(e){e.forEach(function(g){if(f[g]!==undefined){c.add(g)
}})}else{a=f.length;for(b=0;b<a;b++){if(f[b]!==undefined){c.add(b)}}}return c.freeze()
},_TMP_RANGE:{},requestIndex:function(b){var c=this.delegate;if(!c){return this}var a=this.get("rangeWindowSize"),f=b;
if(a>1){f=f-Math.floor(f%a)}if(a<1){a=1}this._requestingIndex++;if(c.sparseArrayDidRequestRange){var e=this._TMP_RANGE;
if(this.wasRangeRequested(f)===-1){e.start=f;e.length=a;c.sparseArrayDidRequestRange(this,e);
this.requestedRangeIndex.push(f)}}else{if(c.sparseArrayDidRequestIndex){while(--a>=0){c.sparseArrayDidRequestIndex(this,f+a)
}}}this._requestingIndex--;return this},wasRangeRequested:function(c){var b,a;for(b=0,a=this.requestedRangeIndex.length;
b<a;b++){if(this.requestedRangeIndex[b]===c){return b}}return -1},rangeRequestCompleted:function(b){var a=this.wasRangeRequested(b);
if(a>=0){this.requestedRangeIndex.removeAt(a,1);return YES}return NO},provideObjectsInRange:function(b,f){var c=this._sa_content;
if(!c){c=this._sa_content=[]}var e=b.start,a=b.length;while(--a>=0){c[e+a]=f[a]}if(this._requestingIndex<=0){this.enumerableContentDidChange()
}return this},_TMP_PROVIDE_ARRAY:[],_TMP_PROVIDE_RANGE:{length:1},provideObjectAtIndex:function(c,b){var e=this._TMP_PROVIDE_ARRAY,a=this._TMP_PROVIDE_RANGE;
e[0]=b;a.start=c;return this.provideObjectsInRange(a,e)},objectsDidChangeInRange:function(a){var b=this._sa_content;
if(b){if(a.start===0&&SC.maxRange(a)>=b.length){this._sa_content=null}else{var e=a.start,c=Math.min(e+a.length,b.length);
while(--c>=e){b[c]=undefined}}}this.enumerableContentDidChange(a);return this},indexOf:function(c){var a=this.delegate;
if(a&&a.sparseArrayDidRequestIndexOf){return a.sparseArrayDidRequestIndexOf(this,c)
}else{var b=this._sa_content;if(!b){b=this._sa_content=[]}return b.indexOf(c)}},replace:function(b,h,f){f=f||[];
var c=this.delegate;if(c){if(!c.sparseArrayShouldReplace||!c.sparseArrayShouldReplace(this,b,h,f)){return this
}}var e=this._sa_content;if(!e){e=this._sa_content=[]}e.replace(b,h,f);var a=f?(f.get?f.get("length"):f.length):0;
var g=a-h;if(!SC.none(this._length)){this.propertyWillChange("length");this._length+=g;
this.propertyDidChange("length")}this.enumerableContentDidChange(b,h,g);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
SC.SparseArray.array=function(a){return this.create({_length:a||0})};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/runtime")
}SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var c=this._deprecatedLanguageCodes||[];c.push(this.language);
var b=c.length;var a=null;while(!a&&--b>=0){a=String[c[b]]}if(a){this.hasStrings=YES;
this.strings=a}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(b,c){var a=this.strings[b];
if(SC.typeOf(a)===SC.T_STRING){return a}else{if(SC.typeOf(c)===SC.T_STRING){return c
}}return b}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var c=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var b=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var e=((c)?SC.browser.language:null)||b||SC.browser.language||"en";e=SC.Locale.normalizeLanguage(e);
var a=this.localeClassFor(e);if(e!=this.currentLanguage){this.currentLanguage=e;this.currentLocale=a.create()
}return this.currentLocale},localeClassFor:function(c){c=SC.Locale.normalizeLanguage(c);
var b,a=this.locales[c];if(!a&&((b=c.split("-")[0])!==c)&&(a=this.locales[b])){a=this.locales[c]=a.extend()
}if(!a){a=this.locales[c]=this.locales.en.extend()}return a},define:function(b,c){var a;
if(c===undefined&&(SC.typeOf(b)!==SC.T_STRING)){a=this;c=b}else{a=SC.Locale.localeClassFor(b)
}SC.mixin(a.prototype,c);return a},options:function(){return this.prototype},addStrings:function(b){var a=this.prototype.strings;
if(a){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(a)
}}else{a=this.prototype.strings={}}if(b){this.prototype.strings=SC.mixin(a,b)}this.prototype.hasStrings=YES;
return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(a){if(!a){return"en"
}return SC.Locale._map[a.toLowerCase()]||a},_assignLocales:function(){for(var a in this.locales){this.locales[a].prototype.language=a
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var a=SC.Object.extend.apply(this,arguments);a.addStrings=SC.Locale.addStrings;
a.define=SC.Locale.define;a.options=SC.Locale.options;a.toString=SC.Locale.toString;
return a}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(c,b){var a=SC.Locale.localeClassFor(c);a.addStrings(b);return this
};sc_require("system/locale");SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.SAFARI_FOCUS_BEHAVIOR=YES;
SC.mixin({data:function(c,b,e){c=(c===window)?"@window":c;var f=SC.hashFor(c);var a=SC._data_cache;
if(!a){SC._data_cache=a={}}var g=a[f];if(b&&!g){a[f]=g={}}if(g&&(e!==undefined)){g[b]=e
}return(b)?g[b]:g},removeData:function(e,c){e=(e===window)?"@window":e;var f=SC.hashFor(e);
var a=SC._data_cache;if(!a){return undefined}var g=a[f];if(!g){return undefined}var b=(c)?g[c]:g;
if(c){delete g[c]}else{delete a[f]}return b}});SC.mixin(Function.prototype,{invokeLater:function(h,a){if(a===undefined){a=1
}var g=this;if(arguments.length>2){var b=SC.$A(arguments).slice(2,arguments.length);
b.unshift(h);var e=this,c=g;g=function(){return c.apply(e,b.slice(1))}}return SC.Timer.schedule({target:h,action:g,interval:a})
}});SC.Controller=SC.Object.extend({isEditable:YES});SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(c,g){var b=this._scsel_selection,h=b?b.get("length"):0,e,f,a;
if((g===undefined)||!this.get("allowsSelection")){g=b}a=(g&&g.isEnumerable)?g.get("length"):0;
if((a>1)&&!this.get("allowsMultipleSelection")){if(h>1){g=SC.SelectionSet.create().addObject(b.get("firstObject")).freeze();
a=1}else{g=b;a=h}}if((a===0)&&!this.get("allowsEmptySelection")){if(h===0){g=this.get("firstSelectableObject");
if(g){g=SC.SelectionSet.create().addObject(g).freeze()}else{g=SC.SelectionSet.EMPTY
}a=g.get("length")}else{g=b;a=h}}if(a===0){g=SC.SelectionSet.EMPTY}g=g.frozenCopy();
this._scsel_selection=g;return g}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var a=this.get("selection");
return !!a&&(a.get("length")>0)}.property("selection").cacheable(),selectObjects:function(b,c){if(!b||b.get("length")===0){if(!c){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var a=this.get("selection");if(c&&a){a=a.copy()}else{a=SC.SelectionSet.create()
}a.addObjects(b).freeze();this.set("selection",a);return this},selectObject:function(a,b){if(a===null){if(!b){this.set("selection",null)
}return this}else{return this.selectObjects([a],b)}},deselectObjects:function(b){if(!b||b.get("length")===0){return this
}var a=this.get("selection");if(!a||a.get("length")===0){return this}a=a.copy().removeObjects(b).freeze();
this.set("selection",a.freeze());return this},deselectObject:function(a){if(!a){return this
}else{return this.deselectObjects([a])}},updateSelectionAfterContentChange:function(){var a=this.get("arrangedObjects");
var b=this.get("selection");var e=this.get("allowsEmptySelection");var c;if(!b){return this
}c=b.indexSetForSource(a);if((c&&(c.get("length")!==b.get("length")))||(!c&&(b.get("length")>0))){b=b.copy().constrain(a).freeze();
this.set("selection",b)}if((b.get("length")===0)&&a&&(a.get("length")>0)&&!e){this.selectObject(this.get("firstSelectableObject"),NO)
}return this}};sc_require("controllers/controller");sc_require("mixins/selection_support");
SC.ArrayController=SC.Controller.extend(SC.Array,SC.SelectionSupport,{content:null,isEditable:YES,orderBy:null,allowsSingleContent:YES,destroyOnRemoval:NO,arrangedObjects:function(){return this
}.property().cacheable(),canRemoveContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&this.get("hasContent");if(a){return !b.isEnumerable||(SC.typeOf(b.removeObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable","hasContent"),canReorderContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&!this.get("orderBy");return a&&!!b.isSCArray}.property("content","isEditable","orderBy"),canAddContent:function(){var b=this.get("content"),a;
a=b&&this.get("isEditable")&&b.isEnumerable;if(a){return(SC.typeOf(b.addObject)===SC.T_FUNCTION)||(SC.typeOf(b.pushObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable"),hasContent:function(){var a=this.get("content");
return !!a&&(!!a.isEnumerable||!!this.get("allowsSingleContent"))}.property("content","allowSingleContent"),status:function(){var b=this.get("content"),a=b?b.get("status"):null;
return a?a:SC.Record.READY}.property().cacheable(),addObject:function(a){if(!this.get("canAddContent")){throw"%@ cannot add content".fmt(this)
}var b=this.get("content");if(b.isSCArray){b.pushObject(a)}else{if(b.addObject){b.addObject(a)
}else{throw"%@.content does not support addObject".fmt(this)}}return this},removeObject:function(a){if(!this.get("canRemoveContent")){throw"%@ cannot remove content".fmt(this)
}var b=this.get("content");if(b.isEnumerable){b.removeObject(a)}else{this.set("content",null)
}if(this.get("destroyOnRemoval")&&a.destroy){a.destroy()}return this},length:function(){var a=this._scac_observableContent();
return a?a.get("length"):0}.property().cacheable(),objectAt:function(a){var b=this._scac_observableContent();
return b?b.objectAt(a):undefined},replace:function(h,g,e){if(!e||e.get("length")===0){if(!this.get("canRemoveContent")){throw"%@ cannot remove objects from the current content".fmt(this)
}}else{if(!this.get("canReorderContent")){throw"%@ cannot add or reorder the current content".fmt(this)
}}var c=this.get("content");var b=[],a,f;if(this.get("destroyOnRemoval")){for(a=0;
a<g;a++){b.push(c.objectAt(a+h))}}if(c){c.replace(h,g,e)}for(a=0,f=b.length;a<f;a++){b[a].destroy()
}b=null;return this},indexOf:function(b,a){var c=this._scac_observableContent();return c?c.indexOf(b,a):-1
},init:function(){arguments.callee.base.apply(this,arguments);this._scac_contentDidChange()
},_scac_cached:NO,_scac_observableContent:function(){var b=this._scac_cached;if(b!==NO){return b
}var f=this.get("content"),g,e,c,a;if(SC.none(f)){return this._scac_cached=[]}if(!f.isEnumerable){b=this.get("allowsSingleContent")?[f]:[];
return(this._scac_cached=b)}g=this.get("orderBy");if(!g){if(f.isSCArray){return(this._scac_cached=f)
}else{throw"%@.orderBy is required for unordered content".fmt(this)}}switch(SC.typeOf(g)){case SC.T_STRING:g=[g];
break;case SC.T_FUNCTION:e=g;break;case SC.T_ARRAY:break;default:throw"%@.orderBy must be Array, String, or Function".fmt(this)
}if(!e){a=g.get("length");e=function(k,i){var h=0,j=0,l,n,m,o;for(h=0;(h<a)&&(j===0);
h++){l=g.objectAt(h);o=NO;if(l.indexOf("ASC")>-1){l=l.split("ASC ")[1]}else{if(l.indexOf("DESC")>-1){l=l.split("DESC ")[1];
o=YES}}if(!k){n=k}else{if(k.isObservable){n=k.get(l)}else{n=k[l]}}if(!i){m=i}else{if(i.isObservable){m=i.get(l)
}else{m=i[l]}}j=SC.compare(n,m);if(o){j=(-1)*j}}return j}}b=[];f.forEach(function(h){b.push(h)
});b.sort(e);e=null;return(this._scac_cached=b)},_scac_contentDidChange:function(){this._scac_cached=NO;
var i=this.get("content"),e=!!this.get("orderBy"),j=this._scac_content,a=this._scac_length||0,h=this._scac_rangeObserver,b=this._scac_rangeDidChange,g=this._scac_enumerableDidChange,c=this._scac_contentStatusDidChange,f;
if(j===i){return this}if(j){if(h&&j.isSCArray){j.removeRangeObserver(h)}else{if(j.isEnumerable){j.removeObserver("[]",this,g)
}}j.removeObserver("status",this,c)}h=null;this._scac_cached=NO;this._scac_content=i;
if(i){if(!e&&i.isSCArray){h=i.addRangeObserver(null,this,b)}else{if(i.isEnumerable){i.addObserver("[]",this,g)
}}f=i.isEnumerable?i.get("length"):1;i.addObserver("status",this,c)}else{f=SC.none(i)?0:1
}this._scac_rangeObserver=h;this._scac_length=f;this._scac_contentStatusDidChange();
this.enumerableContentDidChange(0,f,f-a);this.updateSelectionAfterContentChange()
}.observes("content"),_scac_enumerableDidChange:function(){var a=this.get("content"),c=a?a.get("length"):0,b=this._scac_length;
this._scac_length=c;this.beginPropertyChanges();this._scac_cached=NO;this.enumerableContentDidChange(0,c,c-b);
this.endPropertyChanges();this.updateSelectionAfterContentChange()}.observes("orderBy"),_scac_rangeDidChange:function(f,e,b,a){if(b!=="[]"){return
}var c=this.get("content");this._scac_length=c.get("length");this._scac_cached=NO;
if(a){this.beginPropertyChanges();a.forEachRange(function(h,g){this.enumerableContentDidChange(h,g,0)
},this);this.endPropertyChanges();this.updateSelectionAfterContentChange()}},_scac_contentStatusDidChange:function(){this.notifyPropertyChange("status")
}});require("controllers/controller");SC.ObjectController=SC.Controller.extend({content:null,allowsMultipleContent:NO,hasContent:function(){return !SC.none(this.get("observableContent"))
}.property("observableContent"),isEditable:YES,observableContent:function(){var b=this.get("content"),a,c;
if(b&&b.isEnumerable){a=b.get("length");c=this.get("allowsMultipleContent");if(a===1){b=b.firstObject()
}else{if(a===0||!c){b=null}}if(b&&!c&&b.isEnumerable){b=null}}return b}.property("content","allowsMultipleContent").cacheable(),destroy:function(){var a=this.get("observableContent");
if(a&&SC.typeOf(a.destroy)===SC.T_FUNCTION){a.destroy()}this.set("content",null);
return this},contentPropertyDidChange:function(b,a){if(a==="*"){this.allPropertiesDidChange()
}else{this.notifyPropertyChange(a)}},unknownProperty:function(b,e){if(b==="content"){if(e!==undefined){this.content=e
}return this.content}var c=this.get("observableContent"),g,f,a;if(c===null||c===undefined){return undefined
}if(e===undefined){if(c.isEnumerable){e=c.getEach(b);g=e.get("length");if(g>0){a=YES;
f=e.objectAt(0);while((--g>0)&&a){if(f!==e.objectAt(g)){a=NO}}if(a){e=f}}else{e=undefined
}}else{e=(c.isObservable)?c.get(b):c[b]}}else{if(!this.get("isEditable")){throw"%@.%@ is not editable".fmt(this,b)
}if(c.isEnumerable){c.setEach(b,e)}else{if(c.isObservable){c.set(b,e)}else{c[b]=e
}}}return e},init:function(){arguments.callee.base.apply(this,arguments);if(this.get("content")){this._scoc_contentDidChange()
}if(this.get("observableContent")){this._scoc_observableContentDidChange()}},_scoc_contentDidChange:function(){var b=this._scoc_content,c=this.get("content");
if(b!==c){this._scoc_content=c;var a=this._scoc_enumerableContentDidChange;if(b&&b.isEnumerable){b.removeObserver("[]",this,a)
}if(c&&c.isEnumerable){c.addObserver("[]",this,a)}}}.observes("content"),_scoc_observableContentDidChange:function(){var b=this._scoc_observableContent,e=this.get("observableContent"),a=this.contentPropertyDidChange,c=this._scoc_enumerableContentDidChange;
if(b===e){return this}this._scoc_observableContent=e;if(b){if(b.isEnumerable){b.removeObserver("[]",this,c)
}else{if(b.isObservable){b.removeObserver("*",this,a)}}}if(e){if(e.isEnumerable){e.addObserver("[]",this,c)
}else{if(e.isObservable){e.addObserver("*",this,a)}}}if((b&&b.isEnumerable)||(e&&e.isEnumerable)){this._scoc_enumerableContentDidChange()
}else{this.contentPropertyDidChange(e,"*")}}.observes("observableContent"),_scoc_enumerableContentDidChange:function(){var b=this.get("observableContent"),c=this._scoc_observableContentItems,a=this.contentPropertyDidChange;
if(c){c.forEach(function(e){if(e.isObservable){e.removeObserver("*",this,a)}},this);
c.clear()}if(b&&b.isEnumerable){if(!c){c=SC.Set.create()}b.forEach(function(e){if(c.contains(e)){return
}c.add(e);if(e.isObservable){e.addObserver("*",this,a)}},this)}else{c=null}this._scoc_observableContentItems=c;
this.contentPropertyDidChange(b,"*");return this}});SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(f,c){var e=this.get("treeItemChildren"),b,h,a,g;
if(!e){return null}b=SC.IndexSet.create();h=e.get("length");for(a=0;a<h;a++){if(!(g=e.objectAt(a))){continue
}if(!g.get("treeItemChildren")){continue}if(g.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.BRANCH_OPEN=17;SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;
SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var e=b.get("selection");
return e?e.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");
SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var f=this.get("item"),b,g,a,e,c;
if(!f){return SC.IndexSet.EMPTY}else{if(f.isTreeItemContent){g=this.get("parentItem");
a=this.get("index");return f.treeItemBranchIndexes(g,a)}else{e=this.get("children");
if(!e){return null}c=SC.IndexSet.create();b=e.get("length");g=f;for(a=0;a<b;a++){if(!(f=e.objectAt(a))){continue
}if(!this._computeChildren(f,g,a)){continue}if(this._computeDisclosureState(f,g,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(e){var a=this.get("length"),g=this.get("item"),b=this._objectAtCache,i=e,h=0,c,f;
if(e>=a){return undefined}if(this.get("isHeaderVisible")){if(e===0){return g}else{i--
}}g=null;if(!b){b=this._objectAtCache=[]}if((g=b[e])!==undefined){return g}f=this.get("children");
if(!f){return undefined}if(c=this.get("branchIndexes")){c.forEach(function(l){if(g||(l>i)){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>i){g=k.objectAt(i-l);
i=-1}else{i-=j-1}},this)}if(i>=0){g=f.objectAt(i)}b[e]=g;return g},replace:function(a,b,k,e){var j=a,h=null,f,g,i;
if(e===undefined){e=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){j--}if(j<0){throw"Tree Item cannot replace itself"
}if(f=this.get("branchIndexes")){f.forEach(function(l){if(h||(l>=j)){return}if(!(h=this.branchObserverAt(l))){return
}g=h.get("length");if((l+g===j)&&e===SC.DROP_AFTER){j-=l}else{if(l+g>j){j-=l}else{j-=g-1;
h=null}}},this)}if(h){h.replace(j,b,k,e);return this}i=j+b;if(b>1&&f){f.forEachIn(j,f.get("max")-j,function(l){if(l>i){return
}if(!(h=this.branchObserverAt(l))){return}g=h.get("length");i-=g-1},this)}b=i-j;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(i>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(j,b,k,e);return this},observerContentDidChange:function(h,g,f){this.invalidateBranchObserversAt(h);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),e;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){e=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",e)}else{if(b===c){g=this.expandChildIndex(h+g);
h=this.expandChildIndex(h);g=g-h;f=0}else{h=this.expandChildIndex(h);g=c-h;f=c-b}this.enumerableContentDidChange(h,g,f)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(e){b+=this.branchObserverAt(e).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(h,f){if(f!==this){return null
}var g=this._contentGroupIndexes;if(g!==NO){return g}if(this.get("parentObserver")){return null
}var k=this.get("item"),j,b,e,i,c,a;if(k&&k.isTreeItemContent){j=k.get("treeItemIsGrouped")
}else{j=!!this.delegate.get("treeItemIsGrouped")}if(j){g=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");e=a?a.get("length"):0;i=c=0;if(b){b.forEach(function(m){g.add(i,(m+1)-c);
i+=(m+1)-c;c=m+1;var l=this.branchObserverAt(m);if(l){i+=l.get("length")-1}},this)
}if(c<e){g.add(i,e-c)}}else{g=null}this._contentGroupIndexes=g;return g},contentIndexIsGroup:function(b,e,a){var c=this.contentGroupIndexes(b,e);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(k,h,f){if(h!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._outlineLevelCache=[]
}var g=this.get("length"),l=f,e=0,i=null,c,b,j;if(f>=g){return -1}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("outlineLevel")-1
}else{l--}}if(c=this.get("branchIndexes")){c.forEach(function(o){if((i!==null)||(o>l)){return
}var n=this.branchObserverAt(o),m;if(!n){return}m=n.get("length");if(o+m>l){i=n.contentIndexOutlineLevel(k,n,l-o);
l=-1}else{l-=m-1}},this)}if(l>=0){i=this.get("outlineLevel")}a[f]=i;return i},contentIndexDisclosureState:function(k,h,f){if(h!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._disclosureStateCache=[]
}var g=this.get("length"),l=f,e=0,i=null,c,b,j;if(f>=g){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("disclosureState")
}else{l--}}if(c=this.get("branchIndexes")){c.forEach(function(o){if((i!==null)||(o>l)){return
}var n=this.branchObserverAt(o),m;if(!n){return}m=n.get("length");if(o+m>l){i=n.contentIndexDisclosureState(k,n,l-o);
l=-1}else{l-=m-1}},this)}if(l>=0){i=SC.LEAF_NODE}a[f]=i;return i},contentIndexExpand:function(b,g,a){var c,h=a,e,f;
if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=h){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){k.contentIndexExpand(b,k,h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._expand(f,this.get("item"),h)
}}},contentIndexCollapse:function(b,g,a){var c,e,f,h=a;if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=h){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){k.contentIndexCollapse(b,k,h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._collapse(f,this.get("item"),h)
}}},branchObserverAt:function(e){var h=this._branchObserversByIndex,c=this._branchObserverIndexes,f,i,b,k,a,g,j;
if(!h){h=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(f=h[e]){return f}a=this.get("children");k=a?a.objectAt(e):null;if(!k){return null
}h[e]=f=SC.TreeItemObserver.create({item:k,delegate:this.get("delegate"),parentObserver:this,index:e,outlineLevel:this.get("outlineLevel")+1});
c.add(e);return f},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(f){var e=b[f];
if(e){e.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(g,b){var a=this.get("children"),f=this.get("disclosureState"),e=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(e);if(f!==c){this.set("disclosureState",c)
}c=this._computeChildren(e);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),e=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===e){return this}if(a){b.removeRangeObserver(a)}if(e){this._childrenRangeObserver=e.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=e;this._childrenRangeDidChange(e,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(g,j,i,e){var a=this.get("children"),f=a?a.get("length"):0,c=e?e.get("min"):0,h=e?e.get("max"):f,b=this._childrenLen||0;
this._childrenLen=f;this.observerContentDidChange(c,h-c,f-b)},_computeDisclosureState:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return SC.LEAF_NODE}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return e.treeItemDisclosureState(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return e.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemCollapse(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,NO)}}return this},_expand:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemExpand(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,e=this.get("disclosureState"),c=this.get("children"),a;
if((e===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(f){var g=this.branchObserverAt(f);
b+=g.get("length")-1},this)}}return b}});sc_require("controllers/object");sc_require("mixins/selection_support");
sc_require("private/tree_item_observer");SC.TreeController=SC.ObjectController.extend(SC.SelectionSupport,{treeItemIsGrouped:NO,treeItemIsExpandedKey:"treeItemIsExpanded",treeItemChildrenKey:"treeItemChildren",arrangedObjects:function(){var a,b=this.get("content");
if(b){a=SC.TreeItemObserver.create({item:b,delegate:this})}else{a=null}this._sctc_arrangedObjects=a;
return a}.property().cacheable(),_sctc_invalidateArrangedObjects:function(){this.propertyWillChange("arrangedObjects");
var a=this._sctc_arrangedObjects;if(a){a.destroy()}this._sctc_arrangedObjects=null;
this.propertyDidChange("arrangedObjects")}.observes("content","treeItemIsExpandedKey","treeItemChildrenKey","treeItemIsGrouped"),_sctc_arrangedObjectsContentDidChange:function(){this.updateSelectionAfterContentChange()
}.observes("*arrangedObjects.[]"),firstSelectableObject:function(){var e=this.get("arrangedObjects"),c,b,a=0;
if(!e){return null}c=e.contentGroupIndexes(null,e);b=e.get("length");while(c.contains(a)&&(a<b)){a++
}return a>=b?null:e.objectAt(a)}.property()});SC.mixin(SC.Object.prototype,{invokeLater:function(b,a){if(a===undefined){a=1
}var g=b,c,e;if(arguments.length>2){c=SC.$A(arguments).slice(2);if(SC.typeOf(g)===SC.T_STRING){g=this[b]
}e=g;g=function(){return e.apply(this,c)}}return SC.Timer.schedule({target:this,action:g,interval:a})
},invokeWith:function(b,c,e){if(e===undefined){e=c;c=this}if(!c){c=this}if(SC.typeOf(e)===SC.T_STRING){e=c[e]
}var a=this.getPath(b);e.call(c,a,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var a=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return a},scheduleTimer:function(b,a){this._timerQueue=b.removeFromTimerQueue(this._timerQueue);
this._timerQueue=b.scheduleInTimerQueue(this._timerQueue,a);return this},cancelTimer:function(a){this._timerQueue=a.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var e=this.get("startTime"),f=this.TIMER_ARRAY,c,b,a;this._firing=YES;this._timerQueue=this._timerQueue.collectExpiredTimers(f,e);
b=f.length;for(c=0;c<b;c++){f[c].fire()}a=f.length>0;f.length=0;this._firing=NO;return a
},scheduleNextTimeout:function(){var e=this._timerQueue;var b=NO;if(!e){if(this._timeout){clearTimeout(this._timeout)
}}else{var c=e._timerQueueRunTime;if(this._timeoutAt!==c){if(this._timeout){clearTimeout(this._timeout)
}var a=Math.max(0,c-Date.now());this._timeout=setTimeout(this._timeoutDidFire,a);
this._timeoutAt=c}b=YES}return b},_timeoutDidFire:function(){var a=SC.RunLoop.currentRunLoop;
a._timeout=a._timeoutAt=null;SC.run()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
/* @license

Portions of this software are copyright Yahoo, Inc, used under the following license:

Software License Agreement (BSD License)
Copyright (c) 2009, Yahoo! Inc.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sources of Intellectual Property Included in the YUI Library
Where not otherwise indicated, all YUI content is authored by Yahoo! engineers and consists of Yahoo!-owned intellectual property. YUI is issued by Yahoo! under the BSD license above. In some specific instances, YUI will incorporate work done by developers outside of Yahoo! with their express permission.

*/
/* @license
  jQuery 1.2.6 - New Wave Javascript

  Copyright (c) 2008 John Resig (jquery.com)
  Dual licensed under the MIT (MIT-LICENSE.txt)
  and GPL (GPL-LICENSE.txt) licenses.
  
  $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
  $Rev: 5685 $
*/
SC.Button={value:null,toggleOnValue:YES,toggleOffValue:NO,localize:NO,localizeBindingDefault:SC.Binding.bool(),title:"",contentTitleKey:null,icon:null,contentIconKey:null,needsEllipsis:YES,displayTitle:function(){var a=this.get("title");
return(a&&this.get("localize"))?a.loc():(a||"")}.property("title","localize").cacheable(),keyEquivalent:null,renderTitle:function(b,a){var h=this.get("icon"),e="",i=this.get("displayTitle"),j=(!SC.none(i)&&i.length>0),c,k,f;
if(this.get("escapeHTML")){i=SC.RenderContext.escapeHTML(i)}if(h){var g=SC.BLANK_IMAGE_URL;
if(h.indexOf("/")>=0){e='<img src="'+h+'" alt="" class="icon" />'}else{e='<img src="'+g+'" alt="" class="'+h+'" />'
}j=YES}f=e+i;if(a){if(this.get("needsEllipsis")){b.push('<label class="sc-button-label ellipsis">'+f+"</label>")
}else{b.push('<label class="sc-button-label">'+f+"</label>")}this._ImageTitleCached=f
}else{c=this.$("label");if((k=c[0])){if(j){c.setClass("ellipsis",this.get("needsEllipsis"));
if(this._ImageTitleCached!==f){this._ImageTitleCached=f;k.innerHTML=f}}else{k.innerHTML=""
}}}return b},contentPropertyDidChange:function(i,c){var b=this.get("displayDelegate"),f=this.get("content"),h;
var e=this.getDelegateProperty("contentValueKey",b);if(e&&(c===e||c==="*")){this.set("value",f?(f.get?f.get(e):f[e]):null)
}var a=this.getDelegateProperty("contentTitleKey",b);if(a&&(c===a||c==="*")){this.set("title",f?(f.get?f.get(a):f[a]):null)
}var g=this.getDelegateProperty("contentIconKey",b);if(g&&(c===g||c==="*")){this.set("icon",f?(f.get?f.get(g):f[g]):null)
}return this},_button_displayObserver:function(){this.displayDidChange()}.observes("title","icon","value"),performKeyEquivalent:function(c,b){if(!this.get("isVisibleInWindow")){return NO
}if(!this.get("isEnabled")){return NO}var a=this.get("keyEquivalent");if(a){if(a===c){return this.triggerAction(b)
}}else{if((this.get("isDefault")&&(c==="return"))||(this.get("isCancel")&&(c==="escape"))){return this.triggerAction(b)
}}return NO},triggerAction:function(a){throw"SC.Button.triggerAction() is not defined in %@".fmt(this)
},computeIsSelectedForValue:function(e){var b=this.get("toggleOnValue"),c,a;if(SC.typeOf(e)===SC.T_ARRAY){if(e.length===1){c=(e[0]==b)
}else{c=null;e.find(function(f){a=(f==b);if(c===null){c=a}else{if(a!==c){c=SC.MIXED_STATE
}}return c===SC.MIXED_STATE})}}else{if(e===SC.MIXED_STATE){c=SC.MIXED_STATE}else{c=(e===b)
}}return c},initMixin:function(){if(!SC.none(this.get("value"))){this._button_valueDidChange()
}},_button_valueDidChange:function(){var b=this.get("value"),a=this.computeIsSelectedForValue(b);
this.set("isSelected",a)}.observes("value"),_button_isSelectedDidChange:function(){var c=this.get("isSelected"),b=this.computeIsSelectedForValue(this.get("value"));
if((c!==SC.MIXED_STATE)&&(b!==c)){var a=(c)?"toggleOnValue":"toggleOffValue";this.set("value",this.get(a))
}}.observes("isSelected")};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],initMixin:function(){this._display_contentDidChange()
},destroyMixin:function(){if(!this._display_content){return}this._display_stopObservingContent(this._display_content);
this._display_content=null},_display_beginObservingContent:function(a){var b=this._display_contentPropertyDidChange;
if(SC.isArray(a)){a.invoke("addObserver","*",this,b)}else{if(a.addObserver){a.addObserver("*",this,b)
}}},_display_stopObservingContent:function(a){var b=this._display_contentPropertyDidChange;
if(SC.isArray(a)){a.invoke("removeObserver","*",this,b)}else{if(a.removeObserver){a.removeObserver("*",this,b)
}}},_display_contentDidChange:function(e,a,c){if((c=this.get("content"))===this._display_content){return
}var b=this._display_content;if(b){this._display_stopObservingContent(b)}b=this._display_content=c;
if(b){this._display_beginObservingContent(b)}this.displayDidChange()}.observes("content","contentDisplayProperties"),_display_contentPropertyDidChange:function(f,c,e,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.STRING_DECAMELIZE_REGEXP=(/([a-z])([A-Z])/g);SC.STRING_DASHERIZE_REGEXP=(/[ _]/g);
SC.STRING_HUMANIZE_REGEXP=(/[\-_]/g);SC.STRING_TRIM_REGEXP=(/^\s+|\s+$/g);SC.STRING_TRIM_LEFT_REGEXP=(/^\s+/g);
SC.STRING_TRIM_RIGHT_REGEXP=(/\s+$/g);SC.STRING_REGEXP_ESCAPED_REGEXP=(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g);
SC.STRING_DASHERIZE_CACHE={top:"top",left:"left",right:"right",bottom:"bottom",width:"width",height:"height",minWidth:"min-width",maxWidth:"max-width"};
SC.INFLECTION_CONSTANTS={PLURAL:[[/(quiz)$/i,"$1zes"],[/^(ox)$/i,"$1en"],[/([m|l])ouse$/i,"$1ice"],[/(matr|vert|ind)ix|ex$/i,"$1ices"],[/(x|ch|ss|sh)$/i,"$1es"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(hive)$/i,"$1s"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/sis$/i,"ses"],[/([ti])um$/i,"$1a"],[/(buffal|tomat)o$/i,"$1oes"],[/(bu)s$/i,"$1ses"],[/(alias|status)$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(ax|test)is$/i,"$1es"],[/s$/i,"s"],[/$/,"s"]],SINGULAR:[[/(quiz)zes$/i,"$1"],[/(matr)ices$/i,"$1ix"],[/(vert|ind)ices$/i,"$1ex"],[/^(ox)en/i,"$1"],[/(alias|status)es$/i,"$1"],[/(octop|vir)i$/i,"$1us"],[/(cris|ax|test)es$/i,"$1is"],[/(shoe)s$/i,"$1"],[/(o)es$/i,"$1"],[/(bus)es$/i,"$1"],[/([m|l])ice$/i,"$1ouse"],[/(x|ch|ss|sh)es$/i,"$1"],[/(m)ovies$/i,"$1ovie"],[/(s)eries$/i,"$1eries"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/([lr])ves$/i,"$1f"],[/(tive)s$/i,"$1"],[/(hive)s$/i,"$1"],[/([^f])ves$/i,"$1fe"],[/(^analy)ses$/i,"$1sis"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,"$1$2sis"],[/([ti])a$/i,"$1um"],[/(n)ews$/i,"$1ews"],[/s$/i,""]],IRREGULAR:[["move","moves"],["sex","sexes"],["child","children"],["man","men"],["person","people"]],UNCOUNTABLE:["sheep","fish","series","species","money","rice","information","info","equipment"]};
SC.String={loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var a=SC.Locale.currentLocale.locWithDefault(this);if(SC.typeOf(a)!==SC.T_STRING){a=this
}return a.fmt.apply(a,arguments)},locWithDefault:function(b){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var c=SC.Locale.currentLocale.locWithDefault(this,b);if(SC.typeOf(c)!==SC.T_STRING){c=this
}var a=SC.$A(arguments);a.shift();return c.fmt.apply(c,a)},capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,e,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},camelize:function(){var b=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=b.charAt(0),a=c.toLowerCase();return(c!==a)?(a+b.slice(1)):b},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},decamelize:function(){return this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2").toLowerCase()
},dasherize:function(){var a=SC.STRING_DASHERIZE_CACHE,b=a[this];if(b){return b}else{b=this.decamelize().replace(SC.STRING_DASHERIZE_REGEXP,"-");
a[this]=b}return b},humanize:function(){return this.decamelize().replace(SC.STRING_HUMANIZE_REGEXP," ")
},escapeForRegExp:function(){return this.replace(SC.STRING_REGEXP_ESCAPED_REGEXP,"\\$1")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var e,f,b="",g=this.length;for(var c=0;c<=g;++c){e=this.charAt(c);
f=a[e];if(f){b+=f}else{b+=e}}return b},trim:function(){return this.replace(SC.STRING_TRIM_REGEXP,"")
},trimLeft:function(){return this.replace(SC.STRING_TRIM_LEFT_REGEXP,"")},trimRight:function(){return this.replace(SC.STRING_TRIM_RIGHT_REGEXP,"")
},pluralize:function(){var k,f,b=this.split(/\s/).pop(),h=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(k=0,f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;k<f;k++){var g=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[k];
if(b==g){return this.toString()}}for(k=0,f=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
k<f;k++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[k][0],j=SC.INFLECTION_CONSTANTS.IRREGULAR[k][1];
if((b==c)||(b==j)){if(a){j=j.capitalize()}return h+j}}for(k=0,f=SC.INFLECTION_CONSTANTS.PLURAL.length;
k<f;k++){var i=SC.INFLECTION_CONSTANTS.PLURAL[k][0],e=SC.INFLECTION_CONSTANTS.PLURAL[k][1];
if(i.test(b)){return this.replace(i,e)}}},singularize:function(){var k,f,b=this.split(/\s/).pop(),h=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(k=0,f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;k<f;k++){var g=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[k];
if(b==g){return this.toString()}}for(k=0,f=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
k<f;k++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[k][0],j=SC.INFLECTION_CONSTANTS.IRREGULAR[k][1];
if((b==c)||(b==j)){if(a){c=c.capitalize()}return h+c}}for(k=0,f=SC.INFLECTION_CONSTANTS.SINGULAR.length;
k<f;k++){var i=SC.INFLECTION_CONSTANTS.SINGULAR[k][0],e=SC.INFLECTION_CONSTANTS.SINGULAR[k][1];
if(i.test(b)){return this.replace(i,e)}}}};SC.String.strip=SC.String.trim;SC.supplement(String.prototype,SC.String);
String.prototype.loc=SC.String.loc;SC.String.fmt=String.prototype.fmt;sc_require("mixins/string");
SC.MIXED_STATE="__MIXED__";SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";
SC.REGULAR_CONTROL_SIZE="sc-regular-size";SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";
SC.Control={initMixin:function(){this._control_contentDidChange()},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey")
},updatePropertyFromContent:function(g,b,f,e){var c=b==="*";if(f===undefined){f="content"+g.capitalize()+"Key"
}if(e===undefined){e=this.get("content")}f=this[f]?this.get(f):this.getDelegateProperty(f,this.displayDelegate);
if(f&&(c||b===f)){var a=(e)?(e.get?e.get(f):e[f]):null;this.set(g,a)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate),b=this.get("content");
if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel."+c.locWithDefault(("FieldKey."+c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(a,f){var c=this.get("isSelected"),b=!this.get("isEnabled"),e=this._CONTROL_TMP_CLASSNAMES;
e.mixed=c===SC.MIXED_STATE;e.sel=c&&(c!==SC.MIXED_STATE);e.active=this.get("isActive");
a.setClass(e).addClass(this.get("controlSize"))},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange,a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content")};SC.Editable={isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.beginPropertyChanges();this.set("isEditing",YES);
this.becomeFirstResponder();this.endPropertyChanges();return YES},discardEditing:function(){return !this.get("isEditing")
},commitEditing:function(){if(!this.get("isEditing")){return YES}this.set("isEditing",NO);
this.resignFirstResponder();return YES}};SC.mixin(SC.browser,(function(){var a=window.innerWidth,c=SC.browser,b=navigator.standalone;
SC.extend(c,{isOpera:!!c.opera,isIe:!!c.msie,isIE:!!c.msie,isSafari:!!c.safari,isMobileSafari:(!!c.mobileSafari||!!c.standalone),isMozilla:!!c.mozilla,isWindows:!!c.windows,isMac:!!c.mac,isiPhone:((!!c.mobileSafari||!!c.standalone)&&(a==320||a==480)),current:c.msie?"msie":c.mozilla?"mozilla":c.safari?"safari":c.opera?"opera":"unknown",compareVersion:function(){if(this._versionSplit===undefined){var h=function(i){return Number(i.match(/^[0-9]+/))
};this._versionSplit=SC.A(this.version.split(".")).map(h)}var g=SC.A(arguments).map(Number);
for(var f=0;f<g.length;f++){var e=this._versionSplit[f]-g[f];if(isNaN(e)){return 0
}if(e!==0){return e}}return 0}});return c})());SC.Builder=function(a){return SC.Builder.create(a)
};SC.Builder.create=function create(c){var b=SC.mixin(SC.beget(this.fn),c||{});if(c.hasOwnProperty("toString")){b.toString=c.toString
}var a=function(){var e=SC.beget(b);e.defaultClass=this;e.constructor=a;return e.init.apply(e,arguments)
};a.fn=a.prototype=b;a.extend=SC.Builder.create;a.mixin=SC.Builder.mixin;return a
};SC.Builder.mixin=function(){var b=arguments.length,a;for(a=0;a<b;a++){SC.mixin(this,arguments[a])
}return this};SC.Builder.fn={init:function(a){if(a!==undefined){if(SC.typeOf(a)===SC.T_ARRAY){var b=a.length;
while(--b>=0){this[b]=a.objectAt?a.objectAt(b):a[b]}this.length=a.length}else{this[0]=a;
this.length=1}}return this},size:function(){return this.length},pushStack:function(){var a=this.constructor.apply(this,arguments);
a.prevObject=this;return a},end:function(){return this.prevObject||this.constructor()
},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var a=SC.Enumerable,c=SC.Builder.fn,b,e;for(b in a){if(!a.hasOwnProperty(b)){continue
}e=Array.prototype[b]||a[b];c[b]=e}})();require("system/builder");SC.CoreQuery=(function(){var F=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,j=/^.[^:#\[\.]*$/;
var x=/ CQ\d+="(?:\d+|null)"/g,f=/(<(\w+)[^>]*?)\/>/g,q=/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i,b=/\s+/,g=/^\s+/,i=/^body|html$/i,D=/href|src|style/,k=/(button|input|object|select|textarea)/i,y=/alpha\([^)]*\)/,t=/opacity=([^)]*)/;
var C=SC.browser.msie?"styleFloat":"cssFloat";var u=(SC.browser.safari&&parseInt(SC.browser.version,0)<417)?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var z=new RegExp("^("+u+"+)(#)("+u+"+)");var o=new RegExp("^([#.]?)("+u+"*)");var h=new RegExp("([#.]?)("+u+"*)","g");
var n=["Left","Right"];var e=["Top","Bottom"];var p={position:"absolute",visibility:"hidden",display:"block"};
var B=function B(I,H,N){var M=H==="width"?I.offsetWidth:I.offsetHeight;var K=0,G=0,L=N.length,J;
while(--L>=0){J=N[L];K+=parseFloat(c.curCSS(I,"padding"+J,true))||0;G+=parseFloat(c.curCSS(I,"border"+J+"Width",true))||0
}M-=Math.round(K+G);return M};var l=SC.guidKey,A=0,E={},a=/z-?index|font-?weight|opacity|zoom|line-?height/i,v=document.defaultView||{};
var s=function s(H){if(!SC.browser.safari){return false}var G=v.getComputedStyle(H,null);
return !G||G.getPropertyValue("color")===""};function m(G,H){return G[0]&&parseInt(c.curCSS(G[0],H,true),10)||0
}var w,c;c=w=SC.Builder.create({jquery:"SC.CoreQuery",init:function(G,I){G=G||document;
if(G.nodeType){this[0]=G;this.length=1;return this}else{if(typeof G==="string"){var H=F.exec(G);
if(H&&(H[1]||!I)){if(H[1]){G=c.clean([H[1]],I)}else{var J=document.getElementById(H[3]);
if(J){if(J.id!=H[3]){return c().find(G)}return c(J)}G=[]}}else{return c(I).find(G)
}}else{if(SC.typeOf(G)===SC.T_FUNCTION){return SC.ready(G)}}}return this.setArray(c.makeArray(G))
},size:function(){return this.length},get:function(G){return G===undefined?c.makeArray(this):this[G]
},find:function(G){var H=c.map(this,function(I){return c.find(G,I)});return this.pushStack(H)
},filter:function(G){return this.pushStack((SC.typeOf(G)===SC.T_FUNCTION)&&c.grep(this,function(I,H){return G.call(I,H)
})||c.multiFilter(G,this))},not:function(G){if(typeof G==="string"){if(j.test(G)){return this.pushStack(c.multiFilter(G,this,true))
}else{G=c.multiFilter(G,this)}}var H=G.length&&G[G.length-1]!==undefined&&!G.nodeType;
return this.filter(function(){return H?c.inArray(this,G)<0:this!=G})},setArray:function(G){this.length=0;
Array.prototype.push.apply(this,G);return this},map:function(G){return this.pushStack(c.map(this,function(I,H){return G.call(I,H,I)
}))},each:function(H,G){return c.each(this,H,G)},index:function(G){if(G&&G.jquery){G=G[0]
}return Array.prototype.indexOf.call(this,G)},eq:function(G){return this.slice(G,+G+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},add:function(G){return this.pushStack(c.merge(this.get(),typeof G==="string"?c(G):c.makeArray(G)).uniq())
},attr:function(H,J,I){var G=H;if(typeof H==="string"){if(J===undefined){return this[0]&&c[I||"attr"](this[0],H)
}else{G={};G[H]=J}}return this.each(function(K){for(H in G){c.attr((I)?this.style:this,H,c.prop(this,G[H],I,K,H))
}})},html:function(G){return G===undefined?(this[0]?this[0].innerHTML.replace(x,""):null):this.empty().append(G)
},andSelf:function(){return this.add(this.prevObject)},is:function(G){return !!G&&c.multiFilter(G,this).length>0
},hasClass:function(G){return Array.prototype.every.call(this,function(H){return(H.nodeType===1)&&c.className.has(H,G)
})},val:function(M){if(M===undefined){var G=this[0];if(G){if(c.nodeName(G,"option")){return(G.attributes.value||{}).specified?G.value:G.text
}if(c.nodeName(G,"select")){var K=G.selectedIndex,N=[],O=G.options,J=G.type==="select-one",I;
if(K<0){return null}var H,L=J?K+1:O.length;for(H=J?K:0;H<L;H++){I=O[H];if(I.selected){M=c(I).val();
if(J){return M}N.push(M)}}return N}return(G.value||"").replace(/\r/g,"")}return undefined
}else{if(typeof M==="number"){M+=""}this.each(function(){if(this.nodeType!==1){return
}if(SC.typeOf(M)===SC.T_ARRAY&&(/radio|checkbox/).test(this.type)){this.checked=(c.inArray(this.value,M)>=0||c.inArray(this.name,M)>=0)
}else{if(c.nodeName(this,"select")){var P=c.makeArray(M);c("option",this).each(function(){this.selected=(c.inArray(this.value,P)>=0||c.inArray(this.text,P)>=0)
});if(!P.length){this.selectedIndex=-1}}else{this.value=M}}})}return this},clone:function(){var G=this.map(function(){if(SC.browser.msie&&!c.isXMLDoc(this)){var J=this.cloneNode(true),I=document.createElement("div");
I.appendChild(J);return c.clean([I.innerHTML])[0]}else{return this.cloneNode(true)
}});var H=G.find("*").andSelf().each(function(){if(this[SC.guidKey]!==undefined){this[SC.guidKey]=null
}});return G},css:function(G,H){if((G==="width"||G==="height")&&parseFloat(H,0)<0){H=undefined
}return this.attr(G,H,"curCSS")},text:function(H){if(H!==undefined&&typeof H!=="object"&&H!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(H))
}var G="";c.each(H||this,function(){c.each(this.childNodes,function(){if(this.nodeType!==8){G+=this.nodeType!==1?this.nodeValue:c.fn.text([this])
}})});return G},show:function(){var G=SC.$.isVisible;this.each(function(){if(!G(this)){this.style.display=this.oldblock||"";
if(c.css(this,"display")==="none"){var H=c("<"+this.tagName+"/>");c("body").append(H);
this.style.display=H.css("display");if(this.style.display==="none"){this.style.display="block"
}H.remove();H=null}}});return this},hide:function(){var G=SC.$.isVisible;this.each(function(){if(G(this)){this.oldblock=this.oldblock||c.css(this,"display");
this.style.display="none"}});return this},domManip:function(I,J,H,L){var K=this.length>1,G;
return this.each(function(){if(!G){G=c.clean(I,this.ownerDocument);if(H){G.reverse()
}}var M=this;if(J&&c.nodeName(this,"table")&&c.nodeName(G[0],"tr")){M=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}c.each(G,function(){var N=K?c(this).clone(true)[0]:this;L.call(M,N)})})},append:function(){return this.domManip(arguments,true,false,function(G){if(this.nodeType===1){this.appendChild(G)
}})},prepend:function(){return this.domManip(arguments,true,true,function(G){if(this.nodeType===1){this.insertBefore(G,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(G){this.parentNode.insertBefore(G,this)
})},after:function(){return this.domManip(arguments,false,true,function(G){this.parentNode.insertBefore(G,this.nextSibling)
})},replaceWith:function(G){return this.after(G).remove()},removeData:function(G){return this.each(function(){SC.removeData(this,G)
})}});w.mixin({nodeName:function(H,G){return H.nodeName&&H.nodeName.toUpperCase()===G.toUpperCase()
},map:function(G,L){var H=[],K,I,J;for(I=0,J=G.length;I<J;I++){K=L(G[I],I);if(K!=null){H[H.length]=K
}}return H.concat.apply([],H)},each:function(I,M,H){var G,J=0,K=I.length;if(H){if(K===undefined){for(G in I){if(M.apply(I[G],H)===false){break
}}}else{for(;J<K;){if(M.apply(I[J++],H)===false){break}}}}else{if(K===undefined){for(G in I){if(M.call(I[G],G,I[G])===false){break
}}}else{for(var L=I[0];J<K&&M.call(L,J,L)!==false;L=I[++J]){}}}return I},isXMLDoc:function(G){return G.documentElement&&!G.body||G.tagName&&G.ownerDocument&&!G.ownerDocument.body
},clean:function(G,I){var H=[];I=I||document;if(typeof I.createElement=="undefined"){I=I.ownerDocument||I[0]&&I[0].ownerDocument||document
}c.each(G,function(M,O){if(typeof O==="number"){O+=""}if(!O){return}if(typeof O==="string"){O=O.replace(f,function(R,S,Q){return Q.match(q)?R:S+"></"+Q+">"
});var L=O.replace(g,"").substring(0,10).toLowerCase(),P=I.createElement("div");var N=!L.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!L.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||L.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!L.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!L.indexOf("<td")||!L.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!L.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||SC.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
P.innerHTML=N[1]+O+N[2];while(N[0]--){P=P.lastChild}if(SC.browser.msie){var K=!L.indexOf("<table")&&L.indexOf("<tbody")<0?P.firstChild&&P.firstChild.childNodes:N[1]==="<table>"&&L.indexOf("<tbody")<0?P.childNodes:[];
for(var J=K.length-1;J>=0;--J){if(c.nodeName(K[J],"tbody")&&!K[J].childNodes.length){K[J].parentNode.removeChild(K[J])
}}if(/^\s/.test(O)){P.insertBefore(I.createTextNode(O.match(/^\s*/)[0]),P.firstChild)
}}O=c.makeArray(P.childNodes)}if(O.length===0&&(!c.nodeName(O,"form")&&!c.nodeName(O,"select"))){return
}if(O[0]===undefined||c.nodeName(O,"form")||O.options){H.push(O)}else{H=c.merge(H,O)
}});return H},find:function(T,H){var O;if(typeof T!=="string"){return[T]}if(T.indexOf(",")>=0){O=T.split(",").map(function(V){return c.find(V,H)
});return O.concat.apply([],O).uniq()}if(H&&H.nodeType!==1&&H.nodeType!==9){return[]
}H=H||document;O=[H];var Q,G=YES,K=T.match(h),N=K.length,J;for(var R=0;R<N;R++){T=K[R];
if(T===" "||T===""){G=YES}else{if(G){J=o.exec(T);if((J[1]==="")&&(R<(N-1))&&(K[R+1].charAt(0)==="#")){T=K[R+1];
K[R+1]=K[R];J=o.exec(T)}var M=[],L=O.length,P,S,I=J[2],U;for(P=0;P<L;P++){S=O[P];
switch(J[1]){case"":if(!I){I="*"}if(I==="*"&&S.nodeName.toLowerCase()==="object"){I="param"
}M=c.merge(M,S.getElementsByTagName(I));break;case"#":if(S===document){U=document.getElementById(I);
if(SC.browser.msie&&U&&U.getAttribute("id")!==I){U=NO}else{if(U){M.push(U)}U=YES}}else{U=NO
}if(!U){U=S.getElementsByTagName("*");U=Array.prototype.find.call(U,function(V){return V.getAttribute&&(V.getAttribute("id")===I)
});if(U){M.push(U)}}break;case".":if(S.getElementsByClassName){M=c.merge(M,S.getElementsByClassName(I))
}else{M=c.merge(M,c.classFilter(S.getElementsByTagName("*"),I))}break;default:}}delete O;
O=M;G=NO}else{O=c.filter(T,O)}}}if(O&&O[0]==H){O.shift()}return O.uniq()},classFilter:function(L,G,K){G=" "+G+" ";
var I=[],J;for(var H=0;L[H];H++){J=(" "+L[H].className+" ").indexOf(G)>=0;if(!K&&J||K&&!J){I.push(L[H])
}}return I},filter:function(H,L,K){var G=o.exec(H),M=G[2],J=G[1],I;if(J==="."){return c.classFilter(c.makeArray(L),M,K)
}else{if(J==="#"){I=function(O){var N=O&&O.getAttribute&&(O.getAttribute("id")===M);
return(K)?!N:N}}else{I=function(O){var N=c.nodeName(O,M);return(K)?!N:N}}return Array.prototype.filter.call(c.makeArray(L),I)
}},multiFilter:function(J,G,I){J=J.indexOf(",")?J.split(","):[J];var L=J.length,K,H=[];
while(--L>=0){K=c.filter(J[L].trim(),G,I);H=I?G=K:c.merge(K,H)}return H},merge:function(J,G){var H=0,I,K=J.length;
if(SC.browser.msie){while(I=G[H++]){if(I.nodeType!==8){J[K++]=I}}}else{while(I=G[H++]){J[K++]=I
}}return J},makeArray:function(I){var G=[];if(!SC.none(I)){var H=I.length;if(H==null||typeof I==="string"||I.setInterval){G[0]=I
}else{while(H){G[--H]=I[H]}}}return G},inArray:function(G,H){return H.indexOf?H.indexOf(G):Array.prototype.indexOf.call(H,G)
},boxModel:!SC.browser.msie||document.compatMode==="CSS1Compat",props:{"for":"htmlFor","class":"className","float":C,cssFloat:C,styleFloat:C,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan"},prop:function(J,K,I,H,G){if(SC.typeOf(K)===SC.T_FUNCTION){K=K.call(J,H)
}return K&&(typeof K==="number")&&I==="curCSS"&&!a.test(G)?K+"px":K},grep:function(H,L,G){var I=[];
for(var J=0,K=H.length;J<K;J++){if(!G!=!L(H[J],J)){I.push(H[J])}}return I},className:{add:function(H,I){var G=c.className.has;
c.each((I||"").split(b),function(J,K){if(H.nodeType===1&&!G(H.className,K)){H.className+=(H.className?" ":"")+K
}})},remove:function(G,H){if(G.nodeType===1){G.className=H!==undefined?c.grep(G.className.split(b),function(I){return !c.className.has(H,I)
}).join(" "):""}},has:function(H,G){return H&&c.inArray(G,(H.className||H).toString().split(b))>-1
}},swap:function(L,K,N,M,G){var H={},J;for(J in K){H[J]=L.style[J];L.style[J]=K[J]
}var I=N(L,M,G);for(J in K){L.style[J]=H[J]}return I},css:function(I,G,J){if(G==="width"||G==="height"){var L,K=(G==="width")?n:e,H=p;
L=SC.$.isVisible(I)?B(I,G,K):c.swap(I,H,B,G,K);return Math.max(0,L)}return c.curCSS(I,G,J)
},curCSS:function(M,H,I){var R,G=M.style;if(H==="opacity"&&SC.browser.msie){R=c.attr(G,"opacity");
return R===""?"1":R}if(SC.browser.opera&&H==="display"){var S=G.outline;G.outline="0 solid black";
G.outline=S}var J=H.match(/float/i);if(J){H=C}if(!I&&G&&G[H]){R=G[H]}else{if(v.getComputedStyle){if(J){H="float"
}H=H.replace(/([A-Z])/g,"-$1").toLowerCase();var T=v.getComputedStyle(M,null);if(T&&!s(M,v)){R=T.getPropertyValue(H)
}else{var L=[],U=[],V=M,O=0,Q,N;for(;V&&s(V);V=V.parentNode){U.unshift(V)}for(N=U.length;
O<N;O++){var W=U[O];if(W&&W.style&&s(W)){L[O]=W.style.display;W.style.display="block"
}}R=(H==="display"&&L[U.length-1]!==null)?"none":(T&&T.getPropertyValue(H))||"";for(O=0,Q=L.length;
O<Q;O++){if(L[O]!==null){U[O].style.display=L[O]}}}if(H==="opacity"&&R===""){R="1"
}}else{if(M.currentStyle){R=M.currentStyle[H]||M.currentStyle[H.camelize()];if(!(/^\d+(px)?$/i).test(R)&&(/^\d/).test(R)){var K=G.left,P=M.runtimeStyle.left;
M.runtimeStyle.left=M.currentStyle.left;G.left=R||0;R=G.pixelLeft+"px";G.left=K;M.runtimeStyle.left=P
}}}}return R},dir:function(I,H){var G=[],J=I[H];while(J&&J!=document){if(J.nodeType===1){G.push(J)
}J=J[H]}return G},nth:function(K,G,I,J){G=G||1;var H=0;for(;K;K=K[I]){if(K.nodeType===1&&++H==G){break
}}return K},sibling:function(I,H){var G=[];for(;I;I=I.nextSibling){if(I.nodeType===1&&I!=H){G.push(I)
}}return G},attr:function(H,G,N){if(!H||H.nodeType===3||H.nodeType===8){return undefined
}var I=!c.isXMLDoc(H),M=N!==undefined,K=SC.browser.msie;G=I&&c.props[G]||G;if(H.tagName){var L=D.test(G);
if(G==="selected"&&H.parentNode){H.parentNode.selectedIndex}if(G in H&&I&&!L){if(M){if(G==="type"&&c.nodeName(H,"input")&&H.parentNode){throw"type property can't be changed"
}H[G]=N}if(c.nodeName(H,"form")&&H.getAttributeNode(G)){return H.getAttributeNode(G).nodeValue
}if(G==="tabIndex"){var O=H.getAttributeNode("tabIndex");return O&&O.specified?O.value:H.nodeName.match(k)?0:H.nodeName.match(/^(a|area)$/i)&&H.href?0:undefined
}return H[G]}if(K&&I&&G==="style"){return c.attr(H.style,"cssText",N)}if(M){H.setAttribute(G,""+N)
}var J=(K&&I&&L)?H.getAttribute(G,2):H.getAttribute(G);return J===null?undefined:J
}if(K&&G==="opacity"){if(M){H.zoom=1;H.filter=(H.filter||"").replace(y,"")+(parseInt(N,0)+""=="NaN"?"":"alpha(opacity="+N*100+")")
}return H.filter&&H.filter.indexOf("opacity=")>=0?(parseFloat(H.filter.match(t)[1])/100)+"":""
}G=G.camelize();if(M){H[G]=N}return H[G]}});c.fn.init.prototype=c.fn;c.each({parent:function(G){return G.parentNode
},parents:function(G){return c.dir(G,"parentNode")},next:function(G){return c.nth(G,2,"nextSibling")
},prev:function(G){return c.nth(G,2,"previousSibling")},nextAll:function(G){return c.dir(G,"nextSibling")
},prevAll:function(G){return c.dir(G,"previousSibling")},siblings:function(G){return c.sibling(G.parentNode.firstChild,G)
},children:function(G){return c.sibling(G.firstChild)},contents:function(G){return c.nodeName(G,"iframe")?G.contentDocument||G.contentWindow.document:c.makeArray(G.childNodes)
}},function(G,H){c.fn[G]=function(I){var J=c.map(this,H);if(I&&typeof I==="string"){J=c.multiFilter(I,J)
}return this.pushStack(J.uniq())}});c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(G,H){c.fn[G]=function(){var I=arguments;
return this.each(function(){for(var J=0,K=I.length;J<K;J++){c(I[J])[H](this)}})}});
c.each({removeAttr:function(G){c.attr(this,G,"");if(this.nodeType===1){this.removeAttribute(G)
}},addClass:function(G){c.className.add(this,G)},removeClass:function(G){c.className.remove(this,G)
},toggleClass:function(G){c.className[c.className.has(this,G)?"remove":"add"](this,G)
},remove:function(G){if(!G||c.filter(G,[this]).length){if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}}},function(G,H){c.fn[G]=function(){return this.each(H,arguments)
}});c.each(["Height","Width"],function(K,I){var L=I.toLowerCase(),H;c.fn[L]=function(M){if(this[0]===window){if(SC.browser.opera){H=document.body["client"+I]
}else{if(SC.browser.safari){H=window["inner"+I]}else{if(document.compatMode){H=documentElement["client"+I]
}else{H=document.body["client"+I]}}}}else{if(this[0]===document){H=Math.max(Math.max(document.body["scroll"+I],document.documentElement["scroll"+I]),Math.max(document.body["offset"+I],document.documentElement["offset"+I]))
}else{if(M===undefined){return this.length?c.css(this[0],L):null}else{return this.css(L,(typeof M==="string")?M:M+"px")
}}}return H};var G=K?"Left":"Top",J=K?"Right":"Bottom";c.fn["inner"+I]=function(){return this[I.toLowerCase()]()+m(this,"padding"+G)+m(this,"padding"+J)
};c.fn["outer"+I]=function(M){return this["inner"+I]()+m(this,"border"+G+"Width")+m(this,"border"+J+"Width")+(M?m(this,"margin"+G)+m(this,"margin"+J):0)
}});w.fn.offset=function(){var H=0,P=0,I=this[0],U=SC.browser,L;if(!I){return undefined
}function K(V){T(c.curCSS(V,"borderLeftWidth",true),c.curCSS(V,"borderTopWidth",true))
}function T(V,W){H+=parseInt(V,10)||0;P+=parseInt(W,10)||0}var R=I.parentNode,O=I,G=I.offsetParent,Q=I.ownerDocument,S=U.safari&&parseInt(U.version,0)<522&&!(/adobeair/i).test(U.userAgent),N=c.curCSS,J=c.css(I,"position")==="fixed";
if(!(U.mozilla&&I==document.body)&&I.getBoundingClientRect){var M=I.getBoundingClientRect();
T(M.left+Math.max(Q.documentElement.scrollLeft,Q.body.scrollLeft),M.top+Math.max(Q.documentElement.scrollTop,Q.body.scrollTop));
T(-Q.documentElement.clientLeft,-Q.documentElement.clientTop)}else{T(I.offsetLeft,I.offsetTop);
while(G){T(G.offsetLeft,G.offsetTop);if(U.mozilla&&!(/^t(able|d|h)$/i).test(G.tagName)||U.safari&&!S){K(G)
}if(!J&&N(G,"position")==="fixed"){J=true}O=(/^body$/i).test(G.tagName)?O:G;G=G.offsetParent
}while(R&&R.tagName&&!(i).test(R.tagName)){if(!(/^inline|table.*$/i).test(N(R,"display"))){T(-R.scrollLeft,-R.scrollTop)
}if(U.mozilla&&N(R,"overflow")!=="visible"){K(R)}R=R.parentNode}if((S&&(J||N(O,"position")==="absolute"))||(U.mozilla&&N(O,"position")!=="absolute")){T(-Q.body.offsetLeft,-Q.body.offsetTop)
}if(J){T(Math.max(Q.documentElement.scrollLeft,Q.body.scrollLeft),Math.max(Q.documentElement.scrollTop,Q.body.scrollTop))
}}L={top:P,left:H};return L};w.fn.mixin({position:function(){var K=0,J=0,H;if(this[0]){var I=this.offsetParent(),L=this.offset(),G=i.test(I[0].tagName)?{top:0,left:0}:I.offset();
L.top-=m(this,"marginTop");L.left-=m(this,"marginLeft");G.top+=m(I,"borderTopWidth");
G.left+=m(I,"borderLeftWidth");H={top:L.top-G.top,left:L.left-G.left}}return H},offsetParent:function(){var G=this[0].offsetParent||document.body;
while(G&&(!(i).test(G.tagName)&&c.css(G,"position")==="static")){G=G.offsetParent
}return c(G)}});c.each(["Left","Top"],function(H,G){var I="scroll"+G;c.fn[I]=function(J){if(!this[0]){return
}return J!==undefined?this.each(function(){this==window||this==document?window.scrollTo(!H?J:c(window).scrollLeft(),H?J:c(window).scrollTop()):this[I]=J
}):this[0]==window||this[0]==document?self[H?"pageYOffset":"pageXOffset"]||c.boxModel&&document.documentElement[I]||document.body[I]:this[0][I]
}});return w}());SC.$=(typeof jQuery=="undefined")?SC.CoreQuery:jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var c=[],b=this.length,a=0;
for(a=0;a<b;a++){c[a]="%@: %@".fmt(a,this[a]?this[a].toString():"(null)")}return"<$:%@>(%@)".fmt(SC.guidFor(this),c.join(" , "))
},isVisible:function(){return Array.prototype.every.call(this,function(a){return SC.$.isVisible(a)
})},first:function(){return this.pushStack([this[0]])},last:function(){return this.pushStack([this[this.length-1]])
},view:function(){return this.map(function(){var b=null,a=SC.viewKey,e=this,c;while(!b&&e&&(e!==document)){if(e.nodeType===1&&(c=e.getAttribute("id"))){b=SC.View.views[c]
}e=e.parentNode}e=null;return b})},setClass:function(e,c){if(SC.none(e)){return this
}var f=SC.typeOf(e)!==SC.T_STRING,a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var i=this.className.split(/\s+/),h=NO;if(f){for(var g in e){if(!e.hasOwnProperty(g)){continue
}h=a(i,g,e[g])||h}}else{h=a(i,e,c)}if(h){this.className=i.join(" ")}});return this
},_fixupClass:function(e,a,c){var b=e.indexOf(a);if(c){if(b<0){e.push(a);return YES
}}else{if(b>=0){e[b]=null;return YES}}return NO},within:function(f){f=SC.$(f);var e,c,h,b,a=f.length,g=this.length;
while(!e&&(--g>=0)){h=this[g];for(b=0;!e&&(b<a);b++){c=f[b];while(c&&(c!==h)){c=c.parentNode
}e=c===h}}h=c=null;return e}});(function(){var c={},g={find:function(j,i){return(i!==undefined)?SC.Enumerable.find.call(this,j,i):c.find.call(this,j)
},filter:function(j,i){return(i!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,j,i)):c.filter.call(this,j)
},filterProperty:function(i,j){return this.pushStack(SC.Enumerable.filterProperty.call(this,i,j))
},indexOf:SC.$.index,map:function(j,i){return(i!==undefined)?SC.Enumerable.map.call(this,j,i):c.map.call(this,j)
}};var h=SC.$.jquery==="SC.CoreQuery",e=SC.$.fn,a=h?g:SC.Enumerable,f;for(var b in a){if(!a.hasOwnProperty(b)){continue
}f=a[b];if(b in g){c[b]=e[b];f=g[b]}e[b]=f}})();SC.mixin(SC.$,{isVisible:function(a){var b=SC.$;
return("hidden"!=a.type)&&(b.css(a,"display")!="none")&&(b.css(a,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(a){if(a){this.originalEvent=a;
var g=SC.Event._props,e=g.length,i=e,j;while(--i>=0){j=g[i];this[j]=a[j]}}this.timeStamp=this.timeStamp||Date.now();
if(!this.target){this.target=this.srcElement||document}if(this.target.nodeType===3){this.target=this.target.parentNode
}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var h=document.documentElement,c=document.body;
this.pageX=this.clientX+(h&&h.scrollLeft||c&&c.scrollLeft||0)-(h.clientLeft||0);this.pageY=this.clientY+(h&&h.scrollTop||c&&c.scrollTop||0)-(h.clientTop||0)
}if(!this.which&&((this.charCode||a.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(this.type==="mousewheel"||this.type==="DOMMouseScroll"){var b=1,f=parseFloat(SC.browser.version);
if(SC.browser.safari&&a.wheelDelta!==undefined){this.wheelDelta=0-(a.wheelDeltaY||a.wheelDeltaX);
this.wheelDeltaY=0-(a.wheelDeltaY||0);this.wheelDeltaX=0-(a.wheelDeltaX||0);if(f>=533.17&&f<=533.19){b=0.004
}else{if(f<533||f>=534){b=40}}}else{if(!SC.none(a.detail)){b=10;if(a.axis&&(a.axis===a.HORIZONTAL_AXIS)){this.wheelDeltaX=a.detail;
this.wheelDeltaY=this.wheelDelta=0}else{this.wheelDeltaY=this.wheelDelta=a.detail;
this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-a.wheelDelta:a.wheelDelta;
this.wheelDeltaX=0}}this.wheelDelta*=b;this.wheelDeltaX*=b;this.wheelDeltaY*=b}return this
};SC.mixin(SC.Event,{create:function(a){return new SC.Event(a)},add:function(f,e,g,h,c){if(f&&f.isCoreQuery){if(f.length>0){f.forEach(function(i){this.add(i,e,g,h,c)
},this);return this}else{f=f[0]}}if(!f){return this}if(f.nodeType===3||f.nodeType===8){return SC.Event
}if(SC.browser.msie&&f.setInterval){f=window}if(SC.typeOf(g)===SC.T_FUNCTION){c=h;
h=g;g=null}else{if(g&&SC.typeOf(h)===SC.T_STRING){h=g[h]}}var b=SC.data(f,"events")||SC.data(f,"events",{}),a=b[e];
if(!a){a=b[e]={};this._addEventListener(f,e)}a[SC.hashFor(g,h)]=[g,h,c];SC.Event._global[e]=YES;
f=b=a=null;return this},remove:function(g,f,h,i){if(g&&g.isCoreQuery){if(g.length>0){g.forEach(function(j){this.remove(j,f,h,i)
},this);return this}else{g=g[0]}}if(!g){return this}if(g.nodeType===3||g.nodeType===8){return SC.Event
}if(SC.browser.msie&&g.setInterval){g=window}var a,e,c=SC.data(g,"events");if(!c){return this
}if(f===undefined){for(f in c){this.remove(g,f)}}else{if(a=c[f]){var b=NO;if(h||i){if(SC.typeOf(h)===SC.T_FUNCTION){i=h;
h=null}else{if(SC.typeOf(i)===SC.T_STRING){i=h[i]}}delete a[SC.hashFor(h,i)];e=null;
for(e in a){break}if(e===null){b=YES}}else{b=YES}if(b){delete c[f];this._removeEventListener(g,f)
}e=null;for(e in c){break}if(!e){SC.removeData(g,"events");delete this._elements[SC.guidFor(g)]
}}}g=c=a=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(e,c,b){var a=SC.Event.create({type:c,target:e,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(c)<0),cancelled:NO,normalized:YES});
if(b){SC.mixin(a,b)}return a},trigger:function(c,b,j,k){if(c&&c.isCoreQuery){if(c.length>0){c.forEach(function(n){this.trigger(n,b,j,k)
},this);return this}else{c=c[0]}}if(!c){return this}if(c.nodeType===3||c.nodeType===8){return undefined
}j=SC.A(j);var i,l=SC.typeOf(c[b]||null)===SC.T_FUNCTION,a,h,f,m;a=j[0];if(!a||!a.preventDefault){a=this.simulateEvent(c,b);
j.unshift(a)}a.type=b;h=c;do{i=SC.Event.handle.apply(h,j);h=(h===document)?null:(h.parentNode||document)
}while(!i&&a.bubbles&&h);h=null;f=c["on"+b];m=SC.CoreQuery.nodeName(c,"a")&&b==="click";
if((!l||m)&&f&&f.apply(c,j)===NO){i=NO}if(l&&k!==NO&&i!==NO&&!m){this.triggered=YES;
try{c[b]()}catch(g){}}this.triggered=NO;return i},handle:function(b){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var c,h,f,j,e,i,k,l,a,g;i=SC.A(arguments);i[0]=b=SC.Event.normalizeEvent(b||window.event);
e=(SC.data(this,"events")||{})[b.type];if(!e){return NO}for(k in e){l=e[k];a=l[1];
b.handler=a;b.data=b.context=l[2];g=l[0]||this;h=a.apply(g,i);if(c!==NO){c=h}if(h===NO){b.preventDefault();
b.stopPropagation()}}return c},unload:function(){var a,b=this._elements;for(a in b){this.remove(b[a])
}for(a in b){delete b[a]}delete this._elements},special:{ready:{setup:function(){SC._bindReady();
return},teardown:function(){return}},mouseenter:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseover",SC.Event.special.mouseenter.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseover",SC.Event.special.mouseenter.handler);return YES
},handler:function(a){if(SC.Event._withinElement(a,this)){return YES}a.type="mouseenter";
return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(e,c){var b=e.relatedTarget;
while(b&&b!=c){try{b=b.parentNode}catch(a){b=c}}return b===c},_addEventListener:function(e,c){var f,b=this.special[c];
if(!b||b.setup.call(e)===NO){var a=SC.guidFor(e);this._elements[a]=e;f=SC.data(e,"listener")||SC.data(e,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[a],arguments)
});if(e.addEventListener){e.addEventListener(c,f,NO)}else{if(e.attachEvent){e.attachEvent("on"+c,f)
}}}e=b=f=null},_removeEventListener:function(c,b){var e,a=SC.Event.special[b];if(!a||(a.teardown.call(c)===NO)){e=SC.data(c,"listener");
if(e){if(c.removeEventListener){c.removeEventListener(b,e,NO)}else{if(c.detachEvent){c.detachEvent("on"+b,e)
}}}}c=a=e=null},_elements:{},normalizeEvent:function(a){if(a===window.event){return SC.Event.create(a)
}else{return a.normalized?a:SC.Event.create(a)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches animationName elapsedTime".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,touchesForView:function(a){if(this.touchContext){return this.touchContext.touchesForView(a)
}},averagedTouchesForView:function(a){if(this.touchContext){return this.touchContext.averagedTouchesForView(a)
}return null},allowDefault:function(){this.hasCustomEventHandling=YES;return this
},preventDefault:function(){var a=this.originalEvent;if(a){if(a.preventDefault){a.preventDefault()
}a.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var a=this.originalEvent;
if(a){if(a.stopPropagation){a.stopPropagation()}a.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){if(SC.browser.msie){if(this.keyCode==8||this.keyCode==9||(this.keyCode>=37&&this.keyCode<=40)){return String.fromCharCode(0)
}else{return(this.keyCode>0)?String.fromCharCode(this.keyCode):null}}else{return(this.charCode>0)?String.fromCharCode(this.charCode):null
}},commandCodes:function(){var f=this.keyCode,b=null,c=null,a="",e;if(f){b=SC.FUNCTION_KEYS[f];
if(!b&&(this.altKey||this.ctrlKey||this.metaKey)){b=SC.PRINTABLE_KEYS[f]}if(b){if(this.altKey){a+="alt_"
}if(this.ctrlKey||this.metaKey){a+="ctrl_"}if(this.shiftKey){a+="shift_"}}}if(!b){f=this.which;
c=b=String.fromCharCode(f);e=b.toLowerCase();if(this.metaKey){a="meta_";b=e}else{b=null
}}if(b){b=a+b}return[b,c]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;if(SC.browser.msie){SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload)
}SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("cursorStyle")||SC.DEFAULT_CURSOR,c=this.constructor.sharedStyleSheet(),b=SC.guidFor(this);
if(c.insertRule){c.insertRule("."+b+" {cursor: "+a+";}",c.cssRules?c.cssRules.length:0)
}else{if(c.addRule){c.addRule("."+b,"cursor: "+a)}}this.cursorStyle=a;this.className=b;
return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var e,g,c,f,h,b,a;
e=this.get("cursorStyle")||SC.DEFAULT_CURSOR;g=this._rule;if(g){g.style.cursor=e;
return}c="."+this.get("className");f=this.constructor.sharedStyleSheet();h=(f.cssRules?f.cssRules:f.rules)||[];
for(b=0,a=h.length;b<a;++b){g=h[b];if(g.selectorText===c){this._rule=g;g.style.cursor=e;
break}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var b,a=this._styleSheet;
if(!a){a=document.createElement("style");a.type="text/css";b=document.getElementsByTagName("head")[0];
if(!b){b=document.documentElement}b.appendChild(a);a=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=a}return a};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomingFirstResponder:NO,becomeFirstResponder:function(){var a=this.get("pane")||this.get("responderContext")||this.pane();
if(a&&this.get("acceptsFirstResponder")){if(a.get("firstResponder")!==this){a.makeFirstResponder(this)
}}return this},resignFirstResponder:function(a){var b=this.get("pane")||this.get("responderContext");
if(b&&(b.get("firstResponder")===this)){b.makeFirstResponder(null,a)}return YES},willLoseFirstResponder:function(a){},didBecomeFirstResponder:function(a){}});
sc_require("system/browser");sc_require("system/event");sc_require("system/cursor");
sc_require("system/responder");sc_require("mixins/string");SC.viewKey=SC.guidKey+"_view";
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};
SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};SC.ANCHOR_RIGHT={right:0};
SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.CONTEXT_MENU_ENABLED=YES;
SC.TABBING_ONLY_INSIDE_DOCUMENT=YES;SC.EMPTY_CHILD_VIEWS_ARRAY=[];SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;
SC.View=SC.Responder.extend(SC.DelegateSupport,{concatenatedProperties:"outlets displayProperties layoutProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var a=this;
while(a&&!a.isPane){a=a.get("parentView")}return a}.property("parentView").cacheable(),page:null,splitView:function(){var a=this;
while(a&&!a.isSplitView){a=a.get("parentView")}return a}.property("parentView").cacheable(),parentView:null,backgroundColor:null,useStaticLayout:NO,isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var a=this.get("isEnabled"),b;
if(a&&(b=this.get("parentView"))){a=b.get("isEnabledInPane")}return a}.property("parentView","isEnabled"),_sc_view_isEnabledDidChange:function(){if(!this.get("isEnabled")&&this.get("isFirstResponder")){this.resignFirstResponder()
}}.observes("isEnabled"),isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:NO,isContextMenuEnabled:function(){return SC.CONTEXT_MENU_ENABLED
}.property(),recomputeIsVisibleInWindow:function(c){var f=this.get("isVisibleInWindow"),h=this.get("isVisible"),e;
if(h){if(c===undefined){e=this.get("parentView");c=e?e.get("isVisibleInWindow"):NO
}h=h&&c}if(f!==h){this.set("isVisibleInWindow",h);var g=this.get("childViews"),b=g.length,a;
for(a=0;a<b;a++){g[a].recomputeIsVisibleInWindow(h)}if(h){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isFirstResponder")){this.resignFirstResponder()}}}this.updateLayerIfNeeded(YES);
return this},_sc_isVisibleDidChange:function(){this.displayDidChange();this.recomputeIsVisibleInWindow()
}.observes("isVisible"),childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,insertBefore:function(b,e){b.beginPropertyChanges();
if(b.get("parentView")){b.removeFromParent()}if(this.willAddChild){this.willAddChild(b,e)
}if(b.willAddToParent){b.willAddToParent(this,e)}b.set("parentView",this);var a,c=this.get("childViews");
if(c.needsClone){this.set(c=[])}a=(e)?c.indexOf(e):c.length;if(a<0){a=c.length}c.insertAt(a,b);
b.parentViewDidChange();b.layoutDidChange();var f=b.get("pane");if(f&&f.get("isPaneAttached")){b._notifyDidAppendToDocument()
}if(this.didAddChild){this.didAddChild(b,e)}if(b.didAddToParent){b.didAddToParent(this,e)
}b.endPropertyChanges();return this},removeChild:function(b){if(!b){return this}if(b.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,b)
}if(b.willRemoveFromParent){b.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(b)
}b.set("parentView",null);var c=this.get("childViews"),a=c.indexOf(b);if(a>=0){c.removeAt(a)
}b.parentViewDidChange();if(this.didRemoveChild){this.didRemoveChild(b)}if(b.didRemoveFromParent){b.didRemoveFromParent(this)
}return this},removeAllChildren:function(){var b=this.get("childViews"),a;while(a=b.objectAt(b.get("length")-1)){this.removeChild(a)
}return this},removeFromParent:function(){var a=this.get("parentView");if(a){a.removeChild(this)
}return this},replaceChild:function(a,b){a.beginPropertyChanges();b.beginPropertyChanges();
this.beginPropertyChanges();this.insertBefore(a,b).removeChild(b);this.endPropertyChanges();
b.endPropertyChanges();a.endPropertyChanges();return this},replaceAllChildren:function(c){var b=c.get("length"),a;
this.beginPropertyChanges();this.destroyLayer().removeAllChildren();for(a=0;a<b;a++){this.appendChild(c.objectAt(a))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(a){return this.insertBefore(a,null)
},parentViewDidChange:function(){this.recomputeIsVisibleInWindow();this.set("layerLocationNeedsUpdate",YES);
this.invokeOnce(this.updateLayerLocationIfNeeded);this._invalidatePaneCacheForSelfAndAllChildViews();
return this},_invalidatePaneCacheForSelfAndAllChildViews:function(){var e,c=this.get("childViews"),b=c.length,a;
this.notifyPropertyChange("pane");for(a=0;a<b;++a){e=c[a];if(e._invalidatePaneCacheForSelfAndAllChildViews){e._invalidatePaneCacheForSelfAndAllChildViews()
}}},layer:function(a,c){if(c!==undefined){this._view_layer=c}else{c=this._view_layer;
if(!c){var b=this.get("parentView");if(b){b=b.get("layer")}if(b){this._view_layer=c=this.findLayerInParentLayer(b)
}b=null}}return c}.property("isVisibleInWindow").cacheable(),$:function(c){var a,b=this.get("layer");
a=!b?SC.$([]):(c===undefined)?SC.$(b):SC.$(c,b);b=null;return a},containerLayer:function(){return this.get("layer")
}.property("layer").cacheable(),layerId:function(a,b){if(b){this._layerId=b}if(this._layerId){return this._layerId
}return SC.guidFor(this)}.property().cacheable(),_lastLayerId:null,layerIdDidChange:function(){var a=this.get("layer"),b=this.get("layerId"),c=this._lastLayerId;
if(b!==c){if(c&&SC.View.views[c]===this){delete SC.View.views[c]}this._lastLayerId=b;
SC.View.views[b]=this;if(a){a.id=b}}}.observes("layerId"),findLayerInParentLayer:function(f){var g=this.get("layerId"),c,j,b,k,e,h;
e=document.getElementById(g);if(SC.browser.msie&&e&&e.id!==g){e=null}if(!e){e=f.firstChild;
var a=[];a.push(f);while(a.length!==0){c=a.shift();if(c.id===g){return c}k=c.childNodes;
for(j=0,b=k.length;j<b;++j){a.push(k[j])}}e=null}return e},isDescendantOf:function(a){var b=this.get("parentView");
if(this===a){return YES}else{if(b){return b.isDescendantOf(a)}else{return NO}}},displayDidChange:function(){this.set("layerNeedsUpdate",YES);
return this},layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(b){var c=this.get("layerNeedsUpdate"),a=c&&(b||this.get("isVisibleInWindow"));
if(a){if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}return this},updateLayer:function(){var a=this.renderContext(this.get("layer"));
this.prepareContext(a,NO);a.update();if(a._innerHTMLReplaced){var b=this.get("pane");
if(b&&b.get("isPaneAttached")){this._notifyDidAppendToDocument()}}if(this.useStaticLayout){this.viewDidResize()
}if(this.didUpdateLayer){this.didUpdateLayer()}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},renderContext:function(a){return SC.RenderContext(a)},createLayer:function(){if(this.get("layer")){return this
}var a=this.renderContext(this.get("tagName"));this.prepareContext(a,YES);this.set("layer",a.element());
this._notifyDidCreateLayer();return this},_notifyDidCreateLayer:function(){if(this.didCreateLayer){this.didCreateLayer()
}var c=this.didCreateLayerMixin,b,a,e=this.get("childViews"),f;if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=e.length;for(a=0;a<b;++a){f=e[a];if(!f){continue}f.notifyPropertyChange("layer");
f._notifyDidCreateLayer()}},destroyLayer:function(){var a=this.get("layer");if(a){this._notifyWillDestroyLayer();
if(a.parentNode){a.parentNode.removeChild(a)}a=null}return this},replaceLayer:function(){this.destroyLayer();
this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded)
},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var c=this.willDestroyLayerMixin,b,a,e=this.get("childViews");if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=e.length;for(a=0;a<b;++a){e[a]._notifyWillDestroyLayer()
}this.set("layer",null)},prepareContext:function(c,b){var f,g,h,e,j,i,a;if(b){e=this.layerId?this.get("layerId"):SC.guidFor(this);
c.id(e).classNames(this.get("classNames"),YES);this.renderLayout(c,b)}else{c.resetClassNames();
c.classNames(this.get("classNames"),YES)}a=[];if(this.get("isTextSelectable")){a.push("allow-select")
}if(!this.get("isEnabled")){a.push("disabled")}if(!this.get("isVisible")){a.push("hidden")
}if(this.get("isFirstResponder")){a.push("focus")}if(this.get("useStaticLayout")){a.push("sc-static-layout")
}j=this.get("backgroundColor");if(j){c.addStyle("backgroundColor",j)}i=this.get("cursor");
if(!i&&this.get("shouldInheritCursor")){i=this.getPath("parentView.cursor")}if(SC.typeOf(i)===SC.T_STRING){i=SC.objectForPropertyPath(i)
}if(i instanceof SC.Cursor){a.push(i.get("className"))}c.addClass(a);this.beginPropertyChanges();
this.set("layerNeedsUpdate",NO);this.render(c,b);if(f=this.renderMixin){g=f.length;
for(h=0;h<g;++h){f[h].call(this,c,b)}}this.endPropertyChanges()},renderChildViews:function(f,g){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c){continue}f=f.begin(c.get("tagName"));c.prepareContext(f,g);
f=f.end()}return f},render:function(a,b){if(b){this.renderChildViews(a,b)}},_notifyDidAppendToDocument:function(){if(this.didAppendToDocument){this.didAppendToDocument()
}var c=0,e,a,b=this.get("childViews");for(c=0,a=b.length;c<a;c++){e=b[c];if(e._notifyDidAppendToDocument){e._notifyDidAppendToDocument()
}}},childViewsObserver:function(){var c=this.get("childViews"),b,a,e;for(b=0,a=c.length;
b<a;b++){e=c[b];if(e._notifyDidAppendToDocument){e._notifyDidAppendToDocument()}}}.observes("childViews"),tagName:"div",classNames:["sc-view"],toolTip:null,isTextSelectable:NO,displayProperties:["isFirstResponder"],cursor:null,shouldInheritCursor:YES,layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(a){if(this.get("layerLocationNeedsUpdate")){this.updateLayerLocation()
}return this},updateLayerLocation:function(){var f=this.get("layer"),e=this.get("parentView"),b=e?e.get("containerLayer"):null;
if(f&&f.parentNode&&f.parentNode!==b){f.parentNode.removeChild(f)}if(!e){if(f&&f.parentNode){f.parentNode.removeChild(f)
}}else{if(!b){if(f){if(f.parentNode){f.parentNode.removeChild(f)}this.destroyLayer()
}}else{if(!f){this.createLayer();f=this.get("layer");if(!f){return}}var g=e.get("childViews"),c=g.objectAt(g.indexOf(this)+1),a=(c)?c.get("layer"):null;
if(c&&(!a||a.parentNode!==b)){c.updateLayerLocationIfNeeded();a=c.get("layer")}if((f.parentNode!==b)||(f.nextSibling!==a)){b.insertBefore(f,a)
}}}b=e=f=a=null;this.set("layerLocationNeedsUpdate",NO);return this},nextResponder:function(){return this.get("parentView")
}.property("parentView").cacheable(),acceptsFirstResponder:NO,isKeyResponder:NO,willLoseKeyResponderTo:function(a){},willBecomeKeyResponderFrom:function(a){},didLoseKeyResponderTo:function(a){},didBecomeKeyResponderFrom:function(a){},interpretKeyEvents:function(b){var a=b.commandCodes(),e=a[0],f=a[1],h;
if(!e&&!f){return null}if(e){var i=SC.MODIFIED_KEY_BINDINGS[e]||SC.BASE_KEY_BINDINGS[e.match(/[^_]+$/)[0]];
if(i){var g=this,c=this.get("pane"),j=null;while(g&&!(j=g.tryToPerform(i,b))){g=(g===c)?null:g.get("nextResponder")
}return j}}if(f&&this.respondsTo("insertText")){h=this.insertText(f,b);return h?(h===YES?this:h):null
}return null},insertText:function(a){return NO},performKeyEquivalent:function(f,c){var e=NO,g=this.get("childViews"),b=g.length,a=-1;
while(!e&&(++a<b)){e=g[a].performKeyEquivalent(f,c)}return e},nextKeyView:null,nextValidKeyView:function(){var a=[],c=this.get("pane"),b=this.get("nextKeyView");
if(!b){b=c._computeNextValidKeyView(this,a)}if(SC.TABBING_ONLY_INSIDE_DOCUMENT&&!b){b=c._computeNextValidKeyView(c,a)
}return b}.property("nextKeyView"),_computeNextValidKeyView:function(h,b){var c=this.get("nextKeyView"),f,e,a,g;
if(this!==h&&b.indexOf(h)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}b.push(this);if(!c){f=this.get("childViews");for(e=0,a=f.length;e<a;e++){g=f[e];
if(g.get("isVisibleInWindow")&&g.get("isVisible")){c=g._computeNextValidKeyView(h,b)
}if(c){return c}}c=null}return c},previousKeyView:null,previousValidKeyView:function(){var a=[],c=this.pane(),b=this.get("previousKeyView");
if(!b){b=c._computePreviousValidKeyView(this,a)}return b}.property("previousKeyView"),_computePreviousValidKeyView:function(g,a){var b=this.get("previousKeyView"),e,c,f;
if(this!==g&&a.indexOf(g)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}a.push(this);if(!b){e=this.get("childViews");for(c=e.length-1;0<=c;c--){f=e[c];if(f.get("isVisibleInWindow")&&f.get("isVisible")){b=f._computePreviousValidKeyView(g,a)
}if(b){return b}}b=null}return b},init:function(){var f,h,c,b,a,e,i;arguments.callee.base.apply(this,arguments);
SC.View.views[this.get("layerId")]=this;var g=this.get("childViews");this.childViews=g?g.slice():[];
this.createChildViews();i=this.get("displayProperties");b=i.length;while(--b>=0){this.addObserver(i[b],this,this.displayDidChange)
}if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)
}},awake:function(){arguments.callee.base.apply(this,arguments);var c=this.get("childViews"),b=c.length,a;
for(a=0;a<b;++a){if(!c[a]){continue}c[a].awake()}},destroy:function(){if(this.get("isDestroyed")){return this
}this._destroy();this.removeFromParent();if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)}arguments.callee.base.apply(this,arguments);
return this},_destroy:function(){if(this.get("isDestroyed")){return this}this.destroyLayer();
var c=this.get("childViews"),b=c.length,a;if(b){c=c.slice();for(a=0;a<b;++a){c[a].destroy()
}}delete SC.View.views[this.get("layerId")];delete this._CQ;delete this.page;return this
},createChildViews:function(){var g=this.get("childViews"),b=g.length,a,f,e,c;this.beginPropertyChanges();
for(a=0;a<b;++a){if(f=(c=g[a])){if(typeof f===SC.T_STRING){c=this[f]}else{f=null}if(!c){console.error("No view with name "+f+" has been found in "+this.toString());
continue}if(c.isClass){c=this.createChildView(c);if(f){this[f]=c}}}g[a]=c}this.endPropertyChanges();
return this},createChildView:function(a,b){if(!b){b={}}b.owner=b.parentView=this;
b.isVisibleInWindow=this.get("isVisibleInWindow");if(!b.page){b.page=this.page}a=a.create(b);
return a},propertyDidChange:function(b,e,c){var a=false;if(typeof this.layout==="function"&&this._kvo_dependents){var f=this._kvo_dependents[b];
if(f&&f.indexOf("layout")!=-1){a=true}}if(b==="layout"||a){this.layoutDidChange()
}arguments.callee.base.apply(this,arguments)},adjust:function(a,e){var b=SC.clone(this.get("layout")),c=NO,g;
if(a===undefined){return this}if(SC.typeOf(a)===SC.T_STRING){g=b[a];if(SC.none(e)){if(g!==undefined){c=YES
}delete b[a]}else{if(g!==e){c=YES}b[a]=e}}else{var f=a;for(a in f){if(!f.hasOwnProperty(a)){continue
}e=f[a];g=b[a];if(e===null){if(g!==undefined){c=YES}delete b[a]}else{if(e!==undefined){if(g!==e){c=YES
}b[a]=e}}}}if(c){this.set("layout",b)}return this},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(j,e){var c=0,b=0,h=0,g=0,a=this,i;
while(a){i=a.get("frame");c+=i.x;b+=i.y;a=a.get("layoutView")}if(e){a=e;while(a){i=a.get("frame");
h+=i.x;g+=i.y;a=a.get("layoutView")}}c=j.x+c-h;b=j.y+b-g;return{x:c,y:b,width:j.width,height:j.height}
},convertFrameFromView:function(j,e){var c=0,b=0,h=0,g=0,a=this,i;while(a&&(i=a.get("frame"))){c+=i.x;
b+=i.y;a=a.get("parentView")}if(e){a=e;while(a){i=a.get("frame");h+=i.x;g+=i.y;a=a.get("parentView")
}}c=j.x-c+h;b=j.y-b+g;return{x:c,y:b,width:j.width,height:j.height}},scrollToVisible:function(){var a=this.get("parentView");
while(a&&!a.get("isScrollable")){a=a.get("parentView")}if(a){a.scrollToVisible();
return a.scrollToVisible(this)}else{return NO}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("useStaticLayout").cacheable(),computeFrameWithParentFrame:function(i){var t=this.get("layout"),s={},p,w,o=SC.LAYOUT_AUTO,q=this.get("useStaticLayout"),n=this.get("parentView"),j,e,m,b,a=t.right,c=t.left,v=t.top,h=t.bottom,u=t.width,g=t.height,l=t.centerX,k=t.centerY;
if(u!==undefined&&u===SC.LAYOUT_AUTO&&q!==undefined&&!q){p=SC.Error.desc(("%@.layout() cannot use width:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
console.error(p.toString());throw p}if(g!==undefined&&g===SC.LAYOUT_AUTO&&q!==undefined&&!q){p=SC.Error.desc(("%@.layout() cannot use height:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
console.error(p.toString());throw p}if(q){if(w=this.get("layer")){s=SC.viewportOffset(w);
if(n){s=n.convertFrameFromView(s,null)}s.width=w.offsetWidth;s.height=w.offsetHeight;
return s}return null}if(!i){i=this.computeParentDimensions(t)}j=i.height;e=i.width;
if(!SC.none(c)){if(SC.isPercentage(c)){s.x=e*c}else{s.x=c}if(u!==undefined){if(u===o){s.width=o
}else{if(SC.isPercentage(u)){s.width=e*u}else{s.width=u}}}else{s.width=e-s.x;if(a&&SC.isPercentage(a)){s.width=s.width-(a*e)
}else{s.width=s.width-(a||0)}}}else{if(!SC.none(a)){if(SC.none(u)){if(SC.isPercentage(a)){s.width=e-(e*a)
}else{s.width=e-a}s.x=0}else{if(u===o){s.width=o}else{if(SC.isPercentage(u)){s.width=e*u
}else{s.width=(u||0)}}if(SC.isPercentage(u)){s.x=e-(a*e)-s.width}else{s.x=e-a-s.width
}}}else{if(!SC.none(l)){if(u===o){s.width=o}else{if(SC.isPercentage(u)){s.width=u*e
}else{s.width=(u||0)}}if(SC.isPercentage(l)){s.x=(e-s.width)/2+(l*e)}else{s.x=(e-s.width)/2+l
}}else{s.x=0;if(SC.none(u)){s.width=e}else{if(u===o){s.width=o}if(SC.isPercentage(u)){s.width=u*e
}else{s.width=(u||0)}}}}}if(!SC.none(v)){if(SC.isPercentage(v)){s.y=v*j}else{s.y=v
}if(g!==undefined){if(g===o){s.height=o}else{if(SC.isPercentage(g)){s.height=g*j}else{s.height=g
}}}else{if(h&&SC.isPercentage(h)){s.height=j-s.y-(h*j)}else{s.height=j-s.y-(h||0)
}}}else{if(!SC.none(h)){if(SC.none(g)){if(SC.isPercentage(h)){s.height=j-(h*j)}else{s.height=j-h
}s.y=0}else{if(g===o){s.height=o}if(g&&SC.isPercentage(g)){s.height=g*j}else{s.height=(g||0)
}if(SC.isPercentage(h)){s.y=j-(h*j)-s.height}else{s.y=j-h-s.height}}}else{if(!SC.none(k)){if(g===o){s.height=o
}if(g&&SC.isPercentage(g)){s.height=g*j}else{s.height=(g||0)}if(SC.isPercentage(k)){s.y=(j-s.height)/2+(k*j)
}else{s.y=(j-s.height)/2+k}}else{s.y=0;if(SC.none(g)){s.height=j}else{if(g===o){s.height=o
}if(SC.isPercentage(g)){s.height=g*j}else{s.height=g||0}}}}}s.x=Math.floor(s.x);s.y=Math.floor(s.y);
if(s.height!==o){s.height=Math.floor(s.height)}if(s.width!==o){s.width=Math.floor(s.width)
}if(s.height===o||s.width===o){w=this.get("layer");if(s.height===o){s.height=w?w.clientHeight:0
}if(s.width===o){s.width=w?w.clientWidth:0}}if(this.get("hasBorder")){m=this.get("borderTop");
b=this.get("borderLeft");s.height-=m+this.get("borderBottom");s.y+=m;s.width-=b+this.get("borderRight");
s.x+=b}if(n&&n.isScrollContainer){n=n.get("parentView");s.x-=n.get("horizontalScrollOffset");
s.y-=n.get("verticalScrollOffset")}if(!SC.none(t.maxHeight)&&(s.height>t.maxHeight)){s.height=t.maxHeight
}if(!SC.none(t.minHeight)&&(s.height<t.minHeight)){s.height=t.minHeight}if(!SC.none(t.maxWidth)&&(s.width>t.maxWidth)){s.width=t.maxWidth
}if(!SC.none(t.minWidth)&&(s.width<t.minWidth)){s.width=t.minWidth}if(s.height<0){s.height=0
}if(s.width<0){s.width=0}return s},computeParentDimensions:function(g){var b,c=this.get("parentView"),a=(c)?c.get("frame"):null;
if(a){b={width:a.width,height:a.height}}else{var e=g||{};b={width:(e.left||0)+(e.width||0)+(e.right||0),height:(e.top||0)+(e.height||0)+(e.bottom||0)}
}return b},clippingFrame:function(){var e=this.get("frame"),a=e,b,c;if(!e){return null
}b=this.get("parentView");if(b){c=b.get("contentClippingFrame");if(!c){return e}a=SC.intersectRects(c,e)
}a.x-=e.x;a.y-=e.y;return a}.property("parentView","frame").cacheable(),contentClippingFrame:function(){return this.get("clippingFrame")
}.property("clippingFrame").cacheable(),_sc_view_clippingFrameDidChange:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c.hasStaticLayout){c.notifyPropertyChange("clippingFrame");
c._sc_view_clippingFrameDidChange()}}},parentViewDidResize:function(){var b,c,e,a,f;
if(this.useStaticLayout){b=YES}else{c=this.get("layout");e=((c.left!==undefined)&&(c.top!==undefined)&&(c.width!==undefined)&&(c.height!==undefined));
if(e){a=SC.isPercentage;f=(a(c.left)||a(c.top)||a(c.width)||a(c.right)||a(c.centerX)||a(c.centerY))
}b=(!e||f)}if(b){this.viewDidResize()}},viewDidResize:function(){this._viewFrameDidChange();
var e=this.childViews,b=e.length,a,c;for(a=0;a<b;++a){c=e[a];c.parentViewDidResize()
}},_viewFrameDidChange:function(){this.notifyPropertyChange("frame");this._sc_view_clippingFrameDidChange()
},beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var e=this.get("childViews"),b=e.length,a,c;for(a=0;a<b;++a){c=e[a];if(c.beginLiveResize){c.beginLiveResize()
}}return this},endLiveResize:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=b-1;a>=0;--a){c=e[a];if(c.endLiveResize){c.endLiveResize()}}if(this.didEndLiveResize){this.didEndLiveResize()
}return this},wantsAcceleratedLayer:NO,hasAcceleratedLayer:function(){return this.get("wantsAcceleratedLayer")&&SC.platform.supportsAcceleratedLayers
}.property("wantsAcceleratedLayer").cacheable(),layoutStyle:function(){var w=this.get("layout"),A={},k=null,t,p=SC.LAYOUT_AUTO,q=SC._VIEW_DEFAULT_DIMS,j=q.length,l,s,B,u=this.get("useStaticLayout"),a=w.right,f=w.left,z=w.top,h=w.bottom,y=w.width,g=w.height,c=w.maxWidth,i=w.maxHeight,o=w.centerX,n=w.centerY,e=this.get("hasAcceleratedLayer"),b=0,v=0;
if(y!==undefined&&y===SC.LAYOUT_AUTO&&!u){t=SC.Error.desc("%@.layout() you cannot use width:auto if "+"staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(t.toString());throw t}if(g!==undefined&&g===SC.LAYOUT_AUTO&&!u){t=SC.Error.desc("%@.layout() you cannot use height:auto if "+"staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(t.toString());throw t}if(!SC.none(f)){if(SC.isPercentage(f)){A.left=(f*100)+"%"
}else{if(e&&!SC.empty(y)){v=Math.floor(f);A.left=0}else{A.left=Math.floor(f)}}A.marginLeft=0;
if(y!==undefined){if(y===SC.LAYOUT_AUTO){A.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(y)){A.width=(y*100)+"%"
}else{A.width=Math.floor(y)}}A.right=null}else{A.width=null;if(a&&SC.isPercentage(a)){A.right=(a*100)+"%"
}else{A.right=Math.floor(a||0)}}}else{if(!SC.none(a)){if(SC.isPercentage(a)){A.right=Math.floor(a*100)+"%"
}else{A.right=Math.floor(a)}A.marginLeft=0;if(SC.none(y)){if(SC.none(c)){A.left=0
}A.width=null}else{A.left=null;if(y===SC.LAYOUT_AUTO){A.width=SC.LAYOUT_AUTO}else{if(y&&SC.isPercentage(y)){A.width=(y*100)+"%"
}else{A.width=Math.floor(y||0)}}}}else{if(!SC.none(o)){A.left="50%";if(y&&SC.isPercentage(y)){A.width=(y*100)+"%"
}else{A.width=Math.floor(y||0)}if(y&&SC.isPercentage(y)&&(SC.isPercentage(o)||SC.isPercentage(o*-1))){A.marginLeft=Math.floor((o-y/2)*100)+"%"
}else{if(y&&y>=1&&!SC.isPercentage(o)){A.marginLeft=Math.floor(o-A.width/2)}else{console.warn("You have to set width and centerX usign both percentages or pixels");
A.marginLeft="50%"}}A.right=null}else{if(!SC.none(y)){A.left=0;A.right=null;if(y===SC.LAYOUT_AUTO){A.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(y)){A.width=(y*100)+"%"}else{A.width=Math.floor(y)}}A.marginLeft=0
}else{A.left=0;A.right=0;A.width=null;A.marginLeft=0}}}}A.minWidth=(w.minWidth===undefined)?null:w.minWidth;
A.maxWidth=(w.maxWidth===undefined)?null:w.maxWidth;if(!SC.none(z)){if(SC.isPercentage(z)){A.top=(z*100)+"%"
}else{if(e&&!SC.empty(g)){b=Math.floor(z);A.top=0}else{A.top=Math.floor(z)}}if(g!==undefined){if(g===SC.LAYOUT_AUTO){A.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(g)){A.height=(g*100)+"%"}else{A.height=Math.floor(g)}}A.bottom=null
}else{A.height=null;if(h&&SC.isPercentage(h)){A.bottom=(h*100)+"%"}else{A.bottom=Math.floor(h||0)
}}A.marginTop=0}else{if(!SC.none(h)){A.marginTop=0;if(SC.isPercentage(h)){A.bottom=(h*100)+"%"
}else{A.bottom=Math.floor(h)}if(SC.none(g)){if(SC.none(i)){A.top=0}A.height=null}else{A.top=null;
if(g===SC.LAYOUT_AUTO){A.height=SC.LAYOUT_AUTO}else{if(g&&SC.isPercentage(g)){A.height=(g*100)+"%"
}else{A.height=Math.floor(g||0)}}}}else{if(!SC.none(n)){A.top="50%";A.bottom=null;
if(g&&SC.isPercentage(g)){A.height=(g*100)+"%"}else{A.height=Math.floor(g||0)}if(g&&SC.isPercentage(g)&&(SC.isPercentage(n)||SC.isPercentage(n*-1))){A.marginTop=Math.floor((n-g/2)*100)+"%"
}else{if(g&&g>=1&&!SC.isPercentage(n)){A.marginTop=Math.floor(n-A.height/2)}else{console.warn("You have to set height and centerY to use both percentages or pixels");
A.marginTop="50%"}}}else{if(!SC.none(g)){A.top=0;A.bottom=null;if(g===SC.LAYOUT_AUTO){A.height=SC.LAYOUT_AUTO
}else{if(g&&SC.isPercentage(g)){A.height=(g*100)+"%"}else{A.height=Math.floor(g||0)
}}A.marginTop=0}else{A.top=0;A.bottom=0;A.height=null;A.marginTop=0}}}}A.minHeight=(w.minHeight===undefined)?null:w.minHeight;
A.maxHeight=(w.maxHeight===undefined)?null:w.maxHeight;A.zIndex=SC.none(w.zIndex)?null:w.zIndex.toString();
A.backgroundPosition=SC.none(w.backgroundPosition)?null:w.backgroundPosition.toString();
while(--j>=0){l=q[j];if(A[l]===0){A[l]=null}}if(e){var m="translateX("+v+"px) translateY("+b+"px)";
if(SC.platform.supportsCSS3DTransforms){m+=" translateZ(0px)"}A[SC.platform.domCSSPrefix+"Transform"]=m
}for(B in A){s=A[B];if(typeof s===SC.T_NUMBER){A[B]=(s+"px")}}return A}.property().cacheable(),layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){var c=this._previousLayout,f=this.get("layout"),a=YES,i,g,e,h;
if(c&&c!==f){i=c.width;if(i!==undefined){e=f.width;if(i===e){g=c.height;if(c!==undefined){h=f.height;
if(g===h){a=NO}}}}}this.beginPropertyChanges();this.notifyPropertyChange("layoutStyle");
if(a){this.viewDidResize()}else{this._viewFrameDidChange()}this.endPropertyChanges();
var b=this.get("layoutView");if(b){b.set("childViewsNeedLayout",YES);b.layoutDidChangeFor(this);
if(b.get("childViewsNeedLayout")){b.invokeOnce(b.layoutChildViewsIfNeeded)}}return this
},childViewsNeedLayout:NO,layoutDidChangeFor:function(b){var a=this._needLayoutViews;
if(!a){a=this._needLayoutViews=SC.CoreSet.create()}a.add(b)},layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);this.layoutChildViews()
}return this},layoutChildViews:function(){var c=this._needLayoutViews,a=c?c.length:0,b;
for(b=0;b<a;++b){c[b].updateLayout()}c.clear()},updateLayout:function(){var b=this.get("layer"),a;
if(b){a=this.renderContext(b);this.renderLayout(a);a.update();if(this.useStaticLayout){this.viewDidResize()
}}b=null;return this},renderLayout:function(a,b){a.addStyle(this.get("layoutStyle"))
},isView:YES,selectStart:function(a){return this.get("isTextSelectable")},contextMenu:function(a){if(!this.get("isContextMenuEnabled")){a.stop()
}return true},touchBoundary:{left:50,right:50,top:50,bottom:50},_touchBoundaryFrame:function(){return this.get("parentView").convertFrameToView(this.get("frame"),null)
}.property("frame","parentView").cacheable(),touchIsInBoundary:function(i){var c=this.get("_touchBoundaryFrame"),e=0,b=0,h=this.get("touchBoundary");
var a=i.pageX,g=i.pageY;if(a<c.x){a=c.x-a;e=h.left}else{if(a>c.x+c.width){a=a-(c.x+c.width);
e=h.right}else{a=0;e=1}}if(g<c.y){g=c.y-g;b=h.top}else{if(g>c.y+c.height){g=g-(c.y+c.height);
b=h.bottom}else{g=0;b=1}}if(a>100||g>100){return NO}return YES}});SC.View.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a},layout:function(a){this.prototype.layout=a;return this},convertLayoutToAnchoredLayout:function(g,n){var i={top:0,left:0,width:n.width,height:n.height},e=n.width,l=n.height,m=g.right,a=g.left,k=g.top,h=g.bottom,j=g.width,f=g.height,c=g.centerX,b=g.centerY;
if(!SC.none(a)){if(SC.isPercentage(a)){i.left=a*e}else{i.left=a}if(j!==undefined){if(j===SC.LAYOUT_AUTO){i.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(j)){i.width=j*e}else{i.width=j}}}else{if(m&&SC.isPercentage(m)){i.width=e-i.left-(m*e)
}else{i.width=e-i.left-(m||0)}}}else{if(!SC.none(m)){if(SC.none(j)){i.left=0;if(m&&SC.isPercentage(m)){i.width=e-(m*e)
}else{i.width=e-(m||0)}}else{if(j===SC.LAYOUT_AUTO){i.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(j)){i.width=j*e
}else{i.width=j}if(SC.isPercentage(m)){i.left=e-(i.width+m)}else{i.left=e-(i.width+m)
}}}}else{if(!SC.none(c)){if(j&&SC.isPercentage(j)){i.width=(j*e)}else{i.width=(j||0)
}i.left=((e-i.width)/2);if(SC.isPercentage(c)){i.left=i.left+c*e}else{i.left=i.left+c
}}else{if(!SC.none(j)){i.left=0;if(j===SC.LAYOUT_AUTO){i.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(j)){i.width=j*e
}else{i.width=j}}}else{i.left=0;i.width=0}}}}if(g.minWidth!==undefined){i.minWidth=g.minWidth
}if(g.maxWidth!==undefined){i.maxWidth=g.maxWidth}if(!SC.none(k)){if(SC.isPercentage(k)){i.top=k*l
}else{i.top=k}if(f!==undefined){if(f===SC.LAYOUT_AUTO){i.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(f)){i.height=f*l
}else{i.height=f}}}else{i.height=l-i.top;if(h&&SC.isPercentage(h)){i.height=i.height-(h*l)
}else{i.height=i.height-(h||0)}}}else{if(!SC.none(h)){if(SC.none(f)){i.top=0;if(h&&SC.isPercentage(h)){i.height=l-(h*l)
}else{i.height=l-(h||0)}}else{if(f===SC.LAYOUT_AUTO){i.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(f)){i.height=f*l
}else{i.height=f}i.top=l-i.height;if(SC.isPercentage(h)){i.top=i.top-(h*l)}else{i.top=i.top-h
}}}}else{if(!SC.none(b)){if(f&&SC.isPercentage(f)){i.height=(f*l)}else{i.height=(f||0)
}i.top=((l-i.height)/2);if(SC.isPercentage(b)){i.top=i.top+b*l}else{i.top=i.top+b
}}else{if(!SC.none(f)){i.top=0;if(f===SC.LAYOUT_AUTO){i.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(f)){i.height=f*l
}else{i.height=f}}}else{i.top=0;i.height=0}}}}if(i.top){i.top=Math.floor(i.top)}if(i.bottom){i.bottom=Math.floor(i.bottom)
}if(i.left){i.left=Math.floor(i.left)}if(i.right){i.right=Math.floor(i.right)}if(i.width!==SC.LAYOUT_AUTO){i.width=Math.floor(i.width)
}if(i.height!==SC.LAYOUT_AUTO){i.height=Math.floor(i.height)}if(g.minHeight!==undefined){i.minHeight=g.minHeight
}if(g.maxHeight!==undefined){i.maxHeight=g.maxHeight}return i},convertLayoutToCustomLayout:function(b,a,c){},classNames:function(a){a=(this.prototype.classNames||[]).concat(a);
this.prototype.classNames=a;return this},tagName:function(a){this.prototype.tagName=a;
return this},childView:function(a){var b=this.prototype.childViews||[];if(b===this.superclass.prototype.childViews){b=b.slice()
}b.push(a);this.prototype.childViews=b;return this},bind:function(b,e){var c=this.prototype,a=this.superclass.prototype;
var f=c._bindings;if(!f||f===a._bindings){f=c._bindings=(f||[]).slice()}b=b+"Binding";
c[b]=e;f.push(b);return this},prop:function(a,b){this.prototype[a]=b;return this},localization:function(b,a){if(a){b.rootElement=SC.$(a)[0]
}return b},viewFor:function(e,c){var b=SC.$A(arguments);if(SC.none(e)){b.shift()}else{b[0]={rootElement:SC.$(e)[0]}
}var a=this.create.apply(this,arguments);b=b[0]=null;return a},create:function(){var b=this,a=new b(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(a,SC.$A(arguments))}return a},loc:function(f){var b=f.childViews;
delete f.childViews;this.applyLocalizedAttributes(f);if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))
}var e=this.prototype.childViews,a=e.length,c;while(--a>=0){c=e[a];f=b[a];if(f&&c&&c.loc){c.loc(f)
}}return this},applyLocalizedAttributes:function(a){SC.mixin(this.prototype,a)},views:{}});
SC.outlet=function(b,a){return function(c){return(this[c]=SC.objectForPropertyPath(b,(a!==undefined)?a:this))
}.property()};SC.View.unload=function(){var a=SC.View.views;if(a){for(var b in a){if(!a.hasOwnProperty(b)){continue
}delete a[b]}}};if(SC.browser.msie){SC.Event.add(window,"unload",SC.View,SC.View.unload)
}SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),renderMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};sc_require("views/view");sc_require("mixins/control");
sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("errorValue")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.run(function(){this.fieldValueDidChange(NO)
},this)},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("fieldValue"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},didAppendToDocument:function(){if(this.get("isTextArea")){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)}},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},mouseDown:function(a){this._field_isMouseDown=YES;a.allowDefault();return YES},mouseExited:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseEntered:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.StaticLayout={hasStaticLayout:YES};
sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
sc_require("mixins/editable");SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isTextField:YES,applyImmediately:YES,isPassword:NO,isTextArea:NO,hint:"",isEditing:NO,hintON:YES,defaultTabbingEnabled:YES,isContextMenuEnabled:YES,leftAccessoryView:null,rightAccessoryView:null,spellCheckEnabled:YES,maxLength:5096,_isFocused:NO,init:function(){var a=this.get("hintON"),b=this.get("value");
if(!b||b&&b.length===0){this.set("hintON",YES)}else{this.set("hintON",NO)}return arguments.callee.base.apply(this,arguments)
},isEditable:function(){return this.get("isEnabled")}.property("isEnabled").cacheable(),selection:function(k,i){var e=this.$input()[0],f,a,c;
if(i===undefined){if(e){a=null;c=null;if(!e.value){a=c=0}else{if("selectionStart" in e){a=e.selectionStart
}if("selectionEnd" in e){c=e.selectionEnd}if(a===null||c===null){var j=document.selection;
if(j){var h=j.type;if(h&&(h==="None"||h==="Text")){f=j.createRange();if(!this.get("isTextArea")){var b=f.text.length;
a=Math.abs(f.moveStart("character",0-(e.value.length+1)));c=a+b}else{var g=f.duplicate();
g.moveToElementText(e);g.setEndPoint("EndToStart",f);a=g.text.length;c=a+f.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!i||!i.kindOf||!i.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(e){if(e.setSelectionRange){e.setSelectionRange(i.get("start"),i.get("end"))}else{f=e.createTextRange();
a=i.get("start");f.move("character",a);f.moveEnd("character",i.get("end")-a);f.select()
}}return i}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){arguments.callee.base.apply(this,arguments);
this.accessoryViewObserver()},acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),accessoryViewObserver:function(){var g,j=["leftAccessoryView","rightAccessoryView"],a=j.length,b,f,e,h;
for(b=0;b<a;b++){f=j[b];e=this["_"+f];h=this.get(f);if(!(e&&h&&(e===h))){if(e){g=e.get("classNames");
g=g.without("sc-text-field-accessory-view");e.set("classNames",g);this.removeChild(e);
e=null;this["_"+f]=null}if(h){if(h.isClass){h=h.create({layoutView:this})}g=h.get("classNames");
var c="sc-text-field-accessory-view";if(g.indexOf(c)<0){g=SC.clone(g);g.push(c);h.set("classNames",g)
}this.appendChild(h);this["_"+f]=h}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(f,g){arguments.callee.base.apply(this,arguments);var a,e,c,b;a=this.get("fieldValue");
if(SC.none(a)){a=""}a=String(a);f.setClass("not-empty",a.length>0);e=this._getAccessoryViewWidths();
c=e.left;b=e.right;if(c){c+="px"}if(b){b+="px"}this._renderField(f,g,a,c,b);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(c,j,p,h,m){var n=this.get("hint"),f,v,q,e,s,b,k,g,o=this.get("spellCheckEnabled"),u,i=this.get("maxLength"),a;
c.setClass("text-area",this.get("isTextArea"));a=(parseInt(SC.browser.safari,0)<532);
c.setClass("oldWebKitFieldPadding",a);u=o?' spellcheck="true"':' spellcheck="false"';
if(j||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;f=this.get("isEnabled")?"":'disabled="disabled"';
v=this.get("layerId");c.push('<span class="border"></span>');q="";if(h||m){q='style="';
if(h){q+="left: "+h+"; "}if(m){q+="right: "+m+";"}q+='"'}c.push('<span class="padding" '+q+">");
p=this.get("escapeHTML")?SC.RenderContext.escapeHTML(p):p;if(!this.get("_supportsPlaceHolder")&&(!p||(p&&p.length===0))){p=this.get("hint");
c.setClass("sc-hint",YES)}g=(SC.browser.mozilla&&(parseFloat(SC.browser.mozilla)<1.9||SC.browser.mozilla.match(/1\.9\.0|1\.9\.1/)))?"field oldGecko":"field";
if(this.get("isTextArea")){c.push('<textarea class="',g,'" name="',v,'" ',f,' placeholder="',n,'"',u,' maxlength="',i,'">',p,"</textarea></span>")
}else{e=this.get("isPassword")?"password":"text";c.push('<input class="',g,'" type="',e,'" name="',v,'" ',f,' value="',p,'" placeholder="',n,'"',u,' maxlength="',i,'" /></span>')
}}else{var l=this.$input();if(!this.get("_supportsPlaceHolder")){var t=this.get("value");
if((!t||(t&&t.length===0))){if(this.get("hintON")&&!this.get("isFirstResponder")){c.setClass("sc-hint",YES);
l.val(n)}else{c.setClass("sc-hint",NO);l.val("")}}}else{l.attr("placeholder",n)}b=l[0];
if(b){if(!this.get("isEnabled")){b.disabled="true"}else{b.disabled=null}k=b.parentNode.style;
if(h){if(k.left!==h){k.left=h}}else{k.left=null}if(m){if(k.right!==m){k.right=m}}else{k.right=null
}}}},_getAccessoryViewWidths:function(){var c={},l=["left","right"],e=l.length,g,h,m,k,a,j,f,b;
for(g=0;g<e;g++){h=l[g];m=this.get(h+"AccessoryView");if(m){if(m.isClass){m=m.create({layoutView:this})
}if(m.get){b=m.get("frame");if(b){a=b.width;if(a){j=m.get("layout");if(j){f=j[h];
a+=f}c[h]=a}}}}}return c},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(!this.get("_supportsPlaceHolder")&&this.get("hintON")){var b=this.$input().val();
if(!b||(b&&b.length===0)){this.$input().val(this.get("hint"))}}if(this.get("isTextArea")){this.invokeLast(this._addTextAreaEvents)
}else{this._addTextAreaEvents();if(SC.browser.mozilla){var a=this.$input();SC.Event.add(a,"keypress",this,this._firefox_dispatch_keypress)
}}},_addTextAreaEvents:function(){var a=this.$input();SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);SC.Event.add(a,"select",this,this._textField_selectionDidChange);
if(SC.browser.mozilla){this._cacheInputElement=this.$input();this._cachePaddingElement=this.$(".padding")
}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.remove(a,"select",this,this._textField_selectionDidChange);SC.Event.remove(a,"focus",this,this._firefox_dispatch_keypress)
},_textField_fieldDidFocus:function(a){SC.run(function(){this.set("focused",YES);
this.fieldDidFocus(a);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",NO)
}},this)},_textField_fieldDidBlur:function(a){SC.run(function(){this.set("focused",NO);
this.fieldDidBlur(this._origEvent);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",YES)
}},this)},fieldDidFocus:function(a){this.beginEditing(a);if(this._didHideInterceptForPane){this._didHideInterceptForPane.showTouchIntercept();
this._didHideInterceptForPane=null}var b=this.get("pane");if(b&&b.get("usingTouchIntercept")){b.hideTouchIntercept();
this._didHideInterceptForPane=this.get("pane")}},fieldDidBlur:function(a){this.commitEditing(a);
var b=this._didHideInterceptForPane;if(b){b.showTouchIntercept();b=null}},_field_fieldValueDidChange:function(a){if(this.get("focused")){SC.run(function(){this.fieldValueDidChange(NO)
},this)}},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(parseFloat(SC.browser.mozilla)<1.9&&!this.get("useStaticLayout")){var i,e,c,j,b,h,f,g;
f=this._cacheInputElement;g=this._cachePaddingElement;if(g&&g[0]){h=g[0];b=SC.$(h).offset();
if(SC.browser.compareVersion(1,9,2)<0&&f[0].tagName.toLowerCase()==="input"){i=b.top+this._topOffsetForFirefoxCursorFix
}else{i=b.top}e=b.left;c=h.offsetWidth;j=h.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(i,e,c,j);
if(!this._prevStyle||this._prevStyle!=a){f.attr("style",a)}this._prevStyle=a}}return this
},_firefox_dispatch_keypress:function(a){var e=this.get("selection"),f=this.get("value"),c=f?f.length:0,b;
if(!e||((e.get("length")===0&&(e.get("start")===0)||e.get("end")===c))){b=SC.RootResponder.responder;
b.keypress.call(b,a);a.stopPropagation()}},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){var b=this.$input()[0];
try{if(b){b.focus()}}catch(c){}if(!this._txtFieldMouseDown){this.invokeLast(this._selectRootElement)
}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){var a=this.$input()[0];
if(a){a.select()}else{this._textField_selectionDidChange()}},didLoseKeyResponderTo:function(a){var b=this.$input()[0];
if(b){b.blur()}this.invokeLater("scrollToOriginIfNeeded",100)},scrollToOriginIfNeeded:function(){var b=this.get("pane");
if(!b){return}var a=b.get("firstResponder");if(!a||!a.get("isTextField")){document.body.scrollTop=document.body.scrollLeft=0
}},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){var f=b.which,c=false;
if((f===13&&!b.isIMEInput)&&!this.get("isTextArea")){return NO}if(f===27){return NO
}if(f===9&&this.get("defaultTabbingEnabled")){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(!SC.browser.safari&&this.get("isTextArea")){var e=this.get("value");
if(e&&b.which>47&&(e.length>=this.get("maxLength"))){c=true}}if((this.performValidateKeyDown(b)||SC.platform.touch)&&!c){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}if(this.get("applyImmediately")){this.invokeLater(this.fieldValueDidChange,1)
}return YES},keyUp:function(a){if(SC.browser.mozilla&&a.keyCode===13){this.fieldValueDidChange()
}this.notifyPropertyChange("selection");this._isKeyDown=NO;a.allowDefault();return YES
},mouseDown:function(a){var b=this.get("fieldValue");this._txtFieldMouseDown=YES;
if(!this.get("isEnabled")){a.stop();return YES}else{return arguments.callee.base.apply(this,arguments)
}},mouseUp:function(a){this._txtFieldMouseDown=NO;this.notifyPropertyChange("selection");
if(!this.get("isEnabled")){a.stop();return YES}return arguments.callee.base.apply(this,arguments)
},mouseWheel:function(a){a.allowDefault();return YES},selectStart:function(a){return YES
},_supportsPlaceHolder:function(){return SC.browser.safari&&!this.get("isTextArea")
}.property("isTextArea").cacheable(),valueObserver:function(){var a=this.get("value");
if(a&&a.length>0){this.set("hintON",NO)}else{this.set("hintON",YES)}}.observes("value")});
sc_require("views/text_field");SC.InlineTextFieldView=SC.TextFieldView.extend(SC.DelegateSupport,{_topOffsetForFirefoxCursorFix:0,beginEditing:function(b){if(!b){throw"InlineTextField.beginEditing() requires options"
}if(this.get("isEditing")){return NO}var e={},g,c,f,a;a=this._delegate=b.delegate;
this.set("delegate",a);if(!this.invokeDelegateMethod(a,"inlineEditorShouldBeginEditing",this)){SC.Logger.warn("InlineTextField.beginEditing() cannot begin without inlineEditorShouldBeginEditing() on the delegate.");
return NO}this.beginPropertyChanges();this.set("isEditing",YES);this.set("escapeHTML",b.escapeHTML);
this._optframe=b.frame;this._optIsCollection=b.isCollection;this._exampleElement=b.exampleElement;
if(!this._optframe||!a){throw"At least frame and delegate options are required for inline editor"
}this._originalValue=b.value;if(SC.none(this._originalValue)){this._originalValue=""
}this._multiline=(b.multiline!==undefined)?b.multiline:NO;if(this._multiline){this.set("isTextArea",YES)
}else{this.set("isTextArea",NO)}this._commitOnBlur=(b.commitOnBlur!==undefined)?b.commitOnBlur:YES;
this.set("validator",b.validator);this.set("value",this._originalValue);g=a.get("pane");
e.height=this._optframe.height;e.width=this._optframe.width;c=this._delegate.get("layout");
f=g.$()[0];if(this._optIsCollection&&c.left){e.left=this._optframe.x-c.left-f.offsetLeft-1;
if(SC.browser.msie==7){e.left--}}else{e.left=this._optframe.x-f.offsetLeft-1;if(SC.browser.msie==7){e.left--
}}if(this._optIsCollection&&c.top){e.top=this._optframe.y-c.top-f.offsetTop;if(SC.browser.msie==7){e.top=e.top-2
}}else{e.top=this._optframe.y-f.offsetTop;if(SC.browser.msie==7){e.top=e.top-2}}this.set("layout",e);
this.set("parentNode",g);g.appendChild(this);this._className=this.getDelegateProperty(a,"inlineEditorClassName");
if(this._className&&!this.hasClassName(this._className)){this.setClassName(this._className,true)
}this.invokeDelegateMethod(a,"inlineEditorWillBeginEditing",this);this._previousFirstResponder=g?g.get("firstResponder"):null;
this.becomeFirstResponder();this.endPropertyChanges();this.invokeLast(function(){this.invokeDelegateMethod(a,"inlineEditorDidBeginEditing",this)
});return this},commitEditing:function(a){if(!SC.$ok(this.validateSubmit())){return NO
}return this._endEditing(this.get("value"),a)},discardEditing:function(){return this._endEditing(this._originalValue,null,YES)
},blurEditor:function(a){if(!this.get("isEditing")){return YES}return this._commitOnBlur?this.commitEditing(a):this.discardEditing(a)
},_endEditing:function(e,b,c){if(!this.get("isEditing")){return YES}var a=this._delegate;
if(!this.invokeDelegateMethod(a,"inlineEditorShouldEndEditing",this,e,b,c)){SC.Logger.warn("InlineTextField._endEditing() cannot end without inlineEditorShouldEndEditing() on the delegate.");
return NO}this.invokeDelegateMethod(a,"inlineEditorDidEndEditing",this,e,b,c);if(this._className){this.setClassName(this._className,false)
}this._originalValue=this._delegate=this._exampleElement=this._optframe=this._className=null;
this.set("isEditing",NO);if(this.get("isFirstResponder")){var f=this.get("pane");
if(f&&this._previousFirstResponder){f.makeFirstResponder(this._previousFirstResponder)
}else{this.resignFirstResponder()}}this._previousFirstResponder=null;if(this.get("parentNode")){this.removeFromParent()
}return YES},isEditing:NO,mouseDown:function(a){arguments.callee.base.call(this,a);
return this.get("isEditing")},touchStart:function(a){this.mouseDown(a)},keyDown:function(a){var b=this.interpretKeyEvents(a);
this.fieldValueDidChange(true);return !b?NO:b},insertText:null,_scitf_blurInput:function(){var a=this.$input()[0];
if(a){a.blur()}a=null},willRemoveFromParent:function(){return this._scitf_blurInput()
},willLoseFirstResponder:function(b,a){if(b!==this){return}this._previousFirstResponder=null;
this._origEvent=a;this._scitf_blurInput();return this.blurEditor(a)},cancel:function(){this.discardEditing();
return YES},fieldValueDidChange:function(a){arguments.callee.base.call(this,a)},insertNewline:function(a){if(this._multiline){a.allowDefault();
return arguments.callee.base.call(this,a)}else{if(this.get("value")!=this.$input().val()){this.set("value",this.$input().val())
}this.commitEditing();return YES}},insertTab:function(a){var c=this._delegate;this.resignFirstResponder();
this.commitEditing();if(c){var b=c.get("nextValidKeyView");if(b&&b.beginEditing){b.beginEditing()
}}return YES},insertBacktab:function(a){var b=this._delegate;this.resignFirstResponder();
this.commitEditing();if(b){var c=b.get("previousValidKeyView");if(c&&c.beginEditing){c.beginEditing()
}}return YES},deleteForward:function(a){a.allowDefault();return YES},deleteBackward:function(a){a.allowDefault();
return YES}});SC.InlineTextFieldView.mixin({beginEditing:function(b){this._exampleElement=b.exampleElement;
var a=b.exampleInlineTextFieldView?b.exampleInlineTextFieldView:this,g=b.delegate.get("layout"),f=this.updateViewStyle(),h=this.updateViewPaddingStyle();
var i=".inline-editor input{"+f+"} ";i=i+".inline-editor textarea{"+f+"} .inline-editor .padding{"+h+"}";
var e=document.getElementsByTagName("head")[0],c=document.createElement("style");
c.type="text/css";c.media="screen";if(c.styleSheet){c.styleSheet.cssText=i}else{c.appendChild(document.createTextNode(i))
}e.appendChild(c);this.editor=a.create({classNames:"inline-editor",layout:g});return this.editor.beginEditing(b)
},commitEditing:function(){return this.editor?this.editor.commitEditing():YES},discardEditing:function(){return this.editor?this.editor.discardEditing():YES
},updateViewStyle:function(){var b=this._exampleElement[0],c="",a=SC.getStyle(b,"font-size");
if(a&&a.length>0){c=c+"font-size: "+a+" !important; "}a=SC.getStyle(b,"font-family");
if(a&&a.length>0){c=c+"font-family: "+a+" !important; "}a=SC.getStyle(b,"font-weight");
if(a&&a.length>0){c=c+"font-weight: "+a+" !important; "}a=SC.getStyle(b,"z-index");
if(a&&a.length>0){c=c+"z-index: "+a+" !important; "}a=SC.getStyle(b,"line-height");
if(a&&a.length>0){c=c+"line-height: "+a+" !important; "}a=SC.getStyle(b,"text-align");
if(a&&a.length>0){c=c+"text-align: "+a+" !important; "}a=SC.getStyle(b,"top-margin");
if(a&&a.length>0){c=c+"top-margin: "+a+" !important; "}a=SC.getStyle(b,"bottom-margin");
if(a&&a.length>0){c=c+"bottom-margin: "+a+" !important; "}a=SC.getStyle(b,"left-margin");
if(a&&a.length>0){c=c+"left-margin: "+a+" !important; "}a=SC.getStyle(b,"right-margin");
if(a&&a.length>0){c=c+"right-margin: "+a+" !important; "}return c},updateViewPaddingStyle:function(){var b=this._exampleElement[0];
var c="";var a=SC.getStyle(b,"padding-top");if(a&&a.length>0){c=c+"top: "+a+" !important; "
}a=SC.getStyle(b,"padding-bottom");if(a&&a.length>0){c=c+"bottom: "+a+" !important; "
}a=SC.getStyle(b,"padding-left");if(a&&a.length>0){c=c+"left: "+a+" !important; "
}a=SC.getStyle(b,"padding-right");if(a&&a.length>0){c=c+"right: "+a+" !important; "
}return c},editor:null});sc_require("system/responder");SC.ResponderContext={isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(a){var b=a.get("nextResponder");
if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b,this)}else{if(!b&&(a!==this)){b=this
}}return b},responderNameFor:function(a){if(!a){return"(No Responder)"}else{if(a._scrc_name){return a._scrc_name
}}var b=this.NAMESPACE;this._findResponderNamesFor(this,3,b?[this.NAMESPACE]:[]);
return a._scrc_name||a.toString()},_findResponderNamesFor:function(a,f,e){var b,c;
for(b in a){if(b==="nextResponder"){continue}c=a[b];if(c&&c.isResponder){if(c._scrc_name){continue
}e.push(b);c._scrc_name=e.join(".");if(f>0){this._findResponderNamesFor(c,f-1,e)}e.pop()
}}},makeFirstResponder:function(b,a){var g=this.get("firstResponder"),e=this.get("nextResponder"),f=this.get("trace"),c;
if(this._locked){if(f){console.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(b)))
}this._pendingResponder=b;return}if(f){console.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(b)))
}if(b){b.set("becomingFirstResponder",YES)}this._locked=YES;this._pendingResponder=null;
c=b?b:null;while(c){if(c.get("hasFirstResponder")){break}c=(c===e)?null:this.nextResponderFor(c)
}if(!c){c=e}this._notifyWillLoseFirstResponder(g,g,c,a);if(g){g.set("isFirstResponder",NO)
}this.beginPropertyChanges();this.set("firstResponder",b);if(b){b.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(b,b,c);this.endPropertyChanges();this._locked=NO;
if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);this._pendingResponder=null
}if(b){b.set("becomingFirstResponder",NO)}return this},_notifyWillLoseFirstResponder:function(c,f,b,a){if(f===b){return
}f.willLoseFirstResponder(c,a);f.set("hasFirstResponder",NO);var e=this.nextResponderFor(f);
if(e){this._notifyWillLoseFirstResponder(c,e,b)}},_notifyDidBecomeFirstResponder:function(b,e,a){if(e===a){return
}var c=this.nextResponderFor(e);if(c){this._notifyDidBecomeFirstResponder(b,c,a)}e.set("hasFirstResponder",YES);
e.didBecomeFirstResponder(b)},resetFirstResponder:function(){var a=this.get("firstResponder");
if(!a){return}a.willLoseFirstResponder();a.didBecomeFirstResponder()},sendAction:function(h,e,c){var a=this.get("firstResponder"),f=this.get("nextResponder"),g=this.get("trace"),i=NO,b;
this._locked=YES;if(g){console.log("%@: begin action '%@' (%@, %@)".fmt(this,h,e,c))
}if(!i&&!a&&this.tryToPerform){i=this.tryToPerform(h,e,c)}while(!i&&a){if(a.tryToPerform){i=a.tryToPerform(h,e,c)
}if(!i){a=(a===f)?null:this.nextResponderFor(a)}}if(g){if(!i){console.log("%@:  action '%@' NOT HANDLED".fmt(this,h))
}else{console.log("%@: action '%@' handled by %@".fmt(this,h,this.responderNameFor(a)))
}}this._locked=NO;if(b=this._pendingResponder){this._pendingResponder=null;this.makeFirstResponder(b)
}return a}};sc_require("views/view");sc_require("mixins/responder_context");SC.Pane=SC.View.extend(SC.ResponderContext,{isPane:YES,page:null,rootResponder:null,currentWindowSize:null,computeParentDimensions:function(h){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var e=this.get("currentWindowSize"),i={x:0,y:0,width:1000,height:1000},g=this.get("layout");
if(e){i.width=e.width;i.height=e.height}else{if(SC.RootResponder.responder){var b=SC.RootResponder.responder.get("currentWindowSize");
if(b){i.width=b.width;i.height=b.height}}else{var f,a,c;if(!this._bod||!this._docElement){a=document.body;
c=document.documentElement;this._body=a;this._docElement=c}else{a=this._body;c=this._docElement
}if(window.innerHeight){i.width=window.innerWidth;i.height=window.innerHeight}else{if(c&&c.clientHeight){i.width=c.clientWidth;
i.height=c.clientHeight}else{if(a){i.width=a.clientWidth;i.height=a.clientHeight}}}this.windowSizeDidChange(null,i)
}}if(g.minHeight||g.minWidth){if(g.minHeight){i.height=Math.max(i.height,g.minHeight)
}if(g.minWidth){i.width=Math.max(i.width,g.minWidth)}}return i},frame:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this.computeFrameWithParentFrame(null)}.property(),windowSizeDidChange:function(b,a){this.set("currentWindowSize",a);
this.parentViewDidResize();return this},paneLayoutDidChange:function(){this.invokeOnce(this.updateLayout)
}.observes("layout"),sendEvent:function(c,a,e){var b;if(!e){e=this.get("firstResponder")
}while(e&&!e.tryToPerform(c,a)){e=(e===this)?null:e.get("nextResponder")}if(!e&&(e=this.get("defaultResponder"))){if(typeof e===SC.T_STRING){e=SC.objectForPropertyPath(e)
}if(!e){e=null}else{e=e.tryToPerform(c,a)?e:null}}else{if(!e&&!(e=this.get("defaultResponder"))){e=this.tryToPerform(c,a)?this:null
}}return a.mouseHandler||e},performKeyEquivalent:function(c,a){var b=arguments.callee.base.apply(this,arguments);
if(!b){var e=this.get("defaultResponder");if(e){if(e.performKeyEquivalent){b=e.performKeyEquivalent(c,a)
}if(!b&&e.tryToPerform){b=e.tryToPerform(c,a)}}}return b},nextResponder:function(){return null
}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(b,a){var e=this.get("firstResponder"),c=this.get("isKeyPane");
if(e===b){return this}if(SC.platform.touch&&b&&b.kindOf(SC.TextFieldView)&&!b.get("focused")){return this
}if(e){e.willLoseFirstResponder(e,a)}if(c){if(e){e.willLoseKeyResponderTo(b)}if(b){b.willBecomeKeyResponderFrom(e)
}}if(e){e.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",b);if(b){b.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",c).endPropertyChanges()
}if(c){if(b){b.didBecomeKeyResponderFrom(e)}if(e){e.didLoseKeyResponderTo(b)}}if(b){b.didBecomeFirstResponder(b)
}return this},keyDown:function(a){var b;if(a.which===9&&!this.get("firstResponder")){if(a.shiftKey){b=this.get("previousValidKeyView")
}else{b=this.get("nextValidKeyView")}if(b){this.makeFirstResponder(b);return YES}}return NO
},_forwardKeyChange:function(e,b,h,g){var c,a,f;if(e&&(a=this.get("firstResponder"))){f=(h)?h.get("firstResponder"):null;
c=this.get("firstResponder");if(c){c[b](f)}if((g!==undefined)&&a){a.set("isKeyResponder",g)
}}},willLoseKeyPaneTo:function(a){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",a,NO);
return this},willBecomeKeyPaneFrom:function(a){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",a,YES);
return this},didLoseKeyPaneTo:function(b){var a=this.get("isKeyPane");this.set("isKeyPane",NO);
this._forwardKeyChange(a,"didLoseKeyResponderTo",b);return this},didBecomeKeyPaneFrom:function(b){var a=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!a,"didBecomeKeyResponderFrom",b,YES);
return this},isMainPane:NO,focusFrom:function(a){},blurTo:function(a){},blurMainTo:function(a){this.set("isMainPane",NO)
},focusMainFrom:function(a){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}var b=this.get("layer");if(b&&b.parentNode){b.parentNode.removeChild(b)}b=null;this._removeIntercept();
this.resignKeyPane();var a=this.rootResponder;if(this.get("isMainPane")){a.makeMainPane(null)
}a.panes.remove(this);this.rootResponder=null;this.set("isPaneAttached",NO);this.parentViewDidChange();
return this},appendTo:function(b){var a=this.get("layer");if(!a){a=this.createLayer().get("layer")
}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,null);
b=a=null;return this.paneDidAttach()},prependTo:function(b){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,b.firstChild);b=a=null;return this.paneDidAttach()},before:function(c){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;
if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,c);
b=c=a=null;return this.paneDidAttach()},after:function(c){var a=this.get("layer");
if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,c.nextSibling);b=c=a=null;return this.paneDidAttach()},removeFromParent:function(){},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();this._addIntercept();
return this},isPaneAttached:NO,hasTouchIntercept:NO,zIndex:0,touchZ:99,_addIntercept:function(){if(this.get("hasTouchIntercept")&&SC.platform.touch){this.set("usingTouchIntercept",YES);
var b=document.createElement("div");var a=b.style;a.position="absolute";a.left="0px";
a.top="0px";a.right="0px";a.bottom="0px";a.webkitTransform="translateZ(0px)";a.zIndex=this.get("zIndex")+this.get("touchZ");
b.className="touch-intercept";b.id="touch-intercept-"+SC.guidFor(this);this._touchIntercept=b;
document.body.appendChild(b)}},_removeIntercept:function(){if(this._touchIntercept){document.body.removeChild(this._touchIntercept);
this._touchIntercept=null}},hideTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="none"
}},showTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="block"
}},recomputeIsVisibleInWindow:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var c=this.get("isVisibleInWindow"),f=this.get("isVisible")&&this.get("isPaneAttached");
if(c!==f){this.set("isVisibleInWindow",f);var e=this.get("childViews"),b=e.length,a;
for(a=0;a<b;a++){e[a].recomputeIsVisibleInWindow(f)}if(f){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isKeyPane")){this.resignKeyPane()}}}this.updateLayerIfNeeded(YES);
return this},updateLayerLocation:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this},init:function(){var a=!!this.get("layer");arguments.callee.base.apply(this,arguments);
if(a){this.paneDidAttach()}},classNames:"sc-pane".w()});sc_require("mixins/responder_context");
SC.Application=SC.Responder.extend(SC.ResponderContext,{});sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,stats:{},globalStartTime:null,start:function(b,a,f,e){if(!this.enabled){return
}var g=(f||Date.now()),c;if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(e&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(g)}c._times.push({start:g,_subStats:{}});return b},end:function(c,b,g){var f;
if(!this.enabled){return}if(b){f=this._subStatFor(c,b)}else{f=this._statFor(c)}var h=f._starts.pop();
if(!h){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(h=="ignore"){return}var a=(g||Date.now());var e=a-h;f._times[f._times.length-1].end=a;
f._times[f._times.length-1].dur=e;f.amt+=e;f.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(f,e,a){if(!e){e="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(e);b=f();SC.Benchmark.end(c)}return b},install:function(a,e,b){a["b__"+e]=a[e];
var c=a["b__"+e];a[e]=function(){var g="%@(%@)".fmt(e,$A(arguments).join(", "));SC.Benchmark.start(g,b);
var f=c.apply(this,arguments);SC.Benchmark.end(g);return f}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var e=this._compileChartData(true);for(var c=0;c<e.length;c++){if(e[c][4]){b.push(this._timelineGenSubReport(e[c]))
}else{b.push(this._timelineGenReport(e[c]))}}return b.join("\n")},timelineChart:function(u){var p=0;
this.hideChart();var n=this._compileChartData(false);var k=n.length;if(k===0){return
}var b=this.globalStartTime?this.globalStartTime:n[0][1];var e=n[k-1][2]-b;var o=50+k*30;
var q=Math.ceil(e/200)+1;var t=q*50;var c=document.createElement("div");c.className="sc-benchmark-graph";
document.body.appendChild(c);var v=document.createElement("div");v.innerHTML=((u)?u:"SproutCore Application")+(" - Total Captured Time: "+e+" ms - Points Captured: "+k)+' [<a href="javascript:SC.Benchmark.hideChart();">Hide Chart</a>]';
v.className="sc-benchmark-title";c.appendChild(v);var g=document.createElement("div");
g.className="sc-benchmark-top";g.style.width=t+"px";c.appendChild(g);for(p=0;p<q;
p++){var s=document.createElement("div");s.className="sc-benchmark-tick";s.style.left=(p*50)+"px";
s.style.height=o+"px";var f=document.createElement("div");f.className="sc-benchmark-tick-label";
f.style.left=(p*50)+"px";f.innerHTML=p*200+" ms";c.appendChild(s);c.appendChild(f)
}for(p=0;p<k;p++){var l=document.createElement("div");l.style.top=(75+(p*30))+"px";
l.style.width=t+"px";l.className=(p%2===0)?"sc-benchmark-row even":"sc-benchmark-row";
c.appendChild(l);var m=document.createElement("div");var j=n[p][1];var h=n[p][2];
var a=n[p][3];m.innerHTML="&nbsp;"+(n[p][0]+" <span class='sc-benchmark-emphasis'>"+a+"ms</span>");
m.className="sc-benchmark-bar";m.style.cssText="left:"+(((j-b)/4))+"px; width: "+((a/4))+"px; top: "+(53+(p*30))+"px;";
m.title="start: "+(j-b)+" ms, end: "+(h-b)+" ms, duration: "+a+" ms";c.appendChild(m)
}this._graph=c},hideChart:function(){if(this._graph){try{document.body.removeChild(this._graph)
}catch(a){}}},log:function(e){var c=this.report(e).split("\n"),b=c.length,a;for(a=0;
a<b;a++){console.log(c[a])}},startProfile:function(a){if(!this.enabled){return}if(console&&console.profile){console.profile(a)
}},endProfile:function(a){if(!this.enabled){return}if(console&&console.profileEnd){console.profileEnd(a)
}},_compileChartData:function(h){var m=[],a;for(var n in this.stats){var f=this.stats[n];
for(var g=0;g<f._times.length;g++){var o=f._times[g];a=(f._times.length>1)?(g+1)+" - "+n:n;
m.push([a,o.start,o.end,o.dur,false]);if(h){var b=o._subStats;for(var c in b){var l=b[c];
for(var e=0;e<l._times.length;e++){var p=l._times[e];a=(l._times.length>1)?(e+1)+" - "+c:c;
m.push([a,p.start,p.end,p.dur,true])}}}}}m.sort(function(j,i){if(j[1]<i[1]){return -1
}else{if(j[1]==i[1]){if(j[3]&&!i[3]){return -1}if(!j[3]&&i[3]){return 1}return 0}}return 1
});return m},_genReport:function(a){var b=this._statFor(a);var c=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;
return"BENCH %@ msec: %@ (%@x)".fmt(c,(b.name||a),b.runs)},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(e,c){var f=this.stats[c]._times.length;
if(f===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[e];if(!b){a[e]={runs:0,amt:0,name:e,_starts:[],_times:[]};b=a[e]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.mixin({logBundleLoading:NO,bundleIsLoaded:function(a){var b=SC.BUNDLE_INFO[a];
return b?!!b.loaded:NO},_scb_bundleDidLoad:function(b,j,a,k){var f=a,o=j;if(SC.typeOf(j)===SC.T_STRING){o=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,o)}if(!f){if(SC.LAZY_INSTANTIATION[b]){var n=SC.LAZY_INSTANTIATION[b];
if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}for(var g=0,c=n.length;g<c;g++){try{n[g]()}catch(h){console.error("SC.loadBundle(): Failted to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];if(SC.typeOf(j)===SC.T_STRING){o=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,o)}if(!a){throw"SC.loadBundle(): could not find callback for lazily instantiated bundle '%@'".fmt(b)
}}else{throw"SC.loadBundle(): could not find callback for '%@'".fmt(b)}}if(!k){k=[]
}k.push(b);var l=!!SC.RunLoop.currentRunLoop;if(l){SC.run(function(){f.apply(o,k)
})}else{f.apply(o,k)}},tryToLoadBundle:function(e,f,g,b){var a,c;if(SC.typeOf(f)===SC.T_STRING){c=SC.objectForPropertyPath(f)
}if(SC.typeOf(g)===SC.T_STRING){a=SC.objectForPropertyPath(g,c)}if(a||SC.LAZY_INSTANTIATION[e]){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' found through other means, will attempt to load…".fmt(e))
}SC.BUNDLE_INFO[e]={loaded:YES};return SC.BUNDLE_INFO[e]}return NO},loadBundle:function(v,z,e){var t,w;
if(e===undefined&&SC.typeOf(z)===SC.T_FUNCTION){e=z;z=null}var o=SC.BUNDLE_INFO[v],y,x,c=SC.A(arguments).slice(3),k=SC.logBundleLoading;
if(k){console.log("SC.loadBundle(): Attempting to load '%@'".fmt(v))}if(!o){if(k){console.log("SC.loadBundle(): Attemping to load %@ without SC.BUNDLE_INFO entry… could be loaded through other means.".fmt(v))
}o=this.tryToLoadBundle(v,z,e,c)}if(!o){throw"SC.loadBundle(): could not find bundle '%@'".fmt(v)
}else{if(o.loaded){if(k){console.log("SC.loadBundle(): Bundle '%@' already loaded, skipping.".fmt(v))
}if(e){if(SC.isReady){SC._scb_bundleDidLoad(v,z,e,c)}else{SC.ready(SC,function(){SC._scb_bundleDidLoad(v,z,e,c)
})}}}else{if(k){console.log("SC.loadBundle(): Bundle '%@' is not loaded, loading now.".fmt(v))
}y=o.callbacks||[];if(e){y.push(function(){SC._scb_bundleDidLoad(v,z,e,c)});o.callbacks=y
}if(!o.loading){var b=o.requires||[];var h=YES;for(t=0,w=b.length;t<w;++t){var p=b[t];
var l=SC.BUNDLE_INFO[p];if(!l){throw"SC.loadBundle(): could not find required bundle '%@' for bundle '%@'".fmt(p,v)
}else{if(l.loading){h=NO;break}else{if(l.loaded){continue}else{h=NO;var s=l.dependents;
if(!s){l.dependents=s=[]}s.push(v);if(k){console.log("SC.loadBundle(): '%@' depends on '%@', loading dependency…".fmt(v,p))
}SC.loadBundle(p);break}}}}if(h){var m,f,g,a,i,n;i=document.getElementsByTagName("head")[0];
if(!i){i=document.documentElement}m=o.styles||[];for(t=0,w=m.length;t<w;++t){g=m[t];
if(g.length>0){a=document.createElement("link");a.setAttribute("href",g);a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");i.appendChild(a)}}var j=this._jsBundleLoadQueue;
if(!j){this._jsBundleLoadQueue=j={}}j[v]=[];var u=j[v];f=o.scripts||[];for(t=0,w=f.length;
t<w;++t){g=f[t];if(g.length>0){u.push(g)}}o.loading=YES;this.scriptDidLoad(v)}}}}},scriptDidLoad:function(c){var a=this._jsBundleLoadQueue;
if(a){var f=a[c];if(f){var b=f.shift();if(SC.logBundleLoading){console.log("SC.scriptDidLoad(): Loading next file in '%@' -> '%@'".fmt(c,b))
}var e=document.createElement("script");e.setAttribute("type","text/javascript");
e.setAttribute("src",b);document.body.appendChild(e)}}},bundleDidLoad:function(e){var h=SC.BUNDLE_INFO[e],f=SC.logBundleLoading,g,c;
if(!h){h=SC.BUNDLE_INFO[e]={loaded:YES};return}if(h.loaded&&f){console.log("SC.bundleDidLoad() called more than once for bundle '%@'. Skipping.".fmt(e));
return}delete h.loading;h.loaded=YES;if(SC.isReady){SC._invokeCallbacksForBundle(e)
}else{SC.ready(SC,function(){SC._invokeCallbacksForBundle(e)})}var i=h.dependents||[];
for(var b=0,a=i.length;b<a;++b){if(f){console.log("SC.loadBundle(): Bundle '%@' has completed loading, loading '%@' that depended on it.".fmt(e,i[b]))
}SC.loadBundle(i[b])}},_invokeCallbacksForBundle:function(c){var f=SC.BUNDLE_INFO[c],e;
if(!f){return}if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, invoking callbacks.".fmt(c))
}e=f.callbacks||[];SC.RunLoop.begin();for(var b=0,a=e.length;b<a;++b){e[b]()}SC.RunLoop.end()
}});SC.SCANNER_OUT_OF_BOUNDS_ERROR=new Error("Out of bounds.");SC.SCANNER_INT_ERROR=new Error("Not an int.");
SC.SCANNER_SKIP_ERROR=new Error("Did not find the string to skip.");SC.SCANNER_SCAN_ARRAY_ERROR=new Error("Did not find any string of the given array to scan.");
SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR=new Error("Can't compare the dates of two DateTimes that don't have the same timezone.");
SC.DATETIME_ISO8601="%Y-%m-%dT%H:%M:%S%Z";SC.Scanner=SC.Object.extend({string:null,scanLocation:0,scan:function(a){if(this.scanLocation+a>this.length){throw SC.SCANNER_OUT_OF_BOUNDS_ERROR
}var b=this.string.substr(this.scanLocation,a);this.scanLocation+=a;return b},scanInt:function(c,f){if(f===undefined){f=c
}var e=this.scan(f);var b=new RegExp("^\\d{"+c+","+f+"}");var a=e.match(b);if(!a){throw SC.SCANNER_INT_ERROR
}if(a[0].length<f){this.scanLocation+=a[0].length-f}return parseInt(a[0],10)},skipString:function(a){if(this.scan(a.length)!==a){throw SC.SCANNER_SKIP_ERROR
}return YES},scanArray:function(c){for(var b=0,a=c.length;b<a;b++){if(this.scan(c[b].length)===c[b]){return b
}this.scanLocation-=c[b].length}throw SC.SCANNER_SCAN_ARRAY_ERROR}});SC.DateTime=SC.Object.extend(SC.Freezable,SC.Copyable,{_ms:0,timezone:0,isFrozen:YES,adjust:function(b,a){var c;
b=b?SC.clone(b):{};c=(b.timezone!==undefined)?b.timezone:(this.timezone!==undefined)?this.timezone:0;
return this.constructor._adjust(b,this._ms,c,a)._createFromCurrentState()},advance:function(a){return this.constructor._advance(a,this._ms,this.timezone)._createFromCurrentState()
},unknownProperty:function(a){return this.constructor._get(a,this._ms,this.timezone)
},toFormattedString:function(a){return this.constructor._toFormattedString(a,this._ms,this.timezone)
},toISO8601:function(){return this.constructor._toFormattedString(SC.DATETIME_ISO8601,this._ms,this.timezone)
},toString:function(){return"UTC: "+new Date(this._ms).toUTCString()+", timezone: "+this.timezone
},isEqual:function(a){return SC.DateTime.compare(this,a)===0},copy:function(){return this
},toTimezone:function(a){if(a===undefined){a=0}return this.advance({timezone:a-this.timezone})
}});SC.DateTime.mixin(SC.Comparable,{recordFormat:SC.DATETIME_ISO8601,dayNames:"_SC.DateTime.dayNames".loc().w(),_englishDayNames:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".w(),abbreviatedDayNames:"_SC.DateTime.abbreviatedDayNames".loc().w(),monthNames:"_SC.DateTime.monthNames".loc().w(),abbreviatedMonthNames:"_SC.DateTime.abbreviatedMonthNames".loc().w(),_date:new Date(),_tz:0,timezone:new Date().getTimezoneOffset(),_dt_cache:{},_dt_cache_index:-1,_DT_CACHE_MAX_LENGTH:1000,_setCalcState:function(a,c){var b={milliseconds:this._date.getTime(),timezone:this._tz};
if(a!==undefined){this._date.setTime(a)}if(c!==undefined){this._tz=c}return b},_setCalcStateFromHash:function(c,b){var e=(b!==undefined)?b:this._tz;
var a=this._toMilliseconds(c,this._ms,e);return this._setCalcState(a,e)},_get:function(w,b,n){var l,t,h,o,e,j,k,f,p,a;
var c,i;var s=this._date;var q,g=null;q=this._setCalcState(b,n);if(w==="milliseconds"){g=s.getTime()
}else{if(w==="timezone"){g=this._tz}}if(g===null){p=w.slice(0,4);a=w.slice(4);if(p==="last"||p==="next"){c=this._get("dayOfWeek",b,n);
i=this._englishDayNames.indexOf(a);if(i>=0){var u=i-c;if(p==="last"&&u>=0){u-=7}if(p==="next"&&u<0){u+=7
}this._advance({day:u},b,n);g=this._createFromCurrentState()}}}if(g===null){if(n!==undefined){this._setCalcState(s.getTime()-(n*60000),0)
}switch(w){case"year":g=s.getUTCFullYear();break;case"month":g=s.getUTCMonth()+1;
break;case"day":g=s.getUTCDate();break;case"dayOfWeek":g=s.getUTCDay();break;case"hour":g=s.getUTCHours();
break;case"minute":g=s.getUTCMinutes();break;case"second":g=s.getUTCSeconds();break;
case"millisecond":g=s.getUTCMilliseconds();break}if((g===null)&&(w==="isLeapYear")){e=this._get("year");
g=(e%4===0&&e%100!==0)||e%400===0}if((g===null)&&(w==="daysInMonth")){switch(this._get("month")){case 4:case 6:case 9:case 11:g=30;
break;case 2:g=this._get("isLeapYear")?29:28;break;default:g=31;break}}if((g===null)&&(w==="dayOfYear")){l=s.getTime();
h=this._get("day");this._setCalcStateFromHash({day:1});for(o=this._get("month")-1;
o>0;o--){this._setCalcStateFromHash({month:o});h+=this._get("daysInMonth")}s.setTime(l);
g=h}if((g===null)&&(w.slice(0,4)==="week")){j=w.length===4?1:parseInt(w.slice("4"),10);
k=this._get("dayOfWeek");f=this._get("dayOfYear")-1;if(j===0){g=parseInt((f-k+7)/7,10)
}else{g=parseInt((f-(k-1+7)%7+7)/7,10)}}}this._setCalcState(q.milliseconds,q.timezone);
return g},_adjust:function(c,g,f,a){var e=c?SC.clone(c):{};var b=this._toMilliseconds(c,g,f,a);
this._setCalcState(b,f);return this},_advance:function(a,g,e){var c=a?SC.clone(a):{};
var f;for(var b in c){c[b]+=this._get(b,g,e)}f=(c.timezone!==undefined)?c.timezone:e;
return this._adjust(c,g,f,NO)},_toMilliseconds:function(j,c,h,f){var a=j?SC.clone(j):{};
var i=this._date;var g=i.getTime();var b,e;if(!SC.none(c)){i.setTime(c)}e=(h!==undefined)?h:(this.timezone!==undefined)?this.timezone:0;
i.setTime(i.getTime()-(e*60000));if(f===undefined||f===YES){if(!SC.none(a.hour)&&SC.none(a.minute)){a.minute=0
}if(!(SC.none(a.hour)&&SC.none(a.minute))&&SC.none(a.second)){a.second=0}if(!(SC.none(a.hour)&&SC.none(a.minute)&&SC.none(a.second))&&SC.none(a.millisecond)){a.millisecond=0
}}if(SC.none(a.year)){a.year=i.getUTCFullYear()}if(SC.none(a.month)){a.month=i.getUTCMonth()+1
}if(SC.none(a.day)){a.day=i.getUTCDate()}if(SC.none(a.hour)){a.hour=i.getUTCHours()
}if(SC.none(a.minute)){a.minute=i.getUTCMinutes()}if(SC.none(a.second)){a.second=i.getUTCSeconds()
}if(SC.none(a.millisecond)){a.millisecond=i.getUTCMilliseconds()}b=Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second,a.millisecond);
i.setTime(b+(e*60000));b=i.getTime();i.setTime(g);return b},create:function(){var j=arguments.length===0?{}:arguments[0];
var e;if(SC.typeOf(j)===SC.T_NUMBER){j={milliseconds:j}}e=(j.timezone!==undefined)?j.timezone:this.timezone;
if(e===undefined){e=0}if(!SC.none(j.milliseconds)){var i="nu"+j.milliseconds+e,a=this._dt_cache;
var f=a[i];if(!f){var g,h=this._dt_cache_index,b=this;f=a[i]=new b([{_ms:j.milliseconds,timezone:e}]);
h=this._dt_cache_index=(h+1)%this._DT_CACHE_MAX_LENGTH;g=a[h];if(g!==undefined&&a[g]){delete a[g]
}a[h]=i}return f}else{var c=new Date();return this.create({milliseconds:this._toMilliseconds(j,c.getTime(),e,j.resetCascadingly),timezone:e})
}},_createFromCurrentState:function(){return this.create({milliseconds:this._date.getTime(),timezone:this._tz})
},parse:function(o,c){var p=new RegExp("(?:%([aAbBcdHIjmMpSUWwxXyYZ%])|(.))","g");
var n,j,a={},b={},i=SC.Scanner.create({string:o});if(SC.none(c)){c=SC.DATETIME_ISO8601
}try{while((j=p.exec(c))!==null){switch(j[1]){case"a":b.dayOfWeek=i.scanArray(this.abbreviatedDayNames);
break;case"A":b.dayOfWeek=i.scanArray(this.dayNames);break;case"b":a.month=i.scanArray(this.abbreviatedMonthNames)+1;
break;case"B":a.month=i.scanArray(this.monthNames)+1;break;case"c":throw"%c is not implemented";
case"d":a.day=i.scanInt(1,2);break;case"H":a.hour=i.scanInt(1,2);break;case"I":a.hour=i.scanInt(1,2);
break;case"j":throw"%j is not implemented";case"m":a.month=i.scanInt(1,2);break;case"M":a.minute=i.scanInt(1,2);
break;case"p":a.meridian=i.scanArray(["AM","PM"]);break;case"S":a.second=i.scanInt(1,2);
break;case"U":throw"%U is not implemented";case"W":throw"%W is not implemented";case"w":throw"%w is not implemented";
case"x":throw"%x is not implemented";case"X":throw"%X is not implemented";case"y":a.year=i.scanInt(2);
a.year+=(a.year>70?1900:2000);break;case"Y":a.year=i.scanInt(4);break;case"Z":var g=i.scan(1);
if(g==="Z"){a.timezone=0}else{if(g==="+"||g==="-"){var k=i.scanInt(2);if(i.scan(1)!==":"){i.scan(-1)
}var f=i.scanInt(2);a.timezone=(g==="+"?-1:1)*(k*60+f)}}break;case"%":i.skipString("%");
break;default:i.skipString(j[0]);break}}}catch(l){console.log("SC.DateTime.createFromString "+l.toString());
return null}if(!SC.none(a.meridian)&&!SC.none(a.hour)){if(a.meridian===1){a.hour=(a.hour+12)%24
}delete a.meridian}n=SC.DateTime.create(a);if(!SC.none(b.dayOfWeek)&&n.get("dayOfWeek")!==b.dayOfWeek){return null
}return n},_pad:function(b,a){var c=""+b;if(a===undefined){a=2}while(c.length<a){c="0"+c
}return c},__toFormattedString:function(b,f,c){var a,e;switch(b[1]){case"a":return this.abbreviatedDayNames[this._get("dayOfWeek")];
case"A":return this.dayNames[this._get("dayOfWeek")];case"b":return this.abbreviatedMonthNames[this._get("month")-1];
case"B":return this.monthNames[this._get("month")-1];case"c":return this._date.toString();
case"d":return this._pad(this._get("day"));case"D":return this._get("day");case"h":return this._get("hour");
case"H":return this._pad(this._get("hour"));case"i":a=this._get("hour");return(a===12||a===0)?12:(a+12)%12;
case"I":a=this._get("hour");return this._pad((a===12||a===0)?12:(a+12)%12);case"j":return this._pad(this._get("dayOfYear"),3);
case"m":return this._pad(this._get("month"));case"M":return this._pad(this._get("minute"));
case"p":return this._get("hour")>11?"PM":"AM";case"S":return this._pad(this._get("second"));
case"u":return this._pad(this._get("utc"));case"U":return this._pad(this._get("week0"));
case"W":return this._pad(this._get("week1"));case"w":return this._get("dayOfWeek");
case"x":return this._date.toDateString();case"X":return this._date.toTimeString();
case"y":return this._pad(this._get("year")%100);case"Y":return this._get("year");
case"Z":e=-1*c;return(e>=0?"+":"-")+this._pad(parseInt(Math.abs(e)/60,10))+":"+this._pad(Math.abs(e)%60);
case"%":return"%"}},_toFormattedString:function(c,f,b){var a=this;var e=(b!==undefined)?b:(this.timezone!==undefined)?this.timezone:0;
this._setCalcState(f-(b*60000),0);return c.replace(/\%([aAbBcdDHiIjmMpSUWwxXyYZ\%])/g,function(){var g=a.__toFormattedString.call(a,arguments,f,b);
return g})},compare:function(e,c){var g=e.get("milliseconds");var f=c.get("milliseconds");
return g<f?-1:g===f?0:1},compareDate:function(e,c){if(e.get("timezone")!==c.get("timezone")){throw SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR
}var g=e.adjust({hour:0}).get("milliseconds");var f=c.adjust({hour:0}).get("milliseconds");
return g<f?-1:g===f?0:1}});SC.Binding.dateTime=function(a){return this.transform(function(b,c){return b?b.toFormattedString(a):null
})};if(SC.RecordAttribute&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}SC.BENCHMARK_LOG_READY=YES;sc_require("system/event");SC.mixin({_isReadyBound:NO,_bindReady:function(){if(this._isReadyBound){return
}this._isReadyBound=YES;if(document.addEventListener&&!SC.browser.opera){document.addEventListener("DOMContentLoaded",SC._didBecomeReady,NO)
}if(SC.browser.msie&&(window===top)){(function(){if(SC.isReady){return}try{document.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);return}SC._didBecomeReady()})()}if(SC.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(SC.isReady){return
}for(var a=0;a<document.styleSheets.length;a++){if(document.styleSheets[a].disabled){setTimeout(arguments.callee,0);
return}}SC._didBecomeReady()},NO)}if(SC.browser.safari&&SC.browser.safari<530){console.error("ready() is not yet supported on Safari 3.1 and earlier")
}SC.Event.add(window,"load",SC._didBecomeReady)},_readyQueue:[],_afterReadyQueue:[],isReady:NO,_didBecomeReady:function(){if(SC.isReady){return
}if(typeof SC.mapDisplayNames===SC.T_FUNCTION){SC.mapDisplayNames()}if(typeof SC.addInvokeOnceLastDebuggingInfo===SC.T_FUNCTION){SC.addInvokeOnceLastDebuggingInfo()
}SC.Locale.createCurrentLocale();if(document&&document.getElementsByTagName){var a=document.getElementsByTagName("body")[0];
if(a){var b=a.className;var c=SC.Locale.currentLanguage.toLowerCase();a.className=(b&&b.length>0)?[b,c].join(" "):c
}}SC.Benchmark.start("ready");SC.run(function(){var h,g,f,e;do{g=SC._readyQueue;SC._readyQueue=[];
for(f=0,e=g.length;f<e;f++){h=g[f];var i=h[0]||document;var j=h[1];if(j){j.call(i)
}}}while(SC._readyQueue.length>0);SC.isReady=YES;SC._readyQueue=null;SC.Event.trigger(document,"ready",null,NO);
if(SC.removeLoading){SC.$("#loading").remove()}if(SC.userDefaults.get("ready")){if((SC.mode===SC.APP_MODE)&&(typeof main!="undefined")&&(main instanceof Function)&&!SC.suppressMain){main()
}}else{SC.userDefaults.readyCallback(window,main)}},this);SC.Benchmark.end("ready");
if(SC.BENCHMARK_LOG_READY){SC.Benchmark.log()}},ready:function(b,c){var a=this._readyQueue;
if(c===undefined){c=b;b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!c){return this
}if(this.isReady){return c.call(b||document)}a.push([b,c]);return this}});SC._bindReady();
SC.removeLoading=YES;SC.APP_MODE="APP_MODE";SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;
require("system/ready");SC.CAPTURE_BACKSPACE_KEY=NO;SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create()},mainPane:null,makeMainPane:function(b){var a=this.get("mainPane");
if(a===b){return this}this.beginPropertyChanges();if(this.get("keyPane")===a){this.makeKeyPane(b)
}this.set("mainPane",b);if(a){a.blurMainTo(b)}if(b){b.focusMainFrom(a)}this.endPropertyChanges();
return this},menuPane:null,makeMenuPane:function(b){if(b&&!b.get("acceptsMenuPane")){return this
}else{var a=this.get("menuPane");if(a===b){return this}this.set("menuPane",b)}return this
},keyPane:null,previousKeyPanes:[],makeKeyPane:function(g){var f,a,e;if(g){if(!g.get("acceptsKeyPane")){return this
}else{a=this.get("keyPane");if(a===g){return this}else{if(a){e=this.get("previousKeyPanes");
e.push(a)}f=g}}}else{a=this.get("keyPane");e=this.get("previousKeyPanes");f=null;
while(e.length>0){var c=e.pop();if(c.get("isPaneAttached")&&c.get("acceptsKeyPane")){f=c;
break}}}if(!f){var b=this.get("mainPane");if(b&&b.get("acceptsKeyPane")){f=b}}if(a){a.willLoseKeyPaneTo(f)
}if(f){f.willBecomeKeyPaneFrom(a)}this.set("keyPane",f);if(f){f.didBecomeKeyPaneFrom(a)
}if(a){a.didLoseKeyPaneTo(f)}return this},currentWindowSize:null,computeWindowSize:function(){var c,b,a;
if(!this._bod||!this._docElement){b=document.body;a=document.documentElement;this._bod=b;
this._docElement=a}else{b=this._bod;a=this._docElement}if(window.innerHeight){c={width:window.innerWidth,height:window.innerHeight}
}else{if(a&&a.clientHeight){c={width:a.clientWidth,height:a.clientHeight}}else{if(b){c={width:b.clientWidth,height:b.clientHeight}
}}}return c},resize:function(){this._resize();return YES},_resize:function(){var b=this.computeWindowSize(),c=this.get("currentWindowSize");
this.set("currentWindowSize",b);if(!SC.rectsEqual(b,c)){if(SC.platform.touch){var a=SC.$(document.body);
if(b.height>=b.width){SC.device.set("orientation","portrait")}else{SC.device.set("orientation","landscape")
}}if(this.panes){SC.run(function(){this.panes.invoke("windowSizeDidChange",c,b)},this)
}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.run(function(){this.set("hasFocus",YES)},this)}return YES},focusin:function(){this.focus()
},focusout:function(){this.blur()},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.run(function(){this.set("hasFocus",NO)},this)}return YES},dragDidStart:function(a){this._mouseDownView=a;
this._drag=a},defaultResponder:null,sendAction:function(c,e,b,f,a){e=this.targetForAction(c,e,b,f);
if(e&&e.isResponderContext){return !!e.sendAction(c,b,a)}else{return e&&e.tryToPerform(c,b)
}},_responderFor:function(c,a){var b=c?c.get("defaultResponder"):null;if(c){c=c.get("firstResponder")||c;
do{if(c.respondsTo(a)){return c}}while((c=c.get("nextResponder")))}if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if(!b){return null}else{if(b.isResponderContext){return b}else{if(b.respondsTo(a)){return b
}else{return null}}}},targetForAction:function(b,f,e,g){if(!b||(SC.typeOf(b)!==SC.T_STRING)){return null
}if(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)||SC.objectForPropertyPath(f,e)
}if(f&&!f.isResponderContext){if(f.respondsTo&&!f.respondsTo(b)){f=null}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null
}}}return f}if(g){return this._responderFor(g,b)}var a=this.get("keyPane"),c=this.get("mainPane");
if(a&&(a!==g)){f=this._responderFor(a,b)}if(!f&&c&&(c!==a)){f=this._responderFor(c,b)
}if(!f&&(f=this.get("defaultResponder"))){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f);
if(f){this.set("defaultResponder",f)}}if(f&&!f.isResponderContext){if(f.respondsTo&&!f.respondsTo(b)){f=null
}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null}}}}return f},targetViewForEvent:function(a){return a.target?SC.$(a.target).view()[0]:null
},sendEvent:function(c,a,e){var f,b;SC.run(function(){if(e){f=e.get("pane")}else{f=this.get("menuPane")||this.get("keyPane")||this.get("mainPane")
}b=(f)?f.sendEvent(c,a,e):null},this);return b},listenFor:function(c,b,a){a=a?a:this;
c.forEach(function(e){var f=a[e];if(f){SC.Event.add(b,e,a,f)}},this);b=null;return a
},setup:function(){this.listenFor("touchstart touchmove touchend touchcancel".w(),document);
this.listenFor("keydown keyup beforedeactivate mousedown mouseup click dblclick mousemove selectstart contextmenu".w(),document).listenFor("resize".w(),window);
if(SC.browser.msie){this.listenFor("focusin focusout".w(),document)}else{this.listenFor("focus blur".w(),window)
}this.listenFor("webkitAnimationStart webkitAnimationIteration webkitAnimationEnd".w(),document);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var e=this;document.onkeypress=function(f){f=SC.Event.normalizeEvent(f);
return e.keypress.call(e,f)}}else{SC.Event.add(document,"keypress",this,this.keypress)
}}"drag selectstart".w().forEach(function(i){var j=this[i];if(j){if(SC.browser.msie){var f=this;
document.body["on"+i]=function(k){return j.call(f,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+i]=null})}else{SC.Event.add(document,i,this,j)
}}},this);var b=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";SC.Event.add(document,b,this,this.mousewheel);
if(SC.browser&&SC.platform&&SC.browser.mobileSafari&&!SC.platform.touch){SC.platform.simulateTouchEvents()
}this.set("currentWindowSize",this.computeWindowSize());this.focus();if(SC.browser.mobileSafari){var g=SC.RunLoop.prototype.endRunLoop,h;
h=function(){if(g){g.apply(this,arguments)}var l=SC.RootResponder.responder._touches,k,f,m,i,o,p=NO;
if(l){for(k in l){if(l[k]._rescuedElement){continue}m=f=l[k].target;while(f&&(f=f.parentNode)&&!p){p=(f===document.body)
}if(!p&&m){if(m.parentNode&&m.cloneNode){var n=m.cloneNode(true);m.parentNode.replaceChild(n,m);
m.swapNode=n}var j=SC.touchHoldingPen;if(!j){j=SC.touchHoldingPen=document.createElement("div");
j.style.display="none";document.body.appendChild(j)}j.appendChild(m);l[k]._rescuedElement=m
}}}};SC.RunLoop.prototype.endRunLoop=h}if(SC.platform.touch){var c=this.computeWindowSize(),a=SC.$(document.body);
if(c.height>=c.width){SC.device.set("orientation","portrait")}else{SC.device.set("orientation","landscape")
}}},_touchedViews:{},_touches:{},touchesForView:function(a){if(this._touchedViews[SC.guidFor(a)]){return this._touchedViews[SC.guidFor(a)].touches
}},averagedTouchesForView:function(g,f){var k=this.touchesForView(g);if((!k||k.length===0)&&!f){return{x:0,y:0,d:0,touchCount:0}
}var c;if(k){c=k.toArray()}else{c=[]}if(f){c.push(f)}var h,e=c.length,b,a=0,m=0,l,j,i=0;
for(h=0;h<e;h++){b=c[h];a+=b.pageX;m+=b.pageY}a/=e;m/=e;for(h=0;h<e;h++){b=c[h];l=Math.abs(b.pageX-a);
j=Math.abs(b.pageY-m);i+=Math.pow(l*l+j*j,0.5)}i/=e;return{x:a,y:m,d:i,touchCount:e}
},assignTouch:function(b,a){if(b.hasEnded){throw"Attemt to assign a touch that is already finished."
}if(b.view===a){return}if(b.view){this.unassignTouch(b)}if(!this._touchedViews[SC.guidFor(a)]){this._touchedViews[SC.guidFor(a)]={view:a,touches:SC.CoreSet.create([]),touchCount:0};
a.set("hasTouch",YES)}b.view=a;this._touchedViews[SC.guidFor(a)].touches.add(b);this._touchedViews[SC.guidFor(a)].touchCount++
},unassignTouch:function(c){var a,b;if(!c.view){return}a=c.view;b=this._touchedViews[SC.guidFor(a)];
b.touches.remove(c);b.touchCount--;if(b.touchCount<1){a.set("hasTouch",NO);b.view=null;
delete this._touchedViews[SC.guidFor(a)]}c.view=undefined},makeTouchResponder:function(g,f,c,l){var i=g.touchResponders,b;
if(g.touchResponder===f){return}var a;if(f){a=f.get("pane")}else{a=this.get("keyPane")||this.get("mainPane")
}if(i.indexOf(f)<0){if(l){try{f=(a)?a.sendEvent("touchStart",g,f):null}catch(h){SC.Logger.error("Error in touchStart: "+h);
f=null}}else{if((f.get?f.get("acceptsMultitouch"):f.acceptsMultitouch)||!f.hasTouch){if(!f.touchStart(g)){f=null
}}else{}}}if(!c||(i.indexOf(f)>-1&&i[i.length-1]!==f)){this.unassignTouch(g);var j=i.length-1,k=i[j];
while(k&&k!==f){b=this.touchesForView(k);if((k.get?k.get("acceptsMultitouch"):k.acceptsMultitouch)||!b){if(k.touchCancelled){k.touchCancelled(g)
}}j--;k=i[j];i.pop();g.touchResponder=i[j];g.nextTouchResponder=i[j-1]}}if(f){this.assignTouch(g,f);
if(f!==g.touchResponder){i.push(f);g.touchResponder=f;g.nextTouchResponder=i[i.length-2]
}}},captureTouch:function(i,f,h){if(!f){f=this}var g=i.targetView,c=g,e=[],b,a;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Received one touch on %@".fmt(g.toString()))
}while(c&&(c!==f)){e.unshift(c);c=c.get("nextResponder")}for(a=e.length,b=0;b<a;b++){c=e[b];
if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Checking %@ for captureTouch response…".fmt(c.toString()))
}if(c.tryToPerform("captureTouch",i)){if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Making %@ touch responder because it returns YES to captureTouch".fmt(c.toString()))
}this.makeTouchResponder(i,c,h,YES);return}}if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Didn't find a view that returned YES to captureTouch, so we're calling touchStart")
}this.makeTouchResponder(i,g,h,YES)},endMissingTouches:function(f){var b,a=f.length,e={},c=[];
for(b=0;b<a;b++){e[f[b].identifier]=YES}for(b in this._touches){var g=this._touches[b].identifier;
if(!e[g]){c.push(this._touches[b])}}for(b=0,a=c.length;b<a;b++){this.endTouch(c[b]);
this.finishTouch(c[b])}},_touchCount:0,endTouch:function(b,i,c){if(!i){i="touchEnd"
}var a,h,f,g;this.unassignTouch(b);if(b.touchResponder){g=b.touchResponder;h=b.touchResponders;
a=h.length-1;f=h[a];while(f){try{if(f[i]){f[i](b,c)}}catch(j){console.error("crashed on endTouch")
}if(b.touchResponder!==g){break}a--;f=h[a];i="touchCancelled"}}},finishTouch:function(b){var a;
this.unassignTouch(b);if(a=b._rescuedElement){if(a.swapNode&&a.swapNode.parentNode){a.swapNode.parentNode.replaceChild(a,a.swapNode)
}else{if(a.parentNode===SC.touchHoldingPen){SC.touchHoldingPen.removeChild(a)}}delete b._rescuedElement;
a.swapNode=null;a=null}b.touchResponders=null;b.touchResponder=null;b.nextTouchResponder=null;
b.hasEnded=YES;if(this._touches[b.identifier]){delete this._touches[b.identifier]
}},touchstart:function(a){var b=NO;SC.run(function(){this.endMissingTouches(a.touches);
var f,i=a.changedTouches,e=i.length,h,g,j,c;a.touchContext=this;for(f=0;f<e;f++){j=i[f];
c=SC.Touch.create(j,this);if(!c.targetView){continue}if(c.hidesTouchIntercept){b=YES
}c.timeStamp=a.timeStamp;this._touches[j.identifier]=c;c.event=a;this.captureTouch(c,this);
c.event=null}},this);if(b){return YES}return a.hasCustomEventHandling},touchmove:function(a){SC.run(function(){var c=a.changedTouches,b,o,m,g=c.length,l,k,j,n,h={},f,i,e=NO;
if(this._drag){b=SC.Touch.create(a.changedTouches[0],this);this._drag.tryToPerform("mouseDragged",b)
}for(m=0;m<g;m++){b=c[m];o=this._touches[b.identifier];if(!o){continue}if(o.hidesTouchIntercept){e=YES
}o.pageX=b.pageX;o.pageY=b.pageY;o.timeStamp=a.timeStamp;o.event=a;if(o.touchResponder){l=o.touchResponder;
i=SC.guidFor(l);if(!h[i]){h[i]={view:l,touches:[]}}h[i].touches.push(o)}}if(e){a.allowDefault();
return YES}for(m in h){l=h[m].view;k=h[m].touches;a.viewChangedTouches=k;j=this.touchesForView(l);
n=j.firstObject();a.pageX=n.pageX;a.pageY=n.pageY;a.touchContext=this;l.tryToPerform("touchesDragged",a,j)
}c=a.changedTouches;g=c.length;for(m=0;m<g;m++){b=c[m];o=this._touches[b.identifier];
o.event=null}},this);return a.hasCustomEventHandling},touchend:function(a){var b=NO;
SC.run(function(){var i=a.changedTouches,h,o,m,j=i.length,k,c,g=a.isCancel?"touchCancelled":"touchEnd",l,n,e,f;
for(m=0;m<j;m++){h=i[m];h.type="touchend";o=this._touches[h.identifier];if(!o){continue
}o.timeStamp=a.timeStamp;o.pageX=h.pageX;o.pageY=h.pageY;o.type="touchend";o.event=a;
if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("-- Received touch end")}if(o.hidesTouchIntercept){o.unhideTouchIntercept();
b=YES}if(this._drag){this._drag.tryToPerform("mouseUp",h);this._drag=null}this.endTouch(o,g,a);
this.finishTouch(o)}},this);if(b){return YES}return a.hasCustomEventHandling},touchcancel:function(a){a.isCancel=YES;
this.touchend(a)},attemptKeyEquivalent:function(b){var e=null;var c=b.commandCodes()[0];
if(!c){return NO}var g=this.get("menuPane"),a=this.get("keyPane"),f=this.get("mainPane");
if(g){e=g.performKeyEquivalent(c,b);if(e){return e}}if(a){e=a.performKeyEquivalent(c,b);
if(e||a.get("isModal")){return e}}if(!e&&f&&(f!==a)){e=f.performKeyEquivalent(c,b);
if(e||f.get("isModal")){return e}}return e},_lastModifiers:null,_handleModifierChanges:function(b){var a;
a=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});var c=false;
if(b.altKey!==a.alt){a.alt=b.altKey;c=true}if(b.ctrlKey!==a.ctrl){a.ctrl=b.ctrlKey;
c=true}if(b.shiftKey!==a.shift){a.shift=b.shiftKey;c=true}b.modifiers=a;return(c)?(this.sendEvent("flagsChanged",b)?b.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(a){return !!(a.altKey||a.ctrlKey||a.metaKey||((a.charCode!==a.which)&&SC.FUNCTION_KEYS[a.which]))
},_isModifierKey:function(a){return !!SC.MODIFIER_KEYS[a.charCode]},keydown:function(a){if(SC.none(a)){return YES
}var f=a.keyCode;if(f===229){this._IMEInputON=YES;return this.sendEvent("keyDown",a)
}if(f===27&&this._drag){this._drag.cancelDrag();this._drag=null;this._mouseDownView=null;
return YES}if(SC.browser.mozilla&&(a.which===8)){return true}var b=this._handleModifierChanges(a),e=a.target||a.srcElement,c=(a.which===8)&&!SC.allowsBackspaceToPreviousPage&&(e===document.body);
if(this._isModifierKey(a)){return(c?NO:b)}b=YES;if(this._isFunctionOrNonPrintableKey(a)){if(f>=37&&f<=40&&SC.browser.mozilla){return YES
}b=this.sendEvent("keyDown",a);if(!b){b=!this.attemptKeyEquivalent(a)}else{b=a.hasCustomEventHandling;
if(b){c=NO}}}return c?NO:b},keypress:function(b){var c,f=b.keyCode,g=!!SC.browser.mozilla;
if(g&&(b.which===8)){b.which=f;c=this.sendEvent("keyDown",b);return c?(SC.allowsBackspaceToPreviousPage||b.hasCustomEventHandling):YES
}else{var e=(f>=37&&f<=40&&g),a=b.charCode;if((a!==undefined&&a===0)&&!e){return YES
}if(e){b.which=f}return this.sendEvent("keyDown",b)?b.hasCustomEventHandling:YES}},keyup:function(a){if(this._ffevt){this._ffevt=null
}var b=this._handleModifierChanges(a);if(this._isModifierKey(a)){return b}if(this._IMEInputON&&a.keyCode===13){a.isIMEInput=YES;
this.sendEvent("keyDown",a);this._IMEInputON=NO}return this.sendEvent("keyUp",a)?a.hasCustomEventHandling:YES
},beforedeactivate:function(c){var b=c.toElement;if(b&&b.tagName&&b.tagName!=="IFRAME"){var a=SC.$(b).view()[0];
if(a&&a.get("blocksIEDeactivate")){return NO}}return YES},mousedown:function(f){if(SC.platform.touch){f.allowDefault();
return YES}if(!SC.browser.msie){window.focus()}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>200)){this._clickCount=1
}else{var e=this._lastMouseDownX-f.clientX,a=this._lastMouseDownY-f.clientY,g=Math.sqrt(e*e+a*a);
if(g>8){this._clickCount=1}}f.clickCount=this._clickCount;this._lastMouseDownX=f.clientX;
this._lastMouseDownY=f.clientY;var c,b=this.targetViewForEvent(f);if(b){c=b.getPath("pane.firstResponder")
}if(c&&c.kindOf(SC.InlineTextFieldView)&&c!==b){c.resignFirstResponder()}b=this._mouseDownView=this.sendEvent("mouseDown",f,b);
if(b&&b.respondsTo("mouseDragged")){this._mouseCanDrag=YES}return b?f.hasCustomEventHandling:YES
},mouseup:function(b){if(SC.platform.touch){b.allowDefault();return YES}this.targetViewForEvent(b);
if(this._drag){this._drag.tryToPerform("mouseUp",b);this._drag=null}var e=null,a=this._mouseDownView,c=this.targetViewForEvent(b);
this._lastMouseUpAt=Date.now();b.clickCount=this._clickCount;if(a){e=this.sendEvent("mouseUp",b,a);
if(!e&&(this._clickCount===2)){e=this.sendEvent("doubleClick",b,a)}if(!e){e=this.sendEvent("click",b,a)
}}if(!e){if(this._clickCount===2){e=this.sendEvent("doubleClick",b,c)}if(!e){e=this.sendEvent("click",b,c)
}}this._mouseCanDrag=NO;this._mouseDownView=null;return(e)?b.hasCustomEventHandling:YES
},dblclick:function(a){if(SC.browser.isIE){this._clickCount=2;this.mouseup(a)}},mousewheel:function(b){var a=this.targetViewForEvent(b),c=this.sendEvent("mouseWheel",b,a);
return(c)?b.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(a){if(SC.platform.touch){a.allowDefault();
return YES}if(SC.browser.msie){if(this._lastMoveX===a.clientX&&this._lastMoveY===a.clientY){return
}}this._lastMoveX=a.clientX;this._lastMoveY=a.clientY;SC.run(function(){if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==a.clientX||this._lastMouseDownY!==a.clientY){this._drag.tryToPerform("mouseDragged",a)
}}else{this._drag.tryToPerform("mouseDragged",a)}}else{var e=this._lastHovered||[],f=[],h,g,b,c=this.targetViewForEvent(a);
while(c&&(c!==this)){f.push(c);c=c.get("nextResponder")}for(g=0,b=e.length;g<b;g++){c=e[g];
h=c.respondsTo("mouseExited");if(h&&f.indexOf(c)===-1){c.tryToPerform("mouseExited",a)
}}for(g=0,b=f.length;g<b;g++){c=f[g];if(e.indexOf(c)!==-1){c.tryToPerform("mouseMoved",a)
}else{c.tryToPerform("mouseEntered",a)}}this._lastHovered=f;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==a.clientX&&this._lastMouseDownY!==a.clientY){this._mouseDownView.tryToPerform("mouseDragged",a)
}}else{this._mouseDownView.tryToPerform("mouseDragged",a)}}}},this)},_mouseCanDrag:YES,selectstart:function(b){var c=this.targetViewForEvent(b),a=this.sendEvent("selectStart",b,c);
if(c&&c.respondsTo("mouseDragged")){return(a!==null?YES:NO)&&!this._mouseCanDrag}else{return(a!==null?YES:NO)
}},drag:function(){return false},contextmenu:function(b){var a=this.targetViewForEvent(b);
return this.sendEvent("contextMenu",b,a)},webkitAnimationStart:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidStart",b,a)}catch(c){console.warn("Exception during animationDidStart: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES},webkitAnimationIteration:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidIterate",b,a)}catch(c){console.warn("Exception during animationDidIterate: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES},webkitAnimationEnd:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidEnd",b,a)}catch(c){console.warn("Exception during animationDidEnd: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES}});SC.Touch=function(e,a){this.touchContext=a;
this.identifier=e.identifier;var c=e.target,b;if(c&&SC.$(c).hasClass("touch-intercept")){e.target.style.webkitTransform="translate3d(0px,-5000px,0px)";
c=document.elementFromPoint(e.pageX,e.pageY);if(c){b=SC.$(c).view()[0]}this.hidesTouchIntercept=NO;
if(c.tagName==="INPUT"){this.hidesTouchIntercept=e.target}else{e.target.style.webkitTransform="translate3d(0px,0px,0px)"
}}else{b=e.target?SC.$(e.target).view()[0]:null}this.targetView=b;this.target=c;this.hasEnded=NO;
this.type=e.type;this.clickCount=1;this.view=undefined;this.touchResponder=this.nextTouchResponder=undefined;
this.touchResponders=[];this.startX=this.pageX=e.pageX;this.startY=this.pageY=e.pageY
};SC.Touch.prototype={unhideTouchIntercept:function(){var a=this.hidesTouchIntercept;
if(a){setTimeout(function(){a.style.webkitTransform="translate3d(0px,0px,0px)"},500)
}},allowDefault:function(){if(this.event){this.event.hasCustomEventHandling=YES}},preventDefault:function(){if(this.event){this.event.preventDefault()
}},stopPropagation:function(){if(this.event){this.event.stopPropagation()}},stop:function(){if(this.event){this.event.stop()
}},end:function(){this.touchContext.endTouch(this)},makeTouchResponder:function(b,c,a){this.touchContext.makeTouchResponder(this,b,c,a)
},captureTouch:function(a,b){this.touchContext.captureTouch(this,a,b)},touchesForView:function(a){return this.touchContext.touchesForView(a)
},touchesForResponder:function(a){return this.touchContext.touchesForView(a)},averagedTouchesForView:function(a,b){return this.touchContext.averagedTouchesForView(a,(b?this:null))
}};SC.mixin(SC.Touch,{create:function(b,a){return new SC.Touch(b,a)}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var a;
a=SC.RootResponder.responder=SC.RootResponder.create();a.setup()});SC.platform={touch:("createTouch" in document)&&!navigator.userAgent.match("Chrome/9"),bounceOnScroll:(/iPhone|iPad|iPod/).test(navigator.platform),pinchToZoom:(/iPhone|iPad|iPod/).test(navigator.platform),input:function(e){var f={},c=e.length,g=document.createElement("input"),b,a;
for(a=0;a<c;a++){b=e[a];f[b]=!!(b in g)}return f}(("autocomplete readonly list size required multiple maxlength pattern min max step placeholder").w()),standalone:!!navigator.standalone,cssPrefix:null,domCSSPrefix:null,simulateTouchEvents:function(){if(this.touch){SC.Logger.info("Can't simulate touch events in an environment that supports them.");
return}SC.platform.touch=YES;document.body.className=document.body.className+" touch";
this._simtouch_counter=1;this.removeEvents("click dblclick mouseout mouseover mousewheel".w());
this.replaceEvent("mousemove",this._simtouch_mousemove);this.replaceEvent("mousedown",this._simtouch_mousedown);
this.replaceEvent("mouseup",this._simtouch_mouseup)},removeEvents:function(e){var b,a=e.length,c;
for(b=0;b<a;b++){c=e[b];SC.Event.remove(document,c,SC.RootResponder.responder,SC.RootResponder.responder[c])
}},replaceEvent:function(a,b){SC.Event.remove(document,a,SC.RootResponder.responder,SC.RootResponder.responder[a]);
SC.Event.add(document,a,this,b)},_simtouch_mousemove:function(a){if(!this._mousedown){return NO
}var b=this.manufactureTouchEvent(a,"touchmove");return SC.RootResponder.responder.touchmove(b)
},_simtouch_mousedown:function(a){this._mousedown=YES;var b=this.manufactureTouchEvent(a,"touchstart");
return SC.RootResponder.responder.touchstart(b)},_simtouch_mouseup:function(a){var c=this.manufactureTouchEvent(a,"touchend"),b=SC.RootResponder.responder.touchend(c);
this._mousedown=NO;this._simtouch_counter++;return b},manufactureTouchEvent:function(a,c){var e,b=this._simtouch_counter;
e={type:c,target:a.target,identifier:b,pageX:a.pageX,pageY:a.pageY,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY};
a.changedTouches=a.touches=[e];return a},supportsCSSTransitions:NO,supportsCSSTransforms:NO,understandsCSS3DTransforms:NO,supportsCSS3DTransforms:NO,supportsAcceleratedLayers:NO,supportsHashChange:function(){return("onhashchange" in window)&&(document.documentMode===undefined||document.documentMode>7)
}()};(function(){var a=navigator.userAgent.toLowerCase();if((/webkit/).test(a)){SC.platform.cssPrefix="webkit";
SC.platform.domCSSPrefix="Webkit"}else{if((/opera/).test(a)){SC.platform.cssPrefix="opera";
SC.platform.domCSSPrefix="O"}else{if((/msie/).test(a)&&!(/opera/).test(a)){SC.platform.cssPrefix="ms";
SC.platform.domCSSPrefix="ms"}else{if((/mozilla/).test(a)&&!(/(compatible|webkit)/).test(a)){SC.platform.cssPrefix="moz";
SC.platform.domCSSPrefix="Moz"}}}}})();(function(){var e=document.createElement("div");
var f=["-moz-","-moz-","-o-","-ms-","-webkit-"];var a=["moz","Moz","o","ms","webkit"];
var c="",b=null;for(b=0;b<f.length;b++){c+=f[b]+"transition:all 1s linear;";c+=f[b]+"transform: translate(1px, 1px);";
c+=f[b]+"perspective: 500px;"}e.style.cssText=c;for(b=0;b<a.length;b++){if(e.style[a[b]+"TransitionProperty"]!==undefined){SC.platform.supportsCSSTransitions=YES
}if(e.style[a[b]+"Transform"]!==undefined){SC.platform.supportsCSSTransforms=YES}if(e.style[a[b]+"Perspective"]!==undefined||e.style[a[b]+"PerspectiveProperty"]!==undefined){SC.platform.understandsCSS3DTransforms=YES;
SC.platform.supportsCSS3DTransforms=YES}}if(window.media&&window.media.matchMedium){if(!window.media.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}else{if(window.styleMedia&&window.styleMedia.matchMedium){if(!window.styleMedia.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}}if(SC.platform.supportsCSSTransforms&&SC.platform.cssPrefix==="webkit"){SC.platform.supportsAcceleratedLayers=YES
}})();require("system/ready");require("system/root_responder");require("system/platform");
SC.device=SC.Object.create({orientation:"desktop",isOffline:NO,mouseLocation:function(){var a=SC.RootResponder.responder,c=a._lastMoveX,b=a._lastMoveY;
if(SC.empty(c)||SC.empty(b)){return null}return{x:c,y:b}}.property(),init:function(){arguments.callee.base.apply(this,arguments);
if(SC.platform.touch){this.orientationchange()}if(navigator&&navigator.onLine===false){this.set("isOffline",YES)
}this.panes=SC.Set.create()},setup:function(){var a=SC.RootResponder.responder;a.listenFor("orientationchange".w(),window,this);
a.listenFor("online offline".w(),document,this)},orientationchange:function(a){if(window.orientation===0||window.orientation===180){this.set("orientation","portrait")
}else{this.set("orientation","landscape")}},orientationObserver:function(){var a=SC.$(document.body),b=this.get("orientation");
if(b==="portrait"){a.setClass("portrait",YES);a.setClass("landscape",NO)}if(b==="landscape"){a.setClass("portrait",NO);
a.setClass("landscape",YES)}}.observes("orientation"),online:function(a){this.set("isOffline",NO)
},offline:function(a){this.set("isOffline",YES)}});SC.ready(function(){SC.device.setup()
});SC.ExceptionHandler={handleException:function(a){if(this.isShowingErrorDialog){return
}this._displayErrorDialog(a)},_displayErrorDialog:function(b){var a=this._errorDialogHTMLForException(b),c=document.createElement("div");
c.style.cssText="left: 0px; right: 0px; top: 0px; bottom: 0px; position: absolute; background-color: white; background-color: rgba(255,255,255,0.6); z-index:100;";
c.innerHTML=a;document.body.appendChild(c);this.isShowingErrorDialog=YES},_errorDialogHTMLForException:function(b){var a;
a=['<div id="sc-error-dialog" style="position: absolute; width: 500px; left: 50%; top: 50%; margin-left: -250px; background-color: white; border: 1px solid black; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; padding: 10px">',"An error has occurred which prevents the application from running:","<br><br>",b.message,'<div id="sc-error-dialog-reload-button" onclick="window.location.reload();" style="float: right; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; border: 1px solid black; padding: 3px; clear: both; margin-top: 20px; cursor: pointer;">',"Reload","</div>","</div>"];
return a.join("")},isShowingErrorDialog:NO};sc_require("system/locale");SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageCache=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,f,g,e){var b=SC.typeOf(f);
if(SC.none(g)&&SC.typeOf(f)===SC.T_FUNCTION){f=null;g=f}if(SC.typeOf(g)===SC.T_STRING){g=f[g]
}if(SC.none(e)){e=SC.none(f)&&SC.none(g)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(g){g.call(f||c.image,c.url,c.image)
}}else{if(f||g){this._addCallback(c,f,g)}c.retainCount++;this._scheduleImageEntry(c,e)
}},releaseImage:function(a,e,f){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(e||f){var b=SC.typeOf(e);if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;
f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]}this._removeCallback(c,e,f)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;b.onabort=this._imageDidAbort;b.onerror=this._imageDidError;
b.onload=this._imageDidLoad;b.src=c.url;this._loading.push(c);this.incrementProperty("activeRequests");
this.loadNextImage()}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var e=this._images[c];
if(!e&&a){var b=new Image();e=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=e}return e},_deleteEntry:function(a){this._unscheduleImageEntry(a);delete this._images[a.url]
},_addCallback:function(c,e,f){var b=c.callbacks;var a=b.find(function(g){return g[0]===e&&g[1]===f
},this);if(!a){b.push([e,f])}b=null;return this},_removeCallback:function(b,c,e){var a=b.callbacks;
a.forEach(function(g,f){if(g[0]===c&&g[1]===e){a[f]=null}},this);a=null;return this
},_scheduleImageEntry:function(e,c){var b=this._backgroundQueue;var f=this._foregroundQueue;
if(e.status===this.IMAGE_LOADED){return this}if((e.status===this.IMAGE_QUEUED)&&!c&&e.isBackground){b[b.indexOf(e)]=null;
e.status=this.IMAGE_WAITING}if(e.status!==this.IMAGE_QUEUED){var a=(c)?b:f;a.push(e);
e.status=this.IMAGE_QUEUED;e.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUED){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){if(a.image){a.image.abort()}this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.run(function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ABORTED)
},this)},_imageDidError:function(){SC.run(function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ERROR)
},this)},_imageDidLoad:function(){SC.run(function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.LOADED)
},this)},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var e;switch(a){case this.LOADED:e=c.image;
break;case this.ABORTED:e=SC.IMAGE_ABORTED_ERROR;break;case this.ERROR:e=SC.IMAGE_FAILED_ERROR;
break;default:e=SC.IMAGE_FAILED_ERROR;break}c.callbacks.forEach(function(g){var h=g[0],i=g[1];
i.call(h,b,e)},this);c.callbacks=[];c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var f=c.image;if(f){f.onload=f.onerror=f.onabort=null;if(a!==this.LOADED){c.image=null
}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.json={encode:function(a){return JSON.stringify(a)},decode:function(a){return JSON.parse(a)
}};if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}());SC.Math=SC.Object.create({near:function(c,b,a){if(!a){a=0.00001}return Math.abs(c-b)<=a
},round:function(e,a){if(!a){a=0}var b=Math.pow(10,a);if(a<0){var c=b.toString();
b=c.substring(0,c.indexOf("1")+1)}e=e.valueOf();return Math.round(e*b)/b}});SC.Page=SC.Object.extend({owner:null,get:function(a){var b=this[a];
if(b&&b.isClass){this[a]=b=b.create({page:this});if(!this.get("inDesignMode")){b.awake()
}return b}else{return arguments.callee.base.apply(this,arguments)}},awake:function(){var b,a;
for(a in this){if(!this.hasOwnProperty(a)){continue}b=this[a];if(b&&b.isViewClass){this[a]=b=b.create({page:this})
}}return this},getIfConfigured:function(b){var a=this[b];return(a&&a.isViewClass)?null:this.get(b)
},loc:function(c){var a,b;for(b in c){if(!c.hasOwnProperty(b)){continue}a=this[b];
if(!a||!a.isViewClass){continue}a.loc(c[b])}return this}});SC.Page.design=SC.Page.create;
SC.Page.localization=function(a){return a};sc_require("system/builder");SC.MODE_REPLACE="replace";
SC.MODE_APPEND="append";SC.MODE_PREPEND="prepend";SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(f,e){var b,a;
if(e){this.prevObject=e;this.strings=e.strings;this.offset=e.length+e.offset}if(!this.strings){this.strings=[]
}if(f===undefined){f="div";a=YES}else{if(f==="div"||f==="label"||f==="a"){a=YES}else{if(SC.typeOf(f)===SC.T_STRING){f=f.toLowerCase();
a=YES}}}if(a){this._tagName=f;this._needsTag=YES;this.needsContent=YES;var g=this;
while(g){g.length++;g=g.prevObject}this.strings.push(null);this._selfClosing=this.SELF_CLOSING.contains(f)
}else{this._elem=f;this._needsTag=NO;this.length=0;this.needsContent=NO}return this
},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(b){var a=this.strings||[];
return(b===undefined)?a.slice(this.offset,this.length):a[b+this.offset]},push:function(e){var b=this.strings,a=arguments.length;
if(!b){this.strings=b=[]}if(a>1){b.push.apply(b,arguments)}else{b.push(e)}var f=this;
while(f){f.length+=a;f=f.prevObject}this.needsContent=YES;return this},text:function(c){var b=arguments.length,a=0;
for(a=0;a<b;a++){this.push(SC.RenderContext.escapeHTML(arguments[a]))}return this
},join:function(b){if(this._needsTag){this.end()}var a=this.strings;return a?a.join(b||""):""
},begin:function(a){return SC.RenderContext(a,this)},element:function(){if(this._elem){return this._elem
}var a=SC.RenderContext,b=a.factory,c,e;if(!b){b=a.factory=document.createElement("div")
}b.innerHTML=this.join();if(SC.browser.msie){if(b.innerHTML.length>0){e=b.firstChild.cloneNode(true);
b.innerHTML=""}else{e=null}}else{e=b.firstChild}return e},remove:function(a){if(!a){return
}var b,c=this._elem;if(!c||!c.removeChild){return}b=document.getElementById(a);if(b){b=c.removeChild(b);
b=null}},update:function(){var a=this._elem,f=this.updateMode,h,l,j,g,n,c,k,e,i;this._innerHTMLReplaced=NO;
if(!a){return}h=SC.$(a);if(this.length>0){this._innerHTMLReplaced=YES;if(f===SC.MODE_REPLACE){a.innerHTML=this.join()
}else{c=a.cloneNode(false);c.innerHTML=this.join();i=(f===SC.MODE_APPEND)?null:a.firstChild;
k=c.firstChild;while(k){e=k.nextSibling;a.insertBefore(k,e);k=e}k=e=c=i=null}}if(this._attrsDidChange&&(j=this._attrs)){for(l in j){if(!j.hasOwnProperty(l)){continue
}g=j[l];if(g===null){a.removeAttribute(l)}else{h.attr(l,g)}}}if(this._classNamesDidChange&&(j=this._classNames)){h.attr("class",j.join(" "))
}if(this._idDidChange&&(j=this._id)){h.attr("id",j)}if(this._stylesDidChange&&(n=this._styles)){var b=this._STYLE_PAIR_ARRAY,m=this._JOIN_ARRAY;
for(l in n){if(!n.hasOwnProperty(l)){continue}j=n[l];if(j===null){continue}if(typeof j===SC.T_NUMBER&&l!=="zIndex"){j+="px"
}b[0]=this._dasherizeStyleName(l);b[1]=j;m.push(b.join(": "))}h.attr("style",m.join("; "));
m.length=0}a=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var n=this._TAG_ARRAY,b,l,j,h,k=this._attrs,e=this._classNames,a=this._id,m=this._styles;
n[0]="<";n[1]=this._tagName;if(k||e||m||a){if(!k){k=this._DEFAULT_ATTRS}if(a){k.id=a
}if(e){k["class"]=e.join(" ")}if(m){l=this._JOIN_ARRAY;b=this._STYLE_PAIR_ARRAY;for(j in m){if(!m.hasOwnProperty(j)){continue
}h=m[j];if(h===null){continue}if(!isNaN(h)&&j!=="zIndex"){h+="px"}b[0]=this._dasherizeStyleName(j);
b[1]=h;l.push(b.join(": "))}k.style=l.join("; ");l.length=0}n.push(" ");for(j in k){if(!k.hasOwnProperty(j)){continue
}h=k[j];if(h===null){continue}n.push(j,'="',h,'" ')}if(k===this._DEFAULT_ATTRS){delete k.style;
delete k["class"];delete k.id}}var i=this.strings;var g=(this._selfClosing===NO)?NO:(this.length===1);
n.push(g?" />":">");i[this.offset]=n.join("");n.length=0;if(!g){n[0]="</";n[1]=this._tagName;
n[2]=">";i.push(n.join(""));var f=this;while(f){f.length++;f=f.prevObject}n.length=0
}this._elem=null;return this.prevObject||this},tag:function(a,b){return this.begin(a,b).end()
},tagName:function(a){if(a===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=a;this._tagNameDidChange=YES;return this
}},id:function(a){if(a===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=a;this._idDidChange=YES;return this}},classNames:function(b,a){if(b===undefined){if(!this._classNames&&this._elem){this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();this._cloneClassNames=NO
}if(!this._classNames){this._classNames=[]}return this._classNames}else{this._classNames=b;
this._cloneClassNames=a||NO;this._classNamesDidChange=YES;return this}},hasClass:function(a){return this.classNames().indexOf(a)>=0
},addClass:function(e){if(e===undefined||e===null){console.warn("You are adding an undefined or empty class"+this.toString());
return this}var f=this.classNames();if(SC.typeOf(e)===SC.T_STRING){if(f.indexOf(e)<0){f.push(e);
this._classNamesDidChange=YES}}else{for(var c=0,a=e.length;c<a;c++){var b=e[c];if(f.indexOf(b)<0){f.push(b);
this._classNamesDidChange=YES}}}return this},removeClass:function(b){var c=this._classNames,a;
if(!c&&this._elem){c=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(c&&(a=c.indexOf(b))>=0){if(this._cloneClassNames){c=this._classNames=c.slice();
this._cloneClassNames=NO}c[a]=null;this._classNamesDidChange=YES}return this},resetClassNames:function(){this._classNames=[];
this._classNamesDidChange=YES;return this},setClass:function(e,c){var g,a,b,f;if(c!==undefined){return c?this.addClass(e):this.removeClass(e)
}else{g=this._classNames;if(!g&&this._elem){g=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(!g){g=this._classNames=[]}if(this._cloneClassNames){g=this._classNames=g.slice();
this._cloneClassNames=NO}f=NO;for(b in e){if(!e.hasOwnProperty(b)){continue}a=g.indexOf(b);
if(e[b]){if(a<0){g.push(b);f=YES}}else{if(a>=0){g[a]=null;f=YES}}}if(f){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(e,f){var a,c,b;
if(e===undefined){if(!this._styles&&this._elem){a=SC.$(this._elem).attr("style");
if(a&&(a=a.toString()).length>0){if(SC.browser.msie){a=a.toLowerCase()}e={};c=this._STYLE_REGEX;
c.lastIndex=0;while(b=c.exec(a)){e[this._camelizeStyleName(b[1])]=b[2]}this._styles=e;
this._cloneStyles=NO}else{this._styles={}}}else{if(!this._styles){this._styles={}
}else{if(this._cloneStyles){this._styles=SC.beget(this._styles);this._cloneStyles=NO
}}}return this._styles}else{this._styles=e;this._cloneStyles=f||NO;this._stylesDidChange=YES;
return this}},addStyle:function(a,f){var b,e=NO,c=this.styles();if(typeof a===SC.T_STRING){if(f===undefined){return c[a]
}else{if(c[a]!==f){c[a]=f;this._stylesDidChange=YES}}}else{for(b in a){if(!a.hasOwnProperty(b)){continue
}f=a[b];if(c[b]!==f){c[b]=f;e=YES}}if(e){this._stylesDidChange=YES}}return this},removeStyle:function(a){if(!this._styles&&!this._elem){return this
}var b=this.styles();if(b[a]){b[a]=null;this._stylesDidChange=YES}},attr:function(a,f){var c,b=this._attrs,e=NO;
if(!b){this._attrs=b={}}if(typeof a===SC.T_STRING){if(f===undefined){return b[a]}else{if(b[a]!==f){b[a]=f;
this._attrsDidChange=YES}}}else{for(c in a){if(!a.hasOwnProperty(c)){continue}f=a[c];
if(b[c]!==f){b[c]=f;e=YES}}if(e){this._attrsDidChange=YES}}return this},_camelizeStyleName:function(a){var b=a.match(/^-(webkit|moz|o)-/),c=a.camelize();
if(b){return c.substr(0,1).toUpperCase()+c.substr(1)}else{return c}},_dasherizeStyleName:function(a){var b=a.dasherize();
if(b.match(/^(webkit|moz|ms|o)-/)){b="-"+b}return b}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;
SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(e){var c,b,a;if(SC.none(e)){return e}c=this.escapeHTMLElement;
if(!c){c=this.escapeHTMLElement=document.createElement("div")}b=this.escapeTextNode;
if(!b){b=this.escapeTextNode=document.createTextNode("");c.appendChild(b)}b.data=e;
a=c.innerHTML;if(SC.RenderContext._safari3){a=a.replace(/>/g,"&gt;")}b=c=null;return a
};SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,timedOut:null,timeoutTimer:null,fire:function(){var a=this.get("request"),c=a?a.get("source"):null;
if(c&&c.willSend){c.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}var b=a.get("timeout");if(b){var e=SC.Timer.schedule({target:this,action:"timeoutReached",interval:b,repeats:NO});
this.set("timeoutTimer",e)}if(!this.get("isCancelled")&&c&&c.didSend){c.didSend(a,this)
}},invokeTransport:function(){this.receive(function(a){this.set("status",200)},this)
},receive:function(f,a){if(!this.get("timedOut")){var e=this.get("timeoutTimer");
if(e){e.invalidate()}this.set("timedOut",NO);var b=this.get("request");var c=b?b.get("source"):null;
SC.run(function(){if(c&&c.willReceive){c.willReceive(b,this)}f.call(a,!this.get("isCancelled"));
if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)}if(!this.get("isCancelled")){this.notify()
}},this)}SC.Request.manager.transportDidClose(this);return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},timeoutReached:function(){if(this.get("timedOut")===null){this.set("timedOut",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this);var a=SC.$error("HTTP Request timed out","Request",408);
a.set("errorValue",this);this.set("isError",YES);this.set("errorObject",a);var b=this.get("request");
var c=b?b.get("source"):null;if(!this.get("isCancelled")&&c&&c.didTimeout){c.didTimeout(b,this)
}}},cancelTransport:function(){},_notifyListener:function(b,a){var f=b[a],g,e,c;if(!f){return NO
}g=(f.params||[]).copy();g.unshift(this);e=f.target;c=f.action;if(SC.typeOf(c)===SC.T_STRING){c=e[c]
}return c.apply(e,g)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,e=NO;
if(!b){return this}e=this._notifyListener(b,a);if(!e){e=this._notifyListener(b,c)
}if(!e){e=this._notifyListener(b,0)}return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(h){var e=h.indexOf(":"),f,g;if(e>=0){f=h.slice(0,e);
g=h.slice(e+1).trim();a[f]=g}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var e,h,b,c,g;
function f(){for(var j=0;j<arguments.length;j++){try{var k=arguments[j]();return k
}catch(l){}}return NO}e=f(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")});this.set("rawRequest",e);
c=!!this.getPath("request.isAsynchronous");if(c){if(!SC.browser.msie&&!SC.browser.opera){SC.Event.add(e,"readystatechange",this,this.finishRequest,e)
}else{h=this;b=function(){if(!h){return null}var i=h.finishRequest();if(i){h=null
}return i};e.onreadystatechange=b}}e.open(this.get("type"),this.get("address"),c);
g=this.getPath("request.headers");for(var a in g){e.setRequestHeader(a,g[a])}e.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return e},finishRequest:function(c){var f=this.get("rawRequest"),a=f.readyState,e,b,g;
if(a===4){this.receive(function(h){if(!h){return}b=-1;try{b=f.status||0}catch(j){}if((b<200)||(b>=300)){try{g=f.statusText||""
}catch(i){g=""}e=SC.$error(g||"HTTP Request failed","Request",b);e.set("errorValue",this);
this.set("isError",YES);this.set("errorObject",e)}this.set("status",b)},this);if(!SC.browser.msie){SC.Event.remove(f,"readystatechange",this,this.finishRequest)
}else{f.onreadystatechange=null}return YES}return NO}});sc_require("system/response");
SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,init:function(){arguments.callee.base.apply(this,arguments);
this.header("X-Requested-With","XMLHttpRequest");this.header("X-SproutCore-Version","1.4")
},headers:function(){var a=this._headers;if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",timeout:null,body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},didTimeout:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type timeout body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},e=this.COPY_KEYS,g=e.length,b,c,f;
while(--g>=0){b=e[g];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},async:function(a){if(a===undefined){a=YES
}return this.set("isAsynchronous",a)},json:function(a){if(a===undefined){a=YES}if(a){this.set("isXML",NO)
}return this.set("isJSON",a)},xml:function(a){if(a===undefined){a=YES}if(a){this.set("isJSON",NO)
}return this.set("isXML",a)},_prep:function(){var a=!!this.header("Content-Type");
if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")
}}return this},send:function(a){var b=this.get("timeout");if(b){if(!this.get("isAsynchronous")){throw"Timeout values cannot be used with synchronous requests"
}}else{if(b===0){throw"The timeout value must either not be specified or must be greater than 0"
}}if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,f,e,g){var c=YES;if(SC.typeOf(a)!==SC.T_NUMBER){g=SC.A(arguments).slice(2);
e=f;f=a;a=0;c=NO}else{g=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:f,action:e,params:g};return this}});SC.Request.mixin({getUrl:function(a){return this.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=this.create().set("address",b).set("type","POST");if(a){c.set("body",a)
}return c},deleteUrl:function(a){return this.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=this.create().set("address",b).set("type","PUT");if(a){c.set("body",a)
}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var e=this.get("pending"),c=this.get("inflight"),a;
if(e.indexOf(b)>=0){this.propertyWillChange("pending");e.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var e=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((e.length>0)&&(c.length<a)){b=e.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});require("system/platform");SC.routes=SC.Object.create({_didSetup:NO,_location:null,_firstRoute:null,_extractParametersAndRoute:function(c){var a={},j=c.route||"",f,b,e,h,g,k;
f=(j.indexOf("?")<0&&j.indexOf("&")>=0)?"&":"?";b=j.split(f);j=b[0];if(b.length===1){b=[]
}else{if(b.length===2){b=b[1].split("&")}else{if(b.length>2){b.shift()}}}h=b.length;
for(e=0;e<h;++e){g=b[e].split("=");a[g[0]]=g[1]}for(k in c){if(c.hasOwnProperty(k)&&k!=="route"){a[k]=""+c[k]
}}b=[];for(k in a){b.push([k,a[k]].join("="))}a.params=f+b.join("&");a.route=j;return a
},location:function(b,c){var a;if(c!==undefined){if(c===null){c=""}if(typeof(c)==="object"){a=this._extractParametersAndRoute(c);
c=a.route+a.params}if(!SC.empty(c)||(this._location&&this._location!==c)){window.location.hash=encodeURI(c)
}this._location=c;return this}return this._location}.property(),ping:function(){var a;
if(!this._didSetup){this._didSetup=YES;if(SC.platform.supportsHashChange){this.hashChange();
SC.Event.add(window,"hashchange",this,this.hashChange)}else{a=this;this._invokeHashChange=function(){a.hashChange();
setTimeout(a._invokeHashChange,100)};this._invokeHashChange()}}},hashChange:function(a){var b=window.location.hash;
b=(b&&b.length>0)?b.slice(1,b.length):"";if(!SC.browser.isMozilla){b=decodeURI(b)
}if(this.get("location")!==b){SC.run(function(){this.set("location",b)},this)}},add:function(a,b,c){if(!this._didSetup){this.invokeLast(this.ping)
}if(c===undefined&&SC.typeOf(b)===SC.T_FUNCTION){c=b;b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]
}}if(!this._firstRoute){this._firstRoute=this._Route.create()}this._firstRoute.add(a.split("/"),b,c);
return this},locationDidChange:function(){this.trigger()}.observes("location"),trigger:function(){var a=this._firstRoute,b=this.get("location"),e,c;
if(a){e=this._extractParametersAndRoute({route:b});b=e.route;delete e.route;delete e.params;
c=a.routeForParts(b.split("/"),e);if(c&&c.target&&c.method){c.method.call(c.target,e)
}}},_Route:SC.Object.extend({target:null,method:null,staticRoutes:null,dynamicRoutes:null,wildcardRoutes:null,add:function(c,b,f){var a,e;
c=SC.clone(c);if(!c||c.length===0){this.target=b;this.method=f}else{a=c.shift();switch(a.slice(0,1)){case":":a=a.slice(1,a.length);
if(!this.dynamicRoutes){this.dynamicRoutes={}}if(!this.dynamicRoutes[a]){this.dynamicRoutes[a]=this.constructor.create()
}e=this.dynamicRoutes[a];break;case"*":a=a.slice(1,a.length);if(!this.wildcardRoutes){this.wildcardRoutes={}
}e=this.wildcardRoutes[a]=this.constructor.create();break;default:if(!this.staticRoutes){this.staticRoutes={}
}if(!this.staticRoutes[a]){this.staticRoutes[a]=this.constructor.create()}e=this.staticRoutes[a]
}if(e){e.add(c,b,f)}}},routeForParts:function(e,f){var b,c,a;e=SC.clone(e);if(!e||e.length===0){return this.method?this:null
}else{b=e.shift();if(this.staticRoutes&&this.staticRoutes[b]){return this.staticRoutes[b].routeForParts(e,f)
}else{for(c in this.dynamicRoutes){a=this.dynamicRoutes[c].routeForParts(e,f);if(a){f[c]=b;
return a}}for(c in this.wildcardRoutes){e.unshift(b);f[c]=e.join("/");return this.wildcardRoutes[c].routeForParts(null,f)
}return null}}}})});SC.Task=SC.Object.extend({run:function(a){}});sc_require("tasks/task");
SC.TaskQueue=SC.Task.extend({runWhenIdle:NO,runLimit:50,interval:50,isRunning:NO,minimumIdleDuration:500,_tasks:[],hasTasks:function(){return this._tasks.length>0
}.property("taskCount").cacheable(),taskCount:function(){return this._tasks.length
}.property().cacheable(),push:function(a){this._tasks.push(a);this.notifyPropertyChange("taskCount")
},next:function(){if(this._tasks.length<1){return null}var a=this._tasks.shift();
this.notifyPropertyChange("taskCount");return a},_taskCountDidChange:function(){this._setupIdle()
}.observes("taskCount"),_setupIdle:function(){if(this.get("runWhenIdle")&&!this._idleIsScheduled&&this.get("taskCount")>0){var a=this;
setTimeout(function(){a._idleEntry()},this.get("interval"));this._idleIsScheduled=YES
}},_idleEntry:function(){this._idleIsScheduled=NO;var a=SC.RunLoop.lastRunLoopEnd;
if(Date.now()-a>this.get("minimumIdleDuration")){this.run()}else{SC.run(function(){this._setupIdle()
},this);SC.RunLoop.lastRunLoopEnd=a}},run:function(a){this.set("isRunning",YES);if(!a){a=this.get("runLimit")
}var b,c=Date.now();while(b=this.next()){b.run(this);if(Date.now()-c>a){break}}this._setupIdle();
this.set("isRunning",NO)}});SC.backgroundTaskQueue=SC.TaskQueue.create({runWhenIdle:YES});
SC.time=function(a){var b=SC.beget(fn);b.value=timeOffset;return b};(function(){var a=new Date();
SC.mixin(SC.time,{month:function(c,b){a.setTime(c);if(b===undefined){return a.getMonth()
}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);return b+(a.getTimezoneOffset()*60*1000)
},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)},parse:function(b){},format:function(b){}})
})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{isDate:function(c,b){var a=Date.getDateFromFormat(c,b);if(a==0){return false
}return true},compareDates:function(f,g,c,e){var b=Date.getDateFromFormat(f,g);var a=Date.getDateFromFormat(c,e);
if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0},getDateFromFormat:function(B,s){B=B+"";
s=s+"";var A=0;var m=0;var u="";var g="";var z="";var j,h;var b=new Date();var k=b.getFullYear();
var w=b.getMonth()+1;var v=1;var e=b.getHours();var t=b.getMinutes();var o=b.getSeconds();
var l="";var p=SC.Locale.currentLocale;while(m<s.length){u=s.charAt(m);g="";while((s.charAt(m)==u)&&(m<s.length)){g+=s.charAt(m++)
}if(g=="yyyy"||g=="yy"||g=="y"){if(g=="yyyy"){j=4;h=4}if(g=="yy"){j=2;h=2}if(g=="y"){j=2;
h=4}k=Date._getInt(B,A,j,h);if(k==null){return 0}A+=k.length;if(k.length==2){if(k>70){k=1900+(k-0)
}else{k=2000+(k-0)}}}else{if(g=="MMM"||g=="NNN"){w=0;for(var q=0;q<MONTH_NAMES.length;
q++){var f=MONTH_NAMES[q];if(B.substring(A,A+f.length).toLowerCase()==f.toLowerCase()){if(g=="MMM"||(g=="NNN"&&q>11)){w=q+1;
if(w>12){w-=12}A+=f.length;break}}}if((w<1)||(w>12)){return 0}}else{if(g=="EE"||g=="E"){for(var q=0;
q<DAY_NAMES.length;q++){var n=DAY_NAMES[q];if(B.substring(A,A+n.length).toLowerCase()==n.toLowerCase()){A+=n.length;
break}}}else{if(g=="MM"||g=="M"){w=Date._getInt(B,A,g.length,2);if(w==null||(w<1)||(w>12)){return 0
}A+=w.length}else{if(g=="dd"||g=="d"){v=Date._getInt(B,A,g.length,2);if(v==null||(v<1)||(v>31)){return 0
}A+=v.length}else{if(g=="hh"||g=="h"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<1)||(e>12)){return 0
}A+=e.length}else{if(g=="HH"||g=="H"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<0)||(e>23)){return 0
}A+=e.length}else{if(g=="KK"||g=="K"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<0)||(e>11)){return 0
}A+=e.length}else{if(g=="kk"||g=="k"){e=Date._getInt(B,A,g.length,2);if(e==null||(e<1)||(e>24)){return 0
}A+=e.length;e--}else{if(g=="mm"||g=="m"){t=Date._getInt(B,A,g.length,2);if(t==null||(t<0)||(t>59)){return 0
}A+=t.length}else{if(g=="ss"||g=="s"){o=Date._getInt(B,A,g.length,2);if(o==null||(o<0)||(o>59)){return 0
}A+=o.length}else{if(g=="a"){if(B.substring(A,A+2).toLowerCase()=="am"){l="AM"}else{if(B.substring(A,A+2).toLowerCase()=="pm"){l="PM"
}else{return 0}}A+=2}else{if(B.substring(A,A+g.length)!=g){return 0}else{A+=g.length
}}}}}}}}}}}}}}if(A!=B.length){return 0}if(w==2){if(((k%4==0)&&(k%100!=0))||(k%400==0)){if(v>29){return 0
}}else{if(v>28){return 0}}}if((w==4)||(w==6)||(w==9)||(w==11)){if(v>30){return 0}}if(e<12&&l=="PM"){e=e-0+12
}else{if(e>11&&l=="AM"){e-=12}}var a=new Date(k,w-1,v,e,t,o);return a.getTime()},parseDate:function(k){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(k.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(k,a[c]);if(h==0){h=Date.getDateFromFormat(k,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(k,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(g,e,f,c){for(var a=c;
a>=f;a--){var b=g.substring(e,e+a);if(b.length<f){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(F){F=F+"";var J=this;var l="";
var w=0;var I="";var f="";var j=J.getFullYear()+"";var g=J.getMonth()+1;var G=J.getDate();
var o=J.getDay();var n=J.getHours();var z=J.getMinutes();var q=J.getSeconds();var u,v,b,t,L,e,D,C,A,p,O,n,N,i,a,B;
var x=new Object();if(j.length<4){j=""+(j-0+1900)}x.y=""+j;x.yyyy=j;x.yy=j.substring(2,4);
x.M=g;x.MM=LZ(g);x.MMM=MONTH_NAMES[g-1];x.NNN=MONTH_NAMES[g+11];x.d=G;x.dd=LZ(G);
x.E=DAY_NAMES[o+7];x.EE=DAY_NAMES[o];x.H=n;x.HH=LZ(n);if(n==0){x.h=12}else{if(n>12){x.h=n-12
}else{x.h=n}}x.hh=LZ(x.h);if(n>11){x.K=n-12}else{x.K=n}x.k=n+1;x.KK=LZ(x.K);x.kk=LZ(x.k);
if(n>11){x.a="PM"}else{x.a="AM"}x.m=z;x.mm=LZ(z);x.s=q;x.ss=LZ(q);while(w<F.length){I=F.charAt(w);
f="";while((F.charAt(w)==I)&&(w<F.length)){f+=F.charAt(w++)}if(x[f]!=null){l=l+x[f]
}else{l=l+f}}return l},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var f=this.get("startTime");if(!f||f===0){return -1}var a=this.get("interval"),c=this.get("lastFireTime");
if(c<f){c=f}var b;if(this.get("repeats")){if(a===0){b=c}else{b=f+(Math.floor((c-f)/a)+1)*a
}}else{b=f+a}var e=this.get("until");if(e&&e>0&&b>e){b=e}return b}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var a=this.get("fireTime"),b=this.get("lastFireTime");if(a>=b){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,a)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var b=Date.now();this.set("lastFireTime",b);var a=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(a>b){this.schedule()}else{this.invalidate()
}},performAction:function(){var a=SC.typeOf(this.action);if(a==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(a===SC.T_STRING){if(this.action.indexOf(".")>=0){var f=this.action.split(".");
var c=f.pop();var e=SC.objectForPropertyPath(f,window);var b=e.get?e.get(c):e[c];
if(b&&SC.typeOf(b)==SC.T_FUNCTION){b.call(e,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(b){if(!b){b=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var c=this.RESET_DEFAULTS;for(var a in c){if(!c.hasOwnProperty(a)){continue
}this[a]=SC.none(b[a])?c[a]:b[a]}this.propertyDidChange("fireTime");return this},removeFromTimerQueue:function(c){var b=this._timerQueuePrevious,a=this._timerQueueNext;
if(!b&&!a&&c!==this){return c}if(b){b._timerQueueNext=a}if(a){a._timerQueuePrevious=b
}this._timerQueuePrevious=this._timerQueueNext=null;return(c===this)?a:c},scheduleInTimerQueue:function(c,b){this._timerQueueRunTime=b;
var a=c;var e=null;while(a&&a._timerQueueRunTime<b){e=a;a=a._timerQueueNext}if(e){e._timerQueueNext=this;
this._timerQueuePrevious=e}if(a){a._timerQueuePrevious=this;this._timerQueueNext=a
}return(a===c)?this:c},collectExpiredTimers:function(c,a){if(this._timerQueueRunTime>a){return this
}c.push(this);var b=this._timerQueueNext;this._timerQueueNext=null;if(b){b._timerQueuePrevious=null
}return b?b.collectExpiredTimers(c,a):null}});SC.Timer.schedule=function(a){var b;
if(!a||SC.none(a.isPooled)||a.isPooled){b=this.timerFromPool(a)}else{b=this.create(a)
}return b.schedule()};SC.Timer.timerFromPool=function(a){var b=this._timerPool;if(!b){b=this._timerPool=[]
}var c=b.pop();if(!c){c=this.create()}return c.reset(a)};SC.Timer.returnTimerToPool=function(a){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(a);return this};SC.UserDefaults=SC.Object.extend({ready:NO,userDomain:null,appDomain:null,_defaults:null,_safari3DB:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(i){var c=undefined,a,j,h,k,g;
i=this._normalizeKeyName(i);a=this._userKeyName(i);if(this._written){c=this._written[a]
}if(SC.browser.msie=="7.0"){j=document.body;try{j.load("SC.UserDefaults")}catch(b){console.err("Couldn't load userDefaults in IE7: "+b.description)
}}else{if(this.HTML5DB_noLocalStorage){g=this._safari3DB}else{j=window.localStorage;
if(!j&&window.globalStorage){j=window.globalStorage[window.location.hostname]}}}if(j||g){h=["SC.UserDefaults",a].join("-at-");
if(SC.browser.msie=="7.0"){c=j.getAttribute(h.replace(/\W/gi,""))}else{if(g){c=this.dataHash[h]
}else{c=j[h]}}if(!SC.none(c)){try{c=SC.json.decode(c)}catch(f){c=undefined}}else{c=undefined
}}k=this.delegate;if(k&&k.userDefaultsNeedsDefault){c=k.userDefaultsNeedsDefault(this,i,a)
}if((c===undefined)&&this._defaults){c=this._defaults[a]||this._defaults[i]}return c
},writeDefault:function(k,i){var f,b,l,j,m,h;k=this._normalizeKeyName(k);f=this._userKeyName(k);
b=this._written;if(!b){b=this._written={}}b[f]=i;if(SC.browser.msie=="7.0"){l=document.body
}else{if(this.HTML5DB_noLocalStorage){h=this._safari3DB}else{l=window.localStorage;
if(!l&&window.globalStorage){l=window.globalStorage[window.location.hostname]}}}j=["SC.UserDefaults",f].join("-at-");
if(l||h){var a=SC.json.encode(i);if(SC.browser.msie=="7.0"){l.setAttribute(j.replace(/\W/gi,""),a);
l.save("SC.UserDefaults")}else{if(h){var c=this;h.transaction(function(e){e.executeSql("delete from SCLocalStorage where key = ?",[j],function(){e.executeSql("insert into SCLocalStorage(key, value) VALUES ('"+j+"', '"+a+"');",[],c._nullDataHandler,c.killTransaction)
})});this.dataHash[j]=a}else{try{l[j]=a}catch(g){console.error("Failed using localStorage. "+g)
}}}}m=this.delegate;if(m&&m.userDefaultsDidChange){m.userDefaultsDidChange(this,k,i,f)
}return this},resetDefault:function(h){var g,a,b,e,f,c;g=this._normalizeKeyName(h);
a=this._userKeyName(g);this.propertyWillChange(h);this.propertyWillChange(g);b=this._written;
if(b){delete b[a]}if(SC.browser.msie=="7.0"){e=document.body}else{if(this.HTML5DB_noLocalStorage){c=this._safari3DB
}else{e=window.localStorage;if(!e&&window.globalStorage){e=window.globalStorage[window.location.hostname]
}}}f=["SC.UserDefaults",a].join("-at-");if(e){if(SC.browser.msie=="7.0"){e.setAttribute(f.replace(/\W/gi,""),null);
e.save("SC.UserDefaults")}else{if(c){var i=this;c.transaction(function(j){j.executeSql("delete from SCLocalStorage where key = ?",[f],null)
});delete this.dataHash[f]}else{delete e[f]}}}this.propertyDidChange(h);this.propertyDidChange(g);
return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("-at-")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
if(SC.userDefaults&&SC.userDefaults.get("dataHash")){var g=SC.userDefaults.get("dataHash");
if(g){this.dataHash=SC.userDefaults.get("dataHash")}}this._scud_userDomain=this.get("userDomain");
this._scud_appDomain=this.get("appDomain");if(SC.browser.msie=="7.0"){document.body.addBehavior("#default#userData")
}this.HTML5DB_noLocalStorage=((parseInt(SC.browser.safari,0)>523)&&(parseInt(SC.browser.safari,0)<528));
if(this.HTML5DB_noLocalStorage){var f;try{if(!window.openDatabase){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}else{var a="scdb",c="1.0",b="SproutCore database",j=65536;f=openDatabase(a,c,b,j)
}}catch(i){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}if(f){var h=this;f.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS SCLocalStorage(key TEXT NOT NULL PRIMARY KEY, value TEXT NOT NULL);",[],h._nullDataHandler,h.killTransaction)
});f.transaction(function(e){e.parent=h;e.executeSql("SELECT * from SCLocalStorage;",[],function(p,m){var n={},o;
for(var l=0,k=m.rows.length;l<k;l++){o=m.rows.item(l);n[o.key]=o.value}p.parent.dataHash=n;
SC.run(function(){SC.userDefaults.set("ready",YES)})},h.killTransaction)});this._safari3DB=f
}}else{this.set("ready",YES)}},_killTransaction:function(b,a){return true},_nullDataHandler:function(b,a){},readyCallback:function(a,b){this.func=b;
this.ob=a},readyChanged:function(){if(this.ready===YES){var a=this.func;if(a){a.apply(this.ob)
}}}.observes("ready")});SC.userDefaults=SC.UserDefaults.create();sc_require("system/browser");
SC.mixin({_downloadFrames:0,_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],download:function(e){var a=document.createElement("iframe"),c="DownloadFrame_"+this._downloadFrames;
SC.$(a).attr("id",c);a.style.border="10px";a.style.width="0px";a.style.height="0px";
a.style.position="absolute";a.style.top="-10000px";a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",e)
}document.getElementsByTagName("body")[0].appendChild(a);if(SC.browser.isSafari){SC.$(a).attr("src",e)
}this._downloadFrames=this._downloadFrames+1;if(!SC.browser.isSafari){var b=function(){document.body.removeChild(document.getElementById(c));
c=null};b.invokeLater(null,2000)}a=null},normalizeURL:function(a){if(a.slice(0,1)=="/"){a=window.location.protocol+"//"+window.location.host+a
}else{if((a.slice(0,5)=="http:")||(a.slice(0,6)=="https:")){}else{a=window.location.href+"/"+a
}}return a},isPercentage:function(a){return(a<1&&a>0)},minX:function(a){return a.x||0
},maxX:function(a){return(a.x||0)+(a.width||0)},midX:function(a){return(a.x||0)+((a.width||0)/2)
},minY:function(a){return a.y||0},maxY:function(a){return(a.y||0)+(a.height||0)},midY:function(a){return(a.y||0)+((a.height||0)/2)
},centerX:function(b,a){return(a.width-b.width)/2},centerY:function(b,a){return(a.height-b.height)/2
},pointInRect:function(a,b){return(a.x>=SC.minX(b))&&(a.y>=SC.minY(b))&&(a.x<=SC.maxX(b))&&(a.y<=SC.maxY(b))
},rectsEqual:function(b,a,c){if(!b||!a){return(b==a)}if(!c&&c!==0){c=0.1}if((b.y!=a.y)&&(Math.abs(b.y-a.y)>c)){return NO
}if((b.x!=a.x)&&(Math.abs(b.x-a.x)>c)){return NO}if((b.width!=a.width)&&(Math.abs(b.width-a.width)>c)){return NO
}if((b.height!=a.height)&&(Math.abs(b.height-a.height)>c)){return NO}return YES},intersectRects:function(b,a){var c={x:Math.max(SC.minX(b),SC.minX(a)),y:Math.max(SC.minY(b),SC.minY(a)),width:Math.min(SC.maxX(b),SC.maxX(a)),height:Math.min(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},unionRects:function(b,a){var c={x:Math.min(SC.minX(b),SC.minX(a)),y:Math.min(SC.minY(b),SC.minY(a)),width:Math.max(SC.maxX(b),SC.maxX(a)),height:Math.max(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},cloneRect:function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}
},stringFromRect:function(a){if(!a){return"(null)"}else{return"{x:"+a.x+", y:"+a.y+", width:"+a.width+", height:"+a.height+"}"
}},stringFromLayout:function(f){var e=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"],a=[],c,b=e.length;
while(--b>=0){c=e[b];if(f.hasOwnProperty(c)){a.push(c+":"+f[c])}}return"{"+a.join(", ")+"}"
},heightForString:function(i,c,b,a,h){var f=this._heightCalcElement,g,j;if(!h){i=SC.RenderContext.escapeHTML(i)
}g=(a&&SC.typeOf(a)===SC.T_ARRAY)?a.join(" "):"";if(!c){c=100}if(!f){f=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(f,null)}b=b+"; width: "+c+"px; left: "+(-1*c)+"px; position: absolute";
var e=SC.$(f);e.attr("style",b);if(g!==""){e.attr("class",g)}f.innerHTML=i;j=f.clientHeight;
f=null;return j},prepareStringMeasurement:function(o,a){var l=this._metricsCalculationElement,j,p,c,e;
j=SC.A(a).join(" ");if(!l){l=this._metricsCalculationElement=document.createElement("div");
document.body.insertBefore(l,null)}e=SC.$(l);if(SC.typeOf(o)!=SC.T_STRING){var h=null;
if(document.defaultView&&document.defaultView.getComputedStyle){h=document.defaultView.getComputedStyle(o,null)
}else{h=o.currentStyle}c=h.cssText;if(!c||c.trim()===""){var n=this._copy_computed_props;
for(var k=0;k<n.length;k++){var b=n[k],g=h[b];l.style[b]=g}var m=l.style;if(m.font===""){var f="";
if(m.fontStyle){f+=m.fontStyle+" "}if(m.fontVariant){f+=m.fontVariant+" "}if(m.fontWeight){f+=m.fontWeight+" "
}if(m.fontSize){f+=m.fontSize}else{f+="10px"}if(m.lineHeight){f+="/"+m.lineHeight
}f+=" ";if(m.fontFamily){f+=m.fontFamily}else{m+="sans-serif"}l.style.font=f}SC.mixin(l.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"})
}else{e.attr("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}h=null}else{c=o;e.attr("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}l.className=j;l=null},teardownStringMeasurement:function(){var a=this._metricsCalculationElement;
a.innerHTML="";a.className="";a.setAttribute("style","");a=null},measureString:function(c,b){if(!b){c=SC.RenderContext.escapeHTML(c)
}var e=this._metricsCalculationElement;if(!e){throw"measureString requires a string measurement environment to be set up. Did you mean metricsForString?"
}if(typeof e.innerText!="undefined"){e.innerText=c}else{e.textContent=c}var a={width:e.clientWidth,height:e.clientHeight};
e=null;return a},metricsForString:function(c,e,f,b){if(!b){c=SC.RenderContext.escapeHTML(c)
}SC.prepareStringMeasurement(e,f);var a=SC.measureString(c);SC.teardownStringMeasurement();
return a},viewportOffset:function(c){if(c.getBoundingClientRect){var e=c.getBoundingClientRect();
return{x:e.left,y:e.top}}var j=0,f=0,k,h,g,l,b,i=c,a=SC.browser.mozilla>=3;while(i){k=SC.$(i);
f+=(i.offsetTop||0);if(!a||(i!==c)){f+=(i.clientTop||0)}j+=(i.offsetLeft||0);if(!a||(i!==c)){j+=(i.clientLeft||0)
}if(SC.browser.mozilla){h=k.attr("overflow");if(h!=="visible"){g=parseInt(k.attr("borderLeftWidth"),0)||0;
l=parseInt(k.attr("borderTopWidth"),0)||0;if(c!==i){g*=2;l*=2}j+=g;f+=l}b=i.offsetParent;
if(SC.browser.mozilla.match(/1[.]9/)&&b){f-=b.clientTop;j-=b.clientLeft}}if(i.offsetParent==document.body&&k.attr("position")==="absolute"){break
}i=i.offsetParent}i=c;while(i){if(!SC.browser.isOpera||i.tagName==="BODY"){f-=i.scrollTop||0;
j-=i.scrollLeft||0}i=i.parentNode}return{x:j,y:f}},ZERO_POINT:{x:0,y:0},ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c==null)||(c.length<0)){return b}if((b==null)||(b.length<0)){return c
}var e=Math.min(c.start,b.start),a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:e,length:a-e}
},intersectRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var e=Math.max(SC.minRange(c),SC.minRange(b)),a=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}},subtractRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b)),e=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}},cloneRange:function(a){return{start:a.start,length:a.length}
},rangesEqual:function(b,a){if(b===a){return true}if(b==null){return a.length<0}if(a==null){return b.length<0
}return(b.start==a.start)&&(b.length==a.length)},convertHsvToHex:function(k,x,u){var a=0,l=0,o=0;
if(u>0){var j=(k==1)?0:Math.floor(k*6),m=(k==1)?0:(k*6)-j,e=u*(1-x),c=u*(1-(x*m)),w=u*(1-(x*(1-m))),n=[[u,w,e],[c,u,e],[e,u,w],[e,c,u],[w,e,u],[u,e,c]];
a=Math.round(255*n[j][0]);l=Math.round(255*n[j][1]);o=Math.round(255*n[j][2])}return this.parseColor("rgb("+a+","+l+","+o+")")
},convertHexToHsv:function(i){var c=this.expandColor(i),a=Math.max(Math.max(c[0],c[1]),c[2]),e=Math.min(Math.min(c[0],c[1]),c[2]),g=(a===0)?0:(1-e/a),b=a/255,f=(a==e)?0:((a==c[0])?((c[1]-c[2])/(a-e)/6):((a==c[1])?((c[2]-c[0])/(a-e)/6+1/3):((c[0]-c[1])/(a-e)/6+2/3)));
f=(f<0)?(f+1):((f>1)?(f-1):f);return[f,g,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,f,e,a;
c=this.parseColor(b);if(c){f=parseInt(c.slice(1,3),16);e=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[f,e,a]}},parseColor:function(e){var f=0,a="#",c,b;
if(c=this.PARSE_COLOR_RGBRE.exec(e)){for(f=1;f<=3;f++){b=Math.max(0,Math.min(255,parseInt(c[f],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(e)){if(c[1].length==3){for(f=0;
f<3;f++){a+=c[1].charAt(f)+c[1].charAt(f)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b},getStyle:function(a,b){var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(e,f){return f.toUpperCase()
});c=a.currentStyle[b]}}return c},uniJapaneseConvert:function(f){var a,c="",b,e;for(b=0,e=f.length;
b<e;b++){a=f.charCodeAt(b);a=((a>=65281&&a<=65392)?a-65248:a);a=(a===12540?45:a);
c=c+String.fromCharCode(a)}return c}});require("tasks/task");SC.didPreloadBundle=function(){};
SC.PreloadBundleTask=SC.Task.extend({bundle:null,target:"SC",action:"preloaded",run:function(a){var b;
if(b=this.get("bundle")){var c=Date.now();SC.loadBundle(this.get("bundle"),this.get("target"),this.get("action"))
}}});SC.VALIDATE_OK=YES;SC.VALIDATE_NO_CHANGE=NO;SC.Validator=SC.Object.extend({fieldValueForObject:function(b,c,a){return b
},objectForFieldValue:function(c,b,a){return c},validate:function(a,b){return true
},validateError:function(a,b){return SC.$error("Invalid.General(%@)".loc(b.get("fieldValue")),b.get("fieldKey"))
},validateChange:function(b,c,a){return this.validate(b,c)?SC.VALIDATE_OK:this.validateError(b,c)
},validateSubmit:function(a,b){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
},validatePartial:function(a,b){if(!b.get("isValid")){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
}else{return SC.VALIDATE_NO_CHANGE}},validateKeyDown:function(b,c,a){return true},attachTo:function(a,b){},detachFrom:function(a,b){}});
SC.Validator.mixin({OK:true,NO_CHANGE:false,findFor:function(f,h,g){var c;if(!g){return
}if(g instanceof SC.Validator){c=g}else{if(g.isClass){c=g.create()}else{if(SC.typeOf(g)===SC.T_STRING){var b=null;
var a=g.match(/^(.+)\[(.*)\]/);if(a){g=a[1];b=a[2]}g=g.classify();var e=SC.Validator[g];
if(SC.none(e)){throw"validator %@ not found for %@".fmt(g,h)}else{if(b){if(!f){throw"named validator (%@) could not be found for field %@ because the field does not belong to a form".fmt(b,h)
}if(!f._validatorHash){f._validatorHash={}}c=(b)?f._validatorHash[b]:null;if(!c){c=e.create()
}if(b){f._validatorHash[b]=c}}else{c=e.create()}}}}}return c},fieldValueForObject:function(a,b,c){if(this.prototype&&this.prototype.fieldValueForObject){return this.prototype.fieldValueForObject(a,b,c)
}else{return null}},objectForFieldValue:function(b,a,c){if(this.prototype&&this.prototype.objectForFieldValue){return this.prototype.objectForFieldValue(b,a,c)
}else{return null}}});sc_require("validators/validator");SC.Validator.CreditCard=SC.Validator.extend({fieldValueForObject:function(a,b,c){if(typeof(a)=="string"&&a.length==16){a=[a.slice(0,4),a.slice(4,8),a.slice(8,12),a.slice(12,16)].join(" ")
}return a},objectForFieldValue:function(b,a,c){return b.replace(/[\s-\.\:]/g,"")},validate:function(a,b){return this.checkNumber(b.get("fieldValue"))
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.CreditCard(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){return !!a.match(/[0-9\- ]/)},checkNumber:function(k){if(!k||k.length===0){return YES
}k=k.replace(/[^0-9]/g,"");var a="0123456789";var h=k.length;var g=parseInt(k,0);
var m=k.toString();m=m.replace(/^\s+|\s+$/g,"");var l=0;var o=true;var b=false;var n;
var e;for(var c=0;c<h;c++){n=""+m.substring(c,c+1);if(a.indexOf(n)=="-1"){o=false
}}if(!o){b=false}if((h===0)&&(b)){b=false}else{if(h>=15){for(var f=h;f>0;f--){e=parseInt(g,0)%10;
e=parseInt(e,0);l+=e;f--;g=g/10;e=parseInt(g,0)%10;e=e*2;switch(e){case 10:e=1;break;
case 12:e=3;break;case 14:e=5;break;case 16:e=7;break;case 18:e=9;break;default:e=e
}g=g/10;l+=e}if((l%10)===0){b=true}else{b=false}}}return b}});sc_require("validators/validator");
SC.Validator.Date=SC.Validator.extend({format:"NNN d, yyyy h:mm:ss a",fieldValueForObject:function(b,c,e){var a;
if(typeof(b)==="number"){a=new Date(b)}else{if(b instanceof Date){a=b}}if(a){b=a.format(this.get("format"))
}return b},objectForFieldValue:function(c,b,e){if(c){var a=Date.parseDate(c);c=(a)?a.getTime():null
}return c}});require("validators/validator");SC.Validator.DateTime=SC.Validator.extend({format:"%d/%m/%Y",fieldValueForObject:function(a,b,c){if(SC.kindOf(a,SC.DateTime)){a=a.toFormattedString(this.get("format"))
}else{a=null}return a},objectForFieldValue:function(b,a,c){if(b){b=SC.DateTime.parse(b,this.get("format"))
}return b}});sc_require("validators/validator");SC.Validator.Email=SC.Validator.extend({validate:function(a,b){return(b.get("fieldValue")||"").match(/.+@.+\...+/)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Email(%@)".loc(a),a)
}});SC.Validator.EmailOrEmpty=SC.Validator.Email.extend({validate:function(a,c){var b=c.get("fieldValue");
return(b&&b.length>0)?b.match(/.+@.+\...+/):true}});sc_require("validators/validator");
SC.Validator.NotEmpty=SC.Validator.extend({validate:function(a,c){var b=c.get("fieldValue");
if(SC.none(b)){return NO}if(!SC.none(b.length)){return b.length>0}return YES},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.NotEmpty(%@)".loc(a.capitalize()),c.get("errorLabel"))}});
sc_require("validators/validator");SC.Validator.Number=SC.Validator.extend({places:0,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(this.get("places"));
break;case SC.T_NULL:case SC.T_UNDEFINED:a="";break}return a},objectForFieldValue:function(c,b,e){var a;
c=c.replace(/,/g,"");switch(SC.typeOf(c)){case SC.T_STRING:if(c.length===0){c=null
}else{if(this.get("places")>0){c=parseFloat(c)}else{if(c.length==1&&c.match(/-/)){c=null
}else{a=parseInt(c,0);if(isNaN(a)){c=SC.uniJapaneseConvert(c);c=parseInt(c,0);if(isNaN(c)){c=""
}}else{c=a}}}}break;case SC.T_NULL:case SC.T_UNDEFINED:c=null;break}return c},validate:function(a,c){var b=c.get("fieldValue");
return(b==="")||!(isNaN(b)||isNaN(parseFloat(b)))},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.Number(%@)".loc(a),a)},validateKeyDown:function(b,c,a){var e=c.$input().val();
if(!e){e=""}e+=a;if(this.get("places")===0){if(a.length===0){return true}else{return e.match(/^[\-{0,1}]?[0-9,\0]*/)[0]===e
}}else{if(a.length===0){return true}else{return e.match(/^[\-{0,1}]?[0-9,\0]*\.?[0-9\0]+/)===e
}}}});sc_require("validators/validator");SC.Validator.Password=SC.Validator.extend({attachTo:function(a,b){arguments.callee.base.apply(this,arguments);
if(!this.fields){this.fields=[]}this.fields.push(b)},validate:function(f){if(!this.fields||this.fields.length===0){return true
}var e=false;var b=false;var a=true;var c=this.fields[0].get("fieldValue");this.fields.forEach(function(h){var g=h.get("fieldValue");
if(g!=c){a=false}if(!g||g.length===0){e=true}if(g&&g.length>0){b=true}});if(f){return(b===false)?false:a
}else{return(e===true)?true:a}},updateFields:function(c,b){if(!this.fields||this.fields.length===0){return true
}var a="Invalid.Password".loc();var e=this._field;this.fields.forEach(function(g){var h=(b)?null:((g==e)?a:"");
c.setErrorFor(g,h)});return(b)?SC.VALIDATE_OK:a},validateChange:function(b,c,a){return this.updateFields(b,this.validate(false))
},validateSubmit:function(a,b){return this.updateFields(a,this.validate(true))},validatePartial:function(b,c){var a=!this._field.get("isValid");
if(a){return this.updateFields(b,this.validate(false))}else{return SC.VALIDATE_NO_CHANGE
}}});sc_require("validators/validator");SC.Validator.PositiveInteger=SC.Validator.extend({defaultValue:null,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(0);
break;case SC.T_NULL:case SC.T_UNDEFINED:a=this.get("defaultValue");break}return a
},objectForFieldValue:function(b,a,c){b=b.replace(/,/g,"");switch(SC.typeOf(b)){case SC.T_STRING:if(b.length===0){b=this.get("defaultValue")
}else{b=parseInt(b,0)}break;case SC.T_NULL:case SC.T_UNDEFINED:b=this.get("defaultValue");
break}return b},validate:function(a,c){var b=c.get("fieldValue");return(b==="")||!isNaN(b)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Number(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){var e=c.$input().val();if(!e){e=""}e+=a;if(a.length===0){return true
}else{return e.match(/^[0-9\0]*/)[0]===e}}});sc_require("views/view");SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var a=this.get("nowShowing");
if(a===SC.CONTENT_SET_DIRECTLY){return}if(SC.typeOf(a)===SC.T_STRING&&a.length>0){if(a.indexOf(".")>0){a=SC.objectForPropertyPath(a)
}else{a=SC.objectForPropertyPath(a,this.get("page"))}}if(SC.typeOf(a)===SC.T_CLASS){if(a.kindOf(SC.View)){a=a.create()
}else{a=null}}if(a&&!(a instanceof SC.View)){a=null}this.set("contentView",a)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});sc_require("views/view");sc_require("mixins/control");
SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";SC.IMAGE_STATE_LOADED="loaded";
SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_STATE_SPRITE="sprite";SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"/static/sproutcore/foundation/en/760e3e0dd716bca963274213a64ff4ff49ea4636/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",tagName:"img",status:SC.IMAGE_STATE_NONE,value:null,useImageCache:YES,canLoadInBackground:NO,localize:YES,displayProperties:"status toolTip".w(),render:function(c,g){var a=this.get("status"),e=this.get("value");
if(a===SC.IMAGE_STATE_NONE&&e){this._image_valueDidChange()}a=this.get("status");
var f=(a===SC.IMAGE_STATE_LOADED)?e:SC.BLANK_IMAGE_URL;if(a===SC.IMAGE_STATE_SPRITE){c.addClass(e)
}c.attr("src",f);var b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}c.attr("title",b);c.attr("alt",b)}},_image_valueDidChange:function(){var b=this.get("value"),c;
if(b&&b.isEnumerable){b=b.firstObject()}c=SC.ImageView.valueIsUrl(b);if(c&&this.get("useImageCache")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
this._loadingUrl=b;SC.imageCache.loadImage(b,this,this.imageDidLoad,a);if(this._loadingUrl){this.set("status",SC.IMAGE_STATE_LOADING)
}}else{this._loadingUrl=null;this.set("status",(c)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_SPRITE);
this.displayDidChange()}}.observes("value"),imageDidLoad:function(a,b){if(a===this._loadingUrl){this._loadingUrl=null
}if(this.get("value")===a){this.set("status",SC.$ok(b)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_FAILED);
this.displayDidChange()}}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("views/view");sc_require("mixins/control");SC.ALIGN_LEFT="left";SC.ALIGN_RIGHT="right";
SC.ALIGN_CENTER="center";SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,{classNames:["sc-label-view"],fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,exampleInlineTextFieldView:SC.InlineTextFieldView,icon:null,textAlign:SC.ALIGN_LEFT,isInlineEditorMultiline:NO,displayValue:function(){var h,f;
h=this.get("value");f=this.getDelegateProperty("formatter",this.displayDelegate);
if(f){var g=(SC.typeOf(f)===SC.T_FUNCTION)?f(h,this):f.fieldValueForObject(h,this);
if(!SC.none(g)){h=g}}if(SC.typeOf(h)===SC.T_ARRAY){var e=[];for(var b=0,c=h.get("length");
b<c;b++){var a=h.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}e.push(a)
}h=e.join(",")}if(!SC.none(h)&&h.toString){h=h.toString()}if(h&&this.getDelegateProperty("localize",this.displayDelegate)){h=h.loc()
}if(this.get("escapeHTML")){h=SC.RenderContext.escapeHTML(h)}return h}.property("value","localize","formatter","escapeHTML").cacheable(),hintValue:function(){var a=this.get("hint");
if(this.get("escapeHTML")){a=SC.RenderContext.escapeHTML(a)}return a}.property("hint","escapeHTML").cacheable(),isEditable:NO,isEditableBindingDefault:SC.Binding.bool(),isEditing:NO,validator:null,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var b=this.$(),e=this.get("value"),c=SC.viewportOffset(b[0]),a=this.convertFrameFromView(this.get("frame"),null);
c.width=a.width;c.height=a.height;SC.InlineTextFieldView.beginEditing({frame:c,delegate:this,exampleElement:b,value:e,multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(b){var a=this.$();
this._oldOpacity=a.css("opacity");a.css("opacity",0)},inlineEditorShouldBeginEditing:function(){return this.get("isEditable")
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},displayProperties:"displayValue textAlign fontWeight icon".w(),_TEMPORARY_CLASS_HASH:{},render:function(e,a){var l=this.get("displayValue"),k=this.get("icon"),h=this.get("hintValue"),g,f,m,i=false,c=false;
if(k){var b=(k.indexOf("/")>=0)?k:SC.BLANK_IMAGE_URL,j=(b===k)?"":k;k='<img src="'+b+'" alt="" class="icon '+j+'" />';
if(k!==this._iconCache){this._iconCache=k;i=true}}if(h&&(!l||l==="")){m='<span class="sc-hint">'+h+"</span>"
}else{m=l}if(m!==this._textCache){this._textCache=m;c=true}if(a||c||i){e.push(k,m)
}f={"text-align":this.get("textAlign"),"font-weight":this.get("fontWeight")};if(this.get("isEditing")){f.opacity=0
}e.addStyle(f);g=this._TEMPORARY_CLASS_HASH;g.icon=!!this.get("icon");e.setClass(g)
}});require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{top:0,left:0,bottom:0,right:0,minHeight:200,minWidth:200},paneDidAttach:function(){var b=arguments.callee.base.apply(this,arguments);
var a=this.rootResponder;a.makeMainPane(this);if(!a.get("keyRootView")){a.makeKeyPane(this)
}return b},acceptsKeyPane:YES,classNames:["sc-main"]});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/foundation")
}SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderTop:0,borderRight:0,borderBottom:0,borderLeft:0,borderStyle:SC.BORDER_GRAY,hasBorder:YES,displayProperties:["borderStyle"],_BORDER_REGEXP:(/-border$/),initMixin:function(){this._sc_border_borderStyleDidChange()
},renderMixin:function(a,c){var b=this.get("borderStyle");if(b){if(this._BORDER_REGEXP.exec(b)){a.addClass(b)
}else{a.addStyle("border","1px "+b+" solid")}}},_sc_border_borderStyleDidChange:function(){var a=this.get("borderStyle"),b=SC.Border.dimensions[a];
if(b){this.borderTop=b;this.borderRight=b;this.borderBottom=b;this.borderLeft=b}}};
SC.mixin(SC.Border,{dimensions:{"sc-bezel-border":1,"sc-black-border":1,"sc-gray-border":1,"sc-top-border":1,"sc-bottom-border":1}});
SC.CollectionFastPath={initMixin:function(){this._indexMap={}},poolForExampleView:function(a){var b="_pool_"+SC.guidFor(a);
if(!this[b]){this[b]=[]}return this[b]},createItemViewFromExampleView:function(c,b){var a=c.create(b);
if(a.isPoolable){a.owningPool=this.poolForExampleView(c)}a.createdFromExampleView=c;
return a},configureItemView:function(b,a){b.beginPropertyChanges();b.setIfChanged("content",a.content);
b.setIfChanged("contentIndex",a.contentIndex);b.setIfChanged("parentView",a.parentView);
b.setIfChanged("layerId",a.layerId);b.setIfChanged("isEnabled",a.isEnabled);b.setIfChanged("isSelected",a.isSelected);
b.setIfChanged("outlineLevel",a.outlineLevel);b.setIfChanged("layout",a.layout);b.setIfChanged("disclosureState",a.disclosureState);
b.setIfChanged("isVisibleInWindow",a.isVisibleInWindow);b.setIfChanged("isGroupView",a.isGroupView);
b.setIfChanged("page",this.page);b.endPropertyChanges()},wakePooledView:function(b,a){this.configureItemView(b,a);
if(b.awakeFromPool){b.awakeFromPool(b.owningPool,this)}},allocateItemView:function(e,b){var a;
if(e.prototype.isPoolable){var c=this.poolForExampleView(e);if(c.length>0){a=c.pop();
this.wakePooledView(a,b)}}if(!a){a=this.createItemViewFromExampleView(e,b)}return a
},releaseItemView:function(b){if(!b.isPoolable){b.destroy();return}var a=b.owningPool;
a.push(b);if(b.hibernateInPool){b.hibernateInPool(a,this)}},contentIndexIsGroup:function(a,e,c){var f=this.get("contentDelegate");
var b=this.get("_contentGroupIndexes"),g=NO;g=b&&b.contains(c);if(g){g=f.contentIndexIsGroup(this,this.get("content"),c)
}return g},exampleViewForItem:function(g,e){var b=this.get("contentDelegate"),c=this.get("_contentGroupIndexes"),f,a,h=this.contentIndexIsGroup(this,this.get("content"),e);
if(h){f=this.get("contentGroupExampleViewKey");if(f&&g){a=g.get(f)}if(!a){a=this.get("groupExampleView")||this.get("exampleView")
}}else{f=this.get("contentExampleViewKey");if(f&&g){a=g.get(f)}if(!a){a=this.get("exampleView")
}}return a},setAttributesForItem:function(g,e,c){var b=this.get("contentDelegate"),h=this.contentIndexIsGroup(this,this.get("content"),e),a=this.exampleViewForItem(g,e),f=this.get("content");
c.createdFromExampleView=a;c.parentView=this.get("containerView")||this;c.contentIndex=e;
c.owner=c.displayDelegate=this;c.content=g;c.page=this.page;c.layerId=this.layerIdFor(e);
c.isEnabled=b.contentIndexIsEnabled(this,f,e);c.isSelected=b.contentIndexIsSelected(this,f,e);
c.outlineLevel=b.contentIndexOutlineLevel(this,f,e);c.disclosureState=b.contentIndexDisclosureState(this,f,e);
c.isVisibleInWindow=this.get("isVisibleInWindow");c.isGroupView=h;c.layout=this.layoutForContentIndex(e);
if(!c.layout){c.layout=a.prototype.layout}},mappedViewsForItem:function(a,b){if(!b){b=this._viewMap
}return b[SC.guidFor(a)]},mappedViewForItem:function(c,b,e){if(!e){e=this._viewMap
}var a=e[SC.guidFor(c)];if(!a){return undefined}return a[b]},mapView:function(f,c,b,h){if(!h){h=this._viewMap
}var e=SC.guidFor(f),a=h[e];if(!a){a=h[e]={_length:0}}a[c]=b;a._length++},unmapView:function(f,c,h){if(!h){h=this._viewMap
}var e=SC.guidFor(f),a=h[e];if(!a){return}if(a[c]){var b=a[c];delete a[c];a._length--;
if(a._length<=0){delete h[e]}}},itemViewForContentIndex:function(b){var e=this.get("content");
if(!e){return}var c=e.objectAt(b);if(!c){return null}var f=this.exampleViewForItem(c,b),a=this._indexMap[b];
if(a&&a.createdFromExampleView!==f){this.removeItemView(a);this.unmapView(c,b);a=null
}if(!a){a=this.addItemView(f,c,b)}return a},nearestMappedViewIndexForItem:function(f,c,g){var b=this.mappedViewsForItem(f,g);
if(!b){return null}var e=null,i=-1,h=0;for(var a in b){a=parseInt(a,10);if(isNaN(a)){continue
}h=Math.abs(c-a);if(i<0||h<i){i=h;e=a}}return e},remapItemViews:function(b){var k=this._viewMap||{},a=(this._viewMap={}),j=(this._indexMap={}),l=[],i=this.get("content"),o;
if(!i){return}var g=this._itemsToAdd;b.forEach(function(p){o=i.objectAt(p);var s=this.mappedViewsForItem(o,k);
if(s){if(s[p]){var q=s[p];this.unmapView(o,p,k);this.mapView(o,p,q,a);j[p]=q}else{l.push(p)
}}else{g.push(p)}},this);for(var n=0,h=l.length;n<h;n++){var m=l[n];o=i.objectAt(m);
var f=this.nearestMappedViewIndexForItem(o,m,k),c;if(!SC.none(f)){c=this.mappedViewForItem(o,f,k);
var e=this.exampleViewForItem(o,m);if(e===c.createdFromExampleView){this.unmapView(o,f,k);
this.mapView(o,m,c,a);j[m]=c}else{g.push(m)}}else{g.push(m)}}return k},reloadIfNeeded:function(g,b){var e=this.get("content"),f;
if(!g||!g.isIndexSet){g=this.get("nowShowing")}if(!b){f=this._invalidIndexes;if(!f||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;if(f.isIndexSet&&f.contains(g)){f=YES}if(this.willReload){this.willReload(f===YES?null:f)
}}var h=this._itemsToAdd||(this._itemsToAdd=[]);var a=this.remapItemViews(g);this.processRemovals(a);
if(f){this.processUpdates(f===YES?g:f)}this.processAdds();if(!b){this.clearDOMPools()
}h.length=0;if(!b){var c=this.computeLayout();if(c){this.adjust(c)}if(this.didReload){this.didReload(f===YES?null:f)
}}return this},processRemovals:function(c){var g=this.get("content");for(var e in c){var b=c[e];
for(var f in b){f=parseInt(f,10);if(isNaN(f)){continue}var a=b[f];if(this._indexMap[f]===a){delete this._indexMap[f]
}a._isInCollection=NO;this.removeItemView(a)}}},processUpdates:function(f){var b=this._itemsToUpdate,e=this.get("content"),c,a;
f.forEach(function(g){c=e.objectAt(g);if(a=this.mappedViewForItem(c,g)){if(!a._isInCollection){return
}var h=this.exampleViewForItem(c,g);this.updateItemView(a,h,c,g)}},this)},processAdds:function(){var g=this.get("content");
var h=this._itemsToAdd,b,a=h.length,f,e;for(b=0;b<a;b++){f=h[b];e=g.objectAt(f);var i=this.exampleViewForItem(e,f);
var c=this.addItemView(i,e,f)}},clearDOMPools:function(){var a=this._domPools||(this._domPools={});
for(var b in a){this.clearDOMPool(a[b])}},domPoolSize:10,clearDOMPool:function(c){var b,a=c.length,e;
for(b=this.domPoolSize;b<a;b++){e=c[b];this.removeChild(e);this.releaseItemView(e)
}c.length=Math.min(c.length,this.domPoolSize)},domPoolForExampleView:function(e){var c=this._domPools||(this._domPools={}),a=SC.guidFor(e);
var b=c[a];if(!b){b=c[a]=[]}return b},itemFromDOMPool:function(c){var b=this.domPoolForExampleView(c);
if(b.length<1){return null}var a=b.shift();if(a.wakeFromDOMPool){a.wakeFromDOMPool()
}return a},sendToDOMPool:function(a){var b=this.domPoolForExampleView(a.createdFromExampleView);
b.push(a);var c=a.get("frame");a.adjust({top:-c.height});a.set("layerId",SC.guidFor(a));
if(a.sleepInDOMPool){a.sleepInDOMPool()}},addItemView:function(f,e,c){var a,b=this._TMP_ATTRS||(this._TMP_ATTRS={});
this.setAttributesForItem(e,c,b);if(a=this.itemFromDOMPool(f)){this.configureItemView(a,b);
a._isInCollection=YES;this.mapView(e,c,a);this._indexMap[c]=a;return a}a=this.allocateItemView(f,b);
this.appendChild(a);a._isInCollection=YES;this.mapView(e,c,a);this._indexMap[c]=a;
return a},removeItemView:function(a){if(a.get("layerIsCacheable")){this.sendToDOMPool(a)
}else{this.removeChild(a)}a._isInCollection=NO},updateItemView:function(e,f,c,b){if(!e.get("layerIsCacheable")||e.createdFromExampleView!==f){this.unmapView(e,b);
delete this._indexMap[b];this.removeItemView(e,c,b);var g=this.addItemView(f,c,b)
}else{var a=this._TMP_ATTRS||(this._TMP_ATTRS={});this.setAttributesForItem(c,b,a);
this.configureItemView(e,a)}},_lastTopUpdate:0,_lastLeftUpdate:0,_tolerance:100,touchScrollDidChange:function(h,g){if(Date.now()-this._lastTouchScrollTime<25){return
}var i=this.get("clippingFrame");var f=this._inScrollClippingFrame||(this._inScrollClippingFrame={x:0,y:0,width:0,height:0});
f.x=i.x;f.y=i.y;f.width=i.width;f.height=i.height;f.x=h;f.y=g;var e=this.contentIndexesInRect(f);
if(!e){return}var b=this.get("length"),a=e.get("max"),c=e.get("min");if(a>b||c<0){e=e.copy();
e.remove(b,a-b).remove(c,0-c).freeze()}if(this._lastNowShowing){if(e.contains(this._lastNowShowing)&&this._lastNowShowing.contains(e)){return
}}this._lastNowShowing=e;this.reloadIfNeeded(e,YES);this._lastTouchScrollTime=Date.now()
}};SC.CollectionGroup={classNames:["sc-collection-group"]};SC.CollectionRowDelegate={isCollectionRowDelegate:YES,rowHeight:18,customRowHeightIndexes:null,contentIndexRowHeight:function(a,b,c){return this.get("rowHeight")
}};SC.CollectionViewDelegate={isCollectionViewDelegate:YES,collectionViewSelectionForProposedSelection:function(a,b){return b
},collectionViewShouldSelectIndexes:function(a,b,c){return b},collectionViewShouldDeselectIndexes:function(a,b){return b
},collectionViewShouldDeleteIndexes:function(a,b){return b},collectionViewDeleteContent:function(a,c,b){if(!c){return NO
}if(SC.typeOf(c.destroyAt)===SC.T_FUNCTION){c.destroyAt(b);a.selectPreviousItem(NO,1);
return YES}else{if(SC.typeOf(c.removeAt)===SC.T_FUNCTION){c.removeAt(b);a.selectPreviousItem(NO,1);
return YES}else{return NO}}},collectionViewShouldBeginDrag:function(a){return YES
},collectionViewDragDataTypes:function(a){return[]},collectionViewDragDataForType:function(a,c,b){return null
},collectionViewComputeDragOperations:function(a,b,c){return c},collectionViewValidateDragOperation:function(b,e,f,c,a){return(a&SC.DROP_ON)?SC.DRAG_NONE:f
},collectionViewPerformDragOperation:function(b,e,f,c,a){return SC.DRAG_NONE},collectionViewDragViewFor:function(a,b){return null
},ghostActsLikeCursor:NO};SC.Scrollable={initMixin:function(){console.warn("SC.Scrollable is deprecated and will be removed in a future version of SproutCore.  Consider pulling the mixin into your own app if you want to keep using it.")
},isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(a){var b=this.get("scrollFrame");var c=this.get("innerFrame");
if(!this.get("hasVerticalScroller")){a.y=0}if(b.height<=c.height){a.y=0}if(!this.get("hasHorizontalScroller")){a.x=0
}if(b.width<=c.width){a.x=0}var e={x:b.x-(a.x||0),y:b.y-(a.y||0)};this.set("scrollFrame",e);
e=this.get("scrollFrame");return{x:e.x-b.x,y:e.y-b.y}},scrollTo:function(a,b){this.set("scrollFrame",{x:0-a,y:0-b})
},scrollToVisible:function(b){var g=this.get("innerFrame");var e=this.get("scrollFrame");
var a=this.convertFrameFromView(b.get("frame"),b);a.x-=(g.x+e.x);a.y-=(g.y+e.y);var c={x:0-e.x,y:0-e.y,width:g.width,height:g.height};
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));this.scrollTo(c.x,c.y)},scrollDownLine:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalLineScroll")*a}).y},scrollUpLine:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*a}).y},scrollRightLine:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*a}).x},scrollLeftLine:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*a}).x},scrollDownPage:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalPageScroll")*a}).y},scrollUpPage:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*a}).y},scrollRightPage:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*a}).x},scrollLeftPage:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*a}).x}};SC.ModalPane=SC.Pane.extend({classNames:"sc-modal",layout:{top:0,left:0,bottom:0,right:0},_openPaneCount:0,paneWillAppend:function(a){this._openPaneCount++;
if(!this.get("isVisibleInWindow")){this.append()}return this},paneDidRemove:function(a){this._openPaneCount--;
if(this._openPaneCount<=0){this._openPaneCount=0;if(this.get("isVisibleInWindow")){this.remove()
}}},mouseDown:function(b){var a=this.get("owner");if(a&&a.modalPaneDidClick){a.modalPaneDidClick(b)
}},touchStart:function(a){this.mouseDown(a)}});sc_require("panes/modal");SC.PanelPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},classNames:["sc-panel"],acceptsKeyPane:YES,isModal:YES,modalPane:SC.ModalPane.extend({classNames:"for-sc-panel"}),contentView:null,contentViewBindingDefault:SC.Binding.single(),render:function(a,b){if(a.needsContent){this.renderChildViews(a,b);
a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>")
}},replaceContent:function(a){this.removeAllChildren();if(a){this.appendChild(a)}},createChildViews:function(){var a=this.contentView;
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView"),_modalPane:function(){var a=this.get("modalPane");if(a&&a.isClass){a=a.create({owner:this});
this.set("modalPane",a)}return a},appendTo:function(a){var b;if(!this.get("isVisibleInWindow")&&this.get("isModal")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}return arguments.callee.base.apply(this,arguments)},remove:function(){var b,a=arguments.callee.base.apply(this,arguments);
if(this._isShowingModal){this._isShowingModal=NO;if(b=this._modalPane()){b.paneDidRemove(this)
}}return a},_isModalDidChange:function(){var b,a=this.get("isModal");if(a){if(!this._isShowingModal&&this.get("isVisibleInWindow")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}}else{if(this._isShowingModal&&(b=this._modalPane())){this._isShowingModal=NO;
b.paneDidRemove(this)}}}.observes("isModal"),paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.becomeKeyPane();return a}});SC.ButtonView=SC.View.extend(SC.Control,SC.Button,SC.StaticLayout,{tagName:"div",classNames:["sc-button-view"],theme:"square",buttonBehavior:SC.PUSH_BEHAVIOR,holdInterval:100,isDefault:NO,isDefaultBindingDefault:SC.Binding.oneWay().bool(),isCancel:NO,isCancelBindingDefault:SC.Binding.oneWay().bool(),href:"",action:null,target:null,supportFocusRing:NO,_labelMinWidthIE7:0,triggerAction:function(a){if(!this.get("isEnabled")){return NO
}this.set("isActive",YES);this.invokeLater("_triggerActionAfterDelay",200,a);return YES
},_triggerActionAfterDelay:function(a){this._action(a,YES);this.didTriggerAction();
this.set("isActive",NO)},didTriggerAction:function(){},titleMinWidth:80,init:function(){arguments.callee.base.apply(this,arguments);
if(this.get("keyEquivalent")){this._defaultKeyEquivalent=this.get("keyEquivalent")
}},_TEMPORARY_CLASS_HASH:{},displayProperties:["href","icon","title","value","toolTip"],renderStyle:"renderDefault",render:function(e,g){var a,b,c,f;
if(this.get("tagName")==="a"){a=this.get("href");if(!a||(a.length===0)){a="javascript:;"
}e.attr("href",a)}b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}e.attr("title",b);e.attr("alt",b)}c=this._TEMPORARY_CLASS_HASH;c.def=this.get("isDefault");
c.cancel=this.get("isCancel");c.icon=!!this.get("icon");e.attr("role","button").setClass(c);
f=this.get("theme");if(f&&!e.hasClass(f)){e.addClass(f)}this[this.get("renderStyle")](e,g)
},renderDefault:function(a,b){if(b){a=a.push("<span class='sc-button-inner' style = 'min-width:",this.get("titleMinWidth"),"px'>");
this.renderTitle(a,b);a.push("</span>");if(this.get("supportFocusRing")){a.push('<div class="focus-ring">','<div class="focus-left"></div>','<div class="focus-middle"></div>','<div class="focus-right"></div></div>')
}}else{this.renderTitle(a,b)}},renderImage:function(a,c){var b=this.get("icon");a.addClass("no-min-width");
if(b){a.push("<div class='img "+b+"'></div>")}else{a.push("<div class='img'></div>")
}},_defaultKeyEquivalent:null,_isDefaultOrCancelDidChange:function(){var a=!!this.get("isDefault"),b=!a&&this.get("isCancel");
if(this.didChangeFor("defaultCancelChanged","isDefault","isCancel")){this.displayDidChange();
if(a){this.set("keyEquivalent","return")}else{if(b){this.setIfChanged("keyEquivalent","escape")
}else{this.set("keyEquivalent",this._defaultKeyEquivalent)}}}}.observes("isDefault","isCancel"),isMouseDown:false,mouseDown:function(a){var b=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);this._isMouseDown=YES;
if(b===SC.HOLD_BEHAVIOR){this._action(a)}else{if(!this._isFocused&&(b!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}}return YES},mouseExited:function(a){if(this._isMouseDown){this.set("isActive",NO)
}return YES},mouseEntered:function(a){if(this._isMouseDown){this.set("isActive",YES)
}return YES},mouseUp:function(b){if(this._isMouseDown){this.set("isActive",NO)}this._isMouseDown=false;
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){var a=this.$().within(b.target);
if(a&&this.get("isEnabled")){this._action(b)}}return YES},touchStart:function(b){var a=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);if(a===SC.HOLD_BEHAVIOR){this._action(b)
}else{if(!this._isFocused&&(a!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;this.becomeFirstResponder();
if(this.get("isVisibleInWindow")){this.$()[0].focus()}}}b.preventDefault();return YES
},touchesDragged:function(a,b){if(!this.touchIsInBoundary(a)){if(!this._touch_exited){this.set("isActive",NO)
}this._touch_exited=YES}else{if(this._touch_exited){this.set("isActive",YES)}this._touch_exited=NO
}a.preventDefault();return YES},touchEnd:function(a){this._touch_exited=NO;this.set("isActive",NO);
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){if(this.touchIsInBoundary(a)){this._action()
}}a.preventDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(b.which===13){this.triggerAction(b);
return YES}return NO},_action:function(a,c){switch(this.get("buttonBehavior")){case SC.TOGGLE_BEHAVIOR:var b=this.get("isSelected");
if(b){this.set("value",this.get("toggleOffValue"))}else{this.set("value",this.get("toggleOnValue"))
}break;case SC.TOGGLE_ON_BEHAVIOR:this.set("value",this.get("toggleOnValue"));break;
case SC.TOGGLE_OFF_BEHAVIOR:this.set("value",this.get("toggleOffValue"));break;case SC.HOLD_BEHAVIOR:this._runHoldAction(a,c);
break;default:this._runAction(a)}},_runAction:function(a){var c=this.get("action"),e=this.get("target")||null,b=this.getPath("pane.rootResponder");
if(c){if(this._hasLegacyActionHandler()){this._triggerLegacyActionHandler(a)}else{if(b){b.sendAction(c,e,this,this.get("pane"))
}}}},_runHoldAction:function(a,b){if(this.get("isActive")){this._runAction();if(!b){SC.RunLoop.begin();
this.invokeLater("_runHoldAction",this.get("holdInterval"),a);SC.RunLoop.end()}}},_hasLegacyActionHandler:function(){var a=this.get("action");
if(a&&(SC.typeOf(a)===SC.T_FUNCTION)){return true}if(a&&(SC.typeOf(a)===SC.T_STRING)&&(a.indexOf(".")!=-1)){return true
}return false},_triggerLegacyActionHandler:function(evt){if(!this._hasLegacyActionHandler()){return false
}var action=this.get("action");if(SC.typeOf(action)===SC.T_FUNCTION){this.action(evt)
}if(SC.typeOf(action)===SC.T_STRING){eval("this.action = function(e) { return "+action+"(this, e); };");
this.action(evt)}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){var b=this.$()[0];if(b){b.focus()
}}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},didAppendToDocument:function(){if(parseInt(SC.browser.msie,0)===7&&this.get("useStaticLayout")){var f=this.get("layout"),e=this.$(),a=0;
if(e&&e[0]&&(a=e[0].clientWidth)&&a!==0&&this._labelMinWidthIE7===0){var c=this.$(".sc-button-label"),i=parseInt(c.css("paddingRight"),0),b=parseInt(c.css("paddingLeft"),0),h=parseInt(c.css("marginRight"),0),g=parseInt(c.css("marginLeft"),0);
if(h=="auto"){console.log(h+","+g+","+i+","+b)}if(!i&&isNaN(i)){i=0}if(!b&&isNaN(b)){b=0
}if(!h&&isNaN(h)){h=0}if(!g&&isNaN(g)){g=0}this._labelMinWidthIE7=a-(i+b)-(h+g);c.css("minWidth",this._labelMinWidthIE7+"px")
}else{this.invokeLater(this.didAppendToDocument,1)}}}});SC.TOGGLE_BEHAVIOR="toggle";
SC.PUSH_BEHAVIOR="push";SC.TOGGLE_ON_BEHAVIOR="on";SC.TOGGLE_OFF_BEHAVIOR="off";SC.HOLD_BEHAVIOR="hold";
SC.ButtonView.CLICK_AND_HOLD_DELAY=SC.browser.msie?600:300;SC.REGULAR_BUTTON_HEIGHT=24;
sc_require("panes/panel");sc_require("views/button");SC.BUTTON1_STATUS="button1";
SC.BUTTON2_STATUS="button2";SC.BUTTON3_STATUS="button3";SC.AlertPane=SC.PanelPane.extend({classNames:"sc-alert",delegate:null,icon:"sc-icon-alert-48",message:"",description:"",displayDescription:function(){var a=this.get("description");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="description">'+a.split("\n").join('</p><p class="description">')+"</p>"
}.property("description").cacheable(),caption:"",displayCaption:function(){var a=this.get("caption");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="caption">'+a.split("\n").join('</p><p class="caption">')+"</p>"
}.property("caption").cacheable(),buttonOne:SC.outlet("contentView.childViews.1.childViews.1"),buttonTwo:SC.outlet("contentView.childViews.1.childViews.0"),buttonThree:SC.outlet("contentView.childViews.2.childViews.0"),buttonThreeWrapper:SC.outlet("contentView.childViews.2"),layout:{top:0.3,centerX:0,width:500},contentView:SC.View.extend({useStaticLayout:YES,layout:{left:0,right:0,top:0,height:"auto"},childViews:[SC.View.extend(SC.StaticLayout,{classNames:["info"],render:function(a,e){var c=this.get("pane");
var b=SC.BLANK_IMAGE_URL;if(c.get("icon")=="blank"){a.addClass("plain")}a.push('<img src="'+b+'" class="icon '+c.get("icon")+'" />');
a.begin("h1").attr("class","header").text(c.get("message")||"").end();a.push(c.get("displayDescription")||"");
a.push(c.get("displayCaption")||"");a.push('<div class="separator"></div>')}}),SC.View.extend({layout:{bottom:13,height:24,right:18,width:466},childViews:["cancelButton","okButton"],classNames:["text-align-right"],cancelButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON2_STATUS,localize:YES,titleMinWidth:64,layout:{right:5,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Cancel",isCancel:YES,action:"dismiss",isVisible:NO}),okButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON1_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"OK",isDefault:YES,action:"dismiss"})}),SC.View.extend({layout:{bottom:13,height:24,left:18,width:150},isVisible:NO,childViews:[SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON3_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Extra",action:"dismiss",isVisible:NO})]})]}),dismiss:function(b){var a=this.delegate;
if(a&&a.alertPaneDidDismiss){a.alertPaneDidDismiss(this,b.get("actionKey"))}this.remove()
},alertInfoDidChange:function(){var a=this.getPath("contentView.childViews.0");if(a){a.displayDidChange()
}}.observes("icon","message","displayDescription","displayCaption")});SC.AlertPane._normalizeArguments=function(b){b=SC.A(b);
var a=b.length,c=b[a-1];if(SC.typeOf(c)!==SC.T_STRING){b[a-1]=null}else{c=null}b[7]=c;
return b};SC.AlertPane.show=function(q,m,o,b,c,p,a,h){var g=this._normalizeArguments(arguments);
var f=this.create({message:g[0]||"",description:g[1]||null,caption:g[2]||null,icon:g[6]||"sc-icon-alert-48",delegate:g[7]});
var l="buttonOne buttonTwo buttonThree".w(),e,i;for(var k=0;k<3;k++){e=f.get(l[k]);
i=g[k+3];if(i){e.set("title",i).set("isVisible",YES);if(i=="?"){e.set("titleMinWidth",0)
}if(k==2){var n=f.get("buttonThreeWrapper");n.set("isVisible",YES)}}}var j=f.append();
f.adjust("height",f.childViews[0].$().height());f.updateLayout();return j};SC.AlertPane.warn=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-alert-48";return this.show.apply(this,b)};SC.AlertPane.info=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-info-48";return this.show.apply(this,b)};SC.AlertPane.error=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-error-48";return this.show.apply(this,b)};SC.AlertPane.plain=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="blank";return this.show.apply(this,b)};sc_require("panes/panel");SC.PalettePane=SC.PanelPane.extend({classNames:"sc-palette",isModal:NO,modalPane:SC.ModalPane,isAnchored:NO,_mouseOffsetX:null,_mouseOffsetY:null,mouseDown:function(a){var b=this.get("frame");
this._mouseOffsetX=b?(b.x-a.pageX):0;this._mouseOffsetY=b?(b.y-a.pageY):0;return YES
},mouseDragged:function(a){if(!this.isAnchored){this.set("layout",{width:this.layout.width,height:this.layout.height,left:this._mouseOffsetX+a.pageX,top:this._mouseOffsetY+a.pageY});
this.updateLayout()}return YES},touchStart:function(a){return this.mouseDown(a)},touchesDragged:function(a){return this.mouseDragged(a)
}});sc_require("panes/palette");SC.PICKER_MENU="menu";SC.PICKER_FIXED="fixed";SC.PICKER_POINTER="pointer";
SC.PICKER_MENU_POINTER="menu-pointer";SC.POINTER_LAYOUT=["perfectRight","perfectLeft","perfectTop","perfectBottom"];
SC.PickerPane=SC.PalettePane.extend({classNames:"sc-picker",isAnchored:YES,isModal:YES,pointerPos:"perfectRight",pointerPosX:0,pointerPosY:0,anchorElement:null,anchorCached:null,preferType:null,preferMatrix:null,pointerOffset:null,extraRightOffset:0,popup:function(e,c,f,a){var b;
if(e){b=e.isView?e.get("layer"):e}this.beginPropertyChanges();this.set("anchorElement",b);
if(c){this.set("preferType",c)}if(f){this.set("preferMatrix",f)}if(a){this.set("pointerOffset",a)
}this.endPropertyChanges();this.positionPane();return this.append()},positionPane:function(g){var g=g&&this.get("anchorCached"),b=g?this.get("anchorCached"):this.get("anchorElement"),c=this.get("preferType"),e=this.get("preferMatrix"),f=this.get("layout"),a;
if(b){if(!g){b=this.computeAnchorRect(b);this.set("anchorCached",b)}if(b.x===0&&b.y===0){return
}a=SC.cloneRect(b);if(c){switch(c){case SC.PICKER_MENU:case SC.PICKER_FIXED:if(!e||e.length!==3){this.set("preferMatrix",[1,4,3])
}a.x+=((this.preferMatrix[2]===0)?a.width:0)+this.preferMatrix[0];a.y+=((this.preferMatrix[2]===3)?a.height:0)+this.preferMatrix[1];
break;default:a.y+=a.height;break}}else{a.y+=a.height}a=this.fitPositionToScreen(a,this.get("frame"),b);
this.adjust({width:a.width,height:a.height,left:a.x,top:a.y})}else{this.adjust({width:f.width,height:f.height,centerX:0,centerY:0})
}this.updateLayout();return this},computeAnchorRect:function(c){var f,b,e,a=SC.RootResponder.responder.computeWindowSize();
if(c.getBoundingClientRect){f=c.getBoundingClientRect();b={x:f.left,y:f.top,width:f.width,height:f.height};
if(b.width===undefined||b.height===undefined){e=SC.$(c);b.width=e.outerWidth();b.height=e.outerHeight()
}}else{b=SC.viewportOffset(c);e=SC.$(c);b.width=e.outerWidth();b.height=e.outerHeight()
}b.height=(a.height-b.y)<b.height?(a.height-b.y):b.height;if(!SC.browser.msie&&window.scrollX>0||window.scrollY>0){b.x+=window.scrollX;
b.y+=window.scrollY}else{if(SC.browser.msie&&(document.documentElement.scrollTop>0||document.documentElement.scrollLeft>0)){b.x+=document.documentElement.scrollLeft;
b.y+=document.documentElement.scrollTop}}return b},fitPositionToScreen:function(f,c,b){var a=SC.RootResponder.responder.computeWindowSize(),e={x:0,y:0,width:a.width,height:a.height};
c.x=f.x;c.y=f.y;if(this.preferType){switch(this.preferType){case SC.PICKER_MENU:c=this.fitPositionToScreenMenu(e,c,this.get("isSubMenu"));
break;case SC.PICKER_MENU_POINTER:this.setupPointer(b);c=this.fitPositionToScreenMenuPointer(e,c,b);
break;case SC.PICKER_POINTER:this.setupPointer(b);c=this.fitPositionToScreenPointer(e,c,b);
break;case SC.PICKER_FIXED:break;default:break}}else{c=this.fitPositionToScreenDefault(e,c,b)
}this.displayDidChange();this._hideOverflow();return c},fitPositionToScreenDefault:function(c,e,b){if(SC.maxX(e)>c.width){var g=Math.max(SC.maxX(b),e.width);
e.x=Math.min(g,c.width)-e.width}if(SC.minX(e)<0){e.x=SC.minX(Math.max(b,0));if(SC.maxX(e)>c.width){e.x=Math.max(0,c.width-e.width)
}}if(SC.maxY(e)>c.height){g=Math.max((b.y-e.height),0);if(g>c.height){e.y=Math.max(0,c.height-e.height)
}else{e.y=g}}if(SC.minY(e)<0){g=Math.min(SC.maxY(b),(c.height-b.height));e.y=Math.max(g,0)
}return e},fitPositionToScreenMenu:function(c,b,a){if(a){b.x-=this.get("submenuOffsetX");
b.y-=Math.floor(this.get("menuHeightPadding")/2)}if((b.x+b.width)>(c.width-20)){if(a){b.x=b.x-(b.width*2)
}else{b.x=c.width-b.width-20}}if(b.x<7){b.x=7}if(b.y<7){b.height+=b.y;b.y=7}if(b.height+b.y+35>=c.height){if(b.height+50>=c.height){b.y=SC.MenuPane.VERTICAL_OFFSET;
b.height=c.height-(SC.MenuPane.VERTICAL_OFFSET*2)}else{b.y+=(c.height-(b.height+b.y+35))
}}return b},fitPositionToScreenMenuPointer:function(c,e,b){e=this.fitPositionToScreenPointer(c,e,b);
if(e.height+e.y+35>=c.height){e.height=c.height-e.y-(SC.MenuPane.VERTICAL_OFFSET*2)
}return e},fitPositionToScreenPointer:function(p,n,o){var j=[this.pointerOffset[0],this.pointerOffset[1],this.pointerOffset[2],this.pointerOffset[3]];
var g=[[o.x+o.width+j[0],o.y+parseInt(o.height/2,0)-40],[o.x-n.width+j[1],o.y+parseInt(o.height/2,0)-40],[o.x+parseInt((o.width/2)-(n.width/2),0),o.y-n.height+j[2]],[o.x+parseInt((o.width/2)-(n.width/2),0),o.y+o.height+j[3]]];
var c=[[o.x+o.width+n.width+j[0],o.y+parseInt(o.height/2,0)+n.height-24],[o.x+j[1],o.y+parseInt(o.height/2,0)+n.height-24],[o.x+parseInt((o.width/2)-(n.width/2),0)+n.width,o.y+j[2]],[o.x+parseInt((o.width/2)-(n.width/2),0)+n.width,o.y+o.height+n.height+j[3]]];
var h=[[g[0][1]>0?0:0-g[0][1],c[0][0]<p.width?0:c[0][0]-p.width,c[0][1]<p.height?0:c[0][1]-p.height,g[0][0]>0?0:0-g[0][0]],[g[1][1]>0?0:0-g[1][1],c[1][0]<p.width?0:c[1][0]-p.width,c[1][1]<p.height?0:c[1][1]-p.height,g[1][0]>0?0:0-g[1][0]],[g[2][1]>0?0:0-g[2][1],c[2][0]<p.width?0:c[2][0]-p.width,c[2][1]<p.height?0:c[2][1]-p.height,g[2][0]>0?0:0-g[2][0]],[g[3][1]>0?0:0-g[3][1],c[3][0]<p.width?0:c[3][0]-p.width,c[3][1]<p.height?0:c[3][1]-p.height,g[3][0]>0?0:0-g[3][0]]];
var e=this.preferMatrix;if(e[4]===-1){n.x=o.x+parseInt(o.width/2,0);n.y=o.y+parseInt(o.height/2,0)-parseInt(n.height/2,0);
this.set("pointerPos",SC.POINTER_LAYOUT[0]+" fallback");this.set("pointerPosY",parseInt(n.height/2,0)-40)
}else{n.x=g[e[4]][0];n.y=g[e[4]][1];this.set("pointerPos",SC.POINTER_LAYOUT[e[4]]);
this.set("pointerPosY",0)}this.set("pointerPosX",0);for(var k=0,b,l=SC.POINTER_LAYOUT.length;
k<l;k++){b=e[k];if(h[b][0]===0&&h[b][1]===0&&h[b][2]===0&&h[b][3]===0){if(e[4]!==b){n.x=g[b][0];
n.y=g[b][1];this.set("pointerPosY",0);this.set("pointerPos",SC.POINTER_LAYOUT[b])
}k=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&h[b][0]===0&&h[b][1]===0&&h[b][2]<n.height-91&&h[b][3]===0){if(e[4]!==b){n.x=g[b][0];
this.set("pointerPos",SC.POINTER_LAYOUT[b])}n.y=g[b][1]-h[b][2];this.set("pointerPosY",h[b][2]);
k=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&h[b][0]===0&&h[b][1]===0&&h[b][2]<=n.height-51&&h[b][3]===0){if(e[4]!==b){n.x=g[b][0]
}n.y=g[b][1]-(n.height-51);this.set("pointerPosY",(n.height-53));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-low");
k=SC.POINTER_LAYOUT.length}else{if((b===2||b===3)&&h[b][0]===0&&h[b][1]<=parseInt(n.width/2,0)-this.get("extraRightOffset")&&h[b][2]===0&&h[b][3]===0){if(e[4]!==b){n.y=g[b][1]
}n.x=g[b][0]-(parseInt(n.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-right");
k=SC.POINTER_LAYOUT.length}else{if((b===2||b===3)&&h[b][0]===0&&h[b][1]===0&&h[b][2]===0&&h[b][3]<=parseInt(n.width/2,0)-this.get("extraRightOffset")){if(e[4]!==b){n.y=g[b][1]
}n.x=g[b][0]+(parseInt(n.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-left");
k=SC.POINTER_LAYOUT.length}}}}}}return n},setupPointer:function(g){var h=this.pointerOffset,f=SC.PickerPane;
if(!h||h.length!==4){if(this.get("preferType")==SC.PICKER_MENU_POINTER){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("pointerOffset",f.TINY_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.SMALL_CONTROL_SIZE:this.set("pointerOffset",f.SMALL_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.REGULAR_CONTROL_SIZE:this.set("pointerOffset",f.REGULAR_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.LARGE_CONTROL_SIZE:this.set("pointerOffset",f.LARGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.HUGE_CONTROL_SIZE:this.set("pointerOffset",f.HUGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",f.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break}}else{var e=(g.width<16)?((g.width<4)?9:6):0,b=(g.height<16)?((g.height<4)?9:6):0,c=f.PICKER_POINTER_OFFSET;
var i=[c[0]+e,c[1]-e,c[2]-b,c[3]+b];this.set("pointerOffset",i);this.set("extraRightOffset",f.PICKER_EXTRA_RIGHT_OFFSET)
}}if(!this.preferMatrix||this.preferMatrix.length!==5){this.set("preferMatrix",this.get("preferType")==SC.PICKER_MENU_POINTER?[3,0,1,2,3]:[0,1,2,3,2])
}},displayProperties:["pointerPosY"],render:function(b,e){var a=arguments.callee.base.apply(this,arguments);
if(b.needsContent){if(this.get("preferType")==SC.PICKER_POINTER||this.get("preferType")==SC.PICKER_MENU_POINTER){b.push('<div class="sc-pointer '+this.get("pointerPos")+'" style="margin-top: '+this.get("pointerPosY")+'px"></div>');
b.addClass(this.get("pointerPos"))}}else{if(this.get("preferType")==SC.PICKER_POINTER||this.get("preferType")==SC.PICKER_MENU_POINTER){var c=this.$(".sc-pointer");
c.attr("class","sc-pointer "+this.get("pointerPos"));c.attr("style","margin-top: "+this.get("pointerPosY")+"px");
b.addClass(this.get("pointerPos"))}}return a},modalPaneDidClick:function(a){var b=this.get("frame");
if(!this.clickInside(b,a)){this.remove()}return YES},mouseDown:function(a){return this.modalPaneDidClick(a)
},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)},windowSizeDidChange:function(b,a){this.positionPane()
},remove:function(){this._showOverflow();return arguments.callee.base.apply(this,arguments)
},_hideOverflow:function(){var b=SC.$(document.body),a=SC.$(".sc-main"),e=parseInt(a.css("minWidth"),0),f=parseInt(a.css("minHeight"),0),c=SC.RootResponder.responder.get("currentWindowSize");
if(c.width>=e&&c.height>=f){b.css("overflow","hidden")}},_showOverflow:function(){var a=SC.$(document.body);
a.css("overflow","visible")}});SC.PickerPane.PICKER_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.PICKER_EXTRA_RIGHT_OFFSET=20;SC.PickerPane.TINY_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;SC.PickerPane.SMALL_PICKER_MENU_POINTER_OFFSET=[9,-9,-8,8];
SC.PickerPane.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET=11;SC.PickerPane.REGULAR_PICKER_MENU_POINTER_OFFSET=[9,-9,-12,12];
SC.PickerPane.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET=13;SC.PickerPane.LARGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-16,16];
SC.PickerPane.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=17;SC.PickerPane.HUGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;SC.SeparatorView=SC.View.extend({classNames:["sc-separator-view"],tagName:"span",layoutDirection:SC.LAYOUT_HORIZONTAL,render:function(a,b){if(b){a.push("<span></span>")
}a.addClass(this.get("layoutDirection"))}});sc_require("views/button");sc_require("views/separator");
SC.MenuItemView=SC.View.extend(SC.ContentDisplay,{displayProperties:["title","isEnabled","isSeparator"],classNames:["sc-menu-item"],escapeHTML:YES,acceptsFirstResponder:YES,blocksIEDeactivate:YES,isContextMenuEnabled:NO,content:null,isSeparator:function(){return this.getContentProperty("itemSeparatorKey")===YES
}.property("content").cacheable(),isEnabled:function(){return this.getContentProperty("itemIsEnabledKey")!==NO&&this.getContentProperty("itemSeparatorKey")!==YES
}.property("content.isEnabled").cacheable(),subMenu:function(){var c=this.get("content"),b,a;
if(!c){return null}a=this.get("parentMenu");b=c.get(a.itemSubMenuKey);if(b){if(SC.kindOf(b,SC.MenuPane)){b.set("isModal",NO);
b.set("isSubMenu",YES);b.set("parentMenu",a);return b}else{return SC.MenuPane.create({layout:{width:200},items:b,isModal:NO,isSubMenu:YES,parentMenu:a,controlSize:a.get("controlSize")})
}}return null}.property("content").cacheable(),hasSubMenu:function(){return !!this.get("subMenu")
}.property("subMenu").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.contentDidChange()},render:function(b,i){var c=this.get("content"),a,g,f=this.get("parentMenu"),e=this.get("itemWidth")||f.layout.width,h=this.get("itemHeight")||SC.DEFAULT_MENU_ITEM_HEIGHT;
this.set("itemWidth",e);this.set("itemHeight",h);b=b.begin("a").addClass("menu-item");
if(c.get(f.itemSeparatorKey)){b.push('<span class="separator"></span>');b.addClass("disabled")
}else{g=c.get(f.itemIconKey);if(g){this.renderImage(b,g);b.addClass("has-icon")}g=this.get("title");
if(SC.typeOf(g)!==SC.T_STRING){g=g.toString()}this.renderLabel(b,g);if(this.getContentProperty("itemCheckboxKey")){b.push('<div class="checkbox"></div>')
}if(this.get("hasSubMenu")){this.renderBranch(b)}g=this.getContentProperty("itemShortCutKey");
if(g){this.renderShortcut(b,g)}}b=b.end()},renderImage:function(b,e){var a,c;if(e&&SC.ImageView.valueIsUrl(e)){a=e;
c=""}else{c=e;a=SC.BLANK_IMAGE_URL}b.begin("img").addClass("image").addClass(c).attr("src",a).end()
},renderLabel:function(b,a){if(this.get("escapeHTML")){a=SC.RenderContext.escapeHTML(a)
}b.push("<span class='value ellipsis'>"+a+"</span>")},renderBranch:function(a){a.push('<span class="has-branch"></span>')
},renderShortcut:function(b,a){b.push('<span class = "shortcut">'+a+"</span>")},showSubMenu:function(){var a=this.get("subMenu");
if(a){a.set("mouseHasEntered",NO);a.popup(this,[0,0,0])}this._subMenuTimer=null},title:function(){var b=this.getContentProperty("itemTitleKey"),a=this.getPath("parentMenu.localize");
if(a&&b){b=b.loc()}return b||""}.property("content.title").cacheable(),getContentProperty:function(b){var a=this.get("content"),c=this.get("parentMenu");
if(a){return a.get(c.get(b))}},mouseUp:function(b){var a;a=this.getPath("parentMenu.rootMenu.targetMenuItem");
if(a){a.performAction()}return YES},performAction:function(){if(!this.get("isEnabled")||this.get("hasSubMenu")){return NO
}var b=this.getContentProperty("itemDisableMenuFlashKey"),a;if(b){this.sendAction()
}else{this._flashCounter=0;a=this.getPath("parentMenu.rootMenu");a._isFlashing=YES;
this.invokeLater(this.flashHighlight,25);this.invokeLater(this.sendAction,150)}return YES
},sendAction:function(){var c=this.getContentProperty("itemActionKey"),e=this.getContentProperty("itemTargetKey"),b=this.getPath("parentMenu.rootMenu"),a;
this.getPath("parentMenu.rootMenu").remove();b._isFlashing=NO;c=(c===undefined)?b.get("action"):c;
e=(e===undefined)?b.get("target"):e;b.set("selectedItem",this.get("content"));if(SC.typeOf(c)===SC.T_FUNCTION){c.apply(e,[b]);
SC.Logger.warn("Support for menu item action functions has been deprecated. Please use target and action.")
}else{a=this.getPath("pane.rootResponder")||SC.RootResponder.responder;if(a){a.sendAction(c,e,this)
}}},flashHighlight:function(){var a=this._flashCounter,b=this.$();if(a%2===0){b.addClass("focus")
}else{b.removeClass("focus")}if(a<=2){this.invokeLater(this.flashHighlight,50);this._flashCounter++
}},mouseDown:function(a){return YES},mouseEntered:function(a){var c=this.get("parentMenu"),b=c.get("rootMenu");
if(b._isFlashing){return}c.set("mouseHasEntered",YES);this.set("mouseHasEntered",YES);
c.set("currentMenuItem",this);if(this.get("isEnabled")){this.becomeFirstResponder()
}if(this.get("hasSubMenu")){this._subMenuTimer=this.invokeLater(this.showSubMenu,100)
}return YES},mouseExited:function(a){var b,c;if(this.get("hasSubMenu")){c=this._subMenuTimer;
if(c){c.invalidate()}else{this.invokeLater(this.checkMouseLocation,100)}}else{b=this.get("parentMenu");
if(b.get("currentMenuItem")===this){b.set("currentMenuItem",null)}}return YES},touchStart:function(a){this.mouseEntered(a);
return YES},touchEnd:function(a){return this.mouseUp(a)},touchEntered:function(a){return this.mouseEntered(a)
},touchExited:function(a){return this.mouseExited(a)},checkMouseLocation:function(){var b=this.get("subMenu"),c=this.get("parentMenu"),a,e;
if(!b.get("mouseHasEntered")){a=c.get("currentMenuItem");if(a===this||a===null){e=c.get("previousMenuItem");
if(e){e.resignFirstResponder()}this.resignFirstResponder();b.remove()}}},moveUp:function(b,a){var c=this.get("parentMenu");
if(c){c.moveUp(this)}return YES},moveDown:function(b,a){var c=this.get("parentMenu");
if(c){c.moveDown(this)}return YES},moveRight:function(b,a){this.showSubMenu();return YES
},insertText:function(b,a){var c=this.get("parentMenu");if(c){c.insertText(b,a)}},keyDown:function(a){return this.interpretKeyEvents(a)
},keyUp:function(a){return YES},cancel:function(a){this.getPath("parentMenu.rootMenu").remove();
return YES},didBecomeFirstResponder:function(a){if(a!==this){return}var b=this.get("parentMenu");
if(b){b.set("currentSelectedMenuItem",this)}},willLoseFirstResponder:function(a){if(a!==this){return
}var b=this.get("parentMenu");if(b){b.set("currentSelectedMenuItem",null);b.set("previousSelectedMenuItem",this)
}},insertNewline:function(b,a){this.mouseUp(a)},closeParent:function(){this.$().removeClass("focus");
var a=this.get("parentMenu");if(a){a.remove()}},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)
},contentDidChange:function(){var b=this.get("content"),a=this._content;if(b===a){return
}var c=this.contentPropertyDidChange;if(a&&a.removeObserver){a.removeObserver("*",this,c)
}this._content=b;if(b&&b.addObserver){b.addObserver("*",this,c)}this.contentPropertyDidChange(b,"*")
}.observes("content"),contentPropertyDidChange:function(h,k){var b=this.get("parentMenu");
if(!b){return}var a=SC.MenuItemView._contentPropertyToMenuItemPropertyMapping,j=SC.keys(a),f,g,e,c;
if(k==="*"){for(f=0,g=j.length;f<g;++f){e=j[f];c=a[e];this.notifyPropertyChange(c)
}}else{for(f=0,g=j.length;f<g;++f){e=j[f];if(b.get(e)===k){c=a[e];this.notifyPropertyChange(c)
}}}}});SC.MenuItemView._contentPropertyToMenuItemPropertyMapping={itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemSeparatorKey:"isSeparator",itemSubMenuKey:"subMenu"};
require("panes/picker");require("views/menu_item");SC.MenuPane=SC.PickerPane.extend({classNames:["sc-menu"],items:[],controlSize:SC.REGULAR_CONTROL_SIZE,itemHeight:null,itemSeparatorHeight:null,menuHeight:0,menuHeightPadding:null,submenuOffsetX:null,selectedItem:null,exampleView:SC.MenuItemView,anchor:null,isSubMenu:NO,localize:YES,acceptsMenuPane:YES,isContextMenuEnabled:NO,popup:function(b,c){var a;
this.beginPropertyChanges();if(b){a=b.isView?b.get("layer"):b}this.set("anchorElement",a);
this.set("anchor",b);if(c){this.set("preferMatrix",c)}this.adjust("height",this.get("menuHeight"));
this.positionPane();this.set("defaultResponder",this);this.endPropertyChanges();this.append()
},remove:function(){var a=this.get("parentMenu");this.set("currentMenuItem",null);
this.closeOpenMenus();this.resignMenuPane();if(a){a.becomeMenuPane()}return arguments.callee.base.apply(this,arguments)
},itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemValueKey:"value",itemIconKey:"icon",itemHeightKey:"height",itemSubMenuKey:"subMenu",itemSeparatorKey:"separator",itemTargetKey:"target",itemActionKey:"action",itemCheckboxKey:"checkbox",itemShortCutKey:"shortcut",itemKeyEquivalentKey:"keyEquivalent",itemDisableMenuFlashKey:"disableMenuFlash",menuItemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemSeparatorKey itemActionKey itemCheckboxKey itemShortCutKey itemHeightKey itemSubMenuKey itemKeyEquivalentKey itemTargetKey".w(),preferType:SC.PICKER_MENU,isModal:YES,_menuView:null,init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.TINY_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.TINY_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.TINY_SUBMENU_OFFSET_X);
break;case SC.SMALL_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.SMALL_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.SMALL_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.SMALL_SUBMENU_OFFSET_X);
break;case SC.REGULAR_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.REGULAR_SUBMENU_OFFSET_X);
break;case SC.LARGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.LARGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.LARGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.LARGE_SUBMENU_OFFSET_X);
break;case SC.HUGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.HUGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.HUGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.HUGE_SUBMENU_OFFSET_X);
break}return arguments.callee.base.apply(this,arguments)},setIfNull:function(a,b){if(this.get(a)===null){this.set(a,b)
}},render:function(a,b){a.addClass(this.get("controlSize"));return arguments.callee.base.apply(this,arguments)
},createChildViews:function(){var b,a,c;b=this.createChildView(SC.MenuScrollView,{borderStyle:SC.BORDER_NONE,controlSize:this.get("controlSize")});
a=this._menuView=SC.View.create();c=this.get("menuItemViews");a.set("layout",{top:0,left:0,height:this.get("menuHeight")});
a.replaceAllChildren(c);b.set("contentView",a);this.childViews=[b];return this},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();this.becomeMenuPane();
return this},becomeMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(this)
}return this},resignMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(null)
}return this},menuItemViews:function(){var p=[],m=this.get("displayItems"),k=this.get("exampleView"),s,n,q,c,l,b,g,f,i,a,h,e,o,j;
if(!m){return p}c=this.get("itemHeightKey");l=this.get("itemSeparatorKey");b=this.get("itemHeight");
a=this.get("itemKeyEquivalentKey");g=this.get("itemSeparatorHeight");i=Math.floor(this.get("menuHeightPadding")/2);
f=i;e=this.menuItemKeys.map(SC._menu_fetchKeys,this);j=m.get("length");for(o=0;o<j;
o++){s=m[o];q=s.get(c);if(!q){q=s.get(l)?g:b}n=this._menuView.createChildView(k,{layout:{height:q,top:f},contentDisplayProperties:e,content:s,parentMenu:this});
p[o]=n;f+=q;h=s.get(a);if(h){this._keyEquivalents[h]=n}}this.set("menuHeight",f+i);
return p}.property("displayItems").cacheable(),menuItemViewForContentIndex:function(a){var b=this.get("menuItemViews");
if(!b){return undefined}return b.objectAt(a)},_keyEquivalents:{},rootMenu:function(){if(this.get("isSubMenu")){return this.getPath("parentMenu.rootMenu")
}return this}.property("isSubMenu").cacheable(),windowSizeDidChange:function(b,a){this.remove();
return arguments.callee.base.apply(this,arguments)},displayItems:function(){var e=this.get("items"),c=this.get("localize"),i=this.get("itemHeight"),b,f=[],a,g,h;
if(!e){return null}b=e.get("length");for(a=0;a<b;a++){g=e.objectAt(a);if(!g){continue
}h=SC.typeOf(g);if(h===SC.T_STRING){g=SC.Object.create({title:g,value:g,isEnabled:YES})
}else{if(h===SC.T_HASH){g=SC.Object.create(g)}else{if(h===SC.T_ARRAY){g=this.convertArrayMenuItemToObject(g)
}}}g.contentIndex=a;f.push(g)}return f}.property("items").cacheable(),_sc_menu_itemsDidChange:function(){var a=this.get("menuItemViews");
this._menuView.replaceAllChildren(a);this._menuView.adjust("height",this.get("menuHeight"))
}.observes("items"),convertArrayMenuItemToObject:function(g){SC.Logger.warn("Support for Array-based menu items has been deprecated.  Please update your menus to use a hash.");
var f,c=SC._menu_fetchKeys,b=SC._menu_fetchItem,i,e=SC.Object.create(),a,h;f=this.menuItemKeys.map(c,this);
e[f[0]]=g[0];e[f[1]]=g[1];e[f[2]]=g[2];e[f[3]]=g[3];e[f[4]]=g[4];e[f[5]]=g[5];e[f[6]]=g[6];
e[f[7]]=g[7];e[f[8]]=g[8];e[f[9]]=g[9];e[f[10]]=g[10];e[f[11]]=g[11];e[f[12]]=g[12];
return e},currentMenuItem:function(a,b){if(b!==undefined){if(this._currentMenuItem!==null){this.set("previousMenuItem",this._currentMenuItem)
}this._currentMenuItem=b;this.setPath("rootMenu.targetMenuItem",b);return b}return this._currentMenuItem
}.property().cacheable(),_sc_menu_currentMenuItemDidChange:function(){var a=this.get("currentMenuItem"),b=this.get("previousMenuItem");
if(b){if(b.get("hasSubMenu")&&a===null){}else{b.resignFirstResponder();this.closeOpenMenusFor(b)
}}if(a&&a.get("isEnabled")){a.scrollToVisible()}}.observes("currentMenuItem"),closeOpenMenusFor:function(a){if(!a){return
}var b=a.get("parentMenu");while(b&&a){b=a.get("subMenu");if(b){b.remove();a.resignFirstResponder();
a=b.get("previousMenuItem")}}},closeOpenMenus:function(){this.closeOpenMenusFor(this.get("previousMenuItem"))
},mouseDown:function(a){this.modalPaneDidClick(a);return YES},mouseEntered:function(a){this.set("mouseHasEntered",YES)
},keyUp:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b},moveUp:function(){var c=this.get("currentMenuItem"),e=this.get("menuItemViews"),b,f,a;
if(!c){a=e.get("length")-1}else{b=c.getPath("content.contentIndex");if(b===0){return YES
}a=b-1}while(a>=0){if(e[a].get("isEnabled")){this.set("currentMenuItem",e[a]);e[a].becomeFirstResponder();
break}a--}return YES},moveDown:function(){var e=this.get("currentMenuItem"),f=this.get("menuItemViews"),b=f.get("length"),c,g,a;
if(!e){a=0}else{c=e.getPath("content.contentIndex");if(c===b){return YES}a=c+1}while(a<b){if(f[a].get("isEnabled")){this.set("currentMenuItem",f[a]);
f[a].becomeFirstResponder();break}a++}return YES},insertText:function(b,a){var e=this._timer,c=this._keyBuffer;
if(e){e.invalidate()}e=this._timer=SC.Timer.schedule({target:this,action:"clearKeyBuffer",interval:500,isPooled:NO});
c=c||"";c+=b.toUpperCase();this.selectMenuItemForString(c);this._keyBuffer=c;return YES
},performKeyEquivalent:function(b){if(!this.get("isVisibleInWindow")){return NO}var a=this._keyEquivalents[b];
if(a){a.performAction(YES);return YES}if(b==="escape"||b==="return"){this.remove();
return YES}return NO},selectMenuItemForString:function(c){var e=this.get("menuItemViews"),g,h,b,a,f;
if(!e){return}f=c.length;a=e.get("length");for(b=0;b<a;b++){g=e.objectAt(b);h=g.get("title");
if(!h){continue}h=h.replace(/ /g,"").substr(0,f).toUpperCase();if(h===c){this.set("currentMenuItem",g);
g.becomeFirstResponder();break}}},clearKeyBuffer:function(){this._keyBuffer=""},modalPaneDidClick:function(a){this.remove();
return YES}});SC._menu_fetchKeys=function(a){return this.get(a)};SC._menu_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};SC.MenuPane.TINY_MENU_ITEM_HEIGHT=10;SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT=2;
SC.MenuPane.TINY_MENU_HEIGHT_PADDING=2;SC.MenuPane.TINY_SUBMENU_OFFSET_X=0;SC.MenuPane.SMALL_MENU_ITEM_HEIGHT=16;
SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT=7;SC.MenuPane.SMALL_MENU_HEIGHT_PADDING=4;
SC.MenuPane.SMALL_SUBMENU_OFFSET_X=2;SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT=20;SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT=9;
SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING=6;SC.MenuPane.REGULAR_SUBMENU_OFFSET_X=2;
SC.MenuPane.LARGE_MENU_ITEM_HEIGHT=60;SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT=20;
SC.MenuPane.LARGE_MENU_HEIGHT_PADDING=0;SC.MenuPane.LARGE_SUBMENU_OFFSET_X=4;SC.MenuPane.HUGE_MENU_ITEM_HEIGHT=20;
SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT=9;SC.MenuPane.HUGE_MENU_HEIGHT_PADDING=0;
SC.MenuPane.HUGE_SUBMENU_OFFSET_X=0;SC.MenuPane.VERTICAL_OFFSET=23;sc_require("views/button");
SC.SelectButtonView=SC.ButtonView.extend({escapeHTML:YES,objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,iconKey:null,isEnabledKey:"isEnabled",localize:YES,disableSort:YES,classNames:["select-button"],menu:null,itemList:[],itemIdx:null,value:null,checkboxEnabled:YES,separatorPostion:null,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","objects"],preferMatrix:null,SELECT_BUTTON_SPRITE_WIDTH:28,isActiveBinding:"*menu.isVisibleInWindow",isDefaultPosition:NO,lastMenuWidth:null,customView:null,customViewClassName:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,supportFocusRing:YES,isContextMenuEnabled:NO,leftAlign:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:return SC.SelectButtonView.TINY_OFFSET_X;
case SC.SMALL_CONTROL_SIZE:return SC.SelectButtonView.SMALL_OFFSET_X;case SC.REGULAR_CONTROL_SIZE:return SC.SelectButtonView.REGULAR_OFFSET_X;
case SC.LARGE_CONTROL_SIZE:return SC.SelectButtonView.LARGE_OFFSET_X;case SC.HUGE_CONTROL_SIZE:return SC.SelectButtonView.HUGE_OFFSET_X
}return 0}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)
})}return b},render:function(b,f){arguments.callee.base.apply(this,arguments);var c,a,o,s,v,g,u,h,m,p,l,e,j,w,q,n,t,k,i;
c=this.layout.width;if(f&&c){this.adjust({width:c-this.SELECT_BUTTON_SPRITE_WIDTH})
}a=this.get("objects");a=this.sortObjects(a);o=a.length;s=this.get("nameKey");v=this.get("iconKey");
g=this.get("valueKey");i=this.get("isEnabledKey");u=this.get("checkboxEnabled");h=this.get("value");
m=this.get("localize");p=this.get("separatorPostion");l=[];e=YES;j=0;a.forEach(function(x){if(x){w=s?(x.get?x.get(s):x[s]):x.toString();
w=m?w.loc():w;q=v?(x.get?x.get(v):x[v]):null;if(SC.none(x[v])){q=null}n=(g)?(x.get?x.get(g):x[g]):x;
if(!SC.none(h)&&!SC.none(n)){if(h===n){this.set("title",w);this.set("icon",q)}}if(n===this.get("value")){this.set("itemIdx",j);
e=!u?NO:YES}else{e=NO}k=(i)?(x.get?x.get(i):x[i]):x;if(NO!==k){k=YES}if(j===0){this._defaultVal=n;
this._defaultTitle=w;this._defaultIcon=q}var y=SC.Object.create({title:w,icon:q,value:n,isEnabled:k,checkbox:e,target:this,action:"displaySelectedItem"});
l.push(y)}j+=1;if(p&&j===(o-p)){var z=SC.Object.create({separator:YES});l.push(z)
}this.set("itemList",l)},this);if(f){this.invokeLast(function(){var x=this.get("value");
if(SC.none(x)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this.itemIdx)
},_action:function(p){var j,a,m,n,v,s,C,f,B,c,q,w,t,z,g,h,o,b,A,i,l,D,k;j=this.$(".sc-button-label")[0];
D=SC.SelectButtonView.MENU_WIDTH_OFFSET;if(!this.get("isDefaultPosition")){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:D+=SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET;
break;case SC.SMALL_CONTROL_SIZE:D+=SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET;
break;case SC.REGULAR_CONTROL_SIZE:D+=SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET;
break;case SC.LARGE_CONTROL_SIZE:D+=SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET;
break;case SC.HUGE_CONTROL_SIZE:D+=SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET;
break}}a=this.get("layer").offsetWidth+D;m=j.scrollWidth;n=this.get("lastMenuWidth");
if(m){v=j.offsetWidth;if(m&&v){a=a+m-v}}if(!n||(a>n)){n=a}s=this.get("itemList");
var x=this.get("customViewClassName"),u=this.get("customViewMenuOffsetWidth"),e="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
e=x?(e+" "+x):e;i=(this.get("customView")||SC.MenuItemView).create();l=i.get("escapeHTML");
var k=document.body;for(q=0,A=s.length;q<A;++q){B=s.objectAt(q);c=document.createElement("div");
c.style.cssText="top:-10000px; left: -10000px;  position: absolute;";c.className=e;
c.innerHTML=l?SC.RenderContext.escapeHTML(B.title):B.title;k.appendChild(c);C=c.offsetWidth+u;
if(!f||(C>f)){f=C}k.removeChild(c)}f=(f>n)?f:n;var y=SC.RootResponder.responder.get("currentWindowSize").width;
if(f>y){f=(y-25)}this.set("lastMenuWidth",n);w=this.get("value");t=this.get("itemList");
z=this.get("controlSize");h=this.get("customView");o=h?h:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:t,exampleView:o,isEnabled:YES,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:f},controlSize:z,itemWidth:n,performKeyEquivalent:function(F,E){switch(F){case"tab":case"shift_tab":return YES;
default:return arguments.callee.base.apply(this,arguments)}}});if(!b){return NO}b.popup(this,this.preferMatrix);
this.set("menu",b);h=b.menuItemViewForContentIndex(this.get("itemIdx"));b.set("currentMenuItem",h);
if(h){h.becomeFirstResponder()}this.set("isActive",YES);return YES},displaySelectedItem:function(a){var b=this.getPath("menu.selectedItem");
if(!b){return NO}this.set("value",b.get("value"));this.set("title",b.get("title"));
this.set("itemIdx",b.get("contentIndex"));return YES},changeSelectButtonPreferMatrix:function(){var c=0,h=0;
switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:c=SC.SelectButtonView.TINY_OFFSET_Y;
h=SC.MenuPane.TINY_MENU_ITEM_HEIGHT;break;case SC.SMALL_CONTROL_SIZE:c=SC.SelectButtonView.SMALL_OFFSET_Y;
h=SC.MenuPane.SMALL_MENU_ITEM_HEIGHT;break;case SC.REGULAR_CONTROL_SIZE:c=SC.SelectButtonView.REGULAR_OFFSET_Y;
h=SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT;break;case SC.LARGE_CONTROL_SIZE:c=SC.SelectButtonView.LARGE_OFFSET_Y;
h=SC.MenuPane.LARGE_MENU_ITEM_HEIGHT;break;case SC.HUGE_CONTROL_SIZE:c=SC.SelectButtonView.HUGE_OFFSET_Y;
h=SC.MenuPane.HUGE_MENU_ITEM_HEIGHT;break}var f=c,b=this.get("itemIdx"),a=this.get("leftAlign"),g,e;
if(this.get("isDefaultPosition")){g=[1,0,3];this.set("preferMatrix",g)}else{if(b){f=b*h+c
}e=[a,-f,2];this.set("preferMatrix",e)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
this.invokeLast(this._recordMouseDownTimestamp);return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(b){var e=new Date().getTime(),c=this._menuRenderedTimestamp,f=this.get("menu"),g=SC.platform.touch,a;
if(f){a=f.getPath("rootMenu.targetMenuItem");if(a&&a.get("mouseHasEntered")){if(!a.performAction()){f.remove()
}}else{if(!g&&(e-c>SC.ButtonView.CLICK_AND_HOLD_DELAY)){if(!f.get("mouseHasEntered")&&!this.get("isDefaultPosition")){a=f.get("currentMenuItem");
if(a&&!a.performAction()){f.remove()}}else{f.remove()}}}}this._isMouseDown=NO;return YES
},mouseExited:function(){return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES
}else{return arguments.callee.base.apply(this,arguments)}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
},acceptsFirstResponder:function(){return this.get("isEnabled")}.property("isEnabled"),_button_isSelectedDidChange:function(){}.observes("isSelected"),didAppendToDocument:function(){}});
SC.SelectButtonView.TINY_OFFSET_X=0;SC.SelectButtonView.TINY_OFFSET_Y=0;SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.SMALL_OFFSET_X=-18;SC.SelectButtonView.SMALL_OFFSET_Y=3;SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET=7;
SC.SelectButtonView.REGULAR_OFFSET_X=-17;SC.SelectButtonView.REGULAR_OFFSET_Y=3;SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET=4;
SC.SelectButtonView.LARGE_OFFSET_X=-17;SC.SelectButtonView.LARGE_OFFSET_Y=6;SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET=3;
SC.SelectButtonView.HUGE_OFFSET_X=0;SC.SelectButtonView.HUGE_OFFSET_Y=0;SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.MENU_WIDTH_OFFSET=-2;sc_require("panes/panel");SC.SheetPane=SC.PanelPane.extend({classNames:"sc-sheet",modalPane:SC.ModalPane,transitionDuration:200,_state:"NO_VIEW",init:function(){arguments.callee.base.apply(this,arguments);
if(SC.Animatable){SC.SheetPane.ANIMATABLE_AVAILABLE=YES;this.mixin(SC.Animatable);
if(!this.transitions){this.transitions={}}if(!this.transitions.top){this.transitions.top={duration:this.transitionDuration===200?0.3:this.transitionDuration/1000,action:"_complete",target:this}
}}},append:function(){var a=this.get("layout");if(!a.height||!a.top){a=SC.View.convertLayoutToAnchoredLayout(a,this.computeParentDimensions())
}a.top=-1*a.height;if(this.disableAnimation){this.disableAnimation()}this.adjust(a);
this.updateLayout();if(this.enableAnimation){this.enableAnimation()}return arguments.callee.base.apply(this,arguments)
},remove:function(){var b=this,a=arguments;this.invokeLater(function(){a.callee.base.apply(b,a)
},this.transitionDuration);this.slideUp();return this},paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.slideDown();return a},slideDown:function(){this._state=SC.SheetPane.ANIMATING;
this._direction=SC.SheetPane.SLIDE_DOWN;if(SC.SheetPane.ANIMATABLE_AVAILABLE){this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_OUT;
this.adjust("top",0)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},slideUp:function(){this._state=SC.SheetPane.ANIMATING;this._direction=SC.SheetPane.SLIDE_UP;
if(SC.SheetPane.ANIMATABLE_AVAILABLE){var a=this.get("layout");this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_IN;
this.adjust("top",-1*a.height)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},_complete:function(){var a=this._direction;if(a===SC.SheetPane.SLIDE_DOWN){if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",0)
}this.adjust({centerX:0,left:null});if(SC.browser.mozilla){this.parentViewDidChange()
}}else{var b=this.get("layout");if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",-1*b.height)
}}this._state=SC.SheetPane.READY;this.updateLayout()},blurTo:function(a){this.setFirstResponder("")
},tick:function(){this._timer=null;var b=Date.now();var f=(b-this._start)/(this._end-this._start),h=this,a=this._direction,c=this.get("layout"),e,g;
if(f<0){f=0}if(f>=1){this._complete();return this}g=Math.floor(c.height*f);if(a==SC.SheetPane.SLIDE_DOWN){h.adjust("top",0-(c.height-g))
}else{if(a==SC.SheetPane.SLIDE_UP){h.adjust("top",0-g)}}this._timer=this.invokeLater(this.tick,20);
h.updateLayout();return this}});SC.SheetPane.mixin({ANIMATABLE_AVAILABLE:NO,NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",SLIDE_DOWN:"SLIDEDOWN",SLIDE_UP:"SLIDEUP"});
SC.DRAG_LINK=4;SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=7;SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;
SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,slideBack:YES,mouseDownEvent:null,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var e=this.data;if(e){var a=[];for(var b in e){if(e.hasOwnProperty(b)){a.push(b)
}}return a}var c=this.get("source");if(c&&c.dragDataTypes){return c.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(a){return(this.get("dataTypes").indexOf(a)>=0)
},dataForType:function(a){if(this.dataSource){return this.dataSource.dragDataForType(this,a)
}else{if(this.data){return this.data[a]}else{var b=this.get("source");if(b&&SC.typeOf(b.dragDataForType)==SC.T_FUNCTION){return b.dragDataForType(this,a)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,_dragViewWasVisible:null,startDrag:function(){this._createGhostView();
var i=this.event;var f={x:i.pageX,y:i.pageY};this.set("location",f);var b=this._getDragView();
var j=b.get("parentView");var g=j?j.convertFrameToView(b.get("frame"),null):b.get("frame");
if(this.get("ghost")){this._dragViewWasVisible=b.get("isVisible");b.set("isVisible",NO)
}if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}}else{this.ghostOffset={x:(f.x-g.x),y:(f.y-g.y)}
}if(!this._ghostViewHidden){this._positionGhostView(i)}this.ghostView.rootResponder.dragDidStart(this);
var a=this.source;if(a&&a.dragDidBegin){a.dragDidBegin(this,f)}var c=this._dropTargets();
for(var h=0,e=c.length;h<e;h++){c[h].tryToPerform("dragStarted",this,i)}},cancelDrag:function(){var b=this._lastTarget,c=this.get("location");
if(b&&b.dragExited){b.dragExited(this,this._lastMouseDraggedEvent)}this._destroyGhostView();
if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,c,SC.DRAG_NONE)
}this._lastTarget=null;this._dragInProgress=NO},mouseDragged:function(a){var b=this._autoscroll(a);
var g=this.get("location");if(!b&&(a.pageX===g.x)&&(a.pageY===g.y)){return}g={x:a.pageX,y:a.pageY};
this.set("location",g);this._lastMouseDraggedEvent=a;var e=this.source;var c=this._lastTarget;
var f=this._findDropTarget(a);var h=SC.DRAG_NONE;while(f&&(f!==c)&&(h===SC.DRAG_NONE)){if(f&&e&&e.dragSourceOperationMaskFor){h=e.dragSourceOperationMaskFor(this,f)
}else{h=SC.DRAG_ANY}if((h!==SC.DRAG_NONE)&&f&&f.computeDragOperations){h=h&f.computeDragOperations(this,a,h)
}else{h=SC.DRAG_NONE}this.allowedDragOperations=h;if(h===SC.DRAG_NONE){f=this._findNextDropTarget(f)
}}if(f!==c){if(c&&c.dragExited){c.dragExited(this,a)}if(f){if(f.dragEntered){f.dragEntered(this,a)
}if(f.dragUpdated){f.dragUpdated(this,a)}}this._lastTarget=f}else{if(f&&f.dragUpdated){f.dragUpdated(this,a)
}}if(e&&e.dragDidMove){e.dragDidMove(this,g)}if(!this._ghostViewHidden){this._positionGhostView(a)
}},mouseUp:function(m){var h={x:m.pageX,y:m.pageY},i=this._lastTarget,f=this.allowedDragOperations;
this.set("location",h);try{if(i&&i.acceptDragOperation&&i.acceptDragOperation(this,f)){f=i.performDragOperation?i.performDragOperation(this,f):SC.DRAG_NONE
}else{f=SC.DRAG_NONE}}catch(j){console.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(j))
}try{if(i&&i.dragExited){i.dragExited(this,m)}}catch(k){console.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(k))
}var c=this._dropTargets();for(var l=0,g=c.length;l<g;l++){try{c[l].tryToPerform("dragEnded",this,m)
}catch(b){console.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(c[l],b))
}}this._destroyGhostView();if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,h,f)
}this._lastTarget=null;this._dragInProgress=NO},_getDragView:function(){if(!this.dragView){if(!this.source||!this.source.isView){throw"Source can't be used as dragView, because it's not a view."
}this.dragView=this.source}return this.dragView},_createGhostView:function(){var c=this,b=this._getDragView(),e=b.get("frame"),a;
a=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:e.y,left:e.x,width:e.width,height:e.height},owner:this,didCreateLayer:function(){if(b){var f=b.get("layer");
if(f){f=f.cloneNode(true);f.style.top="0px";f.style.left="0px";this.get("layer").appendChild(f)
}}}});a.append()},_positionGhostView:function(a){var c=this.get("location");c.x-=this.ghostOffset.x;
c.y-=this.ghostOffset.y;var b=this.ghostView;if(b){b.adjust({top:c.y,left:c.x});b.invokeOnce("updateLayout")
}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var b=[];var e=SC.Drag._dropTargets;for(var c in e){if(e.hasOwnProperty(c)){b.push(e[c])
}}var g={};var f=SC.Drag._dropTargets;var a=function(h){if(!h){return 0}var j=SC.guidFor(h);
var i=g[j];if(!i){i=1;while(h=h.get("parentView")){if(f[SC.guidFor(h)]!==undefined){i++
}}g[j]=i}return i};b.sort(function(i,h){if(i===h){return 0}i=a(i);h=a(h);return(i>h)?-1:1
});this._cachedDropTargets=b;return b},_findDropTarget:function(c){var h={x:c.pageX,y:c.pageY};
var f,g;var e=this._dropTargets();for(var b=0,a=e.length;b<a;b++){f=e[b];if(!f.get("isVisibleInWindow")){continue
}g=f.convertFrameToView(f.get("clippingFrame"),null);if(SC.pointInRect(h,g)){return f
}}return null},_findNextDropTarget:function(a){var b=SC.Drag._dropTargets;while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a
}}return null},_autoscroll:function(m){if(!m){m=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var h=m?{x:m.pageX,y:m.pageY}:this.get("location"),i=this._findScrollableView(h),n=null,l,c,e,j,b,a,g;
while(i&&!n){l=i.get("canScrollVertical")?1:0;c=i.get("canScrollHorizontal")?1:0;
if(l||c){a=i.get("containerView");if(a){g=i.convertFrameToView(a.get("frame"),null)
}else{l=c=0}}if(l){j=SC.maxY(g);e=j-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=j){l=1
}else{e=SC.minY(g);j=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=j){l=-1}else{l=0
}}}if(c){j=SC.maxX(g);e=j-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=j){c=1
}else{e=SC.minX(g);j=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=j){c=-1}else{c=0
}}}if(l||c){n=i}else{i=this._findNextScrollableView(i)}}if(n&&(this._lastScrollableView===n)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=n;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(n)?Date.now():null;c=l=0}if(n&&(c||l)){var k={x:c*this._horizontalScrollAmount,y:l*this._verticalScrollAmount};
n.scrollBy(k)}if(n){if(m){this._lastAutoscrollEvent={pageX:m.pageX,pageY:m.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var a=[];var c=SC.Drag._scrollableViews;for(var b in c){if(c.hasOwnProperty(b)){a.push(c[b])
}}a=a.sort(function(g,e){var f=g;while(f=f.get("parentView")){if(e==f){return -1}}return 1
});this._cachedScrollableView=a;return a},_findScrollableView:function(g){var c=this._scrollableViews(),b=c?c.length:0,e,f,a;
for(a=0;a<b;a++){e=c[a];if(!e.get("isVisibleInWindow")){continue}f=e.convertFrameToView(e.get("clippingFrame"),null);
if(SC.pointInRect(g,f)){return e}}return null},_findNextScrollableView:function(a){var b=SC.Drag._scrollableViews;
while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a}}return null}});SC.Drag.mixin({start:function(b){var a=this.create(b);
a.startDrag();return a},_dropTargets:{},_scrollableViews:{},addDropTarget:function(a){this._dropTargets[SC.guidFor(a)]=a
},removeDropTarget:function(a){delete this._dropTargets[SC.guidFor(a)]},addScrollableView:function(a){this._scrollableViews[SC.guidFor(a)]=a
},removeScrollableView:function(a){delete this._scrollableViews[SC.guidFor(a)]}});
SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(b,a){this.beginUndoGroup(a);
this._activeGroup.actions.push(b);this.endUndoGroup(a)},beginUndoGroup:function(b){if(this._activeGroup){this.groupingLevel++
}else{var a=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:b,actions:[],prev:this.get(a)};
this.set(a,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(a){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(a){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=a},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(a,c){if(this._activeGroup){return false
}if(this.get(a)==null){return true}this.set(c,true);var f=this.get(a);this.set(a,f.prev);
var b;var e=f.actions.length>1;if(e){this.beginUndoGroup(f.name)}while(b=f.actions.pop()){b()
}if(e){this.endUndoGroup(f.name)}this.set(c,false)}});SC.CheckboxView=SC.ButtonView.extend(SC.StaticLayout,SC.Button,{classNames:["sc-checkbox-view"],tagName:"label",needsEllipsis:NO,render:function(b,a){var c,e,j=this.get("value"),i=j===SC.MIXED_MODE?"mixed":(j===this.get("toggleOnValue")?"true":"false");
if(a){var g=SC.BLANK_IMAGE_URL,f=this.get("isEnabled")?"":'disabled="disabled"',h=SC.guidFor(this);
b.attr("role","checkbox");c=this._field_currentDisplayTitle=this.get("displayTitle");
if(SC.browser.msie){b.attr("for",h)}b.push('<span class="button" ></span>');if(this.get("needsEllipsis")){b.push('<span class="label ellipsis">',c,"</span>")
}else{b.push('<span class="label">',c,"</span>")}b.attr("name",h)}else{c=this.get("displayTitle");
if(c!==this._field_currentDisplayTitle){this._field_currentDisplayTitle=c;this.$("span.label").text(c)
}}b.attr("aria-checked",i)},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;if(a){a.allowDefault()}return YES
},mouseUp:function(a){if(!this.get("isEnabled")||(a&&a.target&&!this.$().within(a.target))){return YES
}var b=this.get("value");if(b===this.get("toggleOnValue")){this.$().attr("aria-checked","false");
this.set("value",this.get("toggleOffValue"))}else{this.$().attr("aria-checked","true");
this.set("value",this.get("toggleOnValue"))}this.set("isActive",NO);this._isMouseDown=NO;
return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
}});SC.LIST_ITEM_ACTION_CANCEL="sc-list-item-cancel-action";SC.LIST_ITEM_ACTION_REFRESH="sc-list-item-cancel-refresh";
SC.LIST_ITEM_ACTION_EJECT="sc-list-item-cancel-eject";SC.ListItemView=SC.View.extend(SC.Control,{classNames:["sc-list-item-view"],content:null,hasContentIcon:NO,hasContentRightIcon:NO,hasContentBranch:NO,contentCheckboxKey:null,contentIconKey:null,contentRightIconKey:null,contentValueKey:null,escapeHTML:YES,contentUnreadCountKey:null,contentIsBranchKey:null,isEditing:NO,outlineIndent:16,outlineLevel:0,disclosureState:SC.LEAF_NODE,validator:null,contentPropertyDidChange:function(){if(this.get("contentIsEditable")!==this.contentIsEditable()){this.notifyPropertyChange("contentIsEditable")
}this.displayDidChange()},contentIsEditable:function(){var a=this.get("content");
return a&&(a.get?a.get("isEditable")!==NO:NO)}.property("content").cacheable(),render:function(c,a){var g=this.get("content"),n=this.displayDelegate,b=this.get("outlineLevel"),f=this.get("outlineIndent"),m,k,j,o=[];
o.push((this.get("contentIndex")%2===0)?"even":"odd");c.setClass("disabled",!this.get("isEnabled"));
j=c.begin("div").addClass("sc-outline");if(b>=0&&f>0){j.addStyle("left",f*(b+1))}k=this.get("disclosureState");
if(k!==SC.LEAF_NODE){this.renderDisclosure(j,k);o.push("has-disclosure")}m=this.getDelegateProperty("contentCheckboxKey",n);
if(m){k=g?(g.get?g.get(m):g[m]):NO;this.renderCheckbox(j,k);o.push("has-checkbox")
}if(this.getDelegateProperty("hasContentIcon",n)){m=this.getDelegateProperty("contentIconKey",n);
k=(m&&g)?(g.get?g.get(m):g[m]):null;this.renderIcon(j,k);o.push("has-icon")}m=this.getDelegateProperty("contentValueKey",n);
k=(m&&g)?(g.get?g.get(m):g[m]):g;if(k&&SC.typeOf(k)!==SC.T_STRING){k=k.toString()
}if(this.get("escapeHTML")){k=SC.RenderContext.escapeHTML(k)}this.renderLabel(j,k);
if(this.getDelegateProperty("hasContentRightIcon",n)){m=this.getDelegateProperty("contentRightIconKey",n);
k=(m&&g)?(g.get?g.get(m):g[m]):null;this.renderRightIcon(j,k);o.push("has-right-icon")
}m=this.getDelegateProperty("contentUnreadCountKey",n);k=(m&&g)?(g.get?g.get(m):g[m]):null;
if(!SC.none(k)&&(k!==0)){this.renderCount(j,k);var e=["zero","one","two","three","four","five"];
var l=k.toString().length;var i=e.length;var h=(l<i)?e[l]:e[i-1];o.push("has-count "+h+"-digit")
}m=this.getDelegateProperty("listItemActionProperty",n);k=(m&&g)?(g.get?g.get(m):g[m]):null;
if(k){this.renderAction(j,k);o.push("has-action")}if(this.getDelegateProperty("hasContentBranch",n)){m=this.getDelegateProperty("contentIsBranchKey",n);
k=(m&&g)?(g.get?g.get(m):g[m]):NO;this.renderBranch(j,k);o.push("has-branch")}c.addClass(o);
c=j.end()},renderDisclosure:function(f,g){var e=(g===SC.BRANCH_OPEN)?"open":"closed",a=this._scli_disclosureHtml,c,b;
if(!a){a=this.constructor.prototype._scli_disclosureHtml={}}c=a[e];if(!c){c=a[e]='<img src="'+SC.BLANK_IMAGE_URL+'" class="disclosure button '+e+'" />'
}f.push(c)},renderCheckbox:function(g,i){var f=(i===SC.MIXED_STATE)?"mixed":i?"sel":"nosel",b=this._scli_checkboxHtml,h=this.get("contentIsEditable")&&this.get("isEnabled"),e,c,a=[];
if(!h){f=SC.keyFor("disabled",f)}if(!b){b=this.constructor.prototype._scli_checkboxHtml={}
}e=b[f];if(!e){c=SC.RenderContext("div").attr("role","button").classNames(SC.clone(SC.CheckboxView.prototype.classNames));
if(i===SC.MIXED_STATE){a.push("mixed")}else{if(i){a.push("sel")}}if(!h){a.push("disabled")
}c.addClass(a);c.push('<span class="button"></span>');e=b[f]=c.join()}g.push(e)},renderIcon:function(c,f){var b=null,e=null,a=[];
if(f&&SC.ImageView.valueIsUrl(f)){b=f;e=""}else{e=f;b=SC.BLANK_IMAGE_URL}a.push(e,"icon");
c.begin("img").addClass(a).attr("src",b).end()},renderLabel:function(b,a){b.push("<label>",a||"","</label>")
},$label:function(){return this.$("label")},renderRightIcon:function(c,f){var b=null,e=null,a=[];
if(f&&SC.ImageView.valueIsUrl(f)){b=f;e=""}else{e=f;b=SC.BLANK_IMAGE_URL}a.push("right-icon",e);
c.begin("img").addClass(a).attr("src",b).end()},renderCount:function(a,b){a.push('<span class="count"><span class="inner">',b.toString(),"</span></span>")
},renderAction:function(a,b){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="action" />')
},renderBranch:function(c,b){var a=[];a.push("branch",b?"branch-visible":"branch-hidden");
c.begin("span").addClass(a).push("&nbsp;").end()},_isInsideElementWithClassName:function(f,a){var c=this.get("layer");
if(!c){return NO}var e=SC.$(a.target);var b=NO,g;while(!b&&e.length>0&&(e[0]!==c)){if(e.hasClass(f)){b=YES
}e=e.parent()}e=c=null;return b},_isInsideCheckbox:function(b){var a=this.displayDelegate;
var c=this.getDelegateProperty("contentCheckboxKey",a);return c&&this._isInsideElementWithClassName("sc-checkbox-view",b)
},_isInsideDisclosure:function(a){if(this.get("disclosureState")===SC.LEAF_NODE){return NO
}return this._isInsideElementWithClassName("disclosure",a)},_isInsideRightIcon:function(c){var b=this.displayDelegate;
var a=this.getDelegateProperty("hasContentRightIcon",b)||!SC.none(this.rightIcon);
return a&&this._isInsideElementWithClassName("right-icon",c)},mouseDown:function(a){if(!this.get("contentIsEditable")){return NO
}if(this._isInsideCheckbox(a)){this._addCheckboxActiveState();this._isMouseDownOnCheckbox=YES;
this._isMouseInsideCheckbox=YES;return YES}else{if(this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseDownOnDisclosure=YES;this._isMouseInsideDisclosure=YES;return YES}else{if(this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseDownOnRightIcon=YES;this._isMouseInsideRightIcon=YES;return YES}}}return NO
},mouseUp:function(i){var c=NO,j,e,b,a,h,g;if(this._isMouseDownOnCheckbox){if(this._isInsideCheckbox(i)){j=this.displayDelegate;
e=this.getDelegateProperty("contentCheckboxKey",j);b=this.get("content");if(b&&b.get){var f=b.get(e);
f=(f===SC.MIXED_STATE)?YES:!f;b.set(e,f);this.displayDidChange()}}this._removeCheckboxActiveState();
c=YES}else{if(this._isMouseDownOnDisclosure){if(this._isInsideDisclosure(i)){a=this.get("disclosureState");
h=this.get("contentIndex");g=(!SC.none(h))?SC.IndexSet.create(h):null;j=this.get("displayDelegate");
if(a===SC.BRANCH_OPEN){if(g&&j&&j.collapse){j.collapse(g)}else{this.set("disclosureState",SC.BRANCH_CLOSED)
}this.displayDidChange()}else{if(a===SC.BRANCH_CLOSED){if(g&&j&&j.expand){j.expand(g)
}else{this.set("disclosureState",SC.BRANCH_OPEN)}this.displayDidChange()}}}this._removeDisclosureActiveState();
c=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();c=YES
}}}this._isMouseInsideCheckbox=this._isMouseDownOnCheckbox=NO;this._isMouseDownOnDisclosure=this._isMouseInsideDisclosure=NO;
this._isMouseInsideRightIcon=this._isMouseDownOnRightIcon=NO;return c},mouseMoved:function(a){if(this._isMouseDownOnCheckbox&&this._isInsideCheckbox(a)){this._addCheckboxActiveState();
this._isMouseInsideCheckbox=YES}else{if(this._isMouseDownOnCheckbox){this._removeCheckboxActiveState();
this._isMouseInsideCheckbox=NO}else{if(this._isMouseDownOnDisclosure&&this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseInsideDisclosure=YES}else{if(this._isMouseDownOnDisclosure){this._removeDisclosureActiveState();
this._isMouseInsideDisclosure=NO}else{if(this._isMouseDownOnRightIcon&&this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseInsideRightIcon=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();
this._isMouseInsideRightIcon=NO}}}}}}return NO},touchStart:function(a){return this.mouseDown(a)
},touchEnd:function(a){return this.mouseUp(a)},touchEntered:function(a){return this.mouseEntered(a)
},touchExited:function(a){return this.mouseExited(a)},_addCheckboxActiveState:function(){var a=this.get("isEnabled");
this.$(".sc-checkbox-view").setClass("active",a)},_removeCheckboxActiveState:function(){this.$(".sc-checkbox-view").removeClass("active")
},_addDisclosureActiveState:function(){var a=this.get("isEnabled");this.$("img.disclosure").setClass("active",a)
},_removeDisclosureActiveState:function(){this.$("img.disclosure").removeClass("active")
},_addRightIconActiveState:function(){this.$("img.right-icon").setClass("active",YES)
},_removeRightIconActiveState:function(){this.$("img.right-icon").removeClass("active")
},contentHitTest:function(b){var a=this.displayDelegate;var c=this.getDelegateProperty("contentValueKey",a);
if(!c){return NO}var f=this.$label()[0];if(!f){return NO}var g=b.target,e=this.get("layer");
while(g&&(g!==e)&&(g!==window)){if(g===f){return YES}g=g.parentNode}return NO},beginEditing:function(){if(this.get("isEditing")){return YES
}return this._beginEditing(YES)},_beginEditing:function(x){var q=this.get("content"),i=this.get("displayDelegate"),h=this.getDelegateProperty("contentValueKey",i),j=this.get("parentView"),w=j?j.get("frame"):null,a=this.$label(),e=this.get("validator"),t,l,g,m,b,o,c,p,u,s,y;
if(x&&this.scrollToVisible()){var k=this.get("owner"),n=this.get("contentIndex");
this.invokeLast(function(){var f=k.itemViewForContentIndex(n);if(f&&f._beginEditing){f._beginEditing(NO)
}});return YES}if(!j||!a||a.get("length")===0){return NO}l=(h&&q&&q.get)?q.get(h):null;
t=this.computeFrameWithParentFrame(null);g=SC.viewportOffset(a[0]);m=a.css("lineHeight");
b=a.css("fontSize");o=this.$().css("top");if(o){o=parseInt(o.substring(0,o.length-2),0)
}else{o=0}c=m;u=0;if(b&&c){s=b*1.5;if(s<c){a.css({lineHeight:"1.5"});u=(c-s)/2}else{m=null
}}t.x=g.x;t.y=g.y+o+u;t.height=a[0].offsetHeight;t.width=a[0].offsetWidth;p=this.get("escapeHTML");
y=SC.InlineTextFieldView.beginEditing({frame:t,exampleElement:a,delegate:this,value:l,multiline:NO,isCollection:YES,validator:e,escapeHTML:p});
if(m){a.css({lineHeight:m})}return y},commitEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.commitEditing()},discardEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.discardEditing()},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)
},inlineEditorDidBeginEditing:function(b){var a=this.$label();this._oldOpacity=a.css("opacity");
a.css("opacity",0)},inlineEditorShouldBeginEditing:function(a){return YES},inlineEditorShouldBeginEditing:function(a,b){return YES
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(c,f){this.set("isEditing",NO);
var e=this.get("content");var a=this.displayDelegate;var b=this.getDelegateProperty("contentValueKey",a);
if(b&&e&&e.set){e.set(b,f)}this.displayDidChange()}});sc_require("mixins/collection_view_delegate");
sc_require("views/list_item");SC.DRAG_REORDER=16;SC.HORIZONTAL_ORIENTATION="horizontal";
SC.VERTICAL_ORIENTATION="vertical";SC.BENCHMARK_RELOAD=NO;SC.CollectionView=SC.View.extend(SC.CollectionViewDelegate,SC.CollectionContent,{classNames:["sc-collection-view"],ACTION_DELAY:200,useFastPath:NO,content:null,contentBindingDefault:SC.Binding.multiple(),length:0,nowShowing:function(){return this.computeNowShowing()
}.property("length","clippingFrame").cacheable(),selection:null,isSelectable:YES,isSelectableBindingDefault:SC.Binding.bool(),isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),isEditable:YES,isEditableBindingDefault:SC.Binding.bool(),canReorderContent:NO,canReorderContentBindingDefault:SC.Binding.bool(),canDeleteContent:NO,canDeleteContentBindingDefault:SC.Binding.bool(),canEditContent:NO,canEditContentBindingDefault:SC.Binding.bool(),isDropTarget:NO,useToggleSelection:NO,actOnSelect:NO,selectOnMouseDown:YES,exampleView:SC.ListItemView,contentExampleViewKey:null,groupExampleView:null,contentGroupExampleViewKey:null,action:null,target:null,contentValueKey:null,acceptsFirstResponder:NO,isActive:NO,calculatedHeight:0,calculatedWidth:0,computeLayout:function(){return null
},layoutForContentIndex:function(a){return null},allContentIndexes:function(){return SC.IndexSet.create(0,this.get("length")).freeze()
}.property("length").cacheable(),contentIndexesInRect:function(a){return null},computeNowShowing:function(){var c=this.contentIndexesInRect(this.get("clippingFrame"));
if(!c){c=this.get("allContentIndexes")}else{var b=this.get("length"),a=c.get("max");
if(a>b){c=c.copy().remove(b,a-b).freeze()}}return c},showInsertionPoint:function(a,b){},hideInsertionPoint:function(){},delegate:null,selectionDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionViewDelegate",a,b)}.property("delegate","content").cacheable(),contentDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionContent",a,b)}.property("delegate","content").cacheable(),_contentGroupIndexes:function(){return this.get("contentDelegate").contentGroupIndexes(this,this.get("content"))
}.property("contentDelegate","content").cacheable(),contentRangeDidChange:function(e,b,c,a){if(!b&&(c==="[]")){this.notifyPropertyChange("_contentGroupIndexes");
this.reload(a)}else{this.contentPropertyDidChange(b,c,a)}},contentPropertyDidChange:function(c,b,a){},updateContentRangeObserver:function(){var e=this.get("nowShowing"),a=this._cv_contentRangeObserver,c=this.get("content");
if(!c){return}if(a){c.updateRangeObserver(a,e)}else{var b=this.contentRangeDidChange;
a=c.addRangeObserver(e,this,b,null);this._cv_contentRangeObserver=a}},removeContentRangeObserver:function(){var b=this.get("content"),a=this._cv_contentRangeObserver;
if(a){if(b){b.removeRangeObserver(a)}this._cv_contentRangeObserver=null}},contentLengthDidChange:function(){var a=this.get("content");
this.set("length",a?a.get("length"):0)},_cv_contentDidChange:function(){var b=this.get("content"),a=this.contentLengthDidChange;
if(b===this._content){return}this.removeContentRangeObserver();if(this._content){this._content.removeObserver("length",this,a)
}this._content=b;if(b){b.addObserver("length",this,a)}this.contentLengthDidChange();
this.contentRangeDidChange(b,null,"[]",null)}.observes("content"),_invalidIndexes:NO,reload:function(a){var b=this._invalidIndexes;
if(a&&b!==YES){if(b){b.add(a)}else{b=this._invalidIndexes=a.clone()}}else{this._invalidIndexes=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadIfNeeded)}return this
},reloadIfNeeded:function(){var z=this._invalidIndexes;if(!z||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;var w=this.get("content"),x,y,o,B=this.computeLayout(),A=SC.BENCHMARK_RELOAD,c=this.get("nowShowing"),C=this._sc_itemViews,p=this.get("containerView")||this,a,t,v,u,m,q,j,s,f,n,l,D,e,b,h,k,g;
if(z.isIndexSet&&z.contains(c)){z=YES}if(this.willReload){this.willReload(z===YES?null:z)
}a=this.get("exampleView");v=a?a.isReusableInCollections:NO;t=this.get("groupExampleView");
u=t?t.isReusableInCollections:NO;if(z.isIndexSet){if(A){SC.Benchmark.start(A="%@#reloadIfNeeded (Partial)".fmt(this),YES)
}q=[];j=[];s=[];z.forEach(function(i){o=C?C[i]:null;if(c.contains(i)){if(o&&o.parentView===p){j.push(i)
}else{s.push(i)}}else{if(o&&o.parentView===p){q.push(i)}}},this);for(x=0,y=q.length;
x<y;++x){n=q[x];o=C?C[n]:null;delete C[n];h=this.get("contentDelegate");k=this.get("_contentGroupIndexes");
g=k&&k.contains(n);if(g){g=h.contentIndexIsGroup(this,w,n)}m=g?u:v;if(m){b=g?this._GROUP_VIEW_POOL:this._VIEW_POOL;
b.push(o);o.destroyLayer()}D=o.get("layer");if(D&&D.parentNode){D.parentNode.removeChild(D)
}p.removeChild(o);if(!m){o.destroy()}}for(x=0,y=j.length;x<y;++x){n=j[x];o=C?C[n]:null;
l=this.itemViewForContentIndex(n,YES);o.destroyLayer();p.replaceChild(l,o)}for(x=0,y=s.length;
x<y;++x){n=s[x];l=this.itemViewForContentIndex(n,YES);p.insertBefore(l,null)}if(A){SC.Benchmark.end(A)
}}else{if(A){SC.Benchmark.start(A="%@#reloadIfNeeded (Full)".fmt(this),YES)}if(C){C.length=0
}f=p.get("childViews");if(f){f=f.copy()}p.beginPropertyChanges();if(this.willRemoveAllChildren){this.willRemoveAllChildren()
}p.destroyLayer().removeAllChildren();if(f){for(x=0,y=f.length;x<y;++x){l=f[x];g=l.get("isGroupView");
m=g?u:v;if(m){b=g?this._GROUP_VIEW_POOL:this._VIEW_POOL;b.push(l);l.destroyLayer()
}else{l.destroy()}}}f=[];c.forEach(function(i){f.push(this.itemViewForContentIndex(i,YES))
},this);p.set("childViews",f);p.replaceLayer();p.endPropertyChanges();if(A){SC.Benchmark.end(A)
}}if(B){this.adjust(B)}if(this.didReload){this.didReload(z===YES?null:z)}return this
},displayProperties:"isFirstResponder isEnabled isActive".w(),render:function(a,b){a.setClass("focus",this.get("isFirstResponder"));
a.setClass("disabled",!this.get("isEnabled"));a.setClass("active",this.get("isActive"));
return arguments.callee.base.apply(this,arguments)},_TMP_ATTRS:{},_COLLECTION_CLASS_NAMES:"sc-collection-item".w(),_GROUP_COLLECTION_CLASS_NAMES:"sc-collection-item sc-group-item".w(),_VIEW_POOL:null,_GROUP_VIEW_POOL:null,itemViewForContentIndex:function(m,a){var x;
var w=this._sc_itemViews;if(!w){w=this._sc_itemViews=[]}else{if(!a&&(x=w[m])){return x
}}var o=this.get("content"),q=o.objectAt(m),i=this.get("contentDelegate"),k=this.get("_contentGroupIndexes"),j=NO,y,l,s,g,t,e,b,c,v,h,f,p,u;
j=k&&k.contains(m);if(j){j=i.contentIndexIsGroup(this,o,m)}if(j){y=this.get("contentGroupExampleViewKey");
if(y&&q){l=q.get(y)}if(!l){l=this.get("groupExampleView")||this.get("exampleView")
}t="_GROUP_VIEW_POOL"}else{y=this.get("contentExampleViewKey");if(y&&q){l=q.get(y)
}if(!l){l=this.get("exampleView")}t="_VIEW_POOL"}c=this.get("containerView")||this;
g=this.layerIdFor(m);v=i.contentIndexIsEnabled(this,o,m);h=i.contentIndexIsSelected(this,o,m);
f=i.contentIndexOutlineLevel(this,o,m);p=i.contentIndexDisclosureState(this,o,m);
u=this.isVisibleInWindow;s=this.layoutForContentIndex(m);if(l&&l.isReusableInCollections){e=this[t];
if(!e){e=this[t]=[]}if(e.length>0){x=e.pop();b=x.prepareForReuse;if(b){b.call(x)}x.beginPropertyChanges();
x.set("contentIndex",m);x.set("layerId",g);x.set("isEnabled",v);x.set("isSelected",h);
x.set("outlineLevel",f);x.set("disclosureState",p);x.set("isVisibleInWindow",u);x.set("parentView",c);
SC.View.views[g]=x;if(s){x.set("layout",s)}else{x.set("layout",l.prototype.layout)
}x.set("content",q);x.endPropertyChanges()}}if(!x){var n=this._TMP_ATTRS;n.contentIndex=m;
n.content=q;n.owner=n.displayDelegate=this;n.parentView=c;n.page=this.page;n.layerId=g;
n.isEnabled=v;n.isSelected=h;n.outlineLevel=f;n.disclosureState=p;n.isGroupView=j;
n.isVisibleInWindow=u;if(j){n.classNames=this._GROUP_COLLECTION_CLASS_NAMES}else{n.classNames=this._COLLECTION_CLASS_NAMES
}if(s){n.layout=s}else{delete n.layout}x=this.createItemView(l,m,n)}w[m]=x;return x
},itemViewForContentObject:function(a){return this.itemViewForContentIndex(this.get("content").indexOf(a))
},_TMP_LAYERID:[],createItemView:function(c,a,b){return c.create(b)},layerIdFor:function(a){var b=this._TMP_LAYERID;
b[0]=SC.guidFor(this);b[1]=a;return b.join("-")},contentIndexForLayerId:function(c){if(!c||!(c=c.toString())){return null
}var b=this._baseLayerId;if(!b){b=this._baseLayerId=SC.guidFor(this)+"-"}if((c.length<=b.length)||(c.indexOf(b)!==0)){return null
}var a=Number(c.slice(c.lastIndexOf("-")+1));return isNaN(a)?null:a},itemViewForEvent:function(k){var e=this.getPath("pane.rootResponder");
if(!e){return null}var c=SC.guidFor(this)+"-",a=c.length,f=k.target,h=this.get("layer"),g=null,b,j,i;
while(f&&f!==document&&f!==h){b=f?SC.$(f).attr("id"):null;if(b&&(g=this.contentIndexForLayerId(b))!==null){break
}f=f.parentNode}if(g===null||(f===h)){f=h=null;return null}if(g>=this.get("length")){throw"layout for item view %@ was found when item view does not exist (%@)".fmt(b,this)
}return this.itemViewForContentIndex(g)},expand:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(e){var f=a.contentIndexDisclosureState(this,c,e);if(f===SC.BRANCH_CLOSED){a.contentIndexExpand(this,c,e)
}},this);return this},collapse:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(e){var f=a.contentIndexDisclosureState(this,c,e);if(f===SC.BRANCH_OPEN){a.contentIndexCollapse(this,c,e)
}},this);return this},_cv_selectionDidChange:function(){var c=this.get("selection"),b=this._cv_selection,a=this._cv_selectionContentDidChange;
if(c===b){return}if(b){b.removeObserver("[]",this,a)}if(c){c.addObserver("[]",this,a)
}this._cv_selection=c;this._cv_selectionContentDidChange()}.observes("selection"),_cv_selectionContentDidChange:function(){var c=this.get("selection"),b=this._cv_selindexes,a=this.get("content"),e;
this._cv_selindexes=c?c.frozenCopy():null;if(b){b=b.indexSetForSource(a)}if(c){c=c.indexSetForSource(a)
}if(c&&b){e=c.without(b).add(b.without(c))}else{e=c||b}if(e&&e.get("length")>0){this.reloadSelectionIndexes(e)
}},_invalidSelection:NO,reloadSelectionIndexes:function(a){var b=this._invalidSelection;
if(a&&(b!==YES)){if(b){b.add(a)}else{b=this._invalidSelection=a.copy()}}else{this._invalidSelection=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)
}return this},reloadSelectionIndexesIfNeeded:function(){var f=this._invalidSelection;
if(!f||!this.get("isVisibleInWindow")){return this}var e=this.get("nowShowing"),b=this._invalidIndexes,a=this.get("content"),c=this.get("selection");
this._invalidSelection=NO;if(b===YES||!e){return this}if(f===YES){f=e}if(b&&b.isIndexSet){f=f.without(b)
}f.forEach(function(g){if(!e.contains(g)){return}var h=this.itemViewForContentIndex(g,NO);
if(h){h.set("isSelected",c?c.contains(a,g):NO)}},this);return this},select:function(c,g){var e=this.get("content"),a=this.get("selectionDelegate"),b=this.get("_contentGroupIndexes"),f;
if(!this.get("isSelectable")){return this}if(SC.typeOf(c)===SC.T_NUMBER){c=SC.IndexSet.create(c,1)
}if(c&&c.get("length")>0){if(b&&b.get("length")>0){c=c.copy().remove(b)}c=a.collectionViewShouldSelectIndexes(this,c,g);
if(!c||c.get("length")===0){return this}}else{c=null}if(g&&(f=this.get("selection"))){f=f.copy()
}else{f=SC.SelectionSet.create()}if(c&&c.get("length")>0){if(c.get("length")===1){f.addObject(e.objectAt(c.get("firstObject")))
}else{f.add(e,c)}}f=a.collectionViewSelectionForProposedSelection(this,f);if(!f){f=SC.SelectionSet.create()
}this._selectionAnchor=null;this.set("selection",f.freeze());return this},deselect:function(b){var e=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate");
if(!this.get("isSelectable")){return this}if(!e||e.get("length")===0){return this
}if(SC.typeOf(b)===SC.T_NUMBER){b=SC.IndexSet.create(b,1)}b=a.collectionViewShouldDeselectIndexes(this,b);
if(!b||b.get("length")===0){return this}e=e.copy().remove(c,b);e=a.collectionViewSelectionForProposedSelection(this,e);
if(!e){e=SC.SelectionSet.create()}this.set("selection",e.freeze());return this},_findNextSelectableItemFromIndex:function(i,a){var c=this.get("length"),e=SC.IndexSet.create(),f=this.get("content"),j=this.get("selectionDelegate"),h=this.get("_contentGroupIndexes"),g,b;
if(!h&&(j.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return i
}while(i<c){if(!h||!h.contains(i)){e.add(i);g=j.collectionViewShouldSelectIndexes(this,e);
if(g&&g.get("length")>=1){return i}e.remove(i)}i++}if(a===undefined){b=this.get("selection");
a=b?b.get("max"):-1}return a},_findPreviousSelectableItemFromIndex:function(b,i){var c=SC.IndexSet.create(),g=this.get("content"),a=this.get("selectionDelegate"),f=this.get("_contentGroupIndexes"),e;
if(SC.none(b)){b=-1}if(!f&&(a.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return b
}while(b>=0){if(!f||!f.contains(b)){c.add(b);e=a.collectionViewShouldSelectIndexes(this,c);
if(e&&e.get("length")>=1){return b}c.remove(b)}b--}if(i===undefined){var h=this.get("selection");
i=h?h.get("min"):-1}if(SC.none(i)){i=-1}return i},selectPreviousItem:function(i,b){if(SC.none(b)){b=1
}if(SC.none(i)){i=false}var g=this.get("selection"),f=this.get("content");if(g){g=g.indexSetForSource(f)
}var h=g?g.get("min"):-1,a=g?g.get("max")-1:-1,e=this._selectionAnchor;if(SC.none(e)){e=h
}if(i){if(a>e){a=a-b}else{h=this._findPreviousSelectableItemFromIndex(h-b)}if(SC.none(h)||(h<0)){h=0
}if(!f.objectAt(h)){h=g?g.get("min"):-1}if(a<h){a=h}}else{h=this._findPreviousSelectableItemFromIndex(h-b);
if(SC.none(h)||(h<0)){h=0}if(!f.objectAt(h)){h=g?g.get("min"):-1}a=h;e=null}var c=h;
g=SC.IndexSet.create(h,a+1-h);this.scrollToContentIndex(c);this.select(g);this._selectionAnchor=e;
return this},selectNextItem:function(i,j){if(SC.none(j)){j=1}if(SC.none(i)){i=false
}var b=this.get("selection"),h=this.get("content");if(b){b=b.indexSetForSource(h)
}var a=b?b.get("min"):-1,e=b?b.get("max")-1:-1,f=this._selectionAnchor,c=this.get("length");
if(SC.none(f)){f=a}if(i){if(a<f){a=a+j}else{e=this._findNextSelectableItemFromIndex(e+j,e)
}if(e>=c){e=c-1}if(!h.objectAt(e)){e=b?b.get("max")-1:-1}if(a>e){a=e}}else{e=this._findNextSelectableItemFromIndex(e+j,e);
if(e>=c){e=c-1}if(!h.objectAt(e)){e=b?b.get("max")-1:-1}a=e;f=null}var g=e;b=SC.IndexSet.create(a,e-a+1);
this.scrollToContentIndex(g);this.select(b);this._selectionAnchor=f;return this},deleteSelection:function(){if(!this.get("canDeleteContent")){return NO
}var e=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate"),b=e&&c?e.indexSetForSource(c):null;
if(!c||!b||b.get("length")===0){return NO}b=a.collectionViewShouldDeleteIndexes(this,b);
if(!b||b.get("length")===0){return NO}a.collectionViewDeleteContent(this,this.get("content"),b);
return YES},scrollToContentIndex:function(b){var a=this.itemViewForContentIndex(b);
if(a){this.scrollToItemView(a)}return this},scrollToItemView:function(a){if(a){a.scrollToVisible()
}return this},keyDown:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b
},keyUp:function(){return true},insertText:function(b,a){if(b===" "){var c=this.get("selection");
if(c&&c.get("length")>0){this.invokeLater(this._cv_action,0,null,a)}return YES}else{return NO
}},selectAll:function(a){var b=this.get("content"),c=b?SC.IndexSet.create(0,b.get("length")):null;
this.select(c,NO);return YES},deleteBackward:function(a){return this.deleteSelection()
},deleteForward:function(a){return this.deleteSelection()},moveDown:function(b,a){this.selectNextItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUp:function(b,a){this.selectPreviousItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeft:function(l){if(l.ctrlKey||l.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(false,1);this._cv_performSelectAction(null,l,this.ACTION_DELAY)
}else{var c=this.get("selection"),j=this.get("content"),h=c?c.indexSetForSource(j):null;
if(h){var m=undefined,g=false,i=undefined;if(h.get("length")===1){i=h.get("firstObject");
m=this.get("contentDelegate");var b=m.contentIndexDisclosureState(this,j,i);if(b!==SC.BRANCH_OPEN){g=true
}}if(g){var a=m.contentIndexOutlineLevel(this,j,i)-1;if(a>=0){var f=-1;while(f<0){var e=this._findPreviousSelectableItemFromIndex(i-1);
if(e<0){return false}i=e;var k=m.contentIndexOutlineLevel(this,j,i);if(k===a){f=e
}}if(f!==-1){this.select(i)}}}else{this.collapse(h)}}}return true},moveRight:function(a){if(a.ctrlKey||a.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectNextItem(false,1);this._cv_performSelectAction(null,a,this.ACTION_DELAY)
}else{var e=this.get("selection"),c=this.get("content"),b=e?e.indexSetForSource(c):null;
if(b){this.expand(b)}}return true},moveDownAndModifySelection:function(b,a){this.selectNextItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUpAndModifySelection:function(b,a){this.selectPreviousItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeftAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},moveRightAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectNextItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},insertNewline:function(e,c){var b=this.get("isEditable")&&this.get("canEditContent"),h,g,i,a,f;
if(b){h=this.get("selection");g=this.get("content");if(h&&h.get("length")===1){i=h.indexSetForSource(g);
a=i?i.get("min"):-1;b=a>=0}}if(b){f=this.itemViewForContentIndex(a);b=f&&SC.typeOf(f.beginEditing)===SC.T_FUNCTION
}if(b){this.scrollToContentIndex(a);f=this.itemViewForContentIndex(a);f.beginEditing()
}else{this.invokeLater(this._cv_action,0,f,null)}return YES},mouseDown:function(j){var h=this.itemViewForEvent(j),g=this.get("content"),f=h?h.get("contentIndex"):-1,c,e,b,a,k,i=g.get("allowsMultipleSelection");
c=this.mouseDownInfo={event:j,itemView:h,contentIndex:f,at:Date.now()};this.becomeFirstResponder();
if(this.get("useToggleSelection")){if(this.get("selectOnMouseDown")){if(!h){return
}b=this.get("selection");a=b&&b.containsObject(h.get("content"));if(a){this.deselect(f)
}else{if(!i){this.select(f,NO)}else{this.select(f,YES)}}}return YES}if(!h){if(this.get("allowDeselectAll")){this.select(null,false)
}return YES}b=this.get("selection");if(b){b=b.indexSetForSource(g)}a=b?b.contains(f):NO;
c.modifierKeyPressed=k=j.ctrlKey||j.metaKey;if(k&&a){c.shouldDeselect=f>=0}else{if(j.shiftKey&&b&&b.get("length")>0&&i){b=this._findSelectionExtendedByShift(b,f);
e=this._selectionAnchor;this.select(b);this._selectionAnchor=e}else{if(!k&&a){c.shouldReselect=f>=0
}else{if((j.shiftKey||k)&&!i){this.select(null,false)}if(this.get("selectOnMouseDown")){this.select(f,k)
}else{c.shouldSelect=f>=0}}}}c.previousContentIndex=f;return YES},mouseUp:function(j){var k=this.itemViewForEvent(j),e=this.mouseDownInfo,g=this.get("content"),f,c,a,b,h,l,i=g.get("allowsMultipleSelection");
if(this.get("useToggleSelection")){if(!k||this.get("selectOnMouseDown")){return NO
}c=this.get("selection");f=(k)?k.get("contentIndex"):-1;a=c&&c.containsObject(k.get("content"));
if(a){this.deselect(f)}else{if(!i){this.select(f,NO)}else{this.select(f,YES)}}}else{if(e){l=e.contentIndex;
f=(k)?k.get("contentIndex"):-1;if(e.shouldSelect){this.select(l,e.modifierKeyPressed)
}if(e.shouldDeselect){this.deselect(l)}if(e.shouldReselect){b=this.get("isEditable")&&this.get("canEditContent");
if(b){c=this.get("selection");b=c&&(c.get("length")===1)}if(b){h=this.itemViewForContentIndex(l);
b=h&&(!h.contentHitTest||h.contentHitTest(j));b=(b&&h.beginEditing)?h.beginEditing():NO
}if(!b){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()}this._cv_reselectTimer=this.invokeLater(this.select,300,l,false)
}}this._cleanupMouseDown()}}this._cv_performSelectAction(k,j,0,j.clickCount);return NO
},_cleanupMouseDown:function(){var b=this.mouseDownInfo,a;if(b){for(a in b){if(!b.hasOwnProperty(a)){continue
}delete b[a]}}this.mouseDownInfo=null},mouseMoved:function(c){var a=this.itemViewForEvent(c),b=this._lastHoveredItem;
if(a!==b){if(b&&b.mouseExited){b.mouseExited(c)}if(a&&a.mouseEntered){a.mouseEntered(c)
}}this._lastHoveredItem=a;if(a&&a.mouseMoved){a.mouseMoved(c)}return YES},mouseExited:function(b){var a=this._lastHoveredItem;
this._lastHoveredItem=null;if(a&&a.mouseExited){a.mouseExited(b)}return YES},touchStart:function(e){if(this.get("useToggleSelection")){return true
}var b=this.itemViewForEvent(e),c=this.get("content"),g=b?b.get("contentIndex"):-1,f,a;
this.becomeFirstResponder();this.select(g,NO);this._cv_performSelectAction(this,e);
return YES},touchesDragged:function(a,b){b.forEach(function(c){if(Math.abs(c.pageX-c.startX)>5||Math.abs(c.pageY-c.startY)>5){this.select(null,NO);
c.makeTouchResponder(c.nextTouchResponder)}},this)},touchCancelled:function(a){this.select(null,NO)
},_findSelectionExtendedByShift:function(f,i){if(!f||f.get("length")===0){return SC.IndexSet.create(i)
}var e=this.get("content"),h=e.get("length")-1,c=f.get("min"),a=f.get("max")-1,g=this.mouseDownInfo,b=this._selectionAnchor;
if(SC.none(b)){b=-1}if(i<c){c=i;if(b<0){this._selectionAnchor=b=a}}else{if(i>a){a=i;
if(b<0){this._selectionAnchor=b=c}}else{if(i>=c&&i<=a){if(b<0){this._selectionAnchor=b=c
}if(i===b){c=a=i}else{if(i>b){c=b;a=i}else{if(i<b){c=i;a=b}}}}}}return SC.IndexSet.create(c,a-c+1)
},reorderDataType:function(){return"SC.CollectionView.Reorder."+SC.guidFor(this)}.property().cacheable(),dragContent:null,proposedInsertionIndex:null,proposedDropOperation:null,mouseDragged:function(i){var j=this.get("selectionDelegate"),f=this.get("content"),a=this.get("selection"),c=this.mouseDownInfo,g=this.get("_contentGroupIndexes"),e,b,h;
if(!c||c.contentIndex<0){return YES}if((Date.now()-c.at)<123){return YES}if(j.collectionViewShouldBeginDrag(this)){if(!this.get("selectOnMouseDown")){e=SC.IndexSet.create(c.contentIndex)
}else{e=a?a.indexSetForSource(f):null}if(e&&g&&g.get("length")>0){e=e.copy().remove(g);
if(e.get("length")===0){e=null}else{e.freeze()}}if(!e){return YES}else{e=e.frozenCopy()
}e={content:f,indexes:e};this.set("dragContent",e);b=this.get("dragDataTypes");if(b&&b.get("length")>0){h=j.collectionViewDragViewFor(this,e.indexes);
if(!h){h=this._cv_dragViewFor(e.indexes)}h.createLayer();SC.Drag.start({event:c.event,source:this,dragView:h,ghost:NO,ghostActsLikeCursor:j.ghostActsLikeCursor,slideBack:YES,dataSource:this});
this._cleanupMouseDown();this._lastInsertionIndex=null}else{this.set("dragContent",null)
}return YES}},_cv_dragViewFor:function(e){var b=this.get("nowShowing").without(e);
b=this.get("nowShowing").without(b);var c=this.get("layer").cloneNode(false);var a=SC.View.create({layer:c,parentView:this});
SC.$(c).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
b.forEach(function(h){var j=this.itemViewForContentIndex(h),f,g;if(j){f=j.get("isSelected");
j.set("isSelected",NO);j.updateLayerIfNeeded();g=j.get("layer");if(g){g=g.cloneNode(true)
}j.set("isSelected",f);j.updateLayerIfNeeded()}if(g){c.appendChild(g)}g=null},this);
c=null;return a},dragDataTypes:function(){var a=this.get("selectionDelegate"),b=a.collectionViewDragDataTypes(this),c;
if(this.get("canReorderContent")){b=b?b.copy():[];c=this.get("reorderDataType");if(b.indexOf(c)<0){b.push(c)
}}return b?b:[]}.property(),dragDataForType:function(c,b){if(this.get("canReorderContent")){if(b===this.get("reorderDataType")){return this.get("dragContent")
}}var a=this.get("selectionDelegate");return a.collectionViewDragDataForType(this,c,b)
},computeDragOperations:function(c,b){var e=SC.DRAG_NONE,a=this.get("selectionDelegate");
if(this.get("canReorderContent")){if(c.get("dataTypes").indexOf(this.get("reorderDataType"))>=0){e=SC.DRAG_REORDER
}}e=a.collectionViewComputeDragOperations(this,c,e);if(e&SC.DRAG_REORDER){e=SC.DRAG_MOVE
}return e},_computeDropOperationState:function(c,m,f){var h=this.convertFrameFromView(c.get("location"),null),l=SC.DROP_BEFORE,n=this.get("selectionDelegate"),e=this.get("canReorderContent"),o,i,a,j,g,b;
var k=this.insertionIndexForLocation(h,SC.DROP_ON);if(SC.typeOf(k)===SC.T_ARRAY){l=k[1];
k=k[0]}if(l===SC.DROP_ON){this.set("proposedInsertionIndex",k);this.set("proposedDropOperation",l);
b=n.collectionViewValidateDragOperation(this,c,f,k,l);k=this.get("proposedInsertionIndex");
l=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
if(b!==SC.DRAG_NONE){return[k,l,b]}else{l=SC.DROP_BEFORE;k=this.insertionIndexForLocation(h,SC.DROP_BEFORE);
if(SC.typeOf(k)===SC.T_ARRAY){l=k[1];k=k[0]}}}if((k>=0)&&e&&(l!==SC.DROP_ON)){o=c.dataForType(this.get("reorderDataType"));
if(o){i=this.get("content");if(l===SC.DROP_BEFORE){a=o.indexes.contains(k-1);j=o.indexes.contains(k)
}else{a=o.indexes.contains(k);j=o.indexes.contains(k-1)}if(a&&j){if(SC.none(this._lastInsertionIndex)){if(l===SC.DROP_BEFORE){while((k>=0)&&o.indexes.contains(k)){k--
}}else{g=i?i.get("length"):0;while((k<g)&&o.indexes.contains(k)){k++}}}else{k=this._lastInsertionIndex
}}if(k>=0){f=SC.DRAG_REORDER}}}this.set("proposedInsertionIndex",k);this.set("proposedDropOperation",l);
f=n.collectionViewValidateDragOperation(this,c,f,k,l);k=this.get("proposedInsertionIndex");
l=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
return[k,l,f]},dragUpdated:function(g,b){var i=g.get("allowedDragOperations"),h=this._computeDropOperationState(g,b,i),a=h[0],c=h[1],f=h[2];
if(f!==SC.DRAG_NONE){if((this._lastInsertionIndex!==a)||(this._lastDropOperation!==c)){var e=this.itemViewForContentIndex(a);
this.showInsertionPoint(e,c)}this._lastInsertionIndex=a;this._lastDropOperation=c
}else{this.hideInsertionPoint();this._lastInsertionIndex=this._lastDropOperation=null
}return(f&SC.DRAG_REORDER)?SC.DRAG_MOVE:f},dragExited:function(){this.hideInsertionPoint();
this._lastInsertionIndex=this._lastDropOperation=null},acceptDragOperation:function(a,b){return YES
},performDragOperation:function(f,h){var a=this._computeDropOperationState(f,null,h),l=a[0],k=a[1],i=a[2],m=this.get("selectionDelegate"),c,n,e,j,b,g;
if(i&SC.DRAG_REORDER){h=(h&SC.DRAG_MOVE)?SC.DRAG_REORDER:SC.DRAG_NONE}else{h=h&i}if(h===SC.DRAG_NONE){return h
}c=m.collectionViewPerformDragOperation(this,f,h,l,k);if((c===SC.DRAG_NONE)&&(h&SC.DRAG_REORDER)){e=f.dataForType(this.get("reorderDataType"));
if(!e){return SC.DRAG_NONE}j=this.get("content");g=e.indexes;if(g.get("length")===1){if(((k===SC.DROP_BEFORE)||(k===SC.DROP_AFTER))&&(g.get("min")===l)){return SC.DRAG_MOVE
}}j.beginPropertyChanges();n=[];b=0;e.indexes.forEach(function(o){n.push(j.objectAt(o-b));
j.removeAt(o-b);b++;if(o<l){l--}},this);if(k===SC.DROP_AFTER){l++}j.replace(l,0,n,k);
this.select(SC.IndexSet.create(l,n.length));j.endPropertyChanges();h=SC.DRAG_MOVE
}return h},collectionViewShouldBeginDrag:function(a){return this.get("canReorderContent")
},insertionIndexForLocation:function(a,b){return -1},_cv_isVisibleInWindowDidChange:function(){if(this.get("isVisibleInWindow")){if(this._invalidIndexes){this.invokeOnce(this.reloadIfNeeded)
}if(this._invalidSelection){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)}}}.observes("isVisibleInWindow"),collectionViewShouldSelectItem:function(a,b){return this.get("isSelectable")
},_TMP_DIFF1:SC.IndexSet.create(),_TMP_DIFF2:SC.IndexSet.create(),_cv_nowShowingDidChange:function(){var b=this.get("nowShowing"),a=this._sccv_lastNowShowing,e,f,c;
if(a!==b){if(a&&b){f=this._TMP_DIFF1.add(a).remove(b);c=this._TMP_DIFF2.add(b).remove(a);
e=f.add(c)}else{e=a||b}}if(e&&e.get("length")>0){this._sccv_lastNowShowing=b?b.frozenCopy():null;
this.updateContentRangeObserver();this.reload(e)}if(f){f.clear()}if(c){c.clear()}}.observes("nowShowing"),init:function(){arguments.callee.base.apply(this,arguments);
if(this.useFastPath){this.mixin(SC.CollectionFastPath)}if(this.get("canReorderContent")){this._cv_canReorderContentDidChange()
}this._sccv_lastNowShowing=this.get("nowShowing").clone();if(this.content){this._cv_contentDidChange()
}if(this.selection){this._cv_selectionDidChange()}},_cv_canReorderContentDidChange:function(){if(this.get("canReorderContent")){if(!this.get("isDropTarget")){this.set("isDropTarget",YES)
}SC.Drag.addDropTarget(this)}}.observes("canReorderContent"),_cv_performSelectAction:function(b,e,c,a){var f;
if(c===undefined){c=0}if(a===undefined){a=1}if((a>1)||this.get("actOnSelect")){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()
}f=this.get("selection");f=f?f.toArray():[];if(this._cv_actionTimer){this._cv_actionTimer.invalidate()
}this._cv_actionTimer=this.invokeLater(this._cv_action,c,b,e,f)}},_cv_action:function(b,a,c){var e=this.get("action");
var f=this.get("target")||null;this._cv_actionTimer=null;if(e){if(SC.typeOf(e)===SC.T_FUNCTION){return this.action(b,a)
}var g=this.get("pane");if(g){g.rootResponder.sendAction(e,f,this,g,c)}}else{if(!b){return
}else{if(SC.typeOf(b._action)==SC.T_FUNCTION){return b._action(a)}else{if(SC.typeOf(b.action)==SC.T_FUNCTION){return b.action(a)
}}}}}});SC.DateFieldView=SC.TextFieldView.extend({value:null,showDate:YES,showTime:NO,formatTime:"%I:%M %p",formatDate:"%d/%m/%Y",formatDateTime:"%d/%m/%Y %I:%M %p",_dtConstants:"%a %b %d %H %I %j %m %M %p %S %U %W %y %Y".w(),_wtConstants:[3,3,2,2,2,3,2,2,2,2,2,2,2,4],activeSelection:0,format:function(){var a=this.get("showTime");
var b=this.get("showDate");if(a===YES&&b===YES){return this.get("formatDateTime")
}if(a===YES){return this.get("formatTime")}return this.get("formatDate")}.property("showTime","showDate").cacheable(),validator:function(){return SC.Validator.DateTime.extend({format:this.get("format")})
}.property("format").cacheable(),tabsSelections:function(){var g=[];var e=this.get("format");
var j=this.get("_dtConstants");var b=this.get("_wtConstants");if(SC.empty(e)){throw"The format string is empty, and must be a valid string."
}var h,k,c,f=0,a=0,i=0;while(f<e.length&&e.indexOf("%",f)!==-1){h=e.indexOf("%",f);
k=e.substring(h,h+2);f=h+2;c=j.indexOf(k);if(c===-1){throw"SC.DateFieldView: The format's key '%@' is not supported.".fmt(k)
}a=a+h-i;g.push(SC.Object.create({key:k,textSelection:SC.TextSelection.create({start:a,end:a+b[c]})}));
a=a+b[c];i=f}h=k=c=null;return g}.property("format").cacheable(),updateTextSelecitonObserver:function(){var a=this.get("activeSelection");
var b=this.get("tabsSelections");if(this.get("isEditing")){this.selection(null,b[a].get("textSelection"))
}}.observes("activeSelection","value"),updateValue:function(b,c){var f=(c===0)?-1:1;
var e=this.get("value"),a;switch(b){case"%a":case"%d":case"%j":this.set("value",e.advance({day:f}));
break;case"%b":case"%m":this.set("value",e.advance({month:f}));break;case"%H":case"%I":this.set("value",e.advance({hour:f}));
break;case"%M":this.set("value",e.advance({minute:f}));break;case"%p":a=e.get("hour")>=12?-12:12;
this.set("value",e.advance({hour:a}));break;case"%S":this.set("value",e.advance({second:f}));
break;case"%U":this.set("value",e.advance({week1:f}));break;case"%W":this.set("value",e.advance({week0:f}));
break;case"%y":case"%Y":this.set("value",e.advance({year:f}));break}},_selectRootElement:function(){},keyDown:function(a){if(this.interpretKeyEvents(a)){a.stop();
return YES}return arguments.callee.base.apply(this,arguments)},ctrl_a:function(){return YES
},moveUp:function(b){var a=this.get("activeSelection");var c=this.get("tabsSelections");
this.updateValue(c[a].get("key"),1);return YES},moveDown:function(b){var a=this.get("activeSelection");
var c=this.get("tabsSelections");this.updateValue(c[a].get("key"),0);return YES},insertText:function(a){return YES
},moveRight:function(a){var c=this.get("tabsSelections");var b=this.get("activeSelection")+1;
if(b===c.length){b=0}this.set("activeSelection",b);return YES},moveLeft:function(a){var c=this.get("tabsSelections");
var b=this.get("activeSelection")-1;if(b===-1){b=c.length-1}this.set("activeSelection",b);
return YES},insertTab:function(a){var c=this.get("tabsSelections");var b=this.get("activeSelection")+1;
if(b<c.length){this.set("activeSelection",b);return YES}return NO},insertBacktab:function(a){var b=this.get("activeSelection")-1;
if(b!==-1){this.set("activeSelection",b);return YES}return NO},mouseUp:function(b){var c=arguments.callee.base.apply(this,arguments);
var f=this.get("selection");if(SC.none(f)){this.set("activeSelection",0)}else{var j=f.get("start");
var h=this.get("tabsSelections");var a=h.length,g;for(var e=0;e<a;e++){g=h[e].get("textSelection");
if(j>=g.get("start")&&j<=g.get("end")){this.set("activeSelection",e)}}}return c},deleteBackward:function(a){return YES
},deleteForward:function(a){return YES}});SC.DisclosureView=SC.ButtonView.extend({classNames:["sc-disclosure-view"],theme:"disclosure",buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,valueBindingDefault:SC.Binding.bool(),render:function(a,c){var b=this.get("displayTitle");
if(c){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="button" alt="" />');if(this.get("needsEllipsis")){a.push('<span class="ellipsis sc-button-label">',b,"</span>")
}else{a.push('<span class="sc-button-label">',b,"</span>")}}else{this.$("label").text(b)
}},keyDown:function(a){if(a.which===37||a.which===38){this.set("value",this.get("toggleOffValue"));
return YES}if(a.which===39||a.which===40){this.set("value",this.get("toggleOnValue"));
return YES}arguments.callee.base.apply(this,arguments)}});sc_require("views/collection");
sc_require("mixins/collection_row_delegate");SC.ListView=SC.CollectionView.extend(SC.CollectionRowDelegate,{classNames:["sc-list-view"],acceptsFirstResponder:YES,showAlternatingRows:NO,render:function(a,b){a.setClass("alternating",this.get("showAlternatingRows"));
return arguments.callee.base.apply(this,arguments)},rowDelegate:function(){var a=this.delegate,b=this.get("content");
return this.delegateFor("isCollectionRowDelegate",a,b)}.property("delegate","content").cacheable(),_sclv_rowDelegateDidChange:function(){var e=this._sclv_rowDelegate,b=this.get("rowDelegate"),c=this._sclv_rowHeightDidChange,a=this._sclv_customRowHeightIndexesDidChange;
if(e===b){return this}this._sclv_rowDelegate=b;if(e){e.removeObserver("rowHeight",this,c);
e.removeObserver("customRowHeightIndexes",this,a)}if(!b){throw"Internal Inconsistancy: ListView must always have CollectionRowDelegate"
}b.addObserver("rowHeight",this,c);b.addObserver("customRowHeightIndexes",this,a);
this._sclv_rowHeightDidChange()._sclv_customRowHeightIndexesDidChange();return this
}.observes("rowDelegate"),_sclv_rowHeightDidChange:function(){var b=this.get("rowDelegate"),a=b.get("rowHeight"),c;
if(a===this._sclv_rowHeight){return this}this._sclv_rowHeight=a;c=SC.IndexSet.create(0,this.get("length"));
this.rowHeightDidChangeForIndexes(c);return this},_sclv_customRowHeightIndexesDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),e=this._sclv_customRowHeightIndexes,c=this._sclv_customRowHeightIndexesContentDidChange;
if((b===e)||(e&&e.isEqual(b))){return this}if(e&&this._sclv_isObservingCustomRowHeightIndexes){e.removeObserver("[]",this,c)
}if(this._sclv_isObservingCustomRowHeightIndexes=b&&!b.get("isFrozen")){b.addObserver("[]",this,c)
}this._sclv_customRowHeightIndexesContentDidChange();return this},_sclv_customRowHeightIndexesContentDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),c=this._sclv_customRowHeightIndexes,e;
if(b&&c){e=b.copy().add(c)}else{e=b||c}this._sclv_customRowHeightIndexes=b?b.frozenCopy():null;
this.rowHeightDidChangeForIndexes(e);return this},rowOffsetForContentIndex:function(i){if(i===0){return 0
}var k=this.get("rowDelegate"),a=k.get("rowHeight"),g,f,c,b,j,h,e;f=i*a;g=this.get("rowSpacing");
if(g){f+=i*g}if(k.customRowHeightIndexes&&(c=k.get("customRowHeightIndexes"))){b=this._sclv_offsetCache;
if(!b){b=[];j=h=0;c.forEach(function(l){j+=this.rowHeightForContentIndex(l)-a;b[l+1]=j;
h=l},this);this._sclv_max=h+1;this._sclv_offsetCache=b}j=b[i];if(j===undefined){j=b[i]=b[i-1];
if(j===undefined){h=this._sclv_max;if(i<h){h=c.indexBefore(i)+1}j=b[i]=b[h]||0}}f+=j
}return f},rowHeightForContentIndex:function(a){var b=this.get("rowDelegate"),f,c,g,e;
if(b.customRowHeightIndexes&&(e=b.get("customRowHeightIndexes"))){c=this._sclv_heightCache;
if(!c){c=[];g=this.get("content");e.forEach(function(h){c[h]=b.contentIndexRowHeight(this,g,h)
},this);this._sclv_heightCache=c}f=c[a];if(f===undefined){f=b.get("rowHeight")}}else{f=b.get("rowHeight")
}return f},rowHeightDidChangeForIndexes:function(b){var a=this.get("length");this._sclv_heightCache=this._sclv_offsetCache=null;
if(b&&b.isIndexSet){b=b.get("min")}this.reload(SC.IndexSet.create(b,a-b));return this
},computeLayout:function(){var a=this._sclv_layout;if(!a){a=this._sclv_layout={}}a.minHeight=this.rowOffsetForContentIndex(this.get("length"));
this.set("calculatedHeight",a.minHeight);return a},layoutForContentIndex:function(a){return{top:this.rowOffsetForContentIndex(a),height:this.rowHeightForContentIndex(a),left:0,right:0}
},contentIndexesInRect:function(i){var a=this.get("rowDelegate").get("rowHeight"),h=SC.minY(i),b=SC.maxY(i),j=i.height||0,g=this.get("length"),f,c,e;
c=(h-(h%a))/a;f=this.rowOffsetForContentIndex(c);while(c>0&&f>h){c--;f-=this.rowHeightForContentIndex(c)
}f+=this.rowHeightForContentIndex(c);while(c<g&&f<=h){c++;f+=this.rowHeightForContentIndex(c)
}if(c<0){c=0}if(c>=g){c=g}e=c+((j-(j%a))/a);if(e>g){e=g}f=this.rowOffsetForContentIndex(e);
while(e>=c&&f>=b){e--;f-=this.rowHeightForContentIndex(e)}f+=this.rowHeightForContentIndex(e);
while(e<g&&f<b){e++;f+=this.rowHeightForContentIndex(e)}e++;if(e<c){e=c}if(e>g){e=g
}return SC.IndexSet.create(c,e-c)},insertionPointView:SC.View.extend({classNames:"sc-list-insertion-point",render:function(a,b){if(b){a.push('<div class="anchor"></div>')
}}}),showInsertionPoint:function(h,g){var i=this._insertionPointView;if(!i){i=this._insertionPointView=this.get("insertionPointView").create()
}var e=h.get("contentIndex"),f=this.get("length"),c=SC.clone(h.get("layout")),a=h.get("outlineLevel"),b=h.get("outlineIndent")||0,j;
if((e>=f)&&e>0){j=this.itemViewForContentIndex(f-1);if(j.get("isGroupView")){a=1;
b=j.get("outlineIndent")}}if(SC.none(a)){a=-1}if(g&SC.DROP_ON){this.hideInsertionPoint();
h.set("isSelected",YES);this._lastDropOnView=h}else{if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}if(g&SC.DROP_AFTER){c.top+=c.height}c.height=2;c.right=0;
c.left=((a+1)*b)+12;delete c.width;i.set("layout",c);this.appendChild(i)}},hideInsertionPoint:function(){if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}var a=this._insertionPointView;if(a){a.removeFromParent().destroy()
}this._insertionPointView=null},insertionIndexForLocation:function(h,l){var b={x:h.x,y:h.y,width:1,height:1},g=this.contentIndexesInRect(b),i=g.get("min"),j=this.get("length"),c,m,n,f,p,e,o,k,a;
if(SC.none(i)||i<0){if((j===0)||(h.y<=this.rowOffsetForContentIndex(0))){i=0}else{if(h.y>=this.rowOffsetForContentIndex(j)){i=j
}}}c=this.rowOffsetForContentIndex(i);m=c+this.rowHeightForContentIndex(i);if(l==SC.DROP_ON){if(this.get("isEditable")){n=Math.min(Math.floor((m-c)*0.2),5)
}else{n=0}if(h.y>=(c+n)||h.y<=(m+n)){return[i,SC.DROP_ON]}}if((i<j)&&(h.y>=m-10)){i++
}if(i>0){k=this.itemViewForContentIndex(i-1);o=(k?k.get("outlineIndent"):0)||0;e=k?k.get("outlineLevel"):0;
if(i<j){k=this.itemViewForContentIndex(i);f=k?k.get("outlineLevel"):0;p=(k?k.get("outlineIndent"):0)||0;
p*=f}else{f=k.get("isGroupView")?1:0;p=o*f}o*=e;if((f!==e)&&(p!==o)){if(o>p){i--;
l=SC.DROP_AFTER}}}if(l===SC.DROP_BEFORE){k=(i<j)?this.itemViewForContentIndex(i):null;
if(!k||k.get("isGroupView")){if(i>0){k=this.itemViewForContentIndex(i-1);if(!k.get("isGroupView")||(k.get("disclosureState")===SC.BRANCH_OPEN)){i=i-1;
l=SC.DROP_AFTER}else{i=-1}}else{i=-1}}if(i<0){l=SC.DRAG_NONE}}return[i,l]},mouseWheel:function(a){var b=SC.InlineTextFieldView.editor;
if(b&&b.get("isEditing")){if(b.get("delegate").get("displayDelegate")===this){SC.InlineTextFieldView.commitEditing()
}}return NO},init:function(){arguments.callee.base.apply(this,arguments);this._sclv_rowDelegateDidChange()
}});require("views/list");SC.GridView=SC.ListView.extend({classNames:["sc-grid-view"],layout:{left:0,right:0,top:0,bottom:0},rowHeight:48,columnWidth:64,exampleView:SC.LabelView,insertionOrientation:SC.HORIZONTAL_ORIENTATION,itemsPerRow:function(){var b=this.get("frame"),a=this.get("columnWidth")||0;
return(a<=0)?1:Math.floor(b.width/a)}.property("clippingFrame","columnWidth").cacheable(),contentIndexesInRect:function(f){var e=this.get("rowHeight")||48,b=this.get("itemsPerRow"),c=Math.floor(SC.minY(f)/e)*b,a=Math.ceil(SC.maxY(f)/e)*b;
return SC.IndexSet.create(c,a-c)},layoutForContentIndex:function(h){var e=this.get("rowHeight")||48,a=this.get("clippingFrame").width,b=this.get("itemsPerRow"),f=Math.floor(a/b),g=Math.floor(h/b),c=h-(b*g);
return{left:c*f,top:g*e,height:e,width:f}},computeLayout:function(){var f=this.get("content"),e=(f)?f.get("length"):0,c=this.get("rowHeight")||48,a=this.get("itemsPerRow"),g=Math.ceil(e/a);
var b=this._cachedLayoutHash;if(!b){b=this._cachedLayoutHash={}}b.minHeight=g*c;this.calculatedHeight=b.minHeight;
return b},insertionPointClass:SC.View.extend({classNames:["grid-insertion-point"],render:function(a,b){if(b){a.push('<span class="anchor"></span>')
}}}),showInsertionPoint:function(c,g){if(!c){return}if(g===SC.DROP_ON){if(c!==this._dropOnInsertionPoint){this.hideInsertionPoint();
this._dropOnInsertionPoint=c}}else{if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null
}if(!this._insertionPointView){this._insertionPointView=this.insertionPointClass.create()
}var b=this._insertionPointView;var a=c.get("frame");var e={height:a.height-6,x:a.x,y:a.y+6,width:0};
if(!SC.rectsEqual(b.get("frame"),e)){b.set("frame",e)}if(b.parentNode!==c.parentNode){c.parentNode.appendChild(b)
}}},hideInsertionPoint:function(){var a=this._insertionPointView;if(a){a.removeFromParent()
}if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null}},insertionIndexForLocation:function(e,k){var g=this.get("frame"),h=this.get("clippingFrame"),l=this.get("itemsPerRow"),a=Math.floor(g.width/l),n=Math.floor((e.y-g.y-h.y)/this.get("rowHeight"));
var j=SC.DROP_BEFORE,c=(e.x-g.x-h.x),b=Math.floor(c/a),m=(c/a)-b;if(k===SC.DROP_ON){if(m>0.8){b++
}if((m>=0.2)&&(m<=0.8)){j=SC.DROP_ON}}else{if(m>0.45){b++}}var i=(n*l)+b;return[i,j]
},_gv_clippingFrameDidChange:function(){var e=this.get("nowShowing"),c,b,a;this.notifyPropertyChange("itemsPerRow");
a=e.get("length");for(b=0;b<a;b++){c=this.itemViewForContentIndex(b);c.adjust(this.layoutForContentIndex(b))
}}.observes("clippingFrame")});SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],shouldScrollToClick:NO,_touchScrollValue:NO,value:function(a,c){var b=this.get("minimum");
if(c!==undefined){this._scs_value=c}c=this._scs_value||b;return Math.max(Math.min(c,this.get("maximum")),b)
}.property("maximum","minimum").cacheable(),displayValue:function(){var a;if(this.get("_touchScrollValue")){a=this.get("_touchScrollValue")
}else{a=this.get("value")}return a}.property("value","_touchScrollValue").cacheable(),proportion:0,maximum:100,minimum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,hasButtons:YES,scrollbarThickness:14,capLength:18,capOverlap:14,buttonLength:41,buttonOverlap:11,displayProperties:"thumbPosition thumbLength isEnabled controlsHidden".w(),render:function(c,a){var b={},j="",f,l,h,g,m,k,i,e,n;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b["sc-vertical"]=YES;
break;case SC.LAYOUT_HORIZONTAL:b["sc-horizontal"]=YES;break}b.disabled=!this.get("isEnabled");
b["controls-hidden"]=this.get("controlsHidden");c.setClass(b);l=this.get("thumbLength");
f=this.get("thumbPosition");if(a){if(this.get("hasButtons")){j='<div class="button-bottom"></div><div class="button-top"></div>'
}else{j='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:c.push('<div class="track"></div>','<div class="cap"></div>',j,'<div class="thumb" style="height: '+l+"px; top: "+f+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>');
break;case SC.LAYOUT_HORIZONTAL:c.push('<div class="track"></div>','<div class="cap"></div>',j,'<div class="thumb" style="width: '+l+"px; left: "+f+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>')
}}else{if(this.get("controlsHidden")){return}g=this.$(".thumb");this.adjustThumb(g,f,l)
}},touchScrollDidStart:function(a){this.set("_touchScrollValue",a)},touchScrollDidEnd:function(a){this.set("_touchScrollValue",NO)
},touchScrollDidChange:function(a){this.set("_touchScrollValue",a)},adjustThumb:function(b,a,c){this.adjustThumbPosition(b,a);
this.adjustThumbSize(b,c)},adjustThumbPosition:function(b,a){if(this._thumbPosition===a){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.css("top",a);break;
case SC.LAYOUT_HORIZONTAL:b.css("left",a);break}this._thumbPosition=a},adjustThumbSize:function(a,b){if(this._thumbSize===b){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a.css("height",Math.max(b,20));
break;case SC.LAYOUT_HORIZONTAL:a.css("width",Math.max(b,20));break}this._thumbSize=b
},trackLength:function(){var a=this.get("scrollerLength");a-=this.capLength-this.capOverlap;
a-=this.buttonLength-this.buttonOverlap;return a}.property("scrollerLength").cacheable(),scrollerLength:function(){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:return this.get("frame").height;
case SC.LAYOUT_HORIZONTAL:return this.get("frame").width}return 0}.property("frame").cacheable(),thumbLength:function(){var a;
a=Math.floor(this.get("trackLength")*this.get("proportion"));a=isNaN(a)?0:a;return Math.max(a,20)
}.property("trackLength","proportion").cacheable(),thumbPosition:function(){var h=this.get("displayValue"),c=this.get("maximum"),b=this.get("trackLength"),e=this.get("thumbLength"),g=this.get("capLength"),f=this.get("capOverlap"),a;
a=(h/c)*(b-e);a+=g-f;return Math.floor(isNaN(a)?0:a)}.property("displayValue","maximum","trackLength","thumbLength").cacheable(),controlsHidden:function(){return this.get("proportion")>=1
}.property("proportion").cacheable(),valueForPosition:function(h){var b=this.get("maximum"),a=this.get("trackLength"),c=this.get("thumbLength"),g=this.get("capLength"),e=this.get("capOverlap"),f;
f=h-(g-e);f=f/(a-c);f=f*b;return f},mouseDown:function(k){if(!this.get("isEnabled")){return NO
}this._altIsDown=k.altKey;this._shiftIsDown=k.shiftKey;var f=k.target,c=this.get("thumbPosition"),j,e,h,g=this.get("scrollerLength");
if(f.className.indexOf("thumb")>=0){e=this.convertFrameFromView({x:k.pageX,y:k.pageY});
e.x-=c;e.y-=c;this._thumbDragging=YES;this._thumbOffset=e;this._mouseDownLocation={x:k.pageX,y:k.pageY};
this._thumbPositionAtDragStart=this.get("thumbPosition");this._valueAtDragStart=this.get("value")
}else{if(f.className.indexOf("button-top")>=0){this.decrementProperty("value",(this._altIsDown?g:30));
this.makeButtonActive(".button-top");this.startMouseDownTimer("scrollUp");this._isScrollingUp=YES
}else{if(f.className.indexOf("button-bottom")>=0){this.incrementProperty("value",(this._altIsDown?g:30));
this.makeButtonActive(".button-bottom");this.startMouseDownTimer("scrollDown");this._isScrollingDown=YES
}else{var m=this.get("shouldScrollToClick");if(k.altKey){m=!m}var a=this.get("trackLength"),i=this.get("thumbLength"),b=this.convertFrameFromView({x:k.pageX,y:k.pageY}),l;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._mouseDownLocation=l=b.y;
break;case SC.LAYOUT_HORIZONTAL:this._mouseDownLocation=l=b.x;break}if(m){this.set("value",this.valueForPosition(l-(i/2)));
c=this.get("thumbPosition");this._thumbDragging=YES;this._thumbOffset={x:b.x-c,y:b.y-c};
this._mouseDownLocation={x:k.pageX,y:k.pageY};this._thumbPositionAtDragStart=c;this._valueAtDragStart=this.get("value")
}else{if(l<c){this.decrementProperty("value",g);this.startMouseDownTimer("page")}else{this.incrementProperty("value",g);
this.startMouseDownTimer("page")}}}}}return YES},mouseUp:function(a){var c=this._scs_buttonActive,b=NO,e;
if(c){c.removeClass("active");b=YES}e=this._mouseDownTimer;if(e){e.invalidate();this._mouseDownTimer=null
}this._thumbDragging=NO;this._isScrollingDown=NO;this._isScrollingUp=NO;return b},mouseDragged:function(n){var l,b,m,c,j=n.target,f=this._thumbPositionAtDragStart,h=this._isScrollingUp,p=this._isScrollingDown,e=this._scs_buttonActive,a;
if(this._thumbDragging){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:m=(n.pageY-this._mouseDownLocation.y);
break;case SC.LAYOUT_HORIZONTAL:m=(n.pageX-this._mouseDownLocation.x);break}if(n.altKey){if(!this._altIsDown||(this._shiftIsDown!==n.shiftKey)){f=this._thumbPositionAtDragStart=f+m;
m=0;this._mouseDownLocation={x:n.pageX,y:n.pageY};this._valueAtDragStart=this.get("value")
}if(n.shiftKey){m=-m}this.set("value",Math.round(this._valueAtDragStart+m*2))}else{c=f+m;
b=this.get("trackLength")-this.get("thumbLength");this.set("value",Math.round((c/b)*this.get("maximum")))
}}else{if(h||p){var o=NO,g=NO;var k=this.$(".button-top")[0].getBoundingClientRect();
var i=this.$(".button-bottom")[0].getBoundingClientRect();switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:if(n.pageY<k.bottom){o=YES
}else{g=YES}break;case SC.LAYOUT_HORIZONTAL:if(n.pageX<k.right){o=YES}else{g=YES}break
}if((o||g)&&o!==h){if(e){e.removeClass("active")}this._mouseDownTimerAction=o?"scrollUp":"scrollDown";
if(o){this.makeButtonActive(".button-top")}else{if(g){this.makeButtonActive(".button-bottom")
}}this._isScrollingUp=o;this._isScrollingDown=g}}}this._altIsDown=n.altKey;this._shiftIsDown=n.shiftKey;
return YES},startMouseDownTimer:function(b,a){var c;this._mouseDownTimerAction=b;
this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:a?0:300})
},mouseDownTimerDidFire:function(){var e=this.get("scrollerLength"),a=SC.device.get("mouseLocation"),c=this.get("thumbPosition"),b=this.get("thumbLength"),f=50;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a=this.convertFrameFromView(a).y;
break;case SC.LAYOUT_HORIZONTAL:a=this.convertFrameFromView(a).x;break}switch(this._mouseDownTimerAction){case"scrollDown":this.incrementProperty("value",this._altIsDown?e:30);
break;case"scrollUp":this.decrementProperty("value",this._altIsDown?e:30);break;case"page":f=150;
if(a<c){this.decrementProperty("value",e)}else{if(a>c+b){this.incrementProperty("value",e)
}}}this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:f})
},makeButtonActive:function(a){this._scs_buttonActive=this.$(a).addClass("active")
}});SC.TouchScrollerView=SC.ScrollerView.extend({classNames:["sc-touch-scroller-view"],scrollbarThickness:12,capLength:5,capOverlap:0,hasButtons:NO,buttonOverlap:36,adjustThumb:function(e,b,g){var c=this.$(".thumb-inner");
var a=this.get("scrollerLength")-this.capLength,f=this.get("minimum")+this.capLength;
if(b+g>a){b=Math.min(a-20,b);g=a-b}if(b<f){g-=f-b;b=f}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:if(this._thumbPosition!==b){e.css("-webkit-transform","translate3d(0px,"+b+"px,0px)")
}if(this._thumbSize!==g){c.css("-webkit-transform","translate3d(0px,"+Math.round(g-1044)+"px,0px)")
}break;case SC.LAYOUT_HORIZONTAL:if(this._thumbPosition!==b){e.css("-webkit-transform","translate3d("+b+"px,0px,0px)")
}if(this._thumbSize!==g){c.css("-webkit-transform","translate3d("+Math.round(g-1044)+"px,0px,0px)")
}break}this._thumbPosition=b;this._thumbSize=g},render:function(c,a){var b=[],j="",f,l,h,g,m,k,i,e,n;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.push("sc-vertical");
break;case SC.LAYOUT_HORIZONTAL:b.push("sc-horizontal");break}if(!this.get("isEnabled")){b.push("disabled")
}if(this.get("controlsHidden")){b.push("controls-hidden")}c.addClass(b);l=this.get("thumbLength");
f=this.get("thumbPosition");if(a){if(this.get("hasButtons")){j='<div class="button-bottom"></div><div class="button-top"></div>'
}else{j='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:c.push('<div class="track"></div>','<div class="cap"></div>',j,'<div class="thumb">','<div class="thumb-top"></div>','<div class="thumb-clip">','<div class="thumb-inner" style="-webkit-transform: translateY('+(l-1044)+'px);">','<div class="thumb-center"></div>','<div class="thumb-bottom"></div></div></div></div>');
break;case SC.LAYOUT_HORIZONTAL:c.push('<div class="track"></div>','<div class="cap"></div>',j,'<div class="thumb">','<div class="thumb-top"></div>','<div class="thumb-clip">','<div class="thumb-inner" style="-webkit-transform: translateX('+(l-1044)+'px);">','<div class="thumb-center"></div>','<div class="thumb-bottom"></div></div></div></div>')
}}else{if(this.get("controlsHidden")){return}g=this.$(".thumb");this.adjustThumb(g,f,l)
}}});sc_require("views/scroller");sc_require("mixins/border");SC.NORMAL_SCROLL_DECELERATION=0.95;
SC.FAST_SCROLL_DECELERATION=0.85;SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalAlign:SC.ALIGN_LEFT,verticalAlign:SC.ALIGN_TOP,horizontalScrollOffset:function(b,e){if(e!==undefined){var c=this.minimumHorizontalScrollOffset(),a=this.get("maximumHorizontalScrollOffset");
this._scroll_horizontalScrollOffset=Math.max(c,Math.min(a,e))}return this._scroll_horizontalScrollOffset||0
}.property().cacheable(),verticalScrollOffset:function(b,e){if(e!==undefined){var c=this.get("minimumVerticalScrollOffset"),a=this.get("maximumVerticalScrollOffset");
this._scroll_verticalScrollOffset=Math.max(c,Math.min(a,e))}return this._scroll_verticalScrollOffset||0
}.property().cacheable(),maximumScrollOffset:function(b,a,c){if(b>=a){return b-a}if(c===SC.ALIGN_LEFT||c===SC.ALIGN_TOP){return 0
}else{if(c===SC.ALIGN_MIDDLE||c===SC.ALIGN_CENTER){return 0-Math.round((a-b)/2)}else{return 0-(a-b)
}}},minimumScrollOffset:function(b,a,c){if(b>a){return 0}if(c===SC.ALIGN_LEFT||c===SC.ALIGN_TOP){return 0
}else{if(c===SC.ALIGN_MIDDLE||c===SC.ALIGN_CENTER){return 0-Math.round((a-b)/2)}else{return 0-(a-b)
}}},maximumHorizontalScrollOffset:function(){var c=this.get("contentView"),b=0,a=0;
if(c&&c.get("frame")){b=c.get("frame").width}if(c){a=c.calculatedWidth||0}if(c&&c.calculatedWidth&&c.calculatedWidth!==0){b=c.calculatedWidth
}b*=this._scale;var e=this.get("containerView").get("frame").width;if(!this.get("canScrollHorizontal")){b=Math.min(b,e)
}return this.maximumScrollOffset(b,e,this.get("horizontalAlign"))}.property(),maximumVerticalScrollOffset:function(){var a=this.get("contentView"),c=0,b=0;
if(a&&a.get("frame")){c=a.get("frame").height}if(a){b=a.calculatedHeight||0}if(a&&a.calculatedHeight&&a.calculatedHeight!==0){c=a.calculatedHeight
}c*=this._scale;var e=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){c=Math.min(c,e)
}return this.maximumScrollOffset(c,e,this.get("verticalAlign"))}.property(),minimumHorizontalScrollOffset:function(){var b=this.get("contentView");
var a=b?b.get("frame").width:0;if(b&&b.calculatedWidth&&b.calculatedWidth!==0){a=b.calculatedWidth
}a*=this._scale;var c=this.get("containerView").get("frame").width;if(!this.get("canScrollHorizontal")){a=Math.min(a,c)
}return this.minimumScrollOffset(a,c,this.get("horizontalAlign"))}.property(),minimumVerticalScrollOffset:function(){var a=this.get("contentView");
var b=(a&&a.get("frame"))?a.get("frame").height:0;if(a&&a.calculatedHeight&&a.calculatedHeight!==0){b=a.calculatedHeight
}b*=this._scale;var c=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){b=Math.min(b,c)
}return this.minimumScrollOffset(b,c,this.get("verticalAlign"))}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:SC.ScrollerView,horizontalTouchScrollerView:SC.TouchScrollerView,isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:SC.ScrollerView,verticalTouchScrollerView:SC.TouchScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,verticalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),horizontalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),verticalScrollerLayout:null,horizontalScrollerLayout:null,containerView:SC.ContainerView.extend({}),scrollTo:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}if(!SC.none(a)){a=Math.max(this.get("minimumHorizontalScrollOffset"),Math.min(this.get("maximumHorizontalScrollOffset"),a));
this.set("horizontalScrollOffset",a)}if(!SC.none(b)){b=Math.max(this.get("minimumVerticalScrollOffset"),Math.min(this.get("maximumVerticalScrollOffset"),b));
this.set("verticalScrollOffset",b)}return this},scrollBy:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}a=(a)?this.get("horizontalScrollOffset")+a:null;b=(b)?this.get("verticalScrollOffset")+b:null;
return this.scrollTo(a,b)},scrollToVisible:function(b){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var c=this.get("contentView");if(!c){return NO}var a=b.get("frame");if(!a){return NO
}a=c.convertFrameFromView(a,b.get("parentView"));return this.scrollToRect(a)},scrollToRect:function(b){var a=SC.cloneRect(this.get("containerView").get("frame"));
a.x=this.get("horizontalScrollOffset");a.y=this.get("verticalScrollOffset");var e=a.x,c=a.y;
a.y-=Math.max(0,SC.minY(a)-SC.minY(b));a.x-=Math.max(0,SC.minX(a)-SC.minX(b));a.y+=Math.max(0,SC.maxY(b)-SC.maxY(a));
a.x+=Math.max(0,SC.maxX(b)-SC.maxX(a));if((e!==a.x)||(c!==a.y)){this.scrollTo(a.x,a.y);
return YES}else{return NO}},scrollDownLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalLineScroll")*a)
},scrollUpLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*a)
},scrollRightLine:function(a){if(a===undefined){a=1}return this.scrollTo(this.get("horizontalLineScroll")*a,null)
},scrollLeftLine:function(a){if(a===undefined){a=1}return this.scrollTo(0-this.get("horizontalLineScroll")*a,null)
},scrollDownPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalPageScroll")*a)
},scrollUpPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*a))
},scrollRightPage:function(a){if(a===undefined){a=1}return this.scrollBy(this.get("horizontalPageScroll")*a,null)
},scrollLeftPage:function(a){if(a===undefined){a=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*a),null)
},tile:function(){var c=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var i=c&&this.get("isHorizontalScrollerVisible");var k=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var g=k&&this.get("isVerticalScrollerVisible");var f=this.get("containerView");var n={left:0,top:0};
var m,h,b,o,e,a;var j=((i)?c.get("scrollbarThickness"):0);var l=(g)?k.get("scrollbarThickness"):0;
if(i){a=this.get("horizontalScrollerLayout");h={left:(a?a.left:0),bottom:(a?a.bottom:0),right:(a?a.right+l-1:l-1),height:j};
c.set("layout",h);o=this.get("horizontalOverlay");n.bottom=o?0:(h.bottom+j)}else{n.bottom=0
}if(c){c.set("isVisible",i)}if(g){j=j+this.get("verticalScrollerBottom");e=this.get("verticalScrollerLayout");
h={top:(e?e.top:0),bottom:(e?e.bottom+j:j),right:(e?e.right:0),width:l};k.set("layout",h);
b=this.get("verticalOverlay");n.right=b?0:(h.right+l)}else{n.right=0}if(k){k.set("isVisible",g)
}f.adjust(n)},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(a){var b=(SC.browser.safari&&SC.browser.version>533)?120:1;
this._scroll_wheelDeltaX+=a.wheelDeltaX/b;this._scroll_wheelDeltaY+=a.wheelDeltaY/b;
this.invokeLater(this._scroll_mouseWheel,10);return this.get("canScrollHorizontal")||this.get("canScrollVertical")
},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY>0){this._scroll_wheelDeltaY=Math.floor(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.max(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY<0){this._scroll_wheelDeltaY=Math.ceil(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.min(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{this._scroll_wheelDeltaY=0;this._scroll_wheelDeltaX=0}}},canScale:NO,_scale:1,scale:function(a,b){if(b!==undefined){this._scale=Math.min(Math.max(this.get("minimumScale"),b),this.get("maximumScale"))
}return this._scale}.property().cacheable(),minimumScale:0.25,maximumScale:2,autoScaleRange:NO,_scale_css:"",updateScale:function(b){var a=this.get("contentView");
if(!a){return}if(a.isScalable){this.get("contentView").applyScale(b);this._scale_css=""
}else{this._scale_css="scale3d("+b+", "+b+", 1)"}},acceptsMultitouch:YES,decelerationRate:SC.NORMAL_SCROLL_DECELERATION,alwaysBounceHorizontal:NO,alwaysBounceVertical:YES,delaysContentTouches:YES,_touchScrollDidChange:function(){if(this.get("contentView").touchScrollDidChange){this.get("contentView").touchScrollDidChange(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidChange){this.verticalScrollerView.touchScrollDidChange(this._scroll_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidChange){this.horizontalScrollerView.touchScrollDidChange(this._scroll_horizontalScrollOffset)
}},_touchScrollDidStart:function(){if(this.get("contentView").touchScrollDidStart){this.get("contentView").touchScrollDidStart(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidStart){this.verticalScrollerView.touchScrollDidStart(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidStart){this.horizontalScrollerView.touchScrollDidStart(this._touch_horizontalScrollOffset)
}},_touchScrollDidEnd:function(){if(this.get("contentView").touchScrollDidEnd){this.get("contentView").touchScrollDidEnd(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidEnd){this.verticalScrollerView.touchScrollDidEnd(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidEnd){this.horizontalScrollerView.touchScrollDidEnd(this._touch_horizontalScrollOffset)
}},_applyCSSTransforms:function(b){var a="";this.updateScale(this._scale);a+="translate3d("+-this._scroll_horizontalScrollOffset+"px, "+-Math.round(this._scroll_verticalScrollOffset)+"px,0) ";
a+=this._scale_css;b.style.webkitTransform=a;b.style.webkitTransformOrigin="top left"
},captureTouch:function(a){return YES},touchGeneration:0,touchStart:function(b){var a=++this.touchGeneration;
if(!this.tracking&&this.get("delaysContentTouches")){this.invokeLater(this.beginTouchesInContent,150,a)
}else{if(!this.tracking){this.invokeLater(this.beginTouchesInContent,1,a)}}this.beginTouchTracking(b,YES);
return YES},beginTouchesInContent:function(b){if(b!==this.touchGeneration){return
}var c=this.touch,a;if(c&&this.tracking&&!this.dragging&&!c.touch.scrollHasEnded){c.touch.captureTouch(this,YES);
if(!c.touch.touchResponder){c.touch.makeTouchResponder(this)}else{if(c.needsScrollEnd){this._touchScrollDidEnd()
}}}},beginTouchTracking:function(e,o){var h=e.averagedTouchesForView(this,o);var b=this._scroll_verticalScrollOffset||0,c=this._scroll_horizontalScrollOffset||0,j=c,i=b,f=NO;
if(this.touch&&this.touch.timeout){clearTimeout(this.touch.timeout);this.touch.timeout=null;
j=this.touch.startClipOffset.x;i=this.touch.startClipOffset.y;f=YES}var k=this.get("contentView");
var a=k?k.get("frame").width:0,m=k?k.get("frame").height:0;if(k.calculatedWidth&&k.calculatedWidth!==0){a=k.calculatedWidth
}if(k.calculatedHeight&&k.calculatedHeight!==0){m=k.calculatedHeight}var l=this.get("containerView").get("frame").width,q=this.get("containerView").get("frame").height;
var g=this.convertFrameToView(this.get("frame"),null),p=(c+(h.x-g.x))/this._scale,n=(b+(h.y-g.y))/this._scale;
this.touch={startTime:e.timeStamp,notCalculated:YES,enableScrolling:{x:a*this._scale>l||this.get("alwaysBounceHorizontal"),y:m*this._scale>q||this.get("alwaysBounceVertical")},scrolling:{x:NO,y:NO},startClipOffset:{x:j,y:i},lastScrollOffset:{x:c,y:b},startTouchOffset:{x:h.x,y:h.y},scrollVelocity:{x:0,y:0},startTouchOffsetInContent:{x:p,y:n},containerSize:{width:l,height:q},contentSize:{width:a,height:m},startScale:this._scale,startDistance:h.d,canScale:this.get("canScale"),minimumScale:this.get("minimumScale"),maximumScale:this.get("maximumScale"),globalFrame:g,layer:this.get("contentView").get("layer"),resistanceCoefficient:0.998,resistanceAsymptote:320,decelerationFromEdge:0.05,accelerationToEdge:0.1,scrollTolerance:{x:15,y:15},scaleTolerance:5,secondaryScrollTolerance:30,scrollLock:500,decelerationRate:this.get("decelerationRate"),lastEventTime:e.timeStamp,touch:(o?e:(this.touch?this.touch.touch:null)),needsScrollEnd:f};
if(!this.tracking){this.tracking=YES;this.dragging=NO}},_adjustForEdgeResistance:function(g,e,b,c,a){var f;
if(g<e){f=g-e}else{if(g>b){f=b-g}else{return g}}f=Math.pow(c,Math.abs(f))*a;if(g<e){f=f-a
}else{f=-f+a}return Math.min(Math.max(e,g),b)+f},touchesDragged:function(a,c){var b=a.averagedTouchesForView(this);
this.updateTouchScroll(b.x,b.y,b.d,a.timeStamp)},updateTouchScroll:function(k,j,e,h){var g=this.touch,a=k-g.globalFrame.x,l=j-g.globalFrame.y,u,m,v,n,B,z;
var c=((this._scroll_horizontalScrollOffset||0)+a)/this._scale,b=((this._scroll_verticalScrollOffset||0)+l)/this._scale;
var y=c-g.startTouchOffset.x,x=b-g.startTouchOffset.y;var i=g.dragging;if(!g.scrolling.x&&Math.abs(y)>g.scrollTolerance.x&&g.enableScrolling.x){i=YES;
g.scrolling.x=YES;g.scrollTolerance.y=g.secondaryScrollTolerance;g.startTouchOffset.x=k;
y=0}if(!g.scrolling.y&&Math.abs(x)>g.scrollTolerance.y&&g.enableScrolling.y){i=YES;
g.scrolling.y=YES;g.scrollTolerance.x=g.secondaryScrollTolerance;g.startTouchOffset.y=j;
x=0}if(i&&!g.dragging){g.dragging=YES;this.dragging=YES;this._touchScrollDidStart()
}if(!g.scrolling.x&&!g.scrolling.y&&!g.canScale){return}if(g.scrolling.x&&!g.scrolling.y){if(y>g.scrollLock&&!g.scrolling.y){g.enableScrolling.y=NO
}}if(g.scrolling.y&&!g.scrolling.x){if(x>g.scrollLock&&!g.scrolling.x){g.enableScrolling.x=NO
}}if(g.canScale){var p=g.startDistance,w=e-p;if(Math.abs(w)>g.scaleTolerance){g.scrolling.y=YES;
g.scrolling.x=YES;var A=g.startScale*(e/Math.max(p,50));var q=this._adjustForEdgeResistance(A,g.minimumScale,g.maximumScale,g.resistanceCoefficient,g.resistanceAsymptote);
this.dragging=YES;this._scale=q;var t=c*this._scale,s=b*this._scale}}B=this.minimumScrollOffset(g.contentSize.width*this._scale,g.containerSize.width,this.get("horizontalAlign"));
z=this.minimumScrollOffset(g.contentSize.height*this._scale,g.containerSize.height,this.get("verticalAlign"));
n=this.maximumScrollOffset(g.contentSize.width*this._scale,g.containerSize.width,this.get("horizontalAlign"));
m=this.maximumScrollOffset(g.contentSize.height*this._scale,g.containerSize.height,this.get("verticalAlign"));
v=g.startTouchOffsetInContent.x*this._scale-a;u=g.startTouchOffsetInContent.y*this._scale-l;
v=this._adjustForEdgeResistance(v,B,n,g.resistanceCoefficient,g.resistanceAsymptote);
u=this._adjustForEdgeResistance(u,z,m,g.resistanceCoefficient,g.resistanceAsymptote);
if(g.scrolling.x){this._scroll_horizontalScrollOffset=v}if(g.scrolling.y){this._scroll_verticalScrollOffset=u
}this._applyCSSTransforms(g.layer);this._touchScrollDidChange();if(h-g.lastEventTime>=1||g.notCalculated){g.notCalculated=NO;
var f=this._scroll_horizontalScrollOffset;var o=this._scroll_verticalScrollOffset;
g.scrollVelocity.x=((f-g.lastScrollOffset.x)/Math.max(1,h-g.lastEventTime));g.scrollVelocity.y=((o-g.lastScrollOffset.y)/Math.max(1,h-g.lastEventTime));
g.lastScrollOffset.x=f;g.lastScrollOffset.y=o;g.lastEventTime=h}},touchEnd:function(c){var a=this.touch,b=c.averagedTouchesForView(this);
c.scrollHasEnded=YES;if(b.touchCount>0){this.beginTouchTracking(c,NO)}else{if(this.dragging){a.dragging=NO;
a.lastEventTime=c.timeStamp;this.startDecelerationAnimation()}else{if(a.needsScrollEnd){this._touchScrollDidEnd()
}c.captureTouch(this,YES);if(c.touchResponder&&c.touchResponder!==this){c.end()}else{if(!c.touchResponder||c.touchResponder===this){if(c.nextTouchResponder){c.makeTouchResponder(c.nextTouchResponder)
}}else{}}this.touch=null}this.tracking=NO;this.dragging=NO}},touchCancelled:function(c){var a=this.touch,b=c.averagedTouchesForView(this);
if(!this.touch||!this.touch.timeout){this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();this.tracking=NO;if(this.dragging){this._touchScrollDidEnd()
}this.dragging=NO;this.touch=null}},startDecelerationAnimation:function(a){var b=this.touch;
b.decelerationVelocity={x:b.scrollVelocity.x*10,y:b.scrollVelocity.y*10};this.decelerateAnimation()
},bouncyBounce:function(c,f,e,g,h,b,a){if(f<e){if(c<0){c=c+((e-f)*h)}else{c=Math.min((e-f)*b+a,e-f-0.01)
}}else{if(f>g){if(c>0){c=c-((f-g)*h)}else{c=-Math.min((f-g)*b+a,f-g-0.01)}}}return c
},decelerateAnimation:function(){var b=this.touch,v=this._scale,u=this.minimumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign")),s=this.minimumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign")),i=this.maximumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign")),h=this.maximumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign")),a=Date.now(),f=Math.max(a-b.lastEventTime,1),n=this._scroll_horizontalScrollOffset+b.decelerationVelocity.x*(f/10),k=this._scroll_verticalScrollOffset+b.decelerationVelocity.y*(f/10);
var m=b.decelerationFromEdge,o=b.accelerationToEdge;var e=n>=u&&n<=i;var p=k>=s&&k<=h;
n/=this._scale;k/=this._scale;var j=0;j=this.bouncyBounce(j,v,b.minimumScale,b.maximumScale,m,o,0);
this._scale=v=v+j;n*=this._scale;k*=this._scale;u=this.minimumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign"));
s=this.minimumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign"));
i=this.maximumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign"));
h=this.maximumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign"));
if(e&&(n<u||n>i)){n=Math.max(u,Math.min(n,i))}if(p&&(k<s||k>h)){k=Math.max(s,Math.min(k,h))
}this._scroll_horizontalScrollOffset=n;this._scroll_verticalScrollOffset=k;this._applyCSSTransforms(b.layer);
SC.RunLoop.begin();this._touchScrollDidChange();SC.RunLoop.end();var q=b.decelerationRate;
b.decelerationVelocity.y*=Math.pow(q,(f/10));b.decelerationVelocity.x*=Math.pow(q,(f/10));
b.decelerationVelocity.x=this.bouncyBounce(b.decelerationVelocity.x,n,u,i,m,o,0.3);
b.decelerationVelocity.y=this.bouncyBounce(b.decelerationVelocity.y,k,s,h,m,o,0.3);
var l=Math.abs(b.decelerationVelocity.x);var c=Math.abs(b.decelerationVelocity.y);
if(c<0.01&&l<0.01&&Math.abs(j)<0.01){b.timeout=null;this.touch=null;SC.RunLoop.begin();
this._touchScrollDidEnd();this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();SC.RunLoop.end();return}var g=this;b.lastEventTime=Date.now();
this.touch.timeout=setTimeout(function(){g.decelerateAnimation()},10)},createChildViews:function(){var b=[],a;
if(SC.none(a=this.containerView)){a=SC.ContainerView}b.push(this.containerView=this.createChildView(a,{contentView:this.contentView,isScrollContainer:YES}));
this.contentView=this.containerView.get("contentView");a=SC.platform.touch?this.get("horizontalTouchScrollerView"):this.get("horizontalScrollerView");
if(a){if(this.get("hasHorizontalScroller")){a=this.horizontalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
b.push(a)}else{this.horizontalScrollerView=null}}a=SC.platform.touch?this.get("verticalTouchScrollerView"):this.get("verticalScrollerView");
if(a){if(this.get("hasVerticalScroller")){a=this.verticalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
b.push(a)}else{this.verticalScrollerView=null}}this.childViews=b;this.contentViewDidChange();
this.tile()},init:function(){arguments.callee.base.apply(this,arguments);this._scroll_contentView=this.get("contentView");
var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var e=this.get("contentView"),a=this._scroll_contentView,b=this.contentViewFrameDidChange,c=this.contentViewLayerDidChange;
if(e!==a){if(a){a.removeObserver("frame",this,b);a.removeObserver("layer",this,c)
}this._scroll_contentView=e;if(e){e.addObserver("frame",this,b);e.addObserver("layer",this,c)
}this.containerView.set("contentView",e);this.contentViewFrameDidChange()}}.observes("contentView"),render:function(a,b){this.invokeLast(this.adjustElementScroll);
if(b){a.push('<div class="corner"></div>')}return arguments.callee.base.apply(this,arguments)
},oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(b){var o=this.get("contentView"),m=(o)?o.get("frame"):null,i=this._scale,c=(m)?m.width*i:0,q=(m)?m.height*i:0,k,j,n;
if(!b&&(c===this._scroll_contentWidth)&&(q===this._scroll_contentHeight)){return}this._scroll_contentWidth=c;
this._scroll_contentHeight=q;k=this.getPath("containerView.frame");j=k.width;n=k.height;
if(this.get("hasHorizontalScroller")&&(o=this.get("horizontalScrollerView"))){if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",c>j)
}o.setIfChanged("maximum",c-j);o.setIfChanged("proportion",j/c)}if(this.get("hasVerticalScroller")&&(o=this.get("verticalScrollerView"))){if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",q>n)
}o.setIfChanged("maximum",q-n);o.setIfChanged("proportion",n/q)}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var p=this.get("maximumVerticalScrollOffset"),l=this.get("verticalScrollOffset"),h=this.get("maximumHorizontalScrollOffset"),a=this.get("horizontalScrollOffset"),g=p<l,e=h<a;
if(g||e){this.forceDimensionsRecalculation(e,g,l,a)}},frameDidChange:function(){this.contentViewFrameDidChange(YES)
}.observes("frame"),contentViewLayerDidChange:function(){if(this._verticalScrollOffset!==0){this._verticalScrollOffset=-1
}if(this._horizontalScrollOffset!==0){this._horizontalScrollOffset=-1}this.invokeLast(this.adjustElementScroll)
},_scroll_horizontalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("verticalScrollOffset"),adjustElementScroll:function(){var a=this.get("containerView"),e=this.get("contentView"),c=this.get("verticalScrollOffset"),b=this.get("horizontalScrollOffset");
if(e){SC.RunLoop.begin();e._viewFrameDidChange();SC.RunLoop.end();if(SC.platform.touch){this._applyCSSTransforms(e.get("layer"))
}}if(a&&!SC.platform.touch){a=a.$()[0];if(a){if(c!==this._verticalScrollOffset){a.scrollTop=c;
this._verticalScrollOffset=c}if(b!==this._horizontalScrollOffset){a.scrollLeft=b;
this._horizontalScrollOffset=b}}}},forceDimensionsRecalculation:function(b,c,f,a){var g=a;
var e=f;this.scrollTo(0,0);if(b&&c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(b&&!c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),e)}if(!b&&c){this.scrollTo(g,this.get("maximumVerticalScrollOffset"))
}},_scroll_verticalScrollOffset:0,_scroll_horizontalScrollOffset:0});sc_require("views/scroll");
SC.MenuScrollerView=SC.ScrollerView.extend({classNames:["sc-menu-scroller-view"],scrollDown:NO,value:function(a,c){if(c!==undefined){this._value=c
}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,verticalLineScroll:20,ownerScrollValueKey:function(){return"verticalScrollOffset"
}.property("layoutDirection").cacheable(),init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.TINY_SCROLLER_THICKNESS);
break;case SC.SMALL_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS);
break;case SC.REGULAR_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS);
break;case SC.LARGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS);
break;case SC.HUGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS);
break}return arguments.callee.base.apply(this,arguments)},render:function(a,c){a.addClass("sc-vertical");
a.addClass(this.get("controlSize"));if(c){var b=this.get("scrollDown")?"arrowDown":"arrowUp";
a.push('<span class="scrollArrow '+b+'">&nbsp;</span>')}a.setClass("disabled",!this.get("isEnabled"))
},didCreateLayer:function(){},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;
SC.Event.remove(this.$(),"scroll",this,a)},mouseEntered:function(a){this.set("isMouseOver",YES);
this._invokeScrollOnMouseOver()},mouseExited:function(a){this.set("isMouseOver",NO)
},_sc_scroller_valueDidChange:function(){}.observes("value"),_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),e=this._sc_lastScroll,c=this.get("layer"),a=0;
if(e&&(b-e)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}this._sc_scrollValue=a=c.scrollTop;
this.set("value",a);SC.RunLoop.end()},_scrollMenu:function(){var b=this.get("value"),a;
if(this.get("scrollDown")){a=b+this.verticalLineScroll;if(a<=this.get("maximum")){this.set("value",a)
}}else{a=b-this.verticalLineScroll;if(a>=0){this.set("value",a)}else{if(b<=this.verticalLineScroll&&b>0){this.set("value",0)
}}}return YES},_invokeScrollOnMouseOver:function(){this._scrollMenu();if(this.get("isMouseOver")){this.invokeLater(this._invokeScrollOnMouseOver,100)
}}});SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS=18;SC.MenuScrollerView.TINY_SCROLLER_THICKNESS=10;
SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS=14;SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS=23;
SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS=26;SC.MenuScrollView=SC.ScrollView.extend({classNames:["sc-menu-scroll-view"],maximumHorizontalScrollOffset:0,hasHorizontalScroller:NO,horizontalScrollerView:SC.MenuScrollerView,isHorizontalScrollerVisible:NO,canScrollHorizontal:NO,autohidesHorizontalScroller:NO,hasVerticalScroller:YES,verticalScrollerView:SC.MenuScrollerView,verticalScrollerView2:SC.MenuScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:YES,autohidesVerticalScroller:YES,verticalScrollerBottom:0,controlSize:SC.REGULAR_CONTROL_SIZE,containerView:SC.ContainerView,tile:function(){var h,u,i,b,s,j,c;
h=this.get("hasVerticalScroller");u=h?this.get("verticalScrollerView"):null;i=h?this.get("verticalScrollerView2"):null;
b=u&&this.get("isVerticalScrollerVisible");s=this.get("containerView");j={left:0,top:0};
if(b){c=0;var a=u.get("scrollerThickness")||i.get("scrollerThickness");var k=this.get("contentView"),p,q=(k)?k.get("frame"):null,l=(q)?q.height:0,t=this.containerView.$()[0],m=this.get("verticalScrollOffset"),g={height:0,top:0,right:0,left:0},o={height:a,top:0,right:0,left:0},e={height:a,bottom:0,right:0,left:0},n={height:0,bottom:0,right:0,left:0};
if(t){c=t.offsetHeight}if(m===0){j.top=0;j.bottom=a;u.set("layout",g);i.set("layout",e)
}else{if(m>=(l-c-a)){j.top=a;j.bottom=0;u.set("layout",o);i.set("layout",n)}else{j.top=a;
j.bottom=a;u.set("layout",o);i.set("layout",e)}}}if(u){u.set("isVisible",b);i.set("isVisible",b)
}s.set("layout",j)},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible","verticalScrollOffset"),createChildViews:function(){var c=[],b,a,e=this.get("controlSize");
if(SC.none(b=this.containerView)){b=SC.ContainerView}c.push(this.containerView=this.createChildView(b,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if((b=this.verticalScrollerView)&&(a=this.verticalScrollerView2)){if(this.get("hasVerticalScroller")){b=this.verticalScrollerView=this.createChildView(b,{layout:{top:0,left:0,right:0},controlSize:e,valueBinding:"*owner.verticalScrollOffset"});
c.push(b);a=this.verticalScrollerView2=this.createChildView(a,{scrollDown:YES,layout:{bottom:0,left:0,right:0},controlSize:e,valueBinding:"*owner.verticalScrollOffset"});
c.push(a)}else{this.verticalScrollerView=null;this.verticalScrollerView2=null}}this.childViews=c;
this.contentViewFrameDidChange();this.tile()},init:function(){arguments.callee.base.apply(this,arguments);
this._scroll_contentView=this.get("contentView");var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewFrameDidChange:function(){var c=this.get("contentView"),b,i=(c)?c.get("frame"):null,g=(i)?i.width:0,a=(i)?i.height:0,j=this.get("frame"),e,h;
this._scroll_contentWidth=g;this._scroll_contentHeight=a;if(this.get("hasVerticalScroller")&&(c=this.get("verticalScrollerView"))&&(b=this.get("verticalScrollerView2"))){a-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",a>j.height)
}a-=this.get("verticalScrollerBottom");e=0;h=this.containerView.$()[0];if(h){e=h.offsetHeight
}a=a-e;c.setIfChanged("maximum",a);b.setIfChanged("maximum",a)}},_scroll_horizontalScrollOffsetDidChange:function(){},_scroll_verticalScrollOffsetDidChange:function(){var b=this.get("verticalScrollOffset");
var a=this.get("contentView");if(a){a.adjust("top",0-b)}}.observes("verticalScrollOffset")});
sc_require("views/button");SC.PopupButtonView=SC.ButtonView.extend({classNames:["sc-popup-button"],preferMatrix:null,menu:null,shouldLoadInBackground:NO,init:function(){arguments.callee.base.apply(this,arguments);
this._setupMenu();if(this.get("shouldLoadInBackground")){SC.backgroundTaskQueue.push(SC.PopupButtonMenuLoader.create({popupButton:this}))
}},_setupMenu:function(){var a=this.get("instantiatedMenu");if(this.isActiveBinding){this.isActiveBinding.disconnect()
}this.isActiveBinding=null;if(a&&!a.isClass){this.isActiveBinding=this.bind("isActive",a,"isVisibleInWindow")
}},_popup_menuDidChange:function(){this._setupMenu()}.observes("menu"),isActive:NO,_instantiateMenu:function(){var a=this.get("menu");
if(!a.isClass||!a){return}this.menu=a.create();this._setupMenu()},acceptsFirstResponder:YES,instantiatedMenu:function(){var a=this.get("menu");
if(a&&a.isClass){this._instantiateMenu();a=this.get("menu")}return a}.property("menu").cacheable(),action:function(a){var b=this.get("instantiatedMenu");
if(!b){SC.Logger.warn("SC.PopupButton - Unable to show menu because the menu property is set to %@.".fmt(b));
return NO}b.popup(this,this.get("preferMatrix"));return YES},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this._isMouseDown=YES;this._action();this.invokeLast(this._recordMouseDownTimestamp);
this.becomeFirstResponder();return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(b){var e=new Date().getTime(),c=this._menuRenderedTimestamp,f=this.get("instantiatedMenu"),g=SC.platform.touch,a;
if(f){a=f.getPath("rootMenu.targetMenuItem");if(a){if(!a.performAction()){f.remove()
}}else{if(!g&&(e-c>SC.ButtonView.CLICK_AND_HOLD_DELAY)){f.remove()}}}this._isMouseDown=NO;
arguments.callee.base.apply(this,arguments);return YES},mouseExited:function(a){return YES
},performKeyEquivalent:function(b,a){if(!this.get("isEnabled")){return NO}var c=this.get("instantiatedMenu");
return(!!c&&c.performKeyEquivalent(b,a))},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled")});SC.PopupButtonMenuLoader=SC.Task.extend({popupButton:null,run:function(){if(this.popupButton){this.popupButton._instantiateMenu()
}}});SC.ProgressView=SC.View.extend(SC.Control,{value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),offsetRange:24,contentMaximumKey:null,isIndeterminate:NO,isIndeterminateBindingDefault:SC.Binding.bool(),isRunning:NO,isRunningBindingDefault:SC.Binding.bool(),animatedBackgroundMatrix:[],contentIsIndeterminateKey:null,classNames:"sc-progress-view",_backgroundOffset:0,_currentBackground:1,_nextBackground:1,init:function(){arguments.callee.base.apply(this,arguments);
this.animateProgressBar()},animateProgressBar:function(){if(this.get("isRunning")&&this.get("isVisibleInWindow")){this._animateProgressBar(500)
}}.observes("isRunning","isVisibleInWindow"),_animateProgressBar:function(a){if(a===0){a=1000/30
}if(this.get("isRunning")&&this.get("isVisibleInWindow")){this.displayDidChange();
this.invokeLater(this._animateProgressBar,a,600)}},displayProperties:"value minimum maximum isIndeterminate".w(),render:function(c,b){var o,f,l,e,i,g=this.get("isIndeterminate"),n=this.get("isRunning"),k=this.get("isEnabled"),m=this.get("offsetRange"),h=(g&&n)?(Math.floor(Date.now()/75)%m-m):0;
if(!k){l="0%"}else{if(g){l="120%"}else{l=(this.get("_percentageNumeric")*100)+"%"
}}var a={"sc-indeterminate":g,"sc-empty":(l<=0),"sc-complete":(l>=100)};if(b){var j=this._createClassNameString(a);
c.push('<div class="sc-inner ',j,'" style="width: ',l,";left: ",h,'px;">','<div class="sc-inner-head">',"</div>",'<div class="sc-inner-tail"></div></div>','<div class="sc-outer-head"></div>','<div class="sc-outer-tail"></div>')
}else{c.setClass(a);o=this.$(".sc-inner");f=this.get("animatedBackgroundMatrix");
e="width: "+l+"; ";e=e+"left: "+h+"px; ";if(f.length===3){o.css("backgroundPosition","0px -"+(f[0]+f[1]*this._currentBackground)+"px");
if(this._currentBackground===f[2]-1||this._currentBackground===0){this._nextBackground*=-1
}this._currentBackground+=this._nextBackground;e=e+"backgroundPosition: "+i+"px; ";
o.attr("style",e)}else{o.attr("style",e)}}},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
},_percentageNumeric:function(){var b=this.get("minimum")||0,c=this.get("maximum")||1,a=this.get("value")||0;
a=(a-b)/(c-b);if(a>1){a=1}if(isNaN(a)){a=0}if(a<b){a=0}if(a>c){a=1}return a}.property("value").cacheable(),_createClassNameString:function(c){var b=[],a;
for(a in c){if(!c.hasOwnProperty(a)){continue}if(c[a]){b.push(a)}}return b.join(" ")
}});SC.RadioView=SC.View.extend(SC.Control,{classNames:["sc-radio-view"],value:null,layoutDirection:SC.LAYOUT_VERTICAL,escapeHTML:YES,items:[],itemTitleKey:null,itemWidthKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this._renderAsFirstTime=YES;
this.notifyPropertyChange("_displayItems")},displayProperties:["value","_displayItems"],render:function(b,h){var k=this.get("_displayItems"),n=this.get("value"),i=SC.isArray(n),s,j,p,t,m,q,e,a,c,o,g,l,f;
b.addClass(this.get("layoutDirection"));if(i&&n.length<=0){n=n[0];i=NO}if(this._renderAsFirstTime){h=YES;
this._renderAsFirstTime=NO}if(h){b.attr("role","radiogroup");t=SC.guidFor(this);q=k.length;
for(j=0;j<q;j++){s=k[j];p=s[3];if(p){e=(p.indexOf("/")>=0)?p:SC.BLANK_IMAGE_URL;a=(e===p)?"":p;
p='<img src="'+e+'" class="icon '+a+'" alt="" />'}else{p=""}if(s){o=(i)?(n.indexOf(s[1])>=0):(n===s[1])
}else{o=NO}f=this._getSelectionStateClassNames(s,o,n,i,false);g=this.escapeHTML?SC.RenderContext.escapeHTML(s[0]):s[0];
m=s[4];b.push('<div class="sc-radio-button ',f,'" ',m?'style="width: '+m+'px;" ':"",'aria-checked="',o?"true":"false",'" ','role="radio"',' index="',j,'">','<span class="button"></span>','<span class="sc-button-label">',p,g,"</span></div>")
}}else{this.$(".sc-radio-button").forEach(function(u){u=this.$(u);j=parseInt(u.attr("index"),0);
s=(j>=0)?k[j]:null;if(s){o=(i)?(n.indexOf(s[1])>=0):(n===s[1])}else{o=NO}m=s[4];if(m){u.width(m)
}l=this._getSelectionStateClassNames(s,o,n,i,true);u.attr("aria-checked",o?"true":"false");
u.setClass(l);j=l=null},this)}},_displayItems:function(){var i=this.get("items"),e=this.get("localize"),b=this.get("itemTitleKey"),c=this.get("itemValueKey"),l=this.get("itemWidthKey"),a=this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL,h=this.get("itemIsEnabledKey"),s=this.get("itemIconKey"),q=[],m=(i)?i.get("length"):0,o,t,j,k,g,f,p,n;
for(g=0;g<m;g++){o=i.objectAt(g);if(SC.typeOf(o)===SC.T_ARRAY){t=o[0];k=o[1]}else{if(o){if(b){t=o.get?o.get(b):o[b]
}else{t=(o.toString)?o.toString():null}if(l&&a){j=o.get?o.get(l):o[l]}if(c){k=o.get?o.get(c):o[c]
}else{k=o}if(h){p=o.get?o.get(h):o[h]}else{p=YES}if(s){n=o.get?o.get(s):o[s]}else{n=null
}}else{t=k=n=null;p=NO}}if(e){t=t.loc()}q.push([t,k,p,n,j])}return q}.property("items","itemTitleKey","itemWidthKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey").cacheable(),_getSelectionStateClassNames:function(e,g,f,a,b){var i,c;
i={sel:(g&&!a),mixed:(g&&a),disabled:(!e[2])};if(b){return i}else{var h=[];for(c in i){if(!i.hasOwnProperty(c)){continue
}if(i[c]){h.push(c)}}return h.join(" ")}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}var b=a.target;while(b){if(b.className&&b.className.indexOf("sc-radio-button")>-1){break
}b=b.parentNode}if(!b){return NO}b=this.$(b);if(b.hasClass("disabled")){return YES
}b.addClass("active");this._activeRadioButton=b;a.allowDefault();return YES},mouseUp:function(a){if(!this.get("isEnabled")){return YES
}var g=this._activeRadioButton,f=a.target,b=this.get("_displayItems"),c,e;if(g){g.removeClass("active");
this._activeRadioButton=null}else{return YES}while(f){if(f.className&&f.className.indexOf("sc-radio-button")>-1){break
}f=f.parentNode}f=this.$(f);if(f[0]!==g[0]||f.hasClass("disabled")){return YES}c=parseInt(f.attr("index"),0);
e=b[c];this.set("value",e[1])},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
}});SC.SceneView=SC.ContainerView.extend({scenes:["master","detail"],nowShowing:null,transitionDuration:200,_state:"NO_VIEW",replaceContent:function(a){if(a&&this._state===this.READY){this.animateScene(a)
}else{this.replaceScene(a)}return this},replaceScene:function(c){var e=this._targetView,f=this.STANDARD_LAYOUT,b=this.get("scenes"),a=b?b.indexOf(this.get("nowShowing")):-1;
this._targetView=c;this._targetIndex=a;if(this._timer){this._timer.invalidate()}this._leftView=this._rightView=this._start=this._end=null;
this._timer=null;this.removeAllChildren();if(e){e.set("layout",f)}if(c){c.set("layout",f)
}if(c){this.appendChild(c)}this._state=c?this.READY:this.NO_VIEW},animateScene:function(b){var c=this._targetView,g=this._targetIndex,a=this.get("scenes"),f=a?a.indexOf(this.get("nowShowing")):-1,e;
if(g<0||f<0||g===f){return this.replaceScene(b)}this._targetView=b;this._targetIndex=f;
if(f>g){this._leftView=c;this._rightView=b;this._target=-1}else{this._leftView=b;
this._rightView=c;this._target=1}this.removeAllChildren();if(c){this.appendChild(c)
}if(b){this.appendChild(b)}this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this._state=this.ANIMATING;this.tick()},tick:function(){this._timer=null;var a=Date.now(),e=(a-this._start)/(this._end-this._start),h=this._target,g=this._leftView,b=this._rightView,c,f;
if(e<0){e=0}if(!this.get("isVisibleInWindow")||(e>=1)){return this.replaceScene(this._targetView)
}c=SC.clone(this.get("frame"));f=Math.floor(c.width*e);if(h>0){c.left=0-(c.width-f);
g.set("layout",c);c=SC.clone(c);c.left=f;b.set("layout",c)}else{c.left=0-f;g.set("layout",c);
c=SC.clone(c);c.left=c.width-f;b.set("layout",c)}this._timer=this.invokeLater(this.tick,20);
return this},NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",STANDARD_LAYOUT:{top:0,left:0,bottom:0,right:0}});
SC.SegmentedView=SC.View.extend(SC.Control,{classNames:["sc-segmented-view"],theme:"square",value:null,isEnabled:YES,allowsEmptySelection:NO,allowsMultipleSelection:NO,localize:YES,align:SC.ALIGN_CENTER,layoutDirection:SC.LAYOUT_HORIZONTAL,items:[],itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemActionKey:null,itemTargetKey:null,itemKeyEquivalentKey:null,itemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey".w(),displayItems:function(){var g=this.get("items"),c=this.get("localize"),l=null,e,j,f=[],h=g.get("length"),i,k,b=SC._segmented_fetchKeys,a=SC._segmented_fetchItem;
for(i=0;i<h;i++){k=g.objectAt(i);if(SC.none(k)){continue}e=SC.typeOf(k);if(e===SC.T_STRING){j=[k.humanize().titleize(),k,YES,null,null,null,i]
}else{if(e!==SC.T_ARRAY){if(l===null){l=this.itemKeys.map(b,this)}j=l.map(a,k);j[j.length]=i;
if(!l[0]&&k.toString){j[0]=k.toString()}if(!l[1]){j[1]=k}if(!l[2]){j[2]=YES}}}if(c&&j[0]){j[0]=j[0].loc()
}if(c&&j[5]&&SC.typeOf(j[5])===SC.T_STRING){j[5]=j[5].loc()}f[f.length]=j}return f
}.property("items","itemTitleKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey","itemWidthKey","itemToolTipKey"),itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this.set("renderLikeFirstTime",YES);
this.notifyPropertyChange("displayItems")},init:function(){arguments.callee.base.apply(this,arguments);
this.itemsDidChange()},displayProperties:["displayItems","value","activeIndex"],render:function(b,a){var h=this.get("displayItems");
var c=this.get("theme");if(c){b.addClass(c)}if(a||this.get("renderLikeFirstTime")){this._seg_displayItems=h;
this.renderDisplayItems(b,h);b.addStyle("text-align",this.get("align"));this.set("renderLikeFirstTime",NO)
}else{var l=this.get("activeIndex"),j=this.get("value"),e=SC.isArray(j);if(e&&j.get("length")===1){j=j.objectAt(0);
e=NO}var i={},f=h.length,g=this.$(".sc-segment"),k;while(--f>=0){k=h[f];i.sel=e?(j.indexOf(k[1])>=0):(k[1]===j);
i.active=(l===f);i.disabled=!k[2];SC.$(g[f]).setClass(i)}i=h=j=h=null}},renderDisplayItems:function(e,m){var p=this.get("value"),j=SC.isArray(p),t=this.get("activeIndex"),k=m.length,o,n,b,l,g,s,a,c,h,f,q;
for(h=0;h<k;h++){g=e.begin("a").attr("role","button");s=m[h];o=s[0];n=s[3];a=s[5];
f={};q=[];if(this.get("layoutDirection")==SC.LAYOUT_HORIZONTAL){f.display="inline-block"
}q.push("sc-segment");if(!s[2]){q.push("disabled")}if(h===0){q.push("sc-first-segment")
}if(h===(k-1)){q.push("sc-last-segment")}if(h!==0&&h!==(k-1)){q.push("sc-middle-segment")
}if(j?(p.indexOf(s[1])>=0):(s[1]===p)){q.push("sel")}if(t===h){q.push("active")}if(s[4]){c=s[4];
f.width=c+"px"}g.addClass(q);g.addStyle(f);if(a){g.attr("title",a)}if(n){b=(n.indexOf("/")>=0)?n:SC.BLANK_IMAGE_URL;
l=(b===n)?"":n;n='<img src="'+b+'" alt="" class="icon '+l+'" />'}else{n=""}g.push('<span class="sc-button-inner"><label class="sc-button-label">',n+o,"</label></span>");
g.end()}},displayItemIndexForEvent:function(a){return this.displayItemIndexForPosition(a.pageX,a.pageY)
},displayItemIndexForPosition:function(f,e){var c=this.$(".sc-segment"),b=c.length,a,h,g;
for(a=0;a<b;a++){h=c[a];g=h.getBoundingClientRect();if(this.get("layoutDirection")==SC.LAYOUT_VERTICAL){if(e>g.top&&e<g.bottom){return a
}}else{if(f>g.left&&f<g.right){return a}}}return -1},keyDown:function(e){var g,h,f,a,j,c;
if(e.which===9){var b=e.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{e.allowDefault()}return YES}if(!this.get("allowsMultipleSelection")&&!this.get("allowsEmptySelection")){f=this.get("displayItems");
a=f.length;j=this.get("value");c=SC.isArray(j);if(e.which===39||e.which===40){for(g=0;
g<a-1;g++){h=f[g];if(c?(j.indexOf(h[1])>=0):(h[1]===j)){this.triggerItemAtIndex(g+1)
}}return YES}else{if(e.which===37||e.which===38){for(g=1;g<a;g++){h=f[g];if(c?(j.indexOf(h[1])>=0):(h[1]===j)){this.triggerItemAtIndex(g-1)
}}return YES}}}return YES},mouseDown:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isMouseDown=YES;this.set("activeIndex",a)
}return YES},mouseUp:function(b){var a=this.displayItemIndexForEvent(b);if(this._isMouseDown&&(a>=0)){this.triggerItemAtIndex(a)
}this._isMouseDown=NO;this.set("activeIndex",-1);return YES},mouseMoved:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}return YES},mouseExited:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}return YES},mouseEntered:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",-1)}return YES},touchStart:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isTouching=YES;this.set("activeIndex",a)
}return YES},touchEnd:function(b){var a=this.displayItemIndexForEvent(b);if(this._isTouching&&(a>=0)){this.triggerItemAtIndex(a)
}this._isTouching=NO;this.set("activeIndex",-1);return YES},touchesDragged:function(b,c){var e=this.touchIsInBoundary(b);
if(e){if(!this._isTouching){this._touchDidEnter(b)}var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}else{if(this._isTouching){this._touchDidExit(b)}}this._isTouching=e;
return YES},_touchDidExit:function(b){var a=this.displayItemIndexForEvent(b);this.set("activeIndex",-1);
return YES},_touchDidEnter:function(b){var a=this.displayItemIndexForEvent(b);this.set("activeIndex",a);
return YES},triggerItemAtIndex:function(l){var j=this.get("displayItems"),m=j.objectAt(l),b,k,c,h,g;
if(!m[2]){return this}h=this.get("allowsEmptySelection");g=this.get("allowsMultipleSelection");
b=m[1];k=c=this.get("value");if(!SC.isArray(k)){k=[k]}if(!g){if(h&&(k.get("length")===1)&&(k.objectAt(0)===b)){k=[]
}else{k=[b]}}else{if(k.indexOf(b)>=0){if(k.get("length")>1||(k.objectAt(0)!==b)||h){k=k.without(b)
}}else{k=k.concat([b])}}switch(k.get("length")){case 0:k=null;break;case 1:k=k.objectAt(0);
break;default:break}var n=this.get("itemActionKey"),a=this.get("itemTargetKey"),f,i=null,e=this.getPath("pane.rootResponder");
if(n&&(m=this.get("items").objectAt(m[6]))){f=m.get?m.get(n):m[n];if(a){i=m.get?m.get(a):m[a]
}if(e){e.sendAction(f,i,this,this.get("pane"))}}if(!f&&c!==undefined){this.set("value",k)
}f=this.get("action");if(f&&e){e.sendAction(f,this.get("target"),this,this.get("pane"))
}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}}});
SC._segmented_fetchKeys=function(a){return this.get(a)};SC._segmented_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};sc_require("views/button");SC.SelectView=SC.ButtonView.extend({items:[],itemsBindingDefault:SC.Binding.multiple(),itemTitleKey:null,itemSortKey:null,itemValueKey:null,itemIconKey:null,itemSeparatorKey:"separator",localize:YES,disableSort:YES,classNames:["sc-select-view"],_itemList:[],_currentSelItem:null,_itemIdx:null,value:null,showCheckbox:YES,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","items"],preferMatrix:null,CUSTOM_MENU_ITEM_HEIGHT:20,isSelectedBinding:"*menu.isVisibleInWindow",positionMenuBelow:NO,lastMenuWidth:null,exampleView:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,menuItemPadding:35,isContextMenuEnabled:NO,leftAlign:function(){var b=0,a=this.get("controlSize");
if(a===SC.SMALL_CONTROL_SIZE){b=-14}if(a===SC.REGULAR_CONTROL_SIZE){b=-16}return b
}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("itemSortKey")||this.get("itemTitleKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)
})}return b},render:function(b,g){arguments.callee.base.apply(this,arguments);var c,k,o,q,u,h,f,t,i,m,a,l,e,j,v,p,n,s;
k=this.get("items");k=this.sortObjects(k);o=k.length;q=this.get("itemTitleKey");u=this.get("itemIconKey");
h=this.get("itemValueKey");f=this.get("itemSeparatorKey");t=this.get("showCheckbox");
i=this.get("value");m=this.get("localize");l=[];e=YES;j=0;k.forEach(function(w){if(w||w===0){v=q?(w.get?w.get(q):w[q]):w.toString();
v=m?v.loc():v;p=u?(w.get?w.get(u):w[u]):null;if(SC.none(w[u])){p=null}n=(h)?(w.get?w.get(h):w[h]):w;
if(!SC.none(i)&&!SC.none(n)){if(i===n){this.set("title",v);this.set("icon",p)}}if(n===this.get("value")){this.set("_itemIdx",j);
e=!t?NO:YES}else{e=NO}a=f?(w.get?w.get(f):w[f]):NO;if(j===0){this._defaultVal=n;this._defaultTitle=v;
this._defaultIcon=p}var x=SC.Object.create({separator:a,title:v,icon:p,value:n,isEnabled:YES,checkbox:e,action:this.displaySelectedItem});
l.push(x)}j+=1;this.set("_itemList",l)},this);if(g){this.invokeLast(function(){var w=this.get("value");
if(SC.none(w)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this._itemIdx)
},_action:function(m){var i,a,j,k,s,o,z,f,y,c,n,u,p,w,g,h,l,b,x;i=this.$(".sc-button-label")[0];
a=this.get("layer").offsetWidth;j=i.scrollWidth;k=this.get("lastMenuWidth");if(j){s=i.offsetWidth;
if(j&&s){a=a+j-s}}if(!k||(a>k)){k=a}o=this.get("_itemList");var t=this.get("customViewClassName");
var q=this.get("customViewMenuOffsetWidth");var e="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
e=t?(e+" "+t):e;SC.prepareStringMeasurement("",e);for(n=0,x=o.length;n<x;++n){y=o.objectAt(n);
z=SC.measureString(y.title).width;if(!f||(z>f)){f=z}}SC.teardownStringMeasurement();
k=(f+this.menuItemPadding>k)?f+this.menuItemPadding:k;var v=SC.RootResponder.responder.get("currentWindowSize").width;
if(k>v){k=(v-25)}this.set("lastMenuWidth",k);u=this.get("_currentSelItem");p=this.get("_itemList");
w=this.get("controlSize");g=this.get("menuPaneHeightPadding");h=this.get("exampleView");
l=h?h:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:p,exampleView:l,isEnabled:YES,menuHeightPadding:g,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:k},controlSize:w,itemWidth:k,contentView:SC.View.extend({})});
if(!b){return NO}b.popup(this,this.preferMatrix);b.set("currentSelectedMenuItem",u);
return YES},displaySelectedItem:function(){var k,b,g,j,c,a=0,h,f,i,l=null,e;k=this.parentMenu();
b=k.get("currentSelectedMenuItem");g=k.menuItemViews;if(b&&g){a=g.indexOf(b)}h=k.get("anchor");
f=k.get("items");i=f.length;while(!l&&(--i>=0)){e=f[i];j=!SC.none(e.title)?e.title:f.toString();
c=!SC.none(e.value)?e.value:j;if(j===this.get("value")&&(a===i)){l=f;h.set("value",c);
h.set("title",j)}}h.set("icon",this.get("icon")).set("_currentSelItem",b).set("_itemIdx",a)
},changeSelectButtonPreferMatrix:function(){var e=0,b=this.get("_itemIdx"),a=this.get("leftAlign"),f,c;
if(this.get("positionMenuBelow")){f=[a,4,3];this.set("preferMatrix",f)}else{if(b){e=b*this.CUSTOM_MENU_ITEM_HEIGHT
}c=[a,-e,2];this.set("preferMatrix",c)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES}else{arguments.callee.base.apply(this,arguments)
}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
}});SC.SelectFieldView=SC.FieldView.extend({tagName:"select",classNames:["sc-select-field-view"],objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,emptyName:null,localize:false,cpDidChange:YES,disableSort:NO,validateMenuItem:function(b,a){return true
},sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
if(a){b=b.sortProperty(a)}else{b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];
c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)})}}return b},render:function(c,a){if(this.get("cpDidChange")){this.set("cpDidChange",NO);
var g=this.get("nameKey");var k=this.get("valueKey");var j=this.get("objects");var b=this.get("value");
var e,h;if(!this.get("isEnabled")){c.attr("disabled","disabled")}var i=this.get("localize");
if(!k&&b){b=SC.guidFor(b)}if((b===null)||(b==="")){b="***"}if(j){j=this.sortObjects(j);
if(!a){h=this.$input()[0];if(!h){return}h.innerHTML=""}var f=this.get("emptyName");
if(f){if(i){f=f.loc()}if(a){c.push('<option value="***">'+f+"</option>",'<option disabled="disabled"></option>')
}else{e=document.createElement("option");e.value="***";e.innerHTML=f;h.appendChild(e);
e=document.createElement("option");e.disabled="disabled";h.appendChild(e)}}j.forEach(function(o,n){if(o){var m=g?(o.get?o.get(g):o[g]):o.toString();
if(i){m=m.loc()}var p=(k)?(o.get?o.get(k):o[k]):o;if(!f&&n===0&&b==="***"){this.set("value",p)
}if(p){p=(SC.guidFor(p))?SC.guidFor(p):p.toString()}var l=(this.validateMenuItem&&this.validateMenuItem(p,m))?"":'disabled="disabled" ';
if(a){c.push("<option "+l+'value="'+p+'">'+m+"</option>")}else{e=document.createElement("option");
e.value=p;e.innerHTML=m;if(l.length>0){e.disable="disabled"}h.appendChild(e)}}else{if(a){c.push('<option disabled="disabled"></option>')
}else{e=document.createElement("option");e.disabled="disabled";h.appendChild(e)}}},this);
this.setFieldValue(b)}else{this.set("value",null)}}else{this.$().attr("disabled",this.get("isEnabled")?null:"disabled")
}},displayProperties:["objects","nameKey","valueKey","isEnabled"],_objectsObserver:function(){this.set("cpDidChange",YES)
}.observes("objects"),_objectArrayObserver:function(){this.set("cpDidChange",YES);
this.propertyDidChange("objects")}.observes("*objects.[]"),_nameKeyObserver:function(){this.set("cpDidChange",YES)
}.observes("nameKey"),_valueKeyObserver:function(){this.set("cpDidChange",YES)}.observes("valueKey"),acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),$input:function(){return this.$()},mouseDown:function(a){if(!this.get("isEnabled")){a.stop();
return YES}else{return arguments.callee.base.apply(this,arguments)}},getFieldValue:function(){var g=arguments.callee.base.apply(this,arguments);
var c=this.get("valueKey");var f=this.get("objects");var e=null;var a;if(g=="***"){g=null
}else{if(g&&f){var h=(SC.typeOf(f.length)===SC.T_FUNCTION)?f.length():f.length;while(!e&&(--h>=0)){a=f.objectAt?f.objectAt(h):f[h];
if(!a){continue}if(c){a=(a.get)?a.get(c):a[c]}var b=(a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null;
if(g==b){e=a}}}}return(c||e)?e:g},setFieldValue:function(a){if(SC.none(a)){a="***"
}else{a=((a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null)}this.$input().val(a);
return this},fieldDidFocus:function(){var a=this.get("isFocused");if(!a){this.set("isFocused",true)
}},fieldDidBlur:function(){var a=this.get("isFocused");if(a){this.set("isFocused",false)
}},_isFocusedObserver:function(){this.$().setClass("focus",this.get("isFocused"))
}.observes("isFocused"),didCreateLayer:function(){var a=this.$input();if(this.get("isEnabled")===false){this.$()[0].disabled=true
}SC.Event.add(a,"blur",this,this.fieldDidBlur);SC.Event.add(a,"focus",this,this.fieldDidFocus);
return arguments.callee.base.apply(this,arguments)},willDestroyLayer:function(){var a=this.$input();
SC.Event.remove(a,"focus",this,this.fieldDidFocus);SC.Event.remove(a,"blur",this,this.fieldDidBlur);
return arguments.callee.base.apply(this,arguments)}});SC.SliderView=SC.View.extend(SC.Control,{classNames:"sc-slider-view",handleSelector:"img.sc-handle",value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),contentMaximumKey:null,step:0.1,displayProperties:"value minimum maximum".w(),render:function(e,h){arguments.callee.base.apply(this,arguments);
var c=this.get("minimum"),a=this.get("maximum"),g=this.get("value"),f=this.get("step");
g=Math.min(Math.max(g,c),a);if(!SC.none(f)&&f!==0){g=Math.round(g/f)*f}if(g!==0){g=Math.floor((g-c)/(a-c)*100)
}if(h){var b=SC.BLANK_IMAGE_URL;e.push('<span class="sc-inner">','<span class="sc-leftcap"></span>','<span class="sc-rightcap"></span>','<img src="',b,'" class="sc-handle" style="left: ',g,'%" />',"</span>")
}else{this.$(this.get("handleSelector")).css("left",g+"%")}},_isMouseDown:NO,mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;return this._triggerHandle(a,true)
},mouseDragged:function(a){return this._isMouseDown?this._triggerHandle(a):YES},mouseUp:function(a){if(this._isMouseDown){this.set("isActive",NO)
}var b=this._isMouseDown?this._triggerHandle(a):YES;this._isMouseDown=NO;return b
},mouseWheel:function(b){if(!this.get("isEnabled")){return YES}var e=this.get("minimum"),a=this.get("maximum"),c=this.get("value")+((b.wheelDeltaX+b.wheelDeltaY)*0.01),f=this.get("step"),g=Math.round(c/f)*f;
if(c<e){this.setIfChanged("value",e)}else{if(c>a){this.setIfChanged("value",a)}else{this.setIfChanged("value",c)
}}return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
},touchesDragged:function(a){return this.mouseDragged(a)},_triggerHandle:function(b,f){var g=this.get("frame").width,e=this.get("minimum"),a=this.get("maximum"),h=this.get("step"),c=this.get("value"),i;
if(f){i=this.convertFrameFromView({x:b.pageX}).x;this._evtDiff=b.pageX-i}else{i=b.pageX-this._evtDiff
}i=Math.max(Math.min(i,g-8),8)-8;g-=16;i=i/g;i=e+((a-e)*i);if(h!==0){i=Math.round(i/h)*h
}if(Math.abs(c-i)>=0.01){this.set("value",i)}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},keyDown:function(c){if(c.which===9){var b=c.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{c.allowDefault()}return YES}if(c.which===37||c.which===38||c.which===39||c.which===40){var f=this.get("minimum"),a=this.get("maximum"),g=this.get("step"),e=a-f,i=0,h;
if(c.which===37||c.which===38){if(g===0){if(e<100){i=this.get("value")-1}else{h=Math.abs(e/100);
if(h<2){h=2}i=this.get("value")-Math.abs(e/100)}}else{i=this.get("value")-g}}if(c.which===39||c.which===40){if(g===0){if(e<100){i=this.get("value")+2
}else{h=Math.abs(e/100);if(h<2){h=2}i=this.get("value")+h}}else{i=this.get("value")+g
}}if(i>=f&&i<=a){this.set("value",i)}}SC.RunLoop.begin().end();return YES},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
}});sc_require("mixins/collection_group");sc_require("views/disclosure");SC.SourceListGroupView=SC.View.extend(SC.Control,SC.CollectionGroup,{classNames:["sc-source-list-group"],content:null,isGroupVisible:YES,hasGroupTitle:YES,groupTitleKey:null,groupVisibleKey:null,render:function(a,b){a.push('<div role="button" class="sc-source-list-label sc-disclosure-view sc-button-view button disclosure no-disclosure">','<img src="'+SC.BLANK_IMAGE_URL+'" class="button" />','<span class="label"></span></div>')
},createChildViews:function(){},contentPropertyDidChange:function(g,c){var f=this.get("content");
var i=this.outlet("labelView");if(f===null){i.setIfChanged("isVisible",NO);this.setIfChanged("hasGroupTitle",NO);
return}else{i.setIfChanged("isVisible",YES);this.setIfChanged("hasGroupTitle",YES)
}var b=this.getDelegateProperty("groupTitleKey",this.displayDelegate);if((c=="*")||(b&&(c==b))){var h=(f&&f.get&&b)?f.get(b):f;
if(h!=this._title){this._title=h;if(h){h=h.capitalize()}i.set("title",h)}}var e=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if((c=="*")||(e&&(c==e))){if(e){i.removeClassName("no-disclosure");var a=(f&&f.get)?!!f.get(e):YES;
if(a!=this.get("isGroupVisible")){this.set("isGroupVisible",a);i.set("value",a)}}else{i.addClassName("no-disclosure")
}}},disclosureValueDidChange:function(c){if(c==this.get("isGroupVisible")){return
}var b=this.get("content");var a=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if(b&&b.set&&a){b.set(a,c)}this.set("isGroupVisible",c);if(this.owner&&this.owner.updateChildren){this.owner.updateChildren(true)
}},labelView:SC.DisclosureView.extend({value:YES,_valueObserver:function(){if(this.owner){this.owner.disclosureValueDidChange(this.get("value"))
}}.observes("value")})});sc_require("views/list");sc_require("views/source_list_group");
SC.BENCHMARK_SOURCE_LIST_VIEW=YES;SC.SourceListView=SC.ListView.extend({classNames:["sc-source-list"],rowHeight:32,selectOnMouseDown:NO,actOnSelect:YES});
SC.RESIZE_BOTH="resize-both";SC.RESIZE_TOP_LEFT="resize-top-left";SC.RESIZE_BOTTOM_RIGHT="resize-bottom-right";
SC.SplitView=SC.View.extend({classNames:["sc-split-view"],displayProperties:["layoutDirection"],delegate:null,layoutDirection:SC.LAYOUT_HORIZONTAL,canCollapseViews:YES,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,defaultThickness:0.5,isSplitView:YES,topLeftView:SC.View,dividerView:SC.SplitDividerView,bottomRightView:SC.View,topLeftThickness:function(){var a=this.get("topLeftView");
return a?this.thicknessForView(a):0}.property("topLeftView").cacheable(),bottomRightThickness:function(){var a=this.get("bottomRightView");
return a?this.thicknessForView(a):0}.property("bottomRightView").cacheable(),thumbViewCursor:null,canCollapseView:function(a){return this.invokeDelegateMethod(this.delegate,"splitViewCanCollapse",this,a)
},thicknessForView:function(a){var c=this.get("layoutDirection"),b=a.get("frame");
return(c===SC.LAYOUT_HORIZONTAL)?b.width:b.height},createChildViews:function(){var f=[],e=["topLeftView","dividerView","bottomRightView"],c,b,a;
for(b=0,a=e.length;b<a;++b){if(c=this.get(e[b])){c=this[e[b]]=this.createChildView(c,{layoutView:this,rootElementPath:[b]});
f.push(c)}}this.set("childViews",f);return this},updateChildLayout:function(){var a=this.get("topLeftView"),b=this.get("bottomRightView"),i=this.get("dividerView"),j=this.get("layoutDirection"),e=this._desiredTopLeftThickness;
var k=this.get("dividerThickness");k=(!SC.none(k))?k:7;var h=(j===SC.LAYOUT_HORIZONTAL)?this.get("frame").width:this.get("frame").height,l=h-k-e,c=this.get("autoresizeBehavior"),g,f;
f=a.get("isCollapsed")||NO;a.setIfChanged("isVisible",!f);g=SC.clone(a.get("layout"));
if(j===SC.LAYOUT_HORIZONTAL){g.top=0;g.left=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:g.right=l+k;delete g.width;break;case SC.RESIZE_BOTTOM_RIGHT:delete g.right;
delete g.height;g.width=e;break}}else{g.top=0;g.left=0;g.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:g.bottom=l+k;delete g.height;break;case SC.RESIZE_BOTTOM_RIGHT:delete g.bottom;
delete g.width;g.height=e;break}}a.set("layout",g);if(i){g=SC.clone(i.get("layout"));
if(j===SC.LAYOUT_HORIZONTAL){g.width=k;delete g.height;g.top=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete g.left;g.right=l;delete g.centerX;delete g.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:g.left=e;delete g.right;delete g.centerX;delete g.centerY;
break}}else{delete g.width;g.height=k;g.left=0;g.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete g.top;g.bottom=l;delete g.centerX;delete g.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:g.top=e;delete g.bottom;delete g.centerX;delete g.centerY;
break}}i.set("layout",g)}f=b.get("isCollapsed")||NO;b.setIfChanged("isVisible",!f);
g=SC.clone(b.get("layout"));if(j===SC.LAYOUT_HORIZONTAL){g.top=0;g.bottom=0;g.right=0;
switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";case SC.RESIZE_BOTTOM_RIGHT:g.left=e+k;
delete g.width;break;case SC.RESIZE_TOP_LEFT:delete g.left;g.width=l;break}}else{g.left=0;
g.right=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_BOTTOM_RIGHT:g.top=e+k;delete g.height;break;case SC.RESIZE_TOP_LEFT:delete g.top;
g.height=l;break}}b.set("layout",g);this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
},renderLayout:function(b,a){if(a||this._recalculateDivider){if(!this.get("thumbViewCursor")){this.set("thumbViewCursor",SC.Cursor.create())
}var e=this.get("layoutDirection"),g=this.get("frame"),f,j=this.$(),i=this.get("defaultThickness"),c=this.get("autoresizeBehavior");
var h=this.get("dividerThickness");h=(!SC.none(h))?h:7;if(this._recalculateDivider===undefined&&i<1){this._recalculateDivider=YES
}else{if(this._recalculateDivider){this._recalculateDivider=NO}}if(j[0]){f=(e===SC.LAYOUT_HORIZONTAL)?j[0].offsetWidth:j[0].offsetHeight
}else{f=(e===SC.LAYOUT_HORIZONTAL)?g.width:g.height}if(SC.none(i)||(i>0&&i<1)){i=Math.floor((f-(h))*(i||0.5))
}if(c===SC.RESIZE_BOTTOM_RIGHT){this._desiredTopLeftThickness=i}else{this._desiredTopLeftThickness=f-h-i
}this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this._updateTopLeftThickness(0);this._setCursorStyle();this.updateChildLayout()}arguments.callee.base.apply(this,arguments)
},render:function(b,c){arguments.callee.base.apply(this,arguments);if(this._inLiveResize){this._setCursorStyle()
}var a=this.get("layoutDirection");if(a===SC.LAYOUT_HORIZONTAL){b.addClass("sc-horizontal")
}else{b.addClass("sc-vertical")}},mouseDownInThumbView:function(a,c){var b=this.getPath("pane.rootResponder");
if(!b){return NO}b.dragDidStart(this);this._mouseDownX=a.pageX;this._mouseDownY=a.pageY;
this._thumbView=c;this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this.beginLiveResize();this._inLiveResize=YES;return YES},mouseDragged:function(a){var b=(this._layoutDirection===SC.LAYOUT_HORIZONTAL)?a.pageX-this._mouseDownX:a.pageY-this._mouseDownY;
this._updateTopLeftThickness(b);return YES},mouseUp:function(a){if(this._inLiveResize===YES){this._thumbView=null;
this._inLiveResize=NO;this.endLiveResize();return YES}return NO},touchesDragged:function(a){return this.mouseDragged(a)
},touchEnd:function(a){return this.mouseUp(a)},doubleClickInThumbView:function(b,e){var a=this._topLeftView,c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){a=this._bottomRightView;c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){return NO}}if(!c){this._uncollapsedThickness=this.thicknessForView(a);
if(a===this._topLeftView){this._updateTopLeftThickness(this.topLeftThickness()*-1)
}else{this._updateBottomRightThickness(this.bottomRightThickness()*-1)}if(!a.get("isCollapsed")){this._uncollapsedThickness=null
}}else{if(a===this._topLeftView){this._updateTopLeftThickness(this._uncollapsedThickness)
}else{this._updateBottomRightThickness(this._uncollapsedThickness)}a._uncollapsedThickness=null
}this._setCursorStyle();return true},_updateTopLeftThickness:function(f){var a=this._topLeftView,c=this._bottomRightView,g=this.thicknessForView(a),h=this.thicknessForView(c),k=this._dividerThickness,j=0,b=this._topLeftViewThickness+f,n=this._layoutDirection,p=this.canCollapseView(c),m=b,l=this.get("topLeftMaxThickness"),e=this.get("topLeftMinThickness"),o,i,q;
if(!a.get("isCollapsed")){j+=g}if(!c.get("isCollapsed")){j+=h}if(!SC.none(l)){m=Math.min(l,m)
}if(!SC.none(e)){m=Math.max(e,m)}l=this.get("bottomRightMaxThickness");e=this.get("bottomRightMinThickness");
o=j-m;if(!SC.none(l)){o=Math.min(l,o)}if(!SC.none(e)){o=Math.max(e,o)}m=j-o;m=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,m);
m=Math.min(m,j);m=Math.max(0,m);i=a.get("collapseAtThickness");if(!i){i=0}q=c.get("collapseAtThickness");
q=SC.none(q)?j:(j-q);if((b<=i)&&this.canCollapseView(a)){l=c.get("maxThickness");
if(!l||(k+j)<=l){m=0}}else{if(b>=q&&this.canCollapseView(c)){l=a.get("maxThickness");
if(!l||(k+j)<=l){m=j}}}if(m!=this.thicknessForView(a)){this._desiredTopLeftThickness=m;
a.set("isCollapsed",m===0);c.set("isCollapsed",m>=j);this.updateChildLayout();this.displayDidChange()
}},_updateBottomRightThickness:function(f){var a=this._topLeftView,c=this._bottomRightView,g=this.thicknessForView(a),h=this.thicknessForView(c),k=this._dividerThickness,j=0,b=this._topLeftViewThickness+f,n=this._layoutDirection,p=this.canCollapseView(c),m=b,l=this.get("topLeftMaxThickness"),e=this.get("topLeftMinThickness"),o,i,q;
if(!a.get("isCollapsed")){j+=g}if(!c.get("isCollapsed")){j+=h}if(!SC.none(l)){m=Math.min(l,m)
}if(!SC.none(e)){m=Math.max(e,m)}l=this.get("bottomRightMaxThickness");e=this.get("bottomRightMinThickness");
o=j-m;if(!SC.none(l)){o=Math.min(l,o)}if(!SC.none(e)){o=Math.max(e,o)}m=j-o;m=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,m);
m=Math.min(m,j);m=Math.max(0,m);i=a.get("collapseAtThickness");if(!i){i=0}q=c.get("collapseAtThickness");
q=SC.none(q)?j:(j-q);if((b<=i)&&this.canCollapseView(a)){l=c.get("maxThickness");
if(!l||(k+j)<=l){m=0}}else{if(b>=q&&this.canCollapseView(c)){l=a.get("maxThickness");
if(!l||(k+j)<=l){m=j}}}if(m!=this.thicknessForView(a)){this._desiredTopLeftThickness=m;
a.set("isCollapsed",m===0);c.set("isCollapsed",m>=j);this.updateChildLayout();this.displayDidChange()
}},_setCursorStyle:function(){var e=this._topLeftView,f=this._bottomRightView,a=this.get("thumbViewCursor"),b=this.thicknessForView(e),c=this.thicknessForView(f);
this._layoutDirection=this.get("layoutDirection");if(e.get("isCollapsed")||b===this.get("topLeftMinThickness")||c==this.get("bottomRightMaxThickness")){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"s-resize")
}else{if(f.get("isCollapsed")||b===this.get("topLeftMaxThickness")||c==this.get("bottomRightMinThickness")){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"w-resize":"n-resize")
}else{if(SC.browser.msie){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"n-resize")
}else{a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"ew-resize":"ns-resize")
}}}}.observes("layoutDirection"),splitViewCanCollapse:function(b,a){if(b.get("canCollapseViews")===NO){return NO
}if(a.get("canCollapse")===NO){return NO}return YES},splitViewConstrainThickness:function(c,a,b){return b
},_forceSplitCalculation:function(){this.updateLayout()}.observes("*pane.isPaneAttached"),viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
}.observes("layout")});sc_require("views/split");SC.SplitDividerView=SC.View.extend({classNames:["sc-split-divider-view"],prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){var b=this.get("splitView");return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},doubleClick:function(a){var b=this.get("splitView");return(b)?b.doubleClickInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(a){return this.mouseDown(a)}});sc_require("views/collection");
SC.StackedView=SC.CollectionView.extend({classNames:["sc-stacked-view"],layout:{top:0,left:0,right:0,height:1},computeNowShowing:function(a){return this.get("allContentIndexes")
},updateHeight:function(a){if(a){this._updateHeight()}else{this.invokeLast(this._updateHeight)
}return this},_updateHeight:function(){var f=this.get("childViews"),b=f.get("length"),c,e,a;
if(b===0){a=1}else{c=f.objectAt(b-1);e=c?c.get("layer"):null;a=e?(e.offsetTop+e.offsetHeight):1;
e=null}this.adjust("height",a)},didReload:function(a){return this.updateHeight()},didCreateLayer:function(){return this.updateHeight()
}});SC.StaticContentView=SC.View.extend(SC.StaticLayout,{classNames:["sc-static-content-view"],displayProperties:["content"],content:null,contentLayoutDidChange:function(){this._viewFrameDidChange()
},useStaticLayout:YES,frame:function(){var a=this.get("layer"),b;if(!a){return{x:0,y:0,width:0,height:0}
}if(a.getBoundingClientRect){b=a.getBoundingClientRect();return{x:0,y:0,width:b.width,height:b.height}
}else{return{x:0,y:0,width:a.clientWidth,height:a.clientHeight}}}.property("content").cacheable(),parentViewDidResize:function(){this.contentLayoutDidChange()
},didCreateLayer:function(){this.contentLayoutDidChange()},render:function(a,c){var b=this.get("content");
if(b){a.push(b||"")}},touchStart:function(a){a.allowDefault();return YES},touchEnd:function(a){a.allowDefault();
return YES}});sc_require("views/segmented");SC.TOP_LOCATION="top";SC.TOP_TOOLBAR_LOCATION="top-toolbar";
SC.BOTTOM_LOCATION="bottom";SC.TabView=SC.View.extend({classNames:["sc-tab-view"],displayProperties:["nowShowing"],nowShowing:null,items:[],isEnabled:YES,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemToolTipKey:null,tabHeight:SC.REGULAR_BUTTON_HEIGHT,tabLocation:SC.TOP_LOCATION,userDefaultKey:null,_tab_nowShowingDidChange:function(){var a=this.get("nowShowing");
this.get("containerView").set("nowShowing",a);this.get("segmentedView").set("value",a);
return this}.observes("nowShowing"),_tab_saveUserDefault:function(){var a=this.get("nowShowing");
var b=this.get("userDefaultKey");if(b){SC.userDefaults.set([b,"nowShowing"].join(":"),a)
}}.observes("nowShowing"),_tab_itemsDidChange:function(){this.get("segmentedView").set("items",this.get("items"));
return this}.observes("items"),init:function(){arguments.callee.base.apply(this,arguments);
this._tab_nowShowingDidChange()._tab_itemsDidChange()},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("userDefaultKey");if(a){a=[a,"nowShowing"].join(":");var b=SC.userDefaults.get(a);
if(!SC.none(b)){this.set("nowShowing",b)}}},createChildViews:function(){var g=[],a,f,e,c=this.get("tabLocation"),b=this.get("tabHeight");
e=(c===SC.TOP_LOCATION)?{top:b/2+1,left:0,right:0,bottom:0}:(c===SC.TOP_TOOLBAR_LOCATION)?{top:b+1,left:0,right:0,bottom:0}:{top:0,left:0,right:0,bottom:b-1};
f=this.containerView.extend(SC.Border,{layout:e,borderStyle:SC.BORDER_BLACK});a=this.containerView=this.createChildView(f);
g.push(a);e=(c===SC.TOP_LOCATION||c===SC.TOP_TOOLBAR_LOCATION)?{height:b,left:0,right:0,top:0}:{height:b,left:0,right:0,bottom:0};
this.segmentedView=this.get("segmentedView").extend({layout:e,_sc_tab_segmented_valueDidChange:function(){var h=this.get("parentView");
if(h){h.set("nowShowing",this.get("value"))}this.set("layerNeedsUpdate",YES);this.invokeOnce(this.updateLayerIfNeeded)
}.observes("value"),init:function(){var h=this.get("parentView");if(h){SC._TAB_ITEM_KEYS.forEach(function(i){this[i]=h.get(i)
},this)}return arguments.callee.base.apply(this,arguments)}});a=this.segmentedView=this.createChildView(this.segmentedView);
g.push(a);this.set("childViews",g);return this},containerView:SC.ContainerView,segmentedView:SC.SegmentedView});
SC._TAB_ITEM_KEYS="itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey itemActionKey itemTargetKey".w();
SC.ThumbView=SC.View.extend({classNames:["sc-thumb-view"],isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){if(!this.get("isEnabled")){return NO}var b=this.get("splitView");
return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(a){return this.mouseDown(a)}});SC.ToolbarView=SC.View.extend({classNames:["sc-toolbar-view"],anchorLocation:null,layout:{left:0,height:32,right:0},init:function(){if(this.anchorLocation){this.layout=SC.merge(this.layout,this.anchorLocation)
}arguments.callee.base.apply(this,arguments)}});SC.WebView=SC.View.extend(SC.Control,{classNames:"sc-web-view",displayProperties:["value","shouldAutoResize"],shouldAutoResize:NO,render:function(a,e){var c=this.get("value");
if(e){a.push('<iframe src="'+c+'" style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0p;"></iframe>')
}else{var b=this.$("iframe");b.attr("src","javascript:;");b.attr("src",c)}},didCreateLayer:function(){var a=this.$("iframe");
SC.Event.add(a,"load",this,this.iframeDidLoad)},iframeDidLoad:function(){if(this.get("shouldAutoResize")===YES){var a;
var c=this.$("iframe")[0];if(c&&c.contentWindow){a=c.contentWindow;if(a&&a.document&&a.document.documentElement){var b=a.document.documentElement;
if(!SC.browser.isIE){this.$().width(b.scrollWidth);this.$().height(b.scrollHeight)
}else{this.$().width(b.scrollWidth+12);this.$().height(b.scrollHeight+5)}}}}}});SC.WELL_CONTAINER_PADDING=15;
SC.WellView=SC.ContainerView.extend({classNames:"sc-well-view",contentLayout:{top:SC.WELL_CONTAINER_PADDING,bottom:SC.WELL_CONTAINER_PADDING,left:SC.WELL_CONTAINER_PADDING,right:SC.WELL_CONTAINER_PADDING},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);a.set("layout",this.contentLayout);
this.childViews=[a]}},render:function(a,b){if(b){a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>","<div class='content-background'></div>")
}arguments.callee.base.apply(this,arguments)},contentViewDidChange:function(){var a=this.get("contentView");
a.set("layout",this.contentLayout);this.replaceContent(a)}.observes("contentView")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/desktop")
}SC.DataSource=SC.Object.extend({fetch:function(a,b){return NO},retrieveRecords:function(a,c,b){return this._handleEach(a,c,this.retrieveRecord,b)
},commitRecords:function(c,b,h,g,i){var e,f,a;if(b.length>0){e=this.createRecords.call(this,c,b,i)
}if(h.length>0){f=this.updateRecords.call(this,c,h,i)}if(g.length>0){a=this.destroyRecords.call(this,c,g,i)
}return((e===f)&&(e===a))?e:SC.MIXED_STATE},cancel:function(a,b){return NO},updateRecords:function(a,b,c){return this._handleEach(a,b,this.updateRecord,null,c)
},createRecords:function(a,b,c){return this._handleEach(a,b,this.createRecord,null,c)
},destroyRecords:function(a,b,c){return this._handleEach(a,b,this.destroyRecord,null,c)
},_handleEach:function(h,e,c,a,b){var f=e.length,i,g,j,k;if(!a){a=[]}for(i=0;i<f;
i++){k=a[i]?a[i]:b;j=c.call(this,h,e[i],k,b);if(g===undefined){g=j}else{if(g===YES){g=(j===YES)?YES:SC.MIXED_STATE
}else{if(g===NO){g=(j===NO)?NO:SC.MIXED_STATE}}}}return g?g:null},updateRecord:function(a,b,c){return NO
},retrieveRecord:function(a,b,c){return NO},createRecord:function(a,b,c){return NO
},destroyRecord:function(a,b,c){return NO}});sc_require("data_sources/data_source");
SC.CascadeDataSource=SC.DataSource.extend({dataSources:null,from:function(a){var b=this.get("dataSources");
if(!b){this.set("dataSources",b=[])}b.push(a);return this},fetch:function(c,h){var f=this.get("dataSources"),b=f?f.length:0,e=NO,i,g,a;
for(a=0;(e!==YES)&&a<b;a++){g=f.objectAt(a);i=g.fetch?g.fetch.apply(g,arguments):NO;
e=this._handleResponse(e,i)}return e},retrieveRecords:function(i,e,b){var c=this.get("dataSources"),f=c?c.length:0,g=NO,j,a,h;
for(h=0;(g!==YES)&&h<f;h++){a=c.objectAt(h);j=a.retrieveRecords.apply(a,arguments);
g=this._handleResponse(g,j)}return g},commitRecords:function(j,c,h,e){var b=this.get("dataSources"),f=b?b.length:0,g=NO,k,a,i;
for(i=0;(g!==YES)&&i<f;i++){a=b.objectAt(i);k=a.commitRecords.apply(a,arguments);
g=this._handleResponse(g,k)}return g},cancel:function(c,g){var f=this.get("dataSources"),b=f?f.length:0,e=NO,i,h,a;
for(a=0;(e!==YES)&&a<b;a++){h=f.objectAt(a);i=h.cancel.apply(h,arguments);e=this._handleResponse(e,i)
}return e},init:function(){arguments.callee.base.apply(this,arguments);var b=this.get("dataSources"),a=b?b.get("length"):0,c;
while(--a>=0){c=b[a];if(SC.typeOf(c)===SC.T_STRING){b[a]=this.get(c)}}},_handleResponse:function(b,a){if(a===YES){return YES
}else{if(b===NO){return(a===NO)?NO:SC.MIXED_STATE}else{return SC.MIXED_STATE}}}});
SC.Record=SC.Object.extend({isRecord:YES,primaryKey:"guid",id:function(a,b){if(b!==undefined){this.writeAttribute(this.get("primaryKey"),b);
return b}else{return SC.Store.idFor(this.storeKey)}}.property("storeKey").cacheable(),status:function(){return this.store.readStatus(this.storeKey)
}.property("storeKey").cacheable(),store:null,storeKey:null,isDestroyed:function(){return !!(this.get("status")&SC.Record.DESTROYED)
}.property("status").cacheable(),isEditable:function(a,b){if(b!==undefined){this._screc_isEditable=b
}if(this.get("status")&SC.Record.READY){return this._screc_isEditable}else{return NO
}}.property("status").cacheable(),_screc_isEditable:YES,isLoaded:function(){var b=SC.Record,a=this.get("status");
return !((a===b.EMPTY)||(a===b.BUSY_LOADING)||(a===b.ERROR))}.property("status").cacheable(),relationships:null,attributes:function(){var a=this.get("store"),b=this.storeKey;
return a.readEditableDataHash(b)}.property(),readOnlyAttributes:function(){var a=this.get("store"),c=this.storeKey,b=a.readDataHash(c);
if(b){b=SC.clone(b,YES)}return b}.property(),childRecords:null,childRecordNamespace:null,refresh:function(){this.get("store").refreshRecord(null,null,this.get("storeKey"));
return this},destroy:function(){this.get("store").destroyRecord(null,null,this.get("storeKey"));
this.notifyPropertyChange("status");this.propagateToAggregates();return this},recordDidChange:function(a){this.get("store").recordDidChange(null,null,this.get("storeKey"),a);
this.notifyPropertyChange("status");this.propagateToAggregates();return this},_editLevel:0,beginEditing:function(){this._editLevel++;
return this},endEditing:function(a){if(--this._editLevel<=0){this._editLevel=0;this.recordDidChange(a)
}return this},readAttribute:function(c){var a=this.get("store"),e=this.storeKey;var b=a.readDataHash(e);
return b?b[c]:undefined},writeAttribute:function(c,g,f){var a=this.get("store"),e=this.storeKey,b;
b=a.readEditableDataHash(e);if(!b){throw SC.Record.BAD_STATE_ERROR}if(g!==b[c]){if(!f){this.beginEditing()
}b[c]=g;if(c===this.get("primaryKey")){SC.Store.replaceIdFor(e,g);this.propertyDidChange("id")
}if(!f){this.endEditing(c)}}return this},propagateToAggregates:function(){var p=this.get("storeKey"),e=SC.Store.recordTypeFor(p),n,i,o,b,m;
var h=e.aggregates;if(!h){var g=this.get("store").readDataHash(p);h=[];for(var c in g){if(this[c]&&this[c].get&&this[c].get("aggregate")===YES){h.push(c)
}}e.aggregates=h}var l=SC.Record,a=l.DIRTY,f=l.READY_NEW,q=l.DESTROYED,s=l.READY_CLEAN,j;
j=function(u){var k,t;if(u){k=this.get("status");if((k&a)||(k&f)||(k&q)){t=u.get("status");
if(t===s){u.get("store").recordDidChange(u.constructor,null,u.get("storeKey"),null,YES)
}}}};for(n=0,i=h.length;n<i;++n){o=h[n];b=this.get(o);m=SC.kindOf(b,SC.ManyArray)?b:[b];
m.forEach(j,this)}},storeDidChangeProperties:function(a,b){if(a){this.notifyPropertyChange("status")
}else{if(b){this.beginPropertyChanges();b.forEach(function(f){this.notifyPropertyChange(f)
},this);this.notifyPropertyChange("status");this.endPropertyChanges()}else{this.allPropertiesDidChange()
}var e=this.relationships,c=e?e.length:0;while(--c>=0){e[c].recordPropertyDidChange(b)
}}},normalize:function(f){var k=this.primaryKey,c=this.get("id"),l=this.get("store"),n=this.get("storeKey"),m,i,e,q,h,p,b,a,j,o;
var g=l.readEditableDataHash(n)||{};g[k]=c;q=l.readDataHash(n);for(m in this){i=this[m];
if(i){e=i.typeClass;if(e){o=i.get("key")||m;b=SC.typeOf(e.call(i))===SC.T_CLASS;a=i.isChildRecordTransform;
if(!b&&!a){h=this.get(m);if(h!==undefined||(h===null&&f)){g[o]=h}}else{if(a){h=this.get(m);
if(h&&h.normalize){h.normalize()}}else{if(b){h=q[o];if(h!==undefined){g[o]=h}else{j=i.get("defaultValue");
if(SC.typeOf(j)===SC.T_FUNCTION){g[o]=j(this,m,j)}else{g[o]=j}}}}}}}}return this},unknownProperty:function(b,e){if(e!==undefined){var c=this.get("storeKey"),f=SC.Store.recordTypeFor(c);
if(f.ignoreUnknownProperties===YES){this[b]=e;return e}var a=this.get("primaryKey");
this.writeAttribute(b,e);if(b===a){SC.Store.replaceIdFor(c,e)}}return this.readAttribute(b)
},commitRecord:function(b){var a=this.get("store");a.commitRecord(undefined,undefined,this.get("storeKey"),b);
return this},isError:function(){return this.get("status")&SC.Record.ERROR}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readError(this.get("storeKey"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),set:function(a,c){var b=this[a];if(b&&b.isProperty&&b.get&&!b.get("isEditable")){return this
}return arguments.callee.base.apply(this,arguments)},toString:function(){var a=this.get("store").readDataHash(this.get("storeKey"));
return"%@(%@) %@".fmt(this.constructor.toString(),SC.inspect(a),this.statusString())
},statusString:function(){var b=[],a=this.get("status");for(var c in SC.Record){if(c.match(/[A-Z_]$/)&&SC.Record[c]===a){b.push(c)
}}return b.join(" ")},registerChildRecord:function(g,f){var c=g.primaryKey||"childRecordKey";
var e=f[c];var b=null;var a=this.get("childRecords");if(e&&a){b=a[e]}if(SC.none(b)){b=this.createChildRecord(g,f)
}return b},createChildRecord:function(b,c){var a=null;SC.run(function(){var h=SC.Record._generateChildKey();
c=c||{};var g=b.primaryKey||"childRecordKey";var i=c[g];c[g]=h;var f=this.get("store");
if(SC.none(f)){throw"Error: during the creation of a child record: NO STORE ON PARENT!"
}a=f.createRecord(b,c);a._parentRecord=this;if(this.generateIdForChild){this.generateIdForChild(a)
}var e=this.get("childRecords");if(SC.none(e)){e=SC.Object.create();this.set("childRecords",e)
}e[h]=a},this);return a},generateIdForChild:function(a){}});SC.Record.mixin({ignoreUnknownProperties:NO,CLEAN:1,DIRTY:2,EMPTY:256,ERROR:4096,READY:512,READY_CLEAN:513,READY_DIRTY:514,READY_NEW:515,DESTROYED:1024,DESTROYED_CLEAN:1025,DESTROYED_DIRTY:1026,BUSY:2048,BUSY_LOADING:2052,BUSY_CREATING:2056,BUSY_COMMITTING:2064,BUSY_REFRESH:2080,BUSY_REFRESH_CLEAN:2081,BUSY_REFRESH_DIRTY:2082,BUSY_DESTROYING:2112,BAD_STATE_ERROR:SC.$error("Internal Inconsistency"),RECORD_EXISTS_ERROR:SC.$error("Record Exists"),NOT_FOUND_ERROR:SC.$error("Not found "),BUSY_ERROR:SC.$error("Busy"),GENERIC_ERROR:SC.$error("Generic Error"),_nextChildKey:0,attr:function(a,b){return SC.RecordAttribute.attr(a,b)
},fetch:function(b,a){return SC.FetchedAttribute.attr(b,a)},toMany:function(e,b){b=b||{};
var c=b.nested;var a;if(c){a=SC.ChildrenAttribute.attr(e,b)}else{a=SC.ManyAttribute.attr(e,b)
}return a},toOne:function(e,b){b=b||{};var c=b.nested;var a;if(c){a=SC.ChildAttribute.attr(e,b)
}else{a=SC.SingleAttribute.attr(e,b)}return a},storeKeysById:function(){var b=SC.keyFor("storeKey",SC.guidFor(this)),a=this[b];
if(!a){a=this[b]={}}return a},storeKeyFor:function(c){var b=this.storeKeysById(),a=b[c];
if(!a){a=SC.Store.generateStoreKey();SC.Store.idsByStoreKey[a]=c;SC.Store.recordTypesByStoreKey[a]=this;
b[c]=a}return a},storeKeyExists:function(c){var b=this.storeKeysById(),a=b[c];return a
},find:function(a,b){return a.find(this,b)},extend:function(){var a=SC.Object.extend.apply(this,arguments);
SC.Query._scq_didDefineRecordType(a);return a},_generateChildKey:function(){var a=SC.Record._nextChildKey+1;
SC.Record._nextChildKey=a;return a}});sc_require("data_sources/data_source");sc_require("models/record");
SC.FixturesDataSource=SC.DataSource.extend({simulateRemoteResponse:NO,latency:50,cancel:function(a,b){return NO
},fetch:function(a,b){if(b.get("location")!==SC.Query.LOCAL){throw SC.$error("SC.Fixture data source can only fetch local queries")
}if(!b.get("recordType")&&!b.get("recordTypes")){throw SC.$error("SC.Fixture data source can only fetch queries with one or more record types")
}if(this.get("simulateRemoteResponse")){this.invokeLater(this._fetch,this.get("latency"),a,b)
}else{this._fetch(a,b)}},_fetch:function(a,c){var e=c.get("recordType"),b=c.get("recordTypes")||[e];
b.forEach(function(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)
}if(f){this.loadFixturesFor(a,f)}},this);a.dataSourceDidFetchQuery(c)},retrieveRecords:function(a,c){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._retrieveRecords,e,a,c)
}else{this._retrieveRecords(a,c)}return b},_retrieveRecords:function(a,b){b.forEach(function(e){var c=[],h=SC.Store.recordTypeFor(e),g=a.idFor(e),f=this.fixtureForStoreKey(a,e);
c.push(e);a.dataSourceDidComplete(e,f,g)},this)},updateRecords:function(a,c,f){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._updateRecords,e,a,c)
}else{this._updateRecords(a,c)}return b},_updateRecords:function(a,b){b.forEach(function(c){var e=a.readDataHash(c);
this.setFixtureForStoreKey(a,c,e);a.dataSourceDidComplete(c)},this)},createRecords:function(a,b,e){var c=this.get("latency");
if(this.get("simulateRemoteResponse")){this.invokeLater(this._createRecords,c,a,b)
}else{this._createRecords(a,b)}return YES},_createRecords:function(a,b){b.forEach(function(f){var h=a.idFor(f),g=a.recordTypeFor(f),e=a.readDataHash(f),c=this.fixturesFor(g);
if(!h){h=this.generateIdFor(g,e,a,f)}this._invalidateCachesFor(g,f,h);c[h]=e;a.dataSourceDidComplete(f,null,h)
},this)},destroyRecords:function(a,c,f){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._destroyRecords,e,a,c)
}else{this._destroyRecords(a,c)}return b},_destroyRecords:function(a,b){b.forEach(function(e){var g=a.idFor(e),f=a.recordTypeFor(e),c=this.fixturesFor(f);
this._invalidateCachesFor(f,e,g);if(g){delete c[g]}a.dataSourceDidDestroy(e)},this)
},loadFixturesFor:function(a,h,c){var b=[],f,e,g;f=this.fixturesFor(h);for(e in f){g=h.storeKeyFor(e);
if(a.peekStatus(g)===SC.Record.EMPTY){b.push(f[e])}if(c){c.push(g)}}if(b&&b.length>0){a.loadRecords(h,b)
}return this},generateIdFor:function(e,b,a,c){return"@id%@".fmt(SC.Store.generateStoreKey())
},fixtureForStoreKey:function(a,c){var f=a.idFor(c),e=a.recordTypeFor(c),b=this.fixturesFor(e);
return b?b[f]:null},setFixtureForStoreKey:function(a,e,c){var g=a.idFor(e),f=a.recordTypeFor(e),b=this.fixturesFor(f);
this._invalidateCachesFor(f,e,g);b[g]=c;return this},fixturesFor:function(i){if(!this._fixtures){this._fixtures={}
}var g=this._fixtures[SC.guidFor(i)];if(g){return g}var f=i?i.FIXTURES:null,b=f?f.length:0,c=i?i.prototype.primaryKey:"guid",a,e,h;
this._fixtures[SC.guidFor(i)]=g={};for(a=0;a<b;a++){e=f[a];h=e[c];if(!h){h=this.generateIdFor(i,e)
}g[h]=e}return g},fixturesLoadedFor:function(c){if(!this._fixtures){return NO}var a=[],b=this._fixtures[SC.guidFor(c)];
return b?YES:NO},hasFixturesFor:function(b){var a=NO;b.forEach(function(e){if(a!==SC.MIXED_STATE){var f=SC.Store.recordTypeFor(e),c=f?f.FIXTURES:null;
if(c&&c.length&&c.length>0){if(a===NO){a=YES}}else{if(a===YES){a=SC.MIXED_STATE}}}},this);
return a},_invalidateCachesFor:function(e,b,c){var a=this._storeKeyCache;if(a){delete a[SC.guidFor(e)]
}return this}});SC.Record.fixtures=SC.FixturesDataSource.create();var AuthorFixtures=[{type:"Author",guid:"4995bc373454a",fullName:"Gerry Woolery 4",bookTitle:"The Madness of the Meddler",address:" MIT, 21 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc37345ab",fullName:"Forrest Eggbert 2",bookTitle:"The Night Inferno",address:" Harvard, 86 University Loop, Southampton, UK"},{type:"Author",guid:"4995bc37345c0",fullName:"Dorthy Wilson 4",bookTitle:"The Nightmare of Space",address:" Harvard, 283 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc37345e4",fullName:"Nathan Lineman 4",bookTitle:"The Night of the Ice",address:" College University, 199 First St, Seattle, WA"},{type:"Author",guid:"4995bc3734605",fullName:"Phinehas Laurenzi 3",bookTitle:"The Day Infinity",address:" Foothill College, 144 First St, Wichita, KS"},{type:"Author",guid:"4995bc3734618",fullName:"Avis Cass 3",bookTitle:"Masque of Space",address:" London University, 75 Fifth Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc373462d",fullName:"Everard Richardson 1",bookTitle:"The Day of the Horn",address:" London University, 265 Lazaneo St, New York, NY"},{type:"Author",guid:"4995bc3734641",fullName:"Su Strickland 2",bookTitle:"The Day Ambassador",address:" Santa Clara University, 461 Dana St, Los Angeles, CA"},{type:"Author",guid:"4995bc3734655",fullName:"Patton Kooser 2",bookTitle:"The Ultimate Seed",address:" London University, 235 Van Ness Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc373466e",fullName:"Janelle Howard 3",bookTitle:"The Fury Massacre",address:" Springfield University, 411 Main St, Southampton, UK"},{type:"Author",guid:"4995bc3734685",fullName:"Eliza Ropes 2",bookTitle:"The Fear Robots",address:" Foothill College, 386 Broadway Blvd, Ann Arbor, MI"},{type:"Author",guid:"4995bc373469a",fullName:"Alisya Drennan 2",bookTitle:"The Fear Paradise",address:" University of Southampton, 282 Elm St, Santa Clara, CA"},{type:"Author",guid:"4995bc37346b1",fullName:"Lori Magor 4",bookTitle:"The Madness Attack",address:" MIT, 429 Dana St, San Francisco, CA"},{type:"Author",guid:"4995bc37346c4",fullName:"Amethyst Evans 4",bookTitle:"The Fear of the Thieves",address:" London University, 309 Main St, Cupertino, CA"},{type:"Author",guid:"4995bc37346d8",fullName:"Ridley Ewing 2",bookTitle:"The Killer Angel",address:" New York University, 470 Broadway Blvd, New York, NY"},{type:"Author",guid:"4995bc37346ef",fullName:"Sloane Moulton 1",bookTitle:"The Dead of Time",address:" Springfield University, 1 Dana St, Southampton, UK"},{type:"Author",guid:"4995bc3734704",fullName:"Marquis Fuchs 3",bookTitle:"The Seeds of Menace",address:" CalTech, 348 Fifth Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3734718",fullName:"August Feufer 4",bookTitle:"The Fangs",address:" CalTech, 244 Broadway Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc373472c",fullName:"Alix Rifler 1",bookTitle:"The Day Whisper",address:" Santa Clara University, 368 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3734740",fullName:"Virgil Pinney 3",bookTitle:"The Death of the Hive",address:" College University, 452 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc373475d",fullName:"Carin Burnett 4",bookTitle:"The Space of the Mist",address:" Michigan State University, 331 University Loop, Santa Clara, CA"},{type:"Author",guid:"4995bc3734774",fullName:"Matty Cypret 2",bookTitle:"Crater of Day",address:" London University, 37 Broadway Blvd, Seattle, WA"},{type:"Author",guid:"4995bc3734794",fullName:"Matilda Rockwell 3",bookTitle:"The Pirate Masters",address:" CalTech, 487 Bloom St, Cambridge, MA"},{type:"Author",guid:"4995bc37347b0",fullName:"Luann Garneis 1",bookTitle:"The Day of the Keys",address:" Springfield University, 418 Dana St, New York, NY"},{type:"Author",guid:"4995bc37347c4",fullName:"Alysha Fox 1",bookTitle:"The Death Face",address:" Springfield University, 423 Castro St, Southampton, UK"},{type:"Author",guid:"4995bc37347d9",fullName:"Clifford Dugger 3",bookTitle:"The Ultimate Inferno",address:" MIT, 478 Lazaneo St, San Francisco, CA"},{type:"Author",guid:"4995bc37347ec",fullName:"Christianne Taggart 3",bookTitle:"The Curse of Day",address:" Stanford University, 83 Lazaneo St, Cambridge, MA"},{type:"Author",guid:"4995bc373480b",fullName:"Kestrel Nehling 2",bookTitle:"The Machines History",address:" Santa Clara University, 296 Bloom St, Ann Arbor, MI"},{type:"Author",guid:"4995bc373481f",fullName:"Mackenzie Pittman 1",bookTitle:"Cave of Night",address:" New York University, 489 Elm St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734833",fullName:"Sheila Ammons 4",bookTitle:"Robots of Menace",address:" Harvard, 211 Second St, Cambridge, MA"},{type:"Author",guid:"4995bc3734847",fullName:"September Glover 4",bookTitle:"The Illusion Carnival",address:" London University, 370 Fifth Ave, New York, NY"},{type:"Author",guid:"4995bc3734863",fullName:"Porsche Gilman 1",bookTitle:"The Seeds of Menace",address:" Michigan State University, 1 Fifth Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3734875",fullName:"Vance Jolce 1",bookTitle:"The Final Time",address:" CalTech, 364 University Loop, London, UK"},{type:"Author",guid:"4995bc373488a",fullName:"Clifford Dugger 4",bookTitle:"Dreams of Menace",address:" Springfield University, 211 First St, New York, NY"},{type:"Author",guid:"4995bc373489e",fullName:"Zander Pershing 1",bookTitle:"Killer of Menace",address:" Harvard, 464 Dana St, London, UK"},{type:"Author",guid:"4995bc37348b2",fullName:"Joye Eisenman 3",bookTitle:"The Whisper Faces",address:" College University, 171 Lazaneo St, St. Louis, MO"},{type:"Author",guid:"4995bc37348c5",fullName:"Phyliss Saylor 3",bookTitle:"The Fury Secret",address:" London University, 443 Dana St, St. Louis, MO"},{type:"Author",guid:"4995bc37348e1",fullName:"Duke Rosenstiehl 1",bookTitle:"The Time Fangs",address:" CalTech, 28 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc37348f3",fullName:"Silvester Mcfall 3",bookTitle:"Whispers of Madness",address:" MIT, 217 First St, Cambridge, MA"},{type:"Author",guid:"4995bc3734909",fullName:"Branda Wood 1",bookTitle:"The Inferno",address:" London University, 120 University Loop, Wichita, KS"},{type:"Author",guid:"4995bc373491d",fullName:"Em Leichter 1",bookTitle:"The Day of the Massacre",address:" CalTech, 113 Castro St, Wichita, KS"},{type:"Author",guid:"4995bc3734931",fullName:"Bonita Downing 4",bookTitle:"Minds of Fury",address:" Santa Clara University, 64 University Loop, London, UK"},{type:"Author",guid:"4995bc3734944",fullName:"Norm Burns 4",bookTitle:"The Machines Mists",address:" UC Santa Cruz, 27 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc373495f",fullName:"Victor Painter 3",bookTitle:"The Laboratory",address:" MIT, 5 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc3734974",fullName:"Lalla Haverrman 2",bookTitle:"Planet of Death",address:" University of Southampton, 60 Oak Ave, London, UK"},{type:"Author",guid:"4995bc3734988",fullName:"Jeri Stroh 3",bookTitle:"The Meddler",address:" London University, 390 Oak Ave, Southampton, UK"},{type:"Author",guid:"4995bc373499c",fullName:"Raynard Peters 1",bookTitle:"The Horror of the Minds",address:" Michigan State University, 186 Van Ness Blvd, New York, NY"},{type:"Author",guid:"4995bc37349bb",fullName:"Buck Eisaman 3",bookTitle:"Future of Night",address:" New York University, 470 First St, Southampton, UK"},{type:"Author",guid:"4995bc37349d8",fullName:"Annie Surrency 3",bookTitle:"The Menace Androids",address:" Foothill College, 192 Bloom St, Southampton, UK"},{type:"Author",guid:"4995bc37349f3",fullName:"Ashlie Newman 4",bookTitle:"The Horror Key",address:" MIT, 106 First St, Cupertino, CA"},{type:"Author",guid:"4995bc3734a07",fullName:"Mabelle Staymates 2",bookTitle:"The Riders of Death",address:" Foothill College, 42 Broadway Blvd, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734a22",fullName:"Eveleen Mixey 3",bookTitle:"The Doom of the Jaws",address:" New York University, 218 University Loop, Los Angeles, CA"},{type:"Author",guid:"4995bc3734a5f",fullName:"Anneka Gist 3",bookTitle:"Ark of Space",address:" London University, 301 Van Ness Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc3734a75",fullName:"Avis Cass 3",bookTitle:"The Doomed Pit",address:" Foothill College, 40 Second St, Seattle, WA"},{type:"Author",guid:"4995bc3734a89",fullName:"Cedar Garry 3",bookTitle:"The Death Dead",address:" University of Southampton, 206 Bloom St, Palo Alto, CA"},{type:"Author",guid:"4995bc3734aa3",fullName:"Kezia Henry 1",bookTitle:"The Operation",address:" MIT, 294 First St, New York, NY"},{type:"Author",guid:"4995bc3734ab8",fullName:"Lindsey Straub 3",bookTitle:"The Fury of the Angel",address:" Stanford University, 11 Dana St, Cambridge, MA"},{type:"Author",guid:"4995bc3734aca",fullName:"Cornell Siegrist 1",bookTitle:"The Ghost",address:" College University, 310 Second St, Southampton, UK"},{type:"Author",guid:"4995bc3734ae5",fullName:"Raine Warrick 2",bookTitle:"The Menace Myth",address:" Springfield University, 360 University Loop, San Francisco, CA"},{type:"Author",guid:"4995bc3734af9",fullName:"Marci Caesar 2",bookTitle:"Fangs of Fury",address:" Santa Clara University, 486 Main St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734b0d",fullName:"Hewie Rose 2",bookTitle:"Mirror of Night",address:" CalTech, 419 Elm St, Wichita, KS"},{type:"Author",guid:"4995bc3734b26",fullName:"Titania Tilton 3",bookTitle:"The Day of the Mists",address:" Michigan State University, 251 Main St, Los Angeles, CA"},{type:"Author",guid:"4995bc3734b3b",fullName:"Amyas Hice 1",bookTitle:"City of Menace",address:" Santa Clara University, 380 Lazaneo St, San Francisco, CA"},{type:"Author",guid:"4995bc3734b5c",fullName:"Lyric Richards 1",bookTitle:"The Impossible Doors",address:" MIT, 412 Elm St, Cambridge, MA"},{type:"Author",guid:"4995bc3734b6f",fullName:"Lianne Kemble 4",bookTitle:"The Mind Massacre",address:" Harvard, 318 Fifth Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734b83",fullName:"Gabe Milliron 4",bookTitle:"The Carnival",address:" MIT, 187 Second St, Los Angeles, CA"},{type:"Author",guid:"4995bc3734b97",fullName:"Willis Costello 4",bookTitle:"The Night of the Bandits",address:" Michigan State University, 114 Elm St, Cambridge, MA"},{type:"Author",guid:"4995bc3734bb6",fullName:"Lottie Sherlock 3",bookTitle:"The Space Skull",address:" Foothill College, 165 Main St, Cambridge, MA"},{type:"Author",guid:"4995bc3734bc8",fullName:"Frieda Wade 2",bookTitle:"The Operation",address:" Santa Clara University, 179 University Loop, Cupertino, CA"},{type:"Author",guid:"4995bc3734bde",fullName:"Chip Haynes 1",bookTitle:"The Robot of Night",address:" Foothill College, 258 First St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734bf2",fullName:"Denzel Buehler 3",bookTitle:"The Night of the Brides",address:" Michigan State University, 138 First St, Cambridge, MA"},{type:"Author",guid:"4995bc3734c0e",fullName:"Kaelee Johnson 3",bookTitle:"The Evil Invasion",address:" MIT, 121 Fifth Ave, Southampton, UK"},{type:"Author",guid:"4995bc3734c25",fullName:"Prissy Cressman 1",bookTitle:"Monster of Day",address:" CalTech, 53 Second St, Los Angeles, CA"},{type:"Author",guid:"4995bc3734c38",fullName:"Anne Roadman 4",bookTitle:"The Meddler of Fear",address:" MIT, 374 Broadway Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3734c57",fullName:"Stacy Moffat 3",bookTitle:"The Menace Mist",address:" University of Southampton, 42 Second St, London, UK"},{type:"Author",guid:"4995bc3734c6b",fullName:"Jerold Jenkins 3",bookTitle:"The Thieves of Time",address:" London University, 188 Broadway Blvd, London, UK"},{type:"Author",guid:"4995bc3734c7f",fullName:"Berniece Berry 2",bookTitle:"The Illusion Ark",address:" College University, 148 Second St, Palo Alto, CA"},{type:"Author",guid:"4995bc3734c92",fullName:"Tim Beck 3",bookTitle:"The Warrior",address:" New York University, 47 Broadway Blvd, London, UK"},{type:"Author",guid:"4995bc3734cad",fullName:"Alexis Weisgarber 1",bookTitle:"The Space of the Crater",address:" Harvard, 47 Elm St, Palo Alto, CA"},{type:"Author",guid:"4995bc3734cc0",fullName:"Levi Wilkinson 1",bookTitle:"The Ambassador of Horror",address:" UC Santa Cruz, 34 Lazaneo St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734cd4",fullName:"Bailey Lauffer 3",bookTitle:"Fury of Doom",address:" New York University, 227 Castro St, Santa Clara, CA"},{type:"Author",guid:"4995bc3734ce7",fullName:"Gerry Woolery 1",bookTitle:"The Menace of the Computers",address:" Springfield University, 8 Main St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734cfb",fullName:"Hale Alliman 2",bookTitle:"The Paradise of Death",address:" Santa Clara University, 21 University Loop, Cupertino, CA"},{type:"Author",guid:"4995bc3734d0f",fullName:"Everard Richardson 2",bookTitle:"The Skull",address:" Santa Clara University, 391 Elm St, Cupertino, CA"},{type:"Author",guid:"4995bc3734d2c",fullName:"Tammie Crawford 1",bookTitle:"The Empty Runaway",address:" Michigan State University, 155 Van Ness Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc3734d3f",fullName:"Xavier Porter 3",bookTitle:"The Resurrection of Death",address:" Springfield University, 187 Lazaneo St, Palo Alto, CA"},{type:"Author",guid:"4995bc3734d53",fullName:"Alec Owens 3",bookTitle:"The Madness of the History",address:" New York University, 385 University Loop, St. Louis, MO"},{type:"Author",guid:"4995bc3734d67",fullName:"Jancis Busk 2",bookTitle:"The Mind Seed",address:" Harvard, 49 Main St, Santa Clara, CA"},{type:"Author",guid:"4995bc3734d7b",fullName:"Daffodil Harper 1",bookTitle:"Monster of Day",address:" Michigan State University, 254 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3734d8f",fullName:"Davey Moore 2",bookTitle:"Ghost of Fury",address:" Harvard, 160 Broadway Blvd, Cupertino, CA"},{type:"Author",guid:"4995bc3734dca",fullName:"Ridley Ewing 3",bookTitle:"The Fear Awakening",address:" College University, 86 Lazaneo St, San Francisco, CA"},{type:"Author",guid:"4995bc3734dde",fullName:"Loreto Isemann 1",bookTitle:"The Madness Night",address:" Foothill College, 496 Van Ness Blvd, Wichita, KS"},{type:"Author",guid:"4995bc3734df2",fullName:"Deshawn Pyle 4",bookTitle:"Suns of Time",address:" Santa Clara University, 271 Fifth Ave, Southampton, UK"},{type:"Author",guid:"4995bc3734e07",fullName:"Hailey Berkheimer 3",bookTitle:"The Time Smuggler",address:" Stanford University, 345 Main St, St. Louis, MO"},{type:"Author",guid:"4995bc3734e51",fullName:" 3",bookTitle:"The Menace Nightmares",address:" Stanford University, 346 Main St, Santa Clara, CA"},{type:"Author",guid:"4995bc3734e74",fullName:"Simona Craig 2",bookTitle:"The Horror of the Ice",address:" Michigan State University, 47 Bloom St, Cambridge, MA"},{type:"Author",guid:"4995bc3734e89",fullName:"Peta Filby 1",bookTitle:"Masque of Space",address:" Santa Clara University, 95 Broadway Blvd, Wichita, KS"},{type:"Author",guid:"4995bc3734ea6",fullName:"Kathi Williams 4",bookTitle:"Madness of Death",address:" Springfield University, 307 Second St, San Francisco, CA"},{type:"Author",guid:"4995bc3734eba",fullName:"Barret Lalty 1",bookTitle:"The Space of the Mirror",address:" University of Southampton, 287 Fifth Ave, St. Louis, MO"},{type:"Author",guid:"4995bc3734ed9",fullName:"Russ Nicola 4",bookTitle:"The Bride of Horror",address:" University of Southampton, 270 Elm St, Cupertino, CA"},{type:"Author",guid:"4995bc3734eed",fullName:"Maya Schrader 2",bookTitle:"The Terrible Sea",address:" College University, 206 First St, London, UK"},{type:"Author",guid:"4995bc3734f01",fullName:"Hazel Holts 1",bookTitle:"The Carnival",address:" CalTech, 65 University Loop, London, UK"},{type:"Author",guid:"4995bc3734f26",fullName:"Saffron Elinor 3",bookTitle:"The Seeds of Menace",address:" Springfield University, 462 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc3734f39",fullName:"Tiger Whitling 2",bookTitle:"The Night of the Brides",address:" MIT, 139 Castro St, Palo Alto, CA"},{type:"Author",guid:"4995bc3734f4e",fullName:"Rolph Burris 4",bookTitle:"The Horror Power",address:" Harvard, 418 Second St, London, UK"},{type:"Author",guid:"4995bc3734f61",fullName:"Mark Wheeler 1",bookTitle:"The Horror Key",address:" University of Southampton, 441 Bloom St, New York, NY"},{type:"Author",guid:"4995bc3734f75",fullName:"Wenona Tennant 2",bookTitle:"The Men",address:" Stanford University, 122 Main St, New York, NY"},{type:"Author",guid:"4995bc3734f89",fullName:"Callista Bishop 1",bookTitle:"The Pirate Masters",address:" UC Santa Cruz, 127 Main St, Cambridge, MA"},{type:"Author",guid:"4995bc3734fa4",fullName:"Cecil Rodacker 2",bookTitle:"The Fury of the Wings",address:" MIT, 499 Fifth Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3734fb7",fullName:"Liliana Northey 4",bookTitle:"The Fear Awakening",address:" Harvard, 185 First St, Cambridge, MA"},{type:"Author",guid:"4995bc3734fcb",fullName:"Webster Jelliman 1",bookTitle:"The Talons of Day",address:" University of Southampton, 472 Lazaneo St, Los Angeles, CA"},{type:"Author",guid:"4995bc3734fdf",fullName:"Loreen Buck 4",bookTitle:"The Masque of Doom",address:" UC Santa Cruz, 122 Broadway Blvd, Cupertino, CA"},{type:"Author",guid:"4995bc3734ff3",fullName:"Keisha Klockman 2",bookTitle:"The Ice Web",address:" MIT, 88 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc3735006",fullName:"Bennett Little 1",bookTitle:"Revelation of Menace",address:" UC Santa Cruz, 118 University Loop, Palo Alto, CA"},{type:"Author",guid:"4995bc3735022",fullName:"Louis Waldron 1",bookTitle:"The Mountain Suns",address:" CalTech, 79 First St, San Francisco, CA"},{type:"Author",guid:"4995bc3735034",fullName:"Sophia Spring 1",bookTitle:"The Death of the Nightmares",address:" Santa Clara University, 450 First St, San Francisco, CA"},{type:"Author",guid:"4995bc3735048",fullName:"Joscelin Nash 3",bookTitle:"The Day Monster",address:" Santa Clara University, 191 Lazaneo St, St. Louis, MO"},{type:"Author",guid:"4995bc373505c",fullName:"Porsche Gilman 1",bookTitle:"Robots of Night",address:" CalTech, 338 First St, St. Louis, MO"},{type:"Author",guid:"4995bc3735070",fullName:"Deshawn Pyle 4",bookTitle:"The Space Brides",address:" Michigan State University, 204 Second St, Southampton, UK"},{type:"Author",guid:"4995bc3735084",fullName:"Galen Flanders 2",bookTitle:"The Secret Devils",address:" CalTech, 219 Castro St, Palo Alto, CA"},{type:"Author",guid:"4995bc37350a5",fullName:"Lonnie Linton 3",bookTitle:"The Armageddon",address:" London University, 214 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc37350ba",fullName:"Melvin Wilkerson 4",bookTitle:"The Space Reign",address:" Harvard, 71 Bloom St, San Francisco, CA"},{type:"Author",guid:"4995bc37350d0",fullName:"Eleanor Bennett 4",bookTitle:"Runaway of Death",address:" Harvard, 148 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc37350e4",fullName:"Fawn Carr 3",bookTitle:"The Warrior of Menace",address:" Springfield University, 202 Oak Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc37350f8",fullName:"Linsay Mcmullen 4",bookTitle:"The Doom Masters",address:" Harvard, 116 First St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735110",fullName:"Amyas Hice 4",bookTitle:"The Space Skull",address:" College University, 6 Fifth Ave, St. Louis, MO"},{type:"Author",guid:"4995bc3735123",fullName:"Monty Kava 4",bookTitle:"The Day Ice",address:" Santa Clara University, 175 Elm St, Cambridge, MA"},{type:"Author",guid:"4995bc3735138",fullName:"Brock Young 4",bookTitle:"The Killer Sound",address:" College University, 414 University Loop, Southampton, UK"},{type:"Author",guid:"4995bc373514c",fullName:"Belinda Alice 3",bookTitle:"The Deadly Memories",address:" UC Santa Cruz, 172 Elm St, Wichita, KS"},{type:"Author",guid:"4995bc3735160",fullName:"Marlene Agnes 4",bookTitle:"The Death Creature",address:" CalTech, 291 Van Ness Blvd, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735174",fullName:"Godric Sommer 3",bookTitle:"The Fury Infinity",address:" CalTech, 290 Oak Ave, Southampton, UK"},{type:"Author",guid:"4995bc373518d",fullName:"Janis Bullard 2",bookTitle:"The Wings",address:" Foothill College, 265 Van Ness Blvd, Southampton, UK"},{type:"Author",guid:"4995bc37351a3",fullName:"Pamella Mckee 3",bookTitle:"The Children of Madness",address:" London University, 273 Broadway Blvd, London, UK"},{type:"Author",guid:"4995bc37351c8",fullName:"Prince Demuth 4",bookTitle:"The Riders",address:" Michigan State University, 193 Main St, St. Louis, MO"},{type:"Author",guid:"4995bc37351dc",fullName:"Kristal Young 2",bookTitle:"The Pirate Nightmares",address:" Foothill College, 354 Castro St, St. Louis, MO"},{type:"Author",guid:"4995bc37351ef",fullName:"Osmund Pritchard 1",bookTitle:"The Time Suns",address:" University of Southampton, 250 Dana St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735209",fullName:"Jazmine Adams 3",bookTitle:"The Day of the Computers",address:" Stanford University, 340 Van Ness Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc3735221",fullName:"Rose Mays 3",bookTitle:"Meddler of Space",address:" UC Santa Cruz, 409 Bloom St, Los Angeles, CA"},{type:"Author",guid:"4995bc373523f",fullName:"Rylee Fiddler 2",bookTitle:"Masque of Space",address:" UC Santa Cruz, 413 Fifth Ave, Wichita, KS"},{type:"Author",guid:"4995bc3735253",fullName:"Meg Coveney 1",bookTitle:"Devils of Fury",address:" MIT, 446 Oak Ave, Southampton, UK"},{type:"Author",guid:"4995bc3735267",fullName:"Pamelia Mang 4",bookTitle:"The Time of the Pyramid",address:" New York University, 131 Main St, Cupertino, CA"},{type:"Author",guid:"4995bc373527b",fullName:"Raphael Wilks 4",bookTitle:"Ark of Day",address:" Foothill College, 44 Fifth Ave, Cambridge, MA"},{type:"Author",guid:"4995bc373529a",fullName:"Matilda Rockwell 4",bookTitle:"The Time Smugglers",address:" Michigan State University, 135 Van Ness Blvd, Ann Arbor, MI"},{type:"Author",guid:"4995bc37352ae",fullName:"Duke Rosenstiehl 1",bookTitle:"Mist of Death",address:" Santa Clara University, 160 First St, Ann Arbor, MI"},{type:"Author",guid:"4995bc37352cf",fullName:"Effie Greenwood 2",bookTitle:"The Fury Mist",address:" UC Santa Cruz, 288 Main St, Santa Clara, CA"},{type:"Author",guid:"4995bc37352e3",fullName:"Kathy Huston 4",bookTitle:"History of Doom",address:" Harvard, 299 Bloom St, Cupertino, CA"},{type:"Author",guid:"4995bc37352f6",fullName:"Rina Prescott 1",bookTitle:"The Children of Madness",address:" College University, 458 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735319",fullName:"Raven Pirl 4",bookTitle:"Smugglers of Night",address:" UC Santa Cruz, 467 Main St, St. Louis, MO"},{type:"Author",guid:"4995bc373532c",fullName:"Xavier Porter 2",bookTitle:"The Robot of Night",address:" University of Southampton, 52 Lazaneo St, London, UK"},{type:"Author",guid:"4995bc373533f",fullName:"Lianne Kemble 1",bookTitle:"The Seeds",address:" College University, 482 Castro St, Cupertino, CA"},{type:"Author",guid:"4995bc3735353",fullName:"Byrne Bruxner 1",bookTitle:"The Long Suns",address:" CalTech, 238 Dana St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735367",fullName:"Byrne Bruxner 3",bookTitle:"The Wings",address:" New York University, 331 Van Ness Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc373537a",fullName:"Fawn Carr 4",bookTitle:"The Laboratory",address:" CalTech, 237 Fifth Ave, London, UK"},{type:"Author",guid:"4995bc3735398",fullName:"Alyx Hincken 2",bookTitle:"The Revelation",address:" CalTech, 41 First St, Palo Alto, CA"},{type:"Author",guid:"4995bc37353aa",fullName:"Xerxes Newbern 1",bookTitle:"The Ghost",address:" Stanford University, 424 Van Ness Blvd, Southampton, UK"},{type:"Author",guid:"4995bc37353c0",fullName:"Alton Saline 3",bookTitle:"The Space of the Leisure",address:" London University, 102 Bloom St, London, UK"},{type:"Author",guid:"4995bc37353d3",fullName:"Lina Sanborn 1",bookTitle:"The Night Caves",address:" Michigan State University, 79 Second St, Ann Arbor, MI"},{type:"Author",guid:"4995bc37353e7",fullName:"Laura Herrold 3",bookTitle:"The Runaway Gods",address:" College University, 476 Dana St, Ann Arbor, MI"},{type:"Author",guid:"4995bc37353fb",fullName:"Maximilian Wolfe 1",bookTitle:"The Doom Meddler",address:" Stanford University, 400 Lazaneo St, Santa Clara, CA"},{type:"Author",guid:"4995bc3735418",fullName:"Ben Lombardi 3",bookTitle:"The Day",address:" College University, 139 Bloom St, St. Louis, MO"},{type:"Author",guid:"4995bc373543d",fullName:"Tiger Whitling 4",bookTitle:"The Fury Sea",address:" MIT, 55 Second St, St. Louis, MO"},{type:"Author",guid:"4995bc3735450",fullName:"Nena Davis 1",bookTitle:"The Operation of Menace",address:" University of Southampton, 2 First St, Cambridge, MA"},{type:"Author",guid:"4995bc3735464",fullName:"Luther Johnston 3",bookTitle:"The Keeper of Space",address:" Foothill College, 76 University Loop, San Francisco, CA"},{type:"Author",guid:"4995bc373547e",fullName:"Rikki Graham 3",bookTitle:"The Devil",address:" Foothill College, 322 Castro St, Cupertino, CA"},{type:"Author",guid:"4995bc3735493",fullName:"Alec Owens 1",bookTitle:"The Hive of Doom",address:" Michigan State University, 448 Bloom St, Wichita, KS"},{type:"Author",guid:"4995bc37354b2",fullName:"Lettie Roberts 3",bookTitle:"Dead of Time",address:" Stanford University, 152 Second St, Southampton, UK"},{type:"Author",guid:"4995bc37354c5",fullName:"Amalia Grant 2",bookTitle:"The Talons of Day",address:" University of Southampton, 42 Oak Ave, New York, NY"},{type:"Author",guid:"4995bc37354d9",fullName:"Brady Smail 2",bookTitle:"The Horror Visitor",address:" University of Southampton, 350 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc37354ed",fullName:"Lori Magor 2",bookTitle:"The Ultimate Seed",address:" London University, 397 Main St, Cambridge, MA"},{type:"Author",guid:"4995bc373550f",fullName:"Jewel Mortland 2",bookTitle:"The Horror of the Ragnarok",address:" College University, 46 Elm St, St. Louis, MO"},{type:"Author",guid:"4995bc3735538",fullName:"Kaitlyn Paul 1",bookTitle:"The Memories",address:" New York University, 489 Lazaneo St, Los Angeles, CA"},{type:"Author",guid:"4995bc373554e",fullName:"Aletha Lambert 1",bookTitle:"The Horror of the Universe",address:" Stanford University, 425 Van Ness Blvd, Los Angeles, CA"},{type:"Author",guid:"4995bc3735563",fullName:"Lela Warner 2",bookTitle:"The Menace of the Anvil",address:" CalTech, 430 Fifth Ave, Seattle, WA"},{type:"Author",guid:"4995bc3735578",fullName:"Brandi Bauerle 4",bookTitle:"The Fear of the Key",address:" College University, 485 Elm St, San Francisco, CA"},{type:"Author",guid:"4995bc373558c",fullName:"Marva Wise 4",bookTitle:"The Meddler",address:" Stanford University, 388 Second St, Cupertino, CA"},{type:"Author",guid:"4995bc373559e",fullName:"Seymour Fischer 1",bookTitle:"The Rock",address:" Springfield University, 375 First St, San Francisco, CA"},{type:"Author",guid:"4995bc37355b2",fullName:"Honor Simmons 3",bookTitle:"The Menace Mist",address:" CalTech, 179 Broadway Blvd, San Francisco, CA"},{type:"Author",guid:"4995bc37355c7",fullName:"Sarah Chapman 1",bookTitle:"The Day Androids",address:" UC Santa Cruz, 317 Dana St, Cupertino, CA"},{type:"Author",guid:"4995bc37355db",fullName:"Suzanna Neely 1",bookTitle:"The Secret Devils",address:" CalTech, 201 Main St, New York, NY"},{type:"Author",guid:"4995bc37355ee",fullName:"Wil Hoffhants 2",bookTitle:"The Empty Machines",address:" UC Santa Cruz, 446 Bloom St, San Francisco, CA"},{type:"Author",guid:"4995bc3735602",fullName:"Ridley Ewing 4",bookTitle:"The Ghost of Menace",address:" College University, 252 Broadway Blvd, Southampton, UK"},{type:"Author",guid:"4995bc3735616",fullName:"Rodge Catherina 2",bookTitle:"The Empty Herald",address:" Michigan State University, 367 Van Ness Blvd, Palo Alto, CA"},{type:"Author",guid:"4995bc373562a",fullName:"Brady Smail 1",bookTitle:"The Day Ice",address:" London University, 426 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc373563e",fullName:"Antony Stern 4",bookTitle:"Reign of Night",address:" University of Southampton, 6 Van Ness Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3735652",fullName:"Loreen Buck 1",bookTitle:"The Day Whisper",address:" Michigan State University, 47 Main St, Palo Alto, CA"},{type:"Author",guid:"4995bc3735666",fullName:"Melita Barkley 1",bookTitle:"The Meddler of Fear",address:" CalTech, 328 Lazaneo St, Cambridge, MA"},{type:"Author",guid:"4995bc373567a",fullName:"Kerensa Benford 2",bookTitle:"The Menace of the Ghosts",address:" New York University, 411 Elm St, Seattle, WA"},{type:"Author",guid:"4995bc373568e",fullName:"Prue Putnam 2",bookTitle:"The Doom of the Night",address:" College University, 340 Oak Ave, Southampton, UK"},{type:"Author",guid:"4995bc37356aa",fullName:"Rosaleen Mench 3",bookTitle:"The Devil",address:" College University, 266 First St, Palo Alto, CA"},{type:"Author",guid:"4995bc37356bc",fullName:"Washington Rummel 4",bookTitle:"Man of Madness",address:" College University, 54 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc37356d0",fullName:"Leyton Jyllian 1",bookTitle:"The Menace of the Computers",address:" Springfield University, 432 First St, St. Louis, MO"},{type:"Author",guid:"4995bc37356e4",fullName:"Perce Pennington 3",bookTitle:"The Seventh Child",address:" College University, 178 Oak Ave, London, UK"},{type:"Author",guid:"4995bc37356f8",fullName:"Sabrina Beedell 3",bookTitle:"Runaway of Death",address:" Stanford University, 105 Lazaneo St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735713",fullName:"Mckenzie Carden 2",bookTitle:"The Universe",address:" Springfield University, 436 Broadway Blvd, Palo Alto, CA"},{type:"Author",guid:"4995bc3735728",fullName:"Ginny Finlay 2",bookTitle:"The Doom of the Massacre",address:" Foothill College, 56 Broadway Blvd, Wichita, KS"},{type:"Author",guid:"4995bc373573c",fullName:"Fox Omara 4",bookTitle:"The Madness Horns",address:" Foothill College, 239 Fifth Ave, London, UK"},{type:"Author",guid:"4995bc373574f",fullName:"Cherice Blatenberger 2",bookTitle:"The Claws of Fury",address:" Harvard, 235 Van Ness Blvd, Cupertino, CA"},{type:"Author",guid:"4995bc3735763",fullName:"Harriette Alington 4",bookTitle:"The Whispers",address:" College University, 203 Lazaneo St, Wichita, KS"},{type:"Author",guid:"4995bc3735777",fullName:"Eldon Ream 2",bookTitle:"The Revelation",address:" University of Southampton, 97 Broadway Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc373578b",fullName:"Ambrosine Echard 4",bookTitle:"The Android of Madness",address:" University of Southampton, 133 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc373579f",fullName:"Bekki Blunt 4",bookTitle:"Evil of Fury",address:" Springfield University, 236 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc37357b2",fullName:"Zena Giesler 1",bookTitle:"The Terrible Ghosts",address:" Foothill College, 228 Bloom St, Santa Clara, CA"},{type:"Author",guid:"4995bc37357c6",fullName:"Lalo Pery 4",bookTitle:"The Fury of the Devils",address:" Michigan State University, 39 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc37357da",fullName:"Rowina Bicknell 2",bookTitle:"Evil of Fury",address:" University of Southampton, 471 Second St, Santa Clara, CA"},{type:"Author",guid:"4995bc37357ee",fullName:"Candis Kanaga 4",bookTitle:"The Operation",address:" UC Santa Cruz, 11 Bloom St, London, UK"},{type:"Author",guid:"4995bc3735802",fullName:"Jess Richter 4",bookTitle:"The Bride of Fury",address:" MIT, 91 University Loop, Seattle, WA"},{type:"Author",guid:"4995bc3735816",fullName:"Elfreda Vanleer 1",bookTitle:"The Madness of the Face",address:" College University, 147 Main St, Cupertino, CA"},{type:"Author",guid:"4995bc373582a",fullName:"Rolo Orner 1",bookTitle:"The Dead Sea",address:" London University, 475 Dana St, St. Louis, MO"},{type:"Author",guid:"4995bc373583e",fullName:"Lottie Sherlock 1",bookTitle:"The Robbers",address:" Michigan State University, 306 Van Ness Blvd, New York, NY"},{type:"Author",guid:"4995bc3735851",fullName:"Shyla Clarke 3",bookTitle:"The Attack",address:" College University, 299 Dana St, Cupertino, CA"},{type:"Author",guid:"4995bc3735865",fullName:"Bethany Veith 3",bookTitle:"The Secret Pyramids",address:" Harvard, 248 Fifth Ave, Wichita, KS"},{type:"Author",guid:"4995bc3735879",fullName:"Bertha Jesse 3",bookTitle:"The Space of the Pit",address:" Harvard, 364 University Loop, London, UK"},{type:"Author",guid:"4995bc373588d",fullName:"Marylou Frankenberger 1",bookTitle:"The Time Keys",address:" College University, 322 Elm St, Cambridge, MA"},{type:"Author",guid:"4995bc37358a1",fullName:"Roderick Powell 3",bookTitle:"The Inferno of Death",address:" University of Southampton, 266 Main St, St. Louis, MO"},{type:"Author",guid:"4995bc37358b5",fullName:"Maureen Leach 3",bookTitle:"The Unearthly Assassin",address:" Santa Clara University, 170 Bloom St, Cupertino, CA"},{type:"Author",guid:"4995bc37358c8",fullName:"Jaclyn Stiffey 1",bookTitle:"Dominator of Death",address:" Harvard, 236 Second St, Palo Alto, CA"},{type:"Author",guid:"4995bc37358dc",fullName:"Lindsey Straub 3",bookTitle:"The Decay of Space",address:" UC Santa Cruz, 155 Castro St, Cambridge, MA"},{type:"Author",guid:"4995bc37358f7",fullName:"Lyric Richards 1",bookTitle:"The Paradise of Menace",address:" Foothill College, 293 Elm St, Santa Clara, CA"},{type:"Author",guid:"4995bc373590b",fullName:"Allycia Mackendrick 1",bookTitle:"The Long Suns",address:" Santa Clara University, 449 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc373591f",fullName:"James Buzzard 2",bookTitle:"The Death of the Thieves",address:" University of Southampton, 341 Oak Ave, San Francisco, CA"},{type:"Author",guid:"4995bc3735933",fullName:"Pamelia Mang 2",bookTitle:"The Masque of Doom",address:" Santa Clara University, 411 University Loop, Southampton, UK"},{type:"Author",guid:"4995bc3735947",fullName:"Chandler Wildman 3",bookTitle:"The Fear Awakening",address:" Santa Clara University, 144 Main St, New York, NY"},{type:"Author",guid:"4995bc373595b",fullName:"Tyrese Knight 2",bookTitle:"The Messenger of Fear",address:" Michigan State University, 342 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc373596e",fullName:"Emery Cavalet 2",bookTitle:"City of Menace",address:" CalTech, 477 Fifth Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735982",fullName:"Jackson Garratt 3",bookTitle:"The Claws of Fear",address:" College University, 25 Dana St, London, UK"},{type:"Author",guid:"4995bc3735996",fullName:"Gussie Bowman 2",bookTitle:"The Space of the Runaway",address:" Michigan State University, 372 Main St, San Francisco, CA"},{type:"Author",guid:"4995bc37359aa",fullName:"Kezia Henry 2",bookTitle:"The Time Ark",address:" Stanford University, 199 Main St, San Francisco, CA"},{type:"Author",guid:"4995bc37359bd",fullName:"Quintin Hays 1",bookTitle:"The Nightmares of Doom",address:" Santa Clara University, 172 University Loop, London, UK"},{type:"Author",guid:"4995bc37359d1",fullName:"Amalia Grant 2",bookTitle:"The Fang Ghost",address:" University of Southampton, 471 Fifth Ave, Seattle, WA"},{type:"Author",guid:"4995bc37359e5",fullName:"Jasper Swarner 4",bookTitle:"The Time Armageddon",address:" Foothill College, 65 Lazaneo St, Southampton, UK"},{type:"Author",guid:"4995bc37359f9",fullName:"Tania Scott 4",bookTitle:"The Secret Monster",address:" Michigan State University, 24 Second St, London, UK"},{type:"Author",guid:"4995bc3735a0d",fullName:"Jarrod Schreckengost 3",bookTitle:"Dreams of Menace",address:" New York University, 126 Bloom St, Cambridge, MA"},{type:"Author",guid:"4995bc3735a21",fullName:"Lesley Sanforth 3",bookTitle:"The Jaws of Death",address:" CalTech, 357 Castro St, New York, NY"},{type:"Author",guid:"4995bc3735a34",fullName:"Roosevelt Stewart 3",bookTitle:"The Fear of the Mist",address:" College University, 6 Main St, Cambridge, MA"},{type:"Author",guid:"4995bc3735a48",fullName:"Jacaline Mathews 2",bookTitle:"The Day of the Runaway",address:" Santa Clara University, 420 Broadway Blvd, Seattle, WA"},{type:"Author",guid:"4995bc3735a5c",fullName:"Kaitlyn Paul 3",bookTitle:"The Carnival",address:" Michigan State University, 322 Bloom St, London, UK"},{type:"Author",guid:"4995bc3735a70",fullName:"Christianne Taggart 1",bookTitle:"The Doomed Bride",address:" Michigan State University, 289 Van Ness Blvd, London, UK"},{type:"Author",guid:"4995bc3735a84",fullName:"Lawrie Toyley 1",bookTitle:"The Night of the Ice",address:" University of Southampton, 367 University Loop, Palo Alto, CA"},{type:"Author",guid:"4995bc3735a98",fullName:"Gladwyn Handyside 1",bookTitle:"The Fury Face",address:" Springfield University, 350 University Loop, Wichita, KS"},{type:"Author",guid:"4995bc3735ab0",fullName:"Raphael Wilks 4",bookTitle:"Myth of Madness",address:" CalTech, 187 Fifth Ave, London, UK"},{type:"Author",guid:"4995bc3735ad1",fullName:"Matilda Rockwell 3",bookTitle:"The Unearthly Assassin",address:" Stanford University, 84 Fifth Ave, Southampton, UK"},{type:"Author",guid:"4995bc3735ae5",fullName:"Alan Brown 4",bookTitle:"The Menace of the Visitor",address:" Springfield University, 45 Oak Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3735af8",fullName:"Romy Ward 3",bookTitle:"The Space Underworld",address:" Harvard, 387 Lazaneo St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735b0c",fullName:"Eldreda Flick 2",bookTitle:"The Death of the Dominators",address:" MIT, 453 Oak Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3735b20",fullName:"Em Leichter 1",bookTitle:"The Future Web",address:" University of Southampton, 291 First St, Santa Clara, CA"},{type:"Author",guid:"4995bc3735b34",fullName:"Janella Warner 3",bookTitle:"The Final Claws",address:" Springfield University, 398 Castro St, New York, NY"},{type:"Author",guid:"4995bc3735b48",fullName:"Chip Haynes 3",bookTitle:"The Menace Thieves",address:" Michigan State University, 490 Broadway Blvd, Seattle, WA"},{type:"Author",guid:"4995bc3735b5c",fullName:"Lita Rumbaugh 3",bookTitle:"The Child of Space",address:" Springfield University, 444 First St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735b6f",fullName:"Zena Giesler 3",bookTitle:"The Deadly Memories",address:" Harvard, 420 Main St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735b83",fullName:"Polly Van 3",bookTitle:"Horns of Day",address:" New York University, 57 Dana St, Palo Alto, CA"},{type:"Author",guid:"4995bc3735b97",fullName:"Ceara Sanner 1",bookTitle:"The Evil Assassin",address:" Michigan State University, 410 Second St, St. Louis, MO"},{type:"Author",guid:"4995bc3735bab",fullName:"Nola Bell 4",bookTitle:"The Last Alien",address:" Harvard, 261 Oak Ave, Seattle, WA"},{type:"Author",guid:"4995bc3735bbf",fullName:"Hamilton Heyman 1",bookTitle:"The Minds of Madness",address:" New York University, 352 Fifth Ave, Cambridge, MA"},{type:"Author",guid:"4995bc3735bd2",fullName:"Neville Mildred 3",bookTitle:"Mutants of Night",address:" CalTech, 115 University Loop, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735be6",fullName:"Fran Willcox 4",bookTitle:"The Menace of the Spider",address:" London University, 432 Second St, San Francisco, CA"},{type:"Author",guid:"4995bc3735bfa",fullName:"Matty Cypret 3",bookTitle:"The Day of the Vengeance",address:" College University, 218 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc3735c0e",fullName:"Austen Fonblanque 4",bookTitle:"The Space Reign",address:" Foothill College, 142 Bloom St, Cupertino, CA"},{type:"Author",guid:"4995bc3735c21",fullName:"Felix Mitchell 4",bookTitle:"God of Doom",address:" Foothill College, 45 Castro St, Wichita, KS"},{type:"Author",guid:"4995bc3735c35",fullName:"Matty Cypret 3",bookTitle:"The Night of the Leisure",address:" London University, 9 Fifth Ave, Seattle, WA"},{type:"Author",guid:"4995bc3735c49",fullName:"Cassarah Vinsant 4",bookTitle:"The Seed of Night",address:" Michigan State University, 20 Van Ness Blvd, London, UK"},{type:"Author",guid:"4995bc3735c5d",fullName:"Vernon Perkins 1",bookTitle:"Reign of Night",address:" MIT, 274 Fifth Ave, Cupertino, CA"},{type:"Author",guid:"4995bc3735c71",fullName:"Shirley Mingle 2",bookTitle:"The Smugglers of Menace",address:" Harvard, 125 Dana St, Cambridge, MA"},{type:"Author",guid:"4995bc3735c85",fullName:"Kemp Lord 4",bookTitle:"The Horror Angel",address:" London University, 159 Second St, Palo Alto, CA"},{type:"Author",guid:"4995bc3735c98",fullName:"Kermit Throckmorton 1",bookTitle:"The Tenth Web",address:" London University, 106 Van Ness Blvd, Palo Alto, CA"},{type:"Author",guid:"4995bc3735cb3",fullName:"Delma Auman 4",bookTitle:"Killer of Night",address:" University of Southampton, 226 Second St, Cambridge, MA"},{type:"Author",guid:"4995bc3735cc7",fullName:"Marly Friedline 4",bookTitle:"Runaway of Horror",address:" Foothill College, 256 Dana St, San Francisco, CA"},{type:"Author",guid:"4995bc3735cdb",fullName:"Noah Kline 4",bookTitle:"The Menace of the Ragnarok",address:" Springfield University, 63 Bloom St, St. Louis, MO"},{type:"Author",guid:"4995bc3735cef",fullName:"Wendy Sayre 1",bookTitle:"History of Doom",address:" New York University, 39 Castro St, Southampton, UK"},{type:"Author",guid:"4995bc3735d03",fullName:"Izzy Wyatt 4",bookTitle:"The Assassin of Fear",address:" University of Southampton, 73 Bloom St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735d17",fullName:"Ann Sachse 2",bookTitle:"The Doom Fury",address:" CalTech, 133 Elm St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735d2b",fullName:"Ebba Hil 1",bookTitle:"Talons of Madness",address:" Harvard, 54 Broadway Blvd, Santa Clara, CA"},{type:"Author",guid:"4995bc3735d3f",fullName:"Alexina Compton 2",bookTitle:"War of Time",address:" University of Southampton, 44 Main St, St. Louis, MO"},{type:"Author",guid:"4995bc3735d53",fullName:"Sybella Henley 2",bookTitle:"The Illusion Revelation",address:" UC Santa Cruz, 107 Van Ness Blvd, Santa Clara, CA"},{type:"Author",guid:"4995bc3735d66",fullName:"Tylar Monahan 1",bookTitle:"Image of Space",address:" London University, 126 Second St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735d7a",fullName:" 4",bookTitle:"The False Masque",address:" MIT, 318 Oak Ave, Wichita, KS"},{type:"Author",guid:"4995bc3735d91",fullName:"Lorrin Reichard 2",bookTitle:"The Fear of the Androids",address:" Springfield University, 467 Main St, Cambridge, MA"},{type:"Author",guid:"4995bc3735da5",fullName:"Harriette Alington 1",bookTitle:"The Future of Time",address:" Stanford University, 5 Castro St, St. Louis, MO"},{type:"Author",guid:"4995bc3735db9",fullName:"Dominic Groah 3",bookTitle:"Smuggler of Day",address:" UC Santa Cruz, 246 Fifth Ave, St. Louis, MO"},{type:"Author",guid:"4995bc3735dcc",fullName:"Everard Richardson 1",bookTitle:"The Revelation",address:" Springfield University, 261 Dana St, Seattle, WA"},{type:"Author",guid:"4995bc3735de0",fullName:"Gladwyn Handyside 2",bookTitle:"The Secret Monster",address:" UC Santa Cruz, 94 Main St, Wichita, KS"},{type:"Author",guid:"4995bc3735df4",fullName:"Kyla Moore 3",bookTitle:"The Horror Robot",address:" Santa Clara University, 456 Castro St, London, UK"},{type:"Author",guid:"4995bc3735e08",fullName:"Latonya Roche 4",bookTitle:"The Machines Spider",address:" Michigan State University, 429 Elm St, Palo Alto, CA"},{type:"Author",guid:"4995bc3735e1c",fullName:"Chanel Boyd 2",bookTitle:"The Horror of the Minds",address:" London University, 482 Elm St, Southampton, UK"},{type:"Author",guid:"4995bc3735e2f",fullName:"Delice Kimmons 4",bookTitle:"The Death of the Memory",address:" MIT, 257 Broadway Blvd, Palo Alto, CA"},{type:"Author",guid:"4995bc3735e43",fullName:"Cornelius Metzer 2",bookTitle:"City of Menace",address:" Springfield University, 353 Bloom St, Wichita, KS"},{type:"Author",guid:"4995bc3735e57",fullName:"Meg Coveney 2",bookTitle:"The Assassin of Fear",address:" College University, 348 Lazaneo St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735e6a",fullName:"Roxanna Loewentsein 2",bookTitle:"The Riders of Death",address:" CalTech, 125 Bloom St, St. Louis, MO"},{type:"Author",guid:"4995bc3735e7e",fullName:"Emmett Agg 2",bookTitle:"The Last Mists",address:" UC Santa Cruz, 210 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3735e99",fullName:"Junior Christman 4",bookTitle:"Ragnarok of Space",address:" Foothill College, 264 Second St, Palo Alto, CA"},{type:"Author",guid:"4995bc3735eae",fullName:"Wendy Sayre 2",bookTitle:"The Madness Myth",address:" University of Southampton, 398 Bloom St, Santa Clara, CA"},{type:"Author",guid:"4995bc3735ec0",fullName:"Amandine Catlay 1",bookTitle:"The Night Inferno",address:" MIT, 364 Oak Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3735ed8",fullName:"Gordon Zadovsky 4",bookTitle:"The Key of Death",address:" Foothill College, 68 Fifth Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3735eec",fullName:"Earline Judge 1",bookTitle:"The Doom of the Claws",address:" CalTech, 462 Bloom St, London, UK"},{type:"Author",guid:"4995bc3735f00",fullName:"Chryssa Robertson 3",bookTitle:"The Fear of Day",address:" New York University, 323 First St, San Francisco, CA"},{type:"Author",guid:"4995bc3735f14",fullName:"Tim Beck 4",bookTitle:"The Fear of the Arc",address:" New York University, 287 Lazaneo St, Seattle, WA"},{type:"Author",guid:"4995bc3735f28",fullName:"Sarah Chapman 4",bookTitle:"Pyramids of Menace",address:" University of Southampton, 289 Lazaneo St, Los Angeles, CA"},{type:"Author",guid:"4995bc3735f3b",fullName:"Serrena Canham 2",bookTitle:"The Ultimate Seed",address:" Springfield University, 268 Castro St, Seattle, WA"},{type:"Author",guid:"4995bc3735f4f",fullName:"Pierce Conrad 4",bookTitle:"Future of Night",address:" New York University, 44 Elm St, Southampton, UK"},{type:"Author",guid:"4995bc3735f63",fullName:"Sheard Alcocke 1",bookTitle:"The Claws of Day",address:" Springfield University, 23 Van Ness Blvd, Wichita, KS"},{type:"Author",guid:"4995bc3735f77",fullName:"Prue Putnam 1",bookTitle:"Robbers of Doom",address:" College University, 244 Main St, San Francisco, CA"},{type:"Author",guid:"4995bc3735f8a",fullName:"Kezia Henry 3",bookTitle:"Creature of Space",address:" Stanford University, 440 Lazaneo St, New York, NY"},{type:"Author",guid:"4995bc3735f9f",fullName:"Chrystal Prevatt 4",bookTitle:"The Day of the Mirror",address:" New York University, 135 Main St, Cupertino, CA"},{type:"Author",guid:"4995bc3735fb3",fullName:"Kim Oppenheimer 2",bookTitle:"The Killers of Time",address:" London University, 226 Oak Ave, Cambridge, MA"},{type:"Author",guid:"4995bc3735fc8",fullName:"Adolph Hayhurst 2",bookTitle:"Messenger of Fear",address:" MIT, 298 Fifth Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc3735fdb",fullName:"Luann Garneis 1",bookTitle:"The Masque",address:" Santa Clara University, 109 Van Ness Blvd, Cupertino, CA"},{type:"Author",guid:"4995bc3735ff0",fullName:"Hazel Holts 4",bookTitle:"The Pirate Memory",address:" Santa Clara University, 241 Dana St, London, UK"},{type:"Author",guid:"4995bc3736005",fullName:"Brittney Lowe 1",bookTitle:"The Time Smugglers",address:" Springfield University, 216 University Loop, Palo Alto, CA"},{type:"Author",guid:"4995bc3736367",fullName:"Missie Marjorie 2",bookTitle:"The Computer Time",address:" Michigan State University, 306 Elm St, New York, NY"},{type:"Author",guid:"4995bc3736381",fullName:"Blondie Rogers 3",bookTitle:"The Empty Runaway",address:" UC Santa Cruz, 336 Castro St, Seattle, WA"},{type:"Author",guid:"4995bc3736396",fullName:"Kyla Moore 2",bookTitle:"The First Cave",address:" Michigan State University, 269 University Loop, Santa Clara, CA"},{type:"Author",guid:"4995bc37363ab",fullName:"Kaylynn Herndon 4",bookTitle:"The Time of the Seeds",address:" Stanford University, 201 Bloom St, Seattle, WA"},{type:"Author",guid:"4995bc37363bf",fullName:"Jancis Busk 1",bookTitle:"The Ultimate Resurrection",address:" Harvard, 314 Main St, London, UK"},{type:"Author",guid:"4995bc37363e0",fullName:"Linnie Fraser 3",bookTitle:"The God",address:" University of Southampton, 302 Fifth Ave, San Francisco, CA"},{type:"Author",guid:"4995bc37363f5",fullName:"Tyrell Riggle 1",bookTitle:"Visitors of Time",address:" University of Southampton, 258 First St, Southampton, UK"},{type:"Author",guid:"4995bc373640a",fullName:"Luanne Mens 3",bookTitle:"The Day Sea",address:" Stanford University, 422 Fifth Ave, San Francisco, CA"},{type:"Author",guid:"4995bc373641e",fullName:"Everitt Thompson 3",bookTitle:"The Enemies",address:" University of Southampton, 57 Fifth Ave, Cambridge, MA"},{type:"Author",guid:"4995bc3736432",fullName:"Robynne Unk 4",bookTitle:"The Fear of the Devil",address:" Springfield University, 326 Castro St, Cambridge, MA"},{type:"Author",guid:"4995bc373644e",fullName:"Lake Elder 1",bookTitle:"Spiders of Death",address:" University of Southampton, 237 Fifth Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3736465",fullName:"Gale Cross 4",bookTitle:"The Mutants",address:" Foothill College, 323 Broadway Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3736479",fullName:"Amy Mcelroy 4",bookTitle:"The Caves of Madness",address:" MIT, 255 Fifth Ave, San Francisco, CA"},{type:"Author",guid:"4995bc373648d",fullName:"Lowell Holtzer 3",bookTitle:"The Spider",address:" College University, 370 Oak Ave, Cambridge, MA"},{type:"Author",guid:"4995bc37364a1",fullName:"Zola Haines 4",bookTitle:"The Fear of the Mist",address:" New York University, 286 Fifth Ave, Palo Alto, CA"},{type:"Author",guid:"4995bc37364b4",fullName:"Pearce Swartzbaugh 4",bookTitle:"The Menace Killers",address:" Stanford University, 34 Dana St, New York, NY"},{type:"Author",guid:"4995bc37364cc",fullName:"Lorayne Losey 1",bookTitle:"The Messenger",address:" Springfield University, 70 University Loop, Cupertino, CA"},{type:"Author",guid:"4995bc37364e0",fullName:"Perdita Casteel 3",bookTitle:"Illusion of Doom",address:" College University, 103 First St, Los Angeles, CA"},{type:"Author",guid:"4995bc37364f4",fullName:"Jules Leech 4",bookTitle:"The Dominator",address:" Foothill College, 405 Broadway Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3736508",fullName:"Reagan Ironmonger 1",bookTitle:"Hive of Menace",address:" London University, 447 University Loop, Los Angeles, CA"},{type:"Author",guid:"4995bc373651c",fullName:"Bevis Powers 3",bookTitle:"The Sun of Death",address:" Foothill College, 447 Main St, Santa Clara, CA"},{type:"Author",guid:"4995bc3736530",fullName:"Kip Mosser 4",bookTitle:"The Door of Space",address:" Stanford University, 294 University Loop, London, UK"},{type:"Author",guid:"4995bc3736543",fullName:"Jilly Poorbaugh 3",bookTitle:"The Doom of the Battlefield",address:" Harvard, 360 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736557",fullName:"Chip Haynes 1",bookTitle:"The Unearthly Androids",address:" MIT, 483 Elm St, Cupertino, CA"},{type:"Author",guid:"4995bc373656b",fullName:"Daffodil Harper 4",bookTitle:"The War of Fury",address:" Michigan State University, 483 Second St, Palo Alto, CA"},{type:"Author",guid:"4995bc373657f",fullName:"Dorthy Wilson 2",bookTitle:"The Mind Crime",address:" Michigan State University, 412 Broadway Blvd, Seattle, WA"},{type:"Author",guid:"4995bc3736593",fullName:"Ridley Ewing 3",bookTitle:"The Night of the Universe",address:" New York University, 287 First St, Wichita, KS"},{type:"Author",guid:"4995bc37365a7",fullName:"Brennan Whishaw 1",bookTitle:"The War of Fury",address:" University of Southampton, 499 First St, Los Angeles, CA"},{type:"Author",guid:"4995bc37365bb",fullName:"Hale Alliman 1",bookTitle:"Devils of Fury",address:" Foothill College, 265 Main St, Southampton, UK"},{type:"Author",guid:"4995bc37365d6",fullName:"Petronella Eckhardstein 1",bookTitle:"The Mind Massacre",address:" MIT, 78 Castro St, St. Louis, MO"},{type:"Author",guid:"4995bc37365ea",fullName:"Maurice Bagley 4",bookTitle:"The Decay Claws",address:" Foothill College, 159 Fifth Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc37365fe",fullName:"Shaun Drabble 3",bookTitle:"The Fang Secret",address:" Michigan State University, 79 Broadway Blvd, Wichita, KS"},{type:"Author",guid:"4995bc3736612",fullName:"Brady Smail 3",bookTitle:"Sound of Time",address:" UC Santa Cruz, 456 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736626",fullName:"Juliet Shaw 3",bookTitle:"The Ghost Universe",address:" New York University, 379 Castro St, Los Angeles, CA"},{type:"Author",guid:"4995bc373663a",fullName:"Lorayne Losey 3",bookTitle:"The Jaws of Death",address:" Michigan State University, 398 University Loop, Ann Arbor, MI"},{type:"Author",guid:"4995bc373664e",fullName:"Lisha Enderly 4",bookTitle:"The Web",address:" Santa Clara University, 86 Broadway Blvd, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736662",fullName:"Becky Davis 1",bookTitle:"The Doom of the Claws",address:" London University, 284 Van Ness Blvd, New York, NY"},{type:"Author",guid:"4995bc3736676",fullName:"Leyton Jyllian 3",bookTitle:"Operation of Night",address:" MIT, 137 Dana St, Wichita, KS"},{type:"Author",guid:"4995bc373668a",fullName:"Alice Yates 1",bookTitle:"The Madness of the Spiders",address:" Stanford University, 484 First St, London, UK"},{type:"Author",guid:"4995bc373669d",fullName:"Lemoine James 1",bookTitle:"The Deadly Mutants",address:" Springfield University, 359 Oak Ave, Cambridge, MA"},{type:"Author",guid:"4995bc37366b1",fullName:"Baylee Raybould 1",bookTitle:"Curse of Fear",address:" Michigan State University, 154 Lazaneo St, London, UK"},{type:"Author",guid:"4995bc37366c5",fullName:"Ford Steiner 2",bookTitle:"The Masque of Doom",address:" Michigan State University, 390 Second St, Southampton, UK"},{type:"Author",guid:"4995bc37366d9",fullName:"Laureen Moon 1",bookTitle:"The Fear Memories",address:" Stanford University, 372 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc37366ed",fullName:"Colin Hair 4",bookTitle:"The Time of the Secret",address:" Springfield University, 464 Bloom St, Cupertino, CA"},{type:"Author",guid:"4995bc3736701",fullName:"Haven Crissman 1",bookTitle:"The Armageddon Laboratory",address:" College University, 141 Lazaneo St, Palo Alto, CA"},{type:"Author",guid:"4995bc373671a",fullName:"Ludmilla Candles 2",bookTitle:"The Pyramids",address:" CalTech, 303 Bloom St, Southampton, UK"},{type:"Author",guid:"4995bc373672f",fullName:"Alberta Fowler 1",bookTitle:"The Day of the Door",address:" London University, 271 University Loop, Cambridge, MA"},{type:"Author",guid:"4995bc3736744",fullName:"Lowell Holtzer 3",bookTitle:"The Night of the Bandits",address:" University of Southampton, 173 Second St, Seattle, WA"},{type:"Author",guid:"4995bc3736758",fullName:"Lesley Sanforth 4",bookTitle:"Robbers of Doom",address:" University of Southampton, 129 Van Ness Blvd, Seattle, WA"},{type:"Author",guid:"4995bc373676c",fullName:"Vic Close 1",bookTitle:"The Bride of Horror",address:" MIT, 390 Main St, Santa Clara, CA"},{type:"Author",guid:"4995bc3736780",fullName:"Lorraine Butler 2",bookTitle:"The Time of the Seeds",address:" New York University, 13 Oak Ave, Wichita, KS"},{type:"Author",guid:"4995bc3736794",fullName:"Cedar Garry 3",bookTitle:"The Madness Myth",address:" CalTech, 45 Fifth Ave, New York, NY"},{type:"Author",guid:"4995bc37367a8",fullName:"Sinclair Dale 2",bookTitle:"The Night of the Dominator",address:" New York University, 493 Bloom St, Cambridge, MA"},{type:"Author",guid:"4995bc37367bc",fullName:"Goldie Pickering 1",bookTitle:"Menace of Day",address:" University of Southampton, 216 First St, St. Louis, MO"},{type:"Author",guid:"4995bc37367cf",fullName:"Kaleigh Brooks 2",bookTitle:"The Doom Fury",address:" UC Santa Cruz, 189 Bloom St, London, UK"},{type:"Author",guid:"4995bc37367e3",fullName:"Rain Joyce 3",bookTitle:"The Day",address:" New York University, 499 Dana St, Palo Alto, CA"},{type:"Author",guid:"4995bc37367f7",fullName:"Merton Fillmore 3",bookTitle:"Dreams of Menace",address:" Santa Clara University, 98 Bloom St, Cambridge, MA"},{type:"Author",guid:"4995bc373680b",fullName:"Bekki Blunt 4",bookTitle:"The Whispers of Day",address:" UC Santa Cruz, 112 Lazaneo St, Ann Arbor, MI"},{type:"Author",guid:"4995bc373681f",fullName:"Godric Sommer 1",bookTitle:"Men of Night",address:" College University, 88 Lazaneo St, New York, NY"},{type:"Author",guid:"4995bc3736832",fullName:"Thorburn Smith 4",bookTitle:"Door of Horror",address:" CalTech, 401 Elm St, Santa Clara, CA"},{type:"Author",guid:"4995bc3736846",fullName:"Frankie Giesen 3",bookTitle:"The Jaws",address:" Harvard, 117 Van Ness Blvd, London, UK"},{type:"Author",guid:"4995bc373685a",fullName:"Brock Young 3",bookTitle:"The Killer Key",address:" New York University, 225 Van Ness Blvd, Santa Clara, CA"},{type:"Author",guid:"4995bc373686e",fullName:"Pleasance Mcloskey 1",bookTitle:"Sound of Fear",address:" College University, 331 Fifth Ave, Cupertino, CA"},{type:"Author",guid:"4995bc3736881",fullName:"Colin Hair 3",bookTitle:"The Faceless Universe",address:" Harvard, 185 Broadway Blvd, New York, NY"},{type:"Author",guid:"4995bc3736895",fullName:"Jo Brindle 2",bookTitle:"The Day Ice",address:" UC Santa Cruz, 278 Fifth Ave, Palo Alto, CA"},{type:"Author",guid:"4995bc37368a9",fullName:"Loreen Buck 2",bookTitle:"Underworld of Space",address:" Harvard, 385 Main St, London, UK"},{type:"Author",guid:"4995bc37368bd",fullName:"Darrell Reade 4",bookTitle:"The Madness Seeds",address:" UC Santa Cruz, 423 Dana St, Cambridge, MA"},{type:"Author",guid:"4995bc37368d0",fullName:"Delice Kimmons 2",bookTitle:"The Fear of the Key",address:" MIT, 161 First St, New York, NY"},{type:"Author",guid:"4995bc37368e4",fullName:"Bettye Bode 1",bookTitle:"The Thieves of Time",address:" College University, 207 Main St, Southampton, UK"},{type:"Author",guid:"4995bc37368f8",fullName:"Dillon Rowe 3",bookTitle:"The Mind Wings",address:" Foothill College, 374 Broadway Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc373690c",fullName:"Bennett Little 4",bookTitle:"The Day Nemesis",address:" MIT, 129 Lazaneo St, Los Angeles, CA"},{type:"Author",guid:"4995bc373691f",fullName:"Bevis Powers 4",bookTitle:"The Horror of Madness",address:" Santa Clara University, 68 Oak Ave, St. Louis, MO"},{type:"Author",guid:"4995bc3736933",fullName:"Perce Pennington 3",bookTitle:"The Massacre",address:" New York University, 432 Bloom St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736947",fullName:"America Thigpen 4",bookTitle:"The Long Suns",address:" University of Southampton, 217 University Loop, Cupertino, CA"},{type:"Author",guid:"4995bc373695b",fullName:"Lyndsea Roberts 4",bookTitle:"The Keeper",address:" UC Santa Cruz, 153 Fifth Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc373696f",fullName:"Loreen Buck 1",bookTitle:"The Space of the Devil",address:" CalTech, 65 University Loop, Santa Clara, CA"},{type:"Author",guid:"4995bc3736983",fullName:"Unique Whitten 1",bookTitle:"Infinity of Night",address:" University of Southampton, 238 Dana St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736997",fullName:"Bernadine Raub 4",bookTitle:"The Menace of the Ark",address:" London University, 369 Dana St, London, UK"},{type:"Author",guid:"4995bc37369b2",fullName:"Gabe Milliron 4",bookTitle:"The Machines",address:" UC Santa Cruz, 331 University Loop, London, UK"},{type:"Author",guid:"4995bc37369c6",fullName:"Ronda Higgens 2",bookTitle:"Spiders of Death",address:" Foothill College, 496 Castro St, Cupertino, CA"},{type:"Author",guid:"4995bc37369da",fullName:"Oscar Camp 2",bookTitle:"The Day of the Computers",address:" Santa Clara University, 292 Fifth Ave, New York, NY"},{type:"Author",guid:"4995bc37369ed",fullName:"Hudson Cable 4",bookTitle:"The Fury of the Angel",address:" Stanford University, 116 Oak Ave, San Francisco, CA"},{type:"Author",guid:"4995bc3736a01",fullName:"Willis Costello 4",bookTitle:"The Ghosts of Day",address:" Foothill College, 370 Castro St, Cupertino, CA"},{type:"Author",guid:"4995bc3736a15",fullName:"Douglas Bennett 3",bookTitle:"The Universe",address:" New York University, 74 University Loop, Seattle, WA"},{type:"Author",guid:"4995bc3736a29",fullName:"Chonsie Conkle 1",bookTitle:"The Seas of Fear",address:" Santa Clara University, 479 Main St, London, UK"},{type:"Author",guid:"4995bc3736a3c",fullName:"Lalage Schmidt 3",bookTitle:"The Fear of the Awakening",address:" CalTech, 415 Elm St, St. Louis, MO"},{type:"Author",guid:"4995bc3736a50",fullName:"Patton Kooser 1",bookTitle:"The Madness Nightmares",address:" Stanford University, 38 University Loop, Los Angeles, CA"},{type:"Author",guid:"4995bc3736a64",fullName:"Mya Eckert 3",bookTitle:"The Tenth Web",address:" Harvard, 89 Dana St, New York, NY"},{type:"Author",guid:"4995bc3736a78",fullName:"Kayleen Trout 2",bookTitle:"The Riders",address:" London University, 355 Second St, Wichita, KS"},{type:"Author",guid:"4995bc3736a8c",fullName:"Tawnie Vorrasi 2",bookTitle:"The Runaway Gods",address:" College University, 183 Elm St, Southampton, UK"},{type:"Author",guid:"4995bc3736aa0",fullName:"Marian Gearhart 4",bookTitle:"The Pyramids of Death",address:" UC Santa Cruz, 176 First St, Cambridge, MA"},{type:"Author",guid:"4995bc3736ab4",fullName:"York Merryman 2",bookTitle:"The Horns",address:" New York University, 154 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736ac8",fullName:"Dene Fair 1",bookTitle:"The Menace Pyramid",address:" MIT, 226 First St, Santa Clara, CA"},{type:"Author",guid:"4995bc3736adb",fullName:"Konnor Wells 4",bookTitle:"Planet of Death",address:" UC Santa Cruz, 94 Fifth Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736aef",fullName:"Chanel Boyd 4",bookTitle:"The Horror Alien",address:" CalTech, 125 Broadway Blvd, Cupertino, CA"},{type:"Author",guid:"4995bc3736b03",fullName:"Crispian Nickolson 2",bookTitle:"The Impossible Armageddon",address:" CalTech, 67 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3736b1d",fullName:"Elouise Langston 3",bookTitle:"The Doom of the Night",address:" New York University, 48 University Loop, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736b33",fullName:"Eliza Ropes 4",bookTitle:"The Mirror",address:" CalTech, 158 University Loop, Southampton, UK"},{type:"Author",guid:"4995bc3736b46",fullName:"Raynard Peters 3",bookTitle:"Child of Fear",address:" MIT, 385 Lazaneo St, Seattle, WA"},{type:"Author",guid:"4995bc3736b5a",fullName:"Kaylynn Herndon 4",bookTitle:"The Reign",address:" Stanford University, 237 Van Ness Blvd, Cambridge, MA"},{type:"Author",guid:"4995bc3736b6e",fullName:"Priscilla Dean 4",bookTitle:"The Space of the Horn",address:" CalTech, 317 First St, St. Louis, MO"},{type:"Author",guid:"4995bc3736b81",fullName:"Leighton Wickes 3",bookTitle:"Pyramids of Menace",address:" Springfield University, 313 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3736b9c",fullName:"Anneka Gist 3",bookTitle:"The God",address:" Foothill College, 6 University Loop, Los Angeles, CA"},{type:"Author",guid:"4995bc3736bb0",fullName:"Roseanne Rowley 2",bookTitle:"The Horror of the Ice",address:" Harvard, 253 First St, Seattle, WA"},{type:"Author",guid:"4995bc3736bc4",fullName:"Brandi Bauerle 1",bookTitle:"The Children of Madness",address:" Foothill College, 497 First St, Santa Clara, CA"},{type:"Author",guid:"4995bc3736bd8",fullName:"Kaitlyn Paul 3",bookTitle:"The Mind Massacre",address:" College University, 490 Lazaneo St, St. Louis, MO"},{type:"Author",guid:"4995bc3736beb",fullName:"Silvester Mcfall 3",bookTitle:"The Fear Child",address:" CalTech, 348 Broadway Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3736bff",fullName:"Woodrow Fleming 2",bookTitle:"The Empty Fear",address:" Springfield University, 340 First St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736c13",fullName:"Wynonna Erskine 3",bookTitle:"Cave of Night",address:" UC Santa Cruz, 37 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736c27",fullName:"Lawrie Toyley 2",bookTitle:"The Horror City",address:" Stanford University, 172 University Loop, Southampton, UK"},{type:"Author",guid:"4995bc3736c3b",fullName:"Breana Bastion 3",bookTitle:"The Doomed Whisper",address:" London University, 157 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc3736c4e",fullName:"Delice Kimmons 2",bookTitle:"The Space of the Leisure",address:" Stanford University, 308 Bloom St, Seattle, WA"},{type:"Author",guid:"4995bc3736c62",fullName:"Sybella Henley 2",bookTitle:"The Armageddon",address:" University of Southampton, 314 Lazaneo St, New York, NY"},{type:"Author",guid:"4995bc3736c76",fullName:"Sebastian Stone 2",bookTitle:"The Stone",address:" Springfield University, 348 Second St, St. Louis, MO"},{type:"Author",guid:"4995bc3736c8a",fullName:"Perdita Casteel 2",bookTitle:"The Space Alien",address:" Stanford University, 38 Castro St, Santa Clara, CA"},{type:"Author",guid:"4995bc3736c9e",fullName:"Lyndsea Roberts 4",bookTitle:"The Fear Paradise",address:" New York University, 433 Second St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736cb2",fullName:"Reanna Meyers 2",bookTitle:"Image of Menace",address:" MIT, 452 Second St, San Francisco, CA"},{type:"Author",guid:"4995bc3736cc6",fullName:"Paul Parrish 4",bookTitle:"The Death Angels",address:" MIT, 468 Castro St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736cda",fullName:"Eldred West 2",bookTitle:"The Time of the Mirror",address:" College University, 420 Bloom St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736ced",fullName:"Tawnie Vorrasi 2",bookTitle:"The Madness of the Horror",address:" Michigan State University, 289 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc3736d01",fullName:"Vic Close 4",bookTitle:"The Death of the Pyramid",address:" New York University, 229 Main St, Southampton, UK"},{type:"Author",guid:"4995bc3736d15",fullName:"Shana Owen 4",bookTitle:"The Killer Fury",address:" London University, 438 First St, Southampton, UK"},{type:"Author",guid:"4995bc3736d29",fullName:"Lissa Tillson 1",bookTitle:"The Fear Killers",address:" Harvard, 100 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc3736d3d",fullName:"Gabriel Cherry 1",bookTitle:"The Reign of Madness",address:" Stanford University, 319 Elm St, San Francisco, CA"},{type:"Author",guid:"4995bc3736d51",fullName:"Willis Costello 4",bookTitle:"The Horror Angel",address:" UC Santa Cruz, 411 Van Ness Blvd, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736d65",fullName:"Seward Romanoff 2",bookTitle:"The Day Monster",address:" University of Southampton, 371 University Loop, Wichita, KS"},{type:"Author",guid:"4995bc3736d80",fullName:"Cornelius Metzer 3",bookTitle:"Hive of Menace",address:" CalTech, 99 Second St, Seattle, WA"},{type:"Author",guid:"4995bc3736d94",fullName:"Pansy Summy 4",bookTitle:"The Day Thieves",address:" New York University, 419 University Loop, London, UK"},{type:"Author",guid:"4995bc3736da8",fullName:"Jaymes Cox 3",bookTitle:"The Fear of the Minds",address:" MIT, 54 First St, Palo Alto, CA"},{type:"Author",guid:"4995bc3736dbc",fullName:"Pansy Summy 4",bookTitle:"The Runaway Gods",address:" Foothill College, 85 Elm St, Palo Alto, CA"},{type:"Author",guid:"4995bc3736dcf",fullName:"August Feufer 2",bookTitle:"God of Doom",address:" Michigan State University, 237 Second St, Cambridge, MA"},{type:"Author",guid:"4995bc3736de3",fullName:"Raphael Wilks 4",bookTitle:"The Creature",address:" College University, 46 Main St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736df7",fullName:"Colin Hair 4",bookTitle:"The Horror Child",address:" Foothill College, 244 Castro St, Seattle, WA"},{type:"Author",guid:"4995bc3736e0a",fullName:"Colten Stange 2",bookTitle:"Dreams of Menace",address:" CalTech, 212 Fifth Ave, San Francisco, CA"},{type:"Author",guid:"4995bc3736e1e",fullName:"Chonsie Conkle 3",bookTitle:"The Menace Carnival",address:" CalTech, 470 Broadway Blvd, Southampton, UK"},{type:"Author",guid:"4995bc3736e32",fullName:"Kaleigh Brooks 4",bookTitle:"The Fury Massacre",address:" New York University, 361 Lazaneo St, Cupertino, CA"},{type:"Author",guid:"4995bc3736e46",fullName:"Kaye Harding 3",bookTitle:"The Doom of the Battlefield",address:" Harvard, 246 Castro St, San Francisco, CA"},{type:"Author",guid:"4995bc3736e59",fullName:"Kendal Ritter 1",bookTitle:"The Whisper Faces",address:" Foothill College, 80 Fifth Ave, San Francisco, CA"},{type:"Author",guid:"4995bc3736e6d",fullName:"Eleanor Bennett 4",bookTitle:"The Angels of Madness",address:" CalTech, 263 Oak Ave, San Francisco, CA"},{type:"Author",guid:"4995bc3736e81",fullName:"Lindsey Straub 3",bookTitle:"The Doom of the Jaws",address:" MIT, 146 Van Ness Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3736e95",fullName:"Fawn Carr 1",bookTitle:"Door of Space",address:" Stanford University, 22 Oak Ave, Los Angeles, CA"},{type:"Author",guid:"4995bc3736ea9",fullName:"Deshawn Pyle 3",bookTitle:"The Secret",address:" MIT, 180 University Loop, Wichita, KS"},{type:"Author",guid:"4995bc3736ebd",fullName:"Virgee Mcdonald 1",bookTitle:"The Space Mists",address:" MIT, 288 Lazaneo St, San Francisco, CA"},{type:"Author",guid:"4995bc3736ed0",fullName:"Tex Koster 4",bookTitle:"The Time Ambassador",address:" Santa Clara University, 372 Main St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3736ee4",fullName:"Sorrel Dugmore 2",bookTitle:"The Robber",address:" Stanford University, 390 Oak Ave, Santa Clara, CA"},{type:"Author",guid:"4995bc3736ef8",fullName:"Beverly Harrold 2",bookTitle:"The Planet of Doom",address:" Harvard, 289 Fifth Ave, London, UK"},{type:"Author",guid:"4995bc3736f0c",fullName:"Webster Jelliman 4",bookTitle:"The Madness Masters",address:" Foothill College, 316 First St, London, UK"},{type:"Author",guid:"4995bc3736f24",fullName:"Tracee Martin 4",bookTitle:"The Minds of Fury",address:" UC Santa Cruz, 272 First St, Wichita, KS"},{type:"Author",guid:"4995bc3736f3b",fullName:"Delice Kimmons 2",bookTitle:"The Warrior of Day",address:" University of Southampton, 364 University Loop, London, UK"},{type:"Author",guid:"4995bc3736f5c",fullName:"Godric Sommer 1",bookTitle:"Robots of Menace",address:" MIT, 251 University Loop, Palo Alto, CA"},{type:"Author",guid:"4995bc3736f70",fullName:"Tatianna Johns 3",bookTitle:"The Death of the Riders",address:" Santa Clara University, 416 Oak Ave, St. Louis, MO"},{type:"Author",guid:"4995bc3736f8c",fullName:"Herbert Durstine 1",bookTitle:"The Space of the Devil",address:" New York University, 384 Fifth Ave, Seattle, WA"},{type:"Author",guid:"4995bc3736fa0",fullName:"Myron Rhodes 4",bookTitle:"The Devil",address:" London University, 8 Castro St, Los Angeles, CA"},{type:"Author",guid:"4995bc3736fb3",fullName:"Hank Hughes 2",bookTitle:"The Machine of Doom",address:" Springfield University, 42 First St, London, UK"},{type:"Author",guid:"4995bc3736fc7",fullName:"Fox Omara 2",bookTitle:"The Night of the Leisure",address:" CalTech, 468 Fifth Ave, Wichita, KS"},{type:"Author",guid:"4995bc3736fdb",fullName:"Dyan Bratton 1",bookTitle:"The Child of Space",address:" Springfield University, 463 Castro St, St. Louis, MO"},{type:"Author",guid:"4995bc3736fef",fullName:"Eleanor Bennett 4",bookTitle:"Machine of Night",address:" Springfield University, 301 Second St, London, UK"},{type:"Author",guid:"4995bc3737002",fullName:"Seward Romanoff 3",bookTitle:"The Secret Pit",address:" College University, 353 University Loop, Wichita, KS"},{type:"Author",guid:"4995bc3737016",fullName:"Erick Sulyard 1",bookTitle:"Whispers of Day",address:" Harvard, 223 Castro St, Wichita, KS"},{type:"Author",guid:"4995bc373702a",fullName:"Godric Sommer 3",bookTitle:"The Menace Mist",address:" London University, 260 Van Ness Blvd, Cupertino, CA"},{type:"Author",guid:"4995bc373703d",fullName:" 2",bookTitle:"The Horror Robot",address:" New York University, 499 Castro St, Palo Alto, CA"},{type:"Author",guid:"4995bc3737055",fullName:"Porsche Gilman 3",bookTitle:"The Time Suns",address:" CalTech, 336 First St, San Francisco, CA"},{type:"Author",guid:"4995bc3737069",fullName:"Phineas Poehl 1",bookTitle:"Ark of Day",address:" London University, 162 Bloom St, Wichita, KS"},{type:"Author",guid:"4995bc373707d",fullName:"Tylar Monahan 3",bookTitle:"The Menace of the Robbers",address:" Springfield University, 498 Broadway Blvd, Seattle, WA"},{type:"Author",guid:"4995bc3737091",fullName:"Harvey Wardle 3",bookTitle:"Mutants of Night",address:" MIT, 58 Bloom St, Ann Arbor, MI"},{type:"Author",guid:"4995bc37370a5",fullName:"Thea Sullivan 1",bookTitle:"The Night of the Dominator",address:" Santa Clara University, 443 Lazaneo St, San Francisco, CA"},{type:"Author",guid:"4995bc37370b9",fullName:"Brandie Tue 2",bookTitle:"The Fury Secret",address:" CalTech, 130 Lazaneo St, London, UK"},{type:"Author",guid:"4995bc37370cd",fullName:"Tessa Pullman 3",bookTitle:"The Menace of the Pit",address:" CalTech, 393 Oak Ave, San Francisco, CA"},{type:"Author",guid:"4995bc37370e0",fullName:"Freeman Marcotte 4",bookTitle:"The Jaws of Night",address:" Harvard, 288 Second St, Seattle, WA"},{type:"Author",guid:"4995bc37370f4",fullName:"Tex Koster 2",bookTitle:"The Madness Attack",address:" College University, 233 Fifth Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc3737108",fullName:"Barret Lalty 2",bookTitle:"The Unearthly Assassin",address:" London University, 399 Elm St, Seattle, WA"},{type:"Author",guid:"4995bc373711c",fullName:"Timotha Weeks 4",bookTitle:"The Death Face",address:" Stanford University, 302 Lazaneo St, Cambridge, MA"},{type:"Author",guid:"4995bc3737130",fullName:"Tybalt Hahn 2",bookTitle:"Masque of Space",address:" New York University, 108 Elm St, Los Angeles, CA"},{type:"Author",guid:"4995bc3737144",fullName:"Dewayne Patton 3",bookTitle:"The Armageddon",address:" Harvard, 83 Bloom St, Seattle, WA"},{type:"Author",guid:"4995bc3737158",fullName:"Tommie Keilbach 4",bookTitle:"The First Cave",address:" College University, 124 First St, Ann Arbor, MI"},{type:"Author",guid:"4995bc3737196",fullName:"Boyce Baughman 3",bookTitle:"The Stone of Madness",address:" Stanford University, 366 Second St, London, UK"},{type:"Author",guid:"4995bc37371ac",fullName:"Godric Sommer 3",bookTitle:"Killer of Night",address:" London University, 489 Oak Ave, Southampton, UK"},{type:"Author",guid:"4995bc37371c1",fullName:"Kenelm Tomco 2",bookTitle:"The Fury of the Master",address:" UC Santa Cruz, 142 Bloom St, London, UK"},{type:"Author",guid:"4995bc37371d4",fullName:"Wendell Osteen 3",bookTitle:"The Fear Awakening",address:" New York University, 419 First St, Santa Clara, CA"},{type:"Author",guid:"4995bc37371eb",fullName:"Antwan Biery 4",bookTitle:"The Day of the Invasion",address:" Santa Clara University, 445 Fifth Ave, Cupertino, CA"},{type:"Author",guid:"4995bc37371ff",fullName:"Stacy Moffat 4",bookTitle:"Door of Horror",address:" College University, 282 Oak Ave, Ann Arbor, MI"},{type:"Author",guid:"4995bc3737213",fullName:"Alyx Hincken 3",bookTitle:"The Day Nemesis",address:" CalTech, 235 University Loop, St. Louis, MO"},{type:"Author",guid:"4995bc3737227",fullName:"Silvester Mcfall 1",bookTitle:"The Monster",address:" Springfield University, 86 Lazaneo St, Southampton, UK"},{type:"Author",guid:"4995bc373723a",fullName:"Janella Warner 2",bookTitle:"The Madness Man",address:" Stanford University, 96 Dana St, Ann Arbor, MI"},{type:"Author",guid:"4995bc373724e",fullName:"Braeden Seidner 2",bookTitle:"The Menace Pit",address:" Santa Clara University, 154 Bloom St, New York, NY"},{type:"Author",guid:"4995bc3737263",fullName:"Cyrus Hatfield 2",bookTitle:"The Night Nightmares",address:" Michigan State University, 46 Van Ness Blvd, St. Louis, MO"},{type:"Author",guid:"4995bc3737277",fullName:"Carly Reiss 4",bookTitle:"The Spiders of Fear",address:" CalTech, 420 Dana St, San Francisco, CA"},{type:"Author",guid:"4995bc373728b",fullName:"Anselm Swift 4",bookTitle:"The Final Time",address:" Stanford University, 203 Main St, Seattle, WA"},{type:"Author",guid:"4995bc373729f",fullName:"Dallas Hawker 2",bookTitle:"The Day Galaxy",address:" CalTech, 195 First St, San Francisco, CA"},{type:"Author",guid:"4995bc37372b3",fullName:"Horatio Hutton 1",bookTitle:"The Time Ambassador",address:" Springfield University, 183 Castro St, Palo Alto, CA"},{type:"Author",guid:"4995bc37372c7",fullName:"Trev Hallauer 1",bookTitle:"The Final Time",address:" New York University, 51 Broadway Blvd, Los Angeles, CA"},{type:"Author",guid:"4995bc37372db",fullName:"Sharyn Quinn 4",bookTitle:"The Reign of Day",address:" Foothill College, 493 Lazaneo St, Palo Alto, CA"},{type:"Author",guid:"4995bc37372ee",fullName:"Raphael Wilks 1",bookTitle:"The Masque of Death",address:" New York University, 96 Oak Ave, Los Angeles, CA"}];
sc_require("core");sc_require("models/record");SC.Query=SC.Object.extend(SC.Copyable,SC.Freezable,{isQuery:YES,conditions:null,orderBy:null,recordType:null,recordTypes:null,expandedRecordTypes:function(){var b=SC.CoreSet.create(),a,c;
if(a=this.get("recordType")){this._scq_expandRecordType(a,b)}else{if(a=this.get("recordTypes")){a.forEach(function(e){this._scq_expandRecordType(e,b)
},this)}else{this._scq_expandRecordType(SC.Record,b)}}c=SC.Query._scq_queriesWithExpandedRecordTypes;
if(!c){c=SC.Query._scq_queriesWithExpandedRecordTypes=SC.CoreSet.create()}c.add(this);
return b.freeze()}.property("recordType","recordTypes").cacheable(),_scq_expandRecordType:function(b,a){if(a.contains(b)){return
}a.add(b);if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)}b.subclasses.forEach(function(c){this._scq_expandRecordType(c,a)
},this)},parameters:null,location:"local",scope:null,isRemote:function(){return this.get("location")===SC.Query.REMOTE
}.property("location").cacheable(),isLocal:function(){return this.get("location")===SC.Query.LOCAL
}.property("location").cacheable(),isEditable:NO,contains:function(a,e){var f,b=YES;
if(f=this.get("recordTypes")){b=f.find(function(g){return SC.kindOf(a,g)})}else{if(f=this.get("recordType")){b=SC.kindOf(a,f)
}}if(!b){return NO}var c=this.get("scope");if(c&&!c.contains(a)){return NO}if(!this._isReady){this.parse()
}if(!this._isReady){return NO}if(e===undefined){e=this.parameters||this}return this._tokenTree.evaluate(a,e)
},containsRecordTypes:function(a){var b=this.get("recordType");if(b){return !!a.find(function(c){return SC.kindOf(c,b)
})}else{if(b=this.get("recordTypes")){return !!b.find(function(c){return !!a.find(function(e){return SC.kindOf(e,c)
})})}else{return YES}}},compare:function(g,e){var c=0,f,b,a,h;if(g===e){return 0}if(!this._isReady){this.parse()
}if(!this._isReady){return SC.compare(g.get("id"),e.get("id"))}b=this._order;if(SC.typeOf(b)===SC.T_FUNCTION){c=b.call(null,g,e)
}else{a=b?b.length:0;for(h=0;c===0&&(h<a);h++){f=b[h].propertyName;if(SC.Query.comparisons[f]){c=SC.Query.comparisons[f](g.get(f),e.get(f))
}else{c=SC.compare(g.get(f),e.get(f))}if((c!==0)&&b[h].descending){c=(-1)*c}}}if(c!==0){return c
}else{return SC.compare(g.get("id"),e.get("id"))}},_isReady:NO,parse:function(){var c=this.get("conditions"),e=this.get("queryLanguage"),b,a;
b=this._tokenList=this.tokenizeString(c,e);a=this._tokenTree=this.buildTokenTree(b,e);
this._order=this.buildOrder(this.get("orderBy"));this._isReady=!!a&&!a.error;if(a&&a.error){throw a.error
}return this._isReady},queryWithScope:function(c){var b=SC.keyFor("__query__",SC.guidFor(this)),a=c[b];
if(!a){c[b]=a=this.copy();a.set("scope",c);a.freeze()}return a},copyKeys:"conditions orderBy recordType recordTypes parameters location scope".w(),concatenatedProperties:"copyKeys".w(),copy:function(){var e={},c=this.get("copyKeys"),g=c?c.length:0,b,f,a;
while(--g>=0){b=c[g];f=this.get(b);if(f!==undefined){e[b]=f}}a=this.constructor.create(e);
e=null;return a},queryLanguage:{UNKNOWN:{firstCharacter:/[^\s'"\w\d\(\)\{\}]/,notAllowed:/[\s'"\w\d\(\)\{\}]/},PROPERTY:{firstCharacter:/[a-zA-Z_]/,notAllowed:/[^a-zA-Z_0-9]/,evalType:"PRIMITIVE",evaluate:function(b,a){return b.get(this.tokenValue)
}},NUMBER:{firstCharacter:/[\d\-]/,notAllowed:/[^\d\-\.]/,format:/^-?\d+$|^-?\d+\.\d+$/,evalType:"PRIMITIVE",evaluate:function(b,a){return parseFloat(this.tokenValue)
}},STRING:{firstCharacter:/['"]/,delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return this.tokenValue
}},PARAMETER:{firstCharacter:/\{/,lastCharacter:"}",delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},"%@":{rememberCount:true,reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},OPEN_PAREN:{firstCharacter:/\(/,singleCharacter:true},CLOSE_PAREN:{firstCharacter:/\)/,singleCharacter:true},AND:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e&&b}},OR:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e||b}},NOT:{reservedWord:true,rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.rightSide.evaluate(c,a);
return !b}},"=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.isEqual(e,b)}},"!=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return !SC.isEqual(e,b)}},"<":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)==-1}},"<=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)!=1}},">":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)==1}},">=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(e,b)!=-1}},BEGINS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.leftSide.evaluate(c,a);
var e=this.rightSide.evaluate(c,a);return(b&&b.indexOf(e)===0)}},ENDS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,b){var c=this.leftSide.evaluate(e,b);
var a=this.rightSide.evaluate(e,b);return(c&&c.indexOf(a)===(c.length-a.length))}},CONTAINS:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(f,a){var e=this.leftSide.evaluate(f,a)||[];
var h=this.rightSide.evaluate(f,a);var c=SC.typeOf(e);if(c===SC.T_STRING){return(e.indexOf(h)!==-1)
}else{if(c===SC.T_ARRAY||e.toArray){if(c!==SC.T_ARRAY){e=e.toArray()}var g=false;
var b=0;while(g===false&&b<e.length){if(h==e[b]){g=true}b++}return g}}}},ANY:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var g=this.leftSide.evaluate(e,a);
var b=this.rightSide.evaluate(e,a);var f=false;var c=0;while(f===false&&c<b.length){if(g==b[c]){f=true
}c++}return f}},MATCHES:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return b.test(e)}},TYPE_IS:{reservedWord:true,rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var c=SC.Store.recordTypeFor(e.storeKey);
var b=this.rightSide.evaluate(e,a);var f=SC.objectForPropertyPath(b);return c==f}},"null":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return null
}},"undefined":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return undefined
}},"false":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}},"true":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},YES:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},NO:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}}},tokenizeString:function(x,s){var l=[],v=null,j=null,g=null,w=null,a=null,k=null,e=null,h=null,u=false,b=false,n=false,o=false,p={};
function f(t,c){j=s[t];if(j.format&&!j.format.test(c)){t="UNKNOWN"}if(j.delimeted){o=true
}if(!j.delimeted){for(var i in s){if(s[i].reservedWord&&i==c){t=i}}}j=s[t];if(j&&j.rememberCount){if(!p[t]){p[t]=0
}c=p[t];p[t]+=1}l.push({tokenType:t,tokenValue:c});a=null;k=null;e=null}if(!x){return[]
}var m=x.length;for(var q=0;q<m;q++){u=(q===m-1);v=x.charAt(q);o=false;if(a){j=s[a];
b=j.delimeted?v===h:j.notAllowed.test(v);if(!b){e+=v}if(b||u){f(a,e)}if(u&&!b){o=true
}}if(!a&&!o){for(g in s){j=s[g];if(j.firstCharacter&&j.firstCharacter.test(v)){a=g
}}if(a){j=s[a];e=v;if(j.delimeted){e="";if(j.lastCharacter){h=j.lastCharacter}else{h=v
}}if(j.singleCharacter||u){f(a,e)}}}}return l},buildTokenTree:function(m,a){var p=m.slice();
var s=0;var u=[];var c=false;var q=[];if(!m||m.length===0){return{evaluate:function(){return true
}}}function t(i){var x=i;if(x<0){return false}var l=a[p[x].tokenType];if(!l){q.push("logic for token '"+p[x].tokenType+"' is not defined");
return false}p[x].evaluate=l.evaluate;return l}function b(x,i){var y=i;var l=t(y);
if(!l){return false}if(x=="left"){return l.leftType}if(x=="right"){return l.rightType
}}function o(i){var x=i;var l=t(x);if(!l){return false}else{return l.evalType}}function g(i){p.splice(i,1);
if(i<=s){s--}}function v(i){var l=i||s;if(l>0){return true}else{return false}}function k(i){var l=i;
if(l<0){return true}return(b("left",l)&&!p[l].leftSide)||(b("right",l)&&!p[l].rightSide)
}function j(l,x){var i=(x<l)?"left":"right";if(l<0||x<0){return false}if(!b(i,l)){return false
}if(!o(x)){return false}if(b(i,l)==o(x)){return true}else{return false}}function n(i){var l=i;
if(!k(l)){return false}if(!v(l)){return false}if(j(l,l-1)){return true}else{return false
}}function e(i){var l=i;if(k(l)){return false}if(!v(l)){return false}if(!k(l-1)){return false
}if(j(l-1,l)){return true}else{return false}}function h(i){var l=i;if(l<1){return false
}p[l].leftSide=p[l-1];g(l-1)}function w(i){var l=i;if(l<1){return false}p[l-1].rightSide=p[l];
g(l)}function f(i){g(i);g(u.pop())}for(s=0;s<p.length;s++){c=false;if(p[s].tokenType=="UNKNOWN"){q.push("found unknown token: "+p[s].tokenValue)
}if(p[s].tokenType=="OPEN_PAREN"){u.push(s)}if(p[s].tokenType=="CLOSE_PAREN"){f(s)
}if(n(s)){h(s)}if(e(s)){w(s);c=true}if(c){s--}}if(p.length==1){p=p[0]}else{q.push("string did not resolve to a single tree")
}if(q.length>0){return{error:q.join(",\n"),tree:p}}else{return p}},buildOrder:function(a){if(!a){return[]
}else{if(SC.typeOf(a)===SC.T_FUNCTION){return a}else{var e=a.split(",");for(var b=0;
b<e.length;b++){var c=e[b];c=c.replace(/^\s+|\s+$/,"");c=c.replace(/\s+/,",");c=c.split(",");
e[b]={propertyName:c[0]};if(c[1]&&c[1]=="DESC"){e[b].descending=true}}return e}}}});
SC.Query.mixin({LOCAL:"local",REMOTE:"remote",storeKeyFor:function(a){return a?a.get("storeKey"):null
},containsRecords:function(h,f,e){var g=[];for(var b=0,a=f.get("length");b<a;b++){var c=f.objectAt(b);
if(c&&h.contains(c)){g.push(c.get("storeKey"))}}g=SC.Query.orderStoreKeys(g,h,e);
return g},orderStoreKeys:function(f,g,b){if(f){var a=SC.Query,e=a._TMP_STORES,h=a._TMP_QUERIES;
if(!e){e=a._TMP_STORES=[]}if(!h){h=a._TMP_QUERIES=[]}e.push(b);h.push(g);var c=f.sort(SC.Query.compareStoreKeys);
a._TMP_STORES.pop();a._TMP_QUERIES.pop()}return f},compareStoreKeys:function(j,g){var o=SC.Query,m=o._TMP_STORES,b=o._TMP_QUERIES,p=m[m.length-1],n=b[b.length-1],c=n.compare,e=p.materializeRecord(j),a=p.materializeRecord(g);
if(c!==o.prototype.compare){return c.call(n,e,a)}else{var q=0,l,f,k,h;if(e===a){return 0
}if(!n._isReady){n.parse()}if(!n._isReady){return SC.compare(e.get("id"),a.get("id"))
}f=n._order;if(SC.typeOf(f)===SC.T_FUNCTION){q=f.call(null,e,a)}else{k=f?f.length:0;
for(h=0;q===0&&(h<k);h++){l=f[h].propertyName;if(SC.Query.comparisons[l]){q=SC.Query.comparisons[l](e.get(l),a.get(l))
}else{q=SC.compare(e.get(l),a.get(l))}if((q!==0)&&f[h].descending){q=(-1)*q}}}if(q!==0){return q
}else{return SC.compare(e.get("id"),a.get("id"))}}},build:function(i,c,h,e){var a=null,g,b,j,f;
if(c&&c.isQuery){if(c.get("location")===i){return c}else{return c.copy().set("location",i).freeze()
}}if(typeof c===SC.T_STRING){g=SC.objectForPropertyPath(c);if(!g){throw"%@ did not resolve to a class".fmt(c)
}c=g}else{if(c&&c.isEnumerable){g=[];c.forEach(function(k){if(typeof k===SC.T_STRING){k=SC.objectForPropertyPath(k)
}if(!k){throw"cannot resolve record types: %@".fmt(c)}g.push(k)},this);c=g}else{if(!c){c=SC.Record
}}}if(e===undefined){e=null}if(h===undefined){h=null}if(!e&&(typeof h!==SC.T_STRING)){a=h;
h=null}if(!e&&!a){f=SC.Query._scq_recordTypeCache;if(!f){f=SC.Query._scq_recordTypeCache={}
}b=f[i];if(!b){b=f[i]={}}if(c.isEnumerable){j=c.map(function(l){return SC.guidFor(l)
});j=j.sort().join(":")}else{j=SC.guidFor(c)}if(h){j=[j,h].join("::")}g=b[j];if(!g){if(c.isEnumerable){a={recordTypes:c.copy()}
}else{a={recordType:c}}a.location=i;a.conditions=h;g=b[j]=SC.Query.create(a).freeze()
}}else{if(!a){a={}}if(!a.location){a.location=i}if(c&&c.isEnumerable){a.recordsTypes=c
}else{a.recordType=c}if(h){a.conditions=h}if(e){a.parameters=e}g=SC.Query.create(a).freeze()
}return g},local:function(c,a,b){return this.build(SC.Query.LOCAL,c,a,b)},remote:function(c,a,b){return this.build(SC.Query.REMOTE,c,a,b)
},_scq_didDefineRecordType:function(){var a=SC.Query._scq_queriesWithExpandedRecordTypes;
if(a){a.forEach(function(b){b.notifyPropertyChange("expandedRecordTypes")},this);
a.clear()}}});SC.Query.comparisons={};SC.Query.registerComparison=function(a,b){SC.Query.comparisons[a]=b
};SC.Query.registerQueryExtension=function(b,a){SC.Query.prototype.queryLanguage[b]=a
};SC.Q=SC.Query.from;sc_require("core");sc_require("models/record");sc_require("system/query");
SC.ChildRecord=SC.Record.extend({isChildRecord:YES,type:null,primaryKey:"childRecordKey",_parentRecord:null,status:function(){var a=SC.Record.EMPTY;
if(this._parentRecord){a=this._parentRecord.get("status");this.store.writeStatus(this.storeKey,a);
this.store.dataHashDidChange(this.storeKey)}else{a=this.store.readStatus(this.storeKey)
}return a}.property("storeKey").cacheable(),recordDidChange:function(){if(this._parentRecord&&this._parentRecord.recordDidChange){this._parentRecord.recordDidChange()
}else{arguments.callee.base.apply(this,arguments)}},createChildRecord:function(e,c){var a,b=this._parentRecord;
if(b){a=b.createChildRecord(e,c)}else{a=arguments.callee.base.apply(this,arguments)
}return a}});sc_require("models/record");sc_require("models/child_record");SC.RecordAttribute=SC.Object.extend({defaultValue:null,type:String,key:null,isRequired:NO,isEditable:YES,useIsoDate:YES,aggregate:NO,typeClass:function(){var a=this.get("type");
if(SC.typeOf(a)===SC.T_STRING){a=SC.objectForPropertyPath(a)}return a}.property("type").cacheable(),transform:function(){var a=this.get("typeClass")||String,c=SC.RecordAttribute.transforms,b;
while(a&&!(b=c[SC.guidFor(a)])){if(a.superclass.hasOwnProperty("create")){a=a.superclass
}else{a=SC.T_FUNCTION}}return b}.property("typeClass").cacheable(),toType:function(a,c,f){var b=this.get("transform"),e=this.get("typeClass");
if(b&&b.to){f=b.to(f,this,e,a,c)}return f},fromType:function(a,c,f){var b=this.get("transform"),e=this.get("typeClass");
if(b&&b.from){f=b.from(f,this,e,a,c)}return f},call:function(a,b,c){var e=this.get("key")||b,f;
if((c!==undefined)&&this.get("isEditable")){f=this.fromType(a,b,c);a.writeAttribute(e,f)
}f=c=a.readAttribute(e);if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if((f!==c)&&a.get("store").readDataHash(a.get("storeKey"))){a.writeAttribute(e,c,true)
}}}else{c=this.toType(a,b,c)}return c},isProperty:YES,isCacheable:YES,dependentKeys:[],init:function(){arguments.callee.base.apply(this,arguments);
this.cacheKey="__cache__"+SC.guidFor(this);this.lastSetValueKey="__lastValue__"+SC.guidFor(this)
}});SC.RecordAttribute.attr=function(a,b){if(!b){b={}}if(!b.type){b.type=a||String
}return this.create(b)};SC.RecordAttribute.transforms={};SC.RecordAttribute.registerTransform=function(a,b){SC.RecordAttribute.transforms[SC.guidFor(a)]=b
};SC.RecordAttribute.registerTransform(Boolean,{to:function(a){return SC.none(a)?null:!!a
}});SC.RecordAttribute.registerTransform(Number,{to:function(a){return SC.none(a)?null:Number(a)
}});SC.RecordAttribute.registerTransform(String,{to:function(a){if(!(typeof a===SC.T_STRING)&&!SC.none(a)&&a.toString){a=a.toString()
}return a}});SC.RecordAttribute.registerTransform(Array,{to:function(a){if(!SC.isArray(a)&&!SC.none(a)){a=[]
}return a}});SC.RecordAttribute.registerTransform(Object,{to:function(a){if(!(typeof a==="object")&&!SC.none(a)){a={}
}return a}});SC.RecordAttribute.registerTransform(SC.Record,{to:function(f,a,e,c){var b=c.get("store");
if(SC.none(f)||(f==="")){return null}else{return b.find(e,f)}},from:function(a){return a?a.get("id"):null
}});SC.RecordAttribute.registerTransform(SC.T_FUNCTION,{to:function(f,a,e,c){e=e.apply(c);
var b=c.get("store");return b.find(e,f)},from:function(a){return a.get("id")}});SC.RecordAttribute.registerTransform(Date,{to:function(i,a){if(i===null){return null
}var c;i=i.toString()||"";if(a.get("useIsoDate")){var e="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",h=i.match(new RegExp(e)),g=0,b=new Date(h[1],0,1),f;
if(h[3]){b.setMonth(h[3]-1)}if(h[5]){b.setDate(h[5])}if(h[7]){b.setHours(h[7])}if(h[8]){b.setMinutes(h[8])
}if(h[10]){b.setSeconds(h[10])}if(h[12]){b.setMilliseconds(Number("0."+h[12])*1000)
}if(h[14]){g=(Number(h[16])*60)+Number(h[17]);g*=((h[15]=="-")?1:-1)}g-=b.getTimezoneOffset();
f=(Number(b)+(g*60*1000));c=new Date();c.setTime(Number(f))}else{c=new Date(Date.parse(i))
}return c},_dates:{},_zeropad:function(a){return((a<0)?"-":"")+((a<10)?"0":"")+Math.abs(a)
},from:function(b){var a=this._dates[b.getTime()];if(a){return a}var e=this._zeropad,c=0-b.getTimezoneOffset()/60;
c=(c===0)?"Z":"%@:00".fmt(e(c));this._dates[b.getTime()]=a="%@-%@-%@T%@:%@:%@%@".fmt(e(b.getFullYear()),e(b.getMonth()+1),e(b.getDate()),e(b.getHours()),e(b.getMinutes()),e(b.getSeconds()),c);
return a}});if(SC.DateTime&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}sc_require("models/record");sc_require("models/record_attribute");SC.ChildAttribute=SC.RecordAttribute.extend({isChildRecordTransform:YES,toType:function(e,c,f){var b=null,g=SC.keyFor("__kid__",SC.guidFor(this)),h=this.get("typeClass");
if(e[g]){return e[g]}if(!e){throw"SC.Child: Error during transform: Unable to retrieve parent record."
}if(f){var a=e.get("childRecordNamespace");if(f.type&&!SC.none(a)){h=a[f.type]}if(!h||SC.typeOf(h)!==SC.T_CLASS){throw"SC.Child: Error during transform: Invalid record type."
}b=e[g]=e.registerChildRecord(h,f)}return b},fromType:function(a,b,c){return c},call:function(a,b,c){var e=this.get("key")||b,g=SC.keyFor("__kid__",SC.guidFor(this)),f;
if(c!==undefined){this.orphan(a);f=this.fromType(a,b,c);a[g]=null;a.writeAttribute(e,f);
c=this.toType(a,b,c)}else{c=a.readAttribute(e);if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if(a.attributes()){a.writeAttribute(e,c,true)}}}else{c=this.toType(a,b,c)}}return c
},orphan:function(f){var i=SC.keyFor("__kid__",SC.guidFor(this)),b,g,c,e,h,a;a=f?f[i]:null;
if(a){c=a.get("readOnlyAttributes");for(e in c){h=a[e];if(h&&h.isChildRecordTransform){h.orphan(f)
}}b=a.get("store");if(b){g=a.storeKey}if(g){b.unloadRecord(undefined,undefined,g)
}}}});sc_require("models/record");sc_require("models/record_attribute");sc_require("models/child_attribute");
SC.ChildrenAttribute=SC.ChildAttribute.extend({toType:function(b,e,f){var h=this.get("key")||e,g=SC.keyFor("__kidsArray__",SC.guidFor(this)),c=b[g],i=this.get("typeClass"),a;
if(!c){c=SC.ChildArray.create({record:b,propertyName:h,defaultRecordType:i});b[g]=this._cachedRef=c;
a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c},orphan:function(a){var f=this._cachedRef,g,j,i,h,c,b,e;
if(f){f.forEach(function(k){i=k.get("readOnlyAttributes");for(h in i){b=k[h];if(b&&b.isChildRecordTransform){b.orphan(a)
}}g=k.get("store");if(g){j=k.storeKey}if(j){g.unloadRecord(undefined,undefined,j)
}},this)}}});sc_require("models/record");sc_require("models/record_attribute");SC.FetchedAttribute=SC.RecordAttribute.extend({paramValueKey:"link",paramOwnerKey:"owner",paramRelKey:"rel",queryKey:null,isEditable:NO,toType:function(e,j,h){var i=e.get("store");
if(!i){return null}var b=this.get("paramValueKey"),a=this.get("paramOwnerKey"),g=this.get("paramRelKey"),f=this.get("queryKey")||this.get("typeClass"),c={};
if(b){c[b]=h}if(a){c[a]=e}if(g){c[g]=this.get("key")||j}return i.findAll(f,c)},fromType:function(a,b,c){return c
}});sc_require("models/record");sc_require("models/record_attribute");SC.ManyAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,orderBy:null,toType:function(b,e,g){var f=this.get("typeClass"),i=this.get("key")||e,h=SC.keyFor("__manyArray__",SC.guidFor(this)),c=b[h],a;
if(!c){c=SC.ManyArray.create({recordType:f,record:b,propertyName:i,manyAttribute:this});
b[h]=c;a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c
},fromType:function(b,f,g){var c=[];if(!SC.isArray(g)){throw"Expects toMany attribute to be an array"
}var a=g.get("length");for(var e=0;e<a;e++){c[e]=g.objectAt(e).get("id")}return c
},inverseDidRemoveRecord:function(a,b,c,e){var f=a.get(b);if(f){f.removeInverseRecord(c)
}},inverseDidAddRecord:function(a,b,c,e){var f=a.get(b);if(f){f.addInverseRecord(c)
}}});sc_require("models/record");sc_require("models/record_attribute");SC.SingleAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,call:function(c,j,b){var a=this.get("key")||j,i,h,k,g,f,e;
if(b!==undefined&&this.get("isEditable")){if(b&&!SC.kindOf(b,SC.Record)){throw"%@ is not an instance of SC.Record".fmt(b)
}i=this.get("inverse");if(i){k=this._scsa_call(c,j)}e=this.fromType(c,j,b);c.writeAttribute(a,e,!this.get("isMaster"));
f=b;if(i&&(k!==b)){if(k&&(g=k[i])){g.inverseDidRemoveRecord(k,i,c,j)}if(b&&(g=b[i])){g.inverseDidAddRecord(b,i,c,j)
}}}else{f=this._scsa_call(c,j,b)}return f},_scsa_call:SC.RecordAttribute.prototype.call,inverseDidRemoveRecord:function(c,g,h,i){var b=this.get("inverse"),f=this._scsa_call(c,g),e=this.get("isMaster"),a;
c.writeAttribute(g,null,!e);c.notifyPropertyChange(g);if((f!==h)||(i!==b)){if(f&&(a=f[b])){a.inverseDidRemoveRecord(f,b,c,g)
}}},inverseDidAddRecord:function(a,i,c,h){var f=this.get("inverse"),j=this._scsa_call(a,i),g=this.get("isMaster"),e,b;
b=this.fromType(a,i,c);a.writeAttribute(i,b,!g);a.notifyPropertyChange(i);if((j!==c)||(h!==f)){if(j&&(e=j[f])){e.inverseDidRemoveRecord(j,f,a,i)
}}}});SC.ChildArray=SC.Object.extend(SC.Enumerable,SC.Array,{defaultRecordType:null,record:null,propertyName:null,children:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyChildren:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableChildren:function(){var a=this.get("store"),e=this.get("storeKey"),c=this.get("propertyName"),b,f;
b=a.readEditableProperty(e,c);if(!b){f=a.readEditableDataHash(e);b=f[c]=[]}if(b!==this._prevChildren){this.recordPropertyDidChange()
}return b}.property(),length:function(){var a=this.get("readOnlyChildren");return a?a.length:0
}.property("readOnlyChildren"),objectAt:function(b){var f=this._records,e=this.get("readOnlyChildren"),g,c;
var a=e?e.length:0;if(!e){return undefined}if(f&&(c=f[b])){return c}if(!f){this._records=f=[]
}if(b>=a){return undefined}g=e.objectAt(b);if(!g){return undefined}f[b]=c=this._materializeChild(g);
return c},replace:function(l,a,k){var b=this.get("editableChildren"),h=k?(k.get?k.get("length"):k.length):0,g=this.get("record"),e=this.get("propertyName"),j,c;
b.replace(l,a,k);for(var f=l;f<=l+a;f+=1){this.objectAt(f)}g.recordDidChange(e);return this
},normalize:function(){this.forEach(function(b,a){if(b.normalize){b.normalize()}})
},_materializeChild:function(f){var i=this.get("store"),b=this.get("record"),e=this.get("defaultRecordType"),a,g,j,c;
if(!b){return undefined}var h=b.get("childRecordNamespace");if(f.type&&!SC.none(h)){e=h[f.type]
}if(!e||SC.typeOf(e)!==SC.T_CLASS){throw"ChildrenArray: Error during transform: Invalid record type."
}c=e.prototype.primaryKey||"childRecordKey";a=f[c];j=i.storeKeyExists(e,a);if(j){g=i.materializeRecord(j)
}else{g=b.registerChildRecord(e,f)}return g},recordPropertyDidChange:function(e){if(e&&!e.contains(this.get("propertyName"))){return this
}var b=this.get("readOnlyChildren");var c=this._prevChildren,g=this._childrenContentDidChange;
if(b===c){return this}if(c){c.removeObserver("[]",this,g)}this._prevChildren=b;if(b){b.addObserver("[]",this,g)
}var a=(b)?b.propertyRevision:-1;this._childrenContentDidChange(b,"[]",b,a)},_childrenContentDidChange:function(e,b,c,a){this._records=null;
this.enumerableContentDidChange()},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});SC.ManyArray=SC.Object.extend(SC.Enumerable,SC.Array,{recordType:null,record:null,propertyName:null,manyAttribute:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyStoreIds:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableStoreIds:function(){var a=this.get("store"),e=this.get("storeKey"),c=this.get("propertyName"),b,f;
b=a.readEditableProperty(e,c);if(!b){f=a.readEditableDataHash(e);b=f[c]=[]}if(b!==this._prevStoreIds){this.recordPropertyDidChange()
}return b}.property(),isEditable:function(){var a=this.manyAttribute;return a?a.get("isEditable"):NO
}.property("manyAttribute").cacheable(),inverse:function(){var a=this.manyAttribute;
return a?a.get("inverse"):null}.property("manyAttribute").cacheable(),isMaster:function(){var a=this.manyAttribute;
return a?a.get("isMaster"):null}.property("manyAttribute").cacheable(),orderBy:function(){var a=this.manyAttribute;
return a?a.get("orderBy"):null}.property("manyAttribute").cacheable(),length:function(){var a=this.get("readOnlyStoreIds");
return a?a.get("length"):0}.property("readOnlyStoreIds"),objectAt:function(a){var h=this._records,g=this.get("readOnlyStoreIds"),c=this.get("store"),i=this.get("recordType"),f,e,b;
if(!g||!c){return undefined}if(h&&(e=h[a])){return e}if(!h){this._records=h=[]}b=g.objectAt(a);
if(b){f=c.storeKeyFor(i,b);if(c.readStatus(f)===SC.Record.EMPTY){c.retrieveRecord(i,null,f)
}h[a]=e=c.materializeRecord(f)}return e},replace:function(o,e,n){if(!this.get("isEditable")){throw"%@.%@[] is not editable".fmt(this.get("record"),this.get("propertyName"))
}var c=this.get("editableStoreIds"),l=n?(n.get?n.get("length"):n.length):0,j=this.get("record"),f=this.get("propertyName"),h,p,a,b,g,m,k;
a=[];for(h=0;h<l;h++){a[h]=n.objectAt(h).get("id")}g=this.get("inverse");if(g&&e>0){b=SC.ManyArray._toRemove;
if(b){SC.ManyArray._toRemove=null}else{b=[]}for(h=0;h<e;h++){b[h]=this.objectAt(o+h)
}}c.replace(o,e,a);if(g){for(h=0;h<e;h++){k=b[h];m=k?k[g]:null;if(m&&m.inverseDidRemoveRecord){m.inverseDidRemoveRecord(k,g,j,f)
}}if(b){b.length=0;if(!SC.ManyArray._toRemove){SC.ManyArray._toRemove=b}}for(h=0;
h<l;h++){k=n.objectAt(h);m=k?k[g]:null;if(m&&m.inverseDidAddRecord){m.inverseDidAddRecord(k,g,j,f)
}}}if(j&&(!g||this.get("isMaster"))){j.recordDidChange(f)}return this},removeInverseRecord:function(c){if(!c){return this
}var f=c.get("id"),e=this.get("editableStoreIds"),a=(e&&f)?e.indexOf(f):-1,b;if(a>=0){e.removeAt(a);
if(this.get("isMaster")&&(b=this.get("record"))){b.recordDidChange(this.get("propertyName"))
}}return this},addInverseRecord:function(e){if(!e){return this}var h=e.get("id"),f=this.get("editableStoreIds"),g=this.get("orderBy"),b=f.get("length"),a,c;
if(g){a=this._findInsertionLocation(e,0,b,g)}else{a=b}f.insertAt(a,e.get("id"));if(this.get("isMaster")&&(c=this.get("record"))){c.recordDidChange(this.get("propertyName"))
}return this},_findInsertionLocation:function(h,e,c,g){var b=e+Math.floor((c-e)/2),f=this.objectAt(b),a=this._compare(h,f,g);
if(a<0){if(b===0){return b}else{return this._findInsertionLocation(h,0,b,g)}}else{if(a>0){if(b>=c){return b
}else{return this._findInsertionLocation(h,b,c,g)}}else{return b}}},_compare:function(g,f,j){var i=SC.typeOf(j),h,e,c;
if(i===SC.T_FUNCTION){h=j(g,f)}else{if(i===SC.T_STRING){h=SC.compare(g,f)}else{c=j.get("length");
h=0;for(e=0;(h===0)&&(e<c);e++){h=SC.compare(g,f)}}}return h},recordPropertyDidChange:function(c){if(c&&!c.contains(this.get("propertyName"))){return this
}var g=this.get("readOnlyStoreIds");var b=this._prevStoreIds,e=this._storeIdsContentDidChange;
if(g===b){return this}if(b){b.removeObserver("[]",this,e)}this._prevStoreIds=g;if(g){g.addObserver("[]",this,e)
}var a=(g)?g.propertyRevision:-1;this._storeIdsContentDidChange(g,"[]",g,a)},_storeIdsContentDidChange:function(e,b,c,a){this._records=null;
this.enumerableContentDidChange()},unknownProperty:function(b,c){var a=this.reducedProperty(b,c);
return a===undefined?arguments.callee.base.apply(this,arguments):a},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");SC.Store=SC.Object.extend({name:null,nestedStores:null,dataSource:null,isNested:NO,commitRecordsAutomatically:NO,from:function(a){this.set("dataSource",a);
return this},_getDataSource:function(){var a=this.get("dataSource");if(typeof a===SC.T_STRING){a=SC.objectForPropertyPath(a);
if(a){a=a.create()}if(a){this.set("dataSource",a)}}return a},cascade:function(a){var b=SC.A(arguments);
a=SC.CascadeDataSource.create({dataSources:b});return this.from(a)},chain:function(b,c){if(!b){b={}
}b.parentStore=this;if(c){if(SC.typeOf(c)!=="class"){throw new Error("%@ is not a valid class".fmt(c))
}if(!SC.kindOf(c,SC.NestedStore)){throw new Error("%@ is not a type of SC.NestedStore".fmt(c))
}}else{c=SC.NestedStore}var a=c.create(b),e=this.nestedStores;if(!e){e=this.nestedStores=[]
}e.push(a);return a},willDestroyNestedStore:function(a){if(this.nestedStores){this.nestedStores.removeObject(a)
}return this},hasNestedStore:function(a){while(a&&(a!==this)){a=a.get("parentStore")
}return a===this},dataHashes:null,statuses:null,revisions:null,editables:null,changelog:null,recordArraysWithQuery:null,recordErrors:null,queryErrors:null,storeKeyEditState:function(b){var c=this.editables,a=this.locks;
return(c&&c[b])?SC.Store.EDITABLE:SC.Store.LOCKED},readDataHash:function(a){return this.dataHashes[a]
},readEditableDataHash:function(b){var a=this.dataHashes[b];if(!a){return a}var c=this.editables;
if(!c){c=this.editables=[]}if(!c[b]){c[b]=1;a=this.dataHashes[b]=SC.clone(a,YES)}return a
},readEditableProperty:function(c,a){var f=this.readEditableDataHash(c),e=this.editables[c],b=f[a];
if(e===1){e=this.editables[c]={}}if(!e[a]){b=f[a];if(b&&b.isCopyable){b=f[a]=b.copy()
}e[a]=YES}return b},writeDataHash:function(b,e,a){if(e){this.dataHashes[b]=e}if(a){this.statuses[b]=a
}var c=this.editables;if(!c){c=this.editables=[]}c[b]=1;return this},removeDataHash:function(b,a){this.dataHashes[b]=null;
this.statuses[b]=a||SC.Record.EMPTY;var c=this.editables;if(c){c[b]=0}return this
},readStatus:function(a){this.readDataHash(a);return this.statuses[a]||SC.Record.EMPTY
},peekStatus:function(a){return this.statuses[a]||SC.Record.EMPTY},writeStatus:function(b,a){return this.writeDataHash(b,null,a)
},dataHashDidChange:function(i,e,f,g){if(!e){e=SC.Store.generateStoreKey()}var c,b,a,h;
c=SC.typeOf(i)===SC.T_ARRAY;if(c){b=i.length}else{b=1;h=i}for(a=0;a<b;a++){if(c){h=i[a]
}this.revisions[h]=e;this._notifyRecordPropertyChange(h,f,g)}return this},_notifyRecordPropertyChange:function(n,f,m){var a=this.records,h=this.get("nestedStores"),i=SC.Store,c,b,g,l,k,e,o;
g=h?h.length:0;for(l=0;l<g;l++){k=h[l];e=k.peekStatus(n);b=k.storeKeyEditState(n);
if(b===i.INHERITED){k._notifyRecordPropertyChange(n,f,m)}else{if(e&SC.Record.BUSY){if(k.get("hasChanges")){throw i.CHAIN_CONFLICT_ERROR
}k.reset()}}}var j=this.recordPropertyChanges;if(!j){j=this.recordPropertyChanges={storeKeys:SC.CoreSet.create(),records:SC.CoreSet.create(),hasDataChanges:SC.CoreSet.create(),propertyForStoreKeys:{}}
}j.storeKeys.add(n);if(a&&(c=a[n])){j.records.push(n);if(!f){j.hasDataChanges.push(n)
}if(m){if(!(o=j.propertyForStoreKeys[n])){o=j.propertyForStoreKeys[n]=SC.CoreSet.create()
}if(o!=="*"){o.add(m)}}else{j.propertyForStoreKeys[n]="*"}}this.invokeOnce(this.flush);
return this},flush:function(){if(!this.recordPropertyChanges){return this}var j=this.recordPropertyChanges,i=j.storeKeys,m=j.hasDataChanges,a=j.records,g=j.propertyForStoreKeys,e=SC.CoreSet.create(),c,b,f,k,h,l,n;
i.forEach(function(o){if(a.contains(o)){f=m.contains(o)?NO:YES;c=this.records[o];
n=g?g[o]:null;if(n==="*"){n=null}a.remove(o);if(c){c.storeDidChangeProperties(f,n)
}}b=SC.Store.recordTypeFor(o);e.add(b)},this);if(i.get("length")>0){this._notifyRecordArrays(i,e)
}i.clear();m.clear();a.clear();this.recordPropertyChanges.propertyForStoreKeys={};
return this},reset:function(){this.dataHashes={};this.revisions={};this.statuses={};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.recordErrors=null;
this.queryErrors=null;var a=this.records,b;if(a){for(b in a){if(!a.hasOwnProperty(b)){continue
}this._notifyRecordPropertyChange(parseInt(b,10),NO)}}this.set("hasChanges",NO)},commitChangesFromNestedStore:function(l,m,c){if(!c){this._verifyLockRevisions(m,l.locks)
}var h=m.length,f,p,g,a,o,b,e,n,k;b=this.revisions;g=this.dataHashes;a=this.statuses;
o=this.editables;if(!o){o=this.editables=[]}e=l.dataHashes;k=l.revisions;n=l.statuses;
for(f=0;f<h;f++){p=m[f];g[p]=e[p];a[p]=n[p];b[p]=k[p];o[p]=0;this._notifyRecordPropertyChange(p,NO)
}var q=this.changelog,j=l.changelog;if(j){if(!q){q=this.changelog=SC.CoreSet.create()
}q.addEach(j)}this.changelog=q;if(!this.get("parentStore")){this.flush()}return this
},_verifyLockRevisions:function(g,j){var a=g.length,c=this.revisions,f,h,e,b;if(j&&c){for(f=0;
f<a;f++){h=g[f];e=j[h]||1;b=c[h]||1;if(e<b){throw SC.Store.CHAIN_CONFLICT_ERROR}}}return this
},find:function(b,a){if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if((arguments.length===1)&&!(b&&b.get&&b.get("isRecord"))){if(!b){throw new Error("SC.Store#find() must pass recordType or query")
}if(!b.isQuery){b=SC.Query.local(b)}return this._findQuery(b,YES,YES)}else{return this._findRecord(b,a)
}},findAll:function(c,a,b){console.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
if(!c||!c.isQuery){c=SC.Query.local(c,a,b)}return this._findQuery(c,YES,YES)},_findQuery:function(g,a,f){var b=this._scst_recordArraysByQuery,e=SC.guidFor(g),c,h;
if(!b){b=this._scst_recordArraysByQuery={}}c=b[e];if(!c&&a){b[e]=c=SC.RecordArray.create({store:this,query:g});
h=this.get("recordArrays");if(!h){this.set("recordArrays",h=SC.Set.create())}h.add(c);
if(f){this.refreshQuery(g)}}this.flush();return c},_findRecord:function(c,b){var a;
if(c&&c.get&&c.get("isRecord")){a=c.get("storeKey")}else{a=b?c.storeKeyFor(b):null
}if(a&&(this.readStatus(a)===SC.Record.EMPTY)){a=this.retrieveRecord(c,b)}return a?this.materializeRecord(a):null
},recordArrayWillDestroy:function(b){var a=this._scst_recordArraysByQuery,c=this.get("recordArrays");
if(a){delete a[SC.guidFor(b.get("query"))]}if(c){c.remove(b)}return this},refreshQuery:function(e){if(!e){throw new Error("refreshQuery() requires a query")
}var a=this._scst_recordArraysByQuery,c=a?a[SC.guidFor(e)]:null,b=this._getDataSource();
if(b&&b.fetch){if(c){c.storeWillFetchQuery(e)}b.fetch.call(b,this,e)}return this},_notifyRecordArrays:function(b,a){var c=this.get("recordArrays");
if(!c){return this}c.forEach(function(e){if(e){e.storeDidChangeStoreKeys(b,a)}},this);
return this},recordsFor:function(g){var e=[],a=g.storeKeysById(),f,c,b;for(f in a){c=a[f];
if(this.readStatus(c)!==SC.RECORD_EMPTY){e.push(c)}}if(e.length>0){b=SC.RecordArray.create({store:this,storeKeys:e})
}else{b=e}return b},_TMP_REC_ATTRS:{},materializeRecord:function(e){var a=this.records,c,f,b;
if(!a){a=this.records={}}c=a[e];if(c){return c}f=SC.Store.recordTypeFor(e);if(!f){return null
}b=this._TMP_REC_ATTRS;b.storeKey=e;b.store=this;c=a[e]=f.create(b);return c},createRecord:function(b,e,a){var j,k,c,i=SC.Record,f,h,g;
if(!a&&(j=b.prototype.primaryKey)){a=e[j];h=b.prototype[j]?b.prototype[j].defaultValue:null;
if(!a&&SC.typeOf(h)===SC.T_FUNCTION){a=e[j]=h()}}k=a?b.storeKeyFor(a):SC.Store.generateStoreKey();
c=this.readStatus(k);if((c&i.BUSY)||(c&i.READY)||(c==i.DESTROYED_DIRTY)){throw a?i.RECORD_EXISTS_ERROR:i.BAD_STATE_ERROR
}else{if(!a&&(c==SC.DESTROYED_CLEAN||c==SC.ERROR)){throw i.BAD_STATE_ERROR}}this.writeDataHash(k,(e?e:{}),i.READY_NEW);
SC.Store.replaceRecordTypeFor(k,b);this.dataHashDidChange(k);f=this.changelog;if(!f){f=SC.Set.create()
}f.add(k);this.changelog=f;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}g=this.materializeRecord(k);if(g){g.propagateToAggregates()}return g},createRecords:function(e,j,a){var h=[],c,b,f,g=j.length,i;
f=SC.typeOf(e)===SC.T_ARRAY;if(!f){c=e}for(i=0;i<g;i++){if(f){c=e[i]||SC.Record}b=a?a[i]:undefined;
h.push(this.createRecord(c,j[i],b))}return h},unloadRecord:function(g,f,e,c){if(e===undefined){e=g.storeKeyFor(f)
}var b=this.readStatus(e),a=SC.Record;c=c||a.EMPTY;if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this
}else{if(b&a.BUSY){throw a.BUSY_ERROR}else{b=c}}this.removeDataHash(e,b);this.dataHashDidChange(e);
return this},unloadRecords:function(e,a,h,f){var i,g,j,b,c,k;if(h===undefined){g=SC.typeOf(e)===SC.T_ARRAY;
if(!g){c=e}if(a===undefined){i=g?e.length:1;for(j=0;j<i;j++){if(g){c=e[j]}h=this.storeKeysFor(c);
this.unloadRecords(undefined,undefined,h,f)}}else{i=a.length;for(j=0;j<i;j++){if(g){c=e[j]||SC.Record
}b=a?a[j]:undefined;this.unloadRecord(c,b,undefined,f)}}}else{i=h.length;for(j=0;
j<i;j++){k=h?h[j]:undefined;this.unloadRecord(undefined,undefined,k,f)}}return this
},destroyRecord:function(g,f,e){if(e===undefined){e=g.storeKeyFor(f)}var b=this.readStatus(e),c,a=SC.Record;
if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this}else{if(b==a.EMPTY){throw a.NOT_FOUND_ERROR
}else{if(b&a.BUSY){throw a.BUSY_ERROR}else{if(b==a.READY_NEW){b=a.DESTROYED_CLEAN
}else{b=a.DESTROYED_DIRTY}}}}this.writeStatus(e,b);this.dataHashDidChange(e);c=this.changelog;
if(!c){c=this.changelog=SC.Set.create()}((b&a.DIRTY)?c.add(e):c.remove(e));this.changelog=c;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},destroyRecords:function(e,a,g){var h,f,i,b,c,j;if(g===undefined){h=a.length;f=SC.typeOf(e)===SC.T_ARRAY;
if(!f){c=e}for(i=0;i<h;i++){if(f){c=e[i]||SC.Record}b=a?a[i]:undefined;this.destroyRecord(c,b,undefined)
}}else{h=g.length;for(i=0;i<h;i++){j=g?g[i]:undefined;this.destroyRecord(undefined,undefined,j)
}}return this},recordDidChange:function(i,h,g,e,c){if(g===undefined){g=i.storeKeyFor(h)
}var b=this.readStatus(g),f,a=SC.Record;if(b&a.BUSY){throw a.BUSY_ERROR}else{if(!(b&a.READY)){throw a.NOT_FOUND_ERROR
}else{if(b!=a.READY_NEW){this.writeStatus(g,a.READY_DIRTY)}}}this.dataHashDidChange(g,null,c,e);
f=this.changelog;if(!f){f=this.changelog=SC.Set.create()}f.add(g);this.changelog=f;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},recordsDidChange:function(e,a,g){var h,f,i,b,c,j;if(g===undefined){h=a.length;f=SC.typeOf(e)===SC.T_ARRAY;
if(!f){c=e}for(i=0;i<h;i++){if(f){c=e[i]||SC.Record}b=a?a[i]:undefined;j=g?g[i]:undefined;
this.recordDidChange(c,b,j)}}else{h=g.length;for(i=0;i<h;i++){j=g?g[i]:undefined;
this.recordDidChange(undefined,undefined,j)}}return this},retrieveRecords:function(g,b,j,c){var a=this._getDataSource(),i=SC.typeOf(g)===SC.T_ARRAY,k=(!j)?b.length:j.length,l=[],h=SC.Store.generateStoreKey(),n=SC.Record,e,o,p,f,m;
if(!i){e=g}for(o=0;o<k;o++){if(j){p=j[o]}else{if(i){e=g[o]}p=e.storeKeyFor(b[o])}f=this.readStatus(p);
if((f==n.EMPTY)||(f==n.ERROR)||(f==n.DESTROYED_CLEAN)){this.writeStatus(p,n.BUSY_LOADING);
this.dataHashDidChange(p,h,YES);l.push(p)}else{if(c){if(f&n.READY){this.writeStatus(p,n.BUSY_REFRESH|(f&3));
this.dataHashDidChange(p,h,YES);l.push(p)}else{if((f==n.BUSY_DESTROYING)||(f==n.BUSY_CREATING)||(f==n.BUSY_COMMITTING)){throw n.BUSY_ERROR
}else{if(f==n.DESTROYED_DIRTY){throw n.BAD_STATE_ERROR}}}}}}m=NO;if(a){m=a.retrieveRecords.call(a,this,l,b)
}if(!m){k=l.length;h=SC.Store.generateStoreKey();for(o=0;o<k;o++){p=l[o];f=this.readStatus(p);
if(f===n.BUSY_LOADING){this.writeStatus(p,n.ERROR);this.dataHashDidChange(p,h,YES)
}else{if(f&n.BUSY_REFRESH){this.writeStatus(p,n.READY|(f&3));this.dataHashDidChange(p,h,YES)
}}}l.length=0}return l},_TMP_RETRIEVE_ARRAY:[],retrieveRecord:function(g,f,b,c){var e=this._TMP_RETRIEVE_ARRAY,a;
if(b){e[0]=b;b=e;f=null}else{e[0]=f;f=e}a=this.retrieveRecords(g,f,b,c);e.length=0;
return a[0]},refreshRecord:function(c,b,a){return !!this.retrieveRecord(c,b,a,YES)
},refreshRecords:function(b,c,e){var a=this.retrieveRecords(b,c,e,YES);return a&&a.length>0
},commitRecords:function(f,m,b,p){var l=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,c=[],j=[],k=[],q=SC.Store.generateStoreKey(),g=SC.Record,a,i,e,n,t,s,o;
if(!f&&!m&&!b){b=this.changelog}o=b?b.get("length"):(m?m.get("length"):0);for(i=0;
i<o;i++){if(b){e=b[i]}else{if(h){a=f[i]||SC.Record}else{a=f}e=a.storeKeyFor(m[i])
}n=this.readStatus(e);if((n==g.EMPTY)||(n==g.ERROR)){throw g.NOT_FOUND_ERROR}else{if(n==g.READY_NEW){this.writeStatus(e,g.BUSY_CREATING);
this.dataHashDidChange(e,q,YES);c.push(e)}else{if(n==g.READY_DIRTY){this.writeStatus(e,g.BUSY_COMMITTING);
this.dataHashDidChange(e,q,YES);j.push(e)}else{if(n==g.DESTROYED_DIRTY){this.writeStatus(e,g.BUSY_DESTROYING);
this.dataHashDidChange(e,q,YES);k.push(e)}else{if(n==g.DESTROYED_CLEAN){this.dataHashDidChange(e,q,YES)
}}}}}}if(l&&(o>0||p)){s=l.commitRecords.call(l,this,c,j,k,p)}if(s&&!f&&!m){if(b===this.changelog){this.changelog=null
}else{this.changelog.removeEach(b)}}return s},commitRecord:function(g,f,b,c){var e=this._TMP_RETRIEVE_ARRAY,a;
if(f===undefined&&b===undefined){return NO}if(b!==undefined){e[0]=b;b=e;f=null}else{e[0]=f;
f=e}a=this.commitRecords(g,f,b,c);e.length=0;return a},cancelRecords:function(f,b,j){var a=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,l=SC.Record,k=[],g,i,m,c,e,n;
i=(j===undefined)?b.length:j.length;for(m=0;m<i;m++){if(h){e=f[m]||SC.Record}else{e=f||SC.Record
}c=b?b[m]:undefined;if(j===undefined){n=e.storeKeyFor(c)}else{n=j?j[m]:undefined}if(n){g=this.readStatus(n);
if((g==l.EMPTY)||(g==l.ERROR)){throw l.NOT_FOUND_ERROR}k.push(n)}}if(a){a.cancel.call(a,this,k)
}return this},cancelRecord:function(f,e,b){var c=this._TMP_RETRIEVE_ARRAY,a;if(b!==undefined){c[0]=b;
b=c;e=null}else{c[0]=e;e=c}a=this.cancelRecords(f,e,b);c.length=0;return this},loadRecord:function(h,e,g){var a=SC.Record,c,b,f;
h=h||SC.Record;b=h.prototype.primaryKey;g=g||e[b];c=f=h.storeKeyFor(g);if(this.readStatus(f)&a.BUSY){this.dataSourceDidComplete(f,e,g)
}else{this.pushRetrieve(h,g,e,f)}return c},loadRecords:function(e,n,a){var g=SC.typeOf(e)===SC.T_ARRAY,h=n.get("length"),i=[],j=SC.Record,c,b,l,k,f,m;
if(!g){c=e||SC.Record;l=c.prototype.primaryKey}for(k=0;k<h;k++){f=n.objectAt(k);if(g){c=e.objectAt(k)||SC.Record;
l=c.prototype.primaryKey}b=(a)?a.objectAt(k):f[l];i[k]=this.loadRecord(c,f,b)}return i
},readError:function(a){var b=this.recordErrors;return b?b[a]:undefined},readQueryError:function(a){var b=this.queryErrors;
return b?b[SC.guidFor(a)]:undefined},dataSourceDidCancel:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}switch(b){case a.BUSY_LOADING:b=a.EMPTY;break;
case a.BUSY_CREATING:b=a.READY_NEW;break;case a.BUSY_COMMITTING:b=a.READY_DIRTY;break;
case a.BUSY_REFRESH_CLEAN:b=a.READY_CLEAN;break;case a.BUSY_REFRESH_DIRTY:b=a.READY_DIRTY;
break;case a.BUSY_DESTROYING:b=a.DESTROYED_DIRTY;break;default:throw a.BAD_STATE_ERROR
}this.writeStatus(c,b);this.dataHashDidChange(c,null,YES);return this},dataSourceDidComplete:function(g,f,e){var b=this.readStatus(g),a=SC.Record,c;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}if(b===a.BUSY_DESTROYING){throw a.BAD_STATE_ERROR
}else{b=a.READY_CLEAN}this.writeStatus(g,b);if(f){this.writeDataHash(g,f,b)}if(e){SC.Store.replaceIdFor(g,e)
}c=f||e?NO:YES;this.dataHashDidChange(g,null,c);return this},dataSourceDidDestroy:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.DESTROYED_CLEAN}this.removeDataHash(c,b);
this.dataHashDidChange(c);return this},dataSourceDidError:function(e,c){var b=this.readStatus(e),f=this.recordErrors,a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.ERROR}if(c&&c.isError){if(!f){f=this.recordErrors=[]
}f[e]=c}this.writeStatus(e,b);this.dataHashDidChange(e,null,YES);return this},pushRetrieve:function(g,f,c,e){var b=SC.Record,a;
if(e===undefined){e=g.storeKeyFor(f)}a=this.readStatus(e);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.READY_CLEAN;
if(c===undefined){this.writeStatus(e,a)}else{this.writeDataHash(e,c,a)}this.dataHashDidChange(e);
return e}return NO},pushDestroy:function(f,e,c){var b=SC.Record,a;if(c===undefined){c=f.storeKeyFor(e)
}a=this.readStatus(c);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.DESTROYED_CLEAN;
this.removeDataHash(c,a);this.dataHashDidChange(c);return c}return NO},pushError:function(h,g,c,e){var b=SC.Record,a,f=this.recordErrors;
if(e===undefined){e=h.storeKeyFor(g)}a=this.readStatus(e);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.ERROR;
if(c&&c.isError){if(!f){f=this.recordErrors=[]}f[e]=c}this.writeStatus(e,a);this.dataHashDidChange(e,null,YES);
return e}return NO},loadQueryResults:function(c,a){if(c.get("location")===SC.Query.LOCAL){throw new Error("Cannot load query results for a local query")
}var b=this._findQuery(c,YES,NO);if(b){b.set("storeKeys",a)}this.dataSourceDidFetchQuery(c);
return this},dataSourceDidFetchQuery:function(a){return this._scstore_dataSourceDidFetchQuery(a,YES)
},_scstore_dataSourceDidFetchQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidFetchQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidFetchQuery(e,NO)
}return this},dataSourceDidCancelQuery:function(a){return this._scstore_dataSourceDidCancelQuery(a,YES)
},_scstore_dataSourceDidCancelQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidCancelQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidCancelQuery(e,NO)
}return this},dataSourceDidErrorQuery:function(b,a){var c=this.queryErrors;if(a&&a.isError){if(!c){c=this.queryErrors={}
}c[SC.guidFor(b)]=a}return this._scstore_dataSourceDidErrorQuery(b,YES)},_scstore_dataSourceDidErrorQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidErrorQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidErrorQuery(e,NO)
}return this},init:function(){arguments.callee.base.apply(this,arguments);this.reset()
},toString:function(){var b=this.get("name");if(!b){return arguments.callee.base.apply(this,arguments)
}else{var a=arguments.callee.base.apply(this,arguments);return"%@ (%@)".fmt(b,a)}},idFor:function(a){return SC.Store.idFor(a)
},recordTypeFor:function(a){return SC.Store.recordTypeFor(a)},storeKeyFor:function(b,a){return b.storeKeyFor(a)
},storeKeyExists:function(b,a){return b.storeKeyExists(a)},storeKeysFor:function(g){var a=[],f=g&&g.isEnumerable,c,e,b;
if(!this.statuses){return a}for(e in SC.Store.recordTypesByStoreKey){c=SC.Store.recordTypesByStoreKey[e];
if(f){b=g.contains(c)}else{b=c===g}if(b&&this.statuses[e]){a.push(parseInt(e,10))
}}return a},storeKeys:function(){var a=[],b;if(!this.statuses){return a}for(b in this.statuses){if(this.statuses[b]!=SC.Record.EMPTY){a.push(parseInt(b,10))
}}return a},statusString:function(a){var b=this.materializeRecord(a);return b.statusString()
}});SC.Store.mixin({CHAIN_CONFLICT_ERROR:new Error("Nested Store Conflict"),NO_PARENT_STORE_ERROR:new Error("Parent Store Required"),NESTED_STORE_UNSUPPORTED_ERROR:new Error("Unsupported In Nested Store"),NESTED_STORE_RETRIEVE_DIRTY_ERROR:new Error("Cannot Retrieve Dirty Record in Nested Store"),EDITABLE:"editable",LOCKED:"locked",INHERITED:"inherited",idsByStoreKey:[],recordTypesByStoreKey:{},queriesByStoreKey:[],nextStoreKey:1,generateStoreKey:function(){return this.nextStoreKey++
},idFor:function(a){return this.idsByStoreKey[a]},queryFor:function(a){return this.queriesByStoreKey[a]
},recordTypeFor:function(a){return this.recordTypesByStoreKey[a]},replaceIdFor:function(c,a){var e=this.idsByStoreKey[c],f,b;
if(e!==a){f=this.recordTypeFor(c);if(!f){throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(c))
}this.idsByStoreKey[c]=a;b=f.storeKeysById();delete b[e];b[a]=c}return this},replaceRecordTypeFor:function(a,b){this.recordTypesByStoreKey[a]=b;
return this}});SC.Store.prototype.nextStoreIndex=1;SC.Store._getDefaultStore=function(){var a=this._store;
if(!a){this._store=a=SC.Store.create()}return a};SC.Store.updateRecords=function(g,h,i,c){console.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
var e=this._getDefaultStore(),b=g.length,a,f;if(!i){i=[];for(a=0;a<b;a++){i[a]=g[a].recordType
}}f=e.loadRecords(i,g);b=f.length;for(a=0;a<b;a++){f[a]=e.materializeRecord(f[a])
}return f};SC.Store.find=function(a,b){return this._getDefaultStore().find(b,a)};
SC.Store.findAll=function(a,b){return this._getDefaultStore().findAll(a,b)};sc_require("system/store");
SC.NestedStore=SC.Store.extend({hasChanges:NO,parentStore:null,isNested:YES,lockOnRead:YES,locks:null,chainedChanges:null,find:function(a){if(a&&a.isQuery&&a.get("location")!==SC.Query.LOCAL){throw"SC.Store#find() can only accept LOCAL queries in nested stores"
}return arguments.callee.base.apply(this,arguments)},commitChanges:function(b){if(this.get("hasChanges")){var a=this.get("parentStore");
a.commitChangesFromNestedStore(this,this.chainedChanges,b)}this.reset();return this
},discardChanges:function(){var c,g;if((c=this.records)&&(g=this.locks)){var b=this.get("parentStore"),i=b.revisions;
var h=this.revisions,f,e,a;for(f in c){if(!c.hasOwnProperty(f)){continue}if(!(e=g[f])){continue
}a=i[f];if((a!==e)||(h[f]>a)){this._notifyRecordPropertyChange(parseInt(f,10))}}}this.reset();
this.flush();return this},destroy:function(){this.discardChanges();var a=this.get("parentStore");
if(a){a.willDestroyNestedStore(this)}arguments.callee.base.apply(this,arguments);
return this},reset:function(){var a=this.get("parentStore");if(!a){throw SC.Store.NO_PARENT_STORE_ERROR
}this.dataHashes=SC.beget(a.dataHashes);this.revisions=SC.beget(a.revisions);this.statuses=SC.beget(a.statuses);
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.set("hasChanges",NO)
},refreshQuery:function(b){var a=this.get("parentStore");if(a){a.refreshQuery(b)}return this
},readError:function(b){var a=this.get("parentStore");return a?a.readError(b):null
},readQueryError:function(b){var a=this.get("parentStore");return a?a.readQueryError(b):null
},storeKeyEditState:function(b){var c=this.editables,a=this.locks;return(c&&c[b])?SC.Store.EDITABLE:(a&&a[b])?SC.Store.LOCKED:SC.Store.INHERITED
},_lock:function(f){var e=this.locks,a,g;if(e&&e[f]){return this}if(!e){e=this.locks=[]
}g=this.editables;if(g){g[f]=0}var c=this.get("parentStore"),b;while(c&&(b=c.storeKeyEditState(f))===SC.Store.INHERITED){c=c.get("parentStore")
}if(c&&b===SC.Store.EDITABLE){this.dataHashes[f]=SC.clone(c.dataHashes[f],YES);if(!g){g=this.editables=[]
}g[f]=1}else{this.dataHashes[f]=this.dataHashes[f]}this.statuses[f]=this.statuses[f];
a=this.revisions[f]=this.revisions[f];e[f]=a||1;return this},readDataHash:function(a){if(this.get("lockOnRead")){this._lock(a)
}return this.dataHashes[a]},readEditableDataHash:function(a){this._lock(a);return arguments.callee.base.apply(this,arguments)
},writeDataHash:function(e,g,b){var c=this.locks,h=NO,a;if(g){this.dataHashes[e]=g
}else{this._lock(e);h=YES}if(b){this.statuses[e]=b}else{if(!h){this.statuses[e]=(this.statuses[e]||SC.Record.READY_NEW)
}}if(!h){a=this.revisions[e]=this.revisions[e];if(!c){c=this.locks=[]}if(!c[e]){c[e]=a||1
}}var f=this.editables;if(!f){f=this.editables=[]}f[e]=1;return this},removeDataHash:function(c,a){var b=this.locks;
if(!b){b=this.locks=[]}if(!b[c]){b[c]=this.revisions[c]||1}return arguments.callee.base.apply(this,arguments)
},dataHashDidChange:function(e,b,a,i){if(!b){b=SC.Store.generateStoreKey()}var c,f,h,j;
c=SC.typeOf(e)===SC.T_ARRAY;if(c){f=e.length}else{f=1;j=e}var g=this.chainedChanges;
if(!g){g=this.chainedChanges=SC.Set.create()}for(h=0;h<f;h++){if(c){j=e[h]}this._lock(j);
this.revisions[j]=b;g.add(j);this._notifyRecordPropertyChange(j,a,i)}this.setIfChanged("hasChanges",YES);
return this},commitChangesFromNestedStore:function(f,g,a){arguments.callee.base.apply(this,arguments);
var b=this.get("parentStore"),j=b.revisions,c;var l=this.locks,h=this.chainedChanges,e,k;
if(!l){l=this.locks=[]}if(!h){h=this.chainedChanges=SC.Set.create()}e=g.length;for(c=0;
c<e;c++){k=g[c];if(!l[k]){l[k]=j[k]||1}h.add(k)}this.setIfChanged("hasChanges",h.get("length")>0);
this.flush();return this},queryFor:function(c,a,b){return this.get("parentStore").queryFor(c,a,b)
},findAll:function(f,b,e,c,a){if(!a){a=this}return this.get("parentStore").findAll(f,b,e,c,a)
},retrieveRecords:function(g,n,b,c){var a=this.get("parentStore"),l,e,q,p=(!b)?n.length:b.length,j=SC.Record,o;
if(c){for(l=0;l<p;l++){e=!b?a.storeKeyFor(g,n[l]):b[l];o=this.peekStatus(e);if(o&j.DIRTY){throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR
}else{var h=this.dataHashes,k=this.revisions,i=this.statuses,m=this.editables,t=this.locks;
var f=NO;var s=NO;if(h&&h.hasOwnProperty(e)){delete h[e];f=YES}if(k&&k.hasOwnProperty(e)){delete k[e];
f=YES}if(m){delete m[e]}if(t){delete t[e]}if(i&&i.hasOwnProperty(e)){delete i[e];
if(!f){s=YES}f=YES}if(f){this._notifyRecordPropertyChange(e,s)}}}}return a.retrieveRecords(g,n,b,c)
},commitRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},commitRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},cancelRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidCancel:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidComplete:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidDestroy:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidError:function(b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushRetrieve:function(e,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},pushDestroy:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushError:function(e,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR}});sc_require("models/record");
SC.RecordArray=SC.Object.extend(SC.Enumerable,SC.Array,{store:null,query:null,storeKeys:null,status:SC.Record.EMPTY,isEditable:function(){var a=this.get("query");
return a?a.get("isEditable"):NO}.property("query").cacheable(),length:function(){this.flush();
var a=this.get("storeKeys");return a?a.get("length"):0}.property("storeKeys").cacheable(),_scra_records:null,objectAt:function(a){this.flush();
var g=this._scra_records,f=this.get("storeKeys"),b=this.get("store"),e,c;if(!f||!b){return undefined
}if(g&&(c=g[a])){return c}if(!g){this._scra_records=g=[]}e=f.objectAt(a);if(e){if(b.peekStatus(e)===SC.Record.EMPTY){b.retrieveRecord(null,null,e)
}g[a]=c=b.materializeRecord(e)}return c},forEach:function(i,e){this.flush();var f=this._scra_records,b=this.get("storeKeys"),g=this.get("store"),c=b?b.get("length"):0,h,j,a;
if(!b||!g){return this}if(!f){f=this._scra_records=[]}if(!e){e=this}for(h=0;h<c;h++){a=f[h];
if(!a){a=f[h]=g.materializeRecord(b.objectAt(h))}i.call(e,a,h,this)}return this},replace:function(b,j,h){this.flush();
var f=this.get("storeKeys"),a=h?(h.get?h.get("length"):h.length):0,c,e;if(!f){throw"storeKeys required"
}var g=this.get("query");if(g&&!g.get("isEditable")){throw SC.RecordArray.NOT_EDITABLE
}e=[];for(c=0;c<a;c++){e[c]=h.objectAt(c).get("storeKey")}f.replace(b,j,e);return this
},contains:function(a){return this.indexOf(a)>=0},indexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){SC.Logger.warn("Using indexOf on %@ with an object that is not an SC.Record".fmt(b));
return -1}this.flush();var e=b.get("storeKey"),c=this.get("storeKeys");return c?c.indexOf(e,a):-1
},lastIndexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){SC.Logger.warn("Using lastIndexOf on %@ with an object that is not an SC.Record".fmt(b));
return -1}this.flush();var e=b.get("storeKey"),c=this.get("storeKeys");return c?c.lastIndexOf(e,a):-1
},add:function(a){if(!SC.kindOf(a,SC.Record)){return this}if(this.indexOf(a)<0){this.pushObject(a)
}return this},remove:function(a){if(!SC.kindOf(a,SC.Record)){return this}this.removeObject(a);
return this},find:function(a,b){if(a&&a.isQuery){return this.get("store").find(a.queryWithScope(this))
}else{return arguments.callee.base.apply(this,arguments)}},refresh:function(){this.get("store").refreshQuery(this.get("query"));
return this},reload:function(){this.flush(YES);return this},destroy:function(){if(!this.get("isDestroyed")){this.get("store").recordArrayWillDestroy(this)
}arguments.callee.base.apply(this,arguments)},storeWillFetchQuery:function(c){var b=this.get("status"),a=SC.Record;
if((b===a.EMPTY)||(b===a.ERROR)){b=a.BUSY_LOADING}if(b&a.READY){b=a.BUSY_REFRESH}this.setIfChanged("status",b);
return this},storeDidFetchQuery:function(a){this.setIfChanged("status",SC.Record.READY_CLEAN);
return this},storeDidCancelQuery:function(c){var b=this.get("status"),a=SC.Record;
if(b===a.BUSY_LOADING){b=a.EMPTY}else{if(b===a.BUSY_REFRESH){b=a.READY_CLEAN}}this.setIfChanged("status",b);
return this},storeDidErrorQuery:function(a){this.setIfChanged("status",SC.Record.ERROR);
return this},storeDidChangeStoreKeys:function(b,a){var c=this.get("query");if(c.get("location")!==SC.Query.LOCAL){return this
}if(!c.containsRecordTypes(a)){return this}var e=this._scq_changedStoreKeys;if(!e){e=this._scq_changedStoreKeys=SC.IndexSet.create()
}e.addEach(b);this.set("needsFlush",YES);this.enumerableContentDidChange();return this
},flush:function(a){if(this._insideFlush){this.set("needsFlush",YES);return this}if(!this.get("needsFlush")&&!a){return this
}this.set("needsFlush",NO);var j=this.get("query"),m=this.get("store");if(!m||!j||j.get("location")!==SC.Query.LOCAL){return this
}this._insideFlush=YES;var h=this.get("storeKeys"),f=this._scq_changedStoreKeys,g=NO,k=SC.Record,c,e,b,o,n,i;
var l=h;if(h&&!a){if(f){f.forEach(function(p){e=m.peekStatus(p);if(!(e&k.EMPTY)&&!((e&k.DESTROYED)||(e===k.BUSY_DESTROYING))){c=m.materializeRecord(p);
i=!!(c&&j.contains(c))}else{i=NO}if(i){if(h.indexOf(p)<0){if(!g){h=h.copy()}h.pushObject(p)
}}else{if(h.indexOf(p)>=0){if(!g){h=h.copy()}h.removeObject(p)}}},this);g=YES}}else{if(n=j.get("scope")){o=n.flush().get("storeKeys")
}else{if(b=j.get("expandedRecordTypes")){o=SC.IndexSet.create();b.forEach(function(p){o.addEach(m.storeKeysFor(b))
})}}h=[];o.forEach(function(p){e=m.peekStatus(p);if(!(e&k.EMPTY)&&!((e&k.DESTROYED)||(e===k.BUSY_DESTROYING))){c=m.materializeRecord(p);
if(c&&j.contains(c)){h.push(p)}}});g=YES}if(f){f.clear()}if(g){if(h&&(h===l)){h=h.copy()
}h=SC.Query.orderStoreKeys(h,j,m);if(SC.compare(l,h)!==0){this.set("storeKeys",SC.clone(h))
}}this._insideFlush=NO;return this},needsFlush:YES,isError:function(){return this.get("status")&SC.Record.ERROR
}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readQueryError(this.get("query"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),_storeKeysDidChange:function(){var e=this.get("storeKeys");
var c=this._prevStoreKeys,g=this._storeKeysContentDidChange,a=this._storeKeysStateDidChange;
if(e===c){return}if(c){c.removeObserver("[]",this,g)}this._prevStoreKeys=e;if(e){e.addObserver("[]",this,g)
}var b=(e)?e.propertyRevision:-1;this._storeKeysContentDidChange(e,"[]",e,b)}.observes("storeKeys"),_storeKeysContentDidChange:function(e,b,c,a){if(this._scra_records){this._scra_records.length=0
}this.beginPropertyChanges().notifyPropertyChange("length").enumerableContentDidChange().endPropertyChanges()
},init:function(){arguments.callee.base.apply(this,arguments);this._storeKeysDidChange()
}});SC.RecordArray.mixin({NOT_EDITABLE:SC.Error.desc("SC.RecordArray is not editable")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/datastore");
/* @license
==========================================================================
SproutCore -- JavaScript Application Framework
copyright 2006-2011, Strobe Inc., Apple Inc. and contributors.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

SproutCore and the SproutCore logo are trademarks of Strobe Inc.

For more information about SproutCore, visit http://www.sproutcore.com


==========================================================================
@license */
}if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore")
}var Scui=Scui||SC.Object.create();var SCUI=SCUI||Scui;SCUI.READY="READY";SCUI.BUSY="BUSY";
SCUI.DONE="DONE";SCUI.ERROR="ERROR";SCUI.DISCLOSED_STAND_ALONE="standAlone";SCUI.DISCLOSED_LIST_DEPENDENT="listDependent";
SCUI.DISCLOSED_OPEN="open";SCUI.DISCLOSED_CLOSED="closed";SCUI.DEFAULT_TREE="default";
sc_require("core");SCUI.SearchableArrayController=SC.ArrayController.extend({search:null,searchResults:[],searchKey:"name",init:function(){arguments.callee.base.apply(this,arguments);
this.set("searchResults",[]);this._runSearch()},_searchOrContentDidChange:function(){this._runSearch()
}.observes("search","content"),_sanitizeSearchString:function(c){var a=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];
var b=new RegExp("(\\"+a.join("|\\")+")","g");return c.replace(b,"\\$1")},_runSearch:function(){var a=[];
var n=this.get("search");var e=this.get("searchKey");var j=this.get("content"),m;
if(n===null||n===""||n===undefined){this.set("searchResults",j)}else{n=this._sanitizeSearchString(n).toLowerCase();
m=new RegExp(n,"i");var k,l,b,c,f;for(var g=0,h=j.get("length");g<h;g++){k=j.objectAt(g);
l=k.get(e);if(!l){continue}if(l.match(m)){a.push(k)}}a.set("allowsSelection",this.get("allowsSelection"));
a.set("allowsMultipleSelection",this.get("allowsMultipleSelection"));a.set("allowsEmptySelection",this.get("allowsEmptySelection"));
this.set("searchResults",a)}}});sc_require("core");SCUI.SearchableTreeController=SC.TreeController.extend({search:null,searchResults:[],searchKey:"name",iconKey:"icon",nameKey:"name",init:function(){arguments.callee.base.apply(this,arguments);
this.set("searchResults",[]);this._runSearch()},_searchDidChange:function(){this._runSearch()
}.observes("search","content"),_sanitizeSearchString:function(c){var a=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];
var b=new RegExp("(\\"+a.join("|\\")+")","g");return c.replace(b,"\\$1")},_runSearch:function(){var e=[];
var b=this.get("search");var h=this.get("content");if(b===null||b===""||b===undefined){this.set("searchResults",h)
}else{b=this._sanitizeSearchString(b).toLowerCase();var f=new RegExp(b,"i");var g=this.get("searchKey");
this._iconKey=this.get("iconKey");this._nameKey=this.get("nameKey");e=this._runSearchOnItem(h,b,f,g);
var a=SC.Object.create({treeItemIsExpanded:YES,treeItemChildren:e});this.set("searchResults",a)
}},_runSearchOnItem:function(f,m,l,c){var a=[],i=this.get("iconKey"),g,j,k,b,e=this._nameKey,h;
if(SC.none(f)){return a}b=f.get("treeItemChildren");if(!b){b=f.get("children")}h=this;
b.forEach(function(p){if(p.treeItemChildren){var n=h._runSearchOnItem(p,m,l,c);n.forEach(function(q){a.push(q)
})}if(c&&p.get(c)){j=p.get(c).toLowerCase();if(j.match(l)){var o=SC.Object.create({});
o[c]=p.get(c);o[e]=p.get(e);o.treeItem=p;o.icon=p.get(this._iconKey);a.push(o)}}});
a.set("allowsSelection",this.get("allowsSelection"));a.set("allowsMultipleSelection",this.get("allowsMultipleSelection"));
a.set("allowsEmptySelection",this.get("allowsEmptySelection"));return a}});sc_require("core");
SCUI.Cleanup={isClean:YES,log:NO,setup:function(){if(this.log){console.log("%@.setup()".fmt(this))
}},cleanup:function(){if(this.log){console.log("%@.cleanup()".fmt(this))}},destroyMixin:function(){this._c_cleanupIfNeeded();
this._c_bindings=null},_c_isVisibleInWindowDidChange:function(){if(this.get("isVisibleInWindow")){this._c_setupIfNeeded()
}else{this._c_cleanupIfNeeded()}}.observes("isVisibleInWindow"),_c_setupIfNeeded:function(){if(this.get("isClean")&&this.get("isVisibleInWindow")){this.setup();
this.set("isClean",NO)}},_c_cleanupIfNeeded:function(){if(!this.get("isClean")&&!this.get("isVisibleInWindow")){this.cleanup();
this.set("isClean",YES)}},_c_disconnectBindings:function(){var e=this.get("bindings")||[];
var a=e.get("length");var c;for(var b=0;b<a;b++){c=e.objectAt(b);c.disconnect();if(this.log){console.log("### disconnecting %@".fmt(c))
}}this._c_bindings=e.slice();this.set("bindings",[])},_c_connectBindings:function(){var e=this._c_bindings||[];
var a=e.get("length");var c;for(var b=0;b<a;b++){c=e.objectAt(b);c.connect();if(this.log){console.log("### connecting %@".fmt(c))
}}this._c_bindings=null},_c_bindings:null};sc_require("core");SCUI.DropDown={isShowingDropDown:NO,_dropDownPane:null,dropDown:SC.MenuPane.design({layout:{width:100,height:0},contentView:SC.View.design({}),items:["_item".loc("1"),"_item".loc("2")]}),dropDownType:SC.PICKER_MENU,initMixin:function(){var a=this.get("dropDown");
if(a&&SC.typeOf(a)===SC.T_CLASS){this._dropDownPane=a.create();if(this._dropDownPane){this.bind("isShowingDropDown","._dropDownPane.isPaneAttached")
}}if(this.target!==undefined&&this.action!==undefined){this.set("target",this);this.set("action","toggle")
}},hideDropDown:function(){if(this._dropDownPane&&SC.typeOf(this._dropDownPane.remove)===SC.T_FUNCTION){this._dropDownPane.remove();
this.set("isShowingDropDown",NO)}},showDropDown:function(){this.hideDropDown();if(this._dropDownPane&&SC.typeOf(this._dropDownPane.popup)===SC.T_FUNCTION){var a=this.get("dropDownType");
this._dropDownPane.popup(this,a);this.set("isShowingDropDown",YES)}},toggle:function(){if(this.get("isShowingDropDown")){this.hideDropDown()
}else{this.showDropDown()}}};sc_require("core");SCUI.CollectionViewDynamicDelegate={isCollectionViewDynamicDelegate:YES,collectionViewContentExampleViewFor:function(a,b,c){return null
},controllerForContent:function(a){return null},customRowViewMetadata:null,contentViewMetadataForContentIndex:function(a,e){var c=null;
if(a&&a.get("isDynamicCollection")){var b=a.get("customRowViewMetadata");if(!SC.none(b)){c=b.objectAt(e)
}}return c},contentViewDidChangeForContentIndex:function(a,c,b,e){if(a&&a.isDynamicCollection&&c&&c.isDynamicListItem){this.collectionViewSetMetadataForContentIndex(a,c.get("viewMetadata"),e)
}},collectionViewInsertMetadataForContentIndex:function(b,e,f){var c=b.get("customRowViewMetadata");
if(SC.none(c)){return}var a=c.get("length");console.log("Before Insert Length: %@".fmt(a));
if(a<1){c=[e]}else{c.replace(f,0,[e])}console.log("After Insert Length: %@".fmt(c.length));
b.set("customRowViewMetadata",c);b.rowHeightDidChangeForIndexes(f)},collectionViewSetMetadataForContentIndex:function(a,e,f){console.log("\nCollectionViewDynamicDelegate(%@): collectionViewSetMetadataForContentIndex for (%@)".fmt(this,f));
if(a&&a.get("isDynamicCollection")){var b=a.get("customRowHeightIndexes");if(SC.none(b)){b=SC.IndexSet.create()
}b.add(f,1);a.set("customRowHeightIndexes",b);var c=a.get("customRowViewMetadata");
if(SC.none(c)){c=SC.SparseArray.create()}c.replace(f,1,[e]);a.set("customRowViewMetadata",c);
a.rowHeightDidChangeForIndexes(f)}return e}};sc_require("core");SCUI.DynamicCollection={isDynamicCollection:YES,customRowViewMetadata:null,initMixin:function(){this.set("customRowViewMetadata",SC.SparseArray.create());
this.set("rowDelegate",this)},rowMargin:0,itemViewForContentIndex:function(m,l){var j=this.get("content"),e=this._sc_itemViews,q=j.objectAt(m),a=this.get("contentDelegate"),p=this.get("delegate"),k=a.contentGroupIndexes(this,j),c=NO,o,i,s,h,b,f;
if(!e){e=this._sc_itemViews=[]}if(!l&&(i=e[m])){return i}c=k&&k.contains(m);if(c){c=a.contentIndexIsGroup(this,q,m)
}if(c){o=this.get("contentGroupExampleViewKey");if(o&&q){s=q.get(o)}if(!s){s=this.get("groupExampleView")||this.get("exampleView")
}}else{s=this.invokeDelegateMethod(p,"collectionViewContentExampleViewFor",this,q,m);
if(!s){o=this.get("contentExampleViewKey");if(o&&q){s=q.get(o)}}if(!s){s=this.get("exampleView")
}}var n=this._TMP_ATTRS;n.contentIndex=m;n.content=q;n.owner=n.displayDelegate=this;
n.parentView=this.get("containerView")||this;n.page=this.page;n.layerId=this.layerIdFor(m,q);
n.isEnabled=a.contentIndexIsEnabled(this,q,m);n.isSelected=a.contentIndexIsSelected(this,q,m);
n.outlineLevel=a.contentIndexOutlineLevel(this,q,m);n.disclosureState=a.contentIndexDisclosureState(this,q,m);
n.isGroupView=c;n.isVisibleInWindow=this.isVisibleInWindow;if(c){n.classNames=this._GROUP_COLLECTION_CLASS_NAMES
}else{n.classNames=this._COLLECTION_CLASS_NAMES}h=this.layoutForContentIndex(m);if(h){n.layout=h
}else{delete n.layout}f=p.controllerForContent(q);if(f){n.rootController=f}else{delete n.rootController
}n.dynamicDelegate=p;var g=this.invokeDelegateMethod(p,"contentViewMetadataForContentIndex",this,m);
if(g){n.viewMetadata=g}else{delete n.viewMetadata}i=this.createItemView(s,m,n);if(!g){g=this.invokeDelegateMethod(p,"collectionViewSetMetadataForContentIndex",this,i.get("viewMetadata"),m)
}e[m]=i;return i},layoutForContentIndex:function(b){var a=this.get("rowMargin");return{top:this.rowOffsetForContentIndex(b),height:this.rowHeightForContentIndex(b),left:a,right:a}
},contentIndexRowHeight:function(c,f,g){var a=this.get("rowHeight");if(c&&c.get("isDynamicCollection")){var e=c.get("customRowViewMetadata");
if(!SC.none(e)){var b=e.objectAt(g);if(b&&b.height){a=b.height}}}return a}};sc_require("core");
SCUI.DynamicListItem={isDynamicListItem:YES,dynamicDelegate:null,rootController:null,viewMetadata:null,viewMetadataHasChanged:function(){var a=this.get("dynamicDelegate");
this.invokeDelegateMethod(a,"contentViewDidChangeForContentIndex",this.owner,this,this.get("content"),this.contentIndex)
}};SCUI.Mobility={viewThatMoves:null,mouseDown:function(a){var b,c;b=this.get("viewThatMoves")||this;
if(!b){return YES}c=SC.clone(b.get("layout"));c.pageX=a.pageX;c.pageY=a.pageY;this._mouseDownInfo=c;
return YES},_adjustViewLayoutOnDrag:function(l,j,h,n,f,m,c,b,e){var k=f[m],g=f[c],a=f[b],o=f[e];
if(!SC.none(o)){if(!SC.none(k)){l.adjust(m,k+n)}else{if(!SC.none(g)){l.adjust(c,g-n)
}else{if(!SC.none(a)){l.adjust(b,a+n)}}}}},mouseDragged:function(e){var f=this._mouseDownInfo;
if(f){var c=e.pageX-f.pageX,a=e.pageY-f.pageY;var b=this.get("viewThatMoves")||this;
this._adjustViewLayoutOnDrag(b,f.zoneX,f.zoneY,c,f,"left","right","centerX","width");
this._adjustViewLayoutOnDrag(b,f.zoneY,f.zoneX,a,f,"top","bottom","centerY","height");
return YES}return NO}};SCUI.Permissible={isPermitted:null,isPermittedBindingDefault:SC.Binding.oneWay().bool(),displayProperties:["isPermitted","tooltipSuffix"],tooltipSuffix:" (unauthorized)".loc(),_isPermittedDidChange:function(){if(this.get("isPermitted")){if(!SC.none(this._tooltip)){this.setIfChanged("toolTip",this._tooltip)
}}else{this._tooltip=this.get("toolTip");this.set("toolTip",this._tooltip+this.get("tooltipSuffix"))
}}.observes("isPermitted"),renderMixin:function(a,b){a.setClass("unauthorized",!this.get("isPermitted"))
}};SCUI.RECUR_ONCE="once";SCUI.RECUR_REPEAT="repeat";SCUI.RECUR_SCHEDULE="schedule";
SCUI.RECUR_ALWAYS="always";SCUI.Recurrent={isRecurrent:YES,_timer_pool:{},_guid_for_timer:1,fireOnce:function(j,e,k){if(e===undefined){e=1
}var h=j,a=k,i,g;if(!k){a=function(){return YES}}if(SC.typeOf(k)===SC.T_STRING){a=this[k]
}var b=this._name_builder(SCUI.RECUR_ONCE,j);if(arguments.length>3){i=SC.$A(arguments).slice(3);
if(SC.typeOf(h)===SC.T_STRING){h=this[j]}g=h;h=function(){delete this._timer_pool[b];
if(a.call(this)){return g.apply(this,i)}}}var c=SC.Timer.schedule({target:this,action:h,interval:e});
this._timer_pool[b]=c;return b},_name_builder:function(b,c){var a="%@_%@_%@".fmt(b,c,this._guid_for_timer);
this._guid_for_timer+=1;return a}};SCUI.Resizable={viewToResize:null,verticalMove:YES,horizontalMove:YES,maxHeight:null,minHeight:null,maxWidth:null,minWidth:null,mouseDown:function(a){var b,c={};
b=this.get("viewToResize")||this.get("parentView");if(!b){return YES}c.resizeView=b;
var e=b.get("frame");c.width=e.width;c.height=e.height;c.top=e.y;c.left=e.x;c.pageX=a.pageX;
c.pageY=a.pageY;this._mouseDownInfo=c;return YES},mouseDragged:function(n){var g=this._mouseDownInfo;
if(!g){return YES}var f=n.pageX-g.pageX,e=n.pageY-g.pageY;if(f===0&&e===0){return YES
}var k=g.resizeView;var h=SC.clone(k.get("layout"));var j=this.get("horizontalMove");
if(j){var b=g.width+f;var m=this.get("maxWidth");var a=this.get("minWidth");if(!SC.none(m)&&b>m){b=m
}else{if(!SC.none(a)&&b<a){b=a}}h.width=b}var c=this.get("verticalMove");if(c){var p=g.height+e;
var l=this.get("maxHeight");var o=this.get("minHeight");if(!SC.none(l)&&p>l){p=l}else{if(!SC.none(o)&&p<o){p=o
}}h.height=p}h.top=g.top;h.left=g.left;k.set("layout",h);k.displayDidChange();return YES
}};SCUI.SimpleButton={target:null,action:null,hasState:NO,hasHover:NO,inState:NO,_hover:NO,stateClass:"state",hoverClass:"hover",activeClass:"active",_isMouseDown:NO,displayProperties:["inState","isEnabled"],mouseDown:function(a){if(!this.get("isEnabledInPane")){return YES
}this._isMouseDown=YES;this.displayDidChange();return YES},mouseExited:function(a){if(this.get("hasHover")){this._hover=NO;
this.displayDidChange()}return YES},mouseEntered:function(a){if(this.get("hasHover")){this._hover=YES;
this.displayDidChange()}return YES},mouseUp:function(a){if(!this.get("isEnabledInPane")){return YES
}this._isMouseDown=false;var c=this.get("target")||null;var b=this.get("action");
if(this._hasLegacyActionHandler()){this._triggerLegacyActionHandler(a)}else{this.getPath("pane.rootResponder").sendAction(b,c,this,this.get("pane"))
}if(this.get("hasState")){this.set("inState",!this.get("inState"))}this.displayDidChange();
return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
},touchEntered:function(a){return this.mouseEntered(a)},touchExited:function(a){return this.mouseExited(a)
},renderMixin:function(c,g){if(this.get("hasHover")){var e=this.get("hoverClass");
c.setClass(e,this._hover&&!this._isMouseDown)}if(this.get("hasState")){var f=this.get("stateClass");
c.setClass(f,this.inState)}var b=this.get("activeClass");c.setClass(b,this._isMouseDown);
var a=this.get("toolTip");if(SC.typeOf(a)===SC.T_STRING){if(this.get("localize")){a=a.loc()
}c.attr("title",a);c.attr("alt",a)}},_hasLegacyActionHandler:function(){var a=this.get("action");
if(a&&(SC.typeOf(a)===SC.T_FUNCTION)){return true}if(a&&(SC.typeOf(a)===SC.T_STRING)&&(a.indexOf(".")!==-1)){return true
}return false},_triggerLegacyActionHandler:function(evt){var target=this.get("target");
var action=this.get("action");if(target===undefined&&SC.typeOf(action)===SC.T_FUNCTION){this.action(evt)
}else{if(target!==undefined&&SC.typeOf(action)===SC.T_FUNCTION){action.apply(target,[evt])
}}if(SC.typeOf(action)===SC.T_STRING){eval("this.action = function(e) { return "+action+"(this, e); };");
this.action(evt)}}};SCUI.StatusChanged={notifyOnContentStatusChange:YES,contentStatusDidChange:function(a){},contentKey:"content",_sc_content_status_changed:function(){var a,b;
if(this.get("contentKey")&&this.get){b=this.get(this.get("contentKey"))}if(b&&b.get){a=b.get("status")
}if(this.get("notifyOnContentStatusChange")&&a&&this.contentStatusDidChange){this.contentStatusDidChange(a)
}},initMixin:function(){if(this.get("notifyOnContentStatusChange")&&this.addObserver){var a;
if(this.get("contentKey")){a="%@.status".fmt(this.get("contentKey"))}if(a&&this.addObserver){this.addObserver(a,this,this._sc_content_status_changed)
}}}};sc_require("core");SCUI.ToolTip={toolTip:"",isImage:NO,renderMixin:function(c,f){var b=this.get("toolTip");
var e=this.get("isImage"),a;b=(SC.typeOf(b)===SC.T_STRING)?SC.RenderContext.escapeHTML(b).replace(/\"/g,"'"):"";
if(e){a={title:b,alt:b}}else{a={title:b}}c=c.attr(a)}};SCUI.ContextMenuPane=SC.MenuPane.extend({usingStaticLayout:NO,popup:function(h,b){var e=this.get("items");
if(!e||e.get("length")<=0){return NO}if((!h||!h.isView)&&!this.get("usingStaticLayout")){return NO
}if(b&&b.button&&(b.which===3||(b.ctrlKey&&b.which===1))){document.oncontextmenu=function(j){if(b.preventDefault){b.preventDefault()
}else{b.stop()}b.returnValue=false;b.stopPropagation();return false};var f=h.isView?h.get("layer"):h;
var c=SC.viewportOffset(f);var a=b.pageX-c.x;var i=b.pageY-c.y;this.beginPropertyChanges();
var g=this.get("displayItems");this.set("anchorElement",f);this.set("anchor",h);this.set("preferType",SC.PICKER_MENU);
this.endPropertyChanges();return arguments.callee.base.apply(this,[h,[a+2,i+2,1]])
}else{}return NO},remove:function(){return arguments.callee.base.apply(this,arguments)
},keyUp:function(b,a){if(a&&a.commandCodes){return arguments.callee.base.apply(this,[a])
}else{if(b&&b.commandCodes){return arguments.callee.base.apply(this,[b])}else{return NO
}}},keyDown:function(b,a){if(a&&a.commandCodes){return arguments.callee.base.apply(this,[a])
}else{if(b&&b.commandCodes){return arguments.callee.base.apply(this,[b])}else{return NO
}}},exampleView:SC.MenuItemView.extend({keyUp:function(b,a){if(a&&a.commandCodes){return arguments.callee.base.apply(this,[a])
}else{if(b&&b.commandCodes){return arguments.callee.base.apply(this,[b])}else{return NO
}}},keyDown:function(b,a){if(a&&a.commandCodes){return arguments.callee.base.apply(this,[a])
}else{if(b&&b.commandCodes){return arguments.callee.base.apply(this,[b])}else{return NO
}}}})});SCUI.ModalPane=SC.PalettePane.extend({maxHeight:null,minHeight:null,maxWidth:null,minWidth:null,title:"",titleIcon:null,titleBarHeight:24,isResizable:YES,margin:20,isModal:YES,modalPane:SC.ModalPane.extend({classNames:"for-sc-panel"}),_contentView:null,_isFullscreened:NO,replaceContent:function(a){this._contentView.removeAllChildren();
if(a){this._contentView.appendChild(a)}},_fullscreen:function(){if(this._isFullscreened===NO){this._prevLayout=this.get("layout");
var a=this.get("margin");this.set("layout",{top:a,bottom:a,left:a,right:a})}else{this.set("layout",this._prevLayout)
}this._isFullscreened=!this._isFullscreened},createChildViews:function(){var c=[];
var a=null;var b=this.get("titleBarHeight");a=this.createChildView(SC.View.design({classNames:["title-bar"],layout:{top:0,left:0,right:0,height:b},childViews:"closeButton fullScreenButton title".w(),closeButton:SC.View.design(SCUI.SimpleButton,{layout:{left:5,centerY:0,width:16,height:16},classNames:["modal-close-icon"],target:this,action:"remove"}),fullScreenButton:SC.View.design(SCUI.SimpleButton,{layout:{left:25,centerY:0,width:16,height:16},classNames:["modal-fullscreen-icon"],target:this,action:"_fullscreen",isVisibleBinding:SC.binding(".isResizable",this)}),title:SC.LabelView.design({layout:{left:45,right:45,top:0,bottom:0},value:this.get("title"),textAlign:SC.ALIGN_CENTER,fontWeight:SC.BOLD_WEIGHT,classNames:["modal-title"],icon:this.get("titleIcon")})}));
c.push(a);a=this.createChildView(SC.View.design({layout:{top:b,bottom:0,left:0,right:0},childViews:"contentView".w(),contentView:this.get("contentView")}));
this._contentView=a;this.contentView=this._contentView.contentView;c.push(a);a=this.createChildView(SC.View.design(SCUI.Resizable,{classNames:["picker-resizable-handle"],layout:{bottom:0,right:0,height:16,width:16},viewToResizeBinding:SC.Binding.oneWay(".parentView"),maxHeight:this.get("maxHeight"),maxWidth:this.get("maxWidth"),minHeight:this.get("minHeight"),minWidth:this.get("minWidth"),isVisibleBinding:SC.binding(".isResizable",this)}));
c.push(a);this.set("childViews",c)}});SCUI.State=SC.Object.extend({initState:function(){},enterState:function(a){},exitState:function(a){},parallelStatechart:SCUI.DEFAULT_TREE,parentState:null,history:null,initialSubState:null,name:null,state:function(){var a=this.get("stateManager");
if(!a){throw"Cannot access the current state because state does not have a state manager"
}return a.currentState(this.get("parallelStatechart"))},goState:function(a){var b=this.get("stateManager");
if(b){b.goState(a,this.get("parallelStatechart"))}else{throw"Cannot goState cause state does not have a stateManager!"
}},goHistoryState:function(a,b){var c=this.get("stateManager");if(c){c.goHistoryState(a,this.get("parallelStatechart"),b)
}else{throw"Cannot goState cause state does not have a stateManager!"}},enterInitialSubState:function(a){var b=this.get("initialSubState");
if(b){if(!a[b]){throw"Cannot find initial sub state: %@ defined on state: %@".fmt(b,this.get("name"))
}this.set("history",b);var c=a[b];return this.goState(b,a)}return this},toString:function(){return this.get("name")
},parentStateObject:function(){var a=this.get("stateManager");if(a){return a.parentStateObject(this.get("parentState"),this.get("parallelStatechart"))
}else{throw"Cannot access parentState cause state does not have a stateManager!"}}.property("parentState").cacheable(),trace:function(){var a=this.get("stateManager");
if(a){return a._parentStates(this)}else{throw"Cannot trace cause state does not have a stateManager!"
}}.property()});require("system/state");SCUI.Statechart={isStatechart:true,LOG_NONE:0,LOG_STATE_CHANGES:1,LOG_SENT_EVENTS:2,LOG_HANDLED_EVENTS:4,LOG_UNHANDLED_EVENTS:8,LOG_ALL_EVENTS:14,LOG_ALL:15,logLevel:0,initMixin:function(){this._all_states={};
this._all_states[SCUI.DEFAULT_TREE]={};this._current_state={};this._current_state[SCUI.DEFAULT_TREE]=null;
this._goStateLocked=NO;this._sendEventLocked=NO;this._pendingStateTransitions=[];
this._pendingActions=[];this.sendAction=this.sendEvent;if(this.get("startOnInit")){this.startupStatechart()
}},startOnInit:YES,startupStatechart:function(){if(!this._started){var f,a,h,c,e,b,g;
for(f in this){if(this.hasOwnProperty(f)&&SC.kindOf(this[f],SCUI.State)&&this[f].get&&!this[f].get("beenAddedToStatechart")){h=this[f];
this._addState(f,h)}}c=this._all_states;for(f in c){if(c.hasOwnProperty(f)){a=c[f];
for(h in a){if(a.hasOwnProperty(h)){a[h].initState()}}}}e=this.get("startStates");
if(!e){throw"Please add startStates to your statechart!"}for(f in c){if(c.hasOwnProperty(f)){b=e[f];
g=c[f];if(!b){console.error("The parallel statechart %@ must have a start state!".fmt(f))
}if(!g){throw"The parallel statechart %@ does not exist!".fmt(f)}if(!g[b]){throw"The parallel statechart %@ doesn't have a start state [%@]!".fmt(f,b)
}this.goState(b,f)}}}this._started=YES},registerState:function(f,e,c){var b,a;b=SCUI.State.create(f);
if(e&&c){if(e.isStatechart){e._addState(c,b);b.initState()}else{throw"Cannot add state: %@ because state manager does not mixin SCUI.Statechart".fmt(b.get("name"))
}}else{b.set("beenAddedToStatechart",NO)}return b},goHistoryState:function(c,a,g){var e=this._all_states[a],b,f;
if(!a||!e){throw"State requesting go history does not have a valid parallel tree"
}b=e[c];if(b){f=b.get("history")||b.get("initialSubState")}if(!f){if(!g){console.warn("Requesting History State for [%@] and it is not a parent state".fmt(c))
}f=c;this.goState(f,a)}else{if(g){this.goHistoryState(f,a,g)}else{this.goState(f,a)
}}},goState:function(n,p){var b=this._current_state[p],m=[],k=[],o,e,a,l,f,g,j,c=this.get("logLevel"),h;
if(!p){throw"#goState: State requesting go does not have a valid parallel tree"}a=this._all_states[p][n];
if(!a){throw"#goState: Could not find the requested state: %@".fmt(n)}if(this._goStateLocked){this._pendingStateTransitions.push({requestedState:a,tree:p});
if(c&SCUI.Statechart.LOG_STATE_CHANGES){console.info("%@: added [%@] to pending state transitions queue for [%@]".fmt(this,a,p))
}return}if(b===a){return}this._goStateLocked=YES;m=this._parentStates_with_root(a);
k=b?this._parentStates_with_root(b):[];l=k.find(function(q,i){e=i;o=m.indexOf(q);
if(o>=0){return YES}});if(!o){o=m.length-1}h="";for(j=0;j<e;j+=1){if(c&SCUI.Statechart.LOG_STATE_CHANGES){h+="Exiting State: [%@] in [%@]\n".fmt(k[j],p)
}k[j].exitState()}if(c&SCUI.Statechart.LOG_STATE_CHANGES){console.info(h)}h="";for(j=o-1;
j>=0;j-=1){g=m[j];if(c&SCUI.Statechart.LOG_STATE_CHANGES){h+="Entering State: [%@] in [%@]\n".fmt(g,p)
}f=m[j+1];if(f&&SC.typeOf(f)===SC.T_OBJECT){f.set("history",g.name)}g.enterState();
if(g===a){g.enterInitialSubState(this._all_states[p||SCUI.DEFAULT_TREE])}}if(c&SCUI.Statechart.LOG_STATE_CHANGES){console.info(h)
}this._current_state[p]=a;this._goStateLocked=NO;this._flushPendingStateTransition();
this._flushPendingActions()},_flushPendingStateTransition:function(){var a=this.get("logLevel");
var c=this._pendingStateTransitions.shift();var b;if(!c){return}if(a&SCUI.Statechart.LOG_STATE_CHANGES){b="%@: performing pending state transition for requested state [%@] in [%@]";
console.info(b.fmt(this,c.requestedState,c.tree))}this.goState(c.requestedState,c.tree)
},currentState:function(a){a=a||SCUI.DEFAULT_TREE;return this._current_state[a]},isInState:function(g,b){b=b||SCUI.DEFAULT_TREE;
var a=this._all_states[b],c=this.currentState(b),e=NO;var f=this._parentStates(c)||[];
if(SC.typeOf(g)===SC.T_STRING){g=a[g]}f.forEach(function(h){if(!e&&h===g){e=YES}});
return e},isResponderContext:YES,sendEvent:function(e,g,a){var b=this.get("logLevel"),i=NO,h=this._current_state,f;
if(this._sendEventLocked||this._goStateLocked){this._pendingActions.push({action:e,sender:g,context:a});
if(b&SCUI.Statechart.LOG_SENT_EVENTS){console.info("%@: added %@ to pending actions queue".fmt(this,e))
}return}this._sendEventLocked=YES;if(b&SCUI.Statechart.LOG_SENT_EVENTS){console.info("%@: begin action '%@' (%@, %@)".fmt(this,e,g,a))
}for(var j in h){if(h.hasOwnProperty(j)){i=NO;f=h[j];while(!i&&f){if(f.tryToPerform){try{i=f.tryToPerform(e,g,a)
}catch(c){console.error("Exception occurred while trying perform action: %@ \n %@".fmt(e,c))
}}if(!i){f=f.get("parentState")?this._all_states[j][f.get("parentState")]:null}}if(!i&&(b&SCUI.Statechart.LOG_UNHANDLED_EVENTS)){console.info("%@:  action '%@' NOT HANDLED in tree %@".fmt(this,e,j))
}else{if(i&&(b&SCUI.Statechart.LOG_HANDLED_EVENTS)){console.info("%@: action '%@' handled by %@ in tree %@".fmt(this,e,f.get("name"),j))
}}}}this._sendEventLocked=NO;this._flushPendingActions();return f},_flushPendingActions:function(){var a=this._pendingActions.shift();
if(!a){return}if(this.get("logLevel")&SCUI.Statechart.LOG_SENT_EVENTS){console.info("%@: firing pending action %@".fmt(this,a.action))
}this.sendEvent(a.action,a.sender,a.context)},_addState:function(b,c){c.set("stateManager",this);
c.set("name",b);var a=c.get("parallelStatechart")||SCUI.DEFAULT_TREE;c.setIfChanged("parallelStatechart",a);
if(!this._all_states[a]){this._all_states[a]={}}if(this._all_states[a][b]){throw"Trying to add state %@ to state tree %@ and it already exists".fmt(b,a)
}this._all_states[a][b]=c;c.set("beenAddedToStatechart",YES)},_parentStates:function(b){var a=[],c=b;
a.push(c);c=c.get("parentStateObject");while(c){a.push(c);c=c.get("parentStateObject")
}return a},_parentStates_with_root:function(b){var a=this._parentStates(b);a.push("root");
return a},parentStateObject:function(b,a){if(b&&a&&this._all_states[a]&&this._all_states[a][b]){return this._all_states[a][b]
}return null}};sc_require("core");SCUI.CascadingComboView=SC.View.extend({content:null,propertiesHash:null,masterLabel:null,detailLabel:null,init:function(){arguments.callee.base.apply(this,arguments)
},createChildViews:function(){var f=[],b;var h=["contentPath","masterValueKey","detailValueKey","rootItemKey","childItemKey","relationKey"];
var a=null;var c=this.get("propertiesHash");var e=this.get("content");if(c){h.forEach(function(i){if(!SC.none(c[i])&&c[i]!==""){a=YES
}else{a=null}})}if(a){b=this.createChildView(SC.LabelView.design({layout:{left:20,top:10,right:20,height:22},isEditable:NO,value:this.get("masterLabel").loc()}));
f.push(b);var g="*content.%@".fmt(c.rootItemKey);this.masterCombo=b=this.createChildView(SCUI.ComboBoxView.design({layout:{left:20,right:20,top:32,height:22},objectsBinding:c.contentPath,nameKey:c.masterValueKey,valueBinding:SC.Binding.from("*content.%@".fmt(c.rootItemKey),this)}));
f.push(b);b=this.createChildView(SC.LabelView.design({layout:{left:50,top:64,right:20,height:22},isEditable:NO,value:this.get("detailLabel").loc(),isEnabled:NO,isEnabledBinding:SC.Binding.from("*masterCombo.selectedObject",this).oneWay()}));
f.push(b);b=this.createChildView(SCUI.ComboBoxView.design({layout:{left:50,right:20,top:86,height:22},objectsBinding:SC.Binding.from("*content.%@".fmt(c.relationKey),this).oneWay(),nameKey:c.detailValueKey,isEnabled:NO,isEnabledBinding:SC.Binding.from("*masterCombo.selectedObject",this).oneWay(),valueBinding:SC.Binding.from("*content.%@".fmt(c.childItemKey),this)}));
f.push(b);this.set("childViews",f)}else{b=this.createChildView(SC.View.design({layout:{top:0,left:0,bottom:0,right:0},childViews:[SC.LabelView.design({layout:{centerX:0,centerY:0,width:300,height:18},value:a?"No Content.":"Setup did not meet requirements."})]}));
f.push(b);this.set("childViews",f)}}});sc_require("core");SCUI.CollapsibleView=SC.ContainerView.extend({classNames:["scui-collapsible-view"],expandedView:null,collapsedView:null,_isCollapsed:NO,_expandedView:null,_collapsedView:null,displayProperties:["expandedView","collapsedView"],createChildViews:function(){var b=this.get("expandedView");
this._expandedView=this._createChildViewIfNeeded(b);var c=this.get("collapsedView");
this._collapsedView=this._createChildViewIfNeeded(c);this.set("nowShowing",this._expandedView);
var a=this.get("contentView");this._adjustView(a)},expand:function(){if(this._expandedView){this.set("nowShowing",this._expandedView);
var a=this.get("contentView");this._isCollapsed=NO;this.displayDidChange();this._adjustView(a)
}},collapse:function(){if(this._collapsedView){this.set("nowShowing",this._collapsedView);
var a=this.get("contentView");this._isCollapsed=YES;this.displayDidChange();this._adjustView(a)
}},toggle:function(){if(this._isCollapsed){this.expand()}else{this.collapse()}},_expandedViewDidChange:function(){var a=this.get("expandedView");
console.log("%@._expandableViewDidChange(%@)".fmt(this,a));this._expandedView=this._createChildViewIfNeeded(a);
if(!this._isCollapsed){this.expand()}}.observes("expandedView"),_collapsedViewDidChange:function(){var a=this.get("collapsedView");
console.log("%@._collapsedViewDidChange(%@)".fmt(this,a));this._collapsedView=this._createChildViewIfNeeded(a);
if(this._isCollapsed){this.collapse()}}.observes("collapsedView"),_adjustView:function(a){if(a){var c=a.get("frame");
var b=this.get("layout");console.log("CollapsibleView: Frame for (%@): width: %@, height: %@".fmt(a,c.height,c.width));
b=SC.merge(b,{height:c.height,width:c.width});this.adjust(b)}},_createChildViewIfNeeded:function(a){if(SC.typeOf(a)===SC.T_CLASS){return this.createChildView(a)
}else{return a}}});SCUI.LocalizableListItemView=SC.ListItemView.extend({render:function(c,a){var g=this.get("content"),l=this.displayDelegate,b=this.get("outlineLevel"),f=this.get("outlineIndent"),k,j,i;
c.addClass((this.get("contentIndex")%2===0)?"even":"odd");c.setClass("disabled",!this.get("isEnabled"));
i=c.begin("div").addClass("sc-outline");if(b>=0&&f>0){i.addStyle("left",f*(b+1))}j=this.get("disclosureState");
if(j!==SC.LEAF_NODE){this.renderDisclosure(i,j);c.addClass("has-disclosure")}k=this.getDelegateProperty("contentCheckboxKey",g,l);
if(k){j=g?(g.get?g.get(k):g[k]):NO;this.renderCheckbox(i,j);c.addClass("has-checkbox")
}if(this.getDelegateProperty("hasContentIcon",g,l)){k=this.getDelegateProperty("contentIconKey",l);
j=(k&&g)?(g.get?g.get(k):g[k]):null;this.renderIcon(i,j);c.addClass("has-icon")}k=this.getDelegateProperty("contentValueKey",g,l);
j=(k&&g)?(g.get?g.get(k):g[k]):g;if(j&&SC.typeOf(j)!==SC.T_STRING){j=j.toString()
}if(l&&l.get("localize")&&j&&j.loc){j=j.loc()}if(this.get("escapeHTML")){j=SC.RenderContext.escapeHTML(j)
}this.renderLabel(i,j);if(this.getDelegateProperty("hasContentRightIcon",l)){k=this.getDelegateProperty("contentRightIconKey",l);
j=(k&&g)?(g.get?g.get(k):g[k]):null;this.renderRightIcon(i,j);c.addClass("has-right-icon")
}k=this.getDelegateProperty("contentUnreadCountKey",g,l);j=(k&&g)?(g.get?g.get(k):g[k]):null;
if(!SC.none(j)&&(j!==0)){this.renderCount(i,j);var e=["zero","one","two","three","four","five"];
var h=(j.toString().length<e.length)?e[j.toString().length]:e[e.length-1];c.addClass("has-count "+h+"-digit")
}k=this.getDelegateProperty("listItemActionProperty",g,l);j=(k&&g)?(g.get?g.get(k):g[k]):null;
if(j){this.renderAction(i,j);c.addClass("has-action")}if(this.getDelegateProperty("hasContentBranch",g,l)){k=this.getDelegateProperty("contentIsBranchKey",g,l);
j=(k&&g)?(g.get?g.get(k):g[k]):NO;this.renderBranch(i,j);c.addClass("has-branch")
}c=i.end()}});sc_require("mixins/simple_button");sc_require("views/localizable_list_item");
SCUI.ComboBoxView=SC.View.extend(SC.Control,SC.Editable,{classNames:"scui-combobox-view",isEditable:function(){return this.get("isEnabled")
}.property("isEnabled").cacheable(),objects:null,objectsBindingDefault:SC.Binding.oneWay(),value:null,selectedObject:null,valueKey:null,nameKey:null,iconKey:null,sortKey:null,disableSort:NO,localize:NO,hint:null,filter:null,useExternalFilter:NO,status:null,isBusy:function(){return(this.get("status")&SC.Record.BUSY)?YES:NO
}.property("status").cacheable(),minListHeight:20,maxListHeight:200,statusIndicatorHeight:18,filteredObjects:function(){var b,e,g,c,a,f,h;
if(this.get("useExternalFilter")){b=this.get("objects")}else{g=this.get("objects")||[];
c=this.get("nameKey");e=this._sanitizeFilter(this.get("filter"))||"";e=e.toLowerCase();
h=this.get("localize");b=[];f=this;g.forEach(function(i){a=f._getObjectName(i,c,h);
if((SC.typeOf(a)===SC.T_STRING)&&(a.toLowerCase().search(e)>=0)){b.push(i)}})}return this.sortObjects(b)
}.property("objects","filter").cacheable(),textFieldView:SC.TextFieldView.extend({classNames:"scui-combobox-text-field-view",layout:{top:0,left:0,height:22,right:28}}),dropDownButtonView:SC.View.extend(SCUI.SimpleButton,{classNames:"scui-combobox-dropdown-button-view",layout:{top:0,right:0,height:24,width:28}}),displayProperties:["isEditing"],init:function(){arguments.callee.base.apply(this,arguments);
this._createListPane();this._valueDidChange();this.bind("status",SC.Binding.from("*objects.status",this).oneWay())
},createChildViews:function(){var c=[],a;var b=this.get("isEnabled");a=this.get("textFieldView");
if(SC.kindOf(a,SC.View)&&a.isClass){a=this.createChildView(a,{isEnabled:b,hintBinding:SC.Binding.from("hint",this),editableDelegate:this,keyDelegate:this,keyDown:function(f){var e=this.get("keyDelegate");
return(e&&e.keyDown&&e.keyDown(f))||arguments.callee.base.apply(this,arguments)},keyUp:function(f){var e=this.get("keyDelegate");
return(e&&e.keyUp&&e.keyUp(f))||arguments.callee.base.apply(this,arguments)},beginEditing:function(){var e=this.get("editableDelegate");
var f=arguments.callee.base.apply(this,arguments);if(f&&e&&e.beginEditing){e.beginEditing()
}return f},commitEditing:function(){var e=this.get("editableDelegate");var f=arguments.callee.base.apply(this,arguments);
if(f&&e&&e.commitEditing){e.commitEditing()}return f}});c.push(a);this.set("textFieldView",a)
}else{this.set("textFieldView",null)}a=this.get("dropDownButtonView");if(SC.kindOf(a,SC.View)&&a.isClass){a=this.createChildView(a,{isEnabled:b,target:this,action:"toggleList"});
c.push(a);this.set("dropDownButtonView",a)}else{this.set("dropDownButtonView",null)
}this.set("childViews",c)},renderMixin:function(a,b){a.setClass("focus",this.get("isEditing"))
},sortObjects:function(b){var a;if(!this.get("disableSort")&&b&&b.sort){a=this.get("sortKey")||this.get("nameKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}e=(SC.typeOf(e)===SC.T_STRING)?e.toLowerCase():e;
c=(SC.typeOf(c)===SC.T_STRING)?c.toLowerCase():c;return(e<c)?-1:((e>c)?1:0)})}return b
},beginEditing:function(){var a=this.get("textFieldView");if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.set("isEditing",YES);this.set("filter",null);
if(a&&!a.get("isEditing")){a.beginEditing()}return YES},commitEditing:function(){var a=this.get("textFieldView");
if(this.get("isEditing")){this._selectedObjectDidChange();this.set("isEditing",NO);
this.hideList()}if(a&&a.get("isEditing")){a.commitEditing()}return YES},toggleList:function(){if(this._listPane&&this._listPane.get("isPaneAttached")){this.hideList()
}else{this.showList()}},showList:function(){if(this._listPane&&!this._listPane.get("isPaneAttached")){this.beginEditing();
this._updateListPaneLayout();this._listPane.popup(this,SC.PICKER_MENU);this._listView.reload()
}},hideList:function(){if(this._listPane&&this._listPane.get("isPaneAttached")){this._listPane.remove()
}},keyDown:function(a){this._keyDown=YES;this._shouldUpdateFilter=NO;return this.interpretKeyEvents(a)?YES:NO
},keyUp:function(a){var b=NO;if(!this._keyDown){this._shouldUpdateFilter=NO;b=this.interpretKeyEvents(a)?YES:NO
}this._keyDown=NO;return b},insertText:function(a){this._shouldUpdateFilter=YES;this.showList();
return NO},deleteBackward:function(a){this._shouldUpdateFilter=YES;this.showList();
return NO},deleteForward:function(a){this._shouldUpdateFilter=YES;this.showList();
return NO},moveDown:function(a){if(this._listPane&&this._listView){if(this._listPane.get("isPaneAttached")){this._listView.moveDown(a)
}else{this.showList()}}return YES},moveUp:function(a){if(this._listPane&&this._listView){if(this._listPane.get("isPaneAttached")){this._listView.moveUp(a)
}else{this.showList()}}return YES},insertNewline:function(a){if(this._listPane&&this._listPane.get("isPaneAttached")){return this._listView.insertNewline(a)
}return NO},insertTab:function(a){var b=NO;if(this._listPane&&this._listPane.get("isPaneAttached")){this.invokeOnce("_selectListItem");
b=YES}return b},cancel:function(a){if(this._listPane&&this._listPane.get("isPaneAttached")){this.hideList()
}return NO},_isEnabledDidChange:function(){var a;var b=this.get("isEnabled");if(!b){this.commitEditing()
}a=this.get("textFieldView");if(a&&a.set){a.set("isEnabled",b)}a=this.get("dropDownButtonView");
if(a&&a.set){a.set("isEnabled",b)}}.observes("isEnabled"),_objectsDidChange:function(){this.notifyPropertyChange("filteredObjects")
}.observes("*objects.[]"),_filteredObjectsLengthDidChange:function(){this.invokeOnce("_updateListPaneLayout")
}.observes("*filteredObjects.length"),_isBusyDidChange:function(){this.invokeOnce("_updateListPaneLayout")
}.observes("isBusy"),_selectedObjectDidChange:function(){var b=this.get("selectedObject");
var a=this.get("textFieldView");this.setIfChanged("value",this._getObjectValue(b,this.get("valueKey")));
if(a){a.setIfChanged("value",this._getObjectName(b,this.get("nameKey"),this.get("localize")))
}this.set("filter",null)}.observes("selectedObject"),_valueDidChange:function(){var e=this.get("value");
var a=this.get("selectedObject");var b=this.get("valueKey");var c;if(e){if(b){if(e!==this._getObjectValue(a,b)){c=this.get("objects");
a=(c&&c.isEnumerable)?c.findProperty(b,e):null;this.set("selectedObject",a)}}else{this.setIfChanged("selectedObject",e)
}}else{this.set("selectedObject",null)}}.observes("value"),_listSelectionDidChange:function(){var c=this.getPath("_listSelection.firstObject");
var b,a;if(c&&this._listPane&&this._listPane.get("isPaneAttached")){b=this._getObjectName(c,this.get("nameKey"),this.get("localize"));
a=this.get("textFieldView");if(a){a.setIfChanged("value",b)}}}.observes("_listSelection"),_textFieldValueDidChange:function(){if(this._shouldUpdateFilter){this._shouldUpdateFilter=NO;
this.setIfChanged("filter",this.getPath("textFieldView.value"))}}.observes("*textFieldView.value"),_createListPane:function(){var c=this.get("isBusy");
var a=this.get("statusIndicatorHeight");var b=this.get("customScrollView")||SC.ScrollView;
this._listPane=SC.PickerPane.create({classNames:["scui-combobox-list-pane","sc-menu"],acceptsKeyPane:NO,acceptsFirstResponder:NO,contentView:SC.View.extend({layout:{left:0,right:0,top:0,bottom:0},childViews:"listView spinnerView".w(),listView:b.extend({classNames:"scui-combobox-list-scroll-view",layout:{left:0,right:0,top:0,bottom:c?a:0},hasHorizontalScroller:NO,contentView:SC.ListView.design({classNames:"scui-combobox-list-view",layout:{left:0,right:0,top:0,bottom:0},allowsMultipleSelection:NO,target:this,action:"_selectListItem",contentBinding:SC.Binding.from("filteredObjects",this).oneWay(),contentValueKey:this.get("nameKey"),hasContentIcon:this.get("iconKey")?YES:NO,contentIconKey:this.get("iconKey"),selectionBinding:SC.Binding.from("_listSelection",this),localizeBinding:SC.Binding.from("localize",this).oneWay(),exampleView:SCUI.LocalizableListItemView,mouseUp:function(){var e=arguments.callee.base.apply(this,arguments);
var g=this.get("target");var f=this.get("action");if(g&&f&&g.invokeLater){g.invokeLater(f)
}return e}})}),spinnerView:SC.View.extend({classNames:"scui-combobox-spinner-view",layout:{centerX:0,bottom:0,width:100,height:a},isVisibleBinding:SC.Binding.from("isBusy",this).oneWay(),childViews:"imageView messageView".w(),imageView:SCUI.LoadingSpinnerView.extend({layout:{left:0,top:0,bottom:0,width:18},theme:"darkTrans",callCountBinding:SC.Binding.from("isBusy",this).oneWay().transform(function(e){e=e?1:0;
return e})}),messageView:SC.LabelView.extend({layout:{left:25,top:0,bottom:0,right:0},valueBinding:SC.Binding.from("status",this).oneWay().transform(function(e){e=(e===SC.Record.BUSY_LOADING)?"Loading...".loc():"Refreshing...".loc();
return e})})})}),mouseDown:function(e){arguments.callee.base.apply(this,arguments);
return NO}});this._listView=this._listPane.getPath("contentView.listView.contentView");
this._listScrollView=this._listPane.getPath("contentView.listView")},_updateListPaneLayout:function(){var a,g,c,j,f,i,h,b,e;
if(this._listView&&this._listPane&&this._listScrollView){f=this.get("frame");c=f?f.width:200;
e=this.get("isBusy");b=this.get("statusIndicatorHeight");a=this._listView.get("rowHeight")||18;
g=this.getPath("filteredObjects.length")||(e?0:1);j=(a*g)+(e?b:0);j=Math.min(j,this.get("maxListHeight"));
j=Math.max(j,this.get("minListHeight"));this._listScrollView.adjust({bottom:e?b:0});
this._listPane.adjust({width:c,height:j});this._listPane.updateLayout();this._listPane.positionPane()
}},_selectListItem:function(){var a=this._listView?this._listView.getPath("selection.firstObject"):null;
if(a){this.set("selectedObject",a)}this.hideList()},_sanitizeFilter:function(a){return a?a.replace(this._sanitizeRegEx,"\\$1"):a
},_getObjectName:function(e,b,c){var a=e?(b?(e.get?e.get(b):e[b]):e):null;if(c&&a&&a.loc){a=a.loc()
}return a},_getObjectValue:function(b,a){return b?(a?(b.get?b.get(a):b[a]):b):null
},_listPane:null,_listScrollView:null,_listView:null,_listSelection:null,_keyDown:NO,_shouldUpdateFilter:NO,_sanitizeRegEx:new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\"].join("|\\")+")","g")});
sc_require("core");sc_require("panes/context_menu_pane");SCUI.ContentEditableView=SC.WebView.extend(SC.Editable,{value:"",valueBindingDefault:SC.Binding.single(),allowScrolling:YES,isOpaque:YES,selection:"",selectedImage:null,selectedHyperlink:null,attachedView:null,offsetWidth:null,offsetHeight:null,hasFixedDimensions:YES,inlineStyle:{},autoCommit:NO,cleanInsertedText:YES,encodeNewLine:NO,styleSheetCSS:"",rightClickMenuOptions:[],encodeContent:YES,indentOnTab:YES,tabSize:2,displayProperties:["value"],render:function(e,i){var h=this.get("value");
var c=!this.get("isOpaque");var f=this.get("allowScrolling")?"yes":"no";var g=c?"0":"1";
var a="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0p;";
if(i){e.push('<iframe frameBorder="',g,'" name="',this.get("frameName"));e.push('" scrolling="',f);
e.push('" src="" allowTransparency="',c,'" style="',a,'"></iframe>')}else{if(this._document){var b=this._document.body.innerHTML;
if(this.get("encodeContent")){b=this._encodeValues(b)}if(this.get("encodeNewLine")){b=b.replace(/\r/g,"&#13;");
b=b.replace(/\n/g,"&#10;")}if(h!==b){this._document.body.innerHTML=h}}}},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
var a=this.$("iframe");SC.Event.add(a,"load",this,this.editorSetup)},displayDidChange:function(){var a=this._document;
if(a){a.body.contentEditable=this.get("isEnabled")}arguments.callee.base.apply(this,arguments)
},willDestroyLayer:function(){var b=this._document;var a=b.body;if(this.get("indentOnTab")){SC.Event.remove(a,"keydown",this,this.keyDown)
}SC.Event.remove(a,"mouseup",this,this.mouseUp);SC.Event.remove(a,"keyup",this,this.keyUp);
SC.Event.remove(a,"paste",this,this.paste);SC.Event.remove(a,"dblclick",this,this.doubleClick);
SC.Event.remove(b,"click",this,this.focus);SC.Event.remove(b,"mousedown",this,this.mouseDown);
SC.Event.remove(this.$("iframe"),"load",this,this.editorSetup);SC.Event.remove(b,"mouseup",this,this.docMouseUp);
arguments.callee.base.apply(this,arguments)},editorSetup:function(){this._iframe=this._getFrame();
this._document=this._getDocument();if(SC.none(this._document)){console.error("Curse your sudden but inevitable betrayal! Can't find a reference to the document object!");
return}var h=this._document;var e=this.get("styleSheetCSS");if(!(SC.none(e)||e==="")){var g=h.getElementsByTagName("head")[0];
if(g){var c=h.createElement("style");c.type="text/css";g.appendChild(c);if(SC.browser.msie){c.cssText=e
}else{c.innerHTML=e}c=g=null}}var i=this.get("value");var f=h.body;f.contentEditable=true;
if(!SC.browser.msie){h.execCommand("styleWithCSS",false,false)}if(!this.get("isOpaque")){f.style.background="transparent";
this.$().setClass("sc-web-view",NO)}var b=this.get("inlineStyle");var l=this._document.body.style;
for(var j in b){if(b.hasOwnProperty(j)){l[j.toString().camelize()]=b[j]}}if(SC.browser.msie||SC.browser.safari){f.innerHTML=i
}else{this.insertHTML(i,NO)}if(!this.get("hasFixedDimensions")){var k=this.get("layout").height;
if(k){this._minHeight=k}var a=this.get("layout").width;if(a){this._minWidth=a}}SC.Event.add(f,"mouseup",this,this.mouseUp);
SC.Event.add(f,"keyup",this,this.keyUp);SC.Event.add(f,"paste",this,this.paste);SC.Event.add(f,"dblclick",this,this.doubleClick);
if(this.get("indentOnTab")){SC.Event.add(f,"keydown",this,this.keyDown)}SC.Event.add(h,"click",this,this.focus);
SC.Event.add(h,"mousedown",this,this.mouseDown);SC.Event.add(h,"mouseup",this,this.docMouseUp);
this.iframeDidLoad();this.focus()},mouseDown:function(a){var c=this.get("rightClickMenuOptions");
var b=c.get("length");if(c.length>0){var e=this.contextMenuView.create({defaultResponder:"Orion",defaultResponder:this.get("rightClickMenuDefaultResponder"),layout:{width:200},itemTitleKey:"title",itemTargetKey:"target",itemActionKey:"action",itemSeparatorKey:"isSeparator",itemIsEnabledKey:"isEnabled",items:c});
e.popup(this,a)}},docMouseUp:function(a){var b=this;this.invokeLast(function(){var c=b.get("selectedImage");
if(c){c.style.width=c.width+"px";c.style.height=c.height+"px";b.set("isEditing",YES)
}})},doubleClick:function(a){SC.RunLoop.begin();SC.RunLoop.end()},contextMenuView:SCUI.ContextMenuPane.extend({popup:function(e,a){if((!e||!e.isView)&&!this.get("usingStaticLayout")){return NO
}if(a&&a.button&&(a.which===3||(a.ctrlKey&&a.which===1))){document.oncontextmenu=function(f){if(a.preventDefault){a.preventDefault()
}else{a.stop()}a.returnValue=false;a.stopPropagation();return false};var b=e.isView?e.get("layer"):e;
this.beginPropertyChanges();var c=this.get("displayItems");this.set("anchorElement",b);
this.set("anchor",e);this.set("preferType",SC.PICKER_MENU);this.endPropertyChanges();
return arguments.callee.base.base.apply(this,[e,[a.pageX+5,a.pageY+5,1]])}else{}return NO
}}),keyUp:function(a){SC.RunLoop.begin();switch(SC.FUNCTION_KEYS[a.keyCode]){case"left":case"right":case"up":case"down":this.querySelection();
break}if(!this.get("hasFixedDimensions")){this.invokeLast(this._updateLayout)}this.set("isEditing",YES);
SC.RunLoop.end()},keyDown:function(c){SC.RunLoop.begin();var e=this.get("tabSize");
if(SC.typeOf(e)!==SC.T_NUMBER){return}var a=[];for(var b=0;b<e;b++){a.push("\u00a0")
}if(SC.FUNCTION_KEYS[c.keyCode]==="tab"){c.preventDefault();this.insertHTML(a.join(""),NO)
}SC.RunLoop.end()},mouseUp:function(){this._mouseUp=true;SC.RunLoop.begin();this.querySelection();
if(!this.get("hasFixedDimensions")){this.invokeLast(this._updateLayout)}this.set("isEditing",YES);
SC.RunLoop.end()},paste:function(){SC.RunLoop.begin();this.querySelection();if(!this.get("hasFixedDimensions")){this.invokeLast(this._updateLayout)
}this.set("isEditing",YES);SC.RunLoop.end();return YES},frameName:function(){return this.get("layerId")+"_frame"
}.property("layerId").cacheable(),editorHTML:function(a,b){var c=this._document;if(!c){return NO
}if(b!==undefined){c.body.innerHTML=b;return YES}else{if(this.get("cleanInsertedText")){return this.cleanWordHTML(c.body.innerHTML)
}else{return c.body.innerHTML}}}.property(),selectionIsBold:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("bold",false,c)){this.set("isEditing",YES)
}}return this._document.queryCommandState("bold")}.property("selection").cacheable(),selectionIsItalicized:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("italic",false,c)){this.set("isEditing",YES)
}}return b.queryCommandState("italic")}.property("selection").cacheable(),selectionIsUnderlined:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("underline",false,c)){this.set("isEditing",YES)
}}return b.queryCommandState("underline")}.property("selection").cacheable(),selectionIsCenterJustified:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("justifycenter",false,c)){this.querySelection();
this.set("isEditing",YES)}}return b.queryCommandState("justifycenter")}.property("selection").cacheable(),selectionIsRightJustified:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("justifyright",false,c)){this.querySelection();
this.set("isEditing",YES)}}return b.queryCommandState("justifyright")}.property("selection").cacheable(),selectionIsLeftJustified:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("justifyleft",false,c)){this.querySelection();
this.set("isEditing",YES)}}return b.queryCommandState("justifyleft")}.property("selection").cacheable(),selectionIsFullJustified:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("justifyfull",false,c)){this.querySelection();
this.set("isEditing",YES)}}return b.queryCommandState("justifyfull")}.property("selection").cacheable(),selectionIsOrderedList:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("insertorderedlist",false,c)){this.querySelection();
this.set("isEditing",YES)}}return b.queryCommandState("insertorderedlist")}.property("selection").cacheable(),selectionIsUnorderedList:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("insertunorderedlist",false,c)){this.querySelection();
this.set("isEditing",YES)}}return b.queryCommandState("insertunorderedlist")}.property("selection").cacheable(),selectionIsIndented:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("indent",false,c)){this.set("isEditing",YES)
}}if(SC.browser.msie){return b.queryCommandState("indent")}else{return NO}}.property("selection").cacheable(),selectionIsOutdented:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("outdent",false,c)){this.set("isEditing",YES)
}}if(SC.browser.msie){return b.queryCommandState("outdent")}else{return NO}}.property("selection").cacheable(),selectionIsSubscript:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("subscript",false,c)){this.set("isEditing",YES)
}}return b.queryCommandState("subscript")}.property("selection").cacheable(),selectionIsSuperscript:function(a,c){var b=this._document;
if(!b){return NO}if(c!==undefined){if(b.execCommand("superscript",false,c)){this.set("isEditing",YES)
}}return b.queryCommandState("superscript")}.property("selection").cacheable(),selectionFontName:function(l,a){var k=this._document;
if(!k){return""}var f;if(a!==undefined){var g="%@%@".fmt(this.get("layerId"),"-ce-font-temp");
if(k.execCommand("fontname",false,g)){var m=k.getElementsByTagName("font");for(var c=0,b=m.length;
c<b;c++){var e=m[c];if(e.face===g){e.face="";e.style.fontFamily=a}}this.set("isEditing",YES)
}}else{var h=this._findFontTag(this._getSelectedElement());if(h&&h.nodeName.toLowerCase()==="font"){f=h.style.fontFamily
}else{f=null}return f}}.property("selection").cacheable(),selectionFontSize:function(m,l){var a=this._iframe;
var k=this._document;if(!k){return""}var f;if(l!==undefined){var g="%@%@".fmt(this.get("layerId"),"-ce-size-temp");
if(k.execCommand("fontname",false,g)){var n=k.getElementsByTagName("font");for(var c=0,b=n.length;
c<b;c++){var e=n[c];if(e.face===g){e.face="";e.style.fontSize=l}}this.set("isEditing",YES);
return l}}else{var h=this._findFontTag(this._getSelectedElement());if(h&&h.nodeName.toLowerCase()==="font"){f=h.style.fontSize
}else{f=null}return f}}.property("selection").cacheable(),_findFontTag:function(a){while(a.nodeName!=="BODY"){if(a.nodeName==="FONT"){return a
}else{a=a.parentNode}}},selectionFontColor:function(a,b){var c=this._document;if(!c){return""
}if(b!==undefined){if(c.execCommand("forecolor",false,b)){this.set("isEditing",YES);
this._last_font_color_cache=b}}if(this._last_font_color_cache){return this._last_font_color_cache
}else{this._last_font_color_cache=SC.parseColor(c.queryCommandValue("forecolor"))||"";
return this._last_font_color_cache}}.property("selection").cacheable(),selectionBackgroundColor:function(b,c){var e=this._document;
if(!e){return""}var f;if(SC.browser.msie){f="backcolor"}else{f="hilitecolor"}if(!SC.browser.msie){e.execCommand("styleWithCSS",false,true)
}if(c!==undefined){if(e.execCommand(f,false,c)){this.set("isEditing",YES);this._last_background_color_cache=c
}}if(this._last_background_color_cache){return this._last_background_color_cache}else{var a=e.queryCommandValue(f);
if(!SC.browser.msie){e.execCommand("styleWithCSS",false,false)}if(a!=="transparent"){if(SC.parseColor(a)){this._last_background_color_cache=SC.parseColor(a);
return this._last_background_color_cache}}}return""}.property("selection").cacheable(),hyperlinkValue:function(a,b){var c=this.get("selectedHyperlink");
if(!c){return""}if(!SC.none(b)){c.href=b;this.set("isEditing",YES);return b}else{return c.href
}}.property("selectedHyperlink").cacheable(),hyperlinkHoverValue:function(a,b){var c=this.get("selectedHyperlink");
if(!c){return""}if(b!==undefined){c.title=b;this.set("isEditing",YES);return b}else{return c.title
}}.property("selectedHyperlink").cacheable(),imageAlignment:function(a,b){var c=this.get("selectedImage");
if(!c){return""}if(b!==undefined){c.align=b;this.set("isEditing",YES);return b}else{return c.align
}}.property("selectedImage").cacheable(),imageWidth:function(a,b){var c=this.get("selectedImage");
if(!c){return""}if(b!==undefined){this.set("isEditing",YES);c.width=b;c.style.width=b;
return b}else{return c.clientWidth}}.property("selectedImage").cacheable(),imageHeight:function(a,b){var c=this.get("selectedImage");
if(!c){return""}if(b!==undefined){this.set("isEditing",YES);c.height=b;c.style.height=b;
return b}else{return c.clientHeight}}.property("selectedImage").cacheable(),imageDescription:function(a,b){var c=this.get("selectedImage");
if(!c){return""}if(b!==undefined){this.set("isEditing",YES);c.title=b;c.alt=b;return b
}else{return c.alt}}.property("selectedImage").cacheable(),imageBorderWidth:function(a,b){var c=this.get("selectedImage");
if(!c){return""}if(b!==undefined){this.set("isEditing",YES);c.style.borderWidth=b;
return b}else{return c.style.borderWidth}}.property("selectedImage").cacheable(),imageBorderColor:function(b,c){var e=this.get("selectedImage");
if(!e){return""}if(c!==undefined){this.set("isEditing",YES);e.style.borderColor=c;
return c}else{var a=e.style.borderColor;if(a!==""){return SC.parseColor(a)}else{return""
}}}.property("selectedImage").cacheable(),imageBorderStyle:function(a,b){var c=this.get("selectedImage");
if(!c){return""}if(b!==undefined){this.set("isEditing",YES);c.style.borderStyle=b;
return b}else{return c.style.borderStyle}}.property("selectedImage").cacheable(),resetImageDimensions:function(){var a=this.get("selectedImage");
if(!a){return NO}a.style.width="";a.style.height="";a.removeAttribute("width");a.removeAttribute("height");
this.set("isEditing",YES);this.notifyPropertyChange("selectedImage");return a},focus:function(){if(!SC.none(this._document)){this._document.body.focus();
this.set("selection","");this.querySelection()}},querySelection:function(){var c=this._iframe;
if(!c){return}var a="";if(SC.browser.msie){a=this._iframe.document.selection.createRange().text;
if(SC.none(a)){a=""}}else{var b=c.contentWindow;a=b.getSelection()}this._resetColorCache();
this.propertyWillChange("selection");this.set("selection",a.toString());this.propertyDidChange("selection")
},createLink:function(h){var g=this._document;var b=this._iframe;if(!(g&&b)){return NO
}if(SC.none(h)||h===""){return NO}var e="%@%@%@%@%@".fmt("http://",this.get("frameName"),new Date().getTime(),parseInt(Math.random()*100000,0),".com/");
if(g.execCommand("createlink",false,e)){var j=g.getElementsByTagName("A"),i,a;for(var f=0,c=j.length;
f<c;f++){a=j[f];if(a.href===e){i=a;break}}}if(i){i.href=h;this.set("selectedHyperlink",i);
this.set("isEditing",YES);return YES}else{return NO}},removeLink:function(){var a=this._document;
if(!a){return NO}if(a.execCommand("unlink",false,null)){this.set("selectedHyperlink",null);
this.set("isEditing",YES);return YES}return NO},insertImage:function(a){var b=this._document;
if(!b){return NO}if(SC.none(a)||a===""){return NO}if(b.execCommand("insertimage",false,a)){this.set("isEditing",YES);
return YES}return NO},insertHTML:function(b,a){var c=this._document;if(!c){return NO
}if(SC.none(b)||b===""){return NO}if(SC.none(a)||a){b+="\u00a0"}if(SC.browser.msie){c.selection.createRange().pasteHTML(b);
this.set("isEditing",YES);return YES}else{if(c.execCommand("inserthtml",false,b)){this.set("isEditing",YES);
return YES}return NO}},insertView:function(a){if(SC.typeOf(a)===SC.T_STRING){if(a===SC.CONTENT_SET_DIRECTLY){return
}if(a&&a.length>0){if(a.indexOf(".")>0){a=SC.objectForPropertyPath(a,null)}else{a=SC.objectForPropertyPath(a,this.get("page"))
}}}else{if(SC.typeOf(a)===SC.T_CLASS){a=a.create()}}var c=SC.RenderContext(a);c=c.begin("span");
a.prepareContext(c,YES);c=c.end();c=c.join();var b;if(SC.browser.msie){b='<span contenteditable=false unselectable="on">'+c+"</span>"
}else{b='<span contenteditable=false style="-moz-user-select: all">'+c+"</span>"}this.insertHTML(b)
},cleanWordHTML:function(a){a=a.replace(/\<o:p>\s*<\/o:p>/g,"");a=a.replace(/\<o:p>[\s\S]*?<\/o:p>/g,"&nbsp;");
a=a.replace(/\s*<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi,"");a=a.replace(/\s*<w:[^>]*\/?>/gi,"");
a=a.replace(/\s*<\/w:[^>]+>/gi,"");a=a.replace(/\s*<m:[^>]*>[\s\S]*?<\/m:[^>]*>/gi,"");
a=a.replace(/\s*<m:[^>]*\/?>/gi,"");a=a.replace(/\s*<\/m:[^>]+>/gi,"");a=a.replace(/\s*mso-[^:]+:[^;"]+;?/gi,"");
a=a.replace(/\s*mso-[^:]+:[^;]+"?/gi,"");a=a.replace(/\s*MARGIN: 0cm 0cm 0pt\s*;/gi,"");
a=a.replace(/\s*MARGIN: 0cm 0cm 0pt\s*"/gi,'"');a=a.replace(/\s*TEXT-INDENT: 0cm\s*;/gi,"");
a=a.replace(/\s*TEXT-INDENT: 0cm\s*"/gi,'"');a=a.replace(/\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi,'"');
a=a.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi,'"');a=a.replace(/\s*tab-stops:[^;"]*;?/gi,"");
a=a.replace(/\s*tab-stops:[^"]*/gi,"");a=a.replace(/\<\\?\?xml[^>]*>/gi,"");a=a.replace(/\<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi,"<$1$3");
a=a.replace(/\<(\w[^>]*) language=([^ |>]*)([^>]*)/gi,"<$1$3");a=a.replace(/\<(\w[^>]*) onmouseover="([^\"]*)"([^>]*)/gi,"<$1$3");
a=a.replace(/\<(\w[^>]*) onmouseout="([^\"]*)"([^>]*)/gi,"<$1$3");a=a.replace(/\<(meta|link)[^>]+>\s*/gi,"");
return a},commitEditing:function(){var b=this._document;if(!b){return NO}var a=b.body.innerHTML;
if(this.get("cleanInsertedText")){a=this.cleanWordHTML(a)}if(this.get("encodeNewLine")){a=a.replace(/\r/g,"&#13;");
a=a.replace(/\n/g,"&#10;")}if(this.get("encodeContent")){a=this._encodeValues(a)}this.set("value",a);
this.set("isEditing",NO);return YES},selectContent:function(){var a=this._document;
if(!a){return NO}return a.execCommand("selectall",false,null)},selectionDidChange:function(){var e,a,c=null,f=null;
if(SC.browser.msie){var b=this._iframe.document.selection;a=b.createRange();if(a.length===1){e=a.item()
}if(a.parentElement){e=a.parentElement()}}else{var g=this._iframe.contentWindow;b=g.getSelection();
a=b.getRangeAt(0);e=a.startContainer.childNodes[a.startOffset];if(a.startContainer===a.endContainer){if(a.startContainer.parentNode.nodeName==="A"&&a.commonAncestorContiner!==e){f=a.startContainer.parentNode
}else{f=null}}else{f=null}}if(e){if(e.nodeName==="IMG"){c=e;if(e.parentNode.nodeName==="A"){f=e.parentNode
}}else{if(e.nodeName==="A"){f=e}else{c=null;f=null}}}this.set("selectedImage",c);
this.set("selectedHyperlink",f)}.observes("selection"),isEditingDidChange:function(){if(this.get("autoCommit")){this.commitEditing()
}}.observes("isEditing"),_updateAttachedViewLayout:function(){var c=this.get("offsetWidth");
var a=this.get("offsetHeight");var b=this.get("attachedView");var e=b.get("layout");
e=SC.merge(e,{width:c,height:a});b.adjust(e)},_updateLayout:function(){var e=this._document;
if(!e){return}var b,a;if(SC.browser.msie){b=e.body.scrollWidth;a=e.body.scrollHeight
}else{b=e.body.offsetWidth;a=e.body.offsetHeight}if(a<this._minHeight){a=this._minHeight
}if(b<this._minWidth){b=this._minWidth}this.set("offsetWidth",b);this.set("offsetHeight",a);
if(this.get("attachedView")){this._updateAttachedViewLayout()}if(!this.get("hasFixedDimensions")){var c=this.get("layout");
c=SC.merge(c,{width:b,height:a});this.propertyWillChange("layout");this.adjust(c);
this.propertyDidChange("layout")}},_getFrame:function(){var a;if(SC.browser.msie){a=document.frames(this.get("frameName"))
}else{a=this.$("iframe").firstObject()}if(!SC.none(a)){return a}return null},_getDocument:function(){var b=this._getFrame();
if(SC.none(b)){return null}var a;if(SC.browser.msie){a=b.document}else{a=b.contentDocument
}if(SC.none(a)){return null}return a},_getSelection:function(){var a;if(SC.browser.msie){a=this._getDocument().selection
}else{a=this._getFrame().contentWindow.getSelection()}return a},_getSelectedElemented:function(){var b=this._getSelection();
var e;if(SC.browser.msie){e=b.createRange().parentElement()}else{var a=b.anchorNode;
var c=b.focusNode;if(a&&c){if(a.nodeType===3&&c.nodeType===3){if(a.parentNode===c.parentNode){e=a.parentNode
}}}}return e},_encodeValues:function(e){var g=e.match(/href=".*?"/gi);if(g){var a,f;
for(var c=0,b=g.length;c<b;c++){a=f=g[c];e=e.replace(/\%3C/gi,"<");e=e.replace(/\%3E/gi,">");
e=e.replace(/\%20/g," ");e=e.replace(/\&amp;/gi,"&");e=e.replace(/\%27/g,"'");e=e.replace(a,f)
}}return e},_getSelectedElement:function(){var b=this._getSelection(),a,e;var c=this._document;
if(SC.browser.msie){a=c.selection.createRange();if(a){e=a.item?a.item(0):a.parentElement()
}}else{if(b.rangeCount>0){a=b.getRangeAt(0)}if(a){if(b.anchorNode&&(b.anchorNode.nodeType==3)){if(b.anchorNode.parentNode){e=b.anchorNode.parentNode
}if(b.anchorNode.nextSibling!=b.focusNode.nextSibling){e=b.anchorNode.nextSibling
}}if(!e){e=a.commonAncestorContainer;if(!a.collapsed){if(a.startContainer==a.endContainer){if(a.startOffset-a.endOffset<2){if(a.startContainer.hasChildNodes()){e=a.startContainer.childNodes[a.startOffset]
}}}}}}}return e},_resetColorCache:function(){this._last_font_color_cache=null;this._last_background_color_cache=null
}});require("core");SCUI.DisclosedView=SC.View.extend({classNames:["scui-disclosed-view"],displayProperties:["isOpen","statusIconName"],contentView:null,title:"",description:"",iconCSSName:"",statusIconName:"",_contentView:null,_collapsedView:SC.View,isOpen:YES,titleBar:SC.DisclosureView,containerView:SC.ContainerView,collapsedHeight:44,expandedHeight:300,mode:SCUI.DISCLOSED_STAND_ALONE,init:function(){arguments.callee.base.apply(this,arguments)
},createChildViews:function(){var b=[],a;var f=this.get("contentView");var c;var e=this;
a=this._titleBar=this.createChildView(this.titleBar.extend({layout:{top:0,left:5,right:5,height:e.get("collapsedHeight")},titleBinding:SC.binding(".title",this),descriptionBinding:SC.binding(".description",this),iconCSSNameBinding:SC.binding(".iconCSSName",this),statusIconNameBinding:SC.binding(".statusIconName",this),value:this.get("isOpen"),displayProperties:"statusIconName".w(),render:function(g,h){g=g.begin("div").addClass("disclosure-inner");
g=g.begin("div").addClass("disclosure-label");g=g.begin("img").attr({src:SC.BLANK_IMAGE_URL,alt:""}).addClass("button").end();
g=g.begin("img").attr({src:SC.BLANK_IMAGE_URL,alt:""}).addClass("icon").addClass(this.iconCSSName).end();
g=g.begin("img").attr({src:SC.BLANK_IMAGE_URL,alt:""}).addClass("status").addClass(this.statusIconName).end();
g=g.begin("span").addClass("title").push(this.get("displayTitle")).end();g.attr("title",this.description);
g.attr("alt",this.description);g=g.end();g=g.end()},mouseDown:function(g){if(g.target.className!=="button"){return NO
}else{return YES}},_valueObserver:function(){if(this.owner&&this.owner.toggle){this.owner.toggle(this.get("value"))
}}.observes("value")}),{rootElementPath:[0]});b.push(a);f=this.createChildView(f,{classNames:"processing-step-settings".w(),layout:{top:e.get("collapsedHeight")-5,left:5,right:5},render:function(g,h){arguments.callee.base.apply(this,arguments);
if(h){g=g.begin("div").addClass("bottom-left-edge").push("").end();g=g.begin("div").addClass("bottom-right-edge").push("").end()
}}});b.push(f);this.set("childViews",b);return this},render:function(a,b){this._setupView();
arguments.callee.base.apply(this,arguments)},toggle:function(a){if(!a){this.set("isOpen",NO);
if(this.get("mode")===SCUI.DISCLOSED_STAND_ALONE){this._updateHeight(YES)}else{if(this.owner&&this.owner.collapse){this.owner.collapse()
}}}else{this.set("isOpen",YES);if(this.get("mode")===SCUI.DISCLOSED_STAND_ALONE){this._updateHeight()
}else{if(this.owner&&this.owner.expand){this.owner.expand()}}}},updateHeight:function(a,b){if(a){this._updateHeight(b)
}else{this.invokeLast(this._updateHeight)}return this},_updateHeight:function(b){var a;
if(!b){a=this.get("expandedHeight")}else{a=this.get("collapsedHeight")}this.adjust("height",a)
},_createChildViewIfNeeded:function(a){if(SC.typeOf(a)===SC.T_CLASS){return this.createChildView(a)
}else{return a}},_setupView:function(){var a=this.get("isOpen");var b=this.get("mode");
if(a){if(this.get("mode")===SCUI.DISCLOSED_STAND_ALONE){this.updateHeight()}}else{if(this.get("mode")===SCUI.DISCLOSED_STAND_ALONE){this._updateHeight(YES)
}}}});SCUI.LoadingSpinnerView=SC.View.extend({layout:{left:0,right:0,top:0,bottom:0},totalFrames:28,frameChangeInterval:200,callCount:0,appendTo:function(a){if(this.get("callCount")===0){a.appendChild(this)
}this.set("isVisible",true);this.invokeLater(function(){this.set("callCount",this.get("callCount")+1)
});return this},remove:function(){this.set("callCount",this.get("callCount")-1);if(this.get("callCount")<=0){this.set("_state",SCUI.LoadingSpinnerView.STOPPED);
this.get("parentView").removeChild(this);this.destroy()}},callCountDidChange:function(){if(this.get("parentView")!==null){if(this.get("_state")===SCUI.LoadingSpinnerView.STOPPED&&this.get("callCount")>0){this.set("isVisible",true);
this.set("_state",SCUI.LoadingSpinnerView.PLAYING);this.get("spinnerView").nextFrame()
}}if(this.get("callCount")<=0){this.set("isVisible",false);this.set("_state",SCUI.LoadingSpinnerView.STOPPED)
}}.observes("callCount"),theme:"lightTrans",childViews:"spinnerView".w(),spinnerView:SC.View.design({layout:{centerX:0,centerY:0,height:18,width:18},classNames:["loadingSpinner"],currentFrame:0,frameChangeInterval:200,_state:null,init:function(){arguments.callee.base.apply(this,arguments);
this.get("classNames").push(this.getPath("parentView.theme"));this.set("frameChangeInterval",this.getPath("parentView.frameChangeInterval"));
this.set("_state",this.getPath("parentView._state"))},nextFrame:function(){var a=this.get("currentFrame");
var b=0-this.get("layout").height*a;this.$().css("background-position","0px %@1px".fmt(b));
if(this.get("currentState")===SCUI.LoadingSpinnerView.PLAYING){this.invokeLater(function(){this.nextFrame()
},this.get("frameChangeInterval"))}a+=1;if(a===this.getPath("parentView.totalFrames")){a=0
}this.set("currentFrame",a)},currentState:function(){return this.getPath("parentView._state")
}.property()}),_state:"STOPPED"});SC.mixin(SCUI.LoadingSpinnerView,{PLAYING:"PLAYING",STOPPED:"STOPPED"});
SCUI.SelectFieldTab=SC.View.extend({classNames:["scui-select-field-tab-view"],displayProperties:["nowShowing"],nowShowing:null,items:[],isEnabled:YES,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemToolTipKey:null,_tab_nowShowingDidChange:function(){var a=this.get("nowShowing");
this.get("containerView").set("nowShowing",a);this.get("selectFieldView").set("value",a);
return this}.observes("nowShowing"),_tab_itemsDidChange:function(){this.get("selectFieldView").set("items",this.get("items"));
return this}.observes("items"),_isEnabledDidChange:function(){var a=this.get("isEnabled");
if(this.containerView&&this.containerView.set){this.containerView.set("isEnabled",a)
}if(this.selectFieldView&&this.selectFieldView.set){this.selectFieldView.set("isEnabled",a)
}}.observes("isEnabled"),init:function(){arguments.callee.base.apply(this,arguments);
this._tab_nowShowingDidChange()._tab_itemsDidChange()},createChildViews:function(){var e=[],b,a;
var c=this.get("isEnabled");a=this.containerView.extend({layout:{top:24,left:0,right:0,bottom:0}});
b=this.containerView=this.createChildView(a,{isEnabled:c});e.push(b);b=this.selectFieldView=this.createChildView(this.selectFieldView,{isEnabled:c});
e.push(b);this.set("childViews",e);return this},containerView:SC.ContainerView,selectFieldView:SC.SelectFieldView.extend({layout:{left:4,right:0,height:24},items:function(a,b){if(b===undefined){return this.get("objects")
}else{return this.set("objects",b)}}.property("objects").cacheable(),itemTitleKey:function(a,b){if(b===undefined){return this.get("nameKey")
}else{return this.set("nameKey",b)}}.property("nameKey").cacheable(),itemValueKey:function(a,b){if(b===undefined){return this.get("valueKey")
}else{return this.set("valueKey",b)}}.property("valueKey").cacheable(),_scui_select_field_valueDidChange:function(){var a=this.get("parentView");
if(a){a.set("nowShowing",this.get("value"))}this.set("layerNeedsUpdate",YES);this.invokeOnce(this.updateLayerIfNeeded)
}.observes("value"),init:function(){var a=this.get("parentView");if(a){SC._TAB_ITEM_KEYS.forEach(function(b){this[SCUI._SELECT_TAB_TRANSLATOR[b]]=a.get(b)
},this)}return arguments.callee.base.apply(this,arguments)}})});SCUI._SELECT_TAB_TRANSLATOR={itemTitleKey:"nameKey",itemValueKey:"valueKey",items:"objects"};
SCUI.StepperView=SC.View.extend({layout:{top:0,left:0,width:19,height:27},value:0,increment:1,max:null,min:null,valueWraps:NO,createChildViews:function(){var f=[];
var e=this.get("value");var a=this.get("increment");var c=this;var b=this.createChildView(SC.ButtonView.design({classNames:["scui-stepper-view-top"],layout:{top:0,left:0,width:19,height:13},mouseUp:function(){arguments.callee.base.apply(this,arguments);
var j=c.get("value");j=j-0;var g=c.get("max");j=j+a;var i=c.get("valueWraps");if(g===null||j<=g){c.set("value",j)
}else{if(i){var h=c.get("min");if(h!==null){j=j-g-a;j=j+h;c.set("value",j)}}}}}));
f.push(b);b=this.createChildView(SC.ButtonView.design({classNames:["scui-stepper-view-bottom"],layout:{top:14,left:0,width:19,height:13},mouseUp:function(){arguments.callee.base.apply(this,arguments);
var j=c.get("value");j=j-0;var i=c.get("min");j=j-a;var h=c.get("valueWraps");if(i===null||j>=i){c.set("value",j)
}else{if(h){var g=c.get("max");if(g!==null){j=i-j-a;j=g-j;c.set("value",j)}}}}}));
f.push(b);this.set("childViews",f)}});SCUI.UploadView=SC.View.extend({value:null,uploadTarget:null,status:"",inputName:"Filedata",displayProperties:"uploadTarget".w(),render:function(c,i){var e=this.get("layerId")+"Frame";
var h=this.get("uploadTarget");var b=this.get("label");var a=this.get("inputName");
if(i){this._firstTime=YES;c.push('<form method="post" enctype="multipart/form-data" target="'+e+'" action="'+h+'">');
c.push('<input type="file" name="'+a+'" />');c.push("</form>");c.push('<iframe frameborder="0" id="'+e+'" name="'+e+'" style="width:0; height:0;"></iframe>')
}else{var g=this._getForm();if(g){g.action=h}}arguments.callee.base.apply(this,arguments)
},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);var b=this.$("iframe");
var a=this.$("input");SC.Event.add(b,"load",this,this._uploadDone);SC.Event.add(a,"change",this,this._checkInputValue);
this.set("status",SCUI.READY)},willDestroyLayer:function(){var b=this.$("iframe");
var a=this.$("input");SC.Event.remove(b,"load",this,this._uploadDone);SC.Event.remove(a,"change",this,this._checkInputValue);
arguments.callee.base.apply(this,arguments)},startUpload:function(){var a=this._getForm();
if(a){a.submit();this.set("status",SCUI.BUSY)}},clearFileUpload:function(){var b=this._getForm();
if(b){var a=this.$("input");SC.Event.remove(a,"change",this,this._checkInputValue);
b.innerHTML=b.innerHTML;this.set("status",SCUI.READY);this.set("value",null);a=this.$("input");
SC.Event.add(a,"change",this,this._checkInputValue)}},validateFileSelection:function(){var a=this.get("value");
if(a){return YES}return NO},_uploadDone:function(){if(SC.browser.msie){if(!this._firstTime){SC.RunLoop.begin();
this.set("status",SCUI.DONE);SC.RunLoop.end()}this._firstTime=NO}else{SC.RunLoop.begin();
this.set("status",SCUI.DONE);SC.RunLoop.end()}},_checkInputValue:function(){SC.RunLoop.begin();
var a=this._getInput();this.set("value",a.value);SC.RunLoop.end()},_getForm:function(){var a=this.$("form");
if(a&&a.length>0){return a.get(0)}return null},_getInput:function(){var a=this.$("input");
if(a&&a.length>0){return a.get(0)}return null}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("scui/foundation");
/*
 * Raphael 1.4.3 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
}Raphael=(function(){function aB(){if(aB.is(arguments[0],aW)){var e=arguments[0],E=C[bl](aB,e.splice(0,3+aB.is(e[0],ay))),bq=E.set();
for(var S=0,br=e[o];S<br;S++){var R=e[S]||{};ba.test(R.type)&&bq[f](E[R.type]().attr(R))
}return bq}return C[bl](aB,arguments)}aB.version="1.4.3";var a=/[, ]+/,ba=/^(circle|rect|path|ellipse|text|image)$/,bn="prototype",ac="hasOwnProperty",W=document,aI=window,n={was:Object[bn][ac].call(aI,"Raphael"),is:aI.Raphael},bi=function(){},a6="appendChild",bl="apply",bg="concat",Q="createTouch" in W,aH="",aA=" ",G="split",N="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[G](aA),bb={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},aO="join",o="length",bp=String[bn].toLowerCase,ak=Math,h=ak.max,a4=ak.min,ay="number",ab="string",aW="array",aQ="toString",aT="fill",aL=Object[bn][aQ],bd={},a7=ak.pow,f="push",bj=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+?)['"]?\)$/i,D=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%))\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,Z=ak.round,B="setAttribute",af=parseFloat,O=parseInt,aU=" progid:DXImageTransform.Microsoft",a9=String[bn].toUpperCase,l={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},ai={along:"along",blur:ay,"clip-rect":"csv",cx:ay,cy:ay,fill:"colour","fill-opacity":ay,"font-size":ay,height:ay,opacity:ay,path:"path",r:ay,rotation:"csv",rx:ay,ry:ay,scale:"csv",stroke:"colour","stroke-opacity":ay,"stroke-width":ay,translation:"csv",width:ay,x:ay,y:ay},bc="replace";
aB.type=(aI.SVGAngle||W.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(aB.type=="VML"){var aq=W.createElement("div");aq.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(aq.childNodes[o]!=2){return aB.type=null}aq=null}aB.svg=!(aB.vml=aB.type=="VML");
bi[bn]=aB[bn];aB._id=0;aB._oid=0;aB.fn={};aB.is=function(i,e){e=bp.call(e);return(e=="object"&&i===Object(i))||(e=="undefined"&&typeof i==e)||(e=="null"&&i==null)||bp.call(aL.call(i).slice(8,-1))==e
};aB.setWindow=function(e){aI=e;W=aI.document};var aX=function(E){if(aB.vml){var e=/^\s+|\s+$/g;
aX=au(function(S){var bq;S=(S+aH)[bc](e,aH);try{var br=new aI.ActiveXObject("htmlfile");
br.write("<body>");br.close();bq=br.body}catch(bt){bq=aI.createPopup().document.body
}var i=bq.createTextRange();try{bq.style.color=S;var bs=i.queryCommandValue("ForeColor");
bs=((bs&255)<<16)|(bs&65280)|((bs&16711680)>>>16);return"#"+("000000"+bs[aQ](16)).slice(-6)
}catch(bt){return"none"}})}else{var R=W.createElement("i");R.title="Rapha\xebl Colour Picker";
R.style.display="none";W.body[a6](R);aX=au(function(i){R.style.color=i;return W.defaultView.getComputedStyle(R,aH).getPropertyValue("color")
})}return aX(E)};var av=function(){return"hsb("+[this.h,this.s,this.b]+")"},z=function(){return this.hex
};aB.hsb2rgb=au(function(bu,bs,by){if(aB.is(bu,"object")&&"h" in bu&&"s" in bu&&"b" in bu){by=bu.b;
bs=bu.s;bu=bu.h}var S,bq,bz;if(by==0){return{r:0,g:0,b:0,hex:"#000"}}if(bu>1||bs>1||by>1){bu/=255;
bs/=255;by/=255}var br=~~(bu*6),bv=(bu*6)-br,R=by*(1-bs),E=by*(1-(bs*bv)),bA=by*(1-(bs*(1-bv)));
S=[by,E,R,R,bA,by,by][br];bq=[bA,by,by,E,R,R,bA][br];bz=[R,R,bA,by,by,E,R][br];S*=255;
bq*=255;bz*=255;var bw={r:S,g:bq,b:bz,toString:z},e=(~~S)[aQ](16),bt=(~~bq)[aQ](16),bx=(~~bz)[aQ](16);
e=e[bc](bj,"0");bt=bt[bc](bj,"0");bx=bx[bc](bj,"0");bw.hex="#"+e+bt+bx;return bw},aB);
aB.rgb2hsb=au(function(e,i,bs){if(aB.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bs=e.b;
i=e.g;e=e.r}if(aB.is(e,ab)){var bu=aB.getRGB(e);e=bu.r;i=bu.g;bs=bu.b}if(e>1||i>1||bs>1){e/=255;
i/=255;bs/=255}var br=h(e,i,bs),E=a4(e,i,bs),S,R,bq=br;if(E==br){return{h:0,s:0,b:br}
}else{var bt=(br-E);R=bt/br;if(e==br){S=(i-bs)/bt}else{if(i==br){S=2+((bs-e)/bt)}else{S=4+((e-i)/bt)
}}S/=6;S<0&&S++;S>1&&S--}return{h:S,s:R,b:bq,toString:av}},aB);var aY=/,?([achlmqrstvxz]),?/gi,a0=/\s*,\s*/,j={hs:1,rg:1};
aB._path2string=function(){return this.join(",")[bc](aY,"$1")};function au(R,i,e){function E(){var S=Array[bn].slice.call(arguments,0),br=S[aO]("\u25ba"),bq=E.cache=E.cache||{},bs=E.count=E.count||[];
if(bq[ac](br)){return e?e(bq[br]):bq[br]}bs[o]>=1000&&delete bq[bs.shift()];bs[f](br);
bq[br]=R[bl](i,S);return e?e(bq[br]):bq[br]}return E}aB.getRGB=au(function(i){if(!i||!!((i=i+aH).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(i=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(j[ac](i.substring(0,2))||i.charAt()=="#")&&(i=aX(i));
var br,E,R,bu,bq,bv,bs=i.match(D);if(bs){if(bs[2]){bu=O(bs[2].substring(5),16);R=O(bs[2].substring(3,5),16);
E=O(bs[2].substring(1,3),16)}if(bs[3]){bu=O((bv=bs[3].charAt(3))+bv,16);R=O((bv=bs[3].charAt(2))+bv,16);
E=O((bv=bs[3].charAt(1))+bv,16)}if(bs[4]){bs=bs[4][G](a0);E=af(bs[0]);R=af(bs[1]);
bu=af(bs[2]);bq=af(bs[3])}if(bs[5]){bs=bs[5][G](a0);E=af(bs[0])*2.55;R=af(bs[1])*2.55;
bu=af(bs[2])*2.55;bq=af(bs[3])}if(bs[6]){bs=bs[6][G](a0);E=af(bs[0]);R=af(bs[1]);
bu=af(bs[2]);return aB.hsb2rgb(E,R,bu)}if(bs[7]){bs=bs[7][G](a0);E=af(bs[0])*2.55;
R=af(bs[1])*2.55;bu=af(bs[2])*2.55;return aB.hsb2rgb(E,R,bu)}bs={r:E,g:R,b:bu};var e=(~~E)[aQ](16),S=(~~R)[aQ](16),bt=(~~bu)[aQ](16);
e=e[bc](bj,"0");S=S[bc](bj,"0");bt=bt[bc](bj,"0");bs.hex="#"+e+S+bt;isFinite(af(bq))&&(bs.o=bq);
return bs}return{r:-1,g:-1,b:-1,hex:"none",error:1}},aB);aB.getColor=function(i){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:i||0.75},e=this.hsb2rgb(E.h,E.s,E.b);
E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b})
}return e.hex};aB.getColor.reset=function(){delete this.start};var aJ=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,az=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
aB.parsePathString=au(function(e){if(!e){return null}var E={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},i=[];
if(aB.is(e,aW)&&aB.is(e[0],aW)){i=aK(e)}if(!i[o]){(e+aH)[bc](aJ,function(S,R,bs){var br=[],bq=bp.call(R);
bs[bc](az,function(bu,bt){bt&&br[f](+bt)});if(bq=="m"&&br[o]>2){i[f]([R][bg](br.splice(0,2)));
bq="l";R=R=="m"?"l":"L"}while(br[o]>=E[bq]){i[f]([R][bg](br.splice(0,E[bq])));if(!E[bq]){break
}}})}i[aQ]=aB._path2string;return i});aB.findDotsAtSegment=function(i,e,bF,bD,br,S,bt,bs,bz){var bx=1-bz,bw=a7(bx,3)*i+a7(bx,2)*3*bz*bF+bx*3*bz*bz*br+a7(bz,3)*bt,bu=a7(bx,3)*e+a7(bx,2)*3*bz*bD+bx*3*bz*bz*S+a7(bz,3)*bs,bB=i+2*bz*(bF-i)+bz*bz*(br-2*bF+i),bA=e+2*bz*(bD-e)+bz*bz*(S-2*bD+e),bE=bF+2*bz*(br-bF)+bz*bz*(bt-2*br+bF),bC=bD+2*bz*(S-bD)+bz*bz*(bs-2*S+bD),by=(1-bz)*i+bz*bF,bv=(1-bz)*e+bz*bD,R=(1-bz)*br+bz*bt,E=(1-bz)*S+bz*bs,bq=(90-ak.atan((bB-bE)/(bA-bC))*180/ak.PI);
(bB>bE||bA<bC)&&(bq+=180);return{x:bw,y:bu,m:{x:bB,y:bA},n:{x:bE,y:bC},start:{x:by,y:bv},end:{x:R,y:E},alpha:bq}
};var ae=au(function(bw){if(!bw){return{x:0,y:0,width:0,height:0}}bw=P(bw);var bt=0,bs=0,S=[],E=[],R;
for(var bq=0,bv=bw[o];bq<bv;bq++){R=bw[bq];if(R[0]=="M"){bt=R[1];bs=R[2];S[f](bt);
E[f](bs)}else{var br=aV(bt,bs,R[1],R[2],R[3],R[4],R[5],R[6]);S=S[bg](br.min.x,br.max.x);
E=E[bg](br.min.y,br.max.y);bt=R[5];bs=R[6]}}var e=a4[bl](0,S),bu=a4[bl](0,E);return{x:e,y:bu,width:h[bl](0,S)-e,height:h[bl](0,E)-bu}
}),aK=function(br){var R=[];if(!aB.is(br,aW)||!aB.is(br&&br[0],aW)){br=aB.parsePathString(br)
}for(var E=0,S=br[o];E<S;E++){R[E]=[];for(var e=0,bq=br[E][o];e<bq;e++){R[E][e]=br[E][e]
}}R[aQ]=aB._path2string;return R},an=au(function(S){if(!aB.is(S,aW)||!aB.is(S&&S[0],aW)){S=aB.parsePathString(S)
}var bv=[],bx=0,bw=0,bA=0,bz=0,R=0;if(S[0][0]=="M"){bx=S[0][1];bw=S[0][2];bA=bx;bz=bw;
R++;bv[f](["M",bx,bw])}for(var bs=R,bB=S[o];bs<bB;bs++){var e=bv[bs]=[],by=S[bs];
if(by[0]!=bp.call(by[0])){e[0]=bp.call(by[0]);switch(e[0]){case"a":e[1]=by[1];e[2]=by[2];
e[3]=by[3];e[4]=by[4];e[5]=by[5];e[6]=+(by[6]-bx).toFixed(3);e[7]=+(by[7]-bw).toFixed(3);
break;case"v":e[1]=+(by[1]-bw).toFixed(3);break;case"m":bA=by[1];bz=by[2];default:for(var br=1,bt=by[o];
br<bt;br++){e[br]=+(by[br]-((br%2)?bx:bw)).toFixed(3)}}}else{e=bv[bs]=[];if(by[0]=="m"){bA=by[1]+bx;
bz=by[2]+bw}for(var bq=0,E=by[o];bq<E;bq++){bv[bs][bq]=by[bq]}}var bu=bv[bs][o];switch(bv[bs][0]){case"z":bx=bA;
bw=bz;break;case"h":bx+=+bv[bs][bu-1];break;case"v":bw+=+bv[bs][bu-1];break;default:bx+=+bv[bs][bu-2];
bw+=+bv[bs][bu-1]}}bv[aQ]=aB._path2string;return bv},0,aK),w=au(function(S){if(!aB.is(S,aW)||!aB.is(S&&S[0],aW)){S=aB.parsePathString(S)
}var bu=[],bw=0,bv=0,bz=0,by=0,R=0;if(S[0][0]=="M"){bw=+S[0][1];bv=+S[0][2];bz=bw;
by=bv;R++;bu[0]=["M",bw,bv]}for(var bs=R,bA=S[o];bs<bA;bs++){var e=bu[bs]=[],bx=S[bs];
if(bx[0]!=a9.call(bx[0])){e[0]=a9.call(bx[0]);switch(e[0]){case"A":e[1]=bx[1];e[2]=bx[2];
e[3]=bx[3];e[4]=bx[4];e[5]=bx[5];e[6]=+(bx[6]+bw);e[7]=+(bx[7]+bv);break;case"V":e[1]=+bx[1]+bv;
break;case"H":e[1]=+bx[1]+bw;break;case"M":bz=+bx[1]+bw;by=+bx[2]+bv;default:for(var br=1,bt=bx[o];
br<bt;br++){e[br]=+bx[br]+((br%2)?bw:bv)}}}else{for(var bq=0,E=bx[o];bq<E;bq++){bu[bs][bq]=bx[bq]
}}switch(e[0]){case"Z":bw=bz;bv=by;break;case"H":bw=e[1];break;case"V":bv=e[1];break;
default:bw=bu[bs][bu[bs][o]-2];bv=bu[bs][bu[bs][o]-1]}}bu[aQ]=aB._path2string;return bu
},null,aK),bm=function(i,R,e,E){return[i,R,e,E,e,E]},a5=function(i,R,br,S,e,E){var bq=1/3,bs=2/3;
return[bq*i+bs*br,bq*R+bs*S,bq*e+bs*br,bq*E+bs*S,e,E]},V=function(bA,b5,bJ,bH,bB,bv,bq,bz,b4,bC){var S=ak.PI,bG=S*120/180,e=S/180*(+bB||0),bN=[],bK,b1=au(function(b6,b9,i){var b8=b6*ak.cos(i)-b9*ak.sin(i),b7=b6*ak.sin(i)+b9*ak.cos(i);
return{x:b8,y:b7}});if(!bC){bK=b1(bA,b5,-e);bA=bK.x;b5=bK.y;bK=b1(bz,b4,-e);bz=bK.x;
b4=bK.y;var E=ak.cos(S/180*bB),bx=ak.sin(S/180*bB),bP=(bA-bz)/2,bO=(b5-b4)/2;var bZ=(bP*bP)/(bJ*bJ)+(bO*bO)/(bH*bH);
if(bZ>1){bZ=ak.sqrt(bZ);bJ=bZ*bJ;bH=bZ*bH}var R=bJ*bJ,bS=bH*bH,bU=(bv==bq?-1:1)*ak.sqrt(ak.abs((R*bS-R*bO*bO-bS*bP*bP)/(R*bO*bO+bS*bP*bP))),bE=bU*bJ*bO/bH+(bA+bz)/2,bD=bU*-bH*bP/bJ+(b5+b4)/2,bu=ak.asin(((b5-bD)/bH).toFixed(7)),bt=ak.asin(((b4-bD)/bH).toFixed(7));
bu=bA<bE?S-bu:bu;bt=bz<bE?S-bt:bt;bu<0&&(bu=S*2+bu);bt<0&&(bt=S*2+bt);if(bq&&bu>bt){bu=bu-S*2
}if(!bq&&bt>bu){bt=bt-S*2}}else{bu=bC[0];bt=bC[1];bE=bC[2];bD=bC[3]}var by=bt-bu;
if(ak.abs(by)>bG){var bF=bt,bI=bz,bw=b4;bt=bu+bG*(bq&&bt>bu?1:-1);bz=bE+bJ*ak.cos(bt);
b4=bD+bH*ak.sin(bt);bN=V(bz,b4,bJ,bH,bB,0,bq,bI,bw,[bt,bF,bE,bD])}by=bt-bu;var bs=ak.cos(bu),b3=ak.sin(bu),br=ak.cos(bt),b2=ak.sin(bt),bQ=ak.tan(by/4),bT=4/3*bJ*bQ,bR=4/3*bH*bQ,b0=[bA,b5],bY=[bA+bT*b3,b5-bR*bs],bX=[bz+bT*b2,b4-bR*br],bV=[bz,b4];
bY[0]=2*b0[0]-bY[0];bY[1]=2*b0[1]-bY[1];if(bC){return[bY,bX,bV][bg](bN)}else{bN=[bY,bX,bV][bg](bN)[aO]()[G](",");
var bL=[];for(var bW=0,bM=bN[o];bW<bM;bW++){bL[bW]=bW%2?b1(bN[bW-1],bN[bW],e).y:b1(bN[bW],bN[bW+1],e).x
}return bL}},Y=function(i,e,R,E,bt,bs,br,bq,bu){var S=1-bu;return{x:a7(S,3)*i+a7(S,2)*3*bu*R+S*3*bu*bu*bt+a7(bu,3)*br,y:a7(S,3)*e+a7(S,2)*3*bu*E+S*3*bu*bu*bs+a7(bu,3)*bq}
},aV=au(function(E,e,S,R,bA,bz,bw,bt){var by=(bA-2*S+E)-(bw-2*bA+S),bv=2*(S-E)-2*(bA-S),bs=E-S,br=(-bv+ak.sqrt(bv*bv-4*by*bs))/2/by,bq=(-bv-ak.sqrt(bv*bv-4*by*bs))/2/by,bu=[e,bt],bx=[E,bw],i;
ak.abs(br)>1000000000000&&(br=0.5);ak.abs(bq)>1000000000000&&(bq=0.5);if(br>0&&br<1){i=Y(E,e,S,R,bA,bz,bw,bt,br);
bx[f](i.x);bu[f](i.y)}if(bq>0&&bq<1){i=Y(E,e,S,R,bA,bz,bw,bt,bq);bx[f](i.x);bu[f](i.y)
}by=(bz-2*R+e)-(bt-2*bz+R);bv=2*(R-e)-2*(bz-R);bs=e-R;br=(-bv+ak.sqrt(bv*bv-4*by*bs))/2/by;
bq=(-bv-ak.sqrt(bv*bv-4*by*bs))/2/by;ak.abs(br)>1000000000000&&(br=0.5);ak.abs(bq)>1000000000000&&(bq=0.5);
if(br>0&&br<1){i=Y(E,e,S,R,bA,bz,bw,bt,br);bx[f](i.x);bu[f](i.y)}if(bq>0&&bq<1){i=Y(E,e,S,R,bA,bz,bw,bt,bq);
bx[f](i.x);bu[f](i.y)}return{min:{x:a4[bl](0,bx),y:a4[bl](0,bu)},max:{x:h[bl](0,bx),y:h[bl](0,bu)}}
}),P=au(function(bA,bv){var S=w(bA),bw=bv&&w(bv),bx={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},br=function(bB,bC){var i,bD;
if(!bB){return["C",bC.x,bC.y,bC.x,bC.y,bC.x,bC.y]}!(bB[0] in {T:1,Q:1})&&(bC.qx=bC.qy=null);
switch(bB[0]){case"M":bC.X=bB[1];bC.Y=bB[2];break;case"A":bB=["C"][bg](V[bl](0,[bC.x,bC.y][bg](bB.slice(1))));
break;case"S":i=bC.x+(bC.x-(bC.bx||bC.x));bD=bC.y+(bC.y-(bC.by||bC.y));bB=["C",i,bD][bg](bB.slice(1));
break;case"T":bC.qx=bC.x+(bC.x-(bC.qx||bC.x));bC.qy=bC.y+(bC.y-(bC.qy||bC.y));bB=["C"][bg](a5(bC.x,bC.y,bC.qx,bC.qy,bB[1],bB[2]));
break;case"Q":bC.qx=bB[1];bC.qy=bB[2];bB=["C"][bg](a5(bC.x,bC.y,bB[1],bB[2],bB[3],bB[4]));
break;case"L":bB=["C"][bg](bm(bC.x,bC.y,bB[1],bB[2]));break;case"H":bB=["C"][bg](bm(bC.x,bC.y,bB[1],bC.y));
break;case"V":bB=["C"][bg](bm(bC.x,bC.y,bC.x,bB[1]));break;case"Z":bB=["C"][bg](bm(bC.x,bC.y,bC.X,bC.Y));
break}return bB},E=function(bB,bC){if(bB[bC][o]>7){bB[bC].shift();var bD=bB[bC];while(bD[o]){bB.splice(bC++,0,["C"][bg](bD.splice(0,6)))
}bB.splice(bC,1);by=h(S[o],bw&&bw[o]||0)}},R=function(bF,bE,bC,bB,bD){if(bF&&bE&&bF[bD][0]=="M"&&bE[bD][0]!="M"){bE.splice(bD,0,["M",bB.x,bB.y]);
bC.bx=0;bC.by=0;bC.x=bF[bD][1];bC.y=bF[bD][2];by=h(S[o],bw&&bw[o]||0)}};for(var bt=0,by=h(S[o],bw&&bw[o]||0);
bt<by;bt++){S[bt]=br(S[bt],bx);E(S,bt);bw&&(bw[bt]=br(bw[bt],e));bw&&E(bw,bt);R(S,bw,bx,e,bt);
R(bw,S,e,bx,bt);var bs=S[bt],bz=bw&&bw[bt],bq=bs[o],bu=bw&&bz[o];bx.x=bs[bq-2];bx.y=bs[bq-1];
bx.bx=af(bs[bq-4])||bx.x;bx.by=af(bs[bq-3])||bx.y;e.bx=bw&&(af(bz[bu-4])||e.x);e.by=bw&&(af(bz[bu-3])||e.y);
e.x=bw&&bz[bu-2];e.y=bw&&bz[bu-1]}return bw?[S,bw]:S},null,aK),u=au(function(bu){var bt=[];
for(var bq=0,bv=bu[o];bq<bv;bq++){var e={},bs=bu[bq].match(/^([^:]*):?([\d\.]*)/);
e.color=aB.getRGB(bs[1]);if(e.color.error){return null}e.color=e.color.hex;bs[2]&&(e.offset=bs[2]+"%");
bt[f](e)}for(bq=1,bv=bt[o]-1;bq<bv;bq++){if(!bt[bq].offset){var E=af(bt[bq-1].offset||0),R=0;
for(var S=bq+1;S<bv;S++){if(bt[S].offset){R=bt[S].offset;break}}if(!R){R=100;S=bv
}R=af(R);var br=(R-E)/(S-bq+1);for(;bq<S;bq++){E+=br;bt[bq].offset=E+"%"}}}return bt
}),aC=function(e,S,E,R){var i;if(aB.is(e,ab)||aB.is(e,"object")){i=aB.is(e,ab)?W.getElementById(e):e;
if(i.tagName){if(S==null){return{container:i,width:i.style.pixelWidth||i.offsetWidth,height:i.style.pixelHeight||i.offsetHeight}
}else{return{container:i,width:S,height:E}}}}else{return{container:1,x:e,y:S,width:E,height:R}
}},a1=function(e,E){var i=this;for(var R in E){if(E[ac](R)&&!(R in e)){switch(typeof E[R]){case"function":(function(S){e[R]=e===i?S:function(){return S[bl](i,arguments)
}})(E[R]);break;case"object":e[R]=e[R]||{};a1.call(this,e[R],E[R]);break;default:e[R]=E[R];
break}}}},ax=function(e,i){e==i.top&&(i.top=e.prev);e==i.bottom&&(i.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},ah=function(e,i){if(i.top===e){return
}ax(e,i);e.next=null;e.prev=i.top;i.top.next=e;i.top=e},m=function(e,i){if(i.bottom===e){return
}ax(e,i);e.next=i.bottom;e.prev=null;i.bottom.prev=e;i.bottom=e},H=function(i,e,E){ax(i,E);
e==E.top&&(E.top=i);e.next&&(e.next.prev=i);i.next=e.next;i.prev=e;e.next=i},aE=function(i,e,E){ax(i,E);
e==E.bottom&&(E.bottom=i);e.prev&&(e.prev.next=i);i.prev=e.prev;e.prev=i;i.next=e
},x=function(e){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+e+"\u201d of removed object")
}},aG=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(aB.svg){bi[bn].svgns="http://www.w3.org/2000/svg";
bi[bn].xlink="http://www.w3.org/1999/xlink";Z=function(e){return +e+(~~e===e)*0.5
};var a3=function(E,e){if(e){for(var i in e){if(e[ac](i)){E[B](i,e[i]+aH)}}}else{E=W.createElementNS(bi[bn].svgns,E);
E.style.webkitTapHighlightColor="rgba(0,0,0,0)";return E}};aB[aQ]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var v=function(e,R){var i=a3("path");R.canvas&&R.canvas[a6](i);var E=new aM(i,R);
E.type="path";aj(E,{fill:"none",stroke:"#000",path:e});return E};var b=function(S,bz,e){var bw="linear",bt=0.5,br=0.5,bB=S.style;
bz=(bz+aH)[bc](aG,function(bD,i,bE){bw="radial";if(i&&bE){bt=af(i);br=af(bE);var bC=((br>0.5)*2-1);
a7(bt-0.5,2)+a7(br-0.5,2)>0.25&&(br=ak.sqrt(0.25-a7(bt-0.5,2))*bC+0.5)&&br!=0.5&&(br=br.toFixed(5)-0.00001*bC)
}return aH});bz=bz[G](/\s*\-\s*/);if(bw=="linear"){var bs=bz.shift();bs=-af(bs);if(isNaN(bs)){return null
}var bq=[0,0,ak.cos(bs*ak.PI/180),ak.sin(bs*ak.PI/180)],by=1/(h(ak.abs(bq[2]),ak.abs(bq[3]))||1);
bq[2]*=by;bq[3]*=by;if(bq[2]<0){bq[0]=-bq[2];bq[2]=0}if(bq[3]<0){bq[1]=-bq[3];bq[3]=0
}}var bv=u(bz);if(!bv){return null}var E=S.getAttribute(aT);E=E.match(/^url\(#(.*)\)$/);
E&&e.defs.removeChild(W.getElementById(E[1]));var R=a3(bw+"Gradient");R.id="r"+(aB._id++)[aQ](36);
a3(R,bw=="radial"?{fx:bt,fy:br}:{x1:bq[0],y1:bq[1],x2:bq[2],y2:bq[3]});e.defs[a6](R);
for(var bu=0,bA=bv[o];bu<bA;bu++){var bx=a3("stop");a3(bx,{offset:bv[bu].offset?bv[bu].offset:!bu?"0%":"100%","stop-color":bv[bu].color||"#fff"});
R[a6](bx)}a3(S,{fill:"url(#"+R.id+")",opacity:1,"fill-opacity":1});bB.fill=aH;bB.opacity=1;
bB.fillOpacity=1;return 1};var X=function(i){var e=i.getBBox();a3(i.pattern,{patternTransform:aB.format("translate({0},{1})",e.x,e.y)})
};var aj=function(by,bH){var bB={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bD=by.node,bz=by.attrs,bv=by.rotate(),br=function(bO,bN){bN=bB[bp.call(bN)];
if(bN){var bL=bO.attrs["stroke-width"]||"1",bJ={round:bL,square:bL,butt:0}[bO.attrs["stroke-linecap"]||bH["stroke-linecap"]]||0,bM=[];
var bK=bN[o];while(bK--){bM[bK]=bN[bK]*bL+((bK%2)?1:-1)*bJ}a3(bD,{"stroke-dasharray":bM[aO](",")})
}};bH[ac]("rotation")&&(bv=bH.rotation);var bu=(bv+aH)[G](a);if(!(bu.length-1)){bu=null
}else{bu[1]=+bu[1];bu[2]=+bu[2]}af(bv)&&by.rotate(0,true);for(var bC in bH){if(bH[ac](bC)){if(!l[ac](bC)){continue
}var bA=bH[bC];bz[bC]=bA;switch(bC){case"blur":by.blur(bA);break;case"rotation":by.rotate(bA,true);
break;case"href":case"title":case"target":var bF=bD.parentNode;if(bp.call(bF.tagName)!="a"){var S=a3("a");
bF.insertBefore(S,bD);S[a6](bD);bF=S}bF.setAttributeNS(by.paper.xlink,bC,bA);break;
case"cursor":bD.style.cursor=bA;break;case"clip-rect":var i=(bA+aH)[G](a);if(i[o]==4){by.clip&&by.clip.parentNode.parentNode.removeChild(by.clip.parentNode);
var E=a3("clipPath"),bE=a3("rect");E.id="r"+(aB._id++)[aQ](36);a3(bE,{x:i[0],y:i[1],width:i[2],height:i[3]});
E[a6](bE);by.paper.defs[a6](E);a3(bD,{"clip-path":"url(#"+E.id+")"});by.clip=bE}if(!bA){var bG=W.getElementById(bD.getAttribute("clip-path")[bc](/(^url\(#|\)$)/g,aH));
bG&&bG.parentNode.removeChild(bG);a3(bD,{"clip-path":aH});delete by.clip}break;case"path":if(by.type=="path"){a3(bD,{d:bA?bz.path=w(bA):"M0,0"})
}break;case"width":bD[B](bC,bA);if(bz.fx){bC="x";bA=bz.x}else{break}case"x":if(bz.fx){bA=-bz.x-(bz.width||0)
}case"rx":if(bC=="rx"&&by.type=="rect"){break}case"cx":bu&&(bC=="x"||bC=="cx")&&(bu[1]+=bA-bz[bC]);
bD[B](bC,Z(bA));by.pattern&&X(by);break;case"height":bD[B](bC,bA);if(bz.fy){bC="y";
bA=bz.y}else{break}case"y":if(bz.fy){bA=-bz.y-(bz.height||0)}case"ry":if(bC=="ry"&&by.type=="rect"){break
}case"cy":bu&&(bC=="y"||bC=="cy")&&(bu[2]+=bA-bz[bC]);bD[B](bC,Z(bA));by.pattern&&X(by);
break;case"r":if(by.type=="rect"){a3(bD,{rx:bA,ry:bA})}else{bD[B](bC,bA)}break;case"src":if(by.type=="image"){bD.setAttributeNS(by.paper.xlink,"href",bA)
}break;case"stroke-width":bD.style.strokeWidth=bA;bD[B](bC,bA);if(bz["stroke-dasharray"]){br(by,bz["stroke-dasharray"])
}break;case"stroke-dasharray":br(by,bA);break;case"translation":var bs=(bA+aH)[G](a);
bs[0]=+bs[0]||0;bs[1]=+bs[1]||0;if(bu){bu[1]+=bs[0];bu[2]+=bs[1]}y.call(by,bs[0],bs[1]);
break;case"scale":bs=(bA+aH)[G](a);by.scale(+bs[0]||1,+bs[1]||+bs[0]||1,isNaN(af(bs[2]))?null:+bs[2],isNaN(af(bs[3]))?null:+bs[3]);
break;case aT:var bq=(bA+aH).match(c);if(bq){E=a3("pattern");var bx=a3("image");E.id="r"+(aB._id++)[aQ](36);
a3(E,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});a3(bx,{x:0,y:0});bx.setAttributeNS(by.paper.xlink,"href",bq[1]);
E[a6](bx);var bI=W.createElement("img");bI.style.cssText="position:absolute;left:-9999em;top-9999em";
bI.onload=function(){a3(E,{width:this.offsetWidth,height:this.offsetHeight});a3(bx,{width:this.offsetWidth,height:this.offsetHeight});
W.body.removeChild(this);by.paper.safari()};W.body[a6](bI);bI.src=bq[1];by.paper.defs[a6](E);
bD.style.fill="url(#"+E.id+")";a3(bD,{fill:"url(#"+E.id+")"});by.pattern=E;by.pattern&&X(by);
break}var R=aB.getRGB(bA);if(!R.error){delete bH.gradient;delete bz.gradient;!aB.is(bz.opacity,"undefined")&&aB.is(bH.opacity,"undefined")&&a3(bD,{opacity:bz.opacity});
!aB.is(bz["fill-opacity"],"undefined")&&aB.is(bH["fill-opacity"],"undefined")&&a3(bD,{"fill-opacity":bz["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[ac](by.type)||(bA+aH).charAt()!="r")&&b(bD,bA,by.paper)){bz.gradient=bA;
bz.fill="none";break}}R[ac]("o")&&a3(bD,{"fill-opacity":R.o/100});case"stroke":R=aB.getRGB(bA);
bD[B](bC,R.hex);bC=="stroke"&&R[ac]("o")&&a3(bD,{"stroke-opacity":R.o/100});break;
case"gradient":(({circle:1,ellipse:1})[ac](by.type)||(bA+aH).charAt()!="r")&&b(bD,bA,by.paper);
break;case"opacity":case"fill-opacity":if(bz.gradient){var e=W.getElementById(bD.getAttribute(aT)[bc](/^url\(#|\)$/g,aH));
if(e){var bt=e.getElementsByTagName("stop");bt[bt[o]-1][B]("stop-opacity",bA)}break
}default:bC=="font-size"&&(bA=O(bA,10)+"px");var bw=bC[bc](/(\-.)/g,function(bJ){return a9.call(bJ.substring(1))
});bD.style[bw]=bA;bD[B](bC,bA);break}}}M(by,bH);if(bu){by.rotate(bu.join(aA))}else{af(bv)&&by.rotate(bv,true)
}};var k=1.2,M=function(e,S){if(e.type!="text"||!(S[ac]("text")||S[ac]("font")||S[ac]("font-size")||S[ac]("x")||S[ac]("y"))){return
}var bu=e.attrs,E=e.node,bw=E.firstChild?O(W.defaultView.getComputedStyle(E.firstChild,aH).getPropertyValue("font-size"),10):10;
if(S[ac]("text")){bu.text=S.text;while(E.firstChild){E.removeChild(E.firstChild)}var R=(S.text+aH)[G]("\n");
for(var bq=0,bv=R[o];bq<bv;bq++){if(R[bq]){var bs=a3("tspan");bq&&a3(bs,{dy:bw*k,x:bu.x});
bs[a6](W.createTextNode(R[bq]));E[a6](bs)}}}else{R=E.getElementsByTagName("tspan");
for(bq=0,bv=R[o];bq<bv;bq++){bq&&a3(R[bq],{dy:bw*k,x:bu.x})}}a3(E,{y:bu.y});var br=e.getBBox(),bt=bu.y-(br.y+br.height/2);
bt&&isFinite(bt)&&a3(E,{y:bu.y+bt})},aM=function(i,e){var R=0,E=0;this[0]=i;this.id=aB._oid++;
this.node=i;i.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aM[bn].rotate=function(i,e,R){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aO](aA)
}return this._.rt.deg}var E=this.getBBox();i=(i+aH)[G](a);if(i[o]-1){e=af(i[1]);R=af(i[2])
}i=af(i[0]);if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}(R==null)&&(e=null);
this._.rt.cx=e;this._.rt.cy=R;e=e==null?E.x+E.width/2:e;R=R==null?E.y+E.height/2:R;
if(this._.rt.deg){this.transformations[0]=aB.format("rotate({0} {1} {2})",this._.rt.deg,e,R);
this.clip&&a3(this.clip,{transform:aB.format("rotate({0} {1} {2})",-this._.rt.deg,e,R)})
}else{this.transformations[0]=aH;this.clip&&a3(this.clip,{transform:aH})}a3(this.node,{transform:this.transformations[aO](aA)});
return this};aM[bn].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aM[bn].show=function(){!this.removed&&(this.node.style.display="");return this
};aM[bn].remove=function(){if(this.removed){return}ax(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var e in this){delete this[e]}this.removed=true};aM[bn].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return ae(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var R=true}var bs={};try{bs=this.node.getBBox()}catch(bq){}finally{bs=bs||{}}if(this.type=="text"){bs={x:bs.x,y:Infinity,width:0,height:0};
for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var br=this.node.getExtentOfChar(E);
(br.y<bs.y)&&(bs.y=br.y);(br.y+br.height-bs.y>bs.height)&&(bs.height=br.y+br.height-bs.y);
(br.x+br.width-bs.x>bs.width)&&(bs.width=br.x+br.width-bs.x)}}R&&this.hide();return bs
};aM[bn].attr=function(R,bs){if(this.removed){return this}if(R==null){var bq={};for(var S in this.attrs){if(this.attrs[ac](S)){bq[S]=this.attrs[S]
}}this._.rt.deg&&(bq.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(bq.scale=this.scale());
bq.gradient&&bq.fill=="none"&&(bq.fill=bq.gradient)&&delete bq.gradient;return bq
}if(bs==null&&aB.is(R,ab)){if(R=="translation"){return y.call(this)}if(R=="rotation"){return this.rotate()
}if(R=="scale"){return this.scale()}if(R==aT&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[R]}if(bs==null&&aB.is(R,aW)){var e={};for(var E=0,br=R.length;
E<br;E++){e[R[E]]=this.attr(R[E])}return e}if(bs!=null){var bt={};bt[R]=bs;aj(this,bt)
}else{if(R!=null&&aB.is(R,"object")){aj(this,R)}}return this};aM[bn].toFront=function(){if(this.removed){return this
}this.node.parentNode[a6](this.node);var e=this.paper;e.top!=this&&ah(this,e);return this
};aM[bn].toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
m(this,this.paper);var e=this.paper}return this};aM[bn].insertAfter=function(e){if(this.removed){return this
}var i=e.node;if(i.nextSibling){i.parentNode.insertBefore(this.node,i.nextSibling)
}else{i.parentNode[a6](this.node)}H(this,e,this.paper);return this};aM[bn].insertBefore=function(e){if(this.removed){return this
}var i=e.node;i.parentNode.insertBefore(this.node,i);aE(this,e,this.paper);return this
};aM[bn].blur=function(i){var e=this;if(+i!==0){var E=a3("filter"),R=a3("feGaussianBlur");
e.attrs.blur=i;E.id="r"+(aB._id++)[aQ](36);a3(R,{stdDeviation:+i||1.5});E.appendChild(R);
e.paper.defs.appendChild(E);e._blur=E;a3(e.node,{filter:"url(#"+E.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var aa=function(i,e,bq,S){e=Z(e);
bq=Z(bq);var R=a3("circle");i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={cx:e,cy:bq,r:S,fill:"none",stroke:"#000"};
E.type="circle";a3(R,E.attrs);return E};var aZ=function(E,e,bs,i,bq,br){e=Z(e);bs=Z(bs);
var S=a3("rect");E.canvas&&E.canvas[a6](S);var R=new aM(S,E);R.attrs={x:e,y:bs,width:i,height:bq,r:br||0,rx:br||0,ry:br||0,fill:"none",stroke:"#000"};
R.type="rect";a3(S,R.attrs);return R};var at=function(i,e,br,bq,S){e=Z(e);br=Z(br);
var R=a3("ellipse");i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={cx:e,cy:br,rx:bq,ry:S,fill:"none",stroke:"#000"};
E.type="ellipse";a3(R,E.attrs);return E};var t=function(E,br,e,bs,i,bq){var S=a3("image");
a3(S,{x:e,y:bs,width:i,height:bq,preserveAspectRatio:"none"});S.setAttributeNS(E.xlink,"href",br);
E.canvas&&E.canvas[a6](S);var R=new aM(S,E);R.attrs={x:e,y:bs,width:i,height:bq,src:br};
R.type="image";return R};var ag=function(i,e,bq,S){var R=a3("text");a3(R,{x:e,y:bq,"text-anchor":"middle"});
i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={x:e,y:bq,"text-anchor":"middle",text:S,font:l.font,stroke:"none",fill:"#000"};
E.type="text";aj(E,E.attrs);return E};var bk=function(i,e){this.width=i||this.width;
this.height=e||this.height;this.canvas[B]("width",this.width);this.canvas[B]("height",this.height);
return this};var C=function(){var R=aC[bl](0,arguments),E=R&&R.container,i=R.x,br=R.y,S=R.width,e=R.height;
if(!E){throw new Error("SVG container not found.")}var bq=a3("svg");i=i||0;br=br||0;
S=S||512;e=e||342;a3(bq,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:S,height:e});
if(E==1){bq.style.cssText="position:absolute;left:"+i+"px;top:"+br+"px";W.body[a6](bq)
}else{if(E.firstChild){E.insertBefore(bq,E.firstChild)}else{E[a6](bq)}}E=new bi;E.width=S;
E.height=e;E.canvas=bq;a1.call(E,E,aB.fn);E.clear();return E};bi[bn].clear=function(){var e=this.canvas;
while(e.firstChild){e.removeChild(e.firstChild)}this.bottom=this.top=null;(this.desc=a3("desc"))[a6](W.createTextNode("Created with Rapha\xebl"));
e[a6](this.desc);e[a6](this.defs=a3("defs"))};bi[bn].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=x(e)}}}if(aB.vml){var K={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},aF=/([clmz]),?([^clmz]*)/gi,bo=/-?[^,\s-]+/g,aP=1000+aA+1000,s=10,p={path:1,rect:1},a2=function(bw){var bt=/[ahqstv]/ig,R=w;
(bw+aH).match(bt)&&(R=P);bt=/[clmz]/g;if(R==w&&!(bw+aH).match(bt)){var bs=(bw+aH)[bc](aF,function(bz,bB,bx){var bA=[],i=bp.call(bB)=="m",by=K[bB];
bx[bc](bo,function(bC){if(i&&bA[o]==2){by+=bA+K[bB=="m"?"l":"L"];bA=[]}bA[f](Z(bC*s))
});return by+bA});return bs}var bu=R(bw),E,e;bs=[];for(var bq=0,bv=bu[o];bq<bv;bq++){E=bu[bq];
e=bp.call(bu[bq][0]);e=="z"&&(e="x");for(var S=1,br=E[o];S<br;S++){e+=Z(E[S]*s)+(S!=br-1?",":aH)
}bs[f](e)}return bs[aO](aA)};aB[aQ]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};v=function(E,i){var bq=ar("group");bq.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
bq.coordsize=i.coordsize;bq.coordorigin=i.coordorigin;var S=ar("shape"),R=S.style;
R.width=i.width+"px";R.height=i.height+"px";S.coordsize=aP;S.coordorigin=i.coordorigin;
bq[a6](S);var br=new aM(S,bq,i),e={fill:"none",stroke:"#000"};E&&(e.path=E);br.isAbsolute=true;
br.type="path";br.path=[];br.Path=aH;aj(br,e);i.canvas[a6](bq);return br};aj=function(bu,bB){bu.attrs=bu.attrs||{};
var by=bu.node,bC=bu.attrs,br=by.style,R,bA=(bB.x!=bC.x||bB.y!=bC.y||bB.width!=bC.width||bB.height!=bC.height||bB.r!=bC.r)&&bu.type=="rect",bG=bu;
for(var bs in bB){if(bB[ac](bs)){bC[bs]=bB[bs]}}if(bA){bC.path=am(bC.x,bC.y,bC.width,bC.height,bC.r);
bu.X=bC.x;bu.Y=bC.y;bu.W=bC.width;bu.H=bC.height}bB.href&&(by.href=bB.href);bB.title&&(by.title=bB.title);
bB.target&&(by.target=bB.target);bB.cursor&&(br.cursor=bB.cursor);"blur" in bB&&bu.blur(bB.blur);
if(bB.path&&bu.type=="path"||bA){by.path=a2(bC.path)}if(bB.rotation!=null){bu.rotate(bB.rotation,true)
}if(bB.translation){R=(bB.translation+aH)[G](a);y.call(bu,R[0],R[1]);if(bu._.rt.cx!=null){bu._.rt.cx+=+R[0];
bu._.rt.cy+=+R[1];bu.setBox(bu.attrs,R[0],R[1])}}if(bB.scale){R=(bB.scale+aH)[G](a);
bu.scale(+R[0]||1,+R[1]||+R[0]||1,+R[2]||null,+R[3]||null)}if("clip-rect" in bB){var e=(bB["clip-rect"]+aH)[G](a);
if(e[o]==4){e[2]=+e[2]+(+e[0]);e[3]=+e[3]+(+e[1]);var bt=by.clipRect||W.createElement("div"),bF=bt.style,bq=by.parentNode;
bF.clip=aB.format("rect({1}px {2}px {3}px {0}px)",e);if(!by.clipRect){bF.position="absolute";
bF.top=0;bF.left=0;bF.width=bu.paper.width+"px";bF.height=bu.paper.height+"px";bq.parentNode.insertBefore(bt,bq);
bt[a6](bq);by.clipRect=bt}}if(!bB["clip-rect"]){by.clipRect&&(by.clipRect.style.clip=aH)
}}if(bu.type=="image"&&bB.src){by.src=bB.src}if(bu.type=="image"&&bB.opacity){by.filterOpacity=aU+".Alpha(opacity="+(bB.opacity*100)+")";
br.filter=(by.filterMatrix||aH)+(by.filterOpacity||aH)}bB.font&&(br.font=bB.font);
bB["font-family"]&&(br.fontFamily='"'+bB["font-family"][G](",")[0][bc](/^['"]+|['"]+$/g,aH)+'"');
bB["font-size"]&&(br.fontSize=bB["font-size"]);bB["font-weight"]&&(br.fontWeight=bB["font-weight"]);
bB["font-style"]&&(br.fontStyle=bB["font-style"]);if(bB.opacity!=null||bB["stroke-width"]!=null||bB.fill!=null||bB.stroke!=null||bB["stroke-width"]!=null||bB["stroke-opacity"]!=null||bB["fill-opacity"]!=null||bB["stroke-dasharray"]!=null||bB["stroke-miterlimit"]!=null||bB["stroke-linejoin"]!=null||bB["stroke-linecap"]!=null){by=bu.shape||by;
var bz=(by.getElementsByTagName(aT)&&by.getElementsByTagName(aT)[0]),bD=false;!bz&&(bD=bz=ar(aT));
if("fill-opacity" in bB||"opacity" in bB){var i=((+bC["fill-opacity"]+1||2)-1)*((+bC.opacity+1||2)-1)*((+aB.getRGB(bB.fill).o+1||2)-1);
i<0&&(i=0);i>1&&(i=1);bz.opacity=i}bB.fill&&(bz.on=true);if(bz.on==null||bB.fill=="none"){bz.on=false
}if(bz.on&&bB.fill){var E=bB.fill.match(c);if(E){bz.src=E[1];bz.type="tile"}else{bz.color=aB.getRGB(bB.fill).hex;
bz.src=aH;bz.type="solid";if(aB.getRGB(bB.fill).error&&(bG.type in {circle:1,ellipse:1}||(bB.fill+aH).charAt()!="r")&&b(bG,bB.fill)){bC.fill="none";
bC.gradient=bB.fill}}}bD&&by[a6](bz);var S=(by.getElementsByTagName("stroke")&&by.getElementsByTagName("stroke")[0]),bE=false;
!S&&(bE=S=ar("stroke"));if((bB.stroke&&bB.stroke!="none")||bB["stroke-width"]||bB["stroke-opacity"]!=null||bB["stroke-dasharray"]||bB["stroke-miterlimit"]||bB["stroke-linejoin"]||bB["stroke-linecap"]){S.on=true
}(bB.stroke=="none"||S.on==null||bB.stroke==0||bB["stroke-width"]==0)&&(S.on=false);
var bx=aB.getRGB(bB.stroke);S.on&&bB.stroke&&(S.color=bx.hex);i=((+bC["stroke-opacity"]+1||2)-1)*((+bC.opacity+1||2)-1)*((+bx.o+1||2)-1);
var bv=(af(bB["stroke-width"])||1)*0.75;i<0&&(i=0);i>1&&(i=1);bB["stroke-width"]==null&&(bv=bC["stroke-width"]);
bB["stroke-width"]&&(S.weight=bv);bv&&bv<1&&(i*=bv)&&(S.weight=1);S.opacity=i;bB["stroke-linejoin"]&&(S.joinstyle=bB["stroke-linejoin"]||"miter");
S.miterlimit=bB["stroke-miterlimit"]||8;bB["stroke-linecap"]&&(S.endcap=bB["stroke-linecap"]=="butt"?"flat":bB["stroke-linecap"]=="square"?"square":"round");
if(bB["stroke-dasharray"]){var bw={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
S.dashstyle=bw[ac](bB["stroke-dasharray"])?bw[bB["stroke-dasharray"]]:aH}bE&&by[a6](S)
}if(bG.type=="text"){br=bG.paper.span.style;bC.font&&(br.font=bC.font);bC["font-family"]&&(br.fontFamily=bC["font-family"]);
bC["font-size"]&&(br.fontSize=bC["font-size"]);bC["font-weight"]&&(br.fontWeight=bC["font-weight"]);
bC["font-style"]&&(br.fontStyle=bC["font-style"]);bG.node.string&&(bG.paper.span.innerHTML=(bG.node.string+aH)[bc](/</g,"&#60;")[bc](/&/g,"&#38;")[bc](/\n/g,"<br>"));
bG.W=bC.w=bG.paper.span.offsetWidth;bG.H=bC.h=bG.paper.span.offsetHeight;bG.X=bC.x;
bG.Y=bC.y+Z(bG.H/2);switch(bC["text-anchor"]){case"start":bG.node.style["v-text-align"]="left";
bG.bbx=Z(bG.W/2);break;case"end":bG.node.style["v-text-align"]="right";bG.bbx=-Z(bG.W/2);
break;default:bG.node.style["v-text-align"]="center";break}}};b=function(e,bs){e.attrs=e.attrs||{};
var bt=e.attrs,bv,bq="linear",br=".5 .5";e.attrs.gradient=bs;bs=(bs+aH)[bc](aG,function(bx,by,i){bq="radial";
if(by&&i){by=af(by);i=af(i);a7(by-0.5,2)+a7(i-0.5,2)>0.25&&(i=ak.sqrt(0.25-a7(by-0.5,2))*((i>0.5)*2-1)+0.5);
br=by+aA+i}return aH});bs=bs[G](/\s*\-\s*/);if(bq=="linear"){var E=bs.shift();E=-af(E);
if(isNaN(E)){return null}}var S=u(bs);if(!S){return null}e=e.shape||e.node;bv=e.getElementsByTagName(aT)[0]||ar(aT);
!bv.parentNode&&e.appendChild(bv);if(S[o]){bv.on=true;bv.method="none";bv.color=S[0].color;
bv.color2=S[S[o]-1].color;var bw=[];for(var R=0,bu=S[o];R<bu;R++){S[R].offset&&bw[f](S[R].offset+aA+S[R].color)
}bv.colors&&(bv.colors.value=bw[o]?bw[aO]():"0% "+bv.color);if(bq=="radial"){bv.type="gradientradial";
bv.focus="100%";bv.focussize=br;bv.focusposition=br}else{bv.type="gradient";bv.angle=(270-E)%360
}}return 1};aM=function(S,br,e){var bq=0,E=0,i=0,R=1;this[0]=S;this.id=aB._oid++;
this.node=S;S.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=br;this.paper=e;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aM[bn].rotate=function(i,e,E){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aO](aA)
}return this._.rt.deg}i=(i+aH)[G](a);if(i[o]-1){e=af(i[1]);E=af(i[2])}i=af(i[0]);
if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}E==null&&(e=null);this._.rt.cx=e;
this._.rt.cy=E;this.setBox(this.attrs,e,E);this.Group.style.rotation=this._.rt.deg;
return this};aM[bn].setBox=function(S,bq,R){if(this.removed){return this}var e=this.Group.style,br=(this.shape&&this.shape.style)||this.node.style;
S=S||{};for(var bs in S){if(S[ac](bs)){this.attrs[bs]=S[bs]}}bq=bq||this._.rt.cx;
R=R||this._.rt.cy;var bv=this.attrs,by,bx,bz,bu;switch(this.type){case"circle":by=bv.cx-bv.r;
bx=bv.cy-bv.r;bz=bu=bv.r*2;break;case"ellipse":by=bv.cx-bv.rx;bx=bv.cy-bv.ry;bz=bv.rx*2;
bu=bv.ry*2;break;case"image":by=+bv.x;bx=+bv.y;bz=bv.width||0;bu=bv.height||0;break;
case"text":this.textpath.v=["m",Z(bv.x),", ",Z(bv.y-2),"l",Z(bv.x)+1,", ",Z(bv.y-2)][aO](aH);
by=bv.x-Z(this.W/2);bx=bv.y-this.H/2;bz=this.W;bu=this.H;break;case"rect":case"path":if(!this.attrs.path){by=0;
bx=0;bz=this.paper.width;bu=this.paper.height}else{var bt=ae(this.attrs.path);by=bt.x;
bx=bt.y;bz=bt.width;bu=bt.height}break;default:by=0;bx=0;bz=this.paper.width;bu=this.paper.height;
break}bq=(bq==null)?by+bz/2:bq;R=(R==null)?bx+bu/2:R;var E=bq-this.paper.width/2,bw=R-this.paper.height/2,bA;
e.left!=(bA=E+"px")&&(e.left=bA);e.top!=(bA=bw+"px")&&(e.top=bA);this.X=p[ac](this.type)?-E:by;
this.Y=p[ac](this.type)?-bw:bx;this.W=bz;this.H=bu;if(p[ac](this.type)){br.left!=(bA=-E*s+"px")&&(br.left=bA);
br.top!=(bA=-bw*s+"px")&&(br.top=bA)}else{if(this.type=="text"){br.left!=(bA=-E+"px")&&(br.left=bA);
br.top!=(bA=-bw+"px")&&(br.top=bA)}else{e.width!=(bA=this.paper.width+"px")&&(e.width=bA);
e.height!=(bA=this.paper.height+"px")&&(e.height=bA);br.left!=(bA=by-E+"px")&&(br.left=bA);
br.top!=(bA=bx-bw+"px")&&(br.top=bA);br.width!=(bA=bz+"px")&&(br.width=bA);br.height!=(bA=bu+"px")&&(br.height=bA)
}}};aM[bn].hide=function(){!this.removed&&(this.Group.style.display="none");return this
};aM[bn].show=function(){!this.removed&&(this.Group.style.display="block");return this
};aM[bn].getBBox=function(){if(this.removed){return this}if(p[ac](this.type)){return ae(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};aM[bn].remove=function(){if(this.removed){return
}ax(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e]
}this.removed=true};aM[bn].attr=function(E,br){if(this.removed){return this}if(E==null){var S={};
for(var R in this.attrs){if(this.attrs[ac](R)){S[R]=this.attrs[R]}}this._.rt.deg&&(S.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(S.scale=this.scale());S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;
return S}if(br==null&&aB.is(E,ab)){if(E=="translation"){return y.call(this)}if(E=="rotation"){return this.rotate()
}if(E=="scale"){return this.scale()}if(E==aT&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[E]}if(this.attrs&&br==null&&aB.is(E,aW)){var bq,e={};for(R=0,bq=E[o];
R<bq;R++){e[E[R]]=this.attr(E[R])}return e}var bs;if(br!=null){bs={};bs[E]=br}br==null&&aB.is(E,"object")&&(bs=E);
if(bs){if(bs.text&&this.type=="text"){this.node.string=bs.text}aj(this,bs);if(bs.gradient&&(({circle:1,ellipse:1})[ac](this.type)||(bs.gradient+aH).charAt()!="r")){b(this,bs.gradient)
}(!p[ac](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};aM[bn].toFront=function(){!this.removed&&this.Group.parentNode[a6](this.Group);
this.paper.top!=this&&ah(this,this.paper);return this};aM[bn].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
m(this,this.paper)}return this};aM[bn].insertAfter=function(e){if(this.removed){return this
}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling)
}else{e.Group.parentNode[a6](this.Group)}H(this,e,this.paper);return this};aM[bn].insertBefore=function(e){if(this.removed){return this
}e.Group.parentNode.insertBefore(this.Group,e.Group);aE(this,e,this.paper);return this
};var bh=/ progid:\S+Blur\([^\)]+\)/g;aM[bn].blur=function(e){var i=this.node.style,E=i.filter;
E=E.replace(bh,"");if(+e!==0){this.attrs.blur=e;i.filter=E+aU+".Blur(pixelradius="+(+e||1.5)+")";
i.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+e||1.5))}else{i.filter=E;
i.margin=0;delete this.attrs.blur}};aa=function(i,e,bs,bq){var S=ar("group"),br=ar("oval"),E=br.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;S[a6](br);var R=new aM(br,S,i);R.type="circle";
aj(R,{stroke:"#000",fill:"none"});R.attrs.cx=e;R.attrs.cy=bs;R.attrs.r=bq;R.setBox({x:e-bq,y:bs-bq,width:bq*2,height:bq*2});
i.canvas[a6](S);return R};function am(e,S,i,E,R){if(R){return aB.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",e+R,S,i-R*2,R,-R,E-R*2,R*2-i,R*2-E)
}else{return aB.format("M{0},{1}l{2},0,0,{3},{4},0z",e,S,i,E,-i)}}aZ=function(i,br,S,bs,E,e){var bt=am(br,S,bs,E,e),R=i.path(bt),bq=R.attrs;
R.X=bq.x=br;R.Y=bq.y=S;R.W=bq.width=bs;R.H=bq.height=E;bq.r=e;bq.path=bt;R.type="rect";
return R};at=function(e,bt,bs,E,i){var S=ar("group"),R=ar("oval"),br=R.style;S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
S.coordsize=aP;S.coordorigin=e.coordorigin;S[a6](R);var bq=new aM(R,S,e);bq.type="ellipse";
aj(bq,{stroke:"#000"});bq.attrs.cx=bt;bq.attrs.cy=bs;bq.attrs.rx=E;bq.attrs.ry=i;
bq.setBox({x:bt-E,y:bs-i,width:E*2,height:i*2});e.canvas[a6](S);return bq};t=function(i,e,bt,bs,bu,R){var S=ar("group"),E=ar("image"),br=E.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;E.src=e;S[a6](E);var bq=new aM(E,S,i);
bq.type="image";bq.attrs.src=e;bq.attrs.x=bt;bq.attrs.y=bs;bq.attrs.w=bu;bq.attrs.h=R;
bq.setBox({x:bt,y:bs,width:bu,height:R});i.canvas[a6](S);return bq};ag=function(i,bt,bs,bu){var S=ar("group"),R=ar("shape"),br=R.style,bv=ar("path"),e=bv.style,E=ar("textpath");
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;bv.v=aB.format("m{0},{1}l{2},{1}",Z(bt*10),Z(bs*10),Z(bt*10)+1);
bv.textpathok=true;br.width=i.width;br.height=i.height;E.string=bu+aH;E.on=true;R[a6](E);
R[a6](bv);S[a6](R);var bq=new aM(E,S,i);bq.shape=R;bq.textpath=bv;bq.type="text";
bq.attrs.text=bu;bq.attrs.x=bt;bq.attrs.y=bs;bq.attrs.w=1;bq.attrs.h=1;aj(bq,{font:l.font,stroke:"none",fill:"#000"});
bq.setBox();i.canvas[a6](S);return bq};bk=function(E,e){var i=this.canvas.style;E==+E&&(E+="px");
e==+e&&(e+="px");i.width=E;i.height=e;i.clip="rect(0 "+E+" "+e+" 0)";return this};
var ar;W.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!W.namespaces.rvml&&W.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
ar=function(e){return W.createElement("<rvml:"+e+' class="rvml">')}}catch(ap){ar=function(e){return W.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}C=function(){var E=aC[bl](0,arguments),e=E.container,bt=E.height,bu,i=E.width,bs=E.x,br=E.y;
if(!e){throw new Error("VML container not found.")}var S=new bi,bq=S.canvas=W.createElement("div"),R=bq.style;
bs=bs||0;br=br||0;i=i||512;bt=bt||342;i==+i&&(i+="px");bt==+bt&&(bt+="px");S.width=1000;
S.height=1000;S.coordsize=s*1000+aA+s*1000;S.coordorigin="0 0";S.span=W.createElement("span");
S.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
bq[a6](S.span);R.cssText=aB.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",i,bt);
if(e==1){W.body[a6](bq);R.left=bs+"px";R.top=br+"px";R.position="absolute"}else{if(e.firstChild){e.insertBefore(bq,e.firstChild)
}else{e[a6](bq)}}a1.call(S,S,aB.fn);return S};bi[bn].clear=function(){this.canvas.innerHTML=aH;
this.span=W.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[a6](this.span);this.bottom=this.top=null};bi[bn].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=x(e)}return true}}if((/^Apple|^Google/).test(aI.navigator.vendor)&&(!(aI.navigator.userAgent.indexOf("Version/4.0")+1)||aI.navigator.platform.slice(0,2)=="iP")){bi[bn].safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);
aI.setTimeout(function(){e.remove()})}}else{bi[bn].safari=function(){}}var L=function(){this.returnValue=false
},bf=function(){return this.originalEvent.preventDefault()},aS=function(){this.cancelBubble=true
},aw=function(){return this.originalEvent.stopPropagation()},ao=(function(){if(W.addEventListener){return function(bq,R,E,i){var e=Q&&bb[R]?bb[R]:R;
var S=function(bu){if(Q&&bb[ac](R)){for(var bs=0,bt=bu.targetTouches&&bu.targetTouches.length;
bs<bt;bs++){if(bu.targetTouches[bs].target==bq){var br=bu;bu=bu.targetTouches[bs];
bu.originalEvent=br;bu.preventDefault=bf;bu.stopPropagation=aw;break}}}return E.call(i,bu)
};bq.addEventListener(e,S,false);return function(){bq.removeEventListener(e,S,false);
return true}}}else{if(W.attachEvent){return function(bq,R,E,i){var S=function(br){br=br||aI.event;
br.preventDefault=br.preventDefault||L;br.stopPropagation=br.stopPropagation||aS;
return E.call(i,br)};bq.attachEvent("on"+R,S);var e=function(){bq.detachEvent("on"+R,S);
return true};return e}}}})();for(var al=N[o];al--;){(function(e){aB[e]=aM[bn][e]=function(i){if(aB.is(i,"function")){this.events=this.events||[];
this.events.push({name:e,f:i,unbind:ao(this.shape||this.node||W,e,i,this)})}return this
};aB["un"+e]=aM[bn]["un"+e]=function(R){var E=this.events,i=E[o];while(i--){if(E[i].name==e&&E[i].f==R){E[i].unbind();
E.splice(i,1);!E.length&&delete this.events;return this}}return this}})(N[al])}aM[bn].hover=function(i,e){return this.mouseover(i).mouseout(e)
};aM[bn].unhover=function(i,e){return this.unmouseover(i).unmouseout(e)};aM[bn].drag=function(E,bq,S){this._drag={};
var R=this.mousedown(function(br){(br.originalEvent?br.originalEvent:br).preventDefault();
this._drag.x=br.clientX;this._drag.y=br.clientY;this._drag.id=br.identifier;bq&&bq.call(this,br.clientX,br.clientY);
Raphael.mousemove(i).mouseup(e)}),i=function(bt){var br=bt.clientX,bv=bt.clientY;
if(Q){var bs=bt.touches.length,bu;while(bs--){bu=bt.touches[bs];if(bu.identifier==R._drag.id){br=bu.clientX;
bv=bu.clientY;(bt.originalEvent?bt.originalEvent:bt).preventDefault();break}}}else{bt.preventDefault()
}E&&E.call(R,br-R._drag.x,bv-R._drag.y,br,bv)},e=function(){R._drag={};Raphael.unmousemove(i).unmouseup(e);
S&&S.call(R)};return this};bi[bn].circle=function(e,E,i){return aa(this,e||0,E||0,i||0)
};bi[bn].rect=function(e,S,i,E,R){return aZ(this,e||0,S||0,i||0,E||0,R||0)};bi[bn].ellipse=function(e,R,E,i){return at(this,e||0,R||0,E||0,i||0)
};bi[bn].path=function(e){e&&!aB.is(e,ab)&&!aB.is(e[0],aW)&&(e+=aH);return v(aB.format[bl](aB,arguments),this)
};bi[bn].image=function(R,e,S,i,E){return t(this,R||"about:blank",e||0,S||0,i||0,E||0)
};bi[bn].text=function(e,E,i){return ag(this,e||0,E||0,i||aH)};bi[bn].set=function(e){arguments[o]>1&&(e=Array[bn].splice.call(arguments,0,arguments[o]));
return new ad(e)};bi[bn].setSize=bk;bi[bn].top=bi[bn].bottom=null;bi[bn].raphael=aB;
function A(){return this.x+aA+this.y}aM[bn].resetScale=function(){if(this.removed){return this
}this._.sx=1;this._.sy=1;this.attrs.scale="1 1"};aM[bn].scale=function(bx,bw,R,E){if(this.removed){return this
}if(bx==null&&bw==null){return{x:this._.sx,y:this._.sy,toString:A}}bw=bw||bx;!+bw&&(bw=bx);
var bB,bz,bA,by,bN=this.attrs;if(bx!=0){var bv=this.getBBox(),bs=bv.x+bv.width/2,S=bv.y+bv.height/2,bM=bx/this._.sx,bL=bw/this._.sy;
R=(+R||R==0)?R:bs;E=(+E||E==0)?E:S;var bu=~~(bx/ak.abs(bx)),br=~~(bw/ak.abs(bw)),bE=this.node.style,bP=R+(bs-R)*bM,bO=E+(S-E)*bL;
switch(this.type){case"rect":case"image":var bt=bN.width*bu*bM,bD=bN.height*br*bL;
this.attr({height:bD,r:bN.r*a4(bu*bM,br*bL),width:bt,x:bP-bt/2,y:bO-bD/2});break;
case"circle":case"ellipse":this.attr({rx:bN.rx*bu*bM,ry:bN.ry*br*bL,r:bN.r*a4(bu*bM,br*bL),cx:bP,cy:bO});
break;case"text":this.attr({x:bP,y:bO});break;case"path":var bG=an(bN.path),bH=true;
for(var bJ=0,bC=bG[o];bJ<bC;bJ++){var bF=bG[bJ],bq=a9.call(bF[0]);if(bq=="M"&&bH){continue
}else{bH=false}if(bq=="A"){bF[bG[bJ][o]-2]*=bM;bF[bG[bJ][o]-1]*=bL;bF[1]*=bu*bM;bF[2]*=br*bL;
bF[5]=+!(bu+br?!+bF[5]:+bF[5])}else{if(bq=="H"){for(var bI=1,bK=bF[o];bI<bK;bI++){bF[bI]*=bM
}}else{if(bq=="V"){for(bI=1,bK=bF[o];bI<bK;bI++){bF[bI]*=bL}}else{for(bI=1,bK=bF[o];
bI<bK;bI++){bF[bI]*=(bI%2)?bM:bL}}}}}var e=ae(bG);bB=bP-e.x-e.width/2;bz=bO-e.y-e.height/2;
bG[0][1]+=bB;bG[0][2]+=bz;this.attr({path:bG});break}if(this.type in {text:1,image:1}&&(bu!=1||br!=1)){if(this.transformations){this.transformations[2]="scale("[bg](bu,",",br,")");
this.node[B]("transform",this.transformations[aO](aA));bB=(bu==-1)?-bN.x-(bt||0):bN.x;
bz=(br==-1)?-bN.y-(bD||0):bN.y;this.attr({x:bB,y:bz});bN.fx=bu-1;bN.fy=br-1}else{this.node.filterMatrix=aU+".Matrix(M11="[bg](bu,", M12=0, M21=0, M22=",br,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
bE.filter=(this.node.filterMatrix||aH)+(this.node.filterOpacity||aH)}}else{if(this.transformations){this.transformations[2]=aH;
this.node[B]("transform",this.transformations[aO](aA));bN.fx=0;bN.fy=0}else{this.node.filterMatrix=aH;
bE.filter=(this.node.filterMatrix||aH)+(this.node.filterOpacity||aH)}}bN.scale=[bx,bw,R,E][aO](aA);
this._.sx=bx;this._.sy=bw}return this};aM[bn].clone=function(){if(this.removed){return null
}var e=this.attr();delete e.scale;delete e.translation;return this.paper[this.type]().attr(e)
};var g=au(function(R,e,bs,br,by,bx,bw,bv,S){var bu=0,bq;for(var bt=0;bt<1.001;bt+=0.001){var E=aB.findDotsAtSegment(R,e,bs,br,by,bx,bw,bv,bt);
bt&&(bu+=a7(a7(bq.x-E.x,2)+a7(bq.y-E.y,2),0.5));if(bu>=S){return E}bq=E}}),aR=function(e,i){return function(bz,S,bq){bz=P(bz);
var bv,bu,E,br,R="",by={},bw,bt=0;for(var bs=0,bx=bz.length;bs<bx;bs++){E=bz[bs];
if(E[0]=="M"){bv=+E[1];bu=+E[2]}else{br=q(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6]);if(bt+br>S){if(i&&!by.start){bw=g(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],S-bt);
R+=["C",bw.start.x,bw.start.y,bw.m.x,bw.m.y,bw.x,bw.y];if(bq){return R}by.start=R;
R=["M",bw.x,bw.y+"C",bw.n.x,bw.n.y,bw.end.x,bw.end.y,E[5],E[6]][aO]();bt+=br;bv=+E[5];
bu=+E[6];continue}if(!e&&!i){bw=g(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],S-bt);return{x:bw.x,y:bw.y,alpha:bw.alpha}
}}bt+=br;bv=+E[5];bu=+E[6]}R+=E}by.end=R;bw=e?bt:i?by:aB.findDotsAtSegment(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],1);
bw.alpha&&(bw={x:bw.x,y:bw.y,alpha:bw.alpha});return bw}},q=au(function(R,e,br,bq,bx,bw,bv,bu){var S={x:0,y:0},bt=0;
for(var bs=0;bs<1.01;bs+=0.01){var E=Y(R,e,br,bq,bx,bw,bv,bu,bs);bs&&(bt+=a7(a7(S.x-E.x,2)+a7(S.y-E.y,2),0.5));
S=E}return bt});var aD=aR(1),J=aR(),U=aR(0,1);aM[bn].getTotalLength=function(){if(this.type!="path"){return
}if(this.node.getTotalLength){return this.node.getTotalLength()}return aD(this.attrs.path)
};aM[bn].getPointAtLength=function(e){if(this.type!="path"){return}return J(this.attrs.path,e)
};aM[bn].getSubpath=function(E,i){if(this.type!="path"){return}if(ak.abs(this.getTotalLength()-i)<0.000001){return U(this.attrs.path,E).end
}var e=U(this.attrs.path,i,1);return E?U(e,E).end:e};aB.easing_formulas={linear:function(e){return e
},"<":function(e){return a7(e,3)},">":function(e){return a7(e-1,3)+1},"<>":function(e){e=e*2;
if(e<1){return a7(e,3)/2}e-=2;return(a7(e,3)+2)/2},backIn:function(i){var e=1.70158;
return i*i*((e+1)*i-e)},backOut:function(i){i=i-1;var e=1.70158;return i*i*((e+1)*i+e)+1
},elastic:function(E){if(E==0||E==1){return E}var i=0.3,e=i/4;return a7(2,-10*E)*ak.sin((E-e)*(2*ak.PI)/i)+1
},bounce:function(R){var i=7.5625,E=2.75,e;if(R<(1/E)){e=i*R*R}else{if(R<(2/E)){R-=(1.5/E);
e=i*R*R+0.75}else{if(R<(2.5/E)){R-=(2.25/E);e=i*R*R+0.9375}else{R-=(2.625/E);e=i*R*R+0.984375
}}}return e}};var T={length:0},be=function(){var bt=+new Date;for(var bF in T){if(bF!="length"&&T[ac](bF)){var bK=T[bF];
if(bK.stop||bK.el.removed){delete T[bF];T[o]--;continue}var br=bt-bK.start,bC=bK.ms,bB=bK.easing,bG=bK.from,by=bK.diff,R=bK.to,bx=bK.t,bA=bK.prev||0,bs=bK.el,S=bK.callback,bz={},E;
if(br<bC){var bq=aB.easing_formulas[bB]?aB.easing_formulas[bB](br/bC):br/bC;for(var bD in bG){if(bG[ac](bD)){switch(ai[bD]){case"along":E=bq*bC*by[bD];
R.back&&(E=R.len-E);var bE=J(R[bD],E);bs.translate(by.sx-by.x||0,by.sy-by.y||0);by.x=bE.x;
by.y=bE.y;bs.translate(bE.x-by.sx,bE.y-by.sy);R.rot&&bs.rotate(by.r+bE.alpha,bE.x,bE.y);
break;case ay:E=+bG[bD]+bq*bC*by[bD];break;case"colour":E="rgb("+[I(Z(bG[bD].r+bq*bC*by[bD].r)),I(Z(bG[bD].g+bq*bC*by[bD].g)),I(Z(bG[bD].b+bq*bC*by[bD].b))][aO](",")+")";
break;case"path":E=[];for(var bI=0,bw=bG[bD][o];bI<bw;bI++){E[bI]=[bG[bD][bI][0]];
for(var bH=1,bJ=bG[bD][bI][o];bH<bJ;bH++){E[bI][bH]=+bG[bD][bI][bH]+bq*bC*by[bD][bI][bH]
}E[bI]=E[bI][aO](aA)}E=E[aO](aA);break;case"csv":switch(bD){case"translation":var bv=by[bD][0]*(br-bA),bu=by[bD][1]*(br-bA);
bx.x+=bv;bx.y+=bu;E=bv+aA+bu;break;case"rotation":E=+bG[bD][0]+bq*bC*by[bD][0];bG[bD][1]&&(E+=","+bG[bD][1]+","+bG[bD][2]);
break;case"scale":E=[+bG[bD][0]+bq*bC*by[bD][0],+bG[bD][1]+bq*bC*by[bD][1],(2 in R[bD]?R[bD][2]:aH),(3 in R[bD]?R[bD][3]:aH)][aO](aA);
break;case"clip-rect":E=[];bI=4;while(bI--){E[bI]=+bG[bD][bI]+bq*bC*by[bD][bI]}break
}break}bz[bD]=E}}bs.attr(bz);bs._run&&bs._run.call(bs)}else{if(R.along){bE=J(R.along,R.len*!R.back);
bs.translate(by.sx-(by.x||0)+bE.x-by.sx,by.sy-(by.y||0)+bE.y-by.sy);R.rot&&bs.rotate(by.r+bE.alpha,bE.x,bE.y)
}(bx.x||bx.y)&&bs.translate(-bx.x,-bx.y);R.scale&&(R.scale+=aH);bs.attr(R);delete T[bF];
T[o]--;bs.in_animation=null;aB.is(S,"function")&&S.call(bs)}bK.prev=br}}aB.svg&&bs&&bs.paper&&bs.paper.safari();
T[o]&&aI.setTimeout(be)},I=function(e){return h(a4(e,255),0)},y=function(e,E){if(e==null){return{x:this._.tx,y:this._.ty,toString:A}
}this._.tx+=+e;this._.ty+=+E;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+E+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+E+this.attrs.y});
break;case"path":var i=an(this.attrs.path);i[0][1]+=+e;i[0][2]+=+E;this.attr({path:i});
break}return this};aM[bn].animateWith=function(i,E,e,S,R){T[i.id]&&(E.start=T[i.id].start);
return this.animate(E,e,S,R)};aM[bn].animateAlong=aN();aM[bn].animateAlongBack=aN(1);
function aN(e){return function(R,E,i,bq){var S={back:e};aB.is(i,"function")?(bq=i):(S.rot=i);
R&&R.constructor==aM&&(R=R.attrs.path);R&&(S.along=R);return this.animate(S,E,bq)
}}aM[bn].onAnimation=function(e){this._run=e||0;return this};aM[bn].animate=function(bF,bw,bv,R){if(aB.is(bv,"function")||!bv){R=bv||null
}var bA={},E={},bt={};for(var bx in bF){if(bF[ac](bx)){if(ai[ac](bx)){bA[bx]=this.attr(bx);
(bA[bx]==null)&&(bA[bx]=l[bx]);E[bx]=bF[bx];switch(ai[bx]){case"along":var bD=aD(bF[bx]),by=J(bF[bx],bD*!!bF.back),S=this.getBBox();
bt[bx]=bD/bw;bt.tx=S.x;bt.ty=S.y;bt.sx=by.x;bt.sy=by.y;E.rot=bF.rot;E.back=bF.back;
E.len=bD;bF.rot&&(bt.r=af(this.rotate())||0);break;case ay:bt[bx]=(E[bx]-bA[bx])/bw;
break;case"colour":bA[bx]=aB.getRGB(bA[bx]);var bz=aB.getRGB(E[bx]);bt[bx]={r:(bz.r-bA[bx].r)/bw,g:(bz.g-bA[bx].g)/bw,b:(bz.b-bA[bx].b)/bw};
break;case"path":var bq=P(bA[bx],E[bx]);bA[bx]=bq[0];var bu=bq[1];bt[bx]=[];for(var bC=0,bs=bA[bx][o];
bC<bs;bC++){bt[bx][bC]=[0];for(var bB=1,bE=bA[bx][bC][o];bB<bE;bB++){bt[bx][bC][bB]=(bu[bC][bB]-bA[bx][bC][bB])/bw
}}break;case"csv":var e=(bF[bx]+aH)[G](a),br=(bA[bx]+aH)[G](a);switch(bx){case"translation":bA[bx]=[0,0];
bt[bx]=[e[0]/bw,e[1]/bw];break;case"rotation":bA[bx]=(br[1]==e[1]&&br[2]==e[2])?br:[0,e[1],e[2]];
bt[bx]=[(e[0]-bA[bx][0])/bw,0,0];break;case"scale":bF[bx]=e;bA[bx]=(bA[bx]+aH)[G](a);
bt[bx]=[(e[0]-bA[bx][0])/bw,(e[1]-bA[bx][1])/bw,0,0];break;case"clip-rect":bA[bx]=(bA[bx]+aH)[G](a);
bt[bx]=[];bC=4;while(bC--){bt[bx][bC]=(e[bC]-bA[bx][bC])/bw}break}E[bx]=e}}}}this.stop();
this.in_animation=1;T[this.id]={start:bF.start||+new Date,ms:bw,easing:bv,from:bA,diff:bt,to:E,el:this,callback:R,t:{x:0,y:0}};
++T[o]==1&&be();return this};aM[bn].stop=function(){T[this.id]&&T[o]--;delete T[this.id];
return this};aM[bn].translate=function(e,i){return this.attr({translation:e+" "+i})
};aM[bn][aQ]=function(){return"Rapha\xebl\u2019s object"};aB.ae=T;var ad=function(e){this.items=[];
this[o]=0;this.type="set";if(e){for(var E=0,R=e[o];E<R;E++){if(e[E]&&(e[E].constructor==aM||e[E].constructor==ad)){this[this.items[o]]=this.items[this.items[o]]=e[E];
this[o]++}}}};ad[bn][f]=function(){var S,e;for(var E=0,R=arguments[o];E<R;E++){S=arguments[E];
if(S&&(S.constructor==aM||S.constructor==ad)){e=this.items[o];this[e]=this.items[e]=S;
this[o]++}}return this};ad[bn].pop=function(){delete this[this[o]--];return this.items.pop()
};for(var F in aM[bn]){if(aM[bn][ac](F)){ad[bn][F]=(function(e){return function(){for(var E=0,R=this.items[o];
E<R;E++){this.items[E][e][bl](this.items[E],arguments)}return this}})(F)}}ad[bn].attr=function(E,br){if(E&&aB.is(E,aW)&&aB.is(E[0],"object")){for(var e=0,bq=E[o];
e<bq;e++){this.items[e].attr(E[e])}}else{for(var R=0,S=this.items[o];R<S;R++){this.items[R].attr(E,br)
}}return this};ad[bn].animate=function(E,e,br,bt){(aB.is(br,"function")||!br)&&(bt=br||null);
var bq=this.items[o],R=bq,bu,bs=this,S;bt&&(S=function(){!--bq&&bt.call(bs)});br=aB.is(br,ab)?br:S;
bu=this.items[--R].animate(E,e,br,S);while(R--){this.items[R].animateWith(bu,E,e,br,S)
}return this};ad[bn].insertAfter=function(E){var e=this.items[o];while(e--){this.items[e].insertAfter(E)
}return this};ad[bn].getBBox=function(){var e=[],br=[],E=[],S=[];for(var R=this.items[o];
R--;){var bq=this.items[R].getBBox();e[f](bq.x);br[f](bq.y);E[f](bq.x+bq.width);S[f](bq.y+bq.height)
}e=a4[bl](0,e);br=a4[bl](0,br);return{x:e,y:br,width:h[bl](0,E)-e,height:h[bl](0,S)-br}
};ad[bn].clone=function(R){R=new ad;for(var e=0,E=this.items[o];e<E;e++){R[f](this.items[e].clone())
}return R};aB.registerFont=function(i){if(!i.face){return i}this.fonts=this.fonts||{};
var R={w:i.w,face:{},glyphs:{}},E=i.face["font-family"];for(var br in i.face){if(i.face[ac](br)){R.face[br]=i.face[br]
}}if(this.fonts[E]){this.fonts[E][f](R)}else{this.fonts[E]=[R]}if(!i.svg){R.face["units-per-em"]=O(i.face["units-per-em"],10);
for(var S in i.glyphs){if(i.glyphs[ac](S)){var bq=i.glyphs[S];R.glyphs[S]={w:bq.w,k:{},d:bq.d&&"M"+bq.d[bc](/[mlcxtrv]/g,function(bs){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bs]||"M"
})+"z"};if(bq.k){for(var e in bq.k){if(bq[ac](e)){R.glyphs[S].k[e]=bq.k[e]}}}}}}return i
};bi[bn].getFont=function(bt,bu,E,S){S=S||"normal";E=E||"normal";bu=+bu||{normal:400,bold:700,lighter:300,bolder:800}[bu]||400;
if(!aB.fonts){return}var bq=aB.fonts[bt];if(!bq){var R=new RegExp("(^|\\s)"+bt[bc](/[^\w\d\s+!~.:_-]/g,aH)+"(\\s|$)","i");
for(var e in aB.fonts){if(aB.fonts[ac](e)){if(R.test(e)){bq=aB.fonts[e];break}}}}var br;
if(bq){for(var bs=0,bv=bq[o];bs<bv;bs++){br=bq[bs];if(br.face["font-weight"]==bu&&(br.face["font-style"]==E||!br.face["font-style"])&&br.face["font-stretch"]==S){break
}}}return br};bi[bn].print=function(S,R,e,bs,bt,bC){bC=bC||"middle";var by=this.set(),bB=(e+aH)[G](aH),bz=0,bv=aH,bD;
aB.is(bs,e)&&(bs=this.getFont(bs));if(bs){bD=(bt||16)/bs.face["units-per-em"];var E=bs.face.bbox.split(a),br=+E[0],bu=+E[1]+(bC=="baseline"?E[3]-E[1]+(+bs.face.descent):(E[3]-E[1])/2);
for(var bx=0,bq=bB[o];bx<bq;bx++){var bw=bx&&bs.glyphs[bB[bx-1]]||{},bA=bs.glyphs[bB[bx]];
bz+=bx?(bw.w||bs.w)+(bw.k&&bw.k[bB[bx]]||0):0;bA&&bA.d&&by[f](this.path(bA.d).attr({fill:"#000",stroke:"none",translation:[bz,0]}))
}by.scale(bD,bD,br,bu).translate(S-br,R-bu)}return by};var a8=/\{(\d+)\}/g;aB.format=function(i,E){var e=aB.is(E,aW)?[0][bg](E):arguments;
i&&aB.is(i,ab)&&e[o]-1&&(i=i[bc](a8,function(S,R){return e[++R]==null?aH:e[R]}));
return i||aH};aB.ninja=function(){n.was?(Raphael=n.is):delete Raphael;return aB};
aB.el=aM[bn];return aB})();
/*
 * Color Picker 0.1.0 - Raphael plugin
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Based on Color Wheel (http://jweir.github.com/colorwheel) by John Weir (http://famedriver.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
sc_require("raphael");
(function(a){a.colorpicker=function(i,m,k,l,j){return new b(i,m,k,l,j)};a.fn.colorPickerIcon=function(j,p,n){var l=g*n*2/Math.min(n/8,4);
var k=g/2-g*2/l*1.5,o=["M",j,p-n,"A",n,n,0,0,1,n*Math.cos(k)+j,p-n*Math.sin(k),"L",j,p,"z"].join();
for(var m=0;m<l;m++){this.path(o).attr({stroke:"none",fill:"hsb("+(l-m)*(255/l)+", 255, 255)",rotation:[90+(360/l)*m,j,p]})
}return this.circle(j,p,n).attr({fill:"r#fff-#fff","fill-opacity":0,"stroke-width":Math.round(n*0.03),stroke:"#fff"})
};var g=Math.PI;function h(i,j){return(i<0)*180+Math.atan(-j/-i)*180/g}var f=document,e=window,c=(function(){if(f.addEventListener){return function(m,k,j,i){var l=function(n){return j.call(i,n)
};m.addEventListener(k,l,false);return function(){m.removeEventListener(k,l,false);
return true}}}else{if(f.attachEvent){return function(n,l,k,j){var m=function(o){return k.call(j,o||e.event)
};n.attachEvent("on"+l,m);var i=function(){n.detachEvent("on"+l,m);return true};return i
}}}})(),b=function(q,o,E,j,i){E=E||200;var p=3*E/200,v=E/200,w=1.6180339887,K=E/20,n=E/2,C=2*E/200,F=E+K*2+C*3,z=this,u=1,k=1,G=1,A=E-(K*4),D=i?a(i,E,F):a(q,o,E,F),l=A/6+K*2+C,m=A*2/3-C*2;
v<1&&(v=1);p<1&&(p=1);D.colorPickerIcon(n,n,n-C);z.cursor=D.set();z.cursor.push(D.circle(n,n,K/2).attr({stroke:"#000",opacity:0.5,"stroke-width":p}));
z.cursor.push(z.cursor[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":v}));
z.disc=D.circle(n,n,n-C).attr({fill:"#000","fill-opacity":0,stroke:"none",cursor:"crosshair"});
var J=z.disc.node.style;J.unselectable="on";J.MozUserSelect="none";J.WebkitUserSelect="none";
var I=K*2+2;z.brect=D.rect(C+I/w/2,E+C*2,E-C*2-I/w,I-C*2).attr({stroke:"#fff",fill:"180-#fff-#000"});
z.cursorb=D.set();z.cursorb.push(D.rect(E-C-I/w,E+C,~~(I/w),I,p).attr({stroke:"#000",opacity:0.5,"stroke-width":p}));
z.cursorb.push(z.cursorb[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":v}));
z.btop=z.brect.clone().attr({stroke:"#000",fill:"#000",opacity:0});J=z.btop.node.style;
J.unselectable="on";J.MozUserSelect="none";J.WebkitUserSelect="none";z.bwidth=~~(I/w)/2;
z.minx=C+z.bwidth;z.maxx=E-I/w-C+z.bwidth;z.H=z.S=z.B=1;z.padding=C;z.raphael=D;z.size2=n;
z.size20=K;z.x=q;z.y=o;z.hson=c(z.disc.node,"mousedown",function(t){var s=f.documentElement.scrollTop||f.body.scrollTop,x=f.documentElement.scrollLeft||f.body.scrollLeft;
this.hsOnTheMove=true;this.setHS(t.clientX+x-this.x,t.clientY+s-this.y);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},z);z.bon=c(z.btop.node,"mousedown",function(s){var t=f.documentElement.scrollLeft||f.body.scrollLeft;
this.bOnTheMove=true;this.setB(s.clientX+t-this.x);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},z);z.winunload=c(e,"unload",function(){this.hson();
this.bon();this.docmove&&this.docmove();this.docup&&this.docup();this.winunload()
},z);z.color(j||"#fff");this.onchanged&&this.onchanged(this.color())};b.prototype.setB=function(i){i<this.minx&&(i=this.minx);
i>this.maxx&&(i=this.maxx);this.cursorb.attr({x:i-this.bwidth});this.B=(i-this.minx)/(this.maxx-this.minx);
this.onchange&&this.onchange(this.color())};b.prototype.setHS=function(i,o){var n=i-this.size2,m=o-this.size2,j=this.size2-this.size20/2-this.padding,l=h(n,m),k=l*g/180;
isNaN(l)&&(l=0);if(n*n+m*m>j*j){i=j*Math.cos(k)+this.size2;o=j*Math.sin(k)+this.size2
}this.cursor.attr({cx:i,cy:o});this.H=(1-l/360)%1;this.S=Math.min((n*n+m*m)/j/j,1);
this.brect.attr({fill:"180-hsb("+[this.H,this.S]+",1)-#000"});this.onchange&&this.onchange(this.color())
};b.prototype.docOnMove=function(j){var i=f.documentElement.scrollTop||f.body.scrollTop,k=f.documentElement.scrollLeft||f.body.scrollLeft;
if(this.hsOnTheMove){this.setHS(j.clientX+k-this.x,j.clientY+i-this.y)}if(this.bOnTheMove){this.setB(j.clientX+k-this.x)
}j.preventDefault&&j.preventDefault();j.returnValue=false;return false};b.prototype.docOnUp=function(i){this.hsOnTheMove=this.bOnTheMove=false;
if(this.docmove){this.docmove()}delete this.docmove;if(this.docup){this.docup()}delete this.docup;
this.onchanged&&this.onchanged(this.color());i.preventDefault&&i.preventDefault();
i.stopPropagation&&i.stopPropagation();i.returnValue=false;return false};b.prototype.remove=function(){this.raphael.remove();
this.color=function(){return false}};b.prototype.color=function(j){if(j){j=a.getRGB(j);
var m=j.hex;j=a.rgb2hsb(j.r,j.g,j.b);n=j.h*360;this.H=j.h;this.S=j.s;this.B=j.b;this.cursorb.attr({x:this.B*(this.maxx-this.minx)+this.minx-this.bwidth});
this.brect.attr({fill:"180-hsb("+[this.H,this.S]+",1)-#000"});var n=(1-this.H)*360,l=n*g/180,k=(this.size2-this.size20/2-this.padding)*this.S,i=Math.cos(l)*k+this.size2,o=Math.sin(l)*k+this.size2;
this.cursor.attr({cx:i,cy:o});return this}else{return a.hsb2rgb(this.H,this.S,this.B).hex
}}})(window.Raphael);sc_require("color_picker/colorwheel");(function(a){a.colorwheel=function(i,m,k,l,j){return new b(i,m,k,l,j)
};var g=Math.PI;function h(i,j){return(i<0)*180+Math.atan(-j/-i)*180/g}var f=document,e=window;
var c=(function(){if(f.addEventListener){return function(m,k,j,i){var l=function(n){return j.call(i,n)
};m.addEventListener(k,l,false);return function(){m.removeEventListener(k,l,false);
return true}}}else{if(f.attachEvent){return function(n,l,k,j){var m=function(o){return k.call(j,o||e.event)
};n.attachEvent("on"+l,m);var i=function(){n.detachEvent("on"+l,m);return true};return i
}}}})();var b=function(v,q,G,k,j){G=G||200;var u=3*G/200,z=G/200,A=1.6180339887,K=g*G/5,P=G/20,p=G/2,E=2*G/200,C=this;
var w=1,l=1,I=1,D=G-(P*4);var F=j?a(j,G,G):a(v,q,G,G),n=D/6+P*2+E,o=D*2/3-E*2;z<1&&(z=1);
u<1&&(u=1);var O=g/2-g*2/K*1.3,m=p-E,N=p-E-P*2,J=["M",p,E,"A",m,m,0,0,1,m*Math.cos(O)+m+E,m-m*Math.sin(O)+E,"L",N*Math.cos(O)+m+E,m-N*Math.sin(O)+E,"A",N,N,0,0,0,p,E+P*2,"z"].join();
for(var L=0;L<K;L++){F.path(J).attr({stroke:"none",fill:"hsb("+L*(255/K)+", 255, 200)",rotation:[(360/K)*L,p,p]})
}F.path(["M",p,E,"A",m,m,0,1,1,p-1,E,"l1,0","M",p,E+P*2,"A",N,N,0,1,1,p-1,E+P*2,"l1,0"]).attr({"stroke-width":u,stroke:"#fff"});
C.cursorhsb=F.set();var M=P*2+2;C.cursorhsb.push(F.rect(p-M/A/2,E-1,M/A,M,3*G/200).attr({stroke:"#000",opacity:0.5,"stroke-width":u}));
C.cursorhsb.push(C.cursorhsb[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":z}));
C.ring=F.path(["M",p,E,"A",m,m,0,1,1,p-1,E,"l1,0M",p,E+P*2,"A",N,N,0,1,1,p-1,E+P*2,"l1,0"]).attr({fill:"#000",opacity:0,stroke:"none"});
C.main=F.rect(n,n,o,o).attr({stroke:"none",fill:"#f00",opacity:1});C.main.clone().attr({stroke:"none",fill:"0-#fff-#fff",opacity:0});
C.square=F.rect(n-1,n-1,o+2,o+2).attr({r:2,stroke:"#fff","stroke-width":u,fill:"90-#000-#000",opacity:0,cursor:"crosshair"});
C.cursor=F.set();C.cursor.push(F.circle(p,p,P/2).attr({stroke:"#000",opacity:0.5,"stroke-width":u}));
C.cursor.push(C.cursor[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":z}));
C.H=C.S=C.B=1;C.raphael=F;C.size2=p;C.wh=o;C.x=v;C.xy=n;C.y=q;C.hsbon=c(C.ring.node,"mousedown",function(i){this.hsbOnTheMove=true;
this.setH(i.clientX-this.x-this.size2,i.clientY-this.y-this.size2);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},C);C.clron=c(C.square.node,"mousedown",function(i){this.clrOnTheMove=true;
this.setSB(i.clientX-this.x,i.clientY-this.y);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},C);C.winunload=c(e,"unload",function(){this.hsbon();
this.clron();this.docmove&&this.docmove();this.docup&&this.docup();this.winunload()
},C);C.color(k||"#f00");this.onchanged&&this.onchanged(this.color())};b.prototype.setH=function(i,l){var k=h(i,l),j=k*g/180;
this.cursorhsb.rotate(k+90,this.size2,this.size2);this.H=(k+90)/360;this.main.attr({fill:"hsb("+this.H+",1,1)"});
this.onchange&&this.onchange(this.color())};b.prototype.setSB=function(i,j){i<this.size2-this.wh/2&&(i=this.size2-this.wh/2);
i>this.size2+this.wh/2&&(i=this.size2+this.wh/2);j<this.size2-this.wh/2&&(j=this.size2-this.wh/2);
j>this.size2+this.wh/2&&(j=this.size2+this.wh/2);this.cursor.attr({cx:i,cy:j});this.B=1-(j-this.xy)/this.wh;
this.S=(i-this.xy)/this.wh;this.onchange&&this.onchange(this.color())};b.prototype.docOnMove=function(i){if(this.hsbOnTheMove){this.setH(i.clientX-this.x-this.size2,i.clientY-this.y-this.size2)
}if(this.clrOnTheMove){this.setSB(i.clientX-this.x,i.clientY-this.y)}i.preventDefault&&i.preventDefault();
i.returnValue=false;return false};b.prototype.docOnUp=function(i){this.hsbOnTheMove=this.clrOnTheMove=false;
if(this.docmove){this.docmove()}delete this.docmove;if(this.docup){this.docup()}delete this.docup;
this.onchanged&&this.onchanged(this.color())};b.prototype.remove=function(){this.raphael.remove();
this.color=function(){return false}};b.prototype.color=function(j){if(j){j=a.getRGB(j);
j=a.rgb2hsb(j.r,j.g,j.b);var k=j.h*360;this.H=j.h;this.S=j.s;this.B=j.b;this.cursorhsb.rotate(k,this.size2,this.size2);
this.main.attr({fill:"hsb("+this.H+",1,1)"});var i=this.S*this.wh+this.xy,l=(1-this.B)*this.wh+this.xy;
this.cursor.attr({cx:i,cy:l});return this}else{return a.hsb2rgb(this.H,this.S,this.B).hex
}}})(window.Raphael);sc_require("raphael");(function(){Raphael.fn.g=Raphael.fn.g||{};
Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var b=[0.6,0.2,0.05,0.1333,0.75,0];for(var a=0;a<10;a++){if(a<b.length){Raphael.fn.g.colors.push("hsb("+b[a]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+b[a-b.length]+", 1, .5)")}}Raphael.fn.g.text=function(c,f,e){return this.text(c,f,e).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(c,f,e){if(c){return(c+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(g,i,h){if(i){return(+f).toFixed(i.replace(/^#+\.?/g,"").length)
}if(h){return(f*100/e).toFixed(h.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+f).toFixed(0)
}};Raphael.fn.g.finger=function(j,i,e,k,f,g,h){if((f&&!k)||(!f&&!e)){return h?"":this.path()
}g={square:"square",sharp:"sharp",soft:"soft"}[g]||"round";var m;k=Math.round(k);
e=Math.round(e);j=Math.round(j);i=Math.round(i);switch(g){case"round":if(!f){var c=Math.floor(k/2);
if(e<c){c=e;m=["M",j+0.5,i+0.5-Math.floor(k/2),"l",0,0,"a",c,Math.floor(k/2),0,0,1,0,k,"l",0,0,"z"]
}else{m=["M",j+0.5,i+0.5-c,"l",e-c,0,"a",c,c,0,1,1,0,k,"l",c-e,0,"z"]}}else{var c=Math.floor(e/2);
if(k<c){c=k;m=["M",j-Math.floor(e/2),i,"l",0,0,"a",Math.floor(e/2),c,0,0,1,e,0,"l",0,0,"z"]
}else{m=["M",j-c,i,"l",0,c-k,"a",c,c,0,1,1,e,0,"l",0,k-c,"z"]}}break;case"sharp":if(!f){var l=Math.floor(k/2);
m=["M",j,i+l,"l",0,-k,Math.max(e-l,0),0,Math.min(l,e),l,-Math.min(l,e),l+(l*2<k),"z"]
}else{var l=Math.floor(e/2);m=["M",j+l,i,"l",-e,0,0,-Math.max(k-l,0),l,-Math.min(l,k),l,Math.min(l,k),l,"z"]
}break;case"square":if(!f){m=["M",j,i+Math.floor(k/2),"l",0,-k,e,0,0,k,"z"]}else{m=["M",j+Math.floor(e/2),i,"l",1-e,0,0,-k,e-1,0,"z"]
}break;case"soft":var c;if(!f){c=Math.min(e,Math.round(k/5));m=["M",j+0.5,i+0.5-Math.floor(k/2),"l",e-c,0,"a",c,c,0,0,1,c,c,"l",0,k-c*2,"a",c,c,0,0,1,-c,c,"l",c-e,0,"z"]
}else{c=Math.min(Math.round(e/5),k);m=["M",j-Math.floor(e/2),i,"l",0,c-k,"a",c,c,0,0,1,c,-c,"l",e-2*c,0,"a",c,c,0,0,1,c,c,"l",0,k-c,"z"]
}}if(h){return m.join(",")}else{return this.path(m)}};Raphael.fn.g.disc=function(c,f,e){return this.circle(c,f,e)
};Raphael.fn.g.line=function(c,f,e){return this.rect(c-e,f-e/5,2*e,2*e/5)};Raphael.fn.g.square=function(c,f,e){e=e*0.7;
return this.rect(c-e,f-e,2*e,2*e)};Raphael.fn.g.triangle=function(c,f,e){e*=1.75;
return this.path("M".concat(c,",",f,"m0-",e*0.58,"l",e*0.5,",",e*0.87,"-",e,",0z"))
};Raphael.fn.g.diamond=function(c,f,e){return this.path(["M",c,f-e,"l",e,e,-e,e,-e,-e,e,-e,"z"])
};Raphael.fn.g.flower=function(g,f,c,e){c=c*1.25;var l=c,k=l*0.5;e=+e<3||!e?5:e;var m=["M",g,f+k,"Q"],j;
for(var h=1;h<e*2+1;h++){j=h%2?l:k;m=m.concat([+(g+j*Math.sin(h*Math.PI/e)).toFixed(3),+(f+j*Math.cos(h*Math.PI/e)).toFixed(3)])
}m.push("z");return this.path(m.join(","))};Raphael.fn.g.star=function(c,k,j,e){e=e||j*0.5;
var h=["M",c,k+e,"L"],g;for(var f=1;f<10;f++){g=f%2?j:e;h=h.concat([(c+g*Math.sin(f*Math.PI*0.2)).toFixed(3),(k+g*Math.cos(f*Math.PI*0.2)).toFixed(3)])
}h.push("z");return this.path(h.join(","))};Raphael.fn.g.cross=function(c,f,e){e=e/2.5;
return this.path("M".concat(c-e,",",f,"l",[-e,-e,e,-e,e,e,e,-e,e,e,-e,e,e,e,-e,e,-e,-e,-e,e,-e,-e,"z"]))
};Raphael.fn.g.plus=function(c,f,e){e=e/2;return this.path("M".concat(c-e/2,",",f-e/2,"l",[0,-e,e,0,0,e,e,0,0,e,-e,0,0,e,-e,0,0,-e,-e,0,0,-e,"z"]))
};Raphael.fn.g.arrow=function(c,f,e){return this.path("M".concat(c-e*0.7,",",f-e*0.4,"l",[e*0.6,0,0,-e*0.4,e,e*0.8,-e,e*0.8,0,-e*0.4,-e*0.6,0],"z"))
};Raphael.fn.g.tag=function(c,k,j,i,g){i=i||0;g=g==null?5:g;j=j==null?"$9.99":j;var f=0.5522*g,e=this.set(),h=3;
e.push(this.path().attr({fill:"#000",stroke:"none"}));e.push(this.text(c,k,j).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){this.rotate(0,c,k);var m=this[1].getBBox();if(m.height>=g*2){this[0].attr({path:["M",c,k+g,"a",g,g,0,1,1,0,-g*2,g,g,0,1,1,0,g*2,"m",0,-g*2-h,"a",g+h,g+h,0,1,0,0,(g+h)*2,"L",c+g+h,k+m.height/2+h,"l",m.width+2*h,0,0,-m.height-2*h,-m.width-2*h,0,"L",c,k-g-h].join(",")})
}else{var l=Math.sqrt(Math.pow(g+h,2)-Math.pow(m.height/2+h,2));this[0].attr({path:["M",c,k+g,"c",-f,0,-g,f-g,-g,-g,0,-f,g-f,-g,g,-g,f,0,g,g-f,g,g,0,f,f-g,g,-g,g,"M",c+l,k-m.height/2-h,"a",g+h,g+h,0,1,0,0,m.height+2*h,"l",g+h-l+m.width+2*h,0,0,-m.height-2*h,"L",c+l,k-m.height/2-h].join(",")})
}this[1].attr({x:c+g+h+m.width/2,y:k});i=(360-i)%360;this.rotate(i,c,k);i>90&&i<270&&this[1].attr({x:c-g-h-m.width/2,y:k,rotation:[180+i,c,k]});
return this};e.update();return e};Raphael.fn.g.popupit=function(j,i,k,e,q){e=e==null?2:e;
q=q||5;j=Math.round(j)+0.5;i=Math.round(i)+0.5;var g=k.getBBox(),l=Math.round(g.width/2),f=Math.round(g.height/2),o=[0,l+q*2,0,-l-q*2],m=[-f*2-q*3,-f-q,0,-f-q],c=["M",j-o[e],i-m[e],"l",-q,(e==2)*-q,-Math.max(l-q,0),0,"a",q,q,0,0,1,-q,-q,"l",0,-Math.max(f-q,0),(e==3)*-q,-q,(e==3)*q,-q,0,-Math.max(f-q,0),"a",q,q,0,0,1,q,-q,"l",Math.max(l-q,0),0,q,!e*-q,q,!e*q,Math.max(l-q,0),0,"a",q,q,0,0,1,q,q,"l",0,Math.max(f-q,0),(e==1)*q,q,(e==1)*-q,q,0,Math.max(f-q,0),"a",q,q,0,0,1,-q,q,"l",-Math.max(l-q,0),0,"z"].join(","),n=[{x:j,y:i+q*2+f},{x:j-q*2-l,y:i},{x:j,y:i-q*2-f},{x:j+q*2+l,y:i}][e];
k.translate(n.x-l-g.x,n.y-f-g.y);return this.path(c).attr({fill:"#000",stroke:"none"}).insertBefore(k.node?k:k[0])
};Raphael.fn.g.popup=function(c,j,i,e,g){e=e==null?2:e;g=g||5;i=i||"$9.99";var f=this.set(),h=3;
f.push(this.path().attr({fill:"#000",stroke:"none"}));f.push(this.text(c,j,i).attr(this.g.txtattr).attr({fill:"#fff"}));
f.update=function(m,l,n){m=m||c;l=l||j;var q=this[1].getBBox(),s=q.width/2,o=q.height/2,v=[0,s+g*2,0,-s-g*2],t=[-o*2-g*3,-o-g,0,-o-g],k=["M",m-v[e],l-t[e],"l",-g,(e==2)*-g,-Math.max(s-g,0),0,"a",g,g,0,0,1,-g,-g,"l",0,-Math.max(o-g,0),(e==3)*-g,-g,(e==3)*g,-g,0,-Math.max(o-g,0),"a",g,g,0,0,1,g,-g,"l",Math.max(s-g,0),0,g,!e*-g,g,!e*g,Math.max(s-g,0),0,"a",g,g,0,0,1,g,g,"l",0,Math.max(o-g,0),(e==1)*g,g,(e==1)*-g,g,0,Math.max(o-g,0),"a",g,g,0,0,1,-g,g,"l",-Math.max(s-g,0),0,"z"].join(","),u=[{x:m,y:l+g*2+o},{x:m-g*2-s,y:l},{x:m,y:l-g*2-o},{x:m+g*2+s,y:l}][e];
if(n){this[0].animate({path:k},500,">");this[1].animate(u,500,">")}else{this[0].attr({path:k});
this[1].attr(u)}return this};return f.update(c,j)};Raphael.fn.g.flag=function(c,i,h,g){g=g||0;
h=h||"$9.99";var e=this.set(),f=3;e.push(this.path().attr({fill:"#000",stroke:"none"}));
e.push(this.text(c,i,h).attr(this.g.txtattr).attr({fill:"#fff"}));e.update=function(j,m){this.rotate(0,j,m);
var l=this[1].getBBox(),k=l.height/2;this[0].attr({path:["M",j,m,"l",k+f,-k-f,l.width+2*f,0,0,l.height+2*f,-l.width-2*f,0,"z"].join(",")});
this[1].attr({x:j+k+f+l.width/2,y:m});g=360-g;this.rotate(g,j,m);g>90&&g<270&&this[1].attr({x:j-r-f-l.width/2,y:m,rotation:[180+g,j,m]});
return this};return e.update(c,i)};Raphael.fn.g.label=function(c,g,f){var e=this.set();
e.push(this.rect(c,g,10,10).attr({stroke:"none",fill:"#000"}));e.push(this.text(c,g,f).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){var i=this[1].getBBox(),h=Math.min(i.width+10,i.height+10)/2;
this[0].attr({x:i.x-h/2,y:i.y-h/2,width:i.width+h,height:i.height+h,r:h})};e.update();
return e};Raphael.fn.g.labelit=function(f){var e=f.getBBox(),c=Math.min(20,e.width+10,e.height+10)/2;
return this.rect(e.x-c/2,e.y-c/2,e.width+c,e.height+c,c).attr({stroke:"none",fill:"#000"}).insertBefore(f[0])
};Raphael.fn.g.drop=function(c,i,h,f,g){f=f||30;g=g||0;var e=this.set();e.push(this.path(["M",c,i,"l",f,0,"A",f*0.4,f*0.4,0,1,0,c+f*0.7,i-f*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-g,c,i]}));
g=(g+90)*Math.PI/180;e.push(this.text(c+f*Math.sin(g),i+f*Math.cos(g),h).attr(this.g.txtattr).attr({"font-size":f*12/30,fill:"#fff"}));
e.drop=e[0];e.text=e[1];return e};Raphael.fn.g.blob=function(e,k,j,i,g){i=(+i+1?i:45)+90;
g=g||12;var c=Math.PI/180,h=g*12/12;var f=this.set();f.push(this.path().attr({fill:"#000",stroke:"none"}));
f.push(this.text(e+g*Math.sin((i)*c),k+g*Math.cos((i)*c)-h/2,j).attr(this.g.txtattr).attr({"font-size":h,fill:"#fff"}));
f.update=function(q,p,v){q=q||e;p=p||k;var y=this[1].getBBox(),B=Math.max(y.width+h,g*25/12),x=Math.max(y.height+h,g*25/12),m=q+g*Math.sin((i-22.5)*c),z=p+g*Math.cos((i-22.5)*c),o=q+g*Math.sin((i+22.5)*c),A=p+g*Math.cos((i+22.5)*c),D=(o-m)/2,C=(A-z)/2,n=B/2,l=x/2,u=-Math.sqrt(Math.abs(n*n*l*l-n*n*C*C-l*l*D*D)/(n*n*C*C+l*l*D*D)),t=u*n*C/l+(o+m)/2,s=u*-l*D/n+(A+z)/2;
if(v){this.animate({x:t,y:s,path:["M",e,k,"L",o,A,"A",n,l,0,1,1,m,z,"z"].join(",")},500,">")
}else{this.attr({x:t,y:s,path:["M",e,k,"L",o,A,"A",n,l,0,1,1,m,z,"z"].join(",")})
}return this};f.update(e,k);return f};Raphael.fn.g.colorValue=function(g,f,e,c){return"hsb("+[Math.min((1-g/f)*0.4,1),e||0.75,c||0.75]+")"
};Raphael.fn.g.snapEnds=function(l,m,k){var h=l,n=m;if(h==n){return{from:h,to:n,power:0}
}function o(f){return Math.abs(f-0.5)<0.25?Math.floor(f)+0.5:Math.round(f)}var j=(n-h)/k,c=Math.floor(j),g=c,e=0;
if(c){while(g){e--;g=Math.floor(j*Math.pow(10,e))/Math.pow(10,e)}e++}else{while(!c){e=e||1;
c=Math.floor(j*Math.pow(10,e))/Math.pow(10,e);e++}e&&e--}var n=o(m*Math.pow(10,e))/Math.pow(10,e);
if(n<m){n=o((m+0.5)*Math.pow(10,e))/Math.pow(10,e)}var h=o((l-(e>0?0:0.5))*Math.pow(10,e))/Math.pow(10,e);
return{from:h,to:n,power:e}};Raphael.fn.g.axis=function(s,q,m,E,h,H,k,J,l,c){c=c==null?2:c;
l=l||"t";H=H||10;var D=l=="|"||l==" "?["M",s+0.5,q,"l",0,0.001]:k==1||k==3?["M",s+0.5,q,"l",0,-m]:["M",s,q+0.5,"l",m,0],v=this.g.snapEnds(E,h,H),I=v.from,z=v.to,G=v.power,F=0,A=this.set();
d=(z-I)/H;var p=I,o=G>0?G:0;u=m/H;if(+k==1||+k==3){var e=q,w=(k-1?1:-1)*(c+3+!!(k-1));
while(e>=q-m){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),e+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,e,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}));
p+=d;e-=u}if(Math.round(e+u-(q-m))){l!="-"&&l!=" "&&(D=D.concat(["M",s-(l=="+"||l=="|"?c:!(k-1)*c*2),q-m+0.5,"l",c*2+1,0]));
A.push(this.text(s+w,q-m,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr).attr({"text-anchor":k-1?"start":"end"}))
}}else{var g=s,p=I,o=G>0?G:0,w=(k?-1:1)*(c+9+!k),u=m/H,B=0,C=0;while(g<=s+m){l!="-"&&l!=" "&&(D=D.concat(["M",g+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(B=this.text(g,q+w,(J&&J[F++])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr));
var n=B.getBBox();if(C>=n.x-5){A.pop(A.length-1).remove()}else{C=n.x+n.width}p+=d;
g+=u}if(Math.round(g-u-s-m)){l!="-"&&l!=" "&&(D=D.concat(["M",s+m+0.5,q-(l=="+"?c:!!k*c*2),"l",0,c*2+1]));
A.push(this.text(s+m,q+w,(J&&J[F])||(Math.round(p)==p?p:+p.toFixed(o))).attr(this.g.txtattr))
}}var K=this.path(D);K.text=A;K.all=this.set([K,A]);K.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return K};Raphael.el.lighter=function(e){e=e||2;
var c=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);c[0].b=Math.min(c[0].b*e,1);c[0].s=c[0].s/e;
c[1].b=Math.min(c[1].b*e,1);c[1].s=c[1].s/e;this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.darker=function(e){e=e||2;var c=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
c[0].s=Math.min(c[0].s*e,1);c[0].b=c[0].b/e;c[1].s=Math.min(c[1].s*e,1);c[1].b=c[1].b/e;
this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();sc_require("graphing/graphael");Raphael.fn.g.barchart=function(E,C,a,e,Q,w){w=w||{};
var R={round:"round",sharp:"sharp",soft:"soft"}[w.type]||"square",o=parseFloat(w.gutter||"20%"),O=this.set(),z=this.set(),f=this.set(),u=this.set(),A=Math.max.apply(Math,Q),P=[],c=this,D=0,H=w.colors||this.g.colors,t=Q.length;
if(this.raphael.is(Q[0],"array")){A=[];D=t;t=0;for(var M=Q.length;M--;){z.push(this.set());
A.push(Math.max.apply(Math,Q[M]));t=Math.max(t,Q[M].length)}if(w.stacked){for(var M=t;
M--;){var m=0;for(var L=Q.length;L--;){m+=+Q[L][M]||0}P.push(m)}}for(var M=Q.length;
M--;){if(Q[M].length<t){for(var L=t;L--;){Q[M].push(0)}}}A=Math.max.apply(Math,w.stacked?P:A)
}A=(w.to)||A;var F=a/(t*(100+o)+o)*100,b=F*o/100,k=w.vgutter==null?20:w.vgutter,v=[],l=E+b,g=(e-2*k)/A;
if(!w.stretch){b=Math.round(b);F=Math.floor(F)}!w.stacked&&(F/=D||1);for(var M=0;
M<t;M++){v=[];for(var L=0;L<(D||1);L++){var N=Math.round((D?Q[L][M]:Q[M])*g),n=C+e-k-N,J=this.g.finger(Math.round(l+F/2),n+N,F,N,true,R).attr({stroke:H[D?L:M],fill:H[D?L:M]});
if(D){z[L].push(J)}else{z.push(J)}J.y=n;J.x=Math.round(l+F/2);J.w=F;J.h=N;J.value=D?Q[L][M]:Q[M];
if(!w.stacked){l+=F}else{v.push(J)}}if(w.stacked){var K;u.push(K=this.rect(v[0].x-v[0].w/2,C,F,e).attr(this.g.shim));
K.bars=this.set();var p=0;for(var G=v.length;G--;){v[G].toFront()}for(var G=0,q=v.length;
G<q;G++){var J=v[G],B,N=(p+J.value)*g,I=this.g.finger(J.x,C+e-k-!!p*0.5,F,N,true,R,1);
K.bars.push(J);p&&J.attr({path:I});J.h=N;J.y=C+e-k-!!p*0.5-N;f.push(B=this.rect(J.x-J.w/2,J.y,F,J.value*g).attr(this.g.shim));
B.bar=J;B.value=J.value;p+=J.value}l+=F}l+=b}u.toFront();l=E+b;if(!w.stacked){for(var M=0;
M<t;M++){for(var L=0;L<(D||1);L++){var B;f.push(B=this.rect(Math.round(l),C+k,F,e-k).attr(this.g.shim));
B.bar=D?z[L][M]:z[M];B.value=B.bar.value;l+=F}l+=b}}O.label=function(y,U){y=y||[];
this.labels=c.set();var V,h=-Infinity;if(w.stacked){for(var x=0;x<t;x++){var S=0;
for(var s=0;s<(D||1);s++){S+=D?Q[s][x]:Q[x];if(s==D-1){var W=c.g.labelise(y[x],S,A);
V=c.g.text(z[x*(D||1)+s].x,C+e-k/2,W).insertBefore(f[x*(D||1)+s]);var T=V.getBBox();
if(T.x-7<h){V.remove()}else{this.labels.push(V);h=T.x+T.width}}}}}else{for(var x=0;
x<t;x++){for(var s=0;s<(D||1);s++){var W=c.g.labelise(D?y[s]&&y[s][x]:y[x],D?Q[s][x]:Q[x],A);
V=c.g.text(z[x*(D||1)+s].x,U?C+e-k/2:z[x*(D||1)+s].y-10,W).insertBefore(f[x*(D||1)+s]);
var T=V.getBBox();if(T.x-7<h){V.remove()}else{this.labels.push(V);h=T.x+T.width}}}}return this
};O.hover=function(i,h){u.hide();f.show();f.mouseover(i).mouseout(h);return this};
O.hoverColumn=function(i,h){f.hide();u.show();h=h||function(){};u.mouseover(i).mouseout(h);
return this};O.click=function(h){u.hide();f.show();f.click(h);return this};O.each=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=f.length;h--;){j.call(f[h])}return this};O.eachColumn=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=u.length;h--;){j.call(u[h])}return this};O.clickColumn=function(h){f.hide();
u.show();u.click(h);return this};O.push(z,f,u);O.bars=z;O.covers=f;return O};Raphael.fn.g.hbarchart=function(o,m,D,A,c,u){u=u||{};
var f={round:"round",sharp:"sharp",soft:"soft"}[u.type]||"square",g=parseFloat(u.gutter||"20%"),w=this.set(),C=this.set(),k=this.set(),G=this.set(),O=Math.max.apply(Math,c),a=[],p=this,E=0,n=u.colors||this.g.colors,J=c.length;
if(this.raphael.is(c[0],"array")){O=[];E=J;J=0;for(var I=c.length;I--;){C.push(this.set());
O.push(Math.max.apply(Math,c[I]));J=Math.max(J,c[I].length)}if(u.stacked){for(var I=J;
I--;){var q=0;for(var H=c.length;H--;){q+=+c[H][I]||0}a.push(q)}}for(var I=c.length;
I--;){if(c[I].length<J){for(var H=J;H--;){c[I].push(0)}}}O=Math.max.apply(Math,u.stacked?a:O)
}O=(u.to)||O;var L=Math.floor(A/(J*(100+g)+g)*100),l=Math.floor(L*g/100),h=[],b=m+l,e=(D-1)/O;
!u.stacked&&(L/=E||1);for(var I=0;I<J;I++){h=[];for(var H=0;H<(E||1);H++){var N=E?c[H][I]:c[I],K=this.g.finger(o,b+L/2,Math.round(N*e),L-1,false,f).attr({stroke:n[E?H:I],fill:n[E?H:I]});
if(E){C[H].push(K)}else{C.push(K)}K.x=o+Math.round(N*e);K.y=b+L/2;K.w=Math.round(N*e);
K.h=L;K.value=+N;if(!u.stacked){b+=L}else{h.push(K)}}if(u.stacked){var t=this.rect(o,h[0].y-h[0].h/2,D,L).attr(this.g.shim);
G.push(t);t.bars=this.set();var z=0;for(var v=h.length;v--;){h[v].toFront()}for(var v=0,F=h.length;
v<F;v++){var K=h[v],M,N=Math.round((z+K.value)*e),B=this.g.finger(o,K.y,N,L-1,false,f,1);
t.bars.push(K);z&&K.attr({path:B});K.w=N;K.x=o+N;k.push(M=this.rect(o+z*e,K.y-K.h/2,K.value*e,L).attr(this.g.shim));
M.bar=K;z+=K.value}b+=L}b+=l}G.toFront();b=m+l;if(!u.stacked){for(var I=0;I<J;I++){for(var H=0;
H<E;H++){var M=this.rect(o,b,D,L).attr(this.g.shim);k.push(M);M.bar=C[H][I];b+=L}b+=l
}}w.label=function(T,R){T=T||[];this.labels=p.set();for(var Q=0;Q<J;Q++){for(var P=0;
P<E;P++){var y=p.g.labelise(E?T[P]&&T[P][Q]:T[Q],E?c[P][Q]:c[Q],O);var S=R?C[Q*(E||1)+P].x-L/2+3:o+5,x=R?"end":"start",s;
this.labels.push(s=p.g.text(S,C[Q*(E||1)+P].y,y).attr({"text-anchor":x}).insertBefore(k[0]));
if(s.getBBox().x<o+5){s.attr({x:o+5,"text-anchor":"start"})}else{C[Q*(E||1)+P].label=s
}}}return this};w.hover=function(j,i){G.hide();k.show();i=i||function(){};k.mouseover(j).mouseout(i);
return this};w.hoverColumn=function(j,i){k.hide();G.show();i=i||function(){};G.mouseover(j).mouseout(i);
return this};w.each=function(s){if(!Raphael.is(s,"function")){return this}for(var j=k.length;
j--;){s.call(k[j])}return this};w.eachColumn=function(s){if(!Raphael.is(s,"function")){return this
}for(var j=G.length;j--;){s.call(G[j])}return this};w.click=function(i){G.hide();
k.show();k.click(i);return this};w.clickColumn=function(i){k.hide();G.show();G.click(i);
return this};w.push(C,k,G);w.bars=C;w.covers=k;return w};sc_require("graphing/graphael");
Raphael.fn.g.dotchart=function(M,L,a,h,A,z,t,H){function T(b){+b[0]&&(b[0]=c.g.axis(M+s,L+s,a-2*s,D,o,H.axisxstep||Math.floor((a-2*s)/20),2,H.axisxlabels||null,H.axisxtype||"t"));
+b[1]&&(b[1]=c.g.axis(M+a-s,L+h-s,h-2*s,C,n,H.axisystep||Math.floor((h-2*s)/20),3,H.axisylabels||null,H.axisytype||"t"));
+b[2]&&(b[2]=c.g.axis(M+s,L+h-s+G,a-2*s,D,o,H.axisxstep||Math.floor((a-2*s)/20),0,H.axisxlabels||null,H.axisxtype||"t"));
+b[3]&&(b[3]=c.g.axis(M+s-G,L+h-s,h-2*s,C,n,H.axisystep||Math.floor((h-2*s)/20),1,H.axisylabels||null,H.axisytype||"t"))
}H=H||{};var w=this.g.snapEnds(Math.min.apply(Math,A),Math.max.apply(Math,A),A.length-1),D=w.from,o=w.to,s=H.gutter||10,K=this.g.snapEnds(Math.min.apply(Math,z),Math.max.apply(Math,z),z.length-1),C=K.from,n=K.to,B=Math.max(A.length,z.length,t.length),v=this.g.markers[H.symbol]||"disc",I=this.set(),u=this.set(),F=H.max||100,q=Math.max.apply(Math,t),p=[],c=this,P=Math.sqrt(q/Math.PI)*2/F;
for(var Q=0;Q<B;Q++){p[Q]=Math.min(Math.sqrt(t[Q]/Math.PI)*2/P,F)}s=Math.max.apply(Math,p.concat(s));
var E=this.set(),G=Math.max.apply(Math,p);if(H.axis){var m=(H.axis+"").split(/[,\s]+/);
T(m);var S=[],U=[];for(var Q=0,J=m.length;Q<J;Q++){var V=m[Q].all?m[Q].all.getBBox()[["height","width"][Q%2]]:0;
S[Q]=V+s;U[Q]=V}s=Math.max.apply(Math,S.concat(s));for(var Q=0,J=m.length;Q<J;Q++){if(m[Q].all){m[Q].remove();
m[Q]=1}}T(m);for(var Q=0,J=m.length;Q<J;Q++){if(m[Q].all){E.push(m[Q].all)}}I.axis=E
}var O=(a-s*2)/((o-D)||1),N=(h-s*2)/((n-C)||1);for(var Q=0,J=z.length;Q<J;Q++){var f=this.raphael.is(v,"array")?v[Q]:v,l=M+s+(A[Q]-D)*O,j=L+h-s-(z[Q]-C)*N;
f&&p[Q]&&u.push(this.g[f](l,j,p[Q]).attr({fill:H.heat?this.g.colorValue(p[Q],G):Raphael.fn.g.colors[0],"fill-opacity":H.opacity?p[Q]/F:1,stroke:"none"}))
}var e=this.set();for(var Q=0,J=z.length;Q<J;Q++){var l=M+s+(A[Q]-D)*O,j=L+h-s-(z[Q]-C)*N;
e.push(this.circle(l,j,G).attr(this.g.shim));H.href&&H.href[Q]&&e[Q].attr({href:H.href[Q]});
e[Q].r=+p[Q].toFixed(3);e[Q].x=+l.toFixed(3);e[Q].y=+j.toFixed(3);e[Q].X=A[Q];e[Q].Y=z[Q];
e[Q].value=t[Q]||0;e[Q].dot=u[Q]}I.covers=e;I.series=u;I.push(u,E,e);I.hover=function(g,b){e.mouseover(g).mouseout(b);
return this};I.click=function(b){e.click(b);return this};I.each=function(g){if(!Raphael.is(g,"function")){return this
}for(var b=e.length;b--;){g.call(e[b])}return this};I.href=function(k){var g;for(var b=e.length;
b--;){g=e[b];if(g.X==k.x&&g.Y==k.y&&g.value==k.value){g.attr({href:k.href})}}};return I
};sc_require("graphing/graphael");Raphael.fn.g.linechart=function(L,K,a,c,u,t,E){function D(y,aa){var x=y.length/aa,X=0,i=x,Z=0,Y=[];
while(X<y.length){i--;if(i<0){Z+=y[X]*(1+i);Y.push(Z/x);Z=y[X++]*-i;i+=x}else{Z+=y[X++]
}}return Y}E=E||{};if(!this.raphael.is(u[0],"array")){u=[u]}if(!this.raphael.is(t[0],"array")){t=[t]
}var Q=Array.prototype.concat.apply([],u),O=Array.prototype.concat.apply([],t),p=this.g.snapEnds(Math.min.apply(Math,Q),Math.max.apply(Math,Q),u[0].length-1),z=p.from,k=p.to,m=E.gutter||10,R=(a-m*2)/(k-z),I=this.g.snapEnds(Math.min.apply(Math,O),Math.max.apply(Math,O),t[0].length-1),w=I.from,h=I.to,P=(c-m*2)/(h-w),v=Math.max(u[0].length,t[0].length),o=E.symbol||"",M=E.colors||Raphael.fn.g.colors,J=this,q=null,l=null,V=this.set(),N=[];
for(var U=0,G=t.length;U<G;U++){v=Math.max(v,t[U].length)}var W=this.set();for(var U=0,G=t.length;
U<G;U++){if(E.shade){W.push(this.path().attr({stroke:"none",fill:M[U],opacity:E.nostroke?1:0.3}))
}if(t[U].length>a-2*m){t[U]=D(t[U],a-2*m);v=a-2*m}if(u[U]&&u[U].length>a-2*m){u[U]=D(u[U],a-2*m)
}}var A=this.set();if(E.axis){var g=(E.axis+"").split(/[,\s]+/);+g[0]&&A.push(this.g.axis(L+m,K+m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),2));
+g[1]&&A.push(this.g.axis(L+a-m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),3));
+g[2]&&A.push(this.g.axis(L+m,K+c-m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),0));
+g[3]&&A.push(this.g.axis(L+m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),1))
}var H=this.set(),S=this.set(),n;for(var U=0,G=t.length;U<G;U++){if(!E.nostroke){H.push(n=this.path().attr({stroke:M[U],"stroke-width":E.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":E.dash||""}))
}var b=this.raphael.is(o,"array")?o[U]:o,B=this.set();N=[];for(var T=0,s=t[U].length;
T<s;T++){var f=L+m+((u[U]||u[0])[T]-z)*R;var e=K+c-m-(t[U][T]-w)*P;(Raphael.is(b,"array")?b[T]:b)&&B.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[T]:b]](f,e,(E.width||2)*3).attr({fill:M[U],stroke:"none"}));
N=N.concat([T?"L":"M",f,e])}S.push(B);if(E.shade){W[U].attr({path:N.concat(["L",f,K+c-m,"L",L+m+((u[U]||u[0])[0]-z)*R,K+c-m,"z"]).join(",")})
}!E.nostroke&&n.attr({path:N.join(",")})}function F(ag){var ad=[];for(var ae=0,ai=u.length;
ae<ai;ae++){ad=ad.concat(u[ae])}ad.sort();var aj=[],aa=[];for(var ae=0,ai=ad.length;
ae<ai;ae++){ad[ae]!=ad[ae-1]&&aj.push(ad[ae])&&aa.push(L+m+(ad[ae]-z)*R)}ad=aj;ai=ad.length;
var Z=ag||J.set();for(var ae=0;ae<ai;ae++){var Y=aa[ae]-(aa[ae]-(aa[ae-1]||L))/2,ah=((aa[ae+1]||L+a)-aa[ae])/2+(aa[ae]-(aa[ae-1]||L))/2,x;
ag?(x={}):Z.push(x=J.rect(Y-1,K,Math.max(ah+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=J.set();x.y=[];x.x=aa[ae];x.axis=ad[ae];for(var ac=0,af=t.length;
ac<af;ac++){aj=u[ac]||u[0];for(var ab=0,y=aj.length;ab<y;ab++){if(aj[ab]==ad[ae]){x.values.push(t[ac][ab]);
x.y.push(K+c-m-(t[ac][ab]-w)*P);x.symbols.push(V.symbols[ac][ab])}}}ag&&ag.call(x)
}!ag&&(q=Z)}function C(ae){var aa=ae||J.set(),x;for(var ac=0,ag=t.length;ac<ag;ac++){for(var ab=0,ad=t[ac].length;
ab<ad;ab++){var Z=L+m+((u[ac]||u[0])[ab]-z)*R,af=L+m+((u[ac]||u[0])[ab?ab-1:1]-z)*R,y=K+c-m-(t[ac][ab]-w)*P;
ae?(x={}):aa.push(x=J.circle(Z,y,Math.abs(af-Z)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=Z;x.y=y;x.value=t[ac][ab];x.line=V.lines[ac];x.shade=V.shades[ac];x.symbol=V.symbols[ac][ab];
x.symbols=V.symbols[ac];x.axis=(u[ac]||u[0])[ab];ae&&ae.call(x)}}!ae&&(l=aa)}V.push(H,W,S,A,q,l);
V.lines=H;V.shades=W;V.symbols=S;V.axis=A;V.hoverColumn=function(j,i){!q&&F();q.mouseover(j).mouseout(i);
return this};V.clickColumn=function(i){!q&&F();q.click(i);return this};V.hrefColumn=function(Y){var Z=J.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof Y=="object"){for(var j in Y){for(var y=0,X=q.length;
y<X;y++){if(q[y].axis==j){q[y].attr("href",Y[j])}}}}!q&&F();for(var y=0,X=Z.length;
y<X;y++){q[y]&&q[y].attr("href",Z[y])}return this};V.hover=function(j,i){!l&&C();
l.mouseover(j).mouseout(i);return this};V.click=function(i){!l&&C();l.click(i);return this
};V.each=function(i){C(i);return this};V.eachColumn=function(i){F(i);return this};
return V};sc_require("graphing/graphael");Raphael.fn.g.piechart=function(f,e,q,b,m){m=m||{};
var l=this,n=[],h=this.set(),o=this.set(),k=this.set(),v=[],x=b.length,y=0,B=0,A=0,c=9,z=true;
o.covers=h;if(x==1){k.push(this.circle(f,e,q).attr({fill:this.g.colors[0],stroke:opt.stroke||"#fff","stroke-width":m.strokewidth==null?1:m.strokewidth}));
h.push(this.circle(f,e,q).attr(this.g.shim));B=b[0];b[0]={value:b[0],order:0,valueOf:function(){return this.value
}};k[0].middle={x:f,y:e};k[0].mangle=180}else{function u(G,F,i,I,E,N){var K=Math.PI/180,C=G+i*Math.cos(-I*K),p=G+i*Math.cos(-E*K),H=G+i/2*Math.cos(-(I+(E-I)/2)*K),M=F+i*Math.sin(-I*K),L=F+i*Math.sin(-E*K),D=F+i/2*Math.sin(-(I+(E-I)/2)*K),J=["M",G,F,"L",C,M,"A",i,i,0,+(Math.abs(E-I)>180),1,p,L,"z"];
J.middle={x:H,y:D};return J}for(var w=0;w<x;w++){B+=b[w];b[w]={value:b[w],order:w,valueOf:function(){return this.value
}}}b.sort(function(p,i){return i.value-p.value});for(var w=0;w<x;w++){if(z&&b[w]*360/B<=1.5){c=w;
z=false}if(w>c){z=false;b[c].value+=b[w];b[c].others=true;A=b[c].value}}x=Math.min(c+1,b.length);
A&&b.splice(x)&&(b[c].others=true);for(var w=0;w<x;w++){var g=y-360*b[w]/B/2;if(!w){y=90-g;
g=y-360*b[w]/B/2}if(m.init){var j=u(f,e,1,y,y-360*b[w]/B).join(",")}var t=u(f,e,q,y,y-=360*b[w]/B);
var s=this.path(m.init?j:t).attr({fill:m.colors&&m.colors[w]||this.g.colors[w]||"#666",stroke:m.stroke||"#fff","stroke-width":(m.strokewidth==null?1:m.strokewidth),"stroke-linejoin":"round"});
s.value=b[w];s.middle=t.middle;s.mangle=g;n.push(s);k.push(s);m.init&&s.animate({path:t.join(",")},(+m.init-1)||1000,">")
}for(var w=0;w<x;w++){var s=l.path(n[w].attr("path")).attr(this.g.shim);m.href&&m.href[w]&&s.attr({href:m.href[w]});
s.attr=function(){};h.push(s);k.push(s)}}o.hover=function(E,C){C=C||function(){};
var D=this;for(var p=0;p<x;p++){(function(F,G,i){var H={sector:F,cover:G,cx:f,cy:e,mx:F.middle.x,my:F.middle.y,mangle:F.mangle,r:q,value:b[i],total:B,label:D.labels&&D.labels[i]};
G.mouseover(function(){E.call(H)}).mouseout(function(){C.call(H)})})(k[p],h[p],p)
}return this};o.each=function(D){var C=this;for(var p=0;p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:f,cy:e,x:E.middle.x,y:E.middle.y,mangle:E.mangle,r:q,value:b[i],total:B,label:C.labels&&C.labels[i]};
D.call(G)})(k[p],h[p],p)}return this};o.click=function(D){var C=this;for(var p=0;
p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:f,cy:e,mx:E.middle.x,my:E.middle.y,mangle:E.mangle,r:q,value:b[i],total:B,label:C.labels&&C.labels[i]};
F.click(function(){D.call(G)})})(k[p],h[p],p)}return this};o.inject=function(i){i.insertBefore(h[0])
};var a=function(I,D,C,p){var M=f+q+q/5,L=e,H=L+10;I=I||[];p=(p&&p.toLowerCase&&p.toLowerCase())||"east";
C=l.g.markers[C&&C.toLowerCase()]||"disc";o.labels=l.set();for(var G=0;G<x;G++){var N=k[G].attr("fill"),E=b[G].order,F;
b[G].others&&(I[E]=D||"Others");I[E]=l.g.labelise(I[E],b[G],B);o.labels.push(l.set());
o.labels[G].push(l.g[C](M+5,H,5).attr({fill:N,stroke:"none"}));o.labels[G].push(F=l.text(M+20,H,I[E]||b[E]).attr(l.g.txtattr).attr({fill:m.legendcolor||"#000","text-anchor":"start"}));
h[G].label=o.labels[G];H+=F.getBBox().height*1.2}var J=o.labels.getBBox(),K={east:[0,-J.height/2],west:[-J.width-2*q-20,-J.height/2],north:[-q-J.width/2,-q-J.height-10],south:[-q-J.width/2,q+10]}[p];
o.labels.translate.apply(o.labels,K);o.push(o.labels)};if(m.legend){a(m.legend,m.legendothers,m.legendmark,m.legendpos)
}o.push(k,h);o.series=k;o.covers=h;return o};require("graphing/graphael");require("graphing/gbar");
SCUI.BarGraph=SC.View.extend({content:null,color:"red",_content_changed:function(){if(this.get("content")&&this.get("isVisible")){console.log(this.get("content"));
if(this._raphael){this._raphael.remove()}this._render_view()}},didAppendToDocument:function(){var a=this;
this.invokeLater(function(){a._render_view()})},willDestroyLayer:function(){if(this._raphael){this._raphael.remove()
}},_render_view:function(){if(!this._raphael&&this.$().get(0)){var c=this.$().get(0);
var f=Raphael(c),g=function(){this.flag=f.g.popup(this.bar.x,this.bar.y,this.bar.value||"0").insertBefore(this)
},e=function(){this.flag.animate({opacity:0},200,function(){this.remove()})},b=function(){var k=[],j=[];
for(var h=this.bars.length;h--;){k.push(this.bars[h].y);j.push(this.bars[h].value||"0")
}this.flag=f.g.popup(this.bars[0].x,Math.min.apply(Math,k),j.join(", ")).insertBefore(this)
},a=function(){this.flag.animate({opacity:0},300,function(){this.remove()})};f.g.hbarchart(0,0,300,220,this.get("content"),{stacked:true}).hover(g,e);
this._raphael=f}}});require("color_picker/colorpicker");require("color_picker/colorwheel");
SCUI.ColorPicker=SC.View.extend({value:"#eee",size:160,displayProperties:"value".w(),render:function(a,c){var b=this.get("value");
if(this._cp){if(this._cp.color()!==b){this._cp.color(b)}}},didAppendToDocument:function(){var c=this.get("parentView"),f=this.get("frame");
var g=c?c.convertFrameToView(f,null):f;if(!this._cp){var a=this.$().get(0),b=this,e;
this._cp=e=Raphael.colorpicker(g.x,g.y,this.get("size"),this.get("value"),a);this._cp.onchange=function(h){b.setIfChanged("value",h)
}}else{this._cp.x=g.x;this._cp.y=g.y}},willDestroyLayer:function(){if(this._cp){this._cp.remove()
}}});SCUI.ColorWell=SC.View.extend({classNames:["color-well"],value:"#eee",activeClass:"active",displayProperties:"value".w(),render:function(a,b){a.addStyle({backgroundColor:this.get("value")}).setClass(this.get("activeClass"),this._isMouseDown)
},mouseDown:function(a){if(!this.get("isEnabledInPane")){return NO}this.set("isActive",YES);
this.displayDidChange();return YES},mouseUp:function(a){if(!this.get("isEnabledInPane")){return NO
}this._isMouseDown=false;this.displayDidChange();this._popupColorPicker();return YES
},_popupColorPicker:function(){var a=this;if(!this._pickerPane){this._pickerPane=SC.PickerPane.create({layout:{width:180,height:240},classNames:["color-picker","picker"],contentView:SC.View.design({childViews:"picker textBox".w(),picker:SCUI.ColorPicker.design({layout:{centerX:0,top:10,width:160,height:185},valueBinding:SC.binding("value",a)}),textBox:SC.TextFieldView.design({layout:{width:160,height:24,bottom:10,left:10},valueBinding:SC.binding("value",a)})})})
}this._pickerPane.popup(this,SC.PICKER_POINTER)}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("scui/sai")
};