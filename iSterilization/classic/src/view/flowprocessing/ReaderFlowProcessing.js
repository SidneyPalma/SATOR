//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.ReaderFlowProcessing', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'readerflowprocessing',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'materialname',

    pageSize: 0,
    minChars: 999,
    maxLength: 60,
    showClear: true,
    hideTrigger: true,
    useUpperCase: true,

    // queryMode: 'remote',
    // forceSelection:true,
    // enableKeyEvents:true,
    // triggerAction: 'query',

    url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

    params: {
        action: 'select',
        method: 'selectFlowItem'
    },

    config: {
        forceQuery: ''
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'materialname',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'manufacturername',
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
    ],

    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item" style="height: 80px;">',
                '<div style="float: left; height: 80px; width: 120px; margin-right: 10px;">',
                    '<img src="{filetype}" style="height: 100%; width: 100%;">',
                '</div>',
                '<div style="font-size: 22px; line-height: 40px; background-color: rgba(231, 242, 225, 1); color: black;">{materialname}</div>',
                '<div style="font-size: 16px; line-height: 20px; background-color: rgba(250, 241, 210, .4);">{manufacturername}</div>',
                '<div style="font-size: 14px; line-height: 20px; background-color: rgba(250, 241, 210, .4);">Código de Barras: <a style="color: red;">{barcode}</a></div>',
            '</div>',
        '</tpl>'
    ],

    listeners: {
        specialkey: function (field, e, eOpts) {
            if ([e.ESC].indexOf(e.getKey()) != -1) {
                field.reset();
            }
            if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                field.doQuery(field.getRawValue(),true,true);
                //e.stopEvent();
            }
        }
    },

    initComponent: function () {
        var me = this;

        me.initConfig();
        me.callParent();

        me.onBefore( 'beforequery', me.fnReaderFlowBeforeQuery, me);
    },

    fnReaderFlowBeforeQuery: function ( queryPlan , eOpts ) {
        var me = this;

        me.store.setParams({
            method: 'selectFlowItem',
            query: me.getForceQuery()
        });
    }

});
