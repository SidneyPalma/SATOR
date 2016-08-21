//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchInput', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchinput',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    // showClear: true,

    url: '../iSterilization/business/Calls/flowprocessing.php',

    params: {
        action: 'select',
        method: 'selectOpenInput'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'presentationdescription',
            type: 'auto'
        }, {
            name: 'presentation',
            type: 'auto'
        }, {
            name: 'acronym',
            type: 'auto'
        }, {
            name: 'datevalidity',
            type: 'auto'
        }, {
            name: 'acronym',
            type: 'auto'
        }, {
            name: 'lotamount',
            type: 'auto'
        }, {
            name: 'lotpart',
            type: 'auto'
        }, {
            name: 'hasbatch',
            type: 'int'
        }, {
            name: 'hasstock',
            type: 'int'
        }
    ],

    // template for the content List
    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item">',
                '<div style="font-size: 16px;">{name}</div>',
                '<div style="font-size: 14px;">{presentationdescription} Lote: {lotpart} / {datevalidity}</div>',
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
