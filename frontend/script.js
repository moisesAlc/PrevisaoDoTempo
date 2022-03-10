dados = $.get("https://localhost:7270/WeatherForecast/", async function (data) {
  return data;
});

diaSemana = new Array('Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb');
mesAno = new Array('Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez');
tiposTempo = new Array('dia-ceu-limpo', 'dia-nublado', 'noite-ceu-limpo', 'noite-nublado',
  'chuva', 'fortes-chuvas', 'chuvas-com-relampagos', 'fortes-chuvas-com-relampagos');

  // essa função corrige a hora. ex.: de 9:5 para 09:05
function corrigeHora(agoraaT){
  indiceDoisPontos = agoraaT.indexOf(':');
  parteAntesDoisPontos = agoraaT.substring(0,indiceDoisPontos)
  parteDepoisDoisPontos = agoraaT.substring(indiceDoisPontos+1)
  
  if (parteAntesDoisPontos.length<2) parteAntesDoisPontos = '0'.concat(parteAntesDoisPontos);
  if (parteDepoisDoisPontos.length<2) parteDepoisDoisPontos = '0'.concat(parteDepoisDoisPontos);

  return parteAntesDoisPontos + ':' + parteDepoisDoisPontos;
}
function periodoDoDia(agoraT, nascerDoSolT, porDoSolT) {
  if (agoraT < porDoSolT && agoraT > nascerDoSolT) return 'dia';
  else return 'noite';
}

function alteraFundoDeAcordoComHoraDoDia(elemento, agoraTemp){
  agoraTemp = Math.round(agoraTemp.substring(0,2));
  classe = "g" + agoraTemp;
  elemento.classList.add(classe);
  if (agoraTemp < 7 || agoraTemp > 18)  elemento.style.color = "white";
  if (agoraTemp >= 7 && agoraTemp <= 18)  elemento.style.color = "black";
}

function sensacaoTermica(velocidadeVentoEmKmPorHora, temperaturaEmCelsius) {
  return Math.round(33.0 + (10.0 * Math.sqrt(velocidadeVentoEmKmPorHora) + 10.45 - velocidadeVentoEmKmPorHora) * (temperaturaEmCelsius - 33.0) / 22.0);
}

function getImagem(desc, agoraT, nascerDoSolT, porDoSolT) {
  periodo = periodoDoDia(agoraT, nascerDoSolT, porDoSolT);
  if (desc.includes('Nublado')){
    if (periodo == 'dia') return 'img/sun_cloud.svg';
    else if (periodo == 'noite') return 'img/moon_cloud.svg';
  }else if (desc.includes('Limpo')) {
    if (periodo == 'dia') return 'img/sun.svg';
    else if (periodo == 'noite') return 'img/moon.svg';
  }else if (desc.includes('Relâmpago')) {
    if (desc.includes('Fortes')){
      return 'img/storm2.svg';
    }else{
      return 'img/storm.svg';
    }
  }else{
    if (desc.includes('Fortes')){
      return 'img/rain2.svg';
    }else{   
        return 'img/rain.svg';
    }
  }
}

function getImagemTemperatura(tempC){
  if (tempC < 26){
    return 'img/temperature_low.svg';
  }else if (tempC < 29){
    return 'img/temperature_regular.svg';
  }else{
    return 'img/temperature_high.svg';
  }
}

// Adaptado de: https://www.codegrepper.com/code-examples/javascript/convert+am%2Fpm+to+24+hour+javascript+
function convertTime12To24(time) {
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM === "pm" && hours < 12) hours = hours + 12;
  if (AMPM === "pm" && hours === 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return (sHours + ":" + sMinutes);
}

function deCelsiusParaFahrenheit (celsius){
  return Math.round((celsius * 9.0/5.0) + 32.0);
}