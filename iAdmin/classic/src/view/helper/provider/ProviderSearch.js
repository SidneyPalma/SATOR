//@charset UTF-8
Ext.define( 'iAdmin.view.helper.provider.ProviderSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'providersearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Provider'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Provider'

});
