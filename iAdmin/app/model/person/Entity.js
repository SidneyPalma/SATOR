//@charset UTF-8
Ext.define( 'iAdmin.model.person.Entity', {
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
            name: 'legalname',
            type: 'auto'
        }, {
            name: 'collaboratorid',
            type: 'int'
        }, {
            name: 'collaboratorname',
            type: 'auto'
        }, {
            name: 'cnpjnumber',
            type: 'auto'
        }, {
            name: 'cnesnumber',
            type: 'auto'
        }, {
            name: 'cmesponsor',
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