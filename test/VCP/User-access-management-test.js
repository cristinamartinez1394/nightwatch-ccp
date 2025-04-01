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
    'Scenario 1: Display the main screen':function(client){
        client
        .waitForElementVisible('h1.flex',30000)
        .assert.textContains('h1.flex', 'welcome to the Cloud Control Platform')
        .click('button[type="button"] span')
        .click('li:nth-child(10) button:nth-child(1)')
        .click('h2.text-sm.font-normal.false')
        .assert.textContains('p.items-center', 'User Access Management')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            //User
            .setValue('input.w-full','Andres')
            .assert.textContains('td.whitespace-normal', 'Andres')

            //Operator
            .click('ul > li:nth-child(2) > button')
            .setValue('input.w-full','Jonas')
            .assert.textContains('td.whitespace-normal', 'Jonas')

            //Administrator
            .click('ul:nth-child(1) > li:nth-child(3) > button:nth-child(1)')
            .setValue('input.w-full','Aura')
            .assert.textContains('td.whitespace-normal', 'Aura')

        },

        '@tags':[],
        'Scenario 3: Search for an invalid element':function(client){
            client
            //User
            .click('ul:nth-child(1) > li:nth-child(1) > button:nth-child(1)')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')

            //Operator
            .click('ul > li:nth-child(2) > button')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')

            //Administrator
            .click('ul:nth-child(1) > li:nth-child(3) > button:nth-child(1)')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')
        }
    }