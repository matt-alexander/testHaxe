package f1feed.feed.model.item;

class FeedItemContent
{
	public var contentSnippet:String;
	public var content:String;
	
	public function new(content:String, contentSnippet:String) 
	{
		this.content = content;
		this.contentSnippet = contentSnippet;
	}
	
	/**
	Serializes the data object as a JSON string 
	*/
	public function toString():String
	{
		return haxe.Json.stringify(this);
	}
}
