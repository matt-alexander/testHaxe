(function () { "use strict";
var $hxClasses = {};
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
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
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
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
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
var mmvc = {};
mmvc.api = {};
mmvc.api.IContext = function() { };
$hxClasses["mmvc.api.IContext"] = mmvc.api.IContext;
mmvc.api.IContext.__name__ = ["mmvc","api","IContext"];
mmvc.api.IContext.prototype = {
	__class__: mmvc.api.IContext
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
	startup: function() {
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
	toString: function() {
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
	__class__: mmvc.api.IViewContainer
};
f1feed.app.ApplicationView = function() {
	f1feed.core.View.call(this);
};
$hxClasses["f1feed.app.ApplicationView"] = f1feed.app.ApplicationView;
f1feed.app.ApplicationView.__name__ = ["f1feed","app","ApplicationView"];
f1feed.app.ApplicationView.__interfaces__ = [mmvc.api.IViewContainer];
f1feed.app.ApplicationView.__super__ = f1feed.core.View;
f1feed.app.ApplicationView.prototype = $extend(f1feed.core.View.prototype,{
	createViews: function() {
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
	__class__: mmvc.api.IMediator
};
mmvc.base = {};
mmvc.base.MediatorBase = function() {
	this.slots = [];
};
$hxClasses["mmvc.base.MediatorBase"] = mmvc.base.MediatorBase;
mmvc.base.MediatorBase.__name__ = ["mmvc","base","MediatorBase"];
mmvc.base.MediatorBase.__interfaces__ = [mmvc.api.IMediator];
mmvc.base.MediatorBase.prototype = {
	preRegister: function() {
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
	__class__: mmvc.impl.Mediator
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
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			if(i == null) s.b += "null"; else s.b += "" + i;
			s.b += " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
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
var mcore = {};
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
var mdata = {};
mdata.Dictionary = function(weakKeys) {
	if(weakKeys == null) weakKeys = false;
	this.weakKeys = weakKeys;
	this.clear();
};
$hxClasses["mdata.Dictionary"] = mdata.Dictionary;
mdata.Dictionary.__name__ = ["mdata","Dictionary"];
mdata.Dictionary.prototype = {
	set: function(key,value) {
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
var minject = {};
minject.ClassMap = function() {
	this.map = new haxe.ds.StringMap();
};
$hxClasses["minject.ClassMap"] = minject.ClassMap;
minject.ClassMap.__name__ = ["minject","ClassMap"];
minject.ClassMap.__interfaces__ = [IMap];
minject.ClassMap.prototype = {
	get: function(k) {
		var key = Type.getClassName(k);
		return this.map.get(key);
	}
	,set: function(k,v) {
		var key = Type.getClassName(k);
		this.map.set(key,v);
	}
	,exists: function(k) {
		var key = Type.getClassName(k);
		return this.map.exists(key);
	}
	,remove: function(k) {
		var key = Type.getClassName(k);
		return this.map.remove(key);
	}
	,keys: function() {
		var _this;
		var _g = [];
		var $it0 = this.map.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			_g.push(Type.resolveClass(k));
		}
		_this = _g;
		return HxOverrides.iter(_this);
	}
	,iterator: function() {
		return this.map.iterator();
	}
	,toString: function() {
		return this.map.toString();
	}
	,getKey: function(k) {
		return Type.getClassName(k);
	}
	,__class__: minject.ClassMap
};
minject.InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject.InjectionConfig;
minject.InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject.InjectionConfig.prototype = {
	getResponse: function(injector) {
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
		this.result = result;
	}
	,setInjector: function(injector) {
		this.injector = injector;
	}
	,toString: function() {
		var named;
		if(this.injectionName != null && this.injectionName != "") named = " named \"" + this.injectionName + "\" and"; else named = "";
		return "rule: [" + Type.getClassName(this.request) + ("]" + named + " mapped to [" + Std.string(this.result) + "]");
	}
	,__class__: minject.InjectionConfig
};
minject.Injector = function() {
	this.injectionConfigs = new haxe.ds.StringMap();
	this.injecteeDescriptions = new minject.ClassMap();
	this.attendedToInjectees = new minject.InjecteeSet();
};
$hxClasses["minject.Injector"] = minject.Injector;
minject.Injector.__name__ = ["minject","Injector"];
minject.Injector.prototype = {
	mapValue: function(whenAskedFor,useValue,named) {
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
				if(args.length > 0) ctorInjectionPoint = new minject.point.ConstructorInjectionPoint(fieldMeta.args);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var point = new minject.point.MethodInjectionPoint(field,fieldMeta.args);
					injectionPoints.push(point);
				} else if(post) {
					var order;
					if(fieldMeta.post == null) order = 0; else order = fieldMeta.post[0];
					var point1 = new minject.point.PostConstructInjectionPoint(field,order);
					postConstructMethodPoints.push(point1);
				}
			} else if(type != null) {
				var name;
				if(fieldMeta.inject == null) name = null; else name = fieldMeta.inject[0];
				var point2 = new minject.point.PropertyInjectionPoint(field,fieldMeta.type[0],name);
				injectionPoints.push(point2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point3 = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point3);
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
		if(this.parentInjector != null && value == null) this.attendedToInjectees = new minject.InjecteeSet();
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
minject.InjecteeSet = function() {
};
$hxClasses["minject.InjecteeSet"] = minject.InjecteeSet;
minject.InjecteeSet.__name__ = ["minject","InjecteeSet"];
minject.InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,remove: function(value) {
		Reflect.deleteField(value,"__injected__");
	}
	,'delete': function(value) {
		this.remove(value);
	}
	,iterator: function() {
		return HxOverrides.iter([]);
	}
	,__class__: minject.InjecteeSet
};
minject.InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject.InjecteeDescription;
minject.InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject.InjecteeDescription.prototype = {
	__class__: minject.InjecteeDescription
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
minject.point.InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject.point.InjectionPoint;
minject.point.InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject.point.InjectionPoint.prototype = {
	__class__: minject.point.InjectionPoint
};
minject.point.MethodInjectionPoint = function(name,args) {
	this.name = name;
	this.args = args;
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject.point.MethodInjectionPoint;
minject.point.MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject.point.MethodInjectionPoint.__interfaces__ = [minject.point.InjectionPoint];
minject.point.MethodInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var name;
			if(arg.name == null) name = ""; else name = arg.name;
			var config = injector.getMapping(Type.resolveClass(arg.type),arg.name);
			var injection = config.getResponse(injector);
			values.push(injection);
		}
		return values;
	}
	,__class__: minject.point.MethodInjectionPoint
};
minject.point.ConstructorInjectionPoint = function(args) {
	minject.point.MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject.point.ConstructorInjectionPoint;
minject.point.ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject.point.ConstructorInjectionPoint.__super__ = minject.point.MethodInjectionPoint;
minject.point.ConstructorInjectionPoint.prototype = $extend(minject.point.MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return Type.createInstance(target,this.gatherArgs(target,injector));
	}
	,__class__: minject.point.ConstructorInjectionPoint
});
minject.point.NoParamsConstructorInjectionPoint = function() {
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject.point.NoParamsConstructorInjectionPoint;
minject.point.NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject.point.NoParamsConstructorInjectionPoint.__interfaces__ = [minject.point.InjectionPoint];
minject.point.NoParamsConstructorInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return Type.createInstance(target,[]);
	}
	,__class__: minject.point.NoParamsConstructorInjectionPoint
};
minject.point.PostConstructInjectionPoint = function(name,order) {
	if(order == null) order = 0;
	this.name = name;
	this.order = order;
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject.point.PostConstructInjectionPoint;
minject.point.PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject.point.PostConstructInjectionPoint.__interfaces__ = [minject.point.InjectionPoint];
minject.point.PostConstructInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),[]);
		return target;
	}
	,__class__: minject.point.PostConstructInjectionPoint
};
minject.point.PropertyInjectionPoint = function(name,type,injectionName) {
	this.name = name;
	this.type = type;
	this.injectionName = injectionName;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject.point.PropertyInjectionPoint;
minject.point.PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject.point.PropertyInjectionPoint.__interfaces__ = [minject.point.InjectionPoint];
minject.point.PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var injectionConfig = injector.getMapping(Type.resolveClass(this.type),this.injectionName);
		var injection = injectionConfig.getResponse(injector);
		Reflect.setProperty(target,this.name,injection);
		return target;
	}
	,__class__: minject.point.PropertyInjectionPoint
};
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
	getResponse: function(injector) {
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
	getResponse: function(injector) {
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
	getResponse: function(injector) {
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
	getResponse: function(injector) {
		return this.value;
	}
	,toString: function() {
		return "instance of " + Type.getClassName(Type.getClass(this.value));
	}
	,__class__: minject.result.InjectValueResult
});
mmvc.api.ICommand = function() { };
$hxClasses["mmvc.api.ICommand"] = mmvc.api.ICommand;
mmvc.api.ICommand.__name__ = ["mmvc","api","ICommand"];
mmvc.api.ICommand.prototype = {
	__class__: mmvc.api.ICommand
};
mmvc.api.ICommandMap = function() { };
$hxClasses["mmvc.api.ICommandMap"] = mmvc.api.ICommandMap;
mmvc.api.ICommandMap.__name__ = ["mmvc","api","ICommandMap"];
mmvc.api.ICommandMap.prototype = {
	__class__: mmvc.api.ICommandMap
};
mmvc.api.IMediatorMap = function() { };
$hxClasses["mmvc.api.IMediatorMap"] = mmvc.api.IMediatorMap;
mmvc.api.IMediatorMap.__name__ = ["mmvc","api","IMediatorMap"];
mmvc.api.IMediatorMap.prototype = {
	__class__: mmvc.api.IMediatorMap
};
mmvc.api.IViewMap = function() { };
$hxClasses["mmvc.api.IViewMap"] = mmvc.api.IViewMap;
mmvc.api.IViewMap.__name__ = ["mmvc","api","IViewMap"];
mmvc.api.IViewMap.prototype = {
	__class__: mmvc.api.IViewMap
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
	mapSignalClass: function(signalClass,commandClass,oneShot) {
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
		this.injector.attendedToInjectees.remove(command);
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
	__class__: mmvc.base.ContextError
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
	set_contextView: function(value) {
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
	mapView: function(viewClassOrName,mediatorClass,injectViewAs,autoCreate,autoRemove) {
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
		this.injector.attendedToInjectees.remove(mediator);
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
	__class__: mmvc.base.MappingConfig
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
	add: function(listener) {
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
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		return this.listener = value;
	}
	,__class__: msignal.Slot
	,__properties__: {set_listener:"set_listener"}
};
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
	execute: function(value1) {
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
	execute: function(value1,value2) {
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
	if(head == null && tail == null) this.nonEmpty = false; else if(head == null) {
	} else {
		this.head = head;
		if(tail == null) this.tail = msignal.SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal.SlotList;
msignal.SlotList.__name__ = ["msignal","SlotList"];
msignal.SlotList.prototype = {
	get_length: function() {
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
msignal.SlotList.NIL = new msignal.SlotList(null,null);
IMap.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IContext.__meta__ = { obj : { 'interface' : null}};
f1feed.core.View.ADDED = "added";
f1feed.core.View.REMOVED = "removed";
f1feed.core.View.ACTIONED = "actioned";
f1feed.core.View.idCounter = 0;
mmvc.api.IViewContainer.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IMediator.__meta__ = { obj : { 'interface' : null}};
mmvc.impl.Mediator.__meta__ = { fields : { injector : { type : ["minject.Injector"], inject : null}, contextView : { type : ["mmvc.api.IViewContainer"], inject : null}, mediatorMap : { type : ["mmvc.api.IMediatorMap"], inject : null}}};
minject.point.InjectionPoint.__meta__ = { obj : { 'interface' : null}};
mmvc.api.ICommand.__meta__ = { obj : { 'interface' : null}};
mmvc.api.ICommandMap.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IMediatorMap.__meta__ = { obj : { 'interface' : null}};
mmvc.api.IViewMap.__meta__ = { obj : { 'interface' : null}};
Main.main();
})();
