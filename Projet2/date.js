/*
	Fichier: date.js
	Nom: Philippe Doyon
	Date: 08/04/16
	But: Librairie de fonctions sur les dates
*/

/*
|-----------------------------------------------------------------------------|
| er: 
| Retourne er si intJour = 1 et binExposant = false                                       
| Retourne er en exposant si intJour = 1 et binExposant = true
| Retourne la chaîne vide dans tous les autres cas                              
|-----------------------------------------------------------------------------|
*/
function er(intJour, binExposant) {
    if (intJour == 1 && binExposant == true) {
        return('<sup>er</sup>')
    }
    else if (intJour == 1) {
        return('er')
    }
    else
        return('')
}

/*
|-----------------------------------------------------------------------------|
| jourSemaineEnLitteral: 
| Retourne le jour de la semaine en littéral (1=Dimanche,...,7=Samedi)        
| Retourne la première lettre en majuscule si binMajuscule vaut true          
| Retourne la chaîne vide si le numéro du jour n'est pas entre 1 et 7         
|-----------------------------------------------------------------------------|
*/
function jourSemaineEnLitteral(intJourSem, binMajuscule) {
   var strJournee = ''
   
    switch (intJourSem) {
        case 1:
            strJournee = 'dimanche'
            break;
        case 2:
            strJournee = 'lundi'
            break;
        case 3:
            strJournee = 'mardi'
            break;
        case 4:
            strJournee = 'mercredi'
            break;
        case 5:
            strJournee = 'jeudi'
            break;
        case 6:
            strJournee = 'vendredi'
            break;
        case 7:
            strJournee = 'samedi'
            break;
   }
   
   if (binMajuscule) {
        return(strJournee.charAt(0).toUpperCase() + strJournee.substr(1))
    
   }
   else
        return(strJournee)
}

/*
|-----------------------------------------------------------------------------|
| moisEnLitteral: 
| Retourne le mois en littéral (1=Janvier,...,12=Décembre)                    
| Retourne la première lettre en majuscule si binMajuscule vaut true
| Retourne la chaîne vide si le numéro du mois n'est pas entre 1 et 12
|-----------------------------------------------------------------------------|
*/
function moisEnLitteral(intMois, binMajuscule) {
    var strNomMois = ''
    
    switch (intMois) {
        case 1:
            strNomMois = 'janvier'
            break;
        case 2:
            strNomMois = 'février'
            break;
        case 3:
            strNomMois = 'mars'
            break;
        case 4:
            strNomMois = 'avril'
            break;
        case 5:
            strNomMois = 'mai'
            break;
        case 6:
            strNomMois = 'juin'
            break;
        case 7:
            strNomMois = 'juillet'
            break;
        case 8:
            strNomMois = 'aout'
            break;
        case 9:
            strNomMois = 'septembre'
            break;
        case 10:
            strNomMois = 'octobre'
            break;
        case 11:
            strNomMois = 'novembre'
            break;
        case 12:
            strNomMois = 'décembre'
            break;    
    }
    
    if (binMajuscule) {
        return(strNomMois.charAt(0).toUpperCase() + strNomMois.substr(1))
    }
    else
        return(strNomMois)
}

/*
|-----------------------------------------------------------------------------|
| bissextile: 
| Retourne true si l'année est bissextile sinon retourne false  
|-----------------------------------------------------------------------------|
*/
function bissextile(intAnnee) {
    if (((intAnnee % 400) == 0) || ((intAnnee % 4) == 0) && ((intAnnee % 100) != 0)) {
        return(true)
    }
    else
        return(false)
}

/*
|-----------------------------------------------------------------------------|
| nombreJoursAnnee: 
| Retourne le nombre de jours qu'il y a dans l'année          
|-----------------------------------------------------------------------------|
*/
function nombreJoursAnnee(intAnnee) {
   if (bissextile(intAnnee)) {
        return(366)
   }
   else
        return(365)
}

/*
|-----------------------------------------------------------------------------|
| nombreJoursMois: 
| Retourne le nombre de jours dans un mois pour une année donnée       
| Retourne 0 si le mois n'est pas entre 1 et 12    
|-----------------------------------------------------------------------------|
*/
function nombreJoursMois(intMois, intAnnee) {
   var intNbJours = 0
   
    switch (intMois) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            intNbJours = 31
            break
        case 4:
        case 6:
        case 9:
        case 11:
            intNbJours = 30
            break
        case 2:
            if (bissextile(intAnnee)) {
                intNbJours = 29
            }
            else
                intNbJours = 28
            break   
   }
   
   return(intNbJours)
}

