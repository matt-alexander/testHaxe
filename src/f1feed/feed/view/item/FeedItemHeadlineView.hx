package f1feed.feed.view.item;

import f1feed.core.DataView;
import f1feed.feed.model.item.FeedItemHeadline;

#if js
import js.Browser;
import js.html.Event;
import js.Browser.document;
import js.html.Element;
#end

/**
Combination of feed title and date, displayed as Headline of FeedItemView.

@see example.core.DataView
*/
class FeedItemHeadlineView extends DataView<FeedItemHeadline>
{
	var headlineDiv:Element;
	var dateDiv:Element;
	var feedHeadline:FeedItemHeadline;
	
	public function new(?data:FeedItemHeadline) 
	{
		#if js tagName = "div"; #end
		
		super(data);
	}
	
	/**
	Overrides dataChanged to update internal properties
	@see example.core.DataView
	*/
	override function dataChanged()
	{
		super.dataChanged();
		
		feedHeadline = data != null ? data : new FeedItemHeadline("......", Date.now().toString());
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
			
			//Headline
			headlineDiv = js.Browser.document.createElement("span");
			headlineDiv.setAttribute("id", "headline");
			headlineDiv.style.color = "#000000";
			headlineDiv.style.fontSize = "14pt";
			headlineDiv.style.fontWeight = "bold";
			element.appendChild(headlineDiv);
			
			//Article Date
			dateDiv = js.Browser.document.createElement("span");
			dateDiv.setAttribute("id", "articleDate");
			dateDiv.style.color = "#B10000";
			dateDiv.style.fontSize = "9pt";
			dateDiv.style.marginLeft = "20px";
			element.appendChild(dateDiv);
			
			//var expandButton = new FeedItemExpandButtonView();
			//addChild(expandButton);
		//#end
	}
	
	/**
	Overrides update to set view specific properties in flash and js
	@see example.core.View
	*/
	override function update()
	{
		if(data != null)
		{
			#if js
				headlineDiv.innerHTML = feedHeadline.title;
				dateDiv.innerHTML = feedHeadline.publishedDate.substring(5, 16);
			#else
				trace("ID: " + toString() + ", headline: " + feedHeadline.title + ", index: " + index);
			#end
		}
	}
}
