/**
 * @name RoleSearch
 * @author honzasa
 * @version 2.4.0
 * @description Fast role member lookup for large Discord servers. Uses Discord's role member IDs API, hydrates missing members through the Gateway, deduplicates by Discord ID, and preserves role cache plus legacy DFS cache/checkpoints.
 */


const ROLESEARCH_LANGUAGE_NAMES = {
    auto: "Auto (Discord)",
    en: "English",
    cs: "Čeština",
    sk: "Slovenčina",
    de: "Deutsch",
    pl: "Polski",
    es: "Español",
    fr: "Français"
};

const ROLESEARCH_I18N = {
    en: {
        settingsLanguage: "Language",
        settingsLanguageHint: "Auto follows Discord's language. Unsupported Discord languages fall back to English.",
        server: "Server",
        role: "Role",
        membersWithSelectedRole: "Members with selected role",
        noServerSelected: "No server selected",
        selectRole: "Select a role.",
        selectRoleLeft: "Select a role on the left.",
        waitingDirectMembers: "Waiting for direct role members…",
        loadingMemberIds: "Loading member IDs directly from Discord's role API…",
        roleApiError: "Role API error: {error}",
        completeRole: "{direct} / {total} direct IDs — complete role",
        endpointLimit: "{direct} / {total} direct IDs — Discord endpoint limit is 100",
        directOfTotal: "{direct} / {total} direct IDs",
        directLoaded: "{direct} direct IDs loaded",
        extraCache: " • +{extras} extra from saved/legacy cache",
        details: " • details {resolved}/{total}",
        waitingRoleData: "Waiting for role data…",
        profileActionMissing: "RoleSearch: user profile action not found.",
        profileOpenFailed: "RoleSearch: could not open profile.",
        openDiscordProfile: "Open Discord profile",
        searchRole: "Search role…",
        searchRoleName: "Search role name...",
        noRolesFound: "No roles found.",
        refresh: "Refresh",
        searchMembers: "Search members…",
        shownLoaded: "{shown} shown / {loaded} loaded",
        zeroMembers: "0 members",
        loadingRoleMembers: "Loading role members…",
        noLoadedMembersMatch: "No loaded members match.",
        close: "Close",
        customModalFailed: "RoleSearch: custom modal render failed. Check console.",
        totalSuffix: " — {count} total",
        cachedSuffix: " — {count} cached",
        memberCount: "{shown} shown / {loaded} unique loaded members",
        noMembersLoaded: "No members of this role are loaded yet.",
        maxShown: "Showing the first {max} of {total}. Use search to narrow the list.",
        roleCountsLoading: "role counts: loading",
        roleCountsLoaded: "role counts: {count} loaded",
        roleCountsError: "role counts error: {error}",
        roleCountsIdle: "role counts: idle",
        cachedDetails: "cached member details: {count}",
        legacyImported: "legacy imported: {count}",
        note:
            "After selecting a role, member IDs are loaded directly from Discord's role API. " +
            "The endpoint returns a maximum of 100 IDs. Roles with up to 100 members can therefore be complete; " +
            "larger roles show up to 100 direct results plus any additional members from saved/legacy cache. " +
            "The old DFS checkpoint is never deleted or overwritten.",
        refreshRoleCounts: "Refresh role counts",
        refreshSelectedRole: "Refresh selected role",
        useCurrentServer: "Use currently open server",
        clearCache: "Clear v2 cache",
        searchLoadedMembers: "Search loaded members by username / display name / nick / ID...",
        cacheCleared: "RoleSearch v2 cache cleared. Legacy DFS checkpoint was preserved.",
        roleCountsStateLoading: "role counts: loading",
        roleCountsStateLoaded: "role counts: {count} loaded",
        roleCountsStateError: "role counts error: {error}",
        roleCountsStateIdle: "role counts: idle",
        directStatusLoaded: "{direct} / {total} direct IDs — complete role",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "{count} member(s) loaded",
        languageChanged: "RoleSearch language: {language}",
        presenceOnline: "online",
        presenceIdle: "idle",
        presenceDnd: "do not disturb",
        presenceStreaming: "streaming",
        presenceOffline: "offline"
    },

    cs: {
        settingsLanguage: "Jazyk",
        settingsLanguageHint: "Auto používá jazyk Discordu. Nepodporované jazyky Discordu se zobrazí anglicky.",
        server: "Server",
        role: "Role",
        membersWithSelectedRole: "Členové s vybranou rolí",
        noServerSelected: "Není vybraný server",
        selectRole: "Vyber roli.",
        selectRoleLeft: "Vyber roli vlevo.",
        waitingDirectMembers: "Čekám na přímé načtení členů role…",
        loadingMemberIds: "Načítám member IDs přímo z Discord role API…",
        roleApiError: "Chyba Role API: {error}",
        completeRole: "{direct} / {total} direct IDs — kompletní role",
        endpointLimit: "{direct} / {total} direct IDs — Discord endpoint má limit 100",
        directOfTotal: "{direct} / {total} direct IDs",
        directLoaded: "{direct} direct IDs načteno",
        extraCache: " • +{extras} navíc z uložené/legacy cache",
        details: " • detaily {resolved}/{total}",
        waitingRoleData: "Čekám na data role…",
        profileActionMissing: "RoleSearch: akce pro otevření profilu nebyla nalezena.",
        profileOpenFailed: "RoleSearch: profil se nepodařilo otevřít.",
        openDiscordProfile: "Otevřít Discord profil",
        searchRole: "Hledat roli…",
        searchRoleName: "Hledat název role...",
        noRolesFound: "Žádné role nenalezeny.",
        refresh: "Obnovit",
        searchMembers: "Hledat členy…",
        shownLoaded: "{shown} zobrazeno / {loaded} načteno",
        zeroMembers: "0 členů",
        loadingRoleMembers: "Načítám členy role…",
        noLoadedMembersMatch: "Žádní načtení členové neodpovídají hledání.",
        close: "Zavřít",
        customModalFailed: "RoleSearch: nepodařilo se vykreslit okno. Zkontroluj konzoli.",
        totalSuffix: " — celkem {count}",
        cachedSuffix: " — {count} v cache",
        memberCount: "{shown} zobrazeno / {loaded} unikátních načtených členů",
        noMembersLoaded: "Zatím nejsou načteni žádní členové této role.",
        maxShown: "Zobrazeno prvních {max} z {total}. Použij hledání pro zúžení.",
        roleCountsLoading: "počty rolí: načítání",
        roleCountsLoaded: "počty rolí: {count} načteno",
        roleCountsError: "chyba počtů rolí: {error}",
        roleCountsIdle: "počty rolí: čeká",
        cachedDetails: "detaily členů v cache: {count}",
        legacyImported: "importováno z legacy cache: {count}",
        note:
            "Po výběru role se member IDs načtou přímo z Discord role API. " +
            "Endpoint vrací maximálně 100 IDs. U role do 100 členů tak může být výsledek kompletní; " +
            "u větší role se zobrazí až 100 přímých výsledků plus případní další členové z uložené/legacy cache. " +
            "Starý DFS checkpoint plugin nemaže ani nepřepisuje.",
        refreshRoleCounts: "Obnovit počty rolí",
        refreshSelectedRole: "Obnovit vybranou roli",
        useCurrentServer: "Použít právě otevřený server",
        clearCache: "Vymazat v2 cache",
        searchLoadedMembers: "Hledat načtené členy podle username / display name / nicku / ID...",
        cacheCleared: "RoleSearch v2 cache byla vymazána. Legacy DFS checkpoint zůstal zachovaný.",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "Načteno členů: {count}",
        languageChanged: "Jazyk RoleSearch: {language}",
        presenceOnline: "online",
        presenceIdle: "nečinný",
        presenceDnd: "nerušit",
        presenceStreaming: "streamuje",
        presenceOffline: "offline"
    },

    sk: {
        settingsLanguage: "Jazyk",
        settingsLanguageHint: "Auto používa jazyk Discordu. Nepodporované jazyky sa zobrazia po anglicky.",
        server: "Server",
        role: "Rola",
        membersWithSelectedRole: "Členovia s vybranou rolou",
        noServerSelected: "Nie je vybraný server",
        selectRole: "Vyber rolu.",
        selectRoleLeft: "Vyber rolu vľavo.",
        waitingDirectMembers: "Čakám na priame načítanie členov roly…",
        loadingMemberIds: "Načítavam member IDs priamo z Discord role API…",
        roleApiError: "Chyba Role API: {error}",
        completeRole: "{direct} / {total} direct IDs — kompletná rola",
        endpointLimit: "{direct} / {total} direct IDs — Discord endpoint má limit 100",
        directOfTotal: "{direct} / {total} direct IDs",
        directLoaded: "{direct} direct IDs načítaných",
        extraCache: " • +{extras} navyše z uloženej/legacy cache",
        details: " • detaily {resolved}/{total}",
        waitingRoleData: "Čakám na dáta roly…",
        profileActionMissing: "RoleSearch: akcia na otvorenie profilu sa nenašla.",
        profileOpenFailed: "RoleSearch: profil sa nepodarilo otvoriť.",
        openDiscordProfile: "Otvoriť Discord profil",
        searchRole: "Hľadať rolu…",
        searchRoleName: "Hľadať názov roly...",
        noRolesFound: "Nenašli sa žiadne roly.",
        refresh: "Obnoviť",
        searchMembers: "Hľadať členov…",
        shownLoaded: "{shown} zobrazených / {loaded} načítaných",
        zeroMembers: "0 členov",
        loadingRoleMembers: "Načítavam členov roly…",
        noLoadedMembersMatch: "Žiadni načítaní členovia nezodpovedajú hľadaniu.",
        close: "Zavrieť",
        customModalFailed: "RoleSearch: okno sa nepodarilo vykresliť. Skontroluj konzolu.",
        totalSuffix: " — spolu {count}",
        cachedSuffix: " — {count} v cache",
        memberCount: "{shown} zobrazených / {loaded} unikátnych načítaných členov",
        noMembersLoaded: "Zatiaľ nie sú načítaní žiadni členovia tejto roly.",
        maxShown: "Zobrazených prvých {max} z {total}. Použi hľadanie na zúženie.",
        roleCountsLoading: "počty rolí: načítavanie",
        roleCountsLoaded: "počty rolí: {count} načítaných",
        roleCountsError: "chyba počtov rolí: {error}",
        roleCountsIdle: "počty rolí: čaká",
        cachedDetails: "detaily členov v cache: {count}",
        legacyImported: "importované z legacy cache: {count}",
        note:
            "Po výbere roly sa member IDs načítajú priamo z Discord role API. " +
            "Endpoint vracia maximálne 100 IDs. Roly do 100 členov môžu byť kompletné; " +
            "väčšie roly zobrazia až 100 priamych výsledkov plus ďalších členov z uloženej/legacy cache. " +
            "Starý DFS checkpoint sa nemaže ani neprepisuje.",
        refreshRoleCounts: "Obnoviť počty rolí",
        refreshSelectedRole: "Obnoviť vybranú rolu",
        useCurrentServer: "Použiť aktuálne otvorený server",
        clearCache: "Vymazať v2 cache",
        searchLoadedMembers: "Hľadať načítaných členov podľa username / display name / nicku / ID...",
        cacheCleared: "RoleSearch v2 cache bola vymazaná. Legacy DFS checkpoint zostal zachovaný.",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "Načítaných členov: {count}",
        languageChanged: "Jazyk RoleSearch: {language}",
        presenceOnline: "online",
        presenceIdle: "nečinný",
        presenceDnd: "nerušiť",
        presenceStreaming: "streamuje",
        presenceOffline: "offline"
    },

    de: {
        settingsLanguage: "Sprache",
        settingsLanguageHint: "Auto folgt der Discord-Sprache. Nicht unterstützte Discord-Sprachen fallen auf Englisch zurück.",
        server: "Server",
        role: "Rolle",
        membersWithSelectedRole: "Mitglieder mit ausgewählter Rolle",
        noServerSelected: "Kein Server ausgewählt",
        selectRole: "Rolle auswählen.",
        selectRoleLeft: "Wähle links eine Rolle.",
        waitingDirectMembers: "Warte auf direkte Rollenmitglieder…",
        loadingMemberIds: "Lade Member-IDs direkt über Discords Rollen-API…",
        roleApiError: "Rollen-API-Fehler: {error}",
        completeRole: "{direct} / {total} direkte IDs — vollständige Rolle",
        endpointLimit: "{direct} / {total} direkte IDs — Discord-Endpunkt ist auf 100 begrenzt",
        directOfTotal: "{direct} / {total} direkte IDs",
        directLoaded: "{direct} direkte IDs geladen",
        extraCache: " • +{extras} zusätzlich aus gespeichertem/Legacy-Cache",
        details: " • Details {resolved}/{total}",
        waitingRoleData: "Warte auf Rollendaten…",
        profileActionMissing: "RoleSearch: Profilaktion nicht gefunden.",
        profileOpenFailed: "RoleSearch: Profil konnte nicht geöffnet werden.",
        openDiscordProfile: "Discord-Profil öffnen",
        searchRole: "Rolle suchen…",
        searchRoleName: "Rollennamen suchen...",
        noRolesFound: "Keine Rollen gefunden.",
        refresh: "Aktualisieren",
        searchMembers: "Mitglieder suchen…",
        shownLoaded: "{shown} angezeigt / {loaded} geladen",
        zeroMembers: "0 Mitglieder",
        loadingRoleMembers: "Rollenmitglieder werden geladen…",
        noLoadedMembersMatch: "Keine geladenen Mitglieder passen zur Suche.",
        close: "Schließen",
        customModalFailed: "RoleSearch: Fenster konnte nicht gerendert werden. Konsole prüfen.",
        totalSuffix: " — {count} gesamt",
        cachedSuffix: " — {count} im Cache",
        memberCount: "{shown} angezeigt / {loaded} eindeutige geladene Mitglieder",
        noMembersLoaded: "Für diese Rolle sind noch keine Mitglieder geladen.",
        maxShown: "Die ersten {max} von {total} werden angezeigt. Suche zum Eingrenzen verwenden.",
        roleCountsLoading: "Rollenzahlen: werden geladen",
        roleCountsLoaded: "Rollenzahlen: {count} geladen",
        roleCountsError: "Fehler bei Rollenzahlen: {error}",
        roleCountsIdle: "Rollenzahlen: bereit",
        cachedDetails: "Mitgliederdetails im Cache: {count}",
        legacyImported: "aus Legacy-Cache importiert: {count}",
        note:
            "Nach Auswahl einer Rolle werden Member-IDs direkt über Discords Rollen-API geladen. " +
            "Der Endpunkt liefert höchstens 100 IDs. Rollen mit bis zu 100 Mitgliedern können vollständig sein; " +
            "größere Rollen zeigen bis zu 100 direkte Ergebnisse plus zusätzliche Mitglieder aus gespeichertem/Legacy-Cache. " +
            "Der alte DFS-Checkpoint wird nicht gelöscht oder überschrieben.",
        refreshRoleCounts: "Rollenzahlen aktualisieren",
        refreshSelectedRole: "Ausgewählte Rolle aktualisieren",
        useCurrentServer: "Aktuell geöffneten Server verwenden",
        clearCache: "v2-Cache leeren",
        searchLoadedMembers: "Geladene Mitglieder nach Benutzername / Anzeigename / Nick / ID suchen...",
        cacheCleared: "RoleSearch-v2-Cache geleert. Legacy-DFS-Checkpoint wurde beibehalten.",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "{count} Mitglied(er) geladen",
        languageChanged: "RoleSearch-Sprache: {language}",
        presenceOnline: "online",
        presenceIdle: "abwesend",
        presenceDnd: "nicht stören",
        presenceStreaming: "streamt",
        presenceOffline: "offline"
    },

    pl: {
        settingsLanguage: "Język",
        settingsLanguageHint: "Auto używa języka Discorda. Nieobsługiwane języki Discorda przechodzą na angielski.",
        server: "Serwer",
        role: "Rola",
        membersWithSelectedRole: "Członkowie z wybraną rolą",
        noServerSelected: "Nie wybrano serwera",
        selectRole: "Wybierz rolę.",
        selectRoleLeft: "Wybierz rolę po lewej.",
        waitingDirectMembers: "Oczekiwanie na bezpośrednią listę członków roli…",
        loadingMemberIds: "Ładowanie member IDs bezpośrednio z API ról Discorda…",
        roleApiError: "Błąd API roli: {error}",
        completeRole: "{direct} / {total} bezpośrednich ID — pełna rola",
        endpointLimit: "{direct} / {total} bezpośrednich ID — limit endpointu Discorda to 100",
        directOfTotal: "{direct} / {total} bezpośrednich ID",
        directLoaded: "Załadowano {direct} bezpośrednich ID",
        extraCache: " • +{extras} dodatkowych z zapisanej/legacy cache",
        details: " • szczegóły {resolved}/{total}",
        waitingRoleData: "Oczekiwanie na dane roli…",
        profileActionMissing: "RoleSearch: nie znaleziono akcji profilu.",
        profileOpenFailed: "RoleSearch: nie udało się otworzyć profilu.",
        openDiscordProfile: "Otwórz profil Discord",
        searchRole: "Szukaj roli…",
        searchRoleName: "Szukaj nazwy roli...",
        noRolesFound: "Nie znaleziono ról.",
        refresh: "Odśwież",
        searchMembers: "Szukaj członków…",
        shownLoaded: "{shown} pokazanych / {loaded} załadowanych",
        zeroMembers: "0 członków",
        loadingRoleMembers: "Ładowanie członków roli…",
        noLoadedMembersMatch: "Brak załadowanych członków pasujących do wyszukiwania.",
        close: "Zamknij",
        customModalFailed: "RoleSearch: nie udało się wyrenderować okna. Sprawdź konsolę.",
        totalSuffix: " — {count} łącznie",
        cachedSuffix: " — {count} w cache",
        memberCount: "{shown} pokazanych / {loaded} unikalnych załadowanych członków",
        noMembersLoaded: "Nie załadowano jeszcze członków tej roli.",
        maxShown: "Pokazano pierwszych {max} z {total}. Użyj wyszukiwania, aby zawęzić listę.",
        roleCountsLoading: "liczby ról: ładowanie",
        roleCountsLoaded: "liczby ról: załadowano {count}",
        roleCountsError: "błąd liczby ról: {error}",
        roleCountsIdle: "liczby ról: gotowe",
        cachedDetails: "szczegóły członków w cache: {count}",
        legacyImported: "zaimportowano z legacy cache: {count}",
        note:
            "Po wybraniu roli member IDs są ładowane bezpośrednio z API ról Discorda. " +
            "Endpoint zwraca maksymalnie 100 ID. Role do 100 członków mogą być kompletne; " +
            "większe role pokazują do 100 bezpośrednich wyników plus dodatkowych członków z zapisanej/legacy cache. " +
            "Stary checkpoint DFS nie jest usuwany ani nadpisywany.",
        refreshRoleCounts: "Odśwież liczby ról",
        refreshSelectedRole: "Odśwież wybraną rolę",
        useCurrentServer: "Użyj aktualnie otwartego serwera",
        clearCache: "Wyczyść cache v2",
        searchLoadedMembers: "Szukaj załadowanych członków po username / display name / nicku / ID...",
        cacheCleared: "Cache RoleSearch v2 wyczyszczona. Legacy checkpoint DFS został zachowany.",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "Załadowano członków: {count}",
        languageChanged: "Język RoleSearch: {language}",
        presenceOnline: "online",
        presenceIdle: "bezczynny",
        presenceDnd: "nie przeszkadzać",
        presenceStreaming: "streamuje",
        presenceOffline: "offline"
    },

    es: {
        settingsLanguage: "Idioma",
        settingsLanguageHint: "Auto sigue el idioma de Discord. Los idiomas no compatibles usan inglés.",
        server: "Servidor",
        role: "Rol",
        membersWithSelectedRole: "Miembros con el rol seleccionado",
        noServerSelected: "Ningún servidor seleccionado",
        selectRole: "Selecciona un rol.",
        selectRoleLeft: "Selecciona un rol a la izquierda.",
        waitingDirectMembers: "Esperando los miembros directos del rol…",
        loadingMemberIds: "Cargando IDs de miembros directamente desde la API de roles de Discord…",
        roleApiError: "Error de la API del rol: {error}",
        completeRole: "{direct} / {total} IDs directos — rol completo",
        endpointLimit: "{direct} / {total} IDs directos — el endpoint de Discord está limitado a 100",
        directOfTotal: "{direct} / {total} IDs directos",
        directLoaded: "{direct} IDs directos cargados",
        extraCache: " • +{extras} extra desde caché guardada/legacy",
        details: " • detalles {resolved}/{total}",
        waitingRoleData: "Esperando datos del rol…",
        profileActionMissing: "RoleSearch: no se encontró la acción del perfil.",
        profileOpenFailed: "RoleSearch: no se pudo abrir el perfil.",
        openDiscordProfile: "Abrir perfil de Discord",
        searchRole: "Buscar rol…",
        searchRoleName: "Buscar nombre de rol...",
        noRolesFound: "No se encontraron roles.",
        refresh: "Actualizar",
        searchMembers: "Buscar miembros…",
        shownLoaded: "{shown} mostrados / {loaded} cargados",
        zeroMembers: "0 miembros",
        loadingRoleMembers: "Cargando miembros del rol…",
        noLoadedMembersMatch: "Ningún miembro cargado coincide.",
        close: "Cerrar",
        customModalFailed: "RoleSearch: no se pudo mostrar la ventana. Revisa la consola.",
        totalSuffix: " — {count} total",
        cachedSuffix: " — {count} en caché",
        memberCount: "{shown} mostrados / {loaded} miembros únicos cargados",
        noMembersLoaded: "Aún no hay miembros cargados para este rol.",
        maxShown: "Mostrando los primeros {max} de {total}. Usa la búsqueda para reducir la lista.",
        roleCountsLoading: "conteos de roles: cargando",
        roleCountsLoaded: "conteos de roles: {count} cargados",
        roleCountsError: "error de conteos de roles: {error}",
        roleCountsIdle: "conteos de roles: listo",
        cachedDetails: "detalles de miembros en caché: {count}",
        legacyImported: "importados de caché legacy: {count}",
        note:
            "Después de seleccionar un rol, los member IDs se cargan directamente desde la API de roles de Discord. " +
            "El endpoint devuelve un máximo de 100 IDs. Los roles con hasta 100 miembros pueden estar completos; " +
            "los roles más grandes muestran hasta 100 resultados directos más miembros adicionales de la caché guardada/legacy. " +
            "El checkpoint DFS antiguo no se elimina ni se sobrescribe.",
        refreshRoleCounts: "Actualizar conteos de roles",
        refreshSelectedRole: "Actualizar rol seleccionado",
        useCurrentServer: "Usar servidor abierto actualmente",
        clearCache: "Borrar caché v2",
        searchLoadedMembers: "Buscar miembros cargados por username / display name / nick / ID...",
        cacheCleared: "Caché de RoleSearch v2 borrada. El checkpoint DFS legacy se conservó.",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "{count} miembro(s) cargado(s)",
        languageChanged: "Idioma de RoleSearch: {language}",
        presenceOnline: "en línea",
        presenceIdle: "ausente",
        presenceDnd: "no molestar",
        presenceStreaming: "transmitiendo",
        presenceOffline: "desconectado"
    },

    fr: {
        settingsLanguage: "Langue",
        settingsLanguageHint: "Auto suit la langue de Discord. Les langues non prises en charge utilisent l'anglais.",
        server: "Serveur",
        role: "Rôle",
        membersWithSelectedRole: "Membres avec le rôle sélectionné",
        noServerSelected: "Aucun serveur sélectionné",
        selectRole: "Sélectionnez un rôle.",
        selectRoleLeft: "Sélectionnez un rôle à gauche.",
        waitingDirectMembers: "En attente des membres directs du rôle…",
        loadingMemberIds: "Chargement des IDs membres directement depuis l'API des rôles Discord…",
        roleApiError: "Erreur API du rôle : {error}",
        completeRole: "{direct} / {total} IDs directs — rôle complet",
        endpointLimit: "{direct} / {total} IDs directs — l'endpoint Discord est limité à 100",
        directOfTotal: "{direct} / {total} IDs directs",
        directLoaded: "{direct} IDs directs chargés",
        extraCache: " • +{extras} supplémentaires depuis le cache enregistré/legacy",
        details: " • détails {resolved}/{total}",
        waitingRoleData: "En attente des données du rôle…",
        profileActionMissing: "RoleSearch : action de profil introuvable.",
        profileOpenFailed: "RoleSearch : impossible d'ouvrir le profil.",
        openDiscordProfile: "Ouvrir le profil Discord",
        searchRole: "Rechercher un rôle…",
        searchRoleName: "Rechercher un nom de rôle...",
        noRolesFound: "Aucun rôle trouvé.",
        refresh: "Actualiser",
        searchMembers: "Rechercher des membres…",
        shownLoaded: "{shown} affichés / {loaded} chargés",
        zeroMembers: "0 membre",
        loadingRoleMembers: "Chargement des membres du rôle…",
        noLoadedMembersMatch: "Aucun membre chargé ne correspond.",
        close: "Fermer",
        customModalFailed: "RoleSearch : impossible d'afficher la fenêtre. Vérifiez la console.",
        totalSuffix: " — {count} au total",
        cachedSuffix: " — {count} en cache",
        memberCount: "{shown} affichés / {loaded} membres uniques chargés",
        noMembersLoaded: "Aucun membre de ce rôle n'est encore chargé.",
        maxShown: "Affichage des {max} premiers sur {total}. Utilisez la recherche pour réduire la liste.",
        roleCountsLoading: "comptes de rôles : chargement",
        roleCountsLoaded: "comptes de rôles : {count} chargés",
        roleCountsError: "erreur des comptes de rôles : {error}",
        roleCountsIdle: "comptes de rôles : prêt",
        cachedDetails: "détails membres en cache : {count}",
        legacyImported: "importés du cache legacy : {count}",
        note:
            "Après sélection d'un rôle, les member IDs sont chargés directement depuis l'API des rôles Discord. " +
            "L'endpoint renvoie au maximum 100 IDs. Les rôles jusqu'à 100 membres peuvent donc être complets ; " +
            "les rôles plus grands affichent jusqu'à 100 résultats directs plus d'éventuels membres du cache enregistré/legacy. " +
            "L'ancien checkpoint DFS n'est ni supprimé ni écrasé.",
        refreshRoleCounts: "Actualiser les comptes de rôles",
        refreshSelectedRole: "Actualiser le rôle sélectionné",
        useCurrentServer: "Utiliser le serveur actuellement ouvert",
        clearCache: "Vider le cache v2",
        searchLoadedMembers: "Rechercher les membres chargés par username / display name / pseudo / ID...",
        cacheCleared: "Cache RoleSearch v2 vidé. Le checkpoint DFS legacy a été conservé.",
        contextMenuLabel: "RoleSearch",
        loadedRoleMembers: "{count} membre(s) chargé(s)",
        languageChanged: "Langue RoleSearch : {language}",
        presenceOnline: "en ligne",
        presenceIdle: "inactif",
        presenceDnd: "ne pas déranger",
        presenceStreaming: "en streaming",
        presenceOffline: "hors ligne"
    }
};

