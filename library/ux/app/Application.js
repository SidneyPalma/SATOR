//@charset UTF-8
Ext.define( 'Smart.ux.app.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.app.Application'
    ],

    url: '',

    init: function() {
        var me = this;
        me.initQuickTips();

        Smart.app = me;

        Ext.USE_NATIVE_JSON = true;
        Ext.enableAriaButtons = false;
        Ext.setGlyphFontFamily('fontello');
        me.setDefaultToken(Ext.manifest.name.toLowerCase());
    },

    launch: function (a) {
        var me = this,
            loggedIn;

        loggedIn = localStorage.getItem(Ext.manifest.name + 'In');

        me.redirectTo(Ext.manifest.name.toLowerCase());

        Ext.Ajax.request({
            scope: me,
            method: 'post',
            url: me.url,
            params: {
                action: 'select',
                method: 'selectOpened'
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText),
                    rows = result.rows[0];

                if((result.success)&&(result.modulebuild != Ext.manifest.version)) {
                    success = false;
                    Ext.Msg.show({
                        title: 'Operação falhou!',
                        msg: 'Você está executando uma versão diferente da atualmente homolagada!',
                        buttons: Ext.Msg.CANCEL,
                        icon: Ext.Msg.WARNING
                    });
                }

                if(loggedIn && success && result.success && (result.modulebuild == Ext.manifest.version)) {
                    var link = document.createElement('link'),
                        view = Ext.create({xtype:'app-main'}),
						imageInfo = Ext.decode(rows.logoinfo),
						photoInfo = Ext.decode(rows.fileinfo),
                        imageLogo = Ext.String.format("data:{0};base64,{1}",imageInfo.fileType,rows.logodata),
						photoData = Ext.String.format("data:{0};base64,{1}",photoInfo.fileType,rows.filedata);

                    view.down('image[name=filedata]').setSrc(photoData);
					view.down('image[name=filelogo]').setSrc(imageLogo);
					
                    view.down('tbtext[name=username]').update(Ext.String.format('<a>{0}</a>',rows.fullname));
					view.down('tbtext[name=filelogo]').update(Ext.String.format('<a>{0}</a>',rows.legalname));

                    link.href = imageLogo;
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';

                    document.getElementsByTagName('head')[0].appendChild(link);

                    console.info(Ext.String.format('Is Test Base Access: {0}',result.isTest));

                    if(result.isTest == true) {
                        Ext.getBody().getById('marquee').show();
                    }

                } else {
                    Ext.create({xtype:'login'});
                }
            }

        });

        Ext.getBody().getById('preloader').hide();
        Ext.getBody().getById('buildapp').update('v'+Ext.manifest.version);
    },

    onAppUpdate: function () {
        var me = this;
        Ext.Msg.confirm('Atualizar a aplicação', 'Esta aplicação não está atualizada, recarregar?',
            function (choice) {
                if (choice === 'yes') {
                    me.redirectTo(Ext.manifest.name.toLowerCase());
                    window.location.reload();
                }
            }
        );
    }

});