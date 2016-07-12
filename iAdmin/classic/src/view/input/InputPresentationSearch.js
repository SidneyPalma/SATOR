//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputPresentationSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'inputpresentationsearch',

    requires: [
        'Smart.form.field.ComboSearch'
    ],

    pageSize: 10,

    displayField: 'name',

    url: '../iAdmin/business/Calls/inputpresentation.php',

    params: {
        params: Ext.encode(['name'])
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
        }
    ],

    // template for the content List
    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item">',
                '<div style="font-size: 16px;">{name}</div>',
                '<div style="font-size: 12px;">{presentationdescription}</div>',
            '</div>',
        '</tpl>'
    ],

    // template for the content displayField
    displayTpl: [
        '<tpl for=".">',
            '{name} - {presentationdescription}',
        '</tpl>'
    ]

});