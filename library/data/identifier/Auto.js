//@charset UTF-8
Ext.define( 'Smart.data.identifier.Auto', {
    extend: 'Ext.data.identifier.Sequential',

    alias: 'data.identifier.auto',

    requires: [
        'Ext.data.identifier.Sequential'
    ],

    config: {
        seed: 0,
        id: 'auto',
        prefix: 'SMART_'
    }

});