document.addEventListener('DOMContentLoaded', () => {
    const window = document.querySelector('.create__project__window')

    const projects_content = document.querySelector('.page__content__projects')

    const form = document.querySelector('#Create-Project-Form')
    const open_form = document.querySelector('#Create-Project-Button')
    const close_form = document.querySelector('#Close-Project-Form')

    const showAllProjects = () => {
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => {
                projects_content.innerHTML = ''

                for (const project of data) {
                    const a = document.createElement('a')
                    a.id = project.id
                    a.className = 'project'
                    a.href = `/projects/${project.id}`

                    a.innerHTML = `
                        <img src='https://images.pexels.com/photos/17930312/pexels-photo-17930312/free-photo-of-empty-platforms-at-a-subway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='${project.title}' />
                        <div>${project.title}</div>
                    `

                    projects_content.appendChild(a)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Open Form
    open_form.addEventListener('click',() => {
        window.style.display = 'flex'

        setTimeout(() => {
            window.style.opacity = 1
        }, 300)
    })

    // Close Form
    close_form.addEventListener('click',() => {
        window.style.opacity = 0

        setTimeout(() => {
            window.style.display = 'none';
        }, 300)
    })

    // Create A New Project
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let formData = new FormData(form);

        fetch('/api/projects', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                showAllProjects()

                window.style.opacity = 0

                setTimeout(() => {
                    window.style.display = 'none';
                }, 300)
            })
    })

    showAllProjects()

    setInterval(() => {
        showAllProjects()
    }, 60000)
})