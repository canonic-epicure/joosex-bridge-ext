JooseX.Bridge.Ext.my.originalExtend = Ext.extend

JooseX.Bridge.Ext.meta.extend({ does : JooseX.Meta.Lazy })

Ext.extend = JooseX.Bridge.Ext.my.extend