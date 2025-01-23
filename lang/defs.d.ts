export default interface LangValues {
    plugin_browser: {
        values: typeof import("./values/base/plugin_browser.json");
        fillers: {
            "toast.plugin.update.success": { plugin: string };
            "toast.plugin.update.fail": { plugin: string };
            "toast.plugin.delete.success": { plugin: string };
            "toast.plugin.delete.fail": { plugin: string };
            "toast.plugin.install.success": { plugin: string };
            "toast.plugin.install.fail": { plugin: string };
        };
    };
    themes_plus: {
        values: typeof import("./values/base/themes_plus.json");
        fillers: {
            "settings.header": { active: boolean };
            "alert.downloadpack.body": { iconpack: string; space: string };
        };
    };
    userpfp: {
        values: typeof import("./values/base/userpfp.json");
        fillers: null;
    };
}
