document.addEventListener('DOMContentLoaded', () => {
    const project_id = document.getElementById('project_id').value
    
    const page__left = document.querySelector('.page__left')
    const page__center = document.querySelector('.page__center')
    const page__right = document.querySelector('.page__right')

    const menuOptions = [
        {
            id: 1,
            type: 'Header',
            content: [
                {
                    id: 1,
                    content: `
                    <div style='display: flex; 
                            justify-content: space-between; 
                            align-items: center;
                            width: 100%; 
                            background-color: #000;
                            color: #fff;
                            padding: 6px 6px' >
                        <a>Logo</a>
                        <div style='display: flex; 
                                    justify-content: space-between; 
                                    align-items: center;
                                    gap: 4px'>
                            <a>Home</a>
                            <a>FAQ</a>
                        </div>
                    </div>
                    `,
                },
                {
                    id: 2,
                    content: `
                        <div style='display: flex; 
                                    justify-content: space-around; 
                                    align-items: center;
                                    width: 100%; 
                                    background-color: #000;
                                    color: #fff;
                                    padding: 6px 6px' >
                            <a>Logo</a>
                            <div style=' display: flex; 
                                        justify-content: space-between; 
                                        align-items: center;
                                        gap: 10px'>
                                <a>Home</a>
                                <a>FAQ</a>
                            </div>
                        </div>
                    `,
                },
                {
                    id: 3,
                    content: `
                    <div style='display: flex; 
                                justify-content: space-evenly; 
                                align-items: center;
                                width: 100%; 
                                background-color: #000;
                                color: #fff;
                                padding: 6px 6px' >
                        <a>Logo</a>
                        <div style=' display: flex; 
                                    justify-content: space-between; 
                                    align-items: center;
                                    gap: 10px'>
                            <a>Home</a>
                            <a>FAQ</a>
                        </div>
                    </div>
                    `,
                },
                {
                    id: 4,
                    content: `
                        <div style='display: flex; 
                                    justify-content: flex-end; 
                                    align-items: center;
                                    width: 100%; 
                                    background-color: #000;
                                    color: #fff;
                                    padding: 6px 6px' >
                            <div style=' display: flex; 
                                        justify-content: space-between; 
                                        align-items: center;
                                        gap: 10px'>
                                <a>Home</a>
                                <a>FAQ</a>
                            </div>
                        </div>
                    `,
                },
            ]
        },
        {
            id: 2,
            type: 'Footer',
            content: [
                {
                    id: 1,
                    content: `
                    <div style='display: flex; 
                            justify-content: space-between; 
                            align-items: center;
                            width: 100%; 
                            background-color: #000;
                            color: #fff;
                            padding: 6px 6px' >
                        <div style='display: flex; 
                            justify-content: space-between; 
                            align-items: center;
                            gap: 4px'>
                            <a>Police</a>
                            <a>Terms</a>
                        </div>
                        <div style='display: flex; 
                                    justify-content: space-between; 
                                    align-items: center;
                                    gap: 4px'>
                            <a>Facebook</a>
                            <a>Twitter</a>
                        </div>
                    </div>
                    `,
                },
                {
                    id: 2,
                    content: `
                    <div style='display: flex; 
                            justify-content: space-around; 
                            align-items: center;
                            width: 100%; 
                            background-color: #000;
                            color: #fff;
                            padding: 6px 6px' >
                        <div style='display: flex; 
                            justify-content: space-between; 
                            align-items: center;
                            gap: 4px'>
                            <a>Police</a>
                            <a>Terms</a>
                        </div>
                        <div style='display: flex; 
                                    justify-content: space-between; 
                                    align-items: center;
                                    gap: 4px'>
                            <a>Facebook</a>
                            <a>Twitter</a>
                        </div>
                    </div>
                    `,
                },
                {
                    id: 3,
                    content: `
                    <div style='display: flex; 
                                justify-content: flex-end; 
                                align-items: center;
                                width: 100%; 
                                background-color: #000;
                                color: #fff;
                                padding: 6px 10px' >
                        <div style=' display: flex; 
                                    justify-content: space-between; 
                                    align-items: center;
                                    gap: 10px'>
                            <a>Facebook</a>
                            <a>Twitter</a>
                        </div>
                    </div>
                    `,
                },
            ],
        },
        {
            id: 3,
            type: 'Intros',
            content: [

            ],
        },
        {
            id: 3,
            type: 'About',
            content: [
                {
                    id: 1,
                    content: `
                    <div style='text-align: center;
                                width: 100%; 
                                background-color: #000;
                                color: #fff;
                                padding: 6px 10px;
                                margin: 10px 0' >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, blanditiis dolorum! Delectus deleniti omnis sit laborum. Earum, nam temporibus deleniti optio, modi, nihil distinctio enim exercitationem omnis blanditiis deserunt iusto.
                    </div>
                    `,
                },
            ],
        },
        {
            id: 3,
            type: 'Collections',
            content: [

            ],
        },
    ]

    const maket = document.createElement('div')
    maket.id = 'maket'
    maket.classList.add('maket')
    maket.style.backgroundColor = '#000'
    page__center.append(maket)

    // fetch all content from api
    function fetchContent () {
        fetch(`/api/projects/${project_id}/content`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                maket.innerHTML = data.content

                deleteBlock()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fetchContent()

    function showBlockStyle() {
        const blocks = document.querySelectorAll('.block')

        console.log(blocks)
    }

    // save maket 
    function saveMaket () {
        const jsonData = JSON.stringify(maket.innerHTML);
        
        fetch(`/api/projects/${project_id}/content`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            'body': jsonData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
 
    // full clear maket
    function clearMaket() {
        maket.innerHTML = ''

        saveMaket()
    }

    // Delete One Block when we click on them
    function deleteBlock () {
        const deletes = document.querySelectorAll('.delete')
        const blocks = document.querySelectorAll('.block')

        for (let i = 0; i < blocks.length; i++) {
            deletes[i].addEventListener('click', () => {
                maket.removeChild(blocks[i])

                saveMaket()
            })
        }
    }

    // render blocks
    function renderMaket (e) {
        maket.innerHTML += `
            <div class='block'>
                <span class="material-symbols-outlined delete">
                    cancel
                </span>
                ${e}
            </div>
        `

        deleteBlock()
        saveMaket()
        
    }

    const showProjectInfo = () => {
        fetch(`/api/projects/${project_id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }  

    document.querySelector('#title_input').addEventListener('change', (e) => {
        let data = new FormData(document.querySelector('#title'))
        
        fetch(`/api/projects/${project_id}`, {
            'method': 'POST',
            'body': data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    showProjectInfo()

    const showElements = () => {
        for (const element of menuOptions) {
            const div = document.createElement('div')
            div.id = element.id
            div.classList.add('menu')

            div.innerHTML += `
                <div class='menu__option'>
                    <h4>${element.type}</h4>
                    <span class="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </div>
            `

            const content = document.createElement('div')
            content.classList.add('menu__content')
            content.style.display = 'none'

            for (const i of element.content) {
                const el  = document.createElement('div')
                el.classList.add('element')
                el.id = i.id
                el.innerHTML += i.content
                content.appendChild(el)
            }

            div.appendChild(content)
            page__left.appendChild(div)
        }

        const menu__contents = document.querySelectorAll('.menu__content')
        const menu__options = document.querySelectorAll('.menu__option')

        for (let i = 0; i < menu__contents.length; i++) {
            menu__options[i].addEventListener('click', () => {
                if (menu__contents[i].style.display == 'flex') {
                    menu__contents[i].style.display = 'none'
                } else {
                    for (const i of menu__contents) {
                        i.style.display = 'none'
                    }

                    menu__contents[i].style.display = 'flex'
                }
            })
            
        }

        const elements = document.querySelectorAll('.element') 

        for (const el of elements) {
            el.addEventListener('click', (e) => {
                renderMaket(el.innerHTML)
            })
        }
    }

    document.querySelector('#clearMaket').onclick = clearMaket
    
    showElements()
})
