let connectButtons = [];
let isRunning = false;

function getConnectButtons() {
    return Array.from(
        document.querySelectorAll(
            '.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view'
        )
    ).filter((button) => {
        const buttonText = button.textContent.trim().toLowerCase();
        return buttonText === "connect" || buttonText === "follow";
    });
}

function clickButtonsSequentially(index = 0) {
    if (!isRunning || index >= connectButtons.length) {
        console.log("Automation stopped or completed.");
        chrome.runtime.sendMessage({ action: "processComplete"})
        return;
    }

    const button = connectButtons[index];
    button.click();
    console.log(`Clicked button ${index + 1}`);

    chrome.runtime.sendMessage({
        action: "updateProgress",
        progress: index + 1,
    });

    setTimeout(() => {
        let closeButton = document.querySelector(
            '.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1'
        );
        if (closeButton) {
            closeButton.click();
            console.log(`Clicked close button after button ${index + 1}`);
        }

        clickButtonsSequentially(index + 1);
    }, getRandomDelay(2000, 6000));
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "startConnecting") {
        console.log("Starting automation...");
        isRunning = true;
        connectButtons = getConnectButtons();
        clickButtonsSequentially();

    } else if (message.action === "stopConnecting") {
        console.log("Stopping automation...");
        isRunning = false;
    }
});
