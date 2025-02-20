const CustomCommands  = require("../General-class/Login")
const Constants  = require("../General-class/Constants")
module.exports={
      
    before: function(client){
        console.log('before: Open the browser')
        const customCommands = new CustomCommands(client);
        customCommands.login(Constants.CREDENTIALS.USER, Constants.CREDENTIALS.PASSWORD)
    },
    
    after:function(client){
        console.log('after: Close the browser')
        client.end()
    },
    
    beforeEach:function(){
        console.log('beforeEach: Ejecutando step')
    },
    
    afterEach: function(){
        console.log('afterEach: Step ejecutado!')
    },

    '@tags':[],
    'Scenario 1: Display the main screen':function(client){
        client
        .waitForElementVisible('h1.flex',30000)
        .assert.textContains('h1.flex', 'welcome to the Cloud Control Platform')
        .click('button[type="button"] span')
        .click('li:nth-child(11) button:nth-child(1)')
        .click('li:nth-child(3) > button:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h2:nth-child(1)')
        .assert.textContains('a.text-lg', 'Value Report')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            .setValue('input.w-full','VCP Report')
            .assert.textContains('td.whitespace-normal', 'VCP Report')
        },

        '@tags':[],
        'Scenario 3: Search for an invalid element':function(client){
            client
            .click('input.w-full')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')
        },

        '@tags':[],
        'Scenario 4: Viewing the report':function(client){
            client
            .setValue('input.w-full','VCP Report')
            .click('span.text-magentablue')
            .assert.urlEquals('https://ccp-next-dev.softwareone.cloud/vcp/value-report/5290daf6-d5a9-47e3-a520-8f632d21a28a/78477dbb-f3a9-4429-8e11-bccaf1fcb4bc')
        }
    }