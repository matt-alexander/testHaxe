package f1feed.feed.view;

import f1feed.core.View;
import f1feed.core.DataView;
import f1feed.feed.model.FeedItem;
import f1feed.feed.model.FeedList;

/**
Main FeedList view containing a list of FeedItems

@see f1feed.core.DataView
@see f1feed.feed.view.FeedListView
@see f1feed.feed.model.FeedList
*/
class FeedListView extends DataView<FeedList>
{
	//inline public static var CREATE_TODO = "CREATE_TODO";
	//var statsView:TodoStatsView;
//
	/**
	Overrides constructor to set js tag name to unordered list (ul)

	@param data 	default FeedList
	@see example.core.DataView
	*/
	public function new(?data:FeedList)
	{
		#if js tagName = "div"; #end
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
		
		element.style.backgroundColor = "#E0E0E0";
		element.style.paddingLeft = "20px";
	}
	/**
	Displays an error in the stats view
	*/
	public function showError(message:String)
	{
		//statsView.setData(message);
		trace("<<Here's an error in the feed list view>>");
	}

	/**
	Overrides dispatched to handle ACTIONED events from child views.

	@see f1feed.core.DataView
	*/
	//override public function dispatch(event:String, view:View)
	//{
		//switch(event)
		//{
			//case View.ACTIONED:
			//{
				//if(Std.is(view, TodoView))
				//{
					//var todoView = cast view;
					//toggleTodoViewState(todoView);	
				//}
				//else if(Std.is(view, TodoStatsView))
				//{
					//super.dispatch(CREATE_TODO, this);
				//}
			//}
			//default:
			//{
				//super.dispatch(event, view);
			//}
		//}
	//}

	/**
	Toggles the done state of a single TodoView

	@param view 	TodoView to toggle done state		
	*/
	//function toggleTodoViewState(view:TodoView)
	//{
		//var data = view.data;
		//data.done = !data.done;
		//view.setData(data, true);
//
		//updateStats();
//
	//}


	/**
	Overrides initialized to create stats view
	@see example.core.View
	*/
	//override function initialize()
	//{
		//super.initialize();
//
		//statsView = new TodoStatsView();
		//addChild(statsView);
	//}


	/**
	Overrides dataChanged to add/remove listeners to collection change event

	@see f1feed.core.DataView
	*/
	override function dataChanged()
	{
		super.dataChanged();

		//if(this.previousData != null)
			//this.previousData.changed.remove(collectionChanged);
		
		//if(data != null)
			//data.changed.add(collectionChanged);

		collectionChanged();
	}

	/**
	updates child views based on current size of data
	*/
	function collectionChanged()
	{
		//updateStats();

		for(child in children.concat([]))
		{
			if(Std.is(child, FeedItemView))
			{
				removeChild(child);	
			}
		}

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
