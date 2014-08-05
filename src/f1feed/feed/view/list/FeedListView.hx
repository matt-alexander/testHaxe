package f1feed.feed.view.list ;

import f1feed.core.View;
import f1feed.core.DataView;
import f1feed.feed.model.item.FeedItem;
import f1feed.feed.model.FeedList;
import f1feed.feed.view.item.FeedItemView;

/**
Main FeedList view containing a list of FeedItems

@see f1feed.core.DataView
@see f1feed.feed.view.FeedListView
@see f1feed.feed.model.FeedList
*/
class FeedListView extends DataView<FeedList>
{
	/**
	@param data 	default FeedList
	@see example.core.DataView
	*/
	public function new(?data:FeedList)
	{
		#if js tagName = "div"; #end
		super(data);
	}

	/**
	
	*/
	override function initialize()
	{
		super.initialize();
		
		element.style.backgroundColor = "#E0E0E0";
		element.style.paddingLeft = "20px";
	}
	/**
	Displays an error in console
	*/
	public function showError(message:String)
	{
		trace("<<Here's an error in the feed list view>>");
	}
	
	/**
	Overrides dataChanged to add/remove listeners to collection change event

	@see f1feed.core.DataView
	*/
	override function dataChanged()
	{
		super.dataChanged();
		
		if(data != null)
		{
			for(item in data)
			{
				var view = new FeedItemView(item);
				addChild(view);
			}
		}
	}
}

