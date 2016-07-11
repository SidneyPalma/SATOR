//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceItemBaseSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'serviceitembasesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iSterilization.store.service.ServiceItemBase'
    ],

    displayField: 'itembasename',

    pageSize: 10,
    showClear: true,

    store: 'iSterilization.store.service.ServiceItemBase',

    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item" style="height: 80px;" data-qtip="{description}">',
                '<div style="float: left; height: 80px; width: 120px; margin-right: 10px;">',
                    '<img src="{filetype}" style="height: 100%; width: 100%;">',
                '</div>',
                '<div style="font-size: 22px; line-height: 40px;">{itembasename}</div>',
                '<div style="font-size: 16px; line-height: 20px; background-color: rgba(250, 241, 210, .4);">{manufacturername}</div>',
                '<div style="font-size: 14px; line-height: 20px; background-color: rgba(250, 241, 210, .4);">Código de Barras: {barcode}</div>',
            '</div>',
        '</tpl>'
    ]

});