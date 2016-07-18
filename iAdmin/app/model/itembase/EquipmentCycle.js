//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.EquipmentCycle', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'equipmentid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'cycleid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'cyclename',
            type: 'auto',
            convert: function (value,record) {
                var cycle = ' ({0} Min/{1} ºC)';
                return value + Ext.String.format(cycle,record.get('duration'),record.get('temperature'));
            }
        }, {
            name: 'duration',
            type: 'auto'
        }, {
            name: 'temperature',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean',
            persist: true,
            critical: true
        }
    ]

});