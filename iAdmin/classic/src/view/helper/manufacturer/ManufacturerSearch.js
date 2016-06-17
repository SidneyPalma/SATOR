//@charset UTF-8
Ext.define( 'iAdmin.view.helper.manufacturer.ManufacturerSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'manufacturersearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Manufacturer'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Manufacturer'

});
