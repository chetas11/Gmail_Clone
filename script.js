    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        let Id = profile.getId();
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        
        
        let MainContainer = document.getElementById("main")
        MainContainer.classList.add("hide")
        
        const Fetcher = async () => {
            try{
                const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/"+Id+"/profile?key=AIzaSyCL3tu8G68zXRgjJJQD55TXsGP6_ztlmVI")
                const data = await response.json()
                console.log(data.results.users.messages)
            }catch(e){
                console.log(e)
            }
        }


        Fetcher();

        let SignOut = document.getElementById("signOut");

        SignOut.addEventListener("click", ()=>{
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
        });

        })
        
        
}
