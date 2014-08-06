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
	#if js
		var headlineDiv:Element;
		var dateDiv:Element;
	#elseif flash
		var headlineField:flash.text.TextField;
		var dateField:flash.text.TextField;
	#end
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

		#if flash
			
			//Headline
			headlineField = new flash.text.TextField();
			headlineField.x = 10;
			headlineField.y = 10;
			var headlineFormat = new flash.text.TextFormat();
			headlineFormat.size = 21;
			headlineFormat.font = "Helvetica";
			headlineFormat.bold = true;
			headlineField.defaultTextFormat = headlineFormat;
			sprite.addChild(headlineField);
			
			//Article Date
			dateField = new flash.text.TextField();
			dateField.x = 100;
			dateField.y = 16;
			var dateFormat = new flash.text.TextFormat();
			dateFormat.size = 13;
			dateFormat.color = 0xB10000;
			dateFormat.font = "Helvetica";
			dateField.defaultTextFormat = dateFormat;
			sprite.addChild(dateField);
			
		#elseif js
			
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
		#end
	}
	
	/**
	Overrides update to set data and view specific properties in flash and js
	@see example.core.View
	*/
	override function update()
	{
		if(data != null)
		{
			#if js
				headlineDiv.innerHTML = feedHeadline.title;
				dateDiv.innerHTML = feedHeadline.publishedDate.substring(5, 16);
			#elseif flash
				headlineField.text = feedHeadline.title;
				headlineField.width = headlineField.textWidth + 10;
				
				dateField.text = feedHeadline.publishedDate.substring(5, 16);
				dateField.x = headlineField.width + 20;
			#else
				trace("ID: " + toString() + ", headline: " + feedHeadline.title + ", index: " + index);
			#end
		}
	}
}
