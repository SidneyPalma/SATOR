//@charset UTF-8
Ext.define( 'iAdmin.view.helper.cycle.CycleSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'cyclesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Cycle'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Cycle'

});
