//@charset UTF-8
Ext.define( 'iAdmin.model.enums.EnumTypeList', {
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
            name: 'enumtypeid',
            type: 'int'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'filtertype',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'orderby',
            type: 'int'
        }
    ]

});