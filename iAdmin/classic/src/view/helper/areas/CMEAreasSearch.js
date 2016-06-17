//@charset UTF-8
Ext.define( 'iAdmin.view.helper.areas.CMEAreasSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'cmeareassearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.areas.CMEAreas'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.areas.CMEAreas'

});
