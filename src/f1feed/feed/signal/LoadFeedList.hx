package f1feed.feed.signal;

import msignal.Signal;

import f1feed.feed.model.FeedList;

/**
Application signal for loading an existing feed.

Includes sub signals for completed/failed handlers once list is loaded.

@see f1feed.feed.command.LoadFeedListCommand
@see msignal.Signal

*/
class LoadFeedList extends msignal.Signal0
{
	/**
	dispatched once TodoList has been loaded
	*/
	public var completed:Signal1<FeedList>;

	/**
	Dispatched if application unable to load TodoList
	*/
	public var failed:Signal1<Dynamic>;
	
	public function new()
	{
		super();
		completed = new Signal1<FeedList>(FeedList);
		failed = new Signal1<Dynamic>(Dynamic);
	}
}