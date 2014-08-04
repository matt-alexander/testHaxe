1. Main.main() creates instances of ApplicationView and ApplicationContext.
2. ApplicationContext.startup() performs the mappings.
3. ApplicationViewMediator.onRegister() calls ApplicationView.createViews().
4. ApplicationView.createViews() creates an instance of FeedListView and adds it to the stage.
5. FeedListView being added to the stage automatically creates an instance of FeedListViewMediator, thanks to the mapping in the ApplicationContext.
6. FeedListViewMediator.onRegister() is triggered by FeedListViewMediator being added to the stage and dispatches a LoadFeedList signal.
7. LoadFeedListCommand.execute() is run because it was mapped to the LoadFeedList signal in ApplicationContext.
8. LoadFeedListCommand.execute() loads data from somewhere and sets listeners for the loaded complete and failed types
9. LoadFeedListCommand.completed() populates the FeedList with FeedItems created from the returned dataset and then dispatches the LoadFeedList.completed signal.
10. FeedListViewMediator hears the LoadFeedList.completed signal and passes the associated FeedList to FeedListView.setData().
