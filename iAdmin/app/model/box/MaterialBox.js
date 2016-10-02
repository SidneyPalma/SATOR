//@charset UTF-8
Ext.define( 'iAdmin.model.box.MaterialBox', {
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
            name: 'name',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'restriction',
            type: 'auto'
        }, {
            name: 'itemsize',
            type: 'auto'
        }, {
            name: 'itemsizedescription',
            type: 'auto'
        }, {
            name: 'statusbox',
            type: 'auto'
        }, {
            name: 'statusboxdescription',
            type: 'auto'
        }, {
            name: 'packingid',
            type: 'int'
        }, {
            name: 'packingname',
            type: 'auto'
        }, {
            name: 'requirepatient',
            type: 'int'
        }, {
            name: 'materialboxitems',
            type: 'int'
        }, {
            name: 'colorschema',
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