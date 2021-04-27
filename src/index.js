var webdriver = require('selenium-webdriver');
var AWS = require('aws-sdk');

export default {
    // Multiple browsers support
    isMultiBrowser: true,
    seleniumServer: null,
    openedBrowsers: {},
    async getHubUrl () {
        var PROJECT_ARN = '';
        var devicefarm = new AWS.DeviceFarm({ region: 'us-west-2' });

        const data = await devicefarm.createTestGridUrl({
            projectArn: PROJECT_ARN, expiresInSeconds: 600
        }).promise();

        return data.url;
    },


    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl) {
        const browser = await new webdriver.Builder()
            .usingServer(this.seleniumServer)
            .withCapabilities({ browserName: 'chrome' })
            .build();

        console.log('id ===> ', id);
        console.log('pageUrl ===> ', pageUrl);

        await browser.get(pageUrl);
        this.openedBrowsers[id] = browser;
    },

    async closeBrowser (id) {
        if (this.heartbeatInterval > 0) 
            this.stopHeartbeat(id);
           
        await this.openedBrowsers[id].quit();
    },


    // Optional - implement methods you need, remove other methods
    // Initialization
    async init () {
        this.seleniumServer = await this.getHubUrl();
    },

    async dispose () {
        return;
    },

    
    // Browser names handling
    async getBrowserList () {
        throw new Error('Not implemented!');
    },

    async isValidBrowserName (/* browserName */) {
        return true;
    },
    

    // Extra methods
    async resizeWindow (/* id, width, height, currentWidth, currentHeight */) {
        this.reportWarning('The window resize functionality is not supported by the devicefarm browser provider.');
    },

    async takeScreenshot (/* id, screenshotPath, pageWidth, pageHeight */) {
        this.reportWarning('The screenshot functionality is not supported by the devicefarm browser provider');
    }
};
