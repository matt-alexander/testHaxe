package f1feed.feed.model.item ;

class FeedItemHeadline
{
	public var title:String;
	public var publishedDate:String;
	
	public function new(title:String, publishedDate:String) 
	{
		this.title = title;
		this.publishedDate = publishedDate;	
	}
	
	/**
	Serializes the data object as a JSON string 
	*/
	public function toString():String
	{
		return haxe.Json.stringify(this);
	}
}
