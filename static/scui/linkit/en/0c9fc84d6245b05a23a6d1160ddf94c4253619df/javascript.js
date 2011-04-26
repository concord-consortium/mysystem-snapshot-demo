LinkIt=SC.Object.create({ROUND:"round",OUTPUT_TERMINAL:"LinkIt.TerminalOutput",INPUT_TERMINAL:"LinkIt.TerminalInput",NEVER:"never",DIRECTIONAL:"dir",INVERSE_DIRECTIONAL:"idir",ALWAYS:"always",INVITE:"invite",ACCEPT:"accept",HORIZONTAL_CURVED:"hcurved",VERTICAL_CURVED:"vcurved",STRAIGHT:"straight",PIPES:"pipes",ARROW_END:"end",ARROW_BOTH:"both",ARROW_START:"start",ARROW_NONE:"none",logToConsole:YES,getLayer:function(a){if(a.kindOf(LinkIt.CanvasView)){return a
}else{var b=a.get("parentView");if(b){return this.getLayer(b)}else{LinkIt.log("Error: No layer to be found!")
}}return null},getContainer:function(a){if(a.kindOf(LinkIt.NodeContainerView)){return a
}else{var b=a.get("parentView");if(b){return this.getContainer(b)}else{LinkIt.log("Error: No Container To Be Found!")
}}return null},genLinkID:function(d){if(d){var c=d.get("startNode");var b=d.get("startTerminal");
var a=d.get("endNode");var f=d.get("endTerminal");var g=[SC.guidFor(c),b].join("_");
var e=[SC.guidFor(a),f].join("_");return(g<e)?[g,e].join("_"):[e,g].join("_")}return""
},log:function(a){if(this.logToConsole){console.log(a)}}});LinkIt.Link={isLink:YES,isSelected:NO,linkStyle:{cap:LinkIt.ROUND,width:3,color:"#ADD8E6",lineStyle:LinkIt.VERTICAL_CURVED,arrows:LinkIt.ARROW_END,arrowAngle:40,arrowLength:5},label:{text:"something interesting",fontSize:12,fontFamily:"sans-serif",fontStyle:"normal",backgroundColor:"rgba(255, 255, 255, 0.7)",padding:4},selectionColor:"#FFFF64",selectionWidth:7,startNode:null,startTerminal:null,endNode:null,endTerminal:null,startPt:null,endPt:null,initMixin:function(){},drawLink:function(c){var d=this.get("linkStyle")||{};
var a=(d?d.lineStyle:LinkIt.STRAIGHT)||LinkIt.STRAIGHT;var e=d.color;var f=d.width;
var b=this.get("isSelected");switch(a){case LinkIt.HORIZONTAL_CURVED:if(b){d.color=this.get("selectionColor");
d.width=this.get("selectionWidth");this.drawHorizontalCurvedLine(c,d);d.color=e;d.width=f
}this.drawHorizontalCurvedLine(c,d);break;case LinkIt.VERTICAL_CURVED:if(b){d.color=this.get("selectionColor");
d.width=this.get("selectionWidth");this.drawVerticalCurvedLine(c,d);d.color=e;d.width=f
}this.drawVerticalCurvedLine(c,d);break;default:if(b){d.color=this.get("selectionColor");
d.width=this.get("selectionWidth");this.drawStraightLine(c,d);d.color=e;d.width=f
}this.drawStraightLine(c,d);break}},drawStraightLine:function(a,b){var d=this.get("startPt");
var c=this.get("endPt");if(d&&c){a=this._initLineProperties(a,b);a.beginPath();a.moveTo(d.x,d.y);
a.lineTo(c.x,c.y);a.closePath();a.stroke();this.drawArrows(a);this.drawLabel(a,(d.x+c.x)/2,(d.y+c.y)/2)
}},drawHorizontalCurvedLine:function(d,y){var t=this.get("startPt");var w=this.get("endPt");
if(t&&w){d=this._initLineProperties(d,y);var r=(t.x+w.x)/2;var q=(t.y+w.y)/2;this._midPt={x:r,y:q};
var f=(t.x-w.x);var e=(t.y-w.y);var z=Math.pow(f,2);var c=Math.pow(e,2);var l=Math.sqrt(z+c);
var x=Math.abs(t.x-w.x);var p=Math.abs(t.y-w.y);var k=0,s;if(l>0){s=(x<p)?x:p;k=(s<50)?s/l:50/l
}var j=(t.x+r)/2;var h=(t.y+q)/2;var v=(w.x+r)/2;var u=(w.y+q)/2;var g,i;if(t.y<w.y){g=f*k;
i=-(e*k)}else{g=-(f*k);i=e*k}var b=j+i;var a=h+g;this._startControlPt={x:b,y:a};var n=v-i;
var m=u-g;this._endControlPt={x:n,y:m};d.beginPath();d.moveTo(t.x,t.y);d.quadraticCurveTo(b,a,r,q);
d.quadraticCurveTo(n,m,w.x,w.y);d.stroke();this.drawArrows(d);this.drawLabel(d,r,q)
}},drawVerticalCurvedLine:function(d,y){var t=this.get("startPt");var w=this.get("endPt");
if(t&&w){d=this._initLineProperties(d,y);var r=(t.x+w.x)/2;var q=(t.y+w.y)/2;this._midPt={x:r,y:q};
var f=(t.x-w.x);var e=(t.y-w.y);var z=Math.pow(f,2);var c=Math.pow(e,2);var l=Math.sqrt(z+c);
var x=Math.abs(t.x-w.x);var p=Math.abs(t.y-w.y);var k=0,s;if(l>0){s=(x<p)?x:p;k=(s<50)?s/l:50/l
}var j=(t.x+r)/2;var h=(t.y+q)/2;var v=(w.x+r)/2;var u=(w.y+q)/2;var g,i;if(t.x<w.x){g=-(f*k);
i=e*k}else{g=f*k;i=-(e*k)}var b=j+i;var a=h+g;this._startControlPt={x:b,y:a};var n=v-i;
var m=u-g;this._endControlPt={x:n,y:m};d.beginPath();d.moveTo(t.x,t.y);d.quadraticCurveTo(b,a,r,q);
d.quadraticCurveTo(n,m,w.x,w.y);d.stroke();this.drawArrows(d);this.drawLabel(d,r,q)
}},drawLabel:function(a,i,g){if(this.label&&this.label.text&&this.label.text.length&&this.label.text.length>0){var b=this.get("label")||{};
var k=b.text||"";var l=b.fontSize||12;var f=b.fontFamily||"sans-serif";var c=b.fontStyle||"normal";
var e=b.backgroundColor||"#FF0000";var h=b.padding||4;a.save();var j=a.strokeStyle;
a.font=c+" "+l+"px/2 "+f;var d=a.measureText(k).width+h;a.fillStyle=e;a.fillRect(i-(d/2+h/2),g-(l+h/2),d+h,(l+h));
a.fillStyle=j;a.textAlign="center";a.fillText(k,i,g);a.restore()}},drawArrows:function(a){if(this.get("linkStyle")&&this.get("linkStyle")!=LinkIt.ARROW_NONE){if(this.get("linkStyle").arrows==LinkIt.ARROW_END||this.get("linkStyle").arrows==LinkIt.ARROW_BOTH){this.drawArrow(a,"end")
}if(this.get("linkStyle").arrows==LinkIt.ARROW_START||this.get("linkStyle").arrows==LinkIt.ARROW_BOTH){this.drawArrow(a,"start")
}}},drawArrow:function(d,j){var b,a,l,k;if(j=="end"){b=this.get("startPt").x;a=this.get("startPt").y;
l=this.get("endPt").x;k=this.get("endPt").y}else{if(j=="start"){l=this.get("startPt").x;
k=this.get("startPt").y;b=this.get("endPt").x;a=this.get("endPt").y}}var g=this.get("linkStyle").arrowAngle||40;
var m=this.get("linkStyle").arrowLength||5;var f;if(this.get("_endControlPt")){f=Math.atan2((k-this._endControlPt.y),(l-this._endControlPt.x))
}else{f=Math.atan2((k-a),(l-b))}var q=l+m*Math.cos(f);var n=k+m*Math.sin(f);var i=f+g*Math.PI/180;
var h=f-g*Math.PI/180;var e=l-m*Math.cos(i);var c=k-m*Math.sin(i);var r=l-m*Math.cos(h);
var p=k-m*Math.sin(h);d.save();d.beginPath();d.moveTo(q,n);d.lineTo(e,c);d.moveTo(q,n);
d.lineTo(r,p);d.stroke();d.restore()},distanceSquaredFromLine:function(f){var h=this.get("startPt");
var e=this.get("endPt");var b=this.get("linkStyle");var a=b?(b.lineStyle||LinkIt.STRAIGHT):LinkIt.STRAIGHT;
if(a===LinkIt.STRAIGHT){return this._distanceSquaredFromLineSegment(h,e,f)}else{var d=this._distanceSquaredFromCurve(h,this._midPt,this._startControlPt,f);
var c=this._distanceSquaredFromCurve(this._midPt,e,this._endControlPt,f);var g=Math.min(d,c);
return g}},_distanceSquaredFromLineSegment:function(j,i,f){var d;if(j.x!==i.x||j.y!==i.y){var m={x:(i.x-j.x),y:(i.y-j.y)};
var c=(m.x*(f.x-j.x))+((f.y-j.y)*m.y);var l=c/((m.x*m.x)+(m.y*m.y));if(l<=0){d={x:j.x,y:j.y}
}else{if(l>=1){d={x:i.x,y:i.y}}else{var k=j.x+(l*m.x);var h=j.y+(l*m.y);d={x:k,y:h}
}}}else{d={x:j.x,y:j.y}}var e={x:(d.x-f.x),y:(d.y-f.y)};var g=(e.x*e.x)+(e.y*e.y);
return g},_distanceSquaredFromCurve:function(l,k,j,d){var s,u,q;var i={x:l.x,y:l.y};
var h={x:k.x,y:k.y};var r=0.5,f=0.5;do{u={x:(i.x+h.x)/2,y:(i.y+h.y)/2};s=this._pointOnBezierCurve(l,j,k,r);
q=this._distanceSquared(u,s);if(q>16){var g=this._distanceSquared(i,d);var e=this._distanceSquared(h,d);
f=0.5*f;if(g<e){h=s;r=r-f}else{i=s;r=r+f}}else{break}}while(true);return this._distanceSquaredFromLineSegment(i,h,d)
},_pointOnBezierCurve:function(f,d,c,b){var a=((1-b)*(1-b)*f.x)+(2*(1-b)*b*d.x)+(b*b*c.x);
var e=((1-b)*(1-b)*f.y)+(2*(1-b)*b*d.y)+(b*b*c.y);return{x:a,y:e}},_distanceSquared:function(d,c){return((c.x-d.x)*(c.x-d.x))+((c.y-d.y)*(c.y-d.y))
},_initLineProperties:function(c,e){if(c){var b=e?(e.cap||LinkIt.ROUND):LinkIt.ROUND;
var a=e?(e.color||"#ADD8E6"):"#ADD8E6";var d=e?(e.width||3):3;c.lineCap=b;c.strokeStyle=a;
c.lineWidth=d}return c},_midPt:null,_startControlPt:null,_endControlPt:null};LinkIt.Node={isNode:YES,terminals:null,linksKey:"links",positionKey:"position",_invalidationDelegate:null,_invalidationAction:null,initMixin:function(){var b,a;
b=this.get("terminals");if(SC.typeOf(b)===SC.T_ARRAY){this.set("terminals",SC.clone(b))
}a=this.get("linksKey");if(a){this.addObserver(a,this,"_linksDidChange")}},canLink:function(a){return YES
},canDeleteLink:function(a){return YES},registerInvalidationDelegate:function(a,b){this._invalidationDelegate=a;
this._invalidationAction=b},didCreateLink:function(a){},willDeleteLink:function(a){},createLink:function(a){if(this.didCreateLink){this.didCreateLink(a)
}},deleteLink:function(a){if(this.willDeleteLink){this.willDeleteLink(a)}},_linksDidChange:function(){if(this._invalidationDelegate){var a=this._invalidationDelegate[this._invalidationAction];
if(a){a.apply(this._invalidationDelegate)}}}};LinkIt.NodeView={isNodeView:YES,terminalViewFor:function(a){return null
}};LinkIt.Terminal={isTerminal:YES,isLinked:NO,direction:null,terminal:null,linkStyle:null,dropState:null,displayProperties:["dropState","isLinked","linkStyle","label","direction"],linkClass:null,node:null,_linkCache:null,isDropTarget:YES,terminalKey:function(){var b=this.get("node");
var a=this.get("terminal");return"%@:%@".fmt(SC.guidFor(b),a)}.property("node","terminal").cacheable(),initMixin:function(){this.isLinked=NO
},willDestroyLayerMixin:function(){SC.Drag.removeDropTarget(this)},renderMixin:function(b,d){var a=this.get("links");
b.setClass("connected",this.get("isLinked"));var c=this.get("dropState");b.setClass("invite",c===LinkIt.INVITE);
b.setClass("accept",c===LinkIt.ACCEPT)},canDragLink:function(){return YES},canDropLink:function(){return YES
},linkDragStarted:function(){},linkDragEnded:function(){},linkDragEntered:function(){},linkDragExited:function(){},mouseDown:function(a){this._mouseDownEvent=a;
this._mouseDownAt=Date.now();return YES},mouseDragged:function(j){if(this.canDragLink()&&this._mouseDownEvent){var f=LinkIt.getLayer(this);
if(f){var i=this.get("parentView");var g=i.convertFrameFromView(i.get("frame"),this);
var a=this.get("frame");var e=g.x+(a.width/2);var c=g.y+(a.height/2);var b=this.get("linkDragColor");
var h=LinkIt.DragLink.create({layout:{left:0,top:0,right:0,bottom:0},startPt:{x:e,y:c},endPt:{x:e,y:c},linkStyle:this.get("linkStyle"),label:this.get("label")});
f.appendChild(h);var d=SC.Drag.start({event:this._mouseDownEvent,dragLink:h,source:this,dragView:SC.View.create({layout:{left:0,top:0,width:0,height:0}}),ghost:NO,slideBack:YES,dataSource:this,anchorView:f})
}this._cleanupMouseDown()}return YES},mouseUp:function(a){this._cleanupMouseDown();
return YES},dragSourceOperationMaskFor:function(a,b){return this._nodeAllowsLink(b)?SC.DRAG_LINK:SC.DRAG_NONE
},dragDidBegin:function(a,b){},dragDidMove:function(b,h){var f=b.dragLink;var e,a;
if(f){var d=f.get("parentView");var g=f.get("frame");var c=d?d.convertFrameToView(g,null):g;
if(c){e=h.x-c.x;a=h.y-c.y;f.set("endPt",{x:e,y:a})}}},dragDidEnd:function(a,c,d){var b=a.dragLink;
if(b){b.destroy()}},dragStarted:function(b,a){if(this._nodeAllowsLink(b.source)){this.set("dropState",LinkIt.INVITE);
this.linkDragStarted()}},dragEntered:function(b,a){this.set("dropState",LinkIt.ACCEPT);
this.linkDragEntered()},dragExited:function(b,a){this.set("dropState",LinkIt.INVITE);
this.linkDragExited()},dragEnded:function(b,a){this.set("dropState",null);this.linkDragEnded()
},computeDragOperations:function(b,a){return SC.DRAG_LINK},acceptDragOperation:function(b,c){var a=(c===SC.DRAG_LINK)?this._nodeAllowsLink(b.source):NO;
return a},performDragOperation:function(e,g){var a,f,d,b;LinkIt.log("%@.performDragOperation()".fmt(this));
a=this.get("node");b=e.source;if(a&&b){d=b.get("node");if(d){var c=this._getLinkObjects(b,d,this,a);
if(c[0]){d.createLink(c[0])}if(c[1]){a.createLink(c[1])}}}return g},_getLinkObjects:function(e,c,f,a){var d,b;
this._linkCache=this._linkCache||{};d="%@ %@".fmt(e.get("terminalKey"),f.get("terminalKey"));
b=this._linkCache[d]||this._createLinkObject(e,c,f,a);this._linkCache[d]=b;return b
},_nodeAllowsLink:function(h){var e,c,g,a;if(h&&h.get("isTerminal")){var f=this.get("node");
var d=h.get("node");var b=this._getLinkObjects(h,d,this,f);c=(f&&b[0])?f.canLink(b[0]):NO;
a=(d&&c&&b[1])?d.canLink(b[1]):NO}return(c&&a)},_createLinkObject:function(f,a,b,g){var e={};
var d,h;if(a&&g){var c=f.get("direction");var i=b.get("direction");if(!SC.none(c)&&c===i){return[null,null]
}if((c===LinkIt.OUTPUT_TERMINAL&&(i===LinkIt.INPUT_TERMINAL||SC.none(i)))||(i===LinkIt.INPUT_TERMINAL&&SC.none(c))){e.direction=c;
e.startNode=a;e.startTerminal=f.get("terminal");e.startTerminalView=f;e.endNode=g;
e.endTerminal=b.get("terminal");e.endTerminalView=b;d=SC.Object.create(LinkIt.Link,e);
return[d,d]}else{if((c===LinkIt.INPUT_TERMINAL&&(i===LinkIt.OUTPUT_TERMINAL||SC.none(i)))||(i===LinkIt.OUTPUT_TERMINAL&&SC.none(c))){e.direction=i;
e.startNode=g;e.startTerminal=b.get("terminal");e.startTerminalView=b;e.endNode=a;
e.endTerminal=f.get("terminal");e.endTerminalView=f;d=SC.Object.create(LinkIt.Link,e);
return[d,d]}else{e.direction=c;e.startNode=a;e.startTerminal=f.get("terminal");e.startTerminalView=f;
e.endNode=g;e.endTerminal=b.get("terminal");e.endTerminalView=b;d=SC.Object.create(LinkIt.Link,e);
return[d,d]}}}},_cleanupMouseDown:function(){this._mouseDownEvent=this._mouseDownAt=null
}};LinkIt.CanvasView=SC.CollectionView.extend({classNames:["linkit-canvas"],isEmpty:YES,acceptsFirstResponder:YES,canDeleteContent:YES,allowDeselectAll:YES,contextMenuTarget:null,contextMenuAction:null,nodeViewDelegate:null,LINK_SELECTION_FREEDOM:6,linkSelection:null,allowMultipleSelection:NO,selectedLinks:[],displayProperties:["frame","links.[]"],linksDidChange:function(){this.invokeOnce(this._updateLinks)
},render:function(c,e){var d=this.get("frame");if(e){if(!SC.browser.msie){c.push('<canvas class="base-layer" width="%@" height="%@">You can\'t use canvas tags</canvas>'.fmt(d.width,d.height))
}}else{var b=this.$("canvas.base-layer");if(b){b.attr("width",d.width);b.attr("height",d.height);
if(b.length>0){var a=b[0].getContext("2d");if(a){a.clearRect(0,0,d.width,d.height);
this._drawLinks(a)}else{LinkIt.log("Linkit.LayerView.render(): Canvas object context is not accessible.")
}}else{LinkIt.log("Linkit.LayerView.render(): Canvas element array length is zero.")
}}else{LinkIt.log("Linkit.LayerView.render(): Canvas element is not accessible.")
}}return arguments.callee.base.apply(this,arguments)},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(SC.browser.msie){var b=this.get("frame");var a=document.createElement("CANVAS");
a.className="base-layer";a.width=b.width;a.height=b.height;this.$().append(a);a=G_vmlCanvasManager.initElement(a);
this._canvasie=a}},didReload:function(g){var c={};var f=this.get("content")||[];var a=f.get("length");
var e,h,b;for(var d=0;d<a;d++){e=f.objectAt(d);h=SC.guidFor(e);b=this.itemViewForContentIndex(d);
c[h]=b}this._nodeViewIndex=c},itemViewForContentIndex:function(i,h){var f=this.get("content"),c=this._sc_itemViews,n=f.objectAt(i),l=this.get("contentDelegate"),g=l.contentGroupIndexes(this,f),b=NO,k,e,p,d,a,m;
if(!c){c=this._sc_itemViews=[]}if(!h&&(e=c[i])){return e}b=g&&g.contains(i);if(b){b=l.contentIndexIsGroup(this,f,i)
}if(b){k=this.get("contentGroupExampleViewKey");if(k&&n){p=n.get(k)}if(!p){p=this.get("groupExampleView")||this.get("exampleView")
}}else{k=this.get("contentExampleViewKey");if(k&&n){p=n.get(k)}if(!p&&(m=this.get("nodeViewDelegate"))){p=m.exampleViewForNode(n)
}if(!p){p=this.get("exampleView")}}var j=this._TMP_ATTRS;j.contentIndex=i;j.content=n;
j.owner=j.displayDelegate=this;j.parentView=this.get("containerView")||this;j.page=this.page;
j.layerId=this.layerIdFor(i,n);j.isEnabled=l.contentIndexIsEnabled(this,f,i);j.isSelected=l.contentIndexIsSelected(this,f,i);
j.outlineLevel=l.contentIndexOutlineLevel(this,f,i);j.disclosureState=l.contentIndexDisclosureState(this,f,i);
j.isGroupView=b;j.isVisibleInWindow=this.isVisibleInWindow;if(b){j.classNames=this._GROUP_COLLECTION_CLASS_NAMES
}else{j.classNames=this._COLLECTION_CLASS_NAMES}d=this.layoutForContentIndex(i);if(d){j.layout=d
}else{delete j.layout}e=this.createItemView(p,i,j);c[i]=e;return e},createItemView:function(g,b,d){var c,h;
var f,a;var e=d.content;if(g){c=g.create(d)}else{c=SC.LabelView.create(d,{layout:{left:0,top:0,width:150,height:50},value:"Missing NodeView"})
}h=c.get("frame");a=this._getItemPosition(e);if(!a){a=this._genRandomPosition();this._setItemPosition(e,a)
}f={top:a.y,left:a.x,width:h.width,height:h.height};c.set("layout",f);return c},deleteSelection:function(){var a=arguments.callee.base.apply(this,arguments);
this.deleteLinkSelection();return YES},deleteLinkSelection:function(){var a=this.get("selectedLinks");
if(a){a.forEach(function(d){if(d){var c=d.get("startNode");var b=d.get("endNode");
if(c&&b){if(c.canDeleteLink(d)&&b.canDeleteLink(d)){c.deleteLink(d);b.deleteLink(d)
}}}});this.set("linkSelection",null);this.set("selectedLinks",[]);this.displayDidChange()
}},mouseDown:function(k){var l,a,g,f,e,i,d,c;var j;arguments.callee.base.apply(this,arguments);
this._dragData=null;if(k&&(k.which===3)||(k.ctrlKey&&k.which===1)){var h=this.get("selectedLinks");
if(h&&!this.getPath("selection.length")){c=[{title:"Delete Selected Links".loc(),target:this,action:"deleteLinkSelection",isEnabled:YES}];
d=SCUI.ContextMenuPane.create({contentView:SC.View.design({}),layout:{width:194,height:0},itemTitleKey:"title",itemTargetKey:"target",itemActionKey:"action",itemSeparatorKey:"isSeparator",itemIsEnabledKey:"isEnabled",items:c});
d.popup(this,k)}}else{var b=k.metaKey&&this.get("allowMultipleSelection");l=this.get("parentView");
a=this.get("frame");g=l?l.convertFrameToView(a,null):a;f=k.pageX-g.x;e=k.pageY-g.y;
this._selectLink({x:f,y:e},b);i=this.itemViewForEvent(k);if(i){this._dragData=SC.clone(i.get("layout"));
this._dragData.startPageX=k.pageX;this._dragData.startPageY=k.pageY;this._dragData.view=i;
this._dragData.didMove=NO}}return YES},mouseDragged:function(c){var b,a;if(this._dragData){this._dragData.didMove=YES;
b=c.pageX-this._dragData.startPageX;a=c.pageY-this._dragData.startPageY;this._dragData.view.adjust({left:this._dragData.left+b,top:this._dragData.top+a});
this.displayDidChange()}return YES},mouseUp:function(a){var b=arguments.callee.base.apply(this,arguments);
var e,d,c,f;if(this._dragData&&this._dragData.didMove){e=this._dragData.view.get("layout");
d=this._dragData.view.get("content");if(d&&d.get("isNode")){c={x:e.left,y:e.top};
this._setItemPosition(d,c)}}this._dragData=null;if(a&&(a.which===3)||(a.ctrlKey&&a.which===1)){f=this.get("contextMenuAction");
if(f){this.getPath("pane.rootResponder").sendAction(f,this.get("contextMenuTarget"),this,this.get("pane"),a)
}}return b},selectObjects:function(a){this.set("selectedLinks",a.slice());this.linksDidChange()
},_layoutForNodeView:function(d,c){var b=null,a,e;if(d&&c){e=d.get("frame");a=this._getItemPosition(c);
if(!a){a=this._genRandomPosition();this._setItemPosition(c,a)}b={top:a.x,left:a.y,width:e.width,height:e.height}
}return b},_updateLinks:function(){var l=[];var a=this.get("content");if(a){var f,k;
a.forEach(function(i){if(i&&(k=i.get("linksKey"))){f=i.get(k)||[];l=l.concat(f)}});
var h=[];o:for(var c=0;c<l.length;c++){for(var b=0;b<h.length;b++){if(h[b]==l[c]){continue o
}}h[h.length]=l[c]}l=h;var g=this.get("linkSelection");var e=this.get("selectedLinks");
this.set("linkSelection",null);this.set("selectedLinks",[]);var d=this;e.forEach(function(j){g=j;
var i=LinkIt.genLinkID(g);l.forEach(function(m){if((LinkIt.genLinkID(m)===i)&&(d.get("selectedLinks").indexOf(m)<0)){d.set("linkSelection",m);
m.set("isSelected",YES);d.get("selectedLinks").pushObject(m)}})})}this.set("links",l)
},_drawLinks:function(d){var a=this.get("links");var c=a.get("length");var f,e,b,g;
for(b=0;b<c;b++){f=a.objectAt(b);if(!SC.none(f)){e=this._endpointsFor(f);if(e){f.drawLink(d)
}}}},_endpointsFor:function(h){var g=this._terminalViewFor(h.get("startNode"),h.get("startTerminal"));
var c=this._terminalViewFor(h.get("endNode"),h.get("endTerminal"));var d=null,f=null,j,b;
if(g&&c){j=g.get("parentView");if(j){b=j.convertFrameToView(g.get("frame"),this);
d={};d.x=SC.midX(b);d.y=SC.midY(b);h.set("startPt",d)}j=c.get("parentView");if(j){b=j.convertFrameToView(c.get("frame"),this);
f={};f.x=SC.midX(b);f.y=SC.midY(b);h.set("endPt",f)}var e=g.get("linkStyle");var a={};
if(e){a=h.get("linkStyle")||{};h.set("linkStyle",SC.supplement(e,a))}var i=g.get("label");
if(i){a=h.get("label")||{};h.set("label",SC.supplement(i,a))}}return d&&f?{startPt:d,endPt:f}:null
},_selectLink:function(j,a){var h=this.get("links")||[];var d=h.get("length");var f,e,b;
var g;var c=(this.LINE_SELECTION_FREEDOM*this.LINE_SELECTION_FREEDOM)||25;this.set("linkSelection",null);
if(!a){this.set("selectedLinks",[])}for(b=0;b<d;b++){f=h.objectAt(b);e=f.distanceSquaredFromLine(j);
if((SC.typeOf(e)===SC.T_NUMBER)&&(e<=c)){if(a){if(this.get("selectedLinks").indexOf(f)==-1){f.set("isSelected",YES);
this.set("linkSelection",f);g=this.get("selectedLinks").slice();g.pushObject(f);this.set("selectedLinks",g)
}else{f.set("isSelected",NO);this.set("linkSelection",null);g=this.get("selectedLinks").slice();
g.removeObject(f);this.set("selectedLinks",g)}}else{f.set("isSelected",YES);this.set("linkSelection",f);
this.set("selectedLinks",[f])}break}else{if(!a){f.set("isSelected",NO)}}}if(!a){for(b=b+1;
b<d;b++){f=h.objectAt(b);f.set("isSelected",NO)}}this.displayDidChange()},_terminalViewFor:function(b,a){var c=this._nodeViewIndex[SC.guidFor(b)];
if(c&&c.terminalViewFor){return c.terminalViewFor(a)}return null},_contentDidChange:function(){this._nodeSetup();
this.linksDidChange()}.observes("*content.[]"),_nodeSetup:function(){var a=this.get("content");
var c=0;var d,e;this.set("_nodeIndex",{});if(a){c=a.get("length");for(var b=0;b<c;
b++){d=a.objectAt(b);d.registerInvalidationDelegate(this,"linksDidChange");e=SC.guidFor(d);
this._nodeIndex[e]={node:d}}}this.set("isEmpty",c<=0)},_getItemPosition:function(b){var a=b?b.get("positionKey"):null;
var c=a?b.get(a):null;if(a&&c){c={x:(parseFloat(c.x)||0),y:(parseFloat(c.y)||0)}}return c
},_setItemPosition:function(b,c){var a=b?b.get("positionKey"):null;if(a){b.set(a,c)
}},_genRandomPosition:function(){return{x:Math.floor(10+Math.random()*590),y:Math.floor(10+Math.random()*390)}
},links:[],_nodeIndex:{},_nodeViewIndex:{},_dragData:null});sc_require("mixins/link");
LinkIt.DragLink=SC.View.extend(LinkIt.Link,{classNames:["linkIt-draglink"],displayProperties:["startPt","endPt"],render:function(c,a){if(a){if(!SC.browser.msie){c.push("<canvas>test</canvas>")
}}else{var e=this.$("canvas");var d=this.get("frame");if(e&&d){var b=d.width;var k=d.height;
e.attr("width",b);e.attr("height",k);if(e.length>0){var h=this._canvasie?this._canvasie.getContext("2d"):e[0].getContext("2d");
if(h){h.clearRect(0,0,b,k);var f=this.get("startPt");var g=this.get("endPt");var j=Math.abs(f.x-g.x);
var i=Math.abs(f.y-g.y);if(j>5||i>5){if(this.drawLink){this.drawLink(h)}}}else{LinkIt.log("LinkIt.DragLink.render(): Canvas object context is not accessible.")
}}else{LinkIt.log("LinkIt.DragLink.render(): Canvas element has length zero.")}}else{LinkIt.log("LinkIt.DragLink.render(): Canvas element or frame unaccessible.")
}}arguments.callee.base.apply(this,arguments)},didCreateLayer:function(){if(SC.browser.msie){var b=this.get("frame");
var a=document.createElement("CANVAS");a.width=b.width;a.height=b.height;this.$().append(a);
a=G_vmlCanvasManager.initElement(a);this._canvasie=a}this.set("layoutNeedsUpdate",YES)
}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("scui/linkit")
};