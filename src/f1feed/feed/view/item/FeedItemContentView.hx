package f1feed.feed.view.item;

import f1feed.core.DataView;
import f1feed.feed.model.item.FeedItemContent;

#if js
import js.Browser;
import js.html.Event;
import js.Browser.document;
import js.html.Element;
#end

/**
Display either the content snippet or full content.
User controlled toggle.

@see example.core.DataView
*/
class FeedItemContentView extends DataView<FeedItemContent>
{
	#if js
		var snippetDiv:Element;
		var fullContentDiv:Element;
	#end
	var feedContent:FeedItemContent;
	
	public function new(?data:FeedItemContent) 
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
		
		feedContent = data != null ? data : new FeedItemContent("......", "......");
	}
	
	/**
	Overrides initialized to set click handlers and 
	to initialise sub views

	@see example.core.View
	*/
	override function initialize()
	{
		super.initialize();

		#if flash
			//icon = new flash.display.Bitmap();
			//sprite.addChild(icon);
//
			//textField = new flash.text.TextField();
			//textField.x = 20;
			//sprite.addChild(textField);
			//sprite.addEventListener(flash.events.MouseEvent.CLICK, flash_onClick);
		#elseif js
			
			element.style.maxWidth = "950px";
			
			var expandButton = new FeedItemExpandToggleButtonView();
			addChild(expandButton);
			
			expandButton.toggleSignal.add(onToggle);
			
			//Snippet
			snippetDiv = js.Browser.document.createElement("span");
			snippetDiv.setAttribute("id", "articleSnippet");
			snippetDiv.style.color = "#000000";
			snippetDiv.style.fontSize = "11pt";
			element.appendChild(snippetDiv);
			
			fullContentDiv = js.Browser.document.createElement("span");
			fullContentDiv.setAttribute("id", "articleContent");
			fullContentDiv.style.color = "#000000";
			fullContentDiv.style.fontSize = "11pt";
			fullContentDiv.style.display = "none";
			element.appendChild(fullContentDiv);
		#end
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
				snippetDiv.innerHTML = feedContent.contentSnippet;
				fullContentDiv.innerHTML = feedContent.content;
			#else
				trace("ID: " + toString() + ", content: " + feedContent.contentSnippet + ", index: " + index);
			#end
		}
	}
	
	function onToggle():Void
	{
		if (fullContentDiv.style.display == "none")
		{
			fullContentDiv.style.display = snippetDiv.style.display;
			snippetDiv.style.display = "none";
		}
		else
		{
			snippetDiv.style.display = fullContentDiv.style.display;
			fullContentDiv.style.display = "none";
		}
	}
}
