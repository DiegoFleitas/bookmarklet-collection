javascript: (function () {
    /**
     * - This script was tested on the web client.
     * - Developer Mode MUST be enabled on the web client for the script to work.
     * https://discord.com/developers/docs/game-sdk/store#application-test-mode
     * - The Authorization header MUST be set with a valid value at L#130
     * you can copy the Authorization header from any request done to the discord.com/api endpoint by the client itself
     */
    try {
        // attempt to mitigate sending too many sentry events to discord lol
        const proxy = () => console.log(arguments)
        if (window.DiscordSentry) window.DiscordSentry = {Severity: proxy, withScope: proxy, captureException: proxy, captureMessage: proxy, addBreadcrumb: proxy};
        if (window.__SENTRY__) window.__SENTRY__ = {};

        // our way to snatch discord-ids
        var Spy = (function () {
            function Spy() {
            }
            Spy.observe = function (targetNode) {
                Spy.observer.observe(targetNode, Spy.config);
            };
            Spy.disconnect = function () {
                Spy.observer.disconnect();
            };
            Spy["break"] = function (mutationsList, observer) {
                // snatch the user-id from the textarea thats about to be written to the OS clipboard
                if (mutationsList.length
                    && mutationsList[0].addedNodes.length
                    && mutationsList[0].addedNodes[0].nodeName == "TEXTAREA")
                {
                    let textArea = mutationsList[0].addedNodes[0];
                    // console.log('id', textArea.value);
                    requestDiscordProfile(textArea.value);
                }
            };
            Spy.config = {subtree: true, attributes: false, childList: true};
            Spy.observer = new MutationObserver(Spy["break"]);
            return Spy;
        }());
        var usernames = [];
        var membersList = $x('//aside[starts-with(@class,"membersWrap")]/div')[0];
        if (membersList !== null) {
            Spy.observe(document);
            swipeEveryone();
        } else {
            alert('This script is broken.');
        }

        async function swipeEveryone() {
            loadModal();
            membersList.scrollTop = 0;
            var scrollRemaining = true;
            var lastPos = 0;
            while (scrollRemaining) {
                await sleep(2000);
                var foundNewUsers = getUsername();
                if (!foundNewUsers) {
                    membersList.scrollTop += membersList.clientHeight;
                    if (lastPos == membersList.scrollTop) {
                        scrollRemaining = false;
                    }
                    lastPos = membersList.scrollTop;
                }
            }
            document.getElementsByClassName("everyoneswiper-content")[0].innerHTML = 'Processing...';
            let code = "<code>" + JSON.stringify(usernames) + "</code>";
            document.getElementsByClassName("everyoneswiper-content")[0].innerHTML = code;
        }

        async function sleep(ms) {
            return await new Promise(resolve => setTimeout(resolve, ms));
        }

        function dispatchRightClick(element) {
            var rightClick = element.ownerDocument.createEvent('MouseEvents');
            rightClick.initMouseEvent('contextmenu', true, true,
                element.ownerDocument.defaultView, 1, 0, 0, 0, 0, false,
                false, false, false, 2, null);
            return !element.dispatchEvent(rightClick);
        }

        async function requestDiscordProfile(userId) {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            let wait = false;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (xhr.status === 200) {
                        // console.log(this.responseText);
                        let response = JSON.parse(this.responseText);
                        // console.log(response.user);
                        let userData = {
                            id: response.user.id,
                            username: response.user.username,
                            avatar: response.user.avatar,
                            discriminator: response.user.discriminator,
                            connected_accounts: response.connected_accounts,
                            mutual_guilds: response.mutual_guilds
                        };
                        console.log(userData);
                        usernames.push(userData);
                        // FIXME: normal to break here
                        var toProcess = $x('//img[starts-with(@src, "https://cdn.discordapp.com/avatars/'
                            + response.user.id +
                            '")]/ancestor::div[starts-with(@class,"member-")]');
						if (!toProcess.length) {
							toProcess = $x('//div[starts-with(@aria-label, "'
                                + response.user.username +
                                '")]/ancestor::div[starts-with(@class,"member-")] | //span[starts-with(@class,"roleColor-")][text()="'
								+ response.user.username +
								'"]/ancestor::div[starts-with(@class,"member-")]');
						}
                        toProcess.forEach((elem, index) => {
                            if (!elem.hasAttribute('swiped')) {
                                let processed = toProcess[index];
                                // console.log('processed', processed);
                                processed.setAttribute('swiped', "yep");
                            }
                        });
                    } else if (xhr.status === 429) {
                        console.log('gotta wait');
                        wait = true;
                    }
                }
            });

            if (wait) {
                await sleep(36000);
            }

            xhr.open("GET", "https://discord.com/api/v8/users/" + userId + "/profile");
            xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0");
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Accept-Language", "es-ES");
            // TODO: set header with your own account value (or any request will always return HTTP code 401)
            xhr.setRequestHeader("Authorization", "<REPLACE>");
            // xhr.setRequestHeader("X-Super-Properties", "<super-props>");
            xhr.setRequestHeader("Connection", "keep-alive");
            // xhr.setRequestHeader("Cookie", "<cookie>");
            xhr.setRequestHeader("TE", "Trailers");
            xhr.setRequestHeader("Pragma", "no-cache");
            xhr.setRequestHeader("Cache-Control", "no-cache");

            xhr.send();
        }

        function getUsername() {
            // var user = $x('//div[not(@swiped="yep")][starts-with(@class,"nameAndDecorators")]')[0];
            var user = $x('//div[starts-with(@class,"nameAndDecorators")]/ancestor::div[starts-with(@class,"member-")][not(@swiped="yep")]//div[starts-with(@class,"nameAndDecorators")]')[0];
            // console.log('getUsername', user);
            if (user) {
                user.addEventListener('contextmenu', function (e) {
                    // console.log('right clicked');
                    var observer = new MutationObserver(function (mutationsList, observer) {
                        // console.log('document changed', mutationsList);
                        if (document.getElementById('user-context')) {
                            var copyIdBtn = document.getElementById("user-context-devmode-copy-id");
                            // console.log('copyIdBtn', copyIdBtn);
                            copyIdBtn.click();
                        }
                    });
                    observer.observe(document, {subtree: true, attributes: false, childList: true});
                }, false);
                dispatchRightClick(user);
            }
            return !!user;
        }

        function loadModal() {
            document.body.insertAdjacentHTML('afterend', " <!-- Trigger/Open The Modal -->\n" +
                "<button id=\"everyoneswiperBtn\">Open Modal</button>\n" +
                "\n" +
                "<!-- The Modal -->\n" +
                "<div id=\"everyoneswiper\" class=\"everyoneswipermodal\">\n" +
                "\n" +
                "  <!-- Modal content -->\n" +
                "  <div class=\"everyoneswiper-content\">\n" +
                "    <span class=\"everyoneswiperclose\">&times;</span>\n" +
                "    <p>Some text in the Modal..</p>\n" +
                "  </div>\n" +
                "\n" +
                "</div> \n" +
                "<style>\n" +
                " /* The Modal (background) */\n" +
                ".everyoneswipermodal {\n" +
                "  position: fixed; /* Stay in place */\n" +
                "  z-index: 1; /* Sit on top */\n" +
                "  left: 0;\n" +
                "  top: 0;\n" +
                "  width: 100%; /* Full width */\n" +
                "  height: 100%; /* Full height */\n" +
                "  overflow: auto; /* Enable scroll if needed */\n" +
                "  background-color: rgb(0,0,0); /* Fallback color */\n" +
                "  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n" +
                "}\n" +
                "\n" +
                "/* Modal Content/Box */\n" +
                ".everyoneswiper-content {\n" +
                "  overflow: auto;\n" +
                "  background-color: #fefefe;\n" +
                "  margin: 15% auto; /* 15% from the top and centered */\n" +
                "  padding: 20px;\n" +
                "  border: 1px solid #888;\n" +
                "  width: 80%; /* Could be more or less, depending on screen size */\n" +
                "}\n" +
                "\n" +
                "/* The Close Button */\n" +
                ".everyoneswiperclose {\n" +
                "  color: #aaa;\n" +
                "  float: right;\n" +
                "  font-size: 28px;\n" +
                "  font-weight: bold;\n" +
                "}\n" +
                "\n" +
                ".close:hover,\n" +
                ".close:focus {\n" +
                "  color: black;\n" +
                "  text-decoration: none;\n" +
                "  cursor: pointer;\n" +
                "} \n" +
                "</style>");
            // Get the modal
            var modal = document.getElementById("everyoneswiper");
            // Get the button that opens the modal
            var btn = document.getElementById("everyoneswiperBtn");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("everyoneswiperclose")[0];
            // When the user clicks on the button, open the modal
            btn.onclick = function () {
                modal.style.display = "block";
            }
            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                let code = "<code>" + JSON.stringify(usernames) + "</code>";
                document.getElementsByClassName("everyoneswiper-content")[0].innerHTML = code;
                modal.style.display = "none";
                throw new Error('exit');
                debugger;
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
})()
