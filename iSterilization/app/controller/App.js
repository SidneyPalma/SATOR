//@charset UTF-8
Ext.define( 'iSterilization.controller.App', {
    extend: 'Smart.ux.app.ApplicationController',

    requires: [
        'Smart.ux.app.ApplicationController'
    ],

    routes: {
        'userslist': {
            action: 'setUsersList'
        },
        'enumtypelist': {
            action: 'setEnumTypeList'
        },
        'profilelist': {
            action: 'setProfileList'
        },
        'materiallist': {
            action: 'setMaterialList'
        },
        'serviceregistrationlist': {
            action: 'setServiceRegistrationList'
        },
        'flowprocessingdash': {
            action: 'setFlowprocessingDash'
        },
        'flowprocessingstep': {
            action: 'setFlowProcessingStep'
        }
    },

    //routes ========================>

    setUsersList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'userslist', iconCls: rc.get("iconCls") });
    },

    setEnumTypeList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'enumtypelist', iconCls: rc.get("iconCls") });
    },

    setMaterialList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'materiallist', iconCls: rc.get("iconCls") });
    },

    setProfileList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'profilelist', iconCls: rc.get("iconCls") });
    },

    setServiceRegistrationList: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'serviceregistrationlist', iconCls: rc.get("iconCls") });
    },

    setFlowprocessingDash: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'flowprocessingdash', iconCls: rc.get("iconCls") });
    },

    setFlowProcessingStep: function () {
        var me = this,
            rc = me.getMainTree().getSelection();

        return me.onMainPageView({ xtype: 'flowprocessingstep', iconCls: rc ? rc.get("iconCls") : null });
    }

    //routes ========================>

});