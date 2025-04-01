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
        .click('nav > menu > li:nth-child(1) > button')
        .click('li:nth-child(2) > button:nth-child(1) > div:nth-child(1) > div:nth-child(3) > h2:nth-child(1)')
        .assert.textContains('a.text-lg', 'CMS Essentials Azure Customers')
        },

        '@tags':[], 
        'Scenario 2: Searching for an invalid element':function(client){
            client
            .setValue('input[type="search"]','Testing')
            .assert.textContains('p.text-red','No items found')
         },

        '@tags':[],
        'Scenario 3: Search for a valid element':function(client){
            client
            .setValue('input[type="search"]','DevOlairSoares')
            .assert.textContains('tbody tr td:nth-child(1)','DevOlairSoares')            
        },

       
        '@tags':[],
        'Scenario 4: Helper display':function(client){
            client
            .click('td.text-center button')
            .setValue('input[placeholder="Please Select Tenant"]',['ff1d900f-f7d9-4fc9-a682-e36da465bc51',client.Keys.ENTER])
            .assert.textContains('h1.text-center','DevOlairSoares - Subscriptions')
            .click('span.text-magentablue')
            .setValue('input[autocapitalize="none"]',['Failure Anomalies - funcolr2',client.Keys.ENTER])
            .setValue('textarea#description','Testing')
            .click('button.bg-magentablue')
            .click('tbody tr:nth-child(1) td:nth-child(2) div:nth-child(1) button:nth-child(1) span:nth-child(1)')
            .setValue('input[placeholder="Please select"]',['Help me understand my Free Trial charges', client.Keys.ENTER])
            .click(':nth-child(4) div:nth-child(1) button:nth-child(1) span:nth-child(1)')
            .windowHandles(function(result){
                const newTab = result.value[1];
                client.switchWindow(newTab)
            })
            .waitForElementVisible('button.rounded-lg',5000)
            .assert.textContains('div.text-sm p','The solution was successfully implemented')
        }

    }
    
    