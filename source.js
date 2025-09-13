// ==UserScript==
// @name WorkInk Crack
// @namespace http://tampermonkey.net/
// @version 1.0
// @description No Wait No Install Extension Automatic
// @author Ducknovis
// @match *://work.ink/*
// @match *://workink.net/*
// @icon https://tr.rbxcdn.com/180DAY-17a64dbcdfded233559a0fd9572d70a2/150/150/Decal/Webp/noFilter
// @run-at document-end
// @grant none
// ==/UserScript==


// source opened pls cre if remake
(() => {
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    const originalWindowOpen = window.open;

    window.setTimeout = (callback, delay) => {
        if (delay > 0) delay = 1;
        return originalSetTimeout(callback, delay);
    };

    window.setInterval = (callback, interval) => {
        if (interval > 0) interval = 1;
        return originalSetInterval(callback, interval);
    };

    let totalRetries = 0;
    let isCancelled = false;

    function hideUI() {
        try {
            overlay.style.opacity = '0';
            closeButton.style.opacity = '0';
            clearInterval(loadingAnimationInterval);
            originalSetTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
                if (closeButton && closeButton.parentNode) {
                    closeButton.parentNode.removeChild(closeButton);
                }
            }, 500);
        } catch (error) {}
        isCancelled = true;
        try {
            window.open = originalWindowOpen;
        } catch (error) {}
    }

    function clickElementsInSequence(callback) {
        const originalWindowOpen = window.open;
        try {
            window.open = () => {};
        } catch (error) {
            console.warn("Could not override window.open", error);
        }
        const elements = Array.from(document.querySelectorAll(".stepcont.svelte-ck84f7 *")); //gay
        let currentIndex = 0;

        function processNextElement() {
            if (isCancelled) {
                try {
                    window.open = originalWindowOpen;
                } catch (error) {}
                return;
            }
            if (currentIndex >= elements.length) {
                const greenButton = document.querySelector(".w-full.h-14.px-6.text-lg.font-semibold.rounded-full.transition-all.duration-200.flex.items-center.justify-center.space-x-3.bg-green-600.text-white.hover\\:bg-green-700.shadow-lg.hover\\:shadow-xl");
                if (greenButton) {
                    try {
                        greenButton.click();
                        console.log("Clicked green button after batch clicks");
                    } catch (error) {
                        console.warn("Error clicking green button", error);
                    }
                } else {
                    console.warn("Green button not found after batch clicks");
                }
                const accessOffersButton = document.querySelector(".w-full.h-14.px-6.text-lg.font-semibold");
                if (accessOffersButton) {
                    try {
                        accessOffersButton.click();
                        console.log("Clicked #access-offers button after batch clicks");
                    } catch (error) {
                        console.warn("Error clicking #access-offers button", error);
                    }
                } else {
                    console.warn("No button with id 'access-offers' found");
                }
                try {
                    window.open = originalWindowOpen;
                } catch (error) {}
                console.log("...");
                if (callback) {
                    callback();
                }
                return;
            }
            const element = elements[currentIndex];
            try {
                if (typeof element.click === "function") {
                    console.log(`Clicking element (${currentIndex + 1}/${elements.length}):`, element);
                    element.click();
                }
            } catch (error) {
                console.warn("Error clicking element", error);
            }
            currentIndex++;
            originalSetTimeout(processNextElement, 1);
        }
        processNextElement();
    }

    function attemptClick(selector, delay, callback, maxRetries = 10) {
        let attemptCount = 0;
        function tryClick() {
            if (isCancelled) {
                return;
            }
            const element = document.querySelector(selector);
            if (element) {
                try {
                    element.click();
                    console.log(`Clicked: ${selector}`);
                } catch (error) {
                    console.warn(`Error clicking ${selector}`, error);
                }
                if (callback) {
                    callback();
                }
            } else {
                if (selector !== "DO NOTHING") {
                    attemptCount++;
                    totalRetries++;
                    console.log(`Not found: ${selector}, retrying in ${delay}ms (attempt ${attemptCount}) - totalRetries=${totalRetries}`);
                    if (totalRetries > 10) {
                        statusText.textContent = "Too many retries — please refresh or contact support.";
                        console.warn("Exceeded total retry limit, stopping retries.");
                        closeButton.style.display = "block";
                        closeButton.style.opacity = '1';
                        try {
                            window.open = originalWindowOpen;
                        } catch (error) {}
                        return;
                    }
                    if (attemptCount >= maxRetries) {
                        statusText.textContent = "This is taking longer than usual, please contact Ducknovis on Discord if this error continues.";
                        console.warn(`Skipping ${selector} after ${attemptCount} failed attempts`);
                        if (callback) {
                            callback();
                        }
                        return;
                    }
                    originalSetTimeout(tryClick, delay);
                }
            }
        }
        originalSetTimeout(tryClick, delay);
    }

    const verificationPopup = document.createElement("div");
    const verificationStyles = {
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        zIndex: "2147483647",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
        textAlign: "center",
        maxWidth: "300px"
    };
    Object.assign(verificationPopup.style, verificationStyles);
    verificationPopup.innerHTML = `
        <p style="margin: 0 0 15px;">Please find and verify Cloudflare to proceed.</p>
        <button id="verifyDone" style="background: #ff0000; color: #fff; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-weight: 600;">Done</button>
    `;
    document.body.appendChild(verificationPopup);

    verificationPopup.querySelector("#verifyDone").addEventListener("click", () => {
        verificationPopup.remove();
        showUIAndRun();
    });

    const overlay = document.createElement("div");
    const overlayStyles = {
        position: "fixed",
        inset: '0',
        width: "100%",
        height: "100%",
        background: "#000000",
        zIndex: "2147483646",
        margin: '0',
        padding: '0',
        display: "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        opacity: '0',
        transition: "opacity 0.5s ease-in-out"
    };
    Object.assign(overlay.style, overlayStyles);

    const closeButton = document.createElement("button");
    closeButton.textContent = '✕';
    const closeButtonStyles = {
        position: "fixed",
        top: "12px",
        right: "12px",
        background: "rgba(0,0,0,0.65)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#ffffff",
        fontSize: "20px",
        lineHeight: '1',
        cursor: "pointer",
        display: "none",
        zIndex: "2147483647",
        padding: "6px 10px",
        borderRadius: "6px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        opacity: '1',
        transition: "opacity 0.25s ease"
    };
    Object.assign(closeButton.style, closeButtonStyles);
    closeButton.title = "Close";
    closeButton.addEventListener("click", () => {
        console.log("User clicked close button");
        hideUI();
    });

    const title = document.createElement('h1');
    const titleStyles = {
        color: "#ff0000",
        fontSize: "5vw",
        fontWeight: "900",
        fontFamily: "monospace, system-ui, Arial, sans-serif",
        margin: '0',
        textShadow: "0 0 6px #ff0000, 0 0 10px #ff0000",
        whiteSpace: "pre",
        minWidth: "12ch",
        textAlign: "center"
    };
    Object.assign(title.style, titleStyles);

    const statusText = document.createElement("div");
    const statusTextStyles = {
        color: "#ffffff",
        fontSize: "2vw",
        fontWeight: "600",
        fontFamily: "system-ui, Arial, sans-serif",
        marginTop: "0.5em",
        textShadow: "0 0 3px #ff0000"
    };
    Object.assign(statusText.style, statusTextStyles);

    const buttonContainer = document.createElement("div");
    const buttonContainerStyles = {
        marginTop: "2em",
        pointerEvents: "auto"
    };
    Object.assign(buttonContainer.style, buttonContainerStyles);

    const destinationButton = document.createElement("button");
    destinationButton.textContent = "Go to Destination";
    const destinationButtonStyles = {
        fontSize: "1.8vw",
        padding: "0.5em 1.5em",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#ff0000",
        color: "#ffffff",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 0 8px #ff0000",
        transition: "background-color 0.2s ease"
    };
    Object.assign(destinationButton.style, destinationButtonStyles);
    destinationButton.addEventListener("mouseenter", () => {
        destinationButton.style.backgroundColor = "#cc0000";
    });
    destinationButton.addEventListener("mouseleave", () => {
        destinationButton.style.backgroundColor = "#ff0000";
    });
    destinationButton.style.display = "none";
    buttonContainer.appendChild(destinationButton);

    const progressBarContainer = document.createElement("div");
    const progressBarContainerStyles = {
        width: "40vw",
        maxWidth: "400px",
        height: "8px",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderRadius: "4px",
        marginTop: "2em",
        overflow: "hidden"
    };
    Object.assign(progressBarContainer.style, progressBarContainerStyles);

    const progressBar = document.createElement("div");
    const progressBarStyles = {
        width: '0%',
        height: "100%",
        backgroundColor: "#ff0000",
        borderRadius: "4px",
        transition: "width 0.3s ease"
    };
    Object.assign(progressBar.style, progressBarStyles);
    progressBarContainer.appendChild(progressBar);

    const attribution = document.createElement("div");
    attribution.innerHTML = `Script made by <strong>Ducknovis</strong>, free is truth pls join <a href="https://discord.gg/fK3BZWtxCA" target="_blank" rel="noopener noreferrer" style="color:#ff0000; text-decoration: underline;">Discord</a>.`;
    const attributionStyles = {
        color: "#ffffff",
        fontSize: "1.5vw",
        fontWeight: "600",
        fontFamily: "system-ui, Arial, sans-serif",
        marginTop: "3em",
        textAlign: "center",
        maxWidth: "80vw",
        userSelect: "text"
    };
    Object.assign(attribution.style, attributionStyles);

    overlay.appendChild(title);
    overlay.appendChild(statusText);
    overlay.appendChild(buttonContainer);
    overlay.appendChild(progressBarContainer);
    overlay.appendChild(attribution);

    const confirmationPrompt = document.createElement("div");
    const confirmationStyles = {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        zIndex: "2147483648",
        display: "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif"
    };
    Object.assign(confirmationPrompt.style, confirmationStyles);
    confirmationPrompt.innerHTML = `
        <div style="background: #222; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0 0 20px; color: #ff0000;">Are you Bypassing Volcano?</h2>
            <button id="confirmYes" style="background: #ff0000; color: #fff; border: none; padding: 10px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">Yes</button>
            <button id="confirmNo" style="background: #ff0000; color: #fff; border: none; padding: 10px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">No</button>
        </div>
    `;
    document.body.appendChild(confirmationPrompt);

    const volcanoBypassUI = document.createElement("div");
    const volcanoStyles = {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        zIndex: "2147483648",
        display: "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif"
    };
    Object.assign(volcanoBypassUI.style, volcanoStyles);
    volcanoBypassUI.innerHTML = `
        <div style="background: #222; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0 0 20px; color: #ff0000;">Cracking Volcano</h2>
            <p style="margin: 0; color: #ffffff;">Please wait 9 seconds to continue...</p>
        </div>
    `;
    document.body.appendChild(volcanoBypassUI);
    function executeDestinationLogic() {
        destinationButton.disabled = true;
        destinationButton.textContent = "Processing...";
        const accessOffersButton = document.querySelector("#access-offers");
        if (accessOffersButton) {
            accessOffersButton.click();
        }
        statusText.textContent = "Completed!";
        progressBar.style.width = "100%";
        destinationButton.style.display = "none";
        buttonContainer.style.pointerEvents = "none";
        console.log("Showing close button");
        closeButton.style.display = "block";
        closeButton.style.opacity = '1';
    }

    confirmationPrompt.querySelector("#confirmNo").addEventListener("click", () => {
        confirmationPrompt.style.display = "none";
        overlay.style.display = "flex";
        overlay.style.opacity = '1';
        executeDestinationLogic();
    });

    confirmationPrompt.querySelector("#confirmYes").addEventListener("click", () => {
        confirmationPrompt.style.display = "none";
        volcanoBypassUI.style.display = "flex";
        volcanoBypassUI.style.opacity = '1';
        originalSetTimeout(() => {
            volcanoBypassUI.style.display = "none";
            overlay.style.display = "flex";
            overlay.style.opacity = '1';
            executeDestinationLogic();
        }, 9000);
    });

    let dotCount = 0;
    function updateLoadingText(count) {
        const dots = '.'.repeat(count);
        const spaces = " ".repeat(3 - count);
        return "Bypassing" + dots + spaces;
    }
    title.textContent = updateLoadingText(dotCount);
    let loadingAnimationInterval;

    async function handleRedirect() {
        function generateFingerprint() {
            function createUUID() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
                    const random = Math.random() * 16 | 0;
                    const value = char === 'x' ? random : (random & 3 | 8);
                    return value.toString(16);
                });
            }
            return "pdfeditor-" + createUUID();
        }

        window.chrome = window.chrome || {};
        chrome.runtime = chrome.runtime || {};
        const originalSendMessage = chrome.runtime.sendMessage;
        chrome.runtime.sendMessage = function (...args) {
            console.log("[HOOKED] sendMessage called:", args);
            if (typeof args[0] === "string" && args[1]?.message === "wk_installed") {
                console.log("[HOOKED] Spoofing wk_installed for", args[0]);
                args[2]?.({ success: true });
                return;
            }
            if (args[0]?.type === "getFingerprint") {
                console.log("[HOOKED] Spoofing getFingerprint");
                args[1]?.(generateFingerprint());
                return;
            }
            if (args[0]?.type === "getAdblockerStatus") {
                console.log("[HOOKED] Spoofing getAdblockerStatus");
                args[1]?.(false);
                return;
            }
            if (originalSendMessage) {
                return originalSendMessage.apply(this, args);
            }
            console.warn("[HOOKED] No original sendMessage to call");
        };

        const currentUrl = window.location.href;
        const encodedUrl = btoa(currentUrl);
        let fingerprint = localStorage.getItem("pdfeditor_fingerprint");
        if (!fingerprint) {
            fingerprint = generateFingerprint();
            localStorage.setItem("pdfeditor_fingerprint", fingerprint);
        }
        const redirectUrl = `https://pass.work.ink/redirect/${encodeURIComponent(encodedUrl)}?fingerprint=${encodeURIComponent(fingerprint)}&adblockerInstalled=0&base64=1&json=1`;
        try {
            console.log("[Bypass] Fetching redirect from:", redirectUrl);
            const response = await fetch(redirectUrl, {
                method: "GET",
                credentials: "omit"
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("[Bypass] Response:", data);
            if (!data.noRedirect && data.to) {
                console.log("[Bypass] Redirecting to:", data.to);
                window.location.href = data.to;
            } else {
                console.log("[Bypass] No redirect needed:", data);
            }
        } catch (error) {
            console.error("[Bypass] Fetch error:", error);
        }
    }

    const clickSequence = [
        { selector: ".large.accessBtn.pos-relative.svelte-s4fbka", delay: 250 },
        { selector: ".w-full.bg-gray-100.hover\\:bg-gray-200.active\\:bg-gray-300.text-gray-700.py-4.rounded-full.font-medium.transition-colors", delay: 200 },
        { selector: ".large.accessBtn.pos-relative.svelte-s4fbka", delay: 200 },
        { selector: "DO NOTHING", delay: 0 },
        { selector: ".w-full.h-14.px-6.text-lg.font-semibold.rounded-full.transition-all.duration-200.flex.items-center.justify-center.space-x-3.bg-green-600.text-white.hover\\:bg-green-700.shadow-lg.hover\\:shadow-xl", delay: 300 },
        { selector: ".interestedBtn.button", delay: 250 },
        { selector: "button.large.accessBtn", delay: 500 }
    ];

    function showUIAndRun() {
        document.body.appendChild(overlay);
        document.body.appendChild(closeButton);
        requestAnimationFrame(() => {
            overlay.style.display = "flex";
            overlay.style.opacity = '1';
        });
        loadingAnimationInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            title.textContent = updateLoadingText(dotCount);
        }, 1000);
        statusText.textContent = "on step: 0";
        progressBar.style.width = '0%';
        runClickSequence(0);
    }

    function runClickSequence(stepIndex) {
        if (isCancelled) {
            return;
        }
        if (stepIndex >= clickSequence.length) {
            statusText.textContent = "Completed!";
            progressBar.style.width = "100%";
            destinationButton.style.display = "none";
            buttonContainer.style.pointerEvents = "none";
            console.log("Chain complete.");
            console.log("Showing close button");
            closeButton.style.display = "block";
            closeButton.style.opacity = '1';
            return;
        }
        const currentStep = clickSequence[stepIndex];
        statusText.textContent = `on step: ${stepIndex}`;
        progressBar.style.width = (stepIndex / (clickSequence.length - 1) * 100) + '%';
        if (stepIndex === 3) {
            handleRedirect().then(() => {
                if (isCancelled) {
                    return;
                }
                if (currentStep.selector === "DO NOTHING") {
                    runClickSequence(stepIndex + 1);
                } else {
                    attemptClick(currentStep.selector, currentStep.delay, () => {
                        runClickSequence(stepIndex + 1);
                    });
                }
            }).catch(error => {
                console.error("Error in redirect:", error);
                if (isCancelled) {
                    return;
                }
                if (currentStep.selector === "DO NOTHING") {
                    runClickSequence(stepIndex + 1);
                } else {
                    attemptClick(currentStep.selector, currentStep.delay, () => {
                        runClickSequence(stepIndex + 1);
                    });
                }
            });
            return;
        }
        if (stepIndex === 4) {
            console.log("Green button not found — switching to .stepcont fallback clicker.");
            clickElementsInSequence(() => {
                if (isCancelled) {
                    return;
                }
                runClickSequence(stepIndex + 1);
            });
            return;
        }
        if (stepIndex === clickSequence.length - 1) {
            destinationButton.style.display = "inline-block";
            destinationButton.disabled = false;
            buttonContainer.style.pointerEvents = "auto";
            destinationButton.onclick = () => {
                destinationButton.style.display = "none";
                confirmationPrompt.style.display = "flex";
                confirmationPrompt.style.opacity = '1';
            };
            return;
        }
        attemptClick(currentStep.selector, currentStep.delay, () => {
            runClickSequence(stepIndex + 1);
        });
    }
})();
