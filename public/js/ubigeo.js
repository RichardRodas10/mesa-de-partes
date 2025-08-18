// data Perú (solo ejemplo, puedes completarlo con todos)
const perú = {
    "Amazonas":{
        "Chachapoyas":["Asunción","Balsas","Chachapoyas","Cheto","Chiliquín","Chuquibamba","Granada","Huancas","La Jalca","Levanto","Magdalena","Mariscal Castilla","Molinopampa","San Francisco de Daguas","San Juan de la Frontera","San Miguel de Corosha","San Nicolás","Sonche","Soloco","Quinjalca"],
        "Bagua":["Bagua","Aramango","Copallín","El Parco","Imaza","La Peca"],
        "Bongará":["Chisquilla","Churuja","Corosha","Cuispes","Florida","Jazan","Jumbilla","Recta","San Carlos","Shipasbamba","Valera","Yamblasbamba"],
        "Condorcanqui":["El Cenepa","Nieva","Río Santiago"],
        "Luya":["Camporredondo","Cocabamba","Colcamar","Conila","Inguilpata","Lámud","Longuita","Lonya Chico","Luya","Luya Viejo","María","Ocalli","Ocumal","Pisuquía","Providencia","San Cristóbal","San Francisco del Yeso","San Jerónimo","San Juan de Lopecancha","Santa Catalina","Santo Tomás","Tingo","Trita"],
        "Rodríguez de Mendoza":["Chirimoto","Cochamal","Huambo","Limabamba","Longar","Mariscal Benavides","Milpuc","Omia","San Nicolás","Santa Rosa","Totora","Vista Alegre"],
        "Utcubamba":["Bagua Grande","Cajaruro","Cumba","El Milagro","Jamalca","Lonya Grande","Yamón"]
    },
    "Áncash":{
        "Aija":[],
        "Antonio Raimondi":[],
        "Asunción":[],
        "Bolognesi":[],
        "Carhuaz":[],
        "Carlos Fermín Fitzcarrald":[],
        "Casma":[],
        "Corongo":[],
        "Huaraz":[],
        "Huari":[],
        "Huarmey":[],
        "Huaylas":[],
        "Mariscal Luzuriaga":[],
        "Ocros":[],
        "Pallasca":[],
        "Pomabamba":[],
        "Recuay":[],
        "Santa":[],
        "Sihuas":[],
        "Yungay":[],
    },
    "Apurimac":{
        "Abancay":[],
        "Andahuaylas":[],
        "Antabamba":[],
        "Aymaraes":[],
        "Chincheros":[],
        "Cotabambas":[],
        "Grau":[]
    },
    "Arequipa":{
        "Arequipa":[],
        "Camaná":[],
        "Caravelí":[],
        "Castilla":[],
        "Caylloma":[],
        "Condesuyos":[],
        "Islay":[],
        "La Unión":[]
    },
    "Ayacucho":{
        "Cangallo":[],
        "Huamanga":[],
        "Huanca Sancos":[],
        "Huanta":[],
        "La Mar":[],
        "Lucanas":[],
        "Parinacochas":[],
        "Páucar del Sara Sara":[],
        "Sucre":[],
        "Víctor Fajardo":[],
        "Vilcashuamán":[]
    },
    "Cajamarca":{
        "Cajabamba":[],
        "Cajamarca":[],
        "Celendín":[],
        "Chota":[],
        "Contumazá":[],
        "Cutervo":[],
        "Hualgayoc":[],
        "Jaén":[],
        "San Ignacio":[],
        "San Marcos":[],
        "San Miguel":[],
        "San Pablo":[],
        "Santa Cruz":[]
    },
    "Cusco": {
        "Acomayo":[],
        "Anta":[],
        "Calca":[],
        "Canas":[],
        "Canchis":[],
        "Cusco":["Cusco", "San Sebastián", "Wanchaq"],
        "Chumbivilcas":[],
        "Espinar":[],
        "La Convención":[],
        "Paruro":[],
        "Paucartambo":[],
        "Quispicanchi":[],
        "Urubamba":["Urubamba", "Yucay", "Ollantaytambo"]
    },
    "Huancavelica":{
        "Acobamba":[],
        "Angaraes":[],
        "Castrovirreyna":[],
        "Churcampa":[],
        "Huancavelica":[],
        "Huaytará":[],
        "Tayacaja":[]
    },
    "Huánuco":{
        "Ambo":[],
        "Dos de Mayo":[],
        "Huacaybamba":[],
        "Huamalíes":[],
        "Huánuco":[],
        "Lauricocha":[],
        "Leoncio Prado":[],
        "Marañón":[],
        "Pachitea":[],
        "Puerto Inca":[],
        "Yarowilca":[]
    },
    "Ica":{
        "Chincha":[],
        "Ica":[],
        "Nasca":[],
        "Palpa":[],
        "Pisco":[]
    },
    "Junín":{
        "Chanchamayo":[],
        "Chupaca":[],
        "Concepción":[],
        "Huancayo":[],
        "Jauja":[],
        "Junín":[],
        "Satipo":[],
        "Tarma":[],
        "Yauli":[]
    },
    "La Libertad":{
        "Ascope":[],
        "Bolívar":[],
        "Chepén":[],
        "Gran Chimú":[],
        "Julcán":[],
        "Otuzco":[],
        "Pacasmayo":[],
        "Pataz":[],
        "Sánchez Carrión":[],
        "Santiago de Chuco":[],
        "Trujillo":[],
        "Virú":[]
    },
    "Lambayeque":{
        "Chiclayo":[],
        "Lambayeque":[],
        "Ferreñafe":[]
    },
    "Lima": {
        "Barranca":[],
        "Cajatambo":[],
        "Callao":[],
        "Canta":[],
        "Cañete":[],
        "Huaral":["Huaral", "Atavillos Alto", "Aucallama"],
        "Huarochirí":[],
        "Huaura":[],
        "Lima": ["Miraflores", "San Isidro", "Surco"],
        "Oyón":[],
        "Yauyos":[]
    },
    "Loreto":{
        "Alto Amazonas":[],
        "Datem del Marañon":[],
        "Loreto":[],
        "Maynas":["Punchana","Iquitos","Alto Nanay","Fernando Lores","Indiana","Las Amazonas","Mazan","Napo","Torres Causana","Belén"],
        "Putumayo":[],
        "Purús":[],
        "Requena":[],
        "Ucayali":[]
    },
    "Madre de Dios":{
        "Tambopata":[],
        "Manu":[],
        "Tahuamanu":[]
    },
    "Moquegua":{
        "Mariscal Nieto":[],
        "General Sánches Cerro":[],
        "Ilo":[]
    },
    "Pasco":{
        "Pasco":[],
        "Daniel Alcides Carrión":[],
        "Oxapampa":[]
    },
    "Piura":{
        "Ayabaca":[],
        "Huancabamba":[],
        "Morropón":[],
        "Paita":[],
        "Piura":[],
        "Sechura":[],
        "Sullana":[],
        "Talara":[]
    },
    "Puno":{
        "Azángaro":[],
        "Carabaya":[],
        "Chucuito":[],
        "El Collao":[],
        "Huancané":[],
        "Lampa":[],
        "Melgar":[],
        "Moho":[],
        "Puno":[],
        "San Antonio de Putina":[],
        "San Román":[],
        "Sandia":[],
        "Yunguyo":[]
    },
    "San Martín":{
        "Bellavista":[],
        "El Dorado":[],
        "Huallaga":[],
        "Lamas":[],
        "Mariscal Cáceres":[],
        "Moyobamba":[],
        "Picota":[],
        "Rioja":[],
        "San Martín":[],
        "Tocache":[]
    },
    "Tacna":{
        "Candarave":[],
        "Jorge Basadre":[],
        "Tacna":[],
        "Tarata":[]
    },
    "Tumbes":{
        "Contralmirante Villar":[],
        "Tumbes":[],
        "Zarumilla":[]
    },
    "Ucayali":{
        "Atalaya":[],
        "Coronel Portillo":[],
        "Padre Abad":[],
        "Purús":[]
    }
};

