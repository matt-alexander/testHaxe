package f1feed.feed.view.summary ;

import f1feed.core.View;
import f1feed.core.DataView;
import f1feed.feed.model.FeedSummary;

#if js
import js.Browser;
import js.html.Event;
import js.Browser.document;
import js.html.Element;
import js.html.CSSStyleDeclaration;
#end

class FeedSummaryView extends DataView<FeedSummary>
{
	//Elements
	#if js
		var titleDiv:Element;
		var linkDiv:Element;
		var descriptionDiv:Element;
	#elseif flash
		var titleField:flash.text.TextField;
		var linkField:flash.text.TextField;
		var descriptionField:flash.text.TextField;
	#end
	
	//Data
	var title:String;
	var link:String;
	var description:String;
	
	public function new(?data:FeedSummary) 
	{
		#if js tagName = "div"; #end
		title = "";
		link = "";
		description = "";
		
		super(data);
	}
	
	/**
	Overrides initialized to set click handlers and 
	to initialise sub views on flash target

	@see example.core.View
	*/
	override function initialize()
	{
		super.initialize();
		
		#if js
			element.style.minHeight = "500";
			element.style.backgroundColor = "#252525";
			element.style.padding = "7px";
			
			//Title
			titleDiv = js.Browser.document.createElement("div");
			titleDiv.setAttribute("id", "feedTitle");
			titleDiv.style.color = "#F3F3F3";
			titleDiv.style.fontSize = "20pt";
			element.appendChild(titleDiv);
			
			//Description
			descriptionDiv = js.Browser.document.createElement("div");
			descriptionDiv.setAttribute("id", "feedDescription");
			descriptionDiv.style.color = "#C2C20C";
			descriptionDiv.style.fontSize = "14pt";
			element.appendChild(descriptionDiv);
			
			//Link
			linkDiv = js.Browser.document.createElement("a");
			linkDiv.setAttribute("id", "feedSourceWebsite");
			linkDiv.innerHTML = "Visit website";
			linkDiv.setAttribute("target", "_blank");
			element.appendChild(linkDiv);
		#elseif flash
			sprite.graphics.beginFill(0x252525);
			sprite.graphics.drawRect(0, 0, 800, 99);
			
			titleField = new flash.text.TextField();
			titleField.x = 5;
			titleField.y = 10;
			titleField.width = 800;
			var titleFormat = new flash.text.TextFormat();
			titleFormat.color = 0xF3F3F3;
			titleFormat.size = 30;
			titleFormat.font = "Helvetica";
			titleField.defaultTextFormat = titleFormat;
			sprite.addChild(titleField);
			
			descriptionField = new flash.text.TextField();
			descriptionField.x = 5;
			descriptionField.y = 50;
			descriptionField.width = 800;
			var descriptionFormat = new flash.text.TextFormat();
			descriptionFormat.color = 0xC2C20C;
			descriptionFormat.size = 20;
			descriptionFormat.font = "Helvetica";
			descriptionField.defaultTextFormat = descriptionFormat;
			sprite.addChild(descriptionField);
			
			linkField = new flash.text.TextField();
			linkField.x = 5;
			linkField.y = 75;
			linkField.width = 200;
			linkField.htmlText = "<a>Visit website</a>";
			sprite.addChild(linkField);
		#end
	}
	
	/**
	Overrides dataChanged to update internal properties
	@see example.core.DataView
	*/
	override function dataChanged()
	{
		super.dataChanged();
		
		title = data != null ? data.title : "";
		description = data != null ? data.description : "";
		link = data != null ? data.link : "";
	}
	
	/**
	Overrides update to set view specific properties in flash and js
	@see example.core.View
	*/
	override function update()
	{
		#if js
			//var headlineDiv = js.Browser.document.getElementById("headline");
			titleDiv.innerHTML = title;
			descriptionDiv.innerHTML = description;
			
			if (link != "")
			{
				linkDiv.style.display = "block";
				linkDiv.setAttribute("href", link);
			}
			else
			{
				linkDiv.style.display = "none";
				linkDiv.setAttribute("href", "");
			}
		#elseif flash
			titleField.text = title;
			descriptionField.text = description;
			
			if (link != "")
			{
				linkField.visible = true;
				var linkFormat = new flash.text.TextFormat();
				linkFormat.color = 0x428BCA;
				linkFormat.size = 14;
				linkFormat.font = "Helvetica";
				linkFormat.url = link;
				linkFormat.target = "_blank";
				linkField.setTextFormat(linkFormat);
			}
			else
			{
				linkField.visible = false;
			}
		#else
			trace("ID: " + toString() + ", title: " + title + ", index: " + index);
		#end

	}
	
	public function showError(message:String)
	{
		trace("<<Here's an error in the feed summary view>>");
	}
}
