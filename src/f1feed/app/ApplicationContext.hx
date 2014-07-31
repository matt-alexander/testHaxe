package f1feed.app ;

import mmvc.api.IViewContainer;


// Main Application
import f1feed.app.ApplicationView;
import f1feed.app.ApplicationViewMediator;

// feed Module
//import example.todo.signal.loadtodolist;
//import example.todo.command.loadtodolistcommand;
//import example.todo.model.todolist;
//import example.todo.view.todolistview;
//import example.todo.view.todolistviewmediator;


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
		// wiring for todo model
		//commandMap.mapSignalClass(LoadTodoList, LoadTodoListCommand);
//
		//injector.mapSingleton(TodoList);
		//
		//mediatorMap.mapView(TodoListView, TodoListViewMediator);

		// wiring for main application module
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