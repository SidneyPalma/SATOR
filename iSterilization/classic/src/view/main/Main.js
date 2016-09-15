//@charset UTF-8
Ext.define( 'iSterilization.view.main.Main', {
    extend: 'Smart.ux.main.Main',

    xtype: 'app-main',

    requires: [
        'Smart.ux.main.Main',
        'Smart.util.IonSound',
        'iAdmin.store.module.ModuleMenuTree',
        'iSterilization.view.main.MainController'
    ],

    controller: 'main',

    module: null,

    initComponent: function () {
        var me = this;

        Ext.create('iAdmin.store.module.ModuleMenuTree');

        me.callParent();

        Smart.ion.init(window, navigator);

        Smart.ion.sound({
            sounds: [
                {name: "button_tiny"},
                {name: "metal_plate"},
                {name: "water_droplet"},
                {name: "computer_error"}
            ],
            path: "resources/sounds/",
            preload: true,
            volume: 1.0
        });
    },

    doStart: function (view) {
        var me = this.getController(),
            ctrll = Smart.app.getController('App'),
            button = view.down('button[toggleHandler=onToggleMicro]'),
            first = ctrll.onMainPageView({ xtype: 'flowprocessingstep' });

        me.onToggleMicro(button,true);

        first.searchToogle();

        Ext.defer(function () {
            first.down('textfield[name=search]').focus(false,200);
            first.down('label[name=labelitem]').setText('Consultar');
        },1000);

        history.pushState({}, "pg1", "#flowprocessingstep");
    }

});