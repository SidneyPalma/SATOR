//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingInput', {
    extend: 'Ext.tree.Panel',

    xtype: 'flowprocessinginput',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*'
    ],

    rootVisible: false,

    cls: 'processing-panel-header-flow processing-update-grid',

    store: Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: 'Lavagem Manual', leaf: true },
                { text: 'Termodesinfectora', expanded: true, children: [
                    { text: 'Ácido', leaf: true },
                    { text: 'Sabão', leaf: true}
                ] },
                { text: 'buy lottery tickets', leaf: true }
            ]
        }
    }),

    // store: Ext.create('Ext.data.Store', {
    //     fields:['email'],
    //     data: [
    //         { email: 'lisa@simpsons.com' },
    //         { email: 'bart@simpsons.com' },
    //         { email: 'homer@simpsons.com' },
    //         { email: 'marge@simpsons.com' }
    //     ]
    // }),

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
        //me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.columns = [
            {
                width: 40,
                renderer: function (value,metaData,record) {
                    return '<div style="border: 2px solid rgb(105, 112, 194); width: 100%; height: 100%; padding: 10px; background: rgb(0, 190, 237);"></div>';
                }
            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 1
            }
        ];
    }

});