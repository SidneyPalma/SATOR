//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingStepMessage', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingStepMessage',

    storeId: 'flowprocessingstepmessage',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingStepMessage'
    ],

    url: '../iSterilization/business/Calls/flowprocessingstepmessage.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingStepMessage'

});