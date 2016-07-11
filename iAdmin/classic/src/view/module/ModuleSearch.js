//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'modulesearch',

    requires: [
        'iAdmin.store.module.Module',
        'Smart.form.field.ComboSearch'
    ],

    pageSize: 0,
    editable: false,

    displayField: 'name',

    store: 'iAdmin.store.module.Module',

    // template for the content List
    tpl: [
        '<tpl style:"font-size: 14px;" for=".">',
            '<div class="x-boundlist-item" style="font-family: Monda;">' +
                '<span style="font-size: 17px; color:#3333FF; display: block; font-family: Monda;">{name}</span>' +
                '<span style="font-size: 14px; color:#990000; display: block; font-family: Monda;">{observation}</span>' +
            '</div>',
        '</tpl>'
    ],

    // template for the content displayField
    displayTpl: [
        '<tpl for=".">',
            '{name} - {legalname}',
        '</tpl>'
    ]

});
