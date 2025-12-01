// Games page functionality

let currentPage = 1
let totalPages = 10
const currentFilters = {
  search: "",
  genre: "",
  sort: "newest",
}

// Mapeo de IDs de juego a sus archivos HTML
const gamePages = {
  1: "cyberpunk2077.html",
  2: "GTA V.html",
  3: "red_dead_redemption2.html",
  4: "the_witcher_3_wh.html",
  5: "days_gone_remastered.html",
  6: "forza_horizon_5.html",
  7: "formula_1_22_champions_edition.html",
  8: "elden_ring.html",
  9: "half_life_alyx.html",
  10: "portal_2.html",
  11: "the_elder_scroll_v_skyrim_se.html",
  12: "minecraft_java_edition.html",
  13: "call_of_duty_modern_warfare(2019).html",
  14: "need_for_speed_heat.html",
  15: "grid_autosport.html",
  16: "alan_wake_2.html",
  17: "silent_hill_f.html",
  18: "dying_light_the_beast.html",
  19: "fifa_23.html",
  20: "nba_2k23.html",
  21: "wwe_2k25_the_bloodline_edition.html",
  22: "far_cry_6.html",
  23: "battlefield_1.html",
  24: "metro_exodus.html",
  25: "farming_simulator_25.html",
  26: "car_mechanic_simulator_2021.html",
  27: "goat_simulator_3.html",
  28: "crusader_kings_lll_royal_edition.html",
  29: "mount_&_blade_ll_bannerlord.html",
  30: "dota_2.html",
  31: "thrive_heavy_lies_the_crown.html",
  32: "cocoon.html",
  33: "unravel_2.html",
  34: "valiant_hearts_the_great_war.html",
  35: "god_of_war.html",
  36: "hollow_knight_silksong.html"
};

