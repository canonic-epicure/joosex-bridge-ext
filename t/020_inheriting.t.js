StartTest(function(t) {
    
	t.plan(9)
    
    //==================================================================================================================================================================================
    t.diag("Subclassing of native classes")
    
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
        width : 300,
        height : 300,
        renderTo : Ext.getBody()
    })
    
    t.ok(panel.el.dom, "Panel was rendered correctly")
    
    t.ok(panel.meta.hasMethod('setTitle'), "Setter for 'title' attribute was created")
    t.ok(panel.meta.hasMethod('getTitle'), "Getter for 'title' attribute was created")
    t.ok(panel.title == 'Joosified', "'title' attribute was initialized correctly")
    t.ok(panel.getTitle() == 'Joosified', "'title' attribute was initialized correctly")

    
    //==================================================================================================================================================================================
    t.diag("'xtype' builder")
    
    Class('myPanel2', {
        xtype : 'mypanel',
        
        isa : Ext.Panel,
        
        has : {
            title : {
                is : 'rw',
                init : function () {
                    return 'Joosified1'
                }
            }
        }
    })
    
    t.ok(myPanel2, "'myPanel2' class was created")
    
    var panel2 = Ext.ComponentMgr.create({
        xtype : 'mypanel',
        
        width : 300,
        height : 300,
        renderTo : Ext.getBody()
    })
    
    t.ok(panel2, "Instance was created")
    
    t.ok(panel2 instanceof myPanel2, "And it belongs to correct class")
})    