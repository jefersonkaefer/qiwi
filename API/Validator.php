<?php
namespace Dfe\Qiwi\API;
/**
 * 2017-09-03
 * [QIWI Wallet] An example of a response to «PUT https://api.qiwi.com/api/v2/prv/{prv_id}/bills/{bill_id}»
 * https://mage2.pro/t/4447
 * @used-by \Dfe\Qiwi\API\Client::responseValidatorC()
 */
final class Validator extends \Df\API\Response\Validator {
	/**
	 * 2017-09-03
	 * @override
	 * @see \Df\API\Exception::long()
	 * @used-by short()
	 * @used-by \Df\API\Client::p()
	 * @return string
	 */
	function long() {return dfa($this->codes(), $this->code());}

	/**
	 * 2017-09-03
	 * @override
	 * @see \Df\API\Exception::short()
	 * @used-by \Df\API\Client::p()
	 * @return string
	 */
	function short() {return $this->long();}

	/**
	 * 2017-09-03
	 * @override
	 * @see \Df\API\Response\Validator::valid()
	 * @used-by \Df\API\Response\Validator::validate()
	 * @return bool
	 */
	function valid() {return !$this->code();}

	/**
	 * 2017-09-03 `[QIWI Wallet] API error codes`: https://mage2.pro/t/4448
	 * @used-by long()
	 * @used-by valid()
	 * @return int
	 */
	private function code() {return dfc($this, function() {return intval(dfa($this->r(), 'result_code'));});}

	/**
	 * 2017-09-03
	 * @used-by long()
	 * @return array(int => string)
	 */
	private function codes() {return dfc($this, function() {return dfa_key_int(df_module_csv($this,
		'error-codes/' . df_lang_ru_en()
	));});}
}