import { RootState } from "../service/redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { changeIngredient, changeCocktailsList } from "../service/redux/ingredientsReducer";
import { Avatar } from "primereact/avatar";
import apuleioImg from '../assets/img/apuleio.jpg'
import cocktailsImg from '../assets/img/cocktails.jpg'
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import CocktailCard from "../components/cocktailCard";
import { iCocktail } from "../interface/iCocktail";
import { responsiveOptions } from "../const/responsiveCarousel";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useGetCocktailsQuery } from "../service/redux/ingredientsAPI";
import { Toast } from "primereact/toast";

const IngredientsScreen = () => {
    const toast = useRef<Toast>(null);
    // * Redux Toolkit - START  
    const ingredient = useSelector((state: RootState) => state.ingredient.ingredient)
    const cocktailsList = useSelector((state: RootState) => state.ingredient.cocktailsList)
    const dispatch = useDispatch();
    // Pass skip parameter that accepts a boolean
    const { data } = useGetCocktailsQuery(ingredient);
    // * Redux Toolkit - START
    
  const [ingredientLocal, setIngredientLocal] = useState<string>(ingredient)
  const [ricercaB, setRicercaB] = useState<boolean>(false)

  useEffect(() => {
    if(data) {
        dispatch(changeCocktailsList(data?.drinks))
    } else if(ricercaB) {
        toast.current?.show({severity:'warn', summary: 'Warning', detail:'Nessun Cocktail con questo ingrediente.', life: 3000});
    }
  },[data])

  const productTemplate = (c: iCocktail) => {
    return (
      <CocktailCard cocktail={c} />
    );
};
const cercaPerIngredienti = () => {
    setRicercaB(true)
    dispatch(changeIngredient(ingredientLocal))
}
const cambiaIngredientLocal = (value: string) => {
    setIngredientLocal(value)
}

    return <>    
    <Toast ref={toast} />
  <div className="grid grid-nogutter surface-0 text-800">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
              <span className="block text-5xl font-bold mb-1">“Il primo bicchiere è per la sete.<br/>Il secondo, per la gioia. </span>
              <div className="text-5xl text-primary font-bold mb-3">Il terzo, per il piacere.<br/>Il quarto, per la follia.”</div>
                <div className="flex align-items-center justify-content-start">
                    <div><Avatar image={apuleioImg} shape="circle" style={{width: "2.5rem", height: "2.5rem"}} /></div>
                    <div className="ml-2 pb-1"><span className="font-bold">Lucio Apuleio</span> - Scrittore e filosofo della Roma antica</div>
                </div>
                <div className="flex align-items-center justify-content-start mt-4">
                    {<InputText placeholder={ingredient} type="text" className="w-8rem sm:w-auto" onChange={(e) => {
                        if(e.target.value?.length > 2) {
                            cambiaIngredientLocal(e?.target?.value)
                        }
                    }} />}
                    <Button label="Cerca per ingredienti" type="button" className="ml-3 p-button-raised" 
                    onClick={() => cercaPerIngredienti()} autoFocus />
                </div>
                { /* <Button icon="pi pi-search" rounded text aria-label="search" severity="secondary" onClick={() => { searchCocktailF('vodka') }} /> */ }
          </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
          <img src={cocktailsImg} alt="Cocktail" className="h-30rem block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>
  </div>
  
  <div>
    {
<Carousel value={cocktailsList} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
    autoplayInterval={55000} itemTemplate={productTemplate} />
    }
  </div>
    </>;
};
  
export default IngredientsScreen;