/*
|-----------------------------------------------------------------------------|
| dateValide: 
| Retourne true si la date est valide
| Retourne false dans le cas contraire
|-----------------------------------------------------------------------------|
*/
function dateValide(intJour, intMois, intAnnee) {
    if ((intAnnee >= 1900 && intAnnee <= 2199) && (intMois <= 12 && intMois >= 1) && (intJour <= nombreJoursMois(intMois, intAnnee) && intJour > 0)) {
        return(true)
    }
    else
        return(false)
}

/*
|-----------------------------------------------------------------------------|
| dateEnNoSerie:
| Convertis une date en numéro de série et retourne ce numéro de série
| (Numéro de série: le numéro du jour à partir du 1er janvier 1900)  
| Retourne 0 si la date n'est pas valide
|-----------------------------------------------------------------------------|
*/
function dateEnNoSerie(intJour, intMois, intAnnee) {
    var intNoSerie = 0
    var intNbJourMois = 0
    var intNbJourAnnee = 0
    
    if (dateValide(intJour, intMois, intAnnee)) {
        //gestion mois
        
        if (intMois != 1) {           
            for(var intq = 1;intq<intMois;intq++){
                intNbJourMois+= nombreJoursMois(intq, intAnnee)
            }
        }
        
        if(intAnnee != 1900){
            for(var w=1900;w<intAnnee;w++){
                intNbJourAnnee += nombreJoursAnnee(w)
            }
        }
        
        intNoSerie = intNbJourAnnee + intNbJourMois + intJour  
    }
    
    return (intNoSerie)
}

/*
|-----------------------------------------------------------------------------|
| noSerieValide: 
| Retourne true si le numéro de série est valide
| Retourne false dans le cas contraire
|-----------------------------------------------------------------------------|
*/
function noSerieValide(intNoSerie) {
    if (intNoSerie >= 1 && intNoSerie <= 109573) {
        return(true)
    }
    else
        return(false)
}

/*
|-----------------------------------------------------------------------------|
| noSerieEnJourSemaine:
| Retourne le no du jour de la semaine (entre 1 et 7) 
| qui correspond à un numéro de série
| Retourne 0 si le numéro de série n'est pas valide
|-----------------------------------------------------------------------------|
*/
function noSerieEnJourSemaine(intNoSerie) {
    return(noSerieValide(intNoSerie) ? (intNoSerie % 7) + 1 : 0)
}

/*
|-----------------------------------------------------------------------------|
| dateEnJourSemaine:
| Retourne le no du jour de la semaine (entre 1 et 7) 
| qui correspond à une date
| Retourne 0 si la date n'est pas valide
|-----------------------------------------------------------------------------|
*/
function dateEnJourSemaine(intJour, intMois, intAnnee) {
   return(dateValide(intJour, intMois, intAnnee) ? noSerieEnJourSemaine(dateEnNoSerie(intJour, intMois, intAnnee)) : 0)
}

/*
|-----------------------------------------------------------------------------|
| noSerieEnJourDansDate:
| Retourne le no du jour dans une date
| qui correspond à un numéro de série
| Retourne 0 si le numéro de série n'est pas valide
|-----------------------------------------------------------------------------|
*/
function noSerieEnJourDansDate(intNoSerie) {
    var intNbMois = 1
    var intNbAnnee = 1900
    var intRestant = intNoSerie
   
    if (noSerieValide(intNoSerie)) {
        for(; intRestant> nombreJoursAnnee(intNbAnnee);){
            intRestant = intRestant - nombreJoursAnnee(intNbAnnee)
            intNbAnnee++
        }
        
        for(;intRestant > nombreJoursMois(intNbMois, intNbAnnee);){
            intRestant = intRestant - nombreJoursMois(intNbMois, intNbAnnee)
            intNbMois++
        }
        
    }
    return(intRestant)  
}

