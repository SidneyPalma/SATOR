//@charset UTF-8
Ext.define( 'Ext.overrides.form.field.File', {
    override: 'Ext.form.field.File',

    file: {},

    // onFileChange: function(button, e, value) {
    //     var newValue = value.replace(/^c:\\fakepath\\/i, '');
    //
    //     return this.callParent([ button, e, newValue ]);
    // }

    getFileName: function () {
        return this.file._name;
    },
    
    getFileType: function () {
        return this.file._type;
    },
    
    getFileByte: function () {
        return this.file._byte;
    },
    
    getFileData: function () {
        return this.file._data;
    },
    
    getFileSize: function () {
        return this.file._size;
    },
    
    doFileData: function (panel) {
        var me = this,
            image = me.getFileData();
        me.beFileData(panel,image);
    },
    
    beFileData: function (panel,image) {
        var fileData = image;
        panel.down('image').setSrc(fileData);
    },

    initComponent: function () {
        var me = this;

        me.callParent();

        me.onAfter('change', me.fnChange, me);
        me.onAfter('afterrender', me.fnAfterRender, me);
    },

    fnChange: function (cmp, value, eOpts) {
        var f = new FileReader(),
            x = cmp.fileInputEl.dom;

        f.readAsDataURL(x.files[0]);

        f.onloadend = function () {
            cmp.file._data = f.result;
            cmp.file._byte = x.files[0].size;
            cmp.file._type = x.files[0].type;
            cmp.file._name = x.files[0].name;
            cmp.file._size = Ext.util.Format.fileSize(cmp.file._byte);

            if (parseInt(cmp.file._byte) == 0) {
                Ext.Msg.alert('Failure', 'Este arquivo esta vazio! Nao pode ser enviado!');
                cmp.reset();
                return false;
            }

            if (parseInt(cmp.file._byte) > 1048576) {
                Ext.Msg.alert('Failure', 'Este arquivo e maior que 1MB! Nao pode ser enviado!');
                cmp.reset();
                return false;
            }

            cmp.fireEvent('loadend', cmp, cmp.file, eOpts);
            cmp.up('form').down('hiddenfield[name=_loadendfile]').reset();
            cmp.up('form').down('hiddenfield[name=_loadendfile]').setValue(cmp.file._name);
        };
    },

    fnAfterRender: function (cmp, eOpts) {
        cmp.fileInputEl.set({ accept: cmp.accept });
        cmp.up('form').add(Ext.widget('hiddenfield', { name: '_loadendfile' }));
    }

});