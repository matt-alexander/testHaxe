package f1feed.app;

import f1feed.app.ApplicationView;

import f1feed.feed.signal.LoadFeedList;
import f1feed.feed.model.FeedItem;
import f1feed.feed.model.FeedList;

/**
Main application view mediator.

Responsible for triggering sub view creation once application is wired up to the context

@see ApplicationView
*/
class ApplicationViewMediator extends mmvc.impl.Mediator<ApplicationView>
{
	public function new()
	{
		super();
	}

	/**
	Context has now been initialized. Time to create the rest of the main views in the application
	@see mmvc.impl.Mediator.onRegister()
	*/
	override function onRegister()
	{
		super.onRegister();
		view.createViews();
	}

	/**
	@see mmvc.impl.Mediator
	*/
	override public function onRemove():Void
	{
		super.onRemove();
	}
}