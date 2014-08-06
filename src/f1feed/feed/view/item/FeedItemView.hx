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
	#elseif flash
		var linkField:flash.text.TextField;
	#end
	
	//Data	
	var headline:FeedItemHeadline;
	var content:FeedItemContent;
	var contentSnippet:String;
	var articleUrl:String;
	
	/**
	Overrides constructor to initialize local vars
	@param data  	default Todo model
	@see example.core.DataView
	*/
	public function new(?data:FeedItem)
	{
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
	@see example.core.View
	*/
	override function initialize()
	{
		super.initialize();
		
		headlineView = new FeedItemHeadlineView();
		addChild(headlineView);
		
		contentView = new FeedItemContentView();
		addChild(contentView);
		
		#if flash
			sprite.height = 99;
			
			linkField = new flash.text.TextField();
			linkField.x = 10;
			linkField.y = 110;
			linkField.width = 200;
			linkField.htmlText = "<a>View on Formula1.com<a/>";
			sprite.addChild(linkField);
			
		#elseif js
			element.style.paddingTop = "10px";
			
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
		headlineView.setData(headline);
		contentView.setData(content);
		
		#if js
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
		#elseif flash
			sprite.y = (index * 99);
			
			if (articleUrl != "")
			{
				linkField.visible = true;
				var linkFormat = new flash.text.TextFormat();
				linkFormat.color = 0x428BCA;
				linkFormat.size = 14;
				linkFormat.font = "Helvetica";
				linkFormat.url = articleUrl;
				linkFormat.target = "_blank";
				linkField.setTextFormat(linkFormat);
			}
			else
			{
				linkField.visible = false;
			}
		#else
			trace("ID: " + toString() + ", headline: " + headline.title + ", index: " + index);
		#end

	}
}
