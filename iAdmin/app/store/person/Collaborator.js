//@charset UTF-8
Ext.define( 'iAdmin.store.person.Collaborator', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Collaborator',

    storeId: 'collaborator',

    requires: [
        'iAdmin.model.person.Collaborator'
    ],

    url: '../iAdmin/business/Calls/collaborator.php',

    model: 'iAdmin.model.person.Collaborator',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});