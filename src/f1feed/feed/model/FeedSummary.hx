package f1feed.feed.model;

class FeedSummary
{
	public var title:String;
	public var link:String;
	public var author:String;
	public var feedUrl:String;
	public var description:String;
	
	public function new(title:String, link:String, author:String, feedUrl:String, description:String) 
	{
		this.title = title;
		this.link = link;
		this.author = author;
		this.feedUrl = feedUrl;
		this.description = description;
	}
	
	/**
	Serializes the data object as a JSON string 
	*/
	public function toString():String
	{
		return haxe.Json.stringify(this);
	}	
}
