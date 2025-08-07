//odoo.define('equip3_crm_operation.contact_form_validation', function (require) {
//    'use strict';
//
//    var core = require('web.core');
//    var publicWidget = require('web.public.widget');
//    var ajax = require('web.ajax');
//    var _t = core._t;
//
//    publicWidget.registry.ContactFormValidation = publicWidget.Widget.extend({
//        selector: '.s_website_form form[data-model_name="crm.lead"]',
//        events: {
//            'change input[name="email_from"]': '_onEmailChange',
//            'change input[name="phone"]': '_onPhoneChange',
//            'change input[name="contact_name"]': '_onNameChange',
//            'submit': '_onFormSubmit'
//        },
//
//        /**
//         * @override
//         */
//        start: function () {
//            this.warningBanner = $('<div class="alert alert-warning mt-2 mb-2 duplicate-warning" style="display:none;"><i class="fa fa-exclamation-triangle"></i> <span class="warning-message"></span></div>');
//            this.$el.prepend(this.warningBanner);
//
//            // Override the form's submit handler to handle errors
//            var self = this;
//            var superSubmit = this.$el.submit;
//            this.$el.submit(function (e) {
//                e.preventDefault();
//                e.stopPropagation();
//
//                // Show loading indicator
//                var submitBtn = self.$el.find('button[type="submit"], .s_website_form_send');
//                var btnText = submitBtn.text();
//                submitBtn.prop('disabled', true);
//                submitBtn.html('<i class="fa fa-spinner fa-spin"></i> ' + btnText);
//
//                // Submit the form via AJAX
//                $.ajax({
//                    type: "POST",
//                    url: self.$el.attr('action') || '/website_form/' + self.$el.data('model_name'),
//                    data: self.$el.serialize(),
//                    success: function (data) {
//                        var result;
//                        try {
//                            result = JSON.parse(data);
//                        } catch (e) {
//                            result = data;
//                        }
//
//                        if (result && result.error) {
//                            // Show error message
//                            self._showError(result.error);
//                            submitBtn.prop('disabled', false);
//                            submitBtn.html(btnText);
//                        } else if (result && result.id) {
//                            // Success - redirect to thank you page
//                            var successPage = self.$el.data('success-page') || '/contactus-thank-you';
//                            window.location = successPage;
//                        } else {
//                            // Unknown response
//                            self._showError(_t("An unexpected error occurred. Please try again later."));
//                            submitBtn.prop('disabled', false);
//                            submitBtn.html(btnText);
//                        }
//                    },
//                    error: function (xhr, status, error) {
//                        // Handle AJAX error
//                        self._showError(_t("An error occurred while submitting the form. Please try again later."));
//                        submitBtn.prop('disabled', false);
//                        submitBtn.html(btnText);
//                    }
//                });
//
//                return false;
//            });
//
//            return this._super.apply(this, arguments);
//        },
//
//        /**
//         * Check for duplicate email
//         *
//         * @private
//         * @param {Event} ev
//         */
//        _onEmailChange: function (ev) {
//            this._checkDuplicate('email_from', $(ev.currentTarget).val());
//        },
//
//        /**
//         * Check for duplicate phone
//         *
//         * @private
//         * @param {Event} ev
//         */
//        _onPhoneChange: function (ev) {
//            this._checkDuplicate('phone', $(ev.currentTarget).val());
//        },
//
//        /**
//         * Check for duplicate name
//         *
//         * @private
//         * @param {Event} ev
//         */
//        _onNameChange: function (ev) {
//            this._checkDuplicate('contact_name', $(ev.currentTarget).val());
//        },
//
//        /**
//         * Check for any duplicates before form submission
//         *
//         * @private
//         * @param {Event} ev
//         */
//        _onFormSubmit: function (ev) {
//            var self = this;
//            var email = this.$('input[name="email_from"]').val();
//            var phone = this.$('input[name="phone"]').val();
//            var name = this.$('input[name="contact_name"]').val();
//
//            // Don't block submission, just show warning if duplicates exist
//            this._checkAllDuplicates({
//                'email_from': email,
//                'phone': phone,
//                'contact_name': name
//            });
//        },
//
//        /**
//         * Check if a specific field value already exists in the database
//         *
//         * @private
//         * @param {String} field - Field name to check
//         * @param {String} value - Value to check
//         */
//        _checkDuplicate: function (field, value) {
//            var self = this;
//            if (!value || value.trim() === '') {
//                return;
//            }
//
//            ajax.jsonRpc('/contactus/check_duplicate', 'call', {
//                'field': field,
//                'value': value
//            }).then(function (result) {
//                if (result.exists) {
//                    var message = '';
//                    if (result.partner_exists && result.partner_message) {
//                        // Use the specific message from the backend
//                        message = result.partner_message;
//                    } else {
//                        // Use generic message
//                        switch (field) {
//                            case 'email_from':
//                                message = _t("This email address is already in our database.");
//                                break;
//                            case 'phone':
//                                message = _t("This phone number is already in our database.");
//                                break;
//                            case 'contact_name':
//                                message = _t("This name is already in our database.");
//                                break;
//                            default:
//                                message = _t("This information is already in our database.");
//                        }
//                    }
//                    self._showWarning(message);
//                } else {
//                    // If this field doesn't have duplicates, check if we should still show warnings for other fields
//                    if (!self.warningBanner.find('.warning-message').text()) {
//                        self.warningBanner.hide();
//                    }
//                }
//            }).guardedCatch(function (error) {
//                console.error("Error checking for duplicates:", error);
//            });
//        },
//
//        /**
//         * Check all fields for duplicates at once
//         *
//         * @private
//         * @param {Object} values - Object with field names as keys and values to check
//         */
//        _checkAllDuplicates: function (values) {
//            var self = this;
//
//            // Filter out empty values
//            var dataToCheck = {};
//            Object.keys(values).forEach(function (key) {
//                if (values[key] && values[key].trim() !== '') {
//                    dataToCheck[key] = values[key];
//                }
//            });
//
//            if (Object.keys(dataToCheck).length === 0) {
//                return;
//            }
//
//            ajax.jsonRpc('/contactus/check_all_duplicates', 'call', {
//                'values': dataToCheck
//            }).then(function (result) {
//                if (result.exists) {
//                    var message = '';
//                    if (result.partner_exists && result.partner_message) {
//                        // Use the specific message from the backend
//                        message = result.partner_message;
//                    } else {
//                        message = _t("Some of the information you provided is already in our database. You may be creating a duplicate record.");
//                    }
//                    self._showWarning(message);
//                } else {
//                    self.warningBanner.hide();
//                }
//            }).guardedCatch(function (error) {
//                console.error("Error checking for duplicates:", error);
//            });
//        },
//
//        /**
//         * Show warning message in the banner
//         *
//         * @private
//         * @param {String} message - Warning message to display
//         */
//        _showWarning: function (message) {
//            this.warningBanner.removeClass('alert-danger').addClass('alert-warning');
//            this.warningBanner.find('.warning-message').text(message);
//            this.warningBanner.show();
//        },
//
//        /**
//         * Show error message in the banner
//         *
//         * @private
//         * @param {String} message - Error message to display
//         */
//        _showError: function (message) {
//            this.warningBanner.removeClass('alert-warning').addClass('alert-danger');
//            this.warningBanner.find('.warning-message').text(message);
//            this.warningBanner.show();
//
//            // Scroll to the top of the form to show the error
//            $('html, body').animate({
//                scrollTop: this.$el.offset().top - 100
//            }, 500);
//        }
//    });
//
//    return publicWidget.registry.ContactFormValidation;
//});
