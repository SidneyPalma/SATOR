//@charset UTF-8
Ext.define( 'iSterilization.model.service.ServiceItemBase', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.util.Resource'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'itembaseid',
            type: 'int'
        }, {
            name: 'itembasename',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'manufacturerid',
            type: 'int'
        }, {
            name: 'manufacturername',
            type: 'auto'
        }, {
            name: 'itembasetype',
            type: 'auto'
        }, {
            name: 'itembasetypedescription',
            type: 'auto'
        }, {
            name: 'registrationanvisa',
            type: 'auto'
        }, {
            name: 'cmeareasid',
            type: 'int'
        }, {
            name: 'cmeareasname',
            type: 'auto'
        }, {
            name: 'filedata',
            type: 'auto',
            convert: function (value, record) {
                return (value) ? value : Smart.Rss.getFileImage('smart');
            }
        }, {
            name: 'fileinfo',
            type: 'auto'
        }, {
            name: 'filetype',
            type: 'auto',
            convert: function (value, record) {
                var info = record.get('fileinfo'),
                    type = (info && info.length !== 0) ? Ext.decode(info) : null;
                return (type) ? Ext.String.format('data:{0};base64,{1}', type.fileType, record.get('filedata')) : record.get('filedata');
            }
        }
    ]

});