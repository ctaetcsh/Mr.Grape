const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "global",
                type: "economy",
                description: "Check out the global leaderboard!.",
                usage: "No arguments",
                aliases: ["gb", "bigmikes"],
                saying: "What a scrub.",
                cooldown: 5
            });
        }

        async main(msg) {
            const collection = [...this.eco.users.cache.sort((a, b) => b.balance - a.balance).first(10).values()];
            const entries = [];

            if (!collection.length) return msg.send("bro you are all broke");

            for (const person of collection.filter(p => p.balance > 0)) {
                const { tag } = await this.client.users.fetch(person.id);
                entries.push([`${collection.indexOf(person) + 1}) \`${tag}\` | \`${person.balance}\` :star:s`, "‎"]);
            }

            msg.paginate({ title: "Global Leaderboard" }, entries, 5);
        }
    };
