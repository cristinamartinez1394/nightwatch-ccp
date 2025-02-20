const Constants  = require("../General-class/Constants")
module.exports = class CustomComands {
    constructor(browser){
        this.browser = browser;
    }

    login(user, password){
        this.browser
        .url(Constants.URLS.DEV_URL)
        .maximizeWindow()
        .click('input[value="Cancel"]')
        .click('div#otherTileText')
        .setValue('input[name="loginfmt"]',user)
        .click('input[data-report-event="Signin_Submit"')
        .setValue('input[name=passwd]',password)
        .click('input[data-report-event="Signin_Submit"')
        .assert.textContains('h1.flex', 'welcome to the Cloud Control Platform')
        return this;
    }

}