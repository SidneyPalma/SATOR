//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchClient', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchclient',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    fieldValue: 'clientid',

    displayField: 'clientname',

    pageSize: 0,
    showClear: true,
    hideTrigger: true,
    useUpperCase: true,
    readerBarCode: false,

    url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

    params: {
        action: 'select',
        method: 'selectOpenClient'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'clienttype',
            type: 'auto'
        }
    ],

    storeListeners: {
    },

    initComponent: function () {
        var me = this;
        me.callParent();

        if(me.readerBarCode == true) {
            me.minChars = 999;
            me.maxLength = 60;
            me.setSpecialKeyEvent();
            me.store.onAfter('load', me.fnLoad, me);
        }
    },

    fnLoad: function (store, records, successful, operation, eOpts) {
    },

    setSpecialKeyEvent: function () {
        var me = this;

        me.setListeners({
            expand: function (field, eOpts) {
                if(field.getStore().getCount()) {
                    field.picker.getSelectionModel().select(0);
                    field.fireEvent('nextfield',field,eOpts);
                }
            },
            specialkey: function (field, e, eOpts) {
                if ([e.ESC].indexOf(e.getKey()) != -1) {
                    field.reset();
                }
                if ([e.ENTER].indexOf(e.getKey()) != -1) {
                    var value = field.getRawValue();
                    field.doQuery(value,true,true);
                    e.stopEvent();
                }
            }
        });
    }

});
