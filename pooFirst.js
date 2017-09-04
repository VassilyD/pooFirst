const genderType = {
	H: "Homme",
	F: "Femme",
	A: "Autre",
	N: "Inconnu"
}

const allergen = {
	oeuf: 1,
	cacahuette: 2,
	coquillage: 4,
	fraise: 8,
	tomate: 16,
	chocolat: 32,
	pollen: 64,
	chat: 128
}
const listPrenomH = ['Jean', 'Arnold', 'Frank', 'Charles', 'Henri'];
const listPrenomF = ['Loïse', 'Patricia', 'Charlotte', 'Emeline'];
const listPrenomA = ['Pascal', 'Sam', 'Frederic', 'Claude'];
const listNom = ['Dupont', 'Durand', 'De Lavallière', 'Dubois', 'Deschamps', 'Dufeuil', 'De Beaulieu'];
const MS_IN_YEAR = 365.2425 * 24 * 3600 * 1000;
const BIRTHDAY_MIN = Date.now() - 50 * MS_IN_YEAR;
const BIRTHDAY_MAX = Date.now() - 16 * MS_IN_YEAR;

var Apprenant = function(lastName = "Dupont", firstName = "Henri", gender = "H", birthDate = Date.now(), allergies = 0) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = genderType[gender];
    this.birthDate = birthDate;
    this.allergies = allergies;

    // Vérifie si il est allergique à un allergène en utilisant la méthode du AND bit by bit
    this.isAllergicTo = function(allergen = 0) {
    	return ((allergen & this.allergies) != 0);
    }

    this.getAge = function() {
    	var age = Date.now() - this.birthDate;
    	age = Math.floor(age / MS_IN_YEAR);
    	return age;
    }
}

var Promotion = function(nbApprenants = 24) {

	this.listApprenants = [];
	for(i = 0; i < nbApprenants; i++) {
		var nom = listNom[Math.floor(Math.random() * listNom.length)];
		var genre = Math.floor(Math.random() * 10001);
		if(genre <= 2500) {
			var prenom = listPrenomF[Math.floor(Math.random() * listPrenomF.length)];
			genre = 'F';
		}
		else if(genre <= 3000) {
			var prenom = listPrenomA[Math.floor(Math.random() * listPrenomA.length)];
			genre = 'A';
		}
		else {
			var prenom = listPrenomH[Math.floor(Math.random() * listPrenomH.length)];
			genre = 'H';
		}
		var birthDate = Math.floor(BIRTHDAY_MIN + Math.random() * (BIRTHDAY_MAX - BIRTHDAY_MIN));
		var allergies = Math.floor(Math.random() * 256);
		this.listApprenants.push(new Apprenant(nom, prenom, genre, birthDate, allergies));
	}


	this.ratioHF = function() {
		var nbF = 0;
		for(i = 0; i < this.listApprenants.length; i++) {
			if(this.listApprenants[i].gender == genderType.F) nbF++;
		}
		return nbF / this.listApprenants.length;
	}

	this.youngest = function() {
		var ageMin = Number.MAX_VALUE;
		var iApprenant = 0;
		for(i = 0; i < this.listApprenants.length; i++) {
			if(this.listApprenants[i].getAge() < ageMin) {
				ageMin = this.listApprenants[i].getAge();
				iApprenant = i;
			}
		}
		return this.listApprenants[iApprenant];
	}

	this.oldest = function() {
		var ageMax = 0;
		var iApprenant = 0;
		for(i = 0; i < this.listApprenants.length; i++) {
			if(this.listApprenants[i].getAge() > ageMax) {
				ageMax = this.listApprenants[i].getAge();
				iApprenant = i;
			}
		}
		return this.listApprenants[iApprenant];
	}

	this.averageAge = function() {
		var ageTotal = 0;
		for(i = 0; i < this.listApprenants.length; i++) ageTotal += this.listApprenants[i].getAge();
		return ageTotal / this.listApprenants.length;
	}

	this.afficher = function() {
		var table = '';
		for(i = 0; i < this.listApprenants; i++) {
			table += '<div class="apprenant">';
		}
	}
}
