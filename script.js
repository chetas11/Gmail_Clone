    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        let Id = profile.getId();
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        
        
        let MainContainer = document.getElementById("main")
        MainContainer.classList.add("hide")
        
        console.log(googleUser.wc.access_token)

          function getDetails() {
                return gapi.client.gmail.users.getProfile({
                "userId": "111490570980223679468"
                })
                    .then(function(response) {
                            // Handle the results here (response.result has the parsed body).
                            console.log("Response", response);
                        },
                        function(err) { console.error("Execute error", err); });
            }

          function loadClient() {
            gapi.client.setApiKey("AIzaSyCL3tu8G68zXRgjJJQD55TXsGP6_ztlmVI");
            return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
                .then(function() { console.log("GAPI client loaded for API"); },
                    function(err) { console.error("Error loading GAPI client for API", err); });
        }

        let SignOut = document.getElementById("signOut");
        loadClient();
        getDetails();

        SignOut.addEventListener("click", ()=>{
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
        });

        })
        
        
}
