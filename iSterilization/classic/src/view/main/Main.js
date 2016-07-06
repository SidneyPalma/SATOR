//@charset UTF-8
Ext.define( 'iSterilization.view.main.Main', {
    extend: 'Smart.ux.main.Main',

    xtype: 'app-main',

    requires: [
        'Smart.ux.main.Main',
        'iAdmin.store.module.ModuleMenuTree',
        'iSterilization.view.main.MainController'
    ],

    controller: 'main',

    module: null,

    initComponent: function () {
        var me = this;

        Ext.create('iAdmin.store.module.ModuleMenuTree');

        me.callParent();
    }

});