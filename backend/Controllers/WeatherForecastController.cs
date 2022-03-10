using Microsoft.AspNetCore.Mvc;

namespace MinimalAPI_Balta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Condicoes = new[]
        {
	        "Céu Limpo", "Nublado", "Chuva", "Céu Limpo",
		"Fortes Chuvas", "Céu Limpo", "Chuvas com Relâmpagos", 
		"Nublado", "Fortes Chuvas com Relâmpagos", "Nublado"
    	};

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Data = DateTime.Now.AddDays(index),
                TemperaturaC = Random.Shared.Next(24, 31),
                Condicao = Condicoes[Random.Shared.Next(Condicoes.Length)]
            })
            .ToArray();
        }
    }
}
