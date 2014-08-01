package f1feed.feed.view;

import f1feed.core.View;
import f1feed.core.DataView;

import f1feed.feed.model.FeedItem;

#if js
import js.Browser;
import js.html.Event;
import js.Browser.document;
#end

/**
View for a single FeedItem model.

@see example.core.DataView
*/
class FeedItemView extends DataView<FeedItem>
{
	var headline:String;
	var publishedDate:String;

	//#if flash
	//var textField:flash.text.TextField;
	//var icon:flash.display.Bitmap;
	//#end

	/**
	Overrides constructor to set js tagName to list item (li)
	@param data  	default Todo model
	@see example.core.DataView
	*/
	public function new(?data:FeedItem)
	{
		#if js tagName = "li"; #end
		headline = "";
		super(data);
	}

	/**
	Overrides dataChanged to update internal properties
	@see example.core.DataView
	*/
	override function dataChanged()
	{
		super.dataChanged();
		headline = data != null ? data.title : "";
		publishedDate = data != null ? data.publishedDate : "";
	}

	/**
	Overrides initialized to set click handlers and 
	to initialise sub views on flash target

	@see example.core.View
	*/
	override function initialize()
	{
		super.initialize();

		//#if flash
			//icon = new flash.display.Bitmap();
			//sprite.addChild(icon);
//
			//textField = new flash.text.TextField();
			//textField.x = 20;
			//sprite.addChild(textField);
			//sprite.addEventListener(flash.events.MouseEvent.CLICK, flash_onClick);
		//#elseif js
			element.onclick = js_onClick;
		//#end
	}

	/**
	Overrides removed to clear event listeners
	@see example.core.View
	*/
	override function remove()
	{
		//#if flash
			//sprite.removeEventListener(flash.events.MouseEvent.CLICK, flash_onClick);
		//#elseif js
			element.onclick = null;
		//#end
	}

	/**
	Overrides update to set view specific properties in flash and js
	@see example.core.View
	*/
	override function update()
	{
		//#if flash
			//sprite.y = (index+1)*25;
			//textField.text = label;
//
			//var uri = "img/" + (done ? "done" : "none") + ".png";
			//var loader = new flash.display.Loader();
			//loader.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE, flash_onBitmapLoaderComplete);
			//loader.load(new flash.net.URLRequest(uri));
			//
		//#elseif js
		#if js
			element.innerHTML = headline + "  -  " + publishedDate;
		//#elseif (sys||neko||cpp)
			//if(index > -1)
			//{
				//var msg = label + (done ? " (completed)" : "");
				//Sys.println("	" + (index) + ": " + msg);
			//}
		#else
			trace("ID: " + toString() + ", headline: " + headline + ", index: " + index);
		#end

	}

	//#if flash
//
		///**
		//Flash only: updates icon bitmap on load of image
		//*/
		//function flash_onBitmapLoaderComplete (event:flash.events.Event)
		//{
			//var content = cast (event.target, flash.display.LoaderInfo).content;
		    //icon.bitmapData = cast(content, flash.display.Bitmap).bitmapData;
		//}
//
		///**
		//Flash only: dispatches ACTIONED event on mouse click
		//*/
		//function flash_onClick(event:flash.events.MouseEvent)
		//{
			//dispatch(View.ACTIONED, this);
		//}

	//#elseif js
	#if js
		/**
		JS only: dispatches ACTIONED event on mouse click
		*/		
		function js_onClick(event:js.html.Event)
		{	
			dispatch(View.ACTIONED, this);
		}

	#end
}