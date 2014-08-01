(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var appView = new f1feed.app.ApplicationView();
	var appContext = new f1feed.app.ApplicationContext(appView);
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var XmlType = { __ename__ : true, __constructs__ : [] };
var Xml = function() { };
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
var mmvc = {};
mmvc.api = {};
mmvc.api.IContext = function() { };
$hxClasses["mmvc.api.IContext"] = mmvc.api.IContext;
mmvc.api.IContext.__name__ = ["mmvc","api","IContext"];
mmvc.api.IContext.prototype = {
	commandMap: null
	,__class__: mmvc.api.IContext
};
mmvc.impl = {};
mmvc.impl.Context = function(contextView,autoStartup) {
	if(autoStartup == null) autoStartup = true;
	this.autoStartup = autoStartup;
	this.set_contextView(contextView);
};
$hxClasses["mmvc.impl.Context"] = mmvc.impl.Context;
mmvc.impl.Context.__name__ = ["mmvc","impl","Context"];
mmvc.impl.Context.__interfaces__ = [mmvc.api.IContext];
mmvc.impl.Context.prototype = {
	autoStartup: null
	,contextView: null
	,commandMap: null
	,injector: null
	,mediatorMap: null
	,reflector: null
	,viewMap: null
	,startup: function() {
	}
	,shutdown: function() {
	}
	,set_contextView: function(value) {
		if(this.contextView != value) {
			this.contextView = value;
			this.commandMap = null;
			this.mediatorMap = null;
			this.viewMap = null;
			this.mapInjections();
			this.checkAutoStartup();
		}
		return value;
	}
	,get_injector: function() {
		if(this.injector == null) return this.createInjector();
		return this.injector;
	}
	,get_reflector: function() {
		if(this.reflector == null) this.reflector = new minject.Reflector();
		return this.reflector;
	}
	,get_commandMap: function() {
		if(this.commandMap == null) this.commandMap = new mmvc.base.CommandMap(this.createChildInjector());
		return this.commandMap;
	}
	,get_mediatorMap: function() {
		if(this.mediatorMap == null) this.mediatorMap = new mmvc.base.MediatorMap(this.contextView,this.createChildInjector(),this.get_reflector());
		return this.mediatorMap;
	}
	,get_viewMap: function() {
		if(this.viewMap == null) this.viewMap = new mmvc.base.ViewMap(this.contextView,this.get_injector());
		return this.viewMap;
	}
	,mapInjections: function() {
		this.get_injector().mapValue(minject.Reflector,this.get_reflector());
		this.get_injector().mapValue(minject.Injector,this.get_injector());
		this.get_injector().mapValue(mmvc.api.IViewContainer,this.contextView);
		this.get_injector().mapValue(mmvc.api.ICommandMap,this.get_commandMap());
		this.get_injector().mapValue(mmvc.api.IMediatorMap,this.get_mediatorMap());
		this.get_injector().mapValue(mmvc.api.IViewMap,this.get_viewMap());
	}
	,checkAutoStartup: function() {
		if(this.autoStartup && this.contextView != null) this.startup();
	}
	,createInjector: function() {
		this.injector = new minject.Injector();
		return this.get_injector();
	}
	,createChildInjector: function() {
		return this.get_injector().createChildInjector();
	}
	,__class__: mmvc.impl.Context
	,__properties__: {get_viewMap:"get_viewMap",get_reflector:"get_reflector",get_mediatorMap:"get_mediatorMap",get_injector:"get_injector",get_commandMap:"get_commandMap",set_contextView:"set_contextView"}
};
var f1feed = {};
f1feed.app = {};
f1feed.app.ApplicationContext = function(contextView) {
	mmvc.impl.Context.call(this,contextView);
};
$hxClasses["f1feed.app.ApplicationContext"] = f1feed.app.ApplicationContext;
f1feed.app.ApplicationContext.__name__ = ["f1feed","app","ApplicationContext"];
f1feed.app.ApplicationContext.__super__ = mmvc.impl.Context;
f1feed.app.ApplicationContext.prototype = $extend(mmvc.impl.Context.prototype,{
	startup: function() {
		this.get_commandMap().mapSignalClass(f1feed.feed.signal.LoadFeedList,f1feed.feed.command.LoadFeedListCommand);
		this.get_injector().mapSingleton(f1feed.feed.model.FeedList);
		this.get_mediatorMap().mapView(f1feed.feed.view.FeedListView,f1feed.feed.view.FeedListViewMediator);
		this.get_mediatorMap().mapView(f1feed.app.ApplicationView,f1feed.app.ApplicationViewMediator);
	}
	,shutdown: function() {
	}
	,__class__: f1feed.app.ApplicationContext
});
f1feed.core = {};
f1feed.core.View = function() {
	this.id = "view" + f1feed.core.View.idCounter++;
	this.index = -1;
	this.className = Type.getClassName(Type.getClass(this)).split(".").pop();
	this.children = [];
	this.signal = new msignal.Signal2();
	this.initialize();
};
$hxClasses["f1feed.core.View"] = f1feed.core.View;
f1feed.core.View.__name__ = ["f1feed","core","View"];
f1feed.core.View.prototype = {
	id: null
	,parent: null
	,index: null
	,signal: null
	,element: null
	,tagName: null
	,children: null
	,className: null
	,toString: function() {
		return this.className + "(" + this.id + ")";
	}
	,dispatch: function(event,view) {
		if(view == null) view = this;
		this.signal.dispatch(event,view);
	}
	,addChild: function(view) {
		view.signal.add($bind(this,this.dispatch));
		view.parent = this;
		view.set_index(this.children.length);
		this.children.push(view);
		this.element.appendChild(view.element);
		this.dispatch("added",view);
	}
	,removeChild: function(view) {
		var removed = HxOverrides.remove(this.children,view);
		if(removed) {
			var oldIndex = view.index;
			view.remove();
			view.signal.remove($bind(this,this.dispatch));
			view.parent = null;
			view.set_index(-1);
			this.element.removeChild(view.element);
			var _g1 = oldIndex;
			var _g = this.children.length;
			while(_g1 < _g) {
				var i = _g1++;
				var view1 = this.children[i];
				view1.set_index(i);
			}
			this.dispatch("removed",view);
		}
	}
	,initialize: function() {
		if(this.tagName == null) this.tagName = "div";
		this.element = window.document.createElement(this.tagName);
		this.element.setAttribute("id",this.id);
		this.element.className = this.className;
	}
	,remove: function() {
	}
	,update: function() {
	}
	,set_index: function(value) {
		if(this.index != value) {
			this.index = value;
			this.update();
		}
		return this.index;
	}
	,__class__: f1feed.core.View
	,__properties__: {set_index:"set_index"}
};
mmvc.api.IViewContainer = function() { };
$hxClasses["mmvc.api.IViewContainer"] = mmvc.api.IViewContainer;
mmvc.api.IViewContainer.__name__ = ["mmvc","api","IViewContainer"];
mmvc.api.IViewContainer.prototype = {
	viewAdded: null
	,viewRemoved: null
	,isAdded: null
	,__class__: mmvc.api.IViewContainer
};
f1feed.app.ApplicationView = function() {
	f1feed.core.View.call(this);
};
$hxClasses["f1feed.app.ApplicationView"] = f1feed.app.ApplicationView;
f1feed.app.ApplicationView.__name__ = ["f1feed","app","ApplicationView"];
f1feed.app.ApplicationView.__interfaces__ = [mmvc.api.IViewContainer];
f1feed.app.ApplicationView.__super__ = f1feed.core.View;
f1feed.app.ApplicationView.prototype = $extend(f1feed.core.View.prototype,{
	viewAdded: null
	,viewRemoved: null
	,createViews: function() {
		var feedView = new f1feed.feed.view.FeedListView();
		this.addChild(feedView);
	}
	,dispatch: function(event,view) {
		switch(event) {
		case "added":
			this.viewAdded(view);
			break;
		case "removed":
			this.viewRemoved(view);
			break;
		default:
			f1feed.core.View.prototype.dispatch.call(this,event,view);
		}
	}
	,isAdded: function(view) {
		return true;
	}
	,initialize: function() {
		f1feed.core.View.prototype.initialize.call(this);
		window.document.body.appendChild(this.element);
	}
	,__class__: f1feed.app.ApplicationView
});
mmvc.api.IMediator = function() { };
$hxClasses["mmvc.api.IMediator"] = mmvc.api.IMediator;
mmvc.api.IMediator.__name__ = ["mmvc","api","IMediator"];
mmvc.api.IMediator.prototype = {
	preRegister: null
	,onRegister: null
	,preRemove: null
	,onRemove: null
	,getViewComponent: null
	,setViewComponent: null
	,__class__: mmvc.api.IMediator
};
mmvc.base = {};
mmvc.base.MediatorBase = function() {
	this.slots = [];
};
$hxClasses["mmvc.base.MediatorBase"] = mmvc.base.MediatorBase;
mmvc.base.MediatorBase.__name__ = ["mmvc","base","MediatorBase"];
mmvc.base.MediatorBase.__interfaces__ = [mmvc.api.IMediator];
mmvc.base.MediatorBase.prototype = {
	view: null
	,removed: null
	,slots: null
	,preRegister: function() {
		this.removed = false;
		this.onRegister();
	}
	,onRegister: function() {
	}
	,preRemove: function() {
		this.removed = true;
		this.onRemove();
	}
	,onRemove: function() {
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			slot.remove();
		}
	}
	,getViewComponent: function() {
		return this.view;
	}
	,setViewComponent: function(viewComponent) {
		this.view = viewComponent;
	}
	,mediate: function(slot) {
		this.slots.push(slot);
	}
	,__class__: mmvc.base.MediatorBase
};
mmvc.impl.Mediator = function() {
	mmvc.base.MediatorBase.call(this);
};
$hxClasses["mmvc.impl.Mediator"] = mmvc.impl.Mediator;
mmvc.impl.Mediator.__name__ = ["mmvc","impl","Mediator"];
mmvc.impl.Mediator.__super__ = mmvc.base.MediatorBase;
mmvc.impl.Mediator.prototype = $extend(mmvc.base.MediatorBase.prototype,{
	injector: null
	,contextView: null
	,mediatorMap: null
	,__class__: mmvc.impl.Mediator
});
f1feed.app.ApplicationViewMediator = function() {
	mmvc.impl.Mediator.call(this);
};
$hxClasses["f1feed.app.ApplicationViewMediator"] = f1feed.app.ApplicationViewMediator;
f1feed.app.ApplicationViewMediator.__name__ = ["f1feed","app","ApplicationViewMediator"];
f1feed.app.ApplicationViewMediator.__super__ = mmvc.impl.Mediator;
f1feed.app.ApplicationViewMediator.prototype = $extend(mmvc.impl.Mediator.prototype,{
	onRegister: function() {
		mmvc.impl.Mediator.prototype.onRegister.call(this);
		this.view.createViews();
	}
	,onRemove: function() {
		mmvc.impl.Mediator.prototype.onRemove.call(this);
	}
	,__class__: f1feed.app.ApplicationViewMediator
});
f1feed.core.DataView = function(data) {
	f1feed.core.View.call(this);
	this.setData(data);
};
$hxClasses["f1feed.core.DataView"] = f1feed.core.DataView;
f1feed.core.DataView.__name__ = ["f1feed","core","DataView"];
f1feed.core.DataView.__super__ = f1feed.core.View;
f1feed.core.DataView.prototype = $extend(f1feed.core.View.prototype,{
	data: null
	,previousData: null
	,setData: function(data,force) {
		if(force == null) force = false;
		if(this.data != data || force == true) {
			this.previousData = this.data;
			this.data = data;
			this.dataChanged();
			this.update();
			this.dispatch("dataChanged",this);
		}
	}
	,dataChanged: function() {
	}
	,__class__: f1feed.core.DataView
});
mmvc.api.ICommand = function() { };
$hxClasses["mmvc.api.ICommand"] = mmvc.api.ICommand;
mmvc.api.ICommand.__name__ = ["mmvc","api","ICommand"];
mmvc.api.ICommand.prototype = {
	execute: null
	,__class__: mmvc.api.ICommand
};
mmvc.impl.Command = function() {
};
$hxClasses["mmvc.impl.Command"] = mmvc.impl.Command;
mmvc.impl.Command.__name__ = ["mmvc","impl","Command"];
mmvc.impl.Command.__interfaces__ = [mmvc.api.ICommand];
mmvc.impl.Command.prototype = {
	contextView: null
	,commandMap: null
	,injector: null
	,mediatorMap: null
	,signal: null
	,execute: function() {
	}
	,__class__: mmvc.impl.Command
};
f1feed.feed = {};
f1feed.feed.command = {};
f1feed.feed.command.LoadFeedListCommand = function() {
	mmvc.impl.Command.call(this);
};
$hxClasses["f1feed.feed.command.LoadFeedListCommand"] = f1feed.feed.command.LoadFeedListCommand;
f1feed.feed.command.LoadFeedListCommand.__name__ = ["f1feed","feed","command","LoadFeedListCommand"];
f1feed.feed.command.LoadFeedListCommand.__super__ = mmvc.impl.Command;
f1feed.feed.command.LoadFeedListCommand.prototype = $extend(mmvc.impl.Command.prototype,{
	list: null
	,loadFeedList: null
	,loader: null
	,execute: function() {
		this.loader = new mloader.JsonLoader("data/data.json");
		this.loader.loaded.addOnce($bind(this,this.completed)).forType(mloader.LoaderEventType.Complete);
		this.loader.loaded.addOnce($bind(this,this.failed)).forType(mloader.LoaderEventType.Fail(null));
		this.loader.load();
	}
	,completed: function(event) {
		this.loader.loaded.remove($bind(this,this.failed));
		var items = event.target.content.responseData.feed.entries;
		var _g = 0;
		while(_g < items.length) {
			var item = items[_g];
			++_g;
			var feed = new f1feed.feed.model.FeedItem(item.title,item.link,item.author,item.publishedDate,item.contentSnippet,item.content);
			this.list.add(feed);
		}
		this.loadFeedList.completed.dispatch(this.list);
	}
	,failed: function(error) {
		this.loader.loaded.remove($bind(this,this.completed));
		this.loadFeedList.failed.dispatch(Std.string(error));
	}
	,__class__: f1feed.feed.command.LoadFeedListCommand
});
f1feed.feed.model = {};
f1feed.feed.model.FeedItem = function(title,link,author,publishedDate,contentSnippet,content) {
	this.title = title;
	this.link = link;
	this.author = author;
	this.publishedDate = publishedDate;
	this.contentSnippet = contentSnippet;
	this.content = content;
};
$hxClasses["f1feed.feed.model.FeedItem"] = f1feed.feed.model.FeedItem;
f1feed.feed.model.FeedItem.__name__ = ["f1feed","feed","model","FeedItem"];
f1feed.feed.model.FeedItem.prototype = {
	title: null
	,link: null
	,author: null
	,publishedDate: null
	,contentSnippet: null
	,content: null
	,toString: function() {
		return JSON.stringify(this);
	}
	,__class__: f1feed.feed.model.FeedItem
};
var mdata = {};
mdata.Collection = function() { };
$hxClasses["mdata.Collection"] = mdata.Collection;
mdata.Collection.__name__ = ["mdata","Collection"];
mdata.Collection.prototype = {
	changed: null
	,size: null
	,add: null
	,addAll: null
	,clear: null
	,contains: null
	,isEmpty: null
	,iterator: null
	,remove: null
	,removeAll: null
	,toArray: null
	,toString: null
	,__class__: mdata.Collection
};
mdata.CollectionBase = function() {
	this.source = [];
	this.set_eventsEnabled(true);
	this.changed = new msignal.EventSignal(this);
};
$hxClasses["mdata.CollectionBase"] = mdata.CollectionBase;
mdata.CollectionBase.__name__ = ["mdata","CollectionBase"];
mdata.CollectionBase.__interfaces__ = [mdata.Collection];
mdata.CollectionBase.prototype = {
	changed: null
	,get_changed: function() {
		return this.changed;
	}
	,eventsEnabled: null
	,get_eventsEnabled: function() {
		return this.eventsEnabled;
	}
	,set_eventsEnabled: function(value) {
		return this.eventsEnabled = value;
	}
	,size: null
	,get_size: function() {
		return this.source.length;
	}
	,source: null
	,add: function(value) {
		this.source.push(value);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Add([value]));
	}
	,notifyChanged: function(eventType,payload) {
		this.get_changed().dispatchType(eventType);
	}
	,addAll: function(values) {
		if(values == null) return;
		var s = this.source.length;
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var value = $it0.next();
			this.source.push(value);
		}
		if(this.get_eventsEnabled() && this.source.length != s) {
			var v;
			if((values instanceof Array) && values.__enum__ == null) v = values; else v = mcore.util.Iterables.toArray(values);
			this.notifyChanged(mdata.CollectionEventType.Add(v));
		}
	}
	,clear: function() {
		if(this.isEmpty()) return;
		var values = this.source.splice(0,this.source.length);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Remove(values));
	}
	,contains: function(value) {
		return mcore.util.Iterables.indexOf(this.source,value) != -1;
	}
	,isEmpty: function() {
		return this.source.length == 0;
	}
	,iterator: function() {
		return HxOverrides.iter(this.source);
	}
	,remove: function(value) {
		var hasChanged = false;
		var i = this.source.length;
		var removed = [];
		while(i-- > 0) if(this.source[i] == value) {
			removed.push(this.source.splice(i,1)[0]);
			hasChanged = true;
			break;
		}
		if(this.get_eventsEnabled() && hasChanged) this.notifyChanged(mdata.CollectionEventType.Remove(removed));
		return hasChanged;
	}
	,removeAll: function(values) {
		var removed = [];
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var value = $it0.next();
			var i = this.source.length;
			while(i-- > 0) if(this.source[i] == value) removed.push(this.source.splice(i,1)[0]);
		}
		if(this.get_eventsEnabled() && removed.length > 0) this.notifyChanged(mdata.CollectionEventType.Remove(removed));
		return removed.length > 0;
	}
	,toArray: function() {
		return this.source.slice();
	}
	,toString: function() {
		return this.source.toString();
	}
	,__class__: mdata.CollectionBase
	,__properties__: {get_size:"get_size",set_eventsEnabled:"set_eventsEnabled",get_eventsEnabled:"get_eventsEnabled",get_changed:"get_changed"}
};
mdata.List = function() { };
$hxClasses["mdata.List"] = mdata.List;
mdata.List.__name__ = ["mdata","List"];
mdata.List.__interfaces__ = [mdata.Collection];
mdata.List.prototype = {
	first: null
	,last: null
	,length: null
	,insert: null
	,insertAll: null
	,set: null
	,setAll: null
	,get: null
	,indexOf: null
	,lastIndexOf: null
	,removeAt: null
	,removeRange: null
	,__class__: mdata.List
};
mdata.ArrayList = function(values) {
	mdata.CollectionBase.call(this);
	if(values != null) this.addAll(values);
};
$hxClasses["mdata.ArrayList"] = mdata.ArrayList;
mdata.ArrayList.__name__ = ["mdata","ArrayList"];
mdata.ArrayList.__interfaces__ = [mdata.List];
mdata.ArrayList.__super__ = mdata.CollectionBase;
mdata.ArrayList.prototype = $extend(mdata.CollectionBase.prototype,{
	first: null
	,get_first: function() {
		if(this.isEmpty()) throw mcore.exception.RangeException.numeric(0,0,0);
		return this.source[0];
	}
	,last: null
	,get_last: function() {
		if(this.isEmpty()) throw mcore.exception.RangeException.numeric(0,0,0);
		return this.source[this.get_size() - 1];
	}
	,length: null
	,get_length: function() {
		return this.source.length;
	}
	,add: function(value) {
		this.source.push(value);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Add([value]),mdata.ChangeLocation.Indices([this.source.length - 1]));
	}
	,addAll: function(values) {
		if(values == null) return;
		var s = this.source.length;
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var value = $it0.next();
			this.source.push(value);
		}
		if(this.get_eventsEnabled() && this.source.length != s) {
			var v;
			if((values instanceof Array) && values.__enum__ == null) v = values; else v = mcore.util.Iterables.toArray(values);
			this.notifyChanged(mdata.CollectionEventType.Add(v),mdata.ChangeLocation.Range(s,this.source.length));
		}
	}
	,insert: function(index,value) {
		if(index < 0 || index > this.get_size()) throw mcore.exception.RangeException.numeric(index,0,this.get_size());
		this.source.splice(index,0,value);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Add([value]),mdata.ChangeLocation.Indices([index]));
	}
	,insertAll: function(index,values) {
		if(index < 0 || index > this.get_size()) throw mcore.exception.RangeException.numeric(index,0,this.get_size());
		var i = index;
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var value = $it0.next();
			var pos = i++;
			this.source.splice(pos,0,value);
		}
		if(this.get_eventsEnabled() && i != index) {
			var v;
			if((values instanceof Array) && values.__enum__ == null) v = values; else v = mcore.util.Iterables.toArray(values);
			this.notifyChanged(mdata.CollectionEventType.Add(v),mdata.ChangeLocation.Range(index,i));
		}
	}
	,set: function(index,value) {
		if(index < 0 || index > this.get_size()) throw mcore.exception.RangeException.numeric(index,0,this.get_size());
		var item = this.source[index];
		this.source[index] = value;
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Replace([item]),mdata.ChangeLocation.Indices([index]));
		return item;
	}
	,setAll: function(index,values) {
		var count = mcore.util.Iterables.size(values);
		var max = index + count;
		if(index < 0) throw mcore.exception.RangeException.numeric(index,0,this.get_size()); else if(max > this.get_size()) throw mcore.exception.RangeException.numeric(max,0,this.get_size());
		var removed = [];
		if(count > 0) {
			var i = index;
			var $it0 = $iterator(values)();
			while( $it0.hasNext() ) {
				var value = $it0.next();
				removed.push(this.source[i]);
				this.source[i++] = value;
			}
			if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Replace(removed),mdata.ChangeLocation.Range(index,max));
		}
		return removed;
	}
	,get: function(index) {
		if(index < 0 || index >= this.get_size()) throw mcore.exception.RangeException.numeric(index,0,this.get_size());
		return this.source[index];
	}
	,indexOf: function(value) {
		var _g1 = 0;
		var _g = this.source.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.source[i] == value) return i;
		}
		return -1;
	}
	,lastIndexOf: function(value) {
		var i = this.source.length;
		while(i-- > 0) if(this.source[i] == value) return i;
		return -1;
	}
	,clear: function() {
		if(this.isEmpty()) return;
		var s = this.source.length;
		var values = this.source.splice(0,this.source.length);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Remove(values),mdata.ChangeLocation.Range(0,s));
	}
	,notifyChanged: function(eventType,payload) {
		this.get_changed().dispatch(new mdata.ListEvent(eventType,payload));
	}
	,removeAt: function(index) {
		if(index < 0 || index >= this.get_size()) throw mcore.exception.RangeException.numeric(index,0,this.get_size());
		var value = this.source.splice(index,1);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Remove(value),mdata.ChangeLocation.Indices([index]));
		return value[0];
	}
	,remove: function(value) {
		var index = -1;
		var removed = null;
		var _g1 = 0;
		var _g = this.source.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.source[i] == value) {
				index = i;
				removed = this.source.splice(i,1);
				break;
			}
		}
		if(this.get_eventsEnabled() && index != -1) this.notifyChanged(mdata.CollectionEventType.Remove(removed),mdata.ChangeLocation.Indices([index]));
		return index != -1;
	}
	,removeRange: function(startIndex,endIndex) {
		if(startIndex < 0 || startIndex >= this.get_size()) throw mcore.exception.RangeException.numeric(startIndex,0,this.get_size()); else if(endIndex == null || endIndex > this.get_size()) endIndex = this.get_size(); else if(endIndex < 0) endIndex = this.get_size() + endIndex;
		if(endIndex <= startIndex) return [];
		var removed = this.source.splice(startIndex,endIndex - startIndex);
		if(this.get_eventsEnabled()) this.notifyChanged(mdata.CollectionEventType.Remove(removed),mdata.ChangeLocation.Range(startIndex,endIndex));
		return removed;
	}
	,removeAll: function(values) {
		if(values == null) return false;
		var removed = [];
		var indices = [];
		var i = this.source.length;
		while(i-- > 0) {
			var $it0 = $iterator(values)();
			while( $it0.hasNext() ) {
				var value = $it0.next();
				if(this.source[i] == value) {
					removed.push(this.source.splice(i,1)[0]);
					indices.unshift(i);
					break;
				}
			}
		}
		if(this.get_eventsEnabled() && removed.length > 0) this.notifyChanged(mdata.CollectionEventType.Remove(removed),mdata.ChangeLocation.Indices(indices));
		return removed.length > 0;
	}
	,__class__: mdata.ArrayList
	,__properties__: $extend(mdata.CollectionBase.prototype.__properties__,{get_length:"get_length",get_last:"get_last",get_first:"get_first"})
});
f1feed.feed.model.FeedList = function(values) {
	mdata.ArrayList.call(this,values);
};
$hxClasses["f1feed.feed.model.FeedList"] = f1feed.feed.model.FeedList;
f1feed.feed.model.FeedList.__name__ = ["f1feed","feed","model","FeedList"];
f1feed.feed.model.FeedList.__super__ = mdata.ArrayList;
f1feed.feed.model.FeedList.prototype = $extend(mdata.ArrayList.prototype,{
	getAll: function() {
		return this.source;
	}
	,__class__: f1feed.feed.model.FeedList
});
var msignal = {};
msignal.Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal.SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal.Signal;
msignal.Signal.__name__ = ["msignal","Signal"];
msignal.Signal.prototype = {
	valueClasses: null
	,numListeners: null
	,slots: null
	,priorityBased: null
	,add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal.SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw "You cannot addOnce() then add() the same listener without removing the relationship first.";
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal.Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
msignal.Signal0 = function() {
	msignal.Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal.Signal0;
msignal.Signal0.__name__ = ["msignal","Signal0"];
msignal.Signal0.__super__ = msignal.Signal;
msignal.Signal0.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot0(this,listener,once,priority);
	}
	,__class__: msignal.Signal0
});
f1feed.feed.signal = {};
f1feed.feed.signal.LoadFeedList = function() {
	msignal.Signal0.call(this);
	this.completed = new msignal.Signal1(f1feed.feed.model.FeedList);
	this.failed = new msignal.Signal1(Dynamic);
};
$hxClasses["f1feed.feed.signal.LoadFeedList"] = f1feed.feed.signal.LoadFeedList;
f1feed.feed.signal.LoadFeedList.__name__ = ["f1feed","feed","signal","LoadFeedList"];
f1feed.feed.signal.LoadFeedList.__super__ = msignal.Signal0;
f1feed.feed.signal.LoadFeedList.prototype = $extend(msignal.Signal0.prototype,{
	completed: null
	,failed: null
	,__class__: f1feed.feed.signal.LoadFeedList
});
f1feed.feed.view = {};
f1feed.feed.view.FeedListView = function(data) {
	this.tagName = "ul";
	f1feed.core.DataView.call(this,data);
};
$hxClasses["f1feed.feed.view.FeedListView"] = f1feed.feed.view.FeedListView;
f1feed.feed.view.FeedListView.__name__ = ["f1feed","feed","view","FeedListView"];
f1feed.feed.view.FeedListView.__super__ = f1feed.core.DataView;
f1feed.feed.view.FeedListView.prototype = $extend(f1feed.core.DataView.prototype,{
	showError: function(message) {
		console.log("<<Here's an error in the feed list view>>");
	}
	,dataChanged: function() {
		f1feed.core.DataView.prototype.dataChanged.call(this);
		console.log("<<Data Changed>>");
		console.log(this.data);
	}
	,__class__: f1feed.feed.view.FeedListView
});
f1feed.feed.view.FeedListViewMediator = function() {
	mmvc.impl.Mediator.call(this);
};
$hxClasses["f1feed.feed.view.FeedListViewMediator"] = f1feed.feed.view.FeedListViewMediator;
f1feed.feed.view.FeedListViewMediator.__name__ = ["f1feed","feed","view","FeedListViewMediator"];
f1feed.feed.view.FeedListViewMediator.__super__ = mmvc.impl.Mediator;
f1feed.feed.view.FeedListViewMediator.prototype = $extend(mmvc.impl.Mediator.prototype,{
	loadFeedList: null
	,list: null
	,onRegister: function() {
		this.mediate(this.loadFeedList.completed.addOnce($bind(this,this.loadCompleted)));
		this.mediate(this.loadFeedList.failed.addOnce($bind(this,this.loadFailed)));
		this.loadFeedList.dispatch();
	}
	,onRemove: function() {
		mmvc.impl.Mediator.prototype.onRemove.call(this);
	}
	,loadCompleted: function(list) {
		this.list = list;
		this.view.setData(list);
	}
	,loadFailed: function(error) {
		this.view.showError(Std.string(error));
	}
	,__class__: f1feed.feed.view.FeedListViewMediator
});
var haxe = {};
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	url: null
	,responseData: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,setHeader: function(header,value) {
		this.headers = Lambda.filter(this.headers,function(h) {
			return h.header != header;
		});
		this.headers.push({ header : header, value : value});
		return this;
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,req: null
	,cancel: function() {
		if(this.req == null) return;
		this.req.abort();
		this.req = null;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.rtti = {};
haxe.rtti.Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var mcore = {};
mcore.exception = {};
mcore.exception.Exception = function(message,cause,info) {
	if(message == null) message = "";
	this.name = Type.getClassName(Type.getClass(this));
	this.message = message;
	this.cause = cause;
	this.info = info;
	this.stackTrace = this.createStackTrace();
};
$hxClasses["mcore.exception.Exception"] = mcore.exception.Exception;
mcore.exception.Exception.__name__ = ["mcore","exception","Exception"];
mcore.exception.Exception.getStackTrace = function(source) {
	if(js.Boot.__instanceof(source,mcore.exception.Exception)) return source.stackTrace;
	if(source != null && source.stack != null) return source.stack; else return Std.string(source);
	var s = "";
	var stack = haxe.CallStack.exceptionStack();
	while(stack.length > 0) {
		var _g = stack.shift();
		switch(_g[1]) {
		case 2:
			var line = _g[4];
			var file = _g[3];
			s += "\tat " + file + " (" + line + ")\n";
			break;
		case 3:
			var method = _g[3];
			var classname = _g[2];
			s += "\tat " + classname + "#" + method + "\n";
			break;
		default:
		}
	}
	return s;
};
mcore.exception.Exception.prototype = {
	name: null
	,get_name: function() {
		return this.name;
	}
	,message: null
	,get_message: function() {
		return this.message;
	}
	,stackTrace: null
	,cause: null
	,info: null
	,createStackTrace: function() {
		var stack = new Error(this.get_message()).stack;
		if(stack != null) {
			var pos = stack.indexOf("\n") + 1;
			stack = HxOverrides.substr(stack,pos,null);
			if(typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
				var pos1 = stack.indexOf("\n") + 1;
				stack = HxOverrides.substr(stack,pos1,null);
			}
		} else stack = "";
		return stack;
	}
	,toString: function() {
		var str = this.get_name() + ": " + this.get_message();
		if(this.info != null) str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
		if(this.cause != null) str += "\n\t Caused by: " + mcore.exception.Exception.getStackTrace(this.cause);
		return str;
	}
	,__class__: mcore.exception.Exception
	,__properties__: {get_message:"get_message",get_name:"get_name"}
};
mcore.exception.ArgumentException = function(message,cause,info) {
	if(message == null) message = "";
	mcore.exception.Exception.call(this,message,cause,info);
};
$hxClasses["mcore.exception.ArgumentException"] = mcore.exception.ArgumentException;
mcore.exception.ArgumentException.__name__ = ["mcore","exception","ArgumentException"];
mcore.exception.ArgumentException.__super__ = mcore.exception.Exception;
mcore.exception.ArgumentException.prototype = $extend(mcore.exception.Exception.prototype,{
	__class__: mcore.exception.ArgumentException
});
mcore.exception.RangeException = function(message,cause,info) {
	if(message == null) message = "";
	mcore.exception.Exception.call(this,message,cause,info);
};
$hxClasses["mcore.exception.RangeException"] = mcore.exception.RangeException;
mcore.exception.RangeException.__name__ = ["mcore","exception","RangeException"];
mcore.exception.RangeException.numeric = function(breach,min,max) {
	return new mcore.exception.RangeException(breach + " was not within range " + min + ".." + max,null,{ fileName : "RangeException.hx", lineNumber : 44, className : "mcore.exception.RangeException", methodName : "numeric"});
};
mcore.exception.RangeException.__super__ = mcore.exception.Exception;
mcore.exception.RangeException.prototype = $extend(mcore.exception.Exception.prototype,{
	__class__: mcore.exception.RangeException
});
mcore.util = {};
mcore.util.Arrays = function() { };
$hxClasses["mcore.util.Arrays"] = mcore.util.Arrays;
mcore.util.Arrays.__name__ = ["mcore","util","Arrays"];
mcore.util.Arrays.toString = function(source) {
	return source.toString();
};
mcore.util.Arrays.shuffle = function(source) {
	var copy = source.slice();
	var shuffled = [];
	while(copy.length > 0) shuffled.push(copy.splice(Std.random(copy.length),1)[0]);
	return shuffled;
};
mcore.util.Arrays.lastItem = function(source) {
	return source[source.length - 1];
};
mcore.util.Iterables = function() { };
$hxClasses["mcore.util.Iterables"] = mcore.util.Iterables;
mcore.util.Iterables.__name__ = ["mcore","util","Iterables"];
mcore.util.Iterables.contains = function(iterable,value) {
	return mcore.util.Iterables.indexOf(iterable,value) != -1;
};
mcore.util.Iterables.indexOf = function(iterable,value) {
	var i = 0;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(member == value) return i;
		i++;
	}
	return -1;
};
mcore.util.Iterables.find = function(iterable,predicate) {
	var item = null;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(predicate(member)) {
			item = member;
			break;
		}
	}
	return item;
};
mcore.util.Iterables.filter = function(iterable,predicate) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(predicate(member)) items.push(member);
	}
	return items;
};
mcore.util.Iterables.concat = function(iterableA,iterableB) {
	var items = [];
	var _g = 0;
	var _g1 = [iterableA,iterableB];
	while(_g < _g1.length) {
		var iterable = _g1[_g];
		++_g;
		var $it0 = $iterator(iterable)();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			items.push(item);
		}
	}
	return items;
};
mcore.util.Iterables.map = function(iterable,selector) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		items.push(selector(item));
	}
	return items;
};
mcore.util.Iterables.mapWithIndex = function(iterable,selector) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		items.push(selector(item,items.length));
	}
	return items;
};
mcore.util.Iterables.fold = function(iterable,aggregator,seed) {
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		seed = aggregator(member,seed);
	}
	return seed;
};
mcore.util.Iterables.foldRight = function(iterable,aggregator,seed) {
	return mcore.util.Iterables.fold(mcore.util.Iterables.reverse(iterable),aggregator,seed);
};
mcore.util.Iterables.reverse = function(iterable) {
	var items = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		items.unshift(member);
	}
	return items;
};
mcore.util.Iterables.isEmpty = function(iterable) {
	return !$iterator(iterable)().hasNext();
};
mcore.util.Iterables.toArray = function(iterable) {
	var result = [];
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		result.push(member);
	}
	return result;
};
mcore.util.Iterables.size = function(iterable) {
	var i = 0;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		i++;
	}
	return i;
};
mcore.util.Iterables.count = function(iterable,predicate) {
	var i = 0;
	var $it0 = $iterator(iterable)();
	while( $it0.hasNext() ) {
		var member = $it0.next();
		if(predicate(member)) i++;
	}
	return i;
};
mcore.util.Reflection = function() { };
$hxClasses["mcore.util.Reflection"] = mcore.util.Reflection;
mcore.util.Reflection.__name__ = ["mcore","util","Reflection"];
mcore.util.Reflection.setProperty = function(object,property,value) {
	Reflect.setProperty(object,property,value);
	return value;
};
mcore.util.Reflection.hasProperty = function(object,property) {
	var properties = Type.getInstanceFields(Type.getClass(object));
	return Lambda.has(properties,property);
};
mcore.util.Reflection.getFields = function(object) {
	{
		var _g = Type["typeof"](object);
		switch(_g[1]) {
		case 6:
			var c = _g[2];
			return Type.getInstanceFields(c);
		default:
			return Reflect.fields(object);
		}
	}
};
mcore.util.Reflection.here = function(info) {
	return info;
};
mcore.util.Reflection.callMethod = function(o,func,args) {
	if(args == null) args = [];
	try {
		return func.apply(o,args);
	} catch( e ) {
		throw new mcore.exception.Exception("Error calling method " + Type.getClassName(Type.getClass(o)) + "." + Std.string(func) + "(" + args.toString() + ")",e,{ fileName : "Reflection.hx", lineNumber : 111, className : "mcore.util.Reflection", methodName : "callMethod"});
	}
};
mcore.util.Types = function() { };
$hxClasses["mcore.util.Types"] = mcore.util.Types;
mcore.util.Types.__name__ = ["mcore","util","Types"];
mcore.util.Types.isSubClassOf = function(object,type) {
	return js.Boot.__instanceof(object,type) && Type.getClass(object) != type;
};
mcore.util.Types.createInstance = function(forClass,args) {
	if(args == null) args = [];
	try {
		return Type.createInstance(forClass,args);
	} catch( e ) {
		throw new mcore.exception.Exception("Error creating instance of " + Type.getClassName(forClass) + "(" + args.toString() + ")",e,{ fileName : "Types.hx", lineNumber : 65, className : "mcore.util.Types", methodName : "createInstance"});
	}
};
mdata.CollectionEventType = { __ename__ : true, __constructs__ : ["Add","Remove","Replace"] };
mdata.CollectionEventType.Add = function(items) { var $x = ["Add",0,items]; $x.__enum__ = mdata.CollectionEventType; $x.toString = $estr; return $x; };
mdata.CollectionEventType.Remove = function(items) { var $x = ["Remove",1,items]; $x.__enum__ = mdata.CollectionEventType; $x.toString = $estr; return $x; };
mdata.CollectionEventType.Replace = function(items) { var $x = ["Replace",2,items]; $x.__enum__ = mdata.CollectionEventType; $x.toString = $estr; return $x; };
mdata.Dictionary = function(weakKeys) {
	if(weakKeys == null) weakKeys = false;
	this.weakKeys = weakKeys;
	this.clear();
};
$hxClasses["mdata.Dictionary"] = mdata.Dictionary;
mdata.Dictionary.__name__ = ["mdata","Dictionary"];
mdata.Dictionary.prototype = {
	_keys: null
	,_values: null
	,weakKeys: null
	,set: function(key,value) {
		var _g1 = 0;
		var _g = this._keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._keys[i] == key) {
				this._keys[i] = key;
				this._values[i] = value;
				return;
			}
		}
		this._keys.push(key);
		this._values.push(value);
	}
	,get: function(key) {
		var _g1 = 0;
		var _g = this._keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._keys[i] == key) return this._values[i];
		}
		return null;
	}
	,remove: function(key) {
		var _g1 = 0;
		var _g = this._keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._keys[i] == key) {
				this._keys.splice(i,1);
				this._values.splice(i,1);
				return true;
			}
		}
		return false;
	}
	,'delete': function(key) {
		this.remove(key);
	}
	,exists: function(key) {
		var _g = 0;
		var _g1 = this._keys;
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			if(k == key) return true;
		}
		return false;
	}
	,clear: function() {
		this._keys = [];
		this._values = [];
	}
	,keys: function() {
		return HxOverrides.iter(this._keys);
	}
	,iterator: function() {
		return HxOverrides.iter(this._values);
	}
	,toString: function() {
		var s = "{";
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var value = this.get(key);
			var k;
			if((key instanceof Array) && key.__enum__ == null) k = "[" + key.toString() + "]"; else k = Std.string(key);
			var v;
			if((value instanceof Array) && value.__enum__ == null) v = "[" + value.toString() + "]"; else v = Std.string(value);
			s += k + " => " + v + ", ";
		}
		if(s.length > 2) s = HxOverrides.substr(s,0,s.length - 2);
		return s + "}";
	}
	,__class__: mdata.Dictionary
};
mdata.ChangeLocation = { __ename__ : true, __constructs__ : ["Range","Indices"] };
mdata.ChangeLocation.Range = function(start,end) { var $x = ["Range",0,start,end]; $x.__enum__ = mdata.ChangeLocation; $x.toString = $estr; return $x; };
mdata.ChangeLocation.Indices = function(i) { var $x = ["Indices",1,i]; $x.__enum__ = mdata.ChangeLocation; $x.toString = $estr; return $x; };
msignal.Event = function(type) {
	this.type = type;
};
$hxClasses["msignal.Event"] = msignal.Event;
msignal.Event.__name__ = ["msignal","Event"];
msignal.Event.prototype = {
	signal: null
	,target: null
	,type: null
	,currentTarget: null
	,__class__: msignal.Event
};
mdata.ListEvent = function(type,location) {
	msignal.Event.call(this,type);
	this.location = location;
};
$hxClasses["mdata.ListEvent"] = mdata.ListEvent;
mdata.ListEvent.__name__ = ["mdata","ListEvent"];
mdata.ListEvent.__super__ = msignal.Event;
mdata.ListEvent.prototype = $extend(msignal.Event.prototype,{
	location: null
	,__class__: mdata.ListEvent
});
var minject = {};
minject.InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject.InjectionConfig;
minject.InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject.InjectionConfig.prototype = {
	request: null
	,injectionName: null
	,injector: null
	,result: null
	,getResponse: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.result != null) return this.result.getResponse(injector);
		var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
		if(parentConfig != null) return parentConfig.getResponse(injector);
		return null;
	}
	,hasResponse: function(injector) {
		return this.result != null;
	}
	,hasOwnResponse: function() {
		return this.result != null;
	}
	,setResult: function(result) {
		if(this.result != null && result != null) console.log("Warning: Injector contains " + Std.string(this) + "." + "\nAttempting to overwrite this with mapping for [" + Std.string(result) + "]." + "\nIf you have overwritten this mapping intentionally " + "you can use \"injector.unmap()\" prior to your replacement " + "mapping in order to avoid seeing this message.");
		this.result = result;
	}
	,setInjector: function(injector) {
		this.injector = injector;
	}
	,toString: function() {
		var named;
		if(this.injectionName != null && this.injectionName != "") named = " named \"" + this.injectionName + "\" and"; else named = "";
		return "rule: [" + Type.getClassName(this.request) + "]" + named + " mapped to [" + Std.string(this.result) + "]";
	}
	,__class__: minject.InjectionConfig
};
minject.Injector = function() {
	this.injectionConfigs = new haxe.ds.StringMap();
	this.injecteeDescriptions = new minject.ClassHash();
	this.attendedToInjectees = new minject._Injector.InjecteeSet();
};
$hxClasses["minject.Injector"] = minject.Injector;
minject.Injector.__name__ = ["minject","Injector"];
minject.Injector.prototype = {
	attendedToInjectees: null
	,parentInjector: null
	,injectionConfigs: null
	,injecteeDescriptions: null
	,mapValue: function(whenAskedFor,useValue,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject.result.InjectValueResult(useValue));
		return config;
	}
	,mapClass: function(whenAskedFor,instantiateClass,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject.result.InjectClassResult(instantiateClass));
		return config;
	}
	,mapSingleton: function(whenAskedFor,named) {
		if(named == null) named = "";
		return this.mapSingletonOf(whenAskedFor,whenAskedFor,named);
	}
	,mapSingletonOf: function(whenAskedFor,useSingletonOf,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject.result.InjectSingletonResult(useSingletonOf));
		return config;
	}
	,mapRule: function(whenAskedFor,useRule,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject.result.InjectOtherRuleResult(useRule));
		return useRule;
	}
	,getMapping: function(forClass,named) {
		if(named == null) named = "";
		var requestName = this.getClassName(forClass) + "#" + named;
		if(this.injectionConfigs.exists(requestName)) return this.injectionConfigs.get(requestName);
		var config = new minject.InjectionConfig(forClass,named);
		this.injectionConfigs.set(requestName,config);
		return config;
	}
	,injectInto: function(target) {
		if(this.attendedToInjectees.contains(target)) return;
		this.attendedToInjectees.add(target);
		var targetClass = Type.getClass(target);
		var injecteeDescription = null;
		if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
		if(injecteeDescription == null) return;
		var injectionPoints = injecteeDescription.injectionPoints;
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var injectionPoint = injectionPoints[i];
			injectionPoint.applyInjection(target,this);
		}
	}
	,construct: function(theClass) {
		var injecteeDescription;
		if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
		var injectionPoint = injecteeDescription.ctor;
		return injectionPoint.applyInjection(theClass,this);
	}
	,instantiate: function(theClass) {
		var instance = this.construct(theClass);
		this.injectInto(instance);
		return instance;
	}
	,unmap: function(theClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(theClass,named);
		if(mapping == null) throw "Error while removing an injector mapping: No mapping defined for class " + this.getClassName(theClass) + ", named \"" + named + "\"";
		mapping.setResult(null);
	}
	,hasMapping: function(forClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(forClass,named);
		if(mapping == null) return false;
		return mapping.hasResponse(this);
	}
	,getInstance: function(ofClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(ofClass,named);
		if(mapping == null || !mapping.hasResponse(this)) throw "Error while getting mapping response: No mapping defined for class " + this.getClassName(ofClass) + ", named \"" + named + "\"";
		return mapping.getResponse(this);
	}
	,createChildInjector: function() {
		var injector = new minject.Injector();
		injector.set_parentInjector(this);
		return injector;
	}
	,getAncestorMapping: function(forClass,named) {
		var parent = this.parentInjector;
		while(parent != null) {
			var parentConfig = parent.getConfigurationForRequest(forClass,named,false);
			if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
			parent = parent.parentInjector;
		}
		return null;
	}
	,getInjectionPoints: function(forClass) {
		var typeMeta = haxe.rtti.Meta.getType(forClass);
		if(typeMeta != null && Object.prototype.hasOwnProperty.call(typeMeta,"interface")) throw "Interfaces can't be used as instantiatable classes.";
		var fieldsMeta = this.getFields(forClass);
		var ctorInjectionPoint = null;
		var injectionPoints = [];
		var postConstructMethodPoints = [];
		var _g = 0;
		var _g1 = Reflect.fields(fieldsMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var fieldMeta = Reflect.field(fieldsMeta,field);
			var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
			var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
			var type = Reflect.field(fieldMeta,"type");
			var args = Reflect.field(fieldMeta,"args");
			if(field == "_") {
				if(args.length > 0) ctorInjectionPoint = new minject.point.ConstructorInjectionPoint(fieldMeta,forClass,this);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var injectionPoint = new minject.point.MethodInjectionPoint(fieldMeta,this);
					injectionPoints.push(injectionPoint);
				} else if(post) {
					var injectionPoint1 = new minject.point.PostConstructInjectionPoint(fieldMeta,this);
					postConstructMethodPoints.push(injectionPoint1);
				}
			} else if(type != null) {
				var injectionPoint2 = new minject.point.PropertyInjectionPoint(fieldMeta,this);
				injectionPoints.push(injectionPoint2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point);
			}
		}
		if(ctorInjectionPoint == null) ctorInjectionPoint = new minject.point.NoParamsConstructorInjectionPoint();
		var injecteeDescription = new minject.InjecteeDescription(ctorInjectionPoint,injectionPoints);
		this.injecteeDescriptions.set(forClass,injecteeDescription);
		return injecteeDescription;
	}
	,getConfigurationForRequest: function(forClass,named,traverseAncestors) {
		if(traverseAncestors == null) traverseAncestors = true;
		var requestName = this.getClassName(forClass) + "#" + named;
		if(!this.injectionConfigs.exists(requestName)) {
			if(traverseAncestors && this.parentInjector != null && this.parentInjector.hasMapping(forClass,named)) return this.getAncestorMapping(forClass,named);
			return null;
		}
		return this.injectionConfigs.get(requestName);
	}
	,set_parentInjector: function(value) {
		if(this.parentInjector != null && value == null) this.attendedToInjectees = new minject._Injector.InjecteeSet();
		this.parentInjector = value;
		if(this.parentInjector != null) this.attendedToInjectees = this.parentInjector.attendedToInjectees;
		return this.parentInjector;
	}
	,getClassName: function(forClass) {
		if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
	}
	,getFields: function(type) {
		var meta = { };
		while(type != null) {
			var typeMeta = haxe.rtti.Meta.getFields(type);
			var _g = 0;
			var _g1 = Reflect.fields(typeMeta);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				Reflect.setField(meta,field,Reflect.field(typeMeta,field));
			}
			type = Type.getSuperClass(type);
		}
		return meta;
	}
	,__class__: minject.Injector
	,__properties__: {set_parentInjector:"set_parentInjector"}
};
minject._Injector = {};
minject._Injector.InjecteeSet = function() {
};
$hxClasses["minject._Injector.InjecteeSet"] = minject._Injector.InjecteeSet;
minject._Injector.InjecteeSet.__name__ = ["minject","_Injector","InjecteeSet"];
minject._Injector.InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,'delete': function(value) {
		Reflect.deleteField(value,"__injected__");
	}
	,iterator: function() {
		return HxOverrides.iter([]);
	}
	,__class__: minject._Injector.InjecteeSet
};
minject.ClassHash = function() {
	this.hash = new haxe.ds.StringMap();
};
$hxClasses["minject.ClassHash"] = minject.ClassHash;
minject.ClassHash.__name__ = ["minject","ClassHash"];
minject.ClassHash.prototype = {
	hash: null
	,set: function(key,value) {
		this.hash.set(Type.getClassName(key),value);
	}
	,get: function(key) {
		return this.hash.get(Type.getClassName(key));
	}
	,exists: function(key) {
		return this.hash.exists(Type.getClassName(key));
	}
	,__class__: minject.ClassHash
};
minject.InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject.InjecteeDescription;
minject.InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject.InjecteeDescription.prototype = {
	ctor: null
	,injectionPoints: null
	,__class__: minject.InjecteeDescription
};
minject.Reflector = function() {
};
$hxClasses["minject.Reflector"] = minject.Reflector;
minject.Reflector.__name__ = ["minject","Reflector"];
minject.Reflector.prototype = {
	classExtendsOrImplements: function(classOrClassName,superClass) {
		var actualClass = null;
		if(js.Boot.__instanceof(classOrClassName,Class)) actualClass = js.Boot.__cast(classOrClassName , Class); else if(typeof(classOrClassName) == "string") try {
			actualClass = Type.resolveClass(js.Boot.__cast(classOrClassName , String));
		} catch( e ) {
			throw "The class name " + Std.string(classOrClassName) + " is not valid because of " + Std.string(e) + "\n" + Std.string(e.getStackTrace());
		}
		if(actualClass == null) throw "The parameter classOrClassName must be a Class or fully qualified class name.";
		var classInstance = Type.createEmptyInstance(actualClass);
		return js.Boot.__instanceof(classInstance,superClass);
	}
	,getClass: function(value) {
		if(js.Boot.__instanceof(value,Class)) return value;
		return Type.getClass(value);
	}
	,getFQCN: function(value) {
		var fqcn;
		if(typeof(value) == "string") return js.Boot.__cast(value , String);
		return Type.getClassName(value);
	}
	,__class__: minject.Reflector
};
minject.point = {};
minject.point.InjectionPoint = function(meta,injector) {
	this.initializeInjection(meta);
};
$hxClasses["minject.point.InjectionPoint"] = minject.point.InjectionPoint;
minject.point.InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject.point.InjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return target;
	}
	,initializeInjection: function(meta) {
	}
	,__class__: minject.point.InjectionPoint
};
minject.point.MethodInjectionPoint = function(meta,injector) {
	this.requiredParameters = 0;
	minject.point.InjectionPoint.call(this,meta,injector);
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject.point.MethodInjectionPoint;
minject.point.MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject.point.MethodInjectionPoint.__super__ = minject.point.InjectionPoint;
minject.point.MethodInjectionPoint.prototype = $extend(minject.point.InjectionPoint.prototype,{
	methodName: null
	,_parameterInjectionConfigs: null
	,requiredParameters: null
	,applyInjection: function(target,injector) {
		var parameters = this.gatherParameterValues(target,injector);
		var method = Reflect.field(target,this.methodName);
		mcore.util.Reflection.callMethod(target,method,parameters);
		return target;
	}
	,initializeInjection: function(meta) {
		this.methodName = meta.name[0];
		this.gatherParameters(meta);
	}
	,gatherParameters: function(meta) {
		var nameArgs = meta.inject;
		var args = meta.args;
		if(nameArgs == null) nameArgs = [];
		this._parameterInjectionConfigs = [];
		var i = 0;
		var _g = 0;
		while(_g < args.length) {
			var arg = args[_g];
			++_g;
			var injectionName = "";
			if(i < nameArgs.length) injectionName = nameArgs[i];
			var parameterTypeName = arg.type;
			if(arg.opt) {
				if(parameterTypeName == "Dynamic") throw "Error in method definition of injectee. Required parameters can't have non class type.";
			} else this.requiredParameters++;
			this._parameterInjectionConfigs.push(new minject.point.ParameterInjectionConfig(parameterTypeName,injectionName));
			i++;
		}
	}
	,gatherParameterValues: function(target,injector) {
		var parameters = [];
		var length = this._parameterInjectionConfigs.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var parameterConfig = this._parameterInjectionConfigs[i];
			var config = injector.getMapping(Type.resolveClass(parameterConfig.typeName),parameterConfig.injectionName);
			var injection = config.getResponse(injector);
			if(injection == null) {
				if(i >= this.requiredParameters) break;
				throw "Injector is missing a rule to handle injection into target " + Type.getClassName(Type.getClass(target)) + ". Target dependency: " + Type.getClassName(config.request) + ", method: " + this.methodName + ", parameter: " + (i + 1) + ", named: " + parameterConfig.injectionName;
			}
			parameters[i] = injection;
		}
		return parameters;
	}
	,__class__: minject.point.MethodInjectionPoint
});
minject.point.ConstructorInjectionPoint = function(meta,forClass,injector) {
	minject.point.MethodInjectionPoint.call(this,meta,injector);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject.point.ConstructorInjectionPoint;
minject.point.ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject.point.ConstructorInjectionPoint.__super__ = minject.point.MethodInjectionPoint;
minject.point.ConstructorInjectionPoint.prototype = $extend(minject.point.MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		var ofClass = target;
		var withArgs = this.gatherParameterValues(target,injector);
		return mcore.util.Types.createInstance(ofClass,withArgs);
	}
	,initializeInjection: function(meta) {
		this.methodName = "new";
		this.gatherParameters(meta);
	}
	,__class__: minject.point.ConstructorInjectionPoint
});
minject.point.ParameterInjectionConfig = function(typeName,injectionName) {
	this.typeName = typeName;
	this.injectionName = injectionName;
};
$hxClasses["minject.point.ParameterInjectionConfig"] = minject.point.ParameterInjectionConfig;
minject.point.ParameterInjectionConfig.__name__ = ["minject","point","ParameterInjectionConfig"];
minject.point.ParameterInjectionConfig.prototype = {
	typeName: null
	,injectionName: null
	,__class__: minject.point.ParameterInjectionConfig
};
minject.point.NoParamsConstructorInjectionPoint = function() {
	minject.point.InjectionPoint.call(this,null,null);
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject.point.NoParamsConstructorInjectionPoint;
minject.point.NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject.point.NoParamsConstructorInjectionPoint.__super__ = minject.point.InjectionPoint;
minject.point.NoParamsConstructorInjectionPoint.prototype = $extend(minject.point.InjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return mcore.util.Types.createInstance(target,[]);
	}
	,__class__: minject.point.NoParamsConstructorInjectionPoint
});
minject.point.PostConstructInjectionPoint = function(meta,injector) {
	this.order = 0;
	minject.point.InjectionPoint.call(this,meta,injector);
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject.point.PostConstructInjectionPoint;
minject.point.PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject.point.PostConstructInjectionPoint.__super__ = minject.point.InjectionPoint;
minject.point.PostConstructInjectionPoint.prototype = $extend(minject.point.InjectionPoint.prototype,{
	order: null
	,methodName: null
	,applyInjection: function(target,injector) {
		mcore.util.Reflection.callMethod(target,Reflect.field(target,this.methodName),[]);
		return target;
	}
	,initializeInjection: function(meta) {
		this.methodName = meta.name[0];
		if(meta.post != null) this.order = meta.post[0];
	}
	,__class__: minject.point.PostConstructInjectionPoint
});
minject.point.PropertyInjectionPoint = function(meta,injector) {
	minject.point.InjectionPoint.call(this,meta,null);
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject.point.PropertyInjectionPoint;
minject.point.PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject.point.PropertyInjectionPoint.__super__ = minject.point.InjectionPoint;
minject.point.PropertyInjectionPoint.prototype = $extend(minject.point.InjectionPoint.prototype,{
	propertyName: null
	,propertyType: null
	,injectionName: null
	,applyInjection: function(target,injector) {
		var injectionConfig = injector.getMapping(Type.resolveClass(this.propertyType),this.injectionName);
		var injection = injectionConfig.getResponse(injector);
		if(injection == null) throw "Injector is missing a rule to handle injection into property \"" + this.propertyName + "\" of object \"" + Std.string(target) + "\". Target dependency: \"" + this.propertyType + "\", named \"" + this.injectionName + "\"";
		Reflect.setProperty(target,this.propertyName,injection);
		return target;
	}
	,initializeInjection: function(meta) {
		this.propertyType = meta.type[0];
		this.propertyName = meta.name[0];
		if(meta.inject == null) this.injectionName = ""; else this.injectionName = meta.inject[0];
	}
	,__class__: minject.point.PropertyInjectionPoint
});
minject.result = {};
minject.result.InjectionResult = function() {
};
$hxClasses["minject.result.InjectionResult"] = minject.result.InjectionResult;
minject.result.InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject.result.InjectionResult.prototype = {
	getResponse: function(injector) {
		return null;
	}
	,toString: function() {
		return "";
	}
	,__class__: minject.result.InjectionResult
};
minject.result.InjectClassResult = function(responseType) {
	minject.result.InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectClassResult"] = minject.result.InjectClassResult;
minject.result.InjectClassResult.__name__ = ["minject","result","InjectClassResult"];
minject.result.InjectClassResult.__super__ = minject.result.InjectionResult;
minject.result.InjectClassResult.prototype = $extend(minject.result.InjectionResult.prototype,{
	responseType: null
	,getResponse: function(injector) {
		return injector.instantiate(this.responseType);
	}
	,toString: function() {
		return "class " + Type.getClassName(this.responseType);
	}
	,__class__: minject.result.InjectClassResult
});
minject.result.InjectOtherRuleResult = function(rule) {
	minject.result.InjectionResult.call(this);
	this.rule = rule;
};
$hxClasses["minject.result.InjectOtherRuleResult"] = minject.result.InjectOtherRuleResult;
minject.result.InjectOtherRuleResult.__name__ = ["minject","result","InjectOtherRuleResult"];
minject.result.InjectOtherRuleResult.__super__ = minject.result.InjectionResult;
minject.result.InjectOtherRuleResult.prototype = $extend(minject.result.InjectionResult.prototype,{
	rule: null
	,getResponse: function(injector) {
		return this.rule.getResponse(injector);
	}
	,toString: function() {
		return this.rule.toString();
	}
	,__class__: minject.result.InjectOtherRuleResult
});
minject.result.InjectSingletonResult = function(responseType) {
	minject.result.InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectSingletonResult"] = minject.result.InjectSingletonResult;
minject.result.InjectSingletonResult.__name__ = ["minject","result","InjectSingletonResult"];
minject.result.InjectSingletonResult.__super__ = minject.result.InjectionResult;
minject.result.InjectSingletonResult.prototype = $extend(minject.result.InjectionResult.prototype,{
	responseType: null
	,response: null
	,getResponse: function(injector) {
		if(this.response == null) {
			this.response = this.createResponse(injector);
			injector.injectInto(this.response);
		}
		return this.response;
	}
	,createResponse: function(injector) {
		return injector.construct(this.responseType);
	}
	,toString: function() {
		return "singleton " + Type.getClassName(this.responseType);
	}
	,__class__: minject.result.InjectSingletonResult
});
minject.result.InjectValueResult = function(value) {
	minject.result.InjectionResult.call(this);
	this.value = value;
};
$hxClasses["minject.result.InjectValueResult"] = minject.result.InjectValueResult;
minject.result.InjectValueResult.__name__ = ["minject","result","InjectValueResult"];
minject.result.InjectValueResult.__super__ = minject.result.InjectionResult;
minject.result.InjectValueResult.prototype = $extend(minject.result.InjectionResult.prototype,{
	value: null
	,getResponse: function(injector) {
		return this.value;
	}
	,toString: function() {
		return "instance of " + Type.getClassName(Type.getClass(this.value));
	}
	,__class__: minject.result.InjectValueResult
});
var mloader = {};
mloader.Loader = function() { };
$hxClasses["mloader.Loader"] = mloader.Loader;
mloader.Loader.__name__ = ["mloader","Loader"];
mloader.Loader.prototype = {
	url: null
	,progress: null
	,content: null
	,loading: null
	,loaded: null
	,load: null
	,cancel: null
	,__class__: mloader.Loader
};
mloader.LoaderBase = function(url) {
	this.loaded = new msignal.EventSignal(this);
	this.set_url(this.sanitizeUrl(url));
	this.progress = 0;
	this.loading = false;
};
$hxClasses["mloader.LoaderBase"] = mloader.LoaderBase;
mloader.LoaderBase.__name__ = ["mloader","LoaderBase"];
mloader.LoaderBase.__interfaces__ = [mloader.Loader];
mloader.LoaderBase.prototype = {
	url: null
	,set_url: function(value) {
		if(value == this.url) return this.url;
		if(this.loading) this.cancel();
		return this.url = this.sanitizeUrl(value);
	}
	,content: null
	,loading: null
	,progress: null
	,loaded: null
	,load: function() {
		if(this.loading) return;
		if(this.url == null) throw "No url defined for Loader";
		this.loading = true;
		this.loaded.dispatchType(mloader.LoaderEventType.Start);
		this.loaderLoad();
	}
	,cancel: function() {
		if(!this.loading) return;
		this.loading = false;
		this.loaderCancel();
		this.progress = 0;
		this.content = null;
		this.loaded.dispatchType(mloader.LoaderEventType.Cancel);
	}
	,loaderLoad: function() {
		throw "missing implementation";
	}
	,loaderCancel: function() {
		throw "missing implementation";
	}
	,loaderComplete: function() {
		if(!this.loading) return;
		this.progress = 1;
		this.loading = false;
		this.loaded.dispatchType(mloader.LoaderEventType.Complete);
	}
	,loaderFail: function(error) {
		if(!this.loading) return;
		this.loading = false;
		this.loaded.dispatchType(mloader.LoaderEventType.Fail(error));
	}
	,sanitizeUrl: function(url) {
		var sanitized = url;
		return sanitized;
	}
	,__class__: mloader.LoaderBase
	,__properties__: {set_url:"set_url"}
};
mloader.HttpLoader = function(url,http) {
	mloader.LoaderBase.call(this,url);
	this.headers = new haxe.ds.StringMap();
	if(http == null) http = new haxe.Http("");
	this.http = http;
	http.onData = $bind(this,this.httpData);
	http.onError = $bind(this,this.httpError);
	http.onStatus = $bind(this,this.httpStatus);
};
$hxClasses["mloader.HttpLoader"] = mloader.HttpLoader;
mloader.HttpLoader.__name__ = ["mloader","HttpLoader"];
mloader.HttpLoader.__super__ = mloader.LoaderBase;
mloader.HttpLoader.prototype = $extend(mloader.LoaderBase.prototype,{
	http: null
	,headers: null
	,statusCode: null
	,send: function(data) {
		if(this.loading) this.cancel();
		if(this.url == null) throw "No url defined for Loader";
		this.loading = true;
		this.loaded.dispatchType(mloader.LoaderEventType.Start);
		var contentType = "application/octet-stream";
		if(js.Boot.__instanceof(data,Xml)) {
			data = Std.string(data);
			contentType = "application/xml";
		} else if(!(typeof(data) == "string")) {
			data = JSON.stringify(data);
			contentType = "application/json";
		} else if(typeof(data) == "string" && this.validateJSONdata(data)) contentType = "application/json";
		if(!this.headers.exists("Content-Type")) this.headers.set("Content-Type",contentType);
		this.httpConfigure();
		this.addHeaders();
		this.http.url = this.url;
		this.http.setPostData(data);
		try {
			this.http.request(true);
		} catch( e ) {
			this.loaderFail(mloader.LoaderErrorType.Security(Std.string(e)));
		}
	}
	,loaderLoad: function() {
		this.httpConfigure();
		this.addHeaders();
		this.http.url = this.url;
		try {
			this.http.request(false);
		} catch( e ) {
			this.loaderFail(mloader.LoaderErrorType.Security(Std.string(e)));
		}
	}
	,loaderCancel: function() {
		this.http.cancel();
	}
	,httpConfigure: function() {
	}
	,addHeaders: function() {
		var $it0 = this.headers.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			this.http.setHeader(name,this.headers.get(name));
		}
	}
	,httpData: function(data) {
		this.content = data;
		this.loaderComplete();
	}
	,httpStatus: function(status) {
		this.statusCode = status;
	}
	,httpError: function(error) {
		this.content = this.http.responseData;
		this.loaderFail(mloader.LoaderErrorType.IO(error));
	}
	,httpSecurityError: function(error) {
		this.loaderFail(mloader.LoaderErrorType.Security(error));
	}
	,validateJSONdata: function(data) {
		var isValid = true;
		try {
			JSON.parse(data);
		} catch( error ) {
			isValid = false;
		}
		return isValid;
	}
	,__class__: mloader.HttpLoader
});
mloader.JsonLoader = function(url,http) {
	mloader.HttpLoader.call(this,url,http);
};
$hxClasses["mloader.JsonLoader"] = mloader.JsonLoader;
mloader.JsonLoader.__name__ = ["mloader","JsonLoader"];
mloader.JsonLoader.__super__ = mloader.HttpLoader;
mloader.JsonLoader.prototype = $extend(mloader.HttpLoader.prototype,{
	parseData: null
	,httpData: function(data) {
		var raw = null;
		try {
			raw = JSON.parse(data);
		} catch( e ) {
			this.loaderFail(mloader.LoaderErrorType.Format(Std.string(e)));
			return;
		}
		if(this.parseData == null) {
			this.content = raw;
			this.loaderComplete();
			return;
		}
		try {
			this.content = this.parseData(raw);
			this.loaderComplete();
		} catch( $e0 ) {
			if( js.Boot.__instanceof($e0,mloader.LoaderErrorType) ) {
				var loaderError = $e0;
				this.loaderFail(loaderError);
				return;
			} else {
			var e1 = $e0;
			this.loaderFail(mloader.LoaderErrorType.Data(Std.string(e1),data));
			return;
			}
		}
	}
	,__class__: mloader.JsonLoader
});
mloader.LoaderEventType = { __ename__ : true, __constructs__ : ["Start","Cancel","Progress","Complete","Fail"] };
mloader.LoaderEventType.Start = ["Start",0];
mloader.LoaderEventType.Start.toString = $estr;
mloader.LoaderEventType.Start.__enum__ = mloader.LoaderEventType;
mloader.LoaderEventType.Cancel = ["Cancel",1];
mloader.LoaderEventType.Cancel.toString = $estr;
mloader.LoaderEventType.Cancel.__enum__ = mloader.LoaderEventType;
mloader.LoaderEventType.Progress = ["Progress",2];
mloader.LoaderEventType.Progress.toString = $estr;
mloader.LoaderEventType.Progress.__enum__ = mloader.LoaderEventType;
mloader.LoaderEventType.Complete = ["Complete",3];
mloader.LoaderEventType.Complete.toString = $estr;
mloader.LoaderEventType.Complete.__enum__ = mloader.LoaderEventType;
mloader.LoaderEventType.Fail = function(error) { var $x = ["Fail",4,error]; $x.__enum__ = mloader.LoaderEventType; $x.toString = $estr; return $x; };
mloader.LoaderErrorType = { __ename__ : true, __constructs__ : ["IO","Security","Format","Data"] };
mloader.LoaderErrorType.IO = function(info) { var $x = ["IO",0,info]; $x.__enum__ = mloader.LoaderErrorType; $x.toString = $estr; return $x; };
mloader.LoaderErrorType.Security = function(info) { var $x = ["Security",1,info]; $x.__enum__ = mloader.LoaderErrorType; $x.toString = $estr; return $x; };
mloader.LoaderErrorType.Format = function(info) { var $x = ["Format",2,info]; $x.__enum__ = mloader.LoaderErrorType; $x.toString = $estr; return $x; };
mloader.LoaderErrorType.Data = function(info,data) { var $x = ["Data",3,info,data]; $x.__enum__ = mloader.LoaderErrorType; $x.toString = $estr; return $x; };
mmvc.api.ICommandMap = function() { };
$hxClasses["mmvc.api.ICommandMap"] = mmvc.api.ICommandMap;
mmvc.api.ICommandMap.__name__ = ["mmvc","api","ICommandMap"];
mmvc.api.ICommandMap.prototype = {
	mapSignal: null
	,mapSignalClass: null
	,hasSignalCommand: null
	,unmapSignal: null
	,unmapSignalClass: null
	,detain: null
	,release: null
	,__class__: mmvc.api.ICommandMap
};
mmvc.api.IMediatorMap = function() { };
$hxClasses["mmvc.api.IMediatorMap"] = mmvc.api.IMediatorMap;
mmvc.api.IMediatorMap.__name__ = ["mmvc","api","IMediatorMap"];
mmvc.api.IMediatorMap.prototype = {
	mapView: null
	,unmapView: null
	,createMediator: null
	,registerMediator: null
	,removeMediator: null
	,removeMediatorByView: null
	,retrieveMediator: null
	,hasMapping: null
	,hasMediator: null
	,hasMediatorForView: null
	,contextView: null
	,enabled: null
	,__class__: mmvc.api.IMediatorMap
};
mmvc.api.IViewMap = function() { };
$hxClasses["mmvc.api.IViewMap"] = mmvc.api.IViewMap;
mmvc.api.IViewMap.__name__ = ["mmvc","api","IViewMap"];
mmvc.api.IViewMap.prototype = {
	mapPackage: null
	,unmapPackage: null
	,hasPackage: null
	,mapType: null
	,unmapType: null
	,hasType: null
	,contextView: null
	,enabled: null
	,__class__: mmvc.api.IViewMap
};
mmvc.base.CommandMap = function(injector) {
	this.injector = injector;
	this.signalMap = new mdata.Dictionary();
	this.signalClassMap = new mdata.Dictionary();
	this.detainedCommands = new mdata.Dictionary();
};
$hxClasses["mmvc.base.CommandMap"] = mmvc.base.CommandMap;
mmvc.base.CommandMap.__name__ = ["mmvc","base","CommandMap"];
mmvc.base.CommandMap.__interfaces__ = [mmvc.api.ICommandMap];
mmvc.base.CommandMap.prototype = {
	injector: null
	,signalMap: null
	,signalClassMap: null
	,detainedCommands: null
	,mapSignalClass: function(signalClass,commandClass,oneShot) {
		if(oneShot == null) oneShot = false;
		var signal = this.getSignalClassInstance(signalClass);
		this.mapSignal(signal,commandClass,oneShot);
		return signal;
	}
	,mapSignal: function(signal,commandClass,oneShot) {
		if(oneShot == null) oneShot = false;
		if(this.hasSignalCommand(signal,commandClass)) return;
		var signalCommandMap;
		if(this.signalMap.exists(signal)) signalCommandMap = this.signalMap.get(signal); else {
			signalCommandMap = new mdata.Dictionary(false);
			this.signalMap.set(signal,signalCommandMap);
		}
		var me = this;
		var callbackFunction = Reflect.makeVarArgs(function(args) {
			me.routeSignalToCommand(signal,args,commandClass,oneShot);
		});
		signalCommandMap.set(commandClass,callbackFunction);
		signal.add(callbackFunction);
	}
	,unmapSignalClass: function(signalClass,commandClass) {
		var signal = this.getSignalClassInstance(signalClass);
		this.unmapSignal(signal,commandClass);
		if(!this.hasCommand(signal)) {
			this.injector.unmap(signalClass);
			this.signalClassMap["delete"](signalClass);
		}
	}
	,unmapSignal: function(signal,commandClass) {
		var callbacksByCommandClass = this.signalMap.get(signal);
		if(callbacksByCommandClass == null) return;
		var callbackFunction = callbacksByCommandClass.get(commandClass);
		if(callbackFunction == null) return;
		if(!this.hasCommand(signal)) this.signalMap["delete"](signal);
		signal.remove(callbackFunction);
		callbacksByCommandClass["delete"](commandClass);
	}
	,getSignalClassInstance: function(signalClass) {
		if(this.signalClassMap.exists(signalClass)) return js.Boot.__cast(this.signalClassMap.get(signalClass) , msignal.Signal);
		return this.createSignalClassInstance(signalClass);
	}
	,createSignalClassInstance: function(signalClass) {
		var injectorForSignalInstance = this.injector;
		if(this.injector.hasMapping(minject.Injector)) injectorForSignalInstance = this.injector.getInstance(minject.Injector);
		var signal = injectorForSignalInstance.instantiate(signalClass);
		injectorForSignalInstance.mapValue(signalClass,signal);
		this.signalClassMap.set(signalClass,signal);
		return signal;
	}
	,hasCommand: function(signal) {
		var callbacksByCommandClass = this.signalMap.get(signal);
		if(callbacksByCommandClass == null) return false;
		var count = 0;
		var $it0 = callbacksByCommandClass.iterator();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			count++;
		}
		return count > 0;
	}
	,hasSignalCommand: function(signal,commandClass) {
		var callbacksByCommandClass = this.signalMap.get(signal);
		if(callbacksByCommandClass == null) return false;
		var callbackFunction = callbacksByCommandClass.get(commandClass);
		return callbackFunction != null;
	}
	,routeSignalToCommand: function(signal,valueObjects,commandClass,oneshot) {
		this.injector.mapValue(msignal.Signal,signal);
		this.mapSignalValues(signal.valueClasses,valueObjects);
		var command = this.createCommandInstance(commandClass);
		this.injector.unmap(msignal.Signal);
		this.unmapSignalValues(signal.valueClasses,valueObjects);
		command.execute();
		this.injector.attendedToInjectees["delete"](command);
		if(oneshot) this.unmapSignal(signal,commandClass);
	}
	,createCommandInstance: function(commandClass) {
		return this.injector.instantiate(commandClass);
	}
	,mapSignalValues: function(valueClasses,valueObjects) {
		var _g1 = 0;
		var _g = valueClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.injector.mapValue(valueClasses[i],valueObjects[i]);
		}
	}
	,unmapSignalValues: function(valueClasses,valueObjects) {
		var _g1 = 0;
		var _g = valueClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.injector.unmap(valueClasses[i]);
		}
	}
	,detain: function(command) {
		this.detainedCommands.set(command,true);
	}
	,release: function(command) {
		if(this.detainedCommands.exists(command)) this.detainedCommands["delete"](command);
	}
	,__class__: mmvc.base.CommandMap
};
mmvc.base.ContextError = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.id = id;
};
$hxClasses["mmvc.base.ContextError"] = mmvc.base.ContextError;
mmvc.base.ContextError.__name__ = ["mmvc","base","ContextError"];
mmvc.base.ContextError.prototype = {
	message: null
	,id: null
	,__class__: mmvc.base.ContextError
};
mmvc.base.ViewMapBase = function(contextView,injector) {
	this.viewListenerCount = 0;
	this.set_enabled(true);
	this.injector = injector;
	this.set_contextView(contextView);
};
$hxClasses["mmvc.base.ViewMapBase"] = mmvc.base.ViewMapBase;
mmvc.base.ViewMapBase.__name__ = ["mmvc","base","ViewMapBase"];
mmvc.base.ViewMapBase.prototype = {
	contextView: null
	,enabled: null
	,set_contextView: function(value) {
		if(value != this.contextView) {
			this.removeListeners();
			this.contextView = value;
			if(this.viewListenerCount > 0) this.addListeners();
		}
		return this.contextView;
	}
	,set_enabled: function(value) {
		if(value != this.enabled) {
			this.removeListeners();
			this.enabled = value;
			if(this.viewListenerCount > 0) this.addListeners();
		}
		return value;
	}
	,injector: null
	,viewListenerCount: null
	,addListeners: function() {
	}
	,removeListeners: function() {
	}
	,onViewAdded: function(view) {
	}
	,onViewRemoved: function(view) {
	}
	,__class__: mmvc.base.ViewMapBase
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
mmvc.base.MediatorMap = function(contextView,injector,reflector) {
	mmvc.base.ViewMapBase.call(this,contextView,injector);
	this.reflector = reflector;
	this.mediatorByView = new mdata.Dictionary(true);
	this.mappingConfigByView = new mdata.Dictionary(true);
	this.mappingConfigByViewClassName = new mdata.Dictionary();
	this.mediatorsMarkedForRemoval = new mdata.Dictionary();
	this.hasMediatorsMarkedForRemoval = false;
};
$hxClasses["mmvc.base.MediatorMap"] = mmvc.base.MediatorMap;
mmvc.base.MediatorMap.__name__ = ["mmvc","base","MediatorMap"];
mmvc.base.MediatorMap.__interfaces__ = [mmvc.api.IMediatorMap];
mmvc.base.MediatorMap.__super__ = mmvc.base.ViewMapBase;
mmvc.base.MediatorMap.prototype = $extend(mmvc.base.ViewMapBase.prototype,{
	mediatorByView: null
	,mappingConfigByView: null
	,mappingConfigByViewClassName: null
	,mediatorsMarkedForRemoval: null
	,hasMediatorsMarkedForRemoval: null
	,reflector: null
	,mapView: function(viewClassOrName,mediatorClass,injectViewAs,autoCreate,autoRemove) {
		if(autoRemove == null) autoRemove = true;
		if(autoCreate == null) autoCreate = true;
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		if(this.mappingConfigByViewClassName.get(viewClassName) != null) throw new mmvc.base.ContextError("Mediator Class has already been mapped to a View Class in this context - " + Std.string(mediatorClass));
		if(this.reflector.classExtendsOrImplements(mediatorClass,mmvc.api.IMediator) == false) throw new mmvc.base.ContextError("Mediator Class does not implement IMediator - " + Std.string(mediatorClass));
		var config = new mmvc.base.MappingConfig();
		config.mediatorClass = mediatorClass;
		config.autoCreate = autoCreate;
		config.autoRemove = autoRemove;
		if(injectViewAs) {
			if((injectViewAs instanceof Array) && injectViewAs.__enum__ == null) {
				var _this;
				_this = js.Boot.__cast(injectViewAs , Array);
				config.typedViewClasses = _this.slice();
			} else if(js.Boot.__instanceof(injectViewAs,Class)) config.typedViewClasses = [injectViewAs];
		} else if(js.Boot.__instanceof(viewClassOrName,Class)) config.typedViewClasses = [viewClassOrName];
		this.mappingConfigByViewClassName.set(viewClassName,config);
		if(autoCreate || autoRemove) {
			this.viewListenerCount++;
			if(this.viewListenerCount == 1) this.addListeners();
		}
		if(autoCreate && this.contextView != null && viewClassName == Type.getClassName(Type.getClass(this.contextView))) this.createMediatorUsing(this.contextView,viewClassName,config);
	}
	,unmapView: function(viewClassOrName) {
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null && (config.autoCreate || config.autoRemove)) {
			this.viewListenerCount--;
			if(this.viewListenerCount == 0) this.removeListeners();
		}
		this.mappingConfigByViewClassName["delete"](viewClassName);
	}
	,createMediator: function(viewComponent) {
		return this.createMediatorUsing(viewComponent);
	}
	,registerMediator: function(viewComponent,mediator) {
		this.mediatorByView.set(viewComponent,mediator);
		var mapping = this.mappingConfigByViewClassName.get(Type.getClassName(Type.getClass(viewComponent)));
		this.mappingConfigByView.set(viewComponent,mapping);
		mediator.setViewComponent(viewComponent);
		mediator.preRegister();
	}
	,removeMediator: function(mediator) {
		if(mediator != null) {
			var viewComponent = mediator.getViewComponent();
			this.mediatorByView["delete"](viewComponent);
			this.mappingConfigByView["delete"](viewComponent);
			mediator.preRemove();
			mediator.setViewComponent(null);
		}
		return mediator;
	}
	,removeMediatorByView: function(viewComponent) {
		var mediator = this.removeMediator(this.retrieveMediator(viewComponent));
		this.injector.attendedToInjectees["delete"](mediator);
		return mediator;
	}
	,retrieveMediator: function(viewComponent) {
		return this.mediatorByView.get(viewComponent);
	}
	,hasMapping: function(viewClassOrName) {
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		return this.mappingConfigByViewClassName.get(viewClassName) != null;
	}
	,hasMediatorForView: function(viewComponent) {
		return this.mediatorByView.get(viewComponent) != null;
	}
	,hasMediator: function(mediator) {
		var $it0 = this.mediatorByView.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			if(this.mediatorByView.get(key) == mediator) return true;
		}
		return false;
	}
	,addListeners: function() {
		if(this.contextView != null && this.enabled) {
			this.contextView.viewAdded = $bind(this,this.onViewAdded);
			this.contextView.viewRemoved = $bind(this,this.onViewRemoved);
		}
	}
	,removeListeners: function() {
		if(this.contextView != null) {
			this.contextView.viewAdded = null;
			this.contextView.viewRemoved = null;
		}
	}
	,onViewAdded: function(view) {
		if(this.mediatorsMarkedForRemoval.get(view) != null) {
			this.mediatorsMarkedForRemoval["delete"](view);
			return;
		}
		var viewClassName = Type.getClassName(Type.getClass(view));
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null && config.autoCreate) this.createMediatorUsing(view,viewClassName,config);
	}
	,onViewRemoved: function(view) {
		var config = this.mappingConfigByView.get(view);
		if(config != null && config.autoRemove) this.removeMediatorByView(view);
	}
	,removeMediatorLater: function() {
		var $it0 = this.mediatorsMarkedForRemoval.iterator();
		while( $it0.hasNext() ) {
			var view = $it0.next();
			if(!this.contextView.isAdded(view)) this.removeMediatorByView(view);
			this.mediatorsMarkedForRemoval["delete"](view);
		}
		this.hasMediatorsMarkedForRemoval = false;
	}
	,createMediatorUsing: function(viewComponent,viewClassName,config) {
		var mediator = this.mediatorByView.get(viewComponent);
		if(mediator == null) {
			if(viewClassName == null) viewClassName = Type.getClassName(Type.getClass(viewComponent));
			if(config == null) config = this.mappingConfigByViewClassName.get(viewClassName);
			if(config != null) {
				var _g = 0;
				var _g1 = config.typedViewClasses;
				while(_g < _g1.length) {
					var claxx = _g1[_g];
					++_g;
					this.injector.mapValue(claxx,viewComponent);
				}
				mediator = this.injector.instantiate(config.mediatorClass);
				var _g2 = 0;
				var _g11 = config.typedViewClasses;
				while(_g2 < _g11.length) {
					var clazz = _g11[_g2];
					++_g2;
					this.injector.unmap(clazz);
				}
				this.registerMediator(viewComponent,mediator);
			}
		}
		return mediator;
	}
	,__class__: mmvc.base.MediatorMap
});
mmvc.base.MappingConfig = function() {
};
$hxClasses["mmvc.base.MappingConfig"] = mmvc.base.MappingConfig;
mmvc.base.MappingConfig.__name__ = ["mmvc","base","MappingConfig"];
mmvc.base.MappingConfig.prototype = {
	mediatorClass: null
	,typedViewClasses: null
	,autoCreate: null
	,autoRemove: null
	,__class__: mmvc.base.MappingConfig
};
mmvc.base.ViewMap = function(contextView,injector) {
	mmvc.base.ViewMapBase.call(this,contextView,injector);
	this.mappedPackages = new Array();
	this.mappedTypes = new mdata.Dictionary();
	this.injectedViews = new mdata.Dictionary(true);
};
$hxClasses["mmvc.base.ViewMap"] = mmvc.base.ViewMap;
mmvc.base.ViewMap.__name__ = ["mmvc","base","ViewMap"];
mmvc.base.ViewMap.__interfaces__ = [mmvc.api.IViewMap];
mmvc.base.ViewMap.__super__ = mmvc.base.ViewMapBase;
mmvc.base.ViewMap.prototype = $extend(mmvc.base.ViewMapBase.prototype,{
	mapPackage: function(packageName) {
		if(!Lambda.has(this.mappedPackages,packageName)) {
			this.mappedPackages.push(packageName);
			this.viewListenerCount++;
			if(this.viewListenerCount == 1) this.addListeners();
		}
	}
	,unmapPackage: function(packageName) {
		var index = Lambda.indexOf(this.mappedPackages,packageName);
		if(index > -1) {
			this.mappedPackages.splice(index,1);
			this.viewListenerCount--;
			if(this.viewListenerCount == 0) this.removeListeners();
		}
	}
	,mapType: function(type) {
		if(this.mappedTypes.get(type) != null) return;
		this.mappedTypes.set(type,type);
		this.viewListenerCount++;
		if(this.viewListenerCount == 1) this.addListeners();
		if(this.contextView != null && js.Boot.__instanceof(this.contextView,type)) this.injectInto(this.contextView);
	}
	,unmapType: function(type) {
		var mapping = this.mappedTypes.get(type);
		this.mappedTypes["delete"](type);
		if(mapping != null) {
			this.viewListenerCount--;
			if(this.viewListenerCount == 0) this.removeListeners();
		}
	}
	,hasType: function(type) {
		return this.mappedTypes.get(type) != null;
	}
	,hasPackage: function(packageName) {
		return Lambda.has(this.mappedPackages,packageName);
	}
	,mappedPackages: null
	,mappedTypes: null
	,injectedViews: null
	,addListeners: function() {
		if(this.contextView != null && this.enabled) {
			this.contextView.viewAdded = $bind(this,this.onViewAdded);
			this.contextView.viewRemoved = $bind(this,this.onViewAdded);
		}
	}
	,removeListeners: function() {
		if(this.contextView != null) {
			this.contextView.viewAdded = null;
			this.contextView.viewRemoved = null;
		}
	}
	,onViewAdded: function(view) {
		if(this.injectedViews.get(view) != null) return;
		var $it0 = this.mappedTypes.iterator();
		while( $it0.hasNext() ) {
			var type = $it0.next();
			if(js.Boot.__instanceof(view,type)) {
				this.injectInto(view);
				return;
			}
		}
		var len = this.mappedPackages.length;
		if(len > 0) {
			var className = Type.getClassName(Type.getClass(view));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				var packageName = this.mappedPackages[i];
				if(className.indexOf(packageName) == 0) {
					this.injectInto(view);
					return;
				}
			}
		}
	}
	,onViewRemoved: function(view) {
	}
	,injectInto: function(view) {
		this.injector.injectInto(view);
		this.injectedViews.set(view,true);
	}
	,__class__: mmvc.base.ViewMap
});
msignal.EventSignal = function(target) {
	msignal.Signal.call(this,[msignal.Event]);
	this.target = target;
};
$hxClasses["msignal.EventSignal"] = msignal.EventSignal;
msignal.EventSignal.__name__ = ["msignal","EventSignal"];
msignal.EventSignal.__super__ = msignal.Signal;
msignal.EventSignal.prototype = $extend(msignal.Signal.prototype,{
	target: null
	,dispatch: function(event) {
		if(event.target == null) {
			event.target = this.target;
			event.signal = this;
		}
		event.currentTarget = this.target;
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(event);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,dispatchType: function(type) {
		this.dispatch(new msignal.Event(type));
	}
	,bubble: function(event) {
		this.dispatch(event);
		var currentTarget = this.target;
		while(currentTarget != null && Object.prototype.hasOwnProperty.call(currentTarget,"parent")) {
			currentTarget = Reflect.field(currentTarget,"parent");
			if(js.Boot.__instanceof(currentTarget,msignal.EventDispatcher)) {
				event.currentTarget = currentTarget;
				var dispatcher;
				dispatcher = js.Boot.__cast(currentTarget , msignal.EventDispatcher);
				if(!dispatcher.dispatchEvent(event)) break;
			}
		}
	}
	,bubbleType: function(type) {
		this.bubble(new msignal.Event(type));
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.EventSlot(this,listener,once,priority);
	}
	,__class__: msignal.EventSignal
});
msignal.Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal.Slot;
msignal.Slot.__name__ = ["msignal","Slot"];
msignal.Slot.prototype = {
	listener: null
	,once: null
	,priority: null
	,enabled: null
	,signal: null
	,remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw "listener cannot be null";
		return this.listener = value;
	}
	,__class__: msignal.Slot
	,__properties__: {set_listener:"set_listener"}
};
msignal.EventSlot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.EventSlot"] = msignal.EventSlot;
msignal.EventSlot.__name__ = ["msignal","EventSlot"];
msignal.EventSlot.typeEq = function(a,b) {
	if(a == b) return true;
	{
		var _g = Type["typeof"](a);
		switch(_g[1]) {
		case 7:
			return msignal.EventSlot.enumTypeEq(a,b);
		default:
			return false;
		}
	}
	return false;
};
msignal.EventSlot.enumTypeEq = function(a,b) {
	if(a == b) return true;
	if(Type.getEnum(a) != Type.getEnum(b)) return false;
	if(a[1] != b[1]) return false;
	var aParams = a.slice(2);
	if(aParams.length == 0) return true;
	var bParams = b.slice(2);
	var _g1 = 0;
	var _g = aParams.length;
	while(_g1 < _g) {
		var i = _g1++;
		var aParam = aParams[i];
		var bParam = bParams[i];
		if(aParam == null) continue;
		if(!msignal.EventSlot.typeEq(aParam,bParam)) return false;
	}
	return true;
};
msignal.EventSlot.__super__ = msignal.Slot;
msignal.EventSlot.prototype = $extend(msignal.Slot.prototype,{
	filterType: null
	,execute: function(value1) {
		if(!this.enabled) return;
		if(this.filterType != null && !msignal.EventSlot.typeEq(this.filterType,value1.type)) return;
		if(this.once) this.remove();
		this.listener(value1);
	}
	,forType: function(value) {
		this.filterType = value;
	}
	,__class__: msignal.EventSlot
});
msignal.EventDispatcher = function() { };
$hxClasses["msignal.EventDispatcher"] = msignal.EventDispatcher;
msignal.EventDispatcher.__name__ = ["msignal","EventDispatcher"];
msignal.EventDispatcher.prototype = {
	dispatchEvent: null
	,__class__: msignal.EventDispatcher
};
msignal.Signal1 = function(type) {
	msignal.Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal.Signal1;
msignal.Signal1.__name__ = ["msignal","Signal1"];
msignal.Signal1.__super__ = msignal.Signal;
msignal.Signal1.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot1(this,listener,once,priority);
	}
	,__class__: msignal.Signal1
});
msignal.Signal2 = function(type1,type2) {
	msignal.Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal.Signal2;
msignal.Signal2.__name__ = ["msignal","Signal2"];
msignal.Signal2.__super__ = msignal.Signal;
msignal.Signal2.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot2(this,listener,once,priority);
	}
	,__class__: msignal.Signal2
});
msignal.Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal.Slot0;
msignal.Slot0.__name__ = ["msignal","Slot0"];
msignal.Slot0.__super__ = msignal.Slot;
msignal.Slot0.prototype = $extend(msignal.Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal.Slot0
});
msignal.Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal.Slot1;
msignal.Slot1.__name__ = ["msignal","Slot1"];
msignal.Slot1.__super__ = msignal.Slot;
msignal.Slot1.prototype = $extend(msignal.Slot.prototype,{
	param: null
	,execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal.Slot1
});
msignal.Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal.Slot2;
msignal.Slot2.__name__ = ["msignal","Slot2"];
msignal.Slot2.__super__ = msignal.Slot;
msignal.Slot2.prototype = $extend(msignal.Slot.prototype,{
	param1: null
	,param2: null
	,execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal.Slot2
});
msignal.SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal.SlotList.NIL != null) throw "Parameters head and tail are null. Use the NIL element instead.";
		this.nonEmpty = false;
	} else if(head == null) throw "Parameter head cannot be null."; else {
		this.head = head;
		if(tail == null) this.tail = msignal.SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal.SlotList;
msignal.SlotList.__name__ = ["msignal","SlotList"];
msignal.SlotList.prototype = {
	head: null
	,tail: null
	,nonEmpty: null
	,length: null
	,get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal.SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal.SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		if(this.tail == msignal.SlotList.NIL) return new msignal.SlotList(slot).prepend(this.head);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal.SlotList
	,__properties__: {get_length:"get_length"}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
msignal.SlotList.NIL = new msignal.SlotList(null,null);
IMap.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IContext.__meta__ = { obj : { 'interface' : null}};
f1feed.core.View.ADDED = "added";
f1feed.core.View.REMOVED = "removed";
f1feed.core.View.ACTIONED = "actioned";
f1feed.core.View.idCounter = 0;
mmvc.api.IViewContainer.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IMediator.__meta__ = { obj : { 'interface' : null}};
mmvc.impl.Mediator.__meta__ = { fields : { injector : { name : ["injector"], type : ["minject.Injector"], inject : null}, contextView : { name : ["contextView"], type : ["mmvc.api.IViewContainer"], inject : null}, mediatorMap : { name : ["mediatorMap"], type : ["mmvc.api.IMediatorMap"], inject : null}}};
f1feed.core.DataView.DATA_CHANGED = "dataChanged";
mmvc.api.ICommand.__meta__ = { obj : { 'interface' : null}};
mmvc.impl.Command.__meta__ = { fields : { contextView : { name : ["contextView"], type : ["mmvc.api.IViewContainer"], inject : null}, commandMap : { name : ["commandMap"], type : ["mmvc.api.ICommandMap"], inject : null}, injector : { name : ["injector"], type : ["minject.Injector"], inject : null}, mediatorMap : { name : ["mediatorMap"], type : ["mmvc.api.IMediatorMap"], inject : null}, signal : { name : ["signal"], type : ["msignal.Signal"], inject : null}}};
f1feed.feed.command.LoadFeedListCommand.__meta__ = { fields : { list : { name : ["list"], type : ["f1feed.feed.model.FeedList"], inject : null}, loadFeedList : { name : ["loadFeedList"], type : ["f1feed.feed.signal.LoadFeedList"], inject : null}}};
mdata.Collection.__meta__ = { obj : { 'interface' : null}};
mdata.List.__meta__ = { obj : { 'interface' : null}};
f1feed.feed.view.FeedListViewMediator.__meta__ = { fields : { loadFeedList : { name : ["loadFeedList"], type : ["f1feed.feed.signal.LoadFeedList"], inject : null}}};
mloader.Loader.__meta__ = { obj : { 'interface' : null}};
mmvc.api.ICommandMap.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IMediatorMap.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IViewMap.__meta__ = { obj : { 'interface' : null}};
msignal.EventDispatcher.__meta__ = { obj : { 'interface' : null}};
Main.main();
})();
