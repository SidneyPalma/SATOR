//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchMaterial', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchmaterial',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,
    hideTrigger: true,
    useUpperCase: true,
    readerBarCode: false,
    enableKeyEvents: true,

    url: '../iSterilization/business/Calls/flowprocessing.php',

    params: {
        action: 'select',
        method: 'selectOpenMaterial'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'version',
            type: 'int'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'materialboxid',
            type: 'int'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'areavailable',
            type: 'int'
        }, {
            name: 'manufacturername',
            type: 'auto'
        }, {
            name: 'materialboxitems',
            type: 'auto',
            convert: function (value, record) {
                return (value && value.length != 0) ? Ext.String.format("{0} item(s)",value) : '';
            }
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
        }, {
            name: 'sterilizationtypeid',
            type: 'int'
        }, {
            name: 'sterilizationtypename',
            type: 'auto'
        }, {
            name: 'prioritylevel',
            type: 'auto'
        }, {
            name: 'priorityleveldescription',
            type: 'auto'
        }, {
            name: 'sterilizationpriority',
            type: 'auto'
        }, {
            name: 'colorschema',
            type: 'auto'
        }, {
            name: 'colorpallet',
            type: 'auto',
            convert: function (value, record) {
                var colorpallet = '',
                    colorschema = record.get('colorschema') ? record.get('colorschema').split(",") : null,
                    coloritem = '<div style="background: {0}; width: 20px; height: 20px; float: left; border: 2px solid black; border-radius: 50%"></div>';

                Ext.each(colorschema, function (color) {
                    colorpallet += Ext.String.format(coloritem, color);
                });

                return colorpallet;
            }
        }
    ],

    storeListeners: {
    },

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
    ],

    initComponent: function () {
        var me = this;
        me.callParent();

        if(me.readerBarCode == true) {
            me.minChars = 999;
            me.maxLength = 60;
            me.setSpecialKeyEvent();
            me.store.onAfter('load', me.fnStoreLoad, me);
        }
    },

    fnStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this;
        if (store.getCount() == 1) {
            var record = store.getAt(0);
            me.setRawValue(record.get('name'));
            me.fireEvent('select', me, record, eOpts);
        }
        if (store.getCount() >= 2) {
            me.expand();
        }
    },

    setSpecialKeyEvent: function () {
        var me = this;

        me.setListeners({
            specialkey: function (field, e, eOpts) {
                if ([e.ESC].indexOf(e.getKey()) != -1) {
                    field.fireEvent('showclear', field);
                }
                if ([e.ENTER].indexOf(e.getKey()) != -1) {
                    field.getStore().setParams({ query: field.getRawValue() }).load();
                }
            }
        });
    }

});
