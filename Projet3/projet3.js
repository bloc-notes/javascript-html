// Projet3.js
// Par Alain Loyer et Philippe Doyon
//13 mai 2016
// Librairie pour projet3.htm

/*
|----------------------------------------------------------------------------------|
| (GLOBAL; AJAX) Déclaration des variables de travail globales
|----------------------------------------------------------------------------------|
*/
/* Détection automatique du dossier où est entreposé l'application serveur */
var strNomApplication = 'http://424w.cgodin.qc.ca/aloyer/Kit_Ajax_projet/gestion-bd-projet3.php';

/*
|--------------------------------------------------------------------------------------------------------------|
| initialiseInterface
|--------------------------------------------------------------------------------------------------------------|
*/
function initialiseInterface(binIdentificationPresente, binOperationsSuccursalesPresente, divSuccursalesPresente) {
    masqueB('divIdentification', !binIdentificationPresente);
    masqueB('divOperationsSuccursales', !binOperationsSuccursalesPresente);
    masqueB('divSuccursales', !divSuccursalesPresente);
}

/*
|--------------------------------------------------------------------------------------------------------------|
| initialiseIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function initialiseIdentifiant() {
  if (recupereCookie('cookIdentifiant') == null) {
    masqueB('btnSouvenir', false)
    masqueB('btnNonSouvenir', true)
  }
  else{
    masqueB('btnSouvenir', true)
    masqueB('btnNonSouvenir', false)
    
    b('tbMatricule', recupereCookie('cookIdentifiant'))
    b('tbMotDePasse', recupereCookie('cookMDP'))
  }
}

/*
|--------------------------------------------------------------------------------------------------------------|
| enregistreIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function enregistreIdentifiant() {
    enregistreCookie('cookIdentifiant',b('tbMatricule'),365)
    enregistreCookie('cookMDP',b('tbMotDePasse'),365)
    
    masqueB('btnSouvenir', true)
    masqueB('btnNonSouvenir', false)
}

/*
|--------------------------------------------------------------------------------------------------------------|
| detruitIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function detruitIdentifiant() {
    enregistreCookie('cookIdentifiant','',-1)
    enregistreCookie('cookMDP','',-1)
    
    masqueB('btnSouvenir', false)
    masqueB('btnNonSouvenir', true)
}

/*
|--------------------------------------------------------------------------------------------------------------|
| deconnexion
|--------------------------------------------------------------------------------------------------------------|
*/
function deconnexion() {
    location.reload()
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerAjoutModification
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerAjoutModification() {
    b('tbVilleAjout','')
    b('tbBudgetAjout','')
    b('lblMessageAjout','')
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerRetrait
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerRetrait() {
    b('tbVilleRetrait','')
    b('lblMessageRetrait','')
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerBudgetVisualisation
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerBudgetVisualisation() {
    b('tbVilleBudgetVisualisation','')
    b('lblBudgetVisualisation','')
    b('lblMessageBudgetVisualisation','')
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_compteSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_compteSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
        b('lblReponse',strVerdict)
        b('lblSuccursales','Nombre de succursale\(s\): ' + strVerdict.replace(';',''))
        
        if (+strVerdict.replace(';','') == 0) {
            masqueB('btnReinitialiser', true)
            masqueB('tabRetrait',true)
            masqueB('tabVisualisation',true)
        }
        else{
            masqueB('btnReinitialiser', false)
            masqueB('tabRetrait',false)
            masqueB('tabVisualisation',false)
        }
    }

    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_compteSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    var strIdentifiant = b('tbMatricule')
    var strMotDePasse = b('tbMotDePasse')
    
    var strDonneeTransmise = 'Action=Succursale-Compte&Aut=' + strIdentifiant + strMotDePasse.substr(strMotDePasse.length - 5)
    
    b('lblRequete',strNomApplication + strDonneeTransmise)
    
    requeteServeur(strNomApplication,strDonneeTransmise,recupereReponseServeur,true)
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_afficheListeSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_afficheListeSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
        b('lblReponse',strVerdict)
        
        if (strVerdict.replace(';','') == 'AUCUNE') {
            b('lblSuccursales','Aucune succursale enregistrée...')
        }
        else{
            var arraySuccursales = strVerdict.split(';')
            
            var strFlux = '<table class="sTableauSuccursales"><tr class="sEnteteTableauSuccursales"><td class="sCelNoSuccursale">No</td>' +
                '<td class="sCelVille">Ville</td><td class="sCelBudget">Budget</td></tr>'
            
            for(var x=0; x<+arraySuccursales.length -1;x++){
                var arrayLaSuccursale = arraySuccursales[x].split(',')
                
                strFlux += '<tr class="sCorpsTableauSuccursales"><td class="sCelNoSuccursale">' + (x+1) +
                    '</td><td class="sCelVille">' + arrayLaSuccursale[0] + '</td><td class="sCelBudget">' +
                    arrayLaSuccursale[1] + ' $'+ '</td></tr>'
            }
            
            strFlux += '</table>'
            b('lblSuccursales',strFlux)
        }
    }
    
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_afficheListeSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    var strIdentifiant = b('tbMatricule')
    var strMotDePasse = b('tbMotDePasse')
    
    var strDonneeTransmise = 'Action=Succursale-Liste&Aut=' + strIdentifiant + strMotDePasse.substr(strMotDePasse.length - 5)
    
    b('lblRequete',strNomApplication + strDonneeTransmise)
    
    requeteServeur(strNomApplication,strDonneeTransmise,recupereReponseServeur,true)
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteConnexion
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_tenteConnexion() {
     /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
        b('lblReponse',strVerdict)
        
        if (strVerdict == 'PASOK;') {
            b('lblMessageConnexion','Utilisateur inconnu!')
        }
        else{
            initialiseInterface(false,true,true)
            
            var strNomPrenom = strVerdict.substr(3).replace(';',' ').replace(';',' ')
            b('lblNomComplet',strNomPrenom)
            
            ajax_compteSuccursales()
        }
    }

    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_tenteConnexion)
    |-----------------------------------------------------------------------------------------------------------|
    */
    var strIdentifiant = b('tbMatricule')
    var strMotDePasse = b('tbMotDePasse')
    
    if((!estUnMatricule(strIdentifiant)) && (!(/^[a-z]{1,6}\d{5}$/i).test(strMotDePasse))){
        b('lblMessageConnexion','Identifiant et mot de passe invalide!')
    }
    else if (!estUnMatricule(strIdentifiant)) {
        b('lblMessageConnexion','Identifiant invalide!')
    }
    else if (!(/^[a-z]{1,6}\d{5}$/i).test(strMotDePasse)) {
        b('lblMessageConnexion','Mot de passe invalide!')
    }
    else{
        var strDonneeTransmise = 'Action=Connexion&Mat=' + strIdentifiant +'&MDP=' + strMotDePasse
        
        b('lblMessageConnexion','')
        b('lblRequete',strNomApplication+'?'+ strDonneeTransmise)
        
        requeteServeur(strNomApplication, strDonneeTransmise, recupereReponseServeur, true)
        
    }
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteAjoutModificationSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/

 function ajax_tenteAjoutModificationSuccursale() {
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
   function recupereReponseServeur(strVerdict) {
       b('lblReponse',strVerdict)
       
       if (strVerdict == 'PASOK;') {
            b('lblMessageAjout','Succursale existante!')
       }
       else if (strVerdict == 'OKM;') {
            b('lblMessageAjout','Succursale modifiée!')     
       }
       else{
            b('lblMessageAjout','Succursale ajoutée!')
            ajax_compteSuccursales()
       }
    }
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteAjoutModificationSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
     var strVille = b('tbVilleAjout')
     var strBudget = b('tbBudgetAjout')
     var strRegexVille = /^[a-z]*(\-{1}[a-z]*)*$/i
     var strRegexBudget = /^\d{3,7}$/
     
     //La première lettre doit être une majuscule
     if ((!strRegexVille.test(strVille)) && (!(strRegexBudget.test(strBudget)) || (!(strBudget>=500)))) {
        b('lblMessageAjout','Ville et budget invalide!')
     }
     else if (!strRegexVille.test(strVille)) { 
        b('lblMessageAjout','Ville invalide!')
     }
    else if (!(strRegexBudget.test(strBudget)) || (!(strBudget>=500))) {
        b('lblMessageAjout', 'Budget invalide!')
     }
     else{
        b('lblMessageAjout','')
        
        var strIdentifiant = b('tbMatricule')
        var strMotDePasse = b('tbMotDePasse')
        
        var strDonneeTransmise = 'Action=Succursale-Ajout&Aut=' + strIdentifiant + strMotDePasse.substr(strMotDePasse.length - 5)
            + '&Ville=' + strVille + '&Budget=' + strBudget
        
        b('lblRequete',strNomApplication + strDonneeTransmise)
        
        requeteServeur(strNomApplication,strDonneeTransmise,recupereReponseServeur,true)
     }
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteRetraitSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_tenteRetraitSuccursale() {
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
    function recupereReponseServeur(strVerdict) {
        b('lblReponse',strVerdict)
        
        if (strVerdict == 'PASOK;') {
            b('lblMessageRetrait','Succursale inconnue!')
        }
        else{
            b('lblMessageRetrait','Succursale retirée')
            ajax_compteSuccursales()
        }
    }
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteRetraitSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
        var strVille = b('tbVilleRetrait')
        var strRegexVille = /^[a-z]*(\-{1}[a-z]*)*$/i
        
        if (!strRegexVille.test(strVille)) { 
            b('lblMessageRetrait','Ville invalide!')
        }
        else{
            var strIdentifiant = b('tbMatricule')
            var strMotDePasse = b('tbMotDePasse')
            
            var strDonneeTransmise = 'Action=Succursale-Retrait&Aut=' + strIdentifiant + strMotDePasse.substr(strMotDePasse.length - 5)
                + '&Ville=' + strVille
            
            b('lblRequete',strNomApplication + strDonneeTransmise)
            
            requeteServeur(strNomApplication,strDonneeTransmise,recupereReponseServeur,true)
        }
  }


/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteVisualisationBudgetSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/

 function ajax_tenteVisualisationBudgetSuccursale() {
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
    function recupereReponseServeur(strVerdict) {
        b('lblReponse',strVerdict)
        
        if (strVerdict == 'PASOK;') {
            b('lblMessageBudgetVisualisation','Succursale inconnue!')
        }
        else{
            b('lblMessageBudgetVisualisation','Budget affiché')
            b('lblBudgetVisualisation', strVerdict.replace(';',''))
        }
    }
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteVisualisationBudgetSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
        var strVille = b('tbVilleBudgetVisualisation')
        var strRegexVille = /^[a-z]*(\-{1}[a-z]*)*$/i
        
        if (!strRegexVille.test(strVille)) { 
            b('lblMessageBudgetVisualisation','Ville invalide!')
        }
        else{
             var strIdentifiant = b('tbMatricule')
            var strMotDePasse = b('tbMotDePasse')
            
            var strDonneeTransmise = 'Action=Succursale-Budget&Aut=' + strIdentifiant + strMotDePasse.substr(strMotDePasse.length - 5)
                + '&Ville=' + strVille
            
            b('lblRequete',strNomApplication + strDonneeTransmise)
            
            requeteServeur(strNomApplication,strDonneeTransmise,recupereReponseServeur,true)
        }
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_reinitialiseSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_reinitialiseSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
        b('lblReponse',strVerdict)
        
        if (strVerdict == 'OK;') {
            effacerAjoutModification()
            effacerRetrait()
            effacerBudgetVisualisation()
            
            ajax_compteSuccursales()
        }
        else{
            alert('Gros Problème')
        }
        
    }
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_reinitialiseSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
        if (confirm('Cliquez sur ok pour confirmer la suppression de toutes les succursales enregistrées.')) {
             var strIdentifiant = b('tbMatricule')
            var strMotDePasse = b('tbMotDePasse')
            
            var strDonneeTransmise = 'Action=Succursale-Suppression&Aut=' + strIdentifiant + strMotDePasse.substr(strMotDePasse.length - 5)
            
            b('lblRequete',strNomApplication + strDonneeTransmise)
            
            requeteServeur(strNomApplication,strDonneeTransmise,recupereReponseServeur,true)
        }
}