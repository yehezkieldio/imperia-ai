import { type Args, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { generateText } from "ai";
import { type Message, SlashCommandBuilder } from "discord.js";
import { model } from "#/lib/ai";
import { SYSTEM_PROMPT } from "#/lib/ai/system-prompt";

const MAX_DISCORD_MSG_LEN = 2000;

function smartChunk(text: string, maxLen = MAX_DISCORD_MSG_LEN): string[] {
    const paragraphs = text.split(/\n{2,}/g);
    const chunks: string[] = [];
    let current = "";

    for (const para of paragraphs) {
        const testChunk = current ? `${current}\n\n${para}` : para;
        if (testChunk.length <= maxLen) {
            current = testChunk;
        } else {
            if (current) chunks.push(current);
            if (para.length > maxLen) {
                // Hard split long paragraph/code blocks
                for (let i = 0; i < para.length; i += maxLen) {
                    chunks.push(para.slice(i, i + maxLen));
                }
                current = "";
            } else {
                current = para;
            }
        }
    }

    if (current) chunks.push(current);
    return chunks;
}

export class ChatCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: "Chat with Imperia.",
            runIn: CommandOptionsRunTypeEnum.GuildText
        });
    }

    public override registerApplicationCommands(registry: Command.Registry): void {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) =>
                option.setName("prompt").setDescription("The prompt to send to Imperia.").setRequired(true)
            );

        void registry.registerChatInputCommand(command);
    }

    private async inference(prompt: string): Promise<string> {
        try {
            const response = await generateText({
                model,
                system: SYSTEM_PROMPT,
                prompt: prompt
            });

            return response.text;
        } catch (error) {
            console.error("Inference error:", error);
            throw new Error("Failed to generate response from Imperia.");
        }
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const prompt = interaction.options.getString("prompt", true);

        await interaction.deferReply();

        try {
            const result = await this.inference(prompt);
            const chunks = smartChunk(result);

            await interaction.editReply({ content: chunks[0] });

            for (let i = 1; i < chunks.length; i++) {
                await interaction.followUp({ content: chunks[i] });
            }
        } catch (err) {
            console.error("LLM inference failed:", err);
            return interaction.editReply({
                content: "❌ An error occurred while processing your request."
            });
        }
    }

    public async messageRun(message: Message, args: Args) {
        const prompt = await args.rest("string");
        if (!prompt) {
            return message.reply("Please provide a prompt to chat with Imperia.");
        }
        const statusMessage = await message.reply("Please wait while I process your request...");

        try {
            const result: string = await this.inference(prompt);
            const chunks: string[] = smartChunk(result);

            await statusMessage.edit({
                content: chunks[0]
            });

            for (let i = 1; i < chunks.length; i++) {
                await message.reply({ content: chunks[i] });
            }
        } catch (err) {
            console.error("LLM inference failed:", err);
            return statusMessage.edit({ content: "❌ An error occurred while processing your request." });
        }
    }

    // ...existing code...
}
