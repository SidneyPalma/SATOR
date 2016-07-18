//@charset UTF-8
Ext.define( 'iAdmin.store.areas.EquipmentCycle', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EquipmentCycle',

    storeId: 'equipmentcycle',

    requires: [
        'iAdmin.model.areas.EquipmentCycle'
    ],

    url: '../iAdmin/business/Calls/equipmentcycle.php',

    model: 'iAdmin.model.areas.EquipmentCycle'

});