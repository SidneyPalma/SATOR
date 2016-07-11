//@charset UTF-8
Ext.define( 'iAdmin.view.helper.place.PlaceSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'placesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Place'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Place'

});