/*
|-----------------------------------------------------------------------------|
| noSerieEnMoisDansDate:
| Retourne le no du du mois dans une date
| qui correspond à un numéro de série
| Retourne 0 si le numéro de série n'est pas valide
|-----------------------------------------------------------------------------|
*/
function noSerieEnMoisDansDate(intNoSerie) {
    var intNbMois = 0
    var intNbAnnee = 1900
    var intRestant = intNoSerie
   
    if (noSerieValide(intNoSerie)) { 
        intNbMois++
        
        for(; intRestant> nombreJoursAnnee(intNbAnnee);){
            intRestant = intRestant - nombreJoursAnnee(intNbAnnee)
            intNbAnnee++
        }
        
        for(;intRestant > nombreJoursMois(intNbMois, intNbAnnee);){
            intRestant = intRestant - nombreJoursMois(intNbMois, intNbAnnee)
            intNbMois++
        }
        
    }
    return(intNbMois)
}

/*
|-----------------------------------------------------------------------------|
| noSerieEnAnneeDansDate:
| Retourne l'année dans une date
| qui correspond à un numéro de série
| Retourne 0 si le numéro de série n'est pas valide
|-----------------------------------------------------------------------------|
*/
function noSerieEnAnneeDansDate(intNoSerie) {
    var intNbAnnee = 0
    var intRestant = intNoSerie
   
    if (noSerieValide(intNoSerie)) {
        intNbAnnee = 1900
        for(; intRestant> nombreJoursAnnee(intNbAnnee);){
            intRestant = intRestant - nombreJoursAnnee(intNbAnnee)
            intNbAnnee++
        }
        
    }
    return(intNbAnnee)
}

/*
|------------------------------------------------------------------------------|
| recupereJourActuel:
| Retourne le jour actuel
|------------------------------------------------------------------------------|
*/
function recupereJourActuel() {
   var objDateActuel = new Date()
   
   return(objDateActuel.getDate())
}

/*
|------------------------------------------------------------------------------|
| recupereMoisActuel:
| Retourne le mois actuel
|------------------------------------------------------------------------------|
*/
function recupereMoisActuel() {
   var objDateActuel = new Date()
   
   return(objDateActuel.getMonth() + 1)
}

/*
|------------------------------------------------------------------------------|
| recupereAnneeActuelle:
| Retourne l'année actuelle
|------------------------------------------------------------------------------|
*/
function recupereAnneeActuelle() {
   var objDateActuel = new Date()
   
   return(objDateActuel.getFullYear())
}

/*
|-----------------------------------------------------------------------------|
| dateEnFormatCourt: 
| Retourne la date dans un format court: jj/mm/aaaa
| Par exemple: '01/06/2012'
|-----------------------------------------------------------------------------|
*/
function dateEnFormatCourt(intJour, intMois, intAnnee) {
    var strDate = ''
    
    if (dateValide(intJour, intMois, intAnnee)) {
        
        intJour = intJour.toString().length == 1? '0' + intJour : intJour
        intMois = intMois.toString().length == 1? '0' + intMois : intMois
        
        strDate = intJour + '/' + intMois + '/' + intAnnee
    }
    
    return(strDate)
}

/*
|-----------------------------------------------------------------------------|
| dateEnLitteralCourt: 
| Retourne la date dans un format littéral court
| Si le jour est 1, er est en exposant
| Par exemple: '2 juin 2012'
| Offre la possibilité d'afficher la 1ère lettre du mois en majuscule 
|-----------------------------------------------------------------------------|
*/
function dateEnLitteralCourt(intJour, intMois, intAnnee, binMoisMajuscule) {
    var strDate = ''
    
    if (dateValide(intJour, intMois, intAnnee)) {
        strDate = intJour + er(intJour,true) + ' ' + moisEnLitteral(intMois, binMoisMajuscule) + ' ' + intAnnee
    }
    
    return(strDate)
}

/*
|-----------------------------------------------------------------------------|
| dateEnLitteralLong: 
| Retourne la date dans un format littéral long
| Si le jour est 1, er est en exposant
| Par exemple: 'Mercredi, le 21 mars 2012'
| Offre la possibilité d'afficher la 1ère lettre du mois en majuscule 
|-----------------------------------------------------------------------------|
*/
function dateEnLitteralLong(intJour, intMois, intAnnee, binMoisMajuscule) {
    return(dateValide(intJour, intMois, intAnnee) ? jourSemaineEnLitteral(dateEnJourSemaine(intJour, intMois, intAnnee), true) + ', le ' + intJour + er(intJour,true) + ' ' +
           moisEnLitteral(intMois, binMoisMajuscule) + ' ' + intAnnee : '')
}