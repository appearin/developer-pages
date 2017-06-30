---
title: appear.in - Developer API
description: Ever wanted to have video communication on your web page, but couldn’t figure out how to set it up easily? The appear.in Developer API is just as easy to use as appear.in, just copy, paste and publish. Instant video chat on any web page.
template: index.html
---

<p class="alert alert-danger">The embedded version and the Developer SDK has been shut down.</p>

<p class="ingress">
The API has been shut down on June 30th 2017. Existing installs will
continue to work, but may cease to function without notice. It is recommended
that you move away from the appear.in API as soon as possible.
</p>

For websites that currently have the embed version running, there will be no
change to the code. However, users that enter the room name that is indicated
in the code, will now be taken to a new tab with the video room, instead of
opening directly on your web page.

The following options will still be able available to utilize appear.in with
your website:
- You can keep the embed code from the API as is today, but instead of opening
  within your website itself, a new tab will open.
- You can create a custom button on your site that links to an appear.in room
  of your choice.

## SDK Changelog
The following is a changelog for the JavaScript SDK.

### 0.0.5
- Add deprecation warning prompting users to migrate away from the API

### 0.0.4
- Correctly support room names without prepending slash

### 0.0.3
- Update package.json with correct git repository link

### 0.0.2
- Updates to package.json to add more useful fields and description
- Updates to README so it doesn't read like a repository on npm

### 0.0.1
- Initial release of the JavaScript SDK
