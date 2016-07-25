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

    url: '../iSterilization/business/Calls/traceability.php',

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

    onAfterRenderView: function (view) {
        var me = this,
            datepicker = view.down('datepicker');

        me.selectDatePicker(datepicker,datepicker.getValue());
    },

    selectDatePicker: function (datePicker, date, eOpts) {
        var me = this,
            view = me.getView(),
            labelperiod = view.down('label[name=labelperiod]');

        labelperiod.setText(me.getDateFormated(date));
    },
    
    selectTraceability: function (combo,record,eOpts) {
        var me = this,
            view = me.getView(),
            traceability = view.down('container[name=traceability]');

        traceability.getLayout().setActiveItem(record.get('traceability_type'));
    }

});