'use strict';

/** Define the constants to use libraries*/
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');

const {API} = require('./constants');


const cash = async command => {
	const {amount} = command;
	const from = command.from.toUpperCase();
	const to = command.to.filter(item => item !== from).map(item => item.toUpperCase());


	console.log();
	const loading = ora({
		text: 'Converting...',
		color: 'green',
		spinner: {
			interval: 150,
			frames: to
		}
	});


	loading.start();


	/**
	 * Call the API
	 * 
	 * @function
	 * @this {got} 
	 * @param {API} API to get the value
	 */
	await got(API, {
		json: true
	}).then(response => {
		money.base = response.body.base;
		money.rates = response.body.rates;


		/**
		 * Convert in the different currencies
		 
		 * @deprecated
		 * @this {forEach}
		 * @param {item} money is the amount
		 */
		to.forEach(item => {
			if (currencies[item]) {
				loading.succeed(`${chalk.green(money.convert(amount, {from, to: item}).toFixed(3))} ${`(${item})`} ${currencies[item]}`);
			} else {
				loading.warn(`${chalk.yellow(`The "${item}" currency not found `)}`);
			}
		});

		/** In case of error */
		console.log(chalk.underline.gray(`\nConversion of ${chalk.bold(from)} ${chalk.bold(amount)}`));
	}).catch(error => {
		if (error.code === 'ENOTFOUND') {
			loading.fail(chalk.red('Please check your internet connection!\n'));
		} else {
			loading.fail(chalk.red(`Internal server error :(\n${error}`));
		}
		process.exit(1);


	});
};

module.exports = cash;
