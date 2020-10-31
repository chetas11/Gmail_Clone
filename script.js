    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        let Id = profile.getId();
    
        
        let MainContainer = document.getElementById("main")
        let Inbox = document.getElementById("inbox")
        let Buttons = document.getElementById("buttons")
        let Nav = document.getElementById("nav")
        Nav.classList.remove("hide")
        MainContainer.classList.add("hide")
        Inbox.classList.remove("hide")
        Buttons.classList.remove("hide")


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


        let messageid;

        function execute() {
            return gapi.client.gmail.users.messages.list({
                "userId": Id
            })
                .then(function(response) {
                        for(let i=0; i<response.result.messages.length; i++){
                            messageid = response.result.messages[i].id
                            LoadMsg(messageid)
                        }
                    },
                function(err) { console.error("Execute error", err); });
        }


          function LoadMsg(messageid) {
            return gapi.client.gmail.users.messages.get({
            "userId": Id,
            "id": messageid
            }).then(function(response) {
                    CreateMail(response.result.payload.headers[21].value)
                    console.log(response)
            },
            function(err) { console.error("Execute error", err); });
        }
        
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "949258149932-60i8eajtnv5q35cl0amcn7q7qgpl6ihv.apps.googleusercontent.com"});
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
            location.reload();
        });

        })
        
        
}
