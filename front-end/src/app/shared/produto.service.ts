import { Injectable } from '@angular/core';
import { Produto } from './produto.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  formData: Produto;
  list:Produto[];
  readonly rootURL = "http://localhost:3000/produtos";
  

  constructor(private http : HttpClient) { }

  postProduto(formData : Produto){
    return this.http.post(this.rootURL+'/produto',formData);
  }

  refreshList(){
    this.http.get(this.rootURL)
    .toPromise().then(res =>this.list = res as Produto[])
  }

  putProduto(formData : Produto){
    return this.http.put(this.rootURL+'/produto',formData);
  }

  deleteProduto(id : number){
    return this.http.delete(this.rootURL+'/produto/'+id);
  }
}
