StartTest(function(t) {

    t.plan(1)
    
    // ==================================================================================================================================================================================
    t.diag("Custom grid column")
    
    Class('Ext.grid.ComboBoxColumn', {
        
        isa : Ext.grid.Column
    })
    
    t.ok(Ext.grid.ComboBoxColumn, "Class 'Ext.grid.ComboBoxColumn' was created")
})