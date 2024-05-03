import drinkLogo from '../assets/drinkWhite.svg'

const Footer = () => {
  return <>
<div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap">
    <div className="font-bold mr-8">🔥 I migliori Cocktail!</div>
    <div className="align-items-center hidden lg:flex">
        <span className="line-height-3">Applicazione in React creata da </span>
    </div>
    <a className="flex align-items-center ml-2 mr-8 underline font-bold text-white" href="https://www.linkedin.com/in/enricoviolaweb/" target="_blank">
          Enrico Viola
    </a>
    <a className="flex align-items-center no-underline justify-content-center border-circle text-100" style={{ width: '2rem', height: '2rem' }}>
      <img alt="logo" src={drinkLogo} height="40" className="ml-2 mr-4"></img>
    </a>
  </div>
    </>
  };
  
  export default Footer;