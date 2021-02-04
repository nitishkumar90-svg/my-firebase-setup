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

    form_content.addEventListener(`submit`, (event) => {
        event.preventDefault()
        log('Content Submitted', { firstName: first_name.value })
    })

})

