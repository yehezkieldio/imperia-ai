import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { type Message, SlashCommandBuilder } from "discord.js";
import type { MessageChatResponse } from "#/lib/typings/message-types";

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: "Check the bot's latency.",
            runIn: CommandOptionsRunTypeEnum.GuildText
        });
    }

    public override registerApplicationCommands(registry: Command.Registry): void {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command);
    }

    #pleaseWait = "Please wait...";
    #failed = "Failed to retrieve ping latency.";

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const callbackResponse = await interaction.reply({
            content: this.#pleaseWait,
            withResponse: true
        });
        const msg = callbackResponse.resource?.message;

        if (msg && isMessageInstance(msg)) {
            const context: MessageChatResponse = msg;
            const response: string = await this.getLatency(msg, context);

            return interaction.editReply(response);
        }

        return interaction.editReply(this.#failed);
    }

    public async messageRun(message: Message) {
        const msg: Message = await message.reply(this.#pleaseWait);

        if (isMessageInstance(msg)) {
            const context: MessageChatResponse = msg;
            const response: string = await this.getLatency(msg, context);

            return msg.edit(response);
        }

        return message.edit(this.#failed);
    }

    private async getLatency(message: Message, context: MessageChatResponse) {
        const diff: number = message.createdTimestamp - context.createdTimestamp;
        const ping: number = Math.round(this.container.client.ws.ping);

        return `Heartbeat: ${ping}ms, Roundtrip: ${diff}ms.`;
    }
}
