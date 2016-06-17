//@charset UTF-8
Ext.define( 'iAdmin.view.person.collaborator.CollaboratorSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'collaboratorsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.person.Collaborator'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.person.Collaborator'

});
