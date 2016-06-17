//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseLayout', {
    extend: 'Ext.grid.property.Grid',

    xtype: 'itembaselayout',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.grid.property.Grid'
    ],

    cls: 'update-grid',

    rowLines: false,
    columnLines: false,

    plugins: ['insertrecordgrid'],

    listeners: {
        insertrecord: 'insertLayout',
        deleterecord: 'deleteLayout',
        updaterecord: 'updateLayout',
        updatesource: 'updateSource',
        edit: 'updateValues'
    },

    rendererField: function(value, metaData, record, rowIndex, colIndex, store) {
        var me = this,
            id1 = Ext.id(),
            id2 = Ext.id(),
            id3 = Ext.id(),
            c = store.getCount(),
            s = '<div>' +
                    '<div style="float: left;">{0}</div>' +
                    '<div id="{1}" style="float: right; padding-left: 6px;"></div>' +
                    '<div id="{2}" style="float: right; padding-left: 6px;"></div>' +
                    '<div id="{3}" style="float: right;"></div>' +
                '</div>';

        if( rowIndex == c-1 && c != 0 ) {
            Ext.defer(function () {
                Ext.widget('component', {
                    renderTo: id1,
                    cls:"delete-icon fa fa-minus-circle action-delete-color-font"
                }).getEl().on('click', function () { me.grid.fireEvent('deleterecord', me.grid, store, record, {}); }, me.grid);
                Ext.widget('component', {
                    renderTo: id2,
                    cls:"update-icon fa fa-check-circle action-update-color-font"
                }).getEl().on('click', function () { me.grid.fireEvent('updaterecord', me.grid, store, record, {}); }, me.grid);
                Ext.widget('component', {
                    renderTo: id3,
                    cls:"insert-icon fa fa-plus-circle action-insert-color-font"
                }).getEl().on('click', function () { me.grid.fireEvent('insertrecord', me.grid, store, {}); }, me.grid);
            }, 50);
            return Ext.String.format(s, value, id1, id2, id3);
        } else {
            Ext.defer(function () {
                Ext.widget('component', {
                    renderTo: id1,
                    cls:"delete-icon fa fa-minus-circle action-delete-color-font"
                }).getEl().on('click', function () { me.grid.fireEvent('deleterecord', me.grid, store, record, {}); }, me.grid);
                Ext.widget('component', {
                    renderTo: id2,
                    cls:"update-icon fa fa-check-circle action-update-color-font"
                }).getEl().on('click', function () { me.grid.fireEvent('updaterecord', me.grid, store, record, {}); }, me.grid);
            }, 50);
            return Ext.String.format(s, value, id1, id2, id3);
        }
    },

    rendererValue: function (value, metaData, record) {
        var me = this,
            name = record.get('name'),
            s = '<div>' +
                    '<div style="float: left;">{0}</div>' +
                    '<div style="float: right; color: red; width: 200px">{1}</div>' +
                '</div>';

        return Ext.String.format(s, value, 'OlaMundo');
    },

    fnBeforeRender: function (view, eOpts) {
        var me = this;
        me.columns[0].width = 170;
        me.columns[0].renderer = me.rendererField;
        //me.columns[1].renderer = me.rendererValue;
    }

});