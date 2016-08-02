//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingMaterial', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingMaterial',

    storeId: 'flowprocessingmaterial',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingMaterial'
    ],

    url: '../iSterilization/business/Calls/flowprocessingmaterial.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingMaterial',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});