//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.ItemBase', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.util.Resource',
        'Smart.data.identifier.Auto',
        'Smart.data.field.ColorPallet'
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
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'resultfield',
            type: 'auto'
        }, {
            name: 'proprietaryid',
            type: 'int'
        }, {
            name: 'proprietaryname',
            type: 'auto'
        }, {
            name: 'manufacturerid',
            type: 'int'
        }, {
            name: 'manufacturername',
            type: 'auto'
        }, {
            name: 'dateacquisition',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'patrimonialcode',
            type: 'auto'
        }, {
            name: 'registrationanvisa',
            type: 'auto'
        }, {
            name: 'colorschema',
            type: 'auto'
        }, {
            name: 'colorpallet',
            type: 'colorpallet'
        }, {
            name: 'itemgroup',
            type: 'auto'
        }, {
            name: 'itemgroupdescription',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
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