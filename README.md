## Simple OAuth 2.0 server and client example

### OAuth provider

Provider is written with intent supporting only `password grant`, which exchanges user and password for access token,
skipping request token and authenticating on web page.

This scheme is recommended only for first-party apps, but is sufficient for my current needs.

Provider is developed in Node.js, based on https://github.com/nightworld/node-oauth2-server/. Access tokens are stored
in local MongoDB database named oauth_test in oauth_tokens collection. Client ID is hardcoded to '12345' and valid user/password 
pair is foo/bar.

### Client

Client is based on well known Scribe library. It unfortunately does not support password grant flow, but still is usable.
Request signing part is reused from Scribe, but obtaining access token had to be implemented separately.


### Running

1.	npm install in node-provider
2.  Import provided requests for Postman (Chrome extension) or
3.	Use Java client (by just running main class).

