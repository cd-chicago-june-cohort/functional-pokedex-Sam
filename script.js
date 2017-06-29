//takes in a number outputs an image
function pokepic(dex) {
    return "<div class='frames'><img class='pokemon' id='p" + dex + "' src='http://pokeapi.co/media/img/" + dex + ".png'></div>";
};


//function that outputs every pokemon's picture in a div
function pokedex() {
    var str = "";
    for (var i = 1; i <= 151; i++) {
        str = str + pokepic(i);
    }
    return str;
}

//retrieve numerical value from img id
function retrieveNum(id) {
    var str = id.slice(1, id.length);
    var num = Number(str);
    return num;
}

//function that takes in a number and outputs a url
function spitURL(num) {
    return "http://pokeapi.co/api/v1/pokemon/" + num + "/";
}

//takes in all necessary info and spits out html
function infoBox(name, imgnum, type, height, weight) {
    var str = '';
    for (var i = 0; i < type.length; i++) {
        str = str + '<p>' + type[i].name + '</p>';
    }
    return "<h2 class='name'>" + name + "</h2><img class='info-pic' src=http://pokeapi.co/media/img/" + imgnum + ".png>" + "<h4>Type(s):</h4>" + str + "<h4>Height:</h4><p>" + height + "</p><h4>Weight:</h4><p>" + weight + "</p>";
};


//main doc function
$('document').ready(function () {
    $('#container').html(pokedex());
        
    $('.pokemon').click(function() {
        var imgid = $(this).attr('id');
        var num = retrieveNum(imgid);
        var myURL = spitURL(num);
        $.get(myURL, function(pokedata) {
            //console.log(pokedata.name);
            var name = pokedata.name;
            var imgnum = num;
            var type = pokedata.types;
            var height = pokedata.height;
            var weight = pokedata.weight;
            $('#info').html(infoBox(name, imgnum, type, height, weight));
        }, "json");
    });
});