//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingStepAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingStepAction',

    storeId: 'flowprocessingstepaction',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingStepAction'
    ],

    url: '../iSterilization/business/Calls/flowprocessingstepaction.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingStepAction'

});