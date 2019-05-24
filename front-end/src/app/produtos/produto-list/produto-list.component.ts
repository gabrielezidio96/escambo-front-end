import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/shared/produto.service';
import { Produto } from 'src/app/shared/produto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  constructor(private service : ProdutoService, private toaster:ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(produto : Produto){
    this.service.formData = Object.assign({},produto);
  }

  onDelete(id : number){
    if(confirm('Você tem certeza que deseja deletar ?')){
      this.service.deleteProduto(id).subscribe(res =>{
        this.service.refreshList();
        this.toaster.warning('Deletado com sucesso', 'Registro de Produtos');
      });
    }
  }
}
