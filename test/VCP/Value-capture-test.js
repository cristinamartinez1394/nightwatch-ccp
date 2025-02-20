const { assert } = require("nightwatch")
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
    'Scenario 1: Main Screen Display':function(client){
        client
        .waitForElementVisible('h1.flex',30000)
        .assert.textContains('h1.flex', 'welcome to the Cloud Control Platform')
        .click('button[type="button"] span')
        .click('li:nth-child(11) button:nth-child(1)')
        .click('li:nth-child(2) > button:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h2:nth-child(1)')
        .assert.textContains('a.text-lg', 'Value Capture')
        },

        '@tags':[],
        'Scenario 2: Search for an element by column':function(client){
            client
            .setValue('th:nth-child(3) > div > div > input','Digital Supply Chain')
            .assert.textContains('tbody tr:nth-child(1) td:nth-child(3)','Digital Supply Chain')
        },

        '@tags':[],
        'Scenario 3: Search for a valid element':function(client){
            client
            .setValue('input.w-full','Dev Integration')
            .assert.textContains('div.text-magentablue', 'Dev Integration')
            },
        
        '@tags':[],
        'Scenario 4: Search for an invalid element':function(client){
            client
            .click('input.w-full')
            .setValue('input.w-full','Testing123')
            .assert.textContains('p.text-red', 'No items found')
            },

        '@tags':[],
        'Scenario 5: Display of the record creation form':function(client){
            client
            .click('button.primary')
            .assert.textContains('div.items-center h2','Create Value Capture')
        },

        '@tags':[],
        'Scenario 6: Create a new value capture':function(client){
            client
            .setValue('input[data-testid="nameInput"','Automation test - Value Capture')
            .setValue('input[autocapitalize="none"]',['Colombia (SWO_CO)', client.Keys.ENTER])
            .setValue('div:nth-child(2) > div > div > div > div.value-container.svelte-1bhoqam > input',['SERVIENTREGA S.A.', client.Keys.ENTER])
            .setValue('div:nth-child(4) > div > div > div.value-container.svelte-1bhoqam > input',['SERVIENTREGA SA_SAMSimple_CO_Renewal', client.Keys.ENTER])
            .setValue('div:nth-child(4) > div:nth-child(1) > div > div.value-container.svelte-1bhoqam > input',['ITAM', client.Keys.ENTER])
            .setValue('div:nth-child(2) > div > div > div.value-container.svelte-1bhoqam > input',['IT security Test', client.Keys.ENTER])
            .setValue('input[data-testid="identifiedByInput"]','Automation nightwatch - test')
            .setValue('input#identificationDate','10/11/2024')
            .setValue('input#publisherName','Automation test')
            .setValue('input[data-testid="sourceInput"]','5000000')
            .setValue('input[placeholder="Please select"]',['COP', client.Keys.ENTER])
            .setValue('input[data-testid="amountInput"]','150000000')
            .click('button#submit-button')
            .assert.textContains('div.text-sm p','The value capture was created.')
        },
    
        '@tags':[],
        'Scenario 7: Editing a record in Value Capture':function(client){
           client
           .click('li:nth-child(2) > div > a')
           .waitForElementVisible('tbody tr:nth-child(1) td:nth-child(8)',30000)
           .setValue('input.w-full', 'Automation test - Value Capture')
           .click('a[class="hover:font-semibold"]')
           .click('span[class="icon-[mdi--pencil]"]')
           .assert.textContains('div.items-center h2','Edit Value Capture')    
           .setValue('input[data-testid="nameInput"','Automation test - Value Capture - EDIT')
           .setValue('input[data-testid="identifiedByInput"]','Automation nightwatch - test - EDIT')
           .click('button#submit-button')
           .assert.textContains('div.text-sm p','The value capture was updated.')
        },
    
        '@tags':[],
        'Scenario 8: Adding a value realization':function(client){
            client
            .click('section.notes-section span')
            .assert.textContains('header.flex h2','Add new realization')
            .setValue('input#createDate','10/12/2024')
            .setValue('div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > label:nth-child(1) > input:nth-child(1)','100000')
            .setValue('textarea[placeholder="Realization detail input"]','Automation test')
            .click(':nth-child(4) > div:nth-child(2) > button:nth-child(1)')
            .assert.textContains('div.text-sm p','The value realization was created.')        
        },
        
    '@tags':[],
    'Scenario 9: Delete the record':function(client){
        client
        .click('li:nth-child(2) > div > a')
        .waitForElementVisible('input.w-full',30000)
        .setValue(':nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)', 'Automation test - Value Capture')
        .assert.textContains('div.text-magentablue', 'Automation test - Value Capture - EDIT')
        .click('span[class*="text-red-"')
        .click('button.danger-primary')
        .assert.textContains('div.text-sm p','Automation test - Value Capture - EDIT value capture has been successfully removed')   
    }


}