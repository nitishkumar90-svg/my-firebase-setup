const log = (customLog, info) => {
    if (info === undefined)
        info = ``
    console.log(customLog, info)
}


//DOM Content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    log('HTML loaded!!')
    const form_content = document.getElementById(`form1`)
    const first_name = document.getElementById(`FirstName`)
    const last_name = document.getElementById(`LastName`)
    const db = firebase.firestore()
    const ul_tag = document.getElementById(`result`)
    
    //basically this will call only when submit button is hit. 
    form_content.addEventListener(`submit`, (event) => {
        event.preventDefault()
        if (!first_name.value || !last_name.value)
            return
        log('Content Submitted', { firstName: first_name.value, lastName: last_name })
        addUser(first_name.value, last_name.value)
        resetForm()
    })

    //#region functions
    const resetForm = () => {
        first_name.value = ``
        last_name.value = ``
    }

    const addUser = (first_Name, last_Name) => {
        db.collection(`Users`).add({ firstName: first_Name, lastName: last_Name, time_stamp: firebase.firestore.FieldValue.serverTimestamp() }).then((docRef) => {
            log(`Successfully added new user to database with id: ${docRef.id}`)
            retrieveUsers()
        }).catch((err) => {
            log(`Error occured while adding data to database with error message - ${err}`)
        })
    }

    //.onSnapshot() -> this will continously check the database for updates 
    const retrieveUsersByUsingSnapshot = () => {
        // querySnapshot instead of docRef -> used to get collection from table
        db.collection(`Users`).orderBy(`time_stamp`).onSnapshot((docRef) => {
            ul_tag.innerHTML = ``
            docRef.forEach(element => {
                let singleRecord = element.data()
                ul_tag.innerHTML +=`<li>${singleRecord.firstName} ${singleRecord.lastName}</li>`
            });
        })
    }

    //.onSnapshot() -> this will continously check the database for updates 
    const retrieveUsersByLimit = () => {
        // query snapshot -> used to get collection from table
        db.collection(`Users`).orderBy(`time_stamp`).limit(2).onSnapshot((docRef) => {
            ul_tag.innerHTML = ``
            docRef.forEach(element => {
                let singleRecord = element.data()
                ul_tag.innerHTML +=`<li>${singleRecord.firstName} ${singleRecord.lastName}</li>`
            });
        })
    }

    const retrieveUsersByUsingGet = () => {
        db.collection(`Users`).orderBy(`time_stamp`).get().then((docRef) => {
            ul_tag.innerHTML = ``
            docRef.forEach(element => {
                let singleRecord = element.data()
                ul_tag.innerHTML +=`<li>${singleRecord.firstName} ${singleRecord.lastName}</li>`
            });
        })
    }
    
    
    retrieveUsersByLimit()

    //#endregion
})

