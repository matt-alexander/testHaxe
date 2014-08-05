package f1feed.feed.model.item ;

class FeedItem
{
	public var link:String;
	public var author:String;
	public var headline:FeedItemHeadline;
	public var content:FeedItemContent;
	
	public function new(title:String, link:String, author:String, publishedDate:String,
        contentSnippet:String, content:String) 
	{
		this.headline = new FeedItemHeadline(title, publishedDate);
		this.content = new FeedItemContent(content, contentSnippet);
		this.link = link;
		this.author = author;
	}
	
	/**
	Serializes the data object as a JSON string 
	*/
	public function toString():String
	{
		return haxe.Json.stringify(this);
	}
}
