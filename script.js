function renderCards(selectedAreas) {
    var main = document.getElementById("main_div");
    main.innerHTML = '';

    for (let area in jsonData){
        if (selectedAreas.length != 0 && !selectedAreas.includes(area)) {
            // console.log(`skipping ${area}`)
            continue;
        }

        var area_div = document.createElement("div");
        area_div.id = area;

        var area_ = document.createElement("h3");
        area_.textContent = area;

        area_div.appendChild(area_);

        var grid = document.createElement("div");
        grid.classList.add('researcher_grid');

        jsonData[area].forEach( r => {

            var card = document.createElement("div");
            card.classList.add("card");
            
            var body = document.createElement("div");
            body.classList.add("card-body");
            
            var img = document.createElement("img");
            img.src = r.imagem;
            img.alt = r.nome;
            img.title = r.nome;
            body.appendChild(img);
            
            var name = document.createElement("h4");
            name.textContent = r.nome;
            body.appendChild(name);
            
            body.addEventListener('click', () => {
                window.open(r.link, "_blank");
            });
            
            var details = document.createElement("div");
            details.classList.add("details");
            
            var area = document.createElement("h4");
            area.textContent = "Área: " + r.area;
            details.appendChild(area);
            
            var project = document.createElement("p");
            project.textContent = "Projeto: " + r.projeto;
            details.appendChild(project);
            
            card.appendChild(body);
            card.appendChild(details);

            card.addEventListener('mouseover', () => {
                openDetails(card)
            });
            card.addEventListener('mouseout', () => {
                closeDetails(card)
            });

            grid.appendChild(card);
        });

        area_div.appendChild(grid)
        main.appendChild(area_div);
    }
}

function openDetails(card) {
    details = card.querySelector('.details');
    details.classList.add("visible");

    var dir = window.innerWidth - card.getBoundingClientRect().right;
    if (dir < card.getBoundingClientRect().width) {
        details.classList.remove("right");
        details.classList.add("left");
    } else {
        details.classList.remove("left");
        details.classList.add("right");
    };
}

function closeDetails(card) {
    details = card.querySelector('.details');
    details.classList.remove("visible");
}

async function loadFilter() {
    const filter = document.getElementById('area_filter');

    for (let area in jsonData){        
        const label = document.createElement('label');
        label.textContent = area;
        label.classList.add('filter_item');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', area);

        input.addEventListener('change', () => {
            renderSelected();
        });
    
        const span = document.createElement('span');
        span.classList.add('checkmark');

        // Adiciona o label e o input ao container
        label.appendChild(input)

        filter.appendChild(label);
        // filter.appendChild(document.createElement('br'));
    }
}

function renderSelected() {
    const filter = document.getElementById('area_filter');
    const inputs = filter.querySelectorAll('input');

    selectedAreas = [];

    inputs.forEach(input => {
        if (input.checked) {
            selectedAreas.push(input.value);
        }
    });

    renderCards(selectedAreas);
    // console.log(selectedAreas);
}

async function loadJson() {
    try {
        const res = await fetch('./data.json');
        jsonData = await res.json();
        // loadCards(research_areas);
    } catch (error) {
        console.error('Erro ao carregar os pesquisadores:', error);
    }
}

var jsonData = {};

window.onload = async () => {
    await loadJson();
    await loadFilter();
    renderCards([]);
};