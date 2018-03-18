import { Client } from '../../client/Client';
import { Message } from '../../types/Message';
import { Command } from '../Command';
import { localizable } from '../CommandDecorators';
import { ResourceProxy } from '../../types/ResourceProxy';
import { Util } from '../../util/Util';
import { inspect } from 'util';
const Discord = require('discord.js'); // tslint:disable-line
const Yamdbf = require('../../index'); // tslint:disable-line

export default class extends Command
{
	public constructor()
	{
		super({
			name: 'eval',
			desc: 'Evaluate provided Javascript code',
			usage: '<prefix>eval <...code>',
			ownerOnly: true
		});
	}

	@localizable
	public async action(message: Message, [res]: [ResourceProxy]): Promise<any>
	{
		const client: Client = this.client; // tslint:disable-line
		const [, , prefix, name] = await Util.wasCommandCalled(message);
		const call: RegExp = new RegExp(`^${Util.escape(prefix)} *${name}`);
		const code: string = message.content.replace(call, '').trim();

		if (!code) return this.respond(message, res.CMD_EVAL_ERR_NOCODE());

		let evaled: string | object;
		let error: string;

		try { evaled = await eval(code); }
		catch (err) { error = err; }

		if (error) return this.respond(message, res.CMD_EVAL_ERROR({ code, error: this._clean(error) }));
		if (typeof evaled !== 'string') evaled = inspect(evaled, { depth: 0 });

		return this.respond(message, res.CMD_EVAL_RESULT({ code, result: this._clean(evaled) }));
	}

	private _clean(text: string): string
	{
		return typeof text === 'string' ? text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`)
			.replace(/[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g, '[REDACTED]')
			.replace(/email: '[^']+'/g, `email: '[REDACTED]'`)
			: text;
	}
}
