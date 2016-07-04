//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeInput', {
    extend: 'Ext.grid.Panel',

    xtype: 'sterilizationtypeinput',

    requires: [
        'Smart.plugins.*',
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.areas.*',
        'Ext.grid.plugin.BufferedRenderer'
    ],

    cls: 'update-grid',

    rowLines: false,
    columnLines: false,

    plugins: ['insertrecordgrid'],

    listeners: {
        insertrecord: 'insertLayout',
        deleterecord: 'deleteLayout'
    },

    store: 'sterilizationtypeinput',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.sterilizationtype.SterilizationTypeInput');

        me.columns = [
            {
                flex: 1,
                text: 'Nome',
                dataIndex: 'inputnamepresentation',
                renderer: me.rendererField
            }
        ];
    },

    rendererField: function(value, metaData, record, rowIndex, colIndex, store) {
        var me = this,
            id1 = Ext.id(),
            id2 = Ext.id(),
            c = store.getCount(),
            s = '<div>' +
                '<div style="float: left;">{0}</div>' +
                    '<div id="{1}" style="float: right; padding-left: 6px;"></div>' +
                    '<div id="{2}" style="float: right; padding-left: 6px;"></div>' +
                '</div>';

        if( rowIndex == c-1 && c != 0 ) {
            Ext.defer(function () {
                Ext.widget('component', {
                    renderTo: id1,
                    cls:"delete-icon fa fa-minus-circle action-delete-color-font"
                }).getEl().on('click', function () { me.fireEvent('deleterecord', me, store, record, {}); }, me);
                Ext.widget('component', {
                    renderTo: id2,
                    cls:"insert-icon fa fa-plus-circle action-insert-color-font"
                }).getEl().on('click', function () { me.fireEvent('insertrecord', me, store, {}); }, me);
            }, 50);
            return Ext.String.format(s, value, id1, id2);
        } else {
            Ext.defer(function () {
                Ext.widget('component', {
                    renderTo: id1,
                    cls:"delete-icon fa fa-minus-circle action-delete-color-font"
                }).getEl().on('click', function () { me.fireEvent('deleterecord', me, store, record, {}); }, me);
            }, 50);
            return Ext.String.format(s, value, id1);
        }
    }

});