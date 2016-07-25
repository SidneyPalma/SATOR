//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessing', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessing',

    storeId: 'flowprocessing',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessing'
    ],

    url: '../iSterilization/business/Calls/flowprocessing.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessing'

});