//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchCycle', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchcycle',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    url: '../iAdmin/business/Calls/cycle.php',

    params: {
        action: 'select',
        method: 'selectOpenMaterial'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'version',
            type: 'int'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'duration',
            type: 'int'
        }, {
            name: 'temperature',
            type: 'auto'
        }, {
            name: 'timetoopen',
            type: 'auto'
        }
    ]


});
