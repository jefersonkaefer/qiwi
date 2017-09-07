// 2017-09-06
define([
	'df', 'Df_Payment/billingAddressChange', 'Df_Payment/custom', 'jquery'
], function(df, baChange, parent, $) {'use strict';
/** 2017-09-06 @uses Class::extend() https://github.com/magento/magento2/blob/2.2.0-rc2.3/app/code/Magento/Ui/view/base/web/js/lib/core/class.js#L106-L140 */
return parent.extend({
	defaults: {df: {formTemplate: 'Dfe_Qiwi/main'}, phone: ''},
	/**
	 * 2017-09-06
	 * These data are submitted to the M2 server part
	 * as the `additional_data` property value on the «Place Order» button click:
	 * @used-by Df_Payment/mixin::getData():
	 *		getData: function() {return {additional_data: this.dfData(), method: this.item.method};},
	 * https://github.com/mage2pro/core/blob/2.8.4/Payment/view/frontend/web/mixin.js#L224
	 * @override
	 * @see Df_Payment/mixin::dfData()
	 * @returns {Object}
	 */
	dfData: function() {return df.o.merge(this._super(), {phone: df.s.normalizePhone(this.phone())});},
	/**
	 * 2017-09-06
	 * @override
	 * @see Df_Payment/custom::initialize()
	 * @returns {exports}
	*/
	initialize: function() {
		this._super();
		/** @type {Object} */ var c = window.checkoutConfig.customerData;
		var _this = this;
		baChange(function(a) {
			var newValue = null;
			if (a.telephone && a.telephone.length) {
				newValue = a.telephone;
			}
			else if (c && c.telephone && c.telephone.length) {
				newValue = c.telephone;
			}
			if (newValue) {
				_this.phone(newValue);
				var $form = _this.dfForm();
				if ($form) {
					$('[type=tel]', $form).intlTelInput('setNumber', newValue);
				}
			}
		});
		return this;
	},
	/**
	 * 2017-09-06 The method should return `this` because it is used in a chain:
	 *	this._super()
	 *		.initObservable()
	 *		.initModules()
	 *		.initStatefull()
	 *		.initLinks()
	 *		.initUnique();
	 * @used-by Magento_Ui/js/lib/core/element/element::initialize()
	 * https://github.com/magento/magento2/blob/2.2.0-RC1.3/app/code/Magento/Ui/view/base/web/js/lib/core/element/element.js#L104
	 * @override
	 * @see Magento_Payment/js/view/payment/cc-form::initObservable()
	 * https://github.com/magento/magento2/blob/2.2.0-RC1.3/app/code/Magento/Payment/view/frontend/web/js/view/payment/cc-form.js#L29-L45
	 * @returns {Element} Chainable
	*/
	initObservable: function() {this._super(); this.observe(['phone']); return this;},
});});