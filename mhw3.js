function mainSection_forward(event) {
    const arrow_forward = event.currentTarget;

    let indexAttuale = parseInt(mainSectionAttuale.getAttribute('data-index'));
    let indexNuovo = indexAttuale;
    indexNuovo++;

    const sfondiMainSection = document.querySelectorAll('#back_main_section');

    for(const sfondo of sfondiMainSection) {

        if(sfondo.getAttribute('data-index') == indexNuovo ) {

            sfondoAttuale.classList.add('hidden');
            sfondo.classList.remove('hidden');
            sfondoAttuale = sfondo; 
            break;
        }
  
    }

    const allMainSection = document.querySelectorAll('#main_section');

    for(const mainSection of allMainSection) {
        console.log('mainSection: ' + mainSection.getAttribute('data-index'));
        if(mainSection.getAttribute('data-index') == indexNuovo) {

            mainSectionAttuale.classList.add('hidden');
            mainSection.classList.remove('hidden');
            mainSectionAttuale = mainSection; 
            break;
        }
    }
    if(mainSectionAttuale.getAttribute('data-index') < 7)
        arrow_f_attuale = mainSectionAttuale.querySelector('#arrow_forward');
    arrow_b_attuale = mainSectionAttuale.querySelector('#arrow_back');

    console.log('cliccato');
}

function mainSection_back(event) {
    const arrow_back = event.currentTarget;

    let indexAttuale = parseInt(mainSectionAttuale.getAttribute('data-index'));
    let indexNuovo = indexAttuale;
    indexNuovo--;

    const sfondiMainSection = document.querySelectorAll('#back_main_section');

    for(const sfondo of sfondiMainSection) {

        if(sfondo.getAttribute('data-index') == indexNuovo ) {

            sfondoAttuale.classList.add('hidden');
            sfondo.classList.remove('hidden');
            sfondoAttuale = sfondo; 
            break;
        }
  
    }

    const allMainSection = document.querySelectorAll('#main_section');

    for(const mainSection of allMainSection) {
        console.log('mainSection: ' + mainSection.getAttribute('data-index'));
        if(mainSection.getAttribute('data-index') == indexNuovo) {

            mainSectionAttuale.classList.add('hidden');
            mainSection.classList.remove('hidden');
            mainSectionAttuale = mainSection; 
            break;
        }
    }

    if(mainSectionAttuale.getAttribute('data-index') < 7)
        arrow_f_attuale = mainSectionAttuale.querySelector('#arrow_forward');
    arrow_b_attuale = mainSectionAttuale.querySelector('#arrow_back');

    console.log('cliccato');
}

let sfondoAttuale = document.querySelector('#back_main_section');
let mainSectionAttuale = document.querySelector('#main_section');

for(const arrow_f of document.querySelectorAll('#arrow_forward')) {
    arrow_f.addEventListener('click', mainSection_forward);
}

for(const arrow_b of document.querySelectorAll('#arrow_back')) {
    arrow_b.addEventListener('click', mainSection_back);
}

let arrow_f_attuale = document.querySelector('#arrow_forward');
let arrow_b_attuale;

////API////

const access_key = '4kLjrpFqF6XIrBmwZY4pB3bbFrGv3qjbXi5L_KAkSAw';
const secret_key = 'dlpavDe4dysrAQrGF9_MKYbbRHnJH-pnCsAULDBqiZw';

const search_endpoint = 'https://api.unsplash.com/search/photos?query=';
let page = 0;

function onResponse(response) {
    const res = response.json();
    console.log(res);
    return res;
}

