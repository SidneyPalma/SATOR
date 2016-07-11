//@charset UTF-8
Ext.define( 'iAdmin.view.helper.instrumentator.InstrumentatorSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'instrumentatorsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Instrumentator'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Instrumentator'

});
