class Calculadora{
    hombres(edad,peso,altura){
        return (66+(13.7 * (peso/2.205))+(5*altura)-(6.5*edad)) 
    }

    mujeres(edad,peso,altura){
       // return edad + peso - altura;
       return (655+(9.6 * (peso/2.205))+(1.8*altura)-(4.7*edad)) 
    }
}