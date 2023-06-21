(async function() {
    const folderPath = (path) => path.substring(0, path.length - path.split('/').pop().length);
    const scriptPath = folderPath((new URL(document.currentScript.src)).pathname);
    if (!scriptPath.endsWith('/')) scriptPath+='/';
    //console.log(scriptPath);
    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] == 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath+file;
                }
            }();
            script.onload = resolve;
            document.head.appendChild(script);
        })
    }
    function loadStyle(file) {
        return new Promise(function(resolve, reject) {
            let css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] == 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath+file;
                }
            }();
            css.onload = resolve;
            document.head.appendChild(css);
        })
    }
    
    if (('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX) || true) {
        await loadScript('emulator.js');
        await loadStyle('css/main.css');
    }
    const config = {};
    config.gameUrl = EJS_gameUrl;
    config.dataPath = scriptPath;
    'undefined' != typeof EJS_core && (config.system = EJS_core);
    
    new EmulatorJS(EJS_player, config);
    
})();