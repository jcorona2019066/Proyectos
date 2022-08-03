import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';

@Injectable()

export class SubirimagenService {
  public url;

  constructor(){
    this.url = GLOBAL.url
  }

  subirImagen(url: string, params: Array<string>, files: Array<File>, token: string, nombreImg){

    return new Promise(function(resolve, reject){
      var formData = new FormData();
      var XMLHttp = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append(nombreImg,files[i], files[i].name)

      }

      XMLHttp.onreadystatechange = function(){
        if (XMLHttp.readyState === 4){
          if(XMLHttp.status === 200){
            resolve(JSON.parse(XMLHttp.response))
          }else{
            reject(XMLHttp.response)
          }
        }
      }

      XMLHttp.open('POST',url,true);
      XMLHttp.setRequestHeader('authorization', token);
      XMLHttp.send(formData)
    })
  }
}
