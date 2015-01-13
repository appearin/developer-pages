---
title: appear.in Developer API
description: Documentation and resources for the appear.in Developer API.
template: index.html
---

<p class="ingress">Ever wanted to have video conferencing in your project, but
couldn't bother to deal with all the complicated stuff?</p>

With appear.in, all you need to do is copy and paste this HTML element to your page, and we
will deliver video chat for free, to up to 8 people at the same time.

```html
<iframe src="https://appear.in/your-room-name" width="800" height="640">
```

## Demo

Below is a demo of what you can expect to see on your on page. It just works
right out of the box, just like appear.in!

<div id="demo-room"></div>

## Advanced usage
If you want more advanced usage, such as guaranteed empty and random room names,
or a compatability check for your users, you can use our JavaScript SDK.

Add the following at the bottom of your body tag to start using it.

```html
<script src="//developer.appear.in/scripts/appearin-sdk.0.0.1.min.js"></script>
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

## JavaScript SDK documentation
The following is an overview of the API methods present in the JavaScript SDK.

### new AppearIn(*config)
Whether you use the standalone JavaScript distribution, or the NPM package, you
have to initiate the SDK with the constructor. We do this to allow for passing
an optional config. Currently no such options exist, but in the future we expect
this config to contain API keys or other config options common for all usage.

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
appearin.getRandomRoomName(function (roomName) {
    // do something with the roomName
});
```

### appearin.addRoomToIframe(iframe, roomName)
We also provide a convenience function to attach a room to an IFrame DOM
Element. `addRoomToIframe` takes two arguments:
1. `iframe`, which must be an IFrame DOM Element
2. `roomName`, which must be a valid roomName

```javascript
var iframe = document.getElementById("iframe-element-id");
var roomName = "sly-koala";
appearin.addRoomToIframe(iframe, roomName);
```

### appearin.addRoomToElementById(elementId, roomName)
Similar to addRoomToIframe, we provide a convenience function to add the room to
an IFrame DOM Element through the use of the id, similar to how `getElementById`
works. `addRoomToElementById` takes two arguments:
1. `elementId`, which must be a unique ID to an IFrame DOM Element
2. `roomName`, which must be a valid roomName

If the ID doesn't exists, we will simply return.

```javascript
var roomName = "cool-panda";
appearin.addRoomToElementById("iframe-element-id", roomName);
```

## FAQ

Here are some frequently asked questions about our API offering. We hope you can
find the answer you are looking for!

#### Does the API cost anything, or are you planning on charging for it?

As the API stands today, that is, the ability to embed any room into your page,
is completely free of charge for unlimited usage. We have no plans now or in the
future to charge for this basic functionality. However, we reserve the right to
change the offering, or to charge for additional services in the future.

#### Is the API [HIPAA](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act) compliant?

As it stands currently, appear.in is not fully HIPAA compliant. However, we are
working with a few vendors to find a way towards HIPAA compliance so that the
API can be used in telemedicine fields etc. The best way to track progress is to
follow our [developer mailing list](http://comoyo.us2.list-manage1.com/subscribe?u=5919921b6414f5578ff5b7750&id=71f4283079),
or send us an email at [api@appear.in](mailto:api@appear.in).

#### Can I remove the "You are about to enter an appear.in video chat" prompt?

Unfortunately, you cannot remove or skip the prompt. The prompt is there for
security reasons. This is due to Chrome auto-approving request for media on
HTTPS sites, which means in short that if the user has approved access to
audio/video on appear.in once, it will get approved every subsequent time,
without user interaction. For the browser, it looks like the request for webcam
access comes from appear.in, even though appear.in is embedded on another page.
This means that to protect our users, we must implement a prompt screen to get
explicit access in these cases, as the embedded iframe can easily be hidden by
an attacker wanting to spy on visitors on the page.

## SDK Changelog
The following is a changelog for the JavaScript SDK.

### 0.0.1
- Initial release of the JavaScript SDK
