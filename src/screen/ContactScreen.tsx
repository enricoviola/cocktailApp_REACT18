// import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
// import { useState } from 'react';

// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import { useForm, ValidationError } from '@formspree/react';
import sendAni from "../assets/lotties/send.json";
import cocktailAni from "../assets/lotties/cocktail.json";

// import tequilaImg from '../assets/img/tequilaLemon.jpg'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const ContactScreen = () => {
  const [state, handleSubmit] = useForm("xeqyngeq");
  const style = {
    height: 400,
  }

  if (state.succeeded) {
      return <>
      <div className="surface-0 text-700 text-center card">
          <div className="text-blue-600 font-bold mb-3">Presto risponderemo alla tua richiesta</div>
          <div className="text-900 font-bold text-5xl mb-5">Email inviata correttamente</div>
          <Lottie animationData={sendAni} style={style}/>
          <div className="text-700 text-l mb-5">Presto risponderemo alla tua richiesta</div>
          <Link to = "/" className="p-button font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap no-underline">Torna alla Home</Link>
      </div>
          </>
  }
  // const [checked, setChecked] = useState<boolean>(false)

  return <> 
  <form onSubmit={handleSubmit}>
  <div className="flex align-items-center justify-content-center card">
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5 flex flex-column align-items-center justify-content-center">
            <div className="text-900 text-3xl font-medium mb-3">Contatti</div>
        <div className="mb-3 flex align-items-center">
          <Lottie animationData={cocktailAni} style={style}/>
          </div>
            <div>
            <span className="text-600 font-medium line-height-3">Hai qualche domanda?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Scrivici subito!</a>
            </div>
        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="email" name="email" placeholder="Email" className="w-full mb-3" />
            <ValidationError  prefix="Email"  field="email" errors={state.errors}/>

            <label htmlFor="message" className="block text-900 font-medium mb-2">Testo</label>
            <InputText id="message" type="text" name="message" placeholder="Testo" className="w-full mb-3" />
      <ValidationError  prefix="Message" field="message" errors={state.errors}/>

            { /*<div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    <Checkbox id="rememberme" onChange={e => setChecked(e.checked || false)} checked={checked} className="mr-2" />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
</div> */ }

            <Button label="Invia" icon="pi pi-send" className="w-full" type="submit" disabled={state.submitting} />
        </div>
    </div>
</div>
    </form>
    
</>;
};

export default ContactScreen;