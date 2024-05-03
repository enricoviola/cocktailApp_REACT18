import { useEffect, useState } from "react";
import useFetch from "../service/useFetch";

import { useGetData } from '../service/zustandStore';
import { colors } from "../const/colors";
import { gallery } from "../const/gallery";
import { responsiveOptions } from "../const/responsiveCarousel";

import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { Carousel } from "primereact/carousel";

import cocktailImg from '../assets/img/cocktail.jpg'
import benigniImg from '../assets/img/Roberto-Benigni.jpg'
import tequilaImg from '../assets/img/tequilaLemon.jpg'
import './home.scss'
import { Chip } from "primereact/chip";
import { iCocktail } from "../interface/iCocktail";
import { Dialog } from "primereact/dialog";

const HomeScreen = () => {
    const getData = useGetData()
    const { cocktails } = useGetData()
    const [searchCocktail, setSearchCocktail] = useState('mojito')
    const { data } = useFetch(`s=${searchCocktail}`)
    const [detailCocktailB, setDetailCocktailB] = useState(false)

    useEffect(() => {
      getData.execute();
    }, [searchCocktail]);
    // const { dataCocktail, getData } = getDataCocktailStore()
    console.log(2, data, cocktails);
    
    const itemTemplate = (item: any) => {
      return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  }

  const thumbnailTemplate = (item: any) => {
      return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
  }

  const goToDetail = (c: iCocktail) => {
    console.log(22, c);    
  };
  /*const searchCocktailF = (c: string) => {
    console.log(23, c);    
  };*/

  const productTemplate = (c: iCocktail) => {
      return (
        <div className="surface-0 p-4 shadow-2 border-round cardCocktail m-5 flex flex-column gap-3">
            <div className="text-2xl font-medium text-900 cursor-pointer" onClick={() => { goToDetail(c); setDetailCocktailB(true) }}>{c?.strDrink}</div>
            <div className="flex justify-content-center align-content-start gap-1 flex-wrap ingredients">
                { c?.ingredientList.map((ingredient: string, i: number) => (
                    <Chip label={ingredient} style={{backgroundColor: colors[i]?.background, color: colors[i]?.color }} />
                ))
                }
            </div>
            {/*
            <div className="font-normal mb-3">{c?.strInstructionsIT}</div>
            <div style={{ height: '150px' }} className="border-2 border-dashed border-300"></div>
            */}
            <Image src={c?.strDrinkThumb} alt="Image" width="250" preview />
            <Button label="Istruzioni" type="button" className="p-button-raised" onClick={() => {goToDetail(c); setDetailCocktailB(true)}} />
        </div>
      );
  };

  const headerElement = (
      <div className="inline-flex align-items-center justify-content-center gap-2">
          <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
          <span className="font-bold white-space-nowrap">Amy Elsner</span>
      </div>
  );

  const footerContent = (
      <div>
          <Button label="Ok" icon="pi pi-check" onClick={() => setDetailCocktailB(false)} autoFocus />
      </div>
  );
  
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
                <Button label="Cerca i Nostri Cocktails" type="button" className="mr-3 p-button-raised mt-4" />
                <InputText placeholder="Mojito" type="text" className="w-8rem sm:w-auto" onChange={(e) => {
                    if(e.target.value?.length > 2) setSearchCocktail(e.target.value)
                }} />
                { /* <Button icon="pi pi-search" rounded text aria-label="search" severity="secondary" onClick={() => { searchCocktailF('vodka') }} /> */ }
          </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
          <img src={cocktailImg} alt="Cocktail" className="h-30rem block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>
  </div>
  
  <div>
  <Carousel value={data} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
autoplayInterval={55000} itemTemplate={productTemplate} />
<Dialog visible={detailCocktailB} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => setDetailCocktailB(false)}>
    <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Dialog>
  </div>
    


  <Galleria value={gallery} numVisible={5} circular style={{ maxHeight: '350px', width: '100%', overflow: 'hidden' }} showItemNavigators 
    showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} autoPlay transitionInterval={5000} />
  
<div className="surface-0 text-center card">
    <div className="mb-3 font-bold text-3xl flex align-items-center justify-content-center">
        <div className="mr-4 flex align-items-center"><Avatar image={tequilaImg} shape="circle" style={{width: "4rem", height: "4rem"}} /></div>
        <div>
        <div className="text-900">Io prendo sempre la vita con un pizzico di sale... </div>
        <div className="text-blue-600">più una fetta di limone... e una dose di Tequila</div>
        </div>
    </div>
    <div className="text-700 mb-6">Un segreto per prendere la vita più alla leggera</div>
    <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-desktop text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Built for Developers</div>
            <span className="text-700 line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-lock text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
            <span className="text-700 line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
            <span className="text-700 line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
            <span className="text-700 line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-github text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Open Source</div>
            <span className="text-700 line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
        </div>
        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-shield text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Trusted Securitty</div>
            <span className="text-700 line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
        </div>
    </div>
</div>
    
  </>;
};

export default HomeScreen;