// select elements
const departamentoSelect = document.getElementById("departamento");
const provinciaSelect = document.getElementById("provincia");
const distritoSelect = document.getElementById("distrito");

// cargar departamentos
Object.keys(perú).forEach(dep => {
    const option = document.createElement("option");
    option.value = dep;
    option.textContent = dep;
    departamentoSelect.appendChild(option);
});

// al cambiar departamento
departamentoSelect.addEventListener("change", () => {
    provinciaSelect.innerHTML = '<option value="">Seleccione...</option>';
    distritoSelect.innerHTML = '<option value="">Seleccione...</option>';

    const provincias = perú[departamentoSelect.value];
    if(provincias){
        Object.keys(provincias).forEach(prov => {
            const option = document.createElement("option");
            option.value = prov;
            option.textContent = prov;
            provinciaSelect.appendChild(option);
        });
    }
});

// al cambiar provincia
provinciaSelect.addEventListener("change", () => {
    distritoSelect.innerHTML = '<option value="">Seleccione...</option>';

    const distritos = perú[departamentoSelect.value][provinciaSelect.value];
    if(distritos){
        distritos.forEach(dist => {
            const option = document.createElement("option");
            option.value = dist;
            option.textContent = dist;
            distritoSelect.appendChild(option);
        });
    }
});
