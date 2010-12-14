StartTest(function(t) {
    
    //==================================================================================================================================================================================
    t.diag("Subclassing of native classes")
    
    Class('My.Panel', {
	    isa : Ext.Panel,
	    
        has : {
            attr : {
                is : 'rw'
            }
        },
        
        methods : {
            
            setAttr : function (value) {
                this.hiddenSideEffect = value
            }
        }
	})
    
    t.ok(My.Panel, "'My.Panel' class was created")
    
    var panel = new My.Panel({
        width       : 300,
        height      : 300,
        renderTo    : Ext.getBody(),
        
        attr        : 'foo'
    })
    
    t.ok(panel.el.dom, "Panel was rendered correctly")

    t.done()
})    