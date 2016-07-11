//@charset UTF-8
Ext.define( 'iAdmin.store.helper.EquipmentStatus', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EquipmentStatus',

    storeId: 'equipmentstatus',

    requires: [
        'iAdmin.model.helper.EquipmentStatus'
    ],

    url: '../iAdmin/business/Calls/equipmentstatus.php',

    model: 'iAdmin.model.helper.EquipmentStatus',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});