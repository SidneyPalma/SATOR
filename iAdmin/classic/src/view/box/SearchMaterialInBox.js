//@charset UTF-8
Ext.define( 'iAdmin.view.box.SearchMaterialInBox', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'Searchmaterialinbox',

    requires: [
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    url: '../iAdmin/business/Calls/materialboxitem.php',

    params: {
        action: 'select',
        method: 'selectItem'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }
    ]

});
