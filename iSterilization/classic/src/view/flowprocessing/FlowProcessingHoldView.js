//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingHoldView', {
    extend: 'Ext.view.View',

    xtype: 'flowprocessingholdview',

    requires: [
        'Ext.view.View'
    ],

    trackOver: true,
    autoScroll: true,
    multiSelect: false,
    itemSelector: 'div.hold',

    url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'item',
            type: 'int'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'lineone',
            type: 'auto'
        }, {
            name: 'movementdate',
            type: 'auto'
        }, {
            name: 'movementtype',
            type: 'auto'
        }, {
            name: 'movementtypedescription',
            type: 'auto'
        }, {
            name: 'releasestype',
            type: 'auto'
        }, {
            name: 'releasestypedescription',
            type: 'auto'
        }, {
            name: 'movementuser',
            type: 'auto'
        }
    ],

    tpl: [
        '<tpl for=".">',
            '<div style="margin-bottom: 10px;" class="hold hold-{movementtype}">',
                '<div class="hold-barcode">',
                    '<div style="margin-top: 6px;"><img src="../iSterilization/business/Calls/armorymovement.php?action=select&method=renderCode&barCode={id}"/></div>',
                '</div>',
                '<div class="hold-left">',
                    '<span style="font-size: 18px; display: block;">{lineone}</span>',
                    '<span>{movementuser}</span>',
                '</div>',
                '<div class="hold-right">',
                    '<i class="select fa fa-info-circle action-select-color-font"></i>',
                    '<i class="delete fa fa-minus-circle action-delete-color-font"></i>',
                '</div>',
            '</div>',
        '</tpl>'
    ],

    emptyText: '<h4 style="text-align: center; line-height: 40px;" class="insert-record">Nenhum processo na etapa...</h4>',

    initComponent: function () {
        var me = this;

        me.params = {
            action: 'select',
            method: 'releasesTypeA',
            areasid: Smart.workstation.areasid
        };

        me.callParent();

        me.onAfter( 'afterrender', me.fnAfterRender, me);
    },

    fnAfterRender: function () {
        var me = this;

        me.el.on('click', function (event, target) {
            me.fireEvent('deleterecord', me, me.store, event, target);
        }, null, {
            delegate: 'i.delete'
        });

        me.el.on('click', function (event, target) {
            me.fireEvent('selectrecord', me, me.store, event, target);
        }, null, {
            delegate: 'i.select'
        });
    }

});