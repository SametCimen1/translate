var wordInput = document.querySelector(".word");
var submit = document.querySelector(".submit");

submit.addEventListener("click", (e)=>{
    e.preventDefault();
if(wordInput.value !== ""){
    const dropDown = document.querySelector(".languages");
    const language = dropDown.options[dropDown.selectedIndex].value;
    console.log(language)
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${wordInput.value}`
    fetch(url).then(response =>{
        if(response.ok){
            return response.json();
        }
        alert("Cant get the definetion")
    }).then(jsonResponse =>{
        const content = document.querySelector(".content");
        content.textContent = "";
        
        var example = document.createElement("span")
        example.textContent = " example "
        example.style.color = "black"

        content.innerHTML += "<h1>Meanings</h1>"
        for(let i = 0; i<jsonResponse[0].meanings.length; i++){
            const definition = document.createElement("h2");
            definition.textContent += jsonResponse[0].meanings[i].definitions[0].definition; 
            content.append(definition)
        }
        content.innerHTML += "<h1>Examples</h1>"
        for(let i = 0; i<jsonResponse[0].meanings.length; i++){
            const definition = document.createElement("h2");
            definition.textContent += jsonResponse[0].meanings[i].definitions[0].example;
            content.append(definition)
        }
        content.innerHTML += "<h1>Part Of Speach</h1>"
        for(let i = 0; i<jsonResponse[0].meanings.length; i++){
            const definition = document.createElement("h2");
            definition.textContent += jsonResponse[0].meanings[i].partOfSpeech;
            content.append(definition)
        }
        for(let i = 1; i<jsonResponse.length; i++){
            console.log(jsonResponse[i].word)
        }
        

        const audio = document.createElement("audio")
        audio.controls = true;
        const source = document.createElement("source")
        source.src = jsonResponse[0].phonetics[0].audio;
        audio.append(source);
        content.append(audio);
        console.log(jsonResponse)
    })
}
else{
    alert("please enter a word")
}
})