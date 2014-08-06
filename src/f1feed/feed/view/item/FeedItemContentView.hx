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
	#elseif flash
		var snippetField:flash.text.TextField;
		var fullContentField:flash.text.TextField;
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
	Overrides initialized to initialise sub views
	and add content objects

	@see example.core.View
	*/
	override function initialize()
	{
		super.initialize();
		
		var expandButton = new FeedItemExpandToggleButtonView();
		addChild(expandButton);
		
		expandButton.toggleSignal.add(onToggle);
		
		#if flash
			sprite.x = 10;
			sprite.y = 41;
			
			var contentFormat = new flash.text.TextFormat();
			contentFormat.color = 0x000000;
			contentFormat.size = 18;
			contentFormat.font = "Helvetica";
			
			snippetField = new flash.text.TextField();
			snippetField.x = 30;
			snippetField.wordWrap = true;
			snippetField.width = 600;
			snippetField.height = 50;
			snippetField.defaultTextFormat = contentFormat;
			sprite.addChild(snippetField);
			
			fullContentField = new flash.text.TextField();
			fullContentField.x = 30;
			fullContentField.wordWrap = true;
			fullContentField.width = 600;
			fullContentField.height = 80;
			fullContentField.visible = false;
			fullContentField.defaultTextFormat = contentFormat;
			sprite.addChild(fullContentField);
			
		#elseif js
			
			element.style.maxWidth = "950px";
			
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
	Overrides update to set view data in flash and js
	@see example.core.View
	*/
	override function update()
	{
		if(data != null)
		{
			#if js
				snippetDiv.innerHTML = feedContent.contentSnippet;
				fullContentDiv.innerHTML = feedContent.content;
			#elseif flash
				snippetField.text = feedContent.contentSnippet;
				fullContentField.text = feedContent.content;
			#else
				trace("ID: " + toString() + ", content: " + feedContent.contentSnippet + ", index: " + index);
			#end
		}
	}
	
	function onToggle():Void
	{
		#if js
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
		#elseif flash
			if (snippetField.visible)
			{
				fullContentField.visible = true;
				snippetField.visible = false;
			}
			else
			{
				fullContentField.visible = false;
				snippetField.visible = true;
			}
		#end
	}
}
