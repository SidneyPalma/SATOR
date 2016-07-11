//@charset UTF-8
Ext.define( 'iAdmin.view.menu.MenuSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'menusearch',

    requires: [
        'iAdmin.store.menu.Menu',
        'Smart.form.field.ComboSearch'
    ],

    fieldLabel: 'Menu',

    displayField: 'name',

    store: 'iAdmin.store.menu.Menu'

});
