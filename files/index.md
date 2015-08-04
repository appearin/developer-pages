---
title: appear.in - Developer API
description: Ever wanted to have video communication on your web page, but couldn’t figure out how to set it up easily? The appear.in Developer API is just as easy to use as appear.in, just copy, paste and publish. Instant video chat on any web page.
template: index.html
---

<p class="ingress">Ever wanted to have video communication on your web page,
but couldn't figure out how to set it up easily?</p>

### How to embed an appear.in room on your web page
1. Decide which room you want to embed
2. Replace "your-room-name" with that room name in the embed code below
3. Copy and paste the embed code into the HTML editor of your blog/web page

<div class="embed-code-wrapper">
<p><strong>Embed code</strong></p>
<input id="embed-code" class="embed-code ui-input-text" type="text" value='<iframe src="https://appear.in/your-room-name" width="800" height="640" frameborder="0"></iframe>'>
</div>

If you want to adjust width and height of the room, you can also adjust the
values for "width" and "height" in the embed code.

## How will it look?
When you have embedded a room you your web page, you will see the room
appearing as below. Any one who enters that room will join the conversation,
whether they enter the room from your page, or just from appear.in.

<div id="demo-room"></div>

## What can I use it for?
Anything you want! We see people all over the world using it for everything
from personal blogs to talking to their doctor. Share a special moment with
friends, or integrate it into your banking system to allow customers to talk to
advisors. With appear.in anything is possible!

## FAQ
We have collected some [frequently asked questions about both our product and Developer API](https://appear.in/information/faq).
We hope you can find the answer you are looking for! If for any reason you
don't, please feel free to contact us at [api@appear.in](mailto:api@appear.in).

<h1 class="padding-please">Developer API - Advanced usage</h1>

If you are in the market for something a bit more advanced, such as guaranteed
empty and random room names, or a compatibility check for your users, you can
use our JavaScript SDK.

Add the following at the bottom of your body tag to start using it.

```html
<script src="//developer.appear.in/scripts/appearin-sdk.0.0.4.min.js"></script>
```

### NPM
The JavaScript SDK is also available on NPM. To install, just do:

```bash
npm install appearin-sdk
```

Then you can start using it with:

```javascript
var AppearIn = require("appearin-sdk");
```

*Note that the NPM version requires a pre-compilation step using something like
[browserify](http://browserify.org/) or [webpack](http://webpack.github.io/) to work.*

## JavaScript SDK documentation
The following is an overview of the API methods present in the JavaScript SDK.

### new AppearIn()
Whether you use the standalone JavaScript distribution, or the NPM package, you
have to initiate the SDK with the constructor. With the returned object, you
may use all API methods below.

```javascript
// If you use the standalone, use window.AppearIn, for npm users, do require.
var AppearIn = window.AppearIn || require('appearin-sdk');
var appearin = new AppearIn();
```

### appearin.isWebRtcCompatible()
Once you have created your appearIn object through the AppearIn constructor, you
can query our API. `isWebRtcCompatible()` offers an array of tests to determine
if the current browser is capable of using WebRTC, the underlying technology of
appear.in

```javascript
// Returns true if browser can use WebRTC, false otherwise
var isWebRtcCompatible = appearin.isWebRtcCompatible();
```

### appearin.getRandomRoomName()
You can get a guaranteed unique and random room name inside appear.in for use on
your page through `getRandomRoomName()`. This call offers both promise based
workflows, as well as passing an optional callback function. *Please note that if
you are using the optional callback, the function will no longer return a
promise.*

```javascript
// Promise-based workflow (recommended)
appearin.getRandomRoomName().then(function (roomName) {
    // do something with the roomName
});

// Callback-based workflow
appearin.getRandomRoomName(function (err, roomName) {
    // do something with the roomName
});
```

### appearin.addRoomToIframe(iframe, roomName)
We also provide a convenience function to attach a room to an iframe DOM
Element. `addRoomToIframe` takes two arguments:
1. `iframe`, which must be an iframe DOM Element
2. `roomName`, which must be a valid roomName

```javascript
var iframe = document.getElementById("iframe-element-id");
var roomName = "sly-koala";
appearin.addRoomToIframe(iframe, roomName);
```

### appearin.addRoomToElementById(elementId, roomName)
Similar to addRoomToIframe, we provide a convenience function to add the room to
an iframe DOM Element through the use of the id, similar to how `getElementById`
works. `addRoomToElementById` takes two arguments:
1. `elementId`, which must be a unique ID to an iframe DOM Element
2. `roomName`, which must be a valid roomName

If the ID doesn't exists, we will simply return.

```javascript
var roomName = "cool-panda";
appearin.addRoomToElementById("iframe-element-id", roomName);
```

## SDK Changelog
The following is a changelog for the JavaScript SDK.

### 0.0.4
- Correctly support room names without prepending slash

### 0.0.3
- Update package.json with correct git repository link

### 0.0.2
- Updates to package.json to add more useful fields and description
- Updates to README so it doesn't read like a repository on npm

### 0.0.1
- Initial release of the JavaScript SDK