function onJson(json) {
    console.log('json ricevuto');
    console.log('contenuto della ricerca: ' + document.querySelector('#navigazione form input').value);
    //rimuovo la main section
    sfondoAttuale.classList.add('hidden');
    mainSectionAttuale.classList.add('hidden');

    //inserisco border-bottom
    const header = document.querySelector('#back_header');
    header.classList.add('back_header_search');

    //mostro la content view
    const back = document.querySelector('#back_content_view');
    back.classList.remove('hidden');
    back.classList.add('height_content_view'); 
    const content_view = document.querySelector('#content_view');
    content_view.classList.remove('hidden');
    content_view.classList.add('height_content_view');

    console.log('0-content_view - HEIGHT: ' + content_view.offsetHeight);
    content_view.innerHTML = '';

    console.log('1-back_content_view - HEIGHT: ' + back.offsetHeight);
    console.log('1-content_view - HEIGHT: ' + content_view.offsetHeight);


    //creo gli elementi della prima parte della content_view - SEZIONE info_ricerca
    const info_ricerca = document.createElement('section');
    info_ricerca.classList.add('info_ricerca');
    content_view.appendChild(info_ricerca);

    //contenuto della ricerca - SEZIONE info_ricerca
    const ricerca = document.createElement('h6');
    ricerca.textContent = '‘' + document.querySelector('#navigazione form input').value + '’';
    info_ricerca.appendChild(ricerca);

    //categorie - SEZIONE info_ricerca
    const categorie = document.createElement('div');
    let categorie_op = [];
    for(let i = 0; i < 3; i++) {
        categorie_op[i] = document.createElement('a');
    }
    const donna = document.createElement('span');
    donna.textContent = "Donna"; donna.classList.add('opzioni');
    const uomo = document.createElement('span');
    uomo.textContent = "Uomo"; uomo.classList.add('opzioni');
    const bambini = document.createElement('span');
    bambini.textContent = "Bambini"; bambini.classList.add('opzioni');

    categorie_op[0].appendChild(donna);
    categorie_op[1].appendChild(uomo);
    categorie_op[2].appendChild(bambini);

    for(i = 0; i < 3; i++) {
        categorie.appendChild(categorie_op[i]);
    }

    info_ricerca.appendChild(categorie);

    //SEZIONE - results_view
    const container_results = document.createElement('section');
    container_results.classList.add('container_results');
    const results_view = document.createElement('section');
    results_view.classList.add('results');
    content_view.appendChild(container_results);
    container_results.appendChild(results_view);

    for(let i = 0;  i < json.results.length; i++) {
        const item = json.results[i];
        const title = item.alt_description;
        const cover_url = item.urls.regular;

        const product = document.createElement('div');
        product.classList.add('product');
        const img = document.createElement('div');
        img.classList.add('back_img');
        img.style.backgroundImage = "url(" + cover_url + ")";
        const brand = document.createElement('h4');
        brand.classList.add('brand');
        if(item.user.last_name == null) brand.textContent = "NULL";
        else brand.textContent = item.user.last_name;
        const caption = document.createElement('span');
        caption.classList.add('caption');
        caption.textContent = item.user.username + " - " + title;
        console.log('caption: ' + caption.textContent);
        const prezzo = document.createElement('span');
        prezzo.classList.add('caption');
        prezzo.textContent = (Math.random() * (70 - 20) + 20).toFixed(2) + ' €';
        product.appendChild(img);
        product.appendChild(brand);
        product.appendChild(caption);
        product.appendChild(prezzo);
        results_view.appendChild(product);

    }

    const barra_nav = document.createElement('div');
    barra_nav.classList.add('barra_nav');
    container_results.appendChild(barra_nav);

    const a_b = document.createElement('span');
    a_b.classList.add('material-symbols-outlined');
    a_b.textContent = "arrow_back_ios";
    const pagina = document.createElement('span');
    pagina.textContent = "Pagina " + page + " di " + json.total_pages;
    const a_f = document.createElement('span');
    a_f.classList.add('material-symbols-outlined');
    a_f.textContent = "arrow_forward_ios";

    barra_nav.appendChild(a_b);
    barra_nav.appendChild(pagina);
    barra_nav.appendChild(a_f);

    if(page > 1)
        a_b.addEventListener('click', paginaPrecedente);
    if(page < json.total_pages)
    a_f.addEventListener('click', paginaSuccessiva);

    console.log('back_content_view - HEIGHT: ' + back.offsetHeight);
    console.log('content_view - HEIGHT: ' + content_view.offsetHeight);

}

function paginaPrecedente(event) {
    page--;
    const content_input = document.querySelector('#navigazione form input');
    const content_value = content_input.value;
    rest_url = search_endpoint + content_value + '&page=' + page + '&per_page=' + 15;
    fetch(rest_url, {
        headers: {
            Authorization: `Client-ID ${access_key}`
        }
    }).then(onResponse).then(onJson);
}

function paginaSuccessiva(event) {
    page++;
    const content_input = document.querySelector('#navigazione form input');
    const content_value = content_input.value;
    rest_url = search_endpoint + content_value + '&page=' + page + '&per_page=' + 15;
    fetch(rest_url, {
        headers: {
            Authorization: `Client-ID ${access_key}`
        }
    }).then(onResponse).then(onJson);
}

