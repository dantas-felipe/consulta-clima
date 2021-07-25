//fazendo com que o form não envie os dados, e capturando o que foi digitado

document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault(); // faz com que o evento submit não aconteça, deixando os dados na tela.

    let input = document.querySelector('#searchInput').value;

    if(input!==''){
        clearInfo();
        showWarning('Carregando...');

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=2e1414bd0d860fb45da17ff23f6b89ed&units=metric&lang=pt_br`; // Chamando API para consultar o clima

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name:json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            }); // pegando os dados no JSON do weather 

        }else{
            clearInfo();
            showWarning('Cidade não localizada')
        }

    } else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>KM/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display='block';
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display='none';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML=msg;
} // função para retornar uma mensagem ao usuario de carregando