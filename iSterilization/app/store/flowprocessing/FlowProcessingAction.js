//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingAction',

    storeId: 'flowprocessingaction',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingAction'
    ],

    url: '../iSterilization/business/Calls/flowprocessingaction.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingAction'

});