import { MenuController } from '@ionic/angular';
import { professional } from './../../../Services/professionnel.service';
import { Component, OnInit } from '@angular/core';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  Term: string = "";
  items: professional[];
  items2:any;
  sub:Subscription;
  constructor(private PS:ProfessionnelService,private menu:MenuController) { 
    this.items = null;
  
this.sub=this.PS.getallprofessionals().subscribe((val)=>{
this.items=val;
this.items2=this.items;
});
}
 ngOnDestroy() {
   if(this.sub.closed!=true)
   {this.sub.unsubscribe();}
 }
  ngOnInit() {
  }
  ionViewWillLeave(){
    this.menu.close();
  }
  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.items=this.items2;
    this.items = this.filterItems(this.Term);
    
    
  }
}
