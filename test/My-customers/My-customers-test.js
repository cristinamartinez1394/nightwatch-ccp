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
        .click('li:nth-child(2) button:nth-child(1)')
        .click('.font-medium.text-base.false')
        .assert.textContains('p.items-center', 'Customers')
        },
        
        '@tags':[],
        'Scenario 2: Search for an element that does not exist':function(client){
            client
            .waitForElementVisible('input[type="search"]',30000)
            .setValue('input[type="search"]','Is only a test')
            .assert.textContains('p.text-red','No items found')
        },

        '@tags':[],
        'Scenario 3: Search for a valid element':function(client){
            client
            .setValue('input[type="search"]','ProFlex')
            .assert.textContains('td.column','ProFlex')
        },

        '@tags':[],
        'Scenario 4: Display informational message indicating that no PEC information is enabled':function(client){
            client
            .click('td.text-center>div>button')
            .assert.textContains('div.text-sm p','Customer PEC was not found')
        },
    }
    
    