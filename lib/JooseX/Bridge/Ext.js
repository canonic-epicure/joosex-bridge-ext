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


JooseX.Bridge.Ext - metaclass, bridging the class system of the ExtJS framework to Joose (or vice-versa, as you prefere). 


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
        


DESCRIPTION
===========

`JooseX.Bridge.Ext` is a custom metaclass, which allows to bridge the class system of ExtJS framework to Joose.
It transparently turns all ExtJS classes into Joose classes. , and a


CAVEATS
========




USAGE
=====

First, include the Joose on your page. Then, between ExtJS adapter and main sources, insert this package and one of the convertors.
This package comes with two convertors : `JooseX.Bridge.Ext.Convertor` and `JooseX.Bridge.Ext.LazyConvertor`.
The 2nd convertor requires the `JooseX.Meta.Lazy` installed, and makes all classes lazy. Please refer to `JooseX.Meta.Lazy` 
[documentation](http://openjsan.org/go?l=JooseX.Meta.Lazy) for details. 


GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/joosex-bridge-ext/issues](http://github.com/SamuraiJack/joosex-bridge-ext/issues)

For general Joose questions you can also visit #joose on irc.freenode.org or the forum at: [http://joose.it/forum](http://joose.it/forum) 


SEE ALSO
========

[http://github.com/SamuraiJack/joosex-bridge-ext/](http://github.com/SamuraiJack/joosex-bridge-ext/)

Web page of this extensions

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





/**
 * Improved <b>Ext.ux.extend</b>. Provides exactly the same interface as standard <b>Ext.ux.extend</b> plus it converts both classes into Joose Classes..<br>
 * @name Joose.Bridge.Ext#extend
 * @methodOf Joose.Bridge.Ext
 * @param {Class} subClass The class inheriting the functionality
 * @param {Class} superClass The class being extended
 * @param {Object} [overrides] A literal with members which are copied into the subclass's prototype, and are therefore shared between all instances of the new class.
 * @return {Class} The subclass constructor.
 */


/**
 * Class builder for meta-class Joose.ExtClass, which provide compatibility with Joose. This is the exact analog of standard Class function in Joose, 
 * see <a href="http://code.google.com/p/joose-js/wiki/BuildingAClass">this page</a> for examples. This function is copied into global scope and is using for creation of new classes.
 * @name Joose.Bridge.Ext#ExtClass
 * @methodOf Joose.Bridge.Ext
 * @param {String} name The name of the class, being created
 * @param {Object} [overrides] A literal with members, from which the new Class is constructed. See Joose manual.
 * @return {Class} The class constructor.
 */


/**
 * @class
 * @name Joose.Bridge.Ext
 * @desc This package provides fully backward-compatible drop-in replacement for Ext.extend, which turns standard Ext classes into <a href="http://code.google.com/p/joose-js/">Joose</a> Classes.
 * After including this package you can derive new classes in standard way
<pre>
Ext.myWindow = Joose.Bridge.Ext.my.extend(Ext.Window, {
    
    initComponent : function (){
        Ext.myWindow.superclass.initComponent.call(this)
        this.width = 800
    }
    
})
</pre>
or in the native Joose way:
<pre>
ExtClass('Ext.myWindow', {
    isa : Ext.Window,
    
    after : {
        initComponent : function (){
            this.width = 800
        }
    }
    
})
</pre>
in both cases you can use any of Joose features with your classes, for example - apply Roles, either statically, during creation:
<pre>
Role('Joosificator', {
    before : {
        render : function(){
            this.title = "Joosified: " + this.title
        }
    }
})

ExtClass('Ext.myWindow', {
    isa : Ext.Window,
    
    does : [Joosificator],
    
    ...
})
</pre>
or dynamically, at run-time:
<pre>
Ext.myWindow.meta.extend({
    does : [Joosificator]
})
</pre>
 * <br/>See the <a href="http://extjs.com/forum/showthread.php?t=55968">forum thread</a> for additional details and <a href="http://code.google.com/p/joose-js/">Joose</a> home page for complete manual on Joose.
 * @version 0.1
 * @author <a href="http://extjs.com/forum/member.php?u=36826">SamuraiJack</a>
 * @license <a href="http://www.gnu.org/licenses/lgpl.html">LGPL 3.0</a>
 */
