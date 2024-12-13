let isRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startConnecting") {
        isRunning = true;
        console.log("Automation started.");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "startConnecting" });
        });

        sendResponse({ status: "Automation started" });
    } else if (message.action === "stopConnecting") {
        isRunning = false;
        console.log("Automation stopped.");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stopConnecting" });
        });

        sendResponse({ status: "Automation stopped" });
    }
});
