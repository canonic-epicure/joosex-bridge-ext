StartTest(function(t) {
    
    //==================================================================================================================================================================================
    t.diag("Using original `extend`")
    
    
    var SomeClass = function () {
        SomeClass.superclass.constructor.apply(this, arguments)
    }
    
    Ext.extend(SomeClass, Ext.Panel, {
        
        res : function () {
            return 'res'
        }
    })

    
    var panel = new SomeClass({
        width       : 300,
        height      : 300,
        renderTo    : Ext.getBody()
    })
    
    t.isa_ok(panel, Ext.Panel, "Correct inheritance")
    
    t.ok(panel.el.dom, "Panel was rendered correctly")
    
    t.ok(panel.res() == 'res', 'Correctly added new method')

    t.done()
})    