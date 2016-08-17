//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingMaterial', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessingmaterial',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*'
    ],

    // border: true,

    cls: 'processing-panel-header-flow processing-update-grid',

    store: 'flowprocessingstepmaterial',

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

        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepMaterial');

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
                flex: 1,
                renderer: function (value,metaData,record) {
                    return Ext.String.format('{0} ({1})',value,record.get('proprietaryname'));
                }
            }, {
                dataIndex: 'unconformitiesdescription',
                width: 150
            }
        ];
    }

});