odoo.define('crminternal_ktt_modifier.create_invoice_widget', function (require) {
    "use strict";

    const KanbanRecord = require('web.KanbanRecord');
    const Dialog = require('web.Dialog');

    KanbanRecord.include({
        events: Object.assign({}, KanbanRecord.prototype.events, {
            'click .o_create_quotation_button': '_onCreateQuotation',
        }),

        /**
         * Handle click event to create quotation.
         * @param {Event} event
         */
        _onCreateQuotation: function (event) {
            event.preventDefault();
            const recordId = $(event.currentTarget).data('id');

            this._rpc({
                model: 'crm.lead',
                method: 'action_create_quotation',
                args: [[recordId]],
            }).then((action) => {
                if (action) {
                    this.do_action(action);
                } else {
                    Dialog.alert(this, 'Failed to create quotation.', {
                        title: 'Error',
                    });
                }
            });
        },
    });
});