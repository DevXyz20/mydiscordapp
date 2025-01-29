(async function() {
    const proxySources = [
        "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
        "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt",
        "https://api.proxyscrape.com/?request=displayproxies&proxytype=socks5&timeout=5"
    ];

    document.getElementById("generateCheck").addEventListener("click", async () => {
        let proxyType = document.getElementById("proxyType").value;
        let proxies = await fetchProxies(proxyType);
        let checkedProxies = await checkProxies(proxies);

        displayProxies(checkedProxies);
    });

    async function fetchProxies(type) {
        let proxies = [];

        for (let url of proxySources) {
            try {
                let response = await fetch(url);
                let text = await response.text();
                proxies.push(...text.split("\n").filter(p => p.includes(".")));
            } catch (error) {
                console.error("Error fetching proxies:", error);
            }
        }

        return proxies.slice(0, 100);
    }

    async function checkProxies(proxies) {
        let working = [];
        let failed = [];

        await Promise.all(proxies.map(async (proxy) => {
            try {
                let response = await fetch(`https://api.ipify.org?format=json`, {
                    method: "GET",
                    proxy: proxy,
                    timeout: 5000
                });

                if (response.ok) {
                    working.push(proxy);
                } else {
                    failed.push(proxy);
                }
            } catch {
                failed.push(proxy);
            }
        }));

        return { working, failed };
    }

    function displayProxies({ working, failed }) {
        document.getElementById("workingList").value = working.join("\n");
        document.getElementById("failedList").value = failed.join("\n");
    }

    document.getElementById("copyWorking").addEventListener("click", () => {
        let proxies = document.getElementById("workingList").value;
        navigator.clipboard.writeText(proxies).then(() => alert("Copied!"));
    });
})();
