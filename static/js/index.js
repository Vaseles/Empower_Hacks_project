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
                    const div = document.createElement('div')
                    div.id = project.id
                    div.classList.add('project')
                    // div.href = `/projects/${project.id}`

                    div.innerHTML = `
                        <a href='/projects/${project.id}'><img src='https://images.pexels.com/photos/17930312/pexels-photo-17930312/free-photo-of-empty-platforms-at-a-subway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='${project.title}' /></a>
                        <a class='div' href='/projects/${project.id}'>${project.title}</a>
                        <div class='div project__delete'>
                            <span class="material-symbols-outlined">
                            delete
                            </span>
                        </div>
                    `

                    projects_content.appendChild(div)

                    let projects = document.querySelectorAll('.project')
                    let project__deletes = document.querySelectorAll('.project__delete')
                    
                    for (let i = 0; i < projects.length; i++) {
                        project__deletes[i].addEventListener('click', () => {
                            projects[i].style.display = 'none'

                            fetch(`/api/projects/${projects[i].id}/delete`, {
                                'method': 'POST',
                            })
                                .then(response => response.json())
                                .then(data => console.log(data))
                                .catch(err => console.error(err))
                        })
                        
                    }
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