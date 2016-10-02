//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItemSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'materialboxitemsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.box.MaterialBoxItemSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.box.MaterialBoxItemSearch',

    tpl: [
        '<tpl for=".">',
        '<div class="x-boundlist-item" style="height: 80px;" data-qtip="{description}">',
        '<div style="float: left; height: 80px; width: 120px; margin-right: 10px;">',
        '<img src="{filetype}" style="height: 100%; width: 100%;">',
        '</div>',
        '<div style="font-size: 18px; line-height: 40px; background-color: rgba(231, 242, 225, 1); color: black;">{name}</div>',
        '<div style="font-size: 16px; line-height: 20px; background-color: rgba(250, 241, 210, .4);">{manufacturername}</div>',
        '<div style="font-size: 14px; line-height: 20px; background-color: rgba(250, 241, 210, .4);">Código de Barras: <a style="color: red;">{barcode}</a></div>',
        '</div>',
        '</tpl>'
    ]

});
