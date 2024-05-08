import { useEffect } from "react";
// import useFetch from "../service/useFetch";

import { getDataCocktailStore } from '../service/zustandStore';
import { responsiveOptions } from "../const/responsiveCarousel";
import { iCocktail } from "../interface/iCocktail";
import CocktailCard from "../components/cocktailCard";

import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Carousel } from "primereact/carousel";

import cocktailImg from '../assets/img/cocktail.jpg'
import benigniImg from '../assets/img/Roberto-Benigni.jpg'
import tequilaImg from '../assets/img/tequilaLemon.jpg'
import galleria1 from '../assets/img/galleria1.jpg'
import galleria2 from '../assets/img/galleria2.jpg'
import galleria3 from '../assets/img/galleria3.jpg'
import galleria4 from '../assets/img/galleria4.jpg'
import galleria5 from '../assets/img/galleria5.jpg'
import galleria6 from '../assets/img/galleria6.jpg'
import galleria7 from '../assets/img/galleria7.jpg'
import './home.scss'

const HomeScreen = () => {
    const gallery1: any[] = [
        { itemImageSrc: galleria1, title: 'Galleria 1' },
        { itemImageSrc: galleria2, title: 'Galleria 2' },
        { itemImageSrc: galleria3, title: 'Galleria 3' },
        { itemImageSrc: galleria4, title: 'Galleria 4' },
        { itemImageSrc: galleria5, title: 'Galleria 5' },
        { itemImageSrc: galleria6, title: 'Galleria 6' },
        { itemImageSrc: galleria7, title: 'Galleria 7' }
    ]

    const { dataCocktail, getCocktail, cocktailsList, setCocktail } = getDataCocktailStore()

    useEffect(() => {   
        getCocktail(dataCocktail);
    }, [dataCocktail]);
    
    const itemTemplate = (item: any) => {
      return <img src={`${item.itemImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  }

  const thumbnailTemplate = (item: any) => {
      return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
  }

  const productTemplate = (c: iCocktail) => {
      return (
        <CocktailCard cocktail={c} />
      );
  };
  
  return <>
  <div className="grid grid-nogutter surface-0 text-800">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
              <span className="block text-6xl font-bold mb-1">“Sono un astemio quasi pentito. </span>
              <div className="text-6xl text-primary font-bold mb-3">Un giorno o l’altro smetto di non bere.”</div>
                <div className="flex align-items-center justify-content-start">
                    <div><Avatar image={benigniImg} shape="circle" style={{width: "2.5rem", height: "2.5rem"}} /></div>
                    <div className="ml-2 pb-1"><span className="font-bold">Roberto Benigni</span> - Attore, comico, regista e cantautore</div>
                </div>
                <div className="flex align-items-center justify-content-start mt-4">
                    <Button label="Cerca i Nostri Cocktails" type="button" className="mr-3 p-button-raised" />
                    <InputText placeholder={dataCocktail} type="text" className="w-8rem sm:w-auto" onChange={(e) => {
                        if(e.target.value?.length > 2) setCocktail(e.target.value)
                    }} />
                </div>
                { /* <Button icon="pi pi-search" rounded text aria-label="search" severity="secondary" onClick={() => { searchCocktailF('vodka') }} /> */ }
          </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
          <img src={cocktailImg} alt="Cocktail" className="h-30rem block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>
  </div>
  
  <div>
<Carousel value={cocktailsList} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
    autoplayInterval={55000} itemTemplate={productTemplate} />
  </div>
    


  <Galleria value={gallery1} numVisible={5} circular style={{ maxHeight: '350px', width: '100%', overflow: 'hidden' }} showItemNavigators 
    showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} autoPlay transitionInterval={5000} />
  
<div className="surface-0 text-center card my-6">
    <div className="mb-4 font-bold text-3xl flex align-items-center justify-content-center">
        <div className="mr-4 flex align-items-center"><Avatar image={tequilaImg} shape="circle" style={{width: "7rem", height: "7rem"}} /></div>
        <div>
        <div className="text-900 mb-2">Io prendo sempre la vita con un pizzico di sale... </div>
        <div className="text-primary">più una fetta di limone... e una dose di Tequila</div>
        </div>
    </div>
</div>
    
  </>;
};

export default HomeScreen;