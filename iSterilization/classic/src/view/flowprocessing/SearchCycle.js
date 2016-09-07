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

    url: '../iSterilization/business/Calls/flowprocessing.php',

    params: {
        action: 'select',
        method: 'selectCycle'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
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
    ],

    // template for the content List
    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item">',
                '<div style="font-size: 18px; font-weight: 700;">{name}</div>',
                '<div style="font-size: 14px;">Dur.: {duration} / Temp.: {temperature}</div>',
            '</div>',
        '</tpl>'
    ]

    // template for the content displayField
    // displayTpl: [
    //     '<tpl for=".">',
    //     '{name} - {presentationdescription}',
    //     '</tpl>'
    // ]


});
