//@charset UTF-8
Ext.define( 'iAdmin.model.box.MaterialBoxItem', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'materialboxid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'materialid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'materialname',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'boxitemstatus',
            type: 'auto'
        }, {
            name: 'boxitemstatusdescription',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }, {
            name: 'filedata',
            type: 'auto',
            convert: function (value,record) {
                return (value) ? value : Smart.Rss.getFileImage('smart');
            }
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
    ]

});