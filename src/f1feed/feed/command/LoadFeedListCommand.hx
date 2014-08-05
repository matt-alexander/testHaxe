package f1feed.feed.command;

import f1feed.feed.model.FeedSummary;
import f1feed.feed.signal.LoadFeedList;
import f1feed.feed.model.FeedList;
import f1feed.feed.model.item.FeedItem;

import mloader.Loader;
import mloader.JsonLoader;

/**
Loads a feed list from the supplied url,

Dispatches LoadFeedList.completed or failed signal based on result of loader.

@see f1feed.feed.signal.LoadFeedList
@see mloader.JSONLoader
*/
class LoadFeedListCommand extends mmvc.impl.Command
{
	@inject
	public var list:FeedList;

	@inject
	public var loadFeedList:LoadFeedList;

	var loader:JsonLoader<Dynamic>;

	public function new()
	{
		super();
	}

	/**
	loads a json file
	*/
	override public function execute():Void
	{
		//loader = new JsonLoader("http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://www.formula1.com/rss/news/latest.rss");
		loader = new JsonLoader("data/data.json");
		loader.loaded.addOnce(completed).forType(Complete);
		loader.loaded.addOnce(failed).forType(Fail(null));
		loader.load();
	}

	/**
	Converts the raw json object into FeedItems
	Dispatches completed signal on completion.

	@param event 	loader event
	*/
	function completed(event:LoaderEvent<Dynamic>)
	{
		loader.loaded.remove(failed);
		
		var returnData:Dynamic = event.target.content.responseData.feed;
		
		//Create FeedSummary object
		var feedSummary = new FeedSummary(returnData.title, returnData.link, returnData.author, returnData.feedUrl, returnData.description);
		
		//Create FeedList object
		var items:Array<Dynamic> = cast returnData.entries;
		
		for(item in items)
		{
			var feedItem = new FeedItem(item.title, item.link, item.author, item.publishedDate,
				item.contentSnippet, item.content);
			list.add(feedItem);
		}
		
		loadFeedList.completed.dispatch(feedSummary, list);
	}

	/**
	Dispatches failed signal if JSONLoader is unsuccessful
	*/
	function failed(error:LoaderEvent<Dynamic>)
	{
		loader.loaded.remove(completed);

		loadFeedList.failed.dispatch(Std.string(error));
	}
}
