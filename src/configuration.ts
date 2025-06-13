import { LogLevel, type SapphireClientOptions } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import { ActivityType, type ClientOptions, GatewayIntentBits, Partials } from "discord.js";
import { env } from "#/env";

export const DEVELOPERS: string[] = ["327849142774923266"];
export const DEVELOPMENT_SERVERS: string[] = ["1209737959587450980"];

export interface IClientOptions extends SapphireClientOptions, ClientOptions {}

/**
 * The configuration for the bot.
 */
export const configuration: IClientOptions = {
    defaultCooldown: {
        delay: Time.Second * 2,
        filteredUsers: DEVELOPERS
    },
    defaultPrefix: "imperia ",
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ],
    loadApplicationCommandRegistriesStatusListeners: env.NODE_ENV === "development",
    loadDefaultErrorListeners: env.NODE_ENV === "development",
    loadMessageCommandListeners: true,
    logger: {
        level: env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info
    },
    partials: [Partials.Message, Partials.User, Partials.GuildMember],
    presence: {
        activities: [
            {
                type: ActivityType.Listening,
                name: "reality, the manifested. ✨"
            }
        ],
        status: "dnd"
    },
    typing: true
};