// Sample games data
const gamesData = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    genre: ["action", "rpg", "adventure"],
    description: " Cyberpunk 2077 es una historia de acción y aventura en mundo abierto ambientada en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal. Tu personaje es V, un mercenario que persigue un implante único que permite alcanzar la inmortalidad. Podrás personalizar las mejoras cibernéticas, las habilidades y el estilo de juego del personaje para dar forma a un mundo y a una historia que depende de tus decisiones.",
    rating: 4.3,
    image: "assets/images/juegos/cyberpunk 2077/cover.jpg",
    size: "78.5 GB",
    releaseDate: "2024-01-01",
  },
  {
    id: 2,
    title: "GTA V (Grand Theft Auto 5)",
    genre: ["action", "sandbox", "adventure"],
    description:"La historia de GTA V nos muestra a un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor y más desquiciado del mundo criminal, del gobierno de los EE. UU. y de la industria del espectáculo, tendrán que llevar a cabo una serie de peligrosos golpes para sobrevivir en una ciudad implacable en la que no pueden confiar en nadie. Y mucho menos los unos en los otros.",
    rating: 4.8,
    image: "assets/images/juegos/gta v/cover.jpg",
    size: "60.1 GB",
    releaseDate: "2024-01-02",
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    genre: ["action", "sandbox", "adventure"],
    description:"Red Dead Redemption 2 es un videojuego de mundo abierto ambientado en el corazón de América en el año 1899 y desarrollado por Rockstar, creadores de GTA V y Red Dead Redemption entre otros premiados títulos de perfil sandbox. La historia de Arthur Morgan, (no Nate Harlow héroe de Red Dead Revolver, ni tampoco John Marston, el protagonista del Redemption original) es una aventura western con una extraordinaria atmósfera y ambientación muy cuidada y centrada en la naturaleza que, además de modo individual de juego, también presenta multijugador centrado en seguir la senda de GTA Online.",
    rating: 4.8,
    image: "assets/images/juegos/red dead redemption 2/cover.jpg",
    size: "103 GB",
    releaseDate: "2024-01-03",
  },
  {
    id: 4,
    title: "The Witcher 3 Wild Hunt Complete Edition",
    genre: ["action","rpg","sandbox"],
    description:"The Witcher: Wild Hunt es un juego de rol de mundo abierto de nueva generación con una apasionante trama, ambientado en un espectacular universo de fantasía lleno de decisiones trascendentales y consecuencias impactantes. En The Witcher encarnas a Geralt de Rivia, un cazador de monstruos profesional que tiene que encontrar a la muchacha protagonista de una profecía en un amplio mundo abierto y rebosante de ciudades comerciales, islas con piratas vikingos, peligrosos puertos de montaña y cuevas olvidadas.",
    rating: 4.25,
    image: "assets/images/juegos/the witcher 3 wild hunt/cover.jpg",
    size: "33.38 GB",
    releaseDate: "2024-01-04",
  },
  {
    id: 5,
    title: " Days Gone Remastered (2021)",
    genre: ["action","sandbox","adventure"],
    description:"  Ponte en los zapatos salpicados de barro del otrora forajido Deacon St. John, un motero cazarrecompensas que intenta buscar una razón por la que vivir en una tierra rodeada de muerte. Registra asentamientos abandonados en busca de equipamiento para crear armas y objetos valiosos o arriésgate a tratar con otros supervivientes que se ganan la vida a duras penas mediante intercambios justos… u otros métodos más violentos.",
    rating: 4.0,
    image: "assets/images/juegos/days gone remastered/cover.jpg",
    size: "28.3 GB",
    releaseDate: "2024-01-05",
  },
  {
    id: 6,
    title: "Forza Horizon 5 Premium Edition (2021)",
    genre: ["action","racing","adventure","simulation","sports"],
    description:"¡Te espera tu aventura definitiva en Horizon! Conduce cientos de autos fenomenales de todo el mundo en emocionantes expediciones a lo largo y ancho de los impactantes paisajes de México, en un juego ambientado en un mundo abierto que está en constante evolución.",
    rating: 4.65,
    image: "assets/images/juegos/forza horizon 5/cover.jpg",
    size: "132.24 GB",
    releaseDate: "2024-01-06",
  },
  {
    id: 7,
    title: "Formula 1 F1® 22 (2022)",
    genre: ["racing","simulation","sports"],
    description:"Entra en la nueva era de la Formula 1 en EA SPORTS™ F1® 22, el videojuego oficial de FIA Formula One World Championship™ 2022. Ponte al volante en una nueva temporada con coches rediseñados y nuevas reglas que definen el día de la carrera, pon a prueba tus habilidades en el nuevo Autódromo Internacional de Miami y disfruta del glamour y la ostentación de la vida en la F1®.",
    rating: 4.05,
    image: "assets/images/juegos/formula 1 22 champions edition/cover.jpg",
    size: "27.5 GB",
    releaseDate: "2024-01-07",
  },
  {
    id: 8,
    title: "Elden Ring",
    genre: ["action","rpg"],
    description:"En Elden Ring, nos encontraremos con un vasto mundo perfectamente conectado en el que los territorios abiertos estarán repletos de situaciones y mazmorras enormes con diseños complejos y tridimensionales. Mientras exploras, experimentarás el deleite de descubrir amenazas desconocidas y sobrecogedoras, y eso te haré sentir la emoción de la superación. Además de personalizar la apariencia de tu personaje, puedes combinar libremente las armas, armaduras y la magia que te equipas. Puedes desarrollar a tu personaje según tu estilo de juego, tanto para aumentar tu fuerza bruta y ser un guerrero poderoso, como para dominar la magia.",
    rating: 4.7,
    image: "assets/images/juegos/elden ring 2022/cover.jpg",
    size: "62.44 GB",
    releaseDate: "2024-01-08",
  },
  {
    id: 9,
    title: "Half-Life: Alyx (2020) + [NoVR mod]",
    genre: ["action","adventure"],
    description:"Half-Life: Alyx es el regreso de Valve en realidad virtual a la serie Half-Life. Es la historia de una lucha imposible contra una raza alienígena cruel conocida como la Alianza, situada entre los eventos de Half-Life y Half-Life 2. Jugando como Alyx Vance, eres la única oportunidad de supervivencia de la humanidad. El control de la Alianza sobre el planeta desde el incidente de Black Mesa solo se ha fortalecido a medida que acorralan a los habitantes que quedan en las ciudades. Entre ellos se encuentran algunos de los mejores científicos de la Tierra: tú y tu padre, el Dr. Eli Vance.",
    rating: 4.65,
    image: "assets/images/juegos/half life alyx/cover.jpg",
    size: "43.0 GB",
    releaseDate: "2024-01-09",
  },
  {
    id: 10,
    title: "Portal 2",
    genre: ["adventure","puzzle"],
    description:"Portal 2 juego para Pc lanzado el año 2011 continúa con esa fórmula ganadora consistente en una innovadora mecánica de juego, historia y música que condujeron al Portal original a ganar más de 70 galardones y lo convirtieron en un nuevo mito de la industria. En el modo de un jugador de Portal 2 conoceremos a un nuevo elenco de personajes, gran cantidad de innovadores puzles y un número mucho mayor de enrevesadas salas de pruebas. Los jugadores podrán explorar zonas de Aperture Science Labs nunca vistas anteriormente y volverán a encontrarse a GLaDOS, ese compañero computerizado, y en ocasiones con tendencias asesinas, que los guió a lo largo el juego original.",
    rating: 4.75,
    image: "assets/images/juegos/portal 2/cover.jpg",
    size: "6.63 GB",
    releaseDate: "2024-01-10",
  },
  {
    id: 11,
    title: "The Elder Scrolls V Skyrim Special Edition",
    genre: "rpg",
    description:"Skyrim Special Edition, ganador de más de 200 premios al «Juego del año», da vida a la fantasía épica con un nivel de detalle asombroso. La Special Edition incluye el juego aclamado por la crítica y los complementos, así como nuevas características: gráficos y efectos renovados, rayos crepusculares volumétricos, reflejos en tiempo real, profundidad de campo dinámica y muchas más. Además, Skyrim Special Edition lleva todo el poder de los mods a PC y Xbox One: nuevas misiones, entornos, personajes, diálogos, armaduras y armas, entre otras muchas cosas. ¡Con los mods, la experiencia no tiene límites!",
    rating: 4.2,
    image: "assets/images/juegos/the elder scroll v skyrim special edition/cover.jpg",
    size: "13.6 GB",
    releaseDate: "2024-01-11",
  },
  {
    id: 12,
    title: "MineCraft: Java Edition",
    genre: ["strategy","sandbox","adventure"],
    description:"Minecraft es un titulo que llego en primicia para PC de mundo abierto, por lo que no posee un objetivo específico, brindándole la posibilidad al jugador una gran libertad en cuanto a la elección de su forma de jugar, a pesar de ello el juego posee ciertos objetivos que cumplir. El modo de juego predeterminado es en primera persona, aunque los jugadores tienen la posibilidad de cambiarlo a tercera persona.",
    rating: 4.65,
    image: "assets/images/juegos/minecraft java edition/cover.jpg",
    size: "541.36 MB",
    releaseDate: "2024-01-12",
  },
  {
    id: 13,
    title: "Call of Duty Modern Warfare (2019)",
    genre: ["action","fps"],
    description:"El estudio encargado del desarrollo del  Call of Duty Modern Warfare (2019) PC GAME ha apostado por una reimaginación del Moder Warfare; En esta entrega nos encontraremos con una guerra moderna que además recupera a alguno de los personajes del Modern Warfare original como el capitán John Price. El juego de Activision alterna su acción entre el control de las fuerzas especiales Tier 1 y un grupo de rebeldes en Afganistán, que lucha contra los terroristas.",
    rating: 4.5,
    image: "assets/images/juegos/call of duty modern warfare(2019)/cover.jpg",
    size: "181.53 GB",
    releaseDate: "2024-01-13",
  },
  {
    id: 14,
    title: "Need for Speed Heat (2019)",
    genre: ["racing"],
    description:"Llega NFS Heat para PC permitiendole a los jugadores disfrutar de una emocionante experiencia de carreras en la que te enfrentas a la policía corrupta de una ciudad mientras luchas por alcanzar la élite de las carreras callejeras. Arriésgate, llévate victorias: Juégatelo todo durante el día en el Enfrentamiento de Speedhunters y compite para ganar bank en eventos de carrera, derrape y todoterreno. Luego, apodérate de la ciudad por la noche y métete en las carreras callejeras subterráneas para forjar tu reputación. Sé ingobernable, sé expresivo: Con aún más opciones para personalizar tu depósito de autos y tu identidad al volante, este no es el momento de pisar el freno: sé único y asegúrate de que todo el mundo sepa quién eres. Aguanta la presión policial: Tendrás que esforzarte para enfurecer a los policías que patrullan Palm City durante el día. Pero al oscurecer, las reglas cambian cuando un grupo especial canalla sale a las calles en busca de ti y de tus ruedas.",
    rating: 4.5,
    image: "assets/images/juegos/need for speed heat/cover.jpg",
    size: "24.47 GB",
    releaseDate: "2024-01-14",
  },
  {
    id: 15,
    title: "GRID Autosport Complete Edition",
    genre: ["racing","simulation"],
    description:"GRID Autosport es un juego para PC del Genero Simulación y Conducción donde ficharemos por un equipo y tendremos que enfrentarnos en nuevos retos a duros rivales junto con nuestro compañero de fila y de equipo, de esta forma debemos cumplir los objetivos que el patrocinador en duras competencias  donde cada adelantamiento vale su peso en oro Especialízate en la disciplina que más te apasione o domínalas todas a lo largo de una amplísima trayectoria: siente la agresividad de las carreras de turismos, gestiona bien los neumáticos en las pruebas nocturnas de resistencia, pilota con aplomo en las competiciones de monoplazas, demuestra tu habilidad en las pruebas de tuning y haz gala de reflejos felinos en las carreras urbanas. Aquí tendremos que competir con diferentes monoplaza supermodificados  coches de drifting y mucho mas",
    rating: 3.7,
    image: "assets/images/juegos/grid autosport/cover.jpg",
    size: "5.84 GB",
    releaseDate: "2024-01-15",
  },
  {
    id: 16,
    title: "Alan Wake 2",
    genre: ["horror","action","adventure"],
    description:"En Alan Wake 2 para PC con Crack viajamos hasta Bright Falls, donde una serie de asesinatos rituales amenaza esta pequeña comunidad rodeada por la naturaleza en la costa noroeste del Pacífico. Saga Anderson, una agente del FBI veterana con fama de resolver casos imposibles, llega para dar con el culpable. Lo que comienza como la investigación de un asesinato se convierte rápidamente en un viaje de pesadilla.",
    rating: 4.5,
    image: "assets/images/juegos/alan wake 2/cover.jpg",
    size: "83.63 GB",
    releaseDate: "2024-01-16",
  },
  {
    id: 17,
    title: "SILENT HILL f",
    genre: ["horror","action","adventure"],
    description:"Adéntrate en el mundo de Hinako creado por el famoso autor Ryukishi07, con una música hipnótica, que incluye piezas de Akira Yamaoka, y unas imágenes maravillosas en las que transcurre una historia apasionante de duda, arrepentimiento y decisiones ineludibles. ¿Acabará Hinako abrazando la belleza oculta del terror o sucumbirá a la locura que la aguarda más allá?",
    rating: 4.3,
    image: "assets/images/juegos/silent hill f/cover.jpg",
    size: "41.6 GB | 31.6 GB",
    releaseDate: "2024-01-17",
  },
  {
    id: 18,
    title: "Dying Light: The Beast Deluxe Edition (2025)",
    genre: ["horror","action","adventure","rpg"],
    description:"Eres Kyle Crane, y tras haber sido atrapado por el Barón y sufrir sus horribles experimentos durante años, consigues escapar. Pero las secuelas de ese horror permanecen. Estás a un paso de convertirte en un monstruo, ya que tienes ADN zombi aparte de humano. Apenas puedes controlar a la bestia que hay en tu interior, con todos los problemas que eso conlleva. Pero tendrás que aprender a controlarla si quieres vengarte del hombre que te hizo todo esto.",
    rating: 4.0,
    image: "assets/images/juegos/dying light the beast/cover.jpg",
    size: "39.67 GB",
    releaseDate: "2024-01-18",
  },
  {
    id: 19,
    title: "FIFA 23 (2022)",
    genre: ["sports","simulation"],
    description:"FIFA 23 es un simulador de fútbol de EA Sports, el último bajo esta denominación, que busca ofrecer al usuario el mejor videojuego de fútbol de la historia con más características, modos de juego, contenido del Mundial, clubes, ligas, competiciones y jugadores. Desde la firma norteamericana apuestan por llevar el juego del mundo al campo, con la tecnología HyperMotion2 que ofrece una experiencia de juego aún más realista, tanto la Copa del Mundo masculina como la femenina, que llegarán al juego más adelante en forma de actualización, la incorporación de equipos femeninos, funciones de juego cruzado, y mucho más.",
    rating: 3.9,
    image: "assets/images/juegos/fifa 23/cover.jpg",
    size: "42.3 GB",
    releaseDate: "2024-01-19",
  },
  {
    id: 20,
    title: "NBA 2K23 (2022)",
    genre: ["sports","simulation"],
    description:"Siente un estilo de juego refinado en la palma de tus manos a ambos lados del balón en NBA 2K23. Ataca la canasta con un nuevo arsenal de movimientos ofensivos basados en la habilidad, mientras das rienda suelta a tu potencial como defensor con nuevas mecánicas de 1 contra 1 para bloquear a los jugadores rivales en todo momento. Embárcate en un viaje de baloncesto a bordo de un espacioso crucero equipado con canchas inmaculadas, vistas panorámicas. Además, hay aún más para explorar durante las excursiones en tierra.",
    rating: 4.0,
    image: "assets/images/juegos/nba 2k23/cover.jpg",
    size: "74.85 GB",
    releaseDate: "2024-01-20",
  },
  {
    id: 21,
    title: "WWE 2K25 The Bloodline Edition",
    genre: ["sports","simulation"],
    description:"WWE 2K25 te trae una selección sin igual de Superstars actuales, Leyendas y miembros del Salón de la Fama. La lista de más de 300 jugadores abarca varias generaciones y cuenta con Seth «Freakin» Rollins, Undertaker, «The American Nightmare» Cody Rhodes, CM Punk, Jade Cargill y muchos más.",
    rating: 4.0,
    image: "assets/images/juegos/wwe 2k25 the bloodline edition/cover.jpg",
    size: "86.59 GB",
    releaseDate: "2024-01-21",
  },
  {
    id: 22,
    title: "Far Cry 6",
    genre: ["fps","action","adventure"],
    description:"Far Cry 6 para PC es un videojuego de acción y disparos en mundo abierto protagonizado por Dani Rojas, un guerrillero local (a elegir entre hombre o mujer) de Yara que lucha por la liberación de su nación contra Antón Castillo — interpretado por Giancarlo Esposito, Gus Fring en la recordada Breaking Bad— y su hijo. Desarrollado por Ubisoft Toronto, Far Cry 6 para PC ambienta su acción en Yara, un paraíso tropical detenido en el tiempo en el que el jugador ha de luchar contra las tropas de su tiránico gobernante a través a junglas, playas y Esperanza, la caótica capital de este ficticio país del Caribe, valiéndose para ello de armas improvisadas, vehículos y, una vez más, nuevos compañeros animales.",
    rating: 3.9,
    image: "assets/images/juegos/far cry 6/cover.jpg",
    size: "43.6 GB",
    releaseDate: "2024-01-22",
  },
  {
    id: 23,
    title: "Battlefield 1 Ultimate Edition",
    genre: ["fps","action"],
    description:"<strong>Battlefield 1</strong> te lleva hasta la Primera Guerra Mundial, donde nueva tecnología y un conflicto a nivel mundial cambiaron la guerra para siempre. Participa en cada batalla, controla cada enorme vehículo y ejecuta cada maniobra que transforma por completo un combate. El mundo entero está en guerra: checa qué hay tras las trincheras.",
    rating: 4.4,
    image: "assets/images/juegos/battlefield 1/cover.jpg",
    size: "21.7 GB",
    releaseDate: "2024-01-23",
  },
  {
    id: 24,
    title: "Metro Exodus Enhanced Edition",
    genre: ["fps","action"],
    description:"Es el año 2036 y un cuarto de siglo después de que la guerra nuclear devastara la tierra, unos pocos miles de supervivientes se aferran a la vida bajo las ruinas de Moscú, en los túneles del metro. Han sufrido intoxicaciones, luchado contra bestias mutantes y horrores paranormales y pasado el terror de la guerra civil. Ahora, en el papel de Artyom, debes escapar del metro y liderar una banda de comandos espartanos en un viaje increíble por todo el continente en la Rusia postapocalíptica para empezar una vida nueva en el este.",
    rating: 4.1,
    image: "assets/images/juegos/metro exodus/cover.jpg",
    size: "66.6 GB | 56.7 GB",
    releaseDate: "2024-01-24",
  },
  {
    id: 25,
    title: "Farming Simulator 2",
    genre: ["simulation"],
    description:"Construye una granja junto a ríos sinuosos y elevadores de grano históricos en América del Norte, rodeada de estanques en Europa central o en un paisaje exuberante de Asia oriental repleto de arrozales junto a una ciudad portuaria iluminada con luces de neón. Cultiva, cría animales, practica la silvicultura y gestiona un imperio agrícola formado por tiendas, producciones y construcciones.",
    rating: 3.8,
    image: "assets/images/juegos/farming simulator 25/cover.jpg",
    size: "25.51 GB",
    releaseDate: "2024-01-25",
  },
  {
    id: 26,
    title: "Car Mechanic Simulator 2021",
    genre: ["simulation"],
    description:"<strong>Car Mechanic Simulator 2021</strong> es una nueva producción con una base de jugadores bien establecida. Empieza como el nuevo propietario de un taller de coches y ábrete camino hasta la cumbre del sector. Ensúciate las manos en un juego de simulación altamente realista con gran atención a los detalles. Prepárate para trabajar con más de 4000 piezas únicas y más de 72 coches. Arremángate y sumérgete en un entorno de taller altamente realista.",
    rating: 4.5,
    image: "assets/images/juegos/car mechanic simulator 2021/cover.webp",
    size: "10.99 GB",
    releaseDate: "2024-01-26",
  },
  {
    id: 27,
    title: "Goat Simulator 3",
    genre: ["simulation","adventure","sandbox"],
    description:"Prepárate para volver a cabrear a todo el mundo. ¡Lame cosas, da cabezazos y destrózalo todo en un nuevo mundo abierto en la mayor pérdida de tiempo desde Goat Simulator! No vamos a decirte cómo jugar (fuera del tutorial); solo vamos a darte las herramientas que necesitas para convertirte en la cabra que siempre quisiste ser. Reúne a tu rebaño y lánzate a la aventura en Goat Simulator 3: una experiencia de campo sandbox totalmente nueva y realista que te pone una vez más en las pezuñas de la protagonista favorita de nadie.",
    rating: 4.0,
    image: "assets/images/juegos/goat simulator 3/cover.jpg",
    size: "4.61 GB",
    releaseDate: "2024-01-27",
  },
  {
    id: 28,
    title: "Crusader Kings III Royal Edition",
    genre: ["strategy","simulation","rpg"],
    description:"Paradox Development Studio te trae la secuela de uno de los juegos de estrategia más populares que existen. Crusader Kings III es el heredero de un largo legado de experiencias de gran estrategia histórica y llega con un montón de formas nuevas de garantizar el éxito de tu casa real.",
    rating: 4.5,
    image: "assets/images/juegos/crusader kings lll royale edition/cover.jpg",
    size: "5.29 GB",
    releaseDate: "2024-01-28",
  },
  {
    id: 29,
    title: "Mount & Blade II: Bannerlord",
    genre: ["strategy","rpg"],
    description:"<strong> Mount & Blade II: Bannerlord</strong> es la esperadísima continuación del aclamado simulador de combate medieval y juego de rol Mount & Blade: Warband. Está ambientada 200 años antes y expande el minucioso sistema de combate y el mundo de Calradia. Bombardea fortalezas montañosas con armas de asedio, establece imperios criminales secretos en los callejones oscuros de las ciudades o cabalga hacia batallas caóticas en tu búsqueda del poder.",
    rating: 4.0,
    image: "assets/images/juegos/mount & blade ll bannerlord/cover.jpeg",
    size: "31.6 GB",
    releaseDate: "2024-01-29",
  },
  {
    id: 30,
    title: "Dota 2",
    genre: ["strategy"],
    description:"Dota comenzó como una modificación para Warcraft 3 creada por usuarios del mismo título y se ha convertido en uno de los juegos online más jugados del mundo. Siguiendo la tradición de Counter-Strike, Day of Defeat, Team Fortress, Portal y Alien Swarm, Dota 2 es el resultado de la contratación por parte de Valve de la comunidad de desarrolladores que creó el mod, ofreciéndole una oportunidad para, finalmente, desarrollar un producto completo, con sus ideas y la ayuda de un equipo profesional de programadores y artistas de Valve.",
    rating: 4.5,
    image: "assets/images/juegos/dota 2/cover.jpeg",
    size: "~60 GB",
    releaseDate: "2024-01-30",
  },
  {
    id: 31,
    title: "Thrive: Heavy Lies The Crown",
    genre: ["strategy"],
    description:"<strong>Thrive: Heavy Lies the Crown</strong> es un juego de construcción de ciudades ambientado en un universo de fantasía medieval, con combates en tiempo real y una constante y profunda toma de decisiones. La corona de Aldamor acaba de llegar a tus manos. Únete a los supervivientes de la catástrofe en su viaje hacia un nuevo hogar, la extraña tierra de Nysamor. Juntos, levantaran un gran reino y construirán un gran legado.",
    rating: 3.5,
    image: "assets/images/juegos/thrive heavy lies the crown/cover.jpg",
    size: "3.26 GB",
    releaseDate: "2024-01-31",
  },
  {
    id: 32,
    title: "Cocoon",
    genre: ["puzzle","adventure"],
    description:"Jeppe Carlsen, el diseñador de jugabilidad principal que dio vida a LIMBO e INSIDE, presenta ahora COCOON, un juego que te llevará de aventuras a través de mundos dentro de mundos. Domina las mecánicas que te permiten saltar de un mundo a otro para descubrir un misterio cósmico.",
    rating: 4.4,
    image: "assets/images/juegos/cocoon/cover.png",
    size: "686.3 MB",
    releaseDate: "2024-02-01",
  },
  {
    id: 33,
    title: "Unravel 2",
    genre: ["puzzle","adventure"],
    description:"<strong>Unravel 2</strong> es una estupenda aventura de plataformas vista desde una perspectiva única (o dos). Controla a una pareja de Yarnys, pequeños seres hechos de lana y conectados por una hebra, en cooperativo local o en solitario. Corre, salta y balancéate resolviendo puzles de plataformas, haz crecer la amistad e ilumina un mundo cubierto de sombras.",
    rating: 3.8,
    image: "assets/images/juegos/unravel 2/cover.jpeg",
    size: "3.89 GB",
    releaseDate: "2024-02-02",
  },
  {
    id: 34,
    title: "Valiant Hearts The Great War",
    genre: ["puzzle","adventure"],
    description:"<strong>Valiant Hearts The Great War</strong> es juego de una aventura 2D que combina puzles, plataformas y momentos de sigilo, ambientada en la primera Guerra Mundial. El videojuego esta inspirado en los cómics europeos donde nos relatara la historia de 5 personajes de diferente nacionalidad en el arduo campo de batalla. Que esperas para bajarlo.",
    rating: 4.0,
    image: "assets/images/juegos/valiant hearts the great war/cover.jpg",
    size: "921 MB",
    releaseDate: "2024-02-03",
  },
  {
    id: 35,
    title: "God of War",
    genre: ["adventure","action","rpg"],
    description:"Kratos ha dejado atrás su venganza contra los dioses del Olimpo y vive ahora como un hombre en los dominios de los dioses y monstruos nórdicos. En este mundo cruel e implacable debe luchar para sobrevivir… y enseñar a su hijo a hacerlo también. Kratos vuelve a ser padre. Como progenitor y protector de Atreus, un hijo decidido a ganarse el respeto del padre, Kratos debe sobrevivir en un mundo muy peligroso dominando y controlando la ira que tanto lo ha caracterizado.",
    rating: 4.7,
    image: "assets/images/juegos/god of war/cover.jpeg",
    size: "28.5 GB",
    releaseDate: "2024-02-04",
  },
  {
    id: 36,
    title: "Hollow Knight Silksong",
    genre: ["adventure","action"],
    description:"¡Encarnando a la letal cazadora Hornet, explora un reino de gobernado por la seda y el canto! Tras ser capturada y llevada a un mundo desconocido, prepárate para luchar contra poderosos enemigos y resolver misterios mientras asciendes en un peregrinaje mortal hasta la cima del reino.",
    rating: 4.5,
    image: "assets/images/juegos/hollow knight silksong/cover.jpg",
    size: "1.74 GB",
    releaseDate: "2024-02-05",
  },
]

