import { Events, Listener } from "@sapphire/framework";
import type { Client, ClientUser } from "discord.js";

export class ClientReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: Events.ClientReady
        });
    }

    public async run(client: Client): Promise<void> {
        const { username, id } = client.user as ClientUser;
        this.container.logger.info(`ClientReadyListener: Successfully logged in as ${username}. (${id})`);
    }
}
