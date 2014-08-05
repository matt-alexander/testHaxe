package f1feed.feed.signal;

import msignal.Signal;

/**
Signal for expanding/minimizing the feed item content

Includes sub signals for completed/failed handlers once list is loaded.

@see msignal.Signal

*/
class ToggleFeedContent extends msignal.Signal0
{
	public function new()
	{
		super();
	}
}
