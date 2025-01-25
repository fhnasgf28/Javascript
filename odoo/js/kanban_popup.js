odoo.define('crminternal_ktt_modifier.kanban_view', function (require) {
"use strict";

    var KanbanView = require('web.KanbanView');
    var KanbanRecord = require('web.KanbanRecord');

    KanbanRecord.include({
        _openLog: function () {
            var self = this;
            var leadId = this.recordData.id;

            // Fetch log data from the server
            this._rpc({
                model: 'crm.lead',
                method: 'get_activity_log',
                args: [leadId],
            }).then(function (result) {
                // Render the template with the log data
                var $modal = $(QWeb.render('crm_lead_activity_log_template', {
                    messages: result.messages,
                    activities: result.activities,
                }));
                $modal.modal();
            });
        },
    });

    KanbanView.include({
        _onKanbanAction: function (ev) {
            // Check if the clicked element is the log icon
            if ($(ev.target).closest('.oe_kanban_activity_log').length) {
                var recordId = $(ev.target).closest('.oe_kanban_activity_log').data('id');
                var record = this.model.get(recordId);
                record._openLog();
                return;
            }
            return this._super.apply(this, arguments);
        },
    });
});