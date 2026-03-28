import { Button } from "../components/Button";
import {Text} from "../components/Text";
import {Input} from "../components/Input";

export const About = () => {
  return (
    <div className='text-5xl md:text-4xl lg:text-3xl xm:text-1xl'> About
    <Button color="primary" size="large" title="Da" onClick={alert}></Button>
    <Text color="primary" size="middle" title="dadadcfadescfsdefe"></Text>
    <Input color="secondary" size="small" placeholder="kod"></Input>
    </div>
    
  )
}