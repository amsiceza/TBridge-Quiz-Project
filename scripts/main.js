// Enlace de la API almacenada en una variable
const API_URL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"

// LLamada a la API (Saca arrray objetos - Cada objeto bloque de pregunta)
axios.get(API_URL).then(res => console.log(res.data.results)).catch(err=> console.error(err))