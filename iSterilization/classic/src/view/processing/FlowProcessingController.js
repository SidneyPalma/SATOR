//@charset UTF-8
Ext.define( 'iSterilization.view.processing.FlowProcessingController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.flowprocessing',

    routes: {
        'flowprocessingview/:id': {
            action: 'getFlowProcessingId'
        },
        'flowprocessingview': {
            action: 'getFlowProcessingNew'
        }
    },

    url: '../iSterilization/business/Calls/flowprocessing.php',

    fetchField: function (search, button) {
        Ext.getStore('flowprocessing').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ===================================>>
    getFlowProcessingId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('flowprocessing').findRecord('id', id);

        app.onMainPageView({xtype: 'flowprocessingview', xdata: record});
    },

    getFlowProcessingNew: function () {
        var app = Smart.app.getController('App');
        app.onMainPageView({xtype: 'flowprocessingview', xdata: null});
    }
//routes ===================================>>

});