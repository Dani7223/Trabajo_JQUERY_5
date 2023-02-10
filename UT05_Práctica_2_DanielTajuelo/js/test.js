// Variables globales
let area;
let area2;
let cube;
let cubes = [];
let i = 0;
let iz = 60;

// Área para el proyecto
let main = $("main");
area = $("<div></div>");
main.append(area);

//Añadimos la clase container al area
$(area).addClass("container");

//Le damos estilo al area
$(area).css({
    border: "2px solid red",
    height: "400px",
    position: "relative"
}
);

//Creamos el evento de mostrar la coordenadas con el movimiento del ratón dentro del area
area.on("mousemove", getCoordinates);

//Función que nos devuelve las coordenadas donde está el ratón
function getCoordinates(event) {
    x = event.offsetX;
    y = event.offsetY;

    $('#x').val(x);
    $('#y').val(y);

}
//Le damos com valor a los inputs de la x y la y los que sacamos de la función
//getCoordinates
$('#x').val(x);
$('#y').val(y);


//Insertamos dentro del main el area
main.before(area)


//Creamos el area de los borrados
area2 = $("<div></div>");
$(area2).addClass("container2");

//Le damos estilo al area de los borrados
$(area2).css({
    border: "2px solid black",
    height: "100px",
    position: "relative",
    padding: "10px"
}
);

//Insertamos dentro del main el area2
$(main).before(area2)


// Cubo inicial
cube = $("<div></div>")

//Le damos estilo al cubo inicial
$(cube).css({
    background: "red",
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "100px",
    left: "150px"

}
);

//Añadimos el cubo al area
$(area).append(cube);

//Función para mover hacia arriba el cubo inicial
function moveUp(cube) {
    var offset = $(cube).offset();

    let top = offset.top;
    top -= 20;
    //Comprobamos que no nos pasamos de alto moviendo hacia arriba con el cubo
    top = (top < 0) ? 0 : top;

    //Le damos la altura al cubo
    $(cube).css({
        top: top + "px"
    }
    );

}
//Función para mover hacia abajo el cubo inicial
function moveDown(cube) {
    var offset = $(cube).offset();

    var offset2 = $(cube).get(0).offsetHeight;

    var offset3 = $(area).get(0).offsetHeight;

    let top = offset.top;
    top += 20;
    //Comprobamos que no nos pasemos con el cubo por la parte de abajo
    top = (top > offset3 - offset2) ? offset3
        - offset2 : top;

    //Le damos la propiedad top según el ternario de arriba
    $(cube).css({
        top: top + "px"
    }
    );
}
//Función para mover hacia la izquieda el cubo inicial
function moveLeft(cube) {
    var offset = $(cube).offset();

    let left = offset.left;
    left -= 20;
    //Controlamos que no nos pasemos del borde de la izquierda del area
    left = (left < 0) ? 0 : left;

    //Le ponemos la propiedad left que será su posición de la izquierda
    $(cube).css({
        left: left + "px"
    }
    );
}
//Función para mover hacia la derecha el cubo inicial
function moveRight(cube) {

    var offset = $(cube).offset();

    var offset2 = $(cube).get(0).offsetWidth;

    var offset3 = $(area).get(0).offsetWidth;


    let left = offset.left;
    left += 20;
    //Controlamos que no nos pasemos del borde de la derecha del area
    left = (left > offset3 - offset2) ? offset3 -
        offset2 : left;

    $(cube).css({
        left: left + "px"
    }
    );

}
//Función para cambiar el color aleatoriamente
function randomColor(cube) {
    let r = Math.floor((Math.random() * 256));
    let g = Math.floor((Math.random() * 256));
    let b = Math.floor((Math.random() * 256));

    //Le ponemos de background el color aleatorio que haya salido
    $(cube).css({
        background: `rgb(${r}, ${g}, ${b})`
    }
    );

}

//Función para hacer más grande el cubo
function makeBigger(cube) {

    var offset = $(cube).offset();

    var width = $(cube).get(0).offsetWidth;

    var height = $(cube).get(0).offsetHeight;

    var area1 = $(area).get(0).offsetHeight;


    //Definimos unas variables que guardan datos del cubo
    // y la altura del area 
    let top = offset.top;

    //Controlamos que el cubo no se salga del area
    if (!(top > (area1 - height))) {

        //Incrementamos la altura y la anchura
        width = width + 5;
        height = height + 5;


        //Le damos la altura y anchura que se nos pasa
        $(cube).css({
            width: width + "px",
            height: height + "px"
        }
        );

    }

}


//Función que hace más pequeño el cubo hasta llegar al mínimo
function makeSmaller(cube) {

    var offset = $(cube).offset();


    //Guardamos la altura y anchura del cubo
    let width = $(cube).css("width");
    let height = $(cube).css("height");

    //Controlamos que el cubo no pueda ser más pequeño que 10px
    if (!((width == "10px") && (height == "10px"))) {
        let width = $(cube).get(0).offsetWidth;
        let height = $(cube).get(0).offsetHeight;


        //Decrementamos la altura y la anchura
        width = width - 5;
        height = height - 5;

        //Le damos la altura y anchura que se nos pasa
        $(cube).css({
            width: width + "px",
            height: height + "px"
        }
        );
    }


}



