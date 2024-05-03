import { useNavigate } from "react-router-dom";

import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

import { getDataCocktailStore } from '../service/zustandStore'

import cocktailImg from '../assets/img/cocktail_mini3.jpg'
import drinkLogo from '../assets/drink2.svg'

const Navbar = () => {
  /*const itemRenderer = (item: any) => (
      <a className="flex align-items-center p-menuitem-link">
          <span className={item.icon} />
          <span className="mx-2">{item.label}</span>
          {item.badge && <Badge className="ml-auto" value={item.badge} />}
          {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
      </a>
  );*/
  const navigate = useNavigate()
  const items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => {
            navigate('/');
          }
      },
      {
          label: 'About us',
          icon: 'pi pi-users',
          command: () => {
            navigate('/about');
          }
      },
      {
          label: 'Contact',
          icon: 'pi pi-envelope',
          command: () => {
            navigate('/contatti');
          }
          // badge: 3,
          // template: itemRenderer
      }
  ];

  const { dataCocktail, setCocktail } = getDataCocktailStore();
  // const cocktailStore = getDataCocktailStore();
  // const cocktail = cocktailStore((state: any) => state.dataCocktail);

  const start = <img alt="logo" src={drinkLogo} height="40" className="ml-2 mr-4"></img>;
  const end = (
    <div className="flex align-items-center gap-1">
      <Avatar image={cocktailImg} shape="circle" style={{width: "2.5rem", height: "2.5rem"}} className="mr-3" />
      <InputText placeholder={dataCocktail} type="text" className="w-8rem sm:w-auto" onChange={(e) => {
        if(e.target.value?.length > 2) setCocktail(e.target.value)
      }} />
      <Button icon="pi pi-search" rounded text aria-label="search" severity="secondary" />
    </div>
  );

  return <>
      <Menubar model={items} start={start} end={end} />
  </>
  };
  
  export default Navbar;