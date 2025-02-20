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
        .click('li:nth-child(4) > button:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)')
        .assert.textContains('a.text-lg', 'Value Type')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            .setValue('input.w-full','IT Security Risk Infra')
            .assert.textContains('button.text-magentablue', 'IT Security Risk Infra')
        },

        '@tags':[],
        'Scenario 3: Search for an invalid element':function(client){
            client
            .click('input.w-full')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')
        },

        '@tags':[],
        'Scenario 4: Create a new value type':function(client){
            let valueTypeName = Math.floor(Math.random()*200)
            client
            .click('button.rounded-lg')
            .assert.textContains('h2.text-lg','Add New Value Type')
            .setValue('input[data-testid="verticalInput"]',['Automation test'+ valueTypeName])
            .setValue('input[placeholder="Value name"]',['Automation' + valueTypeName])
            .click('button#submit-button')
            .assert.textContains('div.text-sm p','The value type was created')
        },
        
        '@tags':[],
        'Scenario 5: Editing a record in Value type':function(client){
            client
            .waitForElementVisible('input.w-full',10000)
            .setValue('input.w-full','Automation')
            .click('span.cursor-default')
            .click('ul.flex-col span')
            .assert.textContains('h2.text-lg', 'Edit Value Type')
            .setValue('textarea[name="description"]','Is an update test')
            .click('button#submit-button')
            .assert.textContains('div.text-sm p','The value type was updated.')
        },

        '@tags':[],
        'Scenario 6: Delete the record':function(client){
            client
            .click('span.cursor-default')
            .click('.text-red-200')
            .assert.textContains('h2.text-lg','Delete confirmation')
            .click('button.danger-primary')
            .assert.textContains('div.text-sm p','value type has been successfully removed')
        },

    }
