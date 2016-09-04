//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingMaterial', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessingmaterial',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'Ext.grid.plugin.CellEditing'
    ],

    editable: false,

    cls: 'update-grid',

    store: 'flowprocessingstepmaterial',

    listeners: {
        beforeedit: 'onBeforeEditMaterialFlowStepAction',
        select: 'onSelectMaterialFlowStepAction'
    },

    selType: 'cellmodel',

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'myplugin'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    dockedItems: [
        {
            margin: '0 0 6 0',
            anchor: '100%',
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    flex: 1,
                    xtype: 'label',
                    cls: 'processing-field-font',
                    text: 'Materiais',
                    name: 'materialboxname'
                }, {
                    width: 80,
                    xtype: 'label',
                    cls: 'processing-field-font',
                    text: '(00/00)',
                    name: 'materialaccount'
                }, {
                    width: 80,
                    height: 26,
                    xtype: 'container',
                    name: 'colorschema'
                }
            ]
        }
    ],

    buildItems: function () {
        var me = this;

        me.columns = [
            {
                width: 40,
                renderer: function (value,metaData,record) {
                    var unconformities = record.get('unconformities'),
                        flag = '<div class="unconformities legend{0}"></div>';

                    return Ext.String.format(flag,unconformities);
                }
            }, {
                width: 150,
                hidden: !me.editable,
                editor: {
                    showClear: true,
                    useUpperCase: true,
                    xtype: 'textfield',
                    listeners: {
                        scope: this,
                        // focusenter: function (field, event, eOpts) {
                        //     console.info(field,field.ownerCt);
                        // },
                        specialkey: function(field, e){
                            if (e.getKey() == Ext.EventObject.ENTER) {
                                e.keyCode = Ext.EventObject.TAB;
                            }

                            if ([e.ESC].indexOf(e.getKey()) != -1) {
                                field.reset();
                            }
                            if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                var view = field.up('call_SATOR_UNCONFORMITIES');
                                if(view) {
                                    view.fireEvent('startreaderunconformities', field, e);
                                }
                            }
                        }
                    }
                }
            }, {
                hidden: Smart.appType == 'pro',
                dataIndex: 'barcode',
                width: 120
            }, {
                dataIndex: 'materialname',
                flex: 1,
                renderer: function (value,metaData,record) {
                    return Ext.String.format('{0} ({1})',value,record.get('proprietaryname'));
                }
            }, {
                dataIndex: 'unconformitiesdescription',
                width: 180
                // editor: {
                //     xtype: 'comboenum',
                //     queryFilter: 'I',
                //     name: 'unconformitiesdescription',
                //     fieldCls: 'smart-field-style-action',
                //     listeners: {
                //         select: 'onSelectUnconformities'
                //     }
                // }
            }
        ];
    }

});