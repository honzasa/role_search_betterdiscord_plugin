# RoleSearch

A BetterDiscord plugin for quickly browsing Discord server roles and the members who have them — including on very large servers.

RoleSearch avoids crawling an entire server whenever possible. It reads role member counts, requests the member IDs for the selected role, hydrates missing member information through Discord's Gateway, deduplicates users by Discord ID, and keeps a local BetterDiscord cache for faster repeat lookups.

> **Version:** 2.3.0  
> **Platform:** BetterDiscord / Discord desktop client  
> **Dependencies:** None

## Features

- **Open from the server context menu**
  - Right-click a server and choose **RoleSearch**.
- **Search roles by name**
  - Browse the server's roles in a dedicated two-column window.
- **Role colors**
  - Roles are displayed using their Discord role color where available.
- **Role member counts**
  - Shows the total number of members reported for each role.
- **Fast member lookup**
  - Loads member IDs directly for the selected role instead of scanning the entire server.
- **Large-server friendly**
  - Designed to remain useful on servers with hundreds of thousands of members.
- **Member details**
  - Resolves usernames, display names, nicknames, role data, and Discord IDs.
- **Presence indicators**
  - Shows online / idle / DND / offline-style status indicators when Discord has presence data available.
- **Open user profiles**
  - Click a member to open their normal Discord profile in the context of the selected server.
- **Member search**
  - Filter loaded members by username, display name, nickname, or Discord ID.
- **Discord ID deduplication**
  - The same user is only counted once even if they are discovered from multiple cached sources.
- **Persistent cache**
  - Role counts, role member IDs, member details, and the currently selected role are stored locally through BetterDiscord's data API.
- **Legacy DFS cache support**
  - Can import member data from the older DFS/checkpoint format without deleting the old checkpoint.
- **Dark / light theme support**
  - Detects Discord's current theme and applies a matching high-contrast palette.
  - The open RoleSearch window updates when the Discord theme changes.

## Installation

