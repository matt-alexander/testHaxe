package f1feed.app ;

import mmvc.api.IViewContainer;

// Main Application
import f1feed.app.ApplicationView;
import f1feed.app.ApplicationViewMediator;

// feed Module
import f1feed.feed.model.FeedSummary;
import f1feed.feed.model.FeedList;
import f1feed.feed.command.LoadFeedListCommand;
import f1feed.feed.signal.LoadFeedList;
import f1feed.feed.signal.ToggleFeedContent;
import f1feed.feed.view.list.FeedListView;
import f1feed.feed.view.summary.FeedSummaryView;
import f1feed.feed.view.list.FeedListViewMediator;
import f1feed.feed.view.summary.FeedSummaryViewMediator;

/**
Application wide context.
<p>Provides mapping of following classes:
<ul>
	<li>Signals to commands</li>
	<li>Models</li>
	<li>Views to ViewMediators</li>
</ul> 
</p>
@see mmvc.impl.Context
*/
class ApplicationContext extends mmvc.impl.Context
{
	public function new(?contextView:IViewContainer=null)
	{
		super(contextView);
	}

	/**
	Overrides startup to configure all context commands, models and mediators
	@see mmvc.impl.Context
	*/
	override public function startup()
	{
		commandMap.mapSignalClass(LoadFeedList, LoadFeedListCommand);
		
		injector.mapSingleton(FeedSummary);
		injector.mapSingleton(FeedList);
		injector.mapSingleton(ToggleFeedContent);
		
		mediatorMap.mapView(FeedSummaryView, FeedSummaryViewMediator);
		mediatorMap.mapView(FeedListView, FeedListViewMediator);

		//wiring for main application module
		mediatorMap.mapView(ApplicationView, ApplicationViewMediator);
	}

	/**
	Overrides shutdown to remove/cleanup mappings
	@see mmvc.impl.Context
	*/
	override public function shutdown()
	{
		
	}
}
