//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.sterilizationtype',

    url: '../iAdmin/business/Calls/sterilizationtype.php',

    routes: {
        'sterilizationtypeview/:id': {
            action: 'getSterilizationTypeId'
        },
        'sterilizationtypeview': {
            action: 'getSterilizationTypeNew'
        }
    },

    fetchField: function (search, button) {
        Ext.getStore('sterilizationtype').setParams({
            query: search.getValue()
        }).load();
    },

    getSterilizationTypeId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('sterilizationtype').findRecord('id',id);

        app.onMainPageView({xtype: 'sterilizationtypeview', xdata: record});
    },

    getSterilizationTypeNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'sterilizationtypeview', xdata: null});
    },

    //routes ========================>

    onAfterRenderView: function (view) {
        var xdata = view.xdata;

        if(!xdata) return false;

        view.loadRecord(xdata);

        Ext.getStore('sterilizationtypematerial').setParams({
            method: 'selectItems',
            query: xdata.get('id')
        }).load();
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;

        Ext.getStore('sterilizationtype').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'sterilizationtypeview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('sterilizationtypeview');
    },

    updateView: function () {
        var me = this,
            view = me.getView(),
            graphpaper = view.down('hiddenfield[name=graphpaper]');

        graphpaper.setValue(Ext.encode(me.router.graph.toJSON()));

        me.setModuleForm(view);
        me.setModuleData('sterilizationtype');

        me._success = function (form, action) {
            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
                Ext.getStore('sterilizationtypematerial').setParams({
                    method: 'selectItems',
                    query: action.result.rows.id
                }).load();
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            list = me.router.graph.getElements(),
            data = ['uml.StartState','uml.EndState'];

        view.reset();

        Ext.each(list,function(cell) {
            if(data.indexOf(cell.get('type')) == -1) {
                cell.remove();
            }
        });

        view.down('tabpanel').setActiveTab(0);
        view.down('textfield[name=name]').setReadColor(false);
        Ext.getStore('sterilizationtypematerial').removeAll();
    },

    activatedCoreFlow: function () {
        var me = this,
            view = me.getView(),
            flow = view.down('sterilizationtypeflow'),
            core = Ext.create('Smart.util.CoreFlow', { url: me.url });

        me.router = new core.router();
        me.router.initializeEditor(flow.getWidth()-350,flow.getHeight(),core.stencil,flow);

        me.router.graph.rules = me.getCoreFlowRule();

        if(view.xdata) {
            me.router.graph.fromJSON(Ext.decode(view.xdata.get('graphpaper')));
            me.router.graph.rules = Ext.decode(view.xdata.get('dataflowrule'));
        }

        me.router.paper.isValid();
    },

    getCoreFlowRule: function () {
        var me = this,
            rules = {};

        Ext.Ajax.request({
            scope: me,
            async: false,
            url: 'resources/CoreFlowRule.json',
            callback: function (options, success, response) {
                if(success) {
                    rules = Ext.decode(response.responseText);
                }
            }
        });

        return rules;
    },

    onGraphChanged: function (graph, scope) {
        var items = graph.getElements();

        Ext.each(items,function(item){
            if(item instanceof joint.shapes.basic.Step) {
                item.isValid(graph);
            }
        });

        this.router.paper.isValid();
    },

    onAnnotateShow: function (router, cellView, evt, x, y, scope) {
        var attrs = cellView.model.get('attrs'),
            win = Ext.widget('coreflownoteview', {cellView: cellView});

        win.show(null,function () {
            this.down('textareafield[name=content]').setValue(cellView.model.get('content'));
        });
    },

    onLinkDblClick: function (router, cellView, evt, x, y, scope) {
        var me = this,
            attrs = cellView.model.get('attrs'),
            label = cellView.model.get('labels'),
            targetId = cellView.model.attributes.target,
            target = cellView.paper.model.getCell(targetId),
            win = Ext.widget('coreflowlinkview', { cellView: cellView });

        win.show(null,function () {
            if(target.get('type') != 'basic.Equipment') {
                this.down('numberfield[name=steppriority]').hide();
            }
            this.down('textfield[name=label]').setValue(label ? label[0].attrs.text.text : '');
            this.down('checkboxfield[name=dashedline]').setValue(attrs['.connection']['stroke-dasharray'] == "5 2");
            this.down('numberfield[name=steppriority]').setValue(label && (label.length > 1) ? label[1].attrs.text.text : '');
        });
    },

    updateNote: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues();

        view.cellView.model.set('content',values.content);

        view.close();
    },

    updateLink: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues();

        view.cellView.model.attr('.connection/stroke-dasharray', values.dashedline ? '5 2' : '');
        view.cellView.model.set('labels', [
            {
                position: 0.5,
                attrs: {
                    rect: { stroke: '#7C68FC', fill: '#7C68FC', 'stroke-width': 10, rx: 5, ry: 5 },
                    text: { text: values.label, fill: '#FFFFFF', style: 'text-shadow: 0 1px 1px #111111;' }
                }
            }, {
                position: -25,
                attrs: {
                    rect: { stroke: '#8A9B0F', fill: '#8A9B0F', 'stroke-width': 10, rx: 5, ry: 5 },
                    text: { text: values.steppriority, fill: '#FFFFFF', style: 'text-shadow: 0 1px 1px #111111;' }
                }
            }
        ]);

        var target = view.cellView.paper.model.getCell(view.cellView.model.prop('target/id'));

        if(target.get('type') == 'basic.Equipment') {
            target.set('steppriority',values.steppriority);
        }

        view.close();
    },

    onTargetChange: function (graph, link, scope) {
        var me = this,
            data = [],
            stepflaglist = '',
            target = graph.getCell(link.prop('target/id')),
            source = graph.getCell(link.prop('source/id')),
            targetType = target.get('type'),
            sourceType = source.get('type'),
            breakflow = ((targetType == 'basic.Equipment')&&(sourceType == 'uml.BreakFlow'));

        if(targetType == 'basic.Equipment') {
            stepflaglist = target.get('stepflaglist');
            breakflow = (stepflaglist.indexOf('006') != -1);
        }

        me.connection(link,breakflow);

        if(breakflow) {
            stepflaglist = stepflaglist.replace('006', '000');
            data = Ext.decode(stepflaglist);
            data.push('006');
            var index = data.indexOf('000');
            if (index > -1) { data.splice(index, 1); }
            stepflaglist = Ext.encode(data);
            target.set('stepflaglist',stepflaglist);
        }

    },

    onDropCellView: function (graph, cell, scope) {

    },

    onStepDblClick: function (router, cellView, evt, x, y, scope) {
        var win = Ext.widget('coreflowcellview', {cellView: cellView}),
            stepflaglist = Ext.decode(cellView.model.get('stepflaglist'));

        win.show(null,function () {
            Ext.getStore('sterilizationtypeflag').load({
                callback: function(records, operation, success) {
                    Ext.each(stepflaglist,function (item) {
                        var model = Ext.getStore('sterilizationtypeflag').findRecord('code',item);
                        if(model) {
                            model.set('isactive',true);
                            model.commit();
                        }
                    });
                }
            });
            this.down('textfield[name=name]').setValue(cellView.model.get('name'));
            this.down('hiddenfield[name=id]').setValue(cellView.model.get('typeid'));
            this.down('hiddenfield[name=type]').setValue(cellView.model.get('type'));
            this.down('textfield[name=steplevel]').setValue(cellView.model.get('myLevel'));
            this.down('textareafield[name=description]').setValue(cellView.model.get('description'));
            if(cellView.model.get('type') != 'basic.Equipment') {
                this.down('gridpanel').hide();
                this.down('textfield[name=steplevel]').hide();
                this.down('button[handler=updateCell]').hide();
            }
        });
    },

    updateCell: function () {
        var me = this,
            data = [],
            view = me.getView(),
            graph = view.cellView.paper.model,
            store = Ext.getStore('sterilizationtypeflag'),
            links = graph.getConnectedLinks(view.cellView.model, { inbound: true });

        store.each(function(rec) {
            if(rec.get('isactive')) data.push(rec.get('code'));
        });

        view.cellView.model.set('stepflaglist',Ext.encode(data));

        me.connection(links);

        if(view.cellView.model.get('stepflaglist').indexOf("006") != -1 ) {
            me.connection(links,true);
        }

        view.close();
    },

    updateFlowRules: function () {
        var me = this,
            view = me.getView(),
            win = Ext.widget('coreflowcellrule', {
                xdata: view.xdata,
                graph: me.router.graph
            });

        win.show();
    },

    onSelectBasicStep: function () {
        var me = this,
            data = [],
            view = me.getView(),
            form = view.down('form'),
            value = form.getValues(),
            rules = view.graph.rules[value.basicstep],
            overs = [
                "uml.StartState",
                "uml.EndState",
                "basic.Equipment"
            ],
            basic = {
                "multiLinks": "Somente associações simples",
                "uml.StartState": "Iniciar fluxo",
                "basic.Area": "CMEArea",
                "basic.SubArea": "CMESubArea",
                "basic.Equipment": "Equipamento",
                "uml.BreakFlow": "Quebra de fluxo",
                "uml.EndState": "Finalizar fluxo"
            };

        if(value.basicstep.length == 0) {
            return false;
        }

        for (var key in basic) {
            if((value.basicrule == 'source')&&(key == "uml.StartState")) {
                continue;
            }
            if((value.basicrule == 'target')&&(overs.indexOf(key) != -1)&&(value.basicstep == "basic.Equipment")) {
                continue;
            }

            if (basic.hasOwnProperty(key)) {
                data.push({
                    "basicstep": key,
                    "basicstepdescription": basic[key],
                    "basicsteplinks": rules[value.basicrule][key] || 0
                });
            }
        }

        view.down('gridpanel').getStore().loadData(data);
    },

    onRulesEdit: function (editor, context, eOpts) {
        var me = this,
            view = me.getView(),
            record = context.record,
            form = view.down('form'),
            value = form.getValues(),
            basicstep = record.get('basicstep');

        if( (basicstep == 'multiLinks') && ([0,1].indexOf(context.value) == -1) ) {
            context.value = 1;
            context.record.set('basicsteplinks',1);
        }

        view.graph.rules[value.basicstep][value.basicrule][basicstep] = record.get('basicsteplinks');

        me.onUpdateBasicStep(record);
    },

    standardRule: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            value = form.getValues(),
            rules = me.getCoreFlowRule();

        if(value.basicstep.length == 0) {
            return false;
        }

        view.graph.rules[value.basicstep] = rules[value.basicstep];
        me.onSelectBasicStep();
        me.onUpdateBasicStep();
    },

    onUpdateBasicStep: function (record) {
        var me = this,
            view = me.getView();

        Ext.Ajax.request({
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode({ id: view.xdata.get('id'), dataflowrule: Ext.encode(view.graph.rules) })
            },
            success: function(response){
                var result = Ext.decode(response.responseText);
                if(!record) return false;
                if(result.success == true) {
                    record.commit();
                } else {
                    record.reject();
                }
            },
            failure: function(response){
                if(record) record.reject();
            }
        });
    },

    /**
     * Update Element
     *
     */
    connection: function (links,breakFlow) {
        var data = [];

        if(!Ext.isArray(links)) {
            data.push(links);
        } else {
            data = links;
        }

        Ext.each(data,function (link) {
            link.attr('.marker-target/fill', '#4b4a67');
            link.attr('.marker-target/stroke', '#4b4a67');
            link.attr('.marker-target/d', 'M 10 0 L 0 5 L 10 10 z');

            if(breakFlow) {
                link.attr('.marker-target/fill', 'rgb(231, 76, 60)');
                link.attr('.marker-target/stroke', 'rgb(231, 76, 60)');
                link.attr('.marker-target/transform', 'scale(1)');
                link.attr('.marker-target/d', 'M33 0 a 11 11 0 1 0 0.0001 0z');
            }
        });

    },

    /**
     * ToolBar Actions
     *
     */
    elementToBack: function () {
        var me = this;
        Ext.each(me.router.selection.models,function (model) {
            model.toBack();
        });
    },

    elementToFront: function () {
        var me = this;
        Ext.each(me.router.selection.models,function (model) {
            model.toFront();
        });
    },

    updateViewFlow: function () {
        var me = this,
            dataflowstep = [],
            stepflaglist = "",
            view = me.getView(),
            cells = me.router.graph.getElements(),
            sortByKey = function (array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };

        if(!me.router.paper.isValid()) {
            return false;
        }

        Ext.each(cells,function(item){
            if(item instanceof joint.shapes.basic.Step) {
                stepflaglist = (item.get('type') == 'basic.Equipment') ? item.get('stepflaglist') : '';
                dataflowstep.push({
                    "steplevel": item.get('steplevel'),
                    "stepitems": {
                        "typeid": item.get('typeid'),
                        "stepflaglist": stepflaglist,
                        "areasiddo": item.get('areasiddo'),
                        "areasidto": item.get('areasidto'),
                        "steppriority": item.get('steppriority') || 0,
                        'isstartstate': item.get('isstartstate') || 0
                    }
                });
            }
        });

        dataflowstep = sortByKey(dataflowstep, "steplevel");

        Ext.Ajax.request({
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode({ id: view.xdata.get('id'), dataflowstep: Ext.encode(dataflowstep) })
            }
        });
    },

    commandManagerUndo: function () {
        var me = this;
        me.router.commandManager.undo();
    },

    commandManagerRedo: function () {
        var me = this;
        me.router.commandManager.redo();
    },

    paperScrollerZoomIn: function () {
        var me = this;
        me.router.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
    },

    paperScrollerZoomOut: function () {
        var me = this;
        me.router.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
    },

    paperScrollerZoomFit: function () {
        var me = this;
        me.router.paperScroller.zoomToFit({ padding: 20, scaleGrid: 0.2, minScale: 0.2, maxScale: 5 });
    }

});