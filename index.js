var $jcYsr$discordjsrest = require("@discordjs/rest");
var $jcYsr$discordapitypesv9 = require("discord-api-types/v9");
var $jcYsr$discordjs = require("discord.js");
var $jcYsr$axios = require("axios");
var $jcYsr$url = require("url");
var $jcYsr$nativedns = require("native-dns");
var $jcYsr$discordjsbuilders = require("@discordjs/builders");
var $jcYsr$boorujs = require("boorujs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireed2b"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireed2b"] = parcelRequire;
}
parcelRequire.register("akxgL", function(module, exports) {






const awd = ()=>{
    const URL = $jcYsr$url;
    const isIp = eval('import("is-ip")');
    const dns = $jcYsr$nativedns;
    // Wraps native-dns in a Promise
    // we have this exposed in a separate module
    function resolveARecord(hostname, dnsServer) {
        return new Promise((resolve, reject)=>{
            const question = dns.Question({
                name: hostname,
                type: 'A'
            });
            const request = dns.Request({
                question,
                server: {
                    address: dnsServer || '1.1.1.1',
                    port: 53,
                    type: 'udp'
                },
                timeout: 1000
            });
            request.on('timeout', function() {
                reject(new Error('Timeout in making request'));
            });
            request.on('message', function(err, response) {
                // Resolve using the first populated A record
                for(var i in response.answer)if (response.answer[i].address) {
                    resolve(response.answer[i]);
                    break;
                }
            });
            request.on('end', function() {
                reject(new Error('Unable to resolve hostname'));
            });
            request.send();
        });
    }
    return (axios)=>{
        axios.interceptors.request.use(function(config) {
            const url = URL.parse(config.url);
            if (!config.dnsServer || isIp(url.hostname)) // Skip
            return config;
            else return resolveARecord(url.hostname, config.dnsServer).then(function(response) {
                config.headers = config.headers || {
                };
                config.headers.Host = url.hostname; // put original hostname in Host header
                url.hostname = response.address;
                delete url.host; // clear hostname cache
                config.url = URL.format(url);
                return config;
            });
        });
        return axios;
    };
};
awd()($jcYsr$axios);
let token = "ODIyMjcwNDQ1ODM4OTI1ODM1.YFP1Bw.D3zK3F5l3PB_0OI8T1S_uUBw2PY";
let commandExecs = {
};
const commands = [];

const commandFiles = [
    (parcelRequire("aQFhW"))
];
// Place your client and guild ids here
const clientId = '822270445838925835';
const guildId = '950159823461294120';
for (const file of commandFiles){
    const command = file;
    commandExecs[command.data.name] = command.execute;
    commands.push(command.data.toJSON());
}
const rest = new $jcYsr$discordjsrest.REST({
    version: '9'
}).setToken(token);
(async ()=>{
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put($jcYsr$discordapitypesv9.Routes.applicationGuildCommands(clientId, guildId), {
            body: commands
        });
        await rest.put($jcYsr$discordapitypesv9.Routes.applicationCommands(clientId), {
            body: commands
        });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
const client = new $jcYsr$discordjs.Client({
    intents: [
        'GUILDS'
    ]
});
client.on('ready', (v)=>console.log('Connected!')
);
client.on('interactionCreate', async (interaction)=>{
    if (interaction.isCommand()) {
        const command = commandExecs[interaction.commandName];
        if (!command) return interaction.reply('Invalid Cmd');
        try {
            await command(interaction);
        } catch (error) {
            console.error(error);
            await interaction[// @ts-ignore
            interaction.replied ? interaction.followUp : interaction.reply]({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
});
client.login(token);

});
parcelRequire.register("aQFhW", function(module, exports) {


const $b6e67e77d6022822$var$choices = [];
for(const k in $jcYsr$boorujs.BooruMappings)if (Object.prototype.hasOwnProperty.call($jcYsr$boorujs.BooruMappings, k)) $b6e67e77d6022822$var$choices.push(k);
console.log($b6e67e77d6022822$var$choices);
const $b6e67e77d6022822$var$getOptions = (op)=>{
    op = op.setName('booru').setDescription('Which booru to use (default=gelbooru)');
    for(const k1 in $b6e67e77d6022822$var$choices)if (Object.prototype.hasOwnProperty.call($b6e67e77d6022822$var$choices, k1)) {
        const v = $b6e67e77d6022822$var$choices[k1];
        // @ts-ignore
        op = op.addChoice(v, v);
    }
    return op;
};
let $b6e67e77d6022822$var$cached = {
};
const $b6e67e77d6022822$var$shuffleArray = (arr)=>{
    return arr.sort(()=>Math.random() - 0.5
    );
};
const $b6e67e77d6022822$var$shufflePosts = $b6e67e77d6022822$var$shuffleArray;
module.exports = {
    data: new $jcYsr$discordjsbuilders.SlashCommandBuilder().setName('hentai').setDescription('Uses a booru to send hentai').addStringOption((op)=>op.setName('query').setDescription('Search Query').setRequired(false)
    ).addStringOption((op)=>$b6e67e77d6022822$var$getOptions(op)
    ),
    async execute (interaction) {
        const Booru = new ($parcel$interopDefault($jcYsr$boorujs))(// @ts-ignore
        interaction.options.getString('booru', false) || 'gelbooru');
        await interaction.reply({
            ephemeral: false,
            content: `Loading posts from query \`${interaction.options.getString('query') || 'no query'}\`...`
        });
        const q = interaction.options.getString('query') || '';
        if (!$b6e67e77d6022822$var$cached[q]) $b6e67e77d6022822$var$cached[q] = await Booru.Posts(q, 10);
        for(let index = 0; index < 3; index++){
            const posts = $b6e67e77d6022822$var$shufflePosts($b6e67e77d6022822$var$cached[q]);
            let m = '';
            for(let i = 0; i < Math.min(posts.length, 3); i++){
                const element = posts[i];
                m += element.URL + ' (' + element.id + ')\n';
            }
            await interaction.followUp({
                content: m,
                ephemeral: false
            });
        }
    }
};

});



parcelRequire("akxgL");

//# sourceMappingURL=index.js.map
