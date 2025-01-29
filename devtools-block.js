(function() {
    function detectDevTools() {
        let element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                document.body.innerHTML = "<h1 style='color:red; text-align:center;'>DEVICE # : DEV TOOLS SECURITY</h1><p style='color:white; text-align:center;'>If you see this message, you opened DevTools. Please close it.</p>";
            }
        });

        console.log("%c", element);
    }

    setInterval(detectDevTools, 1000);

    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && (event.key === "u" || event.key === "U" || event.key === "s" || event.key === "S")) {
            event.preventDefault();
        }
    });

    document.addEventListener("contextmenu", (event) => event.preventDefault());

    let devtoolsOpen = false;
    const devtoolsCheck = () => {
        const start = new Date();
        debugger;
        const end = new Date();
        if (end - start > 100) {
            devtoolsOpen = true;
            document.body.innerHTML = "<h1 style='color:red; text-align:center;'>DEVICE # : DEV TOOLS SECURITY</h1><p style='color:white; text-align:center;'>If you see this message, you opened DevTools. Please close it.</p>";
        }
    };

    setInterval(devtoolsCheck, 500);
})();
