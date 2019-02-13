const mongoose = require ('mongoose')

const artistSchema = new mongoose.Schema({
	artistName: String,
	mbid: String,
	topAlbum: String,
	topAlbumImg: String,
	topTrack0: String,
	topTrack3: String,
	topTrack10: String,
	image: String,
	description: String,
	similar: [String],
	tags: [String],
})


const Artist = new mongoose.model('Artist', artistSchema);

module.exports = Artist

// <artist>
//   <name>Cher</name>
//   <mbid>bfcc6d75-a6a5-4bc6-8282-47aec8531818</mbid>
//   <url>http://www.last.fm/music/Cher</url>
//   <image size="small">http://userserve-ak.last.fm/serve/50/285717.jpg</image>
//   <image size="medium">http://userserve-ak.last.fm/serve/85/285717.jpg</image>
//   <image size="large">http://userserve-ak.last.fm/serve/160/285717.jpg</image>
//   <streamable>1</streamable>
//   <stats>
//     <listeners>196440</listeners>
//     <plays>1599101</plays>
//   </stats>
//   <similar>
//     <artist>
//       <name>Madonna</name>
//       <url>http://www.last.fm/music/Madonna</url>
//       <image size="small">http://userserve-ak.last.fm/serve/50/5112299.jpg</image>
//       <image size="medium">http://userserve-ak.last.fm/serve/85/5112299.jpg></image>
//       <image size="large">http://userserve-ak.last.fm/serve/160/5112299.jpg</image>
//     </artist>
//     ...
//   </similar>
//   <tags>
//     <tag>
//       <name>pop</name>
//       <url>http://www.last.fm/tag/pop</url>
//     </tag>
//     ...
//   </tags>
//   <bio>
//     <published>Thu, 13 Mar 2008 03:59:18 +0000</published>
//     <summary>...</summary>
//     <content>...</content>
//   </bio>
// </artist>