//@charset UTF-8
Ext.define( 'iSterilization.model.service.ServiceRegistration', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'itembaseid',
            type: 'int'
        }, {
            name: 'itembasename',
            type: 'auto'
        }, {
            name: 'cmeareasid',
            type: 'int'
        }, {
            name: 'cmeareasname',
            type: 'auto'
        }, {
            name: 'servicetype',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }, {
            name: 'begintime',
            type: 'auto',
            convert: function (value) {
                return Ext.util.Format.date(Ext.Date.parse(value,'Y-m-d'),'d/m/Y');
            }
        }, {
            name: 'begintimeusername',
            type: 'auto',
            convert: function (value, record) {
                var result = Ext.String.format('{0} ( {1} )',record.get('begintime'),value);
                return (value && value.length != 0) ? result : value;
            }
        }, {
            name: 'enduptime',
            type: 'auto',
            convert: function (value) {
                return Ext.util.Format.date(Ext.Date.parse(value,'Y-m-d'),'d/m/Y');
            }
        }, {
            name: 'enduptimeusername',
            type: 'auto',
            convert: function (value, record) {
                var result = Ext.String.format('{0} ( {1} )',record.get('enduptime'),value);
                return (value && value.length != 0) ? result : value;
            }
        }, {
            name: 'resultfield',
            type: 'auto'
        }, {
            name: 'resultvalue',
            type: 'auto'
        }, {
            name: 'resultstate',
            type: 'auto'
        }, {
            name: 'resultstatedescription',
            type: 'auto'
        }
    ]

});