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
        MainContainer.classList.remove("hide")
        // console.log(googleUser.wc.access_token)


        // function authenticate() {
        //     return gapi.auth2.getAuthInstance()
        //         .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
        //         .then(function() { console.log("Sign-in successful"); },
        //             function(err) { console.error("Error signing in", err); });
        // }
        // function loadClient() {
        //     gapi.client.setApiKey("YOUR_API_KEY");
        //     return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
        //         .then(function() { console.log("GAPI client loaded for API"); },
        //             function(err) { console.error("Error loading GAPI client for API", err); });
        // }
        // Make sure the client is loaded and sign-in is complete before calling this method.
        function execute() {
            return gapi.client.gmail.users.getProfile({
            "userId": "111490570980223679468"
            })
                .then(function(response) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response);
                    },
                    function(err) { console.error("Execute error", err); });
        }
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
        });


        let Auth = document.getElementById("Auth")
        let Exec = document.getElementById("Exec")

        Auth.addEventListener("click", ()=>{
            authenticate().then(loadClient)
        })

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
