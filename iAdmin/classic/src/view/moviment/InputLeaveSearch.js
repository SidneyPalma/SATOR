//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.InputLeaveSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'inputleavesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.moviment.InputLeaveSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.moviment.InputLeaveSearch',

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
