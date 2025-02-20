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
        .click('nav > menu > li:nth-child(1) > button')
        .click('div:nth-child(1) > div:nth-child(2) > p:nth-child(2)')
        .assert.textContains('a.black', 'CMS Advanced Azure Customers')
        },

        '@tags':[],
        'Scenario 2: Search for a valid element':function(client){
            client
            .setValue('input[type="search"]','DevOlairSoares')
            .assert.textContains('tbody tr td:nth-child(2)','DevOlairSoares')            
        },

        '@tags':[], 
        'Scenario 3: Searching for an invalid element':function(client){
            client
            .setValue('input[type="search"]','Testing')
            .assert.textContains('p.text-red','No items found')
         },

        '@tags':[], 
        'Scenario 4: Display details of the “Governance” option':function(client){
            client
            .setValue('input[type="search"]','DevOlairSoares')
            .click('button span[class="whitespace-nowrap hover:font-semibold"]')
            .assert.textContains('h2.text-lg','Governance Service Details')
         },

        '@tags':[], 
        'Scenario 5: Display details of the "AzureNativeBackup" option':function(client){
            client
            .click('section.bg-white span')
            .moveToElement('a.black',1,10)
            .click('a[class="pointer-events-auto"] span[class="whitespace-nowrap hover:font-semibold"]')
            .assert.textContains('div.block h2','Customer SCU')
         },

         '@tags':[],
         'Scenario 6: Add a new service':function(client){
            client
            .click(':nth-child(2) > div:nth-child(1) > a:nth-child(2)')
            .click('li:nth-child(3) > button:nth-child(1) > span:nth-child(2)')
            .assert.textContains('h2.text-lg','Add Service')
         
         }

        }