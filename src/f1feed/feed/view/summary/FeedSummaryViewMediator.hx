package f1feed.feed.view.summary ;

import f1feed.feed.model.FeedSummary;
import f1feed.feed.signal.LoadFeedList;
import f1feed.feed.model.FeedList;
import f1feed.feed.model.item.FeedItem;
import f1feed.feed.view.list.FeedListView;

import f1feed.core.View;
/**
Mediator for FeedSummaryView.

@see f1feed.feed.view.FeedSummaryView
@see f1feed.feed.signal.LoadFeedList
*/

class FeedSummaryViewMediator extends mmvc.impl.Mediator<FeedSummaryView>
{
	@inject public var loadFeedList:LoadFeedList;

	var summary:FeedSummary;

	public function new()
	{
		super();
	}

	/**
	Sets up listeners for loadFeedList signals
	@see mmvc.impl.Mediator
	@see mmvc.base.MediatorBase.mediate()
	*/
	override function onRegister()
	{
		mediate(loadFeedList.completed.addOnce(loadCompleted));
		mediate(loadFeedList.failed.addOnce(loadFailed));
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
		this.summary = summary;
		view.setData(summary);
	}

	function loadFailed(error:Dynamic)
	{
		view.showError(Std.string(error));
	}
}
