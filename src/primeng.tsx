import { Button } from 'primereact/button';
        
export interface IHelloWorld {
  text: string
}
export const Primeng = ({ text }: any) => {
  return <>
  <div className="text">This is test text: {text}</div>
  <div className="card flex flex-wrap justify-content-center gap-3">
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
        <Button label="Submit" loading loadingIcon="pi pi-spin pi-sun" />
        <Button label="Click" icon="pi pi-check" iconPos="right" />
    </div>
    {/*
    <div className="flex flex-column md:flex-row justify-content-between my-5">
        <Button type="button" label="Button 1" className="mb-3 md:mb-0"></Button>
        <Button type="button" label="Button 2" className="p-button-secondary mb-3 md:mb-0"></Button>
        <Button type="button" label="Button 3" className="p-button-help"></Button>
    </div>
     */}
    </>
}