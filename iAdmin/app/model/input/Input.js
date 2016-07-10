//@charset UTF-8
Ext.define( 'iAdmin.model.input.Input', {
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
            name: 'description',
            type: 'auto'
        }, {
            name: 'resultfield',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'presentation',
            type: 'auto'
        }, {
            name: 'presentationdescription',
            type: 'auto'
        }, {
            name: 'manufacturerid',
            type: 'auto'
        }, {
            name: 'manufacturername',
            type: 'int'
        }, {
            name: 'providerid',
            type: 'int'
        }, {
            name: 'providername',
            type: 'auto'
        }, {
            name: 'codeanvisa',
            type: 'auto'
        }, {
            name: 'hasbatch',
            type: 'boolean'
        }, {
            name: 'hasstock',
            type: 'boolean'
        }, {
            name: 'isactive',
            type: 'boolean'
        }, {
            name: 'reactive',
            type: 'boolean'
        }, {
            name: 'minstock',
            type: 'auto'
        }, {
            name: 'maxstock',
            type: 'auto'
        }, {
            name: 'deadline',
            type: 'int'
        }, {
            name: 'resetpoint',
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