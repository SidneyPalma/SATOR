//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceTypeSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'servicetypesearch',

    requires: [
        'Smart.form.field.ComboSearch'
    ],

    pageSize: 0,
    editable: false,

    valueField: 'servicetype',
    displayField: 'servicetypedescription',

    url: '../iAdmin/business/Calls/itembaseservicetype.php',

    params: {
        action: 'select',
        method: 'selectType'
        // params: Ext.encode(['servicetypedescription'])
    },

    fields: [
        {
            name: 'servicetype',
            type: 'auto'
        }, {
            name: 'servicetypedescription',
            type: 'auto'
        }
    ]

});