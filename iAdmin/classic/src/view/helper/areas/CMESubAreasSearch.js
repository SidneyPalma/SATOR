//@charset UTF-8
Ext.define( 'iAdmin.view.helper.areas.CMESubAreasSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'cmesubareassearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.areas.CMESubAreas'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.areas.CMESubAreas'

});
