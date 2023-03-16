// Llamada a los elementos del DOM para dar funcionalidades.
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const cardQuiz = document.getElementById("quizSport")
const scoreCard = document.getElementById("card-score")
const homeButton = document.getElementById("home-btn")
const resultButton = document.getElementById("results-btn")
const yourScore = document.getElementById("your-score")
const cardTitle = document.getElementById("card-title")
const textScore = document.getElementById("text-score")
const ctx = document.getElementById("myChart")
const average = document.getElementById("average-title")
const chartDiv = document.getElementById("chart-div")







// Enlace de la API almacenada en una variable
const API_URL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"


// Variable de datosQuiz = []
    // --> Guarda datos de la api (con axios).
    // --> Sobre esta variable sacamos el contenido.
        const datosQuiz = []
        console.log(datosQuiz)

// LLamada a la API mediante axios.
    // --> En el .then guardaremos los datos en una variable creada ".datosQuiz"
        axios.get(API_URL)
            .then(res => {
                // Guardar el array sobre el que vamos a trabajr en una variable
                const datos = res.data.results
                // Iteramos sobre los datos y agregamos cada objeto al array
                for (let i = 0; i < datos.length; i++) {
                datosQuiz.push(datos[i]);
                }
            })
            .catch(err=> console.error(err))
            
// Variable sobre la que se va a iterar cuando avancen las preguntas
    // --> Marcara el posicionameniento de las preguntas array.
        let currentQuestionIndex; 
        let countCorrect = 0;
        let scoreArray = JSON.parse(localStorage.getItem("scores")) || [];

        

// Funcion para empezar el quiz 
    // --> Se aplica sobre el boton Start the Quiz
    // --> Nos conduce a la pregunta del array posicion [0]
        function startGame() {
            cardQuiz.classList.add("hide");
            scoreCard.classList.add("hide");
            currentQuestionIndex = 0;
            countCorrect = 0
            questionContainerElement.classList.remove("hide");
            setNextQuestion()
        }
        restartButton.addEventListener("click", startGame);
        startButton.addEventListener("click", startGame);

// Funcion para mostrar las questiones y crear un boton porfunction showQuestion(question) 
    // --> Cambia el contenido de contenedor de "question"
    // --> Sacamos un array nuevo con las respuestas correctas e incorrectas.
    // --> Pintar las respuestas tanto correctas como incorrectas
        
        function showQuestion(question) {

            // Pinta la pregunta
            questionElement.innerHTML = question.question
            // Crea un arreglo con todas las respuestas (correctas e incorrectas)
            const answers = [...question.incorrect_answers, question.correct_answer]
            // Mezcla las respuestas utilizando sort() y Math.random()
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            // Pinta los botones de respuesta en orden aleatorio
            shuffledAnswers.forEach(answer => {
                const button = document.createElement("button");
                button.id = "answerButton"
                button.innerHTML = answer;
                answerButtonsElement.appendChild(button);

            // Funcion  que se le añade al boton de cada una de las respuestas
                // --> Contador a la variable de correctas
                button.addEventListener("click",()=>{
                    selectAnswer()
                        if(button.dataset.correct){
                            countCorrect++
                        }    
                    console.log(countCorrect);       
                });
            });
        }

// Funcion setNextQuestion() aplicada en la funcion startGame
    // --> Elimina el contenido del contenedor de botones 
    // --> Muestra el contenido de la siguiente pregunta
        function setNextQuestion() {
            resetState();
            showQuestion(datosQuiz[currentQuestionIndex]);
        }
// Funcion resetState() va dentro de setNextQuestion
    // --> Esconde el boton de nextButton - Siguiente pregunta
    // --> Mientras haya hijo en botones lo elimina
        function resetState() {
            nextButton.classList.add("hide");
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
        }   
