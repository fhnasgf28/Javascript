odoo.define('crminternal_ktt_modifier.kanban_activity_log_popup', function (require) {
    'use strict';

    const KanbanRecord = require('web.KanbanRecord');
    const Dialog = require('web.Dialog');

    KanbanRecord.include({
        events: Object.assign({}, KanbanRecord.prototype.events, {
            'click .oe_kanban_activity_log': '_onOpenLogPopup',
        }),

        /**
         * Event handler for opening the log popup.
         * @param {Event} event
         */
        _onOpenLogPopup: function (event) {
            event.preventDefault();
            const recordId = $(event.currentTarget).data('id');

            this._rpc({
                model: 'mail.activity',
                method: 'search_read',
                domain: [['res_model', '=', 'crm.lead'], ['res_id', '=', recordId]],
                fields: ['id', 'activity_type_id',],
            }).then((activities) => {
                if (activities.length) {
                    const activityDetails = activities.map(activity => `
                        <div style="margin-bottom: 15px;">
                            <strong>${activity.activity_type_id[1]}
                        </div>
                    `).join('');

                    new Dialog(this, {
                        title: 'Activities Log',
                        size: 'medium',
                        $content: $(`
                            <div>
                                ${activityDetails}
                            </div>
                        `),
                    }).open();
                } else {
                    Dialog.alert(this, 'No activities found for this record.', {
                        title: 'No Activities',
                    });
                }
            });
        },
    });
});
