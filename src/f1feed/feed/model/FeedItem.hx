package f1feed.feed.model;

class FeedItem
{
	public var title:String;
	public var link:String;
	public var author:String;
	public var publishedDate:String;
	public var contentSnippet:String;
	public var content:String;
	//public var categories:String; //TODO: Implement this later
	
	public function new(title:String, link:String, author:String, publishedDate:String,
		contentSnippet:String, content:String) 
	{
		this.title = title;
		this.link = link;
		this.author = author;
		this.publishedDate = publishedDate;
		this.contentSnippet = contentSnippet;
		this.content = content;		
	}
	
	/**
	Serializes the data object as a JSON string 
	*/
	public function toString():String
	{
		return haxe.Json.stringify(this);
	}
}