//@charset UTF-8
Ext.define( 'iAdmin.model.areas.CMEAreas', {
    extend: 'iAdmin.model.areas.Areas',

    requires: [
        'iAdmin.model.areas.Areas'
    ],

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'orderby',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'isactive',
            type: 'int',
            persist: true,
            critical: true
        }
    ]

});