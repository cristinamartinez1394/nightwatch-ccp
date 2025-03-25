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
    'Scenario 1: Display of the main screen':function(client){
        client
        .waitForElementVisible('h1.flex',30000)
        .assert.textContains('h1.flex', 'welcome to the Cloud Control Platform')
        .click('button[type="button"] span')
        .click('div:nth-child(3) > h2:nth-child(1)')
        .click('li:nth-child(5) > button:nth-child(1) > div:nth-child(1) > div:nth-child(3) > h2:nth-child(1)')
        .assert.textContains('p.items-center', 'CMS Advanced Azure Policy Controls')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            .setValue('input[type="search"]','Resource logs in IoT Hub should be enabled')
            .assert.textContains('td.whitespace-normal','Resource logs in IoT Hub should be enabled')            
        },

        '@tags':[], 
        'Scenario 3: Searching for an invalid element':function(client){
            client
            .setValue('input[type="search"]','Testing')
            .assert.textContains('p.text-red','No items found')
         },

         '@tags':[],
         'Scenario 3: Add a new record':function(client){
            client
            .click('button.primary')
            .assert.textContains('h2.text-lg','Add Azure Policy')
            .setValue('input#policyId','383856f8-de7f-44a2-81fc-e5135b5c2aa5')
            .setValue('input#policyName','Automation policy')
            .setValue('input[autocapitalize="none"]',['Medium',client.Keys.ENTER])
            .setValue('input[placeholder="Please select"]',['ISO',client.Keys.ENTER])
            .setValue('input[placeholder="Please select"]',['Manual',client.Keys.ENTER])
            .setValue('input[placeholder="Please select"]',['AWS',client.Keys.ENTER])
            .click('button#submit-button')
            .assert.textContains('div.text-sm p','The azure policy control was created.')
         },

         '@tags':[],
         'Scenario 4: Edit a record':function(client){
            client
            .setValue('input[type="search"]','383856f8-de7f-44a2-81fc-e5135b5c2aa5')
            .click('span.cursor-default')
            .click('ul.flex span')
            .assert.textContains('h2.text-lg','Edit Azure Policy')
            .setValue('input#policyName','Automation policy - Edit')
            .click('button#submit-button')
            .assert.textContains('div.text-sm p',' The azure policy control was updated.')
         },

         '@tags':[],
         'Scenario 5: Delete a record':function(client){
            client
            .click('span.cursor-default')
            .click('span[class*="text-red-"]')
            .assert.textContains('h2.text-lg','Delete confirmation')
            .click('button.danger-primary')
            .assert.textContains('div.text-sm p','the record has been successfully removed')
         }

        
    }