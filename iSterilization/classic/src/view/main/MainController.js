//@charset UTF-8
Ext.define( 'iSterilization.view.main.MainController', {
    extend: 'Smart.ux.main.MainController',

    alias: 'controller.main',

    requires: [
        'Smart.ux.main.MainController',
        'iAdmin.view.person.client.ClientEdit'
    ],

    url: '../iAdmin/business/Calls/users.php',

    doStart: function (view) {
        var me = this,
            ctrll = Smart.app.getController('App'),
            button = view.down('button[toggleHandler=onToggleMicro]');

        // me.onToggleMicro(button,true);

        if(Smart.workstation) {
            Ext.Ajax.request({
                scope: me,
                url: '../iAdmin/business/Calls/Areas.php',
                params: {
                    action: 'select',
                    method: 'selectCode',
                    rows: Ext.encode({id: Smart.workstation.areasid})
                },
                callback: function (options, success, response) {
                    var result = Ext.decode(response.responseText);

                    if(!success || !result.success) {
                        return false;
                    }

                    var data = result.rows[0];

                    if(data.hasstock == 1) {
                        ctrll.onMainPageView({ xtype: "flowprocessinghold" });
                        history.pushState({}, "start", "#flowprocessinghold");
                        return false;
                    }

                    ctrll.onMainPageView({ xtype: "flowprocessingstep" });
                    history.pushState({}, "start", "#flowprocessingstep");
                }
            });
        }
    }

});