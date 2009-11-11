StartTest(function(t) {

    t.plan(6)
    
    // ==================================================================================================================================================================================
    t.diag("Creating an Ext class, promoted from module")
    
    Module('My.Container', {
    })
    
    t.ok(My.Container, "Class 'My.Container' was created")
    t.ok(My.Container.meta instanceof Joose.Namespace.Keeper, '.. and its a Module')
    
    Class('My.Container', {
        isa : Ext.Container
    })
    
    t.ok(My.Container.meta instanceof JooseX.Bridge.Ext, '.. and it was successfully promoted to the class')

    
    // ==================================================================================================================================================================================
    t.diag("Further subclassing")

    
    Class('Also.My.Container', {
        
        isa : My.Container
    })
    
    t.ok(Also.My.Container, "Class 'Also.My.Container' was created")

    
    // ==================================================================================================================================================================================
    t.diag("Instantiation #1")

    var cont = new My.Container()
    
    t.ok(cont, "'My.Container' was successfully instantiated")

    
    // ==================================================================================================================================================================================
    t.diag("Instantiation #2")
    
    var cont2 = new Also.My.Container()
    
    t.ok(cont2, "'Also.My.Container' was successfully instantiated")
    
})