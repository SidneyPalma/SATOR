//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingInput', {
    extend: 'Ext.tree.Panel',

    xtype: 'flowprocessinginput',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iSterilization.store.flowprocessing.FlowProcessingStepInputTree'
    ],

    store: 'flowprocessingstepinputtree',

    useArrows: true,
    rootVisible: false,
    // hideHeaders: false,
    multiSelect: false,
    singleExpand: true,
    headerBorders: false,
    reserveScrollbar: false,
    cls: 'update-grid',

    dockedItems: [
        {
            margin: '0 0 6 0',
            xtype: 'label',
            cls: 'processing-field-font',
            text: 'Insumos'
        }
    ],

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        me.columns = [
            {
                flex: 1,
                dataIndex: 'text',
                sortable: false,
                xtype: 'treecolumn',
                renderer: function (value, metaData, record) {
                    var leaf = record.get('leaf');
                    metaData.style = !leaf ? 'font-weight: bold; color: blue;' : '';
                    return value;
                }
            }
        ];

    }

});