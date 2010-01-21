Class('JooseX.Bridge.Ext', {
    
    meta : Joose.Meta.Class,
    isa : Joose.Meta.Class,
    
    methods : {
        
        defaultConstructor : function () {
            var jooseConstructor = this.SUPER()
            
            this.adaptConstructor(jooseConstructor)
            
            return function () {
                
                var self = this
                
                if (!this.__JOOSE_INIT_DONE__) {
                    this.__JOOSE_INIT_DONE__ = true
                    
                    self = jooseConstructor.apply(this, arguments) || self
                }
                
                var superClass = arguments.callee.meta.superClass
                
                if (superClass != self.meta.defaultSuperClass) superClass.apply(self, arguments)
                
                return self
            }
        }
        
    },
    
    
    before : {
        
        prepareProps : function (extend) {
            if (extend.xtype) 
                Ext.reg(extend.xtype, this.c)
            else
                if (this.name) Ext.reg(this.name, this.c)
                
            delete extend.xtype
        },
        
        
        processSuperClass: function (superClass) {
            var superProto = superClass.prototype
            
            this.c.superclass   = superProto
            
            if (!superClass.meta) {
                
                var helperClass = new this.defaultSuperClass.meta.constructor(null, superProto).c
                
                superClass.meta = helperClass.meta
                
                superProto.meta = helperClass.meta
                superProto.constructor = superClass
                
                superClass.meta.c = superClass
                
                if (!superProto.initialize) Ext.applyIf(superProto, this.defaultSuperClass.prototype)
            }
        }
        
    },
    
    
    my : {
        
        methods : {
            
            extend : function (subClass, superClass, extend) {
                
                if (typeof superClass == 'object'){
                    extend = superClass
                    superClass = subClass
                    subClass = null
                }
                
                if (superClass == Object) superClass = Joose.Meta.Object
                
                
                var subExtend = { 
                    isa : superClass, 
                    methods : {},
                    have : {}
                }
                if (subClass) subExtend.constructor = subClass
                if (extend && extend.hasOwnProperty('constructor')) subExtend.constructor = extend.constructor
                
                Joose.O.eachOwn(extend || {}, function (value, name) {
                    if (name != 'meta' && name != 'constructor') 
                        if (typeof value == 'function' && !value.meta) subExtend.methods[name] = value; else subExtend.have[name] = value
                })
                
                return new JooseX.Bridge.Ext(null, subExtend).c
            }
        
        }
        
    }

})


Joose.Namespace.Manager.my.register('ExtClass', JooseX.Bridge.Ext)



