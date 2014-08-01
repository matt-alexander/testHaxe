package f1feed.feed.model;

/**
Feed object containing a list of FeedItem

@see f1feed.feed.model.FeedItem
@see mcore.data.ArrayList
*/

class FeedList extends mdata.ArrayList<FeedItem>
{
	public function new(?values:Array<FeedItem>=null)
	{
		super(values);
	}
	
	public function getAll()
	{
		return this.source;
	}
}