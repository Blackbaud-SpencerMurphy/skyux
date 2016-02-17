---
name: Help
icon: question
summary: The help service allows Angular components to open and close the help panel programmatically.
---

The help service allows other Angular components to open or close the help panel programmatically. When the widget opens, it interrogates the page to identify the current help topic and display the relevant help content. Settings for this service are controlled with the `bbHelpConfig` object.

 ### Dependencies ###

 - **[easyXDM](http://easyxdm.net/wp/) (2.4.19 or higher)** Used to make cross-domain requests to the help server

---

### bbHelp Methods ###

- `init()` Adds a global help button to the top-right corner of the page.  The appropriate `bbHelpConfig` options should be supplied before calling `init()`.
- `open()` Opens help using the specified help key.  If `init()` has not yet been called then the global add button will be added to the page before opening the help topic.
- `close()` Closes the current help topic.

### bbHelpConfig Settings ###

 - `caseCentral` Optional. Can customize the Case Central URL if needed, or set to empty string to remove this link.
 - `clientId` Optional. Used to pass the client / site id to the chat session.
 - `communityUrl` Optional. Can be provided in order for a link to Community to appear.
 - `customLocales` Optional.  An array of additional locales for which the product has help content other than the default help content locale.  This array should contain strings like 'en-gb' or 'fr'.
 - `getChatData` Optional. Function that returns the appropriate chat key and website id to use for the product based on the user's locale. e.g.
   ```
   getChatData: function(userLocale) {
            if (locale === 'en-gb') {
                return {
                    key: '3674699029499270000',
                    websiteId: ' 3506212574036402816'
                };
            }
            return {
                key: ' 171147028994005462',
                websiteId: '2766361919244160000'
            };
        }
    ```
 - `getCurrentHelpKey` A function that returns the page's current help URL. This way, if a user navigates around your app, at any point clicking the help panel can call this to determine the appropriate help file to show. e.g. `function() { return 'myHelpFile.html'}`
 - `helpBaseUrl` Optional. Provide the base URL to your help files. If omitted, the productId will be inserted into the URL https://www.blackbaud.com/files/support/helpfiles/{ProductId}/content/ to construct the base URL.  This parameter override is available if help content must exist at some other path instead.
 - `knowledgebaseUrl` Optional. Can customize the knowledgebase URL if needed, or set to empty string to remove this link.
 - `onHelpLoaded` Optional. An callback function after the help panel is loaded.
 - `productId` The current product identifier used to build the URL to the product's help content.
 - `url` The URL to the Help Widget that will be included.
 - `userData` Optional. Object used to pass information about the current user to the chat session. e.g `{ emailAddress: '', firstName: '', lastName: ''}`