/**

Name
====


JooseX.Bridge.Ext - metaclass, allowing you subclass ExtJS classes using Joose notation (or modify standard ExtJS classes) 


SYNOPSIS
========

        <!-- Joose  -->
        
        <script type="text/javascript" src="/jsan/Task/Joose/Core.js"></script>
    
        <!-- Ext bridge  -->
        
        <script type="text/javascript" src="/jsan/Task/ExtJS/Adapter/Ext.js"></script>
        
        <script type="text/javascript" src="/jsan/JooseX/Bridge/Ext.js"></script>
        <script type="text/javascript" src="/jsan/JooseX/Bridge/Ext/[Lazy]Convertor.js"></script>
        
        <script type="text/javascript" src="/jsan/Task/ExtJS/All.js"></script>
        
        <!-- eof Ext bridge  -->
        


        Class('Test.Run.Harness.Browser.UI.TestGrid', {
        
            xtype   : 'testgrid', 
            
            isa     : Ext.grid.GridPanel,
            
            does    : ExtX.Some.Role.For.Grid,
            
            ....
        })
        
        
        Ext.Container.meta.extend({
            does : ExtX.Some.Role.For.Container
        })
        


DESCRIPTION
===========

`JooseX.Bridge.Ext` is a custom metaclass, which bridges the class system of ExtJS framework to Joose (or vice-versa, as you prefer).

It transparently turns all ExtJS classes into Joose classes, and allows you to use any of Joose features for them.
Pleas refer to Joose [documentation](http://openjsan.org/go/?l=Joose), to know why you might want to do that :) 


EXAMPLES
========

        ExtClass('My.Panel', {
            isa : Ext.Panel
        })
        

        // equivalent of:
        
        Class('My.Panel', {
            meta : JooseX.Bridge.Ext,
            
            isa : Ext.Panel
        })
        
        
        // automatically register the class with its name as default xtype:
        
        var panel = Ext.ComponentMgr.create({
            xtype : 'My.Panel'
        })
        
        
        // "meta : JooseX.Bridge.Ext" - can be omitted, custom xtype can be specified:

        Class('Test.Run.Harness.Browser.UI.TestGrid', {
        
            xtype   : 'testgrid', //custom xtype
            
            isa     : Ext.grid.GridPanel,
            
            does    : ExtX.Some.Role.For.Grid,
            
            trait   : JooseX.CPS,
            
            
            has : {
                harness   : {
                    is          : 'rw',
                    required    : true
                }
            },
            
            
            before : {
                initComponent : function () {
                    var sm = new Ext.grid.CheckboxSelectionModel({ singleSelect : false })
                    
                    this.addEvents('rowselect')
                    
                    Ext.apply(this, {
                        ....
                    })
                }
            },
            
            
            after : {
                initComponent : function () {
                    ....
                }
            },
            
            
            methods : {
                
                onRowSelect : function (selModel, indx, record) {
                    this.fireEvent('rowselect', this, record)
                }
            }
            
        })

USAGE
=====

First, include Joose on your page. Then, between ExtJS adapter and main sources, insert this package and one of the convertors.

This package comes with two convertors : `JooseX.Bridge.Ext.Convertor` and `JooseX.Bridge.Ext.LazyConvertor`.

The 2nd convertor requires `JooseX.Meta.Lazy` installed, and makes all classes lazy. Please refer to `JooseX.Meta.Lazy` 
[documentation](http://openjsan.org/go?l=JooseX.Meta.Lazy) for details.

See the above for examples how you can use new metaclass.


`xtype` builder
---------------

You can use new builder `xtype` in your class declaration. It will register your class with `Ext.reg` call.
If you will not specify `xtype`, your class will be registered using its name. 


Metaclass inheritance
---------------------

By default, when Joose class inherit from superclass, it will be created using the metaclass of the parent.
So generally, when subclassing ExtJS classes you can omit the metaclass (the 3rd example). Sometimes though,
the metaclass needs to be explicitly specified (see [Explicit metaclass specification])



CAVEATS
========

Make sure you've read this section if you have any problems using the bridge.


Initial attribute values and setters
------------------------------------

This metaclass unifies two class systems, which uses different approaches to class construction. Thus appears some caveats.

Joose provides system constructor for classes and classes should use `BUILD` and `initialize` for initialization ([details](http://openjsan.org/go?l=Joose.Manual.Construction)) 
Joose also uses getters and setters concepts.

Lightweight class system of ExtJS, simply calls the constructor of superclass. ExtJS applies provided configuration
values directly to instance.

This metaclass first calls default Joose constructor, then the constructor from ExtJS.  

This means, that your class will be initialized "in Joose way" first, using any custom setter methods.
Then, it will be initialized "in ExtJS way", effectively overriding the initial values from previous step.
Also, the native setter method may be called too early - before the ExtJS constructor.

For example this declaration will throw an exception:

        Class('My.Panel', {
            isa : Ext.Panel,
            
            has : {
                title : {
                    is : 'rw',
                    init : 'Joosified'
                }
            }
        })

`Ext.Panel` have `setTitle` method, which Joose treats like setter, and tries to initialize the attribute with it (before call to ExtJS constructor).
However the call to `setTitle` relies on already initialized instance (it will fire the 'titlechange' event), so 
the exception raise.

The solution for such situations will be to use basic attributes, which do not have getters and setters:

        Class('My.Panel', {
            isa : Ext.Panel,
            
            have : {
                title : 'Joosified'
            }
        })
        
[Details on Joose attributes](http://openjsan.org/go?l=Joose.Manual.Attributes)


Explicit metaclass specification
--------------------------------

Some of the classes in ExtJS framework are defined outside of its class system, using "raw JavaScript".
Such classes will have the low-level metaclass `Joose.Proto.Class`. If you will inherit from such class, 
you will need to explicitly specify the metaclass, to use any advanced Joose feature. This should be a rare case
for Ext >3.0, but still.

An example will be inheritance from Ext.Template:

        Class('My.Template', {
            //explicit metaclass
            meta : JooseX.Bridge.Ext,
            
            isa : Ext.Template
        })


GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/joosex-bridge-ext/issues](http://github.com/SamuraiJack/joosex-bridge-ext/issues)

For general Joose questions you can also visit #joose on irc.freenode.org or the forum at: [http://joose.it/forum](http://joose.it/forum) 


SEE ALSO
========

[http://github.com/SamuraiJack/joosex-bridge-ext/](http://github.com/SamuraiJack/joosex-bridge-ext/)

Web page of this package

[http://openjsan.org/go/?l=Joose](http://openjsan.org/go/?l=Joose)

General documentation for Joose


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/joosex-bridge-ext/issues](http://github.com/SamuraiJack/joosex-bridge-ext/issues)



AUTHORS
=======

Nickolay Platonov [nplatonov@cpan.org](mailto:nplatonov@cpan.org)



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/