1. Install [BetterDiscord](https://betterdiscord.app/) if you do not already have it.
2. Download `RoleSearch.plugin.js`.
3. Put the file in your BetterDiscord plugins folder.

On Windows:

```text
%AppData%\BetterDiscord\plugins
```

4. Open Discord.
5. Go to:

```text
User Settings → BetterDiscord → Plugins
```

6. Enable **RoleSearch**.

If the plugin is already installed and you are updating it, replace the old `RoleSearch.plugin.js` with the new one and reload Discord if needed.

## Usage

### Open RoleSearch

Right-click the server icon and choose:

```text
RoleSearch
```

The plugin opens a dedicated window with:

- roles on the left,
- members of the selected role on the right.

### Find a role

Use the **Search role...** field and select a role.

RoleSearch then:

1. loads the server's role member counts,
2. loads the selected role's member IDs,
3. requests missing member details from Discord,
4. caches the result locally.

### Search members

Use **Search members...** to filter the currently loaded members by:

- username,
- display name,
- server nickname,
- Discord user ID.

### Open a Discord profile

Click any loaded member in the list.

RoleSearch will try to open Discord's normal user profile modal for that user and server.

### Refresh data

Use **Refresh** for the selected role when you want to request its member IDs again.

The BetterDiscord plugin settings page also provides controls for refreshing role counts and clearing the v2 cache.

## Important limitation: 100 direct members per role

Discord's role-member-ID request used by the plugin returns **up to 100 direct member IDs** for a role.

That means:

- a role with **20 members** can normally show `20 / 20` and be complete,
- a role with **100 or fewer members** can be complete when all IDs are returned,
- a role with **more than 100 members** is only partially available through the direct role lookup.

For larger roles, RoleSearch may also show additional members already present in its local or legacy cache.

Example:

```text
100 / 426 direct IDs — Discord endpoint limit 100
+ 23 extra from cache
```

The total role member count can therefore be larger than the number of members currently shown in the list.

## Presence / online status

RoleSearch asks Discord for presence information when hydrating missing members and reads presence data from Discord's client stores.

The indicator may show:

- green — online,
- yellow — idle,
- red — do not disturb,
- purple — streaming,
- gray — offline / no presence currently known to the client.

On very large servers, **gray does not always prove that a user is actually offline**. Discord may simply not have supplied presence information for that member.

## Cache and checkpoint behavior

RoleSearch stores its v2 data separately for each server.

Cached data includes:

- role member counts,
- fetched role member IDs,
- hydrated member details,
- selected role,
- imported legacy member data.

The plugin also understands the older DFS checkpoint key and can import discovered members from it.

Clearing the **v2 cache** does **not** delete the older DFS checkpoint.

## Privacy

RoleSearch does not include external libraries and the current plugin code does not send data to third-party web services.

Its network-related operations use Discord's own client REST/Gateway mechanisms. Persistent data is stored locally through BetterDiscord's data API.

## How it works

At a high level:

```text
Select role
    ↓
Load role member count
    ↓
Load up to 100 member IDs for that role
    ↓
Deduplicate by Discord user ID
    ↓
Resolve cached users immediately
    ↓
Request missing member details through GUILD_MEMBERS_REQUEST
    ↓
Listen for GUILD_MEMBERS_CHUNK / GUILD_MEMBERS_CHUNK_BATCH
    ↓
Display and cache resolved members
```

The plugin relies on Discord client internals such as:

- Webpack modules,
- Flux dispatcher events,
- Discord stores,
- internal REST routes,
- user profile modal actions.

Because these are internal implementation details, a Discord update can occasionally break the plugin until the relevant module lookup is updated.

## Troubleshooting

### RoleSearch does not appear when I right-click a server

- Make sure the plugin is enabled in BetterDiscord.
- Reload Discord with `Ctrl + R`.
- Disable and re-enable RoleSearch.
- Check the DevTools console for messages beginning with:

```text
[RoleSearch]
```

### `Discord RestAPI not found`

Discord may have changed its internal Webpack modules. RoleSearch will need an updated module lookup.

### A role shows more members than RoleSearch loads

This is expected for roles with more than 100 members. See the [100 direct members per role](#important-limitation-100-direct-members-per-role) section.

### Everyone appears offline

Presence data is not guaranteed for every member, especially on very large servers. The role membership list can still be correct even when presence information is unavailable.

### Clicking a member does not open their profile

Discord may have changed the internal `openUserProfileModal` action. Check the console for a RoleSearch error.

### The cache looks stale

Open BetterDiscord settings for RoleSearch and use the refresh or cache controls, or refresh the selected role from the RoleSearch window.

## Compatibility

RoleSearch was built and tested against the Discord / BetterDiscord client internals available around version **2.3.0 of this plugin**.

Discord's internal modules are not a stable public API, so compatibility can change after Discord updates.

## Repository layout

A minimal GitHub repository can be:

```text
RoleSearch/
├── RoleSearch.plugin.js
└── README.md
```

For GitHub Releases, attach `RoleSearch.plugin.js` as the downloadable release asset.

## Development

The plugin is a standalone BetterDiscord plugin file and does not require a build step.

To work on it:

1. Edit `RoleSearch.plugin.js`.
2. Copy or symlink it into your BetterDiscord plugins directory.
3. Reload Discord.
4. Test the server context menu and RoleSearch window.
5. Watch the DevTools console for `[RoleSearch]` messages.

Useful areas in the source:

- Discord module discovery
- role retrieval
- persistent cache
- role count/member ID REST calls
- member hydration through Gateway events
- server context-menu patch
- RoleSearch modal
- theme detection and theme updates

## Disclaimer

RoleSearch is an unofficial BetterDiscord plugin and is not affiliated with Discord or BetterDiscord.

BetterDiscord modifies the Discord client, and Discord's internal APIs can change without notice. Use third-party client modifications at your own discretion.

## License

RoleSearch is released under the [MIT License](LICENSE).

