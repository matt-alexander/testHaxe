package f1feed.feed.view.list ;

import f1feed.feed.model.FeedSummary;
import f1feed.feed.signal.LoadFeedList;
import f1feed.feed.model.FeedList;
import f1feed.feed.model.item.FeedItem;
import f1feed.feed.view.list.FeedListView;

import f1feed.core.View;
/**
Mediator for FeedListView.

@see f1feed.feed.view.FeedListView
@see f1feed.feed.signal.LoadFeedList
*/

class FeedListViewMediator extends mmvc.impl.Mediator<FeedListView>
{
	@inject public var loadFeedList:LoadFeedList;

	var list:FeedList;

	public function new()
	{
		super();
	}

	/**
	Dispatches loadTodoList on registration of mediator
	@see mmvc.impl.Mediator
	@see mmvc.base.MediatorBase.mediate()
	*/
	override function onRegister()
	{
		//using mediate() to store listeners for easy cleanup during removal
		//mediate(view.signal.add(viewHandler));
		mediate(loadFeedList.completed.addOnce(loadCompleted));
		mediate(loadFeedList.failed.addOnce(loadFailed));

		loadFeedList.dispatch();
	}

	/**
	Override onRemove to remove any unmediated listeners
	@see mmvc.impl.Mediator
	*/
	override public function onRemove():Void
	{
		super.onRemove();
	}

	/**
	callback for successful load of FeedSummary and FeedList
	@see f1feed.feed.signal.LoadFeedList
	*/
	function loadCompleted(summary:FeedSummary, list:FeedList)
	{
		this.list = list;
		view.setData(list);
	}

	function loadFailed(error:Dynamic)
	{
		view.showError(Std.string(error));
	}
}
