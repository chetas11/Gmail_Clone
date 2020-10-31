    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        let Id = profile.getId();
    
        
        let MainContainer = document.getElementById("main")
        let Inbox = document.getElementById("inbox")
        MainContainer.classList.add("hide")
        Inbox.classList.remove("hide")
        console.log(googleUser.wc.access_token)

        let ProfilePic = document.getElementById("profile");
        ProfilePic.setAttribute("src",profile.getImageUrl())
        let UserName = document.getElementById("Name")
        UserName.innerText = profile.getName();
        let Email = document.getElementById("email")
        Email.innerText = profile.getEmail()

        function CreateMail(msg){
            let SingleMail = document.createElement("p");
            SingleMail.innerText = String(msg)
            SingleMail.classList.add("alert","alert-secondary")
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

        function getMails() {
            return gapi.client.gmail.users.messages.list({
                "userId": Id
            })
                .then(function(response) {
                        for(let i=0; i<response.result.messages.length; i++){
                            CreateMail(response.result.messages[i].id)
                        }
                        console.log(response.result.messages)
                    },
                function(err) { console.error("Execute error", err); });
        }

        
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
        });

        authenticate().then(loadClient).then(getMails())
        

        let SignOut = document.getElementById("signOut");


        SignOut.addEventListener("click", ()=>{
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
        });

        })
        
        
}
