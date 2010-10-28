var Harness
var isNode        = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
    title     : 'JooseX.Bridge.Ext Test Suite',
    
    preload : [
        'jsan:Task.Joose.Stable',
        
        "jsan:Task.ExtJS.Adapter.Ext",
        
        'JooseX.Bridge.Ext',
        'JooseX.Bridge.Ext.Convertor',
        
        "jsan:Task.ExtJS.All"
    ]
})


Harness.start(
    '010_instantiation.t.js',
    '020_inheriting.t.js',
    '030_instantiation_with_traits.t.js',
    '040_custom_grid_column.t.js',
    '041_extclass_promoted_from_module.t.js'
)

