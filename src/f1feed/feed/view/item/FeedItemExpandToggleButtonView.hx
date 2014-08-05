package f1feed.feed.view.item;

import f1feed.core.View;
import f1feed.feed.signal.ToggleFeedContent;

import js.html.Event;

class FeedItemExpandToggleButtonView extends View
{
	public var toggleSignal:ToggleFeedContent;
	public var toggleState:Bool;
	
	public function new() 
	{
		#if js tagName = "button"; #end
		
		super();
	}
	
	/**
	Overrides initialize to initialise sub views

	@see example.core.View
	*/
	override function initialize()
	{
		super.initialize();
		
		toggleState = false;
		
		#if js
			element.setAttribute("id", "btnExpand");
			element.style.marginRight = "10px";
			element.style.minWidth = "22px";
			element.onclick = js_onToggle;
			element.className = "btn btn-primary btn-xs";
			element.innerHTML = "+";
		#end
		
		this.toggleSignal = new ToggleFeedContent();
	}
	
	function toggleButtonImage():Void
	{
		if (toggleState == false)
		{
			drawToggleUp();
		}
		else
		{
			drawToggleDown();
		}
		
		toggleState = !toggleState;
	}
	
	function drawToggleUp():Void
	{
		#if js
			element.innerHTML = "-";
		#end
	}
	
	function drawToggleDown():Void
	{
		#if js
			element.innerHTML = "+";
		#end
	}
	
	function js_onToggle(event:js.html.Event):Void
	{
		toggleButtonImage();
		this.toggleSignal.dispatch();
	}
}
