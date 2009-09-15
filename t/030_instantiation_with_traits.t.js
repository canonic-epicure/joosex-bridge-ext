StartTest(function(t) {
    
	t.plan(1)
	
    
    //==================================================================================================================================================================================
    t.diag("Instantiation with traits")
    
    Class('myPanel', {
	    isa : Ext.Panel,
	    
        has : {
            title : {
                is : 'rw',
                init : function () {
                    return 'Joosified'
                }
            }
        }
	})
    
    t.ok(myPanel, "'myPanel' class was created")
    
    
    var panel = new myPanel({
        traits : Role({
            has : {
                attrViaTrait : null
            }
        }),
        
        attrViaTrait : 'traitValue',
        
        width : 300,
        height : 300,
        renderTo : Ext.getBody()
    })
    
    t.ok(panel, "Panel was instantiated")
    
    t.ok(panel.isDetached(), 'And its detached')
    
    
    t.ok(panel.meta.hasAttribute('attrViaTrait'), "Panel received the trait's attribute")
    t.ok(panel.attrViaTrait == 'traitValue', "... and it has correct value")

    
    t.ok(panel.el.dom, "Panel was rendered correctly")
})    