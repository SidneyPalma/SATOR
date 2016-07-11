//@charset UTF-8
Ext.define( 'iAdmin.view.helper.classcouncil.ClassCouncilSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'classcouncilsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.ClassCouncil'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.ClassCouncil'

});
