//@charset UTF-8
Ext.define( 'iSterilization.model.armory.ArmoryMovement', {
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
            name: 'areasid',
            type: 'int'
        }, {
            name: 'areasname',
            type: 'auto'
        }, {
            name: 'movementuser',
            type: 'auto'
        }, {
            name: 'movementdate',
            type: 'auto',
            serializeType: 'date',
            convert: function (value, record) {
                return ( !value || value.length == 0) ? null : Ext.util.Format.date(Ext.Date.parse(value,'Y-m-d'),'d/m/Y');
            }
        }, {
            name: 'movementtype',
            type: 'auto'
        }, {
            name: 'movementtypedescription',
            type: 'auto'
        }, {
            name: 'releasestype',
            type: 'auto'
        }, {
            name: 'releasestypedescription',
            type: 'auto'
        }
    ]

});