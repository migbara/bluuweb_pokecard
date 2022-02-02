const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const pintarCard = (pokemon) => {
    // Donde vamos a introducir el elemento
    const flex = document.querySelector('.flex');
    
    //Recogemos el contenido del template
    const template = document.querySelector('#template-card').content;

    //Creamos un fragmento
    const fragment = document.createDocumentFragment();
    
    //Creamos una copia del contenido y será con ella con la que trabajemos
    const clone = template.cloneNode(true);
    
    //Le ponemos los datos al objeto del clone
    clone.querySelector('.card-body-img').setAttribute('src',pokemon.imagen);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Experiencia';
    clone.querySelectorAll('.card-footer-social h2')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h2')[1].textContent = pokemon.especial + 'K';
    clone.querySelectorAll('.card-footer-social h2')[2].textContent = pokemon.defensa + 'K';

    //Asignamos el clone al fragmento
    fragment.appendChild(clone);
    
    //Asignamos el fragmento al objeto del dom donde vamos a introducir el elemento
    flex.appendChild(fragment);
}

const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        // console.log(data);
        const pokemon = {
            imagen: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat
        }
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1,201);
    // console.log(random);
    fetchData(random);
});





