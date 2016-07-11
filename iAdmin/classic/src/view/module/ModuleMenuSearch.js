//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleMenuSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'modulemenusearch',

    requires: [
        'iAdmin.store.module.ModuleMenu',
        'Smart.form.field.ComboSearch'
    ],

    fieldLabel: 'Menu',

    displayField: 'name',

    store: 'iAdmin.store.module.ModuleMenu'

});
