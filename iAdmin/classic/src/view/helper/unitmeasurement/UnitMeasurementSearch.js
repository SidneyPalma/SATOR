//@charset UTF-8
Ext.define( 'iAdmin.view.helper.unitmeasurement.UnitMeasurementSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'unitmeasurementsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.UnitMeasurement'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.UnitMeasurement'

});
