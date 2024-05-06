import Lottie from "lottie-react";
import animation404 from "../assets/lotties/404.json";
import { Link } from "react-router-dom";

const ErrorScreen = () => {

  return <>
<div className="surface-0 text-700 text-center card">
    <div className="text-blue-600 font-bold mb-3">Qualcosa è andato storto</div>
    <div className="text-900 font-bold text-5xl mb-5">Pagina Non Trovata</div>
    <Lottie animationData={animation404} style={{height: 400}}/>
    <div className="text-700 text-l mb-5">Qualche volta può capitare di prendere la via sbagliata, per fortuna questa volta basta un click per ritornare nella retta via!</div>
    <Link to = "/" className="p-button font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap no-underline">Torna alla Home</Link>
</div>
    </>;
};

export default ErrorScreen;