// Funcion para el boton de siguiente pregunta
    // --> Se le añade uno al contador numero pregunta
    // --> Se ejecuta la funcion setNextQuestion
        nextButton.addEventListener("click", () => {
            currentQuestionIndex++;
            setNextQuestion();
        });


// Variables para guardar en diferentes arrays las respuestas correctas e incorrectas
        let answerFalse = []
        let answerTrue = []

// Funcion para chekear las respuestas (se añande en selectAnswer)
    // --> Se implementa en la función showQuestion
    // --> Añade clases de correcta o erronea para pintar
        function checkAnswer(button) {
            answerFalse = datosQuiz[currentQuestionIndex].incorrect_answers
            answerTrue = datosQuiz[currentQuestionIndex].correct_answer

                if(answerFalse.includes(button.innerText)){
                    button.classList.add("erronea")
                    button.disabled = true
                
                }else{
                    button.classList.add("correcta")
                    button.disabled = true 
                    button.dataset.correct = true
                }
        }

// Funcion al seleccionar respuest (se añade a botones de respuesta)
    // --> Recorre cada boton de respuesta y checkAnswer()
    // --> Comprueba que se hayam recorrido todas las preguntas
        function selectAnswer() {
            Array.from(answerButtonsElement.children).forEach((button) => {
                checkAnswer(button);
            }); 

                if (datosQuiz.length > currentQuestionIndex + 1) {
                    nextButton.classList.remove("hide");
                } else {
                    printScore()
                    saveScore()
                    scoreCard.classList.remove("hide");
                    questionContainerElement.classList.add("hide");
                } 
        }

        

        function printScore(){
            yourScore.innerHTML = `${countCorrect}`

            if(countCorrect <= 2){
                cardTitle.innerText = "Nice one troll"
                textScore.innerText = "Nice try, but you still need to improve your general knowledge skills! Keep going and keep learning to improve your score next time."
            }
            else if(countCorrect > 2 && countCorrect < 5){
                cardTitle.innerText = "Almost there loser"
                textScore.innerText = "You're almost there! Keep working hard and learning more to improve your results in the future."
            }
            else if(countCorrect >= 5 && countCorrect < 7){
                cardTitle.innerText = "You are a kiss-ass"
                textScore.innerText = "You are a kiss-ass! Your general knowledge skills are impressive, keep it up!"
                
            }
            else if(countCorrect >= 7 && countCorrect <= 10){
                cardTitle.innerText = "You are el BICHO"
                textScore.innerText = "You are el BICHO! Your general knowledge skills are exceptional and truly impressive. Keep going and show off your skills to everyone! SSSSSSSUUUUUU!"
                
            }


        }

        function saveScore() {
            scoreArray.push(countCorrect);
            localStorage.setItem("scores", JSON.stringify(scoreArray));
          }

        function goHome(){
            cardQuiz.classList.remove("hide");
            scoreCard.classList.add("hide");
        }

        homeButton.addEventListener("click", goHome)





        function showStats() {
            if(scoreArray.length == 0) {
              average.innerHTML = "No game history";
            }else {
              average.innerHTML = `You've played ${scoreArray.length} time(s). Your average is:  ${Number(scoreArray.reduce((acc, val) => (acc + val)) / scoreArray.length).toFixed(0)}/10`;
              chartDiv.innerHTML = `<canvas id="chart"></canvas>`;
              createChart();
            }
            }
        

        showStats()

        function createChart () {
            let xValues = scoreArray.map((game,index) => "Try" + (index + 1));
            let yValues = scoreArray.map(game => game);
            const barColors = "#0d6efd";
            
            new Chart("chart", {
              type: "bar",
              data: {
                labels: xValues,
                datasets: [{
                  backgroundColor: barColors,
                  data: yValues,
                  barPercentage: 0.5,
                  
                }]
              },
              options: {
                legend: {display: false},
                title: {
                  display: true,
                },
                
                scales: {
                  yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                      min: 0,
                      max: 10
                    }
                  }]
                }
              }
            });
            }

       
            
        
          







    