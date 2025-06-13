import { ApplicationCommandRegistries, RegisterBehavior, SapphireClient } from "@sapphire/framework";
import { configuration } from "#/configuration";
import "@sapphire/plugin-logger/register";
import { env } from "#/env";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

export async function main(): Promise<void> {
    const client = new SapphireClient(configuration);
    await client.login(env.DISCORD_BOT_TOKEN);

    process.on("SIGINT", async (): Promise<void> => {
        await client.destroy().then((): never => {
            process.exit();
        });
    });
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
