//@charset UTF-8
Ext.define( 'Smart.ux.main.MainModuleSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'mainmodulesearch',

    requires: [
        'Smart.form.field.ComboSearch'
    ],

    pageSize: 0,
    editable: false,

    cls: 'main-field',

    displayField: 'legalname',

    url: '../iAdmin/business/Calls/module.php',

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
            name: 'legalname',
            type: 'auto'
        }, {
            name: 'filedata',
            type: 'auto'
        }, {
            name: 'fileinfo',
            type: 'auto'
        }, {
            name: 'filetype',
            type: 'auto',
            convert: function (value,record) {
                var info = record.get('fileinfo'),
                    type = (info && info.length !== 0) ? Ext.decode(info) : null;
                return (type) ? Ext.String.format('data:{0};base64,{1}',type.fileType,record.get('filedata')) : record.get('filedata');
            }
        }
    ],

    listeners: {
        select: 'onRedirectModule'
    },

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
            '{legalname}',
        '</tpl>'
    ]

});