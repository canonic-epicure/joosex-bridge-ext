StartTest(function(t) {
    
	t.plan(12)
    
    //==================================================================================================================================================================================
    t.diag("Subclassing of native classes")
    
    Class('myPanel', {
	    isa : Ext.Panel,
	    
        has : {
            attr : {
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
    
    t.ok(panel.meta.hasMethod('setAttr'), "Setter for 'attr' attribute was created")
    t.ok(panel.meta.hasMethod('getAttr'), "Getter for 'attr' attribute was created")
    t.ok(panel.attr == 'Joosified', "'title' attribute was initialized correctly")
    t.ok(panel.getAttr() == 'Joosified', "'title' attribute was initialized correctly")

    
    //==================================================================================================================================================================================
    t.diag("'xtype' builder")
    
    Class('myPanel2', {
        xtype : 'mypanel',
        
        isa : Ext.Panel,
        
        has : {
            attr : {
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
    
    
    
    //==================================================================================================================================================================================
    t.diag("Default 'xtype' builder - name of class")
    
    Class('My.Panel', {
        isa : Ext.Panel,
        
        has : {
            attr : {
                is : 'rw',
                init : function () {
                    return 'Joosified1'
                }
            }
        }
    })
    
    t.ok(My.Panel, "'My.Panel' class was created")
    
    var panel3 = Ext.ComponentMgr.create({
        xtype : 'My.Panel',
        
        width : 300,
        height : 300,
        renderTo : Ext.getBody()
    })
    
    t.ok(panel3, "Instance was created")
    
    t.ok(panel3 instanceof My.Panel, "And it belongs to correct class")
    
})    