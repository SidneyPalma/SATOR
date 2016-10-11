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
            serializeType: 'date'
        }, {
            name: 'movementdateformat',
            type: 'auto',
            convert: function (value, record) {
                return Ext.util.Format.date(Ext.Date.parse(record.get('movementdate'),'Y-m-d'),'d/m/Y');
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