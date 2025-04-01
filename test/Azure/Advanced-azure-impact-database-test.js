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
        console.log('beforeEach: Executing step')
    },
    
    afterEach: function(){
        console.log('afterEach: Step Executed!')
    },
    
    '@tags':[],
    'Scenario 1: Display of the main screen':function(client){
        client
        .waitForElementVisible('h1.flex',30000)
        .assert.textContains('h1.flex', 'welcome to the Cloud Control Platform')
        .click('button[type="button"] span')
        .click('div:nth-child(3) > h2:nth-child(1)')
        .click('li:nth-child(4) > button:nth-child(1) > div:nth-child(1) > div:nth-child(3) > h2:nth-child(1)')
        .assert.textContains('.items-center.black.font-Poppins.text-lg.font-semibold', 'CMS Advanced Azure Impact Database')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            .setValue('input[type="search"]','Test Cristina Martinez')
            .assert.textContains('tbody tr td:nth-child(3)','Test Cristina Martinez')            
        },

        '@tags':[], 
        'Scenario 3: Searching for an invalid element':function(client){
            client
            .setValue('input[type="search"]','Testing')
            .assert.textContains('p.text-red','No items found')
         },

        '@tags':[], 
        'Scenario 4: Add a new record':function(client){
            client
            .click('button.primary')
            .assert.textContains('h2.text-lg','Add Impact Database')
            .setValue('input[name="customerSCU"]','XX-SCU-131194')
            .setValue('input[name="customerName"]','Automation database')
            .setValue('input[autocomplete="off"]',['No impact',client.Keys.ENTER])
            .setValue('input[name="resourceId"]','123')
            .setValue('input[name="resourceName"]','Automation resource name')
            .setValue('input[name="resourceType"]','Automaton resource type')
            .setValue('input[name="resourceNotes"]','Automation notes')
            .click('button#submit-button')
            .assert.textContains('div.text-sm p','The azure policy control was created.')
         },

         '@tags':[], 
        'Scenario 5: Edit a record':function(client){
            client
            .setValue('input[type="search"]','XX-SCU-131194')
            .click('span.cursor-default')
            .click('ul.flex span')
            .assert.textContains('h2.text-lg','Edit Impact Database')
            .setValue('input[name="customerName"]','Automation database - edit')
            .click('button#submit-button')
            .assert.textContains('div.text-sm p','The azure impact database was updated.')
         },

         '@tags':[],
         'Scenario 6: Delete a record':function(client){
            client
            .click('span.cursor-default')
            .click('span[class*="text-red-"]')
            .assert.textContains('h2.text-lg','Delete confirmation')
            .click('button.danger-primary')
            .assert.textContains('div.text-sm p','the record has been successfully removed')
         }

        }