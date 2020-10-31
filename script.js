    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        let Id = profile.getId();
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        
        
        let MainContainer = document.getElementById("main")
        let Inbox = document.getElementById("inbox")
        MainContainer.classList.add("hide")
        Inbox.classList.remove("hide")
        console.log(googleUser.wc.access_token)

        function CreateMail(msg){
            let SingleMail = document.createElement("p");
            SingleMail.innerText = String(msg)
            Inbox.appendChild(SingleMail)
        }




        function authenticate() {
            return gapi.auth2.getAuthInstance()
                .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
                .then(function() { console.log("Sign-in successful"); },
                    function(err) { console.error("Error signing in", err); });
        }
        function loadClient() {
            gapi.client.setApiKey("AIzaSyCL3tu8G68zXRgjJJQD55TXsGP6_ztlmVI");
            return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
                .then(function() { console.log("GAPI client loaded for API"); },
                    function(err) { console.error("Error loading GAPI client for API", err); });
        }

        // function execute() {
        //     return gapi.client.gmail.users.getProfile({
        //     "userId": Id
        //     })
        //         .then(function(response) {
        //                 // Handle the results here (response.result has the parsed body).
        //                 console.log(response.result);
        //             },
        //             function(err) { console.error("Execute error", err); });
        // }

        function execute() {
            return gapi.client.gmail.users.messages.list({
                "userId": Id
            })
                .then(function(response) {
                        for(let i=0; i<response.result.messages.length; i++){
                            CreateMail(response.result.messages[i])

                        }
                    },
                function(err) { console.error("Execute error", err); });
        }

        
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
        });

        authenticate().then(loadClient)

        let Exec = document.getElementById("Exec")
        Exec.addEventListener("click", ()=>{
            execute()
        })

        let SignOut = document.getElementById("signOut");


        SignOut.addEventListener("click", ()=>{
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
        });

        })
        
        
}