function search(event) {
    event.preventDefault();
    page = 1;
    const content_input = document.querySelector('#navigazione form input');
    const content_value = content_input.value;
    rest_url = search_endpoint + content_value + '&page=' + page + '&per_page=' + 15;
    fetch(rest_url, {
        headers: {
            Authorization: `Client-ID ${access_key}`
        }
    }).then(onResponse).then(onJson);
}

const search_form = document.querySelector('#navigazione form');
search_form.addEventListener('submit', search);

////API 2////

const client_id = '79140960fb1c45e5a2e4ae5bfaeff1f6';
const client_secret = 'dcf923383eef4a9681de725f4f5c1d6d';

fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers: 
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}).then(onPromise).then(onTokenJson);

function onPromise(promise) {
    return promise.json();
}

function onTokenJson(json) {
    token = json.access_token;
    console.log("token preso");
    console.log('TOKEN: ' + token);
}

function ripristinaRicercaArtisti(event) {
    arrow_b_attuale.style.display = "block";
    const artists_view_div = document.querySelector('#sezione_artisti');
    artists_view_div.classList.remove('top_artist_view_div');

    const section = document.querySelector('#main_section[data-index = "7"] section');
    section.classList.add('hidden');
}


function f(event) {
    const ev = event.currentTarget;
    console.log('sono entrato nella funzione f');
    event.stopPropagation();
}


const search_endpoint_2 = 'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3A';
const tipo_artist = '&type=artist';

function onArtistJson(json) {
    console.log('JSON ricevuto');
    arrow_b_attuale.style.display = "none";
    const sezione_artisti = document.querySelector('#sezione_artisti');
    sezione_artisti.classList.add('top_artist_view_div');

    const section = document.querySelector('#main_section[data-index = "7"] section');
    section.classList.remove('hidden');
    section.classList.add('color_artist_view');

    const artists_view = document.querySelector('#artists_view');
    artists_view.classList.remove('hidden');

    artists_view.innerHTML = '';

    let n_results = 0;

    if(json.artists.total <= json.artists.limit) {
        n_results = json.artists.total;
    }       
    else {
        n_results = json.artists.limit;
    }

    console.log('numero limite di risultati: ' + json.artists.limit);
    console.log('numero risultati: ' + n_results);
    if(n_results == 0) {
        console.log('ELEMENTO NON TROVATO');
        const artist = document.createElement('div');
        artist.classList.add('artist');
        const caption = document.createElement('h6');
        caption.textContent = "Non stiamo trovando l'artista che stai cercando";
        artist.appendChild(caption);
        artists_view.appendChild(artist);
    }

    else {
        for(let i = 0; i <n_results; i++) {
            const item = json.artists.items[i];
            
            const name = item.name;
            console.log('nome artista: ' + name);           

            if(item.name.toLowerCase() === document.querySelector('.cerca_artista input').value.toLowerCase()) {
                console.log('ELEMENTO TROVATO');
                const covers = item.images;
                const cover_url = covers[0].url;
                console.log('url immagine: ' + cover_url);
                const artist = document.createElement('div');
                artist.classList.add('artist');
                const image = document.createElement('img');
                image.src = cover_url;
                const caption = document.createElement('h2');
                caption.textContent = name;
                artist.appendChild(image);
                artist.appendChild(caption);
                artists_view.appendChild(artist);
                artists_view.addEventListener('click', ripristinaRicercaArtisti);
                artist.addEventListener('click', f);
                break;
            }

            if(i == n_results-1) {
                console.log('ELEMENTO NON TROVATO');
                const artist = document.createElement('div');
                artist.classList.add('artist');
                const caption = document.createElement('h6');
                caption.textContent = "Non stiamo trovando l'artista che stai cercando";
                artist.appendChild(caption);
                artists_view.appendChild(artist);
            }
        }
    }

}

function search_artist(event) {
    event.preventDefault();
    const artist_input = document.querySelector('#main_section[data-index = "7"] form input');
    const artist_value = encodeURIComponent(artist_input.value);
    rest_url = search_endpoint_2 + artist_value + tipo_artist;

    fetch(rest_url,
        {
        method: "GET", 
        headers: { 
            Authorization: `Bearer ${token}`
        }
    }).then(onResponse).then(onArtistJson);

}

const artist_form = document.querySelector('#main_section[data-index = "7"] form');
artist_form.addEventListener('submit', search_artist);



