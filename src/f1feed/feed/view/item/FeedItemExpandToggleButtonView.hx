package f1feed.feed.view.item;

import f1feed.core.View;
import f1feed.feed.signal.ToggleFeedContent;

#if js
import js.html.Event;
#end

class FeedItemExpandToggleButtonView extends View
{
	public var toggleSignal:ToggleFeedContent;
	public var toggleState:Bool;
	
	#if flash
		var buttonField:flash.text.TextField;
	#end
	
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
		#elseif flash
			sprite.graphics.lineStyle(1.5,0x357EBD);
			sprite.graphics.beginFill(0x428BCA);
			sprite.graphics.drawRoundRect(0, 0, 18, 22, 3);
			sprite.buttonMode = true;
			sprite.mouseChildren = false;
			sprite.addEventListener(flash.events.MouseEvent.CLICK, fl_onToggle);
			
			buttonField = new flash.text.TextField();
			buttonField.width = 18;
			var textFormat = new flash.text.TextFormat();
			textFormat.color = 0xFFFFFF;
			textFormat.size = 12;
			textFormat.align = flash.text.TextFormatAlign.CENTER;
			textFormat.font = "Helvetica";
			buttonField.defaultTextFormat = textFormat;
			sprite.addChild(buttonField);
			buttonField.text = "+";
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
		#elseif flash
			buttonField.text = "-";
		#end
	}
	
	function drawToggleDown():Void
	{
		#if js
			element.innerHTML = "+";
		#elseif flash
			buttonField.text = "+";
		#end
	}
	
	#if js
	function js_onToggle(event:js.html.Event):Void
	{
		toggleButtonImage();
		this.toggleSignal.dispatch();
	}
	#elseif flash
	function fl_onToggle(event:flash.events.MouseEvent):Void
	{
		toggleButtonImage();
		this.toggleSignal.dispatch();
	}
	#end
}
