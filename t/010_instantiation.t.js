StartTest(function(t) {
	t.plan(7)
	
    //==================================================================================================================================================================================
    t.diag("Sanity")    
	
    t.ok(Ext, "Ext is here")
    t.ok(JooseX.Bridge.Ext, "JooseX.Bridge.Ext is here")
    
    
    //==================================================================================================================================================================================
    t.diag("Basic instantiation")
    
    t.ok(new Ext.Panel({ title : 'Joose' }), 'Panel was created')
    t.ok(new Ext.data.Store(), 'Store was created')
    
    t.ok(new Ext.data.Store(), 'Store was created')
    
    
    //==================================================================================================================================================================================
    t.diag("'Joosification' of native classes")
    
	Role('Joosificator', {
	    before : {
	        render : function(){
	            this.title = 'Joosified! ' + this.title;
	        }
	    }
	});
	
	Ext.Window.meta.extend({
	    does : [ Joosificator ]
	});
    
    var win2 = new Ext.Window({
        title : 'Joose Bridge',
        width : 300,
        height : 300
    });
    
    win2.show();
    
    t.ok(win2.title == 'Joosified! Joose Bridge', 'Ext.Window were jusified')
    
    
    //==================================================================================================================================================================================
    t.diag("Subclassing of native classes")
    
    ExtClass('myPanel', {
	    isa : Ext.Panel,
	    
	    does : [ Joosificator ]
	});
    
    var panel = new myPanel({
        title : 'myPanel',
        width : 300,
        height : 300,
        renderTo : Ext.getBody()
    });
    
    t.ok(panel.title == 'Joosified! myPanel', 'myPanel was succefully subclassed from Ext.Panel')
    
})    