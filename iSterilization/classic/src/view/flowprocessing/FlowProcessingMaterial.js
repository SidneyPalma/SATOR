//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingMaterial', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessingmaterial',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*'
    ],

    cls: 'processing-panel-header-flow processing-update-grid',

    store: 'flowprocessingmaterial',

    listeners: {
        select: 'onSelectMaterialFlowStepAction'
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
            items: [
                {
                    flex: 1,
                    xtype: 'label',
                    cls: 'processing-field-font',
                    text: 'Materiais',
                    name: 'materialboxname'
                }, {
                    width: 80,
                    height: 26,
                    xtype: 'container',
                    html: [
                        '<div style="float: right;">',
                            '<div style="width: 20px; background: #713800; height: 26px; float: right;"></div>',
                            '<div style="width: 20px; background: #42A0FF; height: 26px; float: right;"></div>',
                            '<div style="width: 20px; background: #FF0000; height: 26px; float: right;"></div>',
                            '<div style="width: 20px; background: #C8BFE7; height: 26px; float: right;"></div>',
                        '</div>'
                    ]
                }
            ]
        }
    ],

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.flowprocessing.FlowProcessingMaterial');

        me.columns = [
            {
                width: 40,
                renderer: function (value,metaData,record) {
                    var unconformities = record.get('unconformities'),
                        flag = '<div class="unconformities legend{0}"></div>';

                    return Ext.String.format(flag,unconformities);
                }
            }, {
                dataIndex: 'barcode',
                width: 100
            }, {
                dataIndex: 'materialname',
                flex: 1
            }, {
                dataIndex: 'unconformitiesdescription',
                width: 180
            }
        ];
    }

});