//@charset UTF-8
Ext.define( 'iAdmin.view.person.entity.EntitySearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'entitysearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.person.Entity'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.person.Entity'

});
