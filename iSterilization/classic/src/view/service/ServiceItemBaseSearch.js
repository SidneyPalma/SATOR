//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceItemBaseSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'serviceitembasesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iSterilization.store.service.ServiceItemBase'
    ],

    displayField: 'itembasename',

    pageSize: 10,
    showClear: true,

    store: 'iSterilization.store.service.ServiceItemBase'

});
