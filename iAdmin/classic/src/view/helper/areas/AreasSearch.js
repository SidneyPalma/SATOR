//@charset UTF-8
Ext.define( 'iAdmin.view.helper.areas.AreasSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'areassearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.areas.Areas'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.areas.Areas',

    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item">',
                '<span style="font-size: 17px; display: block;">{name}</span>',
                '<span style="font-size: 12px; display: block;">{description}</span>',
                '<span style="font-size: 16px; display: block; color: red; font-family: Monda;">{workstation}</span>',
            '</div>',
        '</tpl>'
    ]

});
