//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchElement', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchelement',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'elementname',

    pageSize: 10,
    showClear: true,

    url: '../iSterilization/business/Calls/flowprocessingstepinput.php',

    params: {
        action: 'select',
        method: 'selectElement'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'elementname',
            type: 'auto'
        }, {
            name: 'elementtype',
            type: 'auto'
        }
    ]

});
