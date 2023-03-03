function init(){
    const dogFilter = document.getElementById('good-dog-filter');
    let dogArray = [];




    fetch("http://localhost:3000/pups")
    .then((resp) => resp.json())
    .then((dogs) => {
        console.log(dogs)
        dogArray = dogs;
        dogArray.forEach(renderDog)
    })

    dogFilter.addEventListener('click', () => {
        
        useFilter(dogFilter, dogArray);
    })

    console.log(dogArray);
}


function renderDog(dog){
    dogBar = document.getElementById("dog-bar");
    dogSpan = document.createElement("span");
    dogSpan.innerText = dog.name;

    dogSpan.addEventListener('click', () => {
        addDogInfo(dog)
    })

    dogBar.append(dogSpan);
}


function addDogInfo(dog){

        const dogInfo = document.getElementById("dog-info");
        const dogImage = document.createElement("img");
        const dogName = document.createElement('h2');
        const dogBtn = document.createElement('button');

        dogInfo.innerText = ""; 
        dogImage.src = dog.image;
        dogName.innerText = dog.name;
        dogBtn.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        
        dogBtn.addEventListener('click', () => {

            if(dogBtn.innerText === 'Good Dog!'){
                dogBtn.innerText = 'Bad Dog!';
                dog.isGoodDog = false;
            } else {
                dogBtn.innerText = 'Good Dog!';
                dog.isGoodDog = true;
            }
            updateGoodDog(dog)            
        })

    dogInfo.append(dogImage, dogName, dogBtn)
}


function updateGoodDog(dog){


    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dog)
    })
    .then((resp) => resp.json())
    .then((msg) => console.log(msg))

}

function useFilter(dogFilter, dogArray){



    if(dogFilter.innerText === "Filter good dogs: OFF"){
        dogFilter.innerText = "Filter good dogs: ON";
        const goodDogs = dogArray.filter((dog) =>{
            return dog.isGoodDog;
        })

        goodDogs.forEach(renderDog)
    } else{
        dogFilter.innerText = "Filter good dogs: OFF";
        dogArray.forEach(renderDog);
    }


    //console.log(goodDogs);


}

document.addEventListener("DOMContentLoaded", init)