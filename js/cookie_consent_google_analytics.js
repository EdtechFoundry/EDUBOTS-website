var gTagID = 'UA-65878811-4';

function injectAnalyticsTracking() {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gTagID;
    script.onload = function () {
        var inLineCode = document.createElement('script');
        inLineCode.type = 'text/javascript';
        inLineCode.innerHTML = "window.dataLayer = window.dataLayer || [];" +
            "function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" + gTagID + "');";
        body.appendChild(inLineCode);
    };
    body.appendChild(script);
}

window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#f5f5f5",
                "text": "#404040"
            },
            "button": {

                "background": "transparent",
                "text": "#6BC0A3",
                "border": "#6BC0A3"
            }
        },
        "theme": "edgeless",
        "position": "bottom-left",
        "type": "opt-in",
        "content": {
            "href": "https://www.differ.chat/cookie-policy"
        },
        onInitialise: function (status) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type === 'opt-in' && didConsent) {
                // enable tracking
                injectAnalyticsTracking();
                console.log("Analytics enabled.");
            }
        },
        onStatusChange: function (status, chosenBefore) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type === 'opt-in' && didConsent) {
                // enable tracking
                window['ga-disable-' + gTagID] = false;
                injectAnalyticsTracking();
                console.log("Analytics enabled.");
            }
        },
        onRevokeChoice: function () {
            var type = this.options.type;
            if (type === 'opt-in') {
                // disable tracking
                window['ga-disable-' + gTagID] = true;
                console.log("Analytics disabled.");
            }
        }
    }
);
