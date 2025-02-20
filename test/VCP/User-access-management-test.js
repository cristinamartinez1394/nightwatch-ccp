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
        .click('div:nth-child(2) > h2:nth-child(1)')
        .assert.textContains('p.items-center', 'User Access Management')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            //User
            .setValue('input.w-full','Andres')
            .assert.textContains('td.whitespace-normal', 'Andres')

            //Operator
            .click(':nth-child(2) > span:nth-child(1)')
            .setValue('input.w-full','Jonas')
            .assert.textContains('td.whitespace-normal', 'Jonas')

            //Administrator
            .click('li:nth-child(3) > span:nth-child(1)')
            .setValue('input.w-full','Aura')
            .assert.textContains('td.whitespace-normal', 'Aura')

        },

        '@tags':[],
        'Scenario 3: Search for an invalid element':function(client){
            client
            //User
            .click('span.cursor-pointer')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')

            //Operator
            .click(':nth-child(2) > span:nth-child(1)')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')

            //Administrator
            .click('li:nth-child(3) > span:nth-child(1)')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')
        }
    }