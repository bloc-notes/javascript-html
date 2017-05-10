// Cette fonction affecte ou retourne la valeur ou le XHTML 
// de l'élément XHTML dentifié par strID

function b(strID, strValeur) {
    var objb = document.getElementById(strID);
    if (objb==null) {
        alert('Attention... balise "' + strID + '" inexistante !');
    }
    else {
        if (objb.value != null) {
            if (strValeur != null) {
                objb.value = strValeur;
            }
            else {
                return objb.value;
            }
        }
        else {
            if (strValeur != null) {
                objb.innerHTML = strValeur;
            }
            else {
                return objb.innerHTML;
            }
        }
    }
}

// Cette fonction affecte ou retourne les sélecteurs de mise en forme
// de l'élément XHTML identifié par strID

function s(strID, strSelecteurs) {
    var objb = document.getElementById(strID)
    if (objb==null) {
        alert('Attention... balise "' + strID + '" inexistante !')
    }
    else {
        if (strSelecteurs != null) {
            objb.className = strSelecteurs
        }
        else {
            return objb.className
        }
    }    
}

// Cette fonction affecte ou retourne si l'élément XHTML 
// identifié par strID est masqué ou non

function masqueB(strID, binMasque) {
    var objB = document.getElementById(strID)
    if (objB==null) {
        alert('Attention... balise "' + strID + '" inexistante !')
    }
    else {
        if (binMasque != null) {
            objB.style.display = binMasque ? 'none' : 'inline'
        }
        else {
            return objB.style.display == 'none'
        }
    }
}


// Cette fonction affecte ou retourne si l'élément XHTML 
// identifié par strID est caché ou non

function cacheB(strID, binCache) {
    var objB = document.getElementById(strID)
    if (objB==null) {
        alert('Attention... balise "' + strID + '" inexistante !')
    }
    else {
        if (binCache != null) {
            objB.style.visibility = binCache ? 'hidden' : 'visible'
        }
        else {
            return objB.style.visibility == 'hidden'
        }
    }
}

// Cette fonction récupère et retourne 
// la valeur d'une donnée transmise à une page Web.
// Si la donnée n'est pas récupérable, cette fonction
// retourne null. 
function recupereDonnee(strNomDonnee) {
	// Va chercher les données transmises
	var strDonnees = location.search.substring(1)		
	var tabStrDonnees = strDonnees.split('&')
	var strValeurDonnee = null
	var binTrouve=false
	for (var i = 0; i < tabStrDonnees.length && !binTrouve; i++) {
		var tabStrUneDonnee = tabStrDonnees[i].split('=')
		if (tabStrUneDonnee[0] == strNomDonnee) {
			strValeurDonnee = tabStrUneDonnee[1]
			// Remplacer les + par des espaces
			while (strValeurDonnee.indexOf('+') != -1)
			    strValeurDonnee = strValeurDonnee.replace('+', ' ')
		    // Remplacer les %2F par /
			while (strValeurDonnee.indexOf('%2F') != -1)
			    strValeurDonnee = strValeurDonnee.replace('%2F', '/')
		    // Remplacer les %27 par l'apostropphe (')
			while (strValeurDonnee.indexOf('%27') != -1)
				strValeurDonnee = strValeurDonnee.replace('%27', '\'') 
				
			binTrouve = true
		}
	}
    return strValeurDonnee
}