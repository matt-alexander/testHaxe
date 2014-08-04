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
	var titleDiv:Element;
	var linkDiv:Element;
	var descriptionDiv:Element;
	
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
		#else
			trace("ID: " + toString() + ", title: " + title + ", index: " + index);
		#end

	}
	
	public function showError(message:String)
	{
		//statsView.setData(message);
		trace("<<Here's an error in the feed summary view>>");
	}
}
