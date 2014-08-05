package f1feed.feed.view.item ;

import f1feed.core.View;
import f1feed.core.DataView;
import f1feed.feed.model.item.FeedItem;
import f1feed.feed.model.item.FeedItemHeadline;
import f1feed.feed.model.item.FeedItemContent;

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
	var headlineView:FeedItemHeadlineView;
	var contentView:FeedItemContentView;
	
	#if js
		var linkDiv:Element;
	#end
	
	//Data	
	var headline:FeedItemHeadline;
	var content:FeedItemContent;
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
		headline = null;
		content = null;
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
		headline = data != null ? data.headline : null;
		content = data != null ? data.content : null;
		contentSnippet = data != null ? data.content.contentSnippet : "";
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
		
		#if flash
			//icon = new flash.display.Bitmap();
			//sprite.addChild(icon);
//
			//textField = new flash.text.TextField();
			//textField.x = 20;
			//sprite.addChild(textField);
			//sprite.addEventListener(flash.events.MouseEvent.CLICK, flash_onClick);
		#elseif js
			
			element.style.paddingTop = "10px";
			
			headlineView = new FeedItemHeadlineView();
			addChild(headlineView);
			
			contentView = new FeedItemContentView();
			addChild(contentView);
			
			//Link
			linkDiv = js.Browser.document.createElement("a");
			linkDiv.setAttribute("id", "articleUrl");
			linkDiv.innerHTML = "View on Formula1.com";
			linkDiv.setAttribute("target", "_blank");
			linkDiv.style.fontSize = "10pt";
			element.appendChild(linkDiv);
		#end
	}
	
	/**
	Overrides update to set view specific properties in flash and js
	@see example.core.View
	*/
	override function update()
	{
		#if js
			headlineView.setData(headline);
			contentView.setData(content);
			
			//snippetDiv.innerHTML = contentSnippet;
			
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
			trace("ID: " + toString() + ", headline: " + headline.title + ", index: " + index);
		#end

	}
}