// Debounce function declaration
function debounce(func, wait) {
  let timeout
  return function (...args) {
    
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Initialize games page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("gamesGrid")) {
    initializeFilters()
    loadGames()
    initializePagination()
  }
  setTimeout(handleURLParameters, 100)
})

// Initialize filter functionality
function initializeFilters() {
  const searchInput = document.getElementById("searchInput")
  const genreFilter = document.getElementById("genreFilter")
  const sortFilter = document.getElementById("sortFilter")
  const searchBtn = document.querySelector(".search-btn")

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function () {
        currentFilters.search = this.value.toLowerCase()
        currentPage = 1
        loadGames()
      }, 300),
    )
  }

  if (genreFilter) {
    genreFilter.addEventListener("change", function () {
      currentFilters.genre = this.value
      currentPage = 1
      loadGames()
    })
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", function () {
      currentFilters.sort = this.value
      currentPage = 1
      loadGames()
    })
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      loadGames()
    })
  }
}

// Load and display games
function loadGames() {
  const gamesGrid = document.getElementById("gamesGrid")
  if (!gamesGrid) return

  // Filter games
  const filteredGames = gamesData.filter((game) => {
    const matchesSearch = !currentFilters.search || game.title.toLowerCase().includes(currentFilters.search)
    const matchesGenre = !currentFilters.genre || game.genre.includes(currentFilters.genre)

    return matchesSearch && matchesGenre
  })

  // Sort games
  filteredGames.sort((a, b) => {
    switch (currentFilters.sort) {
      case "popular":
        return b.rating - a.rating
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.title.localeCompare(b.title)
      case "newest":
      default:
        return new Date(b.releaseDate) - new Date(a.releaseDate)
    }
  })

  // Pagination
  const gamesPerPage = 9
  const startIndex = (currentPage - 1) * gamesPerPage
  const endIndex = startIndex + gamesPerPage
  const paginatedGames = filteredGames.slice(startIndex, endIndex)

  // Update total pages
  totalPages = Math.ceil(filteredGames.length / gamesPerPage)

  // Render games
  gamesGrid.innerHTML = ""

  if (paginatedGames.length === 0) {
    gamesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: #b0b0b0;">
                <h3>No se encontraron juegos</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
            </div>
        `
    return
  }

  paginatedGames.forEach((game) => {
    const gameCard = createGameCard(game)
    gamesGrid.appendChild(gameCard)
  })

  updatePaginationInfo()
}

// Create game card element
function createGameCard(game) {
  const article = document.createElement("article")
  article.className = "game-card"
  article.style.opacity = "0"
  article.style.transform = "translateY(30px)"

  const stars = "★".repeat(Math.floor(game.rating)) + "☆".repeat(5 - Math.floor(game.rating))

  article.innerHTML = `
        <div class="game-image">
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="game-overlay">
                <a href="juegos/${gamePages[game.id]}" class="btn btn-small">Ver Detalles</a>
            </div>
        </div>
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-genre">${getGenreDisplayName(game.genre)}</p>
            <p class="game-description-card">${game.description}</p>
            <div class="game-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">${game.rating}/5</span>
            </div>
            <div class="game-size" style="margin-top: 0.5rem; color: #b0b0b0; font-size: 0.9rem;">
                ${game.size}
            </div>
        </div>
    `

  // Animate in
  setTimeout(() => {
    article.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    article.style.opacity = "1"
    article.style.transform = "translateY(0)"
  }, 100)

  return article
}

// Get display name for genre
function getGenreDisplayName(genres) {
  const genreNames = {
    action: "Acción",
    rpg: "RPG",
    racing: "Carreras",
    puzzle: "Puzzle",
    strategy: "Estrategia",
    adventure: "Aventura",
    horror: "Horror",
    simulation: "Simulación",
    sports: "Deportes",
    fps: "FPS",
    sandbox: "Mundo Abierto",
  }
  if (Array.isArray(genres)) {
    return genres.map(g => genreNames[g] || g).join(", ");
  }
  return genreNames[genres] || genres
}

// Initialize pagination
function initializePagination() {
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        loadGames()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++
        loadGames()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }
}

// Update pagination info
function updatePaginationInfo() {
  const currentPageSpan = document.getElementById("currentPage")
  const totalPagesSpan = document.getElementById("totalPages")
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  if (currentPageSpan) currentPageSpan.textContent = currentPage
  if (totalPagesSpan) totalPagesSpan.textContent = totalPages

  if (prevBtn) {
    prevBtn.disabled = currentPage === 1
    prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1"
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages
    nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1"
  }
}

// Handle URL parameters
function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")

  if (category) {
    const genreFilter = document.getElementById("genreFilter")
    if (genreFilter) {
      genreFilter.value = category
      currentFilters.genre = category
      loadGames()
    }
  }
}
