//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.EquipmentCycle', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EquipmentCycle',

    storeId: 'equipmentcycle',

    requires: [
        'iAdmin.model.itembase.EquipmentCycle'
    ],

    url: '../iAdmin/business/Calls/equipmentcycle.php',

    model: 'iAdmin.model.itembase.EquipmentCycle',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});