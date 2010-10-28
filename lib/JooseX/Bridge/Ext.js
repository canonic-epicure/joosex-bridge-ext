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
                
                //only call to superclass constructor if self wasn't changed by traits
                //because in that case 'self' is already constructed instance
                if (self == this) {
                    var superClass = arguments.callee.meta.superClass
                    
                    if (superClass != self.meta.defaultSuperClass) superClass.apply(self, arguments)
                }
                
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
                        // fixing inline for now, because this package relies on Task.Joose.Stable
                        if (typeof value == 'function' && value.constructor != RegExp && !value.meta) subExtend.methods[name] = value; else subExtend.have[name] = value
                })
                
                return new JooseX.Bridge.Ext(null, subExtend).c
            }
        
        }
        
    }

})


Joose.Namespace.Manager.my.register('ExtClass', JooseX.Bridge.Ext)
