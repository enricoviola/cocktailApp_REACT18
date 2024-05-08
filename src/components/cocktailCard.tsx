import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import { iCocktail } from "../interface/iCocktail";
import { colors } from "../const/colors";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import YouTube from 'react-youtube';
import { useFetch_youTube, baseParams_youTube } from "../service/useFetch"
import './cocktailCard.scss'
import { Toast } from "primereact/toast";

const CocktailCard = ({cocktail}: any) => {
    const c: iCocktail = cocktail
    const [detailCocktailB, setDetailCocktailB] = useState(false)
    const [youTubeIDC, setYouTubeIDC] = useState('')
    const toast = useRef<Toast>(null);
    const goToDetail = () => {
      useFetch_youTube.get('/search', {
        params: {
            ...baseParams_youTube,
            q: 'ricetta cocktail ' + c?.strDrink
        }
      }).then( (res: any) => {
        if(res?.data?.items && res?.data?.items?.length > 0) {
            setYouTubeIDC(res?.data?.items[0]?.id?.videoId)
        }
      }).catch( (err: any) => {
        console.error('Error YouTube', err)        
        toast.current?.show({severity:'warn', summary: 'Warning', detail:'Nessun video di Istruzioni per creare questo Cocktail da YouTube', life: 3000});
      })
    };
    const opts_youTube = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={c?.strDrinkThumb} shape="circle" />
            <span className="font-bold white-space-nowrap">{c?.strDrink}</span>
        </div>
    );
  
    const footerContent = (
        <div>
            <Button label="Chiudi" icon="pi pi-check" onClick={() => setDetailCocktailB(false)} autoFocus />
        </div>
    );

    return <>
        <Toast ref={toast} />
      <div className="surface-0 p-4 shadow-2 border-round cardCocktail m-5 flex flex-column gap-3 cocktailCard">
          <div className="text-2xl font-medium text-900 cursor-pointer cocktailTitle"
          onClick={() => { goToDetail(); setDetailCocktailB(true) }}>{c?.strDrink}</div>
          { c?.ingredientList &&
            <div className="flex justify-content-center align-content-start gap-1 flex-wrap ingredients">
                { c?.ingredientList && c?.ingredientList.map((ingredient: string, i: number) => (
                    <Chip key={i} label={ingredient} style={{backgroundColor: colors[i]?.background, color: colors[i]?.color }} />
                ))
                }
            </div>
          }
          {/*
          <div className="font-normal mb-3">{c?.strInstructionsIT}</div>
          <div style={{ height: '150px' }} className="border-2 border-dashed border-300"></div>
          */}
          <Image src={c?.strDrinkThumb} alt="Image" width="250" preview />
          <Button label="Istruzioni" type="button" className="p-button-raised" onClick={() => {goToDetail(); setDetailCocktailB(true)}} />
      </div>

        <Dialog visible={detailCocktailB} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => setDetailCocktailB(false)}>
          <div className="flex justify-content-center align-content-start gap-1 flex-wrap ingredients">
              { c?.ingredientList && c?.ingredientList.map((ingredient: string, i: number) => (
                  <Chip key={i} label={ingredient} style={{backgroundColor: colors[i]?.background, color: colors[i]?.color }} />
              ))
              }
          </div>
            <p className="m-0 my-4">{c?.strInstructionsIT ? c?.strInstructionsIT : c?.strInstructions}</p>
            <div className="flex justify-content-center flex-wrap">
                { youTubeIDC && <YouTube videoId={youTubeIDC} opts={opts_youTube} />}
            </div>
        </Dialog>
    </>
};

export default CocktailCard;