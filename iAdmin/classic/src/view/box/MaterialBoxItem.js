//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItem', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialboxitem',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.box.*',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.store.box.MaterialBoxItem',
        'iAdmin.view.material.MaterialSearch'
    ],

    rowLines: false,

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditBoxItem'
    },

    store: 'materialboxitem',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;
        //OlaMUndosss

        Ext.create('iAdmin.store.box.MaterialBoxItem');

        me.columns = [
            {
                flex: 1,
                dataIndex: 'materialname',
                editor: {
                    showClear: false,
                    allowBlank: false,
                    xtype: 'materialsearch'
                },
                renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                    var me = this,
                        i = Ext.id(),
                        s = '<div>' +
                                '<div style="float: left;">{0}</div>' +
                                '<div id="{1}" style="float: right; padding-left: 6px; font-size: 18px;"></div>' +
                            '</div>',
                        t = 'text-align: center; font-weight: bold; color: red; background: rgb(253, 255, 246); cursor: pointer;';

                    metaData.style = Ext.isNumeric(record.get('id')) != true ? t : '';

                    if(Ext.isNumeric(record.get('id')) == true) {
                        Ext.defer(function () {
                            Ext.widget('component', {
                                renderTo: i,
                                cls:"update-icon fa fa-cog action-insert-color-font"
                            }).getEl().on('click', function () { me.grid.fireEvent('updaterecord', me.grid, store, record, {}); }, me.grid);
                        }, 50);
                    } else {
                        return value;
                    }

                }
            }
        ];
    }

});