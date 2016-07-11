//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.InputEnterSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'inputentersearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.moviment.InputEnterSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.moviment.InputEnterSearch',

    // template for the content List
    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item">',
                '<a style="display: block;">{name}</a>',
                '<a style="display: block;">{manufacturername}</a>',
            '</div>',
        '</tpl>'
    ]

});
