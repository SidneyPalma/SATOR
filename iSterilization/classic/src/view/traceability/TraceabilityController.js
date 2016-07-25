//@charset UTF-8
Ext.define( 'iSterilization.view.traceability.TraceabilityController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.traceability',

    routes: {
        'traceabilityview/:id': {
            action: 'getFlowProcessingId'
        },
        'traceabilityview': {
            action: 'getFlowProcessingNew'
        }
    },

    url: '../iSterilization/business/Calls/traceability.php'

    // fetchField: function (search, button) {
    //     Ext.getStore('flowprocessing').setParams({
    //         query: search.getValue()
    //     }).load();
    // },
    //
    // //routes ===================================>>
    // getFlowProcessingId: function (id) {
    //     var app = Smart.app.getController('App'),
    //         record = Ext.getStore('flowprocessing').findRecord('id', id);
    //
    //     app.onMainPageView({xtype: 'flowprocessingview', xdata: record});
    // },
    //
    // getFlowProcessingNew: function () {
    //     var app = Smart.app.getController('App');
    //     app.onMainPageView({xtype: 'flowprocessingview', xdata: null});
    // }
    //routes ===================================>>

});