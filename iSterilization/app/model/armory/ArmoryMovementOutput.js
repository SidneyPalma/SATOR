//@charset UTF-8
Ext.define( 'iSterilization.model.armory.ArmoryMovementOutput', {
    extend: 'iSterilization.model.armory.ArmoryMovement',

    requires: [
        'iSterilization.model.armory.ArmoryMovement'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'clientid',
            type: 'int'
        }, {
            name: 'barcode',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'clientname',
            type: 'auto'
        }, {
            name: 'patientname',
            type: 'auto'
        }, {
            name: 'surgicalwarning',
            type: 'auto'
        }, {
            name: 'instrumentator',
            type: 'auto'
        }, {
            name: 'flowing',
            type: 'auto'
        }, {
            name: 'place',
            type: 'auto'
        }, {
            name: 'transportedby',
            type: 'auto'
        }, {
            name: 'surgicalroom',
            type: 'auto'
        }, {
            name: 'surgical',
            type: 'auto'
        }, {
            name: 'dateof',
            type: 'auto',
            serializeType: 'date',
            convert: function (value, record) {
                return ( !value || value.length == 0) ? null : Ext.util.Format.date(Ext.Date.parse(value,'Y-m-d'),'d/m/Y');
            }
        }, {
            name: 'timeof',
            type: 'auto',
            convert: function (value) {
                return ( !value || value.length == 0) ? null : value.substring(5,0);
            }
        }, {
            name: 'hasbox',
            type: 'int'
        }, {
            name: 'boxseal',
            type: 'auto'
        }
    ]

});