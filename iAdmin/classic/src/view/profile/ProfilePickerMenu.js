//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfilePickerMenu', {
    extend: 'Ext.form.field.Picker',

    xtype: 'profilepickermenu',

    controller: 'profile',

    requires: [
        'iAdmin.view.profile.ProfileController',
        'iAdmin.view.profile.ProfileMenuAccess',
        'iAdmin.store.profile.ProfileMenuAction'
    ],


    triggerCls:'x-form-search-trigger',

    initComponent:function(){
        Ext.define('MyModel',{
            extend:'Ext.data.Model',
            idProperty:'id',
            fields: ['id','name']
        });

        this.createPicker({pickerField:this});
        this.callParent(arguments);
    },

    picker: null,

    createPicker: function(C){
        var me = this;

        if( !me.pciker ){
            me.picker = Ext.create('Ext.panel.Panel',{
                height: 400,
                floating: true,
                title:'complex picking panel',
                items:[
                    {
                        xtype: 'combo',
                        name: 'preselect',
                        valueField: 'id',
                        displayField: 'name',
                        store: Ext.create('Ext.data.ArrayStore', {
                            idIndex:0,
                            model:'MyModel',
                            data:[
                                [1,'one'],
                                [2,'two']
                            ]
                        })
                    }, {
                        xtype:'button',
                        text:'addValue',
                        handler: function ( ) {
                            console.info('Clicou');
                        }
                    }
                ]
            });
        }
        return me.picker;
    },

    listeners: {
        expand: function () {
            console.info(this.getAnchorXY());
        }
    }


});