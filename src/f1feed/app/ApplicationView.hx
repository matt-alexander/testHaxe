package f1feed.app;

import f1feed.core.View;
import f1feed.feed.view.summary.FeedSummaryView;
import f1feed.feed.view.list.FeedListView;

class ApplicationView extends View implements mmvc.api.IViewContainer
{
	public var viewAdded:Dynamic -> Void;
	public var viewRemoved:Dynamic -> Void;

	public function new()
	{
		super();
	}

	/**
	Called by ApplicationViewMediator once application is wired up to the context
	@see ApplicationViewMediator.onRegister;
	*/
	public function createViews()
	{
		var summaryView = new FeedSummaryView();
		addChild(summaryView);
		
		var feedView = new FeedListView();
		addChild(feedView);
	}

	/**
	Overrides signal bubbling to trigger view added/removed handlers for IViewContainer
	@param event 	a string event type
	@param view 	instance of view that originally dispatched the event
	*/
	override public function dispatch(event:String, view:View)
	{
		switch(event)
		{
			case View.ADDED:
			{
				viewAdded(view);
			}
			case View.REMOVED:
			{
				viewRemoved(view);
			}
			default:
			{
				super.dispatch(event, view);
			}
		}
	}

	/**
	Required by IViewContainer
	*/
	public function isAdded(view:Dynamic):Bool
	{
		return true;
	}

	/**
	Overrides View.initialize to add to top level platform specific sprite/element
	*/
	override function initialize()
	{
		super.initialize();
		#if flash
			flash.Lib.current.addChild(sprite);
		#elseif js
			js.Browser.document.body.appendChild(element);
		#end
	}
}
