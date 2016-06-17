//@charset UTF-8
Ext.define( 'iAdmin.view.main.Main', {
    extend: 'Smart.ux.main.Main',

    xtype: 'app-main',

    requires: [
        'Smart.ux.main.Main',
        'iAdmin.view.main.MainController',
        'iAdmin.store.module.ModuleMenuTree'
    ],

    controller: 'main',

    initComponent: function () {
        var me = this;

        Ext.create('iAdmin.store.module.ModuleMenuTree');

        me.callParent();
    }

});