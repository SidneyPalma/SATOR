//@charset UTF-8
Ext.define( 'iSterilization.store.processing.FlowProcessing', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessing',

    storeId: 'flowprocessing',

    requires: [
        'iSterilization.model.processing.FlowProcessing'
    ],

    url: '../iSterilization/business/Calls/flowprocessing.php',

    model: 'iSterilization.model.processing.FlowProcessing',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectItem'
        }
    }

});