module.exports = class RoleSearch {
    constructor() {
        this.pluginName = "RoleSearch";
        this.languageSetting = "auto";

        this.dispatcher = null;
        this.rest = null;
        this.snowflakeUtils = null;
        this.userProfileActions = null;
        this.contextMenuUnpatch = null;
        this.customModalCleanup = null;

        this.guildId = null;
        this.guildName = null;

        this.selectedRoleId = null;
        this.roleSearchText = "";
        this.memberSearchText = "";

        this.roleCounts = new Map();          // roleId -> total count
        this.roleStates = new Map();          // roleId -> {status, memberIds, error, fetchedAt}
        this.memberDetails = new Map();       // userId -> minimal details
        this.legacyImportedIds = new Set();   // ids imported from v1 DFS checkpoint
        this.requestedHydrationIds = new Set();

        this.countsState = {status: "idle", error: null, fetchedAt: 0};
        this.currentRoleRequestToken = 0;

        this.panel = null;
        this.ui = {};
        this.refreshInterval = null;
        this.saveTimer = null;

        this.onChunk = this.onChunk.bind(this);
        this.onChunkBatch = this.onChunkBatch.bind(this);
    }

    // ============================================================
    // CONFIG / DATA KEYS
    // ============================================================

    cacheKey(guildId = this.guildId) {
        return `role-cache-v2-${guildId ?? "none"}`;
    }

    legacyCheckpointKey(guildId = this.guildId) {
        return `checkpoint-v1-${guildId ?? "none"}`;
    }

    pluginSettingsKey() {
        return "plugin-settings-v1";
    }

    loadPluginSettings() {
        const saved = this.dataLoad?.(this.pluginSettingsKey()) ?? null;
        const language = saved?.language;

        if (language === "auto" || ROLESEARCH_I18N[language]) {
            this.languageSetting = language;
        } else {
            this.languageSetting = "auto";
        }
    }

    savePluginSettings() {
        return this.dataSave?.(this.pluginSettingsKey(), {
            language: this.languageSetting
        });
    }

    getDiscordLocale() {
        try {
            const localeStore = BdApi.Webpack.getStore?.("LocaleStore");
            const locale = localeStore?.locale ?? localeStore?.systemLocale;
            if (typeof locale === "string" && locale) return locale;
        } catch {}

        try {
            const locale = navigator?.language;
            if (typeof locale === "string" && locale) return locale;
        } catch {}

        return "en-US";
    }

    normalizeLanguage(locale) {
        const normalized = String(locale || "")
            .trim()
            .toLowerCase()
            .replace("_", "-");

        const base = normalized.split("-")[0];

        if (ROLESEARCH_I18N[normalized]) return normalized;
        if (ROLESEARCH_I18N[base]) return base;

        return "en";
    }

    getActiveLanguage() {
        if (
            this.languageSetting !== "auto" &&
            ROLESEARCH_I18N[this.languageSetting]
        ) {
            return this.languageSetting;
        }

        return this.normalizeLanguage(this.getDiscordLocale());
    }

    t(key, vars = {}) {
        const language = this.getActiveLanguage();
        const table = ROLESEARCH_I18N[language] ?? ROLESEARCH_I18N.en;
        let value = table[key] ?? ROLESEARCH_I18N.en[key] ?? key;

        return String(value).replace(/\{(\w+)\}/g, (_, name) => {
            return Object.prototype.hasOwnProperty.call(vars, name)
                ? String(vars[name])
                : `{${name}}`;
        });
    }

    presenceLabel(status) {
        switch (status) {
            case "online": return this.t("presenceOnline");
            case "idle": return this.t("presenceIdle");
            case "dnd": return this.t("presenceDnd");
            case "streaming": return this.t("presenceStreaming");
            default: return this.t("presenceOffline");
        }
    }

    setLanguage(language) {
        if (language !== "auto" && !ROLESEARCH_I18N[language]) {
            language = "auto";
        }

        this.languageSetting = language;
        this.savePluginSettings();
        this.refreshUI();

        const displayName =
            language === "auto"
                ? `${ROLESEARCH_LANGUAGE_NAMES.auto} → ${ROLESEARCH_LANGUAGE_NAMES[this.getActiveLanguage()] ?? this.getActiveLanguage()}`
                : ROLESEARCH_LANGUAGE_NAMES[language] ?? language;

        BdApi.UI.showToast(
            this.t("languageChanged", {language: displayName})
        );
    }

    // ============================================================
    // BETTERDISCORD / DISCORD INTERNALS
    // ============================================================

    findDispatcher() {
        const W = BdApi.Webpack;

        try {
            const holder = W.getByKeys("_dispatcher");
            if (holder?._dispatcher?.dispatch && holder?._dispatcher?.subscribe) {
                return holder._dispatcher;
            }
        } catch {}

        try {
            const userStore = W.getStore?.("UserStore");
            if (userStore?._dispatcher?.dispatch && userStore?._dispatcher?.subscribe) {
                return userStore._dispatcher;
            }
        } catch {}

        try {
            const d = W.getByKeys("actionLogger");
            if (d?.dispatch && d?.subscribe) return d;
        } catch {}

        try {
            return W.getModule(
                m =>
                    m &&
                    typeof m.dispatch === "function" &&
                    typeof m.subscribe === "function" &&
                    typeof m.unsubscribe === "function",
                {searchExports: true}
            );
        } catch {}

        return null;
    }

    findRestAPI() {
        const W = BdApi.Webpack;

        // Vencord currently identifies Discord's RestAPI as an object with
        // .del and .put; require .get too because this plugin only performs GETs.
        try {
            const found = W.getModule(
                m =>
                    m &&
                    typeof m === "object" &&
                    typeof m.get === "function" &&
                    typeof m.put === "function" &&
                    typeof m.del === "function",
                {searchExports: true}
            );
            if (found) return found;
        } catch {}

        // Fallback used by many Discord-mod plugins.
        try {
            const found = W.getByKeys("get", "post", "put", "patch", "del");
            if (typeof found?.get === "function") return found;
        } catch {}

        return null;
    }

    findSnowflakeUtils() {
        try {
            return BdApi.Webpack.getByKeys("fromTimestamp", "extractTimestamp");
        } catch {
            return null;
        }
    }

    findUserProfileActions() {
        const W = BdApi.Webpack;

        try {
            const actions = W.getByKeys("openUserProfileModal", "closeUserProfileModal");
            if (typeof actions?.openUserProfileModal === "function") return actions;
        } catch {}

        try {
            return W.getModule(
                m =>
                    m &&
                    typeof m.openUserProfileModal === "function" &&
                    typeof m.closeUserProfileModal === "function",
                {searchExports: true}
            );
        } catch {}

        return null;
    }

    getStore(name) {
        try {
            return BdApi.Webpack.getStore?.(name) ?? null;
        } catch {
            return null;
        }
    }

    getSelectedGuildId() {
        const store = this.getStore("SelectedGuildStore");
        return (
            store?.getGuildId?.() ??
            store?.getLastSelectedGuildId?.() ??
            null
        );
    }

    getGuild(guildId = this.guildId) {
        return this.getStore("GuildStore")?.getGuild?.(guildId) ?? null;
    }

    getRoles(guildId = this.guildId) {
        if (!guildId) return [];

        let roles = [];
        const roleStore = this.getStore("GuildRoleStore");

        try {
            const sorted = roleStore?.getSortedRoles?.(guildId);
            if (Array.isArray(sorted) && sorted.length) roles = sorted;
        } catch {}

        if (!roles.length) {
            try {
                const snapshot = roleStore?.getRolesSnapshot?.(guildId);
                if (snapshot) roles = Object.values(snapshot);
            } catch {}
        }

        if (!roles.length) {
            try {
                const mutable = roleStore?.getUnsafeMutableRoles?.(guildId);
                if (mutable) roles = Object.values(mutable);
            } catch {}
        }

        if (!roles.length) {
            try {
                const raw = this.getStore("GuildStore")?.getRoles?.(guildId);
                if (raw) roles = Array.isArray(raw) ? raw : Object.values(raw);
            } catch {}
        }

        const byId = new Map();
        for (const role of roles) {
            if (role?.id) byId.set(String(role.id), role);
        }

        return [...byId.values()]
            .filter(role => String(role.id) !== String(guildId)) // hide @everyone
            .sort((a, b) => {
                const position = (b?.position ?? 0) - (a?.position ?? 0);
                if (position !== 0) return position;
                return String(a?.name ?? "").localeCompare(String(b?.name ?? ""));
            });
    }

    // ============================================================
    // PERSISTENT CACHE
    // ============================================================

    dataLoad(key) {
        try {
            if (BdApi.Data?.load) return BdApi.Data.load(this.pluginName, key);
        } catch {}

        try {
            if (typeof BdApi.loadData === "function") {
                return BdApi.loadData(this.pluginName, key);
            }
        } catch {}

        return null;
    }

    dataSave(key, value) {
        try {
            if (BdApi.Data?.save) {
                BdApi.Data.save(this.pluginName, key, value);
                return true;
            }
        } catch (error) {
            console.warn("[RoleSearch] BdApi.Data.save failed:", error);
        }

        try {
            if (typeof BdApi.saveData === "function") {
                BdApi.saveData(this.pluginName, key, value);
                return true;
            }
        } catch (error) {
            console.warn("[RoleSearch] BdApi.saveData failed:", error);
        }

        return false;
    }

    dataDelete(key) {
        try {
            if (BdApi.Data?.delete) {
                BdApi.Data.delete(this.pluginName, key);
                return true;
            }
        } catch {}

        try {
            if (typeof BdApi.deleteData === "function") {
                BdApi.deleteData(this.pluginName, key);
                return true;
            }
        } catch {}

        return false;
    }

    saveCacheSoon() {
        if (this.saveTimer) clearTimeout(this.saveTimer);

        this.saveTimer = setTimeout(() => {
            this.saveTimer = null;
            this.saveCache();
        }, 500);
    }

    saveCache() {
        if (!this.guildId) return false;

        const state = {
            version: 2,
            guildId: this.guildId,
            guildName: this.guildName,
            selectedRoleId: this.selectedRoleId,
            roleCounts: [...this.roleCounts.entries()],
            roleStates: [...this.roleStates.entries()],
            memberDetails: [...this.memberDetails.entries()],
            legacyImportedIds: [...this.legacyImportedIds],
            countsState: this.countsState,
            savedAt: Date.now()
        };

        return this.dataSave(this.cacheKey(), state);
    }

    loadV2Cache(guildId) {
        const cached = this.dataLoad(this.cacheKey(guildId));

        if (!cached || cached.version !== 2 || String(cached.guildId) !== String(guildId)) {
            return false;
        }

        this.selectedRoleId = cached.selectedRoleId ?? null;
        this.roleCounts = new Map(Array.isArray(cached.roleCounts) ? cached.roleCounts : []);
        this.roleStates = new Map(Array.isArray(cached.roleStates) ? cached.roleStates : []);
        this.memberDetails = new Map(Array.isArray(cached.memberDetails) ? cached.memberDetails : []);
        this.legacyImportedIds = new Set(
            Array.isArray(cached.legacyImportedIds) ? cached.legacyImportedIds : []
        );

        this.countsState = cached.countsState ?? {
            status: "idle",
            error: null,
            fetchedAt: 0
        };

        return true;
    }

    importLegacyDFSCheckpoint(guildId) {
        // IMPORTANT: read only. We intentionally never delete or overwrite
        // the v1 DFS checkpoint, so the old crawl can still be resumed by v1.
        const legacy = this.dataLoad(this.legacyCheckpointKey(guildId));
        if (!legacy || String(legacy.guildId) !== String(guildId)) return 0;

        const rows = Array.isArray(legacy.uniqueMembers) ? legacy.uniqueMembers : [];
        let imported = 0;

        for (const row of rows) {
            if (!Array.isArray(row) || row.length < 2) continue;

            const [idRaw, detailsRaw] = row;
            const id = String(idRaw ?? "");
            if (!id) continue;

            const details = detailsRaw ?? {};
            const normalized = {
                id,
                username: details.username ?? "",
                globalName: details.globalName ?? "",
                nick: details.nick ?? "",
                roles: Array.isArray(details.roles) ? [...details.roles] : []
            };

            if (!this.memberDetails.has(id)) {
                this.memberDetails.set(id, normalized);
                imported++;
            }

            this.legacyImportedIds.add(id);
        }

        if (imported) this.saveCacheSoon();
        return imported;
    }

    clearV2Cache() {
        if (!this.guildId) return;

        this.dataDelete(this.cacheKey());

        this.roleCounts.clear();
        this.roleStates.clear();
        this.memberDetails.clear();
        this.legacyImportedIds.clear();
        this.requestedHydrationIds.clear();

        this.selectedRoleId = null;
        this.countsState = {status: "idle", error: null, fetchedAt: 0};

        // Re-import legacy data but preserve the actual old checkpoint.
        this.importLegacyDFSCheckpoint(this.guildId);

        this.refreshUI();
        BdApi.UI.showToast(
            this.t("cacheCleared")
        );
    }

    // ============================================================
    // REST HELPERS
    // ============================================================

    responseBody(response) {
        return response?.body ?? response;
    }

    getErrorMessage(error) {
        if (error instanceof Error) return error.message;
        if (typeof error === "string") return error;

        const body = error?.body;
        if (typeof body?.message === "string") return body.message;
        if (typeof error?.message === "string") return error.message;

        try {
            return JSON.stringify(error);
        } catch {
            return "Unknown error";
        }
    }

    normalizeRoleMemberIds(response) {
        const body = this.responseBody(response);

        if (Array.isArray(body)) {
            return body
                .filter(id => typeof id === "string" || typeof id === "number")
                .map(String);
        }

        if (Array.isArray(body?.member_ids)) {
            return body.member_ids
                .filter(id => typeof id === "string" || typeof id === "number")
                .map(String);
        }

        if (Array.isArray(body?.user_ids)) {
            return body.user_ids
                .filter(id => typeof id === "string" || typeof id === "number")
                .map(String);
        }

        return [];
    }

    normalizeRoleCounts(response) {
        const body = this.responseBody(response);
        const out = new Map();

        if (!body || typeof body !== "object" || Array.isArray(body)) return out;

        for (const [roleId, count] of Object.entries(body)) {
            const number = Number(count);
            if (Number.isFinite(number)) out.set(String(roleId), number);
        }

        return out;
    }

    async fetchRoleCounts(force = false) {
        if (!this.guildId || !this.rest?.get) return false;

        if (
            !force &&
            this.countsState.status === "loaded" &&
            this.roleCounts.size
        ) {
            return true;
        }

        this.countsState = {
            status: "loading",
            error: null,
            fetchedAt: this.countsState.fetchedAt || 0
        };
        this.refreshUI();

        try {
            const response = await this.rest.get({
                url: `/guilds/${this.guildId}/roles/member-counts`,
                oldFormErrors: true,
                retries: 2
            });

            this.roleCounts = this.normalizeRoleCounts(response);
            this.countsState = {
                status: "loaded",
                error: null,
                fetchedAt: Date.now()
            };

            this.saveCacheSoon();
            this.refreshUI();
            return true;
        } catch (error) {
            this.countsState = {
                status: "error",
                error: this.getErrorMessage(error),
                fetchedAt: this.countsState.fetchedAt || 0
            };

            console.error("[RoleSearch] Role member-counts API failed:", error);
            this.refreshUI();
            return false;
        }
    }

    async fetchRoleMemberIds(roleId, force = false) {
        if (!this.guildId || !roleId || !this.rest?.get) return false;

        const existing = this.roleStates.get(roleId);

        if (!force && existing?.status === "loaded" && Array.isArray(existing.memberIds)) {
            this.hydrateRoleIds(roleId, existing.memberIds);
            return true;
        }

        const requestToken = ++this.currentRoleRequestToken;

        this.roleStates.set(roleId, {
            status: "loading",
            memberIds: existing?.memberIds ?? [],
            error: null,
            fetchedAt: existing?.fetchedAt ?? 0
        });

        this.refreshUI();

        try {
            const response = await this.rest.get({
                url: `/guilds/${this.guildId}/roles/${roleId}/member-ids`,
                oldFormErrors: true,
                retries: 2
            });

            // Only let the newest selection update the live status, but keep
            // successfully fetched data for this role in cache regardless.
            const ids = [...new Set(this.normalizeRoleMemberIds(response))];

            this.roleStates.set(roleId, {
                status: "loaded",
                memberIds: ids,
                error: null,
                fetchedAt: Date.now()
            });

            this.hydrateRoleIds(roleId, ids);
            this.saveCacheSoon();

            if (requestToken === this.currentRoleRequestToken) {
                this.refreshUI();
            }

            return true;
        } catch (error) {
            this.roleStates.set(roleId, {
                status: "error",
                memberIds: existing?.memberIds ?? [],
                error: this.getErrorMessage(error),
                fetchedAt: existing?.fetchedAt ?? 0
            });

            console.error(`[RoleSearch] member-ids API failed for role ${roleId}:`, error);
            this.saveCacheSoon();

            if (requestToken === this.currentRoleRequestToken) {
                this.refreshUI();
            }

            return false;
        }
    }

    // ============================================================
    // MEMBER HYDRATION / CACHE
    // ============================================================

    minimalMember(member) {
        const id = String(
            member?.user?.id ??
            member?.userId ??
            member?.id ??
            ""
        );

        return {
            id,
            username: member?.user?.username ?? member?.username ?? "",
            globalName:
                member?.user?.global_name ??
                member?.user?.globalName ??
                member?.globalName ??
                "",
            nick: member?.nick ?? "",
            roles: Array.isArray(member?.roles) ? [...member.roles] : []
        };
    }

    mergeMember(details) {
        if (!details?.id) return;

        const id = String(details.id);
        const old = this.memberDetails.get(id);

        this.memberDetails.set(id, {
            id,
            username: details.username || old?.username || "",
            globalName: details.globalName || old?.globalName || "",
            nick: details.nick || old?.nick || "",
            roles:
                Array.isArray(details.roles) && details.roles.length
                    ? [...details.roles]
                    : Array.isArray(old?.roles)
                        ? [...old.roles]
                        : []
        });
    }

    resolveFromStores(userId) {
        const memberStore = this.getStore("GuildMemberStore");
        const userStore = this.getStore("UserStore");

        const member = memberStore?.getMember?.(this.guildId, userId);
        const user = userStore?.getUser?.(userId);

        if (!member && !user) return null;

        return {
            id: String(userId),
            username: user?.username ?? "",
            globalName: user?.globalName ?? user?.global_name ?? "",
            nick: member?.nick ?? "",
            roles: Array.isArray(member?.roles) ? [...member.roles] : []
        };
    }

    roleLegacyCachedIds(roleId) {
        const ids = [];

        for (const [id, details] of this.memberDetails) {
            if (
                Array.isArray(details?.roles) &&
                details.roles.includes(roleId)
            ) {
                ids.push(id);
            }
        }

        return ids;
    }

    effectiveRoleMemberIds(roleId) {
        if (!roleId) return [];

        const direct = this.roleStates.get(roleId)?.memberIds ?? [];
        const legacy = this.roleLegacyCachedIds(roleId);

        return [...new Set([...direct, ...legacy].map(String))];
    }

    hydrateRoleIds(roleId, ids) {
        if (!this.guildId || !Array.isArray(ids) || !ids.length) return;

        const missing = [];

        for (const idRaw of ids) {
            const id = String(idRaw);

            const storeDetails = this.resolveFromStores(id);
            if (storeDetails) {
                this.mergeMember(storeDetails);
                continue;
            }

            if (this.memberDetails.has(id)) continue;
            if (this.requestedHydrationIds.has(id)) continue;

            this.requestedHydrationIds.add(id);
            missing.push(id);
        }

        if (missing.length) {
            this.requestMembersByIds(missing);
        }

        this.saveCacheSoon();
        this.refreshUI();
    }

    requestMembersByIds(userIds) {
        if (!this.dispatcher || !this.guildId || !userIds.length) return;

        const chunkSize = 100;

        for (let i = 0; i < userIds.length; i += chunkSize) {
            const chunk = userIds.slice(i, i + chunkSize);

            const payload = {
                type: "GUILD_MEMBERS_REQUEST",
                guildIds: [this.guildId],
                userIds: chunk,
                presences: true
            };

            try {
                if (typeof this.snowflakeUtils?.fromTimestamp === "function") {
                    payload.nonce = this.snowflakeUtils.fromTimestamp(Date.now());
                }
            } catch {}

            try {
                this.dispatcher.dispatch(payload);
            } catch (error) {
                console.error("[RoleSearch] GUILD_MEMBERS_REQUEST failed:", error);
            }
        }
    }

    extractMembers(event) {
        const out = [];

        const add = (members, eventGuildId = null) => {
            if (
                eventGuildId &&
                this.guildId &&
                String(eventGuildId) !== String(this.guildId)
            ) {
                return;
            }

            if (Array.isArray(members)) out.push(...members);
        };

        add(event?.members, event?.guildId ?? event?.guild_id);

        add(
            event?.chunk?.members,
            event?.chunk?.guildId ??
            event?.chunk?.guild_id ??
            event?.guildId ??
            event?.guild_id
        );

        const arrays = [
            event?.chunks,
            event?.chunkBatch,
            event?.guildMembersChunks,
            event?.membersChunks,
            event?.batch
        ];

        for (const arr of arrays) {
            if (!Array.isArray(arr)) continue;

            for (const chunk of arr) {
                add(
                    chunk?.members,
                    chunk?.guildId ??
                    chunk?.guild_id ??
                    event?.guildId ??
                    event?.guild_id
                );
            }
        }

        return out;
    }

    ingestChunk(event) {
        const members = this.extractMembers(event);
        if (!members.length) return;

        let changed = false;

        for (const member of members) {
            const details = this.minimalMember(member);
            if (!details.id) continue;

            this.mergeMember(details);
            changed = true;
        }

        if (changed) {
            this.saveCacheSoon();
            this.refreshUI();
        }
    }

    onChunk(event) {
        this.ingestChunk(event);
    }

    onChunkBatch(event) {
        this.ingestChunk(event);
    }

    // ============================================================
    // GUILD CONTEXT
    // ============================================================

    switchToGuildId(guildId) {
        this.currentRoleRequestToken++;

        if (!guildId) {
            this.guildId = null;
            this.guildName = null;
            this.selectedRoleId = null;
            this.roleCounts.clear();
            this.roleStates.clear();
            this.memberDetails.clear();
            this.legacyImportedIds.clear();
            this.requestedHydrationIds.clear();
            this.countsState = {status: "idle", error: null, fetchedAt: 0};
            this.refreshUI();
            return false;
        }

        this.guildId = String(guildId);
        this.guildName = this.getGuild(this.guildId)?.name ?? "(unknown server)";

        this.selectedRoleId = null;
        this.roleCounts = new Map();
        this.roleStates = new Map();
        this.memberDetails = new Map();
        this.legacyImportedIds = new Set();
        this.requestedHydrationIds = new Set();
        this.countsState = {status: "idle", error: null, fetchedAt: 0};

        this.loadV2Cache(this.guildId);
        const imported = this.importLegacyDFSCheckpoint(this.guildId);

        console.log(
            `[RoleSearch] Guild loaded: ${this.guildName} (${this.guildId}); ` +
            `${this.memberDetails.size} cached member detail(s), ${imported} newly imported from legacy DFS.`
        );

        this.refreshUI();

        void this.fetchRoleCounts(false);

        if (this.selectedRoleId) {
            void this.fetchRoleMemberIds(this.selectedRoleId, false);
        }

        return true;
    }

    switchToCurrentGuild() {
        return this.switchToGuildId(this.getSelectedGuildId());
    }

    // ============================================================
    // ROLE / MEMBER VIEW HELPERS
    // ============================================================

    selectedRole() {
        return this.getRoles().find(
            role => String(role.id) === String(this.selectedRoleId)
        ) ?? null;
    }

    selectedRoleState() {
        if (!this.selectedRoleId) return null;
        return this.roleStates.get(this.selectedRoleId) ?? null;
    }

    selectedRoleTotalCount() {
        if (!this.selectedRoleId) return null;
        return this.roleCounts.has(this.selectedRoleId)
            ? this.roleCounts.get(this.selectedRoleId)
            : null;
    }

    selectedRoleDirectIds() {
        return this.selectedRoleState()?.memberIds ?? [];
    }

    selectedRoleEffectiveIds() {
        return this.effectiveRoleMemberIds(this.selectedRoleId);
    }

    memberDetailsForId(userId) {
        const store = this.resolveFromStores(userId);
        if (store) {
            this.mergeMember(store);
            return this.memberDetails.get(String(userId));
        }

        return (
            this.memberDetails.get(String(userId)) ?? {
                id: String(userId),
                username: "",
                globalName: "",
                nick: "",
                roles: []
            }
        );
    }

    filteredSelectedRoleIds() {
        const ids = this.selectedRoleEffectiveIds();
        const q = this.memberSearchText.trim().toLowerCase();

        const filtered = q
            ? ids.filter(id => {
                const member = this.memberDetailsForId(id);

                return [
                    member.id,
                    member.username,
                    member.globalName,
                    member.nick
                ]
                    .filter(Boolean)
                    .some(value =>
                        String(value).toLowerCase().includes(q)
                    );
            })
            : ids;

        return filtered.sort((a, b) => {
            const ma = this.memberDetailsForId(a);
            const mb = this.memberDetailsForId(b);

            const an = (
                ma.nick ||
                ma.globalName ||
                ma.username ||
                ma.id
            ).toLowerCase();

            const bn = (
                mb.nick ||
                mb.globalName ||
                mb.username ||
                mb.id
            ).toLowerCase();

            return an.localeCompare(bn);
        });
    }

    hydrationStats(roleId = this.selectedRoleId) {
        const ids = this.effectiveRoleMemberIds(roleId);

        let resolved = 0;
        for (const id of ids) {
            const member = this.memberDetailsForId(id);
            if (member.username || member.globalName || member.nick) resolved++;
        }

        return {resolved, total: ids.length};
    }

    roleStatusText() {
        if (!this.selectedRoleId) return this.t("selectRole");

        const state = this.selectedRoleState();
        const totalCount = this.selectedRoleTotalCount();
        const directIds = this.selectedRoleDirectIds();
        const effectiveIds = this.selectedRoleEffectiveIds();
        const hydration = this.hydrationStats();

        if (!state) {
            return this.t("waitingDirectMembers");
        }

        if (state.status === "loading") {
            return this.t("loadingMemberIds");
        }

        if (state.status === "error") {
            return this.t("roleApiError", {error: state.error || "unknown error"});
        }

        if (state.status === "loaded") {
            const direct = directIds.length;
            const extras = Math.max(0, effectiveIds.length - direct);

            let coverage;
            if (typeof totalCount === "number") {
                if (totalCount <= 100 && direct >= totalCount) {
                    coverage = this.t("completeRole", {direct, total: totalCount});
                } else if (totalCount > 100 && direct >= 100) {
                    coverage = this.t("endpointLimit", {direct, total: totalCount});
                } else {
                    coverage = this.t("directOfTotal", {direct, total: totalCount});
                }
            } else {
                coverage = this.t("directLoaded", {direct});
            }

            if (extras > 0) {
                coverage += this.t("extraCache", {extras});
            }

            coverage += this.t("details", {resolved: hydration.resolved, total: hydration.total});

            return coverage;
        }

        return this.t("waitingRoleData");
    }

    roleColor(role) {
        if (!role) return "#949ba4";

        if (typeof role.colorString === "string" && role.colorString) {
            return role.colorString;
        }

        if (typeof role.color === "number" && role.color > 0) {
            return `#${role.color.toString(16).padStart(6, "0")}`;
        }

        const primary =
            role?.colors?.primaryColor ??
            role?.colors?.primary_color ??
            role?.colors?.primary;

        if (typeof primary === "number" && primary > 0) {
            return `#${primary.toString(16).padStart(6, "0")}`;
        }

        return "#949ba4";
    }

    presenceStatus(userId) {
        try {
            return this.getStore("PresenceStore")?.getStatus?.(String(userId)) || "offline";
        } catch {
            return "offline";
        }
    }

    presenceColor(status) {
        switch (status) {
            case "online": return "#23a55a";
            case "idle": return "#f0b232";
            case "dnd": return "#f23f43";
            case "streaming": return "#593695";
            default: return "#80848e";
        }
    }

    openUserProfile(userId) {
        const id = String(userId);
        if (!id || !this.userProfileActions?.openUserProfileModal) {
            BdApi.UI.showToast(this.t("profileActionMissing"), {type: "error"});
            return;
        }

        const payload = {
            userId: id,
            guildId: this.guildId,
            analyticsLocation: {
                page: "Guild Channel",
                section: "Profile Popout"
            }
        };

        try {
            if (String(this.getSelectedGuildId() ?? "") === String(this.guildId ?? "")) {
                const channelId = this.getStore("SelectedChannelStore")?.getChannelId?.();
                if (channelId) payload.channelId = channelId;
            }
        } catch {}

        try {
            this.userProfileActions.openUserProfileModal(payload);
        } catch (error) {
            console.error("[RoleSearch] Could not open user profile:", error);
            BdApi.UI.showToast(this.t("profileOpenFailed"), {type: "error"});
        }
    }

    patchGuildContextMenu() {
        try {
            this.contextMenuUnpatch?.();
        } catch {}
        this.contextMenuUnpatch = null;

        if (!BdApi.ContextMenu?.patch || !BdApi.ContextMenu?.buildItem) {
            console.warn("[RoleSearch] BetterDiscord ContextMenu API unavailable.");
            return;
        }

        this.contextMenuUnpatch = BdApi.ContextMenu.patch(
            "guild-context",
            (retVal, props) => {
                try {
                    const guild = props?.guild;
                    if (!guild?.id) return retVal;

                    const item = BdApi.ContextMenu.buildItem({
                        type: "text",
                        id: "rolesearch-open",
                        label: this.t("contextMenuLabel"),
                        action: () => this.openRoleSearchModal(String(guild.id))
                    });

                    const children = retVal?.props?.children;
                    if (!Array.isArray(children)) return retVal;

                    const alreadyThere = children.some(
                        child => child?.props?.id === "rolesearch-open"
                    );
                    if (alreadyThere) return retVal;

                    const copyIndex = children.findIndex(
                        child =>
                            child?.props?.id === "devmode-copy-id" ||
                            child?.props?.id === "copy-id"
                    );

                    children.splice(copyIndex >= 0 ? copyIndex : 1, 0, item);
                } catch (error) {
                    console.error("[RoleSearch] guild-context patch failed:", error);
                }

                return retVal;
            }
        );
    }

    openRoleSearchModal(guildId) {
        this.switchToGuildId(guildId);

        const React = BdApi.React;
        const plugin = this;

        function RoleSearchModal() {
            const [, forceRender] = React.useReducer(x => x + 1, 0);
            const [roleQuery, setRoleQuery] = React.useState("");
            const [memberQuery, setMemberQuery] = React.useState("");

            React.useEffect(() => {
                void plugin.fetchRoleCounts(false).then(() => forceRender());

                if (plugin.selectedRoleId) {
                    void plugin.fetchRoleMemberIds(plugin.selectedRoleId, false)
                        .then(() => forceRender());
                }

                const interval = setInterval(forceRender, 500);
                return () => clearInterval(interval);
            }, []);

            const allRoles = plugin.getRoles(guildId);
            const q = roleQuery.trim().toLowerCase();
            const roles = allRoles.filter(role =>
                !q || String(role.name ?? "").toLowerCase().includes(q)
            );

            const selected = plugin.selectedRole();
            const roleState = plugin.selectedRoleState();
            const totalCount = plugin.selectedRoleTotalCount();
            const effectiveIds = plugin.selectedRoleEffectiveIds();

            let visibleIds = [...effectiveIds];
            const mq = memberQuery.trim().toLowerCase();

            if (mq) {
                visibleIds = visibleIds.filter(id => {
                    const m = plugin.memberDetailsForId(id);
                    return [m.id, m.username, m.globalName, m.nick]
                        .filter(Boolean)
                        .some(value => String(value).toLowerCase().includes(mq));
                });
            }

            visibleIds.sort((a, b) => {
                const ma = plugin.memberDetailsForId(a);
                const mb = plugin.memberDetailsForId(b);

                const an = (ma.nick || ma.globalName || ma.username || ma.id).toLowerCase();
                const bn = (mb.nick || mb.globalName || mb.username || mb.id).toLowerCase();
                return an.localeCompare(bn);
            });

            const roleColor = plugin.roleColor(selected);
            const h = React.createElement;

            const selectRole = role => {
                plugin.selectedRoleId = String(role.id);
                plugin.memberSearchText = "";
                plugin.saveCacheSoon();
                forceRender();

                void plugin.fetchRoleMemberIds(plugin.selectedRoleId, false)
                    .then(() => forceRender());
            };

            const statusText = plugin.roleStatusText();

            const roleRows = roles.slice(0, 200).map(role => {
                const roleId = String(role.id);
                const selectedHere = roleId === String(plugin.selectedRoleId);
                const count = plugin.roleCounts.get(roleId);
                const color = plugin.roleColor(role);

                return h(
                    "button",
                    {
                        key: roleId,
                        onClick: () => selectRole(role),
                        style: {
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 10px",
                            marginBottom: "4px",
                            cursor: "pointer",
                            textAlign: "left",
                            background: selectedHere
                                ? "var(--background-modifier-selected)"
                                : "transparent",
                            color: "var(--text-normal)"
                        }
                    },
                    h("span", {
                        style: {
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            flex: "0 0 12px",
                            background: color,
                            boxShadow: `0 0 0 1px ${color}`
                        }
                    }),
                    h(
                        "span",
                        {style: {flex: "1", fontWeight: selectedHere ? "700" : "500"}},
                        role.name
                    ),
                    typeof count === "number"
                        ? h(
                            "span",
                            {style: {opacity: "0.65", fontSize: "12px"}},
                            String(count)
                        )
                        : null
                );
            });

            const memberRows = visibleIds.slice(0, 500).map(id => {
                const member = plugin.memberDetailsForId(id);
                const display =
                    member.nick ||
                    member.globalName ||
                    member.username ||
                    `Unknown User (${id})`;

                const status = plugin.presenceStatus(id);
                const statusColor = plugin.presenceColor(status);

                return h(
                    "button",
                    {
                        key: id,
                        onClick: () => plugin.openUserProfile(id),
                        title: plugin.t("openDiscordProfile"),
                        style: {
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "9px 10px",
                            border: "none",
                            borderBottom: "1px solid var(--background-modifier-accent)",
                            background: "transparent",
                            color: "var(--text-normal)",
                            cursor: "pointer",
                            textAlign: "left"
                        }
                    },
                    h("span", {
                        style: {
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            flex: "0 0 10px",
                            background: statusColor,
                            boxShadow: "0 0 0 2px var(--background-secondary)"
                        }
                    }),
                    h(
                        "span",
                        {style: {flex: "1", minWidth: 0}},
                        h(
                            "div",
                            {
                                style: {
                                    fontWeight: "600",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }
                            },
                            display
                        ),
                        h(
                            "div",
                            {
                                style: {
                                    opacity: "0.65",
                                    fontSize: "12px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }
                            },
                            `${member.username ? "@" + member.username + " • " : ""}${plugin.presenceLabel(status)}`
                        )
                    )
                );
            });

            return h(
                "div",
                {
                    style: {
                        width: "100%",
                        height: "100%",
                        minWidth: 0,
                        minHeight: 0,
                        display: "grid",
                        gridTemplateColumns: "300px minmax(0, 1fr)",
                        gap: "16px",
                        color: "var(--text-normal)"
                    }
                },
                h(
                    "div",
                    {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0
                        }
                    },
                    h(
                        "div",
                        {
                            style: {
                                fontSize: "13px",
                                fontWeight: "700",
                                marginBottom: "8px"
                            }
                        },
                        plugin.guildName
                    ),
                    h("input", {
                        value: roleQuery,
                        placeholder: plugin.t("searchRole"),
                        onChange: e => setRoleQuery(e.target.value),
                        style: {
                            width: "100%",
                            boxSizing: "border-box",
                            marginBottom: "8px",
                            padding: "8px 9px",
                            borderRadius: "6px",
                            border: "1px solid var(--background-modifier-accent)",
                            background: "var(--input-background)",
                            color: "var(--text-normal)"
                        }
                    }),
                    h(
                        "div",
                        {
                            style: {
                                overflowY: "auto",
                                minHeight: 0,
                                paddingRight: "4px"
                            }
                        },
                        roleRows.length
                            ? roleRows
                            : h(
                                "div",
                                {style: {opacity: "0.65", padding: "8px"}},
                                plugin.t("noRolesFound")
                            )
                    )
                ),
                h(
                    "div",
                    {
                        style: {
                            minWidth: 0,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0
                        }
                    },
                    selected
                        ? h(
                            "div",
                            {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "10px",
                                    marginBottom: "10px"
                                }
                            },
                            h(
                                "div",
                                {
                                    style: {
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "6px 10px",
                                        borderRadius: "999px",
                                        background: roleColor,
                                        color: "#fff",
                                        fontWeight: "700",
                                        maxWidth: "70%",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                },
                                selected.name
                            ),
                            h(
                                "button",
                                {
                                    onClick: () => {
                                        void plugin.fetchRoleMemberIds(
                                            plugin.selectedRoleId,
                                            true
                                        ).then(() => forceRender());
                                    },
                                    style: {
                                        border: "none",
                                        borderRadius: "6px",
                                        padding: "7px 10px",
                                        background: "var(--button-secondary-background)",
                                        color: "var(--button-secondary-text)",
                                        cursor: "pointer"
                                    }
                                },
                                plugin.t("refresh")
                            )
                        )
                        : h(
                            "div",
                            {style: {fontWeight: "700", marginBottom: "10px"}},
                            plugin.t("selectRole").replace(/\.$/, "")
                        ),
                    h(
                        "div",
                        {
                            style: {
                                padding: "9px 10px",
                                marginBottom: "10px",
                                borderRadius: "6px",
                                background: "var(--background-secondary)",
                                fontSize: "12px",
                                lineHeight: "1.35"
                            }
                        },
                        selected
                            ? `${statusText}${typeof totalCount === "number" ? ` • ${plugin.t("totalSuffix", {count: totalCount}).replace(/^\s*—\s*/, "")}` : ""}`
                            : plugin.t("selectRoleLeft")
                    ),
                    h("input", {
                        value: memberQuery,
                        disabled: !selected,
                        placeholder: plugin.t("searchMembers"),
                        onChange: e => setMemberQuery(e.target.value),
                        style: {
                            width: "100%",
                            boxSizing: "border-box",
                            marginBottom: "8px",
                            padding: "8px 9px",
                            borderRadius: "6px",
                            border: "1px solid var(--background-modifier-accent)",
                            background: "var(--input-background)",
                            color: "var(--text-normal)"
                        }
                    }),
                    h(
                        "div",
                        {
                            style: {
                                marginBottom: "6px",
                                fontSize: "12px",
                                fontWeight: "600",
                                opacity: "0.8"
                            }
                        },
                        selected
                            ? plugin.t("shownLoaded", {shown: visibleIds.length, loaded: effectiveIds.length})
                            : plugin.t("zeroMembers")
                    ),
                    h(
                        "div",
                        {
                            style: {
                                flex: "1",
                                minHeight: 0,
                                overflowY: "auto",
                                border: "1px solid var(--background-modifier-accent)",
                                borderRadius: "6px",
                                background: "var(--background-secondary)"
                            }
                        },
                        roleState?.status === "loading"
                            ? h(
                                "div",
                                {style: {padding: "14px", opacity: "0.75"}},
                                plugin.t("loadingRoleMembers")
                            )
                            : memberRows.length
                                ? memberRows
                                : h(
                                    "div",
                                    {style: {padding: "14px", opacity: "0.75"}},
                                    selected
                                        ? plugin.t("noLoadedMembersMatch")
                                        : plugin.t("selectRole")
                                )
                    )
                )
            );
        }

        // BetterDiscord confirmation modals are intentionally narrow.
        // RoleSearch needs a two-column browser, so render a dedicated overlay instead.
        try {
            this.customModalCleanup?.();
        } catch {}
        this.customModalCleanup = null;

        const appMount = document.querySelector("#app-mount") || document.body;

        const overlay = document.createElement("div");
        overlay.className = "rolesearch-modal-overlay";
        const roleSearchPalette = this.getThemePalette();

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            zIndex: "10000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            boxSizing: "border-box",
            background: roleSearchPalette.overlay
        });

        const modal = document.createElement("div");
        modal.className = "rolesearch-modal-root";
        Object.assign(modal.style, {
            width: "min(1000px, calc(100vw - 64px))",
            height: "min(720px, calc(100vh - 64px))",
            minWidth: "680px",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "12px",
            background: roleSearchPalette.background,
            color: roleSearchPalette.text,
            boxShadow: roleSearchPalette.mode === "dark"
                ? "0 24px 80px rgba(0, 0, 0, 0.55)"
                : "0 24px 80px rgba(0, 0, 0, 0.25)"
        });

        this.applyRoleSearchTheme(modal);

        const header = document.createElement("div");
        Object.assign(header.style, {
            minHeight: "56px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 18px",
            borderBottom: "1px solid var(--background-modifier-accent)",
            flex: "0 0 auto"
        });

        const title = document.createElement("div");
        title.textContent = `RoleSearch — ${this.guildName}`;
        Object.assign(title.style, {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "18px",
            fontWeight: "700"
        });

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.textContent = "✕";
        closeButton.title = this.t("close");
        Object.assign(closeButton.style, {
            width: "34px",
            height: "34px",
            border: "none",
            borderRadius: "7px",
            cursor: "pointer",
            fontSize: "17px",
            background: "var(--button-secondary-background)",
            color: "var(--button-secondary-text)",
            flex: "0 0 auto"
        });

        const body = document.createElement("div");
        Object.assign(body.style, {
            flex: "1 1 auto",
            minWidth: "0",
            minHeight: "0",
            overflow: "hidden",
            padding: "16px 18px 18px",
            boxSizing: "border-box"
        });

        header.append(title, closeButton);
        modal.append(header, body);
        overlay.appendChild(modal);
        appMount.appendChild(overlay);

        let reactRoot = null;

        const updateTheme = () => {
            const palette = this.applyRoleSearchTheme(modal);
            if (palette) {
                overlay.style.background = palette.overlay;
            }
        };

        const themeObserver = new MutationObserver(updateTheme);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "style"]
        });
        if (document.body) {
            themeObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ["class", "style"]
            });
        }

        const onKeyDown = event => {
            if (event.key === "Escape") closeModal();
        };

        const closeModal = () => {
            document.removeEventListener("keydown", onKeyDown, true);

            try {
                themeObserver.disconnect();
            } catch {}

            try {
                if (reactRoot?.unmount) reactRoot.unmount();
                else if (typeof BdApi.ReactDOM?.unmountComponentAtNode === "function") {
                    BdApi.ReactDOM.unmountComponentAtNode(body);
                }
            } catch (error) {
                console.warn("[RoleSearch] Modal React unmount failed:", error);
            }

            try {
                overlay.remove();
            } catch {}

            if (this.customModalCleanup === closeModal) {
                this.customModalCleanup = null;
            }
        };

        closeButton.addEventListener("click", closeModal);
        overlay.addEventListener("mousedown", event => {
            if (event.target === overlay) closeModal();
        });
        document.addEventListener("keydown", onKeyDown, true);

        this.customModalCleanup = closeModal;

        try {
            if (typeof BdApi.ReactDOM?.createRoot === "function") {
                reactRoot = BdApi.ReactDOM.createRoot(body);
                reactRoot.render(React.createElement(RoleSearchModal));
            } else if (typeof BdApi.ReactDOM?.render === "function") {
                BdApi.ReactDOM.render(React.createElement(RoleSearchModal), body);
            } else {
                throw new Error("BdApi.ReactDOM render API not found");
            }
        } catch (error) {
            console.error("[RoleSearch] Could not render custom modal:", error);
            closeModal();
            BdApi.UI.showToast(this.t("customModalFailed"), {type: "error"});
        }
    }

    getThemePalette() {
        const html = document.documentElement;
        const body = document.body;
        const classText = [
            ...(html?.classList ? [...html.classList] : []),
            ...(body?.classList ? [...body.classList] : [])
        ].join(" ").toLowerCase();

        let isLight = classText.includes("theme-light");
        let isDark = classText.includes("theme-dark");

        const parseRgb = value => {
            if (!value || value === "transparent") return null;

            const match = String(value).match(
                /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/i
            );

            if (!match) return null;

            return [
                Number(match[1]),
                Number(match[2]),
                Number(match[3])
            ];
        };

        const luminance = rgb => {
            if (!rgb) return null;

            const channels = rgb.map(value => {
                const c = value / 255;
                return c <= 0.03928
                    ? c / 12.92
                    : Math.pow((c + 0.055) / 1.055, 2.4);
            });

            return (
                0.2126 * channels[0] +
                0.7152 * channels[1] +
                0.0722 * channels[2]
            );
        };

        // If Discord changes/removes theme-* classes, fall back to its
        // computed background color.
        if (!isLight && !isDark) {
            const candidates = [
                document.querySelector("#app-mount"),
                body,
                html
            ].filter(Boolean);

            for (const node of candidates) {
                const style = getComputedStyle(node);

                const values = [
                    style.getPropertyValue("--background-base-lowest"),
                    style.getPropertyValue("--background-primary"),
                    style.backgroundColor
                ];

                for (const value of values) {
                    const lum = luminance(parseRgb(value.trim()));
                    if (lum === null) continue;

                    isLight = lum > 0.45;
                    isDark = !isLight;
                    break;
                }

                if (isLight || isDark) break;
            }
        }

        // Default to dark because that is Discord's most common mode.
        if (!isLight && !isDark) isDark = true;

        if (isLight) {
            return {
                mode: "light",
                background: "#ffffff",
                secondary: "#f2f3f5",
                secondaryAlt: "#e3e5e8",
                input: "#ebedef",
                text: "#1e1f22",
                muted: "#5c5e66",
                border: "#d4d7dc",
                button: "#e3e5e8",
                buttonText: "#1e1f22",
                overlay: "rgba(0, 0, 0, 0.35)"
            };
        }

        return {
            mode: "dark",
            background: "#313338",
            secondary: "#2b2d31",
            secondaryAlt: "#232428",
            input: "#1e1f22",
            text: "#f2f3f5",
            muted: "#b5bac1",
            border: "#3f4147",
            button: "#4e5058",
            buttonText: "#ffffff",
            overlay: "rgba(0, 0, 0, 0.72)"
        };
    }

    applyRoleSearchTheme(node) {
        if (!node) return;

        const p = this.getThemePalette();

        node.dataset.rolesearchTheme = p.mode;

        // Override Discord variables only inside our modal. This keeps all of
        // the existing UI code theme-aware even if Discord changes its global
        // variable names/values again.
        node.style.setProperty("--text-normal", p.text);
        node.style.setProperty("--text-default", p.text);
        node.style.setProperty("--text-muted", p.muted);
        node.style.setProperty("--header-primary", p.text);
        node.style.setProperty("--header-secondary", p.muted);

        node.style.setProperty("--background-primary", p.background);
        node.style.setProperty("--background-secondary", p.secondary);
        node.style.setProperty("--background-secondary-alt", p.secondaryAlt);
        node.style.setProperty("--background-modifier-selected", p.secondaryAlt);
        node.style.setProperty("--background-modifier-hover", p.secondaryAlt);
        node.style.setProperty("--background-modifier-accent", p.border);

        node.style.setProperty("--input-background", p.input);
        node.style.setProperty("--button-secondary-background", p.button);
        node.style.setProperty("--button-secondary-text", p.buttonText);

        node.style.color = p.text;
        node.style.background = p.background;

        return p;
    }

    // ============================================================
    // UI
    // ============================================================

    el(tag, props = {}, ...children) {
        const node = document.createElement(tag);

        for (const [key, value] of Object.entries(props)) {
            if (key === "style" && value && typeof value === "object") {
                Object.assign(node.style, value);
            } else if (key === "className") {
                node.className = value;
            } else if (key.startsWith("on") && typeof value === "function") {
                node.addEventListener(key.slice(2).toLowerCase(), value);
            } else if (value !== undefined && value !== null) {
                try {
                    node[key] = value;
                } catch {
                    node.setAttribute(key, String(value));
                }
            }
        }

        for (const child of children.flat()) {
            if (child === null || child === undefined) continue;

            node.appendChild(
                child instanceof Node
                    ? child
                    : document.createTextNode(String(child))
            );
        }

        return node;
    }

    button(text, onClick, kind = "normal") {
        const backgrounds = {
            normal: "var(--button-secondary-background)",
            primary: "var(--button-positive-background)",
            danger: "var(--button-danger-background)"
        };

        return this.el("button", {
            textContent: text,
            onClick,
            style: {
                padding: "8px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                background: backgrounds[kind] ?? backgrounds.normal,
                color: "var(--button-secondary-text)",
                fontWeight: "600"
            }
        });
    }

    renderRoleOptions() {
        const select = this.ui.roleSelect;
        if (!select) return;

        const q = this.roleSearchText.trim().toLowerCase();

        const roles = this.getRoles().filter(role => {
            if (!q) return true;
            return String(role.name ?? "").toLowerCase().includes(q);
        });

        select.innerHTML = "";

        for (const role of roles) {
            const total = this.roleCounts.get(String(role.id));
            const cachedDirect =
                this.roleStates.get(String(role.id))?.memberIds?.length ?? 0;

            let suffix = "";
            if (typeof total === "number") {
                suffix = this.t("totalSuffix", {count: total});
            } else if (cachedDirect) {
                suffix = this.t("cachedSuffix", {count: cachedDirect});
            }

            const option = document.createElement("option");
            option.value = String(role.id);
            option.textContent = `${role.name}${suffix}`;

            if (String(role.id) === String(this.selectedRoleId)) {
                option.selected = true;
            }

            select.appendChild(option);
        }

        if (
            this.selectedRoleId &&
            roles.some(role => String(role.id) === String(this.selectedRoleId))
        ) {
            select.value = String(this.selectedRoleId);
        }
    }

    renderMemberList() {
        const list = this.ui.memberList;
        const countEl = this.ui.memberCount;
        const statusEl = this.ui.roleStatus;

        if (!list || !countEl || !statusEl) return;

        statusEl.textContent = this.roleStatusText();

        const ids = this.filteredSelectedRoleIds();
        const effectiveTotal = this.selectedRoleEffectiveIds().length;

        countEl.textContent = this.t("memberCount", {shown: ids.length, loaded: effectiveTotal});

        list.innerHTML = "";

        if (!this.selectedRoleId) {
            list.appendChild(
                this.el("div", {style: {padding: "12px", opacity: "0.75"}}, this.t("selectRole"))
            );
            return;
        }

        if (!ids.length) {
            list.appendChild(
                this.el(
                    "div",
                    {style: {padding: "12px", opacity: "0.75"}},
                    this.t("noMembersLoaded")
                )
            );
            return;
        }

        const maxRender = 500;

        for (const id of ids.slice(0, maxRender)) {
            const m = this.memberDetailsForId(id);
            const display = m.nick || m.globalName || m.username || `Unknown User (${id})`;

            list.appendChild(
                this.el(
                    "div",
                    {
                        style: {
                            padding: "8px 10px",
                            borderBottom: "1px solid var(--background-modifier-accent)",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px"
                        }
                    },
                    this.el(
                        "div",
                        {},
                        this.el(
                            "div",
                            {style: {fontWeight: "600"}},
                            display
                        ),
                        this.el(
                            "div",
                            {style: {opacity: "0.7", fontSize: "12px"}},
                            `${m.username ? "@" + m.username + " • " : ""}${id}`
                        )
                    )
                )
            );
        }

        if (ids.length > maxRender) {
            list.appendChild(
                this.el(
                    "div",
                    {style: {padding: "10px", opacity: "0.7"}},
                    this.t("maxShown", {max: maxRender, total: ids.length})
                )
            );
        }
    }

    refreshUI() {
        if (!this.panel || !document.contains(this.panel)) return;

        if (this.ui.guildLabel) {
            this.ui.guildLabel.textContent = this.guildId
                ? `${this.guildName} (${this.guildId})`
                : this.t("noServerSelected");
        }

        if (this.ui.languageSelect) {
            this.ui.languageSelect.value = this.languageSetting;
        }

        if (this.ui.globalStatus) {
            const counts =
                this.countsState.status === "loading"
                    ? this.t("roleCountsLoading")
                    : this.countsState.status === "loaded"
                        ? this.t("roleCountsLoaded", {count: this.roleCounts.size})
                        : this.countsState.status === "error"
                            ? this.t("roleCountsError", {error: this.countsState.error})
                            : this.t("roleCountsIdle");

            this.ui.globalStatus.textContent =
                `${counts} • ${this.t("cachedDetails", {count: this.memberDetails.size})} ` +
                `• ${this.t("legacyImported", {count: this.legacyImportedIds.size})}`;
        }

        this.renderRoleOptions();
        this.renderMemberList();
    }

    async selectRole(roleId) {
        this.selectedRoleId = roleId ? String(roleId) : null;
        this.memberSearchText = "";

        if (this.ui.memberSearch) this.ui.memberSearch.value = "";

        this.saveCacheSoon();
        this.refreshUI();

        if (!this.selectedRoleId) return;

        // Counts and member IDs can be fetched independently.
        void this.fetchRoleCounts(false);
        await this.fetchRoleMemberIds(this.selectedRoleId, false);

        this.refreshUI();
    }

    getSettingsPanel() {
        const selectedGuild = this.getSelectedGuildId();
        if (String(selectedGuild ?? "") !== String(this.guildId ?? "")) {
            this.switchToCurrentGuild();
        }

        const root = this.el("div", {
            style: {
                padding: "16px",
                color: "var(--text-normal)"
            }
        });

        this.panel = root;

        const guildLabel = this.el("div", {
            style: {
                marginBottom: "8px",
                fontWeight: "600"
            }
        });

        const globalStatus = this.el("div", {
            style: {
                marginBottom: "12px",
                padding: "10px",
                borderRadius: "6px",
                background: "var(--background-secondary)"
            }
        });

        const languageLabel = this.el(
            "div",
            {
                style: {
                    marginBottom: "6px",
                    fontWeight: "600"
                }
            },
            this.t("settingsLanguage")
        );

        const languageSelect = this.el("select", {
            onChange: event => {
                this.setLanguage(event.target.value);
            },
            style: {
                width: "100%",
                maxWidth: "360px",
                boxSizing: "border-box",
                padding: "8px 10px",
                marginBottom: "6px",
                border: "1px solid var(--background-modifier-accent)",
                borderRadius: "6px",
                background: "var(--background-secondary)",
                color: "var(--text-normal)"
            }
        });

        for (const [value, name] of Object.entries(ROLESEARCH_LANGUAGE_NAMES)) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent =
                value === "auto"
                    ? `${name} → ${ROLESEARCH_LANGUAGE_NAMES[this.normalizeLanguage(this.getDiscordLocale())] ?? "English"}`
                    : name;
            option.selected = value === this.languageSetting;
            languageSelect.appendChild(option);
        }

        const languageHint = this.el(
            "div",
            {
                style: {
                    marginBottom: "14px",
                    opacity: "0.72",
                    fontSize: "12px",
                    lineHeight: "1.4"
                }
            },
            this.t("settingsLanguageHint")
        );

        const note = this.el(
            "div",
            {
                style: {
                    marginBottom: "14px",
                    padding: "10px",
                    borderRadius: "6px",
                    background: "var(--background-secondary-alt)",
                    fontSize: "12px",
                    lineHeight: "1.45"
                }
            },
            this.t("note")
        );

        const refreshCountsButton = this.button(
            this.t("refreshRoleCounts"),
            () => void this.fetchRoleCounts(true),
            "normal"
        );

        const refreshRoleButton = this.button(
            this.t("refreshSelectedRole"),
            () => {
                if (this.selectedRoleId) {
                    void this.fetchRoleMemberIds(this.selectedRoleId, true);
                }
            },
            "primary"
        );

        const switchServerButton = this.button(
            this.t("useCurrentServer"),
            () => this.switchToCurrentGuild(),
            "normal"
        );

        const clearCacheButton = this.button(
            this.t("clearCache"),
            () => this.clearV2Cache(),
            "danger"
        );

        const controls = this.el(
            "div",
            {
                style: {
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "18px"
                }
            },
            refreshCountsButton,
            refreshRoleButton,
            switchServerButton,
            clearCacheButton
        );

        const roleSearch = this.el("input", {
            type: "text",
            placeholder: this.t("searchRoleName"),
            value: this.roleSearchText,
            onInput: event => {
                this.roleSearchText = event.target.value;
                this.renderRoleOptions();
            },
            style: {
                width: "100%",
                boxSizing: "border-box",
                padding: "9px 10px",
                marginBottom: "8px",
                border: "1px solid var(--background-modifier-accent)",
                borderRadius: "6px",
                background: "var(--input-background)",
                color: "var(--text-normal)"
            }
        });

        const roleSelect = this.el("select", {
            size: 10,
            onChange: event => {
                void this.selectRole(event.target.value || null);
            },
            style: {
                width: "100%",
                minHeight: "220px",
                marginBottom: "12px",
                borderRadius: "6px",
                background: "var(--background-secondary)",
                color: "var(--text-normal)",
                border: "1px solid var(--background-modifier-accent)"
            }
        });

        const roleStatus = this.el("div", {
            style: {
                marginBottom: "14px",
                padding: "10px",
                borderRadius: "6px",
                background: "var(--background-secondary)"
            }
        });

        const memberSearch = this.el("input", {
            type: "text",
            placeholder: this.t("searchLoadedMembers"),
            value: this.memberSearchText,
            onInput: event => {
                this.memberSearchText = event.target.value;
                this.renderMemberList();
            },
            style: {
                width: "100%",
                boxSizing: "border-box",
                padding: "9px 10px",
                marginBottom: "8px",
                border: "1px solid var(--background-modifier-accent)",
                borderRadius: "6px",
                background: "var(--input-background)",
                color: "var(--text-normal)"
            }
        });

        const memberCount = this.el("div", {
            style: {
                marginBottom: "8px",
                fontWeight: "600"
            }
        });

        const memberList = this.el("div", {
            style: {
                maxHeight: "460px",
                overflowY: "auto",
                border: "1px solid var(--background-modifier-accent)",
                borderRadius: "6px",
                background: "var(--background-secondary)"
            }
        });

        root.append(
            this.el("h2", {style: {marginTop: "0"}}, "RoleSearch"),
            this.el("h3", {}, this.t("server")),
            guildLabel,
            globalStatus,
            languageLabel,
            languageSelect,
            languageHint,
            note,
            controls,
            this.el("h3", {}, this.t("role")),
            roleSearch,
            roleSelect,
            roleStatus,
            this.el("h3", {}, this.t("membersWithSelectedRole")),
            memberSearch,
            memberCount,
            memberList
        );

        this.ui = {
            guildLabel,
            globalStatus,
            languageSelect,
            roleSelect,
            roleStatus,
            memberSearch,
            memberCount,
            memberList
        };

        this.refreshUI();

        if (this.refreshInterval) clearInterval(this.refreshInterval);

        this.refreshInterval = setInterval(() => {
            if (!document.contains(root)) {
                clearInterval(this.refreshInterval);
                this.refreshInterval = null;
                return;
            }
            this.refreshUI();
        }, 1000);

        return root;
    }

    // ============================================================
    // LIFECYCLE
    // ============================================================

    start() {
        this.loadPluginSettings();
        this.dispatcher = this.findDispatcher();
        this.rest = this.findRestAPI();
        this.snowflakeUtils = this.findSnowflakeUtils();
        this.userProfileActions = this.findUserProfileActions();

        if (!this.dispatcher) {
            console.error("[RoleSearch] FluxDispatcher not found.");
            BdApi.UI.showToast(
                "RoleSearch: FluxDispatcher not found.",
                {type: "error"}
            );
        }

        if (!this.rest?.get) {
            console.error("[RoleSearch] Discord RestAPI module not found.");
            BdApi.UI.showToast(
                "RoleSearch: Discord RestAPI not found.",
                {type: "error"}
            );
        }

        try {
            this.dispatcher?.subscribe?.("GUILD_MEMBERS_CHUNK", this.onChunk);
            this.dispatcher?.subscribe?.("GUILD_MEMBERS_CHUNK_BATCH", this.onChunkBatch);
        } catch (error) {
            console.error("[RoleSearch] Could not subscribe to member chunks:", error);
        }

        this.switchToCurrentGuild();
        this.patchGuildContextMenu();

        console.log("[RoleSearch] v2.4.0 loaded.");
    }

    stop() {
        this.currentRoleRequestToken++;

        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
            this.saveTimer = null;
        }

        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }

        this.saveCache();

        try {
            this.dispatcher?.unsubscribe?.("GUILD_MEMBERS_CHUNK", this.onChunk);
            this.dispatcher?.unsubscribe?.("GUILD_MEMBERS_CHUNK_BATCH", this.onChunkBatch);
        } catch {}

        try {
            this.contextMenuUnpatch?.();
        } catch {}
        this.contextMenuUnpatch = null;

        try {
            this.customModalCleanup?.();
        } catch {}
        this.customModalCleanup = null;

        this.panel = null;
        this.ui = {};

        console.log("[RoleSearch] stopped.");
    }
};
