
import { professional,Client } from './../../../Services/professionnel.service';
import { Storage } from '@ionic/storage';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
sub:Subscription;
Term: string = "";
Puser:professional[];
items: Client[];
items2:any;
  constructor(private menu:MenuController,private PS:ProfessionnelService,private storage:Storage,private nav:NavController) { }

  ngOnInit() {
    if(this.menu.isEnabled('Client'))
   {this.menu.enable(false,'Client');
   this.storage.get('Email').then((val)=>{
    this.sub=this.PS.ProfessionalExist(val).subscribe(res=>{
     this.Puser=res;
     this.items=res[0].mesClient;
     this.items2=this.items;
     console.log(res);
     });
    });
  }
  
}

  ionViewWillLeave(){
    this.menu.close();
    console.log(this.sub);
    if(this.sub.closed!=true)
    {this.sub.unsubscribe();}
    console.log(this.sub);
  }
  ionViewDidEnter(){
        
    this.menu.enable(true,'Professionnel');
  }
  
  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.Nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.items=this.items2;
    this.items = this.filterItems(this.Term);
    
    
  }
}