let acctions = [];


function addAction(action) {

    let span = $("<span></span>");
    area.append(span);

    acctions.push({
        action: action,
        span: span
    });
    $(span).text(action);

    $(span).css({
        padding: "10px",
        border: "1px solid #ddd0px",
        display: "block",
        float: "left",
        margin: "2px",
        cursor: "pointer"

    }
    );


    $(span).addClass("span");

    $(span).on("mouseenter", function () {
        $(this).css({
            backgroundColor: "red",
            color: "white"
        })
    });


    $(span).on("mouseleave", function () {
        $(this).css({
            backgroundColor: "white",
            color: "black"
        })
    });

    $(span).on("click", function () {
        let index = acctions.findIndex((action) => {
            return action.span === this;
        })
        acctions.splice(index, 1);
        this.remove();
    });


    $(area).append(span);
}


//Creamos un evento para el index, dependiendo de la tecla que se toque pasará un acción u otra
$(document).ready(function () {
    $(document).keydown(function (event) {
        console.log(event.code);
        switch (event.code) {
            case "ArrowUp":
                addAction("up");
                break;
            case "ArrowDown":
                addAction("down");
                break;
            case "ArrowLeft":
                addAction("left");
                break;
            case "ArrowRight":
                addAction("right");
                break;
            case "KeyC":
                addAction("color");
                break;
            case "BracketRight":
                addAction("more");
                break;
            case "Slash":
                addAction("less");
                break;
            case "Enter":
                executeAcctions();
                break;
            default:
                break;
        }
        event.preventDefault()
    })

});


//Función para ejecutar las acciones que se pasa con las teclas
function executeAcctions() {
    if (acctions.length > 0) {
        let action = acctions.shift();
        switch (action.action) {
            case "up":
                moveUp(cube);
                break;
            case "down":
                moveDown(cube);
                break;
            case "left":
                moveLeft(cube);
                break;
            case "right":
                moveRight(cube);
                break;
            case "color":
                randomColor(cube);
                break;
            case "more":
                makeBigger(cube);
                break;
            case "less":
                makeSmaller(cube);
                break;
            default:
                break;
        }
        action.span.remove();
        setTimeout(executeAcctions, 50);
    }
}


//Declaramos el contenedor donde van los cubos
let contain = $(".container")


//Creamos nuestro evento personalizado
let nuevoCubo = new Event(contain.on("click", function (elem) {


    if ((elem.target.classList == "container")) {
        let cube1 = $('<div></div>');

        $(area).append(cube1);

        i++;

        cubes.push({
            instance: i,
            cube: cube1,
        });


        cube1.text(i);
        cube1.addClass("cube2");

        $(cube1).css({
            background: "red",
            width: "50px",
            height: "50px",
            position: "absolute",
            top: (y - 10) + "px",
            left: (x - 10) + "px"

        }
        );

        //Evento que borra los cuadrados que hemos creado nuevos si pulsamos sobre ellos
        $(cube1).on("click", function () {
           


            let index = cubes.findIndex((cu) => {
                return cu.cube === this;
            });

            cubes.splice(index, 1);
            this.remove();

            //Los colocamos en la parte de los borrados
            $(cube1).css({
                top: "40px",
                left: iz + "px"

            }
            );

            iz = iz + 80;

            //Solo vamos a permitir una número de cuadrados
            if (iz > $(area2).offsetWidth - $(cube1).offsetWidth) {
                alert("No se pueden guardar más cuadrados!");
            } else {
                //Quitamos la classlist de cube2 y le añadimos cube3 para diferenciar que se ha borrado
                cube1.removeClass("cube2");
                cube1.addClass("cube3");
                area2.append(cube1);
            }

        });

        area.append(cube1);


        // Para los nuevos cubos, ya que solo se les cambiará el color
        document.addEventListener("keydown", function (event) {

            switch (event.code) {
                case "KeyC":
                    if (cube1.get(0).classList != "cube3") {
                        addAction("color");
                    }
                    break;
                case "Enter":

                    executeAcctions();
                    break;
                default:
                    break;
            }
            event.preventDefault();



        });


        //Función para ejecutar el cambio de color
        function executeAcctions() {
            if (acctions.length > 0) {
                let action = acctions.shift();
                switch (action.action) {
                    case "color":
                        if (cube1.get(0).classList != "cube3") {
                            randomColor(cube1);
                        }

                        break;
                    default:
                        break;
                }
                action.span.remove();
                setTimeout(executeAcctions, 50);
            }
        }

    }

}));

//Lanzamos nuestro evento personalizado
area[0].dispatchEvent(nuevoCubo);



