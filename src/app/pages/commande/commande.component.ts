import {Component, OnInit} from '@angular/core';
import {CommandeServiceService} from '../../services/commande-service.service';
import {Router} from '@angular/router';

// export class Commande {
//   id: number;
//   dateCmd: any ;
//   numCmd: any ;
//   typeCmd: any ;
//   clientId: any ;
//   accepted: any ;
// }
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  validate: any;
  id: any;
  listCommande: any;

  constructor(private commandeService: CommandeServiceService, private router: Router) {
    this.getListCommandes();

  }

  ngOnInit(): void {
  }

  getListCommandes() {
    // this.commandeService.getListCommandes().subscribe((data: any) => {
    //   this.listCommande = data;
    this.listCommande = [
      {
        'numCmd': '1',
        'typeCmd': 'commande',
        'nomClient': 'client1',
        'dateCmd': '2020-01-01',
        'accepted': true,
      }, {
        'numCmd': '2',
        'typeCmd': 'commande',
        'nomClient': 'client2',
        'dateCmd': '2020-01-01',
        'accepted': true,
      }, {
        'numCmd': '3',
        'typeCmd': 'commande',
        'nomClient': 'client3',
        'dateCmd': '2020-01-01',
        'accepted': true,
      }, {
        'numCmd': '4',
        'typeCmd': 'commande',
        'nomClient': 'client4',
        'dateCmd': '2020-01-01',
        'accepted': false,
      },
    ];
    console.warn('*---**', this.listCommande);
    for (let i = 0; i < this.listCommande.length; i++) {
      console.log(this.listCommande[i].accepted);
      if (this.listCommande[i].accepted === true) {
        this.validate = 'Accepted';
      } else {
        this.validate = 'Rejected';
      }
    }
    // });
  }

  inverse(cmd: any) {
    const f: FormData = new FormData();
    this.commandeService.inverse(cmd['id'], f).subscribe(
      response => {
        console.log(response);
        this.refreshLisCommandes();
      }
    );
  }

  delete(id: any) {
    this.commandeService.delete(id).subscribe(
      (res) => {
        console.log(res);
        this.refreshLisCommandes();
        this.router.navigate(['/commmande']);
      },
      err => {
        console.log(err);

      }
    );
  }

  refreshLisCommandes() {
    this.commandeService.getListCommandes().subscribe(
      response => {
        this.listCommande = response;
      }
    );
  }

  updateCmd(myObj: any) {
    this.router.navigate(['/ordre-fabrication' + '/' + myObj['id']]);
  }

  show(i: number) {
    const elem = document.getElementById('nested_table' + i);
    if (elem.style.display === 'none') {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  }
}
