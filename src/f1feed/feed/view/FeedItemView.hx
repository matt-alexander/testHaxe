package f1feed.feed.view;

import f1feed.core.View;
import f1feed.core.DataView;
import f1feed.feed.model.FeedItem;

#if js
import js.Browser;
import js.html.Event;
import js.Browser.document;
import js.html.Element;
#end

/**
View for a single FeedItem model.

@see example.core.DataView
*/
class FeedItemView extends DataView<FeedItem>
{
	//Elements
	var headlineDiv:Element;
	var dateDiv:Element;
	var snippetDiv:Element;
	var linkDiv:Element;
	
	//Data	
	var headline:String;
	var publishedDate:String;
	var contentSnippet:String;
	var articleUrl:String;

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
		#if js tagName = "div"; #end
		headline = "";
		publishedDate = "";
		contentSnippet = "";
		articleUrl = "";
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
		contentSnippet = data != null ? data.contentSnippet : "";
		articleUrl = data != null ? data.link : "";
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
			
			element.style.paddingTop = "10px";
			
			//Headline
			headlineDiv = js.Browser.document.createElement("span");
			headlineDiv.setAttribute("id", "headline");
			headlineDiv.style.color = "#000000";
			headlineDiv.style.fontSize = "14pt";
			element.appendChild(headlineDiv);
			
			//Article Date
			dateDiv = js.Browser.document.createElement("span");
			dateDiv.setAttribute("id", "articleDate");
			dateDiv.style.color = "#333333";
			dateDiv.style.fontSize = "9pt";
			dateDiv.style.marginLeft = "20px";
			element.appendChild(dateDiv);
			
			//Snippet
			snippetDiv = js.Browser.document.createElement("div");
			snippetDiv.setAttribute("id", "articleSnippet");
			snippetDiv.style.color = "#000000";
			snippetDiv.style.fontSize = "11pt";
			element.appendChild(snippetDiv);
			
			//Link
			linkDiv = js.Browser.document.createElement("a");
			linkDiv.setAttribute("id", "articleUrl");
			linkDiv.innerHTML = "More...";
			linkDiv.setAttribute("target", "_blank");
			element.appendChild(linkDiv);
		//#end
	}
	
	/**
	Overrides update to set view specific properties in flash and js
	@see example.core.View
	*/
	override function update()
	{
		#if js
			//var headlineDiv = js.Browser.document.getElementById("headline");
			headlineDiv.innerHTML = headline;
			dateDiv.innerHTML = publishedDate.substring(5, 16);
			snippetDiv.innerHTML = contentSnippet;
			
			if (articleUrl != "")
			{
				linkDiv.style.display = "block";
				linkDiv.setAttribute("href", articleUrl);
			}
			else
			{
				linkDiv.style.display = "none";
				linkDiv.setAttribute("href", "");
			}
		#else
			trace("ID: " + toString() + ", headline: " + headline + ", index: " + index);
		#end

	}
}