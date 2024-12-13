let isRunning = false;

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");
    const progressNumber = document.getElementById("progress-number");
    
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "updateProgress") {
            progressNumber.textContent = message.progress;
        } else if (message.action === "processComplete") {
            isRunning = false;
            toggleButton.textContent = "START CONNECTING";
            toggleButton.classList.remove("stop");
            console.log("Button reset");
        }
    }); 

    toggleButton.addEventListener("click", () => {
        isRunning = !isRunning;
        toggleButton.textContent = isRunning ? "STOP CONNECTING" : "START CONNECTING";

        if (isRunning) {
            toggleButton.classList.add("stop");
        } else{
            toggleButton.classList.remove("stop");
        }
    
        chrome.runtime.sendMessage(
            { action: isRunning ? "startConnecting" : "stopConnecting" },
            (response) => {
                console.log(response.status);
            }
        );
    });
});
