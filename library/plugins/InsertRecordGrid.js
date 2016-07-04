//@charset UTF-8
Ext.define( 'Smart.plugins.InsertRecordGrid', {
    extend: 'Ext.plugin.Abstract',

    mixins: [
        'Ext.mixin.Observable'
    ],

    alias: "plugin.insertrecordgrid",

    requires: [
        'Ext.plugin.Abstract'
    ],

    init: function(grid) {
        var me = this;

        me.grid = grid;

        if (grid.rendered) {
            // me.mon(grid, {
            //     scope: me,
            //     afterlayout: {
            //         scope: me,
            //         //single: true,
            //         fn: me.insertRecordRender
            //     }
            // });
        } else {
            me.mon(grid, {
               scope: me,
               afterlayout: {
                   scope: me,
                   //single: true,
                   fn: me.insertRecordRender
               }
            });
        }
    },

    insertRecordRender: function () {
        var me = this;
        if((me.grid.insertRecordId) && (me.grid.store.getCount() == 0)) {
            Ext.widget('label', {
                text: 'Inserir Novo Registro',
                renderTo: me.grid.insertRecordId,
                style: { cursor: 'pointer', color: 'red' }
            }).getEl().on('click', function () { me.grid.fireEvent('insertrecord', me.grid, me.grid.store, {}); }, me.grid);
        }
    }

    //onStateChange: function () {
    //    var me = this;
    //    console.info(me.grid.insertRecordId);
    //    if ((me.grid.insertRecordId) && (me.grid.store.getCount() == 0)) {
    //        Ext.widget('label', {
    //            text: 'Inserir Novo Registro',
    //            renderTo: me.grid.insertRecordId,
    //            style: { cursor: 'pointer', color: 'red' }
    //        }).getEl().on('click', function () { me.grid.fireEvent('insertrecord', me.grid, me.grid.store, {}); }, me.grid);
    //    }
    //}

});